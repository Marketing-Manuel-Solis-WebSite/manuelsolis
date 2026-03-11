/**
 * FASE 4 — Flight Check: Sistema de tracking propio (lado servidor)
 * Registra cada conversión en /api/conversions para comparar con GA4 (Double Check).
 *
 * Uso en componentes:
 *   import { trackConversion, getUTMParams, pushToDataLayer } from '@/app/lib/tracking';
 */

// ─── Tipos ───
export type ConversionType = 'form_submit' | 'phone_click' | 'whatsapp_click' | 'qualified_lead';

export interface ConversionEvent {
  type: ConversionType;
  source: string;
  medium: string;
  campaign?: string;
  label?: string;
  domain: string;
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

// ─── FASE 4: Flight Check — Envío al endpoint propio ───
export async function trackConversion(
  type: ConversionType,
  label?: string
): Promise<void> {
  if (typeof window === 'undefined') return;

  const utms = getUTMParams();

  const event: ConversionEvent = {
    type,
    source: utms.utm_source,
    medium: utms.utm_medium,
    campaign: utms.utm_campaign,
    label,
    domain: window.location.hostname,
    timestamp: new Date().toISOString(),
  };

  // Fire-and-forget: no bloquea la UI
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        '/api/conversions',
        new Blob([JSON.stringify(event)], { type: 'application/json' })
      );
    } else {
      fetch('/api/conversions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Silencioso — no interrumpe la experiencia del usuario
  }
}
