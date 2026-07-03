import 'server-only';
import { getPlaceData, type GooglePlaceData } from './googleReviews';
import { getOfficePlaceId, isVirtualOffice } from './officesRegistry';

/**
 * Centralized builder for the per-office LegalService + Attorney
 * schema.org payload. Each office page.tsx used to inline its own
 * getLocalBusinessSchema() with ~50 lines of near-identical boiler-
 * plate; this helper consolidates the boilerplate so future schema
 * changes (e.g. adding `priceRange` variants, fixing a property
 * name) are one-file edits instead of fifteen.
 *
 * Augments the base schema with Google Places aggregateRating and
 * top 3 reviews when:
 *   - The slug is present in OFFICES_PLACE_IDS.
 *   - getPlaceData() returns non-null (i.e. API key set, request OK).
 *   - The Place has at least one review.
 *
 * If any of those is false, the resulting schema simply omits
 * `aggregateRating` and `review` — never falls back to hardcoded
 * data (legal risk: see DISCOVERY_v3.md §1.1 #5).
 */

const SITE_URL = 'https://www.manuelsolis.com';
const ORG_NAME = 'Manuel Solis Law Firm';
const ORG_LOGO = `${SITE_URL}/logo-manuel-solis.png`;
const SAME_AS_BASE = [
  'https://www.facebook.com/AbogadoManuelSolisOficial/',
  'https://twitter.com/AbogadoMSolis',
];

export type OfficeOpeningHours = {
  dayOfWeek: string | string[];
  opens: string;
  closes: string;
};

export type OfficeInfo = {
  /** Nombre por sucursal (ej. "Manuel Solis Law Firm - Harlingen"); mejora el match con la ficha GBP. */
  name?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  latitude: string;
  longitude: string;
  mapUrl?: string;
};

export type BuildOfficeSchemaInput = {
  slug: string;
  officeInfo: OfficeInfo;
  description: { es: string; en: string };
  openingHours?: OfficeOpeningHours[];
  /** Optional override for offices with non-default language support. */
  knowsLanguage?: string[];
};

export async function buildOfficeSchema(
  input: BuildOfficeSchemaInput,
  lang: 'es' | 'en',
): Promise<Record<string, unknown>> {
  const placeId = getOfficePlaceId(input.slug);
  const placeData: GooglePlaceData | null = placeId
    ? await getPlaceData(placeId)
    : null;

  const url = `${SITE_URL}/${lang}/oficinas/${input.slug}`;
  const virtual = isVirtualOffice(input.slug);

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'Attorney'],
    // @id neutro de idioma: es/en describen la MISMA oficina física.
    '@id': `${SITE_URL}/oficinas/${input.slug}#localbusiness`,
    name: input.officeInfo.name ?? ORG_NAME,
    description: lang === 'es' ? input.description.es : input.description.en,
    image: ORG_LOGO,
    url,
    telephone: input.officeInfo.phone,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: input.officeInfo.address,
      addressLocality: input.officeInfo.city,
      addressRegion: input.officeInfo.state,
      postalCode: input.officeInfo.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: input.officeInfo.latitude,
      longitude: input.officeInfo.longitude,
    },
    areaServed: { '@type': 'City', name: input.officeInfo.city },
    sameAs: SAME_AS_BASE,
  };

  const mapLink = input.officeInfo.mapUrl ?? placeData?.url;
  if (mapLink) schema.hasMap = mapLink;

  // Política de oficinas virtuales (ver officesRegistry.ts): una dirección
  // Regus/IWG no emite horario 24h ni rating como si fuera sede atendida.
  if (input.openingHours?.length && !virtual) {
    schema.openingHoursSpecification = input.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    }));
  }

  if (input.knowsLanguage?.length) {
    schema.knowsLanguage = input.knowsLanguage;
  }

  if (placeData && placeData.userRatingCount > 0 && !virtual) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: placeData.rating.toFixed(1),
      ratingCount: placeData.userRatingCount,
      reviewCount: placeData.userRatingCount,
      bestRating: '5',
      worstRating: '1',
    };
  }

  if (placeData?.reviews?.length && !virtual) {
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
