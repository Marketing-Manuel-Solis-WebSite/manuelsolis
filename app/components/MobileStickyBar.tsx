'use client';

import { Phone, CalendarCheck } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { pushToDataLayer, trackConversion } from '../lib/tracking';
import { track } from '@vercel/analytics/react';

const PHONE_NUMBER = '18886761238';

export default function MobileStickyBar() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const lang = (language as 'es' | 'en') || 'es';

  const handlePhoneClick = () => {
    track('Phone Click', { location: 'mobile_sticky_bar' });
    pushToDataLayer('phone_click', {
      event_category: 'conversion',
      event_label: 'mobile_sticky_bar',
    });
    trackConversion('phone_click', 'mobile_sticky_bar');
  };

  const handleConsultaClick = () => {
    track('Consulta CTA Click', { location: 'mobile_sticky_bar' });
    pushToDataLayer('consulta_click', {
      event_category: 'conversion',
      event_label: 'mobile_sticky_bar',
    });
    trackConversion('consulta_click', 'mobile_sticky_bar');
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-[#001540]/95 backdrop-blur-md border-t border-[#B2904D]/30"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex divide-x divide-white/10">
        {/* Call Button */}
        <a
          href={`tel:+${PHONE_NUMBER}`}
          onClick={handlePhoneClick}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 text-white font-semibold text-sm active:bg-[#002868] transition-colors"
          aria-label={isEs ? 'Llamar ahora' : 'Call now'}
        >
          <Phone className="w-4 h-4 text-[#B2904D]" />
          <span>{isEs ? 'Llamar' : 'Call'}</span>
        </a>

        {/* Consulta Button */}
        <Link
          href={`/${lang}/consulta`}
          onClick={handleConsultaClick}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-b from-[#D4AF37] to-[#B2904D] text-[#001540] font-bold text-sm active:from-[#B2904D] active:to-[#9A7D3F] transition-colors"
          aria-label={isEs ? 'Solicitar consulta' : 'Request consultation'}
        >
          <CalendarCheck className="w-4 h-4" />
          <span>{isEs ? 'Solicitar consulta' : 'Request consultation'}</span>
        </Link>
      </div>
    </div>
  );
}
