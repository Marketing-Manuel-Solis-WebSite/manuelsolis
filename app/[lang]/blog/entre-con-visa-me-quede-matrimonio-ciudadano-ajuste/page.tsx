import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'entre-con-visa-me-quede-matrimonio-ciudadano-ajuste';
// Debe coincidir con `date` del post en ALL_POSTS (app/[lang]/blog/page.tsx):
// antes de esa fecha la página no se publica.
const ISO_DATE = '2026-11-25';
const IMAGE = '/blog/blog_44/NOV_B4.jpg';

const LINK = 'class="text-[#B2904D] underline hover:text-white"';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Entré con visa y me casé con un ciudadano',
    metaDesc:
      'Si entraste con visa o parole y te casaste con un ciudadano, podrías arreglar sin salir del país aunque tu visa esté vencida. Requisitos, riesgos y pasos en 2026.',
    title: 'Entré con visa y me quedé: cómo arreglar papeles casándote con un ciudadano',
    displayDate: '25 Nov, 2026',
    readTime: '8 min',
    categoryLabel: 'Procesos Migratorios',
    summary: {
      title: 'Resumen inicial',
      text: 'Si entraste a Estados Unidos con visa, visa láser o parole y te casaste con un ciudadano estadounidense, es posible que puedas <strong>arreglar tu residencia sin salir del país</strong>. No importa que tu visa se haya vencido hace años ni que hayas trabajado sin permiso. A este trámite se le llama <strong>ajuste de estatus</strong>.',
    },
    intro: [
      'La mala noticia: en 2026 no es un trámite para hacer por tu cuenta. USCIS revisa más a fondo y, si niega el caso, con frecuencia manda a la persona a la corte de inmigración.',
    ],
    sections: [
      {
        icon: 'check',
        title: 'Los tres requisitos básicos',
        subtitle: 'Entrada legal, matrimonio válido y sin problemas graves',
        blocks: [
          {
            kind: 'steps',
            items: [
              '<strong>Tu última entrada fue legal:</strong> pasaste por inspección y te admitieron con una visa, o te dieron parole.',
              '<strong>Estás casado legalmente con un ciudadano estadounidense:</strong> un matrimonio civil válido. La unión libre no cuenta.',
              '<strong>No tienes un problema sin perdón:</strong> por ejemplo, una orden de deportación sin resolver, ciertos delitos, fraude o una falsa declaración de ciudadanía.',
            ],
          },
          {
            kind: 'text',
            text: 'El esposo o la esposa de un ciudadano es <strong>“familiar inmediato”</strong>. Para los familiares inmediatos, la ley perdona tres cosas que a otros sí les impiden arreglar: quedarse más tiempo del permitido, trabajar sin permiso y no mantener su estatus.',
          },
        ],
      },
      {
        icon: 'plane',
        title: 'Entradas que sí cuentan',
        subtitle: 'Visa, visa láser o parole',
        blocks: [
          {
            kind: 'list',
            items: [
              'Cualquier visa, de turista, estudiante o trabajo, aunque ya se haya vencido.',
              'Visa láser (tarjeta de cruce fronterizo), aunque te hayas pasado del tiempo o de la zona permitida.',
              'Parole, incluido el de programas ya terminados como CHNV o el que se dio en la garita con cita de CBP One.',
              'Pasar la garita en carro sin que te revisaran: puede contar como entrada legal si lo puedes probar y no dijiste ser ciudadano.',
            ],
          },
          {
            kind: 'text',
            text: 'Descarga tu registro de entrada (I-94) en la página de CBP. Si no aparece, junta sellos del pasaporte, boletos y cualquier otra prueba de tu llegada.',
          },
        ],
      },
      {
        icon: 'swap',
        title: 'Entradas que normalmente no cuentan',
        subtitle: 'Cuándo el camino es otro',
        blocks: [
          {
            kind: 'list',
            items: [
              `Cruzar sin pasar por la garita. En ese caso, el camino suele ser el <a href="/es/blog/perdon-i601a-arreglar-papeles-entrada-ilegal" ${LINK}>perdón I-601A</a> y la entrevista en Ciudad Juárez, salvo que tengas protección de la <a href="/es/blog/residencia-laboral-eb3-ley-245i-entrada-indocumentada" ${LINK}>sección 245(i)</a>.`,
              'Liberación de ICE en la frontera con el formulario I-220A. La Junta de Apelaciones de Inmigración decidió que eso no equivale a parole.',
              'Una entrada legal antigua seguida de un cruce sin papeles. Lo que cuenta es tu última entrada.',
              'Casos con reglas propias: tripulantes, tránsito sin visa, visa J-1 con requisito de volver dos años a tu país y visa K-1 si te casaste con otra persona.',
            ],
          },
          {
            kind: 'note',
            text: 'Si entraste con el programa de exención de visa (ESTA), puedes calificar. Pero el riesgo es mayor: al entrar renunciaste a tu derecho a una audiencia ante un juez.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'Si tu cónyuge es residente, no ciudadano',
        subtitle: 'Las reglas son distintas',
        blocks: [
          {
            kind: 'list',
            items: [
              'El cónyuge de un residente no es familiar inmediato. Debe esperar su turno en el Boletín de Visas, en la categoría F2A.',
              'Si se le venció la visa o trabajó sin permiso, en general no puede arreglar dentro del país, salvo que tenga 245(i). Casi siempre termina el trámite en el consulado.',
              'Si tu cónyuge se hace ciudadano, tu caso pasa a familiar inmediato. Si ya cumple el tiempo para la ciudadanía, conviene revisar ese paso primero.',
            ],
          },
        ],
      },
      {
        icon: 'search',
        title: 'El punto delicado: qué dijiste al entrar',
        subtitle: 'La intención con la que llegaste',
        blocks: [
          {
            kind: 'list',
            items: [
              'Si pediste una visa de turista diciendo que venías de paseo, pero ya planeabas quedarte, USCIS puede preguntar si mentiste.',
              'Casarte o aplicar pocas semanas después de llegar llama la atención. El Departamento de Estado presume mentira si en los primeros 90 días haces algo contrario a tu visa. USCIS no está obligado a esa regla de 90 días, pero puede tomar en cuenta las fechas.',
              'Enamorarte y cambiar de planes después de entrar no es fraude. Mentir en el consulado o en la garita sí puede serlo, y entonces necesitarías un perdón.',
            ],
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'Lo que lleva el paquete',
        subtitle: 'Formularios y pruebas',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>I-130 e I-130A:</strong> la petición de tu cónyuge ciudadano y tus datos.',
              '<strong>I-485:</strong> tu solicitud de residencia.',
              `<strong><a href="/es/blog/i-864-patrocinador-ingreso-minimo" ${LINK}>I-864</a>:</strong> la declaración de patrocinio económico de tu cónyuge, con sus declaraciones de impuestos.`,
              '<strong>I-693:</strong> el examen médico con un doctor autorizado por USCIS. Desde diciembre de 2024 debe ir junto con el I-485.',
              `<strong>I-765 e I-131 (opcionales):</strong> permiso de trabajo y <a href="/es/blog/advance-parole-2026-viajar-con-daca-tps-visa-u" ${LINK}>permiso de viaje</a> mientras esperas.`,
              '<strong>Pruebas de un matrimonio real:</strong> renta o hipoteca, cuentas y seguros en conjunto, fotos a lo largo del tiempo, hijos en común.',
              '<strong>Pruebas de tu entrada:</strong> pasaporte, visa e I-94.',
              'Copias certificadas de cualquier arresto o caso penal, aunque se haya cerrado.',
            ],
          },
          {
            kind: 'text',
            text: `Las cuotas cambian con frecuencia. Revisa nuestra <a href="/es/blog/cuanto-cuesta-arreglar-papeles-tarifas-uscis-2026" ${LINK}>tabla de tarifas</a> antes de enviar.`,
          },
        ],
      },
      {
        icon: 'calendar',
        title: 'Lo que cambió en 2025 y 2026',
        subtitle: 'Reglas nuevas que debes conocer',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>Permiso de trabajo más corto:</strong> el que se da con el ajuste pendiente ahora dura como máximo 18 meses, y las renovaciones ya no tienen extensión automática.',
              '<strong>Carga pública:</strong> desde el 18 de septiembre de 2026 rige una regla nueva. Si tú recibiste beneficios públicos, consulta antes de aplicar.',
              '<strong>Más casos a la corte:</strong> desde 2025, USCIS manda con más frecuencia a la corte de inmigración a quien le niega el trámite y no tiene estatus.',
              `<strong><a href="/es/blog/uscis-revisa-redes-sociales-caso-migratorio-2026" ${LINK}>Revisión de redes sociales</a>:</strong> tus publicaciones pueden salir en la <a href="/es/blog/entrevista-inmigracion-errores-evitar" ${LINK}>entrevista</a>.`,
              '<strong>Arrestos en entrevistas:</strong> se han reportado arrestos de ICE en oficinas de USCIS, sobre todo de personas con órdenes de deportación o antecedentes.',
            ],
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Casos que necesitan revisión especial',
        subtitle: 'Consulta antes de aplicar',
        blocks: [
          {
            kind: 'list',
            items: [
              `Tienes una orden de deportación, aunque sea antigua o <a href="/es/blog/orden-deportacion-en-ausencia-reabrir-caso" ${LINK}>en ausencia</a>. Normalmente primero hay que reabrir el caso.`,
              'Estás en proceso en la corte: el ajuste se pide ante el juez, y si te casaste durante el proceso aplica una regla especial.',
              'Tienes arrestos o condenas, aunque sean menores.',
              'Usaste papeles falsos o dijiste ser ciudadano.',
              'Tú o tu cónyuge tuvieron una petición anterior negada por sospecha de fraude.',
              'Llevas menos de dos años de casado cuando te aprueban: recibirás una residencia condicional por dos años.',
            ],
          },
        ],
      },
      {
        icon: 'file',
        title: 'Paso a paso',
        subtitle: 'Del expediente a la entrevista',
        blocks: [
          {
            kind: 'steps',
            items: [
              `Junta tus pruebas de entrada y tu historial completo. Si falta algo, pide tu expediente con una <a href="/es/blog/foia-migratoria-pedir-record-antes-de-aplicar" ${LINK}>solicitud FOIA</a>.`,
              'Revisa con un abogado si tienes algún problema que te impida arreglar.',
              'Manda el paquete completo en un solo envío.',
              'Asiste a tu cita de huellas.',
              `Responde a tiempo cualquier <a href="/es/blog/rfe-responder-evidencia-uscis" ${LINK}>solicitud de evidencia (RFE)</a>.`,
              `<a href="/es/blog/entrevista-matrimonio-uscis-senales-alerta" ${LINK}>Prepara la entrevista</a> con tu cónyuge: los dos deben conocer la vida diaria del otro.`,
            ],
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Importa cuántos años llevo con la visa vencida?',
          a: 'No, si entraste con inspección y estás casado con un ciudadano. El tiempo sin estatus no impide este trámite.',
        },
        {
          q: '¿Puedo salir del país mientras espero?',
          a: 'Solo con un permiso de viaje (advance parole) aprobado. Si sales sin él, abandonas tu solicitud; aun con permiso, consulta antes de viajar.',
        },
        {
          q: '¿Qué pasa si nos divorciamos antes de la residencia?',
          a: 'La petición se cae. Si ya tienes residencia condicional, existe un perdón para quitar las condiciones.',
        },
        {
          q: '¿Aplicar me protege de ICE?',
          a: 'No. Un caso pendiente no impide una detención; por eso hay que revisar tu historial antes de aplicar.',
        },
      ],
    },
    conclusion: {
      title: '¿Necesitas ayuda?',
      text: 'En la Oficina del Abogado Manuel Solís revisamos tu entrada, tu historial y tu matrimonio antes de presentar el caso.',
      advice: 'Agenda una consulta: un paquete bien armado evita negativas y riesgos innecesarios.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'Ley de Inmigración y Nacionalidad (INA), sección 245(a) y (c) — ajuste de estatus y excepciones para familiares inmediatos',
        'INA sección 201(b)(2)(A)(i) — definición de familiar inmediato',
        'INA sección 245(i) — ajuste para ciertas personas sin entrada legal',
        'INA sección 212(a)(6)(C) — fraude, declaraciones falsas y falsa declaración de ciudadanía',
        'INA sección 217(b) — renuncia a la audiencia en el programa de exención de visa (ESTA)',
        'INA secciones 204(g) y 245(e) — matrimonio durante un proceso de deportación',
        'INA sección 216 — residencia condicional por matrimonio',
        'Matter of Quilantan, 25 I&N Dec. 285 (BIA 2010) — entrada en la garita sin revisión',
        'Matter of Q. Li, 29 I&N Dec. 66 (BIA 2025) — liberación con I-220A no es parole',
        'Manual de Asuntos Exteriores del Departamento de Estado, 9 FAM 302.9-4 — regla de los 90 días',
        'USCIS Policy Manual, volumen 7, parte B — ajuste de estatus',
        'CBP — registro de entrada I-94 (i94.cbp.dhs.gov)',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'Overstayed Visa, Married a U.S. Citizen',
    metaDesc:
      'Entered on a visa or parole and married a U.S. citizen? You may get a green card without leaving, even with an expired visa. Requirements, risks, and steps in 2026.',
    title: 'I Entered on a Visa and Stayed: How to Get a Green Card by Marrying a U.S. Citizen',
    displayDate: 'Nov 25, 2026',
    readTime: '8 min',
    categoryLabel: 'Immigration Process',
    summary: {
      title: 'Summary',
      text: 'If you entered the United States on a visa, a border crossing card, or parole and married a U.S. citizen, you may be able to <strong>get your green card without leaving the country</strong>. It does not matter that your visa expired years ago or that you worked without authorization. This process is called <strong>adjustment of status</strong>.',
    },
    intro: [
      'The bad news: in 2026 this is not a process to do on your own. USCIS reviews cases more closely and, if it denies the case, it often sends the person to immigration court.',
    ],
    sections: [
      {
        icon: 'check',
        title: 'The three basic requirements',
        subtitle: 'Lawful entry, valid marriage, and no serious problems',
        blocks: [
          {
            kind: 'steps',
            items: [
              '<strong>Your last entry was lawful:</strong> you were inspected and admitted with a visa, or you were paroled.',
              '<strong>You are legally married to a U.S. citizen:</strong> a valid civil marriage. A common-law relationship does not count.',
              '<strong>You do not have a problem without a waiver:</strong> for example, an unresolved removal order, certain crimes, fraud, or a false claim to U.S. citizenship.',
            ],
          },
          {
            kind: 'text',
            text: 'The husband or wife of a citizen is an <strong>“immediate relative.”</strong> For immediate relatives, the law forgives three things that do stop others from adjusting: overstaying, working without authorization, and failing to maintain status.',
          },
        ],
      },
      {
        icon: 'plane',
        title: 'Entries that count',
        subtitle: 'Visa, border crossing card, or parole',
        blocks: [
          {
            kind: 'list',
            items: [
              'Any visa, whether tourist, student, or work, even if it has expired.',
              'Border crossing card (“visa láser”), even if you stayed longer or went farther than allowed.',
              'Parole, including parole from programs that have ended, such as CHNV, or parole granted at the port of entry with a CBP One appointment.',
              'Being waved through at the port of entry in a car without inspection: it can count as a lawful entry if you can prove it and did not claim to be a citizen.',
            ],
          },
          {
            kind: 'text',
            text: 'Download your entry record (I-94) from the CBP website. If it does not appear, gather passport stamps, tickets, and any other proof of your arrival.',
          },
        ],
      },
      {
        icon: 'swap',
        title: 'Entries that usually do not count',
        subtitle: 'When the path is different',
        blocks: [
          {
            kind: 'list',
            items: [
              `Crossing without going through a port of entry. In that case, the path is usually the <a href="/en/blog/perdon-i601a-arreglar-papeles-entrada-ilegal" ${LINK}>I-601A waiver</a> and the interview in Ciudad Juárez, unless you are protected under <a href="/en/blog/residencia-laboral-eb3-ley-245i-entrada-indocumentada" ${LINK}>section 245(i)</a>.`,
              'Release by ICE at the border with Form I-220A. The Board of Immigration Appeals decided that this is not the same as parole.',
              'An old lawful entry followed by a later crossing without papers. What counts is your last entry.',
              'Cases with their own rules: crewmembers, transit without a visa, J-1 visas with a two-year home residency requirement, and K-1 visas if you married someone else.',
            ],
          },
          {
            kind: 'note',
            text: 'If you entered under the Visa Waiver Program (ESTA), you may qualify. But the risk is higher: when you entered, you waived your right to a hearing before a judge.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'If your spouse is a permanent resident, not a citizen',
        subtitle: 'The rules are different',
        blocks: [
          {
            kind: 'list',
            items: [
              'The spouse of a permanent resident is not an immediate relative. They must wait their turn in the Visa Bulletin, in the F2A category.',
              'If their visa expired or they worked without authorization, they generally cannot adjust inside the country unless they have 245(i). They almost always finish the process at the consulate.',
              'If your spouse becomes a citizen, your case becomes an immediate relative case. If they already meet the time for citizenship, it is worth looking at that step first.',
            ],
          },
        ],
      },
      {
        icon: 'search',
        title: 'The sensitive point: what you said when you entered',
        subtitle: 'Your intent when you arrived',
        blocks: [
          {
            kind: 'list',
            items: [
              'If you applied for a tourist visa saying you were coming to visit but already planned to stay, USCIS may ask whether you lied.',
              'Marrying or applying a few weeks after arriving draws attention. The State Department presumes misrepresentation if, within the first 90 days, you do something inconsistent with your visa. USCIS is not bound by that 90-day rule, but it can take the dates into account.',
              'Falling in love and changing plans after entering is not fraud. Lying at the consulate or at the port of entry can be, and then you would need a waiver.',
            ],
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'What goes in the package',
        subtitle: 'Forms and evidence',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>I-130 and I-130A:</strong> your citizen spouse’s petition and your information.',
              '<strong>I-485:</strong> your green card application.',
              `<strong><a href="/en/blog/i-864-patrocinador-ingreso-minimo" ${LINK}>I-864</a>:</strong> your spouse’s affidavit of support, with their tax returns.`,
              '<strong>I-693:</strong> the medical exam with a USCIS-designated civil surgeon. Since December 2024 it must be filed together with the I-485.',
              `<strong>I-765 and I-131 (optional):</strong> work permit and <a href="/en/blog/advance-parole-2026-viajar-con-daca-tps-visa-u" ${LINK}>travel permit</a> while you wait.`,
              '<strong>Proof of a real marriage:</strong> lease or mortgage, joint accounts and insurance, photos over time, children in common.',
              '<strong>Proof of your entry:</strong> passport, visa, and I-94.',
              'Certified copies of any arrest or criminal case, even if it was closed.',
            ],
          },
          {
            kind: 'text',
            text: `Fees change often. Check our <a href="/en/blog/cuanto-cuesta-arreglar-papeles-tarifas-uscis-2026" ${LINK}>fee table</a> before filing.`,
          },
        ],
      },
      {
        icon: 'calendar',
        title: 'What changed in 2025 and 2026',
        subtitle: 'New rules you should know',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>Shorter work permits:</strong> the one issued while adjustment is pending now lasts at most 18 months, and renewals no longer get an automatic extension.',
              '<strong>Public charge:</strong> a new rule has applied since September 18, 2026. If you received public benefits, get advice before applying.',
              '<strong>More cases sent to court:</strong> since 2025, USCIS more often sends people to immigration court when it denies their case and they have no status.',
              `<strong><a href="/en/blog/uscis-revisa-redes-sociales-caso-migratorio-2026" ${LINK}>Social media review</a>:</strong> your posts can come up at the <a href="/en/blog/entrevista-inmigracion-errores-evitar" ${LINK}>interview</a>.`,
              '<strong>Arrests at interviews:</strong> ICE arrests have been reported at USCIS offices, especially of people with removal orders or criminal records.',
            ],
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Cases that need special review',
        subtitle: 'Get advice before applying',
        blocks: [
          {
            kind: 'list',
            items: [
              `You have a removal order, even an old one or one issued <a href="/en/blog/orden-deportacion-en-ausencia-reabrir-caso" ${LINK}>in absentia</a>. Usually the case has to be reopened first.`,
              'You are in court proceedings: adjustment is requested before the judge, and if you married during proceedings a special rule applies.',
              'You have arrests or convictions, even minor ones.',
              'You used false documents or claimed to be a citizen.',
              'You or your spouse had a prior petition denied for suspected fraud.',
              'You have been married less than two years when you are approved: you will receive conditional residence for two years.',
            ],
          },
        ],
      },
      {
        icon: 'file',
        title: 'Step by step',
        subtitle: 'From your records to the interview',
        blocks: [
          {
            kind: 'steps',
            items: [
              `Gather your proof of entry and your full history. If anything is missing, request your file with a <a href="/en/blog/foia-migratoria-pedir-record-antes-de-aplicar" ${LINK}>FOIA request</a>.`,
              'Check with a lawyer whether you have any problem that would stop you from adjusting.',
              'Send the complete package in a single filing.',
              'Attend your biometrics appointment.',
              `Respond on time to any <a href="/en/blog/rfe-responder-evidencia-uscis" ${LINK}>request for evidence (RFE)</a>.`,
              `<a href="/en/blog/entrevista-matrimonio-uscis-senales-alerta" ${LINK}>Prepare for the interview</a> with your spouse: both of you should know each other’s daily life.`,
            ],
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'Does it matter how many years I have been on an expired visa?',
          a: 'No, if you entered with inspection and are married to a citizen. Time without status does not bar this process.',
        },
        {
          q: 'Can I leave the country while I wait?',
          a: 'Only with an approved travel permit (advance parole). If you leave without it, you abandon your application; even with the permit, get advice before traveling.',
        },
        {
          q: 'What happens if we divorce before the green card?',
          a: 'The petition falls apart. If you already have conditional residence, there is a waiver to remove the conditions.',
        },
        {
          q: 'Does applying protect me from ICE?',
          a: 'No. A pending case does not prevent a detention; that is why your history must be reviewed before applying.',
        },
      ],
    },
    conclusion: {
      title: 'Need help?',
      text: 'At the Law Office of Manuel Solis, we review your entry, your history, and your marriage before filing the case.',
      advice: 'Schedule a consultation: a well-prepared package avoids denials and unnecessary risks.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'Immigration and Nationality Act (INA), section 245(a) and (c) — adjustment of status and exceptions for immediate relatives',
        'INA section 201(b)(2)(A)(i) — definition of immediate relative',
        'INA section 245(i) — adjustment for certain people without a lawful entry',
        'INA section 212(a)(6)(C) — fraud, misrepresentation, and false claims to citizenship',
        'INA section 217(b) — waiver of hearing under the Visa Waiver Program (ESTA)',
        'INA sections 204(g) and 245(e) — marriage during removal proceedings',
        'INA section 216 — conditional residence based on marriage',
        'Matter of Quilantan, 25 I&N Dec. 285 (BIA 2010) — waved through at the port of entry',
        'Matter of Q. Li, 29 I&N Dec. 66 (BIA 2025) — release on Form I-220A is not parole',
        'U.S. Department of State Foreign Affairs Manual, 9 FAM 302.9-4 — the 90-day rule',
        'USCIS Policy Manual, volume 7, part B — adjustment of status',
        'CBP — I-94 entry record (i94.cbp.dhs.gov)',
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
          ? 'Pareja revisando la solicitud de ajuste de estatus por matrimonio con un ciudadano'
          : 'Couple reviewing an adjustment of status application based on marriage to a U.S. citizen'
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
