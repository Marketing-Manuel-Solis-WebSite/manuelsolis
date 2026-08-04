'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// not-found.tsx vive fuera del segmento [lang], así que no recibe el locale por
// params y su HTML se prerenderiza una sola vez. El idioma se resuelve en el
// cliente leyendo location.pathname (misma condición que el script inline del
// root layout); el prerender queda en español, el idioma por defecto del sitio.
const LOCALE_TEXT = {
  es: {
    title: 'Página no encontrada',
    body: 'La página que buscas no existe o fue movida. No te preocupes, estamos aquí para ayudarte.',
    short: 'La página que buscas no existe o fue movida.',
    home: 'Ir al Inicio',
    services: 'Ver Servicios',
  },
  en: {
    title: 'Page not found',
    body: "The page you're looking for doesn't exist or has been moved. Don't worry, we're here to help.",
    short: "The page you're looking for doesn't exist or has been moved.",
    home: 'Go to Homepage',
    services: 'View Services',
  },
} as const;

export default function NotFound() {
  const [locale, setLocale] = useState<'es' | 'en'>('es');

  useEffect(() => {
    if (/^\/en(\/|$)/.test(window.location.pathname)) setLocale('en');
  }, []);

  const t = LOCALE_TEXT[locale];
  const alt = LOCALE_TEXT[locale === 'es' ? 'en' : 'es'];

  return (
    <div className="min-h-screen bg-[#001540] flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#B2904D]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* 404 number */}
        <h1 className="text-[8rem] md:text-[12rem] font-bold leading-none tracking-tighter text-gradient-gold select-none">
          404
        </h1>

        {/* Message */}
        <div className="space-y-4 -mt-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-white" lang={locale}>
            {t.title}
          </h2>
          <p className="text-blue-100/60 text-lg max-w-md mx-auto" lang={locale}>
            {t.body}
          </p>
          <p className="text-blue-100/40 text-sm" lang={locale === 'es' ? 'en' : 'es'}>
            {alt.short}
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#B2904D] to-[#D4A94E] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#B2904D]/25 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            {t.home}
          </Link>
          <Link
            href={`/${locale}/servicios`}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#B2904D]/40 text-[#B2904D] font-medium rounded-lg hover:bg-[#B2904D]/10 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>
            {t.services}
          </Link>
          <a
            href="tel:+18886761238"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            1-888-676-1238
          </a>
        </div>

        {/* Decorative line */}
        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#B2904D]/40" />
          <span className="text-[#B2904D]/40 text-xs tracking-widest uppercase">Manuel Solis Law Firm</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#B2904D]/40" />
        </div>
      </div>
    </div>
  );
}
