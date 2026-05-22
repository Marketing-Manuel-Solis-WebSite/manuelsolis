import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import Script from 'next/script';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildOfficeSchema } from '../../../lib/officeSchema';

const SLUG = 'northchase';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- CONFIGURACIÓN SEO ESPECÍFICA DE LA OFICINA ---
const OFFICE_INFO = {
  name: "Manuel Solis Law Firm - Houston Northchase",
  address: "16510 Northchase Dr",
  city: "Houston",
  state: "TX",
  zip: "77060",
  phone: "+1-346-522-4848",
  // Coordenadas para 16510 Northchase Dr
  latitude: "29.9482", 
  longitude: "-95.4093",
  mapUrl: "https://share.google/wSptYM5hcuGigC3aS" // URL CORRECTA DE GMB
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs 
    ? `Abogados en Houston, TX (Northchase Dr)`
    : `Lawyers in Houston, TX (Northchase Dr)`;

  const description = isEs
    ? `Oficina de Manuel Solís en Northchase Dr, Houston. Abogados de inmigración, criminal y familia sirviendo a la comunidad 24 horas.`
    : `Manuel Solis Law Office at Northchase Dr, Houston. Immigration, criminal, and family attorneys serving the community 24/7.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.manuelsolis.com/${lang}/oficinas/northchase`,
      languages: {
        'es': `https://www.manuelsolis.com/es/oficinas/northchase`,
        'en': `https://www.manuelsolis.com/en/oficinas/northchase`,
        'x-default': `https://www.manuelsolis.com/es/oficinas/northchase`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.manuelsolis.com/${lang}/oficinas/northchase`,
      images: ['/offices/ofNorth.png'],
      type: 'website', 
    }
  };
}

// LegalService + Attorney schema is built centrally — see app/lib/officeSchema.ts.
// 24/7 office.
export default async function NorthchasePage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const schemaData = await buildOfficeSchema(
    {
      slug: SLUG,
      officeInfo: OFFICE_INFO,
      description: {
        es: 'Oficina legal en Houston Northchase especializada en inmigración, criminal y familia. Abierto 24h.',
        en: 'Law office in Houston Northchase specializing in immigration, criminal, and family law. Open 24h.',
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
    { name: 'Houston Northchase', url: `/${lang}/oficinas/northchase` },
  ]);

  return (
    <>
      <Script
        id="local-schema-northchase"
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