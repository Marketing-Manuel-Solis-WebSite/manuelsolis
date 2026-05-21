import type { Metadata } from 'next';
import AsiloClient from './AsiloClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs
    ? 'Abogados de Asilo Político en EE.UU.'
    : 'Political Asylum Lawyers in the U.S.';

  const description = isEs
    ? 'Abogados de asilo con experiencia en persecución por raza, religión, grupo social y opinión política. Representación en entrevistas de miedo creíble y corte de inmigración.'
    : 'Asylum attorneys experienced in persecution by race, religion, social group, and political opinion. Representation at credible fear interviews and immigration court.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/servicios/asilo`,
      languages: {
        'es': `${SITE_URL}/es/servicios/asilo`,
        'en': `${SITE_URL}/en/servicios/asilo`,
        'x-default': `${SITE_URL}/es/servicios/asilo`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/servicios/asilo`,
      images: ['/home-image.jpg'],
    },
  };
}

const getLegalServiceSchema = (lang: string) => ({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: lang === 'es'
    ? 'Manuel Solís - Abogados de Asilo Político'
    : 'Manuel Solis - Political Asylum Lawyers',
  description: lang === 'es'
    ? 'Servicios legales de asilo político: solicitudes de asilo afirmativo y defensivo, entrevistas de miedo creíble, Convención Contra la Tortura y restricción de remoción.'
    : 'Political asylum legal services: affirmative and defensive asylum applications, credible fear interviews, Convention Against Torture, and withholding of removal.',
  url: `${SITE_URL}/${lang}/servicios/asilo`,
  priceRange: '$$',
  telephone: '+1-832-598-0914',
  areaServed: [
    { '@type': 'State', name: 'Texas' },
    { '@type': 'State', name: 'California' },
    { '@type': 'State', name: 'Illinois' },
    { '@type': 'State', name: 'Colorado' },
    { '@type': 'State', name: 'Tennessee' },
  ],
  provider: {
    '@type': 'LawFirm',
    '@id': `${SITE_URL}/#organization`,
    name: 'Manuel Solis Law Firm',
    url: SITE_URL,
    telephone: '+1-832-598-0914',
  },
  serviceType: [
    'Political Asylum',
    'Asylum Applications',
    'Withholding of Removal',
    'Convention Against Torture',
    'Credible Fear Interviews',
    'Immigration Court Asylum Hearings',
  ],
  availableLanguage: ['English', 'Spanish'],
});

export default async function AsiloPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getLegalServiceSchema(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Servicios' : 'Services', url: `/${lang}/servicios` },
    { name: lang === 'es' ? 'Inmigración' : 'Immigration', url: `/${lang}/servicios/inmigracion` },
    { name: lang === 'es' ? 'Asilo' : 'Asylum', url: `/${lang}/servicios/asilo` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <AsiloClient lang={lang === 'en' ? 'en' : 'es'} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
