import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.manuelsolis.com'

type SitemapEntry = {
  route: string;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  lastModified?: string; // ISO date string
};

const routes: SitemapEntry[] = [
  // Home — highest priority
  { route: '', priority: 1.0, changeFrequency: 'weekly', lastModified: '2025-04-04' },

  // Hub pages
  { route: '/servicios', priority: 0.9, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/oficinas', priority: 0.8, changeFrequency: 'monthly', lastModified: '2025-03-01' },

  // Services — high priority
  { route: '/servicios/inmigracion', priority: 0.9, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/servicios/accidentes', priority: 0.9, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/servicios/ley-criminal', priority: 0.9, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/servicios/familia', priority: 0.9, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/servicios/seguros', priority: 0.9, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/servicios/visa-e2', priority: 0.9, changeFrequency: 'monthly', lastModified: '2025-03-01' },

  // Immigration sub-services — high priority
  { route: '/servicios/visa-u', priority: 0.85, changeFrequency: 'monthly', lastModified: '2026-03-23' },
  { route: '/servicios/vawa', priority: 0.85, changeFrequency: 'monthly', lastModified: '2026-03-23' },
  { route: '/servicios/defensa-deportacion', priority: 0.85, changeFrequency: 'monthly', lastModified: '2026-03-23' },
  { route: '/servicios/asilo', priority: 0.85, changeFrequency: 'monthly', lastModified: '2026-03-23' },

  // Offices — high priority
  { route: '/oficinas/houston-principal', priority: 0.8, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/oficinas/main-st', priority: 0.8, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/oficinas/north-loop', priority: 0.8, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/oficinas/northchase', priority: 0.8, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/oficinas/houston-bellaire', priority: 0.8, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/oficinas/kirby', priority: 0.8, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/oficinas/houston-accidentes', priority: 0.8, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/oficinas/dallas', priority: 0.8, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/oficinas/el-paso', priority: 0.8, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/oficinas/harlingen', priority: 0.8, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/oficinas/chicago', priority: 0.8, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/oficinas/losangeles', priority: 0.8, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/oficinas/arvada', priority: 0.8, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/oficinas/memphis', priority: 0.8, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/oficinas/league-city', priority: 0.8, changeFrequency: 'monthly', lastModified: '2025-03-01' },

  // Blog posts — dates match publication dates
  { route: '/blog', priority: 0.7, changeFrequency: 'weekly', lastModified: '2025-04-04' },
  { route: '/blog/asilo_frontera_2026_puerto_entrada_vs_cruce', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-04-04' },
  { route: '/blog/entrevista_matrimonio_uscis_senales_alerta', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-04-01' },
  { route: '/blog/ciudadania_en_espanol_reglas_50_20_55_15', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-03-28' },
  { route: '/blog/marihuana_dui_buen_caracter_moral_inmigracion', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-03-24' },
  { route: '/blog/perdon_i601a_arreglar_papeles_entrada_ilegal', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-03-20' },
  { route: '/blog/estatus_juvenil_sijs_residencia_jovenes_abandonados', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-03-17' },
  { route: '/blog/foia_migratoria_pedir_record_antes_de_aplicar', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-03-12' },
  { route: '/blog/residencia_laboral_eb3_ley_245i_entrada_indocumentada', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-03-08' },
  { route: '/blog/advance_parole_2026_viajar_con_daca_tps_visa_u', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-03-05' },
  { route: '/blog/ley_de_los_10_anos_cancelacion_de_deportacion', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-03-02' },
  { route: '/blog/Visa_U_y_VAWA_incluir_hijos_y_nuevos_esposos_derivados', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-02-16' },
  { route: '/blog/Formulario_G28_Cambiar_Abogado_Inmigracion', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-02-12' },
  { route: '/blog/Frenar_deportacion_inminente_con_solicitud_de_Visa_Humanitaria', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-02-10' },
  { route: '/blog/Visa_T_trabajo_forzado_por_deuda_con_coyote', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-02-03' },
  { route: '/blog/VAWA_para_hombres_maltratados_por_pareja_ciudadana_o_residente', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-01-30' },
  { route: '/blog/VAWA_para_padres_Maltrato_de_hijos_ciudadanos_estadounidenses', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-01-28' },
  { route: '/blog/perdon_i_192_como_arreglar_con_la_visa_u_si_tienes_deportaciones_previas', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-01-23' },
  { route: '/blog/que_hacer_si_la_policia_no_firma_la_certificacion_visa_u', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-01-20' },
  { route: '/blog/permiso_de_trabajo_visa_u', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-01-16' },

  // Key pages
  { route: '/nosotros', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/abogados', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/Testimonios', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/clientes', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/clientes-detenidos', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/join-in', priority: 0.6, changeFrequency: 'monthly', lastModified: '2025-03-01' },

  // Landing pages
  { route: '/inversionistas', priority: 0.8, changeFrequency: 'monthly', lastModified: '2025-03-01' },

  // Trust / Compliance
  { route: '/politica-editorial', priority: 0.4, changeFrequency: 'yearly', lastModified: '2025-03-20' },

  // Info / Legal — lower priority
  { route: '/informacion/faq', priority: 0.5, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/informacion/recursos', priority: 0.5, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/informacion/noticias', priority: 0.5, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/privacidad', priority: 0.3, changeFrequency: 'yearly', lastModified: '2025-01-01' },
  { route: '/sms-terminos', priority: 0.3, changeFrequency: 'yearly', lastModified: '2025-01-01' },

  // Categories
  { route: '/category/derechos-de-migrantes', priority: 0.5, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/category/proteccion-legal-para-migrantes', priority: 0.5, changeFrequency: 'monthly', lastModified: '2025-03-01' },
];

const languages = ['en', 'es'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((entry) =>
    languages.map((lang) => ({
      url: `${BASE_URL}/${lang}${entry.route}`,
      lastModified: entry.lastModified ? new Date(entry.lastModified) : new Date('2025-03-01'),
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: {
        languages: Object.fromEntries(
          languages.map((l) => [l, `${BASE_URL}/${l}${entry.route}`])
        ),
      },
    }))
  );
}
