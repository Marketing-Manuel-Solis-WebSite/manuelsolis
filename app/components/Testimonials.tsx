import { Star, Quote } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from './motion';
import TestimonialsVideo from './TestimonialsVideo';
import type { Language } from '../lib/translations';

const FALLBACK_THUMBNAIL = '/testimonials/Residencia_Octavio.png';

/**
 * Testimonials — server-first (Fase 2.2c). The heading, quote, stars and case
 * card render as server HTML; only the video thumbnail + modal is a client
 * island (<TestimonialsVideo>). Movement: ONE protagonist — the text column
 * cascades via <Stagger>; the video gets a <Reveal scale> accent.
 *
 * NOTE on the "morph" guard: this Home section uses a plain fade/scale modal
 * (AnimatePresence under the global domAnimation), NOT a layoutId shared-layout
 * morph. The layoutId + nested domMax provider is on the /testimonios route
 * (future rollout), not here — so there is no morph to preserve in this section.
 */
export default function Testimonials({ lang }: { lang: Language }) {
  const isEs = lang === 'es';
  const data = {
    name: 'Octavio Varela',
    case: isEs ? 'Residencia Permanente' : 'Permanent Residency',
    comment: isEs
      ? 'Feliz, sentí que todo lo que perdí cuando ingresé al país, se me devolvió y con un regalo'
      : 'Happy, I felt that everything I lost when I entered the country was returned to me, and with a gift.',
    videoId: 'cTJ9M5PT-S4',
  };

  return (
    <section id="testimonios" className="relative min-h-screen flex flex-col justify-center w-full bg-navy-500 overflow-hidden py-32 lg:py-0">
      {/* Static background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-navy-500" />
        <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-blue-600/10 rounded-full blur-[90px] opacity-25" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-[#B2904D]/10 rounded-full blur-[100px] opacity-15" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#000a20] to-transparent z-10 opacity-80 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#000a20] to-transparent z-10 opacity-80 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">

          {/* Video Column (Left) — Reveal scale accent + client island */}
          <div className="lg:col-span-7 relative">
            <div className="absolute -inset-16 border border-white/5 rounded-full z-0 border-dashed opacity-40 hidden lg:block" />
            <Reveal variant="scale" amount={0.3}>
              <TestimonialsVideo lang={lang} videoId={data.videoId} thumbnail={FALLBACK_THUMBNAIL} name={data.name} />
            </Reveal>
          </div>

          {/* Text Column (Right) — protagonist cascade */}
          <Stagger gap={0.15} className="lg:col-span-5 relative space-y-10 pl-0 lg:pl-10">
            <StaggerItem as="div">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[2px] w-12 bg-[#B2904D]"></span>
                <span className="text-[#B2904D] uppercase tracking-[0.25em] text-xs font-bold">
                  {isEs ? 'Testimonios Reales' : 'Real Testimonials'}
                </span>
              </div>
              <h2 className="text-5xl lg:text-7xl font-thin text-white leading-[0.9]">
                {isEs ? 'Voces de' : 'Voices of'} <br />
                <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ffeebb] to-[#B2904D]">
                  {isEs ? 'Esperanza' : 'Hope'}
                </span>
              </h2>
            </StaggerItem>

            <StaggerItem as="div" className="relative pl-8 border-l-2 border-white/10">
              <Quote className="absolute -top-6 -left-6 text-[#B2904D]/20 w-16 h-16 rotate-180" />
              <p className="text-2xl lg:text-3xl font-light text-blue-50 leading-relaxed relative z-10 italic">
                &quot;{data.comment}&quot;
              </p>
            </StaggerItem>

            <StaggerItem as="div" className="flex flex-col gap-6 pt-4">
              <div className="flex gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-[#B2904D] text-[#B2904D]" />
                ))}
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 inline-block w-fit backdrop-blur-sm">
                <p className="text-white text-lg font-medium">{data.case}</p>
                <p className="text-[#B2904D] text-sm uppercase tracking-wide font-bold mt-1">
                  {isEs ? 'Caso Ganado' : 'Case Won'}
                </p>
              </div>
            </StaggerItem>
          </Stagger>

        </div>
      </div>
    </section>
  );
}
