'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  PhoneCall,
  ArrowRight,
  Shield,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Scale,
  Gavel,
  Users,
  Lock,
  MessageSquare,
  Send,
  HelpCircle,
  MapPin,
  Clock,
  Target,
  Siren,
  BookOpen,
  HandMetal,
  ShieldAlert,
  Heart,
  Building2,
  UserCheck,
  Landmark,
  Ban
} from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

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
  { name: 'Arvada (Denver)', slug: 'arvada' },
  { name: 'Chicago', slug: 'chicago' },
  { name: 'Dallas', slug: 'dallas' },
  { name: 'El Paso', slug: 'el-paso' },
  { name: 'Harlingen', slug: 'harlingen' },
  { name: 'Houston Principal', slug: 'houston-principal' },
  { name: 'Houston Bellaire', slug: 'houston-bellaire' },
  { name: 'Houston Accidentes', slug: 'houston-accidentes' },
  { name: 'Kirby (San Antonio)', slug: 'kirby' },
  { name: 'League City', slug: 'league-city' },
  { name: 'Los Angeles', slug: 'losangeles' },
  { name: 'Main St (Houston)', slug: 'main-st' },
  { name: 'Memphis', slug: 'memphis' },
  { name: 'North Loop (Houston)', slug: 'north-loop' },
  { name: 'Northchase (Houston)', slug: 'northchase' },
];

const texts = {
  infoTabs: [
    {
      id: 'cancelacion',
      title: { es: "Cancelación de Remoción", en: "Cancellation of Removal" },
      subtitle: { es: "INA Sección 240A(b)", en: "INA Section 240A(b)" },
      icon: Scale,
      content: {
        intro: {
          es: "Una segunda oportunidad para quienes han construido su vida en EE.UU.",
          en: "A second chance for those who have built their lives in the U.S."
        },
        description: {
          es: "La cancelación de remoción bajo la Sección 240A(b) del INA es un alivio migratorio disponible para personas en procedimientos de deportación que pueden demostrar presencia continua en Estados Unidos durante al menos 10 años, buen carácter moral durante ese periodo, y que su deportación causaría un sufrimiento excepcional y extremadamente inusual a un familiar calificado que sea ciudadano o residente permanente de EE.UU. Este es uno de los remedios más poderosos disponibles en la corte de inmigración, pero requiere preparación exhaustiva y evidencia sólida.",
          en: "Cancellation of removal under INA Section 240A(b) is an immigration relief available to individuals in deportation proceedings who can demonstrate continuous physical presence in the United States for at least 10 years, good moral character during that period, and that their removal would result in exceptional and extremely unusual hardship to a qualifying relative who is a U.S. citizen or lawful permanent resident. This is one of the most powerful remedies available in immigration court, but it requires exhaustive preparation and strong evidence."
        },
        subTitle: { es: "Requisitos Fundamentales:", en: "Fundamental Requirements:" },
        subPoints: [
          { es: "Presencia física continua en EE.UU. durante al menos 10 años antes de la fecha del aviso de comparecencia (NTA).", en: "Continuous physical presence in the U.S. for at least 10 years before the date of the Notice to Appear (NTA)." },
          { es: "Buen carácter moral demostrable durante los 10 años de presencia continua.", en: "Demonstrable good moral character during the 10 years of continuous presence." },
          { es: "Un familiar calificado (cónyuge, padre/madre o hijo/a) que sea ciudadano estadounidense o residente permanente.", en: "A qualifying relative (spouse, parent, or child) who is a U.S. citizen or lawful permanent resident." },
          { es: "Demostrar que la deportación causaría sufrimiento excepcional y extremadamente inusual al familiar calificado.", en: "Demonstrate that deportation would cause exceptional and extremely unusual hardship to the qualifying relative." },
          { es: "No tener condenas por delitos graves agravados ni ciertos delitos que afecten el carácter moral.", en: "No convictions for aggravated felonies or certain crimes affecting moral character." },
          { es: "No haber sido previamente ordenado deportado sin haber reabierto el caso exitosamente.", en: "Not having been previously ordered deported without successfully reopening the case." }
        ],
        solution: {
          es: "Nuestro equipo ha ganado cientos de casos de cancelación de remoción. Evaluamos cada detalle de su historial para construir el caso más fuerte posible ante el juez de inmigración.",
          en: "Our team has won hundreds of cancellation of removal cases. We evaluate every detail of your history to build the strongest possible case before the immigration judge."
        }
      }
    },
    {
      id: 'fianzas',
      title: { es: "Fianzas de Inmigración", en: "Immigration Bonds" },
      subtitle: { es: "Libertad durante el proceso", en: "Freedom during proceedings" },
      icon: Lock,
      content: {
        intro: {
          es: "Recupere su libertad mientras pelea su caso de inmigración.",
          en: "Regain your freedom while fighting your immigration case."
        },
        description: {
          es: "Cuando una persona es detenida por ICE (Servicio de Inmigración y Control de Aduanas), puede ser elegible para una fianza de inmigración que le permita salir del centro de detención mientras se resuelve su caso. Existen diferentes tipos de fianzas y cada una tiene requisitos específicos. Nuestros abogados tienen amplia experiencia argumentando ante jueces de inmigración para lograr fianzas razonables y la liberación de nuestros clientes.",
          en: "When a person is detained by ICE (Immigration and Customs Enforcement), they may be eligible for an immigration bond that allows them to leave the detention facility while their case is resolved. There are different types of bonds, each with specific requirements. Our attorneys have extensive experience arguing before immigration judges to secure reasonable bonds and the release of our clients."
        },
        subTitle: { es: "Tipos de Fianzas:", en: "Types of Bonds:" },
        subPoints: [
          { es: "Fianza de Entrega (Delivery Bond): Permite la liberación con la condición de asistir a todas las audiencias judiciales programadas.", en: "Delivery Bond: Allows release on the condition of attending all scheduled court hearings." },
          { es: "Fianza de Salida Voluntaria (Voluntary Departure Bond): Para quienes acuerdan salir del país voluntariamente dentro de un plazo específico.", en: "Voluntary Departure Bond: For those who agree to leave the country voluntarily within a specific timeframe." },
          { es: "Fianza de Custodia de ICE: Establecida directamente por ICE antes de que el caso llegue a un juez de inmigración.", en: "ICE Custody Bond: Set directly by ICE before the case reaches an immigration judge." },
          { es: "Audiencia de Redeterminación de Fianza: Si ICE establece una fianza demasiado alta o la niega, podemos solicitar que un juez la revise y la reduzca.", en: "Bond Redetermination Hearing: If ICE sets a bond too high or denies it, we can request that a judge review and reduce it." },
          { es: "Supervisión con Alternativas a la Detención (ATD): En algunos casos, se puede solicitar libertad bajo monitoreo electrónico en lugar de fianza.", en: "Alternatives to Detention (ATD) Supervision: In some cases, release under electronic monitoring can be requested instead of bond." }
        ],
        solution: {
          es: "El monto de las fianzas de inmigración generalmente comienza en $1,500 y puede superar los $25,000. Luchamos agresivamente para obtener la fianza más baja posible para nuestros clientes.",
          en: "Immigration bond amounts generally start at $1,500 and can exceed $25,000. We fight aggressively to obtain the lowest possible bond for our clients."
        }
      }
    },
    {
      id: 'detenidos',
      title: { es: "Detenidos por ICE", en: "ICE Detainees" },
      subtitle: { es: "Ayuda inmediata para familias", en: "Immediate help for families" },
      icon: ShieldAlert,
      content: {
        intro: {
          es: "Si su familiar fue detenido por ICE, actuar rápido puede hacer la diferencia.",
          en: "If your family member was detained by ICE, acting fast can make the difference."
        },
        description: {
          es: "La detención por parte de ICE es una de las experiencias más aterradoras que puede enfrentar una familia inmigrante. Cada minuto cuenta. Es fundamental no firmar ningún documento sin la asesoría de un abogado, ya que muchos detenidos firman órdenes de deportación voluntaria sin saber que tenían opciones legales para quedarse. Nuestro equipo responde a emergencias las 24 horas del día, los 7 días de la semana, y tiene experiencia visitando clientes en centros de detención en todo el país.",
          en: "Detention by ICE is one of the most terrifying experiences an immigrant family can face. Every minute counts. It is essential not to sign any documents without attorney advice, as many detainees sign voluntary deportation orders without knowing they had legal options to stay. Our team responds to emergencies 24 hours a day, 7 days a week, and has experience visiting clients in detention centers across the country."
        },
        subTitle: { es: "Qué Hacer Si un Familiar Es Detenido:", en: "What to Do If a Family Member Is Detained:" },
        subPoints: [
          { es: "NO firme ningún documento de ICE sin hablar primero con un abogado de inmigración. Muchos documentos son renuncias de derechos.", en: "DO NOT sign any ICE documents without first speaking with an immigration attorney. Many documents are waivers of rights." },
          { es: "Localice al detenido usando el sistema Online Detainee Locator de ICE o llamando al 1-888-351-4024.", en: "Locate the detainee using ICE's Online Detainee Locator system or by calling 1-888-351-4024." },
          { es: "Reúna documentos importantes: identificaciones, pruebas de presencia en EE.UU., certificados de nacimiento de hijos ciudadanos.", en: "Gather important documents: IDs, proof of presence in the U.S., birth certificates of citizen children." },
          { es: "Llame a nuestro equipo de emergencia al 866-979-5146 para iniciar la representación legal de inmediato.", en: "Call our emergency team at 866-979-5146 to begin legal representation immediately." },
          { es: "Toda persona detenida tiene derecho a un abogado, a no ser interrogada sin representación, y a una audiencia de fianza ante un juez.", en: "Every detained person has the right to an attorney, to not be interrogated without representation, and to a bond hearing before a judge." }
        ],
        solution: {
          es: "Tenemos una página dedicada con recursos completos para familias de detenidos. Visite nuestra sección de Clientes Detenidos para obtener más información y pasos detallados.",
          en: "We have a dedicated page with comprehensive resources for families of detainees. Visit our Detained Clients section for more information and detailed steps."
        }
      }
    },
    {
      id: 'criminal',
      title: { es: "Consecuencias Criminales", en: "Criminal Consequences" },
      subtitle: { es: "Cómo afectan los antecedentes", en: "How criminal records affect you" },
      icon: Gavel,
      content: {
        intro: {
          es: "Un error del pasado no tiene que definir su futuro migratorio.",
          en: "A past mistake does not have to define your immigration future."
        },
        description: {
          es: "Las condenas penales pueden tener consecuencias devastadoras en los casos de inmigración, incluyendo la deportación obligatoria, la negación de beneficios migratorios y la imposibilidad de obtener la ciudadanía. Sin embargo, no todas las condenas tienen el mismo impacto. Es crucial entender la diferencia entre delitos graves agravados (aggravated felonies), delitos que involucran bajeza moral (crimes involving moral turpitude o CIMT), y ofensas menores. Nuestros abogados analizan cada caso para determinar las opciones disponibles y las mejores estrategias de defensa.",
          en: "Criminal convictions can have devastating consequences in immigration cases, including mandatory deportation, denial of immigration benefits, and inability to obtain citizenship. However, not all convictions carry the same impact. It is crucial to understand the difference between aggravated felonies, crimes involving moral turpitude (CIMT), and minor offenses. Our attorneys analyze each case to determine available options and the best defense strategies."
        },
        subTitle: { es: "Categorías Clave de Delitos:", en: "Key Crime Categories:" },
        subPoints: [
          { es: "Delitos Graves Agravados (Aggravated Felonies): Incluyen tráfico de drogas, ciertos robos, fraude superior a $10,000. Prácticamente eliminan toda forma de alivio migratorio.", en: "Aggravated Felonies: Include drug trafficking, certain thefts, fraud exceeding $10,000. They virtually eliminate all forms of immigration relief." },
          { es: "Delitos de Bajeza Moral (CIMT): Incluyen fraude, robo, asalto con intención. Pueden causar inadmisibilidad y deportabilidad dependiendo de la sentencia.", en: "Crimes Involving Moral Turpitude (CIMT): Include fraud, theft, assault with intent. Can cause inadmissibility and deportability depending on the sentence." },
          { es: "DUI y Marihuana: Un DUI solo generalmente no es un CIMT, pero DUIs múltiples o con agravantes sí pueden afectar. Posesión de marihuana sigue siendo delito federal.", en: "DUI and Marijuana: A single DUI is generally not a CIMT, but multiple DUIs or those with aggravating factors can have an impact. Marijuana possession remains a federal offense." },
          { es: "Delitos de Violencia Doméstica: Son causa de deportación bajo la sección 237 del INA, independientemente de si son felonías o misdemeanors.", en: "Domestic Violence Offenses: Are grounds for deportation under INA section 237, regardless of whether they are felonies or misdemeanors." },
          { es: "Excepciones y Perdones: Existen perdones (waivers) disponibles para ciertos delitos, especialmente si puede demostrar rehabilitación y lazos familiares fuertes.", en: "Exceptions and Waivers: Waivers are available for certain offenses, especially if you can demonstrate rehabilitation and strong family ties." }
        ],
        solution: {
          es: "Antes de declararse culpable de cualquier cargo criminal, consulte con un abogado de inmigración. Una declaración de culpabilidad puede tener consecuencias migratorias permanentes e irreversibles.",
          en: "Before pleading guilty to any criminal charge, consult with an immigration attorney. A guilty plea can have permanent and irreversible immigration consequences."
        }
      }
    },
    {
      id: 'apelaciones',
      title: { es: "Apelaciones y Mociones", en: "Appeals & Motions" },
      subtitle: { es: "Cuando la pelea no termina", en: "When the fight is not over" },
      icon: BookOpen,
      content: {
        intro: {
          es: "Una decisión negativa no siempre es la última palabra.",
          en: "A negative decision is not always the final word."
        },
        description: {
          es: "Si un juez de inmigración niega su caso, usted tiene el derecho de apelar ante la Junta de Apelaciones de Inmigración (BIA, por sus siglas en inglés). Además, si su caso ya fue cerrado y han surgido nuevas circunstancias o nueva evidencia, puede presentar una moción para reabrir o una moción para reconsiderar. Estos recursos legales son técnicamente complejos y tienen plazos estrictos, por lo que contar con un abogado experimentado es fundamental para preservar sus derechos.",
          en: "If an immigration judge denies your case, you have the right to appeal to the Board of Immigration Appeals (BIA). Additionally, if your case has already been closed and new circumstances or new evidence have arisen, you can file a motion to reopen or a motion to reconsider. These legal remedies are technically complex and have strict deadlines, making an experienced attorney essential to preserving your rights."
        },
        subTitle: { es: "Opciones Legales Disponibles:", en: "Available Legal Options:" },
        subPoints: [
          { es: "Apelación ante el BIA: Debe presentarse dentro de 30 días de la decisión del juez. El BIA revisa errores de derecho y puede revertir, remitir o confirmar la decisión.", en: "BIA Appeal: Must be filed within 30 days of the judge's decision. The BIA reviews errors of law and can reverse, remand, or affirm the decision." },
          { es: "Moción para Reabrir: Permite presentar nueva evidencia que no estaba disponible durante el juicio original. Generalmente tiene un plazo de 90 días.", en: "Motion to Reopen: Allows presenting new evidence that was not available during the original hearing. Generally has a 90-day deadline." },
          { es: "Moción para Reconsiderar: Solicita que el juez o el BIA revise su propia decisión basándose en un error de derecho o de hecho en la decisión original.", en: "Motion to Reconsider: Requests that the judge or BIA review their own decision based on an error of law or fact in the original decision." },
          { es: "Revisión por Tribunal Federal: Si el BIA niega la apelación, en ciertos casos se puede llevar el caso ante un tribunal federal de circuito.", en: "Federal Court Review: If the BIA denies the appeal, in certain cases the case can be taken to a federal circuit court." },
          { es: "Reapertura Sua Sponte: En circunstancias extraordinarias, el BIA puede reabrir un caso por iniciativa propia, incluso fuera de los plazos regulares.", en: "Sua Sponte Reopening: In extraordinary circumstances, the BIA can reopen a case on its own initiative, even outside regular deadlines." }
        ],
        solution: {
          es: "Los plazos en apelaciones son estrictos e inflexibles. Si recibió una orden de deportación, contacte a un abogado inmediatamente. Cada día que pasa puede significar la pérdida de su derecho a apelar.",
          en: "Deadlines in appeals are strict and inflexible. If you received a deportation order, contact an attorney immediately. Every day that passes may mean losing your right to appeal."
        }
      }
    }
  ] as TabItem[],

  processSteps: [
    { id: 1, title: { es: "Evaluación de Emergencia", en: "Emergency Evaluation" }, icon: Siren, desc: { es: "Revisamos su situación inmediatamente. Si está detenido o tiene una orden de deportación, actuamos en horas, no en días.", en: "We review your situation immediately. If you are detained or have a deportation order, we act in hours, not days." } },
    { id: 2, title: { es: "Análisis del Caso", en: "Case Analysis" }, icon: FileText, desc: { es: "Examinamos su historial migratorio completo, antecedentes penales, tiempo en EE.UU. y lazos familiares para identificar todas las vías de defensa.", en: "We examine your complete immigration history, criminal background, time in the U.S., and family ties to identify all defense avenues." } },
    { id: 3, title: { es: "Estrategia Legal", en: "Legal Strategy" }, icon: Target, desc: { es: "Desarrollamos un plan personalizado: cancelación de remoción, fianza, ajuste de estatus, o la combinación de remedios más fuerte para su caso.", en: "We develop a personalized plan: cancellation of removal, bond, adjustment of status, or the strongest combination of remedies for your case." } },
    { id: 4, title: { es: "Preparación de Evidencia", en: "Evidence Preparation" }, icon: CheckCircle2, desc: { es: "Recopilamos declaraciones juradas, registros médicos, pruebas de presencia continua, cartas de apoyo y documentación de hardship.", en: "We gather affidavits, medical records, proof of continuous presence, support letters, and hardship documentation." } },
    { id: 5, title: { es: "Representación en Corte", en: "Court Representation" }, icon: Landmark, desc: { es: "Nuestros abogados lo representan agresivamente ante el juez de inmigración, presentando argumentos persuasivos y evidencia organizada.", en: "Our attorneys represent you aggressively before the immigration judge, presenting persuasive arguments and organized evidence." } },
    { id: 6, title: { es: "Seguimiento y Apelaciones", en: "Follow-up & Appeals" }, icon: BookOpen, desc: { es: "Si es necesario, presentamos apelaciones ante el BIA o mociones para reabrir. No descansamos hasta agotar todas las opciones legales.", en: "If necessary, we file appeals with the BIA or motions to reopen. We do not rest until all legal options are exhausted." } },
  ],

  faqs: [
    {
      q: { es: "¿Puedo evitar la deportación si ya tengo una orden de remoción?", en: "Can I avoid deportation if I already have a removal order?" },
      a: { es: "Posiblemente sí. Dependiendo de las circunstancias, puede presentar una moción para reabrir su caso ante el juez de inmigración o el BIA, especialmente si hay nueva evidencia, un cambio en la ley, o si no recibió notificación adecuada de su audiencia. También pueden existir opciones como la estancia de remoción (stay of removal) mientras se resuelve la apelación.", en: "Possibly yes. Depending on the circumstances, you can file a motion to reopen your case before the immigration judge or the BIA, especially if there is new evidence, a change in the law, or if you did not receive proper notice of your hearing. Options such as a stay of removal while the appeal is resolved may also exist." }
    },
    {
      q: { es: "¿Cuánto tiempo toma el proceso de cancelación de remoción?", en: "How long does the cancellation of removal process take?" },
      a: { es: "El proceso puede tomar desde varios meses hasta varios años, dependiendo del tribunal y la complejidad del caso. Durante este tiempo, si obtiene una fianza, puede permanecer en libertad con su familia. Nuestro equipo trabaja para acelerar el proceso en lo posible mientras construye el caso más sólido.", en: "The process can take from several months to several years, depending on the court and the complexity of the case. During this time, if you obtain a bond, you can remain free with your family. Our team works to expedite the process as much as possible while building the strongest case." }
    },
    {
      q: { es: "¿Un DUI me puede causar la deportación?", en: "Can a DUI cause my deportation?" },
      a: { es: "Un solo DUI simple generalmente no es causa directa de deportación, pero puede complicar otros trámites migratorios. Múltiples DUIs, DUIs con lesiones, o DUIs combinados con otros factores pueden resultar en procedimientos de deportación. Además, un DUI puede afectar su capacidad de demostrar buen carácter moral para la cancelación de remoción o la ciudadanía.", en: "A single simple DUI is generally not a direct cause of deportation, but it can complicate other immigration processes. Multiple DUIs, DUIs with injuries, or DUIs combined with other factors can result in deportation proceedings. Additionally, a DUI can affect your ability to demonstrate good moral character for cancellation of removal or citizenship." }
    },
    {
      q: { es: "¿Pueden deportar a alguien con hijos ciudadanos?", en: "Can someone with citizen children be deported?" },
      a: { es: "Sí, tener hijos ciudadanos no impide automáticamente la deportación. Sin embargo, los hijos ciudadanos son un factor fundamental en la defensa, especialmente en casos de cancelación de remoción donde debe demostrar que la deportación causaría sufrimiento excepcional a sus hijos. Necesidades médicas, educativas y emocionales de los hijos son argumentos poderosos.", en: "Yes, having citizen children does not automatically prevent deportation. However, citizen children are a fundamental factor in the defense, especially in cancellation of removal cases where you must demonstrate that deportation would cause exceptional hardship to your children. Medical, educational, and emotional needs of the children are powerful arguments." }
    },
    {
      q: { es: "¿Cuánto cuesta una fianza de inmigración?", en: "How much does an immigration bond cost?" },
      a: { es: "Las fianzas de inmigración generalmente van desde $1,500 hasta $25,000 o más, dependiendo de factores como el historial criminal, lazos comunitarios, riesgo de fuga y el criterio del juez. Nuestros abogados argumentan vigorosamente para obtener la fianza más baja posible. Si ICE establece una fianza excesiva, podemos solicitar una audiencia de redeterminación ante un juez de inmigración.", en: "Immigration bonds generally range from $1,500 to $25,000 or more, depending on factors such as criminal history, community ties, flight risk, and the judge's criteria. Our attorneys argue vigorously to obtain the lowest possible bond. If ICE sets an excessive bond, we can request a redetermination hearing before an immigration judge." }
    },
  ],

  interface: {
    badge: { es: "Defensa Urgente de Deportación", en: "Urgent Deportation Defense" },
    heroTitle1: { es: "Defensa contra", en: "Defense against" },
    heroTitle2: { es: "Deportación", en: "Deportation" },
    heroDescription: {
      es: "Con más de 35 años de experiencia y 50,000+ casos, nuestros abogados luchan agresivamente para proteger su derecho a permanecer en Estados Unidos. Cancelación de remoción, fianzas, representación en corte y apelaciones.",
      en: "With over 35 years of experience and 50,000+ cases, our attorneys fight aggressively to protect your right to remain in the United States. Cancellation of removal, bonds, court representation, and appeals."
    },
    emergencyPhone: '866-979-5146',
    ctaConsultation: { es: "Evaluación de Emergencia", en: "Emergency Evaluation" },
    ctaCall: { es: "Emergencia 24/7", en: "24/7 Emergency" },
    processMethod: { es: "Nuestro Proceso", en: "Our Process" },
    processTitle: { es: "Cómo Defendemos su Caso", en: "How We Defend Your Case" },
    requestEvaluation: { es: "Solicitar Evaluación de Caso", en: "Request Case Evaluation" },
    faqTitle: { es: "Preguntas Frecuentes", en: "Frequently Asked Questions" },
    faqSubtitle: { es: "Resolvemos sus dudas sobre deportación y defensa migratoria.", en: "We answer your questions about deportation and immigration defense." },
    contactTitle: { es: "Proteja su Futuro en EE.UU.", en: "Protect Your Future in the U.S." },
    officesTitle: { es: "15 Oficinas a su Servicio", en: "15 Offices at Your Service" },
    officesSubtitle: { es: "Representación legal en persona en todo el país", en: "In-person legal representation nationwide" },
    detainedLink: { es: "Ver recursos para detenidos", en: "View resources for detainees" },
    blogTitle: { es: "Artículos Relacionados", en: "Related Articles" },
    statsYears: { es: "Años de Experiencia", en: "Years of Experience" },
    statsCases: { es: "Casos Resueltos", en: "Cases Resolved" },
    statsOffices: { es: "Oficinas", en: "Offices" },
  }
};

export default function DeportacionClient() {
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

  const blogPosts = [
    {
      slug: 'ley_de_los_10_anos_cancelacion_de_deportacion',
      title: { es: 'La Ley de los 10 Años: Cancelación de Deportación', en: 'The 10-Year Law: Cancellation of Removal' },
      category: { es: 'Defensa de Deportación', en: 'Deportation Defense' },
      image: '/blog/blog_16/BLOG06_CR1.png',
    },
    {
      slug: 'Frenar_deportacion_inminente_con_solicitud_de_Visa_Humanitaria',
      title: { es: 'Frenar Deportación con Visa Humanitaria', en: 'Stop Deportation with Humanitarian Visa' },
      category: { es: 'Defensa de Deportación', en: 'Deportation Defense' },
      image: '/blog/blog_05/B5_CR1.png',
    },
    {
      slug: 'marihuana_dui_buen_caracter_moral_inmigracion',
      title: { es: 'Marihuana, DUI y Buen Carácter Moral', en: 'Marijuana, DUI & Good Moral Character' },
      category: { es: 'Consecuencias Criminales', en: 'Criminal Consequences' },
      image: '/blog/blog_17/BLOG07_CR1.png',
    },
    {
      slug: 'advance_parole_2026_viajar_con_daca_tps_visa_u',
      title: { es: 'Advance Parole 2026: Viajar con DACA, TPS o Visa U', en: 'Advance Parole 2026: Travel with DACA, TPS or U Visa' },
      category: { es: 'Proceso Migratorio', en: 'Immigration Process' },
      image: '/blog/blog_12/BLOG02_CR1.png',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#001540] text-white relative selection:bg-[#B2904D] selection:text-white font-sans overflow-x-hidden">

      <Header />

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full transform-gpu">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform, opacity" }}
          className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-red-900/10 rounded-full blur-[80px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ willChange: "transform, opacity" }}
          className="absolute bottom-[-10%] left-[-5%] w-[70vw] h-[70vw] bg-sky-800/10 rounded-full blur-[90px]"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
          <span className="text-[12vw] font-black italic text-white tracking-tighter transform -skew-x-12 whitespace-nowrap">
            DEFENSA
          </span>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 md:pt-40 pb-12 md:pb-20 px-4 z-10 min-h-[85vh] flex flex-col justify-center">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* LEFT: STATS COLUMN */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="lg:col-span-5 relative flex flex-col items-center justify-center gap-8 order-2 lg:order-1"
            >
              {/* Emergency Phone Card */}
              <motion.a
                href="tel:+18669795146"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="w-full max-w-md p-8 rounded-[2rem] border-2 border-red-500/40 bg-gradient-to-br from-red-900/30 to-red-950/20 backdrop-blur-xl shadow-[0_0_40px_rgba(220,38,38,0.15)] block"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
                    <PhoneCall className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-red-400 text-xs font-bold tracking-[0.2em] uppercase block">{gT(texts.interface.ctaCall)}</span>
                    <span className="text-white text-2xl font-black tracking-tight">{texts.interface.emergencyPhone}</span>
                  </div>
                </div>
                <p className="text-red-200/70 text-sm">
                  {lang === 'es'
                    ? 'Línea directa para emergencias de deportación y detención por ICE.'
                    : 'Direct line for deportation emergencies and ICE detention.'}
                </p>
              </motion.a>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                {[
                  { value: '35+', label: gT(texts.interface.statsYears) },
                  { value: '50K+', label: gT(texts.interface.statsCases) },
                  { value: '15', label: gT(texts.interface.statsOffices) },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="text-center p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                  >
                    <span className="text-3xl font-black text-[#B2904D] block">{stat.value}</span>
                    <span className="text-xs text-white/60 uppercase tracking-wider font-medium">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT: TEXT CONTAINER */}
            <div className="lg:col-span-7 space-y-8 pl-0 lg:pl-8 relative z-20 order-1 lg:order-2 flex flex-col justify-center items-start">

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 backdrop-blur-sm shadow-[0_0_15px_rgba(220,38,38,0.1)] self-start">
                <AlertTriangle size={16} className="text-red-400" />
                <span className="text-red-400 text-xs font-bold tracking-[0.2em] uppercase">{gT(texts.interface.badge)}</span>
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
                <a href="tel:+18669795146" className="px-8 py-4 border-2 border-red-500/50 hover:border-red-400 text-white font-bold rounded-xl transition-all hover:-translate-y-1 flex items-center gap-3 group text-base bg-red-500/10 hover:bg-red-500/20">
                  <PhoneCall size={20} className="text-red-400" />
                  {gT(texts.interface.ctaCall)}
                </a>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* --- TAB SECTIONS --- */}
      <section className="px-4 py-24 relative z-10 bg-[#001026]" id="detalles">
        <div className="max-w-7xl mx-auto relative z-10">

          {/* TABS HEADER */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-16">
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
                className={`group relative px-5 py-3.5 rounded-2xl transition-all duration-300 border ${
                  selectedTab === tab.id
                    ? 'bg-[#B2904D] border-[#B2904D] shadow-[0_0_20px_rgba(178,144,77,0.4)]'
                    : 'bg-white/5 border-white/10 hover:border-[#B2904D]/50 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <tab.icon
                    size={18}
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
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">

                <div className="absolute top-0 right-0 w-64 h-64 bg-[#B2904D]/10 rounded-full blur-[80px] pointer-events-none"></div>

                {/* Header */}
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

                {/* Main Content */}
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
                        <Shield className="text-[#B2904D] shrink-0 mt-1" size={24} />
                        {gT(activeTabContent.content.solution)}
                      </p>
                    </div>
                  )}

                  {/* Link to detained clients page (show on detenidos tab) */}
                  {selectedTab === 'detenidos' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Link
                        href={`/${lang}/clientes-detenidos`}
                        className="inline-flex items-center gap-3 px-6 py-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 hover:text-white hover:bg-red-500/20 transition-all font-bold group"
                      >
                        <ShieldAlert size={20} />
                        {gT(texts.interface.detainedLink)}
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  )}

                  {/* CTA */}
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

      {/* --- PROCESS SECTION --- */}
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
                    <motion.div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#B2904D] transition-colors duration-300 shadow-inner">
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

      {/* --- OFFICES SECTION --- */}
      <section className="py-24 relative z-10 bg-[#000a20]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">{gT(texts.interface.officesTitle)}</h2>
            <p className="text-blue-100/60 text-lg max-w-2xl mx-auto font-light">{gT(texts.interface.officesSubtitle)}</p>
            <div className="h-1 w-24 bg-[#B2904D] mx-auto rounded-full mt-6" />
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
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
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#B2904D]/40 hover:bg-white/10 transition-all group"
                >
                  <MapPin size={14} className="text-[#B2904D] shrink-0" />
                  <span className="text-sm text-white/80 group-hover:text-white font-medium truncate">{office.name}</span>
                </Link>
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

      {/* --- RELATED BLOG POSTS --- */}
      <section className="py-24 relative bg-[#001540]">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-black text-white mb-4">{gT(texts.interface.blogTitle)}</h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-[#B2904D] to-transparent mx-auto rounded-full mt-6"
            />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {blogPosts.map((article, i) => (
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
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000a20] to-transparent opacity-60" />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] text-[#B2904D] font-bold uppercase tracking-widest">{article.category[lang]}</span>
                    <h4 className="text-sm font-medium text-white group-hover:text-[#B2904D] transition-colors line-clamp-2 leading-snug mt-1">
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
                <h2 className="text-3xl md:text-4xl font-black mb-3">{gT(texts.interface.contactTitle)}</h2>
                <p className="text-blue-100/60 font-light">
                  {lang === 'es'
                    ? 'Complete el formulario y un abogado de defensa de deportación se comunicará con usted lo antes posible.'
                    : 'Complete the form and a deportation defense attorney will contact you as soon as possible.'}
                </p>
              </div>
              <div className="contact-form-wrapper-override">
                <ContactForm />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FINAL CTA BAR --- */}
      <section className="relative z-10 bg-gradient-to-r from-[#B2904D] to-[#D4AF37] py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black text-[#001540]">
              {lang === 'es' ? '¿Enfrenta una deportación? No espere más.' : 'Facing deportation? Do not wait any longer.'}
            </h3>
            <p className="text-[#001540]/70 font-medium">
              {lang === 'es' ? 'Cada día cuenta. Llame ahora para una consulta de emergencia.' : 'Every day counts. Call now for an emergency consultation.'}
            </p>
          </div>
          <a
            href="tel:+18669795146"
            className="flex items-center gap-3 px-8 py-4 bg-[#001540] text-white font-bold rounded-xl hover:bg-[#002868] transition-colors shadow-lg group"
          >
            <PhoneCall size={22} className="group-hover:animate-pulse" />
            <span className="text-lg">{texts.interface.emergencyPhone}</span>
          </a>
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
