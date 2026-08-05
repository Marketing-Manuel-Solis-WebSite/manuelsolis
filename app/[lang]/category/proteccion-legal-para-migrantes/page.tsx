import type { Metadata } from 'next';
import ProteccionLegalClient from './ProteccionLegalClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildSocialMetadata } from '../../../lib/seoMetadata';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = { params: Promise<{ lang: string }> };

export async function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs ? 'Protección Legal para Migrantes: Visa U, VAWA' : 'Legal Protection for Migrants: U Visa, VAWA';
  const description = isEs
    ? 'Artículos sobre las protecciones humanitarias para migrantes: Visa U, VAWA, Visa T, asilo y estatus juvenil (SIJS). Guías del Abogado Manuel Solís.'
    : 'Articles on humanitarian protections for migrants: U Visa, VAWA, T Visa, asylum, and juvenile status (SIJS). Guides from Attorney Manuel Solis.';

  return {
    title,
    description,
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/category/proteccion-legal-para-migrantes`,
      title,
      description,
    }),
    alternates: {
      canonical: `${SITE_URL}/${lang}/category/proteccion-legal-para-migrantes`,
      languages: {
        es: `${SITE_URL}/es/category/proteccion-legal-para-migrantes`,
        en: `${SITE_URL}/en/category/proteccion-legal-para-migrantes`,
        'x-default': `${SITE_URL}/es/category/proteccion-legal-para-migrantes`,
      },
    },
  };
}

export default async function ProteccionLegalPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const breadcrumbData = generateBreadcrumbSchema([
    { name: localeLang === 'es' ? 'Inicio' : 'Home', url: `/${localeLang}` },
    { name: 'Blog', url: `/${localeLang}/blog` },
    {
      name: localeLang === 'es' ? 'Protección Legal para Migrantes' : 'Legal Protection for Migrants',
      url: `/${localeLang}/category/proteccion-legal-para-migrantes`,
    },
  ]);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <ProteccionLegalClient lang={localeLang} />
    </>
  );
}
