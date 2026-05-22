import React from 'react';
import { Scale } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { attorneys, getText, locationGroups } from '../../lib/attorneyData';
import AttorneysExplorer, { type ExplorerGroup, type ExplorerTexts } from './AttorneysExplorer';

/**
 * Attorneys directory — server-first (Fase 2.3 abogados). The server shell
 * (Header, hero, Footer) renders statically; the interactive grid + detail
 * modal live in the <AttorneysExplorer> client island, which receives attorney
 * data already resolved to the active `lang` (enfoque b → the inactive locale
 * never reaches the client bundle). LCP sacred: the hero H1 renders statically.
 * page.tsx (generateMetadata) is untouched — only the `lang` prop is threaded.
 */
export default function AbogadosClient({ lang }: { lang: 'es' | 'en' }) {
  const language: 'es' | 'en' = lang === 'en' ? 'en' : 'es';

  const hero = {
    badge: { es: 'Defensa de Clase Mundial', en: 'World-Class Defense' },
    title1: { es: 'Conozca a Sus', en: 'Meet Your' },
    title2: { es: 'Defensores', en: 'Advocates' },
    subtitle: {
      es: 'Más que abogados, somos aliados estratégicos dedicados a proteger su futuro con integridad, experiencia y pasión.',
      en: 'More than lawyers, we are strategic allies dedicated to protecting your future with integrity, experience, and passion.'
    },
  };

  const texts: ExplorerTexts = {
    viewProfile: language === 'es' ? 'Ver Perfil Completo' : 'View Full Profile',
    modalBadge: language === 'es' ? 'Perfil Profesional' : 'Professional Profile',
    education: language === 'es' ? 'Educación' : 'Education',
    admissions: language === 'es' ? 'Admisiones' : 'Admissions',
    achievements: language === 'es' ? 'Logros' : 'Achievements',
    button: language === 'es' ? 'Solicitar Consulta' : 'Request Consultation',
    viewFullProfile: language === 'es' ? 'Ver Perfil Completo' : 'View Full Profile',
    defaultBio: language === 'es'
      ? 'es un miembro fundamental de nuestro equipo legal. Con una trayectoria dedicada a la defensa de los derechos de nuestros clientes, aporta experiencia, integridad y un compromiso inquebrantable para lograr los mejores resultados posibles.'
      : 'is a fundamental member of our legal team. With a career dedicated to defending our clients\' rights, they bring experience, integrity, and an unwavering commitment to achieving the best possible results.',
    educationFallback: language === 'es' ? 'Información disponible en consulta.' : 'Information available upon consultation.',
    admissionsFallback: language === 'es' ? 'Abogado certificado y reconocido.' : 'Certified and recognized attorney.',
    close: language === 'es' ? 'Cerrar' : 'Close',
  };

  // Resolve the grouped attorney data to the active locale on the server.
  const groups: ExplorerGroup[] = locationGroups.map((group) => ({
    label: group.label[language],
    attorneys: group.ids
      .map((id) => attorneys.find((a) => a.id === id))
      .filter((a): a is typeof attorneys[number] => a !== undefined)
      .map((a) => ({
        id: a.id,
        name: a.name,
        image: a.image,
        role: a.role[language],
        quote: a.quote[language],
        bio: a.bio[language],
        education: a.education.map((e) => getText(e, language)),
        admissions: a.admissions.map((e) => getText(e, language)),
      })),
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

      {/* HERO SECTION (static — LCP) */}
      <section className="relative pt-48 pb-24 px-4 overflow-hidden z-10">
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B2904D]/30 bg-[#B2904D]/10 backdrop-blur-md mb-6">
              <Scale size={14} className="text-[#B2904D]" />
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
        </div>
      </section>

      <AttorneysExplorer groups={groups} texts={texts} lang={language} />

      <Footer />
    </div>
  );
}
