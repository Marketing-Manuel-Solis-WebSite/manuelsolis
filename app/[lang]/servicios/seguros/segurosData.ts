// Insurance Claims data (enfoque b) — bilingual source + server resolvers.
import type { Language } from '../../../lib/translations';

export type IconKey = 'zap' | 'truck' | 'car' | 'stethoscope' | 'scale' | 'fileText' | 'handCoins';
interface Detail { es: string; en: string; }
interface RawCase {
  id: string; title: Detail; subtitle: Detail; iconKey: IconKey; offices: string[];
  content: { intro: Detail; description: Detail; subTitle?: Detail; subPoints?: Detail[]; solution?: Detail };
}

const OFFICES = ['Arvada (Denver)', 'Chicago', 'Dallas', 'El Paso', 'Harlingen', 'Los Angeles', 'Houston Principal', 'Houston Accidentes', 'Houston Main St', 'Houston NorthLoop', 'Houston NorthChase', 'Houston Kirby', 'Memphis', 'League City, TX'];

const mainCases: RawCase[] = [
  {
    id: 'incendio', iconKey: 'zap', offices: OFFICES,
    title: { es: 'Reclamaciones por Incendio', en: 'Fire Claims' },
    subtitle: { es: 'Daños por Fuego, Humo y Agua', en: 'Fire, Smoke, and Water Damage' },
    content: {
      intro: { es: 'El fuego causa estragos en propiedades. ¿Siente que su aseguradora no lo cubre?', en: "Fire causes havoc on properties. Do you feel your insurer isn't covering you?" },
      description: { es: 'Los daños causados por un incendio, el humo y el agua pueden ser catastróficos. Las compañías de seguros a menudo buscan formas de minimizar el pago o negar el reclamo por completo. Le ayudamos a luchar por la compensación total que se merece.', en: 'Damage caused by fire, smoke, and water can be catastrophic. Insurance companies often look for ways to minimize payment or deny the claim outright. We help you fight for the full compensation you deserve.' },
      subTitle: { es: 'Argumentos Comunes de la Aseguradora:', en: 'Common Insurer Arguments:' },
      subPoints: [
        { es: 'Falta de mantenimiento de la propiedad.', en: 'Lack of property maintenance.' },
        { es: 'Mano de obra defectuosa.', en: 'Defective workmanship.' },
        { es: 'Exclusiones o condiciones escritas en la póliza.', en: 'Exclusions or conditions written in the policy.' },
        { es: 'Daño preexistente.', en: 'Pre-existing damage.' },
      ],
      solution: { es: 'Nos aseguraremos de que el valor real de la pérdida sea evaluado correctamente, incluyendo la estructura, contenidos y gastos de subsistencia temporales (ALE).', en: 'We will ensure the actual value of the loss is properly assessed, including the structure, contents, and temporary living expenses (ALE).' },
    },
  },
  {
    id: 'granizo_viento', iconKey: 'truck', offices: OFFICES,
    title: { es: 'Daños por Granizo y Viento', en: 'Hail and Wind Damage' },
    subtitle: { es: 'Techos, Estructuras y Fachadas', en: 'Roofs, Structures, and Facades' },
    content: {
      intro: { es: '¿Su techo o propiedad fue dañado por una tormenta de viento o granizo?', en: 'Was your roof or property damaged by a wind or hail storm?' },
      description: { es: "El granizo y los vientos fuertes pueden causar daños estructurales invisibles que las aseguradoras intentarán ignorar o clasificar como 'daño preexistente'. Es posible que podamos ayudarlo a recibir la compensación que se merece.", en: "Hail and strong winds can cause invisible structural damage that insurers will try to ignore or classify as 'pre-existing damage'. We may be able to help you receive the compensation you deserve." },
      solution: { es: 'Enviaremos ajustadores y expertos independientes para documentar el daño real y contrarrestar la evaluación baja de la compañía de seguros.', en: "We will send independent adjusters and experts to document the actual damage and counter the insurance company's low valuation." },
    },
  },
  {
    id: 'tornado', iconKey: 'car', offices: OFFICES,
    title: { es: 'Reclamaciones por Tornado', en: 'Tornado Claims' },
    subtitle: { es: 'Pérdida Total y Reconstrucción', en: 'Total Loss and Reconstruction' },
    content: {
      intro: { es: '¿Ha sufrido una pérdida catastrófica debido a un tornado?', en: 'Have you suffered a catastrophic loss due to a tornado?' },
      description: { es: 'Los tornados a menudo resultan en pérdidas totales o daños estructurales masivos. Las disputas giran en torno al valor de reemplazo. Su compañía de seguros debe pagar lo suficiente para que usted reconstruya. Esto puede ser un proceso largo que requiere representación experta.', en: 'Tornadoes often result in total losses or massive structural damage. Disputes revolve around replacement value. Your insurance company must pay enough for you to rebuild. This can be a lengthy process that requires expert representation.' },
      solution: { es: 'Luchamos contra la negación, el pago insuficiente o el retraso en la liquidación para que pueda comenzar la reconstrucción lo antes posible.', en: 'We fight against denial, underpayment, or delayed settlement so you can start rebuilding as soon as possible.' },
    },
  },
  {
    id: 'tuberias_congeladas', iconKey: 'stethoscope', offices: OFFICES,
    title: { es: 'Tuberías Congeladas / Daños por Agua', en: 'Frozen Pipes / Water Damage' },
    subtitle: { es: 'Daños Invernales e Inundaciones', en: 'Winter Damage and Flooding' },
    content: {
      intro: { es: 'Daños causados por tuberías congeladas o roturas de agua durante tormentas invernales.', en: 'Damage caused by frozen pipes or water leaks during winter storms.' },
      description: { es: "El daño por agua es costoso y las aseguradoras a menudo argumentan 'falta de mantenimiento'. Póngase en contacto con nosotros si su casa sufrió daños como resultado de tuberías congeladas. Es posible que podamos ayudarle a recuperar costos de reparación y subsistencia.", en: "Water damage is costly, and insurers often argue 'lack of maintenance'. Contact us if your home suffered damage as a result of frozen pipes. We may be able to help you recover repair and living expenses." },
      subTitle: { es: 'Recuperación de Costos Incluye:', en: 'Cost Recovery Includes:' },
      subPoints: [
        { es: 'Costo de exponer tuberías dañadas.', en: 'Cost to expose damaged pipes.' },
        { es: 'Reparaciones en propiedades dañadas.', en: 'Repairs to damaged property.' },
        { es: 'Secado o reemplazo de alfombras y muros.', en: 'Drying or replacing carpets and walls.' },
        { es: 'Gastos de subsistencia si no pudo vivir en su casa.', en: 'Living expenses if you could not live in your home.' },
      ],
      solution: { es: 'Es crucial actuar rápidamente para documentar y reparar el daño. Luchamos para que su póliza cubra el costo total de la restauración.', en: 'It is crucial to act quickly to document and repair the damage. We fight for your policy to cover the total cost of restoration.' },
    },
  },
  {
    id: 'disputas_mala_fe', iconKey: 'scale', offices: OFFICES,
    title: { es: 'Disputas con la Aseguradora', en: 'Insurer Disputes' },
    subtitle: { es: 'Negación, Retraso y Mala Fe', en: 'Denial, Delay, and Bad Faith' },
    content: {
      intro: { es: '¿Siente que su compañía de seguros lo está tratando injustamente?', en: 'Do you feel your insurance company is treating you unfairly?' },
      description: { es: 'Representamos a asegurados en disputas con sus compañías de seguros. Las compañías con frecuencia niegan la cobertura, no pagan lo suficiente por la propiedad dañada o tardan demasiado. Ha pagado sus primas, usted merece ser tratado de manera justa.', en: "We represent policyholders in disputes with their insurance companies. Companies frequently deny coverage, underpay for damaged property, or take too long. You've paid your premiums, you deserve to be treated fairly." },
      subTitle: { es: 'Acciones de Mala Fe Comunes:', en: 'Common Bad Faith Actions:' },
      subPoints: [
        { es: 'Negado a pagar el reclamo.', en: 'Refusing to pay the claim.' },
        { es: 'Mal pagado (no cubre el costo total de la reparación del daño).', en: 'Underpaying (not covering the total cost of repairing the damage).' },
        { es: 'Retrasado el pago excesivamente.', en: 'Excessively delaying payment.' },
        { es: 'Aplicado un deducible incorrecto.', en: 'Applying an incorrect deductible.' },
      ],
      solution: { es: 'Analizamos su póliza, el reclamo y la conducta de la aseguradora para presentar una demanda por incumplimiento de contrato y posible mala fe, buscando la compensación completa.', en: "We analyze your policy, the claim, and the insurer's conduct to file a lawsuit for breach of contract and possible bad faith, seeking full compensation." },
    },
  },
];

const processSteps: { id: number; iconKey: IconKey; title: Detail; desc: Detail }[] = [
  { id: 1, iconKey: 'fileText', title: { es: 'Análisis de Póliza', en: 'Policy Analysis' }, desc: { es: 'Revisamos su póliza y los detalles del daño.', en: 'We review your policy and the damage details.' } },
  { id: 2, iconKey: 'truck', title: { es: 'Investigación Experta', en: 'Expert Investigation' }, desc: { es: 'Enviamos ajustadores independientes para documentar la pérdida.', en: 'We send independent adjusters to document the loss.' } },
  { id: 3, iconKey: 'scale', title: { es: 'Reclamación Formal', en: 'Formal Claim' }, desc: { es: 'Presentamos su reclamo por el valor total real.', en: 'We file your claim for the actual total value.' } },
  { id: 4, iconKey: 'handCoins', title: { es: 'Litigio y Cobro', en: 'Litigation and Collection' }, desc: { es: 'Luchamos para que reciba la compensación que le corresponde.', en: 'We fight for you to receive the compensation you are due.' } },
];

const ui = {
  badge: { es: 'Daños a la Propiedad', en: 'Property Damage' },
  heroTitle1: { es: 'Expertos en', en: 'Experts in' },
  heroTitle2: { es: 'Reclamaciones de Seguros', en: 'Insurance Claims' },
  heroDescription: { es: 'Obtenga el pago que se merece por daños de viento, granizo, incendio o agua. Luchamos contra la negación, el retraso y el pago insuficiente.', en: 'Get the payment you deserve for wind, hail, fire, or water damage. We fight against denial, delay, and underpayment.' },
  stats: { es: 'Reclamaciones Ganadas', en: 'Claims Won' },
  casesTitle: { es: 'Soluciones en Seguros', en: 'Legal Solutions in Insurance' },
  ctaConsultation: { es: 'Consulta Ahora', en: 'Consult Now' },
  specialties: { es: 'Nuestras Especialidades', en: 'Our Specialties' },
  videoSectionBadge: { es: 'Conoce a Nuestro Equipo', en: 'Meet Our Team' },
  videoSectionTitle: { es: 'Abogado', en: 'Attorney' },
  videoSectionSubtitle: { es: 'Escucha directamente de nuestros socios cómo protegemos tus derechos en la disputa de seguros.', en: 'Hear directly from our partners how we protect your rights in insurance disputes.' },
  callNow: { es: 'Llámanos Ahora Mismo', en: 'Call Us Right Now' },
  processMethod: { es: 'Nuestro Método', en: 'Our Method' },
  processTitle: { es: 'El Proceso de su Reclamación', en: 'Your Claim Process' },
  requestEvaluation: { es: 'Solicitar Evaluación', en: 'Request Evaluation' },
  videoAlt: { es: 'Video explicativo sobre la dedicación del equipo legal.', en: "Explanation video about the legal team's dedication." },
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
