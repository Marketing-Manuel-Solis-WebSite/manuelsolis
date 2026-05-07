// ============================================================
// SEO 301 Redirects — WordPress legacy + slug normalization
// ============================================================
// Rationale: Google Search Console reported ~1,030 URLs as
// "Not found (404)" — almost all are legacy WordPress paths.
// These redirects preserve link equity and remove 404 noise.
//
// Notes:
// - Next.js evaluates redirects in next.config BEFORE the proxy,
//   so unprefixed URLs (e.g. /preguntas-frecuentes) are caught
//   before the proxy injects the locale.
// - The :lang variants exist for URLs that already had /es or /en.
// - For multi-segment legacy paths use :slug* (catch-all).
// - For single-segment use :slug.
// ============================================================

import type { NextConfig } from 'next';

type Redirect = NonNullable<Awaited<ReturnType<NonNullable<NextConfig['redirects']>>>>[number];

// --- Defunct attorney slugs (no longer in attorneyData.ts) ---
// Without these, /abogados/:slug returns 404 via notFound().
const DEFUNCT_ATTORNEYS = [
  'dayra-zoet-infante-bosques',
  'lucero-de-la-rosa',
  'yanira-sierra',
  'peyton-barrow',
  'magdalena-aguilar',
  'ashley-cruz',
  'yineyri-castillo-arias',
  'ana-patricia-rueda-en',
  'stephen-walker',
  'danatayri-morales-vidal-esq',
  'edward-s-reisman',
];

const defunctAttorneyRedirects: Redirect[] = DEFUNCT_ATTORNEYS.flatMap((slug) => [
  { source: `/abogados/${slug}`, destination: '/abogados', permanent: true },
  { source: `/:lang/abogados/${slug}`, destination: '/:lang/abogados', permanent: true },
  { source: `/:lang/attorneys/${slug}`, destination: '/:lang/abogados', permanent: true },
]);

export const seoRedirects: Redirect[] = [
  // ============================================================
  // BLOG SLUG NORMALIZATION (underscore/CamelCase → kebab-case)
  // ============================================================
  { source: '/:lang/blog/asilo_frontera_2026_puerto_entrada_vs_cruce', destination: '/:lang/blog/asilo-frontera-2026-puerto-entrada-vs-cruce', permanent: true },
  { source: '/:lang/blog/entrevista_matrimonio_uscis_senales_alerta', destination: '/:lang/blog/entrevista-matrimonio-uscis-senales-alerta', permanent: true },
  { source: '/:lang/blog/ciudadania_en_espanol_reglas_50_20_55_15', destination: '/:lang/blog/ciudadania-en-espanol-reglas-50-20-55-15', permanent: true },
  { source: '/:lang/blog/marihuana_dui_buen_caracter_moral_inmigracion', destination: '/:lang/blog/marihuana-dui-buen-caracter-moral-inmigracion', permanent: true },
  { source: '/:lang/blog/perdon_i601a_arreglar_papeles_entrada_ilegal', destination: '/:lang/blog/perdon-i601a-arreglar-papeles-entrada-ilegal', permanent: true },
  { source: '/:lang/blog/estatus_juvenil_sijs_residencia_jovenes_abandonados', destination: '/:lang/blog/estatus-juvenil-sijs-residencia-jovenes-abandonados', permanent: true },
  { source: '/:lang/blog/foia_migratoria_pedir_record_antes_de_aplicar', destination: '/:lang/blog/foia-migratoria-pedir-record-antes-de-aplicar', permanent: true },
  { source: '/:lang/blog/residencia_laboral_eb3_ley_245i_entrada_indocumentada', destination: '/:lang/blog/residencia-laboral-eb3-ley-245i-entrada-indocumentada', permanent: true },
  { source: '/:lang/blog/advance_parole_2026_viajar_con_daca_tps_visa_u', destination: '/:lang/blog/advance-parole-2026-viajar-con-daca-tps-visa-u', permanent: true },
  { source: '/:lang/blog/ley_de_los_10_anos_cancelacion_de_deportacion', destination: '/:lang/blog/ley-de-los-10-anos-cancelacion-de-deportacion', permanent: true },
  { source: '/:lang/blog/Visa_U_y_VAWA_incluir_hijos_y_nuevos_esposos_derivados', destination: '/:lang/blog/visa-u-y-vawa-incluir-hijos-y-nuevos-esposos-derivados', permanent: true },
  { source: '/:lang/blog/Formulario_G28_Cambiar_Abogado_Inmigracion', destination: '/:lang/blog/formulario-g28-cambiar-abogado-inmigracion', permanent: true },
  { source: '/:lang/blog/Frenar_deportacion_inminente_con_solicitud_de_Visa_Humanitaria', destination: '/:lang/blog/frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria', permanent: true },
  { source: '/:lang/blog/Visa_T_trabajo_forzado_por_deuda_con_coyote', destination: '/:lang/blog/visa-t-trabajo-forzado-por-deuda-con-coyote', permanent: true },
  { source: '/:lang/blog/VAWA_para_hombres_maltratados_por_pareja_ciudadana_o_residente', destination: '/:lang/blog/vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente', permanent: true },
  { source: '/:lang/blog/VAWA_para_padres_Maltrato_de_hijos_ciudadanos_estadounidenses', destination: '/:lang/blog/vawa-para-padres-maltrato-de-hijos-ciudadanos-estadounidenses', permanent: true },
  { source: '/:lang/blog/perdon_i_192_como_arreglar_con_la_visa_u_si_tienes_deportaciones_previas', destination: '/:lang/blog/perdon-i-192-como-arreglar-con-la-visa-u-si-tienes-deportaciones-previas', permanent: true },
  { source: '/:lang/blog/que_hacer_si_la_policia_no_firma_la_certificacion_visa_u', destination: '/:lang/blog/que-hacer-si-la-policia-no-firma-la-certificacion-visa-u', permanent: true },
  { source: '/:lang/blog/permiso_de_trabajo_visa_u', destination: '/:lang/blog/permiso-de-trabajo-visa-u', permanent: true },

  // ============================================================
  // INFORMACION ROUTES (legacy /informacion/nosotros)
  // ============================================================
  { source: '/:lang/informacion/nosotros', destination: '/:lang/nosotros', permanent: true },

  // ============================================================
  // WORDPRESS CORE PATHS → home
  // ============================================================
  { source: '/wp-admin/:path*', destination: '/', permanent: true },
  { source: '/wp-login.php', destination: '/', permanent: true },
  { source: '/wp-content/:path*', destination: '/', permanent: true },
  { source: '/wp-includes/:path*', destination: '/', permanent: true },
  { source: '/wp-json/:path*', destination: '/', permanent: true },
  { source: '/xmlrpc.php', destination: '/', permanent: true },

  // WordPress feeds
  { source: '/feed', destination: '/', permanent: true },
  { source: '/feed/:path*', destination: '/', permanent: true },
  { source: '/comments/feed', destination: '/', permanent: true },
  { source: '/:lang/feed', destination: '/:lang', permanent: true },
  { source: '/:lang/feed/:path*', destination: '/:lang', permanent: true },
  { source: '/:lang/comments/feed', destination: '/:lang', permanent: true },

  // Author pages → attorney directory
  { source: '/author/:slug*', destination: '/es/abogados', permanent: true },
  { source: '/:lang/author/:slug*', destination: '/:lang/abogados', permanent: true },

  // WordPress pagination
  { source: '/:lang/blog/page/:page', destination: '/:lang/blog', permanent: true },
  { source: '/:lang/page/:page', destination: '/:lang', permanent: true },
  { source: '/blog/page/:page', destination: '/es/blog', permanent: true },
  { source: '/page/:page', destination: '/es', permanent: true },

  // Tag pages
  { source: '/:lang/tag/:slug*', destination: '/:lang/blog', permanent: true },
  { source: '/tag/:slug*', destination: '/es/blog', permanent: true },

  // ============================================================
  // ENGLISH PATH ALIASES → spanish slug equivalents
  // ============================================================
  { source: '/:lang/about', destination: '/:lang/nosotros', permanent: true },
  { source: '/:lang/about-us', destination: '/:lang/nosotros', permanent: true },
  { source: '/:lang/contact', destination: '/:lang/nosotros', permanent: true },
  { source: '/:lang/contact-us', destination: '/:lang/nosotros', permanent: true },
  { source: '/:lang/services', destination: '/:lang/servicios', permanent: true },
  { source: '/:lang/services/:slug*', destination: '/:lang/servicios', permanent: true },
  { source: '/:lang/offices', destination: '/:lang/oficinas', permanent: true },
  { source: '/:lang/attorneys', destination: '/:lang/abogados', permanent: true },
  { source: '/:lang/lawyers', destination: '/:lang/abogados', permanent: true },
  { source: '/:lang/lawyers/:slug', destination: '/:lang/abogados/:slug', permanent: true },
  { source: '/:lang/testimonials', destination: '/:lang/testimonios', permanent: true },
  { source: '/:lang/testimonials/:slug', destination: '/:lang/testimonios', permanent: true },
  { source: '/:lang/privacy', destination: '/:lang/privacidad', permanent: true },
  { source: '/:lang/privacy-policy', destination: '/:lang/privacidad', permanent: true },
  { source: '/:lang/terms', destination: '/:lang/terminos', permanent: true },
  { source: '/:lang/terms-of-service', destination: '/:lang/terminos', permanent: true },
  { source: '/:lang/careers', destination: '/:lang/join-in', permanent: true },
  { source: '/:lang/resources', destination: '/:lang/informacion/recursos', permanent: true },
  { source: '/:lang/detained-clients', destination: '/:lang/clientes-detenidos', permanent: true },
  { source: '/:lang/news', destination: '/:lang/blog', permanent: true },
  { source: '/:lang/news/:slug*', destination: '/:lang/blog', permanent: true },
  { source: '/:lang/home', destination: '/:lang', permanent: true },
  { source: '/:lang/home/', destination: '/:lang', permanent: true },

  // ============================================================
  // FAQ legacy → /informacion/faq
  // ============================================================
  { source: '/preguntas-frecuentes', destination: '/informacion/faq', permanent: true },
  { source: '/preguntas-frecuentes/:slug*', destination: '/informacion/faq', permanent: true },
  { source: '/:lang/preguntas-frecuentes', destination: '/:lang/informacion/faq', permanent: true },
  { source: '/:lang/preguntas-frecuentes/:slug*', destination: '/:lang/informacion/faq', permanent: true },
  { source: '/faq', destination: '/informacion/faq', permanent: true },
  { source: '/faq/:slug*', destination: '/informacion/faq', permanent: true },
  { source: '/:lang/faq', destination: '/:lang/informacion/faq', permanent: true },
  { source: '/:lang/faq/:slug*', destination: '/:lang/informacion/faq', permanent: true },

  // ============================================================
  // NEWS / NOTICIAS legacy → /blog
  // ============================================================
  { source: '/noticias', destination: '/blog', permanent: true },
  { source: '/noticias/:slug*', destination: '/blog', permanent: true },
  { source: '/:lang/noticias', destination: '/:lang/blog', permanent: true },
  { source: '/:lang/noticias/:slug*', destination: '/:lang/blog', permanent: true },
  { source: '/news', destination: '/blog', permanent: true },
  { source: '/news/:slug*', destination: '/blog', permanent: true },

  // ============================================================
  // LEGAL PROTECTION articles legacy → /blog
  // ============================================================
  { source: '/proteccion-legal-para-migrantes', destination: '/blog', permanent: true },
  { source: '/proteccion-legal-para-migrantes/:slug*', destination: '/blog', permanent: true },
  { source: '/proteccion-legal-para-migrantes-en/:slug*', destination: '/blog', permanent: true },
  { source: '/:lang/proteccion-legal-para-migrantes', destination: '/:lang/blog', permanent: true },
  { source: '/:lang/proteccion-legal-para-migrantes/:slug*', destination: '/:lang/blog', permanent: true },
  { source: '/:lang/proteccion-legal-para-migrantes-en/:slug*', destination: '/:lang/blog', permanent: true },

  // ============================================================
  // MIGRANT RIGHTS articles → /blog (catch-all subpaths)
  // ============================================================
  { source: '/derechos-de-migrantes/:slug*', destination: '/blog', permanent: true },
  { source: '/:lang/derechos-de-migrantes/:slug*', destination: '/:lang/blog', permanent: true },

  // ============================================================
  // PROCESO MIGRATORIO / REQUISITOS articles → /blog
  // ============================================================
  { source: '/proceso-migratorio', destination: '/blog', permanent: true },
  { source: '/proceso-migratorio/:slug*', destination: '/blog', permanent: true },
  { source: '/:lang/proceso-migratorio', destination: '/:lang/blog', permanent: true },
  { source: '/:lang/proceso-migratorio/:slug*', destination: '/:lang/blog', permanent: true },
  { source: '/requisitos-de-visas', destination: '/blog', permanent: true },
  { source: '/requisitos-de-visas/:slug*', destination: '/blog', permanent: true },
  { source: '/:lang/requisitos-de-visas', destination: '/:lang/blog', permanent: true },
  { source: '/:lang/requisitos-de-visas/:slug*', destination: '/:lang/blog', permanent: true },

  // ============================================================
  // CATEGORY LEGACY (some are valid pages, some need fallback)
  // ============================================================
  { source: '/category/proteccion-legal-para-migrantes/page/:page*', destination: '/blog', permanent: true },
  { source: '/category/derechos-de-migrantes/page/:page*', destination: '/blog', permanent: true },
  { source: '/category/proceso-migratorio', destination: '/blog', permanent: true },
  { source: '/category/proceso-migratorio/:slug*', destination: '/blog', permanent: true },
  { source: '/category/requisitos-de-visas', destination: '/blog', permanent: true },
  { source: '/category/requisitos-de-visas/:slug*', destination: '/blog', permanent: true },
  { source: '/:lang/category/proceso-migratorio', destination: '/:lang/blog', permanent: true },
  { source: '/:lang/category/requisitos-de-visas', destination: '/:lang/blog', permanent: true },
  { source: '/:lang/category/proteccion-legal-para-migrantes/page/:page*', destination: '/:lang/blog', permanent: true },
  { source: '/:lang/category/derechos-de-migrantes/page/:page*', destination: '/:lang/blog', permanent: true },

  // ============================================================
  // SERVICE-AREA LEGACY (areas-servicio, service-areas, legal-areas)
  // ============================================================
  // Specific high-value mappings (Spanish, no locale prefix)
  { source: '/areas-servicio/asilo', destination: '/servicios/asilo', permanent: true },
  { source: '/areas-servicio/u-visa-vawa', destination: '/servicios/visa-u', permanent: true },
  { source: '/areas-servicio/defensa-contra-la-deportacion', destination: '/servicios/defensa-deportacion', permanent: true },
  { source: '/areas-servicio/naturalizacion', destination: '/servicios/inmigracion', permanent: true },
  { source: '/areas-servicio/peticion-de-residencia-por-parte-de-un-familiar', destination: '/servicios/inmigracion', permanent: true },
  { source: '/areas-servicio/peticion-de-residencia-por-parte-del-empleador', destination: '/servicios/inmigracion', permanent: true },
  { source: '/areas-servicio/accidentes-de-aviones-y-helicopteros', destination: '/servicios/accidentes', permanent: true },
  { source: '/areas-servicio/accidentes-de-vehiculos-de-18-ruedas-trailers', destination: '/servicios/accidentes', permanent: true },
  { source: '/areas-servicio/negligencia-medica', destination: '/servicios/accidentes', permanent: true },
  { source: '/areas-servicio/explosion-de-plantas-industriales', destination: '/servicios/accidentes', permanent: true },
  { source: '/areas-servicio/violencia-domestica', destination: '/servicios/familia', permanent: true },
  { source: '/areas-servicio/divorcios', destination: '/servicios/familia', permanent: true },
  { source: '/areas-servicio/custodia-de-los-hijos', destination: '/servicios/familia', permanent: true },
  { source: '/areas-servicio/manutencion-de-los-hijos', destination: '/servicios/familia', permanent: true },
  { source: '/areas-servicio/manejo-en-estado-de-ebriedad', destination: '/servicios/ley-criminal', permanent: true },
  { source: '/areas-servicio/asalto', destination: '/servicios/ley-criminal', permanent: true },
  { source: '/areas-servicio/robo', destination: '/servicios/ley-criminal', permanent: true },
  { source: '/areas-servicio/prostitucion', destination: '/servicios/ley-criminal', permanent: true },
  { source: '/areas-servicio', destination: '/servicios', permanent: true },
  { source: '/areas-servicio/:slug*', destination: '/servicios', permanent: true },

  // /:lang/areas-servicio/* mirror
  { source: '/:lang/areas-servicio/asilo', destination: '/:lang/servicios/asilo', permanent: true },
  { source: '/:lang/areas-servicio/u-visa-vawa', destination: '/:lang/servicios/visa-u', permanent: true },
  { source: '/:lang/areas-servicio/defensa-contra-la-deportacion', destination: '/:lang/servicios/defensa-deportacion', permanent: true },
  { source: '/:lang/areas-servicio/naturalizacion', destination: '/:lang/servicios/inmigracion', permanent: true },
  { source: '/:lang/areas-servicio/peticion-de-residencia-por-parte-de-un-familiar', destination: '/:lang/servicios/inmigracion', permanent: true },
  { source: '/:lang/areas-servicio/peticion-de-residencia-por-parte-del-empleador', destination: '/:lang/servicios/inmigracion', permanent: true },
  { source: '/:lang/areas-servicio/accidentes-de-aviones-y-helicopteros', destination: '/:lang/servicios/accidentes', permanent: true },
  { source: '/:lang/areas-servicio/accidentes-de-vehiculos-de-18-ruedas-trailers', destination: '/:lang/servicios/accidentes', permanent: true },
  { source: '/:lang/areas-servicio/negligencia-medica', destination: '/:lang/servicios/accidentes', permanent: true },
  { source: '/:lang/areas-servicio/explosion-de-plantas-industriales', destination: '/:lang/servicios/accidentes', permanent: true },
  { source: '/:lang/areas-servicio/violencia-domestica', destination: '/:lang/servicios/familia', permanent: true },
  { source: '/:lang/areas-servicio/theft', destination: '/:lang/servicios/ley-criminal', permanent: true },
  { source: '/:lang/areas-servicio/child-custody', destination: '/:lang/servicios/familia', permanent: true },
  { source: '/:lang/areas-servicio/child-support', destination: '/:lang/servicios/familia', permanent: true },
  { source: '/:lang/areas-servicio/family', destination: '/:lang/servicios/familia', permanent: true },
  { source: '/:lang/areas-servicio/assault', destination: '/:lang/servicios/ley-criminal', permanent: true },
  { source: '/:lang/areas-servicio', destination: '/:lang/servicios', permanent: true },
  { source: '/:lang/areas-servicio/:slug*', destination: '/:lang/servicios', permanent: true },

  // /:lang/service-areas/* (English style)
  { source: '/:lang/service-areas', destination: '/:lang/servicios', permanent: true },
  { source: '/:lang/service-areas/asilo', destination: '/:lang/servicios/asilo', permanent: true },
  { source: '/:lang/service-areas/asylum', destination: '/:lang/servicios/asilo', permanent: true },
  { source: '/:lang/service-areas/u-visa-vawa', destination: '/:lang/servicios/visa-u', permanent: true },
  { source: '/:lang/service-areas/naturalizacion', destination: '/:lang/servicios/inmigracion', permanent: true },
  { source: '/:lang/service-areas/naturalization', destination: '/:lang/servicios/inmigracion', permanent: true },
  { source: '/:lang/service-areas/peticion-de-residencia-por-parte-de-un-familiar', destination: '/:lang/servicios/inmigracion', permanent: true },
  { source: '/:lang/service-areas/peticion-de-residencia-por-parte-del-empleador', destination: '/:lang/servicios/inmigracion', permanent: true },
  { source: '/:lang/service-areas/accidentes-de-vehiculos-de-18-ruedas-trailers', destination: '/:lang/servicios/accidentes', permanent: true },
  { source: '/:lang/service-areas/explosion-de-plantas-industriales', destination: '/:lang/servicios/accidentes', permanent: true },
  { source: '/:lang/service-areas/accidentes-automovilisticos', destination: '/:lang/servicios/accidentes', permanent: true },
  { source: '/:lang/service-areas/negligencia-medica', destination: '/:lang/servicios/accidentes', permanent: true },
  { source: '/:lang/service-areas/accidentes-de-aviones-y-helicopteros', destination: '/:lang/servicios/accidentes', permanent: true },
  { source: '/:lang/service-areas/family', destination: '/:lang/servicios/familia', permanent: true },
  { source: '/:lang/service-areas/child-support', destination: '/:lang/servicios/familia', permanent: true },
  { source: '/:lang/service-areas/child-custody', destination: '/:lang/servicios/familia', permanent: true },
  { source: '/:lang/service-areas/theft', destination: '/:lang/servicios/ley-criminal', permanent: true },
  { source: '/:lang/service-areas/assault', destination: '/:lang/servicios/ley-criminal', permanent: true },
  { source: '/:lang/service-areas/planificacion-patrimonial', destination: '/:lang/servicios', permanent: true },
  { source: '/:lang/service-areas/:slug*', destination: '/:lang/servicios', permanent: true },

  // /:lang/legal-areas/* (English style)
  { source: '/:lang/legal-areas', destination: '/:lang/servicios', permanent: true },
  { source: '/:lang/legal-areas/immigration', destination: '/:lang/servicios/inmigracion', permanent: true },
  { source: '/:lang/legal-areas/family', destination: '/:lang/servicios/familia', permanent: true },
  { source: '/:lang/legal-areas/criminal-law', destination: '/:lang/servicios/ley-criminal', permanent: true },
  { source: '/:lang/legal-areas/insurance', destination: '/:lang/servicios/seguros', permanent: true },
  { source: '/:lang/legal-areas/accidents', destination: '/:lang/servicios/accidentes', permanent: true },
  { source: '/:lang/legal-areas/windstorm-claims', destination: '/:lang/servicios/seguros', permanent: true },
  { source: '/:lang/legal-areas/:slug*', destination: '/:lang/servicios', permanent: true },

  // ============================================================
  // OLD SERVICE SLUGS (windstorm/tornado/hailstorm/etc.)
  // ============================================================
  { source: '/servicios/hailstorm-claims', destination: '/servicios/seguros', permanent: true },
  { source: '/servicios/tornado-claims', destination: '/servicios/seguros', permanent: true },
  { source: '/servicios/windstorm-claims', destination: '/servicios/seguros', permanent: true },
  { source: '/servicios/planificacion-patrimonial', destination: '/servicios', permanent: true },
  { source: '/servicios/planificacion', destination: '/servicios', permanent: true },
  { source: '/:lang/servicios/hailstorm-claims', destination: '/:lang/servicios/seguros', permanent: true },
  { source: '/:lang/servicios/tornado-claims', destination: '/:lang/servicios/seguros', permanent: true },
  { source: '/:lang/servicios/windstorm-claims', destination: '/:lang/servicios/seguros', permanent: true },
  { source: '/:lang/servicios/planificacion-patrimonial', destination: '/:lang/servicios', permanent: true },
  { source: '/:lang/servicios/planificacion', destination: '/:lang/servicios', permanent: true },

  // ============================================================
  // STANDALONE VISA PAGES → matching service pages
  // ============================================================
  { source: '/visa-vawa', destination: '/servicios/vawa', permanent: true },
  { source: '/visa-t', destination: '/servicios/visa-u', permanent: true },
  { source: '/visa-sijs', destination: '/servicios/inmigracion', permanent: true },
  { source: '/visa-juvenil-sij', destination: '/servicios/inmigracion', permanent: true },
  { source: '/:lang/visa-vawa', destination: '/:lang/servicios/vawa', permanent: true },
  { source: '/:lang/visa-t', destination: '/:lang/servicios/visa-u', permanent: true },
  { source: '/:lang/visa-sijs', destination: '/:lang/servicios/inmigracion', permanent: true },
  { source: '/:lang/visa-juvenil-sij', destination: '/:lang/servicios/inmigracion', permanent: true },

  // ============================================================
  // OFFICE LEGACY SLUGS
  // ============================================================
  { source: '/oficinas/houston', destination: '/oficinas/houston-principal', permanent: true },
  { source: '/oficinas/houston-principal-office', destination: '/oficinas/houston-principal', permanent: true },
  { source: '/oficinas/houston-principal-office-4', destination: '/oficinas/houston-principal', permanent: true },
  { source: '/oficinas/houston-principal-office-5', destination: '/oficinas/houston-principal', permanent: true },
  { source: '/oficinas/houston-navigation', destination: '/oficinas/houston-principal', permanent: true },
  { source: '/oficinas/airways', destination: '/oficinas/houston-principal', permanent: true },
  { source: '/oficinas/los-angeles', destination: '/oficinas/losangeles', permanent: true },
  { source: '/oficinas/abogados-inmigracion-los-angeles', destination: '/oficinas/losangeles', permanent: true },
  { source: '/oficinas/denver', destination: '/oficinas/arvada', permanent: true },
  { source: '/oficinas/memphis-office', destination: '/oficinas/memphis', permanent: true },
  // /:lang variants
  { source: '/:lang/oficinas/houston', destination: '/:lang/oficinas/houston-principal', permanent: true },
  { source: '/:lang/oficinas/houston-principal-office', destination: '/:lang/oficinas/houston-principal', permanent: true },
  { source: '/:lang/oficinas/houston-navigation', destination: '/:lang/oficinas/houston-principal', permanent: true },
  { source: '/:lang/oficinas/airways', destination: '/:lang/oficinas/houston-principal', permanent: true },
  { source: '/:lang/oficinas/los-angeles', destination: '/:lang/oficinas/losangeles', permanent: true },
  { source: '/:lang/oficinas/denver', destination: '/:lang/oficinas/arvada', permanent: true },
  { source: '/:lang/oficinas/memphis-office', destination: '/:lang/oficinas/memphis', permanent: true },
  { source: '/:lang/oficinas/abogados-inmigracion-los-angeles', destination: '/:lang/oficinas/losangeles', permanent: true },
  // /:lang/offices/* (English alias) — see also line 113 above
  { source: '/:lang/offices/houston-principal-office', destination: '/:lang/oficinas/houston-principal', permanent: true },
  { source: '/:lang/offices/houston', destination: '/:lang/oficinas/houston-principal', permanent: true },
  { source: '/:lang/offices/dallas', destination: '/:lang/oficinas/dallas', permanent: true },
  { source: '/:lang/offices/chicago', destination: '/:lang/oficinas/chicago', permanent: true },
  { source: '/:lang/offices/harlingen', destination: '/:lang/oficinas/harlingen', permanent: true },
  { source: '/:lang/offices/memphis', destination: '/:lang/oficinas/memphis', permanent: true },
  { source: '/:lang/offices/memphis-office', destination: '/:lang/oficinas/memphis', permanent: true },
  { source: '/:lang/offices/los-angeles', destination: '/:lang/oficinas/losangeles', permanent: true },
  { source: '/:lang/offices/el-paso', destination: '/:lang/oficinas/el-paso', permanent: true },
  { source: '/:lang/offices/arvada', destination: '/:lang/oficinas/arvada', permanent: true },
  { source: '/:lang/offices/denver', destination: '/:lang/oficinas/arvada', permanent: true },
  { source: '/:lang/offices/:slug*', destination: '/:lang/oficinas', permanent: true },
  // English standalone city
  { source: '/:lang/los-angeles', destination: '/:lang/oficinas/losangeles', permanent: true },

  // ============================================================
  // ATTORNEY LEGACY: /:lang/attorneys/:slug → /:lang/abogados/:slug
  // ============================================================
  { source: '/:lang/attorneys/:slug', destination: '/:lang/abogados/:slug', permanent: true },
  ...defunctAttorneyRedirects,

  // ============================================================
  // INDIVIDUAL TESTIMONIAL SLUGS (no individual pages exist anymore)
  // ============================================================
  { source: '/testimonios/:slug', destination: '/testimonios', permanent: true },
  { source: '/:lang/testimonios/:slug', destination: '/:lang/testimonios', permanent: true },
  // /:lang/testimonials/:slug — see line 118 above (deduplicated)

  // ============================================================
  // PRIVACY POLICY VARIANTS
  // ============================================================
  { source: '/politica-de-privacidad', destination: '/privacidad', permanent: true },
  { source: '/:lang/politica-de-privacidad', destination: '/:lang/privacidad', permanent: true },

  // ============================================================
  // RECURSOS / TERMS VARIANTS
  // ============================================================
  { source: '/recursos', destination: '/informacion/recursos', permanent: true },
  { source: '/:lang/recursos', destination: '/:lang/informacion/recursos', permanent: true },
  { source: '/terminos-y-condiciones', destination: '/terminos', permanent: true },
  { source: '/:lang/terminos-y-condiciones', destination: '/:lang/terminos', permanent: true },

  // ============================================================
  // AREAS LEGALES
  // ============================================================
  { source: '/areas-legales', destination: '/servicios', permanent: true },
  { source: '/:lang/areas-legales', destination: '/:lang/servicios', permanent: true },

  // ============================================================
  // LANDING PAGES → home or relevant service
  // (Use regex-constrained single segment to avoid path-to-regexp
  //  ambiguity with hyphen-prefixed parameters.)
  // ============================================================
  { source: '/:path(landing-google-.+)', destination: '/', permanent: true },
  { source: '/:path(landing-facebook-.+)', destination: '/', permanent: true },
  { source: '/:path(landing-fb-.+)', destination: '/', permanent: true },
  { source: '/:path(landing-page-fb-.+)', destination: '/', permanent: true },
  { source: '/landing-visau', destination: '/servicios/visa-u', permanent: true },
  { source: '/landing-visa-u', destination: '/servicios/visa-u', permanent: true },
  { source: '/:lang/:path(landing-google-.+)', destination: '/:lang', permanent: true },
  { source: '/:lang/:path(landing-facebook-.+)', destination: '/:lang', permanent: true },
  { source: '/:lang/:path(landing-fb-.+)', destination: '/:lang', permanent: true },
  { source: '/:lang/:path(landing-page-fb-.+)', destination: '/:lang', permanent: true },
  { source: '/:lang/landing-visau', destination: '/:lang/servicios/visa-u', permanent: true },
  { source: '/:lang/landing-visa-u', destination: '/:lang/servicios/visa-u', permanent: true },
  { source: '/:lang/landing-abogado-de-inmigracion', destination: '/:lang/servicios/inmigracion', permanent: true },

  // ============================================================
  // LEAD-QUALIFICATION pages → home
  // ============================================================
  { source: '/:path(abogado-de-inmigracion-calificacion-leads-.+)', destination: '/', permanent: true },
  { source: '/manuel-solis-calificacion-leads', destination: '/', permanent: true },
  { source: '/:lang/:path(abogado-de-inmigracion-calificacion-leads-.+)', destination: '/:lang', permanent: true },

  // ============================================================
  // THANK-YOU pages
  // ============================================================
  { source: '/gracias', destination: '/', permanent: true },
  { source: '/:path(gracias-por-completar-.+)', destination: '/', permanent: true },
  { source: '/:lang/gracias', destination: '/:lang', permanent: true },
  { source: '/:lang/:path(gracias-por-completar-.+)', destination: '/:lang', permanent: true },

  // ============================================================
  // SOCIAL ALIASES
  // ============================================================
  { source: '/youtube', destination: 'https://www.youtube.com/@ManuelSolisLawFirm', permanent: true, basePath: false },
  { source: '/instagram', destination: 'https://www.instagram.com/maboralaw/', permanent: true, basePath: false },
  { source: '/facebook', destination: 'https://www.facebook.com/ManuelSolisLawFirm', permanent: true, basePath: false },
  { source: '/tiktok', destination: 'https://www.tiktok.com/@manuelsolislawfirm', permanent: true, basePath: false },
  { source: '/telemundo', destination: '/', permanent: true },
  { source: '/manuel-solis-youtube', destination: 'https://www.youtube.com/@ManuelSolisLawFirm', permanent: true, basePath: false },

  // ============================================================
  // QR / brochure / promo URLs
  // ============================================================
  { source: '/qr-pantallas-oficinas', destination: '/oficinas', permanent: true },
  { source: '/brochure-servicios-legales', destination: '/servicios', permanent: true },
  { source: '/:path(brochure-servicios-legales-.+)', destination: '/servicios', permanent: true },

  // ============================================================
  // MISC LEGACY
  // ============================================================
  { source: '/new-home', destination: '/', permanent: true },
  { source: '/:lang/new-home', destination: '/:lang', permanent: true },
  { source: '/:lang/manuel-solis-live-2', destination: '/:lang', permanent: true },
];
