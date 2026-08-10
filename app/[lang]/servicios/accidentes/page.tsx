import type { Metadata } from 'next';
import AccidentesClient from './AccidentesClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildSocialMetadata } from '../../../lib/seoMetadata';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs
    ? 'Abogados de Accidentes y Lesiones Personales'
    : 'Accident & Personal Injury Lawyers';

  const description = isEs
    ? 'Abogados expertos en accidentes de auto, camión y lesiones personales. Más de 30 años de experiencia luchando por la compensación que merece.'
    : 'Expert car accident, truck accident & personal injury attorneys. Over 30 years fighting for the compensation you deserve.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/servicios/accidentes`,
      languages: {
        'es': `${SITE_URL}/es/servicios/accidentes`,
        'en': `${SITE_URL}/en/servicios/accidentes`,
        'x-default': `${SITE_URL}/es/servicios/accidentes`,
      },
    },
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/servicios/accidentes`,
      title,
      description,
      images: [
        {
          url: '/accident-hero.png',
          alt: isEs ? 'Abogados de accidentes Manuel Solís' : 'Manuel Solis accident lawyers',
        },
      ],
    }),
  };
}

// Service (no LegalService): la ficha LocalBusiness con dirección vive en
// /oficinas/<slug>; aquí solo la entidad temática ligada a #organization.
const getServiceSchema = (lang: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/${lang}/servicios/accidentes#service`,
  name: lang === 'es' ? 'Manuel Solís - Abogados de Accidentes' : 'Manuel Solis - Accident Lawyers',
  description: lang === 'es'
    ? 'Servicios legales para accidentes de auto, camión y lesiones personales.'
    : 'Legal services for car accidents, truck accidents, and personal injury.',
  url: `${SITE_URL}/${lang}/servicios/accidentes`,
  areaServed: [
    { '@type': 'State', name: 'Texas' },
    { '@type': 'State', name: 'California' },
    { '@type': 'State', name: 'Illinois' },
    { '@type': 'State', name: 'Colorado' },
    { '@type': 'State', name: 'Tennessee' },
  ],
  provider: { '@id': `${SITE_URL}/#organization` },
  serviceType: [
    'Personal Injury',
    'Car Accidents',
    'Truck Accidents',
    'Wrongful Death',
    'Motorcycle Accidents',
    'Pedestrian Accidents',
  ],
  availableChannel: {
    '@type': 'ServiceChannel',
    // Debe coincidir con el número que la página marca de verdad (CTA tel: de AccidentesClient).
    servicePhone: { '@type': 'ContactPoint', telephone: '+1-866-420-0405' },
    availableLanguage: ['English', 'Spanish'],
  },
});

export default async function AccidentesPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getServiceSchema(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Servicios' : 'Services', url: `/${lang}/servicios` },
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
      <AccidentesClient lang={lang === 'en' ? 'en' : 'es'} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
