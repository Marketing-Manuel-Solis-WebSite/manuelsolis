'use client';

import { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import { pushToDataLayer, trackConversion } from '../lib/tracking';

/**
 * Detained-relative popup — interactive island extracted from the Hero so the
 * Hero itself can render server-first. Behavior preserved EXACTLY from Fase 1A:
 * opens after a 7s delay OR scroll intent (whichever first), and a per-session
 * `sessionStorage` flag stops it re-opening once dismissed. Tracking unchanged.
 *
 * A11y: appears without user action, so it must NOT steal focus nor trap it
 * (that would hijack a keyboard user mid-task). Hence no `useDialog`/`aria-modal`
 * here: the page behind stays operable, the live region announces the popup, and
 * Escape dismisses it from anywhere on the page.
 */
export default function HeroPopup({ lang }: { lang: 'es' | 'en' }) {
  const isEs = lang === 'es';
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (showPopup) {
      pushToDataLayer('popup_open', {
        popup_id: 'detained_relative',
        page_url: typeof window !== 'undefined' ? window.location.pathname : '',
      });
    }
  }, [showPopup]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('detained_popup_dismissed') === '1') return;

    let opened = false;
    const open = () => {
      if (opened) return;
      opened = true;
      setShowPopup(true);
      cleanup();
    };
    const onScroll = () => {
      if (window.scrollY > 300) open();
    };
    const timer = setTimeout(open, 7000);
    window.addEventListener('scroll', onScroll, { passive: true });

    function cleanup() {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    }
    return cleanup;
  }, []);

  const handleDetainedCallClick = (label: string) => {
    pushToDataLayer('phone_click', { event_category: 'conversion', event_label: label });
    trackConversion('phone_click', label);
  };

  const handleDismissPopup = () => {
    pushToDataLayer('popup_dismiss', { popup_id: 'detained_relative' });
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('detained_popup_dismissed', '1');
    }
    setShowPopup(false);
  };

  const handlePopupCtaClick = (ctaLabel: 'client' | 'non_client') => {
    pushToDataLayer('popup_cta_click', { popup_id: 'detained_relative', cta_label: ctaLabel });
    handleDetainedCallClick(ctaLabel === 'client' ? 'detained_popup_client' : 'detained_popup_non_client');
  };

  useEffect(() => {
    if (!showPopup) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleDismissPopup();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showPopup, handleDismissPopup]);

  return (
    <>
      {/* Mounted from the first render so the text change is announced when the popup opens. */}
      <div aria-live="polite" className="sr-only">
        {showPopup
          ? (isEs
            ? 'Se abrió un aviso: ¿Familiar detenido? Incluye dos opciones para llamarnos y un botón para cerrarlo. Pulse Escape para cerrarlo.'
            : 'A notice opened: Detained relative? It offers two options to call us and a button to dismiss it. Press Escape to dismiss it.')
          : ''}
      </div>

      {showPopup && (
        <m.div
          role="alertdialog"
          aria-labelledby="detained-popup-title"
          aria-describedby="detained-popup-description"
          tabIndex={-1}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="fixed top-20 sm:top-24 md:top-32 left-4 right-4 sm:left-auto sm:right-4 md:right-10 z-50 w-auto max-w-[calc(100%-2rem)] sm:max-w-sm mx-auto sm:mx-0 p-4 sm:p-6 rounded-2xl bg-red-900/90 backdrop-blur-md border border-red-500/30 shadow-2xl group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 to-transparent rounded-2xl opacity-50 pointer-events-none" />
          <div className="relative z-10">
            <h3 id="detained-popup-title" className="text-lg sm:text-xl font-bold mb-1 text-red-50 drop-shadow-md">
              {isEs ? '¿Familiar Detenido?' : 'Detained Relative?'}
            </h3>
            <p id="detained-popup-description" className="text-xs sm:text-sm font-medium text-red-100/90 mb-3 sm:mb-4">
              {isEs ? 'Indica cómo podemos ayudarte:' : 'Tell us how we can help:'}
            </p>
            <div className="space-y-2 sm:space-y-3">
              <a href="tel:+18886761238" onClick={() => handlePopupCtaClick('client')} className="flex items-center gap-2 sm:gap-3 w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-red-800/40 hover:bg-red-700/60 border border-red-400/20 hover:border-red-400/50 transition-all duration-300 group/btn">
                <span className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full bg-red-500/20 text-red-200 text-xs font-bold group-hover/btn:bg-red-500 group-hover/btn:text-white transition-colors">✓</span>
                <span className="text-xs sm:text-sm text-white font-light">{isEs ? 'Sí, soy cliente' : 'Yes, I am a client'}</span>
              </a>
              <a href="tel:+18886761238" onClick={() => handlePopupCtaClick('non_client')} className="flex items-center gap-2 sm:gap-3 w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-red-800/40 hover:bg-red-700/60 border border-red-400/20 hover:border-red-400/50 transition-all duration-300 group/btn">
                <span className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full bg-red-500/20 text-red-200 text-xs font-bold group-hover/btn:bg-red-500 group-hover/btn:text-white transition-colors">✓</span>
                <span className="text-xs sm:text-sm text-white font-light">{isEs ? 'Sí, pero no soy cliente' : 'Yes, but I am not a client'}</span>
              </a>
            </div>
            <button
              onClick={handleDismissPopup}
              aria-label={isEs ? 'Cerrar aviso y continuar al sitio' : 'Close notice and continue to site'}
              className="block w-full text-center mt-3 sm:mt-4 text-xs text-red-100 hover:text-white underline decoration-red-200/30 hover:decoration-white transition-all"
            >
              {isEs ? 'Continuar al sitio' : 'Continue to site'}
            </button>
          </div>
        </m.div>
      )}
    </>
  );
}
