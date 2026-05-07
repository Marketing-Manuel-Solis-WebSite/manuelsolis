/**
 * Lead capture pipeline — manuelsolis.com v3.0
 *
 * Pure functions for normalizing raw form input into the canonical
 * lead payload, plus the HTTP client that posts to the lead
 * destination with retry and structured logging.
 *
 * Architectural separation:
 *   - mapFormToPayload(input): pure, no I/O — fully unit-testable.
 *   - postLead(payload, opts): I/O with retry + JSON logs.
 *
 * The destination URL is read from the LEAD_CAPTURE_ENDPOINT env var
 * with a fall-back to the current bos.manuelsolis.com endpoint.
 * Phase 3b will swap LEAD_CAPTURE_ENDPOINT to Solislead with a
 * single env-var change in Vercel — no code change needed.
 *
 * Server-only module. Do NOT import from client components — the
 * raw form data should be POST'd to /api/lead-capture, which runs
 * mapFormToPayload + postLead on the server.
 *
 * See DISCOVERY_v3.md §10.4 for the contract.
 */

const DEFAULT_LEAD_ENDPOINT = 'https://bos.manuelsolis.com/lead/manuelsolis';

export const SENTINEL_SOURCES = ['(direct)', '(none)', '(not set)'] as const;

export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'unknown';

export interface LeadFormInput {
  // Required user-provided
  first_name: string;
  last_name?: string;
  phone: string;
  email: string;
  enquiry_detail?: string;
  acceptedTerms: boolean;
  marketingConsent?: boolean;

  // URL-derived context (client supplies)
  page_url: string;
  language: 'es' | 'en';

  // UTMs already-normalized at the client; server defends with same
  // sentinels in case input arrives from non-website integrations.
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;

  // Click IDs from ad networks
  gclid?: string | null;
  fbclid?: string | null;

  // Session
  session_id?: string | null;

  // Server-enriched (server fills these in)
  device_type?: DeviceType;
  country?: string | null;
}

export interface LeadPayload {
  // Identity (legacy + structured)
  name: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;

  // Detail with optional "| Fuente: X" suffix for paid traffic
  enquiry_detail: string;

  // Consent flags (numeric for legacy compat with bos.manuelsolis.com)
  acceptedTerms: 0 | 1;
  marketingConsent: 0 | 1;

  // URL context — `uri` kept for legacy compat; `page_url` is the v3 name
  uri: string;
  page_url: string;
  language_preference: 'es' | 'en';

  // Attribution (both legacy and namespaced for downstream flexibility)
  source: string;
  utm_source: string;
  medium: string;
  utm_medium: string;
  campaign: string;
  utm_campaign: string;
  utm_content: string | null;
  utm_term: string | null;
  gclid: string | null;
  fbclid: string | null;

  // Inference (new in v3.0)
  practice_area_inferred: string | null;
  office_inferred: string | null;

  // Session
  session_id: string | null;
  device_type: DeviceType;
  country: string | null;
}

export class LeadValidationError extends Error {
  constructor(
    public field: string,
    message: string,
  ) {
    super(message);
    this.name = 'LeadValidationError';
  }
}

// ─── Pure helpers (exported for unit tests) ───

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_MIN_DIGITS = 7;

function isMissing(v: unknown): boolean {
  return (
    v === undefined ||
    v === null ||
    (typeof v === 'string' && (v.trim() === '' || v === 'null' || v === 'undefined'))
  );
}

function trimOrNull(v: unknown): string | null {
  if (isMissing(v)) return null;
  if (typeof v !== 'string') return null;
  const t = v.trim();
  return t === '' ? null : t;
}

export function normalizeUtmSource(raw: unknown): string {
  return isMissing(raw) ? '(direct)' : String(raw).trim();
}

export function normalizeUtmMedium(raw: unknown): string {
  return isMissing(raw) ? '(none)' : String(raw).trim();
}

export function normalizeUtmCampaign(raw: unknown): string {
  return isMissing(raw) ? '(not set)' : String(raw).trim();
}

export function isSentinelSource(source: string): boolean {
  return (SENTINEL_SOURCES as readonly string[]).includes(source);
}

export function buildEnquiryDetail(detail: string | undefined, source: string): string {
  const base = (detail ?? '').trim();
  if (!source || isSentinelSource(source)) return base;
  return base ? `${base} | Fuente: ${source}` : `Fuente: ${source}`;
}

export function inferPracticeArea(pathname: string): string | null {
  // Service master pages: /[lang]/servicios/{slug}
  const m = pathname.match(/\/(?:es|en)\/servicios\/([^/?#]+)/);
  if (m) return m[1];

  // City-service landings (no /servicios/ prefix)
  if (/\/(?:es|en)\/abogado-inmigracion-/.test(pathname)) return 'inmigracion';
  if (/\/(?:es|en)\/abogado-accidentes-/.test(pathname)) return 'accidentes';
  if (/\/(?:es|en)\/asilo-politico-/.test(pathname)) return 'asilo';
  if (/\/(?:es|en)\/defensa-deportacion-/.test(pathname)) return 'defensa-deportacion';
  if (/\/(?:es|en)\/vawa-[a-z]/.test(pathname)) return 'vawa';
  if (/\/(?:es|en)\/visa-u-[a-z]/.test(pathname)) return 'visa-u';

  return null;
}

export function inferOffice(pathname: string): string | null {
  // Office master pages: /[lang]/oficinas/{slug}
  const officeMatch = pathname.match(/\/(?:es|en)\/oficinas\/([^/?#]+)/);
  if (officeMatch) return officeMatch[1];

  // City-service landings: trailing city slug
  const cityPatterns: RegExp[] = [
    /\/(?:es|en)\/abogado-inmigracion-([a-z-]+)/,
    /\/(?:es|en)\/abogado-accidentes-([a-z-]+)/,
    /\/(?:es|en)\/asilo-politico-([a-z-]+)/,
    /\/(?:es|en)\/defensa-deportacion-([a-z-]+)/,
    /\/(?:es|en)\/vawa-([a-z-]+)/,
    /\/(?:es|en)\/visa-u-([a-z-]+)/,
  ];
  for (const re of cityPatterns) {
    const m = pathname.match(re);
    if (m) return m[1];
  }
  return null;
}

export function detectDeviceTypeFromUA(ua: string | null | undefined): DeviceType {
  if (!ua) return 'unknown';
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) return 'tablet';
  if (/Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) return 'mobile';
  return 'desktop';
}

// ─── Validation ───

function validate(input: LeadFormInput): void {
  if (!input.first_name || !input.first_name.trim()) {
    throw new LeadValidationError('first_name', 'first_name is required');
  }
  if (!input.phone || input.phone.replace(/\D/g, '').length < PHONE_MIN_DIGITS) {
    throw new LeadValidationError(
      'phone',
      `phone must contain at least ${PHONE_MIN_DIGITS} digits`,
    );
  }
  // Trim before regex check so leading/trailing whitespace is tolerated.
  const emailTrimmed = (input.email ?? '').trim();
  if (!emailTrimmed || !EMAIL_RE.test(emailTrimmed)) {
    throw new LeadValidationError('email', 'invalid email address');
  }
  if (input.acceptedTerms !== true) {
    throw new LeadValidationError('acceptedTerms', 'acceptedTerms must be true');
  }
  if (input.language !== 'es' && input.language !== 'en') {
    throw new LeadValidationError('language', "language must be 'es' or 'en'");
  }
}

// ─── Main mapper (pure) ───

export function mapFormToPayload(input: LeadFormInput): LeadPayload {
  validate(input);

  const source = normalizeUtmSource(input.utm_source);
  const medium = normalizeUtmMedium(input.utm_medium);
  const campaign = normalizeUtmCampaign(input.utm_campaign);

  const detail = buildEnquiryDetail(input.enquiry_detail, source);

  // Derive a pathname for inference. Accept either a full URL or
  // a bare pathname.
  let pathname = '';
  try {
    pathname = new URL(input.page_url).pathname;
  } catch {
    pathname = input.page_url || '';
  }

  return {
    name: input.first_name.trim(),
    first_name: input.first_name.trim(),
    last_name: (input.last_name ?? '').trim(),
    phone: input.phone.trim(),
    email: input.email.trim(),
    enquiry_detail: detail,
    acceptedTerms: input.acceptedTerms ? 1 : 0,
    marketingConsent: input.marketingConsent ? 1 : 0,
    uri: input.page_url,
    page_url: input.page_url,
    language_preference: input.language,
    source,
    utm_source: source,
    medium,
    utm_medium: medium,
    campaign,
    utm_campaign: campaign,
    utm_content: trimOrNull(input.utm_content),
    utm_term: trimOrNull(input.utm_term),
    gclid: trimOrNull(input.gclid),
    fbclid: trimOrNull(input.fbclid),
    practice_area_inferred: inferPracticeArea(pathname),
    office_inferred: inferOffice(pathname),
    session_id: trimOrNull(input.session_id),
    device_type: input.device_type ?? 'unknown',
    country: trimOrNull(input.country),
  };
}

// ─── HTTP poster (with retry + structured logs) ───

export interface PostLeadOptions {
  endpoint?: string;
  maxAttempts?: number;
  baseDelayMs?: number;
  signal?: AbortSignal;
}

export interface PostLeadResult {
  ok: boolean;
  attempts: number;
  status?: number;
  error?: string;
}

function getEndpoint(opts: PostLeadOptions): string {
  return opts.endpoint ?? process.env.LEAD_CAPTURE_ENDPOINT ?? DEFAULT_LEAD_ENDPOINT;
}

/**
 * POSTs the payload to the lead destination with bounded retries.
 *
 * Retry policy:
 *   - Network errors: retry with exponential backoff.
 *   - 5xx responses:  retry with exponential backoff.
 *   - 4xx responses:  fail fast (no retry).
 *
 * Default cap: 3 attempts, base delay 200ms (so total worst-case
 * wait is ~600ms before final failure). Designed to fit comfortably
 * inside Vercel's default 300s function budget without keeping the
 * user waiting on UI.
 */
export async function postLead(
  payload: LeadPayload,
  options: PostLeadOptions = {},
): Promise<PostLeadResult> {
  const endpoint = getEndpoint(options);
  const maxAttempts = options.maxAttempts ?? 3;
  const baseDelayMs = options.baseDelayMs ?? 200;

  let lastError: string | undefined;
  let lastStatus: number | undefined;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: options.signal,
      });

      if (response.ok) {
        if (attempt > 1) {
          console.log(
            JSON.stringify({
              event: 'lead_capture_recovered',
              attempt,
              status: response.status,
              timestamp: new Date().toISOString(),
            }),
          );
        }
        return { ok: true, attempts: attempt, status: response.status };
      }

      lastStatus = response.status;
      lastError = `HTTP ${response.status}`;

      // 4xx — client-side mistake or backend rejection. Don't retry.
      if (response.status >= 400 && response.status < 500) {
        console.error(
          JSON.stringify({
            event: 'lead_capture_failed_4xx',
            attempts: attempt,
            status: response.status,
            timestamp: new Date().toISOString(),
          }),
        );
        return {
          ok: false,
          attempts: attempt,
          status: response.status,
          error: lastError,
        };
      }

      console.warn(
        JSON.stringify({
          event: 'lead_capture_attempt_failed',
          attempt,
          maxAttempts,
          status: response.status,
          timestamp: new Date().toISOString(),
        }),
      );
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
      console.warn(
        JSON.stringify({
          event: 'lead_capture_attempt_error',
          attempt,
          maxAttempts,
          error: lastError,
          timestamp: new Date().toISOString(),
        }),
      );
    }

    if (attempt < maxAttempts) {
      const delay = baseDelayMs * Math.pow(2, attempt - 1);
      await new Promise((r) => setTimeout(r, delay));
    }
  }

  console.error(
    JSON.stringify({
      event: 'lead_capture_failed_final',
      attempts: maxAttempts,
      status: lastStatus,
      error: lastError,
      timestamp: new Date().toISOString(),
    }),
  );

  return {
    ok: false,
    attempts: maxAttempts,
    status: lastStatus,
    error: lastError ?? 'Unknown',
  };
}
