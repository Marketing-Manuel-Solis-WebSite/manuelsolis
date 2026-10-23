import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'nacido-en-mexico-padre-madre-ciudadano-ciudadania-adquirida';
// Debe coincidir con `date` del post en ALL_POSTS (app/[lang]/blog/page.tsx):
// antes de esa fecha la página no se publica.
const ISO_DATE = '2026-11-04';
const IMAGE = '/blog/blog_41/NOV_B1.jpg';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Nacido en México de padre o madre ciudadano',
    metaDesc:
      'Si naciste en México y tu papá o tu mamá es ciudadano estadounidense, podrías ser ciudadano desde que naciste. Requisitos, pruebas y trámites.',
    title: 'Naciste en México de padre o madre estadounidense: podrías ser ciudadano sin saberlo',
    displayDate: '04 Nov, 2026',
    readTime: '6 min',
    categoryLabel: 'Procesos Migratorios',
    summary: {
      title: 'Resumen inicial',
      text: 'Muchas personas nacidas en México viven como indocumentadas sin saber que son <strong>ciudadanas estadounidenses</strong>. Les pasa porque su papá o su mamá nació en Estados Unidos, o se hizo ciudadano antes de que ellas nacieran. A esto se le llama <strong>ciudadanía adquirida al nacer</strong>.',
    },
    intro: [
      'No se solicita ni se gana: se tiene o no se tiene desde el nacimiento. Lo que sí hay que hacer es <strong>probarla</strong>. Aquí te explicamos las reglas según tu fecha de nacimiento, cómo reunir las pruebas y qué trámite te corresponde.',
    ],
    sections: [
      {
        icon: 'calendar',
        title: 'La regla depende de tu fecha de nacimiento y del estado civil de tus padres',
        subtitle: 'Qué debe cumplir tu padre o madre ciudadano',
        blocks: [
          {
            kind: 'table',
            headers: ['Tu situación al nacer', 'Lo que debe cumplir tu padre o madre ciudadano'],
            rows: [
              [
                'Padres casados, uno ciudadano; naciste desde el 14 de noviembre de 1986',
                'Haber estado físicamente en Estados Unidos 5 años antes de tu nacimiento, 2 de ellos después de cumplir 14',
              ],
              [
                'Padres casados, uno ciudadano; naciste entre el 24 de diciembre de 1952 y el 13 de noviembre de 1986',
                '10 años de presencia física antes de tu nacimiento, 5 de ellos después de cumplir 14',
              ],
              [
                'Ambos padres ciudadanos',
                'Que uno de los dos haya vivido en Estados Unidos en algún momento antes de tu nacimiento',
              ],
              [
                'Madre ciudadana no casada; naciste antes del 12 de junio de 2017',
                'Haber estado 1 año seguido en Estados Unidos antes de tu nacimiento',
              ],
              [
                'Madre ciudadana no casada; naciste desde el 12 de junio de 2017',
                'La regla de 5 años, 2 después de los 14',
              ],
              [
                'Padre ciudadano no casado',
                'La regla de presencia física que aplique por tu fecha, más los requisitos de reconocimiento que se explican abajo',
              ],
            ],
          },
          {
            kind: 'text',
            text: '<strong>“Presencia física”</strong> es el tiempo que la persona estuvo de verdad en Estados Unidos, aunque fuera de visita. Se suman los días; los viajes fuera del país no cuentan.',
          },
          {
            kind: 'note',
            text: 'Si naciste antes del 24 de diciembre de 1952, aplican reglas anteriores.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'Un ejemplo: el caso de Rosa',
        subtitle: 'Cómo se cuenta la presencia física',
        blocks: [
          {
            kind: 'text',
            text: 'Rosa <a href="/es/blog/ciudadania-por-nacimiento-2026-hijos-padres-indocumentados" class="text-[#B2904D] underline hover:text-white">nació en Houston</a> en 1975. Vivió en Texas de bebé hasta los 3 años y regresó de los 16 a los 20. En total sumó 7 años, 4 de ellos después de cumplir 14.',
          },
          {
            kind: 'text',
            text: 'En 1998, Rosa tuvo un hijo en Monterrey con su esposo mexicano. Al niño se le aplica la regla de 5 años, 2 después de los 14. Rosa la cumple, así que <strong>su hijo es ciudadano estadounidense desde que nació</strong>, aunque nunca haya pisado Estados Unidos.',
          },
        ],
      },
      {
        icon: 'balance',
        title: 'Si el ciudadano es tu papá y no estaba casado con tu mamá',
        subtitle: 'Requisitos adicionales',
        blocks: [
          {
            kind: 'text',
            text: 'Si naciste desde el 14 de noviembre de 1986, además de la presencia física se necesita:',
          },
          {
            kind: 'list',
            items: [
              'Prueba clara y convincente de que es tu padre biológico; a veces se pide una prueba de ADN.',
              'Que tu papá fuera ciudadano cuando naciste.',
              'Que se haya comprometido por escrito a mantenerte hasta los 18 años, salvo que haya muerto.',
              'Que antes de tus 18 años te haya reconocido: por legitimación, por reconocimiento escrito bajo juramento o por una sentencia de paternidad.',
            ],
          },
        ],
      },
      {
        icon: 'search',
        title: 'Cómo probar la presencia física de tu papá o tu mamá',
        subtitle: 'Documentos que sirven',
        blocks: [
          {
            kind: 'text',
            text: 'Hay que probar <strong>años completos, todos antes de tu nacimiento</strong>. Sirven:',
          },
          {
            kind: 'list',
            items: [
              'Constancias y boletas escolares.',
              'Cartillas de vacunación y expedientes médicos.',
              'El historial de ganancias del Seguro Social, que se pide con el formulario SSA-7050.',
              'Formas W-2, talones de pago y declaraciones de impuestos.',
              'Contratos de renta, recibos de servicios y constancias de iglesia.',
              'Registros militares, si sirvió en las fuerzas armadas.',
              'Declaraciones de personas que lo conocieron, como apoyo y no como prueba única.',
            ],
          },
          {
            kind: 'text',
            text: 'Si tu papá o tu mamá tuvo trámites con inmigración, su expediente también puede tener pruebas. Se pide con una <a href="/es/blog/foia-migratoria-pedir-record-antes-de-aplicar" class="text-[#B2904D] underline hover:text-white">solicitud FOIA</a>.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'Cómo se tramita',
        subtitle: 'Según tu edad y dónde vives',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>Menores de 18 que viven fuera de Estados Unidos:</strong> los padres piden en el consulado el Reporte Consular de Nacimiento en el Extranjero (CRBA) y el pasaporte.',
              '<strong>Si estás en Estados Unidos:</strong> puedes pedir el pasaporte estadounidense o el certificado de ciudadanía (formulario N-600) a USCIS.',
              '<strong>Adultos que viven en México:</strong> pueden pedir el pasaporte en el consulado estadounidense. El CRBA solo se da a menores de 18.',
            ],
          },
        ],
      },
      {
        icon: 'heart',
        title: 'La ciudadanía puede venir de generaciones atrás',
        subtitle: 'Abuelos ciudadanos',
        blocks: [
          {
            kind: 'text',
            text: 'Si tu mamá nació en México, pero de un abuelo ciudadano, tu mamá también pudo haber adquirido la ciudadanía. Si además estuvo el tiempo suficiente en Estados Unidos antes de que nacieras, tú también podrías ser ciudadano.',
          },
          {
            kind: 'text',
            text: 'Si resultas ser ciudadano pero no viviste en Estados Unidos lo suficiente para pasar la ciudadanía a tus hijos, todavía hay una puerta. Tus hijos menores de 18 que viven fuera podrían hacerse ciudadanos con el <strong>formulario N-600K</strong>, usando el tiempo de su abuelo ciudadano.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Qué no hacer',
        subtitle: 'Errores que pueden costar caro',
        blocks: [
          {
            kind: 'list',
            items: [
              'No digas que eres ciudadano ni lo marques en un formulario hasta tenerlo confirmado con documentos.',
              'No pagues un <a href="/es/blog/cuanto-cuesta-arreglar-papeles-tarifas-uscis-2026" class="text-[#B2904D] underline hover:text-white">trámite de residencia</a> o un perdón sin revisar antes esta posibilidad.',
              'No tires papeles viejos de tus padres: una boleta escolar de hace 40 años puede decidir el caso.',
            ],
          },
          {
            kind: 'warning',
            text: 'Si dices que eres ciudadano y resulta que no lo eres, sería una <strong>falsa declaración de ciudadanía</strong>.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'Por qué vale la pena revisarlo',
        subtitle: 'Lo que cambia si eres ciudadano',
        blocks: [
          {
            kind: 'list',
            items: [
              'Un ciudadano no puede ser deportado. Si estás en proceso de deportación, esta prueba puede terminar el caso.',
              'A un ciudadano no le aplican las <a href="/es/blog/barras-3-10-anos-presencia-ilegal" class="text-[#B2904D] underline hover:text-white">barras por presencia ilegal</a> ni el castigo permanente.',
              'Puedes conservar tu nacionalidad mexicana: México permite la doble nacionalidad.',
            ],
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Tengo que haber vivido yo en Estados Unidos?',
          a: 'No. Lo que cuenta es el tiempo que estuvo allá tu papá o tu mamá ciudadano antes de que nacieras.',
        },
        {
          q: '¿Pierdo la nacionalidad mexicana?',
          a: 'No. México permite tener las dos.',
        },
        {
          q: '¿Qué pasa si mi papá ya murió?',
          a: 'Aun así puedes probar tu ciudadanía con sus documentos. Pide sus registros escolares, laborales y del Seguro Social.',
        },
        {
          q: '¿Cuánto tarda?',
          a: 'Depende del consulado o de USCIS. Reunir las pruebas suele ser la parte más larga.',
        },
      ],
    },
    conclusion: {
      title: '¿Necesitas ayuda?',
      text: 'En la Oficina del Abogado Manuel Solís revisamos si adquiriste la ciudadanía al nacer y te ayudamos a reunir las pruebas.',
      advice: 'Agenda una consulta antes de iniciar cualquier otro trámite migratorio.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'Ley de Inmigración y Nacionalidad (INA), sección 301(c) y (g) — ciudadanía al nacer en el extranjero de padres ciudadanos',
        'INA sección 309(a) y (c) — hijos nacidos fuera de matrimonio',
        'Sessions v. Morales-Santana, Corte Suprema de Estados Unidos (12 de junio de 2017)',
        'INA sección 341 y formulario N-600 — certificado de ciudadanía',
        'INA sección 322 y formulario N-600K — ciudadanía de hijos que viven fuera de Estados Unidos',
        'USCIS Policy Manual, volumen 12, parte H — ciudadanía adquirida al nacer',
        'Departamento de Estado — Reporte Consular de Nacimiento en el Extranjero (CRBA)',
        'Administración del Seguro Social — formulario SSA-7050 (historial de ganancias)',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'Born in Mexico to a U.S. Citizen Parent',
    metaDesc:
      'If you were born in Mexico and your father or mother is a U.S. citizen, you may have been a citizen since birth. Requirements, proof, and how to apply.',
    title: 'Born in Mexico to a U.S. Citizen Parent: You Could Be a Citizen Without Knowing It',
    displayDate: 'Nov 04, 2026',
    readTime: '6 min',
    categoryLabel: 'Immigration Process',
    summary: {
      title: 'Summary',
      text: 'Many people born in Mexico live as undocumented immigrants without knowing they are <strong>U.S. citizens</strong>. It happens because their father or mother was born in the United States, or became a citizen before they were born. This is called <strong>acquired citizenship at birth</strong>.',
    },
    intro: [
      'You do not apply for it or earn it: you either have it from birth or you do not. What you do have to do is <strong>prove it</strong>. Here we explain the rules by date of birth, how to gather the proof, and which process applies to you.',
    ],
    sections: [
      {
        icon: 'calendar',
        title: 'The rule depends on your date of birth and your parents’ marital status',
        subtitle: 'What your U.S. citizen parent must meet',
        blocks: [
          {
            kind: 'table',
            headers: ['Your situation at birth', 'What your U.S. citizen parent must meet'],
            rows: [
              [
                'Married parents, one a citizen; born on or after November 14, 1986',
                'Physical presence in the United States for 5 years before your birth, 2 of them after turning 14',
              ],
              [
                'Married parents, one a citizen; born between December 24, 1952, and November 13, 1986',
                '10 years of physical presence before your birth, 5 of them after turning 14',
              ],
              [
                'Both parents citizens',
                'One of them lived in the United States at some point before your birth',
              ],
              [
                'Unmarried citizen mother; born before June 12, 2017',
                '1 continuous year in the United States before your birth',
              ],
              [
                'Unmarried citizen mother; born on or after June 12, 2017',
                'The 5-year rule, 2 of them after age 14',
              ],
              [
                'Unmarried citizen father',
                'The physical presence rule for your date of birth, plus the legitimation requirements explained below',
              ],
            ],
          },
          {
            kind: 'text',
            text: '<strong>“Physical presence”</strong> is the time the person was actually in the United States, even on a visit. The days are added up; trips outside the country do not count.',
          },
          {
            kind: 'note',
            text: 'If you were born before December 24, 1952, earlier rules apply.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'An example: Rosa’s case',
        subtitle: 'How physical presence is counted',
        blocks: [
          {
            kind: 'text',
            text: 'Rosa <a href="/en/blog/ciudadania-por-nacimiento-2026-hijos-padres-indocumentados" class="text-[#B2904D] underline hover:text-white">was born in Houston</a> in 1975. She lived in Texas as a baby until age 3 and came back from 16 to 20. In total she had 7 years, 4 of them after turning 14.',
          },
          {
            kind: 'text',
            text: 'In 1998, Rosa had a son in Monterrey with her Mexican husband. The 5-year rule, 2 after age 14, applies to him. Rosa meets it, so <strong>her son has been a U.S. citizen since birth</strong>, even if he has never set foot in the United States.',
          },
        ],
      },
      {
        icon: 'balance',
        title: 'If the citizen is your father and he was not married to your mother',
        subtitle: 'Additional requirements',
        blocks: [
          {
            kind: 'text',
            text: 'If you were born on or after November 14, 1986, in addition to physical presence you need:',
          },
          {
            kind: 'list',
            items: [
              'Clear and convincing evidence that he is your biological father; a DNA test is sometimes requested.',
              'That your father was a citizen when you were born.',
              'That he agreed in writing to support you until age 18, unless he has died.',
              'That before you turned 18 he acknowledged you: by legitimation, by a written acknowledgment under oath, or by a court order of paternity.',
            ],
          },
        ],
      },
      {
        icon: 'search',
        title: 'How to prove your father’s or mother’s physical presence',
        subtitle: 'Documents that work',
        blocks: [
          {
            kind: 'text',
            text: 'You have to prove <strong>full years, all of them before your birth</strong>. Useful documents:',
          },
          {
            kind: 'list',
            items: [
              'School records and report cards.',
              'Vaccination cards and medical records.',
              'Social Security earnings history, requested with Form SSA-7050.',
              'W-2 forms, pay stubs, and tax returns.',
              'Leases, utility bills, and church records.',
              'Military records, if they served in the armed forces.',
              'Statements from people who knew them, as support and not as the only proof.',
            ],
          },
          {
            kind: 'text',
            text: 'If your father or mother had immigration cases, their file may also contain proof. It is requested with a <a href="/en/blog/foia-migratoria-pedir-record-antes-de-aplicar" class="text-[#B2904D] underline hover:text-white">FOIA request</a>.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'How to apply',
        subtitle: 'Depending on your age and where you live',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>Children under 18 living outside the United States:</strong> the parents apply at the consulate for a Consular Report of Birth Abroad (CRBA) and a passport.',
              '<strong>If you are in the United States:</strong> you can apply for a U.S. passport or for a certificate of citizenship (Form N-600) with USCIS.',
              '<strong>Adults living in Mexico:</strong> they can apply for a passport at the U.S. consulate. The CRBA is only issued to children under 18.',
            ],
          },
        ],
      },
      {
        icon: 'heart',
        title: 'Citizenship can come from generations back',
        subtitle: 'Citizen grandparents',
        blocks: [
          {
            kind: 'text',
            text: 'If your mother was born in Mexico but to a citizen grandfather, your mother may also have acquired citizenship. If she also spent enough time in the United States before you were born, you could be a citizen too.',
          },
          {
            kind: 'text',
            text: 'If you turn out to be a citizen but did not live in the United States long enough to pass citizenship to your children, there is still a door. Your children under 18 living abroad could become citizens with <strong>Form N-600K</strong>, using the time of their citizen grandparent.',
          },
        ],
      },
      {
        icon: 'alert',
        title: 'What not to do',
        subtitle: 'Mistakes that can cost you',
        blocks: [
          {
            kind: 'list',
            items: [
              'Do not say you are a citizen or check that box on a form until it is confirmed with documents.',
              'Do not pay for a <a href="/en/blog/cuanto-cuesta-arreglar-papeles-tarifas-uscis-2026" class="text-[#B2904D] underline hover:text-white">green card application</a> or a waiver without checking this possibility first.',
              'Do not throw away your parents’ old papers: a 40-year-old school report card can decide the case.',
            ],
          },
          {
            kind: 'warning',
            text: 'If you say you are a citizen and it turns out you are not, it would be a <strong>false claim to U.S. citizenship</strong>.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'Why it is worth checking',
        subtitle: 'What changes if you are a citizen',
        blocks: [
          {
            kind: 'list',
            items: [
              'A citizen cannot be deported. If you are in removal proceedings, this proof can end the case.',
              'The <a href="/en/blog/barras-3-10-anos-presencia-ilegal" class="text-[#B2904D] underline hover:text-white">unlawful presence bars</a> and the permanent bar do not apply to a citizen.',
              'You can keep your Mexican nationality: Mexico allows dual nationality.',
            ],
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'Do I have to have lived in the United States myself?',
          a: 'No. What counts is the time your U.S. citizen father or mother spent there before you were born.',
        },
        {
          q: 'Do I lose my Mexican nationality?',
          a: 'No. Mexico allows you to have both.',
        },
        {
          q: 'What if my father has already died?',
          a: 'You can still prove your citizenship with his documents. Request his school, employment, and Social Security records.',
        },
        {
          q: 'How long does it take?',
          a: 'It depends on the consulate or USCIS. Gathering the proof is usually the longest part.',
        },
      ],
    },
    conclusion: {
      title: 'Need help?',
      text: 'At the Law Office of Manuel Solis, we review whether you acquired citizenship at birth and help you gather the proof.',
      advice: 'Schedule a consultation before starting any other immigration process.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'Immigration and Nationality Act (INA), section 301(c) and (g) — citizenship at birth abroad to citizen parents',
        'INA section 309(a) and (c) — children born out of wedlock',
        'Sessions v. Morales-Santana, U.S. Supreme Court (June 12, 2017)',
        'INA section 341 and Form N-600 — certificate of citizenship',
        'INA section 322 and Form N-600K — citizenship for children living outside the United States',
        'USCIS Policy Manual, volume 12, part H — acquired citizenship at birth',
        'U.S. Department of State — Consular Report of Birth Abroad (CRBA)',
        'Social Security Administration — Form SSA-7050 (earnings history)',
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
          ? 'Ciudadanía estadounidense adquirida al nacer en México por tener padre o madre ciudadano'
          : 'U.S. citizenship acquired at birth in Mexico through a U.S. citizen father or mother'
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
