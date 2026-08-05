import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import type { Metadata } from 'next';
import TermsOfService from '../../components/TermsOfService';
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

  const title = isEs ? 'Términos de Servicio' : 'Terms of Service';
  const description = isEs
    ? 'Términos y condiciones de uso de los servicios de las Oficinas Legales de Manuel Solís.'
    : 'Terms and conditions for using the services of the Law Offices of Manuel Solis.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/terminos`,
      languages: {
        es: `${SITE_URL}/es/terminos`,
        en: `${SITE_URL}/en/terminos`,
        'x-default': `${SITE_URL}/es/terminos`,
      },
    },
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/terminos`,
      title,
      description,
    }),
  };
}

export default async function TerminosPage({ params }: Props) {
  const { lang } = await params;
  return (
    <>
      <BreadcrumbSchema
        lang={lang === 'en' ? 'en' : 'es'}
        trail={[{ es: 'Términos de Servicio', en: 'Terms of Service', path: '/terminos' }]}
      />
      <TermsOfService />
    </>
  );
}
