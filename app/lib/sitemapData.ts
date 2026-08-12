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
import { seoRedirects } from './seoRedirects';
import { accidentOffices } from '../[lang]/servicios/accidentes/accidentesOfficesData';
import { isVirtualOffice } from './officesRegistry';
import { OFFICE_NAP_SLUGS } from '../components/officesPhoneMap';
import { BLOG_DATA } from '../[lang]/blog/page';

export const BASE_URL = 'https://www.manuelsolis.com';

export type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export interface SitemapURL {
  url: string;
  lastModified: string; // ISO date YYYY-MM-DD
  changeFrequency: ChangeFreq;
  priority: number;
}

const LANGS = ['en', 'es'] as const;

// ===== Guardia: una URL con redirección declarada nunca se publica =====
// Un <loc> que responde 301 gasta crawl budget y deja la página inaccesible
// (caso real: un slug de abogado listado a la vez en attorneyData y en los
// redirects de bajas). Solo se comparan los sources literales de
// seoRedirects tras expandir :lang a es|en; los que llevan :slug / :path*
// son patrones legacy que no pueden coincidir con una URL concreta.
const LANG_PARAM = /:lang(?:\(es\|en\))?/;

const REDIRECTED_PATHS: ReadonlySet<string> = new Set(
  seoRedirects.flatMap((redirect) => {
    const source = redirect.source;
    if (LANG_PARAM.test(source)) {
      return LANGS.map((lang) => source.replace(LANG_PARAM, lang)).filter((s) => !s.includes(':'));
    }
    return source.includes(':') ? [] : [source];
  })
);

function publishable(urls: SitemapURL[]): SitemapURL[] {
  return urls.filter((u) => !REDIRECTED_PATHS.has(u.url.replace(BASE_URL, '')));
}

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
  const items = publishable(urls)
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
  return publishable(urls).reduce(
    (max, u) => (u.lastModified > max ? u.lastModified : max),
    '2020-01-01'
  );
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

// ===== lastmod derivado del contenido =====
// Regla: donde los datos llevan fecha (BLOG_DATA.date, newsletters.date) el
// lastmod SALE DE AHÍ. Eso incluye las páginas que no son el post pero listan
// posts — portada, /informacion/noticias, /category/* y el hub de blog —, que
// usan la fecha del contenido que muestran con la última edición de su propia
// copia como suelo.
// Las fechas a mano solo sobreviven donde NINGÚN dato tiene fecha (oficinas,
// servicios, perfiles de abogado y colaborador, landings, legales). Ahí se
// deja la fecha vieja antes que inventar una: un lastmod falso le enseña a
// Google a ignorar la señal en todo el sitemap.

// Revisiones posteriores a la publicación (arte nuevo, reescritura): elevan el
// lastmod por encima de BLOG_DATA.date, que sigue siendo la fecha de publicación.
const BLOG_REVISED: Record<string, string> = {
  'accidente-camion-18-ruedas-texas-compensacion': '2026-08-03',
  'vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente': '2026-04-17',
  'vawa-para-padres-maltrato-de-hijos-ciudadanos-estadounidenses': '2026-04-17',
};

// Posts que se salen del patrón por defecto (0.7 / monthly).
type BlogTuning = { priority?: number; changeFrequency?: ChangeFreq };

const BLOG_TUNING: Record<string, BlogTuning> = {
  'daca-2026-estado-legal-tribunales': { priority: 0.8, changeFrequency: 'weekly' },
  'vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente': { priority: 0.75 },
  'vawa-para-padres-maltrato-de-hijos-ciudadanos-estadounidenses': { priority: 0.75 },
};

function postLastmod(post: { slug: string; date: string }): string {
  const revised = BLOG_REVISED[post.slug];
  return revised && revised > post.date ? revised : post.date;
}

function maxDate(dates: string[]): string {
  return dates.reduce((max, d) => (d > max ? d : max), '2020-01-01');
}

// Los índices de categoría listan posts de BLOG_DATA filtrados por categoryId
// (mismos ids que usan los clientes de app/[lang]/category/*): su lastmod es
// el del post más reciente que muestran.
const CATEGORY_POST_IDS: Record<string, readonly string[]> = {
  '/category/derechos-de-migrantes': ['defensa-deportacion', 'accidentes'],
  '/category/proteccion-legal-para-migrantes': ['visa-u', 'visa-VAWA', 'visa-T', 'visa-humanitaria'],
};

function categoryLastmod(route: string): string {
  const ids: readonly string[] = CATEGORY_POST_IDS[route] ?? [];
  return maxDate(
    BLOG_DATA.posts.filter((p) => ids.includes(p.categoryId)).map((p) => postLastmod(p))
  );
}

// Slugs que lista /informacion/noticias. Replica de NEWS_SLUGS en
// app/[lang]/informacion/noticias/NoticiasClient.tsx: ese módulo es
// 'use client', así que importar su constante desde un route handler
// devolvería una referencia de cliente en vez del valor (mismo motivo por el
// que CATEGORY_POST_IDS replica los ids de los clientes de /category/*).
// Al añadir un slug allí hay que añadirlo aquí, o el lastmod se queda atrás.
const NEWS_POST_SLUGS: readonly string[] = [
  'ciudadania-por-nacimiento-2026-hijos-padres-indocumentados',
  'redadas-ice-2026-derechos-plan-emergencia-familiar',
  'como-encontrar-detenido-ice-localizador-pasos',
  'daca-2026-estado-legal-tribunales',
  'tps-2026-paises-elegibles-renovacion',
  'asilo-frontera-2026-puerto-entrada-vs-cruce',
  'advance-parole-2026-viajar-con-daca-tps-visa-u',
];

// Última revisión a mano de la copia PROPIA de estas dos páginas (encabezados,
// subtítulos: lo que no sale de BLOG_DATA). Actúa de suelo: el lastmod
// publicado es el máximo entre esta fecha y la de los posts que la página
// realmente pinta, así que publicar o revisar un post lo mueve solo y nunca
// retrocede por debajo de la última edición de la propia página.
const HOME_COPY_REVISED = '2026-07-24';
const NEWS_HUB_COPY_REVISED = '2026-08-04';

// <BlogHighlights> (app/components/BlogHighlights.tsx) pinta los 5 primeros
// posts de BLOG_DATA en la portada, así que el HTML de la portada cambia al
// publicar uno nuevo.
const HOME_HIGHLIGHTED_POSTS = 5;

function homeLastmod(): string {
  return maxDate([
    HOME_COPY_REVISED,
    ...BLOG_DATA.posts.slice(0, HOME_HIGHLIGHTED_POSTS).map((p) => postLastmod(p)),
  ]);
}

function newsHubLastmod(): string {
  return maxDate([
    NEWS_HUB_COPY_REVISED,
    ...BLOG_DATA.posts.filter((p) => NEWS_POST_SLUGS.includes(p.slug)).map((p) => postLastmod(p)),
  ]);
}

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
    { route: '', priority: 1.0, changeFrequency: 'weekly', lastModified: homeLastmod() },
    { route: '/nosotros', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    { route: '/abogados', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    { route: '/colaboradores', priority: 0.6, changeFrequency: 'monthly', lastModified: '2026-06-05' },
    { route: '/testimonios', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    { route: '/consulta', priority: 0.6, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    { route: '/clientes-detenidos', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    { route: '/acceso-clientes', priority: 0.4, changeFrequency: 'yearly', lastModified: '2026-04-11' },
    { route: '/inversionistas', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    { route: '/politica-editorial', priority: 0.4, changeFrequency: 'yearly', lastModified: '2025-03-20' },
    { route: '/informacion/faq', priority: 0.5, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    { route: '/informacion/recursos', priority: 0.5, changeFrequency: 'monthly', lastModified: '2026-04-11' },
    // /informacion/noticias entra al sitemap desde que lista artículos reales
    // derivados de BLOG_DATA: antes era una página "en construcción" con noindex.
    { route: '/informacion/noticias', priority: 0.5, changeFrequency: 'weekly', lastModified: newsHubLastmod() },
    { route: '/privacidad', priority: 0.3, changeFrequency: 'yearly', lastModified: '2025-01-01' },
    { route: '/terminos', priority: 0.3, changeFrequency: 'yearly', lastModified: '2025-01-01' },
    { route: '/sms-terminos', priority: 0.3, changeFrequency: 'yearly', lastModified: '2025-01-01' },
    ...Object.keys(CATEGORY_POST_IDS).map((route) => ({
      route,
      priority: 0.5,
      changeFrequency: 'monthly' as ChangeFreq,
      lastModified: categoryLastmod(route),
    })),
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
  //
  // Se excluyen las de dirección virtual, que van con `noindex` (ver el
  // page.tsx de la plantilla). Un <loc> en el sitemap es una petición explícita
  // de indexar, así que anunciar una URL que además dice "no me indexes" es una
  // contradicción que Search Console reporta como error — y gasta rastreo en
  // páginas que no van a entrar.
  const accidentOfficeSlugs = accidentOffices
    .map((o) => o.id)
    .filter((slug) => !isVirtualOffice(slug));
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
  // Derivadas del NAP, que es lo que define qué oficinas existen.
  //
  // Antes salían de OFFICES_PLACE_IDS, o sea de quién tiene ficha de Google: las
  // cinco direcciones del área de Chicago se publicaron con página propia y se
  // quedaron FUERA del sitemap, invisibles para el rastreo. Detectado
  // comprobando el sitemap en producción tras el despliegue, no en el build.
  const offices = OFFICE_NAP_SLUGS;

  /**
   * Fecha de alta de cada oficina, cuando no es la del grupo.
   *
   * Las cinco del área de Chicago se publicaron el 2026-08-11 y salían con el
   * lastmod general de abril: cuatro meses ANTES de existir. Un lastmod viejo en
   * una URL nueva le dice a Google justo lo contrario de lo que pasa —"aquí no
   * hay nada nuevo"— y es lo que hace que tarde en rastrearla. Al dar de alta
   * una oficina, añadir su fecha aquí.
   */
  const ALTA: Record<string, string> = {
    'chicago-martingale': '2026-08-11',
    'chicago-prospect': '2026-08-11',
    'chicago-wacker': '2026-08-11',
    'chicago-burr-ridge': '2026-08-11',
    'chicago-wall': '2026-08-11',
  };

  // El índice /oficinas cambió el mismo día: lista cinco sedes más y sus
  // conteos, así que hereda la fecha más reciente de sus fichas.
  const indiceLastmod = maxDate(['2026-04-11', ...Object.values(ALTA)]);

  const entries: Entry[] = [
    { route: '/oficinas', priority: 0.8, changeFrequency: 'monthly', lastModified: indiceLastmod },
    ...offices.map((slug) => ({
      route: `/oficinas/${slug}`,
      priority: 0.8,
      changeFrequency: 'monthly' as ChangeFreq,
      lastModified: ALTA[slug] ?? '2026-04-11',
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
//
// Fecha de alta por landing. Sin esto todas declaran '2026-03-25', y una URL que
// nace hoy anunciando una fecha de hace meses le dice a Google que no corre prisa
// rastrearla — justo lo contrario de lo que interesa en una página nueva. Es el
// mismo error que tenían las fichas de oficina, ahí al revés.
const LANDING_ALTA: Readonly<Record<string, string>> = {
  'vawa-memphis': '2026-08-12',
  'vawa-denver': '2026-08-12',
  'vawa-harlingen': '2026-08-12',
  'asilo-politico-dallas': '2026-08-12',
  'asilo-politico-memphis': '2026-08-12',
  'asilo-politico-denver': '2026-08-12',
  'asilo-politico-harlingen': '2026-08-12',
  'vawa-los-angeles': '2026-08-12',
  'vawa-el-paso': '2026-08-12',
  'asilo-politico-el-paso': '2026-08-12',
};

export function getLandingsEntries(): SitemapURL[] {
  return LANDING_PAGES.flatMap((page) =>
    LANGS.map((lang) => ({
      url: `${BASE_URL}/${lang}/${page.slug}`,
      lastModified: LANDING_ALTA[page.slug] ?? '2026-03-25',
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.85,
    }))
  );
}

// Blog — las entradas salen de BLOG_DATA (fuente única del blog), así que un
// post nuevo entra solo y el lastmod no se puede quedar atrás.
export function getBlogEntries(): SitemapURL[] {
  const posts: Entry[] = BLOG_DATA.posts.map((post) => {
    const tuning: BlogTuning = BLOG_TUNING[post.slug] ?? {};
    return {
      route: `/blog/${post.slug}`,
      priority: tuning.priority ?? 0.7,
      changeFrequency: tuning.changeFrequency ?? 'monthly',
      lastModified: postLastmod(post),
    };
  });
  const hub: Entry = {
    route: '/blog',
    priority: 0.7,
    changeFrequency: 'weekly',
    lastModified: maxDate(posts.map((p) => p.lastModified)),
  };
  return expandLangs([hub, ...posts]);
}

// Newsletter (hub + editions)
export function getNewsletterEntries(): SitemapURL[] {
  // El índice cambia cuando se publica una edición: su lastmod es el de la
  // más reciente.
  const hubLastmod = maxDate(newsletters.map((nl) => nl.date.slice(0, 10)));
  const hub = LANGS.map((lang) => ({
    url: `${BASE_URL}/${lang}/newsletter`,
    lastModified: hubLastmod,
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
