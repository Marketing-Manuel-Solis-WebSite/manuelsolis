/**
 * Meta Pixel — helpers client-side para la paridad Pixel ↔ Conversions
 * API con deduplicación por event_id.
 *
 * Flujo por page view (ver tracking.ts → trackPageView):
 *   1. Se genera UN event_id.
 *   2. El Pixel dispara fbq('track', 'PageView', {}, { eventID }) —
 *      encolado hasta que el stub de fbq exista (ver whenFbqReady).
 *   3. El MISMO event_id viaja en el beacon a /api/conversions, que
 *      reenvía el evento a la Conversions API de Meta server-side.
 *   4. Meta recibe ambos y descarta el duplicado por event_id.
 *
 * NOTA: el fbq('track','PageView') que vivía inline en el layout se
 * eliminó — TODOS los PageView del navegador salen de aquí para que
 * siempre lleven eventID (si no, Meta contaría doble).
 */
import { getAttributionState, type AttributionState } from './attribution';

interface WindowWithFbq extends Window {
  fbq?: (...args: unknown[]) => void;
}

export interface MetaBrowserParams {
  fbp?: string;
  fbc?: string;
}

/** Id único compartido entre el Pixel y el evento CAPI del server. */
export function generateMetaEventId(): string {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  } catch {
    // continúa al fallback
  }
  return `ev.${Date.now().toString(36)}.${Math.random().toString(36).slice(2, 12)}`;
}

// Duplicado mínimo del helper privado de attribution.ts — leerlo de ahí
// obligaría a exportar internals de cookies que attribution encapsula.
function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const prefix = `${name}=`;
  const parts = document.cookie ? document.cookie.split('; ') : [];
  for (const p of parts) {
    if (p.startsWith(prefix)) return p.slice(prefix.length);
  }
  return null;
}

/**
 * Formato oficial del parámetro fbc: `fb.<subdomainIndex>.<creationTimeMs>.<fbclid>`.
 * `creationTimeMs` debe ser el momento en que el fbclid se OBSERVÓ por
 * primera vez — nunca "ahora" para un click viejo (regeneraría el fbc en
 * cada page view y reabriría la ventana de atribución de 7 días).
 */
export function buildFbcFromFbclid(fbclid: string, creationTimeMs: number): string {
  return `fb.1.${creationTimeMs}.${fbclid}`;
}

/**
 * Resuelve el fbc cuando NO existe la cookie _fbc. Pura para unit tests.
 *
 *   - fbclid en la URL actual → creationTime = ahora (mismo comportamiento
 *     que el Pixel cuando escribe _fbc al ver un fbclid).
 *   - fbclid persistido en la cookie de atribución (msl_attr) → creationTime
 *     = timestamp del touch que lo capturó. Estable entre page views y no
 *     presenta un click viejo como reciente. (Si el fbclid se fusionó en un
 *     touch anterior, el ts puede ser más viejo que el click — conservador:
 *     nunca infla la frescura.)
 */
export function resolveFbc(
  urlFbclid: string | null,
  state: AttributionState,
  nowMs: number,
): string | undefined {
  if (urlFbclid) return buildFbcFromFbclid(urlFbclid, nowMs);
  const touch = state.last?.fbclid ? state.last : state.first?.fbclid ? state.first : undefined;
  if (!touch?.fbclid) return undefined;
  const ts = Date.parse(touch.ts);
  // Sin timestamp confiable no construimos fbc: usar "ahora" falsearía
  // la antigüedad del click.
  if (!Number.isFinite(ts)) return undefined;
  return buildFbcFromFbclid(touch.fbclid, ts);
}

/**
 * Match keys del navegador para el evento CAPI:
 *   - _fbp: browser id que escribe el Pixel (falta en la primera carga
 *     de un visitante nuevo y con adblockers — se envía lo que haya).
 *   - _fbc: click id. Si el Pixel no la escribió pero tenemos fbclid
 *     (URL actual o cookie msl_attr), la construimos — recupera el match
 *     exacto de la visita aunque el Pixel esté bloqueado.
 */
export function collectMetaBrowserParams(): MetaBrowserParams {
  if (typeof document === 'undefined') return {};
  const params: MetaBrowserParams = {};
  const fbp = readCookie('_fbp');
  if (fbp) params.fbp = fbp;
  const fbc = readCookie('_fbc');
  if (fbc) {
    params.fbc = fbc;
  } else {
    try {
      const urlFbclid = new URLSearchParams(window.location.search).get('fbclid');
      const resolved = resolveFbc(urlFbclid, getAttributionState(), Date.now());
      if (resolved) params.fbc = resolved;
    } catch {
      // sin fbclid disponible — el evento va con IP/UA/fbp
    }
  }
  return params;
}

// ─── Cola hacia fbq ───
//
// El stub de window.fbq lo crea el snippet INLINE del layout (id
// "meta-pixel", strategy lazyOnload → corre después del window.load).
// Los adblockers solo bloquean fbevents.js, NO el snippet inline: el
// stub siempre termina existiendo cuando hay pixel configurado, y
// encolar en el stub es seguro aunque fbevents.js jamás cargue.
//
// Señal principal: el evento 'msl:fbq-ready' que dispara el propio
// snippet al terminar (ver layout.tsx). El poll corto es solo un
// fallback por si el snippet corrió ANTES de que este módulo registrara
// el listener. Las callbacks nunca caducan: quedan en cola hasta que el
// stub aparezca o la página muera — exactamente la garantía que daba el
// viejo fbq('track','PageView') inline.
const FBQ_READY_EVENT = 'msl:fbq-ready';
const FBQ_RETRY_MS = 250;
const FBQ_MAX_TRIES = 40;

const pendingFbqCalls: Array<(fbq: (...args: unknown[]) => void) => void> = [];
let fbqListenerRegistered = false;
let fbqPollActive = false;

function flushFbqQueue(): boolean {
  const fbq = (window as WindowWithFbq).fbq;
  if (typeof fbq !== 'function') return false;
  while (pendingFbqCalls.length > 0) {
    const cb = pendingFbqCalls.shift();
    try {
      cb?.(fbq);
    } catch {
      // un Pixel roto jamás debe romper la página
    }
  }
  return true;
}

function whenFbqReady(cb: (fbq: (...args: unknown[]) => void) => void): void {
  if (typeof window === 'undefined') return;
  // Sin pixel configurado el layout no renderiza el snippet y el stub
  // no existirá jamás — no hay nada que encolar.
  if (!process.env.NEXT_PUBLIC_META_PIXEL_ID) return;

  pendingFbqCalls.push(cb);
  if (flushFbqQueue()) return;

  if (!fbqListenerRegistered) {
    fbqListenerRegistered = true;
    window.addEventListener(FBQ_READY_EVENT, () => flushFbqQueue());
  }

  if (!fbqPollActive) {
    fbqPollActive = true;
    let tries = FBQ_MAX_TRIES;
    const tick = () => {
      if (flushFbqQueue() || tries-- <= 0) {
        fbqPollActive = false;
        return;
      }
      setTimeout(tick, FBQ_RETRY_MS);
    };
    setTimeout(tick, FBQ_RETRY_MS);
  }
}

/** PageView del Pixel del navegador, con el eventID que habilita dedup. */
export function firePixelPageView(eventId: string): void {
  whenFbqReady((fbq) => fbq('track', 'PageView', {}, { eventID: eventId }));
}
