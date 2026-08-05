import type { Metadata } from 'next';
import { generateBreadcrumbSchema } from '../../lib/breadcrumbSchema';
import { buildSocialMetadata } from '../../lib/seoMetadata';
import ClientesDetenidosClient from './ClientesDetenidosClient';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  // El horario debe coincidir con texts.section2.hours de
  // ClientesDetenidosClient.tsx: en una página de emergencia, prometer una
  // disponibilidad que la línea no tiene destruye la confianza.
  const title = isEs
    ? 'Detenidos por ICE — Ayuda Legal de Emergencia'
    : 'ICE Detainee Emergency Legal Help';

  const description = isEs
    ? '¿Su familiar fue detenido por ICE? Actuamos de inmediato: localizador ICE, audiencia de fianza y defensa en corte. Línea 832-598-0914, L-V 9AM-9PM CST.'
    : 'Family member detained by ICE? We act immediately: ICE detainee locator, bond hearings and court defense. Help line 832-598-0914, Mon-Fri 9AM-9PM CST.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/clientes-detenidos`,
      languages: {
        es: `${SITE_URL}/es/clientes-detenidos`,
        en: `${SITE_URL}/en/clientes-detenidos`,
        'x-default': `${SITE_URL}/es/clientes-detenidos`,
      },
    },
    keywords: isEs
      ? [
          'detenido por ICE',
          'ayuda familiar detenido inmigración',
          'abogado de fianza inmigración',
          'localizar detenido ICE',
          'audiencia de fianza inmigración',
          'centro de detención ICE',
          'stay of removal',
          'defensa deportación urgente',
          'abogado de emergencia inmigración',
          'ICE locator en español'
        ]
      : [
          'ICE detainee',
          'family member detained by ICE',
          'immigration bond attorney',
          'ICE detainee locator',
          'immigration bond hearing',
          'ICE detention center',
          'stay of removal attorney',
          'emergency deportation defense',
          'urgent immigration lawyer',
          'ICE online detainee locator'
        ],
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/clientes-detenidos`,
      title,
      description,
      images: [{ url: '/immigration-hero.png', width: 1200, height: 630, alt: title }],
    }),
  };
}

// Service (no LegalService): la ficha LocalBusiness con dirección vive en
// /oficinas/<slug>; aquí solo la entidad temática ligada a #organization.
const getEmergencySchema = (lang: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/${lang}/clientes-detenidos#service`,
  name: lang === 'es'
    ? 'Manuel Solís — Ayuda Legal para Detenidos por ICE'
    : 'Manuel Solis — Legal Help for ICE Detainees',
  description: lang === 'es'
    ? 'Asistencia legal de emergencia para personas detenidas por inmigración. Localización, fianzas, defensa en corte.'
    : 'Emergency legal assistance for immigration detainees. Location, bonds, court defense.',
  url: `${SITE_URL}/${lang}/clientes-detenidos`,
  availableChannel: {
    '@type': 'ServiceChannel',
    // Debe coincidir con la línea de ayuda que la página marca de verdad
    // (CTA tel: de ClientesDetenidosClient) y con el horario que anuncia.
    servicePhone: { '@type': 'ContactPoint', telephone: '+1-832-598-0914' },
    availableLanguage: ['Spanish', 'English'],
  },
  provider: { '@id': `${SITE_URL}/#organization` },
  serviceType: [
    'Immigration Detention Defense',
    'Bond Hearings',
    'Cancellation of Removal',
    'Asylum',
    'Deportation Defense',
  ],
  areaServed: [
    { '@type': 'State', name: 'Texas' },
    { '@type': 'State', name: 'California' },
    { '@type': 'State', name: 'Illinois' },
    { '@type': 'State', name: 'Colorado' },
    { '@type': 'State', name: 'Tennessee' },
  ],
});

export default async function ClientesDetenidosPage({ params }: Props) {
  const { lang } = await params;
  const validLang = lang === 'es' || lang === 'en' ? lang : 'es';

  const schemaData = getEmergencySchema(validLang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: validLang === 'es' ? 'Inicio' : 'Home', url: `/${validLang}` },
    {
      name: validLang === 'es' ? 'Clientes Detenidos' : 'Detained Clients',
      url: `/${validLang}/clientes-detenidos`,
    },
  ]);

  return (
    <>
      <script
        id="detained-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        id="breadcrumb-schema-detained"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <ClientesDetenidosClient lang={validLang} />
    </>
  );
}
