import { generateBreadcrumbSchema } from '../lib/breadcrumbSchema';

/**
 * Emite el BreadcrumbList de una página, con "Inicio" ya puesto.
 *
 * Nació de una auditoría del HTML prerenderizado (2026-08-05): 20 de las 292
 * páginas públicas no emitían ningún BreadcrumbList — /abogados,
 * /acceso-clientes, /colaboradores, /informacion/faq, /informacion/recursos,
 * /nosotros, /privacidad, /sms-terminos, /terminos y /testimonios, en los dos
 * idiomas. El resto del sitio ya lo emitía, así que era una omisión, no una
 * decisión.
 *
 * Existe como componente para no repetir el mismo bloque de
 * dangerouslySetInnerHTML en diez archivos, que es como se acaba con diez
 * variantes ligeramente distintas.
 *
 * IMPORTANTE: cada `path` del rastro tiene que ser una ruta que exista de
 * verdad. Un breadcrumb que enlaza a una página inexistente le da a Google una
 * jerarquía falsa. Por eso /informacion/faq y /informacion/recursos NO pasan por
 * un nivel "/informacion": esa carpeta no tiene page.tsx y responde 404.
 */

export type Crumb = {
  es: string;
  en: string;
  /** Ruta SIN el prefijo de idioma, empezando por "/". */
  path: string;
};

export default function BreadcrumbSchema({
  lang,
  trail,
}: {
  lang: 'es' | 'en';
  trail: Crumb[];
}) {
  const items = [
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    ...trail.map((c) => ({ name: c[lang], url: `/${lang}${c.path}` })),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(items)) }}
    />
  );
}
