import type { Metadata } from 'next';
import TestimoniosClient from './TestimoniosClient';

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

  const title = isEs ? 'Testimonios de Clientes' : 'Client Testimonials';
  const description = isEs
    ? 'Historias reales de clientes que confiaron en Manuel Solís. Más de 50,000 casos ganados.'
    : 'Real stories from clients who trusted Manuel Solis. Over 50,000 cases won.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/Testimonios`,
      languages: {
        es: `${SITE_URL}/es/Testimonios`,
        en: `${SITE_URL}/en/Testimonios`,
        'x-default': `${SITE_URL}/es/Testimonios`,
      },
    },
  };
}

export default async function TestimoniosPage({ params }: Props) {
  return <TestimoniosClient />;
}
