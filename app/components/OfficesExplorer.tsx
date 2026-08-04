'use client';

import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation, Scale, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Language } from '../lib/translations';
import { fireConversion } from '../lib/conversion';
import {
  OFFICES_NAP,
  formatOfficeAddress,
  getOfficeOpenState,
  type BiText,
  type OfficeNapSlug,
  type OfficeOpenState,
} from './officesPhoneMap';

// --- TIPOS DE DATOS ---
/**
 * Lo que es propio del explorador del home (presentación). El NAP —dirección,
 * teléfono, horario, zona horaria y enlace de mapa— se lee de OFFICES_NAP para
 * que no exista una segunda copia editable a mano.
 */
type OfficePresentation = {
  slug: OfficeNapSlug;
  /** Título completo para la tarjeta. */
  title: BiText;
  description: BiText;
  image: string;
  services: BiText[];
};

type OfficeData = OfficePresentation & {
  id: OfficeNapSlug;
  /** Nombre corto para el menú. */
  city: string;
  state: string;
  address: string;
  phone: string;
  hours: BiText;
  mapLink: string;
  /**
   * true = la dirección es un centro de negocios virtual (Regus / IWG), no un
   * local propio del despacho; se atiende SOLO con cita (ver notas en
   * app/lib/officesRegistry.ts → VIRTUAL_OFFICE_SLUGS). Metadato: NO se
   * renderiza, se deriva del tipo de horario del registro NAP.
   */
  virtual: boolean;
};

// --- TEXTO ORIGINAL DE DESCRIPCIÓN (Restaurado) ---
const ORIGINAL_DESC = {
    es: 'Abogado de Inmigración Manuel Solís, con más de 35 años de experiencia y 50,000 casos ganados, le guía en su trámite de visa humanitaria: visa U, visa VAWA, visa T, visa juvenil, permiso de trabajo en USA y residencia permanente en USA. Contamos con representación legal en todo Estados Unidos y también ofrecemos asesoría en áreas legales como derecho familiar, accidentes, negligencia médica, derecho civil y criminal. Nuestro equipo de más de 200 profesionales analiza cada situación de manera detallada, elaborando estrategias legales personalizadas que buscan proteger sus derechos. Ofrecemos servicios legales en español e inglés, brindando atención cercana, asesoría confiable y compromiso total con cada cliente migratorio o legal.',
    en: 'Immigration Attorney Manuel Solís, with more than 35 years of experience and 50,000 cases won, guides you through your humanitarian visa process: U visa, VAWA visa, T visa, juvenile visa, work permits in the USA, and permanent residence in the USA. We provide legal representation throughout the United States and also offer legal guidance in areas such as family law, personal injury, medical malpractice, civil law, and criminal law. Our team of more than 200 professionals carefully analyzes each situation, developing personalized legal strategies designed to protect your rights. We offer legal services in Spanish and English, providing personalized attention, trusted guidance, and full commitment to every immigration or legal client.'
};

// --- DATOS DE PRESENTACIÓN ---
const officePresentations: OfficePresentation[] = [
  {
    slug: 'houston-principal',
    title: { es: 'Houston Principal', en: 'Houston Principal' },
    description: ORIGINAL_DESC,
    image: '/offices/Houston.png',
    services: [
        { es: 'Inmigración', en: 'Immigration' },
        { es: 'Planificación Patrimonial', en: 'Estate Planning' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Ticket', en: 'Traffic Tickets' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    slug: 'houston-accidentes',
    title: { es: 'Houston Accidentes', en: 'Houston Accidents' },
    description: ORIGINAL_DESC,
    image: '/offices/Houston.png',
    services: [
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Inmigración', en: 'Immigration' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Ticket', en: 'Traffic Tickets' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    slug: 'north-loop',
    title: { es: 'Houston (North Loop)', en: 'Houston (North Loop)' },
    description: ORIGINAL_DESC,
    image: '/offices/ofLoop.png',
    services: [
        { es: 'Inmigración', en: 'Immigration' },
        { es: 'Planificación Patrimonial', en: 'Estate Planning' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Ticket', en: 'Traffic Tickets' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    slug: 'northchase',
    title: { es: 'Houston (Northchase)', en: 'Houston (Northchase)' },
    description: ORIGINAL_DESC,
    image: '/offices/ofNorth.png',
    services: [
        { es: 'Inmigración', en: 'Immigration' },
        { es: 'Planificación Patrimonial', en: 'Estate Planning' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Ticket', en: 'Traffic Tickets' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    slug: 'main-st',
    title: { es: 'Houston (Main St)', en: 'Houston (Main St)' },
    description: ORIGINAL_DESC,
    image: '/offices/main.png',
    services: [
        { es: 'Inmigración', en: 'Immigration' },
        { es: 'Planificación Patrimonial', en: 'Estate Planning' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Ticket', en: 'Traffic Tickets' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    slug: 'kirby',
    title: { es: 'Houston (Kirby)', en: 'Houston (Kirby)' },
    description: ORIGINAL_DESC,
    image: '/offices/Houston.png',
    services: [
        { es: 'Inmigración', en: 'Immigration' },
        { es: 'Planificación Patrimonial', en: 'Estate Planning' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Ticket', en: 'Traffic Tickets' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    slug: 'houston-bellaire',
    title: { es: 'Houston (Bellaire)', en: 'Houston (Bellaire)' },
    description: ORIGINAL_DESC,
    image: '/offices/Houston.png',
    services: [
        { es: 'Inmigración', en: 'Immigration' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    slug: 'chicago',
    title: { es: 'Chicago', en: 'Chicago' },
    description: ORIGINAL_DESC,
    image: '/offices/Chicago.png',
    services: [
        { es: 'Inmigración', en: 'Immigration' },
        { es: 'Planificación Patrimonial', en: 'Estate Planning' },
        { es: 'Familiar', en: 'Family Law' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Ticket', en: 'Traffic Tickets' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    slug: 'memphis',
    title: { es: 'Memphis', en: 'Memphis' },
    description: ORIGINAL_DESC,
    image: '/offices/Memphis.png',
    services: [
        { es: 'Inmigración', en: 'Immigration' },
        { es: 'Planificación Patrimonial', en: 'Estate Planning' },
        { es: 'Familiar', en: 'Family Law' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Ticket', en: 'Traffic Tickets' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    slug: 'arvada',
    title: { es: 'Arvada (Denver)', en: 'Arvada (Denver)' },
    description: ORIGINAL_DESC,
    image: '/offices/Denver.png',
    services: [
        { es: 'Inmigración', en: 'Immigration' },
        { es: 'Planificación Patrimonial', en: 'Estate Planning' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    slug: 'dallas',
    title: { es: 'Dallas', en: 'Dallas' },
    description: ORIGINAL_DESC,
    image: '/offices/Dallas.png',
    services: [
        { es: 'Inmigración', en: 'Immigration' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    slug: 'el-paso',
    title: { es: 'El Paso', en: 'El Paso' },
    description: ORIGINAL_DESC,
    image: '/offices/el-paso.png',
    services: [
        { es: 'Inmigración', en: 'Immigration' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    slug: 'harlingen',
    title: { es: 'Harlingen', en: 'Harlingen' },
    description: ORIGINAL_DESC,
    image: '/offices/Harlingen.png',
    services: [
        { es: 'Inmigración', en: 'Immigration' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    slug: 'losangeles',
    title: { es: 'Los Angeles', en: 'Los Angeles' },
    description: ORIGINAL_DESC,
    image: '/offices/los-angeles.png',
    services: [
        { es: 'Inmigración', en: 'Immigration' },
        { es: 'Planificación Patrimonial', en: 'Estate Planning' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    slug: 'league-city',
    title: { es: 'League City', en: 'League City' },
    description: ORIGINAL_DESC,
    image: '/offices/League.png',
    services: [
        { es: 'Inmigración', en: 'Immigration' },
        { es: 'Planificación Patrimonial', en: 'Estate Planning' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Ticket', en: 'Traffic Tickets' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
];

const officesData: OfficeData[] = officePresentations
  .map((office) => {
    const nap = OFFICES_NAP[office.slug];
    return {
      ...office,
      id: office.slug,
      city: nap.menuLabel,
      state: nap.state,
      address: formatOfficeAddress(nap),
      phone: nap.phone,
      hours: nap.hours.label,
      mapLink: nap.mapLink,
      virtual: nap.hours.kind === 'appointment',
    };
  })
  .sort((a, b) => {
    if (a.id === 'houston-principal') return -1;
    if (b.id === 'houston-principal') return 1;
    if (a.city < b.city) return -1;
    if (a.city > b.city) return 1;
    return 0;
  });

// --- MINI COMPONENTE: ACCIÓN HUD ---
const ActionHUD = ({ label, value, icon: Icon, href, office }: { label: string, value: string, icon: React.ElementType, href?: string, office?: string }) => {
    const isTel = Boolean(href?.startsWith('tel'));
    const isExternal = Boolean(href?.startsWith('http'));

    const handleClick = () => {
      if (!isTel) return;
      // Fanout unificado: Vercel + dataLayer/GA4 + Meta + TikTok + Flight Check
      fireConversion('phone_click', 'office_phone_button', {
        location: 'home_offices_explorer',
        phone_number: value,
        office: office ?? 'unknown',
      });
    };

    const inner = (
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-[10px] text-blue-300/60 font-bold uppercase tracking-widest mb-1 group-hover:text-[#B2904D] transition-colors">
            {label}
          </p>
          <p className={`text-white ${isTel ? 'font-bold' : 'font-medium'} text-sm group-hover:text-white transition-colors`}>{value}</p>
        </div>
        <Icon size={18} className="text-[#B2904D] group-hover:text-white transition-colors" />
      </div>
    );

    if (!href) {
      return (
        <div className="block p-4 rounded-xl bg-white/5 border border-white/10 group relative overflow-hidden">
          {inner}
        </div>
      );
    }

    return (
      <a
        href={href}
        onClick={handleClick}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="block p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-[#B2904D]/10 transition-all duration-300 group relative overflow-hidden"
        style={{ transitionProperty: 'background-color, transform' }}
      >
        {inner}
      </a>
    );
};

// --- MINI COMPONENTE: ENLACE A LA FICHA DE LA OFICINA ---
const OfficeLinkHUD = ({ label, value, href }: { label: string, value: string, href: string }) => (
  <Link
    href={href}
    className="block p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-[#B2904D]/10 transition-all duration-300 group relative overflow-hidden"
  >
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-[10px] text-blue-300/60 font-bold uppercase tracking-widest mb-1 group-hover:text-[#B2904D] transition-colors">
          {label}
        </p>
        <p className="text-white font-bold text-sm group-hover:text-white transition-colors">{value}</p>
      </div>
      <ArrowRight size={18} className="text-[#B2904D] group-hover:text-white transition-colors" />
    </div>
  </Link>
);

// --- AGRUPACIÓN POR ESTADO → CIUDAD ---
// League City es municipio propio (área de Galveston), no Houston: va con las
// otras ciudades de Texas para no inflar el grupo de Houston.
const HOUSTON_IDS: OfficeNapSlug[] = ['houston-principal', 'houston-accidentes', 'houston-bellaire', 'kirby', 'main-st', 'north-loop', 'northchase'];
const OTHER_STATES = [
  { code: 'IL', label: 'Illinois' },
  { code: 'TN', label: 'Tennessee' },
  { code: 'CO', label: 'Colorado' },
  { code: 'CA', label: 'California' },
];

// --- ESTADO OPERATIVO (por oficina y en SU zona horaria) ---
const STATUS_LABELS: Record<OfficeOpenState, BiText> = {
  open: { es: 'ABIERTO', en: 'OPEN' },
  closed: { es: 'CERRADO', en: 'CLOSED' },
  'always-open': { es: 'ABIERTO 24 H', en: 'OPEN 24 H' },
  appointment: { es: 'CON CITA', en: 'BY APPT' },
};

const STATUS_TONES: Record<OfficeOpenState, { text: string; dot: string }> = {
  open: { text: 'text-green-400', dot: 'bg-green-500' },
  closed: { text: 'text-red-400', dot: 'bg-red-500' },
  'always-open': { text: 'text-green-400', dot: 'bg-green-500' },
  appointment: { text: 'text-[#B2904D]', dot: 'bg-[#B2904D]' },
};

// --- COMPONENTE PRINCIPAL (client island) ---
// Server-first split (Fase 2.2c): the section, static background and heading now
// live in the server wrapper Offices.tsx. This island keeps the interactive
// explorer (selector + animated detail panel + live open/closed status). The
// animated background orbs + the resize/isDesktop listener were dropped (static
// bg on the server) — fewer client effects.
export default function OfficesExplorer({ lang }: { lang: Language }) {
  const language = lang;

  const [activeId, setActiveId] = useState<OfficeNapSlug>(officesData[0].id);
  const activeOffice = officesData.find(o => o.id === activeId) || officesData[0];
  const [now, setNow] = useState<Date | null>(null);

  // --- LÓGICA DE STATUS (live open/closed) ---
  // El reloj solo se necesita para las oficinas con franjas horarias; se lee
  // tras el montaje para no desincronizar la hidratación.
  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 60000); // Revisar cada minuto
    return () => clearInterval(interval);
  }, []);

  const hoursKind = OFFICES_NAP[activeOffice.id].hours.kind;
  const openState: OfficeOpenState | null =
    hoursKind === 'appointment'
      ? 'appointment'
      : hoursKind === 'always'
        ? 'always-open'
        : now
          ? getOfficeOpenState(activeOffice.id, now)
          : null;
  const statusTone = openState ? STATUS_TONES[openState] : { text: 'text-blue-200/60', dot: 'bg-blue-200/40' };
  const statusLabel = openState
    ? STATUS_LABELS[openState][language]
    : (language === 'es' ? 'VERIFICANDO' : 'CHECKING');

  const gT = (obj: { es: string; en: string }) => obj[lang] || obj.es;

  return (
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 min-h-[700px]">

          {/* --- MÓVIL: SELECTOR HORIZONTAL --- */}
          <div className="lg:hidden col-span-full overflow-x-auto pb-4 -mx-4 px-4 scrollbar-none">
            <div className="flex gap-2 min-w-max">
              {/* Texas offices */}
              <span className="self-center text-[10px] font-bold text-[#B2904D] uppercase tracking-wider px-2.5 py-1 bg-[#B2904D]/10 rounded-lg flex-shrink-0 border border-[#B2904D]/20">TX</span>
              {officesData.filter(o => o.state === 'TX').map(office => (
                <button key={office.id} onClick={() => setActiveId(office.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-300 border ${
                    activeId === office.id
                      ? 'bg-[#B2904D] text-[#001540] border-[#B2904D] shadow-lg shadow-[#B2904D]/20'
                      : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {office.city}
                </button>
              ))}
              {/* Other states */}
              {OTHER_STATES.map(s => {
                const offices = officesData.filter(o => o.state === s.code);
                if (offices.length === 0) return null;
                return (
                  <div key={s.code} className="flex items-center gap-2 contents">
                    <span className="self-center text-[10px] font-bold text-[#B2904D] uppercase tracking-wider px-2.5 py-1 bg-[#B2904D]/10 rounded-lg flex-shrink-0 border border-[#B2904D]/20 ml-2">{s.code}</span>
                    {offices.map(office => (
                      <button key={office.id} onClick={() => setActiveId(office.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-300 border ${
                          activeId === office.id
                            ? 'bg-[#B2904D] text-[#001540] border-[#B2904D] shadow-lg shadow-[#B2904D]/20'
                            : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {office.city}
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- DESKTOP: MENÚ VERTICAL AGRUPADO (COL 3) --- */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-2 lg:max-h-[700px] lg:overflow-y-auto lg:pr-2">
            <div className="text-sm font-bold text-blue-200/60 uppercase tracking-widest pl-2 mb-3 flex items-center gap-2">
              <Navigation size={14} /> {language === 'es' ? 'Acceso Rápido' : 'Quick Access'}
            </div>

            <div className="flex flex-col gap-0 relative">
               <div className="absolute left-[18px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent" />

               {/* TEXAS */}
               <div className="mb-5">
                 <div className="text-sm font-bold text-[#B2904D] uppercase tracking-[0.2em] px-2 py-2 mb-2 border-b border-[#B2904D]/25">Texas</div>

                 {/* Houston sub-group */}
                 <div className="mb-3 ml-1 mt-2">
                   <div className="text-xs font-semibold text-white/50 uppercase tracking-wider pl-9 py-1.5 mb-1">Houston</div>
                   {officesData.filter(o => HOUSTON_IDS.includes(o.id)).map((office) => {
                     const isActive = activeId === office.id;
                     return (
                       <m.button key={office.id} onClick={() => setActiveId(office.id)}
                         className={`group relative w-full pl-10 pr-4 py-3 rounded-r-xl rounded-l-sm text-left transition-all duration-500 overflow-hidden flex justify-between items-center ${isActive ? 'bg-gradient-to-r from-white/10 to-transparent' : 'hover:bg-white/5'}`}
                         whileHover={{ x: isActive ? 0 : 5 }}
                       >
                         {isActive && <m.div layoutId="activeGlow" className="absolute left-0 top-0 bottom-0 w-1 bg-[#B2904D] shadow-[0_0_15px_rgba(178,144,77,0.5)] rounded-full" />}
                         {!isActive && <div className="absolute left-[17px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white/20 rounded-full group-hover:bg-white/50 transition-colors" />}
                         <span className={`block text-xl font-serif leading-none transition-colors ${isActive ? 'text-white font-medium' : 'text-blue-100/60 group-hover:text-white/90'}`}>{office.city}</span>
                       </m.button>
                     );
                   })}
                 </div>

                 {/* Otras ciudades de Texas */}
                 <div className="mt-3 pt-2 border-t border-white/8">
                   {officesData.filter(o => o.state === 'TX' && !HOUSTON_IDS.includes(o.id)).map((office) => {
                     const isActive = activeId === office.id;
                     return (
                       <m.button key={office.id} onClick={() => setActiveId(office.id)}
                         className={`group relative w-full pl-10 pr-4 py-3 rounded-r-xl rounded-l-sm text-left transition-all duration-500 overflow-hidden flex justify-between items-center ${isActive ? 'bg-gradient-to-r from-white/10 to-transparent' : 'hover:bg-white/5'}`}
                         whileHover={{ x: isActive ? 0 : 5 }}
                       >
                         {isActive && <m.div layoutId="activeGlow" className="absolute left-0 top-0 bottom-0 w-1 bg-[#B2904D] shadow-[0_0_15px_rgba(178,144,77,0.5)] rounded-full" />}
                         {!isActive && <div className="absolute left-[17px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white/20 rounded-full group-hover:bg-white/50 transition-colors" />}
                         <span className={`block text-xl font-serif leading-none transition-colors ${isActive ? 'text-white font-medium' : 'text-blue-100/60 group-hover:text-white/90'}`}>{office.city}</span>
                       </m.button>
                     );
                   })}
                 </div>
               </div>

               {/* OTROS ESTADOS */}
               {OTHER_STATES.map(stateInfo => {
                 const stateOffices = officesData.filter(o => o.state === stateInfo.code);
                 if (stateOffices.length === 0) return null;
                 return (
                   <div key={stateInfo.code} className="mb-5">
                     <div className="text-sm font-bold text-[#B2904D] uppercase tracking-[0.2em] px-2 py-2 mb-2 border-b border-[#B2904D]/25">{stateInfo.label}</div>
                     {stateOffices.map((office) => {
                       const isActive = activeId === office.id;
                       return (
                         <m.button key={office.id} onClick={() => setActiveId(office.id)}
                           className={`group relative w-full pl-10 pr-4 py-3 rounded-r-xl rounded-l-sm text-left transition-all duration-500 overflow-hidden flex justify-between items-center ${isActive ? 'bg-gradient-to-r from-white/10 to-transparent' : 'hover:bg-white/5'}`}
                           whileHover={{ x: isActive ? 0 : 5 }}
                         >
                           {isActive && <m.div layoutId="activeGlow" className="absolute left-0 top-0 bottom-0 w-1 bg-[#B2904D] shadow-[0_0_15px_rgba(178,144,77,0.5)] rounded-full" />}
                           {!isActive && <div className="absolute left-[17px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white/20 rounded-full group-hover:bg-white/50 transition-colors" />}
                           <span className={`block text-xl font-serif leading-none transition-colors ${isActive ? 'text-white font-medium' : 'text-blue-100/60 group-hover:text-white/90'}`}>{office.city}</span>
                           <span className={`text-[10px] tracking-widest uppercase font-bold px-2.5 py-1 rounded-full ${isActive ? 'bg-[#B2904D] text-[#001540]' : 'bg-blue-900/50 text-blue-200/60'}`}>{office.state}</span>
                         </m.button>
                       );
                     })}
                   </div>
                 );
               })}
            </div>
          </div>

          {/* --- CENTRAL: DATA VISUALIZER (3D CARD - COL 9) --- */}
          <div className="lg:col-span-9 perspective-[2000px]">
            <AnimatePresence mode="wait">
              <m.div
                key={activeOffice.id}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className={`relative h-full bg-[#000a20]/90 backdrop-blur-xl rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col will-change-transform`}
              >

                {/* 1. TOP SECTION (Media + Title) */}
                <div className="relative h-[300px] lg:h-[350px] w-full bg-black group overflow-hidden">

                   {/* Imagen de fondo con efecto de foco */}
                   <Image
                     src={activeOffice.image}
                     alt={activeOffice.city}
                     fill
                     className="object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
                     sizes="(max-width: 768px) 100vw, 70vw"
                     priority={false}
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#000a20] via-transparent to-transparent opacity-90" />

                   {/* HUD TOP CORNER: STATUS */}
                   <div className="absolute top-6 right-6 z-20 p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                        <p className={`text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 ${statusTone.text}`}>
                            STATUS
                            <span className={`w-1.5 h-1.5 rounded-full ${openState ? 'animate-pulse' : ''} ${statusTone.dot}`} />
                        </p>
                        <m.p
                            className="text-white text-lg font-mono mt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <m.span
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className={`text-sky-400`}
                            >
                                [ {activeOffice.state} ]
                            </m.span>
                             {' '} {statusLabel}
                        </m.p>
                   </div>

                   {/* MAIN TITLE (SIN QUOTE) */}
                   <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12 z-20">
                     <h3 className="text-4xl md:text-5xl font-serif font-medium text-white mb-2 leading-tight">
                       {gT(activeOffice.title)}
                     </h3>
                   </div>
                </div>

                {/* 2. INFO DASHBOARD (Main Content) */}
                <div className="p-8 lg:p-12 flex flex-col gap-10">

                   {/* DESCRIPTION */}
                   <div className="w-full">
                       <h3 className="text-xl font-thin text-white mb-3">{language === 'es' ? 'Sobre nuestra experiencia legal' : 'About Our Legal Experience'}</h3>
                       <p className="text-blue-100/70 text-base leading-relaxed text-justify border-l-2 border-white/10 pl-4">
                         {gT(activeOffice.description)}
                       </p>
                   </div>

                   {/* SOLO SERVICIOS (Abogados removidos) */}
                   <div className="border-y border-white/10 py-8">
                      <div>
                          <h4 className="text-sm font-bold text-blue-300/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                             <Scale size={14} className="text-[#fffff]" />
                             {language === 'es' ? 'Servicios Disponibles' : 'Available Services'}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {activeOffice.services.map((service, idx) => (
                              <span key={idx} className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-[#B2904D]/10 hover:border-[#B2904D]/30 transition-all duration-300 rounded-full text-xs text-blue-100 font-medium tracking-wide">
                                {gT(service)}
                              </span>
                            ))}
                          </div>
                      </div>
                   </div>

                   {/* CONTACT ACTIONS GRID (The HUD) */}
                   <div className="space-y-6">
                     <h3 className="text-xl font-thin text-white mb-4 flex items-center gap-3">
                         <m.div
                           animate={{ rotate: [0, 360] }}
                           transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                           className={`w-4 h-4 rounded-full border border-dashed border-[#B2904D]`}
                         />
                         <span className={`text-[#B2904D] font-medium`}>{language === 'es' ? 'Datos' : 'Contact'}</span> {language === 'es' ? 'de contacto' : 'Information'}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                         <ActionHUD label={language === 'es' ? 'Ubicación' : 'Location Grid'} value={activeOffice.address} icon={MapPin} href={activeOffice.mapLink} />
                         <ActionHUD label={language === 'es' ? 'Línea Directa' : 'Direct Line'} value={activeOffice.phone} icon={Phone} href={`tel:+1${activeOffice.phone.replace(/[^0-9]/g, '')}`} office={activeOffice.id} />
                         <ActionHUD label={language === 'es' ? 'Horario Operativo' : 'Operating Hours'} value={gT(activeOffice.hours)} icon={Clock} />
                         <OfficeLinkHUD
                           label={language === 'es' ? 'Ficha de la oficina' : 'Office Profile'}
                           value={language === 'es' ? 'Ver oficina' : 'View office'}
                           href={`/${lang}/oficinas/${activeOffice.id}`}
                         />
                      </div>
                   </div>

                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
  );
}
