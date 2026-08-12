import Image from 'next/image';
import { PhoneCall, ArrowRight, FileText, Star } from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import FaqSection from '../../../components/FaqSection';
import ServiceAttorneys from '../../../components/ServiceAttorneys';
import type { ServiceAttorney } from '../../../lib/serviceAttorneys';
import type { FaqPair } from '../../../lib/faqSchema';
import ContactForm from '../../../components/ContactForm';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { Reveal, Stagger, StaggerItem, MagneticButton } from '../../../components/motion';
import AccidentesCases from './AccidentesCases';
import AccidentesVideo from './AccidentesVideo';
import AccidentesOffices from './AccidentesOffices';
import { processSteps, ui, getText } from './accidentesData';
import type { Language } from '../../../lib/translations';

/**
 * Accidents service page — server-first (Fase 2.3 servicios). Copy renders as
 * server HTML; islands: <AccidentesCases> (tabs) + <AccidentesVideo> (HLS player).
 * LCP sacred: accident-hero.png (priority) + H1 static, no gating. Movement in
 * Reveal/Stagger; cards .card-3d; hero CTA magnetic. page.tsx generateMetadata +
 * JSON-LD untouched.
 */
export default function AccidentesClient({
  lang,
  faqs = [],
  serviceAttorneys = [],
}: {
  lang: Language;
  /** Preguntas aprobadas; vacío mientras serviceFaq.ts no las apruebe. */
  faqs?: FaqPair[];
  /** Abogados que declaran esta área; vacío si ninguno la declara. */
  serviceAttorneys?: ServiceAttorney[];
}) {
  const isEs = lang === 'es';
  const t = (k: keyof typeof ui) => ui[k][lang];
  const gT = (obj: Parameters<typeof getText>[0]) => getText(obj, lang);

  const articles = [
    { slug: 'accidente-camion-18-ruedas-texas-compensacion', title: { es: 'Accidente con tráiler de 18 ruedas en Texas: quién paga y cuánto vale tu caso', en: '18-Wheeler Accidents in Texas: Who Pays and What Your Case Is Worth' }, image: '/blog/blog_32/JUL_B1.png' },
    { slug: 'accidente-trabajo-indocumentado-texas-compensacion', title: { es: 'Accidente de trabajo siendo indocumentado en Texas: tus derechos reales', en: 'Work Injury While Undocumented in Texas: Your Real Rights' }, image: '/blog/blog_33/JUL_B2.png' },
    { slug: 'accidente-auto-indocumentado-derechos', title: { es: 'Tuve un accidente de auto siendo indocumentado: ¿tengo derechos?', en: 'I Had a Car Accident While Undocumented: Do I Have Rights?' }, image: '/blog/blog_25/B5_CR1.jpg' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-navy-500 text-white relative selection:bg-[#B2904D] selection:text-white font-sans overflow-x-hidden">
      <Header />

      {/* Background — static */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full transform-gpu">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#001f5f]" />
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[80px] opacity-30" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[70vw] h-[70vw] bg-sky-800/10 rounded-full blur-[90px] opacity-20" />
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
          <span className="text-[120vh] font-black italic text-white tracking-tighter whitespace-nowrap">ACCIDENTES</span>
        </div>
      </div>

      {/* <main> arranca aquí (destino del skip link #main-content): Header y Footer quedan FUERA para que el salto caiga tras la navegación. */}
      <main id="main-content" tabIndex={-1}>
        {/* Breadcrumbs */}
        <div className="relative z-10 pt-24 md:pt-28 px-4">
          <div className="container mx-auto max-w-7xl">
            <Breadcrumbs items={[
              { label: { es: 'Inicio', en: 'Home' }, href: `/${lang}` },
              { label: { es: 'Servicios', en: 'Services' }, href: `/${lang}/servicios` },
              { label: { es: 'Accidentes', en: 'Accidents' }, href: `/${lang}/servicios/accidentes` },
            ]} />
          </div>
        </div>

        {/* HERO — LCP sacred */}
        <section className="relative pt-8 md:pt-12 pb-16 md:pb-24 px-4 z-10 min-h-[85vh] md:min-h-[90vh] flex flex-col justify-center">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">

              <div className="lg:col-span-5 relative h-[300px] sm:h-[400px] md:h-[600px] lg:h-[700px] flex items-center justify-center order-2 lg:order-1">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent blur-2xl rounded-full z-0 opacity-80" />
                <div className="relative z-10 w-full h-full flex items-center justify-center transform-gpu">
                  <div className="relative w-full h-full">
                    <Image src="/accident-hero.png" alt="Abogado de accidentes de auto y lesiones personales en Houston, Texas" fill className="object-contain object-center drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]" priority sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                </div>
                <Reveal variant="left" delay={0.3} className="absolute bottom-4 md:bottom-10 left-0 md:left-[-20px] z-20 p-4 md:p-6 border border-white/10 rounded-2xl backdrop-blur-md bg-white/10 shadow-2xl">
                  <div className="flex items-baseline text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-sky-200/50">
                    <span className="text-4xl md:text-5xl font-bold tracking-tighter">10M</span>
                    <span className="text-3xl md:text-4xl font-thin text-[#B2904D] ml-1">+</span>
                  </div>
                  <p className="text-xs text-white/60 uppercase tracking-[0.2em] mt-2 font-medium">{t('stats')}</p>
                </Reveal>
              </div>

              <div className="lg:col-span-7 space-y-6 md:space-y-8 pl-0 lg:pl-12 relative z-20 order-1 lg:order-2">
                <div className="absolute left-0 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-[#B2904D]/50 to-transparent hidden lg:block" />

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B2904D]/30 bg-[#B2904D]/10 backdrop-blur-sm">
                  <Star size={14} className="text-[#B2904D] fill-[#B2904D]" />
                  <span className="text-[#B2904D] text-xs font-bold tracking-widest uppercase">{t('badge')}</span>
                </div>

                {/* H1 — static server text (LCP) */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-thin text-white tracking-tight leading-none">
                  <span className="block text-white/90 font-extralight mb-2">{t('heroTitle1')}</span>{' '}
                  <span className="block font-medium text-[#B2904D] drop-shadow-xl">{t('heroTitle2')}</span>
                </h1>

                <Reveal as="div" variant="up" delay={0.15} className="relative pl-6 border-l-2 border-[#B2904D]/50">
                  <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">{t('heroDescription')}</p>
                </Reveal>

                <Reveal variant="up" delay={0.25} className="flex flex-wrap gap-4 pt-4">
                  <MagneticButton as="a" href="#contacto" className="items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[#B2904D] hover:bg-white text-[#001540] font-bold rounded-xl transition-colors shadow-[0_0_15px_rgba(178,144,77,0.3)] group text-sm md:text-base">
                    <PhoneCall size={18} className="md:w-5 md:h-5" />
                    {t('ctaConsultation')}
                    <ArrowRight size={16} className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform" />
                  </MagneticButton>
                </Reveal>
              </div>

            </div>
          </div>
        </section>

        {/* CASES — interactive island */}
        <AccidentesCases lang={lang} />

        {/* VIDEO SECTION — server copy + client video island */}
        <section className="py-32 relative overflow-hidden bg-navy-500">
          <div className="absolute inset-0 bg-navy-500 opacity-90" />
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <Reveal variant="right" amount={0.3} className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm mb-8">
                <div className="w-2 h-2 bg-[#B2904D] rounded-full" />
                <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">{t('videoSectionBadge')}</span>
              </div>
              <h2 className="text-4xl font-black text-white mb-6 leading-tight">
                {t('videoSectionTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] to-[#D4AF37]">Juan Solís</span>
              </h2>
              <p className="text-xl text-blue-100/70 mb-8 leading-relaxed">{t('videoSectionSubtitle')}</p>
              <MagneticButton as="a" href="tel:+18664200405" className="items-center gap-4 bg-[#B2904D] text-[#002342] px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-white transition-colors">
                <span className="relative w-10 h-10 bg-black/10 rounded-lg flex items-center justify-center">
                  <PhoneCall size={20} />
                </span>
                <span className="relative">{t('callNow')}</span>
              </MagneticButton>
            </Reveal>

            <Reveal variant="left" amount={0.3} className="order-1 lg:order-2 relative group p-6 bg-white/10 backdrop-blur-md rounded-[2.5rem] shadow-xl border border-white/10">
              <AccidentesVideo lang={lang} />
            </Reveal>
          </div>
        </section>

        {/* PROCESS */}
        <section className="py-32 relative overflow-hidden bg-navy-500">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <Reveal variant="up" className="text-center mb-20" amount={0.4}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
                <FileText size={14} className="text-[#B2904D]" />
                <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">{t('processMethod')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-6">{t('processTitle')}</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-[#B2904D] to-transparent mx-auto rounded-full shadow-[0_0_10px_#B2904D]" />
            </Reveal>

            <Stagger gap={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8" amount={0.1}>
              {processSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <StaggerItem key={step.id} as="div" variant="up" className="group relative">
                    <div className="card-3d bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 hover:border-[#B2904D]/50 transition-colors duration-300 h-full shadow-lg">
                      <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-[#B2904D] to-[#D4AF37] rounded-lg flex items-center justify-center font-black text-white text-lg shadow-md z-10">{step.id}</div>
                      <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#B2904D] transition-colors">
                        <Icon size={26} className="text-white" />
                      </div>
                      <h3 className="font-black text-xl text-white mb-3">{gT(step.title)}</h3>
                      <p className="text-white/70 text-sm leading-relaxed">{gT(step.desc)}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>

        {/* RELATED ARTICLES */}
        <section className="py-24 relative bg-navy-500">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <Reveal variant="up" className="text-center mb-16" amount={0.4}>
              <h2 className="text-3xl font-black text-white mb-4">{isEs ? 'Recursos Legales Relacionados' : 'Related Legal Resources'}</h2>
              <p className="text-white/60 max-w-2xl mx-auto">{isEs ? 'Artículos informativos preparados por nuestros abogados para ayudarle a entender sus opciones legales.' : 'Informative articles prepared by our attorneys to help you understand your legal options.'}</p>
              <div className="h-1 w-20 bg-gradient-to-r from-[#B2904D] to-transparent mx-auto rounded-full mt-6" />
            </Reveal>

            <Stagger gap={0.08} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" amount={0.1}>
              {articles.map((article) => (
                <StaggerItem key={article.slug} as="div">
                  <a href={`/${lang}/blog/${article.slug}`} className="card-3d group block rounded-xl overflow-hidden border border-white/10 hover:border-[#B2904D]/30 bg-[#000a20]/60 transition-colors duration-300">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={article.image} alt={article.title[lang]} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#000a20] to-transparent opacity-60" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-white group-hover:text-[#B2904D] transition-colors line-clamp-2 leading-snug">{article.title[lang]}</h3>
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

        {/* CONTACT (anchor on inner ContactForm section) */}
        <section className="relative py-32 z-10 bg-transparent">
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <Reveal variant="up" amount={0.2} className="relative z-10 p-5 sm:p-8 md:p-12 bg-white/5 backdrop-blur-md rounded-2xl sm:rounded-[2rem] shadow-2xl border border-white/10">
              <div className="text-white">
                <h2 className="text-2xl sm:text-3xl font-black mb-6">{t('requestEvaluation')}</h2>
                <p className="text-white/70 mb-8">{t('heroDescription')}</p>
                <ContactForm lang={lang} />
              </div>
            </Reveal>
          </div>
        </section>

        {/* OFICINAS DE ACCIDENTES — direcciones (al final, antes del footer) */}
        <AccidentesOffices lang={lang} />
        <ServiceAttorneys attorneys={serviceAttorneys} lang={lang === 'en' ? 'en' : 'es'} />
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
