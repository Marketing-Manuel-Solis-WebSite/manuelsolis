import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
  const hostname = request.headers.get('host') || '';

  // Si el dominio es v2.manuelsolis.com o bos.manuelsolis.com
  if (hostname.includes('v2.manuelsolis') || hostname.includes('bos.manuelsolis') || hostname.includes('.vercel.app')) {
    const response = NextResponse.next();
    // Este header le dice a Google: "No guardes esta página en tus resultados"
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
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
      return NextResponse.redirect(newUrl, 301);
    }
  }

  // --- STRIP TRAILING SLASHES (except root /) ---
  if (pathname.length > 1 && pathname.endsWith('/')) {
    const newUrl = new URL(pathname.slice(0, -1), request.url);
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl, 301);
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
  if (isSEOCrawler) {
    const newUrl = new URL(`/es${pathname}`, request.url);
    newUrl.search = request.nextUrl.search;
    const response = NextResponse.redirect(newUrl, 301);
    response.headers.set('Content-Language', 'es');
    return response;
  }

  // Redireccionar a la versión con idioma
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);

  // CRÍTICO: Mantener query params (UTMs, search, etc)
  newUrl.search = request.nextUrl.search;

  const response = NextResponse.redirect(newUrl);
  response.headers.set('Content-Language', locale);

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