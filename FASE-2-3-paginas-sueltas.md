# FASE-2-3-paginas-sueltas.md — Rollout plantilla E: PÁGINAS SUELTAS

> Branch: `mejoras/fase-2-visual` · **Todo LOCAL** (commit; sin push).
> La plantilla más heterogénea: 15 páginas bespoke con interactividad variada y **guardas explícitas** (testimonios morph, consulta/join-in forms). Tratamiento **por página** según su naturaleza.

## Triaje + tratamiento

### A) Convertidas a Server Component puro (enfoque b) — 6
Presentacionales (solo `useLanguage`, sin estado real). Server-first: `lang` prop, orbes estáticos, hero estático (LCP), Reveal/Stagger/`.card-3d` donde hay grids. `page.tsx` threadea `lang` (sin JSON-LD que tocar, salvo metadata intacta).
- **clientes**, **informacion/noticias** ("en construcción" — texto fijo).
- **clientes-detenidos** (grid de recursos → Stagger+`.card-3d`).
- **privacidad**, **sms-terminos** (legal: secciones a `<div>`/estáticas, texto byte-idéntico).
- **nosotros** (`isMobile`→orbes estáticos desktop-only; secciones en `Reveal`; `ContactForm` con `lang`).

### B) Ya server-first (sin cambios) — 2
- **terminos** (texto legal inline) y **politica-editorial** (contenido + JSON-LD inline) ya eran Server Components. Se dejan intactas (freeze 100%).

### C) Pase visual / guardas preservadas (siguen islas cliente por interactividad real) — 7
Mantienen `'use client'`; **orbes de fondo → estáticos** (consistencia + reduced-motion); guardas intactas:
- **consulta** (GUARDA form): orbes estáticos; **mouse-spotlight + `<ContactForm>` intactos** (envío/BotID sin tocar).
- **acceso-clientes**: orbes estáticos; mouse-spotlight intacto.
- **testimonios** (GUARDA morph): **solo** orbes de fondo estáticos; `layoutId` + `<LazyMotion domMax>` + `AnimatePresence` (el morph de Fase 1A) **intactos**.
- **join-in** (GUARDA form): `<form>`+`onSubmit`+`fetch` intactos; no tenía orbes de loop → sin cambios.
- **inversionistas**: orbes estáticos; header con language-switcher + tabs (`selectedTab`) intactos.
- **informacion/faq** (GUARDA FAQ): el acordeón `Accordion` → **`<details>` nativo** ⇒ **las respuestas ahora se renderizan en el DOM (server-rendered)** y el toggle no necesita JS. **`FAQPage` JSON-LD preservado**. (El hero animado sigue client.)
- **informacion/recursos**: `AccordionSection` → **`<details>` nativo** ⇒ respuestas en el DOM. (Sigue client por `useLanguage` + `<video>`.)

## Validación

### Gates (verde)
| Gate | Resultado |
|---|---|
| `tsc --noEmit` | **0 errores** |
| `npm run build` | **exit 0** (281 páginas) |
| `npm test` | **54/54** |
| lint | **293 (57 errores / 236 warnings)** — bajó desde 313; **no sube** |
| rutas | las **15 ● SSG** (es+en) |

### Freeze list
- **Convertidas (A)**: `page.tsx` solo añade `await params` + `localeLang` + prop `lang` (clientes-detenidos = 1 línea; resto 3/1). `generateMetadata`/canonical intactos; ninguna tiene JSON-LD propio salvo metadata.
- **Visual/guardas (C)**: **0 cambios en sus `page.tsx`** (solo el `*Client.tsx`). 
- **faq**: `FAQPage` JSON-LD byte-idéntico (verificado en HTML servido); las respuestas pasaron de condicionales (no en DOM) a **server-rendered** dentro de `<details>` — mejora de SEO/accesibilidad sin tocar el schema.

### Freeze-byte en HTML servido
- `/es/informacion/faq`: canonical correcto; **`FAQPage`** presente; respuesta de ejemplo ("indemnización que le corresponde") **en el DOM** ✓.
- `/es/informacion/recursos`: **6 `<details>`** server-rendered (respuestas en DOM) ✓.
- `/es/testimonios`: HTTP 200, contenido renderiza (morph preservado) ✓.
- `/es/consulta`: HTTP 200, "Consulta Confidencial"/"Hablemos de tu" + form ✓.
- `/en/privacidad`: HTTP 200 ✓.

### First Load JS (on-disk, bytes raw de `.next/static/chunks`)
| Métrica | Valor |
|---|---|
| antes (post-newsletter) | 2247.5 KB |
| después | **2118.5 KB (−129.0 KB)** · 64 chunks |

Las 6 conversiones a server sacaron del bundle sus componentes cliente + el idioma inactivo.

### Manejo especial / notas
- **acceso-clientes** y **consulta** comparten el patrón mouse-spotlight (`useMotionValue`/`useMotionTemplate` + `onMouseMove`) → permanecen islas cliente (el spotlight es interactivo). Se conservó el spotlight; orbes estáticos.
- **testimonios**: solo se de-animaron los orbes de fondo; el morph `layoutId`/`domMax` no se tocó (riesgo alto — guarda).
- **faq/recursos**: la conversión del acordeón a `<details>` es la mejora clave (respuestas server-rendered) sin convertir toda la página (sus heros/video siguen client).
- **terminos/politica-editorial**: ya server-first; sin cambios.

---

**PARO — cierre de plantilla páginas sueltas (última del rollout A→E).** Spot-check sugerido: `/es/informacion/faq` (abrir respuestas — ya en DOM), `/es/testimonios` (morph al abrir testimonio), `/es/consulta` + `/es/join-in` (enviar formulario), `/es/nosotros`, `/es/privacidad`. EN / mobile / reduced-motion. **Siguiente: consolidado final `FASE-2-3-ROLLOUT-FINAL.md`.**
