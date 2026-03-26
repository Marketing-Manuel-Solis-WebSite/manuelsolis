import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import {
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle,
  Lightbulb, Quote, TrendingUp, Award, Heart, Star, MessageCircle,
  Send, ArrowUpRight, ShieldCheck, FileText, User, Gavel, Search, Building2,
  AlertTriangle, Users, Scale, BookOpen, Ban, Home
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
  article: '/blog/blog_16/BLOG06_CR1.png',
  inside1: '/blog/blog_16/BLOG06_CR2.png',
  inside2: '/blog/blog_16/BLOG06_CR2.png',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Perdón I-601A: Cómo arreglar papeles si entraste ilegalmente',
    metaDesc: '¿Entraste sin inspección y te casaste con un ciudadano? Descubre cómo el Perdón I-601A permite obtener la residencia evitando el castigo de los 10 años.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '11 min de lectura',
      tags: 'Procesos Migratorios',
      date: '20 Mar, 2025',
      time: '11 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'Me casé con ciudadano pero entré "por el cerro": el Perdón I-601A explicado',
    summary: {
      title: 'Resumen inicial',
      text: 'Casarse con un ciudadano estadounidense no otorga residencia automática cuando la entrada al país fue sin inspección. En estos casos, la ley activa un castigo de <strong>3 o 10 años</strong> fuera de Estados Unidos antes de poder regresar legalmente. El <strong>Perdón I-601A</strong> (Provisional Unlawful Presence Waiver) es el puente legal que podría permitir a muchas familias evitar esa separación prolongada y completar el proceso consular de forma más segura.'
    },
    intro: [
      '<strong>El amor no conoce fronteras, pero la ley migratoria sí.</strong> Miles de personas que cruzaron sin inspección y luego formaron una familia con un ciudadano estadounidense se encuentran con una realidad difícil: el matrimonio por sí solo no arregla su situación migratoria.',
      'Muchos descubren, a veces años después de casarse, que no pueden simplemente "ajustar estatus" dentro del país. La ley les exige salir de Estados Unidos para tramitar su visa de inmigrante en el consulado, pero al hacerlo se activa un castigo conocido como el <strong>"bar" de los 3 o 10 años</strong>, que les impide regresar legalmente durante ese tiempo.',
      'El Perdón I-601A fue creado precisamente para resolver esta trampa legal. Permite solicitar un perdón provisional <strong>antes de salir</strong> del país, de modo que la persona pueda asistir a su cita consular con la confianza de que podrá regresar a casa con su familia. En este artículo explicamos cómo funciona, quién califica y qué esperar del proceso paso a paso.'
    ],
    sections: {
      whatIsI601A: {
        title: '¿Qué es el Perdón I-601A?',
        quote: 'El I-601A no es un perdón por haber cometido un delito. Es un perdón por el tiempo que estuviste presente sin autorización.',
        text: 'El Formulario I-601A, conocido oficialmente como "Provisional Unlawful Presence Waiver" (Perdón Provisional por Presencia Ilegal), es una solicitud ante USCIS que permite perdonar la acumulación de presencia ilegal en Estados Unidos. Este perdón cubre específicamente la inadmisibilidad causada bajo la sección 212(a)(9)(B)(i) de la Ley de Inmigración y Nacionalidad (INA).',
        points: [
          'Cubre únicamente la presencia ilegal (unlawful presence), no otros motivos de inadmisibilidad.',
          'Se solicita mientras la persona todavía se encuentra en Estados Unidos.',
          'Evita que la persona tenga que esperar 3 o 10 años fuera del país tras la entrevista consular.',
          'Requiere demostrar que un familiar calificado sufriría "sufrimiento extremo" si el perdón no se otorga.',
          'No es un beneficio automático: USCIS evalúa cada caso individualmente.'
        ],
        note: 'El I-601A no otorga estatus legal ni permiso de trabajo por sí mismo. Es un paso dentro de un proceso más largo que culmina con la visa de inmigrante otorgada en el consulado.'
      },
      entryWithoutInspection: {
        title: 'El obstáculo de la entrada sin inspección',
        subtitle: 'Por qué el matrimonio no basta para arreglar',
        text: 'Cuando una persona ingresa a Estados Unidos sin pasar por un punto oficial de entrada, ya sea cruzando el desierto, el río o cualquier otra ruta no autorizada, la ley considera que esa persona entró "sin inspección" (entry without inspection o EWI). Esta distinción es fundamental porque determina qué opciones migratorias tiene la persona a futuro.',
        obstacles: [
          'No puede ajustar estatus dentro de Estados Unidos, incluso si está casada con un ciudadano.',
          'Debe salir del país y tramitar la visa de inmigrante a través del proceso consular.',
          'Al salir, si acumuló más de 180 días de presencia ilegal, se activa el castigo de 3 años (por más de 180 días pero menos de un año) o de 10 años (por más de un año).',
          'Mientras el castigo esté activo, no puede obtener visa ni regresar legalmente.',
          'Sin el perdón I-601A, la persona queda separada de su familia durante años.'
        ],
        text2: 'Este es el "círculo vicioso" que enfrentan muchas familias: la ley les exige salir para tramitar, pero salir activa un castigo que les impide regresar. El I-601A rompe ese ciclo al perdonar la presencia ilegal antes de que la persona salga del país.'
      },
      extremeHardship: {
        title: 'El requisito de "sufrimiento extremo"',
        subtitle: 'La pieza clave de todo el caso',
        text: 'Para que USCIS apruebe el Perdón I-601A, el solicitante debe demostrar que su familiar calificado (cónyuge o padre/madre ciudadano o residente permanente) sufriría un "sufrimiento extremo" (extreme hardship) si el perdón fuera negado y la persona no pudiera regresar a Estados Unidos. Este es el estándar más importante del caso y se analiza bajo múltiples factores:',
        factors: [
          'Condiciones de salud del familiar calificado: enfermedades crónicas, condiciones mentales, necesidad de tratamientos especializados no disponibles en el otro país.',
          'Impacto financiero: si el familiar depende económicamente del solicitante, pérdida de empleo, imposibilidad de pagar hipoteca, deudas médicas o educativas.',
          'Impacto en los hijos: aunque los hijos ciudadanos no son "familiares calificados" por sí mismos, su bienestar se considera como parte del sufrimiento del padre/madre calificado.',
          'Condiciones del país de origen: inseguridad, falta de servicios médicos, inestabilidad económica o política que afectaría al familiar si tuviera que reubicarse.',
          'Lazos comunitarios y familiares: tiempo vivido en EE.UU., redes de apoyo, integración escolar de los hijos, responsabilidades de cuidado de familiares mayores.',
          'Impacto emocional y psicológico: documentado por profesionales de salud mental, especialmente cuando hay antecedentes de depresión, ansiedad o trauma.'
        ],
        note: 'El sufrimiento debe ser "extremo", no simplemente la tristeza o inconveniencia normal de una separación familiar. USCIS requiere evidencia concreta y documentada. Un caso bien preparado incluye cartas personales, reportes médicos, declaraciones financieras y opiniones de expertos.'
      },
      whoCanApply: {
        title: '¿Quién puede solicitar el Perdón I-601A?',
        subtitle: 'Requisitos de elegibilidad',
        text: 'No todas las personas que entraron sin inspección califican para este perdón. USCIS ha establecido criterios específicos que deben cumplirse para poder presentar el Formulario I-601A:',
        requirements: [
          'Tener 17 años o más al momento de presentar la solicitud.',
          'Estar físicamente presente en Estados Unidos al momento de la solicitud.',
          'Tener un caso de visa de inmigrante activo con el Centro Nacional de Visas (NVC) o un formulario I-130 aprobado.',
          'Ser inadmisible únicamente por presencia ilegal bajo la sección 212(a)(9)(B)(i) de la INA.',
          'Tener un familiar calificado (cónyuge o padre/madre) que sea ciudadano estadounidense o residente permanente legal.',
          'Demostrar que el familiar calificado sufriría sufrimiento extremo si el perdón no se otorga.',
          'No tener otros motivos de inadmisibilidad no cubiertos por el I-601A (como ciertos antecedentes penales graves o fraude migratorio).'
        ],
        note: 'Si la persona tiene otros motivos de inadmisibilidad además de la presencia ilegal, podría necesitar perdones adicionales. Un abogado puede evaluar si el I-601A es suficiente o si se requiere una estrategia más amplia.'
      },
      stepByStep: {
        title: 'El proceso paso a paso',
        subtitle: 'Desde la petición familiar hasta el regreso legal',
        text: 'El Perdón I-601A no es un trámite aislado. Es parte de un proceso más largo que comienza con la petición familiar y culmina con la obtención de la visa de inmigrante en el consulado. Estos son los pasos típicos:',
        steps: [
          'Petición I-130: El ciudadano o residente presenta la petición familiar ante USCIS. Esta es la base de todo el proceso y debe ser aprobada.',
          'Procesamiento con el NVC: Una vez aprobada la I-130, el caso pasa al Centro Nacional de Visas, donde se pagan las tarifas y se envían los documentos iniciales.',
          'Solicitud del I-601A: Mientras el caso está con el NVC (y antes de la entrevista consular), se presenta el Formulario I-601A ante USCIS con toda la evidencia de sufrimiento extremo.',
          'Espera de aprobación: USCIS revisa el caso. Los tiempos de procesamiento varían, pero pueden tomar varios meses. Durante este tiempo, la persona permanece en Estados Unidos.',
          'Aprobación y programación consular: Si el I-601A es aprobado, el NVC programa la entrevista en el consulado del país de origen.',
          'Salida y entrevista consular: La persona viaja a su país de origen para la entrevista. Como el perdón ya está aprobado, el castigo por presencia ilegal ya fue perdonado.',
          'Regreso legal: Si la entrevista consular es exitosa y se otorga la visa de inmigrante, la persona regresa a Estados Unidos como residente permanente legal.'
        ],
        note: 'Todo el proceso puede tomar entre 1 y 3 años dependiendo de los tiempos de procesamiento de USCIS y el NVC. La paciencia y la preparación son fundamentales.'
      },
      hypothetical: {
        title: 'Ejemplo hipotético: Carlos y Elena',
        scenario: 'Carlos llegó a Estados Unidos hace 12 años cruzando la frontera sin inspección. Poco después conoció a Elena, ciudadana estadounidense, y se casaron. Juntos tienen dos hijos nacidos en EE.UU. Elena padece una condición crónica de espalda que requiere terapia física constante y la limita para trabajar tiempo completo. Carlos es el principal proveedor económico de la familia.',
        analysis: 'Sin el Perdón I-601A, Carlos tendría que salir de Estados Unidos para su entrevista consular, activando automáticamente el castigo de 10 años. Elena quedaría sola con dos hijos pequeños, sin el ingreso principal, y con una condición médica que le dificulta trabajar. Los niños perderían la estabilidad de su hogar, su escuela y la presencia diaria de su padre. El abogado de Carlos documentó el impacto financiero (declaraciones de impuestos, estados de cuenta, carta del empleador), la condición médica de Elena (reportes médicos, carta del especialista), el impacto emocional (evaluación psicológica de Elena y cartas de los maestros de los niños), y las condiciones del país de origen que harían imposible la reubicación de la familia.',
        result: 'Con esta evidencia, el I-601A fue aprobado. Carlos viajó a su país para la entrevista consular, y regresó legalmente como residente permanente en pocas semanas.',
        note: 'Este es un ejemplo hipotético con fines educativos. Cada caso es único y los resultados dependen de las circunstancias individuales y la evidencia presentada.'
      },
      clarifications: {
        title: 'Aclaraciones importantes',
        subtitle: 'Lo que debes saber antes de iniciar',
        text: 'El Perdón I-601A es una herramienta poderosa, pero no es una solución mágica. Es fundamental entender sus limitaciones y riesgos:',
        warnings: [
          'No es un permiso de trabajo: el I-601A no otorga autorización de empleo ni estatus legal temporal. La persona sigue sin estatus hasta completar todo el proceso consular.',
          'Existe riesgo de negación: si USCIS determina que el sufrimiento extremo no fue suficientemente demostrado, el perdón puede ser negado. Sin embargo, se puede apelar o volver a solicitar con evidencia más sólida.',
          'Castigo permanente por múltiples entradas ilegales: si una persona fue deportada y volvió a entrar ilegalmente, podría enfrentar un castigo permanente de 10 o 20 años que el I-601A no cubre.',
          'Antecedentes penales pueden descalificar: ciertos delitos graves, fraude migratorio o falsas declaraciones de ciudadanía pueden crear inadmisibilidades adicionales no cubiertas por este perdón.',
          'No salgas sin asesoría legal: abandonar Estados Unidos sin tener el perdón aprobado activa el castigo inmediatamente. Nunca salgas del país sin consultar con un abogado de inmigración.',
          'Cada caso requiere evaluación individual: lo que funcionó para otra persona puede no funcionar para tu caso. Las circunstancias personales, el historial migratorio y la evidencia disponible son diferentes para cada familia.'
        ],
        note: 'El proceso del I-601A requiere estrategia, documentación exhaustiva y asesoría legal profesional. No es recomendable intentarlo sin la guía de un abogado experimentado en estos casos.'
      },
      conclusion: {
        title: 'Conclusión',
        text: 'El primer paso para arreglar papeles cuando se entró sin inspección casi siempre comienza con el matrimonio con un ciudadano y la petición I-130. Pero el paso más importante, el que realmente determina si la familia permanecerá unida, es el Perdón I-601A. Sin él, salir del país para la entrevista consular podría significar una separación de 10 años o más.',
        advice: 'No tomes la decisión de salir de Estados Unidos sin antes consultar con un abogado de inmigración que pueda evaluar tu caso, determinar si calificas para el I-601A y preparar la evidencia necesaria. Tu familia merece un proceso bien planificado, no una apuesta a ciegas.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'USCIS – Form I-601A, Provisional Unlawful Presence Waiver',
          'INA § 212(a)(9)(B)(i) – Inadmissibility for Unlawful Presence',
          'USCIS Policy Manual – Volume 9, Part B: Waivers of Inadmissibility',
          'American Immigration Lawyers Association (AILA) – I-601A Practice Guide',
          'Department of State – Immigrant Visa Process'
        ]
      }
    }
  },
  en: {
    metaTitle: 'I-601A Waiver: How to Fix Papers After Illegal Entry',
    metaDesc: 'Entered without inspection and married a U.S. citizen? Learn how the I-601A Waiver helps obtain residency while avoiding the 10-year bar.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '11 min read',
      tags: 'Immigration Process',
      date: 'Mar 20, 2025',
      time: '11 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'I Married a Citizen but Entered Illegally: The I-601A Waiver Explained',
    summary: {
      title: 'Initial Summary',
      text: 'Marrying a U.S. citizen does not automatically grant residency when the entry was without inspection. In these cases, the law triggers a <strong>3 or 10-year bar</strong> outside the United States before the person can legally return. The <strong>I-601A Waiver</strong> (Provisional Unlawful Presence Waiver) is the legal bridge that could allow many families to avoid that prolonged separation and complete the consular process more safely.'
    },
    intro: [
      '<strong>Love knows no borders, but immigration law does.</strong> Thousands of people who crossed without inspection and later formed a family with a U.S. citizen face a difficult reality: marriage alone does not fix their immigration status.',
      'Many discover, sometimes years after getting married, that they cannot simply "adjust status" within the country. The law requires them to leave the United States to process their immigrant visa through the consulate, but upon departure, a penalty known as the <strong>3 or 10-year bar</strong> is triggered, preventing them from legally returning during that time.',
      'The I-601A Waiver was created precisely to solve this legal trap. It allows the person to apply for a provisional waiver <strong>before leaving</strong> the country, so they can attend their consular appointment with confidence that they will be able to return home to their family. In this article, we explain how it works, who qualifies, and what to expect from the process step by step.'
    ],
    sections: {
      whatIsI601A: {
        title: 'What Is the I-601A Waiver?',
        quote: 'The I-601A is not a pardon for committing a crime. It is a waiver for the time you were present without authorization.',
        text: 'Form I-601A, officially known as the "Provisional Unlawful Presence Waiver," is an application filed with USCIS that allows the forgiveness of accumulated unlawful presence in the United States. This waiver specifically covers inadmissibility caused under section 212(a)(9)(B)(i) of the Immigration and Nationality Act (INA).',
        points: [
          'It covers only unlawful presence, not other grounds of inadmissibility.',
          'It is filed while the person is still physically present in the United States.',
          'It prevents the person from having to wait 3 or 10 years outside the country after the consular interview.',
          'It requires demonstrating that a qualifying relative would suffer "extreme hardship" if the waiver is not granted.',
          'It is not an automatic benefit: USCIS evaluates each case individually.'
        ],
        note: 'The I-601A does not grant legal status or work authorization by itself. It is one step within a longer process that culminates with the immigrant visa granted at the consulate.'
      },
      entryWithoutInspection: {
        title: 'The Obstacle of Entry Without Inspection',
        subtitle: 'Why marriage alone is not enough to fix status',
        text: 'When a person enters the United States without passing through an official port of entry, whether crossing the desert, the river, or any other unauthorized route, the law considers that person to have entered "without inspection" (entry without inspection or EWI). This distinction is fundamental because it determines what immigration options the person has going forward.',
        obstacles: [
          'Cannot adjust status within the United States, even if married to a U.S. citizen.',
          'Must leave the country and process the immigrant visa through the consular process.',
          'Upon departure, if they accumulated more than 180 days of unlawful presence, the 3-year bar (for more than 180 days but less than one year) or 10-year bar (for more than one year) is triggered.',
          'While the bar is active, the person cannot obtain a visa or return legally.',
          'Without the I-601A Waiver, the person is separated from their family for years.'
        ],
        text2: 'This is the "vicious cycle" that many families face: the law requires them to leave in order to process, but leaving triggers a bar that prevents them from returning. The I-601A breaks this cycle by waiving the unlawful presence before the person departs the country.'
      },
      extremeHardship: {
        title: 'The "Extreme Hardship" Requirement',
        subtitle: 'The key piece of the entire case',
        text: 'For USCIS to approve the I-601A Waiver, the applicant must demonstrate that their qualifying relative (spouse or parent who is a U.S. citizen or lawful permanent resident) would suffer "extreme hardship" if the waiver were denied and the person could not return to the United States. This is the most important standard in the case and is analyzed under multiple factors:',
        factors: [
          'Health conditions of the qualifying relative: chronic illnesses, mental health conditions, need for specialized treatments not available in the other country.',
          'Financial impact: if the relative financially depends on the applicant, job loss, inability to pay mortgage, medical debts, or educational expenses.',
          'Impact on children: although U.S. citizen children are not "qualifying relatives" by themselves, their well-being is considered as part of the hardship suffered by the qualifying parent.',
          'Country conditions in the home country: insecurity, lack of medical services, economic or political instability that would affect the relative if they had to relocate.',
          'Community and family ties: time lived in the U.S., support networks, children\'s school integration, caretaking responsibilities for elderly family members.',
          'Emotional and psychological impact: documented by mental health professionals, especially when there is a history of depression, anxiety, or trauma.'
        ],
        note: 'The hardship must be "extreme," not simply the normal sadness or inconvenience of a family separation. USCIS requires concrete, documented evidence. A well-prepared case includes personal letters, medical reports, financial statements, and expert opinions.'
      },
      whoCanApply: {
        title: 'Who Can Apply for the I-601A Waiver?',
        subtitle: 'Eligibility requirements',
        text: 'Not everyone who entered without inspection qualifies for this waiver. USCIS has established specific criteria that must be met in order to file Form I-601A:',
        requirements: [
          'Be 17 years of age or older at the time of filing.',
          'Be physically present in the United States at the time of filing.',
          'Have an active immigrant visa case with the National Visa Center (NVC) or an approved Form I-130.',
          'Be inadmissible only for unlawful presence under section 212(a)(9)(B)(i) of the INA.',
          'Have a qualifying relative (spouse or parent) who is a U.S. citizen or lawful permanent resident.',
          'Demonstrate that the qualifying relative would suffer extreme hardship if the waiver is not granted.',
          'Not have other grounds of inadmissibility not covered by the I-601A (such as certain serious criminal records or immigration fraud).'
        ],
        note: 'If the person has other grounds of inadmissibility beyond unlawful presence, they may need additional waivers. An attorney can assess whether the I-601A is sufficient or whether a broader strategy is required.'
      },
      stepByStep: {
        title: 'The Step-by-Step Process',
        subtitle: 'From the family petition to the legal return',
        text: 'The I-601A Waiver is not a standalone application. It is part of a longer process that begins with the family petition and culminates with obtaining the immigrant visa at the consulate. These are the typical steps:',
        steps: [
          'I-130 Petition: The citizen or resident files the family petition with USCIS. This is the foundation of the entire process and must be approved.',
          'NVC Processing: Once the I-130 is approved, the case moves to the National Visa Center, where fees are paid and initial documents are submitted.',
          'I-601A Filing: While the case is with the NVC (and before the consular interview), Form I-601A is filed with USCIS along with all the extreme hardship evidence.',
          'Waiting for Approval: USCIS reviews the case. Processing times vary but can take several months. During this time, the person remains in the United States.',
          'Approval and Consular Scheduling: If the I-601A is approved, the NVC schedules the interview at the consulate in the home country.',
          'Departure and Consular Interview: The person travels to their home country for the interview. Since the waiver is already approved, the unlawful presence bar has already been waived.',
          'Legal Return: If the consular interview is successful and the immigrant visa is granted, the person returns to the United States as a lawful permanent resident.'
        ],
        note: 'The entire process can take between 1 and 3 years depending on USCIS and NVC processing times. Patience and preparation are essential.'
      },
      hypothetical: {
        title: 'Hypothetical Example: Carlos and Elena',
        scenario: 'Carlos arrived in the United States 12 years ago by crossing the border without inspection. Shortly after, he met Elena, a U.S. citizen, and they got married. Together they have two children born in the U.S. Elena suffers from a chronic back condition that requires constant physical therapy and limits her ability to work full-time. Carlos is the primary breadwinner of the family.',
        analysis: 'Without the I-601A Waiver, Carlos would have to leave the United States for his consular interview, automatically triggering the 10-year bar. Elena would be left alone with two young children, without the primary income, and with a medical condition that makes it difficult to work. The children would lose the stability of their home, their school, and the daily presence of their father. Carlos\'s attorney documented the financial impact (tax returns, bank statements, employer letter), Elena\'s medical condition (medical reports, specialist letter), the emotional impact (Elena\'s psychological evaluation and letters from the children\'s teachers), and the home country conditions that would make it impossible for the family to relocate.',
        result: 'With this evidence, the I-601A was approved. Carlos traveled to his home country for the consular interview and returned legally as a permanent resident within a few weeks.',
        note: 'This is a hypothetical example for educational purposes. Each case is unique and outcomes depend on individual circumstances and the evidence presented.'
      },
      clarifications: {
        title: 'Important Clarifications',
        subtitle: 'What you need to know before starting',
        text: 'The I-601A Waiver is a powerful tool, but it is not a magic solution. It is essential to understand its limitations and risks:',
        warnings: [
          'It is not a work permit: the I-601A does not grant employment authorization or temporary legal status. The person remains without status until the entire consular process is completed.',
          'There is a risk of denial: if USCIS determines that extreme hardship was not sufficiently demonstrated, the waiver may be denied. However, it can be appealed or refiled with stronger evidence.',
          'Permanent bar for multiple illegal entries: if a person was deported and re-entered illegally, they could face a permanent 10 or 20-year bar that the I-601A does not cover.',
          'Criminal records can disqualify: certain serious crimes, immigration fraud, or false claims to U.S. citizenship can create additional inadmissibilities not covered by this waiver.',
          'Do not leave without legal counsel: departing the United States without having the waiver approved immediately triggers the bar. Never leave the country without consulting an immigration attorney.',
          'Each case requires individual evaluation: what worked for someone else may not work for your case. Personal circumstances, immigration history, and available evidence are different for each family.'
        ],
        note: 'The I-601A process requires strategy, exhaustive documentation, and professional legal counsel. It is not advisable to attempt it without the guidance of an attorney experienced in these cases.'
      },
      conclusion: {
        title: 'Conclusion',
        text: 'The first step to fixing papers when entry was without inspection almost always begins with marriage to a citizen and the I-130 petition. But the most important step, the one that truly determines whether the family will stay together, is the I-601A Waiver. Without it, leaving the country for the consular interview could mean a separation of 10 years or more.',
        advice: 'Do not make the decision to leave the United States without first consulting with an immigration attorney who can evaluate your case, determine if you qualify for the I-601A, and prepare the necessary evidence. Your family deserves a well-planned process, not a blind gamble.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'USCIS – Form I-601A, Provisional Unlawful Presence Waiver',
          'INA § 212(a)(9)(B)(i) – Inadmissibility for Unlawful Presence',
          'USCIS Policy Manual – Volume 9, Part B: Waivers of Inadmissibility',
          'American Immigration Lawyers Association (AILA) – I-601A Practice Guide',
          'Department of State – Immigrant Visa Process'
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
      url: `${SITE_URL}/${lang}/blog/perdon-i601a-arreglar-papeles-entrada-ilegal`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
      type: 'article',
      publishedTime: '2025-03-20T08:00:00.000Z',
      authors: ['Manuel Solís'],
      section: 'Inmigración',
      tags: ['Perdón I-601A','Castigo 10 años','Entrada sin inspección','Residencia por matrimonio','Proceso consular','Sufrimiento extremo'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.metaDesc,
      images: [imageUrl],
      creator: '@AbogadoMSolis',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/perdon-i601a-arreglar-papeles-entrada-ilegal`,
      languages: {
        'es': `${SITE_URL}/es/blog/perdon-i601a-arreglar-papeles-entrada-ilegal`,
        'en': `${SITE_URL}/en/blog/perdon-i601a-arreglar-papeles-entrada-ilegal`,
        'x-default': `${SITE_URL}/es/blog/perdon-i601a-arreglar-papeles-entrada-ilegal`,
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
    { name: t.title, url: `/${lang}/blog/perdon-i601a-arreglar-papeles-entrada-ilegal` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="perdon-i601a-arreglar-papeles-entrada-ilegal"
        date="2025-03-20"
        image={IMAGES.article}
        lang={lang as string}
        readTime="11"
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <BlogTracker
        title={t.title}
        author="Manuel Solís"
        category="Inmigración"
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
                  <p className="text-white font-bold text-lg">Abogado Manuel Solís</p>
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
                     alt="Perdón I-601A arreglar papeles entrada ilegal"
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

                  {/* Introducción */}
                  <section>
                    {t.intro.map((paragraph, idx) => (
                      <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} className="mb-6" />
                    ))}
                  </section>

                  {/* Sección 1: ¿Qué es el Perdón I-601A? */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><FileText size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whatIsI601A.title}
                    </h2>
                    <p className="text-xl text-white italic mb-6 border-l-4 border-[#B2904D] pl-6 py-2">
                      {t.sections.whatIsI601A.quote}
                    </p>
                    <p className="mb-4">{t.sections.whatIsI601A.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.whatIsI601A.points.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.whatIsI601A.note}
                    </div>
                  </section>

                  {/* Sección 2: Entrada sin inspección */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Ban size={24} className="text-[#B2904D]" /></div>
                      {t.sections.entryWithoutInspection.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.entryWithoutInspection.subtitle}</p>
                    <p className="mb-4">{t.sections.entryWithoutInspection.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.entryWithoutInspection.obstacles.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p>{t.sections.entryWithoutInspection.text2}</p>
                  </section>

                  {/* Imagen interior 1 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside1}
                       alt="Proceso consular perdón I-601A"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 3: Sufrimiento extremo */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Heart size={24} className="text-[#B2904D]" /></div>
                      {t.sections.extremeHardship.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.extremeHardship.subtitle}</p>
                    <p className="mb-4">{t.sections.extremeHardship.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.extremeHardship.factors.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.extremeHardship.note}
                    </div>
                  </section>

                  {/* Sección 4: ¿Quién puede solicitar? */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Users size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whoCanApply.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.whoCanApply.subtitle}</p>
                    <p className="mb-4">{t.sections.whoCanApply.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.whoCanApply.requirements.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.whoCanApply.note}
                    </div>
                  </section>

                  {/* Sección 5: Paso a paso */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Scale size={24} className="text-[#B2904D]" /></div>
                      {t.sections.stepByStep.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.stepByStep.subtitle}</p>
                    <p className="mb-4">{t.sections.stepByStep.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.stepByStep.steps.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#B2904D] text-[#001540] font-bold text-sm shrink-0 mt-1">
                            {i + 1}
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.stepByStep.note}
                    </div>
                  </section>

                  {/* Imagen interior 2 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside2}
                       alt="Familia reunida tras perdón I-601A"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 6: Ejemplo hipotético */}
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

                       <p className="mb-6 font-medium text-white">
                         {t.sections.hypothetical.result}
                       </p>

                       <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                         <AlertCircle size={16} className="inline mr-2" />
                         {t.sections.hypothetical.note}
                       </div>
                    </div>
                  </section>

                  {/* Sección 7: Aclaraciones importantes */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><AlertTriangle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.clarifications.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.clarifications.subtitle}</p>
                    <p className="mb-4">{t.sections.clarifications.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.clarifications.warnings.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.clarifications.note}
                    </div>
                  </section>

                  {/* Conclusión CTA */}
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
                       <h4 className="text-xl font-bold text-white">Manuel Solís</h4>
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
            articles={getRelatedArticles('perdon-i601a-arreglar-papeles-entrada-ilegal', (lang as 'es' | 'en') || 'es')}
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
