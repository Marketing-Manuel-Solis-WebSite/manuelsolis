/**
 * Atribución persistente — first_touch y last_touch en cookie de primera parte.
 *
 * Problema que resuelve:
 *   Hoy `getUTMParams()` lee SOLO `window.location.search`. Si el visitante
 *   llega con `?utm_source=newsletter` y navega a otra página interna, los
 *   `utm_*` se pierden y el siguiente `fireConversion` registra `direct/none`.
 *   Resultado: leads sin atribución, dashboards mintiendo.
 *
 * Diseño:
 *   - Cookie `msl_attr` (90 días, primera parte, SameSite=Lax).
 *   - `first_touch`: se escribe UNA sola vez (cuando no existe).
 *     Es el origen que se le acredita al lead cuando convierte.
 *   - `last_touch`: se sobrescribe cada vez que llega otro UTM no-direct.
 *     Es el último canal antes de la conversión.
 *   - Prioridad de lectura para conversiones:
 *       URL actual > last_touch > first_touch > 'direct' / 'none'
 *   - Solo se guardan `utm_*` válidos (string no vacío). Nunca pisamos
 *     un origen real con un `direct/none` accidental.
 *
 * No usamos `localStorage` porque queremos persistencia cross-tab y
 * potencialmente lectura server-side en el futuro (cuando saquemos el
 * ledger a Supabase).
 */

const COOKIE_NAME = 'msl_attr';
const MAX_AGE_DAYS = 90;
const MAX_AGE_SECONDS = MAX_AGE_DAYS * 24 * 60 * 60;

export interface TouchPoint {
  source: string;
  medium: string;
  campaign?: string;
  content?: string;
  term?: string;
  /** Google Ads click ID — persistido para enlazar conversión ↔ click aunque
   *  el usuario navegue internamente y pierda el `?gclid=` del URL. */
  gclid?: string;
  /** Meta (Facebook/Instagram) click ID — mismo motivo que `gclid`. */
  fbclid?: string;
  /** Path por el que llegó esta atribución. */
  landing?: string;
  /** Referrer del navegador en el momento del touch. */
  referrer?: string;
  /** ISO timestamp del touch. */
  ts: string;
}

export interface AttributionState {
  first?: TouchPoint;
  last?: TouchPoint;
}

// ─── Cookie helpers ───
function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const prefix = `${name}=`;
  const parts = document.cookie ? document.cookie.split('; ') : [];
  for (const p of parts) {
    if (p.startsWith(prefix)) return p.slice(prefix.length);
  }
  return null;
}

function writeCookie(name: string, value: string) {
  if (typeof document === 'undefined') return;
  const secure = typeof window !== 'undefined' && window.location.protocol === 'https:';
  // SameSite=Lax — necesario para que la cookie viaje en navegación
  // desde un email/social y se conserve la atribución entre dominios
  // de email (ej. Gmail) → manuelsolis.com.
  const attrs = [
    `${name}=${value}`,
    'Path=/',
    `Max-Age=${MAX_AGE_SECONDS}`,
    'SameSite=Lax',
    secure ? 'Secure' : '',
  ].filter(Boolean);
  document.cookie = attrs.join('; ');
}

// ─── Encode / decode ───
// Codificamos como base64(JSON) para sobrevivir caracteres raros en
// `utm_term` (acentos, espacios) sin pelearnos con encodeURIComponent
// y para tener un único string opaco que el server pueda parsear
// igual en el futuro.
function encode(state: AttributionState): string {
  try {
    const json = JSON.stringify(state);
    if (typeof btoa === 'function') return btoa(unescape(encodeURIComponent(json)));
    return encodeURIComponent(json);
  } catch {
    return '';
  }
}

function decode(raw: string | null): AttributionState {
  if (!raw) return {};
  try {
    const json =
      typeof atob === 'function'
        ? decodeURIComponent(escape(atob(raw)))
        : decodeURIComponent(raw);
    const parsed = JSON.parse(json) as AttributionState;
    if (parsed && typeof parsed === 'object') return parsed;
    return {};
  } catch {
    return {};
  }
}

// ─── URL → TouchPoint ───
function nonEmpty(v: string | null | undefined): string | undefined {
  if (!v) return undefined;
  const trimmed = v.trim();
  return trimmed.length > 0 ? trimmed.slice(0, 200) : undefined;
}

/**
 * Lee UTMs / click IDs del URL actual y los devuelve como TouchPoint, o
 * `null` si no hay nada atribuible (no queremos generar un touch
 * `direct/none` que pise un origen real previamente capturado).
 *
 * Prioridad de captura:
 *   1. `utm_source` presente → touch UTM. `utm_medium` es OPCIONAL: si
 *      falta, default `none` (un enlace con source+campaign pero sin
 *      medium es válido y ANTES se perdía por exigir ambos).
 *   2. Sin utm_source pero con `gclid` → click de Google Ads (auto-tagging,
 *      que no añade utm_*). Sintetizamos `google / cpc` para no perder la
 *      campaña pagada, y persistimos el gclid.
 *   3. Sin utm_source pero con `fbclid` → click desde Meta. Sintetizamos
 *      `facebook / social` (puede ser orgánico o pagado) y persistimos fbclid.
 *   4. Sin nada de lo anterior pero con referrer externo → touch sintético
 *      `<host-del-referrer> / referral`.
 *
 * En 1–3 SIEMPRE arrastramos gclid/fbclid si vienen, para que sobrevivan
 * la navegación interna (antes se leían solo del URL al enviar el form).
 */
export function readTouchFromUrl(): TouchPoint | null {
  if (typeof window === 'undefined') return null;
  let params: URLSearchParams;
  try {
    params = new URLSearchParams(window.location.search);
  } catch {
    return null;
  }

  const source = nonEmpty(params.get('utm_source'));
  const medium = nonEmpty(params.get('utm_medium'));
  const campaign = nonEmpty(params.get('utm_campaign'));
  const content = nonEmpty(params.get('utm_content'));
  const term = nonEmpty(params.get('utm_term'));
  const gclid = nonEmpty(params.get('gclid'));
  const fbclid = nonEmpty(params.get('fbclid'));

  const now = new Date().toISOString();
  const landing = window.location.pathname;
  const referrer = document.referrer || undefined;

  // 1. utm_source presente — medium opcional (default al centinela GA4).
  if (source) {
    return {
      source: source.toLowerCase(),
      medium: (medium || '(none)').toLowerCase(),
      campaign: campaign?.toLowerCase(),
      content: content?.toLowerCase(),
      term,
      gclid,
      fbclid,
      landing,
      referrer,
      ts: now,
    };
  }

  // 2. gclid sin UTMs → Google Ads (auto-tagging). gclid es exclusivo de paid search.
  if (gclid) {
    return { source: 'google', medium: 'cpc', gclid, fbclid, landing, referrer, ts: now };
  }

  // 3. fbclid sin UTMs → Meta. Conservador: 'social' (no asumimos paid).
  if (fbclid) {
    return { source: 'facebook', medium: 'social', fbclid, landing, referrer, ts: now };
  }

  // 4. Sin UTMs ni click IDs: derivar de referrer externo.
  const ref = document.referrer;
  if (ref) {
    try {
      const refUrl = new URL(ref);
      const ownHost = window.location.hostname;
      if (refUrl.hostname && refUrl.hostname !== ownHost) {
        return {
          source: refUrl.hostname.toLowerCase(),
          medium: 'referral',
          landing,
          referrer: ref,
          ts: now,
        };
      }
    } catch {
      // ignore
    }
  }

  return null;
}

// ─── Estado público ───

export function getAttributionState(): AttributionState {
  return decode(readCookie(COOKIE_NAME));
}

/**
 * Persiste un nuevo touch. `first` se escribe solo si no había.
 * `last` se sobrescribe siempre.
 */
export function recordTouch(touch: TouchPoint): AttributionState {
  const state = getAttributionState();
  const next: AttributionState = {
    first: state.first ?? touch,
    last: touch,
  };
  writeCookie(COOKIE_NAME, encode(next));
  return next;
}

/**
 * Captura: lee URL, si hay touch lo persiste, devuelve el estado actual.
 * Idempotente — se puede llamar varias veces en la misma página.
 */
export function captureAttribution(): AttributionState {
  const touch = readTouchFromUrl();
  if (touch) return recordTouch(touch);
  return getAttributionState();
}

/**
 * Devuelve los UTMs efectivos a usar AHORA, con la prioridad:
 *   URL actual > last_touch cookie > first_touch cookie > 'direct'/'none'.
 *
 * Esta es la función que `tracking.ts` debe consumir.
 */
export function getEffectiveUtms(): {
  source: string;
  medium: string;
  campaign?: string;
  content?: string;
  term?: string;
  gclid?: string;
  fbclid?: string;
  firstTouchSource?: string;
  firstTouchMedium?: string;
  firstTouchCampaign?: string;
  firstTouchContent?: string;
} {
  const fromUrl = readTouchFromUrl();
  const state = getAttributionState();
  const current = fromUrl ?? state.last;

  return {
    source: current?.source || 'direct',
    medium: current?.medium || 'none',
    campaign: current?.campaign,
    content: current?.content,
    term: current?.term,
    // Click IDs: el del touch actual gana; si falta, recuperamos el último
    // y luego el primer touch que lo haya tenido (un gclid persiste aunque
    // el último touch sea orgánico dentro de la misma sesión de conversión).
    gclid: current?.gclid ?? state.last?.gclid ?? state.first?.gclid,
    fbclid: current?.fbclid ?? state.last?.fbclid ?? state.first?.fbclid,
    firstTouchSource: state.first?.source,
    firstTouchMedium: state.first?.medium,
    firstTouchCampaign: state.first?.campaign,
    firstTouchContent: state.first?.content,
  };
}

// ─── Mapeo a los campos del lead (BOS) ───

export interface LeadUtmFields {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string | null;
  utm_term: string | null;
}

/**
 * Convierte el resultado de `getEffectiveUtms()` en los campos `utm_*` que
 * el formulario manda a `/api/lead-capture` → BOS, aplicando los centinelas
 * GA4 estándar (`(direct)`, `(none)`, `(not set)`).
 *
 * Extraído del componente `ContactFormClient` para poder validar la lógica
 * exacta en unit tests sin renderizar React (ver `__tests__/attribution.test.ts`).
 *
 * Regla de campaña: si hay un slug real se envía tal cual (trim); si no,
 * SIEMPRE `(not set)` — nunca el literal `directo` que ensuciaba la columna
 * campaña en BOS para el tráfico directo.
 */
export function effectiveUtmsToLeadFields(
  eff: ReturnType<typeof getEffectiveUtms>,
): LeadUtmFields {
  const hasRealSource = !!eff.source && eff.source !== 'direct';
  return {
    utm_source: hasRealSource ? eff.source : '(direct)',
    utm_medium: hasRealSource ? eff.medium || '(none)' : '(none)',
    utm_campaign:
      eff.campaign && eff.campaign.trim() ? eff.campaign.trim() : '(not set)',
    utm_content: eff.content || null,
    utm_term: eff.term || null,
  };
}

export const ATTRIBUTION_COOKIE_NAME = COOKIE_NAME;
