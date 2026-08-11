import type { Metadata } from 'next';
import ImmigrationClient from './ImmigrationClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildSocialMetadata } from '../../../lib/seoMetadata';
import { getServiceFaqs } from '../../../lib/serviceFaq';
import { buildFaqPageSchema } from '../../../lib/faqSchema';
import { PHYSICAL_OFFICE_COUNT } from '../../../components/officesPhoneMap';

const SITE_URL = 'https://www.manuelsolis.com';


type Props = {
  params: Promise<{ lang: string }>;
};

// 1. GENERACIÓN DINÁMICA DE METADATA (SEO TÉCNICO)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs
    ? 'Abogados de Inmigración en Estados Unidos'
    : 'Immigration Lawyers in the United States';

  const description = isEs
    // "oficinas FÍSICAS", igual que /nosotros. El calificador no es adorno:
    // esta cifra excluye a propósito las 5 direcciones Regus/IWG, así que sin
    // él la descripción dice "10 oficinas" mientras el menú lista 15 sedes, y
    // parece un dato viejo cuando en realidad son dos cosas distintas.
    ? `Abogados de inmigración con 35+ años y 50,000+ casos ganados. Defensa de deportación, asilo, Visa U, VAWA, residencia y ciudadanía. ${PHYSICAL_OFFICE_COUNT} oficinas físicas en 5 estados.`
    : `Immigration lawyers with 35+ years and 50,000+ cases won. Deportation defense, asylum, U Visa, VAWA, residency and citizenship. ${PHYSICAL_OFFICE_COUNT} physical offices in 5 states.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/servicios/inmigracion`,
      languages: {
        'es': `${SITE_URL}/es/servicios/inmigracion`,
        'en': `${SITE_URL}/en/servicios/inmigracion`,
        'x-default': `${SITE_URL}/es/servicios/inmigracion`,
      },
    },
    // El copy social es propio (más corto y con gancho); se conserva tal cual.
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/servicios/inmigracion`,
      title: isEs
        ? 'Defensa de Deportación y Visas | Manuel Solís Law Firm'
        : 'Deportation Defense & Visas | Manuel Solis Law Firm',
      description: isEs
        ? 'Proteja su futuro en EE.UU. con abogados expertos en inmigración.'
        : 'Protect your future in the U.S. with expert immigration attorneys.',
      images: [
        {
          url: '/og/inmigracion.jpg',
          alt: isEs ? 'Abogados de Inmigración Manuel Solís' : 'Manuel Solis Immigration Lawyers',
        },
      ],
    }),
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
  // Vacío mientras el bloque de serviceFaq.ts no esté aprobado por un
  // abogado: sin preguntas no se renderiza la sección ni se emite el
  // FAQPage, así que el contenido queda listo y sin publicar.
  const serviceFaqs = getServiceFaqs('inmigracion', lang === 'en' ? 'en' : 'es');
  const faqSchema = buildFaqPageSchema(
    serviceFaqs,
    `https://www.manuelsolis.com/${lang}/servicios/inmigracion`,
  );

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
      {/* Solo sale si el bloque está aprobado: sin preguntas,
          buildFaqPageSchema devuelve null y aquí no se emite nada. */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ImmigrationClient lang={lang === 'en' ? 'en' : 'es'} faqs={serviceFaqs} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}