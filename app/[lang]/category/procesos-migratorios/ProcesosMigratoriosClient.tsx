import React from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BlogCard from '../../../components/blogs/BlogCard';
import { Stagger, StaggerItem } from '../../../components/motion';
import { BLOG_DATA } from '../../blog/page';

/**
 * Category: Procesos Migratorios — misma forma que las otras dos categorías
 * (server-first, listado derivado de BLOG_DATA por `categoryId`, presentacional
 * puro, así que es un Server Component y el locale inactivo no llega al cliente).
 *
 * Por qué existe: `procesos-migratorios` es el `categoryId` más grande del blog
 * —25 de los 55 posts— y era el único sin página. Los otros dos grupos ya tenían
 * la suya, así que entre el índice de 55 tarjetas y el artículo no había capa
 * temática para casi la mitad del archivo.
 *
 * El párrafo de entrada y el enlace al servicio pareado no son adorno: una
 * página que solo apila tarjetas es exactamente la página delgada que la
 * auditoría señala. El texto describe qué cubren los artículos y no afirma
 * requisitos, plazos ni resultados — eso vive en los artículos, revisados.
 */

// Un solo `categoryId`, a diferencia de las otras dos categorías: este grupo ya
// es el más numeroso del blog y mezclarlo con otro lo volvería un cajón.
const CATEGORY_IDS = ['procesos-migratorios'];

/** Servicio pareado, al que apunta el enlace de salida del texto de entrada. */
const PAIRED_SERVICE = '/servicios/inmigracion';

const copy = {
  library: { es: 'Biblioteca Legal', en: 'Legal Library' },
  title: { es: 'Procesos Migratorios', en: 'Immigration Processes' },
  subtitle: {
    es: 'Cómo funciona un trámite de inmigración por dentro: qué pide USCIS, en qué orden, y qué significa cada carta que llega por correo.',
    en: 'How an immigration filing actually works: what USCIS asks for, in what order, and what each letter that arrives in the mail means.',
  },
  // Dos o tres frases propias, no una lista de tarjetas: es la diferencia entre
  // una capa temática y una página delgada.
  intro: {
    es: 'Aquí están las guías sobre el camino administrativo de un caso: peticiones familiares, ajuste de estatus, permisos de trabajo, ciudadanía, y los momentos en que el trámite se detiene —un RFE, una entrevista, un expediente que hay que pedir antes de aplicar. Son los artículos que explican el procedimiento, no la estrategia de un caso concreto.',
    en: 'These are the guides to the administrative path of a case: family petitions, adjustment of status, work permits, citizenship, and the moments when a filing stalls — an RFE, an interview, a record you need to request before you apply. They explain the procedure, not the strategy of any particular case.',
  },
  introLink: {
    es: 'Ver los servicios de inmigración del despacho',
    en: 'See the firm’s immigration services',
  },
  articles: { es: 'Artículos sobre trámites y procedimientos', en: 'Articles on filings and procedure' },
  viewAll: { es: 'Ver todos los artículos', en: 'View all articles' },
};

// --- COMPONENTE DE PÁGINA ---
export default function ProcesosMigratoriosClient({ lang }: { lang: 'es' | 'en' }) {
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
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
          <span className="text-[60vh] font-black italic text-white tracking-tighter whitespace-nowrap">
            TRÁMITES
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
              <span className="font-extrabold text-[#B2904D] drop-shadow-lg">{titleFirstWord}</span>{' '}
              <span className="block text-white/90">{titleRestWords.join(' ')}</span>
            </h1>

            <div className="h-1 w-24 bg-gradient-to-r from-[#002868] to-[#B2904D] mx-auto rounded-full mt-6" />

            <p className="mt-8 text-lg sm:text-xl text-blue-100/70 max-w-3xl mx-auto font-light leading-relaxed px-4">
              {copy.subtitle[lang]}
            </p>
          </div>

          {/* --- TEXTO PROPIO + SALIDA AL SERVICIO PAREADO --- */}
          <div className="max-w-3xl mx-auto mb-20 text-center">
            <p className="text-base sm:text-lg text-blue-100/60 font-light leading-relaxed">
              {copy.intro[lang]}
            </p>
            <Link
              href={`/${lang}${PAIRED_SERVICE}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#B2904D] underline decoration-[#B2904D]/40 hover:decoration-[#B2904D] underline-offset-4 transition-colors"
            >
              {copy.introLink[lang]}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
          </div>

          {/* --- GRID DE ARTÍCULOS --- */}
          {posts.length > 0 && (
            <div className="flex items-center gap-4 mb-10 px-2">
              <div className="w-1.5 h-8 bg-[#B2904D]" />
              <h2 className="text-3xl font-serif text-white">{copy.articles[lang]}</h2>
            </div>
          )}

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
