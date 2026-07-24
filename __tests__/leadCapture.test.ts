import { describe, expect, it } from 'vitest';
import {
  buildEnquiryDetail,
  detectDeviceTypeFromUA,
  inferOffice,
  inferPracticeArea,
  isSentinelSource,
  LeadValidationError,
  mapFormToPayload,
  normalizeUtmCampaign,
  normalizeUtmMedium,
  normalizeUtmSource,
  type LeadFormInput,
} from '../app/lib/leadCapture';

/**
 * Contract tests for the lead-capture pipeline (Phase 3a).
 *
 * mapFormToPayload() is a pure function. These assertions lock in
 * the v3.0 payload contract so Phase 3b's Solislead cutover is a
 * config-only change.
 */

const VALID_INPUT: LeadFormInput = {
  first_name: 'Maria',
  last_name: 'Garcia',
  phone: '+1 (832) 555-0199',
  email: 'maria@example.com',
  enquiry_detail: 'Tengo una pregunta sobre mi caso',
  acceptedTerms: true,
  marketingConsent: false,
  page_url: 'https://www.manuelsolis.com/es/servicios/visa-u',
  language: 'es',
};

describe('normalizeUtm* — defaults to GA4 sentinels', () => {
  it("emits '(direct)' when utm_source is missing/empty/null/undefined", () => {
    expect(normalizeUtmSource(undefined)).toBe('(direct)');
    expect(normalizeUtmSource(null)).toBe('(direct)');
    expect(normalizeUtmSource('')).toBe('(direct)');
    expect(normalizeUtmSource('   ')).toBe('(direct)');
    expect(normalizeUtmSource('null')).toBe('(direct)');
    expect(normalizeUtmSource('undefined')).toBe('(direct)');
  });

  it("emits '(none)' when utm_medium is missing", () => {
    expect(normalizeUtmMedium(undefined)).toBe('(none)');
    expect(normalizeUtmMedium('')).toBe('(none)');
  });

  it("emits '(not set)' when utm_campaign is missing", () => {
    expect(normalizeUtmCampaign(undefined)).toBe('(not set)');
    expect(normalizeUtmCampaign('')).toBe('(not set)');
  });

  it('preserves real UTM values verbatim and trims whitespace', () => {
    expect(normalizeUtmSource('google')).toBe('google');
    expect(normalizeUtmSource('  facebook  ')).toBe('facebook');
    expect(normalizeUtmMedium('cpc')).toBe('cpc');
    expect(normalizeUtmCampaign('spring-2026')).toBe('spring-2026');
  });

  it('isSentinelSource recognizes GA4 sentinels and rejects real values', () => {
    expect(isSentinelSource('(direct)')).toBe(true);
    expect(isSentinelSource('(none)')).toBe(true);
    expect(isSentinelSource('(not set)')).toBe(true);
    expect(isSentinelSource('google')).toBe(false);
    expect(isSentinelSource('')).toBe(false);
  });
});

describe('buildEnquiryDetail — Fuente suffix policy', () => {
  it('appends "| Fuente: X" only for non-sentinel sources', () => {
    expect(buildEnquiryDetail('Hola', 'google')).toBe('Hola | Fuente: google');
    expect(buildEnquiryDetail('Hola', '(direct)')).toBe('Hola');
    expect(buildEnquiryDetail('Hola', '(none)')).toBe('Hola');
    expect(buildEnquiryDetail('Hola', '(not set)')).toBe('Hola');
  });

  it('keeps the base detail when source is empty', () => {
    expect(buildEnquiryDetail('Hola', '')).toBe('Hola');
  });

  it('returns plain "Fuente: X" when detail is empty but source is real', () => {
    expect(buildEnquiryDetail('', 'facebook')).toBe('Fuente: facebook');
    expect(buildEnquiryDetail(undefined, 'facebook')).toBe('Fuente: facebook');
  });
});

describe('inferPracticeArea — derives practice from URL', () => {
  it('extracts the slug from /[lang]/servicios/{slug}', () => {
    expect(inferPracticeArea('/es/servicios/visa-u')).toBe('visa-u');
    expect(inferPracticeArea('/en/servicios/asilo')).toBe('asilo');
    expect(inferPracticeArea('/es/servicios/defensa-deportacion')).toBe('defensa-deportacion');
  });

  it('maps city-service landings to canonical practice area', () => {
    expect(inferPracticeArea('/es/abogado-inmigracion-houston')).toBe('inmigracion');
    expect(inferPracticeArea('/es/abogado-accidentes-dallas')).toBe('accidentes');
    expect(inferPracticeArea('/en/asilo-politico-chicago')).toBe('asilo');
    expect(inferPracticeArea('/es/defensa-deportacion-el-paso')).toBe('defensa-deportacion');
    expect(inferPracticeArea('/es/vawa-houston')).toBe('vawa');
    expect(inferPracticeArea('/en/visa-u-los-angeles')).toBe('visa-u');
  });

  it('returns null when the URL does not match any practice pattern', () => {
    expect(inferPracticeArea('/es')).toBeNull();
    expect(inferPracticeArea('/es/oficinas/dallas')).toBeNull();
    expect(inferPracticeArea('/es/blog/some-post')).toBeNull();
    expect(inferPracticeArea('/en/abogados')).toBeNull();
  });
});

describe('inferOffice — derives office slug from URL', () => {
  it("extracts the slug from /[lang]/oficinas/{slug}", () => {
    expect(inferOffice('/es/oficinas/dallas')).toBe('dallas');
    expect(inferOffice('/en/oficinas/houston-principal')).toBe('houston-principal');
    expect(inferOffice('/es/oficinas/losangeles')).toBe('losangeles');
  });

  it('extracts the city slug from city-service landings', () => {
    expect(inferOffice('/es/visa-u-houston')).toBe('houston');
    expect(inferOffice('/en/abogado-inmigracion-los-angeles')).toBe('los-angeles');
    expect(inferOffice('/es/vawa-chicago')).toBe('chicago');
    expect(inferOffice('/es/defensa-deportacion-el-paso')).toBe('el-paso');
  });

  it('returns null when the URL has no office context', () => {
    expect(inferOffice('/es')).toBeNull();
    expect(inferOffice('/es/servicios/asilo')).toBeNull();
    expect(inferOffice('/en/blog/some-post')).toBeNull();
  });
});

describe('detectDeviceTypeFromUA', () => {
  it('returns "mobile" for typical phone UAs', () => {
    expect(
      detectDeviceTypeFromUA(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
      ),
    ).toBe('mobile');
    expect(
      detectDeviceTypeFromUA('Mozilla/5.0 (Linux; Android 13; Pixel 7) Mobi'),
    ).toBe('mobile');
  });

  it('returns "tablet" for iPad UAs', () => {
    expect(
      detectDeviceTypeFromUA('Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X)'),
    ).toBe('tablet');
  });

  it('returns "desktop" for typical browser UAs', () => {
    expect(
      detectDeviceTypeFromUA(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120',
      ),
    ).toBe('desktop');
  });

  it('returns "unknown" for null/empty UA', () => {
    expect(detectDeviceTypeFromUA(null)).toBe('unknown');
    expect(detectDeviceTypeFromUA(undefined)).toBe('unknown');
    expect(detectDeviceTypeFromUA('')).toBe('unknown');
  });
});

describe('mapFormToPayload — full integration', () => {
  it('produces the canonical payload for a clean direct visit', () => {
    const payload = mapFormToPayload({
      ...VALID_INPUT,
      page_url: 'https://www.manuelsolis.com/es/servicios/visa-u',
    });
    expect(payload).toMatchObject({
      name: 'Maria',
      first_name: 'Maria',
      last_name: 'Garcia',
      email: 'maria@example.com',
      acceptedTerms: 1,
      marketingConsent: 0,
      language_preference: 'es',
      source: '(direct)',
      utm_source: '(direct)',
      medium: '(none)',
      utm_medium: '(none)',
      campaign: '(not set)',
      utm_campaign: '(not set)',
      utm_content: null,
      utm_term: null,
      gclid: null,
      fbclid: null,
      practice_area_inferred: 'visa-u',
      office_inferred: null,
      session_id: null,
      device_type: 'unknown',
      country: null,
    });
  });

  it('preserves real UTM values when present', () => {
    const payload = mapFormToPayload({
      ...VALID_INPUT,
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'visa-u-houston',
      utm_content: 'ad-variant-b',
      utm_term: 'visa u abogado',
    });
    expect(payload.source).toBe('google');
    expect(payload.utm_source).toBe('google');
    expect(payload.medium).toBe('cpc');
    expect(payload.campaign).toBe('visa-u-houston');
    expect(payload.utm_content).toBe('ad-variant-b');
    expect(payload.utm_term).toBe('visa u abogado');
  });

  it('appends Fuente: suffix in enquiry_detail for paid traffic only', () => {
    const paid = mapFormToPayload({
      ...VALID_INPUT,
      utm_source: 'facebook',
    });
    expect(paid.enquiry_detail).toBe(
      'Tengo una pregunta sobre mi caso | Fuente: facebook',
    );
    const direct = mapFormToPayload(VALID_INPUT);
    expect(direct.enquiry_detail).toBe('Tengo una pregunta sobre mi caso');
  });

  it('captures gclid and fbclid when present, null when absent', () => {
    const withClickIds = mapFormToPayload({
      ...VALID_INPUT,
      gclid: 'EAIaIQobChMI-abc-123',
      fbclid: 'IwAR0xyz-789',
    });
    expect(withClickIds.gclid).toBe('EAIaIQobChMI-abc-123');
    expect(withClickIds.fbclid).toBe('IwAR0xyz-789');

    const without = mapFormToPayload(VALID_INPUT);
    expect(without.gclid).toBeNull();
    expect(without.fbclid).toBeNull();
  });

  it('infers practice_area and office from city-service landings', () => {
    const payload = mapFormToPayload({
      ...VALID_INPUT,
      page_url: 'https://www.manuelsolis.com/es/visa-u-houston',
    });
    expect(payload.practice_area_inferred).toBe('visa-u');
    expect(payload.office_inferred).toBe('houston');
  });

  it('handles bare pathnames (not just full URLs) for page_url', () => {
    const payload = mapFormToPayload({
      ...VALID_INPUT,
      page_url: '/es/oficinas/dallas',
    });
    expect(payload.office_inferred).toBe('dallas');
    expect(payload.practice_area_inferred).toBeNull();
  });

  it('passes consent flags through unchanged (numeric)', () => {
    const optedIn = mapFormToPayload({ ...VALID_INPUT, marketingConsent: true });
    expect(optedIn.acceptedTerms).toBe(1);
    expect(optedIn.marketingConsent).toBe(1);

    const optedOut = mapFormToPayload({ ...VALID_INPUT, marketingConsent: false });
    expect(optedOut.acceptedTerms).toBe(1);
    expect(optedOut.marketingConsent).toBe(0);
  });

  it('forwards device_type and country verbatim from server-enriched input', () => {
    const payload = mapFormToPayload({
      ...VALID_INPUT,
      device_type: 'mobile',
      country: 'US',
    });
    expect(payload.device_type).toBe('mobile');
    expect(payload.country).toBe('US');
  });

  it('trims whitespace from text fields', () => {
    const payload = mapFormToPayload({
      ...VALID_INPUT,
      first_name: '  Ana  ',
      last_name: '  Lopez ',
      email: '  ana@example.com ',
      phone: '  8325550199  ',
    });
    expect(payload.first_name).toBe('Ana');
    expect(payload.last_name).toBe('Lopez');
    expect(payload.email).toBe('ana@example.com');
    expect(payload.phone).toBe('8325550199');
  });
});

describe('mapFormToPayload — validation errors', () => {
  it('throws LeadValidationError when first_name is empty', () => {
    expect(() =>
      mapFormToPayload({ ...VALID_INPUT, first_name: '' }),
    ).toThrow(LeadValidationError);
    expect(() =>
      mapFormToPayload({ ...VALID_INPUT, first_name: '   ' }),
    ).toThrow(/first_name/);
  });

  it('throws when phone is too short or non-numeric-empty', () => {
    expect(() => mapFormToPayload({ ...VALID_INPUT, phone: '' })).toThrow(
      /phone/,
    );
    expect(() => mapFormToPayload({ ...VALID_INPUT, phone: '12' })).toThrow(
      /phone/,
    );
    expect(() => mapFormToPayload({ ...VALID_INPUT, phone: 'abcdefghi' })).toThrow(
      /phone/,
    );
  });

  it('throws when email is invalid', () => {
    expect(() => mapFormToPayload({ ...VALID_INPUT, email: 'not-an-email' })).toThrow(
      /email/,
    );
    expect(() => mapFormToPayload({ ...VALID_INPUT, email: '' })).toThrow(/email/);
  });

  it('throws when acceptedTerms is not true', () => {
    expect(() =>
      mapFormToPayload({ ...VALID_INPUT, acceptedTerms: false }),
    ).toThrow(/acceptedTerms/);
  });

  it("throws when language is not 'es' or 'en'", () => {
    expect(() =>
      mapFormToPayload({
        ...VALID_INPUT,
        language: 'fr' as unknown as 'es',
      }),
    ).toThrow(/language/);
  });
});

describe('injectUtmsIntoUrl — BOS parsea la URL, no los campos utm_*', () => {
  it('inyecta Sitio web/Organic/Organic_search cuando el lead es directo y la URL va limpia', () => {
    const p = mapFormToPayload({ ...VALID_INPUT });
    const u = new URL(p.page_url);
    expect(u.searchParams.get('utm_source')).toBe('Sitio web');
    expect(u.searchParams.get('utm_medium')).toBe('Organic');
    expect(u.searchParams.get('utm_campaign')).toBe('Organic_search');
    expect(p.uri).toBe(p.page_url);
    expect(u.pathname).toBe('/es/servicios/visa-u');
  });

  it('inyecta los UTMs efectivos (de cookie) cuando la URL actual va limpia', () => {
    const p = mapFormToPayload({
      ...VALID_INPUT,
      utm_source: 'newsletter',
      utm_medium: 'email',
      utm_campaign: 'vawa-mayo-2026',
      utm_content: 'hero-cta',
      gclid: 'abc123',
    });
    const u = new URL(p.page_url);
    expect(u.searchParams.get('utm_source')).toBe('newsletter');
    expect(u.searchParams.get('utm_medium')).toBe('email');
    expect(u.searchParams.get('utm_campaign')).toBe('vawa-mayo-2026');
    expect(u.searchParams.get('utm_content')).toBe('hero-cta');
    expect(u.searchParams.get('gclid')).toBe('abc123');
  });

  it('usa sin-campana (no directo) cuando hay source real sin campaña', () => {
    const p = mapFormToPayload({ ...VALID_INPUT, utm_source: 'google', utm_medium: 'organic' });
    const u = new URL(p.page_url);
    expect(u.searchParams.get('utm_source')).toBe('google');
    expect(u.searchParams.get('utm_campaign')).toBe('sin-campana');
  });

  it('respeta la URL tal cual si ya trae utm_source', () => {
    const url =
      'https://www.manuelsolis.com/es?utm_source=instagram&utm_medium=social&utm_campaign=organic-bio';
    const p = mapFormToPayload({ ...VALID_INPUT, page_url: url, utm_source: 'instagram' });
    expect(p.page_url).toBe(url);
  });

  it('tolera page_url relativa (pathname pelón)', () => {
    const p = mapFormToPayload({ ...VALID_INPUT, page_url: '/es/contacto' });
    const u = new URL(p.page_url);
    expect(u.hostname).toBe('www.manuelsolis.com');
    expect(u.searchParams.get('utm_source')).toBe('Sitio web');
  });
});
