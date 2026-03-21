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

  const title = isEs ? 'Sobre Nosotros' : 'About Us';
  const description = isEs
    ? 'Conozca la historia y misión de las Oficinas Legales de Manuel Solís. 35+ años defendiendo los derechos de inmigrantes.'
    : 'Learn about the history and mission of the Law Offices of Manuel Solis. 35+ years defending immigrant rights.';

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
