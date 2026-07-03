import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Phone, Mail, PhoneCall, ArrowRight, Star, Scale, FileText } from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ContactForm from '../../../components/ContactForm';
import Breadcrumbs from '../../../components/Breadcrumbs';
import TrackedPhoneLink from '../../../components/TrackedPhoneLink';
import { Reveal, Stagger, StaggerItem, MagneticButton } from '../../../components/motion';
import { allServices, processSteps, ui, getText } from './accidentesData';
import { officesUi, OFFICE_NAME, type AccidentOffice } from './accidentesOfficesData';
import type { Language } from '../../../lib/translations';

/**
 * Página por-oficina enfocada en accidentes — /servicios/accidentes/oficinas/[slug].
 * Server-first: reutiliza el lenguaje visual de AccidentesClient (fondo navy +
 * dorado, .card-3d, islas Reveal/Stagger) pero personalizada a una sola oficina:
 * hero con NAP, tarjeta de contacto, especialidades de accidentes, proceso y
 * formulario. La conversión phone_click se preserva con TrackedPhoneLink.
 *
 * NO emite schema LocalBusiness: la ficha canónica vive en /oficinas/[slug]
 * (varias direcciones son virtuales — riesgo NAP). El page.tsx solo añade
 * BreadcrumbList.
 */
export default function AccidenteOfficePageView({
  office,
  lang,
}: {
  office: AccidentOffice;
  lang: Language;
}) {
  const isEs = lang === 'es';
  const t = (k: keyof typeof ui) => ui[k][lang];
  const tb = (obj: { es: string; en: string }) => obj[lang] || obj.es;
  const gT = (obj: Parameters<typeof getText>[0]) => getText(obj, lang);

  const mapHref =
    office.mapLink && !office.mapLink.includes('your_map_link_here')
      ? office.mapLink
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`;

  return (
    <div className="min-h-screen flex flex-col bg-navy-500 text-white relative selection:bg-[#B2904D] selection:text-white font-sans overflow-x-hidden">
      <Header />

      {/* Background — static */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full transform-gpu">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#001f5f]" />
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }} />
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[80px] opacity-30" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[70vw] h-[70vw] bg-sky-800/10 rounded-full blur-[90px] opacity-20" />
      </div>

      {/* Breadcrumbs */}
      <div className="relative z-10 pt-24 md:pt-28 px-4">
        <div className="container mx-auto max-w-7xl">
          <Breadcrumbs items={[
            { label: { es: 'Inicio', en: 'Home' }, href: `/${lang}` },
            { label: { es: 'Servicios', en: 'Services' }, href: `/${lang}/servicios` },
            { label: { es: 'Accidentes', en: 'Accidents' }, href: `/${lang}/servicios/accidentes` },
            { label: office.name, href: `/${lang}/servicios/accidentes/oficinas/${office.id}` },
          ]} />
        </div>
      </div>

      {/* HERO */}
      <section className="relative pt-8 md:pt-12 pb-16 md:pb-24 px-4 z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">

            {/* Imagen de la oficina */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <Reveal variant="left" amount={0.2} className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(56,189,248,0.15)] bg-black">
                <Image
                  src={office.image}
                  alt={tb(office.title)}
                  fill
                  className="object-cover opacity-90"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-50" />
              </Reveal>
            </div>

            {/* Texto hero */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B2904D]/30 bg-[#B2904D]/10 backdrop-blur-sm">
                <Star size={14} className="text-[#B2904D] fill-[#B2904D]" />
                <span className="text-[#B2904D] text-xs font-bold tracking-widest uppercase">{office.area}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin text-white tracking-tight leading-none">
                <span className="block text-white/90 font-extralight mb-2">
                  {isEs ? 'Abogado de Accidentes' : 'Accident Lawyer'}
                </span>
                <span className="block font-medium text-[#B2904D] drop-shadow-xl">{tb(office.title)}</span>
              </h1>

              <div className="h-1 w-20 bg-gradient-to-r from-[#B2904D] to-transparent rounded-full" />

              <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed border-l-2 border-[#B2904D]/50 pl-6">
                {t('heroDescription')}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <MagneticButton as="a" href={`tel:${office.phone.replace(/[^\d+]/g, '')}`} className="items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[#B2904D] hover:bg-white text-[#001540] font-bold rounded-xl transition-colors shadow-[0_0_15px_rgba(178,144,77,0.3)] group text-sm md:text-base">
                  <PhoneCall size={18} />
                  {t('callNow')}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
                <a href="#contacto" className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 border border-white/20 hover:border-[#B2904D]/50 text-white font-bold rounded-xl transition-colors text-sm md:text-base">
                  {t('ctaConsultation')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TARJETA DE CONTACTO / NAP */}
      <section className="relative py-12 md:py-16 px-4 z-10" aria-labelledby="office-contact-title">
        <div className="container mx-auto max-w-7xl">
          <Reveal variant="up" amount={0.2} className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-[#B2904D] via-[#D4AF37] to-transparent" />
            <div className="p-6 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <MapPin className="text-[#B2904D]" size={22} />
                <h2 id="office-contact-title" className="text-2xl md:text-3xl font-thin text-white">
                  {isEs ? 'Visítanos o llámanos' : 'Visit us or call us'}
                </h2>
              </div>
              {office.note && (
                <p className="text-sm text-[#B2904D] font-medium mb-6">{tb(office.note)}</p>
              )}

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {/* Dirección */}
                <div>
                  <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-2">{tb(officesUi.address)}</p>
                  <p className="text-white text-sm leading-snug mb-2">{office.address}</p>
                  <a href={mapHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#B2904D] text-sm font-bold hover:text-white transition-colors">
                    {tb(officesUi.viewMap)} →
                  </a>
                </div>
                {/* Teléfono */}
                <div>
                  <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-2">{tb(officesUi.phone)}</p>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-[#B2904D] shrink-0" />
                    <TrackedPhoneLink phone={office.phone} className="text-white text-base font-medium hover:text-[#B2904D] transition-colors" />
                  </div>
                </div>
                {/* Horario */}
                <div>
                  <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-2">{tb(officesUi.hours)}</p>
                  <div className="flex items-start gap-2">
                    <Clock size={16} className="text-[#B2904D] shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">{tb(office.hours)}</span>
                  </div>
                </div>
                {/* Email */}
                <div>
                  <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-2">Email</p>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-[#B2904D] shrink-0" />
                    <a href={`mailto:${office.email}`} className="text-white/80 text-sm hover:text-[#B2904D] transition-colors break-all">{office.email}</a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ESPECIALIDADES DE ACCIDENTES */}
      <section className="relative py-16 md:py-24 px-4 z-10" aria-labelledby="office-cases-title">
        <div className="container mx-auto max-w-7xl">
          <Reveal variant="up" className="text-center mb-12 md:mb-16" amount={0.3}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
              <Scale size={14} className="text-[#B2904D]" />
              <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">{t('specialties')}</span>
            </div>
            <h2 id="office-cases-title" className="text-2xl sm:text-3xl md:text-4xl font-thin text-white mb-4">
              {t('casesTitle')}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#B2904D] to-transparent mx-auto rounded-full" />
          </Reveal>

          <Stagger gap={0.07} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6" amount={0.1}>
            {allServices.map((c) => {
              const Icon = c.icon;
              return (
                <StaggerItem key={c.id} as="div" variant="up" className="card-3d group bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-[#B2904D]/40 transition-colors duration-300 p-6 h-full">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-5 group-hover:bg-[#B2904D] transition-colors">
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-1">{gT(c.title)}</h3>
                  <p className="text-xs text-[#B2904D] font-medium uppercase tracking-wide mb-3">{gT(c.subtitle)}</p>
                  <p className="text-white/70 text-sm leading-relaxed line-clamp-4">{gT(c.content.description)}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* PROCESO */}
      <section className="relative py-16 md:py-24 px-4 z-10">
        <div className="container mx-auto max-w-7xl">
          <Reveal variant="up" className="text-center mb-12 md:mb-16" amount={0.3}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
              <FileText size={14} className="text-[#B2904D]" />
              <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">{t('processMethod')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-thin text-white mb-4">{t('processTitle')}</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#B2904D] to-transparent mx-auto rounded-full" />
          </Reveal>

          <Stagger gap={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6" amount={0.1}>
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={step.id} as="div" variant="up" className="group relative">
                  <div className="card-3d bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 hover:border-[#B2904D]/40 transition-colors duration-300 h-full">
                    <div className="absolute -top-3 -left-3 w-9 h-9 bg-gradient-to-br from-[#B2904D] to-[#D4AF37] rounded-lg flex items-center justify-center font-black text-white shadow-md z-10">{step.id}</div>
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-[#B2904D] transition-colors">
                      <Icon size={22} className="text-white" />
                    </div>
                    <h3 className="font-bold text-base md:text-lg text-white mb-2">{gT(step.title)}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{gT(step.desc)}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="relative py-20 md:py-28 z-10 bg-transparent scroll-mt-24 px-4">
        <div className="max-w-4xl mx-auto relative z-10">
          <Reveal variant="up" amount={0.2} className="relative z-10 p-5 sm:p-8 md:p-12 bg-white/5 backdrop-blur-md rounded-2xl sm:rounded-[2rem] shadow-2xl border border-white/10">
            <div className="text-white">
              <h2 className="text-2xl sm:text-3xl font-black mb-2">{t('requestEvaluation')}</h2>
              <p className="text-white/60 text-sm mb-6">
                {OFFICE_NAME} · {tb(office.title)}
              </p>
              <ContactForm lang={lang} />
            </div>
          </Reveal>

          {/* Volver a todas las oficinas + ficha canónica de la oficina */}
          <div className="text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <Link href={`/${lang}/servicios/accidentes`} className="inline-flex items-center gap-2 text-[#B2904D] text-sm font-bold hover:text-white transition-colors">
              ← {isEs ? 'Ver todas las oficinas de accidentes' : 'See all accident offices'}
            </Link>
            <Link href={`/${lang}/oficinas/${office.id}`} className="inline-flex items-center gap-2 text-[#B2904D] text-sm font-bold hover:text-white transition-colors">
              {tb(officesUi.viewOfficeProfile)} →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
