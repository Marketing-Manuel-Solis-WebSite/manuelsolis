'use client'

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { m, Variants } from 'framer-motion';
import { Play } from 'lucide-react';

export default function About() {
  const { language } = useLanguage();
  const containerRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative py-32 lg:py-44 w-full bg-[#001540] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#001540]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#002868]/30 via-transparent to-[#000a20]/80" />
        <div className="absolute inset-0 gradient-mesh-dark" />

        {/* Static orbs */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[100px] -translate-x-1/3 -translate-y-1/3 opacity-60" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#B2904D]/10 rounded-full blur-[90px] translate-x-1/3 translate-y-1/3 opacity-60" />
      </div>

      {/* Static masks */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#000a20] to-transparent z-10 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000a20] to-transparent z-10 opacity-50 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Título full-width arriba del grid */}
        <m.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-thin text-white mb-6 tracking-tight">
            {language === 'es' ? 'Caso Real de ' : 'Real Case of '}
            <span className="font-normal text-gradient-gold-subtle">
              {language === 'es' ? 'Reunificación Familiar' : 'Family Reunification'}
            </span>
          </h2>
        </m.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Text */}
          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-6 space-y-10"
          >
            <m.div variants={fadeInUp} className="space-y-6 text-lg text-blue-100/80 leading-relaxed font-light">
              <p className="border-l-[3px] border-[#B2904D]/50 pl-6 py-1">
                {language === 'es'
                  ? <>En este documental, el <strong className="text-white font-medium">Abogado Manuel Solís</strong> comparte la conmovedora historia de <strong className="text-white font-medium">Eva</strong>, una madre que soñó durante <strong className="text-white font-medium">más de 25 años</strong> con volver a abrazar a su familia. Tras décadas de distancia, lágrimas y esperanza, finalmente lo logró. Un testimonio real que demuestra que nunca es tarde para reunirse con quienes más amamos.</>
                  : <>In this documentary, <strong className="text-white font-medium">Attorney Manuel Solís</strong> shares the moving story of <strong className="text-white font-medium">Eva</strong>, a mother who dreamed for <strong className="text-white font-medium">over 25 years</strong> of embracing her family again. After decades of distance, tears, and hope, she finally made it. A real testimony that proves it is never too late to reunite with those we love most.</>
                }
              </p>
            </m.div>

            <m.div variants={fadeInUp} className="grid grid-cols-2 gap-6 pl-2 pt-4">
                <div className="p-5 rounded-xl glass glow-gold-hover transition-all duration-500 group/stat">
                    <h3 className="text-4xl font-light text-white flex items-baseline">
                        200 <span className="text-[#B2904D] text-2xl ml-0.5 group-hover/stat:rotate-12 transition-transform">+</span>
                    </h3>
                    <p className="text-[0.65rem] md:text-xs text-blue-200/70 uppercase tracking-[0.2em] mt-2 font-medium">
                        {language === 'es' ? 'Profesionales' : 'Professionals'}
                    </p>
                </div>
                <div className="p-5 rounded-xl glass glow-gold-hover transition-all duration-500 group/stat">
                    <h3 className="text-4xl font-light text-white flex items-baseline">
                        35 <span className="text-sky-400 text-2xl ml-0.5 group-hover/stat:rotate-12 transition-transform">+</span>
                    </h3>
                    <p className="text-[0.65rem] md:text-xs text-blue-200/70 uppercase tracking-[0.2em] mt-2 font-medium">
                        {language === 'es' ? 'Años Experiencia' : 'Years Experience'}
                    </p>
                </div>
            </m.div>

            <m.div variants={fadeInUp} className="pt-6 pl-2">
                <Link
                  href={`/${language}/testimonios`}
                  className="group relative inline-flex items-center justify-center px-10 py-4
                             bg-white/5 text-white font-medium tracking-wide overflow-hidden
                             rounded-full shadow-lg hover:shadow-[#B2904D]/20 transition-all duration-500
                             backdrop-blur-md border border-[#B2904D]/30
                             hover:bg-[#B2904D]/10 hover:border-[#B2904D]/60"
                >
                   <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-in-out" />

                  <span className="relative flex items-center gap-3">
                    {language === 'es' ? 'Conozca Más' : 'Learn More'}
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-[#B2904D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </span>
                </Link>
            </m.div>
          </m.div>

          {/* Right Column: YouTube with thumbnail */}
          <div className="lg:col-span-6 relative w-full mt-8 lg:mt-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-blue-600/20 blur-[80px] rounded-full -z-10" />
              <div className="absolute top-3 -right-3 w-full h-full border border-[#B2904D]/20 rounded-2xl z-0 hidden lg:block" />

              <m.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1.2, ease: "easeOut" }}
               className="relative z-10 w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-black"
              >
                  {showVideo ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/n8aJSPHdTXg?rel=0&controls=1&autoplay=1"
                      title={language === 'es' ? 'Documental: Caso real de reunificación familiar - Abogado Manuel Solís' : 'Documentary: Real family reunification case - Attorney Manuel Solis'}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  ) : (
                    <button
                      onClick={() => setShowVideo(true)}
                      className="relative w-full h-full group cursor-pointer"
                      aria-label={language === 'es' ? 'Reproducir video' : 'Play video'}
                    >
                      <Image
                        src="https://img.youtube.com/vi/n8aJSPHdTXg/maxresdefault.jpg"
                        alt="Caso real de reunificación familiar - Abogado Manuel Solís"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 bg-[#B2904D]/90 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(178,144,77,0.3)] group-hover:scale-110 group-hover:bg-[#B2904D] transition-all duration-300 border border-white/20">
                          <Play className="w-6 h-6 text-[#001540] ml-0.5 fill-[#001540]" />
                        </div>
                      </div>
                    </button>
                  )}

                  <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
              </m.div>
          </div>

        </div>
      </div>
    </section>
  )
}