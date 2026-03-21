import type { Metadata } from 'next';
import PrivacidadClient from './PrivacidadClient';

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

  const title = isEs ? 'Política de Privacidad' : 'Privacy Policy';
  const description = isEs
    ? 'Política de privacidad de las Oficinas Legales de Manuel Solís.'
    : 'Privacy policy of the Law Offices of Manuel Solis.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/privacidad`,
      languages: {
        es: `${SITE_URL}/es/privacidad`,
        en: `${SITE_URL}/en/privacidad`,
        'x-default': `${SITE_URL}/es/privacidad`,
      },
    },
  };
}

export default async function PrivacidadPage({ params }: Props) {
  return <PrivacidadClient />;
}
