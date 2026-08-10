import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildOfficeSchema } from '../../../lib/officeSchema';
import { buildMainOfficeFaqs } from '../../../lib/officeFaq';
import { buildFaqPageSchema } from '../../../lib/faqSchema';
import FaqSection from '../../../components/FaqSection';
import { buildSocialMetadata } from '../../../lib/seoMetadata';

const SLUG = 'dallas';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- CONFIGURACIÓN SEO ESPECÍFICA DE LA OFICINA ---
const OFFICE_INFO = {
  name: "Manuel Solis Law Firm - Dallas",
  address: "1120 Empire Central PL",
  city: "Dallas",
  state: "TX",
  zip: "75247",
  phone: "+1-214-753-8315",
  // Coordenadas para 1120 Empire Central PL
  latitude: "32.8122", 
  longitude: "-96.8728",
  mapUrl: "https://share.google/sotBoLXMzRVJcTVJ5"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs 
    ? `Abogados en Dallas, TX (Empire Central)`
    : `Lawyers in Dallas, TX (Empire Central)`;

  const description = isEs
    ? `Oficina de Manuel Solís en Dallas (Empire Central PL). Abogados de inmigración y accidentes listos para defender sus derechos.`
    : `Manuel Solis Law Office in Dallas (Empire Central PL). Immigration and accident attorneys ready to defend your rights.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.manuelsolis.com/${lang}/oficinas/dallas`,
      languages: {
        'es': `https://www.manuelsolis.com/es/oficinas/dallas`,
        'en': `https://www.manuelsolis.com/en/oficinas/dallas`,
        'x-default': `https://www.manuelsolis.com/es/oficinas/dallas`,
      },
    },
    // Dimensiones = las del PNG real en public/offices (no el 1200x630 nominal).
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/oficinas/dallas`,
      title,
      description,
      images: [{ url: '/offices/Dallas.png', width: 1200, height: 900 }],
    }),
  };
}

// LegalService + Attorney schema is built centrally — see app/lib/officeSchema.ts.
export default async function DallasPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const schemaData = await buildOfficeSchema(
    {
      slug: SLUG,
      officeInfo: OFFICE_INFO,
      description: {
        es: 'Oficina legal en Dallas especializada en inmigración y accidentes.',
        en: 'Law office in Dallas specializing in immigration and accidents.',
      },
      openingHours: [
        { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
        { dayOfWeek: 'Saturday', opens: '08:00', closes: '16:00' },
      ],
    },
    localeLang,
  );
  // Preguntas propias de esta sede (dirección, si recibe sin cita, idioma y
  // sedes hermanas de la misma ciudad). Las MISMAS alimentan el FAQPage, así
  // que lo marcado es literalmente lo que se lee en la página.
  const officeFaqs = buildMainOfficeFaqs('dallas', lang === 'en' ? 'en' : 'es');
  const faqSchema = buildFaqPageSchema(
    officeFaqs,
    `https://www.manuelsolis.com/${lang}/oficinas/dallas`,
  );

  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Oficinas' : 'Offices', url: `/${lang}/oficinas` },
    { name: 'Dallas', url: `/${lang}/oficinas/dallas` },
  ]);

  return (
    <>
      <script
        id="local-schema-dallas"
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