const SITE_URL = 'https://www.manuelsolis.com';

interface BlogSchemaInput {
  title: string;
  description: string;
  slug: string;
  date: string; // ISO date string e.g. '2025-04-04'
  image: string; // relative path e.g. '/blog/blog_20/BLOG10_CR1.png'
  lang: string;
  readTime?: string;
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
    dateModified: input.date,
    url: `${SITE_URL}/${input.lang}/blog/${input.slug}`,
    image: `${SITE_URL}${input.image}`,
    inLanguage: input.lang,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${input.lang}/blog/${input.slug}`,
    },
    author: {
      '@type': 'Person',
      name: 'Manuel Solís',
      url: `${SITE_URL}/${input.lang}/abogados`,
      jobTitle: input.lang === 'es' ? 'Fundador & Abogado Principal' : 'Founder & Lead Attorney',
      knowsAbout: [
        'Immigration Law',
        'U Visa',
        'VAWA',
        'Deportation Defense',
        'Asylum',
      ],
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Manuel Solis Law Firm',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo-manuel-solis.png`,
      },
    },
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
