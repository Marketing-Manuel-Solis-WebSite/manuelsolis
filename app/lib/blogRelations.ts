// Cross-linking map for blog posts — defines related articles for each post
// This improves internal linking and topical authority signals

import { BLOG_DATA } from '../[lang]/blog/page';

// --- Service link mapping: connects each blog post to its relevant service page ---
// El mapa vive en components/blogs/blogServiceLinks.ts (módulo hoja) porque lo
// consume RelatedContent, un island de cliente: importarlo desde aquí le
// arrastraría BLOG_DATA al bundle. Se reexporta para el código de servidor.
export type { ServiceLink } from '../components/blogs/blogServiceLinks';
export { findServiceLink, getServiceLink } from '../components/blogs/blogServiceLinks';

export interface RelatedArticle {
  title: { es: string; en: string };
  slug: string;
  image: string;
  category: { es: string; en: string };
}

// Maps attorney IDs to blog post slugs they authored
export const authorArticleMap: Record<string, string[]> = {
  'manuel-solis': [
    'registro-obligatorio-extranjeros-g325r-2026',
    'audiencia-fianza-90-dias-quinto-circuito-texas-2026',
    'tarifa-anual-asilo-100-dolares-regla-2026',
    'arrestos-ice-corte-inmigracion-fallo-2026',
    'green-card-detenido-aeropuerto-viajar-2026',
    'golpe-de-calor-trabajo-texas-derechos',
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
    'audiencia-fianza-90-dias-quinto-circuito-texas-2026',
    'arrestos-ice-corte-inmigracion-fallo-2026',
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
    'registro-obligatorio-extranjeros-g325r-2026',
    'green-card-detenido-aeropuerto-viajar-2026',
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
    'tarifa-anual-asilo-100-dolares-regla-2026',
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
    'golpe-de-calor-trabajo-texas-derechos',
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
