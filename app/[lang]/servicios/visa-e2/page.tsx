import type { Metadata } from 'next';
import VisaE2Client from './VisaE2Client';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs
    ? 'Visa E-2 para Inversionistas | Manuel Solís'
    : 'E-2 Investor Visa | Manuel Solis';

  const description = isEs
    ? 'Abogados expertos en Visa E-2 para inversionistas. Asesoría completa para invertir y vivir en Estados Unidos legalmente.'
    : 'Expert E-2 investor visa attorneys. Complete guidance to invest and live in the United States legally.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/servicios/visa-e2`,
      languages: {
        'es': `${SITE_URL}/es/servicios/visa-e2`,
        'en': `${SITE_URL}/en/servicios/visa-e2`,
        'x-default': `${SITE_URL}/en/servicios/visa-e2`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/servicios/visa-e2`,
      images: ['/og-image.jpg'],
    },
  };
}

const getLegalServiceSchema = (lang: string) => ({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: lang === 'es' ? 'Manuel Solís - Visa E-2 Inversionistas' : 'Manuel Solis - E-2 Investor Visa',
  description: lang === 'es'
    ? 'Servicios legales para Visa E-2: asesoría para inversionistas que buscan establecerse en EE.UU.'
    : 'E-2 visa legal services: guidance for investors seeking to establish themselves in the U.S.',
  url: `${SITE_URL}/${lang}/servicios/visa-e2`,
  priceRange: '$$',
  telephone: '+1-866-979-5146',
  areaServed: [
    { '@type': 'State', name: 'Texas' },
    { '@type': 'State', name: 'California' },
    { '@type': 'State', name: 'Illinois' },
    { '@type': 'State', name: 'Colorado' },
    { '@type': 'State', name: 'Tennessee' },
  ],
  provider: {
    '@type': 'LawFirm',
    name: 'Manuel Solis Law Firm',
    url: 'https://www.manuelsolis.com',
    telephone: '+1-866-979-5146',
  },
  serviceType: [
    'E-2 Investor Visa',
    'Business Immigration',
    'Treaty Investor Visa',
    'Business Plan Preparation',
    'Visa Renewal and Extension',
  ],
  availableLanguage: ['English', 'Spanish'],
});

export default async function VisaE2Page({ params }: Props) {
  const { lang } = await params;
  const schemaData = getLegalServiceSchema(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Servicios' : 'Services', url: `/${lang}/#servicios` },
    { name: lang === 'es' ? 'Visa E-2' : 'E-2 Visa', url: `/${lang}/servicios/visa-e2` },
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
      <VisaE2Client />
    </>
  );
}
