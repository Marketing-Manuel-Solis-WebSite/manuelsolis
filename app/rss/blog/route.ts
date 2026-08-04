import { statSync } from 'node:fs';
import { join } from 'node:path';
import { NextResponse } from 'next/server';
import { BLOG_DATA } from '../../[lang]/blog/page';

const SITE_URL = 'https://www.manuelsolis.com';

const imageType = (image: string) =>
  image.endsWith('.jpg') || image.endsWith('.jpeg') ? 'image/jpeg' : 'image/png';

/**
 * `<enclosure>` exige un `length` en bytes real; declarar 0 hace que los
 * validadores avisen y que algunos agregadores descarten la imagen. El tamaño
 * se lee del archivo de public/, que existe en el build donde se prerenderiza
 * el feed; si no fuera legible se omite el enclosure y la imagen viaja solo en
 * `<media:content>` (Media RSS no pide length).
 */
const imageBytes = (image: string): number => {
  try {
    return statSync(join(process.cwd(), 'public', image)).size;
  } catch {
    return 0;
  }
};

export async function GET() {
  const items = BLOG_DATA.posts
    .map((post) => {
      const type = imageType(post.image);
      const bytes = imageBytes(post.image);
      const enclosure = bytes
        ? `
      <enclosure url="${SITE_URL}${post.image}" type="${type}" length="${bytes}"/>`
        : '';
      return `
    <item>
      <title><![CDATA[${post.title.es}]]></title>
      <link>${SITE_URL}/es/blog/${post.slug}</link>
      <description><![CDATA[${post.excerpt.es}]]></description>
      <pubDate>${new Date(`${post.date}T08:00:00Z`).toUTCString()}</pubDate>
      <guid isPermaLink="true">${SITE_URL}/es/blog/${post.slug}</guid>
      <category><![CDATA[${post.category.es}]]></category>
      <media:content url="${SITE_URL}${post.image}" type="${type}" medium="image"/>${enclosure}
    </item>`;
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Blog Legal - Manuel Solis Law</title>
    <link>${SITE_URL}/es/blog</link>
    <description>Guías legales de inmigración y accidentes para la comunidad hispana: Visa U, VAWA, asilo, defensa contra deportación, residencia y más, por los abogados de Manuel Solís.</description>
    <language>es</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss/blog" rel="self" type="application/rss+xml"/>
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
