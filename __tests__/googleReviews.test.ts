import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getAggregatedRating,
  getPlaceDataRaw,
} from '../app/lib/googleReviews';

/**
 * googleReviews unit tests with fetch mocked. The cached export
 * (getPlaceData) routes through unstable_cache and isn't deterministic
 * inside a single test run, so we exercise the underlying
 * getPlaceDataRaw() directly. getAggregatedRating uses the cached
 * export internally; we mock fetch to control its behaviour from
 * the outside without poking into the cache layer.
 */

const VALID_PLACES_RESPONSE = {
  id: 'ChIJ_main',
  displayName: { text: 'Manuel Solis Law - Houston Principal' },
  rating: 4.7,
  userRatingCount: 1234,
  reviews: [
    {
      rating: 5,
      text: { text: 'Servicio excelente, gracias.' },
      relativePublishTimeDescription: 'a month ago',
      publishTime: '2026-04-12T16:30:00Z',
      authorAttribution: { displayName: 'Maria G.' },
    },
    {
      rating: 4,
      text: { text: 'Good lawyers, helpful staff.' },
      relativePublishTimeDescription: '2 months ago',
      publishTime: '2026-03-05T10:15:00Z',
      authorAttribution: { displayName: 'John D.' },
    },
  ],
  googleMapsUri: 'https://maps.google.com/?cid=12345',
};

const ORIGINAL_KEY = process.env.GOOGLE_PLACES_API_KEY;

beforeEach(() => {
  process.env.GOOGLE_PLACES_API_KEY = 'test-key-1234';
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  process.env.GOOGLE_PLACES_API_KEY = ORIGINAL_KEY;
});

function mockFetchOnce(response: {
  ok: boolean;
  status?: number;
  json?: () => Promise<unknown>;
}) {
  const mock = vi.fn().mockResolvedValueOnce({
    ok: response.ok,
    status: response.status ?? (response.ok ? 200 : 500),
    json: response.json ?? (() => Promise.resolve({})),
  } as unknown as Response);
  vi.stubGlobal('fetch', mock);
  return mock;
}

describe('getPlaceDataRaw — auth and inputs', () => {
  it('returns null when GOOGLE_PLACES_API_KEY is missing', async () => {
    delete process.env.GOOGLE_PLACES_API_KEY;
    const result = await getPlaceDataRaw('ChIJ_anything');
    expect(result).toBeNull();
  });

  it('returns null when placeId is empty', async () => {
    const result = await getPlaceDataRaw('');
    expect(result).toBeNull();
  });
});

describe('getPlaceDataRaw — request shape', () => {
  it('hits Places API (New) URL with correct headers and FieldMask', async () => {
    const mock = mockFetchOnce({
      ok: true,
      json: () => Promise.resolve(VALID_PLACES_RESPONSE),
    });

    await getPlaceDataRaw('ChIJ_test');

    expect(mock).toHaveBeenCalledTimes(1);
    const [url, init] = mock.mock.calls[0];
    expect(url).toBe('https://places.googleapis.com/v1/places/ChIJ_test');
    expect(init).toBeDefined();
    expect(init.method).toBe('GET');
    expect(init.headers['X-Goog-Api-Key']).toBe('test-key-1234');
    expect(init.headers['X-Goog-FieldMask']).toContain('rating');
    expect(init.headers['X-Goog-FieldMask']).toContain('userRatingCount');
    expect(init.headers['X-Goog-FieldMask']).toContain('reviews');
  });

  it('URL-encodes the placeId', async () => {
    const mock = mockFetchOnce({
      ok: true,
      json: () => Promise.resolve(VALID_PLACES_RESPONSE),
    });

    await getPlaceDataRaw('ChIJ test/with spaces');
    const [url] = mock.mock.calls[0];
    expect(url).toContain('ChIJ%20test%2Fwith%20spaces');
  });
});

describe('getPlaceDataRaw — error handling', () => {
  it('returns null on 4xx response', async () => {
    mockFetchOnce({ ok: false, status: 404 });
    const result = await getPlaceDataRaw('ChIJ_missing');
    expect(result).toBeNull();
  });

  it('returns null on 5xx response', async () => {
    mockFetchOnce({ ok: false, status: 500 });
    const result = await getPlaceDataRaw('ChIJ_oops');
    expect(result).toBeNull();
  });

  it('returns null on network error (fetch throws)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValueOnce(new Error('ECONNRESET')),
    );
    const result = await getPlaceDataRaw('ChIJ_offline');
    expect(result).toBeNull();
  });

  it('returns null on JSON parse error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.reject(new Error('bad json')),
      } as unknown as Response),
    );
    const result = await getPlaceDataRaw('ChIJ_garbage');
    expect(result).toBeNull();
  });
});

describe('getPlaceDataRaw — successful parse', () => {
  it('maps Places API (New) response to GooglePlaceData', async () => {
    mockFetchOnce({
      ok: true,
      json: () => Promise.resolve(VALID_PLACES_RESPONSE),
    });

    const result = await getPlaceDataRaw('ChIJ_main');
    expect(result).not.toBeNull();
    expect(result).toMatchObject({
      placeId: 'ChIJ_main',
      name: 'Manuel Solis Law - Houston Principal',
      rating: 4.7,
      userRatingCount: 1234,
      url: 'https://maps.google.com/?cid=12345',
    });
    expect(result?.reviews).toHaveLength(2);
    expect(result?.reviews[0]).toMatchObject({
      authorName: 'Maria G.',
      rating: 5,
      text: 'Servicio excelente, gracias.',
      relativeTime: 'a month ago',
      publishedAt: '2026-04-12T16:30:00Z',
    });
  });

  it('handles empty reviews array gracefully', async () => {
    mockFetchOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          ...VALID_PLACES_RESPONSE,
          reviews: [],
        }),
    });

    const result = await getPlaceDataRaw('ChIJ_quiet');
    expect(result?.reviews).toEqual([]);
    expect(result?.rating).toBe(4.7);
  });

  it('handles missing reviews field (undefined) gracefully', async () => {
    mockFetchOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 'ChIJ_brandnew',
          displayName: { text: 'New office' },
          rating: 0,
          userRatingCount: 0,
          // no reviews field at all
        }),
    });

    const result = await getPlaceDataRaw('ChIJ_brandnew');
    expect(result?.reviews).toEqual([]);
    expect(result?.userRatingCount).toBe(0);
  });

  it('falls back to "Anonymous" for missing author', async () => {
    mockFetchOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          ...VALID_PLACES_RESPONSE,
          reviews: [
            {
              rating: 5,
              text: { text: 'Great firm' },
              publishTime: '2026-04-01T00:00:00Z',
              // no authorAttribution
            },
          ],
        }),
    });
    const result = await getPlaceDataRaw('ChIJ_anon');
    expect(result?.reviews[0].authorName).toBe('Anonymous');
  });

  it('reads originalText.text when text.text is missing', async () => {
    mockFetchOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          ...VALID_PLACES_RESPONSE,
          reviews: [
            {
              rating: 4,
              originalText: { text: 'Translated review' },
              publishTime: '2026-03-01T00:00:00Z',
              authorAttribution: { displayName: 'Pedro' },
            },
          ],
        }),
    });
    const result = await getPlaceDataRaw('ChIJ_orig');
    expect(result?.reviews[0].text).toBe('Translated review');
  });
});

describe('getAggregatedRating', () => {
  it('returns null when given an empty array', async () => {
    const result = await getAggregatedRating([]);
    expect(result).toBeNull();
  });

  it('returns null when ALL Place IDs fail (all 5xx)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.resolve({}),
      } as unknown as Response),
    );

    const result = await getAggregatedRating(['ChIJ_a', 'ChIJ_b']);
    expect(result).toBeNull();
  });

  it('returns null when ALL Place IDs return zero reviews', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            id: 'whatever',
            rating: 0,
            userRatingCount: 0,
            reviews: [],
          }),
      } as unknown as Response),
    );

    const result = await getAggregatedRating(['ChIJ_a', 'ChIJ_b']);
    expect(result).toBeNull();
  });

  it('aggregates with review-count weighting when partial responses succeed', async () => {
    // Big office: 1000 reviews × 4.7
    // Small office: 100 reviews × 4.9
    // Failed office: returns null
    // Expected weighted avg = (1000*4.7 + 100*4.9) / 1100 = 4.7181...
    let call = 0;
    const responses = [
      { rating: 4.7, userRatingCount: 1000 },
      { rating: 4.9, userRatingCount: 100 },
      { __fail: true },
    ];

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(async () => {
        const r = responses[call++];
        if ('__fail' in r) {
          return {
            ok: false,
            status: 500,
            json: () => Promise.resolve({}),
          } as unknown as Response;
        }
        return {
          ok: true,
          status: 200,
          json: () =>
            Promise.resolve({
              id: `office-${call}`,
              rating: r.rating,
              userRatingCount: r.userRatingCount,
              reviews: [],
            }),
        } as unknown as Response;
      }),
    );

    const result = await getAggregatedRating([
      'ChIJ_big',
      'ChIJ_small',
      'ChIJ_failed',
    ]);

    expect(result).not.toBeNull();
    expect(result?.totalReviews).toBe(1100);
    expect(result?.averageRating).toBeCloseTo(4.7181, 3);
  });
});
