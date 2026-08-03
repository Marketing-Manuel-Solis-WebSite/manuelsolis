/**
 * FASE 4 — Flight Check: Sistema de tracking propio (lado servidor)
 * Registra cada conversión y page view en /api/conversions para comparar con GA4 (Double Check).
 *
 * Uso en componentes:
 *   import { trackConversion, trackPageView, getUTMParams, pushToDataLayer } from '@/app/lib/tracking';
 *
 * Atribución persistente: `getUTMParams()` lee con prioridad
 *   URL actual > cookie last_touch > cookie first_touch > 'direct'/'none'
 * vía `app/lib/attribution.ts`. Así, una conversión disparada después
 * de varios clicks internos sigue atribuyéndose al canal real.
 */
import { getEffectiveUtms } from './attribution';
import {
  collectMetaBrowserParams,
  firePixelPageView,
  generateMetaEventId,
} from './metaPixel';

// ─── Tipos ───
export type ConversionType =
  | 'form_submit'
  | 'phone_click'
  | 'whatsapp_click'
  | 'consulta_click'
  | 'qualified_lead'
  | 'page_view';

export interface ConversionEvent {
  type: ConversionType;
  source: string;
  medium: string;
  campaign?: string;
  content?: string;
  term?: string;
  label?: string;
  domain: string;
  path?: string;
  referrer?: string;
  language?: string;
  deviceType?: 'mobile' | 'tablet' | 'desktop' | 'unknown';
  screen?: string;
  sessionId?: string;
  timestamp: string;
  /**
   * First-touch (cookie msl_attr) — origen al que se le acredita el
   * lead cuando convierte, independientemente del canal del momento.
   * Opcionales: pueden faltar si el visitante llegó direct sin UTMs.
   */
  firstTouchSource?: string;
  firstTouchMedium?: string;
  firstTouchCampaign?: string;
  firstTouchContent?: string;
  /**
   * Paridad Pixel ↔ Meta CAPI: event_id compartido con el fbq del
   * navegador + cookies _fbp/_fbc. El server (/api/conversions) reenvía
   * page_view a la Conversions API con estos datos; en el resto de
   * tipos el campo solo viaja (dedup-ready para cuando se activen).
   */
  meta?: { eventId: string; fbp?: string; fbc?: string };
}

// ─── Helpers UTM ───
export function getUTMParam(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
  } catch {
    return null;
  }
}

export function getUTMParams() {
  // Prioridad: URL > cookie last_touch > cookie first_touch > direct/none.
  // Mantenemos el shape `utm_*` que ya consumían los call sites antiguos
  // (lib/conversion.ts pushToDataLayer, etc.).
  const eff = getEffectiveUtms();
  return {
    utm_source: eff.source,
    utm_medium: eff.medium,
    utm_campaign: eff.campaign,
    utm_content: eff.content,
    utm_term: eff.term,
    firstTouchSource: eff.firstTouchSource,
    firstTouchMedium: eff.firstTouchMedium,
    firstTouchCampaign: eff.firstTouchCampaign,
    firstTouchContent: eff.firstTouchContent,
  };
}

// ─── FASE 3: dataLayer push helper ───
export function pushToDataLayer(event: string, params: Record<string, string>) {
  if (typeof window === 'undefined') return;
  try {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event,
      ...params,
    });
  } catch (e) {
    console.error('[dataLayer] Push error:', e);
  }
}

// ─── Helpers de contexto del cliente ───
const SESSION_KEY = 'msl_sid';
const SESSION_LAST_TS = 'msl_sid_ts';
// Nueva sesión si no hubo actividad por 30 minutos (estándar GA-like).
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

function generateSessionId(): string {
  // 12 chars: timestamp base36 + random base36
  const t = Date.now().toString(36);
  const r = Math.random().toString(36).slice(2, 8);
  return `${t}${r}`;
}

export function getSessionId(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const now = Date.now();
    const lastTs = parseInt(sessionStorage.getItem(SESSION_LAST_TS) || '0', 10);
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid || (lastTs && now - lastTs > SESSION_TIMEOUT_MS)) {
      sid = generateSessionId();
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    sessionStorage.setItem(SESSION_LAST_TS, String(now));
    return sid;
  } catch {
    return undefined;
  }
}

function detectDeviceType(): 'mobile' | 'tablet' | 'desktop' | 'unknown' {
  if (typeof window === 'undefined') return 'unknown';
  try {
    const ua = navigator.userAgent || '';
    const w = window.innerWidth || 0;
    if (/iPad|Tablet|PlayBook|Silk/i.test(ua) || (w >= 600 && w <= 1024 && /Mobi|Android/i.test(ua))) {
      return 'tablet';
    }
    if (/Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || w < 600) {
      return 'mobile';
    }
    return 'desktop';
  } catch {
    return 'unknown';
  }
}

function getLanguage(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const html = document.documentElement.getAttribute('lang');
    if (html) return html;
    return (navigator.language || '').slice(0, 5) || undefined;
  } catch {
    return undefined;
  }
}

function getScreen(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    return `${window.innerWidth}x${window.innerHeight}`;
  } catch {
    return undefined;
  }
}

function buildBaseEvent(
  type: ConversionType,
  label?: string,
): ConversionEvent {
  const utms = getUTMParams();
  return {
    type,
    source: utms.utm_source,
    medium: utms.utm_medium,
    campaign: utms.utm_campaign,
    content: utms.utm_content,
    term: utms.utm_term,
    label,
    domain: window.location.hostname,
    path: window.location.pathname + window.location.search,
    referrer: document.referrer || undefined,
    language: getLanguage(),
    deviceType: detectDeviceType(),
    screen: getScreen(),
    sessionId: getSessionId(),
    timestamp: new Date().toISOString(),
    firstTouchSource: utms.firstTouchSource,
    firstTouchMedium: utms.firstTouchMedium,
    firstTouchCampaign: utms.firstTouchCampaign,
    firstTouchContent: utms.firstTouchContent,
  };
}

function postEvent(event: ConversionEvent) {
  try {
    const payload = JSON.stringify(event);
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        '/api/conversions',
        new Blob([payload], { type: 'application/json' }),
      );
    } else {
      fetch('/api/conversions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Silencioso — no interrumpe la experiencia del usuario
  }
}

// ─── FASE 4: Flight Check — Envío al endpoint propio ───
export async function trackConversion(
  type: ConversionType,
  label?: string,
  meta?: ConversionEvent['meta'],
): Promise<void> {
  if (typeof window === 'undefined') return;
  const event = buildBaseEvent(type, label);
  if (meta) event.meta = meta;
  postEvent(event);
}

// ─── Page view tracking ───
// Dedup intra-sesión: no contar la misma URL dos veces si solo cambió el hash.
let lastTrackedPath: string | null = null;

export function trackPageView(label?: string): void {
  if (typeof window === 'undefined') return;
  const path = window.location.pathname + window.location.search;
  if (path === lastTrackedPath) return;
  lastTrackedPath = path;
  // Un solo event_id por page view: el Pixel del navegador y el evento
  // que /api/conversions reenvía a la Conversions API llevan el MISMO
  // id → Meta deduplica y no cuenta la visita dos veces.
  const eventId = generateMetaEventId();
  firePixelPageView(eventId);
  const event = buildBaseEvent('page_view', label);
  event.meta = { eventId, ...collectMetaBrowserParams() };
  postEvent(event);
}
