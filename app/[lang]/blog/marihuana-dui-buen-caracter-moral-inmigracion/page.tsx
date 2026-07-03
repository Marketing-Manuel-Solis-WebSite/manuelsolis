import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle,
  Lightbulb, Quote, TrendingUp, Award, Heart, Star, MessageCircle,
  Send, ArrowUpRight, ShieldCheck, FileText, User, Gavel, Search, Building2,
  AlertTriangle, Users, Scale, BookOpen, Ban
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
  article: '/blog/blog_17/BLOG07_CR1.png',
  inside1: '/blog/blog_17/BLOG07_CR2.png',
  inside2: '/blog/blog_17/BLOG07_CR2.png',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Marihuana, DUI y buen carácter moral en inmigración',
    metaDesc: '¿Marihuana legal o DUI? Descubre cómo estas situaciones podrían afectar tu Green Card o ciudadanía aunque sean legales en tu estado.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '10 min de lectura',
      tags: 'Procesos Migratorios',
      date: '24 Mar, 2026',
      time: '10 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'Legal en mi estado, delito para Inmigración: marihuana, DUI y buen carácter moral',
    summary: {
      title: 'Resumen inicial',
      text: 'La legalización de la marihuana en varios estados ha generado una falsa sensación de seguridad entre personas en proceso migratorio. Un DUI, aunque sea un cargo menor en tu estado, también podría tener consecuencias serias ante inmigración. En este artículo explicamos por qué la <strong>ley federal sigue clasificando la marihuana como sustancia controlada</strong>, cómo un DUI podría afectar tu <strong>buen carácter moral</strong> y qué riesgos reales enfrentas si estás buscando una Green Card, ciudadanía o la renovación de programas como DACA o TPS.'
    },
    intro: [
      '<strong>"Es legal en mi estado, ¿cómo me puede afectar?"</strong>. Esta es una de las preguntas más frecuentes y peligrosas que escuchamos en la práctica migratoria. La respuesta corta: lo que es legal bajo la ley estatal no necesariamente lo es bajo la ley federal, y la ley de inmigración es federal.',
      'Cada año, miles de personas en proceso migratorio ponen en riesgo su futuro sin saberlo. Un uso recreativo de marihuana, un cargo de DUI que parecía menor o incluso una simple admisión de consumo durante un examen médico podrían generar consecuencias devastadoras para su caso.',
      'Entender cómo funciona el conflicto entre ley estatal y ley federal, y cómo el concepto de <strong>buen carácter moral</strong> se evalúa en inmigración, podría ser la diferencia entre avanzar en tu proceso o perder una oportunidad que tardaste años en construir.'
    ],
    sections: {
      stateVsFederal: {
        title: 'El choque entre la ley estatal y la ley federal',
        subtitle: 'Dos sistemas que no siempre coinciden',
        text: 'En Estados Unidos existen dos niveles de legislación que pueden contradecirse directamente. Mientras estados como California, Colorado, Illinois y muchos otros han legalizado el uso recreativo o medicinal de la marihuana, la ley federal sigue clasificándola como una sustancia controlada del Schedule I, en la misma categoría que la heroína o el LSD.',
        points: [
          'La Ley de Sustancias Controladas (Controlled Substances Act) a nivel federal no reconoce excepciones estatales.',
          'USCIS, CBP e ICE operan bajo la ley federal, no bajo leyes estatales.',
          'Comprar marihuana legalmente en una dispensaria de tu estado no te protege ante inmigración.',
          'La posesión, uso, admisión de uso o participación en la industria del cannabis podría considerarse una violación de la ley federal.'
        ],
        note: 'En inmigración, la ley federal siempre prevalece. Lo que tu estado permita no cambia la evaluación que hará un oficial migratorio.'
      },
      marijuanaImmigration: {
        title: 'Marihuana e inmigración: el peligro va más allá del arresto',
        subtitle: 'No necesitas ser arrestado para tener problemas',
        text: 'Muchas personas creen que mientras no tengan un arresto o una condena por marihuana, están a salvo. Esto es un error peligroso. En inmigración, la simple admisión de haber consumido marihuana podría ser suficiente para crear un problema serio.',
        situations: [
          'Admitir uso de marihuana en una entrevista de USCIS, incluso si fue legal en tu estado.',
          'Responder afirmativamente a preguntas sobre uso de drogas en formularios migratorios como el I-485.',
          'Que el médico registre uso de marihuana durante el examen médico de inmigración (I-693).',
          'Tener publicaciones en redes sociales que muestren consumo de cannabis.',
          'Poseer una tarjeta de marihuana medicinal, lo cual es evidencia directa de uso.'
        ],
        consequences: [
          'Inadmisibilidad bajo la sección 212(a)(2) del INA por violación de ley de sustancias controladas.',
          'Negación de la solicitud de ajuste de estatus o naturalización.',
          'Determinación negativa de buen carácter moral.',
          'En ciertos casos, inicio de procedimientos de remoción.'
        ],
        note: 'No necesitas una condena penal. La admisión de uso, bajo las circunstancias correctas, podría ser suficiente para que USCIS niegue tu caso.'
      },
      cannabisIndustry: {
        title: 'Trabajar en la industria del cannabis: un riesgo que pocos conocen',
        subtitle: 'Ingresos legales en tu estado, problemáticos para inmigración',
        text: 'Con la legalización estatal, muchas personas han encontrado empleo en dispensarias, cultivos, distribución o procesamiento de cannabis. Aunque estos empleos sean completamente legales bajo la ley de tu estado, la ley federal los considera participación en actividades relacionadas con sustancias controladas.',
        risks: [
          'Trabajar en una dispensaria o empresa de cannabis, incluso en un puesto administrativo.',
          'Reportar ingresos provenientes de la industria del cannabis en declaraciones de impuestos.',
          'Ser propietario o socio de un negocio relacionado con marihuana.',
          'Invertir en empresas del sector de cannabis.'
        ],
        text2: 'USCIS podría considerar que obtener ingresos de la industria del cannabis constituye participación en una actividad ilícita federal, lo que podría afectar directamente la evaluación de buen carácter moral y, en consecuencia, cualquier solicitud migratoria en trámite.',
        note: 'Incluso si nunca has consumido marihuana, trabajar en esta industria podría crear un obstáculo en tu caso migratorio.'
      },
      medicalExam: {
        title: 'La trampa del examen médico de inmigración',
        subtitle: 'Preguntas directas, documentos firmados, información enviada a inmigración',
        text: 'El examen médico de inmigración (formulario I-693) es uno de los puntos más delicados del proceso. Durante este examen, el médico designado por USCIS (cirujano civil) está obligado a hacer preguntas sobre el uso de sustancias, incluyendo marihuana.',
        steps: [
          'El médico preguntará directamente si has usado marihuana u otras sustancias.',
          'Si respondes afirmativamente, esto queda documentado en el formulario I-693.',
          'El médico podría solicitar pruebas adicionales de orina o sangre.',
          'El documento firmado se envía directamente a USCIS como parte de tu expediente.',
          'USCIS podría usar esta información como base para determinar inadmisibilidad.'
        ],
        warning: 'Mentir en el examen médico no es una solución. Si USCIS descubre inconsistencias entre tus respuestas y otra evidencia (redes sociales, registros médicos, tarjeta de marihuana medicinal), las consecuencias podrían ser aún peores: una determinación de fraude o tergiversación material.',
        note: 'El examen médico no es una formalidad. Es un punto de evaluación donde muchas personas pierden su caso sin darse cuenta.'
      },
      duiMoralCharacter: {
        title: 'DUI y buen carácter moral: no todos los DUI tienen el mismo impacto',
        subtitle: 'Los factores que importan en la evaluación migratoria',
        text: 'Un cargo de DUI (Driving Under the Influence) podría parecer algo menor en el sistema penal estatal, pero en inmigración su impacto podría ser significativo. USCIS evalúa los DUI como parte de la determinación de buen carácter moral, especialmente en solicitudes de naturalización, ajuste de estatus y renovación de programas.',
        factors: [
          'Número de DUI: un solo incidente podría evaluarse diferente a múltiples cargos.',
          'Circunstancias agravantes: accidentes, lesiones a terceros, menores en el vehículo.',
          'Nivel de alcohol registrado: valores extremadamente altos podrían indicar un problema mayor.',
          'Tiempo transcurrido: un DUI de hace 10 años se evalúa diferente a uno reciente.',
          'Si el DUI involucró drogas además de alcohol.',
          'Si hubo una condena, un acuerdo de culpabilidad o si el caso fue desestimado.'
        ],
        aggravating: [
          'Un DUI combinado con posesión de sustancias controladas.',
          'Un DUI con resultado de lesiones corporales o muerte.',
          'Múltiples DUI dentro del período de buen carácter moral (generalmente 3 a 5 años).',
          'Un DUI estando en libertad condicional o con una orden de supervisión.'
        ],
        note: 'Un solo DUI no necesariamente destruye tu caso, pero su impacto depende del contexto completo. Cada detalle importa en la evaluación migratoria.'
      },
      duiDACA: {
        title: 'DUI y programas como DACA y TPS',
        subtitle: 'Efectos en renovación y prioridad de enforcement',
        text: 'Para beneficiarios de DACA (Acción Diferida para los Llegados en la Infancia) y TPS (Estatus de Protección Temporal), un DUI podría tener implicaciones particularmente graves.',
        dacaEffects: [
          'Un DUI con condena podría considerarse un "significant misdemeanor" bajo los lineamientos de DACA.',
          'Un significant misdemeanor podría resultar en la negación de la renovación de DACA.',
          'Un DUI podría convertir a la persona en prioridad de enforcement, haciendo más probable una acción de ICE.',
          'Múltiples infracciones de tráfico combinadas con un DUI podrían crear un patrón negativo.'
        ],
        tpsEffects: [
          'Un DUI con condena podría afectar la renovación de TPS.',
          'USCIS podría considerar que el DUI refleja falta de buen carácter moral.',
          'Un DUI con circunstancias agravantes podría resultar en la terminación del TPS.',
          'La persona podría quedar en procedimientos de remoción si pierde el estatus.'
        ],
        note: 'Si tienes DACA o TPS y recibes un DUI, es fundamental consultar con un abogado de inmigración antes de renovar o tomar cualquier acción ante USCIS.'
      },
      moralCharacterConcept: {
        title: 'El concepto de buen carácter moral: no solo se trata de delitos graves',
        subtitle: 'Patrones de conducta y evaluación integral',
        text: 'El buen carácter moral (Good Moral Character o GMC) es un estándar legal que USCIS utiliza para evaluar múltiples solicitudes migratorias. Aunque muchas personas asumen que solo los delitos graves afectan este estándar, la realidad es más compleja.',
        evaluates: [
          'Historial de arrestos y condenas, incluso por delitos menores.',
          'Admisiones de conductas que constituirían delitos bajo ley federal.',
          'Cumplimiento de obligaciones tributarias.',
          'Historial de sustento a dependientes y pensiones alimenticias.',
          'Registros de conducta durante el período evaluado.',
          'Patrones de comportamiento que demuestren respeto por la ley.'
        ],
        patterns: [
          'Un DUI seguido de uso admitido de marihuana podría crear un patrón de falta de respeto a la ley.',
          'Múltiples infracciones menores combinadas podrían tener un impacto acumulativo.',
          'Una admisión de uso de sustancias controladas podría reabrir la evaluación de incidentes pasados.',
          'El contexto importa: acciones correctivas, programas completados y tiempo sin incidentes también se consideran.'
        ],
        note: 'USCIS no solo mira incidentes aislados. Evalúa el panorama completo de la conducta de una persona durante el período requerido.'
      },
      hypothetical: {
        title: 'Ejemplo hipotético',
        scenario: 'Imagina a una persona con residencia legal en un estado donde la marihuana es completamente legal. Consume de manera ocasional, nunca ha sido arrestada y lleva más de 10 años como residente permanente. Decide aplicar para la ciudadanía. Durante el examen médico de inmigración, el médico le pregunta si ha usado marihuana y responde con honestidad: "Sí, de vez en cuando, es legal aquí."',
        analysis: 'Esa admisión queda registrada en el formulario I-693. Cuando USCIS revisa el expediente, podría determinar que la persona admitió el uso de una sustancia controlada federal. Esto podría resultar en la negación de la solicitud de naturalización por falta de buen carácter moral. En el peor de los escenarios, podría incluso generar un Notice to Appear (NTA) y procedimientos de remoción, poniendo en riesgo la propia residencia permanente.',
        note: 'Este tipo de situaciones ocurren con más frecuencia de lo que se cree. La honestidad sin asesoría legal previa podría convertirse en un problema.'
      },
      whatToLearn: {
        title: 'Qué aprender de todo esto',
        subtitle: 'Informarse antes de actuar es la mejor protección',
        text: 'La intersección entre ley estatal, ley federal e inmigración crea zonas grises que pueden convertirse en trampas para personas que desconocen los riesgos. La clave es informarse antes de llenar formularios, asistir a entrevistas o acudir al examen médico.',
        lessons: [
          'No asumir que lo legal en tu estado es seguro para tu caso migratorio.',
          'No admitir uso de sustancias sin antes consultar con un abogado de inmigración.',
          'Entender que un DUI, aunque parezca menor, podría tener consecuencias reales en tu proceso.',
          'Prepararse para el examen médico con anticipación y con asesoría legal.',
          'Si trabajas en la industria del cannabis, evaluar los riesgos antes de aplicar a cualquier beneficio migratorio.',
          'Conocer tu propio récord antes de iniciar cualquier trámite.'
        ],
        note: 'La prevención y la información son las herramientas más valiosas en un caso migratorio. Un error de desconocimiento podría tener el mismo impacto que un error intencional.'
      },
      conclusion: {
        title: 'Conclusión',
        text: 'Que algo sea legal en tu estado no significa que sea seguro para tu caso de inmigración. La marihuana sigue siendo una sustancia controlada bajo la ley federal, y un DUI puede tener consecuencias que van mucho más allá de una multa o un programa de rehabilitación. El concepto de buen carácter moral es amplio y USCIS tiene discreción para evaluar conductas que podrían parecer inofensivas en el contexto estatal.',
        advice: 'Antes de llenar un formulario, antes de asistir a una entrevista, antes de acudir al examen médico: infórmate, conoce tus riesgos y protege las oportunidades que has construido con años de esfuerzo.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'INA § 212(a)(2)(A) – Inadmisibilidad por sustancias controladas',
          'USCIS Policy Manual, Vol. 12, Part F – Good Moral Character',
          'Controlled Substances Act, 21 U.S.C. § 812 – Schedule I',
          'USCIS Policy Alert PA-2019-01 – Marijuana and Immigration',
          'American Immigration Lawyers Association – DUI and Immigration Consequences'
        ]
      }
    }
  },
  en: {
    metaTitle: 'Marijuana, DUI and Good Moral Character in Immigration',
    metaDesc: 'Legal marijuana or DUI? Discover how these situations could affect your Green Card or citizenship even if they\'re legal in your state.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '10 min read',
      tags: 'Immigration Process',
      date: 'Mar 24, 2026',
      time: '10 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'Legal in My State, a Crime for Immigration: Marijuana, DUI and Good Moral Character',
    summary: {
      title: 'Initial Summary',
      text: 'The legalization of marijuana in several states has created a false sense of security among people in immigration processes. A DUI, even if it is a minor charge in your state, could also have serious consequences with immigration. In this article we explain why <strong>federal law still classifies marijuana as a controlled substance</strong>, how a DUI could affect your <strong>good moral character</strong>, and what real risks you face if you are seeking a Green Card, citizenship, or the renewal of programs like DACA or TPS.'
    },
    intro: [
      '<strong>"It\'s legal in my state, how can it affect me?"</strong> This is one of the most frequent and dangerous questions we hear in immigration practice. The short answer: what is legal under state law is not necessarily legal under federal law, and immigration law is federal.',
      'Every year, thousands of people in immigration processes put their future at risk without knowing it. Recreational marijuana use, a DUI charge that seemed minor, or even a simple admission of use during a medical exam could generate devastating consequences for their case.',
      'Understanding how the conflict between state law and federal law works, and how the concept of <strong>good moral character</strong> is evaluated in immigration, could be the difference between moving forward in your process or losing an opportunity you spent years building.'
    ],
    sections: {
      stateVsFederal: {
        title: 'The Clash Between State Law and Federal Law',
        subtitle: 'Two systems that don\'t always agree',
        text: 'In the United States there are two levels of legislation that can directly contradict each other. While states like California, Colorado, Illinois, and many others have legalized recreational or medicinal marijuana use, federal law continues to classify it as a Schedule I controlled substance, in the same category as heroin or LSD.',
        points: [
          'The Controlled Substances Act at the federal level does not recognize state exceptions.',
          'USCIS, CBP, and ICE operate under federal law, not state laws.',
          'Buying marijuana legally at a dispensary in your state does not protect you with immigration.',
          'Possession, use, admission of use, or participation in the cannabis industry could be considered a violation of federal law.'
        ],
        note: 'In immigration, federal law always prevails. What your state allows does not change the evaluation an immigration officer will make.'
      },
      marijuanaImmigration: {
        title: 'Marijuana and Immigration: The Danger Goes Beyond Arrest',
        subtitle: 'You don\'t need to be arrested to have problems',
        text: 'Many people believe that as long as they don\'t have an arrest or conviction for marijuana, they are safe. This is a dangerous mistake. In immigration, the simple admission of having used marijuana could be enough to create a serious problem.',
        situations: [
          'Admitting marijuana use in a USCIS interview, even if it was legal in your state.',
          'Answering affirmatively to questions about drug use on immigration forms like the I-485.',
          'Having the doctor record marijuana use during the immigration medical exam (I-693).',
          'Having social media posts that show cannabis consumption.',
          'Possessing a medical marijuana card, which is direct evidence of use.'
        ],
        consequences: [
          'Inadmissibility under section 212(a)(2) of the INA for controlled substance law violation.',
          'Denial of the adjustment of status or naturalization application.',
          'Negative good moral character determination.',
          'In certain cases, initiation of removal proceedings.'
        ],
        note: 'You don\'t need a criminal conviction. The admission of use, under the right circumstances, could be enough for USCIS to deny your case.'
      },
      cannabisIndustry: {
        title: 'Working in the Cannabis Industry: A Risk Few Know About',
        subtitle: 'Legal income in your state, problematic for immigration',
        text: 'With state legalization, many people have found employment in dispensaries, cultivation, distribution, or cannabis processing. Although these jobs are completely legal under your state\'s law, federal law considers them participation in activities related to controlled substances.',
        risks: [
          'Working at a dispensary or cannabis company, even in an administrative position.',
          'Reporting income from the cannabis industry on tax returns.',
          'Being an owner or partner of a marijuana-related business.',
          'Investing in cannabis sector companies.'
        ],
        text2: 'USCIS could consider that earning income from the cannabis industry constitutes participation in a federal illicit activity, which could directly affect the good moral character evaluation and, consequently, any immigration application in process.',
        note: 'Even if you have never used marijuana, working in this industry could create an obstacle in your immigration case.'
      },
      medicalExam: {
        title: 'The Immigration Medical Exam Trap',
        subtitle: 'Direct questions, signed documents, information sent to immigration',
        text: 'The immigration medical exam (Form I-693) is one of the most delicate points in the process. During this exam, the USCIS-designated physician (civil surgeon) is required to ask questions about substance use, including marijuana.',
        steps: [
          'The doctor will directly ask if you have used marijuana or other substances.',
          'If you answer affirmatively, this is documented on Form I-693.',
          'The doctor may request additional urine or blood tests.',
          'The signed document is sent directly to USCIS as part of your file.',
          'USCIS could use this information as a basis for determining inadmissibility.'
        ],
        warning: 'Lying on the medical exam is not a solution. If USCIS discovers inconsistencies between your answers and other evidence (social media, medical records, medical marijuana card), the consequences could be even worse: a determination of fraud or material misrepresentation.',
        note: 'The medical exam is not a formality. It is an evaluation point where many people lose their case without realizing it.'
      },
      duiMoralCharacter: {
        title: 'DUI and Good Moral Character: Not All DUIs Have the Same Impact',
        subtitle: 'The factors that matter in the immigration evaluation',
        text: 'A DUI (Driving Under the Influence) charge might seem minor in the state criminal system, but in immigration its impact could be significant. USCIS evaluates DUIs as part of the good moral character determination, especially in naturalization applications, adjustment of status, and program renewals.',
        factors: [
          'Number of DUIs: a single incident could be evaluated differently than multiple charges.',
          'Aggravating circumstances: accidents, injuries to third parties, minors in the vehicle.',
          'Recorded alcohol level: extremely high values could indicate a greater problem.',
          'Time elapsed: a DUI from 10 years ago is evaluated differently than a recent one.',
          'Whether the DUI involved drugs in addition to alcohol.',
          'Whether there was a conviction, plea agreement, or whether the case was dismissed.'
        ],
        aggravating: [
          'A DUI combined with possession of controlled substances.',
          'A DUI resulting in bodily injury or death.',
          'Multiple DUIs within the good moral character period (generally 3 to 5 years).',
          'A DUI while on probation or under a supervision order.'
        ],
        note: 'A single DUI does not necessarily destroy your case, but its impact depends on the complete context. Every detail matters in the immigration evaluation.'
      },
      duiDACA: {
        title: 'DUI and Programs Like DACA and TPS',
        subtitle: 'Effects on renewal and enforcement priority',
        text: 'For beneficiaries of DACA (Deferred Action for Childhood Arrivals) and TPS (Temporary Protected Status), a DUI could have particularly serious implications.',
        dacaEffects: [
          'A DUI with a conviction could be considered a "significant misdemeanor" under DACA guidelines.',
          'A significant misdemeanor could result in the denial of DACA renewal.',
          'A DUI could make the person an enforcement priority, making ICE action more likely.',
          'Multiple traffic violations combined with a DUI could create a negative pattern.'
        ],
        tpsEffects: [
          'A DUI with a conviction could affect TPS renewal.',
          'USCIS could consider that the DUI reflects a lack of good moral character.',
          'A DUI with aggravating circumstances could result in TPS termination.',
          'The person could end up in removal proceedings if they lose status.'
        ],
        note: 'If you have DACA or TPS and receive a DUI, it is essential to consult with an immigration attorney before renewing or taking any action with USCIS.'
      },
      moralCharacterConcept: {
        title: 'The Concept of Good Moral Character: It\'s Not Just About Serious Crimes',
        subtitle: 'Behavioral patterns and comprehensive evaluation',
        text: 'Good Moral Character (GMC) is a legal standard that USCIS uses to evaluate multiple immigration applications. Although many people assume that only serious crimes affect this standard, the reality is more complex.',
        evaluates: [
          'History of arrests and convictions, even for minor offenses.',
          'Admissions of conduct that would constitute crimes under federal law.',
          'Compliance with tax obligations.',
          'History of supporting dependents and child support payments.',
          'Conduct records during the evaluated period.',
          'Behavioral patterns demonstrating respect for the law.'
        ],
        patterns: [
          'A DUI followed by admitted marijuana use could create a pattern of disrespect for the law.',
          'Multiple minor infractions combined could have a cumulative impact.',
          'An admission of controlled substance use could reopen the evaluation of past incidents.',
          'Context matters: corrective actions, completed programs, and time without incidents are also considered.'
        ],
        note: 'USCIS doesn\'t just look at isolated incidents. They evaluate the complete picture of a person\'s conduct during the required period.'
      },
      hypothetical: {
        title: 'Hypothetical Example',
        scenario: 'Imagine a person with legal residence in a state where marijuana is completely legal. They use occasionally, have never been arrested, and have been a permanent resident for over 10 years. They decide to apply for citizenship. During the immigration medical exam, the doctor asks if they have used marijuana and they answer honestly: "Yes, from time to time, it\'s legal here."',
        analysis: 'That admission is recorded on Form I-693. When USCIS reviews the file, they could determine that the person admitted to using a federal controlled substance. This could result in the denial of the naturalization application for lack of good moral character. In the worst-case scenario, it could even generate a Notice to Appear (NTA) and removal proceedings, putting the permanent residence itself at risk.',
        note: 'These types of situations occur more frequently than people think. Honesty without prior legal counsel could become a problem.'
      },
      whatToLearn: {
        title: 'What to Learn from All This',
        subtitle: 'Getting informed before acting is the best protection',
        text: 'The intersection between state law, federal law, and immigration creates gray areas that can become traps for people who are unaware of the risks. The key is to get informed before filling out forms, attending interviews, or going to the medical exam.',
        lessons: [
          'Don\'t assume that what is legal in your state is safe for your immigration case.',
          'Don\'t admit substance use without first consulting an immigration attorney.',
          'Understand that a DUI, even if it seems minor, could have real consequences in your process.',
          'Prepare for the medical exam in advance and with legal counsel.',
          'If you work in the cannabis industry, evaluate the risks before applying for any immigration benefit.',
          'Know your own record before starting any process.'
        ],
        note: 'Prevention and information are the most valuable tools in an immigration case. An error from lack of knowledge could have the same impact as an intentional error.'
      },
      conclusion: {
        title: 'Conclusion',
        text: 'That something is legal in your state does not mean it is safe for your immigration case. Marijuana remains a controlled substance under federal law, and a DUI can have consequences that go far beyond a fine or rehabilitation program. The concept of good moral character is broad, and USCIS has discretion to evaluate conduct that might seem harmless in the state context.',
        advice: 'Before filling out a form, before attending an interview, before going to the medical exam: get informed, know your risks, and protect the opportunities you have built with years of effort.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'INA § 212(a)(2)(A) – Inadmissibility for controlled substances',
          'USCIS Policy Manual, Vol. 12, Part F – Good Moral Character',
          'Controlled Substances Act, 21 U.S.C. § 812 – Schedule I',
          'USCIS Policy Alert PA-2019-01 – Marijuana and Immigration',
          'American Immigration Lawyers Association – DUI and Immigration Consequences'
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
    title: { absolute: t.metaTitle },
    description: t.metaDesc,
    openGraph: {
      title: t.title,
      description: t.metaDesc,
      url: `${SITE_URL}/${lang}/blog/marihuana-dui-buen-caracter-moral-inmigracion`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
      type: 'article',
      publishedTime: '2026-03-24T08:00:00.000Z',
      authors: ['Manuel Solís'],
      section: 'Inmigración',
      tags: ['Marihuana inmigración','DUI inmigración','Buen carácter moral','Green Card','Ciudadanía','Ley federal vs estatal'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.metaDesc,
      images: [imageUrl],
      creator: '@AbogadoMSolis',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/marihuana-dui-buen-caracter-moral-inmigracion`,
      languages: {
        'es': `${SITE_URL}/es/blog/marihuana-dui-buen-caracter-moral-inmigracion`,
        'en': `${SITE_URL}/en/blog/marihuana-dui-buen-caracter-moral-inmigracion`,
        'x-default': `${SITE_URL}/es/blog/marihuana-dui-buen-caracter-moral-inmigracion`,
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
    { name: t.title, url: `/${lang}/blog/marihuana-dui-buen-caracter-moral-inmigracion` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="marihuana-dui-buen-caracter-moral-inmigracion"
        date="2026-03-24"
        image={IMAGES.article}
        lang={lang as string}
        readTime="10"
      />
      <script
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
                     alt="Marihuana DUI buen carácter moral inmigración"
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

                  {/* Introducción */}
                  <section>
                    {t.intro.map((paragraph, idx) => (
                      <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} className="mb-6" />
                    ))}
                  </section>

                  {/* Sección 1: Ley estatal vs federal */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Scale size={24} className="text-[#B2904D]" /></div>
                      {t.sections.stateVsFederal.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.stateVsFederal.subtitle}</p>
                    <p className="mb-4">{t.sections.stateVsFederal.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.stateVsFederal.points.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertTriangle size={24} className="text-yellow-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.stateVsFederal.note}
                    </div>
                  </section>

                  {/* Sección 2: Marihuana e inmigración */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Ban size={24} className="text-[#B2904D]" /></div>
                      {t.sections.marijuanaImmigration.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.marijuanaImmigration.subtitle}</p>
                    <p className="mb-4">{t.sections.marijuanaImmigration.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.marijuanaImmigration.situations.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <h3 className="text-xl font-serif text-white mb-4">{lang === 'es' ? 'Posibles consecuencias:' : 'Possible consequences:'}</h3>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.marijuanaImmigration.consequences.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-red-500/5 p-4 rounded-xl border border-red-500/10">
                          <Ban size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.marijuanaImmigration.note}
                    </div>
                  </section>

                  {/* Sección 3: Industria del cannabis */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Building2 size={24} className="text-[#B2904D]" /></div>
                      {t.sections.cannabisIndustry.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.cannabisIndustry.subtitle}</p>
                    <p className="mb-4">{t.sections.cannabisIndustry.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.cannabisIndustry.risks.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertTriangle size={24} className="text-yellow-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mb-4">{t.sections.cannabisIndustry.text2}</p>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.cannabisIndustry.note}
                    </div>
                  </section>

                  {/* Imagen interior 1 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside1}
                       alt="Marihuana ley federal vs estatal inmigración"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 4: Examen médico */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><FileText size={24} className="text-[#B2904D]" /></div>
                      {t.sections.medicalExam.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.medicalExam.subtitle}</p>
                    <p className="mb-4">{t.sections.medicalExam.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.medicalExam.steps.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#B2904D]/20 text-[#B2904D] font-bold text-sm shrink-0">{i + 1}</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-6 bg-red-500/10 rounded-2xl border border-red-500/20 mb-6">
                      <p className="text-red-300 font-medium flex items-start gap-3">
                        <AlertTriangle size={20} className="shrink-0 mt-1" />
                        {t.sections.medicalExam.warning}
                      </p>
                    </div>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.medicalExam.note}
                    </div>
                  </section>

                  {/* Sección 5: DUI y buen carácter moral */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Gavel size={24} className="text-[#B2904D]" /></div>
                      {t.sections.duiMoralCharacter.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.duiMoralCharacter.subtitle}</p>
                    <p className="mb-4">{t.sections.duiMoralCharacter.text}</p>
                    <h3 className="text-xl font-serif text-white mb-4">{lang === 'es' ? 'Factores que se evalúan:' : 'Factors evaluated:'}</h3>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.duiMoralCharacter.factors.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <Search size={24} className="text-[#B2904D] shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <h3 className="text-xl font-serif text-white mb-4">{lang === 'es' ? 'Circunstancias agravantes:' : 'Aggravating circumstances:'}</h3>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.duiMoralCharacter.aggravating.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-red-500/5 p-4 rounded-xl border border-red-500/10">
                          <AlertTriangle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.duiMoralCharacter.note}
                    </div>
                  </section>

                  {/* Sección 6: DUI y DACA/TPS */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><ShieldCheck size={24} className="text-[#B2904D]" /></div>
                      {t.sections.duiDACA.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.duiDACA.subtitle}</p>
                    <p className="mb-4">{t.sections.duiDACA.text}</p>
                    <div className="grid md:grid-cols-2 gap-4 my-8">
                      <div className="p-5 bg-[#000a20] rounded-xl border border-white/10 flex flex-col gap-3 hover:border-[#B2904D]/50 transition-colors">
                        <span className="font-bold text-white text-lg flex items-center gap-2"><Users className="text-[#B2904D]" size={20} /> DACA</span>
                        <ul className="space-y-2 text-sm list-none pl-0 m-0">
                          {t.sections.duiDACA.dacaEffects.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <AlertCircle size={14} className="text-red-400 shrink-0 mt-1" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-5 bg-[#000a20] rounded-xl border border-white/10 flex flex-col gap-3 hover:border-[#B2904D]/50 transition-colors">
                        <span className="font-bold text-white text-lg flex items-center gap-2"><ShieldCheck className="text-[#B2904D]" size={20} /> TPS</span>
                        <ul className="space-y-2 text-sm list-none pl-0 m-0">
                          {t.sections.duiDACA.tpsEffects.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <AlertCircle size={14} className="text-red-400 shrink-0 mt-1" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.duiDACA.note}
                    </div>
                  </section>

                  {/* Imagen interior 2 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside2}
                       alt="DUI buen carácter moral proceso migratorio"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 7: Concepto de buen carácter moral */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><BookOpen size={24} className="text-[#B2904D]" /></div>
                      {t.sections.moralCharacterConcept.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.moralCharacterConcept.subtitle}</p>
                    <p className="mb-4">{t.sections.moralCharacterConcept.text}</p>
                    <h3 className="text-xl font-serif text-white mb-4">{lang === 'es' ? 'USCIS evalúa:' : 'USCIS evaluates:'}</h3>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.moralCharacterConcept.evaluates.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <h3 className="text-xl font-serif text-white mb-4">{lang === 'es' ? 'Patrones que importan:' : 'Patterns that matter:'}</h3>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.moralCharacterConcept.patterns.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <Lightbulb size={24} className="text-yellow-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.moralCharacterConcept.note}
                    </div>
                  </section>

                  {/* Sección 8: Ejemplo hipotético */}
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

                  {/* Sección 9: Qué aprender */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Lightbulb size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whatToLearn.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.whatToLearn.subtitle}</p>
                    <p className="mb-4">{t.sections.whatToLearn.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.whatToLearn.lessons.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.whatToLearn.note}
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
                          <Image src={IMAGES.author} alt="Manuel Solis" fill sizes="96px" className="object-cover" />
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
            articles={getRelatedArticles('marihuana-dui-buen-caracter-moral-inmigracion', (lang as 'es' | 'en') || 'es')}
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
