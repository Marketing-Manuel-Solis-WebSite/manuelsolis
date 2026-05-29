import { NextRequest, NextResponse } from 'next/server';
import { resolveSlug, buildTrackedUrl } from '../../lib/shortLinks';
import { pushEvent, type StoredEvent } from '../../lib/analyticsStore';
import { rateLimit } from '../../lib/rateLimit';

/**
 * GET /go/<slug>
 *
 * Router de short-links con UTMs canónicos.
 *
 *   1. Resuelve `<slug>` contra `app/lib/shortLinks.ts`.
 *   2. Si no existe → 404 con `X-Robots-Tag: noindex` (los slugs son
 *      tracking, no contenido — no queremos que Google indexe estos
 *      paths, ni siquiera por accidente vía 404 cacheado).
 *   3. Si existe → registra el click en el ledger propio (Flight Check)
 *      como `page_view` con `source/medium/campaign/content` ya
 *      resueltos por el registry, **antes** del redirect. Esto nos da
 *      conteo de clicks defensivo (independiente de GA4 lazy-load y
 *      ad-blockers).
 *   4. Emite 302 al destino final con los `utm_*` inyectados como query
 *      params, para que GA4 los capture en automático al cargar la
 *      landing.
 *
 * Cache: `no-store`. Estos son redirects de tracking; cachearlos
 * destruye la métrica de clicks.
 */

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

function detectDeviceFromUA(ua: string | null): StoredEvent['deviceType'] {
  if (!ua) return 'unknown';
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) return 'tablet';
  if (/Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

function detectLanguageFromHeaders(req: NextRequest): string | undefined {
  const accept = req.headers.get('accept-language') || '';
  const first = accept.split(',')[0]?.trim();
  return first ? first.slice(0, 12) : undefined;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;

  // Rate limit por IP — un mismo cliente clickeando 60/min en /go/* es bot
  // o ataque, no usuario real.
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'anonymous';
  const { success: rateLimitOk } = rateLimit(`go:${ip}`, 60, 60_000);
  if (!rateLimitOk) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: { 'X-Robots-Tag': 'noindex, nofollow' },
    });
  }

  const link = resolveSlug(slug);
  if (!link) {
    // 404 noindex — defensa contra crawlers que descubren slugs viejos.
    return new NextResponse('Not Found', {
      status: 404,
      headers: { 'X-Robots-Tag': 'noindex, nofollow' },
    });
  }

  const origin = request.nextUrl.origin;
  const targetUrl = buildTrackedUrl(link, origin);
  const userAgent = request.headers.get('user-agent') || undefined;
  const referrer = request.headers.get('referer') || undefined;
  const country =
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    undefined;

  // Registra el click en el Flight Check ANTES del redirect.
  // Si falla, no rompemos al usuario — el redirect tiene que ocurrir igual.
  try {
    pushEvent({
      type: 'page_view',
      source: link.utm.source,
      medium: link.utm.medium,
      campaign: link.utm.campaign,
      content: link.utm.content,
      term: link.utm.term,
      label: `go:${link.slug}`,
      domain: request.nextUrl.hostname,
      path: `/go/${link.slug}`,
      referrer,
      language: detectLanguageFromHeaders(request),
      deviceType: detectDeviceFromUA(userAgent ?? null),
      timestamp: new Date().toISOString(),
      ip,
      userAgent: userAgent ? userAgent.slice(0, 200) : undefined,
      country: country ? country.slice(0, 4) : undefined,
    });
  } catch {
    // ignore — never block the redirect on telemetry
  }

  return NextResponse.redirect(targetUrl, {
    status: 302,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
