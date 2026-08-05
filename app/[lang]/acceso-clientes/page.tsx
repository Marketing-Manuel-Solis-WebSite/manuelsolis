import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import type { Metadata } from 'next';
import AccesoClientesClient from './AccesoClientesClient';
import { buildSocialMetadata } from '../../lib/seoMetadata';

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
    ? 'Acceso a Clientes — Portal Seguro Manuel Solis'
    : 'Client Access — Manuel Solis Secure Portal';

  const description = isEs
    ? 'Portal de clientes de Law Offices of Manuel Solís: consulte el estado de su caso, comparta documentos, escriba a su abogado y pague en línea.'
    : 'Law Offices of Manuel Solís client portal: check your case status, share documents, message your attorney and pay online, all in one place.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/acceso-clientes`,
      languages: {
        es: `${SITE_URL}/es/acceso-clientes`,
        en: `${SITE_URL}/en/acceso-clientes`,
        'x-default': `${SITE_URL}/es/acceso-clientes`,
      },
    },
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/acceso-clientes`,
      title,
      description,
    }),
  };
}

export default async function AccesoClientesPage({ params }: Props) {
  const { lang } = await params;
  return (
    <>
      <BreadcrumbSchema
        lang={lang === 'en' ? 'en' : 'es'}
        trail={[{ es: 'Acceso a Clientes', en: 'Client Access', path: '/acceso-clientes' }]}
      />
      <AccesoClientesClient />
    </>
  );
}
