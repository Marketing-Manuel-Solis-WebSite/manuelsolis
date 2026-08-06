import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'auditoria-i9-redada-trabajo-derechos-2026';
const ISO_DATE = '2026-08-06';
// TODO(portada): sustituir cuando marketing entregue la imagen definitiva.
const IMAGE = '/og-default.jpg';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Auditoría I-9 y redada laboral: sus derechos',
    metaDesc:
      'Auditoría I-9 u operativo en su trabajo en Texas: qué recibe el patrón, qué plazos corren y qué derechos conserva usted, sin importar su estatus.',
    title: 'Auditorías I-9 y operativos en el trabajo: derechos del trabajador',
    displayDate: '06 Ago, 2026',
    readTime: '10 min',
    categoryLabel: 'Defensa contra Deportación',
    lastUpdated: '6 de agosto de 2026',
    summary: {
      title: 'Resumen inicial',
      text: 'Los operativos en centros de trabajo y las auditorías I-9 se multiplicaron durante 2025 y 2026 como pilar de la política de aplicación migratoria, y en Texas —donde la ley estatal prohíbe las políticas santuario y existen acuerdos de cooperación 287(g) con autoridades locales— el margen de error para el trabajador es más estrecho. Una <strong>auditoría I-9</strong> y un <strong>operativo</strong> no son la misma cosa: la primera empieza con una notificación escrita al patrón y un plazo de tres días hábiles para entregar los formularios; el segundo ocurre en el lugar, con agentes presentes y posibles detenciones el mismo día. Aquí le explicamos en qué se diferencian, qué derechos conserva usted en cada escenario, qué puede y qué no puede hacer su patrón cuando dice que sus documentos no coinciden, y qué hacer en las primeras 48 horas si detuvieron a alguien de su familia.',
    },
    intro: [
      'Durante 2025 y 2026, los operativos en centros de trabajo y las auditorías de formularios I-9 pasaron a ser un pilar de la política de aplicación migratoria. Para quien trabaja en construcción, restaurantes, plantas de procesamiento, bodegas, limpieza o transporte, eso cambió algo muy concreto: el lugar donde uno se gana la vida se volvió también el lugar donde se puede decidir su caso.',
      'En Texas el escenario es más exigente. La ley estatal prohíbe las políticas santuario y existen acuerdos de cooperación entre autoridades locales e inmigración bajo el programa 287(g), de modo que un contacto que en otro estado quedaría en manos locales aquí puede terminar en un expediente migratorio. No es motivo para el pánico, pero sí para no improvisar.',
      'Este artículo baja al escenario laboral específico: qué es exactamente una auditoría I-9, en qué se distingue de un operativo, qué derechos conserva usted delante de un agente, qué puede y qué no puede hacer su patrón con sus documentos, y qué hacer —usted y su familia— en las horas siguientes. Está escrito para leerse antes de que pase algo.',
    ],
    sections: [
      {
        icon: 'swap',
        title: 'Auditoría I-9 y operativo no son la misma cosa',
        subtitle: 'Dos escenarios que se preparan distinto',
        blocks: [
          {
            kind: 'text',
            text: 'Mucha gente usa la palabra «redada» para todo, pero en el trabajo hay dos cosas distintas y confundirlas cuesta caro. Una <strong>auditoría I-9</strong> es un procedimiento en papel: el gobierno revisa los formularios de verificación de empleo que el patrón está obligado a conservar por cada contratación. Un <strong>operativo</strong> es una acción física en el lugar, con agentes presentes.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Auditoría I-9',
                desc: 'Empieza con una notificación escrita al patrón. Ese día no hay agentes ni detenciones. El riesgo para el trabajador llega después, cuando el gobierno señala expedientes cuyos documentos no pudo validar.',
              },
              {
                title: 'Operativo en el lugar de trabajo',
                desc: 'Los agentes se presentan físicamente, suelen separar a la gente por áreas y preguntan por lugar de nacimiento y estatus. Aquí sí puede haber detenciones el mismo día.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'La preparación también cambia. La auditoría le da días, a veces semanas, para reunir documentación y buscar asesoría; el operativo se resuelve en minutos y no da tiempo de consultar nada. Lo primero se organiza con calma; lo segundo se ensaya, como se ensaya un simulacro de incendio.',
          },
          {
            kind: 'note',
            text: 'Las reglas y las prácticas de aplicación en este terreno han cambiado varias veces en poco tiempo. Antes de decidir algo —renunciar, firmar, mudarse, presentar un trámite— verifique con un abogado cuál es el estado vigente de lo que aquí se explica.',
          },
        ],
      },
      {
        icon: 'file',
        title: 'Qué recibe el patrón: la Notice of Inspection',
        subtitle: 'El reloj de los tres días hábiles',
        blocks: [
          {
            kind: 'text',
            text: 'La auditoría empieza cuando el gobierno entrega a la empresa una notificación de inspección, la <strong>Notice of Inspection</strong>. Es un documento dirigido al patrón, no a usted. Desde ahí corre un plazo corto: por regla general, <strong>tres días hábiles</strong> para entregar los formularios I-9 del personal, y con frecuencia también nóminas, listas de empleados y contratos con agencias.',
          },
          {
            kind: 'steps',
            items: [
              'El gobierno entrega la notificación al patrón, por escrito y casi siempre en la oficina de la empresa.',
              'Corren los tres días hábiles para entregar los I-9. El plazo es real y su incumplimiento se sanciona.',
              'El gobierno revisa expediente por expediente y compara la información con sus bases de datos.',
              'Se emiten notificaciones de resultado: errores técnicos corregibles, discrepancias, documentos que no pudo validar y, en su caso, intención de multar a la empresa.',
              'El patrón recibe la lista de trabajadores señalados, que normalmente pueden presentar documentación adicional antes de cualquier decisión.',
            ],
          },
          {
            kind: 'text',
            text: 'Ese último paso es donde la auditoría deja de ser un asunto de la empresa y se vuelve suyo. Que su expediente aparezca señalado <strong>no es una acusación ni una orden de deportación</strong>: es un aviso de que el gobierno no pudo validar lo que consta en su I-9 y de que el patrón tendrá que decidir sobre su empleo en cuestión de días.',
          },
          {
            kind: 'note',
            text: 'Usted puede pedirle a su patrón copia de su propio formulario I-9 y de cualquier notificación que lo mencione. Pídalo por escrito, para que quede fecha: esa copia le permite a un abogado entender en minutos qué está en juego.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'Sus derechos como trabajador cuando llegan agentes',
        subtitle: 'Callar, no firmar, no huir, pedir abogado',
        blocks: [
          {
            kind: 'text',
            text: 'Si un día se presentan agentes en el lugar de trabajo, entienda esto primero: usted conserva derechos constitucionales aunque no tenga estatus migratorio. No dependen de un papel, sino de estar en territorio de Estados Unidos. El problema es que se ejercen en segundos y bajo presión, así que se memorizan antes.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Tiene derecho a guardar silencio.</strong> No está obligado a decir dónde nació ni cuál es su estatus. Puede decir con calma que prefiere no responder sin un abogado.',
              '<strong>No firme nada.</strong> Ni declaraciones, ni salidas voluntarias, ni acuerdos que digan que acepta ser deportado. Una firma puesta bajo presión cierra defensas que sí tenía.',
              '<strong>No corra ni se esconda.</strong> Huir puede convertir un asunto migratorio en un problema penal y casi siempre empeora la situación.',
              '<strong>No mienta ni presente documentos falsos.</strong> Es un delito y genera consecuencias migratorias propias, mucho más graves que el silencio.',
              '<strong>Pida hablar con un abogado</strong> y repítalo cuantas veces haga falta. No tiene que explicar por qué.',
              '<strong>Cuide lo que carga.</strong> Si tiene permiso de trabajo o residencia, llévelo consigo. Si no, evite traer documentos de otro país que no necesita ese día.',
            ],
          },
          {
            kind: 'warning',
            text: 'No responda por un compañero ni deje que alguien responda por usted. Y desconfíe de quien se ofrezca a «arreglarle el caso» en el estacionamiento por una cantidad en efectivo: tras un operativo aparecen notarios y gestores que cobran por trámites que no existen. En Estados Unidos, «notario público» no significa abogado.',
          },
        ],
      },
      {
        icon: 'gavel',
        title: 'Orden judicial u orden administrativa: la diferencia que importa',
        subtitle: 'Un papel con membrete no es una orden de juez',
        blocks: [
          {
            kind: 'text',
            text: 'Cuando alguien cuenta que «traían una orden», casi nunca se leyó el papel. Hay dos documentos que se parecen y no valen lo mismo, y la diferencia decide si los agentes pueden pasar de la recepción hacia adentro.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Orden administrativa (I-200, I-205)',
                desc: 'La firma un funcionario de inmigración, no un juez. Sirve para arrestar a una persona determinada, pero por sí sola no autoriza a entrar sin permiso a las áreas privadas de un negocio.',
              },
              {
                title: 'Orden judicial',
                desc: 'La firma un juez o magistrado, lleva el nombre del tribunal y describe el lugar que puede registrarse y lo que puede buscarse. Esa sí autoriza la entrada a áreas privadas.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Casi todo centro de trabajo tiene <strong>áreas abiertas al público</strong> —un mostrador, un comedor, un estacionamiento sin barrera— y <strong>áreas privadas</strong>: la cocina, la bodega, la nave, las oficinas. En las áreas privadas la entrada depende de que exista una orden judicial o de que alguien con autoridad en la empresa dé su consentimiento. Ese consentimiento lo da o lo niega el patrón, no usted.',
          },
          {
            kind: 'note',
            text: 'No es su trabajo discutir con un agente si la orden es válida. Si puede, fíjese si el documento trae el nombre de un tribunal y la firma de un juez, y anote después lo que vio. Cuénteselo con detalle a un abogado: cómo se hizo la entrada puede tener consecuencias legales.',
          },
        ],
      },
      {
        icon: 'alert',
        title: '«Sus documentos no coinciden»: reverificación y despidos',
        subtitle: 'Lo que el patrón puede y no puede hacer',
        blocks: [
          {
            kind: 'text',
            text: 'Después de una auditoría, la frase que más se escucha en el trabajo es que «sus documentos no coinciden». Detrás suele haber una notificación en la que el gobierno informa que no pudo confirmar que los documentos presentados correspondan a la persona. El patrón avisa entonces al trabajador y le pide documentación adicional en un plazo breve.',
          },
          {
            kind: 'list',
            items: [
              'El patrón <strong>debe darle la oportunidad</strong> de presentar documentación que resuelva la discrepancia, si usted la tiene.',
              'El patrón <strong>no puede exigirle un documento específico</strong>: la ley permite que sea usted quien elija, dentro de las listas oficiales, cuáles presenta.',
              'El patrón <strong>no puede pedirle más documentos o documentos distintos</strong> que a otros trabajadores por su acento, su apellido o su apariencia. Eso es discriminación documental y hay una autoridad federal que investiga esas quejas.',
              'El patrón <strong>no debe reverificar</strong> a un residente que presentó su tarjeta ni a un ciudadano que presentó su pasaporte solo porque el documento traiga una fecha impresa.',
              'Si la discrepancia no se resuelve, lo más probable es que el empleo termine. Es duro, pero <strong>no es una orden de deportación</strong> ni borra el salario que ya ganó.',
            ],
          },
          {
            kind: 'text',
            text: 'Hay una línea que se cruza con frecuencia: usar la auditoría como pretexto. Si el patrón la aprovecha para dar de baja solo a quienes reclamaron horas extras, reportaron una lesión o hablaron de organizarse, eso puede ser algo más que una baja administrativa.',
          },
          {
            kind: 'warning',
            text: 'Si pierde el empleo por una notificación así, guarde todo: la carta o el mensaje del patrón, sus recibos de pago, su horario y los nombres de quiénes se quedaron y quiénes se fueron. Los plazos para presentar una queja por discriminación documental son cortos —se cuentan en meses, no en años— y la prueba se pierde rápido.',
          },
        ],
      },
      {
        icon: 'balance',
        title: 'Represalias por reclamar salarios o reportar una lesión',
        subtitle: 'Protecciones que no preguntan por su estatus',
        blocks: [
          {
            kind: 'text',
            text: 'La confusión más dañina en el trabajo es creer que sin papeles no hay derechos laborales. No es así: las protecciones básicas se construyeron sobre la relación de empleo, no sobre el estatus migratorio de quien trabaja. Un patrón que le dice lo contrario no le está informando, le está avisando que piensa aprovecharse.',
          },
          {
            kind: 'list',
            items: [
              'El <strong>salario ya trabajado se debe pagar</strong>. Las reglas de salario mínimo y horas extras no preguntan por su estatus.',
              'La <strong>seguridad en el trabajo</strong> es obligación del patrón frente a todo su personal, y reportar una condición peligrosa está protegido.',
              'En Texas, <strong>despedir a alguien por presentar de buena fe un reclamo de compensación laboral está prohibido</strong> por la ley estatal.',
              'Si el patrón <strong>no tiene seguro de compensación laboral</strong> (non-subscriber), puede ser demandado directamente por negligencia, y su estatus no es requisito para demandar.',
              'Amenazar con <strong>«llamar a inmigración»</strong> a quien reclama es una represalia, y es el tipo de hecho que un abogado necesita conocer el mismo día.',
            ],
          },
          {
            kind: 'note',
            text: 'Han existido mecanismos por los cuales trabajadores involucrados en la investigación de una agencia laboral pueden solicitar consideración discrecional de las autoridades migratorias mientras esa investigación avanza. Su disponibilidad cambia con la política del momento: pregunte por el estado vigente antes de contar con ello.',
          },
        ],
      },
      {
        icon: 'clock',
        title: 'Si ya hubo operativo: las primeras 48 horas',
        subtitle: 'Lo que la familia debe hacer, en orden',
        blocks: [
          {
            kind: 'text',
            text: 'Un operativo desordena todo en pocas horas: hay gente detenida, compañeros que no saben si volver mañana y niños esperando a que alguien los recoja. Lo que la familia haga en los primeros dos días influye en el caso más de lo que la gente imagina.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Consiga el nombre completo, la fecha de nacimiento y el país de nacimiento</strong> de la persona detenida, tal como aparecen en sus documentos. Si tiene número A de nueve dígitos, anótelo: es la llave de todo.',
              '<strong>Búsquela en el localizador de detenidos</strong> del gobierno. Puede tardar horas en aparecer y puede ser trasladada; repita la búsqueda varias veces al día.',
              '<strong>No firme nada en su nombre y dígale que no firme nada.</strong> Si logra hablar por teléfono con ella, que esa sea la primera frase.',
              '<strong>Llame a un abogado de inmigración</strong>, no a un notario ni a un gestor, y pregunte desde el principio por honorarios y por lo que incluye el servicio.',
              '<strong>Reúna sus documentos</strong>: pasaporte, actas de nacimiento de los hijos, comprobantes de domicilio y de tiempo en el país, cartas de trabajo y papeles de cualquier caso anterior.',
              '<strong>Resuelva lo urgente de la casa</strong>: quién recoge a los niños, quién está autorizado en la escuela, quién puede acceder al dinero y a las medicinas.',
              '<strong>Anote todo lo que pasó</strong> ese día, con horas, nombres y frases textuales. La memoria se deforma en una semana.',
              '<strong>No falte a ninguna cita ni audiencia.</strong> No presentarse ante la corte de inmigración puede provocar una orden de remoción en ausencia, y deshacerla después es mucho más difícil que asistir.',
            ],
          },
          {
            kind: 'warning',
            text: 'Desconfíe de quien prometa sacar a alguien «en 24 horas» a cambio de efectivo, de quien pida el pago completo antes de mostrarle un contrato por escrito y de quien le asegure un resultado. Nadie puede garantizar el resultado de un caso de inmigración.',
          },
        ],
      },
      {
        icon: 'stethoscope',
        title: 'Lesionado y expuesto por su estatus en el mismo trabajo',
        subtitle: 'Dos casos que corren en paralelo',
        blocks: [
          {
            kind: 'text',
            text: 'Hay un escenario que se repite y que la gente vive como una trampa: la persona se lesionó trabajando y, al mismo tiempo, su estatus quedó expuesto por una auditoría o un operativo en esa misma empresa. El instinto es callar la lesión para no llamar la atención. Suele ser la peor decisión, porque la lesión no desaparece y la prueba sí.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'El caso laboral',
                desc: 'La reclamación por la lesión no pregunta por su estatus. Si el patrón tiene seguro de compensación laboral hay una vía; si no lo tiene, puede ser demandado por negligencia. Lo que sí exige es atención médica documentada y un reporte con fecha.',
              },
              {
                title: 'El caso migratorio',
                desc: 'Corre por otro carril, con otros plazos y otra autoridad. Puede haber defensas según su historia, su tiempo en el país y sus familiares, pero necesita su propia estrategia y su propio calendario.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Los dos casos se cruzan en detalles muy prácticos: una declaración grabada ante una aseguradora puede contener afirmaciones que después aparecen en el otro expediente; un acuerdo firmado a las prisas puede incluir renuncias que nadie le tradujo; una dirección desactualizada puede hacerle perder una notificación de la corte.',
          },
          {
            kind: 'note',
            text: 'Si en el mismo trabajo hubo una lesión y además una amenaza relacionada con su estatus, cuéntelo completo desde la primera cita. Un abogado no puede proteger lo que no sabe, y algunos hechos que a usted le parecen vergonzosos son justamente los que abren una defensa.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'El plan de emergencia laboral que conviene acordar hoy',
        subtitle: 'Diez minutos con su familia y sus compañeros',
        blocks: [
          {
            kind: 'text',
            text: 'Lo mejor que puede hacer hoy, sin gastar un dólar, es dejar acordado con su familia y con sus compañeros qué va a pasar si un día llegan agentes. Diez minutos de conversación tranquila valen más que cualquier consejo improvisado bajo presión.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Un número de teléfono memorizado.</strong> El celular se queda en la caja de herramientas o sin batería. Aprenda de memoria el número de un familiar y el de un abogado.',
              '<strong>Un contacto de emergencia por escrito</strong> en la escuela de los niños y en su lugar de trabajo, con alguien que sí pueda responder.',
              '<strong>Copias de documentos importantes</strong> en casa y con una persona de confianza: actas, pasaportes, recibos de pago y papeles de casos anteriores.',
              '<strong>Su número A, si lo tiene</strong>, anotado en dos lugares distintos y compartido con esa persona de confianza.',
              '<strong>Poderes y autorizaciones</strong> para que alguien pueda recoger a los niños, acceder a cuentas y tomar decisiones médicas si usted no está.',
              '<strong>El nombre legal exacto de su patrón</strong> —no el apodo de la obra— y la dirección donde trabaja, apuntados en casa.',
              '<strong>Un acuerdo entre compañeros:</strong> quién avisa a quién, quién guarda la lista de teléfonos personales y quién llama al abogado.',
            ],
          },
          {
            kind: 'note',
            text: 'Actualice ese plan cada vez que cambie de trabajo, de domicilio o de número. Y si se muda teniendo un caso abierto, notifique el cambio a la corte y a inmigración dentro del plazo que corresponda: muchas órdenes de remoción en ausencia empiezan con una carta que llegó a la casa equivocada.',
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Una auditoría I-9 significa que van a llegar agentes a mi trabajo?',
          a: 'No necesariamente. La auditoría es una revisión de papeles que empieza con una notificación al patrón y puede terminar sin que nadie se presente en el lugar. Lo que sí puede ocurrir después es que el gobierno señale expedientes y el patrón tenga que tomar decisiones sobre esos empleos.',
        },
        {
          q: '¿Puedo pedir copia de mi propio formulario I-9?',
          a: 'Puede pedirla, y conviene hacerlo por escrito para que quede fecha. Tener copia de su I-9 y de cualquier notificación que lo mencione le permite a un abogado entender su situación en minutos, en lugar de reconstruirla semanas después con base en recuerdos.',
        },
        {
          q: '¿Qué digo si un agente me pregunta dónde nací?',
          a: 'Puede responder con calma que prefiere no contestar preguntas sin un abogado. No está obligado a declarar sobre su lugar de nacimiento ni sobre su estatus. Lo que nunca debe hacer es mentir ni mostrar un documento falso: eso crea un problema mucho más grave que el silencio.',
        },
        {
          q: '¿Me pueden despedir por la auditoría aunque lleve años trabajando ahí?',
          a: 'Si el gobierno señala su expediente y usted no logra presentar documentación que resuelva la discrepancia, es probable que el empleo termine. Perder el trabajo por esa vía no es una orden de deportación, y no borra el salario que le deben ni un reclamo por una lesión anterior.',
        },
        {
          q: '¿Reclamar mis horas extras o reportar una lesión me pone en riesgo migratorio?',
          a: 'Las protecciones laborales aplican sin importar el estatus y las represalias son ilegales. Dicho eso, cada situación es distinta y vale la pena revisarla con un abogado antes de dar el paso, sobre todo si en esa empresa ya hay una auditoría en curso.',
        },
        {
          q: 'Detuvieron a mi esposo en el trabajo y no sé dónde está. ¿Qué hago?',
          a: 'Reúna su nombre completo, fecha de nacimiento, país de nacimiento y número A si lo tiene, y búsquelo en el localizador de detenidos del gobierno. Puede tardar horas en aparecer y lo pueden trasladar. Mientras tanto, no firme nada en su nombre y contacte a un abogado de inmigración.',
        },
      ],
    },
    conclusion: {
      title: 'Prepararse no es esperar lo peor: es no improvisar',
      text: 'La mayoría de las personas que pierden defensas en un caso de inmigración no las pierden en la corte: las pierden en los primeros minutos, cuando firman algo que no entendieron o responden preguntas que no estaban obligadas a responder. Una auditoría I-9 y un operativo son escenarios distintos, pero los dos se enfrentan mejor con información clara y con un plan acordado antes, no después.',
      advice: 'Si en su trabajo hubo una auditoría, una notificación sobre sus documentos o un operativo, hable con un abogado de inmigración lo antes posible y lleve consigo todos los papeles que tenga.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'Formulario I-9 de USCIS y Manual del Empleador (M-274) — verificación de empleo y listas de documentos aceptables',
        'Immigration and Customs Enforcement (ICE) — Notice of Inspection y proceso de auditoría de formularios I-9',
        'Sección de Derechos del Inmigrante y del Empleado (IER), Departamento de Justicia — discriminación por documentos',
        'Formularios I-200 e I-205 — órdenes administrativas de arresto y de remoción, distintas de una orden judicial',
        'Departamento del Trabajo de EE. UU. y Código Laboral de Texas — salarios, seguridad y prohibición de represalias',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'I-9 Audits and Worksite Raids: Your Rights',
    metaDesc:
      'I-9 audit or worksite operation in Texas: what the employer receives, which deadlines start running, and the rights you keep regardless of status.',
    title: 'I-9 Audits and Worksite Operations: Workers’ Rights',
    displayDate: 'Aug 06, 2026',
    readTime: '10 min',
    categoryLabel: 'Deportation Defense',
    lastUpdated: 'August 6, 2026',
    summary: {
      title: 'Initial Summary',
      text: 'Worksite operations and I-9 audits multiplied through 2025 and 2026 as a pillar of immigration enforcement policy, and in Texas — where state law bars sanctuary policies and 287(g) cooperation agreements with local authorities exist — the margin for error is narrower for workers. An <strong>I-9 audit</strong> and a <strong>worksite operation</strong> are not the same thing: the first begins with a written notice to the employer and a three-business-day deadline to hand over the forms; the second happens on site, with agents present and possible arrests the same day. This article explains how they differ, which rights you keep in each scenario, what your employer can and cannot do when it says your documents do not match, and what to do in the first 48 hours if someone in your family was detained.',
    },
    intro: [
      'Through 2025 and 2026, worksite operations and I-9 form audits became a pillar of immigration enforcement policy. For anyone working in construction, restaurants, processing plants, warehouses, cleaning or transportation, that changed something very concrete: the place where you earn a living also became the place where your case can be decided.',
      'In Texas the landscape is tougher. State law bars sanctuary policies, and there are cooperation agreements between local authorities and immigration enforcement under the 287(g) program, so a contact that in another state would stay in local hands can end up in an immigration file here. That is not a reason to panic, but it is a reason not to improvise.',
      'This article goes down to the specific worksite scenario: what exactly an I-9 audit is, how it differs from an operation, which rights you keep in front of an agent, what your employer can and cannot do with your documents, and what you and your family should do in the hours that follow. It is written to be read before anything happens.',
    ],
    sections: [
      {
        icon: 'swap',
        title: 'An I-9 audit and a worksite operation are not the same thing',
        subtitle: 'Two scenarios you prepare for differently',
        blocks: [
          {
            kind: 'text',
            text: 'Many people use the word "raid" for everything, but at work there are two different events and confusing them is costly. An <strong>I-9 audit</strong> is a paper procedure: the government reviews the employment verification forms the employer must keep for every person hired. A <strong>worksite operation</strong> is a physical action at the workplace, with agents present.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'I-9 audit',
                desc: 'It begins with a written notice to the employer. There are no agents and no arrests that day. Risk to the worker comes later, when the government flags files whose documents it could not validate.',
              },
              {
                title: 'Worksite operation',
                desc: 'Agents show up physically, often separate people by area, and ask about place of birth and status. Here arrests can happen the same day.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Preparation changes too. An audit gives you days, sometimes weeks, to gather documentation and seek advice; an operation resolves itself in minutes and leaves no time to consult anyone. The first is organized calmly; the second is rehearsed, the way a fire drill is rehearsed.',
          },
          {
            kind: 'note',
            text: 'The rules and enforcement practices in this area have changed several times in a short period. Before deciding anything — quitting, signing, moving, filing an application — confirm with an attorney what the current state of the rules described here is.',
          },
        ],
      },
      {
        icon: 'file',
        title: 'What the employer receives: the Notice of Inspection',
        subtitle: 'The three-business-day clock',
        blocks: [
          {
            kind: 'text',
            text: 'An audit begins when the government serves the company a <strong>Notice of Inspection</strong>. It is addressed to the employer, not to you. From that moment a short clock runs: as a general rule, <strong>three business days</strong> to produce the I-9 forms for the workforce, and often payroll records, employee lists and staffing agency contracts as well.',
          },
          {
            kind: 'steps',
            items: [
              'The government serves the notice on the employer, in writing and almost always at the company office.',
              'The three business days start running to produce the I-9s. The deadline is real and missing it carries penalties.',
              'The government reviews the files one by one and compares the information against its databases.',
              'Result notices are issued: correctable technical errors, discrepancies, documents it could not validate and, where applicable, an intent to fine the company.',
              'The employer receives the list of flagged workers, who are normally allowed to present additional documentation before any decision.',
            ],
          },
          {
            kind: 'text',
            text: 'That last step is where the audit stops being the company’s problem and becomes yours. A flagged file <strong>is not an accusation and is not a deportation order</strong>: it is notice that the government could not validate what appears on your I-9, and that the employer will have to decide about your job within days.',
          },
          {
            kind: 'note',
            text: 'You can ask your employer for a copy of your own I-9 form and of any notice that names you. Ask in writing so there is a date: that copy lets an attorney understand in minutes what is at stake.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'Your rights as a worker when agents arrive',
        subtitle: 'Stay silent, sign nothing, do not run, ask for a lawyer',
        blocks: [
          {
            kind: 'text',
            text: 'If agents show up at the workplace one day, understand this first: you keep constitutional rights even without immigration status. They do not depend on a piece of paper but on being on United States soil. The problem is that they are exercised in seconds and under pressure, so you memorize them beforehand.',
          },
          {
            kind: 'list',
            items: [
              '<strong>You have the right to remain silent.</strong> You are not required to say where you were born or what your status is. You can calmly say you prefer not to answer without a lawyer.',
              '<strong>Do not sign anything.</strong> Not statements, not voluntary departure forms, not agreements saying you accept being deported. A signature given under pressure closes off defenses you had.',
              '<strong>Do not run and do not hide.</strong> Fleeing can turn an immigration matter into a criminal problem and almost always makes things worse.',
              '<strong>Do not lie and do not present false documents.</strong> It is a crime and creates its own immigration consequences, far worse than silence.',
              '<strong>Ask to speak with a lawyer</strong> and repeat it as many times as needed. You do not have to explain why.',
              '<strong>Watch what you carry.</strong> If you have a work permit or a green card, carry it. If you do not, avoid carrying documents from another country you do not need that day.',
            ],
          },
          {
            kind: 'warning',
            text: 'Do not answer for a coworker and do not let anyone answer for you. And be wary of anyone offering to "fix your case" in the parking lot for cash: after an operation, notarios and paperwork brokers appear charging for filings that do not exist. In the United States, a "notary public" is not a lawyer.',
          },
        ],
      },
      {
        icon: 'gavel',
        title: 'Judicial warrant or administrative warrant: the difference that matters',
        subtitle: 'A paper with a letterhead is not a judge’s order',
        blocks: [
          {
            kind: 'text',
            text: 'When someone says "they had a warrant," the paper has usually gone unread. There are two documents that look alike and are not worth the same, and the difference decides whether agents can move past the front desk.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Administrative warrant (I-200, I-205)',
                desc: 'Signed by an immigration officer, not a judge. It serves to arrest a specific person, but on its own it does not authorize entry without permission into the private areas of a business.',
              },
              {
                title: 'Judicial warrant',
                desc: 'Signed by a judge or magistrate, it carries the court’s name and describes the place to be searched and what may be looked for. That one does authorize entry into private areas.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Almost every workplace has <strong>areas open to the public</strong> — a counter, a dining room, an open parking lot — and <strong>private areas</strong>: the kitchen, the stockroom, the plant floor, the offices. In private areas, entry depends on a judicial warrant or on someone with authority in the company giving consent. That consent is given or refused by the employer, not by you.',
          },
          {
            kind: 'note',
            text: 'It is not your job to argue with an agent about whether the warrant is valid. If you can, look for a court’s name and a judge’s signature on the document, and write down afterward what you saw. Tell an attorney in detail: how the entry happened can have legal consequences.',
          },
        ],
      },
      {
        icon: 'alert',
        title: '"Your documents do not match": reverification and terminations',
        subtitle: 'What the employer can and cannot do',
        blocks: [
          {
            kind: 'text',
            text: 'After an audit, the sentence you hear most at work is that "your documents do not match." Behind it there is usually a notice in which the government reports it could not confirm that the documents presented belong to the person. The employer then tells the worker and asks for additional documentation within a short window.',
          },
          {
            kind: 'list',
            items: [
              'The employer <strong>must give you the opportunity</strong> to present documentation that resolves the discrepancy, if you have it.',
              'The employer <strong>cannot demand a specific document</strong>: the law lets you choose, from the official lists, which valid documents you present.',
              'The employer <strong>cannot ask you for more or different documents</strong> than it asks of other workers because of your accent, your last name or your appearance. That is document discrimination, and a federal authority investigates those complaints.',
              'The employer <strong>should not reverify</strong> a permanent resident who presented a green card or a citizen who presented a passport just because the document shows a date.',
              'If the discrepancy is not resolved, the job will most likely end. That is hard, but <strong>it is not a deportation order</strong> and it does not erase wages you already earned.',
            ],
          },
          {
            kind: 'text',
            text: 'There is a line that gets crossed often: using the audit as a pretext. If the employer uses the notice to cut only the people who claimed overtime, reported an injury, or talked about organizing, that may be more than an administrative termination.',
          },
          {
            kind: 'warning',
            text: 'If you lose your job over a notice like this, keep everything: the employer’s letter or message, your pay stubs, your schedule and the names of who stayed and who was let go. Deadlines to file a document discrimination complaint are short — counted in months, not years — and evidence disappears fast.',
          },
        ],
      },
      {
        icon: 'balance',
        title: 'Retaliation for claiming wages or reporting an injury',
        subtitle: 'Protections that do not ask about your status',
        blocks: [
          {
            kind: 'text',
            text: 'The most damaging confusion at work is believing that without papers there are no labor rights. That is not so: basic protections were built on the employment relationship, not on the immigration status of the person doing the work. An employer who tells you otherwise is not informing you, he is warning you that he intends to take advantage.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Wages already worked must be paid.</strong> Minimum wage and overtime rules do not ask about your status.',
              '<strong>Workplace safety</strong> is the employer’s obligation toward the entire workforce, and reporting a dangerous condition is protected.',
              'In Texas, <strong>firing someone for filing a good-faith workers’ compensation claim is prohibited</strong> by state law.',
              'If the employer <strong>carries no workers’ compensation insurance</strong> (non-subscriber), it can be sued directly for negligence, and your status is not a requirement to sue.',
              'Threatening to <strong>"call immigration"</strong> on someone who complains is retaliation, and it is the kind of fact an attorney needs to hear the same day.',
            ],
          },
          {
            kind: 'note',
            text: 'Mechanisms have existed through which workers involved in a labor agency investigation can request discretionary consideration from immigration authorities while that investigation proceeds. Their availability shifts with the policy of the moment: ask about the current state of things before relying on any of it.',
          },
        ],
      },
      {
        icon: 'clock',
        title: 'If an operation already happened: the first 48 hours',
        subtitle: 'What the family should do, in order',
        blocks: [
          {
            kind: 'text',
            text: 'An operation throws everything into disorder within hours: people are detained, coworkers do not know whether to come back tomorrow, and children are waiting for someone to pick them up. What the family does in the first two days shapes the case more than people imagine.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Get the full name, date of birth and country of birth</strong> of the detained person, exactly as they appear on their documents. If there is a nine-digit A-number, write it down: it is the key to everything.',
              '<strong>Search for them in the government detainee locator.</strong> It can take hours for someone to appear and they may be transferred; repeat the search several times a day.',
              '<strong>Do not sign anything on their behalf, and tell them not to sign anything.</strong> If you reach them by phone, make that the first sentence.',
              '<strong>Call an immigration attorney</strong>, not a notario or a paperwork broker, and ask up front about fees and what the service includes.',
              '<strong>Gather their documents</strong>: passport, children’s birth certificates, proof of address and time in the country, employment letters and papers from any prior case.',
              '<strong>Handle what is urgent at home</strong>: who picks up the children, who is authorized at the school, who can reach the money and the medications.',
              '<strong>Write down everything that happened</strong> that day, with times, names and exact phrases. Memory distorts within a week.',
              '<strong>Do not miss a single appointment or hearing.</strong> Failing to appear before the immigration court can result in an in-absentia removal order, and undoing one afterward is far harder than showing up.',
            ],
          },
          {
            kind: 'warning',
            text: 'Be wary of anyone who promises to get someone out "in 24 hours" for cash, who asks for full payment before showing you a written contract, or who guarantees you a result. No one can guarantee the outcome of an immigration case.',
          },
        ],
      },
      {
        icon: 'stethoscope',
        title: 'Injured and exposed by your status at the same job',
        subtitle: 'Two cases running in parallel',
        blocks: [
          {
            kind: 'text',
            text: 'There is a scenario that repeats itself and that people experience as a trap: the person was injured at work and, at the same time, their status was exposed by an audit or an operation at that same company. The instinct is to stay quiet about the injury. That is usually the worst decision, because the injury does not go away but the evidence does.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'The work injury case',
                desc: 'A claim for the injury does not ask about your status. If the employer carries workers’ compensation there is one route; if it does not, it can be sued for negligence. What it does require is documented medical care and a dated report.',
              },
              {
                title: 'The immigration case',
                desc: 'It runs on another track, with different deadlines and a different authority. Defenses may exist depending on your history, your time in the country and your family, but it needs its own strategy and calendar.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'The two cases intersect in very practical details: a recorded statement to an insurance company can contain assertions that later show up in the other file; a settlement signed in a hurry can include waivers nobody translated for you; an outdated address can cause you to miss a court notice.',
          },
          {
            kind: 'note',
            text: 'If the same job produced both an injury and a threat tied to your status, tell the whole story at the first appointment. An attorney cannot protect what they do not know, and some facts that feel embarrassing to you are precisely the ones that open a defense.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'The workplace emergency plan worth agreeing on today',
        subtitle: 'Ten minutes with your family and your coworkers',
        blocks: [
          {
            kind: 'text',
            text: 'The best thing you can do today, without spending a dollar, is to settle with your family and your coworkers what happens if agents show up one day. Ten minutes of calm conversation are worth more than any advice improvised under pressure.',
          },
          {
            kind: 'list',
            items: [
              '<strong>A memorized phone number.</strong> The cell phone stays in the toolbox or runs out of battery. Learn by heart the number of a relative and of an attorney.',
              '<strong>A written emergency contact</strong> at the children’s school and at your workplace, naming someone who can actually answer.',
              '<strong>Copies of important documents</strong> at home and with a trusted person: certificates, passports, pay stubs and papers from prior cases.',
              '<strong>Your A-number, if you have one</strong>, written in two separate places and shared with that trusted person.',
              '<strong>Powers of attorney and authorizations</strong> so someone can pick up the children, reach accounts and make medical decisions if you are not there.',
              '<strong>Your employer’s exact legal name</strong> — not the nickname used on the jobsite — and the address where you work, written down at home.',
              '<strong>An agreement among coworkers:</strong> who calls whom, who keeps the list of personal phone numbers and who calls the attorney.',
            ],
          },
          {
            kind: 'note',
            text: 'Update that plan every time you change jobs, addresses or phone numbers. And if you move while you have an open case, report the change to the court and to immigration within the applicable deadline: many in-absentia removal orders begin with a letter that arrived at the wrong house.',
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'Does an I-9 audit mean agents are coming to my workplace?',
          a: 'Not necessarily. An audit is a paperwork review that starts with a notice to the employer and can end without anyone showing up on site. What can happen afterward is that the government flags files and the employer has to make decisions about those jobs.',
        },
        {
          q: 'Can I ask for a copy of my own I-9 form?',
          a: 'You can ask, and it is worth doing it in writing so there is a date. Having a copy of your I-9 and of any notice that names you lets an attorney understand your situation in minutes rather than reconstructing it weeks later from memory.',
        },
        {
          q: 'What do I say if an agent asks me where I was born?',
          a: 'You can calmly say you prefer not to answer questions without a lawyer. You are not required to state your place of birth or your status. What you must never do is lie or show a false document: that creates a far more serious problem than silence.',
        },
        {
          q: 'Can they fire me over the audit even though I have worked there for years?',
          a: 'If the government flags your file and you cannot present documentation that resolves the discrepancy, the job will likely end. Losing work that way is not a deportation order, and it does not erase wages you are owed or a claim for an earlier injury.',
        },
        {
          q: 'Does claiming my overtime or reporting an injury put me at immigration risk?',
          a: 'Labor protections apply regardless of status, and retaliation is illegal. That said, every situation is different and it is worth reviewing with an attorney before taking the step, especially if an audit is already underway at that company.',
        },
        {
          q: 'My husband was detained at work and I do not know where he is. What do I do?',
          a: 'Gather his full name, date of birth, country of birth and A-number if he has one, and search the government detainee locator. It can take hours for him to appear and he may be transferred. In the meantime, do not sign anything on his behalf and contact an immigration attorney.',
        },
      ],
    },
    conclusion: {
      title: 'Preparing is not expecting the worst: it is refusing to improvise',
      text: 'Most people who lose defenses in an immigration case do not lose them in court: they lose them in the first few minutes, when they sign something they did not understand or answer questions they were not required to answer. An I-9 audit and a worksite operation are different scenarios, but both go better with clear information and a plan agreed on beforehand, not afterward.',
      advice: 'If your workplace has had an audit, a notice about your documents, or an operation, speak with an immigration attorney as soon as possible and bring every paper you have.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'USCIS Form I-9 and Handbook for Employers (M-274) — employment verification and lists of acceptable documents',
        'Immigration and Customs Enforcement (ICE) — Notice of Inspection and the I-9 audit process',
        'Immigrant and Employee Rights Section (IER), U.S. Department of Justice — document discrimination',
        'Forms I-200 and I-205 — administrative arrest and removal warrants, distinct from a judicial warrant',
        'U.S. Department of Labor and the Texas Labor Code — wages, workplace safety and the ban on retaliation',
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
          ? 'Trabajadores en un centro de trabajo durante una auditoría I-9 en Texas'
          : 'Workers at a Texas jobsite during an I-9 audit'
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
