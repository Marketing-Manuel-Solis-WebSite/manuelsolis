import React from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BlogCard from '../../../components/blogs/BlogCard';
import { Stagger, StaggerItem } from '../../../components/motion';
import { BLOG_DATA } from '../../blog/page';

/**
 * Category: Derechos de Migrantes — server-first (Fase 2.3 blog). El listado se
 * deriva de BLOG_DATA (fuente única) filtrando por `categoryId`, así que cada
 * tarjeta apunta a un post vivo (/{lang}/blog/{slug}). Purely presentational
 * (no interactive state), so it's a pure Server Component: the bilingual `copy`
 * resolves to the active `lang` on the server and the inactive locale never
 * reaches the client bundle (enfoque b). Las tarjetas son el mismo <BlogCard>
 * del índice del blog; el grid entra con Stagger.
 */

// IDs de BLOG_DATA.categories que alimentan esta categoría: derechos frente a
// ICE y defensa contra la deportación + derechos tras un accidente o lesión.
const CATEGORY_IDS = ['defensa-deportacion', 'accidentes'];

const copy = {
  library: { es: 'Biblioteca Legal', en: 'Legal Library' },
  title: { es: 'Derechos de Migrantes', en: 'Migrant Rights' },
  subtitle: {
    es: 'Tus derechos frente a ICE, durante un proceso de deportación y después de un accidente o una lesión de trabajo, explicados por nuestros abogados.',
    en: 'Your rights before ICE, during a deportation case, and after an accident or a work injury, explained by our attorneys.',
  },
  viewAll: { es: 'Ver todos los artículos', en: 'View all articles' },
};

// --- COMPONENTE DE PÁGINA ---
export default function DerechosMigrantesClient({ lang }: { lang: 'es' | 'en' }) {
  const posts = BLOG_DATA.posts
    .filter((post) => CATEGORY_IDS.includes(post.categoryId))
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

  const [titleFirstWord, ...titleRestWords] = copy.title[lang].split(' ');

  return (
    <div className={`min-h-screen w-full bg-[#001540] text-white`}>

      <Header />

      {/* =========================================================================
          FONDO (Fixed - Cubre toda la página) — orbes estáticos
      ========================================================================= */}
      <div className="fixed inset-0 z-0 w-full h-full bg-[#001540] overflow-hidden">
        {/* Gradiente Azul Profundo */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />

        {/* Ruido de textura */}
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>

        {/* Orbes de luz (estáticos) - CONTENIDOS */}
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-blue-600/10 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-sky-800/10 rounded-full blur-[150px] opacity-30" />

        {/* Texto de Fondo Sutil - CONTENIDO (estático) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
          <span className="text-[60vh] font-black italic text-white tracking-tighter whitespace-nowrap">
            DERECHOS
          </span>
        </div>
      </div>

      {/* MAIN CONTENT - Con overflow-x-hidden y contenido centrado */}
      <main id="main-content" tabIndex={-1} className="relative z-10 w-full overflow-x-hidden">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-50 pb-20">

          {/* --- HERO/HEADER SECTION (static — LCP) --- */}
          <div className="w-full mb-20 text-center">
            <span className="inline-block text-sm font-bold tracking-widest text-[#B2904D] uppercase mb-4 drop-shadow-[0_0_10px_rgba(178,144,77,0.3)]">
              {copy.library[lang]}
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4 tracking-tighter leading-tight px-4">
              <span className="font-extrabold text-[#B2904D] drop-shadow-lg">{titleFirstWord}</span>
              <span className="block text-white/90">{titleRestWords.join(' ')}</span>
            </h1>

            <div className="h-1 w-24 bg-gradient-to-r from-[#002868] to-[#B2904D] mx-auto rounded-full mt-6" />

            <p className="mt-8 text-lg sm:text-xl text-blue-100/70 max-w-3xl mx-auto font-light leading-relaxed px-4">
              {copy.subtitle[lang]}
            </p>
          </div>

          {/* --- GRID DE ARTÍCULOS --- */}
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

          {/* --- SALIDA AL ÍNDICE DEL BLOG --- */}
          <div className="mt-16 text-center">
            <Link
              href={`/${lang}/blog`}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#B2904D]/40 text-[#B2904D] text-sm font-medium tracking-wide hover:bg-[#B2904D] hover:text-[#001540] transition-colors duration-300"
            >
              {copy.viewAll[lang]}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
