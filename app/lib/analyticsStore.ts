/**
 * Almacén in-memory compartido para eventos de tracking propio.
 *
 * NOTA: Vercel ejecuta cada función en una instancia serverless aislada y
 * efímera. Esta tienda es por instancia y se pierde con cold starts. Sirve
 * como Flight Check para conciliar contra GA4/Meta Pixel/TikTok, no como
 * almacén canónico. Para un histórico real conviene exportar a un destino
 * persistente (KV, Postgres, Blob storage) en otra fase.
 */

export type StoredEventType =
  | 'form_submit'
  | 'phone_click'
  | 'whatsapp_click'
  | 'consulta_click'
  | 'qualified_lead'
  | 'page_view';

export interface StoredEvent {
  type: StoredEventType;
  source: string;
  medium: string;
  campaign?: string;
  content?: string;
  term?: string;
  label?: string;
  domain: string;
  path?: string;
  referrer?: string;
  language?: string;
  deviceType?: 'mobile' | 'tablet' | 'desktop' | 'unknown';
  screen?: string;
  sessionId?: string;
  timestamp: string; // ISO
  ip: string;
  userAgent?: string;
  country?: string;
  /**
   * First-touch attribution (cookie msl_attr). Atribuye el lead a la
   * campaña que lo trajo originalmente, no a la última. Útil para
   * decidir presupuesto entre canales que generan vs canales que cierran.
   */
  firstTouchSource?: string;
  firstTouchMedium?: string;
  firstTouchCampaign?: string;
  firstTouchContent?: string;
}

const MAX_STORED = 20000;
const RETENTION_MS = 90 * 24 * 60 * 60 * 1000; // 90 días

// Guarda en globalThis para sobrevivir HMR en dev.
const GLOBAL_KEY = '__msl_analytics_store__';
type GlobalStore = {
  events: StoredEvent[];
};

function getStore(): GlobalStore {
  const g = globalThis as unknown as Record<string, unknown>;
  if (!g[GLOBAL_KEY]) {
    g[GLOBAL_KEY] = { events: [] } satisfies GlobalStore;
  }
  return g[GLOBAL_KEY] as GlobalStore;
}

function cleanup(store: GlobalStore) {
  const cutoff = Date.now() - RETENTION_MS;
  let i = 0;
  while (
    i < store.events.length &&
    new Date(store.events[i].timestamp).getTime() < cutoff
  ) {
    i++;
  }
  if (i > 0) store.events.splice(0, i);
  if (store.events.length >= MAX_STORED) {
    store.events.splice(0, store.events.length - MAX_STORED + 1000);
  }
}

export function pushEvent(event: StoredEvent) {
  const store = getStore();
  cleanup(store);
  store.events.push(event);
}

export function listEvents(): readonly StoredEvent[] {
  const store = getStore();
  return store.events;
}

// ─── Filtros ───
export interface AnalyticsFilters {
  from?: number; // epoch ms
  to?: number;
  type?: StoredEventType | StoredEventType[];
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  domain?: string;
  pathPrefix?: string;
  language?: string;
  deviceType?: StoredEvent['deviceType'];
  search?: string; // busca en label/path/campaign/source/medium
}

export function filterEvents(filters: AnalyticsFilters): StoredEvent[] {
  const events = listEvents();
  const types = Array.isArray(filters.type)
    ? new Set(filters.type)
    : filters.type
      ? new Set([filters.type])
      : null;
  const search = filters.search?.toLowerCase().trim();

  return events.filter((e) => {
    const ts = new Date(e.timestamp).getTime();
    if (filters.from && ts < filters.from) return false;
    if (filters.to && ts > filters.to) return false;
    if (types && !types.has(e.type)) return false;
    if (filters.source && e.source !== filters.source) return false;
    if (filters.medium && e.medium !== filters.medium) return false;
    if (filters.campaign && (e.campaign || '') !== filters.campaign) return false;
    if (filters.content && (e.content || '') !== filters.content) return false;
    if (filters.domain && e.domain !== filters.domain) return false;
    if (filters.language && (e.language || '') !== filters.language) return false;
    if (filters.deviceType && e.deviceType !== filters.deviceType) return false;
    if (filters.pathPrefix && !(e.path || '').startsWith(filters.pathPrefix)) return false;
    if (search) {
      const hay = [
        e.label,
        e.path,
        e.campaign,
        e.source,
        e.medium,
        e.content,
        e.term,
        e.referrer,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!hay.includes(search)) return false;
    }
    return true;
  });
}
