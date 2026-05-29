import 'server-only';
import { getPlaceData, type GooglePlaceData } from './googleReviews';
import { getOfficePlaceId } from './officesRegistry';
import { getPageData, SITE_URL } from './cityServiceData';

/**
 * Centralized builder for the per-landing LegalService schema.org payload.
 * 25 city×service landing pages (`/[lang]/<slug>`) used to inline a copy of
 * this schema with a HARDCODED aggregateRating (ratingValue:'4.8', ratingCount:'12').
 * That contradicted the firm's documented policy (see app/lib/officeSchema.ts:20-22
 * and app/[lang]/layout.tsx:299-303) and violated Google's structured-data spam
 * policy on fabricated review counts.
 *
 * This helper:
 *   - Builds the LegalService payload from the same data sources the page
 *     already loads (`cityServiceData.getPageData(slug)`).
 *   - When `officeSlugForReviews` is provided and that office has a Google
 *     Place ID in OFFICES_PLACE_IDS, augments the schema with live
 *     aggregateRating + top 3 reviews from Google Places (24h cache).
 *   - When the Place ID is missing OR the Places API fails, OMITS
 *     aggregateRating/review entirely — never falls back to hardcoded data.
 *
 * Mirrors the design of app/lib/officeSchema.ts:buildOfficeSchema.
 */

const ORG_ID = `${SITE_URL}/#organization`;
const ORG_NAME = 'Manuel Solis Law Firm';

export type LandingOpeningHours = {
  dayOfWeek: string | string[];
  opens: string;
  closes: string;
};

export type BuildLandingSchemaInput = {
  pageSlug: string;
  lang: 'es' | 'en';
  /**
   * Slug of the office whose Google Place data should feed
   * aggregateRating + review. Must match a key in
   * app/lib/officesRegistry.ts → OFFICES_PLACE_IDS.
   *
   * If omitted (or the office is not in the registry / Places API
   * fails) the schema is rendered WITHOUT aggregateRating.
   * NEVER falls back to hardcoded data.
   */
  officeSlugForReviews?: string;
  /**
   * Optional override for opening hours. Defaults to Mon–Fri 8–18 + Sat 9–13,
   * which is the shape every landing previously inlined.
   */
  openingHours?: LandingOpeningHours[];
};

const DEFAULT_OPENING_HOURS: LandingOpeningHours[] = [
  {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '18:00',
  },
  { dayOfWeek: 'Saturday', opens: '09:00', closes: '13:00' },
];

export async function buildLandingSchema(
  input: BuildLandingSchemaInput,
): Promise<Record<string, unknown>> {
  const data = getPageData(input.pageSlug);
  if (!data) {
    throw new Error(`buildLandingSchema: unknown pageSlug "${input.pageSlug}"`);
  }
  const { config, office, service } = data;

  const placeId = input.officeSlugForReviews
    ? getOfficePlaceId(input.officeSlugForReviews)
    : null;
  const placeData: GooglePlaceData | null = placeId
    ? await getPlaceData(placeId)
    : null;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `Manuel Solis - ${service.title[input.lang]}`,
    description: config.metaDescription[input.lang],
    url: `${SITE_URL}/${input.lang}/${input.pageSlug}`,
    telephone: office.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: office.address.split(',')[0],
      addressLocality: office.city,
      addressRegion: office.stateCode,
      postalCode: office.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: office.coordinates.lat,
      longitude: office.coordinates.lng,
    },
    areaServed: { '@type': 'City', name: office.city },
    priceRange: '$$',
    openingHoursSpecification: (input.openingHours ?? DEFAULT_OPENING_HOURS).map(
      (h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.dayOfWeek,
        opens: h.opens,
        closes: h.closes,
      }),
    ),
    parentOrganization: {
      '@type': 'LawFirm',
      '@id': ORG_ID,
      name: ORG_NAME,
    },
  };

  if (placeData && placeData.userRatingCount > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: placeData.rating.toFixed(1),
      bestRating: '5',
      worstRating: '1',
      ratingCount: placeData.userRatingCount,
      reviewCount: placeData.userRatingCount,
    };
  }

  if (placeData?.reviews?.length) {
    schema.review = placeData.reviews.slice(0, 3).map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.authorName },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
      },
      reviewBody: r.text,
      datePublished: r.publishedAt,
    }));
  }

  return schema;
}

/**
 * Map landing-page slug → office slug whose Google Place feeds the
 * aggregateRating. Verified against OFFICES_PLACE_IDS in
 * app/lib/officesRegistry.ts — all 25 landings map to an office with
 * a real placeId.
 *
 * Houston has multiple offices; the accidentes landing points at
 * `houston-accidentes` (the dedicated accident-injury location) while
 * the other Houston landings point at `houston-principal` (Navigation
 * Blvd, the main immigration office).
 */
export const LANDING_TO_OFFICE_FOR_REVIEWS: Readonly<Record<string, string>> = {
  // Immigration
  'abogado-inmigracion-houston':     'houston-principal',
  'abogado-inmigracion-dallas':      'dallas',
  'abogado-inmigracion-chicago':     'chicago',
  'abogado-inmigracion-los-angeles': 'losangeles',
  'abogado-inmigracion-el-paso':     'el-paso',
  'abogado-inmigracion-memphis':     'memphis',
  'abogado-inmigracion-denver':      'arvada',
  'abogado-inmigracion-harlingen':   'harlingen',
  // Accidents
  'abogado-accidentes-houston':      'houston-accidentes',
  'abogado-accidentes-dallas':       'dallas',
  // Deportation defense
  'defensa-deportacion-houston':     'houston-principal',
  'defensa-deportacion-dallas':      'dallas',
  'defensa-deportacion-chicago':     'chicago',
  'defensa-deportacion-los-angeles': 'losangeles',
  'defensa-deportacion-el-paso':     'el-paso',
  // U Visa
  'visa-u-houston':                  'houston-principal',
  'visa-u-chicago':                  'chicago',
  'visa-u-los-angeles':              'losangeles',
  'visa-u-dallas':                   'dallas',
  // Asylum
  'asilo-politico-houston':          'houston-principal',
  'asilo-politico-chicago':          'chicago',
  'asilo-politico-los-angeles':      'losangeles',
  // VAWA
  'vawa-houston':                    'houston-principal',
  'vawa-chicago':                    'chicago',
  'vawa-dallas':                     'dallas',
} as const;
