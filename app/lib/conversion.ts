/**
 * Unified conversion-event fanout for manuelsolis.com v3.0.
 *
 * The site fires conversion events from many components. Each used to
 * duplicate the logic that targets five tracking surfaces:
 *   1. Vercel Analytics (track from @vercel/analytics)
 *   2. GTM / GA4        (window.dataLayer push)
 *   3. Meta Pixel       (window.fbq)
 *   4. TikTok Pixel     (window.ttq)
 *   5. Flight Check     (POST /api/conversions via lib/tracking)
 *
 * `fireConversion()` is the single entry point that fans out to all
 * five with a consistent payload, eliminating drift across call sites.
 *
 * DESIGN NOTES:
 *   - SSR-safe: when `window` is undefined the function returns
 *     `{ fired: [], errors: [] }` and never throws.
 *   - `page_view` is intentionally excluded from this entry point
 *     (see FireableConversionType below): Meta and TikTok pixels
 *     auto-fire `PageView` from their script init in app/[lang]/layout.tsx,
 *     and PageViewTracker uses trackPageView() directly. Routing
 *     page views through fireConversion would double-count in
 *     Meta/TikTok dashboards.
 *   - Engagement events (BlogTracker scroll milestones, JoinIn click)
 *     stay on raw track() — they aren't conversions.
 *   - Each layer is wrapped in try/catch so a broken pixel never
 *     blocks a real submit.
 *
 * See DISCOVERY_v3.md §10.4.
 */
import { track } from '@vercel/analytics/react';
import { pushToDataLayer, trackConversion, type ConversionType } from './tracking';

/** Subset of ConversionType eligible for fireConversion(). page_view excluded. */
export type FireableConversionType = Exclude<ConversionType, 'page_view'>;

/**
 * Optional structured params attached to the event. Restrictive on
 * purpose — Meta and TikTok pixels reject nested objects, and our
 * dataLayer consumers expect primitives.
 */
export type ConversionMeta = Record<
  string,
  string | number | boolean | null | undefined
>;

/** Tracking surface identifiers used in the result. */
export type ConversionLayer = 'gtag' | 'meta' | 'tiktok' | 'vercel' | 'flight_check';

export interface ConversionResult {
  fired: ConversionLayer[];
  errors: Array<{ layer: ConversionLayer; error: unknown }>;
}

/**
 * Map an internal conversion type to the standard event Meta Pixel
 * expects. Keep aligned with whatever the marketing team has wired
 * up on the Meta side. popup_* events have no Meta mapping by
 * design — they're internal analytics signals.
 */
const META_EVENT_MAP: Partial<Record<FireableConversionType, string>> = {
  form_submit: 'Lead',
  qualified_lead: 'Lead',
  phone_click: 'Contact',
  whatsapp_click: 'Contact',
  consulta_click: 'Contact',
};

/**
 * Map an internal conversion type to the standard event TikTok Pixel
 * expects. popup_* events have no TikTok mapping.
 */
const TIKTOK_EVENT_MAP: Partial<Record<FireableConversionType, string>> = {
  form_submit: 'CompleteRegistration',
  qualified_lead: 'CompleteRegistration',
  phone_click: 'Contact',
  whatsapp_click: 'Contact',
  consulta_click: 'ClickButton',
};

interface WindowWithPixels extends Window {
  fbq?: (...args: unknown[]) => void;
  ttq?: { track: (...args: unknown[]) => void };
}

function safeWindow(): WindowWithPixels | undefined {
  return typeof window === 'undefined' ? undefined : (window as WindowWithPixels);
}

/**
 * Convert ConversionMeta values into a string-only record, dropping
 * null/undefined entries. dataLayer consumers and pixel platforms
 * accept primitives only; this helper makes that explicit.
 */
function stringifyMeta(meta: ConversionMeta): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(meta)) {
    if (v === undefined || v === null) continue;
    out[k] = String(v);
  }
  return out;
}

/**
 * Fire a single conversion event across all five tracking surfaces.
 * Returns an audit-friendly summary of which layers fired and which
 * errored so callers can inspect during debugging if desired.
 *
 * Most callers can ignore the return value:
 *   onClick={() => fireConversion('whatsapp_click', 'mobile_sticky_bar')}
 */
export function fireConversion(
  type: FireableConversionType,
  label: string,
  meta: ConversionMeta = {},
): ConversionResult {
  const w = safeWindow();
  const stringMeta = stringifyMeta(meta);

  const fired: ConversionLayer[] = [];
  const errors: ConversionResult['errors'] = [];

  // 1. dataLayer (GTM → GA4) — fires for every type, server- or client-side.
  try {
    pushToDataLayer(type, {
      event_label: label,
      ...stringMeta,
    });
    fired.push('gtag');
  } catch (e) {
    errors.push({ layer: 'gtag', error: e });
  }

  // 2. Vercel Analytics — fires for every type.
  try {
    track(`${type}.${label}`, meta);
    fired.push('vercel');
  } catch (e) {
    errors.push({ layer: 'vercel', error: e });
  }

  // 3. Meta Pixel — only when the type is mapped AND fbq is loaded.
  try {
    const metaEvent = META_EVENT_MAP[type];
    if (metaEvent && w?.fbq) {
      w.fbq('track', metaEvent, {
        content_name: label,
        ...stringMeta,
      });
      fired.push('meta');
    }
  } catch (e) {
    errors.push({ layer: 'meta', error: e });
  }

  // 4. TikTok Pixel — only when the type is mapped AND ttq is loaded.
  try {
    const tiktokEvent = TIKTOK_EVENT_MAP[type];
    if (tiktokEvent && w?.ttq) {
      w.ttq.track(tiktokEvent, {
        content_name: label,
        ...stringMeta,
      });
      fired.push('tiktok');
    }
  } catch (e) {
    errors.push({ layer: 'tiktok', error: e });
  }

  // 5. Flight Check — server-side ledger via /api/conversions.
  // The endpoint VALID_TYPES set was extended in this Phase to include
  // popup_* events, so all FireableConversionType values are accepted.
  try {
    trackConversion(type, label);
    fired.push('flight_check');
  } catch (e) {
    errors.push({ layer: 'flight_check', error: e });
  }

  return { fired, errors };
}
