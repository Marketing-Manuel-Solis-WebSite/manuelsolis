# FASE-1A.md — Quick wins de performance (bajo riesgo)

> Branch: `mejoras/fase-1a-quickwins` (desde `main`).
> Objetivo: bajar First Load JS (framer-motion) y LCP mobile **sin tocar** URLs, SEO, JSON-LD ni assets.
> Fecha: 2026-05-20 · Comparado contra `BASELINE.md`.

---

## 1. Qué cambié

### Tarea 1 — LazyMotion (mayor ahorro de JS)
- **Nuevo `app/components/MotionProvider.tsx`** (client): `<LazyMotion features={domAnimation} strict>` + `<MotionConfig reducedMotion="user">`.
  - `domAnimation` (~15–20kb) carga **lazy** (fuera del First Load) animaciones, variants, exit (`AnimatePresence`) y gestures hover/tap. `strict` prohíbe `motion.*` (solo `m.*`), garantizando que el split se mantenga.
- **Montado en `app/[lang]/layout.tsx`** dentro de `LanguageProvider`, envolviendo `{children}` + los 4 CTAs flotantes. *(Solo se añadió el import y el wrapper; no se tocó el JSON-LD ni `generateMetadata` del layout.)*
- **Migrados 65 archivos** de `motion.*` → `m.*` (import `{ motion }` → `{ m }`, usos `motion.X` → `m.X`, y el factory `motion(Link)` → `m(Link)` en `ConsultaFloatingCta.tsx`). Validado: **0 residuales de `motion.`**, paquete `framer-motion` y hooks `useMotion*`/`useScroll` intactos.
- **`TestimoniosClient.tsx`**: usa `layoutId` (shared-layout), que `domAnimation` no cubre → se anidó un `<LazyMotion features={domMax}>` **solo en esa página** (decisión aprobada: Opción A). El coste extra (~10kb) lo paga únicamente `/testimonios`.
- Las variants de `app/lib/motion.ts` **no se tocaron** (solo cambia el componente que las consume). Es refactor de import, sin cambios de diseño.

### Tarea 2 — LCP del Hero (mobile)
- **Diagnóstico:** la imagen LCP (`/manuelsolisl.png`, `next/image` con `priority`) arrancaba en `opacity: 0` y se revelaba por JS en 1.5s. El `opacity:0` es lo que bloquea el LCP (el `scale`/`y` **no** bloquean LCP: un elemento transformado sigue "pintado"; uno con opacity 0 no).
- **Fix:** quité el gating de opacidad del entrance de la imagen → ahora pinta en el primer frame (y aunque el JS no corra). Mantengo el `scale 0.9→1` y el `y` (entrada de posición ligera). Sin cambio de `priority`.
- **`sizes`** — actual: `"(max-width: 768px) 100vw, 50vw"`. **Veredicto: adecuado, no lo toqué.** En mobile el contenedor ocupa el ancho completo (100vw correcto); en desktop la imagen vive en `col-span-5` (~42% + escala/translate decorativos), por lo que `50vw` es una aproximación razonable que no infla el candidato de srcset. Cambiarlo sería micro-optimización de riesgo innecesario en esta fase.
- **prefers-reduced-motion:** ahora respetado globalmente vía `MotionConfig reducedMotion="user"` (con reduce-motion del SO, las animaciones de transform se omiten; opacity/color siguen). Antes las animaciones JS de framer-motion no lo respetaban (el `@media` de `globals.css` solo afecta CSS, no JS).

### Tarea 3 — Popup auto-abierto
- Antes: `showPopup` iniciaba en `true` → abría en **cada** carga.
- Ahora: inicia en `false` y se dispara por **delay de 7s O intención de scroll (>300px), lo que ocurra primero**; al cerrarlo se guarda `sessionStorage['detained_popup_dismissed']='1'` para **no reabrir en la misma sesión**.
- **Tracking `popup_open` preservado** (sigue disparándose cuando el popup se vuelve visible). **Contenido del popup sin cambios.** Reduje solo el `delay` interno de la animación (1.5s → 0) para que aparezca de inmediato al dispararse.

---

## 2. Cierre en verde (gates)

| Check | Baseline | Fase 1A | ¿OK? |
|---|---|---|---|
| `npx tsc --noEmit` | 0 errores | **0 errores** | ✅ |
| `npm run build` | exit 0 | **exit 0** (compila 23.4s; 279 páginas; sin errores de `strict`/`motion`) | ✅ |
| `npm test` | 54/54 | **54/54** | ✅ |
| `npm run lint` | 200 err / 306 warn | **200 err / 306 warn (idéntico)** | ✅ no sube |

> El build prerenderizó las 279 páginas bajo `LazyMotion strict` sin lanzar — confirma que la migración está completa (ningún `motion.*` huérfano) y que el provider cubre todo el árbol con animaciones.

---

## 3. Diff de bundle (raw on-disk, misma metodología que BASELINE §2)

| Métrica | Baseline | Fase 1A | Δ |
|---|---|---|---|
| Total JS estático | 2834.1 KB / 85 chunks | **2760.4 KB / 79 chunks** | **−73.7 KB (−2.6%)** |
| Chunks con marcadores framer-motion | 48 / 85 | **42 / 79** | **−6 chunks** |
| Peso combinado de esos chunks | 1833.6 KB | **1633.3 KB** | **−200.3 KB (−10.9%)** |
| Chunk JS más grande | 224.3 KB (react-dom) | 224.3 KB (react-dom) | = |
| 2º chunk del baseline (114.7 KB, scheduler+fm) | presente | **fuera del top** | — |
| CSS global | 184.9 KB | 184.9 KB | = |

> **Lectura honesta:** el total en disco baja poco (−2.6%) **a propósito** — LazyMotion no elimina el código de framer-motion del disco; lo mueve **fuera del First Load** (carga diferida tras la pintura). La métrica que mejora de verdad es el **First Load JS por ruta** y el **TBT**, no el total on-disk. El First Load JS exacto por ruta no lo emite Turbopack; para verlo: `npx next experimental-analyze` (UI treemap).

---

## 4. Diff de CWV (Lighthouse local, mobile · 2 corridas Fase 1A)

> Lab local, Edge headless, server tibio. **Hay varianza entre corridas** (ver BASELINE §3.3): se reportan ambas corridas.

### Home `/es` (mobile)
| Métrica | Baseline | Fase 1A (run1 / run2) | Tendencia |
|---|---|---|---|
| Perf | 84 | 86 / **92** | ⬆️ mejor |
| **LCP** | 4118 ms | 4046 / **3318** ms | ⬇️ mejor (Hero opacity fix) |
| **TBT** | 164 ms | 128 / **77** ms | ⬇️ mejor (~50%) |
| FCP | 1210 ms | 1230 / 1215 ms | = |
| CLS | 0.001 | 0.001 / 0.001 | = (sin regresión) |
| SI | 1838 ms | 1230 / 1726 ms | ⬇️/= |
| Peso total | 1578 KB | 1571 / 1570 KB | = |

### Servicio `/es/servicios/inmigracion` (mobile)
| Métrica | Baseline | Fase 1A (run1 / run2) | Tendencia |
|---|---|---|---|
| Perf | 78 | **82** / 78 | ⬆️/= |
| **LCP** | 4438 ms | 4437 / 4368 ms | = (sin cambio) |
| **TBT** | 308 ms | 179 / 323 ms | ⬇️/= (ruidoso) |
| FCP | 1212 ms | 1212 / 1218 ms | = |
| CLS | 0.000 | 0.000 / 0.000 | = |
| SI | 1985 ms | 1665 / 1984 ms | ⬇️/= |
| Peso total | 1228 KB | 1223 / 1222 KB | = |

**Resumen CWV:** mejoras claras y consistentes en **home** (TBT ~50% abajo; LCP best-run 4118→3318). En **servicio** el TBT mejora en la mejor corrida pero el **LCP no cambia** (~4.4s): su elemento LCP **no es el Hero** (esa página no usa la imagen del Hero), así que el fix de Tarea 2 no aplica ahí. **CLS sin regresión en ninguna** (≤0.001).

---

## 5. Riesgos y sorpresas

1. **Ganancia on-disk modesta vs ganancia real.** El total de JS solo bajó 2.6%; el valor de LazyMotion está en **diferir** framer-motion, no en borrarlo. La confirmación fuerte requiere **First Load JS por ruta** (`next experimental-analyze`) y, sobre todo, **datos de campo (PSI/CrUX)** en producción, no lab local.
2. **Varianza de Lighthouse.** Home LCP osciló 3318–4046 ms entre dos corridas. Las cifras lab no son determinísticas; tratar como tendencia, no como número exacto.
3. **LCP de servicio sin cambio (~4.4s).** Es el siguiente cuello real y **queda fuera de 1A**: depende de 1B (render dinámico → estático/ISR, hoy todo `[lang]` es `ƒ Dynamic` por el fetch a Google Places) y 1C (client→server en los `*Client.tsx` grandes). No se tocó nada de eso.
4. **`strict` mode permanente.** A partir de ahora, **todo código nuevo debe usar `m.*`, nunca `motion.*`** (lo documenté en `MotionProvider.tsx`). Un `motion.*` olvidado hará fallar el build/prerender — es intencional como red de seguridad.
5. **reduced-motion ahora activo (cambio de comportamiento).** Usuarios con "reduce motion" del SO ya **no** verán animaciones de transform (sí opacity/color). Es lo pedido en Tarea 2, pero es un cambio de comportamiento que conviene tener presente para QA.
6. **`domMax` anidado en `/testimonios`.** Esa ruta carga ~10kb extra (necesario para `layoutId`). Ninguna otra ruta lo paga.
7. **Sin cambios de SEO/URLs/assets.** No se tocó `proxy.ts`, `seoRedirects.ts`, `robots.ts`, `sitemap*`, `sitemapData.ts`, ni `generateMetadata`/canonical/hreflang, ni el JSON-LD de `[lang]/layout.tsx`, ni se renombró/borró nada de `public/`.

---

## 6. Inventario de archivos cambiados
- **Nuevo:** `app/components/MotionProvider.tsx`.
- **Modificados (67):** `app/[lang]/layout.tsx` (montaje provider), `app/components/Hero.tsx` (LCP + popup), `app/[lang]/testimonios/TestimoniosClient.tsx` (domMax anidado), y **64 archivos** más por la migración mecánica `motion`→`m` (componentes compartidos + `*Client.tsx` + páginas de blog/servicios/oficinas).
- **Docs:** `BASELINE.md` (de Fase 0, aún sin commitear), este `FASE-1A.md`.

> **Pendiente de decisión tuya:** aprobar merge de `mejoras/fase-1a-quickwins`. No hice commit; el working tree tiene los cambios listos para que los revises (`git diff`). También recuerda que `BASELINE.md` sigue **sin commitear en `main`** (ver nota en mi reporte de Fase 0).

*Fin de Fase 1A. No continúo con 1B (render dinámico) ni 1C (client→server) hasta tu aprobación.*
