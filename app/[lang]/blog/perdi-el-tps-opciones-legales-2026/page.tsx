import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'perdi-el-tps-opciones-legales-2026';
const ISO_DATE = '2026-08-06';
const IMAGE = '/blog/covers/perdi-el-tps-opciones-legales-2026.jpg';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Perdí el TPS: 5 caminos legales que quedan',
    metaDesc:
      'Si su designación de TPS terminó, aún puede haber opciones: ajuste por familia, asilo, Visa U, VAWA o cancelación de remoción. Y los errores que cierran puertas.',
    title: 'Perdí el TPS: 5 caminos legales que podrían mantenerte en Estados Unidos',
    displayDate: '06 Ago, 2026',
    readTime: '23 min',
    categoryLabel: 'Visa Humanitaria',
    lastUpdated: '6 de agosto de 2026',
    summary: {
      title: 'Resumen inicial',
      text: 'Durante años la pregunta de las familias con TPS fue <strong>cómo renovar</strong>. Tras un fallo de la Corte Suprema de junio de 2026 que permitió terminar designaciones de TPS y sentó precedente para otras, y con los permisos de trabajo emitiéndose ahora por un año, la pregunta cambió: <strong>ya no es cómo renovar, es qué hago si lo perdí</strong>. Perder el TPS no es perderlo todo, pero sí quedarse sin el paraguas que cubría a la familia. Aquí: qué cambia cuando termina la designación, los cinco caminos que sostienen estos casos y los errores que cierran puertas.',
    },
    intro: [
      'Si usted tuvo TPS, sabe lo que es vivir con calendario: cada 12 o 18 meses, la misma incertidumbre, el mismo trámite, la misma espera del aviso oficial. Ese ciclo tenía algo tranquilizador, porque siempre terminaba con un permiso nuevo en la mano. En 2026 se rompió.',
      'Una decisión de la Corte Suprema de junio de 2026 permitió que avanzaran terminaciones de designaciones de TPS y marcó un precedente que alcanza a varias más. Sumado a terminaciones anteriores y a que los permisos de trabajo ahora se emiten por un año, muchísimas personas que llevaban una década trabajando y criando hijos aquí se quedan sin la única protección que tenían.',
      'Este artículo no repite cómo se renueva el TPS: eso ya lo cubrimos en otro post y, para muchos lectores, ya no aplica. Aquí hablamos de lo otro, <strong>qué se puede hacer cuando el TPS ya no está</strong>, con la ley estable en la mano y sin promesas.',
    ],
    sections: [
      {
        icon: 'clock',
        title: 'Perder el TPS no es perderlo todo: qué cambia',
        subtitle: 'Lo primero, con calma',
        blocks: [
          {
            kind: 'text',
            text: 'El TPS termina en una fecha concreta, publicada oficialmente y casi siempre con un periodo de transición. Ese día no pasa nada dramático en la puerta de su casa, pero ocurren tres cosas jurídicas de las que dependen todas las decisiones que vienen después.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Se acaba la protección contra la remoción.</strong> Con TPS no podía ser deportado por estar aquí sin otro estatus; al terminar, vuelve a la situación que tenía antes, que casi siempre era ninguna.',
              '<strong>Se vence el permiso de trabajo.</strong> El EAD vive y muere con la designación. Puede haber prórrogas automáticas en el aviso oficial, pero hay que confirmar la fecha que aplica a su categoría.',
              '<strong>Se reanuda la presencia ilegal.</strong> Con TPS la ley lo trataba como si mantuviera estatus legal para ciertos efectos; al terminar, el reloj corre otra vez y activa las barras de 3 y 10 años si sale del país.',
            ],
          },
          {
            kind: 'text',
            text: 'Ahora lo que <strong>no</strong> pasa: no hay deportación automática, nadie borra los años que usted lleva aquí, no se cancelan las solicitudes ya presentadas ni se anula una petición familiar aprobada. Perder el TPS lo deja expuesto, no lo deja sin historia.',
          },
          {
            kind: 'note',
            text: 'Las fechas de terminación y las prórrogas automáticas se publican caso por caso y pueden cambiar por litigio o por avisos posteriores. Verifique el estado vigente de su designación y de su EAD antes de actuar: lo que era cierto hace un mes puede no serlo hoy.',
          },
        ],
      },
      {
        icon: 'swap',
        title: 'El TPS era un paraguas, no un piso',
        subtitle: 'Por qué tantas familias quedaron expuestas',
        blocks: [
          {
            kind: 'text',
            text: 'Este es el malentendido que más daño ha hecho. Mucha gente vivió el TPS como si fuera una residencia lenta: permiso de trabajo, licencia, impuestos, casa, hijos en la escuela. Pero jurídicamente nunca fue un piso sobre el que se construye: fue un paraguas que se abre mientras el país de origen atraviesa una crisis y que, por diseño, se puede cerrar.',
          },
          {
            kind: 'table',
            headers: ['Qué', 'TPS', 'Residencia permanente'],
            rows: [
              ['Duración', 'Atada a la designación; se puede terminar', 'Indefinida'],
              ['Permiso de trabajo', 'Solo mientras dure la designación', 'No depende de una designación'],
              ['Salir del país', 'Solo con autorización previa, y con riesgos', 'Con la tarjeta, dentro de ciertos límites'],
              ['Pedir familiares', 'No lo permite', 'Cónyuge e hijos'],
              ['Ciudadanía', 'Por sí solo, no', 'Sí, cumplidos los requisitos'],
            ],
          },
          {
            kind: 'text',
            text: 'Los años con TPS <strong>no lo acercaron por sí solos a una green card</strong>, porque nadie acumula residencia por antigüedad. Pero sí produjeron algo valioso —presencia física continua documentada, historial laboral y fiscal, hijos ciudadanos, expedientes médicos— y varios de los caminos que siguen se construyen con ese material.',
          },
        ],
      },
      {
        icon: 'heart',
        title: 'Camino 1: ajuste de estatus por un familiar cercano',
        subtitle: 'La ruta más común y la peor entendida',
        blocks: [
          {
            kind: 'text',
            text: 'Es la primera pregunta de todos: <strong>¿mi esposo ciudadano, mi hijo ciudadano, me pueden arreglar?</strong> Como familiar inmediato de un ciudadano —cónyuge, hijo menor de 21 y soltero, o padre o madre de un ciudadano que ya cumplió 21— no hay fila de visas; si el peticionario es residente, la espera es de años. Pero lo que define el caso es otra cosa: <strong>cómo entró usted a Estados Unidos</strong>.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Entró con visa o con inspección',
                desc: 'Aunque se le haya vencido, la ley generalmente permite ajustar dentro del país como familiar inmediato de un ciudadano. Es el mejor escenario y el que más se pierde por no revisar pasaportes viejos.',
              },
              {
                title: 'Entró sin inspección',
                desc: 'Por regla general no se puede ajustar aquí: el caso iría al consulado del país de origen, y salir activa las barras de 3 o 10 años.',
              },
              {
                title: 'Salió y volvió con permiso del TPS',
                desc: 'Quien viajó con autorización del TPS y regresó puede, en ciertos supuestos, ser tratado como inspeccionado y admitido. Es un punto técnico que hay que revisar documento en mano.',
              },
              {
                title: 'El perdón provisional I-601A',
                desc: 'Permite pedir el perdón de la presencia ilegal antes de salir. Exige sufrimiento extremo de un cónyuge o padre ciudadano o residente: un hijo ciudadano puede peticionar, pero no sirve como familiar calificado aquí.',
              },
            ],
          },
          {
            kind: 'warning',
            text: 'El error más caro que vemos: la familia asume que con un hijo ciudadano de 21 años ya está todo resuelto y compra el boleto para la cita consular sin pedir el perdón. Salen, se activa la barra de 10 años y la familia queda partida. Nunca salga del país sin que un abogado haya revisado su entrada, su presencia ilegal y su familiar calificado.',
          },
        ],
      },
      {
        icon: 'globe',
        title: 'Camino 2: asilo, y el problema del plazo de un año',
        subtitle: 'No siempre está cerrado',
        blocks: [
          {
            kind: 'text',
            text: 'Conviene empezar por una distinción que se confunde siempre. El TPS se otorga por las condiciones del país —un desastre, un conflicto, una crisis extraordinaria— y no exige que a usted en particular le haya pasado nada. El asilo es al revés: exige un <strong>temor fundado de persecución dirigida contra usted</strong> por su raza, religión, nacionalidad, opinión política o pertenencia a un grupo social determinado. Haber tenido TPS no le da asilo.',
          },
          {
            kind: 'text',
            text: 'El obstáculo clásico es el plazo: la solicitud se presenta, por regla general, dentro del primer año desde la última entrada. Quien lleva diez o quince años aquí da por hecho que esa puerta está cerrada con llave, y no siempre lo está. Hay excepciones por <strong>circunstancias cambiantes</strong> y por <strong>circunstancias extraordinarias</strong>, y el reglamento de asilo menciona expresamente el haber mantenido TPS entre estas últimas. La condición que la gente pasa por alto: hay que presentar dentro de un plazo razonable después de que el TPS termina, y razonable se mide en semanas o meses, no en años.',
          },
          {
            kind: 'text',
            text: 'Si el plazo ya no se puede salvar, quedan dos protecciones parientes sin límite de un año: la <strong>retención de remoción</strong> y la <strong>Convención contra la Tortura</strong>. Exigen más prueba y no llevan a la residencia, pero impiden el envío a un país donde la persona corre peligro.',
          },
          {
            kind: 'warning',
            text: 'El asilo no es un trámite para ganar tiempo ni un permiso de trabajo disfrazado. Una solicitud presentada a sabiendas con datos falsos puede declararse frívola y dejar a la persona permanentemente inelegible para casi cualquier beneficio migratorio. Si su historia es real, cuéntela completa; si no lo es, este no es su camino.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'Camino 3: Visa U, VAWA y Visa T',
        subtitle: 'Protecciones para quien fue víctima',
        blocks: [
          {
            kind: 'text',
            text: 'Este es el camino que más se descubre en consulta y menos se busca en internet, porque exige nombrar algo que muchas veces nunca se contó. En diez o quince años aquí, mucha gente pasó por un asalto, violencia doméstica, una agresión sexual o una situación laboral que fue lisa y llanamente trabajo forzado, y no lo menciona por vergüenza o porque cree que no viene al caso. A veces ahí está la única puerta abierta.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Visa U',
                desc: 'Para víctimas de ciertos delitos con abuso físico o mental sustancial que colaboraron con la autoridad. Requiere una certificación firmada por policía o fiscalía. Hay cupo anual y listas largas, pero mientras se espera puede obtenerse permiso de trabajo y protección contra la remoción.',
              },
              {
                title: 'VAWA',
                desc: 'Autopetición para cónyuges, hijos y padres maltratados por un ciudadano o residente permanente. No requiere el permiso ni el conocimiento del agresor, aplica a hombres y a mujeres, y puede llevar a la residencia.',
              },
              {
                title: 'Visa T',
                desc: 'Para víctimas de formas severas de trata de personas, incluidas la servidumbre por deudas y el trabajo forzado bajo amenaza. Es más común de lo que se cree en construcción, limpieza, campo y restaurante.',
              },
              {
                title: 'Lo que tienen en común',
                desc: 'Las tres protegen la confidencialidad de quien solicita, no dependen de que el agresor coopere y no exigen que la víctima tenga estatus.',
              },
            ],
          },
          {
            kind: 'note',
            text: 'Que el delito haya ocurrido hace años no lo descalifica automáticamente, y que no exista una condena tampoco: lo que suele pedirse es que haya habido una denuncia, una investigación o alguna forma de colaboración con la autoridad. Cuéntelo en la consulta aunque crea que ya no sirve.',
          },
        ],
      },
      {
        icon: 'gavel',
        title: 'Camino 4: cancelación de remoción si llega a corte',
        subtitle: 'Una defensa, no una solicitud que se manda por correo',
        blocks: [
          {
            kind: 'text',
            text: 'Suena contradictorio y conviene entenderlo bien: la cancelación de remoción para quien no es residente <strong>solo existe como defensa ante un juez de inmigración</strong>. No hay formulario para mandar a USCIS ni forma de pedirla desde su casa. Es una puerta que se abre únicamente cuando el gobierno inicia un proceso en su contra.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Diez años de presencia física continua</strong> antes de que le entreguen el documento que inicia el proceso.',
              '<strong>Buen carácter moral</strong> durante ese periodo, sin ciertas condenas ni conductas que la ley descalifica.',
              '<strong>Un familiar calificado</strong>: cónyuge, padre, madre o hijo ciudadano o residente. Hermanos, primos y parejas sin matrimonio no cuentan.',
              '<strong>Sufrimiento excepcional y extremadamente inusual</strong> para ese familiar si a usted lo deportan. No basta la separación ni la pérdida de ingresos.',
            ],
          },
          {
            kind: 'text',
            text: 'El requisito del sufrimiento decide la mayoría de estos casos y se construye con evidencia concreta: la condición médica de un hijo que necesita tratamiento continuo, una discapacidad, una necesidad educativa especial, la dependencia total de un padre enfermo, las condiciones de salud y seguridad en el país de destino. Se prueba con expedientes y cartas de especialistas.',
          },
          {
            kind: 'warning',
            text: 'Dos advertencias que cambian casos. El reloj de los diez años se detiene cuando le entregan el documento que inicia el proceso, así que el tiempo posterior ya no suma. Y ciertas ausencias del país rompen la continuidad: una salida larga, o varias cortas que sumadas pasan del límite legal. Nunca provoque un proceso de corte creyendo que así abre esta puerta.',
          },
        ],
      },
      {
        icon: 'file',
        title: 'Camino 5: opciones por empleo y la puerta de 245(i)',
        subtitle: 'Para casos específicos, no para todos',
        blocks: [
          {
            kind: 'text',
            text: 'Mucha gente con TPS lleva diez o quince años en la misma empresa, con un patrón dispuesto a apoyarla. La residencia por empleo existe, pero es lenta y tiene un requisito que sorprende a los patrones: en la mayoría de los casos hay que hacer primero una certificación laboral, es decir, probar ante el Departamento del Trabajo que se buscó a un trabajador estadounidense para ese puesto y no se encontró a nadie disponible y calificado.',
          },
          {
            kind: 'text',
            text: 'La categoría más usada es la tercera preferencia por empleo, conocida como EB-3, que incluye trabajadores calificados, profesionales y también <strong>otros trabajadores</strong> para puestos que no requieren experiencia larga. Las esperas son de años y dependen del país de nacimiento: es un camino real, no una solución de emergencia.',
          },
          {
            kind: 'text',
            text: 'Y aquí reaparece el muro del Camino 1: que le aprueben la petición no le da estatus. Hay que ajustar dentro del país —lo que normalmente exige haber entrado legalmente— o salir al consulado, con el riesgo de las barras. Por eso conviene revisar la sección <strong>245(i)</strong>: quien fue beneficiario de una petición familiar o de una certificación laboral presentada dentro de los plazos que fijó esa ley hace más de dos décadas puede quedar protegido y ajustar aquí aunque haya entrado sin inspección, pagando la cantidad adicional que la ley establece.',
          },
          {
            kind: 'note',
            text: 'Busque en las cajas de documentos viejos de la familia: una petición que un tío o un patrón presentó en 2001, aunque nunca haya avanzado, puede ser hoy la diferencia entre ajustar en Houston y tener que salir del país.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Los errores que cierran puertas',
        subtitle: 'Lo que vemos cada semana en la oficina',
        blocks: [
          {
            kind: 'text',
            text: 'Casi ningún caso se pierde por lo que hizo el gobierno. Se pierde por decisiones tomadas con miedo, con prisa o con el consejo equivocado.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Salir del país.</strong> Sin TPS ya no hay autorización de viaje: salir activa las barras y puede abandonar solicitudes pendientes.',
              '<strong>Faltar a corte o no actualizar su dirección.</strong> Si las notificaciones llegan a una casa donde ya no vive, usted no se entera y la audiencia perdida termina en una orden de remoción en ausencia.',
              '<strong>Trabajar con el permiso vencido.</strong> Lo expone a usted y a su patrón, y complica el buen carácter moral que exigen varios de estos caminos.',
              '<strong>Usar documentos ajenos o falsos.</strong> Puede generar inelegibilidades muy graves, y declararse falsamente ciudadano estadounidense produce una barra que en la práctica no tiene perdón.',
              '<strong>Ir con un notario.</strong> En este país un notary public no es abogado ni puede dar asesoría legal; los casos mal armados cuestan el doble de corregir.',
              '<strong>No hacer nada.</strong> El más común: esperar otra prórroga consume los meses que servían para preparar el asilo o encontrar la petición de 2001.',
            ],
          },
          {
            kind: 'warning',
            text: 'Si alguna vez firmó una salida voluntaria en la frontera, tuvo un proceso de corte o fue detenido, esa historia ya existe en un expediente aunque usted no la recuerde bien. Cuéntela completa desde la primera consulta: un abogado puede trabajar con antecedentes malos, pero no con sorpresas a mitad del caso.',
          },
          {
            kind: 'note',
            text: 'Empiece hoy por lo básico: la fecha exacta de su EAD, los pasaportes y registros de entrada, la prueba de todos los años que lleva aquí y la lista de sus familiares ciudadanos o residentes.',
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Me pueden deportar apenas termine mi TPS?',
          a: 'Terminar el TPS no equivale a una orden de deportación: usted queda sin la protección que impedía iniciar un proceso. Cualquier remoción tiene que pasar por un procedimiento en el que puede presentar defensas, y varias de las que explicamos aquí solo se piden precisamente ahí.',
        },
        {
          q: '¿Puedo seguir trabajando con mi EAD vencido si ya presenté otra solicitud?',
          a: 'Depende de qué presentó y de si esa solicitud genera su propio permiso de trabajo, lo cual casi nunca es inmediato. No asuma que un caso pendiente lo autoriza a trabajar: pregunte qué documento exacto lo respalda y desde qué fecha.',
        },
        {
          q: 'Tengo hijos ciudadanos menores de edad. ¿Ellos me pueden arreglar?',
          a: 'Todavía no. Un hijo ciudadano puede peticionar a su padre o madre cuando cumple 21 años, y antes no. Tampoco sirve como familiar calificado para el perdón I-601A, que exige cónyuge o padre ciudadano o residente. Donde sí pesa un hijo menor es en la cancelación de remoción.',
        },
        {
          q: 'Salí del país con permiso de viaje del TPS y regresé. ¿Eso me ayuda?',
          a: 'Puede ayudar bastante, porque en ciertos supuestos ese regreso se trata como entrada inspeccionada y abriría la posibilidad de ajustar aquí. Depende del documento concreto y de la fecha del viaje: lleve el pasaporte y el permiso a la consulta.',
        },
        {
          q: 'Ya tengo una orden de deportación vieja. ¿Sigue habiendo algo que hacer?',
          a: 'Puede haberlo, aunque el terreno es más estrecho. Según los hechos, cabe pedir la reapertura del caso o atacar una orden dictada en ausencia cuando nunca se recibió la notificación. Lo que no conviene es ignorarla.',
        },
        {
          q: '¿Cuánto tardan estos caminos?',
          a: 'Varían muchísimo: hay solicitudes que dan protección en meses y otras, sujetas a cupos anuales o a filas por país, que se miden en años. Nadie puede prometerle un plazo. Lo que sí es cierto es que empezar tarde no acorta nada y sí cierra opciones.',
        },
      ],
    },
    conclusion: {
      title: 'El paraguas se cerró; la vida que construyó sigue ahí',
      text: 'Perder el TPS es perder una protección, no los diez o quince años que usted lleva sosteniendo a una familia en este país. Esos años son presencia continua, historial fiscal, hijos ciudadanos y documentos: la base sobre la que se arma cualquiera de los cinco caminos de este artículo. La diferencia entre las familias que salen adelante y las que no rara vez está en la suerte, sino en quién revisó su caso a tiempo.',
      advice: 'Si su designación terminó o está por terminar, reúna sus documentos y busque una revisión completa de su caso ahora, mientras todavía hay opciones sobre la mesa.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'Ley de Inmigración y Nacionalidad (INA), sección 244 — Estatus de Protección Temporal',
        'INA secciones 245 y 245(i) — ajuste de estatus y peticiones antiguas',
        'INA sección 240A(b) — cancelación de remoción para no residentes permanentes',
        'Reglamento federal de asilo — plazo de un año y excepciones',
        'USCIS — Formularios I-589, I-918, I-914, I-360 e I-601A',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'I Lost TPS: 5 Legal Paths That Remain',
    metaDesc:
      'If your TPS designation ended, options may remain: family adjustment, asylum, U visa, VAWA or cancellation of removal. Plus the mistakes that close doors.',
    title: 'I Lost TPS: 5 Legal Paths That Could Keep You in the United States',
    displayDate: 'Aug 06, 2026',
    readTime: '23 min',
    categoryLabel: 'Humanitarian Relief',
    lastUpdated: 'August 6, 2026',
    summary: {
      title: 'Initial Summary',
      text: 'For years the question families with TPS asked was <strong>how do I renew</strong>. After a June 2026 Supreme Court ruling that allowed TPS designations to be terminated and set a precedent reaching others, and with work permits now issued for one year, the question changed: <strong>it is no longer how to renew, it is what do I do now that I lost it</strong>. Losing TPS is not losing everything, but it does mean losing the umbrella that covered the family. Here: what changes when a designation ends, the five paths that carry these cases, and the mistakes that close doors.',
    },
    intro: [
      'If you have held TPS, you know what it is to live by a calendar: every 12 or 18 months, the same uncertainty, the same filing, the same wait for the official notice. That cycle had something reassuring about it, because it always ended with a new permit in your hand. In 2026 it broke.',
      'A June 2026 Supreme Court decision allowed terminations of TPS designations to move forward and set a precedent that reaches several more. Added to earlier terminations and to the fact that work permits are now issued for one year, a great many people who spent a decade working and raising children here are left without the only protection they had.',
      'This article does not repeat how to renew TPS: another post already covers that and, for many readers, it no longer applies. Here we talk about the other thing, <strong>what can be done once TPS is gone</strong>, with settled law in hand and without promises.',
    ],
    sections: [
      {
        icon: 'clock',
        title: 'Losing TPS is not losing everything: what changes',
        subtitle: 'First things first, calmly',
        blocks: [
          {
            kind: 'text',
            text: 'TPS ends on a specific date, officially published and almost always with a transition period. Nothing dramatic happens at your front door that day, but three legal things do happen, and every decision that follows depends on them.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Protection from removal ends.</strong> With TPS you could not be deported simply for being here without another status; once it ends, you return to the situation you had before, which was almost always none.',
              '<strong>The work permit expires.</strong> The EAD lives and dies with the designation. There may be automatic extensions in the official notice, but you have to confirm the date that applies to your category.',
              '<strong>Unlawful presence resumes.</strong> With TPS the law treated you as maintaining lawful status for certain purposes; once it ends, the clock runs again and triggers the 3- and 10-year bars if you leave the country.',
            ],
          },
          {
            kind: 'text',
            text: 'Now what does <strong>not</strong> happen: there is no automatic deportation, nobody erases the years you have lived here, applications already filed are not cancelled, and an approved family petition is not voided. Losing TPS leaves you exposed; it does not leave you without a history.',
          },
          {
            kind: 'note',
            text: 'Termination dates and automatic extensions are published case by case and can change through litigation or later notices. Verify the current status of your designation and your EAD before acting: what was true a month ago may not be true today.',
          },
        ],
      },
      {
        icon: 'swap',
        title: 'TPS was an umbrella, not a foundation',
        subtitle: 'Why so many families were left exposed',
        blocks: [
          {
            kind: 'text',
            text: 'This is the misunderstanding that has done the most damage. Many people experienced TPS as if it were a slow green card: work permit, driver license, taxes, a house, children in school. But legally it was never a foundation to build on: it was an umbrella opened while the home country goes through a crisis, and one that by design can be closed.',
          },
          {
            kind: 'table',
            headers: ['What', 'TPS', 'Permanent residence'],
            rows: [
              ['Duration', 'Tied to the designation; it can be terminated', 'Indefinite'],
              ['Work permit', 'Only while the designation lasts', 'Does not depend on a designation'],
              ['Leaving the country', 'Only with prior authorization, and with risk', 'With the card, within certain limits'],
              ['Petitioning relatives', 'Not allowed', 'Spouse and children'],
              ['Citizenship', 'On its own, no', 'Yes, once the requirements are met'],
            ],
          },
          {
            kind: 'text',
            text: 'Years on TPS <strong>did not by themselves bring you closer to a green card</strong>, because nobody earns residence through seniority. But they did produce something valuable — documented continuous physical presence, a work and tax record, citizen children, medical files — and several of the paths that follow are built out of that material.',
          },
        ],
      },
      {
        icon: 'heart',
        title: 'Path 1: adjustment of status through a close relative',
        subtitle: 'The most common route and the least understood',
        blocks: [
          {
            kind: 'text',
            text: 'It is everyone’s first question: <strong>can my citizen husband, my citizen child, fix my papers?</strong> As the immediate relative of a citizen — spouse, unmarried child under 21, or the parent of a citizen who has turned 21 — there is no visa line; if the petitioner is a resident, the wait runs years. But what defines the case is something else: <strong>how you entered the United States</strong>.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'You entered with a visa or were inspected',
                desc: 'Even if it later expired, the law generally allows adjustment inside the country as the immediate relative of a citizen. It is the best scenario and the one most often lost by never checking old passports.',
              },
              {
                title: 'You entered without inspection',
                desc: 'As a general rule you cannot adjust here: the case would go to the consulate in your home country, and departing triggers the 3- or 10-year bars.',
              },
              {
                title: 'You left and returned on TPS permission',
                desc: 'Someone who traveled with TPS authorization and came back may, in certain circumstances, be treated as inspected and admitted. It is a technical point that must be reviewed with the documents in hand.',
              },
              {
                title: 'The I-601A provisional waiver',
                desc: 'It lets you request the unlawful presence waiver before departing. It requires extreme hardship to a citizen or resident spouse or parent: a citizen child can petition for you, but does not count as a qualifying relative here.',
              },
            ],
          },
          {
            kind: 'warning',
            text: 'The most expensive mistake we see: the family assumes that with a 21-year-old citizen child everything is solved, and buys the ticket for the consular appointment without filing the waiver. They leave, the 10-year bar is triggered, and the family is split. Never leave the country without an attorney first reviewing your entry, your unlawful presence and your qualifying relative.',
          },
        ],
      },
      {
        icon: 'globe',
        title: 'Path 2: asylum, and the one-year deadline problem',
        subtitle: 'Not always closed',
        blocks: [
          {
            kind: 'text',
            text: 'Start with a distinction that gets confused constantly. TPS is granted because of country conditions — a disaster, a conflict, an extraordinary crisis — and does not require that anything happened to you personally. Asylum is the opposite: it requires a <strong>well-founded fear of persecution aimed at you</strong> because of race, religion, nationality, political opinion or membership in a particular social group. Having held TPS does not give you asylum.',
          },
          {
            kind: 'text',
            text: 'The classic obstacle is the deadline: the application is generally filed within one year of your last entry. Someone here for ten or fifteen years assumes that door is locked, and it is not always. There are exceptions for <strong>changed circumstances</strong> and for <strong>extraordinary circumstances</strong>, and the asylum regulation expressly lists having maintained TPS among the latter. The condition people overlook: it must be filed within a reasonable period after TPS ends, and reasonable is measured in weeks or months, not years.',
          },
          {
            kind: 'text',
            text: 'If the deadline cannot be saved, two related protections carry no one-year limit: <strong>withholding of removal</strong> and the <strong>Convention Against Torture</strong>. They demand more proof and do not lead to residence, but they prevent removal to a country where the person is in danger.',
          },
          {
            kind: 'warning',
            text: 'Asylum is not a device to buy time or a work permit in disguise. An application knowingly filed with false information can be found frivolous and leave the person permanently ineligible for nearly any immigration benefit. If your story is real, tell it in full; if it is not, this is not your path.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'Path 3: U visa, VAWA and T visa',
        subtitle: 'Protections for those who were victims',
        blocks: [
          {
            kind: 'text',
            text: 'This is the path most often discovered in a consultation and least often searched for online, because it requires naming something many people never told anyone. Over ten or fifteen years here, many went through a robbery, domestic violence, a sexual assault, or a work situation that was plainly forced labor, and never mention it out of shame or because they assume it is beside the point. Sometimes that is the only door still open.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'U visa',
                desc: 'For victims of certain crimes involving substantial physical or mental abuse who cooperated with authorities. It requires a certification signed by police or a prosecutor. There is an annual cap and long lists, but while waiting it is possible to obtain work authorization and protection from removal.',
              },
              {
                title: 'VAWA',
                desc: 'A self-petition for spouses, children and parents abused by a citizen or permanent resident. It does not require the abuser to consent or even know, applies to men as well as women, and can lead to residence.',
              },
              {
                title: 'T visa',
                desc: 'For victims of severe forms of human trafficking, including debt bondage and forced labor under threat. It is more common than people think in construction, cleaning, agricultural and restaurant work.',
              },
              {
                title: 'What they have in common',
                desc: 'All three protect the applicant’s confidentiality, do not depend on the abuser cooperating, and do not require the victim to have status.',
              },
            ],
          },
          {
            kind: 'note',
            text: 'The fact that the crime happened years ago does not automatically disqualify you, and neither does the absence of a conviction: what is usually needed is that there was a report, an investigation or some form of cooperation with authorities. Raise it in the consultation even if you believe it is no longer useful.',
          },
        ],
      },
      {
        icon: 'gavel',
        title: 'Path 4: cancellation of removal if it reaches court',
        subtitle: 'A defense, not an application you mail in',
        blocks: [
          {
            kind: 'text',
            text: 'It sounds contradictory and is worth understanding well: cancellation of removal for someone who is not a resident <strong>exists only as a defense before an immigration judge</strong>. There is no form to send to USCIS and no way to request it from home. It is a door that opens only once the government starts proceedings against you.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Ten years of continuous physical presence</strong> before you are served with the document that begins the proceedings.',
              '<strong>Good moral character</strong> during that period, without certain convictions or conduct the law disqualifies.',
              '<strong>A qualifying relative</strong>: a citizen or resident spouse, parent or child. Siblings, cousins and unmarried partners do not count.',
              '<strong>Exceptional and extremely unusual hardship</strong> to that relative if you are deported. Separation and lost income are not enough.',
            ],
          },
          {
            kind: 'text',
            text: 'The hardship requirement decides most of these cases, and it is built with concrete evidence: a child’s medical condition requiring ongoing treatment, a disability, a special educational need, total dependence of an ill parent, health and safety conditions in the destination country. It is proven with records and specialist letters.',
          },
          {
            kind: 'warning',
            text: 'Two warnings that change cases. The ten-year clock stops when you are served with the document that begins proceedings, so time after that no longer counts. And certain absences break continuity: one long trip, or several short ones that together exceed the legal limit. Never provoke a court case believing it opens this door.',
          },
        ],
      },
      {
        icon: 'file',
        title: 'Path 5: employment options and the 245(i) door',
        subtitle: 'For specific cases, not for everyone',
        blocks: [
          {
            kind: 'text',
            text: 'Many people with TPS have spent ten or fifteen years at the same company, with an employer willing to help. Employment-based residence exists, but it is slow and carries a requirement that surprises employers: in most cases a labor certification comes first, meaning proof to the Department of Labor that a U.S. worker was sought for the position and none available and qualified was found.',
          },
          {
            kind: 'text',
            text: 'The category most used is the third employment preference, known as EB-3, which covers skilled workers, professionals and also <strong>other workers</strong> for positions that do not require long experience. Waits run years and depend on country of birth: it is a real path, not an emergency solution.',
          },
          {
            kind: 'text',
            text: 'And here the wall from Path 1 reappears: having the petition approved does not give you status. You must adjust inside the country — which normally requires having entered legally — or go to a consulate, with the risk of the bars. That is why section <strong>245(i)</strong> is worth checking: someone who was the beneficiary of a family petition or labor certification filed within the deadlines that law set more than two decades ago may be protected and able to adjust here even after entering without inspection, by paying the additional amount the statute sets.',
          },
          {
            kind: 'note',
            text: 'Dig through the family’s boxes of old paperwork: a petition an uncle or an employer filed in 2001, even if it never went anywhere, can today be the difference between adjusting in Houston and having to leave the country.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'The mistakes that close doors',
        subtitle: 'What we see every week in the office',
        blocks: [
          {
            kind: 'text',
            text: 'Almost no case is lost because of what the government did. Cases are lost through decisions made in fear, in a hurry, or on the wrong advice.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Leaving the country.</strong> Without TPS there is no travel authorization backing you: departing triggers the bars and can abandon pending applications.',
              '<strong>Missing court or not updating your address.</strong> If notices go to a house where you no longer live, you never learn of the hearing, and the missed hearing ends in an in absentia removal order.',
              '<strong>Working on an expired permit.</strong> It exposes you and your employer, and complicates the good moral character analysis several of these paths require.',
              '<strong>Using someone else’s or false documents.</strong> It can create very serious ineligibilities, and falsely claiming to be a U.S. citizen creates a bar that in practice has no waiver.',
              '<strong>Going to a notario.</strong> In this country a notary public is not an attorney and cannot give legal advice; badly built cases cost twice as much to fix.',
              '<strong>Doing nothing.</strong> The most common: waiting for another extension burns the months that could have gone into the asylum claim or finding the 2001 petition.',
            ],
          },
          {
            kind: 'warning',
            text: 'If you ever signed a voluntary return at the border, had a court case or were detained, that history already exists in a file even if you do not remember it well. Tell it in full at the first consultation: an attorney can work with a bad record, but not with surprises in the middle of a case.',
          },
          {
            kind: 'note',
            text: 'Start today with the basics: the exact expiration date of your EAD, your passports and entry records, proof of every year you have been here, and a list of your citizen or resident relatives.',
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'Can I be deported the moment my TPS ends?',
          a: 'The end of TPS is not the same as a deportation order: you lose the protection that kept proceedings from starting. Any removal must go through a procedure in which you can present defenses, and several of the ones explained here can only be requested there.',
        },
        {
          q: 'Can I keep working on an expired EAD if I already filed something else?',
          a: 'It depends on what you filed and whether that filing generates its own work authorization, which is almost never immediate. Do not assume a pending case authorizes you to work: ask which exact document backs you and from what date.',
        },
        {
          q: 'I have citizen children who are minors. Can they fix my papers?',
          a: 'Not yet. A citizen child can petition for a parent once they turn 21, and not before. A child also does not count as the qualifying relative for the I-601A waiver, which requires a citizen or resident spouse or parent. Where a minor child does carry weight is in cancellation of removal.',
        },
        {
          q: 'I left on TPS travel permission and came back. Does that help me?',
          a: 'It may help considerably, because in certain circumstances that return is treated as an inspected entry and would open the possibility of adjusting here. It depends on the specific document and the date of the trip: bring the passport and the permission to the consultation.',
        },
        {
          q: 'I already have an old deportation order. Is there still anything to do?',
          a: 'There may be, although the ground is narrower. Depending on the facts, it may be possible to move to reopen the case or to attack an in absentia order when the notice was never received. What you should not do is ignore it.',
        },
        {
          q: 'How long do these paths take?',
          a: 'They vary enormously: some filings provide protection within months, while others subject to annual caps or country-based lines are measured in years. Nobody can promise you a timeline. What is certain is that starting late shortens nothing and does close options.',
        },
      ],
    },
    conclusion: {
      title: 'The umbrella closed; the life you built is still there',
      text: 'Losing TPS means losing a protection, not the ten or fifteen years you have spent holding a family together in this country. Those years are continuous presence, a tax record, citizen children and documents: the foundation on which any of the five paths in this article gets built. The difference between families who come through this and families who do not is rarely luck, but who had their case reviewed in time.',
      advice: 'If your designation has ended or is about to, gather your documents and seek a complete review of your case now, while there are still options on the table.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'Immigration and Nationality Act (INA), section 244 — Temporary Protected Status',
        'INA sections 245 and 245(i) — adjustment of status and older petitions',
        'INA section 240A(b) — cancellation of removal for non-permanent residents',
        'Federal asylum regulations — the one-year filing deadline and its exceptions',
        'USCIS — Forms I-589, I-918, I-914, I-360 and I-601A',
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
          ? 'Familia revisando documentos migratorios tras el fin de su TPS'
          : 'Family reviewing immigration documents after their TPS ended'
      }
      isoDate={ISO_DATE}
      servicePath="/servicios/inmigracion"
      trackerCategory="Visa Humanitaria"
    />
  );
}

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}
