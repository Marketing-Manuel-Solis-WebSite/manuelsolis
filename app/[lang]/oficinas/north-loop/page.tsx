import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import Script from 'next/script';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildOfficeSchema } from '../../../lib/officeSchema';

const SLUG = 'north-loop';

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

// LegalService + Attorney schema is built centrally — see app/lib/officeSchema.ts.
// 24/7 office.
export default async function NorthLoopPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const schemaData = await buildOfficeSchema(
    {
      slug: SLUG,
      officeInfo: OFFICE_INFO,
      description: {
        es: 'Oficina legal en Houston North Loop especializada en inmigración, criminal y familia. Abierto 24h.',
        en: 'Law office in Houston North Loop specializing in immigration, criminal, and family law. Open 24h.',
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
      <OfficeClient lang={localeLang} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}