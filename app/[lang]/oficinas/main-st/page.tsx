import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import Script from 'next/script';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildOfficeSchema } from '../../../lib/officeSchema';

const SLUG = 'main-st';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- CONFIGURACIÓN SEO ESPECÍFICA DE LA OFICINA ---
const OFFICE_INFO = {
  name: "Manuel Solis Law Firm - Houston Main St",
  address: "708 Main st",
  city: "Houston",
  state: "TX",
  zip: "77002",
  phone: "+1-713-842-9575",
  // Coordenadas aproximadas para 708 Main St
  latitude: "29.7589", 
  longitude: "-95.3633",
  mapUrl: "https://share.google/Fc3ISgQAihcayfmws" 
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs 
    ? `Abogados en Houston, TX (Main St)`
    : `Lawyers in Houston, TX (Main St)`;

  const description = isEs
    ? `Oficina de Manuel Solís en 708 Main St, Houston. Abogados de inmigración, familia y accidentes sirviendo a la comunidad 24 horas.`
    : `Manuel Solis Law Office at 708 Main St, Houston. Immigration, family, and accident attorneys serving the community 24/7.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.manuelsolis.com/${lang}/oficinas/main-st`,
      languages: {
        'es': `https://www.manuelsolis.com/es/oficinas/main-st`,
        'en': `https://www.manuelsolis.com/en/oficinas/main-st`,
        'x-default': `https://www.manuelsolis.com/es/oficinas/main-st`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.manuelsolis.com/${lang}/oficinas/main-st`,
      images: ['/offices/main.png'],
      type: 'website', 
    }
  };
}

// LegalService + Attorney schema is built centrally — see app/lib/officeSchema.ts.
// 24/7 office.
export default async function MainStPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const schemaData = await buildOfficeSchema(
    {
      slug: SLUG,
      officeInfo: OFFICE_INFO,
      description: {
        es: 'Oficina legal en Houston Main St especializada en inmigración, familia y accidentes. Abierto 24h.',
        en: 'Law office in Houston Main St specializing in immigration, family, and accidents. Open 24h.',
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
    { name: 'Houston Main St', url: `/${lang}/oficinas/main-st` },
  ]);

  return (
    <>
      <Script
        id="local-schema-main-st"
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