import {
  BASE_URL,
  buildSitemapIndexXml,
  shardLastmod,
  getPagesEntries,
  getServiciosEntries,
  getOficinasEntries,
  getAbogadosEntries,
  getLandingsEntries,
  getBlogEntries,
  getNewsletterEntries,
  type SitemapURL,
} from '../lib/sitemapData';

// lastmod real por shard (max de sus URLs) en vez de la fecha de build:
// un lastmod que "siempre cambia" hace que Google descuente la señal.
const SHARDS: { file: string; entries: () => SitemapURL[] }[] = [
  { file: 'sitemap-pages.xml', entries: getPagesEntries },
  { file: 'sitemap-servicios.xml', entries: getServiciosEntries },
  { file: 'sitemap-oficinas.xml', entries: getOficinasEntries },
  { file: 'sitemap-abogados.xml', entries: getAbogadosEntries },
  { file: 'sitemap-landings.xml', entries: getLandingsEntries },
  { file: 'sitemap-blog.xml', entries: getBlogEntries },
  { file: 'sitemap-newsletter.xml', entries: getNewsletterEntries },
];

export function GET() {
  const xml = buildSitemapIndexXml(
    SHARDS.map((s) => ({
      loc: `${BASE_URL}/${s.file}`,
      lastmod: shardLastmod(s.entries()),
    }))
  );
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
