import { Reveal, Stagger, StaggerItem } from './motion';
import AboutVideo from './AboutVideo';
import type { Language } from '../lib/translations';

/**
 * About — server-first (Fase 2.2b pilot). All copy (incl. the bilingual case
 * study) renders as server HTML; only the video play/iframe is a client island
 * (<AboutVideo>). Movement budget: ONE protagonist — the text column cascades in
 * via <Stagger>; the video gets a single <Reveal scale> accent. Stat cards use
 * the `.card-3d` workhorse (depth on hover, no pointer tilt — restraint). The
 * gold-glow hover that animated box-shadow was replaced by .card-3d's opacity
 * cross-fade (transform/opacity-only rule).
 */
export default function About({ lang }: { lang: Language }) {
  const isEs = lang === 'es';

  return (
    <section className="relative py-32 lg:py-44 w-full bg-navy-500 overflow-hidden">
      {/* Background — static (decorative depth via layers, not motion) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-navy-500" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#002868]/30 via-transparent to-[#000a20]/80" />
        <div className="absolute inset-0 gradient-mesh-dark" />
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[100px] -translate-x-1/3 -translate-y-1/3 opacity-60" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#B2904D]/10 rounded-full blur-[90px] translate-x-1/3 translate-y-1/3 opacity-60" />
      </div>

      {/* Static masks */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#000a20] to-transparent z-10 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000a20] to-transparent z-10 opacity-50 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Section title (full-width). Styled gold span → Reveal, not TextReveal. */}
        <Reveal variant="up" className="mb-16 text-center" amount={0.4}>
          <h2 className="text-4xl md:text-6xl font-thin text-white mb-6 tracking-tight">
            {isEs ? 'Caso Real de ' : 'Real Case of '}
            <span className="font-normal text-gradient-gold-subtle">
              {isEs ? 'Reunificación Familiar' : 'Family Reunification'}
            </span>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: text — the protagonist cascade */}
          <Stagger gap={0.12} className="lg:col-span-6 space-y-10">

            <StaggerItem as="div" className="space-y-6 text-lg text-blue-100/80 leading-relaxed font-light">
              <p className="border-l-[3px] border-[#B2904D]/50 pl-6 py-1">
                {isEs ? (
                  <><strong className="text-white font-medium">Juana Cervantes</strong> migró a Estados Unidos siendo apenas una niña, dejando en México a su madre, quien entonces tenía <strong className="text-white font-medium">53 años</strong>. Hoy, después de dar el primer paso hacia un estatus legal en Estados Unidos, logró regresar a México tras <strong className="text-white font-medium">más de 30 años</strong> lejos de su tierra, sus raíces y su familia.<br /><br />De la mano del <strong className="text-white font-medium">abogado Manuel Solís</strong>, quien la acompañó en cada etapa del proceso, Juana pudo reencontrarse con su historia, sus tradiciones y los momentos que creyó perdidos, viviendo además una de las celebraciones más importantes para los mexicanos: la <strong className="text-white font-medium">Semana Santa</strong>.<br /><br />Acompaña a Juana en este emotivo viaje de regreso a casa, en un nuevo capítulo de <strong className="text-white font-medium">Uniendo Familias con Manuel Solís</strong>.</>
                ) : (
                  <><strong className="text-white font-medium">Juana Cervantes</strong> migrated to the United States as just a little girl, leaving behind in Mexico her mother, who was then <strong className="text-white font-medium">53 years old</strong>. Today, after taking the first step toward legal status in the United States, she was able to return to Mexico after <strong className="text-white font-medium">more than 30 years</strong> away from her land, her roots, and her family.<br /><br />Guided by <strong className="text-white font-medium">Attorney Manuel Solís</strong>, who supported her at every stage of the process, Juana was able to reconnect with her story, her traditions, and the moments she thought were lost — experiencing one of the most important celebrations for Mexicans: <strong className="text-white font-medium">Holy Week</strong>.<br /><br />Join Juana on this moving journey back home, in a new chapter of <strong className="text-white font-medium">Uniting Families with Manuel Solís</strong>.</>
                )}
              </p>
            </StaggerItem>

            {/* Stat cards — .card-3d workhorse (no pointer tilt) */}
            <StaggerItem as="div" className="grid grid-cols-2 gap-6 pl-2 pt-4">
              <div className="card-3d p-5 rounded-xl glass group/stat">
                <h3 className="text-4xl font-light text-white flex items-baseline">
                  200 <span className="text-[#B2904D] text-2xl ml-0.5 group-hover/stat:rotate-12 transition-transform">+</span>
                </h3>
                <p className="text-[0.65rem] md:text-xs text-blue-200/70 uppercase tracking-[0.2em] mt-2 font-medium">
                  {isEs ? 'Profesionales' : 'Professionals'}
                </p>
              </div>
              <div className="card-3d p-5 rounded-xl glass group/stat">
                <h3 className="text-4xl font-light text-white flex items-baseline">
                  35 <span className="text-sky-400 text-2xl ml-0.5 group-hover/stat:rotate-12 transition-transform">+</span>
                </h3>
                <p className="text-[0.65rem] md:text-xs text-blue-200/70 uppercase tracking-[0.2em] mt-2 font-medium">
                  {isEs ? 'Años Experiencia' : 'Years Experience'}
                </p>
              </div>
            </StaggerItem>

            {/* CTA — server-rendered link (secondary action, not magnetic) */}
            <StaggerItem as="div" className="pt-6 pl-2">
              <a
                href={`/${lang}/testimonios`}
                className="group relative inline-flex items-center justify-center px-10 py-4
                           bg-white/5 text-white font-medium tracking-wide overflow-hidden
                           rounded-full shadow-lg hover:shadow-[#B2904D]/20 transition-all duration-500
                           backdrop-blur-md border border-[#B2904D]/30
                           hover:bg-[#B2904D]/10 hover:border-[#B2904D]/60"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-in-out" />
                <span className="relative flex items-center gap-3">
                  {isEs ? 'Conozca Más' : 'Learn More'}
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-[#B2904D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </span>
              </a>
            </StaggerItem>
          </Stagger>

          {/* Right Column: video — single Reveal scale accent */}
          <div className="lg:col-span-6 relative w-full mt-8 lg:mt-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-blue-600/20 blur-[80px] rounded-full -z-10" />
            <div className="absolute top-3 -right-3 w-full h-full border border-[#B2904D]/20 rounded-2xl z-0 hidden lg:block" />
            <Reveal variant="scale" amount={0.3}>
              <AboutVideo lang={lang} />
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
