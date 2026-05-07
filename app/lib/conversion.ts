/**
 * Unified conversion-event fanout for manuelsolis.com v3.0.
 *
 * Today the site fires conversion events from 7+ components, each
 * duplicating logic that targets five tracking surfaces:
 *   1. Vercel Analytics  (track from @vercel/analytics)
 *   2. GTM / GA4         (window.dataLayer push)
 *   3. Meta Pixel        (window.fbq)
 *   4. TikTok Pixel      (window.ttq)
 *   5. Flight Check      (POST /api/conversions via lib/tracking)
 *
 * `fireConversion()` is the single entry point that fans out to all
 * five with a consistent payload, eliminating drift across call sites.
 *
 * STATUS — Phase 2 skeleton:
 *   - Function signature and dispatch are in place.
 *   - Existing call sites are NOT migrated yet; Phase 4 sweeps them.
 *   - Adding this module now creates the contract so new components
 *     can adopt it immediately and so the Phase 4 migration is a
 *     mechanical change with zero behavioural decisions.
 *
 * See DISCOVERY_v3.md §10.4 (capa de abstracción `fireConversion()`).
 */
import { track } from '@vercel/analytics/react';
import { pushToDataLayer, trackConversion, type ConversionType } from './tracking';

export type FireConversionType =
  | ConversionType
  | 'popup_open'
  | 'popup_dismiss'
  | 'popup_cta_click';

export interface FireConversionMeta {
  /** Optional structured params that ride along to dataLayer + Vercel. */
  [key: string]: string | number | boolean | undefined;
}

interface PixelMapping {
  /** Meta Pixel standard or custom event name. */
  fbq?: { event: string; standard: boolean };
  /** TikTok Pixel event name. */
  ttq?: string;
}

/**
 * Map our internal conversion types to the third-party pixel events
 * each platform expects. Keep this table aligned with whatever the
 * marketing team has configured in the Meta and TikTok dashboards.
 */
const PIXEL_MAP: Record<string, PixelMapping> = {
  form_submit: {
    fbq: { event: 'Lead', standard: true },
    ttq: 'CompleteRegistration',
  },
  qualified_lead: {
    fbq: { event: 'Lead', standard: true },
    ttq: 'CompleteRegistration',
  },
  phone_click: {
    fbq: { event: 'Contact', standard: true },
    ttq: 'ClickButton',
  },
  whatsapp_click: {
    fbq: { event: 'Contact', standard: true },
    ttq: 'ClickButton',
  },
  consulta_click: {
    fbq: { event: 'InitiateCheckout', standard: true },
    ttq: 'InitiateCheckout',
  },
  // popup_* and page_view: no pixel mapping by default; they fire on
  // dataLayer + Flight Check only.
};

interface WindowWithPixels extends Window {
  fbq?: (...args: unknown[]) => void;
  ttq?: { track: (...args: unknown[]) => void };
}

function safeWindow(): WindowWithPixels | undefined {
  return typeof window === 'undefined' ? undefined : (window as WindowWithPixels);
}

/**
 * Fire a single conversion event across all configured tracking
 * surfaces. Errors in any individual surface are swallowed so a
 * broken pixel never blocks a real submit.
 */
export function fireConversion(
  type: FireConversionType,
  label: string,
  meta: FireConversionMeta = {},
): void {
  const w = safeWindow();
  const stringMeta: Record<string, string> = Object.fromEntries(
    Object.entries(meta)
      .filter(([, v]) => v !== undefined && v !== null)
      .map(([k, v]) => [k, String(v)]),
  );

  // 1. Vercel Analytics
  try {
    track(`${type}.${label}`, meta);
  } catch {
    // ignore
  }

  // 2. GTM / GA4 dataLayer
  try {
    pushToDataLayer(type, {
      event_label: label,
      ...stringMeta,
    });
  } catch {
    // ignore
  }

  // 3. Meta Pixel
  try {
    const fbqMapping = PIXEL_MAP[type]?.fbq;
    if (w?.fbq && fbqMapping) {
      w.fbq(fbqMapping.standard ? 'track' : 'trackCustom', fbqMapping.event, {
        content_name: label,
        ...stringMeta,
      });
    }
  } catch {
    // ignore
  }

  // 4. TikTok Pixel
  try {
    const ttqEvent = PIXEL_MAP[type]?.ttq;
    if (w?.ttq && ttqEvent) {
      w.ttq.track(ttqEvent, { content_name: label, ...stringMeta });
    }
  } catch {
    // ignore
  }

  // 5. Flight Check (server-side ledger). Only forward known types.
  try {
    if (isCanonicalConversionType(type)) {
      trackConversion(type, label);
    }
  } catch {
    // ignore
  }
}

function isCanonicalConversionType(type: FireConversionType): type is ConversionType {
  return (
    type === 'form_submit' ||
    type === 'phone_click' ||
    type === 'whatsapp_click' ||
    type === 'consulta_click' ||
    type === 'qualified_lead' ||
    type === 'page_view'
  );
}
