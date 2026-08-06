import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'caso-desestimado-corte-inmigracion-trampa-deportacion-expedita';
const ISO_DATE = '2026-08-06';
const IMAGE = '/blog/covers/caso-desestimado-corte-inmigracion-trampa-deportacion-expedita.jpg';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Caso desestimado en corte: ¿es una trampa?',
    metaDesc:
      'Cuando el gobierno pide cerrar su caso de inmigración puede buscar arrestarlo al salir y aplicarle remoción expedita. Cómo oponerse y qué hacer después.',
    title: 'Desestimaron mi caso en la corte de inmigración: por qué puede ser una trampa',
    displayDate: '06 Ago, 2026',
    readTime: '19 min',
    categoryLabel: 'Defensa contra Deportación',
    lastUpdated: '6 de agosto de 2026',
    summary: {
      title: 'Resumen inicial',
      text: 'Escuchar que su caso fue «desestimado» suena a victoria, y a veces lo es. Pero desde 2025 se documenta otra cosa: el abogado del gobierno pide al juez que cierre el caso y, minutos después, la persona es arrestada al salir del edificio y colocada en <strong>remoción expedita</strong>, un procedimiento en el que un oficial —no un juez— firma la orden de deportación. Dentro del proceso judicial usted puede pedir asilo, cancelación de remoción u otros alivios, con tiempo y con abogado; fuera de él, esas puertas se cierran casi por completo. Aquí explicamos cómo <strong>oponerse a la desestimación</strong>, qué hacer si ya se lo cerraron y qué evidencia debe cargar siempre.',
    },
    intro: [
      'Hay una frase que en la corte de inmigración suena a alivio y cada vez más no lo es: «el gobierno pide desestimar el caso». Mucha gente sale de la sala pensando que ganó y no entiende lo que ocurre veinte minutos después, cuando la detienen a la salida del edificio.',
      'Desde 2025 se documenta una táctica concreta: los abogados del gobierno piden al juez que cierre el caso y la persona queda fuera del proceso judicial, donde puede ser colocada en <strong>remoción expedita</strong>. Esa práctica fue parte central del litigio sobre arrestos en cortes que terminó en el fallo del 23 de junio de 2026.',
      'Este artículo explica en lenguaje llano qué es una moción de desestimación, por qué el gobierno querría presentarla, qué derechos se pierden al salir del proceso ante un juez y, sobre todo, qué puede hacer usted antes, durante y después de esa audiencia.',
    ],
    sections: [
      {
        icon: 'gavel',
        title: 'Qué es una moción de desestimación y quién la pide',
        subtitle: 'El vocabulario que hay que entender',
        blocks: [
          {
            kind: 'text',
            text: 'Su caso en la corte empezó con un documento: la Notificación de Comparecencia (Formulario I-862, el <strong>NTA</strong>). Cuando se presenta ante la corte se abre un procedimiento de remoción ante un juez de inmigración, y del otro lado de la sala hay un abogado que representa al gobierno. Los dos lados pueden presentar mociones: peticiones para que el juez decida algo.',
          },
          {
            kind: 'text',
            text: 'Una <strong>moción de desestimación</strong> pide al juez que cierre el caso sin resolverlo. La puede presentar el gobierno o usted a través de su abogado, y el juez es quien decide. Conviene separar tres palabras que en la sala se usan casi como sinónimos y no significan lo mismo.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Desestimación (dismissal)',
                desc: 'El juez cierra el caso y el expediente deja de estar ante la corte. Usted no recibe estatus, ni permiso de trabajo, ni protección: simplemente ya no hay caso.',
              },
              {
                title: 'Terminación (termination)',
                desc: 'También cierra el procedimiento y en la práctica se usa casi como sinónimo. A veces se pide porque el NTA tiene un defecto o porque hay una vía que se resuelve fuera de la corte.',
              },
              {
                title: 'Cierre administrativo',
                desc: 'El caso sale del calendario pero no se cierra del todo: queda en pausa y puede reactivarse. No es lo mismo que desaparecer del sistema.',
              },
            ],
          },
          {
            kind: 'note',
            text: 'Ninguna de las tres le da papeles. Si usted estaba indocumentado antes de la audiencia, sigue estándolo después. Lo único que cambia, y cambia mucho, es que ya no hay un juez con jurisdicción sobre su caso.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Por qué el gobierno querría cerrarle el caso',
        subtitle: 'La puerta que se abre al salir de la sala',
        blocks: [
          {
            kind: 'text',
            text: 'La reacción de cualquiera es lógica: si el gobierno me llevó a la corte, ¿por qué ahora quiere cerrar el caso? A veces conviene: si tiene una petición familiar aprobada y su ajuste de estatus se resuelve ante USCIS, cerrar el caso puede ser el paso correcto, y normalmente lo pide su propio abogado. El problema aparece cuando la pide el gobierno, usted no la solicitó y nadie le explica qué sigue.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Desestimación que puede convenirle',
                desc: 'La pide su abogado como parte de un plan: una vía que se resuelve ante USCIS, un NTA defectuoso, una petición ya aprobada. Usted sabe de antemano qué pasa el día después.',
              },
              {
                title: 'Desestimación que lo deja expuesto',
                desc: 'La pide el gobierno sin que usted la solicitara, se presenta como buena noticia y no viene con ninguna explicación sobre su situación migratoria al terminar la audiencia.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'La lógica de la segunda es sencilla y por eso es peligrosa: mientras usted está en proceso ante un juez, deportarlo exige una audiencia, pruebas y una decisión que se puede apelar. Fuera del proceso, si le aplican remoción expedita, un oficial puede firmar la orden el mismo día.',
          },
          {
            kind: 'warning',
            text: 'No acepte una desestimación que usted no pidió solo porque la palabra suena bien. Mientras el juez no la conceda, usted sigue dentro del proceso y tiene voz. Después, mucho menos.',
          },
        ],
      },
      {
        icon: 'siren',
        title: 'Qué es la remoción expedita y qué derechos se pierden',
        subtitle: 'Sin juez, sin audiencia, sin apelación',
        blocks: [
          {
            kind: 'text',
            text: 'La remoción expedita está prevista en la sección 235(b)(1) de la Ley de Inmigración y Nacionalidad. Permite que un oficial ordene la deportación de ciertas personas <strong>sin llevarlas ante un juez</strong>, cuando concluye que entraron sin documentos válidos o mediante documentos o declaraciones falsas. Durante años se aplicó casi solo en la frontera y a recién llegados; el gobierno ha buscado ampliarla hacia el interior del país y eso sigue en litigio.',
          },
          {
            kind: 'table',
            headers: ['', 'Ante un juez de inmigración', 'En remoción expedita'],
            rows: [
              ['Quién decide', 'Un juez, en una audiencia', 'Un oficial, sin audiencia'],
              ['Asilo o cancelación', 'Se presentan y se resuelven ante el juez', 'No; a lo sumo una entrevista de miedo creíble'],
              ['Abogado', 'Derecho a estar representado', 'En la práctica, muchas veces sin acceso a uno'],
              ['Apelación', 'Ante la Junta de Apelaciones', 'No hay apelación ordinaria'],
              ['Tiempo para probar', 'Semanas o meses', 'Horas o días'],
            ],
          },
          {
            kind: 'list',
            items: [
              'Por regla general no está sujeto a este procedimiento un <strong>residente permanente legal</strong>.',
              'Tampoco quien ya tiene <strong>asilo concedido</strong> o estatus de refugiado, ni un ciudadano estadounidense, aunque se han documentado errores de identificación.',
              'Los <strong>menores no acompañados</strong> cuentan con protecciones especiales previstas en la ley.',
              'Y el elemento que casi nadie conoce: la <strong>presencia física continua</strong>. Quien demuestra que ha vivido aquí de manera continua por más de dos años no debería quedar dentro de este procedimiento, pero la carga de demostrarlo recae en usted, esposado y sin acceso a sus papeles.',
            ],
          },
          {
            kind: 'note',
            text: 'El alcance de la remoción expedita —a qué zonas y a qué personas se aplica— ha cambiado varias veces y sigue en disputa ante los tribunales. Antes de tomar cualquier decisión, <strong>verifique con un abogado cuál es la regla vigente</strong> el día de su audiencia.',
          },
        ],
      },
      {
        icon: 'heart',
        title: 'Miedo creíble: la puerta que hay que abrir en voz alta',
        subtitle: 'Si teme regresar, tiene que decirlo',
        blocks: [
          {
            kind: 'text',
            text: 'Si a pesar de todo lo colocan en remoción expedita, queda una puerta y solo se abre si usted la nombra. Cuando una persona manifiesta miedo de regresar a su país o intención de pedir asilo, el oficial debe remitirla a una entrevista de <strong>miedo creíble</strong> con un oficial de asilo en lugar de ejecutar la orden sin más.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Dígalo desde el primer momento</strong>: que tiene miedo de regresar a su país o que quiere pedir asilo. No espere a que se lo pregunten, porque puede que nadie lo haga.',
              '<strong>Repítalo a cada oficial</strong> con el que hable y pida que quede anotado en su expediente.',
              '<strong>No firme nada que no entienda</strong>, aunque le digan que es un trámite o que así sale más rápido. Pida intérprete en su idioma.',
              '<strong>Cuente hechos concretos</strong> de lo que les pasó a usted y a su familia. No es el lugar para omitir detalles dolorosos.',
              '<strong>Si la decisión es negativa</strong>, puede pedir que un juez de inmigración la revise, y avise a su familia dónde está y cuál es su número de registro de extranjero (A-number).',
            ],
          },
          {
            kind: 'note',
            text: 'Nadie va a adivinar su miedo. El silencio se interpreta como ausencia de temor, y esa interpretación queda escrita en el expediente que después habrá que corregir.',
          },
        ],
      },
      {
        icon: 'balance',
        title: 'Usted tiene derecho a oponerse a la desestimación',
        subtitle: 'Lo que debe pasar dentro de la sala',
        blocks: [
          {
            kind: 'text',
            text: 'Que el gobierno pida cerrar el caso no significa que el caso se cierre: la desestimación la decide el juez, y usted es parte del procedimiento. Tiene derecho a manifestar su oposición y a que el juez la escuche antes de resolver. El silencio, en cambio, se lee como conformidad.',
          },
          {
            kind: 'steps',
            items: [
              'Diga en voz alta que <strong>se opone</strong> y pida que su oposición quede en el registro de la audiencia.',
              'Explique por qué: tiene un alivio pendiente o por presentar —asilo, cancelación de remoción, ajuste de estatus, visa U, VAWA— y quiere que el juez lo resuelva.',
              'Si no tiene abogado, pida un aplazamiento para conseguir uno. Es una petición razonable y frecuente, y pedirla no lo perjudica.',
              'Solicite tiempo para responder por escrito y acompañe su oposición con evidencia de que es elegible para algún alivio.',
              'Si el juez concede la desestimación de todos modos, reserve su derecho de apelación en ese momento y pida copia de la orden. Salga con un papel en la mano.',
            ],
          },
          {
            kind: 'note',
            text: 'Por regla general, el plazo para apelar ante la Junta de Apelaciones de Inmigración es de 30 días y no se prorroga. Si su caso se cerró y usted no sabe exactamente qué se decidió, ese reloj puede estar corriendo.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'La carpeta de más de dos años que debe cargar siempre',
        subtitle: 'Su prueba de presencia continua',
        blocks: [
          {
            kind: 'text',
            text: 'Si este artículo debiera dejarle una sola recomendación práctica, sería esta: <strong>tenga siempre a la mano prueba de que lleva más de dos años viviendo en Estados Unidos</strong>, no guardada en una caja en su casa. La presencia continua es justo lo que se discute cuando alguien intenta colocarlo en remoción expedita, y ese momento nunca llega con aviso.',
          },
          {
            kind: 'list',
            items: [
              'Contratos y recibos de renta, o cartas del casero, con fechas visibles.',
              'Recibos de luz, agua, gas, teléfono o internet a su nombre.',
              'Talones de pago, cartas de empleadores, declaraciones de impuestos y formularios W-2 o 1099.',
              'Constancias escolares y boletas de sus hijos, y expedientes médicos con fecha.',
              'Estados de cuenta, recibos de envíos de dinero y registro del vehículo.',
              'Cartas de su iglesia, de organizaciones comunitarias o de vecinos, fechadas y firmadas.',
            ],
          },
          {
            kind: 'text',
            text: 'La forma de cargarlo importa tanto como el contenido. Lleve <strong>copias</strong>, nunca los originales; guarde una versión digital en su teléfono; y deje un juego completo con una persona de confianza que pueda llevárselo a un abogado el mismo día.',
          },
          {
            kind: 'warning',
            text: 'Nunca cargue documentos falsos ni firme declaraciones inexactas sobre su fecha de entrada. Una mentira documentada hace más daño que cualquier vacío en su expediente y puede cerrarle puertas de forma permanente.',
          },
        ],
      },
      {
        icon: 'swap',
        title: 'Si su caso ya fue desestimado',
        subtitle: 'Qué se puede hacer después',
        blocks: [
          {
            kind: 'text',
            text: 'Que el caso se haya cerrado no significa que se acabaron las opciones, pero sí que el tiempo pasó a jugar en su contra. Lo primero es entender qué ocurrió exactamente, porque «me cerraron el caso» puede significar cosas muy distintas.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Confirme qué se decidió.</strong> El sistema automatizado de información de casos de EOIR permite verificar el estado de un expediente con el número A. Una desestimación no es lo mismo que una orden de deportación.',
              '<strong>Pida su expediente.</strong> Una solicitud FOIA a las agencias de inmigración le da acceso a lo que el gobierno tiene sobre usted: entradas, salidas, arrestos y antecedentes.',
              '<strong>Evalúe una moción para reabrir</strong> o para volver a poner el caso en el calendario, sobre todo si tenía un alivio pendiente cuando lo cerraron.',
              '<strong>Revise las vías afirmativas</strong> fuera de la corte: asilo afirmativo, visa U, VAWA, visa T, ajuste de estatus o el perdón provisional I-601A, según su historia.',
              '<strong>Arme un plan familiar de emergencia</strong>: quién recoge a los niños, quién tiene los documentos y a qué abogado se llama. Si lo detienen, no firme nada y diga que quiere hablar con un abogado.',
            ],
          },
          {
            kind: 'note',
            text: 'Los plazos para reabrir son estrictos. Cuando existe una orden final de remoción, la regla general es de 90 días desde la orden, con excepciones importantes como las órdenes en ausencia o los cambios en las condiciones del país. Verifique su situación cuanto antes.',
          },
        ],
      },
      {
        icon: 'search',
        title: 'Señales de alerta en su próxima audiencia',
        subtitle: 'Qué mirar y qué escuchar',
        blocks: [
          {
            kind: 'list',
            items: [
              'El abogado del gobierno pide <strong>dismissal</strong> o <strong>termination</strong> y usted no lo solicitó ni sabía que iba a ocurrir.',
              'Le dicen que «ya no tiene caso» o que «puede irse a su casa», sin explicarle en qué situación migratoria queda al salir.',
              'Le presentan el cierre como buena noticia, pero nadie le entrega un papel que lo explique.',
              'Le piden que firme documentos en inglés antes o después de la audiencia, con prisa y sin intérprete.',
              'Nota una presencia inusual de agentes en el pasillo, en la entrada o en el estacionamiento.',
              'Su caso aparece cerrado en el sistema sin que usted haya estado en ninguna audiencia.',
            ],
          },
          {
            kind: 'text',
            text: 'Ante cualquiera de estas señales hay tres preguntas que usted puede hacer en la sala y que el intérprete debe traducir: ¿se está cerrando mi caso y por qué?, ¿tengo derecho a oponerme?, ¿en qué situación quedo al salir hoy de este edificio?',
          },
          {
            kind: 'warning',
            text: 'No vaya solo a su audiencia si puede evitarlo. Que alguien de confianza lo espere afuera, sepa su número A y tenga el teléfono de su abogado convierte una desaparición de días en una llamada de una hora.',
          },
        ],
      },
      {
        icon: 'calendar',
        title: 'El contexto: el fallo del 23 de junio de 2026',
        subtitle: 'Por qué esta táctica llegó a los tribunales',
        blocks: [
          {
            kind: 'text',
            text: 'Cerrar el caso y detener a la persona al salir no es una anécdota aislada: fue parte central del litigio sobre los arrestos en las cortes de inmigración que terminó en el fallo del <strong>23 de junio de 2026</strong>, en el que un juez federal anuló las políticas que habilitaban esos arrestos. En este mismo blog hay un artículo dedicado a ese fallo. Conviene leerlo sin exagerarlo: una decisión así puede apelarse o modificarse, las prácticas varían de una corte a otra y las facultades generales de arresto no desaparecieron.',
          },
          {
            kind: 'list',
            items: [
              'Vaya a <strong>todas</strong> sus audiencias. Faltar produce una orden de deportación en ausencia, sin que nadie escuche su caso.',
              'Llegue con abogado. Si no lo tiene, llegue temprano y pregunte por los programas de orientación legal en el edificio de la corte.',
              'Lleve su carpeta de presencia continua y memorice —no solo guarde— el teléfono de un contacto de emergencia.',
            ],
          },
          {
            kind: 'note',
            text: 'Este artículo refleja la situación al 6 de agosto de 2026. Antes de su audiencia, <strong>verifique con su abogado el estado vigente</strong> de ese litigio y de las reglas sobre remoción expedita: pueden haber cambiado, y esa diferencia se nota el mismo día, en el pasillo.',
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Que desestimen mi caso no es una victoria?',
          a: 'A veces sí y a veces no. Es buena noticia cuando su abogado la pidió como parte de una estrategia, por ejemplo para resolver su ajuste de estatus ante USCIS. Es un riesgo cuando la pide el gobierno sin que usted la solicitara: lo saca de la protección de un juez sin darle nada a cambio.',
        },
        {
          q: '¿Puedo negarme a que cierren mi caso?',
          a: 'Puede oponerse, que no es lo mismo que negarse. La decisión final es del juez, pero usted tiene derecho a manifestar su oposición y a que quede en el registro. El silencio suele leerse como conformidad.',
        },
        {
          q: '¿La remoción expedita se aplica a alguien que lleva años aquí?',
          a: 'La presencia física continua es un elemento central de ese procedimiento, y quien demuestra más de dos años viviendo en el país no debería quedar dentro de él. El problema es práctico: la prueba se la piden en el momento del arresto, no después.',
        },
        {
          q: '¿Puedo pedir asilo después de que cerraron mi caso?',
          a: 'Puede haber vías afirmativas fuera de la corte y también la posibilidad de pedir que su caso se reabra. Cuál corresponde depende de su historia, de sus entradas y salidas y de plazos estrictos. Es el tipo de decisión que no conviene tomar por su cuenta.',
        },
        {
          q: '¿Es mejor no ir a la audiencia para que no me arresten?',
          a: 'No. Faltar es la peor decisión posible: el juez puede ordenar su deportación en ausencia, sin escuchar nada de lo que usted tenía que decir, y esa orden queda vigente y ejecutable. Todo lo que explicamos aquí es para que llegue preparado, no para que deje de ir.',
        },
      ],
    },
    conclusion: {
      title: 'Una palabra que suena a alivio y puede no serlo',
      text: 'La diferencia entre estar dentro de un proceso ante un juez y estar fuera de él no es un tecnicismo: es la diferencia entre poder pedir asilo, cancelación de remoción o un ajuste de estatus, con tiempo y con abogado, y que un oficial firme su deportación en horas. Decida de antemano qué va a decir si un día, en su audiencia, escucha que el gobierno pide cerrar su caso.',
      advice: 'Hable con un abogado antes de su próxima audiencia, no después. Vaya siempre a la corte, lleve copias de su prueba de presencia continua y no firme nada que no entienda.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'Ley de Inmigración y Nacionalidad, sección 235(b)(1) — remoción expedita y miedo creíble',
        'Reglamento federal 8 CFR 1239.2 — desestimación y terminación de procedimientos de remoción',
        '8 CFR parte 1003 — mociones para reabrir y apelaciones ante la BIA',
        'EOIR — Manual de la corte de inmigración y sistema de información de casos',
        'DHS — Notificación de Comparecencia (Formulario I-862) y procedimientos de detención migratoria',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'Case Dismissed in Immigration Court: A Trap?',
    metaDesc:
      'When the government asks to dismiss your immigration case, it may plan to arrest you outside and use expedited removal. How to object and what to do next.',
    title: 'They Dismissed My Immigration Court Case: Why That Can Be a Trap',
    displayDate: 'Aug 06, 2026',
    readTime: '19 min',
    categoryLabel: 'Deportation Defense',
    lastUpdated: 'August 6, 2026',
    summary: {
      title: 'Initial Summary',
      text: 'Hearing that your case was “dismissed” sounds like a victory, and sometimes it is. But since 2025 something else has been documented: the government attorney asks the judge to close the case and, minutes later, the person is arrested leaving the building and placed in <strong>expedited removal</strong>, a process where an officer — not a judge — signs the deportation order. Inside court proceedings you can seek asylum, cancellation of removal or other relief, with time and with a lawyer; outside them, those doors close almost completely. Here we explain how to <strong>object to the dismissal</strong>, what to do if it has already been closed, and what evidence you should always carry.',
    },
    intro: [
      'There is a phrase in immigration court that sounds like relief and increasingly is not: “the government moves to dismiss the case.” Many people walk out of the courtroom believing they won, and cannot understand what happens twenty minutes later, when they are detained at the exit of the building.',
      'Since 2025 a specific tactic has been documented: government attorneys ask the judge to close the case and, once it is closed, the person is outside the court process and can be placed in <strong>expedited removal</strong>. That practice was a central part of the litigation over courthouse arrests that ended in the June 23, 2026 ruling.',
      'This article explains in plain language what a motion to dismiss is, why the government would file one, what rights are lost when you leave the process before a judge, and above all what you can do before, during and after that hearing.',
    ],
    sections: [
      {
        icon: 'gavel',
        title: 'What a motion to dismiss is and who files it',
        subtitle: 'The vocabulary you need to understand',
        blocks: [
          {
            kind: 'text',
            text: 'Your court case began with a document: the Notice to Appear (Form I-862, the <strong>NTA</strong>). When it is filed with the court, removal proceedings open before an immigration judge, and on the other side of the courtroom sits an attorney representing the government. Both sides can file motions: requests asking the judge to decide something.',
          },
          {
            kind: 'text',
            text: 'A <strong>motion to dismiss</strong> asks the judge to close the case without deciding it. The government can file one, or you can through your attorney, and the judge decides. It helps to separate three words used almost interchangeably in the courtroom that do not mean the same thing.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Dismissal',
                desc: 'The judge closes the case and the file is no longer before the court. You receive no status, no work permit and no protection: there is simply no case anymore.',
              },
              {
                title: 'Termination',
                desc: 'It also ends the proceeding and is often used as a synonym in practice. It is sometimes sought because the NTA is defective or because a path exists that resolves outside court.',
              },
              {
                title: 'Administrative closure',
                desc: 'The case comes off the calendar but is not fully closed: it sits paused and can be reactivated. That is not the same as disappearing from the system.',
              },
            ],
          },
          {
            kind: 'note',
            text: 'None of the three gives you papers. If you were undocumented before the hearing, you still are after it. The only thing that changes — and it changes a great deal — is that no judge has jurisdiction over your case anymore.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Why the government would want your case closed',
        subtitle: 'The door that opens when you leave the courtroom',
        blocks: [
          {
            kind: 'text',
            text: 'Anyone’s reaction is logical: if the government took me to court, why does it now want the case closed? Sometimes it is the right move: if you have an approved family petition and your adjustment of status will be decided by USCIS, closing the court case may be the correct step, and it is normally your own attorney who asks for it. The problem appears when the government asks, you did not request it, and nobody explains what comes next.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'A dismissal that may help you',
                desc: 'Your attorney requests it as part of a plan: a path that resolves at USCIS, a defective NTA, an already approved petition. You know in advance what the next day looks like.',
              },
              {
                title: 'A dismissal that leaves you exposed',
                desc: 'The government requests it without you asking, presents it as good news, and offers no explanation about your immigration situation once the hearing ends.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'The logic of the second one is simple, and that is what makes it dangerous: while you are in proceedings before a judge, deporting you requires a hearing, evidence and a decision that can be appealed. Outside the process, if expedited removal is applied, an officer can sign the order the same day.',
          },
          {
            kind: 'warning',
            text: 'Do not accept a dismissal you did not ask for just because the word sounds good. Until the judge grants it, you are still inside the process and you have a voice. Afterward, far less so.',
          },
        ],
      },
      {
        icon: 'siren',
        title: 'What expedited removal is and what rights are lost',
        subtitle: 'No judge, no hearing, no appeal',
        blocks: [
          {
            kind: 'text',
            text: 'Expedited removal comes from section 235(b)(1) of the Immigration and Nationality Act. It allows an officer to order the deportation of certain people <strong>without bringing them before a judge</strong>, when the officer concludes they entered without valid documents or through false documents or statements. For years it was applied almost only at the border and to recent arrivals; the government has sought to extend it into the interior, and that remains in litigation.',
          },
          {
            kind: 'table',
            headers: ['', 'Before an immigration judge', 'In expedited removal'],
            rows: [
              ['Who decides', 'A judge, at a hearing', 'An officer, with no hearing'],
              ['Asylum or cancellation', 'Filed and decided before the judge', 'No; at most a credible fear interview'],
              ['Attorney', 'Right to be represented', 'In practice, often no access to one'],
              ['Appeal', 'To the Board of Immigration Appeals', 'No ordinary appeal'],
              ['Time to prove your case', 'Weeks or months', 'Hours or days'],
            ],
          },
          {
            kind: 'list',
            items: [
              'As a general rule, a <strong>lawful permanent resident</strong> is not subject to this procedure.',
              'Neither is someone already <strong>granted asylum</strong> or refugee status, nor a U.S. citizen, although misidentifications have been documented.',
              '<strong>Unaccompanied children</strong> have special protections written into the law.',
              'And the element almost nobody knows: <strong>continuous physical presence</strong>. Someone who can show they have lived here continuously for more than two years should not fall inside this procedure, but the burden of showing it falls on you, handcuffed and with no access to your papers.',
            ],
          },
          {
            kind: 'note',
            text: 'The reach of expedited removal — which areas and which people it applies to — has changed several times and remains disputed in the courts. Before making any decision, <strong>confirm with an attorney what rule is in effect</strong> on the day of your hearing.',
          },
        ],
      },
      {
        icon: 'heart',
        title: 'Credible fear: the door you have to open out loud',
        subtitle: 'If you fear returning, you have to say so',
        blocks: [
          {
            kind: 'text',
            text: 'If you are placed in expedited removal anyway, one door remains and it only opens if you name it. When a person expresses fear of returning to their country or an intention to seek asylum, the officer must refer them for a <strong>credible fear</strong> interview with an asylum officer instead of simply carrying out the order.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Say it from the very first moment</strong>: that you are afraid to return to your country or that you want to apply for asylum. Do not wait to be asked, because nobody may ask.',
              '<strong>Repeat it to every officer</strong> you speak with, and ask that it be written down in your file.',
              '<strong>Do not sign anything you do not understand</strong>, even if you are told it is routine or that it will get you out faster. Ask for an interpreter in your language.',
              '<strong>Give concrete facts</strong> about what happened to you and your family. This is not the place to be discreet or to leave out painful details.',
              '<strong>If the decision is negative</strong>, you can ask an immigration judge to review it, and tell your family where you are and what your alien registration number (A-number) is.',
            ],
          },
          {
            kind: 'note',
            text: 'Nobody will guess your fear. Silence is read as the absence of fear, and that reading goes into the record you will later have to correct.',
          },
        ],
      },
      {
        icon: 'balance',
        title: 'You have the right to object to the dismissal',
        subtitle: 'What should happen inside the courtroom',
        blocks: [
          {
            kind: 'text',
            text: 'The government asking to close your case does not mean the case closes: dismissal is the judge’s decision, and you are a party to the proceeding. You have the right to state your objection and to have the judge hear it before ruling. Silence, by contrast, reads as agreement.',
          },
          {
            kind: 'steps',
            items: [
              'Say out loud that you <strong>object</strong>, and ask that your objection be placed on the record of the hearing.',
              'Explain why: you have relief pending or about to be filed — asylum, cancellation of removal, adjustment of status, U visa, VAWA — and you want the judge to decide it.',
              'If you have no attorney, ask for a continuance to find one. It is a reasonable and common request, and asking does not hurt you.',
              'Ask for time to respond in writing, and file your objection with evidence that you are eligible for some form of relief.',
              'If the judge grants the dismissal anyway, reserve your right to appeal right then and ask for a copy of the order. Walk out with paper in hand.',
            ],
          },
          {
            kind: 'note',
            text: 'As a general rule, the deadline to appeal to the Board of Immigration Appeals is 30 days and it is not extended. If your case was closed and you do not know exactly what was decided, that clock may be running.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'The two-year folder you should always carry',
        subtitle: 'Your proof of continuous presence',
        blocks: [
          {
            kind: 'text',
            text: 'If this article should leave you with one practical recommendation, it is this: <strong>keep proof that you have lived in the United States for more than two years within reach</strong>, not stored in a box at home. Continuous presence is exactly what is disputed when someone tries to place you in expedited removal, and that moment never arrives with warning.',
          },
          {
            kind: 'list',
            items: [
              'Leases and rent receipts, or letters from your landlord, with visible dates.',
              'Electric, water, gas, phone or internet bills in your name.',
              'Pay stubs, letters from employers, tax returns and W-2 or 1099 forms.',
              'School records and report cards for your children, and dated medical records.',
              'Bank statements, money transfer receipts and vehicle registration.',
              'Letters from your church, community organizations or neighbors, dated and signed.',
            ],
          },
          {
            kind: 'text',
            text: 'How you carry it matters as much as what it contains. Carry <strong>copies</strong>, never originals; keep a digital version on your phone; and leave a full set with someone you trust who can take it to an attorney the same day.',
          },
          {
            kind: 'warning',
            text: 'Never carry false documents and never sign statements about your entry date that are not accurate. A documented lie does more damage than any gap in your file, and it can close doors permanently.',
          },
        ],
      },
      {
        icon: 'swap',
        title: 'If your case has already been dismissed',
        subtitle: 'What can still be done',
        blocks: [
          {
            kind: 'text',
            text: 'A closed case does not mean options are gone, but it does mean time is now working against you. The first step is understanding exactly what happened, because “they closed my case” can mean very different things.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Confirm what was decided.</strong> The EOIR automated case information system lets you check the status of a file using the A-number. A dismissal is not the same as a deportation order.',
              '<strong>Request your file.</strong> A FOIA request to the immigration agencies gives you access to what the government has on you: entries, exits, arrests and history.',
              '<strong>Evaluate a motion to reopen</strong> or to put the case back on the calendar, especially if you had relief pending when it was closed.',
              '<strong>Review affirmative paths</strong> outside court: affirmative asylum, U visa, VAWA, T visa, adjustment of status, or the I-601A provisional waiver, depending on your history.',
              '<strong>Build a family emergency plan</strong>: who picks up the children, who holds the documents, which attorney gets called. If you are detained, sign nothing and say you want to speak with an attorney.',
            ],
          },
          {
            kind: 'note',
            text: 'Deadlines to reopen are strict. When a final removal order exists, the general rule is 90 days from the order, with important exceptions such as in absentia orders or changed country conditions. Check your situation as soon as possible.',
          },
        ],
      },
      {
        icon: 'search',
        title: 'Red flags at your next hearing',
        subtitle: 'What to watch for and what to listen for',
        blocks: [
          {
            kind: 'list',
            items: [
              'The government attorney asks for <strong>dismissal</strong> or <strong>termination</strong> and you neither requested it nor knew it was coming.',
              'You are told the case is over or that you can go home, with no explanation of your immigration situation on the way out.',
              'The closing is presented as good news, but nobody hands you a document explaining it.',
              'You are asked to sign papers in English before or after the hearing, in a hurry and without an interpreter.',
              'You notice an unusual presence of officers in the hallway, at the entrance or in the parking lot.',
              'Your case shows as closed in the system without you ever having attended a hearing.',
            ],
          },
          {
            kind: 'text',
            text: 'Faced with any of these signs, there are three questions you can ask in the courtroom and the interpreter must translate: is my case being closed, and why? Do I have the right to object? What immigration situation am I in when I walk out of this building today?',
          },
          {
            kind: 'warning',
            text: 'Do not go to your hearing alone if you can avoid it. Having someone you trust waiting outside, knowing your A-number and holding your attorney’s phone number turns a days-long disappearance into a one-hour phone call.',
          },
        ],
      },
      {
        icon: 'calendar',
        title: 'The context: the June 23, 2026 ruling',
        subtitle: 'Why this tactic ended up in court',
        blocks: [
          {
            kind: 'text',
            text: 'Closing the case and detaining the person on the way out is not an isolated anecdote: it was a central part of the litigation over immigration courthouse arrests that ended in the ruling of <strong>June 23, 2026</strong>, in which a federal judge struck down the policies that enabled those arrests. This blog has an article devoted to that ruling. It is worth reading without overstating it: a decision like that can be appealed or modified, practices vary from one court to another, and general arrest authority did not disappear.',
          },
          {
            kind: 'list',
            items: [
              'Attend <strong>every</strong> hearing. Missing one produces an in absentia removal order, with nobody hearing your case at all.',
              'Come with an attorney. If you do not have one, arrive early and ask about the legal orientation programs available in the courthouse.',
              'Bring your continuous presence folder, and memorize — do not merely store — an emergency contact’s phone number.',
            ],
          },
          {
            kind: 'note',
            text: 'This article reflects the situation as of August 6, 2026. Before your hearing, <strong>confirm with your attorney the current status</strong> of that litigation and of the expedited removal rules: they may have changed, and the difference shows up that same day, in the hallway.',
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'Isn’t having my case dismissed a victory?',
          a: 'Sometimes yes and sometimes no. It is good news when your attorney requested it as part of a strategy, for example to resolve your adjustment of status at USCIS. It is a risk when the government requests it without you asking: it removes you from a judge’s protection without giving you anything in return.',
        },
        {
          q: 'Can I refuse to let them close my case?',
          a: 'You can object, which is not the same as refusing. The final decision belongs to the judge, but you have the right to state your objection and to have it placed on the record. Silence is usually read as agreement.',
        },
        {
          q: 'Does expedited removal apply to someone who has been here for years?',
          a: 'Continuous physical presence is a central element of that procedure, and someone who can show more than two years living in the country should not fall inside it. The problem is practical: the proof is demanded at the moment of arrest, not afterward.',
        },
        {
          q: 'Can I apply for asylum after my case was closed?',
          a: 'There may be affirmative paths outside court, and also the possibility of asking to reopen your case. Which one fits depends on your history, your entries and exits, and strict deadlines. This is the kind of decision you should not make on your own.',
        },
        {
          q: 'Is it better not to go to the hearing so I am not arrested?',
          a: 'No. Missing it is the worst possible decision: the judge can order your deportation in absentia, without hearing anything you had to say, and that order stands and is enforceable. Everything explained here is meant to help you arrive prepared, not to keep you from going.',
        },
      ],
    },
    conclusion: {
      title: 'A word that sounds like relief and may not be',
      text: 'The difference between being inside a process before a judge and being outside it is not a technicality: it is the difference between being able to seek asylum, cancellation of removal or adjustment of status, with time and with a lawyer, and having an officer sign your deportation within hours. Decide in advance what you will say if one day, at your hearing, you hear the government ask to close your case.',
      advice: 'Talk to an attorney before your next hearing, not after. Always go to court, carry copies of your proof of continuous presence, and never sign anything you do not understand.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'Immigration and Nationality Act, section 235(b)(1) — expedited removal and the credible fear interview',
        'Federal regulation 8 CFR 1239.2 — dismissal and termination of removal proceedings',
        'Federal regulation 8 CFR part 1003 — motions to reopen and appeals to the Board of Immigration Appeals (BIA)',
        'EOIR — Immigration Court Practice Manual and automated case information system',
        'Department of Homeland Security (DHS) — Notice to Appear (Form I-862) and immigration detention procedures',
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
          ? 'Persona saliendo de una audiencia en la corte de inmigración'
          : 'Person leaving a hearing at immigration court'
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
