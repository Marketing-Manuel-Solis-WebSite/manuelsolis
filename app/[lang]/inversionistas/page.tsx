import type { Metadata } from 'next';
import InversionistasClient from './InversionistasClient';
import { generateBreadcrumbSchema } from '../../lib/breadcrumbSchema';
import { generateFAQSchema } from '../../lib/blogSchema';
import { inversionistasFaqs } from '../../lib/inversionistasFaq';
import { buildSocialMetadata } from '../../lib/seoMetadata';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  // Intención informativa (requisitos y proceso), frente a la ficha de servicio
  // /servicios/visa-e2, que va a por la comercial ("abogado de visa E-2").
  const title = isEs
    ? 'Visa E-2: Requisitos y Proceso Completo'
    : 'E-2 Visa: Requirements & Full Process';

  const description = isEs
    ? 'Invierta y viva legalmente en EE.UU. con la Visa E-2. Abogados con más de 35 años de experiencia en visas de inversión.'
    : 'Invest and live legally in the U.S. with the E-2 Visa. Attorneys with 35+ years of experience in investment visas.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/inversionistas`,
      languages: {
        es: `${SITE_URL}/es/inversionistas`,
        en: `${SITE_URL}/en/inversionistas`,
        'x-default': `${SITE_URL}/es/inversionistas`,
      },
    },
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/inversionistas`,
      title,
      description,
      // es una visa de inmigración. 1600x900, ligera: og:image apunta al archivo crudo.
      images: [
        {
          url: '/og/inmigracion.jpg',
          width: 1600,
          height: 900,
          alt: isEs ? 'Abogados de visas de inversionista Manuel Solís' : 'Manuel Solis investor visa attorneys',
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
  '@id': `${SITE_URL}/${lang}/inversionistas#service`,
  name:
    lang === 'es'
      ? 'Manuel Solis - Visa E-2 para Inversionistas'
      : 'Manuel Solis - E-2 Investor Visa',
  description:
    lang === 'es'
      ? 'Servicios legales especializados en Visa E-2 para inversionistas que buscan establecerse en EE.UU.'
      : 'Specialized E-2 visa legal services for investors seeking to establish themselves in the U.S.',
  url: `${SITE_URL}/${lang}/inversionistas`,
  areaServed: { '@type': 'Country', name: 'US' },
  serviceType: ['E-2 Visa', 'Investor Visa', 'Business Immigration'],
  provider: { '@id': `${SITE_URL}/#organization` },
  availableChannel: {
    '@type': 'ServiceChannel',
    // Debe coincidir con el número que la página marca de verdad (PHONE_LINK de
    // InversionistasClient), no con el de las páginas de servicios.
    servicePhone: { '@type': 'ContactPoint', telephone: '+1-888-676-1238' },
  },
});

export default async function InversionistasPage({ params }: Props) {
  const { lang } = await params;
  const isEs = lang !== 'en';
  const schemaData = getServiceSchema(lang);

  // FAQPage de las cuatro preguntas que la página ya muestra. Se construye
  // desde el mismo array que renderiza <InversionistasClient>, así que el
  // marcado y el texto visible no pueden divergir.
  const faqSchema = generateFAQSchema(
    inversionistasFaqs.map((faq) => ({
      question: isEs ? faq.q.es : faq.q.en,
      answer: isEs ? faq.a.es : faq.a.en,
    })),
  );
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    {
      name: lang === 'es' ? 'Inversionistas' : 'Investors',
      url: `/${lang}/inversionistas`,
    },
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
      {faqSchema && (
        <script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <InversionistasClient />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
