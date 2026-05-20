# BASELINE.md — manuelsolis.com · Fase 0

> **Captura de baseline previa al proyecto de mejoras** (animaciones, efectos, performance, SEO aditivo).
> Fecha: 2026-05-20 · Branch: `mejoras/fase-0-baseline` · Commit base: `main` (working tree limpio al iniciar).
> Entorno: Windows 11, Node v24.11.1, Next.js **16.1.6 (Turbopack)**, npm.
> **En esta fase NO se modificó código de la app.** Único archivo nuevo: este `BASELINE.md`.

---

## 1. Estado verde inicial (sobre `main`, sin cambios)

| Check | Comando | Resultado | Exit |
|---|---|---|---|
| Type-check | `npx tsc --noEmit` | ✅ **PASA**, sin errores | 0 |
| Lint | `npm run lint` | 🔴 **FALLA** — 506 problemas (**200 errores**, 306 warnings) | 1 |
| Tests | `npm test` (vitest) | ✅ **PASA** — 54 tests / 3 archivos | 0 |
| Build prod | `npm run build` | ✅ **PASA** — compila en 19.0s, 279 páginas generadas en 2.3s | 0 |

### 1.1 Detalle de tests
```
✓ __tests__/leadCapture.test.ts   (32 tests)
✓ __tests__/googleReviews.test.ts (17 tests)
✓ __tests__/seoRedirects.test.ts  ( 5 tests)
Test Files  3 passed (3) · Tests 54 passed (54) · ~5.7s
```

### 1.2 Detalle de lint — **PREEXISTENTE en `main`, NO arreglado en esta fase**
- **200 errores + 306 warnings = 506 problemas.** 1 autofixeable con `--fix`.
- Familias de errores dominantes:
  - `@typescript-eslint/no-explicit-any` (uso de `any`): p.ej. `app/lib/tracking.ts:61-62`, `components/blogs/BlogFeed.tsx`, `CategoryFilter.tsx`, `FeaturedPost.tsx`.
  - `react-hooks/set-state-in-effect` (setState síncrono dentro de `useEffect`): `components/blogs/ShareButtons.tsx:18`, `context/LanguageContext.tsx:38`.
  - Warnings: `no-unused-vars` (imports de iconos sin usar), `react-hooks/exhaustive-deps`.
- ⚠️ **Importante:** `next build` con Turbopack **no corre ESLint**, por eso el build pasa pese a los 200 errores de lint. El gate de lint es independiente del gate de build.
- **Decisión Fase 0:** se registra como deuda preexistente; **no** se corrige aquí. Cualquier fase futura que toque estos archivos debería al menos no empeorar el conteo.

### 1.3 Notas del build
- `▲ Next.js 16.1.6 (Turbopack)` · entorno `.env.local` cargado · experimento `cpus: 4`.
- Fases: *Compiled successfully (19.0s)* → *Running TypeScript* (pasa) → *Collecting page data* → *Generating static pages (279/279) en 2.3s*.
- **Observación a investigar (no bloqueante):** en la tabla de rutas del build **todas** las rutas aparecen marcadas como `ƒ (Dynamic) — server-rendered on demand`, a pesar de que se prerenderizaron 279 páginas. La causa más probable es el fetch por request a Google Places en `app/[lang]/layout.tsx` (`getPlaceData`), que fuerza render dinámico de todo el subtree `[lang]`. Esto tiene implicación de performance/SEO (no hay full static caching en edge salvo ISR). **Solo se documenta; no se toca en Fase 0.**

---

## 2. Baseline de bundle

> ⚠️ **Limitación del toolchain (importante):** con **Next 16 + Turbopack**, `next build` **NO emite** la tabla clásica de *Size / First Load JS por ruta*. Además, **`@next/bundle-analyzer` es incompatible con Turbopack** (el build lo confirma: *"The Next Bundle Analyzer is not compatible with Turbopack builds, no report will be generated"*). Por eso `ANALYZE=true npm run build` **no genera ningún reporte**.
>
> Alternativa nativa que **sí** funciona: **`npx next experimental-analyze`** (genera datos + UI treemap interactiva). Lo corrí y produjo artefactos en `.next/diagnostics/analyze/` (incl. `data/routes.json` y `analyze.data` por ruta), pero el desglose *First Load JS por ruta* solo es legible en su **UI interactiva** (servidor local), no como tabla de texto.
>
> Para suplir esto, medí **los tamaños reales de los chunks en disco** (`.next/static/chunks/*.js`), que es el baseline más fiable y reproducible disponible en este entorno.

### 2.1 Tamaños reales en disco (`.next/static/chunks/`) — **SIN comprimir (raw)**
> Nota: son bytes en disco sin gzip/brotli. En la red, gzip/brotli reduce ~3–4×. Sirven como **baseline relativo** para medir progreso entre fases.

| Métrica | Valor |
|---|---|
| **Total JS estático** | **~2 834 KB (~2.77 MB)** en **85 chunks** |
| Chunk JS más grande | **224.3 KB** (`d0991cefda9911f5.js` → contiene `react-dom`, framework) |
| **CSS global** | **184.9 KB** (`05941a21d599397e.css` → Tailwind/`globals.css`, raw) |
| 2º CSS | 3.4 KB |

**Top 12 chunks JS por peso (raw):**

| # | KB | Chunk | Atribución probable |
|---|---|---|---|
| 1 | 224.3 | `d0991cefda9911f5.js` | react-dom / framework |
| 2 | 114.7 | `6c812bccf0264692.js` | React scheduler + framer-motion |
| 3 | 110.0 | `a6dad97d9634a72d.js` | framer-motion / vendor |
| 4 | 108.5 | `7d6514a90169e63d.js` | vendor / framer-motion |
| 5 | 72.7 | `3d4da74f074c6589.js` | framer-motion (route bundle) |
| 6 | 68.7 | `3a4fae2bdd941372.js` | framer-motion (route bundle) |
| 7 | 67.0 | `198fad5cabeae78a.js` | framer-motion (route bundle) |
| 8 | 63.6 | `0524e482030e2cad.js` | framer-motion (route bundle) |
| 9 | 58.1 | `5fbd4d1e858a6c13.js` | framer-motion (route bundle) |
| 10 | 54.8 | `6be3d23ddc7040cc.js` | framer-motion (route bundle) |
| 11 | 51.8 | `fb70a5ed48fd5f8b.js` | framer-motion (route bundle) |
| 12 | 51.6 | `b09cc98b7e884b01.js` | vendor |

### 2.2 Peso de `framer-motion` (hallazgo #1)
- **48 de 85 chunks** contienen marcadores de framer-motion (`AnimatePresence`, `useMotionValue`, `whileTap`, `VisualElement`).
- Peso combinado de esos chunks: **~1 834 KB** (con duplicación de la librería repartida por casi cada bundle de ruta).
- Causa raíz: **~41% de los `.tsx` son `'use client'`** y casi todas las páginas (servicios, oficinas, abogados, landings, blog) importan `motion` directamente, así que framer-motion entra en el First Load JS de prácticamente todas las rutas.
- `lucide-react`: se tree-shakea por icono (no apareció como chunk monolítico relevante).

### 2.3 First Load JS por ruta — **no disponible automáticamente; cómo obtenerlo manualmente**
La tabla exacta de First Load JS por ruta requiere la UI del analyzer nativo. Comando:
```bash
npx next experimental-analyze
# abre una UI treemap local; ahí se ve First Load JS por ruta y módulos por chunk
```
**Proxy de "rutas más pesadas"** (a falta de la cifra exacta, las rutas con mayor componente cliente — mejor candidato a mayor First Load JS — por tamaño de su `*Client.tsx`/`page.tsx`):

| Ruta | Archivo cliente | Líneas |
|---|---|---|
| `/[lang]/admin/analytics` | `AnalyticsDashboard.tsx` | 1644 *(admin, noindex)* |
| `/[lang]/admin/newsletter` | `AdminClient.tsx` | 1324 *(admin, noindex)* |
| `/[lang]/servicios/accidentes` | `AccidentesClient.tsx` | 963 |
| `/[lang]/servicios/inmigracion` | `ImmigrationClient.tsx` | 920 |
| `/[lang]/servicios/seguros` | `SegurosClient.tsx` | 902 |
| `/[lang]/servicios/defensa-deportacion` | `DeportacionClient.tsx` | 893 |
| `/[lang]/servicios/visa-u` | `VisaUClient.tsx` | 875 |
| `/[lang]/blog/marihuana-dui-...` | `page.tsx` | 925 |
| `/[lang]/blog/daca-2026-...` | `page.tsx` | 887 |
| `/[lang]/servicios/vawa` | `VawaClient.tsx` | 822 |

> ⚠️ Es un **proxy** (tamaño de fuente, no bundle). La cifra autoritativa de First Load JS sale de `next experimental-analyze`.

---

## 3. Baseline de Core Web Vitals (Lighthouse local)

> **Lighthouse SÍ se pudo correr** en este entorno (no estaba instalado → vía `npx -y lighthouse`, usando **Microsoft Edge headless** como navegador, contra `npm run start` en `localhost:3000`).
>
> **Naturaleza de los datos:** son números de **laboratorio local, una sola corrida por ruta**, en una máquina de desarrollo (no son datos de campo/CrUX ni promedios). El throttling es el simulado por defecto de Lighthouse (mobile = Slow 4G + CPU 4×). Hay **varianza entre corridas** (ej.: una corrida en frío de la home dio LCP 8.8s; con el server tibio bajó a ~4.1s). **Úsense como baseline relativo, no como verdad absoluta.** Para cifras de producción, ver §3.3.

### 3.1 MOBILE (form-factor mobile, throttling por defecto)
| Ruta | Perf | FCP (ms) | **LCP (ms)** | TBT (ms) | CLS | SI (ms) | Peso (KB) |
|---|---|---|---|---|---|---|---|
| Home `/es` | 84 | 1210 | 4118 | 164 | 0.001 | 1838 | 1578 |
| Servicio `/es/servicios/inmigracion` | 78 | 1212 | 4438 | 308 | 0.000 | 1985 | 1228 |
| Oficina `/es/oficinas/houston-principal` | 82 | 1211 | 4512 | 149 | 0.000 | 1211 | 1061 |
| Abogado `/es/abogados/manuel-solis` | 85 | 1214 | 3811 | 206 | 0.000 | 2286 | 1078 |
| Landing `/es/abogado-inmigracion-houston` | 92 | 1215 | 2813 | 203 | 0.000 | 1215 | 1026 |
| Blog `/es/blog/daca-2026-estado-legal-tribunales` | 80 | 1361 | 4511 | 224 | 0.030 | 1361 | 1266 |

### 3.2 DESKTOP (preset desktop)
| Ruta | Perf | FCP (ms) | LCP (ms) | TBT (ms) | CLS | SI (ms) | Peso (KB) |
|---|---|---|---|---|---|---|---|
| Home `/es` | 99 | 339 | 823 | 0 | 0.000 | 547 | 1444 |
| Servicio `inmigracion` | 100 | 338 | 821 | 0 | 0.000 | 604 | 1351 |
| Oficina `houston-principal` | 90 | 335 | 2132 | 0 | 0.000 | 546 | 1374 |
| Abogado `manuel-solis` | 100 | 336 | 737 | 0 | 0.000 | 336 | 1390 |
| Landing `abogado-inmigracion-houston` | 100 | 334 | 712 | 0 | 0.000 | 334 | 1332 |
| Blog `daca-2026-...` | 99 | 431 | 884 | 27 | 0.000 | 836 | 1419 |

### 3.3 Lectura del baseline CWV
- **Desktop está casi perfecto** (Perf 90–100, LCP < 1s salvo oficina 2.1s, TBT ≈ 0, CLS 0).
- **El cuello de botella es MOBILE:** LCP **2.8–4.5s** (objetivo "good" < 2.5s) y TBT 150–308ms. La home y servicios son los más castigados.
- **CLS excelente** en todo (≤ 0.001) salvo blog mobile (0.030, aún "good"). No hay problema de layout shift relevante.
- El **peso total transferido (~1.0–1.6 MB)** y el **TBT** mobile son consistentes con el hallazgo de bundle: framer-motion + componentes cliente grandes inflan el JS.

### 3.4 Cómo reproducir las mediciones (para correr tú mismo / en CI)
```bash
# 1) build + server de producción
npm run build
npm run start            # sirve en http://localhost:3000

# 2) Lighthouse (usa Edge si no hay Chrome). En otra terminal:
export CHROME_PATH="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"   # bash/Git Bash
# mobile:
npx -y lighthouse http://localhost:3000/es --only-categories=performance \
  --form-factor=mobile --output=html --output-path=lh-home-mobile.html \
  --chrome-flags="--headless=new --no-sandbox --disable-gpu"
# desktop:
npx -y lighthouse http://localhost:3000/es --only-categories=performance \
  --preset=desktop --output=html --output-path=lh-home-desktop.html \
  --chrome-flags="--headless=new --no-sandbox --disable-gpu"
```
Rutas a medir (las 6 del baseline): `/es`, `/es/servicios/inmigracion`, `/es/oficinas/houston-principal`, `/es/abogados/manuel-solis`, `/es/abogado-inmigracion-houston`, `/es/blog/daca-2026-estado-legal-tribunales`.
> Nota: en Windows, Lighthouse puede arrojar un `EPERM` al limpiar su carpeta temporal **al final** del run — es inofensivo: el reporte ya se escribió. Para datos de **producción real**, usar PageSpeed Insights (CrUX) sobre `https://www.manuelsolis.com/...`.

---

## 4. SEO FREEZE LIST (no tocar sin redirect + aprobación)

### 4.1 Archivos de infraestructura SEO — **congelados**
Cualquier cambio aquí requiere **(a)** plan de 301 si afecta URLs y **(b)** aprobación explícita antes del merge:

| Archivo | Por qué es crítico |
|---|---|
| `proxy.ts` | Routing de locale, normalización 301 (mayúsculas/trailing slash), `noindex` de entornos de prueba, fast-path de crawlers. Afecta **todas** las URLs. |
| `app/lib/seoRedirects.ts` | ~270 redirects 301 (legacy WordPress + normalización de slugs). Preserva link-equity. |
| `app/robots.ts` | robots.txt dinámico (disallow de `/api`, `/admin`; bloqueo de bots IA; ref. sitemap). |
| `app/sitemap.xml/route.ts` | Índice de sitemaps. |
| `app/sitemap-pages.xml/route.ts` | Shard sitemap. |
| `app/sitemap-servicios.xml/route.ts` | Shard sitemap. |
| `app/sitemap-oficinas.xml/route.ts` | Shard sitemap. |
| `app/sitemap-abogados.xml/route.ts` | Shard sitemap. |
| `app/sitemap-landings.xml/route.ts` | Shard sitemap. |
| `app/sitemap-blog.xml/route.ts` | Shard sitemap. |
| `app/sitemap-newsletter.xml/route.ts` | Shard sitemap. |
| `app/lib/sitemapData.ts` | Lógica/datos que alimentan todos los shards (URLs, lastmod, priority). |
| `next.config.ts` (bloques `redirects()` + `headers()` + `images`) | Carga los redirects y el caching/CSP/seguridad. |

### 4.2 Patrón `generateMetadata` (canonical / hreflang) — **congelado por patrón**
En **cada `page.tsx`** que define `generateMetadata`, **no** alterar la forma de:
- `alternates.canonical` → `https://www.manuelsolis.com/{lang}/<ruta>`
- `alternates.languages` → `{ es, en, 'x-default': es }`
- `title`/`description` por idioma, `openGraph.url`.

También congelado el JSON-LD de `app/[lang]/layout.tsx` (`Organization` `LegalService/LawFirm` + `WebSite` + `aggregateRating` desde Google Places) y los schemas por página (`LegalService`, `Person`, `BreadcrumbList`, blog).

### 4.3 Archivos de DATOS que dan de alta rutas / sitemap / `generateStaticParams`
Cambiar un `id`/`slug` aquí **crea o destruye URLs** y puede desincronizar el sitemap → exige 301 + revisión:

| Archivo | Da de alta |
|---|---|
| `app/lib/attorneyData.ts` | 20 perfiles de abogado (`/abogados/[slug]`) + sitemap-abogados. |
| `app/lib/cityServiceData.ts` | 25 landings ciudad×servicio (slugs planos) + sitemap-landings. |
| `app/lib/newsletterData.ts` | 5 ediciones de newsletter (`/newsletter/[slug]`) + sitemap-newsletter + RSS. |
| `app/lib/translations.ts` | Copys ES/EN globales (no rutas, pero su edición masiva impacta todo el sitio). |

### 4.4 Imágenes con nombres frágiles — **NO renombrar ni borrar**
Tienen **espacios** o **mayúsculas** en el nombre; renombrarlas rompe referencias en código y/o caché/SEO de imágenes. **Riesgo ALTO (espacios en el nombre):**
- `public/Roberto Garcia.png`
- `public/offices/Los Angeles.png`
- `public/offices/El paso.png`

**Riesgo MEDIO (mayúsculas):**
- `public/offices/Chicago.png`, `Dallas.png`, `Denver.png`, `Harlingen.png`, `Houston.png`, `League.png`, `Memphis.png`
- `public/Cover_YT.png`, `Crimical_stop.png`, `Familia.png`, `LogoInformacion.png`, `MSTeam.png`, `UniendoFamilias_ManuelSolis.png`, `Voces_ManuelSolis.png`
- `public/state-bar/Chicago-bar.png`
- `public/testimonials/Residencia_Octavio.png`, `YV01.png … YV06.png`

> En general: **ningún archivo de `public/` se renombra ni se borra** durante el proyecto (favicons, OG `home-image.jpg`, heros, logos, blog images, etc. están referenciados por rutas absolutas y/o indexados).

---

## 5. REGLAS DE ORO

> Aplican a **todas** las fases del proyecto de mejoras.

**(a) SEO inmutable sin 301 + aprobación.**
No cambiar **slugs/URLs**, ni `proxy.ts`, ni `seoRedirects.ts`, ni `robots.ts`, ni los `sitemap*.xml/route.ts` / `sitemapData.ts`, ni el patrón de **canonical/hreflang** de `generateMetadata`, sin: (1) un redirect **301** que preserve la URL antigua, y (2) **aprobación explícita** antes del merge. Cambiar un `slug` en `attorneyData.ts` / `cityServiceData.ts` / `newsletterData.ts` cuenta como cambio de URL.

**(b) Assets de `public/` intocables.**
No **renombrar** ni **borrar** imágenes de `public/` (especialmente las de §4.4 con espacios/mayúsculas). Optimizar imágenes se hace **agregando** variantes o vía `next/image`, nunca renombrando los originales referenciados.

**(c) Cada fase cierra en verde + diff contra baseline.**
Antes de pedir merge de cualquier fase:
1. `npx tsc --noEmit` → **0 errores** (igual que baseline).
2. `npm run build` → **exit 0** (igual que baseline).
3. `npm test` → **54/54** (no regresar).
4. Lint: **no aumentar** el conteo de errores (baseline = 200 errores / 306 warnings; idealmente bajarlo).
5. **Diff de baseline:** re-medir bundle (`.next/static/chunks` o `next experimental-analyze`) y CWV (Lighthouse, §3.4) y comparar contra las tablas de §2 y §3. Las mejoras deben **bajar** JS/LCP/TBT sin **subir** CLS ni romper SEO.

---

## RESUMEN — Top 5 cosas que más pesan para performance (según el bundle)

1. **`framer-motion` omnipresente.** Aparece en **48/85 chunks** (~1.83 MB combinados, raw). Es el mayor driver de JS y de TBT mobile. Causa: casi todas las páginas son `'use client'` e importan `motion` directo.
2. **Exceso de Client Components (~41% de los `.tsx`).** Páginas de servicio/oficina/landing/blog son client casi enteras (800–960 líneas) con contenido **bilingüe inline** → duplican ES+EN en el bundle del cliente.
3. **Render dinámico forzado en todo `[lang]`.** El fetch a Google Places en `[lang]/layout.tsx` marca todas las rutas como `ƒ Dynamic` → se pierde el caching estático/edge completo (impacto en LCP/TTFB mobile).
4. **CSS global de ~185 KB (raw).** Un único stylesheet de Tailwind cargado en todas las rutas; candidato a revisión de purga/critical CSS.
5. **LCP mobile alto (2.8–4.5s).** Coherente con 1–3: el hero (imagen `priority` + transforms) y el JS de framer-motion compiten por el main thread; en desktop el problema desaparece (LCP < 1s), confirmando que es **CPU/JS-bound en mobile**, no de red.

---

### Notas operativas de esta fase
- Branch `mejoras/fase-0-baseline` creado desde `main` (working tree limpio). **Solo se añadió `BASELINE.md`** (los logs de build y reportes Lighthouse se generaron en `/tmp` y `.next/`, ambos fuera del control de versiones, y se limpiaron los scratch del repo).
- Servidores de prueba (`npm run start`, `next experimental-analyze`) levantados para medir y **cerrados** al terminar.
- **Aparte:** `CONTEXT_AUDIT.md` de la sesión anterior **no está presente** en el working tree actual (no figura en disco ni en git). Si lo necesitas versionado, avísame y lo regenero — no formaba parte del alcance de esta fase.

*Fin del baseline. No se proponen ni implementan cambios. Con esto, esperando tu aprobación para la Fase 1.*
