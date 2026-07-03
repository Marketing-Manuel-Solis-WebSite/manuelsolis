// ============================================================
// Sitemap data — shared by all sitemap-*.xml route handlers
// ============================================================
// We split the single legacy sitemap into typed sub-sitemaps
// (pages / services / oficinas / abogados / landings / blog
//  / newsletter) and a sitemap index. Helps GSC processing
// and isolates problems per content type.
// ============================================================

import { attorneys } from './attorneyData';
import { collaborators } from './collaboratorData';
import { LANDING_PAGES } from './cityServiceData';
import { newsletters } from './newsletterData';
import { accidentOffices } from '../[lang]/servicios/accidentes/accidentesOfficesData';
import { OFFICES_PLACE_IDS } from './officesRegistry';

export const BASE_URL = 'https://www.manuelsolis.com';

export type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export interface SitemapURL {
  url: string;
  lastModified: string; // ISO date YYYY-MM-DD
  changeFrequency: ChangeFreq;
  priority: number;
}

const LANGS = ['en', 'es'] as const;

// ===== Builders =====

export function buildSitemapXml(urls: SitemapURL[]): string {
  const escape = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  // xhtml:link alternates: refuerza el emparejamiento es/en declarado ya
  // on-page. Las URLs vienen en pares /es|/en del mismo route (expandLangs);
  // derivamos la alterna intercambiando el prefijo de idioma.
  const langAlternates = (u: SitemapURL): string => {
    const m = u.url.match(new RegExp(`^${BASE_URL}/(en|es)(/.*)?$`));
    if (!m) return '';
    const rest = m[2] ?? '';
    const es = `${BASE_URL}/es${rest}`;
    const en = `${BASE_URL}/en${rest}`;
    return `
    <xhtml:link rel="alternate" hreflang="es" href="${escape(es)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${escape(en)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${escape(es)}"/>`;
  };
  const items = urls
    .map(
      (u) => `  <url>
    <loc>${escape(u.url)}</loc>
    <lastmod>${u.lastModified}</lastmod>
    <changefreq>${u.changeFrequency}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>${langAlternates(u)}
  </url>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${items}
</urlset>`;
}

/** Última modificación real de un shard = max(lastModified) de sus URLs. */
export function shardLastmod(urls: SitemapURL[]): string {
  return urls.reduce((max, u) => (u.lastModified > max ? u.lastModified : max), '2020-01-01');
}

export function buildSitemapIndexXml(sitemaps: { loc: string; lastmod: string }[]): string {
  const items = sitemaps
    .map(
      (s) => `  <sitemap>
    <loc>${s.loc}</loc>
    <lastmod>${s.lastmod}</lastmod>
  </sitemap>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</sitemapindex>`;
}

// ===== URL generators per type =====

type Entry = {
  route: string;
  priority: number;
  changeFrequency: ChangeFreq;
  lastModified: string;
};

function expandLangs(entries: Entry[]): SitemapURL[] {
  return entries.flatMap((e) =>
    LANGS.map((lang) => ({
      url: `${BASE_URL}/${lang}${e.route}`,
      lastModified: e.lastModified,
      changeFrequency: e.changeFrequency,
      priority: e.priority,
    }))
  );
}

// Hub / static / trust pages
export function getPagesEntries(): SitemapURL[] {
  const entries: Entry[] = [
    { route: '', priority: 1.0, changeFrequency: 'weekly', lastModified: '2026-04-30' },
    { route: '/nosotros', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    { route: '/abogados', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    { route: '/colaboradores', priority: 0.6, changeFrequency: 'monthly', lastModified: '2026-06-05' },
    { route: '/testimonios', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    { route: '/consulta', priority: 0.6, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    { route: '/clientes', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    { route: '/clientes-detenidos', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    { route: '/acceso-clientes', priority: 0.4, changeFrequency: 'yearly', lastModified: '2026-04-11' },
    { route: '/inversionistas', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    { route: '/politica-editorial', priority: 0.4, changeFrequency: 'yearly', lastModified: '2025-03-20' },
    { route: '/informacion/faq', priority: 0.5, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    { route: '/informacion/recursos', priority: 0.5, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    { route: '/privacidad', priority: 0.3, changeFrequency: 'yearly', lastModified: '2025-01-01' },
    { route: '/terminos', priority: 0.3, changeFrequency: 'yearly', lastModified: '2025-01-01' },
    { route: '/sms-terminos', priority: 0.3, changeFrequency: 'yearly', lastModified: '2025-01-01' },
    { route: '/category/derechos-de-migrantes', priority: 0.5, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    { route: '/category/proteccion-legal-para-migrantes', priority: 0.5, changeFrequency: 'monthly', lastModified: '2026-04-11' },
  ];
  // Collaborator profile pages (data-driven — scales as more are added).
  const collaboratorProfiles: SitemapURL[] = collaborators.flatMap((c) =>
    LANGS.map((lang) => ({
      url: `${BASE_URL}/${lang}/colaboradores/${c.id}`,
      lastModified: '2026-06-05',
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.55,
    }))
  );
  return [...expandLangs(entries), ...collaboratorProfiles];
}

// Services hub + each service page
export function getServiciosEntries(): SitemapURL[] {
  const entries: Entry[] = [
    { route: '/servicios', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    { route: '/servicios/inmigracion', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    { route: '/servicios/accidentes', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-06-26' },
    { route: '/servicios/ley-criminal', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    { route: '/servicios/familia', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    { route: '/servicios/seguros', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    { route: '/servicios/visa-e2', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    { route: '/servicios/visa-u', priority: 0.85, changeFrequency: 'monthly', lastModified: '2026-03-23' },
    { route: '/servicios/vawa', priority: 0.85, changeFrequency: 'monthly', lastModified: '2026-03-23' },
    { route: '/servicios/defensa-deportacion', priority: 0.85, changeFrequency: 'monthly', lastModified: '2026-03-23' },
    { route: '/servicios/asilo', priority: 0.85, changeFrequency: 'monthly', lastModified: '2026-03-23' },
  ];
  // Páginas de accidentes por-oficina (/servicios/accidentes/oficinas/<slug>).
  // Derivadas de la fuente de datos: una oficina nueva entra sola al sitemap.
  const accidentOfficeSlugs = accidentOffices.map((o) => o.id);
  for (const slug of accidentOfficeSlugs) {
    entries.push({
      route: `/servicios/accidentes/oficinas/${slug}`,
      priority: 0.8,
      changeFrequency: 'monthly',
      lastModified: '2026-06-26',
    });
  }
  return expandLangs(entries);
}

// Office pages
export function getOficinasEntries(): SitemapURL[] {
  // Derivadas del registro central de oficinas (una clave por /oficinas/<slug>).
  const offices = Object.keys(OFFICES_PLACE_IDS);
  const entries: Entry[] = [
    { route: '/oficinas', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    ...offices.map((slug) => ({
      route: `/oficinas/${slug}`,
      priority: 0.8,
      changeFrequency: 'monthly' as ChangeFreq,
      lastModified: '2026-04-11',
    })),
  ];
  return expandLangs(entries);
}

// Attorney profile pages
export function getAbogadosEntries(): SitemapURL[] {
  return attorneys.flatMap((attorney) =>
    LANGS.map((lang) => ({
      url: `${BASE_URL}/${lang}/abogados/${attorney.id}`,
      lastModified: '2026-03-25',
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.75,
    }))
  );
}

// City × Service landings
export function getLandingsEntries(): SitemapURL[] {
  return LANDING_PAGES.flatMap((page) =>
    LANGS.map((lang) => ({
      url: `${BASE_URL}/${lang}/${page.slug}`,
      lastModified: '2026-03-25',
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.85,
    }))
  );
}

// Blog
export function getBlogEntries(): SitemapURL[] {
  const blog: Entry[] = [
    { route: '/blog', priority: 0.7, changeFrequency: 'weekly', lastModified: '2026-07-03' },
  { route: '/blog/ciudadania-por-nacimiento-2026-hijos-padres-indocumentados', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-07-03' },
  { route: '/blog/redadas-ice-2026-derechos-plan-emergencia-familiar', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-07-02' },
  { route: '/blog/como-encontrar-detenido-ice-localizador-pasos', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-07-01' },
  { route: '/blog/accidente-trabajo-indocumentado-texas-compensacion', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-30' },
  { route: '/blog/accidente-camion-18-ruedas-texas-compensacion', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-29' },
    { route: '/blog/daca-2026-estado-legal-tribunales', priority: 0.8, changeFrequency: 'weekly', lastModified: '2026-05-13' },
    { route: '/blog/tps-2026-paises-elegibles-renovacion', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-04-10' },
    { route: '/blog/crimenes-deportacion-vileza-moral', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-04-14' },
    { route: '/blog/rfe-responder-evidencia-uscis', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-04-18' },
    { route: '/blog/barras-3-10-anos-presencia-ilegal', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-04-22' },
    { route: '/blog/accidente-auto-indocumentado-derechos', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-04-26' },
    { route: '/blog/i-864-patrocinador-ingreso-minimo', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-04-30' },
    { route: '/blog/visa-k1-prometido-requisitos', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-05-04' },
    { route: '/blog/entrevista-inmigracion-errores-evitar', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-05-08' },
    { route: '/blog/familias-estatus-mixto-opciones', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-05-12' },
    { route: '/blog/fraude-notarios-inmigracion', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-05-16' },
    { route: '/blog/asilo-frontera-2026-puerto-entrada-vs-cruce', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-04-04' },
    { route: '/blog/entrevista-matrimonio-uscis-senales-alerta', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-04-01' },
    { route: '/blog/ciudadania-en-espanol-reglas-50-20-55-15', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-03-28' },
    { route: '/blog/marihuana-dui-buen-caracter-moral-inmigracion', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-03-24' },
    { route: '/blog/perdon-i601a-arreglar-papeles-entrada-ilegal', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-03-20' },
    { route: '/blog/estatus-juvenil-sijs-residencia-jovenes-abandonados', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-03-17' },
    { route: '/blog/foia-migratoria-pedir-record-antes-de-aplicar', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-03-12' },
    { route: '/blog/residencia-laboral-eb3-ley-245i-entrada-indocumentada', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-03-08' },
    { route: '/blog/advance-parole-2026-viajar-con-daca-tps-visa-u', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-03-05' },
    { route: '/blog/ley-de-los-10-anos-cancelacion-de-deportacion', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-03-02' },
    { route: '/blog/visa-u-y-vawa-incluir-hijos-y-nuevos-esposos-derivados', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-02-16' },
    { route: '/blog/formulario-g28-cambiar-abogado-inmigracion', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-02-12' },
    { route: '/blog/frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-02-10' },
    { route: '/blog/visa-t-trabajo-forzado-por-deuda-con-coyote', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-02-03' },
    { route: '/blog/vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente', priority: 0.75, changeFrequency: 'monthly', lastModified: '2026-04-17' },
    { route: '/blog/vawa-para-padres-maltrato-de-hijos-ciudadanos-estadounidenses', priority: 0.75, changeFrequency: 'monthly', lastModified: '2026-04-17' },
    { route: '/blog/perdon-i-192-como-arreglar-con-la-visa-u-si-tienes-deportaciones-previas', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-01-23' },
    { route: '/blog/que-hacer-si-la-policia-no-firma-la-certificacion-visa-u', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-01-20' },
    { route: '/blog/permiso-de-trabajo-visa-u', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-01-16' },
  ];
  return expandLangs(blog);
}

// Newsletter (hub + editions)
export function getNewsletterEntries(): SitemapURL[] {
  const hub = LANGS.map((lang) => ({
    url: `${BASE_URL}/${lang}/newsletter`,
    lastModified: '2026-04-01',
    changeFrequency: 'weekly' as ChangeFreq,
    priority: 0.7,
  }));
  const editions = newsletters.flatMap((nl) =>
    LANGS.map((lang) => ({
      url: `${BASE_URL}/${lang}/newsletter/${nl.slug}`,
      lastModified: nl.date.slice(0, 10),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.65,
    }))
  );
  return [...hub, ...editions];
}
