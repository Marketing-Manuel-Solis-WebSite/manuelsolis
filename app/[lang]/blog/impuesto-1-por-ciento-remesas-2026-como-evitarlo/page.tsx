import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'impuesto-1-por-ciento-remesas-2026-como-evitarlo';
const ISO_DATE = '2026-08-06';
const IMAGE = '/blog/covers/impuesto-1-por-ciento-remesas-2026-como-evitarlo.jpg';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Impuesto del 1% a remesas: cómo no pagarlo',
    metaDesc:
      'El impuesto del 1% a las remesas solo grava los envíos en efectivo. Desde cuenta, débito, crédito o app digital no se cobra. Qué es cierto y qué es mito.',
    title: 'Impuesto del 1% a las remesas: quién lo paga de verdad y cómo enviar dinero sin pagarlo',
    displayDate: '06 Ago, 2026',
    readTime: '16 min',
    categoryLabel: 'Procesos Migratorios',
    lastUpdated: '6 de agosto de 2026',
    summary: {
      title: 'Resumen inicial',
      text: 'Desde el 1 de enero de 2026 existe en Estados Unidos un impuesto federal del <strong>1% sobre ciertas remesas</strong> enviadas al extranjero, y desde entonces circula mucho más miedo que información. El dato que casi ningún titular explicó es justo el que más le conviene: el impuesto <strong>solo grava los envíos fondeados en efectivo, money order o cheque de caja</strong>. Si el dinero sale de una cuenta bancaria, de una tarjeta de débito o crédito, o de una aplicación digital, <strong>no se cobra</strong>. La regla mira la forma de pago, no a la persona: aplica sin importar el estatus migratorio de quien envía, y <strong>quien recibe en México no paga nada</strong>. Aquí separamos lo cierto de lo falso y le explicamos, paso a paso, cómo seguir mandando su dinero sin ese 1% de más.',
    },
    intro: [
      'Pocas cosas explican mejor a una familia migrante que el envío de dinero de cada quincena. No es una transferencia: es la renta de la casa donde usted creció, la medicina de su mamá, la colegiatura de un sobrino. Por eso, cuando en enero de 2026 empezó a aplicarse un impuesto federal sobre ciertas remesas, la noticia no se leyó en la comunidad como un tema fiscal: se leyó como un golpe directo a la familia.',
      'El impuesto existe y es real. Nace de la ley presupuestaria aprobada en 2025, en su <strong>sección 4475</strong>, y entró en vigor el <strong>1 de enero de 2026</strong>. Grava con un <strong>1%</strong> el monto de ciertas transferencias de dinero que salen de Estados Unidos hacia el extranjero, y se cobra en el momento del envío, en la misma ventanilla o plataforma donde usted hace la operación.',
      'Lo que casi ningún titular explicó —y es justo lo que más le conviene saber— es que el impuesto <strong>no aplica a todos los envíos</strong>. Depende por completo de con qué fondea usted la transferencia. Este artículo explica esa diferencia con calma, desmonta los mitos que están circulando en la comunidad y le dice, paso a paso, cómo puede seguir mandando dinero a su familia sin pagar ese 1% de más.',
    ],
    sections: [
      {
        icon: 'dollar',
        title: 'Qué es exactamente el impuesto y desde cuándo aplica',
        subtitle: 'El origen de la regla',
        blocks: [
          {
            kind: 'text',
            text: 'Su nombre técnico es impuesto sobre transferencias de remesas. Es un impuesto <strong>federal</strong>, del <strong>1% sobre el monto enviado</strong>, aplicable a transferencias de dinero que salen de Estados Unidos hacia el extranjero. No sustituye ni elimina las comisiones que el negocio de envíos ya le cobraba: se suma a ellas. Por eso mucha gente lo notó primero como «me cobraron más caro que antes» y no como un impuesto nuevo.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Desde cuándo.</strong> Se aplica a los envíos hechos a partir del 1 de enero de 2026. Los envíos anteriores a esa fecha no están gravados por esta regla.',
              '<strong>Cuánto es.</strong> El 1% del monto que usted manda. No es un porcentaje sobre la comisión: es sobre la cantidad enviada.',
              '<strong>Quién lo cobra.</strong> El negocio que procesa la transferencia lo aplica al momento de la operación. Usted no presenta ningún formulario adicional ni hace ningún trámite por separado.',
              '<strong>A quién aplica.</strong> A quien envía, sin importar su estatus migratorio. Ciudadanos, residentes, personas con permiso de trabajo y personas indocumentadas están en la misma situación frente a esta regla.',
            ],
          },
          {
            kind: 'text',
            text: 'Ese último punto genera confusión en las dos direcciones. Hay quien cree que el impuesto se creó «para castigar a los indocumentados» y hay quien cree que «como yo soy ciudadano, a mí no me toca». Ninguna de las dos cosas es exacta: <strong>la regla mira la forma de pago, no a la persona</strong>.',
          },
          {
            kind: 'note',
            text: 'Esta es una regla nueva y en pleno ajuste: los criterios de cobro, las excepciones y la manera en que cada negocio la aplica pueden cambiar. Antes de tomar una decisión con base en este artículo, <strong>verifique el estado vigente de la regla</strong> y pregunte directamente en el lugar donde envía su dinero.',
          },
        ],
      },
      {
        icon: 'wallet',
        title: 'Lo que casi ningún titular explicó: solo grava el efectivo',
        subtitle: 'La letra chica que cambia todo',
        blocks: [
          {
            kind: 'text',
            text: 'Aquí está la parte que cambia el bolsillo de una familia y que se perdió entre titulares alarmistas: el impuesto <strong>solo grava las transferencias fondeadas en efectivo o en instrumentos equivalentes al efectivo</strong>. En concreto, tres formas de pago: efectivo, money order y cheque de caja (cashier’s check).',
          },
          {
            kind: 'text',
            text: 'Todo lo demás queda fuera. Si el dinero sale de una cuenta bancaria, de una tarjeta de débito, de una tarjeta de crédito o de una aplicación digital ligada a una cuenta, <strong>el 1% no se cobra</strong>. No es un vacío legal ni una salida ingeniosa: así se escribió la ley.',
          },
          {
            kind: 'table',
            headers: ['Cómo paga usted el envío', '¿Se cobra el 1%?'],
            rows: [
              ['Efectivo en ventanilla', 'Sí'],
              ['Money order', 'Sí'],
              ['Cheque de caja (cashier’s check)', 'Sí'],
              ['Transferencia desde su cuenta bancaria', 'No'],
              ['Tarjeta de débito', 'No'],
              ['Tarjeta de crédito', 'No'],
              ['Aplicación digital ligada a una cuenta o tarjeta', 'No'],
            ],
          },
          {
            kind: 'note',
            text: 'Fíjese en lo que esto significa en la práctica: el mismo envío, al mismo destinatario, por la misma cantidad y en el mismo negocio, puede costar 1% más o 1% menos según si usted paga con los billetes que trae en la bolsa o con la tarjeta de débito de su cuenta.',
          },
        ],
      },
      {
        icon: 'swap',
        title: 'Formas legales de no pagarlo',
        subtitle: 'Todo se reduce a con qué fondea el envío',
        blocks: [
          {
            kind: 'text',
            text: 'No hace falta ningún trámite especial, ningún «gestor» y ninguna estructura complicada. La única decisión que importa es <strong>con qué fondea usted la transferencia</strong>. Estas son las rutas legales, de la más sencilla a la que pide un paso previo.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Pague el envío con su tarjeta de débito</strong> en lugar de con efectivo. Si ya tiene cuenta, este cambio se hace hoy mismo y no requiere nada más.',
              '<strong>Envíe directamente desde su cuenta bancaria</strong>, en la aplicación del banco o en la sucursal. Muchos bancos y cooperativas de crédito tienen su propio servicio de envío a México y Centroamérica.',
              '<strong>Use una aplicación digital de envíos ligada a su cuenta o tarjeta.</strong> Antes de confirmar, revise el desglose en pantalla y compruebe que no aparezca el cargo del 1%.',
              '<strong>Si todavía no tiene cuenta, ábrala.</strong> Es el paso que más rinde: además de sacarlo del supuesto del impuesto, le da un lugar seguro para su dinero y comprobantes de lo que gana y lo que manda.',
              '<strong>Compare el costo total, no solo el impuesto.</strong> Un servicio sin impuesto pero con comisión alta o mal tipo de cambio puede salir más caro que otro con impuesto. Pida siempre el desglose completo antes de aceptar.',
            ],
          },
          {
            kind: 'note',
            text: 'Cambiar de efectivo a tarjeta no es «evadir» nada. La ley eligió gravar únicamente cierta forma de pago; usar otra forma es simplemente quedar fuera del supuesto del impuesto. No hay nada que ocultar, nada que declarar y nada que justificar por hacerlo.',
          },
        ],
      },
      {
        icon: 'shield',
        title: '¿Enviar remesas afecta mi estatus migratorio?',
        subtitle: 'Mitos y realidades que circulan por WhatsApp',
        blocks: [
          {
            kind: 'text',
            text: 'En las semanas siguientes a la entrada en vigor de la regla circularon mensajes, videos y «avisos» que mezclaban el impuesto con temas migratorios que no tienen relación entre sí. Vale la pena separarlos uno por uno, porque el miedo mal informado suele costar más caro que el impuesto mismo.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Mito: enviar remesas lo pone en una lista',
                desc: 'Mandar dinero a su familia es una operación financiera legal. No es un delito, no es una falta migratoria y no crea por sí sola un expediente en su contra.',
              },
              {
                title: 'Mito: pagar el impuesto lo «registra» ante inmigración',
                desc: 'El impuesto es un cobro fiscal que aplica el negocio de envíos al momento de la operación. Pagarlo no es un trámite migratorio ni una declaración de estatus.',
              },
              {
                title: 'Mito: un indocumentado no puede abrir cuenta',
                desc: 'Muchas instituciones abren cuentas con pasaporte o matrícula consular y un ITIN, sin número de seguro social. No es un truco: es una práctica reconocida y común.',
              },
              {
                title: 'Realidad: la regla no distingue por estatus',
                desc: 'Un ciudadano que manda efectivo paga el 1%. Una persona indocumentada que manda desde su cuenta no lo paga. Lo que decide es la forma de pago, nada más.',
              },
            ],
          },
          {
            kind: 'warning',
            text: 'Sí hay algo real que cuidar, y no es el impuesto: es <strong>a quién le entrega su dinero y sus datos</strong>. Todo envío exige identificación e información personal. Use únicamente negocios establecidos y con licencia, y nunca acepte que un conocido «le haga el favor» de mandar el dinero desde su propia cuenta. Ese arreglo lo deja sin comprobante y sin forma de reclamar si el dinero no llega.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'Su familiar en México recibe exactamente lo mismo',
        subtitle: 'Lo paga quien envía, no quien cobra',
        blocks: [
          {
            kind: 'text',
            text: 'Una de las preguntas que más se repite es si a la familia allá le van a descontar algo al cobrar. La respuesta es no. <strong>El impuesto lo paga quien envía, en Estados Unidos, en el momento del envío.</strong> Quien recibe cobra la cantidad que se le mandó, en las condiciones del servicio que se haya usado.',
          },
          {
            kind: 'list',
            items: [
              'El 1% se aplica <strong>en el punto de envío</strong>, no en el punto de cobro.',
              'Su familiar <strong>no tiene que declarar nada</strong> ante autoridades estadounidenses por recibir el dinero.',
              'Lo que sí puede cambiar el monto que reciben son las <strong>comisiones y el tipo de cambio</strong> del servicio: eso existía antes del impuesto y sigue existiendo.',
              'Si a su familiar le dijeron que «hay que pagar un impuesto nuevo para liberar el dinero», eso <strong>no es este impuesto</strong> y casi con seguridad es un fraude.',
            ],
          },
          {
            kind: 'note',
            text: 'Dígaselo a su familia con estas palabras: «no te van a cobrar nada por recibirlo». Buena parte del pánico de estos meses nació de llamadas telefónicas en las que ninguna de las dos partes tenía el dato completo.',
          },
        ],
      },
      {
        icon: 'globe',
        title: 'La alternativa FINABIEN y el programa de reembolso',
        subtitle: 'La respuesta desde México',
        blocks: [
          {
            kind: 'text',
            text: 'Del lado mexicano hubo una respuesta institucional. El gobierno de México impulsó el uso de <strong>FINABIEN</strong>, la Financiera para el Bienestar, que ofrece envío de dinero con una <strong>comisión reducida</strong> frente a los operadores comerciales, y anunció además un <strong>programa de reembolso</strong> pensado para compensar a los paisanos por el efecto del impuesto.',
          },
          {
            kind: 'text',
            text: 'No es la única alternativa ni es obligatoria: es una opción más para comparar. Lo importante es que la decisión la tome usted con números en la mano.',
          },
          {
            kind: 'list',
            items: [
              'Compare <strong>comisión</strong>, <strong>tipo de cambio</strong> e <strong>impuesto</strong> juntos: los tres determinan cuánto llega de verdad.',
              'Pregunte por los <strong>puntos de pago</strong> disponibles cerca de donde vive su familia. De poco sirve una comisión baja si tienen que viajar dos horas para cobrar.',
              'Confirme <strong>qué identificación</strong> le piden a usted aquí y a su familiar allá antes de mandar la primera vez.',
              'Guarde su <strong>comprobante</strong> de envío hasta que le confirmen que el dinero ya se cobró.',
            ],
          },
          {
            kind: 'note',
            text: 'Las condiciones de cualquier programa oficial —comisiones, requisitos y vigencia del reembolso— pueden cambiar sin mucho aviso. Confirme los términos actuales en fuentes oficiales o en su consulado antes de basar una decisión en ellos.',
          },
        ],
      },
      {
        icon: 'lock',
        title: 'Bancarizarse siendo indocumentado: ITIN y matrícula consular',
        subtitle: 'El paso que le quita el impuesto de forma permanente',
        blocks: [
          {
            kind: 'text',
            text: 'Si usted lleva años cobrando en efectivo y mandando en efectivo, el consejo de «abra una cuenta» puede sonar lejano o hasta riesgoso. Conviene decirlo con claridad: <strong>no se necesita número de seguro social ni un estatus migratorio determinado para abrir una cuenta</strong> en muchas instituciones financieras de Estados Unidos.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Reúna una identificación válida.</strong> El pasaporte vigente de su país o la matrícula consular emitida por su consulado suelen ser aceptados.',
              '<strong>Tramite su ITIN si no lo tiene.</strong> Es el número de identificación fiscal que emite el IRS mediante el formulario W-7, pensado justamente para personas que no califican para un número de seguro social.',
              '<strong>Lleve un comprobante de domicilio</strong>: un recibo de luz, un contrato de renta o un estado de cuenta a su nombre.',
              '<strong>Pregunte antes de ir.</strong> No todas las sucursales manejan estos casos igual. Llame primero y pregunte también en las cooperativas de crédito de su zona, que suelen ser más flexibles y más económicas.',
              '<strong>Empiece sencillo.</strong> Una cuenta de cheques con tarjeta de débito basta para dejar de pagar el 1% y para no tener el dinero guardado en casa.',
            ],
          },
          {
            kind: 'text',
            text: 'Hay un beneficio adicional que casi nadie menciona. En varios trámites migratorios se valora poder demostrar años de vida estable en el país y el cumplimiento de las obligaciones fiscales. Un ITIN, declaraciones en regla y una cuenta con historial ayudan a construir ese expediente el día que se necesite.',
          },
          {
            kind: 'note',
            text: 'Tener ITIN y cuenta bancaria no le otorga estatus migratorio, pero tampoco se lo quita ni lo pone en riesgo. Le da algo muy concreto: comprobantes, historial y una forma de mover su dinero que no depende de cargar efectivo.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Cuidado con los «gestores» que cobran por evitar el impuesto',
        subtitle: 'El fraude que ya está circulando',
        blocks: [
          {
            kind: 'text',
            text: 'Cada regla nueva trae consigo su propia industria de estafadores, y esta no fue la excepción. Ya circulan «gestores», supuestos notarios y asesores que ofrecen, por una cuota, inscribirlo en un registro para quedar exento del impuesto, conseguirle una «clave» para no pagarlo o recuperar lo que ya pagó. Nada de eso existe.',
          },
          {
            kind: 'list',
            items: [
              'Le ofrecen <strong>inscribirlo en una lista o registro</strong> para quedar exento del 1%. No existe tal registro.',
              'Le cobran por <strong>«tramitar»</strong> algo que usted puede hacer directamente, como el ITIN, que se solicita ante el IRS con el formulario W-7.',
              'Le piden que <strong>les mande el dinero a su cuenta personal</strong> para «reenviarlo sin impuesto».',
              'Se presentan como <strong>«notario»</strong> y dan consejo legal. En Estados Unidos un notary public no es abogado y no puede asesorarle en materia migratoria.',
              'Le piden <strong>pago en efectivo sin recibo</strong> o le prometen resultados garantizados.',
            ],
          },
          {
            kind: 'warning',
            text: 'Si alguien le cobró por «quitarle» el impuesto, no le vendió un servicio: le quitó su dinero. Y si además le pidió documentos originales o sus datos bancarios, el problema puede ser mayor que unos dólares. Guarde todo lo que tenga —recibos, mensajes, nombres— y busque orientación con un abogado o con su consulado.',
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Cuánto es exactamente y sobre qué se calcula?',
          a: 'Es el 1% del monto que usted envía, no de la comisión. Se aplica al momento del envío, además de lo que el negocio ya le cobre por el servicio. Pida siempre el desglose para ver cada concepto por separado antes de confirmar la operación.',
        },
        {
          q: 'Yo siempre mando en efectivo desde la tienda de la esquina. ¿Qué hago?',
          a: 'Ese es exactamente el caso gravado. La solución más rápida es pagar ese mismo envío con una tarjeta de débito o mandarlo desde una cuenta. Si todavía no tiene cuenta, abrirla es el paso que le quita el impuesto de forma permanente.',
        },
        {
          q: '¿Me pueden negar una cuenta de banco por ser indocumentado?',
          a: 'Cada institución tiene sus propias políticas, pero no existe una prohibición general. Muchas abren cuentas con pasaporte o matrícula consular y un ITIN. Si en un lugar le dicen que no, pregunte en otro, en especial en cooperativas de crédito de su comunidad.',
        },
        {
          q: '¿Mi familia en México va a recibir menos dinero?',
          a: 'Por el impuesto no, porque lo paga quien envía. Lo que sí afecta lo que reciben son la comisión y el tipo de cambio del servicio que use. Comparar esos dos factores suele mover más dinero al final del mes que el 1% del impuesto.',
        },
        {
          q: '¿Mandar dinero seguido me puede perjudicar en un trámite migratorio?',
          a: 'Enviar dinero a la familia es legal y por sí solo no perjudica ningún trámite. Lo recomendable es que sus ingresos y sus envíos sean consistentes con lo que usted declara. Por eso ayuda tener cuenta, comprobantes y declaraciones de impuestos en orden.',
        },
        {
          q: '¿Esta regla puede cambiar?',
          a: 'Sí. Es una regla reciente y su aplicación práctica se sigue ajustando, igual que los programas de apoyo del lado mexicano. Antes de tomar una decisión importante con base en ella, confirme cómo está la regla en ese momento con una fuente confiable.',
        },
      ],
    },
    conclusion: {
      title: 'El dinero que manda no lo hace vulnerable; la desinformación sí',
      text: 'Muchas de las familias que pagaron este impuesto en los primeros meses de 2026 no lo pagaron porque la ley las obligara, sino porque nadie les explicó que bastaba con cambiar la forma de pago. Un 1% suena a poco hasta que se multiplica por doce meses y por varios años. Ese dinero es de usted y de su familia, y la ley no se lo está pidiendo.',
      advice: 'Si alguien le está cobrando por «arreglar» este impuesto, o si tiene dudas sobre cómo abrir una cuenta con ITIN o matrícula consular, pregunte antes de pagar. En nuestras oficinas de Houston podemos orientarle sobre su situación y sobre qué documentos le sirven.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'Ley presupuestaria federal de 2025 — sección 4475, impuesto sobre transferencias de remesas',
        'Internal Revenue Service (IRS) — Formulario W-7, solicitud de Número de Identificación Personal del Contribuyente (ITIN)',
        'Consumer Financial Protection Bureau — Regla de transferencias internacionales de dinero (Remittance Transfer Rule)',
        'Programa de Identificación del Cliente de las instituciones financieras — documentos de identidad aceptados para abrir cuenta',
        'Gobierno de México — Financiera para el Bienestar (FINABIEN), servicio de envío de remesas',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: '1% Remittance Tax: How to Legally Avoid It',
    metaDesc:
      'The 1% remittance tax only applies to cash-funded transfers. Sending from a bank account, debit, credit or a digital app is exempt. Facts versus myths.',
    title: 'The 1% Remittance Tax: Who Actually Pays It and How to Send Money Without It',
    displayDate: 'Aug 06, 2026',
    readTime: '16 min',
    categoryLabel: 'Immigration Process',
    lastUpdated: 'August 6, 2026',
    summary: {
      title: 'Initial Summary',
      text: 'Since January 1, 2026, the United States has had a federal <strong>1% tax on certain remittances</strong> sent abroad, and ever since there has been far more fear circulating than information. The detail almost no headline explained is the one that matters most to you: the tax <strong>only applies to transfers funded with cash, a money order, or a cashier’s check</strong>. If the money leaves a bank account, a debit or credit card, or a digital app, <strong>nothing is charged</strong>. The rule looks at the form of payment, not at the person: it applies regardless of the sender’s immigration status, and <strong>the person receiving the money in Mexico pays nothing</strong>. Here we separate fact from fiction and walk you through how to keep sending your money without that extra 1%.',
    },
    intro: [
      'Few things explain a migrant family better than the money sent home every payday. It is not a transfer: it is the rent on the house you grew up in, your mother’s medicine, a nephew’s school fees. So when a federal tax on certain remittances took effect in January 2026, the news did not land in the community as a tax matter: it landed as a direct hit to the family.',
      'The tax is real. It comes from the budget law passed in 2025, in its <strong>section 4475</strong>, and it took effect on <strong>January 1, 2026</strong>. It imposes <strong>1%</strong> on the amount of certain money transfers leaving the United States for another country, and it is charged at the moment of sending, at the same counter or platform where you make the transaction.',
      'What almost no headline explained — and it is exactly what you need to know — is that the tax <strong>does not apply to every transfer</strong>. It depends entirely on how you fund it. This article explains that difference calmly, takes apart the myths circulating in the community, and shows you step by step how to keep sending money home without paying that extra 1%.',
    ],
    sections: [
      {
        icon: 'dollar',
        title: 'What the tax actually is and when it started',
        subtitle: 'Where the rule comes from',
        blocks: [
          {
            kind: 'text',
            text: 'Its technical name is the excise tax on remittance transfers. It is a <strong>federal</strong> tax of <strong>1% on the amount sent</strong>, applied to money transfers leaving the United States for another country. It does not replace or remove the fees the money transfer business already charged you: it is added on top. That is why many people first noticed it as «they charged me more than before» rather than as a new tax.',
          },
          {
            kind: 'list',
            items: [
              '<strong>When it started.</strong> It applies to transfers made on or after January 1, 2026. Transfers made before that date are not covered by this rule.',
              '<strong>How much it is.</strong> One percent of the amount you send. It is not a percentage of the fee: it is on the amount transferred.',
              '<strong>Who collects it.</strong> The business processing the transfer applies it at the time of the transaction. You do not file any extra form or complete any separate paperwork.',
              '<strong>Who it applies to.</strong> To the sender, regardless of immigration status. Citizens, residents, people with work permits, and undocumented people all stand in the same position under this rule.',
            ],
          },
          {
            kind: 'text',
            text: 'That last point creates confusion in both directions. Some people believe the tax was created «to punish the undocumented,» and others believe that «since I am a citizen, it does not touch me.» Neither is accurate: <strong>the rule looks at the form of payment, not at the person</strong>.',
          },
          {
            kind: 'note',
            text: 'This is a new rule and it is still settling: collection criteria, exceptions, and how each business applies it can change. Before making a decision based on this article, <strong>verify the current status of the rule</strong> and ask directly where you send your money.',
          },
        ],
      },
      {
        icon: 'wallet',
        title: 'What almost no headline explained: it only taxes cash',
        subtitle: 'The fine print that changes everything',
        blocks: [
          {
            kind: 'text',
            text: 'Here is the part that changes a family’s budget and got lost among alarming headlines: the tax <strong>only applies to transfers funded with cash or cash equivalents</strong>. Specifically, three forms of payment: cash, money orders, and cashier’s checks.',
          },
          {
            kind: 'text',
            text: 'Everything else falls outside it. If the money comes out of a bank account, a debit card, a credit card, or a digital app linked to an account, <strong>the 1% is not charged</strong>. This is not a loophole or a clever workaround: it is how the law was written.',
          },
          {
            kind: 'table',
            headers: ['How you pay for the transfer', 'Is the 1% charged?'],
            rows: [
              ['Cash at the counter', 'Yes'],
              ['Money order', 'Yes'],
              ['Cashier’s check', 'Yes'],
              ['Transfer from your bank account', 'No'],
              ['Debit card', 'No'],
              ['Credit card', 'No'],
              ['Digital app linked to an account or card', 'No'],
            ],
          },
          {
            kind: 'note',
            text: 'Notice what this means in practice: the same transfer, to the same person, for the same amount, at the same business, can cost 1% more or 1% less depending on whether you pay with the bills in your pocket or with the debit card tied to your account.',
          },
        ],
      },
      {
        icon: 'swap',
        title: 'Legal ways not to pay it',
        subtitle: 'It all comes down to how you fund the transfer',
        blocks: [
          {
            kind: 'text',
            text: 'No special paperwork is required, no «fixer,» and no complicated arrangement. The only decision that matters is <strong>how you fund the transfer</strong>. These are the legal routes, from the simplest to the one that takes a preliminary step.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Pay for the transfer with your debit card</strong> instead of cash. If you already have an account, you can make this change today and nothing else is needed.',
              '<strong>Send directly from your bank account</strong>, through the bank app or at a branch. Many banks and credit unions have their own transfer service to Mexico and Central America.',
              '<strong>Use a digital transfer app linked to your account or card.</strong> Before confirming, review the on-screen breakdown and check that no 1% charge appears.',
              '<strong>If you do not have an account yet, open one.</strong> This is the step that pays off most: beyond taking you outside the tax, it gives you a safe place for your money and a record of what you earn and what you send.',
              '<strong>Compare the total cost, not just the tax.</strong> A service with no tax but a high fee or a poor exchange rate can end up costing more than one with the tax. Always ask for the full breakdown before you accept.',
            ],
          },
          {
            kind: 'note',
            text: 'Switching from cash to a card is not «evading» anything. The law chose to tax only one form of payment; using a different one simply means the tax does not apply. There is nothing to hide, nothing to report, and nothing to justify.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'Does sending remittances affect my immigration status?',
        subtitle: 'Myths and facts making the rounds on WhatsApp',
        blocks: [
          {
            kind: 'text',
            text: 'In the weeks after the rule took effect, messages, videos, and «alerts» circulated that mixed the tax with immigration issues that have nothing to do with it. It is worth separating them one by one, because badly informed fear usually costs more than the tax itself.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Myth: sending remittances puts you on a list',
                desc: 'Sending money to your family is a lawful financial transaction. It is not a crime, it is not an immigration violation, and on its own it does not create a file against you.',
              },
              {
                title: 'Myth: paying the tax «registers» you with immigration',
                desc: 'The tax is a charge the transfer business applies at the time of the transaction. Paying it is not an immigration filing and it is not a declaration of status.',
              },
              {
                title: 'Myth: undocumented people cannot open a bank account',
                desc: 'Many institutions open accounts with a passport or consular ID plus an ITIN, with no Social Security number. This is not a trick: it is a recognized, common practice.',
              },
              {
                title: 'Fact: the rule does not distinguish by status',
                desc: 'A citizen sending cash pays the 1%. An undocumented person sending from an account does not. What decides it is the form of payment, nothing else.',
              },
            ],
          },
          {
            kind: 'warning',
            text: 'There is something real to watch out for, and it is not the tax: it is <strong>who you hand your money and your data to</strong>. Every transfer requires identification and personal information. Use only established, licensed businesses, and never let an acquaintance «do you the favor» of sending the money from their own account. That arrangement leaves you with no receipt and no way to claim if the money never arrives.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'Your family in Mexico receives exactly the same',
        subtitle: 'The sender pays, not the recipient',
        blocks: [
          {
            kind: 'text',
            text: 'One of the most repeated questions is whether something will be deducted from the family back home when they pick up the money. The answer is no. <strong>The tax is paid by the sender, in the United States, at the moment of sending.</strong> The recipient collects the amount that was sent, under the terms of whatever service was used.',
          },
          {
            kind: 'list',
            items: [
              'The 1% is applied <strong>at the sending point</strong>, not at the pickup point.',
              'Your relative <strong>does not have to report anything</strong> to U.S. authorities for receiving the money.',
              'What can change the amount they receive are the <strong>fees and the exchange rate</strong> of the service: that existed before the tax and still does.',
              'If your relative was told that «a new tax must be paid to release the money,» that <strong>is not this tax</strong> and it is almost certainly a scam.',
            ],
          },
          {
            kind: 'note',
            text: 'Tell your family in these exact words: «nothing will be charged to you for receiving it.» Much of the panic of these months was born in phone calls where neither side had the full picture.',
          },
        ],
      },
      {
        icon: 'globe',
        title: 'The FINABIEN alternative and the reimbursement program',
        subtitle: 'The response from Mexico',
        blocks: [
          {
            kind: 'text',
            text: 'On the Mexican side there was an institutional response. The government of Mexico promoted the use of <strong>FINABIEN</strong>, the Financiera para el Bienestar, which offers money transfers with a <strong>reduced fee</strong> compared to commercial operators, and it also announced a <strong>reimbursement program</strong> designed to offset the effect of the tax for Mexicans abroad.',
          },
          {
            kind: 'text',
            text: 'It is neither the only alternative nor mandatory: it is one more option to compare. What matters is that you make the decision with the numbers in front of you.',
          },
          {
            kind: 'list',
            items: [
              'Compare <strong>fee</strong>, <strong>exchange rate</strong>, and <strong>tax</strong> together: all three decide how much actually arrives.',
              'Ask about the <strong>pickup locations</strong> available near where your family lives. A low fee helps little if they have to travel two hours to collect.',
              'Confirm <strong>what identification</strong> is required from you here and from your relative there before sending the first time.',
              'Keep your <strong>transfer receipt</strong> until they confirm the money has been picked up.',
            ],
          },
          {
            kind: 'note',
            text: 'The terms of any official program — fees, requirements, and how long the reimbursement lasts — can change without much notice. Confirm current terms with official sources or your consulate before basing a decision on them.',
          },
        ],
      },
      {
        icon: 'lock',
        title: 'Banking while undocumented: ITIN and consular ID',
        subtitle: 'The step that removes the tax permanently',
        blocks: [
          {
            kind: 'text',
            text: 'If you have spent years getting paid in cash and sending cash, the advice to «open an account» can sound distant or even risky. It is worth saying plainly: <strong>you do not need a Social Security number or a particular immigration status to open an account</strong> at many financial institutions in the United States.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Gather valid identification.</strong> A current passport from your country, or the consular ID card issued by your consulate, are commonly accepted.',
              '<strong>Apply for an ITIN if you do not have one.</strong> It is the taxpayer identification number issued by the IRS through Form W-7, created precisely for people who do not qualify for a Social Security number.',
              '<strong>Bring proof of address</strong>: a utility bill, a lease, or a statement in your name.',
              '<strong>Ask before you go.</strong> Not every branch handles these cases the same way. Call first, and also ask at credit unions in your area, which tend to be more flexible and less expensive.',
              '<strong>Start simple.</strong> A checking account with a debit card is enough to stop paying the 1% and to stop keeping cash at home.',
            ],
          },
          {
            kind: 'text',
            text: 'There is an added benefit almost nobody mentions. Several immigration processes give weight to being able to show years of stable life in the country and compliance with tax obligations. An ITIN, tax returns in order, and an account with a history help build that record the day you need it.',
          },
          {
            kind: 'note',
            text: 'Having an ITIN and a bank account does not grant you immigration status, but it does not take it away or put you at risk either. What it gives you is concrete: records, history, and a way to move your money that does not depend on carrying cash.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Beware of «fixers» charging to avoid the tax',
        subtitle: 'The fraud already circulating',
        blocks: [
          {
            kind: 'text',
            text: 'Every new rule brings its own industry of scammers, and this one was no exception. There are already «fixers,» self-described notarios, and advisers offering, for a fee, to enroll you in a registry so you are exempt from the tax, to get you a «code» so you do not pay it, or to recover what you already paid. None of that exists.',
          },
          {
            kind: 'list',
            items: [
              'They offer to <strong>enroll you in a list or registry</strong> to be exempt from the 1%. No such registry exists.',
              'They charge you to <strong>«process»</strong> something you can do yourself, like the ITIN, which is requested from the IRS with Form W-7.',
              'They ask you to <strong>send the money to their personal account</strong> so they can «forward it without the tax.»',
              'They present themselves as a <strong>«notario»</strong> and give legal advice. In the United States a notary public is not an attorney and cannot advise you on immigration matters.',
              'They ask for <strong>cash payment with no receipt</strong> or promise guaranteed results.',
            ],
          },
          {
            kind: 'warning',
            text: 'If someone charged you to «remove» the tax, they did not sell you a service: they took your money. And if they also asked for original documents or your banking information, the problem may be bigger than a few dollars. Keep everything you have — receipts, messages, names — and seek guidance from an attorney or your consulate.',
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'How much is it exactly, and what is it calculated on?',
          a: 'It is 1% of the amount you send, not of the fee. It is applied at the time of sending, on top of whatever the business already charges for the service. Always ask for the breakdown so you can see each item separately before confirming the transaction.',
        },
        {
          q: 'I always send cash from the store on the corner. What should I do?',
          a: 'That is exactly the taxed scenario. The quickest fix is to pay for that same transfer with a debit card or to send it from an account. If you do not have an account yet, opening one is the step that removes the tax permanently.',
        },
        {
          q: 'Can a bank refuse me an account because I am undocumented?',
          a: 'Each institution has its own policies, but there is no general prohibition. Many open accounts with a passport or consular ID plus an ITIN. If one place says no, ask at another, especially at credit unions serving your community.',
        },
        {
          q: 'Will my family in Mexico receive less money?',
          a: 'Not because of the tax, since the sender pays it. What does affect what they receive are the fee and the exchange rate of the service you use. Comparing those two factors usually moves more money by the end of the month than the 1% does.',
        },
        {
          q: 'Can sending money often hurt me in an immigration process?',
          a: 'Sending money to your family is lawful and on its own does not hurt any process. What is advisable is that your income and your transfers be consistent with what you report. That is why having an account, receipts, and tax returns in order helps.',
        },
        {
          q: 'Can this rule change?',
          a: 'Yes. It is a recent rule and its practical application is still being adjusted, as are the support programs on the Mexican side. Before making an important decision based on it, confirm where the rule stands at that moment with a reliable source.',
        },
      ],
    },
    conclusion: {
      title: 'The money you send does not make you vulnerable; misinformation does',
      text: 'Many of the families who paid this tax in the first months of 2026 did not pay it because the law required it, but because nobody explained that changing the form of payment was enough. One percent sounds small until you multiply it by twelve months and several years. That money belongs to you and your family, and the law is not asking for it.',
      advice: 'If someone is charging you to «fix» this tax, or if you have questions about opening an account with an ITIN or a consular ID, ask before you pay. At our Houston offices we can orient you about your situation and about which documents will serve you.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'Federal budget law of 2025 — section 4475, excise tax on remittance transfers',
        'Internal Revenue Service (IRS) — Form W-7, Application for IRS Individual Taxpayer Identification Number (ITIN)',
        'Consumer Financial Protection Bureau — Remittance Transfer Rule',
        'Financial institutions’ Customer Identification Program — identity documents accepted to open an account',
        'Government of Mexico — Financiera para el Bienestar (FINABIEN), money transfer service',
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
          ? 'Persona enviando dinero a su familia desde una ventanilla de remesas'
          : 'Person sending money to family at a remittance counter'
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
