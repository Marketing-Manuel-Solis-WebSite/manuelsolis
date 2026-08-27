# CallRail — medición de llamadas y separación de canales

> Auditoría y decisiones del **2026-08-26**. Origen del encargo: la agencia que
> lleva Google Ads aparece acreditada con llamadas que no le corresponden, y se
> pidió instalar el snippet de CallRail con tracking de sesión (number pool con
> DNI) en vez de números de fuente fija.

## ESTADO FINAL 2026-08-27 — funcionando en producción

**19 pools de sesión creados, 108 números, cero fallos.** Uno por cada número
que el sitio publica (los 20 menos `713-844-2700`, que es el número de registro
de los documentos legales y va con `data-calltrk-noswap`).

Un pool por destino, porque `call_flow` admite un solo `destination_number` y
cada oficina reenvía a una línea distinta. Los destinos se copiaron de los
trackers existentes: **el enrutamiento de las llamadas no cambia**, solo cambia
el número que ve cada visitante.

| Objetivo (lo que publica el sitio) | Destino (a donde suena) | Pool | Tracker de origen |
| ---------------------------------- | ----------------------- | ---- | ----------------- |
| `7137011731` | `7132308482` | 10 | Google My Business Houston |
| `2147538315` | `2142333054` | 10 | Google My Business Dallas |
| `3124770389` | `3122888171` | 10 | Google My Business Chicago |
| `9152337127` | `9152194782` | 6 | Google My Business El Paso |
| `7203588973` | `7206342738` | 6 | Google My Business Denver |
| `2137841554` | `2134421018` | 6 | Google My Business LA |
| `9565977090` | `9566224157` | 6 | Google My Business Harlingen |
| `7139037875` | `2816577998` | 6 | Google-MB Houston Bellaire |
| `8886761238` | `8325538784` | 6 | Manuel Solis Website |
| `9015578357` | `9016650122` | 6 | Google My Business Memphis |
| `7134290237` | `7132308498` | 4 | Google-MB Kirby |
| `3465224848` | `2816577996` | 4 | Google-MB Houston Northchase |
| `7132315384` | `7132777838` | 4 | Google-MB Juridico Main Number |
| `8325980914` | `7132308455` | 4 | Google-MB Houston N Loop |
| `8325983782` | `7132308495` | 4 | Google-MB League City |
| `7138429575` | `3466570405` | 4 | Google-MB MainSt |
| `8008987180` | `8008987180` | 4 | linea propia del sitio |
| `8664200405` | `2816577865` | 4 | GA: Landing Page: Es: 18-wheeler a |
| `8883514024` | `8883514024` | 4 | linea propia del sitio |

Tamaños asignados por volumen real de llamadas (muestra de 10 días): 10 números
donde hay ≥200 llamadas, 6 donde hay ≥60, 4 en el resto (mínimo de CallRail).

### Verificado en producción con Chrome

```json
"number_assignment": true
"a": {"7137011731":"(713) 561-5280", "7132315384":"(713) 364-1195",
      "7139037875":"(281) 729-8678", "8886761238":"(832) 981-2925"}
```

En la landing no queda ningún número original (`propios: []`): los cuatro que
la página publica se sustituyen. Y tras una navegación de cliente a
`/es/oficinas/houston-principal`, el header muestra el número de pool de Houston
— o sea que el arreglo del remount (`key={phoneNumber}`) funciona con números
de pool reales, no solo en la simulación. Cero violaciones de CSP.

### Lo que hay que vigilar

- **Utilización de los pools.** Si un pool se agota, CallRail recicla el número
  más antiguo y la atribución se degrada **sin avisar**. Houston (509 llamadas /
  10 días) y Dallas (367) son los candidatos a quedarse cortos primero.
- **`swap_ppc_override` debe seguir en `false`.** Es el interruptor que hace que
  un clic de paid search borre el origen previo del visitante.
- Los 15 `source_trackers` con fuente `all` siguen vivos. Ya no afectan al
  sitio (ahora los pools se le adelantan), pero mezclan canales allí donde esos
  números estén publicados.

## CORRECCIÓN 2026-08-27 — el fallo de raíz es otro

Con acceso a la API de CallRail se pudo leer la cuenta entera (268 trackers,
32.324 llamadas en 90 días). Tres afirmaciones de la versión anterior de este
documento eran **falsas** y quedan corregidas aquí:

| Afirmación anterior | Realidad |
| ------------------- | -------- |
| `cookie_duration: 180` | Es **30**. Se bajó el 2026-08-26. |
| Los `swap_targets` «pertenecen a otras propiedades» | Son las **líneas reales del despacho** (los números de destino). |
| «Los 42 trackers no swapean nada aquí» | Cierto, pero por un motivo mucho más grave. |

### 17 de los 20 números del sitio YA son números de CallRail

Y no de un tracker cualquiera: son los de **Google My Business**.

```
713-701-1731  →  tracker "Google My Business Houston"   →  línea real 713-230-8482
214-753-8315  →  tracker "Google My Business Dallas"    →  línea real 214-233-3054
312-477-0389  →  tracker "Google My Business Chicago"   →  línea real 312-288-8171
832-598-0914  →  tracker "Google-MB Houston N Loop"     →  línea real 713-230-8455
888-676-1238  →  tracker "Manuel Solis Website"         →  línea real 832-553-8784
… (16 en total; el mapa completo se saca de la API)
```

Solo 3 de los 20 son líneas reales: `713-844-2700`, `800-898-7180`, `888-351-4024`.

Esto explica todo lo demás:

1. **Por qué «Google My Business» es el 70,3 % de las llamadas.** No es que el
   perfil de empresa genere 7 de cada 10 llamadas. Es que sus números de
   rastreo están impresos por todo el sitio —header, barra fija de móvil,
   páginas de oficina, páginas de servicio—. Quien llega por búsqueda orgánica,
   lee un artículo del blog y llama a la oficina de Houston queda registrado
   como **Google My Business Houston**, porque ese tracker es el dueño del
   número. El tráfico orgánico, social, del boletín y directo del sitio se
   acredita sistemáticamente a Google.
2. **Por qué el sitio solo aparece con el 1,8 %.** Únicamente el 888 del header
   cae en el tracker «Manuel Solis Website».
3. **Por qué no había ningún pool cubriendo el sitio.** Simplemente nunca se
   creó: los 8 pools de la cuenta son de las landings de Google Ads.

### Reparto real de las llamadas (muestra de 3.000, 18–27 ago 2026)

| Fuente | % |
| ------ | - |
| Google My Business | **70,3 %** |
| Google Ads | 19,8 % |
| Print Ad | 3,3 % |
| **Manuel Solis Website** | **1,8 %** |
| Facebook (todo) | ~1,5 % |
| Direct | 0,5 % |

~90 % del teléfono acreditado a propiedades de Google. Y los 8 pools de sesión
de la cuenta se llaman **todos** «Google Ads: Landing Pages», operan sobre
landings PHP heredadas (`mm.manuelsolis.com`, `mme.manuelsolis.com`,
`ad.manuelsolis.com`) y ninguno cubre manuelsolis.com. La única atribución a
nivel de sesión que existe en la cuenta es la de Google Ads.

### NO hace falta cambiar los números del sitio

> Rectificación del mismo 2026-08-27. Una versión anterior de esta sección decía
> que el sitio tenía que publicar las líneas reales del despacho. **Era falso**,
> y venía de interpretar mal un error de la API.

Al crear el pool, CallRail devolvía `{"errors":"Swap targets invalid"}`. Se
interpretó como «un objetivo no puede ser un número que ya es de rastreo». No lo
es: probado con destino inválido a propósito —para que la creación no pudiera
completarse nunca— el error sale **igual** con una línea real que con un número
de rastreo. La causa era de formato:

| Operación | Forma de `swap_targets` |
| --------- | ----------------------- |
| Lo que devuelve el `GET` | `[{"type":"number","target":"+1…"}]` |
| Lo que exige el `POST`   | `["+1…"]` — **array de strings** |

Con la forma correcta se aceptan un objetivo, dos, o los 20 del sitio a la vez.
Los números del sitio se quedan como están, y el NAP no se mueve.

Además, el swap **no afecta al NAP frente a Google**: `swap.js` trae detección
de bots (`is_bot`, y `getSecondScript` no llega a pedir asignación si está
activa), así que el rastreador ve el número que hay en el HTML. Quien ve un
número de pool es el visitante humano con JavaScript.

### La restricción real: una llamada por destino

Un pool tiene **un solo** `destination_number`. Como cada oficina reenvía a una
línea distinta (Houston → 713-230-8482, Dallas → 214-233-3054, …), meter los 20
números en un pool único **desviaría las llamadas de oficina al destino
equivocado**. Hace falta un pool por destino.

De ahí el orden recomendado:

1. **Pool del CTA del sitio** — objetivo `+1 888-676-1238`, destino
   `+1 832-553-8784` (exactamente a donde ya reenvía hoy). Cubre la barra
   superior de escritorio y la barra fija de móvil en todo el sitio salvo las
   páginas de oficina. Un objetivo, un destino, cero ambigüedad.
2. **Después, un pool por oficina**, empezando por las de más volumen (Houston,
   Dallas, Chicago). Cada uno con su propio destino.

Mínimo por pool: **4 números** (máximo 300). Ese es el coste: cada número del
pool se factura.

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
| `cookie_duration`              | ~~180~~ → **30** | Corregido el 2026-08-26 (ver corrección arriba) |
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

`NEXT_PUBLIC_CALLRAIL_SWAP_SRC` ya está definida en Vercel (Production +
Preview, visibilidad `config`). Sin la variable el script no se monta y el
sitio enseña los números reales, así que quitarla es el rollback inmediato.

## Estado verificado en producción (2026-08-26)

Comprobado con Chrome real (Playwright sobre el Chrome del sistema) contra
`https://www.manuelsolis.com/es/abogado-inmigracion-houston` con UTMs de paid.
No es inferencia: es lo que hace el navegador.

| Comprobación | Resultado |
| ------------ | --------- |
| `script[src*=callrail]` en el DOM | sí |
| `GET cdn.callrail.com/…/swap.js` | **200** |
| `window.CallTrk` definido | sí |
| `POST js.callrail.com/…/swap_session.json` | **200** (el `connect-src` funciona) |
| Violaciones de CSP | **ninguna** |
| Números sustituidos | **ninguno** |

Y la respuesta del servidor de CallRail, que es la prueba definitiva:

```json
{"a":{},"r":{},"domless":false,"number_assignment":false,
 "integration_retry":false,"integration_retries":[]}
```

`number_assignment: false` y `a: {}` vacío: **CallRail recibió los 20 números
del sitio y no asignó ninguno.** Confirma por la vía empírica lo que el cruce
de `swap_targets` ya indicaba. El lado sitio está completo y funcionando; lo
único que falta para que se atribuya una llamada es configuración de panel.

El arreglo del remount se verificó por separado: se marcó el `<a>` del teléfono
del header, se simuló el swap de CallRail reescribiendo texto y `href`, y tras
una navegación de cliente el elemento marcado **ya no existía** — es decir, el
nodo se destruye y entra uno nuevo como `addedNode`, que es la ruta que el
`MutationObserver` de CallRail sí observa. Si React lo hubiera mutado en sitio,
el elemento marcado seguiría vivo con el número real.

Nota: esas comprobaciones dejaron 3 sesiones de visitante en la cuenta de
CallRail (2 con landing `localhost`, 1 con
`utm_campaign=callrail-verificacion`). Son identificables y no tienen llamadas
asociadas.

## Pendiente en el panel de CallRail (no se puede hacer desde el repo)

1. **Añadir los números del sitio como objetivos del pool.** Confirmado en
   producción: el pool los descubre y los reporta, el servidor responde
   `number_assignment: false`. Esto es lo único que separa la instalación
   actual de tener atribución de llamadas real.
   > Se puede hacer por API en vez de a mano, pero hace falta una **API key de
   > CallRail** (Account → Settings → Integrations → API Keys). No existe
   > ninguna en el repo ni en las variables de entorno de Vercel; el
   > `access_key` que lleva el snippet es público y solo sirve para leer, no
   > para escribir configuración.
2. **Dimensionar el pool.** Con `cookie_duration: 180` el pool no cubre
   «visitantes concurrentes» sino **visitantes únicos dentro de la ventana de
   cookie**, que es un orden de magnitud más. Cuando se agota, CallRail recicla
   el número más antiguo y la atribución se degrada **sin avisar**. Hace falta
   el pico real de visitantes únicos/día separando pagado de orgánico (Vercel
   Analytics o GA4) antes de fijar un tamaño; cada número del pool se factura.
3. **Retirar o reetiquetar los 15 trackers `all`.** Mientras existan, cualquier
   llamada a esos números entra en un cubo que no distingue canal.
4. **Dejar `trump_sources` en `false`** y `cookie_duration` idealmente en 30.
5. **El dato de tráfico para el punto 2 sigue pendiente.** No se pudo obtener:
   el MCP de Vercel no tenía token OAuth en la sesión y la API de Web Analytics
   devuelve 404 en los seis endpoints probados con el token del CLI. Hay que
   leerlo a mano en Vercel → Analytics (visitantes únicos/día del último mes,
   separando pagado de orgánico) o en GA4. Bajar `cookie_duration` a 30 días
   reduce el pool necesario ~6× y es la palanca más barata.
6. **CallRail → BOS.** El snippet mide; no crea el lead. Enlazar la llamada con
   el registro de BOS es trabajo aparte (webhook).
7. **Google Business Profile:** el número principal de cada ficha se queda con
   el real. El de seguimiento va como número adicional, nunca al revés.
8. **`form_capture` seguir apagado.** Los formularios ya postean a BOS vía
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
