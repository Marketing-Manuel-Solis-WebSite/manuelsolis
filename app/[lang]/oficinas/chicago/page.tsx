import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import Script from 'next/script';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildOfficeSchema } from '../../../lib/officeSchema';

const SLUG = 'chicago';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- CONFIGURACIÓN SEO ESPECÍFICA DE LA OFICINA ---
const OFFICE_INFO = {
  name: "Manuel Solis Law Firm - Chicago",
  address: "6000 W Cermak Rd",
  city: "Cicero",
  state: "IL",
  zip: "60804",
  phone: "+1-312-477-0389",
  // Coordenadas para 6000 W Cermak Rd
  latitude: "41.8517", 
  longitude: "-87.7745",
  mapUrl: "https://share.google/IwdeP5BMwUKl3rB9G"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs 
    ? `Abogados en Chicago, IL (Cicero)`
    : `Lawyers in Chicago, IL (Cicero)`;

  const description = isEs
    ? `Oficina de Manuel Solís en Chicago (Cicero, IL). Abogados de inmigración, familia y accidentes sirviendo a la comunidad hispana.`
    : `Manuel Solis Law Office in Chicago (Cicero, IL). Immigration, family, and accident attorneys serving the community.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.manuelsolis.com/${lang}/oficinas/chicago`,
      languages: {
        'es': `https://www.manuelsolis.com/es/oficinas/chicago`,
        'en': `https://www.manuelsolis.com/en/oficinas/chicago`,
        'x-default': `https://www.manuelsolis.com/es/oficinas/chicago`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.manuelsolis.com/${lang}/oficinas/chicago`,
      images: ['/offices/Chicago.png'],
      type: 'website', 
    }
  };
}

// LegalService + Attorney schema is built centrally — see app/lib/officeSchema.ts.
export default async function ChicagoPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const schemaData = await buildOfficeSchema(
    {
      slug: SLUG,
      officeInfo: OFFICE_INFO,
      description: {
        es: 'Oficina legal en Chicago (Cicero) especializada en inmigración, familia y accidentes.',
        en: 'Law office in Chicago (Cicero) specializing in immigration, family, and accidents.',
      },
      openingHours: [
        { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
        { dayOfWeek: 'Saturday', opens: '08:00', closes: '16:00' },
      ],
    },
    localeLang,
  );
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Oficinas' : 'Offices', url: `/${lang}/oficinas` },
    { name: 'Chicago', url: `/${lang}/oficinas/chicago` },
  ]);

  return (
    <>
      <Script
        id="local-schema-chicago"
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