# Variables de entorno

Inventario de las variables que el código lee, para qué sirven y qué pasa si faltan.
**Este archivo vive en un repositorio público: nunca escribas valores aquí.** Los valores
de desarrollo están en `.env.local` (ignorado por git) y los de producción en el panel de
Vercel (Settings → Environment Variables).

Última revisión: 4 de agosto de 2026.

## Obligatorias en producción

| Variable | Para qué | Si falta |
|---|---|---|
| `API_SOLIS_TOKEN` | Token que `POST /api/signup-proxy` envía como `X-Api-Token` a `solislawruler.azurewebsites.net`. Lo emite ese sistema: no se puede generar por nuestra cuenta. | El endpoint responde 500. Es el único consumidor, y no tiene llamadores dentro del sitio. |
| `BOS_API_TOKEN` | Autentica la entrega de leads al CRM. | Los leads no llegan a BOS y caen al respaldo (ver `LEAD_FALLBACK_EMAIL`). |
| `LEAD_CAPTURE_ENDPOINT` | URL destino de los leads. | Se usa el endpoint de `bos.manuelsolis.com` por defecto. |
| `RESEND_API_KEY` | Envío de todos los correos (boletín, bienvenida, respaldo de leads). | No se envía ningún correo. |
| `RESEND_AUDIENCE_ID` | Lista de suscriptores del boletín. | Las altas y bajas fallan. |
| `ANTHROPIC_API_KEY` | Modelo del asistente del sitio (`/api/chat`, Claude Haiku 4.5). | El chat no responde y ofrece el teléfono; el fallo se registra como `chat_misconfigured` o `chat_auth_failed`. |
| ~~`GEMINI_API_KEY`~~ | **Ya no se usa.** El asistente corría sobre Gemini hasta el 2026-08-05; la clave se filtró en docs commiteados y Google la revocó el 2026-06-16 por su cuenta. Ningún archivo la lee. | Ninguna: se puede borrar de Vercel. |
| `GOOGLE_PLACES_API_KEY` | Rating y reseñas en vivo de las fichas de Google. | Las páginas omiten el rating en vez de mostrar un valor fijo (comportamiento deseado). |
| `GOOGLE_SITE_VERIFICATION` | Token de verificación de propiedad de Search Console (solo el valor de `content`, no la etiqueta entera). Emite `<meta name="google-site-verification">` en las 292 páginas. | No se emite ninguna etiqueta. Verifica una propiedad de **prefijo de URL**; una propiedad de **dominio** solo se puede verificar por TXT en el DNS, que está en GoDaddy y no en Vercel. |
| `BING_SITE_VERIFICATION` | Equivalente para Bing Webmaster Tools (`msvalidate.01`). | No se emite ninguna etiqueta. |
| `NEWSLETTER_BLAST_SECRET` | Bearer de automatización de `POST /api/newsletter/blast`. **Ya no es la contraseña del panel.** | El envío masivo por API queda inaccesible. |

## Propias, generables (valores en `.env.local`)

Son secretos que el propio código valida contra sí mismo, así que se pueden generar aquí.
Todos usan `base64url` a propósito: sin `$`, que es el carácter que los archivos `.env`
expanden y el motivo por el que en su día se llegó a hardcodear un token.

Para generar uno nuevo: `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`

| Variable | Para qué | Si falta |
|---|---|---|
| `ADMIN_PASSWORD` | Contraseña del formulario de login de `/admin`. | Se usa `NEWSLETTER_BLAST_SECRET` como respaldo (el comportamiento antiguo). |
| `ADMIN_SESSION_SECRET` | Firma la cookie de sesión del panel. Rotarla cierra todas las sesiones abiertas sin tocar la contraseña ni el bearer. | Se usa `NEWSLETTER_BLAST_SECRET` como respaldo. |
| `CONVERSIONS_API_KEY` | Autentica el `GET /api/conversions` (dashboard Flight Check). Solo por cabecera `Authorization: Bearer` o `x-api-key`; en query string quedaría en logs y referrers. | El endpoint responde 401 siempre. |
| `NEWSLETTER_UNSUBSCRIBE_SECRET` | Firma los enlaces de baja del boletín. **Debe ser estable**: al cambiarla, los enlaces one-click de los correos ya enviados dejan de validar (la baja seguiría funcionando desde la página, con confirmación). | Se usa `NEWSLETTER_BLAST_SECRET` como respaldo. |

## Opcionales (activan comportamiento)

| Variable | Efecto |
|---|---|
| `LEAD_FALLBACK_EMAIL` | Activa el respaldo por correo cuando el CRM rechaza un lead tras los reintentos. Sin ella, el único rastro es el log `lead_capture_failed_final`. Acepta varios destinatarios separados por coma. |
| `LEAD_FALLBACK_FROM` | Remitente de ese respaldo. Por defecto usa el remitente ya verificado en Resend. |
| `META_CAPI_ACCESS_TOKEN` | Token de la Conversions API de Meta. Sin él no hay espejo server-side: con un bloqueador de anuncios se pierde la señal de conversión. |
| `META_DATASET_ID` | Dataset de Meta. No es secreto. Si falta se usa `NEXT_PUBLIC_META_PIXEL_ID`. |
| `META_CAPI_TEST_EVENT_CODE` | Manda los eventos a la pestaña *Test events*. **Cuidado**: en producción etiquetaría como prueba el tráfico real, que desaparecería de los datos. Está protegido por `META_CAPI_ALLOW_TEST_EVENTS`. |
| `META_CAPI_ALLOW_TEST_EVENTS` | Permite explícitamente usar el código de prueba en producción. No definirla es lo correcto. |
| `BOTID_MODE` | `report-only` (por defecto) registra los bots; `block` los rechaza con 403. **Solo bloquea si además está activo el cliente**: sin él, el fetch del navegador no lleva challenge y se rechazaría al 100% del tráfico legítimo. |
| `NEXT_PUBLIC_BOTID_CLIENT_ENABLED` | `true` inicializa BotID en el navegador. Activarlo sin haber confirmado BotID en el panel de Vercel dejó colgados el formulario y el boletín en mayo de 2026: verifícalo antes. |
| `BLAST_MAX_PER_RUN`, `BLAST_SEND_DELAY_MS` | Límite y ritmo del envío masivo. |
| `NEWSLETTER_FROM_ADDRESS` | Remitente del boletín. |
| `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | Identificadores de las tres superficies de medición. Si una falta, su script no se monta y sus eventos se descartan sin error. |
| `ANALYZE` | `true` abre el analizador de bundle en el build. |

## Nota de higiene

`.env.local` contiene una clave llamada `T` que ningún archivo del proyecto lee
(`process.env.T` no aparece en el código). Parece un valor pegado por error; conviene
revisarla y, si es un secreto real de algún servicio, tratarla como comprometida.
