import React from 'react'
import Header from './Header'
import Footer from './Footer'
import ContactForm from './ContactForm'
import {
  MapPin, Phone, Clock, Shield, Award, Users, Star,
  Scale, CheckCircle2, ArrowRight, Building2, HelpCircle, FileText
} from 'lucide-react'
import type { LandingPageConfig, OfficeInfo, ServiceInfo } from '../lib/cityServiceData'
import type { FAQItem, TypicalCase } from '../lib/cityServiceLocalContent'
import type { Language } from '../lib/translations'
import Link from 'next/link'
import { Reveal, Stagger, StaggerItem, MagneticButton } from './motion'
import PhoneClickTracker from './PhoneClickTracker'
import { getPlaceData } from '../lib/googleReviews'
import { getOfficePlaceId } from '../lib/officesRegistry'
import { LANDING_TO_OFFICE_FOR_REVIEWS } from '../lib/landingSchema'

/**
 * City × Service landing — server-first (Fase 2.3 landings). ONE shared
 * component renders ~25 SEO landing routes. Bilingual data arrives as props
 * (resolved per `lang` on the server → the inactive locale never reaches the
 * client bundle: enfoque b). No interactive state — purely presentational, so
 * it's a pure Server Component; movement lives in Reveal/Stagger islands and the
 * native `<details>` FAQ. LCP sacred: text H1 renders immediately (no gating).
 * The per-route page.tsx (generateMetadata + LegalService/FAQ/Breadcrumb
 * JSON-LD) is untouched — only the `lang` prop is threaded in.
 */
interface CityServiceLandingProps {
  config: LandingPageConfig
  office: OfficeInfo
  service: ServiceInfo
  lang: Language
  siblingCities?: { slug: string; city: string; stateCode: string }[]
  localFAQ?: FAQItem[]
  typicalCases?: TypicalCase[]
  relatedServiceLinks?: { slug: string; title: { es: string; en: string } }[]
}

export default async function CityServiceLanding({
  config,
  office,
  service,
  lang,
  siblingCities = [],
  localFAQ = [],
  typicalCases = [],
  relatedServiceLinks = [],
}: CityServiceLandingProps) {
  const isEs = lang === 'es'
  const phoneClean = `+1${office.phone.replace(/\D/g, '')}`

  // Rating en vivo de Google (misma fuente que el JSON-LD de la landing).
  // Sin clave de API o sin datos → cae a un dato NO fabricado (bilingüe).
  const reviewOfficeSlug = LANDING_TO_OFFICE_FOR_REVIEWS[config.slug]
  const placeId = reviewOfficeSlug ? getOfficePlaceId(reviewOfficeSlug) : null
  const placeData = placeId ? await getPlaceData(placeId) : null
  const liveRating = placeData && placeData.userRatingCount > 0 ? placeData : null

  return (
    <>
      <Header />

      <main id="main-content" tabIndex={-1} className="min-h-screen bg-navy-500">
        <PhoneClickTracker label="city_landing" office={office.city} practiceArea={service.shortTitle.en} />
        {/* ===== HERO SECTION ===== */}
        <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#001540] via-[#001030] to-[#001540] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#B2904D]/15 text-xs font-semibold tracking-widest text-[#B2904D] uppercase">
              {service.shortTitle[lang]} — {office.city}, {office.stateCode}
            </span>

            {/* H1 — static server text (LCP), not gated */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight">
              {config.h1[lang]}
            </h1>

            <Reveal as="p" variant="up" delay={0.1} className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
              {config.intro[lang]}
            </Reveal>

            <Reveal variant="up" delay={0.2} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton as="a" href={`tel:${phoneClean}`} className="items-center justify-center gap-2 rounded-full bg-[#B2904D] text-white font-bold text-lg px-8 py-4 transition-colors hover:bg-[#9A7A3D] shadow-lg shadow-[#B2904D]/20">
                <Phone className="h-5 w-5" />
                {isEs ? 'Llamar Ahora: ' : 'Call Now: '}{office.phone}
              </MagneticButton>
              <a href="#contacto" className="inline-flex items-center justify-center rounded-full border-2 border-white/30 text-white font-semibold text-lg px-8 py-4 transition-colors hover:bg-white/10 hover:border-white/50">
                {isEs ? 'Solicitar Consulta' : 'Request Consultation'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Reveal>
          </div>
        </section>

        {/* ===== TRUST BAR ===== */}
        <section className="py-8 px-4 border-y border-white/5 bg-white/[0.02]">
          <Stagger gap={0.08} className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center" amount={0.3}>
            {[
              { Icon: Award, value: '35+', label: isEs ? 'Años de experiencia' : 'Years of experience' },
              { Icon: Users, value: '50,000+', label: isEs ? 'Casos ganados' : 'Cases won' },
              liveRating
                ? { Icon: Star, value: `${liveRating.rating.toFixed(1)}★`, label: isEs ? `${liveRating.userRatingCount} reseñas en Google` : `${liveRating.userRatingCount} Google reviews` }
                : { Icon: CheckCircle2, value: '100%', label: isEs ? 'Atención bilingüe' : 'Bilingual service' },
              { Icon: Building2, value: '15', label: isEs ? 'Oficinas en 5 estados' : 'Offices in 5 states' },
            ].map(({ Icon, value, label }, i) => (
              <StaggerItem key={i} as="div" variant="up" className="flex flex-col items-center">
                <Icon className="h-8 w-8 text-[#B2904D] mb-2" />
                <span className="text-2xl font-extrabold text-white">{value}</span>
                <span className="text-sm text-slate-400">{label}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ===== SERVICES OFFERED ===== */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Reveal variant="up" className="text-center mb-12" amount={0.4}>
              <span className="inline-block mb-3 px-3 py-1 rounded-full bg-sky-500/10 text-xs font-semibold tracking-widest text-sky-400 uppercase">
                {isEs ? 'Servicios' : 'Services'}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                {isEs ? `Servicios de ${service.shortTitle.es} en ${office.city}` : `${service.shortTitle.en} Services in ${office.city}`}
              </h2>
              <p className="mt-4 text-slate-300 max-w-2xl mx-auto">{service.description[lang]}</p>
              <Link
                href={`/${lang}/servicios/${service.serviceSlug}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#B2904D] hover:text-[#9A7A3D] transition-colors"
              >
                {isEs ? `Conozca todo sobre ${service.shortTitle.es}` : `Learn more about ${service.shortTitle.en}`}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>

            <Stagger gap={0.06} className="grid grid-cols-1 sm:grid-cols-2 gap-4" amount={0.1}>
              {service.relatedServices[lang].map((svc, i) => (
                <StaggerItem key={i} as="div" className="card-3d flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-sky-400/30 transition-colors">
                  <CheckCircle2 className="h-5 w-5 text-[#B2904D] mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium text-sm sm:text-base">{svc}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ===== WHY CHOOSE US ===== */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <Reveal variant="up" className="text-center mb-12" amount={0.4}>
              <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#B2904D]/15 text-xs font-semibold tracking-widest text-[#B2904D] uppercase">
                {isEs ? '¿Por qué elegirnos?' : 'Why Choose Us?'}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                {isEs ? `¿Por qué elegir a Manuel Solís en ${office.city}?` : `Why Choose Manuel Solis in ${office.city}?`}
              </h2>
            </Reveal>

            <Stagger gap={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" amount={0.1}>
              {config.whyChooseUs[lang].map((reason, i) => (
                <StaggerItem key={i} as="div" className="card-3d flex items-start gap-4 p-6 rounded-2xl border border-white/10 bg-white/5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#B2904D]/15 text-[#B2904D] flex-shrink-0">
                    <Shield className="h-5 w-5" />
                  </div>
                  <p className="text-slate-200 font-medium leading-relaxed">{reason}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ===== OFFICE INFORMATION ===== */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Reveal variant="up" className="text-center mb-12" amount={0.4}>
              <span className="inline-block mb-3 px-3 py-1 rounded-full bg-sky-500/10 text-xs font-semibold tracking-widest text-sky-400 uppercase">
                {isEs ? 'Oficina' : 'Office'}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                {isEs ? `Nuestra Oficina en ${office.city}` : `Our Office in ${office.city}`}
              </h2>
            </Reveal>

            <Stagger gap={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-8" amount={0.15}>
              <StaggerItem as="div" className="p-8 rounded-2xl border border-white/10 bg-white/5">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Scale className="h-5 w-5 text-[#B2904D]" />
                  {isEs ? `Oficina de ${office.city}` : `${office.city} Office`}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#B2904D] mt-0.5 flex-shrink-0" />
                    <div><p className="text-white font-medium">{office.address}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[#B2904D] flex-shrink-0" />
                    <a href={`tel:${phoneClean}`} className="text-white font-medium hover:text-[#B2904D] transition-colors">{office.phone}</a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-[#B2904D] mt-0.5 flex-shrink-0" />
                    <div className="text-slate-300 text-sm">
                      <p>{isEs ? 'Lunes a Viernes: 8:00 AM – 6:00 PM' : 'Monday to Friday: 8:00 AM – 6:00 PM'}</p>
                      <p>{isEs ? 'Sábado: 9:00 AM – 1:00 PM' : 'Saturday: 9:00 AM – 1:00 PM'}</p>
                    </div>
                  </div>
                </div>
                <a href={`tel:${phoneClean}`} className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#B2904D] text-white font-bold py-3 px-6 transition-all hover:bg-[#9A7A3D] hover:scale-[1.02]">
                  <Phone className="h-4 w-4" />
                  {isEs ? 'Llamar ahora' : 'Call now'}
                </a>
              </StaggerItem>

              <StaggerItem as="div" className="p-8 rounded-2xl border border-white/10 bg-white/5">
                {office.additionalOffices && office.additionalOffices.length > 0 ? (
                  <>
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-sky-400" />
                      {isEs ? 'Oficinas adicionales' : 'Additional Offices'}
                    </h3>
                    <div className="space-y-6">
                      {office.additionalOffices.map((addOffice, i) => (
                        <div key={i} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                          <h4 className="text-white font-semibold mb-2">{addOffice.name}</h4>
                          <div className="flex items-start gap-2 mb-1">
                            <MapPin className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                            <p className="text-slate-300 text-sm">{addOffice.address}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-slate-400 flex-shrink-0" />
                            <a href={`tel:+1${addOffice.phone.replace(/\D/g, '')}`} className="text-slate-300 text-sm hover:text-[#B2904D] transition-colors">{addOffice.phone}</a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-sky-400" />
                      {isEs ? 'Firma Nacional' : 'National Firm'}
                    </h3>
                    <p className="text-slate-300 mb-4">
                      {isEs
                        ? 'Manuel Solís es una firma nacional con 15 oficinas en 5 estados. Además de nuestra oficina en ' + office.city + ', tenemos presencia en Texas, California, Illinois, Colorado y Tennessee.'
                        : 'Manuel Solis is a national firm with 15 offices in 5 states. In addition to our ' + office.city + ' office, we have a presence in Texas, California, Illinois, Colorado, and Tennessee.'}
                    </p>
                    <div className="mt-4 space-y-2 text-sm text-slate-400">
                      <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#B2904D]" /> Houston, TX (3 {isEs ? 'oficinas' : 'offices'})</p>
                      <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#B2904D]" /> Dallas, TX</p>
                      <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#B2904D]" /> El Paso, TX</p>
                      <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#B2904D]" /> Harlingen, TX</p>
                      <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#B2904D]" /> Chicago, IL</p>
                      <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#B2904D]" /> Los Angeles, CA</p>
                      <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#B2904D]" /> Denver/Arvada, CO</p>
                      <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#B2904D]" /> Memphis, TN</p>
                    </div>
                  </>
                )}
              </StaggerItem>
            </Stagger>
          </div>
        </section>

        {/* ===== TRUST / CREDENTIALS ===== */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto text-center">
            <Reveal variant="up" amount={0.4}>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8">
                {isEs ? 'Confíe en Nuestra Experiencia' : 'Trust Our Experience'}
              </h2>
            </Reveal>
            <Stagger gap={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" amount={0.1}>
              <StaggerItem as="div" className="card-3d p-6 rounded-2xl border border-white/10 bg-white/5">
                <Award className="h-10 w-10 text-[#B2904D] mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">{isEs ? 'Desde 1990' : 'Since 1990'}</h3>
                <p className="text-sm text-slate-400">{isEs ? 'Más de 35 años de experiencia defendiendo los derechos de la comunidad inmigrante en Estados Unidos.' : 'Over 35 years of experience defending the rights of the immigrant community in the United States.'}</p>
              </StaggerItem>
              <StaggerItem as="div" className="card-3d p-6 rounded-2xl border border-white/10 bg-white/5">
                <Shield className="h-10 w-10 text-[#B2904D] mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">{isEs ? 'Miembro del Colegio de Abogados' : 'Bar Association Member'}</h3>
                <p className="text-sm text-slate-400">{isEs ? 'Abogados licenciados y en buen estado con los colegios de abogados estatales correspondientes.' : 'Licensed attorneys in good standing with corresponding state bar associations.'}</p>
              </StaggerItem>
              <StaggerItem as="div" className="card-3d p-6 rounded-2xl border border-white/10 bg-white/5 sm:col-span-2 lg:col-span-1">
                <Users className="h-10 w-10 text-[#B2904D] mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">{isEs ? 'Equipo Bilingüe' : 'Bilingual Team'}</h3>
                <p className="text-sm text-slate-400">{isEs ? 'Todo nuestro equipo habla español e inglés para atenderlo en el idioma que prefiera.' : 'Our entire team speaks Spanish and English to serve you in the language you prefer.'}</p>
              </StaggerItem>
            </Stagger>
          </div>
        </section>

        {/* ===== CONTACT FORM SECTION ===== */}
        <section id="contacto" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="max-w-4xl mx-auto">
            <Reveal variant="up" className="text-center mb-10" amount={0.3}>
              <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#B2904D]/15 text-xs font-semibold tracking-widest text-[#B2904D] uppercase">
                {isEs ? 'Contacto' : 'Contact'}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                {isEs ? 'Consulta Confidencial' : 'Confidential Consultation'}
              </h2>
              <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
                {isEs ? `Hable con un abogado experimentado de nuestra oficina en ${office.city}. Atención personalizada y confidencial.` : `Speak with an experienced attorney from our ${office.city} office. Personalized and confidential attention.`}
              </p>
            </Reveal>
            <ContactForm lang={lang} />
          </div>
        </section>

        {/* ===== TYPICAL CASES ===== */}
        {typicalCases.length > 0 && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
            <div className="max-w-5xl mx-auto">
              <Reveal variant="up" className="text-center mb-10" amount={0.4}>
                <span className="inline-block mb-3 px-3 py-1 rounded-full bg-sky-500/10 text-xs font-semibold tracking-widest text-sky-400 uppercase">
                  {isEs ? 'Casos típicos' : 'Typical Cases'}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                  {isEs ? `Casos que manejamos en ${office.city}` : `Cases we handle in ${office.city}`}
                </h2>
                <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-sm">
                  {isEs ? 'Resúmenes anónimos de casos representativos. Cada situación es única — su consulta es confidencial.' : 'Anonymized summaries of representative cases. Each situation is unique — your consultation is confidential.'}
                </p>
              </Reveal>
              <Stagger gap={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" amount={0.1}>
                {typicalCases.map((tc, i) => (
                  <StaggerItem key={i} as="div" className="card-3d p-6 rounded-2xl border border-white/10 bg-white/5 transition-colors">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400 mb-4">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{tc.title[lang]}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{tc.description[lang]}</p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>
        )}

        {/* ===== LOCAL FAQ (native <details>, server-rendered) ===== */}
        {localFAQ.length > 0 && (
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <Reveal variant="up" className="text-center mb-10" amount={0.4}>
                <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#B2904D]/15 text-xs font-semibold tracking-widest text-[#B2904D] uppercase">
                  {isEs ? 'Preguntas frecuentes' : 'Frequently Asked Questions'}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                  {isEs ? `Preguntas frecuentes — ${service.shortTitle.es} en ${office.city}` : `${service.shortTitle.en} FAQ in ${office.city}`}
                </h2>
              </Reveal>
              <Stagger gap={0.06} className="space-y-4" amount={0.15}>
                {localFAQ.map((item, i) => (
                  <StaggerItem key={i} as="div">
                    <details className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-colors">
                      <summary className="flex items-start gap-3 p-5 cursor-pointer list-none">
                        <HelpCircle className="h-5 w-5 text-[#B2904D] mt-0.5 flex-shrink-0" />
                        <span className="text-white font-semibold text-base sm:text-lg flex-1">{item.question[lang]}</span>
                        <span className="text-[#B2904D] text-2xl leading-none flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                      </summary>
                      <div className="px-5 pb-5 pl-13 text-slate-300 leading-relaxed">{item.answer[lang]}</div>
                    </details>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>
        )}

        {/* ===== RELATED SERVICES ===== */}
        {relatedServiceLinks.length > 0 && (
          <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
            <div className="max-w-5xl mx-auto">
              <Reveal variant="up" className="text-center mb-8" amount={0.4}>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {isEs ? `Otros servicios en ${office.city}` : `Other services in ${office.city}`}
                </h2>
              </Reveal>
              <Stagger gap={0.06} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" amount={0.1}>
                {relatedServiceLinks.map((rs) => (
                  <StaggerItem key={rs.slug} as="div">
                    <Link href={`/${lang}/${rs.slug}`} className="card-3d flex items-center justify-between gap-3 p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-[#B2904D]/10 hover:border-[#B2904D]/30 transition-colors group">
                      <span className="text-white font-semibold group-hover:text-[#B2904D] transition-colors">{rs.title[lang]}</span>
                      <ArrowRight className="h-4 w-4 text-[#B2904D] flex-shrink-0" />
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>
        )}

        {/* ===== OTHER CITIES ===== */}
        {siblingCities.length > 0 && (
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <Reveal variant="up" className="text-center mb-10" amount={0.4}>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {isEs ? `${service.shortTitle.es} en Otras Ciudades` : `${service.shortTitle.en} in Other Cities`}
                </h2>
              </Reveal>
              <Stagger gap={0.05} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" amount={0.1}>
                {siblingCities.map((sc) => (
                  <StaggerItem key={sc.slug} as="div">
                    <Link href={`/${lang}/${sc.slug}`} className="card-3d flex items-center gap-2 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-[#B2904D]/10 hover:border-[#B2904D]/30 transition-colors group">
                      <MapPin className="h-4 w-4 text-[#B2904D] flex-shrink-0" />
                      <span className="text-white text-sm font-medium group-hover:text-[#B2904D] transition-colors">{sc.city}, {sc.stateCode}</span>
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>
        )}

        {/* ===== FINAL CTA ===== */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <Reveal variant="up" amount={0.3} className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-br from-[#B2904D] to-[#8A6E3A] p-10 sm:p-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              {isEs ? `¿Necesita un Abogado en ${office.city}?` : `Need an Attorney in ${office.city}?`}
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              {isEs ? 'No enfrente su situación legal solo. Llame ahora y hable con uno de nuestros abogados experimentados.' : "Don't face your legal situation alone. Call now and speak with one of our experienced attorneys."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton as="a" href={`tel:${phoneClean}`} className="items-center justify-center gap-2 rounded-full bg-white text-[#001540] font-bold text-lg px-8 py-4 shadow-lg">
                <Phone className="h-5 w-5" />
                {office.phone}
              </MagneticButton>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  )
}
