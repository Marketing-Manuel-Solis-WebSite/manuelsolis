import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildOfficeSchema } from '../../../lib/officeSchema';
import { buildMainOfficeFaqs } from '../../../lib/officeFaq';
import { buildFaqPageSchema } from '../../../lib/faqSchema';
import FaqSection from '../../../components/FaqSection';
import { buildSocialMetadata } from '../../../lib/seoMetadata';

const SLUG = 'memphis';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- CONFIGURACIÓN SEO ESPECÍFICA DE LA OFICINA ---
const OFFICE_INFO = {
  name: "Manuel Solis Law Firm - Memphis",
  address: "3385 Airways Blvd, STE 320",
  city: "Memphis",
  state: "TN",
  zip: "38116",
  phone: "+1-901-557-8357",
  // Coordenadas aproximadas para 3385 Airways Blvd
  latitude: "35.0673", 
  longitude: "-89.9928",
  // TODO(GBP): falta el share-link (`https://share.google/…`) de la ficha de
  // Google Business Profile de Memphis; lo entrega quien administra el GBP del
  // despacho (dueño del proyecto / marketing). Ver el TODO gemelo en
  // app/components/officesPhoneMap.ts → OFFICES_NAP.memphis. Hasta entonces
  // `hasMap` sale de esta búsqueda de Maps con la dirección correcta.
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Manuel+Solis+Law+Firm+3385+Airways+Blvd+STE+320+Memphis+TN+38116"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs 
    ? `Abogados en Memphis, TN`
    : `Lawyers in Memphis, TN`;

  const description = isEs
    ? `Oficina de Manuel Solís en Memphis. Abogados de inmigración, multas y criminal. Abogada Lupita Martínez lista para ayudarle.`
    : `Manuel Solis Law Office in Memphis. Immigration, ticket, and criminal defense attorneys. Attorney Lupita Martinez ready to help you.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.manuelsolis.com/${lang}/oficinas/memphis`,
      languages: {
        'es': `https://www.manuelsolis.com/es/oficinas/memphis`,
        'en': `https://www.manuelsolis.com/en/oficinas/memphis`,
        'x-default': `https://www.manuelsolis.com/es/oficinas/memphis`,
      },
    },
    // Dimensiones = las del PNG real en public/offices (no el 1200x630 nominal).
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/oficinas/memphis`,
      title,
      description,
      images: [{ url: '/offices/ofAirways.png', width: 1101, height: 507 }],
    }),
  };
}

// LegalService + Attorney schema is built centrally — see app/lib/officeSchema.ts.
export default async function MemphisPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const schemaData = await buildOfficeSchema(
    {
      slug: SLUG,
      officeInfo: OFFICE_INFO,
      description: {
        es: 'Oficina legal en Memphis especializada en inmigración y ley civil.',
        en: 'Law office in Memphis specializing in immigration and civil law.',
      },
      openingHours: [
        { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' },
        { dayOfWeek: 'Saturday', opens: '09:00', closes: '13:00' },
      ],
    },
    localeLang,
  );
  // Preguntas propias de esta sede (dirección, si recibe sin cita, idioma y
  // sedes hermanas de la misma ciudad). Las MISMAS alimentan el FAQPage, así
  // que lo marcado es literalmente lo que se lee en la página.
  const officeFaqs = buildMainOfficeFaqs('memphis', lang === 'en' ? 'en' : 'es');
  const faqSchema = buildFaqPageSchema(
    officeFaqs,
    `https://www.manuelsolis.com/${lang}/oficinas/memphis`,
  );

  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Oficinas' : 'Offices', url: `/${lang}/oficinas` },
    { name: 'Memphis', url: `/${lang}/oficinas/memphis` },
  ]);

  return (
    <>
      <script
        id="local-schema-memphis"
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