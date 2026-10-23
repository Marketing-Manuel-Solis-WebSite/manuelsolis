import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'manejar-sin-licencia-california-ice-sb54-ab60';
// Debe coincidir con `date` del post en ALL_POSTS (app/[lang]/blog/page.tsx):
// antes de esa fecha la página no se publica.
const ISO_DATE = '2026-11-18';
const IMAGE = '/blog/blog_43/NOV_B3.jpg';

const LINK = 'class="text-[#B2904D] underline hover:text-white"';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Manejar sin licencia en California y ICE',
    metaDesc:
      'En California la policía local no colabora con ICE, pero una parada de tránsito puede terminar en ICE. Qué protege la SB 54, la licencia AB 60 y qué cambió en 2026.',
    title: 'Me pararon manejando sin licencia en California: ¿puede terminar en ICE?',
    displayDate: '18 Nov, 2026',
    readTime: '10 min',
    categoryLabel: 'Defensa contra Deportación',
    summary: {
      title: 'Resumen inicial',
      text: 'En California las reglas son muy distintas a las de Texas. La policía local no puede hacer trabajo de inmigración, no hay acuerdos 287(g) y cualquier persona puede sacar licencia de manejo sin importar su estatus. Aun así, <strong>el riesgo no desaparece</strong>: una parada de tránsito puede terminar en un arresto, y ICE y la Patrulla Fronteriza siguen operando por su cuenta en el estado.',
    },
    intro: [
      'En 2026 hubo cambios importantes, sobre todo con los datos del DMV. Aquí te explicamos qué protege la ley de California, qué no puede impedir y cómo prepararte.',
    ],
    sections: [
      {
        icon: 'car',
        title: 'Cómo una parada de tránsito puede terminar en ICE',
        subtitle: 'Paso a paso',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Un policía te para por una falta de tránsito.',
              'Si no tienes licencia ni otra identificación, puede darte una multa o arrestarte para confirmar quién eres.',
              'Si te llevan a la cárcel, te toman las huellas. Esas huellas se envían al FBI y también llegan al Departamento de Seguridad Nacional (DHS). Eso pasa en todo el país y California no lo puede impedir.',
              'ICE puede enviar una <strong>orden de retención (detainer)</strong>. En California, la cárcel en general no puede cumplirla ni avisarle a ICE cuándo sales, salvo excepciones para personas con ciertas condenas graves.',
              'ICE puede esperarte afuera o buscarte después por su cuenta.',
            ],
          },
        ],
      },
      {
        icon: 'shield',
        title: 'Qué protege la ley SB 54 (California Values Act)',
        subtitle: 'Límites a la policía estatal y local',
        blocks: [
          {
            kind: 'text',
            text: 'La ley SB 54 está vigente desde 2018 y limita la colaboración de la policía estatal y local con inmigración:',
          },
          {
            kind: 'list',
            items: [
              'La policía local no puede investigar, interrogar, detener ni arrestar a nadie con fines migratorios.',
              'No puede mantenerte en la cárcel solo porque ICE lo pidió.',
              'No puede compartir tu fecha de salida ni tus datos personales con ICE, salvo excepciones (por ejemplo, ciertas condenas por delitos graves o violentos).',
              'No puede firmar acuerdos 287(g) con ICE.',
            ],
          },
          {
            kind: 'text',
            text: `<strong>Las excepciones importan:</strong> si tienes condenas por ciertos delitos graves, la cárcel sí puede avisar a ICE. Habla con un abogado si tienes <a href="/es/blog/crimenes-deportacion-vileza-moral" ${LINK}>antecedentes penales</a>.`,
          },
        ],
      },
      {
        icon: 'file',
        title: 'La ley TRUTH Act',
        subtitle: 'Si ICE quiere entrevistarte en la cárcel',
        blocks: [
          {
            kind: 'text',
            text: 'Si estás en una cárcel del condado y ICE quiere entrevistarte, primero te deben dar un formulario por escrito que explique de qué se trata la entrevista, que es <strong>voluntaria</strong> y que puedes negarte o pedir que esté tu abogado.',
          },
        ],
      },
      {
        icon: 'map',
        title: 'California y el 287(g)',
        subtitle: 'Lo contrario de Texas',
        blocks: [
          {
            kind: 'text',
            text: 'En Texas, la ley SB 8 obliga a los sheriffs a firmar acuerdos 287(g). En California pasa lo contrario: la ley SB 54 los prohíbe, y el mapa oficial de ICE no muestra ningún acuerdo activo en el estado.',
          },
          {
            kind: 'text',
            text: 'Antes de 2017 sí hubo acuerdos en Los Ángeles, Orange, Riverside y San Bernardino. En 2025, la oficina del sheriff del condado de Shasta intentó firmar uno, pero el proceso se detuvo después de que un funcionario de ICE advirtió que podía violar la ley estatal.',
          },
        ],
      },
      {
        icon: 'gavel',
        title: 'La ley SB 54 sigue en pie, pero tiene enemigos',
        subtitle: 'Demandas contra la ley',
        blocks: [
          {
            kind: 'list',
            items: [
              'Los tribunales han confirmado la ley varias veces desde que el gobierno federal la demandó en 2018.',
              'En 2025, un juez federal desechó una demanda de Huntington Beach contra la ley, la segunda que esa ciudad pierde.',
              'En abril de 2026, la ciudad de El Cajon demandó al procurador general de California con un argumento nuevo: que las leyes de protección del estado incentivan la residencia ilegal. El caso sigue abierto.',
            ],
          },
          {
            kind: 'note',
            text: 'Por ahora la ley está vigente y protege lo mismo que antes.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Manejar sin licencia en California',
        subtitle: 'Multa, remolque y el verdadero riesgo',
        blocks: [
          {
            kind: 'list',
            items: [
              'Manejar sin licencia válida (Código Vehicular 12500) puede tratarse como infracción, con multa de hasta $250, o como delito menor, con hasta 6 meses de cárcel y multa de hasta $1,000.',
              'La policía puede remolcar tu carro, y en algunos casos retenerlo hasta 30 días.',
              'El mayor riesgo migratorio no es la multa: es que <strong>no puedas comprobar tu identidad</strong>. Si te dan una multa y no tienes identificación, el policía puede llevarte a la estación para confirmar quién eres. Ahí es donde te toman las huellas.',
            ],
          },
        ],
      },
      {
        icon: 'wallet',
        title: 'La licencia AB 60: tu mejor protección, con un riesgo nuevo en 2026',
        subtitle: 'Licencia sin importar el estatus',
        blocks: [
          {
            kind: 'text',
            text: 'Desde 2015, la ley AB 60 permite que cualquier residente de California saque licencia de manejo sin importar su estatus. Más de un millón de personas la tienen. Cómo te protege:',
          },
          {
            kind: 'list',
            items: [
              'Con licencia, una parada normal termina casi siempre en una multa y no en un arresto.',
              'La policía no puede usar tu licencia AB 60 como motivo para investigarte, detenerte o arrestarte, ni para sacar conclusiones sobre tu estatus.',
            ],
          },
          {
            kind: 'text',
            text: 'Los riesgos que debes conocer:',
          },
          {
            kind: 'list',
            items: [
              'Si ICE ya te está buscando, el DMV puede responder a una solicitud y dar tu nombre, dirección y foto.',
              '<strong>Cambio en 2026:</strong> en junio, la Legislatura aprobó $55 millones para que el DMV comparta los datos de todos los conductores, incluidos los de AB 60, con una base de datos nacional de la Asociación Estadounidense de Administradores de Vehículos Motorizados (AAMVA). El estado dice que es necesario para cumplir la ley REAL ID. La ley incluye protecciones, como reportes anuales y la posibilidad de que el procurador general demande si se abusa de los datos. Se espera que el envío empiece en 2027.',
              'En agosto de 2026, el DHS pidió a esa misma asociación los datos de 17 millones de conductores comerciales con fines de control migratorio. California y otros 21 estados demandaron, y un juez federal bloqueó temporalmente la entrega. Esa solicitud fue de licencias comerciales, no de licencias AB 60, pero los defensores de inmigrantes advierten que muestra el riesgo.',
            ],
          },
          {
            kind: 'text',
            text: `Sacar o no una licencia AB 60 es una decisión personal. Si tienes una <a href="/es/blog/orden-deportacion-en-ausencia-reabrir-caso" ${LINK}>orden de deportación</a> o ICE ya te busca, habla con un abogado antes de tramitarla.`,
          },
        ],
      },
      {
        icon: 'siren',
        title: 'Cuidado: ICE y la Patrulla Fronteriza no son la policía local',
        subtitle: 'Los agentes federales operan por su cuenta',
        blocks: [
          {
            kind: 'text',
            text: 'La ley SB 54 solo limita a la policía estatal y local. Los agentes federales operan por su cuenta en California:',
          },
          {
            kind: 'list',
            items: [
              'Desde febrero de 2025 se han hecho más de 38,000 arrestos migratorios en el estado.',
              'En septiembre de 2025, la Corte Suprema permitió por ahora que los agentes federales en el sur de California hagan paradas tomando en cuenta factores como la apariencia, el idioma o el tipo de trabajo. No es una decisión final y el caso (<em>Vasquez Perdomo v. Noem</em>) sigue en los tribunales.',
              'Una ley de California de 2025 que obligaba a los agentes federales a identificarse y no cubrirse la cara fue bloqueada en parte por los tribunales en 2026.',
            ],
          },
          {
            kind: 'note',
            text: 'Si te para alguien, fíjate si es policía local, sheriff, Patrulla de Caminos (CHP) o un agente federal. Puedes preguntar con calma de qué agencia son.',
          },
        ],
      },
      {
        icon: 'calendar',
        title: 'Leyes nuevas de septiembre de 2026',
        subtitle: 'El paquete migratorio firmado por el gobernador',
        blocks: [
          {
            kind: 'text',
            text: 'El 29 de septiembre de 2026, el gobernador firmó un paquete de leyes migratorias. Entre ellas:',
          },
          {
            kind: 'list',
            items: [
              '<strong>SB 747 (No Kings Act):</strong> permite demandar a cualquier funcionario, incluidos los federales, que viole tus derechos constitucionales.',
              '<strong>AB 1807:</strong> prohíbe que los agentes de inmigración usen propiedad del estado para sus operativos.',
              '<strong>AB 1806:</strong> obliga a la fiscalía estatal a investigar cuando un agente de inmigración mata a una persona desarmada.',
              '<strong>SB 942:</strong> crea derechos básicos para las personas en centros de detención, como atención médica y comida adecuada.',
            ],
          },
          {
            kind: 'note',
            text: 'Varias de estas leyes probablemente serán impugnadas en los tribunales federales. Revisa la fecha en que entra en vigor cada una.',
          },
        ],
      },
      {
        icon: 'balance',
        title: 'Tus derechos durante una parada',
        subtitle: 'Qué decir y qué no hacer',
        blocks: [
          {
            kind: 'list',
            items: [
              'Si tienes licencia, registro y seguro, entrégalos cuando te los pidan. En California, negarte a mostrar una licencia que sí tienes es un delito.',
              'Puedes guardar silencio sobre tu estatus migratorio, tu lugar de nacimiento y cómo entraste al país. Di: “Prefiero guardar silencio”.',
              'No mientas y no muestres documentos falsos. Dar un nombre falso a la policía es un delito y es mucho peor que guardar silencio.',
              'No huyas ni te resistas, aunque creas que la parada es injusta.',
              'No aceptes que revisen tu carro. Di con calma: “No doy permiso para una revisión”.',
              'Pregunta: “¿Estoy detenido o me puedo ir?”.',
              'Si te dan una multa, fírmala. Firmar no es aceptar la culpa, solo prometer que irás a la corte. Negarte puede llevarte al arresto.',
            ],
          },
        ],
      },
      {
        icon: 'lock',
        title: 'Si te arrestan',
        subtitle: 'Qué hacer desde la cárcel',
        blocks: [
          {
            kind: 'list',
            items: [
              'No firmes ningún documento de inmigración sin hablar antes con un abogado, sobre todo si dice “salida voluntaria” o “deportación”.',
              'Si ICE quiere entrevistarte en la cárcel, puedes negarte o pedir que esté tu abogado.',
              'Apréndete de memoria el teléfono de un familiar y el de tu abogado.',
              'Pide a tu familia que confirme si ICE puso una orden de retención y si la cárcel va a notificar tu salida.',
              `Si ICE te detiene, un abogado puede pedir fianza o, si te la niegan, evaluar un <a href="/es/blog/habeas-corpus-detenido-ice-sin-fianza" ${LINK}>habeas corpus</a>.`,
            ],
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
              'Evalúa con un abogado si te conviene sacar la licencia AB 60.',
              'Paga tus multas y ve a tus citas de la corte de tránsito. Una orden de arresto por no presentarte es muy común y muy peligrosa.',
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
          q: '¿La policía de California puede preguntarme si tengo papeles?',
          a: 'La policía local no puede interrogarte con fines migratorios. Los agentes federales sí pueden preguntar. En cualquier caso, tú puedes guardar silencio.',
        },
        {
          q: '¿Si solo me dan una multa, ICE se entera?',
          a: 'Normalmente no, porque la policía local no comparte esa información con ICE. El riesgo aparece si te arrestan y te toman las huellas en la cárcel.',
        },
        {
          q: '¿Me pueden deportar por manejar sin licencia?',
          a: 'La falta en sí no es causa de deportación. El problema es que un arresto puede poner tus huellas en manos del gobierno federal.',
        },
        {
          q: '¿Mi licencia AB 60 le avisa a ICE que no tengo papeles?',
          a: 'La policía estatal y local no puede usarla para eso. Pero ICE puede pedir al DMV datos de una persona que ya busca, y en 2027 el estado empezará a compartir datos de licencias con una base nacional.',
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
        'Código de Gobierno de California, secciones 7284 a 7284.12 — ley SB 54 (California Values Act)',
        'Código de Gobierno de California, secciones 7283 a 7283.2 — ley TRUTH Act',
        'Código Vehicular de California, sección 12500 — manejar sin licencia',
        'Código Vehicular de California, sección 12801.9 — licencias AB 60',
        'Código Vehicular de California, secciones 12951 y 40302 — mostrar la licencia y arresto por no identificarse',
        'Código Penal de California, sección 148.9 — dar un nombre falso a la policía',
        'Noem v. Vasquez Perdomo, Corte Suprema de Estados Unidos (septiembre de 2025) — suspensión provisional',
        'Leyes de California de 2026 SB 747, AB 1807, AB 1806 y SB 942 (leginfo.legislature.ca.gov)',
        'Procuraduría General de California — boletines sobre SB 54 (oag.ca.gov)',
        'DMV de California — programa AB 60 (dmv.ca.gov)',
        'ICE — lista oficial de acuerdos 287(g) (ice.gov/287g)',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'Unlicensed Driving in California and ICE',
    metaDesc:
      'In California, local police do not work with ICE, but a traffic stop can still end with ICE. What SB 54 and the AB 60 license protect, and what changed in 2026.',
    title: 'Stopped for Driving Without a License in California: Can It End Up with ICE?',
    displayDate: 'Nov 18, 2026',
    readTime: '10 min',
    categoryLabel: 'Deportation Defense',
    summary: {
      title: 'Summary',
      text: 'In California the rules are very different from Texas. Local police cannot do immigration work, there are no 287(g) agreements, and anyone can get a driver’s license regardless of status. Even so, <strong>the risk does not go away</strong>: a traffic stop can end in an arrest, and ICE and the Border Patrol still operate on their own in the state.',
    },
    intro: [
      'There were important changes in 2026, especially with DMV data. Here we explain what California law protects, what it cannot prevent, and how to prepare.',
    ],
    sections: [
      {
        icon: 'car',
        title: 'How a traffic stop can end up with ICE',
        subtitle: 'Step by step',
        blocks: [
          {
            kind: 'steps',
            items: [
              'An officer pulls you over for a traffic violation.',
              'If you have no license or other ID, the officer can give you a ticket or arrest you to confirm who you are.',
              'If you are taken to jail, your fingerprints are taken. Those fingerprints are sent to the FBI and also reach the Department of Homeland Security (DHS). This happens nationwide, and California cannot prevent it.',
              'ICE can send a <strong>detainer</strong>. In California, the jail generally cannot honor it or tell ICE when you are released, except for people with certain serious convictions.',
              'ICE can wait for you outside or look for you later on its own.',
            ],
          },
        ],
      },
      {
        icon: 'shield',
        title: 'What SB 54 (the California Values Act) protects',
        subtitle: 'Limits on state and local police',
        blocks: [
          {
            kind: 'text',
            text: 'SB 54 has been in effect since 2018 and limits cooperation between state and local police and immigration:',
          },
          {
            kind: 'list',
            items: [
              'Local police cannot investigate, interrogate, detain, or arrest anyone for immigration purposes.',
              'They cannot keep you in jail just because ICE asked.',
              'They cannot share your release date or personal information with ICE, with exceptions (for example, certain convictions for serious or violent felonies).',
              'They cannot sign 287(g) agreements with ICE.',
            ],
          },
          {
            kind: 'text',
            text: `<strong>The exceptions matter:</strong> if you have convictions for certain serious crimes, the jail can notify ICE. Talk to a lawyer if you have a <a href="/en/blog/crimenes-deportacion-vileza-moral" ${LINK}>criminal record</a>.`,
          },
        ],
      },
      {
        icon: 'file',
        title: 'The TRUTH Act',
        subtitle: 'If ICE wants to interview you in jail',
        blocks: [
          {
            kind: 'text',
            text: 'If you are in a county jail and ICE wants to interview you, you must first be given a written form explaining what the interview is about, that it is <strong>voluntary</strong>, and that you can decline or ask to have your lawyer present.',
          },
        ],
      },
      {
        icon: 'map',
        title: 'California and 287(g)',
        subtitle: 'The opposite of Texas',
        blocks: [
          {
            kind: 'text',
            text: 'In Texas, SB 8 requires sheriffs to sign 287(g) agreements. California does the opposite: SB 54 prohibits them, and ICE’s official map shows no active agreement in the state.',
          },
          {
            kind: 'text',
            text: 'Before 2017 there were agreements in Los Angeles, Orange, Riverside, and San Bernardino. In 2025, the Shasta County sheriff’s office tried to sign one, but the process stopped after an ICE official warned it could violate state law.',
          },
        ],
      },
      {
        icon: 'gavel',
        title: 'SB 54 still stands, but it has opponents',
        subtitle: 'Lawsuits against the law',
        blocks: [
          {
            kind: 'list',
            items: [
              'The courts have upheld the law several times since the federal government sued over it in 2018.',
              'In 2025, a federal judge dismissed a lawsuit by Huntington Beach against the law, the second that city has lost.',
              'In April 2026, the city of El Cajon sued the California attorney general with a new argument: that the state’s protection laws encourage unlawful residence. The case is still open.',
            ],
          },
          {
            kind: 'note',
            text: 'For now the law is in effect and protects the same as before.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Driving without a license in California',
        subtitle: 'Fines, towing, and the real risk',
        blocks: [
          {
            kind: 'list',
            items: [
              'Driving without a valid license (Vehicle Code 12500) can be treated as an infraction, with a fine of up to $250, or as a misdemeanor, with up to 6 months in jail and a fine of up to $1,000.',
              'Police can tow your car and, in some cases, impound it for up to 30 days.',
              'The biggest immigration risk is not the fine: it is <strong>not being able to prove your identity</strong>. If you get a ticket and have no ID, the officer can take you to the station to confirm who you are. That is where your fingerprints are taken.',
            ],
          },
        ],
      },
      {
        icon: 'wallet',
        title: 'The AB 60 license: your best protection, with a new risk in 2026',
        subtitle: 'A license regardless of status',
        blocks: [
          {
            kind: 'text',
            text: 'Since 2015, AB 60 has allowed any California resident to get a driver’s license regardless of status. More than one million people have one. How it protects you:',
          },
          {
            kind: 'list',
            items: [
              'With a license, a routine stop almost always ends in a ticket, not an arrest.',
              'Police cannot use your AB 60 license as a reason to investigate, detain, or arrest you, or to draw conclusions about your status.',
            ],
          },
          {
            kind: 'text',
            text: 'The risks you should know about:',
          },
          {
            kind: 'list',
            items: [
              'If ICE is already looking for you, the DMV can respond to a request and provide your name, address, and photo.',
              '<strong>Change in 2026:</strong> in June, the Legislature approved $55 million for the DMV to share data on all drivers, including AB 60 drivers, with a national database run by the American Association of Motor Vehicle Administrators (AAMVA). The state says it is needed to comply with the REAL ID Act. The law includes safeguards, such as annual reports and the ability of the attorney general to sue if the data is misused. The data sharing is expected to start in 2027.',
              'In August 2026, DHS asked that same association for data on 17 million commercial drivers for immigration enforcement. California and 21 other states sued, and a federal judge temporarily blocked the transfer. That request was for commercial licenses, not AB 60 licenses, but immigrant advocates warn that it shows the risk.',
            ],
          },
          {
            kind: 'text',
            text: `Getting an AB 60 license or not is a personal decision. If you have a <a href="/en/blog/orden-deportacion-en-ausencia-reabrir-caso" ${LINK}>removal order</a> or ICE is already looking for you, talk to a lawyer before applying.`,
          },
        ],
      },
      {
        icon: 'siren',
        title: 'Careful: ICE and the Border Patrol are not local police',
        subtitle: 'Federal agents operate on their own',
        blocks: [
          {
            kind: 'text',
            text: 'SB 54 only limits state and local police. Federal agents operate on their own in California:',
          },
          {
            kind: 'list',
            items: [
              'Since February 2025, there have been more than 38,000 immigration arrests in the state.',
              'In September 2025, the Supreme Court allowed, for now, federal agents in Southern California to make stops based on factors such as appearance, language, or type of work. It is not a final decision, and the case (<em>Vasquez Perdomo v. Noem</em>) is still in the courts.',
              'A 2025 California law requiring federal agents to identify themselves and not cover their faces was partly blocked by the courts in 2026.',
            ],
          },
          {
            kind: 'note',
            text: 'If someone stops you, notice whether they are local police, a sheriff, the Highway Patrol (CHP), or a federal agent. You can calmly ask which agency they are with.',
          },
        ],
      },
      {
        icon: 'calendar',
        title: 'New laws from September 2026',
        subtitle: 'The immigration package signed by the governor',
        blocks: [
          {
            kind: 'text',
            text: 'On September 29, 2026, the governor signed a package of immigration laws. Among them:',
          },
          {
            kind: 'list',
            items: [
              '<strong>SB 747 (No Kings Act):</strong> allows you to sue any official, including federal officials, who violates your constitutional rights.',
              '<strong>AB 1807:</strong> prohibits immigration agents from using state property for their operations.',
              '<strong>AB 1806:</strong> requires the state attorney general to investigate when an immigration agent kills an unarmed person.',
              '<strong>SB 942:</strong> creates basic rights for people in detention centers, such as medical care and adequate food.',
            ],
          },
          {
            kind: 'note',
            text: 'Several of these laws will likely be challenged in federal court. Check the date each one takes effect.',
          },
        ],
      },
      {
        icon: 'balance',
        title: 'Your rights during a stop',
        subtitle: 'What to say and what not to do',
        blocks: [
          {
            kind: 'list',
            items: [
              'If you have a license, registration, and insurance, hand them over when asked. In California, refusing to show a license you do have is a crime.',
              'You can remain silent about your immigration status, your place of birth, and how you entered the country. Say: “I prefer to remain silent.”',
              'Do not lie and do not show false documents. Giving a false name to police is a crime and is much worse than remaining silent.',
              'Do not run or resist, even if you think the stop is unfair.',
              'Do not consent to a search of your car. Say calmly: “I do not consent to a search.”',
              'Ask: “Am I being detained, or am I free to go?”',
              'If you get a ticket, sign it. Signing is not admitting guilt, only promising to appear in court. Refusing can lead to an arrest.',
            ],
          },
        ],
      },
      {
        icon: 'lock',
        title: 'If you are arrested',
        subtitle: 'What to do from jail',
        blocks: [
          {
            kind: 'list',
            items: [
              'Do not sign any immigration document without first talking to a lawyer, especially if it says “voluntary departure” or “removal.”',
              'If ICE wants to interview you in jail, you can decline or ask to have your lawyer present.',
              'Memorize the phone number of a family member and of your lawyer.',
              'Ask your family to check whether ICE placed a detainer and whether the jail will give notice of your release.',
              `If ICE detains you, a lawyer can request bond or, if bond is denied, evaluate a <a href="/en/blog/habeas-corpus-detenido-ice-sin-fianza" ${LINK}>habeas corpus</a> petition.`,
            ],
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
              'Talk to a lawyer about whether getting an AB 60 license makes sense for you.',
              'Pay your tickets and go to your traffic court dates. An arrest warrant for not showing up is very common and very dangerous.',
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
          q: 'Can California police ask me if I have papers?',
          a: 'Local police cannot question you for immigration purposes. Federal agents can ask. Either way, you can remain silent.',
        },
        {
          q: 'If I only get a ticket, does ICE find out?',
          a: 'Usually not, because local police do not share that information with ICE. The risk appears if you are arrested and fingerprinted at the jail.',
        },
        {
          q: 'Can I be deported for driving without a license?',
          a: 'The offense itself is not a ground for deportation. The problem is that an arrest can put your fingerprints in federal hands.',
        },
        {
          q: 'Does my AB 60 license tell ICE I am undocumented?',
          a: 'State and local police cannot use it for that. But ICE can ask the DMV for data on a person it is already looking for, and in 2027 the state will start sharing license data with a national database.',
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
        'California Government Code, sections 7284 to 7284.12 — SB 54 (California Values Act)',
        'California Government Code, sections 7283 to 7283.2 — TRUTH Act',
        'California Vehicle Code, section 12500 — driving without a license',
        'California Vehicle Code, section 12801.9 — AB 60 licenses',
        'California Vehicle Code, sections 12951 and 40302 — showing a license and arrest for failing to identify',
        'California Penal Code, section 148.9 — giving a false name to police',
        'Noem v. Vasquez Perdomo, U.S. Supreme Court (September 2025) — interim stay',
        'California 2026 laws SB 747, AB 1807, AB 1806, and SB 942 (leginfo.legislature.ca.gov)',
        'California Attorney General — SB 54 bulletins (oag.ca.gov)',
        'California DMV — AB 60 program (dmv.ca.gov)',
        'ICE — official list of 287(g) agreements (ice.gov/287g)',
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
          ? 'Parada de tránsito en California a un conductor sin licencia y el riesgo de terminar en ICE'
          : 'Traffic stop in California of a driver without a license and the risk of ending up with ICE'
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
