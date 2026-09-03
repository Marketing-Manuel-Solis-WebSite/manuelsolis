import { ORG_REF } from './schemaOrg';

const SITE_URL = 'https://www.manuelsolis.com';

interface BlogSchemaInput {
  title: string;
  description: string;
  slug: string;
  date: string; // ISO date string e.g. '2026-04-04'
  /**
   * Fecha de una revisión real del contenido. Si se omite, la propiedad NO se
   * emite: no se cae a `date`. (El comentario anterior decía lo contrario y no
   * coincidía con el código de abajo.) Rellenarla con la fecha de publicación
   * —o con la del build— declararía una revisión que nunca ocurrió, y en
   * contenido legal que caduca esa fecha es justo la que el lector usa para
   * decidir si fiarse.
   */
  dateModified?: string;
  image: string; // relative path e.g. '/blog/blog_20/BLOG10_CR1.png'
  lang: string;
  readTime?: string;
  /**
   * Categoría del artículo (`articleSection`). Se omite si no llega: 0 de 55
   * posts la declaraban antes, y una cadena vacía sería peor que nada.
   */
  articleSection?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generates BlogPosting JSON-LD schema with enhanced author data for E-E-A-T.
 */
export function generateBlogPostingSchema(input: BlogSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.title,
    description: input.description,
    datePublished: input.date,
    ...(input.articleSection ? { articleSection: input.articleSection } : {}),
    // Sin dateModified real se omite la propiedad: rellenarla con la fecha de
    // publicación declara una revisión que nunca ocurrió, y en contenido legal
    // que caduca esa fecha es justo lo que el lector usa para confiar.
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    url: `${SITE_URL}/${input.lang}/blog/${input.slug}`,
    image: `${SITE_URL}${input.image}`,
    inLanguage: input.lang,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${input.lang}/blog/${input.slug}`,
    },
    author: {
      '@type': 'Person',
      // Mismo @id que emite el perfil /abogados/manuel-solis: consolida la
      // entidad autor↔perfil para E-E-A-T.
      '@id': `${SITE_URL}/#person-manuel-solis`,
      name: 'Manuel Solís',
      url: `${SITE_URL}/${input.lang}/abogados/manuel-solis`,
      image: `${SITE_URL}/abogado-manuel-solis.jpg`,
      jobTitle: input.lang === 'es' ? 'Fundador & Abogado Principal' : 'Founder & Lead Attorney',
      knowsAbout: [
        'Immigration Law',
        'U Visa',
        'VAWA',
        'Deportation Defense',
        'Asylum',
      ],
    },
    // Referencia por @id pelado, no una segunda declaración: el nodo completo
    // (nombre, logo, dirección) lo emite el layout en esta misma página. Ver
    // app/lib/schemaOrg.ts.
    publisher: ORG_REF,
    ...(input.readTime && {
      timeRequired: `PT${parseInt(input.readTime)}M`,
    }),
  };
}

/**
 * Generates FAQPage JSON-LD schema from a list of Q&A pairs.
 * Only use when the blog post has clear FAQ-formatted content.
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  if (faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
