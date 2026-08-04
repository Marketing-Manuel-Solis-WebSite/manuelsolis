import type { NextConfig } from 'next';
import { withBotId } from 'botid/next/config';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { seoRedirects } from './app/lib/seoRedirects';
import { SECURITY_HEADERS } from './app/lib/securityHeaders';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    cpus: 4,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    // Restrict generated quality variants — avoids creating useless 100% versions.
    qualities: [50, 75, 82],
    // Trim oversized device variants. The widest layout area is ~1600px (max-w-7xl),
    // so 1920 covers retina; 2048+ generated nothing real users could see.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      // Dominio propio: el canónico es www — el apex queda por las URLs
      // absolutas heredadas que siguen apuntando ahí.
      {
        protocol: 'https',
        hostname: 'www.manuelsolis.com',
      },
      {
        protocol: 'https',
        hostname: 'manuelsolis.com',
      },
      {
        protocol: 'https',
        hostname: 'uenjwzjx3vckezns.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  async redirects() {
    return [
      // Canonicalización de host: apex → www con 308 permanente. Vercel hoy
      // emite un 307 (temporal) a nivel dominio, que no consolida señales;
      // esta regla lo hace permanente si la request llega a la app. Cambiar
      // también en Vercel → Domains el redirect del apex a "permanent".
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'manuelsolis.com' }],
        destination: 'https://www.manuelsolis.com/:path*',
        permanent: true,
      },
      ...seoRedirects,
    ];
  },
  async headers() {
    return [
      {
        // Static assets in public/ keep stable filenames (manuelsolisl.png,
        // the service heroes, blog art), so `immutable` for a year would
        // freeze a replaced file in returning visitors' caches forever.
        // Revalidate daily and allow a week of stale-while-revalidate.
        // ORDER MATTERS: this extension rule must stay BEFORE the /_next
        // ones — every matching rule is applied in order, so the hashed
        // filenames under /_next keep their `immutable` value.
        source: '/:path*.(png|jpg|jpeg|gif|webp|avif|ico|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache optimized images aggressively
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache font files
        source: '/:path*.(woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // OWASP / Zoom secure headers on every rendered (200) + static
        // response. Sourced from app/lib/securityHeaders.ts so the proxy
        // redirects use the exact same list (see proxy.ts).
        source: '/:path*',
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default bundleAnalyzer(withBotId(nextConfig));