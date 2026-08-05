import type { Metadata } from 'next';
import DeportacionClient from './DeportacionClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildSocialMetadata } from '../../../lib/seoMetadata';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs
    ? 'Defensa Deportación y Cancelación de Remoción'
    : 'Deportation Defense & Removal Cancellation';

  const description = isEs
    ? 'Abogados de defensa de deportación con 35+ años y 50,000+ casos. Cancelación de remoción, fianzas, representación en corte. Emergencia 24/7: 832-598-0914.'
    : 'Deportation defense attorneys with 35+ years, 50,000+ cases. Cancellation of removal, bonds, court representation. 24/7 emergency: 832-598-0914.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/servicios/defensa-deportacion`,
      languages: {
        'es': `${SITE_URL}/es/servicios/defensa-deportacion`,
        'en': `${SITE_URL}/en/servicios/defensa-deportacion`,
        'x-default': `${SITE_URL}/es/servicios/defensa-deportacion`,
      },
    },
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/servicios/defensa-deportacion`,
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
  '@id': `${SITE_URL}/${lang}/servicios/defensa-deportacion#service`,
  name: lang === 'es'
    ? 'Manuel Solís - Defensa contra Deportación'
    : 'Manuel Solis - Deportation Defense',
  description: lang === 'es'
    ? 'Servicios legales de defensa contra deportación: cancelación de remoción, fianzas de inmigración, representación en corte y apelaciones ante el BIA.'
    : 'Deportation defense legal services: cancellation of removal, immigration bonds, court representation, and BIA appeals.',
  url: `${SITE_URL}/${lang}/servicios/defensa-deportacion`,
  areaServed: [
    { '@type': 'State', name: 'Texas' },
    { '@type': 'State', name: 'California' },
    { '@type': 'State', name: 'Illinois' },
    { '@type': 'State', name: 'Colorado' },
    { '@type': 'State', name: 'Tennessee' },
  ],
  provider: { '@id': `${SITE_URL}/#organization` },
  serviceType: [
    'Deportation Defense',
    'Cancellation of Removal',
    'Immigration Court Representation',
    'Immigration Bonds',
    'ICE Detention Defense',
    'Removal Proceedings',
    'Immigration Appeals',
  ],
  availableChannel: {
    '@type': 'ServiceChannel',
    // Debe coincidir con el número que la página marca de verdad (CTA tel: de DeportacionClient).
    servicePhone: { '@type': 'ContactPoint', telephone: '+1-832-598-0914' },
    availableLanguage: ['English', 'Spanish'],
  },
});

export default async function DeportacionPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getServiceSchema(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Servicios' : 'Services', url: `/${lang}/servicios` },
    { name: lang === 'es' ? 'Inmigración' : 'Immigration', url: `/${lang}/servicios/inmigracion` },
    { name: lang === 'es' ? 'Defensa de Deportación' : 'Deportation Defense', url: `/${lang}/servicios/defensa-deportacion` },
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
      <DeportacionClient lang={lang === 'en' ? 'en' : 'es'} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
