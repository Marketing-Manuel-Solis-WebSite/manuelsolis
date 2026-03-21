import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import Script from 'next/script';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- CONFIGURACIÓN SEO ESPECÍFICA DE LA OFICINA ---
const OFFICE_INFO = {
  name: "Manuel Solis Law Firm - Houston North Loop",
  address: "2950 North Loop W",
  city: "Houston",
  state: "TX",
  zip: "77092",
  phone: "+1-713-429-0237",
  // Coordenadas para 2950 North Loop W
  latitude: "29.8055", 
  longitude: "-95.4527",
  mapUrl: "https://share.google/aKTPwIvhMmw7JfRcY" // URL CORRECTA DE GMB
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs 
    ? `Abogados en Houston, TX (North Loop)`
    : `Lawyers in Houston, TX (North Loop)`;

  const description = isEs
    ? `Oficina de Manuel Solís en North Loop W, Houston. Abogados de inmigración, criminal y familia sirviendo a la comunidad 24 horas.`
    : `Manuel Solis Law Office at North Loop W, Houston. Immigration, criminal, and family attorneys serving the community 24/7.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.manuelsolis.com/${lang}/oficinas/north-loop`,
      languages: {
        'es': `https://www.manuelsolis.com/es/oficinas/north-loop`,
        'en': `https://www.manuelsolis.com/en/oficinas/north-loop`,
        'x-default': `https://www.manuelsolis.com/es/oficinas/north-loop`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.manuelsolis.com/${lang}/oficinas/north-loop`,
      images: ['/offices/ofLoop.png'],
      type: 'website', 
    }
  };
}

// SCHEMA LOCAL BUSINESS
const getLocalBusinessSchema = (lang: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'Attorney'],
    name: 'Manuel Solis Law Firm - North Loop',
    description: lang === 'es' 
      ? 'Oficina legal en Houston North Loop especializada en inmigración, criminal y familia. Abierto 24h.' 
      : 'Law office in Houston North Loop specializing in immigration, criminal, and family law. Open 24h.',
    image: 'https://www.manuelsolis.com/logo-manuel-solis.png',
    url: `https://www.manuelsolis.com/${lang}/oficinas/north-loop`,
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

export default async function NorthLoopPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getLocalBusinessSchema(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Oficinas' : 'Offices', url: `/${lang}/oficinas` },
    { name: 'Houston North Loop', url: `/${lang}/oficinas/north-loop` },
  ]);

  return (
    <>
      <Script
        id="local-schema-north-loop"
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