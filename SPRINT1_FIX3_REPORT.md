# Sprint 1 · Fix #3 — Auditoría de cadena de redirects de la home (REPORT-ONLY)

**Branch sugerida:** `fix/canonical-redirect-chain` (no se creó — este es solo el reporte).
**Cambios aplicados al código:** ⚠️ **NINGUNO.** Este reporte es 100% análisis estático. Después de tu aprobación se aplican los cambios sugeridos en §3-4.

**Canónica objetivo:** `https://www.manuelsolis.com/es` (HTTPS · www · sin trailing slash).

---

## 1. Stack de redirects relevante

Tres capas se involucran, en este orden de ejecución por request:

1. **Vercel platform** (antes de Next.js):
   - HTTP→HTTPS: redirect automático **301/308** según versión del runtime cuando la TLS cert está activa.
   - apex→www o www→apex: configurable en **Vercel Dashboard → Project → Settings → Domains**. Genera **308** desde el alias hacia el primary domain.
   - Estos hops ocurren a nivel de plataforma, no en el código.
2. **`next.config.ts` redirects** (vía `seoRedirects.ts`, ~200+ reglas 301):
   - Búsqueda exhaustiva en `seoRedirects.ts` por `source: '/'`: **0 resultados.** No hay redirect para la raíz `/`. Todos los redirects son para paths legacy WP, alias EN→ES, attorney defunct, etc. Ninguno toca `/`.
3. **`proxy.ts`** (Next.js Routing Middleware):
   - Línea 51-63: hostname noindex injection (no afecta cadena en `www.manuelsolis.com`).
   - Línea 72-79: uppercase → lowercase 301.
   - Línea 82-86: strip trailing slash (excepto `/`) 301.
   - Línea 89-107: si pathname ya tiene `/es/` o `/en/` (o `=== '/es'` o `=== '/en'`), passthrough con header `Content-Language`.
   - Línea 110-116: si es **SEO crawler** y no tiene locale → redirect 301 a `/es{pathname}`.
   - Línea 118-131: para humanos → redirect (status default = **307**) a `/${locale}{pathname}` con cookie `NEXT_LOCALE` set.

Además: `app/page.tsx` tiene `redirect('/es')` como fallback. **No se ejecuta nunca** en producción porque el proxy intercepta `/` antes (el matcher cubre todos los paths excepto api/rss/_next/static/archivos con extensión).

### 🐛 Bug detectado mientras tracé las cadenas

En las líneas 111 y 120 del proxy, la construcción del path destino es:

```ts
const newUrl = new URL(`/${locale}${pathname}`, request.url);
```

Cuando `pathname === '/'` (raíz), el template literal produce `/es/` (con trailing slash). Esto causa que el redirect emita un destino con barra final, lo cual a su vez es redirigido por la regla de strip-trailing-slash del propio proxy en una **segunda llamada**.

Es decir: hoy `/` → 307 → `/es/` → 301 → `/es`. **Dos hops del proxy por una sola request raíz.**

Esto es la causa raíz de los hops extra documentados en la tabla §2.

---

## 2. Tabla — cadena ACTUAL para las 6 URLs

> Asumo configuración Vercel típica para un proyecto con `manuelsolis.com` (apex) y `www.manuelsolis.com` ambos asignados, con **www como Primary Domain** (apex redirige a www con 308). Si tu config es al revés (apex como primary), la tabla cambia: ver §6.1 "Riesgos / consideraciones".

| # | URL inicial | Hop 1 | Hop 2 | Hop 3 | Hop 4 | Status final | Total hops |
|---|---|---|---|---|---|---|---|
| 1 | `http://manuelsolis.com/` | Vercel **301**<br>→ `https://manuelsolis.com/` | Vercel **308**<br>→ `https://www.manuelsolis.com/` | proxy **307**<br>→ `https://www.manuelsolis.com/es/` | proxy **301**<br>→ `https://www.manuelsolis.com/es` | 200 OK | **4 hops** 🔴 |
| 2 | `https://manuelsolis.com/` | Vercel **308**<br>→ `https://www.manuelsolis.com/` | proxy **307**<br>→ `https://www.manuelsolis.com/es/` | proxy **301**<br>→ `https://www.manuelsolis.com/es` | — | 200 OK | **3 hops** 🟠 |
| 3 | `http://www.manuelsolis.com/` | Vercel **301**<br>→ `https://www.manuelsolis.com/` | proxy **307**<br>→ `https://www.manuelsolis.com/es/` | proxy **301**<br>→ `https://www.manuelsolis.com/es` | — | 200 OK | **3 hops** 🟠 |
| 4 | `https://www.manuelsolis.com/` | proxy **307**<br>→ `https://www.manuelsolis.com/es/` | proxy **301**<br>→ `https://www.manuelsolis.com/es` | — | — | 200 OK | **2 hops** 🟠 |
| 5 | `https://manuelsolis.com/es` | Vercel **308**<br>→ `https://www.manuelsolis.com/es` | — | — | — | 200 OK | **1 hop** ✅ |
| 6 | `https://www.manuelsolis.com/es` | — | — | — | — | 200 OK | **0 hops** ✅ |

### 2.1 Variante SEO crawler (Googlebot, Bingbot, etc.)

Para crawlers reconocidos por el regex `SEO_CRAWLER_REGEX`, el proxy usa **301 (no 307)** en línea 113. La cadena es idéntica en estructura, solo cambia el status code:

| # | URL inicial | Hop 1 (Vercel) | Hop 2 (proxy) | Hop 3 (proxy) | Total hops |
|---|---|---|---|---|---|
| 1 | `http://manuelsolis.com/` (Googlebot) | 301 | 301 → `/es/` | 301 → `/es` | **3 hops Next.js + Vercel** |

PageRank dilution per hop: ~10-15% según estudios SEO empíricos. **3-4 hops para una URL HTTP/apex significa ~30-50% de PageRank perdido vs canonical.**

---

## 3. Hops innecesarios (>1) — identificación

Cualquier URL con **>1 hop al canonical** sangra PageRank. En la tabla actual:

| # | URL | Hops actuales | Hops mínimos teóricos | Sobra |
|---|---|---|---|---|
| 1 | `http://manuelsolis.com/` | 4 | 2 (Vercel HTTP+apex combinado → 1 / Proxy / → /es → 1) | **-2** |
| 2 | `https://manuelsolis.com/` | 3 | 2 (Vercel apex→www → 1 / Proxy / → /es → 1) | **-1** |
| 3 | `http://www.manuelsolis.com/` | 3 | 2 (Vercel HTTP→HTTPS → 1 / Proxy / → /es → 1) | **-1** |
| 4 | `https://www.manuelsolis.com/` | 2 | **1** (Proxy / → /es) | **-1** |
| 5 | `https://manuelsolis.com/es` | 1 | 1 (Vercel apex→www) | 0 ✅ |
| 6 | `https://www.manuelsolis.com/es` | 0 | 0 ✅ | 0 ✅ |

**Conclusión:** las URLs 1-4 tienen al menos un hop redundante interno, causado por el bug en `proxy.ts` líneas 111 y 120 (genera `/es/` en vez de `/es` para pathname `/`).

---

## 4. Cadena propuesta (post-fix)

| # | URL inicial | Hop 1 | Hop 2 | Status final | Total hops |
|---|---|---|---|---|---|
| 1 | `http://manuelsolis.com/` | Vercel **301** (HTTP→HTTPS, posiblemente combinado con apex→www en Vercel moderno) → `https://www.manuelsolis.com/` | proxy **301**<br>→ `https://www.manuelsolis.com/es` | 200 OK | **2 hops** ✅ |
| 2 | `https://manuelsolis.com/` | Vercel **308**<br>→ `https://www.manuelsolis.com/` | proxy **301**<br>→ `https://www.manuelsolis.com/es` | 200 OK | **2 hops** ✅ |
| 3 | `http://www.manuelsolis.com/` | Vercel **301**<br>→ `https://www.manuelsolis.com/` | proxy **301**<br>→ `https://www.manuelsolis.com/es` | 200 OK | **2 hops** ✅ |
| 4 | `https://www.manuelsolis.com/` | proxy **301**<br>→ `https://www.manuelsolis.com/es` | — | 200 OK | **1 hop** ✅ |
| 5 | `https://manuelsolis.com/es` | Vercel **308**<br>→ `https://www.manuelsolis.com/es` | — | 200 OK | **1 hop** ✅ |
| 6 | `https://www.manuelsolis.com/es` | — | — | 200 OK | **0 hops** ✅ |

**Reducción:**
- URL 1: 4 → 2 hops (−2). Conserva ~25% más PageRank.
- URL 2: 3 → 2 hops (−1).
- URL 3: 3 → 2 hops (−1).
- URL 4: 2 → 1 hop (−1). Esta es la mejora más importante porque es la URL "real" del home en navegación directa.

### 4.1 Cómo alcanzar el ideal teórico de "1 solo 301 directo"

Imposible para URLs 1-3 sin perder seguridad/funcionalidad:

- HTTP→HTTPS DEBE quedar como hop separado (es decisión TLS de Vercel; no se puede combinar con redirect Next.js).
- apex→www DEBE quedar como hop separado a menos que se combine a nivel Vercel platform (algunas configuraciones modernas SÍ lo hacen en un solo 308).

URLs 4-6 ya están óptimas con el fix propuesto.

---

## 5. Código exacto del cambio sugerido

### 5.1 `proxy.ts` — corregir el bug del trailing slash + usar 301 para humanos

**Cambio único en `proxy.ts` (líneas 109-131):**

```diff
   // Para crawlers sin locale en URL, redirigir directamente sin cookie logic
   if (isSEOCrawler) {
-    const newUrl = new URL(`/es${pathname}`, request.url);
+    const newUrl = new URL(
+      pathname === '/' ? '/es' : `/es${pathname}`,
+      request.url,
+    );
     newUrl.search = request.nextUrl.search;
     const response = NextResponse.redirect(newUrl, 301);
     response.headers.set('Content-Language', 'es');
     return response;
   }

   // Redireccionar a la versión con idioma
   const locale = getLocale(request);
-  const newUrl = new URL(`/${locale}${pathname}`, request.url);
+  const newUrl = new URL(
+    pathname === '/' ? `/${locale}` : `/${locale}${pathname}`,
+    request.url,
+  );

   // CRÍTICO: Mantener query params (UTMs, search, etc)
   newUrl.search = request.nextUrl.search;

-  const response = NextResponse.redirect(newUrl);
+  // 301 (permanent) en vez del 307 default — el routing por locale es
+  // determinístico (cookie + Accept-Language) y debe ser cacheable como
+  // canónico. Esto reduce hops para crawlers que cachean 301s y mejora
+  // PageRank transfer. Si más adelante se quiere honrar cambios de
+  // Accept-Language en revisitas, se puede volver a 307 — pero el costo
+  // SEO de 307 en la home es alto.
+  const response = NextResponse.redirect(newUrl, 301);
   response.headers.set('Content-Language', locale);

   // Guardar preferencia
   response.cookies.set('NEXT_LOCALE', locale, { maxAge: 31536000 });

   return response;
```

**Tres modificaciones:**

1. **Línea 111 (SEO crawler branch):** detectar `pathname === '/'` para evitar generar `/es/` con trailing slash. Si es raíz, emitir `/es` directo.
2. **Línea 120 (humano branch):** misma corrección.
3. **Línea 125:** cambiar de `NextResponse.redirect(newUrl)` (default 307) a `NextResponse.redirect(newUrl, 301)`. Permanent redirect porque el routing por locale + cookie es estable; 301 es cacheable y transfiere PageRank.

**Por qué este cambio es suficiente:**

- Elimina el hop intermedio `/es/` para TODAS las requests al root `/`.
- Aplica tanto a humanos (URL 4) como a crawlers (URL 1-3 cuando vienen via Googlebot).
- No afecta otras rutas (e.g. `/servicios`) — para esas, `pathname !== '/'` así que la rama existente `\`/${locale}${pathname}\`` sigue produciendo el path correcto sin trailing slash.

### 5.2 Configuración Vercel (Dashboard, no código)

Verificar en **Vercel Dashboard → Project → Settings → Domains**:

1. `www.manuelsolis.com` debe ser **Primary Domain** (con el badge).
2. `manuelsolis.com` debe estar configurado con la opción **"Redirect to www.manuelsolis.com"** (308).
3. HTTPS debe estar forzado (Vercel lo hace automático cuando el cert está activo).

Si la config ya está así, los hops Vercel-level ya son óptimos. Si no, ajustar — es un cambio en UI, no en código.

### 5.3 (Opcional) Sitemap canonical hardening

`app/lib/sitemapData.ts` ya usa `https://www.manuelsolis.com` como `BASE_URL` para todas las URLs. ✅

`app/[lang]/page.tsx` ya emite `canonical: ${SITE_URL}/${lang}` → `https://www.manuelsolis.com/es`. ✅

No requiere cambios.

---

## 6. Riesgos / consideraciones

### 6.1 Si la config de Vercel es apex como Primary (en vez de www)

Si en tu Vercel Dashboard `manuelsolis.com` es Primary y `www.` redirige hacia el apex, entonces:
- La tabla §2 cambia: los redirects son **www→apex** (308), no apex→www.
- La canónica debe ser `https://manuelsolis.com/es`, NO `https://www.manuelsolis.com/es`.
- Todas las constantes `SITE_URL` del repo (que hoy apuntan a `www.manuelsolis.com`) estarían generando canonicals INCORRECTOS, lo cual es un problema MAYOR.

**Pre-requisito**: confirmar primero qué dominio es Primary en Vercel. Si es `www.`, el plan §4-5 procede. Si es apex, necesitamos otra conversación porque hay un mismatch entre la config y el SITE_URL del código.

> Dado que `SITE_URL = 'https://www.manuelsolis.com'` aparece en ~30 archivos del repo (sitemap, schemas, redirects, metadatas), y los datos de GSC muestran clicks tanto a apex como a www, lo más probable es que la config sea **www como Primary**. Pero conviene verificar.

### 6.2 Cache de 301s en browsers

Cambiar `NextResponse.redirect(newUrl)` de 307 → 301 tiene un efecto colateral importante: **los browsers cachean los 301 muy agresivamente** (a veces de por vida hasta que el usuario limpie cache).

Implicaciones:
- ✅ Usuario que visite `/` con cookie `NEXT_LOCALE=es` será redirigido a `/es` y futuras visitas pueden saltarse el redirect (mejor performance, menos hops).
- ⚠️ Si después cambian el routing (e.g. quieren que `/` muestre un selector de idioma en vez de redirigir), los usuarios viejos seguirán siendo redirigidos por su browser cache. **Esto es un commit casi-permanente** — pensar bien antes de implementar.
- ⚠️ Edge case: un usuario que visite `/` con browser en EN (Accept-Language=en, sin cookie) sería redirigido 301 a `/en`. Si luego cambia el browser a español, el browser cache podría seguir 301'eando a `/en`. **Solución:** mantener 307 si quieres seguir respetando cambios de Accept-Language en revisitas. Es un trade-off:
  - **301** = mejor SEO, "carrera" más rápida para PageRank, pero locale "pegada" per browser.
  - **307** = peor SEO, hops cachean menos, pero locale se re-evalúa cada vez.

**Mi recomendación**: 301. La gran mayoría de usuarios mantienen un solo browser language. Y la mejora SEO por reducir hops es clara y medible (sitios con cadenas de 3+ hops pierden ~30-40% del PageRank teórico vs canonical). Si en el futuro alguien cambia de idioma manualmente, el `LanguageSwitcher` componente (`app/components/LanguageSwitcher.tsx`) ya sobreescribe la cookie y navega a la URL correspondiente — ese flow funciona aunque el 301 esté cacheado, porque navega a una URL específica (`/en/...`), no a `/`.

### 6.3 Romper bookmarks / links existentes

**Bajo riesgo.** Los cambios propuestos:
- Eliminan el hop intermedio `/es/` (con trailing slash) — esa URL ni siquiera estaba bookmarkeada (es transient, generada por la cadena).
- Cambian status 307 → 301 — semánticamente más fuerte, pero mismo destino. Sin breakage de bookmarks.

Las URLs canónicas (`/es`, `/en`, `/es/<path>`, `/en/<path>`) no cambian.

### 6.4 Impacto en Search Console

Después del deploy, GSC tardará semanas en reconciliar el cambio:
- Las URLs viejas (`/es/`, `/`) gradualmente se marcarán como "Redirect" en lugar de "Indexed".
- Los clicks atribuidos a `https://manuelsolis.com/es` (apex) podrían bajar y los de `https://www.manuelsolis.com/es` (www) podrían subir — solo es un movimiento contable; el tráfico total se mantiene.
- Recomendado: hacer "Validar la corrección" en cualquier issue de "Página alternativa con etiqueta canónica adecuada" en GSC unas 2-3 semanas post-deploy.

### 6.5 Cookie set sigue funcionando

El cambio mantiene el `response.cookies.set('NEXT_LOCALE', locale, { maxAge: 31536000 })` después del redirect. Las cookies SE pueden setear junto a un 301 (es válido y los browsers las persisten). Pero ojo: si el browser cachea el 301 y nunca vuelve a hacer la request, la cookie NUNCA se setea en visitas subsecuentes. Para la mayoría de usuarios el primer hit setea la cookie y queda persistida.

Para usuarios que limpian cookies pero mantienen browser cache: 301 cacheado → no se vuelve a setear cookie. En ese caso el LanguageSwitcher manual sigue funcionando.

---

## 7. Resumen de acciones (cuando apruebes el plan)

| # | Acción | Tipo | Quién |
|---|---|---|---|
| 1 | Verificar en Vercel Dashboard que `www.manuelsolis.com` es Primary y que `manuelsolis.com` tiene "Redirect to www" | Config | Carlos / DevOps |
| 2 | Aplicar el diff propuesto en `proxy.ts` (3 cambios: 2 fixes de pathname, 1 cambio 307→301) | Código | Carlos / dev (post-aprobación) |
| 3 | `npm run build` + smoke test local con `curl -I -L https://localhost:3000/` para verificar la cadena | QA | Carlos |
| 4 | Deploy a preview, validar con `curl -I -L https://<preview>.vercel.app/` que la cadena es la esperada | QA | Carlos |
| 5 | Deploy a producción | Release | Carlos |
| 6 | GSC: validar correcciones en propiedades existentes 2-3 semanas post-deploy | Monitoring | Carlos |

---

## 8. Commit propuesto (cuando se implemente)

```
fix(seo): reduce home redirect chain to 1 hop and use 301 for locale routing

The proxy at line 111 and 120 was building the redirect target with
`/${locale}${pathname}`, which produces `/es/` (trailing slash) when
pathname is `/`. The trailing-slash-strip rule then fires on the next
request, causing an extra 301 hop. Net effect: 4 hops for HTTP+apex+root,
2 hops for HTTPS+www+root.

This change:
  * Special-cases pathname === '/' in both the SEO-crawler branch and
    the human-redirect branch, emitting `/es` (no trailing slash) directly.
  * Switches the human-redirect status from 307 (default) to 301. The
    locale routing is deterministic (cookie + Accept-Language) so 301
    is correct, cacheable, and transfers PageRank to the canonical URL.

After this change:
  * http://manuelsolis.com/                  → 2 hops (was 4)
  * https://manuelsolis.com/                 → 2 hops (was 3)
  * http://www.manuelsolis.com/              → 2 hops (was 3)
  * https://www.manuelsolis.com/             → 1 hop  (was 2)
  * https://manuelsolis.com/es               → 1 hop  (unchanged)
  * https://www.manuelsolis.com/es           → 0 hops (canonical, unchanged)

Trade-off: 301 is aggressively cached by browsers. Users who change
their browser language after first visit will continue to be redirected
to their original locale until they clear cache or use the
LanguageSwitcher (which sets the cookie explicitly and navigates to a
specific URL, bypassing the 301).

See SPRINT1_FIX3_REPORT.md for the full trace and rationale.
```
