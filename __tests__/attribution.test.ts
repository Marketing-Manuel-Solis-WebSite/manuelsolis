import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  readTouchFromUrl,
  getEffectiveUtms,
  captureAttribution,
  getAttributionState,
  effectiveUtmsToLeadFields,
} from '../app/lib/attribution';
import { mapFormToPayload, type LeadFormInput } from '../app/lib/leadCapture';

/**
 * Validación end-to-end de la atribución de UTMs/campaña que llega a BOS.
 *
 * No usamos jsdom: `attribution.ts` solo toca `window.location.{search,
 * pathname,hostname,protocol}`, `document.cookie` y `document.referrer`.
 * Los simulamos con un cookie-jar real para ejercitar las funciones de
 * PRODUCCIÓN tal cual corren en el navegador, incluyendo persistencia en
 * la cookie `msl_attr` a través de la navegación interna.
 *
 * El "wire" del formulario (ContactFormClient) se reproduce con las MISMAS
 * funciones puras que usa el componente: effectiveUtmsToLeadFields(eff) +
 * el OR de click-IDs, y luego mapFormToPayload (el contrato real con BOS).
 */

interface MockEnv {
  setUrl: (pathname: string, search?: string) => void;
  setReferrer: (ref: string) => void;
}

function installDom(): MockEnv {
  const jar = new Map<string, string>();
  let referrer = '';
  const location = {
    search: '',
    pathname: '/',
    hostname: 'www.manuelsolis.com',
    protocol: 'https:',
    get href() {
      return `https://www.manuelsolis.com${this.pathname}${this.search}`;
    },
  };
  const documentMock = {
    get referrer() {
      return referrer;
    },
    get cookie() {
      return Array.from(jar.entries())
        .map(([k, v]) => `${k}=${v}`)
        .join('; ');
    },
    set cookie(str: string) {
      const firstPair = str.split(';')[0] ?? '';
      const eq = firstPair.indexOf('=');
      if (eq < 0) return;
      const name = firstPair.slice(0, eq).trim();
      const value = firstPair.slice(eq + 1);
      if (/(?:^|;)\s*max-age=0(?:;|$)/i.test(str)) {
        jar.delete(name);
        return;
      }
      jar.set(name, value);
    },
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).window = { location };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).document = documentMock;
  return {
    setUrl: (pathname, search = '') => {
      location.pathname = pathname;
      location.search = search;
    },
    setReferrer: (ref) => {
      referrer = ref;
    },
  };
}

function uninstallDom() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (globalThis as any).window;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (globalThis as any).document;
}

let env: MockEnv;
beforeEach(() => {
  env = installDom();
});
afterEach(() => {
  uninstallDom();
});

// Reproduce EXACTAMENTE cómo ContactFormClient arma el payload.
function buildFormPayload(searchGclid: string | null, searchFbclid: string | null): LeadFormInput {
  const eff = getEffectiveUtms();
  const utmData = effectiveUtmsToLeadFields(eff);
  const clickIds = {
    gclid: searchGclid || eff.gclid || null,
    fbclid: searchFbclid || eff.fbclid || null,
  };
  return {
    first_name: 'Maria',
    last_name: 'Garcia',
    phone: '+1 (832) 555-0199',
    email: 'maria@example.com',
    enquiry_detail: 'Necesito ayuda con mi caso',
    acceptedTerms: true,
    marketingConsent: false,
    page_url: 'https://www.manuelsolis.com/es/consulta',
    language: 'es',
    ...utmData,
    ...clickIds,
  };
}

describe('readTouchFromUrl — captura por URL', () => {
  it('captura UTMs completos (lowercased)', () => {
    env.setUrl(
      '/es/vawa-houston',
      '?utm_source=Newsletter&utm_medium=Email&utm_campaign=VAWA-Mayo-2026&utm_content=Hero-CTA&utm_term=keyword',
    );
    expect(readTouchFromUrl()).toMatchObject({
      source: 'newsletter',
      medium: 'email',
      campaign: 'vawa-mayo-2026',
      content: 'hero-cta',
      term: 'keyword',
    });
  });

  it('FIX: utm_source SIN utm_medium ya NO se descarta (medium → "(none)")', () => {
    env.setUrl('/es', '?utm_source=facebook&utm_campaign=verano-2026');
    const t = readTouchFromUrl();
    expect(t?.source).toBe('facebook');
    expect(t?.medium).toBe('(none)');
    expect(t?.campaign).toBe('verano-2026');
  });

  it('FIX: gclid sin UTMs → google/cpc + gclid persistido', () => {
    env.setUrl('/es', '?gclid=Cj0KCQ123');
    expect(readTouchFromUrl()).toMatchObject({
      source: 'google',
      medium: 'cpc',
      gclid: 'Cj0KCQ123',
    });
  });

  it('FIX: fbclid sin UTMs → facebook/social + fbclid persistido', () => {
    env.setUrl('/es', '?fbclid=IwAR9xyz');
    expect(readTouchFromUrl()).toMatchObject({
      source: 'facebook',
      medium: 'social',
      fbclid: 'IwAR9xyz',
    });
  });

  it('referrer externo sin UTMs → host/referral', () => {
    env.setUrl('/es', '');
    env.setReferrer('https://www.google.com/search?q=abogado+inmigracion');
    expect(readTouchFromUrl()).toMatchObject({ source: 'www.google.com', medium: 'referral' });
  });

  it('sin UTMs, sin click-IDs y referrer interno → null (no pisa origen real)', () => {
    env.setUrl('/es/consulta', '');
    env.setReferrer('https://www.manuelsolis.com/es/servicios');
    expect(readTouchFromUrl()).toBeNull();
    env.setReferrer('');
    expect(readTouchFromUrl()).toBeNull();
  });
});

describe('Persistencia en cookie msl_attr a través de la navegación', () => {
  it('EL CASO REPORTADO: campaña sobrevive al navegar a /consulta', () => {
    // 1. Llega por newsletter a una landing con UTMs
    env.setUrl(
      '/es/vawa-houston',
      '?utm_source=newsletter&utm_medium=email&utm_campaign=vawa-mayo-2026&utm_content=hero-cta',
    );
    env.setReferrer('https://mail.google.com/');
    captureAttribution();

    // 2. Navega internamente a /consulta (URL SIN utms, referrer interno)
    env.setUrl('/es/consulta', '');
    env.setReferrer('https://www.manuelsolis.com/es/vawa-houston');
    captureAttribution(); // no debe pisar el origen

    // 3. Al enviar, los UTMs efectivos siguen siendo los de la campaña
    const eff = getEffectiveUtms();
    expect(eff.source).toBe('newsletter');
    expect(eff.medium).toBe('email');
    expect(eff.campaign).toBe('vawa-mayo-2026');
    expect(eff.content).toBe('hero-cta');
  });

  it('first_touch se conserva; last_touch se actualiza con el 2º UTM', () => {
    env.setUrl('/es', '?utm_source=newsletter&utm_medium=email&utm_campaign=c1');
    captureAttribution();
    env.setUrl('/es', '?utm_source=instagram&utm_medium=social&utm_campaign=c2');
    captureAttribution();

    const state = getAttributionState();
    expect(state.first?.source).toBe('newsletter');
    expect(state.last?.source).toBe('instagram');

    const eff = getEffectiveUtms();
    expect(eff.firstTouchSource).toBe('newsletter');
    expect(eff.firstTouchCampaign).toBe('c1');
    expect(eff.source).toBe('instagram');
  });

  it('FIX: gclid persiste tras navegación interna', () => {
    env.setUrl('/es', '?gclid=Cj0ABC');
    env.setReferrer('https://www.google.com/');
    captureAttribution();
    env.setUrl('/es/consulta', '');
    env.setReferrer('https://www.manuelsolis.com/es');
    captureAttribution();

    const eff = getEffectiveUtms();
    expect(eff.gclid).toBe('Cj0ABC');
    expect(eff.source).toBe('google');
    expect(eff.medium).toBe('cpc');
  });
});

describe('effectiveUtmsToLeadFields — centinelas GA4', () => {
  it('tráfico directo → (direct)/(none) y campaña "directo" (etiqueta del equipo en BOS)', () => {
    const fields = effectiveUtmsToLeadFields(getEffectiveUtms()); // sin cookie, sin URL → direct
    expect(fields.utm_source).toBe('(direct)');
    expect(fields.utm_medium).toBe('(none)');
    expect(fields.utm_campaign).toBe('directo');
  });

  it('source real SIN campaña → "(not set)" (no "directo")', () => {
    env.setUrl('/es', '?utm_source=facebook&utm_medium=social');
    const fields = effectiveUtmsToLeadFields(getEffectiveUtms());
    expect(fields.utm_source).toBe('facebook');
    expect(fields.utm_campaign).toBe('(not set)');
  });

  it('campaña real pasa tal cual (con trim)', () => {
    env.setUrl('/es', '?utm_source=newsletter&utm_medium=email&utm_campaign=%20vawa-mayo-2026%20');
    const fields = effectiveUtmsToLeadFields(getEffectiveUtms());
    expect(fields).toMatchObject({
      utm_source: 'newsletter',
      utm_medium: 'email',
      utm_campaign: 'vawa-mayo-2026',
    });
  });
});

describe('E2E: URL → cookie → payload del form → mapFormToPayload (contrato BOS)', () => {
  it('campaña newsletter + gclid sobrevive navegación y llega COMPLETA a BOS', () => {
    env.setUrl(
      '/es/vawa-houston',
      '?utm_source=newsletter&utm_medium=email&utm_campaign=vawa-mayo-2026&utm_content=hero-cta&gclid=Cj0XYZ',
    );
    env.setReferrer('https://mail.google.com/');
    captureAttribution();
    env.setUrl('/es/consulta', '');
    env.setReferrer('https://www.manuelsolis.com/es/vawa-houston');
    captureAttribution();

    const payload = mapFormToPayload(buildFormPayload(null, null));

    // Atribución REAL en ambos juegos de campos que consume BOS
    expect(payload.source).toBe('newsletter');
    expect(payload.utm_source).toBe('newsletter');
    expect(payload.medium).toBe('email');
    expect(payload.utm_medium).toBe('email');
    expect(payload.campaign).toBe('vawa-mayo-2026');
    expect(payload.utm_campaign).toBe('vawa-mayo-2026');
    expect(payload.utm_content).toBe('hero-cta');
    expect(payload.gclid).toBe('Cj0XYZ');
    expect(payload.enquiry_detail).toContain('| Fuente: newsletter');
  });

  it('FIX: campaña sin utm_medium ya NO se pierde — llega con campaña a BOS', () => {
    env.setUrl('/es/abogado-inmigracion-houston', '?utm_source=facebook&utm_campaign=verano-2026');
    env.setReferrer('https://l.facebook.com/');
    captureAttribution();
    env.setUrl('/es/consulta', '');
    env.setReferrer('https://www.manuelsolis.com/es/abogado-inmigracion-houston');
    captureAttribution();

    const payload = mapFormToPayload(buildFormPayload(null, null));
    expect(payload.utm_source).toBe('facebook');
    expect(payload.campaign).toBe('verano-2026'); // antes caía a (not set)
    expect(payload.utm_medium).toBe('(none)');
  });

  it('FIX: Google Ads con auto-tagging (gclid, sin utm) llega como google/cpc + gclid', () => {
    env.setUrl('/es/defensa-deportacion-dallas', '?gclid=EAIaIQ456');
    env.setReferrer('https://www.google.com/');
    captureAttribution();
    env.setUrl('/es/consulta', '');
    env.setReferrer('https://www.manuelsolis.com/es/defensa-deportacion-dallas');
    captureAttribution();

    const payload = mapFormToPayload(buildFormPayload(null, null));
    expect(payload.source).toBe('google');
    expect(payload.medium).toBe('cpc');
    expect(payload.gclid).toBe('EAIaIQ456');
  });

  it('visitante directo → BOS recibe (direct)/(none) y campaña "directo"', () => {
    env.setUrl('/es/consulta', '');
    env.setReferrer('');
    captureAttribution();

    const payload = mapFormToPayload(buildFormPayload(null, null));
    expect(payload.utm_source).toBe('(direct)');
    expect(payload.utm_medium).toBe('(none)');
    expect(payload.campaign).toBe('directo');
  });
});
