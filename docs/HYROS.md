# Hyros — atribución publicitaria

Alta: 2026-10-08, a pedido del despacho. Cuenta `222869`.

## Qué hace en el sitio

El *universal script* de Hyros registra cada visita con la URL de aterrizaje
(gclid, fbclid, ttclid, UTMs), las páginas vistas y, cuando la persona escribe
nombre, correo o teléfono en el **formulario de consulta**, esos datos, para
saber qué anuncio generó la consulta.

## Cómo está instalado

| Pieza | Dónde |
|---|---|
| Carga del script (`afterInteractive`, fuera de `/admin`) | `app/components/PageViewTracker.tsx` → `id="hyros-universal"` |
| URL del script | env `NEXT_PUBLIC_HYROS_SRC` (producción). Sin ella, no se carga. |
| Validación de la URL | `app/lib/hyros.ts` (solo `https://<id>.t.hyros.com/v1/lst/universal-script`) |
| CSP | `app/lib/securityHeaders.ts`: `script-src` y `connect-src` con `https://*.t.hyros.com`; `connect-src` con `https://lg.hyr.so` |
| Campos del lead | `ContactFormClient.tsx`: clases `hyros-first-name`, `hyros-last-name`, `hyros-phone`; el correo se detecta por `type="email"` |
| Campos que NO son lead | `hyros-ignore` en el boletín (3 variantes), la baja del boletín, el panel y el campo trampa antispam |
| Política de privacidad | `app/[lang]/privacidad/PrivacidadClient.tsx`, sección 5 (A y B) y nota inicial |
| Tests | `__tests__/hyros.test.ts` |

`ref_url` se añade en el navegador (`encodeURI(document.URL)`), como el
snippet oficial. Con `spa=true` el script envuelve `history.pushState` y
registra cada navegación interna de Next sin recargarse.

Configuración de la cuenta leída del propio script (2026-10-08):
`THIRD_PARTY_TRACKING=false`, `FINGERPRINT_ENABLED=false`,
`DELETE_TRACKING_PARAMS_ENABLED=false`, `FB_EVENT_ID_RETRIEVAL=false`.
Si alguien activa el pixel de terceros o la huella de dispositivo en Hyros,
hay que añadir sus orígenes a la CSP (p. ej. `static.icexyz.com`).

## ⚠️ Antes de activar envíos a Meta / Google / TikTok desde Hyros

El sitio YA manda el `Lead` a Meta dos veces de forma deduplicada (Pixel en
el navegador + Conversions API desde el servidor, con el mismo `event_id`).
Si en Hyros se activa *Settings → Integrations → Meta → Conversions → Lead*,
Meta recibiría un tercer `Lead` del mismo envío y la cuenta de anuncios
contaría leads de más. Opciones:

1. **Recomendada:** en Hyros dejar **apagado** el envío de `Lead` y usarlo para
   lo que el sitio no manda (llamadas, ventas/contrataciones).
2. Si se quiere que Hyros mande `Lead`: activar **Event ID Collection**
   (`FB_EVENT_ID_RETRIEVAL`, hoy apagado) para que reutilice el `eventID` del
   Pixel y Meta deduplique.

Lo mismo con Google Ads: el sitio no tiene etiqueta de Ads, así que si Ads
importa conversiones de GA4, no importar además las de Hyros para el mismo
envío.

## Apagarlo

Borrar `NEXT_PUBLIC_HYROS_SRC` en Vercel (producción) y volver a desplegar.
