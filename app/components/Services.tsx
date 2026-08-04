import { translations, type Language } from '../lib/translations';
import { Reveal, Stagger, StaggerItem } from './motion';

/**
 * Services — server-first (Fase 2.2c). All copy + the category cards render as
 * server HTML (translations resolved on the server). A card only belongs here if
 * its href resolves to an existing /servicios/* page (no 301 hops to the index).
 * Movement: ONE protagonist — the card grid cascades in via <Stagger>; the
 * header gets a single <Reveal>.
 * Cards use the `.card-3d` workhorse (depth lift + glow cross-fade, no pointer
 * tilt) — there is no standout card here, so no <Tilt> (restraint). The previous
 * per-card JS TiltCard + shimmer/box-shadow hover were unified into `.card-3d`.
 */
export default function Services({ lang }: { lang: Language }) {
  const t = translations[lang];
  const isEs = lang === 'es';

  const services = [
    { title: t.services.categories.accidents.title, href: `/${lang}/servicios/accidentes`, items: t.services.categories.accidents.services },
    { title: t.services.categories.immigration.title, href: `/${lang}/servicios/inmigracion`, items: t.services.categories.immigration.services },
    { title: t.services.categories.insurance.title, href: `/${lang}/servicios/seguros`, items: t.services.categories.insurance.services },
    { title: t.services.categories.criminal.title, href: `/${lang}/servicios/ley-criminal`, items: t.services.categories.criminal.services },
    { title: t.services.categories.family.title, href: `/${lang}/servicios/familia`, items: t.services.categories.family.services },
  ];

  return (
    <section id="servicios" className="relative pt-24 pb-32 w-full bg-navy-500 overflow-hidden">
      {/* Background — static */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
        <div className="absolute inset-0 gradient-mesh-dark" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[90px] translate-x-1/3 -translate-y-1/3 opacity-15" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#B2904D]/10 rounded-full blur-[90px] -translate-x-1/3 translate-y-1/3 opacity-15" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        <Reveal variant="up" className="mb-16 text-center" amount={0.4}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/10 mb-6 shadow-[0_0_10px_rgba(178,144,77,0.1)]">
            <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-blue-200/70 uppercase">
              {isEs ? 'EXPERIENCIA COMPROBADA' : 'PROVEN EXPERIENCE'}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-thin text-white mb-6 tracking-tight">
            {t.services.title}{' '}
            <span className="font-normal text-gradient-gold-subtle">{t.services.heading}</span>
          </h2>
          <p className="text-xl text-blue-100/60 font-light max-w-2xl mx-auto leading-relaxed">
            {t.services.description}
          </p>
        </Reveal>

        <Stagger gap={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch" amount={0.1}>
          {services.map((service, index) => (
            <StaggerItem key={index} as="div" className="block h-full">
              <a
                href={service.href}
                aria-label={`${t.services.learnMore} - ${service.title}`}
                className="card-3d block h-full p-5 sm:p-8 rounded-2xl sm:rounded-[2rem] bg-[#000a20]/60 border border-white/10 backdrop-blur-sm group cursor-pointer flex flex-col justify-between overflow-hidden shadow-lg hover:border-[#B2904D]/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />

                <div className="relative z-10">
                  <div className="flex items-center mb-6 pb-4 border-b border-white/10 group-hover:border-[#B2904D]/30 transition-colors duration-500">
                    <div className="w-1 h-8 bg-[#B2904D] rounded-full mr-5 group-hover:h-12 group-hover:shadow-[0_0_10px_rgba(178,144,77,0.6)] transition-all duration-500"></div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white transition-all duration-300 break-words">
                      {service.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {service.items.slice(0, 4).map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start text-blue-100/60 group-hover:text-blue-50 transition-colors duration-300">
                        <div className="w-1 h-1 bg-[#B2904D]/50 rounded-full mt-2.5 mr-3 flex-shrink-0 group-hover:bg-[#B2904D] group-hover:shadow-[0_0_4px_rgba(178,144,77,0.6)] transition-all duration-300"></div>
                        <span className="font-light text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10 mt-6 sm:mt-8 pt-4 border-t border-transparent group-hover:border-white/10 transition-colors duration-500">
                  <span className="text-xs sm:text-sm font-medium text-[#B2904D] tracking-wide flex items-center gap-2 opacity-80 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
                    {t.services.learnMore}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </span>
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>

      </div>
    </section>
  );
}
