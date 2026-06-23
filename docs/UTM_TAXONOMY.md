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
| `google-ads`         | Anuncios Google (idealmente usar **auto-tagging** + `gclid`) |
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
2. En **Google Ads → Configuración de cuenta → Auto-tagging** → ON. Resuelve la mayoría del "referral desconocido" cuando viene de Ads.
3. En **Meta Ads / TikTok Ads**, exigir `utm_*` manuales en cada creativo. No confiar en `fbclid`/`ttclid` solamente.

## Flow de atribución implementado en el sitio

1. Visitante llega con `?utm_source=newsletter&utm_medium=email&...`.
2. `AttributionCapture` (montado en layout) lee los `utm_*` / click IDs del URL y los persiste en cookie `msl_attr`:
   - **first_touch**: se escribe **una sola vez** (90 días). Es el origen que se le acredita al lead cuando convierte.
   - **last_touch**: se reescribe cada vez que llega otro touch. Es el último canal antes de la conversión.
   - Se captura con que venga **`utm_source`** (el `utm_medium` es opcional → default `none`).
   - Si NO hay `utm_*` pero sí `gclid` → se sintetiza `google / cpc`; si hay `fbclid` → `facebook / social`. El click ID (`gclid`/`fbclid`) se persiste en la cookie para que sobreviva la navegación interna.
3. Las conversiones (`fireConversion`) y el formulario de contacto leen prioridad:
   `URL actual > last_touch cookie > first_touch cookie > 'direct' / 'none'`
4. El payload al ledger / BOS incluye `firstTouchSource/Medium/Campaign` y los `gclid/fbclid` recuperados, para que en el dashboard veas qué campaña generó el lead original, no la última.
