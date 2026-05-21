// Family Law data (enfoque b) — bilingual source + server resolvers; imported
// only by the Server Component so bilingual text stays out of the client bundle.
import type { Language } from '../../../lib/translations';

export type IconKey = 'fileText' | 'messageSquare' | 'handCoins' | 'phoneCall' | 'scale';
interface Detail { es: string; en: string; }
interface RawCase {
  id: string; title: Detail; subtitle: Detail; iconKey: IconKey; offices: string[];
  content: { intro: Detail; description: Detail; subTitle?: Detail; subPoints?: Detail[]; solution?: Detail };
}

const OFFICES = ['Chicago', 'Memphis'];

const mainCases: RawCase[] = [
  {
    id: 'divorcio', iconKey: 'fileText', offices: OFFICES,
    title: { es: 'Divorcio', en: 'Divorce' },
    subtitle: { es: 'Separación Legal y Acuerdos Mutuos', en: 'Legal Separation and Mutual Agreements' },
    content: {
      intro: { es: '¿Necesita un buen abogado de divorcio?', en: 'Do you need a good divorce attorney?' },
      description: { es: 'Un matrimonio es un contrato legalmente establecido entre dos personas que debe resolverse de manera adecuada para proteger sus intereses futuros. Es recomendable acudir a un abogado para que le ayude a tomar las mejores decisiones.', en: 'A marriage is a legally established contract between two people that must be properly resolved to protect your future interests. It is advisable to go to an attorney to help you make the best decisions.' },
      solution: { es: 'Le podemos ayudar a preparar y entregar los documentos necesarios para un acuerdo de divorcio. Si fuera necesario, le representaremos en la corte ante un posible litigio para proteger sus derechos.', en: 'We can help you prepare and submit the necessary documents for a divorce settlement. If necessary, we will represent you in court before possible litigation to protect your rights.' },
    },
  },
  {
    id: 'custodia', iconKey: 'messageSquare', offices: OFFICES,
    title: { es: 'Custodia de los Hijos', en: 'Child Custody' },
    subtitle: { es: 'Disputas, Visitas y Bienestar Infantil', en: 'Disputes, Visitation, and Child Welfare' },
    content: {
      intro: { es: 'Permítanos apoyarle en las disputas por la custodia de sus hijos.', en: 'Allow us to support you in child custody disputes.' },
      description: { es: 'Los niños son, indudablemente, los más perjudicados en la separación de sus padres. Es crucial que los abogados negocien en su nombre desde un punto de vista técnico y no emocional para lograr la mejor resolución.', en: 'Children are undoubtedly the most affected by the separation of their parents. It is crucial that attorneys negotiate on your behalf from a technical rather than emotional point of view to achieve the best resolution.' },
      subTitle: { es: 'Nuestra Defensa Incluye:', en: 'Our Defense Includes:' },
      subPoints: [
        { es: 'Defenderle en un caso de custodia.', en: 'Defend you in a custody case.' },
        { es: 'Negociar la manutención y las visitas.', en: 'Negotiate child support and visitation.' },
        { es: 'Representarle en corte si no es posible llegar a un acuerdo.', en: 'Represent you in court if an agreement is not possible.' },
      ],
      solution: { es: 'Contamos con abogados preparados para defender sus intereses y el de sus hijos, buscando la mejor solución para la estabilidad familiar.', en: 'We have attorneys prepared to defend your interests and those of your children, seeking the best solution for family stability.' },
    },
  },
  {
    id: 'manutencion', iconKey: 'handCoins', offices: OFFICES,
    title: { es: 'Manutención de los Hijos', en: 'Child Support' },
    subtitle: { es: 'Cálculo y Cumplimiento de Pagos', en: 'Calculation and Enforcement of Payments' },
    content: {
      intro: { es: 'La manutención infantil es un aspecto clave del derecho de familia.', en: 'Child support is a key aspect of family law.' },
      description: { es: 'Los padres tienen el deber de mantener a sus hijos. La manutención les ayuda económicamente, asegurándose de que los niños tengan ropa en la espalda y comida en la mesa. La cantidad se calcula sobre la base de los recursos netos del padre.', en: "Parents have a duty to support their children. Support helps them financially, ensuring that children have clothes on their backs and food on the table. The amount is calculated based on the father's net resources." },
      subTitle: { es: 'Cómo se Calcula la Manutención (Base General):', en: 'How Child Support is Calculated (General Basis):' },
      subPoints: [
        { es: 'Se calcula a partir de los recursos netos (ingresos menos impuestos esenciales y gastos de seguro médico).', en: 'It is calculated based on net resources (income minus essential taxes and health insurance expenses).' },
        { es: 'La base es el 20% del ingreso neto mensual.', en: 'The base is 20% of the net monthly income.' },
        { es: 'Se agrega el 5% por cada hijo adicional.', en: '5% is added for each additional child.' },
        { es: 'Puede embargarse del salario, ofreciendo tranquilidad a ambas partes.', en: 'It can be garnished from salary, offering peace of mind to both parties.' },
      ],
      solution: { es: 'Le asistimos en el cálculo preciso y la ejecución de la orden judicial de manutención, asegurando la estabilidad económica de sus hijos.', en: 'We assist you with the accurate calculation and enforcement of the judicial support order, ensuring the economic stability of your children.' },
    },
  },
];

const processSteps: { id: number; iconKey: IconKey; title: Detail; desc: Detail }[] = [
  { id: 1, iconKey: 'phoneCall', title: { es: 'Consulta Privada', en: 'Private Consultation' }, desc: { es: 'Evaluamos su situación personal y sus objetivos familiares.', en: 'We evaluate your personal situation and family goals.' } },
  { id: 2, iconKey: 'fileText', title: { es: 'Estrategia y Documentación', en: 'Strategy & Documentation' }, desc: { es: 'Recopilamos pruebas, ingresos y preparamos los documentos legales.', en: 'We gather evidence, income statements, and prepare the legal documents.' } },
  { id: 3, iconKey: 'messageSquare', title: { es: 'Negociación / Mediación', en: 'Negotiation / Mediation' }, desc: { es: 'Buscamos un acuerdo amistoso fuera de la corte para reducir el impacto emocional.', en: 'We seek an amicable out-of-court settlement to reduce emotional impact.' } },
  { id: 4, iconKey: 'scale', title: { es: 'Representación en Corte', en: 'Court Representation' }, desc: { es: 'Lo representamos si es necesario litigar para defender sus derechos.', en: 'We represent you if litigation is necessary to defend your rights.' } },
];

const ui = {
  badge: { es: 'Protección Familiar y Patrimonial', en: 'Family and Patrimonial Protection' },
  heroTitle1: { es: 'Expertos en', en: 'Experts in' },
  heroTitle2: { es: 'Derecho Familiar', en: 'Family Law' },
  heroDescription: { es: 'Protegemos sus derechos y el bienestar de sus hijos durante transiciones difíciles.', en: 'We protect your rights and the well-being of your children during difficult transitions.' },
  stats: { es: 'Familias Apoyadas', en: 'Families Supported' },
  casesTitle: { es: 'Soluciones Legales en Ley familiar', en: 'Solutions in Family Law' },
  ctaConsultation: { es: 'Consulta Ahora', en: 'Consult Now' },
  specialties: { es: 'Nuestras Especialidades', en: 'Our Specialties' },
  callNow: { es: 'Llámanos Ahora Mismo', en: 'Call Us Right Now' },
  processMethod: { es: 'Nuestro Método', en: 'Our Method' },
  processTitle: { es: 'El Proceso para su Resolución Familiar', en: 'The Process for Your Family Resolution' },
  requestEvaluation: { es: 'Solicitar Consulta', en: 'Request Consultation' },
  availableOffices: { es: 'Oficinas Disponibles', en: 'Available Offices' },
  officesCount: { es: 'oficinas', en: 'offices' },
};

export interface ResolvedCase {
  id: string; title: string; subtitle: string; iconKey: IconKey; offices: string[];
  content: { intro: string; description: string; subTitle?: string; subPoints?: string[]; solution?: string };
}
export type ResolvedUi = Record<keyof typeof ui, string>;

export function resolveCases(lang: Language): ResolvedCase[] {
  return mainCases.map((c) => ({
    id: c.id, title: c.title[lang], subtitle: c.subtitle[lang], iconKey: c.iconKey, offices: c.offices,
    content: { intro: c.content.intro[lang], description: c.content.description[lang], subTitle: c.content.subTitle?.[lang], subPoints: c.content.subPoints?.map((p) => p[lang]), solution: c.content.solution?.[lang] },
  }));
}
export function resolveSteps(lang: Language) {
  return processSteps.map((s) => ({ id: s.id, iconKey: s.iconKey, title: s.title[lang], desc: s.desc[lang] }));
}
export function resolveUi(lang: Language): ResolvedUi {
  const out = {} as ResolvedUi;
  (Object.keys(ui) as (keyof typeof ui)[]).forEach((k) => { out[k] = ui[k][lang]; });
  return out;
}
