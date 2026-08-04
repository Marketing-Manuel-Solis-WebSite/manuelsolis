// Shared data for the Accidents service page. No 'use client' — importable by
// both the Server Component and the client islands. Plain data + bilingual helper.
import type { ElementType } from 'react';
import { PhoneCall, FileText, Scale, HandCoins, Car, Truck, Stethoscope, Zap, HardHat } from 'lucide-react';
import type { Language } from '../../../lib/translations';

export interface ContentDetail { es: string; en: string; }
export interface CaseContent {
  intro: ContentDetail;
  description: ContentDetail;
  subTitle?: ContentDetail;
  subPoints?: ContentDetail[];
  solution?: ContentDetail;
  extraInfo?: ContentDetail;
  quotes?: { text: ContentDetail; context: ContentDetail }[];
  offerAlert?: ContentDetail;
  benefitsTitle?: ContentDetail;
  benefits?: ContentDetail[];
  closing?: ContentDetail;
}
export interface CaseItem {
  id: string;
  title: ContentDetail;
  subtitle: ContentDetail;
  icon: ElementType;
  content: CaseContent;
  offices: string[];
}

export const getText = (obj: ContentDetail | string | undefined, lang: Language): string => {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj.es;
};

const ALL_OFFICES = [
  'Arvada (Denver)', 'Chicago', 'Dallas', 'El Paso', 'Harlingen', 'Bellaire',
  'Los Angeles', 'Houston Principal', 'Houston Accidentes', 'Houston Main St',
  'Houston NorthLoop', 'Houston NorthChase', 'Houston Kirby', 'Memphis', 'League City, TX',
];

export const allServices: CaseItem[] = [
  {
    id: 'auto',
    title: { es: 'Accidentes Automovilísticos', en: 'Car Accidents' },
    subtitle: { es: 'Colisiones y Lesiones Graves', en: 'Collisions and Serious Injuries' },
    icon: Car,
    offices: ALL_OFFICES,
    content: {
      intro: { es: '¿Herido y buscando compensación por un accidente de vehículo?', en: 'Injured and seeking compensation after a vehicle accident?' },
      description: { es: 'Las lesiones causadas por una colisión pueden no mostrarse o sentirse durante días, o pueden ser obvias y requerir atención médica inmediata. Las lesiones, como las de la cabeza y, sobretodo, el cerebro, pueden causar sufrimiento de por vida. Incluso después de sanar físicamente, puedes experimentar un trauma emocional y ansiedad que pueden seguirte durante años.', en: 'Injuries caused by a collision may not show or be felt for days, or they may be obvious and require immediate medical attention. Injuries, such as those to the head and, especially, the brain, can cause lifelong suffering. Even after physically healing, you may experience emotional trauma and anxiety that can follow you for years.' },
      solution: { es: 'En las Oficinas del Abogado Manuel Solís, le podemos ayudar a negociar con la compañía de seguros, encargando estudios médicos y pruebas independientes que permitan conocer los daños reales, tanto los actuales como los que puedan hacerse evidentes en el futuro, fruto de las lesiones sufridas durante el accidente.', en: 'At the Law Offices of Attorney Manuel Solís, we can help you negotiate with the insurance company, commissioning independent medical studies and tests that allow you to know the real damages, both current and those that may become evident in the future, resulting from the injuries suffered during the accident.' },
    },
  },
  {
    id: 'trailer',
    title: { es: 'Accidentes de 18 Ruedas', en: '18-Wheeler Accidents' },
    subtitle: { es: 'Tráilers y Vehículos Comerciales', en: 'Tractor-Trailers and Commercial Vehicles' },
    icon: Truck,
    offices: ALL_OFFICES,
    content: {
      intro: { es: '¿Ha quedado usted o un miembro de su familia herido en un accidente con un camión de 18 ruedas?', en: 'Have you or a family member been injured in an 18-wheeler accident?' },
      description: { es: 'Es posible que tenga derecho a una indemnización significativa. Usted no debe verse destinado a un futuro de dolor, sufrimiento y deudas a causa de un accidente. Es un hecho que la calidad de su vida de ahora en adelante se verá afectada significativamente por la cantidad de indemnización que reciba.', en: 'You may be entitled to significant compensation. You should not be destined to a future of pain, suffering, and debt because of an accident. It is a fact that the quality of your life from now on will be significantly affected by the amount of compensation you receive.' },
      extraInfo: { es: 'Podemos ayudar a descubrir las razones detrás del accidente para que usted pueda tener algo de resolución y seguir adelante.', en: 'We can help uncover the reasons behind the accident so you can have some resolution and move forward.' },
      quotes: [
        {
          text: { es: 'Su abuelo todavía les compra regalos de Navidad.', en: 'Their grandfather still buys them Christmas gifts.' },
          context: { es: 'Ella perdió a su papá. Ayudamos a su familia a conseguir una indemnización. Todos los años usan parte del dinero para comprar regalos a los nietos.', en: 'She lost her father. We helped her family get compensation. Every year they use part of the money to buy gifts for the grandchildren.' },
        },
      ],
      offerAlert: { es: 'Si ya ha recibido una oferta, llámenos. No es raro recibir ofertas de 10x o 20x más cuando nos contrata.', en: 'If you have already received an offer, call us. It is not uncommon to receive offers 10x or 20x more when you hire us.' },
    },
  },
  {
    id: 'medica',
    title: { es: 'Negligencia Médica', en: 'Medical Malpractice' },
    subtitle: { es: 'Errores Médicos y Farmacéuticos', en: 'Medical and Pharmaceutical Errors' },
    icon: Stethoscope,
    offices: ALL_OFFICES,
    content: {
      intro: { es: '¿Herido por negligencia médica o por un producto farmacéutico?', en: 'Injured due to medical malpractice or a pharmaceutical product?' },
      description: { es: 'A veces, una mala experiencia debida a una enfermedad o un accidente puede ser aun peor si no recibimos un trato profesional por parte del médico o el hospital que supuestamente debe ayudarnos. Podría ser que incluso usted sospeche que el fallecimiento de un ser querido posiblemente se deba a una mala decisión.', en: 'Sometimes, a bad experience due to illness or accident can be even worse if we do not receive professional treatment from the doctor or hospital that is supposed to help us. You might even suspect that the death of a loved one is possibly due to a bad decision.' },
      solution: { es: 'Si usted cree que usted o un ser querido no ha recibido un trato profesional y ha sufrido daños, podemos estudiar su caso para saber si tiene derecho a reclamar una indemnización por su sufrimiento.', en: 'If you believe that you or a loved one has not received professional treatment and has suffered damages, we can study your case to find out if you are entitled to claim compensation for your suffering.' },
    },
  },
  {
    id: 'explosion',
    title: { es: 'Explosión de Plantas', en: 'Plant Explosions' },
    subtitle: { es: 'Industriales y Refinerías', en: 'Industrial and Refinery' },
    icon: Zap,
    offices: ALL_OFFICES,
    content: {
      intro: { es: 'Es posible que tenga derecho a una indemnización significativa.', en: 'You may be entitled to significant compensation.' },
      description: { es: 'Las explosiones de plantas parecen estar ocurriendo con demasiada frecuencia en estos días. Las explosiones pueden ser causadas por muchos factores, por lo que es necesario realizar una investigación exhaustiva para determinar la causa.', en: 'Plant explosions seem to be occurring too often these days. Explosions can be caused by many factors, so a thorough investigation is necessary to determine the cause.' },
      solution: { es: 'Nuestro equipo de abogados con experiencia puede ayudar a investigar y ayudar a los heridos a comprender lo que sucedió y buscar justicia por sus lesiones.', en: 'Our team of experienced attorneys can help investigate and assist the injured in understanding what happened and seeking justice for their injuries.' },
    },
  },
  {
    id: 'trabajo',
    title: { es: 'Lesiones y Accidentes en el Trabajo', en: 'Work Injuries and Accidents' },
    subtitle: { es: 'Construcción, Fábricas y Más', en: 'Construction, Factories, and More' },
    icon: HardHat,
    offices: ALL_OFFICES,
    content: {
      intro: { es: '¿Sufriste una lesión o accidente en tu trabajo?', en: 'Did you suffer an injury or accident at work?' },
      description: { es: 'Ayudamos a trabajadores que se esfuerzan cada día. Miles de inmigrantes realizan trabajos físicos y lamentablemente sufren accidentes. Creemos que nadie debe enfrentar esto solo.', en: 'We help workers who strive every day. Thousands of immigrants perform physical work and unfortunately suffer accidents. We believe no one should face this alone.' },
      subTitle: { es: 'Atendemos reclamos por:', en: 'We handle claims for:' },
      subPoints: [
        { es: 'Lesiones en construcción o demolición', en: 'Construction or demolition injuries' },
        { es: 'Caídas o golpes durante el trabajo', en: 'Falls or blows during work' },
        { es: 'Uso de maquinaria o herramientas defectuosas', en: 'Use of defective machinery or tools' },
        { es: 'Lesiones de espalda, hombro o rodillas', en: 'Back, shoulder, or knee injuries' },
        { es: 'Accidentes en fábricas o bodegas', en: 'Accidents in factories or warehouses' },
        { es: 'Falta de equipo o medidas de seguridad', en: 'Lack of safety equipment or measures' },
      ],
      benefitsTitle: { es: 'Beneficios de una Compensación:', en: 'Compensation Benefits:' },
      benefits: [
        { es: 'Cubrir tratamientos y rehabilitación', en: 'Cover treatments and rehabilitation' },
        { es: 'Recuperar ingresos perdidos', en: 'Recover lost wages' },
        { es: 'Recibir apoyo si no puedes trabajar', en: 'Receive support if you cannot work' },
        { es: 'Mantener estabilidad económica para tu familia', en: 'Maintain economic stability for your family' },
      ],
      closing: { es: 'No es un favor, es tu derecho. No importa tu estatus migratorio.', en: "It's not a favor, it's your right. Regardless of your immigration status." },
    },
  },
];

export const processSteps = [
  { id: 1, title: { es: 'Contacto', en: 'Contact' }, icon: PhoneCall, desc: { es: 'Llámanos y obtén orientación legal.', en: 'Call us and get legal guidance.' } },
  { id: 2, title: { es: 'Análisis', en: 'Analysis' }, icon: FileText, desc: { es: 'Analizamos tu caso y revisamos la evidencia.', en: 'We analyze your case and review the evidence.' } },
  { id: 3, title: { es: 'Negociación', en: 'Negotiation' }, icon: Scale, desc: { es: 'Negociamos duramente con la aseguradora o empleador.', en: 'We negotiate hard with the insurer or employer.' } },
  { id: 4, title: { es: 'Resultados', en: 'Results' }, icon: HandCoins, desc: { es: 'Te acompañamos hasta que recibas tu compensación.', en: 'We accompany you until you receive your compensation.' } },
];

export const ui = {
  badge: { es: 'Representación Legal Especializada', en: 'Specialized Legal Representation' },
  heroTitle1: { es: 'Protegiendo su', en: 'Protecting Your' },
  heroTitle2: { es: 'Compensación', en: 'Compensation' },
  heroDescription: { es: 'Si sufrió un accidente en el trabajo o carretera, luchamos para que reciba la indemnización máxima sin importar su estatus migratorio.', en: 'If you suffered an accident at work or on the road, we fight for you to receive maximum compensation regardless of your immigration status.' },
  stats: { es: 'Compensación Recuperada', en: 'Compensation Recovered' },
  casesTitle: { es: 'Soluciones en Accidentes', en: 'Solutions in Accidents' },
  casesSubtitle: { es: 'Todos nuestros servicios están disponibles para proteger tus derechos', en: 'All our services are available to protect your rights' },
  ctaConsultation: { es: 'Consulta Ahora', en: 'Consult Now' },
  videoSectionBadge: { es: 'Conoce a Nuestro Equipo', en: 'Meet Our Team' },
  videoSectionTitle: { es: 'Abogado', en: 'Attorney' },
  videoSectionSubtitle: { es: 'Escucha directamente de nuestros socios cómo protegemos tus derechos con experiencia y dedicación.', en: 'Hear directly from our partners how we protect your rights with expertise and dedication.' },
  callNow: { es: 'Llámanos Ahora Mismo', en: 'Call Us Right Now' },
  processMethod: { es: 'Nuestro Método', en: 'Our Method' },
  processTitle: { es: 'Cómo Funciona el Proceso', en: 'How the Process Works' },
  requestEvaluation: { es: 'Solicitar Evaluación', en: 'Request Evaluation' },
  videoAlt: { es: 'Video explicativo sobre la dedicación del equipo legal.', en: "Explanation video about the legal team's dedication." },
  videoUnsupported: { es: 'Este video usa formato HLS y tu navegador no puede reproducirlo. Ábrelo en Safari (Mac o iPhone) para verlo.', en: 'This video uses the HLS format and your browser cannot play it. Open this page in Safari (Mac or iPhone) to watch it.' },
  specialties: { es: 'Nuestras Especialidades', en: 'Our Specialties' },
  availableOffices: { es: 'Oficinas Disponibles', en: 'Available Offices' },
  officesCount: { es: 'oficinas', en: 'offices' },
} as const;
