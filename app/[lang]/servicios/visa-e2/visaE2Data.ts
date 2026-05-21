// Visa E-2 data (enfoque b). Bilingual source + server resolvers (server-only).
import type { Language } from '../../../lib/translations';

export type IconKey = 'fileText' | 'checkCircle2' | 'shield' | 'globe' | 'messageSquare' | 'search' | 'building2' | 'send';
interface Detail { es: string; en: string; }
interface RawTab {
  id: string; title: Detail; subtitle: Detail; iconKey: IconKey;
  content: { intro: Detail; description: Detail; subTitle?: Detail; subPoints?: Detail[]; solution?: Detail };
}

const infoTabs: RawTab[] = [
  {
    id: 'general', iconKey: 'fileText',
    title: { es: '¿Qué es la Visa E-2?', en: 'What is the E-2 Visa?' },
    subtitle: { es: 'Inversionistas por Tratado', en: 'Treaty Investors' },
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
    id: 'requisitos', iconKey: 'checkCircle2',
    title: { es: 'Requisitos Clave', en: 'Key Requirements' },
    subtitle: { es: '¿Quién Califica?', en: 'Who Qualifies?' },
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
    id: 'beneficios', iconKey: 'shield',
    title: { es: 'Beneficios', en: 'Benefits' },
    subtitle: { es: 'Para ti y tu familia', en: 'For you and your family' },
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
    id: 'paises', iconKey: 'globe',
    title: { es: 'Países Tratado', en: 'Treaty Countries' },
    subtitle: { es: 'Elegibilidad por Nacionalidad', en: 'Eligibility by Nationality' },
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

const processSteps: { id: number; iconKey: IconKey; title: Detail; desc: Detail }[] = [
  { id: 1, iconKey: 'messageSquare', title: { es: 'Consulta Inicial', en: 'Initial Consultation' }, desc: { es: 'Evaluamos tu perfil, tipo de inversión y viabilidad migratoria para la Visa E2.', en: 'We evaluate your profile, investment type, and immigration viability for the E2 Visa.' } },
  { id: 2, iconKey: 'search', title: { es: 'Análisis del Proyecto', en: 'Project Analysis' }, desc: { es: 'Te orientamos sobre los requisitos que tu inversión debe cumplir según la ley migratoria.', en: 'We guide you on the requirements your investment must meet under immigration law.' } },
  { id: 3, iconKey: 'building2', title: { es: 'Estructuración Legal', en: 'Legal Structuring' }, desc: { es: 'Asesoramos en la formación de la empresa y estructura corporativa adecuada.', en: 'We advise on business formation and the appropriate corporate structure.' } },
  { id: 4, iconKey: 'fileText', title: { es: 'Plan de Negocios', en: 'Business Plan' }, desc: { es: 'El plan debe ser desarrollado por un especialista financiero. Nosotros revisamos que cumpla con los estándares migratorios.', en: 'The plan must be developed by a financial specialist. We review it to ensure it meets immigration standards.' } },
  { id: 5, iconKey: 'checkCircle2', title: { es: 'Preparación del Caso', en: 'Case Preparation' }, desc: { es: 'Preparamos y organizamos toda la documentación legal requerida para tu solicitud.', en: 'We prepare and organize all the legal documentation required for your application.' } },
  { id: 6, iconKey: 'send', title: { es: 'Presentación y Seguimiento', en: 'Submission & Follow-up' }, desc: { es: 'Gestionamos la solicitud ante USCIS o el Consulado y te preparamos para entrevista.', en: 'We manage the application with USCIS or the Consulate and prepare you for the interview.' } },
];

const faqs: { q: Detail; a: Detail }[] = [
  { q: { es: '¿Cuánto dinero necesito invertir?', en: 'How much money do I need to invest?' }, a: { es: "No hay un mínimo legal fijo, pero la inversión debe ser 'sustancial'. En la práctica, recomendamos montos a partir de $100,000 USD para tener un caso sólido, aunque montos menores pueden funcionar según el tipo de negocio.", en: "There is no fixed legal minimum, but the investment must be 'substantial'. In practice, we recommend amounts starting at $100,000 USD to have a strong case, although smaller amounts may work depending on the business type." } },
  { q: { es: '¿La Visa E-2 da Residencia (Green Card)?', en: 'Does the E-2 Visa give Residency (Green Card)?' }, a: { es: 'No directamente. Es una visa de no inmigrante. Sin embargo, puede renovarse indefinidamente y existen estrategias legales para transicionar a otras visas que sí otorgan residencia.', en: 'Not directly. It is a non-immigrant visa. However, it can be renewed indefinitely and there are legal strategies to transition to other visas that do grant residency.' } },
  { q: { es: '¿Puede trabajar mi esposa/o?', en: 'Can my spouse work?' }, a: { es: 'Sí. El cónyuge del titular obtiene un permiso de trabajo general que le permite trabajar en cualquier lugar de EE.UU. sin restricciones.', en: "Yes. The holder's spouse obtains a general work permit allowing them to work anywhere in the U.S. without restrictions." } },
  { q: { es: '¿Puedo comprar un negocio existente?', en: 'Can I buy an existing business?' }, a: { es: 'Sí, y a menudo es recomendable. Comprar un negocio con historial operativo facilita demostrar que la inversión no es marginal y que el negocio es real.', en: 'Yes, and it is often recommended. Buying a business with operational history makes it easier to demonstrate that the investment is not marginal and the business is real.' } },
];

const ui = {
  badge: { es: 'Visa de Inversionista', en: 'Investor Visa' },
  heroTitle1: { es: 'Visa E-2 para', en: 'E-2 Visa for' },
  heroTitle2: { es: 'Inversionistas', en: 'Investors' },
  heroDescription: { es: 'Tu puerta de entrada al mercado estadounidense. Asesoría legal experta para emprendedores que buscan seguridad y crecimiento en EE.UU.', en: 'Your gateway to the US market. Expert legal advice for entrepreneurs seeking security and growth in the USA.' },
  yearsExp: { es: 'Años de experiencia', en: 'Years of experience' },
  ctaConsultation: { es: 'Evaluar Elegibilidad', en: 'Evaluate Eligibility' },
  processMethod: { es: 'Nuestro Método', en: 'Our Method' },
  processTitle: { es: 'El Camino hacia tu Visa', en: 'The Path to Your Visa' },
  requestEvaluation: { es: 'Solicita tu Evaluación', en: 'Request Your Evaluation' },
  faqTitle: { es: 'Preguntas Frecuentes', en: 'Frequently Asked Questions' },
  faqSubtitle: { es: 'Resolvemos tus dudas sobre inversión y migración.', en: 'We solve your doubts about investment and migration.' },
  resourcesTitle: { es: 'Recursos Relacionados', en: 'Related Resources' },
};

export interface ResolvedTab {
  id: string; title: string; subtitle: string; iconKey: IconKey;
  content: { intro: string; description: string; subTitle?: string; subPoints?: string[]; solution?: string };
}
export type ResolvedUi = Record<keyof typeof ui, string>;

export function resolveTabs(lang: Language): ResolvedTab[] {
  return infoTabs.map((c) => ({
    id: c.id, title: c.title[lang], subtitle: c.subtitle[lang], iconKey: c.iconKey,
    content: { intro: c.content.intro[lang], description: c.content.description[lang], subTitle: c.content.subTitle?.[lang], subPoints: c.content.subPoints?.map((p) => p[lang]), solution: c.content.solution?.[lang] },
  }));
}
export function resolveSteps(lang: Language) {
  return processSteps.map((s) => ({ id: s.id, iconKey: s.iconKey, title: s.title[lang], desc: s.desc[lang] }));
}
export function resolveFaqs(lang: Language) {
  return faqs.map((f) => ({ q: f.q[lang], a: f.a[lang] }));
}
export function resolveUi(lang: Language): ResolvedUi {
  const out = {} as ResolvedUi;
  (Object.keys(ui) as (keyof typeof ui)[]).forEach((k) => { out[k] = ui[k][lang]; });
  return out;
}
