import type { Metadata } from 'next';
import { buildSocialMetadata } from '../../lib/seoMetadata';
import { isPublished } from '../../lib/blogSchedule';
import type { BlogArticleContent } from './articleModel';

const SITE_URL = 'https://www.manuelsolis.com';

/**
 * Tamaño real de las portadas del blog, en public/blog/covers/.
 *
 * Se declaran los píxeles que el archivo tiene de verdad, no los 1200x630
 * nominales de una imagen social genérica: `og:image:width` y `height`
 * describen el archivo que se sirve, y anunciar unas medidas que no son las
 * suyas hace que Facebook y WhatsApp reserven un hueco con la proporción
 * equivocada. Todas las portadas se normalizan a 16:9 al colocarlas, así que
 * esta constante vale para todas.
 */
const COVER_WIDTH = 1600;
const COVER_HEIGHT = 900;

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
  // Un artículo programado responde 404 (lo corta BlogArticleLayout), pero
  // `generateMetadata` se ejecuta igual y esa página de error acababa
  // publicando el titular, el resumen y la portada del artículo en sus
  // etiquetas og — o sea, filtrando por adelantado justo lo que se comparte en
  // redes. Aquí no se devuelve nada del contenido.
  if (!isPublished({ slug, date: isoDate })) {
    return { title: lang === 'es' ? 'Artículo no disponible' : 'Article not available', robots: { index: false, follow: false } };
  }

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
      images: [
        { url: `${SITE_URL}${image}`, width: COVER_WIDTH, height: COVER_HEIGHT, alt: content.title },
      ],
      type: 'article',
      publishedTime: isoDate,
      modifiedTime: isoModified,
    }),
  };
}
