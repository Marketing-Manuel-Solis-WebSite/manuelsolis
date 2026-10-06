import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'habeas-corpus-detenido-ice-sin-fianza';
// Debe coincidir con `date` del post en ALL_POSTS (app/[lang]/blog/page.tsx):
// antes de esa fecha la página no se publica.
const ISO_DATE = '2026-10-06';
const IMAGE = '/blog/blog_39/OCT_B3.png';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Habeas corpus si ICE niega la fianza (2026)',
    metaDesc:
      'Si ICE detuvo a tu familiar y le niegan la fianza, un habeas corpus en corte federal puede lograr una audiencia de fianza o su libertad. Así funciona en 2026.',
    title: 'Habeas corpus: cómo sacar a un familiar de la detención de ICE cuando le niegan la fianza',
    displayDate: '06 Oct, 2026',
    readTime: '7 min',
    categoryLabel: 'Defensa contra Deportación',
    lastUpdated: '6 de octubre de 2026',
    summary: {
      title: 'Resumen inicial',
      text: 'El <strong>habeas corpus</strong> es una demanda ante un juez federal para revisar si una detención es legal. Desde 2025 se volvió la herramienta principal para miles de personas detenidas por ICE sin derecho a fianza. Puede lograr una <strong>audiencia de fianza o incluso la libertad</strong>, pero el resultado depende mucho del estado donde está detenida la persona.',
    },
    intro: [
      'Si detuvieron a tu familiar y le negaron la fianza, aquí te explicamos qué es el habeas corpus, por qué las reglas cambiaron desde 2025, cómo varía la situación según el lugar de detención y qué debe preparar la familia.',
    ],
    sections: [
      {
        icon: 'gavel',
        title: 'Qué es y qué no es un habeas corpus',
        subtitle: 'Lo básico',
        blocks: [
          {
            kind: 'list',
            items: [
              'Se presenta en la corte federal del distrito donde está detenida la persona, contra el funcionario que la tiene bajo custodia.',
              'Revisa la detención, no la deportación. El caso de inmigración sigue en la corte de inmigración.',
              'Si se gana, el juez federal puede ordenar una audiencia de fianza, la libertad con condiciones o, en algunos casos, que no trasladen a la persona mientras decide.',
            ],
          },
          {
            kind: 'note',
            text: 'No sirve para anular una orden de deportación; eso se pelea por otras vías.',
          },
        ],
      },
      {
        icon: 'clock',
        title: 'Por qué hay tantos habeas desde 2025',
        subtitle: 'El cambio de reglas',
        blocks: [
          {
            kind: 'text',
            text: 'En julio de 2025, ICE empezó a tratar a quienes entraron sin inspección como <strong>“solicitantes de admisión”</strong> sujetos a detención obligatoria. Eso sin importar cuántos años llevan aquí.',
          },
          {
            kind: 'text',
            text: 'En septiembre de 2025, la Junta de Apelaciones de Inmigración respaldó esa postura en <em>Matter of Yajure Hurtado</em>. Desde entonces, los jueces de inmigración no pueden dar fianza a esas personas.',
          },
          {
            kind: 'text',
            text: 'El resultado: miles de personas con años en el país, familia y sin antecedentes quedaron detenidas sin audiencia de fianza. <strong>La única puerta fue la corte federal.</strong>',
          },
        ],
      },
      {
        icon: 'map',
        title: 'El mapa en septiembre de 2026: todo depende del lugar de detención',
        subtitle: 'Las cortes de apelaciones están divididas',
        blocks: [
          {
            kind: 'text',
            text: 'Las cortes federales de apelaciones están divididas. Así estaba el tema al 11 de septiembre de 2026, según el seguimiento de CLINIC:',
          },
          {
            kind: 'table',
            headers: ['Región (circuito federal)', 'Estados', 'Situación para quien entró sin inspección'],
            rows: [
              [
                'Quinto Circuito',
                'Texas, Luisiana, Misisipi',
                'A favor del gobierno: detención obligatoria (<em>Buenrostro-Mendez</em>). Queda abierto el habeas por detención prolongada.',
              ],
              [
                'Octavo Circuito',
                'Arkansas, Iowa, Minnesota, Misuri, Nebraska, Dakota del Norte y del Sur',
                'A favor del gobierno (<em>Avila v. Bondi</em>).',
              ],
              [
                'Primer, Segundo, Tercer, Cuarto, Sexto, Séptimo, Noveno, Décimo y Undécimo Circuitos',
                'Entre otros: California, Arizona, Nevada, Illinois, Colorado, Nuevo México, Tennessee, Florida, Georgia, Carolina del Norte, Nueva York y Nueva Jersey',
                'En contra del gobierno: en general hay derecho a audiencia de fianza ante un juez de inmigración.',
              ],
            ],
          },
          {
            kind: 'text',
            text: 'En Texas hubo un giro importante. El 2 de julio de 2026, un panel del Quinto Circuito dijo que después de 90 días de detención debía haber audiencia de fianza. El 10 de julio el tribunal anuló esa decisión para revisarla con todos sus jueces, y la audiencia fue el 24 de septiembre de 2026.',
          },
          {
            kind: 'note',
            text: 'Además, la Corte Suprema tiene peticiones pendientes sobre este tema. Su decisión podría cambiar las reglas para todo el país.',
          },
        ],
      },
      {
        icon: 'plane',
        title: 'Por qué la rapidez es clave: los traslados',
        subtitle: 'Horas o días, no semanas',
        blocks: [
          {
            kind: 'text',
            text: 'El habeas se presenta donde está detenida la persona en ese momento. ICE traslada con frecuencia a detenidos a centros de Texas y Luisiana, donde hoy la ley es menos favorable.',
          },
          {
            kind: 'warning',
            text: 'En general, si el habeas se presenta antes del traslado, la corte donde se presentó conserva el caso. Por eso la familia debe actuar en horas o días, no en semanas.',
          },
        ],
      },
      {
        icon: 'search',
        title: 'Cuándo se usa con más frecuencia',
        subtitle: 'Cinco situaciones típicas',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Detención sin audiencia de fianza por haber entrado sin inspección.',
              'Detención prolongada, de muchos meses, sin una revisión individual del caso.',
              'Detención después de una orden final que se alarga más de seis meses sin fecha real de deportación.',
              'Nueva detención de alguien que ya estaba libre con fianza o bajo palabra, sin una razón nueva.',
              'Detención de alguien que tiene pruebas de ser ciudadano estadounidense.',
            ],
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'Qué debe juntar la familia para el abogado',
        subtitle: 'Documentos y datos',
        blocks: [
          {
            kind: 'list',
            items: [
              'Nombre completo, fecha de nacimiento y número A.',
              'Centro de detención actual, que puedes confirmar en el localizador de ICE.',
              'Fecha y lugar del arresto.',
              'Cómo y cuándo entró a Estados Unidos, y cuántos años lleva aquí.',
              'Hijos ciudadanos, cónyuge y otros dependientes.',
              'Antecedentes penales o constancia de que no hay.',
              'Historial migratorio: órdenes previas, deportaciones y casos pendientes.',
              'Papeles de ICE o de la corte: Aviso de Comparecencia (NTA), decisión de custodia o negativa de fianza.',
              'Cartas de apoyo y comprobantes de domicilio, trabajo e impuestos, útiles para la futura audiencia de fianza.',
            ],
          },
        ],
      },
      {
        icon: 'balance',
        title: 'Qué pasa después de presentarlo',
        subtitle: 'El proceso en corte federal',
        blocks: [
          {
            kind: 'list',
            items: [
              'El juez federal ordena al gobierno responder, a veces en pocos días.',
              'Si se gana, el juez puede ordenar una audiencia de fianza en un plazo corto o la libertad con condiciones.',
              'En la audiencia de fianza se discute el monto y las condiciones de salida.',
              'Si se pierde, se puede apelar al tribunal de apelaciones del circuito.',
            ],
          },
          {
            kind: 'note',
            text: 'El caso de inmigración sigue su curso: el habeas no es una defensa contra la deportación.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Límites y riesgos',
        subtitle: 'Lo que no garantiza',
        blocks: [
          {
            kind: 'list',
            items: [
              'No hay garantía. Pesan el circuito, el historial penal y la historia migratoria de la persona.',
              'Ciertos delitos traen detención obligatoria por otras leyes, como la Ley Laken Riley.',
              'Si ya hay una orden final de deportación, el habeas no la detiene; se necesita una suspensión (stay).',
              'La cuota para presentar un habeas en corte federal es de $5; los honorarios del abogado son aparte.',
            ],
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Cuánto tarda?',
          a: 'Varía por corte. Algunos casos se resuelven en días o pocas semanas; otros tardan más.',
        },
        {
          q: '¿Puede presentarlo un familiar?',
          a: 'Normalmente lo presenta un abogado a nombre de la persona detenida. La familia ayuda con documentos y pruebas.',
        },
        {
          q: '¿Vale la pena si mi familiar está detenido en Texas?',
          a: 'Puede valer la pena. La ley del Quinto Circuito hoy es más difícil, pero siguen existiendo argumentos de debido proceso para detenciones largas.',
        },
        {
          q: '¿Si lo liberan, se acaba su caso?',
          a: 'No. Debe seguir yendo a todas sus audiencias y citas con ICE.',
        },
      ],
    },
    conclusion: {
      title: '¿Necesitas ayuda?',
      text: 'En la Oficina del Abogado Manuel Solís presentamos peticiones de habeas corpus en cortes federales.',
      advice:
        'Si detuvieron a tu familiar y le negaron la fianza, llámanos de inmediato: un traslado puede cambiar el resultado del caso.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        '28 U.S.C. § 2241 — habeas corpus en corte federal',
        '28 U.S.C. § 1914(a) — cuota de $5 para presentar un habeas corpus',
        'Ley de Inmigración y Nacionalidad (INA), secciones 235(b) y 236 — detención de solicitantes de admisión y fianza',
        'Matter of Yajure Hurtado, Junta de Apelaciones de Inmigración (septiembre de 2025)',
        'Buenrostro-Mendez, Quinto Circuito, y Avila v. Bondi, Octavo Circuito',
        'Zadvydas v. Davis, Corte Suprema de Estados Unidos (2001) — detención después de una orden final',
        'CLINIC — seguimiento de litigios sobre detención obligatoria (11 de septiembre de 2026)',
        'ICE — Localizador de detenidos en línea (locator.ice.gov)',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'Habeas Corpus When ICE Denies Bond (2026)',
    metaDesc:
      'If ICE detained your family member and denied bond, a habeas corpus petition in federal court can win a bond hearing or release. How it works in 2026.',
    title: 'Habeas Corpus: How to Get a Family Member Out of ICE Detention When Bond Is Denied',
    displayDate: 'Oct 06, 2026',
    readTime: '7 min',
    categoryLabel: 'Deportation Defense',
    lastUpdated: 'October 6, 2026',
    summary: {
      title: 'Summary',
      text: 'A <strong>habeas corpus</strong> petition asks a federal judge to review whether a detention is lawful. Since 2025 it has become the main tool for thousands of people held by ICE without the right to bond. It can win a <strong>bond hearing or even release</strong>, but the outcome depends heavily on the state where the person is detained.',
    },
    intro: [
      'If your family member was detained and denied bond, here we explain what habeas corpus is, why the rules changed in 2025, how the situation varies by place of detention, and what the family needs to prepare.',
    ],
    sections: [
      {
        icon: 'gavel',
        title: 'What habeas corpus is and is not',
        subtitle: 'The basics',
        blocks: [
          {
            kind: 'list',
            items: [
              'It is filed in the federal court for the district where the person is detained, against the official who holds them in custody.',
              'It reviews the detention, not the deportation. The immigration case stays in immigration court.',
              'If it succeeds, the federal judge can order a bond hearing, release on conditions, or, in some cases, that the person not be transferred while the judge decides.',
            ],
          },
          {
            kind: 'note',
            text: 'It cannot cancel a deportation order; that is fought through other avenues.',
          },
        ],
      },
      {
        icon: 'clock',
        title: 'Why there have been so many habeas petitions since 2025',
        subtitle: 'The rule change',
        blocks: [
          {
            kind: 'text',
            text: 'In July 2025, ICE began treating people who entered without inspection as <strong>“applicants for admission”</strong> subject to mandatory detention, no matter how many years they have lived here.',
          },
          {
            kind: 'text',
            text: 'In September 2025, the Board of Immigration Appeals endorsed that position in <em>Matter of Yajure Hurtado</em>. Since then, immigration judges cannot grant bond to these people.',
          },
          {
            kind: 'text',
            text: 'The result: thousands of people with years in the country, families, and no criminal record were held without a bond hearing. <strong>The only door left was federal court.</strong>',
          },
        ],
      },
      {
        icon: 'map',
        title: 'The map as of September 2026: it all depends on where the person is held',
        subtitle: 'The courts of appeals are split',
        blocks: [
          {
            kind: 'text',
            text: 'The federal courts of appeals are divided. This is where things stood as of September 11, 2026, according to CLINIC’s tracker:',
          },
          {
            kind: 'table',
            headers: ['Region (federal circuit)', 'States', 'Situation for people who entered without inspection'],
            rows: [
              [
                'Fifth Circuit',
                'Texas, Louisiana, Mississippi',
                'Pro-government: mandatory detention (<em>Buenrostro-Mendez</em>). Habeas for prolonged detention remains available.',
              ],
              [
                'Eighth Circuit',
                'Arkansas, Iowa, Minnesota, Missouri, Nebraska, North and South Dakota',
                'Pro-government (<em>Avila v. Bondi</em>).',
              ],
              [
                'First, Second, Third, Fourth, Sixth, Seventh, Ninth, Tenth, and Eleventh Circuits',
                'Among others: California, Arizona, Nevada, Illinois, Colorado, New Mexico, Tennessee, Florida, Georgia, North Carolina, New York, and New Jersey',
                'Against the government: in general, there is a right to a bond hearing before an immigration judge.',
              ],
            ],
          },
          {
            kind: 'text',
            text: 'There was a major turn in Texas. On July 2, 2026, a Fifth Circuit panel held that after 90 days of detention there must be a bond hearing. On July 10 the court vacated that decision to rehear it with all its judges, and the hearing took place on September 24, 2026.',
          },
          {
            kind: 'note',
            text: 'The Supreme Court also has pending petitions on this issue. Its decision could change the rules nationwide.',
          },
        ],
      },
      {
        icon: 'plane',
        title: 'Why speed is key: transfers',
        subtitle: 'Hours or days, not weeks',
        blocks: [
          {
            kind: 'text',
            text: 'Habeas is filed where the person is detained at that moment. ICE frequently transfers detainees to facilities in Texas and Louisiana, where the law is currently less favorable.',
          },
          {
            kind: 'warning',
            text: 'In general, if the habeas petition is filed before the transfer, the court where it was filed keeps the case. That is why the family must act within hours or days, not weeks.',
          },
        ],
      },
      {
        icon: 'search',
        title: 'When it is used most often',
        subtitle: 'Five typical situations',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Detention without a bond hearing because the person entered without inspection.',
              'Prolonged detention, for many months, without an individualized review of the case.',
              'Detention after a final order that stretches beyond six months with no real deportation date.',
              'Re-detention of someone who was already free on bond or parole, with no new reason.',
              'Detention of someone who has evidence of being a U.S. citizen.',
            ],
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'What the family should gather for the attorney',
        subtitle: 'Documents and information',
        blocks: [
          {
            kind: 'list',
            items: [
              'Full name, date of birth, and A-Number.',
              'Current detention center, which you can confirm with the ICE detainee locator.',
              'Date and place of the arrest.',
              'How and when they entered the United States, and how many years they have been here.',
              'U.S. citizen children, spouse, and other dependents.',
              'Criminal record, or proof that there is none.',
              'Immigration history: prior orders, deportations, and pending cases.',
              'ICE or court papers: Notice to Appear (NTA), custody decision, or bond denial.',
              'Support letters and proof of address, employment, and taxes, useful for the future bond hearing.',
            ],
          },
        ],
      },
      {
        icon: 'balance',
        title: 'What happens after it is filed',
        subtitle: 'The process in federal court',
        blocks: [
          {
            kind: 'list',
            items: [
              'The federal judge orders the government to respond, sometimes within a few days.',
              'If it succeeds, the judge can order a bond hearing within a short deadline or release on conditions.',
              'At the bond hearing, the amount and the conditions of release are decided.',
              'If it fails, it can be appealed to the circuit court of appeals.',
            ],
          },
          {
            kind: 'note',
            text: 'The immigration case continues: habeas is not a defense against deportation.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Limits and risks',
        subtitle: 'What it does not guarantee',
        blocks: [
          {
            kind: 'list',
            items: [
              'There is no guarantee. The circuit, the person’s criminal record, and their immigration history all matter.',
              'Certain crimes trigger mandatory detention under other laws, such as the Laken Riley Act.',
              'If there is already a final deportation order, habeas does not stop it; a stay of removal is needed.',
              'The fee to file a habeas petition in federal court is $5; attorney’s fees are separate.',
            ],
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'How long does it take?',
          a: 'It varies by court. Some cases are resolved in days or a few weeks; others take longer.',
        },
        {
          q: 'Can a family member file it?',
          a: 'It is usually filed by an attorney on behalf of the detained person. The family helps with documents and evidence.',
        },
        {
          q: 'Is it worth it if my family member is detained in Texas?',
          a: 'It can be. Fifth Circuit law is harder today, but due process arguments for long detentions still exist.',
        },
        {
          q: 'If they are released, is their case over?',
          a: 'No. They must keep attending all their hearings and ICE appointments.',
        },
      ],
    },
    conclusion: {
      title: 'Need help?',
      text: 'At the Law Office of Manuel Solis, we file habeas corpus petitions in federal court.',
      advice:
        'If your family member was detained and denied bond, call us right away: a transfer can change the outcome of the case.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        '28 U.S.C. § 2241 — habeas corpus in federal court',
        '28 U.S.C. § 1914(a) — $5 filing fee for a habeas corpus petition',
        'Immigration and Nationality Act (INA), sections 235(b) and 236 — detention of applicants for admission and bond',
        'Matter of Yajure Hurtado, Board of Immigration Appeals (September 2025)',
        'Buenrostro-Mendez, Fifth Circuit, and Avila v. Bondi, Eighth Circuit',
        'Zadvydas v. Davis, U.S. Supreme Court (2001) — detention after a final order',
        'CLINIC — mandatory detention litigation tracker (September 11, 2026)',
        'ICE — Online Detainee Locator System (locator.ice.gov)',
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
          ? 'Mujer habla por teléfono con un familiar detenido a través del vidrio de un centro de detención'
          : 'Woman talking by phone with a detained relative through the glass of a detention center'
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
