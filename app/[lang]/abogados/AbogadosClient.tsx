'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scale, ShieldCheck, Gavel, GraduationCap,
  ArrowRight, X as CloseIcon, Mail, Award, ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useLanguage } from '../../context/LanguageContext';
import { attorneys, locationGroups } from '../../lib/attorneyData';

// --- COLORES ---
const PRIMARY_DARK = '#001540';
const ACCENT_GOLD = '#B2904D';

export default function AbogadosClient() {
  const { language } = useLanguage();
  const [selectedAttorney, setSelectedAttorney] = useState<any>(null);

  // Función helper para obtener texto traducido (memoizada)
  const getText = useMemo(() => (obj: any) => {
    if (typeof obj === 'string') return obj;
    return obj[language] || obj.es || obj;
  }, [language]);

  // Textos de la interfaz (memoizados)
  const texts = useMemo(() => ({
    hero: {
      badge: { es: 'Defensa de Clase Mundial', en: 'World-Class Defense' },
      title1: { es: 'Conozca a Sus', en: 'Meet Your' },
      title2: { es: 'Defensores', en: 'Advocates' },
      subtitle: {
        es: 'Más que abogados, somos aliados estratégicos dedicados a proteger su futuro con integridad, experiencia y pasión.',
        en: 'More than lawyers, we are strategic allies dedicated to protecting your future with integrity, experience, and passion.'
      }
    },
    card: {
      viewProfile: { es: 'Ver Perfil Completo', en: 'View Full Profile' }
    },
    modal: {
      badge: { es: 'Perfil Profesional', en: 'Professional Profile' },
      education: { es: 'Educación', en: 'Education' },
      admissions: { es: 'Admisiones', en: 'Admissions' },
      achievements: { es: 'Logros', en: 'Achievements' },
      button: { es: 'Solicitar Consulta', en: 'Request Consultation' },
      viewFullProfile: { es: 'Ver Perfil Completo', en: 'View Full Profile' },
      defaultBio: {
        es: 'es un miembro fundamental de nuestro equipo legal. Con una trayectoria dedicada a la defensa de los derechos de nuestros clientes, aporta experiencia, integridad y un compromiso inquebrantable para lograr los mejores resultados posibles.',
        en: 'is a fundamental member of our legal team. With a career dedicated to defending our clients\' rights, they bring experience, integrity, and an unwavering commitment to achieving the best possible results.'
      },
      educationFallback: { es: 'Información disponible en consulta.', en: 'Information available upon consultation.' },
      admissionsFallback: { es: 'Abogado certificado y reconocido.', en: 'Certified and recognized attorney.' }
    }
  }), []);

  return (
    <div className="min-h-screen flex flex-col bg-[#001529] text-white relative selection:bg-[#B2904D] selection:text-white font-sans overflow-x-hidden">

      <Header />

      {/* FONDO ATMOSFÉRICO - CSS only, no JS animations */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
          <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-blue-500/20 rounded-full blur-[150px] opacity-50" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-sky-600/20 rounded-full blur-[180px] opacity-40" />
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-48 pb-24 px-4 overflow-hidden z-10">
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B2904D]/30 bg-[#B2904D]/10 backdrop-blur-md mb-6">
              <Scale size={14} className="text-[#B2904D]" />
              <span className="text-[#B2904D] text-xs font-bold tracking-widest uppercase">
                {texts.hero.badge[language]}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              {texts.hero.title1[language]}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] to-[#e6c67e]">
                {texts.hero.title2[language]}
              </span>
            </h1>

            <p className="text-blue-100/70 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              {texts.hero.subtitle[language]}
            </p>
          </motion.div>
        </div>
      </section>

      {/* GRID DE ABOGADOS AGRUPADOS POR UBICACIÓN */}
      <section className="px-4 pb-32 relative z-10">
        <div className="max-w-7xl mx-auto space-y-16">
          {locationGroups.map((group) => {
            const groupAttorneys = group.ids
              .map(id => attorneys.find(a => a.id === id))
              .filter((a): a is typeof attorneys[number] => a !== undefined);
            if (groupAttorneys.length === 0) return null;
            return (
              <div key={group.label.en}>
                {/* Location Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-[#B2904D]/40 to-transparent" />
                  <h2 className="text-lg sm:text-xl font-semibold text-[#B2904D] uppercase tracking-widest whitespace-nowrap">
                    {group.label[language]}
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-l from-[#B2904D]/40 to-transparent" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                  {groupAttorneys.map((attorney, index) => (
                    <div
                      key={attorney.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedAttorney(attorney)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedAttorney(attorney); } }}
                      className="group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-[#001540]/60 hover:border-[#B2904D]/70 hover:shadow-[0_0_30px_rgba(178,144,77,0.25)] focus-visible:ring-2 focus-visible:ring-[#B2904D] focus-visible:outline-none transition-all duration-500"
                    >
                      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                        <Image
                          src={attorney.image}
                          alt={attorney.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          className={attorney.id === 'lupita-valenzuela-martinez'
                            ? "object-cover object-[center_20%]"
                            : "object-cover object-top"}
                          loading="lazy"
                        />
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-[#001540]/90 via-[#001540]/50 to-transparent opacity-95 group-hover:opacity-90 transition-opacity duration-500" />

                      <div className="absolute bottom-0 left-0 w-full p-6 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                        <div className="w-12 h-1 bg-[#B2904D] mb-3 rounded-full group-hover:w-24 transition-all duration-500 shadow-[0_0_15px_#B2904D]"></div>

                        <h3 className="text-2xl font-bold text-white leading-none mb-2 drop-shadow-lg">
                          {attorney.name}
                        </h3>

                        <p className="text-[#B2904D] text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
                          <ShieldCheck size={14} /> {getText(attorney.role)}
                        </p>

                        <div className="flex items-center gap-2 text-white text-sm font-medium opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-75">
                          {texts.card.viewProfile[language]} <ChevronRight size={16} className="text-[#B2904D]" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* MODAL DE DETALLE OPTIMIZADO */}
      <AnimatePresence>
        {selectedAttorney && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4 bg-black/85 overflow-hidden"
            onClick={() => setSelectedAttorney(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#001f4a] w-full md:max-w-6xl h-full md:h-auto md:max-h-[90vh] md:rounded-3xl border border-white/10 shadow-2xl flex flex-col lg:flex-row relative overflow-hidden"
            >
              <button
                onClick={() => setSelectedAttorney(null)}
                className="absolute top-4 right-4 z-50 bg-black/40 hover:bg-[#B2904D] text-white p-2 rounded-full transition-all border border-white/10 group"
                aria-label={language === 'es' ? 'Cerrar' : 'Close'}
              >
                <CloseIcon size={24} className="group-hover:rotate-90 transition-transform" />
              </button>

              {/* Imagen del Abogado */}
              <div className="w-full lg:w-5/12 bg-black relative h-[35vh] lg:h-auto">
                <Image
                  src={selectedAttorney.image}
                  alt={selectedAttorney.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className={selectedAttorney.id === 'lupita-valenzuela-martinez'
                    ? "object-cover object-[center_20%]"
                    : "object-cover object-top"}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-80"></div>

                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#001f4a] to-transparent lg:hidden">
                  <h2 className="text-3xl font-bold text-white">{selectedAttorney.name}</h2>
                  <p className="text-[#B2904D] text-sm">{getText(selectedAttorney.role)}</p>
                </div>
              </div>

              {/* Contenido de Información */}
              <div className="w-full lg:w-7/12 p-6 lg:p-10 overflow-y-auto bg-gradient-to-br from-[#001f4a] to-[#001a33] relative">

                <div className="hidden lg:block mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="px-3 py-1 rounded bg-[#B2904D]/20 text-[#B2904D] text-xs font-bold uppercase tracking-wider border border-[#B2904D]/30">
                      {texts.modal.badge[language]}
                    </div>
                  </div>
                  <h2 className="text-5xl font-bold text-white mb-1">
                    {selectedAttorney.name}
                  </h2>
                  <p className="text-gray-400 text-xl font-light flex items-center gap-2">
                    <Gavel size={18} className="text-[#B2904D]" /> {getText(selectedAttorney.role)}
                  </p>
                </div>

                {selectedAttorney.quote && (
                  <div className="mb-8 relative">
                    <div className="absolute -left-2 -top-2 text-[#B2904D]/20">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" /></svg>
                    </div>
                    <p className="text-[#B2904D] text-lg italic font-medium pl-8 relative z-10 border-l-2 border-[#B2904D]/50">
                      &quot;{getText(selectedAttorney.quote)}&quot;
                    </p>
                  </div>
                )}

                <div className="space-y-4 text-gray-300 leading-relaxed font-light mb-8 text-sm md:text-base text-justify">
                  {selectedAttorney.bio ? (
                    Array.isArray(getText(selectedAttorney.bio)) ? (
                      getText(selectedAttorney.bio).map((paragraph: string, idx: number) => (
                        <p key={idx}>{paragraph}</p>
                      ))
                    ) : (
                      <p>{getText(selectedAttorney.bio)}</p>
                    )
                  ) : (
                    <p>{language === 'es' ? 'El abogado' : 'Attorney'} {selectedAttorney.name} {texts.modal.defaultBio[language]}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-4 bg-black/20 rounded-2xl border border-white/5">
                  <div>
                    <h4 className="text-white font-bold flex items-center gap-2 mb-3 text-sm uppercase tracking-wider">
                      <GraduationCap size={18} className="text-[#B2904D]" /> {texts.modal.education[language]}
                    </h4>
                    {selectedAttorney.education ? (
                      <ul className="text-xs md:text-sm text-gray-400 space-y-2">
                        {selectedAttorney.education.map((edu: any, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#B2904D] mt-1.5"></div>
                            {getText(edu)}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-gray-500 italic">{texts.modal.educationFallback[language]}</p>
                    )}
                  </div>

                  <div>
                    <h4 className="text-white font-bold flex items-center gap-2 mb-3 text-sm uppercase tracking-wider">
                      {selectedAttorney.admissions ? <><Scale size={18} className="text-[#B2904D]" /> {texts.modal.admissions[language]}</> : <><Award size={18} className="text-[#B2904D]" /> {texts.modal.achievements[language]}</>}
                    </h4>
                    {selectedAttorney.admissions ? (
                      <ul className="text-xs md:text-sm text-gray-400 space-y-2">
                        {selectedAttorney.admissions.map((adm: any, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#B2904D] mt-1.5"></div>
                            {getText(adm)}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-gray-500 italic">{texts.modal.admissionsFallback[language]}</p>
                    )}
                  </div>
                </div>

                <div className="mt-auto space-y-3">
                  {/* Link to full profile page */}
                  <Link
                    href={`/${language}/abogados/${selectedAttorney.id}`}
                    onClick={() => setSelectedAttorney(null)}
                    className="w-full bg-transparent border-2 border-[#B2904D] text-[#B2904D] hover:bg-[#B2904D] hover:text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-3 transition-all group"
                  >
                    {texts.modal.viewFullProfile[language]}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a href="/#contacto" onClick={() => setSelectedAttorney(null)} className="w-full bg-gradient-to-r from-[#B2904D] to-[#9f7d3d] hover:from-white hover:to-white hover:text-[#002342] text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-black/40 group">
                    <Mail size={20} />
                    {texts.modal.button[language]}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
