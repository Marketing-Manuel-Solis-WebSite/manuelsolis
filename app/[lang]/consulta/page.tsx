import type { Metadata } from 'next';
import ConsultaClient from './ConsultaClient';

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
    ? 'Consulta Confidencial — Manuel Solis Law Firm'
    : 'Confidential Consultation — Manuel Solis Law Firm';
  const description = isEs
    ? 'Solicita tu consulta confidencial con un abogado de Manuel Solis Law Firm. Respuesta en menos de 24 horas. Más de 35 años de experiencia.'
    : 'Request your confidential consultation with a Manuel Solis Law Firm attorney. Response within 24 hours. Over 35 years of experience.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/consulta`,
      languages: {
        es: `${SITE_URL}/es/consulta`,
        en: `${SITE_URL}/en/consulta`,
        'x-default': `${SITE_URL}/es/consulta`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/consulta`,
      type: 'website',
      siteName: 'Manuel Solis Law Firm',
      locale: isEs ? 'es_US' : 'en_US',
      images: ['/home-image.jpg'],
    },
  };
}

export default async function ConsultaPage() {
  return <ConsultaClient />;
}
