import type { Metadata } from 'next';
import NoticiasClient from './NoticiasClient';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildSocialMetadata } from '../../../lib/seoMetadata';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = { params: Promise<{ lang: string }> };

export async function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  // El `robots: { index: false }` que había aquí cubría una página "en
  // construcción"; ahora lista artículos publicados, así que se indexa como las
  // páginas de /category/*.
  const title = isEs ? 'Noticias Legales de Inmigración' : 'Immigration Legal News';
  const description = isEs
    ? 'Actualidad migratoria explicada por el Abogado Manuel Solís: ciudadanía por nacimiento, DACA en los tribunales, TPS, asilo y redadas de ICE.'
    : 'Immigration updates explained by Attorney Manuel Solis: birthright citizenship, DACA in the courts, TPS, asylum at the border, Advance Parole and ICE raids.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/informacion/noticias`,
      languages: {
        es: `${SITE_URL}/es/informacion/noticias`,
        en: `${SITE_URL}/en/informacion/noticias`,
        'x-default': `${SITE_URL}/es/informacion/noticias`,
      },
    },
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/informacion/noticias`,
      title,
      description,
    }),
  };
}

export default async function NoticiasPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  const breadcrumbData = generateBreadcrumbSchema([
    { name: localeLang === 'es' ? 'Inicio' : 'Home', url: `/${localeLang}` },
    {
      name: localeLang === 'es' ? 'Noticias Legales de Inmigración' : 'Immigration Legal News',
      url: `/${localeLang}/informacion/noticias`,
    },
  ]);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <NoticiasClient lang={localeLang} />
    </>
  );
}
