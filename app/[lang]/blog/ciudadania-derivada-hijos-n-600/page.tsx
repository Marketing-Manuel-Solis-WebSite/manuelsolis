import type { Metadata } from 'next';
import BlogArticleLayout from '../../../components/blogs/BlogArticleLayout';
import { buildArticleMetadata } from '../../../components/blogs/articleMetadata';
import { ARTICLE_UI, type BlogArticleContent } from '../../../components/blogs/articleModel';

const SLUG = 'ciudadania-derivada-hijos-n-600';
// Debe coincidir con `date` del post en ALL_POSTS (app/[lang]/blog/page.tsx):
// antes de esa fecha la página no se publica.
const ISO_DATE = '2026-11-11';
const IMAGE = '/blog/blog_42/NOV_B2.jpg';

const LINK = 'class="text-[#B2904D] underline hover:text-white"';

const content: Record<'es' | 'en', BlogArticleContent> = {
  es: {
    metaTitle: 'Ciudadanía derivada: ¿mis hijos son ciudadanos?',
    metaDesc:
      'Si te hiciste ciudadano, tus hijos con green card y menores de 18 pueden ser ciudadanos en automático. Requisitos, cómo probarlo y qué pasa si ya cumplieron 18.',
    title: 'Me hice ciudadano: ¿mis hijos también? La ciudadanía derivada y el formulario N-600',
    displayDate: '11 Nov, 2026',
    readTime: '6 min',
    categoryLabel: 'Procesos Migratorios',
    summary: {
      title: 'Resumen inicial',
      text: `Cuando un padre o una madre se hace ciudadano, sus hijos con green card pueden volverse <strong>ciudadanos en automático</strong>, sin <a href="/es/blog/ciudadania-2026-nuevo-examen-buen-caracter-moral" ${LINK}>examen</a> ni juramento. Se llama <strong>ciudadanía derivada</strong>. Muchas familias no lo saben y siguen renovando la green card de hijos que ya son ciudadanos.`,
    },
    intro: [
      'También pasa lo contrario: familias que creen que su hijo ya es ciudadano y no lo es. Por eso hay que revisar los requisitos uno por uno.',
    ],
    sections: [
      {
        icon: 'check',
        title: 'Los requisitos (para hijos menores de 18 desde el 27 de febrero de 2001)',
        subtitle: 'Todos deben cumplirse al mismo tiempo',
        blocks: [
          {
            kind: 'text',
            text: 'El hijo se vuelve ciudadano el día en que se cumplen todos estos requisitos al mismo tiempo:',
          },
          {
            kind: 'steps',
            items: [
              'Al menos uno de los padres es ciudadano estadounidense, por nacimiento o por naturalización.',
              'El hijo es menor de 18 años y soltero.',
              'El hijo tiene residencia permanente (green card).',
              'El hijo vive en Estados Unidos bajo la custodia legal y física del padre o la madre ciudadano.',
            ],
          },
          {
            kind: 'text',
            text: '<strong>El orden no importa.</strong> El padre puede hacerse ciudadano primero y el hijo recibir la green card después: en cuanto se cumpla el último requisito, antes de los 18, el hijo es ciudadano.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'Ejemplos para entenderlo',
        subtitle: 'Cuatro casos distintos',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>Luis</strong> recibió su green card a los 10 años. Su mamá se hizo ciudadana cuando él tenía 17 y vivía con ella. Luis ya es ciudadano, aunque nunca haya hecho un trámite.',
              `<strong>Karla</strong> tenía green card, pero cumplió 18 una semana antes de que su papá jurara como ciudadano. No derivó la ciudadanía; debe pedirla por su cuenta con el <a href="/es/blog/ciudadania-en-espanol-reglas-50-20-55-15" ${LINK}>N-400</a>.`,
              '<strong>Diego</strong> tiene 12 años y vive con su papá ciudadano, pero entró con visa y no tiene green card. Todavía no es ciudadano; primero necesita la residencia.',
              '<strong>Sofía</strong> es hijastra de un ciudadano que no la adoptó. No deriva la ciudadanía de su padrastro.',
            ],
          },
        ],
      },
      {
        icon: 'balance',
        title: 'Casos especiales',
        subtitle: 'Custodia, adopción y otras situaciones',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>Padres divorciados o separados:</strong> el hijo debe vivir bajo la custodia legal del padre o la madre ciudadano. Una sentencia de custodia ayuda a probarlo.',
              '<strong>Hijos adoptados:</strong> pueden derivar si la adopción cumple los requisitos de la ley migratoria, como haberse completado antes de los 16 años.',
              '<strong>Hijos nacidos fuera del matrimonio:</strong> si el ciudadano es el papá, puede haber requisitos extra de reconocimiento. Se revisa caso por caso.',
              '<strong>Hijos que cumplieron 18 antes del 27 de febrero de 2001:</strong> aplica la ley anterior, que en general exigía que ambos padres se naturalizaran, con algunas excepciones.',
              '<strong>Hijos con visa, parole, DACA o TPS:</strong> no derivan la ciudadanía mientras no tengan green card.',
            ],
          },
        ],
      },
      {
        icon: 'file',
        title: 'Cómo se prueba',
        subtitle: 'Pasaporte o certificado de ciudadanía',
        blocks: [
          {
            kind: 'text',
            text: 'Derivar la ciudadanía es automático, pero necesitas un documento que lo demuestre. Hay dos opciones:',
          },
          {
            kind: 'list',
            items: [
              '<strong>Pasaporte estadounidense:</strong> se pide con el formulario DS-11, con los papeles del hijo y del padre ciudadano. Suele ser más rápido y más barato.',
              `<strong>Certificado de ciudadanía (formulario N-600):</strong> se pide a USCIS. Es un documento permanente, útil si se pierde el pasaporte. La cuota es alta; revisa nuestra <a href="/es/blog/cuanto-cuesta-arreglar-papeles-tarifas-uscis-2026" ${LINK}>tabla de tarifas</a>.`,
            ],
          },
          {
            kind: 'text',
            text: 'Muchas familias sacan primero el pasaporte y después, con calma, el certificado. Documentos que suelen pedir:',
          },
          {
            kind: 'list',
            items: [
              'Acta de nacimiento y green card del hijo.',
              'Certificado de naturalización o pasaporte del padre ciudadano.',
              'Acta de matrimonio de los padres, o sentencia de divorcio y custodia.',
              'Pruebas de que el hijo vive con el padre ciudadano: constancias escolares, seguro médico o contratos de renta.',
            ],
          },
        ],
      },
      {
        icon: 'globe',
        title: 'Hijos que viven fuera de Estados Unidos: el N-600K',
        subtitle: 'No es automático, pero hay un camino',
        blocks: [
          {
            kind: 'text',
            text: 'Si tu hijo menor de 18 vive en otro país, no deriva la ciudadanía en automático. Pero puede hacerse ciudadano con el <strong>formulario N-600K</strong>.',
          },
          {
            kind: 'list',
            items: [
              'El padre o la madre ciudadano debe haber vivido en Estados Unidos al menos 5 años, 2 de ellos después de cumplir 14. Si no los tiene, puede usarse el tiempo de un abuelo ciudadano.',
              'El hijo viaja con visa a Estados Unidos para la entrevista y el juramento, antes de cumplir 18.',
            ],
          },
          {
            kind: 'text',
            text: `Si tu hijo nació fuera de Estados Unidos cuando tú ya eras ciudadano, revisa primero si <a href="/es/blog/nacido-en-mexico-padre-madre-ciudadano-ciudadania-adquirida" ${LINK}>adquirió la ciudadanía al nacer</a>.`,
          },
        ],
      },
      {
        icon: 'shield',
        title: 'Por qué importa tanto',
        subtitle: 'Lo que cambia si tu hijo es ciudadano',
        blocks: [
          {
            kind: 'list',
            items: [
              `Un ciudadano no puede ser deportado. Si alguien ya derivó la ciudadanía y enfrenta <a href="/es/blog/crimenes-deportacion-vileza-moral" ${LINK}>un caso de deportación</a>, esa prueba puede terminarlo.`,
              `Un ciudadano puede votar, viajar con pasaporte estadounidense y <a href="/es/blog/hijo-ciudadano-21-anos-pedir-padres-2026" ${LINK}>pedir a sus familiares</a> como ciudadano.`,
              'Quien ya es ciudadano no necesita renovar la green card ni presentar el N-400.',
            ],
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Errores comunes',
        subtitle: 'Lo que más vemos en consulta',
        blocks: [
          {
            kind: 'list',
            items: [
              'Seguir renovando la green card de un hijo que ya es ciudadano.',
              'Pagar un N-400 para un hijo que ya derivó la ciudadanía.',
              'Suponer que el hijo es ciudadano sin revisar la fecha exacta en que cumplió 18.',
            ],
          },
          {
            kind: 'warning',
            text: 'No marques “ciudadano” en un formulario sin tenerlo confirmado. Una <strong>falsa declaración de ciudadanía</strong> tiene consecuencias muy graves.',
          },
        ],
      },
    ],
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Mi hijo tiene que hacer el examen de ciudadanía?',
          a: 'No. La ciudadanía derivada no requiere examen ni juramento.',
        },
        {
          q: '¿Mi hijo tiene 19 años y yo me hice ciudadano el año pasado, qué hace?',
          a: 'Ya no deriva. Debe pedir la ciudadanía por su cuenta cuando cumpla el tiempo como residente.',
        },
        {
          q: '¿Sirve si el ciudadano es el padrastro?',
          a: 'Solo si adoptó al hijo y la adopción cumple los requisitos de la ley migratoria.',
        },
        {
          q: '¿Hay plazo para pedir el N-600?',
          a: 'No. Se puede pedir a cualquier edad, incluso de adulto, para probar una ciudadanía que se obtuvo de niño.',
        },
      ],
    },
    conclusion: {
      title: '¿Necesitas ayuda?',
      text: 'En la Oficina del Abogado Manuel Solís revisamos si tus hijos ya son ciudadanos y preparamos el pasaporte o el N-600.',
      advice:
        'Agenda una consulta antes de renovar una green card o pagar una solicitud de ciudadanía que quizá no necesitas.',
    },
    sources: {
      title: 'Fuentes y referencias',
      list: [
        'Ley de Inmigración y Nacionalidad (INA), sección 320 — ciudadanía derivada de hijos que viven en Estados Unidos (Ley de Ciudadanía Infantil de 2000, vigente desde el 27 de febrero de 2001)',
        'INA sección 101(b)(1) — definición de hijo, incluidos los adoptados',
        'Antigua INA sección 321 — reglas para quienes cumplieron 18 antes del 27 de febrero de 2001',
        'INA sección 322 y formulario N-600K — ciudadanía de hijos que viven fuera de Estados Unidos',
        'INA sección 341 y formulario N-600 — certificado de ciudadanía',
        'USCIS Policy Manual, volumen 12, parte H — ciudadanía de hijos',
        'Departamento de Estado — formulario DS-11 (solicitud de pasaporte)',
      ],
    },
    ui: ARTICLE_UI.es,
  },
  en: {
    metaTitle: 'Derived Citizenship: Are My Kids Citizens?',
    metaDesc:
      'If you became a citizen, your green card children under 18 may be citizens automatically. Requirements, how to prove it, and what if they already turned 18.',
    title: 'I Became a Citizen: Are My Children Citizens Too? Derived Citizenship and Form N-600',
    displayDate: 'Nov 11, 2026',
    readTime: '6 min',
    categoryLabel: 'Immigration Process',
    summary: {
      title: 'Summary',
      text: `When a father or mother becomes a citizen, their children with a green card can become <strong>citizens automatically</strong>, with no <a href="/en/blog/ciudadania-2026-nuevo-examen-buen-caracter-moral" ${LINK}>test</a> and no oath. This is called <strong>derived citizenship</strong>. Many families do not know it and keep renewing the green cards of children who are already citizens.`,
    },
    intro: [
      'The opposite also happens: families who believe their child is already a citizen when they are not. That is why the requirements must be checked one by one.',
    ],
    sections: [
      {
        icon: 'check',
        title: 'The requirements (for children under 18 since February 27, 2001)',
        subtitle: 'All of them must be met at the same time',
        blocks: [
          {
            kind: 'text',
            text: 'The child becomes a citizen on the day all of these requirements are met at the same time:',
          },
          {
            kind: 'steps',
            items: [
              'At least one parent is a U.S. citizen, by birth or by naturalization.',
              'The child is under 18 and unmarried.',
              'The child is a lawful permanent resident (green card holder).',
              'The child lives in the United States in the legal and physical custody of the citizen parent.',
            ],
          },
          {
            kind: 'text',
            text: '<strong>The order does not matter.</strong> The parent can become a citizen first and the child get the green card later: as soon as the last requirement is met, before age 18, the child is a citizen.',
          },
        ],
      },
      {
        icon: 'users',
        title: 'Examples to understand it',
        subtitle: 'Four different cases',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>Luis</strong> got his green card at age 10. His mother became a citizen when he was 17 and living with her. Luis is already a citizen, even though he never filed anything.',
              `<strong>Karla</strong> had a green card, but she turned 18 one week before her father took the oath. She did not derive citizenship; she must apply on her own with the <a href="/en/blog/ciudadania-en-espanol-reglas-50-20-55-15" ${LINK}>N-400</a>.`,
              '<strong>Diego</strong> is 12 and lives with his citizen father, but he entered on a visa and has no green card. He is not a citizen yet; he needs permanent residence first.',
              '<strong>Sofía</strong> is the stepdaughter of a citizen who did not adopt her. She does not derive citizenship from her stepfather.',
            ],
          },
        ],
      },
      {
        icon: 'balance',
        title: 'Special cases',
        subtitle: 'Custody, adoption, and other situations',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>Divorced or separated parents:</strong> the child must live in the legal custody of the citizen parent. A custody order helps prove it.',
              '<strong>Adopted children:</strong> they can derive if the adoption meets the requirements of immigration law, such as being finalized before age 16.',
              '<strong>Children born out of wedlock:</strong> if the citizen is the father, there may be extra legitimation requirements. It is reviewed case by case.',
              '<strong>Children who turned 18 before February 27, 2001:</strong> the earlier law applies, which generally required both parents to naturalize, with some exceptions.',
              '<strong>Children with a visa, parole, DACA, or TPS:</strong> they do not derive citizenship until they have a green card.',
            ],
          },
        ],
      },
      {
        icon: 'file',
        title: 'How to prove it',
        subtitle: 'Passport or certificate of citizenship',
        blocks: [
          {
            kind: 'text',
            text: 'Derived citizenship is automatic, but you need a document that proves it. There are two options:',
          },
          {
            kind: 'list',
            items: [
              '<strong>U.S. passport:</strong> apply with Form DS-11, with the documents of the child and the citizen parent. It is usually faster and cheaper.',
              `<strong>Certificate of citizenship (Form N-600):</strong> filed with USCIS. It is a permanent document, useful if the passport is lost. The fee is high; check our <a href="/en/blog/cuanto-cuesta-arreglar-papeles-tarifas-uscis-2026" ${LINK}>fee table</a>.`,
            ],
          },
          {
            kind: 'text',
            text: 'Many families get the passport first and then, without rushing, the certificate. Documents usually requested:',
          },
          {
            kind: 'list',
            items: [
              'The child’s birth certificate and green card.',
              'The citizen parent’s naturalization certificate or passport.',
              'The parents’ marriage certificate, or the divorce and custody order.',
              'Proof that the child lives with the citizen parent: school records, health insurance, or leases.',
            ],
          },
        ],
      },
      {
        icon: 'globe',
        title: 'Children living outside the United States: Form N-600K',
        subtitle: 'Not automatic, but there is a path',
        blocks: [
          {
            kind: 'text',
            text: 'If your child under 18 lives in another country, they do not derive citizenship automatically. But they can become a citizen with <strong>Form N-600K</strong>.',
          },
          {
            kind: 'list',
            items: [
              'The citizen parent must have lived in the United States for at least 5 years, 2 of them after turning 14. If they do not have that time, a citizen grandparent’s time can be used.',
              'The child travels to the United States on a visa for the interview and the oath, before turning 18.',
            ],
          },
          {
            kind: 'text',
            text: `If your child was born outside the United States when you were already a citizen, first check whether they <a href="/en/blog/nacido-en-mexico-padre-madre-ciudadano-ciudadania-adquirida" ${LINK}>acquired citizenship at birth</a>.`,
          },
        ],
      },
      {
        icon: 'shield',
        title: 'Why it matters so much',
        subtitle: 'What changes if your child is a citizen',
        blocks: [
          {
            kind: 'list',
            items: [
              `A citizen cannot be deported. If someone already derived citizenship and faces <a href="/en/blog/crimenes-deportacion-vileza-moral" ${LINK}>a deportation case</a>, that proof can end it.`,
              `A citizen can vote, travel with a U.S. passport, and <a href="/en/blog/hijo-ciudadano-21-anos-pedir-padres-2026" ${LINK}>petition for relatives</a> as a citizen.`,
              'Someone who is already a citizen does not need to renew the green card or file the N-400.',
            ],
          },
        ],
      },
      {
        icon: 'alert',
        title: 'Common mistakes',
        subtitle: 'What we see most in consultations',
        blocks: [
          {
            kind: 'list',
            items: [
              'Renewing the green card of a child who is already a citizen.',
              'Paying for an N-400 for a child who already derived citizenship.',
              'Assuming the child is a citizen without checking the exact date they turned 18.',
            ],
          },
          {
            kind: 'warning',
            text: 'Do not check “citizen” on a form until it is confirmed. A <strong>false claim to U.S. citizenship</strong> has very serious consequences.',
          },
        ],
      },
    ],
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'Does my child have to take the citizenship test?',
          a: 'No. Derived citizenship does not require a test or an oath.',
        },
        {
          q: 'My child is 19 and I became a citizen last year. What can they do?',
          a: 'They no longer derive. They must apply for citizenship on their own once they meet the time as a resident.',
        },
        {
          q: 'Does it work if the citizen is the stepfather?',
          a: 'Only if he adopted the child and the adoption meets the requirements of immigration law.',
        },
        {
          q: 'Is there a deadline to file the N-600?',
          a: 'No. It can be filed at any age, even as an adult, to prove citizenship obtained as a child.',
        },
      ],
    },
    conclusion: {
      title: 'Need help?',
      text: 'At the Law Office of Manuel Solis, we review whether your children are already citizens and prepare the passport or the N-600.',
      advice:
        'Schedule a consultation before renewing a green card or paying for a citizenship application you may not need.',
    },
    sources: {
      title: 'Sources and references',
      list: [
        'Immigration and Nationality Act (INA), section 320 — derived citizenship for children living in the United States (Child Citizenship Act of 2000, in effect since February 27, 2001)',
        'INA section 101(b)(1) — definition of child, including adopted children',
        'Former INA section 321 — rules for those who turned 18 before February 27, 2001',
        'INA section 322 and Form N-600K — citizenship for children living outside the United States',
        'INA section 341 and Form N-600 — certificate of citizenship',
        'USCIS Policy Manual, volume 12, part H — citizenship for children',
        'U.S. Department of State — Form DS-11 (passport application)',
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
          ? 'Padre naturalizado con sus hijos y el certificado de ciudadanía: ciudadanía derivada y formulario N-600'
          : 'Naturalized father with his children and a certificate of citizenship: derived citizenship and Form N-600'
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
