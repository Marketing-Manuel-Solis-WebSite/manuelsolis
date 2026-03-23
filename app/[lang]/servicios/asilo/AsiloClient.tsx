'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  PhoneCall,
  ArrowRight,
  Shield,
  CheckCircle2,
  FileText,
  Globe,
  Users,
  MapPin,
  Target,
  MessageSquare,
  Send,
  Search,
  HelpCircle,
  Scale,
  ShieldCheck,
  BookOpen,
  AlertTriangle,
  Flag
} from 'lucide-react';

import Link from 'next/link';
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

const offices = [
  { name: 'Houston Principal', slug: 'houston-principal' },
  { name: 'Houston Bellaire', slug: 'houston-bellaire' },
  { name: 'Houston Accidentes', slug: 'houston-accidentes' },
  { name: 'Northchase', slug: 'northchase' },
  { name: 'North Loop', slug: 'north-loop' },
  { name: 'Main St', slug: 'main-st' },
  { name: 'Kirby', slug: 'kirby' },
  { name: 'League City', slug: 'league-city' },
  { name: 'Dallas', slug: 'dallas' },
  { name: 'El Paso', slug: 'el-paso' },
  { name: 'Harlingen', slug: 'harlingen' },
  { name: 'Los Angeles', slug: 'losangeles' },
  { name: 'Chicago', slug: 'chicago' },
  { name: 'Arvada (Denver)', slug: 'arvada' },
  { name: 'Memphis', slug: 'memphis' },
];

const texts = {
  infoTabs: [
    {
      id: 'que-es-asilo',
      title: { es: '¿Qué es el Asilo?', en: 'What is Asylum?' },
      subtitle: { es: 'Protección para perseguidos', en: 'Protection for the Persecuted' },
      icon: Shield,
      content: {
        intro: {
          es: 'Tu derecho a buscar protección en Estados Unidos',
          en: 'Your right to seek protection in the United States'
        },
        description: {
          es: 'El asilo es una forma de protección internacional que permite a personas que huyen de persecución en sus países de origen solicitar permiso para vivir en Estados Unidos. Para calificar, debes demostrar que has sufrido persecución o tienes un temor fundado de persecución basado en al menos uno de cinco motivos protegidos por la ley: raza, religión, nacionalidad, opinión política o pertenencia a un grupo social determinado. El asilo puede solicitarse de forma afirmativa (ante USCIS) o de forma defensiva (ante un juez de inmigración durante procedimientos de deportación). Si se aprueba, el asilado recibe autorización de trabajo, puede solicitar a ciertos familiares y, después de un año, puede solicitar la residencia permanente.',
          en: 'Asylum is a form of international protection that allows people fleeing persecution in their home countries to request permission to live in the United States. To qualify, you must demonstrate that you have suffered persecution or have a well-founded fear of persecution based on at least one of five grounds protected by law: race, religion, nationality, political opinion, or membership in a particular social group. Asylum can be requested affirmatively (with USCIS) or defensively (before an immigration judge during deportation proceedings). If approved, the asylee receives work authorization, can petition for certain family members, and after one year can apply for permanent residency.'
        },
        subTitle: { es: 'Los Cinco Motivos Protegidos:', en: 'The Five Protected Grounds:' },
        subPoints: [
          { es: 'Raza: Persecución por origen étnico o racial.', en: 'Race: Persecution based on ethnic or racial origin.' },
          { es: 'Religión: Persecución por creencias religiosas o prácticas de fe.', en: 'Religion: Persecution based on religious beliefs or faith practices.' },
          { es: 'Nacionalidad: Persecución por país de origen o grupo étnico.', en: 'Nationality: Persecution based on country of origin or ethnic group.' },
          { es: 'Opinión Política: Persecución por opiniones políticas reales o imputadas.', en: 'Political Opinion: Persecution based on actual or imputed political opinions.' },
          { es: 'Grupo Social: Persecución por pertenecer a un grupo social específico (género, orientación sexual, familia, etc.).', en: 'Particular Social Group: Persecution based on membership in a specific social group (gender, sexual orientation, family, etc.).' },
        ],
        solution: {
          es: 'El asilo es una de las protecciones más fundamentales del derecho internacional. Nuestros abogados evalúan tu caso, identifican las mejores bases legales y te representan en cada paso.',
          en: 'Asylum is one of the most fundamental protections in international law. Our attorneys evaluate your case, identify the strongest legal grounds, and represent you every step of the way.'
        }
      }
    },
    {
      id: 'afirmativo-defensivo',
      title: { es: 'Asilo Afirmativo vs Defensivo', en: 'Affirmative vs Defensive Asylum' },
      subtitle: { es: 'Dos caminos, un objetivo', en: 'Two paths, one goal' },
      icon: Scale,
      content: {
        intro: {
          es: 'Entiende las dos formas de solicitar asilo',
          en: 'Understand the two ways to apply for asylum'
        },
        description: {
          es: 'El asilo afirmativo se solicita directamente ante USCIS presentando el Formulario I-589 dentro del primer año de tu llegada a Estados Unidos. Un oficial de asilo conducirá una entrevista privada donde evaluará tu caso. Si no se aprueba, el caso se refiere a un juez de inmigración para procedimientos de deportación, donde puedes renovar tu solicitud como asilo defensivo. El asilo defensivo se presenta como defensa ante un juez de inmigración cuando ya estás en procedimientos de deportación. Es el mismo formulario I-589, pero el proceso ocurre en la corte de inmigración con un juez que decide si calificas.',
          en: 'Affirmative asylum is requested directly from USCIS by filing Form I-589 within the first year of your arrival in the United States. An asylum officer will conduct a private interview to evaluate your case. If not approved, the case is referred to an immigration judge for removal proceedings, where you can renew your application as defensive asylum. Defensive asylum is filed as a defense before an immigration judge when you are already in removal proceedings. It is the same Form I-589, but the process occurs in immigration court where a judge decides if you qualify.'
        },
        subPoints: [
          { es: 'Afirmativo: Presentas el I-589 ante USCIS. Entrevista con oficial de asilo. No adversarial.', en: 'Affirmative: File I-589 with USCIS. Interview with asylum officer. Non-adversarial.' },
          { es: 'Defensivo: Presentas el I-589 en corte de inmigración. Audiencia ante juez. El gobierno es parte contraria.', en: 'Defensive: File I-589 in immigration court. Hearing before a judge. The government is the opposing party.' },
          { es: 'Plazo de 1 año: En general, debes solicitar asilo dentro del primer año de tu llegada. Existen excepciones por circunstancias extraordinarias o cambio de condiciones en tu país.', en: 'One-year deadline: Generally, you must apply for asylum within one year of arrival. Exceptions exist for extraordinary circumstances or changed country conditions.' },
          { es: 'Mismo formulario: Tanto el asilo afirmativo como el defensivo usan el Formulario I-589.', en: 'Same form: Both affirmative and defensive asylum use Form I-589.' },
        ],
      }
    },
    {
      id: 'puerto-entrada',
      title: { es: 'Puerto de Entrada vs Cruce', en: 'Port of Entry vs Crossing' },
      subtitle: { es: 'Implicaciones legales', en: 'Legal implications' },
      icon: Flag,
      content: {
        intro: {
          es: 'Cómo llegas a EE.UU. afecta tu caso de asilo',
          en: 'How you arrive in the U.S. affects your asylum case'
        },
        description: {
          es: 'Presentarse en un puerto de entrada oficial y solicitar protección es una forma legal de iniciar el proceso de asilo. Si cruzas sin autorización y eres detenido por la Patrulla Fronteriza, aún puedes solicitar asilo, pero el proceso puede ser diferente. En muchos casos, quienes cruzan sin inspección son puestos en remoción expedita y deben pasar una entrevista de miedo creíble antes de poder presentar su caso ante un juez. La forma de entrada no elimina tu derecho al asilo, pero sí puede afectar el procedimiento que enfrentarás.',
          en: 'Presenting yourself at an official port of entry and requesting protection is a legal way to begin the asylum process. If you cross without authorization and are detained by Border Patrol, you can still apply for asylum, but the process may be different. In many cases, those who cross without inspection are placed in expedited removal and must pass a credible fear interview before presenting their case to a judge. How you enter does not eliminate your right to asylum, but it can affect the procedure you will face.'
        },
        subPoints: [
          { es: 'Puerto de entrada: Puedes solicitar protección directamente. Puedes ser referido a entrevista de miedo creíble.', en: 'Port of entry: You can request protection directly. You may be referred to a credible fear interview.' },
          { es: 'Cruce sin autorización: Puedes ser detenido y puesto en remoción expedita. Debes expresar temor de regresar a tu país.', en: 'Unauthorized crossing: You may be detained and placed in expedited removal. You must express fear of returning to your country.' },
          { es: 'Remoción expedita: Proceso rápido de deportación para quienes llegan sin documentos. La entrevista de miedo creíble es tu oportunidad de demostrar que mereces una audiencia completa.', en: 'Expedited removal: Fast deportation process for those arriving without documents. The credible fear interview is your chance to show you deserve a full hearing.' },
          { es: 'CBP One: Aplicación para programar citas en puertos de entrada. Puede cambiar según políticas vigentes.', en: 'CBP One: App to schedule appointments at ports of entry. May change based on current policies.' },
        ],
      }
    },
    {
      id: 'miedo-creible',
      title: { es: 'Entrevista de Miedo Creíble', en: 'Credible Fear Interview' },
      subtitle: { es: 'Tu primera oportunidad', en: 'Your first opportunity' },
      icon: AlertTriangle,
      content: {
        intro: {
          es: 'Prepárate para la entrevista que determina tu futuro',
          en: 'Prepare for the interview that determines your future'
        },
        description: {
          es: 'La entrevista de miedo creíble es un paso crítico para quienes son puestos en remoción expedita. Un oficial de asilo evaluará si tienes una posibilidad significativa de demostrar que calificas para asilo. Debes explicar claramente por qué temes regresar a tu país, quién te persigue, qué te hicieron o amenazaron con hacerte, y por qué el gobierno de tu país no puede o no quiere protegerte. Si pasas la entrevista, tu caso se refiere a un juez de inmigración para una audiencia completa de asilo. Si no la pasas, puedes pedir revisión por un juez de inmigración.',
          en: 'The credible fear interview is a critical step for those placed in expedited removal. An asylum officer will assess whether you have a significant possibility of demonstrating that you qualify for asylum. You must clearly explain why you fear returning to your country, who is persecuting you, what they did or threatened to do, and why your country\'s government cannot or will not protect you. If you pass the interview, your case is referred to an immigration judge for a full asylum hearing. If you do not pass, you can request review by an immigration judge.'
        },
        subPoints: [
          { es: 'Miedo creíble: Estándar para quienes solicitan asilo. Debes demostrar una "posibilidad significativa" de persecución.', en: 'Credible fear: Standard for asylum seekers. You must demonstrate a "significant possibility" of persecution.' },
          { es: 'Miedo razonable: Estándar más alto para quienes tienen orden de deportación previa o reingreso ilegal. Debes demostrar una "posibilidad razonable" de persecución.', en: 'Reasonable fear: Higher standard for those with prior removal orders or illegal reentry. You must demonstrate a "reasonable possibility" of persecution.' },
          { es: 'Preparación: Ten claros los hechos, fechas, personas involucradas y por qué no puedes regresar a tu país.', en: 'Preparation: Be clear about facts, dates, people involved, and why you cannot return to your country.' },
          { es: 'Derecho a abogado: Tienes derecho a consultar con un abogado antes de la entrevista, aunque el gobierno no te proporcionará uno.', en: 'Right to counsel: You have the right to consult an attorney before the interview, although the government will not provide one.' },
        ],
      }
    },
    {
      id: 'cat-restriccion',
      title: { es: 'CAT y Restricción de Remoción', en: 'CAT & Withholding of Removal' },
      subtitle: { es: 'Protecciones alternativas', en: 'Alternative protections' },
      icon: ShieldCheck,
      content: {
        intro: {
          es: 'Cuando el asilo no es opción, existen otras protecciones',
          en: 'When asylum is not an option, other protections exist'
        },
        description: {
          es: 'Si no calificas para asilo (por ejemplo, porque pasó más de un año desde tu llegada), aún puedes solicitar dos formas alternativas de protección: la restricción de remoción (Withholding of Removal) y la protección bajo la Convención Contra la Tortura (CAT). La restricción de remoción tiene un estándar de prueba más alto que el asilo: debes demostrar que es "más probable que no" que serás perseguido. La protección CAT requiere demostrar que es "más probable que no" que serás torturado por o con el consentimiento del gobierno de tu país. Estas protecciones no ofrecen todos los beneficios del asilo (como la posibilidad de solicitar residencia permanente), pero impiden tu deportación al país donde enfrentas peligro.',
          en: 'If you do not qualify for asylum (for example, because more than one year has passed since your arrival), you can still apply for two alternative forms of protection: Withholding of Removal and protection under the Convention Against Torture (CAT). Withholding of Removal has a higher standard of proof than asylum: you must demonstrate it is "more likely than not" that you will be persecuted. CAT protection requires demonstrating it is "more likely than not" that you will be tortured by or with the consent of your country\'s government. These protections do not offer all the benefits of asylum (like the ability to apply for permanent residency), but they prevent your deportation to the country where you face danger.'
        },
        subPoints: [
          { es: 'Restricción de remoción: No te pueden deportar al país donde te persiguen. Estándar: "más probable que no".', en: 'Withholding of Removal: You cannot be deported to the country where you face persecution. Standard: "more likely than not".' },
          { es: 'CAT: No te pueden deportar a un país donde serías torturado con participación gubernamental.', en: 'CAT: You cannot be deported to a country where you would be tortured with government involvement.' },
          { es: 'Sin residencia: Estas protecciones no otorgan path a la residencia permanente ni a la ciudadanía.', en: 'No residency: These protections do not provide a path to permanent residency or citizenship.' },
          { es: 'No hay plazo de 1 año: A diferencia del asilo, estas protecciones no tienen la limitación de presentarse dentro del primer año.', en: 'No one-year deadline: Unlike asylum, these protections do not have the one-year filing limitation.' },
        ],
      }
    }
  ] as TabItem[],

  processSteps: [
    {
      id: 1,
      title: { es: 'Evaluación', en: 'Evaluation' },
      icon: Search,
      desc: { es: 'Analizamos tu historia, documentos y las bases legales de tu caso de asilo.', en: 'We analyze your story, documents, and the legal grounds of your asylum case.' }
    },
    {
      id: 2,
      title: { es: 'Preparación', en: 'Preparation' },
      icon: FileText,
      desc: { es: 'Preparamos tu declaración, reunimos evidencia y organizamos tu caso.', en: 'We prepare your declaration, gather evidence, and organize your case.' }
    },
    {
      id: 3,
      title: { es: 'Presentación', en: 'Filing' },
      icon: Send,
      desc: { es: 'Presentamos tu solicitud I-589 y te preparamos para la entrevista o audiencia.', en: 'We file your I-589 application and prepare you for the interview or hearing.' }
    },
    {
      id: 4,
      title: { es: 'Representación', en: 'Representation' },
      icon: Shield,
      desc: { es: 'Te representamos ante el oficial de asilo o juez de inmigración.', en: 'We represent you before the asylum officer or immigration judge.' }
    },
  ],

  interface: {
    heroBadge: { es: 'Protección Internacional', en: 'International Protection' },
    heroTitle: { es: 'Abogados de Asilo Político', en: 'Political Asylum Lawyers' },
    heroSubtitle: { es: 'Defendemos tu derecho a vivir libre de persecución. Más de 35 años de experiencia representando solicitantes de asilo en todo Estados Unidos.', en: 'We defend your right to live free from persecution. Over 35 years of experience representing asylum seekers throughout the United States.' },
    ctaConsulta: { es: 'Consulta Gratuita', en: 'Free Consultation' },
    ctaLlamar: { es: 'Llamar Ahora', en: 'Call Now' },
    officeSectionTitle: { es: 'Oficinas Disponibles', en: 'Available Offices' },
    officeSectionSubtitle: { es: 'Representación en asilo en 5 estados', en: 'Asylum representation in 5 states' },
    processTitle: { es: 'Nuestro Proceso', en: 'Our Process' },
    processSubtitle: { es: 'Te acompañamos desde la evaluación hasta la audiencia final', en: 'We accompany you from evaluation to your final hearing' },
    blogTitle: { es: 'Artículos sobre Asilo', en: 'Articles on Asylum' },
    contactTitle: { es: 'Consulta Gratuita y Confidencial', en: 'Free & Confidential Consultation' },
    phoneCta: { es: 'Llámenos Ahora', en: 'Call Us Now' },
  }
};

const blogArticles = [
  {
    slug: 'asilo_frontera_2026_puerto_entrada_vs_cruce',
    title: { es: 'Asilo en la frontera 2026: puerto de entrada vs cruce', en: 'Asylum at the Border 2026: Port of Entry vs Crossing' },
    category: { es: 'Asilo', en: 'Asylum' },
    image: '/blog/blog_20/BLOG10_CR1.png',
  },
  {
    slug: 'Frenar_deportacion_inminente_con_solicitud_de_Visa_Humanitaria',
    title: { es: 'Parar deportación urgente con Visa U o VAWA pendiente', en: 'Stop Urgent Deportation with Pending U Visa or VAWA' },
    category: { es: 'Deportación', en: 'Deportation' },
    image: '/blog/blog_8/BLOG08_CR1.png',
  },
  {
    slug: 'estatus_juvenil_sijs_residencia_jovenes_abandonados',
    title: { es: 'Estatus Juvenil SIJS: papeles para jóvenes', en: 'SIJS: Papers for Abandoned Youth' },
    category: { es: 'Humanitario', en: 'Humanitarian' },
    image: '/blog/blog_16/BLOG06_CR1.png',
  },
];

export default function AsiloClient() {
  const { language } = useLanguage();
  const lang = language as 'es' | 'en';

  const gT = (obj: any): string => getText(obj, lang);

  const [selectedTab, setSelectedTab] = useState<string>(texts.infoTabs[0].id);
  const activeTabContent = texts.infoTabs.find(s => s.id === selectedTab) || texts.infoTabs[0];

  const textRevealVariant: Variants = {
    hidden: { y: '100%', rotateX: -20, opacity: 0 },
    visible: (custom: number) => ({
      y: 0, rotateX: 0, opacity: 1,
      transition: { duration: 1.2, delay: custom * 0.15, ease: 'easeOut' }
    })
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#001540] text-white relative selection:bg-[#B2904D] selection:text-white font-sans overflow-x-hidden">

      <Header />

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full transform-gpu">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#001f5f]" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>

        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{ willChange: 'transform, opacity' }}
          className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[80px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ willChange: 'transform, opacity' }}
          className="absolute bottom-[-10%] left-[-5%] w-[70vw] h-[70vw] bg-sky-800/10 rounded-full blur-[90px]"
        />

        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
          <span className="text-[15vw] font-black italic text-white tracking-tighter transform -skew-x-12 whitespace-nowrap">
            ASILO
          </span>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 md:pt-40 pb-12 md:pb-20 px-4 z-10 min-h-[85vh] flex flex-col justify-center">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* IMAGE CONTAINER */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="lg:col-span-5 relative h-[450px] md:h-[600px] lg:h-[80vh] flex items-end justify-center order-2 lg:order-1"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent blur-xl z-10 h-1/4 bottom-0 w-full" />
              <div className="relative z-0 w-full h-full flex items-end justify-center">
                <Image
                  src="/home-image.jpg"
                  alt={lang === 'es' ? 'Abogados de Asilo - Protección internacional para perseguidos' : 'Asylum Attorneys - International protection for the persecuted'}
                  fill
                  className="object-contain object-bottom drop-shadow-[0_0_35px_rgba(178,144,77,0.25)]"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute bottom-32 lg:bottom-48 -right-4 md:-right-10 z-20 p-6 border border-[#B2904D]/30 rounded-2xl backdrop-blur-xl bg-[#001540]/60 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              >
                <div className="flex items-center gap-3 mb-1">
                  <Globe className="w-5 h-5 text-[#B2904D]" />
                  <span className="text-[#B2904D] font-bold tracking-widest text-xs uppercase">
                    {lang === 'es' ? 'Protección' : 'Protection'}
                  </span>
                </div>
                <div className="flex items-baseline text-white">
                  <span className="text-4xl md:text-5xl font-black tracking-tighter">35+</span>
                  <span className="ml-2 text-sm font-light uppercase tracking-wider opacity-80">
                    {lang === 'es' ? 'Años' : 'Years'}
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* TEXT CONTAINER */}
            <div className="lg:col-span-7 space-y-8 pl-0 lg:pl-8 relative z-20 order-1 lg:order-2 flex flex-col justify-center items-start">

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B2904D]/30 bg-[#B2904D]/10 backdrop-blur-sm shadow-[0_0_15px_rgba(178,144,77,0.1)] self-start">
                <Shield size={16} className="text-[#B2904D]" />
                <span className="text-[#B2904D] text-xs font-bold tracking-[0.2em] uppercase">{gT(texts.interface.heroBadge)}</span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-thin text-white tracking-tight leading-[1.1]">
                <span className="block">
                  <motion.span custom={0} variants={textRevealVariant} initial="hidden" animate="visible" className="block text-white/90">
                    {lang === 'es' ? 'Abogados de' : 'Political'}
                  </motion.span>
                </span>
                <span className="block">
                  <motion.span custom={1} variants={textRevealVariant} initial="hidden" animate="visible" className="block font-black text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] via-[#F3E5AB] to-[#B2904D] drop-shadow-sm">
                    {lang === 'es' ? 'Asilo Político' : 'Asylum Lawyers'}
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
                {gT(texts.interface.heroSubtitle)}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <a href="#contacto" className="px-8 py-4 bg-[#B2904D] hover:bg-[#d4af37] text-[#001540] font-bold rounded-xl transition-all shadow-[0_0_30px_rgba(178,144,77,0.3)] hover:shadow-[0_0_40px_rgba(178,144,77,0.5)] hover:-translate-y-1 flex items-center gap-3 group text-base">
                  <Shield size={20} />
                  {gT(texts.interface.ctaConsulta)}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="tel:+18669795146" className="px-8 py-4 border-2 border-white/20 hover:border-[#B2904D]/50 text-white font-bold rounded-xl transition-all hover:-translate-y-1 flex items-center gap-3 group text-base backdrop-blur-sm">
                  <PhoneCall size={20} className="text-[#B2904D]" />
                  <span className="hidden sm:inline">(866) 979-5146</span>
                  <span className="sm:hidden">{gT(texts.interface.ctaLlamar)}</span>
                </a>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* --- TABS SECTION --- */}
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

          {/* TAB CONTENT */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">

                <div className="absolute top-0 right-0 w-64 h-64 bg-[#B2904D]/10 rounded-full blur-[80px] pointer-events-none"></div>

                {/* Header */}
                <div className="flex flex-col md:flex-row items-start gap-8 mb-10 pb-10 border-b border-white/10">
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
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

                {/* Content */}
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

                  {activeTabContent.content.subPoints && !activeTabContent.content.subTitle && (
                    <div className="bg-[#001026]/40 p-8 rounded-3xl border border-white/5">
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

                  {activeTabContent.content.solution && (
                    <div className="bg-gradient-to-r from-[#B2904D]/20 to-transparent p-6 rounded-2xl border-l-4 border-[#B2904D]">
                      <p className="text-white leading-relaxed font-medium text-lg flex gap-4 items-start">
                        <BookOpen className="text-[#B2904D] shrink-0 mt-1" size={24} />
                        {gT(activeTabContent.content.solution)}
                      </p>
                    </div>
                  )}

                  <div className="pt-6 flex justify-end">
                    <motion.a
                      href="#contacto"
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 text-[#B2904D] font-bold uppercase tracking-widest text-sm hover:text-white transition-colors"
                    >
                      {lang === 'es' ? 'Solicitar Evaluación Gratuita' : 'Request Free Evaluation'}
                      <ArrowRight size={18} />
                    </motion.a>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* --- OFFICES SECTION --- */}
      <section className="py-24 relative overflow-hidden bg-[#001f5f]/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <MapPin size={14} className="text-[#B2904D]" />
              <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">
                15 {lang === 'es' ? 'Oficinas' : 'Offices'}
              </span>
            </motion.div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-6">
              {gT(texts.interface.officeSectionTitle)}
            </h2>
            <p className="text-blue-100/60 text-lg max-w-3xl mx-auto font-light">
              {gT(texts.interface.officeSectionSubtitle)}
            </p>
            <div className="h-1 w-24 bg-[#B2904D] mx-auto rounded-full shadow-[0_0_15px_#B2904D] mt-8" />
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {offices.map((office, i) => (
              <motion.div
                key={office.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  href={`/${lang}/oficinas/${office.slug}`}
                  className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-[#B2904D]/40 hover:bg-white/10 transition-all duration-300 group"
                >
                  <MapPin size={16} className="text-[#B2904D] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-white/80 group-hover:text-white transition-colors font-medium">{office.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section className="py-32 relative overflow-hidden bg-[#000a20]">
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
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <FileText size={14} className="text-[#B2904D]" />
              <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">{gT(texts.interface.processTitle)}</span>
            </motion.div>

            <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white mb-6">{gT(texts.interface.processSubtitle)}</h2>
            <div className="h-1 w-24 bg-[#B2904D] mx-auto rounded-full shadow-[0_0_15px_#B2904D]" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 relative">

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
              {gT(texts.interface.blogTitle)}
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
            {blogArticles.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link
                  href={`/${lang}/blog/${article.slug}`}
                  className="group block rounded-xl overflow-hidden border border-white/10 hover:border-[#B2904D]/30 bg-[#000a20]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(178,144,77,0.15)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title[lang] || article.title.es}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000a20] to-transparent opacity-60" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#B2904D] text-[#001540] rounded-md">
                        {article.category[lang] || article.category.es}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-white group-hover:text-[#B2904D] transition-colors line-clamp-2 leading-snug">
                      {article.title[lang] || article.title.es}
                    </h4>
                    <span className="mt-2 text-xs text-[#B2904D] flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                      {lang === 'es' ? 'Leer artículo' : 'Read article'} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PHONE CTA SECTION --- */}
      <section className="py-16 relative z-10 bg-[#001026]">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <a
              href="tel:+18669795146"
              className="inline-flex items-center gap-4 px-10 py-6 bg-gradient-to-r from-[#B2904D] to-[#D4AF37] text-[#001540] font-black text-xl rounded-2xl transition-all hover:shadow-[0_0_50px_rgba(178,144,77,0.4)] hover:-translate-y-1 group"
            >
              <PhoneCall size={28} className="group-hover:animate-pulse" />
              <span>{gT(texts.interface.phoneCta)}</span>
              <span className="text-2xl">(866) 979-5146</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
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
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-black mb-4">{gT(texts.interface.contactTitle)}</h2>
                <div className="h-1 w-16 bg-[#B2904D] mx-auto rounded-full" />
              </div>

              <div className="contact-form-wrapper-override">
                <ContactForm />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

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
