import 'server-only';

/**
 * Meta Conversions API (CAPI) — envío server-side de eventos al dataset
 * de Meta (Events Manager), en espejo del Pixel del navegador.
 *
 * Por qué existe:
 *   El Pixel (fbq) se pierde con adblockers/ITP y no lleva IP ni user
 *   agent. Marketing pidió (2026-08-03) que PageView — la señal de
 *   visita que mide Search Lift — se comparta también desde el server,
 *   igual que el Purchase que ya envía un sistema externo, con
 *   deduplicación por event_id.
 *
 * Reglas:
 *   - Se activa SOLO si META_CAPI_ACCESS_TOKEN está configurado; sin
 *     token todo es un no-op silencioso (deploy seguro sin la env var).
 *   - El token JAMÁS se hardcodea ni se commitea (vive en Vercel →
 *     Settings → Environment Variables).
 *   - Dedup: el event_id viene del navegador y es el MISMO que lleva el
 *     fbq('track', ..., {eventID}) del Pixel; Meta descarta el duplicado
 *     dentro de su ventana de 48 h (ver app/lib/metaPixel.ts).
 *   - NO enviamos PII (email/teléfono). Los match keys son IP, user
 *     agent, _fbp y _fbc — suficientes para PageView. Si algún día se
 *     agrega PII hasheada, revisar el aviso de privacidad primero.
 *
 * Dataset destino: META_DATASET_ID, con fallback al pixel del navegador
 * (NEXT_PUBLIC_META_PIXEL_ID) — deben ser el mismo para que el dedup
 * Pixel ↔ CAPI funcione.
 */

const GRAPH_API_VERSION = 'v23.0';
const REQUEST_TIMEOUT_MS = 5000;

// _fbp/_fbc tienen forma `fb.<subdomainIndex>.<timestamp>.<valor>`.
// Descartamos cualquier cosa malformada: Meta degrada la calidad del
// evento (EMQ) cuando recibe parámetros basura.
const FB_COOKIE_RE = /^fb\.[0-2]\.\d{6,}\.\S{4,}$/;

export interface MetaServerEvent {
  eventName: 'PageView';
  /** Id compartido con el Pixel del navegador — la clave del dedup. */
  eventId: string;
  /** URL completa (https://dominio/path?query) donde ocurrió el evento. */
  eventSourceUrl: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
  /** Cookie _fbp (browser id de Meta). */
  fbp?: string;
  /** Cookie _fbc o valor construido desde ?fbclid (click id de Meta). */
  fbc?: string;
}

interface CapiUserData {
  client_ip_address?: string;
  client_user_agent?: string;
  fbp?: string;
  fbc?: string;
}

interface CapiEventPayload {
  event_name: string;
  event_time: number;
  event_id: string;
  event_source_url: string;
  action_source: 'website';
  user_data: CapiUserData;
}

export interface CapiRequestBody {
  data: CapiEventPayload[];
  test_event_code?: string;
}

export interface CapiSendResult {
  /** true si Meta aceptó los eventos (o si no había nada que enviar). */
  ok: boolean;
  /** false cuando faltó token/dataset y el envío ni se intentó. */
  attempted: boolean;
  status?: number;
  /** Cuerpo crudo de la respuesta de Meta (JSON string), para logs/tests. */
  body?: string;
}

function validFbCookie(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return FB_COOKIE_RE.test(value) ? value : undefined;
}

/**
 * Construye el body para POST /{dataset}/events. Pura (recibe `nowSeconds`)
 * para poder validarla en unit tests sin red.
 *
 * Un evento sin NINGÚN match key en user_data se descarta: Meta rechaza
 * eventos sin customer information parameters.
 */
export function buildEventsPayload(
  events: MetaServerEvent[],
  opts: { testEventCode?: string; nowSeconds?: number } = {},
): CapiRequestBody {
  const eventTime = opts.nowSeconds ?? Math.floor(Date.now() / 1000);

  const data: CapiEventPayload[] = [];
  for (const ev of events) {
    if (!ev.eventId || !ev.eventSourceUrl) continue;
    // client_user_agent es OBLIGATORIO para action_source=website:
    // Graph API rechaza el evento (code 100, subcode 2804019). Mejor
    // descartarlo aquí que gastar el request en un 400 seguro.
    if (!ev.clientUserAgent) continue;

    const userData: CapiUserData = {};
    if (ev.clientIpAddress) userData.client_ip_address = ev.clientIpAddress;
    if (ev.clientUserAgent) userData.client_user_agent = ev.clientUserAgent;
    const fbp = validFbCookie(ev.fbp);
    const fbc = validFbCookie(ev.fbc);
    if (fbp) userData.fbp = fbp;
    if (fbc) userData.fbc = fbc;

    if (Object.keys(userData).length === 0) continue;

    data.push({
      event_name: ev.eventName,
      event_time: eventTime,
      event_id: ev.eventId,
      event_source_url: ev.eventSourceUrl,
      action_source: 'website',
      user_data: userData,
    });
  }

  const body: CapiRequestBody = { data };
  if (opts.testEventCode) body.test_event_code = opts.testEventCode;
  return body;
}

/**
 * Envía eventos a la Conversions API. Nunca lanza: los fallos se
 * loggean y se devuelven en el resultado (el caller — un after() del
 * route — no debe romper nada del request original).
 */
export async function sendMetaCapiEvents(
  events: MetaServerEvent[],
): Promise<CapiSendResult> {
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  const datasetId =
    process.env.META_DATASET_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!token || !datasetId) return { ok: false, attempted: false };

  const testEventCode = process.env.META_CAPI_TEST_EVENT_CODE || undefined;
  const payload = buildEventsPayload(events, { testEventCode });
  if (payload.data.length === 0) return { ok: true, attempted: false };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${datasetId}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      },
    );
    const body = await res.text().catch(() => '');
    if (!res.ok) {
      // El token va en la query, nunca en el body → seguro de loggear.
      console.error(
        `[META-CAPI] HTTP ${res.status} al enviar ${payload.data.length} evento(s): ${body.slice(0, 300)}`,
      );
    } else if (testEventCode) {
      // Solo en modo test (pestaña "Test events" del Events Manager):
      // deja rastro en los logs de Vercel para la verificación manual.
      console.log(`[META-CAPI] test event aceptado: ${body.slice(0, 200)}`);
    }
    return { ok: res.ok, attempted: true, status: res.status, body };
  } catch (e) {
    console.error(
      '[META-CAPI] fallo de red/timeout:',
      e instanceof Error ? e.message : e,
    );
    return { ok: false, attempted: true };
  } finally {
    clearTimeout(timer);
  }
}
