'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PhoneCall,
  ArrowRight,
  Scale, 
  FileText, 
  HandCoins, 
  MessageSquare, 
  Star,
  MapPin
} from 'lucide-react';

import Image from 'next/image';

// --- IMPORTACIONES DE COMPONENTES ---
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ContactForm from '../../../components/ContactForm';
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

// --- DATOS GLOBALES (FAMILY LAW) ---
const texts = {
  mainCases: [
    {
      id: 'divorcio',
      title: { es: "Divorcio", en: "Divorce" },
      subtitle: { es: "Separación Legal y Acuerdos Mutuos", en: "Legal Separation and Mutual Agreements" },
      icon: FileText,
      offices: [
        'Chicago',
        'Memphis'
      ],
      content: {
        intro: { es: "¿Necesita un buen abogado de divorcio?", en: "Do you need a good divorce attorney?" },
        description: { es: "Un matrimonio es un contrato legalmente establecido entre dos personas que debe resolverse de manera adecuada para proteger sus intereses futuros. Es recomendable acudir a un abogado para que le ayude a tomar las mejores decisiones.", en: "A marriage is a legally established contract between two people that must be properly resolved to protect your future interests. It is advisable to go to an attorney to help you make the best decisions." },
        solution: { es: "Le podemos ayudar a preparar y entregar los documentos necesarios para un acuerdo de divorcio. Si fuera necesario, le representaremos en la corte ante un posible litigio para proteger sus derechos.", en: "We can help you prepare and submit the necessary documents for a divorce settlement. If necessary, we will represent you in court before possible litigation to protect your rights." },
      }
    },
    {
      id: 'custodia',
      title: { es: "Custodia de los Hijos", en: "Child Custody" },
      subtitle: { es: "Disputas, Visitas y Bienestar Infantil", en: "Disputes, Visitation, and Child Welfare" },
      icon: MessageSquare,
      offices: [
        'Chicago',
        'Memphis'
      ],
      content: {
        intro: { es: "Permítanos apoyarle en las disputas por la custodia de sus hijos.", en: "Allow us to support you in child custody disputes." },
        description: { es: "Los niños son, indudablemente, los más perjudicados en la separación de sus padres. Es crucial que los abogados negocien en su nombre desde un punto de vista técnico y no emocional para lograr la mejor resolución.", en: "Children are undoubtedly the most affected by the separation of their parents. It is crucial that attorneys negotiate on your behalf from a technical rather than emotional point of view to achieve the best resolution." },
        subTitle: { es: "Nuestra Defensa Incluye:", en: "Our Defense Includes:" },
        subPoints: [
          { es: "Defenderle en un caso de custodia.", en: "Defend you in a custody case." },
          { es: "Negociar la manutención y las visitas.", en: "Negotiate child support and visitation." },
          { es: "Representarle en corte si no es posible llegar a un acuerdo.", en: "Represent you in court if an agreement is not possible." },
        ],
        solution: { es: "Contamos con abogados preparados para defender sus intereses y el de sus hijos, buscando la mejor solución para la estabilidad familiar.", en: "We have attorneys prepared to defend your interests and those of your children, seeking the best solution for family stability." },
      }
    },
    {
      id: 'manutencion',
      title: { es: "Manutención de los Hijos", en: "Child Support" },
      subtitle: { es: "Cálculo y Cumplimiento de Pagos", en: "Calculation and Enforcement of Payments" },
      icon: HandCoins,
      offices: [
        'Chicago',
        'Memphis'
      ],
      content: {
        intro: { es: "La manutención infantil es un aspecto clave del derecho de familia.", en: "Child support is a key aspect of family law." },
        description: { es: "Los padres tienen el deber de mantener a sus hijos. La manutención les ayuda económicamente, asegurándose de que los niños tengan ropa en la espalda y comida en la mesa. La cantidad se calcula sobre la base de los recursos netos del padre.", en: "Parents have a duty to support their children. Support helps them financially, ensuring that children have clothes on their backs and food on the table. The amount is calculated based on the father's net resources." },
        subTitle: { es: "Cómo se Calcula la Manutención (Base General):", en: "How Child Support is Calculated (General Basis):" },
        subPoints: [
          { es: "Se calcula a partir de los recursos netos (ingresos menos impuestos esenciales y gastos de seguro médico).", en: "It is calculated based on net resources (income minus essential taxes and health insurance expenses)." },
          { es: "La base es el 20% del ingreso neto mensual.", en: "The base is 20% of the net monthly income." },
          { es: "Se agrega el 5% por cada hijo adicional.", en: "5% is added for each additional child." },
          { es: "Puede embargarse del salario, ofreciendo tranquilidad a ambas partes.", en: "It can be garnished from salary, offering peace of mind to both parties." },
        ],
        solution: { es: "Le asistimos en el cálculo preciso y la ejecución de la orden judicial de manutención, asegurando la estabilidad económica de sus hijos.", en: "We assist you with the accurate calculation and enforcement of the judicial support order, ensuring the economic stability of your children." },
      }
    },
  ] as CaseItem[],
  
  processSteps: [
    { id: 1, title: { es: "Consulta Privada", en: "Private Consultation" }, icon: PhoneCall, desc: { es: "Evaluamos su situación personal y sus objetivos familiares.", en: "We evaluate your personal situation and family goals." } },
    { id: 2, title: { es: "Estrategia y Documentación", en: "Strategy & Documentation" }, icon: FileText, desc: { es: "Recopilamos pruebas, ingresos y preparamos los documentos legales.", en: "We gather evidence, income statements, and prepare the legal documents." } },
    { id: 3, title: { es: "Negociación / Mediación", en: "Negotiation / Mediation" }, icon: MessageSquare, desc: { es: "Buscamos un acuerdo amistoso fuera de la corte para reducir el impacto emocional.", en: "We seek an amicable out-of-court settlement to reduce emotional impact." } },
    { id: 4, title: { es: "Representación en Corte", en: "Court Representation" }, icon: Scale, desc: { es: "Lo representamos si es necesario litigar para defender sus derechos.", en: "We represent you if litigation is necessary to defend your rights." } },
  ],

  interface: {
    badge: { es: "Protección Familiar y Patrimonial", en: "Family and Patrimonial Protection" },
    mainTitle: { es: "FAMILIA", en: "FAMILY LAW" },
    heroTitle1: { es: "Expertos en", en: "Experts in" },
    heroTitle2: { es: "Derecho Familiar", en: "Family Law" }, 
    heroDescription: { es: "Protegemos sus derechos y el bienestar de sus hijos durante transiciones difíciles.", en: "We protect your rights and the well-being of your children during difficult transitions." },
    stats: { es: "Familias Apoyadas", en: "Families Supported" },
    casesTitle: { es: "Soluciones Legales en Ley familiar", en: "Solutions in Family Law" },
    ctaConsultation: { es: "Consulta Ahora", en: "Consult Now" },
    specialties: { es: "Nuestras Especialidades", en: "Our Specialties" },
    details: { es: "Ver Detalles", en: "View Details" },
    modalClosing: { es: "Protegiendo su futuro y el de sus hijos durante transiciones difíciles.", en: "Protecting your future and your children's during difficult transitions." },
    videoSectionBadge: { es: "Conoce a Nuestro Equipo", en: "Meet Our Team" },
    videoSectionTitle: { es: "Abogado", en: "Attorney" },
    videoSectionSubtitle: { es: "Escucha directamente de nuestros socios cómo protegemos su estabilidad familiar.", en: "Hear directly from our partners how we protect your family stability." },
    callNow: { es: "Llámanos Ahora Mismo", en: "Call Us Right Now" },
    processMethod: { es: "Nuestro Método", en: "Our Method" },
    processTitle: { es: "El Proceso para su Resolución Familiar", en: "The Process for Your Family Resolution" },
    requestEvaluation: { es: "Solicitar Consulta", en: "Request Consultation" },
    videoAlt: { es: "Video explicativo sobre la dedicación del equipo legal.", en: "Explanation video about the legal team's dedication." },
    availableOffices: { es: "Oficinas Disponibles", en: "Available Offices" },
    officesCount: { es: "oficinas", en: "offices" }
  }
};


export default function FamilyLawPage() {
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
                FAMILIA
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
                         src="/family-hero.png"
                         alt="Abogado de Derecho Familiar"
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
                       <span className="text-4xl md:text-5xl font-bold tracking-tighter">10K</span> 
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

      {/* --- RELATED BLOG ARTICLES --- */}
      <section className="py-24 relative bg-[#001540]">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-black text-white mb-4">
              {lang === 'es' ? 'Recursos Legales para Familias' : 'Legal Resources for Families'}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              {lang === 'es'
                ? 'Artículos informativos sobre protecciones legales para familias inmigrantes.'
                : 'Informative articles about legal protections for immigrant families.'}
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
                slug: 'VAWA_para_hombres_maltratados_por_pareja_ciudadana_o_residente',
                title: { es: 'VAWA para hombres maltratados por pareja ciudadana', en: 'VAWA for Men Abused by Citizen Partner' },
                category: { es: 'VAWA', en: 'VAWA' },
                image: '/blog/blog_06/B6_CR1.png',
              },
              {
                slug: 'VAWA_para_padres_Maltrato_de_hijos_ciudadanos_estadounidenses',
                title: { es: 'VAWA para padres: maltrato de hijos ciudadanos', en: 'VAWA for Parents: Abuse by U.S. Citizen Children' },
                category: { es: 'VAWA', en: 'VAWA' },
                image: '/blog/blog_05/B5_CR1.png',
              },
              {
                slug: 'Visa_U_y_VAWA_incluir_hijos_y_nuevos_esposos_derivados',
                title: { es: 'Visa U y VAWA: incluir hijos y nuevos esposos', en: 'U Visa & VAWA: Including Children and New Spouse' },
                category: { es: 'Visa U', en: 'U Visa' },
                image: '/blog/blog_10/B10_CR1.png',
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