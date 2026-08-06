import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'arrestos-ice-corte-inmigracion-fallo-2026';
const ISO_DATE = '2026-08-06';
// TODO(portada): sustituir cuando marketing entregue la imagen definitiva.
const IMAGE = '/og-default.jpg';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: '¿ICE puede arrestarte al salir de tu audiencia?',
    metaDesc:
      'Un juez federal anuló la política de arrestos de ICE en cortes de inmigración. Qué cambió, qué no cambió y por qué faltar a tu audiencia sigue siendo lo peor.',
    title: '¿Te pueden arrestar al salir de tu audiencia de inmigración? Lo que cambió con el fallo de junio 2026',
    displayDate: '06 Ago, 2026',
    readTime: '10 min',
    categoryLabel: 'Defensa contra Deportación',
    lastUpdated: '6 de agosto de 2026',
    summary: {
      title: 'Resumen inicial',
      text: 'Desde 2025 se volvió común algo que antes casi no pasaba: personas arrestadas por ICE <strong>en el pasillo, al salir de su propia audiencia</strong> de inmigración. El miedo que eso generó tiene una consecuencia devastadora y silenciosa: mucha gente dejó de ir a la corte. El <strong>23 de junio de 2026</strong> un juez federal anuló las políticas que habilitaban esa práctica. Este artículo explica qué cambió, qué <strong>no</strong> cambió —ICE conserva facultades de arresto— y por qué, pase lo que pase con ese litigio, <strong>faltar a su audiencia sigue siendo la peor decisión posible</strong>: produce una orden de deportación en ausencia sin que nadie escuche su caso.',
    },
    intro: [
      'Ir a la corte de inmigración siempre ha dado miedo. Lo que cambió en los últimos años es que ese miedo dejó de ser abstracto: circularon videos y testimonios de personas detenidas al terminar su audiencia, a veces después de que el propio gobierno pidiera cerrar su caso.',
      'El 23 de junio de 2026, un juez federal determinó que las agencias habían cambiado sus políticas de arresto en cortes sin la justificación que la ley exige, y anuló esas políticas. Es una victoria importante, pero conviene entenderla con precisión, sin exagerarla.',
      'Y hay algo que no depende de ningún fallo: <strong>si usted no se presenta a su audiencia, el juez puede ordenar su deportación en ausencia</strong>. Ese riesgo es del cien por ciento y ocurre sin que nadie escuche su historia. Todo lo que sigue está pensado para que pueda ir a su cita preparado, no para que deje de ir.',
    ],
    sections: [
      {
        icon: 'gavel',
        title: 'Qué venía pasando y qué decidió el juez',
        subtitle: 'La política anulada el 23 de junio de 2026',
        blocks: [
          {
            kind: 'text',
            text: 'A partir de una directriz de 2025, las cortes de inmigración dejaron de tratarse como espacios protegidos frente a la detención civil. La consecuencia fue una práctica concreta: agentes esperando afuera de la sala para detener a la persona apenas terminaba su audiencia.',
          },
          {
            kind: 'text',
            text: 'La resolución del 23 de junio de 2026 concluyó que ese cambio de política se hizo sin cumplir los requisitos legales que rigen a las agencias federales cuando modifican sus criterios, y dejó esas políticas sin efecto.',
          },
          {
            kind: 'note',
            text: 'Es un fallo sobre <strong>cómo se adoptó la política</strong>, no una declaración de que ICE nunca pueda arrestar a nadie. Esa diferencia es la clave para no leerlo como una protección absoluta. <strong>Verifique el estado del litigio</strong> antes de asumir cualquier cosa: este tipo de decisiones se apelan.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Lo que el fallo NO dice',
        subtitle: 'Dónde termina la protección',
        blocks: [
          {
            kind: 'text',
            text: 'Conviene ser claro, porque el optimismo mal informado también hace daño. El fallo no elimina las facultades de arresto de ICE ni le garantiza inmunidad a nadie por el hecho de estar en un tribunal.',
          },
          {
            kind: 'list',
            items: [
              'ICE <strong>conserva</strong> su facultad general de arrestar en el marco de la ley migratoria.',
              'Las <strong>órdenes de deportación previas</strong> siguen siendo ejecutables.',
              'La decisión puede ser <strong>apelada o modificada</strong>; no es necesariamente definitiva.',
              'Las prácticas pueden <strong>variar según la corte y la región</strong> mientras el litigio avanza.',
            ],
          },
          {
            kind: 'warning',
            text: 'Ir a su audiencia acompañado y con abogado no es desconfianza hacia el fallo: es prepararse para un escenario que todavía no está cerrado.',
          },
        ],
      },
      {
        icon: 'siren',
        title: 'La peor decisión posible: faltar a su audiencia',
        subtitle: 'La deportación en ausencia',
        blocks: [
          {
            kind: 'text',
            text: 'Si usted no se presenta, el juez puede ordenar su deportación <strong>en ausencia</strong>. No hay evaluación de su caso, no hay defensa, no hay oportunidad de explicar nada. La orden simplemente se emite.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Si va a su audiencia',
                desc: 'Su caso se escucha, puede presentar defensas y solicitar alivios, y el riesgo de arresto —hoy cuestionado judicialmente— es manejable con preparación.',
              },
              {
                title: 'Si no va',
                desc: 'Orden de deportación en ausencia prácticamente segura, pérdida de la posibilidad de pedir alivios y una orden ejecutable en cualquier momento, incluso años después.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Existen mociones para reabrir un caso cuando la ausencia se debió a circunstancias excepcionales o a que la notificación nunca llegó, pero son procedimientos difíciles, con plazos estrictos y sin resultado garantizado. Es infinitamente más fácil asistir que reabrir.',
          },
        ],
      },
      {
        icon: 'file',
        title: 'Orden judicial y orden administrativa: aprenda a distinguirlas',
        subtitle: 'La diferencia que decide si tiene que abrir la puerta',
        blocks: [
          {
            kind: 'text',
            text: 'Este punto vale para la corte y también para su casa. No todos los papeles que trae un agente son iguales, y la diferencia tiene efectos legales concretos.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Orden judicial',
                desc: 'La firma un juez, lleva el nombre de un tribunal y su nombre o dirección específicos. Es la que autoriza a entrar a un domicilio.',
              },
              {
                title: 'Orden administrativa (I-200 / I-205)',
                desc: 'La firma un oficial de inmigración, no un juez. NO autoriza entrar a una vivienda sin el consentimiento de quien vive ahí.',
              },
            ],
          },
          {
            kind: 'list',
            items: [
              'Pida que le <strong>pasen el documento por debajo de la puerta</strong> antes de abrir; abrir no es obligatorio.',
              'Revise si aparece la <strong>firma de un juez</strong> y el nombre de un tribunal.',
              'Verifique que <strong>su nombre y su dirección</strong> estén escritos correctamente.',
              'Tome una <strong>fotografía</strong> del documento si puede hacerlo con seguridad.',
            ],
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'Plan para el día de su corte',
        subtitle: 'Qué preparar y con quién ir',
        blocks: [
          {
            kind: 'steps',
            items: [
              '<strong>Confirme lugar y hora</strong> con anticipación y llegue temprano: llegar tarde puede contar como no haberse presentado.',
              '<strong>Vaya con su abogado</strong> y asegúrese de que el G-28 esté presentado en el expediente.',
              '<strong>Lleve un acompañante</strong> mayor de edad que pueda avisar a la familia si algo ocurre.',
              '<strong>Deje resuelto el cuidado de sus hijos</strong> ese día, con un adulto de confianza informado y disponible.',
              '<strong>Lleve una tarjeta</strong> con el teléfono de su abogado y de un familiar, y memorice al menos un número.',
              '<strong>No lleve documentos falsos</strong> ni de otra persona, bajo ninguna circunstancia.',
              '<strong>No firme nada</strong> que no haya leído y entendido, y menos si se lo presentan con prisa en un pasillo.',
            ],
          },
          {
            kind: 'note',
            text: 'Si tiene familiares con estatus, considere dejar preparado un poder notarial para el cuidado de menores. No es pesimismo: es lo mismo que hacer un testamento, se prepara para no necesitarlo.',
          },
        ],
      },
      {
        icon: 'balance',
        title: 'Si el gobierno pide "desestimar" su caso',
        subtitle: 'Cuando la buena noticia no lo es',
        blocks: [
          {
            kind: 'text',
            text: 'Durante el mismo periodo apareció una táctica que confunde a mucha gente: el fiscal del gobierno pide al juez que <strong>desestime</strong> el caso. Suena a victoria. En algunos escenarios ha funcionado como lo contrario, porque una persona fuera del proceso de corte puede quedar expuesta a vías de remoción mucho más rápidas, sin juez de por medio.',
          },
          {
            kind: 'text',
            text: 'Usted tiene derecho a <strong>oponerse</strong> a esa desestimación. Si se lo plantean en la sala, no responda que sí porque suene bien: pida hablar con su abogado antes.',
          },
          {
            kind: 'warning',
            text: 'Cargue siempre consigo evidencia de que lleva más de dos años en Estados Unidos. Es el tipo de prueba que puede marcar la diferencia frente a un procedimiento acelerado.',
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: 'Entonces, ¿ya es seguro ir a la corte?',
          a: 'El fallo eliminó la política que habilitaba los arrestos en cortes, lo cual reduce el riesgo, pero ICE conserva facultades generales y la decisión puede apelarse. Ir preparado y acompañado sigue siendo lo correcto. Lo que sí es seguro es que no ir produce una orden de deportación.',
        },
        {
          q: 'Tengo una orden de deportación vieja y una audiencia próxima. ¿Qué hago?',
          a: 'Hable con un abogado antes de la fecha, no después. Una orden previa cambia por completo el análisis y puede haber gestiones que convenga presentar de forma anticipada.',
        },
        {
          q: 'No me llegó la notificación de mi audiencia y no fui. ¿Tengo opciones?',
          a: 'Puede existir la posibilidad de pedir la reapertura del caso alegando falta de notificación, especialmente si usted había reportado su cambio de domicilio. Reúna toda la prueba de dónde vivía y consulte de inmediato: hay plazos.',
        },
        {
          q: '¿Puedo pedir que cambien mi audiencia de fecha por miedo?',
          a: 'El miedo por sí solo no suele ser motivo suficiente, y pedir aplazamientos sin fundamento puede perjudicar su caso. Lo que sí ayuda es llegar con abogado y con el expediente preparado.',
        },
        {
          q: '¿Mis hijos ciudadanos deben acompañarme?',
          a: 'En general es preferible que no. Un tribunal no es lugar para un menor y usted necesita concentrarse. Lo que sí conviene es tener resuelto quién los cuida ese día y que esa persona sepa qué hacer si usted no regresa a la hora prevista.',
        },
      ],
    },
    conclusion: {
      title: 'Vaya a su audiencia. Pero no vaya solo.',
      text: 'El fallo de junio de 2026 mejoró el panorama y demuestra que estas prácticas se pueden cuestionar en tribunales. Aun así, la conclusión práctica no cambia: presentarse a la corte es obligatorio y faltar tiene consecuencias inmediatas y automáticas, mientras que el riesgo en la sala se puede preparar y reducir.',
      advice: 'Si tiene audiencia en las próximas semanas, la consulta debe ser antes de la fecha, no después.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'Corte Federal de Distrito — resolución del 23 de junio de 2026 sobre políticas de arresto en cortes de inmigración (verificar cita oficial y estado de apelación)',
        'Ley de Inmigración y Nacionalidad (INA) § 240(b)(5) — orden de deportación en ausencia',
        'Ley de Inmigración y Nacionalidad (INA) § 235(b)(1) — remoción expedita',
        'Formularios I-200 e I-205 — órdenes administrativas de arresto y de remoción',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'Can ICE Arrest You Leaving Your Hearing?',
    metaDesc:
      'A federal judge vacated ICE courthouse arrest policies. What changed, what did not, and why missing your hearing is still the worst possible decision.',
    title: 'Can ICE Arrest You Leaving Your Immigration Hearing? What Changed With the June 2026 Ruling',
    displayDate: 'Aug 06, 2026',
    readTime: '10 min',
    categoryLabel: 'Deportation Defense',
    lastUpdated: 'August 6, 2026',
    summary: {
      title: 'Initial Summary',
      text: 'Since 2025 something that used to be rare became common: people arrested by ICE <strong>in the hallway, leaving their own immigration hearing</strong>. The fear this created has a devastating and quiet consequence: many people stopped going to court at all. On <strong>June 23, 2026</strong> a federal judge vacated the policies enabling that practice. This article explains what changed, what did <strong>not</strong> change — ICE retains arrest authority — and why, whatever happens with that litigation, <strong>missing your hearing remains the worst possible decision</strong>: it produces an in-absentia removal order without anyone hearing your case.',
    },
    intro: [
      'Going to immigration court has always been frightening. What changed in recent years is that the fear stopped being abstract: videos and accounts circulated of people detained as their hearing ended, sometimes after the government itself asked to close their case.',
      'On June 23, 2026, a federal judge found that the agencies had changed their courthouse arrest policies without the justification the law requires, and vacated those policies. That is an important win, but it should be understood precisely, without overstating it.',
      'And one thing depends on no ruling at all: <strong>if you do not appear at your hearing, the judge can order your removal in absentia</strong>. That risk is one hundred percent, and it happens without anyone hearing your story. Everything that follows is meant to help you attend prepared — not to stop attending.',
    ],
    sections: [
      {
        icon: 'gavel',
        title: 'What had been happening and what the judge decided',
        subtitle: 'The policy vacated on June 23, 2026',
        blocks: [
          {
            kind: 'text',
            text: 'Following a 2025 directive, immigration courts stopped being treated as protected spaces from civil detention. The result was a concrete practice: officers waiting outside the courtroom to detain the person as soon as the hearing ended.',
          },
          {
            kind: 'text',
            text: 'The June 23, 2026 decision concluded that this policy change was made without meeting the legal requirements that govern federal agencies when they revise their criteria, and set those policies aside.',
          },
          {
            kind: 'note',
            text: 'This is a ruling about <strong>how the policy was adopted</strong>, not a declaration that ICE can never arrest anyone. That distinction is the key to not reading it as absolute protection. <strong>Verify the litigation status</strong> before assuming anything: decisions like this get appealed.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'What the ruling does NOT say',
        subtitle: 'Where the protection ends',
        blocks: [
          {
            kind: 'text',
            text: 'Clarity matters here, because misinformed optimism also causes harm. The ruling does not eliminate ICE’s arrest authority, and it grants no one immunity simply for being in a courthouse.',
          },
          {
            kind: 'list',
            items: [
              'ICE <strong>retains</strong> its general authority to arrest under immigration law.',
              '<strong>Prior removal orders</strong> remain enforceable.',
              'The decision can be <strong>appealed or modified</strong>; it is not necessarily final.',
              'Practices may <strong>vary by court and region</strong> while the litigation proceeds.',
            ],
          },
          {
            kind: 'warning',
            text: 'Attending your hearing accompanied and with an attorney is not distrust of the ruling: it is preparing for a scenario that is not settled yet.',
          },
        ],
      },
      {
        icon: 'siren',
        title: 'The worst possible decision: missing your hearing',
        subtitle: 'In-absentia removal',
        blocks: [
          {
            kind: 'text',
            text: 'If you do not appear, the judge can order your removal <strong>in absentia</strong>. There is no evaluation of your case, no defense, no chance to explain anything. The order simply issues.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'If you attend',
                desc: 'Your case is heard, you can present defenses and request relief, and the arrest risk — now under judicial challenge — is manageable with preparation.',
              },
              {
                title: 'If you do not',
                desc: 'A near-certain in-absentia removal order, loss of the chance to request relief, and an order enforceable at any moment, even years later.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'Motions to reopen exist where the absence was due to exceptional circumstances or where notice never arrived, but they are difficult, deadline-bound, and far from guaranteed. Attending is infinitely easier than reopening.',
          },
        ],
      },
      {
        icon: 'file',
        title: 'Judicial warrant vs. administrative warrant: learn the difference',
        subtitle: 'What decides whether you must open the door',
        blocks: [
          {
            kind: 'text',
            text: 'This point applies at court and at home. Not every paper an officer carries is the same, and the difference has concrete legal effects.',
          },
          {
            kind: 'cards',
            items: [
              {
                title: 'Judicial warrant',
                desc: 'Signed by a judge, bears a court’s name and your specific name or address. This is the one that authorizes entry into a home.',
              },
              {
                title: 'Administrative warrant (I-200 / I-205)',
                desc: 'Signed by an immigration officer, not a judge. It does NOT authorize entry into a residence without the consent of someone who lives there.',
              },
            ],
          },
          {
            kind: 'list',
            items: [
              'Ask them to <strong>slide the document under the door</strong> before opening; opening is not required.',
              'Check whether it carries a <strong>judge’s signature</strong> and a court’s name.',
              'Verify that <strong>your name and address</strong> are written correctly.',
              'Take a <strong>photograph</strong> of the document if you can do so safely.',
            ],
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'A plan for your court day',
        subtitle: 'What to prepare and who to bring',
        blocks: [
          {
            kind: 'steps',
            items: [
              '<strong>Confirm location and time</strong> in advance and arrive early: arriving late can count as failing to appear.',
              '<strong>Go with your attorney</strong> and make sure the G-28 is on file.',
              '<strong>Bring an adult companion</strong> who can notify family if something happens.',
              '<strong>Arrange childcare</strong> for that day, with a trusted adult informed and available.',
              '<strong>Carry a card</strong> with your attorney’s and a relative’s phone number, and memorize at least one.',
              '<strong>Do not carry false documents</strong> or documents belonging to someone else, under any circumstance.',
              '<strong>Do not sign anything</strong> you have not read and understood, least of all if it is handed to you in a hurry in a hallway.',
            ],
          },
          {
            kind: 'note',
            text: 'If you have relatives with status, consider preparing a power of attorney for the care of minors. That is not pessimism: it is the same logic as a will — you prepare it so you do not need it.',
          },
        ],
      },
      {
        icon: 'balance',
        title: 'If the government moves to "dismiss" your case',
        subtitle: 'When good news is not',
        blocks: [
          {
            kind: 'text',
            text: 'During the same period a tactic appeared that confuses many people: the government attorney asks the judge to <strong>dismiss</strong> the case. It sounds like a win. In some scenarios it has worked as the opposite, because a person outside court proceedings can be exposed to much faster removal routes, with no judge involved.',
          },
          {
            kind: 'text',
            text: 'You have the right to <strong>oppose</strong> that dismissal. If it is raised in the courtroom, do not agree because it sounds good: ask to speak with your attorney first.',
          },
          {
            kind: 'warning',
            text: 'Always carry evidence that you have been in the United States more than two years. It is the kind of proof that can make the difference against an accelerated procedure.',
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'So is it safe to go to court now?',
          a: 'The ruling removed the policy enabling courthouse arrests, which reduces the risk, but ICE retains general authority and the decision may be appealed. Going prepared and accompanied is still the right approach. What is certain is that not going produces a removal order.',
        },
        {
          q: 'I have an old removal order and an upcoming hearing. What should I do?',
          a: 'Speak with an attorney before the date, not after. A prior order changes the analysis entirely and there may be filings worth making in advance.',
        },
        {
          q: 'I never received notice of my hearing and did not attend. Do I have options?',
          a: 'There may be a path to reopen the case based on lack of notice, especially if you had reported your change of address. Gather all proof of where you lived and consult immediately: deadlines apply.',
        },
        {
          q: 'Can I ask to reschedule my hearing because I am afraid?',
          a: 'Fear alone is generally not sufficient grounds, and unsupported continuance requests can hurt your case. What does help is arriving with an attorney and a prepared file.',
        },
        {
          q: 'Should my U.S. citizen children come with me?',
          a: 'Generally no. A courtroom is no place for a child and you need to concentrate. What does help is having childcare settled for the day, with that person knowing what to do if you are not back when expected.',
        },
      ],
    },
    conclusion: {
      title: 'Go to your hearing. But do not go alone.',
      text: 'The June 2026 ruling improved the picture and shows these practices can be challenged in court. Even so, the practical conclusion is unchanged: appearing is mandatory, missing carries immediate and automatic consequences, and the risk inside the courtroom is something you can prepare for and reduce.',
      advice: 'If you have a hearing in the coming weeks, the consultation belongs before the date, not after.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'U.S. District Court — June 23, 2026 decision on immigration courthouse arrest policies (verify official citation and appeal status)',
        'Immigration and Nationality Act (INA) § 240(b)(5) — in-absentia removal orders',
        'Immigration and Nationality Act (INA) § 235(b)(1) — expedited removal',
        'Forms I-200 and I-205 — administrative arrest and removal warrants',
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
          ? 'Arrestos de ICE al salir de la corte de inmigración'
          : 'ICE arrests outside immigration court'
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
