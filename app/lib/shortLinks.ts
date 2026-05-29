/**
 * Registry de short-links `/go/<slug>` con UTMs canónicos.
 *
 * El router en `app/go/[slug]/route.ts` resuelve cada slug a su destino
 * con los `utm_*` ya inyectados, registra el click en el ledger propio
 * (Flight Check) y emite un 302 al destino final.
 *
 * Cómo añadir un nuevo slug:
 *   1. Editar `SHORT_LINKS` aquí abajo.
 *   2. Respetar la taxonomía documentada en `docs/UTM_TAXONOMY.md`
 *      (minúsculas, kebab-case, sin acentos).
 *   3. Probar local: `/go/<slug>` debe redirigir y aparecer en
 *      `/es/admin/analytics` como page_view con source/medium/campaign.
 *
 * Nota deliberada: la fuente de verdad vive en el repo (no en una BD).
 * Esto da dos ventajas: cambios revisables por PR y cero dependencia
 * runtime para el path crítico de tracking. Si en el futuro se quiere
 * self-serve, este módulo expone `resolveSlug()` para que un loader
 * que lea de Supabase mantenga la misma interfaz.
 */
export interface ShortLinkUtm {
  source: string;
  medium: string;
  campaign?: string;
  content?: string;
  term?: string;
}

export interface ShortLink {
  /** Slug accesible vía `/go/<slug>`. Minúsculas, kebab-case. */
  slug: string;
  /**
   * Destino final. Puede ser:
   *   - Path relativo del propio sitio: `/es/vawa-houston`
   *   - URL absoluta a otro dominio nuestro (raro)
   * Si es relativa, se resuelve contra el host del request.
   */
  destination: string;
  /** UTMs canónicos. `source` y `medium` son obligatorios. */
  utm: ShortLinkUtm;
  /** Descripción humana para el catálogo del admin. */
  notes?: string;
}

/**
 * Catálogo inicial. Cada entrada es una decisión: qué canal, qué
 * campaña, qué pieza creativa. Si tienes que pensar dos veces el
 * `utm_campaign`, revisa la taxonomía antes de inventar uno nuevo.
 */
export const SHORT_LINKS: readonly ShortLink[] = [
  // ─── Redes sociales orgánicas ───
  {
    slug: 'ig-bio',
    destination: '/es',
    utm: {
      source: 'instagram',
      medium: 'social',
      campaign: 'organic-bio',
      content: 'bio-link',
    },
    notes: 'Link único en la bio de Instagram',
  },
  {
    slug: 'fb-bio',
    destination: '/es',
    utm: {
      source: 'facebook',
      medium: 'social',
      campaign: 'organic-bio',
      content: 'bio-link',
    },
    notes: 'Link en la página de Facebook',
  },
  {
    slug: 'tiktok-bio',
    destination: '/es',
    utm: {
      source: 'tiktok',
      medium: 'social',
      campaign: 'organic-bio',
      content: 'bio-link',
    },
    notes: 'Link único en la bio de TikTok',
  },
  {
    slug: 'youtube-desc',
    destination: '/es',
    utm: {
      source: 'youtube',
      medium: 'social',
      campaign: 'organic-desc',
      content: 'video-description',
    },
    notes: 'Para pegar en descripciones de videos de YouTube',
  },

  // ─── Google Business Profile ───
  {
    slug: 'gbp-houston',
    destination: '/es/abogado-inmigracion-houston',
    utm: {
      source: 'gbp',
      medium: 'referral',
      campaign: 'gbp-houston',
      content: 'website-button',
    },
    notes: 'Botón "Sitio web" del perfil de Google Houston',
  },
  {
    slug: 'gbp-dallas',
    destination: '/es/abogado-inmigracion-dallas',
    utm: {
      source: 'gbp',
      medium: 'referral',
      campaign: 'gbp-dallas',
      content: 'website-button',
    },
    notes: 'Botón "Sitio web" del perfil de Google Dallas',
  },

  // ─── WhatsApp ───
  {
    slug: 'wa-consulta',
    destination: '/es/consulta',
    utm: {
      source: 'whatsapp',
      medium: 'messaging',
      campaign: 'wa-consulta-cta',
      content: 'wa-business-cta',
    },
    notes: 'CTA saliente desde WhatsApp Business hacia consulta',
  },

  // ─── Newsletter (template — duplicar por envío) ───
  {
    slug: 'newsletter-mayo-vawa',
    destination: '/es/vawa-houston',
    utm: {
      source: 'newsletter',
      medium: 'email',
      campaign: 'vawa-mayo-2026',
      content: 'hero-cta',
    },
    notes: 'Newsletter mayo 2026 — bloque hero VAWA Houston',
  },
  {
    slug: 'newsletter-mayo-vawa-footer',
    destination: '/es/vawa-houston',
    utm: {
      source: 'newsletter',
      medium: 'email',
      campaign: 'vawa-mayo-2026',
      content: 'footer-link',
    },
    notes: 'Newsletter mayo 2026 — link de footer VAWA Houston',
  },

  // ─── QR codes físicos ───
  {
    slug: 'qr-tarjeta-manuel',
    destination: '/es/consulta',
    utm: {
      source: 'qr-tarjeta',
      medium: 'qr',
      campaign: 'tarjeta-manuel',
      content: 'qr-back',
    },
    notes: 'QR en tarjeta de presentación del Lic. Manuel Solis',
  },
] as const;

const SLUG_MAP = new Map<string, ShortLink>(
  SHORT_LINKS.map((link) => [link.slug.toLowerCase(), link]),
);

/**
 * Devuelve la entrada de short-link para un slug (case-insensitive)
 * o `null` si no existe. La búsqueda es O(1).
 */
export function resolveSlug(slug: string): ShortLink | null {
  if (!slug) return null;
  return SLUG_MAP.get(slug.toLowerCase()) ?? null;
}

/**
 * Construye la URL final a la que debe ir el visitante:
 *   destino + utm_* canónicos (preservando query existente del destino).
 *
 * `origin` se usa cuando `destination` es relativa.
 *
 * Diseño: si el destino YA trae un `utm_*` (por ejemplo porque alguien
 * editó la entrada del registry pegando una URL con query), el de la
 * entrada del registry GANA. Es lo que el equipo de marketing espera —
 * el registry es la fuente de verdad de la atribución.
 */
export function buildTrackedUrl(link: ShortLink, origin: string): string {
  let url: URL;
  try {
    url = new URL(link.destination, origin);
  } catch {
    // Fallback defensivo: si la destination está rota, mandamos al home
    // del propio sitio sin perder la atribución.
    url = new URL('/', origin);
  }

  url.searchParams.set('utm_source', link.utm.source);
  url.searchParams.set('utm_medium', link.utm.medium);
  if (link.utm.campaign) url.searchParams.set('utm_campaign', link.utm.campaign);
  if (link.utm.content) url.searchParams.set('utm_content', link.utm.content);
  if (link.utm.term) url.searchParams.set('utm_term', link.utm.term);

  return url.toString();
}

/** Lista todos los slugs (útil para el catálogo del admin). */
export function listShortLinks(): readonly ShortLink[] {
  return SHORT_LINKS;
}
