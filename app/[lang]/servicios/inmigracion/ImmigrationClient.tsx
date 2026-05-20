'use client';

import React, { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence, Variants } from 'framer-motion';
import {
  PhoneCall,
  ArrowRight,
  Scale, 
  FileText, 
  MessageSquare,
  Star, 
  Zap,
  HardHat,
  CheckCircle2,
  Shield,
  MapPin
} from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

// --- IMPORTACIONES DE COMPONENTES ---
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ContactForm from '../../../components/ContactForm';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { useLanguage } from '../../../context/LanguageContext';


// --- FUNCIÓN AUXILIAR ---
const getText = (obj: any, lang: 'es' | 'en'): string => {
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj.es;
};

// --- TIPADO PARA DATA ---
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

// --- DATOS GLOBALES ---
const texts = {
  mainCases: [
    {
      id: 'deportacion',
      title: { es: "Defensa y casos urgentes; Defensa contra la Deportación y Asilo", en: "Defense and urgent cases; Defense against Deportation and Asylum" },
      subtitle: { es: "Asilo, Cancelación de Remoción y Fianzas", en: "Asylum, Cancellation of Removal, and Bonds" },
      icon: Shield,
      offices: [
        'Arvada (Denver)',
        'Chicago',
        'Dallas',
        'El Paso',
        'Harlingen',
        'Bellaire',
        'Los Angeles',
        'Houston Principal',
        'Houston Accidentes',
        'Houston Main St',
        'Houston NorthLoop',
        'Houston NorthChase',
        'Houston Kirby',
        'Memphis',
        'League City, TX'
      ],
      content: {
        intro: { es: "¿Está usted o un ser querido enfrentando la deportación? ¡Contáctenos inmediatamente!", en: "Are you or a loved one facing deportation? Contact us immediately!" },
        description: { es: "Los casos de deportación casi siempre son urgentes. Nuestro equipo experto en inmigración luchará por usted. Existen varias formas de evitar la deportación.", en: "Deportation cases are almost always urgent. Our expert immigration team will fight for you. There are several ways to avoid deportation." },
        subTitle: { es: "Estrategias de Defensa Incluyen:", en: "Defense Strategies Include:" },
        subPoints: [
          { es: "Asilo (Persecución por raza, religión, etc.)", en: "Asylum (Persecution based on race, religion, etc.)" },
          { es: "Cancelación de Remoción (10 años de presencia, buen carácter, dificultad excepcional)", en: "Cancellation of Removal (10 years presence, good moral character, exceptional hardship)" },
          { es: "Ajuste de estatus", en: "Adjustment of status" },
          { es: "Liberación de detención (Fianzas por ICE o Juez)", en: "Release from detention (Bonds by ICE or Judge)" },
        ],
        solution: { es: "Le ayudaremos a presentar la evidencia y argumentos necesarios para la Cancelación de Remoción o a asegurar una fianza para su liberación de detención.", en: "We will help you present the necessary evidence and arguments for Cancellation of Removal or secure a bond for your release from detention." },
      }
    },
    {
      id: 'uvawa',
      title: { es: "Visas Humanitarias; Visa U, Visa T, VAWA y SIJS", en: "Humanitarian Visas; U Visa, T Visa, VAWA and SIJS" },
      subtitle: { es: "Víctimas de Delitos y Agresión Familiar", en: "Victims of Crimes and Family Aggression" },
      icon: MessageSquare,
      offices: [
        'Arvada (Denver)',
        'Chicago',
        'Dallas',
        'El Paso',
        'Harlingen',
        'Bellaire',
        'Los Angeles',
        'Houston Principal',
        'Houston Accidentes',
        'Houston Main St',
        'Houston NorthLoop',
        'Houston NorthChase',
        'Houston Kirby',
        'Memphis',
        'League City, TX'
      ],
      content: {
        intro: { es: "¿Ha sido agredido o es víctima de un delito violento o crueldad familiar en los Estados Unidos?", en: "Have you been assaulted or are you a victim of a violent crime or family cruelty in the United States?" },
        description: { es: "La Visa U es para víctimas de un delito grave que cooperan con la policía. VAWA (Ley de Violencia contra Mujeres) es para víctimas de agresión o crueldad cometida por familiares (cónyuges, padres, hijos) ciudadanos o residentes permanentes.", en: "The U Visa is for victims of a serious crime who cooperate with the police. VAWA (Violence Against Women Act) is for victims of assault or cruelty committed by family members (spouses, parents, children) who are citizens or permanent residents." },
        subTitle: { es: "Calificación para VAWA:", en: "Qualification for VAWA:" },
        subPoints: [
          { es: "Víctima de agresión o crueldad por: Cónyuge, ex cónyuge, padre o hijo de un ciudadano de los EEUU.", en: "Victim of assault or cruelty by: Spouse, ex-spouse, parent, or child of a U.S. citizen." },
          { es: "Víctima de agresión o crueldad por: Cónyuge, ex cónyuge, o padre quien es residente permanente legal.", en: "Victim of assault or cruelty by: Spouse, ex-spouse, or parent who is a lawful permanent resident." },
        ],
        solution: { es: "Podemos ayudarle a obtener la Residencia Permanente Legal (LPR) protegiéndole de la violencia y la amenaza de deportación, sin depender de su agresor.", en: "We can help you obtain Lawful Permanent Residency (LPR) by protecting you from violence and the threat of deportation, without depending on your abuser." },
      }
    },
    {
      id: 'residencia_familiar',
      title: { es: "Residencia por un Familiar", en: "Residency Through a Family Member" },
      subtitle: { es: "Peticiones I-130 y Ajuste de Estatus", en: "I-130 Petitions and Adjustment of Status" },
      icon: FileText,
      offices: [
        'Arvada (Denver)',
        'Chicago',
        'Dallas',
        'El Paso',
        'Harlingen',
        'Bellaire',
        'Los Angeles',
        'Houston Principal',
        'Houston Accidentes',
        'Houston Main St',
        'Houston NorthLoop',
        'Houston NorthChase',
        'Houston Kirby',
        'Memphis',
        'League City, TX'
      ],
      content: {
        intro: { es: "¿Espera alcanzar la condición de residente legal de los EE. UU.?", en: "Do you hope to achieve lawful permanent resident status in the U.S.?" },
        description: { es: "Si usted tiene un familiar en los Estados Unidos que goza del estatus de Residente Permanente o es ciudadano americano, usted posiblemente califique para una Residencia Permanente.", en: "If you have a family member in the United States who holds Permanent Resident status or is a U.S. citizen, you may qualify for Permanent Residency." },
        subTitle: { es: "Categorías de Familiares que Califican:", en: "Qualifying Family Member Categories:" },
        subPoints: [
          { es: "Residente Permanente pide a: Cónyuge, Hijos solteros menores de 21 años.", en: "Permanent Resident petitions for: Spouse, Unmarried children under 21." },
          { es: "Ciudadano Americano pide a: Cónyuge, Hijos y familia, Padres, Hermanos y familia.", en: "U.S. Citizen petitions for: Spouse, Children and family, Parents, Siblings and family." },
        ],
        solution: { es: "Guiaremos a su familiar patrocinador en el proceso de Petición Familiar (I-130) y el subsiguiente Ajuste de Estatus para obtener su Green Card.", en: "We will guide your sponsoring family member through the Family Petition process (I-130) and the subsequent Adjustment of Status to obtain your Green Card." },
      }
    },
    {
      id: 'residencia_empleador',
      title: { es: "Residencia por Empleo", en: "Employment-Based Residency" },
      subtitle: { es: "Peticiones Basadas en Empleo (Green Card)", en: "Employment-Based Petitions (Green Card)" },
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
        'Houston Accidentes',
        'Houston Main St',
        'Houston NorthLoop',
        'Houston NorthChase',
        'Houston Kirby',
        'Memphis',
        'League City, TX'
      ],
      content: {
        intro: { es: "¿Desea convertirse en residente legal de los EE. UU. a través de su trabajo?", en: "Do you wish to become a lawful permanent resident of the U.S. through your job?" },
        description: { es: "Si usted entró legalmente a los Estados Unidos y su permiso aún está vigente, o usted sometió alguna petición antes de 4/30/2001 y su patrón está dispuesto a ayudarlo, tiene posibilidades de arreglar su residencia.", en: "If you entered the United States legally and your permit is still valid, or you filed a petition before 4/30/2001 and your employer is willing to help you, you have possibilities to arrange your residency." },
        solution: { es: "Nuestro equipo le ayudará a navegar los complejos procesos de certificación laboral y peticiones I-140 para asegurar su futuro en el país. Esto aplica incluso si usted está en su país de origen y una empresa Estadounidense lo patrocina.", en: "Our team will help you navigate the complex labor certification processes and I-140 petitions to secure your future in the country. This applies even if you are in your home country and an American company sponsors you." },
      }
    },
    {
      id: 'naturalizacion',
      title: { es: "Naturalización", en: "Naturalization" },
      subtitle: { es: "Conviértete en Ciudadano Estadounidense", en: "Become a U.S. Citizen" },
      icon: CheckCircle2,
      offices: [
        'Arvada (Denver)',
        'Chicago',
        'Dallas',
        'El Paso',
        'Harlingen',
        'Bellaire',
        'Los Angeles',
        'Houston Principal',
        'Houston Accidentes',
        'Houston Main St',
        'Houston NorthLoop',
        'Houston NorthChase',
        'Houston Kirby',
        'Memphis',
        'League City, TX'
      ],
      content: {
        intro: { es: "¿Desea convertirse en ciudadano estadounidense?", en: "Do you want to become a U.S. citizen?" },
        description: { es: "¿Por qué permanecer con la residencia legal si puede llegar a ser un ciudadano estadounidense y disfrutar de todos los derechos que corresponden? La naturalización es el paso final hacia la plena ciudadanía.", en: "Why remain with legal residency if you can become a U.S. citizen and enjoy all the corresponding rights? Naturalization is the final step towards full citizenship." },
        subTitle: { es: "Maneras Comunes de Calificar:", en: "Common Ways to Qualify:" },
        subPoints: [
          { es: "Residencia Permanente por al menos 5 años.", en: "Permanent residency for at least 5 years." },
          { es: "Residencia permanente como cónyuge de un ciudadano de los EEUU.", en: "Permanent residency as the spouse of a U.S. citizen." },
          { es: "Calificar sirviendo en las fuerzas armadas de los EEUU.", en: "Qualify by serving in the U.S. armed forces." },
          { es: "Naturalización para hijos de ciudadanos (Cumpliendo requisitos).", en: "Naturalization for children of citizens (Meeting requirements)." },
          { es: "Requisito: Pasar un examen de ciudadanía en inglés.", en: "Requirement: Pass a citizenship test in English." },
        ],
        solution: { es: "Lo guiaremos en el proceso de solicitud, la preparación para el examen de ciudadanía y la entrevista final para que obtenga su pasaporte americano.", en: "We will guide you through the application process, preparation for the citizenship test, and the final interview so that you obtain your American passport." },
      }
    }
  ] as CaseItem[],
  
  processSteps: [
    { id: 1, title: { es: "Contacto", en: "Contact" }, icon: PhoneCall, desc: { es: "Llámanos para iniciar tu evaluación legal.", en: "Call us to start your legal evaluation." } },
    { id: 2, title: { es: "Análisis", en: "Analysis" }, icon: FileText, desc: { es: "Revisamos tu historial migratorio y evidencia.", en: "We review your immigration history and evidence." } },
    { id: 3, title: { es: "Estrategia", en: "Strategy" }, icon: Scale, desc: { es: "Diseñamos la ruta legal para tu objetivo.", en: "We design the legal route for your goal." } },
    { id: 4, title: { es: "Resultados", en: "Results" }, icon: CheckCircle2, desc: { es: "Te acompañamos hasta alcanzar tu estatus migratorio.", en: "We accompany you until you achieve your immigration status." } },
  ],

  interface: {
    badge: { es: "Especialistas en Inmigración", en: "Immigration Specialists" },
    title1: { es: "Abogados de Inmigración", en: "Immigration Attorneys" },
    title2: { es: "Expertos en EE.UU.", en: "U.S. Experts" }, 
    heroDescription: { es: "Representación experta en todos los aspectos de ley de inmigración para proteger su futuro en Estados Unidos. Deportación, Visas y Ciudadanía.", en: "Expert representation in all aspects of immigration law to protect your future in the United States. Deportation, Visas, and Citizenship." },
    stats: { es: "Familias Unidas", en: "Families Reunited" },
    casesTitle: { es: "Soluciones Legales en Inmigración", en: "Legal Solutions in Immigration" },
    ctaConsultation: { es: "Consulta Ahora", en: "Consult Now" },
    specialties: { es: "Nuestras Especialidades", en: "Our Specialties" },
    details: { es: "Ver Detalles", en: "View Details" },
    modalClosing: { es: "Representación legal especializada con décadas de experiencia en temas de inmigración", en: "Specialized legal representation with decades of experience in immigration matters" },
    callNow: { es: "Llámanos Ahora Mismo", en: "Call Us Right Now" },
    processMethod: { es: "Nuestro Método Legal", en: "Our Legal Method" },
    processTitle: { es: "Tu Ruta Hacia el Estatus Legal", en: "Your Path to Legal Status" },
    requestEvaluation: { es: "Solicitar Evaluación de Caso", en: "Request Case Evaluation" },
    videoAlt: { es: "Video explicativo sobre la dedicación del equipo legal.", en: "Explanation video about the legal team's dedication." },
    availableOffices: { es: "Oficinas Disponibles", en: "Available Offices" },
    officesCount: { es: "oficinas", en: "offices" }
  }
};


export default function ImmigrationClient() {
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

         <m.div 
           animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
           style={{ willChange: "transform, opacity" }}
           className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[80px]" 
         />
         <m.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            style={{ willChange: "transform, opacity" }}
            className="absolute bottom-[-10%] left-[-5%] w-[70vw] h-[70vw] bg-sky-800/10 rounded-full blur-[90px]" 
         />
         
         <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
            <span className="text-[120vh] font-black italic text-white tracking-tighter transform -skew-x-12">
               INMIGRACIÓN
            </span>
         </div>
      </div>

      {/* --- BREADCRUMBS --- */}
      <div className="relative z-10 pt-24 md:pt-28 px-4">
        <div className="container mx-auto max-w-7xl">
          <Breadcrumbs items={[
            { label: { es: 'Inicio', en: 'Home' }, href: `/${language}` },
            { label: { es: 'Servicios', en: 'Services' }, href: `/${language}/servicios` },
            { label: { es: 'Inmigración', en: 'Immigration' }, href: `/${language}/servicios/inmigracion` },
          ]} />
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-8 md:pt-12 pb-16 md:pb-24 px-4 z-10 min-h-[85vh] md:min-h-[90vh] flex flex-col justify-center">
        <div className="container mx-auto max-w-7xl">
           <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
              
              <m.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="lg:col-span-5 relative h-[300px] sm:h-[400px] md:h-[600px] lg:h-[700px] flex items-center justify-center order-2 lg:order-1"
              >
                 <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent blur-2xl rounded-full z-0 opacity-80" />
                 
                 <div className="relative z-10 w-full h-full flex items-center justify-center transform-gpu">
                    <div className="relative w-full h-full">
                       <Image
                         src="/immigration-hero.png"
                         alt="Abogado de Inmigración en USA Manuel Solís"
                         fill
                         className="object-contain object-center drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]"
                         priority
                         sizes="(max-width: 768px) 100vw, 50vw"
                       />
                    </div>
                 </div>

                 <m.div
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-4 md:bottom-10 left-0 md:left-[-20px] z-20 p-4 md:p-6 border border-white/10 rounded-2xl backdrop-blur-md bg-white/10 shadow-2xl"
                 >
                    <div className="flex items-baseline text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-sky-200/50">
                       <span className="text-4xl md:text-5xl font-bold tracking-tighter">20k</span> 
                       <span className="text-3xl md:text-4xl font-thin text-[#B2904D] ml-1">+</span>
                    </div>
                    <p className="text-xs text-white/60 uppercase tracking-[0.2em] mt-2 font-medium">
                       {t('stats')}
                    </p>
                 </m.div>
              </m.div>

              <div className="lg:col-span-7 space-y-6 md:space-y-8 pl-0 lg:pl-12 relative z-20 order-1 lg:order-2">
                 <m.div 
                   initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.5, delay: 0.5 }}
                   className="absolute left-0 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-[#B2904D]/50 to-transparent origin-top hidden lg:block" 
                 />

                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B2904D]/30 bg-[#B2904D]/10 backdrop-blur-sm">
                    <Star size={14} className="text-[#B2904D] fill-[#B2904D]" />
                    <span className="text-[#B2904D] text-xs font-bold tracking-widest uppercase">{t('badge')}</span>
                 </div>

                 <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-thin text-white tracking-tight leading-[0.9]">
                    <span className="block overflow-hidden pb-2">
                       <m.span custom={0} variants={textRevealVariant} initial="hidden" animate="visible" className="block text-white/90">
                          {t('title1')}
                       </m.span>
                    </span>
                    <span className="block overflow-hidden pb-4">
                       <m.span custom={1} variants={textRevealVariant} initial="hidden" animate="visible" className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] via-[#F3E5AB] to-[#B2904D]">
                          {t('title2')}
                       </m.span>
                    </span>
                 </h1>

                 <m.p 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                    className="text-lg md:text-xl text-blue-100/70 font-light max-w-xl leading-relaxed border-l border-white/10 pl-4 md:pl-6"
                 >
                    {t('heroDescription')}
                 </m.p>

                 <m.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                    className="flex flex-wrap gap-4 pt-4"
                 >
                    <a href="#contacto" className="px-6 md:px-8 py-3 md:py-4 bg-[#B2904D] hover:bg-white text-[#001540] font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(178,144,77,0.4)] flex items-center gap-2 group text-sm md:text-base">
                       <PhoneCall size={18} className="md:w-5 md:h-5" />
                       {t('ctaConsultation')}
                       <ArrowRight size={16} className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform"/>
                    </a>
                 </m.div>
              </div>

           </div>
        </div>
      </section>

      {/* --- SECCIÓN DE TABS - TÍTULOS HORIZONTALES --- */}
      <section className="px-4 pb-32 relative z-10" id="casos">

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header de la sección */}
          <m.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <m.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm mb-8"
            >
              <Scale size={14} className="text-[#B2904D]" />
              <span className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">{t('specialties')}</span>
            </m.div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              {t('casesTitle')}
            </h2>
            
            <m.div 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-[#B2904D] to-[#D4AF37] mx-auto rounded-full shadow-[0_0_10px_#B2904D]"
            />
          </m.div>

          {/* TABS - Títulos horizontales */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {mainCasesData.map((service, index) => (
              <m.button
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
              </m.button>
            ))}
          </div>

          {/* CONTENIDO EXPANDIDO - Muestra solo el servicio seleccionado */}
          <AnimatePresence mode="wait">
            <m.div
              key={selectedTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-2xl sm:rounded-[3rem] p-5 sm:p-8 md:p-12 border border-white/10 shadow-2xl">
                
                {/* Header del contenido */}
                <div className="flex items-start gap-6 mb-8 pb-8 border-b border-white/10">
                  <m.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#B2904D] to-[#D4AF37] flex items-center justify-center shadow-xl flex-shrink-0"
                  >
                    <activeService.icon size={40} className="text-white" />
                  </m.div>
                  
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
                        <m.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.03 }}
                          className="flex items-center gap-2 text-white/70 bg-black/20 p-3 rounded-xl border border-white/10 text-sm"
                        >
                          <div className="w-1.5 h-1.5 bg-[#B2904D] rounded-full flex-shrink-0" />
                          <span className="font-medium text-xs">{office}</span>
                        </m.div>
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
                    <m.a 
                      href="#contacto"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group w-full py-4 sm:py-5 bg-[#B2904D] text-[#001540] rounded-2xl font-black flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:bg-white transition-all text-sm sm:text-base md:text-lg"
                    >
                      <PhoneCall size={24}/>
                      <span>{t('requestEvaluation')}</span>
                      <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform"/>
                    </m.a>
                  </div>
                </div>

              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </section>

      {/* --- SERVICIOS ESPECIALIZADOS DE INMIGRACIÓN --- */}
      <section className="py-20 relative z-10 bg-[#001540]">
        <div className="max-w-7xl mx-auto px-4">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {language === 'es' ? 'Servicios Especializados de Inmigración' : 'Specialized Immigration Services'}
            </h2>
            <p className="text-blue-100/60 max-w-2xl mx-auto">
              {language === 'es'
                ? 'Áreas de práctica con enfoque específico para resolver su caso con mayor precisión.'
                : 'Focused practice areas to resolve your case with greater precision.'}
            </p>
          </m.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                href: `/${language}/servicios/visa-u`,
                title: language === 'es' ? 'Visa U' : 'U Visa',
                desc: language === 'es' ? 'Protección para víctimas de crímenes' : 'Protection for crime victims',
              },
              {
                href: `/${language}/servicios/vawa`,
                title: 'VAWA',
                desc: language === 'es' ? 'Víctimas de violencia doméstica' : 'Domestic violence victims',
              },
              {
                href: `/${language}/servicios/defensa-deportacion`,
                title: language === 'es' ? 'Defensa de Deportación' : 'Deportation Defense',
                desc: language === 'es' ? 'Cancelación de remoción y fianzas' : 'Cancellation of removal & bonds',
              },
              {
                href: `/${language}/servicios/asilo`,
                title: language === 'es' ? 'Asilo Político' : 'Political Asylum',
                desc: language === 'es' ? 'Protección por persecución' : 'Protection from persecution',
              },
            ].map((item, i) => (
              <m.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="group block p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#B2904D]/40 hover:bg-white/10 transition-all duration-300"
                >
                  <h3 className="text-lg font-bold text-white group-hover:text-[#B2904D] transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-blue-100/50 mb-3">{item.desc}</p>
                  <span className="text-xs text-[#B2904D] flex items-center gap-1 font-medium">
                    {language === 'es' ? 'Ver más' : 'Learn more'}
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROCESO SECTION --- */}
      <section className="py-32 relative overflow-hidden bg-[#001540]">
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <m.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <m.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
            >
              <FileText size={14} className="text-[#B2904D]" />
              <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">{t('processMethod')}</span>
            </m.div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-6">{t('processTitle')}</h2>
            <m.div 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-[#B2904D] to-transparent mx-auto rounded-full shadow-[0_0_10px_#B2904D]"
            />
          </m.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {processStepsData.map((step, index) => (
              <m.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="group relative"
              >
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 hover:bg-white/20 hover:border-[#B2904D]/50 transition-all duration-300 h-full shadow-lg">
                  
                  <m.div 
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                    className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-[#B2904D] to-[#D4AF37] rounded-lg flex items-center justify-center font-black text-white text-lg shadow-md"
                  >
                    {step.id}
                  </m.div>

                  <m.div 
                    className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#B2904D] transition-all"
                  >
                    <step.icon size={26} className="text-white"/>
                  </m.div>

                  <h3 className="font-black text-xl text-white mb-3">{gT(step.title)}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{gT(step.desc)}</p>
                </div>

                {index < processStepsData.length - 1 && (
                  <m.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
                    className="hidden md:block absolute top-[25%] -right-4 w-8 h-0.5 bg-gradient-to-r from-[#B2904D] to-transparent origin-left"
                  />
                )}
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- RELATED BLOG ARTICLES --- */}
      <section className="py-24 relative bg-[#001540]">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-black text-white mb-4">
              {lang === 'es' ? 'Recursos Legales de Inmigración' : 'Immigration Legal Resources'}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              {lang === 'es'
                ? 'Artículos informativos preparados por nuestros abogados para ayudarle a entender sus opciones legales.'
                : 'Informative articles prepared by our attorneys to help you understand your legal options.'}
            </p>
            <m.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-[#B2904D] to-transparent mx-auto rounded-full mt-6"
            />
          </m.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                slug: 'permiso_de_trabajo_visa_u',
                title: { es: 'Permiso de Trabajo con Visa U (Bona Fide)', en: 'U Visa Work Permit (Bona Fide)' },
                category: { es: 'Visa U', en: 'U Visa' },
                image: '/blog/visa-u.png',
              },
              {
                slug: 'Formulario_G28_Cambiar_Abogado_Inmigracion',
                title: { es: 'Formulario G-28: cómo cambiar de abogado', en: 'Form G-28: How to Change Attorney' },
                category: { es: 'Proceso Migratorio', en: 'Immigration Process' },
                image: '/blog/blog_09/B9_CR1.png',
              },
              {
                slug: 'ley_de_los_10_anos_cancelacion_de_deportacion',
                title: { es: 'Ley de los 10 años: cancelación de deportación', en: '10-Year Rule: Cancellation of Removal' },
                category: { es: 'Defensa contra Deportación', en: 'Deportation Defense' },
                image: '/blog/blog_11/BLOG01_CR1.png',
              },
              {
                slug: 'foia_migratoria_pedir_record_antes_de_aplicar',
                title: { es: 'FOIA: pedir récord antes de aplicar', en: 'FOIA: Request Records Before Applying' },
                category: { es: 'Proceso Migratorio', en: 'Immigration Process' },
                image: '/blog/blog_14/BLOG04_CR1.png',
              },
              {
                slug: 'VAWA_para_hombres_maltratados_por_pareja_ciudadana_o_residente',
                title: { es: 'VAWA para hombres maltratados', en: 'VAWA for Abused Men' },
                category: { es: 'VAWA', en: 'VAWA' },
                image: '/blog/blog_06/B6_CR1.png',
              },
              {
                slug: 'advance_parole_2026_viajar_con_daca_tps_visa_u',
                title: { es: 'Advance Parole 2026: viajar con DACA, TPS o Visa U', en: 'Advance Parole 2026: Travel with DACA, TPS or U Visa' },
                category: { es: 'Proceso Migratorio', en: 'Immigration Process' },
                image: '/blog/blog_12/BLOG02_CR1.png',
              },
            ].map((article, i) => (
              <m.a
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
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-medium text-white group-hover:text-[#B2904D] transition-colors line-clamp-2 leading-snug">
                    {article.title[lang as 'es' | 'en'] || article.title.es}
                  </h4>
                  <span className="mt-2 text-xs text-[#B2904D] flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                    {lang === 'es' ? 'Leer artículo' : 'Read article'} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </m.a>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACTO SECTION --- */}
      <section id="contacto" className="relative py-32 z-10 bg-transparent">
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          
          <m.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 p-5 sm:p-8 md:p-12 bg-white/5 backdrop-blur-md rounded-2xl sm:rounded-[2rem] shadow-2xl border border-white/10" 
          >
             <div className="text-white"> 
                <h2 className="text-2xl sm:text-3xl font-black mb-6">{t('requestEvaluation')}</h2>
                <p className="text-white/70 mb-8">{t('heroDescription')}</p>
                <ContactForm /> 
             </div>
            
          </m.div>
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