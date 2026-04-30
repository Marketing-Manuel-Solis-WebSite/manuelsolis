import type { Metadata } from 'next';
import InversionistasClient from './InversionistasClient';
import { generateBreadcrumbSchema } from '../../lib/breadcrumbSchema';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs
    ? 'Visa E-2 para Inversionistas: Requisitos, Proceso y Evaluación'
    : 'E-2 Investor Visa: Requirements, Process & Evaluation';

  const description = isEs
    ? 'Invierta y viva legalmente en EE.UU. con la Visa E-2. Abogados con mas de 35 anos de experiencia en visas de inversion.'
    : 'Invest and live legally in the U.S. with the E-2 Visa. Attorneys with 35+ years of experience in investment visas.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/inversionistas`,
      languages: {
        es: `${SITE_URL}/es/inversionistas`,
        en: `${SITE_URL}/en/inversionistas`,
        'x-default': `${SITE_URL}/es/inversionistas`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/inversionistas`,
      images: ['/home-image.jpg'],
    },
  };
}

const getLegalServiceSchema = (lang: string) => ({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name:
    lang === 'es'
      ? 'Manuel Solis - Visa E-2 para Inversionistas'
      : 'Manuel Solis - E-2 Investor Visa',
  description:
    lang === 'es'
      ? 'Servicios legales especializados en Visa E-2 para inversionistas que buscan establecerse en EE.UU.'
      : 'Specialized E-2 visa legal services for investors seeking to establish themselves in the U.S.',
  url: `${SITE_URL}/${lang}/inversionistas`,
  priceRange: '$$',
  telephone: '+1-832-598-0914',
  areaServed: { '@type': 'Country', name: 'US' },
  serviceType: ['E-2 Visa', 'Investor Visa', 'Business Immigration'],
  provider: {
    '@type': 'LawFirm',
    name: 'Manuel Solis Law Firm',
    url: SITE_URL,
    logo: `${SITE_URL}/logo-manuel-solis.png`,
  },
});

export default async function InversionistasPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getLegalServiceSchema(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    {
      name: lang === 'es' ? 'Inversionistas' : 'Investors',
      url: `/${lang}/inversionistas`,
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <InversionistasClient />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
