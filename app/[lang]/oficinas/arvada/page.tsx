import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildOfficeSchema } from '../../../lib/officeSchema';
import { buildMainOfficeFaqs } from '../../../lib/officeFaq';
import { buildFaqPageSchema } from '../../../lib/faqSchema';
import FaqSection from '../../../components/FaqSection';
import { buildSocialMetadata } from '../../../lib/seoMetadata';

const SLUG = 'arvada';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- CONFIGURACIÓN SEO ESPECÍFICA DE LA OFICINA ---
const OFFICE_INFO = {
  name: "Manuel Solis Law Firm - Arvada (Denver Area)",
  address: "5400 Ward Rd, Bldg IV",
  city: "Arvada",
  state: "CO",
  zip: "80002",
  phone: "+1-720-358-8973",
  // Coordenadas para 5400 Ward Rd
  latitude: "39.7953", 
  longitude: "-105.1436",
  mapUrl: "https://share.google/QbeutobA9WchbNPcu"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs 
    ? `Abogados en Arvada, CO (Denver)`
    : `Lawyers in Arvada, CO (Denver Area)`;

  const description = isEs
    ? `Oficina de Manuel Solís en Arvada, CO (Área de Denver). Abogados de inmigración sirviendo a la comunidad de Colorado.`
    : `Manuel Solis Law Office in Arvada, CO (Denver Area). Immigration attorneys serving the Colorado community.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.manuelsolis.com/${lang}/oficinas/arvada`,
      languages: {
        'es': `https://www.manuelsolis.com/es/oficinas/arvada`,
        'en': `https://www.manuelsolis.com/en/oficinas/arvada`,
        'x-default': `https://www.manuelsolis.com/es/oficinas/arvada`,
      },
    },
    // Las dimensiones son las del PNG real en public/offices, no el 1200x630
    // nominal: og:image:width/height describen el archivo que se sirve.
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/oficinas/arvada`,
      title,
      description,
      images: [{ url: '/offices/Denver.png', width: 1200, height: 900 }],
    }),
  };
}

// LegalService + Attorney schema is built centrally — see app/lib/officeSchema.ts.
export default async function ArvadaPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const schemaData = await buildOfficeSchema(
    {
      slug: SLUG,
      officeInfo: OFFICE_INFO,
      description: {
        es: 'Oficina legal en Arvada, Colorado (Área de Denver) especializada en inmigración.',
        en: 'Law office in Arvada, Colorado (Denver Area) specializing in immigration.',
      },
      openingHours: [
        { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
        { dayOfWeek: 'Saturday', opens: '09:00', closes: '14:00' },
      ],
    },
    localeLang,
  );
  // Preguntas propias de esta sede (dirección, si recibe sin cita, idioma y
  // sedes hermanas de la misma ciudad). Las MISMAS alimentan el FAQPage, así
  // que lo marcado es literalmente lo que se lee en la página.
  const officeFaqs = buildMainOfficeFaqs('arvada', lang === 'en' ? 'en' : 'es');
  const faqSchema = buildFaqPageSchema(
    officeFaqs,
    `https://www.manuelsolis.com/${lang}/oficinas/arvada`,
  );

  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Oficinas' : 'Offices', url: `/${lang}/oficinas` },
    { name: 'Arvada (Denver)', url: `/${lang}/oficinas/arvada` },
  ]);

  return (
    <>
      <script
        id="local-schema-arvada"
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