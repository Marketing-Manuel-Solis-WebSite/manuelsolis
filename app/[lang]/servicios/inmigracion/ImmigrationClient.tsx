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
import ImmigrationCases from './ImmigrationCases';
import { processSteps, ui, getText } from './immigrationData';
import type { Language } from '../../../lib/translations';

/**
 * Immigration service page — server-first (Fase 2.3 pilot). All copy renders as
 * server HTML (bilingual data from immigrationData.ts); the interactive case
 * tabs are the only client island (<ImmigrationCases>). LCP-sacred: the hero
 * image (priority) and the H1 render immediately, never opacity-gated. Movement
 * lives in Reveal/Stagger islands; cards use `.card-3d`. The page's
 * generateMetadata + LegalService/FAQ/Breadcrumb JSON-LD (in page.tsx) are
 * untouched — only the visual/component layer changed.
 */
export default function ImmigrationClient({
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

  const specialized = [
    { href: `/${lang}/servicios/visa-u`, title: isEs ? 'Visa U' : 'U Visa', desc: isEs ? 'Protección para víctimas de crímenes' : 'Protection for crime victims' },
    { href: `/${lang}/servicios/vawa`, title: 'VAWA', desc: isEs ? 'Víctimas de violencia doméstica' : 'Domestic violence victims' },
    { href: `/${lang}/servicios/defensa-deportacion`, title: isEs ? 'Defensa de Deportación' : 'Deportation Defense', desc: isEs ? 'Cancelación de remoción y fianzas' : 'Cancellation of removal & bonds' },
    { href: `/${lang}/servicios/asilo`, title: isEs ? 'Asilo Político' : 'Political Asylum', desc: isEs ? 'Protección por persecución' : 'Protection from persecution' },
  ];

  const articles = [
    { slug: 'permiso-de-trabajo-visa-u', title: { es: 'Permiso de Trabajo con Visa U (Bona Fide)', en: 'U Visa Work Permit (Bona Fide)' }, image: '/blog/visa-u.png' },
    { slug: 'formulario-g28-cambiar-abogado-inmigracion', title: { es: 'Formulario G-28: cómo cambiar de abogado', en: 'Form G-28: How to Change Attorney' }, image: '/blog/blog_09/B9_CR1.png' },
    { slug: 'ley-de-los-10-anos-cancelacion-de-deportacion', title: { es: 'Ley de los 10 años: cancelación de deportación', en: '10-Year Rule: Cancellation of Removal' }, image: '/blog/blog_11/BLOG01_CR1.png' },
    { slug: 'foia-migratoria-pedir-record-antes-de-aplicar', title: { es: 'FOIA: pedir récord antes de aplicar', en: 'FOIA: Request Records Before Applying' }, image: '/blog/blog_14/BLOG04_CR1.png' },
    { slug: 'vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente', title: { es: 'VAWA para hombres maltratados', en: 'VAWA for Abused Men' }, image: '/blog/blog_06/B6_CR1.png' },
    { slug: 'advance-parole-2026-viajar-con-daca-tps-visa-u', title: { es: 'Advance Parole 2026: viajar con DACA, TPS o Visa U', en: 'Advance Parole 2026: Travel with DACA, TPS or U Visa' }, image: '/blog/blog_12/BLOG02_CR1.png' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-navy-500 text-white relative selection:bg-[#B2904D] selection:text-white font-sans overflow-x-hidden">
      <Header />

      {/* Background — static (orbs no longer animate) */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full transform-gpu">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#001f5f]" />
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[80px] opacity-30" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[70vw] h-[70vw] bg-sky-800/10 rounded-full blur-[90px] opacity-20" />
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
          <span className="text-[120vh] font-black italic text-white tracking-tighter transform -skew-x-12">INMIGRACIÓN</span>
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
              { label: { es: 'Inmigración', en: 'Immigration' }, href: `/${lang}/servicios/inmigracion` },
            ]} />
          </div>
        </div>

        {/* HERO — LCP sacred: image (priority) + H1 render immediately, no gating */}
        <section className="relative pt-8 md:pt-12 pb-16 md:pb-24 px-4 z-10 min-h-[85vh] md:min-h-[90vh] flex flex-col justify-center">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">

              <div className="lg:col-span-5 relative h-[300px] sm:h-[400px] md:h-[600px] lg:h-[700px] flex items-center justify-center order-2 lg:order-1">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent blur-2xl rounded-full z-0 opacity-80" />
                <div className="relative z-10 w-full h-full flex items-center justify-center transform-gpu">
                  <div className="relative w-full h-full">
                    <Image
                      src="/immigration-hero.png"
                      alt="Abogado de Inmigración en USA Manuel Solís"
                      fill
                      className="object-contain object-center drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <Reveal variant="left" delay={0.3} className="absolute bottom-4 md:bottom-10 left-0 md:left-[-20px] z-20 p-4 md:p-6 border border-white/10 rounded-2xl backdrop-blur-md bg-white/10 shadow-2xl">
                  <div className="flex items-baseline text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-sky-200/50">
                    <span className="text-4xl md:text-5xl font-bold tracking-tighter">20k</span>
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

                {/* H1 — static server text (LCP), not opacity-gated */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-thin text-white tracking-tight leading-[0.9]">
                  <span className="block text-white/90 pb-2">{t('title1')}</span>{' '}
                  <span className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] via-[#F3E5AB] to-[#B2904D] pb-4">{t('title2')}</span>
                </h1>

                <Reveal as="p" variant="up" delay={0.15} className="text-lg md:text-xl text-blue-100/70 font-light max-w-xl leading-relaxed border-l border-white/10 pl-4 md:pl-6">
                  {t('heroDescription')}
                </Reveal>

                <Reveal variant="up" delay={0.25} className="flex flex-wrap gap-4 pt-4">
                  <MagneticButton as="a" href="#contacto" className="items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[#B2904D] hover:bg-white text-[#001540] font-bold rounded-xl transition-colors shadow-[0_0_20px_rgba(178,144,77,0.4)] group text-sm md:text-base">
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
        <ImmigrationCases lang={lang} />

        {/* SPECIALIZED SERVICES */}
        <section className="py-20 relative z-10 bg-navy-500">
          <div className="max-w-7xl mx-auto px-4">
            <Reveal variant="up" className="text-center mb-12" amount={0.4}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {isEs ? 'Servicios Especializados de Inmigración' : 'Specialized Immigration Services'}
              </h2>
              <p className="text-blue-100/60 max-w-2xl mx-auto">
                {isEs ? 'Áreas de práctica con enfoque específico para resolver su caso con mayor precisión.' : 'Focused practice areas to resolve your case with greater precision.'}
              </p>
            </Reveal>

            <Stagger gap={0.08} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" amount={0.1}>
              {specialized.map((item) => (
                <StaggerItem key={item.href} as="div">
                  <a href={item.href} className="card-3d group block h-full p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#B2904D]/40 transition-colors duration-300">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#B2904D] transition-colors mb-2">{item.title}</h3>
                    <p className="text-sm text-blue-100/50 mb-3">{item.desc}</p>
                    <span className="text-xs text-[#B2904D] flex items-center gap-1 font-medium">
                      {isEs ? 'Ver más' : 'Learn more'}
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
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
                      <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-[#B2904D] to-[#D4AF37] rounded-lg flex items-center justify-center font-black text-white text-lg shadow-md z-10">
                        {step.id}
                      </div>
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

        {/*
          Nada de bloque cuando no hay al menos dos artículos que casen de
          verdad con el área que vende la página. Una recomendación fuera de
          tema en una página comercial es peor que una sección ausente: la
          guía de clústeres del 26-ago-2026 (paso 03) midió que ley-criminal
          recomendaba tres artículos de inmigración y visa-e2 tres que no
          tienen nada que ver con visados de inversión.
        */}
        {articles.length >= 2 && (
        <section className="py-24 relative bg-navy-500">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
              <Reveal variant="up" className="text-center mb-16" amount={0.4}>
                <h2 className="text-3xl font-black text-white mb-4">
                  {isEs ? 'Recursos Legales de Inmigración' : 'Immigration Legal Resources'}
                </h2>
                <p className="text-white/60 max-w-2xl mx-auto">
                  {isEs ? 'Artículos informativos preparados por nuestros abogados para ayudarle a entender sus opciones legales.' : 'Informative articles prepared by our attorneys to help you understand your legal options.'}
                </p>
                <div className="h-1 w-20 bg-gradient-to-r from-[#B2904D] to-transparent mx-auto rounded-full mt-6" />
              </Reveal>

              <Stagger gap={0.08} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" amount={0.1}>
                {articles.map((article) => (
                  <StaggerItem key={article.slug} as="div">
                    <a href={`/${lang}/blog/${article.slug}`} className="card-3d group block rounded-xl overflow-hidden border border-white/10 hover:border-[#B2904D]/30 bg-[#000a20]/60 transition-colors duration-300">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title[lang]}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#000a20] to-transparent opacity-60" />
                      </div>
                      <div className="p-4">
                        <h4 className="text-sm font-medium text-white group-hover:text-[#B2904D] transition-colors line-clamp-2 leading-snug">
                          {article.title[lang]}
                        </h4>
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
        )}

        {/* CONTACT (the #contacto anchor lives on the inner ContactForm section) */}
        <section className="relative py-32 z-10 bg-transparent">
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <Reveal variant="up" amount={0.2} className="relative z-10 p-5 sm:p-8 md:p-12 bg-white/5 backdrop-blur-md rounded-2xl sm:rounded-[2rem] shadow-2xl border border-white/10" eager>
              <div className="text-white">
                <h2 className="text-2xl sm:text-3xl font-black mb-6">{t('requestEvaluation')}</h2>
                <p className="text-white/70 mb-8">{t('heroDescription')}</p>
                <ContactForm lang={lang} />
              </div>
            </Reveal>
          </div>
        </section>
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
