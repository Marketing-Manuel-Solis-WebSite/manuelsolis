import BreadcrumbSchema from '../../../components/BreadcrumbSchema';
import type { Metadata } from 'next';
import FAQClient from './FAQClient';
import { buildSocialMetadata } from '../../../lib/seoMetadata';

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
    ? 'Preguntas Frecuentes de Inmigración'
    : 'Immigration Frequently Asked Questions';
  const description = isEs
    ? 'Respuestas a las preguntas más comunes sobre inmigración, Visa U, VAWA, asilo, deportación y más. Información legal gratuita del Abogado Manuel Solís.'
    : 'Answers to the most common questions about immigration, U Visa, VAWA, asylum, deportation and more. Free legal information from Attorney Manuel Solis.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/informacion/faq`,
      languages: {
        es: `${SITE_URL}/es/informacion/faq`,
        en: `${SITE_URL}/en/informacion/faq`,
        'x-default': `${SITE_URL}/es/informacion/faq`,
      },
    },
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/informacion/faq`,
      title,
      description,
    }),
  };
}

export default async function FAQPage({ params }: Props) {
  const { lang } = await params;
  return (
    <>
      {/* Sin nivel "/informacion": esa carpeta no tiene page.tsx y responde 404. */}
      <BreadcrumbSchema
        lang={lang === 'en' ? 'en' : 'es'}
        trail={[{ es: 'Preguntas Frecuentes', en: 'Frequently Asked Questions', path: '/informacion/faq' }]}
      />
      <FAQClient />
    </>
  );
}
