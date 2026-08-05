import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildOfficeSchema } from '../../../lib/officeSchema';
import { buildSocialMetadata } from '../../../lib/seoMetadata';

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

  // Dirección virtual (VIRTUAL_OFFICE_SLUGS): la description NO puede prometer
  // "24 horas" de atención presencial — lo que abre 24 h es la línea telefónica.
  const description = isEs
    ? `Manuel Solís en 2950 North Loop W, Houston: dirección que se atiende solo con cita previa; atención telefónica 24 horas. Inmigración, criminal y familia.`
    : `Manuel Solis at 2950 North Loop W, Houston: a by-appointment location with 24-hour phone support. Immigration, criminal, and family law.`;

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
    // Dimensiones = las del PNG real en public/offices (no el 1200x630 nominal).
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/oficinas/north-loop`,
      title,
      description,
      images: [{ url: '/offices/ofLoop.png', width: 1063, height: 601 }],
    }),
  };
}

// LegalService + Attorney schema is built centrally — see app/lib/officeSchema.ts.
// North Loop es una de las direcciones virtuales (VIRTUAL_OFFICE_SLUGS): no se
// pasa `openingHours` porque buildOfficeSchema los descarta para estas
// direcciones, y dejarlos aquí volvería a declarar una sede atendida 24 h que no
// existe.
export default async function NorthLoopPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const schemaData = await buildOfficeSchema(
    {
      slug: SLUG,
      officeInfo: OFFICE_INFO,
      description: {
        es: 'Dirección de Manuel Solís en Houston (2950 North Loop W) que se atiende solo con cita previa, sin personal del despacho en el sitio. Inmigración, criminal y familia.',
        en: 'Manuel Solis by-appointment location in Houston (2950 North Loop W), with no firm staff on site. Immigration, criminal, and family law cases.',
      },
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
      <script
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