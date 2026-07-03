import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { attorneys, getText, getAttorneyLocation } from '../../../lib/attorneyData';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import AttorneyProfile from './AttorneyProfile';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

// Generate all 20 attorneys x 2 languages = 40 static pages
export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of ['es', 'en']) {
    for (const attorney of attorneys) {
      params.push({ lang, slug: attorney.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const isEs = lang === 'es';
  const attorney = attorneys.find(a => a.id === slug);

  if (!attorney) return { title: 'Not Found' };

  // Sin sufijo de marca: el template del layout ('%s | Manuel Solís') lo añade.
  const title = isEs
    ? `${attorney.name} | Abogado de Inmigración`
    : `${attorney.name} | Immigration Attorney`;

  const description = attorney.bio[isEs ? 'es' : 'en'][0];

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/abogados/${slug}`,
      languages: {
        es: `${SITE_URL}/es/abogados/${slug}`,
        en: `${SITE_URL}/en/abogados/${slug}`,
        'x-default': `${SITE_URL}/es/abogados/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/abogados/${slug}`,
      images: [attorney.image],
      type: 'profile',
    },
  };
}

// Person schema (JSON-LD)
function getPersonSchema(attorney: typeof attorneys[number], lang: string) {
  const isEs = lang === 'es';
  const location = getAttorneyLocation(attorney.id);

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person-${attorney.id}`,
    name: attorney.name,
    jobTitle: attorney.role[isEs ? 'es' : 'en'],
    // Google exige URLs absolutas en structured data (algunas fotos son
    // rutas relativas de public/, otras ya son URLs de blob storage).
    image: attorney.image.startsWith('http') ? attorney.image : `${SITE_URL}${attorney.image}`,
    description: attorney.bio[isEs ? 'es' : 'en'][0],
    url: `${SITE_URL}/${lang}/abogados/${attorney.id}`,
    worksFor: {
      '@type': ['LegalService', 'LawFirm'],
      '@id': `${SITE_URL}/#organization`,
      name: 'Manuel Solis Law Firm',
    },
    alumniOf: attorney.education.map(edu => ({
      '@type': 'EducationalOrganization',
      name: getText(edu, isEs ? 'es' : 'en'),
    })),
    knowsAbout: [
      'Immigration Law',
      'Deportation Defense',
      'Family-Based Immigration',
      'U Visa',
      'VAWA',
      'Asylum',
      'Naturalization',
    ],
    // Sin sameAs: los perfiles sociales de la FIRMA no identifican a la
    // persona (regla documentada en colaboradores/[slug]). El grafo ya
    // conecta a la firma vía worksFor → #organization.
    ...(location ? {
      workLocation: {
        '@type': 'Place',
        name: location[isEs ? 'es' : 'en'],
      },
    } : {}),
  };
}

// Breadcrumb schema
function getBreadcrumbSchema(attorney: typeof attorneys[number], lang: string) {
  const isEs = lang === 'es';
  return generateBreadcrumbSchema([
    { name: isEs ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: isEs ? 'Abogados' : 'Attorneys', url: `/${lang}/abogados` },
    { name: attorney.name, url: `/${lang}/abogados/${attorney.id}` },
  ]);
}

export default async function AttorneyPage({ params }: Props) {
  const { lang, slug } = await params;
  const attorney = attorneys.find(a => a.id === slug);

  if (!attorney) {
    notFound();
  }

  const personSchema = getPersonSchema(attorney, lang);
  const breadcrumbSchema = getBreadcrumbSchema(attorney, lang);

  return (
    <>
      {/* JSON-LD server-rendered (plain <script>) → presente en el HTML inicial
          que ve el crawler, no inyectado tras hidratación. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AttorneyProfile slug={slug} lang={lang} />
    </>
  );
}
