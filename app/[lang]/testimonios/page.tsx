import type { Metadata } from 'next';
import { getPlaceData } from '../../lib/googleReviews';
import { MAIN_FIRM_PLACE_ID } from '../../lib/officesRegistry';
import TestimoniosClient from './TestimoniosClient';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs
    ? 'Testimonios de Clientes ★4.8 — Casos Reales'
    : 'Client Testimonials ★4.8 — Real Cases';
  const description = isEs
    ? 'Reseñas verificadas de Google ★4.8 estrellas. Más de 50,000 familias reunidas. Historias reales de clientes en Houston, Dallas, Chicago, Los Angeles, Memphis, Denver y El Paso. Casos de inmigración, Visa U, VAWA y accidentes.'
    : 'Verified Google reviews ★4.8 stars. Over 50,000 families reunited. Real client stories in Houston, Dallas, Chicago, Los Angeles, Memphis, Denver & El Paso. Immigration, U Visa, VAWA & accident cases.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/testimonios`,
      languages: {
        es: `${SITE_URL}/es/testimonios`,
        en: `${SITE_URL}/en/testimonios`,
        'x-default': `${SITE_URL}/es/testimonios`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/testimonios`,
      type: 'website',
      siteName: 'Manuel Solis Law Firm',
      locale: isEs ? 'es_US' : 'en_US',
      images: ['/og-default.jpg'],
    },
  };
}

// Schema.org — AggregateRating (live from Google Places, mirrors the LawFirm
// schema in app/[lang]/layout.tsx:305-329) + curated client testimonials.
// AggregateRating: pulls live data from MAIN_FIRM_PLACE_ID (Houston Principal)
// with 24h cache. If the Places API is unavailable, aggregateRating is
// omitted entirely — never falls back to hardcoded data, same policy as
// officeSchema.ts:20-22 and landingSchema.ts.
//
// El `review[]` hardcodeado fue removido (Wave 1 SEO) por la política
// anti-reseñas-fabricadas. Solo se mantiene el aggregateRating en vivo de
// Places (abajo). Para re-introducir reseñas, deben venir de Places o de un
// CMS con consentimiento + timestamp documentados.
async function generateReviewSchema(lang: string) {
  const isEs = lang === 'es';
  const mainPlaceData = await getPlaceData(MAIN_FIRM_PLACE_ID);

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Manuel Solis Law Firm',
    description: isEs
      ? 'Abogados de inmigración y accidentes con más de 35 años de experiencia y 50,000 casos ganados.'
      : 'Immigration and accident attorneys with over 35 years of experience and 50,000 cases won.',
    url: SITE_URL,
    telephone: '+1-888-676-1238',
    image: `${SITE_URL}/logo-manuel-solis.png`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '6705 Navigation Blvd',
      addressLocality: 'Houston',
      addressRegion: 'TX',
      postalCode: '77011',
      addressCountry: 'US',
    },
    // review[] removido (Wave 1 SEO): las reseñas hardcodeadas violaban la
    // política anti-reseñas-fabricadas — riesgo legal (publicidad de abogados
    // sin consentimiento documentado) + structured-data spam. Solo se mantiene
    // el aggregateRating en vivo de Google Places (abajo). Para volver a mostrar
    // reseñas, deben venir de Places o de un CMS con consentimiento + timestamp.
  };

  if (mainPlaceData && mainPlaceData.userRatingCount > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: mainPlaceData.rating.toFixed(1),
      bestRating: '5',
      worstRating: '1',
      ratingCount: mainPlaceData.userRatingCount,
      reviewCount: mainPlaceData.userRatingCount,
    };
  }

  return schema;
}

export default async function TestimoniosPage({ params }: Props) {
  const { lang } = await params;
  const reviewSchema = await generateReviewSchema(lang);

  return (
    <>
      <script
        id="review-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <TestimoniosClient />
    </>
  );
}
