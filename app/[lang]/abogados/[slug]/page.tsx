import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { attorneys, getText, getAttorneyLocation } from '../../../lib/attorneyData';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildSocialMetadata } from '../../../lib/seoMetadata';
import type { Language } from '../../../lib/translations';
import AttorneyProfile from './AttorneyProfile';

const SITE_URL = 'https://www.manuelsolis.com';
// El layout añade ' | Manuel Solís' (15 caracteres) vía template. Con nombre +
// especialidad hay perfiles que se iban a 84 caracteres, y Google corta ~60:
// cuando no cabe todo, la especialidad del abogado pesa más en la SERP que
// repetir la marca, así que el título se emite como `absolute` sin el sufijo.
const BRAND_SUFFIX_LENGTH = 15;
const TITLE_LIMIT = 60;
// `education` mezcla instituciones con títulos y logros ("Juris Doctor",
// "30+ Años de Experiencia"): solo lo primero puede ir en `alumniOf`, porque
// declarar un logro como EducationalOrganization es un dato falso.
const INSTITUTION_MARKER = /universi|univ\b|college|school|escuela|facultad|law center|institut/i;

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
  const language: Language = isEs ? 'es' : 'en';
  const attorney = attorneys.find(a => a.id === slug);

  if (!attorney) return { title: 'Not Found' };

  // El área de práctica declarada titula el perfil; sin ella cae al término
  // genérico de `role`, nunca a una especialidad que el abogado no ejerce.
  const specialty = (attorney.practice?.label ?? attorney.role)[language];
  const title = `${attorney.name} | ${specialty}`;

  // `bio[0]` es un párrafo visible del perfil y en varios abogados pasa de 300
  // caracteres: cuando existe `seoDescription` se usa esa versión corta.
  const description = attorney.seoDescription?.[language] ?? attorney.bio[language][0];

  return {
    title: title.length + BRAND_SUFFIX_LENGTH <= TITLE_LIMIT ? title : { absolute: title },
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/abogados/${slug}`,
      languages: {
        es: `${SITE_URL}/es/abogados/${slug}`,
        en: `${SITE_URL}/en/abogados/${slug}`,
        'x-default': `${SITE_URL}/es/abogados/${slug}`,
      },
    },
    ...buildSocialMetadata({
      lang: language,
      path: `/${lang}/abogados/${slug}`,
      title,
      description,
      // `socialImage` y no `image`: la foto de perfil es un retrato vertical de
      // hasta 11,3 MB en el blob, y og:image se sirve crudo (no pasa por
      // next/image). Ver el comentario de socialImage en attorneyData.ts.
      images: [{ url: attorney.socialImage ?? attorney.image, alt: `${attorney.name} — ${attorney.role[language]}` }],
    }),
  };
}

// Person schema (JSON-LD)
function getPersonSchema(attorney: typeof attorneys[number], lang: string) {
  const isEs = lang === 'es';
  const location = getAttorneyLocation(attorney.id);
  const schools = attorney.education
    .map(edu => getText(edu, isEs ? 'es' : 'en'))
    .filter(name => INSTITUTION_MARKER.test(name));

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
    // Se omite si ninguna entrada de `education` nombra una institución (p. ej.
    // un perfil que solo declara "Juris Doctor"): un array vacío no aporta y
    // rellenarlo con el texto tal cual inventaría una escuela.
    ...(schools.length
      ? {
          alumniOf: schools.map(name => ({
            '@type': 'EducationalOrganization',
            name,
          })),
        }
      : {}),
    // Solo las áreas que la bio del abogado declara. Se omite por completo
    // cuando no hay ninguna: knowsAbout es opcional y afirmar pericia que no
    // consta sería información profesional incorrecta.
    ...(attorney.practice ? { knowsAbout: attorney.practice.topics } : {}),
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
