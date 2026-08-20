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

// POR QUÉ ESTA PÁGINA NO MARCA EL RATING DE GOOGLE
//
// Hasta ahora esta era la única página del sitio que convertía el rating vivo
// de Google Places en `aggregateRating`, colgándolo del nodo `#organization`.
// Se retiró tras la auditoría de schema del 2026-08 (Irina Shvaya), y la razón
// es de política, no de implementación:
//
//   · El rating sale de Google Places, o sea de un tercero. Las guías de
//     review snippets piden que las valoraciones se recojan directamente de los
//     usuarios, no que se reagreguen desde otra plataforma.
//   · Aunque no lo fueran, es marcado auto-referido: la propia firma
//     publicando su propia calificación en el markup de su propia entidad.
//
// Las dos cosas a la vez, sobre `Organization`/`LegalService`/`LocalBusiness`,
// son el disparador más común de acción manual por structured data en el
// sector legal. El resto del sitio (officeSchema.ts, landingSchema.ts,
// layout.tsx) ya seguía esta política; esta página era la excepción.
//
// EL NÚMERO SIGUE SIENDO VISIBLE. `getLiveRating()` continúa alimentando el
// título, la meta description y <TestimoniosClient>, siempre rotulado como
// reseñas de Google. Mostrarlo con atribución clara está permitido; traducirlo
// a markup de la entidad, no.
//
// ⚠ NO REVIVIR ESTO. Hoy la key de Places devuelve 403 y el rating no se
// emitiría de todos modos, así que el borrado parece inocuo — no lo es: en
// cuanto la key se restablezca para el monitor de fichas GBP, cualquier código
// que vuelva a colgar `aggregateRating` del `@id` de la firma empieza a
// publicarlo solo. __tests__/schemaRatingPolicy.test.ts falla si vuelve.

export default async function TestimoniosPage({ params }: Props) {
  const { lang } = await params;
  const videoLang: VideoLang = lang === 'en' ? 'en' : 'es';
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
