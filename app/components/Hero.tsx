import Image from 'next/image';
import { Reveal, Stagger, StaggerItem, Parallax } from './motion';
import HeroPopup from './HeroPopup';
import type { Language } from '../lib/translations';

const associations = [
  { name: 'Chicago Bar Association', logo: '/state-bar/Chicago-bar.png' },
  { name: 'Illinois State Bar Association', logo: '/state-bar/illinois-bar.png' },
  { name: 'State Bar of New Mexico', logo: '/state-bar/nm-state.png' },
  { name: 'American Bar Association', logo: '/state-bar/aba-state.png' },
  { name: 'Rama Judicial de Puerto Rico', logo: '/state-bar/pr-state.png' },
  { name: 'CD State Bar', logo: '/state-bar/cd-state.png' },
];

function getLogoSize(logoName: string) {
  if (logoName.includes('aba-state')) return { height: 80, width: 180, containerHeight: 'h-20' };
  if (logoName.includes('illinois-bar') || logoName.includes('nm-state')) return { height: 140, width: 280, containerHeight: 'h-32' };
  if (logoName.includes('Chicago-bar')) return { height: 130, width: 250, containerHeight: 'h-30' };
  return { height: 120, width: 240, containerHeight: 'h-28' };
}

function getExtraMargin(logoName: string) {
  if (logoName.includes('illinois-bar')) return 'ml-16';
  if (logoName.includes('nm-state')) return 'ml-36';
  if (logoName.includes('aba-state')) return 'ml-20';
  if (logoName.includes('pr-state')) return 'ml-20';
  return '';
}

const MARQUEE_CSS = `
  .mask-linear-fade { mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); }
  @keyframes marquee-scroll { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
  .hero-marquee { animation: marquee-scroll 35s linear infinite; }
  @media (max-width: 1024px) { .hero-marquee { animation-duration: 20s; } }
  @media (prefers-reduced-motion: reduce) { .hero-marquee { animation: none; } }
`;

/**
 * Home hero — server-first. LCP is sacred: the portrait (priority) and the
 * "50,000" showpiece render immediately as server HTML and are NEVER wrapped
 * in opacity-gated reveals nor wait for the (lazy) motion engine. Decorative
 * orbs use Parallax; supporting copy cascades in via Stagger (adornment). The
 * detained-relative popup is the only client island. Same content/IA as before.
 */
export default function Hero({ lang }: { lang: Language }) {
  const isEs = lang === 'es';
  const marqueeItems = [...associations, ...associations, ...associations];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center bg-navy-500 overflow-hidden pt-24 lg:pt-44 pb-48 lg:pb-72">
      {/* Background — gradient static; orbs are decorative parallax layers (never LCP) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-300 via-navy-500 to-navy-800" />
        <Parallax speed={0.25} className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-blue-600/20 rounded-full blur-[60px] opacity-40" />
        <Parallax speed={0.15} className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-sky-800/20 rounded-full blur-[60px] opacity-30" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-12 relative z-10 flex-grow flex flex-col justify-center">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">

          {/* Image Section — LCP, paints immediately (no gating, final position via CSS) */}
          <div className="lg:col-span-5 w-full relative h-[350px] sm:h-[450px] lg:h-[750px] flex items-end justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent blur-2xl rounded-full z-0 opacity-80" />

            <div className="relative z-10 w-full h-full origin-bottom flex justify-center -translate-y-5 lg:-translate-y-20">
              <div className="w-full h-full scale-110 sm:scale-125 lg:scale-[1.65] lg:-translate-x-24 lg:origin-bottom transform-gpu">
                <div className="relative w-full h-full">
                  <Image
                    src="/manuelsolisl.png"
                    alt="Abogado Manuel Solis"
                    fill
                    className="object-contain object-bottom drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            {/* Experience Badge */}
            <Reveal
              variant="right"
              delay={0.4}
              className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0 z-40 p-4 sm:p-6 border border-white/10 rounded-xl backdrop-blur-md bg-white/10 shadow-xl text-center lg:text-right min-w-[160px] sm:min-w-[180px]"
            >
              <div className="group">
                <div className="flex items-baseline text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-sky-200/50 justify-center lg:justify-end">
                  <span className="text-4xl sm:text-5xl font-extralight tracking-tighter">35</span>
                  <span className="text-2xl sm:text-3xl font-thin text-gold-500 ml-2 group-hover:rotate-12 transition-transform">+</span>
                </div>
                <p className="text-xs text-white/60 uppercase tracking-[0.2em] mt-2 font-medium">
                  {isEs ? 'Años de Experiencia' : 'Years Experience'}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Text Content Section */}
          <div className="lg:col-span-7 w-full space-y-6 lg:space-y-10 pl-0 lg:pl-16 relative z-20">
            <div className="absolute left-0 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-sky-500/30 to-transparent hidden lg:block" />

            <div className="relative overflow-visible">
              <div className="absolute -inset-10 lg:-inset-20 bg-gradient-radial from-gold-500/20 via-sky-500/10 to-transparent blur-[40px] lg:blur-[60px] -z-10 opacity-60" />

              <Stagger gap={0.08} className="relative flex flex-col items-center lg:items-start overflow-visible">

                {/* "More than" */}
                <StaggerItem variant="up" className="mb-2 lg:mb-3">
                  <span className="text-xl sm:text-2xl lg:text-4xl font-light text-white/60 uppercase tracking-[0.2em] sm:tracking-[0.3em] relative">
                    {isEs ? 'Más de' : 'More than'}
                  </span>
                </StaggerItem>

                {/* 50,000 — LCP showpiece: static, paints immediately (NOT staggered/gated) */}
                <div className="relative w-full overflow-visible px-2 sm:px-4 lg:px-4 lg:pr-16 py-2 sm:py-4">
                  <div className="absolute inset-0 text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[10rem] font-black tracking-tighter text-gold-500/15 blur-xl flex items-center justify-center lg:justify-start">
                    50,000
                  </div>
                  <div
                    className="relative text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[10rem] font-black tracking-tighter leading-none flex items-center justify-center lg:justify-start w-full"
                    style={{
                      background: 'linear-gradient(135deg, #B2904D 0%, #D4A853 25%, #B2904D 50%, #8B6914 75%, #B2904D 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 15px rgba(178,144,77,0.4))',
                    }}
                  >
                    50,000
                  </div>
                </div>

                {/* "Cases Won" */}
                <StaggerItem variant="up" className="mt-2 sm:mt-4 lg:mt-6 relative">
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white uppercase tracking-[0.3em] sm:tracking-[0.4em] font-light">
                    {isEs ? 'Casos Ganados' : 'Cases Won'}
                  </p>
                </StaggerItem>
              </Stagger>
            </div>

            {/* Divider */}
            <Reveal variant="fade" delay={0.2} className="w-full max-w-md mx-auto lg:mx-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            {/* Practice Areas */}
            <Stagger gap={0.1} className="space-y-6 sm:space-y-8">
              <StaggerItem as="div">
                <h1 className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 md:gap-6">
                  <span className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white/90">
                    {isEs ? 'Inmigración' : 'Immigration'}
                  </span>
                  <span className="text-3xl sm:text-4xl md:text-5xl font-thin text-gold-500"> & </span>
                  <span className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white/90">
                    {isEs ? 'Accidentes' : 'Accidents'}
                  </span>
                </h1>
              </StaggerItem>

              <StaggerItem variant="fade" className="relative px-2 sm:px-0">
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/70 font-light italic text-center lg:text-left tracking-wide relative z-10">
                  {isEs ? 'Inspirados por la gracia de Dios' : 'Inspired by the grace of God'}
                </p>
              </StaggerItem>
            </Stagger>
          </div>
        </div>
      </div>

      {/* Bar Associations Carousel — CSS animation */}
      <div className="absolute bottom-0 left-0 right-0 z-30 w-full border-t border-white/5 bg-transparent pt-8 sm:pt-12 pb-16 sm:pb-24">
        <div className="relative w-full overflow-hidden mask-linear-fade">
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-navy-500 to-transparent z-20" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-navy-500 to-transparent z-20" />

          <div className="hero-marquee flex items-center gap-40 sm:gap-80 whitespace-nowrap">
            {marqueeItems.map((assoc, idx) => {
              const size = getLogoSize(assoc.logo);
              const extraMargin = getExtraMargin(assoc.logo);
              return (
                <div key={idx} className={`flex items-center justify-center opacity-50 ${extraMargin}`}>
                  <div className={`relative ${size.containerHeight} w-auto flex-shrink-0 filter grayscale brightness-[1.5] contrast-[1.2]`}>
                    <Image src={assoc.logo} alt={assoc.name} height={size.height} width={size.width} className="h-full w-auto object-contain drop-shadow-sm" loading="lazy" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <HeroPopup lang={lang} />

      <style dangerouslySetInnerHTML={{ __html: MARQUEE_CSS }} />
    </section>
  );
}
