'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { pushToDataLayer, trackConversion } from '../lib/tracking';
import { track } from '@vercel/analytics/react';

const PHONE_NUMBER = '18886761238';
const WHATSAPP_NUMBER = '17138557219';

export default function MobileStickyBar() {
  const { language } = useLanguage();
  const isEs = language === 'es';

  const handlePhoneClick = () => {
    track('Phone Click', { location: 'mobile_sticky_bar' });
    pushToDataLayer('phone_click', {
      event_category: 'conversion',
      event_label: 'mobile_sticky_bar',
    });
    trackConversion('phone_click', 'mobile_sticky_bar');
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      isEs
        ? 'Website: ¡Hola! Quisiera saber más sobre cómo puedo regularizar mi situación migratoria en EE.UU. ¿Podrían asesorarme?'
        : 'Website: Hello! I would like to learn more about how I can regularize my immigration status in the U.S. Could you advise me?'
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');

    track('Whatsapp Click', { location: 'mobile_sticky_bar' });
    pushToDataLayer('whatsapp_click', {
      event_category: 'conversion',
      event_label: 'mobile_sticky_bar',
    });
    trackConversion('whatsapp_click', 'mobile_sticky_bar');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
      <div className="flex border-t border-[#B2904D]/30 bg-[#001540]/95 backdrop-blur-md">
        {/* Call Button */}
        <a
          href={`tel:+${PHONE_NUMBER}`}
          onClick={handlePhoneClick}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 text-white font-semibold text-sm active:bg-[#002868] transition-colors"
          aria-label={isEs ? 'Llamar ahora' : 'Call now'}
        >
          <Phone className="w-5 h-5 text-[#B2904D]" />
          <span>{isEs ? 'Llamar Ahora' : 'Call Now'}</span>
        </a>

        {/* Divider */}
        <div className="w-px bg-[#B2904D]/30 my-2" />

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 text-white font-semibold text-sm active:bg-[#002868] transition-colors"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-[#25D366]" />
          <span>WhatsApp</span>
        </button>
      </div>

      {/* Safe area padding for notched phones */}
      <div className="bg-[#001540]/95 backdrop-blur-md" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }} />
    </div>
  );
}
