/**
 * FASE 4 — Flight Check: Sistema de tracking propio (lado servidor)
 * Registra cada conversión y page view en /api/conversions para comparar con GA4 (Double Check).
 *
 * Uso en componentes:
 *   import { trackConversion, trackPageView, getUTMParams, pushToDataLayer } from '@/app/lib/tracking';
 */

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
  return {
    utm_source: getUTMParam('utm_source') || 'direct',
    utm_medium: getUTMParam('utm_medium') || 'none',
    utm_campaign: getUTMParam('utm_campaign') || undefined,
    utm_content: getUTMParam('utm_content') || undefined,
    utm_term: getUTMParam('utm_term') || undefined,
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
): Promise<void> {
  if (typeof window === 'undefined') return;
  postEvent(buildBaseEvent(type, label));
}

// ─── Page view tracking ───
// Dedup intra-sesión: no contar la misma URL dos veces si solo cambió el hash.
let lastTrackedPath: string | null = null;

export function trackPageView(label?: string): void {
  if (typeof window === 'undefined') return;
  const path = window.location.pathname + window.location.search;
  if (path === lastTrackedPath) return;
  lastTrackedPath = path;
  postEvent(buildBaseEvent('page_view', label));
}
