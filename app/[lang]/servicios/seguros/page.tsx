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
    ? 'Abogados de Reclamos de Seguros | Manuel Solís'
    : 'Insurance Claims Attorneys | Manuel Solis';

  const description = isEs
    ? 'Abogados expertos en reclamos de seguros: seguros de auto, propiedad, vida y más. Luchamos contra las aseguradoras por la compensación justa.'
    : 'Expert insurance claims attorneys: auto, property, life insurance and more. We fight insurance companies for fair compensation.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/servicios/seguros`,
      languages: {
        'es': `${SITE_URL}/es/servicios/seguros`,
        'en': `${SITE_URL}/en/servicios/seguros`,
        'x-default': `${SITE_URL}/en/servicios/seguros`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/servicios/seguros`,
      images: ['/og-image.jpg'],
    },
  };
}

const getLegalServiceSchema = (lang: string) => ({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: lang === 'es' ? 'Manuel Solís - Reclamos de Seguros' : 'Manuel Solis - Insurance Claims',
  description: lang === 'es'
    ? 'Servicios legales de reclamos de seguros: auto, propiedad, vida y más.'
    : 'Insurance claims legal services: auto, property, life and more.',
  url: `${SITE_URL}/${lang}/servicios/seguros`,
  priceRange: '$$',
  telephone: '+1-866-979-5146',
  areaServed: { '@type': 'Country', name: 'US' },
  serviceType: ['Insurance Claims', 'Auto Insurance', 'Property Insurance', 'Life Insurance'],
});

export default async function SegurosPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getLegalServiceSchema(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: lang === 'es' ? 'Servicios' : 'Services', url: `/${lang}/#servicios` },
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
      <SegurosClient />
    </>
  );
}
