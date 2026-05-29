'use client';

import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation, Scale } from 'lucide-react';
import Image from 'next/image';
import type { Language } from '../lib/translations';
import { pushToDataLayer, trackConversion } from '../lib/tracking';

// Función auxiliar para mapas
const generateMapUrl = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
};

// --- TIPOS DE DATOS ---
type OfficeData = {
  id: string; 
  city: string; // Nombre corto para el menú
  state: string; 
  title: { es: string; en: string }; // Título completo para la tarjeta
  description: { es: string; en: string }; 
  address: string;
  phone: string;
  hours: { es: string; en: string };
  mapLink: string;
  image: string;
  services: { es: string; en: string }[];
  /**
   * true = la dirección es un centro de negocios virtual (Regus / IWG), no un
   * local propio del despacho; se atiende SOLO con cita (ver notas en
   * app/lib/officesRegistry.ts → VIRTUAL_OFFICE_SLUGS). Las 5 virtuales son
   * north-loop, northchase, main-st, kirby y league-city (aquí con los ids
   * houston-north-loop, houston-northchase, houston-main, houston-kirby,
   * league-city). Metadato: NO se renderiza, se calcula en el .map de abajo.
   */
  virtual: boolean;
};

// Ids (de este explorer) cuyas direcciones son oficinas virtuales Regus/IWG.
const VIRTUAL_OFFICE_IDS = new Set([
  'houston-north-loop',
  'houston-northchase',
  'houston-main',
  'houston-kirby',
  'league-city',
]);

// --- TEXTO ORIGINAL DE DESCRIPCIÓN (Restaurado) ---
const ORIGINAL_DESC = {
    es: 'Abogado de Inmigración Manuel Solís, con más de 35 años de experiencia y 50,000 casos ganados, le guía en su trámite de visa humanitaria: visa U, visa VAWA, visa T, visa juvenil, permiso de trabajo en USA y residencia permanente en USA. Contamos con representación legal en todo Estados Unidos y también ofrecemos asesoría en áreas legales como derecho familiar, accidentes, negligencia médica, derecho civil y criminal. Nuestro equipo de más de 200 profesionales analiza cada situación de manera detallada, elaborando estrategias legales personalizadas que buscan proteger sus derechos. Ofrecemos servicios legales en español e inglés, brindando atención cercana, asesoría confiable y compromiso total con cada cliente migratorio o legal.',
    en: 'Immigration Attorney Manuel Solís, with more than 35 years of experience and 50,000 cases won, guides you through your humanitarian visa process: U visa, VAWA visa, T visa, juvenile visa, work permits in the USA, and permanent residence in the USA. We provide legal representation throughout the United States and also offer legal guidance in areas such as family law, personal injury, medical malpractice, civil law, and criminal law. Our team of more than 200 professionals carefully analyzes each situation, developing personalized legal strategies designed to protect your rights. We offer legal services in Spanish and English, providing personalized attention, trusted guidance, and full commitment to every immigration or legal client.'
};

// --- DATOS COMPLETOS ---
const officesData: OfficeData[] = [
  {
    id: 'houston-principal',
    city: 'Houston Principal',
    state: 'TX',
    title: { es: 'Houston Principal', en: 'Houston Principal' },
    description: ORIGINAL_DESC,
    address: '6657 Navigation Blvd, Houston, TX 77011, United States',
    phone: '(713) 701-1731',
    hours: { es: 'Abierto 24 horas', en: 'Open 24 hours' },
    mapLink: generateMapUrl('6705 Navigation Blvd, Houston, TX 77011, United States'),
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
    id: 'houston-accidentes',
    city: 'Accidentes',
    state: 'TX',
    title: { es: 'Houston Accidentes', en: 'Houston Accidents' },
    description: ORIGINAL_DESC,
    address: '6705 Navigation Blvd, Houston, TX 77011, United States',
    phone: '(713) 231-5384',
    hours: { es: 'Abierto 24 horas', en: 'Open 24 hours' },
    mapLink: generateMapUrl('6705 Navigation Blvd, Houston, TX 77011, United States'),
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
    id: 'houston-north-loop',
    city: 'North Loop',
    state: 'TX',
    title: { es: 'Houston (North Loop)', en: 'Houston (North Loop)' },
    description: ORIGINAL_DESC,
    address: '2950 N Loop W, Houston, TX 77092, United States',
    phone: '(713) 429-0237',
    hours: { es: 'Abierto 24 horas', en: 'Open 24 hours' },
    mapLink: generateMapUrl('2950 N Loop W, Houston, TX 77092, United States'),
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
    id: 'houston-northchase',
    city: 'Northchase',
    state: 'TX',
    title: { es: 'Houston (Northchase)', en: 'Houston (Northchase)' },
    description: ORIGINAL_DESC,
    address: '16510 Northchase Dr, Houston, TX 77060, United States',
    phone: '(346) 522-4848',
    hours: { es: 'Abierto 24 horas', en: 'Open 24 hours' },
    mapLink: generateMapUrl('16510 Northchase Dr, Houston, TX 77060, United States'),
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
    id: 'houston-main',
    city: 'Main St',
    state: 'TX',
    title: { es: 'Houston (Main St)', en: 'Houston (Main St)' },
    description: ORIGINAL_DESC,
    address: '708 Main St, Houston, TX 77002, United States',
    phone: '(713) 842-9575',
    hours: { es: 'Abierto 24 horas', en: 'Open 24 hours' },
    mapLink: generateMapUrl('708 Main St, Houston, TX 77002, United States'),
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
    id: 'houston-kirby',
    city: 'Kirby',
    state: 'TX',
    title: { es: 'Houston (Kirby)', en: 'Houston (Kirby)' },
    description: ORIGINAL_DESC,
    address: '3730 Kirby Dr, Houston, TX 77098, United States',
    phone: '(713) 903-7875',
    hours: { es: 'Abierto 24 horas', en: 'Open 24 hours' },
    mapLink: generateMapUrl('3730 Kirby Dr, Houston, TX 77098, United States'),
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
    id: 'houston-bellaire',
    city: 'Bellaire',
    state: 'TX',
    title: { es: 'Houston (Bellaire)', en: 'Houston (Bellaire)' },
    description: ORIGINAL_DESC,
    address: '9188 Bellaire Blvd E, Houston, TX 77036, United States',
    phone: '(832) 598-0914',
    hours: { es: 'Abierto 24 horas', en: 'Open 24 hours' },
    mapLink: generateMapUrl('9188 Bellaire Blvd E, Houston, TX 77036, United States'),
    image: '/offices/Houston.png',
    services: [ 
        { es: 'Inmigración', en: 'Immigration' }, 
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    id: 'chicago',
    city: 'Chicago',
    state: 'IL',
    title: { es: 'Chicago', en: 'Chicago' }, 
    description: ORIGINAL_DESC,
    address: '6000 Cermak Rd, Cicero, IL 60804, United States',
    phone: '(312) 477-0389',
    hours: { es: 'Lun - Vie 9am - 6pm | Sáb 8am - 4pm', en: 'Mon - Fri 9am - 6pm | Sat 8am - 4pm' },
    mapLink: generateMapUrl('6000 Cermak Rd, Cicero, IL 60804, United States'),
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
    id: 'memphis',
    city: 'Memphis',
    state: 'TN',
    title: { es: 'Memphis', en: 'Memphis' },
    description: ORIGINAL_DESC,
    address: '3385 Airways Blvd Suite 320, Memphis, TN 38116, United States',
    phone: '(901) 557-8357',
    hours: { es: 'Lun - Vie 9am - 5pm | Sáb 9am - 1pm', en: 'Mon - Fri 9am - 5pm | Sat 9am - 1pm' },
    mapLink: generateMapUrl('3385 Airways Blvd Suite 320, Memphis, TN 38116, United States'),
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
    id: 'denver',
    city: 'Arvada',
    state: 'CO',
    title: { es: 'Arvada (Denver)', en: 'Arvada (Denver)' },
    description: ORIGINAL_DESC,
    address: '5400 Ward Rd BLDG IV, Arvada, CO 80002, United States',
    phone: '(720) 358-8973',
    hours: { es: 'Lun - Vie 9am - 6pm | Sáb 9am - 2pm', en: 'Mon - Fri 9am - 6pm | Sat 9am - 2pm' },
    mapLink: generateMapUrl('5400 Ward Rd BLDG IV, Arvada, CO 80002, United States'),
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
    id: 'dallas',
    city: 'Dallas',
    state: 'TX',
    title: { es: 'Dallas', en: 'Dallas' },
    description: ORIGINAL_DESC,
    address: '1120 Empire Central Pl, Dallas, TX 75247, United States',
    phone: '(214) 753-8315',
    hours: { es: 'Lun - Vie 9am - 7pm | Sáb 8am - 4pm', en: 'Mon - Fri 9am - 7pm | Sat 8am - 4pm' },
    mapLink: generateMapUrl('1120 Empire Central Pl, Dallas, TX 75247, United States'),
    image: '/offices/Dallas.png',
    services: [
        { es: 'Inmigración', en: 'Immigration' }, 
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    id: 'el-paso',
    city: 'El Paso',
    state: 'TX',
    title: { es: 'El Paso', en: 'El Paso' },
    description: ORIGINAL_DESC,
    address: '3632 Admiral St, El Paso, TX 79925, United States',
    phone: '(915) 233-7127',
    hours: { es: 'Lun - Vie 9am - 5pm | Sáb 9am - 2pm', en: 'Mon - Fri 9am - 5pm | Sat 9am - 2pm' },
    mapLink: generateMapUrl('3632 Admiral St, El Paso, TX 79925, United States'),
    image: '/offices/El paso.png',
    services: [
        { es: 'Inmigración', en: 'Immigration' }, 
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    id: 'harlingen',
    city: 'Harlingen',
    state: 'TX',
    title: { es: 'Harlingen', en: 'Harlingen' },
    description: ORIGINAL_DESC,
    address: '320 E Jackson St, Harlingen, TX 78550, United States',
    phone: '(956) 597-7090',
    hours: { es: 'Lun - Vie 9am - 6pm', en: 'Mon - Fri 9am - 6pm' },
    mapLink: generateMapUrl('320 E Jackson Ave, Harlingen, TX 78550, United States'),
    image: '/offices/Harlingen.png',
    services: [ 
        { es: 'Inmigración', en: 'Immigration' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    id: 'los-angeles',
    city: 'Los Angeles',
    state: 'CA',
    title: { es: 'Los Angeles', en: 'Los Angeles' },
    description: ORIGINAL_DESC,
    address: '8337 Telegraph Rd Ste 115, Pico Rivera, CA 90660, United States',
    phone: '(213) 784-1554',
    hours: { es: 'Lun - Vie 9am - 6pm | Sáb 9am - 2pm', en: 'Mon - Fri 9am - 6pm | Sat 9am - 2pm' },
    mapLink: generateMapUrl('8337 Telegraph Rd Ste 115, Pico Rivera, CA 90660, United States'),
    image: '/offices/Los Angeles.png',
    services: [ 
        { es: 'Inmigración', en: 'Immigration' },
        { es: 'Planificación Patrimonial', en: 'Estate Planning' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    id: 'league-city',
    city: 'League City',
    state: 'TX',
    title: { es: 'League City', en: 'League City' },
    description: ORIGINAL_DESC,
    address: '2600 South Shore Blvd, League City, TX 77573, United States',
    phone: '(832) 598-3782',
    hours: { es: 'Abierto 24 horas', en: 'Open 24 hours' },
    mapLink: generateMapUrl('2600 South Shore Blvd, League City, TX 77573, United States'),
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
].sort((a, b) => {
  if (a.id === 'houston-principal') return -1;
  if (b.id === 'houston-principal') return 1;
  if (a.city < b.city) return -1;
  if (a.city > b.city) return 1;
  return 0;
}).map(office => ({
    ...office,
    id: office.id || office.city.toLowerCase().replace(/\s/g, '-'),
    virtual: VIRTUAL_OFFICE_IDS.has(office.id),
}));

// --- MINI COMPONENTE: ACCIÓN HUD ---
const ActionHUD = ({ label, value, icon: Icon, href }: { label: string, value: string, icon: React.ElementType, href: string }) => {
    const isLink = href && href !== '#';
    const isExternal = isLink && (href.startsWith('http') || href.startsWith('tel'));
    const isTel = isLink && href.startsWith('tel');

    const handleClick = () => {
      if (isTel) {
        pushToDataLayer('phone_click', {
          event_category: 'conversion',
          event_label: 'office_phone_button',
          phone_number: value,
        });
        trackConversion('phone_click', 'office_phone_button');
      }
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

    if (!isLink) {
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
        target={isExternal && !isTel ? "_blank" : undefined}
        rel={isExternal && !isTel ? "noopener noreferrer" : undefined}
        className="block p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-[#B2904D]/10 transition-all duration-300 group relative overflow-hidden"
        style={{ transitionProperty: 'background-color, transform' }}
      >
        {inner}
      </a>
    );
};

// --- AGRUPACIÓN POR ESTADO → CIUDAD ---
const HOUSTON_IDS = ['houston-principal', 'houston-accidentes', 'houston-bellaire', 'houston-kirby', 'league-city', 'houston-main', 'houston-north-loop', 'houston-northchase'];
const OTHER_STATES = [
  { code: 'IL', label: 'Illinois' },
  { code: 'TN', label: 'Tennessee' },
  { code: 'CO', label: 'Colorado' },
  { code: 'CA', label: 'California' },
];

// --- COMPONENTE PRINCIPAL (client island) ---
// Server-first split (Fase 2.2c): the section, static background and heading now
// live in the server wrapper Offices.tsx. This island keeps the interactive
// explorer (selector + animated detail panel + live open/closed status). The
// animated background orbs + the resize/isDesktop listener were dropped (static
// bg on the server) — fewer client effects.
export default function OfficesExplorer({ lang }: { lang: Language }) {
  const language = lang;

  const [activeId, setActiveId] = useState(officesData[0].id);
  const activeOffice = officesData.find(o => o.id === activeId) || officesData[0];
  const [isOfficeOpen, setIsOfficeOpen] = useState(false);

  // --- LÓGICA DE STATUS (live open/closed) ---
  useEffect(() => {
    const checkTime = () => {
        const now = new Date();
        const hour = now.getHours();
        // Abierto de 9 AM (9) a 7 PM (19)
        setIsOfficeOpen(hour >= 9 && hour < 19);
    };
    checkTime();
    const interval = setInterval(checkTime, 60000); // Revisar cada minuto
    return () => clearInterval(interval);
  }, []);

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
                        <p className={`text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 ${isOfficeOpen ? 'text-green-400' : 'text-red-400'}`}>
                            STATUS 
                            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isOfficeOpen ? 'bg-green-500' : 'bg-red-500'}`} />
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
                             {' '} {isOfficeOpen ? 'ACTIVE' : 'OFFLINE'}
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
                         <ActionHUD label={language === 'es' ? 'Línea Directa' : 'Direct Line'} value={activeOffice.phone} icon={Phone} href={`tel:+1${activeOffice.phone.replace(/[^0-9]/g, '')}`} />
                         <ActionHUD label={language === 'es' ? 'Horario Operativo' : 'Operating Hours'} value={gT(activeOffice.hours)} icon={Clock} href="#" />
                      </div>
                   </div>
                   
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
  );
}