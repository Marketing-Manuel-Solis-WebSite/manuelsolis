import type { Metadata } from 'next';
import NosotrosClient from './NosotrosClient';

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
    ? '35+ Años Defendiendo Inmigrantes'
    : '35+ Years Defending Immigrants';
  const description = isEs
    ? 'Conozca la historia de Manuel Solís. Desde 1990 defendiendo a la comunidad inmigrante con más de 50,000 casos ganados. 15 oficinas en 5 estados.'
    : 'Learn about Manuel Solis. Since 1990 defending the immigrant community with over 50,000 cases won. 15 offices in 5 states.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/nosotros`,
      languages: {
        es: `${SITE_URL}/es/nosotros`,
        en: `${SITE_URL}/en/nosotros`,
        'x-default': `${SITE_URL}/es/nosotros`,
      },
    },
  };
}

export default async function NosotrosPage({ params }: Props) {
  return <NosotrosClient />;
}
