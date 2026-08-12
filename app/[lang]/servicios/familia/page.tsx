import type { Metadata } from 'next';
import FamiliaClient from './FamiliaClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildSocialMetadata } from '../../../lib/seoMetadata';
import { getServiceFaqs } from '../../../lib/serviceFaq';
import { getServiceAttorneys } from '../../../lib/serviceAttorneys';
import { buildFaqPageSchema } from '../../../lib/faqSchema';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs
    ? 'Abogados de Derecho Familiar e Inmigración'
    : 'Family Law & Immigration Attorneys';

  const description = isEs
    ? 'Abogados expertos en derecho familiar: peticiones familiares, reunificación, custodia y más. Más de 30 años protegiendo a las familias inmigrantes.'
    : 'Expert family law attorneys: family petitions, reunification, custody and more. Over 30 years protecting immigrant families.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/servicios/familia`,
      languages: {
        'es': `${SITE_URL}/es/servicios/familia`,
        'en': `${SITE_URL}/en/servicios/familia`,
        'x-default': `${SITE_URL}/es/servicios/familia`,
      },
    },
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/servicios/familia`,
      title,
      description,
      images: [
        {
          url: '/og/familia.jpg',
          alt: isEs ? 'Abogados de inmigración familiar Manuel Solís' : 'Manuel Solis family immigration lawyers',
        },
      ],
    }),
  };
}

// Service (no LegalService): la ficha LocalBusiness con dirección vive en
// /oficinas/<slug>; aquí solo la entidad temática ligada a #organization.
const getServiceSchema = (lang: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/${lang}/servicios/familia#service`,
  name: lang === 'es' ? 'Manuel Solís - Derecho Familiar' : 'Manuel Solis - Family Law',
  description: lang === 'es'
    ? 'Servicios legales de derecho familiar: peticiones familiares, reunificación y custodia.'
    : 'Family law legal services: family petitions, reunification, and custody.',
  url: `${SITE_URL}/${lang}/servicios/familia`,
  areaServed: [
    { '@type': 'State', name: 'Texas' },
    { '@type': 'State', name: 'California' },
    { '@type': 'State', name: 'Illinois' },
    { '@type': 'State', name: 'Colorado' },
    { '@type': 'State', name: 'Tennessee' },
  ],
  provider: { '@id': `${SITE_URL}/#organization` },
  serviceType: [
    'Family Law',
    'Family Petitions',
    'Reunification',
    'Custody',
    'VAWA Self-Petition',
    'Immigrant Family Protection',
  ],
  // Sin servicePhone: esta página no muestra teléfono propio (su CTA es el
  // formulario #contacto); el número de la firma lo declara #organization.
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: `${SITE_URL}/${lang}/servicios/familia#contacto`,
    availableLanguage: ['English', 'Spanish'],
  },
});

export default async function FamiliaPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getServiceSchema(lang);
  // Vacío mientras el bloque de serviceFaq.ts no esté aprobado por un
  // abogado: sin preguntas no se renderiza la sección ni se emite el
  // FAQPage, así que el contenido queda listo y sin publicar.
  const serviceFaqs = getServiceFaqs('familia', lang === 'en' ? 'en' : 'es');
  const serviceAttorneys = getServiceAttorneys('familia', lang === 'en' ? 'en' : 'es');
  const faqSchema = buildFaqPageSchema(
    serviceFaqs,
    `https://www.manuelsolis.com/${lang}/servicios/familia`,
  );

  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Servicios' : 'Services', url: `/${lang}/servicios` },
    { name: lang === 'es' ? 'Familia' : 'Family', url: `/${lang}/servicios/familia` },
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
      {/* Solo sale si el bloque está aprobado: sin preguntas,
          buildFaqPageSchema devuelve null y aquí no se emite nada. */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <FamiliaClient lang={lang === 'en' ? 'en' : 'es'} faqs={serviceFaqs} serviceAttorneys={serviceAttorneys} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
