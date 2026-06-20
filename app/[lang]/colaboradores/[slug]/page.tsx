import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { collaborators, getCollaborator } from '../../../lib/collaboratorData';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import CollaboratorProfile from './CollaboratorProfile';

const SITE_URL = 'https://www.manuelsolis.com';

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

// Generate every collaborator x 2 languages as static pages.
export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of ['es', 'en']) {
    for (const collaborator of collaborators) {
      params.push({ lang, slug: collaborator.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const isEs = lang === 'es';
  const collaborator = getCollaborator(slug);

  if (!collaborator) return { title: 'Not Found' };

  const role = collaborator.role[isEs ? 'es' : 'en'];
  const title = `${collaborator.name} | ${role} - Manuel Solís`;
  const description = collaborator.description[isEs ? 'es' : 'en'][0];

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/colaboradores/${slug}`,
      languages: {
        es: `${SITE_URL}/es/colaboradores/${slug}`,
        en: `${SITE_URL}/en/colaboradores/${slug}`,
        'x-default': `${SITE_URL}/es/colaboradores/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/colaboradores/${slug}`,
      images: [collaborator.image],
      type: 'profile',
    },
  };
}

// Person schema (JSON-LD)
function getPersonSchema(collaborator: typeof collaborators[number], lang: string) {
  const isEs = lang === 'es';

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: collaborator.name,
    jobTitle: collaborator.role[isEs ? 'es' : 'en'],
    image: `${SITE_URL}${collaborator.image}`,
    email: `mailto:${collaborator.email}`,
    description: collaborator.description[isEs ? 'es' : 'en'][0],
    url: `${SITE_URL}/${lang}/colaboradores/${collaborator.id}`,
    // Reference the canonical firm Organization node (app/[lang]/layout.tsx
    // #organization) instead of re-declaring an anonymous one, so the entity
    // graphs consolidate rather than fragment.
    worksFor: { '@id': `${SITE_URL}/#organization` },
    // `sameAs` on a Person must point to that individual's own profiles — emit
    // it only when the collaborator has them. Never the firm's links.
    ...(collaborator.socialProfiles?.length
      ? { sameAs: collaborator.socialProfiles }
      : {}),
  };
}

// Breadcrumb schema
function getBreadcrumbSchema(collaborator: typeof collaborators[number], lang: string) {
  const isEs = lang === 'es';
  return generateBreadcrumbSchema([
    { name: isEs ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: isEs ? 'Colaboradores' : 'Collaborators', url: `/${lang}/colaboradores` },
    { name: collaborator.name, url: `/${lang}/colaboradores/${collaborator.id}` },
  ]);
}

export default async function CollaboratorPage({ params }: Props) {
  const { lang, slug } = await params;
  const collaborator = getCollaborator(slug);

  if (!collaborator) {
    notFound();
  }

  const personSchema = getPersonSchema(collaborator, lang);
  const breadcrumbSchema = getBreadcrumbSchema(collaborator, lang);

  return (
    <>
      <Script
        id={`person-schema-${slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Script
        id={`breadcrumb-schema-${slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CollaboratorProfile slug={slug} lang={lang} />
    </>
  );
}
