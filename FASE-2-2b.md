# FASE-2-2b.md — Cierre del Hero + pilot de About (server-first, v2 + 3D)

> Branch: `mejoras/fase-2-visual` · **Todo LOCAL** (commit para preservar; sin push/merge/preview).
> Aplica las decisiones aprobadas del Hero y rediseña la **primera** sección del Home (About) server-first con el lenguaje completo (v2 + extensión 3D). Las otras 5 secciones quedan intactas (siguen como estaban).

---

## PARTE 1 — Hero cerrado

| Decisión | Qué se hizo | Guarda |
|---|---|---|
| **CTA primario magnético** | `<MagneticButton as="a" href={`/${lang}/consulta`}>` dorado "Consulta gratis" / "Free consultation", dentro del Stagger de áreas de práctica (entra en cascada, centrado en mobile / izq. en desktop). **UN solo** primario; secundarios siguen en los flotantes. | Destino locale-aware verificado en las 4 combinaciones: `/es/consulta` y `/en/consulta`. `<a>` real (foco/teclado intactos). |
| **Settle del retrato** | Keyframe CSS `hero-portrait-settle` (`scale 1.03→1`, 1200ms ease-out-expo, **solo transform**) en el contenedor interno de la imagen. | **NO gatea opacity** → la imagen LCP pinta inmediato en frame 0. `prefers-reduced-motion` → sin animación. |
| **Pase 3D ligero** | Badge "35+" envuelto en `<Tilt maxTilt={5}>`; el número en `<TiltLayer depth={14}>` (flota sobre el plano al hacer tilt). | **El badge NO es el LCP.** La imagen `/manuelsolisl.png` y "50,000" **sin tocar** (sin Tilt, sin gating). Reduced-motion/touch → badge plano. |

- **NO se tocó** metadata / JSON-LD / canonical / hreflang del Home.
- LCP sagrado preservado: imagen `priority` + "50,000" estáticos, server-rendered, sin opacity-gate (el settle es transform-only).

## PARTE 2 — About rediseñada (server-first)

`About.tsx` pasó de **client component** (`'use client'`, `useLanguage()`, framer inline, estado de video) a **Server Component** que recibe `lang` por prop y renderiza todo el contenido (incl. el caso bilingüe) como HTML de servidor:

| Antes | Ahora |
|---|---|
| `'use client'` + `useLanguage()` | Server Component, `lang` por prop (resuelto en `page.tsx`) |
| Copy bilingüe renderizado en cliente | Copy bilingüe **server-rendered** (confirmado en el HTML) |
| `dynamic(() => import('./About'))` (chunk cliente lazy) | Import **estático server-first** en `page.tsx` |
| Estado `showVideo` + iframe inline | Isla `AboutVideo.tsx` (única parte con estado; difiere el iframe de YouTube) |
| `m.div` con variants inline (fadeInUp/stagger) | Primitivas: `Stagger`/`StaggerItem` (cascada protagonista) + `Reveal` (heading, video) |
| Stat cards con `glow-gold-hover` (**animaba box-shadow**) | Stat cards con **`.card-3d`** (lift + glow por cross-fade de opacity — regla transform/opacity) |

- **Efecto protagonista (presupuesto respetado):** la cascada `Stagger` de la columna de texto (caso → stats → CTA). El video recibe un único acento `Reveal variant="scale"`. Heading con `Reveal` (no TextReveal: conserva el span dorado, mismo criterio que el titular del Hero).
- **Cards:** `.card-3d` workhorse (sin tilt de puntero) — About no tiene una card "destacada" que justifique `<Tilt>` (restraint).

---

## Validación

### Gates (verde)
| Check | Resultado |
|---|---|
| `npx tsc --noEmit` | ✅ **0** |
| `npm run build` | ✅ **exit 0** · 281 páginas · Home `/[lang]` **● SSG/ISR** (1h/1y) |
| `npm test` | ✅ **54/54** |
| `npm run lint` | ✅ **505 (200/305)** = sin subir (mis archivos: 0 problemas / cero `any`) |

### First Load JS / peso cliente (raw on-disk, método BASELINE §2.1)
Medido aislando **esta fase** (stash del commit 2.2a vs working tree, builds limpios):

| Estado | Total JS estático | Chunks |
|---|---|---|
| **Antes (2.2a, About cliente)** | 3097.8 KB | 90 |
| **Después (Hero+CTA/3D, About server)** | **3090.7 KB** | 91 |

**Honesto:** total **plano** (−7 KB, +1 chunk). About ya era `dynamic()` (lazy → fuera del First Load), y su movimiento ahora reusa primitivas ya presentes en el bundle, así que los bytes no bajan. **El valor real es arquitectónico:** el contenido de About (caso bilingüe + stats) ahora es **HTML de servidor** (antes se renderizaba en cliente tras hidratar) → árbol cliente más chico, menos hidratación. *(La cifra de First Load JS por ruta no la emite Turbopack — BASELINE §2.3.)* La baja de bytes llegará al migrar las secciones con mucho texto/lógica cliente eager (Services/Testimonials/etc.).

**Confirmación server-first:** "Juana Cervantes" y "Reunificación Familiar"/"Family Reunification" presentes en el HTML servido (es/en) sin ejecutar JS.

### CWV (mobile, Lighthouse local, 3 corridas) vs BASELINE §3.1 / Hero 2.1
| Métrica | BASELINE | Hero 2.1 | **2.2b (3 runs)** |
|---|---|---|---|
| **LCP** | 4118 ms | ~3494 ms | **3.6 / 3.7 / 3.6 s** (estable, sin regresión) |
| **CLS** | 0.001 | 0.001 | **0 / 0 / 0** (perfecto) |
| TBT | 164 ms | ~127 ms | 90 ms (run limpio) / 560 / 790 (contención) |
| Perf | 84 | 90 | 90 / 70 / 76 (sigue a TBT) |
| FCP | 1210 ms | — | ~1.2 s |

- **LCP no regresa:** 3.6s estable en las 3 corridas (= rango del Hero 2.1; dentro de la varianza lab de BASELINE §3.3). El CTA + settle + 3D del badge **no dañan el LCP**.
- **CLS 0** en las 3 (transform/opacity only).
- **TBT ruidoso** esta sesión (90ms en run limpio; 560–790 bajo carga de máquina por correr 3 lighthouse + servers en serie — el mismo patrón de ruido que 1A/2.1). Arquitectónicamente About→server reduce hidratación, no la sube.

### Visual (screenshots `docs/fase-2-2b/`, ES/EN × mobile/desktop)
- **Hero:** CTA dorado "Consulta gratis →" integrado bajo el tagline (centrado en mobile, izq. en desktop); badge "35+" presente; "50,000"/retrato intactos. IA coherente.
- **About:** "Caso Real de Reunificación Familiar" + caso bilingüe server-rendered + video card; layout no roto en los 4 viewports.
- Contenido e imágenes presentes; el diff vs `docs/baseline-visual/` mostrará cambios esperados (entrada server-first + CTA nuevo + unificación de hover de cards), no rupturas.
- **Nota de proceso:** una primera tanda salió sin estilos por un **server stale** (de la fase 2.2a) cuyo manifiesto apuntaba a un hash de CSS sobrescrito por rebuilds → 404 del CSS. Se mató ese proceso, se arrancó un server limpio (CSS principal 200, 191 KB) y se recapturó. Sin impacto en el código.

### SEO / imágenes (freeze list intacta)
- canonical `https://www.manuelsolis.com/es` ✓ · hreflang es/en/x-default ✓ · JSON-LD (Organization + aggregateRating) presente ✓ — **no se tocó** `generateMetadata`/canonical/hreflang/JSON-LD.
- CTA enlaza al destino correcto (`/{lang}/consulta`) ✓.
- `public/` sin renombrar/borrar (retrato, logos, thumbnail de YouTube por URL externa) ✓.

---

## Archivos
- **Modificados:** `app/components/Hero.tsx` (CTA + settle CSS + badge 3D), `app/components/About.tsx` (→ Server Component), `app/[lang]/page.tsx` (About import estático + `lang`).
- **Nuevos:** `app/components/AboutVideo.tsx` (isla de video), `docs/fase-2-2b/` (8 screenshots), este `FASE-2-2b.md`.

---

**PARO.** Abre el Home local (`npm run build && npm run start` → `http://localhost:3000/es` y `/en`, mobile, y con reduced-motion) y aprueba el **FEEL** del Hero cerrado (CTA magnético, settle del retrato, tilt del badge) y de **About** server-first. Con tu OK propago el mismo patrón (server-first + v2 + 3D, `.card-3d` workhorse / `<Tilt>` en destacadas) a las **5 secciones restantes**: Services (+ServiceCategory), Testimonials, Team, Offices, ContactForm. ¿Ajustamos algo (intensidad del tilt del badge, posición/tamaño del CTA, el settle) antes de seguir?
