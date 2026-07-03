import Image from 'next/image';
import Link from 'next/link';
import { BLOG_DATA } from '../[lang]/blog/page';
import type { Language } from '../lib/translations';
import { Reveal, Stagger, StaggerItem } from './motion';

/**
 * BlogHighlights — server-first home section. Surfaces the 5 newest posts from
 * BLOG_DATA (array order = newest first): one flagship card + a 4-card grid.
 * Pure server HTML with crawlable <Link>s (home → post internal links for SEO);
 * movement follows the Services pattern — one <Reveal> header, one <Stagger> grid.
 */
export default function BlogHighlights({ lang }: { lang: Language }) {
  const isEs = lang === 'es';
  const [flagship, ...rest] = BLOG_DATA.posts.slice(0, 5);
  if (!flagship) return null;

  const formatDate = (iso: string) =>
    new Date(`${iso}T00:00:00`).toLocaleDateString(isEs ? 'es-US' : 'en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return (
    <section id="blog" className="relative pt-24 pb-32 w-full bg-navy-500 overflow-hidden">
      {/* Background — static */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
        <div className="absolute inset-0 gradient-mesh-dark" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#B2904D]/10 rounded-full blur-[90px] -translate-x-1/3 -translate-y-1/3 opacity-15" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <Reveal variant="up" className="mb-16 text-center" amount={0.4}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/10 mb-6 shadow-[0_0_10px_rgba(178,144,77,0.1)]">
            <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-blue-200/70 uppercase">
              {isEs ? 'BLOG LEGAL' : 'LEGAL BLOG'}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-thin text-white mb-6 tracking-tight">
            {isEs ? 'Guías legales' : 'Legal guides'}{' '}
            <span className="font-normal text-gradient-gold-subtle">
              {isEs ? 'para tu caso' : 'for your case'}
            </span>
          </h2>
          <p className="text-xl text-blue-100/60 font-light max-w-2xl mx-auto leading-relaxed">
            {isEs
              ? 'Artículos escritos por nuestros abogados: inmigración, accidentes y tus derechos, explicados en español claro.'
              : 'Articles written by our attorneys: immigration, accidents, and your rights, explained clearly.'}
          </p>
        </Reveal>

        {/* Flagship post */}
        <Reveal variant="up" amount={0.2} className="mb-10">
          <Link
            href={`/${lang}/blog/${flagship.slug}`}
            className="card-3d group grid md:grid-cols-2 rounded-2xl sm:rounded-[2rem] bg-[#000a20]/60 border border-white/10 backdrop-blur-sm overflow-hidden shadow-lg hover:border-[#B2904D]/30"
          >
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px]">
              <Image
                src={flagship.image}
                alt={flagship.title[lang]}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000a20]/60 via-transparent to-transparent" />
            </div>
            <div className="p-6 sm:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-[#B2904D] text-[#001540] text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {flagship.category[lang]}
                </span>
                <span className="text-blue-200/50 text-xs font-light">
                  {formatDate(flagship.date)} · {flagship.readTime}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-light text-white leading-snug mb-4 group-hover:text-[#B2904D] transition-colors duration-300">
                {flagship.title[lang]}
              </h3>
              <p className="text-blue-100/60 font-light text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                {flagship.excerpt[lang]}
              </p>
              <span className="text-xs sm:text-sm font-medium text-[#B2904D] tracking-wide flex items-center gap-2 opacity-80 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
                {isEs ? 'Leer artículo' : 'Read article'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Latest grid */}
        <Stagger gap={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch" amount={0.1}>
          {rest.map((post) => (
            <StaggerItem key={post.id} as="div" className="block h-full">
              <Link
                href={`/${lang}/blog/${post.slug}`}
                className="card-3d group flex flex-col h-full rounded-2xl bg-[#000a20]/60 border border-white/10 backdrop-blur-sm overflow-hidden shadow-lg hover:border-[#B2904D]/30"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={post.image}
                    alt={post.title[lang]}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-[#B2904D] text-[10px] font-bold uppercase tracking-widest mb-2">
                    {post.category[lang]}
                  </span>
                  <h3 className="text-white font-light leading-snug mb-3 line-clamp-3 group-hover:text-[#B2904D] transition-colors duration-300">
                    {post.title[lang]}
                  </h3>
                  <span className="mt-auto text-blue-200/50 text-xs font-light">
                    {formatDate(post.date)} · {post.readTime}
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal variant="up" amount={0.4} className="mt-12 text-center">
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#B2904D]/40 text-[#B2904D] text-sm font-medium tracking-wide hover:bg-[#B2904D] hover:text-[#001540] transition-colors duration-300"
          >
            {isEs ? 'Ver todos los artículos' : 'View all articles'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
