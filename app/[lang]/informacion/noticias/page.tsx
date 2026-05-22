import type { Metadata } from 'next';
import NoticiasClient from './NoticiasClient';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = { params: Promise<{ lang: string }> };

export async function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  return {
    title: isEs ? 'Noticias Legales de Inmigración' : 'Immigration Legal News',
    description: isEs
      ? 'Próximamente: noticias y actualizaciones legales de inmigración del Abogado Manuel Solís.'
      : 'Coming soon: immigration legal news and updates from Attorney Manuel Solis.',
    robots: { index: false, follow: true },
    alternates: {
      canonical: `${SITE_URL}/${lang}/informacion/noticias`,
      languages: {
        es: `${SITE_URL}/es/informacion/noticias`,
        en: `${SITE_URL}/en/informacion/noticias`,
        'x-default': `${SITE_URL}/es/informacion/noticias`,
      },
    },
  };
}

export default async function NoticiasPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  return <NoticiasClient lang={localeLang} />;
}
