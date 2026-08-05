import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildOfficeSchema } from '../../../lib/officeSchema';
import { buildSocialMetadata } from '../../../lib/seoMetadata';

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

  // Dirección virtual (VIRTUAL_OFFICE_SLUGS): la description NO puede prometer
  // "24 horas" de atención presencial — lo que abre 24 h es la línea telefónica.
  const description = isEs
    ? `Manuel Solís en 16510 Northchase Dr, Houston: dirección que se atiende solo con cita previa; atención telefónica 24 horas. Inmigración, criminal y familia.`
    : `Manuel Solis at 16510 Northchase Dr, Houston: a by-appointment location with 24-hour phone support. Immigration, criminal, and family law.`;

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
    // Dimensiones = las del PNG real en public/offices (no el 1200x630 nominal).
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/oficinas/northchase`,
      title,
      description,
      images: [{ url: '/offices/ofNorth.png', width: 1189, height: 685 }],
    }),
  };
}

// LegalService + Attorney schema is built centrally — see app/lib/officeSchema.ts.
// Northchase es una de las direcciones virtuales (VIRTUAL_OFFICE_SLUGS): no se
// pasa `openingHours` porque buildOfficeSchema los descarta para estas
// direcciones, y dejarlos aquí volvería a declarar una sede atendida 24 h que no
// existe.
export default async function NorthchasePage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const schemaData = await buildOfficeSchema(
    {
      slug: SLUG,
      officeInfo: OFFICE_INFO,
      description: {
        es: 'Dirección de Manuel Solís en Houston (16510 Northchase Dr) que se atiende solo con cita previa, sin personal del despacho en el sitio. Inmigración, criminal y familia.',
        en: 'Manuel Solis by-appointment location in Houston (16510 Northchase Dr), with no firm staff on site. Immigration, criminal, and family law cases.',
      },
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
      <script
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