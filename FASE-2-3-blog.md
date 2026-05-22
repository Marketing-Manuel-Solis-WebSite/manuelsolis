# FASE-2-3-blog.md — Rollout plantilla BLOG (feed + 30 posts + 2 categorías)

> Branch: `mejoras/fase-2-visual` · **Todo LOCAL** (commit; sin push).

## Tarea 1 — inspección (reporte) — HALLAZGO IMPORTANTE
- **Los 30 posts `/blog/[slug]` YA eran Server Components.** Cada `page.tsx` (`export default async function`) resuelve `lang` de params y renderiza `blogContent[lang]` **server-side**, con islas pequeñas para lo interactivo (`ShareButtons`, `ReadingProgress`, `BlogTracker`, `RelatedContent`, `BlogBackground`). No usan framer en el page.tsx ni `useLanguage`. → **server-first + (b) ya cumplido**; el contenido bilingüe inline vive en el módulo server (no llega al cliente). El schema **BlogPosting/Article + FAQ + BreadcrumbList** está en cada `page.tsx` (vía `BlogSchema`/`Script`).
- **Feed `/blog`**: `page.tsx` server (exporta `BLOG_DATA`, JSON-LD Blog+Breadcrumb) → `BlogFeed` **cliente** (search + category filter, genuinamente interactivo). Recibía `initialPosts` **bilingües** → ambos idiomas viajaban en el payload.
- **2 categorías `/category/*`**: `*Client.tsx` **presentacionales puros** (textos bilingües inline + `useLanguage`, sin estado) → conversión limpia a Server Component.

## Tarea 2 — conversión

### Posts (30) — sin cambios por archivo
Ya server-first → **no se tocó ningún `page.tsx` de post** (freeze 100%: contenido + BlogPosting/FAQ/Breadcrumb intactos). El upgrade visual les llega vía el componente compartido `RelatedContent`.

### `RelatedContent` (compartido, 30 posts) — pase visual
Grid de relacionados: `m.div` por card → `Stagger`/`StaggerItem` + **`.card-3d`**. Una edición → las 30 grids de relacionados. El tracking de teléfono del CTA (`pushToDataLayer`/`trackConversion`) **conservado** (sigue en la isla cliente).

### Feed `/blog` — enfoque (b) + visual
- `page.tsx`: **resuelve a un idioma** `resolvedPosts`/`resolvedCategories`/`resolvedUiText` y los pasa a `BlogFeed` → el idioma inactivo ya no viaja. **`BLOG_DATA` queda bilingüe intacto** (lo consume `app/lib/newsletter/blogIndex.ts`). JSON-LD Blog + Breadcrumb **byte-idénticos**.
- `BlogFeed` (sigue isla — search/filter): interfaz a strings de un idioma; hero **estático (LCP)**; toolbar plano; destacado en `Reveal`; grid en `Stagger`; lógica de filtrado idéntica (compara strings resueltos).
- `BlogCard` + `FeaturedPost`: **server-renderables, single-locale**, `.card-3d` (FeaturedPost mantiene `priority`). `CategoryFilter`: interfaz `{id,label}`. `SearchBar`: sin cambios (placeholder por `lang`).

### Categorías (2) — Server Components puros
`DerechosMigrantesClient` + `ProteccionLegalClient`: `'use client'`/`useLanguage`/`framer Variants` fuera; reciben `lang`; textos resueltos en servidor (b). Orbes + palabra de fondo (`DERECHOS`/`LEGAL`) **estáticos**; hero estático (LCP); grid `Stagger`+`StaggerItem` con **`.card-3d`**. Datos `texts` (artículos) **byte-idénticos**. `page.tsx` de cada una: threadea `lang`.

## Validación

### Gates (verde)
| Gate | Resultado |
|---|---|
| `tsc --noEmit` | **0 errores** |
| `npm run build` | **exit 0** (281 páginas) |
| `npm test` | **54/54** |
| lint | **314 (71 errores / 243 warnings)** — bajó desde 325; **no sube** |
| rutas | feed **● ISR (1h)** · 2 categorías **● SSG** · 30 posts **● SSG** (es+en) |

### Freeze list
- **Posts (30)**: 0 cambios en sus `page.tsx` → BlogPosting/FAQ/Breadcrumb + contenido intactos.
- **Feed `page.tsx`**: diff = solo el cuerpo del render (datos resueltos + props de `BlogFeed`); `git diff` no toca ninguna línea de `canonical`/`generateMetadata`/`Script`/`@type`/`JSON.stringify` → JSON-LD Blog+Breadcrumb byte-idénticos.
- **Categorías `page.tsx`**: solo threadean `lang` (`generateMetadata`/canonical intactos).

### Freeze-byte en HTML servido
- `/es/blog`: canonical correcto; cards **SSR** en el HTML (DACA 2026, Visa K-1, "Noticias de Inmigración"). `/en/blog`: "Immigration News", "Latest Articles", "Featured Article" ✓.
- `/es/blog/visa-k1-prometido-requisitos`: **BlogPosting** schema + contenido ("Visa K-1 de prometido") + "Articulos Relacionados" (RelatedContent) presentes ✓.
- `/es/category/derechos-de-migrantes`: "Biblioteca Legal", "Derechos de Migrantes", títulos de artículo en el HTML ✓.

### First Load JS (on-disk, bytes raw de `.next/static/chunks`)
| Métrica | Valor |
|---|---|
| antes (post-abogados) | 2305.7 KB |
| después | **2247.5 KB (−58.2 KB)** · 72 chunks |

El idioma inactivo del feed salió del payload; `BlogCard`/`FeaturedPost` ya no arrastran framer (entrada delegada al `Stagger` del feed); las 2 categorías dejaron de ser cliente.

### Imágenes
Sin cambios (imágenes de blog en `public/blog/*` + retrato del autor).

### Manejo especial / notas
- **Posts ya server-first** (hallazgo): el grueso del blog (y lo SEO-crítico) no requería conversión — solo el pase visual compartido vía `RelatedContent`.
- **`BLOG_DATA` intacto** (lo consume el módulo de newsletter) — la resolución a un idioma se hace en una variable nueva del feed.
- **Schema del feed** (`Blog`/`Breadcrumb`) se inyecta vía `next/script` (igual que antes); byte-idéntico.

---

**PARO — cierre de plantilla blog.** Spot-check sugerido: `/es/blog` (probar **buscador** y **filtro de categoría** — interactividad), `/en/blog`, `/es/blog/visa-k1-prometido-requisitos` (post + relacionados), `/es/category/derechos-de-migrantes`, `/en/category/proteccion-legal-para-migrantes`. EN / mobile / reduced-motion. Continúo **autónomo** con la siguiente plantilla: **D. NEWSLETTER** (hub + 5 `[slug]`).
