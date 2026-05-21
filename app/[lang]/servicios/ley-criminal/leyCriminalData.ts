// Shared data for the Criminal Law page (enfoque b). Bilingual source + server
// resolvers; this module is imported only by the Server Component, so the
// bilingual text never enters the client bundle. The island receives
// pre-resolved (single-locale) strings + an icon KEY (resolved via a map).
import type { Language } from '../../../lib/translations';

export type IconKey = 'messageSquare' | 'zap' | 'car' | 'fileText' | 'scale' | 'phoneCall' | 'checkCircle2';
interface Detail { es: string; en: string; }

interface RawCase {
  id: string;
  title: Detail;
  subtitle: Detail;
  iconKey: IconKey;
  offices: string[];
  content: { intro: Detail; description: Detail; subTitle?: Detail; subPoints?: Detail[]; solution?: Detail };
}

const OFFICES = ['Chicago', 'Houston Principal', 'Houston Accidentes', 'Houston Main St', 'Houston NorthLoop', 'Houston NorthChase', 'Houston Kirby', 'Memphis', 'League City, TX'];

const mainCases: RawCase[] = [
  {
    id: 'violencia_domestica', iconKey: 'messageSquare', offices: OFFICES,
    title: { es: 'Violencia Doméstica', en: 'Domestic Violence' },
    subtitle: { es: 'Delitos Emotivos y Complejos', en: 'Emotional and Complex Offenses' },
    content: {
      intro: { es: '¿Está acusado de violencia doméstica?', en: 'Are you accused of domestic violence?' },
      description: { es: 'Los casos de violencia doméstica se encuentran entre los delitos penales más emotivos y complejos. Si usted y un familiar tienen una relación hostil, es fácil terminar en problemas legales. A menudo resulta en un arresto basado en versiones diferentes del mismo evento.', en: "Domestic violence cases are among the most emotional and complex criminal offenses. If you and a family member have a hostile relationship, it's easy to end up in legal trouble. It often results in an arrest based on different versions of the same event." },
      subTitle: { es: 'Sanciones Potenciales Incluyen:', en: 'Potential Penalties Include:' },
      subPoints: [
        { es: 'Multas y libertad condicional.', en: 'Fines and probation.' },
        { es: 'Órdenes de protección y restricción.', en: 'Protection and restraining orders.' },
        { es: 'Consejería obligatoria y clases de control de ira.', en: 'Mandatory counseling and anger management classes.' },
        { es: 'Órdenes de custodia de menores y encarcelamiento.', en: 'Child custody orders and imprisonment.' },
      ],
      solution: { es: 'Si ha sido arrestado o acusado, es esencial que busque asesoría legal inmediata. Le proporcionaremos una defensa sólida para proteger su libertad y sus derechos familiares.', en: 'If you have been arrested or charged, it is essential that you seek immediate legal advice. We will provide you with a solid defense to protect your freedom and family rights.' },
    },
  },
  {
    id: 'asalto', iconKey: 'zap', offices: OFFICES,
    title: { es: 'Asalto y Agresión', en: 'Assault and Battery' },
    subtitle: { es: 'Violencia Física o Amenaza de Daño', en: 'Physical Violence or Threat of Harm' },
    content: {
      intro: { es: '¿Ha sido acusado de asalto o agresión?', en: 'Have you been charged with assault or battery?' },
      description: { es: 'El asalto implica causar intencionalmente que otra persona tenga temor razonable de un contacto dañino inminente. No siempre se requiere una lesión física. Si hay violencia física real, el cargo se combina con un cargo de agresión.', en: 'Assault involves intentionally causing another person to have reasonable fear of imminent harmful contact. A physical injury is not always required. If there is actual physical violence, the charge is combined with a battery charge.' },
      solution: { es: 'Es importante conocer la gravedad de las repercusiones, como el tiempo en la cárcel o multas. Nuestros abogados de defensa criminal están aquí para brindarle el asesoramiento y la representación que necesita.', en: 'It is important to know the seriousness of the repercussions, such as jail time or fines. Our criminal defense attorneys are here to provide you with the advice and representation you need.' },
    },
  },
  {
    id: 'dwi', iconKey: 'car', offices: OFFICES,
    title: { es: 'DWI - Manejo en Estado de Ebriedad', en: 'DWI - Driving While Intoxicated' },
    subtitle: { es: 'Conducir Bajo la Influencia (DUI)', en: 'Driving Under the Influence (DUI)' },
    content: {
      intro: { es: '¿Necesita un abogado después de ser sorprendido conduciendo bajo la influencia?', en: 'Need an attorney after being caught driving under the influence?' },
      description: { es: 'El límite legal de contenido de alcohol en la sangre es típicamente 0.08%, pero puede ser detenido por sospecha de consumo de drogas o alcohol, independientemente de la cantidad exacta.', en: 'The legal limit for blood alcohol content is typically 0.08%, but you can be arrested for suspicion of drug or alcohol consumption, regardless of the exact amount.' },
      subTitle: { es: 'Graves Consecuencias Incluyen:', en: 'Serious Consequences Include:' },
      subPoints: [
        { es: 'Un registro de antecedentes penales.', en: 'A criminal record.' },
        { es: 'Suspensión o revocación de su licencia de conducir.', en: "Suspension or revocation of your driver's license." },
        { es: 'Sentencia de cárcel y multas elevadas.', en: 'Jail sentence and high fines.' },
        { es: 'Programas de tratamiento requeridos y aumento del costo del seguro.', en: 'Required treatment programs and increased insurance cost.' },
      ],
      solution: { es: 'Nuestros abogados de defensa criminal están aquí para brindarle el asesoramiento y la representación que necesita para luchar contra los cargos de DWI.', en: 'Our criminal defense attorneys are here to provide you with the advice and representation you need to fight DWI charges.' },
    },
  },
  {
    id: 'hurto', iconKey: 'fileText', offices: OFFICES,
    title: { es: 'Hurto, Robo y Delitos Patrimoniales', en: 'Theft, Robbery, and Property Crimes' },
    subtitle: { es: 'Fraude, Malversación y Robo de Identidad', en: 'Fraud, Embezzlement, and Identity Theft' },
    content: {
      intro: { es: '¿Ha sido acusado de un delito de robo o hurto?', en: 'Have you been charged with a theft or larceny offense?' },
      description: { es: 'Este delito penal suele aplicarse de manera amplia; es delito de hurto cuando una persona se apropia intencional o fraudulentamente de los bienes personales de otra persona sin su consentimiento expreso.', en: "This criminal offense is often broadly applied; it is a theft offense when a person intentionally or fraudulently appropriates another person's personal property without their express consent." },
      subTitle: { es: 'Delitos de Hurto Incluidos:', en: 'Theft Offenses Included:' },
      subPoints: [
        { es: 'Robo en tiendas y Hurto menor.', en: 'Shoplifting and petty theft.' },
        { es: 'Hurto y Malversación.', en: 'Larceny and Embezzlement.' },
        { es: 'Robo de identidad y Fraude/Falsificación.', en: 'Identity theft and Fraud/Forgery.' },
        { es: 'Robo con cheque o emisión de cheques sin fondos.', en: 'Theft by check or issuing bad checks.' },
        { es: 'Uso ilegal/no autorizado de un vehículo motorizado.', en: 'Illegal/unauthorized use of a motor vehicle.' },
      ],
      solution: { es: 'Si lo acusan de un delito en esta lista, contáctenos ahora. Lucharemos para proteger su reputación y evitar consecuencias penales severas.', en: 'If you are accused of a crime on this list, contact us now. We will fight to protect your reputation and avoid severe criminal consequences.' },
    },
  },
  {
    id: 'prostitucion', iconKey: 'scale', offices: OFFICES,
    title: { es: 'Prostitución y Solicitación', en: 'Prostitution and Solicitation' },
    subtitle: { es: 'Delito Grave y Sanciones Estrictas', en: 'Felony Offense and Strict Penalties' },
    content: {
      intro: { es: '¿Ha sido acusado de prostitución o solicitación?', en: 'Have you been charged with prostitution or solicitation?' },
      description: { es: "Las leyes han endurecido las penas, por ejemplo, en Texas, la solicitud de prostitución puede ser un delito grave. Alguien es culpable si 'la persona a sabiendas ofrece o acepta pagar una tarifa a otra persona con el fin de participar en una conducta sexual'.", en: "Laws have stiffened penalties; for example, in Texas, solicitation of prostitution can be a felony offense. Someone is guilty if 'the person knowingly offers or agrees to pay a fee to another person for the purpose of engaging in sexual conduct'." },
      solution: { es: 'Según la definición, no es necesario que el dinero cambie de manos ni que se realice ningún acto sexual. Las sanciones varían ampliamente; es esencial consultar con nuestro abogado defensor penal para determinar las posibles sanciones y las opciones legales que tiene.', en: 'According to the definition, no money needs to change hands or sexual act take place. Penalties vary widely; it is essential to consult with our criminal defense attorney to determine the possible penalties and the legal options you have.' },
    },
  },
];

const processSteps: { id: number; iconKey: IconKey; title: Detail; desc: Detail }[] = [
  { id: 1, iconKey: 'phoneCall', title: { es: 'Detención y Contacto', en: 'Arrest and Contact' }, desc: { es: 'Llámenos inmediatamente tras un arresto para proteger sus derechos.', en: 'Call us immediately after an arrest to protect your rights.' } },
  { id: 2, iconKey: 'fileText', title: { es: 'Análisis de Pruebas', en: 'Evidence Analysis' }, desc: { es: 'Revisamos informes policiales, testimonios y toda la evidencia.', en: 'We review police reports, testimonies, and all evidence.' } },
  { id: 3, iconKey: 'scale', title: { es: 'Estrategia Legal', en: 'Legal Strategy' }, desc: { es: 'Desarrollamos una defensa sólida y exploramos todas las opciones.', en: 'We develop a solid defense and explore all options.' } },
  { id: 4, iconKey: 'checkCircle2', title: { es: 'Representación en Corte', en: 'Court Representation' }, desc: { es: 'Lo representamos en la corte para luchar por el mejor resultado posible.', en: 'We represent you in court to fight for the best possible outcome.' } },
];

const ui = {
  badge: { es: 'Defensa Legal Inmediata', en: 'Immediate Legal Defense' },
  heroTitle1: { es: 'Expertos en', en: 'Experts in' },
  heroTitle2: { es: 'Defensa Penal', en: 'Criminal Defense' },
  heroDescription: { es: 'Desde DWI, hasta hurto y asalto. Protegemos su libertad y su futuro. Su primera llamada debe ser a nuestro abogado defensor.', en: 'From DWI to theft and assault. We protect your freedom and future. Your first call should be to our defense attorney.' },
  stats: { es: 'Casos Defendidos', en: 'Cases Defended' },
  casesTitle: { es: 'Soluciones Legales en defensa criminal', en: 'Solutions in Criminal Defense' },
  ctaConsultation: { es: 'Consulta Ahora', en: 'Consult Now' },
  specialties: { es: 'Nuestra Defensa', en: 'Our Defense' },
  callNow: { es: 'Llámanos Ahora Mismo', en: 'Call Us Right Now' },
  processMethod: { es: 'Nuestro Método', en: 'Our Method' },
  processTitle: { es: 'Su Ruta Hacia la Defensa', en: 'Your Path to Defense' },
  requestEvaluation: { es: 'Solicitar Consulta Privada', en: 'Request Private Consultation' },
  availableOffices: { es: 'Oficinas Disponibles', en: 'Available Offices' },
  officesCount: { es: 'oficinas', en: 'offices' },
};

// ---- Resolved (single-locale) shapes passed to the client island ----
export interface ResolvedCase {
  id: string;
  title: string;
  subtitle: string;
  iconKey: IconKey;
  offices: string[];
  content: { intro: string; description: string; subTitle?: string; subPoints?: string[]; solution?: string };
}
export type ResolvedUi = Record<keyof typeof ui, string>;

export function resolveCases(lang: Language): ResolvedCase[] {
  return mainCases.map((c) => ({
    id: c.id, title: c.title[lang], subtitle: c.subtitle[lang], iconKey: c.iconKey, offices: c.offices,
    content: {
      intro: c.content.intro[lang],
      description: c.content.description[lang],
      subTitle: c.content.subTitle?.[lang],
      subPoints: c.content.subPoints?.map((p) => p[lang]),
      solution: c.content.solution?.[lang],
    },
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
