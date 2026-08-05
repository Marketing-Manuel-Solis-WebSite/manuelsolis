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

  // Dirección virtual (VIRTUAL_OFFICE_SLUGS): la description NO puede prometer
  // "24 horas" de atención presencial — lo que abre 24 h es la línea telefónica.
  const description = isEs
    ? `Manuel Solís en S Shore Blvd, League City: dirección que se atiende solo con cita previa; atención telefónica 24 horas. Inmigración, familia y accidentes.`
    : `Manuel Solis at S Shore Blvd, League City: a by-appointment location with 24-hour phone support. Immigration, family law, and accidents.`;

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
// League City es una de las direcciones virtuales (VIRTUAL_OFFICE_SLUGS): no se
// pasa `openingHours` porque buildOfficeSchema los descarta para estas
// direcciones, y dejarlos aquí volvería a declarar una sede atendida 24 h que no
// existe.
export default async function LeagueCityPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const schemaData = await buildOfficeSchema(
    {
      slug: SLUG,
      officeInfo: OFFICE_INFO,
      description: {
        es: 'Dirección de Manuel Solís en League City (S Shore Blvd) que se atiende solo con cita previa, sin personal del despacho en el sitio. Inmigración, familia y accidentes.',
        en: 'Manuel Solis by-appointment location in League City (S Shore Blvd), with no firm staff on site. Immigration, family law, and accident cases.',
      },
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