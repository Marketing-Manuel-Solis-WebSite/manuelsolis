import type { Metadata } from 'next';
import ImmigrationClient from './ImmigrationClient';
import Script from 'next/script';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string }>;
};

// 1. GENERACIÓN DINÁMICA DE METADATA (SEO TÉCNICO)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  return {
    title: isEs 
      ? 'Abogados de Inmigración y Defensa de Deportación | Manuel Solís' 
      : 'Immigration Lawyers & Deportation Defense | Manuel Solis',
    description: isEs
      ? 'Abogados de inmigración con más de 30 años de experiencia. Expertos en defensa de deportación, asilo, Visa U, VAWA y peticiones familiares. ¡Consulta Gratis!'
      : 'Experienced immigration lawyers fighting for your rights. Experts in deportation defense, asylum, U Visa, VAWA, and family petitions. Free Consultation!',
    alternates: {
      canonical: `${SITE_URL}/${lang}/servicios/inmigracion`,
      languages: {
        'es': `${SITE_URL}/es/servicios/inmigracion`,
        'en': `${SITE_URL}/en/servicios/inmigracion`,
        'x-default': `${SITE_URL}/en/servicios/inmigracion`,
      },
    },
    openGraph: {
      title: isEs 
        ? 'Defensa de Deportación y Visas | Manuel Solís Law Firm' 
        : 'Deportation Defense & Visas | Manuel Solis Law Firm',
      description: isEs
        ? 'Proteja su futuro en EE.UU. con abogados expertos en inmigración.'
        : 'Protect your future in the U.S. with expert immigration attorneys.',
      url: `https://www.manuelsolis.com/${lang}/servicios/inmigracion`,
      images: ['/immigration-hero.png'],
    }
  };
}

// 2. SCHEMA ORG ESPECÍFICO PARA INMIGRACIÓN (JSON-LD)
const getImmigrationSchema = (lang: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: lang === 'es' ? 'Manuel Solís - Abogados de Inmigración' : 'Manuel Solis - Immigration Lawyers',
    description: lang === 'es' 
      ? 'Servicios legales de inmigración: Defensa de deportación, Asilo, Visas U y Peticiones Familiares.' 
      : 'Immigration legal services: Deportation defense, Asylum, U Visas, and Family Petitions.',
    url: `https://www.manuelsolis.com/${lang}/servicios/inmigracion`,
    image: 'https://www.manuelsolis.com/immigration-hero.png',
    priceRange: '$$',
    telephone: '+1-866-979-5146',
    areaServed: {
      '@type': 'Country',
      name: 'US'
    },
    serviceType: ['Immigration', 'Deportation Defense', 'Asylum', 'Visa U', 'VAWA']
  };
};

export default async function ImmigrationPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getImmigrationSchema(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Servicios' : 'Services', url: `/${lang}/#servicios` },
    { name: lang === 'es' ? 'Inmigración' : 'Immigration', url: `/${lang}/servicios/inmigracion` },
  ]);

  return (
    <>
      <Script
        id="immigration-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <ImmigrationClient />
    </>
  );
}