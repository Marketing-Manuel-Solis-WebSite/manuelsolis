import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import type { Metadata } from 'next';
import { OFFICES_PLACE_IDS, isVirtualOffice } from '../../lib/officesRegistry';
import { attorneys } from '../../lib/attorneyData';
import { buildSocialMetadata } from '../../lib/seoMetadata';
import NosotrosClient from './NosotrosClient';

const SITE_URL = 'https://www.manuelsolis.com';

const FOUNDER_ID = 'manuel-solis';

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
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/nosotros`,
      title,
      description,
    }),
  };
}

/**
 * Añade `founder` al MISMO nodo `#organization` que emite app/[lang]/layout.tsx
 * (mismo @id ⇒ una sola entidad, como hace /testimonios con el rating). Esta es
 * la página que declara visiblemente quién fundó la firma, así que es donde el
 * dato corresponde. `foundingDate` (1990) y `sameAs` a los perfiles oficiales ya
 * los emite el layout en ese nodo y no se repiten aquí.
 * Los datos del fundador salen de lib/attorneyData; si ese id desapareciera, no
 * se emite nada en lugar de inventar el nombre.
 */
function buildFounderSchema(lang: 'es' | 'en'): Record<string, unknown> | null {
  const founder = attorneys.find((attorney) => attorney.id === FOUNDER_ID);
  if (!founder) return null;

  return {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'LawFirm'],
    '@id': `${SITE_URL}/#organization`,
    founder: {
      '@type': 'Person',
      name: founder.name,
      jobTitle: founder.role[lang],
      url: `${SITE_URL}/${lang}/abogados/${FOUNDER_ID}`,
      image: founder.image,
    },
  };
}

export default async function NosotrosPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const founderSchema = buildFounderSchema(localeLang);

  return (
    <>
      <BreadcrumbSchema lang={localeLang} trail={[{ es: 'Nosotros', en: 'About Us', path: '/nosotros' }]} />
      {founderSchema && (
        <script
          id="founder-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
        />
      )}
      <NosotrosClient lang={localeLang} />
    </>
  );
}
