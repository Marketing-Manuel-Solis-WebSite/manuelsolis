import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import {
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle,
  Lightbulb, Quote, TrendingUp, Award, Heart, Star, MessageCircle,
  Send, ArrowUpRight, ShieldCheck, FileText, User, Gavel, Search, Building2,
  AlertTriangle, Users, Scale, BookOpen
} from 'lucide-react';

// IMPORTACIONES
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
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
  article: '/blog/blog_15/BLOG05_CR1.png',
  inside1: '/blog/blog_15/BLOG05_CR2.png',
  inside2: '/blog/blog_15/BLOG05_CR2.png',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Estatus Juvenil SIJS: residencia para jovenes abandonados',
    metaDesc: 'Menor de 21 anos y uno de tus padres te abandono? Conoce que es el SIJS y como podria abrir un camino a la residencia juvenil.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir articulo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '10 min de lectura',
      tags: 'Visa Humanitaria',
      date: '17 Mar, 2025',
      time: '10 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'Estatus Juvenil (SIJS): papeles para jovenes abandonados por un solo padre',
    summary: {
      title: 'Resumen inicial',
      text: 'Muchas familias desconocen que un joven que vive con un solo padre y fue abandonado, maltratado o descuidado por el otro podria calificar para un beneficio migratorio conocido como <strong>SIJS (Special Immigrant Juvenile Status)</strong>. Este articulo explica que es el SIJS, quienes podrian calificar, que papel juega el juez estatal y como podria abrirse un camino hacia la residencia permanente. No es un proceso automatico, pero para muchos jovenes podria representar una oportunidad real de regularizar su situacion migratoria.'
    },
    intro: [
      '<strong>Crecer sin uno de los padres</strong> es una realidad que enfrentan miles de jovenes inmigrantes en Estados Unidos. Algunos fueron abandonados desde pequenos, otros dejaron su pais sin que uno de sus padres se involucrara en su crianza, y muchos simplemente crecieron sabiendo que uno de sus padres "no estaba". Esta ausencia, lejos de ser solo una herida emocional, podria tener implicaciones legales que muchos desconocen.',
      'Existe un concepto erroneo muy comun: que para tener algun beneficio migratorio como menor, se necesita haber cruzado la frontera solo, sin ningun familiar. La realidad es distinta. El <strong>SIJS</strong> no es exclusivamente para menores no acompanados. Tambien podria aplicar a jovenes que viven con uno de sus padres pero fueron abandonados, maltratados o descuidados por el otro. Es decir, no se necesita estar completamente solo para poder explorar esta opcion.',
      'En este articulo explicamos los aspectos fundamentales del SIJS, desde los requisitos de edad hasta el papel del juez estatal, con el objetivo de que las familias que podrian calificar se informen antes de que el tiempo se agote. Porque en estos casos, <strong>la edad del joven es el reloj que no se detiene</strong>.'
    ],
    sections: {
      whatIsSIJS: {
        title: 'Que es el SIJS (Special Immigrant Juvenile Status)?',
        quote: 'El SIJS no es una visa automatica; es un proceso que combina la corte estatal y la ley federal de inmigracion.',
        text: 'El SIJS es una clasificacion migratoria especial creada por el Congreso de Estados Unidos para proteger a jovenes inmigrantes que han sido victimas de abandono, abuso o negligencia por parte de uno o ambos padres. A diferencia de otras formas de alivio migratorio, el SIJS requiere la participacion de dos sistemas legales diferentes: primero, un tribunal estatal (como una corte de familia o de menores) debe emitir hallazgos especificos sobre la situacion del joven; despues, el caso pasa al nivel federal ante USCIS.',
        details: [
          'Fue creado originalmente en 1990 y ha sido modificado varias veces desde entonces.',
          'No es una visa en si misma, sino una clasificacion que permite solicitar la residencia permanente.',
          'Requiere que un juez estatal determine que el joven fue abandonado, abusado o descuidado.',
          'Combina el derecho familiar estatal con la ley federal de inmigracion.',
          'Cada caso es evaluado individualmente; no existe aprobacion automatica.'
        ],
        note: 'El SIJS no es lo mismo que una solicitud de asilo ni que una visa humanitaria. Es un mecanismo propio con requisitos especificos que deben cumplirse en un orden determinado.'
      },
      ageRequirements: {
        title: 'Requisitos de edad: el factor mas critico',
        subtitle: 'El tiempo es el enemigo silencioso del SIJS',
        text: 'Uno de los aspectos mas importantes y urgentes del SIJS es la edad del solicitante. La ley federal establece que el joven debe ser menor de 21 anos al momento en que USCIS adjudica la peticion. Sin embargo, los requisitos de la corte estatal pueden variar segun el estado donde se presente el caso.',
        requirements: [
          'La ley federal requiere que el peticionario sea menor de 21 anos.',
          'En muchos estados, la corte de familia solo tiene jurisdiccion sobre menores de 18 anos.',
          'Algunos estados extienden la jurisdiccion de la corte juvenil hasta los 19, 20 o 21 anos en ciertos contextos.',
          'Si el joven cumple la edad limite antes de que se complete el proceso, podria perder la elegibilidad.',
          'Es fundamental iniciar el proceso lo antes posible para evitar que el tiempo se agote.',
          'Un abogado con experiencia podria evaluar si la edad del joven aun permite iniciar el proceso en su estado.'
        ],
        note: 'Cada mes que pasa sin actuar podria reducir las posibilidades. En muchos casos, la diferencia entre calificar y no calificar es cuestion de semanas o meses.'
      },
      singleParent: {
        title: 'No es necesario que ambos padres hayan abandonado al joven',
        subtitle: 'El abandono de un solo padre podria ser suficiente',
        text: 'Este es quizas el punto que genera mas confusion. Muchas familias creen que el SIJS solo aplica si el joven esta completamente solo, sin ningun padre presente. Esto no es correcto. La ley contempla que el abandono, abuso o negligencia de <strong>uno solo</strong> de los padres podria ser base suficiente para los hallazgos del juez estatal.',
        examples: [
          'Un joven que vive con su madre en EE.UU. pero cuyo padre lo abandono en su pais de origen y nunca participo en su crianza.',
          'Un adolescente criado por su padre, cuya madre se desentiendio completamente de su cuidado desde hace anos.',
          'Un joven que fue dejado al cuidado de un familiar porque uno de sus padres se fue y nunca regreso.',
          'Un menor cuyo padre o madre fue deportado y desde entonces no ha tenido comunicacion ni ha provisto apoyo economico o emocional.',
          'Un joven que sufrio maltrato o negligencia de uno de sus padres, aunque el otro padre este presente y sea responsable.'
        ],
        text2: 'Lo importante es que la situacion del joven cumpla con los criterios legales de abandono, abuso o negligencia segun la ley del estado donde se presente el caso. Un abogado con experiencia en SIJS podria evaluar si la historia particular del joven encaja dentro de estos parametros.',
        note: 'Vivir con un padre no descalifica automaticamente al joven. Lo que importa es lo que ocurrio con el otro padre y como eso afecto al menor.'
      },
      stateJudgeRole: {
        title: 'El papel del juez estatal en el proceso SIJS',
        subtitle: 'La orden estatal es el cimiento de todo el caso',
        text: 'Antes de que USCIS pueda considerar una peticion SIJS, se necesita una orden judicial de un tribunal estatal. Este es el paso que muchas familias desconocen y que resulta fundamental para el proceso. El juez estatal no decide sobre inmigracion; su funcion es evaluar la situacion del joven dentro del marco del derecho familiar o de menores.',
        findings: [
          'Que el joven ha sido declarado dependiente de la corte, o ha sido colocado bajo la custodia de una agencia estatal, un departamento, un individuo o una entidad designada por la corte.',
          'Que la reunificacion del joven con uno o ambos padres no es viable debido a abuso, abandono o negligencia (o una base similar bajo la ley estatal).',
          'Que no seria en el mejor interes del joven ser devuelto a su pais de origen u otro pais.'
        ],
        text2: 'Es importante comprender que el juez estatal no esta "otorgando papeles". La orden judicial estatal es solamente el primer paso. Despues de obtenerla, el caso debe presentarse ante USCIS a nivel federal para solicitar la clasificacion SIJS y, posteriormente, la residencia permanente.',
        note: 'La orden del juez estatal debe contener hallazgos muy especificos. Si falta alguno de los elementos requeridos, USCIS podria rechazar la peticion. Por eso la asesoria legal desde el inicio es fundamental.'
      },
      pathToResidency: {
        title: 'El camino hacia la residencia permanente despues del SIJS',
        subtitle: 'Aprobacion del SIJS no significa residencia inmediata',
        text: 'Una vez que USCIS aprueba la clasificacion SIJS (a traves del Formulario I-360), el joven puede solicitar la residencia permanente (a traves del Formulario I-485, ajuste de estatus). Sin embargo, este paso no siempre es inmediato.',
        steps: [
          'Obtener la orden judicial estatal con los hallazgos requeridos.',
          'Presentar el Formulario I-360 ante USCIS para solicitar la clasificacion SIJS.',
          'USCIS revisa y, de ser aprobado, otorga la clasificacion de inmigrante juvenil especial.',
          'Presentar el Formulario I-485 para ajuste de estatus (solicitud de residencia permanente).',
          'Dependiendo del pais de origen del joven, podria existir una espera por disponibilidad de visa.',
          'En algunos casos, el joven puede recibir un permiso de trabajo mientras espera la residencia.'
        ],
        waitTimes: [
          'Para jovenes de la mayoria de paises, la residencia puede procesarse relativamente rapido despues de la aprobacion del I-360.',
          'Para jovenes de ciertos paises con alta demanda (como Mexico, El Salvador, Guatemala y Honduras), podrian existir tiempos de espera significativos.',
          'El Boletin de Visas del Departamento de Estado determina la disponibilidad de visas cada mes.',
          'Durante la espera, el joven podria ser elegible para un permiso de trabajo y proteccion contra la deportacion.'
        ],
        note: 'Los tiempos de espera varian y pueden cambiar. Un abogado actualizado puede orientar sobre los plazos actuales segun el pais de origen del joven.'
      },
      hypothetical: {
        title: 'Ejemplo hipotetico',
        scenario: 'Imagina a un joven de 17 anos que vive con su madre en Texas. Su padre los abandono cuando el tenia 5 anos, se fue a otro pais y nunca mas se comunico, no envio dinero ni participo de ninguna forma en su crianza. La madre ha sido quien lo ha sostenido sola durante toda su vida. El joven no tiene estatus migratorio y no sabe que podria haber una opcion para el.',
        analysis: 'En un caso como este, un abogado con experiencia en SIJS podria evaluar si el joven califica para iniciar el proceso. Se buscaria obtener una orden de una corte estatal en Texas que establezca los hallazgos requeridos sobre el abandono paterno. Si la corte emite esa orden y USCIS aprueba la peticion I-360, el joven podria eventualmente solicitar la residencia permanente. Todo esto dependeria de los hechos especificos del caso, la evidencia disponible y los tiempos de procesamiento.',
        note: 'Este es un ejemplo ilustrativo. Cada caso es diferente y los resultados dependen de multiples factores. La consulta con un abogado es esencial para determinar la viabilidad.'
      },
      clarifications: {
        title: 'Aclaraciones importantes sobre el SIJS',
        subtitle: 'Lo que el SIJS no es y lo que si podria ser',
        text: 'Dado que existe mucha desinformacion sobre el SIJS, es importante aclarar varios puntos que las familias frecuentemente malinterpretan:',
        myths: [
          'El SIJS no es una visa humanitaria automatica. Requiere un proceso legal especifico con multiples pasos.',
          'No aplica unicamente a menores no acompanados. Jovenes que viven con un padre tambien podrian calificar.',
          'No basta con decir que un padre "no esta". Se necesitan hallazgos judiciales especificos de abandono, abuso o negligencia.',
          'Tener antecedentes penales podria afectar la elegibilidad, dependiendo de la naturaleza y gravedad de los mismos.',
          'El SIJS no protege contra la deportacion de manera automatica mientras se procesa, aunque en la practica USCIS generalmente ejerce discrecion favorable.',
          'Cada estado tiene sus propias leyes de familia, lo que significa que los procedimientos pueden variar significativamente de un estado a otro.',
          'El proceso requiere representacion legal competente. Intentar hacerlo sin abogado podria poner en riesgo el caso.'
        ],
        truths: [
          'El SIJS podria ser una de las opciones mas solidas para jovenes que califican.',
          'La aprobacion del SIJS abre la puerta a la residencia permanente legal.',
          'Un abogado experimentado puede evaluar la elegibilidad en una consulta inicial.',
          'Actuar a tiempo es absolutamente critico; la edad es el factor determinante.',
          'Miles de jovenes han obtenido su residencia a traves de este proceso.'
        ],
        note: 'No todo joven sin papeles califica para SIJS. Pero aquellos que si podrian calificar necesitan actuar con urgencia, porque la ventana de oportunidad se cierra con cada cumpleanos.'
      },
      conclusion: {
        title: 'Conclusion: informarse a tiempo podria cambiar el futuro de un joven',
        text: 'El SIJS representa una oportunidad real para miles de jovenes que crecieron sin uno de sus padres y que hoy viven en Estados Unidos sin estatus migratorio. No es un proceso sencillo ni automatico, pero con la orientacion legal adecuada y actuando a tiempo, podria ser el camino hacia la residencia permanente. La clave esta en no asumir que "no se califica" sin antes consultar con un profesional.',
        advice: 'Si tienes un hijo menor de 21 anos que fue abandonado por uno de sus padres, o si eres un joven en esa situacion, busca orientacion legal lo antes posible. El tiempo que pasa podria ser tiempo que se pierde. Informarse no compromete a nada, pero no hacerlo podria cerrar puertas que hoy estan abiertas.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'USCIS - Special Immigrant Juveniles (SIJ) Status',
          'Immigration and Nationality Act (INA) Section 101(a)(27)(J)',
          'USCIS Policy Manual - Volume 6, Part J: Special Immigrant Juveniles',
          'National Immigrant Justice Center - SIJS Resources',
          'American Immigration Lawyers Association (AILA) - SIJS Practice Pointers'
        ]
      }
    }
  },
  en: {
    metaTitle: 'SIJS Juvenile Status: Residency for Abandoned Youth',
    metaDesc: 'Under 21 and one parent abandoned you? Learn what SIJS is and how it could open a path to juvenile residency.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '10 min read',
      tags: 'Humanitarian Relief',
      date: 'Mar 17, 2025',
      time: '10 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'Juvenile Status (SIJS): Papers for Youth Abandoned by One Parent',
    summary: {
      title: 'Initial Summary',
      text: 'Many families are unaware that a young person living with one parent who was abandoned, abused, or neglected by the other could qualify for an immigration benefit known as <strong>SIJS (Special Immigrant Juvenile Status)</strong>. This article explains what SIJS is, who might qualify, what role the state judge plays, and how it could open a path to permanent residency. It is not an automatic process, but for many young people it could represent a real opportunity to regularize their immigration status.'
    },
    intro: [
      '<strong>Growing up without one parent</strong> is a reality faced by thousands of young immigrants in the United States. Some were abandoned as children, others left their country without one of their parents being involved in their upbringing, and many simply grew up knowing that one of their parents "was not there." This absence, far from being just an emotional wound, could have legal implications that many are unaware of.',
      'There is a very common misconception: that in order to have any immigration benefit as a minor, one needs to have crossed the border alone, without any family member. The reality is different. <strong>SIJS</strong> is not exclusively for unaccompanied minors. It could also apply to young people who live with one parent but were abandoned, abused, or neglected by the other. In other words, you do not need to be completely alone to explore this option.',
      'In this article we explain the fundamental aspects of SIJS, from age requirements to the role of the state judge, with the goal of helping families who might qualify get informed before time runs out. Because in these cases, <strong>the young person\'s age is the clock that never stops</strong>.'
    ],
    sections: {
      whatIsSIJS: {
        title: 'What Is SIJS (Special Immigrant Juvenile Status)?',
        quote: 'SIJS is not an automatic visa; it is a process that combines state court and federal immigration law.',
        text: 'SIJS is a special immigration classification created by the United States Congress to protect young immigrants who have been victims of abandonment, abuse, or neglect by one or both parents. Unlike other forms of immigration relief, SIJS requires the participation of two different legal systems: first, a state court (such as a family or juvenile court) must issue specific findings about the young person\'s situation; then, the case moves to the federal level before USCIS.',
        details: [
          'It was originally created in 1990 and has been modified several times since then.',
          'It is not a visa in itself, but rather a classification that allows one to apply for permanent residency.',
          'It requires a state judge to determine that the youth was abandoned, abused, or neglected.',
          'It combines state family law with federal immigration law.',
          'Each case is evaluated individually; there is no automatic approval.'
        ],
        note: 'SIJS is not the same as an asylum application or a humanitarian visa. It is its own mechanism with specific requirements that must be met in a specific order.'
      },
      ageRequirements: {
        title: 'Age Requirements: The Most Critical Factor',
        subtitle: 'Time is the silent enemy of SIJS',
        text: 'One of the most important and urgent aspects of SIJS is the applicant\'s age. Federal law requires that the young person be under 21 years old at the time USCIS adjudicates the petition. However, state court requirements may vary depending on the state where the case is filed.',
        requirements: [
          'Federal law requires the petitioner to be under 21 years old.',
          'In many states, family court only has jurisdiction over minors under 18.',
          'Some states extend juvenile court jurisdiction to 19, 20, or 21 in certain contexts.',
          'If the youth reaches the age limit before the process is complete, they could lose eligibility.',
          'It is essential to start the process as early as possible to prevent time from running out.',
          'An experienced attorney could evaluate whether the young person\'s age still allows starting the process in their state.'
        ],
        note: 'Every month that passes without action could reduce the chances. In many cases, the difference between qualifying and not qualifying is a matter of weeks or months.'
      },
      singleParent: {
        title: 'Both Parents Do Not Need to Have Abandoned the Youth',
        subtitle: 'Abandonment by one parent alone could be sufficient',
        text: 'This is perhaps the point that generates the most confusion. Many families believe that SIJS only applies if the young person is completely alone, without any parent present. This is not correct. The law contemplates that abandonment, abuse, or neglect by <strong>only one</strong> parent could be a sufficient basis for the state judge\'s findings.',
        examples: [
          'A young person living with their mother in the U.S. whose father abandoned them in their home country and never participated in their upbringing.',
          'A teenager raised by their father, whose mother completely disengaged from their care years ago.',
          'A young person who was left in the care of a relative because one of their parents left and never returned.',
          'A minor whose father or mother was deported and since then has had no communication or provided financial or emotional support.',
          'A young person who suffered abuse or neglect from one parent, even though the other parent is present and responsible.'
        ],
        text2: 'What matters is that the young person\'s situation meets the legal criteria for abandonment, abuse, or neglect under the law of the state where the case is filed. An attorney experienced in SIJS could evaluate whether the individual\'s particular story fits within these parameters.',
        note: 'Living with one parent does not automatically disqualify the youth. What matters is what happened with the other parent and how it affected the minor.'
      },
      stateJudgeRole: {
        title: 'The Role of the State Judge in the SIJS Process',
        subtitle: 'The state order is the foundation of the entire case',
        text: 'Before USCIS can consider a SIJS petition, a court order from a state tribunal is needed. This is the step that many families are unaware of and that is fundamental to the process. The state judge does not decide on immigration matters; their role is to evaluate the young person\'s situation within the framework of family or juvenile law.',
        findings: [
          'That the youth has been declared a dependent of the court, or has been placed under the custody of a state agency, department, individual, or entity designated by the court.',
          'That reunification of the youth with one or both parents is not viable due to abuse, abandonment, or neglect (or a similar basis under state law).',
          'That it would not be in the best interest of the youth to be returned to their country of origin or another country.'
        ],
        text2: 'It is important to understand that the state judge is not "granting papers." The state court order is only the first step. After obtaining it, the case must be filed before USCIS at the federal level to request the SIJS classification and, subsequently, permanent residency.',
        note: 'The state judge\'s order must contain very specific findings. If any of the required elements is missing, USCIS could deny the petition. That is why legal counsel from the start is essential.'
      },
      pathToResidency: {
        title: 'The Path to Permanent Residency After SIJS',
        subtitle: 'SIJS approval does not mean immediate residency',
        text: 'Once USCIS approves the SIJS classification (through Form I-360), the young person can apply for permanent residency (through Form I-485, adjustment of status). However, this step is not always immediate.',
        steps: [
          'Obtain the state court order with the required findings.',
          'File Form I-360 with USCIS to request the SIJS classification.',
          'USCIS reviews and, if approved, grants the special immigrant juvenile classification.',
          'File Form I-485 for adjustment of status (permanent residency application).',
          'Depending on the youth\'s country of origin, there may be a wait for visa availability.',
          'In some cases, the youth may receive a work permit while waiting for residency.'
        ],
        waitTimes: [
          'For youth from most countries, residency can be processed relatively quickly after I-360 approval.',
          'For youth from certain high-demand countries (such as Mexico, El Salvador, Guatemala, and Honduras), there may be significant wait times.',
          'The Department of State\'s Visa Bulletin determines visa availability each month.',
          'During the wait, the youth may be eligible for a work permit and protection from deportation.'
        ],
        note: 'Wait times vary and can change. An up-to-date attorney can provide guidance on current timelines based on the youth\'s country of origin.'
      },
      hypothetical: {
        title: 'Hypothetical Example',
        scenario: 'Imagine a 17-year-old living with his mother in Texas. His father abandoned them when he was 5 years old, moved to another country, and never communicated again, never sent money, and never participated in any way in his upbringing. His mother has been the sole provider and caretaker his entire life. The young man has no immigration status and does not know there could be an option for him.',
        analysis: 'In a case like this, an attorney experienced in SIJS could evaluate whether the young person qualifies to begin the process. The goal would be to obtain an order from a state court in Texas that establishes the required findings regarding paternal abandonment. If the court issues that order and USCIS approves the I-360 petition, the young person could eventually apply for permanent residency. All of this would depend on the specific facts of the case, the available evidence, and processing times.',
        note: 'This is an illustrative example. Every case is different and outcomes depend on multiple factors. Consultation with an attorney is essential to determine viability.'
      },
      clarifications: {
        title: 'Important Clarifications About SIJS',
        subtitle: 'What SIJS is not and what it could be',
        text: 'Given the significant amount of misinformation about SIJS, it is important to clarify several points that families frequently misunderstand:',
        myths: [
          'SIJS is not an automatic humanitarian visa. It requires a specific legal process with multiple steps.',
          'It does not apply only to unaccompanied minors. Youth living with one parent could also qualify.',
          'It is not enough to say that a parent "is not around." Specific judicial findings of abandonment, abuse, or neglect are required.',
          'Having a criminal record could affect eligibility, depending on the nature and severity of the offenses.',
          'SIJS does not automatically protect against deportation while being processed, although in practice USCIS generally exercises favorable discretion.',
          'Each state has its own family laws, which means procedures can vary significantly from state to state.',
          'The process requires competent legal representation. Attempting it without an attorney could put the case at risk.'
        ],
        truths: [
          'SIJS could be one of the strongest options for qualifying youth.',
          'SIJS approval opens the door to legal permanent residency.',
          'An experienced attorney can evaluate eligibility in an initial consultation.',
          'Acting on time is absolutely critical; age is the determining factor.',
          'Thousands of young people have obtained their residency through this process.'
        ],
        note: 'Not every undocumented youth qualifies for SIJS. But those who might qualify need to act urgently, because the window of opportunity closes with every birthday.'
      },
      conclusion: {
        title: 'Conclusion: Getting Informed in Time Could Change a Young Person\'s Future',
        text: 'SIJS represents a real opportunity for thousands of young people who grew up without one of their parents and who today live in the United States without immigration status. It is not a simple or automatic process, but with proper legal guidance and timely action, it could be the path to permanent residency. The key is not to assume that "you don\'t qualify" without first consulting a professional.',
        advice: 'If you have a child under 21 who was abandoned by one parent, or if you are a young person in that situation, seek legal guidance as soon as possible. Time that passes could be time lost. Getting informed does not commit you to anything, but failing to do so could close doors that are open today.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'USCIS - Special Immigrant Juveniles (SIJ) Status',
          'Immigration and Nationality Act (INA) Section 101(a)(27)(J)',
          'USCIS Policy Manual - Volume 6, Part J: Special Immigrant Juveniles',
          'National Immigrant Justice Center - SIJS Resources',
          'American Immigration Lawyers Association (AILA) - SIJS Practice Pointers'
        ]
      }
    }
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = blogContent[lang as 'es' | 'en'] || blogContent.es;

  const imageUrl = `${SITE_URL}${IMAGES.article}`;

  return {
    title: t.metaTitle,
    description: t.metaDesc,
    openGraph: {
      title: t.title,
      description: t.metaDesc,
      url: `${SITE_URL}/${lang}/blog/estatus_juvenil_sijs_residencia_jovenes_abandonados`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
      type: 'article',
      publishedTime: '2025-03-17T08:00:00.000Z',
      authors: ['Manuel Solis'],
      section: 'Inmigracion',
      tags: ['SIJS','Estatus Juvenil','Residencia juvenil','Abandono parental','Inmigracion juvenil','Menores inmigrantes'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.metaDesc,
      images: [imageUrl],
      creator: '@AbogadoMSolis',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/estatus_juvenil_sijs_residencia_jovenes_abandonados`,
      languages: {
        'es': `${SITE_URL}/es/blog/estatus_juvenil_sijs_residencia_jovenes_abandonados`,
        'en': `${SITE_URL}/en/blog/estatus_juvenil_sijs_residencia_jovenes_abandonados`,
        'x-default': `${SITE_URL}/es/blog/estatus_juvenil_sijs_residencia_jovenes_abandonados`,
      },
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = blogContent[lang as 'es' | 'en'] || blogContent.es;



  const breadcrumbData = generateBreadcrumbSchema([
    { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
    { name: 'Blog', url: `/${lang}/blog` },
    { name: t.title, url: `/${lang}/blog/estatus_juvenil_sijs_residencia_jovenes_abandonados` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="estatus_juvenil_sijs_residencia_jovenes_abandonados"
        date="2025-03-17"
        image={IMAGES.article}
        lang={lang as string}
        readTime="10"
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <BlogTracker
        title={t.title}
        author="Manuel Solis"
        category="Visa Humanitaria"
      />

      <ReadingProgress />

      <div className={`min-h-screen bg-[#001540] text-white selection:bg-[#B2904D] selection:text-[#001540]`}>

        <Header />

        <BlogBackground />

        <main className="relative z-10 pt-32 pb-20">

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
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">Abogado Manuel Solis</p>
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
                     alt="Estatus Juvenil SIJS residencia jovenes abandonados"
                     fill
                     className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     priority
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-30" />
                </div>

                {/* Resumen */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-[#B2904D]/20 to-transparent border border-[#B2904D]/30 mb-10 shadow-2xl">
                   <h3 className="text-[#B2904D] font-bold text-xl mb-4 flex items-center gap-2">
                     <Sparkles size={20} /> {t.summary.title}
                   </h3>
                   <p
                     className="text-lg text-white leading-relaxed font-light m-0"
                     dangerouslySetInnerHTML={{ __html: t.summary.text }}
                   />
                </div>

                <div className="space-y-12 text-blue-50/80 font-light text-lg leading-8">

                  {/* Introduccion */}
                  <section>
                    {t.intro.map((paragraph, idx) => (
                      <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} className="mb-6" />
                    ))}
                  </section>

                  {/* Seccion 1: Que es el SIJS? */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Search size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whatIsSIJS.title}
                    </h2>
                    <p className="text-xl text-white italic mb-6 border-l-4 border-[#B2904D] pl-6 py-2">
                      {t.sections.whatIsSIJS.quote}
                    </p>
                    <p className="mb-4">{t.sections.whatIsSIJS.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.whatIsSIJS.details.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.whatIsSIJS.note}
                    </div>
                  </section>

                  {/* Seccion 2: Requisitos de edad */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Clock size={24} className="text-[#B2904D]" /></div>
                      {t.sections.ageRequirements.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.ageRequirements.subtitle}</p>
                    <p className="mb-8">{t.sections.ageRequirements.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.ageRequirements.requirements.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.ageRequirements.note}
                    </div>
                  </section>

                  {/* Seccion 3: Un solo padre */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Users size={24} className="text-[#B2904D]" /></div>
                      {t.sections.singleParent.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.singleParent.subtitle}</p>
                    <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.sections.singleParent.text }} />
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.singleParent.examples.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mb-4">{t.sections.singleParent.text2}</p>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.singleParent.note}
                    </div>
                  </section>

                  {/* Imagen interior 1 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside1}
                       alt="SIJS estatus juvenil jovenes inmigrantes"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Seccion 4: Papel del juez estatal */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Gavel size={24} className="text-[#B2904D]" /></div>
                      {t.sections.stateJudgeRole.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.stateJudgeRole.subtitle}</p>
                    <p className="mb-4">{t.sections.stateJudgeRole.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.stateJudgeRole.findings.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <Scale size={24} className="text-[#B2904D] shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mb-4">{t.sections.stateJudgeRole.text2}</p>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.stateJudgeRole.note}
                    </div>
                  </section>

                  {/* Seccion 5: Camino a la residencia */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><TrendingUp size={24} className="text-[#B2904D]" /></div>
                      {t.sections.pathToResidency.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.pathToResidency.subtitle}</p>
                    <p className="mb-4">{t.sections.pathToResidency.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.pathToResidency.steps.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <h3 className="text-xl font-serif text-white mb-4">{lang === 'es' ? 'Tiempos de espera' : 'Wait Times'}</h3>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.pathToResidency.waitTimes.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.pathToResidency.note}
                    </div>
                  </section>

                  {/* Imagen interior 2 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside2}
                       alt="Residencia permanente SIJS jovenes abandonados"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Seccion 6: Ejemplo hipotetico */}
                  <section className="relative my-12">
                    <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#B2904D] to-transparent hidden md:block" />
                    <h2 className="text-3xl font-serif text-white mb-8 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><User size={24} className="text-[#B2904D]" /></div>
                      {t.sections.hypothetical.title}
                    </h2>

                    <div className="bg-[#000a20] p-8 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden group hover:border-[#B2904D]/30 transition-all">
                       <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Quote size={120} />
                       </div>

                       <p className="italic text-white/90 mb-6 text-lg">
                         {t.sections.hypothetical.scenario}
                       </p>

                       <p className="mb-6">
                         {t.sections.hypothetical.analysis}
                       </p>

                       <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                         <AlertCircle size={16} className="inline mr-2" />
                         {t.sections.hypothetical.note}
                       </div>
                    </div>
                  </section>

                  {/* Seccion 7: Aclaraciones importantes */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><BookOpen size={24} className="text-[#B2904D]" /></div>
                      {t.sections.clarifications.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.clarifications.subtitle}</p>
                    <p className="mb-4">{t.sections.clarifications.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.clarifications.myths.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <h3 className="text-xl font-serif text-white mb-4">{lang === 'es' ? 'Lo que si podria ser el SIJS' : 'What SIJS could be'}</h3>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.clarifications.truths.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.clarifications.note}
                    </div>
                  </section>

                  {/* Conclusion CTA */}
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
                          <Image src={IMAGES.author} alt="Manuel Solis" fill className="object-cover" />
                       </div>
                       <h4 className="text-xl font-bold text-white">Manuel Solis</h4>
                       <p className="text-sm text-[#B2904D] mb-4">{t.ui.authorRole}</p>
                       <Link href={`/${lang}/abogados`} className="text-sm font-bold text-white border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-[#001540] transition-colors w-full">
                         Ver Perfil
                       </Link>
                    </div>
                 </div>

              </aside>

            </div>
          </div>

        </main>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <RelatedContent
            articles={getRelatedArticles('estatus_juvenil_sijs_residencia_jovenes_abandonados', (lang as 'es' | 'en') || 'es')}
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
