import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'manejar-sin-licencia-parada-transito-ice-287g';
// Debe coincidir con `date` del post en ALL_POSTS (app/[lang]/blog/page.tsx):
// antes de esa fecha la página no se publica.
const ISO_DATE = '2026-11-11';
const IMAGE = '/blog/blog_42/NOV_B2.jpg';

const LINK = 'class="text-[#B2904D] underline hover:text-white"';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Manejar sin licencia: cuándo termina en ICE',
    metaDesc:
      'Una parada de tránsito puede terminar en ICE, sobre todo en Texas con la ley SB 8 y los acuerdos 287(g). Cómo pasa, qué derechos tienes y cómo prepararte.',
    title: 'Me pararon manejando sin licencia: cómo una infracción de tránsito puede terminar en ICE',
    displayDate: '11 Nov, 2026',
    readTime: '5 min',
    categoryLabel: 'Defensa contra Deportación',
    summary: {
      title: 'Resumen inicial',
      text: 'Para muchas familias, el mayor riesgo migratorio no es una redada: es una <strong>parada de tránsito</strong>. Una luz fundida o manejar sin licencia puede terminar en arresto, huellas digitales y una orden de ICE. En 2026 ese riesgo creció, sobre todo en Texas.',
    },
    intro: [
      'Aquí te explicamos cómo una multa puede llegar hasta ICE, qué cambió en Texas con la ley SB 8, qué derechos tienes durante una parada y cómo prepararte antes de que pase.',
    ],
    sections: [
      {
        icon: 'car',
        title: 'Cómo una multa termina en ICE',
        subtitle: 'Paso a paso',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Un policía te para por una falta de tránsito.',
              'Si no tienes licencia válida, puede darte una multa o arrestarte.',
              'Si te llevan a la cárcel, te toman las huellas y se comparan con las bases de datos de inmigración.',
              'ICE puede enviar una <strong>orden de retención (detainer)</strong> para que la cárcel te mantenga detenido hasta que te recoja.',
              'Si el condado tiene un acuerdo 287(g), los propios oficiales locales pueden iniciar tu proceso de deportación.',
            ],
          },
          {
            kind: 'text',
            text: `Si además te acusan de ciertos delitos, como robo o hurto, la <a href="/es/blog/ley-laken-riley-detencion-obligatoria-2026" ${LINK}>Ley Laken Riley</a> obliga a ICE a mantenerte detenido.`,
          },
        ],
      },
      {
        icon: 'users',
        title: 'Qué es el 287(g)',
        subtitle: 'Policías locales con tareas de inmigración',
        blocks: [
          {
            kind: 'text',
            text: 'Es un programa que permite a policías locales hacer tareas de inmigración. Tiene tres modelos:',
          },
          {
            kind: 'list',
            items: [
              '<strong>Cárcel:</strong> los oficiales revisan el estatus migratorio de las personas arrestadas.',
              '<strong>Fuerza de tarea:</strong> los policías pueden hacer preguntas migratorias durante su trabajo en la calle, incluidas las paradas de tránsito.',
              '<strong>Oficial de órdenes:</strong> los oficiales de la cárcel ejecutan órdenes administrativas de ICE.',
            ],
          },
        ],
      },
      {
        icon: 'gavel',
        title: 'Texas y la ley SB 8',
        subtitle: 'Acuerdos 287(g) obligatorios para los sheriffs',
        blocks: [
          {
            kind: 'list',
            items: [
              'La ley SB 8 entró en vigor el 1 de enero de 2026.',
              'Obliga a los sheriffs que manejan cárceles a pedir o firmar un acuerdo 287(g) a más tardar el <strong>1 de diciembre de 2026</strong>.',
              'Cada sheriff elige el modelo, y el procurador general de Texas puede demandar a quien no cumpla.',
              'Texas empezó 2026 con cerca de 300 acuerdos 287(g) en 186 condados.',
            ],
          },
        ],
      },
      {
        icon: 'file',
        title: 'Manejar sin licencia en Texas',
        subtitle: 'Una falta menor que puede llevar a la cárcel',
        blocks: [
          {
            kind: 'text',
            text: 'En Texas, manejar sin licencia normalmente es una falta menor, castigada con multa. Pero la policía puede arrestarte por una falta así, y <strong>el arresto es lo que te lleva a la cárcel y a las huellas</strong>.',
          },
          {
            kind: 'note',
            text: 'Algunos estados sí dan licencia de manejo sin importar el estatus migratorio; Texas no.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'Tus derechos durante una parada',
        subtitle: 'Qué decir y qué no hacer',
        blocks: [
          {
            kind: 'list',
            items: [
              'Si tienes licencia, registro y seguro, entrégalos cuando te los pidan.',
              'Puedes guardar silencio sobre tu estatus migratorio, tu lugar de nacimiento y cómo entraste al país. Di: “Prefiero guardar silencio”.',
              'No mientas y no muestres documentos falsos. Es mucho peor que guardar silencio.',
              'No huyas ni te resistas, aunque creas que la parada es injusta.',
              'No aceptes que revisen tu carro. Di con calma: “No doy permiso para una revisión”.',
              'Pregunta: “¿Estoy detenido o me puedo ir?”.',
            ],
          },
          {
            kind: 'warning',
            text: 'En Texas, si te arrestan, debes dar tu nombre, tu dirección y tu fecha de nacimiento verdaderos. <strong>Dar datos falsos es un delito.</strong>',
          },
        ],
      },
      {
        icon: 'siren',
        title: 'Si te arrestan',
        subtitle: 'Qué hacer desde la cárcel',
        blocks: [
          {
            kind: 'list',
            items: [
              'No firmes ningún documento de inmigración sin hablar antes con un abogado, sobre todo si dice “salida voluntaria” o “deportación”.',
              'Apréndete de memoria el teléfono de un familiar y el de tu abogado.',
              `Pide a tu familia que confirme si ICE puso una orden de retención y que te busque en el <a href="/es/blog/como-encontrar-detenido-ice-localizador-pasos" ${LINK}>localizador de detenidos de ICE</a>.`,
              `Si ICE te detiene, un abogado puede pedir fianza o, si te la niegan, evaluar un <a href="/es/blog/habeas-corpus-detenido-ice-sin-fianza" ${LINK}>habeas corpus</a>.`,
            ],
          },
          {
            kind: 'text',
            text: `Si ya tienes una orden de deportación, por ejemplo una <a href="/es/blog/orden-deportacion-en-ausencia-reabrir-caso" ${LINK}>orden en ausencia</a>, el riesgo es mayor. Un abogado puede evaluar una <a href="/es/blog/frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria" ${LINK}>suspensión de la deportación (stay)</a>.`,
          },
        ],
      },
      {
        icon: 'home',
        title: 'Prepárate antes de que pase',
        subtitle: 'Un plan para tu familia',
        blocks: [
          {
            kind: 'list',
            items: [
              `Ten un <a href="/es/blog/redadas-ice-2026-derechos-plan-emergencia-familiar" ${LINK}>plan familiar</a>: quién cuida a los niños, quién guarda copias de tus documentos y a quién llamar.`,
              'Guarda tu número A, si tienes uno, en un lugar que tu familia conozca.',
              'Paga tus multas y ve a tus citas de la corte de tránsito. Una orden de arresto por no presentarte es muy común y muy peligrosa.',
              `Si tienes <a href="/es/blog/cita-supervision-ice-check-in-riesgo-arresto-2026" ${LINK}>citas de supervisión con ICE</a>, no faltes a ninguna.`,
              `Si tomaste alcohol, no manejes: un <a href="/es/blog/marihuana-dui-buen-caracter-moral-inmigracion" ${LINK}>DUI</a> tiene consecuencias migratorias graves.`,
              'Revisa con un abogado si tienes alguna vía para arreglar tu situación antes de que ocurra una detención.',
            ],
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿La policía de Texas puede preguntarme si tengo papeles?',
          a: 'Sí puede preguntar, y en condados con el modelo de fuerza de tarea lo hace como parte de su trabajo. Tú puedes guardar silencio.',
        },
        {
          q: '¿Si solo me dan una multa, ICE se entera?',
          a: 'El riesgo mayor viene con un arresto y las huellas en la cárcel. Pero con el modelo de fuerza de tarea, el contacto en la calle también cuenta.',
        },
        {
          q: '¿Me pueden deportar por manejar sin licencia?',
          a: 'La falta en sí no es causa de deportación. El problema es que el arresto puede llevar a ICE a detenerte por no tener papeles.',
        },
        {
          q: '¿Qué pasa si ya tengo una orden de deportación?',
          a: 'El riesgo es mucho mayor: ICE puede deportarte sin otra audiencia. Habla con un abogado sobre una suspensión o una moción para reabrir tu caso.',
        },
      ],
    },
    conclusion: {
      title: '¿Necesitas ayuda?',
      text: 'En la Oficina del Abogado Manuel Solís atendemos casos de personas detenidas por ICE después de una parada de tránsito y ayudamos a las familias a preparar un plan.',
      advice: 'Si detuvieron a tu familiar, llámanos de inmediato.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'Ley de Inmigración y Nacionalidad (INA), sección 287(g) — acuerdos con policías locales',
        '8 C.F.R. § 287.7 — órdenes de retención (detainers) de ICE',
        'Texas, ley SB 8 (89.ª Legislatura, 2025) — acuerdos 287(g) obligatorios para los sheriffs',
        'Código de Transporte de Texas, secciones 521.021 y 521.025 — licencia de manejo obligatoria y sanción',
        'Código Penal de Texas, sección 38.02 — no identificarse o dar datos falsos a la policía',
        'Atwater v. City of Lago Vista, Corte Suprema de Estados Unidos (2001) — arresto por faltas castigadas con multa',
        'Ley Laken Riley (2025) — detención obligatoria por ciertos cargos',
        'ICE — programa 287(g) (ice.gov/287g)',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'Driving Without a License and ICE Risk',
    metaDesc:
      'A traffic stop can end up with ICE, especially in Texas under SB 8 and 287(g) agreements. How it happens, what rights you have, and how to prepare.',
    title: 'Stopped for Driving Without a License: How a Traffic Ticket Can End Up with ICE',
    displayDate: 'Nov 11, 2026',
    readTime: '5 min',
    categoryLabel: 'Deportation Defense',
    summary: {
      title: 'Summary',
      text: 'For many families, the biggest immigration risk is not a raid: it is a <strong>traffic stop</strong>. A broken taillight or driving without a license can lead to arrest, fingerprints, and an ICE hold. In 2026 that risk grew, especially in Texas.',
    },
    intro: [
      'Here we explain how a ticket can reach ICE, what changed in Texas under SB 8, what rights you have during a stop, and how to prepare before it happens.',
    ],
    sections: [
      {
        icon: 'car',
        title: 'How a ticket ends up with ICE',
        subtitle: 'Step by step',
        blocks: [
          {
            kind: 'steps',
            items: [
              'An officer pulls you over for a traffic violation.',
              'If you do not have a valid license, the officer can give you a ticket or arrest you.',
              'If you are taken to jail, your fingerprints are taken and checked against immigration databases.',
              'ICE can send a <strong>detainer</strong> asking the jail to hold you until ICE picks you up.',
              'If the county has a 287(g) agreement, local officers themselves can start your deportation process.',
            ],
          },
          {
            kind: 'text',
            text: `If you are also charged with certain crimes, such as theft or shoplifting, the <a href="/en/blog/ley-laken-riley-detencion-obligatoria-2026" ${LINK}>Laken Riley Act</a> requires ICE to keep you detained.`,
          },
        ],
      },
      {
        icon: 'users',
        title: 'What 287(g) is',
        subtitle: 'Local police doing immigration work',
        blocks: [
          {
            kind: 'text',
            text: 'It is a program that lets local police carry out immigration tasks. It has three models:',
          },
          {
            kind: 'list',
            items: [
              '<strong>Jail model:</strong> officers check the immigration status of people who are arrested.',
              '<strong>Task force:</strong> officers can ask immigration questions during street work, including traffic stops.',
              '<strong>Warrant service officer:</strong> jail officers serve ICE administrative warrants.',
            ],
          },
        ],
      },
      {
        icon: 'gavel',
        title: 'Texas and SB 8',
        subtitle: 'Mandatory 287(g) agreements for sheriffs',
        blocks: [
          {
            kind: 'list',
            items: [
              'SB 8 took effect on January 1, 2026.',
              'It requires sheriffs who run jails to request or sign a 287(g) agreement by <strong>December 1, 2026</strong>.',
              'Each sheriff chooses the model, and the Texas attorney general can sue those who do not comply.',
              'Texas started 2026 with about 300 287(g) agreements in 186 counties.',
            ],
          },
        ],
      },
      {
        icon: 'file',
        title: 'Driving without a license in Texas',
        subtitle: 'A minor offense that can lead to jail',
        blocks: [
          {
            kind: 'text',
            text: 'In Texas, driving without a license is usually a minor offense punished with a fine. But police can arrest you for an offense like that, and <strong>the arrest is what takes you to jail and to fingerprinting</strong>.',
          },
          {
            kind: 'note',
            text: 'Some states issue driver’s licenses regardless of immigration status; Texas does not.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'Your rights during a stop',
        subtitle: 'What to say and what not to do',
        blocks: [
          {
            kind: 'list',
            items: [
              'If you have a license, registration, and insurance, hand them over when asked.',
              'You can remain silent about your immigration status, your place of birth, and how you entered the country. Say: “I prefer to remain silent.”',
              'Do not lie and do not show false documents. That is much worse than remaining silent.',
              'Do not run or resist, even if you think the stop is unfair.',
              'Do not consent to a search of your car. Say calmly: “I do not consent to a search.”',
              'Ask: “Am I being detained, or am I free to go?”',
            ],
          },
          {
            kind: 'warning',
            text: 'In Texas, if you are arrested, you must give your true name, address, and date of birth. <strong>Giving false information is a crime.</strong>',
          },
        ],
      },
      {
        icon: 'siren',
        title: 'If you are arrested',
        subtitle: 'What to do from jail',
        blocks: [
          {
            kind: 'list',
            items: [
              'Do not sign any immigration document without first talking to a lawyer, especially if it says “voluntary departure” or “removal.”',
              'Memorize the phone number of a family member and of your lawyer.',
              `Ask your family to check whether ICE placed a detainer and to look for you in the <a href="/en/blog/como-encontrar-detenido-ice-localizador-pasos" ${LINK}>ICE detainee locator</a>.`,
              `If ICE detains you, a lawyer can request bond or, if bond is denied, evaluate a <a href="/en/blog/habeas-corpus-detenido-ice-sin-fianza" ${LINK}>habeas corpus</a> petition.`,
            ],
          },
          {
            kind: 'text',
            text: `If you already have a removal order, for example an <a href="/en/blog/orden-deportacion-en-ausencia-reabrir-caso" ${LINK}>in absentia order</a>, the risk is higher. A lawyer can evaluate a <a href="/en/blog/frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria" ${LINK}>stay of removal</a>.`,
          },
        ],
      },
      {
        icon: 'home',
        title: 'Prepare before it happens',
        subtitle: 'A plan for your family',
        blocks: [
          {
            kind: 'list',
            items: [
              `Have a <a href="/en/blog/redadas-ice-2026-derechos-plan-emergencia-familiar" ${LINK}>family plan</a>: who will care for the children, who keeps copies of your documents, and whom to call.`,
              'Keep your A-number, if you have one, in a place your family knows.',
              'Pay your tickets and go to your traffic court dates. An arrest warrant for not showing up is very common and very dangerous.',
              `If you have <a href="/en/blog/cita-supervision-ice-check-in-riesgo-arresto-2026" ${LINK}>ICE check-ins</a>, do not miss any.`,
              `If you have been drinking, do not drive: a <a href="/en/blog/marihuana-dui-buen-caracter-moral-inmigracion" ${LINK}>DUI</a> has serious immigration consequences.`,
              'Check with a lawyer whether you have any way to fix your status before a detention happens.',
            ],
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'Can Texas police ask me if I have papers?',
          a: 'Yes, they can ask, and in counties with the task force model they do it as part of their work. You can remain silent.',
        },
        {
          q: 'If I only get a ticket, does ICE find out?',
          a: 'The biggest risk comes with an arrest and fingerprints at the jail. But under the task force model, contact on the street also counts.',
        },
        {
          q: 'Can I be deported for driving without a license?',
          a: 'The offense itself is not a ground for deportation. The problem is that the arrest can lead ICE to detain you for not having papers.',
        },
        {
          q: 'What if I already have a removal order?',
          a: 'The risk is much higher: ICE can deport you without another hearing. Talk to a lawyer about a stay or a motion to reopen your case.',
        },
      ],
    },
    conclusion: {
      title: 'Need help?',
      text: 'At the Law Office of Manuel Solis, we handle cases of people detained by ICE after a traffic stop and help families prepare a plan.',
      advice: 'If your family member was detained, call us right away.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'Immigration and Nationality Act (INA), section 287(g) — agreements with local police',
        '8 C.F.R. § 287.7 — ICE detainers',
        'Texas SB 8 (89th Legislature, 2025) — mandatory 287(g) agreements for sheriffs',
        'Texas Transportation Code, sections 521.021 and 521.025 — driver’s license requirement and penalty',
        'Texas Penal Code, section 38.02 — failure to identify or giving false information to police',
        'Atwater v. City of Lago Vista, U.S. Supreme Court (2001) — arrest for fine-only offenses',
        'Laken Riley Act (2025) — mandatory detention for certain charges',
        'ICE — 287(g) program (ice.gov/287g)',
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
          ? 'Parada de tránsito en Texas que puede terminar en una detención de ICE'
          : 'Traffic stop in Texas that can end in an ICE detention'
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
