import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildOfficeSchema } from '../../../lib/officeSchema';
import { buildSocialMetadata } from '../../../lib/seoMetadata';

const SLUG = 'harlingen';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- CONFIGURACIÓN SEO ESPECÍFICA DE LA OFICINA ---
const OFFICE_INFO = {
  name: "Manuel Solis Law Firm - Harlingen",
  address: "320 E Jackson St",
  city: "Harlingen",
  state: "TX",
  zip: "78550",
  phone: "+1-956-597-7090",
  // Coordenadas para 320 E Jackson St
  latitude: "26.1923", 
  longitude: "-97.6953",
  mapUrl: "https://share.google/usYVNMsAK6c9gaUWs" // URL GMB Correcta
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs 
    ? `Abogados en Harlingen, TX (Jackson St)`
    : `Lawyers in Harlingen, TX (Jackson St)`;

  const description = isEs
    ? `Oficina de Manuel Solís en Harlingen (E Jackson St). Abogados de inmigración en el Valle del Río Grande listos para ayudarle.`
    : `Manuel Solis Law Office in Harlingen (E Jackson St). Immigration attorneys in the Rio Grande Valley ready to help you.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.manuelsolis.com/${lang}/oficinas/harlingen`,
      languages: {
        'es': `https://www.manuelsolis.com/es/oficinas/harlingen`,
        'en': `https://www.manuelsolis.com/en/oficinas/harlingen`,
        'x-default': `https://www.manuelsolis.com/es/oficinas/harlingen`,
      },
    },
    // Dimensiones = las del PNG real en public/offices (no el 1200x630 nominal).
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/oficinas/harlingen`,
      title,
      description,
      images: [{ url: '/offices/Harlingen.png', width: 1200, height: 900 }],
    }),
  };
}

// LegalService + Attorney schema is built centrally — see app/lib/officeSchema.ts.
export default async function HarlingenPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const schemaData = await buildOfficeSchema(
    {
      slug: SLUG,
      officeInfo: OFFICE_INFO,
      description: {
        es: 'Oficina legal en Harlingen especializada en inmigración y accidentes.',
        en: 'Law office in Harlingen specializing in immigration and accidents.',
      },
      openingHours: [
        { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
      ],
    },
    localeLang,
  );
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Oficinas' : 'Offices', url: `/${lang}/oficinas` },
    { name: 'Harlingen', url: `/${lang}/oficinas/harlingen` },
  ]);

  return (
    <>
      <script
        id="local-schema-harlingen"
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