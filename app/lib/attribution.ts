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
 * Lee UTMs del URL actual y los devuelve como TouchPoint, o `null` si
 * no hay UTMs (no queremos generar un touch `direct/none` que pise un
 * origen real previamente capturado).
 *
 * Excepción: si el referrer es externo y NO hay UTMs, generamos un
 * touch sintético `<host-del-referrer> / referral` para no perder la
 * fuente. Esto desambigua "alguien escribió la URL a mano" vs
 * "alguien clickeó desde otro sitio que olvidó UTMs".
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

  if (source && medium) {
    return {
      source: source.toLowerCase(),
      medium: medium.toLowerCase(),
      campaign: campaign?.toLowerCase(),
      content: content?.toLowerCase(),
      term,
      landing: window.location.pathname,
      referrer: document.referrer || undefined,
      ts: new Date().toISOString(),
    };
  }

  // Sin UTMs explícitos: intentar derivar de referrer externo.
  const ref = document.referrer;
  if (ref) {
    try {
      const refUrl = new URL(ref);
      const ownHost = window.location.hostname;
      if (refUrl.hostname && refUrl.hostname !== ownHost) {
        return {
          source: refUrl.hostname.toLowerCase(),
          medium: 'referral',
          landing: window.location.pathname,
          referrer: ref,
          ts: new Date().toISOString(),
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
    firstTouchSource: state.first?.source,
    firstTouchMedium: state.first?.medium,
    firstTouchCampaign: state.first?.campaign,
    firstTouchContent: state.first?.content,
  };
}

export const ATTRIBUTION_COOKIE_NAME = COOKIE_NAME;
