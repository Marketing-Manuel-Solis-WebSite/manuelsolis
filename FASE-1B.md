# FASE-1B.md — Recuperar estático/ISR en rutas `[lang]` (implementación)

> Branch: `mejoras/fase-1b-static` (desde `main` @ `686619b`, con 1A ya mergeado).
> Fecha: 2026-05-20 · Decisiones aprobadas: Opción A para `<html lang>`, `revalidate=86400`, `GOOGLE_PLACES_API_KEY` confirmada en build.
> **No mergeado** — a la espera de tu revisión.

---

## 1. Cambios (solo 2 archivos)

### `app/layout.tsx` (root)
- **Eliminado** `import { headers } from "next/headers"` y las 2 líneas `const headersList = await headers(); const lang = ...`.
- Función **ya no es `async`**.
- `<html lang={lang}>` → **`<html lang="es"`** (estático, locale por defecto).
- El `LangSetter` existente (en `app/[lang]/layout.tsx`) sigue corrigiendo `<html lang>` a `"en"` en cliente para rutas `/en`. **No se tocó** `LangSetter` ni nada más.
- Confirmado: `headers()` **no se usaba para nada más** en el archivo.

### `app/[lang]/layout.tsx`
- **Añadida** una sola línea de config de segmento: `export const revalidate = 86400;` (+ comentario).
- **NO se tocó** nada más: JSON-LD `Organization`/`WebSite`, `generateMetadata`, canonical/hreflang, `getPlaceData`, providers, CTAs, scripts de analytics — todo intacto.

`git diff --stat`: `app/[lang]/layout.tsx` +7 · `app/layout.tsx` +14/−6 → 2 archivos, 15 inserciones, 6 borrados. **Ningún archivo de la freeze list tocado** (`googleReviews.ts`, `proxy.ts`, `seoRedirects.ts`, `robots.ts`, `sitemap*`, `public/` sin cambios).

---

## 2. Desglose de tipo de render (ANTES vs DESPUÉS)

| | ƒ Dynamic | ○ Static | ● SSG/ISR |
|---|---|---|---|
| **ANTES** (main + 1A) | **128** | 2 | 0 |
| **DESPUÉS** (1B) | **20** | 4 | **106** |

- **126 rutas de contenido `[lang]` pasaron de `ƒ Dynamic` → `● SSG/ISR`** (la tabla del build ahora incluye columna `Revalidate / Expire`).
- Los **20 ƒ restantes son exactamente los que deben seguir dinámicos**: 3 admin (`/[lang]/admin*`, noindex) + 9 API routes + 1 RSS + 7 sitemaps dinámicos. **Cero contenido indexable quedó dinámico.**
- `/robots.txt` y `/sitemap.xml` siguen `○` (+2 estáticas adicionales).

---

## 3. ⭐ CRÍTICO — `aggregateRating` idéntico (diff byte-a-byte)

Captura **ANTES** (sobre main, server dinámico) vs **DESPUÉS** (1B, HTML estático/ISR):

```
"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.3","bestRating":"5",
"worstRating":"1","ratingCount":984,"reviewCount":984},"review":[{"@type":"Review",
"author":{"@type":"Person","name":"Cindy Martinez"}, ...
```

| Ruta | `diff` antes vs después |
|---|---|
| `/es` | **✅ IDÉNTICO** (218 bytes, byte-a-byte) |
| `/en/servicios/visa-u` | **✅ IDÉNTICO** |
| `/es` tras restaurar key/build | **✅ IDÉNTICO** |

El `aggregateRating` (mismo `ratingValue 4.3`, `ratingCount 984`) + el array `review` quedan **embebidos en el HTML estático**, idénticos a la versión dinámica. Ahora se resuelven en build/ISR (vía `getPlaceData` → `unstable_cache`) en lugar de por request, y se refrescan cada 24h.

---

## 4. Test de fallback sin `GOOGLE_PLACES_API_KEY`

Procedimiento: aparté `.env.local`, **limpié `.next`** (para que `unstable_cache` no devolviera el rating cacheado y `getPlaceDataRaw` se ejecutara de verdad), y reconstruí.

| Check | Resultado |
|---|---|
| `npm run build` sin key | ✅ **completa** (exit 0, 279 páginas) |
| `aggregateRating` en `/es` | ✅ **omitido** (`grep -c` = **0**) |
| `review[]` en `/es` | ✅ omitido (0) |
| Organization JSON-LD | ✅ **intacto**: `"@type":["LegalService","LawFirm"]`, `@id "#organization"`, `name`, etc. presentes |

Es decir: sin key → el rating se omite **limpio** y el resto del schema `Organization` queda intacto — exactamente como hoy. Tras el test **restauré la key, limpié `.next` y reconstruí** (estado correcto: 106 ● SSG; rating de vuelta e idéntico).

---

## 5. `<html lang>`, canonical, hreflang, Content-Language

| Señal | `/es` | `/en/servicios/visa-u` | ¿Cambio vs main? |
|---|---|---|---|
| `<html lang>` (SSR) | `es` ✅ | `es` → corregido a `en` en cliente por LangSetter (Opción A, esperado) | sin cambio |
| canonical | `https://www.manuelsolis.com/es` | `https://www.manuelsolis.com/en/servicios/visa-u` | ✅ idéntico |
| hreflang | `es` / `en` / `x-default`→es | `es` / `en` / `x-default`→es | ✅ idéntico |
| Content-Language (header, proxy) | `es` | — | ✅ sin cambio |

> Opción A confirmada: el HTML SSR de `/en` trae `lang="es"` (corregido a `en` tras hidratación por LangSetter). `Content-Language` (proxy) + `hreflang` por página — señales SEO de idioma primarias — **intactas**.

---

## 6. Gates (verde)

| Check | Resultado |
|---|---|
| `npx tsc --noEmit` | ✅ 0 errores |
| `npm run build` | ✅ exit 0 (279 páginas; 106 ● SSG) |
| `npm test` | ✅ 54/54 |
| `npm run lint` | ✅ 200 err / 306 warn (idéntico al baseline, no sube) |

---

## 7. Diff de CWV (Lighthouse local, mobile)

> Lab local, Edge headless. La 1ª corrida salió con TBT ~800ms por **carga de máquina** (venía de 2 builds); re-medición limpia (2 corridas) abajo. **TTFB** incluido porque es la métrica que ataca esta fase.

| Ruta | Métrica | BASELINE (dinámico) | 1A | **1B (estático/ISR)** |
|---|---|---|---|---|
| **home `/es`** | Perf | 84 | 86–92 | **86 / 86** |
| | LCP | 4118 | 3318–4046 | 4079 / 4072 |
| | TBT | 164 | 77–128 | **103 / 97** |
| | CLS | 0.001 | 0.001 | 0.001 |
| | **TTFB** | (render por request) | — | **6 / 5 ms** |
| **servicio `/es/servicios/inmigracion`** | Perf | 78 | 78–82 | 85 / 75 |
| | LCP | 4438 | 4368–4437 | 4288 / 4302 |
| | TBT | 308 | 179–323 | 111 / 425* |
| | CLS | 0.000 | 0.000 | 0.000 |
| | **TTFB** | (render por request) | — | **5 / 12 ms** |

*(425 = pico de ruido puntual; las demás corridas ~100–110.)*

**Lectura honesta:**
- **TTFB se desploma a ~5–12 ms** — confirma el servido estático/ISR (era render dinámico por request con fetch a Places en el camino). Es el objetivo central de la fase, **logrado**.
- **TBT** vuelve a niveles de 1A (~100ms); **sin regresión** (el JS de cliente no cambió — el cambio es 100% server-side).
- **LCP** localmente **no baja mucho** (servicio ~4.3s) porque **en localhost no hay latencia de red**: el render dinámico ya era rápido sin red, así que el LCP local está dominado por JS/imagen de cliente (igual que antes). **El beneficio real de TTFB/LCP se materializa en producción** (entrega desde caché edge en vez de render por request + fetch a Places). El TTFB ~5ms local confirma el mecanismo; la cifra real de LCP de campo hay que verla en **PageSpeed/CrUX tras desplegar**.

---

## 8. Riesgos y notas

1. **El LCP de servicio no mejora en lab local.** Esperado (sin red local). La validación definitiva es **PSI/CrUX en producción** tras el deploy. Si el LCP de campo no baja, el siguiente cuello es client-side (1C: client→server en los `*Client.tsx` grandes), fuera de 1B.
2. **`/en` SSR `lang="es"`** (Opción A): crawlers sin JS ven `lang="es"` en `/en`. Mitigado por `Content-Language` + `hreflang`. Es el costo aceptado de la Opción A.
3. **`aggregateRating` ahora se resuelve en build/ISR** (cada 24h) en vez de por request. Valores reflejan los datos de Places al momento del build/revalidate; si Places cambia, el HTML se actualiza en la siguiente regeneración (≤24h). Coincide con el `unstable_cache` de 24h → sin cambio efectivo de frescura.
4. **Dependencia de la key en build:** confirmada por ti que está en el entorno de build de Vercel. Si faltara, el rating saldría omitido (probado, graceful) hasta la primera revalidación con key.
5. **ISR estándar:** la primera visita tras expirar (24h) puede servir HTML stale y regenerar en background; sin impacto al usuario.
6. **Sin cambios en `googleReviews.ts`** — sigue siendo `unstable_cache` (compatible con ISR), tal como se diagnosticó.

---

## 9. Archivos cambiados
- `app/layout.tsx` (quitar `headers()`, no-async, `lang="es"` estático).
- `app/[lang]/layout.tsx` (+`export const revalidate = 86400`).

**No mergeado.** Espero tu OK. Si apruebas, sugiero: commit en `mejoras/fase-1b-static` → merge a `main`. (Recordatorio: `main` local sigue **1 commit por delante de `origin/main`** desde el merge de 1A — aún sin pushear.)

*Fin de Fase 1B.*
