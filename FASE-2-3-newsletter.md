# FASE-2-3-newsletter.md — Rollout plantilla NEWSLETTER (hub + 5 ediciones)

> Branch: `mejoras/fase-2-visual` · **Todo LOCAL** (commit; sin push).

## Tarea 1 — inspección (reporte)
- **Hub `/newsletter`** y **`[slug]` (5 ediciones de `newsletterData.ts`)**: **YA eran Server Components** (`export default async function`, sin `'use client'`, sin framer, sin estado). Resuelven `lang`/`slug` en servidor y renderizan el contenido server-side, con `NewsletterSignup` (isla cliente de suscripción) como única parte interactiva. JSON-LD en cada `page.tsx`: hub = `CollectionPage`+`Breadcrumb`; edición = `NewsArticle`+`FAQPage`+`Breadcrumb`.
- → server-first ya cumplido. La conversión es **pase visual** (como los hubs de servicios/oficinas).

## Tarea 2 — conversión (solo pase visual)
- **Hub**: grid de "Ediciones Anteriores" → `Stagger`/`StaggerItem` + **`.card-3d`** en cada `<article>`; heading en `Reveal`. Hero **estático (LCP)**. `NewsletterSignup` intacto.
- **`[slug]`**: las secciones del cuerpo (prosa con borde dorado, no cards) → `Stagger`/`StaggerItem` (`as="article"`) para entrada en cascada; **sin `.card-3d`** (es prosa, no grid). Hero estático. `NewsletterSignup` (banner) intacto.
- **Primitivas extendidas** (cambios mínimos, no rompen nada): `StaggerItem` admite `as="article"`; `Reveal` admite `as="h2"|"h3"`.
- **`newsletterData.ts` NO se tocó.** **RSS (`/rss/newsletter`) intacto.**

## Validación

### Gates (verde)
| Gate | Resultado |
|---|---|
| `tsc --noEmit` | **0 errores** |
| `npm run build` | **exit 0** |
| `npm test` | **54/54** |
| lint | **313 (71 errores / 242 warnings)** — bajó desde 314; **no sube** |
| rutas | hub **● SSG** · 5 ediciones **● SSG** (es+en) · `/rss/newsletter` presente |

### Freeze list
- Hub + `[slug]` `page.tsx`: `git diff` no toca ninguna línea de `canonical`/`generateMetadata`/`Script`/`@type`/`JSON.stringify` → **CollectionPage/NewsArticle/FAQPage/Breadcrumb byte-idénticos**. Solo cambió el cuerpo del render (wrappers de motion).

### Freeze-byte en HTML servido
- `/es/newsletter`: canonical correcto; "Ediciones Anteriores" + cards server-rendered ✓.
- `/es/newsletter/abril-2026-actualizaciones-migratorias`: **HTTP 200**, **7 bloques `application/ld+json`** en el HTML (NewsArticle/FAQ/Breadcrumb de la página + schemas del layout), contenido server-rendered. `/en/...`: HTTP 200, "All editions" ✓.

### First Load JS (on-disk)
| Métrica | Valor |
|---|---|
| antes (post-blog) | 2247.5 KB |
| después | **2247.5 KB (sin cambio)** · 72 chunks |

Esperado: las páginas ya eran server (no había código cliente que quitar); solo se añadieron islas de motion que comparten el chunk de framer ya presente.

### Imágenes
Sin imágenes propias relevantes; sin cambios.

### Manejo especial / notas
- Páginas **ya server-first** → pase visual puro, freeze 100%.
- `newsletterData.ts` + RSS intactos.

---

**PARO — cierre de plantilla newsletter.** Spot-check sugerido: `/es/newsletter` (grid + suscripción), `/es/newsletter/abril-2026-actualizaciones-migratorias`, `/en/newsletter/...`. Continúo **autónomo** con la última plantilla: **E. PÁGINAS SUELTAS** (nosotros, testimonios [guarda layoutId], consulta [form], clientes, clientes-detenidos, inversionistas, join-in, acceso-clientes, privacidad, terminos, sms-terminos, politica-editorial, informacion/{faq,recursos,noticias}).
