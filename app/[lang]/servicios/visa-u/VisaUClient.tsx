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
  Building2,
  Users,
  Search,
  MessageSquare,
  Send,
  HelpCircle,
  MapPin,
  Clock,
  Target,
  Star,
  Scale,
  AlertTriangle,
  Heart,
  FileCheck,
  Gavel,
  UserCheck,
  ShieldCheck,
  BookOpen
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

// Interfaces
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
      title: { es: "¿Qué es la Visa U?", en: "What is the U Visa?" },
      subtitle: { es: "Protección para Víctimas de Crímenes", en: "Protection for Crime Victims" },
      icon: Shield,
      content: {
        intro: { es: "Estatus migratorio para víctimas que cooperan con la justicia", en: "Immigration status for victims who cooperate with law enforcement" },
        description: { es: "La Visa U (U Nonimmigrant Status) fue creada por el Congreso de Estados Unidos bajo la Ley de Protección a Víctimas de Tráfico y Violencia (VTVPA) del año 2000. Su propósito es proteger a víctimas de ciertos crímenes graves que han sufrido abuso físico o mental sustancial y que cooperan con las autoridades policiales o fiscales en la investigación o procesamiento del delito. Este estatus permite a las víctimas permanecer legalmente en Estados Unidos, obtener permiso de trabajo y, eventualmente, solicitar la residencia permanente (Green Card) después de tres años.", en: "The U Visa (U Nonimmigrant Status) was created by the United States Congress under the Victims of Trafficking and Violence Protection Act (VTVPA) of 2000. Its purpose is to protect victims of certain serious crimes who have suffered substantial physical or mental abuse and who cooperate with law enforcement or prosecutors in the investigation or prosecution of the crime. This status allows victims to remain legally in the United States, obtain a work permit, and eventually apply for permanent residency (Green Card) after three years." },
        subTitle: { es: "Crímenes que Califican:", en: "Qualifying Crimes:" },
        subPoints: [
          { es: "Violencia Doméstica: Abuso físico, emocional o sexual por parte de una pareja o familiar.", en: "Domestic Violence: Physical, emotional, or sexual abuse by a partner or family member." },
          { es: "Agresión Sexual: Violación, abuso sexual, prostitución forzada y explotación sexual.", en: "Sexual Assault: Rape, sexual abuse, forced prostitution, and sexual exploitation." },
          { es: "Tráfico Humano: Trabajo forzado, servidumbre involuntaria y trata de personas.", en: "Human Trafficking: Forced labor, involuntary servitude, and human trafficking." },
          { es: "Secuestro y Extorsión: Retención ilegal de personas y amenazas para obtener dinero o favores.", en: "Kidnapping and Extortion: Illegal detention of persons and threats to obtain money or favors." },
          { es: "Otros Crímenes: Tortura, homicidio (sobrevivientes), asalto agravado, fraude laboral, obstrucción de justicia, chantaje y más.", en: "Other Crimes: Torture, murder (survivors), aggravated assault, labor fraud, obstruction of justice, blackmail, and more." },
        ],
        solution: { es: "La lista completa de crímenes calificantes incluye más de 25 delitos. Si fue víctima de un crimen violento en EE.UU., podría calificar incluso si no tiene estatus migratorio.", en: "The complete list of qualifying crimes includes over 25 offenses. If you were a victim of a violent crime in the U.S., you may qualify even if you have no immigration status." }
      }
    },
    {
      id: 'bonafide',
      title: { es: "Determinación Bona Fide", en: "Bona Fide Determination" },
      subtitle: { es: "Permiso de Trabajo Anticipado", en: "Early Work Authorization" },
      icon: FileCheck,
      content: {
        intro: { es: "Protección mientras USCIS revisa su caso completo", en: "Protection while USCIS reviews your full case" },
        description: { es: "Debido a la gran cantidad de solicitudes de Visa U y el límite anual de 10,000 visas, USCIS implementó el proceso de Determinación Bona Fide (BFD). Cuando USCIS determina que una petición de Visa U tiene mérito aparente y merece una investigación completa, emite una determinación bona fide que otorga al solicitante beneficios importantes mientras espera que una visa esté disponible. Esto incluye un permiso de trabajo (Employment Authorization Document o EAD) y una protección conocida como 'deferred action' que impide la deportación.", en: "Due to the large volume of U Visa applications and the annual cap of 10,000 visas, USCIS implemented the Bona Fide Determination (BFD) process. When USCIS determines that a U Visa petition has apparent merit and deserves a full investigation, it issues a bona fide determination that grants the applicant important benefits while waiting for a visa to become available. This includes a work permit (Employment Authorization Document or EAD) and protection known as 'deferred action' that prevents deportation." },
        subTitle: { es: "Beneficios de la Determinación Bona Fide:", en: "Bona Fide Determination Benefits:" },
        subPoints: [
          { es: "Permiso de Trabajo (EAD): Autorización para trabajar legalmente en Estados Unidos mediante el formulario I-765.", en: "Work Permit (EAD): Authorization to work legally in the United States through Form I-765." },
          { es: "Acción Diferida (Deferred Action): Protección contra la deportación mientras su caso está pendiente.", en: "Deferred Action: Protection against deportation while your case is pending." },
          { es: "Autorización de 4 Años: El permiso de trabajo BFD se emite por un período de hasta 4 años, renovable.", en: "4-Year Authorization: The BFD work permit is issued for a period of up to 4 years, renewable." },
          { es: "Número de Seguro Social: Con el EAD puede solicitar un SSN para trabajar, pagar impuestos y construir historial crediticio.", en: "Social Security Number: With the EAD you can apply for an SSN to work, pay taxes, and build credit history." },
        ],
        solution: { es: "La determinación bona fide no garantiza la aprobación final de la Visa U, pero ofrece estabilidad legal y laboral mientras espera. Nuestros abogados preparan su caso para maximizar las probabilidades de obtener esta determinación rápidamente.", en: "A bona fide determination does not guarantee final U Visa approval, but it provides legal and employment stability while you wait. Our attorneys prepare your case to maximize the chances of obtaining this determination quickly." }
      }
    },
    {
      id: 'perdon',
      title: { es: "Perdón I-192", en: "I-192 Waiver" },
      subtitle: { es: "Superar Inadmisibilidad", en: "Overcoming Inadmissibility" },
      icon: Gavel,
      content: {
        intro: { es: "Soluciones para víctimas con antecedentes migratorios o penales", en: "Solutions for victims with immigration or criminal history" },
        description: { es: "Muchas víctimas de crímenes en Estados Unidos tienen situaciones migratorias complicadas: entradas sin inspección, deportaciones previas, estancias ilegales prolongadas o incluso ciertos antecedentes penales menores. El formulario I-192 (Application for Advance Permission to Enter as Nonimmigrant) permite a solicitantes de Visa U solicitar un perdón por estos motivos de inadmisibilidad. Sin este perdón, USCIS negaría la Visa U a pesar de que la persona es una víctima legítima de un crimen.", en: "Many crime victims in the United States have complicated immigration situations: entries without inspection, prior deportations, extended unlawful presence, or even certain minor criminal records. Form I-192 (Application for Advance Permission to Enter as Nonimmigrant) allows U Visa applicants to request a waiver for these grounds of inadmissibility. Without this waiver, USCIS would deny the U Visa even though the person is a legitimate crime victim." },
        subTitle: { es: "Motivos Comunes de Inadmisibilidad que se Pueden Perdonar:", en: "Common Grounds of Inadmissibility That Can Be Waived:" },
        subPoints: [
          { es: "Entrada Ilegal: Haber cruzado la frontera sin documentos o sin inspección por un oficial.", en: "Illegal Entry: Having crossed the border without documents or without inspection by an officer." },
          { es: "Deportaciones Previas: Órdenes de deportación o remoción anteriores, incluso deportaciones voluntarias.", en: "Prior Deportations: Previous deportation or removal orders, including voluntary departures." },
          { es: "Presencia Ilegal: Haber permanecido en EE.UU. más allá del tiempo autorizado por una visa.", en: "Unlawful Presence: Having remained in the U.S. beyond the time authorized by a visa." },
          { es: "Ciertos Antecedentes Penales: Delitos menores que no constituyen 'barras' permanentes a la admisión.", en: "Certain Criminal Records: Minor offenses that do not constitute permanent 'bars' to admission." },
        ],
        solution: { es: "El perdón I-192 para la Visa U tiene un estándar más favorable que otros perdones migratorios. USCIS evalúa si es en 'interés público' otorgar el perdón, considerando la gravedad del crimen sufrido y la cooperación con las autoridades. Nuestros abogados han logrado perdones para clientes con múltiples deportaciones.", en: "The I-192 waiver for the U Visa has a more favorable standard than other immigration waivers. USCIS evaluates whether it is in the 'public interest' to grant the waiver, considering the severity of the crime suffered and cooperation with authorities. Our attorneys have obtained waivers for clients with multiple deportations." }
      }
    },
    {
      id: 'derivados',
      title: { es: "Derivados", en: "Derivatives" },
      subtitle: { es: "Protección para su Familia", en: "Protection for Your Family" },
      icon: Users,
      content: {
        intro: { es: "Su familia también puede obtener estatus legal a través de la Visa U", en: "Your family can also obtain legal status through the U Visa" },
        description: { es: "La ley de Visa U reconoce que los crímenes no solo afectan a la víctima directa, sino también a su familia. Por ello, los familiares calificados pueden ser incluidos como 'derivados' en la petición de Visa U, obteniendo los mismos beneficios: estatus legal, permiso de trabajo y, eventualmente, la posibilidad de solicitar la residencia permanente. Los familiares elegibles dependen de la edad del peticionario principal al momento de presentar la solicitud.", en: "The U Visa law recognizes that crimes do not only affect the direct victim but also their family. Therefore, qualifying family members can be included as 'derivatives' on the U Visa petition, obtaining the same benefits: legal status, work authorization, and eventually the ability to apply for permanent residency. Eligible family members depend on the age of the principal petitioner at the time of filing." },
        subTitle: { es: "Familiares Elegibles como Derivados:", en: "Eligible Family Members as Derivatives:" },
        subPoints: [
          { es: "Cónyuge: El esposo o esposa del peticionario principal puede ser incluido sin importar su estatus migratorio.", en: "Spouse: The husband or wife of the principal petitioner can be included regardless of their immigration status." },
          { es: "Hijos Menores de 21 Años: Los hijos solteros menores de 21 años al momento de la solicitud, incluyendo hijastros.", en: "Children Under 21: Unmarried children under 21 at the time of filing, including stepchildren." },
          { es: "Padres (si el principal es menor de 21): Si la víctima principal es menor de 21 años, puede incluir a sus padres.", en: "Parents (if principal is under 21): If the principal victim is under 21 years old, they can include their parents." },
          { es: "Hermanos Menores (si el principal es menor de 21): Hermanos solteros menores de 18 años del peticionario menor.", en: "Siblings Under 18 (if principal is under 21): Unmarried siblings under 18 of the minor petitioner." },
        ],
        solution: { es: "Los derivados pueden ser agregados incluso después de que la Visa U del peticionario principal haya sido aprobada, siempre que el matrimonio o la relación existiera al momento de la solicitud original o se haya formado después. Nuevos esposos e hijos nacidos después también pueden calificar bajo ciertas circunstancias.", en: "Derivatives can be added even after the principal petitioner's U Visa has been approved, as long as the marriage or relationship existed at the time of the original application or was formed afterward. New spouses and children born later may also qualify under certain circumstances." }
      }
    },
    {
      id: 'proceso',
      title: { es: "Proceso y Tiempos", en: "Process & Timeline" },
      subtitle: { es: "Qué Esperar de Principio a Fin", en: "What to Expect from Start to Finish" },
      icon: Clock,
      content: {
        intro: { es: "Una guía paso a paso del proceso de la Visa U", en: "A step-by-step guide to the U Visa process" },
        description: { es: "El proceso de Visa U comienza con la certificación policial (Suplemento B del formulario I-918) y la presentación de la petición ante USCIS. Debido al límite anual de 10,000 visas y la alta demanda, los tiempos de espera pueden ser prolongados. Sin embargo, con la determinación bona fide, muchos solicitantes obtienen permisos de trabajo y protección contra la deportación en un plazo mucho más corto. USCIS ha procesado peticiones de forma más eficiente en los últimos años gracias a la política de determinaciones bona fide implementada en 2021.", en: "The U Visa process begins with the law enforcement certification (Supplement B of Form I-918) and filing the petition with USCIS. Due to the annual cap of 10,000 visas and high demand, wait times can be lengthy. However, with the bona fide determination, many applicants obtain work permits and deportation protection in a much shorter timeframe. USCIS has processed petitions more efficiently in recent years thanks to the bona fide determination policy implemented in 2021." },
        subTitle: { es: "Etapas del Proceso:", en: "Process Stages:" },
        subPoints: [
          { es: "Certificación Policial (Suplemento B): La agencia de ley que investigó el crimen debe firmar el formulario I-918 Supplement B, certificando que usted fue víctima y cooperó en la investigación.", en: "Law Enforcement Certification (Supplement B): The law enforcement agency that investigated the crime must sign Form I-918 Supplement B, certifying that you were a victim and cooperated in the investigation." },
          { es: "Presentación del Formulario I-918: Se envía la petición completa a USCIS con evidencia del crimen, certificación, declaración personal y pruebas de abuso sustancial.", en: "Filing Form I-918: The complete petition is sent to USCIS with evidence of the crime, certification, personal statement, and proof of substantial abuse." },
          { es: "Determinación Prima Facie o Bona Fide: USCIS revisa la petición y, si tiene mérito, emite una determinación que otorga permiso de trabajo y protección temporal.", en: "Prima Facie or Bona Fide Determination: USCIS reviews the petition and, if it has merit, issues a determination granting work authorization and temporary protection." },
          { es: "Aprobación Final y Residencia: Una vez que una visa está disponible, USCIS aprueba el estatus U. Después de 3 años en estatus U, puede solicitar la residencia permanente (Green Card).", en: "Final Approval and Residency: Once a visa becomes available, USCIS approves U status. After 3 years in U status, you can apply for permanent residency (Green Card)." },
        ],
        solution: { es: "Los tiempos de procesamiento varían, pero la determinación bona fide puede obtenerse en meses, no años. La aprobación final de la Visa U depende de la disponibilidad de visas bajo el límite anual. Nuestro equipo le mantiene informado en cada etapa y responde a cualquier solicitud de evidencia adicional (RFE) de USCIS.", en: "Processing times vary, but a bona fide determination can be obtained in months, not years. Final U Visa approval depends on visa availability under the annual cap. Our team keeps you informed at every stage and responds to any requests for additional evidence (RFEs) from USCIS." }
      }
    }
  ] as TabItem[],

  processSteps: [
    { id: 1, title: { es: "Consulta Gratuita", en: "Free Consultation" }, icon: MessageSquare, desc: { es: "Evaluamos su caso de forma confidencial. Analizamos los hechos del crimen, su situación migratoria actual y determinamos si califica para la Visa U u otro alivio migratorio.", en: "We evaluate your case confidentially. We analyze the facts of the crime, your current immigration situation, and determine if you qualify for the U Visa or other immigration relief." } },
    { id: 2, title: { es: "Análisis del Caso", en: "Case Analysis" }, icon: Search, desc: { es: "Revisamos reportes policiales, evidencia del crimen y documentación médica o psicológica. Identificamos la agencia de ley correcta para la certificación y anticipamos posibles obstáculos.", en: "We review police reports, crime evidence, and medical or psychological documentation. We identify the correct law enforcement agency for certification and anticipate possible obstacles." } },
    { id: 3, title: { es: "Estrategia Legal", en: "Legal Strategy" }, icon: Scale, desc: { es: "Desarrollamos una estrategia personalizada: obtenemos la certificación policial, preparamos la declaración personal, y si es necesario, presentamos el perdón I-192 simultáneamente.", en: "We develop a personalized strategy: we obtain the law enforcement certification, prepare the personal statement, and if necessary, file the I-192 waiver simultaneously." } },
    { id: 4, title: { es: "Presentación y Resultado", en: "Filing & Outcome" }, icon: Send, desc: { es: "Presentamos el caso ante USCIS, gestionamos la determinación bona fide para su permiso de trabajo, y le acompañamos hasta la aprobación final de la Visa U y la solicitud de residencia.", en: "We file the case with USCIS, manage the bona fide determination for your work permit, and accompany you through the final U Visa approval and residency application." } },
  ],

  faqs: [
    { q: { es: "¿Puedo obtener la Visa U si soy indocumentado?", en: "Can I get a U Visa if I am undocumented?" }, a: { es: "Sí. La Visa U fue diseñada precisamente para proteger a víctimas de crímenes sin importar su estatus migratorio. Incluso personas que entraron sin inspección, tienen órdenes de deportación o no tienen ningún estatus pueden calificar. Si tiene motivos de inadmisibilidad, el perdón I-192 puede resolver esos obstáculos.", en: "Yes. The U Visa was specifically designed to protect crime victims regardless of their immigration status. Even people who entered without inspection, have deportation orders, or have no status at all can qualify. If you have grounds of inadmissibility, the I-192 waiver can resolve those obstacles." } },
    { q: { es: "¿Qué pasa si la policía no quiere firmar la certificación?", en: "What if the police won't sign the certification?" }, a: { es: "Si la agencia de ley se niega a firmar el Suplemento B, existen estrategias legales. Podemos contactar a otras agencias que participaron en la investigación (fiscalía, FBI, EEOC, departamento de trabajo), enviar solicitudes formales explicando la obligación legal, o explorar alternativas como la Visa T o VAWA según su situación.", en: "If the law enforcement agency refuses to sign Supplement B, there are legal strategies. We can contact other agencies that participated in the investigation (prosecutor's office, FBI, EEOC, Department of Labor), send formal requests explaining the legal obligation, or explore alternatives like the T Visa or VAWA depending on your situation." } },
    { q: { es: "¿Cuánto tiempo tarda el proceso de Visa U?", en: "How long does the U Visa process take?" }, a: { es: "Los tiempos varían. La determinación bona fide, que otorga permiso de trabajo y protección contra deportación, puede obtenerse en varios meses después de presentar la petición. La aprobación final de la Visa U depende de la disponibilidad bajo el límite anual de 10,000 visas. Una vez aprobada, después de 3 años puede solicitar la residencia permanente.", en: "Times vary. The bona fide determination, which grants work authorization and deportation protection, can be obtained within several months of filing the petition. Final U Visa approval depends on availability under the annual cap of 10,000 visas. Once approved, after 3 years you can apply for permanent residency." } },
    { q: { es: "¿Mi familia puede ser incluida en mi Visa U?", en: "Can my family be included in my U Visa?" }, a: { es: "Sí. Como peticionario principal puede incluir a su cónyuge e hijos solteros menores de 21 años como derivados. Si usted es menor de 21 años, también puede incluir a sus padres y hermanos solteros menores de 18. Los derivados reciben los mismos beneficios: estatus legal, permiso de trabajo y camino a la residencia.", en: "Yes. As the principal petitioner, you can include your spouse and unmarried children under 21 as derivatives. If you are under 21, you can also include your parents and unmarried siblings under 18. Derivatives receive the same benefits: legal status, work authorization, and a path to residency." } },
    { q: { es: "¿El agresor se enterará de que solicité la Visa U?", en: "Will the abuser find out I applied for the U Visa?" }, a: { es: "USCIS tiene políticas estrictas de confidencialidad para proteger a las víctimas de crímenes. La información de su caso no se comparte con el agresor. Además, existen protecciones adicionales bajo la Sección 384 de la ley IIRIRA que prohíben el uso de información proporcionada por un abusador para iniciar procedimientos migratorios contra la víctima.", en: "USCIS has strict confidentiality policies to protect crime victims. Your case information is not shared with the abuser. Additionally, there are extra protections under Section 384 of the IIRIRA law that prohibit using information provided by an abuser to initiate immigration proceedings against the victim." } },
  ],

  offices: [
    'Houston Principal', 'Houston Bellaire', 'Dallas', 'San Antonio (Main St)',
    'San Antonio (Kirby)', 'El Paso', 'Harlingen', 'League City',
    'Houston (North Loop)', 'Houston (Northchase)', 'Houston Accidentes',
    'Arvada (Colorado)', 'Chicago', 'Memphis', 'Los Angeles'
  ],

  blogArticles: [
    {
      slug: 'permiso_de_trabajo_visa_u',
      title: { es: 'Permiso de Trabajo con Visa U: Cómo Obtenerlo', en: 'U Visa Work Permit: How to Get It' },
      category: { es: 'Visa U', en: 'U Visa' },
    },
    {
      slug: 'que_hacer_si_la_policia_no_firma_la_certificacion_visa_u',
      title: { es: 'Qué Hacer si la Policía No Firma la Certificación de Visa U', en: 'What to Do If Police Won\'t Sign the U Visa Certification' },
      category: { es: 'Visa U', en: 'U Visa' },
    },
    {
      slug: 'perdon_i_192_como_arreglar_con_la_visa_u_si_tienes_deportaciones_previas',
      title: { es: 'Perdón I-192: Cómo Arreglar con Visa U si Tienes Deportaciones', en: 'I-192 Waiver: How to Fix Your Case with U Visa Despite Deportations' },
      category: { es: 'Perdón Migratorio', en: 'Immigration Waiver' },
    },
    {
      slug: 'Visa_U_y_VAWA_incluir_hijos_y_nuevos_esposos_derivados',
      title: { es: 'Visa U y VAWA: Incluir Hijos y Nuevos Esposos como Derivados', en: 'U Visa & VAWA: Including Children and New Spouses as Derivatives' },
      category: { es: 'Derivados', en: 'Derivatives' },
    },
    {
      slug: 'Frenar_deportacion_inminente_con_solicitud_de_Visa_Humanitaria',
      title: { es: 'Frenar Deportación Inminente con Solicitud de Visa Humanitaria', en: 'Stop Imminent Deportation with Humanitarian Visa Application' },
      category: { es: 'Deportación', en: 'Deportation' },
    },
  ],

  interface: {
    badge: { es: "Especialistas en Visa U", en: "U Visa Specialists" },
    heroTitle1: { es: "Visa U para", en: "U Visa for" },
    heroTitle2: { es: "Víctimas de Crímenes", en: "Crime Victims" },
    heroDescription: { es: "Protección legal, permiso de trabajo y camino a la residencia para víctimas de crímenes que cooperan con las autoridades. Más de 35 años defendiendo a nuestra comunidad.", en: "Legal protection, work authorization, and a path to residency for crime victims who cooperate with law enforcement. Over 35 years defending our community." },
    ctaConsultation: { es: "Consulta Gratuita", en: "Free Consultation" },
    ctaCall: { es: "Llame Ahora", en: "Call Now" },
    processMethod: { es: "Nuestro Proceso", en: "Our Process" },
    processTitle: { es: "Cómo Protegemos su Caso", en: "How We Protect Your Case" },
    requestEvaluation: { es: "Solicitar Evaluación", en: "Request Evaluation" },
    faqTitle: { es: "Preguntas Frecuentes sobre la Visa U", en: "Frequently Asked Questions about the U Visa" },
    faqSubtitle: { es: "Respuestas claras a las dudas más comunes de víctimas de crímenes.", en: "Clear answers to the most common questions from crime victims." },
    contactTitle: { es: "Proteja sus Derechos Hoy", en: "Protect Your Rights Today" },
    contactSubtitle: { es: "Si fue víctima de un crimen en Estados Unidos, podemos ayudarle a obtener estatus legal. La consulta es confidencial y gratuita.", en: "If you were a victim of a crime in the United States, we can help you obtain legal status. The consultation is confidential and free." },
    officesTitle: { es: "Oficinas a su Servicio", en: "Offices at Your Service" },
    officesSubtitle: { es: "Atendemos víctimas de crímenes en todo el país desde nuestras 15 oficinas.", en: "We serve crime victims nationwide from our 15 offices." },
    blogTitle: { es: "Artículos Relacionados", en: "Related Articles" },
    blogSubtitle: { es: "Guías legales escritas por nuestros abogados de Visa U.", en: "Legal guides written by our U Visa attorneys." },
    eligibilityTitle: { es: "Requisitos de Elegibilidad", en: "Eligibility Requirements" },
    eligibilitySubtitle: { es: "¿Quién Califica para la Visa U?", en: "Who Qualifies for the U Visa?" },
  }
};

export default function VisaUClient() {
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
               VISA U
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
               transition={{ duration: 1.2, ease: "easeOut" }}
               className="lg:col-span-5 relative h-[450px] md:h-[600px] lg:h-[80vh] flex items-end justify-center order-2 lg:order-1"
             >
                <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent blur-xl z-10 h-1/4 bottom-0 w-full" />
                <div className="relative z-0 w-full h-full flex items-end justify-center">
                   <Image
                     src="/Manuel_Solis.png"
                     alt={lang === 'es' ? 'Manuel Solís - Abogado experto en Visa U' : 'Manuel Solis - Expert U Visa Attorney'}
                     fill
                     className="object-contain object-bottom md:scale-105 lg:scale-110 lg:-translate-y-[280px] drop-shadow-[0_0_35px_rgba(178,144,77,0.25)]"
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
                      <Star className="w-5 h-5 text-[#B2904D] fill-[#B2904D]" />
                      <span className="text-[#B2904D] font-bold tracking-widest text-xs uppercase">
                        {lang === 'es' ? 'Experiencia' : 'Experience'}
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
                   <a href="tel:+18669795146" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/20 hover:border-[#B2904D]/50 flex items-center gap-3 group text-base backdrop-blur-sm">
                      <PhoneCall size={20} className="text-[#B2904D]" />
                      {gT(texts.interface.ctaCall)}
                   </a>
                 </motion.div>
             </div>

           </div>
        </div>
      </section>

      {/* --- ELIGIBILITY REQUIREMENTS SECTION --- */}
      <section className="py-24 relative overflow-hidden bg-[#001f5f]/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              className="h-1 bg-[#B2904D] rounded-full mb-6 mx-auto"
            />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              {gT(texts.interface.eligibilityTitle)}
            </h2>
            <p className="text-blue-100/60 text-lg max-w-2xl mx-auto font-light">
              {gT(texts.interface.eligibilitySubtitle)}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: AlertTriangle,
                title: { es: "Víctima de Crimen Calificante", en: "Victim of a Qualifying Crime" },
                desc: { es: "Debe haber sido víctima directa o indirecta de uno de los más de 25 crímenes calificantes bajo la ley, como violencia doméstica, agresión sexual, tráfico humano, secuestro, tortura, entre otros.", en: "Must have been a direct or indirect victim of one of the 25+ qualifying crimes under the law, such as domestic violence, sexual assault, human trafficking, kidnapping, torture, among others." }
              },
              {
                icon: Heart,
                title: { es: "Abuso Sustancial", en: "Substantial Abuse" },
                desc: { es: "Debe haber sufrido abuso físico o mental sustancial como resultado del crimen. Esto se documenta con registros médicos, evaluaciones psicológicas y declaraciones personales detalladas.", en: "Must have suffered substantial physical or mental abuse as a result of the crime. This is documented with medical records, psychological evaluations, and detailed personal statements." }
              },
              {
                icon: ShieldCheck,
                title: { es: "Cooperación con Autoridades", en: "Cooperation with Authorities" },
                desc: { es: "Debe haber cooperado, estar cooperando, o estar dispuesto a cooperar con la policía, la fiscalía u otra agencia de ley en la investigación o procesamiento del crimen.", en: "Must have cooperated, be cooperating, or be willing to cooperate with police, prosecutors, or other law enforcement agencies in the investigation or prosecution of the crime." }
              },
              {
                icon: Globe,
                title: { es: "Crimen en Estados Unidos", en: "Crime in the United States" },
                desc: { es: "El crimen debe haber ocurrido en Estados Unidos o haber violado leyes estadounidenses. Esto incluye crímenes en territorios de EE.UU. y en bases militares en el extranjero.", en: "The crime must have occurred in the United States or violated U.S. laws. This includes crimes in U.S. territories and on military bases abroad." }
              }
            ].map((req, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-[#001026] p-8 rounded-[2rem] border border-white/10 hover:border-[#B2904D]/50 transition-all duration-300 h-full shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B2904D]/0 to-[#B2904D]/0 group-hover:from-[#B2904D]/10 group-hover:to-transparent transition-all duration-500"></div>

                  <motion.div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#B2904D] transition-colors duration-300 shadow-inner mb-6">
                    <req.icon size={30} className="text-white/80 group-hover:text-[#001540] transition-colors" />
                  </motion.div>

                  <h3 className="font-bold text-lg text-white mb-3">{gT(req.title)}</h3>
                  <p className="text-blue-100/60 text-sm leading-relaxed">{gT(req.desc)}</p>
                </div>
              </motion.div>
            ))}
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

          {/* EXPANDED CONTENT */}
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

                {/* Content Header */}
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

                  {/* Sub Points Cards */}
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

                  {/* Solution / Extra Note */}
                  {activeTabContent.content.solution && (
                    <div className="bg-gradient-to-r from-[#B2904D]/20 to-transparent p-6 rounded-2xl border-l-4 border-[#B2904D]">
                      <p className="text-white leading-relaxed font-medium text-lg flex gap-4 items-start">
                        <BookOpen className="text-[#B2904D] shrink-0 mt-1" size={24} />
                        {gT(activeTabContent.content.solution)}
                      </p>
                    </div>
                  )}

                  {/* Internal CTA */}
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

      {/* --- PROCESS STEPS SECTION --- */}
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 relative">

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

      {/* --- OFFICES SECTION --- */}
      <section className="py-24 relative bg-[#001f5f]/30">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{gT(texts.interface.officesTitle)}</h2>
            <p className="text-blue-100/60 text-lg max-w-2xl mx-auto font-light">{gT(texts.interface.officesSubtitle)}</p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-[#B2904D] to-transparent mx-auto rounded-full mt-6"
            />
          </motion.div>

          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <MapPin size={20} className="text-[#B2904D]" />
              <span className="font-bold text-white text-lg">{texts.offices.length} {lang === 'es' ? 'oficinas' : 'offices'}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {texts.offices.map((office, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-2 text-white/70 bg-black/20 p-3 rounded-xl border border-white/10 text-sm hover:border-[#B2904D]/30 hover:text-white transition-all"
                >
                  <div className="w-1.5 h-1.5 bg-[#B2904D] rounded-full flex-shrink-0" />
                  <span className="font-medium text-xs">{office}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- RELATED BLOG ARTICLES SECTION --- */}
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
            <p className="text-blue-100/60 text-lg max-w-2xl mx-auto font-light mb-6">
              {gT(texts.interface.blogSubtitle)}
            </p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-[#B2904D] to-transparent mx-auto rounded-full"
            />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {texts.blogArticles.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link
                  href={`/${lang}/blog/${article.slug}`}
                  className="group block rounded-xl overflow-hidden border border-white/10 hover:border-[#B2904D]/30 bg-[#000a20]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(178,144,77,0.15)] h-full"
                >
                  <div className="p-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B2904D]/10 border border-[#B2904D]/20 mb-4">
                      <BookOpen size={12} className="text-[#B2904D]" />
                      <span className="text-[#B2904D] text-[10px] font-bold uppercase tracking-wider">
                        {gT(article.category)}
                      </span>
                    </div>
                    <h4 className="text-sm font-medium text-white group-hover:text-[#B2904D] transition-colors leading-snug mb-4">
                      {gT(article.title)}
                    </h4>
                    <span className="text-xs text-[#B2904D] flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                      {lang === 'es' ? 'Leer artículo' : 'Read article'} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PHONE CTA BANNER --- */}
      <section className="py-16 relative bg-gradient-to-r from-[#B2904D]/20 via-[#B2904D]/10 to-[#B2904D]/20 border-y border-[#B2904D]/20">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
              {lang === 'es' ? '¿Fue Víctima de un Crimen?' : 'Were You a Crime Victim?'}
            </h2>
            <p className="text-blue-100/70 text-lg mb-8 font-light max-w-2xl mx-auto">
              {lang === 'es'
                ? 'Llame ahora para una consulta confidencial y gratuita con nuestros abogados de Visa U.'
                : 'Call now for a free and confidential consultation with our U Visa attorneys.'}
            </p>
            <a
              href="tel:+18669795146"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#B2904D] hover:bg-[#d4af37] text-[#001540] font-black rounded-2xl transition-all shadow-[0_0_40px_rgba(178,144,77,0.3)] hover:shadow-[0_0_60px_rgba(178,144,77,0.5)] hover:-translate-y-1 text-xl group"
            >
              <PhoneCall size={24} className="group-hover:animate-pulse" />
              (866) 979-5146
            </a>
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT FORM SECTION --- */}
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
                  <p className="text-blue-100/60 font-light max-w-xl mx-auto">{gT(texts.interface.contactSubtitle)}</p>
                </div>

                <div className="contact-form-wrapper-override">
                    <ContactForm />
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Scrollbar Styles */}
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
