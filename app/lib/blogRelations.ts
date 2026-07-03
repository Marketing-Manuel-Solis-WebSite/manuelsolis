// Cross-linking map for blog posts — defines related articles for each post
// This improves internal linking and topical authority signals

// --- Service link mapping: connects each blog post to its relevant service page ---
import { BLOG_DATA } from '../[lang]/blog/page';

export interface ServiceLink {
  path: string;
  label: { es: string; en: string };
}

const blogServiceMap: Record<string, ServiceLink> = {
  // Visa U cluster → /servicios/visa-u
  'permiso-de-trabajo-visa-u': { path: '/servicios/visa-u', label: { es: 'Servicios de Visa U', en: 'U Visa Services' } },
  'que-hacer-si-la-policia-no-firma-la-certificacion-visa-u': { path: '/servicios/visa-u', label: { es: 'Servicios de Visa U', en: 'U Visa Services' } },
  'perdon-i-192-como-arreglar-con-la-visa-u-si-tienes-deportaciones-previas': { path: '/servicios/visa-u', label: { es: 'Servicios de Visa U', en: 'U Visa Services' } },
  'visa-u-y-vawa-incluir-hijos-y-nuevos-esposos-derivados': { path: '/servicios/visa-u', label: { es: 'Servicios de Visa U y VAWA', en: 'U Visa & VAWA Services' } },
  // VAWA cluster → /servicios/vawa
  'vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente': { path: '/servicios/vawa', label: { es: 'Servicios VAWA', en: 'VAWA Services' } },
  'vawa-para-padres-maltrato-de-hijos-ciudadanos-estadounidenses': { path: '/servicios/vawa', label: { es: 'Servicios VAWA', en: 'VAWA Services' } },
  // Deportation cluster → /servicios/defensa-deportacion
  'frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria': { path: '/servicios/defensa-deportacion', label: { es: 'Defensa de Deportación', en: 'Deportation Defense' } },
  'ley-de-los-10-anos-cancelacion-de-deportacion': { path: '/servicios/defensa-deportacion', label: { es: 'Defensa de Deportación', en: 'Deportation Defense' } },
  // Humanitarian (general)
  'visa-t-trabajo-forzado-por-deuda-con-coyote': { path: '/servicios/inmigracion', label: { es: 'Alivio Humanitario e Inmigración', en: 'Humanitarian Relief & Immigration' } },
  // Asylum cluster → /servicios/asilo
  'asilo-frontera-2026-puerto-entrada-vs-cruce': { path: '/servicios/asilo', label: { es: 'Servicios de Asilo', en: 'Asylum Services' } },
  'estatus-juvenil-sijs-residencia-jovenes-abandonados': { path: '/servicios/asilo', label: { es: 'Asilo y Estatus Juvenil', en: 'Asylum & Juvenile Status' } },
  // Process cluster
  'advance-parole-2026-viajar-con-daca-tps-visa-u': { path: '/servicios/inmigracion', label: { es: 'Servicios de Inmigración', en: 'Immigration Services' } },
  'formulario-g28-cambiar-abogado-inmigracion': { path: '/servicios/inmigracion', label: { es: 'Servicios de Inmigración', en: 'Immigration Services' } },
  'residencia-laboral-eb3-ley-245i-entrada-indocumentada': { path: '/servicios/inmigracion', label: { es: 'Residencia y Visas de Trabajo', en: 'Residency & Work Visas' } },
  'foia-migratoria-pedir-record-antes-de-aplicar': { path: '/servicios/inmigracion', label: { es: 'Servicios de Inmigración', en: 'Immigration Services' } },
  'perdon-i601a-arreglar-papeles-entrada-ilegal': { path: '/servicios/inmigracion', label: { es: 'Perdones Migratorios', en: 'Immigration Waivers' } },
  'marihuana-dui-buen-caracter-moral-inmigracion': { path: '/servicios/ley-criminal', label: { es: 'Defensa Criminal e Inmigración', en: 'Criminal Defense & Immigration' } },
  'ciudadania-en-espanol-reglas-50-20-55-15': { path: '/servicios/inmigracion', label: { es: 'Servicios de Ciudadanía', en: 'Citizenship Services' } },
  'entrevista-matrimonio-uscis-senales-alerta': { path: '/servicios/familia', label: { es: 'Derecho Familiar e Inmigración', en: 'Family Law & Immigration' } },
  // New blogs
  'tps-2026-paises-elegibles-renovacion': { path: '/servicios/inmigracion', label: { es: 'Servicios de Inmigración', en: 'Immigration Services' } },
  'crimenes-deportacion-vileza-moral': { path: '/servicios/ley-criminal', label: { es: 'Defensa Criminal e Inmigración', en: 'Criminal Defense & Immigration' } },
  'rfe-responder-evidencia-uscis': { path: '/servicios/inmigracion', label: { es: 'Servicios de Inmigración', en: 'Immigration Services' } },
  'barras-3-10-anos-presencia-ilegal': { path: '/servicios/inmigracion', label: { es: 'Perdones Migratorios', en: 'Immigration Waivers' } },
  'accidente-auto-indocumentado-derechos': { path: '/servicios/accidentes', label: { es: 'Accidentes y Lesiones', en: 'Accidents & Injuries' } },
  'i-864-patrocinador-ingreso-minimo': { path: '/servicios/inmigracion', label: { es: 'Servicios de Inmigración', en: 'Immigration Services' } },
  'visa-k1-prometido-requisitos': { path: '/servicios/inmigracion', label: { es: 'Servicios de Inmigración', en: 'Immigration Services' } },
  'entrevista-inmigracion-errores-evitar': { path: '/servicios/inmigracion', label: { es: 'Servicios de Inmigración', en: 'Immigration Services' } },
  'familias-estatus-mixto-opciones': { path: '/servicios/familia', label: { es: 'Derecho Familiar e Inmigración', en: 'Family Law & Immigration' } },
  'fraude-notarios-inmigracion': { path: '/servicios/inmigracion', label: { es: 'Servicios de Inmigración', en: 'Immigration Services' } },
  'daca-2026-estado-legal-tribunales': { path: '/servicios/inmigracion', label: { es: 'Servicios DACA e Inmigración', en: 'DACA & Immigration Services' } },
  // Blogs julio 2026
  'redadas-ice-2026-derechos-plan-emergencia-familiar': { path: '/servicios/defensa-deportacion', label: { es: 'Defensa de Deportación', en: 'Deportation Defense' } },
  'como-encontrar-detenido-ice-localizador-pasos': { path: '/servicios/defensa-deportacion', label: { es: 'Defensa de Deportación y Detenidos', en: 'Deportation Defense & Detained Clients' } },
  'ciudadania-por-nacimiento-2026-hijos-padres-indocumentados': { path: '/servicios/inmigracion', label: { es: 'Servicios de Inmigración', en: 'Immigration Services' } },
  'accidente-trabajo-indocumentado-texas-compensacion': { path: '/servicios/accidentes', label: { es: 'Accidentes y Lesiones', en: 'Accidents & Injuries' } },
  'accidente-camion-18-ruedas-texas-compensacion': { path: '/servicios/accidentes', label: { es: 'Accidentes y Lesiones', en: 'Accidents & Injuries' } },
};

const defaultServiceLink: ServiceLink = {
  path: '/servicios/inmigracion',
  label: { es: 'Servicios de Inmigración', en: 'Immigration Services' },
};

/** Get the service page link for a given blog post slug */
export function getServiceLink(slug: string): ServiceLink {
  return blogServiceMap[slug] || defaultServiceLink;
}

export interface RelatedArticle {
  title: { es: string; en: string };
  slug: string;
  image: string;
  category: { es: string; en: string };
}

// Maps attorney IDs to blog post slugs they authored
export const authorArticleMap: Record<string, string[]> = {
  'manuel-solis': [
    'ciudadania-por-nacimiento-2026-hijos-padres-indocumentados',
    'redadas-ice-2026-derechos-plan-emergencia-familiar',
    'como-encontrar-detenido-ice-localizador-pasos',
    'accidente-trabajo-indocumentado-texas-compensacion',
    'accidente-camion-18-ruedas-texas-compensacion',
    'daca-2026-estado-legal-tribunales',
    'tps-2026-paises-elegibles-renovacion',
    'crimenes-deportacion-vileza-moral',
    'rfe-responder-evidencia-uscis',
    'barras-3-10-anos-presencia-ilegal',
    'accidente-auto-indocumentado-derechos',
    'i-864-patrocinador-ingreso-minimo',
    'visa-k1-prometido-requisitos',
    'entrevista-inmigracion-errores-evitar',
    'familias-estatus-mixto-opciones',
    'fraude-notarios-inmigracion',
    'asilo-frontera-2026-puerto-entrada-vs-cruce',
    'entrevista-matrimonio-uscis-senales-alerta',
    'ciudadania-en-espanol-reglas-50-20-55-15',
    'marihuana-dui-buen-caracter-moral-inmigracion',
    'perdon-i601a-arreglar-papeles-entrada-ilegal',
    'estatus-juvenil-sijs-residencia-jovenes-abandonados',
    'foia-migratoria-pedir-record-antes-de-aplicar',
    'residencia-laboral-eb3-ley-245i-entrada-indocumentada',
    'advance-parole-2026-viajar-con-daca-tps-visa-u',
    'ley-de-los-10-anos-cancelacion-de-deportacion',
    'visa-u-y-vawa-incluir-hijos-y-nuevos-esposos-derivados',
    'formulario-g28-cambiar-abogado-inmigracion',
    'frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria',
    'visa-t-trabajo-forzado-por-deuda-con-coyote',
    'vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente',
    'vawa-para-padres-maltrato-de-hijos-ciudadanos-estadounidenses',
    'perdon-i-192-como-arreglar-con-la-visa-u-si-tienes-deportaciones-previas',
    'que-hacer-si-la-policia-no-firma-la-certificacion-visa-u',
    'permiso-de-trabajo-visa-u',
  ],
};

/** Get articles authored by a specific attorney (by attorney ID) */
export function getArticlesByAuthor(attorneyId: string, lang: 'es' | 'en'): { title: string; slug: string; image: string; category: string }[] {
  const slugs = authorArticleMap[attorneyId];
  if (!slugs) return [];
  return slugs
    .filter(slug => allArticles[slug])
    .map(slug => {
      const article = allArticles[slug];
      return {
        title: article.title[lang],
        slug: article.slug,
        image: article.image,
        category: article.category[lang],
      };
    });
}

// Derivado de BLOG_DATA (fuente única): título, imagen y categoría reales de
// cada post — antes era un mapa manual que se desincronizaba (imágenes
// genéricas /home-image.jpg y /blog/visa-u.png en 19 posts).
const allArticles: Record<string, RelatedArticle> = Object.fromEntries(
  BLOG_DATA.posts.map((p) => [
    p.slug,
    { title: p.title, slug: p.slug, image: p.image, category: p.category },
  ])
);

// Topical clusters for cross-linking
const clusters: Record<string, string[]> = {
  visa_u: [
    'permiso-de-trabajo-visa-u',
    'que-hacer-si-la-policia-no-firma-la-certificacion-visa-u',
    'perdon-i-192-como-arreglar-con-la-visa-u-si-tienes-deportaciones-previas',
    'visa-u-y-vawa-incluir-hijos-y-nuevos-esposos-derivados',
    'frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria',
  ],
  vawa: [
    'vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente',
    'vawa-para-padres-maltrato-de-hijos-ciudadanos-estadounidenses',
    'visa-u-y-vawa-incluir-hijos-y-nuevos-esposos-derivados',
  ],
  deportation: [
    'redadas-ice-2026-derechos-plan-emergencia-familiar',
    'como-encontrar-detenido-ice-localizador-pasos',
    'ley-de-los-10-anos-cancelacion-de-deportacion',
    'frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria',
    'advance-parole-2026-viajar-con-daca-tps-visa-u',
    'marihuana-dui-buen-caracter-moral-inmigracion',
    'crimenes-deportacion-vileza-moral',
    'barras-3-10-anos-presencia-ilegal',
    'daca-2026-estado-legal-tribunales',
  ],
  process: [
    'ciudadania-por-nacimiento-2026-hijos-padres-indocumentados',
    'formulario-g28-cambiar-abogado-inmigracion',
    'residencia-laboral-eb3-ley-245i-entrada-indocumentada',
    'foia-migratoria-pedir-record-antes-de-aplicar',
    'advance-parole-2026-viajar-con-daca-tps-visa-u',
    'perdon-i601a-arreglar-papeles-entrada-ilegal',
    'ciudadania-en-espanol-reglas-50-20-55-15',
    'entrevista-matrimonio-uscis-senales-alerta',
    'tps-2026-paises-elegibles-renovacion',
    'rfe-responder-evidencia-uscis',
    'i-864-patrocinador-ingreso-minimo',
    'visa-k1-prometido-requisitos',
    'entrevista-inmigracion-errores-evitar',
    'fraude-notarios-inmigracion',
    'daca-2026-estado-legal-tribunales',
  ],
  daca_tps: [
    'daca-2026-estado-legal-tribunales',
    'tps-2026-paises-elegibles-renovacion',
    'advance-parole-2026-viajar-con-daca-tps-visa-u',
  ],
  humanitarian: [
    'visa-t-trabajo-forzado-por-deuda-con-coyote',
    'frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria',
    'vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente',
    'vawa-para-padres-maltrato-de-hijos-ciudadanos-estadounidenses',
    'estatus-juvenil-sijs-residencia-jovenes-abandonados',
    'asilo-frontera-2026-puerto-entrada-vs-cruce',
    'tps-2026-paises-elegibles-renovacion',
  ],
  family_marriage: [
    'entrevista-matrimonio-uscis-senales-alerta',
    'perdon-i601a-arreglar-papeles-entrada-ilegal',
    'ciudadania-en-espanol-reglas-50-20-55-15',
    'i-864-patrocinador-ingreso-minimo',
    'visa-k1-prometido-requisitos',
    'familias-estatus-mixto-opciones',
    'entrevista-inmigracion-errores-evitar',
  ],
  accidents: [
    'accidente-trabajo-indocumentado-texas-compensacion',
    'accidente-camion-18-ruedas-texas-compensacion',
    'accidente-auto-indocumentado-derechos',
  ],
  juvenile_asylum: [
    'estatus-juvenil-sijs-residencia-jovenes-abandonados',
    'asilo-frontera-2026-puerto-entrada-vs-cruce',
    'frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria',
  ],
};

/**
 * Get 3 related articles for a given blog slug.
 * Finds articles in the same cluster, excluding the current one.
 */
export function getRelatedArticles(currentSlug: string, lang: 'es' | 'en'): { title: string; slug: string; image: string; category: string }[] {
  const related = new Set<string>();

  // Find clusters this post belongs to
  for (const clusterSlugs of Object.values(clusters)) {
    if (clusterSlugs.includes(currentSlug)) {
      for (const slug of clusterSlugs) {
        if (slug !== currentSlug) related.add(slug);
      }
    }
  }

  // If less than 3, add from other clusters
  if (related.size < 3) {
    for (const slug of Object.keys(allArticles)) {
      if (slug !== currentSlug && !related.has(slug)) {
        related.add(slug);
        if (related.size >= 3) break;
      }
    }
  }

  return Array.from(related).slice(0, 3).map(slug => {
    const article = allArticles[slug];
    return {
      title: article.title[lang],
      slug: article.slug,
      image: article.image,
      category: article.category[lang],
    };
  });
}
