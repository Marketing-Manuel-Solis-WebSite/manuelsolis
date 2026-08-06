import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'cuanto-cuesta-arreglar-papeles-tarifas-uscis-2026';
const ISO_DATE = '2026-08-06';
// TODO(portada): sustituir cuando marketing entregue la imagen definitiva.
const IMAGE = '/og-default.jpg';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Cuánto cuesta arreglar papeles: tarifas 2026',
    metaDesc:
      'Tarifas de USCIS en 2026 tras el ajuste por inflación: asilo, TPS, permisos de trabajo y qué cifras debe confirmar antes de pagar.',
    title: 'Cuánto cuesta arreglar papeles en 2026: la tabla real de tarifas',
    displayDate: '06 Ago, 2026',
    readTime: '21 min',
    categoryLabel: 'Procesos Migratorios',
    lastUpdated: '6 de agosto de 2026',
    summary: {
      title: 'Resumen inicial',
      text: 'Desde el 1 de enero de 2026 está vigente un <strong>ajuste por inflación</strong> sobre las tarifas que fijó la ley presupuestaria de 2025, y con él una estructura nueva de cobros: la solicitud de asilo pasó a tener una <strong>tarifa mínima de 100 dólares</strong>, se creó una <strong>Tarifa Anual de Asilo de 100 dólares</strong>, el primer permiso de trabajo para asilo, parole y TPS quedó en <strong>550 dólares</strong> con renovación de <strong>275 dólares</strong>, el permiso de trabajo de TPS se limitó a un <strong>máximo de un año</strong> de validez y corregir el I-94 con el Formulario I-102 cuesta <strong>24 dólares</strong>. Para el resto —peticiones familiares, ajuste de estatus, naturalización— aquí explicamos el concepto, pero la cifra exacta hay que confirmarla en uscis.gov el día que usted presenta, porque cambia.',
    },
    intro: [
      'La pregunta con la que empieza casi toda consulta en nuestras oficinas de Houston no es jurídica, es económica: «¿cuánto me va a costar arreglar mis papeles?». Es una pregunta legítima y difícil de responder de golpe, porque el costo de un caso migratorio no es un número único, sino la suma de cosas distintas que suelen mezclarse: lo que cobra el gobierno, lo que cobra el abogado y lo que cobran terceros como médicos, traductores y consulados.',
      'En 2026 esa cuenta se volvió más pesada y más movediza. El 1 de enero entró en vigor un ajuste por inflación sobre las tarifas establecidas en la ley presupuestaria de 2025, y ese ajuste llegó acompañado de una estructura nueva: cobros que antes no existían, tarifas que ahora se repiten cada año y permisos de trabajo con validez más corta, lo que obliga a renovarlos —y a pagarlos— con más frecuencia.',
      'Este artículo hace dos cosas. Primero, le da los números que sí están confirmados, en una tabla que puede usar para presupuestar. Y segundo, le dice con honestidad dónde <strong>no</strong> vamos a darle una cifra, porque esos montos se mueven y publicar un número viejo le haría más daño que bien.',
    ],
    sections: [
      {
        icon: 'help',
        title: 'La tarifa del gobierno no es el honorario del abogado',
        subtitle: 'Antes de comparar precios',
        blocks: [
          {
            kind: 'text',
            text: 'Mucha gente compara presupuestos sin saber que compara cosas distintas. Cuando le digan que un trámite «cuesta tanto», pregunte qué incluye ese número: en un caso migratorio hay al menos tres bolsas de dinero separadas, y confundirlas es la causa número uno de sorpresas a mitad del proceso.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Tarifas de gobierno',
                desc: 'Lo que cobra USCIS o el Departamento de Estado por procesar su solicitud. No es negociable y casi nunca se devuelve si le niegan el caso.',
              },
              {
                title: 'Honorarios legales',
                desc: 'Lo que cobra el despacho por preparar y defender su caso. Se pacta por escrito y suele poder pagarse en plan.',
              },
              {
                title: 'Gastos de terceros',
                desc: 'Examen médico, traducciones certificadas, copias de actas, fotos, envíos con rastreo y, en proceso consular, viaje y hospedaje.',
              },
              {
                title: 'El costo del error',
                desc: 'Una solicitud rechazada por pago incorrecto o firma faltante se presenta otra vez y se paga otra vez. Nadie lo presupuesta.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Recuerde una regla que sirve siempre: <strong>la tarifa se paga por presentar, no por ganar</strong>. Si le niegan el caso, ese dinero no regresa, y en muchas familias es dinero que costó meses juntar.',
          },
          {
            kind: 'note',
            text: 'Si le ofrecen «arreglar sus papeles» por un precio cerrado, pida por escrito cuánto es tarifa de gobierno y cuánto es honorario antes de entregar un peso.',
          },
        ],
      },
      {
        icon: 'dollar',
        title: 'Qué cambió el 1 de enero de 2026 y la tabla que sí puede usar',
        subtitle: 'El ajuste por inflación',
        blocks: [
          {
            kind: 'text',
            text: 'La ley presupuestaria de 2025 fijó tarifas nuevas y ordenó ajustarlas por inflación. Ese ajuste rige desde el 1 de enero de 2026: trámites que antes no tenían costo ahora sí lo tienen, y las cifras volverán a moverse porque el mecanismo es periódico.',
          },
          {
            kind: 'text',
            text: 'Abajo están las tarifas que podemos confirmar y, junto a ellas, los trámites donde deliberadamente no ponemos un número: la columna dice <strong>confirmar en USCIS</strong>, y esa es la instrucción literal.',
          },
          {
            kind: 'table',
            headers: ['Trámite', 'Tarifa 2026', 'Qué debe saber'],
            rows: [
              [
                'Solicitud de asilo (I-589)',
                '100 dólares (mínimo)',
                'Antes se presentaba sin costo de presentación.',
              ],
              [
                'Tarifa Anual de Asilo',
                '100 dólares por año',
                'Se repite mientras el caso siga pendiente.',
              ],
              [
                'Permiso de trabajo inicial (asilo, parole, TPS)',
                '550 dólares',
                'Aplica al primer permiso en esas categorías.',
              ],
              [
                'Renovación del permiso de trabajo',
                '275 dólares',
                'Cada renovación vuelve a pagarse.',
              ],
              [
                'Corrección del I-94 (I-102)',
                '24 dólares',
                'Un registro de entrada equivocado descuadra trámites posteriores.',
              ],
              [
                'Petición familiar (I-130)',
                'Confirmar en USCIS',
                'La cifra cambia con los ajustes; verifíquela antes de pagar.',
              ],
              [
                'Ajuste de estatus (I-485)',
                'Confirmar en USCIS',
                'Revise si el permiso de trabajo y el de viaje se pagan aparte.',
              ],
              [
                'Naturalización (N-400)',
                'Confirmar en USCIS',
                'Antes de asumir el monto completo, revise reducciones y exenciones.',
              ],
            ],
          },
          {
            kind: 'note',
            text: 'Aviso de vigencia: existe <strong>litigio activo</strong> sobre políticas derivadas de esa ley presupuestaria, así que algunas reglas de cobro pueden estar suspendidas o en revisión judicial cuando usted lea esto. Verifique el estado vigente en uscis.gov —o con su abogado— <strong>antes de pagar</strong>.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'Familia y residencia por matrimonio: los conceptos que sí puede presupuestar',
        subtitle: 'Petición, ajuste y consulado',
        blocks: [
          {
            kind: 'text',
            text: 'La ruta familiar es la más común y la que más se malinterpreta en costos, porque se paga <strong>por etapas</strong>: no es un cheque, es una secuencia de trámites con tarifa propia, a veces separados por años. Aquí no damos cifras porque las de esta categoría se mueven; damos el mapa para que sepa cuántos pagos esperar.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>La petición familiar.</strong> El ciudadano o residente acredita el parentesco. Es el primer pago y el que abre el expediente.',
              '<strong>La disponibilidad de visa.</strong> Para cónyuges e hijos menores de ciudadanos suele ser inmediata; otras categorías esperan, y esa espera puede alcanzar un aumento de tarifa.',
              '<strong>Ajuste aquí o proceso consular.</strong> Si la persona está en el país y califica, se ajusta el estatus. Si debe salir, el caso pasa al Departamento de Estado, con otras tarifas más examen médico y viaje.',
              '<strong>Permiso de trabajo y de viaje.</strong> Confirme si en su categoría se pagan aparte o van incluidos: es un error de presupuesto muy común.',
              '<strong>El perdón, si hace falta.</strong> Quien acumuló presencia ilegal y debe salir puede enfrentar la barra de 3 o de 10 años; el perdón provisional lleva su propio formulario y su propia tarifa.',
              '<strong>La residencia condicional.</strong> Si el matrimonio tenía menos de dos años al aprobarse, hay que presentar otra solicitud —y otra tarifa— para quitar las condiciones.',
            ],
          },
          {
            kind: 'note',
            text: 'Si le corresponde el perdón provisional, no arme el presupuesto por partes: pida el costo completo del camino —petición, perdón, consulado, examen médico y viaje— antes de presentar el primer formulario. Enterarse a la mitad es lo que hace que las familias abandonen casos ya ganados.',
          },
        ],
      },
      {
        icon: 'globe',
        title: 'Ciudadanía: la N-400 y las exenciones que todavía existen',
        subtitle: 'Naturalización',
        blocks: [
          {
            kind: 'text',
            text: 'La naturalización es de los trámites que mejor rinden el dinero: un pago que cierra el ciclo migratorio para siempre. Aun así, la tarifa equivale para muchas familias a varios días de trabajo, y conviene revisar si le toca pagar menos antes de asumir el monto completo. Estos son los conceptos que debe pedir por su nombre:',
          },
          {
            kind: 'list',
            items: [
              '<strong>Exención total de la tarifa.</strong> Se solicita con el Formulario I-912 y se apoya en criterios como recibir un beneficio público basado en ingresos, tener ingresos bajo cierto umbral de la pauta federal de pobreza, o una dificultad económica documentada.',
              '<strong>Reducción parcial.</strong> Para quien no califica a la exención total pero mantiene ingresos bajos, ha existido una tarifa reducida en naturalización.',
              '<strong>Categorías exentas por ley.</strong> De manera destacada, quienes naturalizan por servicio militar han estado exentos de la tarifa de presentación.',
              '<strong>Documentación de respaldo.</strong> Una exención se gana con prueba: cartas de beneficios, declaraciones de impuestos, talones de pago o constancias de gastos médicos.',
            ],
          },
          {
            kind: 'text',
            text: 'La advertencia honesta: el alcance de estas exenciones se ha ido estrechando y <strong>no todas aplican a todos los trámites</strong>. Antes de contar con una, confirme en uscis.gov si sigue disponible para su categoría y para la edición actual del formulario.',
          },
          {
            kind: 'warning',
            text: 'No pida una exención sin pruebas confiando en que «tal vez pase»: una exención negada puede devolverle el paquete completo y costarle semanas.',
          },
        ],
      },
      {
        icon: 'file',
        title: 'Permisos de trabajo por categoría y dónde la tarifa no se exonera',
        subtitle: 'El EAD y su costo real',
        blocks: [
          {
            kind: 'text',
            text: 'El permiso de trabajo —el EAD— es el documento que más urgencia genera, porque de él dependen el empleo, la licencia de manejar en muchos estados y el número de Seguro Social. También es donde el cambio de 2026 se siente más fuerte.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Primer permiso: 550 dólares',
                desc: 'Tarifa del permiso inicial en asilo, parole y TPS. Presupuéstela como gasto fijo del arranque del caso.',
              },
              {
                title: 'Renovación: 275 dólares',
                desc: 'Cada renovación en esas categorías se paga de nuevo. Si su permiso vence cada año, el número se repite cada año.',
              },
              {
                title: 'Donde la tarifa no se exonera',
                desc: 'En estas categorías el permiso se cobra: no dé por hecho que una exención cubrirá su EAD. Confírmelo en uscis.gov.',
              },
              {
                title: 'Otras categorías de EAD',
                desc: 'Un permiso ligado a un ajuste de estatus, a una Visa U o a otra categoría sigue reglas y montos propios.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'El monto no depende de «pedir un permiso de trabajo» en abstracto, sino del <strong>código de categoría</strong> bajo el cual lo pide, que sale del beneficio migratorio que tiene detrás. Dos personas que llenan el mismo formulario pueden pagar distinto.',
          },
          {
            kind: 'warning',
            text: 'No deje la renovación para el último mes: un permiso vencido puede obligar a su patrón a sacarlo del horario aunque su caso siga vivo.',
          },
        ],
      },
      {
        icon: 'clock',
        title: 'El permiso de trabajo de TPS dura un año: cómo presupuestar renovaciones anuales',
        subtitle: 'Un gasto que se repite',
        blocks: [
          {
            kind: 'text',
            text: 'Este es el cambio que más golpea el bolsillo de las familias con TPS. El permiso de trabajo emitido con base en TPS quedó limitado a un <strong>máximo de un año de validez</strong>: lo que antes era un trámite esporádico se vuelve una obligación anual de renovar, documentar y pagar.',
          },
          {
            kind: 'text',
            text: 'Además, ese ciclo convive con el calendario propio del TPS —designaciones y plazos de reinscripción—, que corre aparte y no siempre coincide. Presupuestar bien aquí no es solo apartar dinero: es apartarlo <strong>con fecha</strong>.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Anote el vencimiento</strong> de su permiso en el calendario del teléfono, con recordatorio seis meses antes. Seis, no uno.',
              '<strong>Aparte la renovación por mes.</strong> Dividir los 275 dólares entre los meses del año lo vuelve manejable; juntarlos en tres semanas casi nunca lo es.',
              '<strong>Vigile los avisos de reinscripción.</strong> El permiso se apoya en el estatus: si se le pasa la ventana, el permiso deja de ser el problema principal.',
              '<strong>Guarde copia de todo lo que envía</strong> y del comprobante de pago. En un ciclo anual, su propio expediente le ahorra empezar de cero.',
              '<strong>Revise cada año si el monto cambió.</strong> El ajuste es periódico: lo que pagó el año pasado no es necesariamente lo de este año.',
            ],
          },
          {
            kind: 'note',
            text: 'Si en su casa hay varios adultos con TPS, multiplique: cada uno tiene su permiso, su renovación y su tarifa. Hemos visto familias planear para una persona y descubrir en el mismo mes que eran tres.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Los errores que cuestan doble',
        subtitle: 'Rechazos por dinero, no por derecho',
        blocks: [
          {
            kind: 'text',
            text: 'Hay dos maneras de perder un caso: por el fondo, cuando no se cumple un requisito de la ley, y por la forma, cuando el paquete ni siquiera llega a revisarse. La segunda es evitable, y en año de cambio de tarifas se multiplica.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Pagar la tarifa vieja.</strong> Se descarga el formulario en enero, se presenta en marzo y el monto ya cambió. USCIS puede devolver el paquete completo.',
              '<strong>Usar una edición vencida del formulario.</strong> Cada formulario trae su fecha de edición en la esquina; la vieja se rechaza aunque el contenido sea impecable.',
              '<strong>Un solo cheque para varios formularios</strong> cuando debían ir por separado, o al revés. Las instrucciones dicen cómo emitir el pago y a nombre de quién.',
              '<strong>Falta de firma.</strong> La causa de rechazo más absurda y más frecuente: firma original donde se pide original, y cada solicitante en su propia solicitud.',
              '<strong>Datos del I-94 que no cuadran.</strong> Si su registro de entrada tiene mal el nombre, la fecha o la clase de admisión, corríjalo con el Formulario I-102 —24 dólares—.',
              '<strong>Enviar a la dirección equivocada.</strong> Cambia según el formulario y la categoría; verifíquela el día del envío.',
              '<strong>No guardar comprobante ni copia.</strong> Si algo se extravía, el rastreo es su única prueba de que presentó a tiempo.',
            ],
          },
          {
            kind: 'warning',
            text: 'Un paquete devuelto no solo cuesta el reenvío: cuesta la <strong>fecha de presentación</strong>. Si su caso dependía de presentar antes de un vencimiento, de una ventana de reinscripción o del cumpleaños número 21 de un hijo, perder esa fecha puede costar el beneficio entero.',
          },
        ],
      },
      {
        icon: 'calendar',
        title: 'Cuándo conviene presentar antes de un aumento anunciado',
        subtitle: 'Estrategia de tiempos',
        blocks: [
          {
            kind: 'text',
            text: 'Cuando se anuncia un aumento, mucha gente corre a presentar «antes de que suba». A veces es lo correcto y a veces sale carísimo. Todo depende de una pregunta: ¿su caso ya está listo, o lo estaría empujando incompleto solo por ahorrar?',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Sí conviene adelantarse',
                desc: 'El expediente está completo, la elegibilidad es clara, tiene documentos y evidencia en mano y solo faltaban la firma y el pago. Ahí adelantar es ahorro puro.',
              },
              {
                title: 'No conviene adelantarse',
                desc: 'Faltan documentos clave, hay antecedentes penales sin analizar, hay presencia ilegal sin resolver o no está clara la mejor ruta. Presentar así puede provocar una negación que cuesta mucho más que el aumento.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Lo que normalmente importa es la fecha en que USCIS <strong>recibe</strong> su solicitud correctamente presentada, no la fecha en que usted la echó al correo. Presentar el último día, sin margen para un error de forma, es justo el escenario donde un paquete devuelto lo deja del lado caro del calendario.',
          },
          {
            kind: 'note',
            text: 'Con litigio activo sobre políticas derivadas de la ley presupuestaria, un aumento anunciado puede quedar suspendido y una tarifa que hoy se cobra puede estar bajo revisión judicial mañana. Confirme el estado vigente antes de correr y antes de pagar.',
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Por qué no publican la tarifa de la N-400 o del I-130 en este artículo?',
          a: 'Porque esas cifras se ajustan y un número desactualizado le costaría un rechazo por pago incorrecto. Preferimos explicarle el concepto y decirle dónde verificar: uscis.gov publica la tabla de tarifas vigente. Consúltela el mismo día en que vaya a emitir el pago.',
        },
        {
          q: 'Si me niegan el caso, ¿me devuelven la tarifa que pagué?',
          a: 'Por regla general no. La tarifa se paga por el procesamiento de la solicitud, no por el resultado. Existen supuestos limitados de devolución, casi siempre cuando el error fue de la propia agencia. Por eso presentar un caso mal armado es una pérdida económica real.',
        },
        {
          q: 'Tengo TPS. ¿De verdad tendré que renovar el permiso de trabajo cada año?',
          a: 'El permiso basado en TPS quedó limitado a un máximo de un año de validez, lo que en la práctica implica renovaciones anuales. Planifique los 275 dólares de la renovación como gasto recurrente y vigile además los plazos de reinscripción del propio TPS.',
        },
        {
          q: '¿Qué es la Tarifa Anual de Asilo y hasta cuándo se paga?',
          a: 'Es un cobro de 100 dólares al año asociado al caso de asilo mientras siga pendiente. No sustituye a la tarifa de presentación de la solicitud, que tiene un mínimo de 100 dólares. Al ser anual, hay que tratarla como un gasto recurrente del presupuesto familiar.',
        },
        {
          q: 'Mi I-94 tiene mal la fecha. ¿Vale la pena corregirlo?',
          a: 'Casi siempre sí. Corregir el registro con el Formulario I-102 cuesta 24 dólares, mientras que arrastrar un dato equivocado puede generar dudas sobre su entrada y su estatus en cada trámite posterior. Es de las correcciones más baratas y de mayor efecto.',
        },
        {
          q: 'No tengo cómo pagar la tarifa. ¿Eso significa que no puedo hacer nada?',
          a: 'No necesariamente. Existen exenciones y reducciones para ciertos trámites y perfiles, y se piden con documentación de respaldo. Su alcance se ha estrechado, así que confirme cuál sigue disponible para su categoría y pregunte también por planes de pago de honorarios.',
        },
      ],
    },
    conclusion: {
      title: 'Saber el número es la mitad del camino; saber cuándo pagarlo es la otra mitad',
      text: 'Arreglar papeles en 2026 es más caro y más cambiante que hace unos años. Las tarifas que sí conocemos —asilo, la anual, el permiso de trabajo, el I-94— ya le permiten armar un presupuesto realista. Para las demás, la respuesta responsable no es un número inventado, sino una instrucción: verifíquelo en uscis.gov el día que presente.',
      advice: 'Antes de pagar cualquier tarifa, confirme que está presentando el formulario correcto, en su edición vigente y por el monto vigente. Un abogado puede revisar su ruta completa y decirle cuántos pagos vienen y en qué orden.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'USCIS — Tabla de tarifas de presentación (Fee Schedule, Formulario G-1055) y página «Nuestras tarifas»',
        'USCIS — Instrucciones de presentación: ediciones vigentes de los formularios, direcciones de envío y métodos de pago',
        'Formulario I-912, Solicitud de Exención de Tarifas, y categorías de exención y reducción vigentes',
        'Formulario I-102, Solicitud de Reemplazo o Corrección del Registro de Llegada-Salida (I-94)',
        'Ley de Inmigración y Nacionalidad (INA) y reglamentos del Título 8 del Código de Regulaciones Federales sobre tarifas',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'What Fixing Your Papers Costs: 2026 Fees',
    metaDesc:
      'USCIS fees in 2026 after the inflation adjustment: asylum, TPS, work permits, and which numbers you must confirm before paying.',
    title: 'What It Costs to Fix Your Papers in 2026: The Real Fee Table',
    displayDate: 'Aug 06, 2026',
    readTime: '21 min',
    categoryLabel: 'Immigration Process',
    lastUpdated: 'August 6, 2026',
    summary: {
      title: 'Initial Summary',
      text: 'Since January 1, 2026, an <strong>inflation adjustment</strong> has been in effect on the fees set by the 2025 budget law, and with it a new fee structure: the asylum application now carries a <strong>minimum fee of 100 dollars</strong>, an <strong>Annual Asylum Fee of 100 dollars</strong> was created, the first work permit for asylum, parole and TPS is <strong>550 dollars</strong> with a <strong>275-dollar</strong> renewal, the TPS work permit is limited to a <strong>maximum of one year</strong> of validity, and correcting your I-94 with Form I-102 costs <strong>24 dollars</strong>. For everything else — family petitions, adjustment of status, naturalization — this guide explains the concept, but the exact figure must be confirmed on uscis.gov the day you file, because it moves.',
    },
    intro: [
      'The question that opens almost every consultation in our Houston offices is not a legal one, it is a financial one: «how much is it going to cost me to fix my papers?». It is a fair question and a hard one to answer in a single number, because the cost of an immigration case is not one price but the sum of different things people tend to blend together: what the government charges, what the attorney charges, and what third parties like doctors, translators and consulates charge.',
      'In 2026 that math got heavier and less stable. On January 1 an inflation adjustment took effect on the fees established by the 2025 budget law, and that adjustment came with a new structure: charges that did not exist before, fees that now repeat every year, and work permits with shorter validity, which forces people to renew them — and pay for them — more often.',
      'This article does two things. First, it gives you the numbers that are confirmed, in a table you can actually budget from. And second, it tells you honestly where we will <strong>not</strong> give you a figure, because those amounts move and publishing a stale number would hurt you more than help.',
    ],
    sections: [
      {
        icon: 'help',
        title: 'The government fee is not the attorney fee',
        subtitle: 'Before you compare prices',
        blocks: [
          {
            kind: 'text',
            text: 'Many people compare quotes without realizing they are comparing different things. When someone tells you a case «costs this much», ask what that number includes: an immigration case has at least three separate buckets of money, and confusing them is the number one cause of surprises halfway through.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Government fees',
                desc: 'What USCIS or the Department of State charges to process your application. It is not negotiable and is almost never refunded if your case is denied.',
              },
              {
                title: 'Legal fees',
                desc: 'What the firm charges to prepare and defend your case. It is agreed in writing and can usually be paid on a plan.',
              },
              {
                title: 'Third-party costs',
                desc: 'Medical exam, certified translations, copies of civil records, photos, tracked mailings and, in consular cases, travel and lodging.',
              },
              {
                title: 'The cost of a mistake',
                desc: 'An application rejected for an incorrect payment or a missing signature is filed again and paid again. Nobody budgets for it.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Remember a rule that always holds: <strong>the fee pays for filing, not for winning</strong>. If your case is denied, that money does not come back, and in many families it is money that took months to save.',
          },
          {
            kind: 'note',
            text: 'If you are offered a flat price to «fix your papers», ask in writing how much is government fee and how much is attorney fee before handing over a dollar.',
          },
        ],
      },
      {
        icon: 'dollar',
        title: 'What changed on January 1, 2026, and the table you can actually use',
        subtitle: 'The inflation adjustment',
        blocks: [
          {
            kind: 'text',
            text: 'The 2025 budget law set new fees and directed that they be adjusted for inflation. That adjustment has been in effect since January 1, 2026: filings that used to have no cost now do, and the figures will move again because the mechanism is periodic.',
          },
          {
            kind: 'text',
            text: 'Below are the fees we can confirm and, next to them, the filings where we deliberately do not print a number: the column says <strong>confirm with USCIS</strong>, and that is the literal instruction.',
          },
          {
            kind: 'table',
            headers: ['Filing', '2026 fee', 'What you should know'],
            rows: [
              [
                'Asylum application (I-589)',
                '100 dollars (minimum)',
                'It used to be filed with no filing cost at all.',
              ],
              [
                'Annual Asylum Fee',
                '100 dollars per year',
                'It repeats while the case stays pending.',
              ],
              [
                'Initial work permit (asylum, parole, TPS)',
                '550 dollars',
                'Applies to the first permit in those categories.',
              ],
              [
                'Work permit renewal',
                '275 dollars',
                'Every renewal is paid again.',
              ],
              [
                'I-94 correction (I-102)',
                '24 dollars',
                'A wrong arrival record throws off every later filing.',
              ],
              [
                'Family petition (I-130)',
                'Confirm with USCIS',
                'The figure shifts with the adjustments; verify it before paying.',
              ],
              [
                'Adjustment of status (I-485)',
                'Confirm with USCIS',
                'Check whether the work permit and travel permit are paid separately.',
              ],
              [
                'Naturalization (N-400)',
                'Confirm with USCIS',
                'Before assuming the full amount, check reductions and waivers.',
              ],
            ],
          },
          {
            kind: 'note',
            text: 'Currency notice: there is <strong>active litigation</strong> over policies derived from that budget law, so some fee rules may be suspended or under judicial review by the time you read this. Verify the current status on uscis.gov — or with your attorney — <strong>before paying</strong>.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'Family and marriage-based residency: the concepts you can budget for',
        subtitle: 'Petition, adjustment and consulate',
        blocks: [
          {
            kind: 'text',
            text: 'The family route is the most common and the most misunderstood on cost, because you pay <strong>in stages</strong>: it is not one check, it is a sequence of filings each with its own fee, sometimes separated by years. We do not print figures here because they move; we give you the map so you know how many payments to expect.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>The family petition.</strong> The citizen or resident establishes the relationship. It is the first payment and the one that opens the file.',
              '<strong>Visa availability.</strong> For spouses and minor children of citizens it is usually immediate; other categories wait, and that wait can run into a fee increase.',
              '<strong>Adjustment here or consular processing.</strong> If the person is in the country and qualifies, status is adjusted. If they must leave, the case moves to the Department of State, with different fees plus medical exam and travel.',
              '<strong>Work permit and travel permit.</strong> Confirm whether your category pays for them separately or they come included: this is a very common budgeting error.',
              '<strong>The waiver, if one is needed.</strong> Someone who accumulated unlawful presence and must depart may face the 3-year or 10-year bar; the provisional waiver has its own form and its own fee.',
              '<strong>Conditional residency.</strong> If the marriage was under two years old at approval, another petition — and another fee — is required to remove the conditions.',
            ],
          },
          {
            kind: 'note',
            text: 'If a provisional waiver applies to you, do not budget in pieces: ask for the full cost of the road — petition, waiver, consulate, medical exam and travel — before you file the first form. Finding out halfway through is what makes families abandon cases that were already winnable.',
          },
        ],
      },
      {
        icon: 'globe',
        title: 'Citizenship: the N-400 and the waivers that still exist',
        subtitle: 'Naturalization',
        blocks: [
          {
            kind: 'text',
            text: 'Naturalization is one of the filings that returns the most for the money: one payment that closes the immigration cycle for good. Even so, for many families the fee equals several days of work, and it is worth checking whether you qualify to pay less before assuming the full amount. These are the concepts to ask for by name:',
          },
          {
            kind: 'list',
            items: [
              '<strong>Full fee waiver.</strong> Requested with Form I-912 and based on criteria such as receiving a means-tested public benefit, having income below a certain threshold of the federal poverty guidelines, or documented financial hardship.',
              '<strong>Partial reduction.</strong> For applicants who do not qualify for the full waiver but whose income is still low, a reduced naturalization fee has existed.',
              '<strong>Categories exempt by law.</strong> Most notably, those naturalizing through military service have been exempt from the filing fee.',
              '<strong>Supporting documentation.</strong> A waiver is won with proof: benefit letters, tax returns, pay stubs or medical expense records.',
            ],
          },
          {
            kind: 'text',
            text: 'The honest caveat: the scope of these waivers has been narrowing and <strong>not all of them apply to every filing</strong>. Before counting on one, confirm on uscis.gov whether it is still available for your category and for the current edition of the form.',
          },
          {
            kind: 'warning',
            text: 'Never request a waiver with no proof hoping it «might go through»: a denied waiver can send the whole package back and cost you weeks.',
          },
        ],
      },
      {
        icon: 'file',
        title: 'Work permits by category and where the fee is not waived',
        subtitle: 'The EAD and its real cost',
        blocks: [
          {
            kind: 'text',
            text: 'The work permit — the EAD — is the document that creates the most urgency, because a job, a driver license in many states and a Social Security number all depend on it. It is also where the 2026 change lands hardest.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'First permit: 550 dollars',
                desc: 'The initial permit fee in asylum, parole and TPS. Budget it as a fixed startup cost of the case.',
              },
              {
                title: 'Renewal: 275 dollars',
                desc: 'Every renewal in those categories is paid again. If your permit expires every year, the number repeats every year.',
              },
              {
                title: 'Where the fee is not waived',
                desc: 'In these categories the permit is charged: do not assume a waiver will cover your EAD. Confirm it on uscis.gov.',
              },
              {
                title: 'Other EAD categories',
                desc: 'A permit tied to an adjustment of status, a U visa or another category follows its own rules and amounts.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'The amount does not depend on «asking for a work permit» in the abstract, but on the <strong>category code</strong> you request it under, which comes from the underlying immigration benefit. Two people filling out the same form can pay different amounts.',
          },
          {
            kind: 'warning',
            text: 'Do not leave renewal for the last month: an expired permit can force your employer to take you off the schedule even though your case is alive.',
          },
        ],
      },
      {
        icon: 'clock',
        title: 'The TPS work permit lasts one year: how to budget annual renewals',
        subtitle: 'An expense that repeats',
        blocks: [
          {
            kind: 'text',
            text: 'This is the change that hits TPS families hardest. The work permit issued on the basis of TPS is limited to a <strong>maximum of one year of validity</strong>: what used to be an occasional filing becomes an annual obligation to renew, document and pay.',
          },
          {
            kind: 'text',
            text: 'On top of that, this cycle runs alongside the TPS calendar itself — designations and re-registration deadlines — which moves separately and does not always line up. Budgeting well here is not only setting money aside: it is setting it aside <strong>with a date on it</strong>.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Write down the expiration</strong> of your permit in your phone calendar, with a reminder six months out. Six, not one.',
              '<strong>Set the renewal aside monthly.</strong> Splitting the 275 dollars across the months of the year makes it manageable; gathering it in three weeks almost never is.',
              '<strong>Watch the re-registration notices.</strong> The permit rests on the status: if you miss the window, the permit stops being your main problem.',
              '<strong>Keep a copy of everything you send</strong> and of the payment receipt. In an annual cycle, your own file saves you from starting over.',
              '<strong>Check every year whether the amount changed.</strong> The adjustment is periodic: what you paid last year is not necessarily this year’s number.',
            ],
          },
          {
            kind: 'note',
            text: 'If there are several adults with TPS in your household, multiply: each one has their own permit, their own renewal and their own fee. We have seen families plan for one person and discover in the same month that it was three.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'The mistakes that cost double',
        subtitle: 'Rejections about money, not about the law',
        blocks: [
          {
            kind: 'text',
            text: 'There are two ways to lose a case: on the merits, when a legal requirement is not met, and on the form, when the package never even gets reviewed. The second is preventable, and in a year of fee changes it multiplies.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Paying the old fee.</strong> You download the form in January, file in March, and the amount has already changed. USCIS can return the entire package.',
              '<strong>Using an expired edition of the form.</strong> Every form carries its edition date in the corner; the old one is rejected even if the content is flawless.',
              '<strong>One check for several forms</strong> when they had to be paid separately, or the reverse. The instructions state how payment must be issued and to whom.',
              '<strong>Missing signature.</strong> The most absurd and most frequent rejection cause: an original signature where an original is required, and each applicant signing their own application.',
              '<strong>I-94 data that does not match.</strong> If your arrival record has the wrong name, date or class of admission, fix it with Form I-102 — 24 dollars.',
              '<strong>Mailing to the wrong address.</strong> It varies by form and by category; verify it the day you mail.',
              '<strong>Keeping no mailing proof and no copy.</strong> If something goes missing, the tracking is your only evidence you filed on time.',
            ],
          },
          {
            kind: 'warning',
            text: 'A returned package does not only cost the reshipment: it costs the <strong>filing date</strong>. If your case depended on filing before an expiration, a re-registration window, or a child’s 21st birthday, losing that date can cost the entire benefit.',
          },
        ],
      },
      {
        icon: 'calendar',
        title: 'When it makes sense to file ahead of an announced increase',
        subtitle: 'Timing strategy',
        blocks: [
          {
            kind: 'text',
            text: 'When an increase is announced, many people rush to file «before it goes up». Sometimes that is right and sometimes it is extremely expensive. It all comes down to one question: is your case actually ready, or would you be pushing it out incomplete just to save money?',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Filing early makes sense',
                desc: 'The file is complete, eligibility is clear, your documents and evidence are in hand, and all that was left was the signature and the payment. There, moving it up is pure savings.',
              },
              {
                title: 'Filing early does not make sense',
                desc: 'Key documents are missing, there is a criminal record nobody has analyzed, unresolved unlawful presence, or the best route is still unclear. Filing like that can trigger a denial that costs far more than the increase.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'What normally matters is the date USCIS <strong>receives</strong> your properly filed application, not the date you dropped it in the mail. Filing on the last day, with no margin for a formatting error, is precisely the scenario where a returned package leaves you on the expensive side of the calendar.',
          },
          {
            kind: 'note',
            text: 'With active litigation over policies derived from the budget law, an announced increase may end up suspended and a fee charged today may be under judicial review tomorrow. Confirm the current status before you rush and before you pay.',
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'Why does this article not publish the N-400 or I-130 fee?',
          a: 'Because those figures adjust, and an outdated number would cost you a rejection for incorrect payment. We would rather explain the concept and tell you where to verify: uscis.gov publishes the current fee schedule. Check it the same day you issue payment.',
        },
        {
          q: 'If my case is denied, do I get the fee back?',
          a: 'As a general rule, no. The fee pays for processing the application, not for the outcome. Limited refund situations exist, almost always when the error was the agency’s own. That is why filing a poorly built case is a real financial loss.',
        },
        {
          q: 'I have TPS. Will I really have to renew my work permit every year?',
          a: 'The TPS-based permit is limited to a maximum of one year of validity, which in practice means annual renewals. Plan the 275-dollar renewal as a recurring expense and also keep an eye on the TPS re-registration deadlines themselves.',
        },
        {
          q: 'What is the Annual Asylum Fee and how long is it paid?',
          a: 'It is a 100-dollar-per-year charge attached to the asylum case while it remains pending. It does not replace the application filing fee, which has a 100-dollar minimum. Because it is annual, treat it as a recurring line in the family budget.',
        },
        {
          q: 'My I-94 has the wrong date. Is it worth correcting?',
          a: 'Almost always yes. Correcting the record with Form I-102 costs 24 dollars, while carrying a wrong entry can raise questions about your admission and your status in every later filing. It is one of the cheapest corrections with the biggest effect.',
        },
        {
          q: 'I cannot afford the fee. Does that mean I can do nothing?',
          a: 'Not necessarily. Waivers and reductions exist for certain filings and profiles, and they are requested with supporting documentation. Their scope has narrowed, so confirm which one is still available for your category and also ask about payment plans for legal fees.',
        },
      ],
    },
    conclusion: {
      title: 'Knowing the number is half the road; knowing when to pay it is the other half',
      text: 'Fixing your papers in 2026 is more expensive and more changeable than it was a few years ago. The fees we do know — asylum, the annual charge, the work permit, the I-94 — already let you build a realistic budget. For the rest, the responsible answer is not an invented number but an instruction: verify it on uscis.gov the day you file.',
      advice: 'Before paying any fee, confirm you are filing the right form, in its current edition, for the current amount. An attorney can review your full route and tell you how many payments are coming and in what order.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'USCIS — Filing fee schedule (Form G-1055) and the «Our Fees» page',
        'USCIS — Filing instructions: current form editions, mailing addresses and payment methods',
        'Form I-912, Request for Fee Waiver, and the current waiver and reduction categories',
        'Form I-102, Application for Replacement/Initial Nonimmigrant Arrival-Departure Document (I-94)',
        'Immigration and Nationality Act (INA) and Title 8 of the Code of Federal Regulations on immigration fees',
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
          ? 'Familia revisando el costo de las tarifas de USCIS en 2026'
          : 'Family reviewing the cost of USCIS filing fees in 2026'
      }
      isoDate={ISO_DATE}
      servicePath="/servicios/inmigracion"
      trackerCategory="Procesos Migratorios"
    />
  );
}

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}
