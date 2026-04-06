import { MetadataRoute } from 'next'
import { attorneys } from './lib/attorneyData'
import { LANDING_PAGES } from './lib/cityServiceData'

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
  { route: '/blog/tps-2026-paises-elegibles-renovacion', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-04-10' },
  { route: '/blog/crimenes-deportacion-vileza-moral', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-04-14' },
  { route: '/blog/rfe-responder-evidencia-uscis', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-04-18' },
  { route: '/blog/barras-3-10-anos-presencia-ilegal', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-04-22' },
  { route: '/blog/accidente-auto-indocumentado-derechos', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-04-26' },
  { route: '/blog/i-864-patrocinador-ingreso-minimo', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-04-30' },
  { route: '/blog/visa-k1-prometido-requisitos', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-05-04' },
  { route: '/blog/entrevista-inmigracion-errores-evitar', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-05-08' },
  { route: '/blog/familias-estatus-mixto-opciones', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-05-12' },
  { route: '/blog/fraude-notarios-inmigracion', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-05-16' },
  { route: '/blog/asilo-frontera-2026-puerto-entrada-vs-cruce', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-04-04' },
  { route: '/blog/entrevista-matrimonio-uscis-senales-alerta', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-04-01' },
  { route: '/blog/ciudadania-en-espanol-reglas-50-20-55-15', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-03-28' },
  { route: '/blog/marihuana-dui-buen-caracter-moral-inmigracion', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-03-24' },
  { route: '/blog/perdon-i601a-arreglar-papeles-entrada-ilegal', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-03-20' },
  { route: '/blog/estatus-juvenil-sijs-residencia-jovenes-abandonados', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-03-17' },
  { route: '/blog/foia-migratoria-pedir-record-antes-de-aplicar', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-03-12' },
  { route: '/blog/residencia-laboral-eb3-ley-245i-entrada-indocumentada', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-03-08' },
  { route: '/blog/advance-parole-2026-viajar-con-daca-tps-visa-u', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-03-05' },
  { route: '/blog/ley-de-los-10-anos-cancelacion-de-deportacion', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-03-02' },
  { route: '/blog/visa-u-y-vawa-incluir-hijos-y-nuevos-esposos-derivados', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-02-16' },
  { route: '/blog/formulario-g28-cambiar-abogado-inmigracion', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-02-12' },
  { route: '/blog/frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-02-10' },
  { route: '/blog/visa-t-trabajo-forzado-por-deuda-con-coyote', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-02-03' },
  { route: '/blog/vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-01-30' },
  { route: '/blog/vawa-para-padres-maltrato-de-hijos-ciudadanos-estadounidenses', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-01-28' },
  { route: '/blog/perdon-i-192-como-arreglar-con-la-visa-u-si-tienes-deportaciones-previas', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-01-23' },
  { route: '/blog/que-hacer-si-la-policia-no-firma-la-certificacion-visa-u', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-01-20' },
  { route: '/blog/permiso-de-trabajo-visa-u', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-01-16' },

  // Key pages
  { route: '/nosotros', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/abogados', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-03-01' },
  { route: '/testimonios', priority: 0.7, changeFrequency: 'monthly', lastModified: '2025-03-01' },
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
  const staticEntries = routes.flatMap((entry) =>
    languages.map((lang) => ({
      url: `${BASE_URL}/${lang}${entry.route}`,
      lastModified: entry.lastModified ? new Date(entry.lastModified) : new Date('2025-03-01'),
      changeFrequency: entry.changeFrequency as MetadataRoute.Sitemap[number]['changeFrequency'],
      priority: entry.priority,
      alternates: {
        languages: Object.fromEntries(
          languages.map((l) => [l, `${BASE_URL}/${l}${entry.route}`])
        ),
      },
    }))
  );

  // City × Service landing pages (25 pages × 2 languages = 50 entries)
  const cityServiceEntries = LANDING_PAGES.flatMap((page) =>
    languages.map((lang) => ({
      url: `${BASE_URL}/${lang}/${page.slug}`,
      lastModified: new Date('2026-03-25'),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
      alternates: {
        languages: Object.fromEntries(
          languages.map((l) => [l, `${BASE_URL}/${l}/${page.slug}`])
        ),
      },
    }))
  );

  // Individual attorney profile pages (20 attorneys × 2 languages = 40 entries)
  const attorneyEntries = attorneys.flatMap((attorney) =>
    languages.map((lang) => ({
      url: `${BASE_URL}/${lang}/abogados/${attorney.id}`,
      lastModified: new Date('2026-03-25'),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
      alternates: {
        languages: Object.fromEntries(
          languages.map((l) => [l, `${BASE_URL}/${l}/abogados/${attorney.id}`])
        ),
      },
    }))
  );

  return [...staticEntries, ...cityServiceEntries, ...attorneyEntries];
}
