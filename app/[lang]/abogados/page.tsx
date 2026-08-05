import type { Metadata } from 'next';
import { buildSocialMetadata } from '../../lib/seoMetadata';
import AbogadosClient from './AbogadosClient';

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
    ? 'Nuestro Equipo de Abogados — 35+ Años'
    : 'Our Attorney Team — 35+ Years';
  const description = isEs
    ? 'Conozca al equipo legal de Manuel Solís: abogados bilingües en inmigración, accidentes, defensa criminal y derecho de familia. 50,000+ casos ganados.'
    : 'Meet the Manuel Solis legal team. Bilingual attorneys specializing in immigration, accidents, criminal defense and family law. Over 50,000 cases won.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/abogados`,
      languages: {
        es: `${SITE_URL}/es/abogados`,
        en: `${SITE_URL}/en/abogados`,
        'x-default': `${SITE_URL}/es/abogados`,
      },
    },
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/abogados`,
      title,
      description,
    }),
  };
}

export default async function AbogadosPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  return <AbogadosClient lang={localeLang} />;
}
