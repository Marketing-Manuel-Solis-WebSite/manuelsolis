import type { Metadata } from 'next';
import FamiliaClient from './FamiliaClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs
    ? 'Abogados de Derecho Familiar e Inmigración'
    : 'Family Law & Immigration Attorneys';

  const description = isEs
    ? 'Abogados expertos en derecho familiar: peticiones familiares, reunificación, custodia y más. Más de 30 años protegiendo a las familias inmigrantes.'
    : 'Expert family law attorneys: family petitions, reunification, custody and more. Over 30 years protecting immigrant families.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/servicios/familia`,
      languages: {
        'es': `${SITE_URL}/es/servicios/familia`,
        'en': `${SITE_URL}/en/servicios/familia`,
        'x-default': `${SITE_URL}/es/servicios/familia`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/servicios/familia`,
      images: ['/home-image.jpg'],
    },
  };
}

const getLegalServiceSchema = (lang: string) => ({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: lang === 'es' ? 'Manuel Solís - Derecho Familiar' : 'Manuel Solis - Family Law',
  description: lang === 'es'
    ? 'Servicios legales de derecho familiar: peticiones familiares, reunificación y custodia.'
    : 'Family law legal services: family petitions, reunification, and custody.',
  url: `${SITE_URL}/${lang}/servicios/familia`,
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
    'Family Law',
    'Family Petitions',
    'Reunification',
    'Custody',
    'VAWA Self-Petition',
    'Immigrant Family Protection',
  ],
  availableLanguage: ['English', 'Spanish'],
});

export default async function FamiliaPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getLegalServiceSchema(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Servicios' : 'Services', url: `/${lang}/servicios` },
    { name: lang === 'es' ? 'Familia' : 'Family', url: `/${lang}/servicios/familia` },
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
      <FamiliaClient />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
