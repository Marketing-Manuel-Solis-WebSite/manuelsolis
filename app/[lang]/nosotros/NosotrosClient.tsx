import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ContactForm from '../../components/ContactForm'
import { Reveal } from '../../components/motion'
import Image from 'next/image'
import { Landmark, MapPin, Scale } from 'lucide-react'
import { OFFICES_PLACE_IDS, isVirtualOffice } from '../../lib/officesRegistry'

/**
 * Nosotros — server-first (Fase 2.3). Purely presentational: the only former
 * "interactivity" was an `isMobile` flag (window resize) used to gate the
 * decorative background orbs, which carries no real interactivity, so this is
 * now a pure Server Component. Bilingual `interfaceTexts` resolve to the active
 * `lang` on the server (enfoque b). The animated background orbs + scrolling
 * word are static (matching the site-wide conversion); the hero is static
 * (LCP) and the offices section enters via Reveal. The lazily-loaded
 * client-only form is replaced by the server-first <ContactForm lang>.
 */

// Conteo derivado de officesRegistry, que distingue las direcciones virtuales
// (centros de negocios Regus/IWG) de los locales propios del despacho. La cifra
// debe coincidir con la description de page.tsx.
const PHYSICAL_OFFICE_COUNT = Object.keys(OFFICES_PLACE_IDS)
  .filter((slug) => !isVirtualOffice(slug)).length;

// --- COLEGIOS Y ASOCIACIONES ---
// Los nombres NO se acuñan aquí: son los mismos rótulos que el sitio ya publica
// en el carrusel del Hero (app/components/Hero.tsx), que usa una segunda copia
// de estos mismos emblemas en /public/state-bar/.
// `width`/`height` son las dimensiones intrínsecas reales de cada PNG.
const BAR_ASSOCIATIONS: ReadonlyArray<{ src: string; name: string; width: number; height: number }> = [
  { src: '/associations/american-bar.png', name: 'American Bar Association', width: 137, height: 137 },
  { src: '/associations/illinois.png', name: 'Illinois State Bar Association', width: 148, height: 148 },
  { src: '/associations/chicago.png', name: 'Chicago Bar Association', width: 114, height: 114 },
  { src: '/associations/new-mexico.png', name: 'State Bar of New Mexico', width: 137, height: 137 },
];

// --- TEXTOS UI ---
const interfaceTexts = {
  hero: {
    title: { es: 'NUESTRA HISTORIA', en: 'OUR STORY' },
    subtitle: { es: 'Un legado de más de 35 años defendiendo los derechos de los inmigrantes en Estados Unidos.', en: 'A legacy of over 35 years defending immigrant rights in the United States.' },
  },
  mission: {
    solis: {
        es: '**Law Offices of Manuel Solís** fue fundado por el abogado **Manuel Solís**, un defensor incansable de los derechos de los inmigrantes. Con más de **35 años de experiencia** y un profundo conocimiento de las leyes de inmigración, el despacho se ha consolidado como un referente legal.',
        en: '**Law Offices of Manuel Solís** was founded by attorney **Manuel Solís**, a tireless advocate for immigrant rights. With over **35 years of experience** and a deep knowledge of immigration laws, the firm has established itself as a legal benchmark.'
    },
    commitment: {
        es: 'Nuestro compromiso es brindar **asesoría legal confiable, humana y cercana** a la comunidad, luchando incansablemente por mantener a las familias unidas y proteger sus derechos en este país.',
        en: 'Our commitment is to provide **reliable, humane, and close legal advice** to the community, fighting tirelessly to keep families together and protect their rights in this country.'
    }
  },
  associations: {
    title: { es: 'COLEGIOS Y ASOCIACIONES', en: 'BAR ASSOCIATIONS' },
    description: {
      es: 'Colegios de abogados y asociaciones profesionales del ámbito legal en el que ejerce el despacho.',
      en: 'Bar associations and professional legal organizations in the field where the firm practices.'
    }
  },
  usaOffices: {
    title: { es: 'NUESTRAS OFICINAS', en: 'OUR OFFICES' },
    locations: 'Houston, Dallas, Harlingen, El Paso (**Texas**), Chicago (**Illinois**), Los Ángeles (**California**), Denver (**Colorado**), Memphis (**Tennessee**).',
    description: {
        es: `Contamos con **${PHYSICAL_OFFICE_COUNT} oficinas físicas** estratégicamente ubicadas en estados clave de la unión americana para ofrecer una representación accesible y directa a nuestros clientes.`,
        en: `We have **${PHYSICAL_OFFICE_COUNT} physical offices** strategically located in key states across the American union to offer accessible and direct representation to our clients.`
    },
    loadMap: { es: 'Explorar Mapa Interactivo', en: 'Explore Interactive Map' }
  }
};

// --- UTILIDADES ---
const parseContent = (text: string) => {
  let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  parsed = parsed.replace(/\n/g, '<br />');
  return parsed;
};

// --- COMPONENTE TÍTULO DE SECCIÓN ---
const SectionTitle = ({ title }: { title: string }) => (
  <div className="mb-8 flex items-center gap-4">
    <div className="h-px bg-gradient-to-r from-transparent via-[#B2904D] to-transparent w-full opacity-50 hidden md:block"></div>
    <h2 className="text-2xl md:text-3xl font-light text-white whitespace-nowrap drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
      {title}
    </h2>
    <div className="h-px bg-gradient-to-r from-transparent via-[#B2904D] to-transparent w-full opacity-50 hidden md:block"></div>
  </div>
);

// --- PÁGINA NOSOTROS ---
export default function NosotrosClient({ lang }: { lang: 'es' | 'en' }) {
  const t = (key: string): string => {
    const parts = key.split('.');
    let current: any = interfaceTexts;
    for (const part of parts) {
      if (current && current[part]) current = current[part];
      else return '';
    }
    if (typeof current === 'object' && (current.es || current.en)) return current[lang] || current.es || '';
    if (typeof current === 'string') return current;
    return '';
  };

  const parseText = (key: string) => parseContent(t(key));

  const getLocations = (key: string) => {
      const text = t(key);
      if (!text) return [];
      const locations = text.split(', ');
      return locations.map(location => parseContent(location.trim()));
  }

  return (
    <div className={`relative min-h-screen w-full bg-[#001540] text-white overflow-x-hidden`}>
      <Header />

      <main id="main-content" tabIndex={-1}>
        {/* =========================================================================
            FONDO (orbes estáticos)
        ========================================================================= */}
        <div className="fixed inset-0 z-0 w-full h-full bg-[#001540] pointer-events-none transform-gpu">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />

            <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>

            {/* Orbes de luz (estáticos) - solo Desktop */}
            <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[120px] hidden lg:block opacity-40" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-sky-800/10 rounded-full blur-[150px] hidden lg:block opacity-40" />

            {/* Texto de Fondo Sutil (estático) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none overflow-hidden">
              <span className="text-[50vh] lg:text-[80vh] font-black italic text-white tracking-tighter whitespace-nowrap transform -skew-x-12 lg:skew-x-0">
                MANUEL SOLIS
              </span>
            </div>
        </div>

        {/* =========================================================================
            CONTENIDO
        ========================================================================= */}

        {/* --- HERO SECTION (static — LCP) --- */}
        <section className="relative pt-54 pb-16 z-10 px-6 lg:px-12">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-12 gap-12 items-center">

              {/* IZQUIERDA: IMAGEN LOGO INFORMACION */}
              <div className="lg:col-span-5 relative flex items-center justify-center h-[300px] lg:h-[400px]">
                  <div className="absolute inset-0 bg-[#B2904D]/10 blur-[80px] rounded-full z-0" />

                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                      <Image
                         src="/LogoInformacion.png"
                         alt="Law Offices of Manuel Solis"
                         width={600}
                         height={600}
                         // Optimización: sizes para responsive
                         sizes="(max-width: 768px) 100vw, 50vw"
                         className="object-contain drop-shadow-[0_0_30px_rgba(178,144,77,0.3)] hover:scale-105 transition-transform duration-700"
                         priority
                      />
                  </div>
              </div>

              {/* DERECHA: HISTORIA Y MISIÓN */}
              <div className="lg:col-span-7 space-y-8 pl-0 lg:pl-10 relative z-20">

                <div className="relative">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-thin text-white tracking-tight leading-none">
                    <span className="block text-white/90 font-extralight mb-2">
                      {t('hero.title').split(' ')[0]}
                    </span>{' '}
                    <span className="block font-medium text-[#B2904D] drop-shadow-2xl">
                      {t('hero.title').split(' ').slice(1).join(' ')}
                    </span>
                  </h1>
                </div>

                <div className="relative pl-6 border-l-2 border-[#B2904D]/50">
                  <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">
                    {t('hero.subtitle')}
                  </p>
                </div>

                <div className="text-base md:text-lg text-blue-100/70 font-light leading-relaxed space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl">
                    <div dangerouslySetInnerHTML={{ __html: parseText('mission.solis') }} />
                    <div dangerouslySetInnerHTML={{ __html: parseText('mission.commitment') }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- COLEGIOS Y ASOCIACIONES --- */}
        <section className="container mx-auto px-4 py-12 relative z-10 max-w-7xl">

          <SectionTitle title={t('associations.title')} />

          <Reveal variant="up" className="p-8 border border-white/10 rounded-2xl backdrop-blur-md bg-[#000814]/60 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">

              <div className="lg:w-1/3">
                <Scale size={40} className="text-[#B2904D] mb-4 drop-shadow-[0_0_15px_rgba(178,144,77,0.4)]" />
                <p className="text-base text-blue-100/80 font-light leading-relaxed">
                  {t('associations.description')}
                </p>
              </div>

              <ul className="lg:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-4 list-none">
                {BAR_ASSOCIATIONS.map((assoc) => (
                  // El fondo blanco del contenedor es obligatorio: los PNG son de
                  // tinta oscura sobre transparencia y serían ilegibles sobre el
                  // azul marino de la página.
                  <li
                    key={assoc.src}
                    className="flex h-24 items-center justify-center rounded-xl bg-white p-4 shadow-lg ring-1 ring-black/5"
                  >
                    <Image
                      src={assoc.src}
                      alt={lang === 'es' ? `Logotipo de ${assoc.name}` : `${assoc.name} logo`}
                      width={assoc.width}
                      height={assoc.height}
                      className="max-h-16 w-auto object-contain"
                      loading="lazy"
                    />
                  </li>
                ))}
              </ul>

            </div>
          </Reveal>

        </section>

        {/* --- SECCIÓN DE MAPA Y UBICACIONES (INTERACTIVO) --- */}
        <section className="container mx-auto px-4 py-12 relative z-10 max-w-7xl">

          <SectionTitle title={t('usaOffices.title')} />

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">

              {/* LISTA DE OFICINAS */}
              <Reveal variant="right" className="lg:col-span-4 p-8 border border-white/10 rounded-2xl backdrop-blur-md bg-[#000814]/60 shadow-2xl flex flex-col justify-between">
                 <div>
                   <Landmark size={40} className="text-[#B2904D] mb-4 drop-shadow-[0_0_15px_rgba(178,144,77,0.4)]" />
                   <p className="text-base text-blue-100/80 font-light leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: parseContent(t('usaOffices.description')) }} />
                 </div>

                 <div>
                     <h4 className="text-sm font-bold text-[#B2904D] uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                         {lang === 'es' ? 'Ubicaciones' : 'Locations'}
                     </h4>
                     <div className="space-y-3">
                         {getLocations('usaOffices.locations').map((location, index) => (
                             <div key={index} className="flex items-start gap-3 group">
                                 <MapPin size={18} className="text-white/40 mt-1 group-hover:text-[#B2904D] transition-colors" />
                                 <div className="text-sm font-light text-white/80 group-hover:text-white transition-colors cursor-default" dangerouslySetInnerHTML={{ __html: location }} />
                             </div>
                         ))}
                     </div>
                 </div>
              </Reveal>

              {/* MAPA DE GOOGLE OPTIMIZADO (SIEMPRE VISIBLE) */}
              <Reveal variant="up" className="lg:col-span-8 min-h-[500px] bg-[#000510] rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden relative">
                  {/* IFRAME SIEMPRE CARGADO */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d14500000!2d-100!3d38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sLaw%20Offices%20of%20Manuel%20Solis!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                    title="Google Maps Locations"
                  />

                 {/* Etiqueta flotante */}
                 <div className="absolute top-4 right-4 bg-black/70 backdrop-blur text-white px-4 py-2 rounded-lg text-xs font-bold border border-white/10 pointer-events-none z-20">
                     INTERACTIVE MAP
                 </div>
              </Reveal>
          </div>

        </section>

        {/* --- FORMULARIO DE CONTACTO --- */}
        <div className="relative z-20 mt-12">
          <ContactForm lang={lang} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
