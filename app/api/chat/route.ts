import { GoogleGenerativeAI } from '@google/generative-ai';
import { checkBotId } from 'botid/server';
import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '../../lib/rateLimit';

// --- CONFIGURACIÓN Y CONTEXTO DEL SITIO (ACTUALIZADO) ---
// La información ha sido saneada: Nuevo número de teléfono y prohibición de enlaces.
const SITE_CONTEXT = `
ERES: "Nora", la asistente virtual oficial de las Oficinas Legales de Manuel Solís.
TU OBJETIVO: Atender al cliente con profesionalismo, identificar su necesidad y CONVENCERLO de agendar una consulta o llamar.

DATOS CLAVE DEL DESPACHO:
- Experiencia: Más de 35 años y más de 50,000 casos ganados.
- Eslogan: "Nuestra pasión es ayudarle."
- Teléfono Principal: 1-888-676-1238(Siempre ofrécelo, este es EL UNICO NUMERO QUE HAY, NO MAS)
- Abogado Principal: Manuel Solís.
- Oficinas Principales: Houston, Dallas, Los Ángeles, Chicago.

ÁREAS DE PRÁCTICA (Servicios y Rutas):
1. Inmigración: Defensa contra la deportación, Asilo, Visas (U/VAWA), Residencia (Familiar/Empleo), Ciudadanía, DACA.
2. Accidentes: Auto, Camiones 18 ruedas, Trabajo, Negligencia Médica, Explosiones.
3. Ley Criminal: DWI/DUI, Violencia Doméstica, Asalto, Robos.
4. Familia: Divorcios, Custodia, Manutención.
5. Seguros: Reclamos por tormentas, granizo, incendios, techos.
6. Información General: Abogados, Oficinas, Testimonios, Preguntas Frecuentes, Políticas de Privacidad.

REGLAS DE RESPUESTA (CRÍTICO):
1. TONO: Estrictamente profesional, amable, empático y persuasivo. NUNCA uses emojis.
2. FORMATO: Usa párrafos cortos separados por **saltos de línea doble** para garantizar una buena lectura (con espacio y separado). NUNCA uses negritas ni listas con viñetas o asteriscos.
3. ENLACES: **NUNCA generes hipervínculos, URLs, ni rutas de archivo.** Solo proporciona información sobre el sitio cuando sea preguntado directamente sobre ese contenido.
4. RESTRICCIONES:
    - NUNCA des consejo legal específico ("Usted califica para X"). Di: "Un abogado debe evaluar su caso específico".
    - NO inventes precios. Di: "El costo depende del caso y será evaluado por un abogado".
5. CIERRE: Siempre termina invitando a la acción de manera profesional: llamar para una consulta o usar el formulario de contacto, ofreciendo el número (832) 598-0914. EXCEPCIÓN: Si el tema es Visa E-2 o inversión, ofrece el (888) 676-1238.

EJEMPLOS DE INTERACCIÓN (Ahora sin enlaces):

Usuario: "¿Quién es Manuel Solís?"
IA: El Abogado Manuel Solís es el Fundador de las Oficinas Legales de Manuel Solís. Es un experto legal con más de 34 años de experiencia. Su despacho ha ganado más de 50,000 casos en áreas clave como Inmigración y Accidentes. Si desea conocer más, puede ver el perfil completo en la sección de Abogados de nuestro sitio web. Si tiene un caso, le recomiendo llamar al (832) 598-0914 para que su equipo revise su situación.

Usuario: "Necesito un abogado de inmigración"
IA: Entiendo su necesidad. En las Oficinas de Manuel Solís somos especialistas en casos de inmigración, incluyendo asilo, defensa contra la deportación y visas. Contamos con más de 34 años de experiencia ayudando a familias a arreglar su estatus. Lo mejor es que un abogado revise su historial para ver qué opción es segura para usted. Por favor, llámenos al (832) 598-0914 para una evaluación confidencial.
`;

// --- MAPEO DE ENLACES ELIMINADO ---
// Se elimina la función linkifyResponse y el LINK_MAP ya que los enlaces están prohibidos.

// --- TOPES DE ENTRADA Y SALIDA ---
// Cada request gasta cuota de pago (GEMINI_API_KEY), así que el costo
// máximo por llamada se acota aquí y no en el cliente.
const MAX_MESSAGE_CHARS = 1000;
const MAX_HISTORY_TURNS = 10;
const MAX_TURN_CHARS = 2000;
// 10 turnos × 2000 chars + mensaje + overhead del JSON, con holgura.
const MAX_BODY_BYTES = 32_000;
// gemini-2.5-flash cuenta los thinking tokens dentro de maxOutputTokens:
// un tope corto devuelve respuestas vacías (finishReason MAX_TOKENS).
const MAX_OUTPUT_TOKENS = 2048;

interface ChatTurn {
    role: 'user' | 'model';
    parts: { text: string }[];
}

/**
 * Reconstruye el historial en el servidor. El `role` que manda el cliente
 * se ignora: de otro modo podría inyectar turnos falsos de "assistant" y
 * escribir el contexto a su antojo. El widget envía el historial completo
 * en orden y terminado siempre en la última respuesta del modelo, así que
 * los roles se asignan hacia atrás desde el final; si el primer turno
 * queda como model se descarta, porque Gemini exige que el historial
 * empiece en user y alterne (validateChatHistory del SDK lanza si no).
 */
function buildChatHistory(raw: unknown): ChatTurn[] {
    if (!Array.isArray(raw)) return [];

    const texts: string[] = [];
    for (const item of raw) {
        if (!item || typeof item !== 'object') continue;
        const content = (item as { content?: unknown }).content;
        if (typeof content !== 'string') continue;
        const text = content.trim();
        if (!text) continue;
        texts.push(text.slice(0, MAX_TURN_CHARS));
    }

    const recent = texts.slice(-MAX_HISTORY_TURNS);
    const history: ChatTurn[] = recent.map((text, i) => ({
        role: (recent.length - 1 - i) % 2 === 0 ? 'model' : 'user',
        parts: [{ text }],
    }));

    if (history.length > 0 && history[0].role !== 'user') {
        history.shift();
    }

    return history;
}

export async function POST(request: NextRequest) {
    try {
        // Rate limiting: 15 requests per minute per IP
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                   request.headers.get('x-real-ip') ||
                   'anonymous';
        const { success: rateLimitOk } = rateLimit(`chat:${ip}`, 15, 60000);
        if (!rateLimitOk) {
            return NextResponse.json(
                { success: false, error: 'Demasiadas solicitudes. Por favor espere un momento antes de enviar otro mensaje.' },
                { status: 429, headers: { 'Retry-After': '60' } }
            );
        }

        // Vercel BotID — Basic Detection in report-only mode by default.
        const botMode = process.env.BOTID_MODE ?? 'report-only';
        const verification = await checkBotId();
        if (verification.isBot) {
            console.warn(
                JSON.stringify({
                    event: 'botid_detected',
                    endpoint: '/api/chat',
                    mode: botMode,
                    timestamp: new Date().toISOString(),
                    ip,
                    ua: request.headers.get('user-agent') ?? null,
                }),
            );
            if (botMode === 'block') {
                return NextResponse.json(
                    { success: false, error: 'Access denied' },
                    { status: 403 },
                );
            }
        }

        // Tope de cuerpo antes de parsear: content-length primero (barato) y
        // luego el texto real, porque la cabecera puede faltar o mentir.
        const declaredLength = Number(request.headers.get('content-length') || 0);
        if (declaredLength > MAX_BODY_BYTES) {
            return NextResponse.json(
                { success: false, error: 'Solicitud demasiado grande' },
                { status: 413 }
            );
        }

        const rawBody = await request.text();
        if (rawBody.length > MAX_BODY_BYTES) {
            return NextResponse.json(
                { success: false, error: 'Solicitud demasiado grande' },
                { status: 413 }
            );
        }

        let parsedBody: unknown;
        try {
            parsedBody = JSON.parse(rawBody);
        } catch {
            return NextResponse.json(
                { success: false, error: 'Mensaje inválido' },
                { status: 400 }
            );
        }

        if (!parsedBody || typeof parsedBody !== 'object') {
            return NextResponse.json(
                { success: false, error: 'Mensaje inválido' },
                { status: 400 }
            );
        }

        const { message, conversationHistory } = parsedBody as {
            message?: unknown;
            conversationHistory?: unknown;
        };

        if (typeof message !== 'string' || message.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'Mensaje inválido' },
                { status: 400 }
            );
        }

        if (message.length > MAX_MESSAGE_CHARS) {
            return NextResponse.json(
                { success: false, error: `El mensaje es demasiado largo. Por favor resúmalo en menos de ${MAX_MESSAGE_CHARS} caracteres.` },
                { status: 400 }
            );
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { success: false, error: 'Error de configuración interna: Clave de API faltante.' },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash', // Modelo actualizado para mejor rendimiento
            systemInstruction: SITE_CONTEXT,
            generationConfig: { maxOutputTokens: MAX_OUTPUT_TOKENS }
        });

        const chatHistory = buildChatHistory(conversationHistory);

        const chat = model.startChat({
            history: chatHistory,
        });

        const result = await chat.sendMessage(message);
        let responseText = result.response.text();

        // --- POST-PROCESAMIENTO: LIMPIEZA DE FORMATO ---
        
        // 1. Eliminar emojis
        const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
        responseText = responseText.replace(emojiRegex, '');

        // 2. Eliminar negritas y listas si persisten
        responseText = responseText.replace(/\*\*/g, '');
        responseText = responseText.replace(/^\s*-\s?/gm, ''); // Elimina listas con guiones
        responseText = responseText.replace(/^\s*\*\s?/gm, ''); // Elimina listas con asteriscos

        // 3. Normalizar saltos de línea para asegurar el "espacio y separado"
        // Primero, reemplaza múltiples saltos de línea por dos (párrafos separados)
        responseText = responseText.replace(/(\n\s*){2,}/g, '\n\n');
        // Luego, elimina cualquier salto de línea simple que no esté entre párrafos separados
        responseText = responseText.replace(/([^\n])\n([^\n])/g, '$1 $2');
        // Asegura que al final queden dobles saltos entre párrafos si el modelo solo puso uno
        responseText = responseText.trim().replace(/\n/g, '\n\n');


        return NextResponse.json({
            success: true,
            message: responseText
        });

    } catch (error: any) {
        console.error('🔥 Error en Chat API:', error);
        
        return NextResponse.json(
            { 
                success: false, 
                // NÚMERO DE TELÉFONO ACTUALIZADO EN EL FALLBACK
                error: 'Lo siento, hubo un problema de conexión. Por favor llámanos al (832) 598-0914.' 
            },
            { status: 500 }
        );
        
    }
}