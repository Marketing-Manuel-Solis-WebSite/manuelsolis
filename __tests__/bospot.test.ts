import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  buildBospotPayload,
  BOSPOT_DEFAULT_ENDPOINT,
  normalizeEventId,
  normalizeReferrer,
  resolveLeadDestinations,
} from '../app/lib/bospot';
import { mapFormToPayload, type LeadFormInput } from '../app/lib/leadCapture';
import { deliverLead } from '../app/lib/leadDelivery';

const BASE_INPUT: LeadFormInput = {
  first_name: 'Maria',
  last_name: 'Lopez',
  phone: '(713) 555-0142',
  email: 'maria.lopez@example.com',
  enquiry_detail: 'Mi esposo fue detenido por ICE',
  acceptedTerms: true,
  marketingConsent: true,
  page_url:
    'https://www.manuelsolis.com/es/servicios/defensa-deportacion?utm_source=facebook&utm_medium=paid_social&utm_campaign=deportacion_tx_sep',
  language: 'es',
  utm_source: 'facebook',
  utm_medium: 'paid_social',
  utm_campaign: 'deportacion_tx_sep',
  utm_content: 'video_a',
  utm_term: null,
  gclid: null,
  fbclid: 'IwAR0abc123',
  fbp: 'fb.1.1727650000000.1234567890',
  fbc: 'fb.1.1727650000000.IwAR0abc123',
  session_id: 'mg6x2k1a4f9q2z',
  device_type: 'mobile',
  country: 'US',
  client_ip: '203.0.113.25',
  client_user_agent: 'Mozilla/5.0 (iPhone)',
};

const CONTEXT = {
  event_id: '7c1e2b9a-4f3d-4c11-9a0e-2f1b6d8e5a10',
  submitted_at: '2026-09-30T15:42:07.123Z',
  page_url: 'https://www.manuelsolis.com/es/servicios/defensa-deportacion',
  first_touch_source: 'google',
  first_touch_medium: 'cpc',
  first_touch_campaign: 'asilo_brand',
  referrer: 'https://l.facebook.com/',
};

describe('resolveLeadDestinations', () => {
  it('sin modo o modo desconocido → solo BOS', () => {
    expect(resolveLeadDestinations(undefined, true)).toMatchObject({ mode: 'bos', bos: true, bospot: false });
    expect(resolveLeadDestinations('loquesea', true)).toMatchObject({ mode: 'bos' });
  });

  it('both → los dos, BOS primario', () => {
    expect(resolveLeadDestinations('both', true)).toEqual({
      mode: 'both',
      primary: 'bos',
      bos: true,
      bospot: true,
    });
  });

  it('bospot → solo BoSpot, primario BoSpot', () => {
    expect(resolveLeadDestinations(' BoSpot ', true)).toEqual({
      mode: 'bospot',
      primary: 'bospot',
      bos: false,
      bospot: true,
    });
  });

  it('sin token nunca deja de mandar a BOS', () => {
    expect(resolveLeadDestinations('bospot', false)).toMatchObject({ mode: 'bos', bos: true, bospot: false });
    expect(resolveLeadDestinations('both', false)).toMatchObject({ mode: 'bos', bospot: false });
  });
});

describe('buildBospotPayload — contrato v1.0', () => {
  it('arma el JSON acordado con Marketing', () => {
    const body = buildBospotPayload(mapFormToPayload(BASE_INPUT), CONTEXT);
    expect(body).toMatchObject({
      schema_version: '1.0',
      event_id: CONTEXT.event_id,
      submitted_at: CONTEXT.submitted_at,
      channel: 'web',
      source_platform: 'website',
      contact_method: 'form',
      first_name: 'Maria',
      last_name: 'Lopez',
      email: 'maria.lopez@example.com',
      phone: '(713) 555-0142',
      language_preference: 'es',
      enquiry_detail: 'Mi esposo fue detenido por ICE',
      practice_area_inferred: 'defensa-deportacion',
      acceptedTerms: true,
      marketingConsent: true,
      page_url: CONTEXT.page_url,
      utm_source: 'facebook',
      utm_medium: 'paid_social',
      utm_campaign: 'deportacion_tx_sep',
      utm_content: 'video_a',
      utm_term: null,
      first_touch_source: 'google',
      first_touch_medium: 'cpc',
      first_touch_campaign: 'asilo_brand',
      referrer: 'https://l.facebook.com/',
      gclid: null,
      fbclid: 'IwAR0abc123',
      fbp: 'fb.1.1727650000000.1234567890',
      fbc: 'fb.1.1727650000000.IwAR0abc123',
      client_ip_address: '203.0.113.25',
      client_user_agent: 'Mozilla/5.0 (iPhone)',
      meta_leadgen_id: null,
      form_name: null,
      session_id: 'mg6x2k1a4f9q2z',
      device_type: 'mobile',
      country: 'US',
    });
  });

  it('tráfico directo: UTMs en null, no los centinelas de BOS', () => {
    const body = buildBospotPayload(
      mapFormToPayload({ ...BASE_INPUT, utm_source: null, utm_medium: null, utm_campaign: 'directo', utm_content: null }),
      { ...CONTEXT, first_touch_source: null, first_touch_medium: null, first_touch_campaign: null },
    );
    expect(body.utm_source).toBeNull();
    expect(body.utm_medium).toBeNull();
    expect(body.utm_campaign).toBeNull();
    expect(body.first_touch_source).toBeNull();
  });

  it('consentimiento de marketing no marcado → false', () => {
    const body = buildBospotPayload(mapFormToPayload({ ...BASE_INPUT, marketingConsent: false }), CONTEXT);
    expect(body.marketingConsent).toBe(false);
    expect(body.acceptedTerms).toBe(true);
  });

  it('quita el sufijo "| Fuente:" que solo es para BOS', () => {
    const payload = mapFormToPayload(BASE_INPUT);
    expect(payload.enquiry_detail).toContain('| Fuente: facebook');
    expect(buildBospotPayload(payload, CONTEXT).enquiry_detail).toBe('Mi esposo fue detenido por ICE');
  });
});

describe('normalizeEventId / normalizeReferrer', () => {
  it('acepta un UUID del navegador y rechaza basura', () => {
    expect(normalizeEventId(CONTEXT.event_id, () => 'x')).toBe(CONTEXT.event_id);
    expect(normalizeEventId('<script>', () => 'fallback-id')).toBe('fallback-id');
    expect(normalizeEventId(undefined, () => 'fallback-id')).toBe('fallback-id');
  });

  it('descarta referrers internos y no http', () => {
    expect(normalizeReferrer('https://www.manuelsolis.com/es')).toBeNull();
    expect(normalizeReferrer('javascript:alert(1)')).toBeNull();
    expect(normalizeReferrer('https://www.google.com/')).toBe('https://www.google.com/');
  });
});

describe('deliverLead', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const fast = { maxAttempts: 1, baseDelayMs: 0 };

  function stubFetch(statusFor: (url: string) => number) {
    const calls: { url: string; init: RequestInit }[] = [];
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string, init: RequestInit) => {
        calls.push({ url, init });
        return new Response('{}', { status: statusFor(url) });
      }),
    );
    return calls;
  }

  it('both: manda a los dos, BoSpot con token, event_id e Idempotency-Key', async () => {
    const calls = stubFetch(() => 201);
    const result = await deliverLead(mapFormToPayload(BASE_INPUT), CONTEXT, {
      env: { LEAD_DESTINATION: 'both', BOSPOT_LEADS_TOKEN: 'tok', LEAD_CAPTURE_ENDPOINT: 'https://bos.test/lead' },
      postOptions: fast,
    });
    expect(result.ok).toBe(true);
    expect(calls.map((c) => c.url).sort()).toEqual([BOSPOT_DEFAULT_ENDPOINT, 'https://bos.test/lead'].sort());

    const bospot = calls.find((c) => c.url === BOSPOT_DEFAULT_ENDPOINT)!;
    const headers = bospot.init.headers as Record<string, string>;
    expect(headers.Authorization).toBe('Bearer tok');
    expect(headers['Idempotency-Key']).toBe(CONTEXT.event_id);
    expect(JSON.parse(bospot.init.body as string).event_id).toBe(CONTEXT.event_id);

    // A BOS le llega su payload de siempre, sin el token.
    const bos = calls.find((c) => c.url === 'https://bos.test/lead')!;
    expect((bos.init.headers as Record<string, string>).Authorization).toBeUndefined();
    expect(JSON.parse(bos.init.body as string).acceptedTerms).toBe(1);
  });

  it('both: si BoSpot falla, el lead igual se da por entregado (BOS primario)', async () => {
    stubFetch((url) => (url === BOSPOT_DEFAULT_ENDPOINT ? 422 : 200));
    const result = await deliverLead(mapFormToPayload(BASE_INPUT), CONTEXT, {
      env: { LEAD_DESTINATION: 'both', BOSPOT_LEADS_TOKEN: 'tok' },
      postOptions: fast,
    });
    expect(result.ok).toBe(true);
    expect(result.primary.ok).toBe(true);
    expect(result.bospot?.ok).toBe(false);
  });

  it('bospot: solo BoSpot y su falla es la del primario', async () => {
    const calls = stubFetch(() => 500);
    const result = await deliverLead(mapFormToPayload(BASE_INPUT), CONTEXT, {
      env: { LEAD_DESTINATION: 'bospot', BOSPOT_LEADS_TOKEN: 'tok' },
      postOptions: fast,
    });
    expect(calls.every((c) => c.url === BOSPOT_DEFAULT_ENDPOINT)).toBe(true);
    expect(result.ok).toBe(false);
    expect(result.primary.ok).toBe(false);
    expect(result.bos).toBeUndefined();
  });

  it('200 duplicate de BoSpot cuenta como entregado', async () => {
    stubFetch(() => 200);
    const result = await deliverLead(mapFormToPayload(BASE_INPUT), CONTEXT, {
      env: { LEAD_DESTINATION: 'bospot', BOSPOT_LEADS_TOKEN: 'tok' },
      postOptions: fast,
    });
    expect(result.ok).toBe(true);
  });
});
