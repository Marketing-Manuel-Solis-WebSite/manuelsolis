import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'autodeportacion-salida-voluntaria-riesgos-2026';
const ISO_DATE = '2026-08-06';
// TODO(portada): sustituir cuando marketing entregue la imagen definitiva.
const IMAGE = '/og-default.jpg';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Autodeportación: riesgos que no te dicen',
    metaDesc:
      'Antes de aceptar irse por su cuenta: barras de 3 y 10 años, barra permanente y solicitudes que se pierden al salir de Estados Unidos.',
    title: 'Autodeportación: lo que el gobierno no te dice antes de que firmes tu salida',
    displayDate: '06 Ago, 2026',
    readTime: '10 min',
    categoryLabel: 'Defensa contra Deportación',
    lastUpdated: '6 de agosto de 2026',
    summary: {
      title: 'Resumen inicial',
      text: 'En 2026 sigue activa la campaña para que las personas sin estatus salgan del país por su cuenta: una aplicación oficial, un estipendio y ayuda con el boleto, empujados con cartas, mensajes y presión creciente. Lo que casi nunca se explica en español es la parte legal. Salir después de haber acumulado presencia ilegal puede activar una <strong>barra de 3 o de 10 años</strong> para volver, o incluso la <strong>barra permanente</strong>, y puede significar abandonar solicitudes que valían mucho más que el apoyo ofrecido. Para algunas personas salir sí es el paso correcto, pero solo dentro de un plan legal armado <strong>antes</strong> de subirse al avión.',
    },
    intro: [
      'Cada semana llegan a nuestras oficinas personas con la misma pregunta hecha en voz baja: «¿me conviene irme por mi cuenta antes de que me agarren?». Vienen con una carta, con un mensaje en el teléfono o con lo que vieron en un video de treinta segundos. Casi todos escucharon la parte de la oferta: una aplicación oficial, un estipendio y apoyo con el viaje. Casi ninguno escuchó la otra parte.',
      'La otra parte es la ley de inmigración, y esa no cambia por una campaña de comunicación. Salir de Estados Unidos después de haber vivido aquí sin estatus <strong>no borra su historial: lo activa</strong>. Es el acto de salir el que enciende castigos que estaban dormidos mientras usted permanecía adentro, y algunos duran una década o no tienen fecha de término.',
      'Este artículo no le dirá que se quede ni que se vaya: eso depende de fechas y documentos que solo un abogado que revise su expediente puede evaluar. Lo que sí haremos es poner sobre la mesa qué está aceptando realmente quien dice que sí, cuándo salir forma parte de una estrategia legítima y qué revisar antes de decidir.',
    ],
    sections: [
      {
        icon: 'phone',
        title: 'Qué le están ofreciendo y qué letra chica trae',
        subtitle: 'La oferta',
        blocks: [
          {
            kind: 'text',
            text: 'La propuesta se resume así: una persona sin estatus se registra en una aplicación oficial, declara que saldrá del país por su cuenta y, a cambio, recibe un estipendio y apoyo con el boleto de avión. Alrededor hay una campaña de presión que sube de tono: cartas, mensajes de texto, llamadas y operativos que hacen que quedarse se sienta insostenible.',
          },
          {
            kind: 'text',
            text: 'Antes de hablar de consecuencias legales, cuatro advertencias sobre la oferta misma:',
          },
          {
            kind: 'list',
            items: [
              '<strong>Los términos cambian.</strong> Condiciones, requisitos y alcance se han modificado más de una vez y pueden volver a cambiar. Lo que le contaron hace tres meses puede ya no ser cierto.',
              '<strong>Registrarse es entregar información.</strong> Al inscribirse confirma al gobierno quién es, dónde está y que reconoce no tener estatus. Eso no desaparece si después cambia de opinión.',
              '<strong>Nadie le está regalando un perdón.</strong> El apoyo es logístico. No borra una orden de deportación previa, no cancela barras de reingreso y no le concede ningún derecho a volver.',
              '<strong>Circulan estafas idénticas.</strong> Hay quien cobra por «inscribirlo» en programas oficiales que no cobran, y páginas falsas que copian el diseño oficial. Nunca pague a un particular por un trámite del gobierno.',
            ],
          },
          {
            kind: 'note',
            text: 'Este artículo se escribió con la información disponible al 6 de agosto de 2026 y describe el programa en términos generales a propósito: montos, requisitos y condiciones han cambiado y pueden volver a cambiar sin aviso. Verifique el estado vigente en fuentes oficiales y con un abogado antes de actuar, no con lo que circula en redes.',
          },
        ],
      },
      {
        icon: 'balance',
        title: 'Salida voluntaria informal y salida ordenada por un juez no son lo mismo',
        subtitle: 'Tres figuras que se confunden',
        blocks: [
          {
            kind: 'text',
            text: 'En la calle se usa una sola frase, «salida voluntaria», para describir situaciones jurídicamente muy distintas. Confundirlas cuesta años de separación familiar, y la confusión es fácil porque en los tres casos la persona termina en el mismo avión.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Irse por su cuenta, sin proceso',
                desc: 'No hay caso en corte ni orden de deportación: la persona simplemente sale. No queda una orden de remoción, pero sí se activan las barras por la presencia ilegal ya acumulada.',
              },
              {
                title: 'Salida voluntaria de un juez',
                desc: 'Figura formal de la INA § 240B. El juez la otorga dentro del proceso, con requisitos estrictos y un plazo fijo para salir. Evita la orden de remoción, pero no borra las barras por presencia ilegal.',
              },
              {
                title: 'Orden de remoción disfrazada',
                desc: 'Si firma una renuncia a su audiencia o acepta una orden estipulada porque le dijeron que «así sale más rápido», queda una deportación formal, con sus propias barras de reingreso.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'La salida voluntaria del juez no es un favor: exige presencia física previa, buen carácter moral durante el periodo requerido, medios para pagar su propio viaje y ausencia de ciertas condenas, y normalmente una fianza. A cambio, evita cargar con una orden de remoción.',
          },
          {
            kind: 'warning',
            text: 'Tiene una trampa que arruina casos: si no sale dentro del plazo exacto concedido, la salida voluntaria se convierte automáticamente en una orden de deportación, se impone una multa civil y usted queda inelegible por diez años para varias formas de alivio, entre ellas la cancelación de remoción y el ajuste de estatus. El plazo no se estira porque el vuelo salió caro o porque un familiar se enfermó.',
          },
        ],
      },
      {
        icon: 'clock',
        title: 'Lo que pierde al salir: las barras de 3 y de 10 años',
        subtitle: 'INA § 212(a)(9)(B)',
        blocks: [
          {
            kind: 'text',
            text: 'Esta es la parte que ninguna campaña menciona y la que decide la vida de la mayoría de las familias. La ley castiga la presencia ilegal acumulada, pero el castigo <strong>solo se activa cuando usted sale del país</strong>. Mientras permanece adentro la barra existe en potencia; al cruzar la puerta se enciende.',
          },
          {
            kind: 'table',
            headers: ['Presencia ilegal acumulada', 'Consecuencia al salir del país'],
            rows: [
              ['Menos de 180 días', 'No se activa esta barra, aunque pueden aplicar otros motivos de inadmisibilidad'],
              ['Más de 180 días y menos de un año', 'Inadmisible durante 3 años para volver a entrar legalmente'],
              ['Un año o más', 'Inadmisible durante 10 años para volver a entrar legalmente'],
            ],
          },
          {
            kind: 'text',
            text: 'El tiempo corre desde que su estancia autorizada venció o desde que entró sin inspección, con excepciones que importan: los periodos siendo menor de edad y ciertos periodos con solicitudes pendientes de buena fe no siempre se computan igual. Son cálculos técnicos que se hacen con el expediente y con fechas verificadas, nunca de memoria.',
          },
          {
            kind: 'note',
            text: 'Diez años de barra no significan diez años haciendo fila. Significan diez años fuera de Estados Unidos antes de siquiera poder pedir la visa que hoy no puede pedir. En ese tiempo su hijo ciudadano cumple dieciocho, la casa se pierde y el negocio cierra. Ese es el precio real detrás de «me voy tantito y luego arreglo».',
          },
        ],
      },
      {
        icon: 'lock',
        title: 'La barra permanente: el error que casi nadie ve venir',
        subtitle: 'INA § 212(a)(9)(C)',
        blocks: [
          {
            kind: 'text',
            text: 'Hay una consecuencia peor y llega con una secuencia que suena inofensiva: la persona sale del país, aguanta unos meses lejos de sus hijos y, desesperada, vuelve a entrar sin inspección.',
          },
          {
            kind: 'text',
            text: 'Si acumuló más de un año de presencia ilegal en total, o si fue deportado, y después <strong>entra o intenta entrar de nuevo sin ser admitido</strong>, cae bajo la INA § 212(a)(9)(C): la llamada barra permanente. Ningún perdón provisional la resuelve desde adentro del país. Hay que pasar diez años físicamente fuera de Estados Unidos y solo entonces pedir permiso para volver a solicitar admisión, sin garantía de que se lo concedan.',
          },
          {
            kind: 'warning',
            text: 'Es el patrón que vemos una y otra vez: alguien se va convencido de que «desde allá arregla», no soporta la separación, cruza otra vez y en ese momento cierra una puerta que ningún abogado puede abrir en el corto plazo.',
          },
          {
            kind: 'text',
            text: 'Además, si ya existe una orden de remoción en su contra, la salida activa por separado las barras de la INA § 212(a)(9)(A), cuya duración depende del tipo de orden y de si hubo más de una. Se suman a las de presencia ilegal; no se eligen.',
          },
        ],
      },
      {
        icon: 'file',
        title: 'Si tiene Visa U, VAWA, asilo o corte pendiente, irse puede matar su caso',
        subtitle: 'Abandono de solicitudes',
        blocks: [
          {
            kind: 'text',
            text: 'Muchas de las personas que hoy consideran irse ya tienen algo vivo en su expediente y no lo saben, o no entienden cuánto vale. Salir del país puede desactivarlo de un día para otro.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Asilo pendiente.</strong> Salir con una solicitud de asilo en trámite normalmente se trata como abandono. Los años de espera acumulados se pierden y no se recuperan.',
              '<strong>Cancelación de remoción.</strong> Exige presencia física continua por un periodo largo. Las ausencias rompen esa continuidad, e irse mientras el caso está en corte equivale a abandonar la solicitud. Es de los alivios más valiosos que existen y desaparece con un vuelo.',
              '<strong>Petición U como víctima de un delito.</strong> Salir no siempre la cancela, pero cambia el camino: el trámite pasa a un consulado en el extranjero, se alarga y suma motivos de inadmisibilidad que hay que perdonar antes de volver.',
              '<strong>Autopetición VAWA.</strong> La elegibilidad y la posibilidad de ajustar estatus dentro del país dependen de requisitos de residencia y presencia. Salir puede desbaratar la ruta que ya tenía.',
              '<strong>TPS o cualquier estatus que exija permiso de viaje.</strong> Salir sin la autorización de viaje correcta puede costarle el estatus que sí tenía.',
              '<strong>Petición familiar aprobada o en trámite.</strong> Puede ser la base de una ruta legal futura. Irse sin analizar cómo interactúa con las barras puede volverla inservible por una década.',
            ],
          },
          {
            kind: 'note',
            text: 'Antes de decidir hay que saber con certeza qué tiene abierto. Muchas personas creen que «no tienen nada» y en realidad tienen una petición aprobada hace años o una audiencia programada de la que nunca se enteraron porque el aviso llegó a una dirección vieja.',
          },
        ],
      },
      {
        icon: 'plane',
        title: 'La promesa de volver legalmente y por qué para la mayoría no es real',
        subtitle: 'La letra chica del regreso',
        blocks: [
          {
            kind: 'text',
            text: 'El argumento que más convence es este: váyase ahora, por su propia voluntad, y regrese después por la vía legal. Suena razonable. El problema es que «la vía legal» no es una puerta que se cruza cuando uno decide: es un sistema con requisitos que la mayoría de las personas en esta situación no cumple.',
          },
          {
            kind: 'text',
            text: 'Para inmigrar legalmente hace falta, casi siempre, un <strong>peticionario calificado</strong> —un familiar cercano ciudadano o residente, o un empleador— y una <strong>categoría de visa disponible</strong>. No existe una fila general para «personas trabajadoras que quieren volver». Sin peticionario, la vía legal no es lenta: no existe.',
          },
          {
            kind: 'text',
            text: 'Y si sí lo tiene, se topa de frente con las barras que activó al salir. Ahí se rompe la promesa: la persona se va, espera, se presenta al consulado con todo en orden y le informan que es inadmisible por diez años. Sin un perdón concedido, no hay visa.',
          },
          {
            kind: 'warning',
            text: 'Hemos visto a familias vender el carro y cerrar su negocio confiando en un regreso «en unos meses» que nadie les prometió por escrito. El apoyo para el viaje no incluye ningún compromiso de dejarlo volver ni acelera trámite alguno. Un beneficio migratorio futuro solo existe si alguien con autoridad lo aprueba en un caso concreto.',
          },
        ],
      },
      {
        icon: 'check',
        title: 'Cuándo salir SÍ puede ser parte de una estrategia',
        subtitle: 'El escenario en el que funciona',
        blocks: [
          {
            kind: 'text',
            text: 'Nada de lo anterior significa que salir sea siempre un error. Para algunas personas es exactamente el paso correcto, pero en un orden muy específico: <strong>primero se resuelve el perdón, después se sale</strong>. Nunca al revés.',
          },
          {
            kind: 'text',
            text: 'El caso típico es el proceso consular con perdón provisional por presencia ilegal, y cada paso importa tanto como el anterior:',
          },
          {
            kind: 'steps',
            items: [
              'Existe un familiar peticionario calificado y una petición familiar presentada y aprobada.',
              'Se verifica que la única barrera para la residencia sea la presencia ilegal y no otro motivo de inadmisibilidad.',
              'Se presenta el perdón provisional (Formulario I-601A) <strong>estando todavía dentro de Estados Unidos</strong>, probando dificultad extrema para un cónyuge o padre ciudadano o residente permanente.',
              'Se espera la <strong>aprobación</strong> del perdón. No el recibo de que lo presentaron: la aprobación por escrito.',
              'Solo entonces se sale del país para la entrevista consular, con una ausencia corta y planeada.',
            ],
          },
          {
            kind: 'text',
            text: 'La diferencia entre esta ruta y una salida improvisada es la diferencia entre unas semanas fuera y diez años fuera. La misma persona y el mismo consulado producen resultados opuestos según si el perdón estaba aprobado antes del vuelo.',
          },
          {
            kind: 'note',
            text: 'El perdón provisional cubre la presencia ilegal, no todo lo demás. Antecedentes penales, fraude previo, entradas repetidas después de haber acumulado más de un año de presencia ilegal u órdenes de deportación anteriores pueden dejarlo fuera de esta ruta. Por eso el análisis previo es la decisión completa, no un trámite.',
          },
        ],
      },
      {
        icon: 'search',
        title: 'Antes de decidir: FOIA y consulta legal, en ese orden',
        subtitle: 'Qué hacer esta semana',
        blocks: [
          {
            kind: 'text',
            text: 'La peor decisión es la que se toma con información incompleta, y casi nadie tiene su historial migratorio completo en la cabeza. Hay pasos concretos que puede dar sin salir del país y sin firmar nada, y el orden importa.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Pida su expediente por FOIA.</strong> Una solicitud bajo la Ley de Libertad de Información a USCIS (Formulario G-639) le entrega lo que el gobierno tiene sobre usted: solicitudes anteriores, entradas y salidas, peticiones presentadas a su nombre. Según su historia, conviene pedirlo también a ICE y a CBP.',
              '<strong>Confirme si tiene un caso abierto en corte.</strong> El sistema de información de casos de la corte de inmigración permite verificar si hay audiencias programadas o si ya se dictó una orden en ausencia sin que usted se enterara.',
              '<strong>Reúna sus documentos.</strong> Pasaporte, sellos de entrada y salida, actas de nacimiento y matrimonio, comprobantes de domicilio y de tiempo en el país, expedientes médicos y escolares de sus hijos, y cualquier papel que le haya dado inmigración.',
              '<strong>Consulte con un abogado antes de inscribirse o firmar nada.</strong> Con el expediente en la mano la conversación deja de ser una opinión y se vuelve un cálculo: cuánta presencia ilegal acumuló, qué barras activaría, qué tiene abierto y si existe una ruta con perdón.',
            ],
          },
          {
            kind: 'warning',
            text: 'No firme documentos en inglés que no entienda, no acepte una «salida» sin saber si es la del juez o una orden de remoción disfrazada, y no pague a un notario ni a nadie que le prometa un resultado. En inmigración, la promesa de un resultado garantizado es la señal más confiable de fraude.',
          },
          {
            kind: 'note',
            text: 'Si ya existe una orden de deportación en su contra, no dé por hecho que no queda nada por hacer. Según los hechos puede existir una moción para reabrir, sobre todo si la orden se dictó en ausencia porque la notificación nunca le llegó. Eso se evalúa antes de irse.',
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: 'Si me voy por mi cuenta, ¿evito que quede una deportación en mi récord?',
          a: 'Depende de qué firme. Salir cuando no hay proceso en corte no genera una orden de remoción, pero sí activa las barras por presencia ilegal. Si en cambio firma una renuncia a su audiencia o acepta una orden estipulada, queda una deportación formal. Antes de firmar, alguien tiene que leerle exactamente qué documento le están poniendo enfrente.',
        },
        {
          q: '¿El estipendio o el apoyo con el boleto me da algún derecho a volver?',
          a: 'No. Es apoyo logístico y económico, no un beneficio migratorio. No cancela órdenes previas, no borra barras de reingreso y no crea ninguna promesa de admisión futura. Cualquier visa posterior se evalúa desde cero, con las mismas reglas de inadmisibilidad que aplican a todos.',
        },
        {
          q: 'No sé cuánta presencia ilegal tengo acumulada. ¿Cómo lo averiguo?',
          a: 'Es justo la pregunta que no debe contestar de memoria. El cálculo depende de fechas de entrada, de vencimientos de estancia autorizada, de su edad en esos periodos y de solicitudes pendientes. Un expediente FOIA y una consulta legal convierten esa duda en un número concreto.',
        },
        {
          q: '¿Puedo pedir el perdón I-601A desde mi país si ya salí?',
          a: 'No. El perdón provisional está diseñado para tramitarse mientras la persona todavía se encuentra dentro de Estados Unidos. Si ya salió, la ruta cambia a un perdón distinto que se solicita desde el extranjero, con otros requisitos y otros tiempos. Por eso el orden de los pasos importa tanto.',
        },
        {
          q: 'Tengo miedo de ser detenido y no me siento seguro quedándome. ¿Qué hago?',
          a: 'El miedo es legítimo y no hay que minimizarlo, pero decidir bajo presión en una semana mala suele costar años. Hay medidas de protección que se preparan sin salir del país: un plan familiar de emergencia, poderes notariales, cartas sobre el cuidado de los hijos y saber qué hacer si tocan la puerta. Eso se organiza en días.',
        },
        {
          q: 'Mi esposa y mis hijos son ciudadanos. ¿Ellos me pueden pedir si me voy?',
          a: 'Un familiar ciudadano puede presentar una petición, pero la petición sola no vence las barras de tres o diez años. Si ya salió con presencia ilegal acumulada, el consulado lo encontrará inadmisible y hará falta un perdón aprobado. Por eso la secuencia es analizar y perdonar primero, viajar después.',
        },
      ],
    },
    conclusion: {
      title: 'La decisión más cara es la que se toma con prisa',
      text: 'Nadie debería decidir el futuro de su familia con un mensaje reenviado o un video de treinta segundos. Irse puede ser la salida correcta para algunas personas y el error definitivo para otras, y la diferencia casi nunca está en las ganas de cumplir la ley: está en fechas, en documentos y en si existe o no un perdón aprobado antes del vuelo. La ley de inmigración no premia la buena intención; premia la secuencia correcta.',
      advice: 'Antes de inscribirse en cualquier programa, firmar cualquier documento o comprar cualquier boleto, pida su expediente y hable con un abogado de inmigración sobre su caso concreto.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'Ley de Inmigración y Nacionalidad (INA) § 212(a)(9)(B) — inadmisibilidad por presencia ilegal: barras de 3 y de 10 años',
        'INA § 212(a)(9)(C) — presencia ilegal seguida de reingreso sin admisión (barra permanente)',
        'INA § 240B — salida voluntaria: requisitos, plazos y consecuencias por incumplimiento',
        'USCIS — Formulario I-601A (perdón provisional por presencia ilegal) y Formulario I-212 (permiso para volver a solicitar admisión)',
        'USCIS — Formulario G-639 (solicitud FOIA); EOIR — información sobre casos ante la corte de inmigración',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'Self-Deportation: What They Don’t Tell You',
    metaDesc:
      'Before agreeing to leave on your own: the 3- and 10-year bars, the permanent bar, and the pending applications you lose by departing.',
    title: 'Self-Deportation: What the Government Does Not Tell You Before You Sign',
    displayDate: 'Aug 06, 2026',
    readTime: '10 min',
    categoryLabel: 'Deportation Defense',
    lastUpdated: 'August 6, 2026',
    summary: {
      title: 'Initial Summary',
      text: 'The campaign pushing people without status to leave the country on their own is still running in 2026: an official application, a stipend and help with the ticket, driven by letters, messages and mounting pressure. What almost nobody explains plainly is the legal side. Leaving after accruing unlawful presence can trigger a <strong>3-year or 10-year bar</strong> on returning, or even the <strong>permanent bar</strong>, and it can mean abandoning applications worth far more than the assistance being offered. For some people leaving is the right step, but only as part of a legal plan built <strong>before</strong> boarding the plane.',
    },
    intro: [
      'Every week people come into our offices with the same question, asked quietly: «is it better if I just leave on my own before they catch me?». They arrive with a letter, a message on their phone, or something they saw in a thirty-second video. Almost all of them heard the offer: an official application, a stipend and help with the trip. Almost none of them heard the other half.',
      'The other half is immigration law, and that does not change because of a communications campaign. Leaving the United States after living here without status <strong>does not erase your history: it activates it</strong>. It is the act of departing that switches on penalties that lay dormant while you were inside, and some of them last a decade or have no end date at all.',
      'This article will not tell you to stay or to go: that depends on dates and documents only an attorney who reviews your file can weigh. What it will do is lay out what a person is actually agreeing to when they say yes, when leaving is part of a legitimate strategy, and what to check before deciding.',
    ],
    sections: [
      {
        icon: 'phone',
        title: 'What is being offered and what the fine print says',
        subtitle: 'The offer',
        blocks: [
          {
            kind: 'text',
            text: 'The proposal comes down to this: a person without status registers through an official application, states that they will leave the country on their own and, in exchange, receives a stipend and help with the plane ticket. Around it sits an escalating pressure campaign: letters, text messages, phone calls and enforcement operations that make staying feel unsustainable.',
          },
          {
            kind: 'text',
            text: 'Before the legal consequences, four warnings about the offer itself:',
          },
          {
            kind: 'list',
            items: [
              '<strong>The terms change.</strong> Conditions, requirements and scope have been modified more than once and can change again. What someone told you three months ago may no longer be true.',
              '<strong>Registering means handing over information.</strong> By signing up you confirm to the government who you are, where you are, and that you acknowledge having no status. That does not disappear if you later change your mind.',
              '<strong>Nobody is giving you a waiver.</strong> The assistance is logistical. It does not erase a prior removal order, does not cancel reentry bars, and grants you no right to return.',
              '<strong>Identical scams are circulating.</strong> People charge to «enroll you» in official programs that charge nothing, and fake pages copy the official design. Never pay a private individual for a government process.',
            ],
          },
          {
            kind: 'note',
            text: 'This article was written with the information available as of August 6, 2026, and deliberately describes the program in general terms: amounts, requirements and conditions have changed and can change again without notice. Verify the current status through official sources and with an attorney before acting, not through social media.',
          },
        ],
      },
      {
        icon: 'balance',
        title: 'Informal departure and judge-ordered voluntary departure are not the same',
        subtitle: 'Three things people confuse',
        blocks: [
          {
            kind: 'text',
            text: 'People use one phrase, «voluntary departure», for situations that are legally very different. Confusing them costs years of family separation, and the confusion is easy because in all three the person ends up on the same plane.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Leaving on your own, no case',
                desc: 'No case in court and no removal order: the person simply departs. No removal order goes on the record, but the bars tied to unlawful presence already accrued are triggered.',
              },
              {
                title: 'Voluntary departure from a judge',
                desc: 'A formal remedy under INA § 240B. The judge grants it inside the case, with strict requirements and a fixed deadline to depart. It avoids a removal order, but does not erase the unlawful presence bars.',
              },
              {
                title: 'A removal order in disguise',
                desc: 'If you waive your hearing or accept a stipulated order because someone said it is «the fast way out», what remains is a formal deportation, with its own reentry bars.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Voluntary departure from a judge is not a favor: it requires prior physical presence, good moral character during the required period, the means to pay for your own travel and the absence of certain convictions, and it normally requires a bond. In exchange, you avoid carrying a removal order.',
          },
          {
            kind: 'warning',
            text: 'It carries a trap that destroys cases: if you do not depart within the exact period granted, the grant automatically converts into a removal order, a civil penalty is imposed, and you become ineligible for ten years for several forms of relief, including cancellation of removal and adjustment of status. The deadline does not stretch because the flight was expensive or because a relative got sick.',
          },
        ],
      },
      {
        icon: 'clock',
        title: 'What you lose by leaving: the 3-year and 10-year bars',
        subtitle: 'INA § 212(a)(9)(B)',
        blocks: [
          {
            kind: 'text',
            text: 'This is the part no campaign mentions and the one that decides most families’ futures. The law punishes unlawful presence accrued here, but the punishment <strong>only activates when you leave the country</strong>. While you remain inside, the bar exists only in potential; the moment you step out, it switches on.',
          },
          {
            kind: 'table',
            headers: ['Unlawful presence accrued', 'Consequence upon departure'],
            rows: [
              ['Less than 180 days', 'This bar is not triggered, though other grounds of inadmissibility may apply'],
              ['More than 180 days and less than one year', 'Inadmissible for 3 years from lawfully reentering'],
              ['One year or more', 'Inadmissible for 10 years from lawfully reentering'],
            ],
          },
          {
            kind: 'text',
            text: 'Time runs from when your authorized stay expired or from when you entered without inspection, with exceptions that matter: periods when the person was a minor and certain periods with bona fide pending applications are not always counted the same way. These are technical calculations made with the file and with verified dates, never from memory.',
          },
          {
            kind: 'note',
            text: 'A ten-year bar does not mean ten years standing in line. It means ten years outside the United States before you can even apply for the visa you cannot apply for today. In that time your citizen child turns eighteen, the house is lost and the business closes. That is the real price behind «I will just go for a while and fix it from there».',
          },
        ],
      },
      {
        icon: 'lock',
        title: 'The permanent bar: the mistake almost nobody sees coming',
        subtitle: 'INA § 212(a)(9)(C)',
        blocks: [
          {
            kind: 'text',
            text: 'There is a worse consequence, and it arrives through a sequence that sounds harmless: the person leaves the country, holds out a few months away from their children and, in desperation, enters again without inspection.',
          },
          {
            kind: 'text',
            text: 'If you accrued more than one year of unlawful presence in the aggregate, or if you were removed, and you then <strong>enter or attempt to enter again without being admitted</strong>, you fall under INA § 212(a)(9)(C): the permanent bar. No provisional waiver fixes it from inside the country. You must spend ten years physically outside the United States and only then request permission to reapply for admission, with no guarantee it will be granted.',
          },
          {
            kind: 'warning',
            text: 'This is the pattern we see over and over: someone leaves convinced they will «fix it from over there», cannot bear the separation, crosses again, and in that moment closes a door no attorney can reopen in the short term.',
          },
          {
            kind: 'text',
            text: 'On top of that, if a removal order already exists against you, departing separately triggers the bars under INA § 212(a)(9)(A), whose length depends on the type of order and whether there was more than one. They stack with the unlawful presence bars; you do not get to choose.',
          },
        ],
      },
      {
        icon: 'file',
        title: 'If you have a U visa, VAWA, asylum or a pending court case, leaving can kill it',
        subtitle: 'Abandoning applications',
        blocks: [
          {
            kind: 'text',
            text: 'Many of the people considering leaving already have something alive in their file and do not know it, or do not understand what it is worth. Leaving the country can switch it off overnight.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Pending asylum.</strong> Leaving with an asylum application pending is normally treated as abandonment. The years of waiting already accrued are lost and are not recovered.',
              '<strong>Cancellation of removal.</strong> It requires continuous physical presence over a long period. Absences break that continuity, and leaving while the case is in court amounts to abandoning the application. It is one of the most valuable forms of relief there is, and it disappears with a single flight.',
              '<strong>U petition as a crime victim.</strong> Leaving does not always cancel it, but it changes the path: the process moves to a consulate abroad, takes longer, and adds grounds of inadmissibility that must be waived before you can return.',
              '<strong>VAWA self-petition.</strong> Eligibility and the ability to adjust status inside the country depend on residence and presence requirements. Leaving can dismantle the route you had.',
              '<strong>TPS or any status requiring travel permission.</strong> Departing without the correct travel authorization can cost you the status you did have.',
              '<strong>An approved or pending family petition.</strong> It can be the foundation of a future legal route. Leaving without analyzing how it interacts with the bars can render it useless for a decade.',
            ],
          },
          {
            kind: 'note',
            text: 'Before deciding anything you have to know with certainty what is open. Many people believe they «have nothing» when in fact they have a petition approved years ago, or a scheduled hearing they never learned about because the notice went to an old address.',
          },
        ],
      },
      {
        icon: 'plane',
        title: 'The promise of returning legally, and why for most it is not real',
        subtitle: 'The fine print on coming back',
        blocks: [
          {
            kind: 'text',
            text: 'The most persuasive argument is this: leave now, of your own accord, and come back the legal way. It sounds reasonable. The problem is that «the legal way» is not a door you walk through when you decide to: it is a system with requirements most people in this situation do not meet.',
          },
          {
            kind: 'text',
            text: 'Immigrating legally almost always requires a <strong>qualifying petitioner</strong> — a close family member who is a citizen or permanent resident, or an employer — and an <strong>available visa category</strong>. There is no general line for «hardworking people who want to come back». Without a petitioner, the legal route is not slow: it does not exist.',
          },
          {
            kind: 'text',
            text: 'And if you do have one, you run straight into the bars you triggered by leaving. That is where the promise breaks: the person departs, waits, shows up at the consulate with everything in order, and is told they are inadmissible for ten years. Without a granted waiver there is no visa.',
          },
          {
            kind: 'warning',
            text: 'We have seen families sell the car and close the business trusting in a return «in a few months» that nobody promised them in writing. Travel assistance includes no commitment that you will be allowed back and accelerates no process. A future immigration benefit exists only when someone with authority approves it in a specific case.',
          },
        ],
      },
      {
        icon: 'check',
        title: 'When leaving CAN be part of a strategy',
        subtitle: 'The scenario where it works',
        blocks: [
          {
            kind: 'text',
            text: 'None of this means leaving is always a mistake. For some people it is exactly the right step, but in a very specific order: <strong>the waiver is resolved first, the departure comes second</strong>. Never the other way around.',
          },
          {
            kind: 'text',
            text: 'The typical case is consular processing with a provisional unlawful presence waiver, and each step matters as much as the one before it:',
          },
          {
            kind: 'steps',
            items: [
              'A qualifying family petitioner exists and a family petition has been filed and approved.',
              'It is verified that the only barrier to residency is the unlawful presence and not some other ground of inadmissibility.',
              'The provisional waiver (Form I-601A) is filed <strong>while still inside the United States</strong>, proving extreme hardship to a citizen or permanent resident spouse or parent.',
              'You wait for the waiver to be <strong>approved</strong>. Not the receipt confirming it was filed: the written approval.',
              'Only then do you leave the country for the consular interview, with a short, planned absence.',
            ],
          },
          {
            kind: 'text',
            text: 'The difference between this route and an improvised departure is the difference between a few weeks abroad and ten years abroad. The same person and the same consulate produce opposite outcomes depending on whether the waiver was approved before the flight.',
          },
          {
            kind: 'note',
            text: 'The provisional waiver covers unlawful presence, not everything else. Criminal history, prior fraud, repeated entries after accruing more than one year of unlawful presence, or earlier removal orders can put you outside this route. That is why the up-front analysis is the whole decision, not paperwork.',
          },
        ],
      },
      {
        icon: 'search',
        title: 'Before you decide: FOIA and a legal consultation, in that order',
        subtitle: 'What to do this week',
        blocks: [
          {
            kind: 'text',
            text: 'The worst decision is the one made on incomplete information, and almost nobody carries their full immigration history in their head. There are concrete steps you can take without leaving the country and without signing anything, and the order matters.',
          },
          {
            kind: 'steps',
            items: [
              '<strong>Request your file through FOIA.</strong> A Freedom of Information Act request to USCIS (Form G-639) gives you what the government has on record about you: prior applications, entries and departures, petitions filed on your behalf. Depending on your history, it is worth requesting from ICE and CBP as well.',
              '<strong>Confirm whether you have an open case in court.</strong> The immigration court case information system lets you verify whether hearings are scheduled or whether an in-absentia order was already entered without your knowledge.',
              '<strong>Gather your documents.</strong> Passport, entry and exit stamps, birth and marriage certificates, proof of address and of time in the country, your children’s medical and school records, and any paper immigration ever gave you.',
              '<strong>Talk to an attorney before enrolling in or signing anything.</strong> With the file in hand the conversation stops being an opinion and becomes a calculation: how much unlawful presence accrued, which bars departure would trigger, what is still open, and whether a waiver route exists.',
            ],
          },
          {
            kind: 'warning',
            text: 'Do not sign documents in English you do not understand, do not accept a «departure» without knowing whether it is the judge’s remedy or a removal order in disguise, and do not pay a notario or anyone who promises you a result. In immigration, a guaranteed result is the most reliable sign of fraud there is.',
          },
          {
            kind: 'note',
            text: 'If a removal order already exists against you, do not assume nothing can be done. Depending on the facts, a motion to reopen may be available, especially if the order was entered in absentia because the notice never reached you. That gets evaluated before you leave.',
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'If I leave on my own, do I avoid having a deportation on my record?',
          a: 'It depends on what you sign. Leaving when there is no case in court does not create a removal order, but it does trigger the unlawful presence bars. If instead you waive your hearing or accept a stipulated order, a formal deportation remains. Before you sign, someone has to read you exactly what document is in front of you.',
        },
        {
          q: 'Does the stipend or the ticket assistance give me any right to come back?',
          a: 'No. It is logistical and financial assistance, not an immigration benefit. It does not cancel prior orders, does not erase reentry bars, and creates no promise of future admission. Any later visa is evaluated from scratch under the same inadmissibility rules that apply to everyone.',
        },
        {
          q: 'I do not know how much unlawful presence I have accrued. How do I find out?',
          a: 'That is exactly the question you should not answer from memory. The calculation depends on entry dates, expiration of authorized stays, your age during those periods, and any pending applications. A FOIA file and a legal consultation turn that doubt into a concrete number.',
        },
        {
          q: 'Can I file the I-601A waiver from my home country if I already left?',
          a: 'No. The provisional waiver is designed to be filed while the person is still inside the United States. If you have already departed, the route changes to a different waiver requested from abroad, with different requirements and timelines. That is why the order of the steps matters so much.',
        },
        {
          q: 'I am afraid of being detained and I do not feel safe staying. What do I do?',
          a: 'The fear is legitimate and should not be minimized, but deciding under pressure during one bad week usually costs years. There are protective steps you can take without leaving: a family emergency plan, powers of attorney, letters about the care of your children, and knowing what to do if someone knocks. That can be organized in days.',
        },
        {
          q: 'My wife and children are citizens. Can they petition for me if I leave?',
          a: 'A citizen relative can file a petition, but the petition alone does not overcome the three- or ten-year bars. If you have already departed with unlawful presence accrued, the consulate will find you inadmissible and an approved waiver will be required. That is why the sequence is analyze and obtain the waiver first, travel afterward.',
        },
      ],
    },
    conclusion: {
      title: 'The most expensive decision is the one made in a hurry',
      text: 'No one should decide their family’s future on a forwarded message or a thirty-second video. Leaving can be the right way out for some people and the final mistake for others, and the difference almost never lies in willingness to follow the law: it lies in dates, in documents, and in whether an approved waiver exists before the flight. Immigration law does not reward good intentions; it rewards the correct sequence.',
      advice: 'Before enrolling in any program, signing any document or buying any ticket, request your file and speak with an immigration attorney about your specific case.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'Immigration and Nationality Act (INA) § 212(a)(9)(B) — inadmissibility for unlawful presence: the 3-year and 10-year bars',
        'INA § 212(a)(9)(C) — unlawful presence followed by reentry without admission (permanent bar)',
        'INA § 240B — voluntary departure: requirements, deadlines and consequences of failure to depart',
        'USCIS — Form I-601A (provisional unlawful presence waiver) and Form I-212 (permission to reapply for admission)',
        'USCIS — Form G-639 (FOIA request); EOIR — immigration court case information',
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
          ? 'Familia inmigrante revisando documentos antes de decidir salir del país'
          : 'Immigrant family reviewing documents before deciding whether to leave the country'
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
