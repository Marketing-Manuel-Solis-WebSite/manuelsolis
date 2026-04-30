import { BASE_URL, buildSitemapIndexXml } from '../lib/sitemapData';

const TODAY = new Date().toISOString().slice(0, 10);

const SHARDS = [
  'sitemap-pages.xml',
  'sitemap-servicios.xml',
  'sitemap-oficinas.xml',
  'sitemap-abogados.xml',
  'sitemap-landings.xml',
  'sitemap-blog.xml',
  'sitemap-newsletter.xml',
];

export function GET() {
  const xml = buildSitemapIndexXml(
    SHARDS.map((s) => ({ loc: `${BASE_URL}/${s}`, lastmod: TODAY }))
  );
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
