// Deportation Defense data (enfoque b). Bilingual source + server resolvers.
import type { Language } from '../../../lib/translations';
import { OFFICES_NAP, OFFICE_NAP_SLUGS } from '../../../components/officesPhoneMap';

/** Sedes totales, del registro NAP. Nunca a mano: se desfasa. */
const TOTAL_LOCATIONS = OFFICE_NAP_SLUGS.length;

export type TabIconKey = 'scale' | 'lock' | 'shieldAlert' | 'gavel' | 'bookOpen';
export type StepIconKey = 'siren' | 'fileText' | 'target' | 'checkCircle2' | 'landmark' | 'bookOpen';
interface Detail { es: string; en: string; }
interface RawTab {
  id: string; title: Detail; subtitle: Detail; iconKey: TabIconKey;
  content: { intro: Detail; description: Detail; subTitle?: Detail; subPoints?: Detail[]; solution?: Detail };
}

/**
 * Las sedes con su slug, DERIVADAS del registro NAP.
 *
 * La lista a mano tenia el mismo error de hecho que la de visa-u: decia
 * 'Kirby (San Antonio)' cuando Kirby es una direccion de HOUSTON. El despacho
 * no tiene oficina en San Antonio, y esta pagina la anunciaba.
 */
const officesList = OFFICE_NAP_SLUGS.map((slug) => ({ name: OFFICES_NAP[slug].name.es, slug }));

const infoTabs: RawTab[] = [
  {
    id: 'cancelacion', iconKey: 'scale',
    title: { es: 'Cancelación de Remoción', en: 'Cancellation of Removal' },
    subtitle: { es: 'INA Sección 240A(b)', en: 'INA Section 240A(b)' },
    content: {
      intro: { es: 'Una segunda oportunidad para quienes han construido su vida en EE.UU.', en: 'A second chance for those who have built their lives in the U.S.' },
      description: { es: 'La cancelación de remoción bajo la Sección 240A(b) del INA es un alivio migratorio disponible para personas en procedimientos de deportación que pueden demostrar presencia continua en Estados Unidos durante al menos 10 años, buen carácter moral durante ese periodo, y que su deportación causaría un sufrimiento excepcional y extremadamente inusual a un familiar calificado que sea ciudadano o residente permanente de EE.UU. Este es uno de los remedios más poderosos disponibles en la corte de inmigración, pero requiere preparación exhaustiva y evidencia sólida.', en: 'Cancellation of removal under INA Section 240A(b) is an immigration relief available to individuals in deportation proceedings who can demonstrate continuous physical presence in the United States for at least 10 years, good moral character during that period, and that their removal would result in exceptional and extremely unusual hardship to a qualifying relative who is a U.S. citizen or lawful permanent resident. This is one of the most powerful remedies available in immigration court, but it requires exhaustive preparation and strong evidence.' },
      subTitle: { es: 'Requisitos Fundamentales:', en: 'Fundamental Requirements:' },
      subPoints: [
        { es: 'Presencia física continua en EE.UU. durante al menos 10 años antes de la fecha del aviso de comparecencia (NTA).', en: 'Continuous physical presence in the U.S. for at least 10 years before the date of the Notice to Appear (NTA).' },
        { es: 'Buen carácter moral demostrable durante los 10 años de presencia continua.', en: 'Demonstrable good moral character during the 10 years of continuous presence.' },
        { es: 'Un familiar calificado (cónyuge, padre/madre o hijo/a) que sea ciudadano estadounidense o residente permanente.', en: 'A qualifying relative (spouse, parent, or child) who is a U.S. citizen or lawful permanent resident.' },
        { es: 'Demostrar que la deportación causaría sufrimiento excepcional y extremadamente inusual al familiar calificado.', en: 'Demonstrate that deportation would cause exceptional and extremely unusual hardship to the qualifying relative.' },
        { es: 'No tener condenas por delitos graves agravados ni ciertos delitos que afecten el carácter moral.', en: 'No convictions for aggravated felonies or certain crimes affecting moral character.' },
        { es: 'No haber sido previamente ordenado deportado sin haber reabierto el caso exitosamente.', en: 'Not having been previously ordered deported without successfully reopening the case.' },
      ],
      solution: { es: 'Nuestro equipo ha ganado cientos de casos de cancelación de remoción. Evaluamos cada detalle de su historial para construir el caso más fuerte posible ante el juez de inmigración.', en: 'Our team has won hundreds of cancellation of removal cases. We evaluate every detail of your history to build the strongest possible case before the immigration judge.' },
    },
  },
  {
    id: 'fianzas', iconKey: 'lock',
    title: { es: 'Fianzas de Inmigración', en: 'Immigration Bonds' },
    subtitle: { es: 'Libertad durante el proceso', en: 'Freedom during proceedings' },
    content: {
      intro: { es: 'Recupere su libertad mientras pelea su caso de inmigración.', en: 'Regain your freedom while fighting your immigration case.' },
      description: { es: 'Cuando una persona es detenida por ICE (Servicio de Inmigración y Control de Aduanas), puede ser elegible para una fianza de inmigración que le permita salir del centro de detención mientras se resuelve su caso. Existen diferentes tipos de fianzas y cada una tiene requisitos específicos. Nuestros abogados tienen amplia experiencia argumentando ante jueces de inmigración para lograr fianzas razonables y la liberación de nuestros clientes.', en: 'When a person is detained by ICE (Immigration and Customs Enforcement), they may be eligible for an immigration bond that allows them to leave the detention facility while their case is resolved. There are different types of bonds, each with specific requirements. Our attorneys have extensive experience arguing before immigration judges to secure reasonable bonds and the release of our clients.' },
      subTitle: { es: 'Tipos de Fianzas:', en: 'Types of Bonds:' },
      subPoints: [
        { es: 'Fianza de Entrega (Delivery Bond): Permite la liberación con la condición de asistir a todas las audiencias judiciales programadas.', en: 'Delivery Bond: Allows release on the condition of attending all scheduled court hearings.' },
        { es: 'Fianza de Salida Voluntaria (Voluntary Departure Bond): Para quienes acuerdan salir del país voluntariamente dentro de un plazo específico.', en: 'Voluntary Departure Bond: For those who agree to leave the country voluntarily within a specific timeframe.' },
        { es: 'Fianza de Custodia de ICE: Establecida directamente por ICE antes de que el caso llegue a un juez de inmigración.', en: 'ICE Custody Bond: Set directly by ICE before the case reaches an immigration judge.' },
        { es: 'Audiencia de Redeterminación de Fianza: Si ICE establece una fianza demasiado alta o la niega, podemos solicitar que un juez la revise y la reduzca.', en: 'Bond Redetermination Hearing: If ICE sets a bond too high or denies it, we can request that a judge review and reduce it.' },
        { es: 'Supervisión con Alternativas a la Detención (ATD): En algunos casos, se puede solicitar libertad bajo monitoreo electrónico en lugar de fianza.', en: 'Alternatives to Detention (ATD) Supervision: In some cases, release under electronic monitoring can be requested instead of bond.' },
      ],
      solution: { es: 'El monto de las fianzas de inmigración generalmente comienza en $1,500 y puede superar los $25,000. Luchamos agresivamente para obtener la fianza más baja posible para nuestros clientes.', en: 'Immigration bond amounts generally start at $1,500 and can exceed $25,000. We fight aggressively to obtain the lowest possible bond for our clients.' },
    },
  },
  {
    id: 'detenidos', iconKey: 'shieldAlert',
    title: { es: 'Detenidos por ICE', en: 'ICE Detainees' },
    subtitle: { es: 'Ayuda inmediata para familias', en: 'Immediate help for families' },
    content: {
      intro: { es: 'Si su familiar fue detenido por ICE, actuar rápido puede hacer la diferencia.', en: 'If your family member was detained by ICE, acting fast can make the difference.' },
      description: { es: 'La detención por parte de ICE es una de las experiencias más aterradoras que puede enfrentar una familia inmigrante. Cada minuto cuenta. Es fundamental no firmar ningún documento sin la asesoría de un abogado, ya que muchos detenidos firman órdenes de deportación voluntaria sin saber que tenían opciones legales para quedarse. Nuestro equipo responde a emergencias las 24 horas del día, los 7 días de la semana, y tiene experiencia visitando clientes en centros de detención en todo el país.', en: 'Detention by ICE is one of the most terrifying experiences an immigrant family can face. Every minute counts. It is essential not to sign any documents without attorney advice, as many detainees sign voluntary deportation orders without knowing they had legal options to stay. Our team responds to emergencies 24 hours a day, 7 days a week, and has experience visiting clients in detention centers across the country.' },
      subTitle: { es: 'Qué Hacer Si un Familiar Es Detenido:', en: 'What to Do If a Family Member Is Detained:' },
      subPoints: [
        { es: 'NO firme ningún documento de ICE sin hablar primero con un abogado de inmigración. Muchos documentos son renuncias de derechos.', en: 'DO NOT sign any ICE documents without first speaking with an immigration attorney. Many documents are waivers of rights.' },
        { es: 'Localice al detenido usando el sistema Online Detainee Locator de ICE o llamando al 1-888-351-4024.', en: "Locate the detainee using ICE's Online Detainee Locator system or by calling 1-888-351-4024." },
        { es: 'Reúna documentos importantes: identificaciones, pruebas de presencia en EE.UU., certificados de nacimiento de hijos ciudadanos.', en: 'Gather important documents: IDs, proof of presence in the U.S., birth certificates of citizen children.' },
        { es: 'Llame a nuestro equipo de emergencia al 832-598-0914 para iniciar la representación legal de inmediato.', en: 'Call our emergency team at 832-598-0914 to begin legal representation immediately.' },
        { es: 'Toda persona detenida tiene derecho a un abogado, a no ser interrogada sin representación, y a una audiencia de fianza ante un juez.', en: 'Every detained person has the right to an attorney, to not be interrogated without representation, and to a bond hearing before a judge.' },
      ],
      solution: { es: 'Tenemos una página dedicada con recursos completos para familias de detenidos. Visite nuestra sección de Clientes Detenidos para obtener más información y pasos detallados.', en: 'We have a dedicated page with comprehensive resources for families of detainees. Visit our Detained Clients section for more information and detailed steps.' },
    },
  },
  {
    id: 'criminal', iconKey: 'gavel',
    title: { es: 'Consecuencias Criminales', en: 'Criminal Consequences' },
    subtitle: { es: 'Cómo afectan los antecedentes', en: 'How criminal records affect you' },
    content: {
      intro: { es: 'Un error del pasado no tiene que definir su futuro migratorio.', en: 'A past mistake does not have to define your immigration future.' },
      description: { es: 'Las condenas penales pueden tener consecuencias devastadoras en los casos de inmigración, incluyendo la deportación obligatoria, la negación de beneficios migratorios y la imposibilidad de obtener la ciudadanía. Sin embargo, no todas las condenas tienen el mismo impacto. Es crucial entender la diferencia entre delitos graves agravados (aggravated felonies), delitos que involucran bajeza moral (crimes involving moral turpitude o CIMT), y ofensas menores. Nuestros abogados analizan cada caso para determinar las opciones disponibles y las mejores estrategias de defensa.', en: 'Criminal convictions can have devastating consequences in immigration cases, including mandatory deportation, denial of immigration benefits, and inability to obtain citizenship. However, not all convictions carry the same impact. It is crucial to understand the difference between aggravated felonies, crimes involving moral turpitude (CIMT), and minor offenses. Our attorneys analyze each case to determine available options and the best defense strategies.' },
      subTitle: { es: 'Categorías Clave de Delitos:', en: 'Key Crime Categories:' },
      subPoints: [
        { es: 'Delitos Graves Agravados (Aggravated Felonies): Incluyen tráfico de drogas, ciertos robos, fraude superior a $10,000. Prácticamente eliminan toda forma de alivio migratorio.', en: 'Aggravated Felonies: Include drug trafficking, certain thefts, fraud exceeding $10,000. They virtually eliminate all forms of immigration relief.' },
        { es: 'Delitos de Bajeza Moral (CIMT): Incluyen fraude, robo, asalto con intención. Pueden causar inadmisibilidad y deportabilidad dependiendo de la sentencia.', en: 'Crimes Involving Moral Turpitude (CIMT): Include fraud, theft, assault with intent. Can cause inadmissibility and deportability depending on the sentence.' },
        { es: 'DUI y Marihuana: Un DUI solo generalmente no es un CIMT, pero DUIs múltiples o con agravantes sí pueden afectar. Posesión de marihuana sigue siendo delito federal.', en: 'DUI and Marijuana: A single DUI is generally not a CIMT, but multiple DUIs or those with aggravating factors can have an impact. Marijuana possession remains a federal offense.' },
        { es: 'Delitos de Violencia Doméstica: Son causa de deportación bajo la sección 237 del INA, independientemente de si son felonías o misdemeanors.', en: 'Domestic Violence Offenses: Are grounds for deportation under INA section 237, regardless of whether they are felonies or misdemeanors.' },
        { es: 'Excepciones y Perdones: Existen perdones (waivers) disponibles para ciertos delitos, especialmente si puede demostrar rehabilitación y lazos familiares fuertes.', en: 'Exceptions and Waivers: Waivers are available for certain offenses, especially if you can demonstrate rehabilitation and strong family ties.' },
      ],
      solution: { es: 'Antes de declararse culpable de cualquier cargo criminal, consulte con un abogado de inmigración. Una declaración de culpabilidad puede tener consecuencias migratorias permanentes e irreversibles.', en: 'Before pleading guilty to any criminal charge, consult with an immigration attorney. A guilty plea can have permanent and irreversible immigration consequences.' },
    },
  },
  {
    id: 'apelaciones', iconKey: 'bookOpen',
    title: { es: 'Apelaciones y Mociones', en: 'Appeals & Motions' },
    subtitle: { es: 'Cuando la pelea no termina', en: 'When the fight is not over' },
    content: {
      intro: { es: 'Una decisión negativa no siempre es la última palabra.', en: 'A negative decision is not always the final word.' },
      description: { es: 'Si un juez de inmigración niega su caso, usted tiene el derecho de apelar ante la Junta de Apelaciones de Inmigración (BIA, por sus siglas en inglés). Además, si su caso ya fue cerrado y han surgido nuevas circunstancias o nueva evidencia, puede presentar una moción para reabrir o una moción para reconsiderar. Estos recursos legales son técnicamente complejos y tienen plazos estrictos, por lo que contar con un abogado experimentado es fundamental para preservar sus derechos.', en: 'If an immigration judge denies your case, you have the right to appeal to the Board of Immigration Appeals (BIA). Additionally, if your case has already been closed and new circumstances or new evidence have arisen, you can file a motion to reopen or a motion to reconsider. These legal remedies are technically complex and have strict deadlines, making an experienced attorney essential to preserving your rights.' },
      subTitle: { es: 'Opciones Legales Disponibles:', en: 'Available Legal Options:' },
      subPoints: [
        { es: 'Apelación ante el BIA: Debe presentarse dentro de 30 días de la decisión del juez. El BIA revisa errores de derecho y puede revertir, remitir o confirmar la decisión.', en: 'BIA Appeal: Must be filed within 30 days of the judge\'s decision. The BIA reviews errors of law and can reverse, remand, or affirm the decision.' },
        { es: 'Moción para Reabrir: Permite presentar nueva evidencia que no estaba disponible durante el juicio original. Generalmente tiene un plazo de 90 días.', en: 'Motion to Reopen: Allows presenting new evidence that was not available during the original hearing. Generally has a 90-day deadline.' },
        { es: 'Moción para Reconsiderar: Solicita que el juez o el BIA revise su propia decisión basándose en un error de derecho o de hecho en la decisión original.', en: 'Motion to Reconsider: Requests that the judge or BIA review their own decision based on an error of law or fact in the original decision.' },
        { es: 'Revisión por Tribunal Federal: Si el BIA niega la apelación, en ciertos casos se puede llevar el caso ante un tribunal federal de circuito.', en: 'Federal Court Review: If the BIA denies the appeal, in certain cases the case can be taken to a federal circuit court.' },
        { es: 'Reapertura Sua Sponte: En circunstancias extraordinarias, el BIA puede reabrir un caso por iniciativa propia, incluso fuera de los plazos regulares.', en: 'Sua Sponte Reopening: In extraordinary circumstances, the BIA can reopen a case on its own initiative, even outside regular deadlines.' },
      ],
      solution: { es: 'Los plazos en apelaciones son estrictos e inflexibles. Si recibió una orden de deportación, contacte a un abogado inmediatamente. Cada día que pasa puede significar la pérdida de su derecho a apelar.', en: 'Deadlines in appeals are strict and inflexible. If you received a deportation order, contact an attorney immediately. Every day that passes may mean losing your right to appeal.' },
    },
  },
];

const processSteps: { id: number; iconKey: StepIconKey; title: Detail; desc: Detail }[] = [
  { id: 1, iconKey: 'siren', title: { es: 'Evaluación de Emergencia', en: 'Emergency Evaluation' }, desc: { es: 'Revisamos su situación inmediatamente. Si está detenido o tiene una orden de deportación, actuamos en horas, no en días.', en: 'We review your situation immediately. If you are detained or have a deportation order, we act in hours, not days.' } },
  { id: 2, iconKey: 'fileText', title: { es: 'Análisis del Caso', en: 'Case Analysis' }, desc: { es: 'Examinamos su historial migratorio completo, antecedentes penales, tiempo en EE.UU. y lazos familiares para identificar todas las vías de defensa.', en: 'We examine your complete immigration history, criminal background, time in the U.S., and family ties to identify all defense avenues.' } },
  { id: 3, iconKey: 'target', title: { es: 'Estrategia Legal', en: 'Legal Strategy' }, desc: { es: 'Desarrollamos un plan personalizado: cancelación de remoción, fianza, ajuste de estatus, o la combinación de remedios más fuerte para su caso.', en: 'We develop a personalized plan: cancellation of removal, bond, adjustment of status, or the strongest combination of remedies for your case.' } },
  { id: 4, iconKey: 'checkCircle2', title: { es: 'Preparación de Evidencia', en: 'Evidence Preparation' }, desc: { es: 'Recopilamos declaraciones juradas, registros médicos, pruebas de presencia continua, cartas de apoyo y documentación de hardship.', en: 'We gather affidavits, medical records, proof of continuous presence, support letters, and hardship documentation.' } },
  { id: 5, iconKey: 'landmark', title: { es: 'Representación en Corte', en: 'Court Representation' }, desc: { es: 'Nuestros abogados lo representan agresivamente ante el juez de inmigración, presentando argumentos persuasivos y evidencia organizada.', en: 'Our attorneys represent you aggressively before the immigration judge, presenting persuasive arguments and organized evidence.' } },
  { id: 6, iconKey: 'bookOpen', title: { es: 'Seguimiento y Apelaciones', en: 'Follow-up & Appeals' }, desc: { es: 'Si es necesario, presentamos apelaciones ante el BIA o mociones para reabrir. No descansamos hasta agotar todas las opciones legales.', en: 'If necessary, we file appeals with the BIA or motions to reopen. We do not rest until all legal options are exhausted.' } },
];

const faqs: { q: Detail; a: Detail }[] = [
  { q: { es: '¿Puedo evitar la deportación si ya tengo una orden de remoción?', en: 'Can I avoid deportation if I already have a removal order?' }, a: { es: 'Posiblemente sí. Dependiendo de las circunstancias, puede presentar una moción para reabrir su caso ante el juez de inmigración o el BIA, especialmente si hay nueva evidencia, un cambio en la ley, o si no recibió notificación adecuada de su audiencia. También pueden existir opciones como la estancia de remoción (stay of removal) mientras se resuelve la apelación.', en: 'Possibly yes. Depending on the circumstances, you can file a motion to reopen your case before the immigration judge or the BIA, especially if there is new evidence, a change in the law, or if you did not receive proper notice of your hearing. Options such as a stay of removal while the appeal is resolved may also exist.' } },
  { q: { es: '¿Cuánto tiempo toma el proceso de cancelación de remoción?', en: 'How long does the cancellation of removal process take?' }, a: { es: 'El proceso puede tomar desde varios meses hasta varios años, dependiendo del tribunal y la complejidad del caso. Durante este tiempo, si obtiene una fianza, puede permanecer en libertad con su familia. Nuestro equipo trabaja para acelerar el proceso en lo posible mientras construye el caso más sólido.', en: 'The process can take from several months to several years, depending on the court and the complexity of the case. During this time, if you obtain a bond, you can remain free with your family. Our team works to expedite the process as much as possible while building the strongest case.' } },
  { q: { es: '¿Un DUI me puede causar la deportación?', en: 'Can a DUI cause my deportation?' }, a: { es: 'Un solo DUI simple generalmente no es causa directa de deportación, pero puede complicar otros trámites migratorios. Múltiples DUIs, DUIs con lesiones, o DUIs combinados con otros factores pueden resultar en procedimientos de deportación. Además, un DUI puede afectar su capacidad de demostrar buen carácter moral para la cancelación de remoción o la ciudadanía.', en: 'A single simple DUI is generally not a direct cause of deportation, but it can complicate other immigration processes. Multiple DUIs, DUIs with injuries, or DUIs combined with other factors can result in deportation proceedings. Additionally, a DUI can affect your ability to demonstrate good moral character for cancellation of removal or citizenship.' } },
  { q: { es: '¿Pueden deportar a alguien con hijos ciudadanos?', en: 'Can someone with citizen children be deported?' }, a: { es: 'Sí, tener hijos ciudadanos no impide automáticamente la deportación. Sin embargo, los hijos ciudadanos son un factor fundamental en la defensa, especialmente en casos de cancelación de remoción donde debe demostrar que la deportación causaría sufrimiento excepcional a sus hijos. Necesidades médicas, educativas y emocionales de los hijos son argumentos poderosos.', en: 'Yes, having citizen children does not automatically prevent deportation. However, citizen children are a fundamental factor in the defense, especially in cancellation of removal cases where you must demonstrate that deportation would cause exceptional hardship to your children. Medical, educational, and emotional needs of the children are powerful arguments.' } },
  { q: { es: '¿Cuánto cuesta una fianza de inmigración?', en: 'How much does an immigration bond cost?' }, a: { es: 'Las fianzas de inmigración generalmente van desde $1,500 hasta $25,000 o más, dependiendo de factores como el historial criminal, lazos comunitarios, riesgo de fuga y el criterio del juez. Nuestros abogados argumentan vigorosamente para obtener la fianza más baja posible. Si ICE establece una fianza excesiva, podemos solicitar una audiencia de redeterminación ante un juez de inmigración.', en: "Immigration bonds generally range from $1,500 to $25,000 or more, depending on factors such as criminal history, community ties, flight risk, and the judge's criteria. Our attorneys argue vigorously to obtain the lowest possible bond. If ICE sets an excessive bond, we can request a redetermination hearing before an immigration judge." } },
];

const blogPosts: { slug: string; title: Detail; category: Detail; image: string }[] = [
  { slug: 'ley-de-los-10-anos-cancelacion-de-deportacion', title: { es: 'La Ley de los 10 Años: Cancelación de Deportación', en: 'The 10-Year Law: Cancellation of Removal' }, category: { es: 'Defensa de Deportación', en: 'Deportation Defense' }, image: '/blog/blog_16/BLOG06_CR1.png' },
  { slug: 'frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria', title: { es: 'Frenar Deportación con Visa Humanitaria', en: 'Stop Deportation with Humanitarian Visa' }, category: { es: 'Defensa de Deportación', en: 'Deportation Defense' }, image: '/blog/blog_05/B5_CR1.png' },
  { slug: 'marihuana-dui-buen-caracter-moral-inmigracion', title: { es: 'Marihuana, DUI y Buen Carácter Moral', en: 'Marijuana, DUI & Good Moral Character' }, category: { es: 'Consecuencias Criminales', en: 'Criminal Consequences' }, image: '/blog/blog_17/BLOG07_CR1.png' },
  { slug: 'advance-parole-2026-viajar-con-daca-tps-visa-u', title: { es: 'Advance Parole 2026: Viajar con DACA, TPS o Visa U', en: 'Advance Parole 2026: Travel with DACA, TPS or U Visa' }, category: { es: 'Proceso Migratorio', en: 'Immigration Process' }, image: '/blog/blog_12/BLOG02_CR1.png' },
];

const ui = {
  badge: { es: 'Defensa Urgente de Deportación', en: 'Urgent Deportation Defense' },
  heroTitle1: { es: 'Defensa contra', en: 'Defense against' },
  heroTitle2: { es: 'Deportación', en: 'Deportation' },
  heroDescription: { es: 'Con más de 35 años de experiencia y 50,000+ casos, nuestros abogados luchan agresivamente para proteger su derecho a permanecer en Estados Unidos. Cancelación de remoción, fianzas, representación en corte y apelaciones.', en: 'With over 35 years of experience and 50,000+ cases, our attorneys fight aggressively to protect your right to remain in the United States. Cancellation of removal, bonds, court representation, and appeals.' },
  ctaConsultation: { es: 'Evaluación de Emergencia', en: 'Emergency Evaluation' },
  ctaCall: { es: 'Emergencia 24/7', en: '24/7 Emergency' },
  emergencyDesc: { es: 'Línea directa para emergencias de deportación y detención por ICE.', en: 'Direct line for deportation emergencies and ICE detention.' },
  processMethod: { es: 'Nuestro Proceso', en: 'Our Process' },
  processTitle: { es: 'Cómo Defendemos su Caso', en: 'How We Defend Your Case' },
  requestEvaluation: { es: 'Solicitar Evaluación de Caso', en: 'Request Case Evaluation' },
  faqTitle: { es: 'Preguntas Frecuentes', en: 'Frequently Asked Questions' },
  faqSubtitle: { es: 'Resolvemos sus dudas sobre deportación y defensa migratoria.', en: 'We answer your questions about deportation and immigration defense.' },
  contactTitle: { es: 'Proteja su Futuro en EE.UU.', en: 'Protect Your Future in the U.S.' },
  // Conteo DERIVADO: era '15' a mano y quedo desfasado al pasar a 20 sedes.
  officesTitle: { es: `${TOTAL_LOCATIONS} Oficinas a su Servicio`, en: `${TOTAL_LOCATIONS} Offices at Your Service` },
  officesSubtitle: { es: 'Representación legal en persona en todo el país', en: 'In-person legal representation nationwide' },
  detainedLink: { es: 'Ver recursos para detenidos', en: 'View resources for detainees' },
  blogTitle: { es: 'Artículos Relacionados', en: 'Related Articles' },
  statsYears: { es: 'Años de Experiencia', en: 'Years of Experience' },
  statsCases: { es: 'Casos Resueltos', en: 'Cases Resolved' },
  statsOffices: { es: 'Oficinas', en: 'Offices' },
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
export function resolveFaqs(lang: Language) {
  return faqs.map((f) => ({ q: f.q[lang], a: f.a[lang] }));
}
export function resolveBlog(lang: Language) {
  return blogPosts.map((b) => ({ slug: b.slug, title: b.title[lang], category: b.category[lang], image: b.image }));
}
export function getOffices() { return officesList; }
export const emergencyPhone = '832-598-0914';
export function resolveUi(lang: Language): ResolvedUi {
  const out = {} as ResolvedUi;
  (Object.keys(ui) as (keyof typeof ui)[]).forEach((k) => { out[k] = ui[k][lang]; });
  return out;
}
