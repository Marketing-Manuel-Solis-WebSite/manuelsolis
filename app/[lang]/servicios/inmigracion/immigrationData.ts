// Shared data for the Immigration service page. No 'use client' so it can be
// imported by both the Server Component (ImmigrationClient) and the client
// island (ImmigrationCases). Plain data + a tiny bilingual helper.
import type { ElementType } from 'react';
import {
  PhoneCall,
  FileText,
  Scale,
  CheckCircle2,
  Shield,
  MessageSquare,
  HardHat,
} from 'lucide-react';
import type { Language } from '../../../lib/translations';

export interface ContentDetail { es: string; en: string; }
export interface CaseContent {
  intro: ContentDetail;
  description: ContentDetail;
  subTitle?: ContentDetail;
  subPoints?: ContentDetail[];
  solution?: ContentDetail;
}
export interface CaseItem {
  id: string;
  title: ContentDetail;
  subtitle: ContentDetail;
  icon: ElementType;
  content: CaseContent;
  offices: string[];
}

export const getText = (obj: ContentDetail | string, lang: Language): string => {
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj.es;
};

const ALL_OFFICES = [
  'Arvada (Denver)', 'Chicago', 'Dallas', 'El Paso', 'Harlingen', 'Bellaire',
  'Los Angeles', 'Houston Principal', 'Houston Accidentes', 'Houston Main St',
  'Houston NorthLoop', 'Houston NorthChase', 'Houston Kirby', 'Memphis', 'League City, TX',
];

export const mainCases: CaseItem[] = [
  {
    id: 'deportacion',
    title: { es: 'Defensa y casos urgentes; Defensa contra la Deportación y Asilo', en: 'Defense and urgent cases; Defense against Deportation and Asylum' },
    subtitle: { es: 'Asilo, Cancelación de Remoción y Fianzas', en: 'Asylum, Cancellation of Removal, and Bonds' },
    icon: Shield,
    offices: ALL_OFFICES,
    content: {
      intro: { es: '¿Está usted o un ser querido enfrentando la deportación? ¡Contáctenos inmediatamente!', en: 'Are you or a loved one facing deportation? Contact us immediately!' },
      description: { es: 'Los casos de deportación casi siempre son urgentes. Nuestro equipo experto en inmigración luchará por usted. Existen varias formas de evitar la deportación.', en: 'Deportation cases are almost always urgent. Our expert immigration team will fight for you. There are several ways to avoid deportation.' },
      subTitle: { es: 'Estrategias de Defensa Incluyen:', en: 'Defense Strategies Include:' },
      subPoints: [
        { es: 'Asilo (Persecución por raza, religión, etc.)', en: 'Asylum (Persecution based on race, religion, etc.)' },
        { es: 'Cancelación de Remoción (10 años de presencia, buen carácter, dificultad excepcional)', en: 'Cancellation of Removal (10 years presence, good moral character, exceptional hardship)' },
        { es: 'Ajuste de estatus', en: 'Adjustment of status' },
        { es: 'Liberación de detención (Fianzas por ICE o Juez)', en: 'Release from detention (Bonds by ICE or Judge)' },
      ],
      solution: { es: 'Le ayudaremos a presentar la evidencia y argumentos necesarios para la Cancelación de Remoción o a asegurar una fianza para su liberación de detención.', en: 'We will help you present the necessary evidence and arguments for Cancellation of Removal or secure a bond for your release from detention.' },
    },
  },
  {
    id: 'uvawa',
    title: { es: 'Visas Humanitarias; Visa U, Visa T, VAWA y SIJS', en: 'Humanitarian Visas; U Visa, T Visa, VAWA and SIJS' },
    subtitle: { es: 'Víctimas de Delitos y Agresión Familiar', en: 'Victims of Crimes and Family Aggression' },
    icon: MessageSquare,
    offices: ALL_OFFICES,
    content: {
      intro: { es: '¿Ha sido agredido o es víctima de un delito violento o crueldad familiar en los Estados Unidos?', en: 'Have you been assaulted or are you a victim of a violent crime or family cruelty in the United States?' },
      description: { es: 'La Visa U es para víctimas de un delito grave que cooperan con la policía. VAWA (Ley de Violencia contra Mujeres) es para víctimas de agresión o crueldad cometida por familiares (cónyuges, padres, hijos) ciudadanos o residentes permanentes.', en: 'The U Visa is for victims of a serious crime who cooperate with the police. VAWA (Violence Against Women Act) is for victims of assault or cruelty committed by family members (spouses, parents, children) who are citizens or permanent residents.' },
      subTitle: { es: 'Calificación para VAWA:', en: 'Qualification for VAWA:' },
      subPoints: [
        { es: 'Víctima de agresión o crueldad por: Cónyuge, ex cónyuge, padre o hijo de un ciudadano de los EEUU.', en: 'Victim of assault or cruelty by: Spouse, ex-spouse, parent, or child of a U.S. citizen.' },
        { es: 'Víctima de agresión o crueldad por: Cónyuge, ex cónyuge, o padre quien es residente permanente legal.', en: 'Victim of assault or cruelty by: Spouse, ex-spouse, or parent who is a lawful permanent resident.' },
      ],
      solution: { es: 'Podemos ayudarle a obtener la Residencia Permanente Legal (LPR) protegiéndole de la violencia y la amenaza de deportación, sin depender de su agresor.', en: 'We can help you obtain Lawful Permanent Residency (LPR) by protecting you from violence and the threat of deportation, without depending on your abuser.' },
    },
  },
  {
    id: 'residencia_familiar',
    title: { es: 'Residencia por un Familiar', en: 'Residency Through a Family Member' },
    subtitle: { es: 'Peticiones I-130 y Ajuste de Estatus', en: 'I-130 Petitions and Adjustment of Status' },
    icon: FileText,
    offices: ALL_OFFICES,
    content: {
      intro: { es: '¿Espera alcanzar la condición de residente legal de los EE. UU.?', en: 'Do you hope to achieve lawful permanent resident status in the U.S.?' },
      description: { es: 'Si usted tiene un familiar en los Estados Unidos que goza del estatus de Residente Permanente o es ciudadano americano, usted posiblemente califique para una Residencia Permanente.', en: 'If you have a family member in the United States who holds Permanent Resident status or is a U.S. citizen, you may qualify for Permanent Residency.' },
      subTitle: { es: 'Categorías de Familiares que Califican:', en: 'Qualifying Family Member Categories:' },
      subPoints: [
        { es: 'Residente Permanente pide a: Cónyuge, Hijos solteros menores de 21 años.', en: 'Permanent Resident petitions for: Spouse, Unmarried children under 21.' },
        { es: 'Ciudadano Americano pide a: Cónyuge, Hijos y familia, Padres, Hermanos y familia.', en: 'U.S. Citizen petitions for: Spouse, Children and family, Parents, Siblings and family.' },
      ],
      solution: { es: 'Guiaremos a su familiar patrocinador en el proceso de Petición Familiar (I-130) y el subsiguiente Ajuste de Estatus para obtener su Green Card.', en: 'We will guide your sponsoring family member through the Family Petition process (I-130) and the subsequent Adjustment of Status to obtain your Green Card.' },
    },
  },
  {
    id: 'residencia_empleador',
    title: { es: 'Residencia por Empleo', en: 'Employment-Based Residency' },
    subtitle: { es: 'Peticiones Basadas en Empleo (Green Card)', en: 'Employment-Based Petitions (Green Card)' },
    icon: HardHat,
    offices: ALL_OFFICES,
    content: {
      intro: { es: '¿Desea convertirse en residente legal de los EE. UU. a través de su trabajo?', en: 'Do you wish to become a lawful permanent resident of the U.S. through your job?' },
      description: { es: 'Si usted entró legalmente a los Estados Unidos y su permiso aún está vigente, o usted sometió alguna petición antes de 4/30/2001 y su patrón está dispuesto a ayudarlo, tiene posibilidades de arreglar su residencia.', en: 'If you entered the United States legally and your permit is still valid, or you filed a petition before 4/30/2001 and your employer is willing to help you, you have possibilities to arrange your residency.' },
      solution: { es: 'Nuestro equipo le ayudará a navegar los complejos procesos de certificación laboral y peticiones I-140 para asegurar su futuro en el país. Esto aplica incluso si usted está en su país de origen y una empresa Estadounidense lo patrocina.', en: 'Our team will help you navigate the complex labor certification processes and I-140 petitions to secure your future in the country. This applies even if you are in your home country and an American company sponsors you.' },
    },
  },
  {
    id: 'naturalizacion',
    title: { es: 'Naturalización', en: 'Naturalization' },
    subtitle: { es: 'Conviértete en Ciudadano Estadounidense', en: 'Become a U.S. Citizen' },
    icon: CheckCircle2,
    offices: ALL_OFFICES,
    content: {
      intro: { es: '¿Desea convertirse en ciudadano estadounidense?', en: 'Do you want to become a U.S. citizen?' },
      description: { es: '¿Por qué permanecer con la residencia legal si puede llegar a ser un ciudadano estadounidense y disfrutar de todos los derechos que corresponden? La naturalización es el paso final hacia la plena ciudadanía.', en: 'Why remain with legal residency if you can become a U.S. citizen and enjoy all the corresponding rights? Naturalization is the final step towards full citizenship.' },
      subTitle: { es: 'Maneras Comunes de Calificar:', en: 'Common Ways to Qualify:' },
      subPoints: [
        { es: 'Residencia Permanente por al menos 5 años.', en: 'Permanent residency for at least 5 years.' },
        { es: 'Residencia permanente como cónyuge de un ciudadano de los EEUU.', en: 'Permanent residency as the spouse of a U.S. citizen.' },
        { es: 'Calificar sirviendo en las fuerzas armadas de los EEUU.', en: 'Qualify by serving in the U.S. armed forces.' },
        { es: 'Naturalización para hijos de ciudadanos (Cumpliendo requisitos).', en: 'Naturalization for children of citizens (Meeting requirements).' },
        { es: 'Requisito: Pasar un examen de ciudadanía en inglés.', en: 'Requirement: Pass a citizenship test in English.' },
      ],
      solution: { es: 'Lo guiaremos en el proceso de solicitud, la preparación para el examen de ciudadanía y la entrevista final para que obtenga su pasaporte americano.', en: 'We will guide you through the application process, preparation for the citizenship test, and the final interview so that you obtain your American passport.' },
    },
  },
];

export const processSteps = [
  { id: 1, title: { es: 'Contacto', en: 'Contact' }, icon: PhoneCall, desc: { es: 'Llámanos para iniciar tu evaluación legal.', en: 'Call us to start your legal evaluation.' } },
  { id: 2, title: { es: 'Análisis', en: 'Analysis' }, icon: FileText, desc: { es: 'Revisamos tu historial migratorio y evidencia.', en: 'We review your immigration history and evidence.' } },
  { id: 3, title: { es: 'Estrategia', en: 'Strategy' }, icon: Scale, desc: { es: 'Diseñamos la ruta legal para tu objetivo.', en: 'We design the legal route for your goal.' } },
  { id: 4, title: { es: 'Resultados', en: 'Results' }, icon: CheckCircle2, desc: { es: 'Te acompañamos hasta alcanzar tu estatus migratorio.', en: 'We accompany you until you achieve your immigration status.' } },
];

export const ui = {
  badge: { es: 'Especialistas en Inmigración', en: 'Immigration Specialists' },
  title1: { es: 'Abogados de Inmigración', en: 'Immigration Attorneys' },
  title2: { es: 'Expertos en EE.UU.', en: 'U.S. Experts' },
  heroDescription: { es: 'Representación experta en todos los aspectos de ley de inmigración para proteger su futuro en Estados Unidos. Deportación, Visas y Ciudadanía.', en: 'Expert representation in all aspects of immigration law to protect your future in the United States. Deportation, Visas, and Citizenship.' },
  stats: { es: 'Familias Unidas', en: 'Families Reunited' },
  casesTitle: { es: 'Soluciones Legales en Inmigración', en: 'Legal Solutions in Immigration' },
  ctaConsultation: { es: 'Consulta Ahora', en: 'Consult Now' },
  specialties: { es: 'Nuestras Especialidades', en: 'Our Specialties' },
  details: { es: 'Ver Detalles', en: 'View Details' },
  callNow: { es: 'Llámanos Ahora Mismo', en: 'Call Us Right Now' },
  processMethod: { es: 'Nuestro Método Legal', en: 'Our Legal Method' },
  processTitle: { es: 'Tu Ruta Hacia el Estatus Legal', en: 'Your Path to Legal Status' },
  requestEvaluation: { es: 'Solicitar Evaluación de Caso', en: 'Request Case Evaluation' },
  availableOffices: { es: 'Oficinas Disponibles', en: 'Available Offices' },
  officesCount: { es: 'oficinas', en: 'offices' },
} as const;
