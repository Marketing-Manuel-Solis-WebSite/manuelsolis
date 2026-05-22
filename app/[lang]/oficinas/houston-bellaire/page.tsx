import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import Script from 'next/script';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildOfficeSchema } from '../../../lib/officeSchema';

const SLUG = 'houston-bellaire';

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
    ? `Oficina de Manuel Solís en Bellaire Blvd, Houston. Abogada Ni Yan ofrece servicios de inmigración en chino, español e inglés.`
    : `Manuel Solis Law Office on Bellaire Blvd, Houston. Attorney Ni Yan offers immigration services in Chinese, Spanish, and English.`;

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

// LegalService + Attorney schema is built centrally — see app/lib/officeSchema.ts.
// Bellaire opts into knowsLanguage with Chinese (in addition to English/Spanish).
export default async function BellairePage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const schemaData = await buildOfficeSchema(
    {
      slug: SLUG,
      officeInfo: OFFICE_INFO,
      description: {
        es: 'Oficina legal en Houston Bellaire con servicios en chino, especializada en inmigración.',
        en: 'Law office in Houston Bellaire with services in Chinese, specializing in immigration.',
      },
      openingHours: [
        { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
        { dayOfWeek: 'Saturday', opens: '08:00', closes: '16:00' },
      ],
      knowsLanguage: ['English', 'Spanish', 'Chinese'],
    },
    localeLang,
  );
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
      <OfficeClient lang={localeLang} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}