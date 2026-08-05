import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import type { Metadata } from 'next';
import { buildSocialMetadata } from '../../lib/seoMetadata';
import ColaboradoresClient from './ColaboradoresClient';

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
    ? 'Colaboradores — Equipo Manuel Solís'
    : 'Collaborators — Manuel Solís Team';
  const description = isEs
    ? 'Conozca a los colaboradores del Law Offices of Manuel Solís: profesionales dedicados a la experiencia del cliente, con reseñas verificadas en Google.'
    : 'Meet the collaborators of the Law Offices of Manuel Solís. Professionals dedicated to the client experience, with official links and verified Google reviews.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/colaboradores`,
      languages: {
        es: `${SITE_URL}/es/colaboradores`,
        en: `${SITE_URL}/en/colaboradores`,
        'x-default': `${SITE_URL}/es/colaboradores`,
      },
    },
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/colaboradores`,
      title,
      description,
    }),
  };
}

export default async function ColaboradoresPage({ params }: Props) {
  const { lang } = await params;
  const localeLang = lang === 'en' ? 'en' : 'es';
  return (
    <>
      <BreadcrumbSchema lang={localeLang} trail={[{ es: 'Colaboradores', en: 'Collaborators', path: '/colaboradores' }]} />
      <ColaboradoresClient lang={localeLang} />
    </>
  );
}
