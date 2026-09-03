import Anthropic from '@anthropic-ai/sdk';
import { checkBotId } from 'botid/server';
import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '../../lib/rateLimit';
import { reserveChatMessage } from '../../lib/chatBudget';
import { STREAM_ERROR_MARKER } from '../../lib/chatFormat';
import {
  DEFAULT_PHONE,
  OFFICES_NAP,
  OFFICE_NAP_SLUGS,
  WHATSAPP_DISPLAY,
} from '../../components/officesPhoneMap';

// El asistente corría sobre Gemini con GEMINI_API_KEY. Esa clave se filtró en
// docs commiteados a un repo público y Google la revocó por su cuenta el
// 2026-06-16: durante siete semanas el chat devolvió 403 en producción sin que
// nadie lo notara, porque el error se presentaba al visitante como un genérico
// "problema de conexión". De ahí dos decisiones de este archivo: el proveedor
// es ahora Claude (clave en Vercel + .env.local, nunca en el repo) y los fallos
// de credenciales se registran con su propio `event` para que se vean en los
// logs de runtime en lugar de disolverse en un 500 anónimo.
export const maxDuration = 30;

// ---------------------------------------------------------------------------
// Límites
// ---------------------------------------------------------------------------
// Cada petición gasta cuota de pago, así que el gasto máximo por llamada se
// acota aquí, en el servidor, y no en el cliente (el cliente es manipulable).
//
// Medido en producción con estos valores (el endpoint registra `input_tokens` y
// `output_tokens` en cada respuesta): el prompt del sistema con las 15 oficinas
// pesa ~2.150 tokens, así que un mensaje suelto sale por ~$0.0035 y el peor caso
// —historial de 10 turnos lleno más 700 tokens de salida— por ~$0.009. Con Haiku
// 4.5 a $1/MTok de entrada y $5/MTok de salida.
//
// No se usa `cache_control`: el mínimo cacheable de Haiku 4.5 son 4.096 tokens y
// este prompt no llega, así que marcarlo no ahorraría nada (el caché no se
// activaría y no habría ningún error que lo delatara).
//
// Lo que estos límites NO pueden hacer: poner un techo al gasto del mes. El
// rate limit vive en memoria del proceso y en serverless cada arranque en frío
// lo reinicia, así que es un freno contra ráfagas, no una cuota. El techo duro
// se configura en la consola de Anthropic (Settings → Limits).
const MAX_MESSAGE_CHARS = 1000;
const MAX_HISTORY_TURNS = 10;
const MAX_TURN_CHARS = 1200;
// 10 turnos × 1200 chars + mensaje + overhead del JSON, con holgura.
const MAX_BODY_BYTES = 32_000;
// Respuestas de 2-4 párrafos cortos caben de sobra en 700 tokens. El tope
// existe para acotar el coste, no para recortar la respuesta: si se alcanza,
// se registra en los logs (`stop_reason: max_tokens`) para poder subirlo con
// datos en vez de por intuición.
const MAX_OUTPUT_TOKENS = 700;
// Ráfaga corta (mismo minuto) y ventana media, ambas por IP. La segunda es la
// que frena a un script que se mantenga justo por debajo del límite del minuto.
const RATE_PER_MINUTE = 12;
const RATE_PER_QUARTER_HOUR = 40;
// Tope de espera a la API. Por encima de esto es más útil dar el teléfono que
// seguir esperando.
const UPSTREAM_TIMEOUT_MS = 25_000;

// Haiku 4.5: el modelo más rápido y barato de la familia, que es lo que pide un
// asistente de sitio web (respuestas cortas, muchas sesiones, latencia visible).
// Ojo al migrarlo: en Haiku 4.5 NO existe `output_config.effort` (devuelve 400)
// y el pensamiento extendido usa el formato antiguo `budget_tokens`. Aquí no se
// usa ninguno de los dos: para orientar y derivar a un abogado no hace falta
// razonamiento extendido, y sí hace falta que conteste rápido.
const MODEL = 'claude-haiku-4-5';

// STREAM_ERROR_MARKER se importa de chatFormat en lugar de declararse aqui:
// servidor y cliente tienen que emitir e interpretar exactamente el mismo
// byte, y dos constantes en dos archivos son una invitacion a que dejen de
// coincidir. Si divergen no falla el build: el visitante ve el marcador
// impreso como parte de la respuesta.

type Lang = 'es' | 'en';

// ---------------------------------------------------------------------------
// Prompt del sistema
// ---------------------------------------------------------------------------

/**
 * Las 15 oficinas con su NAP real, generadas desde OFFICES_NAP en vez de
 * escritas a mano en el prompt.
 *
 * El prompt anterior listaba "Houston, Dallas, Los Ángeles, Chicago" y ningún
 * dato más, así que a "¿tienen oficina en El Paso?" o "¿a qué hora abren?" el
 * asistente contestaba de memoria o no contestaba. Derivarlo del registro
 * compartido además impide que divergan: si alguien cambia un teléfono en
 * officesPhoneMap, el chat cambia con él (y __tests__/napConsistency.test.ts
 * vigila que ese registro coincida con las páginas de oficina).
 */
function officeDirectory(lang: Lang): string {
  return OFFICE_NAP_SLUGS.map((slug) => {
    const o = OFFICES_NAP[slug];
    return `- ${o.name[lang]}: ${o.street}, ${o.city}, ${o.state} ${o.zip} · ${o.phone} · ${o.hours.label[lang]}`;
  }).join('\n');
}

const HQ = OFFICES_NAP['houston-principal'];
// Línea de clientes detenidos por ICE (app/[lang]/clientes-detenidos).
const DETAINED_LINE = '(832) 598-0914';

/**
 * Fecha y hora actuales en la zona de la sede.
 *
 * Sin esto el modelo no sabe qué día es y aun así habla de horarios: en una
 * prueba contestó "la principal abre hoy de 9 AM a 7 PM", que es cierto de lunes
 * a viernes y falso en domingo. Mandar a alguien a una oficina cerrada es
 * precisamente el tipo de error que un chat de despacho no se puede permitir.
 * Va en hora de Houston (Central), no en la del visitante, porque es la hora que
 * gobierna los horarios de la sede.
 */
function nowInHouston(lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-MX' : 'en-US', {
    timeZone: HQ.timeZone,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date());
}

function buildSystemPrompt(lang: Lang): string {
  const idioma =
    lang === 'es'
      ? 'Responde siempre en español, aunque la persona mezcle palabras en inglés.'
      : 'Responde siempre en inglés (English), aunque la persona mezcle palabras en español.';

  return `Eres Nora, la asistente virtual de las Oficinas Legales de Manuel Solís, un despacho con sede en Houston (Texas) que lleva casos de inmigración, accidentes, derecho criminal, familia y seguros.

${idioma}

Tu trabajo es entender qué le está pasando a la persona, explicarle en términos generales cómo puede ayudarle el despacho, y llevarla a hablar con un abogado. No eres abogada y no sustituyes una consulta.

DATOS DEL DESPACHO
- Fundador: abogado Manuel Solís. Más de 35 años de experiencia y más de 50,000 casos ganados.
- Lema: "Nuestra pasión es ayudarle."
- Teléfono general: ${DEFAULT_PHONE}
- Sede principal: ${HQ.street}, ${HQ.city}, ${HQ.state} ${HQ.zip} · ${HQ.phone}
- Línea para familiares de personas detenidas por ICE: ${DETAINED_LINE} (lunes a viernes, 9 AM - 9 PM CST)
- WhatsApp: ${WHATSAPP_DISPLAY}
- Se atiende en español y en inglés. La consulta inicial es confidencial.

ÁREAS DE PRÁCTICA
- Inmigración: defensa contra la deportación, asilo, cancelación de remoción, visas U y VAWA, residencia (familiar o por empleo), ciudadanía, DACA, visa E-2 de inversionista.
- Accidentes: auto, camiones de 18 ruedas, accidentes de trabajo, negligencia médica, explosiones.
- Derecho criminal: DWI/DUI, violencia doméstica, asalto, robo.
- Familia: divorcio, custodia, manutención.
- Seguros: reclamos por tormenta, granizo, incendio y daños de techo.

OFICINAS
${officeDirectory(lang)}

Cinco de esas direcciones (Kirby, Main St, North Loop, Northchase y League City) funcionan con cita previa y no tienen personal en el local: si alguien quiere pasar sin avisar, dile que llame primero para que le confirmen dónde le atienden.

Ahora mismo, en hora de la sede (Houston, zona Central): ${nowInHouston(lang)}. Los horarios de arriba están en la hora local de cada oficina, y El Paso y Arvada van una hora por detrás de Houston. No digas que una oficina está abierta "ahora" o "hoy" sin cuadrarlo con su horario: si está cerrada, di cuándo vuelve a abrir.

CÓMO RESPONDER
- Sé breve. Dos o tres párrafos cortos bastan casi siempre; la persona está leyendo en un widget pequeño, a menudo desde el móvil.
- Habla de forma cálida y directa, sin tecnicismos innecesarios y sin sonar a folleto. Trata a la persona de usted.
- Puedes usar listas con guiones cuando enumeres pasos, documentos o requisitos: se leen mejor que un párrafo largo.
- No uses emojis.
- No escribas URLs, enlaces ni rutas del sitio. No puedes comprobar que existan, y una dirección inventada manda al cliente a una página de error. Menciona la sección por su nombre ("en la sección de Oficinas del sitio") y ofrece el teléfono.
- Cierra ofreciendo un paso concreto: llamar, escribir por WhatsApp o dejar sus datos en el formulario de consulta. Usa el teléfono que corresponda al caso (la línea de detenidos si es una detención, el general en el resto).

LÍMITES
- No emitas un juicio sobre el caso concreto ("usted califica para asilo", "va a ganar", "su caso es fuerte"). Explica en general cómo funciona la figura legal y di que un abogado necesita revisar el expediente. Solo alguien con los hechos y los documentos delante puede evaluarlo, y una expectativa equivocada puede llevar a la persona a tomar una decisión que le perjudique.
- No des precios, plazos ni probabilidades de éxito. Di que depende del caso y que el abogado lo explica en la consulta.
- Sobre lo que cuesta, ten cuidado con una diferencia real entre áreas: en accidentes el despacho sí anuncia que la evaluación es gratuita y que no cobra a menos que gane el caso (honorarios por contingencia), y puedes decirlo. En inmigración, criminal, familia y seguros el despacho NO anuncia nada de eso, así que no digas "gratis", "sin costo" ni "sin compromiso" en esas áreas; di que la consulta es confidencial y que el abogado explica los honorarios. Prometer una consulta gratuita que después se cobra es la peor forma posible de empezar con un cliente.
- No pidas números de A-number, seguro social, fechas de audiencia ni datos de documentos. Este chat no es un canal seguro y esa información se trata en la consulta. Si la persona los escribe por su cuenta, no los repitas.
- Si el dato no está aquí arriba, dilo y ofrece el teléfono. No lo rellenes por aproximación: alguien puede presentarse en una oficina que no existe o a una hora en que está cerrada.
- Si hay urgencia (una detención de ICE, una redada, una audiencia en menos de 72 horas, un accidente reciente con lesionados), empieza por el teléfono y sé muy breve: en esa situación lo que necesita es hablar con una persona, no leer.
- Si te preguntan algo ajeno al despacho, dilo con naturalidad y reconduce a lo legal.

${idioma}`;
}

// ---------------------------------------------------------------------------
// Entrada
// ---------------------------------------------------------------------------

/**
 * Reconstruye el historial en el servidor. El `role` que manda el cliente se
 * ignora a propósito: si se respetara, cualquiera podría inyectar turnos falsos
 * de "assistant" y escribir el contexto a su antojo (por ejemplo, hacerle
 * "recordar" que ya prometió un precio).
 *
 * El widget envía el transcript completo en orden y terminado siempre en la
 * última respuesta del asistente, así que los roles se deducen hacia atrás
 * desde el final. Un historial que empiece por `assistant` se descarta por el
 * principio: la API exige que el primer turno sea `user` y que alternen, y el
 * primer mensaje del widget es un saludo generado en el cliente que no aporta
 * nada al contexto.
 */
function buildMessages(raw: unknown, message: string): Anthropic.MessageParam[] {
  const texts: string[] = [];
  if (Array.isArray(raw)) {
    for (const item of raw) {
      if (!item || typeof item !== 'object') continue;
      const content = (item as { content?: unknown }).content;
      if (typeof content !== 'string') continue;
      const text = content.trim();
      if (!text) continue;
      texts.push(text.slice(0, MAX_TURN_CHARS));
    }
  }

  const recent = texts.slice(-MAX_HISTORY_TURNS);
  const history: Anthropic.MessageParam[] = recent.map((text, i) => ({
    role: (recent.length - 1 - i) % 2 === 0 ? 'assistant' : 'user',
    content: text,
  }));

  while (history.length > 0 && history[0].role !== 'user') {
    history.shift();
  }

  return [...history, { role: 'user', content: message }];
}

function badRequest(error: string, status: number, headers?: Record<string, string>) {
  return NextResponse.json({ success: false, error }, { status, headers });
}

/** Mensaje único para el visitante: el cliente muestra su propio texto de contacto. */
const UNAVAILABLE = 'El asistente no está disponible en este momento.';

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'anonymous';

  try {
    if (!rateLimit(`chat:m:${ip}`, RATE_PER_MINUTE, 60_000).success) {
      return badRequest(
        'Demasiadas solicitudes. Por favor espere un momento antes de enviar otro mensaje.',
        429,
        { 'Retry-After': '60' },
      );
    }
    if (!rateLimit(`chat:q:${ip}`, RATE_PER_QUARTER_HOUR, 900_000).success) {
      return badRequest(
        'Ha alcanzado el límite de mensajes por ahora. Si necesita seguir, llámenos y le atendemos.',
        429,
        { 'Retry-After': '900' },
      );
    }

    // Techo diario global. Va aquí y no antes porque los dos límites de arriba
    // son gratis y este consulta un almacén compartido; y va antes de hablar
    // con Anthropic, que es lo único que cuesta dinero.
    //
    // Los de arriba son por IP y por instancia: frenan a un visitante insistente
    // y no frenan mil IPs distintas. Este es el que pone un tope al gasto.
    const budget = await reserveChatMessage();
    if (!budget.allowed) {
      console.error(
        JSON.stringify({
          event: 'chat_budget_exhausted',
          used: budget.used,
          budget: budget.budget,
          degraded: budget.degraded,
        }),
      );
      // Se manda al teléfono, que además convierte mejor que el chat.
      return badRequest(
        `El asistente ha alcanzado su límite de consultas por hoy. Llámenos al ${DEFAULT_PHONE} y le atendemos en español.`,
        429,
        { 'Retry-After': '3600' },
      );
    }

    // Vercel BotID — Basic Detection, en report-only salvo que se pida bloquear.
    //
    // Misma degradación que /api/lead-capture y /api/newsletter/subscribe, que
    // este endpoint no tenía. Bloquear exige que el cliente esté inicializado
    // (NEXT_PUBLIC_BOTID_CLIENT_ENABLED, ver instrumentation-client.ts): sin él
    // el fetch del navegador no lleva challenge y checkBotId() marca como bot al
    // tráfico legítimo, así que BOTID_MODE=block a solas devolvería 403 a todos
    // los visitantes. Hoy esa variable NO existe en Vercel, así que el día que
    // alguien ponga BOTID_MODE=block este endpoint era el único que se caía —
    // y en silencio, porque el chat presenta cualquier fallo como un genérico
    // "problema de conexión", que es exactamente cómo el 403 de Gemini pasó
    // siete semanas sin que nadie lo notara.
    const botidClientEnabled = process.env.NEXT_PUBLIC_BOTID_CLIENT_ENABLED === 'true';
    const configuredBotMode = process.env.BOTID_MODE ?? 'report-only';
    const botBlockDowngraded = configuredBotMode === 'block' && !botidClientEnabled;
    const botMode = botBlockDowngraded ? 'report-only' : configuredBotMode;
    const verification = await checkBotId();
    if (verification.isBot) {
      const detection = JSON.stringify({
        event: 'botid_detected',
        endpoint: '/api/chat',
        mode: botMode,
        configured_mode: configuredBotMode,
        client_enabled: botidClientEnabled,
        downgraded: botBlockDowngraded,
        timestamp: new Date().toISOString(),
        ip,
        ua: request.headers.get('user-agent') ?? null,
      });
      // Degradado se registra como error, no como aviso: significa que alguien
      // pidió bloquear y no se está bloqueando. Tiene que verse en los logs.
      if (botBlockDowngraded) console.error(detection);
      else console.warn(detection);
      if (botMode === 'block') {
        return badRequest('Access denied', 403);
      }
    }

    // Tope de cuerpo antes de parsear: content-length primero (barato) y luego
    // el texto real, porque la cabecera puede faltar o mentir.
    const declaredLength = Number(request.headers.get('content-length') || 0);
    if (declaredLength > MAX_BODY_BYTES) {
      return badRequest('Solicitud demasiado grande', 413);
    }
    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_BYTES) {
      return badRequest('Solicitud demasiado grande', 413);
    }

    let parsedBody: unknown;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch {
      return badRequest('Mensaje inválido', 400);
    }
    if (!parsedBody || typeof parsedBody !== 'object') {
      return badRequest('Mensaje inválido', 400);
    }

    const { message, conversationHistory, language } = parsedBody as {
      message?: unknown;
      conversationHistory?: unknown;
      language?: unknown;
    };

    if (typeof message !== 'string' || message.trim() === '') {
      return badRequest('Mensaje inválido', 400);
    }
    if (message.length > MAX_MESSAGE_CHARS) {
      return badRequest(
        `El mensaje es demasiado largo. Por favor resúmalo en menos de ${MAX_MESSAGE_CHARS} caracteres.`,
        400,
      );
    }

    // El idioma lo decide el sitio, no el modelo: si el visitante está en /en y
    // escribe una palabra en español, la respuesta debe seguir en inglés.
    const lang: Lang = language === 'en' ? 'en' : 'es';

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error(
        JSON.stringify({
          event: 'chat_misconfigured',
          endpoint: '/api/chat',
          reason: 'ANTHROPIC_API_KEY ausente',
          timestamp: new Date().toISOString(),
        }),
      );
      return badRequest(UNAVAILABLE, 503);
    }

    const client = new Anthropic({
      apiKey,
      timeout: UPSTREAM_TIMEOUT_MS,
      maxRetries: 1,
    });

    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      // Temperatura baja: en Haiku 4.5 los parámetros de muestreo siguen
      // aceptándose (en Opus 4.7+ devolverían 400). Un asistente que informa
      // sobre plazos legales y oficinas debe contestar dos veces lo mismo a la
      // misma pregunta; aquí la variedad no es una virtud.
      temperature: 0.3,
      system: buildSystemPrompt(lang),
      messages: buildMessages(conversationHistory, message.trim()),
    });

    // Se espera el primer fragmento de texto ANTES de responder. Al abrir un
    // stream las cabeceras salen con 200 de inmediato, así que un fallo de
    // credenciales o un 429 llegarían disfrazados de respuesta correcta y
    // vacía — que es exactamente cómo el 403 de Gemini pasó siete semanas
    // desapercibido. Consumiendo el primer delta aquí, los fallos de arranque
    // todavía pueden devolver su código real.
    const iterator = stream[Symbol.asyncIterator]();
    let firstChunk = '';
    while (!firstChunk) {
      const next = await iterator.next();
      if (next.done) break;
      const event = next.value;
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        firstChunk = event.delta.text;
      }
    }

    if (!firstChunk) {
      // Sin texto: turno vacío o rechazado por el modelo. No hay nada que
      // enseñar, así que se trata como indisponibilidad.
      const finished = await stream.finalMessage().catch(() => null);
      console.error(
        JSON.stringify({
          event: 'chat_empty_response',
          endpoint: '/api/chat',
          model: MODEL,
          stop_reason: finished?.stop_reason ?? null,
          timestamp: new Date().toISOString(),
        }),
      );
      return badRequest(UNAVAILABLE, 502);
    }

    const encoder = new TextEncoder();
    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          controller.enqueue(encoder.encode(firstChunk));
          while (true) {
            const next = await iterator.next();
            if (next.done) break;
            const event = next.value;
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }

          const finished = await stream.finalMessage();
          console.log(
            JSON.stringify({
              event: 'chat_completed',
              endpoint: '/api/chat',
              model: MODEL,
              lang,
              stop_reason: finished.stop_reason,
              input_tokens: finished.usage.input_tokens,
              output_tokens: finished.usage.output_tokens,
              // Consumo del día frente al techo, en cada respuesta: es lo que
              // permite ver cuánto margen queda sin abrir la consola de
              // Anthropic, y saber si el tope está bien puesto o estorba.
              budget_used: budget.used,
              budget_limit: budget.budget,
              timestamp: new Date().toISOString(),
            }),
          );
        } catch (error) {
          // La respuesta ya iba en camino con 200: el único aviso posible es
          // el marcador, que el cliente convierte en la vía de contacto.
          console.error(
            JSON.stringify({
              event: 'chat_stream_failed',
              endpoint: '/api/chat',
              model: MODEL,
              error: error instanceof Error ? error.message : String(error),
              timestamp: new Date().toISOString(),
            }),
          );
          controller.enqueue(encoder.encode(STREAM_ERROR_MARKER));
        } finally {
          controller.close();
        }
      },
      cancel() {
        // El visitante cerró el widget: no se sigue pagando generación.
        void stream.abort();
      },
    });

    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
        // Sin esto, un proxy intermedio puede acumular la respuesta y
        // entregarla de golpe, que es justo lo que el streaming evita.
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error) {
    // Clases tipadas del SDK en vez de comparar textos de error: el estado que
    // se devuelve determina si el widget reintenta o no.
    if (error instanceof Anthropic.AuthenticationError || error instanceof Anthropic.PermissionDeniedError) {
      // La causa más probable de un 401/403 es una clave revocada o sin saldo,
      // y es un fallo total y silencioso del asistente. Se registra con su
      // propio `event` para que salte en los logs de runtime de Vercel.
      console.error(
        JSON.stringify({
          event: 'chat_auth_failed',
          endpoint: '/api/chat',
          model: MODEL,
          status: error.status,
          message: error.message,
          hint: 'Clave ANTHROPIC_API_KEY revocada, inválida o sin crédito.',
          timestamp: new Date().toISOString(),
        }),
      );
      return badRequest(UNAVAILABLE, 503);
    }

    if (error instanceof Anthropic.RateLimitError) {
      console.warn(
        JSON.stringify({
          event: 'chat_upstream_rate_limited',
          endpoint: '/api/chat',
          model: MODEL,
          timestamp: new Date().toISOString(),
        }),
      );
      return badRequest(UNAVAILABLE, 429, { 'Retry-After': '30' });
    }

    if (error instanceof Anthropic.APIConnectionTimeoutError) {
      console.error(
        JSON.stringify({
          event: 'chat_upstream_timeout',
          endpoint: '/api/chat',
          model: MODEL,
          timeout_ms: UPSTREAM_TIMEOUT_MS,
          timestamp: new Date().toISOString(),
        }),
      );
      return badRequest(UNAVAILABLE, 504);
    }

    console.error(
      JSON.stringify({
        event: 'chat_failed',
        endpoint: '/api/chat',
        model: MODEL,
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      }),
    );
    return badRequest(UNAVAILABLE, 502);
  }
}
