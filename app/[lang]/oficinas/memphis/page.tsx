import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import Script from 'next/script';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildOfficeSchema } from '../../../lib/officeSchema';

const SLUG = 'memphis';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- CONFIGURACIÓN SEO ESPECÍFICA DE LA OFICINA ---
const OFFICE_INFO = {
  name: "Manuel Solis Law Firm - Memphis",
  address: "3385 Airways Blvd, STE 320",
  city: "Memphis",
  state: "TN",
  zip: "38116",
  phone: "+1-901-557-8357",
  // Coordenadas aproximadas para 3385 Airways Blvd
  latitude: "35.0673", 
  longitude: "-89.9928",
  mapUrl: "https://share.google/Fc3ISgQAihcayfmws" // URL CORRECTA DE GMB
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs 
    ? `Abogados en Memphis, TN`
    : `Lawyers in Memphis, TN`;

  const description = isEs
    ? `Oficina de Manuel Solís en Memphis. Abogados de inmigración, multas y criminal. Abogada Lupita Martínez lista para ayudarle.`
    : `Manuel Solis Law Office in Memphis. Immigration, ticket, and criminal defense attorneys. Attorney Lupita Martinez ready to help you.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.manuelsolis.com/${lang}/oficinas/memphis`,
      languages: {
        'es': `https://www.manuelsolis.com/es/oficinas/memphis`,
        'en': `https://www.manuelsolis.com/en/oficinas/memphis`,
        'x-default': `https://www.manuelsolis.com/es/oficinas/memphis`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.manuelsolis.com/${lang}/oficinas/memphis`,
      images: ['/offices/ofAirways.png'],
      type: 'website', 
    }
  };
}

// LegalService + Attorney schema is built centrally — see app/lib/officeSchema.ts.
export default async function MemphisPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const schemaData = await buildOfficeSchema(
    {
      slug: SLUG,
      officeInfo: OFFICE_INFO,
      description: {
        es: 'Oficina legal en Memphis especializada en inmigración y ley civil.',
        en: 'Law office in Memphis specializing in immigration and civil law.',
      },
      openingHours: [
        { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' },
        { dayOfWeek: 'Saturday', opens: '09:00', closes: '13:00' },
      ],
    },
    localeLang,
  );
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Oficinas' : 'Offices', url: `/${lang}/oficinas` },
    { name: 'Memphis', url: `/${lang}/oficinas/memphis` },
  ]);

  return (
    <>
      <Script
        id="local-schema-memphis"
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