import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildOfficeSchema } from '../../../lib/officeSchema';
import { buildSocialMetadata } from '../../../lib/seoMetadata';

const SLUG = 'league-city';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- CONFIGURACIÓN SEO ESPECÍFICA DE LA OFICINA ---
const OFFICE_INFO = {
  name: "Manuel Solis Law Firm - League City",
  address: "2600 S Shore Blvd",
  city: "League City",
  state: "TX",
  zip: "77573",
  phone: "+1-832-598-3782",
  // Coordenadas aproximadas para 2600 S Shore Blvd
  latitude: "29.5393", 
  longitude: "-95.0592",
  mapUrl: "https://share.google/8T736Tycmnh4BZw5o" // URL CORRECTA DE GMB
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  // "S Shore Blvd" es como aparece la calle en el NAP canónico
  // (officesPhoneMap.OFFICES_NAP); escrita entera el title llegaba a 61.
  const title = isEs
    ? `Abogados en League City, TX (S Shore Blvd)`
    : `Lawyers in League City, TX (S Shore Blvd)`;

  const description = isEs
    ? `Oficina de Manuel Solís en League City (S Shore Blvd). Abogados de inmigración, familia y accidentes sirviendo a la comunidad 24 horas.`
    : `Manuel Solis Law Office in League City (S Shore Blvd). Immigration, family, and accident attorneys serving the community 24 hours.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.manuelsolis.com/${lang}/oficinas/league-city`,
      languages: {
        'es': `https://www.manuelsolis.com/es/oficinas/league-city`,
        'en': `https://www.manuelsolis.com/en/oficinas/league-city`,
        'x-default': `https://www.manuelsolis.com/es/oficinas/league-city`,
      },
    },
    // Dimensiones = las del PNG real en public/offices (no el 1200x630 nominal).
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/oficinas/league-city`,
      title,
      description,
      images: [{ url: '/offices/League.png', width: 1000, height: 1000 }],
    }),
  };
}

// LegalService + Attorney schema is built centrally — see app/lib/officeSchema.ts.
// 24/7 office.
export default async function LeagueCityPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const schemaData = await buildOfficeSchema(
    {
      slug: SLUG,
      officeInfo: OFFICE_INFO,
      description: {
        es: 'Oficina legal en League City especializada en inmigración, familia y accidentes. Abierto 24h.',
        en: 'Law office in League City specializing in immigration, family, and accidents. Open 24h.',
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
    { name: 'League City', url: `/${lang}/oficinas/league-city` },
  ]);

  return (
    <>
      <script
        id="local-schema-league-city"
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