'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  PhoneCall,
  ArrowRight,
  Shield,
  CheckCircle2,
  FileText,
  Briefcase,
  Globe,
  Building2,
  Plane,
  Users,
  Search,
  MessageSquare,
  Send,
  HelpCircle,
  MapPin,
  Clock,
  DollarSign,
  Target,
  FileCheck,
  Star,
  Award,
  GraduationCap
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

// Interfaces adaptadas
interface ContentDetail { es: string; en: string; }
interface TabContent {
    intro: ContentDetail;
    description: ContentDetail;
    subTitle?: ContentDetail;
    subPoints?: ContentDetail[];
    solution?: ContentDetail;
}
interface TabItem {
    id: string;
    title: ContentDetail;
    subtitle: ContentDetail;
    icon: React.ElementType;
    content: TabContent;
}

const texts = {
  infoTabs: [
    {
      id: 'general',
      title: { es: "¿Qué es la Visa E-2?", en: "What is the E-2 Visa?" },
      subtitle: { es: "Inversionistas por Tratado", en: "Treaty Investors" },
      icon: FileText,
      content: {
        intro: { es: "Tu camino legal para vivir, trabajar e invertir en EE.UU.", en: "Your legal path to live, work, and invest in the U.S." },
        description: { es: "La Visa E-2 es una visa de no inmigrante que permite a ciudadanos de países con tratados comerciales con Estados Unidos residir y trabajar en el país mientras dirigen una empresa en la que han realizado una inversión sustancial. A diferencia de otras visas, te permite estar directamente involucrado en las operaciones diarias.", en: "The E-2 Visa is a non-immigrant visa that allows citizens of countries with trade treaties with the United States to reside and work in the country while directing a business in which they have made a substantial investment. Unlike other visas, it allows you to be directly involved in daily operations." },
        subTitle: { es: "Características Principales:", en: "Key Features:" },
        subPoints: [
          { es: "Visa de No Inmigrante: Permite residir mientras operas tu negocio.", en: "Non-Immigrant Visa: Allows residency while operating your business." },
          { es: "Renovable Indefinidamente: Mientras el negocio siga operando.", en: "Indefinitely Renewable: As long as the business continues to operate." },
          { es: "Incluye a la Familia: Cónyuge e hijos menores de 21 años.", en: "Includes Family: Spouse and children under 21." },
          { es: "Control Total: Diriges tu propia empresa.", en: "Total Control: You run your own company." },
        ]
      }
    },
    {
      id: 'requisitos',
      title: { es: "Requisitos Clave", en: "Key Requirements" },
      subtitle: { es: "¿Quién Califica?", en: "Who Qualifies?" },
      icon: CheckCircle2,
      content: {
        intro: { es: "Criterios fundamentales para la aprobación", en: "Fundamental criteria for approval" },
        description: { es: "Para obtener la Visa E-2, debes cumplir con una serie de requisitos estrictos establecidos por el gobierno de los Estados Unidos. Evaluamos tu perfil para asegurar el cumplimiento de cada uno.", en: "To obtain the E-2 Visa, you must meet a series of strict requirements established by the US government. We evaluate your profile to ensure compliance with each one." },
        subTitle: { es: "Lista de Verificación:", en: "Checklist:" },
        subPoints: [
          { es: "Nacionalidad: Ser ciudadano de un país con tratado vigente.", en: "Nationality: Be a citizen of a country with a current treaty." },
          { es: "Inversión Sustancial: Capital suficiente para asegurar el éxito del negocio.", en: "Substantial Investment: Sufficient capital to ensure business success." },
          { es: "Negocio Real: Una empresa operativa, no especulativa.", en: "Real Business: An operating company, not speculative." },
          { es: "Control: Poseer al menos el 50% o tener control operacional.", en: "Control: Own at least 50% or have operational control." },
        ],
        solution: { es: "No existe un monto mínimo oficial de inversión, pero recomendamos montos a partir de $100,000 USD para mayor solidez.", en: "There is no official minimum investment amount, but we recommend amounts starting at $100,000 USD for greater solidity." }
      }
    },
    {
      id: 'beneficios',
      title: { es: "Beneficios", en: "Benefits" },
      subtitle: { es: "Para ti y tu familia", en: "For you and your family" },
      icon: Shield,
      content: {
        intro: { es: "Ventajas más allá del negocio", en: "Advantages beyond business" },
        description: { es: "La Visa E-2 no solo abre puertas comerciales, sino que ofrece una calidad de vida superior para el inversionista y sus seres queridos en los Estados Unidos.", en: "The E-2 Visa not only opens business doors but offers a superior quality of life for the investor and their loved ones in the United States." },
        subTitle: { es: "Ventajas Exclusivas:", en: "Exclusive Advantages:" },
        subPoints: [
          { es: "Cónyuge: Permiso de trabajo abierto en EE.UU.", en: "Spouse: Open work permit in the U.S." },
          { es: "Hijos: Acceso a educación pública y privada.", en: "Children: Access to public and private education." },
          { es: "Viajes: Libertad para entrar y salir del país.", en: "Travel: Freedom to enter and leave the country." },
          { es: "Flexibilidad: Sin límite de ingresos para tu empresa.", en: "Flexibility: No income limit for your company." },
        ]
      }
    },
    {
      id: 'paises',
      title: { es: "Países Tratado", en: "Treaty Countries" },
      subtitle: { es: "Elegibilidad por Nacionalidad", en: "Eligibility by Nationality" },
      icon: Globe,
      content: {
        intro: { es: "¿Es tu país elegible para la Visa E-2?", en: "Is your country eligible for the E-2 Visa?" },
        description: { es: "Estados Unidos mantiene tratados de comercio y navegación con países específicos. Si eres ciudadano de alguno de estos países, tienes el primer paso completado.", en: "The United States maintains treaties of commerce and navigation with specific countries. If you are a citizen of one of these countries, you have the first step completed." },
        subTitle: { es: "Países Hispanohablantes Comunes:", en: "Common Spanish-speaking Countries:" },
        subPoints: [
          { es: "Argentina, Colombia, Chile", en: "Argentina, Colombia, Chile" },
          { es: "Costa Rica, Ecuador, España", en: "Costa Rica, Ecuador, Spain" },
          { es: "Honduras, México, Panamá", en: "Honduras, Mexico, Panama" },
          { es: "Paraguay (y muchos más en Europa/Asia)", en: "Paraguay (and many more in Europe/Asia)" },
        ],
        solution: { es: "¿Tu país no está en la lista? Contáctanos para explorar otras opciones de visa de inversión.", en: "Is your country not on the list? Contact us to explore other investment visa options." }
      }
    }
  ] as TabItem[],

  processSteps: [
    { id: 1, title: { es: "Consulta Inicial", en: "Initial Consultation" }, icon: MessageSquare, desc: { es: "Evaluamos tu perfil, tipo de inversión y viabilidad migratoria para la Visa E2.", en: "We evaluate your profile, investment type, and immigration viability for the E2 Visa." } },
    { id: 2, title: { es: "Análisis del Proyecto", en: "Project Analysis" }, icon: Search, desc: { es: "Te orientamos sobre los requisitos que tu inversión debe cumplir según la ley migratoria.", en: "We guide you on the requirements your investment must meet under immigration law." } },
    { id: 3, title: { es: "Estructuración Legal", en: "Legal Structuring" }, icon: Building2, desc: { es: "Asesoramos en la formación de la empresa y estructura corporativa adecuada.", en: "We advise on business formation and the appropriate corporate structure." } },
    { id: 4, title: { es: "Plan de Negocios", en: "Business Plan" }, icon: FileText, desc: { es: "El plan debe ser desarrollado por un especialista financiero. Nosotros revisamos que cumpla con los estándares migratorios.", en: "The plan must be developed by a financial specialist. We review it to ensure it meets immigration standards." } },
    { id: 5, title: { es: "Preparación del Caso", en: "Case Preparation" }, icon: CheckCircle2, desc: { es: "Preparamos y organizamos toda la documentación legal requerida para tu solicitud.", en: "We prepare and organize all the legal documentation required for your application." } },
    { id: 6, title: { es: "Presentación y Seguimiento", en: "Submission & Follow-up" }, icon: Send, desc: { es: "Gestionamos la solicitud ante USCIS o el Consulado y te preparamos para entrevista.", en: "We manage the application with USCIS or the Consulate and prepare you for the interview." } },
  ],

  faqs: [
    { q: { es: "¿Cuánto dinero necesito invertir?", en: "How much money do I need to invest?" }, a: { es: "No hay un mínimo legal fijo, pero la inversión debe ser 'sustancial'. En la práctica, recomendamos montos a partir de $100,000 USD para tener un caso sólido, aunque montos menores pueden funcionar según el tipo de negocio.", en: "There is no fixed legal minimum, but the investment must be 'substantial'. In practice, we recommend amounts starting at $100,000 USD to have a strong case, although smaller amounts may work depending on the business type." } },
    { q: { es: "¿La Visa E-2 da Residencia (Green Card)?", en: "Does the E-2 Visa give Residency (Green Card)?" }, a: { es: "No directamente. Es una visa de no inmigrante. Sin embargo, puede renovarse indefinidamente y existen estrategias legales para transicionar a otras visas que sí otorgan residencia.", en: "Not directly. It is a non-immigrant visa. However, it can be renewed indefinitely and there are legal strategies to transition to other visas that do grant residency." } },
    { q: { es: "¿Puede trabajar mi esposa/o?", en: "Can my spouse work?" }, a: { es: "Sí. El cónyuge del titular obtiene un permiso de trabajo general que le permite trabajar en cualquier lugar de EE.UU. sin restricciones.", en: "Yes. The holder's spouse obtains a general work permit allowing them to work anywhere in the U.S. without restrictions." } },
    { q: { es: "¿Puedo comprar un negocio existente?", en: "Can I buy an existing business?" }, a: { es: "Sí, y a menudo es recomendable. Comprar un negocio con historial operativo facilita demostrar que la inversión no es marginal y que el negocio es real.", en: "Yes, and it is often recommended. Buying a business with operational history makes it easier to demonstrate that the investment is not marginal and the business is real." } },
  ],

  interface: {
    badge: { es: "Visa de Inversionista", en: "Investor Visa" },
    heroTitle1: { es: "Visa E-2 para", en: "E-2 Visa for" },
    heroTitle2: { es: "Inversionistas", en: "Investors" },
    heroDescription: { es: "Tu puerta de entrada al mercado estadounidense. Asesoría legal experta para emprendedores que buscan seguridad y crecimiento en EE.UU.", en: "Your gateway to the US market. Expert legal advice for entrepreneurs seeking security and growth in the USA." },
    ctaConsultation: { es: "Evaluar Elegibilidad", en: "Evaluate Eligibility" },
    processMethod: { es: "Nuestro Método", en: "Our Method" },
    processTitle: { es: "El Camino hacia tu Visa", en: "The Path to Your Visa" },
    requestEvaluation: { es: "Solicita tu Evaluación", en: "Request Your Evaluation" },
    faqTitle: { es: "Preguntas Frecuentes", en: "Frequently Asked Questions" },
    faqSubtitle: { es: "Resolvemos tus dudas sobre inversión y migración.", en: "We solve your doubts about investment and migration." },
    contactTitle: { es: "Comienza Tu Negocio en EE.UU.", en: "Start Your Business in the USA" },
    
    // Nueva sección de abogada
    attorneySectionTitle: { es: "Liderazgo Experto", en: "Expert Leadership" },
    attorneyName: { es: "Maria Pilar Llusa", en: "Maria Pilar Llusa" },
    attorneyRole: { es: "Abogada Senior de Inmigración y Negocios", en: "Senior Business Immigration Attorney" },
    attorneyDesc1: { es: "Nacida en Madrid y graduada tanto en España como en la American University School of Law (Washington, DC), Maria Pilar lidera nuestra práctica de visas de inversión. Con una trayectoria distinguida, ha asesorado a clientes en sectores de tecnología, energía y gas, así como a empresas de Escandinavia, Sudamérica y España.", en: "Born in Madrid and a graduate of both Spanish law school and American University School of Law (Washington, DC), Maria Pilar leads our investment visa practice. With a distinguished career, she has advised clients in technology, energy, and gas sectors, as well as companies from Scandinavia, South America, and Spain." },
    attorneyDesc2: { es: "Su experiencia incluye roles como Directora de la Cámara de Comercio España-Texas y profesora adjunta en Rice University. Maria Pilar combina un profundo conocimiento legal con una visión de negocios global para asegurar el éxito de tu inversión en EE.UU.", en: "Her experience includes roles such as Director of the Spain-Texas Chamber of Commerce and Adjunct Professor at Rice University. Maria Pilar combines deep legal knowledge with a global business vision to ensure the success of your investment in the U.S." },
    attorneyBadge: { es: "Experta en Visas E-2", en: "E-2 Visa Expert" }
  }
};

export default function VisaE2Page() {
  const { language } = useLanguage();
  const lang = language as 'es' | 'en';
  
  const gT = (obj: any): string => getText(obj, lang);

  const [selectedTab, setSelectedTab] = useState<string>(texts.infoTabs[0].id);
  const activeTabContent = texts.infoTabs.find(s => s.id === selectedTab) || texts.infoTabs[0];

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

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full transform-gpu">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#001f5f]" />
         {/* Texture overlay for premium feel */}
         <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
         
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
            <span className="text-[15vw] font-black italic text-white tracking-tighter transform -skew-x-12 whitespace-nowrap">
               VISA E-2
            </span>
         </div>
      </div>

      {/* --- HERO SECTION --- */}
      {/* Ajustado padding top/bottom y height para centrar más el contenido */}
      <section className="relative pt-32 md:pt-40 pb-12 md:pb-20 px-4 z-10 min-h-[85vh] flex flex-col justify-center">
        <div className="container mx-auto max-w-7xl">
           <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
             
             {/* IMAGE CONTAINER - AJUSTADO */}
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1.2, ease: "easeOut" }}
               // Aumentada altura en Desktop y ajustada en móvil. Alineación cambiada para mejor posicionamiento
               className="lg:col-span-5 relative h-[450px] md:h-[600px] lg:h-[80vh] flex items-end justify-center order-2 lg:order-1"
             >
                <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent blur-xl z-10 h-1/4 bottom-0 w-full" />
                <div className="relative z-0 w-full h-full flex items-end justify-center">
                   <Image
                     src="/E-1.png"
                     alt="María del Pilar Llusa - Abogada experta en Inmigración"
                     fill
                     // Actualizado: Scale 110 (un poco mas grande) y translate negativo -280px (bajada tantito)
                     className="object-contain object-bottom md:scale-105 lg:scale-110 lg:-translate-y-[280px] drop-shadow-[0_0_35px_rgba(178,144,77,0.25)]"
                     priority
                     sizes="(max-width: 768px) 100vw, 50vw"
                   />
                </div>

                <motion.div
                   initial={{ opacity: 0, y: 20 }} 
                   animate={{ opacity: 1, y: 0 }} 
                   transition={{ delay: 0.8, duration: 0.8 }}
                   // Subido badge de experiencia MUCHO más arriba (bottom-48 en desktop)
                   className="absolute bottom-32 lg:bottom-48 -right-4 md:-right-10 z-20 p-6 border border-[#B2904D]/30 rounded-2xl backdrop-blur-xl bg-[#001540]/60 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                >
                   <div className="flex items-center gap-3 mb-1">
                      <Star className="w-5 h-5 text-[#B2904D] fill-[#B2904D]" />
                      <span className="text-[#B2904D] font-bold tracking-widest text-xs uppercase">Experiencia</span>
                   </div>
                   <div className="flex items-baseline text-white">
                      <span className="text-4xl md:text-5xl font-black tracking-tighter">35+</span> 
                      <span className="ml-2 text-sm font-light uppercase tracking-wider opacity-80">Años</span>
                   </div>
                </motion.div>
             </motion.div>

             {/* TEXT CONTAINER */}
             <div className="lg:col-span-7 space-y-8 pl-0 lg:pl-8 relative z-20 order-1 lg:order-2 flex flex-col justify-center items-start">
                 
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B2904D]/30 bg-[#B2904D]/10 backdrop-blur-sm shadow-[0_0_15px_rgba(178,144,77,0.1)] self-start">
                   <Briefcase size={16} className="text-[#B2904D]" />
                   <span className="text-[#B2904D] text-xs font-bold tracking-[0.2em] uppercase">{gT(texts.interface.badge)}</span>
                 </div>

                 <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-thin text-white tracking-tight leading-[1.1]">
                   <span className="block">
                     <motion.span custom={0} variants={textRevealVariant} initial="hidden" animate="visible" className="block text-white/90">
                         {gT(texts.interface.heroTitle1)}
                     </motion.span>
                   </span>
                   <span className="block">
                     <motion.span custom={1} variants={textRevealVariant} initial="hidden" animate="visible" className="block font-black text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] via-[#F3E5AB] to-[#B2904D] drop-shadow-sm">
                         {gT(texts.interface.heroTitle2)}
                     </motion.span>
                   </span>
                 </h1>

                 <motion.div 
                   initial={{ opacity: 0, x: -20 }} 
                   animate={{ opacity: 1, x: 0 }} 
                   transition={{ delay: 0.6 }}
                   className="h-1 w-24 bg-gradient-to-r from-[#B2904D] to-transparent rounded-full"
                 />

                 <motion.p 
                   initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                   className="text-lg md:text-xl text-blue-100/70 font-light max-w-xl leading-relaxed"
                 >
                   {gT(texts.interface.heroDescription)}
                 </motion.p>

                 <motion.div 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                   className="flex flex-wrap gap-4 pt-4"
                 >
                   <a href="#contacto" className="px-8 py-4 bg-[#B2904D] hover:bg-[#d4af37] text-[#001540] font-bold rounded-xl transition-all shadow-[0_0_30px_rgba(178,144,77,0.3)] hover:shadow-[0_0_40px_rgba(178,144,77,0.5)] hover:-translate-y-1 flex items-center gap-3 group text-base">
                      <FileText size={20} />
                      {gT(texts.interface.ctaConsultation)}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                   </a>
                 </motion.div>
             </div>

           </div>
        </div>
      </section>

      {/* --- NUEVA SECCIÓN: ABOGADA EXPERTA --- */}
      <section className="py-24 relative overflow-hidden bg-[#001f5f]/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Círculo decorativo de fondo */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#B2904D]/20 to-transparent rounded-full blur-3xl transform scale-90"></div>
              
              <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm aspect-[4/5] lg:aspect-square">
                <Image
                  src="/María del Pilar Llusa.png"
                  alt="Maria Pilar Llusa"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-80"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B2904D] mb-4 shadow-lg">
                    <Award size={14} className="text-[#001540]" />
                    <span className="text-[#001540] text-xs font-bold uppercase tracking-wider">{gT(texts.interface.attorneyBadge)}</span>
                  </div>
                  <h3 className="text-3xl font-black text-white mb-1">{gT(texts.interface.attorneyName)}</h3>
                  <p className="text-white/80 font-light">{gT(texts.interface.attorneyRole)}</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 60 }}
                  viewport={{ once: true }}
                  className="h-1 bg-[#B2904D] rounded-full mb-6"
                />
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                  {gT(texts.interface.attorneySectionTitle)}
                </h2>
              </div>

              <div className="space-y-6 text-lg text-blue-100/80 leading-relaxed font-light">
                <p>
                  {gT(texts.interface.attorneyDesc1)}
                </p>
                <p>
                  {gT(texts.interface.attorneyDesc2)}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-[#B2904D]/20 flex items-center justify-center text-[#B2904D]">
                    <Globe size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider font-bold">Experiencia</p>
                    <p className="text-white font-medium">Global & USA</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-[#B2904D]/20 flex items-center justify-center text-[#B2904D]">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider font-bold">Educación</p>
                    <p className="text-white font-medium">Madrid & Washington DC</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- SECCIÓN DE TABS --- */}
      <section className="px-4 py-24 relative z-10 bg-[#001026]" id="detalles">
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* TABS HEADER */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-16">
            {texts.infoTabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                onClick={() => setSelectedTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative px-6 py-4 rounded-2xl transition-all duration-300 border ${
                  selectedTab === tab.id
                    ? 'bg-[#B2904D] border-[#B2904D] shadow-[0_0_20px_rgba(178,144,77,0.4)]'
                    : 'bg-white/5 border-white/10 hover:border-[#B2904D]/50 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon 
                    size={20} 
                    className={`transition-all ${
                      selectedTab === tab.id ? 'text-[#001540]' : 'text-white/70 group-hover:text-[#B2904D]'
                    }`}
                  />
                  <span className={`font-bold text-sm tracking-wide ${
                    selectedTab === tab.id ? 'text-[#001540]' : 'text-white/90 group-hover:text-white'
                  }`}>
                    {gT(tab.title)}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* CONTENIDO EXPANDIDO */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
                
                {/* Decorative glow inside card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#B2904D]/10 rounded-full blur-[80px] pointer-events-none"></div>

                {/* Header del contenido */}
                <div className="flex flex-col md:flex-row items-start gap-8 mb-10 pb-10 border-b border-white/10">
                  <motion.div 
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-[#B2904D] to-[#D4AF37] flex items-center justify-center shadow-lg shadow-[#B2904D]/20 flex-shrink-0"
                  >
                    <activeTabContent.icon size={44} className="text-[#001540]" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight tracking-tight">
                      {gT(activeTabContent.title)}
                    </h3>
                    <p className="text-[#B2904D] text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-4">
                      {gT(activeTabContent.subtitle)}
                    </p>
                  </div>
                </div>

                {/* Contenido principal */}
                <div className="space-y-10">
                  
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                      <Target className="text-[#B2904D]" size={24} />
                      {gT(activeTabContent.content.intro)}
                    </h4>
                    <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed font-light">
                      {gT(activeTabContent.content.description)}
                    </p>
                  </div>

                  {/* Puntos especiales con diseño de tarjetas */}
                  {activeTabContent.content.subPoints && activeTabContent.content.subTitle && (
                    <div className="bg-[#001026]/40 p-8 rounded-3xl border border-white/5">
                      <h5 className="font-bold text-white mb-6 flex items-center gap-3 text-lg uppercase tracking-wider">
                        {gT(activeTabContent.content.subTitle)}
                      </h5>
                      <div className="grid md:grid-cols-2 gap-4">
                        {activeTabContent.content.subPoints?.map((point: any, i: number) => ( 
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            className="flex items-start gap-4 text-white/80 bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-[#B2904D]/30 hover:bg-white/10 transition-colors group"
                          >
                            <div className="w-2 h-2 rounded-full mt-2.5 shrink-0 bg-[#B2904D] group-hover:shadow-[0_0_8px_#B2904D] transition-shadow"></div>
                            <span className="text-base font-medium leading-snug">{gT(point)}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Solución / Nota extra */}
                  {activeTabContent.content.solution && (
                    <div className="bg-gradient-to-r from-[#B2904D]/20 to-transparent p-6 rounded-2xl border-l-4 border-[#B2904D]">
                      <p className="text-white leading-relaxed font-medium text-lg flex gap-4 items-start">
                        <DollarSign className="text-[#B2904D] shrink-0 mt-1" />
                        {gT(activeTabContent.content.solution)}
                      </p>
                    </div>
                  )}

                  {/* CTA interno */}
                  <div className="pt-6 flex justify-end">
                    <motion.a 
                      href="#contacto"
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 text-[#B2904D] font-bold uppercase tracking-widest text-sm hover:text-white transition-colors"
                    >
                      {gT(texts.interface.requestEvaluation)}
                      <ArrowRight size={18} />
                    </motion.a>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* --- PROCESO SECTION --- */}
      <section className="py-32 relative overflow-hidden bg-[#001f5f]/30">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <FileText size={14} className="text-[#B2904D]" />
              <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">{gT(texts.interface.processMethod)}</span>
            </motion.div>
            
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white mb-6">{gT(texts.interface.processTitle)}</h2>
            <div className="h-1 w-24 bg-[#B2904D] mx-auto rounded-full shadow-[0_0_15px_#B2904D]" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 relative">
            
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />

            {texts.processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="group relative z-10"
              >
                <div className="bg-[#001026] p-8 rounded-[2rem] border border-white/10 hover:border-[#B2904D]/50 transition-all duration-300 h-full shadow-lg relative overflow-hidden">
                  
                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B2904D]/0 to-[#B2904D]/0 group-hover:from-[#B2904D]/10 group-hover:to-transparent transition-all duration-500"></div>

                  <div className="flex justify-between items-start mb-6">
                      <motion.div 
                        className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#B2904D] transition-colors duration-300 shadow-inner"
                      >
                        <step.icon size={30} className="text-white/80 group-hover:text-[#001540] transition-colors" />
                      </motion.div>
                      <span className="text-4xl font-black text-white/5 group-hover:text-[#B2904D]/20 transition-colors">0{step.id}</span>
                  </div>

                  <h3 className="font-bold text-xl text-white mb-3">{gT(step.title)}</h3>
                  <p className="text-blue-100/60 text-sm leading-relaxed">{gT(step.desc)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="relative py-24 bg-[#001026]">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">{gT(texts.interface.faqTitle)}</h2>
            <p className="text-blue-100/60 text-lg max-w-2xl mx-auto font-light">{gT(texts.interface.faqSubtitle)}</p>
          </div>

          <div className="space-y-4">
             {texts.faqs.map((faq, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
               >
                 <div className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-[#B2904D]/30 transition-all duration-300">
                   <div className="flex items-center justify-between p-6 cursor-pointer">
                     <h3 className="text-lg font-medium text-white pr-8 flex gap-3">
                       <HelpCircle size={20} className="text-[#B2904D] shrink-0 mt-1" />
                       {gT(faq.q)}
                     </h3>
                   </div>
                   <div className="px-6 pb-8 pl-14">
                     <p className="text-blue-100/70 leading-relaxed text-base border-l-2 border-white/10 pl-4">
                       {gT(faq.a)}
                     </p>
                   </div>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* --- RELATED BLOG ARTICLE --- */}
      <section className="py-24 relative bg-[#001540]">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-black text-white mb-4">
              {lang === 'es' ? 'Recursos Relacionados' : 'Related Resources'}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-[#B2904D] to-transparent mx-auto rounded-full mt-6"
            />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                slug: 'residencia_laboral_eb3_ley_245i_entrada_indocumentada',
                title: { es: 'Residencia laboral EB-3 y Ley 245(i)', en: 'EB-3 Work Residency & Section 245(i)' },
                category: { es: 'Proceso Migratorio', en: 'Immigration Process' },
                image: '/blog/blog_13/BLOG03_CR1.png',
              },
              {
                slug: 'advance_parole_2026_viajar_con_daca_tps_visa_u',
                title: { es: 'Advance Parole 2026: viajar con DACA, TPS o Visa U', en: 'Advance Parole 2026: Travel with DACA, TPS or U Visa' },
                category: { es: 'Proceso Migratorio', en: 'Immigration Process' },
                image: '/blog/blog_12/BLOG02_CR1.png',
              },
              {
                slug: 'Formulario_G28_Cambiar_Abogado_Inmigracion',
                title: { es: 'Formulario G-28: cómo cambiar de abogado', en: 'Form G-28: How to Change Attorney' },
                category: { es: 'Proceso Migratorio', en: 'Immigration Process' },
                image: '/blog/blog_09/B9_CR1.png',
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
            className="relative z-10 p-5 sm:p-8 md:p-12 bg-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-[3rem] shadow-2xl border border-white/10 overflow-hidden"
          >
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#B2904D]/20 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20"></div>
              
              <div className="relative z-10 text-white"> 
                {/* Headers removidos para dejar solo el formulario */}
                
                <div className="contact-form-wrapper-override">
                    <ContactForm /> 
                </div>
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