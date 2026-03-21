import type { Metadata } from 'next';
import AbogadosClient from './AbogadosClient';

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

  const title = isEs ? 'Nuestro Equipo de Abogados' : 'Our Team of Attorneys';
  const description = isEs
    ? 'Conozca a los abogados de Manuel Solís. Más de 35 años de experiencia en inmigración, accidentes y defensa criminal.'
    : 'Meet the attorneys at Manuel Solis. Over 35 years of experience in immigration, accidents and criminal defense.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/abogados`,
      languages: {
        es: `${SITE_URL}/es/abogados`,
        en: `${SITE_URL}/en/abogados`,
        'x-default': `${SITE_URL}/es/abogados`,
      },
    },
  };
}

export default async function AbogadosPage({ params }: Props) {
  return <AbogadosClient />;
}
