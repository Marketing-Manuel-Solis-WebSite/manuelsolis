import BreadcrumbSchema from '../../components/BreadcrumbSchema';
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
      /**
       * La foto real del equipo, no la tarjeta genérica: es la página de
       * "quiénes son", y al compartirla se ve a quiénes.
       *
       * Se sirve una versión propia para redes (1600x900, 137 KB) y no el PNG
       * original: ese pesa 1,6 MB y `og:image` apunta al archivo CRUDO, no al
       * que optimiza next/image, así que era lo que descargaba WhatsApp en cada
       * comparticón. Mismo criterio por el que se descartó la miniatura de
       * /testimonios; aquí lo había incumplido yo.
       */
      images: [
        {
          url: '/og/abogados.jpg',
          width: 1600,
          height: 900,
          alt: isEs ? 'Equipo legal de Manuel Solís' : 'Manuel Solis legal team',
        },
      ],
    }),
  };
}

export default async function AbogadosPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  return (
    <>
      <BreadcrumbSchema lang={localeLang} trail={[{ es: 'Abogados', en: 'Attorneys', path: '/abogados' }]} />
      <AbogadosClient lang={localeLang} />
    </>
  );
}
