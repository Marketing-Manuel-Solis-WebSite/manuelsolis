import type { NextConfig } from 'next';
import { withBotId } from 'botid/next/config';
import { seoRedirects } from './app/lib/seoRedirects';

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
      {
        protocol: 'https',
        hostname: 'comopuedoarreglar.com',
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
    return seoRedirects;
  },
  async headers() {
    return [
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
        // Cache static assets in public folder
        source: '/:path*.(png|jpg|jpeg|gif|webp|avif|ico|svg)',
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
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://analytics.tiktok.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://connect.facebook.net https://analytics.tiktok.com https://va.vercel-scripts.com https://vitals.vercel-insights.com https://generativelanguage.googleapis.com; frame-src 'self' https://www.google.com https://www.youtube.com https://www.facebook.com; media-src 'self' https:; worker-src 'self' blob:; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests"
          },
        ],
      },
    ];
  },
};

export default withBotId(nextConfig);