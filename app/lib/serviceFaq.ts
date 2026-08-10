import type { FaqPair } from './faqSchema';

/**
 * Preguntas frecuentes de las páginas de servicio.
 *
 * ════════════════════════════════════════════════════════════════════════
 *  ESTE CONTENIDO NO SE PUBLICA HASTA QUE UN ABOGADO LO APRUEBE.
 *
 *  Cada bloque lleva `approved: false`. Mientras esté en false, la página no
 *  muestra la sección ni emite el FAQPage: `getServiceFaqs()` devuelve una
 *  lista vacía y `FaqSection` no renderiza nada. Aprobar es poner `true` en
 *  un bloque; se aprueban de uno en uno, no todos a la vez.
 *
 *  El texto para revisar está en docs/REVISION-FAQ-SERVICIOS.md, generado
 *  desde este archivo (`npm run faq:review`) para que el abogado lea las
 *  respuestas en un solo documento y no en catorce páginas.
 * ════════════════════════════════════════════════════════════════════════
 *
 * Reglas con las que está escrito, que son las que hicieron que los 20
 * artículos del blog aguantaran la verificación:
 *
 *   · Solo derecho estable. Nada que dependa de una norma en litigio o de una
 *     política que cambie con la administración.
 *   · Ni un nombre de caso, monto, plazo o tribunal que no sea verificable.
 *     Los pocos plazos y citas que aparecen van listados en `verificar` para
 *     que el abogado los confirme con la norma vigente.
 *   · Ningún resultado prometido. Se dice "depende de" cuando depende.
 *   · **La evaluación sin costo y el cobro por contingencia son de
 *     ACCIDENTES.** En inmigración se cotiza por trámite. Decir "consulta
 *     gratis" en general ya provocó una respuesta falsa del chat del sitio.
 *   · Cada respuesta contesta lo que se preguntó. Si la respuesta honesta es
 *     "depende", se explica de qué depende en vez de rellenar.
 */

export type BiText = { es: string; en: string };

export type ServiceFaqSet = {
  /** Slug de la carpeta en app/[lang]/servicios/. */
  service: string;
  /** false hasta que un abogado firme. Mientras: no se renderiza ni se marca. */
  approved: boolean;
  /**
   * Puntos que el revisor debe confirmar contra la norma vigente. Salen en el
   * documento de revisión; no se publican en la página.
   */
  verificar: string[];
  faqs: { q: BiText; a: BiText }[];
};

// ───────────────────────────────────────────────────────────── inmigración
const inmigracion: ServiceFaqSet = {
  service: 'inmigracion',
  approved: false,
  verificar: [
    'La regla de que la entrada sin inspección impide, por lo general, el ajuste de estatus dentro de EE. UU., y las excepciones que se mencionan (245(i), VAWA, Visa U).',
    'Que el perdón provisional por presencia ilegal (I-601A) siga tramitándose antes de salir del país.',
    '¿Conviene nombrar el formulario I-601A o dejarlo como "perdón provisional" sin número?',
  ],
  faqs: [
    {
      q: {
        es: '¿Qué trámites entran en un caso de inmigración?',
        en: 'What does an immigration case cover?',
      },
      a: {
        es: 'Peticiones familiares, ajuste de estatus dentro del país, trámite consular fuera de él, permisos de trabajo, ciudadanía, asilo, VAWA, Visa U, visas de inversionista y defensa contra la deportación. No son trámites intercambiables: cuál corresponde depende de cómo entró al país, de su situación actual y de qué familiares o hechos puede acreditar, y elegir el equivocado cuesta tiempo y a veces cierra puertas.',
        en: 'Family petitions, adjustment of status inside the country, consular processing outside it, work permits, citizenship, asylum, VAWA, U visas, investor visas and deportation defense. These are not interchangeable: which one applies depends on how you entered the country, your current situation, and which relatives or facts you can document — and picking the wrong one costs time and can sometimes close doors.',
      },
    },
    {
      q: {
        es: '¿Puedo arreglar mi situación si entré sin permiso?',
        en: 'Can I fix my status if I entered without permission?',
      },
      a: {
        es: 'A veces sí, pero el camino es distinto. Por regla general, quien entró sin ser inspeccionado no puede ajustar su estatus dentro de Estados Unidos aunque tenga un familiar que lo pida, y tendría que hacer el trámite en el consulado de su país. Hay excepciones importantes —entre ellas VAWA y la Visa U— y existe un perdón provisional por presencia ilegal que se resuelve antes de salir, precisamente para no arriesgarse a salir sin saber si podrá volver. Cuál de estos caminos aplica depende de fechas y hechos concretos de su historia, así que es lo primero que hay que revisar.',
        en: 'Sometimes yes, but the path is different. As a general rule, someone who entered without being inspected cannot adjust status inside the United States even with a relative petitioning for them, and would have to complete the process at their home country’s consulate. There are important exceptions — VAWA and the U visa among them — and there is a provisional waiver for unlawful presence that is decided before you leave, precisely so you do not risk departing without knowing whether you can return. Which of these applies depends on specific dates and facts in your history, so that is the first thing to review.',
      },
    },
    {
      q: {
        es: '¿Cuánto tarda un trámite migratorio?',
        en: 'How long does an immigration case take?',
      },
      a: {
        es: 'Depende de dos cosas distintas que conviene no confundir: cuánto tarda la oficina en revisar su solicitud, y si su categoría tiene cupo anual. Los familiares inmediatos de ciudadanos no esperan turno de visa; las categorías de preferencia sí, y ahí la espera depende también del país de nacimiento. Cualquiera que le prometa una fecha exacta antes de mirar su categoría le está prometiendo algo que no controla.',
        en: 'It depends on two separate things worth not confusing: how long the agency takes to review your application, and whether your category has an annual cap. Immediate relatives of U.S. citizens do not wait for a visa number; preference categories do, and there the wait also depends on country of birth. Anyone who promises you an exact date before looking at your category is promising something they do not control.',
      },
    },
    {
      q: {
        es: '¿Puedo hacer el trámite yo solo, sin abogado?',
        en: 'Can I file on my own, without a lawyer?',
      },
      a: {
        es: 'Legalmente sí. El riesgo no es perder la cuota: es que un error o una respuesta mal dada puede acabar en una negación, y una negación puede traer consecuencias que van más allá del trámite, como acabar en corte de inmigración. Y una advertencia concreta para nuestra comunidad: en Estados Unidos un "notario público" NO es abogado y no puede representarle en un caso migratorio, aunque en varios países de origen la palabra signifique otra cosa.',
        en: 'Legally, yes. The risk is not losing the filing fee: it is that a mistake or a badly worded answer can lead to a denial, and a denial can carry consequences beyond the application itself, such as ending up in immigration court. And one specific warning for our community: in the United States a "notario público" is NOT a lawyer and cannot represent you in an immigration case, even though the word means something different in several countries of origin.',
      },
    },
    {
      q: {
        es: '¿Un problema criminal afecta mi caso de inmigración?',
        en: 'Does a criminal issue affect my immigration case?',
      },
      a: {
        es: 'Sí, y a veces de forma decisiva. Hay condenas que hacen a una persona deportable, otras que le impiden entrar de nuevo al país y otras que cierran la puerta a beneficios a los que de otro modo tendría derecho. Por eso lo peor que se puede hacer es aceptar un acuerdo en la corte criminal para salir rápido sin que alguien haya analizado antes qué efecto migratorio tiene. Si tiene un caso criminal abierto, dígalo en la primera conversación aunque le parezca menor.',
        en: 'Yes, and sometimes decisively. Some convictions make a person deportable, others bar re-entry to the country, and others close off benefits the person would otherwise qualify for. That is why the worst thing you can do is accept a plea in criminal court to get out quickly without someone first analyzing its immigration effect. If you have an open criminal case, say so in the first conversation even if it seems minor.',
      },
    },
    {
      q: {
        es: '¿Qué documentos debo llevar a la primera cita?',
        en: 'What documents should I bring to the first appointment?',
      },
      a: {
        es: 'Lo que tenga, aunque esté incompleto: pasaportes, cualquier papel de una entrada o salida del país, recibos y notificaciones de trámites anteriores, notificaciones de corte, actas de matrimonio o nacimiento, y papeles de cualquier caso criminal. Si no sabe qué se presentó antes en su nombre, se puede pedir su propio expediente migratorio al gobierno, que es la manera de dejar de trabajar de memoria. No hace falta tenerlo todo para la primera conversación.',
        en: 'Whatever you have, even if it is incomplete: passports, any paperwork from an entry or exit, receipts and notices from earlier filings, court notices, marriage or birth certificates, and paperwork from any criminal case. If you do not know what was filed in your name before, you can request your own immigration file from the government, which is how you stop working from memory. You do not need all of it for the first conversation.',
      },
    },
  ],
};

// ───────────────────────────────────────────────────────────────── asilo
const asilo: ServiceFaqSet = {
  service: 'asilo',
  approved: false,
  verificar: [
    'Los cinco motivos protegidos, tal como se enuncian (raza, religión, nacionalidad, opinión política y pertenencia a un grupo social determinado).',
    'El plazo general de un año desde la última entrada y sus excepciones por circunstancias cambiadas o extraordinarias.',
    'La respuesta sobre el permiso de trabajo dice a propósito que el plazo ha cambiado varias veces y no da una cifra. Confirmar si conviene dar la vigente o dejarlo así.',
    'La respuesta sobre el paso por terceros países está redactada sin afirmar la regla vigente, porque ha cambiado repetidamente. Confirmar si se deja o se concreta.',
  ],
  faqs: [
    {
      q: { es: '¿Quién califica para pedir asilo?', en: 'Who qualifies for asylum?' },
      a: {
        es: 'Quien sufrió persecución o tiene un temor fundado de sufrirla en su país por su raza, su religión, su nacionalidad, sus opiniones políticas o por pertenecer a un grupo social determinado. Dos cosas que suelen sorprender: el peligro puede venir de alguien que no es el gobierno, si el gobierno no puede o no quiere protegerle; y la pobreza, la falta de trabajo o la violencia generalizada, por graves que sean, no encajan por sí solas en ninguno de esos cinco motivos. Ahí es donde se gana o se pierde un caso, y por eso importa cómo se cuenta la historia.',
        en: 'Someone who suffered persecution, or has a well-founded fear of it in their country, because of race, religion, nationality, political opinion, or membership in a particular social group. Two things usually surprise people: the danger can come from someone who is not the government, if the government cannot or will not protect you; and poverty, lack of work, or generalized violence, however severe, do not on their own fit any of those five grounds. That is where a case is won or lost, which is why how the story is told matters.',
      },
    },
    {
      q: { es: '¿Hay un plazo para pedir asilo?', en: 'Is there a deadline to apply for asylum?' },
      a: {
        es: 'Sí. Por regla general la solicitud debe presentarse dentro del primer año desde la última entrada al país, y es uno de los plazos que más casos hunde por desconocerse. La ley admite excepciones cuando las circunstancias cambiaron o cuando hubo motivos extraordinarios para la demora, pero son excepciones que hay que acreditar, no un margen automático. Si cree que ya pasó el año, sigue valiendo la pena consultarlo en vez de darlo por perdido.',
        en: 'Yes. As a general rule the application must be filed within one year of your last entry into the country, and it is one of the deadlines that sinks the most cases simply because people do not know about it. The law allows exceptions when circumstances changed or there were extraordinary reasons for the delay, but those are exceptions you have to prove, not an automatic grace period. If you think the year has passed, it is still worth asking rather than assuming it is lost.',
      },
    },
    {
      q: {
        es: '¿Puedo trabajar legalmente mientras esperan mi caso?',
        en: 'Can I work legally while my case is pending?',
      },
      a: {
        es: 'Se puede pedir un permiso de trabajo cuando la solicitud de asilo lleva cierto tiempo pendiente; no se obtiene al presentarla. Aquí no le damos una cifra a propósito: ese plazo y sus requisitos han cambiado varias veces en los últimos años, y una cifra desactualizada en esta página haría que alguien pidiera el permiso antes de tiempo y perdiera la cuota. Es de las primeras cosas que conviene confirmar con la regla vigente al momento de presentar.',
        en: 'You can apply for a work permit once the asylum application has been pending for a certain time; you do not get one just by filing. We deliberately do not give a number here: that waiting period and its requirements have changed several times in recent years, and an out-of-date number on this page would lead someone to apply too early and lose the fee. It is one of the first things to confirm against the rule in force when you file.',
      },
    },
    {
      q: {
        es: '¿Puedo incluir a mi esposo o esposa y a mis hijos?',
        en: 'Can I include my spouse and children?',
      },
      a: {
        es: 'Sí. El cónyuge y los hijos solteros menores de 21 años pueden incluirse en la solicitud si están en Estados Unidos, y si están fuera existe la vía para reunirlos después de que el asilo se conceda. Dos avisos prácticos: la edad del hijo se cuenta en un momento determinado del trámite, así que las demoras importan; y conviene decir desde el principio quién está fuera del país, porque cambia cómo se arma el caso.',
        en: 'Yes. A spouse and unmarried children under 21 can be included in the application if they are in the United States, and if they are abroad there is a route to reunite them after asylum is granted. Two practical notes: a child’s age is measured at a specific point in the process, so delays matter; and it is worth saying from the start who is outside the country, because it changes how the case is built.',
      },
    },
    {
      q: {
        es: '¿Qué diferencia hay entre pedir asilo en la oficina y pedirlo ante un juez?',
        en: 'What is the difference between applying at the agency and applying before a judge?',
      },
      a: {
        es: 'Es la diferencia entre presentarlo por su cuenta ante la oficina de inmigración, sin tener un proceso de deportación abierto, y presentarlo como defensa cuando ya está en corte. La primera es una entrevista; la segunda es una audiencia con un juez y un abogado del gobierno del otro lado. La preparación no es la misma, y una solicitud presentada sin saber en cuál de las dos situaciones está es una solicitud mal preparada.',
        en: 'It is the difference between filing on your own with the immigration agency, without removal proceedings open, and filing it as a defense when you are already in court. The first is an interview; the second is a hearing before a judge with a government attorney on the other side. Preparation is not the same, and an application filed without knowing which of the two situations you are in is a poorly prepared application.',
      },
    },
    {
      q: {
        es: '¿Me perjudica haber pasado por otros países antes de llegar?',
        en: 'Does passing through other countries before arriving hurt my case?',
      },
      a: {
        es: 'Puede pesar, y es uno de los puntos donde las reglas han cambiado repetidamente en los últimos años, así que en esta página no afirmamos cuál rige hoy: hay que revisarlo con la norma vigente el día que se presenta. Lo que sí es constante es que conviene contar la ruta completa y con fechas desde la primera conversación. Ocultar un tramo del viaje se descubre casi siempre, y cuando se descubre daña la credibilidad de todo el relato, que en asilo es lo que más vale.',
        en: 'It can weigh against you, and it is one of the areas where the rules have changed repeatedly in recent years, so this page does not state which one governs today: it has to be checked against the rule in force on the day you file. What is constant is that you should describe the full route, with dates, from the first conversation. Hiding a leg of the journey almost always comes out, and when it does it damages the credibility of the whole account — which in asylum is what matters most.',
      },
    },
  ],
};

// ────────────────────────────────────────────────────────────────── VAWA
const vawa: ServiceFaqSet = {
  service: 'vawa',
  approved: false,
  verificar: [
    'Quiénes pueden autopeticionar: cónyuge, hijo o padre/madre maltratado por ciudadano o residente permanente.',
    'La confidencialidad: que la agencia no notifica al agresor de la autopetición y que la ley restringe el uso de información proveniente del agresor.',
    'El plazo de DOS AÑOS desde el divorcio para autopeticionar cuando el matrimonio terminó. Es la única cifra del bloque y hay que confirmarla.',
    'Que NO se exige condena penal del agresor para que la autopetición proceda.',
  ],
  faqs: [
    {
      q: { es: '¿Quién puede pedir VAWA?', en: 'Who can file under VAWA?' },
      a: {
        es: 'El cónyuge, el hijo o el padre o madre que sufrió maltrato físico o crueldad extrema por parte de un ciudadano estadounidense o de un residente permanente. Lo que distingue a VAWA de una petición familiar normal es que se presenta uno mismo: no hace falta que el agresor firme nada, ni que se entere, ni que coopere. Precisamente por eso existe, porque en estos casos la petición familiar corriente pone la vida de alguien en manos de quien le está haciendo daño.',
        en: 'A spouse, child, or parent who suffered battery or extreme cruelty at the hands of a U.S. citizen or lawful permanent resident. What sets VAWA apart from an ordinary family petition is that you file it yourself: the abuser does not have to sign anything, find out, or cooperate. That is exactly why it exists — in these cases an ordinary family petition puts someone’s life in the hands of the person harming them.',
      },
    },
    {
      q: {
        es: '¿Se va a enterar mi agresor de que presenté el caso?',
        en: 'Will my abuser find out that I filed?',
      },
      a: {
        es: 'Es la pregunta que más se hace, y la respuesta es que no: la agencia no le notifica de la autopetición, y la ley protege esa confidencialidad de forma expresa, incluyendo límites a que se actúe en su contra basándose solo en lo que el agresor diga de usted. Aun así hay cosas prácticas que conviene planear con su abogado desde el principio, como a qué dirección llega el correo y quién más tiene acceso a ella.',
        en: 'It is the most common question, and the answer is no: the agency does not notify them of the self-petition, and the law expressly protects that confidentiality, including limits on acting against you based only on what the abuser says about you. Even so, there are practical matters worth planning with your attorney from the start, such as which address the mail goes to and who else has access to it.',
      },
    },
    {
      q: { es: '¿VAWA sirve si soy hombre?', en: 'Does VAWA apply if I am a man?' },
      a: {
        es: 'Sí. El nombre de la ley habla de mujeres y eso hace que muchos hombres ni pregunten, pero la protección no distingue por sexo: un hombre maltratado por su esposa ciudadana o residente puede autopeticionar igual, y lo mismo vale en una pareja del mismo sexo. Es probablemente el malentendido que deja más casos sin presentar.',
        en: 'Yes. The law’s name refers to women, which stops many men from even asking, but the protection does not distinguish by sex: a man abused by his U.S. citizen or resident wife can self-petition just the same, and the same is true in a same-sex marriage. It is probably the misunderstanding that leaves the most cases unfiled.',
      },
    },
    {
      q: {
        es: '¿Sirve si ya me divorcié o si la relación terminó?',
        en: 'Does it still apply if I am divorced or the relationship ended?',
      },
      a: {
        es: 'Puede servir. La ley permite autopeticionar dentro de los dos años siguientes al divorcio cuando existe conexión entre el maltrato y el fin del matrimonio. Es un plazo corto y se cuenta desde que el divorcio quedó firme, así que si su matrimonio terminó conviene consultarlo pronto y no esperar a reunir "más pruebas": la fecha corre igual.',
        en: 'It may. The law allows self-petitioning within two years of the divorce when there is a connection between the abuse and the end of the marriage. It is a short window counted from when the divorce became final, so if your marriage has ended it is worth asking soon rather than waiting to gather "more evidence": the clock runs either way.',
      },
    },
    {
      q: { es: '¿Qué pruebas hacen falta?', en: 'What evidence is needed?' },
      a: {
        es: 'Que la relación existió, que el agresor es ciudadano o residente, que vivieron juntos y que hubo maltrato. Y aquí lo importante: no se exige una condena penal del agresor, ni siquiera que se haya denunciado. Sirven reportes de policía, informes médicos, órdenes de protección, mensajes, fotos, cartas de terapeutas o de refugios, y declaraciones propias y de quien lo presenció. Mucha gente descarta su caso creyendo que sin denuncia no hay nada que hacer, y no es así.',
        en: 'That the relationship existed, that the abuser is a citizen or resident, that you lived together, and that there was abuse. And here is the key point: no criminal conviction of the abuser is required, nor even that it was ever reported. Police reports, medical records, protective orders, messages, photos, letters from therapists or shelters, and statements from you and from witnesses all count. Many people write off their case believing that without a police report there is nothing to be done, and that is not so.',
      },
    },
    {
      q: { es: '¿VAWA me da la residencia directamente?', en: 'Does VAWA grant residency directly?' },
      a: {
        es: 'No de forma inmediata. La autopetición aprobada es el reconocimiento de que califica y lo que abre el camino; la residencia se pide después, en un paso propio. La ventaja práctica es que quienes califican por VAWA pueden hacer ese segundo paso en situaciones en que otras personas no podrían, lo que en muchos casos es justamente lo que resuelve el problema.',
        en: 'Not immediately. An approved self-petition is the recognition that you qualify and what opens the path; residency is requested afterward, in a separate step. The practical advantage is that VAWA self-petitioners can take that second step in situations where others could not, which in many cases is exactly what solves the problem.',
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────── familia
const familia: ServiceFaqSet = {
  service: 'familia',
  approved: false,
  verificar: [
    'A quién puede pedir un ciudadano (cónyuge, hijos, padres si tiene 21+, hermanos si tiene 21+) y a quién un residente permanente (cónyuge e hijos solteros).',
    'La distinción entre familiar inmediato (sin cupo anual) y categoría de preferencia (con cupo y turno de visa).',
    'Que existe protección legal para el hijo que cumple 21 durante el trámite, y si conviene nombrarla o dejarla como "protección de la ley".',
    'Que no existe petición familiar para pareja no casada, y la mención de la visa de novio o novia solo para peticionarios ciudadanos.',
  ],
  faqs: [
    {
      q: { es: '¿A qué familiares puedo pedir?', en: 'Which relatives can I petition for?' },
      a: {
        es: 'Depende de si usted es ciudadano o residente permanente, y no es un detalle menor. Un ciudadano puede pedir a su cónyuge, a sus hijos, a sus padres si ya tiene 21 años y a sus hermanos si ya tiene 21 años. Un residente permanente puede pedir a su cónyuge y a sus hijos solteros, y no a sus padres ni a sus hermanos. Primos, tíos y abuelos no entran en ninguna de las dos listas, por cercana que sea la relación.',
        en: 'It depends on whether you are a citizen or a lawful permanent resident, and that is no small detail. A citizen can petition for a spouse, children, parents (once the citizen is 21), and siblings (once the citizen is 21). A permanent resident can petition for a spouse and unmarried children, and not for parents or siblings. Cousins, aunts and uncles, and grandparents are on neither list, however close the relationship.',
      },
    },
    {
      q: {
        es: '¿Por qué unos casos avanzan rápido y otros llevan años?',
        en: 'Why do some cases move quickly and others take years?',
      },
      a: {
        es: 'Porque no todas las categorías tienen cupo. Los familiares inmediatos de un ciudadano —cónyuge, hijos solteros menores de 21 y padres— no esperan turno de visa: en cuanto se aprueba y se cumplen los requisitos, se puede seguir. Las demás categorías tienen un número limitado de visas al año, así que hay que esperar turno, y ese turno depende además del país de nacimiento. Es la explicación de por qué dos vecinos con "el mismo trámite" llevan esperas completamente distintas.',
        en: 'Because not every category has a cap. Immediate relatives of a citizen — spouse, unmarried children under 21, and parents — do not wait for a visa number: once approved and the requirements are met, you can move forward. Other categories have a limited number of visas per year, so you wait your turn, and that turn also depends on country of birth. It explains why two neighbors with "the same case" face completely different waits.',
      },
    },
    {
      q: {
        es: '¿Mi familiar tiene que salir del país para arreglar?',
        en: 'Does my relative have to leave the country to get residency?',
      },
      a: {
        es: 'Depende sobre todo de cómo entró. Quien entró con visa e inspección suele poder hacer el trámite sin salir. Quien entró sin ser inspeccionado normalmente tendría que hacerlo en el consulado, y ahí aparece el problema de la presencia ilegal, que puede impedir el regreso durante años. Existe un perdón que se resuelve antes de salir precisamente para no jugarse eso a ciegas. Salir del país antes de tener esto resuelto es el error más caro que se comete en estos casos.',
        en: 'It depends mainly on how they entered. Someone who entered with a visa and inspection can usually complete the process without leaving. Someone who entered without inspection would normally have to do it at the consulate, and that is where unlawful presence becomes a problem, since it can bar return for years. There is a waiver decided before departure precisely so you do not gamble on that blindly. Leaving the country before this is resolved is the most expensive mistake made in these cases.',
      },
    },
    {
      q: {
        es: '¿Puedo pedir a mi pareja si no estamos casados?',
        en: 'Can I petition for my partner if we are not married?',
      },
      a: {
        es: 'No. La petición familiar exige un vínculo legal, y vivir juntos muchos años o tener hijos en común no lo sustituye para este fin. Si usted es ciudadano y su pareja está fuera del país, existe una visa de novio o novia que lleva al matrimonio ya en Estados Unidos. Si es residente permanente, esa vía no está disponible. Conviene saberlo antes de hacer planes, porque cambia el orden de las cosas.',
        en: 'No. A family petition requires a legal relationship, and living together for years or having children in common does not substitute for it here. If you are a citizen and your partner is abroad, there is a fiancé visa that leads to marriage in the United States. If you are a permanent resident, that route is not available. It is worth knowing before making plans, because it changes the order of things.',
      },
    },
    {
      q: {
        es: '¿Qué pasa si mi hijo cumple 21 años mientras esperamos?',
        en: 'What if my child turns 21 while we wait?',
      },
      a: {
        es: 'Es un riesgo real y tiene nombre propio en la práctica: al cumplir 21 el hijo puede salirse de la categoría en la que estaba y pasar a otra con espera mucho más larga. La ley prevé una protección que, en ciertos casos, permite conservar la categoría original según cómo se calcule la edad dentro del trámite. No es automática ni cubre todos los supuestos, y es una de las razones por las que en estos casos las demoras cuestan más de lo que parece.',
        en: 'It is a real risk with a name in practice: on turning 21 a child can fall out of the category they were in and move to one with a far longer wait. The law provides a protection that, in certain cases, preserves the original category depending on how age is calculated within the process. It is neither automatic nor applicable to every situation, and it is one reason delays cost more than they appear to in these cases.',
      },
    },
    {
      q: {
        es: '¿Puedo pedir a alguien si yo tengo pocos ingresos?',
        en: 'Can I petition for someone if my income is low?',
      },
      a: {
        es: 'Quien pide tiene que comprometerse a mantener económicamente al familiar, y ese compromiso se acredita con documentos. Si sus ingresos no alcanzan el nivel exigido, la ley permite en muchos casos sumar a otra persona que se comprometa junto con usted. Es un obstáculo frecuente y casi siempre resoluble, pero conviene mirarlo al principio y no cuando ya está todo presentado.',
        en: 'The petitioner has to commit to financially supporting the relative, and that commitment is documented. If your income does not reach the required level, the law in many cases allows another person to take on the commitment alongside you. It is a common obstacle and almost always solvable, but it is better to look at it at the start rather than once everything is filed.',
      },
    },
  ],
};

// ────────────────────────────────────────────────────────── ley criminal
const leyCriminal: ServiceFaqSet = {
  service: 'ley-criminal',
  approved: false,
  verificar: [
    'La cita de Padilla v. Kentucky: que el abogado defensor debe asesorar sobre las consecuencias migratorias de un acuerdo. Es el único caso nombrado en todo el archivo.',
    'Que la definición migratoria de "condena" puede abarcar supuestos sin sentencia formal cuando hubo admisión de culpa y alguna forma de castigo.',
    'El tratamiento del DUI: que no suele ser por sí solo causa de deportación pero pesa en decisiones discrecionales y en el buen carácter moral.',
  ],
  faqs: [
    {
      q: {
        es: '¿Un cargo criminal puede costarme mi caso de inmigración?',
        en: 'Can a criminal charge cost me my immigration case?',
      },
      a: {
        es: 'Sí, y esa es la razón de que estos dos temas no se puedan llevar por separado. Hay condenas que convierten a una persona en deportable, otras que le impiden volver a entrar al país y otras que le cierran beneficios a los que tendría derecho de no ser por ellas. El detalle decisivo no es la gravedad que le parezca a usted, sino cómo está clasificado el delito y cómo quedó redactado el acuerdo, y eso se decide en la corte criminal, no después.',
        en: 'Yes, and that is why these two matters cannot be handled separately. Some convictions make a person deportable, others bar re-entry to the country, and others close off benefits they would otherwise qualify for. The decisive detail is not how serious it seems to you, but how the offense is classified and how the plea was worded — and that is decided in criminal court, not afterward.',
      },
    },
    {
      q: {
        es: '¿Me conviene declararme culpable para salir rápido de la cárcel?',
        en: 'Should I plead guilty to get out of jail quickly?',
      },
      a: {
        es: 'Es la decisión que arruina más casos migratorios, y casi siempre se toma con prisa y sin información. Un acuerdo que parece bueno porque le saca hoy de la cárcel puede ser una condena para efectos migratorios que mañana lo deje sin defensa alguna. La Corte Suprema estableció en Padilla v. Kentucky que el abogado defensor tiene el deber de asesorar sobre esas consecuencias antes de que usted acepte. Si nadie le ha explicado el efecto migratorio, no firme.',
        en: 'It is the decision that ruins the most immigration cases, and it is almost always made in a hurry and without information. A plea that looks good because it gets you out of jail today can be a conviction for immigration purposes that leaves you with no defense tomorrow. The Supreme Court held in Padilla v. Kentucky that defense counsel has a duty to advise on those consequences before you accept. If nobody has explained the immigration effect, do not sign.',
      },
    },
    {
      q: {
        es: 'Mi caso se desestimó y no hubo condena. ¿Entonces no me afecta?',
        en: 'My case was dismissed with no conviction. So it does not affect me?',
      },
      a: {
        es: 'No necesariamente. "Condena" para inmigración no significa exactamente lo mismo que en la corte criminal: hay resoluciones que allí se sienten como un caso cerrado y que aquí pueden contar, sobre todo cuando hubo admisión de culpa y alguna forma de castigo, aunque nunca se dictara sentencia formal. Y aunque no cuente como condena, el arresto puede aparecer en los antecedentes que revisa inmigración. Es un punto donde la intuición engaña, y conviene revisar el expediente completo.',
        en: 'Not necessarily. "Conviction" for immigration purposes does not mean exactly what it means in criminal court: some dispositions feel like a closed case there and can still count here, especially where there was an admission of guilt and some form of punishment, even without a formal judgment. And even where it is not a conviction, the arrest can appear in the background checks immigration runs. This is a point where intuition misleads, and the full record should be reviewed.',
      },
    },
    {
      q: {
        es: '¿Un DUI me impide arreglar papeles o hacerme ciudadano?',
        en: 'Does a DUI stop me from getting residency or citizenship?',
      },
      a: {
        es: 'Un DUI aislado no suele ser por sí solo causa de deportación, pero eso está lejos de significar que no importe. Pesa en las decisiones que la autoridad toma con discrecionalidad y en el requisito de buen carácter moral que se examina para la ciudadanía, y varios episodios pesan mucho más que uno. En la práctica suele ser cuestión de cuándo presentar y con qué documentación, no de si se puede.',
        en: 'A single DUI is usually not on its own a ground of deportation, but that is far from meaning it does not matter. It weighs on decisions the authorities make at their discretion and on the good moral character requirement examined for citizenship, and several incidents weigh much more heavily than one. In practice it is usually a question of when to file and with what documentation, not whether you can.',
      },
    },
    {
      q: {
        es: 'Tengo miedo de ir a la corte criminal. ¿Puedo no presentarme?',
        en: 'I am afraid to go to criminal court. Can I skip it?',
      },
      a: {
        es: 'No presentarse es la peor de las opciones: se emite una orden de arresto, el caso empeora y se pierde la posibilidad de negociar en buenas condiciones. El miedo es entendible y hay que planearlo con su abogado —a qué hora, por dónde, quién le acompaña, qué se dice y qué no—, pero la solución nunca es faltar. Faltar convierte un problema manejable en dos problemas, uno criminal y otro migratorio.',
        en: 'Not appearing is the worst option: a warrant is issued, the case gets worse, and you lose the ability to negotiate from a decent position. The fear is understandable and should be planned around with your attorney — what time, which entrance, who comes with you, what is said and what is not — but the answer is never to miss it. Missing turns one manageable problem into two, one criminal and one immigration.',
      },
    },
    {
      q: {
        es: '¿Necesito un abogado criminal y otro de inmigración?',
        en: 'Do I need one criminal lawyer and another for immigration?',
      },
      a: {
        es: 'Necesita que las dos cosas se decidan juntas, que no es lo mismo que tener dos abogados que no se hablan. La estrategia en la corte criminal —qué se acepta, con qué palabras, a cambio de qué— tiene que negociarse ya sabiendo qué efecto migratorio produce cada opción. Cuando eso se hace después, muchas veces ya no hay nada que arreglar; por eso aquí se atienden las dos materias.',
        en: 'You need the two to be decided together, which is not the same as having two lawyers who never speak. The strategy in criminal court — what is accepted, in what words, in exchange for what — has to be negotiated already knowing the immigration effect of each option. When that happens afterward, there is often nothing left to fix; that is why both areas are handled here.',
      },
    },
  ],
};

// ────────────────────────────────────────────────────────────── accidentes
const accidentes: ServiceFaqSet = {
  service: 'accidentes',
  approved: false,
  verificar: [
    'EL PLAZO DE TEXAS: dos años desde la fecha de la lesión para demandar por lesiones personales. Es la cifra más importante del archivo. Confirmar también que se advierte que otros estados donde opera el despacho tienen plazos distintos.',
    'El aviso de que los reclamos contra entidades públicas tienen plazos de notificación mucho más cortos.',
    'Que el estatus migratorio no elimina el derecho a reclamar por lesiones.',
    'La peculiaridad de Texas: que un patrón puede no tener cobertura de compensación laboral ("nonsubscriber") y que eso cambia el remedio disponible.',
    'La descripción de la cobertura contra conductores sin seguro o con seguro insuficiente como cobertura de la propia póliza.',
  ],
  faqs: [
    {
      q: {
        es: '¿Cuánto tiempo tengo para reclamar después de un accidente?',
        en: 'How long do I have to file a claim after an accident?',
      },
      a: {
        es: 'En Texas el plazo general para demandar por lesiones personales es de dos años desde la fecha del accidente, y cuando pasa no hay forma de recuperarlo por buena que sea la causa. Hay situaciones con plazos distintos y más cortos —en particular los reclamos contra una ciudad, un condado o una entidad pública, que exigen avisar mucho antes— y los otros estados donde el despacho tiene oficinas no siempre usan los mismos dos años. Por eso la fecha del accidente es el primer dato que hay que dar al consultar.',
        en: 'In Texas the general deadline to sue for personal injury is two years from the date of the accident, and once it passes there is no way to recover it however strong the case. Some situations have different and shorter deadlines — particularly claims against a city, county, or public entity, which require notice much earlier — and the other states where the firm has offices do not always use the same two years. That is why the date of the accident is the first fact to give when you call.',
      },
    },
    {
      q: {
        es: '¿Cuánto cuesta que revisen mi caso?',
        en: 'How much does it cost to have my case reviewed?',
      },
      a: {
        es: 'La evaluación de un caso de accidente no tiene costo, y los honorarios son por contingencia: se cobran de lo que se recupere, así que si no se recupera nada no hay honorarios que pagar. Conviene decirlo con precisión porque la gente lo confunde: esto aplica a los casos de accidentes. Los trámites de inmigración funcionan distinto y se cotizan por servicio.',
        en: 'Evaluating an accident case is free, and fees are on contingency: they come out of what is recovered, so if nothing is recovered there are no attorney fees to pay. It is worth saying precisely because people mix it up: this applies to accident cases. Immigration matters work differently and are quoted per service.',
      },
    },
    {
      q: {
        es: '¿Puedo reclamar si no tengo documentos?',
        en: 'Can I file a claim if I do not have documents?',
      },
      a: {
        es: 'Sí. El derecho a que le compensen por una lesión no depende de su estatus migratorio, y esa confusión es de las que más dinero le cuesta a nuestra comunidad: hay quien no reclama nunca por miedo, o acepta lo primero que le ofrecen porque cree que no puede exigir. Son cosas separadas. Dígalo en la primera conversación, sin rodeos, para que el caso se maneje teniéndolo en cuenta desde el principio.',
        en: 'Yes. The right to be compensated for an injury does not depend on your immigration status, and that confusion is one of the costliest for our community: some people never file out of fear, or accept the first offer because they believe they cannot ask for more. They are separate matters. Say it in the first conversation, plainly, so the case is handled with that in mind from the start.',
      },
    },
    {
      q: {
        es: '¿Y si el otro conductor no tenía seguro o se dio a la fuga?',
        en: 'What if the other driver had no insurance or fled the scene?',
      },
      a: {
        es: 'Sigue habiendo por dónde. Muchas pólizas incluyen una cobertura para justamente eso —cuando el responsable no tiene seguro, no tiene suficiente, o no se le encuentra— y también coberturas que pagan gastos médicos sin discutir primero quién tuvo la culpa. Mucha gente tiene esa protección contratada y no lo sabe. Traiga su propia póliza a la consulta, aunque el accidente no haya sido culpa suya.',
        en: 'There is still a route. Many policies include coverage for exactly that — when the person at fault has no insurance, not enough, or cannot be found — and also coverage that pays medical expenses without first arguing over fault. Many people have that protection and do not know it. Bring your own policy to the consultation, even if the accident was not your fault.',
      },
    },
    {
      q: {
        es: '¿Debo hablar con la aseguradora del otro o firmar lo que me manden?',
        en: 'Should I talk to the other insurer or sign what they send me?',
      },
      a: {
        es: 'Con cuidado, y mejor no antes de asesorarse. Una declaración grabada temprana se usa después para recortar el reclamo, y un documento de arreglo firmado suele cerrar el asunto para siempre: si más adelante aparece una lesión más grave de lo que parecía, ya no se puede volver. Que llamen rápido y con una oferta no significa que la oferta refleje lo que vale el caso. Antes de firmar cualquier cosa, que alguien lo lea.',
        en: 'Carefully, and preferably not before getting advice. An early recorded statement is later used to cut the claim down, and a signed settlement document usually closes the matter for good: if a more serious injury turns up later, there is no going back. A fast call with an offer does not mean the offer reflects what the case is worth. Before signing anything, have someone read it.',
      },
    },
    {
      q: {
        es: '¿Qué debo hacer en los primeros días después del accidente?',
        en: 'What should I do in the first days after the accident?',
      },
      a: {
        es: 'Atenderse médicamente aunque se sienta bien, porque hay lesiones que tardan en dar la cara y porque un hueco en el historial médico se usa después para decir que no fue tan grave. Guarde el número del reporte policial, fotos del lugar y de los vehículos, y los datos de quien lo vio. Anote a qué talleres o clínicas fue. No admita culpa en el momento, ni siquiera por educación.',
        en: 'Get medical attention even if you feel fine, because some injuries take time to show and because a gap in the medical record is later used to argue it was not serious. Keep the police report number, photos of the scene and the vehicles, and the contact details of anyone who saw it. Write down which shops or clinics you went to. Do not admit fault at the scene, not even out of politeness.',
      },
    },
    {
      q: {
        es: '¿Y si me lesioné trabajando?',
        en: 'What if I was injured at work?',
      },
      a: {
        es: 'Texas tiene una particularidad que cambia todo el análisis: un patrón puede no tener cobertura de compensación laboral, y en ese caso el camino para reclamar no es el mismo que si la tuviera. Lo primero es averiguar cuál de los dos escenarios es el suyo, porque de ahí depende ante quién se reclama y con qué plazos. Si le dijeron que "aquí no hay nada que hacer", vale la pena confirmarlo.',
        en: 'Texas has a peculiarity that changes the whole analysis: an employer may not carry workers’ compensation coverage, and in that case the route to claim is not the same as if it did. The first step is finding out which of the two scenarios is yours, because who you claim against and on what deadlines depends on it. If you were told "there is nothing to be done here", it is worth verifying.',
      },
    },
  ],
};

// ───────────────────────────────────────────────────────────────── seguros
const seguros: ServiceFaqSet = {
  service: 'seguros',
  approved: false,
  verificar: [
    'Que la ley de Texas impone a las aseguradoras deberes de trato justo y plazos para resolver y pagar reclamos, y que incumplirlos puede tener consecuencias propias para la aseguradora. Está redactado sin citar capítulos: confirmar si conviene nombrarlos.',
    'Que el asegurado puede pedir por escrito la cláusula concreta en la que se apoya una negación.',
    'La descripción de los reclamos contra la propia aseguradora (daños a la propiedad, conductor sin seguro, gastos médicos).',
  ],
  faqs: [
    {
      q: {
        es: 'Mi aseguradora negó el reclamo. ¿Se acabó?',
        en: 'My insurer denied the claim. Is that the end of it?',
      },
      a: {
        es: 'No. Una negación es la posición de la aseguradora, no una sentencia. Lo primero es pedir por escrito la razón concreta y la cláusula de la póliza en la que se apoyan: obliga a fijar una postura y muchas veces ahí se ve que el motivo no encaja con lo que realmente pasó. Guarde todo lo que le hayan mandado y no tire nada, incluidos los sobres y las fechas.',
        en: 'No. A denial is the insurer’s position, not a verdict. The first step is to request in writing the specific reason and the policy provision they rely on: it forces them to commit to a position, and often that is where you see the stated reason does not match what actually happened. Keep everything they sent you and throw nothing away, including envelopes and dates.',
      },
    },
    {
      q: {
        es: '¿Debo aceptar la primera oferta que me hacen?',
        en: 'Should I accept the first offer they make?',
      },
      a: {
        es: 'Rara vez conviene, y no porque haya mala intención en cada caso, sino porque la primera oferta se calcula antes de que se sepa el alcance real del daño. Lo importante es lo que se firma al aceptarla: normalmente cierra el asunto de forma definitiva, así que si después aparece un daño mayor o una lesión que tardó en manifestarse, ya no hay vuelta. Conviene saber qué se está cerrando antes de cobrar.',
        en: 'It rarely pays to, and not because there is bad faith in every case, but because the first offer is calculated before the real extent of the damage is known. What matters is what you sign when you accept: it normally closes the matter definitively, so if greater damage or a slow-appearing injury turns up later, there is no going back. It is worth knowing what you are closing before you cash the check.',
      },
    },
    {
      q: {
        es: '¿Puedo reclamar a mi propia aseguradora?',
        en: 'Can I make a claim against my own insurer?',
      },
      a: {
        es: 'Sí, y es más frecuente de lo que se piensa. Su propia póliza puede cubrir daños a su propiedad, gastos médicos sin entrar todavía en quién tuvo la culpa, y el caso de que el responsable no tenga seguro o no tenga suficiente. Que sea "su" aseguradora no significa que el reclamo se resuelva solo por preguntar: sigue siendo un reclamo que hay que documentar.',
        en: 'Yes, and more often than people think. Your own policy may cover damage to your property, medical expenses without yet getting into who was at fault, and the situation where the person responsible has no insurance or not enough. The fact that it is "your" insurer does not mean the claim resolves itself by asking: it is still a claim that has to be documented.',
      },
    },
    {
      q: {
        es: '¿La aseguradora puede tardar lo que quiera en responder?',
        en: 'Can the insurer take as long as it wants to respond?',
      },
      a: {
        es: 'No. La ley de Texas impone a las aseguradoras deberes de trato justo con sus asegurados y plazos para resolver y pagar los reclamos, y no cumplirlos puede tener consecuencias propias para la aseguradora, aparte de lo que se deba del reclamo en sí. Para poder usar eso hace falta el rastro: cuándo presentó, qué le pidieron, qué entregó y cuándo. Por eso conviene comunicarse por escrito siempre que se pueda.',
        en: 'No. Texas law imposes duties of fair dealing on insurers toward their policyholders and deadlines to resolve and pay claims, and failing to meet them can carry consequences for the insurer separate from what is owed on the claim itself. Using that requires the paper trail: when you filed, what they asked for, what you sent, and when. That is why it is best to communicate in writing whenever you can.',
      },
    },
    {
      q: {
        es: '¿Qué hago si dicen que el daño no lo cubre mi póliza?',
        en: 'What if they say my policy does not cover the damage?',
      },
      a: {
        es: 'Pedir que le señalen la cláusula, no solo la conclusión. Muchas discusiones no son sobre si hay cobertura sino sobre la causa del daño —si fue la tormenta o el desgaste, si fue el golpe o algo anterior— y eso se demuestra con documentación y, cuando hace falta, con un peritaje propio y no solo con el de la aseguradora. También es común discutir cuánto se descuenta por antigüedad. Son puntos rebatibles.',
        en: 'Ask them to point to the provision, not just the conclusion. Many disputes are not about whether coverage exists but about the cause of the damage — whether it was the storm or wear and tear, the impact or something earlier — and that is shown with documentation and, when needed, with your own assessment rather than only the insurer’s. Disputes over how much is deducted for age are common too. These are contestable points.',
      },
    },
  ],
};

// ══════════════════════════════════════════════════════════════════════════

const SETS: ServiceFaqSet[] = [
  inmigracion,
  asilo,
  vawa,
  familia,
  leyCriminal,
  accidentes,
  seguros,
];

/** Todos los bloques, aprobados o no. Solo para el documento de revisión y los tests. */
export const ALL_SERVICE_FAQ_SETS: readonly ServiceFaqSet[] = SETS;

/**
 * Preguntas publicables de un servicio.
 *
 * Devuelve vacío si el bloque no está aprobado, y `FaqSection` no renderiza
 * nada con una lista vacía, igual que `buildFaqPageSchema` devuelve null. Así
 * la puerta de aprobación cierra el texto visible y el marcado a la vez: no
 * hay forma de publicar uno sin el otro.
 */
export function getServiceFaqs(service: string, lang: 'es' | 'en'): FaqPair[] {
  const set = SETS.find((s) => s.service === service);
  if (!set || !set.approved) return [];
  return set.faqs.map((f) => ({ q: f.q[lang], a: f.a[lang] }));
}
