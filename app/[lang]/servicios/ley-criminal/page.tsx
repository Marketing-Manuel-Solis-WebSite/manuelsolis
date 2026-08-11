import type { Metadata } from 'next';
import LeyCriminalClient from './LeyCriminalClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildSocialMetadata } from '../../../lib/seoMetadata';
import { getServiceFaqs } from '../../../lib/serviceFaq';
import { buildFaqPageSchema } from '../../../lib/faqSchema';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs
    ? 'Abogados de Defensa Criminal'
    : 'Criminal Defense Attorneys';

  const description = isEs
    ? 'Abogados expertos en defensa criminal: DUI/DWI, delitos menores y graves, y consecuencias migratorias de cargos criminales.'
    : 'Expert criminal defense lawyers: DUI/DWI, misdemeanors, felonies, and immigration consequences of criminal charges.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/servicios/ley-criminal`,
      languages: {
        'es': `${SITE_URL}/es/servicios/ley-criminal`,
        'en': `${SITE_URL}/en/servicios/ley-criminal`,
        'x-default': `${SITE_URL}/es/servicios/ley-criminal`,
      },
    },
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/servicios/ley-criminal`,
      title,
      description,
      images: [
        {
          url: '/og/ley-criminal.jpg',
          alt: isEs ? 'Abogados de defensa criminal Manuel Solís' : 'Manuel Solis criminal defense lawyers',
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
  '@id': `${SITE_URL}/${lang}/servicios/ley-criminal#service`,
  name: lang === 'es' ? 'Manuel Solís - Defensa Criminal' : 'Manuel Solis - Criminal Defense',
  description: lang === 'es'
    ? 'Servicios legales de defensa criminal: DUI/DWI, delitos y consecuencias migratorias.'
    : 'Criminal defense legal services: DUI/DWI, felonies, and immigration consequences.',
  url: `${SITE_URL}/${lang}/servicios/ley-criminal`,
  areaServed: [
    { '@type': 'State', name: 'Texas' },
    { '@type': 'State', name: 'California' },
    { '@type': 'State', name: 'Illinois' },
    { '@type': 'State', name: 'Colorado' },
    { '@type': 'State', name: 'Tennessee' },
  ],
  provider: { '@id': `${SITE_URL}/#organization` },
  serviceType: [
    'Criminal Defense',
    'DUI/DWI Defense',
    'Misdemeanor Defense',
    'Felony Defense',
    'Immigration Consequences of Criminal Charges',
  ],
  // Sin servicePhone: esta página no muestra teléfono propio (su CTA es el
  // formulario #contacto); el número de la firma lo declara #organization.
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: `${SITE_URL}/${lang}/servicios/ley-criminal#contacto`,
    availableLanguage: ['English', 'Spanish'],
  },
});

export default async function LeyCriminalPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getServiceSchema(lang);
  // Vacío mientras el bloque de serviceFaq.ts no esté aprobado por un
  // abogado: sin preguntas no se renderiza la sección ni se emite el
  // FAQPage, así que el contenido queda listo y sin publicar.
  const serviceFaqs = getServiceFaqs('ley-criminal', lang === 'en' ? 'en' : 'es');
  const faqSchema = buildFaqPageSchema(
    serviceFaqs,
    `https://www.manuelsolis.com/${lang}/servicios/ley-criminal`,
  );

  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Servicios' : 'Services', url: `/${lang}/servicios` },
    { name: lang === 'es' ? 'Ley Criminal' : 'Criminal Law', url: `/${lang}/servicios/ley-criminal` },
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
      <LeyCriminalClient lang={lang === 'en' ? 'en' : 'es'} faqs={serviceFaqs} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
