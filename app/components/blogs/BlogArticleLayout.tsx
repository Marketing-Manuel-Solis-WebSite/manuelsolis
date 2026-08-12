import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  AlertCircle, AlertTriangle, ArrowLeft, ArrowUpRight, Banknote, Calendar,
  Car, CheckCircle2, ClipboardList, Clock, FileText, Gavel, Globe, Heart,
  HelpCircle, Home, Lock, MapPin, MessageCircle, Phone, Plane, Scale, Search,
  Send, ShieldCheck, Siren, Sparkles, Stethoscope, ArrowRightLeft, Thermometer,
  Users, Wallet,
} from 'lucide-react';

import { notFound } from 'next/navigation';

import { generateBreadcrumbSchema } from '../../lib/breadcrumbSchema';
import { isPublished } from '../../lib/blogSchedule';
import Header from '../Header';
import Footer from '../Footer';
import ContactForm from '../ContactForm';
import BlogBackground from './BlogBackground';
import ShareButtons from './ShareButtons';
import BlogTracker from './BlogTracker';
import ReadingProgress from './ReadingProgress';
import RelatedContent from './RelatedContent';
import BlogSchema from './BlogSchema';
import { getRelatedArticles } from '../../lib/blogRelations';
import { addInlineLinks, createInlineLinkState } from '../../lib/blogInlineLinks';
import type { BlogArticleContent, BlogBlock, BlogIcon } from './articleModel';

const SITE_URL = 'https://www.manuelsolis.com';
const AUTHOR_IMAGE = '/abogado-manuel-solis.jpg';

const ICONS: Record<BlogIcon, React.ComponentType<{ size?: number; className?: string }>> = {
  alert: AlertTriangle,
  balance: Scale,
  calendar: Calendar,
  car: Car,
  check: CheckCircle2,
  clipboard: ClipboardList,
  clock: Clock,
  dollar: Banknote,
  file: FileText,
  gavel: Gavel,
  globe: Globe,
  heart: Heart,
  help: HelpCircle,
  home: Home,
  lock: Lock,
  map: MapPin,
  phone: Phone,
  plane: Plane,
  search: Search,
  shield: ShieldCheck,
  siren: Siren,
  stethoscope: Stethoscope,
  swap: ArrowRightLeft,
  thermometer: Thermometer,
  users: Users,
  wallet: Wallet,
};

function Block({
  block,
  inline,
}: {
  block: BlogBlock;
  /**
   * Enlazador contextual. Solo se aplica a los bloques `text`: en un título,
   * una lista o un aviso, un enlace en medio de la frase estorba más que ayuda.
   */
  inline?: (html: string) => string;
}) {
  switch (block.kind) {
    case 'text':
      return (
        <p
          className="mb-4"
          dangerouslySetInnerHTML={{ __html: inline ? inline(block.text) : block.text }}
        />
      );

    case 'list':
      return (
        <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
              <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      );

    case 'steps':
      return (
        <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#B2904D]/20 text-[#B2904D] font-bold text-sm shrink-0">
                {i + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      );

    case 'cards':
      return (
        <div className="grid md:grid-cols-2 gap-4 my-8">
          {block.items.map((card, i) => (
            <div key={i} className="p-5 bg-[#000a20] rounded-xl border border-white/10">
              <span className="font-bold text-white block mb-2">{card.title}</span>
              <span className="text-sm text-blue-50/70" dangerouslySetInnerHTML={{ __html: card.desc }} />
            </div>
          ))}
        </div>
      );

    case 'table':
      // overflow-x-auto: en móvil la tabla desborda y el <body> no debe
      // desplazarse en horizontal por su culpa.
      return (
        <div className="my-8 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-white/10">
                {block.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 font-bold text-white whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-t border-white/5">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="px-4 py-3 text-blue-50/80 align-top"
                      dangerouslySetInnerHTML={{ __html: cell }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'note':
      return (
        <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
          <AlertCircle size={16} className="inline mr-2" />
          <span dangerouslySetInnerHTML={{ __html: block.text }} />
        </div>
      );

    case 'warning':
      return (
        <div className="p-4 bg-red-500/10 rounded-xl border border-red-400/30 text-sm text-red-200">
          <AlertTriangle size={16} className="inline mr-2" />
          <span dangerouslySetInnerHTML={{ __html: block.text }} />
        </div>
      );
  }
}

/**
 * Layout de un artículo del blog. Reproduce el diseño de los posts existentes
 * (fondo navy, resumen dorado, secciones con icono, FAQ, conclusión, fuentes,
 * sidebar del autor, contenido relacionado y formulario) tomando el contenido
 * como datos en lugar de como JSX escrito a mano.
 */
export default function BlogArticleLayout({
  slug,
  lang,
  content,
  image,
  imageAlt,
  isoDate,
  isoModified,
  servicePath,
  trackerCategory,
}: {
  slug: string;
  lang: 'es' | 'en';
  content: BlogArticleContent;
  image: string;
  imageAlt: string;
  /** Fecha de publicación en YYYY-MM-DD (la que va al schema). */
  isoDate: string;
  /** Revisión real en YYYY-MM-DD. Sin esto no se emite `dateModified`. */
  isoModified?: string;
  servicePath: string;
  trackerCategory: string;
}) {
  // Un artículo programado no existe hasta su fecha. Sin este 404 la URL
  // seguiría respondiendo 200 aunque el post no aparezca en el índice ni en el
  // sitemap, y bastaría con adivinar el slug —o que Google lo hubiera visto una
  // vez— para leer algo que todavía no se ha revisado.
  if (!isPublished({ slug, date: isoDate })) {
    notFound();
  }

  const t = content;

  /**
   * Enlaces contextuales hacia las páginas de servicio, dentro del cuerpo.
   *
   * El estado es POR ARTÍCULO y se crea aquí, no dentro de Block: así cada
   * destino se enlaza una sola vez en todo el texto en vez de una por párrafo,
   * que es lo que convierte un enlace útil en relleno para buscadores.
   */
  const inlineState = createInlineLinkState();
  const inline = (html: string) => addInlineLinks(html, lang, inlineState);

  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: 'Blog', url: `/${lang}/blog` },
    { name: t.title, url: `/${lang}/blog/${slug}` },
  ]);

  return (
    <>
      {/*
        BlogSchema ya sabe emitir el FAQPage a partir de `faqs`: se le pasan las
        mismas preguntas que se ven en la página en lugar de declarar aquí un
        segundo bloque, que es como acaban divergiendo el texto visible y el
        estructurado. `dateModified` solo se manda si hay una revisión real.
      */}
      <BlogSchema
        title={t.metaTitle}
        description={t.metaDesc}
        slug={slug}
        date={isoDate}
        dateModified={isoModified}
        image={image}
        lang={lang}
        readTime={t.readTime.replace(/\D/g, '')}
        faqs={t.faq.items.map((item) => ({ question: item.q, answer: item.a }))}
      />
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <BlogTracker title={t.title} author="Manuel Solís" category={trackerCategory} />
      <ReadingProgress />

      <div className="min-h-screen bg-[#001540] text-white selection:bg-[#B2904D] selection:text-[#001540]">
        <Header />
        <BlogBackground />

        <main id="main-content" tabIndex={-1} className="relative z-10 pt-32 pb-20">
          {/* HERO */}
          <section className="container mx-auto px-4 md:px-6 lg:px-8 mb-16">
            <div className="mb-10">
              <Link
                href={`/${lang}/blog`}
                className="inline-flex items-center gap-2 text-white/60 hover:text-[#B2904D] transition-colors group text-sm font-medium uppercase tracking-wider"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                {t.ui.back}
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-6 animate-fade-in-up">
              <span className="px-3 py-1 bg-[#B2904D] text-[#001540] text-xs font-bold uppercase tracking-widest rounded-full">
                {t.categoryLabel}
              </span>
              <span className="flex items-center gap-2 text-white/60 text-sm">
                <Calendar size={14} /> {t.displayDate}
              </span>
              <span className="flex items-center gap-2 text-white/60 text-sm">
                <Clock size={14} /> {t.readTime}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-medium text-white leading-[1.1] mb-8 max-w-5xl animate-fade-in-up delay-100">
              {t.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/10 pt-8 animate-fade-in-up delay-200">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#B2904D] shadow-lg shadow-[#B2904D]/20">
                  <Image src={AUTHOR_IMAGE} alt="Abogado Manuel Solís" fill sizes="56px" className="object-cover" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">Abogado Manuel Solís</p>
                  <p className="text-white/50 text-sm">{t.ui.authorRole}</p>
                </div>
              </div>
              <ShareButtons title={t.title} uiShareText={t.ui.share} />
            </div>
          </section>

          {/* CONTENIDO */}
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12">
              <article className="lg:col-span-8 prose prose-lg prose-invert max-w-none">
                <div className="mb-12 relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 760px"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-30" />
                </div>

                {/* Resumen */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-[#B2904D]/20 to-transparent border border-[#B2904D]/30 mb-10 shadow-2xl">
                  <h2 className="text-[#B2904D] font-bold text-xl mb-4 flex items-center gap-2">
                    <Sparkles size={20} /> {t.summary.title}
                  </h2>
                  <p
                    className="text-lg text-white leading-relaxed font-light m-0"
                    dangerouslySetInnerHTML={{ __html: t.summary.text }}
                  />
                </div>

                {t.lastUpdated && (
                  <p className="mb-10 text-sm text-white/50 flex items-center gap-2">
                    <Clock size={14} className="text-[#B2904D]" />
                    <span>
                      {t.ui.updatedLabel}: <strong className="text-white/70">{t.lastUpdated}</strong>
                    </span>
                  </p>
                )}

                <div className="space-y-12 text-blue-50/80 font-light text-lg leading-8">
                  <section>
                    {t.intro.map((paragraph, i) => (
                      <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} className="mb-6" />
                    ))}
                  </section>

                  {t.sections.map((section, i) => {
                    const Icon = ICONS[section.icon];
                    return (
                      <section key={i}>
                        <h2 className="text-3xl font-serif text-white mt-0 mb-2 flex items-center gap-3">
                          <div className="p-2 bg-white/10 rounded-lg">
                            <Icon size={24} className="text-[#B2904D]" />
                          </div>
                          {section.title}
                        </h2>
                        {section.subtitle && (
                          <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">
                            {section.subtitle}
                          </p>
                        )}
                        {section.blocks.map((block, j) => (
                          <Block key={j} block={block} inline={inline} />
                        ))}
                      </section>
                    );
                  })}

                  {/* FAQ */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-8 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <HelpCircle size={24} className="text-[#B2904D]" />
                      </div>
                      {t.faq.title}
                    </h2>
                    <div className="grid gap-6">
                      {t.faq.items.map((item, i) => (
                        <div key={i} className="p-6 bg-[#000a20] rounded-2xl border border-white/10">
                          <p className="font-bold text-white mb-3 text-lg">P: {item.q}</p>
                          <p className="text-blue-50/70">{item.a}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Conclusión */}
                  <div className="p-8 bg-gradient-to-r from-[#B2904D] to-[#8a6e36] rounded-3xl text-[#001540] shadow-lg mt-12">
                    <h2 className="text-2xl font-bold font-serif mb-4 flex items-center gap-2">
                      <MessageCircle size={28} /> {t.conclusion.title}
                    </h2>
                    <p className="font-medium text-lg mb-6 leading-relaxed">{t.conclusion.text}</p>
                    <p className="font-bold text-xl mb-8">{t.conclusion.advice}</p>
                    <Link
                      href="#contacto"
                      className="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 bg-[#001540] text-white font-bold rounded-xl hover:bg-white hover:text-[#001540] transition-all shadow-xl gap-2"
                    >
                      <Send size={18} />
                      {t.ui.ctaButton}
                    </Link>
                  </div>

                  {/* Fuentes */}
                  <div className="border-t border-white/10 pt-8 mt-12">
                    <h4 className="text-xs font-bold text-white/50 uppercase mb-4 tracking-widest">
                      {t.sources.title}
                    </h4>
                    <ul className="space-y-2 text-sm text-white/50 list-none pl-0">
                      {t.sources.list.map((source, i) => (
                        <li key={i} className="flex items-center gap-2 hover:text-[#B2904D] transition-colors">
                          <ArrowUpRight size={12} /> {source}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Aviso legal */}
                  <p className="text-xs text-white/40 leading-relaxed border-t border-white/5 pt-6">
                    {t.ui.disclaimer}
                  </p>
                </div>
              </article>

              {/* SIDEBAR */}
              <aside className="lg:col-span-4 space-y-8">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md sticky top-32">
                  <h3 className="text-xs font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">
                    {lang === 'es' ? 'Sobre el Autor' : 'About the Author'}
                  </h3>
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#001540] shadow-[0_0_0_2px_#B2904D] mb-4">
                      <Image src={AUTHOR_IMAGE} alt="Manuel Solís" fill sizes="96px" className="object-cover" />
                    </div>
                    <h4 className="text-xl font-bold text-white">Manuel Solís</h4>
                    <p className="text-sm text-[#B2904D] mb-4">{t.ui.authorRole}</p>
                    <Link
                      href={`/${lang}/abogados/manuel-solis`}
                      className="text-sm font-bold text-white border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-[#001540] transition-colors w-full"
                    >
                      {lang === 'es' ? 'Ver Perfil del Abogado' : 'View Attorney Profile'}
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <RelatedContent articles={getRelatedArticles(slug, lang)} lang={lang} servicePath={servicePath} />
        </div>

        <div id="contacto">
          <ContactForm />
        </div>

        <Footer />
      </div>
    </>
  );
}
