import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildOfficeSchema } from '../../../lib/officeSchema';
import { buildMainOfficeFaqs } from '../../../lib/officeFaq';
import { buildFaqPageSchema } from '../../../lib/faqSchema';
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

  // Dirección virtual (VIRTUAL_OFFICE_SLUGS): la description NO puede prometer
  // "24 horas" de atención presencial — lo que abre 24 h es la línea telefónica.
  const description = isEs
    ? `Manuel Solís en 3730 Kirby Dr, Houston: dirección que se atiende solo con cita previa; atención telefónica 24 horas. Inmigración, familia y accidentes.`
    : `Manuel Solis at 3730 Kirby Dr, Houston: a by-appointment location with 24-hour phone support. Immigration, family law, and accident attorneys.`;

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
// Kirby es una de las direcciones virtuales (VIRTUAL_OFFICE_SLUGS): no se pasa
// `openingHours` porque buildOfficeSchema los descarta para estas direcciones, y
// dejarlos aquí volvería a declarar una sede atendida 24 h que no existe.
export default async function KirbyPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const schemaData = await buildOfficeSchema(
    {
      slug: SLUG,
      officeInfo: OFFICE_INFO,
      description: {
        es: 'Dirección de Manuel Solís en Houston (Kirby Dr) que se atiende solo con cita previa, sin personal del despacho en el sitio. Inmigración, familia y accidentes.',
        en: 'Manuel Solis by-appointment location in Houston (Kirby Dr), with no firm staff on site. Immigration, family law, and accident cases.',
      },
    },
    localeLang,
  );
  // Preguntas propias de esta sede (dirección, si recibe sin cita, idioma y
  // sedes hermanas de la misma ciudad). Las MISMAS alimentan el FAQPage, así
  // que lo marcado es literalmente lo que se lee en la página.
  const officeFaqs = buildMainOfficeFaqs('kirby', lang === 'en' ? 'en' : 'es');
  const faqSchema = buildFaqPageSchema(
    officeFaqs,
    `https://www.manuelsolis.com/${lang}/oficinas/kirby`,
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
      <OfficeClient lang={localeLang} faqs={officeFaqs} />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}