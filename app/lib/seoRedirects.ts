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
// - REGLA: si el source NO tiene :lang, el destination debe llevar
//   /es explícito — un destino sin prefijo encadena un segundo 301
//   cuando el proxy inyecta el locale (desperdicia crawl budget).
// - The :lang variants exist for URLs that already had /es or /en.
//   El parámetro va SIEMPRE restringido a `:lang(es|en)`: sin la
//   restricción captura cualquier primer segmento, así que reglas como
//   '/:lang/noticias' se tragarían URLs reales sin prefijo de idioma
//   (/informacion/noticias) antes de que el proxy pueda normalizarlas.
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
  // 'edward-s-reisman' NO va aquí: es un abogado EN ACTIVO.
  // Entró por error en el barrido masivo de redirects legacy de WordPress del
  // 30-abr-2026, cuatro semanas después de que su ficha se diera de alta en
  // attorneyData.ts (26-mar). El resultado: su página se construye (122 KB),
  // las dos páginas índice la enlazan con "Ver Perfil Completo", y en producción
  // el 308 se la comía. Cuatro meses inalcanzable.
  // El test de __tests__/auditoriaSeoSep2026.test.ts cruza esta lista contra
  // attorneyData para que no vuelva a pasar con ningún otro.
  'stephanie-l-garcia-vidal',
];

const defunctAttorneyRedirects: Redirect[] = DEFUNCT_ATTORNEYS.flatMap((slug) => [
  { source: `/abogados/${slug}`, destination: '/es/abogados', permanent: true },
  { source: `/:lang(es|en)/abogados/${slug}`, destination: '/:lang/abogados', permanent: true },
  { source: `/:lang(es|en)/attorneys/${slug}`, destination: '/:lang/abogados', permanent: true },
]);

export const seoRedirects: Redirect[] = [
  // ============================================================
  // BLOG SLUG NORMALIZATION (underscore/CamelCase → kebab-case)
  // ============================================================
  { source: '/:lang(es|en)/blog/asilo_frontera_2026_puerto_entrada_vs_cruce', destination: '/:lang/blog/asilo-frontera-2026-puerto-entrada-vs-cruce', permanent: true },
  { source: '/:lang(es|en)/blog/entrevista_matrimonio_uscis_senales_alerta', destination: '/:lang/blog/entrevista-matrimonio-uscis-senales-alerta', permanent: true },
  { source: '/:lang(es|en)/blog/ciudadania_en_espanol_reglas_50_20_55_15', destination: '/:lang/blog/ciudadania-en-espanol-reglas-50-20-55-15', permanent: true },
  { source: '/:lang(es|en)/blog/marihuana_dui_buen_caracter_moral_inmigracion', destination: '/:lang/blog/marihuana-dui-buen-caracter-moral-inmigracion', permanent: true },
  { source: '/:lang(es|en)/blog/perdon_i601a_arreglar_papeles_entrada_ilegal', destination: '/:lang/blog/perdon-i601a-arreglar-papeles-entrada-ilegal', permanent: true },
  { source: '/:lang(es|en)/blog/estatus_juvenil_sijs_residencia_jovenes_abandonados', destination: '/:lang/blog/estatus-juvenil-sijs-residencia-jovenes-abandonados', permanent: true },
  { source: '/:lang(es|en)/blog/foia_migratoria_pedir_record_antes_de_aplicar', destination: '/:lang/blog/foia-migratoria-pedir-record-antes-de-aplicar', permanent: true },
  { source: '/:lang(es|en)/blog/residencia_laboral_eb3_ley_245i_entrada_indocumentada', destination: '/:lang/blog/residencia-laboral-eb3-ley-245i-entrada-indocumentada', permanent: true },
  { source: '/:lang(es|en)/blog/advance_parole_2026_viajar_con_daca_tps_visa_u', destination: '/:lang/blog/advance-parole-2026-viajar-con-daca-tps-visa-u', permanent: true },
  { source: '/:lang(es|en)/blog/ley_de_los_10_anos_cancelacion_de_deportacion', destination: '/:lang/blog/ley-de-los-10-anos-cancelacion-de-deportacion', permanent: true },
  { source: '/:lang(es|en)/blog/Visa_U_y_VAWA_incluir_hijos_y_nuevos_esposos_derivados', destination: '/:lang/blog/visa-u-y-vawa-incluir-hijos-y-nuevos-esposos-derivados', permanent: true },
  { source: '/:lang(es|en)/blog/Formulario_G28_Cambiar_Abogado_Inmigracion', destination: '/:lang/blog/formulario-g28-cambiar-abogado-inmigracion', permanent: true },
  { source: '/:lang(es|en)/blog/Frenar_deportacion_inminente_con_solicitud_de_Visa_Humanitaria', destination: '/:lang/blog/frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria', permanent: true },
  { source: '/:lang(es|en)/blog/Visa_T_trabajo_forzado_por_deuda_con_coyote', destination: '/:lang/blog/visa-t-trabajo-forzado-por-deuda-con-coyote', permanent: true },
  { source: '/:lang(es|en)/blog/VAWA_para_hombres_maltratados_por_pareja_ciudadana_o_residente', destination: '/:lang/blog/vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente', permanent: true },
  { source: '/:lang(es|en)/blog/VAWA_para_padres_Maltrato_de_hijos_ciudadanos_estadounidenses', destination: '/:lang/blog/vawa-para-padres-maltrato-de-hijos-ciudadanos-estadounidenses', permanent: true },
  { source: '/:lang(es|en)/blog/perdon_i_192_como_arreglar_con_la_visa_u_si_tienes_deportaciones_previas', destination: '/:lang/blog/perdon-i-192-como-arreglar-con-la-visa-u-si-tienes-deportaciones-previas', permanent: true },
  { source: '/:lang(es|en)/blog/que_hacer_si_la_policia_no_firma_la_certificacion_visa_u', destination: '/:lang/blog/que-hacer-si-la-policia-no-firma-la-certificacion-visa-u', permanent: true },
  { source: '/:lang(es|en)/blog/permiso_de_trabajo_visa_u', destination: '/:lang/blog/permiso-de-trabajo-visa-u', permanent: true },

  // ============================================================
  // INFORMACION ROUTES (legacy /informacion/nosotros)
  // ============================================================
  { source: '/:lang(es|en)/informacion/nosotros', destination: '/:lang/nosotros', permanent: true },

  // /contacto nunca existió como ruta (la página de conversión es /consulta);
  // había enlaces internos y puede haber externos apuntando ahí.
  { source: '/contacto', destination: '/es/consulta', permanent: true },
  { source: '/:lang(es|en)/contacto', destination: '/:lang/consulta', permanent: true },

  // ============================================================
  // RUTAS RETIRADAS → destino real equivalente
  // ============================================================
  // /clientes se eliminó: era un placeholder "en construcción" cuyo cuerpo era
  // una copia literal del de /informacion/noticias, sin contenido propio. El
  // área de clientes real y funcional es /acceso-clientes (portal seguro), así
  // que el destino es esa ruta y no la home: una redirección genérica a la home
  // la interpreta Google como soft 404 y pierde el equity del enlace.
  { source: '/clientes', destination: '/es/acceso-clientes', permanent: true },
  { source: '/:lang(es|en)/clientes', destination: '/:lang/acceso-clientes', permanent: true },

  // ============================================================
  // WORDPRESS CORE PATHS → home
  // ============================================================
  { source: '/wp-admin/:path*', destination: '/es', permanent: true },
  { source: '/wp-login.php', destination: '/es', permanent: true },
  { source: '/wp-content/:path*', destination: '/es', permanent: true },
  { source: '/wp-includes/:path*', destination: '/es', permanent: true },
  { source: '/wp-json/:path*', destination: '/es', permanent: true },
  { source: '/xmlrpc.php', destination: '/es', permanent: true },

  // WordPress feeds
  { source: '/feed', destination: '/es', permanent: true },
  { source: '/feed/:path*', destination: '/es', permanent: true },
  { source: '/comments/feed', destination: '/es', permanent: true },
  { source: '/:lang(es|en)/feed', destination: '/:lang', permanent: true },
  { source: '/:lang(es|en)/feed/:path*', destination: '/:lang', permanent: true },
  { source: '/:lang(es|en)/comments/feed', destination: '/:lang', permanent: true },

  // Author pages → attorney directory
  { source: '/author/:slug*', destination: '/es/abogados', permanent: true },
  { source: '/:lang(es|en)/author/:slug*', destination: '/:lang/abogados', permanent: true },

  // WordPress pagination
  { source: '/:lang(es|en)/blog/page/:page', destination: '/:lang/blog', permanent: true },
  { source: '/:lang(es|en)/page/:page', destination: '/:lang', permanent: true },
  { source: '/blog/page/:page', destination: '/es/blog', permanent: true },
  { source: '/page/:page', destination: '/es', permanent: true },

  // Tag pages
  { source: '/:lang(es|en)/tag/:slug*', destination: '/:lang/blog', permanent: true },
  { source: '/tag/:slug*', destination: '/es/blog', permanent: true },

  // ============================================================
  // ENGLISH PATH ALIASES → spanish slug equivalents
  // ============================================================
  { source: '/:lang(es|en)/about', destination: '/:lang/nosotros', permanent: true },
  { source: '/:lang(es|en)/about-us', destination: '/:lang/nosotros', permanent: true },

  // ── Añadidas el 2026-08-10 leyendo los 404 REALES de producción ──
  // No son slugs hipotéticos: son las rutas que estaban devolviendo 404 en las
  // últimas 24 horas, con su volumen. Varias ya tenían una variante cubierta
  // pero no la larga (existía /about-us y faltaba el slug completo del sitio
  // anterior, que es el que sigue enlazado desde fuera y el que más pega).
  { source: '/:lang(es|en)/about-us-manuel-solis-law-firm', destination: '/:lang/nosotros', permanent: true }, // 14/día
  { source: '/:lang(es|en)/locations-law-offices', destination: '/:lang/oficinas', permanent: true }, // 5/día
  { source: '/:lang(es|en)/locations', destination: '/:lang/oficinas', permanent: true },
  { source: '/:lang(es|en)/our-offices', destination: '/:lang/oficinas', permanent: true },
  { source: '/:lang(es|en)/team', destination: '/:lang/abogados', permanent: true },
  { source: '/:lang(es|en)/our-team', destination: '/:lang/abogados', permanent: true },
  { source: '/:lang(es|en)/staff', destination: '/:lang/abogados', permanent: true },
  { source: '/:lang(es|en)/reach-us', destination: '/:lang/consulta', permanent: true },
  { source: '/:lang(es|en)/get-in-touch', destination: '/:lang/consulta', permanent: true },
  { source: '/:lang(es|en)/info', destination: '/:lang/informacion/recursos', permanent: true },
  // Existía /manuel-solis-live-2 y no la versión sin sufijo, que es la que se pide.
  { source: '/:lang(es|en)/manuel-solis-live', destination: '/:lang', permanent: true },
  { source: '/:lang(es|en)/live', destination: '/:lang', permanent: true },
  { source: '/:lang(es|en)/abogados-de-inmigracion', destination: '/:lang/servicios/inmigracion', permanent: true },
  // El sitio no tiene una página de ciudadanía como servicio; el contenido vivo
  // sobre el tema está en el blog, así que se manda ahí y no a un genérico.
  {
    source: '/:lang(es|en)/como-se-puede-obtener-la-ciudadania-americana',
    destination: '/:lang/blog/ciudadania-en-espanol-reglas-50-20-55-15',
    permanent: true,
  },
  // Segmentos inventados colgando de una oficina real (/oficinas/chicago/contact,
  // y una URL malformada con "description:" pegado al slug). Se recoge el
  // sobrante en vez de dejar la ficha en 404.
  { source: '/:lang(es|en)/oficinas/:slug/:rest+', destination: '/:lang/oficinas/:slug', permanent: true },
  // Intención de contacto → /consulta (misma intención que /contacto), no /nosotros.
  { source: '/:lang(es|en)/contact', destination: '/:lang/consulta', permanent: true },
  { source: '/:lang(es|en)/contact-us', destination: '/:lang/consulta', permanent: true },
  { source: '/:lang(es|en)/services', destination: '/:lang/servicios', permanent: true },
  { source: '/:lang(es|en)/services/:slug*', destination: '/:lang/servicios', permanent: true },
  { source: '/:lang(es|en)/offices', destination: '/:lang/oficinas', permanent: true },
  { source: '/:lang(es|en)/attorneys', destination: '/:lang/abogados', permanent: true },
  { source: '/:lang(es|en)/lawyers', destination: '/:lang/abogados', permanent: true },
  { source: '/:lang(es|en)/lawyers/:slug', destination: '/:lang/abogados/:slug', permanent: true },
  { source: '/:lang(es|en)/testimonials', destination: '/:lang/testimonios', permanent: true },
  { source: '/:lang(es|en)/testimonials/:slug', destination: '/:lang/testimonios', permanent: true },
  { source: '/:lang(es|en)/privacy', destination: '/:lang/privacidad', permanent: true },
  { source: '/:lang(es|en)/privacy-policy', destination: '/:lang/privacidad', permanent: true },
  { source: '/:lang(es|en)/terms', destination: '/:lang/terminos', permanent: true },
  { source: '/:lang(es|en)/terms-of-service', destination: '/:lang/terminos', permanent: true },
  { source: '/:lang(es|en)/careers', destination: '/:lang/consulta', permanent: true },
  // /join-in eliminado (registro retirado): redirige a la consulta para no perder tráfico.
  { source: '/:lang(es|en)/join-in', destination: '/:lang/consulta', permanent: true },
  { source: '/join-in', destination: '/es/consulta', permanent: true },
  { source: '/:lang(es|en)/resources', destination: '/:lang/informacion/recursos', permanent: true },
  { source: '/:lang(es|en)/detained-clients', destination: '/:lang/clientes-detenidos', permanent: true },
  { source: '/:lang(es|en)/news', destination: '/:lang/blog', permanent: true },
  { source: '/:lang(es|en)/news/:slug*', destination: '/:lang/blog', permanent: true },
  { source: '/:lang(es|en)/home', destination: '/:lang', permanent: true },
  { source: '/:lang(es|en)/home/', destination: '/:lang', permanent: true },

  // ============================================================
  // FAQ legacy → /informacion/faq
  // ============================================================
  { source: '/preguntas-frecuentes', destination: '/es/informacion/faq', permanent: true },
  { source: '/preguntas-frecuentes/:slug*', destination: '/es/informacion/faq', permanent: true },
  { source: '/:lang(es|en)/preguntas-frecuentes', destination: '/:lang/informacion/faq', permanent: true },
  { source: '/:lang(es|en)/preguntas-frecuentes/:slug*', destination: '/:lang/informacion/faq', permanent: true },
  { source: '/faq', destination: '/es/informacion/faq', permanent: true },
  { source: '/faq/:slug*', destination: '/es/informacion/faq', permanent: true },
  { source: '/:lang(es|en)/faq', destination: '/:lang/informacion/faq', permanent: true },
  { source: '/:lang(es|en)/faq/:slug*', destination: '/:lang/informacion/faq', permanent: true },

  // ============================================================
  // NEWS / NOTICIAS legacy → /blog
  // ============================================================
  { source: '/noticias', destination: '/es/blog', permanent: true },
  { source: '/noticias/:slug*', destination: '/es/blog', permanent: true },
  { source: '/:lang(es|en)/noticias', destination: '/:lang/blog', permanent: true },
  { source: '/:lang(es|en)/noticias/:slug*', destination: '/:lang/blog', permanent: true },
  { source: '/news', destination: '/es/blog', permanent: true },
  { source: '/news/:slug*', destination: '/es/blog', permanent: true },

  // ============================================================
  // LEGAL PROTECTION articles legacy → /blog
  // ============================================================
  { source: '/proteccion-legal-para-migrantes', destination: '/es/blog', permanent: true },
  { source: '/proteccion-legal-para-migrantes/:slug*', destination: '/es/blog', permanent: true },
  { source: '/proteccion-legal-para-migrantes-en/:slug*', destination: '/es/blog', permanent: true },
  { source: '/:lang(es|en)/proteccion-legal-para-migrantes', destination: '/:lang/blog', permanent: true },
  { source: '/:lang(es|en)/proteccion-legal-para-migrantes/:slug*', destination: '/:lang/blog', permanent: true },
  { source: '/:lang(es|en)/proteccion-legal-para-migrantes-en/:slug*', destination: '/:lang/blog', permanent: true },

  // ============================================================
  // MIGRANT RIGHTS articles → /blog (catch-all subpaths)
  // ============================================================
  { source: '/derechos-de-migrantes/:slug*', destination: '/es/blog', permanent: true },
  { source: '/:lang(es|en)/derechos-de-migrantes/:slug*', destination: '/:lang/blog', permanent: true },

  // ============================================================
  // PROCESO MIGRATORIO / REQUISITOS articles → /blog
  // ============================================================
  { source: '/proceso-migratorio', destination: '/es/blog', permanent: true },
  { source: '/proceso-migratorio/:slug*', destination: '/es/blog', permanent: true },
  { source: '/:lang(es|en)/proceso-migratorio', destination: '/:lang/blog', permanent: true },
  { source: '/:lang(es|en)/proceso-migratorio/:slug*', destination: '/:lang/blog', permanent: true },
  { source: '/requisitos-de-visas', destination: '/es/blog', permanent: true },
  { source: '/requisitos-de-visas/:slug*', destination: '/es/blog', permanent: true },
  { source: '/:lang(es|en)/requisitos-de-visas', destination: '/:lang/blog', permanent: true },
  { source: '/:lang(es|en)/requisitos-de-visas/:slug*', destination: '/:lang/blog', permanent: true },

  // ============================================================
  // CATEGORY LEGACY (some are valid pages, some need fallback)
  // ============================================================
  { source: '/category/proteccion-legal-para-migrantes/page/:page*', destination: '/es/blog', permanent: true },
  { source: '/category/derechos-de-migrantes/page/:page*', destination: '/es/blog', permanent: true },
  { source: '/category/proceso-migratorio', destination: '/es/blog', permanent: true },
  { source: '/category/proceso-migratorio/:slug*', destination: '/es/blog', permanent: true },
  { source: '/category/requisitos-de-visas', destination: '/es/blog', permanent: true },
  { source: '/category/requisitos-de-visas/:slug*', destination: '/es/blog', permanent: true },
  { source: '/:lang(es|en)/category/proceso-migratorio', destination: '/:lang/blog', permanent: true },
  { source: '/:lang(es|en)/category/requisitos-de-visas', destination: '/:lang/blog', permanent: true },
  { source: '/:lang(es|en)/category/proteccion-legal-para-migrantes/page/:page*', destination: '/:lang/blog', permanent: true },
  { source: '/:lang(es|en)/category/derechos-de-migrantes/page/:page*', destination: '/:lang/blog', permanent: true },

  // ============================================================
  // SERVICE-AREA LEGACY (areas-servicio, service-areas, legal-areas)
  // ============================================================
  // Specific high-value mappings (Spanish, no locale prefix)
  { source: '/areas-servicio/asilo', destination: '/es/servicios/asilo', permanent: true },
  { source: '/areas-servicio/u-visa-vawa', destination: '/es/servicios/visa-u', permanent: true },
  { source: '/areas-servicio/defensa-contra-la-deportacion', destination: '/es/servicios/defensa-deportacion', permanent: true },
  { source: '/areas-servicio/naturalizacion', destination: '/es/servicios/inmigracion', permanent: true },
  { source: '/areas-servicio/peticion-de-residencia-por-parte-de-un-familiar', destination: '/es/servicios/inmigracion', permanent: true },
  { source: '/areas-servicio/peticion-de-residencia-por-parte-del-empleador', destination: '/es/servicios/inmigracion', permanent: true },
  { source: '/areas-servicio/accidentes-de-aviones-y-helicopteros', destination: '/es/servicios/accidentes', permanent: true },
  { source: '/areas-servicio/accidentes-de-vehiculos-de-18-ruedas-trailers', destination: '/es/servicios/accidentes', permanent: true },
  { source: '/areas-servicio/negligencia-medica', destination: '/es/servicios/accidentes', permanent: true },
  { source: '/areas-servicio/explosion-de-plantas-industriales', destination: '/es/servicios/accidentes', permanent: true },
  { source: '/areas-servicio/violencia-domestica', destination: '/es/servicios/familia', permanent: true },
  { source: '/areas-servicio/divorcios', destination: '/es/servicios/familia', permanent: true },
  { source: '/areas-servicio/custodia-de-los-hijos', destination: '/es/servicios/familia', permanent: true },
  { source: '/areas-servicio/manutencion-de-los-hijos', destination: '/es/servicios/familia', permanent: true },
  { source: '/areas-servicio/manejo-en-estado-de-ebriedad', destination: '/es/servicios/ley-criminal', permanent: true },
  { source: '/areas-servicio/asalto', destination: '/es/servicios/ley-criminal', permanent: true },
  { source: '/areas-servicio/robo', destination: '/es/servicios/ley-criminal', permanent: true },
  { source: '/areas-servicio/prostitucion', destination: '/es/servicios/ley-criminal', permanent: true },
  { source: '/areas-servicio', destination: '/es/servicios', permanent: true },
  { source: '/areas-servicio/:slug*', destination: '/es/servicios', permanent: true },

  // /:lang/areas-servicio/* mirror
  { source: '/:lang(es|en)/areas-servicio/asilo', destination: '/:lang/servicios/asilo', permanent: true },
  { source: '/:lang(es|en)/areas-servicio/u-visa-vawa', destination: '/:lang/servicios/visa-u', permanent: true },
  { source: '/:lang(es|en)/areas-servicio/defensa-contra-la-deportacion', destination: '/:lang/servicios/defensa-deportacion', permanent: true },
  { source: '/:lang(es|en)/areas-servicio/naturalizacion', destination: '/:lang/servicios/inmigracion', permanent: true },
  { source: '/:lang(es|en)/areas-servicio/peticion-de-residencia-por-parte-de-un-familiar', destination: '/:lang/servicios/inmigracion', permanent: true },
  { source: '/:lang(es|en)/areas-servicio/peticion-de-residencia-por-parte-del-empleador', destination: '/:lang/servicios/inmigracion', permanent: true },
  { source: '/:lang(es|en)/areas-servicio/accidentes-de-aviones-y-helicopteros', destination: '/:lang/servicios/accidentes', permanent: true },
  { source: '/:lang(es|en)/areas-servicio/accidentes-de-vehiculos-de-18-ruedas-trailers', destination: '/:lang/servicios/accidentes', permanent: true },
  { source: '/:lang(es|en)/areas-servicio/negligencia-medica', destination: '/:lang/servicios/accidentes', permanent: true },
  { source: '/:lang(es|en)/areas-servicio/explosion-de-plantas-industriales', destination: '/:lang/servicios/accidentes', permanent: true },
  { source: '/:lang(es|en)/areas-servicio/violencia-domestica', destination: '/:lang/servicios/familia', permanent: true },
  { source: '/:lang(es|en)/areas-servicio/theft', destination: '/:lang/servicios/ley-criminal', permanent: true },
  { source: '/:lang(es|en)/areas-servicio/child-custody', destination: '/:lang/servicios/familia', permanent: true },
  { source: '/:lang(es|en)/areas-servicio/child-support', destination: '/:lang/servicios/familia', permanent: true },
  { source: '/:lang(es|en)/areas-servicio/family', destination: '/:lang/servicios/familia', permanent: true },
  { source: '/:lang(es|en)/areas-servicio/assault', destination: '/:lang/servicios/ley-criminal', permanent: true },
  { source: '/:lang(es|en)/areas-servicio', destination: '/:lang/servicios', permanent: true },
  { source: '/:lang(es|en)/areas-servicio/:slug*', destination: '/:lang/servicios', permanent: true },

  // /:lang/service-areas/* (English style)
  { source: '/:lang(es|en)/service-areas', destination: '/:lang/servicios', permanent: true },
  { source: '/:lang(es|en)/service-areas/asilo', destination: '/:lang/servicios/asilo', permanent: true },
  { source: '/:lang(es|en)/service-areas/asylum', destination: '/:lang/servicios/asilo', permanent: true },
  { source: '/:lang(es|en)/service-areas/u-visa-vawa', destination: '/:lang/servicios/visa-u', permanent: true },
  { source: '/:lang(es|en)/service-areas/naturalizacion', destination: '/:lang/servicios/inmigracion', permanent: true },
  { source: '/:lang(es|en)/service-areas/naturalization', destination: '/:lang/servicios/inmigracion', permanent: true },
  { source: '/:lang(es|en)/service-areas/peticion-de-residencia-por-parte-de-un-familiar', destination: '/:lang/servicios/inmigracion', permanent: true },
  { source: '/:lang(es|en)/service-areas/peticion-de-residencia-por-parte-del-empleador', destination: '/:lang/servicios/inmigracion', permanent: true },
  { source: '/:lang(es|en)/service-areas/accidentes-de-vehiculos-de-18-ruedas-trailers', destination: '/:lang/servicios/accidentes', permanent: true },
  { source: '/:lang(es|en)/service-areas/explosion-de-plantas-industriales', destination: '/:lang/servicios/accidentes', permanent: true },
  { source: '/:lang(es|en)/service-areas/accidentes-automovilisticos', destination: '/:lang/servicios/accidentes', permanent: true },
  { source: '/:lang(es|en)/service-areas/negligencia-medica', destination: '/:lang/servicios/accidentes', permanent: true },
  { source: '/:lang(es|en)/service-areas/accidentes-de-aviones-y-helicopteros', destination: '/:lang/servicios/accidentes', permanent: true },
  { source: '/:lang(es|en)/service-areas/family', destination: '/:lang/servicios/familia', permanent: true },
  { source: '/:lang(es|en)/service-areas/child-support', destination: '/:lang/servicios/familia', permanent: true },
  { source: '/:lang(es|en)/service-areas/child-custody', destination: '/:lang/servicios/familia', permanent: true },
  { source: '/:lang(es|en)/service-areas/theft', destination: '/:lang/servicios/ley-criminal', permanent: true },
  { source: '/:lang(es|en)/service-areas/assault', destination: '/:lang/servicios/ley-criminal', permanent: true },
  { source: '/:lang(es|en)/service-areas/planificacion-patrimonial', destination: '/:lang/servicios', permanent: true },
  { source: '/:lang(es|en)/service-areas/:slug*', destination: '/:lang/servicios', permanent: true },

  // /:lang/legal-areas/* (English style)
  { source: '/:lang(es|en)/legal-areas', destination: '/:lang/servicios', permanent: true },
  { source: '/:lang(es|en)/legal-areas/immigration', destination: '/:lang/servicios/inmigracion', permanent: true },
  { source: '/:lang(es|en)/legal-areas/family', destination: '/:lang/servicios/familia', permanent: true },
  { source: '/:lang(es|en)/legal-areas/criminal-law', destination: '/:lang/servicios/ley-criminal', permanent: true },
  { source: '/:lang(es|en)/legal-areas/insurance', destination: '/:lang/servicios/seguros', permanent: true },
  { source: '/:lang(es|en)/legal-areas/accidents', destination: '/:lang/servicios/accidentes', permanent: true },
  { source: '/:lang(es|en)/legal-areas/windstorm-claims', destination: '/:lang/servicios/seguros', permanent: true },
  { source: '/:lang(es|en)/legal-areas/:slug*', destination: '/:lang/servicios', permanent: true },

  // ============================================================
  // OLD SERVICE SLUGS (windstorm/tornado/hailstorm/etc.)
  // ============================================================
  { source: '/servicios/hailstorm-claims', destination: '/es/servicios/seguros', permanent: true },
  { source: '/servicios/tornado-claims', destination: '/es/servicios/seguros', permanent: true },
  { source: '/servicios/windstorm-claims', destination: '/es/servicios/seguros', permanent: true },
  { source: '/servicios/planificacion-patrimonial', destination: '/es/servicios', permanent: true },
  { source: '/servicios/planificacion', destination: '/es/servicios', permanent: true },
  { source: '/:lang(es|en)/servicios/hailstorm-claims', destination: '/:lang/servicios/seguros', permanent: true },
  { source: '/:lang(es|en)/servicios/tornado-claims', destination: '/:lang/servicios/seguros', permanent: true },
  { source: '/:lang(es|en)/servicios/windstorm-claims', destination: '/:lang/servicios/seguros', permanent: true },
  { source: '/:lang(es|en)/servicios/planificacion-patrimonial', destination: '/:lang/servicios', permanent: true },
  { source: '/:lang(es|en)/servicios/planificacion', destination: '/:lang/servicios', permanent: true },

  // ============================================================
  // STANDALONE VISA PAGES → matching service pages
  // ============================================================
  { source: '/visa-vawa', destination: '/es/servicios/vawa', permanent: true },
  { source: '/visa-t', destination: '/es/servicios/visa-u', permanent: true },
  { source: '/visa-sijs', destination: '/es/servicios/inmigracion', permanent: true },
  { source: '/visa-juvenil-sij', destination: '/es/servicios/inmigracion', permanent: true },
  { source: '/:lang(es|en)/visa-vawa', destination: '/:lang/servicios/vawa', permanent: true },
  { source: '/:lang(es|en)/visa-t', destination: '/:lang/servicios/visa-u', permanent: true },
  { source: '/:lang(es|en)/visa-sijs', destination: '/:lang/servicios/inmigracion', permanent: true },
  { source: '/:lang(es|en)/visa-juvenil-sij', destination: '/:lang/servicios/inmigracion', permanent: true },

  // ============================================================
  // OFFICE LEGACY SLUGS
  // ============================================================
  { source: '/oficinas/houston', destination: '/es/oficinas/houston-principal', permanent: true },
  { source: '/oficinas/houston-principal-office', destination: '/es/oficinas/houston-principal', permanent: true },
  { source: '/oficinas/houston-principal-office-4', destination: '/es/oficinas/houston-principal', permanent: true },
  { source: '/oficinas/houston-principal-office-5', destination: '/es/oficinas/houston-principal', permanent: true },
  { source: '/oficinas/houston-navigation', destination: '/es/oficinas/houston-principal', permanent: true },
  { source: '/oficinas/airways', destination: '/es/oficinas/houston-principal', permanent: true },
  { source: '/oficinas/los-angeles', destination: '/es/oficinas/losangeles', permanent: true },
  { source: '/oficinas/abogados-inmigracion-los-angeles', destination: '/es/oficinas/losangeles', permanent: true },
  { source: '/oficinas/denver', destination: '/es/oficinas/arvada', permanent: true },
  { source: '/oficinas/memphis-office', destination: '/es/oficinas/memphis', permanent: true },
  // /:lang variants
  { source: '/:lang(es|en)/oficinas/houston', destination: '/:lang/oficinas/houston-principal', permanent: true },
  { source: '/:lang(es|en)/oficinas/houston-principal-office', destination: '/:lang/oficinas/houston-principal', permanent: true },
  { source: '/:lang(es|en)/oficinas/houston-navigation', destination: '/:lang/oficinas/houston-principal', permanent: true },
  { source: '/:lang(es|en)/oficinas/airways', destination: '/:lang/oficinas/houston-principal', permanent: true },
  { source: '/:lang(es|en)/oficinas/los-angeles', destination: '/:lang/oficinas/losangeles', permanent: true },
  { source: '/:lang(es|en)/oficinas/denver', destination: '/:lang/oficinas/arvada', permanent: true },
  { source: '/:lang(es|en)/oficinas/memphis-office', destination: '/:lang/oficinas/memphis', permanent: true },
  { source: '/:lang(es|en)/oficinas/abogados-inmigracion-los-angeles', destination: '/:lang/oficinas/losangeles', permanent: true },
  // /:lang/offices/* (English alias) — see also line 113 above
  { source: '/:lang(es|en)/offices/houston-principal-office', destination: '/:lang/oficinas/houston-principal', permanent: true },
  { source: '/:lang(es|en)/offices/houston', destination: '/:lang/oficinas/houston-principal', permanent: true },
  { source: '/:lang(es|en)/offices/dallas', destination: '/:lang/oficinas/dallas', permanent: true },
  { source: '/:lang(es|en)/offices/chicago', destination: '/:lang/oficinas/chicago', permanent: true },
  { source: '/:lang(es|en)/offices/harlingen', destination: '/:lang/oficinas/harlingen', permanent: true },
  { source: '/:lang(es|en)/offices/memphis', destination: '/:lang/oficinas/memphis', permanent: true },
  { source: '/:lang(es|en)/offices/memphis-office', destination: '/:lang/oficinas/memphis', permanent: true },
  { source: '/:lang(es|en)/offices/los-angeles', destination: '/:lang/oficinas/losangeles', permanent: true },
  { source: '/:lang(es|en)/offices/el-paso', destination: '/:lang/oficinas/el-paso', permanent: true },
  { source: '/:lang(es|en)/offices/arvada', destination: '/:lang/oficinas/arvada', permanent: true },
  { source: '/:lang(es|en)/offices/denver', destination: '/:lang/oficinas/arvada', permanent: true },
  { source: '/:lang(es|en)/offices/:slug*', destination: '/:lang/oficinas', permanent: true },
  // English standalone city
  { source: '/:lang(es|en)/los-angeles', destination: '/:lang/oficinas/losangeles', permanent: true },

  // ============================================================
  // ATTORNEY LEGACY: /:lang/attorneys/:slug → /:lang/abogados/:slug
  // ============================================================
  { source: '/:lang(es|en)/attorneys/:slug', destination: '/:lang/abogados/:slug', permanent: true },
  ...defunctAttorneyRedirects,

  // ============================================================
  // INDIVIDUAL TESTIMONIAL SLUGS (no individual pages exist anymore)
  // ============================================================
  { source: '/testimonios/:slug', destination: '/es/testimonios', permanent: true },
  { source: '/:lang(es|en)/testimonios/:slug', destination: '/:lang/testimonios', permanent: true },
  // /:lang/testimonials/:slug — see line 118 above (deduplicated)

  // ============================================================
  // PRIVACY POLICY VARIANTS
  // ============================================================
  { source: '/politica-de-privacidad', destination: '/es/privacidad', permanent: true },
  { source: '/:lang(es|en)/politica-de-privacidad', destination: '/:lang/privacidad', permanent: true },

  // ============================================================
  // RECURSOS / TERMS VARIANTS
  // ============================================================
  { source: '/recursos', destination: '/es/informacion/recursos', permanent: true },
  { source: '/:lang(es|en)/recursos', destination: '/:lang/informacion/recursos', permanent: true },
  { source: '/terminos-y-condiciones', destination: '/es/terminos', permanent: true },
  { source: '/:lang(es|en)/terminos-y-condiciones', destination: '/:lang/terminos', permanent: true },

  // ============================================================
  // AREAS LEGALES
  // ============================================================
  { source: '/areas-legales', destination: '/es/servicios', permanent: true },
  { source: '/:lang(es|en)/areas-legales', destination: '/:lang/servicios', permanent: true },

  // ============================================================
  // LANDING PAGES → home or relevant service
  // (Use regex-constrained single segment to avoid path-to-regexp
  //  ambiguity with hyphen-prefixed parameters.)
  // ============================================================
  /**
   * Destinos explícitos ANTES del comodín.
   *
   * El comodín de abajo mandaba TODAS las landings de campaña a la portada, y
   * varias de esas URLs siguen indexadas. La peor era
   * `/landing-google-detainees`: la consulta de mayor intención de contratación
   * que recibe el despacho —alguien con un familiar detenido buscando ahora— y
   * aterrizaba en la portada genérica en vez de en la página de detenidos.
   * Google trata un redirect hacia una página no equivalente como un soft-404 y
   * deja de pasar relevancia, así que el comodín estaba tirando la señal de
   * cinco URLs que ya tenían posiciones.
   *
   * El orden importa: en next.config.ts gana la primera regla que casa, así que
   * estas van antes que el comodín. El comodín se queda como red de seguridad
   * para las landings que no tienen equivalente.
   */
  { source: '/landing-google-detainees', destination: '/es/clientes-detenidos', permanent: true },
  { source: '/:lang(es|en)/landing-google-detainees', destination: '/:lang/clientes-detenidos', permanent: true },
  { source: '/landing-google-asylum-apply', destination: '/es/servicios/asilo', permanent: true },
  { source: '/:lang(es|en)/landing-google-asylum-apply', destination: '/:lang/servicios/asilo', permanent: true },
  { source: '/landing-google-citizenship-apply', destination: '/es/servicios/inmigracion', permanent: true },
  { source: '/:lang(es|en)/landing-google-citizenship-apply', destination: '/:lang/servicios/inmigracion', permanent: true },
  { source: '/landing-google-personal-injury-lawyer', destination: '/es/servicios/accidentes', permanent: true },
  { source: '/:lang(es|en)/landing-google-personal-injury-lawyer', destination: '/:lang/servicios/accidentes', permanent: true },
  // Solo la variante sin idioma: la de `/:lang/` ya existía más abajo con este
  // mismo destino, y `landing-abogado-*` no lo captura el comodín de
  // `landing-google-*`, así que su posición no importa.
  { source: '/landing-abogado-de-inmigracion', destination: '/es/servicios/inmigracion', permanent: true },

  { source: '/:path(landing-google-.+)', destination: '/es', permanent: true },
  { source: '/:path(landing-facebook-.+)', destination: '/es', permanent: true },
  { source: '/:path(landing-fb-.+)', destination: '/es', permanent: true },
  { source: '/:path(landing-page-fb-.+)', destination: '/es', permanent: true },
  { source: '/landing-visau', destination: '/es/servicios/visa-u', permanent: true },
  { source: '/landing-visa-u', destination: '/es/servicios/visa-u', permanent: true },
  { source: '/:lang(es|en)/:path(landing-google-.+)', destination: '/:lang', permanent: true },
  { source: '/:lang(es|en)/:path(landing-facebook-.+)', destination: '/:lang', permanent: true },
  { source: '/:lang(es|en)/:path(landing-fb-.+)', destination: '/:lang', permanent: true },
  { source: '/:lang(es|en)/:path(landing-page-fb-.+)', destination: '/:lang', permanent: true },
  { source: '/:lang(es|en)/landing-visau', destination: '/:lang/servicios/visa-u', permanent: true },
  { source: '/:lang(es|en)/landing-visa-u', destination: '/:lang/servicios/visa-u', permanent: true },
  { source: '/:lang(es|en)/landing-abogado-de-inmigracion', destination: '/:lang/servicios/inmigracion', permanent: true },

  // ============================================================
  // LEAD-QUALIFICATION pages → home
  // ============================================================
  { source: '/:path(abogado-de-inmigracion-calificacion-leads-.+)', destination: '/es', permanent: true },
  { source: '/manuel-solis-calificacion-leads', destination: '/es', permanent: true },
  { source: '/:lang(es|en)/:path(abogado-de-inmigracion-calificacion-leads-.+)', destination: '/:lang', permanent: true },

  // ============================================================
  // THANK-YOU pages
  // ============================================================
  { source: '/gracias', destination: '/es', permanent: true },
  { source: '/:path(gracias-por-completar-.+)', destination: '/es', permanent: true },
  { source: '/:lang(es|en)/gracias', destination: '/:lang', permanent: true },
  { source: '/:lang(es|en)/:path(gracias-por-completar-.+)', destination: '/:lang', permanent: true },

  // ============================================================
  // SOCIAL ALIASES
  // ============================================================
  { source: '/youtube', destination: 'https://www.youtube.com/@ManuelSolisLawFirm', permanent: true, basePath: false },
  { source: '/instagram', destination: 'https://www.instagram.com/maboralaw/', permanent: true, basePath: false },
  { source: '/facebook', destination: 'https://www.facebook.com/ManuelSolisLawFirm', permanent: true, basePath: false },
  { source: '/tiktok', destination: 'https://www.tiktok.com/@manuelsolislawfirm', permanent: true, basePath: false },
  { source: '/telemundo', destination: '/es', permanent: true },
  { source: '/manuel-solis-youtube', destination: 'https://www.youtube.com/@ManuelSolisLawFirm', permanent: true, basePath: false },

  // ============================================================
  // QR / brochure / promo URLs
  // ============================================================
  { source: '/qr-pantallas-oficinas', destination: '/es/oficinas', permanent: true },
  { source: '/brochure-servicios-legales', destination: '/es/servicios', permanent: true },
  { source: '/:path(brochure-servicios-legales-.+)', destination: '/es/servicios', permanent: true },

  // ============================================================
  // MISC LEGACY
  // ============================================================
  { source: '/new-home', destination: '/es', permanent: true },
  { source: '/:lang(es|en)/new-home', destination: '/:lang', permanent: true },
  { source: '/:lang(es|en)/manuel-solis-live-2', destination: '/:lang', permanent: true },
];
