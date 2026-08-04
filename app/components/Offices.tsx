import Link from 'next/link';
import { Reveal } from './motion';
import OfficesExplorer from './OfficesExplorer';
import { OFFICES_NAP, OFFICE_NAP_SLUGS } from './officesPhoneMap';
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

        {/*
          Directorio estático: el explorador es una isla cliente y su panel solo
          muestra la oficina activa, así que los enlaces internos hacia las 15
          fichas /oficinas/[slug] se emiten aquí, en el HTML del servidor.
        */}
        <Reveal variant="up" className="mt-20" amount={0.15}>
          <nav aria-label={isEs ? 'Directorio de oficinas' : 'Office directory'}>
            <h3 className="text-sm font-bold text-blue-200/60 uppercase tracking-widest mb-6 text-center">
              {isEs ? 'Todas nuestras oficinas' : 'All our offices'}
            </h3>
            <ul className="flex flex-wrap justify-center gap-2.5">
              {OFFICE_NAP_SLUGS.map((slug) => {
                const nap = OFFICES_NAP[slug];
                return (
                  <li key={slug}>
                    <Link
                      href={`/${lang}/oficinas/${slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-[#B2904D]/10 hover:border-[#B2904D]/30 transition-all duration-300 rounded-full text-xs text-blue-100 font-medium tracking-wide"
                    >
                      {nap.name[lang]}
                      <span className="text-[10px] text-blue-300/60 uppercase tracking-wider">
                        {nap.city}, {nap.state}
                      </span>
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href={`/${lang}/oficinas`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#B2904D]/10 border border-[#B2904D]/40 hover:bg-[#B2904D]/20 transition-all duration-300 rounded-full text-xs text-[#B2904D] font-bold tracking-wide"
                >
                  {isEs ? 'Ver todas las oficinas' : 'View all offices'}
                </Link>
              </li>
            </ul>
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
