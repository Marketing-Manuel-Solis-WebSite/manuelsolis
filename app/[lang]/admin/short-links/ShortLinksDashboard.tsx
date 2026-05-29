'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Link2,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  Search,
  TrendingUp,
  Globe,
  Target,
  Activity,
  Filter,
} from 'lucide-react';

interface SlugStats {
  totalClicks: number;
  clicks7d: number;
  clicks30d: number;
  lastClickAt?: string;
  recentReferrers: { host: string; count: number }[];
  byDevice: { device: string; count: number }[];
  byCountry: { country: string; count: number }[];
}

interface ShortLinkRow {
  slug: string;
  destination: string;
  utm: {
    source: string;
    medium: string;
    campaign?: string;
    content?: string;
    term?: string;
  };
  notes?: string;
  stats: SlugStats;
}

interface ChannelEntry {
  key: string;
  sessions: number;
  pageViews: number;
  conversions: number;
  qualifiedLeads: number;
}

interface RecentEvent {
  timestamp: string;
  slug: string;
  source: string;
  medium: string;
  campaign?: string;
  content?: string;
  referrer?: string;
  country?: string;
  deviceType?: string;
}

interface ApiResponse {
  meta: { generatedAt: string; windowDays: number; totalEvents: number };
  rows: ShortLinkRow[];
  channels: {
    bySource: ChannelEntry[];
    byMedium: ChannelEntry[];
    byCampaign: ChannelEntry[];
    byContent: ChannelEntry[];
  };
  firstTouchSources: ChannelEntry[];
  recentGoEvents: RecentEvent[];
}

const NAVY = '#001540';
const GOLD = '#B2904D';
const GOLD_BG = '#fbf7ef';

function formatRelative(iso?: string): string {
  if (!iso) return '—';
  const diff = Date.now() - new Date(iso).getTime();
  if (diff < 60_000) return 'hace segundos';
  if (diff < 3_600_000) return `hace ${Math.floor(diff / 60_000)} min`;
  if (diff < 86_400_000) return `hace ${Math.floor(diff / 3_600_000)} h`;
  return `hace ${Math.floor(diff / 86_400_000)} d`;
}

function origin(): string {
  if (typeof window === 'undefined') return 'https://www.manuelsolis.com';
  return window.location.origin;
}

export default function ShortLinksDashboard({ lang }: { lang: 'es' | 'en' }) {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch('/api/admin/short-links', { credentials: 'include' })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const body = (await res.json()) as ApiResponse;
        if (!cancelled) setData(body);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Error');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [refreshTick]);

  const sources = useMemo(() => {
    if (!data) return [] as string[];
    return Array.from(new Set(data.rows.map((r) => r.utm.source))).sort();
  }, [data]);

  const filteredRows = useMemo(() => {
    if (!data) return [] as ShortLinkRow[];
    const q = query.trim().toLowerCase();
    return data.rows.filter((r) => {
      if (sourceFilter !== 'all' && r.utm.source !== sourceFilter) return false;
      if (!q) return true;
      const hay = [
        r.slug,
        r.destination,
        r.utm.source,
        r.utm.medium,
        r.utm.campaign,
        r.utm.content,
        r.notes,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [data, query, sourceFilter]);

  const totalClicks30d = useMemo(() => {
    if (!data) return 0;
    return data.rows.reduce((acc, r) => acc + r.stats.clicks30d, 0);
  }, [data]);

  const totalClicks7d = useMemo(() => {
    if (!data) return 0;
    return data.rows.reduce((acc, r) => acc + r.stats.clicks7d, 0);
  }, [data]);

  async function handleCopy(slug: string) {
    try {
      await navigator.clipboard.writeText(`${origin()}/go/${slug}`);
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 1500);
    } catch {
      // ignore
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f6fa] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <Link
                href={`/${lang}/admin`}
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#001540] mb-3"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Volver al panel
              </Link>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-xs font-bold tracking-wider uppercase mb-3"
                style={{ background: NAVY }}
              >
                <Link2 className="w-3.5 h-3.5" />
                Short Links · Atribución
              </div>
              <h1
                className="text-3xl md:text-4xl font-bold tracking-tight"
                style={{ color: NAVY }}
              >
                Tracking de Canales y Campañas
              </h1>
              <p className="text-sm text-gray-600 mt-2 max-w-3xl">
                Cada slug del registry redirige a una URL con UTMs canónicos.
                Aquí ves <strong>de dónde llega cada visitante</strong>, qué
                canal trae más clicks y qué campaña convierte. Datos del
                Flight Check propio (ventana de 30 días).
              </p>
            </div>
            <button
              type="button"
              onClick={() => setRefreshTick((t) => t + 1)}
              className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#001540] hover:bg-white px-3 py-2 rounded-lg transition border border-gray-200"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refrescar
            </button>
          </div>
          <div className="h-[3px] w-20 mt-4 rounded-full" style={{ background: GOLD }} />
        </header>

        {/* KPIs */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KpiCard
            icon={Link2}
            label="Slugs activos"
            value={data ? data.rows.length : '—'}
            sub="catálogo en código"
          />
          <KpiCard
            icon={TrendingUp}
            label="Clicks 30 días"
            value={data ? totalClicks30d.toLocaleString() : '—'}
            sub="todos los /go/*"
          />
          <KpiCard
            icon={Activity}
            label="Clicks últimos 7 días"
            value={data ? totalClicks7d.toLocaleString() : '—'}
            sub="ventana corta"
          />
          <KpiCard
            icon={Target}
            label="Eventos totales en ventana"
            value={data ? data.meta.totalEvents.toLocaleString() : '—'}
            sub="page_views + conversiones"
          />
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
            Error cargando datos: {error}
          </div>
        )}

        {/* Filtros */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar slug, destino, campaña…"
                className="w-full text-sm border-0 focus:outline-none focus:ring-0 bg-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="text-sm border border-gray-200 rounded-md px-2 py-1.5 bg-white"
              >
                <option value="all">Todos los sources</option>
                {sources.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tabla de slugs */}
        <section className="mb-10">
          <SectionHeader
            icon={Link2}
            title="Registry de short-links"
            subtitle={
              data
                ? `${filteredRows.length} de ${data.rows.length} slugs (filtrados)`
                : 'Cargando…'
            }
          />
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr
                    className="text-left text-[10px] font-bold uppercase tracking-wider text-white"
                    style={{ background: NAVY }}
                  >
                    <th className="px-4 py-3">Slug · URL pública</th>
                    <th className="px-4 py-3">Atribución</th>
                    <th className="px-4 py-3">Destino</th>
                    <th className="px-4 py-3 text-right">7d</th>
                    <th className="px-4 py-3 text-right">30d</th>
                    <th className="px-4 py-3">Último click</th>
                    <th className="px-4 py-3 w-1">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading && !data && (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-gray-400 text-xs">
                        Cargando registry…
                      </td>
                    </tr>
                  )}
                  {data &&
                    filteredRows.map((row) => (
                      <tr key={row.slug} className="hover:bg-[#fbf7ef]/40">
                        <td className="px-4 py-3 align-top">
                          <div className="font-mono text-xs font-bold" style={{ color: NAVY }}>
                            /go/{row.slug}
                          </div>
                          {row.notes && (
                            <div className="text-[11px] text-gray-500 mt-1 max-w-[260px]">
                              {row.notes}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 align-top">
                          <div className="flex flex-wrap gap-1">
                            <Pill label="source" value={row.utm.source} tone="navy" />
                            <Pill label="medium" value={row.utm.medium} tone="navy" />
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {row.utm.campaign && (
                              <Pill label="campaign" value={row.utm.campaign} tone="gold" />
                            )}
                            {row.utm.content && (
                              <Pill label="content" value={row.utm.content} tone="gray" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <div className="text-xs text-gray-700 font-mono break-all max-w-[280px]">
                            {row.destination}
                          </div>
                        </td>
                        <td className="px-4 py-3 align-top text-right font-bold" style={{ color: NAVY }}>
                          {row.stats.clicks7d}
                        </td>
                        <td className="px-4 py-3 align-top text-right">
                          <div className="font-bold" style={{ color: NAVY }}>
                            {row.stats.clicks30d}
                          </div>
                          {row.stats.totalClicks > row.stats.clicks30d && (
                            <div className="text-[10px] text-gray-400">
                              total: {row.stats.totalClicks}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 align-top text-xs text-gray-600">
                          {formatRelative(row.stats.lastClickAt)}
                        </td>
                        <td className="px-4 py-3 align-top">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleCopy(row.slug)}
                              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-[#001540] transition"
                              title="Copiar URL pública"
                            >
                              {copiedSlug === row.slug ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <a
                              href={`/go/${row.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-[#001540] transition"
                              title="Probar redirect"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  {data && filteredRows.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-gray-400 text-xs">
                        Sin resultados para el filtro actual.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-[11px] text-gray-500 mt-2 px-1">
            Para añadir un nuevo slug, edita{' '}
            <code className="px-1 bg-gray-100 rounded">app/lib/shortLinks.ts</code>{' '}
            siguiendo la taxonomía en{' '}
            <code className="px-1 bg-gray-100 rounded">docs/UTM_TAXONOMY.md</code>.
          </p>
        </section>

        {/* Channels — datos del SITIO COMPLETO, no solo /go/* */}
        {data && (
          <section className="mb-10">
            <SectionHeader
              icon={Globe}
              title="Tráfico global por canal"
              subtitle="Toda la sesión del sitio (incluye visitantes que no pasaron por /go/*). Atribución del momento (last touch)."
            />
            <div className="grid md:grid-cols-2 gap-4">
              <ChannelTable title="Por source" rows={data.channels.bySource} />
              <ChannelTable title="Por medium" rows={data.channels.byMedium} />
              <ChannelTable title="Por campaign" rows={data.channels.byCampaign} />
              <ChannelTable title="Por content" rows={data.channels.byContent} />
            </div>
          </section>
        )}

        {/* First touch */}
        {data && (
          <section className="mb-10">
            <SectionHeader
              icon={Target}
              title="First-touch attribution (cookie msl_attr)"
              subtitle="Qué canal trajo originalmente al visitante que finalmente convirtió. Más útil para decidir presupuesto de adquisición."
            />
            <ChannelTable
              title="Conversiones por first-touch source"
              rows={data.firstTouchSources}
            />
          </section>
        )}

        {/* Feed reciente */}
        {data && (
          <section className="mb-10">
            <SectionHeader
              icon={Activity}
              title="Últimos 50 clicks en /go/*"
              subtitle="Feed en vivo del Flight Check (in-memory, se pierde con cold starts)."
            />
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr
                      className="text-left text-[10px] font-bold uppercase tracking-wider text-white"
                      style={{ background: NAVY }}
                    >
                      <th className="px-4 py-3">Cuándo</th>
                      <th className="px-4 py-3">Slug</th>
                      <th className="px-4 py-3">Atribución</th>
                      <th className="px-4 py-3">Referrer</th>
                      <th className="px-4 py-3">Device · País</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.recentGoEvents.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-gray-400 text-xs">
                          Aún no hay clicks en short-links. Apenas alguien los use, aparecen aquí.
                        </td>
                      </tr>
                    )}
                    {data.recentGoEvents.map((e, i) => (
                      <tr key={i} className="hover:bg-[#fbf7ef]/40">
                        <td className="px-4 py-3 text-xs text-gray-600 align-top whitespace-nowrap">
                          {formatRelative(e.timestamp)}
                        </td>
                        <td className="px-4 py-3 align-top">
                          <span className="font-mono text-xs font-bold" style={{ color: NAVY }}>
                            /go/{e.slug}
                          </span>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <div className="flex flex-wrap gap-1">
                            <Pill label="src" value={e.source} tone="navy" />
                            <Pill label="med" value={e.medium} tone="navy" />
                            {e.campaign && <Pill label="cmp" value={e.campaign} tone="gold" />}
                          </div>
                        </td>
                        <td className="px-4 py-3 align-top text-xs text-gray-600 max-w-[200px] break-all">
                          {e.referrer || <span className="text-gray-400">—</span>}
                        </td>
                        <td className="px-4 py-3 align-top text-xs text-gray-600">
                          {e.deviceType || 'unknown'} · {e.country || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        <div className="mt-12 px-5 py-4 bg-white/60 border border-gray-200 rounded-xl">
          <p className="text-xs text-gray-500">
            Los datos vienen del Flight Check propio (ledger in-memory por instancia
            de Vercel). Para histórico canónico cruza con GA4. La cookie de
            atribución <code className="px-1 bg-gray-100 rounded">msl_attr</code>{' '}
            dura 90 días y preserva first-touch + last-touch del visitante.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Pieces ───

function KpiCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: string | number;
  sub: string;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
          {label}
        </span>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: GOLD_BG }}
        >
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="text-2xl font-bold" style={{ color: NAVY }}>
        {value}
      </div>
      <div className="text-[11px] text-gray-500 mt-0.5">{sub}</div>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div
        className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
        style={{ background: NAVY }}
      >
        <Icon className="w-5 h-5" style={{ color: GOLD }} />
      </div>
      <div>
        <h2 className="text-xl font-bold" style={{ color: NAVY }}>
          {title}
        </h2>
        <p className="text-sm text-gray-600 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

function Pill({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'navy' | 'gold' | 'gray';
}) {
  const toneClass =
    tone === 'navy'
      ? 'bg-[#001540] text-white'
      : tone === 'gold'
        ? 'bg-[#B2904D] text-white'
        : 'bg-gray-100 text-gray-700';
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${toneClass}`}
    >
      <span className="opacity-70 uppercase">{label}</span>
      <span>{value}</span>
    </span>
  );
}

function ChannelTable({ title, rows }: { title: string; rows: ChannelEntry[] }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="font-bold text-sm" style={{ color: NAVY }}>
          {title}
        </h3>
      </div>
      <div className="overflow-x-auto max-h-[360px] overflow-y-auto">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-[#fbf7ef]/80 backdrop-blur">
            <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-gray-500">
              <th className="px-3 py-2">Clave</th>
              <th className="px-3 py-2 text-right">Sesiones</th>
              <th className="px-3 py-2 text-right">PV</th>
              <th className="px-3 py-2 text-right">Conv.</th>
              <th className="px-3 py-2 text-right">Leads</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-4 text-center text-gray-400">
                  Sin datos en la ventana.
                </td>
              </tr>
            )}
            {rows.map((r) => (
              <tr key={r.key} className="hover:bg-[#fbf7ef]/40">
                <td className="px-3 py-2 font-mono truncate max-w-[180px]" style={{ color: NAVY }}>
                  {r.key}
                </td>
                <td className="px-3 py-2 text-right">{r.sessions}</td>
                <td className="px-3 py-2 text-right text-gray-500">{r.pageViews}</td>
                <td className="px-3 py-2 text-right font-bold" style={{ color: NAVY }}>
                  {r.conversions}
                </td>
                <td className="px-3 py-2 text-right font-bold" style={{ color: GOLD }}>
                  {r.qualifiedLeads}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
