import type { Metadata } from 'next';
import { buildSocialMetadata } from '../../lib/seoMetadata';
import type { BlogArticleContent } from './articleModel';

const SITE_URL = 'https://www.manuelsolis.com';

/**
 * Metadatos de un artículo del blog.
 *
 * Pasa por `buildSocialMetadata` y no por un objeto `openGraph` escrito a mano
 * por el motivo que documenta app/lib/seoMetadata.ts: en el App Router el
 * `openGraph` de una página REEMPLAZA al del layout en vez de fusionarse, así
 * que escribirlo a mano hace perder en silencio `siteName`, `locale` y las
 * imágenes. Eso ya pasó en 167 páginas de este sitio.
 */
export function buildArticleMetadata({
  slug,
  lang,
  content,
  image,
  isoDate,
  isoModified,
}: {
  slug: string;
  lang: 'es' | 'en';
  content: BlogArticleContent;
  image: string;
  isoDate: string;
  isoModified?: string;
}): Metadata {
  return {
    title: content.metaTitle,
    description: content.metaDesc,
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/${slug}`,
      languages: {
        es: `${SITE_URL}/es/blog/${slug}`,
        en: `${SITE_URL}/en/blog/${slug}`,
        'x-default': `${SITE_URL}/es/blog/${slug}`,
      },
    },
    ...buildSocialMetadata({
      lang,
      path: `/${lang}/blog/${slug}`,
      title: content.metaTitle,
      description: content.metaDesc,
      images: [{ url: `${SITE_URL}${image}`, width: 1200, height: 630, alt: content.title }],
      type: 'article',
      publishedTime: isoDate,
      modifiedTime: isoModified,
    }),
  };
}
