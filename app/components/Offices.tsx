import { Reveal } from './motion';
import OfficesExplorer from './OfficesExplorer';
import type { Language } from '../lib/translations';

/**
 * Offices — server-first shell (Fase 2.2c). The section, static background,
 * masks and heading render as server HTML; the interactive office explorer
 * (selector + animated detail panel + live open/closed status) is the client
 * island (<OfficesExplorer>). The office data is bilingual and switched live by
 * the selector, so it necessarily stays in the client island — this section is
 * an interactive explorer, not a static card grid. The previous animated
 * background orbs + resize listener were dropped (static bg = fewer client
 * effects). Fragile office image filenames are untouched (BASELINE §4.4).
 */
export default function Offices({ lang }: { lang: Language }) {
  const isEs = lang === 'es';

  return (
    <section id="oficinas" className="relative py-32 lg:py-40 w-full min-h-screen bg-navy-500 overflow-hidden selection:bg-[#B2904D] selection:text-[#001540]">
      {/* Static background (orbs no longer animate) */}
      <div className="absolute inset-0 z-0 pointer-events-none transform-gpu">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/50 via-[#001540] to-[#000a20]" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen opacity-40" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#B2904D]/5 rounded-full blur-[150px] mix-blend-screen opacity-30" />
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
      </div>

      {/* Step masks */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#000a20] to-transparent z-10 opacity-80 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#000a20] to-transparent z-10 opacity-80 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10">
        <Reveal variant="up" className="text-center mb-20" amount={0.5}>
          <h2 className="text-5xl md:text-7xl font-thin text-white tracking-tight leading-none">
            {isEs ? 'Oficinas ubicadas' : 'Offices'}{' '}
            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B2904D] to-white">
              {isEs ? 'En Estados Unidos' : 'In United States'}
            </span>
          </h2>
        </Reveal>

        <OfficesExplorer lang={lang} />
      </div>
    </section>
  );
}
