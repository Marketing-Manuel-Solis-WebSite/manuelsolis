# Auditoría de cierre — 11 de agosto de 2026

> **Método.** Todas las cifras se miden sobre el HTML prerenderizado (`.next/server/app`, 343 páginas) y se verifican contra producción con peticiones reales. Ninguna afirmación de este documento sale de leer el código y suponer qué produce. El script de medición vive en el scratchpad de la sesión y se puede volver a correr.
>
> **Alcance.** Cierra el trabajo abierto por tres auditorías: la interna de 174 hallazgos (4-ago), la externa de eSEOspace (10-ago) y la lista de seguimiento del 11-ago. Estado del sitio al cerrar: `ae60050` + los commits de esta sesión.

---

## 1 · Estado medido

| Métrica | Valor |
|---|---|
| Páginas prerenderizadas | 343 (371 rutas con ambos idiomas) |
| Páginas públicas con SEO completo | 340 / 340 |
| Sedes | 20 (10 atendidas + 10 con cita) |
| Pruebas automatizadas | 212 |
| **H1 que se extraen pegados o duplicados** | **0** |
| `og:image` distintas | 101 |
| `og:image` genérica restante | 44 páginas |
| `og:image` más pesada | 486 KB |
| `aggregateRating` / `Review` en el marcado | **0 / 0** (correcto) |

### Cobertura de schema

| Tipo | Páginas |
|---|---|
| `LegalService` | 340 |
| `BreadcrumbList` | 338 |
| `FAQPage` | 198 |
| `Person` | 154 |
| `BlogPosting` | 112 |
| `parentOrganization` | 90 |
| `Attorney` | 58 |
| `knowsLanguage` | 40 |
| `VideoObject` | 4 |
| `Speakable` / `HowTo` | 0 — **decisión deliberada, ver §5** |

### Duplicación de las fichas de accidentes por oficina

Jaccard sobre shingles de 6 palabras del HTML visible, filtrando el boilerplate del grupo:

| Grupo | Páginas | Similitud media | Máx |
|---|---|---|---|
| Indexables | 10 | **0,023** | 0,10 |
| Retiradas del índice (`noindex`) | 5 | 0,275 | 0,313 |

Las cinco direcciones virtuales **eran** el cúmulo apretado. Retirarlas deja el grupo indexable prácticamente sin duplicación.

---

## 2 · Cerrado en esta sesión

### Consistencia de entidad

- **Siete lugares publicaban el conteo de oficinas a mano** y se contradecían tras pasar a 20 sedes: la meta de `/servicios/inmigracion` decía 10 mientras sus cinco tarjetas decían 15; `/testimonios` mostraba 10 con la etiqueta "Oficinas en EE.UU."; `defensa-deportacion` tenía título y stat con 15; `vawa` y `visa-u`, 15 en sus subtítulos; `llms.txt`, tres menciones de 15. **Todos derivan ahora del registro.**
- **No se unificó a "20" en todo el sitio**, que es lo que pedía la lista de seguimiento. Son 20 **sedes** = 10 atendidas + 10 que solo abren con cita. Llamar "oficina" a un domicilio de centro de negocios sin personal es el riesgo de ficha de Google que la propia lista señala en su §6. Lo que se unificó es que **cada cifra diga qué cuenta**.
- **Una ciudad donde el despacho no tiene oficina.** Las listas a mano de `visa-u` y `defensa-deportacion` decían "San Antonio (Main St)", "San Antonio (Kirby)" y "Kirby (San Antonio)". Main St y Kirby son direcciones de **Houston**. Dos páginas de servicio anunciaban San Antonio. Eliminado al derivar del NAP.

### Titulares

- **53 H1 se extraían pegados** en cuatro plantillas (heroes de servicio, 30 fichas de accidentes, categorías, `/inversionistas`), más la FAQ, que además **duplicaba cada palabra** por una copia decorativa con `aria-hidden` dentro del titular — `aria-hidden` la oculta a lectores de pantalla, no a los extractores. El texto del brillo pasó a CSS con `content: attr()`. **Ahora: 0 en todo el sitio.**
- La ficha de accidentes decía **"Abogado de Accidentes / Accidentes en Dallas, TX"**: palabra repetida en el salto de línea, visible en pantalla. Ahora usa la misma zona que el `<title>` y el schema.

### Las 20 sedes

- Alta de las 5 direcciones del área de Chicago, desglosadas por calle bajo Chicago en el menú y en el índice.
- **`city` es el municipio real** (Schaumburg, Park Ridge, Chicago, Burr Ridge, Naperville), no "Chicago". Es la convención que ya seguía la oficina de Chicago, cuya dirección está en Cicero.
- **Portadas: la entrada del edificio de cada una**, identificada mirando las 22 fotos entregadas y reconocible por el número de calle rotulado (10, 125 South Wacker, 1333, 1560). Recorte 16:9 elegido foto por foto y verificado visualmente: en Prospect y Wacker el acceso está en el tercio inferior y un recorte centrado los perdía.
- **Tres acoplamientos equivocados desatados**, todos con la misma forma — algo derivaba de "quién tiene ficha de Google" en vez de "qué oficinas existen":
  1. `OfficeSlug` salía del mapa de fichas → una oficina no podía existir sin GBP.
  2. `getOficinasEntries()` del sitemap → **las 10 URLs nuevas quedaron fuera del sitemap**, vivas e invisibles.
  3. `PHYSICAL_OFFICE_COUNT`, repetido en 4 archivos con esa derivación.
- **Y dos sitios donde no se veían aunque estuvieran en los datos:** el desplegable de escritorio (pintaba `subOffices` solo para Houston) y el explorador de la portada (lista escrita a mano que se quedó con 15).
- `lastmod` corregido: salían con fecha de abril, cuatro meses antes de existir.

### Imágenes sociales

`og:image` apunta al archivo **crudo** de `public/`, no al que optimiza `next/image`: es el byte que descarga WhatsApp en cada comparticón.

| Antes | Ahora |
|---|---|
| `/accident-hero.png` 1.420 KB | 250 KB |
| `/MSTeam.png` 1.658 KB | 137 KB |
| `/openers/Jennifer.png` 1.285 KB | 175 KB |
| `Roberto Garcia.png` 1.247 KB | 119 KB |
| `/immigration-hero.png` 915 KB (×4 páginas) | 135 KB |
| `/family-hero.png` 894 KB | 114 KB |
| `/criminal-hero.png` 785 KB | 74 KB |
| `/insurance-hero.png` 632 KB | 71 KB |

**5,7 MB → 1,1 MB** en los heroes, más cuatro retratos. Ninguna og:image pasa ya de 486 KB.

### Otros

- **Aviso antifraude en el footer de todas las páginas**, enlazando al artículo que ya existe sobre fraude de notarios. Antes solo estaba en la portada, y quien llega por búsqueda o por IA aterriza en un artículo o una ficha — nunca lo veía. Es justo la persona a la que apunta la estafa.
- **14 redirecciones que faltaban**, sacadas de los 404 reales de producción. La más pedida, `/en/about-us-manuel-solis-law-firm`, con 14 al día. El patrón que las hacía invisibles: el mapa cubría la forma corta del slug antiguo y no la larga.
- **`noindex` en las 5 direcciones virtuales** de la plantilla de accidentes (10 URLs), excluidas del sitemap para no anunciar lo que dice "no me indexes".
- **`llms.txt`** en la raíz, generado desde el registro.
- **`robots.txt`**: los agentes de **consulta** de IA declarados explícitamente.
- **Techo de gasto del chat** (`CHAT_DAILY_MESSAGE_BUDGET`), compartido entre instancias.

---

## 3 · Guardas nuevas: lo que ahora falla solo

Cada fallo de esta sesión que no rompía nada dejó una prueba:

| Guarda | Qué impide |
|---|---|
| Conteo de oficinas literal en el copy | Que vuelvan las cifras contradictorias |
| `OfficesExplorer` lista todas las sedes | Un alta invisible en la portada |
| Peso de las `og:image` (≤ 500 KB) | Un PNG de 1,6 MB en cada comparticón |
| `og:image` declarada que no existe | Un enlace compartido sin imagen |
| Fecha del índice = fecha del `page.tsx` | Un post enlazado y en 404 |
| Toda ficha de Google apunta a una oficina real | Fichas huérfanas al renombrar |
| Sedes sin ficha de Google = solo las nuevas | Olvidar que quedaron pendientes |
| Sedes sin página de accidentes = solo las nuevas | Reconstruir el cúmulo de duplicados |
| FAQ dentro del `<main>`, antes del footer | Una sección colgada bajo el pie |
| Reglas de las FAQ de servicio (13 pruebas) | Gratuidad fuera de accidentes, promesas, montos |

---

## 4 · Lo que NO se puede hacer desde el repositorio

**Estos cinco necesitan accesos o decisiones que no tengo. Ninguno es un descuido.**

### 4.1 · Los tres subdominios legado — *el único que hace daño hoy*

`v2.manuelsolis.com` sirve un WooCommerce de plantilla con `<title>User's blog` y páginas `home-1`; su `robots.txt` **no bloquea el rastreo**. `tn.manuelsolis.com` no es "una política de privacidad": es una landing de *Abogado de inmigración en Memphis* que canibaliza la página propia de Memphis y **publica otro teléfono**. `detainees.manuelsolis.com` dice "10 oficinas / 4 estados", que ya no es cierto.

Están en **Apache y nginx ajenos a Vercel** y el DNS está en GoDaddy. Necesita a quien administre esos servidores. El plan es 301 de cada URL indexada a su equivalente y luego retirada en Search Console.

### 4.2 · Los bots de **entrenamiento** de IA

`GPTBot`, `ClaudeBot`, `CCBot` y `anthropic-ai` siguen bloqueados. Los de **consulta** (`OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Applebot-Extended`) están permitidos y declarados, así que **la afirmación de que ChatGPT no puede citar el sitio es falsa**: cuando alguien pregunta y ChatGPT va a buscar, entra.

Abrir los de entrenamiento es borrar cuatro líneas de `app/robots.ts`. **Es decisión del despacho, no técnica:** lo que un modelo ingiere no se retira, y puede citar al despacho equivocándose en materia migratoria.

### 4.3 · Tope de gasto en la consola de Anthropic

El techo del sitio limita el gasto que se puede provocar **a través del sitio**. **No protege la clave**: quien la tenga llama a Anthropic directamente. Para eso solo sirven rotarla —descartado por el despacho— o un límite de gasto en la consola, que son dos minutos en *Settings → Limits*.

### 4.4 · Revisión jurídica

- **Los 20 artículos publicados** citan derecho de junio–julio de 2026, posterior a mi corte de conocimiento. Se escribieron con el alcance exacto del brief, sin inventar casos, montos ni plazos, y llevan fecha de revisión visible. **Están públicos sin firmar.** Es el pendiente más expuesto.
- **Las 42 preguntas de servicio** están escritas, desplegadas y **sin publicar** (`approved: false` por servicio en `app/lib/serviceFaq.ts`). Documento de revisión en `docs/REVISION-FAQ-SERVICIOS.md`.

### 4.5 · Datos que no puedo inventar

- **Teléfonos propios de las 5 sedes nuevas.** Publican el local de Chicago `(312) 477-0389`; es cierto y cumple el formato, pero marketing no ha asignado líneas de seguimiento.
- **Coordenadas** de las 5 nuevas: sin ficha de Google no hay pin, y unas a ojo mandan a la manzana equivocada. El schema omite `geo` y Google geocodifica la dirección postal, que sí es exacta.
- **Juzgado o corte más cercana** por sede: no está en ningún dato del repositorio.
- **Transcripciones de los vídeos** de testimonio: no puedo verlos.
- **`sameAs`** de abogados (Avvo, LinkedIn): no tengo las URLs.
- **`knowsLanguage`** por abogado: el despacho es bilingüe como firma, pero los datos no dicen qué idiomas habla cada abogado. Afirmarlo por los 21 sería inventarlo.

### 4.6 · Accesos externos

- **Search Console y GA4:** sin ellos no se puede confirmar qué URLs están indexadas de verdad, ni la paridad de analítica servidor/cliente, ni cerrar el auto-análisis del programa de SEO.
- **Las 20 fichas de Google Business:** auditoría NAP, categorías y fotos.
- **Firewall de Vercel:** confirmar que no bloquee por user-agent a los bots de consulta ya permitidos en `robots.txt`. Hay evidencia directa de que devuelve 429 a peticiones que no parecen navegador.
- **Rich Results Test:** vale hacerlo por *elegibilidad*, no por presencia — el JSON-LD sí es visible por crawl y está medido en §1.

---

## 5 · Recomendaciones que se descartan, y por qué

| Recomendación | Por qué no |
|---|---|
| **`AggregateRating` / `Review` con reseñas de Google** | Contra las políticas de datos estructurados de Google (reseñas de terceros y autopromocionales en `Organization`, y contenido que debe ser visible). Riesgo de acción manual. `googleReviews.ts` ya trae la media ponderada real: si se quiere el rating, hay que **mostrarlo en la página** con el valor vivo. |
| **Slugs en inglés + 301 para páginas EN** | La URL es una señal de posicionamiento débil. A cambio: 110+ redirecciones, cambio arquitectónico (hoy hay un slug por artículo, no por idioma) y los 20 artículos más nuevos se indexaron el 6 de agosto. Peor momento, menor ganancia. |
| **`Speakable`** | Atado a una superficie de Google Assistant que ya no se empuja. |
| **`HowTo`** | Google retiró sus resultados enriquecidos en 2023. |
| **`og:image` propia en la portada** | La portada **es** la página genérica; `og-default` es su tarjeta correcta, no un olvido. |
| **Unificar el conteo a "20" en todo el sitio** | Convertiría 10 domicilios de centro de negocios en "oficinas". Ver §2. |

De las 44 páginas que aún sirven la `og:image` genérica, la mayoría lo hace con razón: portada, páginas legales, política editorial. Quedan candidatas reales (`/oficinas`, `/nosotros`, `/colaboradores`, el índice del blog, las 3 ediciones del boletín) pero es cosmética y no hay imagen relevante con peso aceptable para varias.

---

## 6 · Siguiente paso por orden de retorno

1. **Los tres subdominios** — lo único que perjudica hoy. Necesita hosting.
2. **Firmar los 20 artículos** — lo único ya expuesto al público sin revisar.
3. **Aprobar las 42 preguntas** — desbloquea `FAQPage` en las 7 páginas de servicio que faltan, de una sola vez.
4. **`/case-results`** con reseñas *first-party*: la SERP de marca la fijan hoy Glassdoor y Yelp.
5. **Matriz ciudad × servicio** (VAWA y Asilo más allá de Houston/Dallas/Chicago).
6. **LCP y TBT en móvil**: bundles propios (~2 s) y 190 KB de CSS que bloquea el render. Requiere trabajo sobre el bundle, no un ajuste.
7. **`<html lang="es">` en las 152 páginas `/en`**: necesita `globalNotFound` experimental.

---

# Addendum — 12 de agosto de 2026

Cierra los cinco puntos que quedaban de la lista §6. Mismo método: todo medido sobre el HTML prerenderizado y con guardián automático donde el fallo era silencioso.

## Estado medido al cerrar

| Métrica | 11-ago | 12-ago |
|---|---|---|
| Páginas prerenderizadas | 343 | **363** (391 rutas) |
| Páginas públicas con SEO completo | 340 / 340 | **360 / 360** |
| Pruebas automatizadas | 212 | **296** |
| Landings ciudad × servicio | 25 | **35** |
| Páginas de servicio con `FAQPage` | 3 | **10** |

## Lo que se hizo

**1 · Las 42 preguntas de servicio, publicadas.** 84 preguntas (es/en) en 7 páginas que no tenían FAQ. Todas verificadas visibles en el HTML y con su `FAQPage` emitido — el error que se encontró al abrir la primera aprobación fue precisamente ese: la sección se renderizaba y el schema no, porque el cableado construía `faqSchema` y nunca lo emitía. Tres cifras legales van marcadas para revisión de un abogado con licencia (plazo de 2 años de lesiones en Texas, VAWA a 2 años del divorcio, plazo de 1 año del asilo).

**2 · Matriz ciudad × servicio, completa para VAWA y asilo.** De 3 ciudades cada uno a las **8** que tienen contenido local real: +20 URLs. El tope no es arbitrario — son las 8 ciudades con bloque propio en `CITY_LOCAL`, de donde salen la FAQ (5–6 preguntas) y los 3 casos típicos de cada página: corte de inmigración con dirección, condado, fiscalía y centros de detención.

Medido antes de publicar (Jaccard sobre shingles de 6 palabras del texto visible, filtrando boilerplate, **dentro de cada familia de servicio**): asilo baja de 0.400 a 0.396 y VAWA de 0.375 a 0.354. Las nuevas son menos plantilla que las que ya estaban indexadas.

> Corrección de método. El primer intento comparó estas páginas contra el 0.275 de las fichas de accidentes y contra un agregado de «las ya publicadas». Las dos comparaciones estaban mal: el 0.275 medía páginas del mismo servicio y la **misma** ciudad, donde solo cambiaba la dirección, y el agregado mezclaba familias con distinto número de ciudades, así que medía la composición de la muestra y no el contenido. La comparación válida es por familia.

**3 · Enlaces contextuales en el cuerpo de los artículos.** 21 enlaces en 14 de los 20 artículos con plantilla de datos, máximo 3 por artículo, primera aparición, uno por destino, nunca anidados. Se aplica **al renderizar**, no editando los 55 posts: quitarlo no deja rastro y 11 pruebas cubren la corrupción de marcado.

**4 · Bloque de abogado con nombre en las páginas de servicio.** 6 servicios lo muestran con foto, área declarada, colegiación y enlace al perfil. Cuatro lo omiten a propósito (asilo, VAWA, Visa U, Visa E-2): **ningún abogado del sitio declara esas áreas**, y poner una cara genérica ahí sería inventar una especialidad. No emite `Person` — la entidad vive en el perfil con su `@id`.

**5 · `og:image` propia en 6 plantillas más** (nosotros, oficinas, servicios, colaboradores, consulta, inversionistas), con un test que rechaza cualquier `og:image` de más de 500 KB. Ese límite existe porque se declaró `/MSTeam.png` (1,6 MB) el mismo día que se rechazó una imagen de ese peso para testimonios.

## Correcciones a este documento

- **«190 KB de CSS que bloquea el render» (§6.6) es falso.** Medido: 192 KB en disco son **20 KB por la red** con Brotli. El CWV móvil de este sitio no es un problema de peso de assets; es JavaScript propio. La cifra se citó varias veces sin medirla.
- **§6.3 y §6.5 quedan cerrados** por este addendum.

## Lo que sigue sin poder hacerse aquí

| Punto | Qué falta |
|---|---|
| Los tres subdominios | Acceso de hosting. Es lo único que perjudica hoy. |
| Firmar los 20 artículos | Revisión de un abogado con licencia. Ya están públicos. |
| Las 3 cifras legales de la FAQ | La misma revisión. |
| `/case-results` con reseñas *first-party* | Resultados reales y autorización para publicarlos. |
| Landings de Schaumburg, Park Ridge, Burr Ridge, Naperville y League City | Su bloque en `CITY_LOCAL`: nombre y dirección exactos de la corte de inmigración que les toca. Inventarlos mandaría a alguien al edificio equivocado el día de su audiencia. |
| LCP y TBT en móvil | Trabajo sobre el bundle propio (~2 s), no un ajuste. |
| `<html lang="es">` en las 152 páginas `/en` | `globalNotFound`, hoy experimental. |
