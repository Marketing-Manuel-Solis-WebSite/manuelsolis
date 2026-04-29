'use client';

import { Sparkles, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { track } from '@vercel/analytics/react';
import { pushToDataLayer, trackConversion } from '../lib/tracking';

export default function ConsultaFloatingCta() {
  const { language } = useLanguage();
  const lang = (language as 'es' | 'en') || 'es';

  const label = lang === 'es' ? 'Consulta Gratis' : 'Free Consultation';
  const sub = lang === 'es' ? 'Respuesta en 24h' : 'Reply in 24h';

  const handleClick = () => {
    track('Consulta CTA Click', { location: 'floating_button' });
    pushToDataLayer('consulta_click', {
      event_category: 'conversion',
      event_label: 'floating_consulta_cta',
    });
    trackConversion('consulta_click', 'floating_consulta_cta');
  };

  return (
    <Link
      href={`/${lang}/consulta`}
      onClick={handleClick}
      aria-label={label}
      className="group fixed bottom-6 right-24 z-50 hidden sm:flex items-center gap-3 pl-5 pr-4 py-3 rounded-full bg-gradient-to-b from-[#D4AF37] to-[#B2904D] text-[#001540] font-bold shadow-[0_8px_30px_-4px_rgba(178,144,77,0.55)] hover:shadow-[0_12px_40px_-4px_rgba(178,144,77,0.75)] hover:-translate-y-0.5 transition-all duration-300 ring-1 ring-[#F3E5AB]/40 overflow-hidden"
    >
      {/* Pulsing outer ring */}
      <span className="absolute -inset-1 rounded-full bg-[#B2904D] opacity-40 blur-md animate-consulta-pulse pointer-events-none" />

      {/* Shimmer sweep on hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

      {/* Icon with subtle bg */}
      <span className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-[#001540]/15">
        <Sparkles size={15} strokeWidth={2.4} />
      </span>

      <span className="relative z-10 flex flex-col leading-tight">
        <span className="text-sm tracking-wide">{label}</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] opacity-70">
          {sub}
        </span>
      </span>

      <ArrowUpRight
        size={16}
        strokeWidth={2.4}
        className="relative z-10 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
      />

      <style jsx>{`
        @keyframes consulta-pulse {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(1.06); }
        }
        .animate-consulta-pulse {
          animation: consulta-pulse 2.6s ease-in-out infinite;
        }
      `}</style>
    </Link>
  );
}
