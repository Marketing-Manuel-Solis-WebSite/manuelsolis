import type { Metadata } from 'next';
import ProcesosMigratoriosClient from './ProcesosMigratoriosClient';
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

  const title = isEs ? 'Procesos Migratorios: Guías Paso a Paso' : 'Immigration Processes: Step-by-Step Guides';
  const description = isEs
    ? 'Cómo funcionan los trámites de inmigración: peticiones familiares, residencia, ciudadanía, permisos de trabajo, RFE y entrevistas de USCIS.'
    : 'How immigration filings work: family petitions, residency, citizenship, work permits, RFEs, and USCIS interviews.';

  return {
    title,
    description,
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/category/procesos-migratorios`,
      title,
      description,
    }),
    alternates: {
      canonical: `${SITE_URL}/${lang}/category/procesos-migratorios`,
      languages: {
        es: `${SITE_URL}/es/category/procesos-migratorios`,
        en: `${SITE_URL}/en/category/procesos-migratorios`,
        'x-default': `${SITE_URL}/es/category/procesos-migratorios`,
      },
    },
  };
}

export default async function ProcesosMigratoriosPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const breadcrumbData = generateBreadcrumbSchema([
    { name: localeLang === 'es' ? 'Inicio' : 'Home', url: `/${localeLang}` },
    { name: 'Blog', url: `/${localeLang}/blog` },
    {
      name: localeLang === 'es' ? 'Procesos Migratorios' : 'Immigration Process',
      url: `/${localeLang}/category/procesos-migratorios`,
    },
  ]);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <ProcesosMigratoriosClient lang={localeLang} />
    </>
  );
}
