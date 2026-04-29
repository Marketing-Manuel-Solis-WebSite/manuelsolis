import type { Metadata } from 'next';
import AccesoClientesClient from './AccesoClientesClient';

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
    ? 'Conozca el portal de clientes de Manuel Solis Law Firm: consulte el estado de su caso, comparta documentos, comuníquese con su abogado y realice pagos en línea desde un mismo lugar.'
    : 'Discover the Manuel Solis Law Firm client portal: check your case status, share documents, communicate with your attorney, and make online payments — all in one place.';

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
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/acceso-clientes`,
      type: 'website',
      siteName: 'Manuel Solis Law Firm',
      locale: isEs ? 'es_US' : 'en_US',
      images: ['/home-image.jpg'],
    },
  };
}

export default async function AccesoClientesPage() {
  return <AccesoClientesClient />;
}
