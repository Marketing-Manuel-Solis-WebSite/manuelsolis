// ============================================================
// OWASP / Secure Response Headers — single source of truth
// ============================================================
// Zoom (and the OWASP Secure Headers Project) require that the
// HTML response for the site's home URL carry a set of security
// headers. Zoom validates the `text/html` 200 response of the
// home URL and BLOCKS rendering if any of these are missing:
//   - Strict-Transport-Security
//   - X-Content-Type-Options
//   - Content-Security-Policy
//   - Referrer-Policy
// Ref: https://developers.zoom.us/docs/zoom-apps/security/owasp/
//
// Why this lives here instead of only in next.config.ts:
//   next.config `headers()` decorates responses that Next.js
//   RENDERS (the 200s). It does NOT decorate responses returned
//   directly by the proxy/middleware — i.e. the locale redirect
//   `/  ->  /es` (307) and the normalization redirects (301).
//   If a verifier (Zoom, a scanner, a curl) hits the bare domain,
//   it sees that header-less redirect first. To guarantee EVERY
//   response across the whole site is decorated, `proxy.ts`
//   imports this list and applies it to its redirect responses,
//   and `next.config.ts` imports it for the rendered 200s/static.
//   One list, two consumers — no drift.
//
// SEO note: these are response headers only. They do not change
// status codes, redirect targets, canonical tags, or markup, so
// they have zero impact on crawling/indexing.
// ============================================================

export type SecurityHeader = { key: string; value: string };

// NOTE: keep CSP allow-list in sync with the third-party origins the
// site actually loads (GA/GTM, Meta Pixel, TikTok, Vercel, YouTube,
// Google Fonts). Adding a new external script/iframe/fetch origin
// requires adding it to the matching directive below, otherwise the
// browser (and Zoom's embedded browser) will block it.
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  // CallRail va con comodín de subdominio a propósito: el snippet que se
  // instala apunta a cdn.callrail.com, pero swap.js encadena DOS orígenes más
  // que no aparecen en el snippet y que sin CSP fallan en silencio —
  // js.callrail.com (swap_session.js, icap.js, poll.js) y app.callrail.com
  // (form_capture.js). Verificado leyendo el bundle: los tres hosts salen del
  // objeto `endpoints` que CallRail inlinea en swap.js.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://analytics.tiktok.com https://va.vercel-scripts.com https://*.callrail.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' https://fonts.gstatic.com",
  // connect-src cubre los beacons/XHR de medición, no solo los scripts:
  //   - GA4 (gtag) manda los hits a www.google-analytics.com y, según la
  //     región del visitante, a regionN.google-analytics.com — de ahí el
  //     comodín de subdominio: los shards regionales no son enumerables.
  //   - stats.g.doubleclick.net lo usa GA4 cuando Google Signals está activo.
  //   - fbevents.js manda los eventos (incluido el PageView con eventID) a
  //     www.facebook.com/tr, no a connect.facebook.net.
  //   - TikTok no se queda en analytics.tiktok.com: su pixel también llama a
  //     analytics-ipv6.tiktokw.us para resolver la IP del visitante. Sin ese
  //     dominio, Lighthouse registraba el bloqueo en consola en producción y esa
  //     parte de la medición no llegaba.
  //   - CallRail NO se queda en script-src: la asignación del número de pool
  //     (DNI a nivel de sesión) se negocia por XHR contra js.callrail.com —
  //     swap.js manda la lista de teléfonos que encontró en el DOM y el
  //     servidor responde qué número asignar. Sin connect-src el script carga
  //     pero el pool nunca asigna, que es el modo de fallo más caro: parece
  //     instalado y no atribuye nada.
  //   - El asistente del sitio NO aparece aquí a propósito: /api/chat habla con
  //     el proveedor de IA desde el servidor, así que esa llamada nunca pasa por
  //     la CSP del navegador. Estaba abierto `generativelanguage.googleapis.com`
  //     sin que ningún script del cliente lo usara; se quitó al migrar el chat.
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://www.googletagmanager.com https://stats.g.doubleclick.net https://connect.facebook.net https://www.facebook.com https://analytics.tiktok.com https://*.tiktokw.us https://va.vercel-scripts.com https://vitals.vercel-insights.com https://*.callrail.com",
  "frame-src 'self' https://www.google.com https://www.youtube.com https://www.facebook.com",
  "media-src 'self' https:",
  "worker-src 'self' blob:",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  'upgrade-insecure-requests',
].join('; ');

export const SECURITY_HEADERS: SecurityHeader[] = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // '0' (no '1; mode=block'): el auditor XSS heredado está retirado de los
  // navegadores y con mode=block introduce sus propios vectores; OWASP pide
  // desactivarlo explícitamente y confiar en la CSP.
  { key: 'X-XSS-Protection', value: '0' },
  { key: 'Content-Security-Policy', value: CONTENT_SECURITY_POLICY },
];

// Apply every secure header to a Headers instance (used by proxy.ts on
// redirect responses, which next.config `headers()` does not cover).
export function applySecurityHeaders(headers: Headers): void {
  for (const { key, value } of SECURITY_HEADERS) {
    headers.set(key, value);
  }
}
