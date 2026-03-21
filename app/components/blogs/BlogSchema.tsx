import { generateBlogPostingSchema, generateFAQSchema } from '../../lib/blogSchema';

interface BlogSchemaProps {
  title: string;
  description: string;
  slug: string;
  date: string;
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
  image,
  lang,
  readTime,
  faqs,
}: BlogSchemaProps) {
  const blogSchema = generateBlogPostingSchema({
    title,
    description,
    slug,
    date,
    image,
    lang,
    readTime,
  });

  const faqSchema = faqs && faqs.length > 0 ? generateFAQSchema(faqs) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
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
