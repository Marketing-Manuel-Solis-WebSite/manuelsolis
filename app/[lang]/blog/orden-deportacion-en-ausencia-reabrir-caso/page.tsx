import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'orden-deportacion-en-ausencia-reabrir-caso';
// Debe coincidir con `date` del post en ALL_POSTS (app/[lang]/blog/page.tsx):
// antes de esa fecha la página no se publica.
const ISO_DATE = '2026-10-06';
const IMAGE = '/blog/blog_37/OCT_B1.png';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Orden de deportación en ausencia: cómo reabrir',
    metaDesc:
      '¿Te ordenaron deportar por no ir a la corte? Cuándo se puede reabrir el caso, qué plazos aplican y qué pruebas necesitas.',
    title: 'Orden de deportación en ausencia: cómo reabrir tu caso si no llegaste a la corte',
    displayDate: '06 Oct, 2026',
    readTime: '5 min',
    categoryLabel: 'Defensa contra Deportación',
    lastUpdated: '6 de octubre de 2026',
    summary: {
      title: 'Resumen inicial',
      text: 'Si no llegaste a tu audiencia en la corte de inmigración, el juez pudo ordenar tu deportación sin escucharte. Esa orden se llama <strong>“orden en ausencia”</strong> (in absentia). En muchos casos se puede anular con una <strong>moción para reabrir</strong>, pero los plazos son estrictos y cada día cuenta.',
    },
    intro: [
      'Mucha gente descubre la orden años después: en una cita con ICE, en una parada de tránsito o al pedir un trámite en USCIS. Para entonces, ICE puede detenerla y deportarla sin darle otra audiencia.',
    ],
    sections: [
      {
        icon: 'gavel',
        title: 'Qué es una orden en ausencia',
        subtitle: 'Lo que decide el juez sin ti',
        blocks: [
          {
            kind: 'text',
            text: 'Cuando no te presentas, el gobierno solo tiene que demostrar dos cosas: <strong>que te notificó la audiencia</strong> y <strong>que eres deportable</strong>. Con eso, el juez puede ordenar tu deportación sin que estés ahí.',
          },
          {
            kind: 'note',
            text: 'La orden es definitiva desde que se dicta. No necesitas firmar nada ni estar presente para que tenga efecto.',
          },
        ],
      },
      {
        icon: 'search',
        title: 'Cómo saber si tienes una orden',
        subtitle: 'Tres formas de revisar tu caso',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>Portal de la corte (EOIR):</strong> en acis.eoir.justice.gov escribes tu número A y ves el estado del caso, la próxima audiencia o la decisión del juez.',
              '<strong>Línea automatizada de EOIR:</strong> 1-800-898-7180, con tu número A a la mano.',
              '<strong>Solicitud FOIA:</strong> tu expediente completo muestra qué avisos te enviaron y a qué dirección.',
            ],
          },
        ],
      },
      {
        icon: 'balance',
        title: 'Los dos caminos principales para anular la orden',
        subtitle: 'Notificación o circunstancias excepcionales',
        blocks: [
          {
            kind: 'text',
            text: '<strong>1. No recibiste la notificación (sin límite de tiempo).</strong> Puedes pedir la reapertura en cualquier momento si no recibiste el aviso de la audiencia. También si estabas bajo custodia federal o estatal y faltar no fue tu culpa.',
          },
          {
            kind: 'text',
            text: 'Ejemplos: la corte mandó el aviso a una dirección equivocada, o nunca te entregaron el Aviso de Comparecencia (NTA).',
          },
          {
            kind: 'warning',
            text: 'Si la corte envió el aviso a la última dirección que tú diste y te mudaste sin avisar, es muy difícil ganar por esta vía.',
          },
          {
            kind: 'text',
            text: 'Otro detalle: en 2024 la Corte Suprema decidió, en <em>Campos-Chaves v. Garland</em>, que si tu NTA no tenía fecha pero después recibiste un aviso válido con fecha y hora, la orden puede sostenerse.',
          },
          {
            kind: 'text',
            text: '<strong>2. Circunstancias excepcionales (180 días).</strong> Si faltaste por algo grave y fuera de tu control, tienes 180 días desde la orden para pedir la reapertura. La ley menciona:',
          },
          {
            kind: 'list',
            items: [
              'Enfermedad grave tuya, o de tu cónyuge, hijo, padre o madre.',
              'Muerte de tu cónyuge, hijo, padre o madre.',
              'Violencia o crueldad extrema contra ti, tu hijo, tu padre o tu madre.',
              'En ciertos casos, un error grave de tu abogado anterior, con requisitos formales.',
            ],
          },
          {
            kind: 'note',
            text: 'No cuentan el tráfico, el trabajo, olvidar la fecha ni el mal consejo de un conocido.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'La moción detiene la deportación mientras el juez decide',
        subtitle: 'Suspensión automática',
        blocks: [
          {
            kind: 'text',
            text: 'Si la moción se basa en falta de notificación o en circunstancias excepcionales, presentarla <strong>suspende automáticamente la deportación</strong> hasta que el juez decida. Esa suspensión impide que te deporten, pero no garantiza que ICE no te detenga.',
          },
          {
            kind: 'warning',
            text: 'Si el juez niega la moción y apelas, la suspensión automática ya no aplica. En ese caso hay que pedir una suspensión (stay) por separado.',
          },
        ],
      },
      {
        icon: 'swap',
        title: 'Otras vías si ya se venció el plazo',
        subtitle: 'Cuando los 180 días ya pasaron',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>Una nueva forma de arreglar:</strong> una petición familiar aprobada o una Visa U pueden servir, según el caso, para pedir que se reabra o se cierre el proceso.',
              '<strong>Asilo por cambios en tu país:</strong> una moción basada en un cambio real de las condiciones en tu país no tiene límite de tiempo.',
              '<strong>Moción conjunta con el gobierno:</strong> si la fiscalía de ICE está de acuerdo, se pueden superar los plazos.',
            ],
          },
          {
            kind: 'note',
            text: 'Cada vía tiene requisitos propios; un abogado debe decidir cuál conviene.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'Qué pruebas necesitas',
        subtitle: 'Arma tu expediente',
        blocks: [
          {
            kind: 'list',
            items: [
              'Una declaración jurada que explique por qué no llegaste.',
              'Expedientes médicos, actas de defunción o registros de cárcel, según tu caso.',
              'Contratos de renta, recibos y correspondencia que prueben dónde vivías.',
              'Copia de los avisos de la corte y de los sobres, si los tienes.',
              'Si culpas a tu abogado o “notario” anterior: su contrato, pruebas de lo que hizo y los pasos que exige la ley (<em>Matter of Lozada</em>).',
              'Pruebas de la protección que pedirías si se reabre el caso.',
            ],
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Qué pasa si no haces nada',
        subtitle: 'El costo de esperar',
        blocks: [
          {
            kind: 'list',
            items: [
              'ICE puede detenerte y deportarte sin otra audiencia.',
              'Si te advirtieron las consecuencias de faltar, quedas 10 años sin poder pedir ciertos beneficios, como cancelación de deportación, salida voluntaria o ajuste de estatus.',
              'Si te deportan y vuelves a entrar sin permiso, podrías caer en el castigo permanente.',
            ],
          },
        ],
      },
      {
        icon: 'check',
        title: 'Qué hacer hoy',
        subtitle: 'Cuatro pasos',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Revisa tu caso en el portal de EOIR con tu número A.',
              'Junta tus pruebas de domicilio y de lo que pasó el día de la audiencia.',
              'Antes de tu próxima cita con ICE o USCIS, habla con un abogado.',
              'Si faltaste hace menos de 180 días, actúa ya: ese plazo no se extiende.',
            ],
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Puedo reabrir si la orden es de hace años?',
          a: 'Sí, si no recibiste la notificación. Si faltaste por circunstancias excepcionales, el plazo de 180 días ya pasó, pero puede haber otras vías.',
        },
        {
          q: '¿Si el juez reabre el caso, ya gané?',
          a: 'No. Vuelves a la corte con el caso abierto y necesitas una defensa, como asilo, cancelación o ajuste por familia.',
        },
        {
          q: '¿Me pueden detener mientras el juez decide?',
          a: 'Es posible. La moción impide la deportación, no necesariamente la detención.',
        },
        {
          q: '¿Dónde se presenta la moción?',
          a: 'Ante la misma corte que dictó la orden.',
        },
      ],
    },
    conclusion: {
      title: '¿Necesitas ayuda?',
      text: 'En la Oficina del Abogado Manuel Solís revisamos órdenes en ausencia y preparamos mociones para reabrir.',
      advice:
        'Agenda una consulta para que un abogado estudie tu expediente antes de tu próxima cita con ICE.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'Ley de Inmigración y Nacionalidad (INA), sección 240(b)(5) — órdenes en ausencia y su anulación',
        'INA sección 240(e)(1) — definición de circunstancias excepcionales',
        'INA sección 240(b)(7) — inelegibilidad de 10 años por no comparecer',
        '8 C.F.R. § 1003.23(b)(4) — mociones para reabrir ante el juez de inmigración',
        'Campos-Chaves v. Garland, Corte Suprema de Estados Unidos (2024)',
        'Matter of Lozada, 19 I&N Dec. 637 (BIA 1988)',
        'EOIR — Portal de estado de casos (acis.eoir.justice.gov) y línea automatizada 1-800-898-7180',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'In-Absentia Removal Order: How to Reopen',
    metaDesc:
      'Were you ordered deported for not going to court? When you can reopen the case, what deadlines apply, and what evidence you need.',
    title: 'In-Absentia Order of Removal: How to Reopen Your Case After Missing Your Court Date',
    displayDate: 'Oct 06, 2026',
    readTime: '5 min',
    categoryLabel: 'Deportation Defense',
    lastUpdated: 'October 6, 2026',
    summary: {
      title: 'Summary',
      text: 'If you missed your immigration court hearing, the judge may have ordered your deportation without hearing your side. This is known as an <strong>“in-absentia order.”</strong> In many cases it can be rescinded with a <strong>motion to reopen</strong>, but the deadlines are strict and every day counts.',
    },
    intro: [
      'Many people only discover the order years later: at an ICE appointment, during a traffic stop, or when applying for a benefit with USCIS. By then, ICE can detain and deport them without another hearing.',
    ],
    sections: [
      {
        icon: 'gavel',
        title: 'What an in-absentia order is',
        subtitle: 'What the judge decides without you',
        blocks: [
          {
            kind: 'text',
            text: 'When you do not appear, the government only has to prove two things: <strong>that it notified you of the hearing</strong> and <strong>that you are removable</strong>. With that, the judge can order your deportation without you being there.',
          },
          {
            kind: 'note',
            text: 'The order is final as soon as it is issued. You do not need to sign anything or be present for it to take effect.',
          },
        ],
      },
      {
        icon: 'search',
        title: 'How to find out whether you have an order',
        subtitle: 'Three ways to check your case',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>Court portal (EOIR):</strong> at acis.eoir.justice.gov, enter your A-Number to see your case status, your next hearing, or the judge’s decision.',
              '<strong>EOIR automated line:</strong> 1-800-898-7180, with your A-Number at hand.',
              '<strong>FOIA request:</strong> your full file shows which notices were sent to you and to what address.',
            ],
          },
        ],
      },
      {
        icon: 'balance',
        title: 'The two main ways to rescind the order',
        subtitle: 'Lack of notice or exceptional circumstances',
        blocks: [
          {
            kind: 'text',
            text: '<strong>1. You never received notice (no time limit).</strong> You can ask to reopen at any time if you did not receive notice of the hearing. The same applies if you were in federal or state custody and missing court was not your fault.',
          },
          {
            kind: 'text',
            text: 'Examples: the court sent the notice to the wrong address, or you were never served with the Notice to Appear (NTA).',
          },
          {
            kind: 'warning',
            text: 'If the court sent the notice to the last address you provided and you moved without updating it, it is very hard to win on this ground.',
          },
          {
            kind: 'text',
            text: 'One more detail: in 2024 the Supreme Court held in <em>Campos-Chaves v. Garland</em> that if your NTA had no date but you later received a valid notice with the date and time, the order can stand.',
          },
          {
            kind: 'text',
            text: '<strong>2. Exceptional circumstances (180 days).</strong> If you missed court because of something serious and beyond your control, you have 180 days from the order to ask to reopen. The law mentions:',
          },
          {
            kind: 'list',
            items: [
              'Serious illness of you, or of your spouse, child, or parent.',
              'Death of your spouse, child, or parent.',
              'Battery or extreme cruelty against you, your child, or your parent.',
              'In some cases, a serious error by your previous attorney, with formal requirements.',
            ],
          },
          {
            kind: 'note',
            text: 'Traffic, work, forgetting the date, or bad advice from an acquaintance do not count.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'The motion stops your deportation while the judge decides',
        subtitle: 'Automatic stay',
        blocks: [
          {
            kind: 'text',
            text: 'If the motion is based on lack of notice or exceptional circumstances, filing it <strong>automatically stays your deportation</strong> until the judge decides. That stay prevents your removal, but it does not guarantee that ICE will not detain you.',
          },
          {
            kind: 'warning',
            text: 'If the judge denies the motion and you appeal, the automatic stay no longer applies. In that case you must request a separate stay of removal.',
          },
        ],
      },
      {
        icon: 'swap',
        title: 'Other options if the deadline has passed',
        subtitle: 'When the 180 days are gone',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>A new path to status:</strong> an approved family petition or a U Visa may, depending on the case, support a request to reopen or close the proceedings.',
              '<strong>Asylum based on changes in your country:</strong> a motion based on a real change in conditions in your country has no time limit.',
              '<strong>Joint motion with the government:</strong> if ICE’s prosecutors agree, the deadlines can be overcome.',
            ],
          },
          {
            kind: 'note',
            text: 'Each option has its own requirements; an attorney should decide which one fits.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'What evidence you need',
        subtitle: 'Build your file',
        blocks: [
          {
            kind: 'list',
            items: [
              'A sworn statement explaining why you did not make it to court.',
              'Medical records, death certificates, or jail records, depending on your case.',
              'Leases, receipts, and mail that prove where you were living.',
              'Copies of the court notices and their envelopes, if you have them.',
              'If you blame your previous attorney or “notario”: their contract, proof of what they did, and the steps the law requires (<em>Matter of Lozada</em>).',
              'Evidence of the relief you would seek if the case is reopened.',
            ],
          },
        ],
      },
      {
        icon: 'alert',
        title: 'What happens if you do nothing',
        subtitle: 'The cost of waiting',
        blocks: [
          {
            kind: 'list',
            items: [
              'ICE can detain and deport you without another hearing.',
              'If you were warned about the consequences of missing court, you are barred for 10 years from certain benefits, such as cancellation of removal, voluntary departure, or adjustment of status.',
              'If you are deported and re-enter without permission, you could face the permanent bar.',
            ],
          },
        ],
      },
      {
        icon: 'check',
        title: 'What to do today',
        subtitle: 'Four steps',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Check your case on the EOIR portal with your A-Number.',
              'Gather proof of your address and of what happened on the day of the hearing.',
              'Before your next ICE or USCIS appointment, talk to an attorney.',
              'If you missed court less than 180 days ago, act now: that deadline is not extended.',
            ],
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'Can I reopen if the order is years old?',
          a: 'Yes, if you never received notice. If you missed court because of exceptional circumstances, the 180-day deadline has passed, but other options may exist.',
        },
        {
          q: 'If the judge reopens the case, have I won?',
          a: 'No. You go back to court with the case open and you need a defense, such as asylum, cancellation of removal, or family-based adjustment.',
        },
        {
          q: 'Can I be detained while the judge decides?',
          a: 'It is possible. The motion prevents deportation, not necessarily detention.',
        },
        {
          q: 'Where is the motion filed?',
          a: 'With the same court that issued the order.',
        },
      ],
    },
    conclusion: {
      title: 'Need help?',
      text: 'At the Law Office of Manuel Solis, we review in-absentia orders and prepare motions to reopen.',
      advice:
        'Book a consultation so an attorney can review your file before your next ICE appointment.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'Immigration and Nationality Act (INA), section 240(b)(5) — in-absentia orders and rescission',
        'INA section 240(e)(1) — definition of exceptional circumstances',
        'INA section 240(b)(7) — 10-year bar for failure to appear',
        '8 C.F.R. § 1003.23(b)(4) — motions to reopen before the immigration judge',
        'Campos-Chaves v. Garland, U.S. Supreme Court (2024)',
        'Matter of Lozada, 19 I&N Dec. 637 (BIA 1988)',
        'EOIR — Automated Case Information portal (acis.eoir.justice.gov) and hotline 1-800-898-7180',
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
          ? 'Mujer preocupada revisa una orden de deportación en ausencia frente a la corte de inmigración'
          : 'Worried woman reviewing an in-absentia removal order in front of an immigration courtroom'
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
