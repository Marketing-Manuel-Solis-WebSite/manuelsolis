# FASE-BASELINE.md — Aligerar el First Load compartido (todas las rutas)

> Branch: `mejoras/baseline-compartido` (desde `main` con 1A+1B).
> Fecha: 2026-05-20 · Objetivo: bajar el First Load JS que cargan TODAS las rutas (el pilot 1C probó que ahí está el peso).
> **No mergeado.** Rutas `[lang]` siguen **● SSG/ISR** en todos los builds.

---

## Diff de First Load (`/es`, representativo de toda ruta)

| Estado | First Load JS | Chunks | Δ vs anterior |
|---|---|---|---|
| **Baseline (main 1A+1B)** | 859.5 KB | 16 | — |
| **+ Item 1** (domAnimation lazy) | 824.0 KB | 15 | **−35.5 KB** |
| **+ Item 2** (CTAs lazy) | **813.0 KB** | 15 | **−11.0 KB** |
| **Acumulado (1+2)** | **813.0 KB** | | **−46.5 KB (−5.4%)** |

> Items 3, 4 y 5 **no aportaron cambios de código** (ver razones abajo). El ahorro medido viene de los items 1 y 2.

---

## Item 1 — `domAnimation` realmente lazy ✅ APLICADO
- **Antes:** `import { domAnimation }` estático + `features={domAnimation}` → bundleaba el motor de animación en el chunk del provider (layout → First Load de toda ruta).
- **Después:** `features={() => import('./features').then(m => m.default)}` (nuevo `app/components/features.ts`). El motor `domAnimation` (~37 KB) se mueve a un **chunk async** cargado tras hidratación. `strict` + domMax de Testimonios intactos.
- **Resultado:** First Load 859.5 → 824.0 KB. Chunks con marcadores fm: 7 → 6 (303.7 → 268.3 KB). Confirmado: domAnimation ahora `[async/separado]`.
- **Sin regresión:** LCP run limpio 3476 ms / TBT 85 / CLS 0.001 (rango 1A/1B). "50,000" e imagen del hero pintan de inmediato (no opacity-gated); el texto secundario anima un instante tarde (aceptable).

## Item 2 — CTAs flotantes lazy ✅ APLICADO
- Nuevo `app/components/FloatingCtas.tsx` (client) que carga los 4 CTAs con `next/dynamic` `{ ssr: false }`: `WhatsAppButton`, `ConsultaFloatingCta`, `AIChatButton`, `MobileStickyBar`. Reemplaza los 4 imports/renders en `[lang]/layout.tsx`.
- **Resultado:** −11 KB de First Load. Los CTAs **salen del HTML inicial** (confirmado: WhatsApp = 0 en HTML servido) y se cargan client-side tras hidratación → **siguen apareciendo, solo más tarde**. `AIChatButton` (lógica de chat) deferido.
- ⚠️ **Verificación visual pendiente en preview:** con `ssr:false` no puedo confirmar headless que aparecen tras JS; estructuralmente correcto (chunks generados). Recomiendo confirmar en el preview que los 4 CTAs aparecen y son funcionales.

## Item 3 — ContactForm lazy ⚠️ DECISIÓN: no mass-edit (reportado)
**Hallazgo de ubicación:** ContactForm **NO** está montado global — se monta **por página (69 archivos)**, casi siempre en una sección de contacto **below-the-fold**.
- **El home (`[lang]/page.tsx`) YA lo lazy-loadea** (`dynamic()`, línea 86). → en la ruta que mido (`/es`) ContactForm ya está fuera del First Load; el item no movería ese número.
- **`/consulta` lo importa eager** (path de conversión principal) → **lo dejé eager** (regla: no sacrificar conversión por KB). Confirmado SSR'd en el HTML.
- Los otros ~67 archivos lo importan estático en secciones below-fold. **Decisión: NO mass-editar 67 archivos en esta fase** — es desproporcionado/delicado (riesgo de romper formularios en todo el sitio) y no afecta el First Load del home. **Recomiendo follow-up dedicado** (codemod o wrapper con IntersectionObserver) con verificación por página.

## Item 4 — Footer → Server Component ❌ BLOQUEADO (reportado)
- `Footer.tsx` es `'use client'` y se renderiza en **83 archivos**, muchos de ellos **Client Components** (los `*Client.tsx` de cada página).
- **Un Client Component no puede renderizar un Server Component como hijo** → Footer **no puede ser server** hasta que las páginas que lo montan sean Server Components (el rollout estilo 1C, aún no hecho).
- **No aplicado.** Queda condicionado al rollout del patrón 1C a las páginas.

## Item 5 — browserslist / "JS antiguo" (36 KiB) ⛔ REQUIERE TU OK
**Investigación:**
- **No hay `browserslist`** en `package.json` ni `.browserslistrc` → Next usa su target interno por defecto (ya moderno: ~Safari 12+, Chrome 64+, ES2017).
- **No encontré un chunk de polyfills separado** en el build local (no hay `polyfills-*.js`). El "36 KiB legacy JS" de PSI es por tanto **transforms SWC inline** y/o **código pre-transpilado de alguna dependencia** (no un polyfill suelto).
- **Riesgo:** poner un `browserslist` a ciegas puede **no** atacar el culpable real (si son deps pre-transpiladas, browserslist no las cambia) y sí arriesgar compatibilidad.

**Lo que necesito de ti antes de aplicar:**
1. El **detalle del audit "Avoid serving legacy JavaScript"** de PSI (lista los archivos/transforms exactos) — para confirmar si es código nuestro (browserslist ayuda) o de una dependencia (no ayuda).
2. **Aprobar el target.** Propuesta **conservadora** para público de bufete (posibles dispositivos viejos), que aún elimina ES5/IE11:
   ```
   // package.json "browserslist"
   ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 13.1",
    "ios_saf >= 13.4", "and_chr >= 87", "samsung >= 12", "not dead"]
   ```
   - **Cubre:** ~98-99% del tráfico US, incl. iOS 13.4+ (2020), Android Chrome moderno, Samsung Internet 12+.
   - **Descarta:** IE11, Safari ≤13.0, iOS ≤13.3, navegadores stock Android muy viejos (KitKat/Lollipop). 
   - **Tradeoff:** mínimo riesgo para US, pero descarta dispositivos pre-2020 muy antiguos. **Tú decides si es aceptable.**

**No aplicado. Espera tu OK (y el detalle de PSI) — como pediste, no minimizo a lo bestia ni aplico sin aprobación.**

---

## Validación
| Check | Resultado |
|---|---|
| Rutas `[lang]` | ✅ siguen **● SSG/ISR** (20 ƒ / 4 ○ / 106 ●, sin cambio) |
| `tsc --noEmit` | ✅ 0 |
| `npm run build` | ✅ exit 0 |
| `npm test` | ✅ 54/54 |
| `npm run lint` | ✅ 506 (200/306) = baseline |
| Smoke ES/EN | ✅ `/es`, `/en`, `/es/consulta` → 200, footer presente, form de consulta SSR'd (eager) |

> **Identidad visual / funcional:** verificación headless limitada. Recomiendo en preview: (a) los 4 CTAs flotantes aparecen y funcionan, (b) el form de consulta envía, (c) animaciones del hero OK.

## CWV local (`/es` mobile, AFTER items 1+2)
Run limpio: Perf 91 · LCP 3476 ms · TBT 85 · CLS 0.001 · FCP 1212. (En rango de 1A/1B; el beneficio real de First Load se ve en producción/edge, no en localhost.)

---

## Resumen ejecutivo
- **Aplicado (items 1+2):** −46.5 KB de First Load en **todas** las rutas (−5.4%), sin regresión, rutas siguen SSG/ISR.
- **Item 3:** home ya lazy; consulta eager (conversión); mass-edit de 67 archivos → follow-up dedicado (no en esta fase).
- **Item 4:** bloqueado por arquitectura (Footer lo renderizan client components); depende del rollout 1C.
- **Item 5:** requiere tu OK + el detalle de PSI antes de tocar browserslist.

**Lectura honesta:** el baseline compartido se aligeró −46.5 KB, pero los mayores bloques restantes (Footer, y el grueso de componentes cliente persistentes) están **acoplados al rollout del patrón 1C** (server components). El lever de 1C y el de baseline se refuerzan mutuamente: convertir páginas a server (1C) desbloquea Footer-server (item 4) y reduce el árbol cliente que hoy domina el First Load.

## Archivos
- **Nuevos:** `app/components/features.ts`, `app/components/FloatingCtas.tsx`.
- **Modificados:** `app/components/MotionProvider.tsx`, `app/[lang]/layout.tsx`.

*Fin. No mergeado. Item 5 pendiente de tu decisión.*
