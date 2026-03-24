'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { track } from '@vercel/analytics/react' // 👈 Importamos track
import { officesPhoneMap, DEFAULT_PHONE, DEFAULT_PHONE_LINK } from './officesPhoneMap'
import { pushToDataLayer, trackConversion } from '../lib/tracking'

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

export default function HeaderProfessional() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [openMobileState, setOpenMobileState] = useState<string | null>(null);
  const [openMobileCity, setOpenMobileCity] = useState<string | null>(null);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

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
    // Vercel Analytics
    track('Call Header Click', {
      phoneNumber: phoneNumber,
      location: 'header_main',
      page: pathname || 'unknown',
      timestamp: new Date().toISOString()
    });

    // FASE 3: dataLayer push para GTM → GA4
    pushToDataLayer('phone_click', {
      event_category: 'conversion',
      event_label: 'header_phone_button',
      phone_number: phoneNumber,
    });

    // FASE 4: Flight Check (tracking propio)
    trackConversion('phone_click', 'header_phone_button');
  };

  const callText = language === 'es' ? 'Llámanos para una consulta:' : 'Call for a consultation:';
  const joinInText = language === 'es' ? 'REGÍSTRATE' : 'REGISTER';

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
      cities: [{ name: 'Chicago', href: `/${language}/oficinas/chicago` }],
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
      submenu: language === 'es'
        ? [
            { name: 'Inmigración', href: `/${language}/servicios/inmigracion` },
            { name: '— Visa U', href: `/${language}/servicios/visa-u` },
            { name: '— VAWA', href: `/${language}/servicios/vawa` },
            { name: '— Defensa Deportación', href: `/${language}/servicios/defensa-deportacion` },
            { name: '— Asilo', href: `/${language}/servicios/asilo` },
            { name: 'Accidentes', href: `/${language}/servicios/accidentes` },
            { name: 'Seguros', href: `/${language}/servicios/seguros` },
            { name: 'Ley Criminal', href: `/${language}/servicios/ley-criminal` },
            { name: 'Familia', href: `/${language}/servicios/familia` },
            { name: 'Inversionistas', href: `/${language}/servicios/visa-e2` },
          ]
        : [
            { name: 'Immigration', href: `/${language}/servicios/inmigracion` },
            { name: '— U Visa', href: `/${language}/servicios/visa-u` },
            { name: '— VAWA', href: `/${language}/servicios/vawa` },
            { name: '— Deportation Defense', href: `/${language}/servicios/defensa-deportacion` },
            { name: '— Asylum', href: `/${language}/servicios/asilo` },
            { name: 'Accidents', href: `/${language}/servicios/accidentes` },
            { name: 'Insurance', href: `/${language}/servicios/seguros` },
            { name: 'Criminal Law', href: `/${language}/servicios/ley-criminal` },
            { name: 'Family', href: `/${language}/servicios/familia` },
            { name: 'Investors', href: `/${language}/servicios/visa-e2` },
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
      href: `/${language}/Testimonios`,
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
      submenu: language === 'es'
        ? [
            { name: 'Nuestro Equipo', href: `/${language}/abogados` },
            { name: 'Sobre Nosotros', href: `/${language}/nosotros` },
            { name: 'Preguntas Frecuentes', href: `/${language}/informacion/faq` },
          ]
        : [
            { name: 'Our Team', href: `/${language}/abogados` },
            { name: 'About Us', href: `/${language}/nosotros` },
            { name: 'FAQ', href: `/${language}/informacion/faq` },
          ]
    },
    { 
      name: language === 'es' ? 'Acceso Clientes' : 'Client Access',
      href: 'https://solislawfirm.com',
      type: 'external' 
    },
  ];

  const toggleLang = (lang: 'es' | 'en') => {
    setLanguage(lang);
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
      <motion.header
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
            
            <Link href={`/${language}`} className="relative z-50 mr-6 xl:mr-12">
              <div className={`relative transition-all duration-500 ease-in-out ${isScrolled ? 'w-[120px] xl:w-[140px]' : 'w-[150px] xl:w-[190px]'}`}>
                <Image
                  src="/logo-manuel-solis.png" 
                  alt="Logo Manuel Solis"
                  width={200} 
                  height={65}
                  className="w-full h-auto object-contain opacity-100" 
                  priority
                />
              </div>
            </Link>

            <div className="hidden lg:flex items-center">
              <nav aria-label="Main navigation" className="flex items-center gap-4 xl:gap-7">
                {menuItems.map((item) => (
                  <div key={item.name} className="relative group">
                    <div className="flex items-center gap-1 cursor-pointer py-3">
                      {item.submenu ? (
                        <span className="text-[10px] xl:text-[12px] font-light uppercase tracking-[0.12em] xl:tracking-[0.2em] text-white/95 group-hover:text-white transition-colors duration-200">
                          {item.name}
                        </span>
                      ) : item.type === 'external' ? (
                        renderLink(item)
                      ) : (
                        <Link 
                          href={item.href}
                          className="text-[10px] xl:text-[12px] font-light uppercase tracking-[0.12em] xl:tracking-[0.2em] text-white/95 group-hover:text-white transition-colors duration-200"
                        >
                          {item.name}
                        </Link>
                      )}
                      {item.submenu && (
                        <ChevronDown className="w-2.5 h-2.5 text-white/60 group-hover:text-white transition-transform duration-300 group-hover:rotate-180" />
                      )}
                    </div>
                    
                    <span className="absolute bottom-1 left-0 w-0 h-[0.5px] bg-sky-200 transition-all duration-300 ease-out group-hover:w-full" />

                    {item.submenu && item.key === 'offices' && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60]">
                        <div className="w-[640px] bg-[#0b1c33]/95 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/40 py-6 px-8 border border-white/10">
                          <div className="flex gap-8">
                            {/* Texas - columna izquierda */}
                            <div className="flex-1 min-w-0 pl-2">
                              <h4 className="text-xs font-bold text-[#B2904D] uppercase tracking-[0.2em] mb-4 pb-2 border-b border-[#B2904D]/20">Texas</h4>
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

                            {/* Otros estados - columna derecha */}
                            <div className="w-[190px] space-y-5 flex-shrink-0">
                              {officeNav.slice(1).map((stateGroup) => (
                                <div key={stateGroup.state}>
                                  <h4 className="text-xs font-bold text-[#B2904D] uppercase tracking-[0.2em] mb-2 pb-1.5 border-b border-[#B2904D]/20">{stateGroup.state}</h4>
                                  {stateGroup.cities.map((city) => (
                                    <Link key={city.name} href={city.href} className="group/item flex items-center px-3 py-[7px] rounded-lg hover:bg-white/8 transition-colors duration-200">
                                      <span className="text-[13px] font-normal text-white/80 group-hover/item:text-white uppercase tracking-[0.1em] transition-colors duration-200">{city.name}</span>
                                    </Link>
                                  ))}
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
                      <div className="absolute top-full left-0 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 perspective-[1000px]">
                        <div className="min-w-[240px] bg-[#0b1c33]/95 backdrop-blur-md rounded-xl shadow-xl py-3 px-2 border border-white/10 transform origin-top">
                          {item.submenu.map((subItem) => (
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
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            <div className="hidden lg:flex items-center gap-6 ml-auto">
              <div className="h-6 w-[0.5px] bg-white/20" />

              <div className="relative group">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-2 text-[10px] font-light text-white/80 hover:text-white uppercase tracking-[0.2em] transition-colors duration-200"
                >
                  {language === 'es' ? <FlagES /> : <FlagUS />}
                  <span>{language === 'es' ? 'ES' : 'EN'}</span>
                </button>

                <AnimatePresence>
                  {isLangMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-4 w-32 bg-[#0b1c33]/95 backdrop-blur-md rounded-xl shadow-xl border border-white/10 overflow-hidden p-1"
                    >
                      <button onClick={() => toggleLang('es')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-colors">
                        <FlagES /> <span className="text-[10px] font-light text-white tracking-widest">ESP</span>
                      </button>
                      <button onClick={() => toggleLang('en')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-colors">
                        <FlagUS /> <span className="text-[10px] font-light text-white tracking-widest">ENG</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link 
                  href={`/${language}/join-in`}
                  className="text-[10px] font-medium uppercase tracking-[0.15em] bg-[#B2904D] text-[#001026] px-4 py-2 rounded-lg transition-all duration-200 hover:opacity-90 shadow-sm hover:translate-y-[-1px]"
              >
                {joinInText}
              </Link>
            </div>

            {/* --- 3. BOTÓN MÓVIL CON CLICK --- */}
            <div className="lg:hidden flex items-center gap-4 ml-auto">
              {/* ✅ AQUÍ AÑADÍ EL EVENTO DE CLICK PARA MÓVIL */}
              <a 
                href={phoneLink}
                onClick={handleCallClick} 
                className="flex items-center gap-2 text-sky-300 hover:text-white transition-colors"
                aria-label="Call us"
              >
                <Phone size={16} />
                <span className="text-xs font-medium tracking-wider">{phoneNumber}</span>
              </a>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
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
            <a 
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

      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-40 bg-[#051120]/98 backdrop-blur-md lg:hidden`}
          >
            <div className="flex flex-col pt-24 px-8 h-full">
              <nav className="flex flex-col space-y-6 overflow-y-auto max-h-[80vh] pb-10">
                {menuItems.map((item) => (
                  <div key={item.name} className="border-b border-white/5 pb-4 group">
                    <div 
                      className="flex justify-between items-center text-white/90 group-hover:text-white text-lg font-thin uppercase tracking-[0.2em] cursor-pointer"
                      onClick={() => item.submenu && setOpenSubmenu(openSubmenu === item.key ? null : item.key)}
                    >
                      {item.submenu ? (
                        <span>{item.name}</span>
                      ) : (
                        renderLink(item, true)
                      )}
                      {item.submenu && <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${openSubmenu === item.key ? 'rotate-180' : 'opacity-50'}`} />}
                    </div>
                    
                    <AnimatePresence>
                      {item.submenu && openSubmenu === item.key && (
                        <motion.div
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
                                    onClick={() => setOpenMobileState(openMobileState === stateGroup.state ? null : stateGroup.state)}
                                    className="flex justify-between items-center w-full text-xs text-[#B2904D] font-bold uppercase tracking-[0.15em] py-1.5"
                                  >
                                    {stateGroup.state}
                                    <ChevronDown className={`w-2.5 h-2.5 transition-transform duration-300 ${openMobileState === stateGroup.state ? 'rotate-180' : 'opacity-50'}`} />
                                  </button>
                                  <AnimatePresence>
                                    {openMobileState === stateGroup.state && (
                                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden ml-3 border-l border-white/5 pl-3 space-y-1 py-1">
                                        {stateGroup.cities.map(city =>
                                          city.subOffices ? (
                                            <div key={city.name}>
                                              <button
                                                onClick={() => setOpenMobileCity(openMobileCity === city.name ? null : city.name)}
                                                className="flex justify-between items-center w-full text-xs text-gray-300 font-medium uppercase tracking-[0.12em] py-1 hover:text-white transition-colors"
                                              >
                                                {city.name}
                                                <ChevronDown className={`w-2 h-2 transition-transform duration-300 ${openMobileCity === city.name ? 'rotate-180' : 'opacity-50'}`} />
                                              </button>
                                              <AnimatePresence>
                                                {openMobileCity === city.name && (
                                                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden ml-3 border-l border-white/5 pl-3 space-y-1 py-1">
                                                    {city.subOffices.map(sub => (
                                                      <Link key={sub.name} href={sub.href} onClick={() => setIsMenuOpen(false)} className="block text-[11px] text-gray-400 font-light uppercase tracking-[0.12em] hover:text-white transition-colors py-0.5">
                                                        {sub.name}
                                                      </Link>
                                                    ))}
                                                  </motion.div>
                                                )}
                                              </AnimatePresence>
                                            </div>
                                          ) : (
                                            <Link key={city.name} href={city.href} onClick={() => setIsMenuOpen(false)} className="block text-xs text-gray-400 font-light uppercase tracking-[0.12em] hover:text-white transition-colors py-1">
                                              {city.name}
                                            </Link>
                                          )
                                        )}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ))}
                            </>
                          ) : (
                            item.submenu.map(sub => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-xs text-gray-400 font-light uppercase tracking-[0.15em] hover:text-white transition-colors"
                              >
                                {sub.name}
                              </Link>
                            ))
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                
                <div className="pt-4 flex flex-col gap-4">
                    <Link 
                      href={`/${language}/join-in`}
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full text-center text-[14px] font-medium uppercase tracking-[0.2em] bg-[#B2904D] text-[#001026] px-4 py-3 rounded-xl transition-all duration-300 hover:opacity-90 shadow-md"
                    >
                      {language === 'es' ? 'INICIAR CONSULTA' : 'START CONSULTATION'}
                    </Link>

                    <div className="flex gap-2">
                      <button onClick={() => toggleLang('es')} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm tracking-widest transition-all ${language === 'es' ? 'text-white font-bold bg-white/10 border border-white/20' : 'text-gray-400 font-medium bg-white/5 border border-transparent'}`}>
                        <FlagES /> ESP
                      </button>
                      <button onClick={() => toggleLang('en')} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm tracking-widest transition-all ${language === 'en' ? 'text-white font-bold bg-white/10 border border-white/20' : 'text-gray-400 font-medium bg-white/5 border border-transparent'}`}>
                        <FlagUS /> ENG
                      </button>
                    </div>
                </div>

              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}