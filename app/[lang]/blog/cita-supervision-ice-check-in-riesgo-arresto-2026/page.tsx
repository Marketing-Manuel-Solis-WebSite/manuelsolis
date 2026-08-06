import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'cita-supervision-ice-check-in-riesgo-arresto-2026';
const ISO_DATE = '2026-08-06';
// TODO(portada): sustituir cuando marketing entregue la imagen definitiva.
const IMAGE = '/og-default.jpg';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Cita de supervisión con ICE: cómo prepararte',
    metaDesc:
      'Los arrestos en citas de supervisión aumentaron. Por qué debe ir igual, qué preparar antes y qué hacer si ICE lo detiene ese día.',
    title: 'Cita de supervisión con ICE: cómo prepararte y qué hacer ante el riesgo de arresto',
    displayDate: '06 Ago, 2026',
    readTime: '20 min',
    categoryLabel: 'Defensa contra Deportación',
    lastUpdated: '6 de agosto de 2026',
    summary: {
      title: 'Resumen inicial',
      text: 'Miles de personas en Texas viven bajo una <strong>orden de supervisión</strong>: tienen una orden final de deportación que nunca se ejecutó y, a cambio de seguir en libertad, se reportan con ICE cada cierto tiempo. Desde 2025, y con más fuerza en 2026, se intensificaron los arrestos <strong>en esas mismas citas</strong>, incluso de personas con años de check-ins limpios e hijos ciudadanos. El resultado es pánico antes de cada cita y la tentación de no presentarse. Este artículo dice lo contrario con toda claridad: <strong>hay que ir</strong>, porque no ir convierte un riesgo en una certeza. Pero no sin plan. Aquí está ese plan: qué revisar antes, qué papeles dejar firmados, cómo comportarse ese día y qué hace su familia si lo detienen.',
    },
    intro: [
      'La cita de supervisión con ICE es, para muchas familias, el día más tenso del año. Se pide permiso en el trabajo y se sale de la casa sin saber si se va a volver esa tarde. Esa angustia no es exagerada, y en los últimos dos años se volvió mucho más concreta.',
      'Desde 2025, y de forma más intensa durante 2026, se multiplicaron los reportes de personas arrestadas <strong>durante su propia cita de supervisión</strong>. No solo gente con historial criminal reciente: personas con <strong>órdenes finales antiguas</strong>, años de check-ins puntuales, permiso de trabajo renovado y familia ciudadana. Eso es lo que cambió, y por eso el miedo se disparó.',
      'La reacción natural es no ir. Es también la peor decisión posible: incumple la orden, activa la búsqueda y le quita a su abogado casi todas las herramientas para negociar. El mensaje de este artículo es simple: <strong>vaya a su cita, pero no vaya sin plan</strong>. Lo que sigue es ese plan.',
    ],
    sections: [
      {
        icon: 'clipboard',
        title: 'Qué es la orden de supervisión y por qué NO ir es peor',
        subtitle: 'El papel que firmó al salir',
        blocks: [
          {
            kind: 'text',
            text: 'Una orden de supervisión (<strong>order of supervision</strong>, u OSUP) es el documento con el que ICE deja en libertad a alguien que ya tiene una <strong>orden final de deportación</strong> no ejecutada. No es un estatus ni un perdón, y no borra la orden: es un permiso condicionado para permanecer bajo vigilancia mientras la agencia decide cuándo ejecutarla.',
          },
          {
            kind: 'text',
            text: 'Las condiciones varían de una oficina a otra, pero casi siempre incluyen:',
          },
          {
            kind: 'list',
            items: [
              'Presentarse a <strong>citas periódicas</strong> en la oficina local, en la fecha y hora exactas del citatorio.',
              'Avisar cualquier <strong>cambio de domicilio</strong> o de teléfono dentro del plazo indicado.',
              'No salir del área geográfica autorizada sin permiso previo.',
              'Cooperar con la obtención de <strong>documentos de viaje</strong> si la agencia se los pide.',
              'En algunos casos, <strong>monitoreo electrónico</strong>: grillete, aplicación de teléfono o llamadas de verificación.',
              'No cometer delitos y reportar cualquier arresto, aunque el caso se desestime.',
            ],
          },
          {
            kind: 'text',
            text: 'Mucha gente vive así durante años, con permiso de trabajo renovado y una vida establecida. Esa normalidad es real en lo cotidiano y engañosa en lo legal: <strong>la orden final sigue ahí</strong>, dormida, y puede ejecutarse sin que un juez decida nada nuevo.',
          },
          {
            kind: 'warning',
            text: 'Faltar a la cita no pospone nada: lo agrava todo. Incumplirla suele traducirse en una orden de arresto, en una detención en su casa o su trabajo delante de sus hijos, y en la pérdida de casi todo margen de negociación. Y destruye su mejor argumento: años de cumplimiento impecable.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Por qué están arrestando en los check-ins',
        subtitle: 'El problema de las órdenes finales antiguas',
        blocks: [
          {
            kind: 'text',
            text: 'Durante años, las oficinas locales trataron las órdenes finales antiguas como casos de baja prioridad: sin condenas graves y con reportes puntuales, la cita terminaba con una firma y una fecha nueva. Eso se apoyaba en criterios internos, no en la ley: <strong>la orden nunca dejó de ser ejecutable</strong>.',
          },
          {
            kind: 'text',
            text: 'Desde 2025, y con más intensidad en 2026, esos criterios se estrecharon: hoy una cita de rutina puede terminar en detención, incluso con años de check-ins limpios, permiso vigente e hijos ciudadanos.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Lo que ya no protege igual',
                desc: 'Un historial largo de citas cumplidas, un permiso vigente y la ausencia de antecedentes ya no garantizan que la cita termine con una fecha nueva.',
              },
              {
                title: 'Lo que sigue importando',
                desc: 'Ese mismo historial es el corazón de cualquier petición de suspensión o de reapertura. Cumplir no fue inútil: es la prueba que se presenta por escrito, antes de la cita.',
              },
              {
                title: 'Por qué la cita es el punto vulnerable',
                desc: 'Es el único momento en que usted se presenta voluntariamente, identificado y localizado. Nada de eso mejora si deja de ir: solo cambia dónde ocurre el arresto.',
              },
              {
                title: 'Lo que no depende de la política',
                desc: 'Una orden final antigua es ejecutable hasta que un tribunal la reabra o se obtenga otro alivio. Ese es el problema de fondo, no la cita en sí.',
              },
            ],
          },
          {
            kind: 'note',
            text: 'Las prioridades de ejecución y la práctica de cada oficina local cambian con frecuencia y no son iguales en todo el país. Verifique con su abogado el estado vigente antes de su próxima cita: lo que era cierto hace seis meses puede no serlo hoy.',
          },
        ],
      },
      {
        icon: 'search',
        title: 'Antes de la cita: ¿se puede reabrir su caso?',
        subtitle: 'La revisión que casi nadie hace a tiempo',
        blocks: [
          {
            kind: 'text',
            text: 'La pregunta clave no es qué hacer el día de la cita, sino <strong>por qué sigue existiendo esa orden final</strong>. Muchas órdenes antiguas se dictaron en circunstancias que hoy pueden atacarse. Conviene que un abogado pida el expediente completo y lo revise semanas antes, no la víspera.',
          },
          {
            kind: 'list',
            items: [
              'La orden se dictó <strong>en ausencia</strong> porque la notificación nunca llegó, llegó a una dirección vieja o traía fecha y hora incompletas.',
              'Hubo <strong>mala representación</strong>: un notario, un consultor sin licencia o un abogado que no presentó lo que debía.',
              'Hoy existe un <strong>alivio que antes no aplicaba</strong>: matrimonio, petición familiar, Visa U, VAWA o asilo por hechos sobrevenidos.',
              'Cambió la <strong>ley o su interpretación</strong> sobre la razón por la que se ordenó la remoción.',
              'Una <strong>condena penal antigua</strong> se anuló, se modificó o se reclasificó.',
            ],
          },
          {
            kind: 'text',
            text: 'La herramienta se llama <strong>moción para reabrir</strong>. Tiene plazos y requisitos estrictos, y algunas causales —como la falta de notificación en una orden en ausencia— se rigen por reglas propias más favorables. Si su caso encaja o no es el tipo de análisis que no se improvisa en el estacionamiento de la oficina de ICE.',
          },
          {
            kind: 'warning',
            text: 'Presentar una moción para reabrir <strong>no suspende automáticamente</strong> la deportación. Si no se pide y se obtiene una suspensión por separado, la remoción puede ejecutarse mientras la moción sigue pendiente. Son dos trámites distintos y hay que planearlos juntos.',
          },
        ],
      },
      {
        icon: 'file',
        title: 'La suspensión de la remoción: el formulario I-246',
        subtitle: 'Pedir tiempo por escrito y con evidencia',
        blocks: [
          {
            kind: 'text',
            text: 'Una suspensión de la deportación (<strong>stay of removal</strong>) es un permiso temporal para no ser deportado durante un periodo determinado. Ante ICE se pide con el <strong>formulario I-246</strong>, normalmente en la oficina local de ejecución y acompañado de evidencia. No es un derecho: es una decisión discrecional, y por eso el paquete importa tanto como el formulario.',
          },
          {
            kind: 'text',
            text: 'Lo que suele acompañar a una solicitud sólida:',
          },
          {
            kind: 'list',
            items: [
              'Identificación, copia de la orden de supervisión y de sus documentos migratorios.',
              'Prueba del <strong>vínculo familiar</strong>: actas de nacimiento de hijos ciudadanos o residentes, acta de matrimonio.',
              'Prueba de <strong>arraigo</strong>: años de residencia, empleo, declaraciones de impuestos, contrato de renta o escritura.',
              'Prueba de <strong>necesidad médica o de cuidado</strong> de un familiar dependiente, con cartas de sus médicos.',
              'Cartas de apoyo del patrón, la iglesia, la escuela o la comunidad.',
              'Prueba de un <strong>trámite migratorio pendiente</strong> con posibilidades reales, si existe.',
              'Su <strong>historial de cumplimiento</strong>: cada cita de supervisión a la que asistió.',
            ],
          },
          {
            kind: 'text',
            text: 'Una suspensión concedida no borra la orden ni le da estatus: compra tiempo, casi siempre limitado, para usarlo en algo concreto. Si se concede y no se avanza en la reapertura o en el trámite de fondo, el problema regresa igual en la siguiente fecha.',
          },
          {
            kind: 'note',
            text: 'Preséntela con tiempo, no el día de la cita. Un I-246 entregado en la ventanilla mientras el agente decide qué hacer con usted pesa mucho menos que uno presentado semanas antes, completo y con un abogado dándole seguimiento.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'El paquete que debe dejar listo antes de ir',
        subtitle: 'Prepararse no es rendirse',
        blocks: [
          {
            kind: 'text',
            text: 'Preparar un plan por si lo detienen no es aceptar que va a pasar. Es evitar que, si pasa, su familia pierda las primeras cuarenta y ocho horas averiguando dónde está usted y quién puede firmar por sus hijos.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Avise a su abogado antes de la cita</strong> y asegúrese de que presente el <strong>formulario G-28</strong>, la notificación oficial de representación que obliga a la agencia a reconocerlo.',
              '<strong>Firme un poder notarial</strong> para el cuidado de sus hijos menores, designando a alguien de confianza que pueda autorizar atención médica y tratar con la escuela; y otro para lo práctico: cuentas, carro, renta, negocio.',
              '<strong>Reúna sus documentos</strong> en una carpeta que su familia sepa dónde está: pasaportes, actas de nacimiento y de matrimonio, su número de expediente (A-number) y sus recetas.',
              '<strong>Escriba una hoja de contactos</strong>: abogado con teléfono directo, dos familiares, el consulado de su país, la escuela y su patrón.',
              '<strong>Memorice el teléfono de su abogado</strong> y el de un familiar. En detención no va a tener su celular.',
              '<strong>Deje resuelto el dinero.</strong> Una cuenta a la que otra persona tenga acceso evita que la familia se quede sin nada el primer mes.',
              '<strong>Hable con sus hijos</strong> sin dramatismo: qué pasa si mamá o papá no vuelve esa tarde, a quién llaman y quién los recoge.',
            ],
          },
          {
            kind: 'note',
            text: 'El poder notarial para el cuidado de menores es el documento que más falta hace y el que casi nadie tiene firmado. Sin él, un familiar puede tener problemas para autorizar una cirugía o recoger a los niños en la escuela.',
          },
        ],
      },
      {
        icon: 'calendar',
        title: 'El día de la cita',
        subtitle: 'Cómo presentarse y qué no hacer',
        blocks: [
          {
            kind: 'text',
            text: 'Llegue puntual, con la ropa con la que iría a cualquier trámite formal, con su citatorio, su identificación y copia de todo lo presentado en su nombre: el I-246, el acuse de la moción, el G-28. Lleve lo mínimo en los bolsillos.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Vaya acompañado.</strong> Un adulto de confianza que espere afuera, sepa a qué hora entró usted y tenga el teléfono del abogado. Si usted no sale, esa persona activa el plan.',
              '<strong>No lleve a sus hijos</strong> si puede evitarlo. Que un niño presencie el arresto de su padre o su madre es un daño evitable.',
              '<strong>No mienta ni presente documentos falsos.</strong> Una mentira en la ventanilla puede volverse un problema penal y cerrar puertas que hoy siguen abiertas.',
              '<strong>No firme nada que no entienda.</strong> Puede decir que quiere que su abogado lo revise antes.',
              '<strong>Pida hablar con su abogado</strong> si algo cambia. Diga con calma que tiene representación legal y que quiere comunicarse con ella.',
              '<strong>No discuta ni se resista</strong> aunque le parezca injusto. Resistirse no evita el arresto y puede agregar cargos.',
            ],
          },
          {
            kind: 'warning',
            text: 'Tenga especial cuidado con cualquier documento que implique renunciar a derechos, aceptar la <strong>salida voluntaria</strong>, retirar una solicitud pendiente o autorizar su remoción inmediata. Firmar eso sin entenderlo puede terminar su caso el mismo día. Si le dicen que firme para «agilizar» o para «salir más rápido», pida hablar con su abogado antes.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'Si lo detienen: el plan de la familia, hora por hora',
        subtitle: 'Las primeras cuarenta y ocho horas',
        blocks: [
          {
            kind: 'text',
            text: 'Si usted no sale de la oficina, su familia no tiene por qué improvisar. Este es el orden en que conviene moverse.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Primera hora:</strong> el acompañante llama al abogado y le dice la oficina exacta, la hora de entrada y lo que le informaron en la ventanilla.',
              '<strong>Primeras horas:</strong> el abogado confirma que el G-28 está en el expediente y empieza a ubicarlo. El localizador público de detenidos de ICE permite buscar por número de expediente (A-number) o por nombre, país y fecha de nacimiento.',
              '<strong>Primer día:</strong> puede tardar en aparecer en el sistema y ser trasladado a otro centro, incluso en otro estado. Que no aparezca de inmediato no significa nada malo.',
              '<strong>Primer día:</strong> active el poder notarial de los niños, avise a la escuela quién los recoge y hable con el patrón.',
              '<strong>Primeras 48 horas:</strong> el abogado evalúa qué se puede hacer de inmediato: solicitud o renovación de suspensión, moción de emergencia o los pasos que correspondan.',
              '<strong>Después:</strong> guarde cada papel, cada número de recibo y cada nombre de agente, con fechas y horas.',
            ],
          },
          {
            kind: 'text',
            text: 'Recuerde que <strong>las llamadas desde detención suelen grabarse</strong>, salvo las que se hacen con el abogado. No discuta detalles del caso por esa vía.',
          },
          {
            kind: 'warning',
            text: 'No pague a nadie que prometa «sacarlo mañana» a cambio de efectivo, ni contrate por mensajería a quien no le entregue un contrato por escrito y un G-28. Las detenciones son el momento en que más aparecen los estafadores.',
          },
        ],
      },
      {
        icon: 'heart',
        title: 'Visa U, VAWA o una petición pendiente: por qué sí importan',
        subtitle: 'Casos que pueden tener una puerta abierta',
        blocks: [
          {
            kind: 'text',
            text: 'Un trámite pendiente no detiene por sí solo una orden final. Pero puede ser la base más fuerte para pedir una suspensión, reabrir el caso o lograr que la agencia ejerza discreción. Si está en alguna de estas situaciones, dígaselo a su abogado antes de la cita.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Visa U (víctimas de delito)',
                desc: 'Si fue víctima de un delito grave y colaboró con la policía, puede existir una petición de Visa U. USCIS puede otorgar acción diferida y permiso de trabajo a quienes reciben una determinación de buena fe o quedan en lista de espera.',
              },
              {
                title: 'VAWA (violencia doméstica)',
                desc: 'La autopetición VAWA permite a la víctima presentar su caso sin el agresor y sin que él se entere. La ley federal protege la confidencialidad de esa información.',
              },
              {
                title: 'Petición familiar aprobada',
                desc: 'Una I-130 aprobada por un cónyuge o hijo ciudadano no borra la orden, pero puede sostener una moción para reabrir o una solicitud de suspensión.',
              },
              {
                title: 'Asilo por hechos nuevos',
                desc: 'Si las condiciones en su país cambiaron de forma sustancial después de su orden, puede haber una vía para reabrir y pedir protección. Los requisitos son estrictos.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'También hay programas de protección temporal que dependen del país y de fechas de registro concretas. Si su país fue designado o redesignado, revíselo antes de la cita.',
          },
          {
            kind: 'note',
            text: 'Estas vías cambian con las decisiones administrativas y los litigios en curso. Verifique con su abogado el estado vigente de cada programa y de cada plazo antes de tomar cualquier decisión basada en este artículo.',
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Puedo faltar a la cita si tengo miedo de que me arresten?',
          a: 'No. Faltar incumple la orden de supervisión y suele provocar una orden de arresto, con la posibilidad de que lo detengan en su casa o en su trabajo. Además destruye su mejor argumento: años de cumplimiento. Lo correcto es ir preparado y con un abogado avisado.',
        },
        {
          q: '¿Mi abogado puede entrar conmigo a la cita?',
          a: 'Depende de la oficina y de la práctica local; algunas lo permiten y otras no. Lo que sí puede hacer siempre es presentar el G-28 con anticipación, acompañarlo hasta el edificio y quedar disponible por teléfono.',
        },
        {
          q: '¿Un permiso de trabajo vigente me protege ese día?',
          a: 'No por sí solo. El permiso que se otorga bajo una orden de supervisión existe precisamente porque hay una orden final no ejecutada. Es evidencia útil de arraigo y de cumplimiento, pero no impide la detención.',
        },
        {
          q: '¿Cuánto tarda una solicitud con el formulario I-246?',
          a: 'No hay un plazo garantizado y varía según la oficina y su carga de trabajo. Por eso conviene presentarla con semanas de anticipación y no en la fecha de la cita, y dejar constancia de que se presentó a tiempo.',
        },
        {
          q: '¿Qué pasa con mis hijos si me detienen y dependen solo de mí?',
          a: 'Por eso importa el poder notarial firmado de antemano y una persona de confianza ya designada. Sin ese documento, un familiar puede tener dificultades para autorizar atención médica o recogerlos en la escuela. Déjelo firmado antes de la cita.',
        },
        {
          q: '¿Sirve llevar cartas de la comunidad y de mi patrón a la cita?',
          a: 'Sirven mucho más dentro de un paquete presentado por escrito antes de la cita que como papeles entregados en la ventanilla. La discreción se ejerce sobre expedientes, no sobre conversaciones de mostrador. Prepare la evidencia con tiempo y junto con su abogado.',
        },
      ],
    },
    conclusion: {
      title: 'Ir preparado no es garantía, pero no ir sí garantiza lo contrario',
      text: 'Nadie puede prometerle que su cita va a terminar con una fecha nueva y nada más. Lo que sí se puede afirmar es que llegar con un abogado registrado, con una solicitud de suspensión ya presentada, con la revisión hecha de si su caso puede reabrirse y con los poderes firmados cambia por completo lo que ocurre después, salga usted caminando o no.',
      advice: 'Si tiene una cita de supervisión próxima, hable con un abogado semanas antes, no la noche anterior. El tiempo es el único recurso que después no se recupera.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'ICE — Orden de supervisión y obligaciones de reporte de personas con orden final',
        'Formulario I-246, Solicitud de Suspensión de Deportación o Remoción',
        'Formulario G-28, Notificación de Comparecencia como Abogado o Representante Acreditado',
        'ICE — Sistema en línea de localización de detenidos (Online Detainee Locator System)',
        'Reglamento federal sobre mociones para reabrir ante el juez de inmigración y la BIA',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'ICE Check-In: How to Prepare Before You Go',
    metaDesc:
      'Arrests at ICE check-ins are up. Why you must still go, what to prepare beforehand and what to do if you are detained that day.',
    title: 'ICE Check-In Appointment: How to Prepare and What to Do If You Are Arrested',
    displayDate: 'Aug 06, 2026',
    readTime: '20 min',
    categoryLabel: 'Deportation Defense',
    lastUpdated: 'August 6, 2026',
    summary: {
      title: 'Initial Summary',
      text: 'Thousands of people in Texas live under an <strong>order of supervision</strong>: they have a final removal order that was never carried out and, in exchange for staying free, they report to ICE at set intervals. Since 2025, and more sharply in 2026, arrests <strong>at those very appointments</strong> have intensified, including of people with years of clean check-ins and U.S. citizen children. The result is panic before every appointment and the temptation not to show up. This article says the opposite as plainly as possible: <strong>you have to go</strong>, because not going turns a risk into a certainty. But not without a plan. Here is that plan: what to review beforehand, what papers to sign in advance, how to conduct yourself that day, and what your family does if you are detained.',
    },
    intro: [
      'For many families the ICE check-in is the tensest day of the year. Time off is requested at work, and the person walks out the door not knowing whether they will come back that afternoon. That anxiety is not exaggerated, and over the last two years it has become far more concrete.',
      'Since 2025, and more intensely during 2026, reports have multiplied of people arrested <strong>during their own supervision appointment</strong>. Not only people with recent criminal history: people with <strong>old final orders</strong>, years of punctual check-ins, renewed work permits and citizen family. That is what changed, and that is why the fear spiked.',
      'The natural reaction is not to go. It is also the worst possible decision: it violates the order, triggers a search, and strips your attorney of nearly every tool for negotiating. The message of this article is simple: <strong>go to your appointment, but do not go without a plan</strong>. What follows is that plan.',
    ],
    sections: [
      {
        icon: 'clipboard',
        title: 'What the order of supervision is, and why NOT going is worse',
        subtitle: 'The paper you signed on release',
        blocks: [
          {
            kind: 'text',
            text: 'An <strong>order of supervision</strong> (often called an OSUP) is the document by which ICE releases someone who already has an unexecuted <strong>final order of removal</strong>. It is not a status. It is not a pardon. It does not erase the order. It is conditional permission to remain in the country under monitoring while the agency decides when to carry that order out.',
          },
          {
            kind: 'text',
            text: 'Conditions vary from one field office to another, but they almost always include:',
          },
          {
            kind: 'list',
            items: [
              'Appearing at <strong>periodic appointments</strong> at the local office, on the exact date and time in the notice.',
              'Reporting any <strong>change of address</strong> or phone number within the stated deadline.',
              'Not leaving the authorized geographic area without prior permission.',
              'Cooperating in obtaining <strong>travel documents</strong> if the agency requests them.',
              'In some cases, <strong>electronic monitoring</strong>: an ankle monitor, a phone application, or check-in calls.',
              'Committing no crimes and reporting any arrest, even if the case is dismissed.',
            ],
          },
          {
            kind: 'text',
            text: 'Many people live this way for years, with a renewed work permit and a settled life. That normalcy is real day to day and misleading legally: <strong>the final order is still there</strong>, dormant, and it can be executed without a judge deciding anything new.',
          },
          {
            kind: 'warning',
            text: 'Skipping the appointment postpones nothing: it makes everything worse. Violating it usually means an arrest warrant, a detention at home or at work in front of your children, and the loss of almost all room to negotiate. And it destroys your best argument: years of spotless compliance.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Why arrests are happening at check-ins',
        subtitle: 'The problem of old final orders',
        blocks: [
          {
            kind: 'text',
            text: 'For years, local offices treated old final orders as low-priority cases: with no serious convictions and punctual reporting, the appointment ended with a signature and a new date. That rested on internal priority criteria, not on the law: <strong>the order never stopped being enforceable</strong>.',
          },
          {
            kind: 'text',
            text: 'Since 2025, and more intensely in 2026, those criteria narrowed: today a routine appointment can end in detention, even with years of clean check-ins, a valid permit and citizen children.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'What no longer protects the same way',
                desc: 'A long record of appointments kept, a valid permit and no criminal history no longer guarantee that the appointment ends with a new date.',
              },
              {
                title: 'What still matters',
                desc: 'That same record is the heart of any stay request or motion to reopen. Complying was not pointless: it is the evidence you submit in writing, before the appointment.',
              },
              {
                title: 'Why the appointment is the vulnerable point',
                desc: 'It is the one moment when you appear voluntarily, identified and located. None of that improves by staying away: it only changes where the arrest happens.',
              },
              {
                title: 'What does not depend on policy',
                desc: 'An old final order stays enforceable until a court reopens it or other relief is obtained. That is the underlying problem, not the appointment itself.',
              },
            ],
          },
          {
            kind: 'note',
            text: 'Enforcement priorities and each local office’s practice change often and are not the same nationwide. Confirm the current state of things with your attorney before your next appointment: what was true six months ago may not be true today.',
          },
        ],
      },
      {
        icon: 'search',
        title: 'Before the appointment: can your case be reopened?',
        subtitle: 'The review almost nobody does in time',
        blocks: [
          {
            kind: 'text',
            text: 'The key question is not what to do on the day of the appointment, but <strong>why that final order still exists</strong>. Many old orders were issued in circumstances that can be challenged today. Have an attorney request the full record and review it weeks in advance, not the night before.',
          },
          {
            kind: 'list',
            items: [
              'The order was entered <strong>in absentia</strong> because notice never arrived, went to an old address, or carried an incomplete date and time.',
              'There was <strong>bad representation</strong>: a notario, an unlicensed consultant, or an attorney who failed to file what was required.',
              'There is now <strong>relief that did not apply before</strong>: marriage, a family petition, a U visa, VAWA, or asylum based on later events.',
              'The <strong>law or its interpretation changed</strong> as to the ground on which removal was ordered.',
              'An <strong>old criminal conviction</strong> was vacated, modified or reclassified.',
            ],
          },
          {
            kind: 'text',
            text: 'The tool is called a <strong>motion to reopen</strong>. It carries strict deadlines and requirements, and some grounds — such as lack of notice in an in-absentia order — follow their own, more favorable rules. Whether your case fits is the kind of analysis that cannot be improvised in the parking lot of the ICE office.',
          },
          {
            kind: 'warning',
            text: 'Filing a motion to reopen <strong>does not automatically stop</strong> removal. If a stay is not separately requested and granted, removal can be carried out while the motion is still pending. They are two different filings and must be planned together.',
          },
        ],
      },
      {
        icon: 'file',
        title: 'The stay of removal: Form I-246',
        subtitle: 'Asking for time in writing, with evidence',
        blocks: [
          {
            kind: 'text',
            text: 'A <strong>stay of removal</strong> is temporary permission not to be deported for a defined period. With ICE it is requested using <strong>Form I-246</strong>, normally at the local enforcement office and supported by evidence. It is not a right: it is a discretionary decision, which is why the package matters as much as the form.',
          },
          {
            kind: 'text',
            text: 'What usually accompanies a strong request:',
          },
          {
            kind: 'list',
            items: [
              'Identification, a copy of the order of supervision and of your immigration documents.',
              'Proof of <strong>family ties</strong>: birth certificates of citizen or resident children, marriage certificate.',
              'Proof of <strong>roots</strong>: years of residence, employment, tax returns, a lease or deed.',
              'Proof of <strong>medical or caregiving need</strong> of a dependent relative, with letters from their doctors.',
              'Support letters from your employer, your church, the school or the community.',
              'Proof of a <strong>pending immigration filing</strong> with real prospects, if one exists.',
              'Your <strong>compliance record</strong>: every supervision appointment you attended.',
            ],
          },
          {
            kind: 'text',
            text: 'A granted stay does not erase the order or give you status: it buys time, almost always limited, to be used for something concrete. If it is granted and no progress is made on reopening or on the underlying filing, the problem returns at the next date.',
          },
          {
            kind: 'note',
            text: 'File it early, not on the day of the appointment. An I-246 handed over at the window while the officer decides what to do with you weighs far less than one filed weeks earlier, complete and with an attorney following up.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'The package to have ready before you go',
        subtitle: 'Preparing is not surrendering',
        blocks: [
          {
            kind: 'text',
            text: 'Preparing a plan in case you are detained is not accepting that it will happen. It is making sure that, if it does, your family does not lose the first forty-eight hours figuring out where you are and who can sign for your children.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Notify your attorney before the appointment</strong> and make sure they file <strong>Form G-28</strong>, the official notice of representation that requires the agency to recognize them.',
              '<strong>Sign a power of attorney</strong> for the care of your minor children, naming a trusted person who can authorize medical care and deal with the school; and another for practical matters: accounts, car, lease, business.',
              '<strong>Gather your documents</strong> in one folder your family knows how to find: passports, birth certificates, marriage certificate, your case number (A-number) and your prescriptions.',
              '<strong>Write out a contact sheet</strong>: attorney with a direct line, two relatives, your country’s consulate, the school and your employer.',
              '<strong>Memorize your attorney’s phone number</strong> and one relative’s. In detention you will not have your cell phone.',
              '<strong>Settle the money question.</strong> An account another person can access keeps the family from having nothing during the first month.',
              '<strong>Talk to your children</strong> without drama: what happens if mom or dad does not come home that afternoon, who they call and who picks them up.',
            ],
          },
          {
            kind: 'note',
            text: 'The power of attorney for the care of minors is the document most needed and the one almost nobody has signed. Without it, a relative can struggle to authorize surgery or pick the children up at school.',
          },
        ],
      },
      {
        icon: 'calendar',
        title: 'The day of the appointment',
        subtitle: 'How to show up and what not to do',
        blocks: [
          {
            kind: 'text',
            text: 'Arrive on time, dressed as you would for any formal appointment, with your notice, your identification and copies of everything filed on your behalf: the I-246, the receipt for the motion, the G-28. Carry the bare minimum in your pockets.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Bring someone with you.</strong> A trusted adult who waits outside, knows what time you went in and has the attorney’s number. If you do not come out, that person activates the plan.',
              '<strong>Do not bring your children</strong> if you can avoid it. A child witnessing a parent’s arrest is preventable harm.',
              '<strong>Do not lie and do not present false documents.</strong> A lie at the window can become a criminal problem and close doors that are still open today.',
              '<strong>Do not sign anything you do not understand.</strong> You can say you want your attorney to review it first.',
              '<strong>Ask to speak with your attorney</strong> if something changes. Say calmly that you have legal representation and want to contact them.',
              '<strong>Do not argue and do not resist</strong>, however unfair it feels. Resisting does not prevent the arrest and can add charges.',
            ],
          },
          {
            kind: 'warning',
            text: 'Be especially careful with any document that waives rights, accepts <strong>voluntary departure</strong>, withdraws a pending application, or authorizes your immediate removal. Signing that without understanding it can end your case the same day. If you are told to sign to «speed things up» or to «get out faster», ask to speak with your attorney first.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'If you are detained: the family plan, hour by hour',
        subtitle: 'The first forty-eight hours',
        blocks: [
          {
            kind: 'text',
            text: 'If you do not walk out of the office, your family should not have to improvise. This is the order in which to move.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>First hour:</strong> the companion calls the attorney and reports the exact office, the time you went in, and anything said at the window.',
              '<strong>First hours:</strong> the attorney confirms the G-28 is in the file and starts locating you. ICE’s public detainee locator allows searches by case number (A-number) or by name, country and date of birth.',
              '<strong>First day:</strong> the person may take time to appear in the system and be transferred to another facility, even in another state. Not appearing right away does not mean something bad happened.',
              '<strong>First day:</strong> activate the children’s power of attorney, tell the school who will pick them up, and speak with the employer.',
              '<strong>First 48 hours:</strong> the attorney assesses what can be done immediately: a stay request or renewal, an emergency motion, or whatever steps apply.',
              '<strong>Afterward:</strong> keep every paper, every receipt number and every officer’s name, with dates and times.',
            ],
          },
          {
            kind: 'text',
            text: 'Remember that <strong>calls from detention are usually recorded</strong>, except calls made with the attorney. Do not discuss case details that way.',
          },
          {
            kind: 'warning',
            text: 'Do not pay anyone who promises to «get him out tomorrow» for cash, and do not hire over messaging apps someone who will not give you a written contract and a G-28. Detentions are when scammers surface most.',
          },
        ],
      },
      {
        icon: 'heart',
        title: 'A U visa, VAWA or a pending petition: why they matter',
        subtitle: 'Cases that may have a door open',
        blocks: [
          {
            kind: 'text',
            text: 'A pending filing does not by itself stop a final order. But it can be the strongest basis for requesting a stay, for reopening the case, or for the agency to exercise discretion. If you are in any of these situations, tell your attorney before the appointment.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'U visa (crime victims)',
                desc: 'If you were the victim of a serious crime and cooperated with police, a U visa petition may exist. USCIS can grant deferred action and a work permit to those who receive a bona fide determination or are placed on the waiting list.',
              },
              {
                title: 'VAWA (domestic violence)',
                desc: 'A VAWA self-petition lets the victim file without the abuser and without the abuser being notified. Federal law protects the confidentiality of that information.',
              },
              {
                title: 'Approved family petition',
                desc: 'An I-130 approved by a citizen spouse or child does not erase the order, but it can support a motion to reopen or a stay request.',
              },
              {
                title: 'Asylum based on new events',
                desc: 'If conditions in your country changed substantially after your order, there may be a path to reopen and seek protection. The requirements are strict.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'There are also temporary protection programs that depend on the country of origin and on specific registration dates. If your country was designated or redesignated, review that before the appointment.',
          },
          {
            kind: 'note',
            text: 'These paths shift with administrative decisions and ongoing litigation. Confirm with your attorney the current status of each program and each deadline before making any decision based on this article.',
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'Can I skip the appointment if I am afraid of being arrested?',
          a: 'No. Skipping violates the order of supervision and usually triggers an arrest warrant, with the possibility of being detained at home or at work. It also destroys your best argument: years of compliance. The right move is to go prepared, with an attorney already notified.',
        },
        {
          q: 'Can my attorney come in with me to the appointment?',
          a: 'It depends on the office and on local practice; some allow it and others do not. What an attorney can always do is file the G-28 in advance, accompany you to the building and stay reachable by phone.',
        },
        {
          q: 'Does a valid work permit protect me that day?',
          a: 'Not on its own. The permit granted under an order of supervision exists precisely because there is an unexecuted final order. It is useful evidence of roots and compliance, but it does not prevent detention.',
        },
        {
          q: 'How long does a Form I-246 request take?',
          a: 'There is no guaranteed timeframe and it varies by office and workload. That is why it should be filed weeks in advance rather than on the appointment date, with a record that it was filed on time.',
        },
        {
          q: 'What happens to my children if I am detained and they depend only on me?',
          a: 'That is why a power of attorney signed in advance and a trusted person already named matter so much. Without that document, a relative may struggle to authorize medical care or pick them up at school. Sign it before the appointment.',
        },
        {
          q: 'Is it worth bringing community and employer letters to the appointment?',
          a: 'They are far more useful inside a package filed in writing before the appointment than as papers handed over at the window. Discretion is exercised over files, not over counter conversations. Prepare the evidence early and together with your attorney.',
        },
      ],
    },
    conclusion: {
      title: 'Going prepared is no guarantee, but not going guarantees the opposite',
      text: 'No one can promise you that your appointment will end with nothing more than a new date. What can be said is that arriving with a registered attorney, with a stay request already filed, with a completed review of whether your case can be reopened, and with powers of attorney signed changes entirely what happens next — whether you walk out or not.',
      advice: 'If you have a supervision appointment coming up, speak with an attorney weeks before, not the night before. Time is the one resource you cannot recover afterward.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'ICE — Order of supervision and reporting obligations for people with a final order',
        'Form I-246, Application for a Stay of Deportation or Removal',
        'Form G-28, Notice of Entry of Appearance as Attorney or Accredited Representative',
        'ICE — Online Detainee Locator System',
        'Federal regulations on motions to reopen before the immigration judge and the BIA',
      ],
    },
    ui: ARTICLE_UI.en,
  },
};

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const currentLang: 'es' | 'en' = lang === 'en' ? 'en' : 'es';
  return buildArticleMetadata({
    slug: SLUG,
    lang: currentLang,
    content: content[currentLang],
    image: IMAGE,
    isoDate: ISO_DATE,
  });
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const currentLang: 'es' | 'en' = lang === 'en' ? 'en' : 'es';

  return (
    <BlogArticleLayout
      slug={SLUG}
      lang={currentLang}
      content={content[currentLang]}
      image={IMAGE}
      imageAlt={
        currentLang === 'es'
          ? 'Familia esperando afuera de una oficina de ICE antes de una cita de supervisión'
          : 'Family waiting outside an ICE office before a supervision check-in'
      }
      isoDate={ISO_DATE}
      servicePath="/servicios/defensa-deportacion"
      trackerCategory="Defensa contra Deportación"
    />
  );
}

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}
