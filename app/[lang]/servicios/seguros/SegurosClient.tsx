  'use client';

  import React, { useState, useEffect, useRef } from 'react';
  import { m, AnimatePresence, Variants } from 'framer-motion';
  import {
    PhoneCall,
    ArrowRight,
    Zap,
    Truck,
    Car,
    Stethoscope,
    Scale,
    FileText,
    HandCoins,
    Star,
    MapPin
  } from 'lucide-react';

  import Image from 'next/image';

  import Header from '../../../components/Header';
  import Footer from '../../../components/Footer';
  import ContactForm from '../../../components/ContactForm';
  import Breadcrumbs from '../../../components/Breadcrumbs';
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
        id: 'incendio',
        title: { es: "Reclamaciones por Incendio", en: "Fire Claims" },
        subtitle: { es: "Daños por Fuego, Humo y Agua", en: "Fire, Smoke, and Water Damage" },
        icon: Zap,
        offices: [
          'Arvada (Denver)',
          'Chicago',
          'Dallas',
          'El Paso',
          'Harlingen',
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
          intro: { es: "El fuego causa estragos en propiedades. ¿Siente que su aseguradora no lo cubre?", en: "Fire causes havoc on properties. Do you feel your insurer isn't covering you?" },
          description: { es: "Los daños causados por un incendio, el humo y el agua pueden ser catastróficos. Las compañías de seguros a menudo buscan formas de minimizar el pago o negar el reclamo por completo. Le ayudamos a luchar por la compensación total que se merece.", en: "Damage caused by fire, smoke, and water can be catastrophic. Insurance companies often look for ways to minimize payment or deny the claim outright. We help you fight for the full compensation you deserve." },
          subTitle: { es: "Argumentos Comunes de la Aseguradora:", en: "Common Insurer Arguments:" },
          subPoints: [
            { es: "Falta de mantenimiento de la propiedad.", en: "Lack of property maintenance." },
            { es: "Mano de obra defectuosa.", en: "Defective workmanship." },
            { es: "Exclusiones o condiciones escritas en la póliza.", en: "Exclusions or conditions written in the policy." },
            { es: "Daño preexistente.", en: "Pre-existing damage." },
          ],
          solution: { es: "Nos aseguraremos de que el valor real de la pérdida sea evaluado correctamente, incluyendo la estructura, contenidos y gastos de subsistencia temporales (ALE).", en: "We will ensure the actual value of the loss is properly assessed, including the structure, contents, and temporary living expenses (ALE)." },
        }
      },
      {
        id: 'granizo_viento',
        title: { es: "Daños por Granizo y Viento", en: "Hail and Wind Damage" },
        subtitle: { es: "Techos, Estructuras y Fachadas", en: "Roofs, Structures, and Facades" },
        icon: Truck,
        offices: [
          'Arvada (Denver)',
          'Chicago',
          'Dallas',
          'El Paso',
          'Harlingen',
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
          intro: { es: "¿Su techo o propiedad fue dañado por una tormenta de viento o granizo?", en: "Was your roof or property damaged by a wind or hail storm?" },
          description: { es: "El granizo y los vientos fuertes pueden causar daños estructurales invisibles que las aseguradoras intentarán ignorar o clasificar como 'daño preexistente'. Es posible que podamos ayudarlo a recibir la compensación que se merece.", en: "Hail and strong winds can cause invisible structural damage that insurers will try to ignore or classify as 'pre-existing damage'. We may be able to help you receive the compensation you deserve." },
          solution: { es: "Enviaremos ajustadores y expertos independientes para documentar el daño real y contrarrestar la evaluación baja de la compañía de seguros.", en: "We will send independent adjusters and experts to document the actual damage and counter the insurance company's low valuation." },
        }
      },
      {
        id: 'tornado',
        title: { es: "Reclamaciones por Tornado", en: "Tornado Claims" },
        subtitle: { es: "Pérdida Total y Reconstrucción", en: "Total Loss and Reconstruction" },
        icon: Car,
        offices: [
          'Arvada (Denver)',
          'Chicago',
          'Dallas',
          'El Paso',
          'Harlingen',
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
          intro: { es: "¿Ha sufrido una pérdida catastrófica debido a un tornado?", en: "Have you suffered a catastrophic loss due to a tornado?" },
          description: { es: "Los tornados a menudo resultan en pérdidas totales o daños estructurales masivos. Las disputas giran en torno al valor de reemplazo. Su compañía de seguros debe pagar lo suficiente para que usted reconstruya. Esto puede ser un proceso largo que requiere representación experta.", en: "Tornadoes often result in total losses or massive structural damage. Disputes revolve around replacement value. Your insurance company must pay enough for you to rebuild. This can be a lengthy process that requires expert representation." },
          solution: { es: "Luchamos contra la negación, el pago insuficiente o el retraso en la liquidación para que pueda comenzar la reconstrucción lo antes posible.", en: "We fight against denial, underpayment, or delayed settlement so you can start rebuilding as soon as possible." },
        }
      },
      {
        id: 'tuberias_congeladas',
        title: { es: "Tuberías Congeladas / Daños por Agua", en: "Frozen Pipes / Water Damage" },
        subtitle: { es: "Daños Invernales e Inundaciones", en: "Winter Damage and Flooding" },
        icon: Stethoscope,
        offices: [
          'Arvada (Denver)',
          'Chicago',
          'Dallas',
          'El Paso',
          'Harlingen',
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
          intro: { es: "Daños causados por tuberías congeladas o roturas de agua durante tormentas invernales.", en: "Damage caused by frozen pipes or water leaks during winter storms." },
          description: { es: "El daño por agua es costoso y las aseguradoras a menudo argumentan 'falta de mantenimiento'. Póngase en contacto con nosotros si su casa sufrió daños como resultado de tuberías congeladas. Es posible que podamos ayudarle a recuperar costos de reparación y subsistencia.", en: "Water damage is costly, and insurers often argue 'lack of maintenance'. Contact us if your home suffered damage as a result of frozen pipes. We may be able to help you recover repair and living expenses." },
          subTitle: { es: "Recuperación de Costos Incluye:", en: "Cost Recovery Includes:" },
          subPoints: [
            { es: "Costo de exponer tuberías dañadas.", en: "Cost to expose damaged pipes." },
            { es: "Reparaciones en propiedades dañadas.", en: "Repairs to damaged property." },
            { es: "Secado o reemplazo de alfombras y muros.", en: "Drying or replacing carpets and walls." },
            { es: "Gastos de subsistencia si no pudo vivir en su casa.", en: "Living expenses if you could not live in your home." },
          ],
          solution: { es: "Es crucial actuar rápidamente para documentar y reparar el daño. Luchamos para que su póliza cubra el costo total de la restauración.", en: "It is crucial to act quickly to document and repair the damage. We fight for your policy to cover the total cost of restoration." },
        }
      },
      {
        id: 'disputas_mala_fe',
        title: { es: "Disputas con la Aseguradora", en: "Insurer Disputes" },
        subtitle: { es: "Negación, Retraso y Mala Fe", en: "Denial, Delay, and Bad Faith" },
        icon: Scale,
        offices: [
          'Arvada (Denver)',
          'Chicago',
          'Dallas',
          'El Paso',
          'Harlingen',
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
          intro: { es: "¿Siente que su compañía de seguros lo está tratando injustamente?", en: "Do you feel your insurance company is treating you unfairly?" },
          description: { es: "Representamos a asegurados en disputas con sus compañías de seguros. Las compañías con frecuencia niegan la cobertura, no pagan lo suficiente por la propiedad dañada o tardan demasiado. Ha pagado sus primas, usted merece ser tratado de manera justa.", en: "We represent policyholders in disputes with their insurance companies. Companies frequently deny coverage, underpay for damaged property, or take too long. You've paid your premiums, you deserve to be treated fairly." },
          subTitle: { es: "Acciones de Mala Fe Comunes:", en: "Common Bad Faith Actions:" },
          subPoints: [
            { es: "Negado a pagar el reclamo.", en: "Refusing to pay the claim." },
            { es: "Mal pagado (no cubre el costo total de la reparación del daño).", en: "Underpaying (not covering the total cost of repairing the damage)." },
            { es: "Retrasado el pago excesivamente.", en: "Excessively delaying payment." },
            { es: "Aplicado un deducible incorrecto.", en: "Applying an incorrect deductible." },
          ],
          solution: { es: "Analizamos su póliza, el reclamo y la conducta de la aseguradora para presentar una demanda por incumplimiento de contrato y posible mala fe, buscando la compensación completa.", en: "We analyze your policy, the claim, and the insurer's conduct to file a lawsuit for breach of contract and possible bad faith, seeking full compensation." },
        }
      },
    ] as CaseItem[],

    processSteps: [
      { id: 1, title: { es: "Análisis de Póliza", en: "Policy Analysis" }, icon: FileText, desc: { es: "Revisamos su póliza y los detalles del daño.", en: "We review your policy and the damage details." } },
      { id: 2, title: { es: "Investigación Experta", en: "Expert Investigation" }, icon: Truck, desc: { es: "Enviamos ajustadores independientes para documentar la pérdida.", en: "We send independent adjusters to document the loss." } },
      { id: 3, title: { es: "Reclamación Formal", en: "Formal Claim" }, icon: Scale, desc: { es: "Presentamos su reclamo por el valor total real.", en: "We file your claim for the actual total value." } },
      { id: 4, title: { es: "Litigio y Cobro", en: "Litigation and Collection" }, icon: HandCoins, desc: { es: "Luchamos para que reciba la compensación que le corresponde.", en: "We fight for you to receive the compensation you are due." } }, 
    ],

    interface: {
      badge: { es: "Daños a la Propiedad", en: "Property Damage" },
      mainTitle: { es: "RECLAMOS DE SEGURO", en: "INSURANCE CLAIMS" },
      heroTitle1: { es: "Expertos en", en: "Experts in" },
      heroTitle2: { es: "Reclamaciones de Seguros", en: "Insurance Claims" }, 
      heroDescription: { es: "Obtenga el pago que se merece por daños de viento, granizo, incendio o agua. Luchamos contra la negación, el retraso y el pago insuficiente.", en: "Get the payment you deserve for wind, hail, fire, or water damage. We fight against denial, delay, and underpayment." },
      stats: { es: "Reclamaciones Ganadas", en: "Claims Won" },
      casesTitle: { es: "Soluciones en Seguros", en: "Legal Solutions in Insurance" },
      ctaConsultation: { es: "Consulta Ahora", en: "Consult Now" },
      ctaCases: { es: "Ver Tipos de Casos", en: "View Case Types" },
      specialties: { es: "Nuestras Especialidades", en: "Our Specialties" },
      details: { es: "Ver Detalles", en: "View Details" },
      modalClosing: { es: "Abogados especializados en daños a la propiedad luchando por su pago justo.", en: "Attorneys specialized in property damage fighting for your fair payment." },
      videoSectionBadge: { es: "Conoce a Nuestro Equipo", en: "Meet Our Team" },
      videoSectionTitle: { es: "Abogado", en: "Attorney" },
      videoSectionSubtitle: { es: "Escucha directamente de nuestros socios cómo protegemos tus derechos en la disputa de seguros.", en: "Hear directly from our partners how we protect your rights in insurance disputes." },
      callNow: { es: "Llámanos Ahora Mismo", en: "Call Us Right Now" },
      processMethod: { es: "Nuestro Método", en: "Our Method" },
      processTitle: { es: "El Proceso de su Reclamación", en: "Your Claim Process" },
      requestEvaluation: { es: "Solicitar Evaluación", en: "Request Evaluation" },
      videoAlt: { es: "Video explicativo sobre la dedicación del equipo legal.", en: "Explanation video about the legal team's dedication." },
      availableOffices: { es: "Oficinas Disponibles", en: "Available Offices" },
      officesCount: { es: "oficinas", en: "offices" }
    }
  };

  export default function InsuranceClaimsPage() {
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
                SEGUROS
              </span>
          </div>
        </div>

        {/* --- BREADCRUMBS --- */}
        <div className="relative z-10 pt-24 md:pt-28 px-4">
          <div className="container mx-auto max-w-7xl">
            <Breadcrumbs items={[
              { label: { es: 'Inicio', en: 'Home' }, href: `/${language}` },
              { label: { es: 'Servicios', en: 'Services' }, href: `/${language}/servicios` },
              { label: { es: 'Seguros', en: 'Insurance' }, href: `/${language}/servicios/seguros` },
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
                          src="/insurance-hero.png"
                          alt="Abogado de reclamos de seguros de auto y propiedad en Houston, Texas"
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
                        <span className="text-4xl md:text-5xl font-bold tracking-tighter">8K</span> 
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
                      <Zap size={14} className="text-[#B2904D] fill-[#B2904D]" />
                      <span className="text-[#B2904D] text-xs font-bold tracking-widest uppercase">{t('badge')}</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-thin text-white tracking-tight leading-[1.4]">
                      <span className="block overflow-visible pb-1 md:pb-2">
                        <m.span custom={0} variants={textRevealVariant} initial="hidden" animate="visible" className="block text-white/90 whitespace-normal">
                            {t('heroTitle1')}
                        </m.span>
                      </span>
                      <span className="block overflow-visible pb-2 md:pb-4">
                        <m.span custom={1} variants={textRevealVariant} initial="hidden" animate="visible" className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] via-[#F3E5AB] to-[#B2904D] whitespace-normal">
                            {t('heroTitle2')}
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

        {/* --- VIDEO SECTION --- */}
        <section className="py-32 relative overflow-hidden bg-[#001540]"> 
          
          <div className="absolute inset-0 bg-[#001540] opacity-90" />

          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <m.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <m.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm mb-8"
              >
                <div className="w-2 h-2 bg-[#B2904D] rounded-full animate-pulse"></div>
                <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">{t('videoSectionBadge')}</span>
              </m.div>
              
              <h2 className="text-4xl font-black text-white mb-6 leading-tight">
                {t('videoSectionTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] to-[#D4AF37]">Juan Solís</span>
              </h2>
              
              <p className="text-xl text-blue-100/70 mb-8 leading-relaxed">
                {t('videoSectionSubtitle')}
              </p>
              
              <m.a 
                href="tel:+18664200405"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-4 bg-[#B2904D] text-[#001540] px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-white transition-all"
              >
                <div className="relative w-10 h-10 bg-black/10 rounded-lg flex items-center justify-center">
                  <PhoneCall size={20} />
                </div>
                <span className="relative">{t('callNow')}</span>
              </m.a>
            </m.div>

            <m.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 relative group p-6 bg-white/10 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/10"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-black aspect-video"> 
                <m.div 
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onClick={togglePlayPause}
                  className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer bg-black/10 hover:bg-black/0 transition-colors"
                >
                  {!isPlaying && (
                    <m.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/60"
                    >
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                    </m.div>
                  )}
                </m.div>
                <video 
                  ref={videoRef}
                  src="https://vz-9f852395-0ee.b-cdn.net/d7979aa5-40db-49f2-8566-b8a580591661/playlist.m3u8" 
                  className="w-full h-full object-cover" 
                  aria-label={t('videoAlt')}
                />
              </div>
            </m.div>
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

        {/* --- BLOG SUGGESTIONS SECTION --- */}
        <section className="py-24 relative bg-[#001540]">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <m.div
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
                  slug: 'Formulario_G28_Cambiar_Abogado_Inmigracion',
                  title: { es: 'Formulario G-28: cómo cambiar de abogado', en: 'Form G-28: How to Change Attorney' },
                  category: { es: 'Proceso Migratorio', en: 'Immigration Process' },
                  image: '/blog/blog_09/B9_CR1.png',
                },
                {
                  slug: 'foia_migratoria_pedir_record_antes_de_aplicar',
                  title: { es: 'FOIA: pedir récord antes de aplicar', en: 'FOIA: Request Records Before Applying' },
                  category: { es: 'Proceso Migratorio', en: 'Immigration Process' },
                  image: '/blog/blog_14/BLOG04_CR1.png',
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