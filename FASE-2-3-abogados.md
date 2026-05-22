# FASE-2-3-abogados.md — Rollout plantilla ABOGADOS (directorio + 20 perfiles)

> Branch: `mejoras/fase-2-visual` · **Todo LOCAL** (commit; sin push).
> **2 componentes cubren toda la plantilla:** el directorio `/abogados` y el template `[slug]` (que renderiza los **20 perfiles**). `attorneyData.ts` **NO se tocó**.

## Tarea 1 — inspección (reporte)
- **`/abogados`** = `AbogadosClient.tsx` (`'use client'`): directorio agrupado por ubicación (`locationGroups`) con un **modal interactivo** (`useState selectedAttorney` + `AnimatePresence`). El click en una card abre el modal (preventDefault) en vez de navegar. → única parte interactiva real.
- **`/abogados/[slug]`** = `AttorneyProfile.tsx` (`'use client'`): **puramente presentacional** (sin `useState`/`AnimatePresence`/efectos; solo `useLanguage` + `useMemo` derivados + hover CSS). → conversión limpia a **Server Component puro** (como landings).
- Datos bilingües en `attorneyData.ts` (`attorneys`, `locationGroups`, helpers `getText`/`getRelatedAttorneys`/`getAttorneyLocation`). El schema **Person/Attorney + BreadcrumbList** vive en `[slug]/page.tsx` (no en el client).

## Tarea 2 — conversión

### Perfiles `[slug]` (20 rutas, 1 componente) → Server Component puro
`AttorneyProfile.tsx` ahora recibe `{ slug, lang }`; resuelve `attorney`/`relatedAttorneys`/`location`/`authorArticles` en servidor y todo el contenido bilingüe a `[lang]` → **enfoque (b)** (el componente es server: no llega NADA al bundle, ni el idioma inactivo). Lenguaje del Home: `Reveal` (bio, CTA, headings), `Stagger`+`.card-3d` (educación/admisiones, grid de artículos del autor, grid de abogados relacionados). **LCP sagrado:** foto `priority` + H1 estáticos (el original ya no animaba el hero). `ContactForm` import directo con `lang`.

### Directorio `/abogados` → shell server + isla
- `AbogadosClient.tsx` ahora es **Server Component** (`lang`): Header, fondo, hero (estático, LCP) y Footer en servidor; **resuelve `locationGroups` + textos a un solo idioma** y los pasa a la isla.
- **Nueva isla** `AttorneysExplorer.tsx` (`'use client'`): grid agrupado (`.card-3d` en cada card) + el **modal** (`AnimatePresence`, estado `selectedAttorney`). Recibe datos ya resueltos → el idioma inactivo no entra al bundle. Las cards se **SSR-renderizan** en el HTML inicial (Next SSR de client components), así que nombres/roles/links están en el DOM para crawlers. Patrón = el `OfficesExplorer` del Home.

`attorneyData.ts` intacto → `generateStaticParams` (20×2) y sitemap-abogados sin cambios.

## Validación

### Gates (verde)
| Gate | Resultado |
|---|---|
| `tsc --noEmit` | **0 errores** |
| `npm run build` | **exit 0** |
| `npm test` | **54/54** |
| lint | **325 (78 errores / 247 warnings)** — bajó desde 335; **no sube** |
| rutas | `/abogados` + `[slug]` (20) **● SSG** (es+en) |

### Freeze list
- **`[slug]/page.tsx`**: `git --numstat` = **1/1** → único cambio `<AttorneyProfile slug={slug} />` → `<AttorneyProfile slug={slug} lang={lang} />`. `generateMetadata` (canonical/hreflang/openGraph) + **Person schema** (jobTitle, `alumniOf`→EducationalOrganization, worksFor LawFirm, workLocation) + **BreadcrumbList** byte-idénticos.
- **`/abogados/page.tsx`**: 3/1 (solo añade `await params` + `localeLang` para threadear `lang`; **sin JSON-LD** en esta página, `generateMetadata` intacto).

### Freeze-byte en HTML servido
- `/es/abogados/manuel-solis`: `canonical` correcto ✓; Person schema (`jobTitle`, `EducationalOrganization`) + `BreadcrumbList` presentes en el HTML ✓; contenido server-rendered (bio "casi tres décadas", "Juris Doctor", "Volver al Equipo"). `/en/abogados/victor-rojas`: "Back to Team", "Biography", "Bar Admissions" en EN ✓.
- `/es/abogados` (directorio): cards SSR en el HTML (Manuel Solis, Victor Rojas, Ana Patricia Rueda) + headers de ubicación ("Houston, Texas") ✓.

### First Load JS (on-disk, bytes raw de `.next/static/chunks`)
| Métrica | Valor |
|---|---|
| antes (post-oficinas) | 2388.3 KB |
| después | **2305.7 KB (−82.6 KB)** · 74 chunks |

Salieron del bundle: el `AttorneyProfile` cliente completo (×20 rutas), el `useLanguage`/`useMemo`, el `ContactForm` dinámico y el idioma inactivo de los 20 perfiles + del directorio (solo el grid+modal quedan como isla con datos de un locale).

### Imágenes
Sin cambios. Retratos desde Vercel Blob + `Roberto Garcia.png` local (frágil). Caso especial de `object-position` para `lupita-valenzuela-martinez` preservado (card, modal, perfil, relacionados).

### Manejo especial / notas
- El **modal del directorio** se conserva 1:1 (el grid+modal son la única isla; las cards siguen siendo `<Link>` reales al perfil con `preventDefault` → degrada a navegación si no hay JS).
- `AttorneyProfile` no tenía estado → conversión a server pura (el caso más limpio de la plantilla).

---

**PARO — cierre de plantilla abogados.** Spot-check sugerido: `/es/abogados` (abrir un par de modales), `/es/abogados/manuel-solis`, `/en/abogados/victor-rojas`, `/es/abogados/lupita-valenzuela-martinez` (object-position). EN / mobile / reduced-motion. Continúo **autónomo** con la siguiente plantilla: **C. BLOG** (feed + 30 posts + 2 categorías).
