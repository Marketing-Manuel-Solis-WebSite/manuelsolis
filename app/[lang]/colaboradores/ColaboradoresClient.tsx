import React from 'react';
import { Users, Mail, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { collaborators } from '../../lib/collaboratorData';
import { Stagger, StaggerItem } from '../../components/motion';

/**
 * Collaborators directory — server-first (mirrors AbogadosClient). The shell
 * (Header, hero, Footer) renders statically; the card grid uses Stagger
 * islands for movement. Collaborator data is resolved to the active `lang` on
 * the server, so the inactive locale never reaches the client bundle. LCP
 * sacred: the hero H1 renders statically. page.tsx (generateMetadata) is
 * untouched — only the `lang` prop is threaded in.
 */
export default function ColaboradoresClient({ lang }: { lang: 'es' | 'en' }) {
  const language: 'es' | 'en' = lang === 'en' ? 'en' : 'es';

  const hero = {
    badge: { es: 'Equipo Manuel Solís', en: 'Manuel Solís Team' },
    title1: { es: 'Nuestros', en: 'Our' },
    title2: { es: 'Colaboradores', en: 'Collaborators' },
    subtitle: {
      es: 'Las personas detrás de su experiencia con la firma. Conozca a quienes trabajan cada día para que su caso avance con claridad y confianza.',
      en: 'The people behind your experience with the firm. Meet those who work every day so your case moves forward with clarity and confidence.',
    },
  };

  const texts = {
    viewProfile: { es: 'Ver Perfil', en: 'View Profile' },
  };

  const cards = collaborators.map((c) => ({
    id: c.id,
    name: c.name,
    image: c.image,
    role: c.role[language],
    email: c.email,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-[#001529] text-white relative selection:bg-[#B2904D] selection:text-white font-sans overflow-x-hidden">

      <Header />

      {/* FONDO ATMOSFÉRICO - CSS only, no JS animations */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
        <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-blue-500/20 rounded-full blur-[150px] opacity-50" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-sky-600/20 rounded-full blur-[180px] opacity-40" />
      </div>

      <main id="main-content" tabIndex={-1}>
        {/* HERO SECTION (static — LCP) */}
        <section className="relative pt-48 pb-24 px-4 overflow-hidden z-10">
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B2904D]/30 bg-[#B2904D]/10 backdrop-blur-md mb-6">
              <Users size={14} className="text-[#B2904D]" />
              <span className="text-[#B2904D] text-xs font-bold tracking-widest uppercase">
                {hero.badge[language]}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              {hero.title1[language]}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] to-[#e6c67e]">
                {hero.title2[language]}
              </span>
            </h1>

            <p className="text-blue-100/70 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              {hero.subtitle[language]}
            </p>
          </div>
        </section>

        {/* COLLABORATOR GRID */}
        <section className="relative px-4 pb-28 z-10">
          <div className="max-w-7xl mx-auto">
            <Stagger
              gap={0.08}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
              amount={0.1}
            >
              {cards.map((c) => (
                <StaggerItem key={c.id} as="div">
                  <Link
                    href={`/${language}/colaboradores/${c.id}`}
                    className="card-3d group relative h-[420px] rounded-2xl overflow-hidden block border border-white/10 bg-[#001540]/60 hover:border-[#B2904D]/70 hover:shadow-[0_0_30px_rgba(178,144,77,0.25)] transition-all duration-500"
                  >
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                      <Image
                        src={c.image}
                        alt={c.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001540]/95 via-[#001540]/50 to-transparent opacity-95 group-hover:opacity-90 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 w-full p-6 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                      <div className="w-10 h-1 bg-[#B2904D] mb-3 rounded-full group-hover:w-20 transition-all duration-500 shadow-[0_0_15px_#B2904D]" />
                      <h2 className="text-xl font-bold text-white leading-tight mb-1 drop-shadow-lg">
                        {c.name}
                      </h2>
                      <p className="text-[#B2904D] text-xs font-bold tracking-widest uppercase mb-3">
                        {c.role}
                      </p>
                      <div className="flex items-center gap-2 text-blue-100/60 text-xs mb-3">
                        <Mail size={12} className="text-[#B2904D]" />
                        <span className="truncate">{c.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white text-sm font-medium opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-75">
                        {texts.viewProfile[language]} <ChevronRight size={16} className="text-[#B2904D]" />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
