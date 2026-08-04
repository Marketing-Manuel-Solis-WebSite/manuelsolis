"use client";

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { fireConversion } from '../lib/conversion';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  // Se sigue usando useLanguage para el tooltip y manejo de texto general
  const { t, language } = useLanguage();

  // 📞 NÚMERO DE WHATSAPP (+1 713-876-3560)
  const whatsappNumber = '17138763560';
  
  // Mensaje predeterminado con el texto solicitado, codificado para URL
  const rawMessage = 'Website: ¡Hola! Quisiera saber más sobre cómo puedo regularizar mi situación migratoria en EE.UU. ¿Podrían asesorarme?';
  const defaultMessage = encodeURIComponent(rawMessage);
  
  // URL de WhatsApp
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;
  
  // La navegación la hace el <a href>: este handler solo emite tracking y nunca
  // debe llamar a preventDefault ni abrir la ventana por su cuenta.
  const handleClick = () => {
    // Fanout unificado: Vercel + GA4 + Meta + TikTok + Flight Check. GA4 sale
    // por aquí desde que el fanout envía gtag('event', …): un gtag directo
    // adicional contaría whatsapp_click dos veces.
    fireConversion('whatsapp_click', 'whatsapp_floating_button', {
      location: 'floating_button',
    });
  };

  // Mensaje del Tooltip: Usamos el mensaje del cliente si existe, si no, uno por defecto
  const tooltipMessage =
    t.whatsapp?.tooltip || (language === 'es' ? '¡Chatea con nosotros!' : 'Chat with us!');

  const ariaLabel = language === 'es' ? 'Contactar por WhatsApp' : 'Contact us on WhatsApp';

  return (
    <>
      {/* Botón flotante de WhatsApp */}
      {/* Hidden on mobile (replaced by MobileStickyBar), visible on sm+ */}
      <div className="fixed bottom-6 right-[6.5rem] z-50 hidden sm:block">
        
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
            {tooltipMessage}
            <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
          </div>
        )}
        
        {/* Botón principal */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          // Icono en navy (no blanco): sobre el verde de marca #25D366 el blanco
          // da 1.99:1 y navy #001540 da 8.96:1 (WCAG AA), sin tocar el fondo.
          className="group relative flex items-center justify-center w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] text-[#001540] rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl"
          aria-label={ariaLabel}
        >
          {/* Icono de WhatsApp */}
          <MessageCircle className="w-8 h-8 relative z-10" strokeWidth={2} />

          {/* Badge de notificación rojo */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
        </a>
      </div>
      
      {/* Estilos personalizados */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .shadow-3xl {
          box-shadow: 0 20px 50px rgba(37, 211, 102, 0.5);
        }
      `}</style>
    </>
  );
}