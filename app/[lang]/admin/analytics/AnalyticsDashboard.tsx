'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Calendar,
  Download,
  Eye,
  Filter,
  Flag,
  Globe2,
  Layers,
  LineChart as LineChartIcon,
  Loader2,
  MapPin,
  Megaphone,
  MousePointerClick,
  Phone,
  RefreshCw,
  Search,
  Smartphone,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';

// ─── Tipos del payload del endpoint ───
type Granularity = 'day' | 'week' | 'month';

type SeriesPoint = {
  date: string;
  total: number;
  conversions: number;
  pageViews: number;
  sessions: number;
};

type Breakdown = { key: string; total: number; conversions: number; sessions: number };
type SimpleBreakdown = { key: string; value: number };

type AnalyticsResponse = {
  meta: {
    generatedAt: string;
    retentionDays: number;
    maxStored: number;
    totalStored: number;
    note: string;
    filters: Record<string, unknown>;
  };
  kpis: {
    events: number;
    pageViews: number;
    conversions: number;
    qualifiedLeads: number;
    sessions: number;
    bounceRate: number;
    conversionRate: number;
    avgConversionsPerSession: number;
  };
  deltas: Record<
    string,
    { current: number; previous: number }
  >;
  series: SeriesPoint[];
  breakdowns: {
    byType: { key: string; total: number }[];
    bySource: Breakdown[];
    byMedium: Breakdown[];
    byCampaign: Breakdown[];
    byContent: Breakdown[];
    byDevice: Breakdown[];
    byLanguage: Breakdown[];
    byDomain: Breakdown[];
    byCountry: Breakdown[];
    bySourceMedium: SimpleBreakdown[];
    byReferrer: SimpleBreakdown[];
  };
  funnel: {
    pageViews: number;
    conversions: number;
    qualifiedLeads: number;
    totalSessions: number;
    sessionsWithConversion: number;
    sessionsWithQualifiedLead: number;
  };
  heatmap: number[][];
  topPaths: {
    path: string;
    pageViews: number;
    conversions: number;
    sessions: number;
    bounceRate: number;
    conversionRate: number;
  }[];
  raw: {
    page: number;
    pageSize: number;
    total: number;
    rows: Array<Record<string, unknown>>;
  };
  filterOptions: {
    sources: SimpleBreakdown[];
    mediums: SimpleBreakdown[];
    campaigns: SimpleBreakdown[];
    domains: SimpleBreakdown[];
    languages: SimpleBreakdown[];
    devices: SimpleBreakdown[];
  };
};

// ─── Filtros del cliente ───
type Filters = {
  preset: 'today' | '7d' | '30d' | '90d' | 'mtd' | 'custom';
  from?: string; // yyyy-mm-dd
  to?: string;
  granularity: Granularity;
  type: string;
  source: string;
  medium: string;
  campaign: string;
  device: string;
  language: string;
  pathPrefix: string;
  search: string;
};

const DEFAULT_FILTERS: Filters = {
  preset: '30d',
  granularity: 'day',
  type: '',
  source: '',
  medium: '',
  campaign: '',
  device: '',
  language: '',
  pathPrefix: '',
  search: '',
};

// ─── Utilidades de formato ───
const numberFmt = new Intl.NumberFormat('es-MX');

function fmtNum(n: number | undefined | null): string {
  if (n == null || !Number.isFinite(n)) return '0';
  return numberFmt.format(Math.round(n));
}

function fmtPct(n: number | undefined | null, digits = 1): string {
  if (n == null || !Number.isFinite(n)) return '0%';
  return `${(n * 100).toFixed(digits)}%`;
}

function fmtDelta(curr: number, prev: number): { delta: number; pct: number; up: boolean } {
  const delta = curr - prev;
  const pct = prev === 0 ? (curr > 0 ? 1 : 0) : delta / prev;
  return { delta, pct, up: delta >= 0 };
}

function presetToRange(preset: Filters['preset'], from?: string, to?: string) {
  const now = new Date();
  const end = new Date(now);
  end.setUTCHours(23, 59, 59, 999);
  const start = new Date(now);
  start.setUTCHours(0, 0, 0, 0);

  switch (preset) {
    case 'today':
      return { from: start.toISOString(), to: end.toISOString(), days: 1 };
    case '7d':
      start.setUTCDate(start.getUTCDate() - 6);
      return { from: start.toISOString(), to: end.toISOString(), days: 7 };
    case '30d':
      start.setUTCDate(start.getUTCDate() - 29);
      return { from: start.toISOString(), to: end.toISOString(), days: 30 };
    case '90d':
      start.setUTCDate(start.getUTCDate() - 89);
      return { from: start.toISOString(), to: end.toISOString(), days: 90 };
    case 'mtd':
      start.setUTCDate(1);
      return { from: start.toISOString(), to: end.toISOString(), days: 30 };
    case 'custom': {
      const fromIso = from ? new Date(`${from}T00:00:00Z`).toISOString() : start.toISOString();
      const toIso = to ? new Date(`${to}T23:59:59Z`).toISOString() : end.toISOString();
      return { from: fromIso, to: toIso, days: 30 };
    }
  }
}

function buildQuery(filters: Filters, page: number, pageSize: number): string {
  const range = presetToRange(filters.preset, filters.from, filters.to);
  const params = new URLSearchParams();
  params.set('from', range.from);
  params.set('to', range.to);
  params.set('granularity', filters.granularity);
  params.set('page', String(page));
  params.set('pageSize', String(pageSize));
  if (filters.type) params.set('type', filters.type);
  if (filters.source) params.set('source', filters.source);
  if (filters.medium) params.set('medium', filters.medium);
  if (filters.campaign) params.set('campaign', filters.campaign);
  if (filters.device) params.set('device', filters.device);
  if (filters.language) params.set('language', filters.language);
  if (filters.pathPrefix) params.set('pathPrefix', filters.pathPrefix);
  if (filters.search) params.set('q', filters.search);
  return params.toString();
}

// ─── Componente principal ───
export default function AnalyticsDashboard({ lang }: { lang: 'es' | 'en' }) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(50);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const q = buildQuery(filters, page, pageSize);
      const res = await fetch(`/api/analytics?${q}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as AnalyticsResponse;
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, [filters, page, pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(() => fetchData(), 30000);
    return () => clearInterval(id);
  }, [autoRefresh, fetchData]);

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  };

  const handleExportCsv = () => {
    if (!data) return;
    const rows = data.raw.rows;
    const headers = [
      'timestamp',
      'type',
      'source',
      'medium',
      'campaign',
      'content',
      'label',
      'path',
      'referrer',
      'language',
      'deviceType',
      'domain',
      'country',
      'sessionId',
    ];
    const csv = [
      headers.join(','),
      ...rows.map((r) =>
        headers
          .map((h) => {
            const v = r[h];
            if (v == null) return '';
            const s = String(v).replace(/"/g, '""');
            return `"${s}"`;
          })
          .join(','),
      ),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const filtersActive = useMemo(() => {
    const keys: (keyof Filters)[] = [
      'type',
      'source',
      'medium',
      'campaign',
      'device',
      'language',
      'pathPrefix',
      'search',
    ];
    return keys.filter((k) => filters[k]).length + (filters.preset !== '30d' ? 1 : 0);
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <Header
        lang={lang}
        loading={loading}
        autoRefresh={autoRefresh}
        onToggleAutoRefresh={() => setAutoRefresh((v) => !v)}
        onRefresh={fetchData}
        generatedAt={data?.meta.generatedAt}
      />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6">
        <FilterBar
          filters={filters}
          activeCount={filtersActive}
          options={data?.filterOptions}
          onChange={updateFilter}
          onReset={resetFilters}
        />

        {error ? (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-800">
            <strong className="block mb-1">No se pudo cargar la data</strong>
            <span className="opacity-80">{error}</span>
          </div>
        ) : null}

        {!data && loading ? (
          <div className="mt-12 flex flex-col items-center justify-center text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin text-[#B2904D]" />
            <p className="mt-3 text-sm">Cargando analytics…</p>
          </div>
        ) : null}

        {data ? (
          <>
            <KpiGrid kpis={data.kpis} deltas={data.deltas} />

            <SectionCard
              icon={LineChartIcon}
              title="Tendencia en el tiempo"
              subtitle="Eventos, conversiones y sesiones por bucket. Cambia la granularidad arriba (día, semana, mes)."
              right={
                <div className="inline-flex items-center gap-1 rounded-lg bg-[#fbf7ef] p-1 text-xs">
                  {(['day', 'week', 'month'] as Granularity[]).map((g) => (
                    <button
                      key={g}
                      onClick={() => updateFilter('granularity', g)}
                      className={`px-2.5 py-1 rounded-md transition ${
                        filters.granularity === g
                          ? 'bg-[#001540] text-white'
                          : 'text-gray-700 hover:bg-white'
                      }`}
                    >
                      {g === 'day' ? 'Día' : g === 'week' ? 'Semana' : 'Mes'}
                    </button>
                  ))}
                </div>
              }
            >
              <TimeSeriesChart series={data.series} />
            </SectionCard>

            <div className="grid lg:grid-cols-3 gap-4 mt-4">
              <SectionCard
                icon={Target}
                title="Funnel de conversión"
                subtitle="De page view a lead calificado, sobre el rango filtrado."
                className="lg:col-span-1"
              >
                <Funnel funnel={data.funnel} />
              </SectionCard>

              <SectionCard
                icon={Activity}
                title="Eventos por tipo"
                subtitle="Tipo de interacción registrada."
                className="lg:col-span-2"
              >
                <TypeBreakdown
                  byType={data.breakdowns.byType}
                  total={data.kpis.events}
                />
              </SectionCard>
            </div>

            <div className="grid lg:grid-cols-2 gap-4 mt-4">
              <SectionCard
                icon={Megaphone}
                title="Source / Medium"
                subtitle="Top combinaciones UTM source/medium del periodo."
              >
                <BreakdownTable
                  rows={data.breakdowns.bySourceMedium.map((r) => ({
                    key: r.key,
                    total: r.value,
                    conversions: 0,
                    sessions: 0,
                  }))}
                  showConversions={false}
                />
              </SectionCard>

              <SectionCard
                icon={Sparkles}
                title="Campañas (utm_campaign)"
                subtitle="Eventos y conversiones por campaña."
              >
                <BreakdownTable rows={data.breakdowns.byCampaign} />
              </SectionCard>
            </div>

            <SectionCard
              icon={MousePointerClick}
              title="Top URLs"
              subtitle="Páginas con más actividad. Bounce rate aproximado por sesión (1 PV, 0 conversiones)."
            >
              <TopPathsTable rows={data.topPaths} />
            </SectionCard>

            <div className="grid lg:grid-cols-3 gap-4 mt-4">
              <SectionCard
                icon={Smartphone}
                title="Dispositivo"
                subtitle="Distribución por device type."
              >
                <DonutBreakdown rows={data.breakdowns.byDevice} />
              </SectionCard>
              <SectionCard
                icon={Globe2}
                title="Idioma"
                subtitle="Idioma detectado del navegador."
              >
                <DonutBreakdown rows={data.breakdowns.byLanguage} />
              </SectionCard>
              <SectionCard
                icon={MapPin}
                title="País"
                subtitle="Detectado por header de Vercel."
              >
                <BreakdownTable
                  rows={data.breakdowns.byCountry}
                  compact
                  showConversions={false}
                />
              </SectionCard>
            </div>

            <SectionCard
              icon={Calendar}
              title="Heatmap día × hora"
              subtitle="Cuándo ocurre la actividad. Hora UTC."
            >
              <Heatmap grid={data.heatmap} />
            </SectionCard>

            <div className="grid lg:grid-cols-2 gap-4 mt-4">
              <SectionCard
                icon={Flag}
                title="Source breakdown"
                subtitle="Solo utm_source."
              >
                <BreakdownTable rows={data.breakdowns.bySource} />
              </SectionCard>
              <SectionCard
                icon={Layers}
                title="Medium breakdown"
                subtitle="Solo utm_medium."
              >
                <BreakdownTable rows={data.breakdowns.byMedium} />
              </SectionCard>
            </div>

            <SectionCard
              icon={Activity}
              title="Referrers externos"
              subtitle="De dónde llegan, excluyendo navegación interna."
            >
              {data.breakdowns.byReferrer.length === 0 ? (
                <Empty text="Aún no hay referrers externos registrados en este rango." />
              ) : (
                <BreakdownTable
                  rows={data.breakdowns.byReferrer.map((r) => ({
                    key: r.key,
                    total: r.value,
                    conversions: 0,
                    sessions: 0,
                  }))}
                  showConversions={false}
                />
              )}
            </SectionCard>

            <SectionCard
              icon={Eye}
              title="Eventos individuales"
              subtitle={`${fmtNum(data.raw.total)} eventos en el rango. Mostrando página ${data.raw.page}.`}
              right={
                <button
                  onClick={handleExportCsv}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#001540] text-white hover:bg-[#001540]/90 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  Exportar CSV (página)
                </button>
              }
            >
              <RawTable rows={data.raw.rows} />
              <Pagination
                page={page}
                total={data.raw.total}
                pageSize={pageSize}
                onChange={setPage}
              />
            </SectionCard>

            <FooterNote meta={data.meta} />
          </>
        ) : null}
      </div>
    </div>
  );
}

// ─── Encabezado ───
function Header({
  lang,
  loading,
  autoRefresh,
  generatedAt,
  onToggleAutoRefresh,
  onRefresh,
}: {
  lang: 'es' | 'en';
  loading: boolean;
  autoRefresh: boolean;
  generatedAt?: string;
  onToggleAutoRefresh: () => void;
  onRefresh: () => void;
}) {
  return (
    <header className="bg-gradient-to-br from-[#001540] via-[#001a55] to-[#002a78] text-white px-4 md:px-6 py-6 sticky top-0 z-30 shadow-md">
      <div className="max-w-[1400px] mx-auto flex items-start justify-between gap-4 flex-wrap">
        <div>
          <Link
            href={`/${lang}/admin`}
            className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white mb-2 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver al panel
          </Link>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10">
              <Activity className="w-5 h-5 text-[#B2904D]" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                Analytics · Flight Check
              </h1>
              <p className="text-xs text-white/60 mt-0.5">
                Tracking propio del sitio · UTMs, conversiones, page views y sesiones
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          {generatedAt ? (
            <span className="text-white/60 hidden md:inline">
              Actualizado {new Date(generatedAt).toLocaleTimeString('es-MX')}
            </span>
          ) : null}
          <button
            onClick={onToggleAutoRefresh}
            className={`px-3 py-1.5 rounded-lg border transition ${
              autoRefresh
                ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-100'
                : 'bg-white/5 border-white/15 text-white/80 hover:bg-white/10'
            }`}
          >
            Auto-refresh {autoRefresh ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={onRefresh}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#B2904D] text-white hover:bg-[#9a7c40] transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5" />
            )}
            Refrescar
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Filtros ───
function FilterBar({
  filters,
  activeCount,
  options,
  onChange,
  onReset,
}: {
  filters: Filters;
  activeCount: number;
  options?: AnalyticsResponse['filterOptions'];
  onChange: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  onReset: () => void;
}) {
  const presets: { id: Filters['preset']; label: string }[] = [
    { id: 'today', label: 'Hoy' },
    { id: '7d', label: '7 días' },
    { id: '30d', label: '30 días' },
    { id: '90d', label: '90 días' },
    { id: 'mtd', label: 'Este mes' },
    { id: 'custom', label: 'Custom' },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#B2904D]" />
          <h2 className="text-sm font-bold text-[#001540]">Filtros</h2>
          {activeCount > 0 ? (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#001540] text-white">
              {activeCount} activo{activeCount !== 1 ? 's' : ''}
            </span>
          ) : null}
        </div>
        {activeCount > 0 ? (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-[#001540] transition"
          >
            <X className="w-3 h-3" />
            Limpiar filtros
          </button>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        {presets.map((p) => (
          <button
            key={p.id}
            onClick={() => onChange('preset', p.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
              filters.preset === p.id
                ? 'bg-[#001540] text-white border-[#001540]'
                : 'bg-white text-gray-700 border-gray-200 hover:border-[#B2904D]'
            }`}
          >
            {p.label}
          </button>
        ))}

        {filters.preset === 'custom' ? (
          <div className="flex items-center gap-2 ml-2">
            <input
              type="date"
              value={filters.from || ''}
              onChange={(e) => onChange('from', e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5"
            />
            <span className="text-xs text-gray-500">→</span>
            <input
              type="date"
              value={filters.to || ''}
              onChange={(e) => onChange('to', e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5"
            />
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
        <SelectField
          label="Tipo"
          value={filters.type}
          onChange={(v) => onChange('type', v)}
          options={[
            { value: '', label: 'Todos' },
            { value: 'page_view', label: 'Page views' },
            { value: 'form_submit', label: 'Form submits' },
            { value: 'phone_click', label: 'Phone clicks' },
            { value: 'whatsapp_click', label: 'WhatsApp clicks' },
            { value: 'consulta_click', label: 'Consulta clicks' },
            { value: 'qualified_lead', label: 'Qualified leads' },
          ]}
        />
        <SelectField
          label="Source"
          value={filters.source}
          onChange={(v) => onChange('source', v)}
          options={[
            { value: '', label: 'Todas' },
            ...(options?.sources.slice(0, 30).map((s) => ({
              value: s.key,
              label: `${s.key} (${s.value})`,
            })) || []),
          ]}
        />
        <SelectField
          label="Medium"
          value={filters.medium}
          onChange={(v) => onChange('medium', v)}
          options={[
            { value: '', label: 'Todos' },
            ...(options?.mediums.slice(0, 30).map((s) => ({
              value: s.key,
              label: `${s.key} (${s.value})`,
            })) || []),
          ]}
        />
        <SelectField
          label="Campaña"
          value={filters.campaign}
          onChange={(v) => onChange('campaign', v)}
          options={[
            { value: '', label: 'Todas' },
            ...(options?.campaigns.slice(0, 30).map((s) => ({
              value: s.key,
              label: `${s.key} (${s.value})`,
            })) || []),
          ]}
        />
        <SelectField
          label="Dispositivo"
          value={filters.device}
          onChange={(v) => onChange('device', v)}
          options={[
            { value: '', label: 'Todos' },
            { value: 'mobile', label: 'Mobile' },
            { value: 'tablet', label: 'Tablet' },
            { value: 'desktop', label: 'Desktop' },
            { value: 'unknown', label: 'Desconocido' },
          ]}
        />
        <SelectField
          label="Idioma"
          value={filters.language}
          onChange={(v) => onChange('language', v)}
          options={[
            { value: '', label: 'Todos' },
            ...(options?.languages.slice(0, 12).map((s) => ({
              value: s.key,
              label: `${s.key} (${s.value})`,
            })) || []),
          ]}
        />
        <InputField
          label="Path empieza con"
          placeholder="/es/blog/..."
          value={filters.pathPrefix}
          onChange={(v) => onChange('pathPrefix', v)}
        />
        <InputField
          label="Búsqueda"
          icon={Search}
          placeholder="label, path, source…"
          value={filters.search}
          onChange={(v) => onChange('search', v)}
        />
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
        {label}
      </span>
      <div className="relative mt-1">
        {Icon ? (
          <Icon className="w-3.5 h-3.5 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
        ) : null}
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full text-xs border border-gray-200 rounded-lg py-1.5 pr-2 ${Icon ? 'pl-7' : 'pl-2'}`}
        />
      </div>
    </label>
  );
}

// ─── Card seccional ───
function SectionCard({
  icon: Icon,
  title,
  subtitle,
  right,
  children,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`bg-white border border-gray-200 rounded-2xl shadow-sm mt-4 ${className || ''}`}
    >
      <div className="flex items-start justify-between gap-3 px-5 pt-5">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#001540] flex-shrink-0">
            <Icon className="w-4 h-4 text-[#B2904D]" />
          </div>
          <div>
            <h3 className="font-bold text-[#001540]">{title}</h3>
            {subtitle ? <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p> : null}
          </div>
        </div>
        {right ? <div>{right}</div> : null}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

// ─── KPI grid ───
const KPI_CONFIG: {
  key: 'events' | 'pageViews' | 'conversions' | 'qualifiedLeads' | 'sessions';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}[] = [
  { key: 'events', label: 'Eventos', icon: Activity, color: 'text-violet-600 bg-violet-50' },
  { key: 'pageViews', label: 'Page views', icon: Eye, color: 'text-blue-600 bg-blue-50' },
  { key: 'sessions', label: 'Sesiones', icon: Users, color: 'text-cyan-700 bg-cyan-50' },
  { key: 'conversions', label: 'Conversiones', icon: MousePointerClick, color: 'text-amber-700 bg-amber-50' },
  { key: 'qualifiedLeads', label: 'Leads calificados', icon: Phone, color: 'text-emerald-700 bg-emerald-50' },
];

function KpiGrid({
  kpis,
  deltas,
}: {
  kpis: AnalyticsResponse['kpis'];
  deltas: AnalyticsResponse['deltas'];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3 mt-4">
      {KPI_CONFIG.map((cfg) => {
        const value = kpis[cfg.key];
        const d = deltas[cfg.key];
        const delta = d ? fmtDelta(d.current, d.previous) : null;
        return (
          <div
            key={cfg.key}
            className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${cfg.color}`}>
                <cfg.icon className="w-4 h-4" />
              </div>
              {delta ? (
                <DeltaBadge up={delta.up} pct={delta.pct} />
              ) : null}
            </div>
            <div className="text-2xl font-bold text-[#001540]">{fmtNum(value)}</div>
            <div className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">
              {cfg.label}
            </div>
          </div>
        );
      })}

      <KpiSimple label="Conv. rate" value={fmtPct(kpis.conversionRate)} icon={Target} color="text-fuchsia-700 bg-fuchsia-50" />
      <KpiSimple label="Bounce rate" value={fmtPct(kpis.bounceRate)} icon={TrendingDown} color="text-rose-700 bg-rose-50" inverse />
    </div>
  );
}

function KpiSimple({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  inverse?: boolean;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="text-2xl font-bold text-[#001540]">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">{label}</div>
    </div>
  );
}

function DeltaBadge({ up, pct }: { up: boolean; pct: number }) {
  const Icon = up ? ArrowUp : ArrowDown;
  const cls = up
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : 'bg-rose-50 text-rose-700 border-rose-200';
  if (!Number.isFinite(pct)) return null;
  return (
    <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${cls}`}>
      <Icon className="w-3 h-3" />
      {Math.abs(pct * 100).toFixed(0)}%
    </span>
  );
}

// ─── Chart de series temporales (custom SVG) ───
function TimeSeriesChart({ series }: { series: SeriesPoint[] }) {
  if (series.length === 0) {
    return <Empty text="Sin datos en el rango seleccionado." />;
  }
  const W = 1100;
  const H = 260;
  const PAD = { top: 16, right: 16, bottom: 28, left: 40 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const maxY = Math.max(1, ...series.map((s) => Math.max(s.pageViews, s.conversions, s.sessions)));
  const stepX = series.length > 1 ? innerW / (series.length - 1) : innerW;

  const xy = (i: number, v: number) => {
    const x = PAD.left + i * stepX;
    const y = PAD.top + innerH - (v / maxY) * innerH;
    return { x, y };
  };

  const linePath = (key: 'pageViews' | 'conversions' | 'sessions') =>
    series
      .map((p, i) => {
        const { x, y } = xy(i, p[key]);
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

  const areaPath = (key: 'pageViews' | 'conversions' | 'sessions') => {
    const top = series
      .map((p, i) => {
        const { x, y } = xy(i, p[key]);
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
    const last = xy(series.length - 1, 0);
    const first = xy(0, 0);
    return `${top} L${last.x.toFixed(1)},${last.y.toFixed(1)} L${first.x.toFixed(1)},${first.y.toFixed(1)} Z`;
  };

  // Etiquetas X (máx 8)
  const stride = Math.max(1, Math.ceil(series.length / 8));
  const xLabels = series.filter((_, i) => i % stride === 0 || i === series.length - 1);

  // Etiquetas Y (5)
  const yTicks = 5;
  const yLabels = Array.from({ length: yTicks + 1 }, (_, i) => {
    const v = (maxY / yTicks) * (yTicks - i);
    return { v, y: PAD.top + (innerH / yTicks) * i };
  });

  return (
    <div>
      <Legend
        items={[
          { color: '#3b82f6', label: 'Page views' },
          { color: '#B2904D', label: 'Conversiones' },
          { color: '#10b981', label: 'Sesiones' },
        ]}
      />
      <div className="overflow-x-auto -mx-2 px-2">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto min-w-[640px]"
          preserveAspectRatio="none"
        >
          {/* Grid Y */}
          {yLabels.map((t, i) => (
            <g key={i}>
              <line
                x1={PAD.left}
                x2={W - PAD.right}
                y1={t.y}
                y2={t.y}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
              <text x={PAD.left - 6} y={t.y + 4} fontSize={10} fill="#6b7280" textAnchor="end">
                {fmtNum(t.v)}
              </text>
            </g>
          ))}
          {/* Áreas */}
          <path d={areaPath('pageViews')} fill="#3b82f620" />
          {/* Líneas */}
          <path d={linePath('pageViews')} fill="none" stroke="#3b82f6" strokeWidth={2} />
          <path d={linePath('conversions')} fill="none" stroke="#B2904D" strokeWidth={2} />
          <path d={linePath('sessions')} fill="none" stroke="#10b981" strokeWidth={2} strokeDasharray="3 3" />
          {/* Puntos */}
          {series.map((p, i) => {
            const conv = xy(i, p.conversions);
            return (
              <circle key={i} cx={conv.x} cy={conv.y} r={2.5} fill="#B2904D">
                <title>{`${p.date} · ${p.conversions} conv · ${p.pageViews} PV · ${p.sessions} sesiones`}</title>
              </circle>
            );
          })}
          {/* Etiquetas X */}
          {xLabels.map((p, i) => {
            const idx = series.indexOf(p);
            const x = PAD.left + idx * stepX;
            return (
              <text
                key={i}
                x={x}
                y={H - 8}
                fontSize={10}
                fill="#6b7280"
                textAnchor="middle"
              >
                {p.date.length > 7 ? p.date.slice(5) : p.date}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function Legend({ items }: { items: { color: string; label: string }[] }) {
  return (
    <div className="flex items-center gap-3 mb-3 flex-wrap">
      {items.map((it) => (
        <div key={it.label} className="inline-flex items-center gap-1.5 text-xs text-gray-700">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ backgroundColor: it.color }}
          />
          {it.label}
        </div>
      ))}
    </div>
  );
}

// ─── Funnel ───
function Funnel({ funnel }: { funnel: AnalyticsResponse['funnel'] }) {
  const stages = [
    { label: 'Page views', value: funnel.pageViews, color: 'bg-blue-500' },
    { label: 'Sesiones', value: funnel.totalSessions, color: 'bg-cyan-500' },
    { label: 'Sesiones c/ conv', value: funnel.sessionsWithConversion, color: 'bg-amber-500' },
    { label: 'Conversiones', value: funnel.conversions, color: 'bg-[#B2904D]' },
    { label: 'Leads calificados', value: funnel.qualifiedLeads, color: 'bg-emerald-500' },
  ];
  const max = Math.max(1, ...stages.map((s) => s.value));
  return (
    <div className="space-y-2">
      {stages.map((s, i) => {
        const pct = (s.value / max) * 100;
        const dropoff =
          i > 0 && stages[i - 1].value > 0
            ? 1 - s.value / stages[i - 1].value
            : 0;
        return (
          <div key={s.label}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-medium text-gray-700">{s.label}</span>
              <span className="text-gray-900 font-bold">{fmtNum(s.value)}</span>
            </div>
            <div className="relative h-7 rounded-md bg-gray-100 overflow-hidden">
              <div
                className={`${s.color} h-full rounded-md transition-all`}
                style={{ width: `${Math.max(2, pct)}%` }}
              />
            </div>
            {i > 0 && dropoff > 0 ? (
              <div className="text-[10px] text-rose-600 mt-0.5">
                ↓ {(dropoff * 100).toFixed(0)}% drop vs paso anterior
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

// ─── Type breakdown como bar chart horizontal ───
function TypeBreakdown({
  byType,
  total,
}: {
  byType: { key: string; total: number }[];
  total: number;
}) {
  if (total === 0) return <Empty text="Sin eventos en el rango." />;
  const ordered = [...byType].sort((a, b) => b.total - a.total);
  const max = Math.max(1, ...ordered.map((b) => b.total));
  const colorFor = (key: string) => {
    switch (key) {
      case 'page_view': return 'bg-blue-500';
      case 'form_submit': return 'bg-emerald-500';
      case 'phone_click': return 'bg-amber-500';
      case 'whatsapp_click': return 'bg-green-500';
      case 'consulta_click': return 'bg-fuchsia-500';
      case 'qualified_lead': return 'bg-[#B2904D]';
      default: return 'bg-gray-400';
    }
  };
  const labelFor = (key: string) => {
    const map: Record<string, string> = {
      page_view: 'Page views',
      form_submit: 'Form submits',
      phone_click: 'Phone clicks',
      whatsapp_click: 'WhatsApp clicks',
      consulta_click: 'Consulta clicks',
      qualified_lead: 'Qualified leads',
    };
    return map[key] || key;
  };
  return (
    <div className="space-y-2.5">
      {ordered.map((b) => (
        <div key={b.key} className="grid grid-cols-[140px_1fr_70px] items-center gap-3">
          <span className="text-xs text-gray-700">{labelFor(b.key)}</span>
          <div className="h-5 rounded-md bg-gray-100 overflow-hidden">
            <div
              className={`${colorFor(b.key)} h-full rounded-md`}
              style={{ width: `${(b.total / max) * 100}%` }}
            />
          </div>
          <span className="text-xs font-bold text-[#001540] text-right">
            {fmtNum(b.total)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Tabla de breakdown ───
function BreakdownTable({
  rows,
  showConversions = true,
  compact = false,
}: {
  rows: Breakdown[];
  showConversions?: boolean;
  compact?: boolean;
}) {
  if (rows.length === 0) return <Empty text="Sin datos en el rango." />;
  const max = Math.max(1, ...rows.map((r) => r.total));
  return (
    <div className={`overflow-x-auto ${compact ? '' : ''}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-100">
            <th className="text-left py-2 font-semibold">Valor</th>
            <th className="text-right py-2 font-semibold w-24">Eventos</th>
            {showConversions ? (
              <>
                <th className="text-right py-2 font-semibold w-24">Conv.</th>
                <th className="text-right py-2 font-semibold w-24">Sesiones</th>
              </>
            ) : null}
            <th className="py-2 w-[30%]" />
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key} className="border-b border-gray-50 last:border-0">
              <td className="py-2 text-gray-800 truncate max-w-[260px]" title={r.key}>
                {r.key}
              </td>
              <td className="py-2 text-right font-bold text-[#001540]">
                {fmtNum(r.total)}
              </td>
              {showConversions ? (
                <>
                  <td className="py-2 text-right text-gray-700">
                    {fmtNum(r.conversions)}
                  </td>
                  <td className="py-2 text-right text-gray-700">
                    {fmtNum(r.sessions)}
                  </td>
                </>
              ) : null}
              <td className="py-2 pl-3">
                <div className="h-1.5 rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-[#B2904D]"
                    style={{ width: `${(r.total / max) * 100}%` }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Top URLs ───
type SortKey = 'pageViews' | 'conversions' | 'sessions' | 'bounceRate' | 'conversionRate';

function TopPathsTable({ rows }: { rows: AnalyticsResponse['topPaths'] }) {
  const [sortBy, setSortBy] = useState<SortKey>('pageViews');
  const [dir, setDir] = useState<'asc' | 'desc'>('desc');

  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      const av = a[sortBy];
      const bv = b[sortBy];
      return dir === 'desc' ? bv - av : av - bv;
    });
    return copy;
  }, [rows, sortBy, dir]);

  const handleSort = (key: SortKey) => {
    if (sortBy === key) setDir(dir === 'desc' ? 'asc' : 'desc');
    else {
      setSortBy(key);
      setDir('desc');
    }
  };

  if (rows.length === 0) return <Empty text="Sin actividad en URLs en este rango." />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-100">
            <th className="text-left py-2 font-semibold">URL</th>
            <SortableTh label="Page views" k="pageViews" sortBy={sortBy} dir={dir} onClick={handleSort} />
            <SortableTh label="Conv." k="conversions" sortBy={sortBy} dir={dir} onClick={handleSort} />
            <SortableTh label="Sesiones" k="sessions" sortBy={sortBy} dir={dir} onClick={handleSort} />
            <SortableTh label="Bounce" k="bounceRate" sortBy={sortBy} dir={dir} onClick={handleSort} />
            <SortableTh label="Conv. rate" k="conversionRate" sortBy={sortBy} dir={dir} onClick={handleSort} />
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => (
            <tr key={r.path} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
              <td className="py-2 pr-3 max-w-[420px]">
                <span className="block truncate text-gray-800" title={r.path}>
                  {r.path}
                </span>
              </td>
              <td className="py-2 text-right text-[#001540] font-bold">{fmtNum(r.pageViews)}</td>
              <td className="py-2 text-right">{fmtNum(r.conversions)}</td>
              <td className="py-2 text-right">{fmtNum(r.sessions)}</td>
              <td className="py-2 text-right">
                <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  r.bounceRate > 0.7 ? 'bg-rose-50 text-rose-700' :
                  r.bounceRate > 0.4 ? 'bg-amber-50 text-amber-700' :
                  'bg-emerald-50 text-emerald-700'
                }`}>
                  {fmtPct(r.bounceRate)}
                </span>
              </td>
              <td className="py-2 text-right">
                <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  r.conversionRate > 0.05 ? 'bg-emerald-50 text-emerald-700' :
                  r.conversionRate > 0.01 ? 'bg-amber-50 text-amber-700' :
                  'bg-gray-50 text-gray-600'
                }`}>
                  {fmtPct(r.conversionRate)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SortableTh({
  label,
  k,
  sortBy,
  dir,
  onClick,
}: {
  label: string;
  k: SortKey;
  sortBy: SortKey;
  dir: 'asc' | 'desc';
  onClick: (k: SortKey) => void;
}) {
  const active = sortBy === k;
  return (
    <th
      className={`text-right py-2 font-semibold cursor-pointer select-none w-24 ${
        active ? 'text-[#B2904D]' : ''
      }`}
      onClick={() => onClick(k)}
    >
      <span className="inline-flex items-center gap-0.5">
        {label}
        {active ? (
          dir === 'desc' ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />
        ) : null}
      </span>
    </th>
  );
}

// ─── Donut breakdown ───
function DonutBreakdown({ rows }: { rows: Breakdown[] }) {
  if (rows.length === 0) return <Empty text="Sin datos." />;
  const total = rows.reduce((sum, r) => sum + r.total, 0);
  const palette = ['#001540', '#B2904D', '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
  let acc = 0;
  const R = 60;
  const C = 2 * Math.PI * R;

  return (
    <div className="flex items-center gap-5">
      <svg width={150} height={150} viewBox="0 0 150 150">
        <circle cx={75} cy={75} r={R} fill="none" stroke="#f3f4f6" strokeWidth={20} />
        {rows.map((r, i) => {
          const frac = total === 0 ? 0 : r.total / total;
          const dash = frac * C;
          const offset = -((acc / total) * C);
          acc += r.total;
          return (
            <circle
              key={r.key}
              cx={75}
              cy={75}
              r={R}
              fill="none"
              stroke={palette[i % palette.length]}
              strokeWidth={20}
              strokeDasharray={`${dash} ${C - dash}`}
              strokeDashoffset={offset}
              transform="rotate(-90 75 75)"
            />
          );
        })}
        <text x={75} y={70} textAnchor="middle" fontSize={20} fontWeight={700} fill="#001540">
          {fmtNum(total)}
        </text>
        <text x={75} y={88} textAnchor="middle" fontSize={9} fill="#6b7280">
          eventos
        </text>
      </svg>
      <div className="flex-1 space-y-1.5 min-w-0">
        {rows.map((r, i) => (
          <div key={r.key} className="flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0"
                style={{ backgroundColor: palette[i % palette.length] }}
              />
              <span className="truncate text-gray-700" title={r.key}>{r.key}</span>
            </div>
            <span className="font-bold text-[#001540]">
              {fmtNum(r.total)}{' '}
              <span className="text-gray-400 font-normal">
                ({total > 0 ? ((r.total / total) * 100).toFixed(0) : 0}%)
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Heatmap día × hora ───
function Heatmap({ grid }: { grid: number[][] }) {
  const dayNames = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  const max = Math.max(1, ...grid.flat());
  const intensity = (v: number) => {
    if (v === 0) return '#f3f4f6';
    const t = v / max;
    // Mezcla blanco -> #B2904D
    const r = Math.round(243 + (178 - 243) * t);
    const g = Math.round(244 + (144 - 244) * t);
    const b = Math.round(246 + (77 - 246) * t);
    return `rgb(${r},${g},${b})`;
  };

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex flex-col gap-1 text-[10px] min-w-[640px]">
        <div className="grid" style={{ gridTemplateColumns: '24px repeat(24, 1fr)', gap: 2 }}>
          <div />
          {Array.from({ length: 24 }, (_, h) => (
            <div key={h} className="text-center text-gray-400">
              {h.toString().padStart(2, '0')}
            </div>
          ))}
        </div>
        {grid.map((row, day) => (
          <div
            key={day}
            className="grid"
            style={{ gridTemplateColumns: '24px repeat(24, 1fr)', gap: 2 }}
          >
            <div className="text-center text-gray-500 font-bold">{dayNames[day]}</div>
            {row.map((v, h) => (
              <div
                key={h}
                className="aspect-square rounded-sm relative group"
                style={{ backgroundColor: intensity(v) }}
                title={`${dayNames[day]} ${h}:00 — ${v} eventos`}
              />
            ))}
          </div>
        ))}
        <div className="flex items-center gap-2 mt-2 text-gray-500">
          <span>Menos</span>
          {[0, 0.2, 0.4, 0.6, 0.8, 1].map((t) => (
            <div
              key={t}
              className="w-4 h-3 rounded-sm"
              style={{ backgroundColor: intensity(Math.round(max * t)) }}
            />
          ))}
          <span>Más</span>
          <span className="ml-3 text-gray-400">Pico: {fmtNum(max)} eventos/hora</span>
        </div>
      </div>
    </div>
  );
}

// ─── Tabla raw ───
function RawTable({ rows }: { rows: AnalyticsResponse['raw']['rows'] }) {
  if (rows.length === 0) return <Empty text="No hay eventos individuales en este rango." />;
  return (
    <div className="overflow-x-auto -mx-2">
      <table className="w-full text-xs">
        <thead>
          <tr className="text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-100">
            <th className="text-left py-2 px-2 font-semibold">Timestamp</th>
            <th className="text-left py-2 px-2 font-semibold">Tipo</th>
            <th className="text-left py-2 px-2 font-semibold">Source / Medium</th>
            <th className="text-left py-2 px-2 font-semibold">Campaña</th>
            <th className="text-left py-2 px-2 font-semibold">Path</th>
            <th className="text-left py-2 px-2 font-semibold">Label</th>
            <th className="text-left py-2 px-2 font-semibold">Device</th>
            <th className="text-left py-2 px-2 font-semibold">Lang</th>
            <th className="text-left py-2 px-2 font-semibold">País</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
              <td className="py-1.5 px-2 text-gray-600 whitespace-nowrap">
                {String(r.timestamp).slice(0, 19).replace('T', ' ')}
              </td>
              <td className="py-1.5 px-2">
                <TypePill t={String(r.type)} />
              </td>
              <td className="py-1.5 px-2 text-gray-700">
                {String(r.source || '-')} / {String(r.medium || '-')}
              </td>
              <td className="py-1.5 px-2 text-gray-700">
                {(r.campaign as string) || '—'}
              </td>
              <td
                className="py-1.5 px-2 text-gray-700 truncate max-w-[280px]"
                title={String(r.path || '')}
              >
                {(r.path as string) || '—'}
              </td>
              <td className="py-1.5 px-2 text-gray-700">
                {(r.label as string) || '—'}
              </td>
              <td className="py-1.5 px-2 text-gray-700">
                {(r.deviceType as string) || '—'}
              </td>
              <td className="py-1.5 px-2 text-gray-700">
                {(r.language as string) || '—'}
              </td>
              <td className="py-1.5 px-2 text-gray-700">
                {(r.country as string) || '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TypePill({ t }: { t: string }) {
  const map: Record<string, string> = {
    page_view: 'bg-blue-50 text-blue-700',
    form_submit: 'bg-emerald-50 text-emerald-700',
    phone_click: 'bg-amber-50 text-amber-700',
    whatsapp_click: 'bg-green-50 text-green-700',
    consulta_click: 'bg-fuchsia-50 text-fuchsia-700',
    qualified_lead: 'bg-[#B2904D]/10 text-[#B2904D]',
  };
  return (
    <span
      className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded ${
        map[t] || 'bg-gray-100 text-gray-700'
      }`}
    >
      {t}
    </span>
  );
}

function Pagination({
  page,
  total,
  pageSize,
  onChange,
}: {
  page: number;
  total: number;
  pageSize: number;
  onChange: (p: number) => void;
}) {
  const lastPage = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="flex items-center justify-between mt-3 text-xs text-gray-600">
      <span>
        Página {page} de {lastPage} · {fmtNum(total)} eventos
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="px-2 py-1 rounded border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
        >
          ← Anterior
        </button>
        <button
          onClick={() => onChange(Math.min(lastPage, page + 1))}
          disabled={page >= lastPage}
          className="px-2 py-1 rounded border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="text-center py-8 text-sm text-gray-500">{text}</div>
  );
}

function FooterNote({ meta }: { meta: AnalyticsResponse['meta'] }) {
  return (
    <div className="mt-8 mb-12 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900">
      <strong className="block mb-1">Cómo leer este dashboard</strong>
      <p>
        {meta.note} Retención del store: <strong>{meta.retentionDays} días</strong>, capacidad
        máxima <strong>{fmtNum(meta.maxStored)}</strong> eventos. Cada función de Vercel
        guarda su propia copia, por lo que los totales pueden parpadear si hay varias instancias
        servidas. Para histórico canónico, conciliar contra GA4.
      </p>
    </div>
  );
}
