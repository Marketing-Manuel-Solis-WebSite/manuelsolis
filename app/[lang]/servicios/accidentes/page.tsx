import type { Metadata } from 'next';
import AccidentesClient from './AccidentesClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs
    ? 'Abogados de Accidentes de Auto y Lesiones Personales | Manuel Solís'
    : 'Car Accident & Personal Injury Lawyers | Manuel Solis';

  const description = isEs
    ? 'Abogados expertos en accidentes de auto, camión y lesiones personales. Más de 30 años de experiencia luchando por la compensación que merece. ¡Consulta Gratis!'
    : 'Expert car accident, truck accident & personal injury attorneys. Over 30 years fighting for the compensation you deserve. Free Consultation!';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/servicios/accidentes`,
      languages: {
        'es': `${SITE_URL}/es/servicios/accidentes`,
        'en': `${SITE_URL}/en/servicios/accidentes`,
        'x-default': `${SITE_URL}/en/servicios/accidentes`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/servicios/accidentes`,
      images: ['/og-image.jpg'],
    },
  };
}

const getLegalServiceSchema = (lang: string) => ({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: lang === 'es' ? 'Manuel Solís - Abogados de Accidentes' : 'Manuel Solis - Accident Lawyers',
  description: lang === 'es'
    ? 'Servicios legales para accidentes de auto, camión y lesiones personales.'
    : 'Legal services for car accidents, truck accidents, and personal injury.',
  url: `${SITE_URL}/${lang}/servicios/accidentes`,
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
    'Personal Injury',
    'Car Accidents',
    'Truck Accidents',
    'Wrongful Death',
    'Motorcycle Accidents',
    'Pedestrian Accidents',
  ],
  availableLanguage: ['English', 'Spanish'],
});

export default async function AccidentesPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getLegalServiceSchema(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Servicios' : 'Services', url: `/${lang}/#servicios` },
    { name: lang === 'es' ? 'Accidentes' : 'Accidents', url: `/${lang}/servicios/accidentes` },
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
      <AccidentesClient />
    </>
  );
}
