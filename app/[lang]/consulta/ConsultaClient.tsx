'use client';

import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Shield, Clock3, Award, Lock } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ContactForm from '../../components/ContactForm';
import { useLanguage } from '../../context/LanguageContext';

export default function ConsultaClient() {
  const { language } = useLanguage();
  const lang = language as 'es' | 'en';

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(700px circle at ${mouseX}px ${mouseY}px, rgba(178,144,77,0.15), transparent 70%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const reassurances = [
    {
      icon: Clock3,
      label: { es: 'Respuesta < 24h', en: 'Reply in < 24h' },
    },
    {
      icon: Lock,
      label: { es: '100% Confidencial', en: '100% Confidential' },
    },
    {
      icon: Award,
      label: { es: '35+ Años', en: '35+ Years' },
    },
    {
      icon: Shield,
      label: { es: 'Sin compromiso', en: 'No commitment' },
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#001026] text-white relative selection:bg-[#B2904D] selection:text-white font-sans overflow-x-hidden">
      <Header />

      <main
        onMouseMove={handleMouseMove}
        className="flex-grow relative pt-32 md:pt-40 pb-20 md:pb-28 px-4 z-10 overflow-hidden"
      >
        {/* Background layers */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,_#002868_0%,_#001540_45%,_#000a1f_100%)] z-0" />

        {/* Grid */}
        <svg className="absolute inset-0 w-full h-full z-0 opacity-30 pointer-events-none">
          <defs>
            <pattern id="consulta-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#B2904D" strokeWidth="0.4" opacity="0.18" />
            </pattern>
            <radialGradient id="consulta-fade" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="consulta-mask">
              <rect width="100%" height="100%" fill="url(#consulta-fade)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#consulta-grid)" mask="url(#consulta-mask)" />
        </svg>

        {/* Mouse spotlight */}
        <motion.div className="pointer-events-none absolute inset-0 z-0" style={{ background: spotlight }} />

        {/* Animated orbs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[5%] left-[-10%] w-[55vw] h-[55vw] bg-[#B2904D]/12 rounded-full blur-[120px] pointer-events-none z-0"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.18, 0.35, 0.18] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[5%] right-[-10%] w-[60vw] h-[60vw] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none z-0"
        />

        {/* Gold corner brackets */}
        <div className="absolute top-28 left-6 md:left-10 w-10 h-10 md:w-14 md:h-14 border-l-2 border-t-2 border-[#B2904D]/40 z-10 pointer-events-none" />
        <div className="absolute top-28 right-6 md:right-10 w-10 h-10 md:w-14 md:h-14 border-r-2 border-t-2 border-[#B2904D]/40 z-10 pointer-events-none" />

        {/* Content */}
        <div className="relative z-20 max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#B2904D]/40 bg-[#001026]/70 backdrop-blur-md mb-8 shadow-[0_0_25px_rgba(178,144,77,0.15)]">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-[#B2904D] opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-[#B2904D]" />
              </span>
              <span className="text-[#B2904D] text-[11px] font-bold tracking-[0.3em] uppercase">
                {lang === 'es' ? 'Consulta Confidencial' : 'Confidential Consultation'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-thin text-white tracking-tighter leading-[1.05] mb-6">
              <span className="block text-white/95">
                {lang === 'es' ? 'Hablemos de tu' : "Let's talk about"}
              </span>
              <span className="block font-black bg-clip-text text-transparent bg-[linear-gradient(110deg,#B2904D_0%,#F3E5AB_25%,#FFFFFF_50%,#F3E5AB_75%,#B2904D_100%)] bg-[length:200%_auto] animate-consulta-shine drop-shadow-[0_0_25px_rgba(178,144,77,0.35)]">
                {lang === 'es' ? 'caso.' : 'your case.'}
              </span>
            </h1>

            <p className="text-base md:text-lg text-blue-100/75 font-light max-w-xl mx-auto leading-relaxed">
              {lang === 'es'
                ? 'Cuéntanos en menos de un minuto qué necesitas. Un abogado revisará tu caso y te contactará personalmente.'
                : 'Tell us in less than a minute what you need. An attorney will review your case and contact you personally.'}
            </p>
          </motion.div>

          {/* Reassurance strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mb-10"
          >
            {reassurances.map((r, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center gap-2 text-white/70">
                  <r.icon size={14} className="text-[#B2904D]" />
                  <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase">
                    {r.label[lang]}
                  </span>
                </div>
                {i < reassurances.length - 1 && (
                  <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[#B2904D]/40" />
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Form panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative p-6 md:p-10 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#B2904D]/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes consulta-shine {
          0% { background-position: 200% center; }
          100% { background-position: 0% center; }
        }
        .animate-consulta-shine {
          animation: consulta-shine 6s linear infinite;
        }
      `}</style>
    </div>
  );
}
