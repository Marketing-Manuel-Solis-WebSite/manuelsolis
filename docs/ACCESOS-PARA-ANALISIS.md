# Accesos que faltan para cerrar el análisis

Estado a 5 de agosto de 2026. Este documento dice, por orden de valor, **qué dato me
falta, qué podría hacer con él, y los pasos exactos para dármelo**. No contiene
ningún secreto: el repositorio es público.

## Lo que ya uso sin pedirte nada

Para que quede claro qué está cubierto y no lo pidas dos veces:

| Fuente | Qué saco de ahí |
|---|---|
| El código del repo | Lógica, schema, metadatos, enlaces, datos de negocio |
| **El HTML que `next build` prerenderiza** | Los metadatos reales de las 292 páginas públicas: es lo que recibe Google. Es la vía que ha permitido medir og:*, títulos, descripciones, JSON-LD, encabezados y enlaces internos sin ningún acceso externo (`npm run seo:check`) |
| CLI de Vercel (ya autenticado) | Env vars, despliegues, promoción y rollback |
| Vercel MCP | Errores de runtime en producción — **así descubrí que el chat está caído** |
| `curl` contra producción | Códigos HTTP, cabeceras, redirecciones, robots, sitemaps |
| HTML público de YouTube | Fechas de subida reales de los vídeos (`itemprop="uploadDate"`), que activaron el schema de vídeo |

---

## 1. Google Search Console — el que más falta

**Sin esto el SEO va a ciegas.** Puedo medir lo que el sitio *emite*, pero no qué
indexa Google, qué consultas traen tráfico, qué páginas pierden posiciones, ni si
alguna quedó excluida. No hay meta tag de verificación en el código ni archivo de
verificación en `public/`, así que puede que la propiedad no exista todavía.

**Lo que haría con ello:** priorizar por tráfico real en vez de por criterio; detectar
páginas indexadas que no deberían estarlo y viceversa; ver si las 25 landings de ciudad
canibalizan entre sí de verdad (ahora solo puedo inferirlo por los títulos); saber qué
consultas ya rankean para reforzarlas; y comprobar si los cambios de esta semana
mejoran el CTR.

### Opción A — la más simple: verificar el sitio (5 minutos, sin credenciales)

1. Entra en <https://search.google.com/search-console> y añade la propiedad
   `https://www.manuelsolis.com` (tipo *Prefijo de URL*).
2. Elige el método **Etiqueta HTML** y copia el valor del `content`.
3. Dímelo por el chat y yo lo añado al `metadata.verification` del layout (una línea).
4. Cuando esté verificado, exporta desde la interfaz y súbeme los CSV:
   - *Rendimiento* → últimos 3 meses → exportar **Consultas** y **Páginas**.
   - *Indexación → Páginas* → exportar el detalle de las excluidas.
   Con esos dos CSV en el repo (o pegados en el chat) hago el análisis completo.

### Opción B — la buena: que yo consulte la API cuando quiera

1. En <https://console.cloud.google.com> crea un proyecto (o usa uno existente).
2. *APIs y servicios → Biblioteca* → habilita **Google Search Console API**.
3. *IAM → Cuentas de servicio* → crear cuenta → **Claves → Añadir clave → JSON**.
4. En Search Console → *Configuración → Usuarios y permisos* → **Añadir usuario**:
   pega el correo de la cuenta de servicio (`algo@proyecto.iam.gserviceaccount.com`)
   con permiso **Completo**.
5. Guarda el JSON en Vercel y en tu `.env.local` como una sola línea:
   `GSC_SERVICE_ACCOUNT_JSON={"type":"service_account",...}`
6. Avísame y escribo el script que consulta la API (`scripts/gsc-report.mjs`), lo dejo
   en el repo y lo ejecuto cada vez que haga falta.

La opción B es la que te recomiendo: con ella no tienes que exportar nada nunca más.

---

## 2. Google Analytics 4 — para saber qué páginas convierten

**Lo que haría:** cruzar tráfico con conversiones por página y saber qué landings
generan consultas de verdad, no solo visitas. Ahora mismo el sitio envía eventos a GA4
(se corrigió esta semana: antes casi ninguno llegaba) pero no puedo leer los informes.

**Pasos** — reutiliza la cuenta de servicio del punto anterior:

1. En Google Cloud, habilita **Google Analytics Data API**.
2. En GA4 → *Administrar → Gestión de acceso a la propiedad* → añade el correo de la
   cuenta de servicio con rol **Lector**.
3. Dime el **ID de propiedad** (el número de 9 dígitos que aparece en
   *Administrar → Detalles de la propiedad*, no el `G-XXXXXXX`).
4. Env var: `GA4_PROPERTY_ID=123456789` (no es secreto).

**Verificación pendiente que solo se ve ahí:** los eventos nuevos (`phone_click`,
`consulta_click`, `form_submit`, `qualified_lead`, `newsletter_signup`) hay que
marcarlos como *eventos clave* en *Administrar → Eventos* para que cuenten como
conversiones, y comprobar en *Flujo de datos → Medición mejorada* si «Cambios de
historial» está activo (si no lo está, las navegaciones internas no registran
`page_view` y habría que dispararlo desde el código).

---

## 3. PageSpeed Insights — una clave gratuita desbloquea los Core Web Vitals

Intenté medir rendimiento real y la API me respondió *quota exceeded*: sin clave se
comparte una cuota global que hoy está agotada.

**Lo que haría:** medir LCP, INP y CLS de las plantillas clave en móvil y escritorio, y
—más importante— leer los **datos de campo de CrUX**, que son de usuarios reales y no de
laboratorio. Con eso sabría si el trabajo de rendimiento hecho esta semana (animaciones
infinitas eliminadas, CTAs sin bloqueo de opacidad, imagen de 1 MB optimizada) se nota
en usuarios de verdad.

**Pasos:** Google Cloud → habilita **PageSpeed Insights API** → *Credenciales → Crear
credenciales → Clave de API*. Env var: `PAGESPEED_API_KEY`. Es gratis y sin coste por uso.

---

## 4. Vercel Web Analytics — un interruptor que está apagado

El código monta `<Analytics/>` y `<SpeedInsights/>` en todas las páginas, pero la API me
responde *Web Analytics not found*: **no está habilitado en el proyecto**. Es decir, el
sitio cree que recoge analítica de Vercel y no recoge nada.

**Pasos:** panel de Vercel → proyecto `manuelsolis` → pestaña *Analytics* → **Enable**.
Sin tocar código. A partir de ahí puedo consultarla yo directamente por MCP (páginas más
vistas, referrers, países, dispositivos) sin que tengas que exportar nada.

---

## 5. Clave nueva de Gemini — el chat del sitio está caído

Los logs de producción devuelven, con último registro de esta madrugada:

> `[403 Forbidden] Your API key was reported as leaked. Please use another API key.`

Google detectó la filtración de la clave y la **revocó**. No es un aviso de seguridad
teórico: el asistente del sitio no responde a nadie. Aquí no hay decisión que tomar
sobre rotar o no — la clave vieja ya no funciona.

**Pasos:** <https://aistudio.google.com/apikey> → *Create API key* → pégala en Vercel
como `GEMINI_API_KEY` (Production y Preview) y en tu `.env.local`. Es gratis.

Mientras no exista, el chat ya no muestra un «error de conexión» sin salida: ahora
responde con el teléfono de la oficina principal y el WhatsApp, para no perder la
consulta.

---

## 6. Meta Events Manager — comprobar que el dedup funciona

El sitio envía las conversiones dos veces a propósito (desde el navegador y desde el
servidor) con el mismo `event_id` para que Meta las una. Que el mecanismo es correcto lo
verifiqué en el código; que Meta las está uniendo **solo se ve en su panel**.

**Pasos:** Events Manager → dataset `1679590710105917` → *Overview*. Si en «Event
Deduplication» aparecen eventos duplicados sin unir, dímelo con una captura y lo ajusto.
Comprueba también que no haya un `test_event_code` activo en producción: etiquetaría todo
el tráfico real como prueba y desaparecería de los informes (el código ya lo protege,
pero conviene mirarlo).

---

## 7. Bing Webmaster Tools — barato de añadir

Bing sí usa el atributo `lang` del HTML (Google apenas), y es el buscador que alimenta a
ChatGPT y Copilot. Se puede importar la propiedad desde Search Console con un clic.

**Pasos:** <https://www.bing.com/webmasters> → *Import from GSC*. Para que yo lea sus
datos: *Settings → API access → API key*, y me la pasas como `BING_WEBMASTER_API_KEY`.

---

## 8. MCP: qué serviría y qué ya hay

Preguntaste por MCP concretamente. Estado real:

- **Vercel MCP: ya conectado y funcionando.** De ahí salió el diagnóstico del chat caído.
  En cuanto habilites Web Analytics (punto 4), también me da el tráfico.
- **Windsor.ai** aparece en tu lista de conectores pero sin autenticar. Windsor agrega
  datos de Google Ads, Search Console, GA4 y Meta en un solo sitio. **Si ya lo tienes
  contratado, autenticarlo es la vía más rápida para darme GSC y GA4 de golpe**, sin
  cuentas de servicio: solo tienes que completar la autenticación cuando el conector la
  pida. Si no lo tienes, no lo contrates por esto: la opción B del punto 1 es gratis.
- **No existe MCP oficial de Google Search Console ni de GA4.** Hay servidores
  comunitarios, pero para un sitio en producción prefiero la cuenta de servicio: es
  auditable, revocable y no mete un tercero entre tus datos y el análisis.
- **Nova MCP (BOS)** ya está disponible y me deja leer leads y casos. Útil para cerrar el
  círculo: comparar los leads que BOS recibe con las conversiones que el sitio registra,
  y detectar pérdidas o atribuciones mal asignadas. Dime si quieres que lo haga.

---

## 9. Datos de negocio que solo tú tienes

Ninguno requiere accesos técnicos, solo una respuesta:

| Dato | Por qué lo necesito |
|---|---|
| **Años de experiencia: ¿34, 35+ o 30+?** | El sitio dice «35+» en decenas de páginas, la bio de Manuel Solís dice «30+» y «casi tres décadas». En un sitio legal la incoherencia resta credibilidad y es lo primero que ve un cliente. |
| **¿«50.000+ casos ganados» tiene respaldo auditable?** | Aparece en la portada y en las 25 landings. Si no hay registro que lo sostenga, conviene suavizarlo: es el tipo de cifra que las reglas de publicidad de abogados de Texas miran con lupa. |
| **Share-link real de la ficha de Google de Memphis** | Hay 4 `TODO(GBP)` esperándolo. Hoy usa una búsqueda de Maps con la dirección correcta, que funciona pero no es la ficha. |
| **¿Edward S. Reisman sigue en el despacho?** | Su perfil está en los datos pero una redirección lo trata como dado de baja. Una de las dos cosas está mal. |
| **La pregunta 128 del examen de civismo** | El banco tiene 127 únicas y una duplicada. No la inventé: cópiala de la lista oficial de USCIS. |
| **Horario real de las 5 direcciones virtuales** | Ya dicen «con cita previa», que es lo que documenta el repo. Si el modo de atención es otro, corrígeme. |
| **Fotos propias de las oficinas** | Varias reutilizan la misma imagen del edificio de Navigation Blvd. |

---

## Orden que te recomiendo

1. **Clave de Gemini** (punto 5): el chat está caído ahora mismo.
2. **Habilitar Vercel Web Analytics** (punto 4): un clic, y me da datos de tráfico.
3. **Verificar Search Console** (punto 1, opción A): 5 minutos, y desbloquea el análisis
   que de verdad falta.
4. **Cuenta de servicio para GSC + GA4** (puntos 1B y 2): media hora, y a partir de ahí
   puedo medir sin pedirte nada más.
5. El resto, cuando quieras.
