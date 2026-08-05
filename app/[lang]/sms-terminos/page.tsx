import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import type { Metadata } from 'next';
import SmsTerminosClient from './SmsTerminosClient';
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

  const title = isEs ? 'Términos de SMS' : 'SMS Terms';
  // Nombre del programa, tipo de mensajes y palabras clave STOP/HELP: los tres
  // datos que la página declara (secciones 1, 2, 3 y 5) y los que busca quien
  // llega aquí para darse de baja.
  const description = isEs
    ? 'Programa Solís Law Notifications: recordatorios de citas, avances de su caso y respuestas por SMS. Envíe STOP para darse de baja o HELP para pedir ayuda.'
    : 'Solís Law Notifications program: appointment reminders, case updates and replies by text. Text STOP to unsubscribe or HELP to request assistance.';

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
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/sms-terminos`,
      title,
      description,
    }),
  };
}

export default async function SmsTerminosPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  return (
    <>
      <BreadcrumbSchema lang={localeLang} trail={[{ es: 'Términos de SMS', en: 'SMS Terms', path: '/sms-terminos' }]} />
      <SmsTerminosClient lang={localeLang} />
    </>
  );
}
