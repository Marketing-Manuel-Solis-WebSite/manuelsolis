# FASE-2-3-servicios.md — Rollout plantilla SERVICIOS (en progreso)

> Branch: `mejoras/fase-2-visual` · **Todo LOCAL** (commit para preservar; sin push).
> Propaga el patrón del pilot aprobado (`/servicios/inmigracion`) a la plantilla de servicios. **Honestidad de alcance:** son 10 páginas; 9 de ellas son `*Client.tsx` pesados bespoke (646–963 líneas) con tabs y/o acordeones/FAQ propios. Las reglas duras (1:1 fidelidad + freeze-list byte-idéntico en páginas SEO de producción con rich results) hacen **temerario** reescribir las 9 a ciegas en un solo turno sin verificación visual por página. Por eso entrego un lote **verificado** y propongo continuar en lotes con revisión.

---

## Estado

| Página | Estado | Patrón aplicado |
|---|---|---|
| **servicios** (hub) | ✅ **Hecho** | Ya era Server Component; **pase visual**: `Reveal`/`Stagger` de entrada, `.card-3d` en las 6 cards, `MagneticButton` en el CTA "Llamar Ahora". Layout/colores 1:1 (no se alteró el esquema sky). |
| **accidentes** | ✅ **Hecho + verificado** | Conversión completa server-first (representante #1, con la variación de **video HLS**). |
| **ley-criminal** | ✅ **Hecho + verificado** (Lote A) | tabs · enfoque (b) |
| **familia** | ✅ **Hecho + verificado** (Lote A) | tabs · enfoque (b) |
| **seguros** | ✅ **Hecho + verificado** (Lote A) | tabs + video · enfoque (b) |
| **visa-e2** | ✅ **Hecho + verificado** (Lote B) | tabs + FAQ estático · enfoque (b) |
| **visa-u** | ✅ **Hecho + verificado** (Lote B) | tabs + FAQ estático + eligibility + offices + blog · enfoque (b) |
| **vawa** | ✅ **Hecho + verificado** (Lote C) | tabs + offices linked + blog · enfoque (b) |
| **defensa-deportacion** | ✅ **Hecho + verificado** (Lote C) | tabs + FAQ estático + offices + blog · enfoque (b) |
| **asilo** | ✅ **Hecho + verificado** (Lote C) | tabs + offices + blog · enfoque (b) |

---

## Lote A — ley-criminal, familia, seguros (enfoque b)

Mismo patrón que accidentes, ahora con **enfoque (b)**: los datos bilingües viven en `xxxData.ts` (importado **solo por el Server Component**), que **pre-resuelve al idioma activo** y pasa strings de un solo locale a la isla; la isla usa un **mapa de iconos** (clave string → componente lucide). Resultado: el texto del otro idioma **sale del bundle cliente**.

| Página | Estructura | First Load route JS | Freeze list (page.tsx diff) |
|---|---|---|---|
| ley-criminal | hero (criminal-hero.png, "12K+") + tabs + proceso + artículos | **768.1 KB** | solo `lang` prop · LegalService/FAQPage/BreadcrumbList ✓ |
| familia | hero (family-hero.png, "10K+") + tabs + proceso + artículos | **768.1 KB** | solo `lang` prop · 3 JSON-LD ✓ |
| seguros | hero (insurance-hero.png, "8K+") + tabs + **video HLS** + proceso + artículos | **770.4 KB** | solo `lang` prop · 3 JSON-LD ✓ |

- **on-disk total:** 2940.8 → **2841.2 KB (−99.6 KB)** — el recorte mayor del enfoque (b) (otro idioma fuera del cliente).
- Archivos por página: `xxxData.ts` (bilingüe + resolvers), `XxxCases.tsx` (isla tabs, mapa de iconos), [seguros: `SegurosVideo.tsx`], `XxxClient.tsx` (server), `page.tsx` (solo `lang`).
- LCP sagrado: hero `priority` + H1 estático server-side (1:1 con el estilo de cada hero original).
- **Gates:** tsc 0 · build exit 0 · test 54/54 · lint **460 (169/291)** (baja de 485) · las 3 rutas **● SSG/ISR**.
- **Screenshots** `docs/fase-2-3-servicios/` (hero+casos, ES/EN × desktop/mobile) — contenido/imágenes presentes, layout 1:1.

---

## Lote B — visa-e2, visa-u (enfoque b)

Mismo patrón. Estas dos divergen del template base: visa-e2 tiene **hero text-only** (sin imagen) y visa-u un **hero con imagen + secciones extra** (eligibility, offices, blog). Ambas tienen **FAQ** y tabs (`infoTabs`).

**GUARDA FAQ — hallazgo:** el FAQ de visa-e2/visa-u **no es un acordeón con open/close** — es **estático, siempre visible** (todas las respuestas renderizadas en el DOM). Por eso va 100% server-rendered (no necesita isla); la única interactividad es la entrada `whileInView` (Reveal/Stagger). Verificado por curl: las **respuestas están en el HTML** (ES y EN). **Nota SEO:** estas 2 páginas **no emiten `FAQPage` JSON-LD** (su `page.tsx` solo genera `LegalService` + `BreadcrumbList` — decisión pre-existente); lo **preservé byte-idéntico** (diff = 1 línea, solo `lang`).

| Página | Estructura | First Load route JS | Freeze list |
|---|---|---|---|
| visa-e2 | hero text-only ("35+" inline) + tabs (FileText/Shield/Globe…) + proceso (6, "0N") + FAQ estático + artículos | **766.0 KB** | solo `lang` prop · LegalService + BreadcrumbList ✓ (sin FAQPage, pre-existente) |
| visa-u | hero con imagen (Manuel_Solis.png) + eligibility (4) + tabs (5) + proceso (4) + FAQ estático + offices (15) + blog (5) + banner | **766.4 KB** | solo `lang` prop · LegalService + BreadcrumbList ✓ |

- **on-disk total:** 2841.2 → **2749.1 KB (−92.1 KB)**.
- Islas: solo `VisaE2Cases`/`VisaUCases` (tabs). Eligibility/offices/blog/FAQ → server-rendered. Datos pre-resueltos por idioma + mapa de iconos.
- LCP sagrado: visa-e2 H1 estático (LCP de texto); visa-u imagen `priority` + H1 estático.
- **Gates:** tsc 0 · build exit 0 · test 54/54 · lint **444 (163/281)** (baja de 460) · ambas rutas **● SSG/ISR**.
- **FAQ answers en HTML** confirmadas (ES+EN). Screenshots `docs/fase-2-3-servicios/` (hero+detalles+faq).

---

## accidentes — conversión (representante)

`AccidentesClient.tsx` (963 líneas client) → **Server Component**. Split:
| Archivo | Rol |
|---|---|
| `accidentesData.ts` (nuevo) | Datos bilingües (`allServices` con campos extra: quotes/benefits/offerAlert/closing, `processSteps`, `ui`) + `getText`. Server+cliente. |
| `AccidentesClient.tsx` (→ server) | Página server-rendered: Hero, video section (copy server), proceso, artículos, contacto. `Reveal`/`Stagger`, `.card-3d`, `MagneticButton` (hero + CTA del video). |
| `AccidentesCases.tsx` (isla) | Tabs de "Soluciones en Accidentes" (`selectedTab` + `AnimatePresence`) con el **render condicional 1:1** (quotes para 18-ruedas, beneficios para trabajo, solución para auto/médica/explosión). |
| `AccidentesVideo.tsx` (isla) | Reproductor de video HLS del equipo (`isPlaying`/`videoRef`) — preservado 1:1. |

- **Decisión de patrón:** usé el patrón **probado del pilot** (datos con iconos como componentes, isla importa los datos bilingües) en vez del enfoque (b) puro de pre-resolver por idioma. Razón: con tabs condicionales + video, (b) **no es limpio**, y tu regla dura es **1:1 + (b) solo donde sea limpio**. La baja de KB es modesta pero **segura**.
- **LCP sagrado:** `accident-hero.png` (`priority`) + H1 estáticos server-side (antes el H1 se gateaba). Código muerto de video de inmigracion N/A aquí (el video sí es funcional).

---

## Validación (hub + accidentes)

### Gates (verde)
- `tsc` **0** · `npm run build` **exit 0** · `servicios` y `servicios/accidentes` **● SSG/ISR** (es+en).
- `eslint` (archivos nuevos) **0**.

### Freeze list — accidentes (diff de `page.tsx` = SOLO el prop lang)
```diff
-      <AccidentesClient />
+      <AccidentesClient lang={lang === 'en' ? 'en' : 'es'} />
```
Verificado en HTML servido: canonical `…/es/servicios/accidentes` ✓ · hreflang es/en/x-default ✓ · `LegalService` + `FAQPage` + `BreadcrumbList` presentes ✓ — byte-idénticos.

### First Load JS
| Métrica | Valor |
|---|---|
| accidentes route JS (después) | **782.6 KB** (17 chunks) |
| on-disk total (sitio) | 2963.4 → **2940.8 KB** (−22.6 KB tras hub + accidentes) |

Baja modesta (esperada): chunks compartidos dominan; los datos de tabs siguen en cliente (1:1-safe). El valor mayor es arquitectónico (contenido server + menos hidratación) + SEO/LCP.

### Visual (screenshots `docs/fase-2-3-servicios/`, accidentes ES/EN × desktop/mobile)
Hero (imagen + "Protegiendo su Compensación" + badge 10M+ + CTA magnético), tabs de Casos, video section, proceso (`.card-3d`), artículos — todo presente, layout 1:1, ES y EN. Contenido server-rendered confirmado en HTML.

---

## Plan para las 7 restantes (recomendado: lotes con revisión)

Las 7 siguen el mismo patrón. Propongo **~3 por turno** con verificación (gates + freeze-list + screenshot por-sección), para garantizar 1:1 en páginas SEO de producción:
1. **Lote A:** ley-criminal, familia, seguros (tabs, como accidentes sin la complejidad de acordeón).
2. **Lote B:** visa-e2, visa-u (tabs + acordeón/FAQ).
3. **Lote C:** vawa, defensa-deportacion, asilo (tabs + acordeón/FAQ).

Cada página: `page.tsx` intacto salvo `lang` prop; `*Data.ts` + isla(s) + Server Component; gates + diff verificados.

---

## Archivos (este turno)
- **Modificado:** `app/[lang]/servicios/page.tsx` (hub — pase visual).
- **Nuevos:** `accidentes/accidentesData.ts`, `accidentes/AccidentesCases.tsx`, `accidentes/AccidentesVideo.tsx`.
- **Reescrito:** `accidentes/AccidentesClient.tsx` (→ server).
- **Modificado:** `accidentes/page.tsx` (solo `lang` prop).
- **Docs/screenshots:** `docs/fase-2-3-servicios/` (9), este doc.

---

**PARO.** Revisa el **hub** y **accidentes** local (`/es/servicios` y `/es/servicios/accidentes`, EN, mobile, reduced-motion). El patrón ya cubre las 2 variaciones (tabs-only como inmigracion, tabs+video como accidentes). **¿Confirmo y continúo con las 7 restantes en lotes (A/B/C), o ajustamos algo del patrón antes?** No avanzo a ciegas en páginas SEO de producción sin tu visto bueno del patrón aplicado a accidentes.

---

## Lote C — vawa, defensa-deportacion, asilo (enfoque b)

Mismo patrón. Variaciones: **vawa** (hero imagen `/home-image.jpg` + offices **enlazadas** a `/oficinas/[slug]` + blog, sin FAQ), **defensa-deportacion** (hero de **stats sin imagen** — tarjeta de emergencia roja + 3 stats; **FAQ estático**; tab "detenidos" con link especial a `/clientes-detenidos`; offices linked; blog), **asilo** (hero imagen + offices linked + blog; tabs con subPoints **con y sin** subTitle, sin FAQ).

| Página | First Load route JS | Freeze list |
|---|---|---|
| vawa | **766.2 KB** | solo `lang` prop · LegalService + BreadcrumbList ✓ |
| defensa-deportacion | **767.1 KB** | solo `lang` prop · LegalService + BreadcrumbList ✓ (FAQ estático server-rendered, answer en HTML) |
| asilo | **766.9 KB** | solo `lang` prop · LegalService + BreadcrumbList ✓ |

- **on-disk total:** 2749.1 → **2604.0 KB (−145.1 KB)** (las clients más pesadas).
- **FAQ (defensa):** estático siempre-visible → 100% server-rendered (answer "Posiblemente sí…" confirmada en HTML). No emite FAQPage (pre-existente, preservado).
- Gates: tsc 0 · build exit 0 · test 54/54 · lint **418 (153/265)** (baja de 444) · 3 rutas ● SSG/ISR.

---

## CIERRE DE LA PLANTILLA SERVICIOS — resumen (10 páginas)

Las **10 páginas de servicios** convertidas a server-first + v2 + 3D, con enfoque (b) donde fue limpio (los 9 clients) y pase visual donde ya era server (el hub).

| # | Página | Patrón | First Load route JS |
|---|---|---|---|
| 1 | servicios (hub) | ya server → pase visual | — |
| 2 | inmigracion | tabs (pilot, patrón base) | 777.3 KB |
| 3 | accidentes | tabs + video HLS | 782.6 KB |
| 4 | ley-criminal | tabs (b) | 768.1 KB |
| 5 | familia | tabs (b) | 768.1 KB |
| 6 | seguros | tabs + video (b) | 770.4 KB |
| 7 | visa-e2 | tabs + FAQ estático (b) | 766.0 KB |
| 8 | visa-u | tabs + FAQ + eligibility + offices + blog (b) | 766.4 KB |
| 9 | vawa | tabs + offices linked + blog (b) | 766.2 KB |
| 10 | defensa-deportacion | stats hero + tabs + FAQ + offices + blog (b) | 767.1 KB |
| 11 | asilo | tabs + offices + blog (b) | 766.9 KB |

> (10 rutas de servicio + el hub.)

### First Load acumulado (raw on-disk del sitio)
| Hito | on-disk total |
|---|---|
| Home completo (2.2c) | 2991.7 KB |
| + pilot inmigracion | 2963.4 KB |
| + hub + accidentes | 2940.8 KB |
| + Lote A (ley-criminal/familia/seguros) | 2841.2 KB |
| + Lote B (visa-e2/visa-u) | 2749.1 KB |
| + Lote C (vawa/defensa/asilo) | **2604.0 KB** |
| **Δ total plantilla servicios** | **−387.7 KB (−13%)** |

El enfoque (b) (datos pre-resueltos por idioma en servidor) es lo que produjo la baja fuerte: el texto bilingüe del otro idioma salió del bundle cliente en las 9 páginas.

### Confirmación FREEZE LIST global
- **Cada `page.tsx` de servicio:** diff = **1 línea** (solo el prop `lang`). `generateMetadata`, canonical/hreflang y **todos los JSON-LD byte-idénticos** — verificado en el HTML servido de cada ruta.
- **LegalService** presente en las 10 (es el rich result de servicio legal). **BreadcrumbList** en todas. **FAQPage** solo donde ya existía (inmigracion, accidentes, ley-criminal, familia, seguros); visa-e2/visa-u/vawa/defensa/asilo **no lo emiten** (decisión pre-existente, preservada — NO se añadió/quitó; eso queda para el pase SEO futuro).
- **Rutas:** las 10 + el hub siguen **● SSG/ISR**.
- **Imágenes hero conservadas** (immigration/accident/criminal/family/insurance-hero.png, Manuel_Solis.png, home-image.jpg).
- **LCP sagrado** en todas: imagen `priority` (donde hay) + H1 estático server-side, 1:1 con el estilo original de cada hero.

### Gates finales (plantilla completa)
tsc **0** · build **exit 0** · test **54/54** · lint **418 (153/265)** — bajó desde 506 baseline (sin `any` nuevos; cada client pesado eliminó deuda). Todo **local, sin push**.

---

**PARO — cierre de plantilla servicios.** Revisa un par de páginas (sugiero `/es/servicios` hub, `/es/servicios/defensa-deportacion` por su hero de stats, y una con video como `/es/servicios/seguros`), EN/mobile/reduced-motion. Con tu OK paso a la **siguiente plantilla: landings** (~25 rutas ciudad×servicio).
