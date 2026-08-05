import type { Metadata } from 'next';
import RecursosClient from './RecursosClient';
import { buildSocialMetadata } from '../../../lib/seoMetadata';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = { params: Promise<{ lang: string }> };

export async function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs ? 'Recursos: Examen de Ciudadanía N-400' : 'Resources: N-400 Citizenship Test';
  // Sin cifra de preguntas en el copy: el banco cambia y la description no
  // debe prometer un número que la página no muestre.
  const description = isEs
    ? 'Practique las preguntas de civismo del examen de ciudadanía (N-400) con sus respuestas aceptadas, en español e inglés. Incluye el grupo designado de 20.'
    : 'Practice the civics questions from the citizenship test (N-400) with their accepted answers, in English and Spanish. Includes the designated group of 20.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/informacion/recursos`,
      languages: {
        es: `${SITE_URL}/es/informacion/recursos`,
        en: `${SITE_URL}/en/informacion/recursos`,
        'x-default': `${SITE_URL}/es/informacion/recursos`,
      },
    },
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/informacion/recursos`,
      title,
      description,
    }),
  };
}

// RecursosClient resuelve el idioma con useLanguage, así que la página no
// necesita `params` más allá de la metadata.
export default async function RecursosPage() {
  return <RecursosClient />;
}
