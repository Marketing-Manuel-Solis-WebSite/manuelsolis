import type { Metadata } from 'next';
import DerechosMigrantesClient from './DerechosMigrantesClient';
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

  const title = isEs ? 'Derechos de Migrantes: Guías y Recursos' : 'Migrant Rights: Legal Guides & Resources';
  const description = isEs
    ? 'Conozca sus derechos como migrante en EE. UU.: qué hacer en una redada de ICE, cómo localizar a un detenido y cómo defenderse de la deportación.'
    : 'Know your rights as a migrant in the U.S.: what to do in an ICE raid, how to locate a detained relative, and how to defend against deportation.';

  return {
    title,
    description,
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/category/derechos-de-migrantes`,
      title,
      description,
    }),
    alternates: {
      canonical: `${SITE_URL}/${lang}/category/derechos-de-migrantes`,
      languages: {
        es: `${SITE_URL}/es/category/derechos-de-migrantes`,
        en: `${SITE_URL}/en/category/derechos-de-migrantes`,
        'x-default': `${SITE_URL}/es/category/derechos-de-migrantes`,
      },
    },
  };
}

export default async function DerechosMigrantesPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const breadcrumbData = generateBreadcrumbSchema([
    { name: localeLang === 'es' ? 'Inicio' : 'Home', url: `/${localeLang}` },
    { name: 'Blog', url: `/${localeLang}/blog` },
    {
      name: localeLang === 'es' ? 'Derechos de Migrantes' : 'Migrant Rights',
      url: `/${localeLang}/category/derechos-de-migrantes`,
    },
  ]);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <DerechosMigrantesClient lang={localeLang} />
    </>
  );
}
