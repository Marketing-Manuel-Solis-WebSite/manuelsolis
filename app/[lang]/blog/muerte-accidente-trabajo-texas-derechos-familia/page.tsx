import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'muerte-accidente-trabajo-texas-derechos-familia';
const ISO_DATE = '2026-08-06';
// TODO(portada): sustituir cuando marketing entregue la imagen definitiva.
const IMAGE = '/og-default.jpg';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Muerte en el trabajo: derechos de la familia',
    metaDesc:
      'Si su familiar murió en un accidente de trabajo en Texas, la familia tiene derechos aunque no tengan papeles. Las dos rutas de reclamo y los plazos que corren.',
    title: 'Murió mi familiar en un accidente de trabajo en Texas: los derechos de la familia',
    displayDate: '06 Ago, 2026',
    readTime: '21 min',
    categoryLabel: 'Accidentes',
    summary: {
      title: 'Resumen inicial',
      text: 'Perder a alguien en un accidente de trabajo deja a la familia con un dolor enorme y, encima, con papeles y decisiones que nadie le explicó. Texas encabeza al país en muertes laborales, con la construcción y los trabajadores hispanos sobrerrepresentados. Lo que sigue es lo que la ley de Texas le reconoce a la familia: el <strong>estatus migratorio no le quita esos derechos</strong>, hay dos caminos muy distintos según el patrón tuviera o no seguro, la ley señala quién puede reclamar —aunque viva en México— y la evidencia empieza a desaparecer en días.',
    },
    intro: [
      'Sentimos mucho su pérdida. Si está leyendo esto, es probable que hayan pasado pocos días desde la llamada y que ya le estén pidiendo firmas y decisiones que nadie en la familia sabe cómo tomar.',
      'Este artículo no le vende nada. Existe porque vemos siempre el mismo patrón: la aseguradora del patrón se mueve el mismo día del accidente; la familia se mueve semanas después, cuando ya no hay video, no hay testigos localizables y ya se firmó algo que no se debió firmar.',
      'Aquí le explicamos qué derechos tiene la familia bajo la ley de Texas, quién puede reclamar, qué se puede recuperar y qué plazos corren. Hoy no tiene que decidir nada.',
    ],
    sections: [
      {
        icon: 'heart',
        title: 'Lo primero: hoy usted no tiene que decidir nada',
        subtitle: 'Antes de hablar de leyes',
        blocks: [
          {
            kind: 'text',
            text: 'En los primeros días la familia organiza un funeral y avisa a parientes en otro país. Nadie está en condiciones de evaluar un ofrecimiento de dinero ni de leer un documento en inglés lleno de términos legales, y eso es normal: nada de lo que la ley le reconoce se pierde por tomarse unos días. Lo que sí conviene es no cerrar puertas sin querer.',
          },
          {
            kind: 'list',
            items: [
              '<strong>No firme nada</strong> del patrón ni de una aseguradora, aunque le digan que es «solo para el trámite» o «para que salga el pago del funeral».',
              '<strong>No dé declaración grabada</strong> a ningún investigador ni ajustador; puede decir con educación que la familia hablará después.',
              '<strong>Guarde todo</strong>: recibos de pago, mensajes con supervisores, fotos, el nombre de la empresa y de la obra, y cualquier papel que le entreguen.',
              '<strong>Anote los teléfonos personales</strong> de los compañeros que estaban ahí ese día; los celulares, no los de la oficina.',
              '<strong>Conserve el teléfono</strong> de su familiar sin borrarlo ni reiniciarlo: ahí pueden estar los últimos mensajes con el supervisor.',
            ],
          },
          {
            kind: 'note',
            text: 'Si ya firmó algo, no se castigue y no lo esconda: enséñeselo a un abogado. Hay documentos que no tienen el efecto que la familia teme y otros que sí se pueden cuestionar.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'El estatus migratorio de la familia no le quita derechos',
        subtitle: 'El miedo que hace que nadie llame',
        blocks: [
          {
            kind: 'text',
            text: 'Es lo primero que muchas familias preguntan en voz baja: «¿y si no tenemos papeles?». La respuesta es clara: en Texas, los derechos que nacen de una muerte en el trabajo <strong>no dependen de la ciudadanía ni del estatus migratorio</strong>, ni del trabajador que falleció ni de los familiares que reclaman.',
          },
          {
            kind: 'list',
            items: [
              'Un trabajador <strong>indocumentado sigue siendo un trabajador</strong> para efectos de la responsabilidad del patrón por un lugar inseguro.',
              'Los familiares pueden reclamar aunque <strong>no vivan en Estados Unidos</strong> y nunca hayan pisado el país.',
              'Que le pagaran <strong>en efectivo o sin contrato</strong> no borra la relación de trabajo; hace más importante probarla con mensajes y testigos.',
              'La etiqueta de <strong>«contratista independiente»</strong> tampoco cierra el caso: se mira quién daba las órdenes, quién ponía la herramienta y quién fijaba el horario.',
            ],
          },
          {
            kind: 'warning',
            text: 'Si alguien de la empresa insinúa que «mejor no se metan en problemas» o menciona inmigración cuando la familia pregunta por el accidente, cuéntelo ese mismo día. Eso no es un consejo amable: es presión, y puede tener consecuencias legales para quien la ejerce.',
          },
        ],
      },
      {
        icon: 'swap',
        title: 'Dos caminos muy distintos, y la diferencia lo cambia todo',
        subtitle: 'Depende de si el patrón tenía seguro',
        blocks: [
          {
            kind: 'text',
            text: 'Texas es una rareza en el país: <strong>el seguro de compensación laboral es opcional</strong> para la mayoría de los patrones privados. Esa decisión, tomada mucho antes del accidente, determina por qué camino va el caso de su familia.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Patrón CON compensación laboral',
                desc: 'La familia puede reclamar beneficios por muerte: una parte del salario que su familiar aportaba, pagada a los beneficiarios legales, y un beneficio funerario sujeto a un tope legal. No hay que probar culpa, pero por regla general no se puede demandar al patrón por negligencia.',
              },
              {
                title: 'Patrón SIN seguro (non-subscriber)',
                desc: 'La familia puede demandarlo directamente por muerte injusta, y ese patrón <strong>pierde las defensas clásicas</strong>: no puede alegar que el trabajador se descuidó, que asumió el riesgo o que la culpa fue de un compañero.',
              },
              {
                title: 'Un tercero responsable',
                desc: 'Aunque el patrón directo tenga seguro, puede haber demanda contra quien creó el peligro: el contratista general, otro subcontratista, el dueño del terreno o el fabricante de una máquina.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Hay algo más que muchas familias desconocen: incluso cuando el patrón sí tenía compensación laboral, la ley de Texas permite que el cónyuge y los hijos reclamen <strong>daños ejemplares</strong> si la muerte fue causada por negligencia grave del patrón.',
          },
          {
            kind: 'note',
            text: 'Averiguar si la empresa tenía cobertura es de las primeras cosas que verifica un abogado, junto con quién más estaba en la obra ese día. Muchas veces el patrón directo es una empresa pequeña sin bienes y el caso real está contra quien la contrató.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'Quién puede reclamar según la ley de Texas',
        subtitle: 'La ley nombra a unos y deja fuera a otros',
        blocks: [
          {
            kind: 'text',
            text: 'La ley de muerte injusta de Texas —el <em>Wrongful Death Act</em>— no permite que reclame cualquier persona que quería al fallecido: señala tres grupos, y esa lista es cerrada.',
          },
          {
            kind: 'list',
            items: [
              '<strong>El cónyuge sobreviviente.</strong> Incluye el matrimonio informal, el <em>common-law marriage</em> de Texas: si vivían como esposos, se presentaban como esposos ante los demás y había acuerdo de estar casados, esa unión puede reconocerse aunque no exista acta.',
              '<strong>Los hijos.</strong> Biológicos y adoptados legalmente, mayores o menores de edad, de este matrimonio o de una relación anterior, vivan donde vivan.',
              '<strong>Los padres.</strong> Padre y madre, incluidos los adoptivos: los papás de un trabajador adulto sí pueden reclamar.',
            ],
          },
          {
            kind: 'text',
            text: 'Los <strong>hermanos no son beneficiarios</strong> bajo esta ley, por cercanos que fueran; tampoco los abuelos ni las parejas que no califican como cónyuge. No es una valoración del cariño: es cómo está redactada la ley. Existe además una acción complementaria, la <em>survival action</em>, que ejerce el patrimonio del fallecido por lo que él mismo sufrió antes de morir.',
          },
          {
            kind: 'note',
            text: 'Vivir en México, Guatemala, Honduras o El Salvador no descalifica a nadie. Una madre en su pueblo o hijos que su familiar mantenía desde acá pueden ser beneficiarios; hará falta documentar el parentesco con actas, apostillas y traducciones.',
          },
        ],
      },
      {
        icon: 'dollar',
        title: 'Qué se puede recuperar',
        subtitle: 'Mucho más que el funeral',
        blocks: [
          {
            kind: 'text',
            text: 'Una de las cosas que más sorprende es descubrir cuánto queda fuera cuando se acepta un cheque rápido «para los gastos». Un caso bien llevado no repara la pérdida, pero sí reconoce daños que la primera oferta casi nunca incluye.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'El apoyo económico que ya no llegará',
                desc: 'Lo que su familiar habría ganado y aportado durante el resto de su vida laboral, incluidas prestaciones y su capacidad de ganar más con el tiempo.',
              },
              {
                title: 'Gastos funerarios y médicos',
                desc: 'Servicios funerarios, entierro o cremación y, cuando aplica, la repatriación del cuerpo. También la atención médica entre el accidente y el fallecimiento.',
              },
              {
                title: 'Pérdida de compañía y angustia mental',
                desc: 'La ley de Texas reconoce el valor del amor, el consejo, el consuelo y la compañía que se perdieron, y el sufrimiento emocional de los beneficiarios.',
              },
              {
                title: 'Lo que él sufrió antes de morir',
                desc: 'Por la survival action: el dolor físico y la angustia mental del trabajador entre el accidente y su muerte. También puede reclamarse la pérdida de herencia.',
              },
              {
                title: 'Daños punitivos por negligencia grave',
                desc: 'Cuando la conducta no fue un descuido sino indiferencia consciente ante un peligro extremo y conocido, la ley permite daños ejemplares para castigar y disuadir.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'La diferencia entre negligencia común y <strong>negligencia grave</strong> suele estar en lo que la empresa sabía. Un andamio mal armado por prisa es una cosa; una empresa a la que ya le habían señalado ese riesgo o que quitó una protección para ahorrar tiempo es otra muy distinta.',
          },
          {
            kind: 'note',
            text: 'Ningún abogado serio le puede decir por teléfono cuánto vale su caso. El valor depende de la edad y el ingreso del fallecido, de cuántos dependían de él, de la gravedad de la falta y de contra quién se litiga.',
          },
        ],
      },
      {
        icon: 'search',
        title: 'La evidencia desaparece en días, no en meses',
        subtitle: 'Por qué las primeras semanas deciden el caso',
        blocks: [
          {
            kind: 'text',
            text: 'El día del accidente, mientras la familia recibe la peor noticia de su vida, del otro lado ya se está trabajando: la aseguradora manda investigadores y la obra vuelve a operar. No es maldad, es su rutina; el problema es que esa rutina cambia el escenario.',
          },
          {
            kind: 'list',
            items: [
              'Las <strong>cámaras</strong> de la obra o de la bodega suelen sobrescribirse solas en días o pocas semanas.',
              'La <strong>máquina o el equipo</strong> que falló se repara, se devuelve al arrendador o se manda a chatarra.',
              'Los <strong>testigos</strong> se van a otra obra, cambian de número o son despedidos, y después nadie los encuentra.',
              'Las <strong>bitácoras</strong>, listas de asistencia y registros de mantenimiento se archivan o se pierden.',
            ],
          },
          {
            kind: 'text',
            text: 'Cuando hay una muerte en el trabajo, el patrón está obligado por ley federal a reportarla a OSHA de inmediato y suele abrirse una inspección. Ese expediente es útil, pero OSHA busca infracciones de seguridad: no construye el caso civil de la familia.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Escriba lo que le contaron</strong> en las primeras horas, con nombres y hora aproximada.',
              '<strong>Reúna los teléfonos personales</strong> de los compañeros y de quien haya llamado a la familia.',
              '<strong>No devuelva</strong> herramientas, casco, arnés ni el teléfono de su familiar sin consultarlo.',
              '<strong>Hable con un abogado pronto</strong>, aunque todavía no haya decidido si quiere demandar.',
            ],
          },
          {
            kind: 'note',
            text: 'Un abogado puede enviar una carta formal exigiendo que se conserven videos, registros y equipo; destruir esa prueba después tiene consecuencias serias dentro del juicio. Pero la carta solo sirve si sale a tiempo, y aquí «a tiempo» significa días.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'No firme con la aseguradora del patrón',
        subtitle: 'Por qué la primera oferta siempre es baja',
        blocks: [
          {
            kind: 'text',
            text: 'A veces la oferta llega muy rápido, incluso antes del funeral, y envuelta en amabilidad: alguien de la empresa que habla español y ofrece cubrir el servicio funerario. Esa persona puede ser sincera; la aseguradora que está detrás no está de su lado. Su trabajo es cerrar el asunto por la cantidad más baja y lo más pronto posible.',
          },
          {
            kind: 'list',
            items: [
              'Piden una <strong>declaración grabada</strong> «para agilizar» y después usan frases sueltas fuera de contexto.',
              'Ofrecen pagar el funeral <strong>a cambio de una firma</strong> que libera de responsabilidad a la empresa para siempre.',
              'Presentan el documento como un <strong>trámite administrativo</strong> y no como lo que es: un acuerdo definitivo.',
              'Aprovechan que <strong>no hay traducción</strong> y que la familia está aturdida por el duelo.',
              'Sugieren que <strong>un abogado solo va a retrasar</strong> el pago, o insinúan que el trabajador tuvo la culpa.',
            ],
          },
          {
            kind: 'text',
            text: 'La primera oferta es baja por definición: se hace antes de saber cuánto aportaba el trabajador y qué falló realmente en la obra. Una vez firmada una liberación de responsabilidad no hay vuelta atrás.',
          },
          {
            kind: 'warning',
            text: 'Nunca firme un documento en inglés que no le hayan traducido íntegro y por escrito, y nunca acepte una cifra el mismo día en que se la ofrecen. Pida una copia, dé las gracias y consulte.',
          },
        ],
      },
      {
        icon: 'globe',
        title: 'Si la familia está en México o Centroamérica',
        subtitle: 'Vivir fuera no le quita el derecho',
        blocks: [
          {
            kind: 'text',
            text: 'Muchos de estos casos tienen a la viuda, a los hijos o a los padres en otro país. Eso complica la logística, no el derecho: un caso de muerte laboral se puede llevar con la familia entera fuera de Estados Unidos.',
          },
          {
            kind: 'list',
            items: [
              'La comunicación se lleva por <strong>teléfono, video y mensajería</strong>, en español, con una persona de contacto designada por la familia.',
              'Los <strong>poderes y firmas</strong> se otorgan ante notario en el país de residencia y, cuando hace falta, se apostillan.',
              'Hay que reunir <strong>actas de nacimiento, matrimonio y defunción</strong>, con traducción certificada al inglés.',
              'El <strong>consulado</strong> suele orientar sobre repatriación del cuerpo y documentos.',
              'La <strong>repatriación</strong> es un gasto que puede formar parte de lo reclamado: guarde los comprobantes.',
            ],
          },
          {
            kind: 'note',
            text: 'Cuando hay beneficiarios en varios países y de varias relaciones, la parte más delicada no es demandar: es ordenar quién es quién y evitar que la familia termine peleando entre sí. Ese trabajo se hace mejor al principio que al final, frente a un cheque.',
          },
        ],
      },
      {
        icon: 'clock',
        title: 'Los plazos: cuándo se cierra la puerta',
        subtitle: 'Dos años, y a veces mucho menos',
        blocks: [
          {
            kind: 'text',
            text: 'En Texas, la regla general para las demandas por lesiones personales y por muerte injusta es de <strong>dos años</strong>, contados normalmente desde la fecha del fallecimiento. Suena a mucho y no lo es: para cuando la familia se recupera lo suficiente para pensar en esto ya pasaron meses, y un caso serio requiere investigación, peritos y documentos que tardan.',
          },
          {
            kind: 'list',
            items: [
              'El plazo de <strong>dos años</strong> es una puerta que se cierra: presentada la demanda un día tarde, el caso se pierde por clara que fuera la negligencia.',
              'Los <strong>hijos menores</strong> pueden tener reglas distintas de cómputo, pero nadie debería apostar el caso de una familia a esa excepción.',
              'Si el responsable es una <strong>entidad pública</strong> —una ciudad, un condado, una agencia estatal— suele exigirse un aviso formal en plazos mucho más cortos.',
              'La reclamación de <strong>beneficios por muerte</strong> ante el sistema de compensación laboral tiene su propio procedimiento y sus propios plazos.',
            ],
          },
          {
            kind: 'warning',
            text: 'No espere a que termine la investigación de OSHA, ni a que la aseguradora «le diga algo», ni a sentirse con fuerzas: esos tiempos no detienen el reloj legal. Una consulta temprana no la obliga a nada y evita que el reloj decida por usted.',
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: 'Nunca nos casamos por la ley, pero vivimos juntos veinte años. ¿Puedo reclamar?',
          a: 'Es muy posible. Texas reconoce el matrimonio informal cuando la pareja acordó estar casada, vivió junta como esposos y se presentó como matrimonio ante los demás. Se prueba con testimonios, declaraciones de impuestos, cuentas conjuntas y cómo los conocía la comunidad.',
        },
        {
          q: 'Mi hijo era indocumentado. ¿La empresa puede usar eso para no pagar?',
          a: 'El estatus migratorio no elimina la responsabilidad del patrón por un lugar de trabajo inseguro ni borra el derecho de la familia a reclamar. La defensa a veces usa el tema para presionar, y por eso importa tener a alguien que sepa responder.',
        },
        {
          q: 'La empresa nos ofreció pagar el funeral. ¿Lo aceptamos?',
          a: 'Aceptar ayuda para el funeral no es lo mismo que firmar una liberación de responsabilidad, pero muchas veces vienen en el mismo papel. Pida copia del documento completo y no lo firme sin que alguien de confianza se lo lea en español.',
        },
        {
          q: 'Vivimos en México. ¿Tenemos que viajar a Texas?',
          a: 'Por lo general no. La mayor parte del trabajo se hace a distancia, con poderes notariados y comunicación en español. Si hiciera falta una comparecencia, se planea con tiempo y se buscan alternativas remotas.',
        },
        {
          q: 'Nos dijeron que la empresa sí tiene seguro y que eso es todo. ¿Es cierto?',
          a: 'No necesariamente. Aun con seguro puede haber demanda contra un tercero que causó el accidente, y en casos de negligencia grave del patrón la ley permite reclamar daños ejemplares. Vale la pena que alguien revise los hechos.',
        },
        {
          q: '¿Cuánto cobra un abogado por un caso así?',
          a: 'La evaluación es gratuita y se trabaja por honorarios de contingencia: la familia no paga nada por adelantado y el despacho solo cobra si se obtiene una recuperación. Pida que le expliquen el acuerdo por escrito y en español.',
        },
      ],
    },
    conclusion: {
      title: 'Su familiar no era un número en una estadística',
      text: 'Texas encabeza el país en muertes en el trabajo, y detrás de cada cifra hay una casa donde alguien ya no llega. La mayoría no fueron accidentes inevitables: fueron riesgos conocidos que a alguien le pareció más barato no corregir. La familia no puede cambiar lo que pasó, pero sí exigir que se investigue de verdad y que quienes dependían de esa persona no queden desamparados.',
      advice: 'Hablar con un abogado no la obliga a demandar. La evaluación de su caso es gratuita, se hace en español y no se cobra nada si no se gana.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'Texas Civil Practice and Remedies Code, Capítulo 71 — Wrongful Death Act y survival action',
        'Texas Labor Code — beneficios por muerte y patrones non-subscriber',
        'Texas Department of Insurance, División de Compensación de Trabajadores — beneficios por muerte y funerarios',
        'OSHA — obligación del patrón de reportar muertes en el trabajo',
        'Bureau of Labor Statistics — Census of Fatal Occupational Injuries',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'Workplace Death in Texas: Family Rights',
    metaDesc:
      'If your relative died in a workplace accident in Texas, the family has rights even without papers. The two claim routes and the deadlines already running.',
    title: 'My Relative Died in a Workplace Accident in Texas: The Family’s Rights',
    displayDate: 'Aug 06, 2026',
    readTime: '21 min',
    categoryLabel: 'Accidents',
    summary: {
      title: 'Initial Summary',
      text: 'Losing someone in a workplace accident leaves a family with enormous grief and, on top of it, paperwork and decisions nobody explained. Texas leads the country in workplace deaths, with construction work and Hispanic workers overrepresented. What follows is what Texas law recognizes for the family: <strong>immigration status does not take those rights away</strong>, there are two very different paths depending on whether the employer had insurance, the law names who may claim —even relatives living in Mexico— and the evidence starts disappearing within days.',
    },
    intro: [
      'We are very sorry for your loss. If you are reading this, it has probably been only days since the phone call, and someone is already asking you for signatures and decisions nobody in the family knows how to make.',
      'This article is not selling you anything. It exists because we see the same pattern over and over: the employer’s insurance company moves on the day of the accident; the family moves weeks later, when there is no video left, no witnesses anyone can find, and something has already been signed that should never have been signed.',
      'Here we explain what rights the family has under Texas law, who may claim, what can be recovered, and what deadlines are running. You do not have to decide anything today.',
    ],
    sections: [
      {
        icon: 'heart',
        title: 'First: you do not have to decide anything today',
        subtitle: 'Before we talk about the law',
        blocks: [
          {
            kind: 'text',
            text: 'In the first days the family is arranging a funeral and calling relatives in another country. Nobody is in any condition to evaluate a money offer or read an English document full of legal terms, and that is normal: nothing the law recognizes for you is lost by taking a few days. What does matter is not closing doors by accident.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Do not sign anything</strong> from the employer or an insurance company, even if you are told it is «just for the paperwork» or «so the funeral payment can go through».',
              '<strong>Do not give a recorded statement</strong> to any investigator or adjuster; you can politely say the family will speak later.',
              '<strong>Keep everything</strong>: pay stubs, messages with supervisors, photos, the name of the company and the jobsite, and any paper handed to you.',
              '<strong>Write down the personal phone numbers</strong> of the coworkers who were there that day; cell phones, not office lines.',
              '<strong>Keep your relative’s phone</strong> without erasing or resetting it: the last messages with the supervisor may be in there.',
            ],
          },
          {
            kind: 'note',
            text: 'If you already signed something, do not blame yourself and do not hide it: show it to an attorney. Some documents do not have the effect families fear, and others can be challenged.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'The family’s immigration status does not take rights away',
        subtitle: 'The fear that keeps people from calling',
        blocks: [
          {
            kind: 'text',
            text: 'It is the first thing many families ask, quietly: «what if we do not have papers?». The answer is clear: in Texas, the rights that arise from a death at work <strong>do not depend on citizenship or immigration status</strong>, not the worker who died and not the relatives who claim.',
          },
          {
            kind: 'list',
            items: [
              'An <strong>undocumented worker is still a worker</strong> for purposes of an employer’s responsibility for an unsafe workplace.',
              'Relatives can claim even if they <strong>do not live in the United States</strong> and have never set foot in the country.',
              'Being paid <strong>in cash or without a contract</strong> does not erase the employment relationship; it makes it more important to prove it with messages and witnesses.',
              'The <strong>«independent contractor»</strong> label does not close the case either: what counts is who gave the orders, who supplied the tools and who set the hours.',
            ],
          },
          {
            kind: 'warning',
            text: 'If someone from the company hints that the family «should not go looking for trouble», or mentions immigration when you ask about the accident, report it the same day. That is not friendly advice: it is pressure, and it can carry legal consequences for the person applying it.',
          },
        ],
      },
      {
        icon: 'swap',
        title: 'Two very different paths, and the difference changes everything',
        subtitle: 'It depends on whether the employer had insurance',
        blocks: [
          {
            kind: 'text',
            text: 'Texas is unusual in this country: <strong>workers’ compensation insurance is optional</strong> for most private employers. That decision, made long before the accident, determines which path your family’s case takes.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Employer WITH workers’ comp',
                desc: 'The family can claim death benefits: a portion of the wages your relative contributed, paid to the legal beneficiaries, plus a burial benefit subject to a statutory cap. No one has to prove fault, but as a general rule the employer cannot be sued for negligence.',
              },
              {
                title: 'Employer WITHOUT insurance (non-subscriber)',
                desc: 'The family can sue directly for wrongful death, and that employer <strong>loses the classic defenses</strong>: it cannot argue the worker was careless, assumed the risk, or that a coworker was to blame.',
              },
              {
                title: 'A responsible third party',
                desc: 'Even when the direct employer is insured, there may be a claim against whoever created the danger: the general contractor, another subcontractor, the property owner or the maker of a machine.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'There is something else many families do not know: even when the employer did carry workers’ compensation, Texas law allows the surviving spouse and children to seek <strong>exemplary damages</strong> if the death was caused by the employer’s gross negligence.',
          },
          {
            kind: 'note',
            text: 'Finding out whether the company had coverage is one of the first things an attorney verifies, along with who else was on that jobsite that day. Very often the direct employer is a small company with no assets and the real case lies against whoever hired it.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'Who can claim under Texas law',
        subtitle: 'The law names some and leaves others out',
        blocks: [
          {
            kind: 'text',
            text: 'The Texas Wrongful Death Act does not let just anyone who loved the deceased bring a claim: it names three groups, and that list is closed.',
          },
          {
            kind: 'list',
            items: [
              '<strong>The surviving spouse.</strong> This includes informal marriage, what Texas calls <em>common-law marriage</em>: if you lived as spouses, held yourselves out to others as married, and agreed to be married, that union can be recognized even without a certificate.',
              '<strong>The children.</strong> Biological and legally adopted, minors or adults, from this marriage or from an earlier relationship, wherever they live.',
              '<strong>The parents.</strong> Mother and father, including adoptive parents: the parents of an adult worker can indeed bring a claim.',
            ],
          },
          {
            kind: 'text',
            text: '<strong>Siblings are not beneficiaries</strong> under this statute, however close they were; neither are grandparents or partners who do not qualify as a spouse. It is not a measure of love: it is how the statute is written. There is also a complementary claim, the <em>survival action</em>, brought by the deceased’s estate for what he himself suffered before dying.',
          },
          {
            kind: 'note',
            text: 'Living in Mexico, Guatemala, Honduras or El Salvador disqualifies no one. A mother back home, or children your relative supported from here, can be beneficiaries; what will be needed is documenting the relationship with certificates, apostilles and translations.',
          },
        ],
      },
      {
        icon: 'dollar',
        title: 'What can be recovered',
        subtitle: 'Far more than the funeral',
        blocks: [
          {
            kind: 'text',
            text: 'One of the things that most surprises families is discovering how much is left out when a quick check «for expenses» is accepted. A well-handled case does not repair the loss, but it does recognize harm the first offer almost never includes.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'The financial support that will never arrive',
                desc: 'What your relative would have earned and contributed across the rest of his working life, including benefits and his capacity to earn more over time.',
              },
              {
                title: 'Funeral and medical expenses',
                desc: 'Funeral services, burial or cremation and, where it applies, repatriation of the body. Also the medical care between the accident and the death.',
              },
              {
                title: 'Loss of companionship and mental anguish',
                desc: 'Texas law recognizes the value of the love, counsel, comfort and companionship that were lost, and the beneficiaries’ emotional suffering.',
              },
              {
                title: 'What he suffered before dying',
                desc: 'Through the survival action: the worker’s physical pain and mental anguish between the accident and his death. Loss of inheritance can also be claimed.',
              },
              {
                title: 'Punitive damages for gross negligence',
                desc: 'When the conduct was not carelessness but conscious indifference to an extreme and known danger, the law allows exemplary damages to punish and deter.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'The difference between ordinary negligence and <strong>gross negligence</strong> usually lies in what the company knew. Scaffolding assembled badly in a rush is one thing; a company already warned about that hazard, or that removed a guard to save time, is something else entirely.',
          },
          {
            kind: 'note',
            text: 'No serious attorney can tell you over the phone what your case is worth. Value depends on the age and income of the person who died, how many depended on him, how serious the wrongdoing was, and who the defendant is.',
          },
        ],
      },
      {
        icon: 'search',
        title: 'Evidence disappears in days, not months',
        subtitle: 'Why the first weeks decide the case',
        blocks: [
          {
            kind: 'text',
            text: 'On the day of the accident, while the family receives the worst news of their lives, the other side is already working: the insurer sends investigators and the jobsite goes back into operation. It is not malice, it is their routine; the problem is that the routine changes the scene.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Cameras</strong> at the jobsite or warehouse usually overwrite themselves within days or a few weeks.',
              'The <strong>machine or equipment</strong> that failed gets repaired, returned to the rental company, or scrapped.',
              '<strong>Witnesses</strong> move to another job, change numbers or are let go, and afterward nobody can find them.',
              '<strong>Logs</strong>, sign-in sheets and maintenance records get archived or lost.',
            ],
          },
          {
            kind: 'text',
            text: 'When there is a death at work, federal law requires the employer to report it to OSHA right away and an inspection usually follows. That file is useful, but OSHA looks for safety violations: it does not build the family’s civil case.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Write down what you were told</strong> in the first hours, with names and approximate times.',
              '<strong>Collect personal phone numbers</strong> for coworkers and for whoever called the family.',
              '<strong>Do not return</strong> tools, hard hat, harness or your relative’s phone without asking first.',
              '<strong>Talk to an attorney soon</strong>, even if you have not decided whether you want to sue.',
            ],
          },
          {
            kind: 'note',
            text: 'An attorney can send a formal letter demanding that video, records and equipment be preserved; destroying that evidence afterward carries serious consequences inside the lawsuit. But the letter only works if it goes out in time, and here «in time» means days.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Do not sign with the employer’s insurance company',
        subtitle: 'Why the first offer is always low',
        blocks: [
          {
            kind: 'text',
            text: 'Sometimes the offer comes very fast, even before the funeral, and wrapped in kindness: someone from the company who speaks Spanish and offers to cover the funeral service. That person may be sincere; the insurance company behind them is not on your side. Its job is to close the matter for the lowest possible amount, as soon as possible.',
          },
          {
            kind: 'list',
            items: [
              'They ask for a <strong>recorded statement</strong> «to speed things up», then use isolated phrases out of context.',
              'They offer to pay for the funeral <strong>in exchange for a signature</strong> that releases the company from liability forever.',
              'They present the document as <strong>administrative paperwork</strong> rather than what it is: a final agreement.',
              'They take advantage of the fact that <strong>there is no translation</strong> and the family is numb with grief.',
              'They suggest that <strong>a lawyer will only delay</strong> payment, or imply the worker was at fault.',
            ],
          },
          {
            kind: 'text',
            text: 'The first offer is low by definition: it is made before anyone knows how much the worker contributed and what actually failed on that job. Once a release of liability is signed, there is no going back.',
          },
          {
            kind: 'warning',
            text: 'Never sign an English document that has not been translated for you in full and in writing, and never accept a figure the same day it is offered. Ask for a copy, say thank you, and get advice.',
          },
        ],
      },
      {
        icon: 'globe',
        title: 'If the family is in Mexico or Central America',
        subtitle: 'Living abroad does not remove the right',
        blocks: [
          {
            kind: 'text',
            text: 'Many of these cases involve a widow, children or parents in another country. That complicates logistics, not rights: a workplace death case can be handled with the entire family outside the United States.',
          },
          {
            kind: 'list',
            items: [
              'Communication runs by <strong>phone, video and messaging</strong>, in Spanish, with one contact person named by the family.',
              '<strong>Powers of attorney and signatures</strong> are executed before a notary in the country of residence and, when needed, apostilled.',
              'You will need to gather <strong>birth, marriage and death certificates</strong>, with certified English translations.',
              'The <strong>consulate</strong> usually gives guidance on repatriation of the body and documents.',
              '<strong>Repatriation</strong> is an expense that may form part of the claim: keep the receipts.',
            ],
          },
          {
            kind: 'note',
            text: 'When there are beneficiaries in several countries and from several relationships, the delicate part is not filing suit: it is sorting out who is who and keeping the family from turning on itself. That work goes far better at the beginning than at the end, in front of a check.',
          },
        ],
      },
      {
        icon: 'clock',
        title: 'Deadlines: when the door closes',
        subtitle: 'Two years, and sometimes far less',
        blocks: [
          {
            kind: 'text',
            text: 'In Texas, the general rule for personal injury and wrongful death lawsuits is <strong>two years</strong>, normally counted from the date of death. That sounds like a lot and it is not: by the time a family has recovered enough to think about this, months have gone by, and a serious case requires investigation, experts and documents that take time.',
          },
          {
            kind: 'list',
            items: [
              'The <strong>two-year</strong> deadline is a door that closes: filed one day late, the case is lost no matter how clear the negligence was.',
              '<strong>Minor children</strong> may have different rules for how the clock runs, but no one should gamble a family’s case on that exception.',
              'If the responsible party is a <strong>public entity</strong> — a city, a county, a state agency — formal notice is usually required within far shorter periods.',
              'A claim for <strong>death benefits</strong> in the workers’ compensation system has its own procedure and its own deadlines.',
            ],
          },
          {
            kind: 'warning',
            text: 'Do not wait for the OSHA investigation to finish, or for the insurer to «get back to you», or to feel strong enough: none of those timelines stop the legal clock. An early consultation commits you to nothing and keeps the clock from deciding for you.',
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'We never married legally, but we lived together for twenty years. Can I claim?',
          a: 'Very possibly. Texas recognizes informal marriage when the couple agreed to be married, lived together as spouses, and presented themselves to others as married. It is proven with testimony, tax returns, joint accounts and how the community knew you.',
        },
        {
          q: 'My son was undocumented. Can the company use that to avoid paying?',
          a: 'Immigration status does not eliminate an employer’s responsibility for an unsafe workplace, nor does it erase the family’s right to claim. The defense sometimes uses the subject to apply pressure, which is why it matters to have someone who knows how to answer it.',
        },
        {
          q: 'The company offered to pay for the funeral. Should we accept?',
          a: 'Accepting help with the funeral is not the same as signing a release of liability, but the two often arrive on the same piece of paper. Ask for a copy of the complete document and do not sign it until someone you trust reads it to you in Spanish.',
        },
        {
          q: 'We live in Mexico. Do we have to travel to Texas?',
          a: 'Generally no. Most of the work is done remotely, with notarized powers of attorney and communication in Spanish. If an appearance becomes necessary, it is planned well in advance and remote options are explored.',
        },
        {
          q: 'We were told the company has insurance and that is all. Is that true?',
          a: 'Not necessarily. Even with insurance there may be a claim against a third party who caused the accident, and in cases of an employer’s gross negligence the law allows a claim for exemplary damages. It is worth having someone review the facts.',
        },
        {
          q: 'What does an attorney charge for a case like this?',
          a: 'The evaluation is free and the work is done on a contingency fee: the family pays nothing up front and the firm is paid only if there is a recovery. Ask to have the agreement explained to you in writing and in Spanish.',
        },
      ],
    },
    conclusion: {
      title: 'Your relative was not a number in a statistic',
      text: 'Texas leads the country in workplace deaths, and behind every figure is a home where someone no longer comes back. Most were not unavoidable accidents: they were known risks that somebody found cheaper not to fix. A family cannot change what happened, but it can demand a real investigation and insist that the people who depended on that person are not left with nothing.',
      advice: 'Talking to an attorney does not commit you to filing suit. The evaluation of your case is free, it is done in Spanish, and nothing is charged unless the case is won.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'Texas Civil Practice and Remedies Code, Chapter 71 — Wrongful Death Act and survival action',
        'Texas Labor Code — death benefits and non-subscriber employers',
        'Texas Department of Insurance, Division of Workers’ Compensation — death and burial benefit claims',
        'OSHA — employer duty to report workplace fatalities',
        'Bureau of Labor Statistics — Census of Fatal Occupational Injuries',
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
          ? 'Familia acompañada tras la muerte de un trabajador en un accidente laboral en Texas'
          : 'Family supported after a worker’s death in a Texas workplace accident'
      }
      isoDate={ISO_DATE}
      servicePath="/servicios/accidentes"
      trackerCategory="Accidentes"
    />
  );
}

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}
