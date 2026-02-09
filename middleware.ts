import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['es', 'en'];
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

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Si ya tiene locale, dejar pasar
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return NextResponse.next();

  // Redireccionar a la versión con idioma
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  
  // CRÍTICO: Mantener query params (UTMs, search, etc)
  newUrl.search = request.nextUrl.search;

  const response = NextResponse.redirect(newUrl);
  
  // Guardar preferencia
  response.cookies.set('NEXT_LOCALE', locale, { maxAge: 31536000 }); 

  return response;
}

export const config = {
  matcher: [
    // Excluir API, internos de Next, internos de Vercel y archivos estáticos
    '/((?!api|_next/static|_next/image|_vercel|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|webmanifest)$).*)',
  ],
};