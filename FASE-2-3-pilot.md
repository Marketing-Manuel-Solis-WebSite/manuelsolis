# FASE-2-3-pilot.md — Rollout plantilla SERVICIOS · pilot /servicios/inmigracion

> Branch: `mejoras/fase-2-visual` · **Todo LOCAL** (commit para preservar; sin push/merge/preview).
> Aplica el estándar del Home aprobado (server-first + v2 + 3D) a la primera página de servicio. Pilot antes de propagar a los otros ~9 servicios.

---

## Tarea 0 — Screenshot-diff fiable

`scripts/shot.mjs` (reutilizable) ahora emula **`reducedMotion: 'reduce'`** + scroll-through fino + un **force-reveal** final (neutraliza cualquier `opacity:0` inline que framer deje pendiente) → las capturas muestran el estado **final visible**.
> **Honesto:** el `fullPage` de Playwright sigue siendo imperfecto en páginas con muchas islas framer (la imagen `priority` del Hero y los `AnimatePresence` capturan inconsistentes en headless). Para evidencia fiable uso **capturas por-sección** (scrollIntoView + viewport), que disparan los reveals correctamente. Ambos métodos confirman: contenido presente, layout intacto.

---

## Pilot — /servicios/inmigracion (server-first, v2 + 3D)

`ImmigrationClient.tsx` pasó de **client component (920 líneas)** a **Server Component**. Split:

| Archivo | Rol |
|---|---|
| `immigrationData.ts` (nuevo, sin directiva) | Datos bilingües (`mainCases`, `processSteps`, `ui`) + helper `getText`. Importable por server y cliente. |
| `ImmigrationClient.tsx` (→ Server Component) | Toda la página server-rendered: Hero, servicios especializados, proceso, artículos, contacto. Movimiento en islas `Reveal`/`Stagger`; cards con `.card-3d`; CTA del Hero magnético (`MagneticButton`). |
| `ImmigrationCases.tsx` (nuevo, isla cliente) | La **única** parte interactiva: las tabs de "Soluciones Legales" (estado `selectedTab` + `AnimatePresence`). |

- **Presupuesto de movimiento:** 1 protagonista por sección (Stagger del grid / Reveal del header). Cards (`servicios especializados`, `proceso`, `artículos`) → `.card-3d` workhorse. No `<Tilt>` (no hay card destacada). CTA del Hero → `MagneticButton`.
- **LCP sagrado:** la imagen `immigration-hero.png` (`priority`) y el **H1 se renderizan estáticos en servidor, sin opacity-gate** (antes el H1 se animaba con framer `initial opacity:0` → ahora pinta inmediato). Verificado en HTML.
- **Código muerto eliminado:** el `<video>`/`isPlaying`/`videoRef` estaba declarado pero nunca se renderizaba — removido.
- Orbes de fondo animados (infinitos) → **estáticos** (menos efectos cliente).
- Imágenes conservadas (`immigration-hero.png`, blog thumbnails) — sin renombrar/borrar.

---

## GUARDA CRÍTICA — Freeze list (SEO/rich results) INTACTA

El `page.tsx` **no se tocó** salvo pasar `lang` al componente. Diff completo de `page.tsx`:
```diff
-      <ImmigrationClient />
+      <ImmigrationClient lang={lang === 'en' ? 'en' : 'es'} />
```
`generateMetadata`, `canonical`/`hreflang`, y los 3 JSON-LD (**LegalService**, FAQPage, BreadcrumbList) son **byte-idénticos**. Verificado en el HTML servido:
- canonical `https://www.manuelsolis.com/es/servicios/inmigracion` ✓
- hreflang es/en/x-default ✓
- `"@type":"LegalService"` presente (vía `next/script`, sin cambios) · `FAQPage` ✓ · `BreadcrumbList` ✓

---

## Validación

### Gates (verde)
| Check | Resultado |
|---|---|
| `npx tsc --noEmit` | ✅ **0** |
| `npm run build` | ✅ **exit 0** · `/[lang]/servicios/inmigracion` **● SSG/ISR** (1d/1y, es+en) |
| `npm test` | ✅ **54/54** |
| `npm run lint` | ✅ **485 (187 err / 298 warn)** — bajó de 492 (se eliminó el `any`/código cliente del viejo client) |

### First Load JS de /servicios/inmigracion (raw on-disk, suma de chunks referenciados por el HTML)
| Estado | Route JS | On-disk total (sitio) |
|---|---|---|
| **Antes (client pesado)** | 805.6 KB | 2991.7 KB |
| **Después (server-first)** | **777.3 KB** | **2963.4 KB** |
| **Δ** | **−28.3 KB (−3.5%)** | **−28.3 KB** |

**Honesto:** la baja es real pero **modesta**, no "fuerte". Razones: (1) el grueso de los chunks es framework/framer **compartido** (no específico de la ruta); (2) los datos de las **tabs (`mainCases`, el mayor bloque de contenido) siguen en cliente** por necesidad — la isla los cambia en vivo y sus iconos (componentes lucide) no son serializables como props server→cliente. Lo que sí salió a servidor: todo el markup + copy de Hero, servicios especializados, proceso, artículos y el encabezado de contacto. El beneficio mayor es **arquitectónico** (contenido en HTML de servidor, menos hidratación → TBT) y **SEO/LCP** (H1 estático).

### CWV (mobile, Lighthouse local) vs BASELINE §3.1
> Nota: la sesión tenía contención de máquina (un `experimental-analyze` colgado consumía CPU); tras matarlo, corrida limpia:
| Métrica | BASELINE | **Pilot (run limpio)** |
|---|---|---|
| Perf | 78 | **84** ⬆️ |
| **LCP** | 4438 ms | **~4.5 s** (≈ igual — el LCP es la imagen `priority`, sin cambios) |
| **TBT** | 308 ms | **70 ms** ⬇️ (menos JS cliente) |
| **CLS** | 0.000 | **0** |

LCP plano (mismo elemento LCP), **TBT baja fuerte (308→70)** por el recorte de JS cliente, CLS perfecto, Perf sube.

### Visual (screenshots `docs/fase-2-3/`, por-sección ES/EN × desktop/mobile)
- Hero (imagen + "Abogados de Inmigración / Expertos en EE.UU." + badge 20k+ + CTA magnético "Consulta Ahora"), tabs de Casos (detalle + 15 oficinas + estrategias), proceso, artículos, contacto — todo presente, layout intacto, ES y EN.
- Contenido server-rendered confirmado en HTML (ES+EN): "Abogados de Inmigración", "Soluciones Legales", "Tu Ruta Hacia el Estatus Legal", "Recursos Legales", "Defensa contra la Deportación", "Oficinas Disponibles".

### Otros
- Se quitó un `id="contacto"` duplicado (mi wrapper + el `<section id="contacto">` de ContactForm) — el ancla vive ahora solo en la sección del form.

---

## Archivos
- **Nuevos:** `immigrationData.ts`, `ImmigrationCases.tsx` (isla), `scripts/shot.mjs` (herramienta de diff).
- **Reescrito:** `ImmigrationClient.tsx` (client 920 líneas → Server Component).
- **Modificado:** `page.tsx` (solo `lang` prop — freeze list intacta), `docs/fase-2-3/` (12 screenshots), este doc.

---

**PARO.** Revisa `/servicios/inmigracion` local (`npm run build && npm run start` → `http://localhost:3000/es/servicios/inmigracion` y `/en`, mobile, reduced-motion): server-first, lenguaje v2 + 3D, tabs interactivas, SEO intacto. Con tu OK propago el patrón a los servicios restantes: **servicios** (hub), **accidentes, ley-criminal, familia, seguros, visa-e2, visa-u, vawa, defensa-deportacion, asilo** (cada uno: convertir su `*Client.tsx`, freeze list intacta, gates + diff). ¿Apruebas el patrón del pilot o ajustamos algo (intensidad 3D, CTA magnético, manejo de las tabs)?
