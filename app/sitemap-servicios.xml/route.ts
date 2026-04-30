import { buildSitemapXml, getServiciosEntries } from '../lib/sitemapData';

export function GET() {
  const xml = buildSitemapXml(getServiciosEntries());
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
