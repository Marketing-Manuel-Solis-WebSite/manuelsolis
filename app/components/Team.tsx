'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '../context/LanguageContext'
import { m } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Team() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      id="equipo"
      ref={containerRef}
      className="relative py-32 lg:py-48 w-full bg-[#001540] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#001540]" />
        <div className="absolute inset-0 gradient-mesh-dark" />

        {/* Static orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B2904D]/10 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3 opacity-20" />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[90px] -translate-x-1/3 translate-y-1/3 opacity-30" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">

          {/* Left Column: Text */}
          <div className="lg:col-span-6 space-y-10">
            <m.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8 }}
            >
                <div className="flex items-center gap-3 mb-6">
                    <span className="h-[2px] w-10 bg-[#B2904D]"></span>
                    <span className="text-[#B2904D] font-bold tracking-[0.2em] text-xs uppercase">
                        {language === 'es' ? 'Nuestra Firma' : 'Our Firm'}
                    </span>
                </div>

                <h2 className="text-5xl md:text-6xl lg:text-[5rem] font-thin text-white leading-[0.95] tracking-tight">
                  {language === 'es' ? 'Nuestro Equipo' : 'Our Legal Team'} <br />
                  <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] via-[#ffeebb] to-[#B2904D]">
                    {language === 'es' ? 'Legal' : '& Attorneys'}
                  </span>
                </h2>
            </m.div>

            <m.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2, duration: 0.8 }}
               className="space-y-6 text-lg lg:text-xl font-light text-blue-100/70 leading-relaxed"
            >
              <p>
                {language === 'es'
                  ? 'Desde la apertura de su bufete en 1990, Manuel E. Solís y equipo se han comprometido a brindar el nivel de servicio que esperarían recibir si estuvieran en el lugar de nuestros clientes.'
                  : 'Since opening his firm in 1990, Manuel E. Solís and team have committed to providing the level of service they would expect to receive if they were in the place of our clients.'
                }
              </p>

              <div className="pl-6 border-l-2 border-white/10">
                  <p className="italic text-white/90">
                    {language === 'es'
                      ? 'Muchos de nuestros abogados comparten la experiencia personal de emigrar a los EE.UU., lo que les permite entender profundamente las necesidades de nuestros clientes.'
                      : 'Many of our attorneys share the personal experience of immigrating to the U.S., which allows them to deeply understand the needs of our clients.'
                    }
                  </p>
              </div>
            </m.div>

            <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="pt-4"
            >
                <Link
                  href={`/${language}/abogados`}
                  className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-full overflow-hidden hover:bg-white/10 hover:border-[#B2904D]/50 transition-all duration-300 backdrop-blur-sm"
                >
                  <span className="relative z-10 text-white font-medium tracking-wide">
                    {language === 'es' ? 'Conoce al Equipo' : 'Meet the Team'}
                  </span>

                  <div className="relative z-10 w-10 h-10 rounded-full bg-[#B2904D] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <ArrowRight className="w-5 h-5 text-white transform group-hover:-rotate-45 transition-transform duration-300" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                </Link>
            </m.div>
          </div>

          {/* Right Column: Image (Static) */}
          <div className="lg:col-span-6 relative mt-12 lg:mt-0">

             {/* Static glow behind image */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-blue-500/20 blur-[60px] rounded-full -z-10 opacity-50" />

             <div className="relative z-10 w-full h-[500px] lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-[#001540]">
                <Image
                  src="/MSTeam.png"
                  alt="Equipo de abogados Manuel Solis"
                  fill
                  className="object-cover scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
             </div>

             {/* Badge with glow */}
             <m.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-10 -left-6 lg:-left-12 z-20"
             >
                <div className="relative p-6 glass-elevated rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden group glow-gold shimmer">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#B2904D]/20 to-transparent opacity-50" />

                    <div className="relative z-10 flex flex-col items-start gap-1">
                        <span className="text-xs font-bold text-[#B2904D] uppercase tracking-widest">
                            {language === 'es' ? 'Excelencia' : 'Excellence'}
                        </span>
                        <span className="text-3xl font-light text-white">
                            {language === 'es' ? 'Desde 1990' : 'Since 1990'}
                        </span>
                        <div className="h-1 w-full bg-white/10 mt-2 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-[#B2904D]" />
                        </div>
                    </div>
                </div>
             </m.div>

          </div>
        </div>
      </div>
    </section>
  )
}