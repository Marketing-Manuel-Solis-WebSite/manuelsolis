import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import Script from 'next/script';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildOfficeSchema } from '../../../lib/officeSchema';

const SLUG = 'houston-accidentes';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- CONFIGURACIÓN SEO ESPECÍFICA DE LA OFICINA ---
const OFFICE_INFO = {
  name: "Manuel Solis Law Firm - Houston Accidentes",
  address: "6705 Navigation Blvd",
  city: "Houston",
  state: "TX",
  zip: "77011",
  phone: "+1-713-231-5384",
  latitude: "29.7426",
  longitude: "-95.3156",
  mapUrl: "https://share.google/wEP84RY0RqTOqR787"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs
    ? `Abogados de Accidentes en Houston, TX (6705 Navigation Blvd)`
    : `Accident Lawyers in Houston, TX (6705 Navigation Blvd)`;

  const description = isEs
    ? `Oficina de Manuel Solís en 6705 Navigation Blvd, Houston. Abogados de accidentes e inmigración listos para defender sus derechos. ¡Llámenos!`
    : `Manuel Solis Law Office at 6705 Navigation Blvd, Houston. Accident and immigration attorneys ready to defend your rights. Call us!`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.manuelsolis.com/${lang}/oficinas/houston-accidentes`,
      languages: {
        'es': `https://www.manuelsolis.com/es/oficinas/houston-accidentes`,
        'en': `https://www.manuelsolis.com/en/oficinas/houston-accidentes`,
        'x-default': `https://www.manuelsolis.com/es/oficinas/houston-accidentes`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.manuelsolis.com/${lang}/oficinas/houston-accidentes`,
      images: ['/offices/Houston.png'],
      type: 'website',
    }
  };
}

// LegalService + Attorney schema is built centrally — see app/lib/officeSchema.ts.
// Open 24/7 for accident emergencies.
export default async function HoustonAccidentesPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const schemaData = await buildOfficeSchema(
    {
      slug: SLUG,
      officeInfo: OFFICE_INFO,
      description: {
        es: 'Oficina legal en Houston especializada en accidentes e inmigración.',
        en: 'Law office in Houston specializing in accidents and immigration.',
      },
      openingHours: [
        { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' },
      ],
    },
    localeLang,
  );
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Oficinas' : 'Offices', url: `/${lang}/oficinas` },
    { name: 'Houston Accidentes', url: `/${lang}/oficinas/houston-accidentes` },
  ]);

  return (
    <>
      <Script
        id="local-schema-houston-accidentes"
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
