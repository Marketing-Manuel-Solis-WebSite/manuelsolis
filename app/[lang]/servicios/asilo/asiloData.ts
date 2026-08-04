// Asylum data (enfoque b). Bilingual source + server resolvers (server-only).
import type { Language } from '../../../lib/translations';

export type TabIconKey = 'shield' | 'scale' | 'flag' | 'alertTriangle' | 'shieldCheck';
export type StepIconKey = 'search' | 'fileText' | 'send' | 'shield';
interface Detail { es: string; en: string; }
interface RawTab {
  id: string; title: Detail; subtitle: Detail; iconKey: TabIconKey;
  content: { intro: Detail; description: Detail; subTitle?: Detail; subPoints?: Detail[]; solution?: Detail };
}

const officesList = [
  { name: 'Houston Principal', slug: 'houston-principal' }, { name: 'Houston Bellaire', slug: 'houston-bellaire' },
  { name: 'Houston Accidentes', slug: 'houston-accidentes' }, { name: 'Northchase', slug: 'northchase' },
  { name: 'North Loop', slug: 'north-loop' }, { name: 'Main St', slug: 'main-st' }, { name: 'Kirby', slug: 'kirby' },
  { name: 'League City', slug: 'league-city' }, { name: 'Dallas', slug: 'dallas' }, { name: 'El Paso', slug: 'el-paso' },
  { name: 'Harlingen', slug: 'harlingen' }, { name: 'Los Angeles', slug: 'losangeles' }, { name: 'Chicago', slug: 'chicago' },
  { name: 'Arvada (Denver)', slug: 'arvada' }, { name: 'Memphis', slug: 'memphis' },
];

const infoTabs: RawTab[] = [
  {
    id: 'que-es-asilo', iconKey: 'shield',
    title: { es: '¿Qué es el Asilo?', en: 'What is Asylum?' },
    subtitle: { es: 'Protección para perseguidos', en: 'Protection for the Persecuted' },
    content: {
      intro: { es: 'Tu derecho a buscar protección en Estados Unidos', en: 'Your right to seek protection in the United States' },
      description: { es: 'El asilo es una forma de protección internacional que permite a personas que huyen de persecución en sus países de origen solicitar permiso para vivir en Estados Unidos. Para calificar, debes demostrar que has sufrido persecución o tienes un temor fundado de persecución basado en al menos uno de cinco motivos protegidos por la ley: raza, religión, nacionalidad, opinión política o pertenencia a un grupo social determinado. El asilo puede solicitarse de forma afirmativa (ante USCIS) o de forma defensiva (ante un juez de inmigración durante procedimientos de deportación). Si se aprueba, el asilado recibe autorización de trabajo, puede solicitar a ciertos familiares y, después de un año, puede solicitar la residencia permanente.', en: 'Asylum is a form of international protection that allows people fleeing persecution in their home countries to request permission to live in the United States. To qualify, you must demonstrate that you have suffered persecution or have a well-founded fear of persecution based on at least one of five grounds protected by law: race, religion, nationality, political opinion, or membership in a particular social group. Asylum can be requested affirmatively (with USCIS) or defensively (before an immigration judge during deportation proceedings). If approved, the asylee receives work authorization, can petition for certain family members, and after one year can apply for permanent residency.' },
      subTitle: { es: 'Los Cinco Motivos Protegidos:', en: 'The Five Protected Grounds:' },
      subPoints: [
        { es: 'Raza: Persecución por origen étnico o racial.', en: 'Race: Persecution based on ethnic or racial origin.' },
        { es: 'Religión: Persecución por creencias religiosas o prácticas de fe.', en: 'Religion: Persecution based on religious beliefs or faith practices.' },
        { es: 'Nacionalidad: Persecución por país de origen o grupo étnico.', en: 'Nationality: Persecution based on country of origin or ethnic group.' },
        { es: 'Opinión Política: Persecución por opiniones políticas reales o imputadas.', en: 'Political Opinion: Persecution based on actual or imputed political opinions.' },
        { es: 'Grupo Social: Persecución por pertenecer a un grupo social específico (género, orientación sexual, familia, etc.).', en: 'Particular Social Group: Persecution based on membership in a specific social group (gender, sexual orientation, family, etc.).' },
      ],
      solution: { es: 'El asilo es una de las protecciones más fundamentales del derecho internacional. Nuestros abogados evalúan tu caso, identifican las mejores bases legales y te representan en cada paso.', en: 'Asylum is one of the most fundamental protections in international law. Our attorneys evaluate your case, identify the strongest legal grounds, and represent you every step of the way.' },
    },
  },
  {
    id: 'afirmativo-defensivo', iconKey: 'scale',
    title: { es: 'Asilo Afirmativo vs Defensivo', en: 'Affirmative vs Defensive Asylum' },
    subtitle: { es: 'Dos caminos, un objetivo', en: 'Two paths, one goal' },
    content: {
      intro: { es: 'Entiende las dos formas de solicitar asilo', en: 'Understand the two ways to apply for asylum' },
      description: { es: 'El asilo afirmativo se solicita directamente ante USCIS presentando el Formulario I-589 dentro del primer año de tu llegada a Estados Unidos. Un oficial de asilo conducirá una entrevista privada donde evaluará tu caso. Si no se aprueba, el caso se refiere a un juez de inmigración para procedimientos de deportación, donde puedes renovar tu solicitud como asilo defensivo. El asilo defensivo se presenta como defensa ante un juez de inmigración cuando ya estás en procedimientos de deportación. Es el mismo formulario I-589, pero el proceso ocurre en la corte de inmigración con un juez que decide si calificas.', en: 'Affirmative asylum is requested directly from USCIS by filing Form I-589 within the first year of your arrival in the United States. An asylum officer will conduct a private interview to evaluate your case. If not approved, the case is referred to an immigration judge for removal proceedings, where you can renew your application as defensive asylum. Defensive asylum is filed as a defense before an immigration judge when you are already in removal proceedings. It is the same Form I-589, but the process occurs in immigration court where a judge decides if you qualify.' },
      subPoints: [
        { es: 'Afirmativo: Presentas el I-589 ante USCIS. Entrevista con oficial de asilo. No adversarial.', en: 'Affirmative: File I-589 with USCIS. Interview with asylum officer. Non-adversarial.' },
        { es: 'Defensivo: Presentas el I-589 en corte de inmigración. Audiencia ante juez. El gobierno es parte contraria.', en: 'Defensive: File I-589 in immigration court. Hearing before a judge. The government is the opposing party.' },
        { es: 'Plazo de 1 año: En general, debes solicitar asilo dentro del primer año de tu llegada. Existen excepciones por circunstancias extraordinarias o cambio de condiciones en tu país.', en: 'One-year deadline: Generally, you must apply for asylum within one year of arrival. Exceptions exist for extraordinary circumstances or changed country conditions.' },
        { es: 'Mismo formulario: Tanto el asilo afirmativo como el defensivo usan el Formulario I-589.', en: 'Same form: Both affirmative and defensive asylum use Form I-589.' },
      ],
    },
  },
  {
    id: 'puerto-entrada', iconKey: 'flag',
    title: { es: 'Puerto de Entrada vs Cruce', en: 'Port of Entry vs Crossing' },
    subtitle: { es: 'Implicaciones legales', en: 'Legal implications' },
    content: {
      intro: { es: 'Cómo llegas a EE.UU. afecta tu caso de asilo', en: 'How you arrive in the U.S. affects your asylum case' },
      description: { es: 'Presentarse en un puerto de entrada oficial y solicitar protección es una forma legal de iniciar el proceso de asilo. Si cruzas sin autorización y eres detenido por la Patrulla Fronteriza, aún puedes solicitar asilo, pero el proceso puede ser diferente. En muchos casos, quienes cruzan sin inspección son puestos en remoción expedita y deben pasar una entrevista de miedo creíble antes de poder presentar su caso ante un juez. La forma de entrada no elimina tu derecho al asilo, pero sí puede afectar el procedimiento que enfrentarás.', en: 'Presenting yourself at an official port of entry and requesting protection is a legal way to begin the asylum process. If you cross without authorization and are detained by Border Patrol, you can still apply for asylum, but the process may be different. In many cases, those who cross without inspection are placed in expedited removal and must pass a credible fear interview before presenting their case to a judge. How you enter does not eliminate your right to asylum, but it can affect the procedure you will face.' },
      subPoints: [
        { es: 'Puerto de entrada: Puedes solicitar protección directamente. Puedes ser referido a entrevista de miedo creíble.', en: 'Port of entry: You can request protection directly. You may be referred to a credible fear interview.' },
        { es: 'Cruce sin autorización: Puedes ser detenido y puesto en remoción expedita. Debes expresar temor de regresar a tu país.', en: 'Unauthorized crossing: You may be detained and placed in expedited removal. You must express fear of returning to your country.' },
        { es: 'Remoción expedita: Proceso rápido de deportación para quienes llegan sin documentos. La entrevista de miedo creíble es tu oportunidad de demostrar que mereces una audiencia completa.', en: 'Expedited removal: Fast deportation process for those arriving without documents. The credible fear interview is your chance to show you deserve a full hearing.' },
        { es: 'CBP One: Aplicación para programar citas en puertos de entrada. Puede cambiar según políticas vigentes.', en: 'CBP One: App to schedule appointments at ports of entry. May change based on current policies.' },
      ],
    },
  },
  {
    id: 'miedo-creible', iconKey: 'alertTriangle',
    title: { es: 'Entrevista de Miedo Creíble', en: 'Credible Fear Interview' },
    subtitle: { es: 'Tu primera oportunidad', en: 'Your first opportunity' },
    content: {
      intro: { es: 'Prepárate para la entrevista que determina tu futuro', en: 'Prepare for the interview that determines your future' },
      description: { es: 'La entrevista de miedo creíble es un paso crítico para quienes son puestos en remoción expedita. Un oficial de asilo evaluará si tienes una posibilidad significativa de demostrar que calificas para asilo. Debes explicar claramente por qué temes regresar a tu país, quién te persigue, qué te hicieron o amenazaron con hacerte, y por qué el gobierno de tu país no puede o no quiere protegerte. Si pasas la entrevista, tu caso se refiere a un juez de inmigración para una audiencia completa de asilo. Si no la pasas, puedes pedir revisión por un juez de inmigración.', en: "The credible fear interview is a critical step for those placed in expedited removal. An asylum officer will assess whether you have a significant possibility of demonstrating that you qualify for asylum. You must clearly explain why you fear returning to your country, who is persecuting you, what they did or threatened to do, and why your country's government cannot or will not protect you. If you pass the interview, your case is referred to an immigration judge for a full asylum hearing. If you do not pass, you can request review by an immigration judge." },
      subPoints: [
        { es: 'Miedo creíble: Estándar para quienes solicitan asilo. Debes demostrar una "posibilidad significativa" de persecución.', en: 'Credible fear: Standard for asylum seekers. You must demonstrate a "significant possibility" of persecution.' },
        { es: 'Miedo razonable: Estándar más alto para quienes tienen orden de deportación previa o reingreso ilegal. Debes demostrar una "posibilidad razonable" de persecución.', en: 'Reasonable fear: Higher standard for those with prior removal orders or illegal reentry. You must demonstrate a "reasonable possibility" of persecution.' },
        { es: 'Preparación: Ten claros los hechos, fechas, personas involucradas y por qué no puedes regresar a tu país.', en: 'Preparation: Be clear about facts, dates, people involved, and why you cannot return to your country.' },
        { es: 'Derecho a abogado: Tienes derecho a consultar con un abogado antes de la entrevista, aunque el gobierno no te proporcionará uno.', en: 'Right to counsel: You have the right to consult an attorney before the interview, although the government will not provide one.' },
      ],
    },
  },
  {
    id: 'cat-restriccion', iconKey: 'shieldCheck',
    title: { es: 'CAT y Restricción de Remoción', en: 'CAT & Withholding of Removal' },
    subtitle: { es: 'Protecciones alternativas', en: 'Alternative protections' },
    content: {
      intro: { es: 'Cuando el asilo no es opción, existen otras protecciones', en: 'When asylum is not an option, other protections exist' },
      description: { es: 'Si no calificas para asilo (por ejemplo, porque pasó más de un año desde tu llegada), aún puedes solicitar dos formas alternativas de protección: la restricción de remoción (Withholding of Removal) y la protección bajo la Convención Contra la Tortura (CAT). La restricción de remoción tiene un estándar de prueba más alto que el asilo: debes demostrar que es "más probable que no" que serás perseguido. La protección CAT requiere demostrar que es "más probable que no" que serás torturado por o con el consentimiento del gobierno de tu país. Estas protecciones no ofrecen todos los beneficios del asilo (como la posibilidad de solicitar residencia permanente), pero impiden tu deportación al país donde enfrentas peligro.', en: 'If you do not qualify for asylum (for example, because more than one year has passed since your arrival), you can still apply for two alternative forms of protection: Withholding of Removal and protection under the Convention Against Torture (CAT). Withholding of Removal has a higher standard of proof than asylum: you must demonstrate it is "more likely than not" that you will be persecuted. CAT protection requires demonstrating it is "more likely than not" that you will be tortured by or with the consent of your country\'s government. These protections do not offer all the benefits of asylum (like the ability to apply for permanent residency), but they prevent your deportation to the country where you face danger.' },
      subPoints: [
        { es: 'Restricción de remoción: No te pueden deportar al país donde te persiguen. Estándar: "más probable que no".', en: 'Withholding of Removal: You cannot be deported to the country where you face persecution. Standard: "more likely than not".' },
        { es: 'CAT: No te pueden deportar a un país donde serías torturado con participación gubernamental.', en: 'CAT: You cannot be deported to a country where you would be tortured with government involvement.' },
        { es: 'Sin residencia: Estas protecciones no otorgan path a la residencia permanente ni a la ciudadanía.', en: 'No residency: These protections do not provide a path to permanent residency or citizenship.' },
        { es: 'No hay plazo de 1 año: A diferencia del asilo, estas protecciones no tienen la limitación de presentarse dentro del primer año.', en: 'No one-year deadline: Unlike asylum, these protections do not have the one-year filing limitation.' },
      ],
    },
  },
];

const processSteps: { id: number; iconKey: StepIconKey; title: Detail; desc: Detail }[] = [
  { id: 1, iconKey: 'search', title: { es: 'Evaluación', en: 'Evaluation' }, desc: { es: 'Analizamos tu historia, documentos y las bases legales de tu caso de asilo.', en: 'We analyze your story, documents, and the legal grounds of your asylum case.' } },
  { id: 2, iconKey: 'fileText', title: { es: 'Preparación', en: 'Preparation' }, desc: { es: 'Preparamos tu declaración, reunimos evidencia y organizamos tu caso.', en: 'We prepare your declaration, gather evidence, and organize your case.' } },
  { id: 3, iconKey: 'send', title: { es: 'Presentación', en: 'Filing' }, desc: { es: 'Presentamos tu solicitud I-589 y te preparamos para la entrevista o audiencia.', en: 'We file your I-589 application and prepare you for the interview or hearing.' } },
  { id: 4, iconKey: 'shield', title: { es: 'Representación', en: 'Representation' }, desc: { es: 'Te representamos ante el oficial de asilo o juez de inmigración.', en: 'We represent you before the asylum officer or immigration judge.' } },
];

const blogArticles: { slug: string; title: Detail; category: Detail; image: string }[] = [
  { slug: 'asilo_frontera_2026_puerto_entrada_vs_cruce', title: { es: 'Asilo en la frontera 2026: puerto de entrada vs cruce', en: 'Asylum at the Border 2026: Port of Entry vs Crossing' }, category: { es: 'Asilo', en: 'Asylum' }, image: '/blog/blog_20/BLOG10_CR1.png' },
  { slug: 'Frenar_deportacion_inminente_con_solicitud_de_Visa_Humanitaria', title: { es: 'Parar deportación urgente con Visa U o VAWA pendiente', en: 'Stop Urgent Deportation with Pending U Visa or VAWA' }, category: { es: 'Deportación', en: 'Deportation' }, image: '/blog/blog_08/B8_CR1.png' },
  { slug: 'estatus_juvenil_sijs_residencia_jovenes_abandonados', title: { es: 'Estatus Juvenil SIJS: papeles para jóvenes', en: 'SIJS: Papers for Abandoned Youth' }, category: { es: 'Humanitario', en: 'Humanitarian' }, image: '/blog/blog_16/BLOG06_CR1.png' },
];

const ui = {
  heroBadge: { es: 'Protección Internacional', en: 'International Protection' },
  heroTitle1: { es: 'Abogados de', en: 'Political' },
  heroTitle2: { es: 'Asilo Político', en: 'Asylum Lawyers' },
  heroSubtitle: { es: 'Defendemos tu derecho a vivir libre de persecución. Más de 35 años de experiencia representando solicitantes de asilo en todo Estados Unidos.', en: 'We defend your right to live free from persecution. Over 35 years of experience representing asylum seekers throughout the United States.' },
  protection: { es: 'Protección', en: 'Protection' },
  years: { es: 'Años', en: 'Years' },
  ctaConsulta: { es: 'Solicitar Consulta', en: 'Request Consultation' },
  ctaLlamar: { es: 'Llamar Ahora', en: 'Call Now' },
  requestEvaluation: { es: 'Solicitar Evaluación', en: 'Request Evaluation' },
  officeSectionTitle: { es: 'Oficinas Disponibles', en: 'Available Offices' },
  officeSectionSubtitle: { es: 'Representación en asilo en 5 estados', en: 'Asylum representation in 5 states' },
  processTitle: { es: 'Nuestro Proceso', en: 'Our Process' },
  processSubtitle: { es: 'Te acompañamos desde la evaluación hasta la audiencia final', en: 'We accompany you from evaluation to your final hearing' },
  blogTitle: { es: 'Artículos sobre Asilo', en: 'Articles on Asylum' },
  contactTitle: { es: 'Consulta Confidencial', en: 'Confidential Consultation' },
  phoneCta: { es: 'Llámenos Ahora', en: 'Call Us Now' },
};

export interface ResolvedTab {
  id: string; title: string; subtitle: string; iconKey: TabIconKey;
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
export function resolveBlog(lang: Language) {
  return blogArticles.map((b) => ({ slug: b.slug, title: b.title[lang], category: b.category[lang], image: b.image }));
}
export function getOffices() { return officesList; }
export function resolveUi(lang: Language): ResolvedUi {
  const out = {} as ResolvedUi;
  (Object.keys(ui) as (keyof typeof ui)[]).forEach((k) => { out[k] = ui[k][lang]; });
  return out;
}
