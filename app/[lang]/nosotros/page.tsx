import type { Metadata } from 'next';
import { OFFICES_PLACE_IDS, isVirtualOffice } from '../../lib/officesRegistry';
import NosotrosClient from './NosotrosClient';

const SITE_URL = 'https://www.manuelsolis.com';

// Solo los locales propios: las direcciones virtuales (centros Regus/IWG) están
// marcadas en officesRegistry y no se anuncian como oficinas. La cifra debe
// coincidir con el cuerpo de NosotrosClient.tsx.
const PHYSICAL_OFFICE_COUNT = Object.keys(OFFICES_PLACE_IDS)
  .filter((slug) => !isVirtualOffice(slug)).length;

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
    ? '35+ Años Defendiendo Inmigrantes'
    : '35+ Years Defending Immigrants';
  const description = isEs
    ? `Conozca la historia de Manuel Solís. Desde 1990 defendiendo a la comunidad inmigrante con más de 50,000 casos ganados. ${PHYSICAL_OFFICE_COUNT} oficinas físicas en 5 estados.`
    : `Learn about Manuel Solis. Since 1990 defending the immigrant community with over 50,000 cases won. ${PHYSICAL_OFFICE_COUNT} physical offices in 5 states.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/nosotros`,
      languages: {
        es: `${SITE_URL}/es/nosotros`,
        en: `${SITE_URL}/en/nosotros`,
        'x-default': `${SITE_URL}/es/nosotros`,
      },
    },
  };
}

export default async function NosotrosPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  return <NosotrosClient lang={localeLang} />;
}
