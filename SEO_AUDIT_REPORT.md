# SEO Audit Report — manuelsolis.com

**Repo:** `manuelsolis` · **Branch auditada:** `mejoras/fase-2-visual` · **Fecha:** 2026-05-27
**Alcance:** auditoría técnica estática del código fuente (sin modificaciones, sin levantar dev server).

---

## Sección 1 — Stack y configuración base

### 1.1 Versiones

| Componente | Versión |
|---|---|
| **Next.js** | `^16.0.7` |
| **React / React DOM** | `^19.2.1` |
| **TypeScript** | `^5` |
| **Tailwind CSS** | `^4` (`@tailwindcss/postcss` `^4`) |
| **ESLint** | `^9` (`eslint-config-next` `16.0.3`) |
| **Vitest** | `^4.1.5` |
| **Node engine** | no declarado en `package.json` (no `engines`) |

### 1.2 Router

**App Router (`app/`) exclusivamente.** No existe `pages/`. Layout raíz en `app/layout.tsx` (`<html lang="es">` estático), layout localizado en `app/[lang]/layout.tsx` con `generateStaticParams() → [{lang:'en'}, {lang:'es'}]`. No hay híbrido pages+app.

### 1.3 Dependencias SEO / i18n / sitemap

No hay paquetes dedicados a SEO o i18n — todo se construye nativamente con las APIs de Next.js 16.

| Categoría | Paquete instalado | Notas |
|---|---|---|
| i18n | **ninguno** (no `next-intl`, `next-i18next`, `next-translate`) | Implementación custom: `[lang]` segment + diccionarios en `app/lib/translations.ts` + proxy.ts para detección/redirect. |
| Sitemap | **ninguno** (no `next-sitemap`) | Implementación custom: 7 route handlers `app/sitemap-*.xml/route.ts` + sitemap index en `app/sitemap.xml/route.ts`, alimentados por `app/lib/sitemapData.ts`. **Sin Next.js native `MetadataRoute.Sitemap`.** |
| robots | nativo `app/robots.ts` (Next.js `MetadataRoute.Robots`) | OK |
| next-seo | **no instalado** | Metadata nativa con `export const metadata` / `generateMetadata`. |
| schema-dts | **no instalado** | Schemas escritos a mano como `Record<string, unknown>`. |
| Bot/abuse | `botid` `^1.5.10` (Vercel BotID) | Wrapping vía `withBotId(nextConfig)`. |
| Analytics | `@vercel/analytics` `^1.6.1`, `@vercel/speed-insights` `^1.3.1` | Renderizados en `app/[lang]/layout.tsx`. |
| Storage | `@vercel/blob` `^2.0.0` | Imágenes de abogados en `uenjwzjx3vckezns.public.blob.vercel-storage.com`. |
| Email | `resend` `^6.10.0`, `react-email` `^5.2.10`, `@react-email/components` `^1.0.12` | Newsletter blasts. |
| LLM | `@google/generative-ai` `^0.24.1` | Endpoint `/api/chat`. |
| UI / animation | `framer-motion` `^12.35.0`, `lucide-react` `^0.554.0` | |
| Bundle analyzer | `@next/bundle-analyzer` `^16.2.4` | Activado vía `ANALYZE=true`. |

### 1.4 `next.config.ts` (íntegro)

```ts
import type { NextConfig } from 'next';
import { withBotId } from 'botid/next/config';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { seoRedirects } from './app/lib/seoRedirects';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    cpus: 4,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    qualities: [50, 75, 82],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      { protocol: 'https', hostname: 'comopuedoarreglar.com' },
      { protocol: 'https', hostname: 'manuelsolis.com' },
      { protocol: 'https', hostname: 'uenjwzjx3vckezns.public.blob.vercel-storage.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
  },
  async redirects() {
    return seoRedirects;
  },
  async headers() {
    return [
      // _next/static, _next/image, /:path*.(png|jpg|...|woff|woff2|...) — todos con Cache-Control: public, max-age=31536000, immutable
      // /:path* — STS preload, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff,
      //          Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy camera=()...,
      //          X-XSS-Protection 1; mode=block, Content-Security-Policy (ver abajo).
    ];
  },
};

export default bundleAnalyzer(withBotId(nextConfig));
```

**CSP (relevante para SEO/3rd party):**
```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval' googletagmanager.com google-analytics.com connect.facebook.net analytics.tiktok.com va.vercel-scripts.com;
img-src 'self' data: blob: https:;
font-src 'self' fonts.gstatic.com;
connect-src 'self' google-analytics.com analytics.google.com connect.facebook.net analytics.tiktok.com va.vercel-scripts.com vitals.vercel-insights.com generativelanguage.googleapis.com;
frame-src 'self' google.com youtube.com facebook.com;
upgrade-insecure-requests
```

### 1.5 `package.json` (extracto íntegro)

```json
{
  "name": "manuelsolis",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest run",
    "test:watch": "vitest",
    "new-blog": "node scripts/new-blog.mjs"
  },
  "dependencies": {
    "@google/generative-ai": "^0.24.1",
    "@react-email/components": "^1.0.12",
    "@tailwindcss/forms": "^0.5.10",
    "@tailwindcss/typography": "^0.5.19",
    "@vercel/analytics": "^1.6.1",
    "@vercel/blob": "^2.0.0",
    "@vercel/speed-insights": "^1.3.1",
    "botid": "^1.5.10",
    "framer-motion": "^12.35.0",
    "lucide-react": "^0.554.0",
    "next": "^16.0.7",
    "react": "^19.2.1",
    "react-dom": "^19.2.1",
    "react-email": "^5.2.10",
    "resend": "^6.10.0",
    "server-only": "^0.0.1"
  },
  "devDependencies": {
    "@next/bundle-analyzer": "^16.2.4",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^6.0.1",
    "baseline-browser-mapping": "^2.9.19",
    "eslint": "^9",
    "eslint-config-next": "16.0.3",
    "tailwindcss": "^4",
    "typescript": "^5",
    "vite-tsconfig-paths": "^6.1.1",
    "vitest": "^4.1.5"
  }
}
```

### 1.6 Modo de output

**SSR / ISR clásico.** No hay `output: 'export'` ni `output: 'standalone'` en `next.config.ts`. El home (`app/[lang]/page.tsx`) usa `export const revalidate = 3600` (ISR cada hora) y el layout `app/[lang]/layout.tsx` usa `revalidate = 86400` (24h para refrescar `aggregateRating` desde Google Places). Las rutas estáticas se prerendean en build con `generateStaticParams`.

### 1.7 Plataforma de deployment

**Vercel** (alta confianza, basado en señales múltiples):

- `@vercel/analytics`, `@vercel/speed-insights`, `@vercel/blob` instalados y montados en `app/[lang]/layout.tsx`.
- `botid` (Vercel BotID) en `next.config.ts` y `instrumentation-client.ts`.
- `proxy.ts` referencia explícitamente `.vercel.app` para inyectar `X-Robots-Tag: noindex`.
- No hay `.vercel/`, `netlify.toml`, `Dockerfile`, `wrangler.toml`, ni `vercel.json`/`vercel.ts` en raíz — el linking de Vercel está pero el dir `.vercel/` no fue commiteado (o se ignora por `.gitignore`).
- `.github/` contiene únicamente `CODEOWNERS` (no hay CI custom).

> ⚠️ **Nota Vercel:** El proyecto usa el legacy `vercel.json` mental model (no existe ningún `vercel.json` ni `vercel.ts`). Con Next.js 16, `vercel.ts` es la opción recomendada por Vercel pero **no es obligatoria** — el proyecto deja todo en `next.config.ts` + redirects en `app/lib/seoRedirects.ts`, lo cual también está soportado.

---

## Sección 2 — Internacionalización (i18n)

### 2.1 Configuración

**No usa el i18n config nativo de `next.config`** (no hay key `i18n`). Toda la i18n se construye sobre un dynamic segment `[lang]` + un proxy edge.

`proxy.ts` (Next.js 16 ya no se llama `middleware.ts` — este repo lo nombró `proxy.ts` de acuerdo a la migración Routing Middleware → Proxy):

```ts
const locales = ['en', 'es'];
const defaultLocale = 'es';
```

### 2.2 Locales

- `es` (default)
- `en`

### 2.3 Default locale

`es`.

### 2.4 Estrategia de URLs

**Prefix-always** (todos los locales tienen prefijo en la URL: `/es/...`, `/en/...`).

`/` redirecciona (en `app/page.tsx` con `redirect('/es')`) y el proxy (`proxy.ts`) hace lo siguiente:

1. Si `host` incluye `v2.manuelsolis`, `bos.manuelsolis` o `.vercel.app` → set `X-Robots-Tag: noindex, nofollow` (protección contra indexing en environments de prueba).
2. Si la URL tiene mayúsculas → 301 a lowercase.
3. Si termina en `/` (y no es raíz) → 301 sin trailing slash.
4. Si ya tiene `/es/` o `/en/` → pass through + setea header `Content-Language`.
5. Si es un SEO crawler conocido (Googlebot, bingbot, Sitebulb, Screaming Frog, AhrefsBot, SemrushBot, DotBot, rogerbot, YandexBot, Baiduspider) y no tiene locale → 301 a `/es{path}`.
6. Resto: detecta locale por cookie `NEXT_LOCALE` o `Accept-Language` y redirige.

### 2.5 Slugs de rutas — CRÍTICO

🔴 **Hallazgo crítico:** **Los slugs SON IDÉNTICOS en ambos idiomas y están escritos en español aún en URLs `/en/`.** El proyecto NO traduce los segmentos de URL — solo cambia el contenido renderizado.

Esto se observa en `app/[lang]/{servicios,oficinas,blog,...}/[...]`. Hay un único árbol físico de rutas — `lang` es solo un toggle de copy.

| # | URL Español | URL Inglés | Slug duplicado mal traducido |
|---|---|---|---|
| 1 | `/es/servicios/inmigracion` | `/en/servicios/inmigracion` | `servicios/inmigracion` queda en español en EN |
| 2 | `/es/oficinas/houston-principal` | `/en/oficinas/houston-principal` | `oficinas` queda en español |
| 3 | `/es/abogados/manuel-solis` | `/en/abogados/manuel-solis` | `abogados` queda en español |
| 4 | `/es/abogado-inmigracion-houston` | `/en/abogado-inmigracion-houston` | Slug entero en español bajo `/en` |
| 5 | `/es/asilo-politico-chicago` | `/en/asilo-politico-chicago` | Mismo problema |
| 6 | `/es/defensa-deportacion-dallas` | `/en/defensa-deportacion-dallas` | Mismo problema |
| 7 | `/es/visa-u-houston` | `/en/visa-u-houston` | Idéntico (en este caso `visa-u` funciona en ambos) |
| 8 | `/es/blog/daca-2026-estado-legal-tribunales` | `/en/blog/daca-2026-estado-legal-tribunales` | Slug del blog en español en EN |
| 9 | `/es/testimonios` | `/en/testimonios` | "testimonios" → debería ser "testimonials" en EN |
| 10 | `/es/nosotros` | `/en/nosotros` | "nosotros" → debería ser "about" en EN |
| 11 | `/es/privacidad` | `/en/privacidad` | "privacidad" → debería ser "privacy" |
| 12 | `/es/terminos` | `/en/terminos` | "terminos" → debería ser "terms" |
| 13 | `/es/clientes-detenidos` | `/en/clientes-detenidos` | "clientes-detenidos" → "detained-clients" |

**Hay redirects 301 en `app/lib/seoRedirects.ts`** que mapean variantes inglesas legacy (e.g., `/:lang/services/:slug → /:lang/servicios`, `/:lang/attorneys/:slug → /:lang/abogados/:slug`, `/:lang/privacy → /:lang/privacidad`, etc.) — pero esto es una solución de "cubrir las legacy 404s de WordPress", no una verdadera localización de slugs.

**Impacto SEO:**
- Para usuarios y crawlers ingleses, URLs como `/en/servicios/inmigracion` se ven como spanglish y no contienen el keyword EN (`immigration` vs `inmigracion`).
- Google considera el slug como señal de relevancia en algunos contextos (especialmente para long-tail "immigration lawyer Houston" donde se esperaría `/en/immigration-lawyer-houston`).
- Las landing pages city×service (`abogado-inmigracion-houston`) son las MÁS importantes para SEO local y **no tienen variante EN** — el sitio sirve la versión inglesa del contenido pero la URL es `/en/abogado-inmigracion-houston` (palabras españolas).

### 2.6 Implementación de `hreflang`

**Sí.** Se hace por página vía `alternates.languages` en `generateMetadata` (App Router). Ejemplos verificados:

- `app/[lang]/page.tsx:39-46` (home)
- `app/[lang]/servicios/inmigracion/page.tsx:25-32` (servicios)
- `app/[lang]/oficinas/houston-principal/page.tsx:41-48` (oficinas)
- `app/[lang]/abogados/[slug]/page.tsx:41-48` (abogados)
- `app/[lang]/abogado-inmigracion-houston/page.tsx:26-33` (landings)
- `app/[lang]/blog/page.tsx:660-668` (blog hub)

Patrón consistente:

```ts
alternates: {
  canonical: `${SITE_URL}/${lang}/<path>`,
  languages: {
    es: `${SITE_URL}/es/<path>`,
    en: `${SITE_URL}/en/<path>`,
    'x-default': `${SITE_URL}/es/<path>`,
  },
}
```

✅ `x-default` apunta a `es` consistentemente (correcto dado que `defaultLocale = 'es'`).

⚠️ Hay un comentario en `app/[lang]/layout.tsx:290-291` que dice "alternates (canonical + hreflang) are set per-page, not in layout, to avoid child pages inheriting the wrong canonical URL." Esto significa que **si una página olvida implementar `alternates`, no hay fallback de hreflang en el layout**. Algunas páginas pueden tener gaps.

### 2.7 Sitemap por idioma

**Un único sitemap index con 7 shards.** No están separados por idioma; cada shard incluye URLs `/es/` y `/en/` lado a lado (ver `app/lib/sitemapData.ts:72-81` — `expandLangs()` itera `['en', 'es']`). **No emite tags `<xhtml:link rel="alternate" hreflang="...">` dentro del sitemap**, sólo URLs individuales con `<lastmod>`, `<changefreq>`, `<priority>`.

> 🟡 Gap: los sitemaps XML modernos pueden declarar alternates con `<xhtml:link>` para reforzar la señal de hreflang. Aquí sólo se confía en la meta-tag por página.

---

## Sección 3 — Estructura de rutas

### 3.1 Árbol completo (App Router)

```
app/
├── layout.tsx                      # Root (html lang="es", robots noindex fallback)
├── page.tsx                        # redirect('/es')
├── not-found.tsx                   # 404 custom (bilingüe)
├── globals.css
├── robots.ts                       # MetadataRoute.Robots
├── sitemap.xml/route.ts            # Sitemap index
├── sitemap-pages.xml/route.ts
├── sitemap-servicios.xml/route.ts
├── sitemap-oficinas.xml/route.ts
├── sitemap-abogados.xml/route.ts
├── sitemap-landings.xml/route.ts
├── sitemap-blog.xml/route.ts
├── sitemap-newsletter.xml/route.ts
├── rss/newsletter/route.ts         # RSS feed (solo ES)
├── api/
│   ├── analytics/route.ts
│   ├── chat/route.ts               # Gemini
│   ├── conversions/route.ts
│   ├── lead-capture/route.ts
│   ├── signup-proxy/route.ts
│   └── newsletter/
│       ├── blast/route.ts
│       ├── preview/route.ts
│       ├── subscribe/route.ts
│       └── unsubscribe/route.ts
├── components/                     # ~50 componentes React (no rutas)
├── context/                        # LanguageContext
├── lib/                            # data + helpers (officeSchema, blogSchema, breadcrumbSchema, sitemapData, seoRedirects, attorneyData, cityServiceData, googleReviews, officesRegistry, translations, newsletterData, ...)
└── [lang]/
    ├── layout.tsx                  # generateMetadata + Organization/WebSite JSON-LD + GA/Meta/TikTok scripts
    ├── page.tsx                    # Home (ISR 1h)
    ├── nosotros/page.tsx
    ├── abogados/page.tsx
    ├── abogados/[slug]/page.tsx    # 20 abogados × 2 lang = 40 static pages
    ├── acceso-clientes/page.tsx
    ├── admin/                      # /admin (noindex via robots)
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── analytics/page.tsx
    │   └── newsletter/page.tsx
    ├── blog/
    │   ├── page.tsx                # Blog index (BLOG_DATA inline, 31 posts)
    │   └── <31 carpetas>/page.tsx  # 1 page.tsx por post (no [slug] dinámico)
    ├── category/
    │   ├── derechos-de-migrantes/page.tsx
    │   └── proteccion-legal-para-migrantes/page.tsx
    ├── clientes/page.tsx
    ├── clientes-detenidos/page.tsx
    ├── consulta/page.tsx
    ├── informacion/
    │   ├── faq/page.tsx
    │   ├── nosotros/page.tsx       # ⚠ duplicado con /nosotros (manejado via 301)
    │   ├── noticias/page.tsx
    │   └── recursos/page.tsx
    ├── inversionistas/page.tsx
    ├── join-in/page.tsx
    ├── newsletter/
    │   ├── page.tsx
    │   └── [slug]/page.tsx         # Dynamic: una página por edición
    ├── oficinas/
    │   ├── page.tsx                # Hub
    │   └── 15 carpetas/page.tsx    # arvada, chicago, dallas, el-paso, harlingen, houston-accidentes, houston-bellaire, houston-principal, kirby, league-city, losangeles, main-st, memphis, north-loop, northchase
    ├── politica-editorial/page.tsx
    ├── privacidad/page.tsx
    ├── servicios/
    │   ├── page.tsx                # Hub
    │   ├── inmigracion/page.tsx
    │   ├── accidentes/page.tsx
    │   ├── ley-criminal/page.tsx
    │   ├── familia/page.tsx
    │   ├── seguros/page.tsx
    │   ├── visa-e2/page.tsx
    │   ├── visa-u/page.tsx
    │   ├── vawa/page.tsx
    │   ├── defensa-deportacion/page.tsx
    │   └── asilo/page.tsx
    ├── sms-terminos/page.tsx
    ├── terminos/page.tsx
    ├── testimonios/page.tsx
    └── 22 landing pages city×service (ver §3.2)
```

### 3.2 Dynamic routes

Sólo dos:

| Route | File | Genera |
|---|---|---|
| `app/[lang]/abogados/[slug]` | `page.tsx` | 20 abogados × 2 idiomas = **40 páginas** (via `generateStaticParams` en `app/[lang]/abogados/[slug]/page.tsx:15`, iterando sobre `attorneys` de `app/lib/attorneyData.ts`). |
| `app/[lang]/newsletter/[slug]` | `page.tsx` | N ediciones × 2 idiomas (depende de `app/lib/newsletterData.ts`). |

**Todo lo demás está hardcoded como folder por slug.** Por ejemplo, el blog (31 posts) tiene **una carpeta `page.tsx` por post** en vez de `[slug]` dinámico — esto es deliberado (cada blog tiene contenido tipográfico/visual muy custom). Las 22 landing pages city×service (`abogado-inmigracion-houston`, `defensa-deportacion-dallas`, etc.) también son carpetas individuales que comparten un componente común (`CityServiceLanding`).

### 3.3 `generateStaticParams`

| Archivo | Genera |
|---|---|
| `app/layout.tsx` | (n/a, root) |
| `app/[lang]/layout.tsx:445` | `[{lang:'en'},{lang:'es'}]` |
| `app/[lang]/page.tsx:101` | mismo |
| `app/[lang]/abogados/[slug]/page.tsx:15` | 40 (20 abogados × 2) |
| Cada uno de los ~85 `page.tsx` bajo `[lang]/...` | repite `[{lang:'en'},{lang:'es'}]` para forzar prerender estático bilingüe. |

✅ Todo el sitio se prerendera en build (modulo el blog/home que rebuild con ISR). Cero SSR puro.

### 3.4 Middleware / Proxy

✅ `proxy.ts` (Next 16 lo trata como Routing Middleware). Contenido completo:

```ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'es'];
const defaultLocale = 'es';

function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale;
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const browserLocales = acceptLanguage.split(',');
    for (const localeStr of browserLocales) {
      const cleanLocale = localeStr.split(';')[0].split('-')[0].toLowerCase();
      if (locales.includes(cleanLocale)) return cleanLocale;
    }
  }
  return defaultLocale;
}

const SEO_CRAWLER_REGEX = /Googlebot|bingbot|Sitebulb|Screaming Frog|AhrefsBot|SemrushBot|DotBot|rogerbot|YandexBot|Baiduspider/i;

export function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  if (hostname.includes('v2.manuelsolis') || hostname.includes('bos.manuelsolis') || hostname.includes('.vercel.app')) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get('user-agent') || '';
  const isSEOCrawler = SEO_CRAWLER_REGEX.test(userAgent);

  // Normalize uppercase → lowercase (301)
  if (/[A-Z]/.test(pathname)) {
    const lowercasePath = pathname.toLowerCase();
    if (lowercasePath !== pathname) {
      const newUrl = new URL(lowercasePath, request.url);
      newUrl.search = request.nextUrl.search;
      return NextResponse.redirect(newUrl, 301);
    }
  }

  // Strip trailing slashes (except root)
  if (pathname.length > 1 && pathname.endsWith('/')) {
    const newUrl = new URL(pathname.slice(0, -1), request.url);
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl, 301);
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) {
    const localePart = pathname.split('/')[1];
    const locale = (localePart === 'es' || localePart === 'en') ? localePart : 'es';
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', locale);
    const response = NextResponse.next({ request: { headers: requestHeaders } });
    response.headers.set('Content-Language', locale);
    return response;
  }

  if (isSEOCrawler) {
    const newUrl = new URL(`/es${pathname}`, request.url);
    newUrl.search = request.nextUrl.search;
    const response = NextResponse.redirect(newUrl, 301);
    response.headers.set('Content-Language', 'es');
    return response;
  }

  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  newUrl.search = request.nextUrl.search;
  const response = NextResponse.redirect(newUrl);
  response.headers.set('Content-Language', locale);
  response.cookies.set('NEXT_LOCALE', locale, { maxAge: 31536000 });
  return response;
}

export const config = {
  matcher: [
    '/((?!api|rss|_next/static|_next/image|_vercel|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|webmanifest)$).*)',
  ],
};
```

**Observaciones SEO:**
- ✅ Force lowercase 301 — bien.
- ✅ Strip trailing slash 301 — bien (consistente con sitemap que no incluye trailing slashes).
- ✅ Crawlers obtienen el redirect a `/es{path}` con 301 (sin pasar por cookie/Accept-Language).
- ⚠️ Usuarios humanos sin locale en URL reciben un **302 (default)** desde `/` (no `301`) — esto es deliberado (Accept-Language puede variar), pero crawlers nunca verán esto porque van por la rama SEO.
- ⚠️ El proxy intercepta `.vercel.app` para inyectar `X-Robots-Tag: noindex` — bien, pero **la matcher excluye archivos con extensiones**, por lo que el sitemap.xml y robots.txt no reciben el header noindex en `.vercel.app`. Esto puede ser intencional (los archivos `.xml` del sitemap tienen URLs `https://www.manuelsolis.com/...` hardcoded como dominio, así que aunque se sirvan desde `.vercel.app`, las URLs apuntan a producción).

---

## Sección 4 — SEO técnico on-page

### 4.1 Manejo de metadatas

**Metadata API nativa de App Router (`export const metadata` / `export async function generateMetadata`).** No usa `next-seo` ni componentes custom `<SEO />`. Patrón consistente en TODAS las páginas auditadas.

**Capas:**
1. `app/layout.tsx` — metadata raíz (`robots: { index: false }` — sirve sólo como fallback para 404s fuera de `[lang]`).
2. `app/[lang]/layout.tsx` — `generateMetadata({ params })` aplica `metadataBase`, `title.default` + `title.template`, `description`, `keywords` (30+ por idioma), `authors`, `creator`, `publisher`, `icons`, `openGraph.siteName/locale/type/images`, `twitter.card/creator/images`, `robots.index/follow/googleBot.*`.
3. Cada `page.tsx` — `generateMetadata` que pisa con título específico, descripción, `alternates.canonical` + `alternates.languages`, `openGraph.url/images`, `twitter`, y a veces `keywords`.

### 4.2 Ejemplos de implementación

#### 4.2.1 Home — `app/[lang]/page.tsx:17-69`

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';
  const title = isEs
    ? 'Abogados de Inmigración y Accidentes en Houston, TX'
    : 'Immigration & Accident Attorneys in Houston, TX';
  const description = isEs
    ? 'Más de 35 años defendiendo los derechos de inmigrantes. 50,000+ casos ganados...'
    : 'Over 35 years defending immigrant rights. 50,000+ cases won...';
  return {
    title: { absolute: isEs
      ? 'Manuel Solís — Abogados de Inmigración y Accidentes | Houston, TX'
      : 'Manuel Solis — Immigration & Accident Attorneys | Houston, TX' },
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: { es:`${SITE_URL}/es`, en:`${SITE_URL}/en`, 'x-default':`${SITE_URL}/es` },
    },
    openGraph: { title, description, url:`${SITE_URL}/${lang}`, type:'website', images:[{ url:'/home-image.jpg', width:1200, height:630, alt:isEs?'Oficinas Legales de Manuel Solís':'Manuel Solis Law Offices' }] },
    twitter: { card:'summary_large_image', title, description },
  };
}
```

#### 4.2.2 Servicio (`app/[lang]/servicios/inmigracion/page.tsx:14-64`)

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';
  return {
    title: isEs ? 'Abogados de Inmigración en Estados Unidos' : 'Immigration Lawyers in the United States',
    description: isEs
      ? 'Abogados de inmigración con 35+ años y 50,000+ casos ganados. Defensa de deportación, asilo, Visa U, VAWA, residencia y ciudadanía. 15 oficinas en 5 estados.'
      : '...',
    alternates: {
      canonical: `${SITE_URL}/${lang}/servicios/inmigracion`,
      languages: {
        es: `${SITE_URL}/es/servicios/inmigracion`,
        en: `${SITE_URL}/en/servicios/inmigracion`,
        'x-default': `${SITE_URL}/es/servicios/inmigracion`,
      },
    },
    openGraph: { title:..., description:..., url:..., type:'website', locale:isEs?'es_MX':'en_US', siteName:'Manuel Solís Law Firm', images:[{ url:`${SITE_URL}/immigration-hero.png`, width:1200, height:630, alt:... }] },
    twitter: { card:'summary_large_image', ... },
  };
}
```

> ⚠️ Detalle: usa `locale: 'es_MX'` en este servicio (mientras que el home usa `es_US`). Inconsistencia menor.

#### 4.2.3 Oficina — `app/[lang]/oficinas/houston-principal/page.tsx:26-57`

```tsx
return {
  title,
  description,
  alternates: {
    canonical: `https://www.manuelsolis.com/${lang}/oficinas/houston-principal`,
    languages: {
      es: `https://www.manuelsolis.com/es/oficinas/houston-principal`,
      en: `https://www.manuelsolis.com/en/oficinas/houston-principal`,
      'x-default': `https://www.manuelsolis.com/es/oficinas/houston-principal`,
    },
  },
  openGraph: { title, description, url:..., images:['/offices/Houston.png'], type:'website' },
};
```

> ⚠️ Falta `twitter:card` y dimensiones de OG image en este patrón (las oficinas no las setean — un patrón inconsistente vs. servicios).

#### 4.2.4 Blog post — usa `BlogSchema` componente + `generateMetadata` per-page

Cada uno de los 31 blogs tiene su `metadata` inline en `blogContent.{es,en}.metaTitle` + `metaDesc` (ver e.g. `app/[lang]/blog/daca-2026-estado-legal-tribunales/page.tsx:38-40`). Schema BlogPosting se aplica via `app/components/blogs/BlogSchema.tsx` invocando `generateBlogPostingSchema` de `app/lib/blogSchema.ts`.

### 4.3 `title`, `description`, `canonical`, `og:*`, `twitter:*`, `robots`

| Campo | ¿Se genera? | Notas |
|---|---|---|
| `<title>` | ✅ | Con `template: '%s | Manuel Solís'` desde `app/[lang]/layout.tsx`. |
| `description` | ✅ | Bilingüe por página. |
| `canonical` (`alternates.canonical`) | ✅ | Per-page (no en layout — comentario explícito en `app/[lang]/layout.tsx:290-291`). |
| `og:*` | ✅ | `siteName`, `locale`, `type`, `images[]`, `url`. |
| `twitter:*` | ✅ (en home y servicios) — ⚠️ inconsistente en oficinas y landing pages | |
| `robots` | ✅ | Default `{ index:true, follow:true, googleBot:{...} }` desde layout. Root layout pone `{ index:false }` como fallback para 404s. |
| `keywords` | ✅ | Tier 1/2/3 keywords por idioma (~30 cada uno) en `app/[lang]/layout.tsx:169-239`. |
| `metadataBase` | ✅ | `https://www.manuelsolis.com` |

### 4.4 JSON-LD / Schema.org

✅ Implementación extensa. Se genera per-página y se emite con `<script type="application/ld+json">`.

| Schema | Dónde | Notas |
|---|---|---|
| `LegalService` + `LawFirm` (combinado en `@type: ['LegalService','LawFirm']`) | `app/[lang]/layout.tsx:35-125` (Organization, `@id`: `…/#organization`) | Tiene: `name`, `alternateName`, `url`, `logo`, `image`, `foundingDate: 1990`, `slogan`, `knowsAbout[]` (25 temas), `areaServed[]` (5 estados), `hasOfferCatalog` (8 services), `sameAs[]` (5 redes), `contactPoint`, `location[]` (10 oficinas con `PostalAddress` y `telephone`), `numberOfEmployees: { minValue: 50 }`. **Si Google Places retorna datos**: añade `aggregateRating` + `review[0..2]` en runtime con TTL de 24h (`unstable_cache`). |
| `WebSite` | `app/[lang]/layout.tsx:127-139` | `inLanguage: ['en','es']`, `publisher` linked a `#organization`. |
| `LegalService` (per service) | `app/[lang]/servicios/inmigracion/page.tsx:67+`, otros servicios | Por servicio, con `provider: LawFirm`, `serviceType[]`. |
| `LegalService` + `Attorney` (per office) | `app/lib/officeSchema.ts:75-139` (helper `buildOfficeSchema`) | Tiene: `@type:['LegalService','Attorney']`, `@id:…#localbusiness`, `name`, `description`, `image`, `url`, `telephone`, `priceRange:'$$'`, `address`, `geo`, `sameAs[]`, `openingHoursSpecification[]`. Opcional: `aggregateRating` + `review` desde Google Places (24h cache) cuando `OFFICES_PLACE_IDS[slug]` existe. |
| `LegalService` (per city×service landing) | `app/[lang]/abogado-inmigracion-houston/page.tsx:65-117` | Schema completo con `areaServed:{type:'City'}`, `openingHoursSpecification`, `aggregateRating` **hardcoded** (`4.8 / 12`) — ⚠️ ver §13. |
| `Attorney` / `Person` | `app/[lang]/abogados/[slug]/page.tsx:60-105` | Per attorney: `name`, `jobTitle`, `image`, `worksFor: LawFirm`, `alumniOf[]`, `knowsAbout[]`, `sameAs[]`, opcional `workLocation`. |
| `BreadcrumbList` | `app/lib/breadcrumbSchema.ts` + invocado en services, offices, attorney, blog, landings | Helper `generateBreadcrumbSchema(items)` emite `itemListElement` con position+name+item. |
| `FAQPage` | `app/[lang]/abogado-inmigracion-houston/page.tsx:123-131` y otras landings via `getLocalFAQ()`. También blog `daca-2026-...`/etc. usa `generateFAQSchema()` de `blogSchema.ts`. | Sólo se emite cuando hay items. |
| `Blog` | `app/[lang]/blog/page.tsx:697-725` | Con `blogPost[]` listando los 31 posts con `headline`, `datePublished`, `author`, `url`, `image`. |
| `BlogPosting` | `app/lib/blogSchema.ts` → invocado en cada blog page via `<BlogSchema>` | `headline`, `description`, `datePublished`, `dateModified` (= published), `url`, `image`, `inLanguage`, `mainEntityOfPage`, `author: Person Manuel Solís` con `knowsAbout`, `publisher: Organization`, `timeRequired: PTxxM`. |
| `Article` | **No usa `Article`** — todos los blogs son `BlogPosting`. | OK, es válido y más específico. |
| `VideoObject` | Estaba en layout pero **fue movido** a `/testimonios` (comentario en `app/[lang]/layout.tsx:141-142`). | Se referencia que está en testimonios. |

### 4.5 `<link rel="canonical">`

✅ Implementado vía `metadata.alternates.canonical` en cada page.tsx auditada. Next.js emite el `<link>` automáticamente.

### 4.6 Breadcrumbs visuales + schema

- **Schema** ✅ generado en services, offices, attorney detail, blog index, blog posts, landings (via `generateBreadcrumbSchema`).
- **Componente visual `Breadcrumbs.tsx`** existe en `app/components/Breadcrumbs.tsx`. Se renderiza en (verificar caso por caso) — el schema es lo principal; el componente visual no está hecho global en el layout.

---

## Sección 5 — Sitemap y robots

### 5.1 ¿Existe `sitemap.xml`?

✅ **Dinámico, 7 shards + 1 index.** Generados como route handlers (`app/sitemap.xml/route.ts` y `app/sitemap-*.xml/route.ts`), no como `MetadataRoute.Sitemap`. Cada shard sirve `Content-Type: application/xml; charset=utf-8` con `Cache-Control: public, max-age=3600, s-maxage=3600`.

| Shard | Genera | Aprox. URLs |
|---|---|---|
| `sitemap.xml` | Index que apunta a los 7 shards | 7 entries |
| `sitemap-pages.xml` | Hub/static: home, nosotros, abogados, testimonios, clientes, clientes-detenidos, join-in, inversionistas, politica-editorial, informacion/faq, informacion/recursos, privacidad, terminos, sms-terminos, 2 categorías = 16 × 2 lang = **32** | 32 |
| `sitemap-servicios.xml` | Hub + 10 servicios = 11 × 2 lang = **22** | 22 |
| `sitemap-oficinas.xml` | Hub + 15 oficinas = 16 × 2 lang = **32** | 32 |
| `sitemap-abogados.xml` | N attorneys × 2 lang (declarado dinámico desde `attorneys[]`) | ~40 |
| `sitemap-landings.xml` | 22 landing pages × 2 lang = **44** | 44 |
| `sitemap-blog.xml` | Hub + 30 posts × 2 lang = ~62 | 62 |
| `sitemap-newsletter.xml` | Hub + N ediciones × 2 lang | ? |

**Total estimado:** ~230-260 URLs.

### 5.2 Config de sitemap

No hay `next-sitemap.config.js`. Toda la lógica está en **`app/lib/sitemapData.ts`** (224 líneas) — el código está pegado íntegro en §1.4 referencias / disponible en repo.

### 5.3 Cobertura del sitemap

- ✅ Incluye todas las páginas en ambos idiomas (cada entry expandida con `expandLangs()`).
- ❌ **No emite `<xhtml:link rel="alternate" hreflang="...">`** dentro del sitemap. Sólo `<loc>`, `<lastmod>`, `<changefreq>`, `<priority>`.
- ⚠️ **`lastmod` muchos hardcoded** (`'2026-04-11'`, `'2026-03-25'`, etc. — ver `app/lib/sitemapData.ts:86-100`). Esto se vuelve obsoleto rápido y desincentiva el recrawl.
- ✅ El sitemap index emite `lastmod = TODAY` (`new Date().toISOString().slice(0,10)`) — pero los shards individuales conservan los hardcoded.
- ✅ No incluye páginas `/admin/*` (no están en sitemapData).
- ✅ El blog enumera explícitamente cada post (ver `getBlogEntries()` en `sitemapData.ts:169-203`).

### 5.4 `robots.txt`

✅ Generado dinámicamente vía `app/robots.ts` (Next.js `MetadataRoute.Robots`):

```ts
import type { MetadataRoute } from 'next';
const SITE_URL = 'https://www.manuelsolis.com';
export default function robots(): MetadataRoute.Robots {
  const commonAllow = ['/', '/_next/static/', '/_next/image', '/_next/image/'];
  const commonDisallow = [
    '/api/', '/_next/data/', '/_next/server/',
    '/private/', '/admin', '/es/admin', '/en/admin',
  ];
  return {
    rules: [
      { userAgent: '*',                       allow: commonAllow, disallow: commonDisallow, crawlDelay: 1 },
      { userAgent: 'Googlebot',               allow: commonAllow, disallow: commonDisallow },
      { userAgent: 'Bingbot',                 allow: commonAllow, disallow: commonDisallow, crawlDelay: 1 },
      { userAgent: 'Sitebulb',                allow: '/',         crawlDelay: 2 },
      { userAgent: 'Screaming Frog SEO Spider', allow: '/',       crawlDelay: 1 },
      { userAgent: 'GPTBot',                  disallow: '/' },
      { userAgent: 'CCBot',                   disallow: '/' },
      { userAgent: 'anthropic-ai',            disallow: '/' },
      { userAgent: 'ClaudeBot',               disallow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

### 5.5 ¿Bloquea algo importante?

- ✅ Bloquea `/api/`, `/admin`, `/_next/data/` — correcto.
- ❌ **Bloquea GPTBot, CCBot, anthropic-ai y ClaudeBot.** Esto evita que ChatGPT (con browsing), Common Crawl, Anthropic y Claude indexen el sitio. **Para 2026 con AI Overviews y motores generativos, esta decisión bloquea el alcance en motores de respuesta generativa.** Vale la pena revisarlo — bloquear AI training puede tener sentido legal/de contenido, pero bloquear ClaudeBot/GPTBot también te excluye de citaciones en respuestas conversacionales que ya manejan tráfico relevante.
- ⚠️ **No bloquea PerplexityBot, AmazonBot, DuckAssistBot, AppleBot-Extended, etc.** — lista incompleta para una postura coherente.
- ⚠️ **`crawlDelay: 1` para Bingbot y wildcard** — Google ignora crawl-delay, pero Bing lo respeta. 1s/req es razonable.

---

## Sección 6 — Performance y Core Web Vitals (estimación estática)

### 6.1 `next/image`

✅ **Usado consistentemente.** 50 archivos importan `next/image`. Sólo se encontró un `<img>` HTML nativo y es legítimo: el noscript fallback de Meta Pixel en `app/[lang]/layout.tsx:417`.

`next.config.ts.images`:
- `formats: ['image/avif','image/webp']` ✅
- `minimumCacheTTL: 31536000` ✅ (1 año)
- `qualities: [50, 75, 82]` — restricción para evitar variantes inútiles ✅
- `deviceSizes: [640, 750, 828, 1080, 1200, 1920]` — recortado vs default ✅

### 6.2 `next/font`

✅ `app/layout.tsx` importa `Outfit` desde `next/font/google` con `weight:[300,400,500,600,700]`, `variable:'--font-outfit'`, `display:'swap'`. Buena práctica.

### 6.3 Lazy loading de componentes pesados

✅ `app/components/FloatingCtas.tsx:12-15` usa `dynamic()` con `{ssr:false}` para WhatsAppButton, ConsultaFloatingCta, AIChatButton, MobileStickyBar. **Sólo cuatro archivos en todo el repo usan `dynamic()`** — el resto del bundle es SSR-rendered y no se code-splittea agresivamente.

### 6.4 `loading="lazy"` en imágenes below-the-fold

`next/image` aplica `loading="lazy"` por default salvo cuando se setea `priority`. El Hero usa `priority` correctamente (`app/components/Hero.tsx:79-80` con `priority` + `sizes="(max-width: 768px) 100vw, 50vw"`).

### 6.5 Videos

- `app/components/AboutVideo.tsx` — existe.
- `app/[lang]/servicios/accidentes/AccidentesVideo.tsx` — existe.
- ✅ **No hay autoplay** detectable a nivel estático (no se grep'd `autoPlay`).
- `link rel="preconnect" href="https://www.youtube.com"` y `https://img.youtube.com` en `app/[lang]/layout.tsx:338-339`. Sugiere embeds de YouTube.

### 6.6 Bundle main

No se ejecutó `ANALYZE=true next build` (instrucciones de no modificar/build). Estimación basada en deps:
- `framer-motion` (~70-100kb gz) → pesado pero se usa en muchas vistas; mitigado por SSR-first.
- `lucide-react` `^0.554` — tree-shaking debería limitar a los iconos importados.
- `@vercel/analytics`, `@vercel/speed-insights` — pequeños.
- `botid` — cliente sólo se inicializa cuando `NEXT_PUBLIC_BOTID_CLIENT_ENABLED=true`.

### 6.7 Scripts third-party

| Script | Carga | Notas |
|---|---|---|
| Google Analytics 4 | `Script strategy="lazyOnload"` (cuando `NEXT_PUBLIC_GA_ID` está set; en `.env.local` está `G-V5F8J8QMZ4`) | `app/[lang]/layout.tsx:355-375` |
| Meta Pixel | `lazyOnload` (cuando `NEXT_PUBLIC_META_PIXEL_ID` está set; valor `1679590710105917`) + noscript fallback | `app/[lang]/layout.tsx:377-396` |
| TikTok Pixel | `lazyOnload` (cuando `NEXT_PUBLIC_TIKTOK_PIXEL_ID` está set; valor `CVERFVJC77U9L0C1P6O0`) | `app/[lang]/layout.tsx:398-413` |
| Vercel Analytics + Speed Insights | Componentes oficiales | `app/[lang]/layout.tsx:437-438` |
| Google Tag Manager | **No detectado** (solo GA4 directo, sin GTM) | |
| Microsoft Clarity / Hotjar / Lucky Orange | **No detectado** | |
| CallRail / call tracking | **No detectado** | |
| Chat widget | `AIChatButton` (custom, conecta a `/api/chat` Gemini) | No es Intercom/Drift/Tawk. |

Preconnects/DNS-prefetch en `app/[lang]/layout.tsx:336-341`:
```
preconnect: googletagmanager.com, youtube.com, img.youtube.com
dns-prefetch: connect.facebook.net, analytics.tiktok.com
```

---

## Sección 7 — Páginas de oficinas (CRÍTICO para local SEO)

### 7.1 Estructura

Cada oficina vive en `app/[lang]/oficinas/<slug>/page.tsx` y un `OfficeClient.tsx` que pasa data tipada a `app/components/OfficePageView.tsx`. Schema generado por `app/lib/officeSchema.ts` (helper centralizado `buildOfficeSchema` con augmentation de Google Places — ver §4.4).

### 7.2 Lista TOTAL de oficinas (ambos idiomas)

| # | Slug | URL ES | URL EN |
|---|---|---|---|
| 1 | `houston-principal` | `/es/oficinas/houston-principal` | `/en/oficinas/houston-principal` |
| 2 | `main-st` | `/es/oficinas/main-st` | `/en/oficinas/main-st` |
| 3 | `north-loop` | `/es/oficinas/north-loop` | `/en/oficinas/north-loop` |
| 4 | `northchase` | `/es/oficinas/northchase` | `/en/oficinas/northchase` |
| 5 | `houston-bellaire` | `/es/oficinas/houston-bellaire` | `/en/oficinas/houston-bellaire` |
| 6 | `kirby` | `/es/oficinas/kirby` | `/en/oficinas/kirby` |
| 7 | `houston-accidentes` | `/es/oficinas/houston-accidentes` | `/en/oficinas/houston-accidentes` |
| 8 | `dallas` | `/es/oficinas/dallas` | `/en/oficinas/dallas` |
| 9 | `el-paso` | `/es/oficinas/el-paso` | `/en/oficinas/el-paso` |
| 10 | `harlingen` | `/es/oficinas/harlingen` | `/en/oficinas/harlingen` |
| 11 | `chicago` | `/es/oficinas/chicago` | `/en/oficinas/chicago` |
| 12 | `losangeles` | `/es/oficinas/losangeles` | `/en/oficinas/losangeles` |
| 13 | `arvada` | `/es/oficinas/arvada` | `/en/oficinas/arvada` |
| 14 | `memphis` | `/es/oficinas/memphis` | `/en/oficinas/memphis` |
| 15 | `league-city` | `/es/oficinas/league-city` | `/en/oficinas/league-city` |

**15 oficinas × 2 idiomas = 30 páginas.** Slug `losangeles` (no `los-angeles`) — hay un redirect 301 desde `/oficinas/los-angeles` y de la variante con guión en `app/lib/seoRedirects.ts:307-308`.

### 7.3 Schema `LocalBusiness` / `Attorney`

✅ Sí — `@type: ['LegalService','Attorney']` per oficina (ver §4.4 y `app/lib/officeSchema.ts:77`). 14 de 15 oficinas tienen `placeId` registrado en `app/lib/officesRegistry.ts:16-32` (todas excepto `northchase`), lo cual permite incluir `aggregateRating` y `review[]` desde Google Places API con cache 24h. Cuando no hay placeId, el schema se renderiza sin esos campos (graceful fallback — explícito para evitar el legal risk de inventar ratings).

### 7.4 Mapa embebido

⚠️ **No hay iframe de Google Maps embed en las páginas de oficina** — sólo un link saliente al `mapLink` (ej. `https://share.google/ZErZNzC4y9PtCrEJm`). El único iframe Google Maps en el repo está en `app/[lang]/nosotros/NosotrosClient.tsx`.

**Implicación:** El usuario no ve un mapa interactivo embebido en cada página de oficina, sólo un botón "Ver mapa" que abre Google Maps en otra pestaña. Esto reduce engagement signals (tiempo en página) pero mejora performance.

### 7.5 NAP (Name, Address, Phone)

✅ Visible. Cada `OfficePageView` renderiza `address`, `phone`, `hours` desde `OfficeData`. También se emite en el schema (`PostalAddress` + `telephone`).

### 7.6 Horarios

✅ Sí — `OfficeData.hours` ES/EN. También `openingHoursSpecification[]` en el schema (Lun-Vie + Sáb).

### 7.7 Fotos de la oficina física

⚠️ Cada oficina tiene **una imagen** (`data.image`, e.g. `/offices/Dallas.png` — `public/offices/` existe). No hay galería de fotos. Las fotos parecen ser composites de oficina + marca, no fotografías documentales del local físico.

### 7.8 Abogados de la oficina

✅ Sí — `OfficeData.attorneys[]` y `OfficeData.managers[]`. Cada abogado lista `name`, `role`, `image` (desde Vercel Blob), `quote`. **Falta link a `/abogados/[slug]` desde la card** (verificar — no fue confirmado en lectura, podría existir).

### 7.9 Landing pages tipo `[servicio]-en-[ciudad]`

✅ **22 landing pages city×service** (ver §8 y `app/lib/cityServiceData.ts:397+`):

- Immigration (8): Houston, Dallas, Chicago, LA, El Paso, Memphis, Denver, Harlingen
- Accidentes (2): Houston, Dallas
- Defensa deportación (5): Houston, Dallas, Chicago, LA, El Paso
- Visa U (4): Houston, Chicago, LA, Dallas
- Asilo político (3): Houston, Chicago, LA
- VAWA (3): Houston, Chicago, Dallas

> 🔴 Slug en español puro (`abogado-inmigracion-houston`) sirviendo también `/en/`. Mismo problema señalado en §2.5.

---

## Sección 8 — Páginas de servicios / áreas de práctica

### 8.1 Lista TOTAL de servicios

| Slug | URL ES | URL EN | Líneas de page.tsx + Client |
|---|---|---|---|
| `servicios` (hub) | `/es/servicios` | `/en/servicios` | — |
| `inmigracion` | `/es/servicios/inmigracion` | `/en/servicios/inmigracion` | 252 (ImmigrationClient.tsx) |
| `accidentes` | `/es/servicios/accidentes` | `/en/servicios/accidentes` | 128 + AccidentesClient + AccidentesCases + AccidentesVideo + accidentesData |
| `ley-criminal` | `/es/servicios/ley-criminal` | `/en/servicios/ley-criminal` | 127 + leyCriminalData |
| `familia` | `/es/servicios/familia` | `/en/servicios/familia` | 128 |
| `seguros` | `/es/servicios/seguros` | `/en/servicios/seguros` | 127 |
| `visa-e2` | `/es/servicios/visa-e2` | `/en/servicios/visa-e2` | 200 (VisaE2Client) |
| `visa-u` | `/es/servicios/visa-u` | `/en/servicios/visa-u` | 283 (VisaUClient) |
| `vawa` | `/es/servicios/vawa` | `/en/servicios/vawa` | 223 (VawaClient) |
| `defensa-deportacion` | `/es/servicios/defensa-deportacion` | `/en/servicios/defensa-deportacion` | 108 |
| `asilo` | `/es/servicios/asilo` | `/en/servicios/asilo` | 107 + AsiloClient + AsiloCases + asiloData |

### 8.2 Contenido promedio

- **Inmigración, Visa U, VAWA, Visa E2** tienen Client components grandes (~200-300 LOC JSX) con contenido custom.
- **Accidentes, asilo, ley-criminal, familia, seguros, defensa-deportacion** tienen Client components compartiendo patrones (~107-128 LOC en page.tsx) + data en archivos `<service>Data.ts`.

No se puede medir wordcount exacto sin ejecutar la página, pero el contenido es **server-rendered, bilingüe, denso** (no thin content).

### 8.3 FAQs con schema

✅ Schema `FAQPage` se emite cuando hay FAQs:
- `app/[lang]/servicios/inmigracion/page.tsx` importa `generateFAQSchema` de `blogSchema.ts`.
- Landings (`abogado-inmigracion-houston`) emiten FAQPage cuando `getLocalFAQ(...)` retorna items (ver `app/[lang]/abogado-inmigracion-houston/page.tsx:123-131`).

### 8.4 CTAs claros

✅ El componente compartido `CityServiceLanding` (`app/components/CityServiceLanding.tsx`) renderiza un CTA prominente con teléfono y formulario. El `ContactForm` está al final de la mayoría de pages.

### 8.5 Testimonios / reviews con schema

✅ Las reviews vienen de Google Places API server-side (24h cache) y se emiten dentro del schema de Organization (`app/[lang]/layout.tsx:305-329`) y por oficina (`app/lib/officeSchema.ts:125-137`). **No hay reviews hardcoded en el código** — explícitamente evitado por riesgo legal (comentario en `app/lib/officeSchema.ts:20-22` y `app/[lang]/layout.tsx:299-303`).

⚠️ **Excepción**: la landing `abogado-inmigracion-houston/page.tsx:109-116` emite **`aggregateRating` hardcoded `4.8 / 12`** en el schema. Este es un dato fijo, no proveniente de Google Places — **viola la política interna anti-hardcoded ratings**. Habrá que verificar las otras 21 landings.

---

## Sección 9 — Blog

### 9.1 Ubicación

`app/[lang]/blog/` — **31 carpetas, una por post, cada una con su propio `page.tsx`** (no usa `[slug]` dinámico — cada artículo es código React custom con animaciones, secciones tipográficas, imágenes inline).

### 9.2 Posts en cada idioma

**31 posts**. **El contenido es bilingüe en runtime** (cada `page.tsx` lleva un objeto `blogContent = { es: {...}, en: {...} }` y switchea según `lang`). El blog index (`app/[lang]/blog/page.tsx:21-622`) lista los 31 posts con `BLOG_DATA.posts[]` que incluye `title.es/en`, `excerpt.es/en`, `category.es/en`, `date`, `readTime`, `image`, `featured`.

**Total efectivo:** 31 URLs ES + 31 URLs EN = **62 URLs de blog post** (más el hub × 2 = 64 total).

### 9.3 Cadencia

Fechas tomadas de `BLOG_DATA.posts` en `app/[lang]/blog/page.tsx` (orden cronológico):

| Mes | Posts |
|---|---|
| 2025-01 | 4 |
| 2025-02 | 4 |
| 2025-03 | 7 |
| 2025-04 | 6 |
| 2025-05 | 4 |
| **2026-05** | **1** (DACA 2026, fechado 2026-05-13) |

Aclaración: la mayoría de fechas están en 2025 (Jan-May 2025). Hay **uno solo fechado 2026-05-13** (DACA 2026). Posibles inconsistencias entre `date` en `BLOG_DATA` vs sitemap `lastModified` (e.g., `tps_2026_...` tiene date `2025-04-10` en BLOG_DATA pero el sitemap dice `2025-04-10` también).

- **Últimos 3 meses (Feb-May 2026):** 1 post nuevo (DACA, 2026-05-13)
- **Últimos 6 meses:** 1
- **Últimos 12 meses:** 1 (aunque el contenido pre-2025-05 fue agregado a lo largo del año)

> ⚠️ El blog parece pausado durante el último año. Para SEO y E-E-A-T (especialmente legal/YMYL), cadencia editorial baja debilita autoridad.

### 9.4 Byline de autor

✅ En cada post hay un sidebar "Sobre el Autor" con foto de Manuel Solís y link a `/{lang}/abogados/manuel-solis` (ver `app/[lang]/blog/daca-2026-estado-legal-tribunales/page.tsx:843-857`). El schema `BlogPosting.author` apunta a `Person → Manuel Solís` con `knowsAbout` y `url` al perfil. **Bien para E-E-A-T.**

### 9.5 Schema `Article` / `BlogPosting`

✅ `BlogPosting` (ver §4.4) emitido per post via `<BlogSchema>` componente.

### 9.6 Últimas 20 publicaciones

Ordenadas por `date` descendente según `BLOG_DATA.posts`:

| # | Date | Title (ES) | Slug | Bilingüe |
|---|---|---|---|---|
| 1 | 2026-05-13 | DACA 2026: ¿qué pasa con mi caso mientras sigue en los tribunales? | `daca-2026-estado-legal-tribunales` | ES + EN |
| 2 | 2025-05-16 | Fraude de notarios: cómo saber si tu "abogado" es falso… | `fraude-notarios-inmigracion` | ES + EN |
| 3 | 2025-05-12 | Familias de estatus mixto: opciones legales… | `familias-estatus-mixto-opciones` | ES + EN |
| 4 | 2025-05-08 | Cómo prepararte para tu entrevista de inmigración: 10 errores… | `entrevista-inmigracion-errores-evitar` | ES + EN |
| 5 | 2025-05-04 | Visa K-1 de prometido: requisitos, tiempos y errores… | `visa-k1-prometido-requisitos` | ES + EN |
| 6 | 2025-04-30 | Formulario I-864: quién puede ser patrocinador… | `i-864-patrocinador-ingreso-minimo` | ES + EN |
| 7 | 2025-04-26 | Tuve un accidente de auto siendo indocumentado: ¿tengo derechos? | `accidente-auto-indocumentado-derechos` | ES + EN |
| 8 | 2025-04-22 | Barras de 3 y 10 años: ¿puedo regresar a EE.UU.? | `barras-3-10-anos-presencia-ilegal` | ES + EN |
| 9 | 2025-04-18 | Request for Evidence (RFE): cómo responder sin que te nieguen… | `rfe-responder-evidencia-uscis` | ES + EN |
| 10 | 2025-04-14 | Crímenes que causan deportación: la guía más útil sobre delitos… | `crimenes-deportacion-vileza-moral` | ES + EN |
| 11 | 2025-04-10 | TPS 2026: países elegibles, cómo renovar… | `tps-2026-paises-elegibles-renovacion` | ES + EN |
| 12 | 2025-04-04 | Asilo en la frontera 2026: diferencias entre entregarse… | `asilo-frontera-2026-puerto-entrada-vs-cruce` | ES + EN |
| 13 | 2025-04-01 | Entrevista de matrimonio: señales de alerta… | `entrevista-matrimonio-uscis-senales-alerta` | ES + EN |
| 14 | 2025-03-28 | Ciudadanía (N-400) en español: ¿quiénes califican? | `ciudadania-en-espanol-reglas-50-20-55-15` | ES + EN |
| 15 | 2025-03-24 | Legal en mi estado, delito para Inmigración: marihuana, DUI… | `marihuana-dui-buen-caracter-moral-inmigracion` | ES + EN |
| 16 | 2025-03-20 | Me casé con ciudadano pero entré "por el cerro": Perdón I-601A | `perdon-i601a-arreglar-papeles-entrada-ilegal` | ES + EN |
| 17 | 2025-03-17 | Estatus Juvenil (SIJS): papeles para jóvenes abandonados… | `estatus-juvenil-sijs-residencia-jovenes-abandonados` | ES + EN |
| 18 | 2025-03-12 | No apliques a ciegas: por qué pedir tu récord (FOIA)… | `foia-migratoria-pedir-record-antes-de-aplicar` | ES + EN |
| 19 | 2025-03-08 | ¿Puede mi patrón pedirme la residencia si entré indocumentado? | `residencia-laboral-eb3-ley-245i-entrada-indocumentada` | ES + EN |
| 20 | 2025-03-05 | Advance Parole 2026: ¿Es seguro viajar… | `advance-parole-2026-viajar-con-daca-tps-visa-u` | ES + EN |

> ⚠️ Hay un **mismatch entre `id` y `slug`** en `BLOG_DATA` — los `id` usan underscores (`Visa_U_y_VAWA_incluir_hijos_y_nuevos_esposos_derivados`), mientras los `slug` usan kebab-case (`visa-u-y-vawa-incluir-hijos-y-nuevos-esposos-derivados`). Por eso `seoRedirects.ts:47-65` tiene 20+ redirects 301 desde `underscore_CamelCase` → `kebab-case`. Es un fix retroactivo bien aplicado.

### 9.7 RSS

✅ Sólo en español: `app/rss/newsletter/route.ts`. No hay RSS de blog estándar (solo de newsletter editions).

---

## Sección 10 — Redirects y URLs legacy

### 10.1 Redirects en `next.config.ts`

✅ `next.config.ts:44-46` retorna `seoRedirects` desde `app/lib/seoRedirects.ts` (426 líneas, **>200 reglas 301**).

Categorías (resumen):

| Categoría | Volumen aprox. |
|---|---|
| Blog slug normalization (underscore/CamelCase → kebab-case) | 20 |
| WordPress core (`/wp-admin/*`, `/wp-login.php`, `/wp-content/*`, `/wp-includes/*`, `/wp-json/*`, `/xmlrpc.php`, feeds, comments/feed, author pages, blog pagination, tags) | 25 |
| English alias slugs (`/about → /nosotros`, `/services → /servicios`, `/attorneys → /abogados`, `/privacy → /privacidad`, `/terms → /terminos`, `/careers → /join-in`, `/news → /blog`, `/home → /`, etc.) | 25 |
| FAQ legacy variants | 8 |
| Categorías legacy WordPress (`/proceso-migratorio/*`, `/derechos-de-migrantes/*`, `/requisitos-de-visas/*`, `/proteccion-legal-para-migrantes-*`) | 20 |
| Service-area legacy (`/areas-servicio/*`, `/service-areas/*`, `/legal-areas/*`) — 3 estilos diferentes (mostly WP) | 40 |
| Old service slugs (`windstorm-claims`, `tornado-claims`, etc.) | 10 |
| Standalone visa pages (`/visa-vawa`, `/visa-t`, `/visa-sijs`, `/visa-juvenil-sij`) | 8 |
| Office legacy slugs (`/oficinas/houston-principal-office`, `/oficinas/los-angeles`, `/oficinas/denver`, etc. + `/offices/*`) | 20 |
| Attorney legacy + defunct attorneys (11 slugs) | 35 |
| Testimonial individual slugs (sin páginas individuales) | 2 |
| Privacy policy / recursos / terminos variants | 6 |
| Landing legacy (`landing-google-*`, `landing-facebook-*`, `landing-fb-*`, `landing-page-fb-*`, `landing-visau`) | 12 |
| Lead-qualification pages | 4 |
| Thank-you pages (`/gracias`, `/gracias-por-completar-*`) | 4 |
| Social aliases (`/youtube`, `/instagram`, `/facebook`, `/tiktok`, `/telemundo`) — redirect a URLs externas con `basePath: false` | 6 |
| QR / brochure / promo URLs | 3 |
| Misc legacy (`/new-home`, `/manuel-solis-live-2`) | 2 |

**Comentario importante en `seoRedirects.ts:6-7`**: estos redirects fueron motivados por Google Search Console reportando ~1,030 URLs como "Not found (404)" — casi todas paths legacy de WordPress. La cobertura parece amplia y bien comentada.

### 10.2 `_redirects` / `vercel.json`

❌ No existen `_redirects` (Netlify) ni `vercel.json` en el repo. Tampoco `vercel.ts`. Todo está en `next.config.ts → redirects()`.

### 10.3 Rutas legacy WordPress

✅ Manejadas (ver §10.1). El proxy también captura URLs en mayúsculas y trailing slash (típicas de Apache/WP).

⚠️ **Posibles WP residuals NO cubiertos:**
- `/?p=1234` (query string permalinks de WP) — `next.config.ts` redirects no atrapan `?p=` (Next redirects funcionan sobre el pathname, no el query). Habría que confirmar si esos URLs ya están retirados de SERP/sitemap antiguos.
- `/category/<algo-no-soportado>/*` — sólo dos categorías soportadas (`derechos-de-migrantes`, `proteccion-legal-para-migrantes`).

### 10.4 Manejo de 404

✅ `app/not-found.tsx` (66 líneas) — bilingüe (header en ES + sub-text en EN), branding intacto, CTAs a `/es`, `/es/servicios`, tel link. Sin schema específico. Sin `revalidate`/dynamic config — es estático.

> 🟡 Mejora menor: `not-found.tsx` no incluye `<meta name="robots" content="noindex">` explícito (depende del status code 404 de Next.js). En el `app/layout.tsx` el root metadata tiene `robots: { index: false }`, así que un 404 fuera de `[lang]` heredaría noindex correctamente.

---

## Sección 11 — Analytics y tracking

### 11.1 Google Analytics 4

✅ Integrado en `app/[lang]/layout.tsx:355-375` con `Script strategy="lazyOnload"`. Measurement ID **`G-V5F8J8QMZ4`** (en `.env.local` → `NEXT_PUBLIC_GA_ID`). Renderiza condicionalmente — si la env var no está set, el script no se emite.

### 11.2 Google Tag Manager

❌ No detectado. GA4 se carga directamente, sin GTM en medio.

### 11.3 Consent Management Platform (cookie banner)

❌ **No hay cookie banner / CMP** en el código.

⚠️ **Implicación legal:** El sitio carga GA, Meta Pixel, TikTok Pixel sin obtener consentimiento previo. Si el sitio aspira a tráfico EU/UK/Brazil/California, esto puede generar issues de GDPR/CCPA/LGPD. Los pixels son `lazyOnload` pero no condicional a consent.

### 11.4 Microsoft Clarity / Hotjar / Lucky Orange

❌ No detectado.

### 11.5 Call tracking

❌ No hay CallRail u otros. Las llamadas se trackean indirectamente via `TrackedPhoneLink` componente (probablemente custom, vía `lib/tracking.ts`).

### 11.6 Chat widget

✅ Custom: `AIChatButton` (`app/components/AIChatButton.tsx`, lazy-loaded vía `dynamic({ssr:false})`) — conecta a `/api/chat` que llama Gemini (`@google/generative-ai`). No es Intercom/Drift/Tawk.

### 11.7 Vercel BotID

✅ `botid` instalado y `withBotId(nextConfig)` wrapping. Modo `report-only` por default (no bloquea), configurable via `BOTID_MODE` env. Cliente sólo se inicializa cuando `NEXT_PUBLIC_BOTID_CLIENT_ENABLED=true` (opt-in, por el incidente de 2026-05-07 documentado en `instrumentation-client.ts`).

### 11.8 Otros tracking

`app/lib/tracking.ts` — `trackPageView()` exportada y llamada desde `PageViewTracker` cliente. Probablemente postea a `/api/analytics` con UTMs y pathname. Más server-side conversion tracking en `/api/conversions`.

---

## Sección 12 — Subdominios y satélites referenciados

### 12.1 Búsqueda exhaustiva

| Dominio externo | Dónde se referencia | Tipo |
|---|---|---|
| `bos.manuelsolis.com` | `app/lib/leadCapture.ts:24` (default), `app/api/lead-capture/route.ts:17`, `proxy.ts:38` (lista para noindex) | Backend de leads (legacy, en proceso de cutover a Solislead) |
| `v2.manuelsolis.com` | `proxy.ts:38` | Staging — noindex via X-Robots-Tag |
| `comopuedoarreglar.com` | `next.config.ts:26` (image remotePattern) | Dominio propio de assets/imágenes |
| `manuelsolis.com` (sin www) | `next.config.ts:30` (image remotePattern) | Para imágenes servidas desde el dominio sin www |
| `uenjwzjx3vckezns.public.blob.vercel-storage.com` | `next.config.ts:33-37` (image remotePattern) | Vercel Blob — imágenes de abogados |
| `img.youtube.com` | `next.config.ts:39-42` (image remotePattern) + preconnect | YouTube thumbnails |
| `share.google/...` | URLs `mapLink` en cada `OfficeClient.tsx` | Google Maps short links |
| YouTube channel | `https://www.youtube.com/@ManuelSolisLawFirm` (redirect target en seoRedirects.ts:406) | Social |
| Instagram | `https://www.instagram.com/maboralaw/` (redirect, seoRedirects.ts:407) | Social |
| Facebook | `https://www.facebook.com/ManuelSolisLawFirm` y `/AbogadoManuelSolisOficial/` (varios) | Social |
| Twitter | `https://twitter.com/AbogadoMSolis` | Social |
| TikTok | `https://www.tiktok.com/@manuelsolislawfirm` | Social |
| LinkedIn | `https://www.linkedin.com/company/manuel-solis-law-firm/` | Social |

**Dominios mencionados por el usuario que NO encontré referencias:**

| Dominio | Resultado |
|---|---|
| `visa-vawa.com` | ❌ **No se encuentra ninguna referencia en el repo.** Si existe como satélite, no está linkeado desde manuelsolis.com. |
| `elportaldelinmigrante.com` | ❌ **No se encuentra.** |

### 12.2 Links salientes a esos dominios

- **Redes sociales**: links en footer y en redirects `/youtube`, `/instagram`, `/facebook`, `/tiktok` (cada uno con `basePath: false` para que el redirect 301 lleve a URL externa).
- **Solislead/BOS**: sólo en backend (`leadCapture.ts` posts a `bos.manuelsolis.com/lead/manuelsolis`). No es un link expuesto al usuario.
- **`comopuedoarreglar.com`**: configurado como remotePattern para imágenes pero no se grep'ó un uso real en JSX. Puede ser legacy/preparation.

---

## Sección 13 — Issues técnicos detectados

### 13.1 `aggregateRating` hardcoded (riesgo legal + Google Spam policy)

🔴 **`app/[lang]/abogado-inmigracion-houston/page.tsx:109-116`**:

```ts
aggregateRating: {
  '@type': 'AggregateRating',
  ratingValue: '4.8',
  bestRating: '5',
  worstRating: '1',
  ratingCount: '12',
  reviewCount: '12',
},
```

Esto es contradictorio con la política interna explícita (ver `app/lib/officeSchema.ts:20-22` y `app/[lang]/layout.tsx:299-303`) de **nunca usar reviews/ratings hardcoded**. Hay 22 landings que comparten patrón — probablemente todas tienen el mismo issue. Sugerido auditar y migrar a Google Places data o eliminar `aggregateRating` por completo de estas landings.

### 13.2 Mismatch `id` vs `slug` en BLOG_DATA

⚠️ `app/[lang]/blog/page.tsx` define `BLOG_DATA.posts[].id` con underscores/CamelCase (`Visa_U_y_VAWA_incluir_hijos_y_nuevos_esposos_derivados`, `Formulario_G28_Cambiar_Abogado_Inmigracion`, etc.) y `slug` en kebab-case. Esto es **históricamente correcto** (refleja los IDs originales que necesitaban redirect), pero hace que el código sea confuso. No impacta SEO directo (Google ve sólo los slugs).

### 13.3 Slugs en español bajo `/en/` (ver §2.5 y §7.2)

🔴 **Crítico para SEO inglés.** No se inventaron variantes EN de slugs (`/en/services/immigration`, `/en/immigration-lawyer-houston`, etc.).

### 13.4 Sin Cookie Consent Banner

🟡 Compliance GDPR/CCPA débil. Los pixels cargan sin gate.

### 13.5 `lastmod` hardcoded en sitemap

🟡 `app/lib/sitemapData.ts:84-203` tiene fechas hardcoded por entry. Las páginas pueden cambiar y el sitemap no lo refleja, lo que reduce eficiencia de crawl.

### 13.6 Bloqueo de AI bots

🟡 `robots.ts:50-53` bloquea GPTBot, CCBot, anthropic-ai, ClaudeBot. Decisión deliberada, pero deja fuera PerplexityBot, AppleBot-Extended, AmazonBot — postura inconsistente.

### 13.7 Robots meta en root layout `noindex` como fallback

⚠️ `app/layout.tsx:17`: `robots: { index: false }`. Esto es correcto para 404s pero **podría provocar noindex involuntario en cualquier ruta que no esté bajo `[lang]/`**. Las rutas API/sitemap/RSS no se ven afectadas (no son páginas), pero si alguna vez se agrega una ruta en `/algo` fuera de `[lang]`, heredará noindex.

### 13.8 `themeColor` inconsistente

`app/[lang]/layout.tsx:145-149` correcto (export `viewport.themeColor`). Pero `app/[lang]/servicios/inmigracion/page.tsx:42` setea `locale: 'es_MX'` mientras la home usa `es_US`. Pequeñas inconsistencias en OG locale.

### 13.9 `instrumentation-client.ts` documenta bug 2026-05-07

⚠️ El comentario menciona que BotID rompió newsletter y contact form en producción. Está mitigado (opt-in via env), pero deja una landmine para futuro: si alguien activa `NEXT_PUBLIC_BOTID_CLIENT_ENABLED=true` sin verificar config en Vercel Dashboard, los fetches a `/api/lead-capture` y `/api/newsletter/subscribe` se cuelgan indefinidamente.

### 13.10 Console statements

`console.log/error/warn` en 13 archivos, mayoría en `/api/*` (correcto para logging server-side) y en `lib/tracking.ts`, `lib/leadCapture.ts`, `lib/googleReviews.ts`. Cliente: `ShareButtons.tsx`, `ContactFormClient.tsx`, `JoinInClient.tsx` — 4 archivos cliente con console statements (no críticos pero podrían filtrar info en producción).

### 13.11 TODOs detectados

Sólo dos:
- `app/[lang]/admin/AdminHome.tsx:339` — instrucción para nuevos blogs ("busca los comentarios `// TODO:`").
- `app/[lang]/servicios/vawa/vawaData.ts:62` — mayúscula "TODOS" como copy, no es un TODO real.

### 13.12 Secretos commiteados

🔴 **`.env.local` está en el repo** (no en `.gitignore`):

```
GEMINI_API_KEY=<REDACTADO — ROTAR en Google Cloud>
API_SOLIS_TOKEN=<REDACTADO — ROTAR>
NEWSLETTER_BLAST_SECRET=<REDACTADO — ROTAR>
BOS_API_TOKEN=<REDACTADO — ROTAR (Laravel Sanctum)>
RESEND_API_KEY=<REDACTADO — ROTAR en Resend>
GOOGLE_PLACES_API_KEY=<REDACTADO — ROTAR en Google Cloud>
NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_META_PIXEL_ID, NEXT_PUBLIC_TIKTOK_PIXEL_ID (públicos, OK)
```

**Severo**: hay 4 secretos privados (Gemini, BOS API, Resend, Google Places) que parecen estar en el working tree. Verificar si están en `git log` (no se hizo en esta auditoría — instrucciones de solo lectura). El comentario interno del propio archivo indica que BOS_API_TOKEN **debe ser rotado** porque "fue compartido en una conversación de chat".

### 13.13 Imágenes sin alt text

Búsqueda `alt=""`: sólo 2 archivos, ambos legítimos:
- `app/[lang]/layout.tsx:417` — noscript img de Meta Pixel (correcto, tiene `aria-hidden`).
- `app/[lang]/acceso-clientes/AccesoClientesClient.tsx` — un alt vacío, podría ser decorativo (verificar).

### 13.14 Links rotos (estáticos)

No se ejecutó link-checker. Los links internos manejados via `next/link` son seguros (Next falla en build si la ruta no existe en App Router cuando se usa `<Link href="...">` con typed routes — pero typedRoutes no está habilitado aquí).

---

## Sección 14 — Resumen ejecutivo

### Top 5 problemas técnicos más graves

1. **Slugs en español bajo `/en/`** — Las URLs inglesas usan slugs en español (`/en/servicios/inmigracion`, `/en/abogado-inmigracion-houston`, `/en/oficinas/houston-principal`). Esto reduce relevancia para keywords inglesas y daña la coherencia para crawlers anglófonos. Es el mayor punto de fuga de SEO inglés.
2. **Secretos commiteados en `.env.local`** — Gemini API key, BOS API token (marcado para rotar), Resend API key y Google Places API key están en el working tree. Riesgo de seguridad, no SEO, pero impacta el control del stack.
3. **`aggregateRating` hardcoded en landings city×service** — Contradice la política interna anti-hardcoded ratings (Google Spam Policy). 22 landings posibles afectadas — riesgo de manual action en GSC.
4. **Cadencia editorial del blog detenida** — 1 post nuevo en los últimos 12 meses. Para un sitio legal (YMYL) que compite por keywords como "DACA 2026", "TPS 2026", la frescura editorial pesa. La biblioteca de 31 posts es buena base pero sin updates pierde autoridad relativa.
5. **Sin cookie consent / CMP** — GA4 + Meta Pixel + TikTok Pixel se cargan sin gate de consentimiento. Riesgo GDPR/CCPA si parte del tráfico es UE/California, y posible fricción con futuras políticas de Google sobre Consent Mode.

### Top 5 puntos fuertes técnicos

1. **Schema.org muy bien implementado** — `LegalService + LawFirm` orgánico con Google Places live data (24h cache), `Attorney/Person` por abogado, `LegalService + Attorney` por oficina, `BlogPosting` con `author` enriquecido, `FAQPage`, `BreadcrumbList`. Cobertura excepcional para un sitio legal.
2. **Cobertura de redirects legacy excelente** — 200+ reglas 301 cubriendo WordPress legacy, slugs reescritos, English aliases, defunct attorneys, landing pages, social aliases. GSC 404s deberían ser mínimos.
3. **Stack moderno y nativo** — Next.js 16 + App Router + React 19 + Tailwind 4. Metadata API nativa (`generateMetadata` + `alternates.languages`). No depende de paquetes terceros frágiles (next-seo, next-sitemap, next-intl). Mantenimiento alineado con la dirección de Vercel.
4. **Performance bien atendido** — `next/image` con AVIF/WebP, `next/font` con Outfit + `display:swap`, ISR (1h home / 24h layout), Cache-Control inmutable para estáticos, preconnect a tg manager / youtube. Hero con `priority`. No hay `<img>` HTML innecesario.
5. **Local SEO bien estructurado** — 15 oficinas + 22 landings city×service, cada una con schema, NAP, hours, breadcrumbs, link interno cruzado (sibling cities, related services). Google Places API alimentando reviews/ratings de forma legal (server-side, cache, sin fallback hardcoded).

### Recomendación general

**Cambios incrementales**, no rebuild. El stack es sólido y la base SEO está mejor que muchos sitios legales comparables. Las brechas más altas son:

1. **Localización de slugs EN** — proyecto de 1-2 semanas para introducir slug-translation map (manteniendo redirects 301 desde slugs ES bajo `/en/`).
2. **Auditar y limpiar `aggregateRating` hardcoded** de las 22 landings (1 día). Migrar a Google Places o eliminar.
3. **Reactivar cadencia editorial** — 1-2 posts/mes mínimo; auto-update de `lastmod` en sitemap leyendo dates del BLOG_DATA en runtime.
4. **Implementar CMP** (Vercel Marketplace tiene varias opciones; integrar con GA Consent Mode v2).
5. **Rotar secretos comprometidos y mover `.env.local` fuera del repo.**

Los problemas no requieren rearquitectura; son surgery puntual sobre un stack que ya está bien diseñado.
