import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildOfficeSchema } from '../../../lib/officeSchema';
import { buildMainOfficeFaqs } from '../../../lib/officeFaq';
import { buildFaqPageSchema } from '../../../lib/faqSchema';
import { buildSocialMetadata } from '../../../lib/seoMetadata';

const SLUG = 'houston-bellaire';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- CONFIGURACIÓN SEO ESPECÍFICA DE LA OFICINA ---
const OFFICE_INFO = {
  name: "Manuel Solis Law Firm - Houston Bellaire",
  address: "9188 Bellaire Blvd, STE E",
  city: "Houston",
  state: "TX",
  zip: "77036",
  phone: "+1-713-903-7875",
  // Coordenadas para 9188 Bellaire Blvd
  latitude: "29.7051", 
  longitude: "-95.5459",
  mapUrl: "https://share.google/QsSM7vMPmZpPNFPRM" // URL CORRECTA DE GMB
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  // "(Servicio en Chino)" dejaba el title en 67 caracteres; el dato sigue en la
  // description, que es donde se lee completo en los resultados.
  const title = isEs
    ? `Abogados de Inmigración en Houston Bellaire`
    : `Immigration Lawyers in Houston Bellaire`;

  const description = isEs
    ? `Oficina de Manuel Solís en Bellaire Blvd, Houston. Abogada Ni Yan ofrece servicios de inmigración en chino, español e inglés.`
    : `Manuel Solis Law Office on Bellaire Blvd, Houston. Attorney Ni Yan offers immigration services in Chinese, Spanish, and English.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.manuelsolis.com/${lang}/oficinas/houston-bellaire`,
      languages: {
        'es': `https://www.manuelsolis.com/es/oficinas/houston-bellaire`,
        'en': `https://www.manuelsolis.com/en/oficinas/houston-bellaire`,
        'x-default': `https://www.manuelsolis.com/es/oficinas/houston-bellaire`,
      },
    },
    // Dimensiones = las del PNG real en public/offices (no el 1200x630 nominal).
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/oficinas/houston-bellaire`,
      title,
      description,
      images: [{ url: '/offices/Houston.png', width: 1200, height: 900 }],
    }),
  };
}

// LegalService + Attorney schema is built centrally — see app/lib/officeSchema.ts.
// Bellaire opts into knowsLanguage with Chinese (in addition to English/Spanish).
export default async function BellairePage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const schemaData = await buildOfficeSchema(
    {
      slug: SLUG,
      officeInfo: OFFICE_INFO,
      description: {
        es: 'Oficina legal en Houston Bellaire con servicios en chino, especializada en inmigración.',
        en: 'Law office in Houston Bellaire with services in Chinese, specializing in immigration.',
      },
      openingHours: [
        { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
        { dayOfWeek: 'Saturday', opens: '08:00', closes: '16:00' },
      ],
      knowsLanguage: ['English', 'Spanish', 'Chinese'],
    },
    localeLang,
  );
  // Preguntas propias de esta sede (dirección, si recibe sin cita, idioma y
  // sedes hermanas de la misma ciudad). Las MISMAS alimentan el FAQPage, así
  // que lo marcado es literalmente lo que se lee en la página.
  const officeFaqs = buildMainOfficeFaqs('houston-bellaire', lang === 'en' ? 'en' : 'es');
  const faqSchema = buildFaqPageSchema(
    officeFaqs,
    `https://www.manuelsolis.com/${lang}/oficinas/houston-bellaire`,
  );

  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Oficinas' : 'Offices', url: `/${lang}/oficinas` },
    { name: 'Houston Bellaire', url: `/${lang}/oficinas/houston-bellaire` },
  ]);

  return (
    <>
      <script
        id="local-schema-bellaire"
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