import type { Metadata } from 'next';
import Script from 'next/script';
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
      images: ['/home-image.jpg'],
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
// TODO(follow-up): the `review[]` entries below are still hardcoded. Per
// the same anti-fabricated-review policy, these should either come from
// Places (which currently returns only the top 5 reviews of a single
// office, not the curated firm-wide selection shown here) or be sourced
// from a vetted internal CMS where every entry has documented consent +
// timestamp. Tracking outside of this PR.
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
    review: [
      { '@type': 'Review', author: { '@type': 'Person', name: 'Gilmar Guzman' }, datePublished: '2026-02-25', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'He tenido una grata experiencia con mi preparadora de documentos Veronica Velasquez. Ella me ha asesorado y preparado para la entrevista, eso me hace sentir mucha confianza. Recibí mi residencia y seguro social al mismo tiempo. Recomiendo al Abogado Manuel Solis.', locationCreated: { '@type': 'Place', name: 'Los Angeles Office' } },
      { '@type': 'Review', author: { '@type': 'Person', name: 'Isabel Casco' }, datePublished: '2026-02-18', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'Im very grateful with God that after all these years I finally got my green card and that is thanks to the Manuel Solis lawyers. Its been a long process but worth it at the end.', locationCreated: { '@type': 'Place', name: 'Chicago Office' } },
      { '@type': 'Review', author: { '@type': 'Person', name: 'Wendy Alfaro' }, datePublished: '2025-03-18', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'Recomiendo mucho el bufet de abogados Manuel Solís pues te ayudan en todo tu trámite migratorio. Asesoría en Ciudad Juárez con estadía y transporte. Lo recomiendo mucho, es lo mejor.', locationCreated: { '@type': 'Place', name: 'Harlingen Office' } },
      { '@type': 'Review', author: { '@type': 'Person', name: 'Marina Cantu' }, datePublished: '2026-03-04', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'Excelente trabajo. Me dieron un tiempo estimado y se finalizó antes. Gracias por el apoyo y amabilidad del equipo de Dallas.', locationCreated: { '@type': 'Place', name: 'Dallas Office' } },
      { '@type': 'Review', author: { '@type': 'Person', name: 'Claudia Pereira' }, datePublished: '2026-02-18', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'Gracias a las oficinas del abogado Manuel Solis obtuve mi residencia y proceso fue todo éxito.', locationCreated: { '@type': 'Place', name: 'Denver Office' } },
      { '@type': 'Review', author: { '@type': 'Person', name: 'Blanca Romero' }, datePublished: '2026-02-18', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'Excelente Servicio, una forma tan bonita de brindar la información. Ella muy amable llena de empatía y profesionalismo. Totalmente Recomendado.', locationCreated: { '@type': 'Place', name: 'Memphis Office' } },
      { '@type': 'Review', author: { '@type': 'Person', name: 'Nancy Mendez' }, datePublished: '2026-01-21', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'Martha A. Melendez was excellent in all our interviews, she was so knowledgeable and patient. Overall we are extremely pleased with her services.', locationCreated: { '@type': 'Place', name: 'Houston Principal Office' } },
      { '@type': 'Review', author: { '@type': 'Person', name: 'Ana Landeros' }, datePublished: '2026-02-04', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'La señorita Evelyn ha estado muy atenta con el caso de mi mamá. Gracias a todo el equipo de Abogados, hacen un gran trabajo por ver familias reunidas.', locationCreated: { '@type': 'Place', name: 'El Paso Office' } },
    ],
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
      <Script
        id="review-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <TestimoniosClient />
    </>
  );
}
