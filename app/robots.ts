import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.manuelsolis.com';

// Migrated from public/robots.txt to Next.js native MetadataRoute.Robots
// for consistency with the dynamic sitemap shards in app/sitemap*.xml/.
// Resolves DISCOVERY_v3 P1.4.
export default function robots(): MetadataRoute.Robots {
  const commonAllow = ['/', '/_next/static/', '/_next/image', '/_next/image/'];
  const commonDisallow = [
    '/api/',
    '/_next/data/',
    '/_next/server/',
    '/private/',
    '/admin',
    '/es/admin',
    '/en/admin',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: commonAllow,
        disallow: commonDisallow,
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: commonAllow,
        disallow: commonDisallow,
      },
      {
        userAgent: 'Bingbot',
        allow: commonAllow,
        disallow: commonDisallow,
        crawlDelay: 1,
      },
      {
        userAgent: 'Sitebulb',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Screaming Frog SEO Spider',
        allow: '/',
        crawlDelay: 1,
      },
      // Block AI bots and scrapers
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'anthropic-ai', disallow: '/' },
      { userAgent: 'ClaudeBot', disallow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
