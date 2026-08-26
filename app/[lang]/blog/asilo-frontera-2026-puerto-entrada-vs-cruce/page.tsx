import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle,
  Lightbulb, Quote, TrendingUp, Award, Heart, Star, MessageCircle,
  Send, ArrowUpRight, ShieldCheck, FileText, User, Gavel, Search, Building2,
  AlertTriangle, Users, Scale, BookOpen, MapPin, Shield
} from 'lucide-react';

// IMPORTACIONES
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { addInlineLinks, createInlineLinkState } from '../../../lib/blogInlineLinks';
import { buildSocialMetadata } from '../../../lib/seoMetadata';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BlogBackground from '../../../components/blogs/BlogBackground';
import ShareButtons from '../../../components/blogs/ShareButtons';
import ContactForm from '../../../components/ContactForm';
import BlogTracker from '../../../components/blogs/BlogTracker';
import ReadingProgress from '../../../components/blogs/ReadingProgress';
import RelatedContent from '../../../components/blogs/RelatedContent';
import { getRelatedArticles } from '../../../lib/blogRelations';
import BlogSchema from '../../../components/blogs/BlogSchema';


const SITE_URL = 'https://www.manuelsolis.com';

const IMAGES = {
  article: '/blog/blog_20/BLOG10_CR1.png',
  inside1: '/blog/blog_20/BLOG10_CR2.png',
  inside2: '/blog/blog_20/BLOG10_CR2.png',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Asilo en la frontera 2026: puerto de entrada vs cruce ilegal',
    metaDesc: 'Gu\u00eda informativa sobre asilo en la frontera 2026. Conoce las diferencias entre cruzar sin autorizaci\u00f3n y presentarte en un puerto de entrada.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir art\u00edculo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '11 min de lectura',
      tags: 'Visa Humanitaria',
      date: '04 Abr, 2026',
      time: '11 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'Asilo en la frontera 2026: diferencias entre entregarse, presentarse en un puerto de entrada y otros procesos vigentes',
    summary: {
      title: 'Resumen inicial',
      text: 'Las reglas de asilo en la frontera cambian constantemente seg\u00fan la administraci\u00f3n de turno, las \u00f3rdenes ejecutivas y las pol\u00edticas internas de las agencias migratorias. En este art\u00edculo explicamos las diferencias entre <strong>cruzar sin autorizaci\u00f3n y entregarse</strong>, <strong>presentarse en un puerto de entrada</strong>, el proceso de <strong>miedo cre\u00edble</strong>, y los riesgos de la <strong>deportaci\u00f3n expedita</strong>. Entender estos procesos podr\u00eda marcar la diferencia entre acceder a una audiencia de asilo o ser removido r\u00e1pidamente del pa\u00eds.'
    },
    intro: [
      'Huir de la persecuci\u00f3n es una experiencia que obliga a tomar decisiones bajo presi\u00f3n extrema. Muchas personas llegan a la frontera de Estados Unidos sin saber exactamente qu\u00e9 opciones tienen, qu\u00e9 procesos les esperan o c\u00f3mo la forma en que ingresan podr\u00eda afectar todo su caso de asilo.',
      'Las reglas var\u00edan seg\u00fan la administraci\u00f3n, las pol\u00edticas vigentes y hasta el punto geogr\u00e1fico donde una persona se presenta. Lo que funcionaba hace dos a\u00f1os podr\u00eda ya no aplicar hoy, y lo que se anuncia en las noticias no siempre refleja con precisi\u00f3n lo que ocurre en la pr\u00e1ctica.',
      'Este art\u00edculo busca explicar, de forma general e informativa, las diferencias entre los principales caminos que una persona podr\u00eda enfrentar al solicitar asilo en la frontera en 2026. No es asesor\u00eda legal, pero s\u00ed informaci\u00f3n que podr\u00eda ayudar a entender mejor un sistema que muchos consideran confuso y cambiante.'
    ],
    sections: {
      credibleFear: {
        title: '\u00bfQu\u00e9 es el "miedo cre\u00edble"?',
        quote: 'El miedo cre\u00edble es el primer filtro que determina si una persona podr\u00eda tener acceso a una audiencia de asilo completa.',
        text: 'Cuando una persona llega a la frontera y expresa temor de regresar a su pa\u00eds, generalmente es referida a una entrevista de miedo cre\u00edble (credible fear interview). Esta entrevista es conducida por un oficial de asilo y busca establecer si existe una <strong>base preliminar</strong> para considerar que la persona podr\u00eda enfrentar persecuci\u00f3n en su pa\u00eds de origen.',
        points: [
          'La persona debe demostrar una posibilidad razonable de persecuci\u00f3n por motivos de raza, religi\u00f3n, nacionalidad, opini\u00f3n pol\u00edtica o pertenencia a un grupo social.',
          'No es necesario probar el caso completo en esta etapa, sino demostrar que existe una base cre\u00edble.',
          'Si se aprueba, la persona podr\u00eda ser referida a un proceso de asilo defensivo ante un juez de inmigraci\u00f3n.',
          'Si no se aprueba, la persona podr\u00eda ser sujeta a deportaci\u00f3n expedita, aunque en algunos casos puede solicitar revisi\u00f3n por parte de un juez.'
        ],
        note: 'La entrevista de miedo cre\u00edble no garantiza la aprobaci\u00f3n del asilo, pero es un paso fundamental para acceder al proceso.'
      },
      crossingAndSurrender: {
        title: 'Cruzar sin autorizaci\u00f3n y entregarse a las autoridades',
        subtitle: 'Un camino con riesgos procesales significativos',
        text: 'Muchas personas cruzan la frontera sin documentos y luego se entregan a agentes de la Patrulla Fronteriza (Border Patrol). En estos casos, la persona generalmente es detenida y procesada bajo los mecanismos de <strong>deportaci\u00f3n expedita</strong> (expedited removal), a menos que exprese temor de regresar a su pa\u00eds.',
        risks: [
          'La detenci\u00f3n podr\u00eda prolongarse semanas o meses, dependiendo de la capacidad del sistema y las pol\u00edticas vigentes.',
          'Si la persona no expresa temor de persecuci\u00f3n de forma inmediata, podr\u00eda ser removida sin acceso a una audiencia ante un juez.',
          'La deportaci\u00f3n expedita genera un castigo de 5 a\u00f1os que podr\u00eda impedir el reingreso legal al pa\u00eds.',
          'En algunos per\u00edodos, las condiciones de detenci\u00f3n y el acceso a abogados han sido extremadamente limitados.',
          'El cruce irregular podr\u00eda ser interpretado negativamente en futuras solicitudes migratorias.'
        ],
        note: 'Entregarse despu\u00e9s de cruzar no equivale a presentarse voluntariamente en un puerto de entrada. El contexto procesal es diferente.'
      },
      portOfEntry: {
        title: 'Presentarse en un puerto de entrada',
        subtitle: 'Un proceso m\u00e1s estructurado, aunque no exento de dificultades',
        text: 'Otra opci\u00f3n es presentarse directamente en un puerto de entrada oficial (port of entry) y solicitar asilo o protecci\u00f3n. En teor\u00eda, este proceso podr\u00eda ofrecer un camino m\u00e1s ordenado, aunque las pol\u00edticas sobre qui\u00e9n puede acceder al puerto han variado significativamente.',
        advantages: [
          'El proceso tiende a ser m\u00e1s documentado y estructurado desde el inicio.',
          'Podr\u00eda reducir el riesgo de ser procesado bajo deportaci\u00f3n expedita sin audiencia.',
          'En algunos casos, la persona recibe un documento de comparecencia ante la corte (Notice to Appear o NTA).',
          'La presentaci\u00f3n voluntaria podr\u00eda ser vista favorablemente en el proceso posterior.',
          'El acceso a la entrevista de miedo cre\u00edble podr\u00eda ser m\u00e1s inmediato.'
        ],
        note: 'Algunos puertos de entrada han implementado sistemas de citas o aplicaciones electr\u00f3nicas (como CBP One en a\u00f1os anteriores), que podr\u00edan o no seguir vigentes.'
      },
      processAdvantages: {
        title: 'Posibles ventajas procesales de presentarse en un puerto de entrada',
        subtitle: 'Documentaci\u00f3n, permisos y consecuencias a largo plazo',
        text: 'Aunque cada caso es distinto, presentarse en un puerto de entrada podr\u00eda ofrecer ciertas ventajas procesales frente al cruce irregular:',
        benefits: [
          'Recibir un documento formal de comparecencia ante la corte de inmigraci\u00f3n, lo cual inicia formalmente el caso.',
          'La l\u00ednea de tiempo para solicitar un permiso de trabajo podr\u00eda comenzar desde la fecha de presentaci\u00f3n del caso.',
          'Evitar las consecuencias de una deportaci\u00f3n expedita, que incluyen el castigo de 5 a\u00f1os y posibles cargos penales en reintentos.',
          'Tener un registro m\u00e1s claro del proceso, lo cual podr\u00eda facilitar futuras solicitudes o apelaciones.',
          'Acceder a programas de monitoreo en libertad en lugar de detenci\u00f3n prolongada.'
        ],
        note: 'Estas ventajas no est\u00e1n garantizadas y dependen de las pol\u00edticas vigentes en el momento de la presentaci\u00f3n. Todo puede cambiar seg\u00fan la administraci\u00f3n.'
      },
      expeditedRemoval: {
        title: 'El riesgo de la deportaci\u00f3n expedita',
        subtitle: 'Un proceso r\u00e1pido sin audiencia completa',
        text: 'La deportaci\u00f3n expedita (expedited removal) es uno de los riesgos m\u00e1s graves al cruzar sin autorizaci\u00f3n. Es un proceso acelerado que <strong>no incluye una audiencia completa ante un juez</strong>, a diferencia del proceso de deportaci\u00f3n regular.',
        consequences: [
          'La persona puede ser removida del pa\u00eds en d\u00edas o semanas, sin acceso a un juez de inmigraci\u00f3n.',
          'Se genera una orden de deportaci\u00f3n que podr\u00eda crear un castigo autom\u00e1tico de 5 a\u00f1os para reingresar legalmente.',
          'Si la persona reingresa despu\u00e9s de una deportaci\u00f3n expedita, podr\u00eda enfrentar cargos penales federales.',
          'El registro de deportaci\u00f3n expedita podr\u00eda afectar negativamente solicitudes futuras de cualquier beneficio migratorio.',
          'En algunos casos, incluso expresar miedo cre\u00edble no detiene el proceso si el oficial considera que el temor no cumple el est\u00e1ndar requerido.'
        ],
        note: 'La deportaci\u00f3n expedita es diferente a la deportaci\u00f3n regular (removal proceedings). La diferencia principal es que en la expedita, generalmente no hay juez involucrado.'
      },
      hypothetical: {
        title: 'Dos escenarios hipot\u00e9ticos comparados',
        scenarioA: {
          title: 'Escenario A: Cruce irregular y entrega',
          text: 'Una persona cruza la frontera sin documentos por una zona no autorizada y se entrega a la Patrulla Fronteriza. Es detenida, procesada bajo deportaci\u00f3n expedita y puesta en un centro de detenci\u00f3n. Expresa miedo de regresar a su pa\u00eds y es referida a una entrevista de miedo cre\u00edble. La entrevista se programa semanas despu\u00e9s, durante las cuales permanece detenida. Si no pasa la entrevista, podr\u00eda ser deportada sin ver a un juez.'
        },
        scenarioB: {
          title: 'Escenario B: Presentaci\u00f3n en puerto de entrada',
          text: 'Otra persona se presenta directamente en un puerto de entrada oficial, declara que busca protecci\u00f3n y solicita asilo. Es procesada, se le toman datos biom\u00e9tricos, y se le programa una entrevista de miedo cre\u00edble. Dependiendo de las pol\u00edticas vigentes, podr\u00eda ser liberada con un documento de comparecencia ante la corte o colocada en un programa de monitoreo. Su caso inicia formalmente en el sistema de cortes de inmigraci\u00f3n.'
        },
        note: 'Ambas personas buscan asilo, pero el camino procesal que enfrentan podr\u00eda ser significativamente diferente. Estos son ejemplos simplificados con fines informativos.'
      },
      workPermit: {
        title: '\u00bfQu\u00e9 implica esto para el permiso de trabajo?',
        subtitle: 'La l\u00ednea de tiempo depende de varios factores',
        text: 'El permiso de trabajo (Employment Authorization Document o EAD) es una de las preocupaciones m\u00e1s frecuentes de quienes solicitan asilo. La l\u00ednea de tiempo para obtenerlo depende de m\u00faltiples factores:',
        factors: [
          'La fecha en que se present\u00f3 formalmente la solicitud de asilo (Formulario I-589).',
          'El tipo de documento que se recibi\u00f3 al ingresar (NTA, orden de deportaci\u00f3n expedita, etc.).',
          'Los cambios regulatorios que podr\u00edan modificar los plazos de espera, que hist\u00f3ricamente han sido de 150 a 180 d\u00edas despu\u00e9s de presentar el I-589.',
          'Si la persona fue liberada con condiciones de monitoreo o permanece detenida.',
          'Las pol\u00edticas espec\u00edficas de la administraci\u00f3n vigente respecto a permisos de trabajo para solicitantes de asilo.'
        ],
        note: 'Los plazos para permisos de trabajo han cambiado m\u00faltiples veces en a\u00f1os recientes. Es fundamental consultar informaci\u00f3n actualizada.'
      },
      policyChanges: {
        title: 'Cambios constantes en las pol\u00edticas fronterizas',
        subtitle: 'Lo que aplica hoy podr\u00eda no aplicar ma\u00f1ana',
        text: 'Una de las mayores dificultades del sistema de asilo en la frontera es su <strong>inestabilidad normativa</strong>. Las pol\u00edticas se modifican, suspenden o reemplazan con frecuencia:',
        changes: [
          'Programas como "Remain in Mexico" (MPP) han sido implementados, suspendidos y reimplementados en diferentes per\u00edodos.',
          'Aplicaciones electr\u00f3nicas como CBP One fueron introducidas y podr\u00edan ser modificadas o eliminadas.',
          'El est\u00e1ndar para aprobar entrevistas de miedo cre\u00edble ha sido elevado y reducido en distintas administraciones.',
          '\u00d3rdenes ejecutivas han restringido o ampliado el acceso al asilo en la frontera de forma dr\u00e1stica.',
          'Los acuerdos con pa\u00edses terceros han alterado las rutas y procesos disponibles para solicitantes de asilo.'
        ],
        note: 'Cualquier informaci\u00f3n sobre pol\u00edticas fronterizas debe verificarse con fuentes actualizadas. Este art\u00edculo es informativo y no refleja necesariamente las pol\u00edticas vigentes al momento de su lectura.'
      },
      conclusion: {
        title: 'Conclusi\u00f3n',
        text: 'Entender las diferencias entre cruzar sin autorizaci\u00f3n y presentarse en un puerto de entrada podr\u00eda ser crucial para el resultado de un caso de asilo. El miedo cre\u00edble es un derecho que permite acceder al proceso, pero el contexto en que una persona ingresa al pa\u00eds afecta directamente el camino procesal que enfrentar\u00e1.',
        advice: 'Antes de tomar cualquier decisi\u00f3n en la frontera, buscar informaci\u00f3n actualizada y, cuando sea posible, consultar con un abogado de inmigraci\u00f3n podr\u00eda marcar la diferencia entre acceder a una audiencia justa o enfrentar una deportaci\u00f3n expedita.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'USCIS \u2013 Credible Fear Screenings',
          'CBP \u2013 Ports of Entry Overview',
          'American Immigration Council \u2013 Asylum in the United States',
          'Department of Homeland Security \u2013 Expedited Removal Fact Sheet',
          'Congressional Research Service \u2013 Immigration Policy at the Border'
        ]
      }
    }
  },
  en: {
    metaTitle: 'Asylum at the Border 2026: Port of Entry vs Illegal Crossing',
    metaDesc: '2026 border asylum guide. Learn the differences between unauthorized crossing and presenting at a port of entry.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '11 min read',
      tags: 'Humanitarian Relief',
      date: 'Apr 04, 2026',
      time: '11 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'Asylum at the Border 2026: Differences Between Surrendering, Presenting at a Port of Entry, and Other Current Processes',
    summary: {
      title: 'Initial Summary',
      text: 'Asylum rules at the border constantly change depending on the current administration, executive orders, and internal agency policies. In this article we explain the differences between <strong>crossing without authorization and surrendering</strong>, <strong>presenting at a port of entry</strong>, the <strong>credible fear</strong> process, and the risks of <strong>expedited removal</strong>. Understanding these processes could make the difference between accessing an asylum hearing or being quickly removed from the country.'
    },
    intro: [
      'Fleeing persecution is an experience that forces decisions under extreme pressure. Many people arrive at the U.S. border without knowing exactly what options they have, what processes await them, or how the way they enter could affect their entire asylum case.',
      'The rules vary depending on the administration, current policies, and even the geographic point where a person presents themselves. What worked two years ago may no longer apply today, and what is announced in the news does not always accurately reflect what happens in practice.',
      'This article aims to explain, in a general and informative way, the differences between the main paths a person might face when seeking asylum at the border in 2026. It is not legal advice, but information that could help better understand a system that many consider confusing and ever-changing.'
    ],
    sections: {
      credibleFear: {
        title: 'What Is "Credible Fear"?',
        quote: 'Credible fear is the first filter that determines whether a person could gain access to a full asylum hearing.',
        text: 'When a person arrives at the border and expresses fear of returning to their country, they are generally referred to a credible fear interview. This interview is conducted by an asylum officer and seeks to establish whether there is a <strong>preliminary basis</strong> to consider that the person could face persecution in their country of origin.',
        points: [
          'The person must demonstrate a reasonable possibility of persecution based on race, religion, nationality, political opinion, or membership in a particular social group.',
          'It is not necessary to prove the entire case at this stage, but rather to demonstrate that a credible basis exists.',
          'If approved, the person could be referred to a defensive asylum process before an immigration judge.',
          'If not approved, the person could be subject to expedited removal, although in some cases they may request review by a judge.'
        ],
        note: 'The credible fear interview does not guarantee asylum approval, but it is a fundamental step to access the process.'
      },
      crossingAndSurrender: {
        title: 'Crossing Without Authorization and Surrendering to Authorities',
        subtitle: 'A path with significant procedural risks',
        text: 'Many people cross the border without documents and then surrender to Border Patrol agents. In these cases, the person is generally detained and processed under <strong>expedited removal</strong> mechanisms, unless they express fear of returning to their country.',
        risks: [
          'Detention could last weeks or months, depending on system capacity and current policies.',
          'If the person does not immediately express fear of persecution, they could be removed without access to a hearing before a judge.',
          'Expedited removal generates a 5-year bar that could prevent legal reentry into the country.',
          'In some periods, detention conditions and access to attorneys have been extremely limited.',
          'Irregular crossing could be interpreted negatively in future immigration applications.'
        ],
        note: 'Surrendering after crossing is not the same as voluntarily presenting at a port of entry. The procedural context is different.'
      },
      portOfEntry: {
        title: 'Presenting at a Port of Entry',
        subtitle: 'A more structured process, though not without challenges',
        text: 'Another option is to present directly at an official port of entry and request asylum or protection. In theory, this process could offer a more orderly path, although policies regarding who can access the port have varied significantly.',
        advantages: [
          'The process tends to be more documented and structured from the start.',
          'It could reduce the risk of being processed under expedited removal without a hearing.',
          'In some cases, the person receives a court appearance document (Notice to Appear or NTA).',
          'Voluntary presentation could be viewed favorably in the subsequent process.',
          'Access to the credible fear interview could be more immediate.'
        ],
        note: 'Some ports of entry have implemented appointment systems or electronic applications (such as CBP One in previous years), which may or may not still be in effect.'
      },
      processAdvantages: {
        title: 'Potential Procedural Advantages of Presenting at a Port of Entry',
        subtitle: 'Documentation, permits, and long-term consequences',
        text: 'Although every case is different, presenting at a port of entry could offer certain procedural advantages over irregular crossing:',
        benefits: [
          'Receiving a formal court appearance document from the immigration court, which formally initiates the case.',
          'The timeline for applying for a work permit could begin from the date the case was filed.',
          'Avoiding the consequences of expedited removal, which include the 5-year bar and possible criminal charges on reattempts.',
          'Having a clearer record of the process, which could facilitate future applications or appeals.',
          'Accessing monitoring programs in freedom rather than prolonged detention.'
        ],
        note: 'These advantages are not guaranteed and depend on the policies in effect at the time of presentation. Everything can change depending on the administration.'
      },
      expeditedRemoval: {
        title: 'The Risk of Expedited Removal',
        subtitle: 'A fast process without a full hearing',
        text: 'Expedited removal is one of the most serious risks when crossing without authorization. It is an accelerated process that <strong>does not include a full hearing before a judge</strong>, unlike regular removal proceedings.',
        consequences: [
          'The person can be removed from the country in days or weeks, without access to an immigration judge.',
          'A deportation order is generated that could create an automatic 5-year bar to legally reenter.',
          'If the person reenters after an expedited removal, they could face federal criminal charges.',
          'The expedited removal record could negatively affect future applications for any immigration benefit.',
          'In some cases, even expressing credible fear does not stop the process if the officer determines the fear does not meet the required standard.'
        ],
        note: 'Expedited removal is different from regular removal proceedings. The main difference is that in expedited removal, there is generally no judge involved.'
      },
      hypothetical: {
        title: 'Two Hypothetical Scenarios Compared',
        scenarioA: {
          title: 'Scenario A: Irregular Crossing and Surrender',
          text: 'A person crosses the border without documents through an unauthorized area and surrenders to Border Patrol. They are detained, processed under expedited removal, and placed in a detention center. They express fear of returning to their country and are referred to a credible fear interview. The interview is scheduled weeks later, during which they remain detained. If they do not pass the interview, they could be deported without seeing a judge.'
        },
        scenarioB: {
          title: 'Scenario B: Presentation at a Port of Entry',
          text: 'Another person presents directly at an official port of entry, declares they are seeking protection, and requests asylum. They are processed, biometric data is collected, and a credible fear interview is scheduled. Depending on current policies, they could be released with a court appearance document or placed in a monitoring program. Their case formally begins in the immigration court system.'
        },
        note: 'Both individuals seek asylum, but the procedural path they face could be significantly different. These are simplified examples for informational purposes.'
      },
      workPermit: {
        title: 'What Does This Mean for Work Permits?',
        subtitle: 'The timeline depends on several factors',
        text: 'The work permit (Employment Authorization Document or EAD) is one of the most frequent concerns of asylum seekers. The timeline for obtaining one depends on multiple factors:',
        factors: [
          'The date the asylum application was formally filed (Form I-589).',
          'The type of document received upon entry (NTA, expedited removal order, etc.).',
          'Regulatory changes that could modify waiting periods, which historically have been 150 to 180 days after filing the I-589.',
          'Whether the person was released under monitoring conditions or remains detained.',
          'The specific policies of the current administration regarding work permits for asylum seekers.'
        ],
        note: 'Timelines for work permits have changed multiple times in recent years. It is essential to consult updated information.'
      },
      policyChanges: {
        title: 'Constant Changes in Border Policies',
        subtitle: 'What applies today might not apply tomorrow',
        text: 'One of the greatest difficulties of the asylum system at the border is its <strong>regulatory instability</strong>. Policies are frequently modified, suspended, or replaced:',
        changes: [
          'Programs such as "Remain in Mexico" (MPP) have been implemented, suspended, and reimplemented in different periods.',
          'Electronic applications like CBP One were introduced and could be modified or eliminated.',
          'The standard for approving credible fear interviews has been raised and lowered in different administrations.',
          'Executive orders have drastically restricted or expanded access to asylum at the border.',
          'Agreements with third countries have altered the routes and processes available to asylum seekers.'
        ],
        note: 'Any information about border policies should be verified with updated sources. This article is informational and does not necessarily reflect the policies in effect at the time of reading.'
      },
      conclusion: {
        title: 'Conclusion',
        text: 'Understanding the differences between crossing without authorization and presenting at a port of entry could be crucial for the outcome of an asylum case. Credible fear is a right that allows access to the process, but the context in which a person enters the country directly affects the procedural path they will face.',
        advice: 'Before making any decision at the border, seeking updated information and, when possible, consulting with an immigration attorney could make the difference between accessing a fair hearing or facing expedited removal.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'USCIS \u2013 Credible Fear Screenings',
          'CBP \u2013 Ports of Entry Overview',
          'American Immigration Council \u2013 Asylum in the United States',
          'Department of Homeland Security \u2013 Expedited Removal Fact Sheet',
          'Congressional Research Service \u2013 Immigration Policy at the Border'
        ]
      }
    }
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = blogContent[lang as 'es' | 'en'] || blogContent.es;

  const social = buildSocialMetadata({
    lang: lang === 'en' ? 'en' : 'es',
    path: `/${lang}/blog/asilo-frontera-2026-puerto-entrada-vs-cruce`,
    title: t.title,
    description: t.metaDesc,
    images: [{ url: IMAGES.article, alt: t.title }],
    type: 'article',
    publishedTime: '2026-04-04T08:00:00.000Z',
  });

  return {
    title: { absolute: t.metaTitle },
    description: t.metaDesc,
    openGraph: {
      ...social.openGraph,
      // Campos article:* que buildSocialMetadata no cubre.
      type: 'article',
      authors: ['Manuel Sol\u00eds'],
      section: 'Visa Humanitaria',
      tags: ['Asilo frontera 2026','Miedo cre\u00edble','Puerto de entrada','Deportaci\u00f3n expedita','Asilo defensivo','Cruce fronterizo'],
    },
    twitter: social.twitter,
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/asilo-frontera-2026-puerto-entrada-vs-cruce`,
      languages: {
        'es': `${SITE_URL}/es/blog/asilo-frontera-2026-puerto-entrada-vs-cruce`,
        'en': `${SITE_URL}/en/blog/asilo-frontera-2026-puerto-entrada-vs-cruce`,
        'x-default': `${SITE_URL}/es/blog/asilo-frontera-2026-puerto-entrada-vs-cruce`,
      },
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = blogContent[lang as 'es' | 'en'] || blogContent.es;
  const enlacesInline = createInlineLinkState();



  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: 'Blog', url: `/${lang}/blog` },
    { name: t.title, url: `/${lang}/blog/asilo-frontera-2026-puerto-entrada-vs-cruce` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="asilo-frontera-2026-puerto-entrada-vs-cruce"
        date="2026-04-04"
        image={IMAGES.article}
        lang={lang as string}
        readTime="11"
      />
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <BlogTracker
        title={t.title}
        author="Manuel Sol\u00eds"
        category="Visa Humanitaria"
      />

      <ReadingProgress />

      <div className={`min-h-screen bg-[#001540] text-white selection:bg-[#B2904D] selection:text-[#001540]`}>

        <Header />

        <BlogBackground />

        <main id="main-content" tabIndex={-1} className="relative z-10 pt-32 pb-20">

          {/* HERO */}
          <section className="container mx-auto px-4 md:px-6 lg:px-8 mb-16">

            <div className="mb-10">
              <Link href={`/${lang}/blog`} className="inline-flex items-center gap-2 text-white/60 hover:text-[#B2904D] transition-colors group text-sm font-medium uppercase tracking-wider">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                {t.ui.back}
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-6 animate-fade-in-up">
              <span className="px-3 py-1 bg-[#B2904D] text-[#001540] text-xs font-bold uppercase tracking-widest rounded-full">
                {t.ui.tags}
              </span>
              <span className="flex items-center gap-2 text-white/60 text-sm">
                <Calendar size={14} /> {t.ui.date}
              </span>
              <span className="flex items-center gap-2 text-white/60 text-sm">
                <Clock size={14} /> {t.ui.time}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-medium text-white leading-[1.1] mb-8 max-w-5xl animate-fade-in-up delay-100">
              {t.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/10 pt-8 animate-fade-in-up delay-200">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#B2904D] shadow-lg shadow-[#B2904D]/20">
                  <Image
                    src={IMAGES.author}
                    alt="Abogado Manuel Solis"
                    fill sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">Abogado Manuel Sol\u00eds</p>
                  <p className="text-white/50 text-sm">{t.ui.authorRole}</p>
                </div>
              </div>

              <ShareButtons title={t.title} uiShareText={t.ui.share} />
            </div>
          </section>

          {/* CONTENIDO */}
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12">

              <article className="lg:col-span-8 prose prose-lg prose-invert max-w-none">

                {/* Imagen principal */}
                <div className="mb-12 relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                   <Image
                     src={IMAGES.article}
                     alt="Asilo en la frontera 2026 puerto de entrada"
                     fill
                     sizes="(max-width: 1024px) 100vw, 760px"
                     className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     priority
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-30" />
                </div>

                {/* Resumen */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-[#B2904D]/20 to-transparent border border-[#B2904D]/30 mb-10 shadow-2xl">
                   <h2 className="text-[#B2904D] font-bold text-xl mb-4 flex items-center gap-2">
                     <Sparkles size={20} /> {t.summary.title}
                   </h2>
                   <p
                     className="text-lg text-white leading-relaxed font-light m-0"
                     dangerouslySetInnerHTML={{ __html: t.summary.text }}
                   />
                </div>

                <div className="space-y-12 text-blue-50/80 font-light text-lg leading-8">

                  {/* Introducci\u00f3n */}
                  <section>
                    {t.intro.map((paragraph, idx) => (
                      <p key={idx} dangerouslySetInnerHTML={{ __html: addInlineLinks(paragraph, lang as 'es' | 'en', enlacesInline) }} className="mb-6" />
                    ))}
                  </section>

                  {/* Secci\u00f3n 1: Miedo cre\u00edble */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Shield size={24} className="text-[#B2904D]" /></div>
                      {t.sections.credibleFear.title}
                    </h2>
                    <p className="text-xl text-white italic mb-6 border-l-4 border-[#B2904D] pl-6 py-2">
                      {t.sections.credibleFear.quote}
                    </p>
                    <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.sections.credibleFear.text }} />
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.credibleFear.points.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.credibleFear.note}
                    </div>
                  </section>

                  {/* Secci\u00f3n 2: Cruzar sin autorizaci\u00f3n y entregarse */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><AlertTriangle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.crossingAndSurrender.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.crossingAndSurrender.subtitle}</p>
                    <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.sections.crossingAndSurrender.text }} />
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.crossingAndSurrender.risks.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.crossingAndSurrender.note}
                    </div>
                  </section>

                  {/* Imagen interior 1 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside1}
                       alt="Puerto de entrada frontera asilo 2026"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Secci\u00f3n 3: Puerto de entrada */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><MapPin size={24} className="text-[#B2904D]" /></div>
                      {t.sections.portOfEntry.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.portOfEntry.subtitle}</p>
                    <p className="mb-4">{t.sections.portOfEntry.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.portOfEntry.advantages.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.portOfEntry.note}
                    </div>
                  </section>

                  {/* Secci\u00f3n 4: Ventajas procesales */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Scale size={24} className="text-[#B2904D]" /></div>
                      {t.sections.processAdvantages.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.processAdvantages.subtitle}</p>
                    <p className="mb-4">{t.sections.processAdvantages.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.processAdvantages.benefits.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.processAdvantages.note}
                    </div>
                  </section>

                  {/* Secci\u00f3n 5: Deportaci\u00f3n expedita */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Gavel size={24} className="text-[#B2904D]" /></div>
                      {t.sections.expeditedRemoval.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.expeditedRemoval.subtitle}</p>
                    <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.sections.expeditedRemoval.text }} />
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.expeditedRemoval.consequences.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.expeditedRemoval.note}
                    </div>
                  </section>

                  {/* Imagen interior 2 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside2}
                       alt="Proceso de asilo, miedo cre&iacute;ble y deportaci&oacute;n expedita"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Secci\u00f3n 6: Escenarios hipot\u00e9ticos */}
                  <section className="relative my-12">
                    <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#B2904D] to-transparent hidden md:block" />
                    <h2 className="text-3xl font-serif text-white mb-8 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Users size={24} className="text-[#B2904D]" /></div>
                      {t.sections.hypothetical.title}
                    </h2>

                    <div className="space-y-6">
                      {/* Escenario A */}
                      <div className="bg-[#000a20] p-8 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden group hover:border-red-400/30 transition-all">
                         <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <AlertTriangle size={100} />
                         </div>
                         <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                           <AlertTriangle size={20} /> {t.sections.hypothetical.scenarioA.title}
                         </h3>
                         <p className="text-white/80 leading-relaxed">
                           {t.sections.hypothetical.scenarioA.text}
                         </p>
                      </div>

                      {/* Escenario B */}
                      <div className="bg-[#000a20] p-8 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden group hover:border-green-400/30 transition-all">
                         <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <ShieldCheck size={100} />
                         </div>
                         <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                           <ShieldCheck size={20} /> {t.sections.hypothetical.scenarioB.title}
                         </h3>
                         <p className="text-white/80 leading-relaxed">
                           {t.sections.hypothetical.scenarioB.text}
                         </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.hypothetical.note}
                    </div>
                  </section>

                  {/* Secci\u00f3n 7: Permiso de trabajo */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><FileText size={24} className="text-[#B2904D]" /></div>
                      {t.sections.workPermit.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.workPermit.subtitle}</p>
                    <p className="mb-4">{t.sections.workPermit.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.workPermit.factors.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.workPermit.note}
                    </div>
                  </section>

                  {/* Secci\u00f3n 8: Cambios constantes */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><TrendingUp size={24} className="text-[#B2904D]" /></div>
                      {t.sections.policyChanges.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.policyChanges.subtitle}</p>
                    <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.sections.policyChanges.text }} />
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.policyChanges.changes.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-yellow-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.policyChanges.note}
                    </div>
                  </section>

                  {/* Conclusi\u00f3n CTA */}
                  <div className="p-8 bg-gradient-to-r from-[#B2904D] to-[#8a6e36] rounded-3xl text-[#001540] shadow-lg mt-12">
                      <h2 className="text-2xl font-bold font-serif mb-4 flex items-center gap-2">
                         <MessageCircle size={28} /> {t.sections.conclusion.title}
                      </h2>
                      <p className="font-medium text-lg mb-6 leading-relaxed">
                        {t.sections.conclusion.text}
                      </p>
                      <p className="font-bold text-xl mb-8">
                        {t.sections.conclusion.advice}
                      </p>

                      <Link href="#contacto" className="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 bg-[#001540] text-white font-bold rounded-xl hover:bg-white hover:text-[#001540] transition-all shadow-xl gap-2">
                         <Send size={18} />
                         {t.ui.ctaButton}
                      </Link>
                  </div>

                  {/* Fuentes */}
                  <div className="border-t border-white/10 pt-8 mt-12">
                      <h4 className="text-xs font-bold text-white/50 uppercase mb-4 tracking-widest">{t.sections.sources.title}</h4>
                      <ul className="space-y-2 text-sm text-white/50 list-none pl-0">
                         {t.sections.sources.list.map((source, idx) => (
                           <li key={idx} className="flex items-center gap-2 hover:text-[#B2904D] transition-colors"><ArrowUpRight size={12} /> {source}</li>
                         ))}
                      </ul>
                  </div>

                </div>
              </article>

              {/* SIDEBAR */}
              <aside className="lg:col-span-4 space-y-8">

                 <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md sticky top-32">
                    <h3 className="text-xs font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">Sobre el Autor</h3>
                    <div className="flex flex-col items-center text-center">
                       <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#001540] shadow-[0_0_0_2px_#B2904D] mb-4">
                          <Image src={IMAGES.author} alt="Manuel Solis" fill sizes="96px" className="object-cover" />
                       </div>
                       <h4 className="text-xl font-bold text-white">Manuel Sol\u00eds</h4>
                       <p className="text-sm text-[#B2904D] mb-4">{t.ui.authorRole}</p>
                       <Link href={`/${lang}/abogados/manuel-solis`} className="text-sm font-bold text-white border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-[#001540] transition-colors w-full">
                         {lang === 'es' ? 'Ver Perfil del Abogado' : 'View Attorney Profile'}
                       </Link>
                    </div>
                 </div>

              </aside>

            </div>
          </div>

        </main>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <RelatedContent
            articles={getRelatedArticles('asilo-frontera-2026-puerto-entrada-vs-cruce', (lang as 'es' | 'en') || 'es')}
            lang={(lang as 'es' | 'en') || 'es'}
            servicePath="/servicios/inmigracion"
          />
        </div>

        <div id="contacto">
           <ContactForm />
        </div>

        <Footer />
      </div>
    </>
  );
}


export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
