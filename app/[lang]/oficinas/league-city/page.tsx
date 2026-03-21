import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import Script from 'next/script';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- CONFIGURACIÓN SEO ESPECÍFICA DE LA OFICINA ---
const OFFICE_INFO = {
  name: "Manuel Solis Law Firm - League City",
  address: "2600 S Shore Blvd",
  city: "League City",
  state: "TX",
  zip: "77573",
  phone: "+1-832-598-3782",
  // Coordenadas aproximadas para 2600 S Shore Blvd
  latitude: "29.5393", 
  longitude: "-95.0592",
  mapUrl: "https://share.google/8T736Tycmnh4BZw5o" // URL CORRECTA DE GMB
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs 
    ? `Abogados en League City, TX (South Shore Blvd)`
    : `Lawyers in League City, TX (South Shore Blvd)`;

  const description = isEs
    ? `Oficina de Manuel Solís en League City (South Shore Blvd). Abogados de inmigración, familia y accidentes sirviendo a la comunidad 24 horas.`
    : `Manuel Solis Law Office in League City (South Shore Blvd). Immigration, family, and accident attorneys serving the community 24 hours.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.manuelsolis.com/${lang}/oficinas/league-city`,
      languages: {
        'es': `https://www.manuelsolis.com/es/oficinas/league-city`,
        'en': `https://www.manuelsolis.com/en/oficinas/league-city`,
        'x-default': `https://www.manuelsolis.com/es/oficinas/league-city`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.manuelsolis.com/${lang}/oficinas/league-city`,
      images: ['/offices/League.png'],
      type: 'website', 
    }
  };
}

// SCHEMA LOCAL BUSINESS
const getLocalBusinessSchema = (lang: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'Attorney'],
    name: 'Manuel Solis Law Firm - League City',
    description: lang === 'es' 
      ? 'Oficina legal en League City especializada en inmigración, familia y accidentes. Abierto 24h.' 
      : 'Law office in League City specializing in immigration, family, and accidents. Open 24h.',
    image: 'https://www.manuelsolis.com/logo-manuel-solis.png',
    url: `https://www.manuelsolis.com/${lang}/oficinas/league-city`,
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
    // Schema específico para 24/7
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59'
      }
    ],
    sameAs: [
      'https://www.facebook.com/AbogadoManuelSolisOficial/',
      'https://twitter.com/AbogadoMSolis',
      OFFICE_INFO.mapUrl
    ]
  };
};

export default async function LeagueCityPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getLocalBusinessSchema(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Oficinas' : 'Offices', url: `/${lang}/oficinas` },
    { name: 'League City', url: `/${lang}/oficinas/league-city` },
  ]);

  return (
    <>
      <Script
        id="local-schema-league-city"
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