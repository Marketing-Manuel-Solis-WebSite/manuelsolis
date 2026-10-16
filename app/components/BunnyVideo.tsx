'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { bunnyEmbedUrl, type BunnyVideoRef } from '../lib/bunnyStream';

/**
 * Vídeo de Bunny Stream con carga diferida: hasta el clic solo hay una portada
 * estática (servida desde public/ por next/image), así que el reproductor de
 * Bunny y su JS no entran en la carga inicial. Mismo patrón que <AboutVideo>.
 *
 * `priority` es para cuando la portada cae en el primer pantallazo (p. ej. el
 * hero de /acceso-clientes): ahí suele ser el elemento LCP y no debe ser lazy.
 */
export default function BunnyVideo({
  video,
  poster,
  title,
  alt,
  playLabel,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 672px',
}: {
  video: BunnyVideoRef;
  /** Ruta en public/ de la portada (16:9). */
  poster: string;
  /** Título accesible del iframe. */
  title: string;
  /** Texto alternativo de la portada. */
  alt: string;
  /** aria-label del botón de reproducir. */
  playLabel: string;
  priority?: boolean;
  sizes?: string;
}) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-black">
      {showVideo ? (
        <iframe
          src={`${bunnyEmbedUrl(video)}?autoplay=true&preload=true&responsive=true`}
          title={title}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setShowVideo(true)}
          className="relative w-full h-full group cursor-pointer"
          aria-label={playLabel}
        >
          <Image
            src={poster}
            alt={alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={sizes}
            priority={priority}
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-[#B2904D]/90 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(178,144,77,0.3)] group-hover:scale-110 group-hover:bg-[#B2904D] transition-all duration-300 border border-white/20">
              <Play className="w-6 h-6 md:w-7 md:h-7 text-[#001540] ml-0.5 fill-[#001540]" />
            </div>
          </div>
        </button>
      )}

      <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
    </div>
  );
}
