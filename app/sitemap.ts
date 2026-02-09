import { MetadataRoute } from 'next'

// Tu dominio oficial
const BASE_URL = 'https://www.manuelsolis.com'

export default function sitemap(): MetadataRoute.Sitemap {
  // Lista exhaustiva basada en la estructura de archivos de tu proyecto
  const routes = [
    '', // Home
    '/nosotros',
    '/abogados',
    '/clientes',
    '/clientes-detenidos',
    '/join-in',
    '/privacidad',
    '/sms-terminos',
    '/Testimonios', // Nota: Está con mayúscula en tus carpetas
    
    // Servicios
    '/servicios/inmigracion',
    '/servicios/accidentes',
    '/servicios/ley-criminal',
    '/servicios/familia',
    '/servicios/seguros',
    '/servicios/visa-e2',

    // Información
    '/informacion/faq',
    '/informacion/nosotros',
    '/informacion/noticias',
    '/informacion/recursos',

    // Categorías
    '/category/derechos-de-migrantes',
    '/category/proteccion-legal-para-migrantes',

    // Blog (Posts específicos detectados)
    '/blog',
    '/blog/VAWA_para_hombres_maltratados_por_pareja_ciudadana_o_residente',
    '/blog/VAWA_para_padres_Maltrato_de_hijos_ciudadanos_estadounidenses',
    '/blog/Visa_T_trabajo_forzado_por_deuda_con_coyote',
    '/blog/perdon_i_192_como_arreglar_con_la_visa_u_si_tienes_deportaciones_previas',
    '/blog/permiso_de_trabajo_visa_u',
    '/blog/que_hacer_si_la_policia_no_firma_la_certificacion_visa_u',

    // Oficinas (Detectadas en tu estructura)
    '/oficinas/airways',
    '/oficinas/arvada',
    '/oficinas/chicago',
    '/oficinas/dallas',
    '/oficinas/el-paso',
    '/oficinas/harlingen',
    '/oficinas/houston-bellaire',
    '/oficinas/houston-navigation',
    '/oficinas/houston-principal',
    '/oficinas/kirby',
    '/oficinas/league-city',
    '/oficinas/losangeles',
    '/oficinas/main-st',
    '/oficinas/memphis',
    '/oficinas/north-loop',
    '/oficinas/northchase',
  ]

  const languages = ['es', 'en']

  const sitemapEntries = routes.flatMap((route) => 
    languages.map((lang) => ({
      url: `${BASE_URL}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  )

  return sitemapEntries
}