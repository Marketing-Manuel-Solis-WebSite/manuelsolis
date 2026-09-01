'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, Phone, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { m, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { officesPhoneMap, DEFAULT_PHONE, DEFAULT_PHONE_LINK } from './officesPhoneMap'
import { fireConversion } from '../lib/conversion'
import { useDialog } from './useDialog'
import { BRAND_LOGO } from '../lib/brandLogo';

const FlagES = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-3 w-3 rounded-[1px] flex-shrink-0 opacity-90">
    <path fill="#AA151B" d="M0 0h512v512H0z"/>
    <path fill="#F1BF00" d="M0 128h512v256H0z"/>
  </svg>
);

const FlagUS = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-3 w-3 rounded-[1px] flex-shrink-0 opacity-90">
    <path fill="#BD3D44" d="M0 0h512v512H0z"/>
    <path stroke="#fff" strokeWidth="37" d="M0 55.3h512M0 129h512M0 202.7h512M0 276.3h512M0 350h512M0 423.7h512"/>
    <path fill="#192F5D" d="M0 0h249.1v249.1H0z"/>
  </svg>
);

type SubmenuItem = { name: string; href: string; group?: string };

/**
 * Parte un submenú en columnas por `group`, conservando el orden de las entradas.
 * Un submenú sin `group` —Abogados, Oficinas— sale como una sola columna sin
 * encabezado, igual que antes de que existiera esto.
 */
function agruparSubmenu(submenu: readonly SubmenuItem[]): { label?: string; items: SubmenuItem[] }[] {
  const grupos: { label?: string; items: SubmenuItem[] }[] = [];
  for (const entrada of submenu) {
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo.label === entrada.group) ultimo.items.push(entrada);
    else grupos.push({ label: entrada.group, items: [entrada] });
  }
  return grupos;
}

export default function HeaderProfessional() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
  const [openMobileState, setOpenMobileState] = useState<string | null>(null);
  const [openMobileCity, setOpenMobileCity] = useState<string | null>(null);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const dropdownTriggers = useRef<Record<string, HTMLButtonElement | null>>({});
  // Al cerrar con Escape devolvemos el foco al disparador; ese foco no debe reabrir el panel.
  const skipFocusOpen = useRef(false);

  // El panel móvil es un diálogo modal: Escape, foco atrapado, scroll bloqueado.
  const mobileMenuRef = useDialog<HTMLDivElement>(isMenuOpen, () => setIsMenuOpen(false));

  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // El Header sobrevive a la navegación cliente: un panel abierto quedaría flotando.
  useEffect(() => {
    setOpenDesktopDropdown(null);
  }, [pathname]);

  // 1024px = breakpoint `lg`: al pasar a escritorio el panel móvil deja de pintarse,
  // así que hay que cerrarlo o el scroll del body quedaría bloqueado sin diálogo visible.
  useEffect(() => {
    if (!isMenuOpen) return;
    const desktop = window.matchMedia('(min-width: 1024px)');
    if (desktop.matches) {
      setIsMenuOpen(false);
      return;
    }
    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMenuOpen(false);
    };
    desktop.addEventListener('change', handleBreakpointChange);
    return () => desktop.removeEventListener('change', handleBreakpointChange);
  }, [isMenuOpen]);

  // Obtener el teléfono dinámico basado en la ruta actual
  const { phoneNumber, phoneLink } = useMemo(() => {
    // Verificación de seguridad para pathname
    const currentPath = pathname || '';
    const officeMatch = currentPath.match(/\/oficinas\/([^/]+)/);
    const officeSlug = officeMatch?.[1];
    
    if (officeSlug && officesPhoneMap[officeSlug]) {
      const phone = officesPhoneMap[officeSlug];
      return {
        phoneNumber: phone,
        phoneLink: `tel:+1${phone.replace(/\D/g, '')}`
      };
    }
    
    return {
      phoneNumber: DEFAULT_PHONE,
      phoneLink: DEFAULT_PHONE_LINK
    };
  }, [pathname]);

  // --- ⚡️ EVENTO DE RASTREO DE LLAMADA ⚡️ ---
  const handleCallClick = () => {
    // Fanout unificado: Vercel + dataLayer + Meta + TikTok + Flight Check
    fireConversion('phone_click', 'header_phone_button', {
      location: 'header_main',
      phone_number: phoneNumber,
      page: pathname || 'unknown',
    });
  };

  const callText = language === 'es' ? 'Llámanos para una consulta:' : 'Call for a consultation:';

  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldBeScrolled = latest > 20;
    if (isScrolled !== shouldBeScrolled) {
        setIsScrolled(shouldBeScrolled);
    }
  });

  // Estructura de oficinas agrupadas por Estado → Ciudad
  const officeNav: { state: string; cities: { name: string; href: string; subOffices?: { name: string; href: string }[] }[] }[] = [
    {
      state: 'Texas',
      cities: [
        {
          name: 'Houston',
          href: `/${language}/oficinas/houston-principal`,
          subOffices: [
            { name: 'Houston Principal', href: `/${language}/oficinas/houston-principal` },
            { name: 'Houston Accidentes', href: `/${language}/oficinas/houston-accidentes` },
            { name: 'Bellaire', href: `/${language}/oficinas/houston-bellaire` },
            { name: 'Kirby', href: `/${language}/oficinas/kirby` },
            { name: 'League City', href: `/${language}/oficinas/league-city` },
            { name: 'Main St', href: `/${language}/oficinas/main-st` },
            { name: 'North Loop', href: `/${language}/oficinas/north-loop` },
            { name: 'Northchase', href: `/${language}/oficinas/northchase` },
          ],
        },
        { name: 'Dallas', href: `/${language}/oficinas/dallas` },
        { name: 'El Paso', href: `/${language}/oficinas/el-paso` },
        { name: 'Harlingen', href: `/${language}/oficinas/harlingen` },
      ],
    },
    {
      state: 'California',
      cities: [{ name: 'Los Angeles', href: `/${language}/oficinas/losangeles` }],
    },
    {
      state: 'Illinois',
      cities: [
        {
          // Mismo desglose que Houston: la ciudad de referencia abre y las
          // direcciones del área se listan por su calle. Es literalmente lo que
          // pidió el despacho al dar de alta las cinco nuevas.
          name: 'Chicago',
          href: `/${language}/oficinas/chicago`,
          // Etiquetas = nombre de la calle, que es como las pidió el despacho y
          // además es lo que cabe en la columna de 210 px del desplegable. La
          // principal va por su calle igual que las demás: está en Cermak Rd.
          subOffices: [
            { name: 'Cermak', href: `/${language}/oficinas/chicago` },
            { name: 'Wacker', href: `/${language}/oficinas/chicago-wacker` },
            { name: 'Martingale', href: `/${language}/oficinas/chicago-martingale` },
            { name: 'Prospect', href: `/${language}/oficinas/chicago-prospect` },
            { name: 'Burr Ridge', href: `/${language}/oficinas/chicago-burr-ridge` },
            { name: 'Wall', href: `/${language}/oficinas/chicago-wall` },
          ],
        },
      ],
    },
    {
      state: 'Colorado',
      cities: [{ name: 'Arvada (Denver)', href: `/${language}/oficinas/arvada` }],
    },
    {
      state: 'Tennessee',
      cities: [{ name: 'Memphis', href: `/${language}/oficinas/memphis` }],
    },
  ];

  const menuItems = [
    { 
      name: language === 'es' ? 'Servicios' : 'Services',
      href: '', 
      type: 'dropdown',
      key: 'services',
      // Las cuatro de inmigración que no estaban aquí (deportación, asilo, VAWA,
      // Visa U) recibían 11-18 enlaces entrantes contra los 173 de las que sí
      // salen en el menú. Van agrupadas y no en una lista plana de diez porque
      // el lado de inmigración va a crecer: `group` es lo que parte el
      // desplegable en columnas, y basta añadir entradas al mismo grupo.
      submenu: language === 'es'
        ? [
            { group: 'Inmigración', name: 'Inmigración', href: `/${language}/servicios/inmigracion` },
            { group: 'Inmigración', name: 'Defensa de Deportación', href: `/${language}/servicios/defensa-deportacion` },
            { group: 'Inmigración', name: 'Asilo', href: `/${language}/servicios/asilo` },
            { group: 'Inmigración', name: 'VAWA', href: `/${language}/servicios/vawa` },
            { group: 'Inmigración', name: 'Visa U', href: `/${language}/servicios/visa-u` },
            { group: 'Otras áreas', name: 'Accidentes', href: `/${language}/servicios/accidentes` },
            { group: 'Otras áreas', name: 'Seguros', href: `/${language}/servicios/seguros` },
            { group: 'Otras áreas', name: 'Ley Criminal', href: `/${language}/servicios/ley-criminal` },
            { group: 'Otras áreas', name: 'Familia', href: `/${language}/servicios/familia` },
            { group: 'Otras áreas', name: 'Inversionistas', href: `/${language}/servicios/visa-e2` },
          ]
        : [
            { group: 'Immigration', name: 'Immigration', href: `/${language}/servicios/inmigracion` },
            { group: 'Immigration', name: 'Deportation Defense', href: `/${language}/servicios/defensa-deportacion` },
            { group: 'Immigration', name: 'Asylum', href: `/${language}/servicios/asilo` },
            { group: 'Immigration', name: 'VAWA', href: `/${language}/servicios/vawa` },
            { group: 'Immigration', name: 'U Visa', href: `/${language}/servicios/visa-u` },
            { group: 'Other areas', name: 'Accidents', href: `/${language}/servicios/accidentes` },
            { group: 'Other areas', name: 'Insurance', href: `/${language}/servicios/seguros` },
            { group: 'Other areas', name: 'Criminal Law', href: `/${language}/servicios/ley-criminal` },
            { group: 'Other areas', name: 'Family', href: `/${language}/servicios/familia` },
            { group: 'Other areas', name: 'Investors', href: `/${language}/servicios/visa-e2` },
          ]
    },
    {
      name: language === 'es' ? 'Detenidos' : 'Detained',
      href: `/${language}/clientes-detenidos`,
      type: 'link'
    },
    {
      name: language === 'es' ? 'Oficinas' : 'Offices',
      href: `/${language}/oficinas`,
      type: 'dropdown',
      key: 'offices',
      submenu: [{ name: 'offices-marker', href: `/${language}/oficinas` }]
    },
    {
      name: language === 'es' ? 'Testimonios' : 'Testimonials',
      href: `/${language}/testimonios`,
      type: 'link'
    },
    {
      name: 'Blog',
      href: `/${language}/blog`,
      type: 'link'
    },
    {
      name: language === 'es' ? 'Abogados' : 'Attorneys',
      href: '', 
      type: 'dropdown',
      key: 'attorneys',
      // /informacion/recursos (el banco de preguntas de civismo) vive aquí junto a
      // sus hermanas de /informacion: era la única página pública sin ningún
      // enlace interno que la alcanzara, así que solo se descubría por sitemap.
      submenu: language === 'es'
        ? [
            { name: 'Nuestro Equipo', href: `/${language}/abogados` },
            { name: 'Sobre Nosotros', href: `/${language}/nosotros` },
            { name: 'Preguntas Frecuentes', href: `/${language}/informacion/faq` },
            { name: 'Examen de Ciudadanía', href: `/${language}/informacion/recursos` },
            { name: 'Noticias Legales', href: `/${language}/informacion/noticias` },
          ]
        : [
            { name: 'Our Team', href: `/${language}/abogados` },
            { name: 'About Us', href: `/${language}/nosotros` },
            { name: 'FAQ', href: `/${language}/informacion/faq` },
            { name: 'Citizenship Test', href: `/${language}/informacion/recursos` },
            { name: 'Legal News', href: `/${language}/informacion/noticias` },
          ]
    },
    {
      name: language === 'es' ? 'Acceso Clientes' : 'Client Access',
      href: `/${language}/acceso-clientes`,
      type: 'link'
    },
  ];

  // La query (?utm_source, gclid…) y el fragmento deben sobrevivir al cambio de
  // idioma o se pierde la atribución de la visita. No se puede leer
  // window.location en el primer render (rompería la hidratación), así que se
  // captura al montar y en cada cambio de URL.
  const [urlSuffix, setUrlSuffix] = useState('');

  useEffect(() => {
    const readSuffix = () => setUrlSuffix(window.location.search + window.location.hash);
    readSuffix();
    window.addEventListener('popstate', readSuffix);
    window.addEventListener('hashchange', readSuffix);
    return () => {
      window.removeEventListener('popstate', readSuffix);
      window.removeEventListener('hashchange', readSuffix);
    };
  }, [pathname]);

  // Los CTAs flotantes (fixed z-50) se montan fuera del árbol del Header, en el
  // layout, así que quedarían por encima de este panel modal (z-40) y taparían
  // sus últimos enlaces. FloatingCtas.tsx escucha este mismo nombre de evento.
  useEffect(() => {
    const notify = (open: boolean) => {
      window.dispatchEvent(new CustomEvent<boolean>('msolis:mobile-menu-toggle', { detail: open }));
    };
    notify(isMenuOpen);
    if (!isMenuOpen) return;
    // Si el Header se desmonta con el panel abierto, los flotantes deben volver.
    return () => {
      notify(false);
    };
  }, [isMenuOpen]);

  // Ruta equivalente en el otro idioma. El switcher usa <Link href> real
  // (no button+router.push) para que exista un enlace es↔en rastreable.
  const langPath = (target: 'es' | 'en') => {
    const rest = pathname.split('/').slice(2).join('/');
    return `/${target}${rest ? '/' + rest : ''}${urlSuffix}`;
  };

  const onLangLinkClick = (target: 'es' | 'en') => {
    // El proxy usa NEXT_LOCALE para URLs sin prefijo en visitas posteriores.
    document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000`;
    setIsLangMenuOpen(false);
    setIsMenuOpen(false);
  };

  const renderLink = (item: typeof menuItems[0], isMobile: boolean = false) => {
    if (item.type === 'external') {
      return (
        <a 
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => isMobile && setIsMenuOpen(false)}
          className={`
            ${isMobile ? 
              'block text-white/90 group-hover:text-white text-lg font-thin uppercase tracking-[0.2em]' : 
              'text-[10px] xl:text-[12px] font-light uppercase tracking-[0.12em] xl:tracking-[0.2em] text-white/95 group-hover:text-white transition-all duration-300 drop-shadow-sm'
            }
          `}
        >
          {item.name}
        </a>
      );
    }

    return (
      <Link 
        href={item.href}
        onClick={() => isMobile && setIsMenuOpen(false)}
        className={`
          ${isMobile ? 
            'block text-white/90 group-hover:text-white text-lg font-thin uppercase tracking-[0.2em]' : 
            'text-[10px] xl:text-[12px] font-light uppercase tracking-[0.12em] xl:tracking-[0.2em] text-white/95 group-hover:text-white transition-all duration-300 drop-shadow-sm'
          }
        `}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <>
      <m.header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 w-full flex flex-col`}
        style={{ willChange: "transform, background-color, backdrop-filter" }}
        initial={{ backgroundColor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)' }}
        animate={{
          backgroundColor: isScrolled ? 'rgba(5, 15, 30, 0.85)' : 'rgba(0,0,0,0)',
          backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div 
          className="w-full transition-all duration-300 relative z-50"
          style={{ 
            paddingTop: isScrolled ? '0.5rem' : '0.75rem', 
            paddingBottom: isScrolled ? '0.5rem' : '0.75rem' 
          }}
        >
          <div className="container mx-auto px-6 lg:px-12 flex items-center">
            
            <Link href={`/${language}`} className="relative z-50 mr-6 xl:mr-12 block">
              {/* El enlace no tiene texto: este alt es su único nombre accesible y el
                  único anchor que Google lee, así que nombra el destino (la portada),
                  no solo la marca. */}
              <Image
                src={BRAND_LOGO.src}
                alt={language === 'es' ? 'Manuel Solis Law Firm — Página de inicio' : 'Manuel Solis Law Firm — Home page'}
                width={BRAND_LOGO.width}
                height={BRAND_LOGO.height}
                className="object-contain transition-all duration-500 ease-in-out"
                style={{
                  height: isScrolled ? '40px' : '52px',
                  width: 'auto',
                  maxWidth: '100%',
                }}
                priority
              />
            </Link>

            <div className="hidden lg:flex items-center flex-1 min-w-0">
              <nav aria-label={language === 'es' ? 'Navegación principal' : 'Main navigation'} className="flex items-center gap-4 xl:gap-7">
                {menuItems.map((item) => {
                  if (item.type === 'external') {
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[#B2904D] hover:text-[#D4A94E] transition-colors duration-200"
                      >
                        <span className="flex flex-col leading-[1.05] text-[10px] xl:text-[12px] font-medium uppercase tracking-[0.12em] xl:tracking-[0.2em] text-left">
                          {item.name.split(' ').map((word, i) => (
                            <span key={i}>{word}</span>
                          ))}
                        </span>
                        <ArrowUpRight className="w-3 h-3 opacity-80" strokeWidth={1.75} />
                      </a>
                    );
                  }

                  const dropdownKey = item.key ?? item.name;
                  const isDropdownOpen = Boolean(item.submenu) && openDesktopDropdown === dropdownKey;

                  return (
                  <div
                    key={item.name}
                    className="relative group"
                    onKeyDown={(event) => {
                      if (event.key !== 'Escape' || openDesktopDropdown !== dropdownKey) return;
                      const trigger = dropdownTriggers.current[dropdownKey];
                      skipFocusOpen.current = trigger !== document.activeElement;
                      trigger?.focus();
                      setOpenDesktopDropdown(null);
                    }}
                    onBlur={(event) => {
                      const next = event.relatedTarget;
                      if (next instanceof Node && event.currentTarget.contains(next)) return;
                      setOpenDesktopDropdown((current) => (current === dropdownKey ? null : current));
                    }}
                  >
                    {item.submenu ? (
                      <button
                        type="button"
                        ref={(node) => { dropdownTriggers.current[dropdownKey] = node; }}
                        aria-haspopup="true"
                        aria-expanded={isDropdownOpen}
                        aria-controls={`desktop-dropdown-${dropdownKey}`}
                        onClick={() => setOpenDesktopDropdown(isDropdownOpen ? null : dropdownKey)}
                        onFocus={(event) => {
                          if (skipFocusOpen.current) {
                            skipFocusOpen.current = false;
                            return;
                          }
                          // El foco por puntero lo resuelve onClick; enfocar solo abre desde el teclado.
                          if (event.currentTarget.matches(':focus-visible')) setOpenDesktopDropdown(dropdownKey);
                        }}
                        className="flex items-center gap-1 cursor-pointer py-3 bg-transparent text-left"
                      >
                        <span className="text-[10px] xl:text-[12px] font-light uppercase tracking-[0.12em] xl:tracking-[0.2em] text-white/95 group-hover:text-white transition-colors duration-200">
                          {item.name}
                        </span>
                        <ChevronDown className={`w-2.5 h-2.5 text-white/60 group-hover:text-white transition-transform duration-300 group-hover:rotate-180 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 cursor-pointer py-3">
                        <Link
                          href={item.href}
                          className="text-[10px] xl:text-[12px] font-light uppercase tracking-[0.12em] xl:tracking-[0.2em] text-white/95 group-hover:text-white transition-colors duration-200"
                        >
                          {item.name}
                        </Link>
                      </div>
                    )}

                    <span className="absolute bottom-1 left-0 w-0 h-[0.5px] bg-sky-200 transition-all duration-300 ease-out group-hover:w-full" />

                    {item.submenu && item.key === 'offices' && (
                      <div
                        id={`desktop-dropdown-${dropdownKey}`}
                        className={`absolute top-full left-1/2 -translate-x-1/2 pt-6 ${isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60]`}
                      >
                        <div className="w-[640px] bg-[#0b1c33]/95 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/40 py-6 px-8 border border-white/10">
                          <div className="flex gap-8">
                            {/* Texas - columna izquierda */}
                            <div className="flex-1 min-w-0 pl-2">
                              <p className="text-xs font-bold text-[#B2904D] uppercase tracking-[0.2em] mb-4 pb-2 border-b border-[#B2904D]/20">Texas</p>
                              {/* Houston group */}
                              <div className="mb-4">
                                <span className="block text-xs font-semibold text-white/80 uppercase tracking-[0.15em] px-4 py-2 bg-white/5 rounded-lg mb-2">Houston</span>
                                <div className="ml-4 pl-4 border-l-2 border-[#B2904D]/25 space-y-0.5">
                                  {officeNav[0].cities[0].subOffices?.map((sub) => (
                                    <Link key={sub.name} href={sub.href} className="group/item flex items-center px-4 py-[7px] rounded-lg hover:bg-white/8 transition-colors duration-200">
                                      <span className="text-[13px] font-normal text-white/80 group-hover/item:text-white uppercase tracking-[0.1em] transition-colors duration-200">{sub.name}</span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                              {/* Otras ciudades de Texas */}
                              <div className="space-y-0.5 pt-2 border-t border-white/5">
                                {officeNav[0].cities.slice(1).map((city) => (
                                  <Link key={city.name} href={city.href} className="group/item flex items-center px-4 py-[7px] rounded-lg hover:bg-white/8 transition-colors duration-200">
                                    <span className="text-[13px] font-normal text-white/80 group-hover/item:text-white uppercase tracking-[0.1em] transition-colors duration-200">{city.name}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>

                            {/* Separador */}
                            <div className="w-px bg-white/10 self-stretch" />

                            {/*
                              Otros estados - columna derecha.

                              Renderiza `subOffices` cuando una ciudad las tiene,
                              con el mismo patrón anidado que Houston. Antes solo
                              pintaba `city.name`, así que al dar de alta las
                              cinco direcciones del área de Chicago quedaron
                              INVISIBLES en escritorio: estaban en los datos y en
                              el menú móvil, y aquí se caían sin que nada fallara.
                            */}
                            <div className="w-[210px] space-y-5 flex-shrink-0">
                              {officeNav.slice(1).map((stateGroup) => (
                                <div key={stateGroup.state}>
                                  <p className="text-xs font-bold text-[#B2904D] uppercase tracking-[0.2em] mb-2 pb-1.5 border-b border-[#B2904D]/20">{stateGroup.state}</p>
                                  {stateGroup.cities.map((city) =>
                                    city.subOffices ? (
                                      <div key={city.name} className="mb-2">
                                        <span className="block text-xs font-semibold text-white/80 uppercase tracking-[0.15em] px-3 py-1.5 bg-white/5 rounded-lg mb-1.5">
                                          {city.name}
                                        </span>
                                        <div className="ml-2 pl-3 border-l-2 border-[#B2904D]/25 space-y-0.5">
                                          {city.subOffices.map((sub) => (
                                            <Link key={sub.name} href={sub.href} className="group/item flex items-center px-3 py-[6px] rounded-lg hover:bg-white/8 transition-colors duration-200">
                                              <span className="text-[13px] font-normal text-white/80 group-hover/item:text-white uppercase tracking-[0.1em] transition-colors duration-200">{sub.name}</span>
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    ) : (
                                      <Link key={city.name} href={city.href} className="group/item flex items-center px-3 py-[7px] rounded-lg hover:bg-white/8 transition-colors duration-200">
                                        <span className="text-[13px] font-normal text-white/80 group-hover/item:text-white uppercase tracking-[0.1em] transition-colors duration-200">{city.name}</span>
                                      </Link>
                                    ),
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Ver todas las oficinas */}
                          <div className="mt-5 pt-4 border-t border-white/10">
                            <Link href={`/${language}/oficinas`} className="group/item flex items-center justify-center px-4 py-2.5 rounded-xl hover:bg-[#B2904D]/10 transition-colors duration-200">
                              <span className="text-xs font-semibold text-[#B2904D] group-hover/item:text-white uppercase tracking-[0.15em] transition-colors duration-200">
                                {language === 'es' ? 'Ver todas las oficinas' : 'View all offices'} →
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}

                    {item.submenu && item.key !== 'offices' && (
                      <div
                        id={`desktop-dropdown-${dropdownKey}`}
                        className={`absolute top-full left-0 pt-6 ${isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} group-hover:opacity-100 group-hover:visible transition-all duration-200 perspective-[1000px]`}
                      >
                        <div
                          className={`${
                            agruparSubmenu(item.submenu).length > 1
                              ? 'grid grid-cols-2 gap-x-4 min-w-[460px]'
                              : 'min-w-[240px]'
                          } bg-[#0b1c33]/95 backdrop-blur-md rounded-xl shadow-xl py-3 px-2 border border-white/10 transform origin-top`}
                        >
                          {agruparSubmenu(item.submenu).map((grupo) => (
                            <div key={grupo.label ?? 'sin-grupo'}>
                              {grupo.label && (
                                <p className="px-4 pt-1 pb-2 text-[10px] font-bold text-[#B2904D] uppercase tracking-[0.18em]">
                                  {grupo.label}
                                </p>
                              )}
                              {grupo.items.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="group/item flex items-center px-4 py-2.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
                                >
                                  <span className="text-[11px] font-light text-gray-300 group-hover/item:text-white uppercase tracking-[0.12em] transition-colors duration-200">
                                    {subItem.name}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  );
                })}
              </nav>
            </div>

            <div className="hidden lg:flex items-center gap-6 ml-auto flex-shrink-0">
              <div className="h-6 w-[0.5px] bg-white/20" />

              <div className="relative group">
                <button
                  type="button"
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  aria-label={`${language === 'es' ? 'ES' : 'EN'} — ${language === 'es' ? 'Cambiar idioma' : 'Change language'}`}
                  aria-haspopup="true"
                  aria-expanded={isLangMenuOpen}
                  className="flex items-center gap-2 text-[10px] font-light text-white/80 hover:text-white uppercase tracking-[0.2em] transition-colors duration-200"
                >
                  {language === 'es' ? <FlagES /> : <FlagUS />}
                  <span>{language === 'es' ? 'ES' : 'EN'}</span>
                </button>

                <AnimatePresence>
                  {isLangMenuOpen && (
                    <m.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-4 w-32 bg-[#0b1c33]/95 backdrop-blur-md rounded-xl shadow-xl border border-white/10 overflow-hidden p-1"
                    >
                      <Link href={langPath('es')} onClick={() => onLangLinkClick('es')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-colors">
                        <FlagES /> <span className="text-[10px] font-light text-white tracking-widest">ESP</span>
                      </Link>
                      <Link href={langPath('en')} onClick={() => onLangLinkClick('en')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-colors">
                        <FlagUS /> <span className="text-[10px] font-light text-white tracking-widest">ENG</span>
                      </Link>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* --- 3. BOTÓN MÓVIL CON CLICK --- */}
            <div className="lg:hidden flex items-center gap-3 ml-auto">
              {/* Language toggle for mobile */}
              <Link
                href={langPath(language === 'es' ? 'en' : 'es')}
                onClick={() => onLangLinkClick(language === 'es' ? 'en' : 'es')}
                aria-label={`${language === 'es' ? 'ES' : 'EN'} — ${language === 'es' ? 'Cambiar idioma' : 'Change language'}`}
                className="flex items-center gap-1.5 text-[10px] font-light text-white/80 hover:text-white uppercase tracking-[0.15em] transition-colors duration-200 px-2 py-1.5 rounded-lg border border-white/10 active:bg-white/10"
              >
                {language === 'es' ? <FlagUS /> : <FlagES />}
                <span>{language === 'es' ? 'EN' : 'ES'}</span>
              </Link>

              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? (language === 'es' ? 'Cerrar menú' : 'Close menu') : (language === 'es' ? 'Abrir menú' : 'Open menu')}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu-panel"
                className="text-white hover:text-sky-300 transition-colors"
              >
                {isMenuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
              </button>
            </div>
          </div>
        </div>

        {/* --- 4. BARRA SUPERIOR ESCRITORIO CON CLICK --- */}
        <div className="hidden lg:flex justify-center w-full relative z-40">
          <div className="px-16 py-1.5 relative overflow-hidden group border-b-[2px] border-[#009b3a]">
            {/* ✅ AQUÍ AÑADÍ EL EVENTO DE CLICK PARA ESCRITORIO */}
            {/* key={phoneNumber} — NO es cosmético, sostiene la atribución.

              swap.js se mantiene al día con un MutationObserver configurado
              {childList:true, subtree:true} y su callback solo recorre
              addedNodes. React, cuando cambia un texto o un atributo que ya
              existe, lo MUTA en sitio (nodeValue / setAttribute): ese cambio
              no es un nodo añadido y CallRail no se entera.

              Aquí el teléfono es estado derivado de la ruta (useMemo sobre el
              slug de oficina), así que al navegar entre una página de oficina
              y cualquier otra React reescribe el número de CallRail con el
              real. La cuenta tiene session_polling activo cada 60 s, así que
              se recupera solo — pero deja hasta un minuto de ventana en el CTA
              de mayor intención, y ahí es justo donde se llama.

              Cambiar la key fuerza desmontar/montar: el nodo entra como
              addedNode, que es la ruta que el observer sí ve, y el swap se
              rehace en el mismo frame. Se apoya en comportamiento documentado
              del observer, no en API interna de CallRail. */}
              <a
              key={phoneNumber}
              href={phoneLink}
              onClick={handleCallClick}
              className="flex items-center justify-center gap-4 cursor-pointer transition-all duration-300 group/link"
            >
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/90 font-semibold pt-[2px]">
                {callText}
              </span>
              
              <div className="flex items-center gap-2.5">
                  <Phone className="w-5 h-5 text-white transition-transform duration-300 group-hover/link:scale-110" fill="currentColor" />
                  
                  <span 
                    className="text-xl font-extrabold tracking-widest text-white transition-all duration-300"
                  >
                    {phoneNumber}
                  </span>
              </div>
            </a>
          </div>
        </div>

      </m.header>

      <AnimatePresence>
        {isMenuOpen && (
          <m.div
            ref={mobileMenuRef}
            id="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label={language === 'es' ? 'Menú principal' : 'Main menu'}
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-40 bg-[#051120]/98 backdrop-blur-md lg:hidden`}
          >
            <div className="flex flex-col pt-24 px-8 h-full">
              <nav className="flex flex-col space-y-6 overflow-y-auto max-h-[80vh] pb-10">
                {menuItems.map((item) => (
                  item.type === 'external' ? (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between text-[#B2904D] hover:text-[#D4A94E] transition-colors duration-200 border-b border-white/5 pb-4"
                    >
                      <span className="flex flex-col leading-[1.05] text-lg font-thin uppercase tracking-[0.2em]">
                        {item.name.split(' ').map((word, i) => (
                          <span key={i}>{word}</span>
                        ))}
                      </span>
                      <ArrowUpRight className="w-4 h-4 opacity-70" strokeWidth={1.5} />
                    </a>
                  ) : (
                  <div key={item.name} className="border-b border-white/5 pb-4 group">
                    {item.submenu ? (
                      <button
                        type="button"
                        aria-expanded={openSubmenu === item.key}
                        aria-controls={`mobile-submenu-${item.key}`}
                        onClick={() => setOpenSubmenu(openSubmenu === item.key ? null : item.key ?? null)}
                        className="flex justify-between items-center w-full text-left text-white/90 group-hover:text-white text-lg font-thin uppercase tracking-[0.2em] cursor-pointer bg-transparent"
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${openSubmenu === item.key ? 'rotate-180' : 'opacity-50'}`} />
                      </button>
                    ) : (
                      <div className="flex justify-between items-center text-white/90 group-hover:text-white text-lg font-thin uppercase tracking-[0.2em]">
                        {renderLink(item, true)}
                      </div>
                    )}

                    <AnimatePresence>
                      {item.submenu && openSubmenu === item.key && (
                        <m.div
                          id={`mobile-submenu-${item.key}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mt-3 ml-2 border-l-[0.5px] border-white/10 pl-5 space-y-3 pt-2"
                        >
                          {item.key === 'offices' ? (
                            <>
                              <Link href={`/${language}/oficinas`} onClick={() => setIsMenuOpen(false)} className="block text-xs text-[#B2904D] font-medium uppercase tracking-[0.15em] hover:text-white transition-colors mb-2">
                                {language === 'es' ? 'Ver todas las oficinas' : 'View all offices'}
                              </Link>
                              {officeNav.map(stateGroup => (
                                <div key={stateGroup.state} className="mb-1">
                                  <button
                                    type="button"
                                    aria-expanded={openMobileState === stateGroup.state}
                                    onClick={() => setOpenMobileState(openMobileState === stateGroup.state ? null : stateGroup.state)}
                                    className="flex justify-between items-center w-full text-xs text-[#B2904D] font-bold uppercase tracking-[0.15em] py-1.5"
                                  >
                                    {stateGroup.state}
                                    <ChevronDown className={`w-2.5 h-2.5 transition-transform duration-300 ${openMobileState === stateGroup.state ? 'rotate-180' : 'opacity-50'}`} />
                                  </button>
                                  <AnimatePresence>
                                    {openMobileState === stateGroup.state && (
                                      <m.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden ml-3 border-l border-white/5 pl-3 space-y-1 py-1">
                                        {stateGroup.cities.map(city =>
                                          city.subOffices ? (
                                            <div key={city.name}>
                                              <button
                                                type="button"
                                                aria-expanded={openMobileCity === city.name}
                                                onClick={() => setOpenMobileCity(openMobileCity === city.name ? null : city.name)}
                                                className="flex justify-between items-center w-full text-xs text-gray-300 font-medium uppercase tracking-[0.12em] py-1 hover:text-white transition-colors"
                                              >
                                                {city.name}
                                                <ChevronDown className={`w-2 h-2 transition-transform duration-300 ${openMobileCity === city.name ? 'rotate-180' : 'opacity-50'}`} />
                                              </button>
                                              <AnimatePresence>
                                                {openMobileCity === city.name && (
                                                  <m.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden ml-3 border-l border-white/5 pl-3 space-y-1 py-1">
                                                    {city.subOffices.map(sub => (
                                                      <Link key={sub.name} href={sub.href} onClick={() => setIsMenuOpen(false)} className="block text-[11px] text-gray-400 font-light uppercase tracking-[0.12em] hover:text-white transition-colors py-0.5">
                                                        {sub.name}
                                                      </Link>
                                                    ))}
                                                  </m.div>
                                                )}
                                              </AnimatePresence>
                                            </div>
                                          ) : (
                                            <Link key={city.name} href={city.href} onClick={() => setIsMenuOpen(false)} className="block text-xs text-gray-400 font-light uppercase tracking-[0.12em] hover:text-white transition-colors py-1">
                                              {city.name}
                                            </Link>
                                          )
                                        )}
                                      </m.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ))}
                            </>
                          ) : (
                            // En móvil los grupos se apilan: dos columnas de cinco
                            // no caben, y sin encabezado las diez entradas se leen
                            // como una lista sin jerarquía.
                            agruparSubmenu(item.submenu).map(grupo => (
                              <div key={grupo.label ?? 'sin-grupo'} className="space-y-2">
                                {grupo.label && (
                                  <p className="text-[10px] font-bold text-[#B2904D] uppercase tracking-[0.18em] pt-1">
                                    {grupo.label}
                                  </p>
                                )}
                                {grupo.items.map(sub => (
                                  <Link
                                    key={sub.name}
                                    href={sub.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block text-xs text-gray-400 font-light uppercase tracking-[0.15em] hover:text-white transition-colors"
                                  >
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                            ))
                          )}
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                  )
                ))}

                <div className="pt-4 flex flex-col gap-4">
                    <Link
                      href={`/${language}/consulta`}
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full text-center text-[14px] font-medium uppercase tracking-[0.2em] bg-[#B2904D] text-[#001026] px-4 py-3 rounded-xl transition-all duration-300 hover:opacity-90 shadow-md"
                    >
                      {language === 'es' ? 'INICIAR CONSULTA' : 'START CONSULTATION'}
                    </Link>

                    <div className="flex gap-2">
                      <Link href={langPath('es')} onClick={() => onLangLinkClick('es')} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm tracking-widest transition-all ${language === 'es' ? 'text-white font-bold bg-white/10 border border-white/20' : 'text-gray-400 font-medium bg-white/5 border border-transparent'}`}>
                        <FlagES /> ESP
                      </Link>
                      <Link href={langPath('en')} onClick={() => onLangLinkClick('en')} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm tracking-widest transition-all ${language === 'en' ? 'text-white font-bold bg-white/10 border border-white/20' : 'text-gray-400 font-medium bg-white/5 border border-transparent'}`}>
                        <FlagUS /> ENG
                      </Link>
                    </div>
                </div>

                {/* El botón de cerrar del encabezado queda fuera del diálogo: con aria-modal
                    los lectores de pantalla no lo alcanzan, así que el panel lleva el suyo. */}
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="sr-only focus:not-sr-only focus:w-full focus:rounded-xl focus:border focus:border-white/20 focus:px-4 focus:py-3 focus:text-center focus:text-[12px] focus:font-medium focus:uppercase focus:tracking-[0.2em] focus:text-white/90"
                >
                  {language === 'es' ? 'Cerrar menú' : 'Close menu'}
                </button>

              </nav>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}