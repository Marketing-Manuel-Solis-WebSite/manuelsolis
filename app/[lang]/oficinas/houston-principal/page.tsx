import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import Script from 'next/script';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- CONFIGURACIÓN SEO ESPECÍFICA DE LA OFICINA ---
const OFFICE_INFO = {
  name: "Manuel Solis Law Firm - Houston Principal",
  address: "6657 Navigation Blvd",
  city: "Houston",
  state: "TX",
  zip: "77011",
  phone: "+1-713-701-1731",
  latitude: "29.7426", 
  longitude: "-95.3156",
  mapUrl: "https://share.google/ZErZNzC4y9PtCrEJm" // URL GMB Actualizada
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs 
    ? `Abogados en Houston, TX (Navigation Blvd)`
    : `Lawyers in Houston, TX (Navigation Blvd)`;

  const description = isEs
    ? `Oficina principal de Manuel Solís en Houston (Navigation Blvd). Abogados de inmigración y accidentes sirviendo a la comunidad hispana desde hace 30 años.`
    : `Manuel Solis Main Office in Houston (Navigation Blvd). Immigration and accident attorneys serving the community for over 30 years.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.manuelsolis.com/${lang}/oficinas/houston-principal`,
      languages: {
        'es': `https://www.manuelsolis.com/es/oficinas/houston-principal`,
        'en': `https://www.manuelsolis.com/en/oficinas/houston-principal`,
        'x-default': `https://www.manuelsolis.com/es/oficinas/houston-principal`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.manuelsolis.com/${lang}/oficinas/houston-principal`,
      images: ['/offices/Houston.png'],
      type: 'website', // CORREGIDO: 'business.business' -> 'website' para evitar error TS
    }
  };
}

// SCHEMA LOCAL BUSINESS
const getLocalBusinessSchema = (lang: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'Attorney'],
    name: 'Manuel Solis Law Firm',
    description: lang === 'es' 
      ? 'Oficina legal principal en Houston especializada en inmigración y accidentes.' 
      : 'Main law office in Houston specializing in immigration and accidents.',
    image: 'https://www.manuelsolis.com/logo-manuel-solis.png',
    url: `https://www.manuelsolis.com/${lang}/oficinas/houston-principal`,
    telephone: OFFICE_INFO.phone,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: OFFICE_INFO.address,
      addressLocality: OFFICE_INFO.city,
      addressRegion: OFFICE_INFO.state,
      postalCode: OFFICE_INFO.zip,
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: OFFICE_INFO.latitude,
      longitude: OFFICE_INFO.longitude
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '16:00'
      }
    ],
    sameAs: [
      'https://www.facebook.com/AbogadoManuelSolisOficial/',
      'https://twitter.com/AbogadoMSolis',
      OFFICE_INFO.mapUrl
    ]
  };
};

export default async function HoustonPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getLocalBusinessSchema(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Oficinas' : 'Offices', url: `/${lang}/oficinas` },
    { name: 'Houston Principal', url: `/${lang}/oficinas/houston-principal` },
  ]);

  return (
    <>
      <Script
        id="local-schema-houston"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <OfficeClient />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}