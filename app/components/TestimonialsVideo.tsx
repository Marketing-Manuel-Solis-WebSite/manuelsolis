'use client';

import { useState } from 'react';
import { Play, X } from 'lucide-react';
import Image from 'next/image';
import { m, AnimatePresence } from 'framer-motion';
import type { Language } from '../lib/translations';

/**
 * Client island for the Testimonials video. Holds the only stateful behavior
 * (open/close) and the modal. NOTE: this Home section uses a plain fade/scale
 * modal via AnimatePresence (covered by the global `domAnimation` lazy feature)
 * — it does NOT use `layoutId`. The layoutId shared-layout morph + nested
 * `domMax` provider lives on the /testimonios ROUTE (TestimoniosClient.tsx),
 * which is a separate future-rollout target. Transform/opacity only.
 */
export default function TestimonialsVideo({
  lang,
  videoId,
  thumbnail,
  name,
}: {
  lang: Language;
  videoId: string;
  thumbnail: string;
  name: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isEs = lang === 'es';
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1`;

  return (
    <>
      <div className="relative z-10 group">
        <div
          onClick={() => setIsOpen(true)}
          className="relative w-full aspect-video rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl cursor-pointer group-hover:shadow-[#B2904D]/20 group-hover:border-[#B2904D]/40 transition-all duration-500"
        >
          <Image
            src={thumbnail}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-90 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-[#001540]/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <div className="relative w-24 h-24 bg-[#B2904D] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(178,144,77,0.4)] z-10 border-2 border-white/20 backdrop-blur-sm">
                <Play className="w-10 h-10 text-[#001540] ml-1 fill-[#001540]" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-8 z-20">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <p className="text-white/80 text-xs uppercase tracking-widest font-bold">
                {isEs ? 'Historia de Éxito' : 'Success Story'}
              </p>
            </div>
            <p className="text-white text-2xl font-medium tracking-tight">{name}</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000a20]/98 backdrop-blur-md p-4"
            onClick={() => setIsOpen(false)}
          >
            <m.div
              initial={{ scale: 0.8, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 100 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-6xl aspect-video rounded-3xl shadow-2xl overflow-hidden bg-black border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 z-20 group" aria-label={isEs ? 'Cerrar video' : 'Close video'}>
                <div className="p-3 bg-white/10 hover:bg-[#B2904D] backdrop-blur-md rounded-full text-white transition-all duration-300 border border-white/20">
                  <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                </div>
              </button>
              <iframe
                src={embedUrl}
                title="Testimonio de Cliente"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
