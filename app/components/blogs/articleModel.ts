/**
 * Modelo de contenido de un artículo del blog.
 *
 * Los 35 posts anteriores llevan cada uno ~400 líneas de JSX idéntico (hero,
 * resumen dorado, secciones con icono, FAQ, conclusión, fuentes, sidebar) y solo
 * cambian los textos. Copiar ese bloque una vez más por cada post nuevo son
 * miles de líneas duplicadas y, sobre todo, 20 sitios donde el layout puede
 * divergir sin que nada falle.
 *
 * Este modelo describe el contenido; `BlogArticleLayout` lo pinta reproduciendo
 * el mismo diseño. El objetivo es que un artículo nuevo sea un archivo de datos
 * y nada más.
 */

/** Nombres de icono admitidos. Se resuelven en el layout (los datos son planos). */
export type BlogIcon =
  | 'alert'
  | 'balance'
  | 'calendar'
  | 'car'
  | 'check'
  | 'clipboard'
  | 'clock'
  | 'dollar'
  | 'file'
  | 'gavel'
  | 'globe'
  | 'heart'
  | 'help'
  | 'home'
  | 'lock'
  | 'map'
  | 'phone'
  | 'plane'
  | 'search'
  | 'shield'
  | 'siren'
  | 'stethoscope'
  | 'swap'
  | 'thermometer'
  | 'users'
  | 'wallet';

/** Bloques que puede llevar una sección, en el orden en que se declaran. */
export type BlogBlock =
  /** Párrafo suelto. Admite HTML en línea (<strong>, <em>). */
  | { kind: 'text'; text: string }
  /** Lista con palomita verde: requisitos, documentos, señales. */
  | { kind: 'list'; items: string[] }
  /** Lista numerada: pasos de un proceso, en orden. */
  | { kind: 'steps'; items: string[] }
  /** Rejilla de tarjetas para comparar dos o más opciones. */
  | { kind: 'cards'; items: { title: string; desc: string }[] }
  /** Tabla simple: la usan los posts de tarifas y plazos. */
  | { kind: 'table'; headers: string[]; rows: string[][] }
  /** Aviso dorado al final de la sección: el matiz que la gente se salta. */
  | { kind: 'note'; text: string }
  /** Aviso rojo: consecuencia grave o error que cierra puertas. */
  | { kind: 'warning'; text: string };

export interface BlogSection {
  icon: BlogIcon;
  title: string;
  /** Antetítulo en versalitas doradas. */
  subtitle?: string;
  blocks: BlogBlock[];
}

export interface BlogArticleContent {
  metaTitle: string;
  metaDesc: string;
  title: string;
  /** Fecha ya formateada para mostrar, p. ej. "06 Ago, 2026". */
  displayDate: string;
  readTime: string;
  /** Etiqueta de categoría visible en la píldora dorada del hero. */
  categoryLabel: string;
  /**
   * Aviso de vigencia. Los posts atados a un fallo o a una regla en litigio lo
   * llevan: el lector tiene que saber a qué fecha corresponde lo que lee, y el
   * despacho tiene que saber qué revisar cuando algo cambie.
   */
  lastUpdated?: string;
  summary: { title: string; text: string };
  intro: string[];
  sections: BlogSection[];
  faq: { title: string; items: { q: string; a: string }[] };
  conclusion: { title: string; text: string; advice: string };
  sources: { title: string; list: string[] };
  ui: {
    back: string;
    share: string;
    authorRole: string;
    ctaButton: string;
    updatedLabel: string;
    disclaimer: string;
  };
}

/** Textos de interfaz comunes a todos los artículos, por idioma. */
export const ARTICLE_UI: Record<'es' | 'en', BlogArticleContent['ui']> = {
  es: {
    back: 'Volver al blog',
    share: 'Compartir artículo',
    authorRole: 'Fundador & Abogado Principal',
    ctaButton: 'Consultar con un Abogado Ahora',
    updatedLabel: 'Última actualización',
    // Un blog de un despacho que explica plazos y consecuencias necesita decir
    // dónde termina la información general y dónde empieza el caso concreto.
    disclaimer:
      'Este artículo es información general y no constituye asesoría legal ni crea una relación abogado-cliente. Las leyes migratorias cambian con frecuencia y cada caso depende de sus hechos. Consulte con un abogado antes de tomar cualquier decisión sobre su situación.',
  },
  en: {
    back: 'Back to blog',
    share: 'Share article',
    authorRole: 'Founder & Lead Attorney',
    ctaButton: 'Consult with an Attorney Now',
    updatedLabel: 'Last updated',
    disclaimer:
      'This article is general information and does not constitute legal advice or create an attorney-client relationship. Immigration law changes often and every case turns on its own facts. Speak with an attorney before making any decision about your situation.',
  },
};
