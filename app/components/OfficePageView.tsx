import React from 'react';
import { MapPin, Clock, User, Quote, Sparkles, Scale, Car } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import Header from './Header';
import Footer from './Footer';
import FaqSection from './FaqSection';
import type { FaqPair } from '../lib/faqSchema';
import ContactForm from './ContactForm';
import TrackedPhoneLink from './TrackedPhoneLink';
import { Reveal, Stagger, StaggerItem } from './motion';

/**
 * Office detail view — server-first (Fase 2.3 oficinas). ONE shared component
 * renders all 15 `/oficinas/[ciudad]` pages. Each office's bilingual data lives
 * in its own server module (OfficeClient.tsx) and is passed in; it is resolved
 * to the active `lang` here on the server, so the inactive locale never reaches
 * the client bundle (enfoque b). Movement lives in Reveal/Stagger islands; the
 * attorney/manager grids use `.card-3d` (workhorse). LCP sacred: the hero text
 * + priority image render statically (no opacity gating). The phone conversion
 * event is preserved via the small <TrackedPhoneLink> island. Background orbs
 * are static (desktop only), matching the Home conversion.
 *
 * The per-route page.tsx (generateMetadata + Place/LocalBusiness + Breadcrumb
 * JSON-LD) is untouched — only the `lang` prop is threaded into <OfficeClient>.
 */
type Lang = 'es' | 'en';
type BiText = { es: string; en: string };

export interface OfficeAttorney {
  name: string;
  image: string;
  role: BiText;
  quote: BiText;
}

export interface OfficeManager {
  name: string;
  role: BiText;
}

export interface OfficeData {
  id: string;
  city: string;
  state: string;
  badge: string;
  title: BiText;
  quote: BiText;
  description: BiText;
  address: string;
  phone: string;
  email: string;
  hours: BiText;
  mapLink: string;
  image: string;
  managers: OfficeManager[];
  attorneys: OfficeAttorney[];
  services: BiText[];
  /** Solo oficinas virtuales (Regus/IWG): muestra la sección "también atendemos accidentes". */
  accidentsSection?: boolean;
  /** Slug de la página de accidentes por oficina (/servicios/accidentes/oficinas/<slug>). */
  accidentsSlug?: string;
}

export interface OfficeUIText {
  address: BiText;
  phone: BiText;
  hours: BiText;
  viewMap: BiText;
  team: BiText;
  managers: BiText;
  services: BiText;
}

const SERVICE_LINKS: Record<string, string> = {
  'Inmigración': '/servicios/inmigracion',
  'Immigration': '/servicios/inmigracion',
  'Accidentes': '/servicios/accidentes',
  'Accidents': '/servicios/accidentes',
  'Seguros': '/servicios/seguros',
  'Insurance': '/servicios/seguros',
  'Defensa Criminal': '/servicios/ley-criminal',
  'Criminal Defense': '/servicios/ley-criminal',
  'Visa E-2': '/servicios/visa-e2',
  'E-2 Visa': '/servicios/visa-e2',
  'Familia': '/servicios/familia',
  'Family': '/servicios/familia',
};

export default function OfficePageView({
  data,
  ui,
  lang,
  faqs = [],
}: {
  data: OfficeData;
  ui: OfficeUIText;
  lang: Lang;
  /**
   * Preguntas propias de esta sede. Llegan como prop y no se calculan aquí
   * porque `data.id` no es el slug del registro NAP (`houston-kirby` frente a
   * `kirby`), así que derivarlas de él daría la oficina equivocada en siete de
   * las quince. El page.tsx sí tiene el slug correcto.
   */
  faqs?: FaqPair[];
}) {
  const t = (obj: BiText) => obj[lang] || obj.es;
  // 14 offices ship a real share.google mapLink; northchase only has a
  // placeholder, so it falls back to a Google Maps address search (1:1 with
  // the original per-page behavior).
  const mapHref =
    data.mapLink && !data.mapLink.includes('your_map_link_here')
      ? data.mapLink
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`;

  return (
    <>
      <Header />

      <main id="main-content" tabIndex={-1} className="relative w-full min-h-screen bg-[#001540] overflow-hidden">

        {/* --- BACKGROUND FX (static; orbs desktop-only) --- */}
        <div className="fixed inset-0 z-0 pointer-events-none transform-gpu">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
          <div className="hidden lg:block absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-blue-600/20 rounded-full blur-[100px] opacity-30" />
          <div className="hidden lg:block absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-sky-800/20 rounded-full blur-[120px] opacity-25" />
          <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }} />
        </div>

        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="relative z-10 pt-[160px] pb-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

            {/* --- HERO SECTION (static — LCP) --- */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 md:mb-24">

              {/* Texto Hero */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B2904D]/10 border border-[#B2904D]/30 mb-6">
                  <Sparkles className="text-[#B2904D]" size={14} />
                  <span className="text-[#B2904D] text-xs font-bold tracking-[0.2em] uppercase">{data.badge}</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-thin text-white mb-6 leading-tight">
                  {t(data.title)}
                </h1>

                <div className="w-24 h-1 bg-gradient-to-r from-[#B2904D] to-transparent mb-8" />

                <p className="text-[#B2904D] font-light italic text-lg md:text-xl border-l-2 border-[#B2904D] pl-6 mb-8">
                  "{t(data.quote)}"
                </p>

                <p className="text-white/70 text-base md:text-lg leading-relaxed font-light max-w-xl">
                  {t(data.description)}
                </p>
              </div>

              {/* IMAGEN DE OFICINA (priority, static) */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(56,189,248,0.15)] group bg-black">
                <Image
                  src={data.image}
                  alt={t(data.title)}
                  fill
                  className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-40" />
              </div>
            </div>

            {/* --- INFO GRID --- */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-24">

              {/* Detalles de Contacto */}
              <div className="lg:col-span-5 space-y-8">
                <Reveal variant="up" className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
                  <h2 className="text-2xl font-light text-white mb-8 flex items-center gap-3">
                    <MapPin className="text-[#B2904D]" /> {t(ui.address)}
                  </h2>

                  <div className="space-y-6">
                    <div className="group">
                      <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-2">{t(ui.address)}</p>
                      <p className="text-white text-lg leading-snug">{data.address}</p>
                      <a href={mapHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#B2904D] mt-3 text-sm font-bold hover:text-[#fff] transition-colors">
                        {t(ui.viewMap)} →
                      </a>
                    </div>
                    <div className="h-px bg-white/10" />

                    <div>
                      <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-2">{t(ui.phone)}</p>
                      <TrackedPhoneLink phone={data.phone} className="text-2xl text-white font-thin hover:text-[#B2904D] transition-colors" />
                    </div>
                    <div className="h-px bg-white/10" />

                    <div>
                      <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-2">{t(ui.hours)}</p>
                      <div className="flex items-start gap-3">
                        <Clock className="text-[#B2904D] mt-1 shrink-0" size={18} />
                        <p className="text-white text-base">{t(data.hours)}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Grid de Equipo */}
              <div className="lg:col-span-7 space-y-16">

                {/* --- SECCIÓN ABOGADOS --- */}
                <div>
                  <Reveal variant="up" className="flex items-center gap-4 mb-10">
                    <div className="w-1 h-10 bg-[#B2904D] rounded-full" />
                    <h2 className="text-3xl font-thin text-white">{t(ui.team)}</h2>
                  </Reveal>

                  <Stagger gap={0.06} className="grid grid-cols-2 sm:grid-cols-3 gap-6" amount={0.1}>
                    {data.attorneys.map((person, idx) => (
                      <StaggerItem key={idx} as="div" className="card-3d group bg-white/5 rounded-xl border border-white/5 hover:border-[#B2904D]/50 transition-all duration-300 hover:bg-white/10 overflow-hidden">

                        <div className="relative w-full aspect-square overflow-hidden">
                          <Image
                            src={person.image}
                            alt={`${person.name} — ${t(person.role)}`}
                            fill
                            sizes="(max-width: 768px) 100px, 150px"
                            className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                          {/* Quote en Hover */}
                          <div className="absolute inset-0 p-4 flex flex-col justify-end items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#001540]/60 backdrop-blur-sm">
                            <Quote size={20} className="text-[#B2904D] mb-2 fill-[#B2904D]" />
                            <p className="text-xs text-white/90 italic leading-snug">
                              "{t(person.quote)}"
                            </p>
                          </div>
                        </div>

                        <div className="p-4 text-center relative z-10">
                          <h5 className="font-bold text-white text-sm md:text-base leading-tight mb-1 group-hover:text-[#B2904D] transition-colors">
                            {person.name}
                          </h5>
                          <span className="text-[10px] font-medium uppercase tracking-wider text-white/40 block">
                            {t(person.role)}
                          </span>
                        </div>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>

                {/* --- SECCIÓN SERVICIOS --- */}
                <div>
                  <Reveal variant="up" className="flex items-center gap-4 mb-8">
                    <div className="w-1 h-8 bg-blue-400 rounded-full" />
                    <h2 className="text-2xl font-thin text-white">{t(ui.services)}</h2>
                  </Reveal>
                  <Stagger gap={0.05} className="flex flex-wrap gap-3" amount={0.1}>
                    {data.services.map((service, idx) => {
                      const label = t(service);
                      const href = SERVICE_LINKS[label];
                      return href ? (
                        <StaggerItem key={idx} as="div">
                          <Link href={`/${lang}/servicios/${href.split('/').pop()}`} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-blue-100/90 hover:bg-[#B2904D]/20 hover:border-[#B2904D]/40 transition-colors flex items-center gap-2">
                            <Scale size={14} className="text-[#B2904D]" />
                            {label}
                          </Link>
                        </StaggerItem>
                      ) : (
                        <StaggerItem key={idx} as="div">
                          <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-blue-100/90 flex items-center gap-2">
                            <Scale size={14} className="text-[#B2904D]" />
                            {label}
                          </span>
                        </StaggerItem>
                      );
                    })}
                  </Stagger>
                </div>

                {/* --- GERENCIA (condicional) --- */}
                {data.managers.length > 0 && (
                  <div>
                    <Reveal variant="up" className="flex items-center gap-4 mb-10">
                      <div className="w-1 h-8 bg-white/50 rounded-full" />
                      <h2 className="text-2xl font-thin text-white">{t(ui.managers)}</h2>
                    </Reveal>

                    <Stagger gap={0.05} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" amount={0.1}>
                      {data.managers.map((person, idx) => (
                        <StaggerItem key={idx} as="div" className="card-3d group flex flex-col items-center justify-center bg-white/5 rounded-lg p-4 border border-white/5 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
                          <div className="mb-3 p-2 rounded-full bg-white/5 text-white/20 group-hover:text-[#B2904D] group-hover:bg-[#B2904D]/10 transition-colors">
                            <User size={18} />
                          </div>
                          <h5 className="font-bold text-white text-sm text-center leading-tight mb-1">
                            {person.name}
                          </h5>
                          <span className="text-[9px] font-medium uppercase tracking-wider text-white/40 text-center">
                            {t(person.role)}
                          </span>
                        </StaggerItem>
                      ))}
                    </Stagger>
                  </div>
                )}

              </div>
            </div>

            {/* --- TAMBIÉN ATENDEMOS ACCIDENTES (solo oficinas virtuales) --- */}
            {data.accidentsSection && (
              <Reveal variant="up" className="relative max-w-4xl mx-auto mb-16" amount={0.15}>
                <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-[#B2904D]/30 overflow-hidden">
                  <div className="h-1.5 w-full bg-gradient-to-r from-[#B2904D] via-[#D4AF37] to-[#B2904D]" />
                  <div className="p-6 md:p-10 flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="shrink-0 w-14 h-14 rounded-full bg-[#B2904D]/15 border border-[#B2904D]/30 flex items-center justify-center">
                      <Car className="text-[#B2904D]" size={26} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-thin text-white mb-3">
                        {lang === 'es'
                          ? '¿Tuvo un accidente? Aquí también lo atendemos'
                          : 'Had an accident? We handle that here too'}
                      </h2>
                      <p className="text-white/70 text-base leading-relaxed font-light mb-5">
                        {lang === 'es'
                          ? 'Además de inmigración, en esta oficina también llevamos casos de accidentes: choques de auto, accidentes de trabajo, resbalones y caídas, y lesiones personales. Llámenos y con gusto le orientamos sobre su caso.'
                          : 'In addition to immigration, this office also handles accident cases: auto collisions, work injuries, slip-and-fall, and personal injury. Call us and we will gladly guide you through your case.'}
                      </p>
                      <Link
                        href={
                          data.accidentsSlug
                            ? `/${lang}/servicios/accidentes/oficinas/${data.accidentsSlug}`
                            : `/${lang}/servicios/accidentes`
                        }
                        className="inline-flex items-center gap-2 text-[#B2904D] text-sm font-bold hover:text-white transition-colors"
                      >
                        <Scale size={14} />
                        {lang === 'es'
                          ? 'Ver accidentes en esta oficina'
                          : 'See accident services at this office'} →
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}

            {/* --- FORMULARIO DE CONTACTO --- */}
            <Reveal variant="up" className="relative max-w-4xl mx-auto" amount={0.1}>
              <div className="bg-[#001540]/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="h-1.5 w-full bg-gradient-to-r from-[#B2904D] via-[#D4AF37] to-[#B2904D]" />
                <div className="p-6 md:p-12">
                  <ContactForm lang={lang} />
                </div>
              </div>
            </Reveal>

          </div>
        </div>
        {/* La FAQ va DENTRO del <main> y antes del footer. Colgarla después del
            <Footer /> —como quedó en el primer intento— la deja fuera del
            contenido principal: se ve debajo del pie de página y los lectores
            de pantalla la anuncian tras el final del documento. */}
        <FaqSection
          faqs={faqs}
          lang={lang === 'en' ? 'en' : 'es'}
          title={lang === 'en' ? 'About this office' : 'Sobre esta oficina'}
        />
      </main>

      <Footer />
    </>
  );
}
