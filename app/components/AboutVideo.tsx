'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import type { Language } from '../lib/translations';

/**
 * Client island for the About case-study video. The ONLY stateful piece of the
 * About section — everything else renders on the server. Keeps the YouTube
 * iframe out of the initial HTML until the user clicks play (deferred load).
 */
export default function AboutVideo({ lang }: { lang: Language }) {
  const [showVideo, setShowVideo] = useState(false);
  const isEs = lang === 'es';

  return (
    <div className="relative z-10 w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-black">
      {showVideo ? (
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/AWgRoJitmJo?rel=0&controls=1&autoplay=1"
          title="Uniendo Familias con Manuel Solís | EP. 4 — La decisión que lo cambió todo | Habeas Corpus."
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <button
          onClick={() => setShowVideo(true)}
          className="relative w-full h-full group cursor-pointer"
          aria-label={isEs ? 'Reproducir video' : 'Play video'}
        >
          <Image
            src="https://img.youtube.com/vi/AWgRoJitmJo/maxresdefault.jpg"
            alt="Uniendo Familias con Manuel Solís | EP. 4 — La decisión que lo cambió todo | Habeas Corpus."
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 bg-[#B2904D]/90 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(178,144,77,0.3)] group-hover:scale-110 group-hover:bg-[#B2904D] transition-all duration-300 border border-white/20">
              <Play className="w-6 h-6 text-[#001540] ml-0.5 fill-[#001540]" />
            </div>
          </div>
        </button>
      )}

      <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
    </div>
  );
}
