import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import type { Metadata } from 'next';
import { buildSocialMetadata } from '../../lib/seoMetadata';
import NosotrosClient from './NosotrosClient';
import { PHYSICAL_OFFICE_COUNT } from '../../components/officesPhoneMap';

const SITE_URL = 'https://www.manuelsolis.com';

// Solo los locales propios: las direcciones virtuales (centros Regus/IWG) están
// marcadas en officesRegistry y no se anuncian como oficinas. La cifra debe
// coincidir con el cuerpo de NosotrosClient.tsx.

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
      // la historia del despacho es la de su fundador. 1600x900, ligera: og:image apunta al archivo crudo.
      images: [
        {
          url: '/og/nosotros.jpg',
          width: 1600,
          height: 900,
          alt: isEs ? 'Manuel Solís, abogado fundador del despacho' : 'Manuel Solis, the firm’s founding attorney',
        },
      ],
    }),
  };
}

// EL NODO `founder` YA NO SE EMITE AQUÍ.
//
// Esta página declaraba un segundo bloque JSON-LD reusando el `@id`
// `#organization` para colgarle `founder`. La idea era enriquecer la entidad
// desde la página que visiblemente cuenta quién fundó la firma, pero el efecto
// medido era otro: /es/nosotros y /en/nosotros emitían el nodo de la
// organización DOS veces, con conjuntos de propiedades distintos. Un `@id`
// repetido se fusiona, y con él los valores en conflicto — la auditoría de
// schema de 2026-08 lo listó como entidad duplicada, y eran las dos únicas
// páginas del sitio con ese problema.
//
// `founder` se movió al nodo canónico de app/[lang]/layout.tsx, que es donde se
// DEFINE la entidad. La regla del sitio a partir de aquí: la firma se define
// una sola vez y todo lo demás la referencia por `@id` pelado (ORG_REF en
// app/lib/schemaOrg.ts). Si hace falta añadirle una propiedad, va al layout, no
// a un segundo bloque en la página que la muestra.

export default async function NosotrosPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';

  return (
    <>
      <BreadcrumbSchema lang={localeLang} trail={[{ es: 'Nosotros', en: 'About Us', path: '/nosotros' }]} />
      <NosotrosClient lang={localeLang} />
    </>
  );
}
