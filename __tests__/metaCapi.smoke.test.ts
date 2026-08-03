import { describe, expect, it } from 'vitest';
import { sendMetaCapiEvents } from '../app/lib/metaCapi';

/**
 * Smoke test de integración REAL contra la Conversions API de Meta.
 *
 * Auto-skip cuando META_CAPI_ACCESS_TOKEN no está en el entorno (CI y
 * corridas locales normales). Para ejecutarlo a propósito:
 *
 *   META_CAPI_ACCESS_TOKEN=<token> npx vitest run __tests__/metaCapi.smoke.test.ts
 *
 * Envía UN PageView identificable (?capi_smoke=1) al dataset de
 * producción — inocuo entre miles de page views y verificable en el
 * Events Manager. Con META_CAPI_TEST_EVENT_CODE seteado, el evento cae
 * en la pestaña "Test events" y no toca los datos reales.
 */
const HAS_TOKEN = Boolean(process.env.META_CAPI_ACCESS_TOKEN);

// El dataset del pixel del sitio es público (viaja en el HTML de cada
// página); solo el token es secreto.
process.env.META_DATASET_ID ||= process.env.NEXT_PUBLIC_META_PIXEL_ID || '1679590710105917';

(HAS_TOKEN ? describe : describe.skip)('Meta CAPI smoke (requiere token)', () => {
  it('Meta acepta un PageView real (events_received = 1)', async () => {
    const result = await sendMetaCapiEvents([
      {
        eventName: 'PageView',
        eventId: `smoke.${Date.now().toString(36)}.${Math.random().toString(36).slice(2, 10)}`,
        eventSourceUrl: 'https://www.manuelsolis.com/?capi_smoke=1',
        clientIpAddress: '187.190.10.20',
        clientUserAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
        fbp: `fb.1.${Date.now()}.1234567890`,
      },
    ]);

    expect(result.attempted).toBe(true);
    expect(result.status).toBe(200);
    expect(result.ok).toBe(true);
    expect(JSON.parse(result.body || '{}').events_received).toBe(1);
  }, 15000);
});
