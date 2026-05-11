'use client'

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { pushToDataLayer, trackConversion } from '../lib/tracking';

const associations = [
  { name: 'Chicago Bar Association', logo: '/state-bar/Chicago-bar.png' },
  { name: 'Illinois State Bar Association', logo: '/state-bar/illinois-bar.png' },
  { name: 'State Bar of New Mexico', logo: '/state-bar/nm-state.png' },
  { name: 'American Bar Association', logo: '/state-bar/aba-state.png' },
  { name: 'Rama Judicial de Puerto Rico', logo: '/state-bar/pr-state.png' },
  { name: 'CD State Bar', logo: '/state-bar/cd-state.png' },
];

export default function HeroProfessional() {
  const { t, language } = useLanguage();
  const containerRef = useRef(null);

  const [showPopup, setShowPopup] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);

  // Fire popup_open when the popup is rendered visible (mount or re-show).
  // Trigger remains as-is per Phase 1 scope; tracking opens a 14-day window
  // for Phase 5 decision (see DISCOVERY_v3.md §9.3).
  useEffect(() => {
    if (showPopup) {
      pushToDataLayer('popup_open', {
        popup_id: 'detained_relative',
        page_url: typeof window !== 'undefined' ? window.location.pathname : '',
      });
    }
  }, [showPopup]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  const getLogoSize = (logoName: string) => {
    if (logoName.includes('aba-state')) return { height: 80, width: 180, containerHeight: 'h-20' };
    if (logoName.includes('illinois-bar') || logoName.includes('nm-state')) return { height: 140, width: 280, containerHeight: 'h-32' };
    if (logoName.includes('Chicago-bar')) return { height: 130, width: 250, containerHeight: 'h-30' };
    return { height: 120, width: 240, containerHeight: 'h-28' };
  };

  const getExtraMargin = (logoName: string) => {
    if (logoName.includes('illinois-bar')) return 'ml-16';
    if (logoName.includes('nm-state')) return 'ml-36';
    if (logoName.includes('aba-state')) return 'ml-20';
    if (logoName.includes('pr-state')) return 'ml-20';
    return '';
  };

  const handleDetainedCallClick = (label: string) => {
    pushToDataLayer('phone_click', {
      event_category: 'conversion',
      event_label: label,
    });
    trackConversion('phone_click', label);
  };

  const handleDismissPopup = () => {
    pushToDataLayer('popup_dismiss', {
      popup_id: 'detained_relative',
    });
    setShowPopup(false);
  };

  const handlePopupCtaClick = (ctaLabel: 'client' | 'non_client') => {
    pushToDataLayer('popup_cta_click', {
      popup_id: 'detained_relative',
      cta_label: ctaLabel,
    });
    // Preserve existing phone_click signal (orthogonal channel).
    handleDetainedCallClick(
      ctaLabel === 'client' ? 'detained_popup_client' : 'detained_popup_non_client'
    );
  };

  const marqueeItems = [...associations, ...associations, ...associations];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center bg-[#001540] overflow-hidden pt-24 lg:pt-44 pb-48 lg:pb-72"
    >
      {/* Background Effects — Static */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#001540] via-[#001540] to-[#001540]" />

        {/* Static blur orbs — no animation */}
        <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-blue-600/20 rounded-full blur-[60px] opacity-40" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-sky-800/20 rounded-full blur-[60px] opacity-30" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-12 relative z-10 flex-grow flex flex-col justify-center">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">

          {/* Image Section */}
          <div className="lg:col-span-5 w-full relative h-[350px] sm:h-[450px] lg:h-[750px] flex items-end justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent blur-2xl rounded-full z-0 opacity-80" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: isDesktop ? -80 : -20 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative z-10 w-full h-full origin-bottom flex justify-center"
            >
               <div className="w-full h-full scale-110 sm:scale-125 lg:scale-[1.65] lg:-translate-x-24 lg:origin-bottom transform-gpu">
                  <div className="relative w-full h-full">
                    <Image
                      src="/manuelsolisl.png"
                      alt="Abogado Manuel Solis"
                      fill
                      className="object-contain object-bottom drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
               </div>
            </motion.div>

            {/* Experience Badge */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0 z-40 p-4 sm:p-6 border border-white/10 rounded-xl backdrop-blur-md bg-white/10 shadow-xl text-center lg:text-right min-w-[160px] sm:min-w-[180px]"
            >
                <div className="group">
                  <div className="flex items-baseline text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-sky-200/50 justify-center lg:justify-end">
                    <span className="text-4xl sm:text-5xl font-extralight tracking-tighter">35</span>
                    <span className="text-2xl sm:text-3xl font-thin text-[#B2904D] ml-2 group-hover:rotate-12 transition-transform">+</span>
                  </div>
                  <p className="text-xs text-white/60 uppercase tracking-[0.2em] mt-2 font-medium">
                    {language === 'es' ? 'Años de Experiencia' : 'Years Experience'}
                  </p>
                </div>
            </motion.div>
          </div>

          {/* Text Content Section */}
          <div className="lg:col-span-7 w-full space-y-6 lg:space-y-10 pl-0 lg:pl-16 relative z-20">

            <motion.div
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute left-0 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-sky-500/30 to-transparent origin-top hidden lg:block"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              className="relative overflow-visible"
            >
              <div className="absolute -inset-10 lg:-inset-20 bg-gradient-radial from-[#B2904D]/20 via-sky-500/10 to-transparent blur-[40px] lg:blur-[60px] -z-10 opacity-60" />

              <div className="relative flex flex-col items-center lg:items-start overflow-visible">

                {/* "More than" text */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="mb-2 lg:mb-3"
                >
                  <span className="text-xl sm:text-2xl lg:text-4xl font-light text-white/60 uppercase tracking-[0.2em] sm:tracking-[0.3em] relative">
                    {language === 'es' ? 'Más de' : 'More than'}
                  </span>
                </motion.div>

                {/* 50,000 Number — Static gradient, no animation */}
                <div className="relative w-full overflow-visible px-2 sm:px-4 lg:px-4 lg:pr-16 py-2 sm:py-4">
                  <div className="absolute inset-0 text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[10rem] font-black tracking-tighter text-[#B2904D]/15 blur-xl flex items-center justify-center lg:justify-start">
                    50,000
                  </div>

                  <div
                    className="relative text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[10rem] font-black tracking-tighter leading-none flex items-center justify-center lg:justify-start w-full"
                    style={{
                      background: 'linear-gradient(135deg, #B2904D 0%, #D4A853 25%, #B2904D 50%, #8B6914 75%, #B2904D 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 15px rgba(178,144,77,0.4))'
                    }}
                  >
                    50,000
                  </div>
                </div>

                {/* "Cases Won" text */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 1 }}
                  className="mt-2 sm:mt-4 lg:mt-6 relative"
                >
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white uppercase tracking-[0.3em] sm:tracking-[0.4em] font-light">
                    {language === 'es' ? 'Casos Ganados' : 'Cases Won'}
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
              className="w-full max-w-md mx-auto lg:mx-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent origin-left"
            />

            {/* Practice Areas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 1 }}
              className="space-y-6 sm:space-y-8"
            >
              <h1 className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 md:gap-6">
                <span className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white/90">
                  {language === 'es' ? 'Inmigración' : 'Immigration'}
                </span>
                <span className="text-3xl sm:text-4xl md:text-5xl font-thin text-[#B2904D]"> & </span>
                <span className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white/90">
                  {language === 'es' ? 'Accidentes' : 'Accidents'}
                </span>
              </h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1.5 }}
                className="relative px-2 sm:px-0"
              >
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/70 font-light italic text-center lg:text-left tracking-wide relative z-10">
                  {language === 'es' ? 'Inspirados por la gracia de Dios' : 'Inspired by the grace of God'}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bar Associations Carousel — CSS animation instead of Framer Motion */}
      <div className="absolute bottom-0 left-0 right-0 z-30 w-full border-t border-white/5 bg-transparent pt-8 sm:pt-12 pb-16 sm:pb-24">
        <div className="relative w-full overflow-hidden mask-linear-fade">
           <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#001540] to-transparent z-20" />
           <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#001540] to-transparent z-20" />

           <div className="hero-marquee flex items-center gap-40 sm:gap-80 whitespace-nowrap">
             {marqueeItems.map((assoc, idx) => {
               const size = getLogoSize(assoc.logo);
               const extraMargin = getExtraMargin(assoc.logo);

               return (
                 <div key={idx} className={`flex items-center justify-center opacity-50 ${extraMargin}`}>
                   <div className={`relative ${size.containerHeight} w-auto flex-shrink-0 filter grayscale brightness-[1.5] contrast-[1.2]`}>
                       <Image
                         src={assoc.logo}
                         alt={assoc.name}
                         height={size.height}
                         width={size.width}
                         className="h-full w-auto object-contain drop-shadow-sm"
                         loading="lazy"
                       />
                   </div>
                 </div>
               );
             })}
           </div>
        </div>
      </div>

      {/* Detained Relative Popup */}
      {showPopup && (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
            className="fixed top-20 sm:top-24 md:top-32 left-4 right-4 sm:left-auto sm:right-4 md:right-10 z-50 w-auto max-w-[calc(100%-2rem)] sm:max-w-sm mx-auto sm:mx-0 p-4 sm:p-6 rounded-2xl bg-red-900/90 backdrop-blur-md border border-red-500/30 shadow-2xl group"
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 to-transparent rounded-2xl opacity-50 pointer-events-none" />
            <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-bold mb-1 text-red-50 drop-shadow-md">
                    {language === 'es' ? '¿Familiar Detenido?' : 'Detained Relative?'}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-red-100/90 mb-3 sm:mb-4">
                    {language === 'es' ? 'Indica cómo podemos ayudarte:' : 'Tell us how we can help:'}
                </p>
                <div className="space-y-2 sm:space-y-3">
                    <a href="tel:+18886761238" onClick={() => handlePopupCtaClick('client')} className="flex items-center gap-2 sm:gap-3 w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-red-800/40 hover:bg-red-700/60 border border-red-400/20 hover:border-red-400/50 transition-all duration-300 group/btn">
                        <span className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full bg-red-500/20 text-red-200 text-xs font-bold group-hover/btn:bg-red-500 group-hover/btn:text-white transition-colors">✓</span>
                        <span className="text-xs sm:text-sm text-white font-light">{language === 'es' ? 'Sí, soy cliente' : 'Yes, I am a client'}</span>
                    </a>
                    <a href="tel:+18886761238" onClick={() => handlePopupCtaClick('non_client')} className="flex items-center gap-2 sm:gap-3 w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-red-800/40 hover:bg-red-700/60 border border-red-400/20 hover:border-red-400/50 transition-all duration-300 group/btn">
                        <span className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full bg-red-500/20 text-red-200 text-xs font-bold group-hover/btn:bg-red-500 group-hover/btn:text-white transition-colors">✓</span>
                        <span className="text-xs sm:text-sm text-white font-light">{language === 'es' ? 'Sí, pero no soy cliente' : 'Yes, but I am not a client'}</span>
                    </a>
                </div>
                <button onClick={handleDismissPopup} className="block w-full text-center mt-3 sm:mt-4 text-xs text-red-200/50 hover:text-white underline decoration-red-200/30 hover:decoration-white transition-all">
                    {language === 'es' ? 'Continuar al sitio' : 'Continue to site'}
                </button>
            </div>
        </motion.div>
      )}

      <style jsx global>{`
        .mask-linear-fade {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        .hero-marquee {
          animation: marquee-scroll 35s linear infinite;
        }
        @media (max-width: 1024px) {
          .hero-marquee {
            animation-duration: 20s;
          }
        }
      `}</style>
    </section>
  );
}
