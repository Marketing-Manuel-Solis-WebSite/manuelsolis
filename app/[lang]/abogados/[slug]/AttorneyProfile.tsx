'use client';

import React, { useMemo } from 'react';
import {
  GraduationCap, Scale, ArrowRight, Mail, ChevronRight, Quote, ArrowLeft, Users, FileText
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useLanguage } from '../../../context/LanguageContext';
import { attorneys, getText, getRelatedAttorneys, getAttorneyLocation } from '../../../lib/attorneyData';
import { getArticlesByAuthor } from '../../../lib/blogRelations';

// --- LAZY LOAD DEL FORMULARIO ---
const ContactForm = dynamic(() => import('../../../components/ContactForm'), {
  loading: () => <div className="w-full h-[600px] bg-[#001540]/50 rounded-2xl animate-pulse border border-white/5" />
});

// --- COLORES ---
const PRIMARY_DARK = '#001540';
const ACCENT_GOLD = '#B2904D';

interface AttorneyProfileProps {
  slug: string;
}

export default function AttorneyProfile({ slug }: AttorneyProfileProps) {
  const { language } = useLanguage();

  const attorney = useMemo(() => attorneys.find(a => a.id === slug), [slug]);
  const relatedAttorneys = useMemo(() => getRelatedAttorneys(slug), [slug]);
  const location = useMemo(() => getAttorneyLocation(slug), [slug]);
  const authorArticles = useMemo(() => getArticlesByAuthor(slug, language as 'es' | 'en'), [slug, language]);

  const texts = useMemo(() => ({
    backToTeam: { es: 'Volver al Equipo', en: 'Back to Team' },
    education: { es: 'Educacion', en: 'Education' },
    admissions: { es: 'Admisiones al Colegio de Abogados', en: 'Bar Admissions' },
    requestConsultation: { es: 'Solicitar Consulta con', en: 'Request Consultation with' },
    relatedTitle: { es: 'Otros Abogados en', en: 'Other Attorneys in' },
    viewProfile: { es: 'Ver Perfil', en: 'View Profile' },
    contactTitle: { es: 'Consulta Gratuita', en: 'Free Consultation' },
    contactSubtitle: {
      es: 'Hable directamente con nuestro equipo legal. Estamos aqui para ayudarle.',
      en: 'Speak directly with our legal team. We are here to help you.'
    },
    professionalProfile: { es: 'Perfil Profesional', en: 'Professional Profile' },
    biography: { es: 'Biografia', en: 'Biography' },
    articlesByAuthor: { es: 'Articulos Publicados', en: 'Published Articles' },
    readArticle: { es: 'Leer Articulo', en: 'Read Article' },
    viewAllArticles: { es: 'Ver Todos los Articulos', en: 'View All Articles' },
  }), []);

  if (!attorney) return null;

  const firstName = attorney.name.split(' ')[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#001529] text-white relative selection:bg-[#B2904D] selection:text-white font-sans overflow-x-hidden">

      <Header />

      {/* FONDO ATMOSFERICO - CSS only, no JS animations */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
        <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-blue-500/20 rounded-full blur-[150px] opacity-50" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-sky-600/20 rounded-full blur-[180px] opacity-40" />
      </div>

      {/* BREADCRUMB + BACK */}
      <section className="relative pt-32 pb-4 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <Link
            href={`/${language}/abogados`}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#B2904D] transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {texts.backToTeam[language]}
          </Link>
        </div>
      </section>

      {/* HERO SECTION - Attorney Photo + Info */}
      <section className="relative pt-8 pb-16 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

            {/* Photo - Left Side */}
            <div className="w-full lg:w-5/12 flex-shrink-0">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
                <Image
                  src={attorney.image}
                  alt={attorney.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className={attorney.id === 'lupita-valenzuela-martinez'
                    ? "object-cover object-[center_20%]"
                    : "object-cover object-top"}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001540]/60 via-transparent to-transparent" />
              </div>
            </div>

            {/* Info - Right Side */}
            <div className="w-full lg:w-7/12 flex flex-col justify-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B2904D]/30 bg-[#B2904D]/10  mb-4 w-fit">
                <Scale size={14} className="text-[#B2904D]" />
                <span className="text-[#B2904D] text-xs font-bold tracking-widest uppercase">
                  {texts.professionalProfile[language]}
                </span>
              </div>

              {/* Name + Role in H1 for SEO */}
              <h1 className="mb-3 leading-tight drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <span className="block text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  {attorney.name}
                </span>
                <span className="block text-[#B2904D] text-lg md:text-xl font-medium mt-2 flex items-center gap-2">
                  <Scale size={18} />
                  {attorney.role[language]}
                </span>
              </h1>

              {/* Location */}
              {location && (
                <p className="text-gray-400 text-sm mb-6">
                  {location[language]}
                </p>
              )}

              {/* Quote */}
              {attorney.quote && (
                <div className="relative mb-8">
                  <div className="absolute -left-2 -top-2 text-[#B2904D]/20">
                    <Quote size={40} />
                  </div>
                  <p className="text-[#B2904D] text-lg md:text-xl italic font-medium pl-10 relative z-10 border-l-2 border-[#B2904D]/50 leading-relaxed">
                    &ldquo;{attorney.quote[language]}&rdquo;
                  </p>
                </div>
              )}

              {/* First bio paragraph as intro */}
              <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light mb-8">
                {attorney.bio[language][0]}
              </p>

              {/* CTA Button */}
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#B2904D] to-[#9f7d3d] hover:from-white hover:to-white hover:text-[#002342] text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-black/40 group w-fit"
              >
                <Mail size={20} />
                {texts.requestConsultation[language]} {firstName}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BIO SECTION */}
      <section className="relative px-4 pb-16 z-10">
        <div className="max-w-4xl mx-auto">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="w-12 h-1 bg-[#B2904D] rounded-full" />
              {texts.biography[language]}
            </h2>
            <div className="space-y-5 text-gray-300 leading-relaxed font-light text-base md:text-lg text-justify">
              {attorney.bio[language].slice(1).map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION & ADMISSIONS */}
      <section className="relative px-4 pb-16 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education */}
            <div className="p-6 md:p-8 bg-[#001f4a]/60  rounded-2xl border border-white/10">
              <h3 className="text-white font-bold flex items-center gap-3 mb-6 text-lg uppercase tracking-wider">
                <div className="p-2 bg-[#B2904D]/20 rounded-lg">
                  <GraduationCap size={22} className="text-[#B2904D]" />
                </div>
                {texts.education[language]}
              </h3>
              <ul className="space-y-4">
                {attorney.education.map((edu, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-[#B2904D] mt-2 flex-shrink-0" />
                    <span className="text-sm md:text-base">{getText(edu, language as 'es' | 'en')}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bar Admissions */}
            <div className="p-6 md:p-8 bg-[#001f4a]/60  rounded-2xl border border-white/10">
              <h3 className="text-white font-bold flex items-center gap-3 mb-6 text-lg uppercase tracking-wider">
                <div className="p-2 bg-[#B2904D]/20 rounded-lg">
                  <Scale size={22} className="text-[#B2904D]" />
                </div>
                {texts.admissions[language]}
              </h3>
              <ul className="space-y-4">
                {attorney.admissions.map((adm, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-[#B2904D] mt-2 flex-shrink-0" />
                    <span className="text-sm md:text-base">{getText(adm, language as 'es' | 'en')}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative px-4 pb-16 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#B2904D]/20 to-[#B2904D]/5 rounded-2xl border border-[#B2904D]/30 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {texts.requestConsultation[language]} {attorney.name}
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              {attorney.quote[language]}
            </p>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#B2904D] to-[#9f7d3d] hover:from-white hover:to-white hover:text-[#002342] text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg shadow-black/40 group"
            >
              <Mail size={20} />
              {texts.requestConsultation[language]} {firstName}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* PUBLISHED ARTICLES BY THIS ATTORNEY */}
      {authorArticles.length > 0 && (
        <section className="relative px-4 pb-16 z-10">
          <div className="max-w-7xl mx-auto">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-[#B2904D]/40 to-transparent" />
                <h2 className="text-lg sm:text-xl font-semibold text-[#B2904D] uppercase tracking-widest whitespace-nowrap flex items-center gap-2">
                  <FileText size={20} />
                  {texts.articlesByAuthor[language]}
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-[#B2904D]/40 to-transparent" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {authorArticles.slice(0, 6).map((article) => (
                  <Link
                    key={article.slug}
                    href={`/${language}/blog/${article.slug}`}
                    className="group block p-6 bg-[#001f4a]/60 rounded-2xl border border-white/10 hover:border-[#B2904D]/50 hover:shadow-[0_0_20px_rgba(178,144,77,0.15)] transition-all duration-300"
                  >
                    <span className="inline-block px-3 py-1 rounded-full bg-[#B2904D]/15 text-[#B2904D] text-xs font-bold tracking-wider uppercase mb-3">
                      {article.category}
                    </span>
                    <h3 className="text-white font-bold text-base leading-snug mb-3 group-hover:text-[#B2904D] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-sm text-[#B2904D] font-medium opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      {texts.readArticle[language]} <ArrowRight size={14} />
                    </span>
                  </Link>
                ))}
              </div>

              {authorArticles.length > 6 && (
                <div className="text-center mt-8">
                  <Link
                    href={`/${language}/blog`}
                    className="inline-flex items-center gap-2 text-[#B2904D] font-semibold hover:text-white transition-colors group"
                  >
                    {texts.viewAllArticles[language]}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* RELATED ATTORNEYS */}
      {relatedAttorneys.length > 0 && (
        <section className="relative px-4 pb-16 z-10">
          <div className="max-w-7xl mx-auto">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-[#B2904D]/40 to-transparent" />
                <h2 className="text-lg sm:text-xl font-semibold text-[#B2904D] uppercase tracking-widest whitespace-nowrap flex items-center gap-2">
                  <Users size={20} />
                  {texts.relatedTitle[language]} {location ? location[language] : ''}
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-[#B2904D]/40 to-transparent" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {relatedAttorneys.slice(0, 4).map((related) => (
                  <Link
                    key={related.id}
                    href={`/${language}/abogados/${related.id}`}
                    className="group relative h-[350px] rounded-2xl overflow-hidden block border border-white/10 bg-[#001540]/60 hover:border-[#B2904D]/70 hover:shadow-[0_0_30px_rgba(178,144,77,0.25)] transition-all duration-500"
                    >
                      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                        <Image
                          src={related.image}
                          alt={related.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className={related.id === 'lupita-valenzuela-martinez'
                            ? "object-cover object-[center_20%]"
                            : "object-cover object-top"}
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#001540]/90 via-[#001540]/50 to-transparent opacity-95 group-hover:opacity-90 transition-opacity duration-500" />
                      <div className="absolute bottom-0 left-0 w-full p-5 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                        <div className="w-10 h-1 bg-[#B2904D] mb-2 rounded-full group-hover:w-20 transition-all duration-500 shadow-[0_0_15px_#B2904D]" />
                        <h3 className="text-xl font-bold text-white leading-none mb-1 drop-shadow-lg">
                          {related.name}
                        </h3>
                        <p className="text-[#B2904D] text-xs font-bold tracking-widest uppercase mb-3">
                          {related.role[language]}
                        </p>
                        <div className="flex items-center gap-2 text-white text-sm font-medium opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-75">
                          {texts.viewProfile[language]} <ChevronRight size={16} className="text-[#B2904D]" />
                        </div>
                      </div>
                    </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CONTACT FORM */}
      <section id="contacto" className="relative px-4 pb-24 z-10">
        <div className="max-w-5xl mx-auto">
          <div>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {texts.contactTitle[language]}
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                {texts.contactSubtitle[language]}
              </p>
            </div>
            <div className="bg-[#001026]/80 p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
