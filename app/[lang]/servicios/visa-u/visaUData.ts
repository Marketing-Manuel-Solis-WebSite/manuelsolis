// Visa U data (enfoque b). Bilingual source + server resolvers (server-only).
import type { Language } from '../../../lib/translations';

export type TabIconKey = 'shield' | 'fileCheck' | 'gavel' | 'users' | 'clock';
export type StepIconKey = 'messageSquare' | 'search' | 'scale' | 'send';
export type EligIconKey = 'alertTriangle' | 'heart' | 'shieldCheck' | 'globe';
interface Detail { es: string; en: string; }

interface RawTab {
  id: string; title: Detail; subtitle: Detail; iconKey: TabIconKey;
  content: { intro: Detail; description: Detail; subTitle?: Detail; subPoints?: Detail[]; solution?: Detail };
}

const infoTabs: RawTab[] = [
  {
    id: 'general', iconKey: 'shield',
    title: { es: '¿Qué es la Visa U?', en: 'What is the U Visa?' },
    subtitle: { es: 'Protección para Víctimas de Crímenes', en: 'Protection for Crime Victims' },
    content: {
      intro: { es: 'Estatus migratorio para víctimas que cooperan con la justicia', en: 'Immigration status for victims who cooperate with law enforcement' },
      description: { es: 'La Visa U (U Nonimmigrant Status) fue creada por el Congreso de Estados Unidos bajo la Ley de Protección a Víctimas de Tráfico y Violencia (VTVPA) del año 2000. Su propósito es proteger a víctimas de ciertos crímenes graves que han sufrido abuso físico o mental sustancial y que cooperan con las autoridades policiales o fiscales en la investigación o procesamiento del delito. Este estatus permite a las víctimas permanecer legalmente en Estados Unidos, obtener permiso de trabajo y, eventualmente, solicitar la residencia permanente (Green Card) después de tres años.', en: 'The U Visa (U Nonimmigrant Status) was created by the United States Congress under the Victims of Trafficking and Violence Protection Act (VTVPA) of 2000. Its purpose is to protect victims of certain serious crimes who have suffered substantial physical or mental abuse and who cooperate with law enforcement or prosecutors in the investigation or prosecution of the crime. This status allows victims to remain legally in the United States, obtain a work permit, and eventually apply for permanent residency (Green Card) after three years.' },
      subTitle: { es: 'Crímenes que Califican:', en: 'Qualifying Crimes:' },
      subPoints: [
        { es: 'Violencia Doméstica: Abuso físico, emocional o sexual por parte de una pareja o familiar.', en: 'Domestic Violence: Physical, emotional, or sexual abuse by a partner or family member.' },
        { es: 'Agresión Sexual: Violación, abuso sexual, prostitución forzada y explotación sexual.', en: 'Sexual Assault: Rape, sexual abuse, forced prostitution, and sexual exploitation.' },
        { es: 'Tráfico Humano: Trabajo forzado, servidumbre involuntaria y trata de personas.', en: 'Human Trafficking: Forced labor, involuntary servitude, and human trafficking.' },
        { es: 'Secuestro y Extorsión: Retención ilegal de personas y amenazas para obtener dinero o favores.', en: 'Kidnapping and Extortion: Illegal detention of persons and threats to obtain money or favors.' },
        { es: 'Otros Crímenes: Tortura, homicidio (sobrevivientes), asalto agravado, fraude laboral, obstrucción de justicia, chantaje y más.', en: 'Other Crimes: Torture, murder (survivors), aggravated assault, labor fraud, obstruction of justice, blackmail, and more.' },
      ],
      solution: { es: 'La lista completa de crímenes calificantes incluye más de 25 delitos. Si fue víctima de un crimen violento en EE.UU., podría calificar incluso si no tiene estatus migratorio.', en: 'The complete list of qualifying crimes includes over 25 offenses. If you were a victim of a violent crime in the U.S., you may qualify even if you have no immigration status.' },
    },
  },
  {
    id: 'bonafide', iconKey: 'fileCheck',
    title: { es: 'Determinación Bona Fide', en: 'Bona Fide Determination' },
    subtitle: { es: 'Permiso de Trabajo Anticipado', en: 'Early Work Authorization' },
    content: {
      intro: { es: 'Protección mientras USCIS revisa su caso completo', en: 'Protection while USCIS reviews your full case' },
      description: { es: "Debido a la gran cantidad de solicitudes de Visa U y el límite anual de 10,000 visas, USCIS implementó el proceso de Determinación Bona Fide (BFD). Cuando USCIS determina que una petición de Visa U tiene mérito aparente y merece una investigación completa, emite una determinación bona fide que otorga al solicitante beneficios importantes mientras espera que una visa esté disponible. Esto incluye un permiso de trabajo (Employment Authorization Document o EAD) y una protección conocida como 'deferred action' que impide la deportación.", en: "Due to the large volume of U Visa applications and the annual cap of 10,000 visas, USCIS implemented the Bona Fide Determination (BFD) process. When USCIS determines that a U Visa petition has apparent merit and deserves a full investigation, it issues a bona fide determination that grants the applicant important benefits while waiting for a visa to become available. This includes a work permit (Employment Authorization Document or EAD) and protection known as 'deferred action' that prevents deportation." },
      subTitle: { es: 'Beneficios de la Determinación Bona Fide:', en: 'Bona Fide Determination Benefits:' },
      subPoints: [
        { es: 'Permiso de Trabajo (EAD): Autorización para trabajar legalmente en Estados Unidos mediante el formulario I-765.', en: 'Work Permit (EAD): Authorization to work legally in the United States through Form I-765.' },
        { es: 'Acción Diferida (Deferred Action): Protección contra la deportación mientras su caso está pendiente.', en: 'Deferred Action: Protection against deportation while your case is pending.' },
        { es: 'Autorización de 4 Años: El permiso de trabajo BFD se emite por un período de hasta 4 años, renovable.', en: '4-Year Authorization: The BFD work permit is issued for a period of up to 4 years, renewable.' },
        { es: 'Número de Seguro Social: Con el EAD puede solicitar un SSN para trabajar, pagar impuestos y construir historial crediticio.', en: 'Social Security Number: With the EAD you can apply for an SSN to work, pay taxes, and build credit history.' },
      ],
      solution: { es: 'La determinación bona fide no garantiza la aprobación final de la Visa U, pero ofrece estabilidad legal y laboral mientras espera. Nuestros abogados preparan su caso para maximizar las probabilidades de obtener esta determinación rápidamente.', en: 'A bona fide determination does not guarantee final U Visa approval, but it provides legal and employment stability while you wait. Our attorneys prepare your case to maximize the chances of obtaining this determination quickly.' },
    },
  },
  {
    id: 'perdon', iconKey: 'gavel',
    title: { es: 'Perdón I-192', en: 'I-192 Waiver' },
    subtitle: { es: 'Superar Inadmisibilidad', en: 'Overcoming Inadmissibility' },
    content: {
      intro: { es: 'Soluciones para víctimas con antecedentes migratorios o penales', en: 'Solutions for victims with immigration or criminal history' },
      description: { es: 'Muchas víctimas de crímenes en Estados Unidos tienen situaciones migratorias complicadas: entradas sin inspección, deportaciones previas, estancias ilegales prolongadas o incluso ciertos antecedentes penales menores. El formulario I-192 (Application for Advance Permission to Enter as Nonimmigrant) permite a solicitantes de Visa U solicitar un perdón por estos motivos de inadmisibilidad. Sin este perdón, USCIS negaría la Visa U a pesar de que la persona es una víctima legítima de un crimen.', en: 'Many crime victims in the United States have complicated immigration situations: entries without inspection, prior deportations, extended unlawful presence, or even certain minor criminal records. Form I-192 (Application for Advance Permission to Enter as Nonimmigrant) allows U Visa applicants to request a waiver for these grounds of inadmissibility. Without this waiver, USCIS would deny the U Visa even though the person is a legitimate crime victim.' },
      subTitle: { es: 'Motivos Comunes de Inadmisibilidad que se Pueden Perdonar:', en: 'Common Grounds of Inadmissibility That Can Be Waived:' },
      subPoints: [
        { es: 'Entrada Ilegal: Haber cruzado la frontera sin documentos o sin inspección por un oficial.', en: 'Illegal Entry: Having crossed the border without documents or without inspection by an officer.' },
        { es: 'Deportaciones Previas: Órdenes de deportación o remoción anteriores, incluso deportaciones voluntarias.', en: 'Prior Deportations: Previous deportation or removal orders, including voluntary departures.' },
        { es: 'Presencia Ilegal: Haber permanecido en EE.UU. más allá del tiempo autorizado por una visa.', en: 'Unlawful Presence: Having remained in the U.S. beyond the time authorized by a visa.' },
        { es: "Ciertos Antecedentes Penales: Delitos menores que no constituyen 'barras' permanentes a la admisión.", en: "Certain Criminal Records: Minor offenses that do not constitute permanent 'bars' to admission." },
      ],
      solution: { es: "El perdón I-192 para la Visa U tiene un estándar más favorable que otros perdones migratorios. USCIS evalúa si es en 'interés público' otorgar el perdón, considerando la gravedad del crimen sufrido y la cooperación con las autoridades. Nuestros abogados han logrado perdones para clientes con múltiples deportaciones.", en: "The I-192 waiver for the U Visa has a more favorable standard than other immigration waivers. USCIS evaluates whether it is in the 'public interest' to grant the waiver, considering the severity of the crime suffered and cooperation with authorities. Our attorneys have obtained waivers for clients with multiple deportations." },
    },
  },
  {
    id: 'derivados', iconKey: 'users',
    title: { es: 'Derivados', en: 'Derivatives' },
    subtitle: { es: 'Protección para su Familia', en: 'Protection for Your Family' },
    content: {
      intro: { es: 'Su familia también puede obtener estatus legal a través de la Visa U', en: 'Your family can also obtain legal status through the U Visa' },
      description: { es: "La ley de Visa U reconoce que los crímenes no solo afectan a la víctima directa, sino también a su familia. Por ello, los familiares calificados pueden ser incluidos como 'derivados' en la petición de Visa U, obteniendo los mismos beneficios: estatus legal, permiso de trabajo y, eventualmente, la posibilidad de solicitar la residencia permanente. Los familiares elegibles dependen de la edad del peticionario principal al momento de presentar la solicitud.", en: "The U Visa law recognizes that crimes do not only affect the direct victim but also their family. Therefore, qualifying family members can be included as 'derivatives' on the U Visa petition, obtaining the same benefits: legal status, work authorization, and eventually the ability to apply for permanent residency. Eligible family members depend on the age of the principal petitioner at the time of filing." },
      subTitle: { es: 'Familiares Elegibles como Derivados:', en: 'Eligible Family Members as Derivatives:' },
      subPoints: [
        { es: 'Cónyuge: El esposo o esposa del peticionario principal puede ser incluido sin importar su estatus migratorio.', en: 'Spouse: The husband or wife of the principal petitioner can be included regardless of their immigration status.' },
        { es: 'Hijos Menores de 21 Años: Los hijos solteros menores de 21 años al momento de la solicitud, incluyendo hijastros.', en: 'Children Under 21: Unmarried children under 21 at the time of filing, including stepchildren.' },
        { es: 'Padres (si el principal es menor de 21): Si la víctima principal es menor de 21 años, puede incluir a sus padres.', en: 'Parents (if principal is under 21): If the principal victim is under 21 years old, they can include their parents.' },
        { es: 'Hermanos Menores (si el principal es menor de 21): Hermanos solteros menores de 18 años del peticionario menor.', en: 'Siblings Under 18 (if principal is under 21): Unmarried siblings under 18 of the minor petitioner.' },
      ],
      solution: { es: 'Los derivados pueden ser agregados incluso después de que la Visa U del peticionario principal haya sido aprobada, siempre que el matrimonio o la relación existiera al momento de la solicitud original o se haya formado después. Nuevos esposos e hijos nacidos después también pueden calificar bajo ciertas circunstancias.', en: "Derivatives can be added even after the principal petitioner's U Visa has been approved, as long as the marriage or relationship existed at the time of the original application or was formed afterward. New spouses and children born later may also qualify under certain circumstances." },
    },
  },
  {
    id: 'proceso', iconKey: 'clock',
    title: { es: 'Proceso y Tiempos', en: 'Process & Timeline' },
    subtitle: { es: 'Qué Esperar de Principio a Fin', en: 'What to Expect from Start to Finish' },
    content: {
      intro: { es: 'Una guía paso a paso del proceso de la Visa U', en: 'A step-by-step guide to the U Visa process' },
      description: { es: 'El proceso de Visa U comienza con la certificación policial (Suplemento B del formulario I-918) y la presentación de la petición ante USCIS. Debido al límite anual de 10,000 visas y la alta demanda, los tiempos de espera pueden ser prolongados. Sin embargo, con la determinación bona fide, muchos solicitantes obtienen permisos de trabajo y protección contra la deportación en un plazo mucho más corto. USCIS ha procesado peticiones de forma más eficiente en los últimos años gracias a la política de determinaciones bona fide implementada en 2021.', en: 'The U Visa process begins with the law enforcement certification (Supplement B of Form I-918) and filing the petition with USCIS. Due to the annual cap of 10,000 visas and high demand, wait times can be lengthy. However, with the bona fide determination, many applicants obtain work permits and deportation protection in a much shorter timeframe. USCIS has processed petitions more efficiently in recent years thanks to the bona fide determination policy implemented in 2021.' },
      subTitle: { es: 'Etapas del Proceso:', en: 'Process Stages:' },
      subPoints: [
        { es: 'Certificación Policial (Suplemento B): La agencia de ley que investigó el crimen debe firmar el formulario I-918 Supplement B, certificando que usted fue víctima y cooperó en la investigación.', en: 'Law Enforcement Certification (Supplement B): The law enforcement agency that investigated the crime must sign Form I-918 Supplement B, certifying that you were a victim and cooperated in the investigation.' },
        { es: 'Presentación del Formulario I-918: Se envía la petición completa a USCIS con evidencia del crimen, certificación, declaración personal y pruebas de abuso sustancial.', en: 'Filing Form I-918: The complete petition is sent to USCIS with evidence of the crime, certification, personal statement, and proof of substantial abuse.' },
        { es: 'Determinación Prima Facie o Bona Fide: USCIS revisa la petición y, si tiene mérito, emite una determinación que otorga permiso de trabajo y protección temporal.', en: 'Prima Facie or Bona Fide Determination: USCIS reviews the petition and, if it has merit, issues a determination granting work authorization and temporary protection.' },
        { es: 'Aprobación Final y Residencia: Una vez que una visa está disponible, USCIS aprueba el estatus U. Después de 3 años en estatus U, puede solicitar la residencia permanente (Green Card).', en: 'Final Approval and Residency: Once a visa becomes available, USCIS approves U status. After 3 years in U status, you can apply for permanent residency (Green Card).' },
      ],
      solution: { es: 'Los tiempos de procesamiento varían, pero la determinación bona fide puede obtenerse en meses, no años. La aprobación final de la Visa U depende de la disponibilidad de visas bajo el límite anual. Nuestro equipo le mantiene informado en cada etapa y responde a cualquier solicitud de evidencia adicional (RFE) de USCIS.', en: 'Processing times vary, but a bona fide determination can be obtained in months, not years. Final U Visa approval depends on visa availability under the annual cap. Our team keeps you informed at every stage and responds to any requests for additional evidence (RFEs) from USCIS.' },
    },
  },
];

const processSteps: { id: number; iconKey: StepIconKey; title: Detail; desc: Detail }[] = [
  { id: 1, iconKey: 'messageSquare', title: { es: 'Consulta Inicial', en: 'Initial Consultation' }, desc: { es: 'Evaluamos su caso de forma confidencial. Analizamos los hechos del crimen, su situación migratoria actual y determinamos si califica para la Visa U u otro alivio migratorio.', en: 'We evaluate your case confidentially. We analyze the facts of the crime, your current immigration situation, and determine if you qualify for the U Visa or other immigration relief.' } },
  { id: 2, iconKey: 'search', title: { es: 'Análisis del Caso', en: 'Case Analysis' }, desc: { es: 'Revisamos reportes policiales, evidencia del crimen y documentación médica o psicológica. Identificamos la agencia de ley correcta para la certificación y anticipamos posibles obstáculos.', en: 'We review police reports, crime evidence, and medical or psychological documentation. We identify the correct law enforcement agency for certification and anticipate possible obstacles.' } },
  { id: 3, iconKey: 'scale', title: { es: 'Estrategia Legal', en: 'Legal Strategy' }, desc: { es: 'Desarrollamos una estrategia personalizada: obtenemos la certificación policial, preparamos la declaración personal, y si es necesario, presentamos el perdón I-192 simultáneamente.', en: 'We develop a personalized strategy: we obtain the law enforcement certification, prepare the personal statement, and if necessary, file the I-192 waiver simultaneously.' } },
  { id: 4, iconKey: 'send', title: { es: 'Presentación y Resultado', en: 'Filing & Outcome' }, desc: { es: 'Presentamos el caso ante USCIS, gestionamos la determinación bona fide para su permiso de trabajo, y le acompañamos hasta la aprobación final de la Visa U y la solicitud de residencia.', en: 'We file the case with USCIS, manage the bona fide determination for your work permit, and accompany you through the final U Visa approval and residency application.' } },
];

const eligibility: { iconKey: EligIconKey; title: Detail; desc: Detail }[] = [
  { iconKey: 'alertTriangle', title: { es: 'Víctima de Crimen Calificante', en: 'Victim of a Qualifying Crime' }, desc: { es: 'Debe haber sido víctima directa o indirecta de uno de los más de 25 crímenes calificantes bajo la ley, como violencia doméstica, agresión sexual, tráfico humano, secuestro, tortura, entre otros.', en: 'Must have been a direct or indirect victim of one of the 25+ qualifying crimes under the law, such as domestic violence, sexual assault, human trafficking, kidnapping, torture, among others.' } },
  { iconKey: 'heart', title: { es: 'Abuso Sustancial', en: 'Substantial Abuse' }, desc: { es: 'Debe haber sufrido abuso físico o mental sustancial como resultado del crimen. Esto se documenta con registros médicos, evaluaciones psicológicas y declaraciones personales detalladas.', en: 'Must have suffered substantial physical or mental abuse as a result of the crime. This is documented with medical records, psychological evaluations, and detailed personal statements.' } },
  { iconKey: 'shieldCheck', title: { es: 'Cooperación con Autoridades', en: 'Cooperation with Authorities' }, desc: { es: 'Debe haber cooperado, estar cooperando, o estar dispuesto a cooperar con la policía, la fiscalía u otra agencia de ley en la investigación o procesamiento del crimen.', en: 'Must have cooperated, be cooperating, or be willing to cooperate with police, prosecutors, or other law enforcement agencies in the investigation or prosecution of the crime.' } },
  { iconKey: 'globe', title: { es: 'Crimen en Estados Unidos', en: 'Crime in the United States' }, desc: { es: 'El crimen debe haber ocurrido en Estados Unidos o haber violado leyes estadounidenses. Esto incluye crímenes en territorios de EE.UU. y en bases militares en el extranjero.', en: 'The crime must have occurred in the United States or violated U.S. laws. This includes crimes in U.S. territories and on military bases abroad.' } },
];

const faqs: { q: Detail; a: Detail }[] = [
  { q: { es: '¿Puedo obtener la Visa U si soy indocumentado?', en: 'Can I get a U Visa if I am undocumented?' }, a: { es: 'Sí. La Visa U fue diseñada precisamente para proteger a víctimas de crímenes sin importar su estatus migratorio. Incluso personas que entraron sin inspección, tienen órdenes de deportación o no tienen ningún estatus pueden calificar. Si tiene motivos de inadmisibilidad, el perdón I-192 puede resolver esos obstáculos.', en: 'Yes. The U Visa was specifically designed to protect crime victims regardless of their immigration status. Even people who entered without inspection, have deportation orders, or have no status at all can qualify. If you have grounds of inadmissibility, the I-192 waiver can resolve those obstacles.' } },
  { q: { es: '¿Qué pasa si la policía no quiere firmar la certificación?', en: "What if the police won't sign the certification?" }, a: { es: 'Si la agencia de ley se niega a firmar el Suplemento B, existen estrategias legales. Podemos contactar a otras agencias que participaron en la investigación (fiscalía, FBI, EEOC, departamento de trabajo), enviar solicitudes formales explicando la obligación legal, o explorar alternativas como la Visa T o VAWA según su situación.', en: "If the law enforcement agency refuses to sign Supplement B, there are legal strategies. We can contact other agencies that participated in the investigation (prosecutor's office, FBI, EEOC, Department of Labor), send formal requests explaining the legal obligation, or explore alternatives like the T Visa or VAWA depending on your situation." } },
  { q: { es: '¿Cuánto tiempo tarda el proceso de Visa U?', en: 'How long does the U Visa process take?' }, a: { es: 'Los tiempos varían. La determinación bona fide, que otorga permiso de trabajo y protección contra deportación, puede obtenerse en varios meses después de presentar la petición. La aprobación final de la Visa U depende de la disponibilidad bajo el límite anual de 10,000 visas. Una vez aprobada, después de 3 años puede solicitar la residencia permanente.', en: 'Times vary. The bona fide determination, which grants work authorization and deportation protection, can be obtained within several months of filing the petition. Final U Visa approval depends on availability under the annual cap of 10,000 visas. Once approved, after 3 years you can apply for permanent residency.' } },
  { q: { es: '¿Mi familia puede ser incluida en mi Visa U?', en: 'Can my family be included in my U Visa?' }, a: { es: 'Sí. Como peticionario principal puede incluir a su cónyuge e hijos solteros menores de 21 años como derivados. Si usted es menor de 21 años, también puede incluir a sus padres y hermanos solteros menores de 18. Los derivados reciben los mismos beneficios: estatus legal, permiso de trabajo y camino a la residencia.', en: 'Yes. As the principal petitioner, you can include your spouse and unmarried children under 21 as derivatives. If you are under 21, you can also include your parents and unmarried siblings under 18. Derivatives receive the same benefits: legal status, work authorization, and a path to residency.' } },
  { q: { es: '¿El agresor se enterará de que solicité la Visa U?', en: 'Will the abuser find out I applied for the U Visa?' }, a: { es: 'USCIS tiene políticas estrictas de confidencialidad para proteger a las víctimas de crímenes. La información de su caso no se comparte con el agresor. Además, existen protecciones adicionales bajo la Sección 384 de la ley IIRIRA que prohíben el uso de información proporcionada por un abusador para iniciar procedimientos migratorios contra la víctima.', en: 'USCIS has strict confidentiality policies to protect crime victims. Your case information is not shared with the abuser. Additionally, there are extra protections under Section 384 of the IIRIRA law that prohibit using information provided by an abuser to initiate immigration proceedings against the victim.' } },
];

const offices = [
  'Houston Principal', 'Houston Bellaire', 'Dallas', 'San Antonio (Main St)',
  'San Antonio (Kirby)', 'El Paso', 'Harlingen', 'League City',
  'Houston (North Loop)', 'Houston (Northchase)', 'Houston Accidentes',
  'Arvada (Colorado)', 'Chicago', 'Memphis', 'Los Angeles',
];

const blogArticles: { slug: string; title: Detail; category: Detail }[] = [
  { slug: 'permiso-de-trabajo-visa-u', title: { es: 'Permiso de Trabajo con Visa U: Cómo Obtenerlo', en: 'U Visa Work Permit: How to Get It' }, category: { es: 'Visa U', en: 'U Visa' } },
  { slug: 'que-hacer-si-la-policia-no-firma-la-certificacion-visa-u', title: { es: 'Qué Hacer si la Policía No Firma la Certificación de Visa U', en: "What to Do If Police Won't Sign the U Visa Certification" }, category: { es: 'Visa U', en: 'U Visa' } },
  { slug: 'perdon-i-192-como-arreglar-con-la-visa-u-si-tienes-deportaciones-previas', title: { es: 'Perdón I-192: Cómo Arreglar con Visa U si Tienes Deportaciones', en: 'I-192 Waiver: How to Fix Your Case with U Visa Despite Deportations' }, category: { es: 'Perdón Migratorio', en: 'Immigration Waiver' } },
  { slug: 'visa-u-y-vawa-incluir-hijos-y-nuevos-esposos-derivados', title: { es: 'Visa U y VAWA: Incluir Hijos y Nuevos Esposos como Derivados', en: 'U Visa & VAWA: Including Children and New Spouses as Derivatives' }, category: { es: 'Derivados', en: 'Derivatives' } },
  { slug: 'frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria', title: { es: 'Frenar Deportación Inminente con Solicitud de Visa Humanitaria', en: 'Stop Imminent Deportation with Humanitarian Visa Application' }, category: { es: 'Deportación', en: 'Deportation' } },
];

const ui = {
  badge: { es: 'Especialistas en Visa U', en: 'U Visa Specialists' },
  heroTitle1: { es: 'Visa U para', en: 'U Visa for' },
  heroTitle2: { es: 'Víctimas de Crímenes', en: 'Crime Victims' },
  heroDescription: { es: 'Protección legal, permiso de trabajo y camino a la residencia para víctimas de crímenes que cooperan con las autoridades. Más de 35 años defendiendo a nuestra comunidad.', en: 'Legal protection, work authorization, and a path to residency for crime victims who cooperate with law enforcement. Over 35 years defending our community.' },
  ctaConsultation: { es: 'Solicitar Consulta', en: 'Request Consultation' },
  ctaCall: { es: 'Llame Ahora', en: 'Call Now' },
  experience: { es: 'Experiencia', en: 'Experience' },
  years: { es: 'Años', en: 'Years' },
  processMethod: { es: 'Nuestro Proceso', en: 'Our Process' },
  processTitle: { es: 'Cómo Protegemos su Caso', en: 'How We Protect Your Case' },
  requestEvaluation: { es: 'Solicitar Evaluación', en: 'Request Evaluation' },
  faqTitle: { es: 'Preguntas Frecuentes sobre la Visa U', en: 'Frequently Asked Questions about the U Visa' },
  faqSubtitle: { es: 'Respuestas claras a las dudas más comunes de víctimas de crímenes.', en: 'Clear answers to the most common questions from crime victims.' },
  contactTitle: { es: 'Proteja sus Derechos Hoy', en: 'Protect Your Rights Today' },
  contactSubtitle: { es: 'Si fue víctima de un crimen en Estados Unidos, podemos ayudarle a obtener estatus legal. La consulta es totalmente confidencial.', en: 'If you were a victim of a crime in the United States, we can help you obtain legal status. The consultation is fully confidential.' },
  officesTitle: { es: 'Oficinas a su Servicio', en: 'Offices at Your Service' },
  officesSubtitle: { es: 'Atendemos víctimas de crímenes en todo el país desde nuestras 15 oficinas.', en: 'We serve crime victims nationwide from our 15 offices.' },
  blogTitle: { es: 'Artículos Relacionados', en: 'Related Articles' },
  blogSubtitle: { es: 'Guías legales escritas por nuestros abogados de Visa U.', en: 'Legal guides written by our U Visa attorneys.' },
  eligibilityTitle: { es: 'Requisitos de Elegibilidad', en: 'Eligibility Requirements' },
  eligibilitySubtitle: { es: '¿Quién Califica para la Visa U?', en: 'Who Qualifies for the U Visa?' },
  bannerTitle: { es: '¿Fue Víctima de un Crimen?', en: 'Were You a Crime Victim?' },
  bannerSubtitle: { es: 'Llame ahora para una consulta confidencial con nuestros abogados de Visa U.', en: 'Call now for a confidential consultation with our U Visa attorneys.' },
  officesWord: { es: 'oficinas', en: 'offices' },
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
export function resolveEligibility(lang: Language) {
  return eligibility.map((e) => ({ iconKey: e.iconKey, title: e.title[lang], desc: e.desc[lang] }));
}
export function resolveFaqs(lang: Language) {
  return faqs.map((f) => ({ q: f.q[lang], a: f.a[lang] }));
}
export function resolveBlog(lang: Language) {
  return blogArticles.map((b) => ({ slug: b.slug, title: b.title[lang], category: b.category[lang] }));
}
export function getOffices() { return offices; }
export function resolveUi(lang: Language): ResolvedUi {
  const out = {} as ResolvedUi;
  (Object.keys(ui) as (keyof typeof ui)[]).forEach((k) => { out[k] = ui[k][lang]; });
  return out;
}
