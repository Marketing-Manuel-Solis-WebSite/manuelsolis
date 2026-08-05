import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildOfficeSchema } from '../../../lib/officeSchema';
import { buildSocialMetadata } from '../../../lib/seoMetadata';

const SLUG = 'kirby';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- CONFIGURACIÓN SEO ESPECÍFICA DE LA OFICINA ---
const OFFICE_INFO = {
  name: "Manuel Solis Law Firm - Houston Kirby",
  address: "3730 Kirby Dr Suite 1200",
  city: "Houston",
  state: "TX",
  zip: "77098",
  phone: "+1-713-903-7875",
  // Coordenadas aproximadas para 3730 Kirby Dr
  latitude: "29.7346", 
  longitude: "-95.4190",
  mapUrl: "https://share.google/R85nYwhTFqoxLctD4" // URL CORRECTA DE GMB
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs 
    ? `Abogados en Houston, TX (Kirby Dr)`
    : `Lawyers in Houston, TX (Kirby Dr)`;

  const description = isEs
    ? `Oficina de Manuel Solís en 3730 Kirby Dr, Houston. Abogados de inmigración, familia y accidentes sirviendo a la comunidad las 24 horas.`
    : `Manuel Solis Law Office at 3730 Kirby Dr, Houston. Immigration, family, and accident attorneys serving the community 24/7.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.manuelsolis.com/${lang}/oficinas/kirby`,
      languages: {
        'es': `https://www.manuelsolis.com/es/oficinas/kirby`,
        'en': `https://www.manuelsolis.com/en/oficinas/kirby`,
        'x-default': `https://www.manuelsolis.com/es/oficinas/kirby`,
      },
    },
    // Dimensiones = las del PNG real en public/offices (no el 1200x630 nominal).
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/oficinas/kirby`,
      title,
      description,
      images: [{ url: '/offices/ofhouston.png', width: 1045, height: 663 }],
    }),
  };
}

// LegalService + Attorney schema is built centrally — see app/lib/officeSchema.ts.
// Kirby is a 24/7 office.
export default async function KirbyPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const schemaData = await buildOfficeSchema(
    {
      slug: SLUG,
      officeInfo: OFFICE_INFO,
      description: {
        es: 'Oficina legal en Houston Kirby especializada en inmigración, familia y accidentes. Abierto 24h.',
        en: 'Law office in Houston Kirby specializing in immigration, family, and accidents. Open 24h.',
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
    { name: 'Houston Kirby', url: `/${lang}/oficinas/kirby` },
  ]);

  return (
    <>
      <script
        id="local-schema-kirby"
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