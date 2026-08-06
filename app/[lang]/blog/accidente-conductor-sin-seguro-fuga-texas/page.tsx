import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'accidente-conductor-sin-seguro-fuga-texas';
const ISO_DATE = '2026-08-06';
const IMAGE = '/blog/covers/accidente-conductor-sin-seguro-fuga-texas.jpg';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Me chocó un conductor sin seguro en Texas',
    metaDesc:
      'Si el otro conductor no tenía seguro o se dio a la fuga en Texas, su propia póliza UM/UIM puede pagar. Cómo se cobra y qué errores lo arruinan todo.',
    title: 'Me chocó un conductor sin seguro o se dio a la fuga en Texas: cómo cobrar',
    displayDate: '06 Ago, 2026',
    readTime: '22 min',
    categoryLabel: 'Accidentes',
    summary: {
      title: 'Resumen inicial',
      text: 'Hay un choque peor que el choque: aquel en el que el responsable se va, o se queda pero no tiene con qué responder. En Texas eso pasa todos los días, y la reacción natural —«entonces no hay nada que hacer»— casi siempre es falsa. En la mayoría de estos casos <strong>quien paga es su propia póliza</strong>, con coberturas que quizá ya tiene sin saberlo: motorista sin seguro o con seguro insuficiente (UM/UIM) y gastos médicos personales (PIP). El problema es que ahí su aseguradora se convierte en la parte contraria. Aquí verá cómo funciona ese reclamo, qué hacer en las primeras 48 horas de un choque con fuga y por qué reportar lo protege aunque sea indocumentado.',
    },
    intro: [
      'Texas tiene una de las proporciones más altas del país de conductores que circulan sin seguro, y los choques en los que el responsable huye del lugar vienen al alza en Houston y Dallas. Si a usted le tocó uno de esos, no está en una situación rara: está en una de las más comunes del estado.',
      'La reacción más frecuente es la resignación: si el otro no tenía seguro, o nunca se supo quién fue, la gente asume que no hay a quién reclamarle. Esa creencia hace que miles de personas paguen de su bolsillo facturas médicas, semanas sin trabajar y la reparación de un carro que no chocaron ellos.',
      'La realidad legal es otra: Texas tiene un sistema pensado para este escenario y funciona a través de su propia póliza. Aquí verá qué coberturas lo protegen, cómo se arma el reclamo, qué hacer si el responsable huyó y por qué el miedo a llamar a la policía suele terminar de matar el caso.',
    ],
    sections: [
      {
        icon: 'car',
        title: 'La realidad de Texas: aquí mucha gente maneja sin seguro',
        subtitle: 'Por qué le afecta aunque usted sí pague el suyo',
        blocks: [
          {
            kind: 'text',
            text: 'Manejar sin seguro es ilegal en Texas, pero ilegal no significa infrecuente. Y hay un problema adicional: los límites mínimos de responsabilidad civil que exige la ley son bajos frente al costo real de una ambulancia, una sala de emergencias y unas semanas sin trabajar. Junto al conductor que no tiene nada existe una categoría igual de común y más traicionera.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Sin ningún seguro',
                desc: 'No hay póliza que responda. Su cobertura de motorista sin seguro (UM) entra en ese vacío, si la tiene contratada.',
              },
              {
                title: 'Con seguro insuficiente',
                desc: 'Sí hay póliza, pero el límite no alcanza. La cobertura UIM cubre la diferencia hasta su propio límite.',
              },
              {
                title: 'Se dio a la fuga',
                desc: 'No se sabe quién fue. Suele tratarse como conductor sin seguro, pero con requisitos extra desde el primer día.',
              },
              {
                title: 'Póliza vencida o falsa',
                desc: 'Enseña una tarjeta que ya no sirve o maneja un carro cuya póliza no lo cubre a él. En la práctica, es como si no tuviera.',
              },
            ],
          },
          {
            kind: 'note',
            text: 'Antes de dar su caso por perdido, hay que verificar tres cosas: si el otro tenía cobertura y de cuánto, si hay otro responsable además del conductor, y qué coberturas tiene la póliza de usted.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'Su propia póliza al rescate: UM, UIM y PIP',
        subtitle: 'Las coberturas que quizá ya pagó y no sabe que tiene',
        blocks: [
          {
            kind: 'text',
            text: 'En Texas las aseguradoras están obligadas a <strong>ofrecerle</strong> cobertura de motorista sin seguro o con seguro insuficiente (UM/UIM) y de gastos médicos personales (PIP). Usted puede rechazarlas, pero el rechazo tiene que constar <strong>por escrito</strong>. Es un detalle enorme: si no hay un rechazo firmado en su expediente, existe un argumento sólido de que la cobertura debe considerarse incluida.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'UM — Motorista sin seguro',
                desc: 'Entra cuando el responsable no tiene póliza o huyó sin ser identificado. Cubre lesiones y, según el contrato, el vehículo.',
              },
              {
                title: 'UIM — Seguro insuficiente',
                desc: 'Cubre la diferencia entre lo cobrado del culpable y el valor real de su caso, hasta su límite. No se suma sin más.',
              },
              {
                title: 'PIP — Gastos médicos',
                desc: 'Paga atención médica y parte de los ingresos perdidos sin discutir culpa. Suele ser el primer dinero que llega.',
              },
              {
                title: 'Colisión y Med Pay',
                desc: 'Colisión repara su vehículo aunque el otro no responda, con deducible. Med Pay paga facturas médicas sin discutir culpa.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'En un choque con fuga la cobertura UM es la pieza central, pero hay un requisito que sorprende: cuando el vehículo no se identifica, la póliza normalmente exige que haya habido <strong>contacto físico</strong> entre los carros. Si otro lo orilló sin tocarlo, el reclamo no es imposible, pero se vuelve mucho más exigente en testigos y video.',
          },
          {
            kind: 'note',
            text: 'Pida hoy a su agente la <strong>página de declaraciones</strong> de su póliza y, si le dicen que no tiene UM/UIM o PIP, pida copia del rechazo firmado. Esos documentos son la primera prueba de su caso.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Por qué su aseguradora no es su amiga en este reclamo',
        subtitle: 'El conflicto que nadie menciona al venderle la póliza',
        blocks: [
          {
            kind: 'text',
            text: 'Un reclamo UM/UIM es de primera parte: usted le pide dinero a la empresa a la que le ha pagado durante años. Mucha gente lo trata como un trámite entre conocidos y no lo es. Cada dólar sale del bolsillo de ellos, y el ajustador trabaja para ellos.',
          },
          {
            kind: 'list',
            items: [
              'Le piden una <strong>declaración grabada</strong> muy temprano, cuando usted todavía no sabe qué tan lesionado está, y luego usan sus palabras en su contra.',
              'Le hacen firmar una <strong>autorización médica amplia</strong> para buscar cualquier dolor viejo y atribuirle a eso su lesión de hoy.',
              'Argumentan <strong>culpa compartida</strong>. En Texas, si le asignan más de la mitad de la culpa, usted no recupera nada.',
              'Le dicen que <strong>primero agote</strong> la póliza del culpable, sin advertirle que transar sin autorización puede eliminar su cobertura UIM.',
            ],
          },
          {
            kind: 'text',
            text: 'Hay un punto técnico que explica muchas frustraciones: en Texas la aseguradora normalmente <strong>no está obligada a pagar el UIM</strong> hasta que se determina legalmente la responsabilidad del otro conductor y el monto de sus daños. A veces hay que demandar a su propia compañía para fijar esa cifra.',
          },
          {
            kind: 'warning',
            text: 'No dé declaración grabada a ninguna aseguradora —ni a la suya— antes de hablar con un abogado, y no firme ninguna liberación con el conductor culpable sin el <strong>consentimiento previo</strong> de su propia compañía. Firmar primero y preguntar después es la forma más silenciosa de perder el UIM que ya pagó.',
          },
        ],
      },
      {
        icon: 'search',
        title: 'Se dio a la fuga: las primeras 48 horas deciden el caso',
        subtitle: 'La evidencia de un hit-and-run se borra sola',
        blocks: [
          {
            kind: 'text',
            text: 'En un choque con fuga usted no tiene un demandado: tiene que construirlo. Y todo lo que serviría para identificar al responsable desaparece en cuestión de días.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Llame al 911 y quédese en el lugar.</strong> Aunque no sepa quién lo chocó, el reporte fija la hora, el punto exacto y los daños.',
              '<strong>Anote lo que recuerde del otro vehículo</strong>: color, tipo, calcomanías, golpes previos, placa parcial y hacia dónde huyó.',
              '<strong>Busque testigos de inmediato</strong> y pida nombre y teléfono personal. La gente se va en minutos y no vuelve a aparecer.',
              '<strong>Camine el perímetro buscando cámaras</strong>: gasolineras, tiendas, talleres, restaurantes, casas con timbre inteligente. Anote cada dirección y pida el video el mismo día.',
              '<strong>Fotografíe todo</strong>: su carro desde varios ángulos, los restos en el pavimento, las marcas de frenado y la pintura ajena en su carrocería.',
              '<strong>Atiéndase el mismo día</strong>, aunque se sienta bien. El dolor de cuello y espalda suele aparecer entre 24 y 72 horas después.',
              '<strong>Avise a su aseguradora</strong> del choque con fuga, sin dar declaración grabada, y guarde el número de reclamo.',
            ],
          },
          {
            kind: 'note',
            text: 'El video de negocios cercanos es la prueba que más casos de fuga ha resuelto y la que más rápido se pierde. Un abogado puede exigir por escrito que no se borre, pero solo si la carta llega antes de que el sistema grabe encima.',
          },
        ],
      },
      {
        icon: 'siren',
        title: '«No llame a la policía por miedo»: el mito que le cuesta el caso',
        subtitle: 'Qué hacer si usted es indocumentado',
        blocks: [
          {
            kind: 'text',
            text: 'Hablemos de esto de frente, porque es la razón número uno por la que buenos casos se pierden antes de llegar a un despacho. Después de un choque, muchas personas indocumentadas deciden no llamar a la policía y se van a su casa adoloridas, sin reporte y sin testigos. No le vamos a decir que ninguna interacción con una autoridad tiene riesgo cero, porque sería mentirle. Lo que sí podemos decirle es qué pierde al no reportar:',
          },
          {
            kind: 'list',
            items: [
              'Sin reporte policial su aseguradora puede tratar el choque <strong>como si nunca hubiera ocurrido</strong>, y la carga de probarlo queda toda de su lado.',
              'Muchas pólizas exigen <strong>reportar la fuga a la policía dentro de un plazo corto</strong> para poder usar la cobertura UM. Si no lo hizo, ya tienen un motivo para negar.',
              'Sin número de caso <strong>no hay investigación</strong>: nadie va a pedir el video de la tienda de la esquina ni a correr la placa parcial.',
              'Su estatus migratorio <strong>no le quita el derecho</strong> a que le paguen; lo que se lo quita es no tener con qué probar el choque.',
            ],
          },
          {
            kind: 'text',
            text: 'Conviene saber qué es ese documento. El reporte de choque que llena un oficial en Texas registra vehículos, hora, lugar, daños y la versión de cada parte: es un documento de tránsito, no un trámite migratorio. Usted puede pedir intérprete, decir que no recuerda algo en vez de inventarlo y limitarse a describir lo que pasó. Si el temor es demasiado, hay opciones parciales: que llame otra persona presente o que lo acompañe un familiar. Ninguna sustituye el reporte hecho en el lugar, pero son mejores que el silencio.',
          },
          {
            kind: 'warning',
            text: 'El error más caro no es hablar con la policía: es irse del lugar sin nada. Un choque sin reporte, sin fotos y sin testigos casi siempre termina en una negación que después ya no se puede pelear.',
          },
        ],
      },
      {
        icon: 'gavel',
        title: 'Demandar al conductor: cuándo vale la pena y cuándo no',
        subtitle: 'Ganar una sentencia y cobrarla son cosas distintas',
        blocks: [
          {
            kind: 'text',
            text: 'Cuando se identifica al responsable y resulta que no tenía seguro, el impulso es demandarlo a él. A veces tiene sentido y a veces es gastar en un papel que nunca se convierte en cheque. La pregunta no es si usted tiene la razón, sino si el otro tiene con qué pagar.',
          },
          {
            kind: 'table',
            headers: ['Ruta', 'Contra quién va', 'De qué depende que cobre'],
            rows: [
              ['Reclamo UM/UIM', 'Su propia aseguradora', 'Tener la cobertura y acreditar la culpa del otro y el valor de sus daños'],
              ['Responsabilidad civil', 'La aseguradora del culpable', 'Que esté identificado y asegurado; se cobra hasta su límite y ni un dólar más'],
              ['Demanda personal', 'El patrimonio del conductor', 'Que tenga bienes o ingresos alcanzables; muchas veces la sentencia queda en papel'],
              ['Contra un tercero', 'Dueño del vehículo o patrón del conductor', 'Que exista una relación legal que lo haga responder, con una póliza detrás'],
            ],
          },
          {
            kind: 'note',
            text: 'La última fila es la que más veces salva un caso. Si el conductor iba en una camioneta de empresa, repartiendo o cumpliendo un encargo de trabajo, puede haber una póliza comercial detrás aunque él no tenga nada. Averiguar quién es el dueño registrado del vehículo es de las primeras diligencias serias.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'Si iba trabajando cuando lo chocaron',
        subtitle: 'Dos rutas que pueden correr al mismo tiempo',
        blocks: [
          {
            kind: 'text',
            text: 'Si el choque ocurrió mientras hacía algo para su trabajo —manejando una unidad de la empresa, repartiendo, yendo entre dos obras—, además del reclamo por el choque puede existir una vía laboral. En Texas la compensación laboral es opcional para la mayoría de los patrones privados, así que lo primero es averiguar si el suyo la tiene.',
          },
          {
            kind: 'list',
            items: [
              'Si su patrón <strong>sí tiene compensación laboral</strong>, puede pagar atención médica y parte del salario perdido sin discutir culpa, mientras el reclamo contra el otro conductor avanza.',
              'Si su patrón <strong>no tiene</strong> (non-subscriber), puede ser demandado por negligencia y pierde defensas legales clásicas.',
              'La <strong>póliza comercial del vehículo</strong> muchas veces trae su propia cobertura UM/UIM y puede protegerlo como ocupante.',
              'Sigue existiendo el <strong>reclamo contra terceros</strong>: el conductor que lo chocó o la empresa dueña de su vehículo.',
            ],
          },
          {
            kind: 'note',
            text: 'Ojo con un detalle que sorprende al final: si la compensación laboral pagó sus gastos médicos, normalmente tiene derecho a recuperar parte de lo que usted cobre del responsable del choque. Ese reembolso se negocia, y negociarlo bien cambia cuánto dinero le queda en la mano.',
          },
        ],
      },
      {
        icon: 'clock',
        title: 'Errores que matan estos casos',
        subtitle: 'Lo que vemos una y otra vez',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>Dar declaración grabada</strong> a los dos días, sin abogado y sin saber qué tan lesionado está.',
              '<strong>Firmar el primer cheque</strong> porque hacía falta el dinero. Una liberación cierra el caso para siempre, aunque la cirugía aparezca después.',
              '<strong>Transar con el conductor culpable</strong> sin el consentimiento de su propia aseguradora, y perder el UIM.',
              '<strong>Dejar pasar semanas sin atención médica.</strong> Ese vacío es el argumento favorito de cualquier ajustador.',
              '<strong>Suspender el tratamiento a la mitad</strong> porque ya se sentía mejor o no tenía cómo pagarlo.',
              '<strong>Publicar en redes</strong> fotos de una fiesta o un viaje mientras se reclama por dolor y limitación física.',
            ],
          },
          {
            kind: 'warning',
            text: 'El plazo general de dos años para demandar por lesiones personales en Texas suena a mucho tiempo y no lo es. Los videos se borran en días, los testigos se mudan y los talleres reparan la evidencia del impacto. Esperar no conserva su caso: lo desgasta.',
          },
        ],
      },
      {
        icon: 'wallet',
        title: 'Qué puede recuperar su caso',
        subtitle: 'Los rubros que se reclaman de verdad',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>Gastos médicos pasados y futuros</strong>: ambulancia, emergencias, estudios, terapia y cirugías previsibles.',
              '<strong>Ingresos perdidos</strong> por los días o meses sin trabajar, incluido el trabajo pagado en efectivo que se pueda acreditar.',
              '<strong>Pérdida de capacidad de ganar</strong> cuando la lesión le impide volver al mismo trabajo físico.',
              '<strong>Dolor, sufrimiento y afectación física</strong>, incluidas limitaciones que cambian su vida diaria.',
              '<strong>Daños al vehículo</strong>, pérdida total, grúa y transporte mientras no tuvo carro.',
            ],
          },
          {
            kind: 'note',
            text: 'En casos de accidentes la <strong>evaluación de su caso es gratuita</strong> y trabajamos por honorarios de contingencia: si no se recupera nada, usted no paga honorarios. No hace falta estatus migratorio, licencia de Texas ni dinero por adelantado para que alguien revise su póliza.',
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: 'Nunca se supo quién me chocó. ¿De verdad me puede pagar mi propio seguro?',
          a: 'Sí, para eso existe la cobertura de motorista sin seguro (UM): un choque con fuga suele tratarse como si el responsable no tuviera póliza. Los requisitos importan, porque normalmente se exige que haya habido contacto físico entre los vehículos y que el hecho se haya reportado pronto a la policía.',
        },
        {
          q: 'Si reclamo con mi propia aseguradora, ¿me van a subir la prima?',
          a: 'Usar una cobertura que usted compró y pagó es el propósito de esa cobertura, y un reclamo UM/UIM por un choque que no fue culpa suya no equivale a un siniestro propio. Si su compañía reacciona con un aumento que parezca represalia, dígaselo a su abogado.',
        },
        {
          q: 'Soy indocumentado y no tengo licencia de Texas. ¿Puedo reclamar?',
          a: 'Sí. Su estatus migratorio no le quita el derecho a que le paguen las lesiones y los daños que otro le causó, y no tener licencia no convierte el choque en culpa suya. Lo que sí necesita, como cualquiera, es prueba.',
        },
        {
          q: 'La aseguradora del otro me ofreció un cheque rápido. ¿Lo acepto?',
          a: 'Antes de firmar, entienda que ese cheque casi siempre viene con una liberación que cierra su caso para siempre. Si semanas después necesita una cirugía, ya no hay a quién reclamarle. Y transar sin el consentimiento de su propia aseguradora puede eliminar el UIM.',
        },
        {
          q: 'Yo iba de pasajero en el carro de un amigo. ¿Qué cobertura me toca?',
          a: 'Puede tener varias. Suele aplicar la póliza del vehículo en el que iba, con su UM/UIM y su PIP, y en muchos casos también la póliza propia del pasajero. Determinar qué pólizas se apilan es justo el análisis que conviene no hacer solo.',
        },
        {
          q: '¿Cuánto tiempo tengo para actuar en Texas?',
          a: 'El plazo general para demandar por lesiones personales es de dos años desde la fecha del choque, pero su póliza puede exigirle avisos mucho antes. Y la evidencia que decide estos casos se pierde en semanas, no en años.',
        },
      ],
    },
    conclusion: {
      title: 'Que el otro no tenga nada no significa que usted no tenga nada',
      text: 'La frase que más repiten las víctimas de estos choques es «no se puede hacer nada», y casi siempre está equivocada. Hay coberturas ya pagadas, pólizas comerciales detrás de vehículos que parecían particulares, videos que todavía existen y plazos que todavía no se vencen. Lo único que sí se pierde con seguridad es lo que nadie reclama.',
      advice: 'Si lo chocó alguien sin seguro o que se dio a la fuga, la evaluación de su caso es gratuita y no cobramos honorarios si no se recupera nada. Traiga su póliza, el reporte y las fotos de su teléfono.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'Texas Insurance Code — cobertura UM/UIM y requisito de rechazo por escrito',
        'Texas Insurance Code — cobertura PIP y su ofrecimiento obligatorio',
        'Texas Transportation Code — deberes tras un choque y reporte de accidente (CR-3)',
        'Texas Civil Practice and Remedies Code — prescripción de dos años y responsabilidad proporcional',
        'Texas Department of Insurance — guía del consumidor sobre el seguro de auto',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'Uninsured or Hit-and-Run Crash in Texas',
    metaDesc:
      'If the other driver had no insurance or fled the scene in Texas, your own UM/UIM coverage may pay. How to recover and the mistakes that kill these claims.',
    title: 'Hit by an Uninsured or Hit-and-Run Driver in Texas: How to Recover',
    displayDate: 'Aug 06, 2026',
    readTime: '22 min',
    categoryLabel: 'Accidents',
    summary: {
      title: 'Initial Summary',
      text: 'There is a crash worse than the crash: the one where the driver at fault takes off, or stays but has nothing to pay with. In Texas that happens every day, and the natural reaction — «then there is nothing I can do» — is almost always wrong. In most of these cases <strong>the one who pays is your own policy</strong>, through coverages you may already have without knowing it: uninsured and underinsured motorist coverage (UM/UIM) and personal injury protection (PIP). The problem is that your insurer then becomes the opposing party. Here is how that claim works, what to do in the first 48 hours after a hit-and-run, and why reporting protects you even if you are undocumented.',
    },
    intro: [
      'Texas has one of the highest shares in the country of drivers on the road without insurance, and crashes where the driver at fault flees the scene are rising in Houston and Dallas. If one of those happened to you, you are not in an unusual situation: you are in one of the most common ones in the state.',
      'The most common reaction is to give up: if the other driver had no insurance, or nobody ever found out who it was, people assume there is no one to claim against. That belief is why thousands of people pay out of pocket for medical bills, weeks out of work, and repairs to a car they did not wreck.',
      'The legal reality is different: Texas has a system built for this scenario, and it runs through your own policy. Here you will see which coverages protect you, how the claim is built, what to do when the driver flees, and why the fear of calling the police usually finishes off the case.',
    ],
    sections: [
      {
        icon: 'car',
        title: 'The Texas reality: a lot of people drive with no insurance',
        subtitle: 'Why it hits you even though you pay for yours',
        blocks: [
          {
            kind: 'text',
            text: 'Driving uninsured is illegal in Texas, but illegal does not mean rare. And there is a second problem: the minimum liability limits state law requires are low compared with the real cost of an ambulance, an emergency room and a few weeks out of work. Alongside the driver with nothing sits an equally common and more deceptive category.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'No insurance at all',
                desc: 'There is no policy to respond. Your uninsured motorist coverage (UM) steps into that empty space, if you carry it.',
              },
              {
                title: 'Insufficient insurance',
                desc: 'There is a policy, but the limit falls short. UIM coverage fills the gap, up to your own limit.',
              },
              {
                title: 'Fled the scene',
                desc: 'Nobody knows who it was. It is usually treated as an uninsured driver, but with extra requirements from day one.',
              },
              {
                title: 'Expired or fake policy',
                desc: 'They hand over a card that no longer works, or drive a car whose policy does not cover them. In practice, the same as none.',
              },
            ],
          },
          {
            kind: 'note',
            text: 'Before you write your case off, three things have to be verified: whether the other driver had coverage and how much, whether anyone besides the driver is responsible, and what coverages your own policy carries.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'Your own policy to the rescue: UM, UIM and PIP',
        subtitle: 'The coverages you may already have paid for',
        blocks: [
          {
            kind: 'text',
            text: 'In Texas, insurers are required to <strong>offer</strong> you uninsured and underinsured motorist coverage (UM/UIM) and personal injury protection (PIP). You may reject them, but the rejection has to be <strong>in writing</strong>. That detail is enormous: if no signed rejection appears in your file, there is a strong argument that the coverage should be treated as included.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'UM — Uninsured motorist',
                desc: 'Applies when the at-fault driver has no policy or fled unidentified. Covers injuries and, depending on the policy, your vehicle.',
              },
              {
                title: 'UIM — Underinsured motorist',
                desc: 'Covers the gap between what was collected from the at-fault driver and the real value of your case, up to your limit.',
              },
              {
                title: 'PIP — Medical protection',
                desc: 'Pays medical care and part of lost income without arguing fault. It is usually the first money that arrives.',
              },
              {
                title: 'Collision and Med Pay',
                desc: 'Collision repairs your vehicle even when the other side never pays, subject to your deductible. Med Pay covers bills regardless of fault.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'In a hit-and-run, UM coverage is the centerpiece, but one requirement catches people off guard: when the vehicle is never identified, the policy normally requires <strong>actual physical contact</strong> between the cars. If another driver ran you off the road without touching you, the claim is not impossible, but it becomes far more demanding in witnesses and video.',
          },
          {
            kind: 'note',
            text: 'Ask your agent today for the <strong>declarations page</strong> of your policy and, if they say you have no UM/UIM or PIP, ask for a copy of the signed rejection. Those documents are the first evidence in your case.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Why your insurer is not your friend in this claim',
        subtitle: 'The conflict nobody mentions when selling the policy',
        blocks: [
          {
            kind: 'text',
            text: 'A UM/UIM claim is a first-party claim: you are asking for money from the company you have been paying for years. Many people treat it as a formality between acquaintances, and it is not. Every dollar comes out of their pocket, and the adjuster works for them.',
          },
          {
            kind: 'list',
            items: [
              'They ask for a <strong>recorded statement</strong> very early, when you still do not know how badly you are hurt, and later use your words against you.',
              'They have you sign a <strong>broad medical authorization</strong> to hunt for any old pain and blame your current injury on that.',
              'They argue <strong>shared fault</strong>. In Texas, if they pin more than half the blame on you, you recover nothing.',
              'They tell you to <strong>exhaust the at-fault policy first</strong>, without warning you that settling without permission can wipe out your UIM coverage.',
            ],
          },
          {
            kind: 'text',
            text: 'One technical point explains a lot of frustration: in Texas an insurer generally <strong>is not obligated to pay UIM benefits</strong> until the other driver’s liability and the amount of your damages are legally established. Sometimes you have to sue your own company just to fix that number.',
          },
          {
            kind: 'warning',
            text: 'Do not give a recorded statement to any insurer — including your own — before speaking with an attorney, and do not sign any release with the at-fault driver without your own company’s <strong>prior consent</strong>. Signing first and asking later is the quietest way to lose the UIM you already paid for.',
          },
        ],
      },
      {
        icon: 'search',
        title: 'They fled: the first 48 hours decide the case',
        subtitle: 'Hit-and-run evidence erases itself',
        blocks: [
          {
            kind: 'text',
            text: 'In a hit-and-run you do not have a defendant: you have to build one. And everything that could identify the driver disappears within days.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Call 911 and stay at the scene.</strong> Even if you have no idea who hit you, the report fixes the time, the exact spot and the damage.',
              '<strong>Write down what you remember about the other vehicle</strong>: color, type, decals, prior dents, partial plate and which way it fled.',
              '<strong>Find witnesses immediately</strong> and get names and personal phone numbers. People leave within minutes and do not surface again.',
              '<strong>Walk the perimeter looking for cameras</strong>: gas stations, stores, repair shops, restaurants, homes with video doorbells. Note every address and request the footage the same day.',
              '<strong>Photograph everything</strong>: your car from several angles, debris on the pavement, skid marks and foreign paint on your body panels.',
              '<strong>Get medical care the same day</strong>, even if you feel fine. Neck and back pain often shows up 24 to 72 hours later.',
              '<strong>Notify your own insurer</strong> of the hit-and-run, without giving a recorded statement, and save the claim number.',
            ],
          },
          {
            kind: 'note',
            text: 'Video from nearby businesses has resolved more hit-and-run cases than anything else, and it is what disappears fastest. An attorney can demand in writing that it be preserved, but only if the letter arrives before the system records over it.',
          },
        ],
      },
      {
        icon: 'siren',
        title: '«Do not call the police»: the fear that costs you the case',
        subtitle: 'What to do if you are undocumented',
        blocks: [
          {
            kind: 'text',
            text: 'Let us talk about this directly, because it is the number one reason good cases are lost before they ever reach a firm. After a crash, many undocumented people decide not to call the police and go home hurting, with no report and no witnesses. We are not going to tell you that any interaction with an authority carries zero risk, because that would be a lie. What we can tell you is what you lose by not reporting:',
          },
          {
            kind: 'list',
            items: [
              'With no police report your insurer can treat the crash <strong>as if it never happened</strong>, and the burden of proving it falls entirely on you.',
              'Many policies require <strong>reporting a hit-and-run to police within a short window</strong> in order to use UM coverage. If you did not, they already have a reason to deny.',
              'With no case number there is <strong>no investigation</strong>: nobody will request the corner store’s video or run the partial plate.',
              'Your immigration status <strong>does not take away your right</strong> to be paid; what does take it away is having nothing to prove the crash with.',
            ],
          },
          {
            kind: 'text',
            text: 'It helps to know what that document is. The crash report an officer fills out in Texas records vehicles, time, location, damage and each side’s account: it is a traffic document, not an immigration proceeding. You can ask for an interpreter, say you do not remember something instead of making it up, and stick to describing what happened. If the fear is too much, there are partial options: have another person present make the call, or bring a family member. None replaces a report made at the scene, but they beat silence.',
          },
          {
            kind: 'warning',
            text: 'The most expensive mistake is not talking to the police: it is leaving the scene with nothing. A crash with no report, no photos and no witnesses almost always ends in a denial that can no longer be fought.',
          },
        ],
      },
      {
        icon: 'gavel',
        title: 'Suing the driver: when it is worth it and when it is not',
        subtitle: 'Winning a judgment and collecting one are different things',
        blocks: [
          {
            kind: 'text',
            text: 'When the driver at fault is identified and turns out to have had no insurance, the instinct is to sue that person. Sometimes it makes sense, and sometimes it means paying for a piece of paper that never becomes a check. The question is not whether you are right, but whether the other side has anything to pay with.',
          },
          {
            kind: 'table',
            headers: ['Route', 'Who it targets', 'What getting paid depends on'],
            rows: [
              ['UM/UIM claim', 'Your own insurance company', 'Having the coverage and establishing the other driver’s fault and your damages'],
              ['Liability claim', 'The at-fault driver’s insurer', 'That they are identified and insured; you collect up to their limit and no more'],
              ['Personal lawsuit', 'The driver’s own assets', 'That they have reachable assets or income; often the judgment stays on paper'],
              ['Third-party claim', 'Vehicle owner or the driver’s employer', 'That a legal relationship makes them answerable, with a policy behind it'],
            ],
          },
          {
            kind: 'note',
            text: 'The last row saves more cases than any other. If the driver was in a company truck, making deliveries or running a work errand, there may be a commercial policy behind them even though they own nothing. Finding out who the registered owner of the vehicle is ranks among the first serious steps.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'If you were working when you were hit',
        subtitle: 'Two routes that can run at the same time',
        blocks: [
          {
            kind: 'text',
            text: 'If the crash happened while you were doing something for work — driving a company unit, making deliveries, moving between jobsites — then on top of the crash claim there may be a work-injury route. In Texas, workers’ compensation is optional for most private employers, so the first thing to find out is whether yours carries it.',
          },
          {
            kind: 'list',
            items: [
              'If your employer <strong>does have workers’ compensation</strong>, it can pay medical care and part of your lost wages without arguing fault, while the claim against the other driver moves forward.',
              'If your employer <strong>does not</strong> (a non-subscriber), they can be sued for negligence and lose classic legal defenses.',
              'The <strong>commercial policy on the company vehicle</strong> often carries its own UM/UIM coverage, which can protect you as an occupant.',
              'The <strong>third-party claim</strong> still exists: the driver who hit you or the company that owns their vehicle.',
            ],
          },
          {
            kind: 'note',
            text: 'Watch a detail that surprises people at the end: if workers’ compensation paid your medical bills, it generally has a right to recover part of whatever you collect from the party responsible for the crash. That reimbursement is negotiated, and negotiating it well changes how much you keep.',
          },
        ],
      },
      {
        icon: 'clock',
        title: 'Mistakes that kill these cases',
        subtitle: 'What we see over and over',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>Giving a recorded statement</strong> two days in, with no attorney and no idea how badly injured you are.',
              '<strong>Cashing the first check</strong> because the money was needed. A release closes the case forever, even if surgery shows up later.',
              '<strong>Settling with the at-fault driver</strong> without your own insurer’s consent, and losing UIM coverage.',
              '<strong>Letting weeks pass with no medical care.</strong> That gap is every adjuster’s favorite argument.',
              '<strong>Stopping treatment halfway</strong> because you felt better or could not pay for it.',
              '<strong>Posting on social media</strong> photos of a party or a trip while claiming pain and physical limitation.',
            ],
          },
          {
            kind: 'warning',
            text: 'The general two-year deadline to sue for personal injury in Texas sounds like plenty of time, and it is not. Video is erased in days, witnesses move, and body shops repair away the physical evidence of the impact. Waiting does not preserve your case: it wears it down.',
          },
        ],
      },
      {
        icon: 'wallet',
        title: 'What your case can recover',
        subtitle: 'The categories that are actually claimed',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>Past and future medical expenses</strong>: ambulance, emergency room, imaging, therapy and foreseeable surgeries.',
              '<strong>Lost income</strong> for the days or months you could not work, including cash-paid work that can be documented.',
              '<strong>Loss of earning capacity</strong> when the injury keeps you from the same physical work.',
              '<strong>Pain, suffering and physical impairment</strong>, including limitations that change your daily life.',
              '<strong>Vehicle damage</strong>, total loss, towing and transportation while you had no car.',
            ],
          },
          {
            kind: 'note',
            text: 'In accident cases the <strong>evaluation of your case is free</strong> and we work on contingency fees: if nothing is recovered, you pay no fees. You do not need immigration status, a Texas license or money up front for someone to review your policy.',
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'Nobody ever found out who hit me. Can my own insurance really pay?',
          a: 'Yes, that is what uninsured motorist (UM) coverage is for: a hit-and-run is generally treated as if the at-fault driver had no policy. The requirements matter, because there normally must have been physical contact between the vehicles and the incident must have been reported to police promptly.',
        },
        {
          q: 'If I claim against my own insurer, will my premium go up?',
          a: 'Using coverage you bought and paid for is the entire point of that coverage, and a UM/UIM claim for a crash that was not your fault is not the same as an at-fault loss. If your company responds with an increase that looks like retaliation, tell your attorney.',
        },
        {
          q: 'I am undocumented and have no Texas license. Can I still claim?',
          a: 'Yes. Your immigration status does not take away your right to be paid for injuries and damage someone else caused, and not having a license does not make the crash your fault. What you do need, like anyone else, is proof.',
        },
        {
          q: 'The other driver’s insurer offered me a quick check. Should I take it?',
          a: 'Before signing, understand that the check almost always comes with a release that closes your case forever. If weeks later you need surgery, there is no one left to ask. And settling without your own insurer’s consent can wipe out the UIM.',
        },
        {
          q: 'I was a passenger in a friend’s car. Which coverage applies to me?',
          a: 'Possibly several. The policy on the vehicle you were riding in often applies, with its UM/UIM and PIP, and in many cases the passenger’s own policy does too. Working out which policies stack is exactly the analysis you should not attempt alone.',
        },
        {
          q: 'How long do I have to act in Texas?',
          a: 'The general deadline to sue for personal injury is two years from the date of the crash, but your policy can require notices far sooner. And the evidence that decides these cases is lost in weeks, not years.',
        },
      ],
    },
    conclusion: {
      title: 'The other driver having nothing does not mean you have nothing',
      text: 'The phrase victims of these crashes repeat most is «there is nothing to be done», and it is almost always wrong. There are coverages already paid for, commercial policies behind vehicles that looked personal, video that still exists and deadlines that have not yet run. The only thing certainly lost is whatever nobody claims.',
      advice: 'If an uninsured or hit-and-run driver hit you, the evaluation of your case is free and we charge no fees unless there is a recovery. Bring your policy, the report and the photos on your phone.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'Texas Insurance Code — UM/UIM coverage and the written rejection requirement',
        'Texas Insurance Code — personal injury protection (PIP) and the mandatory offer',
        'Texas Transportation Code — driver duties after a crash and the crash report (CR-3)',
        'Texas Civil Practice and Remedies Code — two-year limitations and proportionate responsibility',
        'Texas Department of Insurance — consumer guide to auto insurance coverage',
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
          ? 'Vehículo dañado tras un choque con un conductor sin seguro en Texas'
          : 'Damaged vehicle after a crash with an uninsured driver in Texas'
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
