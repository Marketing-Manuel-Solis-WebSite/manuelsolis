import { describe, expect, it } from 'vitest';
import { buildEventsPayload, type MetaServerEvent } from '../app/lib/metaCapi';
import {
  buildFbcFromFbclid,
  generateMetaEventId,
  resolveFbc,
} from '../app/lib/metaPixel';
import type { AttributionState } from '../app/lib/attribution';

const NOW = 1_754_200_000; // epoch segundos fijo para asserts

function pageView(overrides: Partial<MetaServerEvent> = {}): MetaServerEvent {
  return {
    eventName: 'PageView',
    eventId: 'c3f8a4e2-1b6d-4f0a-9c7e-2d5b8a1f3e6c',
    eventSourceUrl: 'https://www.manuelsolis.com/es/servicios?utm_source=fb',
    clientIpAddress: '187.190.10.20',
    clientUserAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)',
    fbp: 'fb.1.1754100000000.987654321',
    fbc: 'fb.1.1754100000000.IwAR2xYzAbC123',
    ...overrides,
  };
}

describe('buildEventsPayload', () => {
  it('mapea todos los campos al esquema de la Conversions API', () => {
    const body = buildEventsPayload([pageView()], { nowSeconds: NOW });
    expect(body.data).toHaveLength(1);
    expect(body.data[0]).toEqual({
      event_name: 'PageView',
      event_time: NOW,
      event_id: 'c3f8a4e2-1b6d-4f0a-9c7e-2d5b8a1f3e6c',
      event_source_url: 'https://www.manuelsolis.com/es/servicios?utm_source=fb',
      action_source: 'website',
      user_data: {
        client_ip_address: '187.190.10.20',
        client_user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)',
        fbp: 'fb.1.1754100000000.987654321',
        fbc: 'fb.1.1754100000000.IwAR2xYzAbC123',
      },
    });
    expect(body.test_event_code).toBeUndefined();
  });

  it('incluye test_event_code cuando se pasa', () => {
    const body = buildEventsPayload([pageView()], {
      nowSeconds: NOW,
      testEventCode: 'TEST12345',
    });
    expect(body.test_event_code).toBe('TEST12345');
  });

  it('descarta fbp/fbc malformados sin tirar el evento', () => {
    const body = buildEventsPayload(
      [pageView({ fbp: 'basura', fbc: 'fb.9.x.y' })],
      { nowSeconds: NOW },
    );
    expect(body.data).toHaveLength(1);
    expect(body.data[0].user_data.fbp).toBeUndefined();
    expect(body.data[0].user_data.fbc).toBeUndefined();
    // IP y UA sobreviven como match keys
    expect(body.data[0].user_data.client_ip_address).toBe('187.190.10.20');
  });

  it('acepta fbp/fbc con formato válido fb.<0-2>.<ts>.<valor>', () => {
    const body = buildEventsPayload(
      [pageView({ fbp: 'fb.0.1700000000000.abcd', fbc: 'fb.2.1700000000000.XyZ_-123' })],
      { nowSeconds: NOW },
    );
    expect(body.data[0].user_data.fbp).toBe('fb.0.1700000000000.abcd');
    expect(body.data[0].user_data.fbc).toBe('fb.2.1700000000000.XyZ_-123');
  });

  it('descarta eventos sin ningún match key (Meta los rechaza)', () => {
    const body = buildEventsPayload(
      [
        pageView({
          clientIpAddress: undefined,
          clientUserAgent: undefined,
          fbp: undefined,
          fbc: undefined,
        }),
      ],
      { nowSeconds: NOW },
    );
    expect(body.data).toHaveLength(0);
  });

  it('descarta eventos sin eventId o sin eventSourceUrl', () => {
    const body = buildEventsPayload(
      [pageView({ eventId: '' }), pageView({ eventSourceUrl: '' })],
      { nowSeconds: NOW },
    );
    expect(body.data).toHaveLength(0);
  });

  it('descarta eventos sin client_user_agent aunque tengan IP y fbp (obligatorio para action_source=website)', () => {
    const body = buildEventsPayload(
      [pageView({ clientUserAgent: undefined })],
      { nowSeconds: NOW },
    );
    expect(body.data).toHaveLength(0);
  });

  it('estampa event_time con el reloj actual si no se inyecta', () => {
    const before = Math.floor(Date.now() / 1000);
    const body = buildEventsPayload([pageView()]);
    const after = Math.floor(Date.now() / 1000);
    expect(body.data[0].event_time).toBeGreaterThanOrEqual(before);
    expect(body.data[0].event_time).toBeLessThanOrEqual(after);
  });
});

describe('buildFbcFromFbclid', () => {
  it('construye el formato oficial fb.1.<ts>.<fbclid>', () => {
    expect(buildFbcFromFbclid('IwAR2abc', 1754100000000)).toBe(
      'fb.1.1754100000000.IwAR2abc',
    );
  });

  it('el fbc construido pasa la validación del payload', () => {
    const fbc = buildFbcFromFbclid('IwAR2abc', Date.now());
    const body = buildEventsPayload([pageView({ fbc })], { nowSeconds: NOW });
    expect(body.data[0].user_data.fbc).toBe(fbc);
  });
});

describe('resolveFbc', () => {
  const JULY_TS = '2026-07-01T12:00:00.000Z';
  const stateWithLast: AttributionState = {
    first: { source: 'facebook', medium: 'cpc', fbclid: 'IwAR_first', ts: '2026-06-01T00:00:00.000Z' },
    last: { source: 'facebook', medium: 'cpc', fbclid: 'IwAR_last', ts: JULY_TS },
  };

  it('fbclid en la URL actual → creationTime = ahora (como el Pixel)', () => {
    expect(resolveFbc('IwAR_url', stateWithLast, 1754100000000)).toBe(
      'fb.1.1754100000000.IwAR_url',
    );
  });

  it('fbclid persistido → creationTime = ts del touch, NO ahora', () => {
    const expected = `fb.1.${Date.parse(JULY_TS)}.IwAR_last`;
    expect(resolveFbc(null, stateWithLast, 1754100000000)).toBe(expected);
  });

  it('es estable: el mismo click produce el mismo fbc en llamadas sucesivas', () => {
    const a = resolveFbc(null, stateWithLast, 1754100000000);
    const b = resolveFbc(null, stateWithLast, 1754100099999);
    expect(a).toBe(b);
  });

  it('prefiere last touch sobre first cuando ambos traen fbclid', () => {
    expect(resolveFbc(null, stateWithLast, 0)).toContain('IwAR_last');
  });

  it('cae a first touch si last no trae fbclid', () => {
    const state: AttributionState = {
      first: { source: 'facebook', medium: 'cpc', fbclid: 'IwAR_first', ts: JULY_TS },
      last: { source: 'google', medium: 'organic', ts: '2026-07-20T00:00:00.000Z' },
    };
    expect(resolveFbc(null, state, 0)).toBe(`fb.1.${Date.parse(JULY_TS)}.IwAR_first`);
  });

  it('sin fbclid en ningún lado → undefined', () => {
    expect(resolveFbc(null, {}, 0)).toBeUndefined();
  });

  it('touch con ts corrupto → undefined (no falsear frescura del click)', () => {
    const state: AttributionState = {
      last: { source: 'facebook', medium: 'cpc', fbclid: 'IwAR_x', ts: 'no-es-fecha' },
    };
    expect(resolveFbc(null, state, 1754100000000)).toBeUndefined();
  });

  it('el fbc de touch persistido pasa la validación del payload de CAPI', () => {
    const fbc = resolveFbc(null, stateWithLast, 0);
    const body = buildEventsPayload([pageView({ fbc })], { nowSeconds: NOW });
    expect(body.data[0].user_data.fbc).toBe(fbc);
  });
});

describe('generateMetaEventId', () => {
  it('genera ids únicos que pasan la validación del route', () => {
    const ROUTE_RE = /^[A-Za-z0-9._-]{8,64}$/; // mismo regex de api/conversions
    const ids = new Set(Array.from({ length: 200 }, () => generateMetaEventId()));
    expect(ids.size).toBe(200);
    for (const id of ids) expect(id).toMatch(ROUTE_RE);
  });
});
