'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  PhoneCall,
  ArrowRight,
  Shield,
  CheckCircle2,
  FileText,
  Heart,
  Users,
  MapPin,
  Target,
  MessageSquare,
  Send,
  Search,
  HelpCircle,
  Lock,
  Scale,
  UserCheck,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

import Link from 'next/link';
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
      id: 'que-es-vawa',
      title: { es: '¿Qué es VAWA?', en: 'What is VAWA?' },
      subtitle: { es: 'Ley de Violencia contra la Mujer', en: 'Violence Against Women Act' },
      icon: Shield,
      content: {
        intro: {
          es: 'Protección migratoria para víctimas de abuso doméstico',
          en: 'Immigration protection for domestic abuse victims'
        },
        description: {
          es: 'VAWA (Violence Against Women Act) es una ley federal de Estados Unidos que permite a ciertas víctimas de abuso doméstico solicitar su propia residencia permanente sin necesidad de que el agresor lo sepa o coopere en el proceso. A pesar de su nombre, VAWA no es exclusivamente para mujeres: hombres, mujeres y personas de cualquier género pueden calificar si cumplen los requisitos. El proceso se realiza mediante la presentación del Formulario I-360 (Autopeticin VAWA) ante USCIS. Lo fundamental de VAWA es que la víctima controla su propio caso migratorio. El agresor nunca es notificado, lo que protege a la víctima de represalias. Esto se conoce como el principio de confidencialidad de VAWA, uno de los pilares más importantes de esta ley.',
          en: 'VAWA (Violence Against Women Act) is a U.S. federal law that allows certain domestic abuse victims to petition for their own permanent residency without the abuser knowing or cooperating in the process. Despite its name, VAWA is not exclusively for women: men, women, and people of any gender can qualify if they meet the requirements. The process is carried out by filing Form I-360 (VAWA Self-Petition) with USCIS. The fundamental aspect of VAWA is that the victim controls their own immigration case. The abuser is never notified, which protects the victim from retaliation. This is known as the VAWA confidentiality principle, one of the most important pillars of this law.'
        },
        subTitle: { es: 'Aspectos Clave de VAWA:', en: 'Key Aspects of VAWA:' },
        subPoints: [
          { es: 'Autopetición: La víctima presenta su propio caso sin depender del agresor.', en: 'Self-Petition: The victim files their own case without depending on the abuser.' },
          { es: 'Formulario I-360: Es el formulario oficial utilizado para solicitar protección bajo VAWA.', en: 'Form I-360: The official form used to request protection under VAWA.' },
          { es: 'Confidencialidad Total: USCIS no puede contactar al agresor ni revelar la existencia del caso.', en: 'Total Confidentiality: USCIS cannot contact the abuser or reveal the existence of the case.' },
          { es: 'No solo para mujeres: Hombres, padres y personas de cualquier género pueden aplicar.', en: 'Not only for women: Men, parents, and people of any gender can apply.' },
        ],
        solution: {
          es: 'VAWA es una de las protecciones más poderosas del sistema migratorio: permite a la víctima tomar el control de su futuro legal sin ninguna participación del agresor.',
          en: 'VAWA is one of the most powerful protections in the immigration system: it allows the victim to take control of their legal future without any involvement from the abuser.'
        }
      }
    },
    {
      id: 'quien-califica',
      title: { es: '¿Quién Califica?', en: 'Who Qualifies?' },
      subtitle: { es: 'Requisitos de Elegibilidad', en: 'Eligibility Requirements' },
      icon: CheckCircle2,
      content: {
        intro: {
          es: 'Requisitos fundamentales para una autopetición VAWA',
          en: 'Fundamental requirements for a VAWA self-petition'
        },
        description: {
          es: 'Para calificar bajo VAWA, debe existir una relación específica entre la víctima y el agresor, y se deben demostrar varios elementos. Las tres categorías principales de peticionarios son: (1) cónyuges o excónyuges de ciudadanos o residentes permanentes de EE.UU. que han sufrido abuso; (2) padres que han sido maltratados por hijos ciudadanos estadounidenses mayores de 21 años; y (3) hijos que han sido abusados por padres ciudadanos o residentes permanentes. No es necesario tener estatus migratorio legal para presentar una autopetición VAWA. Incluso personas indocumentadas pueden calificar si cumplen los demás requisitos.',
          en: 'To qualify under VAWA, there must be a specific relationship between the victim and the abuser, and several elements must be demonstrated. The three main categories of petitioners are: (1) spouses or ex-spouses of U.S. citizens or permanent residents who have suffered abuse; (2) parents who have been abused by U.S. citizen children over 21 years of age; and (3) children who have been abused by citizen or permanent resident parents. It is not necessary to have legal immigration status to file a VAWA self-petition. Even undocumented individuals can qualify if they meet the other requirements.'
        },
        subTitle: { es: 'Debe Demostrar:', en: 'You Must Demonstrate:' },
        subPoints: [
          { es: 'Relación calificante: Ser cónyuge, excónyuge, padre o hijo del agresor ciudadano o residente.', en: 'Qualifying relationship: Being the spouse, ex-spouse, parent, or child of the citizen or resident abuser.' },
          { es: 'Matrimonio o relación de buena fe: Si aplica por cónyuge, el matrimonio debe haber sido genuino (no solo por papeles).', en: 'Good faith marriage or relationship: If applying as a spouse, the marriage must have been genuine (not just for papers).' },
          { es: 'Abuso documentado: Evidencia de abuso físico, emocional, psicológico, sexual o económico durante la relación.', en: 'Documented abuse: Evidence of physical, emotional, psychological, sexual, or economic abuse during the relationship.' },
          { es: 'Buen carácter moral: Historial sin problemas criminales graves (evaluado caso por caso).', en: 'Good moral character: History without serious criminal issues (evaluated on a case-by-case basis).' },
          { es: 'Residencia en EE.UU.: Haber residido con el agresor en Estados Unidos en algún momento.', en: 'U.S. residence: Having resided with the abuser in the United States at some point.' },
        ],
        solution: {
          es: 'No necesita reportes policiales para probar el abuso. Declaraciones personales detalladas, registros médicos, fotos, mensajes de texto y cartas de apoyo de familiares o consejeros pueden ser evidencia suficiente.',
          en: 'You do not need police reports to prove the abuse. Detailed personal statements, medical records, photos, text messages, and support letters from family members or counselors can be sufficient evidence.'
        }
      }
    },
    {
      id: 'vawa-hombres',
      title: { es: 'VAWA para Hombres', en: 'VAWA for Men' },
      subtitle: { es: 'Protección sin Distinción de Género', en: 'Protection Regardless of Gender' },
      icon: UserCheck,
      content: {
        intro: {
          es: 'VAWA protege a TODOS los géneros por igual',
          en: 'VAWA protects ALL genders equally'
        },
        description: {
          es: 'A pesar de que la ley se llama "Violence Against Women Act", VAWA protege a todas las víctimas de violencia doméstica sin importar su género. Los hombres que son víctimas de abuso por parte de su cónyuge, excónyuge o pareja ciudadana o residente permanente tienen exactamente los mismos derechos y pueden presentar una autopetición bajo las mismas reglas. Muchos hombres desconocen que tienen este derecho. El abuso no siempre es físico: la manipulación emocional, el control financiero, las amenazas con la deportación, el aislamiento de familiares y amigos, y la destrucción de documentos de identidad son formas de abuso reconocidas por USCIS en casos VAWA. Si su pareja ciudadana o residente lo amenaza con "quitarle los papeles", controlarlo económicamente o reportarlo a inmigración, usted puede calificar para VAWA.',
          en: 'Although the law is called the "Violence Against Women Act," VAWA protects all domestic violence victims regardless of gender. Men who are victims of abuse by their citizen or permanent resident spouse, ex-spouse, or partner have exactly the same rights and can file a self-petition under the same rules. Many men are unaware they have this right. Abuse is not always physical: emotional manipulation, financial control, threats of deportation, isolation from family and friends, and destruction of identity documents are forms of abuse recognized by USCIS in VAWA cases. If your citizen or resident partner threatens to "take away your papers," control you financially, or report you to immigration, you may qualify for VAWA.'
        },
        subTitle: { es: 'Formas de Abuso que Califican:', en: 'Forms of Abuse that Qualify:' },
        subPoints: [
          { es: 'Abuso físico: Golpes, empujones, agresiones con objetos, cualquier contacto físico violento.', en: 'Physical abuse: Hitting, pushing, assault with objects, any violent physical contact.' },
          { es: 'Abuso emocional y psicológico: Humillaciones constantes, amenazas, control extremo, aislamiento social.', en: 'Emotional and psychological abuse: Constant humiliation, threats, extreme control, social isolation.' },
          { es: 'Abuso económico: Controlar todo el dinero, prohibir trabajar, negar acceso a cuentas bancarias.', en: 'Economic abuse: Controlling all money, prohibiting work, denying access to bank accounts.' },
          { es: 'Amenazas migratorias: Usar el estatus migratorio como herramienta de control ("te voy a deportar").', en: 'Immigration threats: Using immigration status as a tool of control ("I will get you deported").' },
        ],
        solution: {
          es: 'Los hombres tienen exactamente los mismos requisitos y beneficios que las mujeres bajo VAWA. No existe diferencia legal. Si usted es víctima, tiene derecho a protección.',
          en: 'Men have exactly the same requirements and benefits as women under VAWA. There is no legal difference. If you are a victim, you have the right to protection.'
        }
      }
    },
    {
      id: 'vawa-padres',
      title: { es: 'VAWA para Padres', en: 'VAWA for Parents' },
      subtitle: { es: 'Padres Abusados por Hijos Ciudadanos', en: 'Parents Abused by Citizen Children' },
      icon: Heart,
      content: {
        intro: {
          es: 'Protección para padres maltratados por hijos adultos ciudadanos',
          en: 'Protection for parents abused by adult citizen children'
        },
        description: {
          es: 'Una categoría poco conocida de VAWA permite a los padres que son víctimas de abuso por parte de sus hijos ciudadanos estadounidenses mayores de 21 años presentar una autopetición para obtener residencia. Esto aplica en situaciones donde el hijo ciudadano ejerce control o maltrato sobre el padre o la madre, especialmente cuando el padre depende del hijo para su estatus migratorio o sustento económico. Es común en familias donde los padres inmigrantes criaron a sus hijos en EE.UU. y ahora dependen de ellos. Cuando ese hijo ciudadano abusa de esa posición de poder (amenazando con no peticionarlos, controlándolos económicamente, maltratándolos física o emocionalmente), la ley VAWA ofrece una salida independiente.',
          en: 'A lesser-known category of VAWA allows parents who are victims of abuse by their U.S. citizen children over 21 years of age to file a self-petition to obtain residency. This applies in situations where the citizen child exercises control or mistreatment over the parent, especially when the parent depends on the child for their immigration status or financial support. It is common in families where immigrant parents raised their children in the U.S. and now depend on them. When that citizen child abuses that position of power (threatening not to petition for them, controlling them financially, physically or emotionally abusing them), the VAWA law offers an independent path.'
        },
        subTitle: { es: 'Situaciones Comunes:', en: 'Common Situations:' },
        subPoints: [
          { es: 'El hijo ciudadano amenaza con no pedir la residencia del padre como forma de control.', en: 'The citizen child threatens not to petition for the parent\'s residency as a form of control.' },
          { es: 'Control financiero: El hijo maneja todo el dinero y lo usa para manipular al padre.', en: 'Financial control: The child manages all the money and uses it to manipulate the parent.' },
          { es: 'Maltrato verbal, emocional o físico por parte del hijo adulto hacia el padre.', en: 'Verbal, emotional, or physical mistreatment by the adult child toward the parent.' },
          { es: 'Abandono o negligencia deliberada cuando el padre depende del hijo para cuidado o sustento.', en: 'Deliberate abandonment or neglect when the parent depends on the child for care or support.' },
        ],
        solution: {
          es: 'El padre no necesita que el hijo coopere ni que presente ningún formulario. La autopetición VAWA le permite al padre obtener su propia residencia de forma completamente independiente.',
          en: 'The parent does not need the child to cooperate or file any form. The VAWA self-petition allows the parent to obtain their own residency completely independently.'
        }
      }
    },
    {
      id: 'beneficios-proceso',
      title: { es: 'Beneficios y Proceso', en: 'Benefits & Process' },
      subtitle: { es: 'Camino hacia la Residencia', en: 'Path to Residency' },
      icon: Scale,
      content: {
        intro: {
          es: 'Beneficios concretos al ser aprobado bajo VAWA',
          en: 'Concrete benefits upon approval under VAWA'
        },
        description: {
          es: 'Una vez que USCIS aprueba su autopetición VAWA (Formulario I-360), usted obtiene acceso a una serie de beneficios migratorios significativos. USCIS primero emite un "prima facie determination" (determinación inicial) que le permite acceder a ciertos beneficios mientras el caso se procesa por completo. Posteriormente, con la aprobación completa, usted queda en camino directo hacia la residencia permanente (green card). Todo el proceso está protegido por estrictas reglas de confidencialidad: USCIS no puede contactar al agresor, y la información del caso no puede ser divulgada. Esto significa que su agresor nunca sabrá que usted presentó un caso VAWA.',
          en: 'Once USCIS approves your VAWA self-petition (Form I-360), you gain access to a series of significant immigration benefits. USCIS first issues a "prima facie determination" that allows you to access certain benefits while the case is fully processed. Subsequently, with full approval, you are on a direct path toward permanent residency (green card). The entire process is protected by strict confidentiality rules: USCIS cannot contact the abuser, and case information cannot be disclosed. This means your abuser will never know that you filed a VAWA case.'
        },
        subTitle: { es: 'Beneficios al Ser Aprobado:', en: 'Benefits Upon Approval:' },
        subPoints: [
          { es: 'Permiso de Trabajo (EAD): Puede obtener autorización para trabajar legalmente en EE.UU. mientras su caso avanza.', en: 'Work Permit (EAD): You can obtain authorization to work legally in the U.S. while your case progresses.' },
          { es: 'Acción Diferida (Deferred Action): Protección contra la deportación mientras su caso está pendiente.', en: 'Deferred Action: Protection from deportation while your case is pending.' },
          { es: 'Camino a la Green Card: Con la aprobación del I-360, puede solicitar ajuste de estatus para obtener residencia permanente.', en: 'Path to Green Card: With I-360 approval, you can apply for adjustment of status to obtain permanent residency.' },
          { es: 'Confidencialidad: El agresor nunca es notificado. USCIS tiene prohibido contactarlo o revelar su caso.', en: 'Confidentiality: The abuser is never notified. USCIS is prohibited from contacting them or revealing your case.' },
          { es: 'Acceso a Beneficios Públicos: Con el prima facie, puede calificar para ciertos programas de asistencia estatal y federal.', en: 'Access to Public Benefits: With the prima facie determination, you may qualify for certain state and federal assistance programs.' },
        ],
        solution: {
          es: 'El proceso VAWA puede tomar entre 12 y 24 meses para la aprobación completa, pero los beneficios provisionales (permiso de trabajo y acción diferida) pueden obtenerse mucho antes con la determinación prima facie.',
          en: 'The VAWA process can take between 12 and 24 months for full approval, but provisional benefits (work permit and deferred action) can be obtained much sooner with the prima facie determination.'
        }
      }
    }
  ] as TabItem[],

  processSteps: [
    {
      id: 1,
      title: { es: 'Consulta Confidencial', en: 'Confidential Consultation' },
      icon: MessageSquare,
      desc: { es: 'Evaluamos su situación en una consulta completamente privada. Analizamos la relación con el agresor, el tipo de abuso sufrido y su elegibilidad para VAWA. Todo lo que nos comparta está protegido por el privilegio abogado-cliente.', en: 'We evaluate your situation in a completely private consultation. We analyze the relationship with the abuser, the type of abuse suffered, and your eligibility for VAWA. Everything you share is protected by attorney-client privilege.' }
    },
    {
      id: 2,
      title: { es: 'Recopilación de Evidencia', en: 'Evidence Gathering' },
      icon: Search,
      desc: { es: 'Reunimos toda la evidencia necesaria: su declaración personal detallada, registros médicos, mensajes, fotos, cartas de apoyo de familiares o consejeros, y cualquier documentación que demuestre el abuso y la relación de buena fe.', en: 'We gather all necessary evidence: your detailed personal statement, medical records, messages, photos, support letters from family or counselors, and any documentation that demonstrates the abuse and the good faith relationship.' }
    },
    {
      id: 3,
      title: { es: 'Preparación y Presentación del I-360', en: 'I-360 Preparation & Filing' },
      icon: FileText,
      desc: { es: 'Preparamos meticulosamente el Formulario I-360 con toda la documentación de soporte. Construimos un caso sólido que demuestre cada elemento requerido por USCIS: relación, abuso, buena fe y buen carácter moral.', en: 'We meticulously prepare Form I-360 with all supporting documentation. We build a solid case demonstrating each element required by USCIS: relationship, abuse, good faith, and good moral character.' }
    },
    {
      id: 4,
      title: { es: 'Aprobación y Residencia', en: 'Approval & Residency' },
      icon: ShieldCheck,
      desc: { es: 'Tras la aprobación del I-360, gestionamos su permiso de trabajo, acción diferida y el ajuste de estatus para obtener su green card. Lo acompañamos en cada paso hasta que tenga su residencia permanente en mano.', en: 'After I-360 approval, we manage your work permit, deferred action, and adjustment of status to obtain your green card. We accompany you every step until you have your permanent residency in hand.' }
    },
  ],

  interface: {
    badge: { es: 'Protección Legal VAWA', en: 'VAWA Legal Protection' },
    heroTitle1: { es: 'Protección para', en: 'Protection for' },
    heroTitle2: { es: 'Víctimas de Abuso', en: 'Abuse Victims' },
    heroDescription: {
      es: 'Si usted es víctima de violencia doméstica por parte de un cónyuge, padre o hijo ciudadano o residente permanente, la ley VAWA le permite obtener su residencia sin depender del agresor. Su caso es 100% confidencial.',
      en: 'If you are a victim of domestic violence by a citizen or permanent resident spouse, parent, or child, the VAWA law allows you to obtain your residency without depending on the abuser. Your case is 100% confidential.'
    },
    ctaConsultation: { es: 'Consulta Confidencial Gratis', en: 'Free Confidential Consultation' },
    processMethod: { es: 'Nuestro Proceso', en: 'Our Process' },
    processTitle: { es: 'Cómo Manejamos Su Caso VAWA', en: 'How We Handle Your VAWA Case' },
    requestEvaluation: { es: 'Solicitar Evaluación Confidencial', en: 'Request Confidential Evaluation' },
    contactTitle: { es: 'Protéjase Hoy. Consulta 100% Confidencial.', en: 'Protect Yourself Today. 100% Confidential Consultation.' },
    officesTitle: { es: 'Oficinas a Su Servicio', en: 'Offices at Your Service' },
    officesSubtitle: { es: 'Atendemos casos VAWA en 15 oficinas en Texas, California, Illinois, Colorado y Tennessee.', en: 'We handle VAWA cases in 15 offices across Texas, California, Illinois, Colorado, and Tennessee.' },
    blogTitle: { es: 'Artículos Relacionados sobre VAWA', en: 'Related VAWA Articles' },
    phoneCta: { es: 'Llame Ahora: Consulta Gratis', en: 'Call Now: Free Consultation' },
  }
};

const blogArticles = [
  {
    slug: 'VAWA_para_hombres_maltratados_por_pareja_ciudadana_o_residente',
    title: { es: 'VAWA para Hombres Maltratados por Pareja Ciudadana o Residente', en: 'VAWA for Men Abused by Citizen or Resident Partners' },
    category: { es: 'VAWA', en: 'VAWA' },
    image: '/blog/blog_05/B5_CR1.png',
  },
  {
    slug: 'VAWA_para_padres_Maltrato_de_hijos_ciudadanos_estadounidenses',
    title: { es: 'VAWA para Padres: Maltrato de Hijos Ciudadanos', en: 'VAWA for Parents: Abuse by Citizen Children' },
    category: { es: 'VAWA', en: 'VAWA' },
    image: '/blog/blog_06/B6_CR1.png',
  },
  {
    slug: 'Visa_U_y_VAWA_incluir_hijos_y_nuevos_esposos_derivados',
    title: { es: 'Visa U y VAWA: Incluir Hijos y Nuevos Esposos Derivados', en: 'U Visa & VAWA: Including Children and New Derivative Spouses' },
    category: { es: 'VAWA / Visa U', en: 'VAWA / U Visa' },
    image: '/blog/blog_08/B8_CR1.png',
  },
];

export default function VawaClient() {
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
            VAWA
          </span>
        </div>
      </div>

      {/* --- BREADCRUMBS --- */}
      <div className="relative z-10 pt-24 md:pt-28 px-4">
        <div className="container mx-auto max-w-7xl">
          <Breadcrumbs items={[
            { label: { es: 'Inicio', en: 'Home' }, href: `/${language}` },
            { label: { es: 'Servicios', en: 'Services' }, href: `/${language}/servicios` },
            { label: { es: 'VAWA', en: 'VAWA' }, href: `/${language}/servicios/vawa` },
          ]} />
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-8 md:pt-12 pb-12 md:pb-20 px-4 z-10 min-h-[85vh] flex flex-col justify-center">
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
                  alt={lang === 'es' ? 'Abogados VAWA - Protección para víctimas de violencia doméstica' : 'VAWA Attorneys - Protection for domestic violence victims'}
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
                  <Lock className="w-5 h-5 text-[#B2904D]" />
                  <span className="text-[#B2904D] font-bold tracking-widest text-xs uppercase">
                    {lang === 'es' ? 'Confidencial' : 'Confidential'}
                  </span>
                </div>
                <div className="flex items-baseline text-white">
                  <span className="text-4xl md:text-5xl font-black tracking-tighter">100%</span>
                  <span className="ml-2 text-sm font-light uppercase tracking-wider opacity-80">
                    {lang === 'es' ? 'Privado' : 'Private'}
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* TEXT CONTAINER */}
            <div className="lg:col-span-7 space-y-8 pl-0 lg:pl-8 relative z-20 order-1 lg:order-2 flex flex-col justify-center items-start">

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B2904D]/30 bg-[#B2904D]/10 backdrop-blur-sm shadow-[0_0_15px_rgba(178,144,77,0.1)] self-start">
                <Shield size={16} className="text-[#B2904D]" />
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
                  <Shield size={20} />
                  {gT(texts.interface.ctaConsultation)}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="tel:+18669795146" className="px-8 py-4 border-2 border-white/20 hover:border-[#B2904D]/50 text-white font-bold rounded-xl transition-all hover:-translate-y-1 flex items-center gap-3 group text-base backdrop-blur-sm">
                  <PhoneCall size={20} className="text-[#B2904D]" />
                  <span className="hidden sm:inline">(866) 979-5146</span>
                  <span className="sm:hidden">{lang === 'es' ? 'Llamar' : 'Call'}</span>
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
              {gT(texts.interface.officesTitle)}
            </h2>
            <p className="text-blue-100/60 text-lg max-w-3xl mx-auto font-light">
              {gT(texts.interface.officesSubtitle)}
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
              <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">{gT(texts.interface.processMethod)}</span>
            </motion.div>

            <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white mb-6">{gT(texts.interface.processTitle)}</h2>
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
