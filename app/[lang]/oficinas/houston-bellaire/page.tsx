import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import Script from 'next/script';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- CONFIGURACIÓN SEO ESPECÍFICA DE LA OFICINA ---
const OFFICE_INFO = {
  name: "Manuel Solis Law Firm - Houston Bellaire",
  address: "9188 Bellaire Blvd, STE E",
  city: "Houston",
  state: "TX",
  zip: "77036",
  phone: "+1-832-598-0914",
  // Coordenadas para 9188 Bellaire Blvd
  latitude: "29.7051", 
  longitude: "-95.5459",
  mapUrl: "https://share.google/QsSM7vMPmZpPNFPRM" // URL CORRECTA DE GMB
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs 
    ? `Abogados en Houston Bellaire, TX (Servicio en Chino)`
    : `Lawyers in Houston Bellaire, TX (Chinese Service)`;

  const description = isEs
    ? `Oficina de Manuel Solís en Bellaire Blvd, Houston. Abogada Ni Yan ofrece servicios de inmigración en chino, español e inglés. ¡Consulta Gratis!`
    : `Manuel Solis Law Office on Bellaire Blvd, Houston. Attorney Ni Yan offers immigration services in Chinese, Spanish, and English. Free Consultation!`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.manuelsolis.com/${lang}/oficinas/houston-bellaire`,
      languages: {
        'es': `https://www.manuelsolis.com/es/oficinas/houston-bellaire`,
        'en': `https://www.manuelsolis.com/en/oficinas/houston-bellaire`,
        'x-default': `https://www.manuelsolis.com/es/oficinas/houston-bellaire`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.manuelsolis.com/${lang}/oficinas/houston-bellaire`,
      images: ['/offices/Houston.png'],
      type: 'website', 
    }
  };
}

// SCHEMA LOCAL BUSINESS
const getLocalBusinessSchema = (lang: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'Attorney'],
    name: 'Manuel Solis Law Firm - Bellaire',
    description: lang === 'es' 
      ? 'Oficina legal en Houston Bellaire con servicios en chino, especializada en inmigración.' 
      : 'Law office in Houston Bellaire with services in Chinese, specializing in immigration.',
    image: 'https://www.manuelsolis.com/logo-manuel-solis.png',
    url: `https://www.manuelsolis.com/${lang}/oficinas/houston-bellaire`,
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
        opens: '08:00',
        closes: '16:00'
      }
    ],
    // Idiomas disponibles (añadimos chino)
    knowsLanguage: ['English', 'Spanish', 'Chinese'],
    sameAs: [
      'https://www.facebook.com/AbogadoManuelSolisOficial/',
      'https://twitter.com/AbogadoMSolis',
      OFFICE_INFO.mapUrl
    ]
  };
};

export default async function BellairePage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getLocalBusinessSchema(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Oficinas' : 'Offices', url: `/${lang}/oficinas` },
    { name: 'Houston Bellaire', url: `/${lang}/oficinas/houston-bellaire` },
  ]);

  return (
    <>
      <Script
        id="local-schema-bellaire"
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