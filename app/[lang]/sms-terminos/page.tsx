import type { Metadata } from 'next';
import SmsTerminosClient from './SmsTerminosClient';

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

  const title = isEs ? 'Términos de SMS' : 'SMS Terms';
  const description = isEs
    ? 'Términos y condiciones del servicio de mensajes SMS de Manuel Solís.'
    : 'Terms and conditions for Manuel Solis SMS messaging service.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/sms-terminos`,
      languages: {
        es: `${SITE_URL}/es/sms-terminos`,
        en: `${SITE_URL}/en/sms-terminos`,
        'x-default': `${SITE_URL}/es/sms-terminos`,
      },
    },
  };
}

export default async function SmsTerminosPage({ params }: Props) {
  return <SmsTerminosClient />;
}
