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
    readTime: '12 min',
    categoryLabel: 'Procesos Migratorios',
    lastUpdated: '6 de agosto de 2026',
    summary: {
      title: 'Resumen inicial',
      text: 'Desde el 1 de enero de 2026 está vigente un <strong>ajuste por inflación</strong> sobre las tarifas que fijó la ley presupuestaria de 2025, y con él una estructura nueva de cobros: la solicitud de asilo pasó a tener una <strong>tarifa mínima de 100 dólares</strong>, se creó una <strong>Tarifa Anual de Asilo de 100 dólares</strong>, el primer permiso de trabajo para asilo, parole y TPS quedó en <strong>550 dólares</strong> con renovación de <strong>275 dólares</strong>, el permiso de trabajo de TPS se limitó a un <strong>máximo de un año</strong> de validez y corregir el I-94 con el Formulario I-102 cuesta <strong>24 dólares</strong>. Para el resto de trámites —peticiones familiares, ajuste de estatus, naturalización— aquí explicamos el concepto, pero la cifra exacta hay que confirmarla en uscis.gov el día que usted presenta, porque cambia.',
    },
    intro: [
      'La pregunta con la que empieza casi toda consulta en nuestras oficinas de Houston no es jurídica, es económica: «¿cuánto me va a costar arreglar mis papeles?». Es una pregunta legítima y difícil de responder de golpe, porque el costo de un caso migratorio no es un número único, sino la suma de cosas distintas que la gente suele mezclar: lo que cobra el gobierno, lo que cobra el abogado y lo que cobran terceros como médicos, traductores y consulados.',
      'En 2026 esa cuenta se volvió más pesada y más movediza. El 1 de enero entró en vigor un ajuste por inflación sobre las tarifas establecidas en la ley presupuestaria de 2025, y ese ajuste llegó acompañado de una estructura nueva: cobros que antes no existían, tarifas que ahora se repiten cada año y permisos de trabajo con validez más corta, lo que obliga a renovarlos —y a pagarlos— con más frecuencia.',
      'Este artículo hace dos cosas. Primero, le da los números que sí están confirmados, en una tabla que puede usar para presupuestar. Y segundo, le dice con honestidad dónde <strong>no</strong> vamos a darle una cifra, porque esos montos se mueven y publicar un número viejo le haría más daño que bien: en esos casos explicamos el concepto y le decimos dónde verificar la cantidad vigente antes de firmar un cheque.',
    ],
    sections: [
      {
        icon: 'help',
        title: 'Cómo leer esta guía: la tarifa del gobierno no es el honorario del abogado',
        subtitle: 'Antes de comparar precios',
        blocks: [
          {
            kind: 'text',
            text: 'Mucha gente compara presupuestos sin saber que está comparando cosas distintas. Cuando le dicen que un trámite «cuesta tanto», lo primero es preguntar qué incluye ese número. En un caso migratorio hay al menos tres bolsas de dinero separadas, y confundirlas es la causa número uno de sorpresas a mitad del proceso.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Tarifas de gobierno',
                desc: 'Lo que cobra USCIS o el Departamento de Estado por procesar su solicitud. No es negociable y, salvo excepciones muy concretas, no se devuelve si le niegan el caso.',
              },
              {
                title: 'Honorarios legales',
                desc: 'Lo que cobra el despacho por preparar, presentar y defender su caso. Se pacta por escrito y suele poder pagarse en plan.',
              },
              {
                title: 'Gastos de terceros',
                desc: 'Examen médico de inmigración, traducciones certificadas, copias de actas, fotos, envíos con rastreo y, en proceso consular, viaje y hospedaje.',
              },
              {
                title: 'El costo del error',
                desc: 'Una solicitud rechazada por pago incorrecto o por firma faltante se presenta otra vez y se paga otra vez. Es el gasto que nadie presupuesta.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Hay una regla práctica que le va a servir siempre: <strong>la tarifa se paga por presentar, no por ganar</strong>. Si al final le niegan el caso, ese dinero no regresa. Por eso una solicitud mal armada no solo pierde tiempo: pierde dinero real, y en muchas familias es dinero que costó meses juntar.',
          },
          {
            kind: 'note',
            text: 'Si alguien le ofrece «arreglar sus papeles» por un precio cerrado sin explicarle cuánto es tarifa de gobierno y cuánto es honorario, pida el desglose por escrito antes de entregar un peso. Un despacho serio se lo da sin problema.',
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
            text: 'La ley presupuestaria de 2025 fijó tarifas nuevas para varios trámites migratorios y ordenó que se ajustaran por inflación. Ese ajuste está vigente desde el 1 de enero de 2026. En la práctica, trámites que antes no tenían costo ahora sí lo tienen, y las cifras volverán a moverse, porque el mecanismo de ajuste es periódico.',
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
                'Solicitud de asilo (Formulario I-589)',
                '100 dólares (mínimo)',
                'Antes se presentaba sin costo de presentación.',
              ],
              [
                'Tarifa Anual de Asilo',
                '100 dólares por año',
                'Se repite mientras el caso siga pendiente: es un gasto anual, no un pago único.',
              ],
              [
                'Permiso de trabajo inicial (asilo, parole y TPS)',
                '550 dólares',
                'Aplica al primer permiso solicitado en esas categorías.',
              ],
              [
                'Renovación del permiso de trabajo',
                '275 dólares',
                'Cada renovación en esas mismas categorías vuelve a pagarse.',
              ],
              [
                'Corrección del I-94 (Formulario I-102)',
                '24 dólares',
                'Un registro de entrada con datos equivocados descuadra trámites posteriores.',
              ],
              [
                'Petición familiar (Formulario I-130)',
                'Confirmar en USCIS',
                'La cifra cambia con los ajustes; verifíquela antes de emitir el pago.',
              ],
              [
                'Ajuste de estatus (Formulario I-485)',
                'Confirmar en USCIS',
                'Revise si el permiso de trabajo y el de viaje se pagan aparte.',
              ],
              [
                'Naturalización (Formulario N-400)',
                'Confirmar en USCIS',
                'Antes de asumir el monto completo, revise si le toca reducción o exención.',
              ],
            ],
          },
          {
            kind: 'note',
            text: 'Aviso de vigencia: existe <strong>litigio activo</strong> sobre políticas derivadas de esa ley presupuestaria, así que algunas reglas de cobro pueden estar suspendidas, modificadas o en revisión judicial cuando usted lea esto. Verifique el estado vigente en uscis.gov —o con su abogado— <strong>antes de pagar</strong> y antes de presentar.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'Familia y residencia por matrimonio: los conceptos que sí puede presupuestar',
        subtitle: 'Petición, ajuste y proceso consular',
        blocks: [
          {
            kind: 'text',
            text: 'La ruta familiar es la más común y la que más se malinterpreta en costos, porque se paga <strong>por etapas</strong>: no es un cheque, es una secuencia de trámites con tarifa propia, a veces separados por años. Aquí no damos cifras porque las de esta categoría se mueven; damos el mapa completo para que sepa cuántos pagos esperar.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>La petición familiar.</strong> El ciudadano o residente acredita el parentesco. Es el primer pago y el que abre el expediente.',
              '<strong>La disponibilidad de visa.</strong> Para cónyuges e hijos menores de ciudadanos suele ser inmediata; otras categorías esperan, y esa espera puede alcanzar un aumento de tarifa.',
              '<strong>Ajuste dentro del país o proceso consular.</strong> Si la persona está aquí y califica, se ajusta el estatus. Si debe salir, el caso pasa al Departamento de Estado, con otras tarifas más examen médico y viaje.',
              '<strong>Permiso de trabajo y permiso de viaje.</strong> Confirme si en su categoría se pagan aparte o van incluidos: es un error de presupuesto muy común.',
              '<strong>El perdón, si hace falta.</strong> Quien acumuló presencia ilegal y debe salir puede enfrentar la barra de 3 o de 10 años; el perdón provisional lleva su propio formulario y su propia tarifa.',
              '<strong>La residencia condicional.</strong> Si el matrimonio tenía menos de dos años al aprobarse, hay que presentar otra solicitud —y otra tarifa— para quitar las condiciones antes del vencimiento.',
            ],
          },
          {
            kind: 'text',
            text: 'Ese último punto es el que más nos toca corregir. Una pareja presupuesta la petición y el ajuste, celebra la aprobación y dos años después descubre que falta un trámite más para que la residencia deje de ser condicional. No es letra chica: es cómo funciona la ley.',
          },
          {
            kind: 'note',
            text: 'Si le corresponde el perdón provisional por presencia ilegal, no arme el presupuesto por partes: pida el costo completo del camino —petición, perdón, consulado, examen médico y viaje— antes de presentar el primer formulario. Enterarse a la mitad es lo que hace que las familias abandonen casos que ya estaban ganados.',
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
            text: 'La naturalización es de los trámites que mejor rinden el dinero: un pago que cierra el ciclo migratorio para siempre. Aun así, para muchas familias la tarifa de la N-400 equivale a varios días de trabajo, y conviene revisar con calma si le toca pagar menos —o no pagar— antes de asumir el monto completo. Estos son los conceptos que debe conocer y pedir por su nombre:',
          },
          {
            kind: 'list',
            items: [
              '<strong>Exención total de la tarifa.</strong> Se solicita con el Formulario I-912 y se apoya en criterios como recibir un beneficio público basado en ingresos, tener ingresos por debajo de cierto umbral de la pauta federal de pobreza, o una dificultad económica documentada.',
              '<strong>Reducción parcial.</strong> Para quien no califica a la exención total pero mantiene ingresos bajos, ha existido una tarifa reducida en naturalización.',
              '<strong>Categorías exentas por ley.</strong> De manera destacada, quienes naturalizan por servicio militar han estado exentos de la tarifa de presentación.',
              '<strong>Documentación de respaldo.</strong> Una exención se gana con prueba: cartas de beneficios, declaraciones de impuestos, talones de pago o constancias de gastos médicos.',
            ],
          },
          {
            kind: 'text',
            text: 'Y aquí la advertencia honesta: el alcance de estas exenciones se ha ido estrechando y <strong>no todas aplican a todos los trámites</strong>. Que exista una exención para un formulario no significa que exista para el siguiente. Antes de contar con ella, confirme en uscis.gov si sigue disponible para su categoría y para la edición actual del formulario.',
          },
          {
            kind: 'warning',
            text: 'No deje de presentar por asumir que no le alcanza, ni pida una exención sin pruebas confiando en que «tal vez pase». Una exención negada puede devolverle el paquete completo y hacerle perder semanas. Si tiene dudas, pregunte antes de armar el sobre, no después.',
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
            text: 'El permiso de trabajo —el EAD— es el documento que más urgencia genera, porque de él dependen el empleo, la licencia de manejar en muchos estados y el número de Seguro Social. También es donde el cambio de 2026 se siente más fuerte: las categorías humanitarias dejaron de tener el permiso barato que muchos recordaban.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Primer permiso: 550 dólares',
                desc: 'Es la tarifa del permiso inicial en asilo, parole y TPS. Presupuéstela como gasto fijo del arranque del caso, no como algo opcional.',
              },
              {
                title: 'Renovación: 275 dólares',
                desc: 'Cada renovación en esas categorías se paga de nuevo. Si su permiso vence cada año, este número se repite cada año.',
              },
              {
                title: 'Donde la tarifa no se exonera',
                desc: 'En estas categorías el permiso se cobra: no dé por hecho que una exención cubrirá su EAD. Confirme en uscis.gov antes de contar con ella.',
              },
              {
                title: 'Otras categorías de EAD',
                desc: 'Un permiso ligado a un ajuste de estatus, a una Visa U o a otra categoría sigue reglas y montos propios. Verifique cuál código le corresponde.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'El monto no depende de «pedir un permiso de trabajo» en abstracto, sino del <strong>código de categoría</strong> bajo el cual lo pide, que sale del beneficio migratorio que tiene detrás. Dos personas que llenan el mismo formulario pueden pagar cantidades distintas. Si no sabe cuál es la suya, esa es la primera pregunta que hay que resolver.',
          },
          {
            kind: 'warning',
            text: 'No deje la renovación para el último mes. Un permiso vencido puede obligar a su patrón a sacarlo del horario aunque su caso siga vivo y aunque el dinero de la tarifa ya esté juntado. Renovar tarde cuesta empleo, no solo tiempo.',
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
            text: 'Este es el cambio que más va a golpear el bolsillo de las familias con TPS y el que menos se ha explicado. El permiso de trabajo emitido con base en TPS quedó limitado a un <strong>máximo de un año de validez</strong>. En la práctica, lo que antes era un trámite esporádico se vuelve una obligación anual: cada año hay que renovar, documentar y pagar.',
          },
          {
            kind: 'text',
            text: 'Además, ese ciclo convive con el calendario propio del TPS —los períodos de designación y los plazos de reinscripción—, que corre por su cuenta y no siempre coincide. Presupuestar bien aquí no es solo apartar dinero: es apartarlo <strong>con fecha</strong>.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Anote el vencimiento</strong> de su permiso actual en el calendario del teléfono, con recordatorio seis meses antes. Seis, no uno.',
              '<strong>Aparte la renovación por mes.</strong> Dividir los 275 dólares entre los meses del año lo vuelve manejable; juntarlos en tres semanas casi nunca lo es.',
              '<strong>Vigile los avisos de reinscripción del TPS.</strong> El permiso se apoya en el estatus: si se le pasa la ventana, el permiso deja de ser el problema principal.',
              '<strong>Guarde copia de todo lo que envía</strong> y del comprobante de pago. En un ciclo anual, su propio expediente le ahorra empezar de cero.',
              '<strong>Revise cada año si el monto cambió.</strong> El ajuste por inflación es periódico: lo que pagó el año pasado no es necesariamente lo de este año.',
            ],
          },
          {
            kind: 'note',
            text: 'Si en su casa hay varios adultos con TPS, multiplique: cada uno tiene su propio permiso, su propia renovación y su propia tarifa. Hemos visto familias planear para una persona y descubrir en el mismo mes que eran tres.',
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
            text: 'Hay dos maneras de perder un caso: por el fondo, cuando no se cumple un requisito de la ley, y por la forma, cuando el paquete ni siquiera llega a revisarse. La segunda es una tragedia evitable, y en año de cambio de tarifas se multiplica.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Pagar la tarifa vieja.</strong> Se descarga el formulario en enero, se presenta en marzo y el monto ya cambió. USCIS puede devolver el paquete completo por un pago incorrecto.',
              '<strong>Usar una edición vencida del formulario.</strong> Cada formulario trae su fecha de edición en la esquina; si solo se acepta la nueva, la vieja se rechaza aunque el contenido sea impecable.',
              '<strong>Un solo cheque para varios formularios</strong> cuando debían ir por separado, o al revés. Las instrucciones dicen cómo emitir el pago y a nombre de quién.',
              '<strong>Falta de firma.</strong> La causa de rechazo más absurda y más frecuente: firma original donde se pide original, y cada solicitante en su propia solicitud.',
              '<strong>Datos del I-94 que no cuadran</strong> con el resto del expediente. Si su registro de entrada tiene mal el nombre, la fecha o la clase de admisión, corríjalo con el Formulario I-102 —24 dólares— en vez de arrastrar el error.',
              '<strong>Enviar a la dirección equivocada.</strong> Cambia según el formulario, la categoría y a veces el estado donde vive. Verifíquela el día del envío.',
              '<strong>No guardar comprobante de envío ni copia del paquete.</strong> Si algo se extravía, el rastreo y la copia son su única prueba de que presentó a tiempo.',
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
            text: 'Cuando se anuncia un aumento de tarifas, mucha gente corre a presentar «antes de que suba». A veces es la decisión correcta y a veces sale carísimo. Todo depende de una pregunta: ¿su caso ya está listo, o lo estaría empujando incompleto solo por ahorrar?',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Sí conviene adelantarse',
                desc: 'Cuando el expediente ya está completo, la elegibilidad es clara, tiene documentos y evidencia en mano y solo faltaban la firma y el pago. Ahí adelantar es ahorro puro.',
              },
              {
                title: 'No conviene adelantarse',
                desc: 'Cuando faltan documentos clave, hay antecedentes penales sin analizar, hay presencia ilegal sin resolver o no está clara la mejor ruta. Presentar así puede provocar una negación que cuesta mucho más que el aumento.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Además, lo que normalmente importa es la fecha en que USCIS <strong>recibe</strong> su solicitud correctamente presentada, no la fecha en que usted la echó al correo. Presentar el último día, con el monto justo y sin margen para un error de forma, es exactamente el escenario donde un paquete devuelto lo deja del lado caro del calendario de todos modos.',
          },
          {
            kind: 'list',
            items: [
              'Confirme el monto vigente el mismo día en que emite el pago, no la semana anterior.',
              'Deje margen de días hábiles: los envíos se retrasan y las oficinas de correo cierran.',
              'Si va a presentar varios formularios juntos, revise cuáles llevan pago propio y cuáles no.',
              'Si su caso tiene un tema legal sin resolver, resuélvalo primero: una tarifa más alta se paga; una negación mal provocada a veces no se repara.',
            ],
          },
          {
            kind: 'note',
            text: 'Recuerde el aviso de vigencia: con litigio activo sobre políticas derivadas de la ley presupuestaria, un aumento anunciado puede quedar suspendido y una tarifa que hoy se cobra puede estar bajo revisión judicial mañana. Confirme el estado vigente antes de correr y antes de pagar.',
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
          a: 'El permiso de trabajo basado en TPS quedó limitado a un máximo de un año de validez, lo que en la práctica implica renovaciones anuales. Planifique los 275 dólares de la renovación como un gasto recurrente y vigile además los plazos de reinscripción del propio TPS.',
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
          a: 'No necesariamente. Existen exenciones y reducciones para ciertos trámites y perfiles, y se piden con documentación de respaldo. Su alcance se ha ido estrechando, así que confirme cuál sigue disponible para su categoría y pregunte también por planes de pago de honorarios.',
        },
      ],
    },
    conclusion: {
      title: 'Saber el número es la mitad del camino; saber cuándo pagarlo es la otra mitad',
      text: 'Arreglar papeles en 2026 es más caro y, sobre todo, más cambiante que hace unos años. Las tarifas que sí conocemos —la de asilo, la anual, las del permiso de trabajo, la del I-94— ya le permiten armar un presupuesto realista. Para las demás, la respuesta responsable no es un número inventado, sino una instrucción clara: verifíquelo en uscis.gov el día que presente.',
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
    readTime: '12 min',
    categoryLabel: 'Immigration Process',
    lastUpdated: 'August 6, 2026',
    summary: {
      title: 'Initial Summary',
      text: 'Since January 1, 2026, an <strong>inflation adjustment</strong> has been in effect on the fees set by the 2025 budget law, and with it a new fee structure: the asylum application now carries a <strong>minimum fee of 100 dollars</strong>, an <strong>Annual Asylum Fee of 100 dollars</strong> was created, the first work permit for asylum, parole and TPS is <strong>550 dollars</strong> with a <strong>275-dollar</strong> renewal, the TPS work permit is limited to a <strong>maximum of one year</strong> of validity, and correcting your I-94 with Form I-102 costs <strong>24 dollars</strong>. For everything else — family petitions, adjustment of status, naturalization — this guide explains the concept, but the exact figure must be confirmed on uscis.gov the day you file, because it moves.',
    },
    intro: [
      'The question that opens almost every consultation in our Houston offices is not a legal one, it is a financial one: «how much is it going to cost me to fix my papers?». It is a fair question and a hard one to answer in a single number, because the cost of an immigration case is not one price but the sum of different things people tend to blend together: what the government charges, what the attorney charges, and what third parties like doctors, translators and consulates charge.',
      'In 2026 that math got heavier and less stable. On January 1 an inflation adjustment took effect on the fees established by the 2025 budget law, and that adjustment came with a new structure: charges that did not exist before, fees that now repeat every year, and work permits with shorter validity, which forces people to renew them — and pay for them — more often.',
      'This article does two things. First, it gives you the numbers that are confirmed, in a table you can actually budget from. And second, it tells you honestly where we will <strong>not</strong> give you a figure, because those amounts move and publishing a stale number would hurt you more than help: in those cases we explain the concept and tell you where to verify the current amount before you write a check.',
    ],
    sections: [
      {
        icon: 'help',
        title: 'How to read this guide: the government fee is not the attorney fee',
        subtitle: 'Before you compare prices',
        blocks: [
          {
            kind: 'text',
            text: 'Many people compare quotes without realizing they are comparing different things. When someone tells you a case «costs this much», the first question is what that number includes. An immigration case has at least three separate buckets of money, and confusing them is the number one cause of surprises halfway through.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Government fees',
                desc: 'What USCIS or the Department of State charges to process your application. It is not negotiable and, outside very narrow exceptions, it is not refunded if your case is denied.',
              },
              {
                title: 'Legal fees',
                desc: 'What the firm charges to prepare, file and defend your case. It is agreed in writing and can usually be paid on a plan.',
              },
              {
                title: 'Third-party costs',
                desc: 'Immigration medical exam, certified translations, copies of civil records, photos, tracked mailings and, in consular cases, travel and lodging.',
              },
              {
                title: 'The cost of a mistake',
                desc: 'An application rejected for an incorrect payment or a missing signature is filed again and paid again. It is the expense nobody budgets for.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'There is a rule of thumb worth keeping: <strong>the fee pays for filing, not for winning</strong>. If the case is ultimately denied, that money does not come back. So a poorly built application does not just waste time: it loses real money, and in many families it is money that took months to save.',
          },
          {
            kind: 'note',
            text: 'If someone offers to «fix your papers» for a flat price without explaining how much is government fee and how much is attorney fee, ask for the breakdown in writing before handing over a dollar. A serious firm will give it to you without hesitation.',
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
            text: 'The 2025 budget law set new fees for several immigration filings and directed that they be adjusted for inflation. That adjustment has been in effect since January 1, 2026. In practice, filings that used to have no cost now do, and the figures will move again, because the adjustment mechanism is periodic.',
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
                'Asylum application (Form I-589)',
                '100 dollars (minimum)',
                'It used to be filed with no filing cost at all.',
              ],
              [
                'Annual Asylum Fee',
                '100 dollars per year',
                'It repeats while the case stays pending: an annual expense, not a one-time payment.',
              ],
              [
                'Initial work permit (asylum, parole and TPS)',
                '550 dollars',
                'Applies to the first permit requested in those categories.',
              ],
              [
                'Work permit renewal',
                '275 dollars',
                'Every renewal in those same categories is paid again.',
              ],
              [
                'I-94 correction (Form I-102)',
                '24 dollars',
                'An arrival record with wrong data throws off every later filing.',
              ],
              [
                'Family petition (Form I-130)',
                'Confirm with USCIS',
                'The figure shifts with the adjustments; verify it before issuing payment.',
              ],
              [
                'Adjustment of status (Form I-485)',
                'Confirm with USCIS',
                'Check whether the work permit and travel permit are paid separately.',
              ],
              [
                'Naturalization (Form N-400)',
                'Confirm with USCIS',
                'Before assuming the full amount, check whether a reduction or waiver applies.',
              ],
            ],
          },
          {
            kind: 'note',
            text: 'Currency notice: there is <strong>active litigation</strong> over policies derived from that budget law, so some fee rules may be suspended, modified or under judicial review by the time you read this. Verify the current status on uscis.gov — or with your attorney — <strong>before paying</strong> and before filing.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'Family and marriage-based residency: the concepts you can budget for',
        subtitle: 'Petition, adjustment and consular processing',
        blocks: [
          {
            kind: 'text',
            text: 'The family route is the most common and the most misunderstood on cost, because you pay <strong>in stages</strong>: it is not one check, it is a sequence of filings each with its own fee, sometimes separated by years. We do not print figures for this category because they move; we give you the full map so you know how many payments to expect.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>The family petition.</strong> The citizen or resident establishes the relationship. It is the first payment and the one that opens the file.',
              '<strong>Visa availability.</strong> For spouses and minor children of citizens it is usually immediate; other categories wait, and that wait can run into a fee increase.',
              '<strong>Adjustment inside the country or consular processing.</strong> If the person is here and qualifies, status is adjusted. If they must leave, the case moves to the Department of State, with different fees plus medical exam and travel.',
              '<strong>Work permit and travel permit.</strong> Confirm whether your category pays for them separately or they come included: this is a very common budgeting error.',
              '<strong>The waiver, if one is needed.</strong> Someone who accumulated unlawful presence and must depart may face the 3-year or 10-year bar; the provisional waiver has its own form and its own fee.',
              '<strong>Conditional residency.</strong> If the marriage was under two years old at approval, another petition — and another fee — is required to remove the conditions before expiration.',
            ],
          },
          {
            kind: 'text',
            text: 'That last point is the one we most often have to correct. A couple budgets for the petition and the adjustment, celebrates the approval, and two years later discovers there is one more filing before residency stops being conditional. That is not fine print: that is how the law works.',
          },
          {
            kind: 'note',
            text: 'If a provisional unlawful presence waiver applies to you, do not budget in pieces: ask for the full cost of the road — petition, waiver, consulate, medical exam and travel — before you file the first form. Finding out halfway through is what makes families abandon cases that were already winnable.',
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
            text: 'Naturalization is one of the filings that returns the most for the money: one payment that closes the immigration cycle for good. Even so, for many families the N-400 fee equals several days of work, and it is worth carefully checking whether you qualify to pay less — or nothing — before assuming the full amount. These are the concepts to know and ask for by name:',
          },
          {
            kind: 'list',
            items: [
              '<strong>Full fee waiver.</strong> Requested with Form I-912 and based on criteria such as receiving a means-tested public benefit, having household income below a certain threshold of the federal poverty guidelines, or documented financial hardship.',
              '<strong>Partial reduction.</strong> For applicants who do not qualify for the full waiver but whose income is still low, a reduced naturalization fee has existed.',
              '<strong>Categories exempt by law.</strong> Most notably, those naturalizing through military service have been exempt from the filing fee.',
              '<strong>Supporting documentation.</strong> A waiver is won with proof: benefit letters, tax returns, pay stubs or medical expense records.',
            ],
          },
          {
            kind: 'text',
            text: 'And here is the honest caveat: the scope of these waivers has been narrowing and <strong>not all of them apply to every filing</strong>. The existence of a waiver for one form does not mean there is one for the next. Before counting on it, confirm on uscis.gov whether it is still available for your category and for the current edition of the form.',
          },
          {
            kind: 'warning',
            text: 'Never skip filing because you assume you cannot afford it, and never request a waiver with no proof hoping it «might go through». A denied waiver can send the whole package back and cost you weeks. If you are unsure, ask before you assemble the envelope, not after.',
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
            text: 'The work permit — the EAD — is the document that creates the most urgency, because a job, a driver license in many states and a Social Security number all depend on it. It is also where the 2026 change lands hardest: humanitarian categories no longer have the cheap permit many people remember.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'First permit: 550 dollars',
                desc: 'That is the initial permit fee in asylum, parole and TPS. Budget it as a fixed startup cost of the case, not as something optional.',
              },
              {
                title: 'Renewal: 275 dollars',
                desc: 'Every renewal in those categories is paid again. If your permit expires every year, this number repeats every year.',
              },
              {
                title: 'Where the fee is not waived',
                desc: 'In these categories the permit is charged: do not assume a waiver will cover your EAD. Confirm on uscis.gov before relying on one.',
              },
              {
                title: 'Other EAD categories',
                desc: 'A permit tied to an adjustment of status, a U visa or another category follows its own rules and amounts. Verify which code applies to you.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'The amount does not depend on «asking for a work permit» in the abstract, but on the <strong>category code</strong> you request it under, which comes from the underlying immigration benefit. Two people filling out the same form can pay different amounts. If you do not know which one is yours, that is the first question to settle.',
          },
          {
            kind: 'warning',
            text: 'Do not leave renewal for the last month. An expired permit can force your employer to take you off the schedule even though your case is alive and even though the fee money is already saved. Renewing late costs a job, not just time.',
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
            text: 'This is the change that will hit TPS families hardest and the one least explained. The work permit issued on the basis of TPS is limited to a <strong>maximum of one year of validity</strong>. In practice, what used to be an occasional filing becomes an annual obligation: every year you renew, document and pay.',
          },
          {
            kind: 'text',
            text: 'On top of that, this cycle runs alongside the TPS calendar itself — designation periods and re-registration windows — which moves on its own and does not always line up. Budgeting well here is not only about setting money aside: it is about setting it aside <strong>with a date on it</strong>.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Write down the expiration</strong> of your current permit in your phone calendar, with a reminder six months out. Six, not one.',
              '<strong>Set the renewal aside monthly.</strong> Splitting the 275 dollars across the months of the year makes it manageable; gathering it in three weeks almost never is.',
              '<strong>Watch the TPS re-registration notices.</strong> The permit rests on the status: if you miss the window, the permit stops being your main problem.',
              '<strong>Keep a copy of everything you send</strong> and of the payment receipt. In an annual cycle, your own file saves you from starting over.',
              '<strong>Check every year whether the amount changed.</strong> The inflation adjustment is periodic: what you paid last year is not necessarily this year’s number.',
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
            text: 'There are two ways to lose a case: on the merits, when a legal requirement is not met, and on the form, when the package never even gets reviewed. The second is a preventable tragedy, and in a year of fee changes it multiplies.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Paying the old fee.</strong> You download the form in January, file in March, and the amount has already changed. USCIS can return the entire package over an incorrect payment.',
              '<strong>Using an expired edition of the form.</strong> Every form carries its edition date in the corner; if only the new one is accepted, the old one is rejected even if the content is flawless.',
              '<strong>One check for several forms</strong> when they had to be paid separately, or the reverse. The instructions state how payment must be issued and to whom.',
              '<strong>Missing signature.</strong> The most absurd and most frequent rejection cause: an original signature where an original is required, and each applicant signing their own application.',
              '<strong>I-94 data that does not match</strong> the rest of the file. If your arrival record has the wrong name, date or class of admission, fix it with Form I-102 — 24 dollars — instead of dragging the error along.',
              '<strong>Mailing to the wrong address.</strong> It varies by form, by category and sometimes by the state you live in. Verify it the day you mail.',
              '<strong>Keeping no mailing proof and no copy of the package.</strong> If something goes missing, the tracking and the copy are your only evidence you filed on time.',
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
            text: 'When a fee increase is announced, many people rush to file «before it goes up». Sometimes that is the right call and sometimes it is extremely expensive. It all comes down to one question: is your case actually ready, or would you be pushing it out incomplete just to save money?',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Filing early makes sense',
                desc: 'When the file is complete, eligibility is clear, your documents and evidence are in hand, and all that was left was the signature and the payment. There, moving it up is pure savings.',
              },
              {
                title: 'Filing early does not make sense',
                desc: 'When key documents are missing, there is a criminal record nobody has analyzed, unresolved unlawful presence, or the best route is still unclear. Filing like that can trigger a denial that costs far more than the increase.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Also, what normally matters is the date USCIS <strong>receives</strong> your properly filed application, not the date you dropped it in the mail. Filing on the last day, with the exact amount and no margin for a formatting error, is precisely the scenario where a returned package leaves you on the expensive side of the calendar anyway.',
          },
          {
            kind: 'list',
            items: [
              'Confirm the current amount the same day you issue payment, not the week before.',
              'Leave a margin of business days: shipments run late and post offices close.',
              'If you are filing several forms together, check which ones carry their own payment and which do not.',
              'If your case has an unresolved legal issue, resolve it first: a higher fee can be paid; a denial you brought on yourself sometimes cannot be undone.',
            ],
          },
          {
            kind: 'note',
            text: 'Remember the currency notice: with active litigation over policies derived from the budget law, an announced increase may end up suspended and a fee charged today may be under judicial review tomorrow. Confirm the current status before you rush and before you pay.',
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
          a: 'The TPS-based work permit is limited to a maximum of one year of validity, which in practice means annual renewals. Plan the 275-dollar renewal as a recurring expense and also keep an eye on the TPS re-registration deadlines themselves.',
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
          a: 'Not necessarily. Waivers and reductions exist for certain filings and profiles, and they are requested with supporting documentation. Their scope has been narrowing, so confirm which one is still available for your category and also ask about payment plans for legal fees.',
        },
      ],
    },
    conclusion: {
      title: 'Knowing the number is half the road; knowing when to pay it is the other half',
      text: 'Fixing your papers in 2026 is more expensive and, above all, more changeable than it was a few years ago. The fees we do know — asylum, the annual charge, the work permit, the I-94 — already let you build a realistic budget. For the rest, the responsible answer is not an invented number but a clear instruction: verify it on uscis.gov the day you file.',
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
