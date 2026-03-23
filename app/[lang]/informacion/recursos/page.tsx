import type { Metadata } from 'next';
import RecursosClient from './RecursosClient';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = { params: Promise<{ lang: string }> };

export async function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  return {
    title: isEs ? 'Recursos: Examen de Ciudadanía N-400' : 'Resources: N-400 Citizenship Test',
    description: isEs
      ? 'Practique las 100 preguntas del examen de ciudadanía N-400 en español e inglés. Recurso gratuito del Abogado Manuel Solís.'
      : 'Practice the 100 N-400 citizenship test questions in English and Spanish. Free resource from Attorney Manuel Solis.',
    alternates: {
      canonical: `${SITE_URL}/${lang}/informacion/recursos`,
      languages: {
        es: `${SITE_URL}/es/informacion/recursos`,
        en: `${SITE_URL}/en/informacion/recursos`,
        'x-default': `${SITE_URL}/es/informacion/recursos`,
      },
    },
  };
}

export default async function RecursosPage({ params }: Props) {
  return <RecursosClient />;
}
