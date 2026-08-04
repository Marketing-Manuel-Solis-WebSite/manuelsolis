import type { Metadata } from 'next';
import ClientesClient from './ClientesClient';

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

  const title = isEs
    ? 'Noticias y Análisis Legal — En construcción'
    : 'Legal News and Analysis — Under Construction';
  const description = isEs
    ? 'Nuestra sección de noticias está en reconstrucción. Pronto publicaremos análisis jurídicos y actualizaciones migratorias.'
    : 'Our news section is being rebuilt. We will soon publish legal analysis and immigration updates.';

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `${SITE_URL}/${lang}/clientes`,
      languages: {
        es: `${SITE_URL}/es/clientes`,
        en: `${SITE_URL}/en/clientes`,
        'x-default': `${SITE_URL}/es/clientes`,
      },
    },
  };
}

export default async function ClientesPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  return <ClientesClient lang={localeLang} />;
}
