import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'green-card-detenido-aeropuerto-viajar-2026';
const ISO_DATE = '2026-08-06';
const IMAGE = '/blog/covers/green-card-detenido-aeropuerto-viajar-2026.jpg';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Green card y detención en el aeropuerto',
    metaDesc:
      'CBP puede tratar a residentes acusados de ciertos delitos como solicitantes de admisión. Quién está en riesgo, por qué nunca firmar el I-407 y qué revisar antes.',
    title: 'Tengo green card y me detuvieron en el aeropuerto: el nuevo riesgo para residentes que viajan',
    displayDate: '06 Ago, 2026',
    readTime: '11 min',
    categoryLabel: 'Procesos Migratorios',
    lastUpdated: '6 de agosto de 2026',
    summary: {
      title: 'Resumen inicial',
      text: 'Durante años, un residente permanente que volvía de un viaje corto entraba prácticamente sin fricción: la ley dice que <strong>no se le considera "solicitando admisión"</strong> salvo en supuestos concretos. Ese equilibrio se movió. Un fallo de la Corte Suprema de junio de 2026 avaló que CBP trate como solicitantes de admisión a residentes señalados por ciertos delitos, <strong>incluso sin condena firme</strong>, lo que abre la puerta a inspección secundaria, detención y proceso de remoción. Súmele un patrón documentado de presión para que la gente firme el <strong>formulario I-407</strong>, que renuncia a la residencia. Este artículo explica quién está realmente en riesgo, qué nunca debe firmar y qué revisar antes de comprar el boleto.',
    },
    intro: [
      'La tarjeta verde da una sensación de permanencia que la ley no respalda del todo, y el lugar donde esa distancia se nota más es la frontera. Cada vez que un residente regresa de un viaje, un oficial decide si lo trata como alguien que simplemente vuelve a casa o como alguien que <strong>pide permiso para entrar</strong>. Jurídicamente son dos escenarios muy distintos.',
      'La regla general lleva décadas siendo favorable al residente: quien vuelve <strong>no</strong> se considera solicitante de admisión, salvo que caiga en una lista corta y específica de excepciones —entre ellas, haber abandonado la residencia, haber estado fuera más de 180 días seguidos, o haber cometido ciertos delitos—.',
      'Lo que cambió en 2026 es cuánto peso puede darle CBP a una acusación que todavía no terminó en condena. Si usted tiene un antecedente penal, aunque sea antiguo o le parezca menor, o si viaja largas temporadas, esto le concierne directamente.',
    ],
    sections: [
      {
        icon: 'gavel',
        title: 'Qué cambió con el fallo de junio de 2026',
        subtitle: 'El punto que mueve el equilibrio',
        blocks: [
          {
            kind: 'text',
            text: 'La decisión avaló que CBP no aplique de forma automática la readmisión sin trámite y que pueda tratar como <strong>solicitante de admisión</strong> a un residente señalado o acusado de ciertos delitos, aun cuando no exista una condena firme. En la práctica eso habilita retenerlo en inspección secundaria, admitirlo bajo parole mientras se resuelve su situación, o iniciarle un proceso de remoción.',
          },
          {
            kind: 'note',
            text: 'Este es un fallo reciente y su aplicación concreta en puertos de entrada se está definiendo. <strong>Confirme el estado actual con un abogado antes de planear un viaje</strong> si tiene cualquier antecedente penal, por menor que le parezca.',
          },
        ],
      },
      {
        icon: 'search',
        title: 'Quién está realmente en riesgo',
        subtitle: 'No es todo el mundo, pero es más gente de la que cree',
        blocks: [
          {
            kind: 'text',
            text: 'La mayoría de los residentes que viajan dos semanas de vacaciones y no tienen antecedentes seguirán entrando sin problema. El riesgo se concentra en perfiles identificables:',
          },
          {
            kind: 'list',
            items: [
              '<strong>Cualquier antecedente penal</strong>, aunque sea de hace veinte años, aunque haya sido un caso "arreglado" o desechado, y aunque nunca haya pisado la cárcel.',
              '<strong>Cargos pendientes</strong> sin resolver, que es justo el escenario que el fallo vuelve más delicado.',
              '<strong>Ausencias mayores a 180 días</strong> continuos: activan por sí solas la revisión como solicitante de admisión.',
              '<strong>Ausencias de más de un año</strong> sin permiso de reingreso: presunción de abandono.',
              '<strong>Residentes condicionales</strong> con la petición de eliminar condiciones pendiente.',
              '<strong>Viajes muy frecuentes o muy largos</strong> que sugieran que su vida real está en otro país.',
            ],
          },
          {
            kind: 'warning',
            text: 'Un caso penal que su abogado penalista calificó de "sin consecuencias" puede tener consecuencias migratorias completamente distintas. La pregunta no es si fue grave en la corte penal, sino cómo lo clasifica la ley de inmigración.',
          },
        ],
      },
      {
        icon: 'lock',
        title: 'NUNCA firme el I-407',
        subtitle: 'La sección más importante de este artículo',
        blocks: [
          {
            kind: 'text',
            text: 'El formulario I-407 es un registro de <strong>abandono voluntario</strong> de la residencia permanente. Firmarlo es entregar su green card por su propia voluntad. Y aquí está lo esencial: <strong>solo un juez de inmigración puede quitarle la residencia</strong>. Un oficial en un aeropuerto no puede, salvo que usted se la entregue firmando.',
          },
          {
            kind: 'list',
            items: [
              'Firmar el I-407 es <strong>voluntario</strong>. Puede negarse.',
              'Negarse no es un delito y no lo convierte en una persona no cooperativa ante la ley.',
              'Si le dicen que "de todos modos va a perder la residencia", pida hablar con un abogado antes de firmar nada.',
              'Si le insisten, diga con calma que <strong>desea ver a un juez de inmigración</strong>. Ese es su derecho como residente.',
              'Si ya firmó, <strong>no asuma que todo terminó</strong>: consulte de inmediato, hay argumentos cuando la firma se obtuvo bajo presión o sin entender el documento.',
            ],
          },
          {
            kind: 'note',
            text: 'La presión suele llegar después de muchas horas de espera, cansancio y sin intérprete adecuado. Ese contexto no es casual, y es exactamente cuando conviene repetir una sola frase: "no voy a firmar nada sin hablar con mi abogado".',
          },
        ],
      },
      {
        icon: 'plane',
        title: 'Inspección secundaria: qué puede pasar y qué derechos tiene',
        subtitle: 'El cuarto de atrás',
        blocks: [
          {
            kind: 'text',
            text: 'La inspección secundaria es una sala aparte donde lo mandan cuando quieren revisar algo con más calma. Puede durar horas. Conviene saber de antemano qué esperar.',
          },
          {
            kind: 'list',
            items: [
              'Le pueden hacer <strong>preguntas detalladas</strong> sobre su viaje, su domicilio, su trabajo y sus vínculos familiares.',
              'Le pueden <strong>revisar el teléfono y la computadora</strong>. Las búsquedas de dispositivos en la frontera tienen reglas distintas a las del interior del país.',
              'Le pueden pedir que <strong>firme documentos</strong>. No está obligado a firmar lo que no entiende.',
              'Como residente, si le imputan alguna causa de inadmisibilidad, <strong>tiene derecho a que un juez de inmigración lo resuelva</strong>: no lo pueden expulsar sumariamente igual que a alguien sin estatus.',
              'Puede <strong>pedir hablar con un abogado</strong>. En inspección no siempre se concede de inmediato, pero pedirlo y que quede constancia importa.',
            ],
          },
          {
            kind: 'warning',
            text: 'No mienta ni minimice un antecedente. Una respuesta falsa a un oficial federal crea un problema nuevo y peor que el original, y puede convertir un asunto discutible en un caso de fraude.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'Checklist antes de comprar el boleto',
        subtitle: 'Lo que se revisa en una consulta previa al viaje',
        blocks: [
          {
            kind: 'steps',
            items: [
              '<strong>Revise su récord penal completo</strong>, incluidos casos desechados, diferidos o de hace décadas. Pida los registros a la corte si no los tiene.',
              '<strong>Analice cómo clasifica inmigración esos hechos</strong>, que casi nunca coincide con cómo los clasificó la corte penal.',
              '<strong>Calcule sus días fuera del país</strong> en los últimos años, viaje por viaje.',
              'Si planea salir <strong>más de un año</strong>, tramite el permiso de reingreso (I-131) <strong>antes</strong> de salir.',
              'Lleve <strong>evidencia de arraigo</strong>: declaraciones de impuestos, contrato de renta o escritura, recibos, carta de trabajo, escuela de sus hijos.',
              'Guarde el <strong>teléfono de su abogado</strong> en papel, no solo en el celular que quizá le pidan.',
              'Avise a un familiar de su <strong>vuelo y hora de llegada</strong>, para que note si no sale del aeropuerto.',
            ],
          },
          {
            kind: 'note',
            text: 'Una consulta antes de viajar cuesta mucho menos que resolver una detención desde adentro. Y si el análisis concluye que hay riesgo real, todavía está a tiempo de no subirse al avión.',
          },
        ],
      },
      {
        icon: 'globe',
        title: 'Viajes largos y la trampa del abandono',
        subtitle: 'Perder la residencia sin que nadie se la quite',
        blocks: [
          {
            kind: 'text',
            text: 'Hay una segunda forma de perder la green card que no involucra ningún delito: el <strong>abandono</strong>. La residencia exige que Estados Unidos sea su domicilio real, no una dirección de correo.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Más de 180 días fuera',
                desc: 'Al regresar puede ser tratado como solicitante de admisión. Es un umbral concreto que conviene tener presente al planear estancias largas.',
              },
              {
                title: 'Más de un año fuera',
                desc: 'Se presume abandono. El permiso de reingreso (I-131) sirve para preservar la residencia, pero hay que tramitarlo estando en EE.UU. y antes de salir.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Ni siquiera un permiso de reingreso garantiza por sí solo que no haya un hallazgo de abandono: lo que se evalúa es la intención, y esa se demuestra con hechos —dónde declara impuestos, dónde vive su familia, dónde tiene su casa y su trabajo—.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Marihuana legal en su estado, DUI y "vileza moral"',
        subtitle: 'Por qué siguen contando en la frontera',
        blocks: [
          {
            kind: 'text',
            text: 'Aquí es donde más gente se equivoca de buena fe. La frontera se rige por ley <strong>federal</strong>, y para la ley federal la marihuana sigue siendo una sustancia controlada, aunque su estado la haya legalizado.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Admitir consumo de marihuana</strong> ante un oficial —aunque sea legal donde usted vive y aunque nunca lo hayan arrestado— puede generar un problema de inadmisibilidad.',
              'Trabajar en la <strong>industria del cannabis</strong>, siendo legal en su estado, ha generado problemas en puertos de entrada.',
              'Un <strong>DUI</strong> no es automáticamente un delito de vileza moral, pero múltiples DUI o un DUI agravado sí pueden pesar.',
              'Los <strong>delitos de vileza moral</strong> son una categoría de inmigración que no coincide con las etiquetas del derecho penal estatal: hay que analizar el estatuto concreto.',
            ],
          },
          {
            kind: 'warning',
            text: 'No responda preguntas sobre consumo de drogas asumiendo que decir la verdad "queda mejor". Ese es un tema para hablar con un abogado antes del viaje, no para improvisar en una sala de inspección.',
          },
        ],
      },
      {
        icon: 'phone',
        title: 'Si un familiar quedó retenido en el aeropuerto',
        subtitle: 'Qué hacer desde afuera',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Anote <strong>aerolínea, número de vuelo, hora de llegada y terminal</strong>: es lo que permite ubicarlo.',
              '<strong>No se vaya del aeropuerto</strong> de inmediato si puede esperar; a veces salen tras varias horas.',
              'Contacte a un <strong>abogado de inmigración</strong> cuanto antes: las primeras horas son las que más pesan.',
              'Reúna copia de su <strong>green card, pasaporte y evidencia de arraigo</strong> para poder enviarlas rápido.',
              'Si le informan que fue detenido, pida el <strong>número A</strong> y busque su ubicación en el sistema de detenidos.',
              'Transmítale un solo mensaje si logra hablar con él: <strong>que no firme nada</strong>.',
            ],
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: 'Tengo un delito menor de hace 15 años y he viajado sin problemas. ¿Debo preocuparme?',
          a: 'Que no le haya pasado nada antes no significa que el criterio sea el mismo hoy. Los sistemas se cruzan cada vez mejor y las políticas cambian. Una revisión de su récord antes del próximo viaje es la forma barata de saberlo.',
        },
        {
          q: '¿Me pueden quitar la green card en el aeropuerto?',
          a: 'Un oficial no puede quitársela por decisión propia: solo un juez de inmigración puede ordenar la pérdida de la residencia. Lo que sí puede pasar es que le pidan firmar el I-407 para que usted la entregue voluntariamente. Por eso no debe firmarlo.',
        },
        {
          q: 'Estuve fuera 8 meses cuidando a mi mamá enferma. ¿Perdí la residencia?',
          a: 'No automáticamente, pero superó los 180 días y eso permite tratarlo como solicitante de admisión al regresar. La evidencia de que su vida sigue en Estados Unidos y de que el viaje tuvo una causa concreta y temporal es lo que sostiene su caso.',
        },
        {
          q: '¿Pueden revisar mi teléfono?',
          a: 'Las búsquedas de dispositivos en la frontera tienen reglas más amplias que en el interior del país. Vale la pena entender qué lleva en el teléfono antes de viajar y consultar sobre este punto en particular.',
        },
        {
          q: '¿Es mejor hacerme ciudadano para no pasar por esto?',
          a: 'La naturalización elimina este riesgo de raíz, pero el proceso N-400 también revisa antecedentes y buen carácter moral. Si tiene un récord penal, la solicitud debe analizarse antes de presentarla, no después.',
        },
      ],
    },
    conclusion: {
      title: 'La green card no es inmune, y la frontera es donde se nota',
      text: 'Para la mayoría de los residentes que viajan sin antecedentes y por periodos cortos, nada de esto cambiará su próximo viaje. Para quienes tienen un récord penal —por antiguo o menor que parezca— o pasan largas temporadas fuera, el panorama de 2026 es más estrecho que el de hace unos años.',
      advice: 'Revise su récord antes de comprar el boleto. Es la única parte de este problema que todavía está bajo su control.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'Corte Suprema de Estados Unidos — decisión de junio de 2026 sobre residentes tratados como solicitantes de admisión (verificar cita oficial y alcance)',
        'Ley de Inmigración y Nacionalidad (INA) § 101(a)(13)(C) — cuándo un residente que regresa se considera solicitando admisión',
        'Ley de Inmigración y Nacionalidad (INA) § 212(a)(2) — inadmisibilidad por motivos penales',
        'USCIS — Formulario I-131, permiso de reingreso',
        'Formulario I-407 — Registro de abandono de la residencia permanente legal',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'Green Card Detained at the Airport in 2026',
    metaDesc:
      'CBP may treat residents accused of certain crimes as applicants for admission. Who is at risk, why never to sign the I-407, and what to review before traveling.',
    title: 'I Have a Green Card and Was Detained at the Airport: The New Risk for Residents Who Travel',
    displayDate: 'Aug 06, 2026',
    readTime: '11 min',
    categoryLabel: 'Immigration Process',
    lastUpdated: 'August 6, 2026',
    summary: {
      title: 'Initial Summary',
      text: 'For years, a permanent resident returning from a short trip re-entered with almost no friction: the law says a returning resident is <strong>not regarded as "seeking admission"</strong> except in specific situations. That balance shifted. A June 2026 Supreme Court ruling allowed CBP to treat residents flagged for certain crimes as applicants for admission <strong>even without a final conviction</strong>, opening the door to secondary inspection, detention and removal proceedings. Add to that a documented pattern of pressure to sign <strong>Form I-407</strong>, which surrenders residence. This article explains who is actually at risk, what you must never sign, and what to review before buying a ticket.',
    },
    intro: [
      'A green card conveys a sense of permanence the law does not fully support, and the place that gap shows most is the border. Every time a resident returns from a trip, an officer decides whether to treat them as someone simply coming home or as someone <strong>asking permission to enter</strong>. Legally, those are two very different scenarios.',
      'The general rule has favored residents for decades: someone returning is <strong>not</strong> treated as an applicant for admission unless they fall within a short, specific list of exceptions — among them abandoning residence, being away more than 180 continuous days, or having committed certain offenses.',
      'What changed in 2026 is how much weight CBP can give an accusation that has not yet ended in conviction. If you have any criminal record, however old or minor it may seem, or if you travel for long stretches, this concerns you directly.',
    ],
    sections: [
      {
        icon: 'gavel',
        title: 'What changed with the June 2026 ruling',
        subtitle: 'The point that shifts the balance',
        blocks: [
          {
            kind: 'text',
            text: 'The decision allowed CBP not to apply automatic readmission and to treat as an <strong>applicant for admission</strong> a resident flagged or charged with certain offenses, even absent a final conviction. In practice that enables holding them in secondary inspection, admitting them on parole while the situation is resolved, or initiating removal proceedings.',
          },
          {
            kind: 'note',
            text: 'This is a recent ruling and its concrete application at ports of entry is still taking shape. <strong>Confirm the current state with an attorney before planning a trip</strong> if you have any criminal record, however minor it may seem.',
          },
        ],
      },
      {
        icon: 'search',
        title: 'Who is actually at risk',
        subtitle: 'Not everyone, but more people than you would think',
        blocks: [
          {
            kind: 'text',
            text: 'Most residents traveling for a two-week vacation with no record will keep entering without trouble. The risk concentrates in identifiable profiles:',
          },
          {
            kind: 'list',
            items: [
              '<strong>Any criminal record</strong>, even from twenty years ago, even a case that was "taken care of" or dismissed, even if you never spent a day in jail.',
              '<strong>Pending charges</strong> that remain unresolved — precisely the scenario the ruling makes more delicate.',
              '<strong>Absences longer than 180 continuous days</strong>: on their own they trigger review as an applicant for admission.',
              '<strong>Absences longer than one year</strong> without a reentry permit: presumption of abandonment.',
              '<strong>Conditional residents</strong> with a pending petition to remove conditions.',
              '<strong>Very frequent or very long trips</strong> suggesting your real life is in another country.',
            ],
          },
          {
            kind: 'warning',
            text: 'A criminal case your defense lawyer described as "no consequences" can carry entirely different immigration consequences. The question is not how serious it was in criminal court, but how immigration law classifies it.',
          },
        ],
      },
      {
        icon: 'lock',
        title: 'NEVER sign the I-407',
        subtitle: 'The most important section of this article',
        blocks: [
          {
            kind: 'text',
            text: 'Form I-407 is a record of <strong>voluntary abandonment</strong> of permanent residence. Signing it means handing over your green card of your own accord. And here is what matters: <strong>only an immigration judge can take your residence away</strong>. An officer at an airport cannot — unless you give it to them by signing.',
          },
          {
            kind: 'list',
            items: [
              'Signing the I-407 is <strong>voluntary</strong>. You may decline.',
              'Declining is not a crime and does not make you uncooperative in the eyes of the law.',
              'If you are told you "will lose residence anyway," ask to speak with an attorney before signing anything.',
              'If they insist, calmly say that you <strong>wish to see an immigration judge</strong>. That is your right as a resident.',
              'If you already signed, <strong>do not assume it is over</strong>: consult immediately — there are arguments when a signature was obtained under pressure or without understanding the document.',
            ],
          },
          {
            kind: 'note',
            text: 'Pressure usually arrives after many hours of waiting, exhaustion and without an adequate interpreter. That context is not accidental, and it is exactly when to repeat one sentence: "I am not signing anything without speaking to my attorney."',
          },
        ],
      },
      {
        icon: 'plane',
        title: 'Secondary inspection: what can happen and what rights you have',
        subtitle: 'The back room',
        blocks: [
          {
            kind: 'text',
            text: 'Secondary inspection is a separate room where you are sent when officers want to review something more slowly. It can last hours. It helps to know in advance what to expect.',
          },
          {
            kind: 'list',
            items: [
              'You may face <strong>detailed questions</strong> about your trip, home, job and family ties.',
              'They may <strong>search your phone and laptop</strong>. Device searches at the border follow different rules than inside the country.',
              'They may ask you to <strong>sign documents</strong>. You are not obligated to sign what you do not understand.',
              'As a resident, if they allege a ground of inadmissibility, <strong>you have the right to have an immigration judge decide</strong>: you cannot be summarily removed the way someone without status can.',
              'You may <strong>ask to speak with an attorney</strong>. It is not always granted immediately in inspection, but asking and having it noted matters.',
            ],
          },
          {
            kind: 'warning',
            text: 'Do not lie or minimize a record. A false answer to a federal officer creates a new and worse problem than the original one, and can turn a debatable issue into a fraud case.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'Checklist before buying the ticket',
        subtitle: 'What a pre-travel consultation reviews',
        blocks: [
          {
            kind: 'steps',
            items: [
              '<strong>Pull your complete criminal record</strong>, including dismissed, deferred or decades-old cases. Request the court records if you do not have them.',
              '<strong>Analyze how immigration classifies those facts</strong>, which rarely matches how criminal court classified them.',
              '<strong>Count your days outside the country</strong> over recent years, trip by trip.',
              'If you plan to be away <strong>more than a year</strong>, file for the reentry permit (I-131) <strong>before</strong> leaving.',
              'Carry <strong>evidence of ties</strong>: tax returns, lease or deed, utility bills, employment letter, your children’s school records.',
              'Keep your <strong>attorney’s phone number on paper</strong>, not only on the phone they may ask to inspect.',
              'Tell a relative your <strong>flight and arrival time</strong>, so they notice if you do not come out of the airport.',
            ],
          },
          {
            kind: 'note',
            text: 'A consultation before traveling costs far less than resolving a detention from the inside. And if the analysis concludes there is real risk, you are still in time not to board.',
          },
        ],
      },
      {
        icon: 'globe',
        title: 'Long trips and the abandonment trap',
        subtitle: 'Losing residence without anyone taking it',
        blocks: [
          {
            kind: 'text',
            text: 'There is a second way to lose a green card that involves no crime at all: <strong>abandonment</strong>. Residence requires that the United States be your actual home, not a mailing address.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'More than 180 days away',
                desc: 'On return you may be treated as an applicant for admission. It is a concrete threshold worth keeping in mind when planning long stays.',
              },
              {
                title: 'More than one year away',
                desc: 'Abandonment is presumed. A reentry permit (I-131) helps preserve residence, but it must be filed while in the U.S. and before departing.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Even a reentry permit does not by itself guarantee against an abandonment finding: what is evaluated is intent, and intent is shown with facts — where you file taxes, where your family lives, where your home and job are.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'State-legal marijuana, DUI and "moral turpitude"',
        subtitle: 'Why they still count at the border',
        blocks: [
          {
            kind: 'text',
            text: 'This is where most people go wrong in good faith. The border runs on <strong>federal</strong> law, and under federal law marijuana remains a controlled substance, even if your state legalized it.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Admitting marijuana use</strong> to an officer — even where it is legal where you live and even if you were never arrested — can create an inadmissibility problem.',
              'Working in the <strong>cannabis industry</strong>, legal in your state, has caused problems at ports of entry.',
              'A <strong>DUI</strong> is not automatically a crime involving moral turpitude, but multiple DUIs or an aggravated DUI can weigh.',
              '<strong>Crimes involving moral turpitude</strong> are an immigration category that does not match state criminal labels: the specific statute has to be analyzed.',
            ],
          },
          {
            kind: 'warning',
            text: 'Do not answer questions about drug use assuming that telling the truth "looks better." That is a topic to discuss with an attorney before the trip, not to improvise in an inspection room.',
          },
        ],
      },
      {
        icon: 'phone',
        title: 'If a relative is being held at the airport',
        subtitle: 'What to do from outside',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Write down <strong>airline, flight number, arrival time and terminal</strong>: that is what allows locating them.',
              '<strong>Do not leave the airport</strong> immediately if you can wait; people sometimes come out after several hours.',
              'Contact an <strong>immigration attorney</strong> as soon as possible: the first hours carry the most weight.',
              'Gather copies of their <strong>green card, passport and evidence of ties</strong> so you can send them quickly.',
              'If told they were detained, ask for the <strong>A-number</strong> and look up their location in the detainee system.',
              'If you manage to speak with them, deliver one message: <strong>sign nothing</strong>.',
            ],
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'I have a minor offense from 15 years ago and have traveled without problems. Should I worry?',
          a: 'That nothing happened before does not mean the standard is the same today. Systems cross-reference better every year and policies change. Reviewing your record before the next trip is the cheap way to find out.',
        },
        {
          q: 'Can they take my green card at the airport?',
          a: 'An officer cannot take it on their own authority: only an immigration judge can order loss of residence. What can happen is being asked to sign the I-407 so that you surrender it voluntarily. That is why you should not sign it.',
        },
        {
          q: 'I was away 8 months caring for my sick mother. Did I lose residence?',
          a: 'Not automatically, but you exceeded 180 days, which allows treating you as an applicant for admission on return. Evidence that your life remains in the United States and that the trip had a concrete, temporary cause is what supports your case.',
        },
        {
          q: 'Can they search my phone?',
          a: 'Device searches at the border follow broader rules than inside the country. It is worth understanding what is on your phone before traveling and consulting on this point specifically.',
        },
        {
          q: 'Is it better to naturalize so I do not go through this?',
          a: 'Naturalization eliminates this risk at the root, but the N-400 process also reviews criminal history and good moral character. If you have a record, the application should be analyzed before filing, not after.',
        },
      ],
    },
    conclusion: {
      title: 'A green card is not immune, and the border is where that shows',
      text: 'For most residents traveling without a record and for short periods, none of this will change their next trip. For those with a criminal record — however old or minor it seems — or who spend long stretches abroad, the 2026 landscape is narrower than it was a few years ago.',
      advice: 'Review your record before buying the ticket. It is the only part of this problem still within your control.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'U.S. Supreme Court — June 2026 decision on residents treated as applicants for admission (verify official citation and scope)',
        'Immigration and Nationality Act (INA) § 101(a)(13)(C) — when a returning resident is regarded as seeking admission',
        'Immigration and Nationality Act (INA) § 212(a)(2) — criminal grounds of inadmissibility',
        'USCIS — Form I-131, reentry permit',
        'Form I-407 — Record of Abandonment of Lawful Permanent Resident Status',
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
          ? 'Residente permanente en inspección secundaria en un aeropuerto'
          : 'Permanent resident in secondary inspection at an airport'
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
