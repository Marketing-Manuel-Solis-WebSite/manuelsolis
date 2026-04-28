import type { Metadata } from 'next';
import ImmigrationClient from './ImmigrationClient';
import Script from 'next/script';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { generateFAQSchema } from '../../../lib/blogSchema';

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
      ? 'Abogados de inmigración con 35+ años y 50,000+ casos ganados. Defensa de deportación, asilo, Visa U, VAWA, residencia y ciudadanía. 15 oficinas en 5 estados. Consulta gratis.'
      : 'Immigration lawyers with 35+ years and 50,000+ cases won. Deportation defense, asylum, U Visa, VAWA, residency and citizenship. 15 offices in 5 states. Free consultation.',
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
      locale: isEs ? 'es_MX' : 'en_US',
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
      name: 'Manuel Solis Law Firm',
      url: 'https://www.manuelsolis.com',
      telephone: '+1-832-598-0914',
      foundingDate: '1990',
    },
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
    knowsAbout: [
      'U Nonimmigrant Status',
      'Violence Against Women Act',
      'T Nonimmigrant Status',
      'Immigration and Nationality Act Section 240A(b)',
      'Bona Fide Determination',
      'Form I-918',
      'Form I-360 VAWA Self-Petition',
      'Humanitarian Visas',
    ],
    availableLanguage: ['English', 'Spanish'],
  };
};

const getImmigrationFAQs = (lang: string) => {
  const faqs = lang === 'es' ? [
    { question: '¿Cuánto tiempo tarda el proceso de residencia por familiar?', answer: 'El tiempo varía según la categoría. Para cónyuges de ciudadanos, puede ser de 12 a 18 meses. Para familiares de residentes permanentes, puede tomar de 2 a 5 años o más dependiendo del país de origen y la categoría de preferencia.' },
    { question: '¿Puedo aplicar a la ciudadanía si tengo antecedentes criminales?', answer: 'Depende del tipo de delito. Algunos delitos menores no impiden la naturalización, pero delitos graves (aggravated felonies) pueden descalificarlo permanentemente. Es crucial consultar con un abogado para evaluar su caso específico antes de aplicar.' },
    { question: '¿Qué hago si mi petición familiar fue negada?', answer: 'Tiene derecho a apelar la decisión o presentar una moción para reabrir el caso con nueva evidencia. También puede presentar una nueva petición si las circunstancias han cambiado. Nuestros abogados pueden evaluar las razones de la negación y determinar la mejor estrategia.' },
    { question: '¿Puedo trabajar mientras espero mi residencia?', answer: 'Sí, en muchos casos puede solicitar un permiso de trabajo (EAD) mientras su caso está pendiente. Si tiene un ajuste de estatus pendiente, generalmente puede obtener un EAD dentro de 3 a 6 meses de haber presentado la solicitud.' },
    { question: '¿Necesito un abogado para mi caso de inmigración?', answer: 'Aunque no es legalmente obligatorio, un abogado de inmigración aumenta significativamente sus posibilidades de éxito. Las leyes de inmigración son complejas y un error puede resultar en negación o deportación. Con más de 50,000 casos resueltos, nuestro equipo conoce cada detalle del proceso.' },
  ] : [
    { question: 'How long does the family-based residency process take?', answer: 'Timing varies by category. For spouses of U.S. citizens, it can take 12 to 18 months. For relatives of permanent residents, it may take 2 to 5 years or more depending on the country of origin and preference category.' },
    { question: 'Can I apply for citizenship if I have a criminal record?', answer: 'It depends on the type of offense. Some minor offenses do not prevent naturalization, but aggravated felonies may permanently disqualify you. It is crucial to consult with an attorney to evaluate your specific case before applying.' },
    { question: 'What should I do if my family petition was denied?', answer: 'You have the right to appeal the decision or file a motion to reopen the case with new evidence. You may also file a new petition if circumstances have changed. Our attorneys can evaluate the reasons for the denial and determine the best strategy.' },
    { question: 'Can I work while waiting for my residency?', answer: 'Yes, in many cases you can apply for a work permit (EAD) while your case is pending. If you have a pending adjustment of status, you can generally obtain an EAD within 3 to 6 months of filing.' },
    { question: 'Do I need a lawyer for my immigration case?', answer: 'While not legally required, an immigration attorney significantly increases your chances of success. Immigration laws are complex and a mistake can result in denial or deportation. With over 50,000 cases resolved, our team knows every detail of the process.' },
  ];
  return faqs;
};

export default async function ImmigrationPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getImmigrationSchema(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Servicios' : 'Services', url: `/${lang}/servicios` },
    { name: lang === 'es' ? 'Inmigración' : 'Immigration', url: `/${lang}/servicios/inmigracion` },
  ]);
  const faqData = generateFAQSchema(getImmigrationFAQs(lang));

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
      {faqData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
        />
      )}
      <ImmigrationClient />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}