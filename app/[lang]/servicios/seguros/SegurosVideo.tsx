'use client';

import { useEffect, useRef, useState } from 'react';
import { m } from 'framer-motion';

const HLS_SRC = 'https://vz-9f852395-0ee.b-cdn.net/d7979aa5-40db-49f2-8566-b8a580591661/playlist.m3u8';

/**
 * Client island: the team video player. The Bunny source is an HLS playlist and
 * the project ships no hls.js, so the player is only mounted where the browser
 * plays HLS natively (Safari/iOS); anywhere else the box says why instead of
 * offering a control that cannot work.
 */
export default function SegurosVideo({ videoAlt, unsupportedNotice }: { videoAlt: string; unsupportedNotice: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hlsSupport, setHlsSupport] = useState<'unknown' | 'native' | 'none'>('unknown');

  useEffect(() => {
    const probe = document.createElement('video');
    const canPlay =
      probe.canPlayType('application/vnd.apple.mpegurl') || probe.canPlayType('application/x-mpegURL');
    setHlsSupport(canPlay ? 'native' : 'none');
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      return;
    }
    video
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl bg-black aspect-video">
      {hlsSupport === 'none' ? (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <p className="text-center text-sm text-white/70 leading-relaxed max-w-xs">{unsupportedNotice}</p>
        </div>
      ) : (
        <>
          {hlsSupport === 'native' && (
            <m.div initial={{ scale: 1 }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} onClick={togglePlayPause} className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer bg-black/10 hover:bg-black/0 transition-colors">
              {!isPlaying && (
                <m.div whileHover={{ scale: 1.1 }} className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/60">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                </m.div>
              )}
            </m.div>
          )}
          <video ref={videoRef} preload="none" src={HLS_SRC} className="w-full h-full object-cover" aria-label={videoAlt} />
        </>
      )}
    </div>
  );
}
