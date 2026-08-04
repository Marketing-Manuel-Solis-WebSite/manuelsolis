import Image from 'next/image';
import type { ElementType } from 'react';
import { ArrowRight, FileText, Star, Briefcase, MessageSquare, Search, Building2, Send, CheckCircle2, HelpCircle } from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ContactForm from '../../../components/ContactForm';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { Reveal, Stagger, StaggerItem, MagneticButton } from '../../../components/motion';
import VisaE2Cases from './VisaE2Cases';
import { resolveTabs, resolveSteps, resolveFaqs, resolveUi, type IconKey } from './visaE2Data';
import type { Language } from '../../../lib/translations';

const ICONS: Record<IconKey, ElementType> = { messageSquare: MessageSquare, search: Search, building2: Building2, fileText: FileText, checkCircle2: CheckCircle2, send: Send, shield: FileText, globe: FileText };

/**
 * Visa E-2 page — server-first (Fase 2.3 Lote B, enfoque b). Text-only hero (no
 * image), interactive info tabs island, STATIC server-rendered FAQ (answers in
 * the DOM), 6-step process. page.tsx generateMetadata + JSON-LD untouched.
 */
export default function VisaE2Client({ lang }: { lang: Language }) {
  const isEs = lang === 'es';
  const ui = resolveUi(lang);
  const tabs = resolveTabs(lang);
  const steps = resolveSteps(lang);
  const faqs = resolveFaqs(lang);

  const articles = [
    { slug: 'residencia-laboral-eb3-ley-245i-entrada-indocumentada', title: { es: 'Residencia laboral EB-3 y Ley 245(i)', en: 'EB-3 Work Residency & Section 245(i)' }, image: '/blog/blog_13/BLOG03_CR1.png' },
    { slug: 'advance-parole-2026-viajar-con-daca-tps-visa-u', title: { es: 'Advance Parole 2026: viajar con DACA, TPS o Visa U', en: 'Advance Parole 2026: Travel with DACA, TPS or U Visa' }, image: '/blog/blog_12/BLOG02_CR1.png' },
    { slug: 'formulario-g28-cambiar-abogado-inmigracion', title: { es: 'Formulario G-28: cómo cambiar de abogado', en: 'Form G-28: How to Change Attorney' }, image: '/blog/blog_09/B9_CR1.png' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-navy-500 text-white relative selection:bg-[#B2904D] selection:text-white font-sans overflow-x-hidden">
      <Header />

      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full transform-gpu">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#001f5f]" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[80px] opacity-30" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[70vw] h-[70vw] bg-sky-800/10 rounded-full blur-[90px] opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
          <span className="text-[15vw] font-black italic text-white tracking-tighter transform -skew-x-12 whitespace-nowrap">VISA E-2</span>
        </div>
      </div>

      <div className="relative z-10 pt-24 md:pt-28 px-4">
        <div className="container mx-auto max-w-7xl">
          <Breadcrumbs items={[
            { label: { es: 'Inicio', en: 'Home' }, href: `/${lang}` },
            { label: { es: 'Servicios', en: 'Services' }, href: `/${lang}/servicios` },
            { label: { es: 'Visa E-2', en: 'E-2 Visa' }, href: `/${lang}/servicios/visa-e2` },
          ]} />
        </div>
      </div>

      {/* HERO — text-only, LCP = H1 (static, no gating) */}
      <section className="relative pt-8 md:pt-12 pb-12 md:pb-20 px-4 z-10 min-h-[85vh] flex flex-col justify-center">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-12 space-y-8 relative z-20 flex flex-col justify-center items-start max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B2904D]/30 bg-[#B2904D]/10 backdrop-blur-sm shadow-[0_0_15px_rgba(178,144,77,0.1)] self-start">
                <Briefcase size={16} className="text-[#B2904D]" />
                <span className="text-[#B2904D] text-xs font-bold tracking-[0.2em] uppercase">{ui.badge}</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-thin text-white tracking-tight leading-[1.1]">
                <span className="block text-white/90">{ui.heroTitle1}</span>
                <span className="block font-black text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] via-[#F3E5AB] to-[#B2904D] drop-shadow-sm">{ui.heroTitle2}</span>
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-[#B2904D] to-transparent rounded-full" />
              <Reveal as="p" variant="up" delay={0.1} className="text-lg md:text-xl text-blue-100/70 font-light max-w-xl leading-relaxed">
                {ui.heroDescription}
              </Reveal>
              <Reveal variant="up" delay={0.2} className="flex flex-wrap items-center gap-4 pt-4">
                <MagneticButton as="a" href="#contacto" className="items-center gap-3 px-8 py-4 bg-[#B2904D] hover:bg-[#d4af37] text-[#001540] font-bold rounded-xl transition-colors shadow-[0_0_30px_rgba(178,144,77,0.3)] group text-base">
                  <FileText size={20} />
                  {ui.ctaConsultation}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
                <div className="inline-flex items-center gap-3 px-5 py-3 border border-[#B2904D]/30 rounded-xl backdrop-blur-xl bg-[#001540]/40">
                  <Star className="w-5 h-5 text-[#B2904D] fill-[#B2904D]" />
                  <div className="flex items-baseline text-white">
                    <span className="text-2xl md:text-3xl font-black tracking-tighter">35+</span>
                    <span className="ml-2 text-xs font-light uppercase tracking-wider opacity-80">{ui.yearsExp}</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <VisaE2Cases tabs={tabs} requestEvaluation={ui.requestEvaluation} />

      {/* PROCESS */}
      <section className="py-32 relative overflow-hidden bg-[#001f5f]/30">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Reveal variant="up" className="text-center mb-24" amount={0.4}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
              <FileText size={14} className="text-[#B2904D]" />
              <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">{ui.processMethod}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white mb-6">{ui.processTitle}</h2>
            <div className="h-1 w-24 bg-[#B2904D] mx-auto rounded-full shadow-[0_0_15px_#B2904D]" />
          </Reveal>

          <Stagger gap={0.1} className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 relative" amount={0.1}>
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
            {steps.map((step) => {
              const Icon = ICONS[step.iconKey];
              return (
                <StaggerItem key={step.id} as="div" variant="up" className="group relative z-10">
                  <div className="card-3d bg-[#001026] p-8 rounded-[2rem] border border-white/10 hover:border-[#B2904D]/50 transition-colors duration-300 h-full shadow-lg relative overflow-hidden">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#B2904D] transition-colors duration-300 shadow-inner">
                        <Icon size={30} className="text-white/80 group-hover:text-[#001540] transition-colors" />
                      </div>
                      <span className="text-4xl font-black text-white/5 group-hover:text-[#B2904D]/20 transition-colors">0{step.id}</span>
                    </div>
                    <h3 className="font-bold text-xl text-white mb-3">{step.title}</h3>
                    <p className="text-blue-100/60 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* FAQ — static, server-rendered (answers in DOM); only entrance is animated */}
      <section className="relative py-24 bg-[#001026]">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="up" className="text-center mb-16" amount={0.4}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">{ui.faqTitle}</h2>
            <p className="text-blue-100/60 text-lg max-w-2xl mx-auto font-light">{ui.faqSubtitle}</p>
          </Reveal>
          <Stagger gap={0.1} className="space-y-4" amount={0.15}>
            {faqs.map((faq, i) => (
              <StaggerItem key={i} as="div">
                <div className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-[#B2904D]/30 transition-colors duration-300">
                  <div className="flex items-center justify-between p-6">
                    <h3 className="text-lg font-medium text-white pr-8 flex gap-3">
                      <HelpCircle size={20} className="text-[#B2904D] shrink-0 mt-1" />
                      {faq.q}
                    </h3>
                  </div>
                  <div className="px-6 pb-8 pl-14">
                    <p className="text-blue-100/70 leading-relaxed text-base border-l-2 border-white/10 pl-4">{faq.a}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* RELATED ARTICLES */}
      <section className="py-24 relative bg-navy-500">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Reveal variant="up" className="text-center mb-16" amount={0.4}>
            <h2 className="text-3xl font-black text-white mb-4">{ui.resourcesTitle}</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#B2904D] to-transparent mx-auto rounded-full mt-6" />
          </Reveal>
          <Stagger gap={0.08} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto" amount={0.1}>
            {articles.map((article) => (
              <StaggerItem key={article.slug} as="div">
                <a href={`/${lang}/blog/${article.slug}`} className="card-3d group block rounded-xl overflow-hidden border border-white/10 hover:border-[#B2904D]/30 bg-[#000a20]/60 transition-colors duration-300">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={article.image} alt={article.title[lang]} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000a20] to-transparent opacity-60" />
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-white group-hover:text-[#B2904D] transition-colors line-clamp-2 leading-snug">{article.title[lang]}</h4>
                    <span className="mt-2 text-xs text-[#B2904D] flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                      {isEs ? 'Leer artículo' : 'Read article'} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contacto" className="relative py-32 z-10 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <Reveal variant="up" amount={0.2} className="relative z-10 p-5 sm:p-8 md:p-12 bg-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-[3rem] shadow-2xl border border-white/10 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#B2904D]/20 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20"></div>
            <div className="relative z-10 text-white">
              <ContactForm lang={lang} />
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
