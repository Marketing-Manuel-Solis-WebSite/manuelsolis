'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, CheckCircle2, Sparkles, Play, User, Quote } from 'lucide-react';
import Image from 'next/image';
import { Outfit } from 'next/font/google';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// --- IMPORTACIONES ---
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

// --- OPTIMIZACIÓN: LAZY LOAD DEL FORMULARIO ---
const ContactForm = dynamic(() => import('../../../components/ContactForm'), {
  loading: () => <div className="w-full h-[600px] bg-[#001540]/50 rounded-2xl animate-pulse border border-white/5" />
});

// --- CONFIGURACIÓN DE FUENTE ---
const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '700', '800', '900'] 
});

// --- DATOS ESPECÍFICOS: ARVADA ---
const officeData = {
  id: 'arvada',
  city: 'Arvada',
  state: 'CO',
  title: { es: 'Arvada, CO Oficina (Área de Denver)', en: 'Arvada, CO Office (Denver Area)' },
  quote: { es: 'Bendecidos con la fuerza y la gracia de Dios, e inspirados por nuestro deseo de ayudar.', en: 'Blessed with the strength and grace of God, and inspired by our desire to help.' },
  description: { es: 'Nuestras oficinas de Arvada, Colorado, (Denver) sirven a una gran población de inmigrantes que se movieron a la parte interior de los Estados Unidos. Siendo Denver un gran centro industrial, muchos residentes permanentes han buscado allí mejor fortuna y ya están preparados para obtener su ciudadanía o están buscando traer a algún familiar a los Estados Unidos. Desde las Oficinas del Abogado Manuel Solís nos ponemos a su disposición para prestarles el servicio.', en: 'Our Arvada, Colorado (Denver) offices serve a large immigrant population that moved to the interior part of the United States. With Denver being a major industrial center, many permanent residents have sought better fortune there and are now ready to obtain their citizenship or are looking to bring a family member to the United States. The Law Offices of Attorney Manuel Solís are at your disposal to provide service.' },
  address: '5400 Ward Rd, Bldg IV, Arvada, CO 80002',
  phone: '(720) 358-8973',
  email: 'denver@manuelsolis.com',
  hours: { es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb: 9:00 AM - 2:00 PM', en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat: 9:00 AM - 2:00 PM' },
  mapLink: 'https://share.google/QbeutobA9WchbNPcu', // URL PROPORCIONADA
  videoUrl: 'https://manuelsolis.com/wp-content/uploads/2023/12/arvada.mov',
  posterImage: '/immigration-hero.png', // Fallback
  services: [
    { es: 'LEY DE INMIGRACIÓN', en: 'IMMIGRATION LAW' },
    { es: 'SEGUROS (ASEGURANZA)', en: 'INSURANCE' },
    { es: 'ACCIDENTES DE AUTO', en: 'CAR ACCIDENTS' },
    { es: 'DEFENSA CRIMINAL', en: 'CRIMINAL DEFENSE' }
  ],
  // --- GERENCIA (SOLO TEXTO) ---
  managers: [
    { name: 'Nombre Gerente', role: { es: 'Gerente de Oficina', en: 'Office Manager' } },
  ],
  // --- ABOGADOS (LISTA CON BLOB IMAGES) ---
  attorneys: [
    { 
      name: 'Manuel Solís', 
      role: { es: 'Abogado', en: 'Attorney' }, 
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Manuel%20Solis.png',
      quote: { es: "Me siento enormemente bendecido por servir de herramienta para cumplir sus sueños.", en: "I feel enormously blessed to serve as a tool to fulfill their dreams." }
    },
    { 
      name: 'Manuel E. Solís III', 
      role: { es: 'Abogado', en: 'Attorney' }, 
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Manuel%20E%20Solis%20III.png',
      quote: { es: "Me apasiona ayudar a la comunidad y a las personas necesitadas.", en: "I am passionate about helping the community and people in need." }
    },
    { 
      name: 'Juan Solís', 
      role: { es: 'Abogado', en: 'Attorney' }, 
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Juan%20Solis.png',
      quote: { es: "Saber no es suficiente; debemos aplicar. Estar dispuesto no es suficiente; debemos hacer.", en: "Knowing is not enough; we must apply. Being willing is not enough; we must do." }
    },
    { 
      name: 'Andrew Fink', 
      role: { es: 'Abogado', en: 'Attorney' }, 
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Andrew%20Fink.png',
      quote: { es: "Integridad, trabajo duro, pasión, competencia y humildad.", en: "Integrity, hard work, passion, competence, and humility." }
    },
    { 
      name: 'Ana Patricia Rueda', 
      role: { es: 'Abogada', en: 'Attorney' }, 
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Ana%20Patricia%20Rueda.png',
      quote: { es: "El mejor premio que la vida tiene para ofrecer es trabajar duro en un trabajo que valga la pena.", en: "The best prize life has to offer is to work hard at work worth doing." }
    },
    { 
      name: 'Eduardo García', 
      role: { es: 'Abogado', en: 'Attorney' }, 
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Eduardo.png',
      quote: { es: "Utilizar el derecho como herramienta para la equidad y la justicia.", en: "Using law as a tool for equity and justice." }
    },
    {
      name: 'Alexis Alvarez',
      role: { es: 'Abogada', en: 'Attorney' },
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Alexis-Alvarez.png',
      quote: { es: "Cree firmemente en el principio de retribuir a la comunidad.", en: "She firmly believes in the principle of giving back to the community." }
    },
    {
      name: 'Edwin Zavala',
      role: { es: 'Abogado', en: 'Attorney' },
      image: 'https://uenjwzjx3vckezns.public.blob.vercel-storage.com/Edwin%20Zavala.png',
      quote: { es: "Soy hijo de un inmigrante... realmente creo que estamos cambiando el mundo.", en: "I am the son of an immigrant... I truly believe we are changing the world." }
    }
  ]
};

// --- TEXTOS DE INTERFAZ ---
const uiText = {
  address: { es: 'Dirección', en: 'Address' },
  phone: { es: 'Teléfono', en: 'Phone' },
  hours: { es: 'Horario', en: 'Hours' },
  viewMap: { es: 'Ver en mapa', en: 'View on map' },
  services: { es: 'Servicios en esta sede', en: 'Services at this Location' },
  team: { es: 'Nuestro Equipo Legal', en: 'Our Legal Team' },
  managers: { es: 'Nuestra Gerencia', en: 'Our Management Team' }
};

export default function OfficeClient() {
  const params = useParams();
  const lang = (params?.lang as 'es' | 'en') || 'es';
  const t = (obj: any) => obj[lang] || obj.es;
  
  // Optimización: Detectar móvil
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <Header />
      
      <main className={`relative w-full min-h-screen bg-[#001540] overflow-hidden ${font.className}`}>
        
        {/* --- BACKGROUND FX --- */}
        <div className="fixed inset-0 z-0 pointer-events-none transform-gpu">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
          
          {!isMobile && (
            <>
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                style={{ willChange: "transform, opacity" }}
                className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-blue-600/20 rounded-full blur-[100px]" 
              />
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                style={{ willChange: "transform, opacity" }}
                className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-sky-800/20 rounded-full blur-[120px]" 
              />
            </>
          )}
          
          <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
        </div>

        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="relative z-10 pt-[160px] pb-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

            {/* --- HERO SECTION --- */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 md:mb-24">
              
              {/* Texto Hero */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B2904D]/10 border border-[#B2904D]/30 mb-6">
                  <Sparkles className="text-[#B2904D]" size={14} />
                  <span className="text-[#B2904D] text-xs font-bold tracking-[0.2em] uppercase">Arvada, Colorado</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-thin text-white mb-6 leading-tight">
                  {t(officeData.title)}
                </h1>

                <div className="w-24 h-1 bg-gradient-to-r from-[#B2904D] to-transparent mb-8" />

                <p className="text-[#B2904D] font-light italic text-lg md:text-xl border-l-2 border-[#B2904D] pl-6 mb-8">
                  "{t(officeData.quote)}"
                </p>

                <p className="text-white/70 text-base md:text-lg leading-relaxed font-light max-w-xl">
                  {t(officeData.description)}
                </p>
              </motion.div>

              {/* Video Hero */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(56,189,248,0.15)] group bg-black"
              >
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  poster={officeData.posterImage} 
                  className="w-full h-full object-cover opacity-80"
                >
                  <source src={officeData.videoUrl} type="video/mp4" />
                  <source src={officeData.videoUrl.replace('.mp4', '.mov')} type="video/quicktime" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-40" />
                
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-2 rounded-full border border-white/20">
                    <Play fill="white" size={16} className="text-white" />
                </div>
              </motion.div>
            </div>

            {/* --- INFO GRID --- */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-24">
              
              {/* Detalles de Contacto */}
              <div className="lg:col-span-5 space-y-8">
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10"
                 >
                   <h3 className="text-2xl font-light text-white mb-8 flex items-center gap-3">
                     <MapPin className="text-[#B2904D]" /> {t(uiText.address)}
                   </h3>
                   
                   <div className="space-y-6">
                      <div className="group">
                        <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-2">{t(uiText.address)}</p>
                        <p className="text-white text-lg leading-snug">{officeData.address}</p>
                        <a href={officeData.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#B2904D] mt-3 text-sm font-bold hover:text-[#fff] transition-colors">
                          {t(uiText.viewMap)} →
                        </a>
                      </div>
                      <div className="h-px bg-white/10" />

                      <div>
                        <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-2">{t(uiText.phone)}</p>
                        <a href={`tel:${officeData.phone}`} className="text-2xl text-white font-thin hover:text-[#B2904D] transition-colors">
                          {officeData.phone}
                        </a>
                      </div>
                      <div className="h-px bg-white/10" />

                      <div>
                        <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-2">{t(uiText.hours)}</p>
                        <div className="flex items-start gap-3">
                          <Clock className="text-[#B2904D] mt-1 shrink-0" size={18} />
                          <p className="text-white text-base">{t(officeData.hours)}</p>
                        </div>
                      </div>
                   </div>
                 </motion.div>

                 {/* Lista de Servicios */}
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.1 }}
                   className="p-6 md:p-8 rounded-2xl border border-[#B2904D]/30 bg-gradient-to-br from-[#B2904D]/10 to-transparent"
                 >
                   <h3 className="text-xl font-light text-white mb-6 flex items-center gap-2">
                     <Star className="text-[#B2904D]" fill="#B2904D" size={20} /> {t(uiText.services)}
                   </h3>
                   <ul className="grid gap-4">
                     {officeData.services.map((service, idx) => (
                       <li key={idx} className="flex items-center gap-3">
                         <CheckCircle2 className="text-[#B2904D] shrink-0" size={18} />
                         <span className="text-white/90 text-sm md:text-base font-medium tracking-wide">
                           {t(service)}
                         </span>
                       </li>
                     ))}
                   </ul>
                 </motion.div>
              </div>

              {/* Grid de Abogados */}
              <div className="lg:col-span-7 space-y-16">
                
                {/* --- ABOGADOS (CON HOVER QUOTES) --- */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-1 h-10 bg-[#B2904D] rounded-full" />
                    <h3 className="text-3xl font-thin text-white">{t(uiText.team)}</h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {officeData.attorneys.map((person, idx) => (
                      <div key={idx} className="group relative bg-white/5 rounded-xl border border-white/5 hover:border-[#B2904D]/50 transition-all duration-300 hover:bg-white/10 overflow-hidden">
                        
                        <div className="relative w-full aspect-square overflow-hidden">
                          <Image 
                            src={person.image} 
                            alt={person.name} 
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
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* --- GERENCIA (SOLO TEXTO) --- */}
                {officeData.managers.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-1 h-8 bg-white/50 rounded-full" />
                      <h3 className="text-2xl font-thin text-white">{t(uiText.managers)}</h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {officeData.managers.map((person, idx) => (
                        <div key={idx} className="group flex flex-col items-center justify-center bg-white/5 rounded-lg p-4 border border-white/5 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
                          <div className="mb-3 p-2 rounded-full bg-white/5 text-white/20 group-hover:text-[#B2904D] group-hover:bg-[#B2904D]/10 transition-colors">
                             <User size={18} />
                          </div>
                          
                          <h5 className="font-bold text-white text-sm text-center leading-tight mb-1">
                            {person.name}
                          </h5>
                          <span className="text-[9px] font-medium uppercase tracking-wider text-white/40 text-center">
                            {t(person.role)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

              </div>
            </div>

            {/* --- FORMULARIO DE CONTACTO (LAZY LOADED) --- */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="bg-[#001540]/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="h-1.5 w-full bg-gradient-to-r from-[#B2904D] via-[#D4AF37] to-[#B2904D]" />
                
                <div className="p-6 md:p-12">
                   <ContactForm />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}