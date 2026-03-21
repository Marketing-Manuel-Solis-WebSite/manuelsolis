import type { Metadata } from 'next';
import JoinInClient from './JoinInClient';

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

  const title = isEs ? 'Trabaja con Nosotros' : 'Join Our Team';
  const description = isEs
    ? 'Únete al equipo legal de Manuel Solís. Oportunidades de carrera en inmigración, accidentes y más.'
    : 'Join the Manuel Solis legal team. Career opportunities in immigration, accidents and more.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/join-in`,
      languages: {
        es: `${SITE_URL}/es/join-in`,
        en: `${SITE_URL}/en/join-in`,
        'x-default': `${SITE_URL}/es/join-in`,
      },
    },
  };
}

export default async function JoinInPage({ params }: Props) {
  return <JoinInClient />;
}
