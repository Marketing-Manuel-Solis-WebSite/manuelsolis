import React from 'react';

/* Orbes decorativos con @keyframes CSS (solo transform/opacity, corren en el
   compositor) en lugar de un loop infinito de framer-motion: sin este cambio
   las ~70 URLs del blog mantienen rAF ocupado en el hilo principal durante
   toda la visita. La opacidad de reposo vive en la clase porque los orbes no
   llevan utilidad de opacidad: con `animation: none` (reduced-motion) el
   elemento volveria a opacity 1 y el orbe se veria mucho mas brillante. */
const ORBS_CSS = `
  @keyframes blog-orb-gold {
    0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.15; }
    50% { transform: scale(1.2) rotate(45deg); opacity: 0.3; }
  }
  @keyframes blog-orb-blue {
    0%, 100% { transform: translateX(-20px) scale(1); opacity: 0.1; }
    50% { transform: translateX(20px) scale(1.3); opacity: 0.25; }
  }
  .blog-orb-gold { opacity: 0.15; animation: blog-orb-gold 15s ease-in-out infinite both; }
  .blog-orb-blue { opacity: 0.1; animation: blog-orb-blue 20s ease-in-out 2s infinite both; }
  @media (prefers-reduced-motion: reduce) {
    .blog-orb-gold, .blog-orb-blue { animation: none; }
  }
`;

export default function BlogBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Gradiente Base Profundo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />

      {/* Orbe Dorado (Derecha Superior) */}
      <div className="blog-orb-gold absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-[#B2904D]/10 rounded-full blur-[120px]" />

      {/* Orbe Azul (Izquierda Inferior) */}
      <div className="blog-orb-blue absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[100px]" />

      {/* Ruido de Textura (Film Grain) */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>

      <style dangerouslySetInnerHTML={{ __html: ORBS_CSS }} />
    </div>
  );
}
