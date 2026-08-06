import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'audiencia-fianza-90-dias-quinto-circuito-texas-2026';
const ISO_DATE = '2026-08-05';
// TODO(portada): sustituir cuando marketing entregue la imagen definitiva.
const IMAGE = '/og-default.jpg';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Fianza en 90 días: fallo del Quinto Circuito',
    metaDesc:
      'El Quinto Circuito exige audiencia de fianza dentro de 90 días en Texas, Luisiana y Misisipi, con la carga de la prueba del gobierno. Qué preparar y qué hacer hoy.',
    title: 'Detenido por ICE en Texas: el nuevo fallo que obliga a darte una audiencia de fianza en 90 días',
    displayDate: '05 Ago, 2026',
    readTime: '11 min',
    categoryLabel: 'Defensa contra Deportación',
    lastUpdated: '5 de agosto de 2026',
    summary: {
      title: 'Resumen inicial',
      text: 'Durante años, a muchas familias se les dijo lo mismo cuando un ser querido caía detenido: <strong>"no hay fianza, es detención obligatoria"</strong>. El 2 de julio de 2026 el Tribunal de Apelaciones del Quinto Circuito resolvió que, aun bajo esa etiqueta, el gobierno no puede mantener detenida a una persona indefinidamente sin darle una <strong>audiencia individualizada de custodia dentro de 90 días</strong>, y que en esa audiencia le corresponde al gobierno demostrar que la persona representa un peligro concreto o un riesgo de fuga. La decisión aplica en <strong>Texas, Luisiana y Misisipi</strong>. Esta guía explica qué cambia en la práctica, qué preparar para ganar esa audiencia y qué hacer en las primeras 48 horas.',
    },
    intro: [
      'Si está leyendo esto es probable que un familiar suyo esté detenido y que alguien ya le haya dicho que no hay nada que hacer. Antes de aceptar esa respuesta, hay algo que debe entender: <strong>"detención obligatoria" no significa "detención sin límite"</strong>, y esa distinción acaba de volverse mucho más importante en los estados donde este despacho trabaja.',
      'El 2 de julio de 2026, el Quinto Circuito —el tribunal federal de apelaciones que cubre Texas, Luisiana y Misisipi— resolvió que mantener a alguien encerrado durante meses sin una audiencia individual plantea un problema de debido proceso, y fijó los 90 días como el punto en el que esa audiencia debe ocurrir.',
      'Es un fallo reciente y su aplicación práctica todavía se está asentando en las cortes de inmigración de la región. Por eso este artículo se enfoca en lo que usted puede controlar: <strong>entender el marco, reunir la evidencia correcta y actuar dentro de los plazos</strong>. Texas concentra una parte enorme de las personas detenidas del país, así que esto no es un tecnicismo lejano.',
    ],
    sections: [
      {
        icon: 'gavel',
        title: 'Qué decidió el Quinto Circuito y a quién cubre',
        subtitle: 'Fallo del 2 de julio de 2026',
        blocks: [
          {
            kind: 'text',
            text: 'El punto central del fallo es el siguiente: aunque una persona esté clasificada dentro de una categoría de detención sin derecho automático a fianza, la detención prolongada sin revisión individual choca con el debido proceso. El tribunal fijó un umbral concreto —<strong>90 días</strong>— y, lo que más importa en la práctica, <strong>puso la carga de la prueba del lado del gobierno</strong>.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Dónde aplica:</strong> Texas, Luisiana y Misisipi, los estados bajo la jurisdicción del Quinto Circuito.',
              '<strong>Qué exige:</strong> una audiencia de custodia individualizada, no una revisión de trámite en papel.',
              '<strong>Quién debe probar qué:</strong> el gobierno tiene que demostrar peligro concreto o riesgo de fuga; no basta con invocar la categoría de detención.',
              '<strong>Qué NO hace:</strong> no libera a nadie automáticamente ni garantiza una fianza. Garantiza la audiencia y su estándar.',
            ],
          },
          {
            kind: 'note',
            text: 'Este fallo convive con decisiones anteriores del mismo circuito sobre qué autoridad tiene un juez de inmigración para fijar fianza según la vía por la que la persona entró al país. Cómo encajan exactamente unas con otras es una cuestión técnica que su abogado tiene que analizar con los hechos de su caso delante. <strong>Verifique el estado actual de esta jurisprudencia antes de tomar decisiones</strong>: es materia en movimiento.',
          },
        ],
      },
      {
        icon: 'lock',
        title: '"Detención obligatoria": por qué le dijeron que no había fianza',
        subtitle: 'De dónde viene esa respuesta',
        blocks: [
          {
            kind: 'text',
            text: 'La ley de inmigración contempla supuestos en los que la detención es la regla y no la excepción: ciertos antecedentes penales, ciertas formas de entrada y determinadas categorías de inadmisibilidad. Cuando ICE encuadra a alguien en una de esas categorías, la respuesta estándar que recibe la familia es que el juez "no tiene autoridad para dar fianza".',
          },
          {
            kind: 'text',
            text: 'Esa respuesta era, en muchos casos, una simplificación. Aun cuando el juez no pueda fijar una fianza ordinaria, siguen existiendo vías: cuestionar que la categoría aplique realmente, pedir revisión de custodia, y —tras este fallo— exigir la audiencia individualizada cuando la detención se prolonga.',
          },
          {
            kind: 'warning',
            text: 'Nunca acepte "no hay fianza" como respuesta final sin que un abogado revise el expediente. La clasificación que hace ICE al momento del arresto es una posición del gobierno, no una sentencia.',
          },
        ],
      },
      {
        icon: 'balance',
        title: 'Cómo funciona la audiencia y qué pesa en la decisión',
        subtitle: 'Lo que el juez realmente evalúa',
        blocks: [
          {
            kind: 'text',
            text: 'En una audiencia de custodia el juez pondera dos cosas: si la persona representa un peligro para la comunidad y si hay riesgo de que no se presente a sus audiencias futuras. Con la carga del lado del gobierno, la tarea de la defensa es demostrar arraigo y confiabilidad con evidencia concreta, no con afirmaciones.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Arraigo familiar:</strong> actas de nacimiento de hijos ciudadanos o residentes, acta de matrimonio, prueba de convivencia.',
              '<strong>Tiempo en el país:</strong> registros escolares, médicos, recibos, contratos de renta o declaraciones de impuestos que muestren años de presencia continua.',
              '<strong>Empleo:</strong> carta del patrón con puesto, antigüedad y salario, y disposición de reincorporarlo.',
              '<strong>Domicilio estable:</strong> contrato de arrendamiento o escritura, y carta de quien recibirá a la persona.',
              '<strong>Cartas de apoyo:</strong> de la comunidad, la iglesia, vecinos y compañeros de trabajo, firmadas y con datos de contacto.',
              '<strong>Historial de cumplimiento:</strong> comprobantes de haber asistido a citas previas con inmigración o a audiencias anteriores.',
              '<strong>Antecedentes:</strong> documentación completa de cualquier caso penal, incluidos los desechados, y prueba de rehabilitación cuando aplique.',
            ],
          },
          {
            kind: 'note',
            text: 'La calidad de este paquete cambia resultados de forma medible. Un expediente ordenado, con cartas firmadas y documentos legibles, comunica algo que un discurso no puede: que hay una red real esperando a esta persona afuera.',
          },
        ],
      },
      {
        icon: 'clock',
        title: 'Si pasan los 90 días y no hay audiencia',
        subtitle: 'La vía del habeas corpus',
        blocks: [
          {
            kind: 'text',
            text: 'Cuando el plazo transcurre sin que se celebre la audiencia, existe una herramienta que no vive en la corte de inmigración sino en la corte federal de distrito: la <strong>petición de habeas corpus</strong>. Es el mecanismo clásico para cuestionar la legalidad de una detención.',
          },
          {
            kind: 'steps',
            items: [
              'Documentar con precisión la <strong>fecha exacta en que empezó la detención</strong>: es el reloj que cuenta.',
              'Dejar constancia escrita de las solicitudes de audiencia presentadas y de sus respuestas.',
              'Presentar la petición en la <strong>corte federal del distrito donde la persona está detenida</strong>, no donde vive la familia.',
              'Sostener en paralelo la defensa del caso de fondo: el habeas ataca la detención, no resuelve la deportación.',
            ],
          },
          {
            kind: 'warning',
            text: 'Los traslados entre centros de detención son frecuentes y pueden cambiar la corte competente. Verifique la ubicación de su familiar antes de presentar cualquier escrito y vuelva a verificarla si deja de recibir llamadas.',
          },
        ],
      },
      {
        icon: 'siren',
        title: 'Las primeras 48 horas: qué hacer hoy',
        subtitle: 'La ventana donde más se pierde y más se gana',
        blocks: [
          {
            kind: 'steps',
            items: [
              '<strong>Localizar a la persona</strong> en el sistema de detenidos con su nombre completo y país de nacimiento, o con su número A si lo tienen.',
              '<strong>No firmar nada.</strong> Esto es lo más importante que puede transmitirle a su familiar. Firmar una salida voluntaria o una renuncia de derechos en las primeras horas cierra puertas que después no se reabren.',
              '<strong>Anotar el número A</strong> y guardarlo: es el identificador con el que se hace absolutamente todo.',
              '<strong>Reunir documentos de arraigo</strong> desde el primer día. No espere a que le pidan el paquete de fianza para empezar a juntarlo.',
              '<strong>Poner dinero en la cuenta de llamadas</strong> del centro de detención para poder hablar y coordinar.',
              '<strong>Contactar a un abogado</strong> y presentar el G-28 para que pueda actuar formalmente en el caso.',
            ],
          },
          {
            kind: 'note',
            text: 'Si su familiar tiene una solicitud pendiente —Visa U, VAWA, asilo, una petición familiar— dígaselo al abogado de inmediato. Eso puede cambiar por completo tanto la estrategia de custodia como la defensa de fondo.',
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Este fallo significa que mi familiar sale libre?',
          a: 'No. Lo que garantiza es el derecho a una audiencia individualizada dentro de un plazo y con la carga de la prueba del lado del gobierno. Si en esa audiencia se demuestra peligro o riesgo de fuga, la persona puede seguir detenida. Por eso el paquete de evidencia importa tanto.',
        },
        {
          q: 'Mi familiar está detenido en otro estado. ¿Le aplica?',
          a: 'El fallo vincula a las cortes dentro del Quinto Circuito: Texas, Luisiana y Misisipi. Fuera de esos estados rigen los criterios de otros circuitos. Como los traslados son comunes, verifique dónde está detenido hoy, no dónde fue arrestado.',
        },
        {
          q: '¿Cuánto cuesta una fianza de inmigración?',
          a: 'El monto lo fija el juez según el caso, y no hay una cifra estándar. Un paquete de arraigo bien preparado influye tanto en que se otorgue la fianza como en el monto. Los costos del caso los explica el abogado en la consulta.',
        },
        {
          q: 'Tiene antecedentes penales. ¿Tiene sentido intentarlo?',
          a: 'Sí, tiene sentido revisarlo. Muchas veces la clasificación de ICE se apoya en cargos que no terminaron en condena, en delitos que no encajan en la categoría invocada, o en registros incompletos. Ese análisis es precisamente lo que hace un abogado con el expediente penal en la mano.',
        },
        {
          q: '¿Puedo hacer todo esto sin abogado?',
          a: 'Legalmente puede, pero está compitiendo contra un abogado del gobierno en un procedimiento con reglas propias y plazos cortos. En custodia, la diferencia entre presentar un paquete completo a tiempo y presentarlo tarde o incompleto suele ser la diferencia entre salir y no salir.',
        },
      ],
    },
    conclusion: {
      title: 'El reloj corre desde el día del arresto',
      text: 'Este fallo abrió una puerta concreta para las familias de Texas, Luisiana y Misisipi, pero es una puerta que hay que empujar: exige contar los días, pedir la audiencia y llegar a ella con evidencia real de arraigo. Nada de eso ocurre solo.',
      advice: 'Si su familiar lleva semanas detenido y nadie le ha hablado de una audiencia de custodia, ese es el momento de llamar.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'Tribunal de Apelaciones del Quinto Circuito — decisión del 2 de julio de 2026 sobre revisión de custodia (verificar cita oficial y vigencia)',
        'Ley de Inmigración y Nacionalidad (INA) — disposiciones sobre detención y fianza',
        '28 U.S.C. § 2241 — petición de habeas corpus ante corte federal de distrito',
        'ICE — Sistema de localización de detenidos',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'Bond Hearing in 90 Days: Fifth Circuit Ruling',
    metaDesc:
      'The Fifth Circuit requires a bond hearing within 90 days in Texas, Louisiana and Mississippi, with the burden on the government. What to prepare and do today.',
    title: 'Detained by ICE in Texas: The New Ruling That Requires a Bond Hearing Within 90 Days',
    displayDate: 'Aug 05, 2026',
    readTime: '11 min',
    categoryLabel: 'Deportation Defense',
    lastUpdated: 'August 5, 2026',
    summary: {
      title: 'Initial Summary',
      text: 'For years families heard the same thing when a loved one was detained: <strong>"there is no bond, it is mandatory detention."</strong> On July 2, 2026 the Fifth Circuit Court of Appeals held that even under that label, the government cannot hold someone indefinitely without an <strong>individualized custody hearing within 90 days</strong>, and that at such a hearing it is the government that must show the person poses a concrete danger or a flight risk. The decision applies in <strong>Texas, Louisiana and Mississippi</strong>. This guide explains what changes in practice, what to prepare to win that hearing, and what to do in the first 48 hours.',
    },
    intro: [
      'If you are reading this, chances are a relative of yours is detained and someone has already told you there is nothing to be done. Before accepting that answer, understand one thing: <strong>"mandatory detention" does not mean "detention without limit,"</strong> and that distinction just became far more important in the states where this firm works.',
      'On July 2, 2026, the Fifth Circuit — the federal appeals court covering Texas, Louisiana and Mississippi — held that holding someone for months without an individual hearing raises a due process problem, and set 90 days as the point by which that hearing must occur.',
      'This is a recent ruling and its practical application is still settling in the region’s immigration courts. That is why this article focuses on what you can control: <strong>understanding the framework, gathering the right evidence, and acting within the deadlines</strong>. Texas holds a large share of the country’s detained population, so this is not a distant technicality.',
    ],
    sections: [
      {
        icon: 'gavel',
        title: 'What the Fifth Circuit decided and who it covers',
        subtitle: 'Ruling of July 2, 2026',
        blocks: [
          {
            kind: 'text',
            text: 'The core of the ruling is this: even where a person falls into a detention category with no automatic right to bond, prolonged detention without individual review collides with due process. The court set a concrete threshold — <strong>90 days</strong> — and, most importantly in practice, <strong>placed the burden of proof on the government</strong>.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Where it applies:</strong> Texas, Louisiana and Mississippi, the states within the Fifth Circuit.',
              '<strong>What it requires:</strong> an individualized custody hearing, not a paper review.',
              '<strong>Who must prove what:</strong> the government must show concrete danger or flight risk; invoking the detention category is not enough.',
              '<strong>What it does NOT do:</strong> it releases no one automatically and guarantees no bond. It guarantees the hearing and its standard.',
            ],
          },
          {
            kind: 'note',
            text: 'This ruling coexists with earlier decisions from the same circuit about what bond authority an immigration judge has depending on how the person entered. Exactly how they fit together is a technical question your attorney must analyze with your facts in hand. <strong>Verify the current state of this case law before making decisions</strong>: it is a moving area.',
          },
        ],
      },
      {
        icon: 'lock',
        title: '"Mandatory detention": why you were told there was no bond',
        subtitle: 'Where that answer comes from',
        blocks: [
          {
            kind: 'text',
            text: 'Immigration law contemplates situations where detention is the rule rather than the exception: certain criminal history, certain manners of entry, and specific inadmissibility categories. When ICE places someone in one of those categories, the standard answer families receive is that the judge "has no authority to set bond."',
          },
          {
            kind: 'text',
            text: 'That answer was, in many cases, an oversimplification. Even where a judge cannot set ordinary bond, avenues remain: challenging whether the category truly applies, seeking custody redetermination, and — after this ruling — demanding the individualized hearing when detention drags on.',
          },
          {
            kind: 'warning',
            text: 'Never accept "there is no bond" as the final answer without an attorney reviewing the file. The classification ICE makes at arrest is the government’s position, not a ruling.',
          },
        ],
      },
      {
        icon: 'balance',
        title: 'How the hearing works and what actually carries weight',
        subtitle: 'What the judge really weighs',
        blocks: [
          {
            kind: 'text',
            text: 'At a custody hearing the judge weighs two things: whether the person is a danger to the community and whether there is a risk they will not appear at future hearings. With the burden on the government, the defense’s job is to show ties and reliability with concrete evidence, not assertions.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Family ties:</strong> birth certificates of citizen or resident children, marriage certificate, proof of living together.',
              '<strong>Time in the country:</strong> school, medical, utility, lease or tax records showing years of continuous presence.',
              '<strong>Employment:</strong> a letter from the employer with position, tenure and wage, and willingness to take the person back.',
              '<strong>Stable housing:</strong> lease or deed, and a letter from whoever will receive the person.',
              '<strong>Support letters:</strong> from community, church, neighbors and coworkers, signed and with contact information.',
              '<strong>Compliance history:</strong> proof of attending prior immigration check-ins or hearings.',
              '<strong>Criminal history:</strong> complete documentation of any case, including dismissed ones, and proof of rehabilitation where applicable.',
            ],
          },
          {
            kind: 'note',
            text: 'The quality of this package measurably changes outcomes. An organized file, with signed letters and legible documents, communicates something a speech cannot: that there is a real network waiting for this person outside.',
          },
        ],
      },
      {
        icon: 'clock',
        title: 'If 90 days pass and there is no hearing',
        subtitle: 'The habeas corpus route',
        blocks: [
          {
            kind: 'text',
            text: 'When the deadline passes without a hearing, there is a tool that lives not in immigration court but in federal district court: the <strong>petition for habeas corpus</strong>. It is the classic mechanism for challenging the lawfulness of detention.',
          },
          {
            kind: 'steps',
            items: [
              'Document precisely the <strong>exact date detention began</strong>: that is the clock that counts.',
              'Keep written records of hearing requests filed and the responses received.',
              'File the petition in the <strong>federal district where the person is detained</strong>, not where the family lives.',
              'Keep pressing the underlying case in parallel: habeas attacks the detention, it does not resolve removal.',
            ],
          },
          {
            kind: 'warning',
            text: 'Transfers between detention centers are frequent and can change which court has jurisdiction. Verify your relative’s location before filing anything, and verify it again if calls stop coming.',
          },
        ],
      },
      {
        icon: 'siren',
        title: 'The first 48 hours: what to do today',
        subtitle: 'The window where most is lost and most is won',
        blocks: [
          {
            kind: 'steps',
            items: [
              '<strong>Locate the person</strong> in the detainee system using full name and country of birth, or the A-number if you have it.',
              '<strong>Sign nothing.</strong> This is the single most important message to get to your relative. Signing a voluntary departure or a waiver of rights in the first hours closes doors that do not reopen.',
              '<strong>Write down the A-number</strong> and keep it: it is the identifier used for absolutely everything.',
              '<strong>Start gathering ties evidence</strong> on day one. Do not wait until someone asks for a bond packet to begin.',
              '<strong>Put money on the detention center phone account</strong> so you can talk and coordinate.',
              '<strong>Contact an attorney</strong> and file the G-28 so they can formally act in the case.',
            ],
          },
          {
            kind: 'note',
            text: 'If your relative has a pending application — U visa, VAWA, asylum, a family petition — tell the attorney immediately. That can change both the custody strategy and the underlying defense entirely.',
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'Does this ruling mean my relative goes free?',
          a: 'No. What it guarantees is the right to an individualized hearing within a deadline, with the burden on the government. If danger or flight risk is shown at that hearing, the person can remain detained. That is why the evidence package matters so much.',
        },
        {
          q: 'My relative is detained in another state. Does it apply?',
          a: 'The ruling binds courts within the Fifth Circuit: Texas, Louisiana and Mississippi. Outside those states, other circuits’ standards govern. Because transfers are common, verify where the person is detained today, not where they were arrested.',
        },
        {
          q: 'How much does an immigration bond cost?',
          a: 'The amount is set by the judge based on the case, and there is no standard figure. A well-prepared ties package influences both whether bond is granted and the amount. Case costs are explained by the attorney in the consultation.',
        },
        {
          q: 'He has a criminal record. Is it still worth trying?',
          a: 'Yes, it is worth reviewing. Often ICE’s classification rests on charges that never became convictions, on offenses that do not fit the category invoked, or on incomplete records. That analysis is precisely what an attorney does with the criminal file in hand.',
        },
        {
          q: 'Can I do all of this without a lawyer?',
          a: 'Legally you can, but you are up against a government attorney in a proceeding with its own rules and short deadlines. In custody matters, the difference between filing a complete package on time and filing late or incomplete is often the difference between release and continued detention.',
        },
      ],
    },
    conclusion: {
      title: 'The clock runs from the day of arrest',
      text: 'This ruling opened a concrete door for families in Texas, Louisiana and Mississippi, but it is a door that has to be pushed: it requires counting the days, requesting the hearing, and arriving with real evidence of community ties. None of that happens on its own.',
      advice: 'If your relative has been detained for weeks and no one has mentioned a custody hearing, that is the moment to call.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'U.S. Court of Appeals for the Fifth Circuit — July 2, 2026 decision on custody review (verify official citation and current status)',
        'Immigration and Nationality Act (INA) — detention and bond provisions',
        '28 U.S.C. § 2241 — petition for habeas corpus in federal district court',
        'ICE — Online Detainee Locator System',
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
          ? 'Audiencia de fianza para detenidos por ICE en Texas'
          : 'Bond hearing for ICE detainees in Texas'
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
