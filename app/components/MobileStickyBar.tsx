'use client';

import { useMemo } from 'react';
import { Phone, FileText, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { fireConversion } from '../lib/conversion';
import { officesPhoneMap, DEFAULT_PHONE, DEFAULT_PHONE_LINK } from './officesPhoneMap';

// +1 713-876-3560 (formato wa.me sin "+", sin guiones)
const WHATSAPP_NUMBER = '17138763560';

const WHATSAPP_MESSAGE_ES =
  'Website: ¡Hola! Quisiera saber más sobre cómo puedo regularizar mi situación migratoria en EE.UU. ¿Podrían asesorarme?';

const WHATSAPP_MESSAGE_EN =
  "Website: Hi! I'd like to learn more about how to regularize my immigration status in the U.S. Could you help me?";

export default function MobileStickyBar() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const isEs = language === 'es';
  const lang = (language as 'es' | 'en') || 'es';

  // Office-aware phone — same pattern as Header.tsx
  const { phoneNumber, phoneLink, officeSlug } = useMemo(() => {
    const currentPath = pathname || '';
    const officeMatch = currentPath.match(/\/oficinas\/([^/]+)/);
    const slug = officeMatch?.[1];

    if (slug && officesPhoneMap[slug]) {
      const phone = officesPhoneMap[slug];
      return {
        phoneNumber: phone,
        phoneLink: `tel:+1${phone.replace(/\D/g, '')}`,
        officeSlug: slug,
      };
    }

    return {
      phoneNumber: DEFAULT_PHONE,
      phoneLink: DEFAULT_PHONE_LINK,
      officeSlug: null as string | null,
    };
  }, [pathname]);

  const whatsappMessage = isEs ? WHATSAPP_MESSAGE_ES : WHATSAPP_MESSAGE_EN;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleWhatsAppClick = () => {
    fireConversion('whatsapp_click', 'mobile_sticky_bar', {
      location: 'mobile_sticky_bar',
    });
  };

  const handlePhoneClick = () => {
    const label = officeSlug ? `mobile_sticky_office_${officeSlug}` : 'mobile_sticky_office_global';
    fireConversion('phone_click', label, {
      location: 'mobile_sticky_bar',
      office: officeSlug ?? 'global',
      phone_number: phoneNumber,
    });
  };

  const handleConsultaClick = () => {
    fireConversion('consulta_click', 'mobile_sticky_bar', {
      location: 'mobile_sticky_bar',
    });
  };

  const callAriaLabel = isEs
    ? `Llamar ${officeSlug ? `a oficina ${officeSlug}` : 'al número principal'}`
    : `Call ${officeSlug ? `${officeSlug} office` : 'main number'}`;

  return (
    <nav
      role="navigation"
      aria-label={isEs ? 'Acciones rápidas' : 'Quick actions'}
      className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-[#001540]/95 backdrop-blur-md border-t border-[#B2904D]/30"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex divide-x divide-white/10">
        {/* WhatsApp — primary */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          // Texto en navy (no blanco): sobre #25D366 el blanco da 1.99:1;
          // navy #001540 da 8.96:1 en reposo y 5.73:1 en :active (#1da851).
          className="flex-1 flex items-center justify-center gap-2 min-h-[44px] py-3.5 bg-[#25D366] text-[#001540] font-bold text-sm active:bg-[#1da851] transition-colors"
          aria-label={isEs ? 'Contactar por WhatsApp' : 'Contact via WhatsApp'}
        >
          <MessageCircle className="w-4 h-4" strokeWidth={2.25} />
          <span>WhatsApp</span>
        </a>

        {/* Call — secondary, office-aware */}
        <a
          href={phoneLink}
          onClick={handlePhoneClick}
          className="flex-1 flex items-center justify-center gap-2 min-h-[44px] py-3.5 bg-[#B2904D] text-[#001540] font-bold text-sm active:bg-[#967a3f] transition-colors"
          aria-label={callAriaLabel}
        >
          <Phone className="w-4 h-4" strokeWidth={2.25} />
          <span>{isEs ? 'Llamar' : 'Call'}</span>
        </a>

        {/* Consulta — tertiary, glass */}
        <Link
          href={`/${lang}/consulta`}
          onClick={handleConsultaClick}
          className="flex-1 flex items-center justify-center gap-2 min-h-[44px] py-3.5 bg-white/5 text-white font-semibold text-sm border-l border-[#B2904D]/30 active:bg-white/10 transition-colors"
          aria-label={isEs ? 'Solicitar consulta' : 'Request consultation'}
        >
          <FileText className="w-4 h-4 text-[#B2904D]" strokeWidth={2.25} />
          <span>{isEs ? 'Consulta' : 'Consult'}</span>
        </Link>
      </div>
    </nav>
  );
}
