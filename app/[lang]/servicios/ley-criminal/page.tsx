import type { Metadata } from 'next';
import LeyCriminalClient from './LeyCriminalClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs
    ? 'Abogados de Defensa Criminal | Manuel Solís'
    : 'Criminal Defense Attorneys | Manuel Solis';

  const description = isEs
    ? 'Abogados expertos en defensa criminal: DUI/DWI, delitos menores y graves, y consecuencias migratorias de cargos criminales. ¡Consulta Gratis!'
    : 'Expert criminal defense lawyers: DUI/DWI, misdemeanors, felonies, and immigration consequences of criminal charges. Free Consultation!';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/servicios/ley-criminal`,
      languages: {
        'es': `${SITE_URL}/es/servicios/ley-criminal`,
        'en': `${SITE_URL}/en/servicios/ley-criminal`,
        'x-default': `${SITE_URL}/en/servicios/ley-criminal`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/servicios/ley-criminal`,
      images: ['/og-image.jpg'],
    },
  };
}

const getLegalServiceSchema = (lang: string) => ({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: lang === 'es' ? 'Manuel Solís - Defensa Criminal' : 'Manuel Solis - Criminal Defense',
  description: lang === 'es'
    ? 'Servicios legales de defensa criminal: DUI/DWI, delitos y consecuencias migratorias.'
    : 'Criminal defense legal services: DUI/DWI, felonies, and immigration consequences.',
  url: `${SITE_URL}/${lang}/servicios/ley-criminal`,
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
    'Criminal Defense',
    'DUI/DWI Defense',
    'Misdemeanor Defense',
    'Felony Defense',
    'Immigration Consequences of Criminal Charges',
  ],
  availableLanguage: ['English', 'Spanish'],
});

export default async function LeyCriminalPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getLegalServiceSchema(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Servicios' : 'Services', url: `/${lang}/#servicios` },
    { name: lang === 'es' ? 'Ley Criminal' : 'Criminal Law', url: `/${lang}/servicios/ley-criminal` },
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
      <LeyCriminalClient />
    </>
  );
}
