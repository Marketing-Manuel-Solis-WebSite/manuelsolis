import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'cambio-de-direccion-uscis-corte-ar-11-eoir-33';
// Debe coincidir con `date` del post en ALL_POSTS (app/[lang]/blog/page.tsx):
// antes de esa fecha la página no se publica.
const ISO_DATE = '2026-10-06';
const IMAGE = '/blog/blog_38/OCT_B2.jpg';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Me mudé y no avisé: AR-11 y EOIR-33',
    metaDesc:
      'Si te mudaste, tienes 10 días para avisar a USCIS y 5 días hábiles a la corte de inmigración. Cómo hacerlo y qué pasa si no avisas.',
    title:
      'Me mudé y no avisé: por qué cambiar tu dirección con USCIS y la corte puede salvar tu caso (AR-11 y EOIR-33)',
    displayDate: '06 Oct, 2026',
    readTime: '6 min',
    categoryLabel: 'Defensa contra Deportación',
    lastUpdated: '6 de octubre de 2026',
    summary: {
      title: 'Resumen inicial',
      text: 'Cambiarte de casa sin avisar es una de las formas más comunes de perder un caso de inmigración. Los avisos siguen llegando a la dirección vieja, faltas a una cita y el juez puede ordenar tu <strong>deportación en ausencia</strong>. Avisar es gratis, toma minutos y la ley lo exige.',
    },
    intro: [
      'Lo más importante: <strong>avisar a USCIS no avisa a la corte, y avisar a la corte no avisa a USCIS</strong>. Son dos trámites separados.',
    ],
    sections: [
      {
        icon: 'calendar',
        title: 'Los plazos que marca la ley',
        subtitle: 'Cuántos días tienes',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>USCIS (formulario AR-11):</strong> 10 días después de mudarte. Aplica, con pocas excepciones, a todo no ciudadano que lleva 30 días o más en Estados Unidos, incluidos los residentes permanentes.',
              '<strong>Corte de inmigración (formulario EOIR-33/IC):</strong> 5 días hábiles después de mudarte, si tienes un caso abierto en corte.',
              '<strong>Junta de Apelaciones (formulario EOIR-33/BIA):</strong> si tu caso está en apelación.',
            ],
          },
        ],
      },
      {
        icon: 'file',
        title: 'Cómo avisar a USCIS',
        subtitle: 'Formulario AR-11',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Entra a uscis.gov/addresschange y llena el cambio de dirección en línea.',
              'Escribe los números de recibo de tus casos pendientes para que también se actualicen.',
              'Guarda la confirmación en PDF o captura de pantalla.',
              'Si tienes cuenta en línea de USCIS, revisa que cada caso muestre la dirección nueva.',
            ],
          },
          {
            kind: 'note',
            text: 'El AR-11 también se puede mandar en papel, pero es más lento y no deja una confirmación inmediata.',
          },
        ],
      },
      {
        icon: 'gavel',
        title: 'Cómo avisar a la corte de inmigración',
        subtitle: 'Formulario EOIR-33',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Llena el formulario EOIR-33/IC con tu número A y tu dirección nueva.',
              'Preséntalo en la corte donde está tu caso, no en la corte más cercana a tu casa nueva.',
              'Manda copia a la fiscalía de ICE que lleva tu caso; el formulario trae un espacio para comprobarlo.',
              'Guarda la copia sellada o la confirmación.',
            ],
          },
          {
            kind: 'note',
            text: 'Si tienes abogado, puede presentarlo por el sistema electrónico de la corte.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'A quién más debes avisar',
        subtitle: 'Además de USCIS y la corte',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>ICE:</strong> si tienes citas de supervisión o estás en un programa como ISAP, avisa a tu oficial. Algunos programas exigen permiso antes de mudarte.',
              '<strong>Centro Nacional de Visas:</strong> si tu caso va por consulado, actualiza tus datos en el sistema del Departamento de Estado.',
              '<strong>Quien pagó tu fianza:</strong> la persona que pagó la fianza de inmigración también debe avisar su propio cambio de dirección a ICE.',
              '<strong>Tu abogado:</strong> para que ningún aviso se pierda.',
            ],
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Qué pasa si no avisas',
        subtitle: 'Las consecuencias',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>Deportación en ausencia:</strong> la corte manda los avisos a la última dirección que diste. Ese aviso vale legalmente aunque nunca lo hayas recibido.',
              '<strong>Casos negados en USCIS:</strong> si no llegas a tus huellas, a tu entrevista o no contestas una solicitud de evidencia (RFE), USCIS puede negar el caso. Desde 2025, USCIS envía a la corte con más frecuencia a quien le niega un trámite y no tiene estatus.',
              '<strong>Tarjetas perdidas:</strong> tu permiso de trabajo o tu green card pueden llegar a la dirección vieja.',
              '<strong>Consecuencias penales:</strong> no avisar a propósito es un delito menor, con multa de hasta $200, cárcel de hasta 30 días o ambas. También puede ser causa de deportación, salvo que demuestres que no fue intencional.',
            ],
          },
          {
            kind: 'warning',
            text: 'Desde 2025, el gobierno insiste en hacer cumplir las reglas de registro de extranjeros. No avisar un cambio de domicilio ya no es un detalle menor.',
          },
        ],
      },
      {
        icon: 'map',
        title: 'Mudarte no cambia tu corte',
        subtitle: 'Cambio de sede',
        blocks: [
          {
            kind: 'text',
            text: 'Si te mudas a otra ciudad o estado, tu caso sigue en la misma corte. Solo cambia si el juez aprueba una <strong>moción de cambio de sede</strong> (change of venue).',
          },
          {
            kind: 'warning',
            text: 'Mucha gente deja de ir a sus audiencias porque cree que su caso “se movió” solo. Eso termina en órdenes en ausencia.',
          },
          {
            kind: 'text',
            text: 'Tu abogado puede pedir el cambio de sede o, en algunos casos, audiencias por video.',
          },
        ],
      },
      {
        icon: 'check',
        title: 'Consejos para no perder avisos',
        subtitle: 'Hábitos que protegen tu caso',
        blocks: [
          {
            kind: 'list',
            items: [
              'Da tu domicilio real. Si recibes correo en otro lugar, anótalo como dirección postal.',
              'Si compartes buzón, pon tu nombre completo y “a cargo de” la persona dueña del buzón.',
              'Revisa el portal de la corte (acis.eoir.justice.gov) cada mes con tu número A.',
              'Abre una cuenta en línea de USCIS para ver tus avisos.',
              'No dependas del reenvío de correo del servicio postal.',
              'Guarda todas tus confirmaciones en una sola carpeta.',
            ],
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Si tengo green card también tengo que avisar?',
          a: 'Sí. Los residentes permanentes deben avisar su cambio de dirección en 10 días.',
        },
        {
          q: '¿Cuánto cuesta?',
          a: 'Nada. El AR-11 y el EOIR-33 son gratuitos.',
        },
        {
          q: '¿Me mudé hace meses y no avisé, qué hago?',
          a: 'Avisa hoy mismo. Luego revisa el portal de la corte y tu cuenta de USCIS; si perdiste alguna cita o audiencia, habla con un abogado de inmediato.',
        },
        {
          q: '¿Tengo que avisar si solo cambié de departamento en el mismo edificio?',
          a: 'Sí. Cualquier cambio, incluido el número de departamento, se debe reportar.',
        },
        {
          q: '¿Mi caso se pasa a otra corte si me mudo?',
          a: 'No. Necesitas que el juez apruebe un cambio de sede.',
        },
      ],
    },
    conclusion: {
      title: '¿Necesitas ayuda?',
      text: 'Si perdiste un aviso por un cambio de dirección, el tiempo corre en tu contra.',
      advice:
        'En la Oficina del Abogado Manuel Solís revisamos tu caso en la corte y en USCIS para saber qué pasó y qué se puede corregir.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'Ley de Inmigración y Nacionalidad (INA), sección 265 — aviso de cambio de dirección',
        'INA sección 266(b) — sanción penal por no avisar el cambio de dirección',
        'INA sección 237(a)(3)(A) — causal de deportación por no avisar el cambio de dirección',
        '8 C.F.R. § 265.1 — formulario AR-11',
        '8 C.F.R. § 1003.15(d) — obligación de avisar a la corte de inmigración (EOIR-33)',
        '8 C.F.R. § 1003.20 — cambio de sede',
        'USCIS — Cambio de dirección en línea (uscis.gov/addresschange)',
        'EOIR — Portal de estado de casos (acis.eoir.justice.gov)',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'I Moved and Didn’t Report It: AR-11 & EOIR-33',
    metaDesc:
      'If you moved, you have 10 days to notify USCIS and 5 business days to notify the immigration court. How to do it and what happens if you don’t.',
    title:
      'I Moved and Didn’t Report It: Why Updating Your Address with USCIS and the Court Can Save Your Case (AR-11 and EOIR-33)',
    displayDate: 'Oct 06, 2026',
    readTime: '6 min',
    categoryLabel: 'Deportation Defense',
    lastUpdated: 'October 6, 2026',
    summary: {
      title: 'Summary',
      text: 'Moving without reporting your new address is one of the most common ways to lose an immigration case. Notices keep going to the old address, you miss an appointment, and the judge can order your <strong>deportation in absentia</strong>. Reporting it is free, takes minutes, and the law requires it.',
    },
    intro: [
      'The most important point: <strong>notifying USCIS does not notify the court, and notifying the court does not notify USCIS</strong>. They are two separate filings.',
    ],
    sections: [
      {
        icon: 'calendar',
        title: 'The deadlines set by law',
        subtitle: 'How many days you have',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>USCIS (Form AR-11):</strong> 10 days after you move. With few exceptions, it applies to every noncitizen who has been in the United States for 30 days or more, including permanent residents.',
              '<strong>Immigration court (Form EOIR-33/IC):</strong> 5 business days after you move, if you have an open court case.',
              '<strong>Board of Immigration Appeals (Form EOIR-33/BIA):</strong> if your case is on appeal.',
            ],
          },
        ],
      },
      {
        icon: 'file',
        title: 'How to notify USCIS',
        subtitle: 'Form AR-11',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Go to uscis.gov/addresschange and complete the change of address online.',
              'Enter the receipt numbers of your pending cases so they are updated too.',
              'Save the confirmation as a PDF or a screenshot.',
              'If you have a USCIS online account, check that each case shows the new address.',
            ],
          },
          {
            kind: 'note',
            text: 'The AR-11 can also be mailed on paper, but it is slower and does not give you an immediate confirmation.',
          },
        ],
      },
      {
        icon: 'gavel',
        title: 'How to notify the immigration court',
        subtitle: 'Form EOIR-33',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Complete Form EOIR-33/IC with your A-Number and your new address.',
              'File it with the court where your case is, not the court closest to your new home.',
              'Send a copy to the ICE prosecutors handling your case; the form has a section to prove it.',
              'Keep the stamped copy or the confirmation.',
            ],
          },
          {
            kind: 'note',
            text: 'If you have an attorney, they can file it through the court’s electronic system.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'Who else you need to notify',
        subtitle: 'Besides USCIS and the court',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>ICE:</strong> if you have check-in appointments or are in a program such as ISAP, tell your officer. Some programs require permission before you move.',
              '<strong>National Visa Center:</strong> if your case is going through a consulate, update your information in the State Department’s system.',
              '<strong>Whoever posted your bond:</strong> the person who paid your immigration bond must also report their own change of address to ICE.',
              '<strong>Your attorney:</strong> so no notice gets lost.',
            ],
          },
        ],
      },
      {
        icon: 'alert',
        title: 'What happens if you don’t report it',
        subtitle: 'The consequences',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>Deportation in absentia:</strong> the court sends notices to the last address you gave. That notice is legally valid even if you never received it.',
              '<strong>Denied USCIS cases:</strong> if you miss your biometrics, your interview, or don’t answer a Request for Evidence (RFE), USCIS can deny the case. Since 2025, USCIS more often refers people to court when it denies a benefit and they have no status.',
              '<strong>Lost cards:</strong> your work permit or green card may be delivered to the old address.',
              '<strong>Criminal consequences:</strong> willfully failing to report is a misdemeanor, punishable by a fine of up to $200, up to 30 days in jail, or both. It can also be a ground for deportation unless you show it was not willful.',
            ],
          },
          {
            kind: 'warning',
            text: 'Since 2025, the government has been pressing to enforce the alien registration rules. Failing to report a change of address is no longer a minor detail.',
          },
        ],
      },
      {
        icon: 'map',
        title: 'Moving does not change your court',
        subtitle: 'Change of venue',
        blocks: [
          {
            kind: 'text',
            text: 'If you move to another city or state, your case stays in the same court. It only changes if the judge grants a <strong>motion to change venue</strong>.',
          },
          {
            kind: 'warning',
            text: 'Many people stop going to their hearings because they believe their case “moved” on its own. That ends in in-absentia orders.',
          },
          {
            kind: 'text',
            text: 'Your attorney can request a change of venue or, in some cases, video hearings.',
          },
        ],
      },
      {
        icon: 'check',
        title: 'Tips so you don’t miss notices',
        subtitle: 'Habits that protect your case',
        blocks: [
          {
            kind: 'list',
            items: [
              'Give your real home address. If you receive mail somewhere else, list it as your mailing address.',
              'If you share a mailbox, write your full name and “in care of” the mailbox owner.',
              'Check the court portal (acis.eoir.justice.gov) every month with your A-Number.',
              'Open a USCIS online account to see your notices.',
              'Don’t rely on postal mail forwarding.',
              'Keep all your confirmations in a single folder.',
            ],
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'If I have a green card, do I also have to report it?',
          a: 'Yes. Permanent residents must report their change of address within 10 days.',
        },
        {
          q: 'How much does it cost?',
          a: 'Nothing. The AR-11 and the EOIR-33 are free.',
        },
        {
          q: 'I moved months ago and didn’t report it. What should I do?',
          a: 'Report it today. Then check the court portal and your USCIS account; if you missed an appointment or hearing, talk to an attorney right away.',
        },
        {
          q: 'Do I have to report it if I only moved to another unit in the same building?',
          a: 'Yes. Any change, including the apartment number, must be reported.',
        },
        {
          q: 'Will my case move to another court if I move?',
          a: 'No. The judge has to grant a change of venue.',
        },
      ],
    },
    conclusion: {
      title: 'Need help?',
      text: 'If you missed a notice because of a change of address, time is working against you.',
      advice:
        'At the Law Office of Manuel Solis, we review your case in court and with USCIS to find out what happened and what can be fixed.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'Immigration and Nationality Act (INA), section 265 — notice of change of address',
        'INA section 266(b) — criminal penalty for failing to report a change of address',
        'INA section 237(a)(3)(A) — deportability for failing to report a change of address',
        '8 C.F.R. § 265.1 — Form AR-11',
        '8 C.F.R. § 1003.15(d) — duty to notify the immigration court (EOIR-33)',
        '8 C.F.R. § 1003.20 — change of venue',
        'USCIS — Online change of address (uscis.gov/addresschange)',
        'EOIR — Automated Case Information portal (acis.eoir.justice.gov)',
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
          ? 'Hombre revisa sus formularios AR-11 y EOIR-33 entre cajas de mudanza'
          : 'Man reviewing his AR-11 and EOIR-33 forms among moving boxes'
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
