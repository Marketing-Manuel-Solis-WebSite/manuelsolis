import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { collaborators, getCollaborator } from '../../../lib/collaboratorData';
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { buildSocialMetadata } from '../../../lib/seoMetadata';
import type { Language } from '../../../lib/translations';
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

/**
 * Descripción de la ficha, para el `<meta description>` y para el `description`
 * del Person: la biografía si la hay y, si no, una compuesta con lo que sí
 * consta —nombre, cargo y oficina—.
 *
 * Vive aquí y no duplicada en las dos funciones que la necesitan porque el
 * `<meta>` y el JSON-LD tienen que decir lo MISMO: que difieran es justo el
 * hallazgo de "contenido no coincidente" que este repo lleva meses cerrando en
 * otras plantillas. Y nunca se inventa un párrafo para rellenar el hueco.
 */
function collaboratorDescription(
  collaborator: (typeof collaborators)[number],
  language: 'es' | 'en',
): string {
  return (
    collaborator.description?.[language][0] ??
    [`${collaborator.name} — ${collaborator.role[language]}`, collaborator.office?.[language]]
      .filter(Boolean)
      .join('. ')
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const isEs = lang === 'es';
  const language: Language = isEs ? 'es' : 'en';
  const collaborator = getCollaborator(slug);

  if (!collaborator) return { title: 'Not Found' };

  const role = collaborator.role[language];
  // Sin sufijo de marca: el template del layout ('%s | Manuel Solís') lo añade.
  const title = `${collaborator.name} | ${role}`;
  const description = collaboratorDescription(collaborator, language);

  return {
    title,
    description,
    // Sección oculta (2026-09-01): fuera del footer y fuera del sitemap. El
    // noindex saca de Google las URLs ya indexadas; la página sigue sirviéndose
    // para no romper los enlaces que ya están repartidos.
    robots: { index: false, follow: false },
    alternates: {
      canonical: `${SITE_URL}/${lang}/colaboradores/${slug}`,
      languages: {
        es: `${SITE_URL}/es/colaboradores/${slug}`,
        en: `${SITE_URL}/en/colaboradores/${slug}`,
        'x-default': `${SITE_URL}/es/colaboradores/${slug}`,
      },
    },
    ...buildSocialMetadata({
      lang: language,
      path: `/${lang}/colaboradores/${slug}`,
      title,
      description,
      images: [{ url: collaborator.image, alt: `${collaborator.name} — ${role}` }],
    }),
  };
}

// Person schema (JSON-LD)
function getPersonSchema(collaborator: typeof collaborators[number], lang: string) {
  const isEs = lang === 'es';

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    // Mismo patrón de @id que /abogados/[slug] y que el autor del blog
    // (blogSchema.ts): consolida la persona en una sola entidad del grafo.
    '@id': `${SITE_URL}/#person-${collaborator.id}`,
    name: collaborator.name,
    jobTitle: collaborator.role[isEs ? 'es' : 'en'],
    // Absoluta siempre: la foto puede venir de public/ o de blob storage.
    image: collaborator.image.startsWith('http')
      ? collaborator.image
      : `${SITE_URL}${collaborator.image}`,
    // Se omite la propiedad si no hay dirección: `mailto:undefined` en un
    // Person es un dato falso, y omitir nunca es una discrepancia.
    ...(collaborator.email ? { email: `mailto:${collaborator.email}` } : {}),
    description: collaboratorDescription(collaborator, isEs ? 'es' : 'en'),
    // La oficina asignada es un dato real de la persona, no solo un texto de
    // la ficha: se declara también como `workLocation`.
    ...(collaborator.office
      ? { workLocation: { '@type': 'Place', name: collaborator.office[isEs ? 'es' : 'en'] } }
      : {}),
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
      {/* `type` antes de `id`: React serializa los atributos en el orden de las
          props y varias herramientas de auditoría (la nuestra incluida) buscan
          `<script type="application/ld+json"` literal y no veían estos bloques. */}
      <script
        type="application/ld+json"
        id={`person-schema-${slug}`}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        id={`breadcrumb-schema-${slug}`}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CollaboratorProfile slug={slug} lang={lang} />
    </>
  );
}
