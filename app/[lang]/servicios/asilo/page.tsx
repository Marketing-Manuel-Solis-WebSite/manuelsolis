import type { Metadata } from 'next';
import AsiloClient from './AsiloClient';
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
    ? 'Abogados de Asilo Político en EE.UU.'
    : 'Political Asylum Lawyers in the U.S.';

  const description = isEs
    ? 'Abogados de asilo político: persecución por raza, religión, grupo social u opinión política. Entrevistas de miedo creíble y corte de inmigración.'
    : 'Political asylum attorneys: persecution by race, religion, social group, or political opinion. Credible fear interviews and immigration court.';

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
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/servicios/asilo`,
      title,
      description,
      images: [
        {
          url: '/immigration-hero.png',
          alt: isEs ? 'Abogados de asilo Manuel Solís' : 'Manuel Solis asylum lawyers',
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
  '@id': `${SITE_URL}/${lang}/servicios/asilo#service`,
  name: lang === 'es'
    ? 'Manuel Solís - Abogados de Asilo Político'
    : 'Manuel Solis - Political Asylum Lawyers',
  description: lang === 'es'
    ? 'Servicios legales de asilo político: solicitudes de asilo afirmativo y defensivo, entrevistas de miedo creíble, Convención Contra la Tortura y restricción de remoción.'
    : 'Political asylum legal services: affirmative and defensive asylum applications, credible fear interviews, Convention Against Torture, and withholding of removal.',
  url: `${SITE_URL}/${lang}/servicios/asilo`,
  areaServed: [
    { '@type': 'State', name: 'Texas' },
    { '@type': 'State', name: 'California' },
    { '@type': 'State', name: 'Illinois' },
    { '@type': 'State', name: 'Colorado' },
    { '@type': 'State', name: 'Tennessee' },
  ],
  provider: { '@id': `${SITE_URL}/#organization` },
  serviceType: [
    'Political Asylum',
    'Asylum Applications',
    'Withholding of Removal',
    'Convention Against Torture',
    'Credible Fear Interviews',
    'Immigration Court Asylum Hearings',
  ],
  availableChannel: {
    '@type': 'ServiceChannel',
    // Debe coincidir con el número que la página marca de verdad (CTA tel: de AsiloClient).
    servicePhone: { '@type': 'ContactPoint', telephone: '+1-832-598-0914' },
    availableLanguage: ['English', 'Spanish'],
  },
});

export default async function AsiloPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getServiceSchema(lang);
  // Vacío mientras el bloque de serviceFaq.ts no esté aprobado por un
  // abogado: sin preguntas no se renderiza la sección ni se emite el
  // FAQPage, así que el contenido queda listo y sin publicar.
  const serviceFaqs = getServiceFaqs('asilo', lang === 'en' ? 'en' : 'es');
  const faqSchema = buildFaqPageSchema(
    serviceFaqs,
    `https://www.manuelsolis.com/${lang}/servicios/asilo`,
  );

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
      {/* Solo sale si el bloque está aprobado: sin preguntas,
          buildFaqPageSchema devuelve null y aquí no se emite nada. */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <AsiloClient lang={lang === 'en' ? 'en' : 'es'} faqs={serviceFaqs} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
