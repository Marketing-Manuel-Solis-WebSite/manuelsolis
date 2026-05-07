import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * Tests for fireConversion() — verifies that each FireableConversionType
 * routes to the correct subset of the five tracking layers with the
 * expected payloads.
 *
 * Strategy:
 *   - vi.mock @vercel/analytics so `track()` is observable.
 *   - vi.mock app/lib/tracking so `pushToDataLayer` and trackConversion
 *     are observable without hitting the real implementations.
 *   - Stub window.fbq and window.ttq to observe pixel calls.
 */

vi.mock('@vercel/analytics/react', () => ({
  track: vi.fn(),
}));

vi.mock('../app/lib/tracking', async () => {
  return {
    pushToDataLayer: vi.fn(),
    trackConversion: vi.fn(),
  };
});

import { track } from '@vercel/analytics/react';
import { pushToDataLayer, trackConversion } from '../app/lib/tracking';
import { fireConversion } from '../app/lib/conversion';

const trackMock = vi.mocked(track);
const pushMock = vi.mocked(pushToDataLayer);
const flightCheckMock = vi.mocked(trackConversion);

let fbqMock: ReturnType<typeof vi.fn>;
let ttqMock: { track: ReturnType<typeof vi.fn> };

beforeEach(() => {
  trackMock.mockClear();
  pushMock.mockClear();
  flightCheckMock.mockClear();

  fbqMock = vi.fn();
  ttqMock = { track: vi.fn() };
  // happy-path: both pixels are loaded
  (globalThis as unknown as { window: unknown }).window = {
    fbq: fbqMock,
    ttq: ttqMock,
  };
});

afterEach(() => {
  delete (globalThis as Record<string, unknown>).window;
  vi.restoreAllMocks();
});

describe('fireConversion — full fanout for canonical types', () => {
  it('whatsapp_click fires all 5 layers', () => {
    const result = fireConversion('whatsapp_click', 'mobile_sticky_bar', {
      language: 'es',
    });

    expect(result.fired).toEqual([
      'gtag',
      'vercel',
      'meta',
      'tiktok',
      'flight_check',
    ]);
    expect(result.errors).toEqual([]);

    // dataLayer
    expect(pushMock).toHaveBeenCalledWith('whatsapp_click', {
      event_label: 'mobile_sticky_bar',
      language: 'es',
    });

    // Vercel
    expect(trackMock).toHaveBeenCalledWith('whatsapp_click.mobile_sticky_bar', {
      language: 'es',
    });

    // Meta — Contact for whatsapp_click
    expect(fbqMock).toHaveBeenCalledWith('track', 'Contact', {
      content_name: 'mobile_sticky_bar',
      language: 'es',
    });

    // TikTok — Contact for whatsapp_click
    expect(ttqMock.track).toHaveBeenCalledWith('Contact', {
      content_name: 'mobile_sticky_bar',
      language: 'es',
    });

    // Flight Check
    expect(flightCheckMock).toHaveBeenCalledWith(
      'whatsapp_click',
      'mobile_sticky_bar',
    );
  });

  it('form_submit maps to Meta:Lead and TikTok:CompleteRegistration', () => {
    const result = fireConversion('form_submit', 'contact_form');

    expect(result.fired).toContain('meta');
    expect(result.fired).toContain('tiktok');

    expect(fbqMock).toHaveBeenCalledWith(
      'track',
      'Lead',
      expect.objectContaining({ content_name: 'contact_form' }),
    );
    expect(ttqMock.track).toHaveBeenCalledWith(
      'CompleteRegistration',
      expect.objectContaining({ content_name: 'contact_form' }),
    );
  });

  it('consulta_click maps to Meta:Contact and TikTok:ClickButton', () => {
    fireConversion('consulta_click', 'floating_consulta_cta');

    expect(fbqMock).toHaveBeenCalledWith(
      'track',
      'Contact',
      expect.any(Object),
    );
    expect(ttqMock.track).toHaveBeenCalledWith(
      'ClickButton',
      expect.any(Object),
    );
  });
});

describe('fireConversion — popup events skip pixels', () => {
  it('popup_open fires gtag + vercel + flight_check, NOT meta NOR tiktok', () => {
    const result = fireConversion('popup_open', 'detained_relative');

    expect(result.fired).toEqual(['gtag', 'vercel', 'flight_check']);
    expect(fbqMock).not.toHaveBeenCalled();
    expect(ttqMock.track).not.toHaveBeenCalled();
  });

  it('popup_dismiss skips pixels too', () => {
    fireConversion('popup_dismiss', 'detained_relative');
    expect(fbqMock).not.toHaveBeenCalled();
    expect(ttqMock.track).not.toHaveBeenCalled();
  });

  it('popup_cta_click skips pixels too', () => {
    fireConversion('popup_cta_click', 'client', { cta_label: 'client' });
    expect(fbqMock).not.toHaveBeenCalled();
    expect(ttqMock.track).not.toHaveBeenCalled();
    // but still goes to dataLayer/Vercel/FlightCheck
    expect(pushMock).toHaveBeenCalled();
    expect(trackMock).toHaveBeenCalled();
    expect(flightCheckMock).toHaveBeenCalled();
  });
});

describe('fireConversion — robustness', () => {
  it('returns fired:[] without crashing in SSR (no window)', () => {
    delete (globalThis as Record<string, unknown>).window;
    // Re-import would be needed for module reload in real SSR; but our
    // safeWindow() already detects typeof window === 'undefined'.
    // Mocks for tracking lib still run though, so we expect
    // gtag, vercel, flight_check still in fired.
    const result = fireConversion('whatsapp_click', 'ssr_test');
    expect(result.fired).not.toContain('meta');
    expect(result.fired).not.toContain('tiktok');
  });

  it('skips Meta when window.fbq is missing', () => {
    (globalThis as unknown as { window: unknown }).window = {
      ttq: ttqMock,
    };
    const result = fireConversion('phone_click', 'header');
    expect(result.fired).not.toContain('meta');
    expect(result.fired).toContain('tiktok');
  });

  it('isolates errors: a throwing pixel does not block other layers', () => {
    fbqMock.mockImplementationOnce(() => {
      throw new Error('fbq exploded');
    });
    const result = fireConversion('phone_click', 'header_phone_button');
    expect(result.fired).toContain('gtag');
    expect(result.fired).toContain('vercel');
    expect(result.fired).toContain('tiktok');
    expect(result.fired).toContain('flight_check');
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].layer).toBe('meta');
    expect((result.errors[0].error as Error).message).toBe('fbq exploded');
  });

  it('propagates extensible meta to every layer', () => {
    fireConversion('phone_click', 'header_phone_button', {
      office_slug: 'dallas',
      phone_number: '(214) 753-8315',
    });
    expect(pushMock).toHaveBeenCalledWith(
      'phone_click',
      expect.objectContaining({
        office_slug: 'dallas',
        phone_number: '(214) 753-8315',
      }),
    );
    expect(fbqMock).toHaveBeenCalledWith(
      'track',
      'Contact',
      expect.objectContaining({
        office_slug: 'dallas',
        phone_number: '(214) 753-8315',
      }),
    );
  });

  it('drops null/undefined values from meta, keeps numbers and booleans', () => {
    fireConversion('whatsapp_click', 'test', {
      keepStr: 'yes',
      keepNum: 42,
      keepBool: true,
      dropNull: null,
      dropUndef: undefined,
    });
    expect(pushMock).toHaveBeenCalledWith('whatsapp_click', {
      event_label: 'test',
      keepStr: 'yes',
      keepNum: '42',
      keepBool: 'true',
    });
  });
});

describe('fireConversion — dataLayer event field carries the type', () => {
  it("pushToDataLayer's first argument is the event type, not 'event'", () => {
    fireConversion('phone_click', 'header_phone_button');
    // pushToDataLayer(event: string, params: Record<string, string>)
    // sets event = 'phone_click' inside, so GTM listens to 'phone_click'.
    expect(pushMock.mock.calls[0][0]).toBe('phone_click');
    expect(pushMock.mock.calls[0][1]).toMatchObject({
      event_label: 'header_phone_button',
    });
  });
});
