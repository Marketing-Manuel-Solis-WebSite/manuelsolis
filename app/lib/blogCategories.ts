import { BLOG_DATA } from '../[lang]/blog/page';

/**
 * La taxonomía del blog, en un solo sitio.
 *
 * Los posts llevan cinco `categoryId` distintos (`accidentes`,
 * `defensa-deportacion`, `procesos-migratorios`, `visa-humanitaria`, `visa-u`,
 * más `visa-VAWA` y `visa-T` en algunos) y el sitio publica TRES páginas de
 * categoría, así que la relación es de varios a uno. Ese mapa vivía solo dentro
 * de `sitemapData.ts` como `CATEGORY_POST_IDS`, usado para calcular un
 * `lastmod`; aquí pasa a ser la fuente que también alimenta el marcado.
 *
 * Qué arregla: la verificación de clústeres del 26-ago-2026 (paso 06) midió
 * que la taxonomía era de una sola dirección — las categorías bajan a los
 * posts y **0 de 55** `BlogPosting` declaraban `articleSection`. La categoría
 * existía en los datos y en las páginas renderizadas, y en ninguna parte de los
 * datos estructurados.
 *
 * Lo que este módulo NO hace todavía, y es deliberado: no cambia la miga de pan
 * a cuatro niveles (Inicio → Blog → Categoría → Artículo). Eso toca los 35
 * artículos escritos a mano uno por uno, y va en su propio cambio.
 */

export type BlogCategory = {
  /** Slug de la página en /category/<slug>. */
  slug: string;
  label: { es: string; en: string };
  /** `categoryId`s de BLOG_DATA que caen en esta página. */
  postIds: readonly string[];
};

export const BLOG_CATEGORIES: readonly BlogCategory[] = [
  {
    slug: 'procesos-migratorios',
    label: { es: 'Procesos Migratorios', en: 'Immigration Processes' },
    postIds: ['procesos-migratorios'],
  },
  {
    slug: 'derechos-de-migrantes',
    label: { es: 'Derechos de Migrantes', en: 'Migrant Rights' },
    postIds: ['defensa-deportacion', 'accidentes'],
  },
  {
    slug: 'proteccion-legal-para-migrantes',
    label: { es: 'Protección Legal', en: 'Legal Protection' },
    postIds: ['visa-u', 'visa-VAWA', 'visa-T', 'visa-humanitaria'],
  },
];

/** `categoryId` → categoría. Se construye una vez, no por artículo. */
const POR_CATEGORY_ID = new Map<string, BlogCategory>(
  BLOG_CATEGORIES.flatMap((c) => c.postIds.map((id) => [id, c] as const)),
);

/** Slug de artículo → categoría, derivado de BLOG_DATA (no una segunda copia). */
const POR_SLUG = new Map<string, BlogCategory>(
  BLOG_DATA.posts
    .map((p) => [p.slug, POR_CATEGORY_ID.get(p.categoryId)] as const)
    .filter((e): e is readonly [string, BlogCategory] => Boolean(e[1])),
);

/**
 * Categoría de un artículo, o `null` si su `categoryId` no cae en ninguna
 * página. Devolver null y no una cadena vacía es a propósito: quien llama omite
 * la propiedad en vez de emitir `articleSection: ""`, que es peor que no
 * declararla.
 */
export function getBlogCategory(slug: string): BlogCategory | null {
  return POR_SLUG.get(slug) ?? null;
}

/** Etiqueta lista para `articleSection`, en el idioma de la página. */
export function getArticleSection(slug: string, lang: string): string | null {
  const cat = getBlogCategory(slug);
  if (!cat) return null;
  return lang === 'en' ? cat.label.en : cat.label.es;
}
