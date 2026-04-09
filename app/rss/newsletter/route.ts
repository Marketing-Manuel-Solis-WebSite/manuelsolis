import { NextResponse } from 'next/server';
import { newsletters } from '../../lib/newsletterData';

const SITE_URL = 'https://www.manuelsolis.com';

export async function GET() {
  const items = newsletters
    .map(
      (nl) => `
    <item>
      <title><![CDATA[${nl.title.es}]]></title>
      <link>${SITE_URL}/es/newsletter/${nl.slug}</link>
      <description><![CDATA[${nl.description.es}]]></description>
      <pubDate>${new Date(nl.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${SITE_URL}/es/newsletter/${nl.slug}</guid>
      <category>${nl.topics.es.join(', ')}</category>
    </item>`,
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Newsletter de Inmigración - Manuel Solis Law</title>
    <link>${SITE_URL}/es/newsletter</link>
    <description>Actualizaciones mensuales sobre leyes de inmigración, cambios de política y consejos legales de las Oficinas Legales de Manuel Solis.</description>
    <language>es</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss/newsletter" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/logo-manuel-solis.png</url>
      <title>Manuel Solis Law</title>
      <link>${SITE_URL}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
