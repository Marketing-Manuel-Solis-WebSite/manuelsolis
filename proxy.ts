import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { applySecurityHeaders } from './app/lib/securityHeaders';

const locales = ['en', 'es'];
const defaultLocale = 'es';

function getLocale(request: NextRequest): string {
  // 1. Verificar cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Verificar header del navegador
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const browserLocales = acceptLanguage.split(',');
    for (const localeStr of browserLocales) {
      const cleanLocale = localeStr.split(';')[0].split('-')[0].toLowerCase();
      if (locales.includes(cleanLocale)) {
        return cleanLocale;
      }
    }
  }

  // 3. Default
  return defaultLocale;
}

// Regex para detectar crawlers SEO legítimos
const SEO_CRAWLER_REGEX = /Googlebot|bingbot|Sitebulb|Screaming Frog|AhrefsBot|SemrushBot|DotBot|rogerbot|YandexBot|Baiduspider/i;

export function proxy(request: NextRequest) {
  // --- NUEVA PROTECCIÓN: Bloquear indexación en entornos de prueba ---
  const hostname = (request.headers.get('host') || '').toLowerCase();

  // Hosts que NUNCA deben aparecer en SERPs:
  //   - bos.manuelsolis.com (internal operations / Laravel — defense-in-depth;
  //     en práctica esos requests no llegan a este Next.js app, pero la regla
  //     queda por si bos alguna vez se sirve detrás del mismo dominio).
  //   - mme.manuelsolis.com (placeholder para futuras internas).
  //   - v2.manuelsolis.com (staging).
  //   - *.vercel.app (preview deployments).
  //
  // X-Robots-Tag se envía con directivas exhaustivas para que Google no:
  //   noindex      — no indexe esta página
  //   nofollow     — no siga enlaces salientes desde esta página
  //   noarchive    — no guarde una copia en caché
  //   nosnippet    — no muestre un snippet en SERPs
  //   noimageindex — no indexe imágenes embebidas
  if (
    hostname.startsWith('bos.') ||
    hostname.startsWith('mme.') ||
    hostname.startsWith('v2.') ||
    hostname.endsWith('.vercel.app')
  ) {
    const response = NextResponse.next();
    response.headers.set(
      'X-Robots-Tag',
      'noindex, nofollow, noarchive, nosnippet, noimageindex',
    );
    return response;
  }
  // -------------------------------------------------------------------

  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get('user-agent') || '';
  const isSEOCrawler = SEO_CRAWLER_REGEX.test(userAgent);

  // --- NORMALIZE UPPERCASE URLs → lowercase (301) ---
  // Catches /es/Testimonios, /en/Servicios, etc. and normalizes them
  if (/[A-Z]/.test(pathname)) {
    const lowercasePath = pathname.toLowerCase();
    if (lowercasePath !== pathname) {
      const newUrl = new URL(lowercasePath, request.url);
      newUrl.search = request.nextUrl.search;
      const response = NextResponse.redirect(newUrl, 301);
      applySecurityHeaders(response.headers);
      return response;
    }
  }

  // --- STRIP TRAILING SLASHES (except root /) ---
  if (pathname.length > 1 && pathname.endsWith('/')) {
    const newUrl = new URL(pathname.slice(0, -1), request.url);
    newUrl.search = request.nextUrl.search;
    const response = NextResponse.redirect(newUrl, 301);
    applySecurityHeaders(response.headers);
    return response;
  }

  // Si ya tiene locale, dejar pasar (fast path para crawlers)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    const localePart = pathname.split('/')[1];
    const locale = (localePart === 'es' || localePart === 'en') ? localePart : 'es';

    // Forward locale as request header so RootLayout can set <html lang> dynamically
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', locale);

    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    // Agregar Content-Language header para señalar idioma a Google
    response.headers.set('Content-Language', locale);
    return response;
  }

  // Para crawlers sin locale en URL, redirigir directamente sin cookie logic
  // Nota: con pathname '/' se emite '/es' (sin slash final) para evitar el
  // salto extra /es/ → /es que añade el normalizador de trailing slash.
  if (isSEOCrawler) {
    const newUrl = new URL(pathname === '/' ? '/es' : `/es${pathname}`, request.url);
    newUrl.search = request.nextUrl.search;
    const response = NextResponse.redirect(newUrl, 301);
    response.headers.set('Content-Language', 'es');
    applySecurityHeaders(response.headers);
    return response;
  }

  // Redireccionar a la versión con idioma
  const locale = getLocale(request);
  const newUrl = new URL(pathname === '/' ? `/${locale}` : `/${locale}${pathname}`, request.url);

  // CRÍTICO: Mantener query params (UTMs, search, etc)
  newUrl.search = request.nextUrl.search;

  const response = NextResponse.redirect(newUrl);
  response.headers.set('Content-Language', locale);
  // OWASP/Zoom secure headers on the bare-domain home redirect (/ -> /es).
  // next.config headers() do not decorate middleware redirects, so a verifier
  // hitting the root would otherwise see a header-less 307.
  applySecurityHeaders(response.headers);

  // Guardar preferencia
  response.cookies.set('NEXT_LOCALE', locale, { maxAge: 31536000 });

  return response;
}

export const config = {
  matcher: [
    // Excluir API, RSS, internos de Next, internos de Vercel y archivos estáticos
    '/((?!api|rss|_next/static|_next/image|_vercel|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|webmanifest)$).*)',
  ],
};