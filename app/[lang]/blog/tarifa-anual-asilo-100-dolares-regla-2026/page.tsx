import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'tarifa-anual-asilo-100-dolares-regla-2026';
const ISO_DATE = '2026-08-06';
// TODO(portada): sustituir cuando marketing entregue la imagen definitiva.
const IMAGE = '/og-default.jpg';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Tarifa Anual de Asilo: el plazo de 30 días',
    metaDesc:
      'No pagar la Tarifa Anual de Asilo de $100 en 30 días puede costar el rechazo del I-589, el permiso de trabajo y exponerte a deportación. Cómo protegerte.',
    title: 'Tarifa Anual de Asilo de $100: el pago de 30 días que puede costarte el caso y el permiso de trabajo',
    displayDate: '06 Ago, 2026',
    readTime: '10 min',
    categoryLabel: 'Visa Humanitaria',
    lastUpdated: '6 de agosto de 2026',
    summary: {
      title: 'Resumen inicial',
      text: 'Pedir asilo en Estados Unidos ya no es gratis. Existe una <strong>Tarifa Anual de Asilo de $100</strong> que hay que pagar mientras el caso esté pendiente, y la consecuencia de no pagarla es desproporcionadamente grave: si USCIS le notifica y usted no paga <strong>dentro de 30 días</strong>, la solicitud I-589 puede ser rechazada, el permiso de trabajo asociado puede cancelarse de inmediato y la persona puede quedar expuesta a un proceso de remoción. La tarifa <strong>no se puede exonerar</strong> por falta de recursos. Este artículo explica cómo funciona el aviso, por qué su dirección postal se vuelve tan crítica y qué hacer si ya le rechazaron el caso.',
    },
    intro: [
      'Hay reglas que castigan un error grande y hay reglas que castigan un descuido pequeño con una consecuencia enorme. Esta es del segundo tipo, y por eso conviene entenderla bien: <strong>cien dólares no pagados a tiempo pueden costar un caso de asilo completo</strong>, junto con el permiso de trabajo que sostiene a toda una familia.',
      'La tarifa nace de la ley presupuestaria aprobada en 2025 y la regla que la implementa entró en vigor el <strong>29 de mayo de 2026</strong>. Su lógica es sencilla: mientras el caso de asilo siga pendiente, hay un pago anual, y el incumplimiento se trata como abandono.',
      'Un aviso importante antes de seguir: <strong>esta materia está en litigio</strong>. Hay demandas activas contra varias de las políticas derivadas de esa misma ley y algunas resoluciones judiciales han suspendido parcialmente su aplicación. Lo que lee aquí describe el marco tal como se planteó; <strong>verifique el estado vigente con un abogado antes de actuar</strong>, porque este es exactamente el tipo de regla que puede cambiar de un mes a otro.',
    ],
    sections: [
      {
        icon: 'dollar',
        title: 'Qué es la Tarifa Anual de Asilo y de dónde viene',
        subtitle: 'Un cobro nuevo sobre un derecho antiguo',
        blocks: [
          {
            kind: 'text',
            text: 'Durante décadas, presentar el formulario I-589 para pedir asilo no tenía costo. La razón era coherente con la naturaleza del trámite: quien huye de una persecución rara vez llega con dinero. La ley presupuestaria de 2025 cambió ese principio e introdujo cobros en el sistema de asilo, entre ellos una <strong>tarifa anual mientras el caso esté pendiente</strong>.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Monto:</strong> $100 al año mientras la solicitud de asilo siga pendiente.',
              '<strong>Vigencia de la regla:</strong> desde el 29 de mayo de 2026.',
              '<strong>Plazo para pagar tras el aviso:</strong> 30 días.',
              '<strong>Exoneración por bajos ingresos:</strong> no está disponible para esta tarifa.',
            ],
          },
          {
            kind: 'note',
            text: 'Que no exista exoneración es lo que distingue a esta tarifa de casi todo lo demás en el sistema migratorio. En otros trámites, quien no puede pagar solicita una exención. Aquí, planificar el pago es parte de la estrategia del caso desde el primer día.',
          },
        ],
      },
      {
        icon: 'clock',
        title: 'Cómo le avisan y por qué el número clave es 30',
        subtitle: 'El plazo que no admite excusas',
        blocks: [
          {
            kind: 'text',
            text: 'El mecanismo es el mismo que rige buena parte del sistema: USCIS envía una notificación y, a partir de ahí, corre un plazo. Aquí ese plazo es de <strong>30 días</strong>, y se cuenta desde la notificación, no desde el día en que usted la leyó.',
          },
          {
            kind: 'steps',
            items: [
              'USCIS emite el aviso de que corresponde pagar la tarifa anual.',
              'El aviso viaja a la <strong>última dirección registrada</strong> en su expediente.',
              'Corren los <strong>30 días</strong>, con independencia de si la carta le llegó o no.',
              'Si no hay pago dentro del plazo, la solicitud puede ser rechazada y el permiso de trabajo asociado cancelarse.',
            ],
          },
          {
            kind: 'warning',
            text: 'Un aviso enviado a una dirección vieja se considera entregado. No hay una segunda oportunidad automática porque usted se haya mudado y no lo reportara.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Qué pasa exactamente si no paga',
        subtitle: 'Tres consecuencias encadenadas',
        blocks: [
          {
            kind: 'cards',
            items: [
              {
                title: '1. Rechazo de la solicitud',
                desc: 'El I-589 pendiente puede ser rechazado. No es una negación tras evaluar sus méritos: es un cierre administrativo por incumplimiento.',
              },
              {
                title: '2. Permiso de trabajo cancelado',
                desc: 'El EAD que dependía de la solicitud pendiente pierde su base. Sin caso pendiente no hay permiso, y la pérdida del empleo suele ser inmediata.',
              },
              {
                title: '3. Exposición a remoción',
                desc: 'Sin solicitud pendiente ni estatus, la persona queda expuesta a que se inicie o se reanude un proceso de deportación.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'La secuencia importa: no son tres riesgos independientes, es una cadena. El primer eslabón —un pago no realizado— arrastra los otros dos en cuestión de semanas.',
          },
        ],
      },
      {
        icon: 'map',
        title: 'Su dirección postal es ahora parte de su defensa',
        subtitle: 'El descuido más común y más caro',
        blocks: [
          {
            kind: 'text',
            text: 'Las personas con casos de asilo se mudan con frecuencia: cambian de trabajo, de ciudad, de casa compartida. Cada mudanza sin reportar convierte su expediente en una bomba de tiempo, porque el gobierno seguirá escribiendo a la dirección que tiene registrada.',
          },
          {
            kind: 'list',
            items: [
              'Reporte cualquier cambio de domicilio con el <strong>formulario AR-11 dentro de los 10 días</strong> siguientes a la mudanza.',
              'Si tiene un caso en corte de inmigración, actualice la dirección <strong>también ante la corte</strong>: son sistemas distintos y actualizar uno no actualiza el otro.',
              'Si su abogado presentó el <strong>G-28</strong>, los avisos deberían llegarle también a él; confirme que ese formulario esté vigente.',
              'Revise su <strong>cuenta en línea de USCIS</strong> con regularidad: muchos avisos aparecen ahí antes de llegar por correo.',
            ],
          },
          {
            kind: 'note',
            text: 'Si comparte vivienda o recibe correo en casa de un familiar, hable con esa persona explícitamente: un sobre de USCIS que alguien deja sobre la mesa "para después" puede consumir la mitad del plazo antes de que usted lo abra.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'Qué hacer si ya le rechazaron el caso por no pagar',
        subtitle: 'No todo está perdido, pero hay que moverse rápido',
        blocks: [
          {
            kind: 'text',
            text: 'Un rechazo administrativo no es lo mismo que una negación de asilo por el fondo del caso, y esa diferencia abre opciones. Lo que no perdona es la demora: cada semana que pasa complica el panorama.',
          },
          {
            kind: 'steps',
            items: [
              'Conserve <strong>el aviso y el sobre</strong>. La fecha y la dirección impresas son evidencia si hubo un problema de notificación.',
              'Reúna prueba de <strong>dónde vivía realmente</strong> en esa fecha: contrato de renta, recibos, correspondencia.',
              'Pida a un abogado que evalúe si procede una <strong>moción o una nueva presentación</strong>, y bajo qué condiciones.',
              'Revise el <strong>plazo de un año</strong> para pedir asilo: si su primera solicitud fue oportuna, ese hecho puede ser relevante al replantear el caso.',
              'Evalúe <strong>alternativas en paralelo</strong> —Visa U, VAWA, Visa T, cancelación de remoción— para no depender de una sola vía.',
              'Verifique el <strong>estado del litigio</strong> sobre esta regla: puede afectar directamente a su situación.',
            ],
          },
          {
            kind: 'warning',
            text: 'No presente una solicitud nueva por su cuenta antes de que alguien revise qué pasó con la anterior. Una segunda presentación mal planteada puede generar contradicciones en su expediente que después se usan contra su credibilidad.',
          },
        ],
      },
      {
        icon: 'gavel',
        title: 'El litigio en curso y por qué debe verificar antes de actuar',
        subtitle: 'Materia en movimiento',
        blocks: [
          {
            kind: 'text',
            text: 'Varias de las políticas derivadas de la ley presupuestaria de 2025 han sido impugnadas en cortes federales, y ha habido resoluciones que suspendieron parcialmente su aplicación. Eso significa que la respuesta correcta a "¿tengo que pagar?" puede ser distinta según la fecha y según su situación concreta.',
          },
          {
            kind: 'text',
            text: 'La conclusión práctica no es esperar a ver qué pasa. Es la contraria: <strong>mantenga su caso en cumplimiento mientras el panorama se aclara</strong> y consulte antes de dejar de pagar algo confiando en que un tribunal lo resolverá. Un caso cerrado por incumplimiento es mucho más difícil de reabrir que un pago hecho de más.',
          },
          {
            kind: 'note',
            text: 'Este artículo se actualiza cuando cambia el estado de la regla. La fecha de última actualización aparece al inicio; si han pasado semanas desde entonces, confirme la situación vigente antes de decidir.',
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Puedo pedir que me exoneren la tarifa por no tener dinero?',
          a: 'No. A diferencia de otros trámites migratorios, esta tarifa no admite exoneración por bajos ingresos. Por eso conviene presupuestarla como un costo anual fijo mientras el caso siga pendiente.',
        },
        {
          q: 'Mi caso de asilo está en corte, no con USCIS. ¿También aplica?',
          a: 'Los casos defensivos ante la corte de inmigración y los afirmativos ante USCIS se tramitan por vías distintas, y cómo se aplica el cobro en cada una es precisamente el punto a confirmar con su abogado, con su expediente delante.',
        },
        {
          q: 'Pagué pero no recibí confirmación. ¿Qué hago?',
          a: 'Guarde el comprobante del pago y una captura del recibo en su cuenta de USCIS. Si no aparece registrado, plantéelo por escrito de inmediato: la prueba de que pagó dentro del plazo es suya y hay que conservarla.',
        },
        {
          q: 'Si me rechazan el I-589, ¿pierdo el permiso de trabajo aunque esté vigente?',
          a: 'El permiso otorgado con base en una solicitud pendiente depende de que esa solicitud siga viva. Si el caso se cierra, la base del permiso desaparece, aunque la tarjeta física tenga fecha futura.',
        },
        {
          q: '¿Puedo volver a pedir asilo después de un rechazo por no pagar?',
          a: 'Depende de su situación, del plazo de un año para solicitar asilo y de si hay un proceso de remoción abierto. Es una decisión que debe tomarse con asesoría, no presentando otro formulario a ver qué pasa.',
        },
      ],
    },
    conclusion: {
      title: 'Cien dólares y treinta días',
      text: 'Pocas reglas del sistema migratorio tienen una relación tan desproporcionada entre lo pequeño del requisito y lo grave de la consecuencia. Mantener la dirección actualizada, revisar la cuenta de USCIS y pagar dentro del plazo son tres hábitos que protegen años de trámite.',
      advice: 'Si recibió un aviso de pago o un rechazo, el tiempo corre desde la notificación, no desde que usted se enteró.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'USCIS — Tarifa Anual de Asilo y regla vigente desde el 29 de mayo de 2026 (verificar estado actual)',
        'Ley presupuestaria de 2025 (H.R. 1) — disposiciones sobre tarifas del sistema de asilo',
        'USCIS — Formulario I-589, Solicitud de Asilo y de Suspensión de Remoción',
        'USCIS — Formulario AR-11, cambio de domicilio',
        'Litigio federal sobre políticas derivadas de H.R. 1 — verificar resoluciones vigentes antes de actuar',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: '$100 Asylum Annual Fee: The 30-Day Deadline',
    metaDesc:
      'Missing the $100 Asylum Annual Fee within 30 days can cost you the I-589, your work permit and expose you to removal. How to protect your case.',
    title: 'The $100 Asylum Annual Fee: The 30-Day Payment That Can Cost You Your Case and Your Work Permit',
    displayDate: 'Aug 06, 2026',
    readTime: '10 min',
    categoryLabel: 'Humanitarian Relief',
    lastUpdated: 'August 6, 2026',
    summary: {
      title: 'Initial Summary',
      text: 'Applying for asylum in the United States is no longer free. There is now an <strong>Asylum Annual Fee of $100</strong> owed while a case remains pending, and the consequence of not paying it is wildly disproportionate: if USCIS notifies you and you do not pay <strong>within 30 days</strong>, the I-589 can be rejected, the associated work permit can be cancelled immediately, and the person can be exposed to removal proceedings. The fee <strong>cannot be waived</strong> for inability to pay. This article explains how the notice works, why your mailing address suddenly matters so much, and what to do if your case has already been rejected.',
    },
    intro: [
      'Some rules punish a big mistake. Others punish a small oversight with an enormous consequence. This one is the second kind, which is why it is worth understanding properly: <strong>one hundred dollars unpaid on time can cost an entire asylum case</strong>, along with the work permit supporting a whole family.',
      'The fee comes from the 2025 budget law, and the rule implementing it took effect on <strong>May 29, 2026</strong>. Its logic is simple: while the asylum case remains pending, there is an annual payment, and non-payment is treated as abandonment.',
      'An important caveat before continuing: <strong>this area is in active litigation</strong>. There are lawsuits against several policies flowing from that same law, and some court orders have partially suspended their application. What you read here describes the framework as designed; <strong>verify the current state with an attorney before acting</strong>, because this is exactly the kind of rule that can change from one month to the next.',
    ],
    sections: [
      {
        icon: 'dollar',
        title: 'What the Asylum Annual Fee is and where it comes from',
        subtitle: 'A new charge on an old right',
        blocks: [
          {
            kind: 'text',
            text: 'For decades, filing Form I-589 to request asylum carried no cost. The reason was consistent with the nature of the filing: people fleeing persecution rarely arrive with money. The 2025 budget law changed that principle and introduced charges into the asylum system, among them an <strong>annual fee while the case is pending</strong>.',
          },
          {
            kind: 'list',
            items: [
              '<strong>Amount:</strong> $100 per year while the asylum application remains pending.',
              '<strong>Rule in effect since:</strong> May 29, 2026.',
              '<strong>Deadline to pay after notice:</strong> 30 days.',
              '<strong>Low-income waiver:</strong> not available for this fee.',
            ],
          },
          {
            kind: 'note',
            text: 'The absence of a waiver is what sets this fee apart from nearly everything else in the immigration system. In other filings, someone who cannot pay requests a waiver. Here, planning for the payment is part of case strategy from day one.',
          },
        ],
      },
      {
        icon: 'clock',
        title: 'How you are notified and why the key number is 30',
        subtitle: 'The deadline that takes no excuses',
        blocks: [
          {
            kind: 'text',
            text: 'The mechanism is the same one that governs much of the system: USCIS sends a notice and a clock starts. Here that clock is <strong>30 days</strong>, counted from the notice — not from the day you read it.',
          },
          {
            kind: 'steps',
            items: [
              'USCIS issues the notice that the annual fee is due.',
              'The notice travels to the <strong>last address on record</strong> in your file.',
              'The <strong>30 days</strong> run, regardless of whether the letter reached you.',
              'If no payment is made within the deadline, the application can be rejected and the associated work permit cancelled.',
            ],
          },
          {
            kind: 'warning',
            text: 'A notice sent to an old address counts as delivered. There is no automatic second chance because you moved and did not report it.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Exactly what happens if you do not pay',
        subtitle: 'Three consequences in a chain',
        blocks: [
          {
            kind: 'cards',
            items: [
              {
                title: '1. Application rejected',
                desc: 'The pending I-589 can be rejected. This is not a denial after weighing your merits: it is an administrative closure for non-compliance.',
              },
              {
                title: '2. Work permit cancelled',
                desc: 'The EAD that depended on the pending application loses its basis. No pending case, no permit — and loss of the job usually follows immediately.',
              },
              {
                title: '3. Exposure to removal',
                desc: 'With no pending application and no status, the person is exposed to removal proceedings being started or resumed.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'The sequence matters: these are not three independent risks, they are a chain. The first link — a missed payment — drags the other two along within weeks.',
          },
        ],
      },
      {
        icon: 'map',
        title: 'Your mailing address is now part of your defense',
        subtitle: 'The most common and most expensive oversight',
        blocks: [
          {
            kind: 'text',
            text: 'People with asylum cases move often: new jobs, new cities, shared housing. Every unreported move turns your file into a time bomb, because the government will keep writing to the address it has on record.',
          },
          {
            kind: 'list',
            items: [
              'Report any change of address using <strong>Form AR-11 within 10 days</strong> of moving.',
              'If you have a case in immigration court, update the address <strong>with the court as well</strong>: these are separate systems and updating one does not update the other.',
              'If your attorney filed a <strong>G-28</strong>, notices should also reach them; confirm that form is current.',
              'Check your <strong>USCIS online account</strong> regularly: many notices appear there before arriving by mail.',
            ],
          },
          {
            kind: 'note',
            text: 'If you share housing or receive mail at a relative’s home, talk to that person explicitly: a USCIS envelope left on a table "for later" can burn half the deadline before you open it.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'What to do if your case was already rejected for non-payment',
        subtitle: 'Not everything is lost, but you must move fast',
        blocks: [
          {
            kind: 'text',
            text: 'An administrative rejection is not the same as a denial on the merits, and that difference opens options. What it does not forgive is delay: every week that passes narrows the picture.',
          },
          {
            kind: 'steps',
            items: [
              'Keep <strong>the notice and the envelope</strong>. The printed date and address are evidence if there was a notification problem.',
              'Gather proof of <strong>where you actually lived</strong> on that date: lease, utility bills, correspondence.',
              'Have an attorney assess whether a <strong>motion or a new filing</strong> is appropriate, and on what terms.',
              'Review the <strong>one-year asylum filing deadline</strong>: if your first application was timely, that fact may matter in reframing the case.',
              'Evaluate <strong>parallel alternatives</strong> — U visa, VAWA, T visa, cancellation of removal — so you are not relying on a single path.',
              'Check the <strong>status of the litigation</strong> over this rule: it may directly affect your situation.',
            ],
          },
          {
            kind: 'warning',
            text: 'Do not file a new application on your own before someone reviews what happened to the previous one. A poorly framed second filing can create contradictions in your record that are later used against your credibility.',
          },
        ],
      },
      {
        icon: 'gavel',
        title: 'The ongoing litigation and why to verify before acting',
        subtitle: 'A moving target',
        blocks: [
          {
            kind: 'text',
            text: 'Several policies flowing from the 2025 budget law have been challenged in federal court, and there have been orders partially suspending their application. That means the right answer to "do I have to pay?" can differ depending on the date and on your specific situation.',
          },
          {
            kind: 'text',
            text: 'The practical conclusion is not to wait and see. It is the opposite: <strong>keep your case in compliance while the picture clears</strong>, and consult before stopping a payment on the assumption a court will fix it. A case closed for non-compliance is far harder to reopen than an overpayment is to recover.',
          },
          {
            kind: 'note',
            text: 'This article is updated when the rule’s status changes. The last-updated date appears at the top; if weeks have passed since then, confirm the current situation before deciding.',
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'Can I ask for a waiver because I cannot afford it?',
          a: 'No. Unlike other immigration filings, this fee does not allow a low-income waiver. That is why it should be budgeted as a fixed annual cost while the case remains pending.',
        },
        {
          q: 'My asylum case is in court, not with USCIS. Does it apply?',
          a: 'Defensive cases before the immigration court and affirmative cases before USCIS run on different tracks, and how the charge applies in each is precisely what to confirm with your attorney, with your file in hand.',
        },
        {
          q: 'I paid but received no confirmation. What now?',
          a: 'Keep the payment receipt and a screenshot of the record in your USCIS account. If it does not appear, raise it in writing immediately: the proof that you paid on time is yours to keep.',
        },
        {
          q: 'If my I-589 is rejected, do I lose my work permit even if it has not expired?',
          a: 'A permit granted on the basis of a pending application depends on that application staying alive. If the case closes, the basis for the permit disappears, even if the physical card shows a future date.',
        },
        {
          q: 'Can I apply for asylum again after a rejection for non-payment?',
          a: 'It depends on your situation, on the one-year filing deadline, and on whether removal proceedings are open. That is a decision to make with counsel, not by filing another form to see what happens.',
        },
      ],
    },
    conclusion: {
      title: 'One hundred dollars and thirty days',
      text: 'Few rules in the immigration system have such a lopsided relationship between how small the requirement is and how serious the consequence. Keeping your address current, checking your USCIS account, and paying within the deadline are three habits that protect years of work.',
      advice: 'If you received a payment notice or a rejection, the clock runs from the notice, not from when you found out.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'USCIS — Asylum Annual Fee and rule effective May 29, 2026 (verify current status)',
        '2025 budget law (H.R. 1) — asylum system fee provisions',
        'USCIS — Form I-589, Application for Asylum and for Withholding of Removal',
        'USCIS — Form AR-11, change of address',
        'Federal litigation over H.R. 1 policies — verify current orders before acting',
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
          ? 'Tarifa Anual de Asilo de 100 dólares y plazo de 30 días'
          : 'Asylum Annual Fee of one hundred dollars and the 30-day deadline'
      }
      isoDate={ISO_DATE}
      servicePath="/servicios/asilo"
      trackerCategory="Visa Humanitaria"
    />
  );
}

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}
