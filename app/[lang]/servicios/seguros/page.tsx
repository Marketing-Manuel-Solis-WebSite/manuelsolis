import type { Metadata } from 'next';
import SegurosClient from './SegurosClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs
    ? 'Abogados de Reclamos de Seguros'
    : 'Insurance Claims Attorneys';

  const description = isEs
    ? 'Abogados de reclamos de seguros en Houston y Texas. Luchamos contra aseguradoras que niegan o reducen su compensación: seguros de auto, propiedad, salud y vida.'
    : 'Insurance claims lawyers in Houston and Texas. We fight insurance companies that deny or reduce your compensation: auto, property, health and life insurance.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/servicios/seguros`,
      languages: {
        'es': `${SITE_URL}/es/servicios/seguros`,
        'en': `${SITE_URL}/en/servicios/seguros`,
        'x-default': `${SITE_URL}/es/servicios/seguros`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/servicios/seguros`,
      images: ['/og-default.jpg'],
    },
  };
}

// Service (no LegalService): la ficha LocalBusiness con dirección vive en
// /oficinas/<slug>; aquí solo la entidad temática ligada a #organization.
const getServiceSchema = (lang: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/${lang}/servicios/seguros#service`,
  name: lang === 'es' ? 'Manuel Solís - Reclamos de Seguros' : 'Manuel Solis - Insurance Claims',
  description: lang === 'es'
    ? 'Servicios legales de reclamos de seguros: auto, propiedad, vida y más.'
    : 'Insurance claims legal services: auto, property, life and more.',
  url: `${SITE_URL}/${lang}/servicios/seguros`,
  areaServed: [
    { '@type': 'State', name: 'Texas' },
    { '@type': 'State', name: 'California' },
    { '@type': 'State', name: 'Illinois' },
    { '@type': 'State', name: 'Colorado' },
    { '@type': 'State', name: 'Tennessee' },
  ],
  provider: { '@id': `${SITE_URL}/#organization` },
  serviceType: [
    'Insurance Claims',
    'Auto Insurance Claims',
    'Property Insurance Claims',
    'Life Insurance Claims',
    'Insurance Dispute Resolution',
  ],
  availableChannel: {
    '@type': 'ServiceChannel',
    // Debe coincidir con el número que la página marca de verdad (CTA tel: de SegurosClient).
    servicePhone: { '@type': 'ContactPoint', telephone: '+1-866-420-0405' },
    availableLanguage: ['English', 'Spanish'],
  },
});

export default async function SegurosPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getServiceSchema(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Servicios' : 'Services', url: `/${lang}/servicios` },
    { name: lang === 'es' ? 'Seguros' : 'Insurance', url: `/${lang}/servicios/seguros` },
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
      <SegurosClient lang={lang === 'en' ? 'en' : 'es'} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
