import type { Metadata } from 'next';
import Script from 'next/script';
import { generateBreadcrumbSchema } from '../../lib/breadcrumbSchema';
import ClientesDetenidosClient from './ClientesDetenidosClient';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs
    ? 'Ayuda Legal para Detenidos por ICE — Emergencia 24/7'
    : 'Legal Help for ICE Detainees — 24/7 Emergency';

  const description = isEs
    ? '¿Su familiar fue detenido por ICE? Actuamos inmediatamente. Localización de detenidos, fianzas de inmigración, defensa en corte. 35+ años de experiencia. Llame ahora: 866-979-5146.'
    : 'Was your family member detained by ICE? We act immediately. Detainee location, immigration bonds, court defense. 35+ years of experience. Call now: 866-979-5146.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/clientes-detenidos`,
      languages: {
        es: `${SITE_URL}/es/clientes-detenidos`,
        en: `${SITE_URL}/en/clientes-detenidos`,
        'x-default': `${SITE_URL}/es/clientes-detenidos`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/clientes-detenidos`,
      type: 'website',
      images: [{ url: '/immigration-hero.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

const getEmergencySchema = (lang: string) => ({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: lang === 'es'
    ? 'Manuel Solís — Ayuda Legal para Detenidos por ICE'
    : 'Manuel Solis — Legal Help for ICE Detainees',
  description: lang === 'es'
    ? 'Asistencia legal de emergencia para personas detenidas por inmigración. Localización, fianzas, defensa en corte.'
    : 'Emergency legal assistance for immigration detainees. Location, bonds, court defense.',
  url: `${SITE_URL}/${lang}/clientes-detenidos`,
  telephone: '+1-866-979-5146',
  priceRange: '$$',
  availableLanguage: ['Spanish', 'English'],
  provider: {
    '@type': 'LawFirm',
    '@id': `${SITE_URL}/#organization`,
    name: 'Manuel Solis Law Firm',
  },
  serviceType: [
    'Immigration Detention Defense',
    'Bond Hearings',
    'Cancellation of Removal',
    'Asylum',
    'Deportation Defense',
  ],
  areaServed: [
    { '@type': 'State', name: 'Texas' },
    { '@type': 'State', name: 'California' },
    { '@type': 'State', name: 'Illinois' },
    { '@type': 'State', name: 'Colorado' },
    { '@type': 'State', name: 'Tennessee' },
  ],
});

export default async function ClientesDetenidosPage({ params }: Props) {
  const { lang } = await params;
  const validLang = lang === 'es' || lang === 'en' ? lang : 'es';

  const schemaData = getEmergencySchema(validLang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: validLang === 'es' ? 'Inicio' : 'Home', url: `/${validLang}` },
    {
      name: validLang === 'es' ? 'Clientes Detenidos' : 'Detained Clients',
      url: `/${validLang}/clientes-detenidos`,
    },
  ]);

  return (
    <>
      <Script
        id="detained-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Script
        id="breadcrumb-schema-detained"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <ClientesDetenidosClient />
    </>
  );
}
