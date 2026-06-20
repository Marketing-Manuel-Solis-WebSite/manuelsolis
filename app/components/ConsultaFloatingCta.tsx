'use client';

import { CalendarCheck } from 'lucide-react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { fireConversion } from '../lib/conversion';

const MotionLink = m(Link);

export default function ConsultaFloatingCta() {
  const { language } = useLanguage();
  const lang = (language as 'es' | 'en') || 'es';

  const label = lang === 'es' ? 'Solicitar consulta' : 'Request consultation';

  const handleClick = () => {
    fireConversion('consulta_click', 'floating_consulta_cta', {
      location: 'floating_button',
    });
  };

  return (
    <MotionLink
      href={`/${lang}/consulta`}
      onClick={handleClick}
      aria-label={label}
      className="fixed bottom-6 right-[12rem] z-50 hidden sm:inline-flex items-center justify-center gap-2.5 h-14 px-6 rounded-full text-[#002342] text-sm font-bold tracking-wide outline-none"
      style={{
        background: 'radial-gradient(120% 200% at 30% 0%, #F9E79F 0%, #D4AF37 38%, #997B2F 100%)',
        boxShadow:
          '0 10px 25px -5px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.55)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
      }}
      whileHover={{
        scale: 1.05,
        boxShadow:
          '0 15px 30px -5px rgba(0, 0, 0, 0.5), inset 0 4px 6px rgba(255, 255, 255, 0.6)',
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
    >
      <CalendarCheck size={17} strokeWidth={2.5} className="drop-shadow-sm shrink-0" />
      <span className="leading-none drop-shadow-sm whitespace-nowrap">{label}</span>
    </MotionLink>
  );
}
