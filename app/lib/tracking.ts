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
  hasFbpCookie,
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
// Solo `getUTMParams()`: leer un UTM suelto de la URL actual ignoraría las
// cookies de atribución y volvería a atribuir mal las conversiones que ocurren
// después de varios clicks internos.
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

// ─── Cola hacia los globals de analítica ───
//
// gtag.js y los snippets de los pixels se cargan con strategy="lazyOnload"
// (después del window.load): un click en los primeros segundos de la visita
// ocurre cuando window.gtag / window.fbq / window.ttq todavía no existen, y
// llamarlos en ese momento pierde el evento. Aquí se encola hasta que el
// global aparezca. El evento 'msl:fbq-ready' que dispara el snippet de Meta
// acelera el vaciado; el poll cubre a los globals que no anuncian su llegada.
const ANALYTICS_READY_EVENT = 'msl:fbq-ready';
const ANALYTICS_RETRY_MS = 250;
const ANALYTICS_MAX_TRIES = 40;

const pendingAnalyticsCalls: Array<() => boolean> = [];
let analyticsListenerRegistered = false;
let analyticsPollActive = false;

function flushAnalyticsQueue(): void {
  const pending = pendingAnalyticsCalls.splice(0, pendingAnalyticsCalls.length);
  for (const attempt of pending) {
    if (!attempt()) pendingAnalyticsCalls.push(attempt);
  }
}

/**
 * Ejecuta `use` con el global de analítica que devuelva `resolve` en cuanto
 * exista. Mientras `resolve` devuelva undefined la llamada queda en cola, así
 * que un click anterior a la carga del script del proveedor no se descarta.
 */
export function whenAnalyticsReady<T>(
  resolve: () => T | undefined,
  use: (api: T) => void,
): void {
  if (typeof window === 'undefined') return;

  const attempt = (): boolean => {
    const api = resolve();
    if (!api) return false;
    try {
      use(api);
    } catch {
      // Una superficie de analítica rota nunca debe romper la página.
    }
    return true;
  };

  if (attempt()) return;
  pendingAnalyticsCalls.push(attempt);

  if (!analyticsListenerRegistered) {
    analyticsListenerRegistered = true;
    window.addEventListener(ANALYTICS_READY_EVENT, flushAnalyticsQueue);
  }

  if (analyticsPollActive) return;
  analyticsPollActive = true;
  let tries = ANALYTICS_MAX_TRIES;
  const tick = () => {
    flushAnalyticsQueue();
    if (pendingAnalyticsCalls.length === 0 || tries-- <= 0) {
      analyticsPollActive = false;
      return;
    }
    setTimeout(tick, ANALYTICS_RETRY_MS);
  };
  setTimeout(tick, ANALYTICS_RETRY_MS);
}

// ─── FASE 3: dataLayer push helper ───
type GtagFn = (...args: unknown[]) => void;

interface WindowWithAnalytics extends Window {
  dataLayer?: unknown[];
  gtag?: GtagFn;
}

/**
 * Superficie GA4 del sitio. El layout instala gtag.js, no un contenedor GTM:
 * gtag.js solo procesa las entradas del dataLayer que la propia función gtag()
 * pushea como `arguments`, de modo que el push plano de aquí es inerte hasta
 * que exista un contenedor GTM real — se conserva para ese día. El canal que
 * GA4 lee hoy es gtag('event', …), y por eso el evento no se duplica.
 */
export function pushToDataLayer(event: string, params: Record<string, string>) {
  if (typeof window === 'undefined') return;
  try {
    const w = window as WindowWithAnalytics;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event,
      ...params,
    });
  } catch (e) {
    console.error('[dataLayer] Push error:', e);
  }
  whenAnalyticsReady(
    () => (window as WindowWithAnalytics).gtag,
    (gtag) => gtag('event', event, params),
  );
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

// Espera máxima a que aparezca la cookie _fbp antes de mandar el beacon del
// primer page view, y cadencia del sondeo. La escribe fbevents.js, que el
// layout carga con lazyOnload: en la primera página de un visitante nuevo el
// beacon salía siempre sin ese match key y el PageView server-side llegaba a
// Meta solo con IP+UA (EMQ bajo).
const FBP_WAIT_MAX_MS = 2500;
const FBP_POLL_MS = 200;

/**
 * Manda el page view en cuanto exista _fbp, o al vencer FBP_WAIT_MAX_MS, o
 * cuando el visitante abandona la página — lo que ocurra primero, una sola
 * vez. El tope es deliberado: con el Pixel bloqueado la cookie no llega nunca
 * y perder el page view sería peor que perder el match key.
 */
function postPageViewWithFbp(event: ConversionEvent, eventId: string): void {
  const immediate = collectMetaBrowserParams();
  if (immediate.fbp || !process.env.NEXT_PUBLIC_META_PIXEL_ID) {
    event.meta = { eventId, ...immediate };
    postEvent(event);
    return;
  }

  let sent = false;
  let pollId: ReturnType<typeof setInterval> | undefined;
  let deadlineId: ReturnType<typeof setTimeout> | undefined;

  function onVisibilityChange() {
    if (document.visibilityState === 'hidden') send();
  }

  function cleanup() {
    if (pollId !== undefined) clearInterval(pollId);
    if (deadlineId !== undefined) clearTimeout(deadlineId);
    window.removeEventListener('pagehide', send);
    document.removeEventListener('visibilitychange', onVisibilityChange);
  }

  function send() {
    if (sent) return;
    sent = true;
    cleanup();
    // Se relee al enviar: en la espera pueden haber aparecido _fbp y _fbc.
    event.meta = { eventId, ...collectMetaBrowserParams() };
    postEvent(event);
  }

  pollId = setInterval(() => {
    if (hasFbpCookie()) send();
  }, FBP_POLL_MS);
  deadlineId = setTimeout(send, FBP_WAIT_MAX_MS);
  window.addEventListener('pagehide', send);
  document.addEventListener('visibilitychange', onVisibilityChange);
}

export function trackPageView(label?: string): void {
  if (typeof window === 'undefined') return;
  const path = window.location.pathname + window.location.search;
  if (path === lastTrackedPath) return;
  lastTrackedPath = path;
  // Un solo event_id por page view: el Pixel del navegador y el evento
  // que /api/conversions reenvía a la Conversions API llevan el MISMO
  // id → Meta deduplica y no cuenta la visita dos veces. El beacon puede
  // salir con unos ms de retraso (espera de _fbp) sin afectar al dedup:
  // el id ya está fijado aquí.
  const eventId = generateMetaEventId();
  firePixelPageView(eventId);
  postPageViewWithFbp(buildBaseEvent('page_view', label), eventId);
}
