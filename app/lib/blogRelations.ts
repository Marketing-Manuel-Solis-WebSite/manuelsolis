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

const allArticles: Record<string, RelatedArticle> = {
  'daca-2026-estado-legal-tribunales': {
    title: { es: 'DACA 2026: estado legal en los tribunales', en: 'DACA 2026: Legal Status in the Courts' },
    slug: 'daca-2026-estado-legal-tribunales',
    image: '/blog/blog_31/MAY_B1.png',
    category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
  },
  'tps-2026-paises-elegibles-renovacion': {
    title: { es: 'TPS 2026: países elegibles, cómo renovar y qué pasa si se cancela', en: 'TPS 2026: Eligible Countries, Renewal, and What If Canceled' },
    slug: 'tps-2026-paises-elegibles-renovacion',
    image: '/home-image.jpg',
    category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
  },
  'crimenes-deportacion-vileza-moral': {
    title: { es: 'Crímenes que causan deportación: vileza moral', en: 'Crimes That Cause Deportation: Moral Turpitude' },
    slug: 'crimenes-deportacion-vileza-moral',
    image: '/home-image.jpg',
    category: { es: 'Defensa contra Deportación', en: 'Deportation Defense' },
  },
  'rfe-responder-evidencia-uscis': {
    title: { es: 'RFE: cómo responder sin que te nieguen el caso', en: 'RFE: How to Respond Without Getting Denied' },
    slug: 'rfe-responder-evidencia-uscis',
    image: '/home-image.jpg',
    category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
  },
  'barras-3-10-anos-presencia-ilegal': {
    title: { es: 'Barras de 3 y 10 años: presencia ilegal', en: '3 and 10 Year Bars: Unlawful Presence' },
    slug: 'barras-3-10-anos-presencia-ilegal',
    image: '/home-image.jpg',
    category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
  },
  'accidente-auto-indocumentado-derechos': {
    title: { es: 'Accidente de auto siendo indocumentado: tus derechos', en: 'Car Accident While Undocumented: Your Rights' },
    slug: 'accidente-auto-indocumentado-derechos',
    image: '/home-image.jpg',
    category: { es: 'Accidentes', en: 'Accidents' },
  },
  'i-864-patrocinador-ingreso-minimo': {
    title: { es: 'I-864: quién puede patrocinar y cuánto ingreso necesita', en: 'I-864: Who Can Sponsor and Income Requirements' },
    slug: 'i-864-patrocinador-ingreso-minimo',
    image: '/home-image.jpg',
    category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
  },
  'visa-k1-prometido-requisitos': {
    title: { es: 'Visa K-1 de prometido: requisitos y proceso', en: 'K-1 Fiancé Visa: Requirements and Process' },
    slug: 'visa-k1-prometido-requisitos',
    image: '/home-image.jpg',
    category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
  },
  'entrevista-inmigracion-errores-evitar': {
    title: { es: 'Entrevista de inmigración: 10 errores que evitar', en: 'Immigration Interview: 10 Mistakes to Avoid' },
    slug: 'entrevista-inmigracion-errores-evitar',
    image: '/home-image.jpg',
    category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
  },
  'familias-estatus-mixto-opciones': {
    title: { es: 'Familias de estatus mixto: opciones legales', en: 'Mixed-Status Families: Legal Options' },
    slug: 'familias-estatus-mixto-opciones',
    image: '/home-image.jpg',
    category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
  },
  'fraude-notarios-inmigracion': {
    title: { es: 'Fraude de notarios en inmigración', en: 'Notary Fraud in Immigration' },
    slug: 'fraude-notarios-inmigracion',
    image: '/home-image.jpg',
    category: { es: 'Procesos Migratorios', en: 'Immigration Process' },
  },
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
    'crimenes-deportacion-vileza-moral',
    'barras-3-10-anos-presencia-ilegal',
    'daca-2026-estado-legal-tribunales',
  ],
  process: [
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
