# FASE-2-3-landings.md — Rollout plantilla LANDINGS (ciudad×servicio)

> Branch: `mejoras/fase-2-visual` · **Todo LOCAL** (commit; sin push).
> **Una conversión → 25 rutas:** las 25 landings se renderizan por el componente compartido `CityServiceLanding.tsx`.

## Tarea 1 — inspección (reporte)
- Las **25** rutas de landing (`abogado-inmigracion-houston`, `defensa-deportacion-chicago`, `visa-u-los-angeles`, `asilo-politico-houston`, etc.) importan **todas** el mismo `app/components/CityServiceLanding.tsx`. Ninguna usa un componente distinto.
- (`cityServiceData.ts` tiene 32 slugs; 25 tienen ruta `page.tsx` propia — coincide con "~25".)
- El componente era **`'use client'` + `useLanguage` pero SIN estado interactivo** (no `useState`/`AnimatePresence`/video; el FAQ usa `<details>` **nativo**). → Conversión limpia a **Server Component puro** (solo islas de movimiento).

## Tarea 2 — conversión (1 componente)
`CityServiceLanding.tsx` → **Server Component** (`lang` prop en vez de `useLanguage`). Los datos bilingües llegan por props desde cada `page.tsx` (server) y se resuelven a `[lang]` en servidor → **enfoque (b)**: el idioma inactivo no llega al bundle cliente. Lenguaje del Home: `Reveal`/`Stagger` de entrada, `.card-3d` en las grids de cards, `MagneticButton` en el CTA tel del hero y el CTA final. FAQ `<details>` nativo conservado (server-rendered). `ContactForm` ahora import directo con `lang`. **LCP sagrado:** el H1 de texto (no hay imagen hero) se renderiza estático, sin gating.

- **`cityServiceData.ts` NO se tocó** (estructura/slugs/datos intactos → sitemap + generateStaticParams sin cambios).
- Las **25 `page.tsx`**: única edición = `lang={currentLang}` al render de `<CityServiceLanding>` (diff = **1 línea** por archivo). `generateMetadata` + los `<Script>` JSON-LD **byte-idénticos**.

## Validación

### Gates (verde)
tsc **0** · build **exit 0** · test **54/54** · lint **418 (153/265)** = sin subir · las **25 rutas ● SSG/ISR** (es+en).

### Freeze list — 4 representativas (distintos city×service) verificadas en HTML
| Ruta | canonical | hreflang | JSON-LD | page.tsx diff |
|---|---|---|---|---|
| abogado-inmigracion-houston | ✓ | es/en/x-default | LegalService + FAQPage + BreadcrumbList presentes | 1 línea (lang) |
| defensa-deportacion-chicago | ✓ | es/en/x-default | idem | 1 línea (lang) |
| visa-u-los-angeles | ✓ | es/en/x-default | idem | 1 línea (lang) |
| asilo-politico-houston | ✓ | es/en/x-default | idem | 1 línea (lang) |

> Los JSON-LD se inyectan vía `next/script` (igual que antes; presentes en el HTML, Googlebot los ejecuta). No se añadió ni quitó nada — diff byte-idéntico.

### First Load JS
| Métrica | Valor |
|---|---|
| route JS por landing (después) | **750.7 KB** (idéntico en las 25 — componente compartido) |
| on-disk total (sitio) | 2604.0 → **2564.4 KB (−39.6 KB)** |

Una sola conversión del componente compartido bajó el First Load de **las 25 rutas** a la vez (el código cliente + el idioma inactivo salieron del bundle).

### Visual (screenshots `docs/fase-2-3-landings/`, capturas de viewport)
Hero + secciones de 4 representativas (inmigracion-houston, visa-u-los-angeles, defensa-chicago, asilo-houston), ES/EN — H1, trust bar, servicios, oficina, casos, FAQ, ciudades, CTA final presentes; layout 1:1; el esquema sky/gold original conservado.
> Nota: el `fullPage` de Playwright sigue dejando headers `whileInView` en blanco (artefacto headless); las **capturas de viewport** (scroll a cada zona) confirman el render real, coherente con el contenido verificado por curl en el HTML de servidor.

### Imágenes
Sin imágenes hero en esta plantilla (hero de texto). `ContactForm` y assets sin tocar.

---

**PARO — cierre de plantilla landings.** Revisa 3–4 landings distintas (`/es/abogado-inmigracion-houston`, `/es/defensa-deportacion-chicago`, `/es/visa-u-los-angeles`, `/es/asilo-politico-houston`), EN/mobile/reduced-motion. Con tu OK paso a la **siguiente plantilla: oficinas** (las 15 páginas `/oficinas/[ciudad]` + el hub `/oficinas`).
