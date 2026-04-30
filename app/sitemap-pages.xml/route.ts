import { buildSitemapXml, getPagesEntries } from '../lib/sitemapData';

export function GET() {
  const xml = buildSitemapXml(getPagesEntries());
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
