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

/**
 * FASE 4 — Flight Check API
 * Registra conversiones y page views del lado servidor para conciliar con GA4.
 *
 * POST /api/conversions  → Registra un evento (conversion o page_view)
 * GET  /api/conversions  → Resumen rápido (compatible con la versión anterior)
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

// Solo el dominio real de producción alimenta el dataset de Meta:
// `domain` viene del cliente (forjable) y sin este filtro el QA local
// (127.0.0.1 / IP de LAN con token en .env.local) o un preview
// *.vercel.app inflarían los PageView reales sin par de Pixel que los
// deduplique.
const META_PROD_DOMAIN_RE = /(^|\.)manuelsolis\.com$/i;

const VALID_TYPES = new Set<StoredEventType>([
  'form_submit',
  'phone_click',
  'whatsapp_click',
  'consulta_click',
  'qualified_lead',
  'page_view',
]);

function clip(v: unknown, max: number): string | undefined {
  if (v == null) return undefined;
  const s = String(v);
  if (!s) return undefined;
  return s.slice(0, max);
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

    const body = await request.json();

    if (!body.type || !VALID_TYPES.has(body.type)) {
      return NextResponse.json({ ok: false, error: 'Invalid event type' }, { status: 400 });
    }

    const userAgent = request.headers.get('user-agent') || undefined;
    const country =
      request.headers.get('x-vercel-ip-country') ||
      request.headers.get('cf-ipcountry') ||
      undefined;

    const entry: StoredEvent = {
      type: body.type as StoredEventType,
      source: clip(body.source, 100) || 'direct',
      medium: clip(body.medium, 100) || 'none',
      campaign: clip(body.campaign, 200),
      content: clip(body.content, 200),
      term: clip(body.term, 200),
      label: clip(body.label, 200),
      domain: clip(body.domain, 100) || 'unknown',
      path: clip(body.path, 500),
      referrer: clip(body.referrer, 500),
      language: clip(body.language, 12),
      deviceType:
        body.deviceType === 'mobile' ||
        body.deviceType === 'tablet' ||
        body.deviceType === 'desktop'
          ? body.deviceType
          : 'unknown',
      screen: clip(body.screen, 16),
      sessionId: clip(body.sessionId, 24),
      timestamp:
        typeof body.timestamp === 'string' && !Number.isNaN(Date.parse(body.timestamp))
          ? body.timestamp
          : new Date().toISOString(),
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

// ─── GET: Reporte simple (compat con versión anterior) ───
export async function GET(request: NextRequest) {
  const expectedKey = process.env.CONVERSIONS_API_KEY;
  if (!expectedKey) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  const authHeader = request.headers.get('authorization');
  const bearerKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const queryKey = request.nextUrl.searchParams.get('key');
  const providedKey = bearerKey || queryKey;

  if (!providedKey || providedKey !== expectedKey) {
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
    raw: filtered.slice(-200),
  });
}
