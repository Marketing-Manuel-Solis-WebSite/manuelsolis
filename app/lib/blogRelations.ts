// Cross-linking map for blog posts — defines related articles for each post
// This improves internal linking and topical authority signals

// --- Service link mapping: connects each blog post to its relevant service page ---
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

const allArticles: Record<string, RelatedArticle> = {
  'permiso-de-trabajo-visa-u': {
    title: { es: 'Permiso de Trabajo con Visa U (Bona Fide)', en: 'U Visa Work Permit (Bona Fide)' },
    slug: 'permiso-de-trabajo-visa-u',
    image: '/blog/visa-u.png',
    category: { es: 'Visa U', en: 'U Visa' },
  },
  'que-hacer-si-la-policia-no-firma-la-certificacion-visa-u': {
    title: { es: 'Qué hacer si la policía no firma la certificación Visa U', en: 'What to Do if Police Won\'t Sign U Visa Certification' },
    slug: 'que-hacer-si-la-policia-no-firma-la-certificacion-visa-u',
    image: '/blog/visa-u.png',
    category: { es: 'Visa U', en: 'U Visa' },
  },
  'perdon-i-192-como-arreglar-con-la-visa-u-si-tienes-deportaciones-previas': {
    title: { es: 'Perdón I-192: cómo arreglar con la Visa U si tienes deportaciones', en: 'I-192 Waiver: How to Fix Your Case with U Visa After Deportation' },
    slug: 'perdon-i-192-como-arreglar-con-la-visa-u-si-tienes-deportaciones-previas',
    image: '/blog/visa-u.png',
    category: { es: 'Visa U', en: 'U Visa' },
  },
  'visa-u-y-vawa-incluir-hijos-y-nuevos-esposos-derivados': {
    title: { es: 'Visa U y VAWA: incluir hijos y nuevos esposos derivados', en: 'U Visa & VAWA: Including Children and New Spouse Derivatives' },
    slug: 'visa-u-y-vawa-incluir-hijos-y-nuevos-esposos-derivados',
    image: '/blog/visa-u.png',
    category: { es: 'Visa U', en: 'U Visa' },
  },
  'frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria': {
    title: { es: 'Frenar deportación inminente con solicitud de Visa Humanitaria', en: 'Stop Imminent Deportation with Humanitarian Visa Request' },
    slug: 'frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria',
    image: '/blog/visa-u.png',
    category: { es: 'Alivio Humanitario', en: 'Humanitarian Relief' },
  },
  'vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente': {
    title: { es: 'VAWA para hombres maltratados por pareja ciudadana o residente', en: 'VAWA for Men Abused by Citizen or Resident Partner' },
    slug: 'vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente',
    image: '/blog/visa-u.png',
    category: { es: 'VAWA', en: 'VAWA' },
  },
  'vawa-para-padres-maltrato-de-hijos-ciudadanos-estadounidenses': {
    title: { es: 'VAWA para padres: maltrato de hijos ciudadanos estadounidenses', en: 'VAWA for Parents: Abuse by U.S. Citizen Children' },
    slug: 'vawa-para-padres-maltrato-de-hijos-ciudadanos-estadounidenses',
    image: '/blog/visa-u.png',
    category: { es: 'VAWA', en: 'VAWA' },
  },
  'visa-t-trabajo-forzado-por-deuda-con-coyote': {
    title: { es: 'Visa T: trabajo forzado por deuda con coyote', en: 'T Visa: Forced Labor Due to Smuggler Debt' },
    slug: 'visa-t-trabajo-forzado-por-deuda-con-coyote',
    image: '/blog/visa-u.png',
    category: { es: 'Visa T', en: 'T Visa' },
  },
  'ley-de-los-10-anos-cancelacion-de-deportacion': {
    title: { es: 'Ley de los 10 años: cancelación de deportación', en: '10-Year Rule: Cancellation of Removal' },
    slug: 'ley-de-los-10-anos-cancelacion-de-deportacion',
    image: '/blog/blog_11/BLOG01_CR1.png',
    category: { es: 'Defensa contra Deportación', en: 'Deportation Defense' },
  },
  'advance-parole-2026-viajar-con-daca-tps-visa-u': {
    title: { es: 'Advance Parole 2026: viajar con DACA, TPS o Visa U', en: 'Advance Parole 2026: Travel with DACA, TPS or U Visa' },
    slug: 'advance-parole-2026-viajar-con-daca-tps-visa-u',
    image: '/blog/visa-u.png',
    category: { es: 'Proceso Migratorio', en: 'Immigration Process' },
  },
  'formulario-g28-cambiar-abogado-inmigracion': {
    title: { es: 'Formulario G-28: cómo cambiar de abogado de inmigración', en: 'Form G-28: How to Change Immigration Attorney' },
    slug: 'formulario-g28-cambiar-abogado-inmigracion',
    image: '/blog/visa-u.png',
    category: { es: 'Proceso Migratorio', en: 'Immigration Process' },
  },
  'residencia-laboral-eb3-ley-245i-entrada-indocumentada': {
    title: { es: 'Residencia laboral EB-3 y Ley 245(i): entrada indocumentada', en: 'EB-3 Work Residency & Section 245(i): Undocumented Entry' },
    slug: 'residencia-laboral-eb3-ley-245i-entrada-indocumentada',
    image: '/blog/visa-u.png',
    category: { es: 'Proceso Migratorio', en: 'Immigration Process' },
  },
  'foia-migratoria-pedir-record-antes-de-aplicar': {
    title: { es: 'FOIA migratoria: pedir record antes de aplicar', en: 'Immigration FOIA: Request Records Before Applying' },
    slug: 'foia-migratoria-pedir-record-antes-de-aplicar',
    image: '/blog/visa-u.png',
    category: { es: 'Proceso Migratorio', en: 'Immigration Process' },
  },
  'estatus-juvenil-sijs-residencia-jovenes-abandonados': {
    title: { es: 'Estatus Juvenil SIJS: residencia para jóvenes abandonados', en: 'SIJS Juvenile Status: Residency for Abandoned Youth' },
    slug: 'estatus-juvenil-sijs-residencia-jovenes-abandonados',
    image: '/blog/blog_15/BLOG05_CR1.png',
    category: { es: 'Visa Humanitaria', en: 'Humanitarian Relief' },
  },
  'perdon-i601a-arreglar-papeles-entrada-ilegal': {
    title: { es: 'Perdón I-601A: arreglar papeles si entraste ilegalmente', en: 'I-601A Waiver: Fix Papers After Illegal Entry' },
    slug: 'perdon-i601a-arreglar-papeles-entrada-ilegal',
    image: '/blog/blog_16/BLOG06_CR1.png',
    category: { es: 'Proceso Migratorio', en: 'Immigration Process' },
  },
  'marihuana-dui-buen-caracter-moral-inmigracion': {
    title: { es: 'Marihuana, DUI y buen carácter moral en inmigración', en: 'Marijuana, DUI and Good Moral Character in Immigration' },
    slug: 'marihuana-dui-buen-caracter-moral-inmigracion',
    image: '/blog/blog_17/BLOG07_CR1.png',
    category: { es: 'Proceso Migratorio', en: 'Immigration Process' },
  },
  'ciudadania-en-espanol-reglas-50-20-55-15': {
    title: { es: 'Ciudadanía en español: reglas 50/20 y 55/15', en: 'Citizenship in Spanish: 50/20 and 55/15 Rules' },
    slug: 'ciudadania-en-espanol-reglas-50-20-55-15',
    image: '/blog/blog_18/BLOG08_CR1.png',
    category: { es: 'Proceso Migratorio', en: 'Immigration Process' },
  },
  'entrevista-matrimonio-uscis-senales-alerta': {
    title: { es: 'Entrevista de matrimonio USCIS: señales de alerta', en: 'USCIS Marriage Interview: Red Flags' },
    slug: 'entrevista-matrimonio-uscis-senales-alerta',
    image: '/blog/blog_19/BLOG09_CR1.png',
    category: { es: 'Proceso Migratorio', en: 'Immigration Process' },
  },
  'asilo-frontera-2026-puerto-entrada-vs-cruce': {
    title: { es: 'Asilo en la frontera 2026: puerto de entrada vs cruce irregular', en: 'Asylum at the Border 2026: Port of Entry vs Unauthorized Crossing' },
    slug: 'asilo-frontera-2026-puerto-entrada-vs-cruce',
    image: '/blog/blog_20/BLOG10_CR1.png',
    category: { es: 'Visa Humanitaria', en: 'Humanitarian Relief' },
  },
};

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
    'ley-de-los-10-anos-cancelacion-de-deportacion',
    'frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria',
    'advance-parole-2026-viajar-con-daca-tps-visa-u',
    'marihuana-dui-buen-caracter-moral-inmigracion',
  ],
  process: [
    'formulario-g28-cambiar-abogado-inmigracion',
    'residencia-laboral-eb3-ley-245i-entrada-indocumentada',
    'foia-migratoria-pedir-record-antes-de-aplicar',
    'advance-parole-2026-viajar-con-daca-tps-visa-u',
    'perdon-i601a-arreglar-papeles-entrada-ilegal',
    'ciudadania-en-espanol-reglas-50-20-55-15',
    'entrevista-matrimonio-uscis-senales-alerta',
  ],
  humanitarian: [
    'visa-t-trabajo-forzado-por-deuda-con-coyote',
    'frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria',
    'vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente',
    'vawa-para-padres-maltrato-de-hijos-ciudadanos-estadounidenses',
    'estatus-juvenil-sijs-residencia-jovenes-abandonados',
    'asilo-frontera-2026-puerto-entrada-vs-cruce',
  ],
  family_marriage: [
    'entrevista-matrimonio-uscis-senales-alerta',
    'perdon-i601a-arreglar-papeles-entrada-ilegal',
    'ciudadania-en-espanol-reglas-50-20-55-15',
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
