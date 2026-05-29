import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { listShortLinks, type ShortLink } from '../../../lib/shortLinks';
import { filterEvents, type StoredEvent } from '../../../lib/analyticsStore';
import {
  ADMIN_COOKIE_NAME,
  verifySessionToken,
} from '../../../lib/newsletter/auth';

/**
 * GET /api/admin/short-links
 *
 * Devuelve, para cada slug del registry:
 *   - definición canónica (destino + UTMs)
 *   - clicks totales / 7d / 30d desde el ledger Flight Check
 *   - timestamp del último click
 *   - últimos N referrers que rebotaron por ahí
 *
 * Pensado para la UI de admin (`/es/admin/short-links`).
 *
 * Auth: cookie de admin (misma sesión que /admin/newsletter) o
 * `Authorization: Bearer <CONVERSIONS_API_KEY>` para automatización.
 */

export const dynamic = 'force-dynamic';

function isAuthorized(request: NextRequest, sessionCookie: string | null): boolean {
  if (verifySessionToken(sessionCookie)) return true;
  const expectedKey = process.env.CONVERSIONS_API_KEY;
  if (!expectedKey) return false;
  const authHeader = request.headers.get('authorization');
  const bearerKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const queryKey = request.nextUrl.searchParams.get('key');
  const provided = bearerKey || queryKey;
  return Boolean(provided && provided === expectedKey);
}

interface SlugStats {
  totalClicks: number;
  clicks7d: number;
  clicks30d: number;
  lastClickAt?: string;
  recentReferrers: { host: string; count: number }[];
  byDevice: { device: string; count: number }[];
  byCountry: { country: string; count: number }[];
}

function emptyStats(): SlugStats {
  return {
    totalClicks: 0,
    clicks7d: 0,
    clicks30d: 0,
    recentReferrers: [],
    byDevice: [],
    byCountry: [],
  };
}

function computeStatsForSlug(slug: string, events: readonly StoredEvent[]): SlugStats {
  const goPath = `/go/${slug}`.toLowerCase();
  const now = Date.now();
  const cutoff7 = now - 7 * 86_400_000;
  const cutoff30 = now - 30 * 86_400_000;

  let total = 0;
  let c7 = 0;
  let c30 = 0;
  let lastTs = 0;
  const refCounts = new Map<string, number>();
  const devCounts = new Map<string, number>();
  const countryCounts = new Map<string, number>();

  for (const e of events) {
    if (!e.path || e.path.toLowerCase() !== goPath) continue;
    total += 1;
    const ts = new Date(e.timestamp).getTime();
    if (ts > lastTs) lastTs = ts;
    if (ts >= cutoff7) c7 += 1;
    if (ts >= cutoff30) c30 += 1;

    if (e.referrer) {
      try {
        const u = new URL(e.referrer);
        if (u.host) refCounts.set(u.host, (refCounts.get(u.host) || 0) + 1);
      } catch {
        // ignore
      }
    }
    const dev = e.deviceType || 'unknown';
    devCounts.set(dev, (devCounts.get(dev) || 0) + 1);
    if (e.country) {
      countryCounts.set(e.country, (countryCounts.get(e.country) || 0) + 1);
    }
  }

  return {
    totalClicks: total,
    clicks7d: c7,
    clicks30d: c30,
    lastClickAt: lastTs > 0 ? new Date(lastTs).toISOString() : undefined,
    recentReferrers: Array.from(refCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([host, count]) => ({ host, count })),
    byDevice: Array.from(devCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([device, count]) => ({ device, count })),
    byCountry: Array.from(countryCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([country, count]) => ({ country, count })),
  };
}

interface ChannelBreakdownEntry {
  key: string;
  sessions: number;
  pageViews: number;
  conversions: number;
  qualifiedLeads: number;
}

function computeChannelBreakdown(
  events: readonly StoredEvent[],
  field: 'source' | 'medium' | 'campaign' | 'content',
): ChannelBreakdownEntry[] {
  const map = new Map<
    string,
    {
      sessions: Set<string>;
      pageViews: number;
      conversions: number;
      qualifiedLeads: number;
    }
  >();

  for (const e of events) {
    const raw = e[field];
    const key = (raw == null || raw === '' ? '(none)' : String(raw)).slice(0, 80);
    let bucket = map.get(key);
    if (!bucket) {
      bucket = {
        sessions: new Set(),
        pageViews: 0,
        conversions: 0,
        qualifiedLeads: 0,
      };
      map.set(key, bucket);
    }
    if (e.sessionId) bucket.sessions.add(e.sessionId);
    if (e.type === 'page_view') bucket.pageViews += 1;
    else bucket.conversions += 1;
    if (e.type === 'qualified_lead') bucket.qualifiedLeads += 1;
  }

  return Array.from(map.entries())
    .map(([key, b]) => ({
      key,
      sessions: b.sessions.size,
      pageViews: b.pageViews,
      conversions: b.conversions,
      qualifiedLeads: b.qualifiedLeads,
    }))
    .sort((a, b) => b.sessions + b.conversions - (a.sessions + a.conversions))
    .slice(0, 25);
}

interface ShortLinkRow extends ShortLink {
  stats: SlugStats;
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value ?? null;
  if (!isAuthorized(request, sessionCookie)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Ventana: 30 días por default (alineado con el ledger).
  const events = filterEvents({ from: Date.now() - 30 * 86_400_000 });

  const registry = listShortLinks();
  const rows: ShortLinkRow[] = registry.map((link) => ({
    ...link,
    stats: computeStatsForSlug(link.slug, events),
  }));

  // Métricas globales (toda la atribución, no solo `/go/*`).
  const channels = {
    bySource: computeChannelBreakdown(events, 'source'),
    byMedium: computeChannelBreakdown(events, 'medium'),
    byCampaign: computeChannelBreakdown(events, 'campaign'),
    byContent: computeChannelBreakdown(events, 'content'),
  };

  // First-touch attribution: agrupar por firstTouchSource para ver qué
  // canal originó los leads que finalmente convirtieron.
  const firstTouchMap = new Map<
    string,
    { sessions: Set<string>; conversions: number; qualifiedLeads: number }
  >();
  for (const e of events) {
    const key = (e.firstTouchSource || '(none)').slice(0, 80);
    let b = firstTouchMap.get(key);
    if (!b) {
      b = { sessions: new Set(), conversions: 0, qualifiedLeads: 0 };
      firstTouchMap.set(key, b);
    }
    if (e.sessionId) b.sessions.add(e.sessionId);
    if (e.type !== 'page_view') b.conversions += 1;
    if (e.type === 'qualified_lead') b.qualifiedLeads += 1;
  }
  const firstTouchSources = Array.from(firstTouchMap.entries())
    .map(([key, b]) => ({
      key,
      sessions: b.sessions.size,
      conversions: b.conversions,
      qualifiedLeads: b.qualifiedLeads,
    }))
    .sort((a, b) => b.conversions - a.conversions)
    .slice(0, 25);

  // Eventos recientes en `/go/*` (los 50 más nuevos) para feed en vivo.
  const recentGoEvents = events
    .filter((e) => e.path && e.path.toLowerCase().startsWith('/go/'))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 50)
    .map((e) => ({
      timestamp: e.timestamp,
      slug: (e.path || '').replace(/^\/go\//i, ''),
      source: e.source,
      medium: e.medium,
      campaign: e.campaign,
      content: e.content,
      referrer: e.referrer,
      country: e.country,
      deviceType: e.deviceType,
    }));

  return NextResponse.json({
    meta: {
      generatedAt: new Date().toISOString(),
      windowDays: 30,
      totalEvents: events.length,
    },
    rows,
    channels,
    firstTouchSources,
    recentGoEvents,
  });
}
