'use client';

import React, { useState } from 'react';
import { m, AnimatePresence, Variants } from 'framer-motion';
import { inversionistasFaqs } from '../../lib/inversionistasFaq';
import {
  Phone,
  ArrowRight,
  Shield,
  CheckCircle2,
  FileText,
  Briefcase,
  Globe,
  Building2,
  Search,
  MessageSquare,
  Send,
  HelpCircle,
  DollarSign,
  Target,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import ContactForm from '../../components/ContactForm';
import { useLanguage } from '../../context/LanguageContext';
import { BRAND_LOGO } from '../../lib/brandLogo';

// ============================================================
// HELPERS
// ============================================================

type Bilingual = string | { es: string; en?: string } | undefined | null;

const getText = (obj: Bilingual, lang: 'es' | 'en'): string => {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj.es || '';
};

// ============================================================
// DATOS BILINGUES
// ============================================================

interface ContentDetail { es: string; en: string }

const infoTabs = [
  {
    id: 'general',
    title: { es: '¿Qué es la Visa E-2?', en: 'What is the E-2 Visa?' },
    subtitle: { es: 'Inversionistas por Tratado', en: 'Treaty Investors' },
    icon: FileText,
    content: {
      intro: { es: 'Tu camino legal para vivir, trabajar e invertir en EE.UU.', en: 'Your legal path to live, work, and invest in the U.S.' },
      description: { es: 'La Visa E-2 es una visa de no inmigrante que permite a ciudadanos de países con tratados comerciales con Estados Unidos residir y trabajar en el país mientras dirigen una empresa en la que han realizado una inversión sustancial. A diferencia de otras visas, te permite estar directamente involucrado en las operaciones diarias.', en: 'The E-2 Visa is a non-immigrant visa that allows citizens of countries with trade treaties with the United States to reside and work in the country while directing a business in which they have made a substantial investment. Unlike other visas, it allows you to be directly involved in daily operations.' },
      subTitle: { es: 'Características Principales:', en: 'Key Features:' },
      subPoints: [
        { es: 'Visa de No Inmigrante: Permite residir mientras operas tu negocio.', en: 'Non-Immigrant Visa: Allows residency while operating your business.' },
        { es: 'Renovable Indefinidamente: Mientras el negocio siga operando.', en: 'Indefinitely Renewable: As long as the business continues to operate.' },
        { es: 'Incluye a la Familia: Cónyuge e hijos menores de 21 años.', en: 'Includes Family: Spouse and children under 21.' },
        { es: 'Control Total: Diriges tu propia empresa.', en: 'Total Control: You run your own company.' },
      ],
    },
  },
  {
    id: 'requisitos',
    title: { es: 'Requisitos Clave', en: 'Key Requirements' },
    subtitle: { es: '¿Quién Califica?', en: 'Who Qualifies?' },
    icon: CheckCircle2,
    content: {
      intro: { es: 'Criterios fundamentales para la aprobación', en: 'Fundamental criteria for approval' },
      description: { es: 'Para obtener la Visa E-2, debes cumplir con una serie de requisitos estrictos establecidos por el gobierno de los Estados Unidos. Evaluamos tu perfil para asegurar el cumplimiento de cada uno.', en: 'To obtain the E-2 Visa, you must meet a series of strict requirements established by the US government. We evaluate your profile to ensure compliance with each one.' },
      subTitle: { es: 'Lista de Verificación:', en: 'Checklist:' },
      subPoints: [
        { es: 'Nacionalidad: Ser ciudadano de un país con tratado vigente.', en: 'Nationality: Be a citizen of a country with a current treaty.' },
        { es: 'Inversión Sustancial: Capital suficiente para asegurar el éxito del negocio.', en: 'Substantial Investment: Sufficient capital to ensure business success.' },
        { es: 'Negocio Real: Una empresa operativa, no especulativa.', en: 'Real Business: An operating company, not speculative.' },
        { es: 'Control: Poseer al menos el 50% o tener control operacional.', en: 'Control: Own at least 50% or have operational control.' },
      ],
      solution: { es: 'No existe un monto mínimo oficial de inversión, pero recomendamos montos a partir de $100,000 USD para mayor solidez.', en: 'There is no official minimum investment amount, but we recommend amounts starting at $100,000 USD for greater solidity.' },
    },
  },
  {
    id: 'beneficios',
    title: { es: 'Beneficios', en: 'Benefits' },
    subtitle: { es: 'Para ti y tu familia', en: 'For you and your family' },
    icon: Shield,
    content: {
      intro: { es: 'Ventajas más allá del negocio', en: 'Advantages beyond business' },
      description: { es: 'La Visa E-2 no solo abre puertas comerciales, sino que ofrece una calidad de vida superior para el inversionista y sus seres queridos en los Estados Unidos.', en: 'The E-2 Visa not only opens business doors but offers a superior quality of life for the investor and their loved ones in the United States.' },
      subTitle: { es: 'Ventajas Exclusivas:', en: 'Exclusive Advantages:' },
      subPoints: [
        { es: 'Cónyuge: Permiso de trabajo abierto en EE.UU.', en: 'Spouse: Open work permit in the U.S.' },
        { es: 'Hijos: Acceso a educación pública y privada.', en: 'Children: Access to public and private education.' },
        { es: 'Viajes: Libertad para entrar y salir del país.', en: 'Travel: Freedom to enter and leave the country.' },
        { es: 'Flexibilidad: Sin límite de ingresos para tu empresa.', en: 'Flexibility: No income limit for your company.' },
      ],
    },
  },
  {
    id: 'paises',
    title: { es: 'Países Tratado', en: 'Treaty Countries' },
    subtitle: { es: 'Elegibilidad por Nacionalidad', en: 'Eligibility by Nationality' },
    icon: Globe,
    content: {
      intro: { es: '¿Es tu país elegible para la Visa E-2?', en: 'Is your country eligible for the E-2 Visa?' },
      description: { es: 'Estados Unidos mantiene tratados de comercio y navegación con países específicos. Si eres ciudadano de alguno de estos países, tienes el primer paso completado.', en: 'The United States maintains treaties of commerce and navigation with specific countries. If you are a citizen of one of these countries, you have the first step completed.' },
      subTitle: { es: 'Países Hispanohablantes Comunes:', en: 'Common Spanish-speaking Countries:' },
      subPoints: [
        { es: 'Argentina, Colombia, Chile', en: 'Argentina, Colombia, Chile' },
        { es: 'Costa Rica, Ecuador, España', en: 'Costa Rica, Ecuador, Spain' },
        { es: 'Honduras, México, Panamá', en: 'Honduras, Mexico, Panama' },
        { es: 'Paraguay (y muchos más en Europa/Asia)', en: 'Paraguay (and many more in Europe/Asia)' },
      ],
      solution: { es: '¿Tu país no está en la lista? Contáctanos para explorar otras opciones de visa de inversión.', en: 'Is your country not on the list? Contact us to explore other investment visa options.' },
    },
  },
];

const processSteps = [
  { id: 1, title: { es: 'Consulta Inicial', en: 'Initial Consultation' }, icon: MessageSquare, desc: { es: 'Evaluamos tu perfil, tipo de inversión y viabilidad migratoria para la Visa E2.', en: 'We evaluate your profile, investment type, and immigration viability for the E2 Visa.' } },
  { id: 2, title: { es: 'Análisis del Proyecto', en: 'Project Analysis' }, icon: Search, desc: { es: 'Te orientamos sobre los requisitos que tu inversión debe cumplir según la ley migratoria.', en: 'We guide you on the requirements your investment must meet under immigration law.' } },
  { id: 3, title: { es: 'Estructuración Legal', en: 'Legal Structuring' }, icon: Building2, desc: { es: 'Asesoramos en la formación de la empresa y estructura corporativa adecuada.', en: 'We advise on business formation and the appropriate corporate structure.' } },
  { id: 4, title: { es: 'Plan de Negocios', en: 'Business Plan' }, icon: FileText, desc: { es: 'El plan debe ser desarrollado por un especialista financiero. Nosotros revisamos que cumpla con los estándares migratorios.', en: 'The plan must be developed by a financial specialist. We review it to ensure it meets immigration standards.' } },
  { id: 5, title: { es: 'Preparación del Caso', en: 'Case Preparation' }, icon: CheckCircle2, desc: { es: 'Preparamos y organizamos toda la documentación legal requerida para tu solicitud.', en: 'We prepare and organize all the legal documentation required for your application.' } },
  { id: 6, title: { es: 'Presentación y Seguimiento', en: 'Submission & Follow-up' }, icon: Send, desc: { es: 'Gestionamos la solicitud ante USCIS o el Consulado y te preparamos para entrevista.', en: 'We manage the application with USCIS or the Consulate and prepare you for the interview.' } },
];

// Las preguntas viven en app/lib/inversionistasFaq.ts para que la página
// servidor pueda emitir el FAQPage desde el MISMO array que se pinta aquí.
// Antes estaban en este archivo `'use client'` y por eso la sección se veía
// sin marcar.
const faqs = inversionistasFaqs;

const ui = {
  badge: { es: 'Visa de Inversionista', en: 'Investor Visa' },
  heroTitle1: { es: 'Visa E-2 para', en: 'E-2 Visa for' },
  heroTitle2: { es: 'Inversionistas', en: 'Investors' },
  heroDescription: { es: 'Tu puerta de entrada al mercado estadounidense. Asesoría legal experta para emprendedores que buscan seguridad y crecimiento en EE.UU.', en: 'Your gateway to the US market. Expert legal advice for entrepreneurs seeking security and growth in the USA.' },
  ctaConsultation: { es: 'Evaluar Elegibilidad', en: 'Evaluate Eligibility' },
  processMethod: { es: 'Nuestro Método', en: 'Our Method' },
  processTitle: { es: 'El Camino hacia tu Visa', en: 'The Path to Your Visa' },
  requestEvaluation: { es: 'Solicita tu Evaluación', en: 'Request Your Evaluation' },
  faqTitle: { es: 'Preguntas Frecuentes', en: 'Frequently Asked Questions' },
  faqSubtitle: { es: 'Resolvemos tus dudas sobre inversión y migración.', en: 'We solve your doubts about investment and migration.' },
  contactTitle: { es: 'Comienza Tu Inversión en EE.UU.', en: 'Start Your Investment in the USA' },
  contactSubtitle: { es: 'Complete el formulario y un abogado experto se comunicará con usted.', en: 'Fill out the form and an expert attorney will contact you.' },
  footerLegal: { es: 'Acepto recibir mensajes de texto de marketing y otros mensajes del Law Office of Manuel Solis al número proporcionado. Pueden aplicarse tarifas de mensajes y datos. El consentimiento no es una condición para recibir servicios. Para más información, por favor revise nuestra Política de Privacidad.', en: 'I agree to receive marketing text messages and other messages from the Law Office of Manuel Solis at the number provided. Message and data rates may apply. Consent is not a condition of receiving services. For more information, please review our Privacy Policy.' },
  footerCopyright: { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },
};

const PHONE_NUMBER = '(888) 676-1238';
const PHONE_LINK = 'tel:+18886761238';

// ============================================================
// HEADER SIN ESCAPATORIA (sin linea verde, sin nav)
// ============================================================

function LandingHeader() {
  const { language, setLanguage } = useLanguage();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const shouldBeScrolled = latest > 20;
    if (isScrolled !== shouldBeScrolled) setIsScrolled(shouldBeScrolled);
  });

  return (
    <m.header
      role="banner"
      className="fixed top-0 left-0 right-0 z-50 w-full"
      style={{ willChange: 'background-color, backdrop-filter' }}
      initial={{ backgroundColor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)' }}
      animate={{
        backgroundColor: isScrolled ? 'rgba(5, 15, 30, 0.9)' : 'rgba(0,0,0,0)',
        backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div
        className="w-full transition-all duration-300"
        style={{
          paddingTop: isScrolled ? '0.5rem' : '0.75rem',
          paddingBottom: isScrolled ? '0.5rem' : '0.75rem',
        }}
      >
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo — NO es un enlace */}
          <div className={`relative transition-all duration-500 ease-in-out ${isScrolled ? 'w-[140px]' : 'w-[190px]'}`}>
            <Image
              src={BRAND_LOGO.src}
              alt="Manuel Solis - Abogados"
              width={BRAND_LOGO.width}
              height={BRAND_LOGO.height}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            {/* Language switcher */}
            <div className="flex items-center gap-1.5 bg-white/5 rounded-lg px-2 py-1.5 border border-white/10">
              <button
                onClick={() => setLanguage('es')}
                className={`text-[11px] font-bold tracking-widest px-2 py-0.5 rounded transition-all ${
                  language === 'es' ? 'bg-[#B2904D] text-[#001540]' : 'text-white/50 hover:text-white'
                }`}
              >
                ES
              </button>
              <div className="w-[1px] h-3 bg-white/15" />
              <button
                onClick={() => setLanguage('en')}
                className={`text-[11px] font-bold tracking-widest px-2 py-0.5 rounded transition-all ${
                  language === 'en' ? 'bg-[#B2904D] text-[#001540]' : 'text-white/50 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Telefono — es conversion, no escape */}
            <a
              href={PHONE_LINK}
              className="flex items-center gap-2.5 text-white hover:text-[#B2904D] transition-colors group"
              aria-label="Call"
            >
              <Phone size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm md:text-base font-bold tracking-wider">{PHONE_NUMBER}</span>
            </a>
          </div>
        </div>
      </div>
    </m.header>
  );
}

// ============================================================
// FOOTER SIN ESCAPATORIA
// ============================================================

function LandingFooter({ lang }: { lang: 'es' | 'en' }) {
  const gT = (obj: any): string => getText(obj, lang);
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="relative bg-[#001540] text-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B2904D] to-transparent opacity-50" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col items-center mb-10">
          <Image
            src={BRAND_LOGO.src}
            alt="Manuel Solis - Abogados"
            width={BRAND_LOGO.width}
            height={BRAND_LOGO.height}
            className="h-16 w-auto mb-6"
          />
          <a
            href={PHONE_LINK}
            className="flex items-center gap-2.5 text-[#B2904D] hover:text-white transition-colors text-lg font-bold tracking-wider"
          >
            <Phone size={20} />
            {PHONE_NUMBER}
          </a>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-8 opacity-50">
          <p className="text-[10px] md:text-xs leading-relaxed font-light tracking-wide text-blue-100">
            {gT(ui.footerLegal)}
          </p>
        </div>

        <div className="text-center text-xs text-blue-200/40 border-t border-white/5 pt-6">
          <p>© {currentYear} Manuel Solis Law Firm. {gT(ui.footerCopyright)}</p>
        </div>
      </div>
    </footer>
  );
}

/* Orbes del hero con @keyframes CSS (solo transform/opacity, corren en el
   compositor) en lugar de loops infinitos de framer-motion, que ocupaban rAF
   en el hilo principal durante toda la visita. La opacidad de reposo del
   tercer orbe vive en la clase porque no lleva utilidad de opacidad: con
   `animation: none` (reduced-motion) volveria a opacity 1. */
const HERO_ORBS_CSS = `
  @keyframes inv-orb-gold {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(60px, -40px) scale(1.2); }
  }
  @keyframes inv-orb-blue {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-60px, 50px) scale(1.25); }
  }
  @keyframes inv-orb-gold-soft {
    0%, 100% { transform: translate(0, 0); opacity: 0.06; }
    50% { transform: translate(30px, -20px); opacity: 0.14; }
  }
  .inv-orb-gold { animation: inv-orb-gold 16s ease-in-out infinite both; }
  .inv-orb-blue { animation: inv-orb-blue 20s ease-in-out 2s infinite both; }
  .inv-orb-gold-soft { opacity: 0.06; animation: inv-orb-gold-soft 14s ease-in-out 1s infinite both; }
  @media (prefers-reduced-motion: reduce) {
    .inv-orb-gold, .inv-orb-blue, .inv-orb-gold-soft { animation: none; }
  }
`;

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

export default function InversionistasClient() {
  const { language } = useLanguage();
  const lang = language as 'es' | 'en';
  const gT = (obj: any): string => getText(obj, lang);

  const [selectedTab, setSelectedTab] = useState<string>(infoTabs[0].id);
  const activeTabContent = infoTabs.find((s) => s.id === selectedTab) || infoTabs[0];

  const textRevealVariant: Variants = {
    hidden: { y: '100%', rotateX: -20, opacity: 0 },
    visible: (custom: number) => ({
      y: 0,
      rotateX: 0,
      opacity: 1,
      transition: { duration: 1.2, delay: custom * 0.15, ease: 'easeOut' },
    }),
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#001540] text-white relative selection:bg-[#B2904D] selection:text-white font-sans overflow-x-hidden">
      <LandingHeader />

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full transform-gpu">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#001f5f]" />
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}
        />
        <div
          className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[80px] opacity-40"
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[70vw] h-[70vw] bg-sky-800/10 rounded-full blur-[90px] opacity-30"
        />
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
          <span className="text-[15vw] font-black italic text-white tracking-tighter transform -skew-x-12 whitespace-nowrap">
            VISA E-2
          </span>
        </div>
      </div>

      <main id="main-content" tabIndex={-1}>
        {/* --- HERO SECTION --- */}
        <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 px-4 z-10 min-h-[85vh] flex flex-col justify-center">
          {/* Orbes difuminados */}
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="inv-orb-gold absolute top-[5%] left-[0%] w-[600px] h-[600px] bg-[#B2904D]/[0.12] rounded-full blur-[150px]" />
            <div className="inv-orb-blue absolute bottom-[0%] right-[5%] w-[700px] h-[700px] bg-blue-400/[0.08] rounded-full blur-[160px]" />
            <div className="inv-orb-gold-soft absolute top-[25%] right-[20%] w-[500px] h-[500px] bg-[#B2904D]/[0.08] rounded-full blur-[130px]" />
            <style dangerouslySetInnerHTML={{ __html: HERO_ORBS_CSS }} />
          </div>

          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* TEXT CONTAINER */}
              <div className="lg:col-span-12 space-y-8 relative z-20 flex flex-col justify-center items-start max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B2904D]/30 bg-[#B2904D]/10 backdrop-blur-sm shadow-[0_0_15px_rgba(178,144,77,0.1)] self-start">
                  <Briefcase size={16} className="text-[#B2904D]" />
                  <span className="text-[#B2904D] text-xs font-bold tracking-[0.2em] uppercase">
                    {gT(ui.badge)}
                  </span>
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-thin text-white tracking-tight leading-[1.1]">
                  <span className="block">
                    <m.span custom={0} variants={textRevealVariant} initial="hidden" animate="visible" className="block text-white/90">
                      {gT(ui.heroTitle1)}
                    </m.span>
                  </span>{' '}
                  <span className="block">
                    <m.span custom={1} variants={textRevealVariant} initial="hidden" animate="visible" className="block font-black text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] via-[#F3E5AB] to-[#B2904D] drop-shadow-sm">
                      {gT(ui.heroTitle2)}
                    </m.span>
                  </span>
                </h1>

                <m.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="h-1 w-24 bg-gradient-to-r from-[#B2904D] to-transparent rounded-full"
                />

                <m.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-lg md:text-xl text-blue-100/70 font-light max-w-xl leading-relaxed"
                >
                  {gT(ui.heroDescription)}
                </m.p>

                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex flex-wrap items-center gap-4 pt-4"
                >
                  <a
                    href="#contacto"
                    className="px-8 py-4 bg-[#B2904D] hover:bg-[#d4af37] text-[#001540] font-bold rounded-xl transition-all shadow-[0_0_30px_rgba(178,144,77,0.3)] hover:shadow-[0_0_40px_rgba(178,144,77,0.5)] hover:-translate-y-1 flex items-center gap-3 group text-base"
                  >
                    <FileText size={20} />
                    {gT(ui.ctaConsultation)}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>

                  <div className="inline-flex items-center gap-3 px-5 py-3 border border-[#B2904D]/30 rounded-xl backdrop-blur-xl bg-[#001540]/40">
                    <Star className="w-5 h-5 text-[#B2904D] fill-[#B2904D]" />
                    <div className="flex items-baseline text-white">
                      <span className="text-2xl md:text-3xl font-black tracking-tighter">35+</span>
                      <span className="ml-2 text-xs font-light uppercase tracking-wider opacity-80">
                        {lang === 'es' ? 'Años de experiencia' : 'Years of experience'}
                      </span>
                    </div>
                  </div>
                </m.div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECCION DE TABS --- */}
        <section className="px-4 py-24 relative z-10 bg-[#001026]" id="detalles">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {infoTabs.map((tab, index) => (
                <m.button
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
                    <tab.icon size={20} className={`transition-all ${selectedTab === tab.id ? 'text-[#001540]' : 'text-white/70 group-hover:text-[#B2904D]'}`} />
                    <span className={`font-bold text-sm tracking-wide ${selectedTab === tab.id ? 'text-[#001540]' : 'text-white/90 group-hover:text-white'}`}>
                      {gT(tab.title)}
                    </span>
                  </div>
                </m.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <m.div
                key={selectedTab}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="max-w-5xl mx-auto"
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#B2904D]/10 rounded-full blur-[80px] pointer-events-none" />

                  <div className="flex flex-col md:flex-row items-start gap-8 mb-10 pb-10 border-b border-white/10">
                    <m.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                      className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-[#B2904D] to-[#D4AF37] flex items-center justify-center shadow-lg shadow-[#B2904D]/20 flex-shrink-0"
                    >
                      <activeTabContent.icon size={44} className="text-[#001540]" />
                    </m.div>
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight tracking-tight">{gT(activeTabContent.title)}</h3>
                      <p className="text-[#B2904D] text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-4">{gT(activeTabContent.subtitle)}</p>
                    </div>
                  </div>

                  <div className="space-y-10">
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                        <Target className="text-[#B2904D]" size={24} />
                        {gT(activeTabContent.content.intro)}
                      </h4>
                      <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed font-light">{gT(activeTabContent.content.description)}</p>
                    </div>

                    {activeTabContent.content.subPoints && activeTabContent.content.subTitle && (
                      <div className="bg-[#001026]/40 p-8 rounded-3xl border border-white/5">
                        <h5 className="font-bold text-white mb-6 flex items-center gap-3 text-lg uppercase tracking-wider">{gT(activeTabContent.content.subTitle)}</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          {activeTabContent.content.subPoints.map((point: any, i: number) => (
                            <m.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + i * 0.1 }}
                              className="flex items-start gap-4 text-white/80 bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-[#B2904D]/30 hover:bg-white/10 transition-colors group"
                            >
                              <div className="w-2 h-2 rounded-full mt-2.5 shrink-0 bg-[#B2904D] group-hover:shadow-[0_0_8px_#B2904D] transition-shadow" />
                              <span className="text-base font-medium leading-snug">{gT(point)}</span>
                            </m.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {(activeTabContent.content as any).solution && (
                      <div className="bg-gradient-to-r from-[#B2904D]/20 to-transparent p-6 rounded-2xl border-l-4 border-[#B2904D]">
                        <p className="text-white leading-relaxed font-medium text-lg flex gap-4 items-start">
                          <DollarSign className="text-[#B2904D] shrink-0 mt-1" />
                          {gT((activeTabContent.content as any).solution)}
                        </p>
                      </div>
                    )}

                    <div className="pt-6 flex justify-end">
                      <m.a
                        href="#contacto"
                        whileHover={{ x: 5 }}
                        className="inline-flex items-center gap-2 text-[#B2904D] font-bold uppercase tracking-widest text-sm hover:text-white transition-colors"
                      >
                        {gT(ui.requestEvaluation)}
                        <ArrowRight size={18} />
                      </m.a>
                    </div>
                  </div>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </section>

        {/* --- PROCESO SECTION --- */}
        <section className="py-32 relative overflow-hidden bg-[#001f5f]/30">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24">
              <m.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
              >
                <FileText size={14} className="text-[#B2904D]" />
                <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">{gT(ui.processMethod)}</span>
              </m.div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">{gT(ui.processTitle)}</h2>
              <div className="h-1 w-24 bg-[#B2904D] mx-auto rounded-full shadow-[0_0_15px_#B2904D]" />
            </m.div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
              {processSteps.map((step, index) => (
                <m.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                  className="group relative z-10"
                >
                  <div className="bg-[#001026] p-8 rounded-[2rem] border border-white/10 hover:border-[#B2904D]/50 transition-all duration-300 h-full shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#B2904D]/0 to-[#B2904D]/0 group-hover:from-[#B2904D]/10 group-hover:to-transparent transition-all duration-500" />
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#B2904D] transition-colors duration-300 shadow-inner">
                        <step.icon size={30} className="text-white/80 group-hover:text-[#001540] transition-colors" />
                      </div>
                      <span className="text-4xl font-black text-white/5 group-hover:text-[#B2904D]/20 transition-colors">0{step.id}</span>
                    </div>
                    <h3 className="font-bold text-xl text-white mb-3">{gT(step.title)}</h3>
                    <p className="text-blue-100/60 text-sm leading-relaxed">{gT(step.desc)}</p>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <section className="relative py-24 bg-[#001026]">
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">{gT(ui.faqTitle)}</h2>
              <p className="text-blue-100/60 text-lg max-w-2xl mx-auto font-light">{gT(ui.faqSubtitle)}</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <m.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-[#B2904D]/30 transition-all duration-300">
                    <div className="flex items-center justify-between p-6">
                      <h3 className="text-lg font-medium text-white pr-8 flex gap-3">
                        <HelpCircle size={20} className="text-[#B2904D] shrink-0 mt-1" />
                        {gT(faq.q)}
                      </h3>
                    </div>
                    <div className="px-6 pb-8 pl-14">
                      <p className="text-blue-100/70 leading-relaxed text-base border-l-2 border-white/10 pl-4">{gT(faq.a)}</p>
                    </div>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CONTACTO SECTION — usa ContactForm real del proyecto --- */}
        <section id="contacto" className="relative py-32 z-10 bg-transparent">
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <m.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 p-8 md:p-12 bg-white/5 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white/10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#B2904D]/20 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20" />
              <div className="relative z-10 text-white">
                <ContactForm />
              </div>
            </m.div>
          </div>
        </section>
      </main>

      <LandingFooter lang={lang} />

      <style jsx global>{`
        .scrollbar-custom::-webkit-scrollbar { width: 8px; }
        .scrollbar-custom::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .scrollbar-custom::-webkit-scrollbar-thumb { background: #b2904d; border-radius: 10px; }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover { background: #d4af37; }
      `}</style>
    </div>
  );
}
