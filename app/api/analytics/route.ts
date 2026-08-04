import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  filterEvents,
  listEvents,
  type AnalyticsFilters,
  type StoredEvent,
  type StoredEventType,
} from '../../lib/analyticsStore';
import {
  ADMIN_COOKIE_NAME,
  verifyConversionsApiKey,
  verifySessionToken,
} from '../../lib/newsletter/auth';

/**
 * GET /api/analytics
 *
 * Endpoint protegido (cookie de admin) que entrega un payload
 * autocontenido para el dashboard de analytics:
 *  - KPIs y comparativa periodo vs periodo anterior
 *  - Series temporales por día (eventos + sesiones)
 *  - Breakdown por type, source/medium, campaign, content
 *  - Top URLs (paths) con conversiones, sesiones, bounce rate
 *  - Heatmap día-de-semana × hora
 *  - Funnel page_view → conversion → qualified_lead
 *  - Distribución por device, idioma, país, dominio, referrer
 *  - Tabla raw (paginada) y opciones de filtros disponibles
 */

export const dynamic = 'force-dynamic';

const CONVERSION_TYPES: StoredEventType[] = [
  'form_submit',
  'phone_click',
  'whatsapp_click',
  'consulta_click',
  'qualified_lead',
];

function isAuthorized(request: NextRequest, sessionCookie: string | null): boolean {
  if (verifySessionToken(sessionCookie)) return true;
  return verifyConversionsApiKey(
    request.headers.get('authorization'),
    request.headers.get('x-api-key'),
  );
}

function parseIntOr<T>(v: string | null, fallback: T): number | T {
  if (!v) return fallback;
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : fallback;
}

function parseFiltersFromQuery(req: NextRequest): AnalyticsFilters & {
  granularity: 'day' | 'week' | 'month';
} {
  const sp = req.nextUrl.searchParams;
  const now = Date.now();
  const days = parseIntOr(sp.get('days'), 30);
  const fromQs = sp.get('from');
  const toQs = sp.get('to');
  const from = fromQs ? Date.parse(fromQs) : now - (typeof days === 'number' ? days : 30) * 86400000;
  const to = toQs ? Date.parse(toQs) : now;

  const typesRaw = sp.get('type');
  const types = typesRaw
    ? (typesRaw.split(',').filter((t) =>
        ['form_submit', 'phone_click', 'whatsapp_click', 'consulta_click', 'qualified_lead', 'page_view'].includes(t),
      ) as StoredEventType[])
    : undefined;

  const granRaw = sp.get('granularity');
  const granularity =
    granRaw === 'week' || granRaw === 'month' ? granRaw : 'day';

  return {
    from: Number.isFinite(from) ? from : undefined,
    to: Number.isFinite(to) ? to : undefined,
    type: types && types.length > 0 ? types : undefined,
    source: sp.get('source') || undefined,
    medium: sp.get('medium') || undefined,
    campaign: sp.get('campaign') || undefined,
    content: sp.get('content') || undefined,
    domain: sp.get('domain') || undefined,
    pathPrefix: sp.get('pathPrefix') || undefined,
    language: sp.get('language') || undefined,
    deviceType:
      (sp.get('device') as StoredEvent['deviceType']) || undefined,
    search: sp.get('q') || undefined,
    granularity,
  };
}

function bucketKey(ts: number, granularity: 'day' | 'week' | 'month'): string {
  const d = new Date(ts);
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  if (granularity === 'month') return `${yyyy}-${mm}`;
  if (granularity === 'week') {
    // ISO-week start (Monday)
    const day = d.getUTCDay() || 7;
    const monday = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - (day - 1)));
    const wy = monday.getUTCFullYear();
    const wm = String(monday.getUTCMonth() + 1).padStart(2, '0');
    const wd = String(monday.getUTCDate()).padStart(2, '0');
    return `${wy}-${wm}-${wd}`;
  }
  const dd = String(d.getUTCDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function topN<K extends string>(map: Map<K, number>, n: number) {
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([key, value]) => ({ key, value }));
}

function buildSeries(
  events: StoredEvent[],
  from: number,
  to: number,
  granularity: 'day' | 'week' | 'month',
) {
  // Inicializar buckets vacíos para que la serie no tenga "huecos" visuales
  const buckets = new Map<
    string,
    { date: string; total: number; conversions: number; pageViews: number; sessions: Set<string> }
  >();

  const addBucket = (key: string) => {
    if (!buckets.has(key)) {
      buckets.set(key, {
        date: key,
        total: 0,
        conversions: 0,
        pageViews: 0,
        sessions: new Set(),
      });
    }
  };

  // Sembrar buckets vacíos en el rango
  const start = new Date(from);
  start.setUTCHours(0, 0, 0, 0);
  if (granularity === 'month') start.setUTCDate(1);
  if (granularity === 'week') {
    const day = start.getUTCDay() || 7;
    start.setUTCDate(start.getUTCDate() - (day - 1));
  }
  const end = new Date(to);
  let cursor = new Date(start);
  // Tope defensivo: 400 buckets máximo
  for (let i = 0; i < 400 && cursor.getTime() <= end.getTime(); i++) {
    addBucket(bucketKey(cursor.getTime(), granularity));
    if (granularity === 'day') cursor.setUTCDate(cursor.getUTCDate() + 1);
    else if (granularity === 'week') cursor.setUTCDate(cursor.getUTCDate() + 7);
    else cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }

  for (const e of events) {
    const key = bucketKey(new Date(e.timestamp).getTime(), granularity);
    addBucket(key);
    const b = buckets.get(key)!;
    b.total += 1;
    if (e.type === 'page_view') b.pageViews += 1;
    else b.conversions += 1;
    if (e.sessionId) b.sessions.add(e.sessionId);
  }

  return Array.from(buckets.values())
    .sort((a, b) => (a.date < b.date ? -1 : 1))
    .map((b) => ({
      date: b.date,
      total: b.total,
      conversions: b.conversions,
      pageViews: b.pageViews,
      sessions: b.sessions.size,
    }));
}

function computeFunnel(events: StoredEvent[]) {
  const sessions = new Set<string>();
  const sessionsWithConv = new Set<string>();
  const sessionsWithLead = new Set<string>();
  let pageViews = 0;
  let conversions = 0;
  let qualified = 0;

  for (const e of events) {
    if (e.type === 'page_view') pageViews += 1;
    else conversions += 1;
    if (e.type === 'qualified_lead') qualified += 1;
    if (e.sessionId) {
      sessions.add(e.sessionId);
      if (e.type !== 'page_view') sessionsWithConv.add(e.sessionId);
      if (e.type === 'qualified_lead') sessionsWithLead.add(e.sessionId);
    }
  }

  return {
    pageViews,
    conversions,
    qualifiedLeads: qualified,
    totalSessions: sessions.size,
    sessionsWithConversion: sessionsWithConv.size,
    sessionsWithQualifiedLead: sessionsWithLead.size,
  };
}

function computeBounceRate(events: StoredEvent[]): number {
  // Bounce = sesión con exactamente 1 page_view y sin conversiones.
  const perSession = new Map<string, { pv: number; conv: number }>();
  for (const e of events) {
    const sid = e.sessionId;
    if (!sid) continue;
    let s = perSession.get(sid);
    if (!s) {
      s = { pv: 0, conv: 0 };
      perSession.set(sid, s);
    }
    if (e.type === 'page_view') s.pv += 1;
    else s.conv += 1;
  }
  let total = 0;
  let bounced = 0;
  for (const s of perSession.values()) {
    total += 1;
    if (s.pv === 1 && s.conv === 0) bounced += 1;
  }
  if (total === 0) return 0;
  return bounced / total;
}

function computeHeatmap(events: StoredEvent[]) {
  // 7 días × 24 horas (0=domingo, ..., 6=sábado en hora local UTC)
  const grid: number[][] = Array.from({ length: 7 }, () => Array(24).fill(0));
  for (const e of events) {
    const d = new Date(e.timestamp);
    const day = d.getUTCDay();
    const hour = d.getUTCHours();
    grid[day][hour] += 1;
  }
  return grid;
}

function computeTopPaths(events: StoredEvent[], limit = 20) {
  type PathStat = {
    path: string;
    pageViews: number;
    conversions: number;
    sessions: Set<string>;
    bouncedSessions: Set<string>;
  };
  const map = new Map<string, PathStat>();
  // Sesiones por path → para bounce por path
  const sessionPathStats = new Map<string, Map<string, { pv: number; conv: number }>>();
  // session -> total pv across the site (para detectar bounce real)
  const sessionTotals = new Map<string, { pv: number; conv: number }>();

  for (const e of events) {
    const path = e.path || '/';
    let entry = map.get(path);
    if (!entry) {
      entry = {
        path,
        pageViews: 0,
        conversions: 0,
        sessions: new Set(),
        bouncedSessions: new Set(),
      };
      map.set(path, entry);
    }
    if (e.type === 'page_view') entry.pageViews += 1;
    else entry.conversions += 1;
    if (e.sessionId) {
      entry.sessions.add(e.sessionId);
      let totals = sessionTotals.get(e.sessionId);
      if (!totals) {
        totals = { pv: 0, conv: 0 };
        sessionTotals.set(e.sessionId, totals);
      }
      if (e.type === 'page_view') totals.pv += 1;
      else totals.conv += 1;

      let perPath = sessionPathStats.get(e.sessionId);
      if (!perPath) {
        perPath = new Map();
        sessionPathStats.set(e.sessionId, perPath);
      }
      let pp = perPath.get(path);
      if (!pp) {
        pp = { pv: 0, conv: 0 };
        perPath.set(path, pp);
      }
      if (e.type === 'page_view') pp.pv += 1;
      else pp.conv += 1;
    }
  }

  // bounce-by-path: una sesión "rebotó" desde X si esa sesión tuvo 1 PV (en X) y 0 conversiones globales
  for (const [sid, perPath] of sessionPathStats) {
    const totals = sessionTotals.get(sid);
    if (!totals) continue;
    if (totals.pv !== 1 || totals.conv !== 0) continue;
    for (const [path, pp] of perPath) {
      if (pp.pv > 0) {
        const entry = map.get(path);
        if (entry) entry.bouncedSessions.add(sid);
      }
    }
  }

  return Array.from(map.values())
    .map((s) => ({
      path: s.path,
      pageViews: s.pageViews,
      conversions: s.conversions,
      sessions: s.sessions.size,
      bounceRate: s.sessions.size > 0 ? s.bouncedSessions.size / s.sessions.size : 0,
      conversionRate: s.sessions.size > 0 ? s.conversions / s.sessions.size : 0,
    }))
    .sort((a, b) => b.pageViews + b.conversions - (a.pageViews + a.conversions))
    .slice(0, limit);
}

function buildBreakdown(
  events: StoredEvent[],
  field: keyof StoredEvent,
  fallback = '(none)',
  limit = 20,
) {
  const total = new Map<string, number>();
  const conv = new Map<string, number>();
  const sessions = new Map<string, Set<string>>();
  for (const e of events) {
    const raw = (e as unknown as Record<string, unknown>)[field as string];
    const key = (raw == null || raw === '' ? fallback : String(raw)).slice(0, 80);
    total.set(key, (total.get(key) || 0) + 1);
    if (e.type !== 'page_view') conv.set(key, (conv.get(key) || 0) + 1);
    if (e.sessionId) {
      let s = sessions.get(key);
      if (!s) {
        s = new Set();
        sessions.set(key, s);
      }
      s.add(e.sessionId);
    }
  }
  return Array.from(total.entries())
    .map(([key, value]) => ({
      key,
      total: value,
      conversions: conv.get(key) || 0,
      sessions: sessions.get(key)?.size || 0,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
}

function summarizeFilterOptions(events: StoredEvent[]) {
  const sourceMap = new Map<string, number>();
  const mediumMap = new Map<string, number>();
  const campaignMap = new Map<string, number>();
  const domainMap = new Map<string, number>();
  const langMap = new Map<string, number>();
  const deviceMap = new Map<string, number>();

  for (const e of events) {
    sourceMap.set(e.source, (sourceMap.get(e.source) || 0) + 1);
    mediumMap.set(e.medium, (mediumMap.get(e.medium) || 0) + 1);
    if (e.campaign) campaignMap.set(e.campaign, (campaignMap.get(e.campaign) || 0) + 1);
    domainMap.set(e.domain, (domainMap.get(e.domain) || 0) + 1);
    if (e.language) langMap.set(e.language, (langMap.get(e.language) || 0) + 1);
    if (e.deviceType) deviceMap.set(e.deviceType, (deviceMap.get(e.deviceType) || 0) + 1);
  }

  return {
    sources: topN(sourceMap, 50),
    mediums: topN(mediumMap, 50),
    campaigns: topN(campaignMap, 50),
    domains: topN(domainMap, 25),
    languages: topN(langMap, 10),
    devices: topN(deviceMap, 5),
  };
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value ?? null;
  if (!isAuthorized(request, sessionCookie)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const filters = parseFiltersFromQuery(request);
  const all = filterEvents(filters);

  // Periodo anterior (mismo span) para deltas
  const span = (filters.to ?? Date.now()) - (filters.from ?? Date.now() - 30 * 86400000);
  const prev = filterEvents({
    ...filters,
    from: (filters.from ?? Date.now() - 30 * 86400000) - span,
    to: filters.from ?? Date.now() - 30 * 86400000,
  });

  const conversions = all.filter((e) => e.type !== 'page_view');
  const qualifiedLeads = conversions.filter((e) => e.type === 'qualified_lead');

  const sessionsAll = new Set<string>();
  for (const e of all) if (e.sessionId) sessionsAll.add(e.sessionId);

  const sessionsPrev = new Set<string>();
  for (const e of prev) if (e.sessionId) sessionsPrev.add(e.sessionId);

  const prevConversions = prev.filter((e) => e.type !== 'page_view').length;
  const prevPageViews = prev.filter((e) => e.type === 'page_view').length;
  const prevQualified = prev.filter((e) => e.type === 'qualified_lead').length;

  const series = buildSeries(
    all,
    filters.from ?? Date.now() - 30 * 86400000,
    filters.to ?? Date.now(),
    filters.granularity,
  );

  const byType: Record<string, number> = {};
  for (const e of all) byType[e.type] = (byType[e.type] || 0) + 1;

  const sourceMediumMap = new Map<string, number>();
  for (const e of all) {
    const k = `${e.source} / ${e.medium}`;
    sourceMediumMap.set(k, (sourceMediumMap.get(k) || 0) + 1);
  }

  const referrerMap = new Map<string, number>();
  for (const e of all) {
    if (!e.referrer) continue;
    try {
      const u = new URL(e.referrer);
      if (u.host && !u.host.includes(e.domain || '')) {
        referrerMap.set(u.host, (referrerMap.get(u.host) || 0) + 1);
      }
    } catch {
      // ignore
    }
  }

  const allEventsSnapshot = [...listEvents()];
  const filterOptions = summarizeFilterOptions(allEventsSnapshot);
  const totalEvents = allEventsSnapshot.length;

  // Tabla raw paginada (últimos primero)
  const sp = request.nextUrl.searchParams;
  const page = Math.max(1, parseInt(sp.get('page') || '1', 10) || 1);
  const pageSize = Math.min(200, Math.max(10, parseInt(sp.get('pageSize') || '50', 10) || 50));
  const sortedRaw = [...all].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
  const rawPage = sortedRaw.slice((page - 1) * pageSize, page * pageSize).map((e) => ({
    timestamp: e.timestamp,
    type: e.type,
    source: e.source,
    medium: e.medium,
    campaign: e.campaign,
    content: e.content,
    label: e.label,
    path: e.path,
    referrer: e.referrer,
    language: e.language,
    deviceType: e.deviceType,
    domain: e.domain,
    country: e.country,
    sessionId: e.sessionId,
  }));

  const response = {
    meta: {
      generatedAt: new Date().toISOString(),
      retentionDays: 90,
      maxStored: 20000,
      totalStored: totalEvents,
      filters: {
        from: filters.from,
        to: filters.to,
        granularity: filters.granularity,
        type: filters.type,
        source: filters.source,
        medium: filters.medium,
        campaign: filters.campaign,
        content: filters.content,
        domain: filters.domain,
        pathPrefix: filters.pathPrefix,
        language: filters.language,
        deviceType: filters.deviceType,
        search: filters.search,
      },
      note:
        'Datos del Flight Check propio (in-memory por instancia). Útil como contraste con GA4/Meta Pixel; no es histórico canónico.',
    },
    kpis: {
      events: all.length,
      pageViews: byType['page_view'] || 0,
      conversions: conversions.length,
      qualifiedLeads: qualifiedLeads.length,
      sessions: sessionsAll.size,
      bounceRate: computeBounceRate(all),
      conversionRate:
        sessionsAll.size > 0 ? conversions.length / sessionsAll.size : 0,
      avgConversionsPerSession:
        sessionsAll.size > 0 ? conversions.length / sessionsAll.size : 0,
    },
    deltas: {
      events: { current: all.length, previous: prev.length },
      pageViews: { current: byType['page_view'] || 0, previous: prevPageViews },
      conversions: { current: conversions.length, previous: prevConversions },
      qualifiedLeads: { current: qualifiedLeads.length, previous: prevQualified },
      sessions: { current: sessionsAll.size, previous: sessionsPrev.size },
    },
    series,
    breakdowns: {
      byType: CONVERSION_TYPES.concat(['page_view']).map((t) => ({
        key: t,
        total: byType[t] || 0,
      })),
      bySource: buildBreakdown(all, 'source', 'direct'),
      byMedium: buildBreakdown(all, 'medium', 'none'),
      byCampaign: buildBreakdown(all, 'campaign', '(no campaign)'),
      byContent: buildBreakdown(all, 'content', '(no content)'),
      byDevice: buildBreakdown(all, 'deviceType', 'unknown', 6),
      byLanguage: buildBreakdown(all, 'language', '(unknown)', 12),
      byDomain: buildBreakdown(all, 'domain', 'unknown', 12),
      byCountry: buildBreakdown(all, 'country', '(unknown)', 25),
      bySourceMedium: topN(sourceMediumMap, 20),
      byReferrer: topN(referrerMap, 20),
    },
    funnel: computeFunnel(all),
    heatmap: computeHeatmap(all),
    topPaths: computeTopPaths(all),
    raw: {
      page,
      pageSize,
      total: all.length,
      rows: rawPage,
    },
    filterOptions,
  };

  return NextResponse.json(response);
}
