import type { Metadata } from 'next';
import type { Language } from './translations';

/**
 * Constructor de `openGraph` y `twitter` para las páginas.
 *
 * POR QUÉ EXISTE: en el App Router, el `openGraph` de una página NO se fusiona
 * campo a campo con el del layout — lo REEMPLAZA. Cualquier página que declaraba
 * su propio `openGraph: { title, description }` perdía en silencio el
 * `siteName`, el `locale`, las imágenes y la `url` que el layout aportaba. En la
 * auditoría de agosto de 2026 eso afectaba a 167 de las 295 páginas
 * prerenderizadas, que salían a Facebook y WhatsApp sin locale ni nombre de
 * sitio, y a 27 sin `og:url`.
 *
 * Usar estos helpers en `generateMetadata` en lugar de escribir el objeto a mano
 * mantiene el bloque completo sin tener que repetir los valores base.
 */

export const SITE_URL = 'https://www.manuelsolis.com';
const SITE_NAME = 'Manuel Solis Law Firm';
const DEFAULT_IMAGE = '/og-default.jpg';

export interface OgImageInput {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

interface BuildSocialInput {
  lang: Language;
  /** Ruta absoluta del sitio, con el prefijo de idioma: '/es/servicios/visa-u'. */
  path: string;
  title: string;
  description: string;
  /** Sin imágenes se usa la de marca, que siempre existe en public/. */
  images?: OgImageInput[];
  /** 'article' para entradas de blog y ediciones del boletín. */
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

function absolute(url: string): string {
  return url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

function normalizePath(path: string): string {
  const withSlash = path.startsWith('/') ? path : `/${path}`;
  // Sin barra final: es la forma canónica del sitio (proxy.ts la normaliza).
  return withSlash.length > 1 && withSlash.endsWith('/') ? withSlash.slice(0, -1) : withSlash;
}

export function buildOpenGraph(input: BuildSocialInput): Metadata['openGraph'] {
  const { lang, path, title, description, images, type = 'website', publishedTime, modifiedTime } = input;
  const resolved = (images?.length ? images : [{ url: DEFAULT_IMAGE, width: 1200, height: 630, alt: SITE_NAME }]).map(
    (image) => ({
      url: absolute(image.url),
      width: image.width ?? 1200,
      height: image.height ?? 630,
      alt: image.alt ?? title,
    }),
  );

  return {
    title,
    description,
    url: `${SITE_URL}${normalizePath(path)}`,
    siteName: SITE_NAME,
    locale: lang === 'es' ? 'es_US' : 'en_US',
    type,
    images: resolved,
    ...(type === 'article' && publishedTime ? { publishedTime } : {}),
    ...(type === 'article' && modifiedTime ? { modifiedTime } : {}),
  };
}

export function buildTwitter(input: Pick<BuildSocialInput, 'title' | 'description' | 'images'>): Metadata['twitter'] {
  const { title, description, images } = input;
  return {
    // Sin `creator`: la cuenta de X se retiró. La tarjeta se queda porque el
    // formato lo leen Slack, Discord y otros, no solo X. Ver app/[lang]/layout.tsx.
    card: 'summary_large_image',
    title,
    description,
    images: (images?.length ? images.map((i) => i.url) : [DEFAULT_IMAGE]).map(absolute),
  };
}

/** Atajo para las páginas que solo necesitan las dos superficies sociales. */
export function buildSocialMetadata(input: BuildSocialInput): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: buildOpenGraph(input),
    twitter: buildTwitter(input),
  };
}
