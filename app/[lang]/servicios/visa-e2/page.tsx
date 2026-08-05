import type { Metadata } from 'next';
import VisaE2Client from './VisaE2Client';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildSocialMetadata } from '../../../lib/seoMetadata';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  // Empieza por "Abogado": esta ficha resuelve la intención comercial, mientras
  // /inversionistas resuelve la informativa (requisitos y proceso). Con ambos
  // títulos en "Visa E-2 para Inversionistas" las dos competían por la misma
  // consulta y se repartían las señales.
  const title = isEs
    ? 'Abogado de Visa E-2 para Inversionistas'
    : 'E-2 Visa Attorney for Investors';

  const description = isEs
    ? 'Abogados expertos en Visa E-2 para inversionistas. Asesoría completa para invertir y vivir en Estados Unidos legalmente.'
    : 'Expert E-2 investor visa attorneys. Complete guidance to invest and live in the United States legally.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/servicios/visa-e2`,
      languages: {
        'es': `${SITE_URL}/es/servicios/visa-e2`,
        'en': `${SITE_URL}/en/servicios/visa-e2`,
        'x-default': `${SITE_URL}/es/servicios/visa-e2`,
      },
    },
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/servicios/visa-e2`,
      title,
      description,
    }),
  };
}

// Service (no LegalService): la ficha LocalBusiness con dirección vive en
// /oficinas/<slug>; aquí solo la entidad temática ligada a #organization.
const getServiceSchema = (lang: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/${lang}/servicios/visa-e2#service`,
  name: lang === 'es' ? 'Manuel Solís - Visa E-2 Inversionistas' : 'Manuel Solis - E-2 Investor Visa',
  description: lang === 'es'
    ? 'Servicios legales para Visa E-2: asesoría para inversionistas que buscan establecerse en EE.UU.'
    : 'E-2 visa legal services: guidance for investors seeking to establish themselves in the U.S.',
  url: `${SITE_URL}/${lang}/servicios/visa-e2`,
  areaServed: [
    { '@type': 'State', name: 'Texas' },
    { '@type': 'State', name: 'California' },
    { '@type': 'State', name: 'Illinois' },
    { '@type': 'State', name: 'Colorado' },
    { '@type': 'State', name: 'Tennessee' },
  ],
  provider: { '@id': `${SITE_URL}/#organization` },
  serviceType: [
    'E-2 Investor Visa',
    'Business Immigration',
    'Treaty Investor Visa',
    'Business Plan Preparation',
    'Visa Renewal and Extension',
  ],
  // Sin servicePhone: esta página no muestra teléfono propio (su CTA es el
  // formulario #contacto); el número de la firma lo declara #organization.
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: `${SITE_URL}/${lang}/servicios/visa-e2#contacto`,
    availableLanguage: ['English', 'Spanish'],
  },
});

export default async function VisaE2Page({ params }: Props) {
  const { lang } = await params;
  const schemaData = getServiceSchema(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Servicios' : 'Services', url: `/${lang}/servicios` },
    { name: lang === 'es' ? 'Visa E-2' : 'E-2 Visa', url: `/${lang}/servicios/visa-e2` },
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
      <VisaE2Client lang={lang === 'en' ? 'en' : 'es'} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
