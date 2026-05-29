import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';

const SITE_URL = 'https://www.manuelsolis.com';

const PRIMARY_HOSTS = new Set(['www.manuelsolis.com', 'manuelsolis.com']);

/**
 * Returns true when the request is being served from a host that should
 * NEVER be indexed:
 *   - bos.manuelsolis.com  (internal operations / Laravel app — own server,
 *     in practice these requests don't even reach this Next.js app; the
 *     check exists as defense-in-depth in case bos ever proxies through
 *     a unified domain).
 *   - mme.manuelsolis.com  (placeholder for any future internal host).
 *   - v2.manuelsolis.com   (staging).
 *   - *.vercel.app         (Vercel preview deployments).
 *
 * The primary public domain (manuelsolis.com / www.manuelsolis.com) is
 * explicitly allowlisted to avoid accidental noindex.
 */
function isNonPrimaryHost(host: string): boolean {
  const lower = host.toLowerCase().split(':')[0];
  if (PRIMARY_HOSTS.has(lower)) return false;
  return (
    lower.startsWith('bos.') ||
    lower.startsWith('mme.') ||
    lower.startsWith('v2.') ||
    lower.endsWith('.vercel.app')
  );
}

const commonAllow = ['/', '/_next/static/', '/_next/image', '/_next/image/'];
const commonDisallow = [
  '/api/',
  '/_next/data/',
  '/_next/server/',
  '/private/',
  '/admin',
  '/es/admin',
  '/en/admin',
  // Short-link router con UTMs canónicos. Son tracking, no contenido —
  // tampoco queremos que Google los descubra y los reporte como referidos
  // cacheados desde sí mismo.
  '/go/',
];

// Migrated from public/robots.txt to Next.js native MetadataRoute.Robots
// for consistency with the dynamic sitemap shards in app/sitemap*.xml/.
// Resolves DISCOVERY_v3 P1.4. Now host-aware (2026-05-27): non-primary
// hosts (bos./mme./v2./*.vercel.app) receive a hostile "Disallow: /"
// robots.txt with no sitemap link — blocks indexing at the protocol
// level for any preview/staging/internal subdomain that ever shares
// this Next.js app's request pipeline.
export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get('host') ?? '';

  if (isNonPrimaryHost(host)) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
    };
  }

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
