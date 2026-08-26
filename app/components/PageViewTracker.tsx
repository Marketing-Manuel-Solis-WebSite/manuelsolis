'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { Analytics, type BeforeSendEvent } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { trackPageView, whenAnalyticsReady } from '../lib/tracking';

// IDs de analítica desde el entorno para poder rotarlos o desactivarlos sin
// tocar código. Cada script se renderiza solo si su ID está definido.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
// Dataset nuevo de Meta (transición dual 2026-08-07): mientras esté
// definido, el Pixel hace doble init y cada evento del navegador llega a
// AMBOS datasets. El espejo server-side hace lo mismo (ver metaCapi.ts).
// Al terminar la transición se elimina la env var y el init extra muere solo.
const META_PIXEL_ID_2 = process.env.NEXT_PUBLIC_META_PIXEL_ID_2;
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

/**
 * CallRail swap.js — DNI (Dynamic Number Insertion) a nivel de sesión.
 *
 * Se configura con el `src` completo del snippet porque la URL lleva dentro
 * el id de compañía, la access key y la versión del bundle: partirla en tres
 * env vars no gana nada y sí invita a mezclar la key de una cuenta con el id
 * de otra. Si la var no está definida, el script no se monta y el sitio
 * enseña los números reales — el mismo contrato que GA/Meta/TikTok.
 *
 * `strategy="afterInteractive"` y NO `lazyOnload` como los píxeles, a
 * propósito: un píxel puede llegar tarde porque solo observa, pero swap.js
 * REESCRIBE el número que el visitante va a marcar. Con lazyOnload la
 * MobileStickyBar es tappable bastante antes de que el swap ocurra, y cada
 * llamada de esa ventana entra sin atribución.
 */
const CALLRAIL_SWAP_SRC = process.env.NEXT_PUBLIC_CALLRAIL_SWAP_SRC;

/**
 * La var es NEXT_PUBLIC_ y se interpola en el `src` de un <script>, así que
 * es una superficie de inyección si alguien la escribe mal en el panel de
 * Vercel. Exigir el origen de CallRail cierra eso por un peso: cualquier
 * otro host se descarta y el script simplemente no se monta.
 */
function callRailSrc(): string | null {
  if (!CALLRAIL_SWAP_SRC) return null;
  return CALLRAIL_SWAP_SRC.startsWith('https://cdn.callrail.com/')
    ? CALLRAIL_SWAP_SRC
    : null;
}

type TiktokPixel = { page?: () => void };

interface WindowWithTtq extends Window {
  ttq?: TiktokPixel;
}

/** Panel interno: /admin, /es/admin, /en/admin y cualquier subruta. */
function isAdminPath(pathname: string): boolean {
  return /\/admin(\/|$)/.test(pathname);
}

function isTrackablePath(pathname: string): boolean {
  if (pathname.startsWith('/api')) return false;
  if (isAdminPath(pathname)) return false;
  return !pathname.endsWith('.xml') && !pathname.endsWith('.txt');
}

function pathnameOf(url: string): string {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

const dropAdminPageViews = (event: BeforeSendEvent): BeforeSendEvent | null =>
  isAdminPath(pathnameOf(event.url)) ? null : event;

// @vercel/speed-insights no exporta el tipo de su evento; esta es la forma
// que espera su prop beforeSend.
type SpeedInsightsEvent = { type: 'vital'; url: string; route?: string };

const dropAdminVitals = (event: SpeedInsightsEvent): SpeedInsightsEvent | null =>
  isAdminPath(pathnameOf(event.url)) ? null : event;

/**
 * Dispara el page view en el primer render y en cada cambio de pathname o
 * querystring (porque las UTMs viven en el querystring y deben quedar
 * registradas en /api/conversions):
 *   - ledger propio + Meta (Pixel con eventID + espejo CAPI) vía trackPageView
 *   - TikTok: el snippet no llama a ttq.page(), así que TODOS sus page view
 *     (el primero incluido) salen de aquí; en las navegaciones del App Router
 *     el snippet nunca se re-ejecuta.
 *
 * Excluye explícitamente el panel /admin y rutas de API/sitemap.
 */
export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;

    // Flag documentado de gtag.js. Cubre el page_view que Enhanced
    // Measurement («cambios de historial») emite al navegar a /admin desde
    // una página pública, cuando el script ya quedó cargado.
    if (GA_ID) {
      (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] =
        isAdminPath(pathname);
    }

    if (!isTrackablePath(pathname)) return;

    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    if (lastTracked.current === url) return;
    lastTracked.current = url;

    trackPageView();
    // El snippet carga con lazyOnload: whenAnalyticsReady encola la llamada
    // hasta que exista el stub de ttq. Sin pixel configurado el stub no
    // existirá nunca y no hay nada que encolar.
    if (TIKTOK_PIXEL_ID) {
      whenAnalyticsReady<TiktokPixel>(
        () => (window as WindowWithTtq).ttq,
        (ttq) => ttq.page?.(),
      );
    }
  }, [pathname, searchParams]);

  return null;
}

/**
 * Superficies de analítica de terceros. Viven en un client component porque
 * la exclusión del panel interno /admin necesita el pathname: el layout es
 * un server component y leerlo ahí (headers()) volvería dinámico el
 * prerender de todo el sitio.
 *
 * El <noscript> del Pixel de Meta se queda en el layout (server component):
 * lo que se monta aquí solo llega al DOM tras la hidratación.
 */
export function TrackingSurfaces() {
  const pathname = usePathname();

  if (isAdminPath(pathname)) return null;

  return (
    <>
      {GA_ID && (
        <>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="lazyOnload"
          />
          <Script
            id="google-analytics"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `,
            }}
          />
        </>
      )}

      {/* Meta Pixel: aquí SOLO init. El PageView (navegador + espejo
          server-side vía Conversions API) lo dispara PageViewTracker →
          trackPageView() con un event_id compartido para que Meta
          deduplique (ver app/lib/metaPixel.ts). Volver a poner
          fbq('track','PageView') aquí duplicaría el conteo. El evento
          'msl:fbq-ready' avisa a metaPixel.ts que el stub ya existe y
          puede vaciar su cola de llamadas pendientes. */}
      {META_PIXEL_ID && (
        <Script
          id="meta-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              ${META_PIXEL_ID_2 ? `fbq('init', '${META_PIXEL_ID_2}');` : ''}
              window.dispatchEvent(new Event('msl:fbq-ready'));
            `,
          }}
        />
      )}

      {/* TikTok: init sin ttq.page(). El page view lo emite
          PageViewTracker en cada cambio de ruta (el snippet solo corre una
          vez por carga completa). */}
      {TIKTOK_PIXEL_ID && (
        <Script
          id="tiktok-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

                ttq.load('${TIKTOK_PIXEL_ID}');
              }(window, document, 'ttq');
            `,
          }}
        />
      )}

      {/* CallRail: DNI de sesión (number pool). No lleva page view propio —
          swap.js abre su sesión al cargar leyendo document.URL y
          document.referrer, así que las UTMs de la landing son las que
          atribuyen la llamada. Los redirects del sitio preservan el query
          string (ver proxy.ts), así que ese URL llega completo.

          El pool descubre solo qué números hay en la página: swap.js recorre
          el DOM, normaliza cada teléfono a sus últimos 10 dígitos y manda la
          lista al servidor, que responde con la asignación. Dos consecuencias
          que conviene tener presentes al tocar teléfonos en este repo:
            - Saltarse <script> es comportamiento del propio walker, así que el
              `telephone` del JSON-LD de LocalBusiness NUNCA se swapea. El NAP
              que ve Google no se mueve.
            - `data-calltrk-noswap` en un elemento excluye todo su subárbol,
              tanto del reemplazo como del descubrimiento. Es la palanca para
              blindar un número que no debe rotar (ver páginas legales). */}
      {callRailSrc() && (
        <Script
          id="callrail-swap"
          src={callRailSrc() as string}
          strategy="afterInteractive"
        />
      )}

      {/* beforeSend cubre lo que el desmontaje no puede: los eventos que
          se disparen desde /admin cuando el script ya venía cargado por
          una página pública anterior. */}
      <Analytics beforeSend={dropAdminPageViews} />
      <SpeedInsights beforeSend={dropAdminVitals} />
    </>
  );
}
