import { generateBlogPostingSchema, generateFAQSchema } from '../../lib/blogSchema';
import { getArticleSection } from '../../lib/blogCategories';

interface BlogSchemaProps {
  title: string;
  description: string;
  slug: string;
  date: string;
  /** Fecha de última revisión real; si se omite, no se emite `dateModified`. */
  dateModified?: string;
  image: string;
  lang: string;
  readTime?: string;
  faqs?: { question: string; answer: string }[];
}

/**
 * Renders BlogPosting + optional FAQPage JSON-LD schema.
 * Drop this component anywhere inside a blog post page.
 */
export default function BlogSchema({
  title,
  description,
  slug,
  date,
  dateModified,
  image,
  lang,
  readTime,
  faqs,
}: BlogSchemaProps) {
  // La categoría se deriva del slug, no se pide como prop: así los 55
  // artículos la declaran sin tocar 55 ficheros, y no puede quedar a medias.
  const articleSection = getArticleSection(slug, lang) ?? undefined;

  const blogSchema = generateBlogPostingSchema({
    title,
    description,
    slug,
    date,
    dateModified,
    image,
    lang,
    readTime,
    articleSection,
  });

  // Sin una fecha de revisión real, omitimos `dateModified`: repetir
  // `datePublished` le declara a Google una actualización que nunca ocurrió.
  const jsonLd: Record<string, unknown> = { ...blogSchema };
  if (!dateModified) delete jsonLd.dateModified;

  const faqSchema = faqs && faqs.length > 0 ? generateFAQSchema(faqs) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
