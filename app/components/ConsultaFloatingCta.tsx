'use client';

import { CalendarCheck } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { track } from '@vercel/analytics/react';
import { pushToDataLayer, trackConversion } from '../lib/tracking';

export default function ConsultaFloatingCta() {
  const { language } = useLanguage();
  const lang = (language as 'es' | 'en') || 'es';

  const label = lang === 'es' ? 'Solicitar consulta' : 'Request consultation';

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
      className="group fixed bottom-6 right-[6.5rem] z-50 hidden sm:inline-flex items-center gap-2.5 pl-4 pr-5 py-2.5 rounded-full bg-gradient-to-b from-[#D4AF37] to-[#B2904D] text-[#001540] font-semibold text-sm tracking-wide shadow-[0_6px_20px_-4px_rgba(178,144,77,0.45)] hover:shadow-[0_10px_28px_-4px_rgba(178,144,77,0.65)] hover:-translate-y-0.5 transition-all duration-200 ring-1 ring-inset ring-[#F3E5AB]/50"
    >
      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#001540]/15">
        <CalendarCheck size={15} strokeWidth={2.5} />
      </span>
      <span className="whitespace-nowrap">{label}</span>
    </Link>
  );
}
