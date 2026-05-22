# FASE-2-3-oficinas.md — Rollout plantilla OFICINAS (15 detalle + hub)

> Branch: `mejoras/fase-2-visual` · **Todo LOCAL** (commit; sin push).
> **Una conversión → 15 rutas:** las 15 `/oficinas/[ciudad]` comparten un template idéntico (solo varían los datos) → un componente compartido nuevo, `OfficePageView.tsx`, las renderiza todas.

## Tarea 1 — inspección (reporte)
- Las **15** oficinas (`arvada`, `chicago`, `dallas`, `el-paso`, `harlingen`, `houston-accidentes`, `houston-bellaire`, `houston-principal`, `kirby`, `league-city`, `losangeles`, `main-st`, `memphis`, `north-loop`, `northchase`) tenían cada una su propio `OfficeClient.tsx` **`'use client'`** (330–376 líneas) con `officeData`/`uiText` **bilingües inline** + `useParams` + `useState`/`useEffect` (solo para gatear los orbes de fondo a desktop) y `m.*` de framer en cada bloque.
- **Mismo template en las 15** (verificado por claves de `officeData` idénticas y estructura JSX). Variaciones puramente de datos: (a) `uiText.team` difiere ("Nuestros Abogados" vs "Nuestro Equipo Legal"); (b) **solo arvada/chicago/dallas** renderizan el bloque condicional **Gerencia** (`managers.length > 0`); (c) el badge del hero es un literal por oficina ("Houston, Texas", "Los Angeles (Pico Rivera), CA", etc.); (d) **northchase** es la única cuyo "Ver en mapa" se computaba desde `encodeURIComponent(address)` (su `mapLink` es un placeholder), las otras 14 usan su `mapLink` real de `share.google`.
- El **hub `/oficinas`** ya era Server Component (sin `'use client'`, sin framer) → solo necesitaba **pase visual** + pasar `lang` al `ContactForm`.

## Tarea 2 — conversión
**Nuevo componente compartido** `app/components/OfficePageView.tsx` (**Server Component**): recibe `data: OfficeData` (bilingüe) + `ui: OfficeUIText` + `lang`, y **resuelve al idioma activo en servidor** → enfoque (b): el idioma inactivo no llega al bundle cliente. Lenguaje del Home:
- **Hero estático (LCP sagrado):** badge + H1 + quote + descripción + imagen `priority` se renderizan sin gating de opacidad (antes el hero arrancaba en `opacity:0` con `animate`).
- **Below-the-fold:** `Reveal` (tarjeta de contacto, headings de sección) + `Stagger`/`StaggerItem` (grids de abogados, chips de servicios, grid de gerencia).
- **`.card-3d` workhorse** en las tarjetas de abogado y de gerencia (el grid que más se beneficia).
- **Orbes de fondo estáticos** (sin animación infinita), `hidden lg:block` (preserva el "sin orbes en mobile" original; coherente con la conversión del Home).
- **`ContactForm` import directo con `lang`** (antes `dynamic`).

**Isla nueva** `app/components/TrackedPhoneLink.tsx` (`'use client'`): preserva 1:1 el **evento de conversión del teléfono** (`pushToDataLayer('phone_click', …)` + `trackConversion('phone_click', 'office_page_call')`) del link de la tarjeta de contacto. Solo el handler vive en cliente; el texto/estilo vienen del servidor.

**Map link 1:1:** `OfficePageView` deriva `mapHref` = `mapLink` real salvo placeholder → cae al search de Google Maps por dirección (replica exactamente el comportamiento de northchase).

Cada `OfficeClient.tsx` quedó como **módulo server delgado**: conserva su `officeData`/`uiText` **byte-idénticos** (solo se añadió el campo `badge` y las anotaciones de tipo) y renderiza `<OfficePageView data={officeData} ui={uiText} lang={lang} />`.

## Validación

### Gates (verde)
| Gate | Resultado |
|---|---|
| `tsc --noEmit` | **0 errores** |
| `npm run build` | **exit 0** |
| `npm test` | **54/54** |
| lint | **335 (82 errores / 253 warnings)** — bajó desde 418 (landings); **no sube** |
| rutas | hub + **15 oficinas ● SSG** (es+en) |

### Freeze list — `page.tsx` byte-idéntico salvo `lang`
- Las **15** `page.tsx` de detalle: `git --numstat` = **1 línea +/1 línea −** cada una → único cambio `<OfficeClient />` → `<OfficeClient lang={localeLang} />`. `generateMetadata` (canonical/hreflang/openGraph), el schema **`buildOfficeSchema` (LawFirm/Place/Attorney + AggregateRating de Google Places)** y el `BreadcrumbList` **intactos**.
- Hub `/oficinas/page.tsx`: pase visual (17/18 líneas) — `generateMetadata` + el `BreadcrumbList` JSON-LD **sin tocar**.

### Freeze-byte en HTML servido (representativa: `/es/oficinas/houston-principal`)
- `canonical` = `https://www.manuelsolis.com/es/oficinas/houston-principal` ✓
- JSON-LD presentes y completos: `LawFirm`, `Place`(×10), `PostalAddress`, `AggregateRating`, `ContactPoint`, `OfferCatalog`/`Offer`/`Service`, `Person`(×3), `BreadcrumbList`/`ListItem`, `WebSite`. ✓
- Contenido **server-rendered** confirmado: dirección, nombres de abogados, headings ES; en `/en/oficinas/arvada` el bloque **Gerencia** ("Our Management Team") + "Our Legal Team" salen en el HTML.
- **northchase**: "Ver en mapa" → `google.com/maps/search/?api=1&query=16510%20Northchase%20Dr…` (no el placeholder) ✓ — fidelidad preservada.

### First Load JS (on-disk, bytes raw de `.next/static/chunks`)
| Métrica | Valor |
|---|---|
| on-disk total (sitio), antes (post-landings) | 2564.4 KB |
| on-disk total (sitio), después | **2388.3 KB (−176.1 KB)** · 75 chunks |

La conversión sacó del bundle 15 client components grandes + la duplicación del `ContactForm` dinámico + el idioma inactivo de cada oficina.

### Imágenes
Conservadas todas las imágenes de oficina, **incl. las de nombre frágil**: `offices/Los Angeles.png`, `offices/El paso.png`, `offices/Chicago.png`, `offices/Dallas.png`, `offices/Denver.png`, `offices/Harlingen.png`, `offices/Houston.png`, `offices/League.png`, `offices/ofAirways.png`, `Roberto Garcia.png`, etc. `next/image` con `priority` en el hero (sin gating).

### Manejo especial / notas
- **TrackedPhoneLink**: nueva isla mínima para no perder el evento de conversión del teléfono (única pieza interactiva real de la página).
- **northchase**: `mapLink` placeholder → fallback computado (1:1).
- 2 archivos (league-city, losangeles) fueron reescritos limpios por el sub-agente tras un mismatch de `old_string`; datos preservados verbatim (verificado).

---

**PARO — cierre de plantilla oficinas.** Spot-check sugerido: `/es/oficinas/houston-principal`, `/en/oficinas/arvada` (tiene Gerencia + "Our Legal Team"), `/es/oficinas/northchase` (map link), `/es/oficinas/losangeles` (imagen frágil "Los Angeles.png"). EN / mobile / reduced-motion. Continúo **autónomo** con la siguiente plantilla: **B. ABOGADOS** (directorio + 20 perfiles `[slug]` de `attorneyData.ts`).
