'use client'

import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import Header from './Header'
import Footer from './Footer'
import dynamic from 'next/dynamic'
import {
  MapPin, Phone, Clock, Shield, Award, Users, Star,
  Scale, CheckCircle2, ArrowRight, Building2
} from 'lucide-react'
import type { LandingPageConfig, OfficeInfo, ServiceInfo } from '../lib/cityServiceData'
import { MAIN_PHONE } from '../lib/cityServiceData'
import Link from 'next/link'

const ContactForm = dynamic(() => import('./ContactForm'), {
  loading: () => <div className="h-[600px] w-full bg-white/5 animate-pulse rounded-2xl border border-white/10" />
})

interface CityServiceLandingProps {
  config: LandingPageConfig
  office: OfficeInfo
  service: ServiceInfo
  siblingCities?: { slug: string; city: string; stateCode: string }[]
}

export default function CityServiceLanding({ config, office, service, siblingCities = [] }: CityServiceLandingProps) {
  const { language } = useLanguage()
  const isEs = language === 'es'
  const lang = language

  const phoneClean = `+1${office.phone.replace(/\D/g, '')}`

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#001540]">
        {/* ===== HERO SECTION ===== */}
        <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Subtle background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#001540] via-[#001030] to-[#001540] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-5xl mx-auto text-center">
            {/* Badge */}
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#B2904D]/15 text-xs font-semibold tracking-widest text-[#B2904D] uppercase">
              {service.shortTitle[lang]} — {office.city}, {office.stateCode}
            </span>

            {/* H1 */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight">
              {config.h1[lang]}
            </h1>

            {/* Intro */}
            <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
              {config.intro[lang]}
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${phoneClean}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B2904D] text-white font-bold text-lg px-8 py-4 transition-all hover:bg-[#9A7A3D] hover:scale-105 shadow-lg shadow-[#B2904D]/20"
              >
                <Phone className="h-5 w-5" />
                {isEs ? 'Llamar Ahora: ' : 'Call Now: '}{office.phone}
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/30 text-white font-semibold text-lg px-8 py-4 transition-colors hover:bg-white/10 hover:border-white/50"
              >
                {isEs ? 'Solicitar Consulta' : 'Request Consultation'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </section>

        {/* ===== TRUST BAR ===== */}
        <section className="py-8 px-4 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Award className="h-8 w-8 text-[#B2904D] mb-2" />
              <span className="text-2xl font-extrabold text-white">35+</span>
              <span className="text-sm text-slate-400">{isEs ? 'Años de experiencia' : 'Years of experience'}</span>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-8 w-8 text-[#B2904D] mb-2" />
              <span className="text-2xl font-extrabold text-white">50,000+</span>
              <span className="text-sm text-slate-400">{isEs ? 'Casos ganados' : 'Cases won'}</span>
            </div>
            <div className="flex flex-col items-center">
              <Star className="h-8 w-8 text-[#B2904D] mb-2" />
              <span className="text-2xl font-extrabold text-white">4.8★</span>
              <span className="text-sm text-slate-400">{isEs ? 'Calificación promedio' : 'Average rating'}</span>
            </div>
            <div className="flex flex-col items-center">
              <Building2 className="h-8 w-8 text-[#B2904D] mb-2" />
              <span className="text-2xl font-extrabold text-white">15</span>
              <span className="text-sm text-slate-400">{isEs ? 'Oficinas en 5 estados' : 'Offices in 5 states'}</span>
            </div>
          </div>
        </section>

        {/* ===== SERVICES OFFERED ===== */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block mb-3 px-3 py-1 rounded-full bg-sky-500/10 text-xs font-semibold tracking-widest text-sky-400 uppercase">
                {isEs ? 'Servicios' : 'Services'}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                {isEs
                  ? `Servicios de ${service.shortTitle.es} en ${office.city}`
                  : `${service.shortTitle.en} Services in ${office.city}`
                }
              </h2>
              <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
                {service.description[lang]}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.relatedServices[lang].map((svc, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-sky-400/30 transition-all"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#B2904D] mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium text-sm sm:text-base">{svc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHY CHOOSE US ===== */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#B2904D]/15 text-xs font-semibold tracking-widest text-[#B2904D] uppercase">
                {isEs ? '¿Por qué elegirnos?' : 'Why Choose Us?'}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                {isEs
                  ? `¿Por qué elegir a Manuel Solís en ${office.city}?`
                  : `Why Choose Manuel Solis in ${office.city}?`
                }
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {config.whyChooseUs[lang].map((reason, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-6 rounded-2xl border border-white/10 bg-white/5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#B2904D]/15 text-[#B2904D] flex-shrink-0">
                    <Shield className="h-5 w-5" />
                  </div>
                  <p className="text-slate-200 font-medium leading-relaxed">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== OFFICE INFORMATION ===== */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block mb-3 px-3 py-1 rounded-full bg-sky-500/10 text-xs font-semibold tracking-widest text-sky-400 uppercase">
                {isEs ? 'Oficina' : 'Office'}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                {isEs
                  ? `Nuestra Oficina en ${office.city}`
                  : `Our Office in ${office.city}`
                }
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Main office card */}
              <div className="p-8 rounded-2xl border border-white/10 bg-white/5">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Scale className="h-5 w-5 text-[#B2904D]" />
                  {isEs ? `Oficina de ${office.city}` : `${office.city} Office`}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#B2904D] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">{office.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[#B2904D] flex-shrink-0" />
                    <a
                      href={`tel:${phoneClean}`}
                      className="text-white font-medium hover:text-[#B2904D] transition-colors"
                    >
                      {office.phone}
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-[#B2904D] mt-0.5 flex-shrink-0" />
                    <div className="text-slate-300 text-sm">
                      <p>{isEs ? 'Lunes a Viernes: 8:00 AM – 6:00 PM' : 'Monday to Friday: 8:00 AM – 6:00 PM'}</p>
                      <p>{isEs ? 'Sábado: 9:00 AM – 1:00 PM' : 'Saturday: 9:00 AM – 1:00 PM'}</p>
                    </div>
                  </div>
                </div>

                <a
                  href={`tel:${phoneClean}`}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#B2904D] text-white font-bold py-3 px-6 transition-all hover:bg-[#9A7A3D] hover:scale-[1.02]"
                >
                  <Phone className="h-4 w-4" />
                  {isEs ? 'Llamar ahora' : 'Call now'}
                </a>
              </div>

              {/* Additional offices or national info */}
              <div className="p-8 rounded-2xl border border-white/10 bg-white/5">
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
                            <a
                              href={`tel:+1${addOffice.phone.replace(/\D/g, '')}`}
                              className="text-slate-300 text-sm hover:text-[#B2904D] transition-colors"
                            >
                              {addOffice.phone}
                            </a>
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
                        : 'Manuel Solis is a national firm with 15 offices in 5 states. In addition to our ' + office.city + ' office, we have a presence in Texas, California, Illinois, Colorado, and Tennessee.'
                      }
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

              </div>
            </div>
          </div>
        </section>

        {/* ===== TRUST / CREDENTIALS ===== */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8">
              {isEs ? 'Confíe en Nuestra Experiencia' : 'Trust Our Experience'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
                <Award className="h-10 w-10 text-[#B2904D] mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">
                  {isEs ? 'Desde 1990' : 'Since 1990'}
                </h3>
                <p className="text-sm text-slate-400">
                  {isEs
                    ? 'Más de 35 años de experiencia defendiendo los derechos de la comunidad inmigrante en Estados Unidos.'
                    : 'Over 35 years of experience defending the rights of the immigrant community in the United States.'
                  }
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
                <Shield className="h-10 w-10 text-[#B2904D] mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">
                  {isEs ? 'Miembro del Colegio de Abogados' : 'Bar Association Member'}
                </h3>
                <p className="text-sm text-slate-400">
                  {isEs
                    ? 'Abogados licenciados y en buen estado con los colegios de abogados estatales correspondientes.'
                    : 'Licensed attorneys in good standing with corresponding state bar associations.'
                  }
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-white/10 bg-white/5 sm:col-span-2 lg:col-span-1">
                <Users className="h-10 w-10 text-[#B2904D] mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">
                  {isEs ? 'Equipo Bilingüe' : 'Bilingual Team'}
                </h3>
                <p className="text-sm text-slate-400">
                  {isEs
                    ? 'Todo nuestro equipo habla español e inglés para atenderlo en el idioma que prefiera.'
                    : 'Our entire team speaks Spanish and English to serve you in the language you prefer.'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CONTACT FORM SECTION ===== */}
        <section id="contacto" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#B2904D]/15 text-xs font-semibold tracking-widest text-[#B2904D] uppercase">
                {isEs ? 'Contacto' : 'Contact'}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                {isEs ? 'Consulta Confidencial' : 'Confidential Consultation'}
              </h2>
              <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
                {isEs
                  ? `Hable con un abogado experimentado de nuestra oficina en ${office.city}. Atención personalizada y confidencial.`
                  : `Speak with an experienced attorney from our ${office.city} office. Personalized and confidential attention.`
                }
              </p>
            </div>

            <ContactForm />
          </div>
        </section>

        {/* ===== OTHER CITIES ===== */}
        {siblingCities.length > 0 && (
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {isEs
                    ? `${service.shortTitle.es} en Otras Ciudades`
                    : `${service.shortTitle.en} in Other Cities`
                  }
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {siblingCities.map((sc) => (
                  <Link
                    key={sc.slug}
                    href={`/${lang}/${sc.slug}`}
                    className="flex items-center gap-2 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-[#B2904D]/10 hover:border-[#B2904D]/30 transition-all group"
                  >
                    <MapPin className="h-4 w-4 text-[#B2904D] flex-shrink-0" />
                    <span className="text-white text-sm font-medium group-hover:text-[#B2904D] transition-colors">
                      {sc.city}, {sc.stateCode}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===== FINAL CTA ===== */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-br from-[#B2904D] to-[#8A6E3A] p-10 sm:p-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              {isEs
                ? `¿Necesita un Abogado en ${office.city}?`
                : `Need an Attorney in ${office.city}?`
              }
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              {isEs
                ? 'No enfrente su situación legal solo. Llame ahora y hable con uno de nuestros abogados experimentados.'
                : 'Don\'t face your legal situation alone. Call now and speak with one of our experienced attorneys.'
              }
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${phoneClean}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#001540] font-bold text-lg px-8 py-4 transition-transform hover:scale-105 shadow-lg"
              >
                <Phone className="h-5 w-5" />
                {office.phone}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
