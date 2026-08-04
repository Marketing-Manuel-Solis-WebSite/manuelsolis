// Mapa curado post → página de servicio: define a qué práctica apunta el CTA
// '¿Necesita Ayuda Legal?' de cada artículo.
//
// Vive junto a su consumidor (RelatedContent, un island de cliente) y sin
// importar nada: si estuviera en blogRelations.ts arrastraría BLOG_DATA — y con
// él el módulo de la página del blog — al bundle de cliente de los 35 posts.

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

/**
 * Curated service link for a slug, or `undefined` when the post has no entry.
 * Úsala cuando el llamador ya tenga un destino propio: así el fallback genérico
 * no degrada un enlace más específico.
 */
export function findServiceLink(slug: string): ServiceLink | undefined {
  return blogServiceMap[slug];
}

/** Get the service page link for a given blog post slug */
export function getServiceLink(slug: string): ServiceLink {
  return findServiceLink(slug) || defaultServiceLink;
}
