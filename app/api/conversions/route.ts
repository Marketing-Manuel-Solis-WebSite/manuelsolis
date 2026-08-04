import { NextRequest, NextResponse } from 'next/server';
import { after } from 'next/server';
import { rateLimit } from '../../lib/rateLimit';
import {
  pushEvent,
  filterEvents,
  type StoredEvent,
  type StoredEventType,
} from '../../lib/analyticsStore';
import { sendMetaCapiEvents } from '../../lib/metaCapi';
import { verifyConversionsApiKey } from '../../lib/newsletter/auth';

/**
 * FASE 4 — Flight Check API
 * Registra conversiones y page views del lado servidor para conciliar con GA4.
 *
 * POST /api/conversions  → Registra un evento (conversion o page_view)
 * GET  /api/conversions  → Resumen rápido; exige `Authorization: Bearer
 *                          <CONVERSIONS_API_KEY>` y devuelve los eventos
 *                          sin PII (IP enmascarada, sin user agent)
 *
 * El dashboard rico vive en /api/analytics.
 *
 * Además, los page_view se reenvían a la Meta Conversions API (CAPI)
 * cuando el payload trae `meta.eventId` — el mismo id del fbq del
 * navegador, para que Meta deduplique Pixel ↔ server (ver
 * app/lib/metaCapi.ts). Requiere META_CAPI_ACCESS_TOKEN; sin token el
 * reenvío es un no-op.
 */

// event_id que genera el navegador: UUID o fallback `ev.<ts36>.<rand>`.
// Rechazamos cualquier otra forma para no reenviar basura a Meta.
const META_EVENT_ID_RE = /^[A-Za-z0-9._-]{8,64}$/;

// Solo el dominio real de producción alimenta el dataset de Meta: el QA
// local (127.0.0.1 / IP de LAN con token en .env.local) o un preview
// *.vercel.app inflarían los PageView reales sin par de Pixel que los
// deduplique. El dominio se resuelve del request, no del body.
const META_PROD_DOMAIN_RE = /(^|\.)manuelsolis\.com$/i;

const VALID_TYPES = new Set<StoredEventType>([
  'form_submit',
  'phone_click',
  'whatsapp_click',
  'consulta_click',
  'qualified_lead',
  'page_view',
]);

// El beacon más grande (page_view con _fbc largo, path y referrer al tope)
// ronda los 2 KB; todo lo que pase de esto no es tráfico del sitio.
const MAX_BODY_BYTES = 8_000;

// Ventana de tolerancia para el reloj del cliente. Fuera de ella el
// timestamp se descarta: un beacon forjado podría reescribir el pasado del
// ledger o adelantarse tanto que sobreviva a la purga por retención.
const MAX_CLOCK_DRIFT_MS = 5 * 60 * 1000;

function clip(v: unknown, max: number): string | undefined {
  if (v == null) return undefined;
  const s = String(v);
  if (!s) return undefined;
  return s.slice(0, max);
}

function isStoredEventType(v: unknown): v is StoredEventType {
  return typeof v === 'string' && (VALID_TYPES as Set<string>).has(v);
}

function resolveDeviceType(v: unknown): StoredEvent['deviceType'] {
  if (v === 'mobile') return 'mobile';
  if (v === 'tablet') return 'tablet';
  if (v === 'desktop') return 'desktop';
  return 'unknown';
}

function resolveTimestamp(v: unknown): string {
  const now = Date.now();
  if (typeof v === 'string') {
    const parsed = Date.parse(v);
    if (!Number.isNaN(parsed) && Math.abs(now - parsed) <= MAX_CLOCK_DRIFT_MS) {
      return new Date(parsed).toISOString();
    }
  }
  return new Date(now).toISOString();
}

/**
 * Dominio del evento tomado del request (cabecera Host, que fija la
 * plataforma), nunca de `body.domain`: con el dominio del body el cliente
 * elegía a qué sitio se le atribuían las conversiones y si el PageView
 * entraba al dataset real de Meta.
 */
function resolveRequestHost(request: NextRequest): string {
  const host = request.headers.get('host') || request.nextUrl.hostname || '';
  return host.toLowerCase().replace(/:\d+$/, '').slice(0, 100);
}

// ─── POST: Registrar evento ───
export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'anonymous';

    // Rate limit más permisivo para page_view (90/min) que para conversiones (30/min).
    // Usamos un solo bucket "trk" pero con tope generoso porque el envío incluye PV.
    const { success: rateLimitOk } = rateLimit(`trk:${ip}`, 90, 60000);
    if (!rateLimitOk) {
      return NextResponse.json({ ok: false }, { status: 429 });
    }

    // Tope de cuerpo antes de parsear: content-length primero (barato) y
    // luego el texto real, porque la cabecera puede faltar o mentir.
    const declaredLength = Number(request.headers.get('content-length') || 0);
    if (declaredLength > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: 'Payload too large' }, { status: 413 });
    }

    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: 'Payload too large' }, { status: 413 });
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
    }
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
    }
    const body = parsed as Record<string, unknown>;

    const eventType = body.type;
    if (!isStoredEventType(eventType)) {
      return NextResponse.json({ ok: false, error: 'Invalid event type' }, { status: 400 });
    }

    const userAgent = request.headers.get('user-agent') || undefined;
    const country =
      request.headers.get('x-vercel-ip-country') ||
      request.headers.get('cf-ipcountry') ||
      undefined;

    // El path sí viene del cliente (es la URL donde ocurrió el evento),
    // pero solo se acepta como ruta relativa: así no puede convertirse en
    // otro origen al construir el event_source_url de Meta.
    const clientPath = clip(body.path, 500);

    const entry: StoredEvent = {
      type: eventType,
      source: clip(body.source, 100) || 'direct',
      medium: clip(body.medium, 100) || 'none',
      campaign: clip(body.campaign, 200),
      content: clip(body.content, 200),
      term: clip(body.term, 200),
      label: clip(body.label, 200),
      domain: resolveRequestHost(request) || 'unknown',
      path: clientPath && clientPath.startsWith('/') ? clientPath : undefined,
      referrer: clip(body.referrer, 500),
      language: clip(body.language, 12),
      deviceType: resolveDeviceType(body.deviceType),
      screen: clip(body.screen, 16),
      sessionId: clip(body.sessionId, 24),
      timestamp: resolveTimestamp(body.timestamp),
      ip,
      userAgent: userAgent ? userAgent.slice(0, 200) : undefined,
      country: country ? country.slice(0, 4) : undefined,
      firstTouchSource: clip(body.firstTouchSource, 100),
      firstTouchMedium: clip(body.firstTouchMedium, 100),
      firstTouchCampaign: clip(body.firstTouchCampaign, 200),
      firstTouchContent: clip(body.firstTouchContent, 200),
    };

    pushEvent(entry);

    // ─── Meta CAPI passthrough (solo page_view, lo que pidió marketing
    // para Search Lift). after() responde el beacon primero y envía a
    // Meta después, sin sumar latencia al cliente. ───
    const rawMeta = body.meta as
      | { eventId?: unknown; fbp?: unknown; fbc?: unknown }
      | undefined;
    const metaEventId =
      typeof rawMeta?.eventId === 'string' && META_EVENT_ID_RE.test(rawMeta.eventId)
        ? rawMeta.eventId
        : undefined;

    // Gate de entorno: en producción, solo el dominio real. Fuera de
    // producción (dev local, previews) SOLO con META_CAPI_TEST_EVENT_CODE
    // seteado — esos eventos caen en la pestaña "Test events" del Events
    // Manager, nunca en los datos reales.
    const capiEnvOk =
      process.env.VERCEL_ENV === 'production'
        ? META_PROD_DOMAIN_RE.test(entry.domain)
        : Boolean(process.env.META_CAPI_TEST_EVENT_CODE);

    // userAgent es obligatorio: la Conversions API rechaza eventos
    // action_source=website sin client_user_agent (subcode 2804019).
    if (entry.type === 'page_view' && metaEventId && userAgent && capiEnvOk) {
      const eventSourceUrl = `https://${entry.domain}${entry.path || '/'}`;
      const capiEvent = {
        eventName: 'PageView' as const,
        eventId: metaEventId,
        eventSourceUrl,
        clientIpAddress: ip !== 'anonymous' ? ip : undefined,
        clientUserAgent: userAgent,
        fbp: clip(rawMeta?.fbp, 128),
        fbc: clip(rawMeta?.fbc, 400),
      };
      after(() => sendMetaCapiEvents([capiEvent]));
    }

    // Solo loggeamos conversions reales (page_view inundaría logs).
    if (entry.type !== 'page_view') {
      console.log(
        `[FLIGHT-CHECK] ${entry.type} | src=${entry.source} | med=${entry.medium} | cmp=${entry.campaign || '-'} | path=${entry.path || '-'} | dev=${entry.deviceType} | lbl=${entry.label || '-'}`,
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

/**
 * La IP completa y el user agent del visitante son PII y solo se necesitan
 * en el momento del request (rate limit y match keys de Meta CAPI): del
 * reporte sale únicamente el prefijo de red, que es lo que sirve para
 * agrupar sin identificar.
 */
type ReportEvent = Omit<StoredEvent, 'ip' | 'userAgent'> & { ipPrefix: string };

function maskIp(ip: string): string {
  if (ip === 'anonymous') return ip;
  if (ip.includes(':')) {
    // IPv6 → /48. Los grupos que `::` comprime son ceros, así que se
    // rellenan antes de cortar para no publicar un prefijo que no existe.
    const compressed = ip.includes('::');
    const groups = ip.split('::')[0].split(':').filter(Boolean);
    while (compressed && groups.length < 3) groups.push('0');
    if (groups.length < 3) return 'unknown';
    return `${groups.slice(0, 3).join(':')}::/48`;
  }
  const octets = ip.split('.');
  if (octets.length !== 4) return 'unknown';
  return `${octets[0]}.${octets[1]}.${octets[2]}.0/24`;
}

function toReportEvent(event: StoredEvent): ReportEvent {
  const { ip, userAgent, ...rest } = event;
  return { ...rest, ipPrefix: maskIp(ip) };
}

// ─── GET: Reporte simple para automatización ───
export async function GET(request: NextRequest) {
  const expectedKey = process.env.CONVERSIONS_API_KEY;
  if (!expectedKey) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  // Solo por cabecera y en tiempo constante, igual que /api/admin/short-links.
  const authorized = verifyConversionsApiKey(
    request.headers.get('authorization'),
    request.headers.get('x-api-key'),
  );
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const daysBack = parseInt(request.nextUrl.searchParams.get('days') || '7', 10);
  const cutoff = Date.now() - daysBack * 24 * 60 * 60 * 1000;

  const filtered = filterEvents({ from: cutoff }).filter(
    (e) => e.type !== 'page_view',
  );

  const summary: Record<string, Record<string, number>> = {};
  for (const c of filtered) {
    if (!summary[c.domain]) summary[c.domain] = {};
    summary[c.domain][c.type] = (summary[c.domain][c.type] || 0) + 1;
  }

  const bySource: Record<string, number> = {};
  for (const c of filtered) {
    const key = `${c.source}/${c.medium}`;
    bySource[key] = (bySource[key] || 0) + 1;
  }

  return NextResponse.json({
    period_days: daysBack,
    total_conversions: filtered.length,
    by_domain: summary,
    by_source: bySource,
    raw: filtered.slice(-200).map(toReportEvent),
  });
}
