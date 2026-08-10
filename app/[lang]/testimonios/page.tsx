import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import type { Metadata } from 'next';
import { getPlaceData } from '../../lib/googleReviews';
import { MAIN_FIRM_PLACE_ID } from '../../lib/officesRegistry';
import { buildSocialMetadata } from '../../lib/seoMetadata';
import {
  buildPageVideoSchemas,
  TESTIMONIOS_PAGE_VIDEOS,
  type VideoLang,
} from '../../lib/videoSchema';
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
  // Largo pensado para los dos caminos: sin rating queda en 142/141 caracteres
  // y con el rating vivo intercalado no pasa de 160.
  const description = isEs
    ? `Reseñas verificadas de Google${rating ? ` ★${rating} estrellas` : ''} de clientes en Houston, Dallas, Chicago, Los Angeles y El Paso. Casos de inmigración, Visa U, VAWA y accidentes.`
    : `Verified Google reviews${rating ? ` ★${rating} stars` : ''} from real clients in Houston, Dallas, Chicago, Los Angeles and El Paso. Immigration, U Visa, VAWA and accident cases.`;

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
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/testimonios`,
      title,
      description,
      /**
       * Portada de la serie "Uniendo Familias", que es contenido de testimonio
       * real y no una tarjeta genérica.
       *
       * Se elige esta y no la miniatura del vídeo (/testimonials/YV01.png)
       * porque esa pesa 1,6 MB: `og:image` apunta al archivo CRUDO, no al que
       * optimiza next/image, así que es lo que WhatsApp descarga cada vez que
       * alguien comparte el enlace. Esta pesa 53 KB.
       */
      images: [
        {
          url: '/UniendoFamilias_ManuelSolis.png',
          alt: isEs
            ? 'Testimonios de clientes de Manuel Solís'
            : 'Manuel Solis client testimonials',
        },
      ],
    }),
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

export default async function TestimoniosPage({ params }: Props) {
  const { lang } = await params;
  const videoLang: VideoLang = lang === 'en' ? 'en' : 'es';
  const ratingSchema = await generateRatingSchema();
  // Los 6 testimonios son vídeos de YouTube que la página ya incrusta: con
  // VideoObject pasan a ser elegibles para el carrusel de vídeo de Google.
  const videoSchemas = buildPageVideoSchemas({
    videos: TESTIMONIOS_PAGE_VIDEOS,
    lang: videoLang,
    pagePath: `/${videoLang}/testimonios`,
  });

  return (
    <>
      <BreadcrumbSchema lang={videoLang} trail={[{ es: 'Testimonios', en: 'Testimonials', path: '/testimonios' }]} />
      {ratingSchema && (
        <script
          id="review-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ratingSchema) }}
        />
      )}
      {videoSchemas.map((schema, i) => (
        <script
          key={i}
          id={`video-schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <TestimoniosClient googleRating={await getLiveRating()} />
    </>
  );
}
