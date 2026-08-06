import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'parole-humanitario-terminado-opciones-2026';
const ISO_DATE = '2026-08-06';
// TODO(portada): sustituir cuando marketing entregue la imagen definitiva.
const IMAGE = '/og-default.jpg';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Mi parole humanitario terminó: qué hacer',
    metaDesc:
      'Si su parole humanitario terminó o fue revocado, cada mes cuenta. Asilo, TPS, Visa U y ajuste familiar: las opciones reales y los plazos que corren en su contra.',
    title: 'Mi parole humanitario terminó: opciones legales antes de quedarte sin estatus',
    displayDate: '06 Ago, 2026',
    readTime: '11 min',
    categoryLabel: 'Visa Humanitaria',
    lastUpdated: '6 de agosto de 2026',
    summary: {
      title: 'Resumen inicial',
      text: 'Cuando un programa de parole termina, no desaparece solo el permiso de trabajo: desaparece el permiso para estar en el país. Desde ese día empieza a correr un reloj que casi nadie ve —el de la <strong>presencia ilegal</strong>— y que meses después puede convertirse en una barra de tres o diez años para volver a entrar legalmente. La otra mitad de la historia es la que menos se cuenta: <strong>que el parole termine no significa que usted se quedó sin opciones</strong>. El asilo, el TPS, las visas para víctimas y las peticiones familiares siguen sobre la mesa, y hay un punto técnico a su favor que mucha gente desconoce: quien entró con parole fue inspeccionado, y eso puede abrirle la puerta a ajustar su estatus dentro de Estados Unidos. Lo único que no perdona es el tiempo.',
    },
    intro: [
      'Durante 2025 y 2026, la terminación de programas de parole —el de cubanos, haitianos, nicaragüenses y venezolanos conocido como CHNV, y otros— dejó a cientos de miles de personas sin estatus y sin permiso de trabajo. Muchas se enteraron por una notificación de revocación que llegó al correo electrónico, acompañada de presión para salir del país.',
      'La reacción natural es una de dos: el pánico, que empuja a decisiones apresuradas como comprar un boleto de avión o pagarle a la primera persona que promete una solución; o la parálisis, que consiste en esperar a ver qué pasa mientras los meses se acumulan. Ninguna de las dos ayuda, y las dos suelen costar caro.',
      'Este artículo explica, en términos claros, qué significa legalmente que su parole terminó, qué reloj empezó a correr ese día, cuáles son las cuatro vías que con más frecuencia siguen abiertas y qué errores concretos cierran puertas que hoy todavía están abiertas.',
    ],
    sections: [
      {
        icon: 'file',
        title: 'Qué significa exactamente que su parole «terminó» o fue revocado',
        subtitle: 'El punto de partida',
        blocks: [
          {
            kind: 'text',
            text: 'Lo primero que conviene entender es que el parole <strong>nunca fue una visa ni un estatus migratorio</strong>. Es un permiso discrecional que permite a alguien entrar o permanecer temporalmente en Estados Unidos por razones humanitarias o de beneficio público. Como es discrecional, el gobierno puede otorgarlo y también puede retirarlo, y eso es precisamente lo que ocurrió con varios programas.',
          },
          {
            kind: 'text',
            text: 'Por eso, cuando el parole se acaba, la persona no baja a un estatus menor: <strong>vuelve a quedar sin permiso para estar en el país</strong>, aunque haya entrado por un aeropuerto, con inspección y con todos sus documentos en regla. Y esa diferencia entre cómo entró y cómo está hoy es la que define sus opciones.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Se venció el periodo otorgado',
                desc: 'El parole se concedió por un plazo determinado y ese plazo llegó a su fin sin renovación. No hace falta ninguna notificación: la fecha, por sí sola, termina el permiso.',
              },
              {
                title: 'Terminación anticipada',
                desc: 'El gobierno revocó el parole antes de la fecha, normalmente con un aviso escrito o electrónico. Guarde ese aviso completo: es documento clave para cualquier trámite posterior.',
              },
              {
                title: 'El permiso de trabajo cae con él',
                desc: 'El EAD que se obtuvo con base en el parole depende del parole. Cuando este termina, la autorización de empleo suele terminar también, aunque la tarjeta tenga impresa una fecha posterior.',
              },
              {
                title: 'No es una orden de deportación',
                desc: 'Perder el parole no equivale a tener una orden de remoción. Sí lo deja expuesto a detención y a que se inicie un proceso, pero una orden solo la emite un juez o un procedimiento formal.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'A ese golpe se sumó otro, esta vez económico. Las tarifas aprobadas con la ley de 2025 encarecieron los permisos de trabajo vinculados al parole y acortaron su duración, de modo que quien todavía puede renovar paga más y por menos tiempo:',
          },
          {
            kind: 'table',
            headers: ['Trámite', 'Costo', 'Validez máxima'],
            rows: [
              ['Permiso de trabajo inicial basado en parole (EAD)', '550 dólares', '1 año'],
              ['Renovación del permiso de trabajo', '275 dólares', '1 año'],
            ],
          },
          {
            kind: 'note',
            text: 'Este artículo describe el panorama al 6 de agosto de 2026. Las terminaciones de parole, sus plazos y los litigios que las rodean han cambiado varias veces y pueden volver a cambiar. Antes de tomar cualquier decisión, verifique con un abogado el estado vigente de su programa y de su caso concreto.',
          },
        ],
      },
      {
        icon: 'clock',
        title: 'El reloj que corre: presencia ilegal y las barras de 3 y 10 años',
        subtitle: 'Por qué cada mes cuenta',
        blocks: [
          {
            kind: 'text',
            text: 'Este es el punto que más gente descubre demasiado tarde. Desde el día en que el parole termina, la persona mayor de 18 años empieza a acumular lo que la ley llama <strong>presencia ilegal</strong>. No es una multa ni algo que se note de inmediato: es un contador silencioso que solo muestra sus efectos cuando la persona sale del país o pide un beneficio.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Más de 180 días y menos de un año',
                desc: 'Si acumula presencia ilegal en ese rango y después sale de Estados Unidos, se activa una prohibición de reingreso de <strong>tres años</strong>.',
              },
              {
                title: 'Un año o más',
                desc: 'Si acumula un año o más de presencia ilegal y después sale del país, la prohibición de reingreso es de <strong>diez años</strong>.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Fíjese en el detalle que lo cambia todo: en ambos casos, <strong>la barra se dispara con la salida</strong>. Mientras la persona permanece en el país, el contador corre pero la prohibición todavía no se materializa. Por eso la decisión de salir —incluso cuando parece la más obedente o la más segura— es una decisión legal seria que no debería tomarse sin haber consultado antes.',
          },
          {
            kind: 'text',
            text: 'Existen perdones para estas barras, como el perdón provisional que algunos familiares de ciudadanos y residentes tramitan antes de salir a la entrevista consular. Son remedios reales, pero no son automáticos, requieren demostrar un daño extremo a un familiar calificado y toman tiempo. Contar con ellos como plan sin haberlos evaluado es un error frecuente.',
          },
          {
            kind: 'warning',
            text: 'Si ya lleva varios meses sin estatus, comprar un boleto de avión puede ser la peor decisión posible: puede convertir una situación difícil en una prohibición de diez años. Hable con un abogado <strong>antes</strong> de reservar cualquier viaje, incluso a una emergencia familiar.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'Opción 1: asilo y el plazo de un año',
        subtitle: 'La vía más conocida y la peor entendida',
        blocks: [
          {
            kind: 'text',
            text: 'El asilo protege a quien no puede regresar a su país por temor a ser perseguido por su raza, religión, nacionalidad, opinión política o pertenencia a un determinado grupo social. Se puede pedir con independencia de cómo entró la persona y de si su estatus ya venció.',
          },
          {
            kind: 'text',
            text: 'La regla que más casos arruina es la del plazo: por ley, la solicitud debe presentarse <strong>dentro del primer año a partir de la última entrada</strong> a Estados Unidos. Si usted entró con parole hace más de un año, ese plazo ya pasó, y ahí es donde entran las excepciones.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Circunstancias cambiadas.</strong> Algo cambió en su país o en su situación personal que hace que hoy exista un temor que antes no existía o no era el mismo. La terminación de un programa y la pérdida de la protección que usted tenía pueden ser relevantes en ese análisis.',
              '<strong>Circunstancias extraordinarias.</strong> Razones que explican por qué no pudo presentar a tiempo: enfermedad grave, incapacidad legal, ser menor de edad sin acompañante, o la asesoría deficiente de alguien que se hizo pasar por experto.',
              '<strong>Plazo razonable.</strong> En ambos casos hay que presentar dentro de un tiempo razonable desde que surgió la circunstancia. Cuanto más se tarda, más difícil es sostener la excepción.',
            ],
          },
          {
            kind: 'text',
            text: 'Presentar asilo también abre la posibilidad de solicitar un permiso de trabajo después de que transcurra el periodo de espera que fija la ley, y detiene la acumulación de presencia ilegal mientras el caso está pendiente. Son dos beneficios prácticos enormes para quien perdió el EAD junto con el parole. Los requisitos, tarifas y tiempos de este trámite se han modificado en los últimos años, así que confirme lo vigente antes de enviar cualquier formulario.',
          },
          {
            kind: 'warning',
            text: 'Nunca presente una solicitud de asilo inventada o copiada de la de otra persona. Una solicitud que se determina fraudulenta puede dejarlo permanentemente inelegible para casi cualquier beneficio migratorio, incluso si años después usted califica para otra cosa por la vía honesta.',
          },
        ],
      },
      {
        icon: 'globe',
        title: 'Opción 2: TPS, si su país tiene una designación vigente',
        subtitle: 'Protección temporal, no permanente',
        blocks: [
          {
            kind: 'text',
            text: 'El Estatus de Protección Temporal es un beneficio que depende del país de origen, no de la historia individual. Cuando el gobierno designa a un país —por conflicto armado, desastre natural u otras condiciones extraordinarias—, sus nacionales que ya estaban en Estados Unidos pueden registrarse y obtener protección contra la remoción y autorización de trabajo mientras dure la designación.',
          },
          {
            kind: 'list',
            items: [
              'Ser <strong>nacional del país designado</strong> (o persona sin nacionalidad que residía habitualmente allí).',
              'Haber estado en Estados Unidos de forma <strong>continua desde las fechas exactas</strong> que fija la designación de su país; esas fechas no son negociables y cambian de un país a otro.',
              'Registrarse <strong>dentro del periodo de inscripción</strong> abierto, o cumplir los requisitos del registro tardío si aplica.',
              'No tener condenas ni antecedentes que la ley señala como impedimentos, y ser admisible o poder obtener el perdón correspondiente.',
            ],
          },
          {
            kind: 'text',
            text: 'Para muchas personas cuyo parole terminó, el TPS es la vía más rápida para recuperar un permiso de trabajo y dejar de acumular presencia ilegal. Pero conviene decirlo con claridad: el TPS <strong>no es una residencia ni un camino directo a ella</strong>. Es un paraguas mientras dura, y su función real es darle tiempo y estabilidad para construir el caso de fondo que sí puede llevar a algo permanente.',
          },
          {
            kind: 'note',
            text: 'Las designaciones de TPS se extienden, se reducen y se terminan con frecuencia, y varias han estado en litigio. Verifique hoy mismo si el país que le corresponde tiene designación vigente, cuáles son las fechas exactas de presencia continua y hasta cuándo está abierto el registro, porque esa información puede haber cambiado desde la última vez que preguntó.',
          },
        ],
      },
      {
        icon: 'heart',
        title: 'Opción 3: Visa U, Visa T o VAWA si usted fue víctima',
        subtitle: 'Cuando el daño sufrido abre una puerta',
        blocks: [
          {
            kind: 'text',
            text: 'Esta es la categoría que más gente descarta sin analizarla, casi siempre porque nadie le explicó que existía o porque supone que un delito ocurrido hace años ya no cuenta. Estas tres vías no exigen tener estatus vigente y fueron creadas precisamente para personas en situación vulnerable.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Visa U',
                desc: 'Para víctimas de ciertos delitos —violencia doméstica, agresión, delitos sexuales, secuestro, robo con violencia, entre otros— que sufrieron daño sustancial y colaboraron o están dispuestas a colaborar con la policía o la fiscalía. Requiere una certificación firmada por la autoridad.',
              },
              {
                title: 'Visa T',
                desc: 'Para víctimas de trata de personas: quien fue traído o retenido mediante fuerza, fraude o engaño para trabajar o para explotación sexual. Incluye casos laborales que la persona no identifica como trata porque «acordó» venir a trabajar.',
              },
              {
                title: 'VAWA',
                desc: 'Autopetición para cónyuges, hijos y padres maltratados por un ciudadano o residente permanente. Su gran ventaja es que se presenta <strong>sin que el agresor participe ni se entere</strong>, y no depende de que él quiera ayudar.',
              },
              {
                title: 'Denunciar no es requisito de todos',
                desc: 'La Visa U pide colaboración con las autoridades, pero VAWA no exige denuncia penal. Muchas personas creen que perdieron la oportunidad por no haber llamado a la policía, y no siempre es así.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Los tiempos de espera en estas categorías pueden ser largos, sobre todo en la Visa U. Mientras tanto, algunos solicitantes pueden obtener protección frente a la remoción y autorización de trabajo, dependiendo de la etapa del trámite y de las circunstancias del caso. Eso convierte a estas vías en una alternativa real —y no solo teórica— para quien se quedó sin nada al terminar su parole.',
          },
          {
            kind: 'note',
            text: 'Si en Estados Unidos usted fue víctima de un delito violento, de violencia dentro de su hogar, de explotación laboral con amenazas o de un patrón que lo retuvo con engaños, dígalo en la primera consulta aunque le parezca antiguo o poco importante. Ese dato cambia por completo la lista de opciones disponibles.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'Opción 4: petición familiar y ajuste de estatus, y por qué el parole cuenta',
        subtitle: 'El punto técnico que casi nadie explica',
        blocks: [
          {
            kind: 'text',
            text: 'Aquí está la ventaja escondida de haber entrado con parole. Para ajustar el estatus dentro del país —es decir, obtener la residencia sin salir a un consulado— la ley exige que la persona haya sido <strong>inspeccionada y admitida o puesta en libertad condicional bajo parole</strong>. Quien llegó por un puerto de entrada con parole cumple ese requisito de entrada; quien cruzó sin inspección, en principio, no.',
          },
          {
            kind: 'text',
            text: 'Esa diferencia es enorme en la práctica. Dos personas con la misma familia y el mismo tiempo en el país pueden tener caminos completamente distintos según cómo entraron, y muchas personas con parole terminado siguen conservando esa puerta abierta sin saberlo.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Familiares inmediatos de ciudadano estadounidense.</strong> Cónyuge, padre o madre de un ciudadano mayor de 21 años, e hijo soltero menor de 21. Es el grupo con más margen: la ley les perdona el haberse quedado más tiempo del autorizado a efectos del ajuste.',
              '<strong>Categorías de preferencia.</strong> Hijos mayores, hermanos de ciudadanos y familiares de residentes permanentes. Aquí hay espera de visa y, además, quedarse sin estatus o trabajar sin autorización puede impedir el ajuste dentro del país.',
              '<strong>Otras bases de petición.</strong> Ciertos empleadores y algunas categorías especiales también pueden servir de base, aunque suelen ser menos accesibles y más lentas.',
              '<strong>Excepciones antiguas y limitadas.</strong> Existe una regla que permite ajustar a personas beneficiarias de peticiones presentadas hace muchos años. Si un familiar hizo algún trámite por usted en el pasado remoto, menciónelo: a veces aparece una puerta que se daba por cerrada.',
            ],
          },
          {
            kind: 'warning',
            text: 'Haber entrado con parole no garantiza el ajuste. Siguen aplicando otros filtros: antecedentes penales, fraude o falsa declaración, órdenes de remoción previas, y en las categorías que no son de familiar inmediato, el trabajo sin autorización o el tiempo sin estatus. Un abogado debe revisar todo el historial antes de presentar cualquier cosa.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Lo que NO debe hacer en estos meses',
        subtitle: 'Los errores que cierran puertas',
        blocks: [
          {
            kind: 'text',
            text: 'La mayoría de los casos que llegan al despacho complicados no lo están por la ley, sino por decisiones tomadas con miedo y con prisa en las semanas siguientes a la mala noticia. Estos son los errores que más daño hacen:',
          },
          {
            kind: 'list',
            items: [
              '<strong>Pagarle a un notario o a un consultor.</strong> En Estados Unidos, un notary public no es abogado y no puede dar asesoría legal. Un formulario mal presentado no solo pierde el dinero: puede generar una negativa, una remisión a corte o una acusación de fraude que lo persigue durante años.',
              '<strong>Dejar pasar los plazos.</strong> El año de asilo, el periodo de registro del TPS, la fecha de una audiencia o el plazo para responder una notificación no se recuperan con explicaciones. Los plazos migratorios se cumplen o se pierden.',
              '<strong>Salir del país sin asesoría.</strong> Viajar, incluso por una emergencia familiar, puede activar la barra de tres o diez años y cancelar de golpe opciones que hoy tiene disponibles.',
              '<strong>Ignorar el aviso que recibió.</strong> Esa notificación de terminación o revocación es un documento legal, no un correo publicitario. Guárdela, imprímala y llévela a la consulta.',
              '<strong>No actualizar su dirección.</strong> Está obligado a informar sus cambios de domicilio a las autoridades migratorias en el plazo que marca la ley. Un aviso enviado a una dirección vieja se considera entregado, y así es como mucha gente pierde una audiencia sin enterarse.',
              '<strong>Confiar en lo que se dice en redes sociales.</strong> Los rumores sobre programas nuevos, amnistías y perdones automáticos circulan más rápido que las reglas reales, y suelen ser el anzuelo de quienes cobran por trámites que no existen.',
            ],
          },
          {
            kind: 'warning',
            text: 'Si ya tiene una cita o una audiencia en corte de inmigración, no falte por ningún motivo. La ausencia a una audiencia puede producir una <strong>orden de remoción en ausencia</strong>, dictada sin que usted esté presente y sin que se escuche su caso. Reabrirla después es posible en ciertos supuestos, pero es mucho más difícil que simplemente asistir.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'Arme su expediente hoy, no cuando tenga la cita',
        subtitle: 'Lo que puede hacer esta semana',
        blocks: [
          {
            kind: 'text',
            text: 'Las opciones que hemos descrito se evalúan con documentos, no con recuerdos. Llegar a la primera consulta con el expediente ordenado puede ahorrarle semanas y, en algunos casos, decidir si un trámite se presenta a tiempo o no.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Reúna sus documentos de entrada</strong>: pasaporte, registro de entrada I-94, el documento de parole y cualquier sello o constancia del puerto de entrada. Descargue e imprima su I-94 electrónico.',
              '<strong>Guarde el aviso de terminación o revocación</strong> completo, con la fecha en que lo recibió y el correo electrónico o sobre en que llegó.',
              '<strong>Localice su permiso de trabajo</strong>, su número de recibo y cualquier resolución de USCIS que haya recibido, aunque sea antigua.',
              '<strong>Documente su presencia continua</strong>: contratos de renta, recibos de servicios, estados de cuenta, registros médicos, cartas de la escuela de sus hijos y declaraciones de impuestos, ordenados por año.',
              '<strong>Junte los documentos familiares</strong>: actas de matrimonio, actas de nacimiento suyas y de sus hijos, y prueba de la ciudadanía o residencia de sus familiares en Estados Unidos.',
              '<strong>Recupere todo lo que documente un delito sufrido</strong>: reportes de policía, órdenes de protección, expedientes médicos o denuncias, si fue víctima de algo.',
              '<strong>Actualice su dirección</strong> ante las autoridades migratorias y guarde el comprobante del cambio.',
              '<strong>Escriba su cronología</strong> en una hoja: fecha de entrada, fecha de vencimiento del parole, empleos, viajes, arrestos si los hubo, y fechas de citas o audiencias.',
              '<strong>Consulte con un abogado de inmigración</strong> y lleve todo lo anterior, incluso lo que crea irrelevante.',
            ],
          },
          {
            kind: 'note',
            text: 'Haga copias digitales de todo y guárdelas en un lugar al que pueda acceder desde su teléfono, y comparta el acceso con alguien de su confianza. Si algún día lo detienen, esa carpeta puede ser la diferencia entre que su familia pueda actuar de inmediato o que pierda días buscando papeles.',
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: 'Mi parole ya terminó. ¿Me tengo que ir del país de inmediato?',
          a: 'Salir no es la única respuesta y muchas veces es la peor, porque la salida es lo que activa las barras de tres y diez años. Antes de decidir, hay que revisar si usted califica para asilo, TPS, alguna visa de víctima o una petición familiar. Esa revisión toma una consulta; deshacer una barra de diez años toma años.',
        },
        {
          q: 'Perdí mi permiso de trabajo. ¿Puedo seguir trabajando mientras arreglo mi situación?',
          a: 'Cuando el parole termina, la autorización de empleo que dependía de él normalmente termina también, aunque la tarjeta muestre una fecha posterior. Trabajar sin autorización tiene consecuencias que van más allá del empleo y pueden afectar un ajuste de estatus futuro. Consulte cuanto antes qué trámite puede devolverle un permiso válido.',
        },
        {
          q: 'Entré hace más de un año. ¿Ya no puedo pedir asilo?',
          a: 'El plazo general es de un año desde la última entrada, pero la ley reconoce excepciones por circunstancias cambiadas y por circunstancias extraordinarias. Perder la protección que usted tenía y los cambios en su país de origen pueden ser parte de ese análisis. No lo descarte sin que un abogado lo revise.',
        },
        {
          q: 'Entré con parole. ¿Eso cuenta como entrada legal para arreglar por mi esposo o esposa?',
          a: 'A efectos del ajuste de estatus, la ley exige haber sido inspeccionado y admitido o haber sido puesto en libertad condicional bajo parole, y quien llegó por un puerto de entrada con parole cumple ese requisito de entrada. No es una garantía por sí sola, porque siguen aplicando otros requisitos, pero es una ventaja real frente a quien entró sin inspección.',
        },
        {
          q: '¿El TPS me da la residencia?',
          a: 'No. El TPS protege de la remoción y permite trabajar mientras la designación del país esté vigente, pero no es un camino directo a la residencia permanente. Su valor está en darle estabilidad y tiempo para construir el caso de fondo que sí puede llevar a algo permanente.',
        },
        {
          q: 'Recibí un correo diciendo que debo salir del país. ¿Es una orden de deportación?',
          a: 'Una notificación de terminación de parole no es lo mismo que una orden de remoción dictada por un juez. Sí es un documento serio que cambia su situación legal y que debe llevar a su abogado tal como lo recibió. No responda ni actúe sobre ese correo sin que alguien con formación legal lo lea completo.',
        },
      ],
    },
    conclusion: {
      title: 'Perder el parole no es el final del camino, pero el tiempo sí importa',
      text: 'La terminación de estos programas dejó a muchísimas familias con la sensación de que ya no hay nada que hacer, y esa sensación es la que aprovechan quienes cobran por soluciones falsas. La realidad legal es más matizada: hay vías que siguen abiertas, hay un requisito de entrada que usted probablemente cumple y hay plazos que todavía puede alcanzar. Lo que no se puede recuperar son los meses que pasan mientras se espera a ver qué ocurre.',
      advice: 'Si su parole terminó o le llegó una notificación de revocación, no deje pasar otro mes: una revisión completa de su historial le dirá qué puertas siguen abiertas hoy y cuáles se cierran pronto.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'Ley de Inmigración y Nacionalidad (INA) § 212(d)(5) — parole por razones humanitarias urgentes o de beneficio público significativo',
        'INA § 245(a) — requisito de haber sido inspeccionado y admitido o puesto en libertad condicional (parole) para el ajuste de estatus',
        'INA § 212(a)(9)(B) — presencia ilegal y las prohibiciones de reingreso de tres y diez años',
        'USCIS — Estatus de Protección Temporal (TPS): países designados, fechas de presencia continua y periodos de registro',
        'USCIS — Formulario I-589 (asilo), Formulario I-918 (Visa U), Formulario I-914 (Visa T), Formulario I-360 (VAWA) e Formulario I-765 (autorización de empleo)',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'Humanitarian Parole Ended: Your Options',
    metaDesc:
      'If your humanitarian parole ended or was revoked, every month counts. Asylum, TPS, U visa and family adjustment: the real options and the deadlines against you.',
    title: 'My Humanitarian Parole Ended: Legal Options Before You Lose Status',
    displayDate: 'Aug 06, 2026',
    readTime: '11 min',
    categoryLabel: 'Humanitarian Relief',
    lastUpdated: 'August 6, 2026',
    summary: {
      title: 'Initial Summary',
      text: 'When a parole program ends, it is not only the work permit that disappears: permission to be in the country disappears with it. From that day a clock most people never see starts running —<strong>unlawful presence</strong>— and months later it can turn into a three- or ten-year bar on returning legally. The other half of the story is the one rarely told: <strong>parole ending does not mean you are out of options</strong>. Asylum, TPS, victim-based visas and family petitions are still on the table, and there is a technical point in your favor that many people do not know: someone who entered on parole was inspected, and that can open the door to adjusting status inside the United States. The one thing that does not forgive you is time.',
    },
    intro: [
      'Through 2025 and 2026, the termination of parole programs — the one for Cubans, Haitians, Nicaraguans and Venezuelans known as CHNV, and others — left hundreds of thousands of people without status and without work authorization. Many found out through a revocation notice that arrived by email, along with pressure to leave the country.',
      'The natural reaction is one of two things: panic, which pushes people into rushed decisions like buying a plane ticket or paying the first person who promises a fix; or paralysis, which means waiting to see what happens while the months pile up. Neither helps, and both tend to be expensive.',
      'This article explains, in plain terms, what it legally means that your parole ended, what clock started running that day, which four routes most often remain open, and which specific mistakes close doors that are still open today.',
    ],
    sections: [
      {
        icon: 'file',
        title: 'What it actually means that your parole “ended” or was revoked',
        subtitle: 'The starting point',
        blocks: [
          {
            kind: 'text',
            text: 'The first thing to understand is that parole <strong>was never a visa or an immigration status</strong>. It is a discretionary permission that lets someone enter or remain temporarily in the United States for humanitarian reasons or significant public benefit. Because it is discretionary, the government can grant it and can also take it back, and that is exactly what happened with several programs.',
          },
          {
            kind: 'text',
            text: 'So when parole ends, the person does not drop into some lesser status: they are <strong>left without permission to be in the country</strong>, even if they arrived through an airport, with inspection and with every document in order. That gap between how you entered and where you stand today is what defines your options.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'The granted period expired',
                desc: 'Parole was granted for a set period and that period ran out without renewal. No notice is required: the date alone ends the permission.',
              },
              {
                title: 'Early termination',
                desc: 'The government revoked parole before the end date, usually with a written or electronic notice. Keep that notice in full: it is a key document for anything you file later.',
              },
              {
                title: 'The work permit falls with it',
                desc: 'An EAD obtained on the basis of parole depends on that parole. When parole ends, employment authorization generally ends too, even if the card shows a later date.',
              },
              {
                title: 'It is not a deportation order',
                desc: 'Losing parole is not the same as having a removal order. It does expose you to detention and to proceedings being started, but only a judge or a formal process issues an order.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'A second blow was financial. The fees enacted with the 2025 law made parole-based work permits more expensive and shortened how long they last, so anyone who can still renew pays more and gets less time:',
          },
          {
            kind: 'table',
            headers: ['Filing', 'Cost', 'Maximum validity'],
            rows: [
              ['Initial parole-based work permit (EAD)', '$550', '1 year'],
              ['Work permit renewal', '$275', '1 year'],
            ],
          },
          {
            kind: 'note',
            text: 'This article describes the picture as of August 6, 2026. Parole terminations, their deadlines and the litigation around them have shifted several times and can shift again. Before making any decision, confirm with an attorney the current state of your program and of your specific case.',
          },
        ],
      },
      {
        icon: 'clock',
        title: 'The clock that is running: unlawful presence and the 3- and 10-year bars',
        subtitle: 'Why every month counts',
        blocks: [
          {
            kind: 'text',
            text: 'This is the point most people discover too late. From the day parole ends, a person over 18 begins accruing what the law calls <strong>unlawful presence</strong>. It is not a fine and nothing visible happens right away: it is a silent counter that only shows its effects when the person leaves the country or asks for a benefit.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'More than 180 days, less than a year',
                desc: 'If you accrue unlawful presence in that range and then leave the United States, a <strong>three-year</strong> bar on reentry is triggered.',
              },
              {
                title: 'One year or more',
                desc: 'If you accrue a year or more of unlawful presence and then leave the country, the bar on reentry is <strong>ten years</strong>.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Notice the detail that changes everything: in both cases, <strong>the bar is triggered by departure</strong>. While the person remains in the country, the counter runs but the bar has not yet taken effect. That is why the decision to leave — even when it looks like the most obedient or the safest choice — is a serious legal decision that should not be made without advice first.',
          },
          {
            kind: 'text',
            text: 'Waivers for these bars exist, such as the provisional waiver some relatives of citizens and permanent residents file before leaving for a consular interview. They are real remedies, but they are not automatic, they require proving extreme hardship to a qualifying relative, and they take time. Counting on one without having it evaluated is a common mistake.',
          },
          {
            kind: 'warning',
            text: 'If you have already gone several months without status, buying a plane ticket can be the worst possible decision: it can turn a hard situation into a ten-year bar. Talk to an attorney <strong>before</strong> booking any travel, including for a family emergency.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'Option 1: asylum and the one-year deadline',
        subtitle: 'The best known route and the worst understood',
        blocks: [
          {
            kind: 'text',
            text: 'Asylum protects someone who cannot return to their country because of fear of persecution on account of race, religion, nationality, political opinion or membership in a particular social group. It can be requested regardless of how the person entered and whether their status has already lapsed.',
          },
          {
            kind: 'text',
            text: 'The rule that ruins the most cases is the deadline: by law, the application must be filed <strong>within one year of the last entry</strong> into the United States. If you entered on parole more than a year ago, that deadline has passed, and that is where the exceptions come in.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Changed circumstances.</strong> Something changed in your country or in your personal situation so that a fear exists today that did not exist before, or is not the same. The termination of a program and the loss of the protection you had can be relevant to that analysis.',
              '<strong>Extraordinary circumstances.</strong> Reasons that explain why you could not file on time: serious illness, legal incapacity, being an unaccompanied minor, or bad advice from someone who posed as an expert.',
              '<strong>A reasonable period.</strong> In both cases you must file within a reasonable time after the circumstance arose. The longer you wait, the harder the exception is to sustain.',
            ],
          },
          {
            kind: 'text',
            text: 'Filing for asylum also opens the possibility of requesting a work permit once the waiting period set by law has passed, and it stops the accrual of unlawful presence while the case is pending. Those are two enormous practical benefits for someone who lost their EAD along with their parole. The requirements, fees and timelines for this filing have changed in recent years, so confirm what is current before sending any form.',
          },
          {
            kind: 'warning',
            text: 'Never file an invented asylum application or one copied from someone else’s. An application found to be frivolous can leave you permanently ineligible for nearly any immigration benefit, even if years later you would qualify for something else the honest way.',
          },
        ],
      },
      {
        icon: 'globe',
        title: 'Option 2: TPS, if your country has an active designation',
        subtitle: 'Temporary protection, not permanent',
        blocks: [
          {
            kind: 'text',
            text: 'Temporary Protected Status is a benefit that depends on the country of origin, not on individual history. When the government designates a country — because of armed conflict, natural disaster or other extraordinary conditions — its nationals already in the United States can register and obtain protection from removal and work authorization for as long as the designation lasts.',
          },
          {
            kind: 'list',
            items: [
              'Be a <strong>national of the designated country</strong> (or a stateless person who last habitually resided there).',
              'Have been in the United States <strong>continuously since the exact dates</strong> set by your country’s designation; those dates are not negotiable and differ from country to country.',
              'Register <strong>within the open registration period</strong>, or meet the requirements for late initial registration if it applies.',
              'Have no convictions or record that the law treats as a bar, and be admissible or able to obtain the corresponding waiver.',
            ],
          },
          {
            kind: 'text',
            text: 'For many people whose parole ended, TPS is the fastest way to recover a work permit and stop accruing unlawful presence. But it should be said plainly: TPS <strong>is not a green card and is not a direct path to one</strong>. It is an umbrella for as long as it lasts, and its real function is to give you time and stability to build the underlying case that can lead to something permanent.',
          },
          {
            kind: 'note',
            text: 'TPS designations are extended, shortened and terminated often, and several have been in litigation. Check today whether the country that applies to you has an active designation, what the exact continuous presence dates are, and how long registration stays open, because that information may have changed since the last time you asked.',
          },
        ],
      },
      {
        icon: 'heart',
        title: 'Option 3: U visa, T visa or VAWA if you were a victim',
        subtitle: 'When the harm you suffered opens a door',
        blocks: [
          {
            kind: 'text',
            text: 'This is the category most people rule out without analyzing it, almost always because nobody explained it existed or because they assume a crime from years ago no longer counts. These three routes do not require current status and were created precisely for people in vulnerable situations.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'U visa',
                desc: 'For victims of certain crimes — domestic violence, assault, sexual offenses, kidnapping, violent robbery, among others — who suffered substantial harm and helped, or are willing to help, police or prosecutors. It requires a certification signed by the authority.',
              },
              {
                title: 'T visa',
                desc: 'For victims of human trafficking: someone brought or held through force, fraud or deception for labor or sexual exploitation. It includes labor cases the person does not recognize as trafficking because they “agreed” to come and work.',
              },
              {
                title: 'VAWA',
                desc: 'A self-petition for spouses, children and parents abused by a citizen or lawful permanent resident. Its great advantage is that it is filed <strong>without the abuser taking part or being notified</strong>, and it does not depend on their willingness to help.',
              },
              {
                title: 'Reporting is not required for all',
                desc: 'The U visa asks for cooperation with authorities, but VAWA does not require a criminal complaint. Many people believe they lost the chance because they never called the police, and that is not always so.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Waiting times in these categories can be long, especially for the U visa. In the meantime, some applicants can obtain protection from removal and work authorization, depending on the stage of the filing and the circumstances of the case. That makes these routes a real alternative — not just a theoretical one — for someone left with nothing when their parole ended.',
          },
          {
            kind: 'note',
            text: 'If in the United States you were the victim of a violent crime, of violence inside your home, of labor exploitation with threats, or of an employer who held you through deception, say so at the first consultation even if it feels old or unimportant. That fact completely changes the list of available options.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'Option 4: family petition and adjustment, and why parole counts',
        subtitle: 'The technical point almost nobody explains',
        blocks: [
          {
            kind: 'text',
            text: 'Here is the hidden advantage of having entered on parole. To adjust status inside the country — that is, to obtain residency without leaving for a consulate — the law requires the person to have been <strong>inspected and admitted or paroled</strong>. Someone who arrived at a port of entry with parole meets that entry requirement; someone who crossed without inspection, as a rule, does not.',
          },
          {
            kind: 'text',
            text: 'That difference is enormous in practice. Two people with the same family and the same time in the country can face completely different paths depending on how they entered, and many people with terminated parole still hold that door open without knowing it.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Immediate relatives of a U.S. citizen.</strong> Spouse, parent of a citizen over 21, and unmarried child under 21. This is the group with the most room: the law forgives having overstayed for purposes of adjustment.',
              '<strong>Preference categories.</strong> Adult children, siblings of citizens, and relatives of permanent residents. Here there is a visa wait and, in addition, falling out of status or working without authorization can block adjustment inside the country.',
              '<strong>Other petition bases.</strong> Certain employers and some special categories can also serve as a basis, though they tend to be less accessible and slower.',
              '<strong>Old and narrow exceptions.</strong> There is a rule that allows adjustment for beneficiaries of petitions filed many years ago. If a relative filed something for you in the distant past, mention it: sometimes a door reappears that everyone assumed was closed.',
            ],
          },
          {
            kind: 'warning',
            text: 'Entering on parole does not guarantee adjustment. Other filters still apply: criminal history, fraud or misrepresentation, prior removal orders, and — in categories other than immediate relative — unauthorized work or time out of status. An attorney should review the whole history before anything is filed.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'What NOT to do during these months',
        subtitle: 'The mistakes that close doors',
        blocks: [
          {
            kind: 'text',
            text: 'Most cases that reach our office in bad shape are not complicated by the law, but by decisions made out of fear and haste in the weeks after the bad news. These are the mistakes that do the most damage:',
          },
          {
            kind: 'list',
            items: [
              '<strong>Paying a notario or a consultant.</strong> In the United States a notary public is not an attorney and cannot give legal advice. A badly prepared filing does not just waste the money: it can produce a denial, a referral to court, or a fraud accusation that follows you for years.',
              '<strong>Letting deadlines pass.</strong> The asylum year, the TPS registration period, a hearing date, or the deadline to respond to a notice cannot be recovered with explanations. Immigration deadlines are met or they are lost.',
              '<strong>Leaving the country without advice.</strong> Traveling, even for a family emergency, can trigger the three- or ten-year bar and wipe out options you have available today.',
              '<strong>Ignoring the notice you received.</strong> That termination or revocation notice is a legal document, not junk mail. Save it, print it and bring it to the consultation.',
              '<strong>Not updating your address.</strong> You are required to report address changes to immigration authorities within the period set by law. A notice sent to an old address counts as delivered, and that is how many people miss a hearing without knowing.',
              '<strong>Trusting what circulates on social media.</strong> Rumors about new programs, amnesties and automatic waivers travel faster than the real rules, and they are usually the hook used by people charging for filings that do not exist.',
            ],
          },
          {
            kind: 'warning',
            text: 'If you already have an appointment or a hearing in immigration court, do not miss it for any reason. Missing a hearing can produce an <strong>in absentia removal order</strong>, entered without you present and without your case being heard. Reopening one is possible in certain situations, but far harder than simply showing up.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'Build your file today, not when you get the appointment',
        subtitle: 'What you can do this week',
        blocks: [
          {
            kind: 'text',
            text: 'The options described here are evaluated with documents, not with memories. Arriving at the first consultation with an organized file can save you weeks and, in some cases, decide whether a filing goes in on time or not.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Gather your entry documents</strong>: passport, I-94 arrival record, the parole document, and any stamp or receipt from the port of entry. Download and print your electronic I-94.',
              '<strong>Keep the termination or revocation notice</strong> in full, with the date you received it and the email or envelope it came in.',
              '<strong>Find your work permit</strong>, your receipt number and any USCIS decision you have received, even old ones.',
              '<strong>Document your continuous presence</strong>: lease agreements, utility bills, bank statements, medical records, letters from your children’s school and tax returns, organized by year.',
              '<strong>Collect family documents</strong>: marriage certificate, your birth certificate and your children’s, and proof of citizenship or residency for your relatives in the United States.',
              '<strong>Recover anything documenting a crime you suffered</strong>: police reports, protective orders, medical records or complaints, if you were a victim of something.',
              '<strong>Update your address</strong> with immigration authorities and keep proof of the change.',
              '<strong>Write out your timeline</strong> on one page: entry date, parole expiration date, jobs, travel, arrests if any, and dates of appointments or hearings.',
              '<strong>Consult an immigration attorney</strong> and bring all of the above, including whatever you think is irrelevant.',
            ],
          },
          {
            kind: 'note',
            text: 'Make digital copies of everything and store them where you can reach them from your phone, and share access with someone you trust. If you are ever detained, that folder can be the difference between your family acting immediately and losing days hunting for paperwork.',
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'My parole already ended. Do I have to leave the country right away?',
          a: 'Leaving is not the only answer and is often the worst one, because departure is what triggers the three- and ten-year bars. Before deciding, someone has to check whether you qualify for asylum, TPS, a victim-based visa or a family petition. That review takes one consultation; undoing a ten-year bar takes years.',
        },
        {
          q: 'I lost my work permit. Can I keep working while I sort out my situation?',
          a: 'When parole ends, the employment authorization that depended on it normally ends too, even if the card shows a later date. Working without authorization has consequences beyond the job and can affect a future adjustment of status. Ask as soon as possible which filing could give you a valid permit again.',
        },
        {
          q: 'I entered more than a year ago. Can I still apply for asylum?',
          a: 'The general deadline is one year from the last entry, but the law recognizes exceptions for changed circumstances and extraordinary circumstances. Losing the protection you had and changes in your home country can be part of that analysis. Do not rule it out without having an attorney review it.',
        },
        {
          q: 'I entered on parole. Does that count as a lawful entry to adjust through my spouse?',
          a: 'For adjustment of status, the law requires having been inspected and admitted or paroled, and someone who arrived at a port of entry with parole meets that entry requirement. It is not a guarantee on its own, because other requirements still apply, but it is a real advantage over someone who entered without inspection.',
        },
        {
          q: 'Does TPS give me a green card?',
          a: 'No. TPS protects from removal and allows work while the country designation is in effect, but it is not a direct path to permanent residency. Its value is in giving you stability and time to build the underlying case that can lead to something permanent.',
        },
        {
          q: 'I got an email saying I must leave the country. Is that a deportation order?',
          a: 'A parole termination notice is not the same as a removal order entered by a judge. It is a serious document that changes your legal situation and that you should bring to your attorney exactly as you received it. Do not respond or act on that email without someone legally trained reading all of it.',
        },
      ],
    },
    conclusion: {
      title: 'Losing parole is not the end of the road, but time does matter',
      text: 'The termination of these programs left a great many families feeling there is nothing left to do, and that feeling is exactly what people selling fake solutions rely on. The legal reality is more nuanced: routes remain open, there is an entry requirement you probably meet, and there are deadlines you can still reach. What cannot be recovered are the months that pass while you wait to see what happens.',
      advice: 'If your parole ended or a revocation notice arrived, do not let another month go by: a full review of your history will tell you which doors are still open today and which close soon.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'Immigration and Nationality Act (INA) § 212(d)(5) — parole for urgent humanitarian reasons or significant public benefit',
        'INA § 245(a) — requirement of having been inspected and admitted or paroled in order to adjust status',
        'INA § 212(a)(9)(B) — unlawful presence and the three- and ten-year bars on reentry',
        'USCIS — Temporary Protected Status (TPS): designated countries, continuous presence dates and registration periods',
        'USCIS — Form I-589 (asylum), Form I-918 (U visa), Form I-914 (T visa), Form I-360 (VAWA) and Form I-765 (employment authorization)',
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
          ? 'Persona revisando una notificación de terminación de parole humanitario'
          : 'Person reviewing a humanitarian parole termination notice'
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
