'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  PhoneCall,
  ArrowRight,
  Car,
  Scale,
  FileText,
  MessageSquare,
  Zap,
  CheckCircle2,
  Star,
  MapPin
} from 'lucide-react';

import Image from 'next/image';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ContactForm from '../../../components/ContactForm';
import { useLanguage } from '../../../context/LanguageContext';


const getText = (obj: any, lang: 'es' | 'en'): string => {
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj.es;
};

interface ContentDetail { es: string; en: string; }
interface CaseContent {
    intro: ContentDetail;
    description: ContentDetail;
    subTitle?: ContentDetail;
    subPoints?: ContentDetail[];
    solution?: ContentDetail;
}
interface CaseItem {
    id: string;
    title: ContentDetail;
    subtitle: ContentDetail;
    icon: React.ElementType;
    content: CaseContent;
    offices: string[]; // NUEVO: Array de oficinas que ofrecen este servicio
}

const texts = {
  mainCases: [
    {
      id: 'violencia_domestica',
      title: { es: "Violencia Doméstica", en: "Domestic Violence" },
      subtitle: { es: "Delitos Emotivos y Complejos", en: "Emotional and Complex Offenses" },
      icon: MessageSquare,
      offices: [
        'Chicago',
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
        intro: { es: "¿Está acusado de violencia doméstica?", en: "Are you accused of domestic violence?" },
        description: { es: "Los casos de violencia doméstica se encuentran entre los delitos penales más emotivos y complejos. Si usted y un familiar tienen una relación hostil, es fácil terminar en problemas legales. A menudo resulta en un arresto basado en versiones diferentes del mismo evento.", en: "Domestic violence cases are among the most emotional and complex criminal offenses. If you and a family member have a hostile relationship, it's easy to end up in legal trouble. It often results in an arrest based on different versions of the same event." },
        subTitle: { es: "Sanciones Potenciales Incluyen:", en: "Potential Penalties Include:" },
        subPoints: [
          { es: "Multas y libertad condicional.", en: "Fines and probation." },
          { es: "Órdenes de protección y restricción.", en: "Protection and restraining orders." },
          { es: "Consejería obligatoria y clases de control de ira.", en: "Mandatory counseling and anger management classes." },
          { es: "Órdenes de custodia de menores y encarcelamiento.", en: "Child custody orders and imprisonment." },
        ],
        solution: { es: "Si ha sido arrestado o acusado, es esencial que busque asesoría legal inmediata. Le proporcionaremos una defensa sólida para proteger su libertad y sus derechos familiares.", en: "If you have been arrested or charged, it is essential that you seek immediate legal advice. We will provide you with a solid defense to protect your freedom and family rights." },
      }
    },
    {
      id: 'asalto',
      title: { es: "Asalto y Agresión", en: "Assault and Battery" },
      subtitle: { es: "Violencia Física o Amenaza de Daño", en: "Physical Violence or Threat of Harm" },
      icon: Zap,
      offices: [
        'Chicago',
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
        intro: { es: "¿Ha sido acusado de asalto o agresión?", en: "Have you been charged with assault or battery?" },
        description: { es: "El asalto implica causar intencionalmente que otra persona tenga temor razonable de un contacto dañino inminente. No siempre se requiere una lesión física. Si hay violencia física real, el cargo se combina con un cargo de agresión.", en: "Assault involves intentionally causing another person to have reasonable fear of imminent harmful contact. A physical injury is not always required. If there is actual physical violence, the charge is combined with a battery charge." },
        solution: { es: "Es importante conocer la gravedad de las repercusiones, como el tiempo en la cárcel o multas. Nuestros abogados de defensa criminal están aquí para brindarle el asesoramiento y la representación que necesita.", en: "It is important to know the seriousness of the repercussions, such as jail time or fines. Our criminal defense attorneys are here to provide you with the advice and representation you need." },
      }
    },
    {
      id: 'dwi',
      title: { es: "DWI - Manejo en Estado de Ebriedad", en: "DWI - Driving While Intoxicated" },
      subtitle: { es: "Conducir Bajo la Influencia (DUI)", en: "Driving Under the Influence (DUI)" },
      icon: Car,
      offices: [
        'Chicago',
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
        intro: { es: "¿Necesita un abogado después de ser sorprendido conduciendo bajo la influencia?", en: "Need an attorney after being caught driving under the influence?" },
        description: { es: "El límite legal de contenido de alcohol en la sangre es típicamente 0.08%, pero puede ser detenido por sospecha de consumo de drogas o alcohol, independientemente de la cantidad exacta.", en: "The legal limit for blood alcohol content is typically 0.08%, but you can be arrested for suspicion of drug or alcohol consumption, regardless of the exact amount." },
        subTitle: { es: "Graves Consecuencias Incluyen:", en: "Serious Consequences Include:" },
        subPoints: [
          { es: "Un registro de antecedentes penales.", en: "A criminal record." },
          { es: "Suspensión o revocación de su licencia de conducir.", en: "Suspension or revocation of your driver's license." },
          { es: "Sentencia de cárcel y multas elevadas.", en: "Jail sentence and high fines." },
          { es: "Programas de tratamiento requeridos y aumento del costo del seguro.", en: "Required treatment programs and increased insurance cost." },
        ],
        solution: { es: "Nuestros abogados de defensa criminal están aquí para brindarle el asesoramiento y la representación que necesita para luchar contra los cargos de DWI.", en: "Our criminal defense attorneys are here to provide you with the advice and representation you need to fight DWI charges." },
      }
    },
    {
      id: 'hurto',
      title: { es: "Hurto, Robo y Delitos Patrimoniales", en: "Theft, Robbery, and Property Crimes" },
      subtitle: { es: "Fraude, Malversación y Robo de Identidad", en: "Fraud, Embezzlement, and Identity Theft" },
      icon: FileText,
      offices: [
        'Chicago',
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
        intro: { es: "¿Ha sido acusado de un delito de robo o hurto?", en: "Have you been charged with a theft or larceny offense?" },
        description: { es: "Este delito penal suele aplicarse de manera amplia; es delito de hurto cuando una persona se apropia intencional o fraudulentamente de los bienes personales de otra persona sin su consentimiento expreso.", en: "This criminal offense is often broadly applied; it is a theft offense when a person intentionally or fraudulently appropriates another person's personal property without their express consent." },
        subTitle: { es: "Delitos de Hurto Incluidos:", en: "Theft Offenses Included:" },
        subPoints: [
          { es: "Robo en tiendas y Hurto menor.", en: "Shoplifting and petty theft." },
          { es: "Hurto y Malversación.", en: "Larceny and Embezzlement." },
          { es: "Robo de identidad y Fraude/Falsificación.", en: "Identity theft and Fraud/Forgery." },
          { es: "Robo con cheque o emisión de cheques sin fondos.", en: "Theft by check or issuing bad checks." }, 
          { es: "Uso ilegal/no autorizado de un vehículo motorizado.", en: "Illegal/unauthorized use of a motor vehicle." },
        ],
        solution: { es: "Si lo acusan de un delito en esta lista, contáctenos ahora. Lucharemos para proteger su reputación y evitar consecuencias penales severas.", en: "If you are accused of a crime on this list, contact us now. We will fight to protect your reputation and avoid severe criminal consequences." },
      }
    },
    {
      id: 'prostitucion',
      title: { es: "Prostitución y Solicitación", en: "Prostitution and Solicitation" },
      subtitle: { es: "Delito Grave y Sanciones Estrictas", en: "Felony Offense and Strict Penalties" },
      icon: Scale,
      offices: [
        'Chicago',
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
        intro: { es: "¿Ha sido acusado de prostitución o solicitación?", en: "Have you been charged with prostitution or solicitation?" },
        description: { es: "Las leyes han endurecido las penas, por ejemplo, en Texas, la solicitud de prostitución puede ser un delito grave. Alguien es culpable si 'la persona a sabiendas ofrece o acepta pagar una tarifa a otra persona con el fin de participar en una conducta sexual'.", en: "Laws have stiffened penalties; for example, in Texas, solicitation of prostitution can be a felony offense. Someone is guilty if 'the person knowingly offers or agrees to pay a fee to another person for the purpose of engaging in sexual conduct'." },
        solution: { es: "Según la definición, no es necesario que el dinero cambie de manos ni que se realice ningún acto sexual. Las sanciones varían ampliamente; es esencial consultar con nuestro abogado defensor penal para determinar las posibles sanciones y las opciones legales que tiene.", en: "According to the definition, no money needs to change hands or sexual act take place. Penalties vary widely; it is essential to consult with our criminal defense attorney to determine the possible penalties and the legal options you have." },
      }
    },
  ] as CaseItem[],

  processSteps: [
    { id: 1, title: { es: "Detención y Contacto", en: "Arrest and Contact" }, icon: PhoneCall, desc: { es: "Llámenos inmediatamente tras un arresto para proteger sus derechos.", en: "Call us immediately after an arrest to protect your rights." } },
    { id: 2, title: { es: "Análisis de Pruebas", en: "Evidence Analysis" }, icon: FileText, desc: { es: "Revisamos informes policiales, testimonios y toda la evidencia.", en: "We review police reports, testimonies, and all evidence." } },
    { id: 3, title: { es: "Estrategia Legal", en: "Legal Strategy" }, icon: Scale, desc: { es: "Desarrollamos una defensa sólida y exploramos todas las opciones.", en: "We develop a solid defense and explore all options." } },
    { id: 4, title: { es: "Representación en Corte", en: "Court Representation" }, icon: CheckCircle2, desc: { es: "Lo representamos en la corte para luchar por el mejor resultado posible.", en: "We represent you in court to fight for the best possible outcome." } }, 
  ],

  interface: {
    badge: { es: "Defensa Legal Inmediata", en: "Immediate Legal Defense" },
    mainTitle: { es: "LEY CRIMINAL", en: "CRIMINAL LAW" },
    heroTitle1: { es: "Expertos en", en: "Experts in" },
    heroTitle2: { es: "Defensa Penal", en: "Criminal Defense" }, 
    heroDescription: { es: "Desde DWI, hasta hurto y asalto. Protegemos su libertad y su futuro. Su primera llamada debe ser a nuestro abogado defensor.", en: "From DWI to theft and assault. We protect your freedom and future. Your first call should be to our defense attorney." },
    stats: { es: "Casos Defendidos", en: "Cases Defended" },
    casesTitle: { es: "Soluciones Legales en defensa criminal", en: "Solutions in Criminal Defense" },
    ctaConsultation: { es: "Consulta Ahora", en: "Consult Now" },
    specialties: { es: "Nuestra Defensa", en: "Our Defense" },
    details: { es: "Ver Detalles", en: "View Details" },
    modalClosing: { es: "Abogados defensores penales listos para proteger su libertad.", en: "Criminal defense attorneys ready to protect your freedom." },
    callNow: { es: "Llámanos Ahora Mismo", en: "Call Us Right Now" },
    processMethod: { es: "Nuestro Método", en: "Our Method" },
    processTitle: { es: "Su Ruta Hacia la Defensa", en: "Your Path to Defense" },
    requestEvaluation: { es: "Solicitar Consulta Privada", en: "Request Private Consultation" },
    videoAlt: { es: "Video explicativo sobre la dedicación del equipo legal.", en: "Explanation video about the legal team's dedication." },
    availableOffices: { es: "Oficinas Disponibles", en: "Available Offices" },
    officesCount: { es: "oficinas", en: "offices" }
  }
};

export default function CriminalLawPage() {
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

  const [selectedTab, setSelectedTab] = useState<string>(texts.mainCases[0].id);
  
  const mainCasesData = texts.mainCases;
  const processStepsData = texts.processSteps;
  
  const activeService = mainCasesData.find(s => s.id === selectedTab) || mainCasesData[0];

  const textRevealVariant: Variants = {
    hidden: { y: "100%", rotateX: -20, opacity: 0 },
    visible: (custom: number) => ({
      y: 0, rotateX: 0, opacity: 1,
      transition: { duration: 1.2, delay: custom * 0.15, ease: "easeOut" } 
    })
  };

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
            <span className="text-[120vh] font-black italic text-white tracking-tighter transform -skew-x-12">
               CRIMINAL
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
                         src="/criminal-hero.png"
                         alt="Abogado de Ley Criminal"
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
                       <span className="text-4xl md:text-5xl font-bold tracking-tighter">12K</span> 
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

                 <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-thin text-white tracking-tight leading-[0.9]">
                    <span className="block overflow-hidden pb-2">
                       <motion.span custom={0} variants={textRevealVariant} initial="hidden" animate="visible" className="block text-white/90">
                          {t('heroTitle1')}
                       </motion.span>
                    </span>
                    <span className="block overflow-hidden pb-4">
                       <motion.span custom={1} variants={textRevealVariant} initial="hidden" animate="visible" className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] via-[#F3E5AB] to-[#B2904D]">
                          {t('heroTitle2')}
                       </motion.span>
                    </span>
                 </h1>

                 <motion.p 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                    className="text-lg md:text-xl text-blue-100/70 font-light max-w-xl leading-relaxed border-l border-white/10 pl-4 md:pl-6"
                 >
                    {t('heroDescription')}
                 </motion.p>

                 <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                    className="flex flex-wrap gap-4 pt-4"
                 >
                    <a href="#contacto" className="px-6 md:px-8 py-3 md:py-4 bg-[#B2904D] hover:bg-white text-[#001540] font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(178,144,77,0.4)] flex items-center gap-2 group text-sm md:text-base">
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
            {mainCasesData.map((service, index) => (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                onClick={() => setSelectedTab(service.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative px-5 py-3 rounded-2xl transition-all duration-300 border backdrop-blur-md ${
                  selectedTab === service.id
                    ? 'bg-gradient-to-br from-[#B2904D] to-[#D4AF37] border-[#B2904D] shadow-[0_0_20px_rgba(178,144,77,0.3)]'
                    : 'bg-white/5 border-white/10 hover:border-[#B2904D]/50 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <service.icon 
                    size={20} 
                    className={`transition-all ${
                      selectedTab === service.id ? 'text-white' : 'text-white/70 group-hover:text-[#B2904D]'
                    }`}
                  />
                  <span className={`font-bold text-xs md:text-sm whitespace-nowrap ${
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
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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

                  {/* Puntos especiales si existen */}
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
                            <div className="w-2 h-2 rounded-full mt-2 shrink-0 bg-[#B2904D]"></div>
                            <span className="text-sm font-medium">{gT(point)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Solución */}
                  {activeService.content.solution && (
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