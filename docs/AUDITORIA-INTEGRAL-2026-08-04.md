# Auditoría técnica integral — manuelsolis.com

**Fecha:** 4 de agosto de 2026  
**Commit auditado:** `7102e33` (= `origin/main` = producción)  
**Alcance:** 117 rutas de página (×2 idiomas ≈ 230 URLs), 21 route handlers, 28 librerías de datos, 40 componentes globales, infraestructura y comportamiento en producción.  
**Método:** 17 auditores especializados en paralelo sobre el código real (cita archivo:línea obligatoria) + verificación adversarial independiente de los hallazgos P0/P1 + comprobaciones en producción con `curl`.

> **Estado de remediación (4-ago-2026).** Los 2 hallazgos P0 y la mayoría de los P1 ya tienen corrección aplicada en la rama `fix/auditoria-2026-08-04` (sin mergear a `main`, que despliega a producción). Lo que sigue abierto y depende de accesos o decisiones de negocio está listado al final, en «Plan de implementación». Las citas archivo:línea de este informe corresponden al commit auditado `7102e33`, así que en la rama de arreglos algunas se habrán desplazado.

## Resumen ejecutivo

Estado general: el proyecto **compila sin errores** (`tsc --noEmit` limpio, `next build` exitoso, todas las páginas `[lang]` prerenderizadas como SSG). No hay caídas ni errores de tipo. Los problemas encontrados son de **corrección funcional, seguridad, cumplimiento y datos**, no de estabilidad del build.

| Severidad | Cantidad | Naturaleza |
|---|---|---|
| **P0 — Crítico** | 2 | Secreto vivo publicado + todos los short links de campaña rotos |
| **P1 — Alta** | 18 | Contenido/enlaces rotos en producción, riesgo legal-publicitario, sesión admin no revocable, baja de newsletter imposible, GA4 sin conversiones, teclado bloqueado |
| **P2 — Media** | 68 | NAP inconsistente, schema fuera de directrices, tracking parcial, contraste, doorway parcial |
| **P3 — Baja** | 86 | Detalles, código muerto, limpieza |
| **Total** | 174 | |

De los 18 hallazgos P0/P1 sometidos a verificación adversarial, **0 fueron refutados**: 14 se confirmaron y 4 se rebajaron a P2 por severidad inflada.

### Las dos emergencias

1. **Token de API vivo publicado en GitHub** (`app/api/signup-proxy/route.ts:8-9`). El repositorio `Marketing-Manuel-Solis-WebSite/manuelsolis` es **público** (verificado con `gh repo view`: `"visibility":"PUBLIC"`), así que la credencial de `solislawruler.azurewebsites.net` es legible por cualquiera en internet. Está en `HEAD` y en el historial desde el commit `4daf766`, por lo que borrarla del código no la des-publica: **hay que rotarla en Azure**. Agravante: el endpoint no tiene ningún consumidor en el sitio y funciona como relay abierto sin validación.

2. **Todos los short links `/go/*` devuelven 404 en producción** (`proxy.ts:149`). Verificado en vivo: `GET /go/ig-bio` → `307` → `/es/go/ig-bio` → `404`. El matcher del middleware no excluye `/go/`, así que el redirect de idioma se ejecuta antes del route handler y este nunca corre. Los 10 slugs afectados son precisamente los publicados fuera del sitio: bios de Instagram, Facebook y TikTok, descripciones de YouTube, dos fichas de Google Business Profile, el enlace de WhatsApp, la campaña de newsletter y el QR de la tarjeta de presentación. **Cada clic desde esos canales se pierde y no se registra.** El arreglo es una línea.

### Patrón de fondo: una sola causa raíz detrás de decenas de síntomas

El hallazgo estructural más importante no es ninguno de los defectos individuales, sino que **el NAP de cada oficina (dirección, teléfono, horario, coordenadas, enlace de mapa) está duplicado a mano en seis fuentes paralelas** sin registro único: el índice `/oficinas`, cada `OfficeClient.tsx`, cada `page.tsx` (schema), `officesRegistry.ts`, `officesPhoneMap.ts` y `accidentesOfficesData.ts`. Ya divergieron entre sí. De ahí salen, como síntomas, el botón de mapa de Memphis que lleva a Houston, horarios contradictorios entre landing y ficha, coordenadas desviadas kilómetros, teléfonos cruzados entre ciudades y "Abierto 24 horas" en oficinas virtuales. Corregir los síntomas uno por uno los volverá a traer; la corrección real es derivar todo de `officesRegistry.ts`.

El segundo patrón sistémico: **ningún modal del sitio público implementa el patrón de diálogo** (0 resultados para `role="dialog"|aria-modal|focus trap` en `app/`), y los disparadores interactivos se construyeron como `<div onClick>` o `<span>` en lugar de `<button>`. Eso bloquea el teclado en la navegación principal, los videos de testimonios y el chat.

---

## P0 — Crítico (acción inmediata)

### 1. [SEC-1] Token de API vivo hardcodeado en app/api/signup-proxy/route.ts y commiteado a GitHub, en un endpoint público sin validación ni consumidores

**Severidad:** P0 · **Área:** Seguridad de APIs y admin · ✅ confirmado en verificación adversarial

**Archivo:** `app/api/signup-proxy/route.ts`

**Alcance:** POST /api/signup-proxy (1 route handler, alcanzable desde Internet en todos los dominios del proyecto). El secreto está en HEAD de origin/main y en el historial (commit 4daf766), por lo que también vive en todas las ramas remotas listadas (origin/feat/*, origin/hotfix/*, etc.).

**Evidencia:**

Líneas 6-13:
```
const EXTERNAL_API_URL = 'https://solislawruler.azurewebsites.net/api/signup';
// Usamos HARDCODED_TOKEN para evitar problemas de parsing en .env.local con el símbolo '$'
// Este es el token confirmado: «TOKEN-REDACTADO-VER-ARCHIVO»
const HARDCODED_TOKEN = '«TOKEN-REDACTADO-VER-ARCHIVO»'; 
```
Confirmado en git: `git grep -nI "HARDCODED_TOKEN"` → `app/api/signup-proxy/route.ts:8` y `:9`; `git log --all --oneline -S "HARDCODED_TOKEN"` → `4daf766 Cambios semi finales`; remoto `https://github.com/Marketing-Manuel-Solis-WebSite/manuelsolis.git`.
Además el endpoint no valida nada del body (líneas 35-48): `const data = await request.json();` y reenvía `firstName/lastName/email/phone/acceptedTerms/receiveUpdates` tal cual con `'X-Api-Token': EXTERNAL_API_TOKEN` (líneas 51-59). No hay consumidor en la app: `grep -rn "signup-proxy" app --include=*.tsx --include=*.ts` solo devuelve el propio archivo (línea 1, el comentario de ruta).

**Causa raíz:** Se optó por hardcodear el token para evitar problemas de parsing de `$` en `.env.local` (así lo dice el comentario) y el archivo quedó commiteado. El endpoint quedó además como relay abierto: cualquiera puede POSTear al proxy y crear registros en el sistema externo `solislawruler.azurewebsites.net` usando nuestro token, sin captcha, sin BotID y sin validación de email/teléfono (el rate limit de 5/min es in-memory, ver SEC-6).

**Corrección:** 1) Rotar YA el token en el sistema Azure (asumir comprometido: está en GitHub y en el historial). 2) Borrar el endpoint si no tiene consumidores (no los tiene) — es el arreglo correcto y elimina el relay. 3) Si debe existir: mover el token a env var en Vercel (`API_SOLIS_TOKEN`), leerlo con `process.env` y fallar cerrado si falta; validar email con regex + `acceptedTerms === true`, cap de longitud por campo, y añadir `checkBotId()` como en `/api/lead-capture:48`. 4) Purgar el secreto del historial (git filter-repo / BFG) o, si no es viable, dejar constancia de la rotación en la memoria del proyecto.

> Reportado de forma independiente por 3 auditores (INFRA/INF-1, LEADS/LEAD-1, APISEC/SEC-1).

> **Verificador:** Evidencia verificada literalmente: el token vive en app/api/signup-proxy/route.ts líneas 8-9 y se envía como X-Api-Token (línea 55) a solislawruler.azurewebsites.net; git grep confirma que está en origin/main (HEAD = 7102e33, que es producción) y el commit introductor 4daf766 está en todas las ramas remotas. No existe mitigación en ninguna parte: el matcher de proxy.ts excluye explícitamente /api (línea 149), no hay nada en next.config/vercel.json/app/lib, no hay validación del body, el rate limit es in-memory por IP spoofeable, y no hay ningún consumidor del endpoint en la app (solo menciones en docs). Factor agravante no citado por el auditor: `gh repo view` confirma que el repo Marketing-…

---

### 2. [PROD-1] Todos los short links /go/* están rotos en producción: el middleware los redirige a /{lang}/go/* que devuelve 404, perdiendo clicks de campañas y leads

**Severidad:** P0 · **Área:** Producción en vivo · ✅ confirmado en verificación adversarial

**Archivo:** `proxy.ts:149`

**Alcance:** Los 8+ slugs del registry (ig-bio, fb-bio, tiktok-bio, youtube-desc, gbp-houston, gbp-dallas, wa-consulta, newsletter-mayo-vawa, ...) — links publicados en bios de Instagram/Facebook/TikTok, descripciones de YouTube, Google Business Profiles y newsletters. El route handler app/go/[slug]/route.ts es inalcanzable: ningún /go/* funciona.

**Evidencia:**

Producción (curl con UA Chrome): `GET https://www.manuelsolis.com/go/ig-bio` → `HTTP/1.1 307 Temporary Redirect / Location: /es/go/ig-bio`; y `GET https://www.manuelsolis.com/es/go/inexistente` → `HTTP/1.1 404 Not Found` (página not-found del sitio; no existe ruta [lang]/go — Glob solo encuentra `app/go/[slug]/route.ts`). El slug ig-bio es real: app/lib/shortLinks.ts:53 `slug: 'ig-bio'`. El handler nunca ejecuta su lógica (302 con UTMs + registro de click en analyticsStore, app/go/[slug]/route.ts:109-115).

**Causa raíz:** El matcher del middleware en proxy.ts:146-150 excluye `api|rss|_next/static|_next/image|_vercel` y estáticos, pero NO excluye `/go/`. Al no tener prefijo de locale, /go/<slug> cae en el bloque de redirección de idioma (proxy.ts:127-133: `new URL(`/${locale}${pathname}`, ...)` + `NextResponse.redirect`) y nunca llega al route handler app/go/[slug]/route.ts. Resultado: usuario en 404 y cero tracking del click.

**Corrección:** En `proxy.ts:149` añadir `go/` al negative lookahead del matcher, junto a `api` y `rss` (el resto del patrón queda igual, incluido el escape `\\.` de las extensiones estáticas). Alternativa equivalente y más legible: early-return `if (pathname.startsWith('/go/')) return NextResponse.next();` antes del bloque de locale en `proxy()`. Tras el deploy, verificar en navegador que `https://www.manuelsolis.com/go/ig-bio` responde 302 al destino con los `utm_*` inyectados y que el clic queda registrado.

> Reportado de forma independiente por 4 auditores (PROD-1, INFRA/INF-2, LINKS/LINK-1, I18N/I18N-1).

> **Verificador:** Verificado en el código real: (1) el matcher de proxy.ts:146-150 no excluye /go — solo api|rss|_next/static|_next/image|_vercel y extensiones estáticas — así que /go/<slug> entra al middleware; (2) sin prefijo de locale cae en proxy.ts:127-133 (307 a /{locale}/go/<slug>; 301 para crawlers en :117-124); (3) no existe app/[lang]/go ni ningún catch-all bajo app/[lang] (listado literal de las 45 entradas), por lo que /es/go/* es 404 garantizado; el único handler está en app/go/[slug]/route.ts y es inalcanzable; (4) no hay mitigación: next.config.ts no tiene rewrites, sus redirects (apex→www + seoRedirects) no tocan /go, no hay vercel.json ni otro middleware; (5) los 10 slugs de app/lib/shortLink…

---

## P1 — Alta

### 1. [SRV-1] La imagen hero (LCP, priority) de la página de Visa U apunta a /Manuel_Solis.png, archivo que no existe en public/ — imagen principal rota en producción

**Severidad:** P1 · **Área:** Home y páginas de servicio · ✅ confirmado en verificación adversarial

**Archivo:** `app/[lang]/servicios/visa-u/VisaUClient.tsx`

**Alcance:** /es/servicios/visa-u y /en/servicios/visa-u (2 URLs)

**Evidencia:**

VisaUClient.tsx:63: `<Image src="/Manuel_Solis.png" alt={isEs ? 'Manuel Solís - Abogado experto en Visa U' : ...} fill ... priority sizes="(max-width: 768px) 100vw, 50vw" />`. Glob de public/**/*anuel* solo devuelve: logo-manuel-solis.png, manuelsolisl.png, Voces_ManuelSolis.png, UniendoFamilias_ManuelSolis.png, abogado-manuel-solis.jpg. `du public/Manuel_Solis.png` → 'No such file or directory'. No hay redirect ni rewrite para esa ruta (grep en seoRedirects.ts sin resultados).

**Causa raíz:** El componente referencia un nombre de archivo que nunca se subió al repo (o se renombró). En Vercel (filesystem case-sensitive) /_next/image devuelve error y el hero muestra el icono de imagen rota/alt en lugar del retrato, en el elemento marcado como LCP de la página.

**Corrección:** En app/[lang]/servicios/visa-u/VisaUClient.tsx:63 cambiar src a una imagen existente (p. ej. /manuelsolisl.png, la misma del hero del home, o /home-image.jpg como usan asilo y vawa) o añadir el archivo Manuel_Solis.png a public/. Verificar visualmente el encuadre porque el className tiene un -translate-y-[280px] ajustado a la imagen original.

> **Verificador:** Evidencia verificada al 100%: VisaUClient.tsx:63 referencia <Image src="/Manuel_Solis.png" fill priority> en el hero (el propio comentario del componente lo declara "LCP sacred"), y el componente se monta desde page.tsx:98 para /es y /en/servicios/visa-u. El archivo no existe en public/ (Test-Path False) y `git log --all --follow` demuestra que NUNCA se commiteó, por lo que ningún deploy de Vercel lo ha servido jamás. Sin mitigación: next.config.ts redirects() solo tiene apex→www + seoRedirects (sin entradas .png), proxy.ts no toca la ruta, no hay rewrites. Resultado: /_next/image devuelve error, el <img> priority muestra icono roto/alt y la columna hero (450px–80vh, mitad del viewport en de…

---

### 2. [OFI-1] El botón 'Ver en mapa' de la página de Memphis envía al usuario a la oficina de Main St en Houston (link de GBP equivocado)

**Severidad:** P1 · **Área:** Oficinas y datos NAP · ✅ confirmado en verificación adversarial

**Archivo:** `app/[lang]/oficinas/memphis/OfficeClient.tsx`

**Alcance:** /es/oficinas/memphis y /en/oficinas/memphis (2 URLs, UI visible)

**Evidencia:**

memphis/OfficeClient.tsx:19 → `mapLink: 'https://share.google/Fc3ISgQAihcayfmws',` — valor byte a byte idéntico al de main-st/OfficeClient.tsx:19 (`mapLink: 'https://share.google/Fc3ISgQAihcayfmws',`). El propio repo lo reconoce: memphis/page.tsx:23 → `mapUrl: "https://www.google.com/maps/search/?api=1&query=...Memphis+TN+38116" // TODO(GBP): reemplazar por el share-link real de Memphis (el anterior era el de Main St)` y accidentesOfficesData.ts:257 repite el mismo TODO. El fix se aplicó al schema (page.tsx) y a las páginas de accidentes, pero NO al OfficeClient que renderiza el link visible.

**Causa raíz:** El NAP está duplicado en 3 archivos por oficina; la corrección del share-link de Memphis (2026-06) se hizo en page.tsx y accidentesOfficesData.ts pero se omitió OfficeClient.tsx, que es el que ve el usuario.

**Corrección:** En app/[lang]/oficinas/memphis/OfficeClient.tsx:19 sustituir el mapLink por el share-link real de la ficha GBP de Memphis (o, mientras se consigue, por la misma search-URL usada en page.tsx: https://www.google.com/maps/search/?api=1&query=Manuel+Solis+Law+Firm+3385+Airways+Blvd+STE+320+Memphis+TN+38116). Estructural: derivar mapLink de una única fuente (ver OFI-2).

> **Verificador:** Evidencia verificada byte a byte: memphis/OfficeClient.tsx:19 contiene mapLink 'https://share.google/Fc3ISgQAihcayfmws', idéntico a main-st/OfficeClient.tsx:19, y main-st/page.tsx:23 usa esa misma URL como mapUrl propio de Main St. OfficePageView.tsx:102-105 pasa data.mapLink sin validación (el fallback solo cubre el placeholder 'your_map_link_here') y lo renderiza en la línea 178 como href del ancla visible 'Ver en mapa'/'View on map'; memphis/page.tsx:95 monta ese OfficeClient en /es y /en. Git confirma la causa raíz: el commit 5ea8547 (2026-07-03) removió el link de Main St de memphis/page.tsx y accidentesOfficesData.ts dejando los TODO citados ('el anterior era el de Main St'), pero nunc…

---

### 3. [BLOG-1] Las 2 páginas de categoría son catálogos fantasma: 59 artículos legacy de WordPress cuyos enlaces redirigen todos al índice del blog y que no listan ninguno de los 35 posts reales

**Severidad:** P1 · **Área:** Blog y categorías · ✅ confirmado en verificación adversarial

**Archivo:** `app/[lang]/category/proteccion-legal-para-migrantes/ProteccionLegalClient.tsx`

**Alcance:** 4 URLs indexables y enlazadas sitewide desde el Footer: /es|/en/category/derechos-de-migrantes (6 artículos) y /es|/en/category/proteccion-legal-para-migrantes (53 artículos). Ambas están en el sitemap (app/lib/sitemapData.ts:124-125) y en el Footer (app/components/Footer.tsx:194,198).

**Evidencia:**

ProteccionLegalClient.tsx:51 `url: "/proteccion-legal-para-migrantes/derechos-de-los-inmigrantes-en-estados-unidos"` (53 entradas con isoDate de "2020-03-14" a "2025-02-18"); DerechosMigrantesClient.tsx:51 `url: "/derechos-de-migrantes/derechos-migratorios-que-hacer-si-son-transgredidos"` (6 entradas nov-2024). Esas rutas no existen en app/ y seoRedirects.ts:168 `{ source: '/proteccion-legal-para-migrantes/:slug*', destination: '/es/blog', permanent: true }` y :177 `{ source: '/derechos-de-migrantes/:slug*', destination: '/es/blog', permanent: true }` las 301-redirigen al índice. Incluye contenido off-topic/caducado: línea 135 "titulo-profesional-analista-de-sistemas-informaticos", :147 "malpractica-medica", :207 "cambios-importantes-en-las-politicas-de-inmigracion-en-los-primeros-100-dias-de-biden". Autores mostrados: "Carlos Anaya Ruiz" (52) y "Dan Motzer" (1) — sin perfil ni credencial legal, en contraste con los posts reales (autor Manuel Solís con schema Person). Ningún slug de los 35 posts reales aparece en estas páginas.

**Causa raíz:** Los dos *Client.tsx llevan hardcodeado el listado del antiguo blog WordPress (títulos/URLs/autores/fechas 2020-2025). Al migrar a Next.js se redirigieron los artículos antiguos a /es/blog pero nunca se actualizó el contenido de las páginas de categoría, que quedaron congeladas apuntando a URLs muertas.

**Corrección:** Reescribir ambas páginas para listar posts reales de BLOG_DATA filtrados por categoryId (p. ej. derechos-de-migrantes → defensa-deportacion + visa-humanitaria; proteccion-legal → visa-u/visa-VAWA/visa-T), reutilizando BlogCard y enlazando a /${lang}/blog/${slug}. Alternativa mínima: 301 de /:lang/category/* a /:lang/blog en seoRedirects.ts y retirar los enlaces del Footer y las entradas del sitemap. Eliminar los autores no-abogados del HTML.

> **Verificador:** Toda la evidencia existe en el código: ProteccionLegalClient.tsx tiene 52 artículos legacy hardcodeados (el auditor dijo 53; son 51 de "Carlos Anaya Ruiz" + 1 de "Dan Motzer") y DerechosMigrantesClient.tsx tiene 6 — total 58, no 59 (descuadre trivial). Las URLs enlazadas (/proteccion-legal-para-migrantes/:slug, /derechos-de-migrantes/:slug) no existen como rutas en app/ y seoRedirects.ts:167-172,177-178 (cableado en next.config.ts:57) las 301-redirige todas al índice del blog; no hay redirects por slug ni rewrites en proxy.ts que mapeen a posts reales. Ambas categorías son indexables (page.tsx con canonical+hreflang, sin noindex), están en sitemapData.ts:124-125 (4 URLs es/en, lastModified 2…

---

### 4. [LAND-2] Resultados de casos fabricados: los mismos 3 desenlaces ('Aprobado en 11 meses', 'acuerdo seis cifras', 'fianza de $5,000 en 48 horas') se atribuyen a cada ciudad por interpolación y se presentan como 'resúmenes anónimos de casos representativos'

**Severidad:** P1 · **Área:** Landings ciudad-servicio · ✅ confirmado en verificación adversarial

**Archivo:** `app/lib/cityServiceLocalContent.ts`

**Alcance:** Sección 'Casos típicos' de las 25 landings × 2 idiomas (50 URLs); más claims por ciudad no verificables en whyChooseUs/FAQ

**Evidencia:**

cityServiceLocalContent.ts:565 'Cliente de ${signals.neighborhoods.es[0]} se casó con su pareja ciudadana… Aprobado en 11 meses.' — la misma historia con idéntico desenlace se genera para las 8 ciudades de inmigración cambiando solo el barrio. :591 'Negociamos un acuerdo seis cifras con la aseguradora del camionero' se atribuye tanto a I-10 (Houston) como a I-35E (Dallas). :624-625 'Logramos audiencia de fianza expedita y liberación con $5,000 de fianza' se atribuye a las 5 ciudades de defensa-deportación, cada una con SU centro de detención interpolado (${signals.detentionFacilities[0]}). :617 'Padre de 3 niños ciudadanos vivía en ${office.city} desde 2010… Juez concedió la residencia' — mismo caso 'ocurrido' en 5 cortes distintas. El componente los presenta como hechos: CityServiceLanding.tsx:332 'Resúmenes anónimos de casos representativos.' Claims adicionales sin respaldo replicados por plantilla: cityServiceLocalContent.ts:269 'En ${office.city}, hemos visto casos donde la oferta inicial era 10x menor'; :379 'Tenemos relaciones de trabajo establecidas para gestionar certificaciones en ${office.city}' (4 ciudades); cityServiceData.ts:740 'Cientos de casos de Visa U aprobados en Houston'; :877 'Cientos de casos VAWA aprobados en Houston'; :449 'miles de casos de inmigración ganados en el área'.

**Causa raíz:** CASE_BUILDERS genera 'casos' por interpolación de ciudad/corte/centro de detención en vez de usar casos reales; el mismo desenlace específico (cifras, plazos) no puede ser verídico simultáneamente en 5-8 ciudades. Riesgo doble: normas de publicidad de abogados sobre resultados pasados (Texas Disciplinary Rules 7.01/7.02 sobre afirmaciones engañosas y resultados no verificables) y E-E-A-T/spam de Google.

**Corrección:** Reemplazar en cityServiceLocalContent.ts los CASE_BUILDERS por casos reales anonimizados aportados por el despacho POR oficina (o eliminar la sección hasta tenerlos), y añadir el disclaimer estándar 'resultados pasados no garantizan resultados futuros'. Eliminar o respaldar con datos internos los claims cuantitativos por ciudad ('cientos de casos aprobados en X', '10x menor', 'relaciones establecidas').

> **Verificador:** Toda la evidencia existe textualmente en el código. cityServiceLocalContent.ts:565 genera "Aprobado en 11 meses" para las 8 ciudades de inmigración cambiando solo el barrio interpolado; :591 atribuye el mismo "acuerdo seis cifras" a Houston (I-10) y Dallas (I-35E) — verifiqué highways[0] en :36 y :50; :624-625 atribuye la misma "fianza de $5,000 en 48 horas" a las 5 ciudades de defensa-deportación con su centro de detención real interpolado (Joe Corley, Prairieland, McHenry, Adelanto, El Paso SPC); :617 repite el mismo "padre de 3 niños... Juez concedió la residencia" en 5 cortes distintas. CityServiceLanding.tsx:332 los presenta como "Resúmenes anónimos de casos representativos" (hechos, no…

---

### 5. [REST-1] El enlace de cancelación de suscripción de TODOS los emails del newsletter apunta a una URL que devuelve 404

**Severidad:** P1 · **Área:** Páginas restantes y legales · ✅ confirmado en verificación adversarial

**Archivo:** `emails/welcome.tsx`

**Alcance:** Los 5 templates de email (welcome, newsletterCta, newsletterNoCta, newsletterBlogCta, newsletterBlogNoCta) y el header List-Unsubscribe del blast; afecta a todo suscriptor que intente darse de baja (/es/newsletter/unsubscribe y /en/newsletter/unsubscribe)

**Evidencia:**

emails/welcome.tsx:122 `href={`${SITE_URL}/${language}/newsletter/unsubscribe`}` (idéntico en newsletterCta.tsx:128, newsletterNoCta.tsx:119, newsletterBlogCta.tsx:166, newsletterBlogNoCta.tsx:157). app/api/newsletter/blast/route.ts:262 pone el mismo URL en el header: `'List-Unsubscribe': `<https://www.manuelsolis.com/${language}/newsletter/unsubscribe?email=...>``. NO existe app/[lang]/newsletter/unsubscribe/page.tsx (solo page.tsx y [slug]/page.tsx). La URL cae en la ruta dinámica app/[lang]/newsletter/[slug]/page.tsx:64-65: `const nl = getNewsletterBySlug(slug); if (!nl) notFound();` → 404 real. No hay redirect en app/lib/seoRedirects.ts ni en proxy.ts (grep 'unsubscribe' sin resultados).

**Causa raíz:** Se creó el endpoint POST /api/newsletter/unsubscribe (app/api/newsletter/unsubscribe/route.ts) pero nunca la página pública /{lang}/newsletter/unsubscribe a la que enlazan los emails; el slug 'unsubscribe' es tragado por la ruta [slug] y termina en notFound().

**Corrección:** Crear app/[lang]/newsletter/unsubscribe/page.tsx (ruta estática gana sobre [slug]) con un formulario/confirmación que haga POST a /api/newsletter/unsubscribe leyendo ?email= del query; opcionalmente añadir soporte one-click (List-Unsubscribe-Post) en el blast. Riesgo actual: incumplimiento CAN-SPAM y daño a la reputación de envío (usuarios que no pueden darse de baja marcan spam).

> **Verificador:** Toda la evidencia existe tal cual: los 5 templates (emails/welcome.tsx:122, newsletterCta.tsx:128, newsletterNoCta.tsx:119, newsletterBlogCta.tsx:166, newsletterBlogNoCta.tsx:157) enlazan a /{lang}/newsletter/unsubscribe; no existe app/[lang]/newsletter/unsubscribe/page.tsx; la URL cae en app/[lang]/newsletter/[slug]/page.tsx:64-65 que hace notFound() porque 'unsubscribe' no está entre los slugs de newsletterData.ts; y no hay redirect/rewrite en proxy.ts, next.config, vercel.json ni seoRedirects.ts. Agravante que el auditor subestimó: blast/route.ts:262-265 también declara 'List-Unsubscribe-Post: List-Unsubscribe=One-Click', por lo que el botón nativo de unsubscribe de Gmail/Yahoo hace POST …

---

### 6. [REST-2] Tres 'reseñas verificadas de Google' en /testimonios comparten el mismo enlace de Google y están atribuidas justo a las tres oficinas virtuales Regus — no verificables / aparentemente fabricadas

**Severidad:** P1 · **Área:** Páginas restantes y legales · ✅ confirmado en verificación adversarial

**Archivo:** `app/[lang]/testimonios/TestimoniosClient.tsx`

**Alcance:** /es/testimonios y /en/testimonios (sección 'Reseñas Verificadas en Google'); reputación legal de la firma

**Evidencia:**

TestimoniosClient.tsx:127-129: los reviews r-lc ('María Elena Torres', League City), r-nl ('Carlos Hernández', Houston North Loop) y r-kb ('Patricia Morales', Houston Kirby) tienen los tres el MISMO `googleUrl: 'https://maps.app.goo.gl/PbN8rR5QqbVGHRsF6'` (los otros 7 reviews tienen URLs únicas). Se muestran bajo el heading línea 473 'Reseñas Verificadas en Google' y línea 484 'Reseñas reales de clientes verificadas en Google Maps', con CTA 'Ver en Google' (línea 524-526). officesRegistry.ts:53-62 documenta que north-loop, kirby y league-city son direcciones virtuales Regus, no locales propios. El propio testimonios/page.tsx:84-88 documenta una 'política anti-reseñas-fabricadas' que eliminó el review[] del schema — pero la UI visible la contradice.

**Causa raíz:** Al ampliar la lista de reviews para cubrir todas las oficinas (incluidas las virtuales) se añadieron tres testimonios sin URL real de Google, reciclando un enlace de otra reseña. Tres personas distintas no pueden compartir el mismo permalink de reseña.

**Corrección:** Eliminar r-lc, r-nl y r-kb de TestimoniosClient.tsx (líneas 127-129) o sustituirlos por reseñas reales con su permalink individual de Google Maps verificado. Para una firma de abogados, testimonios con resultados legales atribuidos a personas nombradas que no son verificables constituyen riesgo de publicidad engañosa (reglas de attorney advertising).

> **Verificador:** Evidencia verificada línea por línea: TestimoniosClient.tsx:127-129 contiene los tres reviews (r-lc María Elena Torres/League City, r-nl Carlos Hernández/Houston North Loop, r-kb Patricia Morales/Houston Kirby) con el MISMO googleUrl 'https://maps.app.goo.gl/PbN8rR5QqbVGHRsF6', mientras los otros 7 reviews (líneas 119-126) tienen URLs únicas; un grep del repo confirma que esa URL solo existe en esas 3 líneas. Se renderizan bajo 'Reseñas Verificadas en Google' (línea 473), 'Reseñas reales de clientes verificadas en Google Maps' (línea 484) y con CTA 'Ver en Google' que enlaza review.googleUrl (líneas 524-526), sin distinción alguna. officesRegistry.ts:53-62 y VIRTUAL_OFFICE_SLUGS (77-84) conf…

---

### 7. [REST-3] La Política de Privacidad no divulga ninguno de los terceros de tracking que el sitio usa realmente y afirma que no se comparte información para marketing de terceros, mientras se envían identificadores a Meta con fines publicitarios

**Severidad:** P1 · **Área:** Páginas restantes y legales · ✅ confirmado en verificación adversarial

**Archivo:** `app/[lang]/privacidad/PrivacidadClient.tsx`

**Alcance:** /es/privacidad y /en/privacidad vs comportamiento real de todo el sitio (Meta Pixel + CAPI, Vercel Analytics/SpeedInsights, chat IA con Google Gemini, Resend)

**Evidencia:**

PrivacidadClient.tsx:76 'Su información nunca se vende a terceros.' y :130 '**NO** hacemos: ... Compartir su información para marketing por terceros.'; la sección 4.A (líneas 114-118) solo lista proveedores de 'Enviar mensajes SMS / Alojar y asegurar los datos / Gestionar las comunicaciones'. En cambio: app/lib/metaCapi.ts:22-24 envía a Meta 'IP, user agent, _fbp y _fbc' server-side para medición publicitaria (y advierte 'Si algún día se agrega PII hasheada, revisar el aviso de privacidad primero' — el aviso tampoco cubre lo actual); app/[lang]/layout.tsx:453-454 monta <Analytics/> y <SpeedInsights/> de Vercel; app/api/chat/route.ts:1,70-73 envía los mensajes del usuario a Google (`GoogleGenerativeAI`, modelo 'gemini-2.5-flash'); las suscripciones van a Resend (subscribe/route.ts:68-73). Ninguno (Meta, Google, Vercel, Resend) se nombra en la política; no hay sección de cookies publicitarias/píxeles.

**Causa raíz:** La política (última actualización 5-dic-2025, PrivacidadClient.tsx:16) se redactó centrada en el programa SMS y no se actualizó cuando se añadieron Meta Pixel/CAPI (ago-2026), el chat con Gemini y Vercel Analytics.

**Corrección:** Actualizar PrivacidadClient.tsx: nombrar Meta (Pixel + Conversions API: IP, user agent, cookies _fbp/_fbc con fines de medición/publicidad), Google (chat IA: los mensajes se procesan con Gemini; Maps embed en /nosotros), Vercel (analytics/hosting) y Resend (email); añadir sección de cookies/píxeles y actualizar la fecha. Corregir o matizar la afirmación de la sección 4.B sobre marketing de terceros — hoy es objetivamente falsa respecto a Meta.

> **Verificador:** Toda la evidencia existe verbatim y no hay mitigación en el repo. PrivacidadClient.tsx:76 dice 'Su información nunca se vende a terceros' y :130 'NO hacemos: ... Compartir su información para marketing por terceros', con la sección 4.A (114-118) listando solo proveedores de SMS/hosting/comunicaciones. En realidad: metaCapi.ts:22-24 envía IP, user agent, _fbp y _fbc a graph.facebook.com para medición publicitaria (y su propio comentario reconoce el aviso de privacidad como restricción); layout.tsx carga incondicionalmente el Meta Pixel (390-405 + noscript 429-438), Vercel Analytics/SpeedInsights (453-454) y ADEMÁS un TikTok Pixel (416-426) que el auditor no reportó; chat/route.ts envía mensaj…

---

### 8. [SEC-3] La cookie de sesión de admin es un HMAC determinista de una constante: nunca expira, no se puede revocar y el logout no la invalida

**Severidad:** P1 · **Área:** Seguridad de APIs y admin · ✅ confirmado en verificación adversarial

**Archivo:** `app/lib/newsletter/auth.ts`

**Alcance:** Cookie `msl_admin` — gate de las 8 páginas admin, POST /api/newsletter/blast, GET /api/newsletter/preview, GET /api/analytics, GET /api/admin/short-links.

**Evidencia:**

auth.ts:4 y 27-31 — el token no lleva usuario, ni emisión, ni caducidad, ni nonce:
```
const SESSION_PAYLOAD = 'msl-admin-session-v1';
...
export function buildSessionToken(): string | null {
  const secret = process.env.NEWSLETTER_BLAST_SECRET;
  if (!secret) return null;
  return createHmac('sha256', secret).update(SESSION_PAYLOAD).digest('hex');
}
```
`verifySessionToken` (líneas 33-42) solo compara contra ese valor fijo. El `maxAge` de 4 h vive únicamente en el navegador (`actions.ts:11,39-47`: `maxAge: COOKIE_MAX_AGE_SECONDS`), y `logoutAction` (actions.ts:52-58) solo hace `cookieStore.delete(...)`: el valor sigue siendo válido para siempre en el servidor.

**Causa raíz:** El diseño usa el HMAC como "password derivado" en lugar de como token de sesión firmado con claim de expiración. Consecuencia: un valor de cookie capturado (log, extensión, backup del navegador, screenshot de DevTools) da acceso permanente, idéntico para todos los operadores, y la única forma de revocarlo es rotar `NEWSLETTER_BLAST_SECRET` — que además es la contraseña de login y el bearer de automatización (secreto con triple propósito).

**Corrección:** Firmar un payload con expiración: `HMAC(secret, `${exp}`)` guardando `${exp}.${sig}` en la cookie y rechazando `exp < Date.now()` en `verifySessionToken`; añadir un `kid`/versión para invalidar en masa. Separar secretos: `ADMIN_PASSWORD` (login), `ADMIN_SESSION_SECRET` (HMAC de cookie) y `NEWSLETTER_BLAST_SECRET` (bearer de automatización) en Vercel, tres variables distintas.

> **Verificador:** Evidencia verificada literalmente en el código: auth.ts:27-31 genera el token como HMAC-SHA256 determinista de la constante 'msl-admin-session-v1' (sin usuario, emisión, caducidad ni nonce); verifySessionToken (auth.ts:33-42) solo compara contra ese valor fijo; el maxAge de 4h vive únicamente en el navegador (actions.ts:11,46) sin comprobación server-side; y logoutAction (actions.ts:52-58) solo borra la cookie del navegador sin invalidar nada. No existe mitigación en ninguna otra parte: proxy.ts no toca rutas admin ni sesiones, app/[lang]/admin/layout.tsx es un passthrough con solo metadata noindex, no hay middleware.ts ni session store ni lista de revocación en el repo. El alcance es correc…

---

### 9. [SEC-5] El enlace List-Unsubscribe de todos los envíos apunta a /[lang]/newsletter/unsubscribe, ruta que no existe y devuelve 404

**Severidad:** P1 · **Área:** Seguridad de APIs y admin · ✅ confirmado en verificación adversarial

**Archivo:** `app/api/newsletter/blast/route.ts`

**Alcance:** Header `List-Unsubscribe` / `List-Unsubscribe-Post: One-Click` de todos los correos del blast + footer de 5 plantillas de email (newsletterCta, newsletterNoCta, newsletterBlogCta, newsletterBlogNoCta, welcome).

**Evidencia:**

blast/route.ts:261-266:
```
headers: {
  'List-Unsubscribe': `<https://www.manuelsolis.com/${language}/newsletter/unsubscribe?email=${encodeURIComponent(subscriber.email)}>`,
  'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
},
```
Y las plantillas: `emails/newsletterCta.tsx:128`, `emails/newsletterNoCta.tsx:119`, `emails/newsletterBlogCta.tsx:166`, `emails/newsletterBlogNoCta.tsx:157`, `emails/welcome.tsx:122` → `href={`${SITE_URL}/${language}/newsletter/unsubscribe`}`.
Pero los únicos archivos bajo esa ruta son: `git ls-files "app/[lang]/newsletter"` → `app/[lang]/newsletter/page.tsx` y `app/[lang]/newsletter/[slug]/page.tsx`. `unsubscribe` cae en el catch-all `[slug]`, que hace `if (!nl) notFound();` (`app/[lang]/newsletter/[slug]/page.tsx:65`) → 404. No existe ningún consumidor de `/api/newsletter/unsubscribe`: `grep -rn "api/newsletter/unsubscribe" app --include=*.tsx --include=*.ts` → sin resultados.

**Causa raíz:** Se construyó el endpoint de baja (`/api/newsletter/unsubscribe`) pero nunca la página ni el handler de la URL anunciada en el header, y nada en CI valida que la URL de List-Unsubscribe resuelva. Efecto: la baja con un clic (RFC 8058, exigida por Gmail/Yahoo para remitentes masivos) falla — el POST one-click recibe 404/405 y el usuario que hace clic ve una página de error, lo que empuja a marcar spam y degrada la entregabilidad de todo el dominio.

**Corrección:** Crear `app/[lang]/newsletter/unsubscribe/page.tsx` (UI de confirmación que llama al API con el token firmado de SEC-4) y `app/api/newsletter/unsubscribe/route.ts` con soporte para el POST one-click (`Content-Type: application/x-www-form-urlencoded`, body `List-Unsubscribe=One-Click`), respondiendo 200 sin requerir interacción. Apuntar el header `List-Unsubscribe` al endpoint POST y el enlace visible del footer a la página.

> **Verificador:** Evidencia verificada línea por línea: (1) blast/route.ts:261-266 emite List-Unsubscribe hacia https://www.manuelsolis.com/{lang}/newsletter/unsubscribe con List-Unsubscribe-Post: One-Click en cada envío individual vía resend.emails.send; (2) las 5 plantillas (welcome.tsx:122, newsletterNoCta.tsx:119, newsletterCta.tsx:128, newsletterBlogCta.tsx:166, newsletterBlogNoCta.tsx:157) enlazan el footer a la misma URL; (3) bajo app/[lang]/newsletter/ solo existen page.tsx y [slug]/page.tsx, y 'unsubscribe' cae en el catch-all que ejecuta notFound() ([slug]/page.tsx:65) → 404 para el GET del usuario y el POST one-click de Gmail/Yahoo. Busqué mitigaciones y no hay: seoRedirects.ts no menciona newslett…

---

### 10. [SEC-6] El rate limiting es un Map en memoria por instancia: no protege ninguno de los 6 endpoints públicos en serverless

**Severidad:** P1 · **Área:** Seguridad de APIs y admin · ⏳ no pasó por verificación independiente

**Archivo:** `app/lib/rateLimit.ts`

**Alcance:** app/lib/rateLimit.ts, consumido por: /api/chat:53 (15/min), /api/signup-proxy:27 (5/min), /api/conversions:65 (90/min), /api/lead-capture:35 (5/min), /api/newsletter/subscribe:26 (3/min), /go/[slug]:58 (60/min).

**Evidencia:**

rateLimit.ts:1 — el estado es un Map de módulo, sin backend compartido:
```
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
```
Y el doc de la propia función (líneas 18-21) lo asume: "Simple in-memory rate limiter for serverless API routes". El mismo repo ya reconoce el problema para datos análogos en `app/lib/analyticsStore.ts:1-9` ("Vercel ejecuta cada función en una instancia serverless aislada y efímera").

**Causa raíz:** Contador local al proceso. Con N instancias concurrentes el límite efectivo es N × límite, y cada cold start lo resetea a cero; un atacante que abra conexiones en paralelo obtiene multiplicador gratis. En la práctica los topes de 3-15/min son decorativos: afectan al usuario legítimo (que reintenta) más que al abusador. Consecuencias directas: quema de cuota de Gemini (SEC-7), envío de bienvenidas de Resend a granel, y poisoning del ledger (SEC-8).

**Corrección:** Sustituir por un limitador con estado compartido: Vercel WAF rate limiting a nivel de ruta (`/api/chat`, `/api/lead-capture`, `/api/newsletter/*`, `/api/conversions`, `/go/*`) o Upstash Redis (`@upstash/ratelimit`) detrás de la misma firma `rateLimit(id, limit, windowMs)` para no tocar los 6 call sites. Mantener el Map solo como fallback si falta la config.

---

### 11. [SEC-7] /api/chat es un proxy abierto a Gemini sin auth, sin BotID, sin tope de longitud de mensaje ni de historial, con el rol de cada turno controlado por el cliente

**Severidad:** P1 · **Área:** Seguridad de APIs y admin · ⏳ no pasó por verificación independiente

**Archivo:** `app/api/chat/route.ts`

**Alcance:** POST /api/chat — invocado desde `AIChatButton` que está montado en todo el sitio (todas las páginas [lang]).

**Evidencia:**

Líneas 77-101: la única validación es que `message` sea string no vacío, y el historial completo viene del cliente:
```
const { message, conversationHistory } = await request.json();
if (!message || typeof message !== 'string') { ... 400 }
const chatHistory = (conversationHistory || [])
    .filter((msg: any) => msg.content && msg.content.trim() !== '')
    .map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
    }));
...
const result = await chat.sendMessage(message);
```
No hay `message.slice(...)`, ni `conversationHistory.length` cap, ni `checkBotId()` (comparar con `/api/lead-capture:48`). La única defensa es `rateLimit(`chat:${ip}`, 15, 60000)` en la línea 53, que es in-memory (SEC-6). El endpoint no está en la lista de rutas protegidas por BotID: `instrumentation-client.ts:34-37` solo cubre `/api/lead-capture` y `/api/newsletter/subscribe`.

**Causa raíz:** Endpoint público que gasta cuota de un tercero (`process.env.GEMINI_API_KEY`, línea 61) sin cuota propia ni límites de tamaño. Dos abusos concretos: (a) coste — un script puede mandar mensajes e historiales de megabytes y multiplicar tokens facturados hasta agotar la cuota, dejando el chat caído para clientes reales; (b) manipulación de contexto — al ser el cliente quien decide `role: 'assistant'`, se pueden inyectar turnos falsos del modelo que contradigan `SITE_CONTEXT` (líneas 7-42) y hacer que "Nora" dé consejo legal específico, precios o cualquier contenido, atribuible al despacho. El post-procesado (líneas 107-121) solo quita emojis y negritas, no restringe contenido.

**Corrección:** En el handler: cap duro `if (message.length > 1000) return 400`; truncar historial a los últimos ~10 turnos y a N caracteres por turno; ignorar `role` del cliente reconstruyendo la alternancia; añadir `checkBotId()` y registrar `/api/chat` en `instrumentation-client.ts` → `protect`. Mover el límite a Vercel WAF (SEC-6) y fijar `maxOutputTokens` en `getGenerativeModel`. Añadir alerta de consumo en Google Cloud sobre la key.

---

### 12. [LEAD-2] Si BOS falla tras los 3 reintentos, el lead es irrecuperable: no hay fallback (email/cola/persistencia) y el log final no incluye ningún dato del lead

**Severidad:** P1 · **Área:** Flujo de leads y conversión · ⏳ no pasó por verificación independiente

**Archivo:** `app/lib/leadCapture.ts`

**Alcance:** Todos los envíos del formulario de contacto (~65 páginas que renderizan <ContactForm/> + /es|en/consulta) cuando bos.manuelsolis.com responde 5xx/timeout/red caída

**Evidencia:**

leadCapture.ts:417-490 — postLead reintenta máx. 3 veces con backoff 200/400ms (todo el ciclo dura <1s, no cubre una caída breve de BOS). Al agotar, el log `lead_capture_failed_final` (líneas 492-500) solo registra `{event, attempts, status, error, timestamp}` — sin nombre, teléfono ni email, así que el lead no puede recuperarse desde los logs de Vercel. api/lead-capture/route.ts:125-132 devuelve 502 al cliente y ContactFormClient.tsx:204-206 muestra 'Hubo un problema. Intente de nuevo más tarde.' — si el usuario abandona, el lead se pierde para siempre. No existe ninguna escritura a KV/Blob/queue ni email de respaldo en el repo.

**Causa raíz:** El pipeline v3 implementó retry + logging estructurado pero omitió el dead-letter: el diseño asume que 3 reintentos en ~600ms bastan y que el aviso al usuario compensa, cuando una indisponibilidad de BOS de minutos (deploy, incidente) pierde todos los leads de esa ventana.

**Corrección:** En postLead (o en el route tras `!result.ok`): persistir el payload completo en un destino propio (Vercel Blob/KV o tabla Supabase) usando `after()` de next/server, y/o enviar un email de respaldo al equipo con los datos del lead. Como mínimo inmediato, incluir en el log `lead_capture_failed_final` los campos name/phone/email/page_url para recuperación manual desde los logs (aceptando el trade-off de PII en logs o enmascarando parcialmente).

---

### 13. [TRK-1] GA4 no recibe casi ningún evento de conversión: pushToDataLayer es un no-op porque el sitio carga gtag.js, no un contenedor GTM

**Severidad:** P1 · **Área:** Analítica y tracking · ⏳ no pasó por verificación independiente

**Archivo:** `app/lib/tracking.ts`

**Alcance:** Sitewide — phone_click (Header, MobileStickyBar, PhoneClickTracker en landings ciudad-servicio y /oficinas, TrackedPhoneLink en 15 páginas de oficina, OfficesExplorer, HeroPopup), consulta_click, whatsapp_click (vía fanout), form_submit y qualified_lead (vía dataLayer), popup_*. Solo llegan a GA4: page_view del config, 'generate_lead' (ContactFormClient.tsx:99) y 'whatsapp_click' del botón flotante (WhatsAppButton.tsx:32).

**Evidencia:**

app/[lang]/layout.tsx:365 carga `https://www.googletagmanager.com/gtag/js?id=${GA_ID}` (gtag.js puro; grep de 'GTM-' y 'gtm.js' en todo el repo: cero contenedores GTM). tracking.ts:93-104 `pushToDataLayer` hace `(window as any).dataLayer.push({ event, ...params })` — objetos planos estilo GTM. conversion.ts:115-123 usa esta vía como superficie '2. GTM / GA4 dataLayer'. gtag.js SOLO procesa entradas del dataLayer pusheadas como `arguments` vía la función gtag(); los objetos `{event: 'phone_click', ...}` requieren un contenedor GTM que aquí no existe, así que se acumulan en el array sin que nadie los consuma.

**Causa raíz:** El fanout asume una arquitectura GTM (dataLayer.push con clave `event`) pero el layout solo instala gtag.js (`gtag('config', GA_ID)`). Sin contenedor GTM, toda la superficie dataLayer es un agujero negro: los clicks telefónicos, consulta y los eventos del formulario (form_submit/qualified_lead) nunca llegan a GA4.

**Corrección:** En app/lib/conversion.ts (superficie 2) y en los call sites directos de pushToDataLayer, reemplazar el push plano por `window.gtag('event', type, {...})` (la función gtag global ya la define el snippet del layout, líneas 373-377), o alternativamente instalar un contenedor GTM real y mover los tags ahí. Verificar después en GA4 DebugView que phone_click/consulta_click/form_submit llegan.

---

### 14. [A11Y-1] Los menús desplegables de escritorio (Servicios, Oficinas, Abogados) son inaccesibles por teclado: se abren solo con hover y sus disparadores son <span> no enfocables

**Severidad:** P1 · **Área:** Accesibilidad · ⏳ no pasó por verificación independiente

**Archivo:** `app/components/Header.tsx`

**Alcance:** Todas las páginas del sitio (el Header se renderiza en todas las rutas es/en, ~200+ URLs). Afecta el acceso por teclado a /servicios/*, /oficinas/* (15 oficinas), /abogados, /nosotros, /informacion/faq desde la navegación principal.

**Evidencia:**

Línea 301-304: el disparador con submenú es un span no interactivo: `{item.submenu ? (<span className="text-[10px]...">{item.name}</span>) : (<Link .../>)}`. Línea 321 y 379: el panel solo aparece con hover CSS: `className="absolute top-full ... opacity-0 invisible group-hover:opacity-100 group-hover:visible ..."` — no hay variante focus-within ni manejo de foco. `Oficinas` también cae en la rama span porque tiene `submenu: [{ name: 'offices-marker', ... }]` (línea 156). Grep de `Escape|onKeyDown` en app/components: 0 resultados en Header.

**Causa raíz:** Los dropdowns se implementaron como puro CSS :hover (group-hover) con un <span> como disparador, sin botón, sin aria-expanded/aria-haspopup, sin apertura por foco/Enter. Al estar `invisible` (visibility:hidden), los enlaces internos tampoco reciben tabulación.

**Corrección:** En Header.tsx convertir cada disparador con submenu en <button aria-expanded aria-haspopup="true"> que abra el panel también por estado React (no solo hover), añadir `group-focus-within:opacity-100 group-focus-within:visible` como mínimo transitorio, cierre con Escape y, para 'Oficinas', mantener además el enlace directo a /{lang}/oficinas.

---

### 15. [A11Y-2] Menú móvil: los toggles de submenú son <div onClick> sin semántica ni teclado, y el panel de pantalla completa no gestiona foco ni Escape

**Severidad:** P1 · **Área:** Accesibilidad · ⏳ no pasó por verificación independiente

**Archivo:** `app/components/Header.tsx`

**Alcance:** Todas las páginas (Header global) en viewport <lg. Submenús de Servicios, Oficinas y Abogados inoperables con teclado/lector de pantalla en móvil.

**Evidencia:**

Líneas 519-521: `<div className="flex justify-between items-center ... cursor-pointer" onClick={() => item.submenu && setOpenSubmenu(openSubmenu === item.key ? null : item.key)}>` — div sin role, sin tabIndex, sin onKeyDown, sin aria-expanded. El overlay (líneas 491-497) es `<m.div className="fixed inset-0 z-40 ...">` sin role="dialog", sin focus trap, sin listener de Escape y sin bloquear el scroll del body. El botón hamburguesa (449-456) sí tiene aria-expanded/aria-label pero no aria-controls.

**Causa raíz:** Toggles implementados con div+onClick en vez de button; el panel móvil es un overlay animado sin patrón de diálogo (foco, Escape, scroll-lock).

**Corrección:** Reemplazar los div onClick por <button aria-expanded={openSubmenu===item.key}> (heredan el foco global :focus-visible), añadir useEffect con keydown Escape → setIsMenuOpen(false), mover el foco al primer enlace al abrir y devolverlo al botón al cerrar, y `document.body.style.overflow='hidden'` mientras está abierto.

---

### 16. [A11Y-3] Ningún modal ni popup del sitio público implementa role="dialog"/aria-modal, captura de foco ni cierre con Escape (patrón sistémico)

**Severidad:** P1 · **Área:** Accesibilidad · ⏳ no pasó por verificación independiente

**Archivo:** `app/components/TestimonialsVideo.tsx`

**Alcance:** 5 superficies: modal de video del home (TestimonialsVideo), modal de /testimonios (TestimoniosClient líneas 369-433), modal de /abogados (AttorneysExplorer líneas 130-152), ventana del chat IA (AIChatButton líneas 160-276, en todas las páginas) y menú móvil (A11Y-2). En todas, el foco del teclado queda en el contenido de fondo y el lector de pantalla no anuncia la apertura.

**Evidencia:**

Grep global de `role="dialog"|aria-modal|FocusTrap|inert` en app/: 0 resultados. Grep de `Escape`: solo app/[lang]/admin/newsletter/AdminClient.tsx:1118 (`if (e.key === 'Escape') onClose();`) — únicamente el admin. TestimonialsVideo.tsx 67-97: `<m.div ... className="fixed inset-0 z-[100] ..." onClick={() => setIsOpen(false)}>` sin role ni gestión de foco. AttorneysExplorer.tsx 130-137: mismo patrón `fixed inset-0 z-[9999] ... onClick={() => setSelectedAttorney(null)}`.

**Causa raíz:** Todos los modales se construyeron ad-hoc con AnimatePresence + overlay clicable, sin un componente de diálogo compartido que aporte semántica y gestión de foco.

**Corrección:** Crear un componente Modal reutilizable (app/components/Modal.tsx) con role="dialog" aria-modal="true" aria-label, foco inicial en el botón de cierre, focus trap (o atributo inert en el fondo), Escape para cerrar y devolución de foco al disparador; migrar TestimonialsVideo, TestimoniosClient, AttorneysExplorer y la ventana de AIChatButton.

---

### 17. [A11Y-4] Las tarjetas que abren videos de testimonios son <div onClick> sin acceso por teclado (el 'botón' de play es decorativo)

**Severidad:** P1 · **Área:** Accesibilidad · ⏳ no pasó por verificación independiente

**Archivo:** `app/components/TestimonialsVideo.tsx`

**Alcance:** Home es/en (sección Testimonials → TestimonialsVideo) y /es|en/testimonios (grid completo de testimonios, TestimoniosClient). Usuarios de teclado no pueden reproducir ningún testimonio en video.

**Evidencia:**

TestimonialsVideo.tsx 35-37: `<div onClick={() => setIsOpen(true)} className="relative w-full aspect-video ... cursor-pointer ...">` — sin role/tabIndex/teclado. TestimoniosClient.tsx 267-276: `<m.div layoutId={`card-${item.id}`} ... onClick={() => setSelectedId(item.id)} className="group cursor-pointer h-[550px]">`. El icono Play (TestimoniosClient 315-334) está dentro de divs sin semántica. Contraste con AboutVideo.tsx 31-34, que sí usa `<button ... aria-label={isEs ? 'Reproducir video' : 'Play video'}>`.

**Causa raíz:** El área clicable se puso en el contenedor visual (div) en lugar de un elemento interactivo; AboutVideo demuestra el patrón correcto ya existente en el repo.

**Corrección:** Envolver la superficie clicable en <button> (o añadir role="button" tabIndex={0} onKeyDown Enter/Espacio) con aria-label bilingüe tipo 'Reproducir testimonio de {name}', replicando el patrón de AboutVideo.tsx.

---

### 18. [PERF-1] El CTA telefónico y el copy above-the-fold llegan al HTML con opacity:0 inline (framer-motion initial="hidden") y solo se hacen visibles tras hidratación + carga del chunk lazy de animaciones

**Severidad:** P1 · **Área:** Rendimiento y Core Web Vitals · ⏳ no pasó por verificación independiente

**Archivo:** `app/components/motion/variants.ts`

**Alcance:** ~50 URLs de landings ciudad-servicio (25 rutas × es/en, todas vía CityServiceLanding), home /es y /en (H1 y botón Consulta del Hero), y todas las secciones server-first que usan Reveal/Stagger (About, Services, Team, Testimonials, BlogFeed)

**Evidencia:**

variants.ts:10 `case 'up': return { opacity: 0, y: distance };` + Reveal.tsx:53 `initial="hidden"` — framer-motion serializa el estado initial como style inline en el SSR, así que el nodo llega al navegador con opacity:0. En CityServiceLanding.tsx:85-89 el CTA de conversión está gated: `<Reveal variant="up" delay={0.2} ...><MagneticButton as="a" href={`tel:${phoneClean}`} ...>{isEs ? 'Llamar Ahora: ' : 'Call Now: '}{office.phone}` y el intro en :81 `<Reveal as="p" ...>{config.intro[lang]}`. En Hero.tsx:158 el H1 de la home está dentro de `<StaggerItem>` y el botón Consulta en :180-190. Además MotionProvider.tsx:7 carga las features en un chunk asíncrono posterior (`const loadFeatures = () => import('./features')`), por lo que hasta que ese chunk llega NADA con initial="hidden" puede animar a visible; si el chunk falla (red inestable), el CTA queda invisible permanentemente porque `whileInView` nunca dispara.

**Causa raíz:** Los primitivos Reveal/Stagger (m.* + initial="hidden" + whileInView) se aplicaron también a elementos above-the-fold de conversión. El propio código reconoce la regla ("LCP is sacred... NEVER wrapped in opacity-gated reveals", Hero.tsx:43-49) pero solo exime el retrato y el "50,000"; el H1 de la home, el intro y el botón de teléfono de las 25 landings quedaron dentro del gate. En móvil con 3G esto retrasa segundos la visibilidad del elemento que genera llamadas.

**Corrección:** Aplicar la misma exención que ya tiene el retrato: en CityServiceLanding.tsx sacar el intro (línea 81) y el bloque de CTAs (85-94) de <Reveal> y renderizarlos estáticos (o usar animación CSS que PARTE de visible, como hero-portrait-settle en Hero.tsx:36-40); en Hero.tsx sacar el H1 (158-170) y el MagneticButton (180-191) del Stagger/StaggerItem. Como red de seguridad global, añadir en globals.css un fallback tipo `@media (scripting: none) { [style*="opacity:0"] { opacity:1 !important } }` o un timeout CSS (animation-delay 3s a opacity:1) para contenido gated si el JS no llega.

---

## P2 — Media

Problemas reales con impacto acotado: metadatos y schema fuera de directrices, inconsistencias de datos, tracking parcial, accesibilidad de formularios, contenido no indexable. Incluye los 4 hallazgos rebajados desde P1 por el verificador.

### Infraestructura y configuración (2)

**[INF-3]** El parámetro :lang sin restricción en seoRedirects rompe las URLs reales /informacion/{faq,noticias,recursos} sin prefijo de idioma

- Archivo: `app/lib/seoRedirects.ts`
- Alcance: 3 URLs reales sin prefijo: /informacion/faq, /informacion/noticias, /informacion/recursos — hoy terminan en 404 tras una cadena 308→307, cuando sin estas reglas el proxy las resolvería correctamente a /es/informacion/*. Aplica a todas las ~90 reglas con source '/:lang/...' (riesgo latente para cualquier futura página d…
- Corrección: Reemplazar `/:lang/` por `/:lang(es|en)/` en todos los sources de app/lib/seoRedirects.ts (sed masivo + ajustar el test __tests__/seoRedirects.test.ts). Con eso /informacion/faq deja de matchear y el proxy lo normaliza a /es/informacion/faq como al resto de rutas sin prefijo.

**[INF-4]** CSP connect-src no cubre endpoints reales de GA4 y Meta Pixel: beacons de analytics/conversión pueden bloquearse silenciosamente

- Archivo: `app/lib/securityHeaders.ts`
- Alcance: Todas las páginas del sitio (la CSP se aplica globalmente vía next.config headers + proxy). Afecta la medición client-side de GA4 (tráfico enrutado a endpoints regionales) y los eventos XHR/sendBeacon de fbevents.js.
- Corrección: En CONTENT_SECURITY_POLICY (app/lib/securityHeaders.ts:44) ampliar connect-src con `https://*.google-analytics.com https://stats.g.doubleclick.net https://www.facebook.com`. Validar después en el navegador (pestaña Console/Network sin errores CSP al disparar un lead) — encaja con la verificación en navegador pendiente de la atribución BOS.

### Sitemaps, robots y feeds (1)

**[SMAP-1]** El sitemap de abogados incluye /es|/en/abogados/edward-s-reisman, URLs que responden 301 porque el slug está listado como abogado dado de baja en seoRedirects a pesar de seguir activo en attorneyData (el perfil es inaccesible en producción)

- Archivo: `app/lib/seoRedirects.ts`
- Alcance: 2 URLs del sitemap (https://www.manuelsolis.com/es/abogados/edward-s-reisman y .../en/abogados/edward-s-reisman) + 3 patrones de redirect (/abogados/…, /:lang/abogados/…, /:lang/attorneys/…). Además el enlace desde el directorio /abogados devuelve al usuario al propio directorio.
- Corrección: Si Edward S. Reisman está activo: eliminar 'edward-s-reisman' de DEFUNCT_ATTORNEYS (seoRedirects.ts:37). Si realmente se fue: eliminar su entrada de attorneyData.ts:444-468 (el sitemap y las páginas se autocorrigen porque derivan del array). Prevención: en seoRedirects.ts importar attorneys y filtrar/lanzar error en build si un slug de DEFUNCT_ATTORNEYS existe en attorneyData (p.ej. const activeIds = new Set(attorneys.map(a => a.id)); DEFUNCT_ATTORNEYS.filter(s => !activeIds.has(s))).

### <head> y metadatos (1)

**[HEAD-1]** El HTML inicial de todas las páginas /en se sirve con <html lang="es"> y se parchea en el cliente (inline script + LangSetter)

- Archivo: `app/layout.tsx`
- Alcance: Todas las URLs /en/* (~115 páginas indexables: home, 25 landings, servicios, oficinas, 34 posts, etc.)
- Corrección: Convertir a múltiples root layouts con route groups, o mover el <html> a un layout que reciba el segmento: p. ej. reestructurar a app/(site)/[lang]/layout.tsx como root layout propio con `<html lang={lang}>` (generateStaticParams ya limita a es/en, sigue siendo estático), dejando otro root layout mínimo para not-found. Eliminar entonces el inline script y LangSetter.

### Datos estructurados JSON-LD (5)

**[JSONLD-2]** Horarios contradictorios en JSON-LD para la misma oficina física: las 25 landings declaran un horario genérico que contradice el de la página de oficina correspondiente

- Archivo: `app/lib/landingSchema.ts`
- Alcance: 25 landings ciudad-servicio ×2 idiomas (50 URLs) vs 10 páginas de oficina física ×2 idiomas; misma dirección, teléfono y geo en ambos schemas.
- Corrección: Mover los horarios por oficina a una fuente única (officesRegistry.ts o cityServiceData.ts, junto al placeId) y consumirla tanto en buildOfficeSchema como en buildLandingSchema (eliminar DEFAULT_OPENING_HOURS). Actualizar también el texto visible de CityServiceLanding para que muestre el horario real de la oficina de esa ciudad.

**[JSONLD-3]** Coordenadas geo distintas para la misma oficina según la plantilla: las landings y las páginas de oficina publican GeoCoordinates que difieren hasta ~4 km

- Archivo: `app/lib/cityServiceData.ts`
- Alcance: 6 oficinas afectadas en 2 plantillas: chicago, dallas, el-paso, losangeles, arvada, memphis — cada una en su página /oficinas/<slug> (×2 idiomas) y en todas las landings de su ciudad (×2 idiomas).
- Corrección: Unificar dirección/teléfono/geo por oficina en officesRegistry.ts (o cityServiceData.ts) como única fuente, verificar cada par lat/lng contra la ficha real de Google Business Profile, y hacer que ambos builders (officeSchema y landingSchema) importen de ahí.

**[JSONLD-4]** FAQPage marcado sobre contenido que no son preguntas en las ediciones del newsletter, y NewsArticle sin propiedad image

- Archivo: `app/[lang]/newsletter/[slug]/page.tsx`
- Alcance: 5 ediciones de newsletter ×2 idiomas = 10 URLs (/[lang]/newsletter/[slug]).
- Corrección: Eliminar el bloque faqSchema de page.tsx:115-126 (o generarlo solo si la edición tiene una sección FAQ real con preguntas). En el NewsArticle añadir `image: [`${SITE_URL}/og-default.jpg`]` (o imagen propia de la edición) y cambiar publisher a `{'@type':'Organization','@id':`${SITE_URL}/#organization`}`.

**[JSONLD-5]** Páginas de servicios emiten LegalService (subtipo de LocalBusiness) sin address ni @id, y redeclaran el nodo #organization con un teléfono distinto al del layout

- Archivo: `app/[lang]/servicios/visa-u/page.tsx`
- Alcance: 10 páginas /servicios/* + /clientes-detenidos + /inversionistas ×2 idiomas = 24 URLs.
- Corrección: Replicar el patrón correcto ya usado en servicios/accidentes/oficinas/[slug]/page.tsx:78-91: `'@type': 'Service'` + `serviceType` + `provider: {'@id': `${SITE_URL}/#organization`}` sin re-declarar telephone/foundingDate dentro del provider. El teléfono 832-598-0914 (visible en esas páginas) puede ir en un `ContactPoint` propio del Service vía `availableChannel` o simplemente quedarse en el HTML.

**[JSONLD-1]** Reseñas y ratings de Google Places incrustados en JSON-LD que no son visibles en la página (markup self-serving y de terceros), replicados en múltiples entidades en todo el sitio [rebajado de P1]

- Archivo: `app/[lang]/layout.tsx`
- Alcance: Todo el sitio: Organization en app/[lang]/layout.tsx se inyecta en TODAS las URLs /es|/en (~200+ páginas) con aggregateRating + 3 reviews; 10 páginas de oficina física ×2 idiomas (buildOfficeSchema); 25 landings ciudad-servicio ×2 idiomas (buildLandingSchema); /testimonios ×2.
- Corrección: Eliminar los bloques `schema.review = ...` de officeSchema.ts:129-141, landingSchema.ts:132-144 y layout.tsx:320-332 (reviews de terceros nunca elegibles). Eliminar también `aggregateRating` de la Organization del layout y de las páginas donde el rating no es visible (todas las oficinas), o alternativamente renderizar el rating visible en OfficeClient si se decide conservarlo asumiendo el riesgo self-serving. Si se quiere mostrar prueba social, mantener el número visible en el HTML (como ya hace CityServiceLanding.…

### Home y páginas de servicio (6)

**[SRV-2]** El contenido de las pestañas de casos/sub-servicios solo existe en el HTML para la pestaña activa inicial: el resto del copy único no es indexable

- Archivo: `app/[lang]/servicios/accidentes/AccidentesCases.tsx`
- Alcance: Las 10 páginas de servicio × 2 idiomas (20 URLs): servicios/{accidentes,asilo,defensa-deportacion,familia,inmigracion,ley-criminal,seguros,vawa,visa-e2,visa-u}
- Corrección: Renderizar TODOS los paneles en el servidor y ocultar los no activos con CSS (hidden + aria-hidden) o convertir a un acordeón <details>/secciones apiladas; dejar el tab-switcher como mejora progresiva que alterna visibilidad en lugar de montar/desmontar. Aplicar el cambio en los 10 *Cases.tsx.

**[SRV-3]** Cinco páginas de servicio inyectan schema FAQPage sin renderizar ninguna FAQ visible en la página (violación de las directrices de datos estructurados de Google)

- Archivo: `app/[lang]/servicios/accidentes/page.tsx`
- Alcance: servicios/{accidentes,inmigracion,familia,ley-criminal,seguros} × 2 idiomas (10 URLs)
- Corrección: Añadir en cada *Client.tsx una sección FAQ server-rendered reutilizando las mismas preguntas de getXxxFAQs() (mover esos arrays a los *Data.ts para compartirlos), siguiendo el patrón de VisaUClient.tsx:169-194; o, si no se quiere la sección, eliminar la inyección de faqData en los 5 page.tsx.

**[SRV-4]** El video del equipo en Accidentes y Seguros usa <video src="...playlist.m3u8"> sin hls.js: no reproduce en Chrome/Firefox/Edge y el botón de play desaparece aunque la reproducción falle

- Archivo: `app/[lang]/servicios/accidentes/AccidentesVideo.tsx`
- Alcance: servicios/accidentes y servicios/seguros × 2 idiomas (4 URLs)
- Corrección: En AccidentesVideo.tsx y SegurosVideo.tsx: (1) cargar hls.js dinámicamente cuando `!video.canPlayType('application/vnd.apple.mpegurl')`, o servir el MP4 progresivo que Bunny CDN expone (play_720p.mp4) como <source> de respaldo; (2) añadir atributo poster; (3) hacer `videoRef.current.play().then(() => setIsPlaying(true)).catch(...)` en vez de togglear el estado a ciegas; (4) confirmar si Seguros debe tener su propio video.

**[HOME-1]** La tarjeta "Planificación Patrimonial" del home enlaza a /{lang}/servicios/planificacion, ruta que no existe y 301-redirige al índice /servicios donde ese servicio ni siquiera aparece

- Archivo: `app/components/Services.tsx`
- Alcance: /es y /en (home, sección Servicios) — la promesa de servicio no tiene página destino en todo el sitio
- Corrección: Decidir: (a) eliminar la tarjeta estatePlanning de Services.tsx:22 (y de translations.ts) si el servicio ya no se ofrece, o (b) crear app/[lang]/servicios/planificacion/page.tsx y quitar el redirect de seoRedirects.ts:290,295.

**[SRV-5]** Los "Recursos Legales Relacionados" de la página de ACCIDENTES son 3 artículos de inmigración/deportación, pese a que el blog tiene 3 posts específicos de accidentes; Seguros tiene el mismo problema

- Archivo: `app/[lang]/servicios/accidentes/AccidentesClient.tsx`
- Alcance: servicios/accidentes y servicios/seguros × 2 idiomas (4 URLs)
- Corrección: Reemplazar el array `articles` en AccidentesClient.tsx:26-30 por los 3 slugs de accidentes (accidente-trabajo-indocumentado-texas-compensacion, accidente-camion-18-ruedas-texas-compensacion, accidente-auto-indocumentado-derechos con sus imágenes reales de public/blog). En SegurosClient.tsx elegir posts relevantes o eliminar la sección hasta tener contenido de seguros.

**[SRV-6]** Imagen rota en la tarjeta de blog de la página de ASILO: ruta '/blog/blog_8/BLOG08_CR1.png' no existe (la real es /blog/blog_08/B8_CR1.png)

- Archivo: `app/[lang]/servicios/asilo/asiloData.ts`
- Alcance: servicios/asilo × 2 idiomas (2 URLs), tercera tarjeta de la sección blog
- Corrección: En asiloData.ts:111 cambiar image a '/blog/blog_08/B8_CR1.png'.

### Oficinas y datos NAP (5)

**[OFI-2]** Causa raíz: el NAP de cada oficina está hardcodeado en 6 fuentes paralelas sin registro único, y ya divergen entre sí

- Archivo: `app/[lang]/oficinas/page.tsx`
- Alcance: Las 15 oficinas × 6 fuentes: índice app/[lang]/oficinas/page.tsx (OFFICE_GROUPS), 15 OfficeClient.tsx, 15 page.tsx (OFFICE_INFO), officesPhoneMap.ts, OfficesExplorer.tsx (home), accidentesOfficesData.ts. ~60 URLs afectadas indirectamente
- Corrección: Extender app/lib/officesRegistry.ts (o un nuevo app/lib/officesNap.ts) con el NAP completo por slug: address, suite, city, state, zip, phone, hours (estructurado), mapLink, geo, image. Hacer que OFFICE_GROUPS del índice, OFFICE_INFO de cada page.tsx, officeData de cada OfficeClient, officesData del explorer y accidentOffices lo importen. Corregir de paso las 4 discrepancias citadas (explorer Arvada → 7 PM; kirby OfficeClient → añadir 'Suite 1200'; explorer Bellaire → 'STE E').

**[OFI-3]** Las 5 oficinas virtuales Regus/IWG anuncian 'Abierto 24 horas' en la UI mientras el schema lo suprime deliberadamente por ser falso

- Archivo: `app/lib/officesRegistry.ts`
- Alcance: 10 URLs de detalle (/oficinas/{kirby,league-city,main-st,north-loop,northchase} × es/en) + home (explorer) + 10 URLs /servicios/accidentes/oficinas/* de esos slugs
- Corrección: En la fuente NAP única (OFI-2) modelar hours de las 5 virtuales como 'Atención telefónica 24 horas · Visitas con cita previa' (es/en) y renderizarlo en OfficeClient/OfficesExplorer/accidentesOfficesData. Evita que un cliente se presente a las 10 PM en un Regus cerrado y elimina la contradicción UI↔schema↔GBP.

**[OFI-4]** GeoCoordinates del schema LocalBusiness desviadas ≥1 km del edificio real en 7+ oficinas; houston-principal y houston-accidentes comparten el punto exacto

- Archivo: `app/[lang]/oficinas/el-paso/page.tsx`
- Alcance: Schema JSON-LD de /oficinas/{el-paso,memphis,dallas,northchase,houston-principal,houston-accidentes,losangeles,arvada,league-city} × es/en (~18 URLs)
- Corrección: Reemplazar latitude/longitude de cada OFFICE_INFO por las coordenadas del pin de la ficha de Google Business Profile (ya se tienen los placeIds en officesRegistry.ts; la Places API que ya usa googleReviews.ts puede devolver `location` añadiéndolo al FIELD_MASK, o corregir a mano una sola vez en la fuente NAP única). Dar a 6657 y 6705 Navigation puntos distintos.

**[OFI-5]** El indicador live 'STATUS ACTIVE/OFFLINE' del explorer del home usa una regla fija 9-19 en hora local del visitante, ignorando horario real y zona horaria de cada oficina

- Archivo: `app/components/OfficesExplorer.tsx`
- Alcance: Home /es y /en (sección Oficinas), las 15 oficinas del explorer
- Corrección: Calcular el estado por oficina: guardar en la fuente NAP única el horario estructurado + IANA timezone (America/Chicago, America/Denver, America/Los_Angeles) y evaluar con Intl.DateTimeFormat en OfficesExplorer; para las 24h mostrar siempre 'telefónica 24h'. Alternativa mínima: eliminar el badge STATUS.

**[OFI-6]** Las 15×2 páginas /servicios/accidentes/oficinas/[slug] son casi-duplicadas entre sí (solo cambia el bloque NAP): patrón doorway con mitigaciones parciales

- Archivo: `app/[lang]/servicios/accidentes/AccidenteOfficePageView.tsx`
- Alcance: 30 URLs indexables (/es|en/servicios/accidentes/oficinas/{15 slugs}), todas en sitemap (sitemapData.ts:154-159)
- Corrección: Añadir 2-3 párrafos únicos por zona en accidentesOfficesData (vías/corredores de accidentes locales, hospitales, juzgado del condado — como ya hace cityServiceLocalContent para las landings) o reducir el set: mantener indexables solo las oficinas físicas y poner canonical hacia /servicios/accidentes (o noindex) en las 5 virtuales.

### Blog y categorías (4)

**[BLOG-2]** og:article:publishedTime contradice el datePublished del JSON-LD (y la fecha visible) en 6 posts

- Archivo: `app/[lang]/blog/formulario-g28-cambiar-abogado-inmigracion/page.tsx`
- Alcance: 12 URLs (es/en de 6 posts): formulario-g28-cambiar-abogado-inmigracion, frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria, visa-t-trabajo-forzado-por-deuda-con-coyote, vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente, vawa-para-padres-maltrato-de-hijos-ciudadanos-estadounidenses, perdon-i-192…
- Corrección: Corregir los 6 publishedTime para igualar el date del BlogSchema. Estructural: derivar publishedTime y ui.date de una sola constante POST_DATE por página (o de BLOG_DATA vía slug) para que no puedan divergir.

**[BLOG-3]** Contenido YMYL 2026 que caduca sin mecanismo de actualización: 33/35 posts no emiten dateModified real y el schema lo rellena con la fecha de publicación

- Archivo: `app/lib/blogSchema.ts`
- Alcance: 33 de 35 posts (todos excepto los 2 de VAWA). Crítico en los perecederos: tps-2026-paises-elegibles-renovacion (publicado 2026-04-10, contiene vencimientos "9 de septiembre de 2026", "2 de octubre de 2026", "19 de octubre de 2026" y estados de litigio), daca-2026-estado-legal-tribunales, redadas-ice-2026, asilo-fronter…
- Corrección: 1) Añadir un calendario de revisión: cuando se toque un post perecedero, actualizar contenido y pasar dateModified real a BlogSchema (y og modifiedTime). 2) Añadir en los posts 2026 una nota visible de "última revisión: fecha". 3) Priorizar revisión de tps-2026 antes del 9-sep-2026 y de daca-2026/asilo-frontera con cada cambio judicial.

**[BLOG-4]** BlogTracker dispara el evento 'Blog Post View' hasta 5 veces por lectura: los flags de scroll están en las deps del useEffect que también trackea la vista

- Archivo: `app/components/blogs/BlogTracker.tsx`
- Alcance: Los 35 posts x 2 idiomas (todos montan BlogTracker). Métrica 'Blog Post View' de Vercel Analytics inflada proporcionalmente al engagement: un lector que llega al final cuenta 5 vistas; uno que rebota cuenta 1.
- Corrección: Dividir en dos useEffect: uno con deps [pathname] que haga track('Blog Post View'), y otro para el listener de scroll usando useRef (scrolledRef.current.p25 = true) en lugar de useState, eliminando los flags de las deps.

**[BLOG-5]** 20 de 35 posts carecen de disclaimer legal ("información educativa, no sustituye la consulta con un abogado") pese a ser contenido legal YMYL

- Archivo: `app/[lang]/blog/daca-2026-estado-legal-tribunales/page.tsx`
- Alcance: 20 posts sin ningún disclaimer en es ni en (los publicados antes de marzo-2026 y varios de abril-mayo): permiso-de-trabajo-visa-u, que-hacer-si-la-policia-no-firma, perdon-i-192, vawa-para-hombres, vawa-para-padres, visa-t, frenar-deportacion, formulario-g28, visa-u-y-vawa, residencia-eb3, estatus-juvenil, marihuana-du…
- Corrección: Crear un componente <LegalDisclaimer lang={lang}/> (o añadir el bloque al final del template junto a las fuentes) y montarlo en los 35 posts, retro-aplicándolo a los 20 que hoy no lo tienen.

### Landings ciudad-servicio (5)

**[LAND-3]** Las 5 landings de Houston no-accidentes anuncian en el meta description (y en el description del JSON-LD) el teléfono de la oficina de ACCIDENTES, distinto al que muestra la página

- Archivo: `app/lib/cityServiceData.ts`
- Alcance: abogado-inmigracion-houston, defensa-deportacion-houston, visa-u-houston, asilo-politico-houston, vawa-houston × 2 idiomas (10 URLs); afecta snippet en SERP y campo description del LegalService
- Corrección: En cityServiceData.ts, cambiar '(713) 231-5384' por '(713) 701-1731' en los metaDescription es/en de las 5 entradas houston-principal (líneas 441-442, 635-636, 732-733, 810-811, 869-870). Impacto extra: quien llame desde el snippet de Google hoy cae en el tracking number de accidentes, contaminando la atribución telefónica por práctica.

**[LAND-4]** Horarios NAP contradictorios: todas las landings muestran y emiten en schema 'L-V 8:00–18:00, Sáb 9:00–13:00' mientras las fichas canónicas de oficina declaran horarios distintos por sede (incluido 24/7 en houston-accidentes)

- Archivo: `app/components/CityServiceLanding.tsx`
- Alcance: 25 landings × 2 idiomas (50 URLs): horario visible (CityServiceLanding) + openingHoursSpecification del LegalService, en conflicto con /oficinas/<slug> de las 9 oficinas usadas
- Corrección: Extraer los openingHours por oficina a una fuente única (p.ej. añadirlos a OFFICES en cityServiceData.ts o a un registro compartido con las páginas de oficina) y usarla tanto en CityServiceLanding.tsx:203-206 como pasándola a buildLandingSchema vía input.openingHours; eliminar DEFAULT_OPENING_HOURS como fallback silencioso.

**[LAND-5]** Las landings de Houston presentan la dirección virtual Regus 'Houston North Loop' como oficina adicional atendida, y el trust bar de las 25 landings afirma '15 oficinas en 5 estados' cuando 5 de las 15 son direcciones virtuales solo con cita

- Archivo: `app/lib/cityServiceData.ts`
- Alcance: additionalOffices: 6 landings de Houston × 2 idiomas (12 URLs); trust bar y panel 'Firma Nacional': las 25 landings × 2 (50 URLs)
- Corrección: En cityServiceData.ts sustituir 'Houston North Loop' en additionalOffices por la segunda oficina física de Navigation (6657 o 6705 según la landing) o añadir la aclaración 'solo con cita previa'; en CityServiceLanding.tsx revisar el conteo del trust bar (p.ej. '10 oficinas y 5 centros de atención con cita' o simplemente '5 estados'). Reutilizar isVirtualOffice() de officesRegistry.ts como fuente de verdad.

**[LAND-6]** El JSON-LD de las landings incrusta reseñas y rating de Google (fuente de terceros / self-serving) y duplica el MISMO rating dos veces por página: en el Organization del layout y en el LegalService de la landing

- Archivo: `app/lib/landingSchema.ts`
- Alcance: Las 25 landings × 2 idiomas; el mismo Place (houston-principal) alimenta a la vez el Organization site-wide y el LegalService de 5 landings de Houston; dallas/chicago/losangeles/el-paso repiten su rating en 2-5 landings + su página de oficina
- Corrección: En landingSchema.ts dejar de emitir review/aggregateRating en el LegalService de las landings (conservar NAP/geo/horarios); si se quiere mostrar el rating, mantenerlo solo como contenido visible (trust bar, CityServiceLanding.tsx:104-106, con enlace al perfil de Google) sin marcado. Evaluar lo mismo para el Organization del layout.

**[LAND-1]** Patrón doorway: 63–72% del texto indexable es idéntico entre landings del mismo servicio en distintas ciudades (FAQ y 'casos típicos' generados por plantilla con sustitución de tokens) [rebajado de P1]

- Archivo: `app/lib/cityServiceLocalContent.ts`
- Alcance: Las 25 landings ciudad-servicio × 2 idiomas = 50 URLs (/es|en/abogado-inmigracion-{8 ciudades}, abogado-accidentes-{2}, defensa-deportacion-{5}, visa-u-{4}, asilo-politico-{3}, vawa-{3})
- Corrección: En app/lib/cityServiceLocalContent.ts, sustituir los builders genéricos por contenido redactado por landing (o al menos 2-3 variantes de redacción por servicio rotadas + datos locales exclusivos: jueces/backlog de la corte local, estadísticas de la ciudad con fuente, casos reales anonimizados de esa oficina). Alternativa: consolidar — mantener solo las landings con demanda/oficina física fuerte y 301 del resto a /servicios/<slug>. Verificar en GSC qué landings siguen en 'Crawled - currently not indexed' para priori…

### Páginas restantes y legales (5)

**[REST-4]** /clientes es una página placeholder 'en construcción' indexable e incluida en el sitemap, con metadata que promete 'Portal de Clientes' pero cuerpo sobre 'Noticias' y copy hardcodeado solo en español

- Archivo: `app/[lang]/clientes/ClientesClient.tsx`
- Alcance: /es/clientes y /en/clientes (indexables, sitemap priority 0.7); duplica el placeholder de /informacion/noticias que sí está noindexado
- Corrección: Opción A: redirigir /:lang/clientes → /:lang/acceso-clientes en seoRedirects.ts (es lo que la metadata promete). Opción B: añadir robots noindex en clientes/page.tsx y quitar la línea 114 de sitemapData.ts. En cualquier caso, traducir el copy usando el prop `lang` ya recibido.

**[REST-5]** Testimonio placeholder inventado (autor 'UFMS') publicado como 'Testimonio destacado' en el perfil público de la colaboradora

- Archivo: `app/lib/collaboratorData.ts`
- Alcance: /es/colaboradores/jennifer-olvera y /en/colaboradores/jennifer-olvera (único perfil de colaborador existente)
- Corrección: En CollaboratorProfile.tsx, ocultar la sección de testimonio mientras el dato sea placeholder (p. ej. hacer `testimonial` opcional en la interfaz Collaborator y eliminarlo de jennifer-olvera hasta tener un testimonio real con consentimiento documentado). Un testimonio ficticio publicado es el mismo riesgo de publicidad engañosa que motivó la 'política anti-reseñas-fabricadas' de /testimonios.

**[REST-6]** El template de perfiles etiqueta a los 20 abogados como 'Abogado de Inmigración / Immigration Attorney' en el <title>, aunque varios son de litigio civil, accidentes o marítimo

- Archivo: `app/[lang]/abogados/[slug]/page.tsx`
- Alcance: 40 URLs (/es|en/abogados/[slug] × 20 abogados); afecta al menos a andrew-fink, gregory-finney, austen-gunnels, juan-solis (litigio civil/seguros/accidentes)
- Corrección: En page.tsx usar `attorney.role[lang]` (o un campo `specialty` nuevo en attorneyData.ts) para el title (`${attorney.name} | ${role}`, como ya hace colaboradores/[slug]/page.tsx:33) y condicionar `knowsAbout` por área de práctica. En YMYL legal, titular a un litigante civil como abogado de inmigración es información profesional incorrecta de cara a Google y usuarios.

**[REST-7]** Schema FAQPage inválido en todas las ediciones del newsletter: secciones informativas marcadas como preguntas/respuestas

- Archivo: `app/[lang]/newsletter/[slug]/page.tsx`
- Alcance: 6 URLs (/es|en/newsletter/{abril-2026-…, marzo-2026-…, febrero-2026-…}) y cualquier edición futura
- Corrección: Eliminar el bloque faqSchema (líneas 115-126 y su <script> en 140-144) del template de edición; conservar solo NewsArticle + Breadcrumb. FAQPage sobre contenido que no es FAQ es structured data spam elegible para acción manual, y desde 2023 Google ni siquiera muestra rich results FAQ para este tipo de sitio.

**[REST-8]** clientes-detenidos promete 'Atención 24/7' en title/description mientras la página dice que la línea atiende Lunes a Viernes de 9AM a 9PM

- Archivo: `app/[lang]/clientes-detenidos/page.tsx`
- Alcance: /es/clientes-detenidos y /en/clientes-detenidos (página de emergencia para familias de detenidos por ICE)
- Corrección: Unificar: o la línea es realmente 24/7 (actualizar texts.section2.hours en ClientesDetenidosClient.tsx:75) o corregir title/description de page.tsx:20,24. En un contexto de emergencia (familiar detenido), prometer 24/7 y no atender es especialmente dañino para conversión y confianza.

### Seguridad de APIs y admin (8)

**[SEC-8]** POST /api/conversions acepta eventos sin autenticar con timestamp, dominio y cookies de Meta controlados por el cliente: envenena el ledger y reenvía PageViews forjados al dataset real de Meta

- Archivo: `app/api/conversions/route.ts`
- Alcance: POST /api/conversions → `app/lib/analyticsStore.ts` (alimenta /api/analytics, /api/admin/short-links y los dashboards /es|/en/admin/analytics y /admin/short-links) y → Meta CAPI vía `sendMetaCapiEvents`.
- Corrección: Firmar el beacon: emitir en el layout un token corto HMAC(sessionId+path, SECRET) con TTL y exigirlo en el POST; alternativamente `checkBotId()` + verificación de `Origin`/`Referer` contra los hosts propios y descartar `body.timestamp` (usar siempre la hora del servidor, o aceptar solo desvíos < 5 min). Para el passthrough de Meta, derivar el dominio de la cabecera `Host`/`Origin` del request en lugar de `body.domain`.

**[SEC-9]** Tres endpoints admin aceptan la API key por query string (?key=...), que queda en logs de Vercel, historiales y proxies

- Archivo: `app/api/analytics/route.ts`
- Alcance: GET /api/analytics, GET /api/admin/short-links, GET /api/conversions.
- Corrección: Eliminar la rama `queryKey` en los tres archivos y exigir `Authorization: Bearer`; comparar con `timingSafeEqual` sobre buffers de igual longitud. Si algún consumidor externo ya usa `?key=`, migrarlo y rotar `CONVERSIONS_API_KEY` después.

**[SEC-10]** GET /api/conversions devuelve eventos crudos con IP completa y user-agent de visitantes (PII)

- Archivo: `app/api/conversions/route.ts`
- Alcance: GET /api/conversions (respuesta `raw`), y por extensión el contenido de `analyticsStore` que guarda IPs 90 días.
- Corrección: En el GET, mapear `raw` a los mismos campos que `/api/analytics` (sin `ip` ni `userAgent`). En `analyticsStore`/`pushEvent`, guardar la IP truncada (`/24` IPv4, `/48` IPv6) o un hash con sal rotativa — lo único que se usa hoy es agrupar, no identificar. La IP completa se sigue necesitando en el momento del request para Meta CAPI, así que pasarla directo a `sendMetaCapiEvents` sin persistirla.

**[SEC-11]** El candado anti-blast-duplicado es una variable de módulo: dos instancias pueden enviar el mismo boletín dos veces a toda la audiencia

- Archivo: `app/api/newsletter/blast/route.ts`
- Alcance: POST /api/newsletter/blast (hasta BLAST_MAX_PER_RUN = 1000 destinatarios por corrida).
- Corrección: Mover el candado y el registro de envío a un almacén compartido (Vercel KV/Upstash con `SET key NX EX 900`, clave `blast:${contentType}:${slug}:${language}:${variant}`), y persistir "ya enviado" por edición para rechazar repeticiones. Validar `testEmails` con la misma regex de `resendAudience.ts:43-46` y limitar su tamaño (p.ej. 10).

**[SEC-12]** La identidad para rate limit se toma del primer valor de X-Forwarded-For, cabecera que el cliente puede enviar

- Archivo: `app/api/chat/route.ts`
- Alcance: 6 endpoints: /api/chat:50-52, /api/conversions:58-61, /api/lead-capture:31-33, /api/newsletter/subscribe:21-24, /api/signup-proxy:24-26, /go/[slug]:55-57.
- Corrección: Centralizar la resolución de IP en un helper `getClientIp(request)` en `app/lib/rateLimit.ts` que use la cabecera de plataforma de Vercel (`x-vercel-forwarded-for`) o el último salto de `x-forwarded-for`, y usar ese helper en los 6 call sites. Verificar el comportamiento real de las cabeceras en un deploy de producción antes de fijar el orden.

**[SEC-13]** Ningún endpoint limita el tamaño del cuerpo: request.json() se parsea completo antes de validar

- Archivo: `app/api/lead-capture/route.ts`
- Alcance: POST /api/chat:77, /api/conversions:70, /api/lead-capture:68, /api/newsletter/subscribe:55, /api/newsletter/unsubscribe:18, /api/signup-proxy:35, /api/newsletter/blast:107.
- Corrección: Añadir al inicio de cada handler un chequeo `const len = Number(request.headers.get('content-length') || 0); if (len > 8_000) return 413;` (ajustando el tope por endpoint) y aplicar `clip()`/`slice()` a cada campo de texto antes de reenviarlo: `enquiry_detail` (2000), `first_name`/`last_name` (100), `page_url` (500) en `mapFormToPayload`, y `firstName` (60) en subscribe.

**[SEC-2]** El login de admin no tiene rate limit ni bloqueo: una sola contraseña compartida abre envío masivo de correo y todos los dashboards [rebajado de P1]

- Archivo: `app/[lang]/admin/newsletter/actions.ts`
- Alcance: Server action `loginAction` usada por las 4 páginas admin (/es|/en × /admin, /admin/newsletter, /admin/analytics, /admin/short-links = 8 URLs) y, por transitividad, POST /api/newsletter/blast, GET /api/newsletter/preview, GET /api/analytics, GET /api/admin/short-links.
- Corrección: En `loginAction`: aplicar `rateLimit(`login:${ip}`, 5, 300000)` (leyendo la IP con `await headers()`), devolver `?error=ratelimited`, y loggear intentos fallidos en JSON como hace `/api/lead-capture`. Idealmente migrar a un limitador compartido (ver SEC-6) porque un Map en memoria no frena un ataque distribuido entre instancias, y añadir un segundo factor o restricción por Vercel WAF/IP allowlist en `/es/admin/*` y `/en/admin/*`.

**[SEC-4]** POST /api/newsletter/unsubscribe es público, sin token firmado ni rate limit: permite dar de baja a cualquier suscriptor conocido [rebajado de P1]

- Archivo: `app/api/newsletter/unsubscribe/route.ts`
- Alcance: POST /api/newsletter/unsubscribe (endpoint de mutación sobre toda la audiencia de Resend).
- Corrección: Emitir un token de baja firmado por email al enviar cada correo (`HMAC(UNSUB_SECRET, email)`), aceptar únicamente `?email=...&t=<token>` y verificar con `timingSafeEqual` antes de mutar; añadir `rateLimit(`unsub:${ip}`, 5, 60000)` y `checkBotId()`. Reemplazar el `contacts.list()` completo por búsqueda directa por email si la API lo permite.

### Flujo de leads y conversión (5)

**[LEAD-3]** Los errores 400 de validación del servidor se muestran como 'Intente de nuevo más tarde': un teléfono con <7 dígitos pasa la validación del cliente y falla siempre en el servidor con un mensaje engañoso

- Archivo: `app/components/ContactFormClient.tsx`
- Alcance: Formulario de contacto en las ~65 páginas + /consulta; afecta a usuarios que escriben teléfonos cortos/malformados o emails inválidos que el navegador acepta
- Corrección: En handleSubmit, leer `await response.json()` en el else: si status 400 con `field`, mostrar mensaje bilingüe específico junto al campo ('El teléfono debe tener al menos 7 dígitos'); si 429, 'Espere un minuto'; solo usar 'intente más tarde' para 5xx. Añadir además validación cliente: `minLength`/pattern de dígitos en phone antes del submit.

**[LEAD-4]** Anti-spam efectivamente inexistente con la configuración por defecto: sin honeypot, BotID apagado/report-only por default y rate limit in-memory por instancia serverless

- Archivo: `app/api/lead-capture/route.ts`
- Alcance: POST /api/lead-capture (y /api/newsletter/subscribe comparte el mismo esquema BotID) — leads basura entran directo a BOS
- Corrección: a) Añadir un honeypot (input oculto que el servidor rechace silenciosamente con 200) — barato y sin dependencias. b) Activar BotID en el Dashboard de Vercel, luego NEXT_PUBLIC_BOTID_CLIENT_ENABLED=true y tras verificar en logs, BOTID_MODE=block. c) Migrar rateLimit a un almacén compartido (Upstash Redis / Vercel KV) para que el límite sea real entre instancias.

**[LEAD-5]** El POST a BOS no tiene timeout y los reintentos 5xx no llevan clave de idempotencia: usuario colgado en 'Procesando...' y posibles leads duplicados

- Archivo: `app/lib/leadCapture.ts`
- Alcance: Todos los envíos de /api/lead-capture; duplicados posibles cuando BOS persiste el lead pero responde 5xx/timeout
- Corrección: En route.ts pasar `postLead(payload, { signal: AbortSignal.timeout(8000) })` (o crear una señal por intento dentro de postLead). Generar un `submission_id` (crypto.randomUUID()) en el cliente o el route e incluirlo en el payload para que BOS pueda deduplicar; mientras BOS no lo soporte, al menos limitar el retry de 5xx a errores de red/504.

**[LEAD-6]** Trampa de configuración BotID: activar BOTID_MODE=block sin el cliente habilitado bloquearía con 403 el 100% de los envíos legítimos

- Archivo: `app/api/lead-capture/route.ts`
- Alcance: POST /api/lead-capture y /api/newsletter/subscribe — riesgo latente de pérdida total de leads con un solo cambio de env var
- Corrección: En route.ts, condicionar el modo block: `if (botMode === 'block' && process.env.NEXT_PUBLIC_BOTID_CLIENT_ENABLED === 'true')` (la env NEXT_PUBLIC_ también es legible en server), o loggear un error de configuración y degradar a report-only cuando el cliente no esté habilitado.

**[LEAD-7]** El formulario de contacto no existe en el HTML inicial de las páginas estáticas: useSearchParams fuerza el fallback de Suspense (spinner) hasta la hidratación

- Archivo: `app/components/ContactFormClient.tsx`
- Alcance: Sección de contacto en las ~65 páginas con <ContactForm/> y /consulta — conversión imposible sin JS y retrasada en conexiones lentas
- Corrección: Eliminar useSearchParams y leer gclid/fbclid con `new URLSearchParams(window.location.search)` dentro de handleSubmit (patrón ya usado por readTouchFromUrl en lib/attribution.ts). Así el form se puede prerenderizar completo, se quita el boundary de Suspense y la conversión queda en el HTML inicial.

### Analítica y tracking (6)

**[TRK-2]** fireConversion pierde los eventos Meta Contact/Lead/InitiateCheckout y TikTok cuando el click ocurre antes de window.load: no usa la cola whenFbqReady

- Archivo: `app/lib/conversion.ts`
- Alcance: Todos los CTAs de conversión: Header (header_phone_button), MobileStickyBar, WhatsAppButton, ConsultaFloatingCta, TrackedPhoneLink (15 oficinas), PhoneClickTracker (landings + /oficinas). Peor en móvil, donde el click al botón de llamada suele ocurrir en los primeros segundos, antes de que termine de cargar la página.
- Corrección: Exportar un helper de encolado desde metaPixel.ts (whenFbqReady ya existe, solo hay que exportarla) y usarlo en conversion.ts para el disparo fbq: `whenFbqReady((fbq) => fbq('track', evento, params, { eventID }))`. Añadir una cola análoga para ttq (ttq es array-stub, se puede llamar ttq.track directamente si el snippet corrió; el problema real es solo fbq/lazyOnload).

**[TRK-3]** Los eventos de conversión de negocio (Lead/Contact/InitiateCheckout) no tienen espejo server-side: solo page_view se reenvía a la Conversions API, así que con adblocker la señal de conversión hacia Meta se pierde por completo

- Archivo: `app/api/conversions/route.ts`
- Alcance: Todas las conversiones: form_submit/qualified_lead (Lead), phone_click/whatsapp_click (Contact), consulta_click (InitiateCheckout), en todo el sitio.
- Corrección: Ampliar MetaServerEvent en app/lib/metaCapi.ts para aceptar 'Lead' | 'Contact' | 'InitiateCheckout', mapear los StoredEventType en route.ts (form_submit/qualified_lead→Lead, phone_click/whatsapp_click→Contact, consulta_click→InitiateCheckout) y reenviarlos igual que page_view usando el meta.eventId que ya llega — la dedup con el pixel queda garantizada porque conversion.ts ya pasa el mismo eventID a fbq.

**[TRK-4]** ContactFormClient no usa fireConversion: dispara fbq('track','Lead') SIN eventID y registra dos conversiones (form_submit + qualified_lead) por cada envío exitoso

- Archivo: `app/components/ContactFormClient.tsx`
- Alcance: Todas las páginas con ContactForm: home, 15 páginas de oficina, páginas de servicios, /consulta, landings ciudad-servicio (~50+ URLs).
- Corrección: Sustituir trackConversionEvents() + los dos trackConversion por UNA llamada `fireConversion('form_submit', 'contact_form', {...})` (que ya genera eventID y recolecta fbp/fbc), eliminar el fbq/ttq manual, y reservar 'qualified_lead' para un criterio real de calificación (o eliminarlo). Mantener gtag('event','generate_lead') solo si se decide no arreglar TRK-1 primero.

**[TRK-5]** Cero gestión de consentimiento: GA4, Meta Pixel, TikTok Pixel y Vercel Analytics disparan en todas las páginas sin banner, sin opt-out y sin modo de consentimiento (relevante bajo TDPSA de Texas)

- Archivo: `app/[lang]/layout.tsx`
- Alcance: Todas las páginas bajo /[lang] (~150+ URLs), incluidas las de contenido sensible para un despacho de inmigración: /clientes-detenidos, /servicios/defensa-deportacion, /servicios/asilo, /servicios/vawa, /servicios/visa-u — las URLs visitadas se envían a Meta/TikTok como event_source_url/page.
- Corrección: Añadir un CMP ligero (banner propio con estado en cookie/localStorage) que condicione el render de los <Script> de Meta/TikTok/GA en app/[lang]/layout.tsx y el disparo en tracking.ts/conversion.ts; como mínimo, implementar el enlace de opt-out que exige TDPSA y activar Limited Data Use (dataProcessingOptions ['LDU']) en fbq init y en los eventos CAPI (metaCapi.ts) para visitantes que opten por salir.

**[TRK-6]** BlogTracker re-dispara el evento 'Blog Post View' hasta 5 veces por lectura (las flags de scroll están en las deps del useEffect) e incluye un campo de PII (visitorName) en cada evento

- Archivo: `app/components/blogs/BlogTracker.tsx`
- Alcance: 34 posts de blog (/[lang]/blog/*) — infla los conteos de vistas en Vercel Analytics hasta 5x para lectores que hacen scroll completo.
- Corrección: Separar en dos efectos: uno con deps [pathname] que registre 'Blog Post View' una vez, y otro para el listener de scroll usando useRef (no useState) para las flags de milestone. Eliminar visitorName/getUserName del payload.

**[TRK-7]** OfficesExplorer y HeroPopup no migrados a fireConversion: sus phone_click no disparan Meta Contact, TikTok ni Vercel Analytics (y con TRK-1, hoy solo llegan al ledger propio)

- Archivo: `app/components/OfficesExplorer.tsx`
- Alcance: Home (/es y /en): explorador de oficinas (línea directa de cada oficina) y popup de familiares detenidos (CTAs 'client'/'non_client'). El popup además nunca registra popup_open (solo dismiss y cta).
- Corrección: Reemplazar en ambos componentes por `fireConversion('phone_click', 'office_phone_button' | 'detained_popup_*', { ... })` y añadir `fireConversion('popup_open', ...)` al abrir HeroPopup para tener la tasa de conversión del popup completa.

### Accesibilidad (7)

**[A11Y-5]** Formulario de leads: sin <label> asociado por campo (solo placeholder/aria-label), labels de grupo sin htmlFor, sin autocomplete (WCAG 1.3.5) y el mensaje de error se auto-descarta a los 4s

- Archivo: `app/components/ContactFormClient.tsx`
- Alcance: ~65 páginas que renderizan <ContactForm/> más /es|en/consulta (página principal de conversión). Todos los campos: first_name, last_name, phone, email, enquiry_detail.
- Corrección: En NeonInput añadir <label htmlFor={name}> visible (o sr-only como mínimo) y prop autoComplete pasada por campo ('given-name', 'family-name', 'tel', 'email'); asociar los labels de grupo con <fieldset><legend> o quitarles la etiqueta <label>; aumentar el timeout de error o mantenerlo hasta interacción (el overlay ya tiene role=alert aria-live, eso está bien).

**[A11Y-6]** Contrastes de texto por debajo de WCAG AA en elementos recurrentes: enlaces legales del footer ≈2.98:1 y CTA WhatsApp blanco sobre #25D366 ≈1.99:1

- Archivo: `app/components/Footer.tsx`
- Alcance: Sitewide: (a) Footer, fila legal (Privacidad/Términos/SMS/Política Editorial) en todas las páginas; (b) MobileStickyBar (barra fija inferior en TODAS las páginas móviles) y botón flotante WhatsApp desktop; (c) nota de privacidad del NewsletterSignup (footer/banner/inline); (d) botón de cierre del HeroPopup en home.
- Corrección: Subir las utilidades a text-blue-200/70 (≈5:1) en Footer.tsx:178 y NewsletterSignup; en MobileStickyBar/WhatsAppButton usar texto/icono #003b1a o navy-900 sobre #25D366 (≈5.5:1) o oscurecer el fondo a #128C4B; en HeroPopup.tsx:95 usar text-red-100 sin opacidad.

**[A11Y-7]** NewsletterSignup: inputs sin ningún nombre accesible salvo placeholder y mensajes de éxito/error sin aria-live

- Archivo: `app/components/NewsletterSignup.tsx`
- Alcance: Footer de todas las páginas (variant='footer'), banners en blog (variant='banner') y sidebar inline. 3 variantes × email (+nombre en banner).
- Corrección: Añadir aria-label={t.emailPlaceholder} + autoComplete="email" (y "given-name" al campo nombre) en las 3 variantes; envolver los mensajes de estado en un contenedor con role="status" aria-live="polite"; añadir aria-label al botón cuando muestra solo el spinner/check.

**[A11Y-8]** El skip link global apunta a #main-content, pero el ancla no existe en gran parte de las rutas y en el home <main> envuelve también Header y Footer

- Archivo: `app/layout.tsx`
- Alcance: Rutas sin #main-content verificadas: /servicios/accidentes, /servicios/inmigracion (y resto de detalle de servicios), /testimonios, /abogados, /nosotros, /blog (índice), /informacion/faq, /clientes-detenidos, /acceso-clientes, /privacidad, entre otras. Sí existe en: home, /consulta, /oficinas, landings (CityServiceLand…
- Corrección: Estandarizar: cada page/plantilla envuelve SOLO el contenido en <main id="main-content" tabIndex={-1}> dejando Header y Footer fuera; empezar por las plantillas de servicios, testimonios, abogados, nosotros, informacion y páginas legales (copiar el patrón de OfficePageView.tsx:111).

**[A11Y-9]** En el home el Header se renderiza en el DOM después del Hero: el orden de tabulación y de lectura no sigue el orden visual

- Archivo: `app/[lang]/page.tsx`
- Alcance: Home /es y /en (plantilla app/[lang]/page.tsx). Un usuario de teclado recorre skip-link → CTA del Hero → popup → y solo después llega a la navegación que visualmente está arriba.
- Corrección: Mover <Header/> antes de <Hero/> en app/[lang]/page.tsx (es fixed, no afecta el layout visual ni el LCP del retrato, que conserva priority) y sacarlo del <main> según A11Y-8.

**[A11Y-10]** Islas interactivas con nombres accesibles/ARIA incompletos: iframe sin title, botones icon-only sin aria-label y chat sin aria-live

- Archivo: `app/[lang]/testimonios/TestimoniosClient.tsx`
- Alcance: /testimonios (iframe y botón cerrar del modal), ventana de chat IA en todas las páginas (botón enviar, mensajes entrantes).
- Corrección: Añadir title={`Testimonio de ${selectedTestimonial.name}`} al iframe y aria-label bilingüe al botón X en TestimoniosClient; en AIChatButton añadir aria-label al botón enviar y role="log" aria-live="polite" al contenedor de mensajes; cambiar onKeyPress por onKeyDown.

**[A11Y-11]** HeroPopup ('¿Familiar Detenido?') aparece sin ninguna semántica ni anuncio: sin role, sin foco, sin Escape

- Archivo: `app/components/HeroPopup.tsx`
- Alcance: Home es/en. Aparece a los 7s o al hacer scroll >300px (no instantáneo — correcto) y es descartable con botón, pero usuarios de lector de pantalla no se enteran de que apareció y usuarios de teclado no pueden cerrarlo con Escape.
- Corrección: Añadir role="alertdialog" aria-label={isEs ? '¿Familiar detenido?' : 'Detained relative?'} + aria-describedby, listener de Escape que llame handleDismissPopup, y mover el foco al primer CTA al abrir (devolviéndolo al cerrar); subir contraste del botón 'Continuar al sitio'.

### Rendimiento y Core Web Vitals (4)

**[PERF-2]** Orbes decorativos gigantes (60-70vw) con blur(100-120px) animados con repeat:Infinity vía framer-motion en las plantillas de blog y varias páginas — trabajo continuo de rAF/GPU que degrada INP y batería en móvil

- Archivo: `app/components/blogs/BlogBackground.tsx`
- Alcance: ~70 URLs: 34 posts de blog × es/en + índice /blog (BlogBackground se importa en 36 archivos), /informacion/faq, /testimonios, /acceso-clientes, /inversionistas, /terminos (TermsOfService), y el explorador de oficinas
- Corrección: En BlogBackground.tsx (y los demás) reemplazar los m.div infinitos por keyframes CSS (`@keyframes` sobre transform/opacity con `animation-play-state` controlado) o directamente capas estáticas como ya hace el Hero de la home (Hero.tsx:56-61 usa orbes estáticos + Parallax solo-scroll). Si se conserva la animación, reducir el área (px fijos, no 70vw), bajar el blur y pausarla con IntersectionObserver cuando el orbe no está en viewport.

**[PERF-3]** El hero LCP de /informacion/recursos es un PNG crudo de 1.05 MB servido como CSS background-image, sin pasar por next/image ni preload

- Archivo: `app/[lang]/informacion/recursos/RecursosClient.tsx`
- Alcance: /es/informacion/recursos y /en/informacion/recursos (elemento LCP de la página)
- Corrección: Sustituir el div por `<Image src="/apretondemanos.png" alt="" fill priority sizes="100vw" className="object-cover" />` dentro del section relative (mismo resultado visual con el overlay bg-black/30 encima), y re-exportar el asset a ~1600px de ancho en WebP/AVIF (~60-120 KB). Ganancia directa de varios cientos de KB en el LCP de esa página.

**[PERF-4]** Los 6 videos del test de ciudadanía en /informacion/recursos apuntan a URLs WordPress muertas que el propio sitio redirige a /es — videos rotos + 6 requests con doble redirect en cada carga

- Archivo: `app/[lang]/informacion/recursos/RecursosClient.tsx`
- Alcance: /es/informacion/recursos y /en/informacion/recursos (6 elementos <video> con preload="metadata")
- Corrección: Subir los 6 MP4 a Vercel Blob (ya hay remotePattern para uenjwzjx3vckezns.public.blob.vercel-storage.com en next.config.ts:34-38) o al CDN de Bunny ya usado en servicios, y actualizar los videoUrl en RecursosClient.tsx:608-653. Mientras tanto, cambiar preload a "none" para no pagar las requests muertas.

**[PERF-5]** Los videos del equipo en /servicios/accidentes y /servicios/seguros usan un playlist.m3u8 (HLS) como src directo de <video>, formato que Chrome/Firefox/Edge no reproducen nativamente

- Archivo: `app/[lang]/servicios/accidentes/AccidentesVideo.tsx`
- Alcance: /es|en/servicios/accidentes y /es|en/servicios/seguros (4 URLs) — el video solo funciona en Safari
- Corrección: Bunny Stream expone también MP4 progresivo (play_720p.mp4) — usarlo como <source> fallback, o cargar hls.js con dynamic import SOLO al hacer click en play (mantiene el bundle limpio): `if (!video.canPlayType('application/vnd.apple.mpegurl')) { const Hls = (await import('hls.js')).default; ... }` en AccidentesVideo.tsx y SegurosVideo.tsx.

### Integridad de enlaces (1)

**[LINK-2]** Los 6 videos del examen cívico en /informacion/recursos apuntan a /wp-content del WordPress desmantelado, y la propia app redirige /wp-content/* a la home — todos los videos están rotos

- Archivo: `app/[lang]/informacion/recursos/RecursosClient.tsx`
- Alcance: 2 URLs: /es/informacion/recursos y /en/informacion/recursos — las 6 secciones de video de la página (128 preguntas del examen de ciudadanía).
- Corrección: Subir los 6 .mp4 al blob store ya usado por el proyecto (uenjwzjx3vckezns.public.blob.vercel-storage.com, ya permitido en next.config.ts) o a public/, y actualizar los 6 videoUrl de RecursosClient.tsx. Verificar reproduciendo cada video en /es/informacion/recursos.

### Internacionalización es/en (2)

**[I18N-2]** El HTML servido (SSR) de TODAS las páginas /en/ declara <html lang="es">; el idioma correcto solo se corrige con JavaScript en el cliente

- Archivo: `app/layout.tsx`
- Alcance: Las ~116 rutas bajo /en/* (50% de las URLs indexables del sitio).
- Corrección: Reestructurar al patrón oficial de i18n de Next: mover el <html lang={lang}> a app/[lang]/layout.tsx (que ya tiene generateStaticParams es/en, conservando SSG/ISR) y eliminar app/layout.tsx, reubicando app/page.tsx (redirect a /es, que ya cubre el proxy) y not-found.tsx dentro de la nueva estructura. Si la migración no compensa ahora, dejar constancia de que consumidores sin JS (validadores, algunas herramientas de traducción/AT) ven español declarado sobre contenido inglés; el script pre-paint mitiga el caso de le…

**[I18N-3]** og:locale y og:site_name desaparecen en ~63 páginas porque su openGraph propio reemplaza (shallow merge) al del layout

- Archivo: `app/[lang]/layout.tsx`
- Alcance: Los 35 blog posts, las 15 fichas de /oficinas/*, la home /[lang], 7 páginas de /servicios/* (accidentes, asilo, defensa-deportacion, familia, ley-criminal, seguros, …), abogados/[slug] (20 abogados), colaboradores/[slug] e inversionistas — en ambos idiomas (~126 URLs+). Las landings ciudad-servicio y newsletter NO está…
- Corrección: Crear un helper compartido (p. ej. app/lib/ogDefaults.ts: `buildOpenGraph(lang, overrides)` que inyecte siteName y locale es_US/en_US) y usarlo en los 63 page.tsx afectados; o como mínimo añadir `locale: isEs ? 'es_US' : 'en_US'` y `siteName` al openGraph de las plantillas de blog (35 archivos), oficinas (15) y home.

### Producción en vivo (1)

**[PROD-2]** La canonicalización apex→www responde 307 temporal (redirect a nivel dominio de Vercel) en lugar del 308 permanente definido en el código, y crea cadena de 2 saltos hasta el contenido

- Archivo: `next.config.ts:47-56`
- Alcance: https://manuelsolis.com/* (todo el dominio apex). Cadena para el usuario/crawler que entra por el apex: manuelsolis.com → 307 → www.manuelsolis.com/ → 307 → /es.
- Corrección: En Vercel Dashboard → Project → Settings → Domains, editar manuelsolis.com y cambiar el tipo de redirect a www a "Permanent (308)". Verificar después con `curl -sI https://manuelsolis.com/` que responde 308. La cadena de 2 saltos (apex→www→/es) es inherente a la arquitectura de prefijo de idioma y aceptable una vez que ambos saltos sean permanentes para crawlers.

## P3 — Baja

Detalles, código muerto, limpieza y mejoras menores. No requieren acción urgente pero varios son arreglos de un minuto.

### Infraestructura y configuración (6)

**[INF-5]** CSP debilitada: 'unsafe-inline' + 'unsafe-eval' en script-src y allowance muerta a la API de Gemini

- Archivo: `app/lib/securityHeaders.ts`
- Alcance: CSP global de todo el sitio
- Corrección: Quitar `https://generativelanguage.googleapis.com` de connect-src (cambio seguro e inmediato). A medio plazo: eliminar `'unsafe-eval'` (gtag/fbq/ttq no lo requieren) y migrar los inline snippets del layout a nonces para poder retirar `'unsafe-inline'`.

**[INF-6]** Header X-XSS-Protection '1; mode=block' deprecado — OWASP recomienda '0' o eliminarlo

- Archivo: `app/lib/securityHeaders.ts`
- Alcance: Todas las respuestas del sitio (header aplicado por next.config y proxy)
- Corrección: Cambiar el valor a `'0'` (o eliminar la entrada) en SECURITY_HEADERS de app/lib/securityHeaders.ts:61. Verificar que el scanner de Zoom no lo exija con valor '1' antes de eliminar (su checklist solo exige HSTS, X-Content-Type-Options, CSP y Referrer-Policy según el comentario de las líneas 5-12).

**[INF-7]** remotePatterns de imágenes con dominios muertos/incompletos: comopuedoarreglar.com sin ningún uso y manuelsolis.com solo apex

- Archivo: `next.config.ts`
- Alcance: next.config.ts images.remotePatterns — optimizador /_next/image de todo el sitio
- Corrección: Eliminar las entradas de comopuedoarreglar.com y manuelsolis.com de remotePatterns (o, si se conserva la propia, usar `hostname: '**.manuelsolis.com'` o añadir www). Correr `npm run build` + revisar que ninguna página use esas URLs (grep ya lo confirma para comopuedoarreglar).

**[INF-8]** Rate limiting in-memory inefectivo en serverless (por instancia y se resetea en cold start)

- Archivo: `app/lib/rateLimit.ts`
- Alcance: Todos los endpoints que dependen de él: /api/chat (Gemini de pago), /api/signup-proxy, /api/lead-capture, /api/newsletter/*, /go/[slug]
- Corrección: Para los endpoints con costo real (/api/chat → Gemini) mover el contador a un store compartido (Upstash Redis / Vercel KV) o configurar Rate Limiting del WAF de Vercel (vercel firewall) por path. Mantener el in-memory como segunda capa está bien.

**[INF-9]** Protección BotID desactivada por defecto: cliente opt-in por env var y servidor en report-only

- Archivo: `instrumentation-client.ts`
- Alcance: Formularios de conversión: /api/lead-capture y /api/newsletter/subscribe
- Corrección: Confirmar en Vercel → Settings → Security que BotID está activo para el proyecto/dominio; entonces setear NEXT_PUBLIC_BOTID_CLIENT_ENABLED=true y, tras el periodo de observación que ya prevé el comentario de subscribe/route.ts:35, promover BOTID_MODE=block. Mientras tanto el firewall de Vercel (challenge, verificado activo en prod con curl → 429 X-Vercel-Mitigated: challenge) es la única defensa.

**[INF-10]** Redirects de intención de contacto inconsistentes: /contact(-us) manda a /nosotros mientras /contacto manda a /consulta

- Archivo: `app/lib/seoRedirects.ts`
- Alcance: URLs legacy /en|es/contact y /en|es/contact-us vs /contacto
- Corrección: Cambiar el destination de '/:lang/contact' y '/:lang/contact-us' a '/:lang/consulta' en app/lib/seoRedirects.ts:117-118 y actualizar __tests__/seoRedirects.test.ts.

### Sitemaps, robots y feeds (3)

**[SMAP-2]** Los lastmod del sitemap son fechas mantenidas a mano que ya divergen de las modificaciones reales del contenido (home dice 2026-04-30 pero la portada cambió el 2026-07-03 y 2026-07-24)

- Archivo: `app/lib/sitemapData.ts`
- Alcance: Todos los shards. Ejemplos: home es/en (sitemap-pages), las 32 URLs de oficinas fijadas en bloque a '2026-04-11', el post accidente-camion-18-ruedas con lastmod 2026-06-29 pese a cambio de imagen el 2026-08-03.
- Corrección: Derivar lastModified de las fuentes de datos donde existen (BLOG_DATA post.date / campo updatedAt, newsletters nl.date ya se usa) y, para páginas estáticas, acordar actualizar la fecha en el mismo commit que cambia la página (checklist) o generar la fecha desde git (script de build que haga `git log -1 --format=%cs -- <ruta>` por entrada). Mientras tanto, corregir al menos home ('2026-07-24') y blog_32 ('2026-08-03') en sitemapData.ts.

**[SMAP-3]** El RSS del newsletter interpola <category> sin escape ni CDATA: un topic con '&' o '<' produciría XML inválido, y además concatena varias categorías en un solo elemento

- Archivo: `app/rss/newsletter/route.ts`
- Alcance: https://www.manuelsolis.com/rss/newsletter (los 3 items actuales validan porque ningún topic lleva caracteres especiales; es un riesgo latente cada vez que se añade una edición).
- Corrección: En app/rss/newsletter/route.ts:16 emitir un elemento por topic con CDATA: `${nl.topics.es.map((t) => `<category><![CDATA[${t}]]></category>`).join('')}`.

**[SMAP-4]** El RSS del blog declara <enclosure length="0"> (longitud ficticia), lo que genera warnings de validadores y puede hacer que agregadores descarten la imagen

- Archivo: `app/rss/blog/route.ts`
- Alcance: https://www.manuelsolis.com/rss/blog — los 35 items.
- Corrección: Opción simple: calcular el tamaño en build/request con fs.statSync(path.join(process.cwd(), 'public', post.image)).size y usarlo como length. Opción alternativa: sustituir enclosure por `<media:content>` (namespace media RSS), que no exige length.

### <head> y metadatos (8)

**[HEAD-2]** El índice /newsletter no emite og:image porque define openGraph sin images y el merge shallow descarta las del layout

- Archivo: `app/[lang]/newsletter/page.tsx`
- Alcance: 2 URLs: /es/newsletter y /en/newsletter
- Corrección: Añadir `images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: title }]` al openGraph de app/[lang]/newsletter/page.tsx (mismo patrón que newsletter/[slug]/page.tsx:57).

**[HEAD-3]** Los 34 posts del blog emiten openGraph sin og:site_name ni og:locale y usan title absolute sin marca

- Archivo: `app/[lang]/blog/accidente-auto-indocumentado-derechos/page.tsx`
- Alcance: 68 URLs (34 posts × es/en) bajo /[lang]/blog/*
- Corrección: En la plantilla de posts: añadir `siteName: 'Manuel Solis Law Firm'` y `locale: isEs ? 'es_US' : 'en_US'` al openGraph, y valorar usar `title` plano (string) para heredar el sufijo de marca del template del layout, como hacen newsletter y abogados.

**[HEAD-4]** og:image de /servicios/inmigracion declara 1200x630 pero el archivo real es 1280x720 y pesa ~916 KB (PNG)

- Archivo: `app/[lang]/servicios/inmigracion/page.tsx`
- Alcance: 2 URLs: /es/servicios/inmigracion y /en/servicios/inmigracion (único servicio que no usa og-default.jpg)
- Corrección: O bien cambiar a '/og-default.jpg' como el resto de servicios, o exportar una variante JPG real de 1200x630 (<300 KB), corrigiendo width/height declarados en openGraph y el mismo path en twitter.images y en el JSON-LD (línea 75).

**[HEAD-5]** apple-touch-icon.png es de 72x72 en lugar del estándar 180x180

- Archivo: `public/apple-touch-icon.png`
- Alcance: Global (todas las páginas — icono declarado en el layout [lang])
- Corrección: Reexportar el icono a 180x180 px (mismo path public/apple-touch-icon.png; no requiere cambio de código). Opcional: declarar `sizes: '180x180'` en icons.apple del layout.

**[HEAD-6]** 13 páginas no definen openGraph propio: heredan el del layout sin og:url ni title/description específicos

- Archivo: `app/[lang]/nosotros/page.tsx`
- Alcance: 26 URLs (es/en): /nosotros, /abogados, /colaboradores, /clientes, /privacidad, /terminos, /sms-terminos, /politica-editorial, /category/derechos-de-migrantes, /category/proteccion-legal-para-migrantes, /informacion/{faq,noticias,recursos}
- Corrección: Para las páginas con valor de compartición social (nosotros, abogados, colaboradores, categorías, informacion/*) añadir openGraph con title/description/url + images como en consulta/page.tsx:38-46. En las legales (privacidad/terminos/sms-terminos/politica-editorial) es aceptable dejarlo como está.

**[HEAD-7]** proxy.ts inyecta el header x-locale "para que RootLayout ponga <html lang>" pero nada lo consume (código muerto + comentario obsoleto)

- Archivo: `proxy.ts`
- Alcance: Pipeline de requests con locale (todas las páginas); sin efecto funcional
- Corrección: Eliminar las líneas 102-107 de proxy.ts (creación de requestHeaders y x-locale) y pasar `NextResponse.next()` simple, conservando el `Content-Language` de la línea 110; o actualizar el comentario si se decide conservar el header para debugging.

**[HEAD-8]** No hay token de verificación de Google Search Console en el código (ni meta ni archivo HTML)

- Archivo: `app/[lang]/layout.tsx`
- Alcance: Global — afecta la capacidad de verificar/retener la propiedad en GSC desde el repo
- Corrección: Confirmar el método de verificación vigente; si es conveniente tener redundancia versionada, añadir `verification: { google: '<token>' }` al generateMetadata de app/[lang]/layout.tsx (emite la meta google-site-verification en todas las páginas).

**[HEAD-9]** Título casi duplicado entre la ficha de accidentes de Dallas y la landing abogado-accidentes-dallas (riesgo de canibalización)

- Archivo: `app/[lang]/servicios/accidentes/oficinas/[slug]/page.tsx`
- Alcance: 4 URLs: /{es,en}/servicios/accidentes/oficinas/dallas vs /{es,en}/abogado-accidentes-dallas
- Corrección: Añadir `seoZone: { es: 'Dallas (Empire Central)', en: 'Dallas (Empire Central)' }` al registro dallas de app/[lang]/servicios/accidentes/accidentesOfficesData.ts (línea ~85), diferenciando título y description de la ficha frente a la landing.

### Datos estructurados JSON-LD (5)

**[JSONLD-6]** En /testimonios: rating visible hardcodeado '4.8' que puede divergir del valor vivo del schema, y segunda entidad LegalService anónima que duplica el AggregateRating de la Organization en la misma URL

- Archivo: `app/[lang]/testimonios/page.tsx`
- Alcance: /es/testimonios y /en/testimonios (2 URLs).
- Corrección: En TestimoniosClient obtener el rating vivo (pasarlo como prop desde page.tsx, que ya llama getPlaceData) y usarlo en el texto y en el title; en el schema de page.tsx sustituir la entidad anónima por `'@id': `${SITE_URL}/#organization`` (o eliminar el script, pues el layout ya emite la Organization con el mismo rating) y corregir la dirección si se conserva.

**[JSONLD-7]** Propiedades no válidas para el tipo Service (telephone, availableLanguage) en las fichas de oficinas de accidentes

- Archivo: `app/[lang]/servicios/accidentes/oficinas/[slug]/page.tsx`
- Alcance: 15 fichas /servicios/accidentes/oficinas/[slug] ×2 idiomas = 30 URLs.
- Corrección: Quitar `telephone` y `availableLanguage` del objeto Service, o moverlas a `availableChannel: {'@type':'ServiceChannel', servicePhone: {'@type':'ContactPoint', telephone: office.phone, availableLanguage: ['es','en']}}`.

**[JSONLD-8]** El headline del BlogPosting en las páginas de post usa el metaTitle en vez del H1 visible, y difiere del headline que el índice del blog emite para la misma URL

- Archivo: `app/components/blogs/BlogSchema.tsx`
- Alcance: 35 posts de blog ×2 idiomas = 70 URLs (todas las páginas que usan BlogSchema) + /[lang]/blog (índice).
- Corrección: Pasar `t.title` (el H1) como prop title de BlogSchema en los 35 posts y en la plantilla new-blog.mjs; el metaTitle ya viaja en <title>/description.

**[JSONLD-9]** Inconsistencias NAP menores entre entidades LocalBusiness: teléfono compartido entre dos oficinas distintas, coordenadas idénticas para dos direcciones y formatos de teléfono mezclados

- Archivo: `app/[lang]/oficinas/kirby/page.tsx`
- Alcance: Páginas /oficinas/kirby, /oficinas/houston-bellaire, /oficinas/houston-principal, /oficinas/houston-accidentes (×2 idiomas) y las 25 landings (formato de teléfono).
- Corrección: Al centralizar los datos por oficina (ver JSONLD-2/3), normalizar teléfonos a E.164 en el schema, asignar geo propia a 6705 Navigation, y verificar contra GBP si Kirby (oficina virtual) realmente comparte número con Bellaire; si no, corregir uno de los dos.

**[JSONLD-10]** Limpieza: comentario obsoleto sobre un VideoObject inexistente y oficinas virtuales Regus que siguen emitiendo entidad LegalService+Attorney completa con dirección

- Archivo: `app/lib/officeSchema.ts`
- Alcance: app/[lang]/layout.tsx (comentario) y 5 páginas de oficina virtual (north-loop, northchase, main-st, kirby, league-city) ×2 idiomas = 10 URLs.
- Corrección: Borrar/actualizar el comentario de layout.tsx:144 (y opcionalmente añadir VideoObject real en /testimonios si se quiere rich result de video). Para las 5 virtuales, decidir explícitamente: o degradar su schema a un `Place`/`ContactPoint` de la Organization (sin LegalService propio), o mantener LegalService asumiendo el riesgo — dejando la decisión documentada en officesRegistry.ts.

### Home y páginas de servicio (7)

**[SRV-7]** Todos los enlaces internos a artículos de blog desde las páginas de servicio usan slugs legacy con guiones bajos que atraviesan un 301 antes de llegar al slug canónico kebab-case

- Archivo: `app/[lang]/servicios/inmigracion/ImmigrationClient.tsx`
- Alcance: Las 10 páginas de servicio × 2 idiomas (~20 URLs, 15 slugs distintos: p. ej. ley_de_los_10_anos_cancelacion_de_deportacion, Formulario_G28_Cambiar_Abogado_Inmigracion, permiso_de_trabajo_visa_u, VAWA_para_hombres_..., etc.)
- Corrección: Buscar-y-reemplazar los 15 slugs underscore por sus equivalentes kebab-case (la tabla exacta está en seoRedirects.ts:50-68) en los *Client.tsx y *Data.ts de servicios, enlazando directo al destino canónico sin salto 301.

**[HOME-2]** En el home en inglés (/en) la sección About muestra el H2 y toda la sinopsis del EP.4 en español (texto hardcodeado sin variante EN)

- Archivo: `app/components/About.tsx`
- Alcance: /en (home, sección About/Uniendo Familias)
- Corrección: Añadir al menos encabezado y sinopsis en inglés cuando isEs === false en About.tsx:36-53 (puede conservarse la nota 'Episode in Spanish'), manteniendo el texto ES actual para /es.

**[SRV-8]** ~~Typo de clase Tailwind en el H1 de Seguros~~ — **FALSO POSITIVO, no hay nada que arreglar.** Al intentar aplicar la corrección se verificó que `SegurosClient.tsx:84` ya usa `text-white/90` con la barra correcta, y un barrido del patrón con backslash literal en todo `app/` no encontró ninguna coincidencia. La cita de más abajo se lee idéntica en ambos lados porque el generador de este informe normalizó las barras invertidas de rutas Windows

- Archivo: `app/[lang]/servicios/seguros/SegurosClient.tsx`
- Alcance: servicios/seguros × 2 idiomas (2 URLs)
- Corrección: Cambiar `text-white/90` por `text-white/90` en SegurosClient.tsx:84.

**[HOME-3]** ServiceCategory.tsx es código muerto: no se importa en ninguna página y sus enlaces apuntan a rutas legacy /areas-servicio/{slug} sin prefijo de idioma (todas 301 al índice)

- Archivo: `app/components/ServiceCategory.tsx`
- Alcance: Componente huérfano (0 páginas lo usan)
- Corrección: Eliminar app/components/ServiceCategory.tsx (y su entrada mental en el inventario de componentes); si se quisiera reutilizar, corregir los href a /{lang}/servicios/... antes.

**[HOME-4]** La sección Oficinas del home no genera ningún enlace interno rastreable hacia las 15 páginas /oficinas/*, y el HUD de horario es un ancla muerta href="#"

- Archivo: `app/components/OfficesExplorer.tsx`
- Alcance: /es y /en (home, sección Offices); el footer solo enlaza el índice /oficinas
- Corrección: En el panel de oficina activa añadir un Link 'Ver oficina' a `/${lang}/oficinas/${activeOffice.id}` y/o un grid estático server-rendered con las 15 oficinas enlazadas debajo del explorador; convertir el ActionHUD de horario en un <div> (quitar href="#").

**[SRV-9]** El índice /servicios no enlaza 4 de las 10 páginas de servicio (asilo, defensa-deportacion, vawa, visa-u): su grid solo tiene 6 tarjetas y la sección local enlaza únicamente landings ciudad-servicio

- Archivo: `app/[lang]/servicios/page.tsx`
- Alcance: /es/servicios y /en/servicios; páginas afectadas: servicios/{asilo,defensa-deportacion,vawa,visa-u} quedan sin enlace desde su hub natural
- Corrección: En servicios/page.tsx añadir las 4 páginas al array SERVICES (o una fila de 'Servicios especializados de inmigración' con las 4 tarjetas enlazando /servicios/{asilo,defensa-deportacion,vawa,visa-u}), reforzando el enlazado del hub hacia todas las páginas de servicio.

**[SRV-10]** Teléfono del schema LegalService no coincide con el teléfono visible de la página en Accidentes y Seguros (832-598-0914 en JSON-LD vs 866-420-0405 en los CTA)

- Archivo: `app/[lang]/servicios/accidentes/page.tsx`
- Alcance: servicios/accidentes y servicios/seguros × 2 idiomas (4 URLs); además el popup del hero del home usa un tercer número (888-676-1238)
- Corrección: Si el 866-420-0405 es la línea oficial de accidentes/seguros, actualizar `telephone` en getLegalServiceSchema de accidentes/page.tsx y seguros/page.tsx a '+1-866-420-0405' para que el dato estructurado coincida con el visible; si son números de tracking, confirmar que la política NAP del despacho lo permite y documentarlo.

### Oficinas y datos NAP (4)

**[OFI-7]** El detalle de Northchase conserva un mapLink placeholder 'your_map_link_here' aunque el share-link real de GBP existe en otras dos fuentes

- Archivo: `app/[lang]/oficinas/northchase/OfficeClient.tsx`
- Alcance: /es|en/oficinas/northchase (el fallback a búsqueda por dirección evita link roto, pero se pierde el pin de la ficha GBP)
- Corrección: Copiar 'https://share.google/wSptYM5hcuGigC3aS' a northchase/OfficeClient.tsx:19 y eliminar el branch del placeholder en OfficePageView.tsx:102-105 (y su gemelo en AccidenteOfficePageView.tsx:37-40) cuando la fuente única garantice mapLinks reales.

**[OFI-8]** Foto del edificio 6657 Navigation reutilizada como imagen (y og:image) de otras 3 ubicaciones, y fotos inconsistentes entre home y detalle para Kirby y Memphis

- Archivo: `app/[lang]/oficinas/houston-bellaire/OfficeClient.tsx`
- Alcance: Detalle + og:image de houston-bellaire y houston-accidentes; explorer del home para kirby; memphis (home vs detalle)
- Corrección: Tomar/obtener una foto real por ubicación (para las Regus, la fachada del centro de negocios es válida), guardarla con nombre por slug y referenciarla desde la fuente NAP única; alinear explorer y detalle de Kirby y Memphis a la misma imagen.

**[OFI-9]** El índice /oficinas agrupa League City dentro de 'Houston (8 oficinas)' aunque es otra ciudad, y el H1/badge cuenta las 5 direcciones virtuales como oficinas plenas

- Archivo: `app/[lang]/oficinas/page.tsx`
- Alcance: /es|en/oficinas (2 URLs)
- Corrección: Renombrar el grupo a 'Área metropolitana de Houston' (es/en) o mover League City a card independiente de Texas; opcionalmente añadir en las cards de las 5 virtuales el badge 'Con cita previa' para alinear con OFI-3.

**[OFI-10]** El CTA telefónico principal de las páginas de accidentes por-oficina genera tel: sin prefijo +1, a diferencia del resto del sitio

- Archivo: `app/[lang]/servicios/accidentes/AccidenteOfficePageView.tsx`
- Alcance: 30 URLs /servicios/accidentes/oficinas/[slug] (botón 'Llame ahora' del hero)
- Corrección: Cambiar la línea 107 a `tel:+1${office.phone.replace(//D/g, '')}` o, mejor, envolver el CTA con la misma lógica de TrackedPhoneLink para recuperar también el evento de conversión del botón principal.

### Blog y categorías (6)

**[BLOG-6]** Fecha visible off-by-one y mismatch de hidratación en las tarjetas del blog para visitantes en husos horarios de EE.UU.

- Archivo: `app/components/blogs/BlogCard.tsx`
- Alcance: Índice /es|/en/blog: las 35 tarjetas (BlogCard) y el destacado (FeaturedPost). La audiencia principal (US Central/Mountain/Pacific) ve un día menos que la fecha real del post.
- Corrección: Pasar `timeZone: 'UTC'` en las options de toLocaleDateString en BlogCard.tsx y FeaturedPost.tsx (o formatear la fecha en el servidor y pasarla ya resuelta como string, como se hace con title/excerpt).

**[BLOG-7]** Textos hardcodeados en español dentro de la versión inglesa de los 35 posts: encabezado del sidebar y atributos alt de las imágenes

- Archivo: `app/[lang]/blog/accidente-camion-18-ruedas-texas-compensacion/page.tsx`
- Alcance: Las 35 URLs /en/blog/*: sidebar y alt de imagen principal (y alts de imágenes secundarias donde existen).
- Corrección: Mover 'Sobre el Autor'/'About the Author' y los alt al objeto ui de blogContent (t.ui.aboutAuthor, t.ui.heroAlt) en cada post; corregir las entidades HTML (&iacute;) por caracteres UTF-8.

**[BLOG-8]** El CTA '¿Necesita Ayuda Legal?' apunta al servicio genérico /servicios/inmigracion en ~12 posts contradiciendo el mapa curado blogServiceMap, que además no tiene ningún consumidor (dead code)

- Archivo: `app/lib/blogRelations.ts`
- Alcance: 24 URLs (es/en): los 4 posts del clúster Visa U, los 2 de VAWA, frenar-deportacion, ley-de-los-10-anos, asilo-frontera, estatus-juvenil, marihuana-dui y entrevista-matrimonio enlazan a /servicios/inmigracion en vez de visa-u/vawa/defensa-deportacion/asilo/ley-criminal/familia.
- Corrección: En el template de cada post, reemplazar el servicePath/serviceLabel hardcodeados por `const svc = getServiceLink(slug)` y pasar `servicePath={svc.path} serviceLabel={svc.label[lang]}` a RelatedContent; o borrar getServiceLink si se decide mantener el hardcode (y entonces corregir los 12 destinos genéricos).

**[BLOG-9]** El feed 'Últimos Artículos' y el RSS no ordenan por fecha: BLOG_DATA tiene posts de mayo intercalados después/antes que abril

- Archivo: `app/[lang]/blog/page.tsx`
- Alcance: /es|/en/blog (grid tras el destacado) y /rss/blog. Ej.: daca-2026 (2026-05-13) aparece en la posición 6 y fraude-notarios (2026-05-16, más nuevo) en la 16, tras diez posts de abril.
- Corrección: En BlogPageIndex (y en rss/blog/route.ts) ordenar antes de renderizar: `[...BLOG_DATA.posts].sort((a,b) => b.date.localeCompare(a.date))`.

**[BLOG-10]** Fallback de imagen '/placeholder.jpg' inexistente en public/ y OG image del índice del blog reutiliza la imagen de un post

- Archivo: `app/components/blogs/BlogCard.tsx`
- Alcance: BlogCard/FeaturedPost (fallback muerto, hoy inalcanzable porque los 35 posts tienen imagen) y metadata OG/Twitter de /es|/en/blog.
- Corrección: Añadir public/placeholder.jpg (o cambiar el fallback a un asset existente como /logo-manuel-solis.png), y crear una imagen OG 1200x630 propia del blog para DEFAULT_OG_IMAGE.

**[BLOG-11]** Accesibilidad menor en el buscador del blog: input sin label accesible y botón de limpiar sin aria-label; visitorName en analytics es código muerto

- Archivo: `app/components/blogs/SearchBar.tsx`
- Alcance: /es|/en/blog (SearchBar) y BlogTracker en los 35 posts.
- Corrección: Añadir `aria-label={placeholder}` al input y `aria-label={lang==='es'?'Limpiar búsqueda':'Clear search'}` al botón X. En BlogTracker, eliminar getUserName/visitorName del payload de track().

### Landings ciudad-servicio (3)

**[LAND-7]** Encabezados 'Nuestra Oficina en Denver/Chicago/Los Ángeles' cuando la dirección física está en Arvada/Cicero/Pico Rivera (mitigado: la dirección real sí se muestra y el schema usa la locality correcta)

- Archivo: `app/components/CityServiceLanding.tsx`
- Alcance: abogado-inmigracion-denver, y las landings de chicago (4) y los-angeles (4) × 2 idiomas
- Corrección: En CityServiceLanding.tsx:182 y 190, cuando office.locality exista y difiera de city, usar p.ej. 'Nuestra oficina para Denver (en Arvada)' o 'Oficina del área de Denver'.

**[LAND-8]** Cifra de experiencia inconsistente: las landings dicen '35+ años' mientras el resto del sitio (translations) dice '34 años'

- Archivo: `app/components/CityServiceLanding.tsx`
- Alcance: Trust bar y tarjeta 'Desde 1990' de las 25 landings × 2 idiomas, vs copy global del sitio
- Corrección: Crear una constante única (p.ej. YEARS_EXPERIENCE = new Date().getFullYear() - 1990 o un valor editorial fijo) en un lib compartido y consumirla en CityServiceLanding.tsx, cityServiceData.ts y translations.ts.

**[LAND-9]** Export muerto MAIN_PHONE '(832) 598-0914' en cityServiceData.ts: número que no existe en officesPhoneMap ni se usa en ninguna parte

- Archivo: `app/lib/cityServiceData.ts`
- Alcance: app/lib/cityServiceData.ts (limpieza; riesgo de que un futuro consumidor publique un número no rastreado)
- Corrección: Eliminar el export o, si el número es legítimo, documentarlo y alinearlo con officesPhoneMap/DEFAULT_PHONE.

### Páginas restantes y legales (8)

**[REST-9]** Newsletter 'mensual' estancado desde abril 2026 (4 meses) con contenido legal que envejece, y campo image que apunta a archivos inexistentes

- Archivo: `app/lib/newsletterData.ts`
- Alcance: /es|en/newsletter y sus 3 ediciones; sitemap-newsletter.xml
- Corrección: Publicar ediciones pendientes o suavizar la promesa de frecuencia en newsletter/page.tsx; eliminar el campo `image` de NewsletterEdition (o añadir los assets si se va a usar). Revisar las afirmaciones legales fechadas de las ediciones viejas (política editorial del propio sitio exige retirar contenido desactualizado).

**[REST-10]** En /nosotros la metadata afirma '15 oficinas en 5 estados' mientras el cuerpo de la página dice '8 oficinas físicas'

- Archivo: `app/[lang]/nosotros/page.tsx`
- Alcance: /es/nosotros y /en/nosotros
- Corrección: Alinear ambas cifras (usar el conteo defendible de oficinas físicas o 'oficinas en 8 ciudades / 5 estados') en page.tsx:22-23 y NosotrosClient.tsx:41-42, idealmente derivándolo de officesRegistry.ts.

**[REST-11]** acceso-clientes: el CTA 'Contactar a mi abogado' enlaza a /{lang}/contacto, ruta que no existe y solo funciona vía redirect 301, con <a> plano

- Archivo: `app/[lang]/acceso-clientes/AccesoClientesClient.tsx`
- Alcance: /es/acceso-clientes y /en/acceso-clientes (CTA secundario del bloque final)
- Corrección: Cambiar la línea 781 a `/${lang}/consulta` (y opcionalmente usar next/link). Nota adicional del flujo: la página no recoge credenciales en el sitio — enlaza al portal externo https://solislawfirm.com/login (línea 29, con target _blank y rel noopener noreferrer correctos).

**[REST-12]** NewsletterSignup promete confirmación por correo ('Revisa tu correo para confirmar') pero el alta es directa, sin double opt-in

- Archivo: `app/components/NewsletterSignup.tsx`
- Alcance: Componente NewsletterSignup en sus 3 variantes (footer global, /newsletter, ediciones, blog)
- Corrección: Cambiar el copy a '¡Bienvenido! Te llegará un correo de bienvenida.' (o implementar double opt-in real con token si se quiere higiene de lista). Evita confusión del usuario que espera un paso de confirmación inexistente.

**[REST-13]** Inconsistencias de datos YMYL en attorneyData: experiencia de Manuel Solís ('30+ años' y 'casi tres décadas') vs el claim sitio-wide '35+ años', y Edwin Zavala agrupado en Arvada mientras su bio dice oficina de Denver

- Archivo: `app/lib/attorneyData.ts`
- Alcance: /es|en/abogados, /es|en/abogados/manuel-solis, /es|en/abogados/edwin-zavala (y el modal del directorio)
- Corrección: Actualizar attorneyData.ts:64,76 para alinear con '35+ años' (o citar el año de colegiatura, más defendible), y unificar Arvada/Denver (la landing abogado-inmigracion-denver y la oficina 'arvada' se refieren a la misma zona metro: usar una sola denominación en locationGroups y bio).

**[REST-14]** Fechas de 'última actualización' de páginas legales incoherentes: política editorial marcada 'marzo 2025' (17 meses atrás) y sms-terminos sin fecha alguna

- Archivo: `app/[lang]/politica-editorial/page.tsx`
- Alcance: /es|en/politica-editorial, /es|en/sms-terminos (privacidad: dic-2025; términos: mar-2026)
- Corrección: Revisar el contenido de politica-editorial y actualizar la fecha (línea 161); añadir 'Última actualización' al hero de SmsTerminosClient.tsx. Idealmente centralizar las fechas legales en una constante compartida para que no diverjan.

**[REST-15]** API de unsubscribe sin rate limit ni verificación de propiedad del email, y con búsqueda O(N) que se rompe con audiencias grandes

- Archivo: `app/api/newsletter/unsubscribe/route.ts`
- Alcance: POST /api/newsletter/unsubscribe
- Corrección: Usar la API de Resend por email directamente (contacts.update/remove acepta email como identificador) eliminando el list().find(); añadir el mismo rateLimit(`newsletter:${ip}`) que subscribe. La baja por enumeración es de bajo impacto (solo des-suscribe) pero gratis de cerrar.

**[REST-16]** La página 404 global fuerza a los usuarios EN al árbol /es (links hardcodeados) aunque cumple lo esencial: 404 real, diseño de marca, links útiles y sin tracking

- Archivo: `app/not-found.tsx`
- Alcance: app/not-found.tsx — cualquier URL inexistente del dominio, incluidos slugs inválidos de /en/abogados, /en/colaboradores, /en/newsletter
- Corrección: Convertir not-found en client-aware mínimo: leer location.pathname (misma técnica del script inline del root layout) para elegir /es|/en en los CTAs y mostrar el texto principal en el idioma correspondiente.

### Seguridad de APIs y admin (3)

**[SEC-14]** isSameOriginRequest devuelve true cuando falta la cabecera Origin, debilitando la defensa CSRF de blast y preview

- Archivo: `app/lib/newsletter/auth.ts`
- Alcance: POST /api/newsletter/blast (rama de auth por cookie), GET /api/newsletter/preview.
- Corrección: Cambiar el fail-open por fail-closed en métodos que mutan: en `/api/newsletter/blast`, exigir `Origin` presente y del mismo host cuando la auth es por cookie (`if (!origin || !isSameOriginRequest(origin, host)) return 403`). Dejar el comportamiento tolerante solo para GET idempotentes como `preview`.

**[SEC-15]** verifyBlastSecret y verifySessionToken filtran la longitud del secreto por retorno temprano

- Archivo: `app/lib/newsletter/auth.ts`
- Alcance: Login admin (`loginAction`), bearer de POST /api/newsletter/blast, cookie de las 8 páginas admin y de /api/analytics, /api/admin/short-links, /api/newsletter/preview.
- Corrección: Comparar digests de tamaño fijo en lugar de los secretos: `timingSafeEqual(sha256(provided), sha256(expected))`, ambos de 32 bytes, eliminando la rama por longitud. Aplicar en las dos funciones.

**[SEC-16]** /api/lead-capture confía en page_url del cliente para inferir área de práctica, oficina y atribución enviada a BOS

- Archivo: `app/lib/leadCapture.ts`
- Alcance: POST /api/lead-capture → todos los leads de ContactForm (todas las landings, servicios, oficinas y /consulta).
- Corrección: En `mapFormToPayload`/`validate`: parsear `page_url` y rechazar (o normalizar a `https://www.manuelsolis.com` + pathname) cualquier host que no esté en una allowlist `['www.manuelsolis.com','manuelsolis.com']`; acotar la longitud a 500 caracteres. Está cubierto por tests unitarios (`__tests__`), así que el cambio es verificable sin tocar el navegador.

### Flujo de leads y conversión (5)

**[LEAD-8]** El overlay de éxito/error se auto-oculta a los 4 segundos y deja el formulario vacío, invitando a un reenvío duplicado

- Archivo: `app/components/ContactFormClient.tsx`
- Alcance: Formulario de contacto en todas las páginas
- Corrección: Mantener el estado 'success' persistente (sin timeout) con un CTA claro ('Enviar otra consulta' que resetee manualmente); aplicar el auto-hide solo al estado 'error'.

**[LEAD-9]** UTMs explícitas parciales se pierden: una URL con utm_campaign/utm_medium pero sin utm_source llega a BOS como Sitio web/Organic/Organic_search

- Archivo: `app/lib/attribution.ts`
- Alcance: Leads cuyo landing traía UTMs sin utm_source (links mal etiquetados de email/social)
- Corrección: Decisión de negocio: si un link con utm_campaign sin source debe contar, en readTouchFromUrl aceptar touch cuando exista cualquier utm_* explícita (source default '(direct)') y en injectUtmsIntoUrl preservar utm_campaign/utm_medium ya presentes en la URL en vez de sobrescribirlos. Si la regla actual es intencional, documentarlo en el comentario de injectUtmsIntoUrl.

**[LEAD-10]** El submit del formulario no usa fireConversion(): el pixel Lead de Meta se dispara sin eventID (sin dedup futuro con CAPI) y el label de Vercel Analytics hardcodea 'contact_page' en ~65 páginas

- Archivo: `app/components/ContactFormClient.tsx`
- Alcance: Evento de conversión principal (form_submit/Lead) en todas las páginas con el formulario
- Corrección: Sustituir trackConversionEvents() + los track/trackConversion sueltos por `fireConversion('form_submit', label)` y `fireConversion('qualified_lead', label)` donde label sea el pathname actual; así el Lead de Meta lleva eventID (dedup listo para Lead CAPI) y los dashboards distinguen la página de origen.

**[LEAD-11]** GET /api/conversions acepta la API key por query string y el ledger Flight Check es in-memory por instancia (subconteo sistemático de conversiones)

- Archivo: `app/api/conversions/route.ts`
- Alcance: Ledger propio de conversiones (form_submit, phone_click, whatsapp_click, consulta_click) usado para conciliar con GA4/Meta
- Corrección: Eliminar la aceptación de `?key=` dejando solo Bearer, y comparar con timingSafeEqual. Para que el ledger sirva de verdad como doble-check, mover pushEvent a un destino persistente (Vercel KV/Blob o Supabase) en la fase ya prevista en el comentario de analyticsStore.ts.

**[LEAD-12]** El subtítulo de la sección del formulario de consulta usa copy de newsletter ('Manténgase informado sobre actualizaciones...') en las ~65 páginas

- Archivo: `app/components/ContactFormShell.tsx`
- Alcance: Sección #contacto (ContactFormShell) en todas las páginas que renderizan <ContactForm/>
- Corrección: Cambiar el párrafo por copy de consulta (p.ej. es: 'Cuéntenos su caso y un abogado le contactará en menos de 24 horas.' / en: 'Tell us about your case and an attorney will contact you within 24 hours.').

### Analítica y tracking (8)

**[TRK-8]** TikTok solo registra page view en la carga inicial: ttq.page() vive en el snippet del layout y nunca se re-dispara en navegaciones SPA

- Archivo: `app/[lang]/layout.tsx`
- Alcance: Todas las navegaciones cliente (Link de Next) del sitio: TikTok subcuenta page views vs Meta/ledger, que sí cubren SPA vía PageViewTracker. GA4 depende de que 'Cambios de historial' esté activo en Enhanced Measurement de la propiedad (no verificable en código).
- Corrección: En app/lib/tracking.ts trackPageView(), añadir `(window as any).ttq?.page?.()` tras firePixelPageView (con guard del primer load para no duplicar el ttq.page() del snippet — o quitar el ttq.page() del snippet y dejar solo el del tracker). Verificar en GA4 que Enhanced Measurement > Cambios de historial está activo; si no, disparar también gtag page_view aquí.

**[TRK-9]** El primer PageView CAPI de un visitante nuevo casi siempre viaja sin _fbp: el beacon sale al montar la página pero el pixel (que escribe la cookie) carga lazyOnload

- Archivo: `app/lib/tracking.ts`
- Alcance: Primera página vista de cada visitante nuevo — en un sitio de captación donde muchas sesiones son de una sola página, la mayoría de los PageView server-side van solo con IP+UA (EMQ reducido, matching más débil).
- Corrección: Opción simple: en trackPageView, si no existe la cookie _fbp, reintentar la lectura tras el evento 'msl:fbq-ready' (+1-2s) y retrasar el postEvent de ese primer page_view; el event_id ya está generado así que la dedup con el pixel no cambia. Mantener el envío inmediato como fallback con timeout para no perder bounces.

**[TRK-10]** Si META_CAPI_TEST_EVENT_CODE queda seteado en Production, todos los PageView reales se etiquetan como test events y desaparecen de los datos reales sin ninguna alerta

- Archivo: `app/lib/metaCapi.ts`
- Alcance: Todo el tráfico de producción hacia el dataset 1679590710105917 mientras la env var exista en el entorno Production de Vercel.
- Corrección: En sendMetaCapiEvents: `const testEventCode = process.env.VERCEL_ENV === 'production' ? undefined : (process.env.META_CAPI_TEST_EVENT_CODE || undefined);` — y loggear un console.warn si la variable existe en producción para detectarlo en los logs de Vercel.

**[TRK-11]** El ledger Flight Check es in-memory por instancia serverless: los eventos se pierden en cada cold start y el dashboard/GET subrepresenta sistemáticamente

- Archivo: `app/lib/analyticsStore.ts`
- Alcance: GET /api/conversions, /api/analytics y el dashboard /admin/analytics — cualquier conciliación contra GA4/Meta hecha con estos números está sesgada a la baja y varía según qué instancia atienda el request.
- Corrección: Persistir pushEvent en un destino durable (Upstash Redis/KV o Postgres vía Marketplace) manteniendo la misma interfaz de analyticsStore; o al menos rotular en el dashboard /admin/analytics que los datos son parciales por instancia.

**[TRK-12]** GET /api/conversions acepta la API key por query string (?key=), donde queda expuesta en logs e historial

- Archivo: `app/api/conversions/route.ts`
- Alcance: Endpoint de reporte GET /api/conversions (datos de conversiones con IP/UA/paths de los últimos 90 días).
- Corrección: Eliminar el fallback queryKey y aceptar solo `Authorization: Bearer`; rotar CONVERSIONS_API_KEY después del cambio por si ya quedó en logs.

**[TRK-13]** La suscripción al newsletter no dispara ningún evento de conversión en ninguna superficie

- Archivo: `app/components/NewsletterSignup.tsx`
- Alcance: NewsletterSignup (footer/blog) y páginas /newsletter — cero visibilidad del funnel de suscripción en Vercel Analytics, GA4, Meta, TikTok y el ledger propio.
- Corrección: Tras el response.ok del subscribe, llamar `fireConversion('form_submit', 'newsletter_signup', { location: ... })` (o añadir un ConversionType 'newsletter_signup' si se quiere separar del lead legal en los reportes).

**[TRK-14]** Las páginas /admin sí son trackeadas por GA4, TikTok, Vercel Analytics y SpeedInsights — PageViewTracker solo las excluye del ledger propio y de Meta

- Archivo: `app/[lang]/layout.tsx`
- Alcance: /es/admin, /en/admin y subpáginas (analytics, newsletter, short-links): el uso interno del equipo contamina GA4/TikTok/Vercel Analytics.
- Corrección: Pasar `beforeSend={(e) => (///admin(//|$)/.test(new URL(e.url).pathname) ? null : e)}` a <Analytics/>, y/o mover los <Script> de pixels a un componente que lea usePathname y no renderice en admin (o crear un route group (public) que aísle el admin del layout con trackers).

**[TRK-15]** Nombres de eventos de Vercel Analytics con alta cardinalidad e inconsistentes entre call sites

- Archivo: `app/lib/conversion.ts`
- Alcance: Todos los custom events de Vercel Analytics: fireConversion genera un nombre por combinación tipo.label ('phone_click.header_phone_button', 'phone_click.city_landing', 'whatsapp_click.mobile_sticky_bar'...), mientras ContactFormClient usa 'Contact Form Submit' y BlogTracker 'Blog Post View' / 'Blog Scroll 25%'.
- Corrección: En fireConversion usar `track(type, { label, ...meta })` (un nombre estable por tipo, label como propiedad) y alinear ContactFormClient/BlogTracker a la misma convención al migrarlos (TRK-4/TRK-6).

### Accesibilidad (3)

**[A11Y-12]** Saltos de jerarquía de encabezados: <h4> dentro del dropdown de oficinas del Header (h1→h4) y <h2> de SEO en el Footer

- Archivo: `app/components/Header.tsx`
- Alcance: Todas las páginas (Header/Footer globales). La jerarquía del contenido del home en sí es correcta (h1 en Hero, h2 por sección, h3 subordinados — verificado en About/Services/Testimonials/BlogHighlights/Team/Offices).
- Corrección: Sustituir los h4 del mega-menú por <span> o <p> con las mismas clases (o role="presentation"), y el h2 del footer por <p>/<span>; los estilos son por clase, no cambia nada visual.

**[A11Y-13]** Marquees infinitos sin mecanismo de pausa (WCAG 2.2.2), aunque prefers-reduced-motion sí está cubierto

- Archivo: `app/components/Hero.tsx`
- Alcance: Home (carrusel de barras de asociaciones en Hero) y /testimonios (banda de stats en marquee). Movimiento automático >5s sin control de pausa para usuarios sin la preferencia de SO activada.
- Corrección: Añadir `.hero-marquee:hover { animation-play-state: paused; }` más un botón de pausa accesible, o al ser contenido decorativo (logos), limitar la animación o marcar el contenedor aria-hidden si los nombres de asociaciones se exponen en otro lugar.

**[A11Y-14]** Detalles menores en flotantes: tooltip de WhatsApp solo con mouse, aria-label fijo en inglés, y la barra móvil fija puede tapar el final del footer

- Archivo: `app/components/WhatsAppButton.tsx`
- Alcance: Botón flotante WhatsApp (desktop, todas las páginas), MobileStickyBar (móvil, todas las páginas). Los 4 flotantes NO se superponen entre sí (verificado: AIChat right-6 [24-88px], WhatsApp right-[6.5rem] [104-168px], Consulta right-[12rem]; en móvil WhatsApp/Consulta se ocultan con hidden sm:block y AIChat sube a bottom…
- Corrección: En WhatsAppButton añadir onFocus/onBlur al tooltip y traducir el aria-label con language; añadir en globals.css `@media (max-width: 640px){ body { padding-bottom: calc(56px + env(safe-area-inset-bottom)); } }` o un spacer equivalente tras el Footer.

### Rendimiento y Core Web Vitals (4)

**[PERF-6]** ~8.3 MB de imágenes muertas (sin ninguna referencia en el código) desplegadas en public/

- Archivo: `public`
- Alcance: Peso de deploy/repo; no afecta a usuarios salvo que alguien enlace los archivos directamente
- Corrección: Eliminar los archivos (verificando antes con `git grep` que ninguna URL externa/newsletter los referencia). Aprovechar para reexportar los orígenes >1 MB que sí se usan (testimonials/YV0*.png ~1.7 MB c/u, MSTeam.png 1.7 MB) a ~1600px WebP: aunque next/image los optimiza al servir, reduce costo de transformación y del repo.

**Inventario exacto (4-ago-2026).** De los 139 assets de `public/`, **21 no tienen ninguna referencia en el código: 10,2 MB**. Se dejaron SIN BORRAR a propósito: un asset público puede estar enlazado desde un correo ya enviado, una ficha de Google o una publicación en redes, y eso no se puede comprobar desde el repo. La decisión de borrar es del despacho, archivo por archivo.

| Grupo | Archivos | Peso | Comentario |
|---|---|---|---|
| Variantes `_CR2`/`_CR3` de blogs antiguos (blog_02…blog_09) | 13 | 8,7 MB | El grueso del problema. Son recortes de una maquetación anterior del blog; los `_CR1` sí se usan. |
| `lupita.png` | 1 | 1,4 MB | Retrato sin ningún consumidor. |
| `associations/*.png` (American Bar, Illinois, Dallas, Chicago, New Mexico, Puerto Rico) | 6 | 19 KB | **No es basura: es material de autoridad sin usar.** Son logos de colegios y asociaciones profesionales. En un sitio legal YMYL, la pertenencia a colegios es una señal de E-E-A-T; convendría publicarlos en `/nosotros` o en las fichas de abogados en vez de borrarlos. |
| `favicon-16x16.png` | 1 | 422 bytes | Favicon válido pero huérfano: no lo declara el HTML ni `site.webmanifest`, así que ningún navegador lo pide. Inofensivo; borrarlo o declararlo. |

Nota metodológica: `android-chrome-192x192.png` y `android-chrome-512x512.png` aparecen como huérfanos en una búsqueda ingenua pero SÍ se usan — los referencia `public/site.webmanifest`, no el código. Cualquier limpieza automática debe incluir el manifest en el corpus de búsqueda.

**[PERF-7]** Cache-Control immutable de 1 año sobre archivos de public/ con nombres estables — reemplazar un asset con el mismo nombre nunca llega a visitantes recurrentes

- Archivo: `next.config.ts`
- Alcance: Todas las imágenes de public/ (hero de servicios, retrato del Hero, blog, oficinas) servidas por su ruta directa
- Corrección: Para las rutas de public/ usar `public, max-age=86400, stale-while-revalidate=604800` (las variantes optimizadas /_next/image/* ya tienen su propio immutable y minimumCacheTTL en :16-18, que es donde importa), o adoptar nombres versionados (manuelsolisl.v2.png) al reemplazar arte.

**[PERF-8]** En móvil, la home preloada con priority el retrato del Hero aunque queda por debajo del fold (flex-col-reverse pone el texto arriba), compitiendo con el LCP real (texto "50,000")

- Archivo: `app/components/Hero.tsx`
- Alcance: /es y /en en viewports móviles
- Corrección: Mantener priority (correcto para desktop) pero ajustar sizes móvil al tamaño real renderizado (~contenedor h-[350px] object-contain ⇒ ~315px de ancho útil: `(max-width: 768px) 60vw, 50vw`), reduciendo el peso del preload en móvil sin tocar desktop. Alternativa completa: dos <Image> con art direction (hidden lg:block) y priority solo en el desktop.

**[PERF-9]** El spotlight de /consulta repinta un radial-gradient a pantalla completa en cada frame de mousemove (propiedad background, no compositable)

- Archivo: `app/[lang]/consulta/ConsultaClient.tsx`
- Alcance: /es/consulta y /en/consulta en desktop (página clave de conversión)
- Corrección: Reemplazar por un pseudo-elemento fijo de 700px con el gradiente pre-pintado y moverlo con transform (`x`/`y` motion values sobre translate), que va por compositor: `<m.div style={{ x, y }} className="w-[700px] h-[700px] rounded-full bg-[radial-gradient(...)]" />`.

### Integridad de enlaces (8)

**[LINK-3]** Enlaces internos sin prefijo de idioma en componentes que sí conocen el idioma: fuerzan un redirect extra del proxy y pueden cambiar el idioma del usuario según cookie/Accept-Language

- Archivo: `app/[lang]/sms-terminos/SmsTerminosClient.tsx`
- Alcance: 5 archivos / ~10 URLs renderizadas: /[lang]/sms-terminos, /[lang]/clientes, /[lang]/informacion/noticias, /[lang]/abogados (modal de abogado). El enlace funciona, pero pasa por el 307 del proxy (proxy.ts:127-133) que resuelve el locale por cookie NEXT_LOCALE o Accept-Language — un usuario en /en/* sin cookie con navega…
- Corrección: Prefijar con el idioma actual: en SmsTerminosClient.tsx:308 usar href={`/${lang}/privacidad`}; en ClientesClient/NoticiasClient usar href={`/${language}`} y href={`/${language}#oficinas`}; en AttorneysExplorer.tsx:251 href={`/${lang}#contacto`}. Elimina el hop 307 y el riesgo de cambio de idioma.

**[LINK-4]** La página 404 global está hardcodeada a /es: a usuarios de la mitad inglesa del sitio les ofrece CTAs solo en español y hacia la versión española

- Archivo: `app/not-found.tsx`
- Alcance: Toda URL inexistente del sitio, incluidas las bajo /en/* (hay un único not-found.tsx en la raíz; no existe app/[lang]/not-found.tsx).
- Corrección: Cambiar los href a '/' y '/servicios' (el proxy los localiza con la cookie del usuario, proxy.ts:127-141), o añadir app/[lang]/not-found.tsx con textos y enlaces bilingües y dejar el raíz como fallback.

**[LINK-5]** Enlace a la ruta inexistente /[lang]/contacto en acceso-clientes: solo funciona porque un 308 de seoRedirects lo rescata hacia /consulta

- Archivo: `app/[lang]/acceso-clientes/AccesoClientesClient.tsx`
- Alcance: 2 URLs: /es/acceso-clientes y /en/acceso-clientes (CTA secundario del bloque final).
- Corrección: En AccesoClientesClient.tsx:781 cambiar a href={`/${lang}/consulta`} para eliminar el hop 308 y no depender de la regla de compatibilidad.

**[LINK-6]** Componente muerto ServiceCategory enlaza a la ruta inexistente /areas-servicio/<slug> (sin prefijo de idioma y sin página destino)

- Archivo: `app/components/ServiceCategory.tsx`
- Alcance: 0 URLs en producción hoy (el componente no se importa en ningún archivo — verificado con grep: solo aparece en su propia definición), pero es una mina si alguien lo reutiliza: cada item generaría un 404.
- Corrección: Eliminar app/components/ServiceCategory.tsx, o si se quiere conservar, cambiar el href a `/${lang}/servicios/${slugify(item)}` recibiendo lang por props.

**[LINK-7]** El skip link global '#main-content' apunta a un ancla que no existe en 14 plantillas

- Archivo: `app/layout.tsx`
- Alcance: ≈30+ URLs (versiones es/en de: category/derechos-de-migrantes, category/proteccion-legal-para-migrantes, clientes, clientes-detenidos, informacion/faq, informacion/noticias, informacion/recursos, newsletter, newsletter/[slug] (~34 slugs), nosotros, politica-editorial, privacidad, sms-terminos, terminos vía TermsOfServi…
- Corrección: Añadir id="main-content" tabIndex={-1} al <main> de cada uno de los 14 archivos listados (mismo patrón que app/[lang]/oficinas/page.tsx:276).

**[LINK-8]** window.open sin 'noopener' en el botón de WhatsApp y CTA implementado como <button> sin href (no rastreable ni accesible como enlace)

- Archivo: `app/components/WhatsAppButton.tsx`
- Alcance: Botón flotante de WhatsApp presente en todo el sitio (WhatsAppButton, salvo WHATSAPP_HIDDEN).
- Corrección: Cambiar a window.open(whatsappUrl, '_blank', 'noopener,noreferrer') o, mejor, renderizar <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={trackClick}> como hace MobileStickyBar.tsx:90.

**[LINK-9]** Enlaces http:// (no seguros) a ice.gov en la guía de clientes detenidos

- Archivo: `app/[lang]/clientes-detenidos/ClientesDetenidosClient.tsx`
- Alcance: 2 URLs (es/en) de /clientes-detenidos: los enlaces a Joe Corley Detention Facility y T. Don Hutto Residential Center (4 ocurrencias en total).
- Corrección: Cambiar http:// → https:// en las 4 ocurrencias de las líneas 142-143.

**[LINK-10]** Componente LanguageSwitcher huérfano que, si se reutiliza, cambia el idioma solo en el contexto sin navegar a la ruta equivalente

- Archivo: `app/components/LanguageSwitcher.tsx`
- Alcance: 0 URLs hoy (no se importa en ningún archivo; el switcher real es el de Header.tsx). Riesgo latente de regresión si alguien lo monta.
- Corrección: Eliminar app/components/LanguageSwitcher.tsx (dead code) para evitar que se reutilice por error.

### Internacionalización es/en (4)

**[I18N-4]** La validación de locale inválido (/fr/…) depende únicamente del proxy: falta dynamicParams=false y las páginas hacen fallback silencioso a 'es'

- Archivo: `app/[lang]/layout.tsx`
- Alcance: Todo el árbol app/[lang] (todas las plantillas).
- Corrección: Añadir `export const dynamicParams = false;` en app/[lang]/layout.tsx (una línea, cubre todo el subárbol): cualquier lang ≠ es|en produce 404 a nivel framework, independiente del proxy. Compatible con el ISR actual (revalidate=86400).

**[I18N-5]** Contenido en español visible en la home /en/: H2 y sinopsis completa de 'Uniendo Familias' sin variante inglesa; tags/section de OpenGraph en español en los 35 blog posts /en/

- Archivo: `app/components/About.tsx`
- Alcance: Home /en (sección About: título de sección + párrafo de ~120 palabras + title/alt del video) y los 35 blog posts en /en/ (metadatos article:section y article:tag).
- Corrección: En About.tsx envolver el H2 e intro con isEs (p. ej. 'Uniting Families | Episode 4 — The decision that changed everything' + una línea '(episode in Spanish)' y mantener la sinopsis si se desea); traducir title/alt en AboutVideo.tsx. En las plantillas de blog, mover section/tags al objeto blogContent por idioma (t.ogSection / t.ogTags) o al menos usar valores en inglés cuando lang==='en'.

**[I18N-6]** La página 404 global está solo en español y sus CTAs siempre llevan a /es, incluso para usuarios que navegaban en /en/

- Archivo: `app/not-found.tsx`
- Alcance: Cualquier 404 del sitio (incluye typos bajo /en/*, y los 404 producto de I18N-1).
- Corrección: Convertir el bloque de textos/CTAs en un client component pequeño que lea `usePathname()` (o `location.pathname`) y alterne es/en (textos y hrefs /es|/en); alternativamente duplicar CTAs ('Ir al inicio / Go home') apuntando a cada idioma.

**[I18N-7]** Componente muerto LanguageSwitcher.tsx (button + router.push, no rastreable) y el switcher real del Header descarta el query string al cambiar de idioma

- Archivo: `app/components/LanguageSwitcher.tsx`
- Alcance: app/components/LanguageSwitcher.tsx (sin uso: ningún import fuera de su propio archivo) y el switcher activo del Header (todas las páginas).
- Corrección: Borrar app/components/LanguageSwitcher.tsx (y el toggle en LanguageContext si queda sin uso) para evitar que se re-monte por error; en Header.langPath conservar la query: `return `/${target}${rest ? '/' + rest : ''}${typeof window !== 'undefined' ? window.location.search : ''}`` (o usar useSearchParams).

### Producción en vivo (1)

**[PROD-3]** El redirect de idioma / → /{locale} varía por cookie y Accept-Language pero se emite con Cache-Control: public y sin header Vary

- Archivo: `proxy.ts:126-143`
- Alcance: Todas las rutas sin prefijo de idioma solicitadas por navegadores (no crawlers): /, /oficinas, /servicios, etc.
- Corrección: En proxy.ts, tras crear el response en la línea 133, añadir `response.headers.set('Vary', 'Accept-Language, Cookie');` (y opcionalmente `Cache-Control: private, no-store` para este redirect específico, dado que es por-usuario).

## Mapa de causas raíz

| Causa raíz | Síntomas que produce | Corrección centralizada |
|---|---|---|
| NAP duplicado en 6 fuentes sin registro único | OFI-1 (mapa de Memphis → Houston), OFI-2/3/4, LAND-3/4, JSONLD-2/3/9, OFI-7/8/10 | Derivar dirección, teléfono, horario, geo y mapLink de `officesRegistry.ts`; borrar las copias |
| Matcher del middleware sin excluir `/go/` | PROD-1: los 10 short links de campaña en 404, cero tracking de clics | Una línea en `proxy.ts:149` |
| Secreto hardcodeado para evitar el escape de `$` en `.env.local` | SEC-1: credencial viva en repo público | Env var en Vercel + rotación en Azure + borrar el endpoint huérfano |
| `dataLayer.push` plano sin contenedor GTM instalado | TRK-1: GA4 sin `phone_click`, `consulta_click`, `form_submit`, `qualified_lead` | Cambiar la superficie 2 de `conversion.ts` a `window.gtag('event', …)` |
| Modales y disparadores ad-hoc (`<div onClick>`, `<span>`, hover CSS) | A11Y-1/2/3/4/11, LINK-8 | Un componente `Modal.tsx` con `role="dialog"` + focus trap; `<button>` en los disparadores |
| Estado en memoria de módulo en runtime serverless | SEC-6 (rate limit), SEC-11 (candado de blast), TRK-11 (ledger), LEAD-11 | Vercel WAF rate limiting o Upstash Redis; persistir el ledger |
| Reseñas y "casos" generados por interpolación / datos de Google Places en JSON-LD | LAND-2, REST-2, JSONLD-1, JSONLD-6 | Casos reales anonimizados o eliminar la sección; quitar `review`/`aggregateRating` no visibles |
| Contenido legacy de WordPress congelado en componentes | BLOG-1 (categorías fantasma), PERF-4/LINK-2 (videos `/wp-content` muertos), SRV-7 (slugs con `_`) | Reescribir contra `BLOG_DATA`; migrar o quitar los videos |
| Política de privacidad no versionada con el tracking | REST-3 (afirma no compartir para marketing mientras envía a Meta), TRK-5 (sin CMP) | Actualizar la política al inventario real de terceros |
| `initial="hidden"` de framer-motion sobre contenido above-the-fold | PERF-1 (CTA telefónico invisible hasta hidratar en ~50 URLs) | Exceptuar CTAs y H1 del gate, como ya se hizo con el retrato del Hero |

## Plan de implementación

### Hoy (bloqueantes)

1. **Rotar** el token de `solislawruler.azurewebsites.net` en Azure. Es lo único que cierra la exposición; el secreto seguirá en el historial público de git.
2. **Borrar** `app/api/signup-proxy/route.ts` (no tiene consumidores) o migrarlo a env var con validación y BotID.
3. **Arreglar `/go/*`**: añadir `go/` al negative lookahead de `proxy.ts:149`. Verificar en navegador que `/go/ig-bio` responde 302 al destino con las UTMs inyectadas.
4. Evaluar cambiar el repositorio a **privado** (hoy expone el código, la lógica de negocio y el historial de secretos).

### Esta semana (P1)

5. Crear `app/[lang]/newsletter/unsubscribe/page.tsx` + soporte one-click (RFC 8058). Hoy **ningún suscriptor puede darse de baja** — riesgo CAN-SPAM y de reputación de envío con Gmail/Yahoo.
6. Arreglar la imagen del hero de Visa U (`VisaUClient.tsx:63` → archivo inexistente) y el `mapLink` de Memphis (`memphis/OfficeClient.tsx:19`).
7. Revisión legal-publicitaria: eliminar los "casos típicos" generados por interpolación (`cityServiceLocalContent.ts`) y las 3 reseñas de `/testimonios` que comparten permalink. Riesgo bajo reglas de publicidad de abogados de Texas (7.01/7.02).
8. Actualizar la política de privacidad al inventario real de terceros (Meta Pixel + CAPI, Vercel, Gemini, Resend).
9. Sesión de admin: firmar el token con expiración y separar los tres secretos hoy fusionados en `NEWSLETTER_BLAST_SECRET`.
10. `TRK-1`: cambiar la superficie dataLayer a `window.gtag('event', …)` y confirmar en GA4 DebugView. Hoy GA4 no ve casi ninguna conversión.
11. Reescribir o retirar las 2 páginas de categoría (58 enlaces muertos, enlazadas desde el Footer y en el sitemap).
12. Dead-letter para leads: persistir el payload cuando BOS falla tras los reintentos.

### 30 días (accesibilidad, rendimiento, P2 estructurales)

13. Componente `Modal.tsx` accesible y migración de los 5 modales; `<button>` en los disparadores del Header y de los videos.
14. Fuente única de NAP derivada de `officesRegistry.ts`; eliminar las 5 copias.
15. Sacar los CTAs above-the-fold del gate de opacidad de framer-motion.
16. Rate limiting con estado compartido (Vercel WAF o Upstash) y caps de tamaño en `/api/chat`.
17. Limpiar el JSON-LD: quitar `review`/`aggregateRating` no visibles y los `FAQPage` sin FAQ renderizada.
18. Contrastes por debajo de AA (footer legal ≈2.98:1, CTA WhatsApp ≈1.99:1) y labels de formulario.

### 60-90 días (estructural)

19. Decidir el futuro de las landings ciudad-servicio: 63-72% del texto indexable es idéntico entre ciudades del mismo servicio. Diferenciar con contenido local real o consolidar.
20. Gestión de consentimiento (relevante bajo TDPSA de Texas) y `<html lang>` correcto en SSR para `/en` (hoy se sirve `lang="es"` y se parchea con JS).
21. Higiene de assets: ~8.3 MB de imágenes sin referencias desplegadas; hero de `/informacion/recursos` de 1.05 MB como `background-image`.

## Pruebas de validación (criterios de cierre)

| Hallazgo | Prueba que confirma la corrección |
|---|---|
| SEC-1 | El token viejo devuelve 401 en la API de Azure; `git grep` del patrón no encuentra nada en `HEAD` |
| PROD-1 | `curl -I https://www.manuelsolis.com/go/ig-bio` → `302` al destino con `utm_*`; el clic aparece registrado |
| REST-1 / SEC-5 | `/es/newsletter/unsubscribe?email=…` → 200 y el POST one-click da de baja |
| SRV-1 | `/_next/image?url=%2F…` del hero de Visa U → 200 `image/*` |
| OFI-1 | El botón "Ver en mapa" de Memphis abre la ficha de Memphis |
| TRK-1 | GA4 DebugView recibe `phone_click`, `consulta_click`, `form_submit`, `qualified_lead` |
| A11Y-1/2/3/4 | Recorrido completo con Tab: submenús abribles, modales con foco capturado y cierre con Escape |
| LEAD-2 | Con BOS simulado en 5xx, el payload del lead aparece persistido y recuperable |
| NAP (OFI-2) | Un script de CI compara las 6 fuentes y falla si divergen |

## Apéndice: hallazgos aparecidos durante la remediación

Los 174 hallazgos de este informe salieron de auditar el código. Al aplicar las correcciones aparecieron **otros seis que la auditoría no había detectado**, porque solo se ven al tirar del hilo de un arreglo. Se listan aquí para que quede constancia de que existieron y de cómo se cerraron.

| Hallazgo | Cómo apareció | Estado |
|---|---|---|
| **`Lorem ipsum` enviado a los suscriptores.** Dos plantillas de correo del boletín (`newsletterCta`, `newsletterNoCta`) tenían el texto de relleno como primer párrafo, y el blast no pasa ningún `intro` propio: todo envío con esas variantes lo incluía. | Búsqueda de placeholders al empezar la fase de pulido. | Corregido: el párrafo ahora es la frase real que ya acompañaba al relleno. Cubierto por `__tests__/contentHygiene.test.ts`. |
| **Barra de progreso al 26% inventada.** `/informacion/noticias` mostraba "Fase Inicial de Arquitectura · 26%" sobre una reconstrucción imaginaria, con copy solo en español y `noindex`. | Al ir a corregir su metadata "coming soon". | Página reconstruida: lista 7 artículos reales de actualidad derivados de `BLOG_DATA`, ya indexable, enlazada desde el Header y en el sitemap. |
| **`/clientes` era una copia literal del placeholder de noticias**, no una página propia a medio hacer. | Al comparar ambos archivos para decidir su destino. | Página eliminada + 308 a `/acceso-clientes`, que es el portal real. |
| **Tres imágenes del boletín apuntaban a `public/newsletter/`, un directorio que no existe**, en un campo `image` que ningún consumidor leía. | Barrido de rutas de asset contra `public/`. | Campo eliminado del tipo y de las tres ediciones; el compilador confirmó que nadie lo usaba. |
| **Los tres `fetch` del cliente (formulario, boletín, chat) no tenían timeout.** Es el modo de fallo exacto que en mayo de 2026 dejó el formulario colgado indefinidamente cuando el challenge de BotID no se servía: sin error visible y con el lead perdido. | Al evaluar si se podía activar BotID sin riesgo. | Los tres con `AbortSignal.timeout`. El del formulario avisa de que el envío pudo haber llegado, para no provocar un reenvío duplicado. |
| **`dallas.png`, entre los logos sin publicar, no es un colegio de abogados**: es el sello del condado con la leyenda "RECOGNIZED ON THE DALLAS COUNTY COMMUNITY PROGRAM", una afirmación de reconocimiento oficial que nada en el repo respalda. | Al abrir los seis emblemas uno por uno antes de publicarlos. | No publicado. Se publicaron los cuatro que sí son asociaciones profesionales verificables. |

Dos entregables antirregresión salieron de aquí: `__tests__/contentHygiene.test.ts` (falla si vuelve un `lorem ipsum`, un placeholder sin rellenar, un `href="#"`, una ruta de asset inexistente o una página que se anuncie "en construcción" en sus metadatos) y `__tests__/napConsistency.test.ts` (divergencias de NAP entre fuentes). Ambos se comprobaron rompiéndolos a propósito: un test que no puede fallar da falsa seguridad.

## Cobertura y límites de esta auditoría

**Cubierto:** código de las 117 rutas y 21 handlers, metadatos y JSON-LD por plantilla, sitemaps y robots contra el inventario real, seguridad de APIs y admin, flujo completo de leads y atribución, tracking Meta/GA4/TikTok, accesibilidad a nivel de código, rendimiento a nivel de código y assets, integridad de enlaces, i18n, y verificación en producción por HTTP.

**No cubierto (requiere accesos o herramientas que no tengo en esta sesión):**

- Google Search Console y GA4: cobertura real de indexación, canonical elegida por Google, datos de campo de Core Web Vitals. Sin esto no puedo confirmar qué URLs están efectivamente indexadas.
- Datos de campo de LCP/INP/CLS en el percentil 75 (el análisis de rendimiento es de laboratorio y de código).
- Pruebas con lector de pantalla real, y en Safari/iOS y Firefox.
- Verificación con el dataset de Meta (Events Manager) de que el dedup browser/servidor por `event_id` funciona en la práctica.
- Panel de Vercel: reglas de firewall, variables de entorno reales, logs de runtime.
- Estado del backend BOS y del CRM al recibir los leads.

El firewall de Vercel responde `429` con challenge a la mayoría de requests no-navegador, lo que limitó las comprobaciones en producción; las que aparecen en este informe pasaron el challenge y son respuestas reales.
