import type { Metadata } from 'next';
import VisaUClient from './VisaUClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs
    ? 'Visa U: Protección para Víctimas de Crímenes'
    : 'U Visa: Protection for Crime Victims';

  const description = isEs
    ? 'Abogados especialistas en Visa U con 35+ años de experiencia. Ayudamos a víctimas de crímenes a obtener estatus legal, permiso de trabajo y residencia.'
    : 'Specialist U Visa attorneys with 35+ years of experience. We help crime victims obtain legal status, work permits, and residency.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/servicios/visa-u`,
      languages: {
        'es': `${SITE_URL}/es/servicios/visa-u`,
        'en': `${SITE_URL}/en/servicios/visa-u`,
        'x-default': `${SITE_URL}/es/servicios/visa-u`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/servicios/visa-u`,
      images: ['/home-image.jpg'],
    },
  };
}

const getLegalServiceSchema = (lang: string) => ({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: lang === 'es' ? 'Manuel Solís - Abogados de Visa U' : 'Manuel Solis - U Visa Lawyers',
  description: lang === 'es'
    ? 'Abogados especialistas en Visa U para víctimas de crímenes en Estados Unidos.'
    : 'Specialist U Visa attorneys for crime victims in the United States.',
  url: `${SITE_URL}/${lang}/servicios/visa-u`,
  priceRange: '$$',
  telephone: '+1-832-598-0914',
  areaServed: [
    { '@type': 'State', name: 'Texas' },
    { '@type': 'State', name: 'California' },
    { '@type': 'State', name: 'Illinois' },
    { '@type': 'State', name: 'Colorado' },
    { '@type': 'State', name: 'Tennessee' },
  ],
  provider: {
    '@type': 'LawFirm',
    '@id': `${SITE_URL}/#organization`,
    name: 'Manuel Solis Law Firm',
    url: SITE_URL,
    telephone: '+1-832-598-0914',
  },
  serviceType: [
    'U Visa',
    'U Nonimmigrant Status',
    'Bona Fide Determination',
    'Form I-918',
    'Crime Victim Immigration Relief',
    'I-192 Waiver for U Visa',
  ],
  availableLanguage: ['English', 'Spanish'],
});

export default async function VisaUPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getLegalServiceSchema(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Servicios' : 'Services', url: `/${lang}/servicios` },
    { name: lang === 'es' ? 'Inmigración' : 'Immigration', url: `/${lang}/servicios/inmigracion` },
    { name: 'Visa U', url: `/${lang}/servicios/visa-u` },
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
      <VisaUClient lang={lang === 'en' ? 'en' : 'es'} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
