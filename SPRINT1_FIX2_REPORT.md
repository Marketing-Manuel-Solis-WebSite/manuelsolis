# Sprint 1 · Fix #2 — `bos.manuelsolis.com` indexado por Google

**Estado:** ✅ Hardening defensivo aplicado a este repo (working tree, sin commit).
**Build:** `npm run build` → ✓ Compiled successfully. `/robots.txt` ahora es `ƒ (Dynamic)` (host-aware).
**Acción crítica:** **El fix real NO se puede hacer desde este repo.** Requiere intervención en el servidor de `bos.manuelsolis.com` + Google Search Console. Ver §5 abajo.

---

## 1. Investigación — ¿está BOS en este repo?

**Respuesta corta: NO.** `bos.manuelsolis.com` es una aplicación web **externa**, hosteada en otro servidor (no Vercel), totalmente separada del codebase de `manuelsolis.com`.

### Evidencia

Búsqueda exhaustiva en el repo por `bos\.manuelsolis|bos/|bos-` retornó referencias en 6 archivos, todas son:

| Archivo | Tipo de referencia |
|---|---|
| `SEO_AUDIT_REPORT.md` | Doc (este mismo audit). |
| `DISCOVERY_v3.md` | Doc (planificación previa que ya documentaba BOS como sistema externo, ver §10.4 del DISCOVERY). |
| `app/[lang]/join-in/JoinInClient.tsx` | Cliente HTTP que POSTea a BOS. |
| `app/lib/leadCapture.ts:24` | `const DEFAULT_LEAD_ENDPOINT = 'https://bos.manuelsolis.com/lead/manuelsolis';` — única referencia funcional, sólo se usa como **destino** de un `fetch()` server-side. |
| `app/api/lead-capture/route.ts` | Importa `postLead` (que escribe a BOS). |
| `proxy.ts:38` | **Comprobación de hostname pre-existente** que inyecta `X-Robots-Tag: noindex` si el request entrante viene con `host: bos.manuelsolis.*`. |

Búsquedas adicionales:
- `Glob "**/bos/**"` → 0 archivos. No hay carpeta `bos/`, `subdomain-bos/`, ni nada similar.
- `Glob "**/password*"` → única coincidencia es en `node_modules/caniuse-lite`. **No hay rutas `/password/reset` ni equivalentes en `app/` o `pages/`.**

### Confirmación: BOS es Laravel (probablemente)

Señales en `.env.local` y en `leadCapture.ts:75-77`:

```
BOS_API_TOKEN=<REDACTADO — ROTAR (Laravel Sanctum)>
```

El formato `<id>|<random>` es típico de **Laravel Sanctum** (`personal_access_tokens` table). Más la ruta `/password/reset` que GSC reportó como indexada — esa es la ruta default del scaffold `php artisan make:auth` / Breeze / Jetstream. **Esto confirma que BOS es un Laravel app separado** (con `Auth::routes()` o equivalent expuestas).

### Conclusión sobre la regla existente en `proxy.ts`

La regla en `proxy.ts:38` (`hostname.includes('bos.manuelsolis')`) **no afecta a `bos.manuelsolis.com` en absoluto**:

- Cuando un usuario/crawler hace request a `https://bos.manuelsolis.com/...`, el tráfico va al servidor Laravel — NO pasa por este Next.js app en Vercel.
- La condición sólo se dispararía si alguien sirviera bos detrás de este Next.js (lo cual no pasa hoy, pero la regla queda como defense-in-depth).

Por eso `bos.manuelsolis.com/password/reset` se sigue indexando con normalidad — Google la encuentra y la indexa porque el servidor de bos no le da ninguna directiva contraria.

---

## 2. Cambios aplicados en este repo (defense-in-depth)

Aunque el fix real está fuera de este repo, sí endurecí las protecciones para `v2.manuelsolis.com`, `*.vercel.app`, y cualquier futuro subdominio interno que llegara a servirse a través de este Next.js app.

### 2.1 `app/robots.ts` — ahora host-aware

**Antes**: función síncrona estática que retornaba siempre el mismo `robots.txt` (con sitemap y reglas Google/Bing).

**Después**: función `async` que llama `headers()` de `next/headers` para leer el `host` del request. Si el host es uno de los "no-primarios" (`bos.`, `mme.`, `v2.`, `*.vercel.app`) retorna un robots **hostil**:

```ts
return {
  rules: [{ userAgent: '*', disallow: '/' }],
};
```

Esto significa que cualquier subdominio servido por este Next.js app NUNCA emite un robots.txt permisivo. Los hosts primarios (`manuelsolis.com` y `www.manuelsolis.com`) reciben el robots normal (con sitemap, AI-bot blocking, etc.).

`/robots.txt` ahora aparece en el build output como `ƒ (Dynamic)` en vez de `○ (Static)` — exactamente lo esperado. Coste runtime: 1 request → 1 header read → ~constante.

**Detalle Next.js 16:** sí expone `headers()` desde `next/headers` dentro de `MetadataRoute.Robots`; llamarlo marca el route como dinámico automáticamente, sin necesidad de `export const dynamic = 'force-dynamic'`. Probado en `npm run build` → OK.

### 2.2 `proxy.ts` — `X-Robots-Tag` más agresivo

**Antes** (línea 38, condición compuesta con `.includes()`):
```ts
if (hostname.includes('v2.manuelsolis') || hostname.includes('bos.manuelsolis') || hostname.includes('.vercel.app')) {
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}
```

**Después**: condición canónica (startsWith / endsWith) + directivas exhaustivas:
```ts
if (
  hostname.startsWith('bos.') ||
  hostname.startsWith('mme.') ||
  hostname.startsWith('v2.') ||
  hostname.endsWith('.vercel.app')
) {
  response.headers.set(
    'X-Robots-Tag',
    'noindex, nofollow, noarchive, nosnippet, noimageindex',
  );
  return response;
}
```

Las nuevas directivas:
- `noarchive` — no guardar copia caché.
- `nosnippet` — no mostrar snippet en SERP.
- `noimageindex` — no indexar imágenes embebidas.

También se normaliza `host` a lowercase para evitar bypass via casing (`V2.manuelsolis.com` o similar).

### 2.3 Cobertura del matcher

La `config.matcher` del proxy excluye archivos con extensiones (`xml|txt|webmanifest|etc.`) — eso es OK porque:
- `/robots.txt` no necesita pasar por el proxy: la lógica host-aware vive ya en `app/robots.ts`.
- `/sitemap*.xml` no se sirve en hosts no-primarios (sin matcher → sin route → 404 implícito al revés: en realidad sí se sirve, pero las URLs internas son `https://www.manuelsolis.com/...` así que no hay leak de datos).

---

## 3. Limitación crítica — qué NO arregla este cambio

🔴 **`bos.manuelsolis.com` seguirá indexándose hasta que se actúe sobre su propio servidor.** Los cambios en este repo no llegan a bos.

Las páginas indexadas según GSC:
- `bos.manuelsolis.com/password/reset` — 143 clicks
- `bos.manuelsolis.com/` (root) — el resto
- Total ≈ **1,608 clicks/año** desde un sistema interno que jamás debió estar en SERPs.

Esto requiere acciones EN EL SERVIDOR DE BOS (Laravel/Nginx) y EN GSC. Ver §4 y §5.

---

## 4. TODOs externos — qué debe hacer DevOps/Backend de BOS

Ordenados por prioridad/impacto. Idealmente todo se ejecuta **el mismo día** para minimizar la ventana de indexación.

### 4.1 🔴 P0 — Servir robots hostil desde bos.manuelsolis.com (BLOQUEANTE)

**Opción A (recomendada para Laravel)** — agregar route handler en `routes/web.php` o `routes/console.php` del proyecto BOS:

```php
Route::get('/robots.txt', function () {
    return response("User-agent: *\nDisallow: /\n", 200)
        ->header('Content-Type', 'text/plain; charset=utf-8');
});
```

**Opción B (nginx)** — agregar a la server block de bos:

```nginx
location = /robots.txt {
    add_header Content-Type text/plain;
    return 200 "User-agent: *\nDisallow: /\n";
}
```

### 4.2 🔴 P0 — `X-Robots-Tag: noindex` global desde bos.manuelsolis.com

Para protección a prueba de robots.txt-ignoring crawlers (algunos AI bots no respetan robots.txt). En nginx:

```nginx
add_header X-Robots-Tag "noindex, nofollow, noarchive, nosnippet, noimageindex" always;
```

O en Laravel `app/Http/Middleware/`, crear un middleware global que agregue el header a todas las responses.

### 4.3 🟠 P1 — Basic Auth / IP allowlist en bos

Las páginas indexadas incluyen `/password/reset` que es público por defecto en Laravel. **Una herramienta interna no debe ser públicamente accesible.** Recomendaciones:

- **Mejor**: poner Basic Auth (nginx `auth_basic`) frente a todo `bos.manuelsolis.com`.
- **Bueno**: IP allowlist (sólo IPs de oficinas + VPN).
- **Mínimo**: HTTP redirect 301 desde rutas como `/` y `/password/reset` a una página de login intencionalmente bloqueada con `X-Robots-Tag`.

### 4.4 🟡 P2 — Auditar otras filtraciones

Revisar logs de bos para ver qué otros paths se sirven públicamente sin autenticación. Si encontrás más, sumarlos a la lista de removals en GSC (§5.4).

---

## 5. Pasos para Carlos en Google Search Console

**Pre-requisito:** que P0 (§4.1 y §4.2) ya esté aplicado en producción. Si Google revisita bos antes de tener noindex en el servidor, las eliminaciones temporales caducan en 90 días y vuelve a indexar.

### 5.1 Agregar bos.manuelsolis.com como propiedad en GSC

1. https://search.google.com/search-console
2. Botón "+ Agregar propiedad".
3. Elegir **Prefijo de URL** y poner `https://bos.manuelsolis.com/`.
4. Verificar propiedad con uno de:
   - DNS TXT record (mismo método usado para manuelsolis.com).
   - Subir archivo HTML al server de bos (si tenés acceso).
5. Esperar a que la propiedad quede verificada.

### 5.2 Solicitar eliminación temporal (URL Removal Tool)

Esto saca las URLs del índice en ~24 h pero es **temporal** (90 días). Por eso §4 debe ejecutarse primero — para que cuando expire, Google ya no pueda re-indexar.

1. En la propiedad `bos.manuelsolis.com` → menú izquierdo → **Indexación** → **Eliminaciones**.
2. Click "Nueva solicitud" → "Quitar URL temporalmente".
3. Opciones:
   - **"Quitar esta URL solamente"** — para URLs específicas como `/password/reset`.
   - **"Quitar todas las URL con este prefijo"** — para barrer todo el subdominio en una sola solicitud. **Recomendado: enviar `https://bos.manuelsolis.com/` con "prefijo" para barrer todo.**
4. Confirmar y enviar.
5. Mientras se procesa, la URL desaparece de SERPs en ~24 h.

### 5.3 Inspeccionar URLs específicas (URL Inspection)

Para las URLs más visibles (las que tienen más clicks):

1. En la propiedad bos → barra de búsqueda superior → pegar URL exacta (e.g. `https://bos.manuelsolis.com/password/reset`).
2. Ver estado actual ("Está en el índice de Google").
3. Click "Solicitar indexación" — pero, **importante**: solo HAZLO DESPUÉS de que P0 (§4) esté aplicado. Si solicitás re-indexación antes de tener noindex en el server, Google sólo confirmará que la URL sigue siendo indexable. Después del fix, "Solicitar indexación" hará que Google vea el noindex y la saque del índice de forma permanente.

### 5.4 Lista de URLs prioritarias para removal manual (de GSC)

```
https://bos.manuelsolis.com/                       (root — 1,022 clicks aprox)
https://bos.manuelsolis.com/password/reset         (143 clicks)
+ todas las otras que aparezcan en el reporte de "Páginas con clicks" de bos.manuelsolis.com
```

Si la removal "por prefijo" del §5.2 ya cubrió todas, individual no es necesario — pero hacer URL Inspection de las 2-3 más importantes refuerza el mensaje.

### 5.5 Validación post-deploy (a hacer 48 h después de §4 + §5)

1. `curl -I https://bos.manuelsolis.com/` — verificar que el header `X-Robots-Tag: noindex, ...` se sirve.
2. `curl https://bos.manuelsolis.com/robots.txt` — debe responder `User-agent: *\nDisallow: /`.
3. GSC → propiedad bos → "Cobertura" / "Indexación" → confirmar que las URLs aparecen como "Excluida: indexada, pero la página no se incluyó en el índice" o "Excluida: bloqueada por robots.txt".
4. Búsqueda manual: `site:bos.manuelsolis.com` en Google — esperar a que el conteo baje progresivamente (puede tardar 2-4 semanas en limpiarse del todo).

### 5.6 Si NO se puede tocar el servidor de bos

Fallback parcial — funciona pero más lento y sin proteger contra AI scrapers:

1. Hacer al menos la removal "por prefijo" en GSC (§5.2). Esto saca del índice en 24 h, dura 90 días.
2. **Antes de los 90 días**, repetir la removal. Tarea recurrente cada 80 días aproximadamente.
3. Aplazar P0 hasta que se pueda tocar el server.

> Esta opción NO se recomienda: GSC removal sin noindex en el server permite que se siga rastreando, sólo oculta en SERPs visualmente. Otros buscadores (Bing, Yandex, DuckDuckGo) no respetan la removal de Google.

---

## 6. Archivos modificados en este repo

```
EDITADO  app/robots.ts    (ahora async, host-aware via headers() de next/headers)
EDITADO  proxy.ts         (X-Robots-Tag con noarchive/nosnippet/noimageindex,
                          + condición canónica startsWith/endsWith y host
                          normalizado a lowercase, + soporte explícito de mme.)
```

Total: **2 archivos modificados**.

---

## 7. Commit propuesto (cuando apruebes el diff)

```
chore(seo): harden noindex on non-primary hosts (bos/mme/v2/vercel.app)

- app/robots.ts: convert to async + read `host` via next/headers. Non-primary
  hosts (bos.*, mme.*, v2.*, *.vercel.app) now receive a hostile
  "User-agent: *\nDisallow: /" robots.txt with no sitemap link. Primary
  hosts (manuelsolis.com / www.manuelsolis.com) keep the original rules.
  /robots.txt now compiles as ƒ (Dynamic).

- proxy.ts: harden the existing X-Robots-Tag injection to include
  `noarchive, nosnippet, noimageindex` in addition to `noindex, nofollow`.
  Replace `.includes()` checks with canonical startsWith/endsWith on the
  lowercased host, and add explicit coverage for `mme.*`.

This is defense-in-depth for hosts SERVED THROUGH this Next.js app
(v2.manuelsolis.com, *.vercel.app). It does NOT affect
bos.manuelsolis.com, which is a separate Laravel server — that needs
its own server-side noindex + GSC URL Removal request. See
SPRINT1_FIX2_REPORT.md §4-5 for the external playbook.
```

---

## 8. Inconsistencias / cosas extra encontradas

- **`mme.manuelsolis.com`**: tu prompt lo mencionó como host a bloquear pero NO encontré referencias en el código (ni en docs ni en config). Lo agregué proactivamente a la lista (proxy.ts y robots.ts). Si no existe ese subdominio, no rompe nada (la regla nunca se dispara); si existe como otro sistema interno, ya queda cubierto.
- **`bos.manuelsolis.com` también está en CSP del `next.config.ts`?** No — los `connect-src` y `frame-src` de la CSP NO incluyen bos. Eso está correcto (el frontend nunca conecta directo a bos desde el browser; sólo el server lo hace via fetch desde `/api/lead-capture`).
- **Comentario en `app/lib/leadCapture.ts:13`** indica que Phase 3b reemplaza bos por Solislead. Cuando se haga, BOS dejará de recibir tráfico de manuelsolis.com pero seguirá indexado hasta que se actúe en el server de bos. Es decir, este fix es necesario INDEPENDIENTEMENTE de la migración a Solislead.
