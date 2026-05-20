# FASE-2-1.md — Refresh visual del Home (standard-setter)

> Branch: `mejoras/fase-2-visual` · **Todo LOCAL** (commits, sin push/merge/preview).
> Aplica el lenguaje de diseño aprobado al Home real, server-first, con las primitivas de `app/components/motion/`.

---

## Decisión de alcance (por qué empiezo por el Hero)

El Hero es **lo más delicado** (LCP sagrado) y **el standard-setter** del rollout, y **no puedo ver el render** — solo tú puedes juzgar el FEEL. Por eso, en lugar de aplicar a ciegas un lenguaje no validado a las 7 secciones, **rediseñé el Hero con máxima calidad y PARO para tu aprobación del feel** antes de propagar el mismo patrón a las otras 6 (About, Services, ServiceCategory, Offices, Team, Testimonials). Usa tu cláusula "si el Hero se pone delicado, PARA y pregúntame". **Las otras 6 quedan intactas** (siguen como estaban); el Home funciona y es revisable.

> Si prefieres que haga las 7 de una sin checkpoint, dímelo y continúo.

---

## Hero — rediseño server-first (qué cambió)

`Hero.tsx` pasó de **client component** (920… 377 líneas, `useLanguage`, framer inline, estado `isDesktop`) a **Server Component** que renderiza el contenido en servidor y delega el movimiento a las islas:

| Antes | Ahora |
|---|---|
| `'use client'`, `useLanguage()` | Server Component, `lang` por prop (resuelto en `page.tsx`) |
| Popup (estado/efectos/tracking) inline | Isla `HeroPopup.tsx` (comportamiento 1A **idéntico**: 7s/scroll + sessionStorage) |
| `isDesktop` + resize listener para reposicionar la imagen | Posición final por **CSS** (`-translate-y-5 lg:-translate-y-20`) — sin JS |
| Entrada framer inline en cada bloque | Primitivas: `Parallax` (orbes), `Stagger`+`StaggerItem` (copy), `Reveal` (badge/divisor) |
| `bg-[#001540]`, `text-[#B2904D]` hardcoded (en lo que toqué) | utilidades `@theme`: `bg-navy-500`, `text-gold-500`, `from-navy-300 via-navy-500 to-navy-800` (mismo color) |
| `<style jsx global>` (marquee) | `<style>` plano (server-compatible) + regla `prefers-reduced-motion` añadida al marquee |

### Efecto(s) protagonista (presupuesto de movimiento respetado)
- **Parallax** en los 2 orbes decorativos del fondo (profundidad cinematográfica, distinta velocidad) — **jamás** sobre la imagen/texto LCP.
- **Stagger** del bloque de copy (Más de → Casos Ganados → headline → tagline) en una cascada cohesiva (el efecto protagonista).
- **Reveal** sutil en el badge "35+" y el divisor.
- 1 efecto protagonista + acentos: no saturado.

### LCP SAGRADO (rule c) — cómo se preservó
- **Imagen `/manuelsolisl.png`**: `priority` + `fetchpriority=high`, renderizada en servidor, **sin opacity-gate**, posición final por CSS (no espera al motor de animación). Verificado en HTML.
- **"50,000"**: estático, server-rendered, **NO** envuelto en Stagger/Reveal (no se gatea). Verificado: sin `opacity:0`.
- Las animaciones (orbes, cascada de copy) son **adorno**; el LCP pinta primero.

---

## Validación

### Render / SSG / gates
- Home `/[lang]` sigue **● SSG/ISR** (1h/1y). Build exit 0 (107 ● incl. demo).
- **tsc 0** · **test 54/54** · **lint 505 (200/305)** — **bajó** de 506 (sin nuevos `any`; mis archivos: 0 problemas).

### SEO (idéntico a antes — freeze list intacta)
- canonical `https://www.manuelsolis.com/es` ✓
- hreflang es/en/x-default ✓
- aggregateRating (4.3) del JSON-LD de Organization (layout, sin tocar) ✓
- No se tocó `generateMetadata`/canonical/hreflang/JSON-LD.

### Imágenes
- Todas las de `public/` conservadas (retrato, logos del marquee). Ninguna renombrada/borrada.

### First Load JS (Home `/es`)
| Antes | Después |
|---|---|
| 813.0 KB | **813.5 KB** (≈ igual) |

**Honesto:** el Hero es liviano (imagen + pocos strings) y las islas nuevas (Reveal/Stagger/Parallax/Popup) compensan el contenido que sale al servidor → First Load **plano**. La **baja real de First Load llegará de las secciones con mucho texto** (About/Services/Testimonials), que migraré tras tu OK. El valor del Hero aquí es **arquitectura server-first + lenguaje de diseño + LCP limpio**, no reducir JS.

### CWV (mobile, 2 corridas) vs BASELINE §3.1
| Métrica | BASELINE | Hero nuevo (run1/run2) |
|---|---|---|
| Perf | 84 | 86 / 90 |
| **LCP** | 4118 ms | **3501 / 3494 ms** (mejora) |
| TBT | 164 ms | 255 / 127 ms (run2 limpio) |
| **CLS** | 0.001 | **0.001 / 0.001** (sin regresión) |

LCP **no regresa** (mejora ~620ms vs baseline), CLS perfecto. (run1 TBT 255 = ruido de máquina; run2 127 representativo.)

### Visual (screenshots en `docs/fase-2-1/`, diff vs `docs/baseline-visual/`)
- **home-en-desktop: 0.1% dif** → el Hero nuevo **asienta al mismo aspecto final** que el anterior (preservé layout/contenido/imagen; cambió solo la *entrada* + server-first). Esto es lo esperado y deseable.
- home-es-mobile 9.1%, en-mobile 6.2%, es-desktop +1054px de alto: dominados por **no-determinismo de las secciones dinámicas** (About/Services/Team/Offices/ContactForm con `dynamic()` + placeholders `h-[600/800px]`) que **NO toqué** — sus estados de carga/reveal varían entre capturas. Confirmado por inspección visual: el Hero renderiza correcto, todas las secciones presentes, layout no roto.

---

## Decisiones / flags para ti

1. **El Hero NO tiene CTA primario** en el diseño actual (solo imagen + texto + marquee). El spec sugería `MagneticButton` en el CTA del hero, pero **añadir un botón cambiaría la IA** (rule d) → **NO lo añadí**. ¿Quieres que añada un CTA primario magnético al Hero (p. ej. "Consulta gratis")? Lo marco y espero tu decisión.
2. **TextReveal NO se usó en el headline** "Inmigración & Accidentes": tiene 3 spans con estilos distintos (el "&" dorado) que el split por palabra rompería. Preferí preservar el estilo exacto envolviéndolo en `Stagger`. TextReveal lucirá en headers de sección simples (About/Services) en el siguiente paso.
3. **Imagen sin entrada de scale**: antes la imagen hacía `scale 0.9→1` (framer). Lo quité para que el LCP pinte 100% inmediato y no dependa del motor lazy. Si quieres una entrada de scale, se puede hacer con CSS (sin gatear). ¿La quieres?

---

## Archivos
- **Modificados:** `app/components/Hero.tsx` (→ server), `app/[lang]/page.tsx` (Home async + `lang` al Hero; metadata/JSON-LD intactos).
- **Nuevos:** `app/components/HeroPopup.tsx` (isla popup), `docs/fase-2-1/` (4 screenshots del Home nuevo).

---

**PARA.** Abre el Home localmente (`npm run build && npm run start` → `http://localhost:3000/es` y `/en`, mobile, y con reduced-motion) y aprueba el **FEEL del Hero** o pide ajustes. Con tu OK (y respuesta a los flags) **propago el mismo lenguaje a las 6 secciones restantes**.
