'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PhoneCall,
  ArrowRight,
  Car,
  Truck,
  Stethoscope,
  Zap,
  HardHat,
  Scale,
  FileText,
  HandCoins,
  Star,
  Quote,
  CheckCircle2,
  MapPin
} from 'lucide-react';

import Image from 'next/image';

// --- IMPORTACIONES DE COMPONENTES ---
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ContactForm from '../../../components/ContactForm';
import { useLanguage } from '../../../context/LanguageContext';


// --- TIPADO PARA DATA ---
interface ContentDetail { es: string; en: string; }
interface CaseContent {
    intro: ContentDetail;
    description: ContentDetail;
    subTitle?: ContentDetail;
    subPoints?: ContentDetail[];
    solution?: ContentDetail;
    extraInfo?: ContentDetail;
    quotes?: { text: ContentDetail, context: ContentDetail }[];
    offerAlert?: ContentDetail;
    benefitsTitle?: ContentDetail;
    benefits?: ContentDetail[];
    closing?: ContentDetail;
}
interface CaseItem {
    id: string;
    title: ContentDetail;
    subtitle: ContentDetail;
    icon: React.ElementType;
    content: CaseContent;
    offices: string[]; // NUEVO: Array de oficinas que ofrecen este servicio
}

// --- FUNCIÓN AUXILIAR ---
const getText = (obj: any, lang: 'es' | 'en'): string => {
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj.es;
};

// --- DATOS GLOBALES - TODOS LOS SERVICIOS EN UN SOLO ARRAY ---
const texts = {
  allServices: [
    {
      id: 'auto',
      title: { es: "Accidentes Automovilísticos", en: "Car Accidents" },
      subtitle: { es: "Colisiones y Lesiones Graves", en: "Collisions and Serious Injuries" },
      icon: Car,
      offices: [
        'Arvada (Denver)',
        'Chicago',
        'Dallas',
        'El Paso',
        'Harlingen',
        'Bellaire',
        'Los Angeles',
        'Houston Principal',
        'Houston Navigation',
        'Houston Main St',
        'Houston NorthLoop',
        'Houston NorthChase',
        'Houston Kirby',
        'Memphis',
        'Memphis (Airways)',
        'League City, TX'
      ],
      content: {
        intro: { es: "¿Herido y buscando compensación por un accidente de vehículo?", en: "Injured and seeking compensation after a vehicle accident?" },
        description: { es: "Las lesiones causadas por una colisión pueden no mostrarse o sentirse durante días, o pueden ser obvias y requerir atención médica inmediata. Las lesiones, como las de la cabeza y, sobretodo, el cerebro, pueden causar sufrimiento de por vida. Incluso después de sanar físicamente, puedes experimentar un trauma emocional y ansiedad que pueden seguirte durante años.", en: "Injuries caused by a collision may not show or be felt for days, or they may be obvious and require immediate medical attention. Injuries, such as those to the head and, especially, the brain, can cause lifelong suffering. Even after physically healing, you may experience emotional trauma and anxiety that can follow you for years." },
        solution: { es: "En las Oficinas del Abogado Manuel Solís, le podemos ayudar a negociar con la compañía de seguros, encargando estudios médicos y pruebas independientes que permitan conocer los daños reales, tanto los actuales como los que puedan hacerse evidentes en el futuro, fruto de las lesiones sufridas durante el accidente.", en: "At the Law Offices of Attorney Manuel Solís, we can help you negotiate with the insurance company, commissioning independent medical studies and tests that allow you to know the real damages, both current and those that may become evident in the future, resulting from the injuries suffered during the accident." }
      }
    },
    {
      id: 'trailer',
      title: { es: "Accidentes de 18 Ruedas", en: "18-Wheeler Accidents" },
      subtitle: { es: "Tráilers y Vehículos Comerciales", en: "Tractor-Trailers and Commercial Vehicles" },
      icon: Truck,
      offices: [
        'Arvada (Denver)',
        'Chicago',
        'Dallas',
        'El Paso',
        'Harlingen',
        'Bellaire',
        'Los Angeles',
        'Houston Principal',
        'Houston Navigation',
        'Houston Main St',
        'Houston NorthLoop',
        'Houston NorthChase',
        'Houston Kirby',
        'Memphis',
        'Memphis (Airways)',
        'League City, TX'
      ],
      content: {
        intro: { es: "¿Ha quedado usted o un miembro de su familia herido en un accidente con un camión de 18 ruedas?", en: "Have you or a family member been injured in an 18-wheeler accident?" },
        description: { es: "Es posible que tenga derecho a una indemnización significativa. Usted no debe verse destinado a un futuro de dolor, sufrimiento y deudas a causa de un accidente. Es un hecho que la calidad de su vida de ahora en adelante se verá afectada significativamente por la cantidad de indemnización que reciba.", en: "You may be entitled to significant compensation. You should not be destined to a future of pain, suffering, and debt because of an accident. It is a fact that the quality of your life from now on will be significantly affected by the amount of compensation you receive." },
        extraInfo: { es: "Podemos ayudar a descubrir las razones detrás del accidente para que usted pueda tener algo de resolución y seguir adelante.", en: "We can help uncover the reasons behind the accident so you can have some resolution and move forward." },
        quotes: [
          {
            text: { es: "Su abuelo todavía les compra regalos de Navidad.", en: "Their grandfather still buys them Christmas gifts." },
            context: { es: "Ella perdió a su papá. Ayudamos a su familia a conseguir una indemnización. Todos los años usan parte del dinero para comprar regalos a los nietos.", en: "She lost her father. We helped her family get compensation. Every year they use part of the money to buy gifts for the grandchildren." }
          }
        ],
        offerAlert: { es: "Si ya ha recibido una oferta, llámenos. No es raro recibir ofertas de 10x o 20x más cuando nos contrata.", en: "If you have already received an offer, call us. It is not uncommon to receive offers 10x or 20x more when you hire us." }
      }
    },
    {
      id: 'medica',
      title: { es: "Negligencia Médica", en: "Medical Malpractice" },
      subtitle: { es: "Errores Médicos y Farmacéuticos", en: "Medical and Pharmaceutical Errors" },
      icon: Stethoscope,
      offices: [
        'Arvada (Denver)',
        'Chicago',
        'Dallas',
        'El Paso',
        'Harlingen',
        'Bellaire',
        'Los Angeles',
        'Houston Principal',
        'Houston Navigation',
        'Houston Main St',
        'Houston NorthLoop',
        'Houston NorthChase',
        'Houston Kirby',
        'Memphis',
        'Memphis (Airways)',
        'League City, TX'
      ],
      content: {
        intro: { es: "¿Herido por negligencia médica o por un producto farmacéutico?", en: "Injured due to medical malpractice or a pharmaceutical product?" },
        description: { es: "A veces, una mala experiencia debida a una enfermedad o un accidente puede ser aun peor si no recibimos un trato profesional por parte del médico o el hospital que supuestamente debe ayudarnos. Podría ser que incluso usted sospeche que el fallecimiento de un ser querido posiblemente se deba a una mala decisión.", en: "Sometimes, a bad experience due to illness or accident can be even worse if we do not receive professional treatment from the doctor or hospital that is supposed to help us. You might even suspect that the death of a loved one is possibly due to a bad decision." },
        solution: { es: "Si usted cree que usted o un ser querido no ha recibido un trato profesional y ha sufrido daños, podemos estudiar su caso para saber si tiene derecho a reclamar una indemnización por su sufrimiento.", en: "If you believe that you or a loved one has not received professional treatment and has suffered damages, we can study your case to find out if you are entitled to claim compensation for your suffering." }
      }
    },
    {
      id: 'explosion',
      title: { es: "Explosión de Plantas", en: "Plant Explosions" },
      subtitle: { es: "Industriales y Refinerías", en: "Industrial and Refinery" },
      icon: Zap,
      offices: [
        'Arvada (Denver)',
        'Chicago',
        'Dallas',
        'El Paso',
        'Harlingen',
        'Bellaire',
        'Los Angeles',
        'Houston Principal',
        'Houston Navigation',
        'Houston Main St',
        'Houston NorthLoop',
        'Houston NorthChase',
        'Houston Kirby',
        'Memphis',
        'Memphis (Airways)',
        'League City, TX'
      ],
      content: {
        intro: { es: "Es posible que tenga derecho a una indemnización significativa.", en: "You may be entitled to significant compensation." },
        description: { es: "Las explosiones de plantas parecen estar ocurriendo con demasiada frecuencia en estos días. Las explosiones pueden ser causadas por muchos factores, por lo que es necesario realizar una investigación exhaustiva para determinar la causa.", en: "Plant explosions seem to be occurring too often these days. Explosions can be caused by many factors, so a thorough investigation is necessary to determine the cause." },
        solution: { es: "Nuestro equipo de abogados con experiencia puede ayudar a investigar y ayudar a los heridos a comprender lo que sucedió y buscar justicia por sus lesiones.", en: "Our team of experienced attorneys can help investigate and assist the injured in understanding what happened and seeking justice for their injuries." }
      }
    },
    {
      id: 'trabajo',
      title: { es: "Lesiones y Accidentes en el Trabajo", en: "Work Injuries and Accidents" },
      subtitle: { es: "Construcción, Fábricas y Más", en: "Construction, Factories, and More" },
      icon: HardHat,
      offices: [
        'Arvada (Denver)',
        'Chicago',
        'Dallas',
        'El Paso',
        'Harlingen',
        'Bellaire',
        'Los Angeles',
        'Houston Principal',
        'Houston Navigation',
        'Houston Main St',
        'Houston NorthLoop',
        'Houston NorthChase',
        'Houston Kirby',
        'Memphis',
        'Memphis (Airways)',
        'League City, TX'
      ],
      content: {
        intro: { es: "¿Sufriste una lesión o accidente en tu trabajo?", en: "Did you suffer an injury or accident at work?" },
        description: { es: "Ayudamos a trabajadores que se esfuerzan cada día. Miles de inmigrantes realizan trabajos físicos y lamentablemente sufren accidentes. Creemos que nadie debe enfrentar esto solo.", en: "We help workers who strive every day. Thousands of immigrants perform physical work and unfortunately suffer accidents. We believe no one should face this alone." },
        subTitle: { es: "Atendemos reclamos por:", en: "We handle claims for:" },
        subPoints: [
          { es: "Lesiones en construcción o demolición", en: "Construction or demolition injuries" },
          { es: "Caídas o golpes durante el trabajo", en: "Falls or blows during work" },
          { es: "Uso de maquinaria o herramientas defectuosas", en: "Use of defective machinery or tools" },
          { es: "Lesiones de espalda, hombro o rodillas", en: "Back, shoulder, or knee injuries" },
          { es: "Accidentes en fábricas o bodegas", en: "Accidents in factories or warehouses" },
          { es: "Falta de equipo o medidas de seguridad", en: "Lack of safety equipment or measures" }
        ],
        benefitsTitle: { es: "Beneficios de una Compensación:", en: "Compensation Benefits:" },
        benefits: [
          { es: "Cubrir tratamientos y rehabilitación", en: "Cover treatments and rehabilitation" },
          { es: "Recuperar ingresos perdidos", en: "Recover lost wages" },
          { es: "Recibir apoyo si no puedes trabajar", en: "Receive support if you cannot work" },
          { es: "Mantener estabilidad económica para tu familia", en: "Maintain economic stability for your family" }
        ],
        closing: { es: "No es un favor, es tu derecho. No importa tu estatus migratorio.", en: "It's not a favor, it's your right. Regardless of your immigration status." }
      }
    }
  ] as CaseItem[],
  
  processSteps: [
    { id: 1, title: { es: "Contacto", en: "Contact" }, icon: PhoneCall, desc: { es: "Llámanos y obtén orientación legal.", en: "Call us and get legal guidance." } },
    { id: 2, title: { es: "Análisis", en: "Analysis" }, icon: FileText, desc: { es: "Analizamos tu caso y revisamos la evidencia.", en: "We analyze your case and review the evidence." } },
    { id: 3, title: { es: "Negociación", en: "Negotiation" }, icon: Scale, desc: { es: "Negociamos duramente con la aseguradora o empleador.", en: "We negotiate hard with the insurer or employer." } },
    { id: 4, title: { es: "Resultados", en: "Results" }, icon: HandCoins, desc: { es: "Te acompañamos hasta que recibas tu compensación.", en: "We accompany you until you receive your compensation." } },
  ],

  interface: {
    badge: { es: "Representación Legal Especializada", en: "Specialized Legal Representation" },
    mainTitle: { es: "ACCIDENTES", en: "ACCIDENTS" }, 
    heroTitle1: { es: "Protegiendo su", en: "Protecting Your" },
    heroTitle2: { es: "Compensación", en: "Compensation" }, 
    heroDescription: { es: "Si sufrió un accidente en el trabajo o carretera, luchamos para que reciba la indemnización máxima sin importar su estatus migratorio.", en: "If you suffered an accident at work or on the road, we fight for you to receive maximum compensation regardless of your immigration status." },
    stats: { es: "Compensación Recuperada", en: "Compensation Recovered" },
    casesTitle: { es: "Soluciones en Accidentes", en: "Solutions in AccidentsPageBilingual" },
    casesSubtitle: { es: "Todos nuestros servicios están disponibles para proteger tus derechos", en: "All our services are available to protect your rights" },
    ctaConsultation: { es: "Consulta Ahora", en: "Consult Now" },
    details: { es: "Ver Detalles", en: "View Details" },
    modalClosing: { es: "Especialistas en casos de lesiones y accidentes con décadas de experiencia", en: "Specialists in injury and accident cases with decades of experience" },
    videoSectionBadge: { es: "Conoce a Nuestro Equipo", en: "Meet Our Team" },
    videoSectionTitle: { es: "Abogado", en: "Attorney" },
    videoSectionSubtitle: { es: "Escucha directamente de nuestros socios cómo protegemos tus derechos con experiencia y dedicación.", en: "Hear directly from our partners how we protect your rights with expertise and dedication." },
    callNow: { es: "Llámanos Ahora Mismo", en: "Call Us Right Now" },
    processMethod: { es: "Nuestro Método", en: "Our Method" },
    processTitle: { es: "Cómo Funciona el Proceso", en: "How the Process Works" },
    requestEvaluation: { es: "Solicitar Evaluación", en: "Request Evaluation" },
    videoAlt: { es: "Video explicativo sobre la dedicación del equipo legal.", en: "Explanation video about the legal team's dedication." },
    specialties: { es: "Nuestras Especialidades", en: "Our Specialties" },
    availableOffices: { es: "Oficinas Disponibles", en: "Available Offices" },
    officesCount: { es: "oficinas", en: "offices" }
  }
};


export default function AccidentsPageBilingual() {
  const { language } = useLanguage();
  const lang = language as 'es' | 'en';
  
  const t = (key: string): string => {
    const parts = key.split('.');
    let current: any = texts.interface;
    for (const part of parts) {
      if (current && current[part]) {
        current = current[part];
      } else {
        return ''; 
      }
    }
    return current[lang] || current.es;
  };
  
  const gT = (obj: any): string => getText(obj, lang);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const [selectedTab, setSelectedTab] = useState<string>(texts.allServices[0].id);
  
  const allServicesData = texts.allServices;
  const processStepsData = texts.processSteps;
  
  const activeService = allServicesData.find(s => s.id === selectedTab) || allServicesData[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#001540] text-white relative selection:bg-[#B2904D] selection:text-white font-sans overflow-x-hidden">
      
      <Header />

      {/* --- FONDO OPTIMIZADO --- */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full transform-gpu">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#001f5f]" />
         
         <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>

         <motion.div 
           animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
           style={{ willChange: "transform, opacity" }}
           className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[80px]" 
         />
         <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            style={{ willChange: "transform, opacity" }}
            className="absolute bottom-[-10%] left-[-5%] w-[70vw] h-[70vw] bg-sky-800/10 rounded-full blur-[90px]" 
         />
         
         <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
            <span className="text-[120vh] font-black italic text-white tracking-tighter whitespace-nowrap">
                ACCIDENTES
            </span>
         </div>
      </div>
      
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 px-4 z-10 min-h-[85vh] md:min-h-[90vh] flex flex-col justify-center">
        <div className="container mx-auto max-w-7xl">
           <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="lg:col-span-5 relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center"
              >
                 <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent blur-2xl rounded-full z-0 opacity-80" />
                 
                 <div className="relative z-10 w-full h-full flex items-center justify-center transform-gpu">
                    <div className="relative w-full h-full">
                       <Image
                         src="/accident-hero.png"
                         alt="Abogado de Accidentes"
                         fill
                         className="object-contain object-center drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]"
                         priority
                         sizes="(max-width: 768px) 100vw, 50vw"
                       />
                    </div>
                 </div>

                 <motion.div
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-4 md:bottom-10 left-0 md:left-[-20px] z-20 p-4 md:p-6 border border-white/10 rounded-2xl backdrop-blur-md bg-white/10 shadow-2xl"
                 >
                    <div className="flex items-baseline text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-sky-200/50">
                       <span className="text-4xl md:text-5xl font-bold tracking-tighter">10M</span> 
                       <span className="text-3xl md:text-4xl font-thin text-[#B2904D] ml-1">+</span>
                    </div>
                    <p className="text-xs text-white/60 uppercase tracking-[0.2em] mt-2 font-medium">
                       {t('stats')}
                    </p>
                 </motion.div>
              </motion.div>

              <div className="lg:col-span-7 space-y-6 md:space-y-8 pl-0 lg:pl-12 relative z-20">
                 <motion.div 
                   initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.5, delay: 0.5 }}
                   className="absolute left-0 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-[#B2904D]/50 to-transparent origin-top hidden lg:block" 
                 />

                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B2904D]/30 bg-[#B2904D]/10 backdrop-blur-sm">
                    <Star size={14} className="text-[#B2904D] fill-[#B2904D]" />
                    <span className="text-[#B2904D] text-xs font-bold tracking-widest uppercase">{t('badge')}</span>
                 </div>

                 <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-thin text-white tracking-tight leading-none">
                    <span className="block text-white/90 font-extralight mb-2">
                      {t('heroTitle1')} 
                    </span>
                    <span className="block font-medium text-[#B2904D] drop-shadow-xl">
                      {t('heroTitle2')} 
                    </span>
                 </h1>

                 <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="relative pl-6 border-l-2 border-[#B2904D]/50"
                 >
                    <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">
                      {t('heroDescription')}
                    </p>
                 </motion.div>

                 <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                    className="flex flex-wrap gap-4 pt-4"
                 >
                    <a href="#contacto" className="px-6 md:px-8 py-3 md:py-4 bg-[#B2904D] hover:bg-white text-[#001540] font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(178,144,77,0.3)] flex items-center gap-2 group text-sm md:text-base">
                       <PhoneCall size={18} className="md:w-5 md:h-5" />
                       {t('ctaConsultation')}
                       <ArrowRight size={16} className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform"/>
                    </a>
                 </motion.div>
              </div>

           </div>
        </div>
      </section>


      {/* --- SECCIÓN DE TABS - TÍTULOS HORIZONTALES --- */}
      <section className="px-4 pb-32 relative z-10" id="casos">

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header de la sección */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm mb-8"
            >
              <Scale size={14} className="text-[#B2904D]" />
              <span className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">{t('specialties')}</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              {t('casesTitle')}
            </h2>
            
            <p className="text-lg text-white/60 mb-6 max-w-3xl mx-auto">
              {t('casesSubtitle')}
            </p>
            
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-[#B2904D] to-[#D4AF37] mx-auto rounded-full shadow-[0_0_10px_#B2904D]"
            />
          </motion.div>

          {/* TABS - Títulos horizontales */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {allServicesData.map((service, index) => (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => setSelectedTab(service.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative px-6 py-4 rounded-2xl transition-all duration-300 border backdrop-blur-md ${
                  selectedTab === service.id
                    ? 'bg-gradient-to-br from-[#B2904D] to-[#D4AF37] border-[#B2904D] shadow-[0_0_20px_rgba(178,144,77,0.3)]'
                    : 'bg-white/5 border-white/10 hover:border-[#B2904D]/50 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <service.icon 
                    size={24} 
                    className={`transition-all ${
                      selectedTab === service.id ? 'text-white' : 'text-white/70 group-hover:text-[#B2904D]'
                    }`}
                  />
                  <span className={`font-bold text-sm md:text-base whitespace-nowrap ${
                    selectedTab === service.id ? 'text-white' : 'text-white/80 group-hover:text-white'
                  }`}>
                    {gT(service.title)}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* CONTENIDO EXPANDIDO - Muestra solo el servicio seleccionado */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-2xl">
                
                {/* Header del contenido */}
                <div className="flex items-start gap-6 mb-8 pb-8 border-b border-white/10">
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#B2904D] to-[#D4AF37] flex items-center justify-center shadow-xl flex-shrink-0"
                  >
                    <activeService.icon size={40} className="text-white" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
                      {gT(activeService.title)}
                    </h3>
                    <p className="text-[#B2904D] text-sm font-bold uppercase tracking-widest mb-4">
                      {gT(activeService.subtitle)}
                    </p>
                    
                    {/* NUEVO: Badge con contador de oficinas */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20">
                      <MapPin size={14} className="text-[#B2904D]" />
                      <span className="text-xs text-white/80 font-medium">
                        {activeService.offices.length} {t('officesCount')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contenido principal */}
                <div className="space-y-8">
                  
                  <div>
                    <h4 className="text-2xl font-black text-white mb-4">
                      {gT(activeService.content.intro)}
                    </h4>
                    <p className="text-lg text-white/70 leading-relaxed">
                      {gT(activeService.content.description)}
                    </p>
                  </div>

                  {/* NUEVO: Sección de oficinas disponibles */}
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <h5 className="font-black text-white mb-4 flex items-center gap-3 text-lg">
                      <MapPin size={20} className="text-[#B2904D]" />
                      {t('availableOffices')}
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {activeService.offices.map((office, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-2 text-white/70 bg-black/20 p-3 rounded-xl border border-white/10 text-sm"
                        >
                          <div className="w-1.5 h-1.5 bg-[#B2904D] rounded-full flex-shrink-0" />
                          <span className="font-medium text-xs">{office}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Quotes especiales para 18 Ruedas */}
                  {activeService.id === 'trailer' && activeService.content.quotes && (
                    <div className="space-y-4">
                      {activeService.content.quotes.map((quote, i) => (
                        <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10 shadow-md relative">
                          <Quote size={24} className="absolute top-4 right-4 text-white/20"/>
                          <p className="italic text-lg text-white mb-2">"{gT(quote.text)}"</p>
                          <p className="text-sm text-white/50">{gT(quote.context)}</p>
                        </div>
                      ))}
                      <div className="p-6 bg-[#B2904D]/20 border border-[#B2904D]/30 rounded-2xl text-white font-bold">
                        {gT(activeService.content.offerAlert)}
                      </div>
                    </div>
                  )}

                  {/* Puntos especiales para Trabajo */}
                  {activeService.content.subPoints && activeService.content.subTitle && (
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                      <h5 className="font-black text-white mb-6 flex items-center gap-3 text-xl">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md bg-white/10">
                          <Scale size={24} className="text-white"/> 
                        </div>
                        {gT(activeService.content.subTitle)}
                      </h5>
                      <div className="grid md:grid-cols-2 gap-4">
                        {activeService.content.subPoints?.map((point: any, i: number) => ( 
                          <div 
                            key={i}
                            className="flex items-start gap-3 text-white/70 bg-black/20 p-4 rounded-xl border border-white/10"
                          >
                            <CheckCircle2 size={20} className="text-[#B2904D] shrink-0 mt-0.5" />
                            <span className="text-sm font-medium">{gT(point)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Beneficios para Trabajo */}
                  {activeService.id === 'trabajo' && activeService.content.benefits && (
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                      <h5 className="font-black text-white mb-6 flex items-center gap-3 text-xl">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md bg-[#B2904D]">
                          <HandCoins size={24} className="text-white"/> 
                        </div>
                        {gT(activeService.content.benefitsTitle)}
                      </h5>
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {activeService.content.benefits?.map((benefit, i) => ( 
                          <div 
                            key={i}
                            className="flex items-start gap-3 text-white bg-black/20 p-4 rounded-xl border border-white/10"
                          >
                            <CheckCircle2 size={20} className="text-[#B2904D] shrink-0 mt-0.5" />
                            <span className="text-sm font-medium">{gT(benefit)}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-white/60 text-sm italic">{gT(activeService.content.closing)}</p>
                    </div>
                  )}

                  {/* Solución para otros servicios */}
                  {activeService.content.solution && (activeService.id === 'medica' || activeService.id === 'explosion' || activeService.id === 'auto') && (
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                      <p className="text-white/80 leading-relaxed font-medium text-lg">
                        {gT(activeService.content.solution)}
                      </p>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="pt-8 border-t border-white/10">
                    <motion.a 
                      href="#contacto"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group w-full py-5 bg-[#B2904D] text-[#001540] rounded-2xl font-black flex items-center justify-center gap-3 shadow-lg hover:bg-white transition-all text-lg"
                    >
                      <PhoneCall size={24}/>
                      <span>{t('requestEvaluation')}</span>
                      <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform"/>
                    </motion.a>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* --- VIDEO SECTION --- */}
      <section className="py-32 relative overflow-hidden bg-[#001540]"> 
        
        <div className="absolute inset-0 bg-[#001540] opacity-90" />

        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm mb-8"
            >
              <div className="w-2 h-2 bg-[#B2904D] rounded-full animate-pulse"></div>
              <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">{t('videoSectionBadge')}</span>
            </motion.div>
            
            <h2 className="text-4xl font-black text-white mb-6 leading-tight">
              {t('videoSectionTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] to-[#D4AF37]">Juan Solís</span>
            </h2>
            
            <p className="text-xl text-blue-100/70 mb-8 leading-relaxed">
              {t('videoSectionSubtitle')}
            </p>
            
            <motion.a 
              href="tel:+18664200405"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-4 bg-[#B2904D] text-[#002342] px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-white transition-all"
            >
              <div className="relative w-10 h-10 bg-black/10 rounded-lg flex items-center justify-center">
                <PhoneCall size={20} />
              </div>
              <span className="relative">{t('callNow')}</span>
            </motion.a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 relative group p-6 bg-white/10 backdrop-blur-md rounded-[2.5rem] shadow-xl border border-white/10"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-black aspect-video"> 
              <motion.div 
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onClick={togglePlayPause}
                className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer bg-black/10 hover:bg-black/0 transition-colors"
              >
                {!isPlaying && (
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/60"
                  >
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                  </motion.div>
                )}
              </motion.div>
              <video 
                ref={videoRef}
                src="https://vz-9f852395-0ee.b-cdn.net/d7979aa5-40db-49f2-8566-b8a580591661/playlist.m3u8" 
                className="w-full h-full object-cover" 
                aria-label={t('videoAlt')}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- PROCESO SECTION --- */}
      <section className="py-32 relative overflow-hidden bg-[#001540]">
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
            >
              <FileText size={14} className="text-[#B2904D]" />
              <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">{t('processMethod')}</span>
            </motion.div>
            
            <h2 className="text-4xl font-black text-white mb-6">{t('processTitle')}</h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-[#B2904D] to-transparent mx-auto rounded-full shadow-[0_0_10px_#B2904D]"
            />
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {processStepsData.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="group relative"
              >
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 hover:bg-white/20 hover:border-[#B2904D]/50 transition-all duration-300 h-full shadow-lg">
                  
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                    className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-[#B2904D] to-[#D4AF37] rounded-lg flex items-center justify-center font-black text-white text-lg shadow-md"
                  >
                    {step.id}
                  </motion.div>

                  <motion.div 
                    className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#B2904D] transition-all"
                  >
                    <step.icon size={26} className="text-white"/>
                  </motion.div>

                  <h3 className="font-black text-xl text-white mb-3">{gT(step.title)}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{gT(step.desc)}</p>
                </div>

                {index < processStepsData.length - 1 && (
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
                    className="hidden md:block absolute top-[25%] -right-4 w-8 h-0.5 bg-gradient-to-r from-[#B2904D] to-transparent origin-left"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BLOG SUGGESTIONS SECTION --- */}
      <section className="py-24 relative bg-[#001540]">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-black text-white mb-4">
              {lang === 'es' ? 'Recursos Legales Relacionados' : 'Related Legal Resources'}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              {lang === 'es'
                ? 'Artículos informativos preparados por nuestros abogados para ayudarle a entender sus opciones legales.'
                : 'Informative articles prepared by our attorneys to help you understand your legal options.'}
            </p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-[#B2904D] to-transparent mx-auto rounded-full mt-6"
            />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                slug: 'ley_de_los_10_anos_cancelacion_de_deportacion',
                title: { es: 'Ley de los 10 años: cancelación de deportación', en: '10-Year Rule: Cancellation of Removal' },
                category: { es: 'Defensa contra Deportación', en: 'Deportation Defense' },
                image: '/blog/blog_11/BLOG01_CR1.png',
              },
              {
                slug: 'Formulario_G28_Cambiar_Abogado_Inmigracion',
                title: { es: 'Formulario G-28: cómo cambiar de abogado', en: 'Form G-28: How to Change Attorney' },
                category: { es: 'Proceso Migratorio', en: 'Immigration Process' },
                image: '/blog/blog_09/B9_CR1.png',
              },
              {
                slug: 'Frenar_deportacion_inminente_con_solicitud_de_Visa_Humanitaria',
                title: { es: 'Frenar deportación con Visa Humanitaria', en: 'Stop Deportation with Humanitarian Visa' },
                category: { es: 'Visa Humanitaria', en: 'Humanitarian Visa' },
                image: '/blog/blog_08/B8_CR1.png',
              },
            ].map((article, i) => (
              <motion.a
                key={article.slug}
                href={`/${lang}/blog/${article.slug}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group block rounded-xl overflow-hidden border border-white/10 hover:border-[#B2904D]/30 bg-[#000a20]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(178,144,77,0.15)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title[lang as 'es' | 'en'] || article.title.es}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000a20] to-transparent opacity-60" />
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest text-[#B2904D] bg-[#001540]/80 backdrop-blur-sm px-2 py-1 rounded">
                    {article.category[lang as 'es' | 'en'] || article.category.es}
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-medium text-white group-hover:text-[#B2904D] transition-colors line-clamp-2 leading-snug">
                    {article.title[lang as 'es' | 'en'] || article.title.es}
                  </h4>
                  <span className="mt-2 text-xs text-[#B2904D] flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                    {lang === 'es' ? 'Leer artículo' : 'Read article'} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACTO SECTION --- */}
      <section id="contacto" className="relative py-32 z-10 bg-transparent">

        <div className="max-w-4xl mx-auto px-4 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 p-8 md:p-12 bg-white/5 backdrop-blur-md rounded-[2rem] shadow-2xl border border-white/10"
          >
             <div className="text-white">
                <h2 className="text-3xl font-black mb-6">{t('requestEvaluation')}</h2>
                <p className="text-white/70 mb-8">{t('heroDescription')}</p>
                <ContactForm />
             </div>

          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Estilos para scrollbar */}
      <style jsx global>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: #B2904D;
          border-radius: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: #D4AF37;
        }
      `}</style>
    </div>
  );
}