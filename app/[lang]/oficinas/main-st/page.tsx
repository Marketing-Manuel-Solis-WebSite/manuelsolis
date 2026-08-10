import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildOfficeSchema } from '../../../lib/officeSchema';
import { buildMainOfficeFaqs } from '../../../lib/officeFaq';
import { buildFaqPageSchema } from '../../../lib/faqSchema';
import FaqSection from '../../../components/FaqSection';
import { buildSocialMetadata } from '../../../lib/seoMetadata';

const SLUG = 'main-st';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- CONFIGURACIÓN SEO ESPECÍFICA DE LA OFICINA ---
const OFFICE_INFO = {
  name: "Manuel Solis Law Firm - Houston Main St",
  address: "708 Main St",
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

  // Dirección virtual (VIRTUAL_OFFICE_SLUGS): la description NO puede prometer
  // "24 horas" de atención presencial — lo que abre 24 h es la línea telefónica.
  const description = isEs
    ? `Manuel Solís en 708 Main St, Houston: dirección que se atiende solo con cita previa; atención telefónica 24 horas. Inmigración, familia y accidentes.`
    : `Manuel Solis at 708 Main St, Houston: a by-appointment location with 24-hour phone support. Immigration, family law, and accident attorneys.`;

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
    // Dimensiones = las del PNG real en public/offices (no el 1200x630 nominal).
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/oficinas/main-st`,
      title,
      description,
      images: [{ url: '/offices/main.png', width: 927, height: 633 }],
    }),
  };
}

// LegalService + Attorney schema is built centrally — see app/lib/officeSchema.ts.
// Main St es una de las direcciones virtuales (VIRTUAL_OFFICE_SLUGS): no se pasa
// `openingHours` porque buildOfficeSchema los descarta para estas direcciones, y
// dejarlos aquí volvería a declarar una sede atendida 24 h que no existe.
export default async function MainStPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const schemaData = await buildOfficeSchema(
    {
      slug: SLUG,
      officeInfo: OFFICE_INFO,
      description: {
        es: 'Dirección de Manuel Solís en Houston (708 Main St) que se atiende solo con cita previa, sin personal del despacho en el sitio. Inmigración, familia y accidentes.',
        en: 'Manuel Solis by-appointment location in Houston (708 Main St), with no firm staff on site. Immigration, family law, and accident cases.',
      },
    },
    localeLang,
  );
  // Preguntas propias de esta sede (dirección, si recibe sin cita, idioma y
  // sedes hermanas de la misma ciudad). Las MISMAS alimentan el FAQPage, así
  // que lo marcado es literalmente lo que se lee en la página.
  const officeFaqs = buildMainOfficeFaqs('main-st', lang === 'en' ? 'en' : 'es');
  const faqSchema = buildFaqPageSchema(
    officeFaqs,
    `https://www.manuelsolis.com/${lang}/oficinas/main-st`,
  );

  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Oficinas' : 'Offices', url: `/${lang}/oficinas` },
    { name: 'Houston Main St', url: `/${lang}/oficinas/main-st` },
  ]);

  return (
    <>
      <script
        id="local-schema-main-st"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <OfficeClient lang={localeLang} />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <FaqSection
        faqs={officeFaqs}
        lang={lang === 'en' ? 'en' : 'es'}
        title={lang === 'en' ? 'About this office' : 'Sobre esta oficina'}
      />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}