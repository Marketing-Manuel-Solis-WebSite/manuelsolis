import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BlogCard from '../../../components/blogs/BlogCard';
import { Stagger, StaggerItem } from '../../../components/motion';
import { BLOG_DATA } from '../../blog/page';

/**
 * Noticias Legales de Inmigración — hub de actualidad, server-first.
 *
 * Aquí vivía una tarjeta "en construcción" con una barra de progreso del 26%
 * (dato inventado) y texto sólo en español. El sitio sí publica actualidad: se
 * deriva de BLOG_DATA (fuente única, /[lang]/blog/page.tsx) igual que las dos
 * páginas de /category/*, así que cada tarjeta apunta a un artículo vivo.
 *
 * NEWS_SLUGS es curado a mano porque "actualidad" no es una categoría de
 * BLOG_DATA: son los artículos que cubren un cambio concreto de ley, de
 * jurisprudencia o de aplicación (fallo de la Corte Suprema, DACA en los
 * tribunales, TPS, asilo en la frontera, Advance Parole, redadas de ICE) frente
 * a las guías atemporales. Al publicar un artículo de actualidad nuevo hay que
 * añadir su slug aquí; un slug que ya no exista en BLOG_DATA simplemente no
 * pinta tarjeta (el filtro es una intersección).
 */
const NEWS_SLUGS = [
  'ciudadania-por-nacimiento-2026-hijos-padres-indocumentados',
  'redadas-ice-2026-derechos-plan-emergencia-familiar',
  'como-encontrar-detenido-ice-localizador-pasos',
  'daca-2026-estado-legal-tribunales',
  'tps-2026-paises-elegibles-renovacion',
  'asilo-frontera-2026-puerto-entrada-vs-cruce',
  'advance-parole-2026-viajar-con-daca-tps-visa-u',
];

const copy = {
  eyebrow: { es: 'Actualidad Migratoria', en: 'Immigration Updates' },
  titleLead: { es: 'Noticias', en: 'Immigration' },
  titleRest: { es: 'de Inmigración', en: 'News' },
  subtitle: {
    es: 'Los cambios de ley, de jurisprudencia y de aplicación que sí afectan tu caso: ciudadanía por nacimiento, DACA en los tribunales, TPS, asilo en la frontera, Advance Parole y redadas de ICE. Cada nota enlaza al análisis completo.',
    en: 'The changes in law, case law and enforcement that actually affect your case: birthright citizenship, DACA in the courts, TPS, asylum at the border, Advance Parole and ICE raids. Each item links to the full analysis.',
  },
  updated: { es: 'Última actualización', en: 'Last updated' },
  viewAll: { es: 'Ver todo el blog', en: 'View the full blog' },
  rights: { es: 'Derechos de migrantes', en: 'Migrant rights' },
};

export default function NoticiasClient({ lang }: { lang: 'es' | 'en' }) {
  const posts = BLOG_DATA.posts
    .filter((post) => NEWS_SLUGS.includes(post.slug))
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title[lang],
      excerpt: post.excerpt[lang],
      category: post.category[lang],
      author: post.author,
      date: post.date,
      readTime: post.readTime,
      image: post.image,
    }));

  // `date` es ISO sin hora ('2026-07-03'): se lee como medianoche UTC, así que
  // hay que formatear en UTC para que el servidor y los visitantes al oeste de
  // Greenwich vean el mismo día (mismo criterio que BlogCard).
  const lastUpdated = posts.length
    ? new Date(posts[0].date).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      })
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#002342] text-white relative">
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-grow relative pt-36 md:pt-44 pb-20 px-4">
        {/* FONDO (estático) — misma identidad navy + retícula dorada de la página */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-[#003366] rounded-full mix-blend-screen filter blur-[150px] opacity-40"></div>

          <svg className="absolute inset-0 w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="noticias-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#B2904D" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#noticias-grid)" />
            <line x1="0" y1="100%" x2="100%" y2="0" stroke="#B2904D" strokeWidth="1" opacity="0.2" />
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto">
          {/* --- HERO (estático — LCP) --- */}
          <div className="w-full mb-16 md:mb-20 text-center">
            <span className="inline-block text-sm font-bold tracking-widest text-[#B2904D] uppercase mb-4 drop-shadow-[0_0_10px_rgba(178,144,77,0.3)]">
              {copy.eyebrow[lang]}
            </span>

            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              <span className="text-[#B2904D] drop-shadow-md">{copy.titleLead[lang]}</span>{' '}
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                {copy.titleRest[lang]}
              </span>
            </h1>

            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#B2904D] to-transparent mx-auto rounded-full" />

            <p className="mt-8 text-base md:text-lg text-blue-100/70 max-w-3xl mx-auto font-light leading-relaxed">
              {copy.subtitle[lang]}
            </p>

            {lastUpdated && (
              <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/40">
                {copy.updated[lang]}: {lastUpdated}
              </p>
            )}
          </div>

          {/* --- GRID DE NOTICIAS --- */}
          <Stagger
            gap={0.1}
            className="w-full grid gap-8 sm:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            amount={0.01}
          >
            {posts.map((post) => (
              <StaggerItem key={post.id} as="div" className="w-full">
                <BlogCard post={post} lang={lang} />
              </StaggerItem>
            ))}
          </Stagger>

          {/* --- SALIDAS --- */}
          <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${lang}/blog`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#B2904D] text-[#002342] text-sm font-bold tracking-wide hover:bg-[#d4af67] transition-colors duration-300"
            >
              {copy.viewAll[lang]}
              <ArrowRight size={16} />
            </Link>

            <Link
              href={`/${lang}/category/derechos-de-migrantes`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-[#B2904D]/40 text-[#B2904D] text-sm font-medium tracking-wide hover:bg-[#B2904D] hover:text-[#002342] transition-colors duration-300"
            >
              {copy.rights[lang]}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
