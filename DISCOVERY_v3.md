# DISCOVERY — manuelsolis.com v3.0

**Fecha:** 2026-05-07
**Auditor:** Claude Code (Opus 4.7)
**Alcance:** Fase 0 — Discovery + plan de migración. Solo lectura del repo y producción.
**Repo:** `C:\Users\Carlos Anaya Ruiz\manuelsolis` (Next.js 16.1.6 + Vercel)
**Branch auditada:** `main` @ `0c37f18` con 4 archivos modificados + 4 sin trackear (ver §9.4 — WIP).

---

## 1. Resumen Ejecutivo

### Estado general (semáforo)

| Categoría | Estado | Síntesis |
|---|---|---|
| Stack técnico | 🟢 | Next 16.1.6 + Turbopack, React 19, Tailwind v4, TS strict. Build limpio en 13.3s. 280 páginas estáticas. |
| Arquitectura SEO | 🟢 | Mejor de lo asumido en el prompt original: sitemaps dinámicos custom, hreflang correcto, 270 redirects 301 curados, schema.org rico. |
| i18n | 🟢 | Custom (no `next-intl`), middleware maduro con fast-path para crawlers. Paridad ES/EN buena. |
| Compliance 10DLC/TCPA | 🟢 | Disclaimers SMS comprensivos en EN+ES, double consent, rate limiting por IP. |
| Conversión / UX | 🔴 | Múltiples sangrados activos pre-v3.0 (ver §1.1). Canal #1 (WhatsApp) invisible en producción. |
| Tracking / atribución | 🔴 | Bug grave de UTM defaults contamina reportes históricos cross-canal. |
| Accesibilidad | 🟡 | Skip-to-content, aria-labels, role banner/contentinfo. Falta declaración pública WCAG y `role="dialog"` en popups. |
| Performance estructural | 🟡 | Imágenes AVIF+WebP, cache 1 año, scripts `lazyOnload`, ISR en home. Hero pesado (`priority` + scale 1.65). Datos cuantitativos PSI bloqueados (ver §8). |
| Integración ecosistema Solis | 🟡 | Un único endpoint de lead (`bos.manuelsolis.com/lead/manuelsolis`), naming engañoso (`/api/zapier-contact`), sin HubSpot/Solislead/SOLIS AI directo. |
| Deuda técnica | 🟡 | Middleware deprecado (Next 16.1+), bundle analyzer no wired, IDs hardcoded, `next-sitemap` huérfano, alias TS huérfano, archivos con typos. |

> **Nota corta para el prompt original:** el sitio tiene mejores fundamentos SEO de los que se asumían en el brief inicial — sitemaps dinámicos por shard, hreflang correcto, 270 redirects 301 meticulosamente curados desde reportes de 404 de GSC, schema.org `LegalService/LawFirm` con 10 oficinas. **La estrategia v3.0 debe preservar esto, no reemplazarlo.**

### 1.1 Top 5 hallazgos críticos (P0 — sangrado activo de leads)

1. **🩸 UTM defaults contaminan attribution histórica.** En `app/components/ContactForm.tsx:137-143`, cuando un visitante llega sin UTMs el form envía hardcoded `utm_source: 'SITIO WEB'`, `utm_medium: 'Organico'`, `utm_campaign: 'Directo'`. Esto significa que el bucket "orgánico" en HubSpot y `bos.manuelsolis.com` mezcla orgánico SEO real, directo (typed/bookmark), referrals sin UTM, y paid mistracked. **Toda decisión de attribution cross-canal pre-fix está sesgada.** Fix: 4 líneas, defaults a `(direct)` / `(none)` / `(not set)` (estándar GA4) o `null`. Replicar lógica en `/api/zapier-contact:44-49`.

2. **🩸 WhatsApp button comentado.** En `app/[lang]/layout.tsx:388`: `{/* <WhatsAppButton /> temporalmente oculto — reemplazado por ConsultaFloatingCta */}`. El canal #1 declarado de la firma está invisible en desktop. Fix: descomentar (o decidir oficialmente eliminarlo).

3. **🩸 MobileStickyBar sin WhatsApp.** En `app/components/MobileStickyBar.tsx:39-60`, los dos botones del sticky son `Call` (`tel:+18886761238`) y `Solicitar consulta`. **No hay CTA WhatsApp en mobile** — donde vive el 70%+ del tráfico.

4. **🩸 `botid` instalado pero no integrado.** Paquete `botid@1.5.10` (Vercel BotID) en dependencies, **cero usos** en `ContactForm.tsx`, `api/zapier-contact`, `api/newsletter/subscribe`. Forms abiertos a spam.

5. **🩸 Aggregate rating sospechosa.** `app/[lang]/layout.tsx:110-122` declara `ratingValue: 4.8`, `ratingCount: 12`, `reviewCount: 12` en schema.org. Para una firma con 35+ años y "50,000 casos ganados" en hero, 12 reseñas suena fabricado y abre riesgo legal por bar association advertising rules. Sustituir por sync server-side a Google Places API con cache 24h.

### 1.2 Top 5 quick wins de UX/conversión

1. **Eliminar contaminación UTM** (4 líneas, <30 min, fix #1 anterior).
2. **Restituir WhatsApp** en desktop + sumarlo a mobile sticky bar (~45 min total).
3. **Mover popup hero a exit-intent / scroll 50% / cookie de dismissal** — auto-open en cada page load probablemente está matando bounce rate (ver §4.4).
4. **Integrar `botid` en `ContactForm` + `signup-proxy`** (~30 min, paquete ya instalado).
5. **`fireConversion()` capa de abstracción** sobre los 5 trackers actuales (GA4, Meta, TikTok, Vercel, Flight Check) — reduce drift cognitivo y simplifica auditorías futuras.

---

## 2. Stack Técnico Actual

### 2.1 Framework y runtime

- **Next.js 16.1.6** (Turbopack en build), `package.json` declara `^16.0.7` — instalado más reciente.
- **React 19.2.1**, **TypeScript 5** strict, target ES2017, `moduleResolution: bundler`.
- **Tailwind CSS v4** vía `@tailwindcss/postcss` + `@tailwindcss/forms` + `@tailwindcss/typography`.
- **App Router** exclusivo. No hay `pages/`. Routing locale-prefixed: `app/[lang]/...`.
- **Hosting:** Vercel (cuenta `AdminManuelSolis`). No `vercel.json` ni `vercel.ts` — toda la config en `next.config.ts` y `middleware.ts`.

### 2.2 Dependencias clave (`package.json`)

| Categoría | Paquete | Versión | Estado |
|---|---|---|---|
| AI | `@google/generative-ai` | 0.24.1 | Funcional (`/api/chat`) |
| Email | `resend` + `react-email` | 6.10 / 5.2 | Funcional (newsletter) |
| Email components | `@react-email/components` | 1.0.12 | Funcional |
| UI | `framer-motion` | 12.35 | Uso intensivo |
| Iconos | `lucide-react` | 0.554 | OK |
| Storage | `@vercel/blob` | 2.0 | Configurado en `next.config.ts` (`uenjwzjx3vckezns.public.blob.vercel-storage.com`) |
| Analytics | `@vercel/analytics` + `@vercel/speed-insights` | 1.6 / 1.3 | Activo |
| Bot detection | `botid` | 1.5.10 | **Instalado, NO integrado** (P0 #4) |
| Sitemap legacy | `next-sitemap` | 4.2.3 | **Huérfano** (sitemaps son custom Next 16) |
| Bundle analyzer | `@next/bundle-analyzer` | 16.2.4 | **NO wired up** en `next.config.ts` |

### 2.3 Configuración

- **`next.config.ts`**: redirects desde `app/lib/seoRedirects.ts` (270 entradas), imágenes AVIF+WebP con `qualities: [50,75,82]` y `deviceSizes` capeado a 1920, cache `max-age=31536000, immutable` para `_next/static`, `_next/image`, imágenes en `public/`, fuentes. CSP comprensivo permite `googletagmanager`, `connect.facebook.net`, `analytics.tiktok.com`, `va.vercel-scripts.com`, `generativelanguage.googleapis.com`. HSTS 2 años con preload, X-Frame SAMEORIGIN, X-Content-Type-Options nosniff, Permissions-Policy restrictivo.
- **`middleware.ts`**: 119 líneas. i18n default `es`, dos locales `['en', 'es']`. Detección por cookie `NEXT_LOCALE` → `Accept-Language` → default. Fast-path para crawlers SEO (regex `Googlebot|bingbot|Sitebulb|Screaming Frog|AhrefsBot|SemrushBot|...`). Bloqueo `noindex,nofollow` a `v2.manuelsolis`, `bos.manuelsolis`, `*.vercel.app`. Normalización 301 mayúsculas → minúsculas. Strip de trailing slash. Header `x-locale` propagado al layout. **Build warning:** `The "middleware" file convention is deprecated. Please use "proxy" instead.` (Next 16.1+).
- **`tsconfig.json`**: `paths: { "@/*": ["./src/*"] }` huérfano (no existe `src/`, código vive en `app/`).
- **`eslint.config.mjs`**: `eslint-config-next` con `core-web-vitals` + `typescript`. Ignora `.next/`, `out/`, `build/`, `next-env.d.ts`.
- **`postcss.config.mjs`**: solo `@tailwindcss/postcss`.

### 2.4 Variables de entorno detectadas (en `.env.local`)

⚠️ **Sin `.env.example` en repo.** Riesgo en deploys frescos. Lista de claves vista localmente, agrupadas por servicio:

- **Google Gemini:** `GEMINI_API_KEY`
- **BOS / Lead pipeline:** `API_SOLIS_TOKEN`, `BOS_API_TOKEN` (auto-anotado como "ROTAR — fue compartido en chat")
- **Newsletter blast:** `NEWSLETTER_BLAST_SECRET`, `BLAST_MAX_PER_RUN` (comentado)
- **Email:** `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, `NEWSLETTER_FROM_ADDRESS` (override)
- **Conversiones admin:** `CONVERSIONS_API_KEY` (referenciado en `api/conversions:109` y `api/analytics:42`)

🚨 IDs **hardcoded en código** (deberían ser env vars):
- `app/[lang]/layout.tsx:322` — GA4 `G-V5F8J8QMZ4`
- `app/[lang]/layout.tsx:351` — Meta Pixel `1679590710105917`
- `app/[lang]/layout.tsx:365` — TikTok `CVERFVJC77U9L0C1P6O0`

### 2.5 Build status

`npm run build` corre limpio (exit 0), 13.3s con Turbopack. Genera **280 páginas estáticas** con 4 workers en 433ms. Único warning: deprecación middleware → proxy. Sin warnings de imágenes, fonts, edge runtime ni dependencias deprecated.

**Bundle sizes per route NO disponibles** en Turbopack stdout. `ANALYZE=true npm run build` no produce reporte porque `next.config.ts` no envuelve la config con `withBundleAnalyzer`. Requiere wiring manual.

### 2.6 Tests

`package.json` no tiene scripts de test. No hay carpeta `__tests__/`, ni `vitest.config`, ni `jest.config`. **Cobertura: 0%.**

### 2.7 Git

- Branch principal: `main`. Último commit: `0c37f18 — seis aqjf` (mensajes de commit no descriptivos).
- Frecuencia reciente: 5 commits en los últimos días, todos con mensajes opacos (`seoa ape`, `sesoa fhj`).
- 4 modificados sin commitear + 4 archivos/carpetas sin trackear (ver §9.4).

---

## 3. Mapa del Sitio

Total: **95+ páginas públicas** bajo `app/[lang]/`. 280 páginas físicas tras expansión EN×ES (build report).

### 3.1 Páginas core

- `[lang]/page.tsx` — Home con ISR `revalidate=3600`. Compone `Hero`, `Header`, `About`, `Services`, `Testimonials`, `Team`, `Offices`, `ContactForm`, `Footer`. Todos lazy via `next/dynamic` excepto `Hero` y `Header`.
- `[lang]/nosotros/page.tsx` (+ `NosotrosClient.tsx`)
- `[lang]/testimonios/page.tsx` (+ `TestimoniosClient.tsx`)
- `[lang]/consulta/page.tsx`
- `[lang]/clientes/page.tsx`, `[lang]/clientes-detenidos/page.tsx`
- `[lang]/inversionistas/page.tsx`
- `[lang]/acceso-clientes/page.tsx`
- `[lang]/join-in/page.tsx` (+ `JoinInClient.tsx`)

### 3.2 Servicios (11 páginas)

- `[lang]/servicios/page.tsx` (master) + `inmigracion`, `accidentes`, `seguros`, `ley-criminal`, `familia`, `vawa`, `visa-u`, `visa-e2`, `defensa-deportacion`, `asilo`. La mayoría con un `*Client.tsx` correspondiente.

### 3.3 Oficinas (15 oficinas)

- `[lang]/oficinas/page.tsx` (master) + 15 subrutas: 8 en Texas (`houston-principal`, `houston-bellaire`, `houston-accidentes`, `kirby`, `league-city`, `main-st`, `north-loop`, `northchase`, `dallas`, `el-paso`, `harlingen`), 1 California (`losangeles`), 1 Illinois (`chicago`), 1 Colorado (`arvada`), 1 Tennessee (`memphis`).
- Cada oficina con su `OfficeClient.tsx`.

### 3.4 City × Service landings (18 landings — alto valor SEO)

Cruce práctica × ciudad sin prefijo `servicios/`:
- Inmigración: `abogado-inmigracion-{chicago,dallas,denver,el-paso,harlingen,houston,los-angeles,memphis}` (8)
- Accidentes: `abogado-accidentes-{dallas,houston}` (2)
- Asilo: `asilo-politico-{chicago,houston,los-angeles}` (3)
- Defensa deportación: `defensa-deportacion-{chicago,dallas,el-paso,houston,los-angeles}` (5)
- VAWA: `vawa-{chicago,dallas,houston}` (3)
- Visa U: `visa-u-{chicago,dallas,houston,los-angeles}` (4)

Plantilla compartida: `app/components/CityServiceLanding.tsx` con datos en `app/lib/cityServiceData.ts` y copy local en `cityServiceLocalContent.ts`.

### 3.5 Abogados

- `[lang]/abogados/page.tsx` (índice del equipo)
- `[lang]/abogados/[slug]/page.tsx` (ficha individual). Datos en `app/lib/attorneyData.ts`. **11 slugs defunct** redirigidos a `/abogados` en `seoRedirects.ts:23-35`.

### 3.6 Blog (~30 posts)

- `[lang]/blog/page.tsx` + `[lang]/blog/{slug}/page.tsx`. ~30 posts, todos en kebab-case. Componentes propios: `BlogFeed`, `BlogCard`, `FeaturedPost`, `CategoryFilter`, `SearchBar`, `RelatedContent`, `ReadingProgress`, `ShareButtons`, `BlogSchema`, `BlogTracker`, `BlogBackground`.
- Categorías: `[lang]/category/derechos-de-migrantes` y `[lang]/category/proteccion-legal-para-migrantes`.

### 3.7 Información

- `[lang]/informacion/faq/page.tsx`
- `[lang]/informacion/recursos/page.tsx` (+ `RecursosClient.tsx`)
- `[lang]/informacion/noticias/page.tsx` (+ `NoticiasClient.tsx`)
- `[lang]/informacion/nosotros/page.tsx` (legacy, redirige a `/nosotros` vía `seoRedirects.ts:70`)

### 3.8 Newsletter

- `[lang]/newsletter/page.tsx` — índice público con `CollectionPage` schema y hreflang.
- `[lang]/newsletter/[slug]/page.tsx` — edición individual.
- `app/rss/newsletter/route.ts` — feed RSS.

### 3.9 Legales y políticas

- `[lang]/privacidad/page.tsx` (+ `PrivacidadClient.tsx`)
- `[lang]/terminos/page.tsx` ⚠️ **+ `[lang]/terms/page.tsx`** — duplicado físico (ver §9.3).
- `[lang]/sms-terminos/page.tsx` (+ `SmsTerminosClient.tsx`)
- `[lang]/politica-editorial/page.tsx`

### 3.10 Admin (no indexado)

- `[lang]/admin/page.tsx` + `AdminHome.tsx`
- `[lang]/admin/newsletter/page.tsx` (panel blast)
- `[lang]/admin/analytics/page.tsx` + `AnalyticsDashboard.tsx` (**WIP sin trackear** — §9.4)

### 3.11 Sitemaps + robots

- **Sitemaps son Next 16 native via `route.ts`** (custom XML builder, no `MetadataRoute.Sitemap`):
  - `app/sitemap.xml/route.ts` (índice de 7 shards)
  - `app/sitemap-{pages,servicios,oficinas,abogados,landings,blog,newsletter}.xml/route.ts`
  - Cache `public, max-age=3600, s-maxage=3600`. Builder en `app/lib/sitemapData.ts`.
- **`robots.txt` aún estático** en `public/robots.txt`. Bloquea `/api/`, `/admin`, permite `_next/static`, `_next/image`. Bloquea explícitamente `GPTBot`, `CCBot`, `anthropic-ai`, `ClaudeBot`. Apunta a `https://www.manuelsolis.com/sitemap.xml`.

### 3.12 i18n

Custom (no `next-intl`). Default `es`. Switching vía `LanguageContext` (`app/context/LanguageContext.tsx`) + `LanguageSwitcher` + `LangSetter`. Translations dict en `app/lib/translations.ts` (estructura jerárquica `t.nav.*`, `t.hero.*`, etc.) — **uso mixto**: muchos componentes usan `t.*`, muchos otros inline ternario `language === 'es' ? '...' : '...'` (ej. `Hero.tsx`, `Footer.tsx`, `Header.tsx`). Inconsistencia cognitiva pero funcional.

Paridad ES/EN buena: cada `*Client.tsx` localiza sus strings, hreflang correcto en cada `generateMetadata`, slugs en español sirven a ambos locales (no duplica URL por idioma — solo cambia el prefijo de locale).

---

## 4. Análisis de Conversión

### 4.1 Mapa de CTAs por superficie

| Superficie | CTA primario | CTA secundario | CTA terciario | Tracking |
|---|---|---|---|---|
| Header desktop | Top bar `tel:` (dynamic by office) | `REGÍSTRATE` → `/join-in` | Submenu `Acceso Clientes` | `phone_click` triple-track (Vercel + dataLayer + Flight Check) |
| Header mobile | (Top bar oculto en mobile) | Hamburguesa | Lang switch | — |
| Mobile sticky bar | `tel:+18886761238` (Call) | `Solicitar consulta` → `/consulta` | (none) | `phone_click` + `consulta_click` |
| Floating CTA (≥sm) | `Solicitar consulta` → `/consulta` | (none) | (none) | `consulta_click` |
| WhatsApp button | **🩸 COMENTADO** en layout | — | — | — |
| Hero popup | `tel:` "Soy cliente" | `tel:` "No soy cliente" | "Continuar al sitio" (dismiss) | `phone_click` con labels distintos |
| ContactForm | Submit → `/api/zapier-contact` | (none) | (none) | `form_submit` + `qualified_lead` quintuple-track |
| Footer | NewsletterSignup | 9 nav links | 25 city×service links | (newsletter solo) |

**Análisis:** el embudo está fragmentado en 7 puntos de captura distintos. **WhatsApp**, declarado canal #1, **está comentado en producción**. **Mobile no tiene WhatsApp** en ningún elemento sticky/flotante (hay un `WhatsAppButton.tsx` pero solo se renderiza ≥sm y además está comentado en el layout). **El popup del hero solo está en home** y solo manda a teléfono.

### 4.2 Funnel deducido del código

```
Visitante landing
  └─ Home: Hero + popup auto-abierto (1.5s delay) en home únicamente
       ├─ Click popup "soy cliente" → tel:18886761238 ──┐
       ├─ Click popup "no soy cliente" → tel:18886761238 ┼─→ phone_click registrado
       ├─ Click "Continuar al sitio" → popup dismissed (sin persistencia)
       └─ Scroll → About → Services → Testimonials → Team → Offices → ContactForm → Footer
            └─ ContactForm submit
                 ├─ Validación cliente (acceptedTerms required, no schema)
                 ├─ POST /api/zapier-contact (rate-limit 5/min/IP)
                 │   └─ rewrite payload + finalSource/Medium/Campaign defaults ⚠️
                 │   └─ POST https://bos.manuelsolis.com/lead/manuelsolis (sin headers de auth visibles)
                 ├─ Triple-trigger pixels: fbq Lead + ttq CompleteRegistration + gtag generate_lead
                 ├─ Vercel Analytics track('Contact Form Submit')
                 ├─ dataLayer push form_submit + qualified_lead
                 ├─ Flight Check trackConversion (sendBeacon a /api/conversions)
                 └─ UI: success modal "Enviado con Éxito"
```

### 4.3 Bug crítico de UTM defaults — detalle

**Archivo:** `app/components/ContactForm.tsx:137-156`.

Código actual:
```ts
const utmData = {
    utm_source: rawSource || 'SITIO WEB',
    utm_medium: searchParams.get('utm_medium') || 'Organico',
    utm_campaign: searchParams.get('utm_campaign') || 'Directo',
    utm_content: searchParams.get('utm_content') || '',
    utm_term: searchParams.get('utm_term') || ''
};

let uriToSend = '';
if (typeof window !== 'undefined') {
    const hasParams = searchParams.toString().length > 0;
    if (hasParams) {
        uriToSend = window.location.href;
    } else {
        const baseUrl = `${window.location.origin}${window.location.pathname}`;
        uriToSend = `${baseUrl}?utm_source=SITIO WEB&utm_medium=Organico&utm_campaign=Directo`;
    }
}
```

Y en `app/api/zapier-contact/route.ts:42-49` se REPLICA la misma lógica server-side. Doble defensa contra "vacío", pero ambas inyectan strings literales en lugar de los nulls/centinelas estándar de GA4 (`(direct)`, `(none)`, `(not set)`).

**Implicación de negocio:** todo lead que llega sin UTMs (orgánico real, directo, referral, paid mistracked) acaba en HubSpot/BOS marcado como "SITIO WEB / Organico / Directo". El bucket "Organico" en cualquier reporte cross-canal es un cajón mezcla. **Reportes de attribution históricos pre-fix están sesgados** — orgánico SEO real está inflado por todo lo demás que cae sin UTM.

**Fix:**
1. `ContactForm.tsx:137-143` — cambiar defaults a `null` o a centinelas GA4-style.
2. `api/zapier-contact:42-49` — replicar el cambio para mantener consistencia.
3. Documentar en CHANGELOG / Slack al equipo de marketing que reportes pre-fix tienen sesgo conocido.

### 4.4 ContactForm — auditoría detallada

**Campos:** `first_name`, `last_name`, `phone` (type tel, sin pattern), `email` (type email, sin validación adicional), `enquiry_detail` (textarea), `acceptedTerms` (required), `marketingConsent` (opcional).

**Validación:** solo HTML required + `!formData.acceptedTerms || isSubmitting` para bloquear submit. **Sin Zod, sin React Hook Form, sin schema runtime.**

**Anti-spam:** ❌ ninguno. Sin reCAPTCHA, sin honeypot, sin `botid` (paquete instalado).

**SMS disclaimer:** EN+ES con paridad real (~600 caracteres por idioma). 10DLC compliant. Doble checkbox (terms + marketing) con copy explícito sobre STOP/HELP, frecuencia, tarifas, opt-out. Links a `/privacidad` y `/sms-terminos`. ✅ Sólido.

**Destino del submit:** `/api/zapier-contact` → `https://bos.manuelsolis.com/lead/manuelsolis`. Naming de la ruta es engañoso (no usa Zapier).

**Headers a `bos.`:** solo `Content-Type` y `Accept: application/json`. **No hay header de autenticación enviado** — el endpoint debe estar protegido por algo más (allowlist IP, signed token, header injectado por Vercel). Verificar.

**Console.log en producción:** `route.ts:22, 81, 82, 97, 101` dejan logs descriptivos. Cosméticamente OK pero llenan logs de Vercel. Considerar logger estructurado.

**Tracking del submit:** quintuple — Meta `fbq('track', 'Lead')`, TikTok `ttq.track('CompleteRegistration')`, GA4 `gtag('event', 'generate_lead')`, Vercel `track('Contact Form Submit')`, dataLayer `form_submit` + `qualified_lead`, Flight Check `trackConversion` ×2. Idempotente y blindado.

### 4.5 Hero popup "Detained Relative" — detalle (Ajuste 2)

Component: `app/components/Hero.tsx:262-292`. 6 puntos auditados:

1. **CTAs:** dos `<a href="tel:+18886761238">` con labels distintos para tracking (`detained_popup_client` vs `detained_popup_non_client`). El número es el mismo. **No hay formulario, no hay link a WhatsApp, no hay link a `/clientes-detenidos`.** Botón terciario "Continuar al sitio" cierra el popup vía `setShowPopup(false)`.

2. **Páginas en que aparece:** `Hero` se importa solo en `app/[lang]/page.tsx:3`. **Solo home.** No aparece en service pages, oficinas, blog, ni city-service landings. La página dedicada `[lang]/clientes-detenidos/page.tsx` es independiente.

3. **Trigger:** instantáneo en mount (`useState(true)`), con animación de entrada framer-motion `delay: 1.5s, duration: 0.8s`. **Sin scroll trigger, sin exit intent, sin condicional de viewport, sin sesión.** Aparece pase lo que pase, cada vez que se carga la home.

4. **Persistencia:** ❌ ninguna. `setShowPopup(false)` solo dura la vida de la página. Vuelve a aparecer en próximo page load, refresh, navegación SPA back-to-home. **Penalidad UX para visitantes recurrentes y para usuarios que navegan home → service → home.**

5. **Tracking:** parcial. Sí trackea `phone_click` con label diferenciado en cada botón, pero **no hay evento `popup_open` ni `popup_dismiss` ni `popup_view`**. **Imposible calcular impresiones ni dismiss rate ni CTR con la data actual.** Ver evento + dismiss seguir mediciones que justifiquen mantener o cambiar el componente.

6. **Localización:** ✅ bilingüe completa con paridad ES/EN inline ternario.

**Notas adicionales:**
- Color `bg-red-900/90 + border-red-500/30`. Visualmente alarma — apropiado para emergencia, posiblemente intrusivo en navegación general.
- Posición fixed `top-20 sm:top-24 md:top-32`, right-aligned en desktop, full-width en mobile. **En mobile cubre buena parte del viewport** y se solapa visualmente con el menú hamburguesa.
- Sin `role="dialog"` ni `aria-modal` ni `aria-live`. **Bug a11y** — screen readers no anuncian su aparición.
- Botón "Continuar al sitio" usa `text-red-200/50` con underline tenue. Bajo affordance — el dismiss es difícil de notar y el CTA primario absorbe atención sin opción clara de salida.

### 4.6 WhatsApp — estado actual

- `app/components/WhatsAppButton.tsx` existe, funcional, número `17138557219`, mensaje predeterminado en español: *"Website: ¡Hola! Quisiera saber más sobre cómo puedo regularizar mi situación migratoria en EE.UU. ¿Podrían asesorarme?"*. Tracking triple. Visible solo `≥sm` (oculto en mobile).
- **`app/[lang]/layout.tsx:388`** comentado: `{/* <WhatsAppButton /> temporalmente oculto — reemplazado por ConsultaFloatingCta */}`. **No se renderiza.**
- `MobileStickyBar` reemplaza el botón en mobile pero **sin opción WhatsApp**.

### 4.7 Phone numbers

| Superficie | Default | Override por contexto |
|---|---|---|
| Header top bar (desktop) | `1-888-676-1238` (`officesPhoneMap.ts` `DEFAULT_PHONE`) | Sí — dinámico por slug de oficina (`/oficinas/houston-principal`, `/oficinas/dallas`, etc.) |
| MobileStickyBar | `tel:+18886761238` (hardcoded) | ❌ No — ignora el contexto de oficina |
| Hero popup | `tel:+18886761238` (hardcoded) | ❌ |
| Schema.org contactPoint | `+1-888-676-1238` | (un único número global) |

**Inconsistencia:** el header usa número dinámico por oficina (excelente para attribution local), pero MobileStickyBar y Hero popup ignoran ese contexto y usan el global. En oficinas con números propios (Dallas `(214) 753-8315`, El Paso `(915) 233-7127`, Chicago `(312) 477-0389`, etc.), un usuario móvil que navega a una oficina y toca "Call" en el sticky **llama al global, no a la local**. Pierde fidelidad de attribution geográfica.

### 4.8 Trust signals presentes

- Hero: "50,000 Casos Ganados", "+35 Años de Experiencia", marquee de 6 bar associations (Chicago Bar, Illinois State Bar, NM State Bar, ABA, Puerto Rico Judicial, CD State Bar).
- Footer: 9 nav links + 25 city×service links + RSS feed link.
- Schema.org `aggregateRating: 4.8 / 12 reviews` (sospechoso — ver §1.1 #5) + 3 reviews individuales hardcoded.
- Página `/testimonios` con `TestimoniosClient`.
- Componente `Testimonials.tsx` en home con copy bilingüe.

---

## 5. Análisis UX/UI

### 5.1 Sistema de diseño actual

**`app/globals.css` define tokens explícitos** (Tailwind v4 con `@theme` extensions):

```css
--gold-50:  #FDF8F0
--gold-100: #F9EDD8
--gold-200: #F0D9A8
--gold-300: #E5C17A
--gold-400: #D4A94E
--gold-500: #B2904D  ← usado intensivamente en CTAs/acentos
--gold-600: #96773E
--gold-700: #7A5F30

--surface-glass:    rgba(255,255,255,0.03)
--surface-elevated: rgba(255,255,255,0.06)
--border-subtle:    rgba(178,144,77,0.15)
--border-muted:     rgba(255,255,255,0.08)
```

**Utilidades custom:** `.glass`, `.glass-elevated`, `.glass-gold`, `.gradient-mesh`, `.gradient-mesh-dark`. Comentario aspiracional en CSS: *"Apple/Stripe/Linear level visual quality"*.

**Paleta operacional:**
- Azul marino base: `#001540` (background dominante), `#001026`, `#000510`, `#000814`, `#0b1c33` (variantes)
- Dorado: `#B2904D` (acción) + `#D4AF37`, `#F9E79F`, `#cbb06d` (variantes)
- Rojo emergencia: `red-900/90` (popup detained), `red-500` (alertas)
- Blanco/sky: `#fff`, `sky-200/30`, `blue-100/70` (texto)

**Tipografía:** una sola familia — **Outfit** vía `next/font/google` (`subsets: ['latin']`, weights `300/400/500/600/700`, `display: swap`). Variable CSS `--font-outfit`. Stack fallback robusto. **No hay segunda fuente** (serif/display). Altura jerárquica vista: H1 `text-2xl sm:text-5xl`, números hero `text-[10rem]`, body `text-sm sm:text-base`.

### 5.2 Density y mobile-first

- Hero `min-h-screen` con padding generoso. **En mobile el popup sobre el hero compite por espacio vertical** y reduce el área visible del CTA principal.
- ContactForm con padding `p-5 sm:p-8 md:p-12` y `max-w-5xl` — denso pero legible.
- Header `lg:flex` con submenús — en mobile usa `Sheet`-like fullscreen overlay.
- City×Service cluster en footer: 25 links en grid `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`. **A primera vista para SEO crawlers, no para UX humano.**

### 5.3 Accesibilidad

| Item | Estado | Detalle |
|---|---|---|
| Skip-to-content | ✅ | `app/layout.tsx:32-37` link `#main-content` con `focus:not-sr-only` |
| `<html lang>` dinámico | ✅ | Set vía `x-locale` header desde middleware |
| Roles semánticos | ✅ | `role="banner"` (header), `role="contentinfo"` (footer), `role="alert" aria-live="assertive"` (form modal) |
| ARIA labels | 🟡 | Inputs sí (`aria-label`, `aria-required`). Botones móviles algunos sin `aria-label` (`Header.tsx:457`). |
| Foco visible | ✅ | Tailwind base + custom focus rings dorados |
| Contraste | 🟡 | Dorado `#B2904D` sobre azul `#001540`: contraste ~4.6:1, justo por encima de AA. Texto `text-blue-200/40` para copyright en footer: bajo contraste, falla AA. |
| `role="dialog"` en popups | ❌ | Hero popup no tiene `role="dialog"`, ni `aria-modal`, ni focus trap |
| Declaración WCAG pública | ❌ | No existe `[lang]/accesibilidad/page.tsx` ni link en footer |
| `prefers-reduced-motion` | ❌ | Framer-motion + CSS keyframes sin respetarlo |

### 5.4 Carga percibida

- **Skeletons** definidos para los componentes lazy en home (`<div className="w-full h-[600px] bg-[#001540]" />`). Buena práctica.
- **Hero NO es lazy** — se carga inmediatamente con `priority` en la imagen `manuelsolisl.png`.
- **`Header` se renderiza DESPUÉS del Hero** en el JSX (`page.tsx:93-94`). Estructuralmente raro pero visualmente OK porque Header es `fixed`.

### 5.5 Microinteracciones

`framer-motion` usado en: `Header`, `Footer`, `Hero`, `ContactForm`, `WhatsAppButton`, `ConsultaFloatingCta`, `MobileStickyBar`, varios `OfficeClient`, `*Client` de servicios, blog components. **Uso intensivo**. Cada componente tiene sus propios `Variants` locales — no hay biblioteca de motion tokens compartidos. Riesgo: drift estilístico al escalar el sistema de diseño.

---

## 6. SEO Snapshot

### 6.1 Sitemap y robots

- Sitemap **dinámico** (cache 1h) vía Next 16 native `route.ts`:
  - Índice: `app/sitemap.xml/route.ts`
  - 7 shards: `pages`, `servicios`, `oficinas`, `abogados`, `landings`, `blog`, `newsletter`
- **Robots ESTÁTICO** en `public/robots.txt`. Bloquea `/api/`, `/admin`, `_next/data`, `_next/server`, `private`. Permite explícitamente `_next/static`, `_next/image`. Bloquea bots IA (`GPTBot`, `CCBot`, `anthropic-ai`, `ClaudeBot`).
- Apunta a `https://www.manuelsolis.com/sitemap.xml`.

### 6.2 Schema.org

| Tipo | Ubicación | Estado |
|---|---|---|
| `LegalService + LawFirm` | `app/[lang]/layout.tsx:22-123` (organizationSchema) | ✅ Rico — 10 oficinas con `PostalAddress` + telephone, sameAs sociales (FB/Twitter/LinkedIn/IG/YouTube), `knowsAbout` 24 entradas, `hasOfferCatalog` 8 servicios, `numberOfEmployees: 50`, `aggregateRating` (sospechoso §1.1 #5), 3 reviews hardcoded |
| `WebSite` | `app/[lang]/layout.tsx:125-137` | ✅ |
| `BreadcrumbList` | Generado dinámico via `app/lib/breadcrumbSchema.ts` | ✅ |
| `BlogPosting` / `Article` | `app/components/blogs/BlogSchema.tsx` | ✅ |
| `CollectionPage` | `app/[lang]/newsletter/page.tsx:60-79` | ✅ |
| `FAQPage` | No detectado en `[lang]/informacion/faq/` | 🟡 Verificar y agregar |
| `Attorney` (por abogado individual) | `app/[lang]/abogados/[slug]/page.tsx` | Pendiente verificar |
| `LocalBusiness` por oficina | Pendiente verificar |
| `VideoObject` | Removido del layout (comentario explícito), debería estar en `/testimonios` | Pendiente verificar |

### 6.3 Hreflang y canonical

- **Hreflang:** correcto. `alternates.languages` con `es`, `en`, `x-default: es` en cada `generateMetadata` que lo declara (verificado en `[lang]/page.tsx:34-40`, `[lang]/newsletter/page.tsx:28-34`).
- **Canonical:** declarado per-page en `alternates.canonical` (no en layout — comentario explícito en `[lang]/layout.tsx:288-289` sobre evitar herencia).
- **Content-Language header** propagado por middleware (`middleware.ts:85, 94, 106`).

### 6.4 Redirects históricos

`app/lib/seoRedirects.ts` — **270 entries permanentes (`permanent: true`)**. Categorías cubiertas:

- Blog slug normalization (underscore/CamelCase → kebab) — 19 redirects
- WordPress core paths (`wp-admin`, `wp-content`, `wp-json`, `xmlrpc.php`, feeds, author, pagination, tags) — ~20
- English aliases EN→ES (`/about`, `/services`, `/contact`, `/attorneys`, etc.) — ~30
- FAQ legacy paths
- News/noticias/proteccion-legal/derechos-de-migrantes/proceso-migratorio/requisitos-de-visas → blog
- Category legacy
- `/areas-servicio/*`, `/service-areas/*`, `/legal-areas/*` (3 idiomas históricos × 30 slugs = ~80)
- Old service slugs (windstorm, tornado, hailstorm, planificacion-patrimonial)
- Standalone visa pages
- Office legacy slugs (15 redirects)
- Attorney legacy + 11 defunct attorneys
- Privacy/terms/recursos variants
- Landing page templates (Google/FB ad URLs)
- Lead-qualification pages
- Thank-you pages
- Social aliases (`/youtube`, `/facebook`, `/instagram`, `/tiktok`)
- QR/brochure URLs

**Calidad:** alto — claramente curado desde reportes GSC de 404. Documenta el origen ("Google Search Console reported ~1,030 URLs as 'Not found (404)'"). Es un **activo crítico de la migración v3.0** — no debe perderse, no debe replicarse, debe heredarse intacto.

### 6.5 Internal linking

- Footer: 25 city×service links (excelente cluster SEO).
- Header: dropdown con 15 oficinas + 6 servicios + 3 informaciones. Buena profundidad.
- Blog: `RelatedContent` y `blogRelations.ts` cruzan posts entre sí.
- Páginas de práctica → oficinas: existe pero no auditado en profundidad.

### 6.6 Riesgos SEO de la migración v3.0

| Riesgo | Severidad | Mitigación |
|---|---|---|
| Pérdida de redirects 301 | 🔴 Alto | Heredar `seoRedirects.ts` íntegro. Test automático que verifique entries no se eliminan accidentalmente. |
| Cambio de slugs ES → EN | 🔴 Alto | NO cambiar slugs en v3.0. Mantener `terminos`, `oficinas`, `servicios`, etc. |
| Pérdida de hreflang/canonical | 🟠 Medio | Migración debe incluir contract test que valide cada `generateMetadata` retorna `alternates.canonical` y `alternates.languages`. |
| Cambio de jerarquía de URLs | 🟠 Medio | Mantener estructura `/[lang]/{servicios,oficinas,abogados,blog,informacion,...}`. |
| Cambio de schema.org `LegalService` | 🟡 Bajo | Refinar pero no eliminar campos. Sustituir `aggregateRating` por sync Google Places. |

---

## 7. Compliance Status

### 7.1 10DLC (SMS) — ✅ Sólido

- `ContactForm.tsx:286-321` — disclaimer comprensivo en 2 bloques (general + marketing opt-in), bilingüe paridad real.
- `Footer.tsx:166-174` — disclaimer secundario al pie de página.
- Página dedicada `[lang]/sms-terminos` con `SmsTerminosClient.tsx`.
- Double consent: `acceptedTerms` (required para submit) + `marketingConsent` (separado, opcional).
- Lenguaje correcto: "STOP" para opt-out, "HELP" para asistencia, frecuencia variable, tarifas estándar, no condición para servicios.
- Links correctos a `/privacidad` y `/sms-terminos`.

### 7.2 TCPA — ✅ Sólido

- Consent explícito antes del submit.
- "Standard messaging and data rates may apply" presente.
- Lenguaje "voluntarily providing your phone number and explicitly opting in to text messages" — explicit consent estándar.

### 7.3 Bar association advertising — 🟡 Parcial

- Disclaimers "Not legal advice", "Past results do not guarantee future outcomes", "Attorney advertising" — **no detectados en footer ni en service pages**. Pendiente verificación exhaustiva por página.
- Schema.org con `aggregateRating: 4.8/12 reseñas` para una firma con 50.000 casos suena fabricado y abre riesgo bajo bar advertising rules. Sustituir por sync Google Places (§10.5).

### 7.4 Cookies / Privacy — 🟡 Parcial

- Página `[lang]/privacidad/page.tsx` existe con `PrivacidadClient.tsx`.
- **Sin banner de consentimiento de cookies visible** en el código del layout. Si la audiencia incluye visitantes de la UE / California (CCPA), requiere consent banner. Texas/Illinois/Tennessee: menos crítico pero bar associations cada vez piden best-effort.
- CSP estricto + Permissions-Policy reducen vectores, pero no sustituyen consent banner.

### 7.5 Accesibilidad — 🟡 Parcial (ver §5.3)

- Sin declaración pública WCAG.
- Sin `role="dialog"` en popups.
- Sin respeto a `prefers-reduced-motion`.
- `text-blue-200/40` (footer copyright) por debajo de AA.

### 7.6 Bilingüe legal — ✅

Todos los disclaimers SMS/TCPA están en EN y ES con paridad real (no traducción casual). La página `/privacidad` y `/sms-terminos` tienen `*Client.tsx` que respetan locale. Términos: dos rutas físicas (`/terminos` ES y `/terms` EN) — ver §9.3.

---

## 8. Performance Baseline

### 8.1 Estado de las mediciones

⚠️ **Datos cuantitativos PSI BLOQUEADOS** — Google PageSpeed Insights API rechaza llamadas anónimas en burst desde la misma IP (HTTP 429 en 12 llamadas paralelas + 1 secuencial). Carlos generará API key de Google Cloud Console (free tier 25.000 requests/día) y se ejecutarán las mediciones en sesión de validación post-discovery.

**URLs candidatas a auditar (mobile + desktop) cuando haya API key:**
- `https://www.manuelsolis.com/es`
- `https://www.manuelsolis.com/en`
- `https://www.manuelsolis.com/es/servicios/defensa-deportacion`
- `https://www.manuelsolis.com/es/servicios/visa-u`
- `https://www.manuelsolis.com/es/servicios/asilo`
- `https://www.manuelsolis.com/es/oficinas/houston-principal`
- (Opcional adicional) una city×service landing como `/es/visa-u-houston` y un blog post top.

**Comando con key:**
```
GET https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={URL}&strategy=mobile&category=performance&key={API_KEY}
```

### 8.2 Bundle sizes

⚠️ **NO disponibles** — dos razones simultáneas:

1. Turbopack (Next 16.1.6) omite la columna "First Load JS" del output estándar de `next build`.
2. `@next/bundle-analyzer` está instalado en `package.json` (devDeps `^16.2.4`) **pero no wired up en `next.config.ts`**. `ANALYZE=true npm run build` corre limpio pero NO produce reporte (`.next/analyze/` no existe). Falta envolver la config con `withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })`.

Wiring de 4 líneas en `next.config.ts`:
```ts
import withBundleAnalyzer from '@next/bundle-analyzer';
const bundleAnalyzer = withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });
export default bundleAnalyzer(nextConfig);
```

Después: `ANALYZE=true npm run build` → reportes `client.html` + `nodejs.html` + `edge.html` en `.next/analyze/`.

### 8.3 Indicios estructurales cualitativos

**Lo bueno:**
- Imágenes: `next/image` enforced, AVIF+WebP forzados (`next.config.ts:10`), `qualities: [50, 75, 82]` (sin variantes 100 inútiles), `deviceSizes` capeado a 1920 (sin 2048+).
- Cache: `max-age=31536000, immutable` para `_next/static`, `_next/image`, imágenes `public/`, fuentes (woff/woff2/ttf/otf).
- Fonts: `next/font/google` con `display: swap`, `subsets: ['latin']`, weights `300/400/500/600/700`.
- Scripts third-party: `lazyOnload` strategy en GA4, Meta Pixel, TikTok Pixel.
- Preconnect/dns-prefetch a `googletagmanager`, YouTube, FB, TikTok en `[lang]/layout.tsx:302-306`.
- ISR en home con `revalidate=3600`.
- Lazy import de `About`, `Services`, `Testimonials`, `Team`, `Offices`, `ContactForm` con skeletons.
- CSP comprensivo + HSTS 2 años con preload.

**Lo sospechoso:**
- Hero `manuelsolisl.png` con `priority` + `scale-110 sm:scale-125 lg:scale-[1.65]` + `drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]`. Imagen probable LCP candidate, escalada visualmente arriba de su tamaño nativo, con drop shadow costoso.
- Marquee CSS `animation: marquee-scroll 35s linear infinite` con triplicación de items (`marqueeItems = [...associations, ...associations, ...associations]`). Animación puramente CSS (bien) pero el elemento es siempre visible al cargar.
- Framer-motion en muchos componentes. Sin auditoría de bundle imposible saber si la dependencia entera se carga inicialmente o si el `m`-import (lighter) se está usando.
- Pixels de Meta + TikTok aún con `lazyOnload` cargan ~50-100KB combinados de JS third-party.
- 3 scripts JSON-LD inline en cada page (organizationSchema ~5KB, websiteSchema ~0.5KB, breadcrumbSchema ~0.5KB) — coste menor pero visible.
- Hero `min-h-screen` con popup auto-abierto: bloqueo visual al primer paint.

### 8.4 Recomendaciones de perf (cualitativas)

| # | Acción | Impacto esperado | Esfuerzo |
|---|---|---|---|
| 1 | Wire up `@next/bundle-analyzer` en `next.config.ts` y correr `ANALYZE=true` | Visibilidad del bundle real | <15 min |
| 2 | Optimizar `manuelsolisl.png` — bajar peso, evitar `scale-[1.65]` server-side, generar variantes pre-escaladas | LCP −300/600ms | 30-60 min |
| 3 | Considerar replace de `framer-motion` por CSS animations en componentes simples (`MobileStickyBar`, `ConsultaFloatingCta`) | Bundle −30/80KB | 1-2 h |
| 4 | Audit `prefers-reduced-motion` en framer y CSS keyframes | A11y + perf usuarios sensibles | 1-2 h |
| 5 | Defer Meta/TikTok pixels post-interaction si no son críticos para Lookalike pre-conversion | LCP/TBT mejor | 30 min |
| 6 | Migrar `robots.txt` estático a `app/robots.ts` (consistency con sitemaps) | 0 perf impact, deuda técnica | 15 min |

---

## 9. Pain Points Detectados

### 9.0 Hotfix recomendado pre-v3.0 (P0 — sangrado activo)

**Estos NO esperan a v3.0. Son fixes pequeños que recuperan leads esta semana.** PR aparte.

| # | Hallazgo | Archivo:línea | Fix | Esfuerzo |
|---|---|---|---|---|
| 1 | UTM defaults contaminan attribution | `ContactForm.tsx:137-156` + `api/zapier-contact:42-49` | Cambiar defaults a `null` o centinelas GA4 (`(direct)`, `(none)`, `(not set)`) | 15 min |
| 2 | WhatsApp button comentado en layout | `app/[lang]/layout.tsx:388` | Descomentar (decisión: mantener vivo) | 5 min |
| 3 | MobileStickyBar sin WhatsApp | `app/components/MobileStickyBar.tsx:34-63` | Agregar tercer botón WhatsApp + reordenar jerarquía | 30 min |
| 4 | `botid` instalado pero no integrado | `ContactForm.tsx`, `api/zapier-contact`, `api/newsletter/subscribe` | Wrap con `botid` middleware | 30 min |
| 5 | Aggregate rating hardcoded (12 reseñas) | `app/[lang]/layout.tsx:110-122` | **Deferido a Fase 4** — requiere Place IDs de Google Business (Carlos los pasa en sesión dedicada). En Fase 1: solo agregar `// TODO: Fase 4 — sync con Google Places API` para dejar trazabilidad | 5 min en Fase 1 / 2-3 h en Fase 4 |

**Nota crítica sobre #1:** los reportes de attribution históricos pre-fix (HubSpot, GA4, BOS) están sesgados — el bucket "Organico/SITIO WEB/Directo" mezcla orgánico real, directo, referrals sin UTM y paid mistracked. Cualquier decisión de marketing pre-fix debe revalidarse con la lente de este sesgo.

### 9.1 P1 — In-scope v3.0, alta prioridad

| # | Hallazgo | Archivo:línea | Notas |
|---|---|---|---|
| P1.1 | Naming engañoso del endpoint de leads | `app/api/zapier-contact/route.ts:4` | Renombrar a `/api/lead-capture` o `/api/leads`. Documentar contrato del payload (campos enviados, headers, formato JSON). En v3.0 se reemplaza la URL destino por el endpoint de Solislead manteniendo el contrato. |
| P1.2 | IDs de analytics hardcoded | `app/[lang]/layout.tsx:322, 351, 365` | Migrar a `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_TIKTOK_PIXEL_ID`. Crear `.env.example`. |
| P1.3 | Migración middleware → proxy | `middleware.ts` (toda la file) | Next 16.1+ deprecó la convención `middleware.ts` a favor de `proxy.ts`. Rename + update doc. |
| P1.4 | `robots.txt` estático | `public/robots.txt` | Migrar a `app/robots.ts` con MetadataRoute API (consistency con sitemaps que ya son nativos). |
| P1.5 | Sin declaración WCAG pública | (no existe) | Crear `app/[lang]/accesibilidad/page.tsx` con statement. Agregar link en footer. |
| P1.6 | Sin banner de cookies | (no existe) | Implementar consent banner mínimo (CCPA-aware al menos para California). |
| P1.7 | Tracking fragmentado en 5 capas | `Header`, `ContactForm`, `WhatsAppButton`, etc. | Capa de abstracción `fireConversion(type, label, meta?)` que internamente fanout a Vercel + GA4 + Meta + TikTok + Flight Check. Reduce drift. |
| P1.8 | `aggregateRating` hardcoded | `app/[lang]/layout.tsx:110-122` | Resuelto por hotfix 9.0 #5. |
| P1.9 | Sin tracking de popup (open/dismiss) | `Hero.tsx:262-292` | Agregar `pushToDataLayer('popup_open')` y `popup_dismiss` para poder evaluar el componente. |
| P1.10 | Phone hardcoded en MobileStickyBar y Hero popup ignora `officesPhoneMap` | `MobileStickyBar.tsx:9`, `Hero.tsx:278, 282` | En oficinas con número local, mobile + popup deben usar el local. |

### 9.2 P2 — In-scope v3.0, bajo esfuerzo

| # | Hallazgo | Archivo:línea | Notas |
|---|---|---|---|
| P2.1 | tsconfig path alias huérfano | `tsconfig.json:25-29` | `"@/*": ["./src/*"]` — código vive en `app/`. Cambiar a `./app/*` o eliminar. |
| P2.2 | Filename con doble punto | `app/components/ServiceCategory..tsx` | Renombrar. |
| P2.3 | Páginas duplicadas terminos / terms | `app/[lang]/terminos/page.tsx`, `app/[lang]/terms/page.tsx` | `seoRedirects.ts:121-122` redirige `/:lang/terms` a `/:lang/terminos`, pero `/[lang]/terms/page.tsx` existe físicamente y se sirve. Verificar precedencia y eliminar la duplicada. |
| P2.4 | `next-sitemap` paquete huérfano | `package.json:24` | Sitemaps son custom `route.ts` ahora. Remover dependencia. |
| P2.5 | `@next/bundle-analyzer` no wired | `next.config.ts` | Wrap config con `withBundleAnalyzer`. 4 líneas. |
| P2.6 | Console.log en producción | `api/zapier-contact:22, 81-82, 97, 101` | Considerar logger estructurado o silenciar. |
| P2.7 | Mensajes de commit no descriptivos | git log | `seis aqjf`, `seoa ape`, etc. — adoptar convención conventional commits. |
| P2.8 | Sin tests automáticos | (no existe) | 0 tests. v3.0 mínimo: tests de redirects + smoke tests del payload de lead. |
| P2.9 | Mixed i18n usage | `Hero`, `Footer`, `Header` inline ternario vs `t.*` desde `translations.ts` | Decidir convención única en v3.0 y refactorizar. |
| P2.10 | Sin `prefers-reduced-motion` | global | Auditar framer + CSS keyframes. |

### 9.3 Decisión de negocio

**Hero popup "Detained Relative" (`Hero.tsx:262-292`)** — auditoría completa en §4.5. Tres opciones para v3.0 sin recomendación todavía:

- **Opción A — Eliminar:** quitar el popup completamente. Recuperar el viewport del hero. Confiar en el sticky bar mobile y los CTAs explícitos. Resolver "familiar detenido" con la página existente `/clientes-detenidos` y un banner sticky con menos fricción si fuera necesario.
- **Opción B — Cambiar trigger:** mantener el popup pero cambiar a exit-intent (desktop) o scroll 50% (mobile), agregar persistencia en localStorage (`detained_popup_dismissed_at` con TTL 7 días) para no repetir en visitantes recurrentes.
- **Opción C — Mantener auto-open + mejorar:** dejar auto-abierto pero (1) agregar tracking de `popup_open` y `popup_dismiss` para poder medir; (2) mejorar `aria-modal`/`role=dialog` para a11y; (3) agregar opción WhatsApp además de tel; (4) considerar reducir intrusividad visual; (5) link al menos uno de los CTAs a `/clientes-detenidos` en lugar de los dos al mismo número de teléfono.

Decisión pendiente con Carlos. Datos requeridos para decidir bien: CTR del popup, dismiss rate, y conversion rate downstream — actualmente no medibles.

### 9.4 WIP sin commitear (in-scope per Carlos)

**Cohesivo: feature única de "Flight Check" + dashboard admin.** Estado: ~80% terminado, internamente consistente.

#### Modificados (`M`)

1. **`app/[lang]/layout.tsx`** — agrega `<PageViewTracker />` envuelto en `<Suspense>`. Wiring del tracking nuevo. Funcional. Depende de `PageViewTracker.tsx` (sin trackear).
2. **`app/api/conversions/route.ts`** — refactorizado. POST acepta los 6 event types, valida, recorta strings, registra IP/UA/país, delega a `analyticsStore`. GET resumen con bearer token. Funcional. Depende de `app/lib/analyticsStore.ts` (sin trackear).
3. **`app/lib/tracking.ts`** — lib client-side. Helpers UTM, sessionId con timeout 30 min, device detection, `trackConversion` y `trackPageView` vía `sendBeacon`, `pushToDataLayer`. Funcional, bien construido. Ya consumido por `Header`, `ContactForm`, `WhatsAppButton`, `MobileStickyBar`, `ConsultaFloatingCta`, `Hero`, `PageViewTracker`.
4. **`app/[lang]/admin/AdminHome.tsx`** — agrega `ToolCard` que apunta a `/${lang}/admin/analytics`. Si la carpeta `admin/analytics/` no se commitea, el link es 404 en deploy fresco.

#### Sin trackear (`??`)

5. **`app/components/PageViewTracker.tsx`** — client component. Dispara `trackPageView()` en pathname/searchParams change. Excluye `/api`, `/admin`, `.xml`, `.txt`. Funcional. Depende de `tracking.ts`.
6. **`app/lib/analyticsStore.ts`** — almacén in-memory en `globalThis`. Cap 20.000 eventos, retención 90 días. API: `pushEvent`, `listEvents`, `eventCount`, `filterEvents`. Documenta explícitamente que es per-instancia y se pierde con cold starts. **Arquitectónicamente: Flight Check, no canónico**. No es un bug, es una decisión.
7. **`app/api/analytics/route.ts`** — endpoint GET protegido (cookie admin con fallback bearer key). 553 líneas. Entrega payload completo para dashboard: KPIs, deltas, series temporales con buckets, breakdowns por type/source/medium/campaign/content/device/lang/country, source×medium, referrers, top paths con bounce y conversion rate, funnel, heatmap día×hora, raw paginada. Todo computado en memoria desde `analyticsStore`. Funcional.
8. **`app/[lang]/admin/analytics/`** — 2 archivos:
   - `page.tsx` — server page protegida. Si no hay sesión, renderiza `AdminLogin`. Reusa `auth.ts` del newsletter admin.
   - `AnalyticsDashboard.tsx` — UI cliente que consume `/api/analytics`. Tipos del payload completos.

**Decisión confirmada con Carlos:** el storage queda como Flight Check (Opción A). En sección 10.6 se propone Vercel KV como upgrade opcional P2 para persistir entre cold starts (no obligatorio v3.0).

---

## 10. Recomendaciones para v3.0

### 10.1 Stack propuesto — continuidad evolutiva

**Mantener:**
- Next.js 16.x (migrar a `proxy.ts` cuando salga 17, por ahora con warning), React 19.x, Tailwind v4, TypeScript strict.
- i18n custom existente. **No migrar a `next-intl`.** Middleware actual está maduro y los crawlers ya están blindados.
- `@vercel/blob`, `@vercel/analytics`, `@vercel/speed-insights`.
- `resend` + `react-email`.
- `framer-motion` (con auditoría de uso para reducir bundle si bundle analyzer lo justifica).
- `lucide-react`, `botid`.
- `seoRedirects.ts` íntegro como inventario maestro.

**Agregar:**
- `@next/bundle-analyzer` wired up.
- `withBundleAnalyzer` wrapper en `next.config.ts`.
- Cliente HTTP a Solislead (reemplaza `bos.manuelsolis.com/lead/manuelsolis` con interfaz documentada).
- Capa de abstracción `fireConversion()`.
- `app/robots.ts` nativo (eliminar `public/robots.txt`).
- Banner de cookies/consent (CCPA-aware mínimo).
- Página `[lang]/accesibilidad/page.tsx`.
- Tests mínimos: contract tests de `seoRedirects.ts` y de payload de leads.

**Eliminar de la propuesta original del prompt:**
- ❌ Supabase (ya hay `@vercel/blob` y el WIP analytics queda como Flight Check).
- ❌ `next-intl` (migración destructiva sin beneficio claro).
- ❌ `shadcn/ui` (ya hay design system propio funcional).
- ❌ HubSpot SDK directo (la integración pasa por Solislead → SOLIS AI hub, no directa desde el frontend).
- ❌ `next-sitemap` (paquete huérfano — limpiar de `package.json`).

**Decisión arquitectónica explícita:** v3.0 es **refactor evolutivo dentro del stack actual**, no migración cross-stack. Esto preserva el SEO acumulado, reduce el riesgo de regresiones, y enfoca el esfuerzo en lo que mueve la aguja: UI/UX de conversión + integración Solislead + hotfixes P0.

### 10.2 Arquitectura de información

**Preservar 100% de URLs y jerarquía actual.**
- Mantener `[lang]/{servicios,oficinas,abogados,blog,informacion,...}`.
- Mantener city×service landings con sus slugs actuales (`vawa-houston`, `visa-u-chicago`, etc.).
- Mantener `[lang]/oficinas/{slug}` con sus 15 oficinas físicas.
- Mantener categorías `[lang]/category/{slug}`.

**Limpiezas puntuales:**
- Resolver duplicado `terminos/` vs `terms/` (P2.3) — una canónica + 301 desde la otra.
- Sumar `[lang]/accesibilidad/page.tsx` (P1.5).

**Sin cambios destructivos. Cero pérdida de equity de link.**

### 10.3 Sistema de diseño

**Punto de partida:** los tokens existentes en `app/globals.css` (paleta gold + glass + gradient mesh + Outfit) son una **base sólida de evolución**. La paleta operacional `#001540 + #B2904D` es coherente con el branding histórico de la firma.

**Documentar formalmente el design system actual** en `app/lib/design-tokens.ts`:
- Paleta gold extendida (50-700)
- Paleta navy (`#001540` y variantes)
- Tipografía (Outfit weights, escala fluid)
- Espaciado (scale Tailwind)
- Radii (rounded-lg, rounded-2xl, etc.)
- Shadows (incluyendo `shadow-3xl` custom de WhatsAppButton)
- Motion tokens: durations, easings, distances comunes (estandarizar lo que hoy está duplicado en cada `Variants` local de framer-motion)

**Evolución, no ruptura:**
- Refinar densidad y jerarquía visual del hero — bajar el peso del "50,000" gigante en mobile, asegurar que el CTA se ve sin scroll en viewports comunes (375×667, 390×844).
- **Mantener Outfit como única familia tipográfica en v3.0.** Tiene weights 300-700 cargados, suficiente para jerarquía display + body usando `font-weight` y `letter-spacing`. Agregar una serif/display sumaría ~30KB críticos al LCP y complejidad de fallbacks. Evaluar segunda fuente (Spectral, Fraunces) solo en Fase 6 si métricas de UX lo justifican, con `font-display: optional` para no bloquear render.
- Microinteracciones más sobrias en componentes secundarios. Mantener calidez emocional de la firma — no caer en estética cripto/tech distante.
- Hero: reducir intrusividad del popup + fix LCP del retrato de Manuel.

**Referencias visuales fuera del nicho legal:**
- Stripe (jerarquía limpia, tipografía respirada)
- Linear (microinteracciones precisas)
- Notion (densidad informacional sin caos)

**Referencias dentro del nicho legal (qué hacer / qué evitar):**
- Spar & Bernstein — buena trust signaling, mucho text-heavy
- Curbelo Law — CTAs claros mobile-first
- Catholic Legal Immigration Network — tono compasivo (modelo emocional para textos)
- FORM Immigration — diseño moderno pero frío
- Berardi Immigration — denso visual, evitar

### 10.4 Estrategia de conversión

#### Hotfixes pre-v3.0 (ver §9.0)

UTM bug, WhatsApp visible, botid en forms, aggregate rating real.

#### Mobile sticky bar rediseñado

```
[ WhatsApp (verde) ]  [ Call (oro) ]  [ Consulta (azul) ]
   primario             secundario       terciario
   tracking:            tracking:        tracking:
   whatsapp_click       phone_click      consulta_click
                        (con office-aware phone)
```

Tres botones equidistantes con hierarquía visual de color. Todos con `aria-label` correctos. Reordenar tras data: si WhatsApp domina, mover Call a hamburguesa.

#### ContactForm rediseñado

- Validación con Zod runtime (mantener React Hook Form opcional o vanilla — decidir tras prototipo).
- Progressive disclosure: paso 1 solo nombre + teléfono + idioma, paso 2 detalles del caso. Reduce abandono mobile.
- Campo opcional "área de práctica" pre-poblado por la URL (si llega de `/visa-u-houston` → `practice_area: 'visa-u'`, `office: 'houston'`).
- Sumar `gclid` y `fbclid` al payload (hoy no se capturan).
- Botid integrado.
- UTM defaults corregidos.
- Spinner accesible con `aria-busy`.

#### Capa de abstracción `fireConversion()`

```ts
// app/lib/conversion.ts
type ConversionType = 'phone_click' | 'whatsapp_click' | 'consulta_click' |
                      'form_submit' | 'qualified_lead' | 'popup_open' | 'popup_dismiss';

export function fireConversion(
  type: ConversionType,
  label: string,
  meta?: Record<string, string>,
) {
  // 1. Vercel Analytics
  track(`${type}.${label}`, meta);
  // 2. dataLayer (GTM → GA4)
  pushToDataLayer(type, { event_label: label, ...meta });
  // 3. Meta Pixel (mapa interno por type)
  fireMetaPixel(type, label, meta);
  // 4. TikTok (mapa interno por type)
  fireTikTokPixel(type, label, meta);
  // 5. Flight Check
  trackConversion(type, label);
}
```

Reemplaza la duplicación actual en 7+ componentes. Reduce drift cognitivo y simplifica auditorías.

#### Hero popup — A/B/C

Decisión pendiente con Carlos basada en tracking nuevo (P1.9). Implementar tracking primero, decidir después con datos.

#### Lead routing transparente

Migración de `bos.manuelsolis.com/lead/manuelsolis` → endpoint Solislead.

**Contrato actual del payload** (deducido de `api/zapier-contact`):
```json
{
  "name": "string", "first_name": "string", "last_name": "string",
  "phone": "string", "email": "string",
  "enquiry_detail": "string (con sufijo |Fuente:X si fuente != SITIO WEB)",
  "acceptedTerms": 0|1, "marketingConsent": 0|1,
  "uri": "string (URL completa o limpia)",
  "language_preference": "es|en",
  "source": "string", "utm_source": "string",
  "medium": "string", "utm_medium": "string",
  "campaign": "string"
}
```

**Contrato propuesto v3.0** (envío único a Solislead, mismo payload + sumas):
```json
{
  // ...todo lo anterior...
  "utm_content": "string|null",
  "utm_term": "string|null",
  "gclid": "string|null",
  "fbclid": "string|null",
  "page_url": "string (canonical)",
  "practice_area_inferred": "string|null (de la URL)",
  "office_inferred": "string|null (de la URL)",
  "session_id": "string (msl_sid)",
  "device_type": "mobile|tablet|desktop",
  "country": "ISO-2 (de Vercel)"
}
```

Localización del cliente HTTP: `app/lib/leadCapture.ts`. Retry exponencial + circuit breaker básico. Logging estructurado.

#### Trust signals reforzados

- AggregateRating real desde Google Places (P0 #5).
- Insertar `reviewBody` real (no hardcoded) en pages de oficinas usando `LocalBusiness` schema por oficina.
- Sumar badges de bar associations en service pages, no solo hero.
- Casos de éxito numéricos por área de práctica (e.g. "1.247 visas U ganadas" si los datos lo soportan).

### 10.5 Estrategia SEO de migración

**Cero cambios destructivos. Cero pérdida de rankings.**

1. **Heredar `seoRedirects.ts` íntegro.** Test automático: contract test que valide que el array tiene N entries (donde N = el count actual).
2. **Mantener slugs ES.** No cambiar `terminos`, `oficinas`, `servicios`, ni los slugs city×service.
3. **Conservar hreflang/canonical** en cada `generateMetadata`. Test automático: cada page con `generateMetadata` debe declarar `alternates.canonical` y `alternates.languages`.
4. **Migrar `robots.txt` a `app/robots.ts`** (P1.4).
5. **Sumar schemas faltantes:**
   - `FAQPage` en `[lang]/informacion/faq`.
   - `LocalBusiness` por oficina en `[lang]/oficinas/{slug}`.
   - `Attorney` por abogado en `[lang]/abogados/{slug}`.
6. **`aggregateRating` real** vía Google Places API (P0 #5).
7. **Internal linking refinado**: cruzar service pages → oficinas relacionadas, cruzar blog posts → service pages relevantes.
8. **Submit a GSC** del nuevo sitemap si cambia el host de servidor (no debería cambiar — mismo Vercel project).

### 10.6 Recomendación opcional P2 — Vercel KV para Flight Check

**Estado actual:** `analyticsStore.ts` es in-memory por instancia, se pierde con cold starts. Para Flight Check (no canónico) está bien.

**Upgrade opcional:** subir storage a **Vercel KV** (no Postgres, no Upstash standalone — Vercel KV es Upstash bajo el capó pero integrado nativamente).

```ts
// app/lib/analyticsStore.ts (v3.0 opcional)
import { kv } from '@vercel/kv';

export async function pushEvent(event: StoredEvent) {
  await kv.lpush('flight-check:events', JSON.stringify(event));
  await kv.ltrim('flight-check:events', 0, 19999); // cap 20.000
}

export async function listEvents(): Promise<StoredEvent[]> {
  const raw = await kv.lrange('flight-check:events', 0, -1);
  return raw.map((s) => JSON.parse(s));
}
```

**Beneficio:** persistencia cross-cold-start sin tocar arquitectura.
**Costo:** trivial (free tier 30k requests/día, $0.20/100k después).
**Esfuerzo:** ~30 min wiring + verificar Marketplace integration.
**Bloqueante para v3.0:** ❌ No. Si no se hace, queda como ahora — Flight Check per-instancia.

---

## 11. Plan de Fases Propuesto

Estimación en sesiones de Claude Code (donde "sesión" = ~1-3 horas de trabajo del modelo + revisión humana entre cada una).

### Fase 0 — Discovery (esta sesión) ✅
Producto: este documento. **Estado: completado.**

### Fase 1 — Hotfixes P0 (1 sesión)
Branch separado, PR aparte, no requiere v3.0. Productos: UTM fix, WhatsApp visible (mobile + desktop), `botid` en forms, `popup_open`/`popup_dismiss` tracking. **Esfuerzo: ~3 h.**

### Fase 2 — Foundation v3.0 (1 sesión)
Branch `v3.0-base`. Productos:
- Crear `.env.example` y migrar IDs hardcoded.
- Wire up `@next/bundle-analyzer` y producir baseline de bundles.
- Migrar `middleware.ts` → `proxy.ts`.
- Migrar `robots.txt` → `app/robots.ts`.
- Crear `app/lib/design-tokens.ts` documentando lo existente.
- Crear `app/lib/conversion.ts` con `fireConversion()`.
- Eliminar `next-sitemap` y `tsconfig` alias huérfano.
- Renombrar `ServiceCategory..tsx`.
- Resolver duplicado terminos/terms.

**Esfuerzo: ~3-4 h. Deploy a preview, no a producción todavía.**

### Fase 3 — Lead pipeline a Solislead (1 sesión)
- `app/lib/leadCapture.ts` con retry + logging estructurado.
- Renombrar `api/zapier-contact` → `api/lead-capture`.
- Documentar contrato del payload v3.0.
- Test contract en CI.
- Coordinar con backend Solislead para confirmar endpoint.

**Esfuerzo: ~3 h, bloqueada por confirmación de Solislead endpoint + auth.**

### Fase 4 — Refactor de tracking + Google Places sync (1-2 sesiones)
- Migrar 7+ componentes al `fireConversion()` unificado.
- Sumar tracking de popup.
- Test de tracking determinista en preview.
- **Sync `aggregateRating` y reviews con Google Places API** (server-side, cache 24h vía `next: { revalidate: 86400 }` o `unstable_cache`). Reemplaza íntegro el `aggregateRating` hardcoded + los 3 reviews del schema. **Bloqueada hasta que Carlos pase Place IDs de las oficinas.**

**Esfuerzo: ~4-5 h.**

### Fase 5 — Refactor mobile sticky bar + ContactForm + Hero popup (2 sesiones)
- Sticky bar con WhatsApp + Call (office-aware) + Consulta.
- ContactForm con Zod + progressive disclosure + gclid/fbclid + practice_area inferida.
- Hero popup: implementar opción elegida tras 2 semanas de data del tracking nuevo.
- A11y: `role="dialog"`, focus trap, `prefers-reduced-motion`.

**Esfuerzo: ~5-6 h.**

### Fase 6 — Refinamiento UI/UX (2-3 sesiones)
- Revisión de cada service page con design tokens.
- Hero LCP fix: optimizar `manuelsolisl.png`, evitar scale-up gigante server-side.
- Banner de cookies/consent.
- Página `accesibilidad`.
- Schemas faltantes (`FAQPage`, `LocalBusiness`, `Attorney`).
- Internal linking refinado.

**Esfuerzo: ~6-8 h.**

### Fase 7 — QA, validación, lanzamiento (1 sesión + revisión humana)
- PSI mobile + desktop con API key (post-fix).
- Lighthouse en CI.
- Contract tests pasados.
- Revisión human de paridad ES/EN.
- Soft launch en preview, validación cross-browser.
- Promote a producción.

**Esfuerzo: ~4 h modelo + 4-8 h validación humana.**

**Total v3.0: ~7-9 sesiones de Claude Code, distribuidas en 3-4 semanas calendario** asumiendo 2-3 sesiones/semana con tiempo de validación humana entre fases.

---

## 12. Riesgos y Mitigaciones

| # | Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|---|
| R1 | Pérdida de redirects 301 → caída SEO | Baja | 🔴 Crítico | Heredar `seoRedirects.ts` íntegro. Contract test que valide count de entries. |
| R2 | Cambio accidental de slugs ES → EN | Baja | 🔴 Crítico | NO tocar slugs. Política explícita en CLAUDE.md de v3.0. |
| R3 | Migración middleware → proxy rompe i18n | Baja | 🟠 Alto | Test smoke en preview cubriendo: `/`, `/es`, `/en`, `/Servicios` (uppercase), `/blog/page/2`, crawler UA |
| R4 | Endpoint Solislead no listo / contrato desconocido | Media | 🟠 Alto | Bloquear Fase 3 hasta confirmación. Mantener `bos.manuelsolis.com` como fallback feature-flagged. |
| R5 | Refactor de tracking pierde alguna pixel | Media | 🟠 Alto | Test e2e en preview verificando `dataLayer`, `fbq`, `ttq` por evento. |
| R6 | Optimización del hero rompe LCP en algunos viewports | Baja | 🟡 Medio | A/B test con Vercel Analytics antes de promover. |
| R7 | Botid bloquea usuarios legítimos | Baja | 🟡 Medio | Modo `report-only` en producción durante 1 semana antes de blocking. |
| R8 | UTM fix rompe reportes downstream que asumen `'SITIO WEB'/'Organico'/'Directo'` | Media | 🟡 Medio | Comunicar con marketing antes del fix. Documentar fecha exacta del cambio para forensics. |
| R9 | Banner de cookies aumenta bounce rate | Media | 🟡 Medio | Implementar minimal/dismissible, no full modal blocker. |
| R10 | Sync Google Places API expone API key client-side | Baja | 🔴 Alto | Implementar server-side via Route Handler con cache 24h. Nunca client-side. |
| R11 | Vercel KV opcional aumenta costo de runtime | Baja | 🟢 Bajo | Free tier suficiente (30k req/día). Si excede, downgrade a in-memory. |
| R12 | Cambio de design system rompe SEO de páginas con copy denso | Baja | 🟠 Alto | NO tocar copy en v3.0 — solo presentación. Refactor de copy es Fase posterior. |

---

## 13. Preguntas Abiertas para Carlos

Antes de empezar Fase 1 (hotfixes), necesito decisión/confirmación de:

1. **API key de PSI** — confirmar que la genero yo (Carlos) y la paso en sesión post-discovery. Hasta entonces, sección 8 queda cualitativa.
2. **Endpoint Solislead** — ¿hay docs internas con URL, payload schema, headers de auth, retry policy? ¿O tengo que coordinar con el equipo backend de Solislead antes de Fase 3?
3. **Hero popup** — implementamos el tracking primero (P1.9, ~30 min) y decidimos en 2 semanas con datos? ¿O tienes opinión clara ya entre A/B/C?
4. **WhatsApp en MobileStickyBar** — si lo agrego, ¿con qué jerarquía visual? ¿WhatsApp primario / Call secundario / Consulta terciario? ¿O Consulta sigue siendo primario?
5. **Office-aware phone en mobile/popup** — ¿confirmamos que cuando el usuario está en `/oficinas/dallas` el botón mobile debe llamar al número Dallas y no al global?
6. **`aggregateRating` real** — ¿tengo luz verde para implementar sync con Google Places (P0 #5)? ¿Cuáles son los Place IDs de las 10-15 oficinas en Google Business?
7. **Banner de cookies (P1.6)** — ¿elegimos un proveedor (Cookiebot, Iubenda, OneTrust) o lo construimos custom minimal?
8. **HubSpot contract** — ya quedó claro que la integración pasa por backend (Solislead → SOLIS AI hub → HubSpot). ¿Confirmamos que el frontend NO debe hablar directo con HubSpot?
9. **Branding v3.0** — segunda fuente para titulares: ¿adopto recomendación (Spectral / Fraunces) o pasamos brand guidelines existentes?
10. **Tests automáticos** — ¿adoptamos Vitest + Playwright en v3.0 o lo posponemos a Fase posterior? Mi recomendación es mínimos (contract test de redirects + smoke test de payload de leads) en Fase 2.
11. **Convención de commits** — ¿adoptamos conventional commits para v3.0? Los actuales (`seoa ape`, `seis aqjf`) hacen difícil seguir el historial.
12. **Place IDs / Google reviews** — los 12 reviews actuales hardcoded en schema.org: ¿los preservamos como histórico o los reemplazamos íntegros por Google Places sync?

---

## Cierre

**Documento producido por Claude Code (Opus 4.7) bajo flujo de discovery autorizado por Carlos. Cero cambios en producción durante la auditoría. Solo lectura del repo + 1 ejecución local de `npm run build` (autorizada).**

Próximo paso por defecto: PR de hotfixes P0 (Fase 1) si Carlos confirma. Si Carlos quiere otro orden o prioridad, este doc se actualiza en una sesión separada antes de comenzar Fase 1.

---
