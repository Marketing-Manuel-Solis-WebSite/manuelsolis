import 'server-only';
import { unstable_cache } from 'next/cache';

/**
 * Google Places API (New) client for sourcing real-time aggregate
 * ratings and review snippets used in schema.org markup.
 *
 * Architecture:
 *   - getPlaceDataRaw(): pure async, hits Google directly. Used in
 *     unit tests with fetch mocked.
 *   - getPlaceData():    cached wrapper (unstable_cache, 24h TTL,
 *     tag 'google-reviews' for manual revalidation). Used in
 *     production by Server Components and the schema builders.
 *   - getAggregatedRating(): aggregates multiple Place IDs into a
 *     weighted average. Useful for org-wide schema rollups.
 *
 * Fallback policy: if the API key is missing OR the request fails
 * for any reason, return null and let the caller render a schema
 * WITHOUT aggregateRating/review. NEVER fall back to hardcoded
 * data — the legal risk we're solving is exactly that.
 *
 * Server-only. Importing from a client component will fail the
 * build via the 'server-only' import.
 */

const PLACES_API_BASE = 'https://places.googleapis.com/v1/places';
const FIELD_MASK = [
  'id',
  'displayName',
  'rating',
  'userRatingCount',
  'reviews',
  'googleMapsUri',
].join(',');

export type GooglePlaceReview = {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
  publishedAt: string;
};

export type GooglePlaceData = {
  placeId: string;
  name: string;
  rating: number;
  userRatingCount: number;
  reviews: GooglePlaceReview[];
  url?: string;
};

interface PlacesApiReviewAuthor {
  displayName?: string;
}

interface PlacesApiReview {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  relativePublishTimeDescription?: string;
  publishTime?: string;
  authorAttribution?: PlacesApiReviewAuthor;
}

interface PlacesApiResponse {
  id?: string;
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  reviews?: PlacesApiReview[];
  googleMapsUri?: string;
}

function logEvent(event: string, fields: Record<string, unknown>): void {
  console.warn(
    JSON.stringify({
      event,
      ...fields,
      timestamp: new Date().toISOString(),
    }),
  );
}

/**
 * Pure (uncached) implementation. Exported for unit tests so the
 * fetch can be mocked without the cache wrapper interfering.
 *
 * Production callers should use getPlaceData() (cached wrapper below).
 */
export async function getPlaceDataRaw(
  placeId: string,
): Promise<GooglePlaceData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    logEvent('google_reviews_missing_key', { placeId });
    return null;
  }
  if (!placeId) {
    return null;
  }

  const url = `${PLACES_API_BASE}/${encodeURIComponent(placeId)}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': FIELD_MASK,
        Accept: 'application/json',
      },
    });
  } catch (err) {
    logEvent('google_reviews_network_error', {
      placeId,
      error: err instanceof Error ? err.message : String(err),
    });
    return null;
  }

  if (!response.ok) {
    logEvent('google_reviews_api_error', {
      placeId,
      status: response.status,
    });
    return null;
  }

  let data: PlacesApiResponse;
  try {
    data = (await response.json()) as PlacesApiResponse;
  } catch (err) {
    logEvent('google_reviews_parse_error', {
      placeId,
      error: err instanceof Error ? err.message : String(err),
    });
    return null;
  }

  const reviews: GooglePlaceReview[] = Array.isArray(data.reviews)
    ? data.reviews.map((r) => ({
        authorName: r.authorAttribution?.displayName ?? 'Anonymous',
        rating: typeof r.rating === 'number' ? r.rating : 0,
        text: r.text?.text ?? r.originalText?.text ?? '',
        relativeTime: r.relativePublishTimeDescription ?? '',
        publishedAt: r.publishTime ?? '',
      }))
    : [];

  return {
    placeId,
    name: data.displayName?.text ?? '',
    rating: typeof data.rating === 'number' ? data.rating : 0,
    userRatingCount:
      typeof data.userRatingCount === 'number' ? data.userRatingCount : 0,
    reviews,
    url: data.googleMapsUri,
  };
}

/**
 * Cached wrapper. unstable_cache keyed by placeId, revalidated every
 * 24 hours. Callers needing manual invalidation can use:
 *   import { revalidateTag } from 'next/cache';
 *   revalidateTag('google-reviews');
 */
export const getPlaceData = unstable_cache(
  async (placeId: string): Promise<GooglePlaceData | null> =>
    getPlaceDataRaw(placeId),
  ['google-place-data'],
  { revalidate: 86400, tags: ['google-reviews'] },
);

/**
 * Compute a weighted average rating across multiple Place IDs.
 *
 *   - All Place IDs failing OR all returning zero reviews → null.
 *   - Some Place IDs failing → average computed from the survivors.
 *
 * Weighting is by review count: a 5-office firm with one big office
 * (1000 reviews, 4.7) and four small offices (50 reviews each, 4.9)
 * lands closer to 4.7 than the simple 4.84 mean — the bigger office
 * carries more signal.
 */
export async function getAggregatedRating(
  placeIds: string[],
): Promise<{ averageRating: number; totalReviews: number } | null> {
  if (placeIds.length === 0) return null;

  const results = await Promise.all(placeIds.map((id) => getPlaceData(id)));
  const valid = results.filter(
    (r): r is GooglePlaceData => r !== null && r.userRatingCount > 0,
  );

  if (valid.length === 0) return null;

  const totalReviews = valid.reduce((sum, p) => sum + p.userRatingCount, 0);
  if (totalReviews === 0) return null;

  const weightedSum = valid.reduce(
    (sum, p) => sum + p.rating * p.userRatingCount,
    0,
  );
  const averageRating = weightedSum / totalReviews;

  return { averageRating, totalReviews };
}
