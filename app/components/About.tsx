'use client'

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { motion, Variants } from 'framer-motion';
import { Play } from 'lucide-react';

export default function About() {
  const { language } = useLanguage();
  const containerRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative py-32 lg:py-44 w-full bg-[#001540] overflow-hidden"
    >
      {/* Static Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#001540]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#002868]/30 via-transparent to-[#000a20]/80" />

        {/* Static orbs */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[100px] -translate-x-1/3 -translate-y-1/3 opacity-60" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#B2904D]/10 rounded-full blur-[90px] translate-x-1/3 translate-y-1/3 opacity-60" />
      </div>

      {/* Static masks */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#000a20] to-transparent z-10 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000a20] to-transparent z-10 opacity-50 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-6 space-y-10"
          >
            <motion.div variants={fadeInUp} className="relative">
              <h2 className="text-5xl md:text-6xl lg:text-[5rem] font-thin text-white leading-[0.9] tracking-tight">
                {language === 'es' ? 'Nuestra pasión es' : 'Our passion is'} <br />
                <span className="font-normal relative inline-block">
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] via-[#ffeebb] to-[#B2904D]">
                    {language === 'es' ? 'ayudarle.' : 'helping you.'}
                  </span>
                </span>
              </h2>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6 text-lg text-blue-100/80 leading-relaxed font-light">
              <p className="border-l-[3px] border-[#B2904D]/50 pl-6 py-1">
                {language === 'es'
                  ? <>Para nosotros, <strong className="text-white font-medium">&quot;50,000 casos&quot;</strong> no es solo una cifra. Cada número representa a una familia real que enfrentó obstáculos que parecían imposibles.</>
                  : <>For us, <strong className="text-white font-medium">&quot;50,000 cases&quot;</strong> is not just a number. Each number represents a real family that faced obstacles that seemed impossible.</>
                }
              </p>
              <p className="pl-6 text-base text-blue-200/70">
                {language === 'es'
                  ? 'Nuestro equipo de expertos no descansa hasta agotar cada recurso legal disponible para luchar por sus derechos.'
                  : 'Our team of experts does not rest until every legal resource available has been exhausted to fight for your rights.'
                }
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-6 pl-2 pt-4">
                <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/5 transition-colors duration-300">
                    <h3 className="text-4xl font-light text-white flex items-baseline">
                        200 <span className="text-[#B2904D] text-2xl ml-0.5">+</span>
                    </h3>
                    <p className="text-[0.65rem] md:text-xs text-blue-200/70 uppercase tracking-[0.2em] mt-2 font-medium">
                        {language === 'es' ? 'Profesionales' : 'Professionals'}
                    </p>
                </div>
                <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/5 transition-colors duration-300">
                    <h3 className="text-4xl font-light text-white flex items-baseline">
                        35 <span className="text-sky-400 text-2xl ml-0.5">+</span>
                    </h3>
                    <p className="text-[0.65rem] md:text-xs text-blue-200/70 uppercase tracking-[0.2em] mt-2 font-medium">
                        {language === 'es' ? 'Años Experiencia' : 'Years Experience'}
                    </p>
                </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="pt-6 pl-2">
                <Link
                  href={`/${language}/Testimonios`}
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
            </motion.div>
          </motion.div>

          {/* Right Column: YouTube Click-to-Load Facade */}
          <div className="lg:col-span-6 relative h-[350px] md:h-[500px] lg:h-[450px] xl:h-[500px] w-full mt-32 mb-24 lg:mt-0 lg:mb-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-blue-600/20 blur-[80px] rounded-full -z-10" />
              <div className="absolute top-4 -right-4 w-full h-full border border-[#B2904D]/20 rounded-[2rem] z-0 hidden lg:block" />

              <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1.2, ease: "easeOut" }}
               className="relative z-10 w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 bg-black"
              >
                  {showVideo ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/PmU1yOfB9C8?rel=0&controls=1&autoplay=1"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <button
                      onClick={() => setShowVideo(true)}
                      className="relative w-full h-full group cursor-pointer"
                      aria-label={language === 'es' ? 'Reproducir video' : 'Play video'}
                    >
                      <Image
                        src="https://img.youtube.com/vi/PmU1yOfB9C8/maxresdefault.jpg"
                        alt="Video thumbnail"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-[#B2904D] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(178,144,77,0.4)] group-hover:scale-110 transition-transform duration-300 border-2 border-white/20">
                          <Play className="w-8 h-8 text-[#001540] ml-1 fill-[#001540]" />
                        </div>
                      </div>
                    </button>
                  )}

                  <div className="absolute inset-0 border border-white/10 rounded-[2rem] pointer-events-none" />
              </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}