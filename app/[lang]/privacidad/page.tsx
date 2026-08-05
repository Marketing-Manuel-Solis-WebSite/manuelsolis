import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import type { Metadata } from 'next';
import PrivacidadClient from './PrivacidadClient';
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

  const title = isEs ? 'Política de Privacidad' : 'Privacy Policy';
  // La description resume lo que la página realmente detalla (secciones 1, 5 y
  // 8): datos recopilados en web y SMS, píxeles de terceros y ejercicio de
  // derechos. Nada que no esté en PrivacidadClient.
  const description = isEs
    ? 'Qué datos recopilamos en el sitio y por SMS, qué comparten los píxeles de Meta, Google y TikTok, y cómo pedir acceso, corrección o borrado de su información.'
    : 'What data we collect on the site and by SMS, what the Meta, Google and TikTok pixels share, and how to request access to, correction, or deletion of your data.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/privacidad`,
      languages: {
        es: `${SITE_URL}/es/privacidad`,
        en: `${SITE_URL}/en/privacidad`,
        'x-default': `${SITE_URL}/es/privacidad`,
      },
    },
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/privacidad`,
      title,
      description,
    }),
  };
}

export default async function PrivacidadPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  return (
    <>
      <BreadcrumbSchema lang={localeLang} trail={[{ es: 'Política de Privacidad', en: 'Privacy Policy', path: '/privacidad' }]} />
      <PrivacidadClient lang={localeLang} />
    </>
  );
}
