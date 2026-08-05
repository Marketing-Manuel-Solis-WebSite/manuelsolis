import type { Metadata } from 'next';
import VawaClient from './VawaClient';
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
    ? 'VAWA: Protección para Víctimas de Violencia'
    : 'VAWA: Protection for Domestic Violence';

  const description = isEs
    ? 'Abogados expertos en VAWA. Ayudamos a víctimas de abuso por cónyuges, padres o hijos ciudadanos o residentes a obtener residencia sin depender del agresor.'
    : 'Expert VAWA attorneys. We help abuse victims of citizen or resident spouses, parents, or children obtain residency without depending on the abuser.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/servicios/vawa`,
      languages: {
        'es': `${SITE_URL}/es/servicios/vawa`,
        'en': `${SITE_URL}/en/servicios/vawa`,
        'x-default': `${SITE_URL}/es/servicios/vawa`,
      },
    },
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/servicios/vawa`,
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
  '@id': `${SITE_URL}/${lang}/servicios/vawa#service`,
  name: lang === 'es' ? 'Manuel Solis - Abogados VAWA' : 'Manuel Solis - VAWA Attorneys',
  description: lang === 'es'
    ? 'Servicios legales VAWA: protección migratoria para víctimas de violencia doméstica por cónyuges, padres o hijos ciudadanos o residentes.'
    : 'VAWA legal services: immigration protection for domestic violence victims abused by citizen or resident spouses, parents, or children.',
  url: `${SITE_URL}/${lang}/servicios/vawa`,
  areaServed: [
    { '@type': 'State', name: 'Texas' },
    { '@type': 'State', name: 'California' },
    { '@type': 'State', name: 'Illinois' },
    { '@type': 'State', name: 'Colorado' },
    { '@type': 'State', name: 'Tennessee' },
  ],
  provider: { '@id': `${SITE_URL}/#organization` },
  serviceType: [
    'VAWA Self-Petition',
    'Violence Against Women Act',
    'Form I-360',
    'Domestic Violence Immigration Relief',
    'Abused Spouse Immigration',
    'Abused Parent Immigration',
  ],
  availableChannel: {
    '@type': 'ServiceChannel',
    // Debe coincidir con el número que la página marca de verdad (CTA tel: de VawaClient).
    servicePhone: { '@type': 'ContactPoint', telephone: '+1-832-598-0914' },
    availableLanguage: ['English', 'Spanish'],
  },
});

export default async function VawaPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getServiceSchema(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Servicios' : 'Services', url: `/${lang}/servicios` },
    { name: lang === 'es' ? 'Inmigración' : 'Immigration', url: `/${lang}/servicios/inmigracion` },
    { name: 'VAWA', url: `/${lang}/servicios/vawa` },
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
      <VawaClient lang={lang === 'en' ? 'en' : 'es'} />
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
