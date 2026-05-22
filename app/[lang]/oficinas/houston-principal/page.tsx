import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import Script from 'next/script';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildOfficeSchema } from '../../../lib/officeSchema';

const SLUG = 'houston-principal';

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

// LegalService + Attorney schema is built centrally — see
// app/lib/officeSchema.ts. Description, openingHours, and OFFICE_INFO
// are passed in; aggregateRating + top reviews come from Google Places
// when available, omitted otherwise.
export default async function HoustonPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const schemaData = await buildOfficeSchema(
    {
      slug: SLUG,
      officeInfo: OFFICE_INFO,
      description: {
        es: 'Oficina legal principal en Houston especializada en inmigración y accidentes.',
        en: 'Main law office in Houston specializing in immigration and accidents.',
      },
      openingHours: [
        { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
        { dayOfWeek: 'Saturday', opens: '09:00', closes: '16:00' },
      ],
    },
    localeLang,
  );
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
      <OfficeClient lang={localeLang} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}