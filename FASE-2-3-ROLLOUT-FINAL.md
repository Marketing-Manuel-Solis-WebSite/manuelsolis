# FASE-2-3-ROLLOUT-FINAL.md — Consolidado del rollout visual server-first

> Branch: `mejoras/fase-2-visual` · **Todo LOCAL** (sin push/merge/preview).
> Refresh visual v2 + 3D (CSS) aplicado server-first a **todo el sitio**: Home + las 5 plantillas (servicios, landings, oficinas, abogados, blog, newsletter) + páginas sueltas.

---

## 1. Tabla de plantillas / páginas convertidas

| # | Plantilla | Páginas | Enfoque | Commit |
|---|---|---|---|---|
| — | **Home** | 7 secciones | server-first + v2/3D | `868b94e` |
| — | **Servicios** | 10 + hub | server-first, enfoque (b) | `ca910a2`→`9d4ede0` |
| A→ | **Landings** | 25 (ciudad×servicio) | 1 componente compartido (`CityServiceLanding`) → 25 rutas | `40b279e` |
| A | **Oficinas** | 15 detalle + hub | 1 componente compartido (`OfficePageView`) → 15; isla `TrackedPhoneLink` | `04f2a9e` |
| B | **Abogados** | directorio + 20 perfiles | `AttorneyProfile` server puro; directorio = shell + isla `AttorneysExplorer` | `de016f8` |
| C | **Blog** | feed + 30 posts + 2 categorías | posts YA server (sin tocar); feed enfoque (b); categorías → server; `RelatedContent` `.card-3d` | `de811d6` |
| D | **Newsletter** | hub + 5 ediciones | ya server → pase visual | `51bc8a5` |
| E | **Páginas sueltas** | 15 | 6 → server, 2 ya server, 7 visual/guardas | `c0f158e` |

**Total rutas generadas en build:** 281 páginas estáticas (es+en), 129 entradas de ruta. Todas las rutas `[lang]` de contenido: **● SSG** (blog feed = **● ISR 1h**; hub oficinas = ISR 24h).

---

## 2. First Load JS — acumulado de TODO el rollout (on-disk, bytes raw `.next/static/chunks`)

| Hito | on-disk total | chunks | Δ |
|---|---|---|---|
| **Baseline (Fase 0)** | ~2834.0 KB | 85 | — |
| Home (2.2c) | ~2735 KB | — | −99 KB |
| Servicios (cierre) | 2604.0 KB | — | (acum.) |
| Landings | 2564.4 KB | — | −39.6 |
| Oficinas | 2388.3 KB | — | −176.1 |
| Abogados | 2305.7 KB | — | −82.6 |
| Blog | 2247.5 KB | — | −58.2 |
| Newsletter | 2247.5 KB | — | 0 (ya server) |
| **Páginas sueltas (FINAL)** | **2118.5 KB** | **64** | −129.0 |

**Total: 2834 → 2118.5 KB (≈ −715 KB, −25%) y 85 → 64 chunks (−21).** El driver: sacar framer-motion + contenido bilingüe inline del bundle de casi todas las rutas (eran ~41% client components con ambos idiomas inline) → Server Components + islas de movimiento delgadas + enfoque (b) (idioma inactivo fuera del cliente).

> Nota de método: cifras on-disk raw (sin gzip), comparables entre fases (mismo método que el baseline §2.1). La tabla autoritativa de First-Load-por-ruta no la emite Turbopack (ver BASELINE §2.3).

---

## 3. Confirmación global de FREEZE LIST

**Todas byte-idénticas.** Patrón verificado en cada plantilla:
- **`generateMetadata`** (title/description por idioma, `alternates.canonical`, `alternates.languages` es/en/x-default, `openGraph`) — **sin tocar** en ninguna página.
- **JSON-LD por página** — sin añadir/quitar/alterar: `LegalService`+`FAQPage`+`BreadcrumbList` (servicios/landings), `LawFirm`/`Place`/`Attorney`+`AggregateRating` (oficinas), `Person`+`Breadcrumb` (abogados), `Blog`/`BlogPosting`/`FAQPage`/`Breadcrumb` (blog), `CollectionPage`/`NewsArticle`/`FAQPage`/`Breadcrumb` (newsletter).
- **Patrón de diff de `page.tsx`**: en las conversiones server-first, el `page.tsx` cambió **solo para pasar `lang`** (verificado por `git --numstat`: 1 línea en plantillas de [slug]; las que no awaitaban params añadieron `await params`+`localeLang`). Las páginas con pase visual (hubs, feed, blog posts, sueltas-guarda) no tocaron metadata/JSON-LD.
- **Datos / sitemap**: `attorneyData.ts`, `cityServiceData.ts`, `newsletterData.ts`, `BLOG_DATA` (consumido por newsletter) — **intactos** (slugs/sitemap/RSS sin cambios).
- **Imágenes `public/`**: ninguna renombrada/borrada. Conservadas las frágiles (`offices/Los Angeles.png`, `El paso.png`, `Chicago.png`, `Roberto Garcia.png`, etc.).

Freeze-byte confirmado en HTML servido sobre representativas de cada plantilla (canonical + JSON-LD + contenido server-rendered).

---

## 4. Tendencia de lint (no sube nunca; baja consistentemente)

| Hito | problems | errores | warnings |
|---|---|---|---|
| Baseline | 506 | 200 | 306 |
| Servicios (cierre) | 418 | 153 | 265 |
| Oficinas | 335 | 82 | 253 |
| Abogados | 325 | 78 | 247 |
| Blog | 314 | 71 | 243 |
| Newsletter | 313 | 71 | 242 |
| **Final (sueltas)** | **293** | **57** | **236** |

**−213 problems (−143 errores)** vs baseline — efecto de eliminar client components con `any`/`set-state-in-effect`. Nunca subió en ninguna plantilla (regla de oro (c)).

---

## 5. Gates finales (verde, = baseline o mejor)

| Gate | Baseline | Final |
|---|---|---|
| `tsc --noEmit` | 0 | **0** |
| `npm run build` | exit 0 | **exit 0** (281 páginas) |
| `npm test` | 54/54 | **54/54** |
| lint | 506 | **293** (no sube) |
| rutas `[lang]` | ƒ Dynamic | **● SSG / ISR** |

---

## 6. Páginas representativas a spot-checkear (EN / mobile / reduced-motion)

| Plantilla | Rutas sugeridas |
|---|---|
| Servicios | `/es/servicios/inmigracion`, `/es/servicios/accidentes` (video), `/es/servicios/defensa-deportacion` (FAQ) |
| Landings | `/es/abogado-inmigracion-houston`, `/es/visa-u-los-angeles`, `/es/asilo-politico-houston` |
| Oficinas | `/es/oficinas/houston-principal`, `/en/oficinas/arvada` (Gerencia), `/es/oficinas/northchase` (map fallback), `/es/oficinas/losangeles` (img frágil) |
| Abogados | `/es/abogados` (abrir modales), `/es/abogados/manuel-solis`, `/es/abogados/lupita-valenzuela-martinez` (object-position) |
| Blog | `/es/blog` (**buscador + filtro**), `/es/blog/visa-k1-prometido-requisitos`, `/es/category/derechos-de-migrantes` |
| Newsletter | `/es/newsletter`, `/es/newsletter/abril-2026-actualizaciones-migratorias` |
| Sueltas | `/es/informacion/faq` (respuestas en DOM), `/es/testimonios` (**morph**), `/es/consulta` + `/es/join-in` (**envío de formulario**), `/es/nosotros` |

---

## 7. Páginas con manejo especial / donde NO se hizo conversión completa (flags)

- **Servicios (accidentes, inmigracion-pilot)**: usaron el patrón "iconos en data + isla importa data" (no enfoque (b) puro) por tabs condicionales + video HLS; 1:1 duro. (Lotes A–C posteriores sí (b).)
- **Oficinas / `TrackedPhoneLink`**: isla mínima nueva para no perder el evento de conversión del teléfono. **northchase**: su `mapLink` es placeholder → fallback computado a Google Maps (1:1).
- **Abogados (directorio)**: el grid+modal quedan en isla `AttorneysExplorer` (interactividad real) con datos resueltos a un idioma; cards SSR en el HTML.
- **Blog**: los **30 posts ya eran server-first** → no se tocaron (freeze 100%); el upgrade visual les llegó vía `RelatedContent` compartido. El **feed** sigue isla (search/filter) pero con datos de un solo idioma. `BLOG_DATA` se mantuvo bilingüe (lo consume newsletter).
- **Páginas sueltas (siguen islas cliente por interactividad real, pase visual + orbes estáticos):**
  - **testimonios** — GUARDA: morph `layoutId`+`<LazyMotion domMax>`+`AnimatePresence` (Fase 1A) **intacto**; solo se de-animaron orbes de fondo.
  - **consulta** / **acceso-clientes** — mouse-spotlight (`useMotionValue`/`onMouseMove`) interactivo → isla; `<ContactForm>` de consulta intacto (envío/BotID).
  - **join-in** — GUARDA form (`<form>`/`onSubmit`/`fetch`) intacto.
  - **inversionistas** — header con language-switcher + tabs → isla.
  - **faq** / **recursos** — acordeón → **`<details>` nativo** (respuestas ahora server-rendered en el DOM; FAQPage intacto); sus heros/video siguen client.
- **terminos** / **politica-editorial**: ya eran server-first → sin cambios.

> Ningún gate falló y la freeze list se mantuvo byte-idéntica en todo momento. No hubo blockers que obligaran a parar (las guardas se preservaron por diseño). Donde la conversión a server puro no era limpia/segura (interactividad real woven), se aplicó el pase visual + de-animación de orbes manteniendo la isla — documentado arriba.

---

## 8. Estado y siguiente paso

- **Todo LOCAL** en `mejoras/fase-2-visual`. 12 commits del rollout (Home → sueltas), 1 doc por plantilla + este consolidado.
- **Sin push / merge / preview.** Cuando decidas desplegar, armamos el plan de merge/deploy aparte (incluiría: re-medir CWV con Lighthouse §3.4 del baseline sobre las 6 rutas canónicas, y PageSpeed/CrUX en producción).
- Pendiente (fuera de alcance de este rollout, por diseño): **pase de enriquecimiento SEO** (los JSON-LD se preservaron tal cual, no se ampliaron); enfoque (b) completo en las pocas islas que siguen client por interactividad real (feed blog, consulta/acceso spotlight, inversionistas, faq/recursos heros).

**Rollout visual server-first: COMPLETO.**
