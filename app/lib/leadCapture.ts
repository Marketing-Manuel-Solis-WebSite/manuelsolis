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
 *   - sendLeadFallbackEmail(payload, result): dead-letter por correo
 *     cuando el destino no aceptó el lead (opt-in por env var).
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

/**
 * Inyecta los UTMs efectivos DENTRO de la URL que viaja en `page_url`/`uri`.
 *
 * BOS no lee los campos `utm_*` del payload: parsea los query params de la
 * URL. Si el visitante navegó internamente (o llegó directo), la URL del
 * momento del envío va limpia y BOS registra el lead sin atribución aunque
 * nuestros campos `utm_*` vayan llenos.
 *
 * Reglas:
 *   - Si la URL ya trae `utm_source`, se respeta tal cual (ya es atribuible).
 *   - Si no, se inyectan los valores efectivos ya normalizados. Los
 *     centinelas GA4 con paréntesis se traducen a las etiquetas que el
 *     equipo de BOS acordó para tráfico propio:
 *       (direct)  → Sitio web       (utm_source)
 *       (none)    → Organic         (utm_medium)
 *       (not set) → Organic_search  (utm_campaign, tráfico directo)
 *   - content/term/gclid/fbclid solo se añaden si tienen valor real.
 */
export function injectUtmsIntoUrl(
  pageUrl: string,
  utms: {
    source: string;
    medium: string;
    campaign: string;
    content?: string | null;
    term?: string | null;
    gclid?: string | null;
    fbclid?: string | null;
  },
): string {
  let url: URL;
  try {
    url = new URL(pageUrl);
  } catch {
    try {
      url = new URL(pageUrl || '/', 'https://www.manuelsolis.com');
    } catch {
      return pageUrl;
    }
  }

  if (trimOrNull(url.searchParams.get('utm_source'))) return pageUrl;

  // 'directo' es la etiqueta interna que el form pone como utm_campaign en
  // tráfico directo — para la URL cuenta como "sin campaña".
  const isSentinel = (v: string): boolean => isMissing(v) || v.startsWith('(') || v === 'directo';

  const sourceIsDirect = isSentinel(utms.source);
  url.searchParams.set('utm_source', sourceIsDirect ? 'Sitio web' : utms.source);
  url.searchParams.set('utm_medium', isSentinel(utms.medium) ? 'Organic' : utms.medium);
  // Campaña ausente: 'Organic_search' si el tráfico es del propio sitio;
  // con origen real pero sin campaña usamos 'sin-campana' para no mezclar.
  url.searchParams.set(
    'utm_campaign',
    isSentinel(utms.campaign)
      ? sourceIsDirect
        ? 'Organic_search'
        : 'sin-campana'
      : utms.campaign,
  );

  const content = trimOrNull(utms.content);
  const term = trimOrNull(utms.term);
  const gclid = trimOrNull(utms.gclid);
  const fbclid = trimOrNull(utms.fbclid);
  if (content) url.searchParams.set('utm_content', content);
  if (term) url.searchParams.set('utm_term', term);
  if (gclid && !url.searchParams.has('gclid')) url.searchParams.set('gclid', gclid);
  if (fbclid && !url.searchParams.has('fbclid')) url.searchParams.set('fbclid', fbclid);

  return url.toString();
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

  let source = normalizeUtmSource(input.utm_source);
  let medium = normalizeUtmMedium(input.utm_medium);
  let campaign = normalizeUtmCampaign(input.utm_campaign);

  // Defensa server-side: clientes con la cookie `msl_attr` antigua aún
  // mandan orígenes sintéticos derivados del referrer (p.ej.
  // `www.google.com / referral`). Solo las UTMs explícitas cuentan como
  // origen real — todo lo demás se degrada a tráfico directo del sitio.
  if (medium.toLowerCase() === 'referral') {
    source = '(direct)';
    medium = '(none)';
    campaign = '(not set)';
  }

  const detail = buildEnquiryDetail(input.enquiry_detail, source);

  // Derive a pathname for inference. Accept either a full URL or
  // a bare pathname.
  let pathname = '';
  try {
    pathname = new URL(input.page_url).pathname;
  } catch {
    pathname = input.page_url || '';
  }

  // BOS extrae la atribución parseando la URL, no los campos utm_*.
  // Garantizamos que la URL SIEMPRE lleve UTMs (reales o los slugs de
  // tráfico propio: sitio-web / directo).
  const urlWithUtms = injectUtmsIntoUrl(input.page_url, {
    source,
    medium,
    campaign,
    content: input.utm_content,
    term: input.utm_term,
    gclid: input.gclid,
    fbclid: input.fbclid,
  });

  return {
    name: input.first_name.trim(),
    first_name: input.first_name.trim(),
    last_name: (input.last_name ?? '').trim(),
    phone: input.phone.trim(),
    email: input.email.trim(),
    enquiry_detail: detail,
    acceptedTerms: input.acceptedTerms ? 1 : 0,
    marketingConsent: input.marketingConsent ? 1 : 0,
    uri: urlWithUtms,
    page_url: urlWithUtms,
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

  // Los datos del lead viajan en este log a propósito: cuando el destino
  // queda inaccesible es la única vía de recuperación manual desde los
  // logs de Vercel si LEAD_FALLBACK_EMAIL no está configurado.
  console.error(
    JSON.stringify({
      event: 'lead_capture_failed_final',
      attempts: maxAttempts,
      status: lastStatus,
      error: lastError,
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      page_url: payload.page_url,
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

// ─── Dead-letter: email de respaldo cuando el destino rechaza el lead ───

const LEAD_FALLBACK_FROM = 'Manuel Solis Law <newsletter@manuelsolis.com>';

function parseFallbackRecipients(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(',')
    .map((address) => address.trim())
    .filter((address) => address.length > 0);
}

function formatFallbackBody(payload: LeadPayload, failure: PostLeadResult): string {
  return [
    'El lead NO se entregó al destino. Esta es la copia de respaldo para',
    'capturarlo a mano en BOS:',
    '',
    `Nombre:    ${payload.first_name} ${payload.last_name}`.trimEnd(),
    `Teléfono:  ${payload.phone}`,
    `Correo:    ${payload.email}`,
    `Idioma:    ${payload.language_preference}`,
    `Consulta:  ${payload.enquiry_detail || '(sin detalle)'}`,
    '',
    `Página:    ${payload.page_url}`,
    `Origen:    ${payload.source} / ${payload.medium} / ${payload.campaign}`,
    `Click IDs: gclid=${payload.gclid ?? '-'} fbclid=${payload.fbclid ?? '-'}`,
    `Servicio:  ${payload.practice_area_inferred ?? '-'}`,
    `Oficina:   ${payload.office_inferred ?? '-'}`,
    `Sesión:    ${payload.session_id ?? '-'} · ${payload.device_type} · ${payload.country ?? '-'}`,
    `Consentimientos: términos=${payload.acceptedTerms} marketing=${payload.marketingConsent}`,
    '',
    `Fallo: HTTP ${failure.status ?? '-'} tras ${failure.attempts} intento(s) · ${failure.error ?? '-'}`,
    `Fecha: ${new Date().toISOString()}`,
  ].join('\n');
}

/**
 * Envía el payload completo del lead por correo cuando `postLead` no logró
 * entregarlo. Solo actúa si existen LEAD_FALLBACK_EMAIL (uno o varios
 * destinatarios separados por coma) y RESEND_API_KEY; sin ellas el único
 * respaldo es el log `lead_capture_failed_final`.
 *
 * Nunca lanza: el lead ya se dio por perdido y el caller la invoca desde un
 * `after()`, después de responder al usuario.
 */
export async function sendLeadFallbackEmail(
  payload: LeadPayload,
  failure: PostLeadResult,
): Promise<void> {
  const recipients = parseFallbackRecipients(process.env.LEAD_FALLBACK_EMAIL);
  if (recipients.length === 0) return;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      JSON.stringify({
        event: 'lead_fallback_email_unconfigured',
        reason: 'RESEND_API_KEY missing',
        timestamp: new Date().toISOString(),
      }),
    );
    return;
  }

  try {
    // Import diferido: mantiene el grafo de este módulo (probado en
    // __tests__/leadCapture.test.ts) libre del SDK de correo.
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: process.env.LEAD_FALLBACK_FROM || LEAD_FALLBACK_FROM,
      to: recipients,
      subject: `[LEAD NO ENTREGADO] ${payload.name || 'Sin nombre'} · ${payload.phone}`,
      text: formatFallbackBody(payload, failure),
    });

    if (error) {
      console.error(
        JSON.stringify({
          event: 'lead_fallback_email_failed',
          error: error.message,
          timestamp: new Date().toISOString(),
        }),
      );
      return;
    }

    console.log(
      JSON.stringify({
        event: 'lead_fallback_email_sent',
        recipients: recipients.length,
        timestamp: new Date().toISOString(),
      }),
    );
  } catch (err) {
    console.error(
      JSON.stringify({
        event: 'lead_fallback_email_failed',
        error: err instanceof Error ? err.message : String(err),
        timestamp: new Date().toISOString(),
      }),
    );
  }
}
