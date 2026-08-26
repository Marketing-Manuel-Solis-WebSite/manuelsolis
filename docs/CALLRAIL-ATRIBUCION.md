# CallRail — medición de llamadas y separación de canales

> Auditoría y decisiones del **2026-08-26**. Origen del encargo: la agencia que
> lleva Google Ads aparece acreditada con llamadas que no le corresponden, y se
> pidió instalar el snippet de CallRail con tracking de sesión (number pool con
> DNI) en vez de números de fuente fija.

## Cómo se verificó

No por documentación: descargando el bundle que sirve la propia cuenta y
leyéndolo.

```
curl -s https://cdn.callrail.com/companies/307808685/99c81bba28c489f453b6/12/swap.js
```

CallRail **inlinea la configuración de la cuenta dentro de `swap.js`**, así que
ese archivo es la fuente de verdad de cómo está montado el tracking hoy.
Cualquiera puede repetir el comando y confirmar lo que sigue.

## Configuración real de la cuenta (leída del bundle)

| Campo                          | Valor            | Qué implica |
| ------------------------------ | ---------------- | ----------- |
| `id`                           | `307808685`      | Compañía |
| `cookie_duration`              | **180**          | El número asignado se pega al visitante **180 días** |
| `trump_sources`                | **`false`**      | Un clic de paid search **no** sobrescribe el origen ya guardado |
| `session_number_target_exists` | **`true`**       | **Sí hay pool de sesión configurado** |
| `session_exact_targets`        | `[]`             | El pool no tiene objetivos fijos: descubre los teléfonos del DOM |
| `session_observer`             | `true`           | Re-swapea contenido añadido dinámicamente (necesario en un SPA) |
| `session_polling`              | `true` / 60 s    | Reintenta la asignación cada minuto |
| `mutation_observer`            | `true`           | Observa el DOM, pero solo `childList` (ver «Trampa de React») |
| `form_capture_config.enabled`  | **`false`**      | La captura de formularios está apagada — correcto, los forms ya postean a BOS |
| `cross_subdomain`              | `true`           | La cookie se fija en el TLD más cercano |
| `endpoints`                    | `cdn` + `js` + `app`.callrail.com | Tres orígenes, no uno (ver CSP) |

## Hallazgo principal: los trackers apuntan a números que no existen en el sitio

La cuenta tiene **42 `source_trackers`** (números de fuente fija), repartidos así:

| `referrer_tracking_source` | Trackers |
| -------------------------- | -------- |
| `all`                      | **15**   |
| `google_my_business`       | 8        |
| `print_ad`                 | 6        |
| `facebook_organic`         | 6        |
| `google_paid`              | 4        |
| `facebook_all`             | 3        |

Entre los 42 hay **30 `swap_targets` distintos** (los números que el script
buscaría en la página para sustituirlos). Se cruzaron con los **20 números que
realmente renderiza este repo**:

```
coincidencias: 0
```

**Ninguno.** Los objetivos son otros números — un bloque contiguo
`832-553-87xx` y un puñado de locales de otros mercados — que pertenecen a
otras propiedades, no a manuelsolis.com. Consecuencias:

1. Con el snippet instalado, **los 42 trackers de fuente no swapean nada aquí**.
   El script carga, no encuentra ninguno de sus objetivos y no hace nada.
2. Los **15 trackers `all`** son la forma estructural del problema que se
   reportó: un número fijo que se enseña a *todo* el tráfico, sin distinguir
   canal. Toda llamada a ese número queda acreditada al tracker, venga el
   visitante de donde venga. Es exactamente lo que un pool de sesión resuelve.
3. Lo que sí existe y sirve es el **pool** (`session_number_target_exists:
   true`). Como `session_exact_targets` está vacío, el pool **descubre solo**
   los teléfonos: `swap.js` recorre el DOM, normaliza cada número a sus últimos
   10 dígitos, manda la lista por XHR a `js.callrail.com` y el servidor
   responde qué asignar. Es decir: **en cuanto el script cargue con el CSP
   abierto, el pool ve los 20 números del sitio sin configurar nada más.**

## El otro mecanismo por el que Google absorbe crédito

Dos ajustes, en direcciones opuestas:

- **`trump_sources: false` está bien y debe quedarse así.** Leyendo
  `OverrideSource.applyPaidSources()`, ese flag hace que un referrer
  `google_paid` / `bing_paid` / `yahoo_paid` **borre la sesión y se ponga
  encima** del origen original. Con `true`, cualquier clic posterior de paid
  search le roba la atribución a Instagram, al boletín, al perfil de empresa y
  a lo que haya llegado antes. Si alguien lo enciende, se acabó la separación.
- **`cookie_duration: 180` sí es un problema.** Con `trump_sources: false`, el
  **primer** canal se queda el crédito durante 180 días. Si Google Ads es
  top-of-funnel, absorbe las llamadas de medio año de retornos orgánicos.

Y encima los dos sistemas no usan el mismo modelo:

| | CallRail | Sitio → BOS (`app/lib/attribution.ts`) |
| --- | --- | --- |
| Modelo | First touch, sticky 180 días | Prioridad `URL actual > last_touch > first_touch` |
| Ventana | 180 días | 90 días |
| Sin UTMs | Deriva el canal del referrer | **No deriva nada** → tráfico del sitio |

Con modelos distintos **las cifras no pueden cuadrar**, y esa brecha es la
munición de la discusión. Para poder comparar hay que igualar el modelo o
comparar explícitamente like-for-like. Recomendación: bajar
`cookie_duration` a **30 días** (alinea la ventana con la decisión de compra
real de un caso y reduce la absorción de first-touch) y dejar `trump_sources`
en `false`.

## Trampa de React (resuelta en el repo)

El observer de CallRail se registra como `{childList: true, subtree: true}` —
**sin `characterData`** — y su callback solo recorre `addedNodes`. React, al
actualizar un texto o un atributo existente, lo **muta en sitio**
(`nodeValue` / `setAttribute`), que no es un nodo añadido.

En este sitio el teléfono es estado derivado de la ruta (`useMemo` sobre el
slug de oficina en `Header.tsx` y `MobileStickyBar.tsx`), así que al navegar
entre una página de oficina y otra página React reescribe el número de CallRail
con el real. `session_polling` lo recupera en ≤60 s, pero deja una ventana de
hasta un minuto en el CTA de mayor intención.

Resuelto con `key={phoneNumber}` / `key={phoneLink}`: al cambiar la key React
desmonta y monta, el nodo entra como `addedNode` y el observer lo vuelve a
swapear en el mismo frame. Se apoya en comportamiento documentado del observer,
no en API interna del bundle.

## Qué hace el repo ahora

| Cambio | Archivo |
| ------ | ------- |
| `https://*.callrail.com` en `script-src` y `connect-src` | `app/lib/securityHeaders.ts` |
| `swap.js` con `strategy="afterInteractive"`, fuera de `/admin`, tras env var con guarda de origen | `app/components/PageViewTracker.tsx` |
| Remount del teléfono al cambiar de ruta | `Header.tsx`, `MobileStickyBar.tsx` |
| `data-calltrk-noswap` en los teléfonos de documentos legales | `TermsOfService.tsx`, `PrivacidadClient.tsx` |
| CallRail declarado en la Sección 5 (cookies `calltrk_*` + grabación) | `PrivacidadClient.tsx` |
| Regla de paid (auto-tagging no basta) + corrección de la síntesis de `gclid` | `docs/UTM_TAXONOMY.md` |
| Guardas de la integración | `__tests__/callrail.test.ts` |

El `telephone` del JSON-LD de `LocalBusiness` **no se toca**: el walker de
`swap.js` salta `SCRIPT` y `NOSCRIPT`, verificado en el bundle. El NAP que lee
Google no se mueve aunque el número visible rote.

Para activarlo: definir en Vercel

```
NEXT_PUBLIC_CALLRAIL_SWAP_SRC=https://cdn.callrail.com/companies/307808685/99c81bba28c489f453b6/12/swap.js
```

Sin la variable el script no se monta y el sitio enseña los números reales.

## Pendiente en el panel de CallRail (no se puede hacer desde el repo)

1. **Añadir los números del sitio como objetivos del pool.** El pool los
   descubre y los reporta, pero la asignación la decide el servidor. Sin esto
   el script carga y no swapea.
2. **Dimensionar el pool.** Con `cookie_duration: 180` el pool no cubre
   «visitantes concurrentes» sino **visitantes únicos dentro de la ventana de
   cookie**, que es un orden de magnitud más. Cuando se agota, CallRail recicla
   el número más antiguo y la atribución se degrada **sin avisar**. Hace falta
   el pico real de visitantes únicos/día separando pagado de orgánico (Vercel
   Analytics o GA4) antes de fijar un tamaño; cada número del pool se factura.
3. **Retirar o reetiquetar los 15 trackers `all`.** Mientras existan, cualquier
   llamada a esos números entra en un cubo que no distingue canal.
4. **Dejar `trump_sources` en `false`** y `cookie_duration` idealmente en 30.
5. **CallRail → BOS.** El snippet mide; no crea el lead. Enlazar la llamada con
   el registro de BOS es trabajo aparte (webhook).
6. **Google Business Profile:** el número principal de cada ficha se queda con
   el real. El de seguimiento va como número adicional, nunca al revés.
7. **`form_capture` seguir apagado.** Los formularios ya postean a BOS vía
   `leadCapture.ts`; encenderlo duplicaría leads.

## Riesgo asumido a petición del despacho

Se pidió swapear **todos** los números del sitio, no solo el de la landing. El
pool los descubre todos, así que se cumple. La contrapartida: en las páginas de
oficina el número visible dejará de coincidir con el de su ficha de Google
Business Profile mientras el visitante tenga asignación. El JSON-LD sigue
publicando el real, así que el schema no miente, pero la consistencia NAP que
`__tests__/napConsistency.test.ts` protege se relaja en el texto visible.

Si en algún momento se quiere revertir solo para oficinas, la palanca es
`data-calltrk-noswap` en el bloque NAP de `app/[lang]/oficinas/<slug>/`, sin
tocar nada más.
