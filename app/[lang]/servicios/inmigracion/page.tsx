import type { Metadata } from 'next';
import ImmigrationClient from './ImmigrationClient';
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
      ? 'Abogados de Inmigración en Estados Unidos'
      : 'Immigration Lawyers in the United States',
    description: isEs
      ? 'Abogados de inmigración con 35+ años y 50,000+ casos ganados. Defensa de deportación, asilo, Visa U, VAWA, residencia y ciudadanía. 15 oficinas en 5 estados.'
      : 'Immigration lawyers with 35+ years and 50,000+ cases won. Deportation defense, asylum, U Visa, VAWA, residency and citizenship. 15 offices in 5 states.',
    alternates: {
      canonical: `${SITE_URL}/${lang}/servicios/inmigracion`,
      languages: {
        'es': `${SITE_URL}/es/servicios/inmigracion`,
        'en': `${SITE_URL}/en/servicios/inmigracion`,
        'x-default': `${SITE_URL}/es/servicios/inmigracion`,
      },
    },
    openGraph: {
      title: isEs
        ? 'Defensa de Deportación y Visas | Manuel Solís Law Firm'
        : 'Deportation Defense & Visas | Manuel Solis Law Firm',
      description: isEs
        ? 'Proteja su futuro en EE.UU. con abogados expertos en inmigración.'
        : 'Protect your future in the U.S. with expert immigration attorneys.',
      url: `${SITE_URL}/${lang}/servicios/inmigracion`,
      type: 'website',
      locale: isEs ? 'es_US' : 'en_US',
      siteName: 'Manuel Solís Law Firm',
      images: [
        {
          url: `${SITE_URL}/immigration-hero.png`,
          width: 1200,
          height: 630,
          alt: isEs ? 'Abogados de Inmigración Manuel Solís' : 'Manuel Solis Immigration Lawyers',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEs
        ? 'Defensa de Deportación y Visas | Manuel Solís Law Firm'
        : 'Deportation Defense & Visas | Manuel Solis Law Firm',
      description: isEs
        ? 'Proteja su futuro en EE.UU. con abogados expertos en inmigración.'
        : 'Protect your future in the U.S. with expert immigration attorneys.',
      images: [`${SITE_URL}/immigration-hero.png`],
    },
  };
}

// 2. SCHEMA ORG ESPECÍFICO PARA INMIGRACIÓN (JSON-LD)
// Service (no LegalService): la ficha LocalBusiness con dirección vive en
// /oficinas/<slug>; aquí solo la entidad temática ligada a #organization.
const getImmigrationSchema = (lang: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/${lang}/servicios/inmigracion#service`,
    name: lang === 'es' ? 'Manuel Solís - Abogados de Inmigración' : 'Manuel Solis - Immigration Lawyers',
    description: lang === 'es'
      ? 'Servicios legales de inmigración: Defensa de deportación, Asilo, Visas U y Peticiones Familiares.'
      : 'Immigration legal services: Deportation defense, Asylum, U Visas, and Family Petitions.',
    url: `${SITE_URL}/${lang}/servicios/inmigracion`,
    image: `${SITE_URL}/immigration-hero.png`,
    areaServed: [
      { '@type': 'State', name: 'Texas' },
      { '@type': 'State', name: 'California' },
      { '@type': 'State', name: 'Illinois' },
      { '@type': 'State', name: 'Colorado' },
      { '@type': 'State', name: 'Tennessee' },
    ],
    provider: { '@id': `${SITE_URL}/#organization` },
    serviceType: [
      'Immigration Law',
      'Deportation Defense',
      'Asylum',
      'U Visa',
      'VAWA',
      'T Visa',
      'Cancellation of Removal',
      'Advance Parole',
      'Family Petitions',
      'EB-3 Employment-Based Immigration',
    ],
    // Sin servicePhone: esta página no muestra teléfono propio (su CTA es el
    // formulario #contacto); el número de la firma lo declara #organization,
    // que además ya lista el knowsAbout completo de la entidad.
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${SITE_URL}/${lang}/servicios/inmigracion#contacto`,
      availableLanguage: ['English', 'Spanish'],
    },
  };
};

export default async function ImmigrationPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getImmigrationSchema(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Servicios' : 'Services', url: `/${lang}/servicios` },
    { name: lang === 'es' ? 'Inmigración' : 'Immigration', url: `/${lang}/servicios/inmigracion` },
  ]);

  return (
    <>
      <script
        id="immigration-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <ImmigrationClient lang={lang === 'en' ? 'en' : 'es'} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}