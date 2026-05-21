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
| visa-e2 | ⏳ Pendiente (Lote B) | tabs + acordeón/FAQ |
| visa-u | ⏳ Pendiente (Lote B) | tabs + acordeón/FAQ |
| vawa | ⏳ Pendiente (Lote C) | tabs + acordeón/FAQ |
| defensa-deportacion | ⏳ Pendiente (Lote C) | tabs + acordeón/FAQ |
| asilo | ⏳ Pendiente (Lote C) | tabs + acordeón/FAQ |

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
