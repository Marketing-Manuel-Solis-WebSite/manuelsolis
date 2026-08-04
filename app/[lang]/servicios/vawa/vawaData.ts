// VAWA data (enfoque b). Bilingual source + server resolvers (server-only).
import type { Language } from '../../../lib/translations';

export type TabIconKey = 'shield' | 'checkCircle2' | 'userCheck' | 'heart' | 'scale';
export type StepIconKey = 'messageSquare' | 'search' | 'fileText' | 'shieldCheck';
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
    id: 'que-es-vawa', iconKey: 'shield',
    title: { es: '¿Qué es VAWA?', en: 'What is VAWA?' },
    subtitle: { es: 'Ley de Violencia contra la Mujer', en: 'Violence Against Women Act' },
    content: {
      intro: { es: 'Protección migratoria para víctimas de abuso doméstico', en: 'Immigration protection for domestic abuse victims' },
      description: { es: 'VAWA (Violence Against Women Act) es una ley federal de Estados Unidos que permite a ciertas víctimas de abuso doméstico solicitar su propia residencia permanente sin necesidad de que el agresor lo sepa o coopere en el proceso. A pesar de su nombre, VAWA no es exclusivamente para mujeres: hombres, mujeres y personas de cualquier género pueden calificar si cumplen los requisitos. El proceso se realiza mediante la presentación del Formulario I-360 (Autopeticin VAWA) ante USCIS. Lo fundamental de VAWA es que la víctima controla su propio caso migratorio. El agresor nunca es notificado, lo que protege a la víctima de represalias. Esto se conoce como el principio de confidencialidad de VAWA, uno de los pilares más importantes de esta ley.', en: 'VAWA (Violence Against Women Act) is a U.S. federal law that allows certain domestic abuse victims to petition for their own permanent residency without the abuser knowing or cooperating in the process. Despite its name, VAWA is not exclusively for women: men, women, and people of any gender can qualify if they meet the requirements. The process is carried out by filing Form I-360 (VAWA Self-Petition) with USCIS. The fundamental aspect of VAWA is that the victim controls their own immigration case. The abuser is never notified, which protects the victim from retaliation. This is known as the VAWA confidentiality principle, one of the most important pillars of this law.' },
      subTitle: { es: 'Aspectos Clave de VAWA:', en: 'Key Aspects of VAWA:' },
      subPoints: [
        { es: 'Autopetición: La víctima presenta su propio caso sin depender del agresor.', en: 'Self-Petition: The victim files their own case without depending on the abuser.' },
        { es: 'Formulario I-360: Es el formulario oficial utilizado para solicitar protección bajo VAWA.', en: 'Form I-360: The official form used to request protection under VAWA.' },
        { es: 'Confidencialidad Total: USCIS no puede contactar al agresor ni revelar la existencia del caso.', en: 'Total Confidentiality: USCIS cannot contact the abuser or reveal the existence of the case.' },
        { es: 'No solo para mujeres: Hombres, padres y personas de cualquier género pueden aplicar.', en: 'Not only for women: Men, parents, and people of any gender can apply.' },
      ],
      solution: { es: 'VAWA es una de las protecciones más poderosas del sistema migratorio: permite a la víctima tomar el control de su futuro legal sin ninguna participación del agresor.', en: 'VAWA is one of the most powerful protections in the immigration system: it allows the victim to take control of their legal future without any involvement from the abuser.' },
    },
  },
  {
    id: 'quien-califica', iconKey: 'checkCircle2',
    title: { es: '¿Quién Califica?', en: 'Who Qualifies?' },
    subtitle: { es: 'Requisitos de Elegibilidad', en: 'Eligibility Requirements' },
    content: {
      intro: { es: 'Requisitos fundamentales para una autopetición VAWA', en: 'Fundamental requirements for a VAWA self-petition' },
      description: { es: 'Para calificar bajo VAWA, debe existir una relación específica entre la víctima y el agresor, y se deben demostrar varios elementos. Las tres categorías principales de peticionarios son: (1) cónyuges o excónyuges de ciudadanos o residentes permanentes de EE.UU. que han sufrido abuso; (2) padres que han sido maltratados por hijos ciudadanos estadounidenses mayores de 21 años; y (3) hijos que han sido abusados por padres ciudadanos o residentes permanentes. No es necesario tener estatus migratorio legal para presentar una autopetición VAWA. Incluso personas indocumentadas pueden calificar si cumplen los demás requisitos.', en: 'To qualify under VAWA, there must be a specific relationship between the victim and the abuser, and several elements must be demonstrated. The three main categories of petitioners are: (1) spouses or ex-spouses of U.S. citizens or permanent residents who have suffered abuse; (2) parents who have been abused by U.S. citizen children over 21 years of age; and (3) children who have been abused by citizen or permanent resident parents. It is not necessary to have legal immigration status to file a VAWA self-petition. Even undocumented individuals can qualify if they meet the other requirements.' },
      subTitle: { es: 'Debe Demostrar:', en: 'You Must Demonstrate:' },
      subPoints: [
        { es: 'Relación calificante: Ser cónyuge, excónyuge, padre o hijo del agresor ciudadano o residente.', en: 'Qualifying relationship: Being the spouse, ex-spouse, parent, or child of the citizen or resident abuser.' },
        { es: 'Matrimonio o relación de buena fe: Si aplica por cónyuge, el matrimonio debe haber sido genuino (no solo por papeles).', en: 'Good faith marriage or relationship: If applying as a spouse, the marriage must have been genuine (not just for papers).' },
        { es: 'Abuso documentado: Evidencia de abuso físico, emocional, psicológico, sexual o económico durante la relación.', en: 'Documented abuse: Evidence of physical, emotional, psychological, sexual, or economic abuse during the relationship.' },
        { es: 'Buen carácter moral: Historial sin problemas criminales graves (evaluado caso por caso).', en: 'Good moral character: History without serious criminal issues (evaluated on a case-by-case basis).' },
        { es: 'Residencia en EE.UU.: Haber residido con el agresor en Estados Unidos en algún momento.', en: 'U.S. residence: Having resided with the abuser in the United States at some point.' },
      ],
      solution: { es: 'No necesita reportes policiales para probar el abuso. Declaraciones personales detalladas, registros médicos, fotos, mensajes de texto y cartas de apoyo de familiares o consejeros pueden ser evidencia suficiente.', en: 'You do not need police reports to prove the abuse. Detailed personal statements, medical records, photos, text messages, and support letters from family members or counselors can be sufficient evidence.' },
    },
  },
  {
    id: 'vawa-hombres', iconKey: 'userCheck',
    title: { es: 'VAWA para Hombres', en: 'VAWA for Men' },
    subtitle: { es: 'Protección sin Distinción de Género', en: 'Protection Regardless of Gender' },
    content: {
      intro: { es: 'VAWA protege a TODOS los géneros por igual', en: 'VAWA protects ALL genders equally' },
      description: { es: 'A pesar de que la ley se llama "Violence Against Women Act", VAWA protege a todas las víctimas de violencia doméstica sin importar su género. Los hombres que son víctimas de abuso por parte de su cónyuge, excónyuge o pareja ciudadana o residente permanente tienen exactamente los mismos derechos y pueden presentar una autopetición bajo las mismas reglas. Muchos hombres desconocen que tienen este derecho. El abuso no siempre es físico: la manipulación emocional, el control financiero, las amenazas con la deportación, el aislamiento de familiares y amigos, y la destrucción de documentos de identidad son formas de abuso reconocidas por USCIS en casos VAWA. Si su pareja ciudadana o residente lo amenaza con "quitarle los papeles", controlarlo económicamente o reportarlo a inmigración, usted puede calificar para VAWA.', en: 'Although the law is called the "Violence Against Women Act," VAWA protects all domestic violence victims regardless of gender. Men who are victims of abuse by their citizen or permanent resident spouse, ex-spouse, or partner have exactly the same rights and can file a self-petition under the same rules. Many men are unaware they have this right. Abuse is not always physical: emotional manipulation, financial control, threats of deportation, isolation from family and friends, and destruction of identity documents are forms of abuse recognized by USCIS in VAWA cases. If your citizen or resident partner threatens to "take away your papers," control you financially, or report you to immigration, you may qualify for VAWA.' },
      subTitle: { es: 'Formas de Abuso que Califican:', en: 'Forms of Abuse that Qualify:' },
      subPoints: [
        { es: 'Abuso físico: Golpes, empujones, agresiones con objetos, cualquier contacto físico violento.', en: 'Physical abuse: Hitting, pushing, assault with objects, any violent physical contact.' },
        { es: 'Abuso emocional y psicológico: Humillaciones constantes, amenazas, control extremo, aislamiento social.', en: 'Emotional and psychological abuse: Constant humiliation, threats, extreme control, social isolation.' },
        { es: 'Abuso económico: Controlar todo el dinero, prohibir trabajar, negar acceso a cuentas bancarias.', en: 'Economic abuse: Controlling all money, prohibiting work, denying access to bank accounts.' },
        { es: 'Amenazas migratorias: Usar el estatus migratorio como herramienta de control ("te voy a deportar").', en: 'Immigration threats: Using immigration status as a tool of control ("I will get you deported").' },
      ],
      solution: { es: 'Los hombres tienen exactamente los mismos requisitos y beneficios que las mujeres bajo VAWA. No existe diferencia legal. Si usted es víctima, tiene derecho a protección.', en: 'Men have exactly the same requirements and benefits as women under VAWA. There is no legal difference. If you are a victim, you have the right to protection.' },
    },
  },
  {
    id: 'vawa-padres', iconKey: 'heart',
    title: { es: 'VAWA para Padres', en: 'VAWA for Parents' },
    subtitle: { es: 'Padres Abusados por Hijos Ciudadanos', en: 'Parents Abused by Citizen Children' },
    content: {
      intro: { es: 'Protección para padres maltratados por hijos adultos ciudadanos', en: 'Protection for parents abused by adult citizen children' },
      description: { es: 'Una categoría poco conocida de VAWA permite a los padres que son víctimas de abuso por parte de sus hijos ciudadanos estadounidenses mayores de 21 años presentar una autopetición para obtener residencia. Esto aplica en situaciones donde el hijo ciudadano ejerce control o maltrato sobre el padre o la madre, especialmente cuando el padre depende del hijo para su estatus migratorio o sustento económico. Es común en familias donde los padres inmigrantes criaron a sus hijos en EE.UU. y ahora dependen de ellos. Cuando ese hijo ciudadano abusa de esa posición de poder (amenazando con no peticionarlos, controlándolos económicamente, maltratándolos física o emocionalmente), la ley VAWA ofrece una salida independiente.', en: 'A lesser-known category of VAWA allows parents who are victims of abuse by their U.S. citizen children over 21 years of age to file a self-petition to obtain residency. This applies in situations where the citizen child exercises control or mistreatment over the parent, especially when the parent depends on the child for their immigration status or financial support. It is common in families where immigrant parents raised their children in the U.S. and now depend on them. When that citizen child abuses that position of power (threatening not to petition for them, controlling them financially, physically or emotionally abusing them), the VAWA law offers an independent path.' },
      subTitle: { es: 'Situaciones Comunes:', en: 'Common Situations:' },
      subPoints: [
        { es: 'El hijo ciudadano amenaza con no pedir la residencia del padre como forma de control.', en: "The citizen child threatens not to petition for the parent's residency as a form of control." },
        { es: 'Control financiero: El hijo maneja todo el dinero y lo usa para manipular al padre.', en: 'Financial control: The child manages all the money and uses it to manipulate the parent.' },
        { es: 'Maltrato verbal, emocional o físico por parte del hijo adulto hacia el padre.', en: 'Verbal, emotional, or physical mistreatment by the adult child toward the parent.' },
        { es: 'Abandono o negligencia deliberada cuando el padre depende del hijo para cuidado o sustento.', en: 'Deliberate abandonment or neglect when the parent depends on the child for care or support.' },
      ],
      solution: { es: 'El padre no necesita que el hijo coopere ni que presente ningún formulario. La autopetición VAWA le permite al padre obtener su propia residencia de forma completamente independiente.', en: 'The parent does not need the child to cooperate or file any form. The VAWA self-petition allows the parent to obtain their own residency completely independently.' },
    },
  },
  {
    id: 'beneficios-proceso', iconKey: 'scale',
    title: { es: 'Beneficios y Proceso', en: 'Benefits & Process' },
    subtitle: { es: 'Camino hacia la Residencia', en: 'Path to Residency' },
    content: {
      intro: { es: 'Beneficios concretos al ser aprobado bajo VAWA', en: 'Concrete benefits upon approval under VAWA' },
      description: { es: 'Una vez que USCIS aprueba su autopetición VAWA (Formulario I-360), usted obtiene acceso a una serie de beneficios migratorios significativos. USCIS primero emite un "prima facie determination" (determinación inicial) que le permite acceder a ciertos beneficios mientras el caso se procesa por completo. Posteriormente, con la aprobación completa, usted queda en camino directo hacia la residencia permanente (green card). Todo el proceso está protegido por estrictas reglas de confidencialidad: USCIS no puede contactar al agresor, y la información del caso no puede ser divulgada. Esto significa que su agresor nunca sabrá que usted presentó un caso VAWA.', en: 'Once USCIS approves your VAWA self-petition (Form I-360), you gain access to a series of significant immigration benefits. USCIS first issues a "prima facie determination" that allows you to access certain benefits while the case is fully processed. Subsequently, with full approval, you are on a direct path toward permanent residency (green card). The entire process is protected by strict confidentiality rules: USCIS cannot contact the abuser, and case information cannot be disclosed. This means your abuser will never know that you filed a VAWA case.' },
      subTitle: { es: 'Beneficios al Ser Aprobado:', en: 'Benefits Upon Approval:' },
      subPoints: [
        { es: 'Permiso de Trabajo (EAD): Puede obtener autorización para trabajar legalmente en EE.UU. mientras su caso avanza.', en: 'Work Permit (EAD): You can obtain authorization to work legally in the U.S. while your case progresses.' },
        { es: 'Acción Diferida (Deferred Action): Protección contra la deportación mientras su caso está pendiente.', en: 'Deferred Action: Protection from deportation while your case is pending.' },
        { es: 'Camino a la Green Card: Con la aprobación del I-360, puede solicitar ajuste de estatus para obtener residencia permanente.', en: 'Path to Green Card: With I-360 approval, you can apply for adjustment of status to obtain permanent residency.' },
        { es: 'Confidencialidad: El agresor nunca es notificado. USCIS tiene prohibido contactarlo o revelar su caso.', en: 'Confidentiality: The abuser is never notified. USCIS is prohibited from contacting them or revealing your case.' },
        { es: 'Acceso a Beneficios Públicos: Con el prima facie, puede calificar para ciertos programas de asistencia estatal y federal.', en: 'Access to Public Benefits: With the prima facie determination, you may qualify for certain state and federal assistance programs.' },
      ],
      solution: { es: 'El proceso VAWA puede tomar entre 12 y 24 meses para la aprobación completa, pero los beneficios provisionales (permiso de trabajo y acción diferida) pueden obtenerse mucho antes con la determinación prima facie.', en: 'The VAWA process can take between 12 and 24 months for full approval, but provisional benefits (work permit and deferred action) can be obtained much sooner with the prima facie determination.' },
    },
  },
];

const processSteps: { id: number; iconKey: StepIconKey; title: Detail; desc: Detail }[] = [
  { id: 1, iconKey: 'messageSquare', title: { es: 'Consulta Confidencial', en: 'Confidential Consultation' }, desc: { es: 'Evaluamos su situación en una consulta completamente privada. Analizamos la relación con el agresor, el tipo de abuso sufrido y su elegibilidad para VAWA. Todo lo que nos comparta está protegido por el privilegio abogado-cliente.', en: 'We evaluate your situation in a completely private consultation. We analyze the relationship with the abuser, the type of abuse suffered, and your eligibility for VAWA. Everything you share is protected by attorney-client privilege.' } },
  { id: 2, iconKey: 'search', title: { es: 'Recopilación de Evidencia', en: 'Evidence Gathering' }, desc: { es: 'Reunimos toda la evidencia necesaria: su declaración personal detallada, registros médicos, mensajes, fotos, cartas de apoyo de familiares o consejeros, y cualquier documentación que demuestre el abuso y la relación de buena fe.', en: 'We gather all necessary evidence: your detailed personal statement, medical records, messages, photos, support letters from family or counselors, and any documentation that demonstrates the abuse and the good faith relationship.' } },
  { id: 3, iconKey: 'fileText', title: { es: 'Preparación y Presentación del I-360', en: 'I-360 Preparation & Filing' }, desc: { es: 'Preparamos meticulosamente el Formulario I-360 con toda la documentación de soporte. Construimos un caso sólido que demuestre cada elemento requerido por USCIS: relación, abuso, buena fe y buen carácter moral.', en: 'We meticulously prepare Form I-360 with all supporting documentation. We build a solid case demonstrating each element required by USCIS: relationship, abuse, good faith, and good moral character.' } },
  { id: 4, iconKey: 'shieldCheck', title: { es: 'Aprobación y Residencia', en: 'Approval & Residency' }, desc: { es: 'Tras la aprobación del I-360, gestionamos su permiso de trabajo, acción diferida y el ajuste de estatus para obtener su green card. Lo acompañamos en cada paso hasta que tenga su residencia permanente en mano.', en: 'After I-360 approval, we manage your work permit, deferred action, and adjustment of status to obtain your green card. We accompany you every step until you have your permanent residency in hand.' } },
];

const blogArticles: { slug: string; title: Detail; category: Detail; image: string }[] = [
  { slug: 'vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente', title: { es: 'VAWA para Hombres Maltratados por Pareja Ciudadana o Residente', en: 'VAWA for Men Abused by Citizen or Resident Partners' }, category: { es: 'VAWA', en: 'VAWA' }, image: '/blog/blog_05/B5_CR1.png' },
  { slug: 'vawa-para-padres-maltrato-de-hijos-ciudadanos-estadounidenses', title: { es: 'VAWA para Padres: Maltrato de Hijos Ciudadanos', en: 'VAWA for Parents: Abuse by Citizen Children' }, category: { es: 'VAWA', en: 'VAWA' }, image: '/blog/blog_06/B6_CR1.png' },
  { slug: 'visa-u-y-vawa-incluir-hijos-y-nuevos-esposos-derivados', title: { es: 'Visa U y VAWA: Incluir Hijos y Nuevos Esposos Derivados', en: 'U Visa & VAWA: Including Children and New Derivative Spouses' }, category: { es: 'VAWA / Visa U', en: 'VAWA / U Visa' }, image: '/blog/blog_08/B8_CR1.png' },
];

const ui = {
  badge: { es: 'Protección Legal VAWA', en: 'VAWA Legal Protection' },
  heroTitle1: { es: 'Protección para', en: 'Protection for' },
  heroTitle2: { es: 'Víctimas de Abuso', en: 'Abuse Victims' },
  heroDescription: { es: 'Si usted es víctima de violencia doméstica por parte de un cónyuge, padre o hijo ciudadano o residente permanente, la ley VAWA le permite obtener su residencia sin depender del agresor. Su caso es 100% confidencial.', en: 'If you are a victim of domestic violence by a citizen or permanent resident spouse, parent, or child, the VAWA law allows you to obtain your residency without depending on the abuser. Your case is 100% confidential.' },
  confidential: { es: 'Confidencial', en: 'Confidential' },
  private: { es: 'Privado', en: 'Private' },
  ctaConsultation: { es: 'Consulta Confidencial', en: 'Confidential Consultation' },
  processMethod: { es: 'Nuestro Proceso', en: 'Our Process' },
  processTitle: { es: 'Cómo Manejamos Su Caso VAWA', en: 'How We Handle Your VAWA Case' },
  requestEvaluation: { es: 'Solicitar Evaluación Confidencial', en: 'Request Confidential Evaluation' },
  contactTitle: { es: 'Protéjase Hoy. Consulta 100% Confidencial.', en: 'Protect Yourself Today. 100% Confidential Consultation.' },
  officesTitle: { es: 'Oficinas a Su Servicio', en: 'Offices at Your Service' },
  officesSubtitle: { es: 'Atendemos casos VAWA en 15 oficinas en Texas, California, Illinois, Colorado y Tennessee.', en: 'We handle VAWA cases in 15 offices across Texas, California, Illinois, Colorado, and Tennessee.' },
  blogTitle: { es: 'Artículos Relacionados sobre VAWA', en: 'Related VAWA Articles' },
  phoneCta: { es: 'Llame Ahora', en: 'Call Now' },
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
