import { NextResponse } from 'next/server';
import { BLOG_DATA } from '../../[lang]/blog/page';

const SITE_URL = 'https://www.manuelsolis.com';

export async function GET() {
  const items = BLOG_DATA.posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title.es}]]></title>
      <link>${SITE_URL}/es/blog/${post.slug}</link>
      <description><![CDATA[${post.excerpt.es}]]></description>
      <pubDate>${new Date(`${post.date}T08:00:00Z`).toUTCString()}</pubDate>
      <guid isPermaLink="true">${SITE_URL}/es/blog/${post.slug}</guid>
      <category><![CDATA[${post.category.es}]]></category>
      <enclosure url="${SITE_URL}${post.image}" type="image/${post.image.endsWith('.jpg') || post.image.endsWith('.jpeg') ? 'jpeg' : 'png'}" length="0"/>
    </item>`,
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
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
