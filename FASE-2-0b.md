# FASE-2-0b.md — Librería de primitivas de movimiento

> Branch: `mejoras/fase-2-visual` · **Todo LOCAL** (commits, sin push/merge/preview).
> Construye las 6 primitivas core del `DESIGN-LANGUAGE.md` + demo aislada. **No se tocó ninguna página real.**

---

## 1. Primitivas construidas (`app/components/motion/`)

| Archivo | Primitiva | Rol |
|---|---|---|
| `variants.ts` | (compartido) | `revealVariants()` + `staggerContainer()`. Sin `'use client'`; transform/opacity only. |
| `Reveal.tsx` | `<Reveal>` | Reveal con profundidad on-scroll. Generaliza el del pilot 1C → versión compartida. |
| `Stagger.tsx` | `<Stagger>` + `StaggerItem` | Cascada; hijos heredan el estado del contenedor. |
| `Parallax.tsx` | `<Parallax>` | Capas por scroll (`useScroll`/`useTransform`). |
| `MagneticButton.tsx` | `<MagneticButton>` | CTA con imán hacia el cursor + hover/tap scale. |
| `Shimmer.tsx` | `<Shimmer>` | Barrido dorado/blanco en hover o inView. |
| `TextReveal.tsx` | `<TextReveal>` | Mask reveal tipográfico (word/line). |
| `index.ts` | barrel | Export único. |

Todas: islas-cliente delgadas que reciben **children server-rendered** (cero contenido al bundle), usan `m.*` (strict), leen tokens de `motion.ts`/`@theme`, bajo el `MotionProvider` global. **No** se construyó `ScrollStory` (fuera de scope, según lo acordado).

---

## 2. Decisiones de implementación

### TextReveal — `word` (default) vs `line`
- **`word` (default):** divide por espacios; cada palabra es `inline-block` y anima `opacity` + `translateY('0.4em'→0)`. **Sin medición de layout → sin CLS, sin mismatch de hidratación.** El transform no altera el flujo, así que la posición final es idéntica al texto plano.
- **`line`:** divide por **saltos de línea explícitos** (`\n`, controlados por quien lo usa), cada línea enmascarada con `overflow-hidden` + `translateY(110%→0)` (el clásico "el texto sube tras un borde"). La altura de línea es la natural del texto; el transform no cambia el layout → **sin CLS**. **No** se detectan líneas auto-wrapeadas (eso exigiría medición y arriesgaría CLS/mismatch) — decisión deliberada.
- **SEO/AT:** el texto real está siempre en el DOM (server-rendered). El contenedor lleva `aria-label` con el string completo y los spans visuales son `aria-hidden`, así lectores de pantalla leen la frase entera y los crawlers el texto. Ambos modos se muestran en la demo.

### `blur` variant → sin `filter`
La regla "solo transform/opacity" es dura, así que el variant `blur` se implementa como **scale suave** (`0.94→1`), no como `filter: blur()`. Mantiene el "emerge" sin animar `filter` (que no es transform/opacity y complica reduced-motion). Documentado por si prefieres un blur real más adelante.

### Reduced-motion (tabla §8 del spec)
- **Reveal / Stagger / TextReveal:** se apoyan en el `MotionConfig reducedMotion="user"` global (Fase 1A) — framer omite los transforms y deja solo `opacity` (contenido visible, sin movimiento).
- **Parallax:** chequea `useReducedMotion()` y renderiza una **capa estática** (sin `useTransform` aplicado).
- **Shimmer:** chequea `useReducedMotion()` y **no renderiza** la capa de barrido.
- **MagneticButton:** sin imán si reduced-motion **o** puntero no-fino (touch); el hover/tap scale lo omite el config global bajo reduce → efectivamente sin movimiento. Degrada a tap-scale en touch.

### Eficiencia (Parallax / MagneticButton)
- **MagneticButton:** listener `onMouseMove` en el **propio elemento** (solo activo en hover), no global. `(pointer: fine)` para saltar touch. `will-change: transform`. Ref tipada como unión + `as Ref<...>` (sin `any`).
- **Parallax:** `useScroll`/`useTransform` de framer (rAF interno compartido). `will-change: transform`.

---

## 3. Demo aislada — `/[lang]/motion-demo`

- **Ubicación:** bajo `[lang]` (`/es/motion-demo`, `/en/motion-demo`) para heredar el `MotionProvider` del layout y **funcionar con el proxy** sin tocar `proxy.ts` (freeze list).
- **noindex:** `export const metadata = { robots: { index:false, follow:false } }` (verificado: `noindex` en el HTML).
- **NO en `sitemapData.ts`** (no se tocó), **NO enlazada** desde nav/footer.
- Banner "DEV ONLY · borrar o mantener noindex al desplegar".
- Muestra: Reveal interactivo (control de variantes + replay), las 7 variantes, Stagger, TextReveal (word+line), MagneticButton, Shimmer (hover+inView), Parallax, y **STRESS TEST** (12 cards Stagger+Reveal + varios MagneticButton + 2 capas Parallax).

---

## 4. Mediciones

### Render / SSG
Build exit 0 · desglose **20 ƒ / 4 ○ / 107 ●** (la #107 es `motion-demo`, **● SSG/ISR** 1d/1y en es+en). Las demás rutas `[lang]` siguen ● SSG/ISR sin cambio.

### JS / "primitivas no arrastran contenido"
- **First Load de `/es/motion-demo`: 669.7 KB** (13 chunks) — **menor** que home/servicio (~813 KB), porque la demo no carga Header/Footer/ContactForm; las primitivas son ligeras.
- **Contenido server-rendered confirmado** en el HTML: "casos ganados" (TextReveal line), "Card …" (stress), "Acción" (MagneticButton), "Profundidad cinematográfica" (Parallax child). Las islas envuelven children renderados en servidor; el bundle no carga ese contenido.

### CWV / hilo principal (stress test, mobile)
| Perf | LCP | TBT | CLS | Bootup JS | Main-thread |
|---|---|---|---|---|---|
| **95** | 2933 ms | **85 ms** | **0.000** | 726 ms | 1297 ms |

12 cards + 4 capas parallax + varios magnetic buttons **no saturan el hilo principal** (TBT 85ms) y **cero CLS** (transform/opacity only, confirmado).

### Reduced-motion (verificado por DOM con Playwright)
| Estado | Shimmer overlays | Elementos con `transform≠none` |
|---|---|---|
| `no-preference` | 2 | 28 |
| `reduce` | **0** | **24** |

Bajo reduce: Shimmer no se renderiza, y caen 4 elementos transformados (las 4 capas Parallax pasan a estáticas) — coincide con la tabla §8.

### Gates
tsc **0** · build **exit 0** · test **54/54** · lint **506 (200/306) = baseline** (mis archivos: **0 problemas**, **cero `any`** — verificado con eslint sobre `app/components/motion/` y `app/[lang]/motion-demo/`).

---

## 5. Cómo probarlo localmente
```bash
npm run build && npm run start
# abre: http://localhost:3000/es/motion-demo   (o /en/motion-demo)
# reduced-motion: activa "Reducir movimiento" en el SO y recarga
```

---

## 6. Riesgos / notas
- **`blur` sin filtro:** es un scale suave (decisión por la regla transform/opacity). Si quieres blur real, dilo.
- **Demo bajo `[lang]`:** hereda el chrome del layout (CTAs flotantes, JSON-LD de Organization) — inocuo en una página noindex; se puede borrar al final.
- **`MagneticButton` SSR:** `(pointer: fine)` se evalúa en cliente; no afecta el HTML (sin mismatch).
- Freeze list intacta; `public/` sin tocar; nada pusheado.

---

**PARA.** Abre `/es/motion-demo` localmente y aprueba el **FEEL** antes de aplicar a páginas reales (2.1 = pilot Home). ¿Ajustamos timing/easing/intensidad de algún efecto?
