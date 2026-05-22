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

  const title = isEs ? 'Portal de Clientes' : 'Client Portal';
  const description = isEs
    ? 'Información y recursos para clientes actuales de las Oficinas Legales de Manuel Solís.'
    : 'Information and resources for current clients of the Law Offices of Manuel Solis.';

  return {
    title,
    description,
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
