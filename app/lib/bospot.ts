/**
 * BoSpot — destino de leads de Marketing (solisjobrunner.com).
 *
 * Contrato acordado con Oscar (sep-2026) y verificado contra el endpoint
 * el 2026-10-03:
 *   - POST JSON plano con `Authorization: Bearer <token>`.
 *   - 201 {status:'created'}   → lead nuevo.
 *   - 200 {status:'duplicate'} → ese event_id ya se había procesado: es la
 *     deduplicación de BoSpot, así que un reintento nunca crea dos leads.
 *   - 422 {status:'rejected', errors} → el payload no cumple el contrato.
 *   - 401 → token inválido.
 *   - Consentimientos como booleanos; oficina y área como texto libre.
 *
 * El `event_id` es el mismo que recibe el Pixel (eventID) en el navegador,
 * para que Meta no cuente dos veces el lead cuando BoSpot mande Lead
 * Qualified / Purchase por CAPI.
 *
 * Qué destinos reciben el lead lo decide LEAD_DESTINATION (ver
 * `resolveLeadDestinations`), sin tocar código para pasar de BOS a BoSpot.
 */
import type { LeadPayload } from './leadCapture';

export const BOSPOT_DEFAULT_ENDPOINT =
  'https://solisjobrunner.com/api/external-app/marketing/leads';

export const BOSPOT_SCHEMA_VERSION = '1.0';

export type LeadDestinationMode = 'bos' | 'both' | 'bospot';

export interface LeadDestinations {
  mode: LeadDestinationMode;
  /** El destino cuya falla dispara el correo de respaldo. */
  primary: 'bos' | 'bospot';
  bos: boolean;
  bospot: boolean;
}

/**
 * LEAD_DESTINATION:
 *   - `bos`    → solo BOS (comportamiento histórico, y el default).
 *   - `both`   → BOS y BoSpot en paralelo; BOS sigue siendo el primario.
 *   - `bospot` → solo BoSpot; los leads dejan de entrar a BOS.
 *
 * Sin BOSPOT_LEADS_TOKEN no se puede hablar con BoSpot, así que cualquier
 * modo que lo incluya se degrada a `bos` en vez de perder leads.
 */
export function resolveLeadDestinations(
  rawMode: string | undefined,
  hasBospotToken: boolean,
): LeadDestinations {
  const mode = (rawMode ?? '').trim().toLowerCase();
  if (hasBospotToken && mode === 'bospot') {
    return { mode: 'bospot', primary: 'bospot', bos: false, bospot: true };
  }
  if (hasBospotToken && mode === 'both') {
    return { mode: 'both', primary: 'bos', bos: true, bospot: true };
  }
  return { mode: 'bos', primary: 'bos', bos: true, bospot: false };
}

/** Datos del envío que BOS no recibe y BoSpot sí. */
export interface BospotLeadContext {
  event_id: string;
  submitted_at: string;
  /** URL del sitio tal cual, sin las UTMs que se inyectan para BOS. */
  page_url: string;
  first_touch_source?: string | null;
  first_touch_medium?: string | null;
  first_touch_campaign?: string | null;
  referrer?: string | null;
}

export interface BospotLeadPayload {
  schema_version: string;
  event_id: string;
  submitted_at: string;
  channel: 'web';
  source_platform: 'website';
  contact_method: 'form';
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  language_preference: 'es' | 'en';
  enquiry_detail: string;
  practice_area_inferred: string | null;
  office_inferred: string | null;
  acceptedTerms: boolean;
  marketingConsent: boolean;
  page_url: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  first_touch_source: string | null;
  first_touch_medium: string | null;
  first_touch_campaign: string | null;
  referrer: string | null;
  gclid: string | null;
  fbclid: string | null;
  fbp: string | null;
  fbc: string | null;
  client_ip_address: string | null;
  client_user_agent: string | null;
  meta_leadgen_id: null;
  form_name: null;
  campaign_name: null;
  adset_name: null;
  ad_name: null;
  session_id: string | null;
  device_type: LeadPayload['device_type'];
  country: string | null;
}

// Los centinelas GA4 y la etiqueta 'directo' son convenciones de BOS para
// "sin atribución": BoSpot guarda cada UTM por separado, así que ahí van null.
function realUtm(value: string | null | undefined): string | null {
  if (value === null || value === undefined) return null;
  const v = value.trim();
  if (!v || v.startsWith('(') || v === 'directo') return null;
  return v;
}

function cleanText(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const v = value.trim();
  if (!v || v === 'null' || v === 'undefined') return null;
  return v.slice(0, max);
}

/** El detalle sin el sufijo "| Fuente: X" que se añade solo para BOS. */
function stripSourceSuffix(detail: string, source: string): string {
  if (!source || source.startsWith('(')) return detail;
  const suffix = ` | Fuente: ${source}`;
  if (detail.endsWith(suffix)) return detail.slice(0, -suffix.length);
  if (detail === `Fuente: ${source}`) return '';
  return detail;
}

const EVENT_ID_RE = /^[A-Za-z0-9._-]{8,64}$/;

/** El event_id del navegador solo se acepta si tiene forma de id. */
export function normalizeEventId(raw: unknown, fallback: () => string): string {
  return typeof raw === 'string' && EVENT_ID_RE.test(raw.trim()) ? raw.trim() : fallback();
}

/** Solo referrers externos y http(s): uno interno no dice de dónde llegó. */
export function normalizeReferrer(raw: unknown): string | null {
  const value = cleanText(raw, 500);
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    if (/(^|\.)manuelsolis\.com$/i.test(url.hostname)) return null;
    return value;
  } catch {
    return null;
  }
}

export function buildBospotPayload(
  payload: LeadPayload,
  context: BospotLeadContext,
): BospotLeadPayload {
  return {
    schema_version: BOSPOT_SCHEMA_VERSION,
    event_id: context.event_id,
    submitted_at: context.submitted_at,
    channel: 'web',
    source_platform: 'website',
    contact_method: 'form',
    first_name: payload.first_name,
    last_name: payload.last_name,
    email: payload.email,
    phone: payload.phone,
    language_preference: payload.language_preference,
    enquiry_detail: stripSourceSuffix(payload.enquiry_detail, payload.source),
    practice_area_inferred: payload.practice_area_inferred,
    office_inferred: payload.office_inferred,
    acceptedTerms: payload.acceptedTerms === 1,
    marketingConsent: payload.marketingConsent === 1,
    page_url: context.page_url,
    utm_source: realUtm(payload.utm_source),
    utm_medium: realUtm(payload.utm_medium),
    utm_campaign: realUtm(payload.utm_campaign),
    utm_content: realUtm(payload.utm_content),
    utm_term: realUtm(payload.utm_term),
    first_touch_source: realUtm(cleanText(context.first_touch_source, 200)),
    first_touch_medium: realUtm(cleanText(context.first_touch_medium, 200)),
    first_touch_campaign: realUtm(cleanText(context.first_touch_campaign, 200)),
    referrer: normalizeReferrer(context.referrer),
    gclid: payload.gclid,
    fbclid: payload.fbclid,
    fbp: payload.fbp,
    fbc: payload.fbc,
    client_ip_address: payload.client_ip_address,
    client_user_agent: payload.client_user_agent,
    meta_leadgen_id: null,
    form_name: null,
    campaign_name: null,
    adset_name: null,
    ad_name: null,
    session_id: payload.session_id,
    device_type: payload.device_type,
    country: payload.country,
  };
}
