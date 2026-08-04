import type { Metadata } from 'next';
import DerechosMigrantesClient from './DerechosMigrantesClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = { params: Promise<{ lang: string }> };

export async function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  return {
    title: isEs ? 'Derechos de Migrantes: Guías y Recursos Legales' : 'Migrant Rights: Legal Guides & Resources',
    description: isEs
      ? 'Conozca sus derechos como migrante en Estados Unidos: qué hacer en una redada de ICE, cómo localizar a un detenido, defensa contra la deportación y sus derechos tras un accidente o lesión de trabajo.'
      : 'Know your rights as a migrant in the United States: what to do in an ICE raid, how to locate a detained relative, deportation defense, and your rights after an accident or work injury.',
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
