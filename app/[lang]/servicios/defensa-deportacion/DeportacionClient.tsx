import Image from 'next/image';
import { OFFICE_NAP_SLUGS } from '../../../components/officesPhoneMap';
import type { ElementType } from 'react';
import { ArrowRight, FileText, Shield, PhoneCall, AlertTriangle, Siren, Target, CheckCircle2, Landmark, BookOpen, HelpCircle, MapPin } from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ContactForm from '../../../components/ContactForm';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { Reveal, Stagger, StaggerItem, MagneticButton } from '../../../components/motion';
import DeportacionCases from './DeportacionCases';
import { resolveTabs, resolveSteps, resolveFaqs, resolveBlog, getOffices, resolveUi, emergencyPhone, type StepIconKey } from './defensaData';
import type { Language } from '../../../lib/translations';
import ServiceAttorneys from '../../../components/ServiceAttorneys';
import type { ServiceAttorney } from '../../../lib/serviceAttorneys';

/** Sedes totales, del registro NAP. Era '15' a mano. */
const TOTAL_LOCATIONS = OFFICE_NAP_SLUGS.length;

const STEP_ICONS: Record<StepIconKey, ElementType> = { siren: Siren, fileText: FileText, target: Target, checkCircle2: CheckCircle2, landmark: Landmark, bookOpen: BookOpen };

/**
 * Deportation Defense page — server-first (Fase 2.3 Lote C, enfoque b). Stats
 * hero (no image — emergency phone + stats) + tabs island + linked offices +
 * process + STATIC FAQ + blog. LCP sacred: H1 static (text LCP). page.tsx
 * generateMetadata + JSON-LD untouched.
 */
export default function DeportacionClient({
  lang,
  serviceAttorneys = [],
}: {
  lang: Language;
  /** Abogados que declaran esta área; vacío si ninguno la declara. */
  serviceAttorneys?: ServiceAttorney[];
}) {
  const isEs = lang === 'es';
  const ui = resolveUi(lang);
  const tabs = resolveTabs(lang);
  const steps = resolveSteps(lang);
  const faqs = resolveFaqs(lang);
  const blog = resolveBlog(lang);
  const offices = getOffices();
  const stats = [{ value: '35+', label: ui.statsYears }, { value: '50K+', label: ui.statsCases }, { value: String(TOTAL_LOCATIONS), label: ui.statsOffices }];

  return (
    <div className="min-h-screen flex flex-col bg-navy-500 text-white relative selection:bg-[#B2904D] selection:text-white font-sans overflow-x-hidden">
      <Header />

      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full transform-gpu">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#001f5f]" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[80px] opacity-30" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[70vw] h-[70vw] bg-sky-800/10 rounded-full blur-[90px] opacity-20" />
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
          <span className="text-[15vw] font-black italic text-white tracking-tighter transform -skew-x-12 whitespace-nowrap">DEPORTACIÓN</span>
        </div>
      </div>

      {/* <main> arranca aquí (destino del skip link #main-content): Header y Footer quedan FUERA para que el salto caiga tras la navegación. */}
      <main id="main-content" tabIndex={-1}>
        <div className="relative z-10 pt-24 md:pt-28 px-4">
          <div className="container mx-auto max-w-7xl">
            <Breadcrumbs items={[
              { label: { es: 'Inicio', en: 'Home' }, href: `/${lang}` },
              { label: { es: 'Servicios', en: 'Services' }, href: `/${lang}/servicios` },
              { label: { es: 'Defensa de Deportación', en: 'Deportation Defense' }, href: `/${lang}/servicios/defensa-deportacion` },
            ]} />
          </div>
        </div>

        {/* HERO — stats column + text (no image); LCP = H1 static */}
        <section className="relative pt-8 md:pt-12 pb-12 md:pb-20 px-4 z-10 min-h-[85vh] flex flex-col justify-center">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5 relative flex flex-col items-center justify-center gap-8 order-2 lg:order-1">
                <a href="tel:+18325980914" className="w-full max-w-md p-8 rounded-[2rem] border-2 border-red-500/40 bg-gradient-to-br from-red-900/30 to-red-950/20 backdrop-blur-xl shadow-[0_0_40px_rgba(220,38,38,0.15)] block transition-transform hover:scale-[1.02]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
                      <PhoneCall className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="text-red-400 text-xs font-bold tracking-[0.2em] uppercase block">{ui.ctaCall}</span>
                      <span className="text-white text-2xl font-black tracking-tight">{emergencyPhone}</span>
                    </div>
                  </div>
                  <p className="text-red-200/70 text-sm">{ui.emergencyDesc}</p>
                </a>

                <Stagger gap={0.1} className="grid grid-cols-3 gap-4 w-full max-w-md" amount={0.3}>
                  {stats.map((stat, i) => (
                    <StaggerItem key={i} as="div" variant="up" className="text-center p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                      <span className="text-3xl font-black text-[#B2904D] block">{stat.value}</span>
                      <span className="text-xs text-white/60 uppercase tracking-wider font-medium">{stat.label}</span>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>

              <div className="lg:col-span-7 space-y-8 pl-0 lg:pl-8 relative z-20 order-1 lg:order-2 flex flex-col justify-center items-start">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 backdrop-blur-sm shadow-[0_0_15px_rgba(220,38,38,0.1)] self-start">
                  <AlertTriangle size={16} className="text-red-400" />
                  <span className="text-red-400 text-xs font-bold tracking-[0.2em] uppercase">{ui.badge}</span>
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
                  <a href="tel:+18325980914" className="px-8 py-4 border-2 border-red-500/50 hover:border-red-400 text-white font-bold rounded-xl transition-all flex items-center gap-3 group text-base bg-red-500/10 hover:bg-red-500/20">
                    <PhoneCall size={20} className="text-red-400" />
                    {ui.ctaCall}
                  </a>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <DeportacionCases tabs={tabs} requestEvaluation={ui.requestEvaluation} detainedLink={ui.detainedLink} lang={lang} />

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
            <Stagger gap={0.1} className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 relative" amount={0.1}>
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

        {/* FAQ — static, server-rendered */}
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

        {/* BLOG */}
        <section className="py-24 relative bg-navy-500">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <Reveal variant="up" className="text-center mb-16" amount={0.4}>
              <h2 className="text-3xl font-black text-white mb-4">{ui.blogTitle}</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-[#B2904D] to-transparent mx-auto rounded-full mt-6" />
            </Reveal>
            <Stagger gap={0.08} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" amount={0.1}>
              {blog.map((article) => (
                <StaggerItem key={article.slug} as="div">
                  <a href={`/${lang}/blog/${article.slug}`} className="card-3d group block rounded-xl overflow-hidden border border-white/10 hover:border-[#B2904D]/30 bg-[#000a20]/60 transition-colors duration-300">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={article.image} alt={article.title} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
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

        {/* CONTACT */}
        <section id="contacto" className="relative py-32 z-10 bg-transparent">
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <Reveal variant="up" amount={0.2} className="relative z-10 p-5 sm:p-8 md:p-12 bg-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-[3rem] shadow-2xl border border-white/10 overflow-hidden" eager>
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
        {/* Dentro del <main> y antes del Footer: quién responde por el área
            pesa más en E-E-A-T que repetir los años del despacho. */}
        <ServiceAttorneys attorneys={serviceAttorneys} lang={lang === 'en' ? 'en' : 'es'} />
      </main>

      <Footer />
    </div>
  );
}
