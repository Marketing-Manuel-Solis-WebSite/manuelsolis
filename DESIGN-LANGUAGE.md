# DESIGN-LANGUAGE.md — Manuel Solís · Lenguaje de diseño v2

> **Estado: SPEC para aprobación.** No se ha construido ninguna primitiva.
> Fase 2.0 (fundamentos). Las primitivas se construyen en 2.0b **tras tu OK**.
> Todo local (sin push) hasta autorización.

---

## 1. Filosofía y pilares

El refresh persigue tres pilares, en tensión deliberada:

1. **Premium + humano.** Acabado de estudio (Apple/Stripe/Linear) pero al servicio de personas en momentos vulnerables (deportación, accidentes). El lujo nunca debe sentirse frío ni corporativo: la elegancia genera **confianza**, no distancia.
2. **Cinematográfico con propósito.** El movimiento dirige la atención y cuenta una historia (de la incertidumbre a la protección). Nunca decorativo porque sí: cada animación tiene una intención narrativa o funcional. Si no aporta, no existe.
3. **Navy + gold.** `navy-500 #001540` como base de autoridad/serenidad; `gold-500 #B2904D` como acento de valor/acción. La luz dorada = esperanza y el siguiente paso (CTA).

**No-objetivos:** nada de movimiento que maree, que retrase el contenido legal, que rompa SEO/SSR, o que excluya a usuarios con dispositivos modestos o reduced-motion.

---

## 2. Principios de movimiento (reglas duras)

1. **Solo `transform` y `opacity`.** Toda animación se compone en GPU. Prohibido animar `width/height/top/left/margin/box-shadow/filter` en bucle o en reveals (causan layout/paint). Los glows/sombras se pre-declaran como estado, no se animan; si hace falta "encender" un glow, se cross-fadea con `opacity` de una capa.
2. **Reduced-motion es de primera clase.** Ya hay `MotionConfig reducedMotion="user"` global (Fase 1A): con reduce-motion del SO, framer omite transforms y deja solo opacity/color. **Regla de diseño:** todo efecto debe tener un **estado final legible sin movimiento** — el contenido nunca depende de la animación para ser visible (lección del Hero en 1A: el LCP pinta de inmediato, la animación es adorno).
3. **Server-first.** El contenido (texto, estructura, imágenes) se renderiza en el **servidor**; el movimiento vive en **islas-cliente delgadas** que reciben ese contenido como `children` (patrón validado en el pilot 1C con `<Reveal>`). El JS de animación nunca arrastra el contenido al bundle.
4. **El LCP es sagrado.** Ningún elemento above-the-fold candidato a LCP arranca en `opacity:0` ni espera a que cargue el motor de animación (que ahora es lazy, Fase baseline item 1). Reveals con profundidad solo below-the-fold / on-scroll.
5. **Presupuesto de movimiento.** Máximo ~1 efecto "protagonista" por sección. El stagger no supera ~6 elementos visibles a la vez. Duraciones largas (>900ms) solo en hero/transiciones de página.

---

## 3. Tokens de motion (fuente única: `@theme` + `motion.ts`)

Consolidados en Fase 2 (Tarea 2). CSS via `@theme` (utilidades `ease-*`), TS para framer via `app/lib/motion.ts`.

### Easing
| Token (CSS) | Curva | Uso |
|---|---|---|
| `--ease-smooth` / `ease-smooth` | `cubic-bezier(0.25,0.1,0.25,1)` | Microinteracciones, hover. |
| `--ease-out-expo` / `ease-out-expo` | `cubic-bezier(0.16,1,0.3,1)` | Reveals de entrada (entra rápido, asienta suave). **Default de reveals.** |
| `--ease-in-out-quint` / `ease-in-out-quint` | `cubic-bezier(0.76,0,0.24,1)` | Transiciones bidireccionales, líneas, mask reveals. |
| spring `{stiffness, damping}` | — | Hover magnético, badges (vía framer, no CSS). |

### Duración (CSS `--duration-*` ms / framer segundos en `motion.ts`)
| Nombre | ms / s | Uso |
|---|---|---|
| `fast` | 300 / 0.3 | Hover, taps, microinteracciones. |
| `normal` | 600 / 0.6 | Reveals estándar. |
| `slow` | 900 / 0.9 | Reveals con profundidad, scale. |
| `slower` | 1200 / 1.2 | Hero, line/mask reveals, transiciones de página. |

### Stagger
- Base: `0.06–0.08s` entre hijos. Rápido: `0.05s`. `delayChildren: 0.1s`.

### Nuevos tokens que el lenguaje necesita (ya añadidos a `@theme`, sin cablear)
- **Profundidad/glow:** `--shadow-glow-gold`, `--shadow-glow-gold-strong`, `--shadow-glow-blue`.
- **Color:** escalas `--color-navy-200..900`, `--color-gold-50..700` (utilidades `bg-navy-500`, `text-gold-500`, etc.) para migrar los `[#hex]` hardcoded durante el refresh.
- **Pendientes de definir en 2.0b si se aprueban:** escala de elevación (`--shadow-e1..e4`), blur de glass (`--blur-glass-sm/md/lg`), z-index ladder (ya en `design-tokens.ts`).

---

## 4. Catálogo de efectos → primitiva-isla server-first

Cada efecto = una isla cliente que envuelve `children` renderizados en servidor. Todas: solo transform/opacity, y bajo reduced-motion colapsan al estado final (visible, sin transform) salvo nota.

### 4.1 `<Reveal>` — reveal con profundidad
Entrada on-scroll con desplazamiento + leve scale/blur que sugiere profundidad (el elemento "emerge").
- **Movimiento:** `opacity 0→1`, `translateY 24→0`, opcional `scale 0.96→1`. `ease-out-expo`, `duration normal/slow`. `whileInView`, `viewport once`.
- **Reduced-motion:** solo `opacity 0→1` (sin translate/scale).
- **Reemplaza/generaliza** el `<Reveal>` del pilot 1C (ya existe una versión mínima en `app/[lang]/servicios/inmigracion/Reveal.tsx`; 2.0b la promueve a `app/components/motion/Reveal.tsx` compartida).
- **API:**
  ```ts
  <Reveal
    as?='div'|'span'|'p'|'section'|'li'|'a'   // default 'div'
    variant?='up'|'down'|'left'|'right'|'fade'|'scale'|'blur'  // default 'up'
    delay?=number  distance?=number  once?=boolean  amount?=number
    className?  style?  href? id?
  >{children}</Reveal>
  ```

### 4.2 `<Stagger>` — revelado en cascada
Contenedor que escalona la entrada de sus hijos `<Reveal>` (o ítems internos) con delay incremental.
- **Movimiento:** orquesta `staggerChildren` + `delayChildren`; cada hijo usa el reveal estándar.
- **Reduced-motion:** los hijos aparecen (opacity) casi a la vez, sin transform.
- **API:**
  ```ts
  <Stagger gap?=0.07 delayChildren?=0.1 as?='div' className?>
    {children /* cada hijo idealmente <Reveal> o usa <Stagger.Item> */}
  </Stagger>
  // opcional <Stagger.Item> para items que no son Reveal
  ```

### 4.3 `<Parallax>` — parallax por capas
Capas de fondo (orbes, imágenes, texto gigante) que se mueven a distinta velocidad con el scroll, creando profundidad cinematográfica.
- **Movimiento:** `translateY` ligado a `useScroll`→`useTransform` (rango pequeño, p.ej. ±40px). Solo transform. `will-change: transform`.
- **Reduced-motion:** parallax **desactivado** (capa estática). Crítico (riesgo vestibular).
- **Restricción:** solo elementos decorativos/no-LCP. Nunca el texto principal.
- **API:**
  ```ts
  <Parallax speed?=0.2 axis?='y'|'x' className? style?>{children}</Parallax>
  // speed: fracción del scroll (0 = fijo, 1 = se mueve con la página)
  ```

### 4.4 `<MagneticButton>` — hover magnético
CTAs (gold) que atraen suavemente hacia el cursor + leve scale; refuerza la sensación premium y la affordance del siguiente paso.
- **Movimiento:** `translate` hacia el puntero (rango ~6–10px) con spring; `scale 1→1.03` en hover, `0.97` en tap. Solo transform.
- **Reduced-motion:** sin desplazamiento magnético; conserva un `scale` mínimo o nada (configurable). Mantiene foco/hover accesible.
- **Touch:** sin efecto magnético (no hay puntero); degrada a tap-scale.
- **Accesibilidad:** envuelve un `<a>`/`<button>` real (no rompe foco/teclado).
- **API:**
  ```ts
  <MagneticButton as?='a'|'button' strength?=0.3 radius?=120 href? onClick? className?>
    {children}
  </MagneticButton>
  ```

### 4.5 `<Shimmer>` — barrido dorado
Brillo sutil que recorre superficies premium (cards destacadas, badges, CTAs) en hover o al entrar en viewport. Refuerza el "gold = valor".
- **Movimiento:** capa con gradiente dorado, `translateX -100%→100%` (solo transform) sobre `overflow:hidden`. (Ya existe `.shimmer` en CSS; 2.0b lo vuelve isla controlable + token.)
- **Reduced-motion:** desactivado (la capa no se anima; superficie estática).
- **API:**
  ```ts
  <Shimmer trigger?='hover'|'inView' tint?='gold'|'white' className?>{children}</Shimmer>
  ```

### 4.6 `<TextReveal>` — mask reveal de tipografía
Titulares que se revelan línea por línea desde una máscara (el texto "sube" tras un borde), como en el Hero actual (`overflow-hidden` + `translateY 100%→0`).
- **Movimiento:** wrapper `overflow:hidden` por línea; `translateY 100%→0` + `opacity` + leve `rotateX`. `ease-out-expo`, stagger por línea. Solo transform/opacity.
- **Reduced-motion:** texto visible sin máscara (opacity 0→1 o instantáneo).
- **SEO/accesibilidad:** el texto real está en el DOM (server-rendered) dentro de la máscara — los crawlers y lectores de pantalla lo leen completo; la máscara es puramente visual.
- **API:**
  ```ts
  <TextReveal as?='h1'|'h2'|'span' splitBy?='line'|'word' stagger?=0.12 className?>
    {children /* texto/JSX server-rendered */}
  </TextReveal>
  ```

### 4.7 `<ScrollStory>` — scroll storytelling (avanzado)
Secciones donde el scroll dirige una secuencia (pin + progreso): p.ej. "el camino a la residencia" en pasos, o stats que cuentan. Uso muy selectivo (1–2 por sitio).
- **Movimiento:** `useScroll` con `offset`, progreso → opacity/transform de sub-elementos. Sin pin nativo pesado; preferimos sticky + transform.
- **Reduced-motion:** se degrada a lista estática apilada (todo visible, sin secuencia).
- **API:**
  ```ts
  <ScrollStory steps={[...]} className?>{render por progreso}</ScrollStory>
  ```
  (API a detallar en 2.0b; es el efecto de mayor riesgo/coste — proponemos prototiparlo aislado antes de adoptarlo.)

---

## 5. Microinteracciones (patrones)

- **Hover de cards:** `translateY -4px` + `scale 1.01` + cross-fade de un glow dorado (capa opacity), `ease-smooth` `fast`. (Hoy varias usan `hover:scale`/`translate` CSS — se unifican.)
- **Links/CTAs:** subrayado dorado que crece con `transform: scaleX` (origin-left), nunca `width`. Flecha que avanza `translateX` en hover (ya en uso).
- **Focus:** anillo dorado `:focus-visible` (ya en globals.css) — se conserva y se respeta en todas las islas.
- **Estados de carga:** skeletons con shimmer (no spinners donde se pueda).
- **Feedback de tap (touch):** `scale 0.97` breve.

---

## 6. Glass, profundidad y luz

- **Glass:** 3 niveles ya existentes (`.glass`, `.glass-elevated`, `.glass-gold`) → en 2.0b se tokenizan los blur (`--blur-glass-*`) y se reducen en mobile (ya hay media query). Glass siempre sobre navy, con borde sutil (`--border-subtle` gold o `--border-muted`).
- **Profundidad (capas):** fondo (gradiente navy + orbes parallax) → mid (glass cards) → frente (texto/CTA gold). Las sombras de elevación (`--shadow-e1..e4`, a definir) dan jerarquía sin animarse.
- **Luz dorada:** los glows (`--shadow-glow-gold*`) marcan el elemento de acción/valor. Se "encienden" con cross-fade de opacity, nunca animando box-shadow.
- **Grano/textura:** overlay sutil ya existente (`.grain`), desactivado en mobile (perf). Se conserva.

---

## 7. Arquitectura de las primitivas (server-first)

```
app/components/motion/
  Reveal.tsx        ('use client') — generaliza el del pilot 1C
  Stagger.tsx       ('use client')
  Parallax.tsx      ('use client', useScroll/useTransform)
  MagneticButton.tsx('use client', pointer + spring)
  Shimmer.tsx       ('use client')
  TextReveal.tsx    ('use client')
  ScrollStory.tsx   ('use client') — fase posterior / prototipo
  index.ts          (barrel)
```
- Todas son **islas-cliente delgadas** que reciben `children` server-rendered (cero contenido en el bundle).
- Todas leen tokens de `motion.ts` (framer) y `@theme` (CSS) — fuente única.
- Todas bajo el `MotionProvider` global (LazyMotion `domAnimation` lazy + `reducedMotion="user"`). `Parallax`/`useScroll` son hooks standalone (no requieren features extra).
- `strict` sigue vigente: las primitivas usan `m.*`, nunca `motion.*`.

---

## 8. Cómo cada efecto respeta reduced-motion (resumen)

| Primitiva | Con reduced-motion |
|---|---|
| Reveal | solo `opacity` (sin translate/scale/blur) |
| Stagger | hijos aparecen casi a la vez, sin transform |
| Parallax | **desactivado** (estático) |
| MagneticButton | sin imán; tap-scale mínimo o nada |
| Shimmer | **desactivado** (sin barrido) |
| TextReveal | texto visible sin máscara |
| ScrollStory | lista estática apilada |

Implementación: framer `MotionConfig reducedMotion="user"` (ya global) cubre transform-vs-opacity automáticamente; para Parallax/Shimmer/ScrollStory (que no son animaciones framer puras) las islas comprobarán `useReducedMotion()` y se desactivarán explícitamente.

---

## 9. Plan de adopción (tras aprobación)
1. **2.0b — construir primitivas** (este spec), con una página de demo aislada (`/_motion-demo`, noindex, NO en sitemap) para QA visual y de reduced-motion. **Sin tocar páginas reales.**
2. **2.1+ — aplicar por tipo de página**, una a la vez, con screenshot diff vs `docs/baseline-visual/` y gates verdes, server-first (combina con el rollout 1C que además desbloquea Footer-server y baja el First Load).

---

## Restricciones permanentes (recordatorio)
- Freeze list intacta: nada de URLs/slugs, proxy, sitemaps, robots, generateMetadata/canonical/hreflang, JSON-LD.
- No renombrar/borrar `public/`.
- Cerrar en verde (tsc/build/test/lint) y rutas `[lang]` siguen ● SSG/ISR.
- Todo local hasta autorización explícita.

---

**PARA aquí.** Esperando tu aprobación del spec antes de construir las primitivas (2.0b). ¿Apruebas el catálogo y las APIs, o ajustamos algún efecto/prioridad?
