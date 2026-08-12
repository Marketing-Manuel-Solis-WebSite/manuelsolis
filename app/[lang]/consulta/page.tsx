import type { Metadata } from 'next';
import ConsultaClient from './ConsultaClient';
import { generateBreadcrumbSchema } from '../../lib/breadcrumbSchema';
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

  // Sin sufijo de marca: el template del layout ('%s | Manuel Solís') lo añade.
  const title = isEs
    ? 'Consulta Confidencial con un Abogado'
    : 'Confidential Attorney Consultation';
  const description = isEs
    ? 'Solicita tu consulta confidencial con un abogado de Manuel Solis Law Firm. Respuesta en menos de 24 horas. Más de 35 años de experiencia.'
    : 'Request your confidential consultation with a Manuel Solis Law Firm attorney. Response within 24 hours. Over 35 years of experience.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/consulta`,
      languages: {
        es: `${SITE_URL}/es/consulta`,
        en: `${SITE_URL}/en/consulta`,
        'x-default': `${SITE_URL}/es/consulta`,
      },
    },
    ...buildSocialMetadata({
      lang: isEs ? 'es' : 'en',
      path: `/${lang}/consulta`,
      title,
      description,
      // pedir consulta es el primer contacto. 1600x900, ligera: og:image apunta al archivo crudo.
      images: [
        {
          url: '/og/servicios.jpg',
          width: 1600,
          height: 900,
          alt: isEs ? 'Consulta legal con Manuel Solís' : 'Legal consultation with Manuel Solis',
        },
      ],
    }),
  };
}

export default async function ConsultaPage({ params }: Props) {
  const { lang } = await params;
  const currentLang = lang === 'en' ? 'en' : 'es';
  const breadcrumbData = generateBreadcrumbSchema([
    { name: currentLang === 'es' ? 'Inicio' : 'Home', url: `/${currentLang}` },
    { name: currentLang === 'es' ? 'Consulta' : 'Consultation', url: `/${currentLang}/consulta` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <ConsultaClient />
    </>
  );
}
