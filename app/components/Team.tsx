import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from './motion';
import type { Language } from '../lib/translations';

/**
 * Team — server-first (Fase 2.2c). NOTE: this Home section is a text + team-photo
 * + badge block (a marketing intro that links to /abogados), NOT a grid of
 * attorney cards — the attorney grid lives on the /abogados route (future
 * rollout). All copy renders server-side. Movement: ONE protagonist — the text
 * column cascades via <Stagger>; image + badge get single <Reveal> accents.
 * CTA link to /{lang}/abogados preserved.
 */
export default function Team({ lang }: { lang: Language }) {
  const isEs = lang === 'es';

  return (
    <section id="equipo" className="relative py-32 lg:py-48 w-full bg-navy-500 overflow-hidden">
      {/* Background — static */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-navy-500" />
        <div className="absolute inset-0 gradient-mesh-dark" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B2904D]/10 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3 opacity-20" />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[90px] -translate-x-1/3 translate-y-1/3 opacity-30" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">

          {/* Left Column: text — protagonist cascade */}
          <Stagger gap={0.12} className="lg:col-span-6 space-y-10">
            <StaggerItem as="div">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-[2px] w-10 bg-[#B2904D]"></span>
                <span className="text-[#B2904D] font-bold tracking-[0.2em] text-xs uppercase">
                  {isEs ? 'Nuestra Firma' : 'Our Firm'}
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-[5rem] font-thin text-white leading-[0.95] tracking-tight">
                {isEs ? 'Nuestro Equipo' : 'Our Legal Team'} <br />
                <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] via-[#ffeebb] to-[#B2904D]">
                  {isEs ? 'Legal' : '& Attorneys'}
                </span>
              </h2>
            </StaggerItem>

            <StaggerItem as="div" className="space-y-6 text-lg lg:text-xl font-light text-blue-100/70 leading-relaxed">
              <p>
                {isEs
                  ? 'Desde la apertura de su bufete en 1990, Manuel E. Solís y equipo se han comprometido a brindar el nivel de servicio que esperarían recibir si estuvieran en el lugar de nuestros clientes.'
                  : 'Since opening his firm in 1990, Manuel E. Solís and team have committed to providing the level of service they would expect to receive if they were in the place of our clients.'}
              </p>
              <div className="pl-6 border-l-2 border-white/10">
                <p className="italic text-white/90">
                  {isEs
                    ? 'Muchos de nuestros abogados comparten la experiencia personal de emigrar a los EE.UU., lo que les permite entender profundamente las necesidades de nuestros clientes.'
                    : 'Many of our attorneys share the personal experience of immigrating to the U.S., which allows them to deeply understand the needs of our clients.'}
                </p>
              </div>
            </StaggerItem>

            <StaggerItem as="div" className="pt-4">
              <a
                href={`/${lang}/abogados`}
                className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-full overflow-hidden hover:bg-white/10 hover:border-[#B2904D]/50 transition-all duration-300 backdrop-blur-sm"
              >
                <span className="relative z-10 text-white font-medium tracking-wide">
                  {isEs ? 'Conoce al Equipo' : 'Meet the Team'}
                </span>
                <div className="relative z-10 w-10 h-10 rounded-full bg-[#B2904D] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <ArrowRight className="w-5 h-5 text-white transform group-hover:-rotate-45 transition-transform duration-300" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              </a>
            </StaggerItem>
          </Stagger>

          {/* Right Column: image + badge — single Reveal accents */}
          <div className="lg:col-span-6 relative mt-12 lg:mt-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-blue-500/20 blur-[60px] rounded-full -z-10 opacity-50" />

            <Reveal variant="scale" amount={0.25} className="relative z-10 block w-full h-[500px] lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-navy-500">
              <Image
                src="/MSTeam.png"
                alt="Equipo de abogados Manuel Solis"
                fill
                className="object-cover scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-60" />
            </Reveal>

            {/* Badge */}
            <Reveal variant="up" delay={0.3} className="absolute -bottom-10 -left-6 lg:-left-12 z-20">
              <div className="relative p-6 glass-elevated rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden glow-gold">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#B2904D]/20 to-transparent opacity-50" />
                <div className="relative z-10 flex flex-col items-start gap-1">
                  <span className="text-xs font-bold text-[#B2904D] uppercase tracking-widest">
                    {isEs ? 'Excelencia' : 'Excellence'}
                  </span>
                  <span className="text-3xl font-light text-white">
                    {isEs ? 'Desde 1990' : 'Since 1990'}
                  </span>
                  <div className="h-1 w-full bg-white/10 mt-2 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-[#B2904D]" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
