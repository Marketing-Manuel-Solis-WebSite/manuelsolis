# FASE-2-2-3D.md — Extensión 3D / dimensional del lenguaje de diseño

> Branch: `mejoras/fase-2-visual` · **Todo LOCAL** (commit para preservar; sin push/merge/preview).
> Extiende el `DESIGN-LANGUAGE.md` v2 con una dimensión 3D **demo-first**. **No se tocó ninguna página real** — solo primitivas, tokens y la demo aislada `/motion-demo`.

---

## 0. Guarda de performance (recordatorio)

"3D" = **CSS 3D transforms** (perspective, rotateX/Y, translateZ) compuestos en GPU, baratos, conscientes de reduced-motion. **NADA de WebGL/three.js.** Mismas reglas duras que v2: solo `transform`/`opacity`, reduced-motion de primera clase, LCP sagrado, presupuesto de movimiento (que **aplica también al 3D**).

---

## 1. Qué se construyó

| Archivo | Qué |
|---|---|
| `app/components/motion/Tilt.tsx` | **`<Tilt>`** (isla cliente) — tilt 3D al puntero + **`TiltLayer`** (pop-out por translateZ). |
| `app/components/motion/index.ts` | Barrel: exporta `Tilt`, `TiltLayer`. |
| `app/lib/motion.ts` | Tokens `tilt` (`max: 6`, `perspective: 1000`, `spring`). |
| `app/globals.css` (`@theme`) | Escalera de elevación `--shadow-e1..e4` (utilidades `shadow-e1..e4`) + `--perspective-near/far`. |
| `app/globals.css` | Utilidad **`.card-3d`** — profundidad por hover SIN tilt (restraint). |
| `app/[lang]/motion-demo/page.tsx` | Secciones 07 (Tilt), 08 (card-3d), **STRESS TEST 3D (20 cards)**. |

Todas las piezas: islas-cliente delgadas que reciben **children server-rendered** (cero contenido al bundle), `m.*` (strict), solo transform/opacity, bajo el `MotionProvider` global.

---

## 2. Las 3 primitivas/efectos y cómo respetan las reglas

### 2.1 `<Tilt>` — tilt 3D al puntero (el protagonista 3D)
- **Movimiento:** `rotateX`/`rotateY` hacia el cursor con spring; vuelve a **0° en reposo**. Opcional `glare` (sheen radial que sigue al cursor, opacity) y `scale` en hover (default off = restraint).
- **Restricción dura:** `maxTilt` está **cappeado a 6°** en código (`Math.min(maxTilt, t.max)`) — whisper-subtle = profesional. Un caller no puede pedir más.
- **Reduced-motion / touch:** `useReducedMotion()` + `(pointer: fine)` → **sin tilt** (children en wrapper plano). Cualquier hover CSS del `className` (p.ej. `.card-3d`) sigue aplicando.
- **LCP:** decorativo/interactivo, nunca sobre el elemento LCP.

### 2.2 `TiltLayer` — pop-out por profundidad
- Dentro de un `<Tilt>`: un elemento decorativo con `translateZ` flota sobre el plano de la card durante el tilt (el efecto dimensional). **Decorativo only** — el texto de cuerpo se queda en el plano base (un texto con translateZ puede verse blando).

### 2.3 `.card-3d` — profundidad sin tilt (restraint, el default)
- Para la **mayoría** de superficies: `translateY(-4px) scale(1.01)` en hover + **glow por cross-fade de opacity** de una capa `::after` pre-declarada. **Nunca anima box-shadow** (eso causa paint; la regla §2/§6 lo prohíbe).
- Reduced-motion: sin lift; el glow (opacity) sigue permitido.
- Sin listeners de puntero → barato y aplicable en masa. **No toda card necesita tilt.**

### Decisión: no se hizo un `<Depth>` JS aparte
La "profundidad por capas" se cubre con (a) la **escalera de elevación** `--shadow-e1..e4` (estática, jerarquía sin animar) y (b) `TiltLayer` (pop-out dinámico). Un wrapper `<Depth>` de perspectiva sería redundante con el que ya establece `<Tilt>`. Documentado por si más adelante se necesita un contexto de perspectiva compartido por varios elementos.

---

## 3. GUARDA #1 — Nitidez del texto sobre transform 3D (el gotcha)

El riesgo: `rotateX/Y` + `preserve-3d` pueden dejar el texto rasterizado borroso (subpixel) durante y **tras** el tilt. Mitigaciones aplicadas en `<Tilt>`:
- **`perspective` en el wrapper EXTERNO**, no en el elemento que rota.
- El elemento que rota lleva `transform-style: preserve-3d` + `backface-visibility: hidden`.
- El spring **vuelve exactamente a 0°** → el transform en reposo es identidad → el texto rasteriza afilado.
- `will-change` lo gestiona framer (lo añade durante la animación, lo quita en reposo) — no queda una capa permanente.

**Verificación (Playwright headless, DPR 2, `/es/motion-demo`):** capturé la card de servicio (texto de cuerpo) en **reposo**, **durante el tilt** y **en reposo tras el tilt** → `docs/fase-2-2-3d/tilt-{1-rest,2-mid,3-rest-after}.png`. Texto **nítido** en los tres estados; reposo y reposo-tras-tilt **idénticos** (sin blur residual). 
> **Caveat honesto:** es render headless lab; en pantalla real el compositing GPU activo puede variar un pelo durante el movimiento. La nitidez **en reposo** (el verdadero gotcha) queda confirmada. **Júzgalo tú en la demo en tu display.**

---

## 4. GUARDA #2 — Stress test con conteos reales
- La demo incluye un **STRESS TEST 3D con 20 cards `<Tilt>`** simultáneas (conteo real de `abogados`; oficinas = 15) — 12 no representaba el peor caso.
- **Eficiencia:** listener de puntero **por elemento** (solo activo en hover), `getBoundingClientRect` **cacheado en `onPointerEnter`** (sin layout thrash por move), springs sobre el **rAF compartido** de framer. Solo la card bajo el cursor computa rotación; las demás reposan.
- Render confirmado sin romper layout (`docs/fase-2-2-3d/tilt-stress-20.png`). **El jank real se juzga moviendo el cursor en la demo, sobre todo en mobile.**

## 5. GUARDA #3 — Restricción = profesional
- Tilt cappeado a **±6°** en código. `scale` y `glare` **opt-in** (off por defecto). `.card-3d` (sin tilt) es el default recomendado. El presupuesto de movimiento aplica al 3D: no toda superficie lleva tilt.

---

## 6. Gates (cierre en verde)

| Check | Resultado |
|---|---|
| `npx tsc --noEmit` | ✅ **0 errores** |
| `npm run build` | ✅ **exit 0** · 281 páginas · `/[lang]/motion-demo` sigue **● SSG/ISR** (es+en) · todas las `[lang]` ● SSG/ISR |
| `npm test` | ✅ **54/54** |
| `npm run lint` | ✅ **505 (200/305)** = baseline (no sube; mis archivos **0 problemas / cero `any`**, verificado con eslint sobre `Tilt.tsx`, `motion-demo/page.tsx`, `motion.ts`) |
| SEO / freeze list | ✅ intacta (no se tocó proxy/sitemaps/robots/generateMetadata/JSON-LD) |
| `public/` | ✅ sin renombrar/borrar |
| Push/merge/preview | ⛔ no (todo local) |

---

## 7. Cómo probarlo
```bash
npm run build && npm run start
# abre: http://localhost:3000/es/motion-demo  → secciones 07 (Tilt), 08 (card-3d), STRESS TEST 3D
# QA: mueve el cursor sobre las cards 07 y las 20 del stress → ¿texto nítido? ¿tilt sutil? ¿sin jank?
# reduced-motion: activa "Reducir movimiento" en el SO y recarga → el tilt debe desactivarse (plano)
```

---

## 8. Archivos
- **Nuevos:** `app/components/motion/Tilt.tsx`, `docs/fase-2-2-3d/` (4 screenshots), este `FASE-2-2-3D.md`.
- **Modificados:** `app/components/motion/index.ts`, `app/lib/motion.ts`, `app/globals.css`, `app/[lang]/motion-demo/page.tsx`.

---

**PARO.** Abre `/es/motion-demo` localmente y aprueba el **FEEL del 3D** (nitidez del texto, sutileza del tilt, ausencia de jank con 20 cards, comportamiento en reduced-motion/touch) **antes** de aplicarlo a páginas reales. Con tu OK arranco la **Fase 2.2b**: pase 3D ligero al Hero (CTA magnético "Consulta gratis" + settle CSS del retrato + profundidad sutil) y luego el rediseño server-first de las 6 secciones del Home con el lenguaje completo (v2 + 3D). ¿Ajustamos timing/intensidad del tilt, el glare, o la escalera de elevación?
