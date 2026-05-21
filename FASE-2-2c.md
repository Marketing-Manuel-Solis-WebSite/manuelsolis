# FASE-2-2c.md — Home completo: 5 secciones restantes server-first (v2 + 3D)

> Branch: `mejoras/fase-2-visual` · **Todo LOCAL** (commit para preservar; sin push/merge/preview).
> Propaga el lenguaje server-first + v2 + 3D a las 5 secciones restantes del Home. Con esto el **Home completo** queda como standard-setter para el rollout al resto del sitio.

---

## Resumen por sección

| Sección | Patrón | Protagonista + islas | Cards |
|---|---|---|---|
| **Services** | Server Component (`lang` prop) | `Stagger` del grid (protagonista) + `Reveal` del header | 6 cards → **`.card-3d`** (reemplaza el `TiltCard` JS + `shimmer`/box-shadow por lift + glow-opacity). Sin `<Tilt>` (no hay card destacada). |
| **Testimonials** | Server Component + isla `TestimonialsVideo` | `Stagger` del texto + `Reveal scale` del video | — |
| **Team** | Server Component | `Stagger` del texto + `Reveal scale` imagen + `Reveal` badge | — (es bloque texto+imagen, no grid) |
| **Offices** | Server shell + isla `OfficesExplorer` | `Reveal` del header; explorer interactivo intacto | detalle interactivo (perspective propio) |
| **ContactForm** | Server shell + isla `ContactFormClient` | `Reveal` del header | — |

Las 5 reciben `lang` por prop desde `page.tsx` (Server Components estáticos, ya no `dynamic()` cliente). El copy bilingüe inline se renderiza en **servidor** (confirmado en HTML para ES y EN).

---

## Hallazgos importantes (honestidad)

1. **`Team` NO es un grid de abogados.** Esta sección del Home es un bloque texto + foto de equipo + badge que enlaza a `/abogados`. El **grid de 20 abogados vive en la ruta `/abogados`** (futuro rollout) — ahí aplicará el patrón `.card-3d`/`<Tilt>` previsto. Link a `/{lang}/abogados` conservado.
2. **`Testimonials` del Home NO usa `layoutId`.** Usa un modal fade/scale con `AnimatePresence` (cubierto por el `domAnimation` global). El **`layoutId` + `domMax` anidado vive en la ruta `/testimonios`** (`TestimoniosClient.tsx`, futuro rollout), no aquí. **No había morph que romper en esta sección**; el modal abre/cierra correctamente (verificado).
3. **`Offices` es un explorador interactivo**, no un grid estático: selector de ciudad + panel de detalle animado + estado abierto/cerrado en vivo. Los datos bilingües se cambian en vivo → quedan en la isla cliente por necesidad. Se movió a servidor el shell (section + bg + heading) y se **quitó la animación infinita de orbes + el listener de resize** (menos efectos cliente). Imágenes de nombre frágil intactas.
4. **ContactForm es compartido en ~65 páginas.** Para no romper esos consumidores, el entry `ContactForm` acepta `lang?` opcional: con `lang` (Home) → shell server; sin `lang` (otras páginas, cliente) → `ContactFormAutoLang` resuelve el idioma por contexto (comportamiento previo, sin regresión). Esas páginas pasan al path server en su rollout. Services/Team/Testimonials/Offices son **Home-only** (0 consumidores externos), por eso `lang` es requerido ahí.

---

## BUG corregido — hidratación de `<Tilt>` (afectaba 2.2a y 2.2b)

Al verificar el envío del formulario apareció un **error de hidratación React #418**. Causa raíz: `<Tilt>` decidía su ESTRUCTURA (`div` plano vs. wrapper de perspectiva + `m.div`) según `active = !reduced && finePointer`, que en **servidor es `false`** (sin `window`/matchMedia) y en **cliente `true`** → el HTML server ≠ cliente → mismatch que regeneraba el árbol (desestabilizando la interacción aguas abajo).

**Fix:** gate de `mounted` (`useEffect`) en `Tilt.tsx` — el primer render cliente coincide con el servidor (estructura plana) y el tilt se "enciende" tras montar (update cliente normal, sin mismatch). Verificado: **sin `pageerror` de hidratación** tras el fix. Esto también sanea el badge 3D del Hero (2.2b) y la demo (2.2a).

---

## Validación

### Gates (verde)
| Check | Resultado |
|---|---|
| `npx tsc --noEmit` | ✅ **0** |
| `npm run build` | ✅ **exit 0** · Home `/[lang]` **● SSG/ISR** (1h/1y) |
| `npm test` | ✅ **54/54** |
| `npm run lint` | ✅ **492 (191 err / 301 warn)** — **bajó** de 505 (200/305) al sacar código cliente a servidor |

### First Load JS (raw on-disk, método BASELINE §2.1) — **baja**
| Estado | Total JS estático | Chunks |
|---|---|---|
| **Antes (2.2b, commit 3b76628)** | 3090.7 KB | 91 |
| **Después (2.2c)** | **2991.7 KB** | 93 |
| **Δ** | **−99.0 KB (−3.2%)** | +2 islas |

El copy bilingüe + la lógica cliente de Services/Team/Testimonials/Offices salieron del bundle al servidor → −99 KB de JS total en disco (y proporcionalmente más en el First Load del Home, que es donde viven). *(La cifra exacta de First Load por ruta no la emite Turbopack — BASELINE §2.3.)*

### CWV (mobile, Lighthouse local, 2 corridas) vs Hero 2.1 / 2.2b
| Métrica | 2.2b | **2.2c (run1 / run2)** |
|---|---|---|
| **LCP** | 3.6 s | **3.5 / 3.7 s** (estable, sin regresión) |
| **CLS** | 0 | **0 / 0** |
| TBT | 90 ms limpio | 110 ms (limpio) / 830 ms (contención) |
| Perf | 90 | 90 / 70 (sigue al TBT) |

LCP estable; CLS perfecto; TBT limpio 110ms (el 830 es contención de máquina por correr en serie — patrón ya documentado en 1A/2.1). Bajar 99 KB de JS ayuda al TBT de campo.

### Las 3 guardas (verificadas localmente)
1. **Testimonials hace morph:** el modal del testimonio abre al click (iframe de YouTube visible) y cierra. Es un modal fade/scale con `AnimatePresence` (no `layoutId` en esta sección — ver Hallazgo 2). ✅
2. **Offices — imágenes intactas:** el detalle carga `/offices/Houston.png`; las de nombre frágil responden 200 vía `next/image` (`Los Angeles.png`, `El paso.png`, `Chicago.png`). No se renombró/tocó ninguna. ✅
3. **ContactForm envía:** verificado interceptando `window.fetch` — al enviar dispara `submit` + `fetch('/api/lead-capture')`. Validación intacta (botón se habilita solo al aceptar términos). `useSearchParams`/UTM/BotID **sin cambios** (viven en `ContactFormClient`). **No se creó un lead real** (request mockeada). ✅

### Visual (screenshots `docs/fase-2-2c/`, 5 secciones × ES-desktop/ES-mobile/EN-desktop)
- Services: 6 cards `.card-3d` en grid, headers + listas + "Más Información". Testimonials: video + "Voces de Esperanza" + estrellas + caso. Team: texto + foto + badge "Desde 1990". Offices: explorer con selector + panel de detalle. ContactForm: header server + formulario.
- Contenido e imágenes presentes; layout no roto en los 3 viewports. El diff vs `docs/baseline-visual/` mostrará cambios esperados (entradas server-first + unificación de hover de cards a `.card-3d` + orbes de Offices ahora estáticos).
- **Nota:** los screenshots `fullPage` salían con las secciones inferiores en blanco (artefacto: los reveals `whileInView` no se disparan en el modo fullPage de Playwright). Las capturas son **por-sección con scroll** (disparan los reveals correctamente) — confirman que todo renderiza al hacer scroll real.

### SEO / imágenes (freeze list intacta)
- canonical `https://www.manuelsolis.com/es` ✓ · hreflang es/en/x-default ✓ · JSON-LD presente ✓ — **no se tocó** `generateMetadata`/canonical/hreflang/JSON-LD (solo cambiaron imports/props en `page.tsx`).
- `public/` sin renombrar/borrar (imágenes frágiles de Offices verificadas) ✓.

---

## Archivos
- **Server Components nuevos/reescritos:** `Services.tsx`, `Team.tsx`, `Testimonials.tsx`, `Offices.tsx` (shell), `ContactForm.tsx` (entry retrocompatible), `ContactFormShell.tsx`.
- **Islas cliente nuevas:** `TestimonialsVideo.tsx`, `OfficesExplorer.tsx` (renombrado desde el viejo `Offices.tsx` vía `git mv`), `ContactFormClient.tsx`, `ContactFormAutoLang.tsx`.
- **Fix de primitiva:** `app/components/motion/Tilt.tsx` (gate de hidratación `mounted`).
- **Modificado:** `app/[lang]/page.tsx` (imports estáticos + `lang` a las 5 secciones).
- **Docs/screenshots:** `docs/fase-2-2c/` (15), este `FASE-2-2c.md`.

---

**PARO.** Revisa el **HOME COMPLETO** local (`npm run build && npm run start` → `http://localhost:3000/es` y `/en`, mobile, reduced-motion): las 7 secciones con el lenguaje v2 + 3D, server-first. Como standard-setter, esto define el patrón del **rollout al resto del sitio** (~125 rutas), que propongo por plantilla: servicios → landings → oficinas → abogados → blog (cada uno: pilot de 1 página, screenshot-diff + gates + CWV). ¿Apruebas el Home y arrancamos el rollout, o ajustamos algo (intensidad 3D, orbes estáticos de Offices, algún reveal)?
