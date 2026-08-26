# Taxonomía UTM — manuelsolis.com

> Documento canónico. Cualquier enlace que apunte al sitio desde fuera **debe** seguir estas reglas, o vivirá en `(direct) / (none)` y romperá la atribución.

## Regla cero

- **Siempre minúsculas, sin acentos, sin espacios, sin emojis.** `kebab-case` para todo.
- GA4 distingue `Facebook` ≠ `facebook` ≠ `FACEBOOK`. No nos cuesta nada estandarizar y nos ahorra horas de limpieza.
- Si un parámetro no aplica, **omítelo**. No pongas `utm_term=na` ni `utm_content=none`.

## Parámetros

### `utm_source` — origen literal

| Valor                | Cuándo                                                       |
| -------------------- | ------------------------------------------------------------ |
| `newsletter`         | Cualquier email saliente del newsletter                      |
| `instagram`          | Link en bio, posts orgánicos, stories, reels                 |
| `facebook`           | Posts orgánicos, página de FB                                |
| `tiktok`             | Bio, descripciones, videos orgánicos                         |
| `youtube`            | Descripciones de videos, end-screens                         |
| `gbp`                | Google Business Profile (perfil de empresa)                  |
| `whatsapp`           | CTAs salientes desde WhatsApp Business                       |
| `google-ads`         | Anuncios Google. UTMs **obligatorias** (ver «Regla de paid») |
| `meta-ads`           | Anuncios Facebook + Instagram pagados                        |
| `tiktok-ads`         | Anuncios TikTok pagados                                      |
| `qr-flyer`           | QR impreso en flyer                                          |
| `qr-tarjeta`         | QR en tarjeta de presentación                                |
| `partner-<nombre>`   | Sitio de un partner que enlaza al nuestro                    |

### `utm_medium` — canal abstracto

| Valor             | Significado                          |
| ----------------- | ------------------------------------ |
| `email`           | Email (newsletter, transaccional)    |
| `social`          | Orgánico en redes sociales           |
| `cpc`             | Paid search (Google Ads, Bing)       |
| `paid-social`     | Paid en redes (Meta Ads, TikTok Ads) |
| `qr`              | Código QR físico                     |
| `referral`        | Partner o sitio externo no pagado    |
| `messaging`       | WhatsApp / SMS                       |

### `utm_campaign` — slug de iniciativa

- Formato: `<tema>-<fecha-corta>` o `<tema>-<segmento>`.
- Ejemplos: `vawa-mayo-2026`, `serie-asilo-houston-q2`, `black-friday-2026`, `seo-evergreen`.
- Una campaña vive en **varios canales**. Misma campaña → mismo slug, sin importar si va por email o por Instagram.

### `utm_content` — variante creativa

- Para A/B y para distinguir DÓNDE dentro del mismo email/post salió el click.
- Ejemplos: `hero-cta`, `footer-link`, `post-carrusel-3`, `boton-amarillo`, `boton-azul`.

### `utm_term` — solo para paid search

- Palabra clave o segmento que disparó el anuncio.
- En orgánico **no usar**.

## Regla de paid: el auto-tagging NO basta

El auto-tagging de Google Ads (`gclid`) y el de Meta (`fbclid`) sirven para que
*esas plataformas* reconozcan su propio clic. **No sirven para atribuir dentro
de este sitio**, porque `readTouchFromUrl()` no deriva origen de un click ID.
Una campaña que sale solo con auto-tagging produce este cuadro:

| Sistema     | Qué reporta esa visita          |
| ----------- | ------------------------------- |
| Google Ads  | conversión propia (vía `gclid`) |
| CallRail    | Google Paid (parsea el `gclid`) |
| Sitio → BOS | tráfico del sitio / orgánico    |

Tres sistemas, tres respuestas, y la discusión la gana quien enseñe el número
que más le convenga. Por eso: **auto-tagging ON y UTMs explícitas encima**, en
todos los canales pagados. Con las dos cosas, los tres sistemas coinciden.

Plantillas listas para pegar (los `{...}` y `{{...}}` los rellena la plataforma):

```
# Google Ads — plantilla de seguimiento a nivel de cuenta
{lpurl}?utm_source=google-ads&utm_medium=cpc&utm_campaign={_campaign}
  &utm_content={creative}&utm_term={keyword}

# Meta Ads — parámetros de URL del anuncio
utm_source=meta-ads&utm_medium=paid-social&utm_campaign={{campaign.name}}
  &utm_content={{ad.name}}

# TikTok Ads
utm_source=tiktok-ads&utm_medium=paid-social&utm_campaign=__CAMPAIGN_NAME__
  &utm_content=__CID_NAME__
```

`utm_campaign` debe salir del vocabulario de este documento, no del nombre
interno que use la agencia. Si el nombre de campaña de la plataforma no sigue
la taxonomía, se pone un `utm_campaign` fijo por iniciativa y el nombre de la
plataforma se queda en `utm_content`.

**No mezclar `google` con `google-ads`.** `google` orgánico no lleva UTMs
(llega sin parámetros); `google-ads` siempre las lleva. Y el perfil de empresa
es `gbp`, nunca `google`: si Google Business Profile viaja como `google`, el
tráfico del perfil —que es orgánico local y no lo paga nadie— acaba en el
mismo cubo que la campaña pagada. Los short-links `gbp-*` existen exactamente
para eso.

## Medición de llamadas (CallRail)

Las llamadas se atribuyen en un sistema aparte, con su propio modelo. Antes de
comparar cifras con GA4 o BOS, leer `docs/CALLRAIL-ATRIBUCION.md`: documenta la
configuración real de la cuenta y por qué los números no cuadran solos.

## Catálogo de short-links (`/go/<slug>`)

En vez de pegar URLs largas, usar los slugs canónicos. El router en `app/go/[slug]/route.ts` resuelve a la URL final con UTMs inyectados.

Ver `app/lib/shortLinks.ts` para la fuente de verdad. Para añadir un nuevo slug, edita ese archivo y abre PR.

Ejemplos de uso:

```
manuelsolis.com/go/newsletter-mayo-vawa
  → /es/vawa-houston?utm_source=newsletter&utm_medium=email
    &utm_campaign=vawa-mayo-2026&utm_content=hero-cta

manuelsolis.com/go/ig-bio
  → /es?utm_source=instagram&utm_medium=social
    &utm_campaign=organic-bio&utm_content=bio-link
```

## Higiene en GA4 (configuración externa)

En **GA4 → Admin → Data Streams → Configure tag settings**:

1. **List unwanted referrals**: agregar
   - `manuelsolis.com`
   - `www.manuelsolis.com`
   - `bos.manuelsolis.com`
   - `accounts.google.com`
   - Dominios de pasarela de pago (Stripe, etc.) si aplica.
2. En **Google Ads → Configuración de cuenta → Auto-tagging** → ON, **y además** la plantilla de seguimiento con UTMs de la «Regla de paid». El auto-tagging arregla GA4; las UTMs son las que hacen que el sitio y BOS también lo vean como paid.
3. En **Meta Ads / TikTok Ads**, exigir `utm_*` manuales en cada creativo. No confiar en `fbclid`/`ttclid` solamente.

## Flow de atribución implementado en el sitio

1. Visitante llega con `?utm_source=newsletter&utm_medium=email&...`.
2. `AttributionCapture` (montado en layout) lee los `utm_*` / click IDs del URL y los persiste en cookie `msl_attr`:
   - **first_touch**: se escribe **una sola vez** (90 días). Es el origen que se le acredita al lead cuando convierte.
   - **last_touch**: se reescribe cada vez que llega otro touch. Es el último canal antes de la conversión.
   - Se captura con que venga **`utm_source`** (el `utm_medium` es opcional → default `none`).
   - Si NO hay `utm_*` pero sí `gclid`/`fbclid`: **no se sintetiza origen**. El click ID se persiste en la cookie para que sobreviva la navegación interna, pero el touch se registra como tráfico del sitio. Esta es la decisión del equipo del 2026-07-24 y está implementada en `readTouchFromUrl()` (`app/lib/attribution.ts`): solo las UTMs explícitas de la URL cuentan como origen. Tampoco se deriva origen del referrer.
     > Este documento afirmaba lo contrario (`gclid → google / cpc`) hasta el 2026-08-26. Era la versión anterior del código y es la razón por la que conviene leer la «Regla de paid» antes de lanzar: si una campaña sale solo con auto-tagging, **su tráfico se reporta como tráfico del sitio, no como paid**.
3. Las conversiones (`fireConversion`) y el formulario de contacto leen prioridad:
   `URL actual > last_touch cookie > first_touch cookie > 'direct' / 'none'`
4. El payload al ledger / BOS incluye `firstTouchSource/Medium/Campaign` y los `gclid/fbclid` recuperados, para que en el dashboard veas qué campaña generó el lead original, no la última.
