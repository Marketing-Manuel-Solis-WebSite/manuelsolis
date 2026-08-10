import Image from 'next/image';
import type { ElementType } from 'react';
import { ArrowRight, FileText, Shield, PhoneCall, MessageSquare, Search, ShieldCheck, MapPin, Lock } from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import FaqSection from '../../../components/FaqSection';
import type { FaqPair } from '../../../lib/faqSchema';
import ContactForm from '../../../components/ContactForm';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { Reveal, Stagger, StaggerItem, MagneticButton } from '../../../components/motion';
import VawaCases from './VawaCases';
import { resolveTabs, resolveSteps, resolveBlog, getOffices, resolveUi, type StepIconKey } from './vawaData';
import type { Language } from '../../../lib/translations';

const STEP_ICONS: Record<StepIconKey, ElementType> = { messageSquare: MessageSquare, search: Search, fileText: FileText, shieldCheck: ShieldCheck };

/**
 * VAWA page — server-first (Fase 2.3 Lote C, enfoque b). Image hero + tabs island
 * + linked offices + process + blog. No FAQ. LCP sacred: home-image.jpg priority
 * + H1 static. page.tsx generateMetadata + JSON-LD untouched.
 */
export default function VawaClient({
  lang,
  faqs = [],
}: {
  lang: Language;
  /** Preguntas aprobadas; vacío mientras serviceFaq.ts no las apruebe. */
  faqs?: FaqPair[];
}) {
  const isEs = lang === 'es';
  const ui = resolveUi(lang);
  const tabs = resolveTabs(lang);
  const steps = resolveSteps(lang);
  const blog = resolveBlog(lang);
  const offices = getOffices();

  return (
    <div className="min-h-screen flex flex-col bg-navy-500 text-white relative selection:bg-[#B2904D] selection:text-white font-sans overflow-x-hidden">
      <Header />

      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full transform-gpu">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#001f5f]" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[80px] opacity-30" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[70vw] h-[70vw] bg-sky-800/10 rounded-full blur-[90px] opacity-20" />
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
          <span className="text-[15vw] font-black italic text-white tracking-tighter transform -skew-x-12 whitespace-nowrap">VAWA</span>
        </div>
      </div>

      {/* <main> arranca aquí (destino del skip link #main-content): Header y Footer quedan FUERA para que el salto caiga tras la navegación. */}
      <main id="main-content" tabIndex={-1}>
        <div className="relative z-10 pt-24 md:pt-28 px-4">
          <div className="container mx-auto max-w-7xl">
            <Breadcrumbs items={[
              { label: { es: 'Inicio', en: 'Home' }, href: `/${lang}` },
              { label: { es: 'Servicios', en: 'Services' }, href: `/${lang}/servicios` },
              { label: { es: 'VAWA', en: 'VAWA' }, href: `/${lang}/servicios/vawa` },
            ]} />
          </div>
        </div>

        {/* HERO — LCP sacred */}
        <section className="relative pt-8 md:pt-12 pb-12 md:pb-20 px-4 z-10 min-h-[85vh] flex flex-col justify-center">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5 relative h-[450px] md:h-[600px] lg:h-[80vh] flex items-end justify-center order-2 lg:order-1">
                <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent blur-xl z-10 h-1/4 bottom-0 w-full" />
                <div className="relative z-0 w-full h-full flex items-end justify-center">
                  <Image src="/home-image.jpg" alt={isEs ? 'Abogados VAWA - Protección para víctimas de violencia doméstica' : 'VAWA Attorneys - Protection for domestic violence victims'} fill className="object-contain object-bottom drop-shadow-[0_0_35px_rgba(178,144,77,0.25)]" priority sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <Reveal variant="up" delay={0.3} className="absolute bottom-32 lg:bottom-48 -right-4 md:-right-10 z-20 p-6 border border-[#B2904D]/30 rounded-2xl backdrop-blur-xl bg-[#001540]/60 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                  <div className="flex items-center gap-3 mb-1">
                    <Lock className="w-5 h-5 text-[#B2904D]" />
                    <span className="text-[#B2904D] font-bold tracking-widest text-xs uppercase">{ui.confidential}</span>
                  </div>
                  <div className="flex items-baseline text-white">
                    <span className="text-4xl md:text-5xl font-black tracking-tighter">100%</span>
                    <span className="ml-2 text-sm font-light uppercase tracking-wider opacity-80">{ui.private}</span>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-7 space-y-8 pl-0 lg:pl-8 relative z-20 order-1 lg:order-2 flex flex-col justify-center items-start">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B2904D]/30 bg-[#B2904D]/10 backdrop-blur-sm shadow-[0_0_15px_rgba(178,144,77,0.1)] self-start">
                  <Shield size={16} className="text-[#B2904D]" />
                  <span className="text-[#B2904D] text-xs font-bold tracking-[0.2em] uppercase">{ui.badge}</span>
                </div>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-thin text-white tracking-tight leading-[1.1]">
                  <span className="block text-white/90">{ui.heroTitle1}</span>{' '}
                  <span className="block font-black text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] via-[#F3E5AB] to-[#B2904D] drop-shadow-sm">{ui.heroTitle2}</span>
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-[#B2904D] to-transparent rounded-full" />
                <Reveal as="p" variant="up" delay={0.1} className="text-lg md:text-xl text-blue-100/70 font-light max-w-xl leading-relaxed">
                  {ui.heroDescription}
                </Reveal>
                <Reveal variant="up" delay={0.2} className="flex flex-wrap gap-4 pt-4">
                  <MagneticButton as="a" href="#contacto" className="items-center gap-3 px-8 py-4 bg-[#B2904D] hover:bg-[#d4af37] text-[#001540] font-bold rounded-xl transition-colors shadow-[0_0_30px_rgba(178,144,77,0.3)] group text-base">
                    <Shield size={20} />
                    {ui.ctaConsultation}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </MagneticButton>
                  <a href="tel:+18325980914" className="px-8 py-4 border-2 border-white/20 hover:border-[#B2904D]/50 text-white font-bold rounded-xl transition-all flex items-center gap-3 group text-base backdrop-blur-sm">
                    <PhoneCall size={20} className="text-[#B2904D]" />
                    <span className="hidden sm:inline">(832) 598-0914</span>
                    <span className="sm:hidden">{isEs ? 'Llamar' : 'Call'}</span>
                  </a>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <VawaCases tabs={tabs} requestEvaluation={ui.requestEvaluation} />

        {/* OFFICES (linked) */}
        <section className="py-24 relative bg-[#001f5f]/30">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <Reveal variant="up" className="text-center mb-16" amount={0.4}>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{ui.officesTitle}</h2>
              <p className="text-blue-100/60 text-lg max-w-3xl mx-auto font-light">{ui.officesSubtitle}</p>
              <div className="h-1 w-24 bg-[#B2904D] mx-auto rounded-full shadow-[0_0_15px_#B2904D] mt-8" />
            </Reveal>
            <Stagger gap={0.05} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" amount={0.1}>
              {offices.map((office) => (
                <StaggerItem key={office.slug} as="div">
                  <a href={`/${lang}/oficinas/${office.slug}`} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-[#B2904D]/40 hover:bg-white/10 transition-all duration-300 group">
                    <MapPin size={16} className="text-[#B2904D] shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors font-medium">{office.name}</span>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* PROCESS */}
        <section className="py-32 relative overflow-hidden bg-[#000a20]">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <Reveal variant="up" className="text-center mb-24" amount={0.4}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
                <FileText size={14} className="text-[#B2904D]" />
                <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">{ui.processMethod}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white mb-6">{ui.processTitle}</h2>
              <div className="h-1 w-24 bg-[#B2904D] mx-auto rounded-full shadow-[0_0_15px_#B2904D]" />
            </Reveal>
            <Stagger gap={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 relative" amount={0.1}>
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
              {steps.map((step) => {
                const Icon = STEP_ICONS[step.iconKey];
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

        {/* BLOG */}
        <section className="py-24 relative bg-navy-500">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <Reveal variant="up" className="text-center mb-16" amount={0.4}>
              <h2 className="text-3xl font-black text-white mb-4">{ui.blogTitle}</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-[#B2904D] to-transparent mx-auto rounded-full mt-6" />
            </Reveal>
            <Stagger gap={0.08} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto" amount={0.1}>
              {blog.map((article) => (
                <StaggerItem key={article.slug} as="div">
                  <a href={`/${lang}/blog/${article.slug}`} className="card-3d group block rounded-xl overflow-hidden border border-white/10 hover:border-[#B2904D]/30 bg-[#000a20]/60 transition-colors duration-300">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={article.image} alt={article.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#000a20] to-transparent opacity-60" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#B2904D] text-[#001540] rounded-md">{article.category}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-medium text-white group-hover:text-[#B2904D] transition-colors line-clamp-2 leading-snug">{article.title}</h4>
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

        {/* PHONE CTA */}
        <section className="py-16 relative z-10 bg-[#001026]">
          <div className="max-w-4xl mx-auto px-4">
            <Reveal variant="up" amount={0.3} className="text-center">
              <a href="tel:+18325980914" className="inline-flex items-center gap-4 px-10 py-6 bg-gradient-to-r from-[#B2904D] to-[#D4AF37] text-[#001540] font-black text-xl rounded-2xl transition-all hover:shadow-[0_0_50px_rgba(178,144,77,0.4)] hover:-translate-y-1 group">
                <PhoneCall size={28} className="group-hover:animate-pulse" />
                <span>{ui.phoneCta}</span>
                <span className="text-2xl">(832) 598-0914</span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contacto" className="relative py-32 z-10 bg-transparent">
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <Reveal variant="up" amount={0.2} className="relative z-10 p-5 sm:p-8 md:p-12 bg-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-[3rem] shadow-2xl border border-white/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#B2904D]/20 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20"></div>
              <div className="relative z-10 text-white">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-black mb-4">{ui.contactTitle}</h2>
                  <div className="h-1 w-16 bg-[#B2904D] mx-auto rounded-full" />
                </div>
                <ContactForm lang={lang} />
              </div>
            </Reveal>
          </div>
        </section>
        {/* Dentro del <main> y antes del Footer: colgada después del
            componente que trae el pie, la sección se ve debajo de él. */}
        <FaqSection
          faqs={faqs}
          lang={lang === 'en' ? 'en' : 'es'}
          title={lang === 'en' ? 'Frequently asked questions' : 'Preguntas frecuentes'}
        />

      </main>

      <Footer />
    </div>
  );
}
