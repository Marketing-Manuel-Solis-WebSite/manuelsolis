'use client';

import React, { useState, useEffect } from 'react';
import { Facebook, Share2, Check, MessageCircle } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  uiShareText: string;
}

export default function ShareButtons({ title, uiShareText }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  // Obtener URL solo en el cliente para evitar mismatch de hidratación
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const shareLinks = {
    facebook: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    whatsapp: () => `https://wa.me/?text=${encodeURIComponent(title + ' ' + currentUrl)}`
  };

  const handleShare = (network: keyof typeof shareLinks) => {
    if (!currentUrl) return;
    window.open(shareLinks[network](), '_blank', 'width=600,height=400,noopener,noreferrer');
  };

  const handleCopyLink = async () => {
    if (!currentUrl) return;
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  if (!currentUrl) return null; // Evita renderizado hasta tener la URL

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-bold text-white/60 uppercase tracking-widest mr-2 hidden sm:inline-block">
        {uiShareText}
      </span>
      
      <button 
        onClick={() => handleShare('facebook')} 
        aria-label="Compartir en Facebook"
        className="p-2.5 rounded-full bg-white/5 hover:bg-[#1877F2] hover:text-white text-white/70 transition-all duration-300 border border-white/10 hover:border-transparent"
      >
        <Facebook size={18} />
      </button>
      
      {/*
        Se retiran los botones de X y de LinkedIn, con las dos redes.

        NO se sustituyen por uno de TikTok: TikTok no tiene intent web para
        compartir una URL cualquiera —solo se publica desde la app, y con un
        vídeo—, así que un botón "compartir en TikTok" no llevaría a ninguna
        parte. Quedan Facebook, WhatsApp y copiar enlace, que sí funcionan.

        Matiz que conviene tener presente si algún día se revisa: estos botones
        comparten al perfil DEL LECTOR, no al del despacho, así que seguían
        funcionando aunque la firma no tenga cuenta. Se quitan por coherencia de
        marca, no porque estuvieran rotos — y el de LinkedIn era el que más
        encaja con contenido jurídico. Volver a ponerlo es descomentar.
      */}
      <button 
        onClick={() => handleShare('whatsapp')} 
        aria-label="Compartir en WhatsApp"
        className="p-2.5 rounded-full bg-white/5 hover:bg-[#25D366] hover:text-white text-white/70 transition-all duration-300 border border-white/10 hover:border-transparent"
      >
        <MessageCircle size={18} />
      </button>
      
      <button 
        onClick={handleCopyLink} 
        aria-label="Copiar enlace"
        className={`p-2.5 rounded-full border border-white/10 transition-all duration-300 ${copied ? 'bg-green-500 text-white border-transparent' : 'bg-white/5 hover:bg-[#B2904D] hover:text-[#001540] hover:border-transparent text-white/70'}`}
      >
        {copied ? <Check size={18} /> : <Share2 size={18} />}
      </button>
    </div>
  );
}