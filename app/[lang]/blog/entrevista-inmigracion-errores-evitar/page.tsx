import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle,
  Lightbulb, MessageCircle, Send, ArrowUpRight, ShieldCheck, FileText,
  User, AlertTriangle, Users, ClipboardList, Languages, BookOpen,
  ListOrdered, Ban, MapPin, Timer, FileWarning, HelpCircle
} from 'lucide-react';

// IMPORTACIONES
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
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
  article: '/blog/blog_27/B8_CR1.jpg',
  inside1: '/blog/blog_27/B8_CR2.jpg',
  inside2: '/blog/blog_27/B8_CR2.jpg',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Entrevista de inmigración: 10 errores que debes evitar',
    metaDesc: 'Conoce los 10 errores más comunes en entrevistas de inmigración ante USCIS. Aprende cómo prepararte según el tipo de entrevista que enfrentas.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '10 min de lectura',
      tags: 'Entrevista USCIS',
      date: '08 May, 2026',
      time: '10 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'Entrevista de inmigración: 10 errores que debes evitar a toda costa',
    summary: {
      title: 'Resumen inicial',
      text: 'No todas las entrevistas de inmigración son iguales, pero los errores que cometen los solicitantes suelen repetirse. En este artículo analizamos los <strong>10 errores más comunes</strong> que pueden poner en riesgo tu caso ante USCIS, desde no releer tu solicitud hasta ignorar las reglas del intérprete. Saber qué evitar es tan importante como saber qué decir.'
    },
    intro: [
      'La entrevista de inmigración es probablemente el momento más importante de tu proceso migratorio. Es la oportunidad que tiene el oficial de USCIS para verificar lo que presentaste por escrito, hacerte preguntas directas y decidir si tu caso merece ser aprobado.',
      'Lo que muchas personas no entienden es que no existe una sola entrevista de inmigración. Hay entrevistas para ajuste de estatus por matrimonio, para naturalización, para asilo, para visa de inmigrante en el consulado y para otros beneficios. Cada una tiene reglas distintas, pero hay errores que son <strong>universales</strong> y que se repiten en todos los contextos.',
      'Lo más preocupante es que muchos de estos errores son totalmente evitables con preparación. No se trata de vestirse formalmente o memorizar respuestas, sino de entender qué espera el oficial, qué documentos necesitas y cómo manejar las preguntas difíciles sin contradecirte ni inventar información.'
    ],
    sections: {
      notAllSame: {
        title: 'No existe una sola entrevista de inmigración',
        subtitle: 'Cada tipo de caso tiene su propio formato',
        text: 'Uno de los primeros errores es asumir que todas las entrevistas son iguales. El formato, las preguntas y lo que el oficial evalúa depende completamente del tipo de beneficio que estás solicitando. Entender qué tipo de entrevista enfrentas es el primer paso para prepararte correctamente.',
        list: [
          'Entrevista de ajuste de estatus por matrimonio (I-485): el oficial evalúa si el matrimonio es genuino y si cumples los requisitos de elegibilidad.',
          'Entrevista de naturalización (N-400): incluye un examen de inglés y civismo, y preguntas sobre tu historial y buen carácter moral.',
          'Entrevista consular (DS-260): se realiza en el consulado de tu país y el oficial evalúa admisibilidad, relación familiar y documentación.',
          'Entrevista de asilo afirmativo: se realiza ante un oficial de asilo que evalúa la credibilidad de tu miedo de persecución.',
          'Entrevista individual de corte (asilo defensivo): ocurre ante un juez de inmigración como parte de un proceso de remoción.',
          'Entrevista Stokes: entrevista separada para parejas cuando hay sospechas de fraude matrimonial.'
        ],
        note: 'No puedes prepararte bien si no sabes qué tipo de entrevista enfrentas. Cada formato tiene reglas específicas sobre quién puede acompañarte, qué documentos piden y cómo se evalúa tu caso.'
      },
      error1: {
        title: 'Error 1: Ir sin releer lo que ya enviaste',
        text: 'Este es quizás el error más común y más peligroso. Muchas personas presentan su solicitud meses o incluso años antes de la entrevista, y cuando llega el momento, no recuerdan exactamente qué dijeron en los formularios. El oficial de USCIS tiene una copia de todo lo que enviaste y comparará tus respuestas orales con lo escrito.',
        list: [
          'Si en tu formulario dijiste que entraste al país en 2015 y en la entrevista dices 2016, eso genera una inconsistencia.',
          'Si declaraste que no tenías arrestos pero olvidas mencionar un incidente antiguo, el oficial puede interpretarlo como mentira.',
          'Los formularios I-485, N-400, I-589 y DS-260 son extensos. Es normal no recordar cada detalle sin repasarlos.',
          'Tu abogado debería repasar contigo cada respuesta antes de la entrevista, no solo el día anterior.'
        ],
        note: 'Pide una copia de tu solicitud completa antes de la entrevista. Si trabajas con un abogado, solicita que te la envíe con suficiente tiempo para revisarla.'
      },
      error2: {
        title: 'Error 2: Llevar copias cuando piden originales',
        text: 'USCIS y los consulados frecuentemente piden que lleves documentos originales a la entrevista. No basta con tener fotocopias, aunque estén certificadas. Los oficiales quieren verificar que los documentos son auténticos, y eso requiere tener el original en mano.',
        list: [
          'Certificados de nacimiento originales con apostilla o legalización.',
          'Certificados de matrimonio originales.',
          'Pasaportes vigentes y vencidos.',
          'Documentos de divorcio o defunción de matrimonios anteriores.',
          'Registros policiales o certificados de antecedentes originales.',
          'Traducciones certificadas acompañadas del documento original.'
        ],
        note: 'La notice de entrevista (I-797C o carta del consulado) generalmente incluye una lista de documentos que debes llevar. Léela con atención y confirma si necesitas originales.'
      },
      error3: {
        title: 'Error 3: No preparar fechas, entradas, salidas y direcciones',
        text: 'Las preguntas sobre tu historial de viajes, direcciones anteriores y fechas de eventos importantes son estándar en casi toda entrevista de inmigración. No se espera que recuerdes cada fecha exacta, pero sí que tengas un timeline coherente y que no te contradigas.',
        list: [
          'Fechas de entrada y salida de Estados Unidos.',
          'Direcciones de residencia de los últimos 5 a 10 años.',
          'Historial de empleo con fechas aproximadas.',
          'Fechas de eventos clave: matrimonio, nacimiento de hijos, arresto, cualquier encuentro con inmigración.',
          'Fechas de viajes al extranjero, especialmente si pediste Advance Parole.'
        ],
        note: 'Prepara un timeline escrito antes de la entrevista. No lo leas en voz alta durante la cita, pero repásalo varias veces para que las fechas estén frescas en tu memoria.'
      },
      error4: {
        title: 'Error 4: Inventar, adivinar o sobreexplicar',
        subtitle: 'La honestidad siempre es la mejor estrategia',
        text: 'Cuando un oficial te hace una pregunta y no sabes la respuesta, lo peor que puedes hacer es inventar. USCIS prefiere una respuesta honesta de "no recuerdo" o "no estoy seguro" a una mentira que después no puedas sostener. Sobreexplicar también es riesgoso: dar demasiada información sin que te la pidan puede abrir líneas de interrogación que no existían.',
        list: [
          'Si no recuerdas una fecha exacta, di "aproximadamente" y da el rango que recuerdes.',
          'Si no entiendes la pregunta, pide que te la repitan o reformulen.',
          'No inventes detalles para parecer más preparado. El oficial puede verificar lo que dices.',
          'No ofrezcas información adicional que nadie te pidió. Responde lo que te preguntan.',
          'Si tu abogado está presente, dale espacio para intervenir si algo se sale de contexto.'
        ],
        warning: 'Mentir en una entrevista de inmigración puede generar una barra permanente de inadmisibilidad bajo INA 212(a)(6)(C)(i) por fraude o tergiversación material.'
      },
      error5: {
        title: 'Error 5: Ignorar las reglas del intérprete',
        subtitle: 'El intérprete no es tu abogado ni tu portavoz',
        text: 'Si necesitas intérprete, hay reglas estrictas sobre quién puede serlo y cómo debe funcionar la interpretación. Las reglas varían según el tipo de entrevista, y muchas personas las desconocen completamente.',
        list: [
          'En entrevistas de ajuste de estatus, generalmente puedes llevar tu propio intérprete certificado.',
          'En entrevistas de naturalización, USCIS provee traducción solo en casos específicos (regla 50/20 o 55/15).',
          'En entrevistas de asilo afirmativo, USCIS proporciona un intérprete de su propia lista.',
          'En entrevistas consulares, el consulado puede o no aceptar intérpretes externos dependiendo del país.',
          'El intérprete no puede resumir, agregar información ni responder por ti. Solo traduce lo que dices.',
          'Si el intérprete comete un error de traducción, tu abogado puede intervenir para corregirlo.'
        ],
        note: 'Si tu inglés no es fuerte, no intentes responder en inglés para impresionar al oficial. Usa un intérprete y responde en tu idioma con confianza. La claridad es más importante que el idioma.'
      },
      moreErrors: {
        title: 'Errores 6 al 10: otros fallos que pueden costarte el caso',
        subtitle: 'Detalles que parecen menores pero no lo son',
        text: 'Los siguientes cinco errores son igualmente graves y ocurren con más frecuencia de la que se cree. Cada uno puede parecer un detalle menor, pero ante el oficial incorrecto o en el caso equivocado, pueden cambiar el resultado.',
        list: [
          'Error 6 - Llegar tarde a la entrevista: USCIS puede cancelar tu cita si no llegas a tiempo. Eso puede retrasar tu caso meses. Planifica llegar al menos 30 minutos antes y lleva en cuenta seguridad y espera.',
          'Error 7 - No llevar la notice de entrevista (I-797C): este documento es tu boleto de entrada. Sin él, podrían no dejarte pasar al edificio. Siempre lleva el original y una copia.',
          'Error 8 - No traducir documentos al inglés: todos los documentos en otro idioma deben presentarse con una traducción certificada al inglés. USCIS puede rechazar evidencia sin traducción.',
          'Error 9 - Contradicciones entre esposos (en entrevistas de matrimonio): si cada cónyuge da versiones distintas sobre la relación o la convivencia, eso levanta una señal de alerta inmediata. Ambos deben repasar juntos las fechas y detalles clave.',
          'Error 10 - No hablar con tu abogado antes de la entrevista: muchos abogados preparan a sus clientes, pero otros solo se presentan el día de la cita sin repasar el caso. Tú tienes derecho a pedir una sesión de preparación previa.'
        ],
        note: 'Cada uno de estos errores puede evitarse con organización y comunicación con tu representante legal. No dejes la preparación para el último minuto.'
      },
      faq: {
        title: 'Preguntas Frecuentes',
        items: [
          {
            q: '¿Puedo llevar a alguien que me acompañe a la entrevista?',
            a: 'Depende del tipo de entrevista. En ajustes de estatus, tu abogado puede acompañarte y generalmente puedes llevar un intérprete. En entrevistas de naturalización, normalmente no se permite acompañantes que no sean el intérprete. En entrevistas de asilo, puede haber reglas sobre testigos. Consulta las instrucciones de tu notice y con tu abogado.'
          },
          {
            q: '¿Qué pasa si no hablo inglés y no tengo intérprete?',
            a: 'Si necesitas intérprete y no llevas uno a una entrevista que lo requiere, el oficial podría reprogramar tu cita o proceder con dificultad. En asilo afirmativo, USCIS proporciona intérprete. Para naturalización, necesitas demostrar conocimiento de inglés a menos que califiques para una exención. No dejes este detalle para el día de la entrevista.'
          },
          {
            q: '¿Qué tan formal debo vestirme para la entrevista?',
            a: 'No hay un código de vestimenta oficial. Lo más importante es estar presentable y cómodo. No necesitas traje ni corbata. Ropa limpia y ordenada es suficiente. Lo que realmente importa es tu preparación, tus documentos y tus respuestas, no tu apariencia.'
          },
          {
            q: '¿Puede USCIS negar mi caso el mismo día de la entrevista?',
            a: 'Sí, es posible. En algunos casos el oficial aprueba o niega durante o inmediatamente después de la entrevista. En otros, el oficial pide evidencia adicional (RFE) o marca el caso para revisión adicional. En naturalización, frecuentemente recibes la decisión el mismo día. En ajustes de estatus por matrimonio, puede tomar semanas.'
          },
          {
            q: '¿Qué hago si el oficial me hace una pregunta que no entiendo?',
            a: 'Pide que repita la pregunta o que la reformule. No hay penalización por pedir clarificación. Es mejor pedir que repitan la pregunta tres veces a responder algo incorrecto. Si tienes abogado presente, puede solicitar que se aclare la pregunta. Nunca respondas una pregunta que no entendiste completamente.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusión',
        text: 'La entrevista de inmigración no es un examen de memoria ni un interrogatorio policial. Es una oportunidad para demostrar que tu caso es legítimo y que mereces el beneficio que solicitas. Pero esa oportunidad se pierde cuando llegas sin preparación, sin documentos correctos o sin entender las reglas básicas del proceso.',
        advice: 'Si tienes una entrevista de inmigración próxima, no la enfrentes solo. Un abogado de inmigración puede ayudarte a identificar debilidades, preparar tus respuestas y asegurarse de que no cometas ninguno de los errores que describimos aquí. La preparación es tu mejor herramienta.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'U.S. Department of State – Interview Preparation for Immigrant Visa Applicants',
          'USCIS – Preparing for Your Asylum Interview',
          'USCIS – Asylum Division FAQs',
          'USCIS – Policy Manual: Adjudication of Adjustment Applications'
        ]
      }
    }
  },
  en: {
    metaTitle: 'Immigration Interview: 10 Mistakes to Avoid',
    metaDesc: 'Learn the 10 most common mistakes in immigration interviews before USCIS. Know how to prepare based on the type of interview you face.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '10 min read',
      tags: 'USCIS Interview',
      date: 'May 08, 2026',
      time: '10 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'Immigration Interview: 10 Mistakes You Must Avoid at All Costs',
    summary: {
      title: 'Initial Summary',
      text: 'Not all immigration interviews are the same, but the mistakes applicants make tend to repeat themselves. In this article we analyze the <strong>10 most common mistakes</strong> that can put your case at risk before USCIS, from failing to review your application to ignoring interpreter rules. Knowing what to avoid is just as important as knowing what to say.'
    },
    intro: [
      'The immigration interview is probably the most important moment in your immigration process. It is the opportunity for the USCIS officer to verify what you submitted in writing, ask you direct questions, and decide whether your case deserves approval.',
      'What many people do not understand is that there is no single type of immigration interview. There are interviews for marriage-based adjustment of status, naturalization, asylum, consular immigrant visa processing, and other benefits. Each has different rules, but there are <strong>universal</strong> mistakes that repeat across all contexts.',
      'The most concerning part is that many of these mistakes are entirely avoidable with preparation. It is not about dressing formally or memorizing answers, but about understanding what the officer expects, what documents you need, and how to handle difficult questions without contradicting yourself or making things up.'
    ],
    sections: {
      notAllSame: {
        title: 'There Is No Single Immigration Interview',
        subtitle: 'Each type of case has its own format',
        text: 'One of the first mistakes is assuming all interviews are the same. The format, questions, and what the officer evaluates depends entirely on the type of benefit you are requesting. Understanding what type of interview you face is the first step to preparing correctly.',
        list: [
          'Marriage-based adjustment of status interview (I-485): the officer evaluates whether the marriage is genuine and whether you meet eligibility requirements.',
          'Naturalization interview (N-400): includes an English and civics test, and questions about your history and good moral character.',
          'Consular interview (DS-260): conducted at the consulate in your country where the officer evaluates admissibility, family relationship, and documentation.',
          'Affirmative asylum interview: conducted before an asylum officer who evaluates the credibility of your fear of persecution.',
          'Individual hearing in court (defensive asylum): occurs before an immigration judge as part of removal proceedings.',
          'Stokes interview: separate interview for couples when there are suspicions of marriage fraud.'
        ],
        note: 'You cannot prepare well if you do not know what type of interview you face. Each format has specific rules about who can accompany you, what documents are required, and how your case is evaluated.'
      },
      error1: {
        title: 'Mistake 1: Going Without Re-reading What You Already Filed',
        text: 'This is perhaps the most common and most dangerous mistake. Many people file their application months or even years before the interview, and when the time comes, they do not remember exactly what they stated in the forms. The USCIS officer has a copy of everything you submitted and will compare your oral answers with what was written.',
        list: [
          'If your form said you entered the country in 2015 and at the interview you say 2016, that creates an inconsistency.',
          'If you declared that you had no arrests but forget to mention an old incident, the officer may interpret it as a lie.',
          'Forms I-485, N-400, I-589, and DS-260 are extensive. It is normal not to remember every detail without reviewing them.',
          'Your attorney should review every answer with you before the interview, not just the day before.'
        ],
        note: 'Request a complete copy of your application before the interview. If you work with an attorney, ask them to send it to you with enough time to review it.'
      },
      error2: {
        title: 'Mistake 2: Bringing Copies When They Ask for Originals',
        text: 'USCIS and consulates frequently require that you bring original documents to the interview. Photocopies are not sufficient, even if they are certified. Officers want to verify that documents are authentic, and that requires having the original in hand.',
        list: [
          'Original birth certificates with apostille or legalization.',
          'Original marriage certificates.',
          'Current and expired passports.',
          'Divorce or death certificates from prior marriages.',
          'Original police records or criminal background certificates.',
          'Certified translations accompanied by the original document.'
        ],
        note: 'The interview notice (I-797C or consulate letter) generally includes a list of documents to bring. Read it carefully and confirm whether originals are required.'
      },
      error3: {
        title: 'Mistake 3: Not Preparing Dates, Entries, Exits, and Addresses',
        text: 'Questions about your travel history, previous addresses, and dates of important events are standard in nearly every immigration interview. You are not expected to remember every exact date, but you should have a coherent timeline and not contradict yourself.',
        list: [
          'Dates of entry to and departure from the United States.',
          'Residential addresses for the last 5 to 10 years.',
          'Employment history with approximate dates.',
          'Dates of key events: marriage, birth of children, arrest, any encounter with immigration.',
          'Dates of trips abroad, especially if you applied for Advance Parole.'
        ],
        note: 'Prepare a written timeline before the interview. Do not read it out loud during the appointment, but review it several times so the dates are fresh in your memory.'
      },
      error4: {
        title: 'Mistake 4: Making Things Up, Guessing, or Over-explaining',
        subtitle: 'Honesty is always the best strategy',
        text: 'When an officer asks you a question and you do not know the answer, the worst thing you can do is make something up. USCIS prefers an honest answer of "I do not remember" or "I am not sure" over a lie you cannot sustain later. Over-explaining is also risky: giving too much information without being asked can open lines of questioning that did not exist.',
        list: [
          'If you do not remember an exact date, say "approximately" and give the range you recall.',
          'If you do not understand the question, ask for it to be repeated or rephrased.',
          'Do not invent details to appear more prepared. The officer can verify what you say.',
          'Do not offer additional information that nobody asked for. Answer what is asked.',
          'If your attorney is present, give them space to intervene if something goes off track.'
        ],
        warning: 'Lying in an immigration interview can result in a permanent bar of inadmissibility under INA 212(a)(6)(C)(i) for fraud or material misrepresentation.'
      },
      error5: {
        title: 'Mistake 5: Ignoring the Interpreter Rules',
        subtitle: 'The interpreter is not your attorney or spokesperson',
        text: 'If you need an interpreter, there are strict rules about who can serve as one and how the interpretation must work. The rules vary depending on the type of interview, and many people are completely unaware of them.',
        list: [
          'In adjustment of status interviews, you can generally bring your own certified interpreter.',
          'In naturalization interviews, USCIS provides translation only in specific cases (50/20 or 55/15 rule).',
          'In affirmative asylum interviews, USCIS provides an interpreter from their own list.',
          'In consular interviews, the consulate may or may not accept external interpreters depending on the country.',
          'The interpreter cannot summarize, add information, or answer for you. They only translate what you say.',
          'If the interpreter makes a translation error, your attorney can intervene to correct it.'
        ],
        note: 'If your English is not strong, do not try to answer in English to impress the officer. Use an interpreter and respond in your language with confidence. Clarity is more important than the language you speak.'
      },
      moreErrors: {
        title: 'Mistakes 6 Through 10: Other Errors That Can Cost You the Case',
        subtitle: 'Details that seem minor but are not',
        text: 'The following five mistakes are equally serious and occur more frequently than people think. Each may seem like a minor detail, but before the wrong officer or in the wrong case, they can change the outcome.',
        list: [
          'Mistake 6 - Arriving late to the interview: USCIS can cancel your appointment if you do not arrive on time. That can delay your case by months. Plan to arrive at least 30 minutes early and account for security and waiting.',
          'Mistake 7 - Not bringing the interview notice (I-797C): this document is your ticket in. Without it, they may not let you into the building. Always bring the original and a copy.',
          'Mistake 8 - Not translating documents to English: all documents in another language must be submitted with a certified English translation. USCIS can reject evidence without a translation.',
          'Mistake 9 - Contradictions between spouses (in marriage interviews): if each spouse gives different versions about the relationship or living situation, that raises an immediate red flag. Both should review dates and key details together.',
          'Mistake 10 - Not speaking with your attorney before the interview: many attorneys prepare their clients, but others just show up on the day without reviewing the case. You have the right to request a preparation session beforehand.'
        ],
        note: 'Each of these mistakes can be avoided with organization and communication with your legal representative. Do not leave preparation for the last minute.'
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'Can I bring someone to accompany me to the interview?',
            a: 'It depends on the type of interview. In adjustment of status interviews, your attorney can accompany you and you can generally bring an interpreter. In naturalization interviews, companions other than the interpreter are typically not allowed. In asylum interviews, there may be rules about witnesses. Check your notice instructions and consult your attorney.'
          },
          {
            q: 'What happens if I do not speak English and have no interpreter?',
            a: 'If you need an interpreter and do not bring one to an interview that requires it, the officer may reschedule your appointment or proceed with difficulty. In affirmative asylum, USCIS provides an interpreter. For naturalization, you must demonstrate English proficiency unless you qualify for an exemption. Do not leave this detail for the day of the interview.'
          },
          {
            q: 'How formally should I dress for the interview?',
            a: 'There is no official dress code. The most important thing is to be presentable and comfortable. You do not need a suit or tie. Clean, neat clothing is sufficient. What truly matters is your preparation, your documents, and your answers, not your appearance.'
          },
          {
            q: 'Can USCIS deny my case on the same day as the interview?',
            a: 'Yes, it is possible. In some cases the officer approves or denies during or immediately after the interview. In others, the officer requests additional evidence (RFE) or marks the case for further review. In naturalization, you frequently receive the decision the same day. In marriage-based adjustment of status, it may take weeks.'
          },
          {
            q: 'What do I do if the officer asks me a question I do not understand?',
            a: 'Ask them to repeat the question or rephrase it. There is no penalty for asking for clarification. It is better to ask them to repeat the question three times than to answer something incorrectly. If you have an attorney present, they can request that the question be clarified. Never answer a question you did not fully understand.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusion',
        text: 'The immigration interview is not a memory test or a police interrogation. It is an opportunity to demonstrate that your case is legitimate and that you deserve the benefit you are requesting. But that opportunity is lost when you arrive unprepared, without the correct documents, or without understanding the basic rules of the process.',
        advice: 'If you have an upcoming immigration interview, do not face it alone. An immigration attorney can help you identify weaknesses, prepare your answers, and make sure you do not commit any of the mistakes we described here. Preparation is your best tool.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'U.S. Department of State – Interview Preparation for Immigrant Visa Applicants',
          'USCIS – Preparing for Your Asylum Interview',
          'USCIS – Asylum Division FAQs',
          'USCIS – Policy Manual: Adjudication of Adjustment Applications'
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
    path: `/${lang}/blog/entrevista-inmigracion-errores-evitar`,
    title: t.title,
    description: t.metaDesc,
    images: [{ url: IMAGES.article, alt: t.title }],
    type: 'article',
    publishedTime: '2026-05-08T08:00:00.000Z',
  });

  return {
    title: { absolute: t.metaTitle },
    description: t.metaDesc,
    openGraph: {
      ...social.openGraph,
      // Campos article:* que buildSocialMetadata no cubre.
      type: 'article',
      authors: ['Manuel Solís'],
      section: 'Inmigración',
      tags: ['Entrevista', 'USCIS', 'Inmigración', 'Preparación', 'Errores'],
    },
    twitter: social.twitter,
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/entrevista-inmigracion-errores-evitar`,
      languages: {
        'es': `${SITE_URL}/es/blog/entrevista-inmigracion-errores-evitar`,
        'en': `${SITE_URL}/en/blog/entrevista-inmigracion-errores-evitar`,
        'x-default': `${SITE_URL}/es/blog/entrevista-inmigracion-errores-evitar`,
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
    { name: t.title, url: `/${lang}/blog/entrevista-inmigracion-errores-evitar` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="entrevista-inmigracion-errores-evitar"
        date="2026-05-08"
        image={IMAGES.article}
        lang={lang as string}
        readTime="10"
      
        faqs={t.sections.faq.items.map((item) => ({
          question: item.q,
          answer: item.a.replace(/<[^>]+>/g, ''),
        }))}/>
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
                     alt="Entrevista de inmigración errores comunes USCIS"
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

                  {/* Sección 1: No existe una sola entrevista */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><ListOrdered size={24} className="text-[#B2904D]" /></div>
                      {t.sections.notAllSame.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.notAllSame.subtitle}</p>
                    <p className="mb-4">{t.sections.notAllSame.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.notAllSame.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.notAllSame.note}
                    </div>
                  </section>

                  {/* Sección 2: Error 1 */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><FileText size={24} className="text-[#B2904D]" /></div>
                      {t.sections.error1.title}
                    </h2>
                    <p className="mb-4">{t.sections.error1.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.error1.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-red-500/10">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.error1.note}
                    </div>
                  </section>

                  {/* Sección 3: Error 2 */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><ClipboardList size={24} className="text-[#B2904D]" /></div>
                      {t.sections.error2.title}
                    </h2>
                    <p className="mb-4">{t.sections.error2.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.error2.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.error2.note}
                    </div>
                  </section>

                  {/* Imagen interior 1 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside1}
                       alt="Preparación para entrevista de inmigración USCIS"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 4: Error 3 */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><MapPin size={24} className="text-[#B2904D]" /></div>
                      {t.sections.error3.title}
                    </h2>
                    <p className="mb-4">{t.sections.error3.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.error3.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.error3.note}
                    </div>
                  </section>

                  {/* Sección 5: Error 4 */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Ban size={24} className="text-[#B2904D]" /></div>
                      {t.sections.error4.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.error4.subtitle}</p>
                    <p className="mb-4">{t.sections.error4.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.error4.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-sm text-red-400">
                      <AlertTriangle size={16} className="inline mr-2" />
                      {t.sections.error4.warning}
                    </div>
                  </section>

                  {/* Sección 6: Error 5 */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Languages size={24} className="text-[#B2904D]" /></div>
                      {t.sections.error5.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.error5.subtitle}</p>
                    <p className="mb-4">{t.sections.error5.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.error5.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.error5.note}
                    </div>
                  </section>

                  {/* Imagen interior 2 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside2}
                       alt="Errores comunes en entrevistas USCIS"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 7: Errores 6-10 */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><AlertTriangle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.moreErrors.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.moreErrors.subtitle}</p>
                    <p className="mb-4">{t.sections.moreErrors.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.moreErrors.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-red-500/10">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.moreErrors.note}
                    </div>
                  </section>

                  {/* FAQ */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-8 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><HelpCircle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.faq.title}
                    </h2>
                    <div className="space-y-6">
                      {t.sections.faq.items.map((item, i) => (
                        <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                          <h3 className="text-white font-bold text-lg mb-3">P: {item.q}</h3>
                          <p className="text-blue-50/80 m-0">{item.a}</p>
                        </div>
                      ))}
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
            articles={getRelatedArticles('entrevista-inmigracion-errores-evitar', (lang as 'es' | 'en') || 'es')}
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
