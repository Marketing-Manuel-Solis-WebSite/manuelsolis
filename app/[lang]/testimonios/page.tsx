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

/**
 * Rating vivo de la ficha principal (caché 24h). Es la MISMA fuente que
 * alimenta el aggregateRating del schema, para que el número del título no
 * pueda divergir del marcado. Si Places no responde, devuelve null y el
 * título se emite sin estrella — nunca con un valor hardcodeado.
 */
async function getLiveRating(): Promise<string | null> {
  const placeData = await getPlaceData(MAIN_FIRM_PLACE_ID);
  if (!placeData || placeData.userRatingCount === 0) return null;
  return placeData.rating.toFixed(1);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';
  const rating = await getLiveRating();

  const title = isEs
    ? `Testimonios de Clientes${rating ? ` ★${rating}` : ''} — Casos Reales`
    : `Client Testimonials${rating ? ` ★${rating}` : ''} — Real Cases`;
  const description = isEs
    ? `Reseñas verificadas de Google${rating ? ` ★${rating} estrellas` : ''}. Más de 50,000 familias reunidas. Historias reales de clientes en Houston, Dallas, Chicago, Los Angeles, Memphis, Denver y El Paso. Casos de inmigración, Visa U, VAWA y accidentes.`
    : `Verified Google reviews${rating ? ` ★${rating} stars` : ''}. Over 50,000 families reunited. Real client stories in Houston, Dallas, Chicago, Los Angeles, Memphis, Denver & El Paso. Immigration, U Visa, VAWA & accident cases.`;

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

// Schema.org — el aggregateRating vivo de Google Places (MAIN_FIRM_PLACE_ID,
// Houston Principal, caché 24h) se adjunta al MISMO nodo `#organization` que
// emite app/[lang]/layout.tsx: declarar aquí una segunda entidad LegalService
// con nombre y dirección propios hacía que la misma URL describiera dos
// negocios con idéntico rating. Con el @id compartido, es una sola entidad.
//
// Esta es la única página que puede marcar el rating porque es la única que lo
// renderiza visible. Si Places no responde, no se emite nada — nunca se cae a
// datos hardcodeados (misma política que officeSchema.ts y landingSchema.ts).
// El `review[]` hardcodeado se removió (Wave 1 SEO) por la política
// anti-reseñas-fabricadas: para volver a marcar reseñas deben venir de un CMS
// con consentimiento + timestamp documentados.
async function generateRatingSchema(): Promise<Record<string, unknown> | null> {
  const mainPlaceData = await getPlaceData(MAIN_FIRM_PLACE_ID);
  if (!mainPlaceData || mainPlaceData.userRatingCount === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'LawFirm'],
    '@id': `${SITE_URL}/#organization`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: mainPlaceData.rating.toFixed(1),
      bestRating: '5',
      worstRating: '1',
      ratingCount: mainPlaceData.userRatingCount,
      reviewCount: mainPlaceData.userRatingCount,
    },
  };
}

export default async function TestimoniosPage() {
  const ratingSchema = await generateRatingSchema();

  return (
    <>
      {ratingSchema && (
        <script
          id="review-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ratingSchema) }}
        />
      )}
      <TestimoniosClient googleRating={await getLiveRating()} />
    </>
  );
}
