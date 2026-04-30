import { buildSitemapXml, getNewsletterEntries } from '../lib/sitemapData';

export function GET() {
  const xml = buildSitemapXml(getNewsletterEntries());
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
