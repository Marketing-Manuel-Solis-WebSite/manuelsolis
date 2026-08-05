import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildOfficeSchema } from '../../../lib/officeSchema';
import { buildSocialMetadata } from '../../../lib/seoMetadata';

const SLUG = 'losangeles';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- CONFIGURACIÓN SEO ESPECÍFICA DE LA OFICINA ---
const OFFICE_INFO = {
  name: "Manuel Solis Law Firm - Los Angeles",
  address: "8337 Telegraph Rd, STE 115",
  city: "Pico Rivera",
  state: "CA",
  zip: "90660",
  phone: "+1-213-784-1554",
  // Coordenadas para 8337 Telegraph Rd, Pico Rivera
  latitude: "33.9575", 
  longitude: "-118.1065",
  mapUrl: "https://share.google/VnrxOpNfWDbNYkwjP" // URL CORRECTA DE GMB
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs 
    ? `Abogados en Los Ángeles, CA (Pico Rivera)`
    : `Lawyers in Los Angeles, CA (Pico Rivera)`;

  const description = isEs
    ? `Oficina de Manuel Solís en Los Ángeles (Pico Rivera). Abogados expertos en inmigración sirviendo a la comunidad de California.`
    : `Manuel Solis Law Office in Los Angeles (Pico Rivera). Expert immigration attorneys serving the California community.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.manuelsolis.com/${lang}/oficinas/losangeles`,
      languages: {
        'es': `https://www.manuelsolis.com/es/oficinas/losangeles`,
        'en': `https://www.manuelsolis.com/en/oficinas/losangeles`,
        'x-default': `https://www.manuelsolis.com/es/oficinas/losangeles`,
      },
    },
    // Dimensiones = las del PNG real en public/offices (no el 1200x630 nominal).
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/oficinas/losangeles`,
      title,
      description,
      images: [{ url: '/offices/los-angeles.png', width: 1200, height: 900 }],
    }),
  };
}

// LegalService + Attorney schema is built centrally — see app/lib/officeSchema.ts.
export default async function LosAngelesPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const schemaData = await buildOfficeSchema(
    {
      slug: SLUG,
      officeInfo: OFFICE_INFO,
      description: {
        es: 'Oficina legal en Los Ángeles (Pico Rivera) especializada en inmigración.',
        en: 'Law office in Los Angeles (Pico Rivera) specializing in immigration.',
      },
      openingHours: [
        { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
        { dayOfWeek: 'Saturday', opens: '09:00', closes: '14:00' },
      ],
    },
    localeLang,
  );
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Oficinas' : 'Offices', url: `/${lang}/oficinas` },
    { name: 'Los Angeles', url: `/${lang}/oficinas/losangeles` },
  ]);

  return (
    <>
      <script
        id="local-schema-los-angeles"
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