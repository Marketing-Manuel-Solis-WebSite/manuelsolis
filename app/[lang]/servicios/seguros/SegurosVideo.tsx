'use client';

import { useRef, useState } from 'react';
import { m } from 'framer-motion';

/** Client island: the team video player (HLS). Preserved 1:1 from SegurosClient. */
export default function SegurosVideo({ videoAlt }: { videoAlt: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl bg-black aspect-video">
      <m.div initial={{ scale: 1 }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} onClick={togglePlayPause} className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer bg-black/10 hover:bg-black/0 transition-colors">
        {!isPlaying && (
          <m.div whileHover={{ scale: 1.1 }} className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/60">
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
          </m.div>
        )}
      </m.div>
      <video ref={videoRef} src="https://vz-9f852395-0ee.b-cdn.net/d7979aa5-40db-49f2-8566-b8a580591661/playlist.m3u8" className="w-full h-full object-cover" aria-label={videoAlt} />
    </div>
  );
}
