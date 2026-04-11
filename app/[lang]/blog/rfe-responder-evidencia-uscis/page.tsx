import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import {
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle,
  Lightbulb, Quote, TrendingUp, Award, Heart, Star, MessageCircle,
  Send, ArrowUpRight, ShieldCheck, FileText, User, Gavel, Search, Building2,
  Users, Baby, Globe, AlertTriangle, HelpCircle, Mail, ListOrdered, XCircle,
  BookOpen, Hammer, Eye, Package, Inbox
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
  article: '/home-image.jpg',
  inside1: '/home-image.jpg',
  inside2: '/home-image.jpg',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'RFE de USCIS: Cómo Responder una Request for Evidence sin Destruir tu Caso',
    metaDesc: 'Guía completa para responder un RFE (Request for Evidence) de USCIS. 7 pasos para armar una respuesta sólida, errores comunes, y cuándo necesitas un abogado.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '10 min de lectura',
      tags: 'RFE / USCIS',
      date: '18 Abr, 2025',
      time: '10 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'RFE de USCIS: cómo responder sin destruir tu caso de inmigración',
    summary: {
      title: 'Resumen inicial',
      text: 'Recibir un <strong>RFE</strong> (Request for Evidence) de USCIS no significa que tu caso fue negado. Significa que USCIS necesita más información antes de tomar una decisión. Pero la forma en que respondas puede ser la diferencia entre una aprobación y una negación definitiva. Este artículo explica qué es un RFE, cómo leer la carta correctamente, los <strong>7 pasos</strong> para armar una respuesta sólida, los errores que hunden casos, y cuándo un RFE revela un problema legal más profundo que requiere estrategia, no solo más papeles.'
    },
    intro: [
      'Un RFE llega cuando menos lo esperas. Puede ser en medio de tu trámite de residencia, tu permiso de trabajo, tu petición familiar, o cualquier otro caso ante USCIS. Y la primera reacción de la mayoría de las personas es pánico.',
      'El pánico es entendible, pero no es productivo. Un RFE no es un rechazo. Es una <strong>oportunidad</strong> — probablemente la única que tendrás — para completar tu caso y convencer a USCIS de que mereces la aprobación. Pero esa oportunidad tiene fecha de vencimiento: generalmente entre 30 y 87 días dependiendo del tipo de caso.',
      'Lo que destruye más casos no es el RFE en sí. Es la respuesta mal hecha: incompleta, fuera de tema, con documentos que no responden a lo que USCIS pidió, o enviada tarde. En este artículo te explicamos exactamente cómo evitar esos errores.'
    ],
    sections: {
      whatIsRFE: {
        title: 'Qué es un RFE y por qué USCIS lo emite',
        text: 'Un RFE (Request for Evidence) es una carta oficial que USCIS envía cuando revisa tu caso y determina que la evidencia presentada no es suficiente para tomar una decisión. No es una negación. Es un paso intermedio.',
        reasons: [
          'Documentos faltantes que eran requeridos con la solicitud original.',
          'Evidencia insuficiente para demostrar elegibilidad.',
          'Inconsistencias en la información proporcionada.',
          'Necesidad de verificar relaciones familiares, empleo, o estatus legal.',
          'Documentos vencidos o en idioma extranjero sin traducción certificada.'
        ],
        vsNOID: {
          subtitle: 'RFE vs NOID (Notice of Intent to Deny)',
          text: 'Un RFE es diferente de un NOID. El NOID significa que USCIS ya tiene la intención de negar tu caso y te da una última oportunidad para rebatir. El RFE es más neutral: USCIS no ha decidido negar, pero necesita más información. Sin embargo, una respuesta deficiente a un RFE puede llevar directamente a una negación o a un NOID.'
        }
      },
      firstError: {
        title: 'El primer error que destruye casos',
        subtitle: 'Responder a lo que tú crees, no a lo que USCIS pidió',
        text: 'El error más común y más devastador es no leer el RFE correctamente. USCIS te dice exactamente qué necesita. El problema es que muchas personas leen la carta con prisa, asumen que saben qué quiere USCIS, y envían documentos que no responden a la solicitud específica.',
        examples: [
          'USCIS pide prueba de la relación matrimonial bona fide y la persona envía más fotos de la boda — cuando lo que necesitan es evidencia de vida compartida: cuentas bancarias conjuntas, leases, seguros, declaraciones de impuestos.',
          'USCIS cuestiona un período específico de presencia en EE. UU. y la persona envía cartas generales de empleo en vez de récords detallados con fechas.',
          'USCIS pide una traducción certificada de un documento y la persona envía la misma copia sin traducir.'
        ],
        keyPoint: 'Lee el RFE línea por línea. Subraya cada punto. Haz una lista de todo lo que piden. Después, asegúrate de que tu respuesta aborde cada punto individualmente.'
      },
      sevenSteps: {
        title: 'Cómo armar una respuesta fuerte en 7 pasos',
        text: 'Sigue estos pasos para construir una respuesta completa y profesional que maximize tus posibilidades de aprobación.',
        steps: [
          {
            number: 1,
            title: 'Lee el RFE completo al menos 3 veces',
            detail: 'No leas por encima. Lee cada párrafo. Identifica cada solicitud específica. USCIS muchas veces incluye múltiples solicitudes en una sola carta. Si te pierdes una, tu respuesta será considerada incompleta.'
          },
          {
            number: 2,
            title: 'Haz una lista de cada documento o evidencia que USCIS solicita',
            detail: 'Crea una tabla o checklist con cada punto del RFE. Al lado de cada uno, anota qué documento enviarás para responder. Si no puedes obtener un documento específico, necesitas explicar por qué y ofrecer evidencia alternativa.'
          },
          {
            number: 3,
            title: 'Reúne toda la evidencia antes de empezar a preparar el paquete',
            detail: 'No envíes lo que tengas a mano con la esperanza de que sea suficiente. Tómate el tiempo de reunir documentos sólidos: récords oficiales, declaraciones juradas, traducciones certificadas, copias de documentos originales.'
          },
          {
            number: 4,
            title: 'Escribe una carta de respuesta organizada punto por punto',
            detail: 'Tu respuesta debe incluir una carta de presentación que referencie cada punto del RFE y explique qué evidencia estás proporcionando para cada uno. Usa el mismo orden que USCIS usó en su carta. Esto facilita el trabajo del oficial y demuestra que tomaste la solicitud en serio.'
          },
          {
            number: 5,
            title: 'Organiza el paquete con tabs o separadores',
            detail: 'Un paquete desorganizado es una bandera roja. Usa pestañas o separadores para cada sección. Incluye una tabla de contenido. Numera los exhibits. Hazle fácil al oficial encontrar exactamente lo que necesita.'
          },
          {
            number: 6,
            title: 'Revisa todo antes de enviar — busca errores, documentos faltantes, y fechas',
            detail: 'Verifica que cada punto del RFE tenga una respuesta correspondiente. Revisa fechas, nombres, números de caso. Un error tipográfico en un número A puede causar que tu respuesta se pierda o se atribuya al caso equivocado.'
          },
          {
            number: 7,
            title: 'Envía antes del deadline con tracking y guarda prueba de envío',
            detail: 'No esperes al último día. Envía al menos una semana antes del vencimiento si es posible. Usa un servicio de envío con número de rastreo (USPS Priority, FedEx, UPS). Guarda el recibo y el número de tracking. Si USCIS dice que no recibió tu respuesta, el tracking es tu único respaldo.'
          }
        ]
      },
      commonErrors: {
        title: 'Errores comunes que hunden la respuesta',
        text: 'Más allá de no leer correctamente el RFE, estos son los errores que vemos repetidamente en casos que terminan negados después de un RFE:',
        list: [
          {
            error: 'Enviar evidencia que no responde a lo que USCIS pidió',
            detail: 'Si USCIS pide prueba de ingreso legal, no envíes tu récord de empleo. Suena obvio, pero sucede constantemente. Las personas envían "todo lo que tienen" en vez de lo que específicamente se les pidió.'
          },
          {
            error: 'Traducciones incompletas o no certificadas',
            detail: 'USCIS requiere traducciones certificadas al inglés de todo documento en idioma extranjero. Una traducción informal, hecha por un amigo, o sin la declaración jurada del traductor, será rechazada.'
          },
          {
            error: 'Paquete incompleto o desorganizado',
            detail: 'Un paquete de respuesta que parece un montón de papeles sin orden transmite falta de seriedad. Peor aún, si el oficial no puede encontrar lo que busca, puede determinar que no respondiste al punto.'
          },
          {
            error: 'No explicar documentos faltantes',
            detail: 'Si no puedes obtener un documento específico, debes explicar por qué y ofrecer evidencia alternativa. Simplemente no incluirlo sin explicación es interpretado como que no pudiste demostrar tu caso.'
          },
          {
            error: 'Responder tarde o justo en el deadline',
            detail: 'Si tu respuesta llega después de la fecha límite, USCIS puede negar tu caso sin siquiera revisar lo que enviaste. Y enviar justo en el deadline deja cero margen para problemas de correo.'
          }
        ]
      },
      onlineOrMail: {
        title: '¿Se puede responder online o por correo?',
        text: 'Históricamente, las respuestas a RFE se envían por correo físico a la dirección indicada en la carta del RFE. Sin embargo, USCIS ha implementado opciones para responder ciertos RFEs de manera electrónica.',
        online: {
          subtitle: 'Respuesta online',
          text: 'Para ciertos tipos de casos, USCIS permite enviar la respuesta al RFE a través de tu cuenta de myUSCIS. Si tu caso tiene esta opción disponible, la carta del RFE generalmente lo indicará. La ventaja es que recibes confirmación inmediata de que tu respuesta fue recibida.'
        },
        mail: {
          subtitle: 'Respuesta por correo',
          text: 'Para la mayoría de los casos, la respuesta se envía por correo postal a la dirección específica que aparece en la carta del RFE. No envíes a una dirección diferente. Usa siempre un servicio con tracking: USPS Certified Mail, FedEx, o UPS. Guarda el recibo como prueba de envío.'
        },
        warning: 'Nunca envíes documentos originales a menos que USCIS los solicite específicamente. Envía copias claras y legibles. Si USCIS pierde tu paquete (y sí pasa), no quieres perder tus originales.'
      },
      whenLegal: {
        title: 'Cuándo el RFE exige estrategia legal, no solo más papeles',
        text: 'No todos los RFEs se resuelven simplemente enviando más documentos. A veces, la solicitud de evidencia revela un problema más profundo en tu caso que requiere estrategia legal.',
        scenarios: [
          {
            scenario: 'USCIS cuestiona tu elegibilidad legal',
            detail: 'Si el RFE no solo pide documentos sino que cuestiona si realmente calificas para el beneficio, necesitas un abogado. Esto no es un tema de papeles — es un tema de argumentación legal.'
          },
          {
            scenario: 'El RFE menciona inconsistencias en tus declaraciones',
            detail: 'Si USCIS encontró contradicciones entre lo que dijiste en la solicitud y la evidencia, simplemente enviar más documentos no arregla el problema. Necesitas una explicación legal coherente que resuelva la inconsistencia.'
          },
          {
            scenario: 'Te piden evidencia que no existe o no puedes obtener',
            detail: 'Cuando USCIS solicita documentos que simplemente no están disponibles (como récords de un país en conflicto), necesitas una estrategia de evidencia secundaria con declaraciones juradas y otra documentación que compense.'
          },
          {
            scenario: 'Es tu segundo RFE o ya recibiste un NOID previamente',
            detail: 'Si USCIS ya te pidió evidencia antes y no quedó satisfecho, o si ya recibiste un NOID, la situación es crítica. Un segundo intento requiere una estrategia completamente diferente y más fuerte que la primera.'
          }
        ],
        note: 'Un buen abogado no solo reúne papeles — analiza qué está realmente buscando el oficial de USCIS y construye la respuesta para superar cada objeción de manera legal y persuasiva.'
      },
      faq: {
        title: 'Preguntas Frecuentes sobre RFE de USCIS',
        items: [
          {
            q: '¿Cuánto tiempo tengo para responder un RFE?',
            a: 'Generalmente entre 30 y 87 días, dependiendo del tipo de caso y lo que USCIS solicite. La fecha límite exacta aparece en la carta del RFE. Este plazo no es negociable y no se puede extender. Si no respondes a tiempo, USCIS puede negar tu caso basándose en la evidencia que ya tiene.'
          },
          {
            q: '¿Un RFE significa que mi caso va a ser negado?',
            a: 'No. Un RFE es una solicitud de información adicional, no una negación. Muchos casos que reciben RFE terminan aprobados si la respuesta es completa y aborda cada punto. Sin embargo, una respuesta deficiente puede llevar a una negación.'
          },
          {
            q: '¿Puedo pedir una extensión de tiempo para responder?',
            a: 'No. USCIS no otorga extensiones para responder RFEs. El plazo indicado en la carta es final. Por eso es fundamental comenzar a reunir evidencia inmediatamente después de recibir el RFE.'
          },
          {
            q: '¿Qué pasa si no puedo obtener un documento que USCIS pide?',
            a: 'Debes explicar por qué el documento no está disponible y proporcionar evidencia alternativa: declaraciones juradas, documentos secundarios, cartas de instituciones explicando que el récord no existe, o cualquier otra prueba que compense la falta del documento principal.'
          },
          {
            q: '¿Puedo enviar nueva evidencia que USCIS no pidió específicamente?',
            a: 'Sí, puedes incluir evidencia adicional que fortalezca tu caso, incluso si no fue solicitada explícitamente. Sin embargo, tu prioridad debe ser responder a cada punto específico del RFE. La evidencia adicional es un complemento, no un sustituto.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusión',
        text: 'Un RFE no es el fin de tu caso — es una oportunidad de salvarlo. Pero esa oportunidad solo funciona si la aprovechas correctamente: leyendo con cuidado, respondiendo punto por punto, organizando la evidencia de manera profesional, y reconociendo cuándo necesitas ayuda legal.',
        advice: 'Si recibiste un RFE y no estás seguro de cómo responder, o si el RFE revela un problema más profundo en tu caso, no adivines. Consulta con un abogado que pueda revisar tu situación y diseñar una estrategia de respuesta sólida.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'USCIS – Policy Manual: Requests for Evidence and Notices of Intent to Deny',
          'USCIS – Tips for Filing a Complete Application',
          '8 CFR § 103.2(b)(8) – Request for Evidence',
          'American Immigration Lawyers Association (AILA) – Best Practices for RFE Responses',
          'USCIS – myUSCIS Online Account System'
        ]
      }
    }
  },
  en: {
    metaTitle: 'USCIS RFE: How to Respond to a Request for Evidence Without Destroying Your Case',
    metaDesc: 'Complete guide to responding to a USCIS RFE (Request for Evidence). 7 steps to build a strong response, common mistakes, and when you need an attorney.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '10 min read',
      tags: 'RFE / USCIS',
      date: 'Apr 18, 2025',
      time: '10 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'USCIS RFE: How to Respond Without Destroying Your Immigration Case',
    summary: {
      title: 'Initial Summary',
      text: 'Receiving an <strong>RFE</strong> (Request for Evidence) from USCIS does not mean your case was denied. It means USCIS needs more information before making a decision. But the way you respond can be the difference between an approval and a final denial. This article explains what an RFE is, how to read the letter correctly, the <strong>7 steps</strong> to build a strong response, the mistakes that sink cases, and when an RFE reveals a deeper legal issue that requires strategy, not just more paperwork.'
    },
    intro: [
      'An RFE arrives when you least expect it. It could come in the middle of your residency application, your work permit, your family petition, or any other case before USCIS. And most people\'s first reaction is panic.',
      'Panic is understandable, but not productive. An RFE is not a rejection. It is an <strong>opportunity</strong> — probably the only one you will have — to complete your case and convince USCIS that you deserve approval. But that opportunity has an expiration date: generally between 30 and 87 days depending on the type of case.',
      'What destroys more cases is not the RFE itself. It is the poorly crafted response: incomplete, off-topic, with documents that do not address what USCIS asked for, or sent late. In this article, we explain exactly how to avoid those mistakes.'
    ],
    sections: {
      whatIsRFE: {
        title: 'What Is an RFE and Why USCIS Issues It',
        text: 'An RFE (Request for Evidence) is an official letter that USCIS sends when it reviews your case and determines that the evidence submitted is not sufficient to make a decision. It is not a denial. It is an intermediate step.',
        reasons: [
          'Missing documents that were required with the original application.',
          'Insufficient evidence to demonstrate eligibility.',
          'Inconsistencies in the information provided.',
          'Need to verify family relationships, employment, or legal status.',
          'Expired documents or documents in a foreign language without certified translation.'
        ],
        vsNOID: {
          subtitle: 'RFE vs NOID (Notice of Intent to Deny)',
          text: 'An RFE is different from a NOID. A NOID means USCIS already intends to deny your case and gives you a final chance to rebut. An RFE is more neutral: USCIS has not decided to deny, but needs more information. However, a deficient response to an RFE can lead directly to a denial or a NOID.'
        }
      },
      firstError: {
        title: 'The First Mistake That Destroys Cases',
        subtitle: 'Responding to what you think, not what USCIS asked',
        text: 'The most common and most devastating mistake is not reading the RFE correctly. USCIS tells you exactly what it needs. The problem is that many people read the letter hastily, assume they know what USCIS wants, and send documents that do not address the specific request.',
        examples: [
          'USCIS asks for proof of a bona fide marital relationship and the person sends more wedding photos — when what they need is evidence of shared life: joint bank accounts, leases, insurance, tax returns.',
          'USCIS questions a specific period of presence in the U.S. and the person sends general employment letters instead of detailed records with dates.',
          'USCIS requests a certified translation of a document and the person sends the same untranslated copy.'
        ],
        keyPoint: 'Read the RFE line by line. Underline each point. Make a list of everything they ask for. Then, make sure your response addresses each point individually.'
      },
      sevenSteps: {
        title: 'How to Build a Strong Response in 7 Steps',
        text: 'Follow these steps to build a complete and professional response that maximizes your chances of approval.',
        steps: [
          {
            number: 1,
            title: 'Read the entire RFE at least 3 times',
            detail: 'Do not skim. Read every paragraph. Identify each specific request. USCIS often includes multiple requests in a single letter. If you miss one, your response will be considered incomplete.'
          },
          {
            number: 2,
            title: 'Make a list of each document or piece of evidence USCIS requests',
            detail: 'Create a table or checklist with each point from the RFE. Next to each one, note which document you will send in response. If you cannot obtain a specific document, you need to explain why and offer alternative evidence.'
          },
          {
            number: 3,
            title: 'Gather all evidence before you start preparing the package',
            detail: 'Do not send whatever you have on hand hoping it will be enough. Take the time to gather solid documents: official records, affidavits, certified translations, copies of original documents.'
          },
          {
            number: 4,
            title: 'Write an organized response letter addressing each point',
            detail: 'Your response should include a cover letter that references each point of the RFE and explains what evidence you are providing for each. Use the same order USCIS used in their letter. This makes the officer\'s job easier and shows you took the request seriously.'
          },
          {
            number: 5,
            title: 'Organize the package with tabs or dividers',
            detail: 'A disorganized package is a red flag. Use tabs or dividers for each section. Include a table of contents. Number the exhibits. Make it easy for the officer to find exactly what they need.'
          },
          {
            number: 6,
            title: 'Review everything before sending — look for errors, missing documents, and dates',
            detail: 'Verify that each point of the RFE has a corresponding response. Check dates, names, case numbers. A typo in an A-number can cause your response to be lost or attributed to the wrong case.'
          },
          {
            number: 7,
            title: 'Send before the deadline with tracking and keep proof of delivery',
            detail: 'Do not wait until the last day. Send at least one week before the deadline if possible. Use a delivery service with tracking (USPS Priority, FedEx, UPS). Keep the receipt and tracking number. If USCIS says they did not receive your response, tracking is your only backup.'
          }
        ]
      },
      commonErrors: {
        title: 'Common Mistakes That Sink the Response',
        text: 'Beyond not reading the RFE correctly, these are the mistakes we see repeatedly in cases that end up denied after an RFE:',
        list: [
          {
            error: 'Sending evidence that does not address what USCIS asked',
            detail: 'If USCIS asks for proof of legal entry, don\'t send your employment record. It sounds obvious, but it happens constantly. People send "everything they have" instead of what was specifically requested.'
          },
          {
            error: 'Incomplete or uncertified translations',
            detail: 'USCIS requires certified English translations of every foreign-language document. An informal translation done by a friend, or one without the translator\'s sworn statement, will be rejected.'
          },
          {
            error: 'Incomplete or disorganized package',
            detail: 'A response package that looks like a pile of unordered papers conveys a lack of seriousness. Worse, if the officer cannot find what they\'re looking for, they may determine you did not respond to the point.'
          },
          {
            error: 'Not explaining missing documents',
            detail: 'If you cannot obtain a specific document, you must explain why and offer alternative evidence. Simply not including it without explanation is interpreted as failure to prove your case.'
          },
          {
            error: 'Responding late or right at the deadline',
            detail: 'If your response arrives after the deadline, USCIS can deny your case without even reviewing what you sent. And sending right at the deadline leaves zero margin for mail issues.'
          }
        ]
      },
      onlineOrMail: {
        title: 'Can You Respond Online or by Mail?',
        text: 'Historically, RFE responses are sent by physical mail to the address indicated in the RFE letter. However, USCIS has implemented options to respond to certain RFEs electronically.',
        online: {
          subtitle: 'Online response',
          text: 'For certain types of cases, USCIS allows you to submit the RFE response through your myUSCIS account. If your case has this option available, the RFE letter will generally indicate it. The advantage is that you receive immediate confirmation that your response was received.'
        },
        mail: {
          subtitle: 'Response by mail',
          text: 'For most cases, the response is sent by postal mail to the specific address that appears on the RFE letter. Do not send to a different address. Always use a delivery service with tracking: USPS Certified Mail, FedEx, or UPS. Keep the receipt as proof of delivery.'
        },
        warning: 'Never send original documents unless USCIS specifically requests them. Send clear, legible copies. If USCIS loses your package (and it does happen), you don\'t want to lose your originals.'
      },
      whenLegal: {
        title: 'When the RFE Demands Legal Strategy, Not Just More Paperwork',
        text: 'Not all RFEs are resolved simply by sending more documents. Sometimes, the evidence request reveals a deeper problem in your case that requires legal strategy.',
        scenarios: [
          {
            scenario: 'USCIS questions your legal eligibility',
            detail: 'If the RFE doesn\'t just ask for documents but questions whether you actually qualify for the benefit, you need an attorney. This is not a paperwork issue — it\'s a legal argumentation issue.'
          },
          {
            scenario: 'The RFE mentions inconsistencies in your statements',
            detail: 'If USCIS found contradictions between what you stated in the application and the evidence, simply sending more documents doesn\'t fix the problem. You need a coherent legal explanation that resolves the inconsistency.'
          },
          {
            scenario: 'They ask for evidence that doesn\'t exist or you cannot obtain',
            detail: 'When USCIS requests documents that are simply not available (such as records from a country in conflict), you need a secondary evidence strategy with affidavits and other documentation to compensate.'
          },
          {
            scenario: 'It\'s your second RFE or you previously received a NOID',
            detail: 'If USCIS already asked for evidence before and was not satisfied, or if you already received a NOID, the situation is critical. A second attempt requires a completely different and stronger strategy than the first.'
          }
        ],
        note: 'A good attorney doesn\'t just gather paperwork — they analyze what the USCIS officer is really looking for and build the response to overcome each objection legally and persuasively.'
      },
      faq: {
        title: 'Frequently Asked Questions About USCIS RFEs',
        items: [
          {
            q: 'How much time do I have to respond to an RFE?',
            a: 'Generally between 30 and 87 days, depending on the type of case and what USCIS requests. The exact deadline appears on the RFE letter. This deadline is not negotiable and cannot be extended. If you don\'t respond on time, USCIS can deny your case based on the evidence it already has.'
          },
          {
            q: 'Does an RFE mean my case is going to be denied?',
            a: 'No. An RFE is a request for additional information, not a denial. Many cases that receive RFEs end up approved if the response is complete and addresses each point. However, a deficient response can lead to a denial.'
          },
          {
            q: 'Can I request an extension to respond?',
            a: 'No. USCIS does not grant extensions for responding to RFEs. The deadline indicated in the letter is final. That is why it is critical to begin gathering evidence immediately after receiving the RFE.'
          },
          {
            q: 'What happens if I cannot obtain a document USCIS requested?',
            a: 'You must explain why the document is unavailable and provide alternative evidence: affidavits, secondary documents, letters from institutions explaining the record does not exist, or any other proof that compensates for the missing primary document.'
          },
          {
            q: 'Can I send new evidence that USCIS did not specifically request?',
            a: 'Yes, you can include additional evidence that strengthens your case, even if it was not explicitly requested. However, your priority should be responding to each specific point of the RFE. Additional evidence is a complement, not a substitute.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusion',
        text: 'An RFE is not the end of your case — it is an opportunity to save it. But that opportunity only works if you use it correctly: reading carefully, responding point by point, organizing evidence professionally, and recognizing when you need legal help.',
        advice: 'If you received an RFE and are not sure how to respond, or if the RFE reveals a deeper problem in your case, do not guess. Consult with an attorney who can review your situation and design a solid response strategy.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'USCIS – Policy Manual: Requests for Evidence and Notices of Intent to Deny',
          'USCIS – Tips for Filing a Complete Application',
          '8 CFR § 103.2(b)(8) – Request for Evidence',
          'American Immigration Lawyers Association (AILA) – Best Practices for RFE Responses',
          'USCIS – myUSCIS Online Account System'
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
      url: `${SITE_URL}/${lang}/blog/rfe-responder-evidencia-uscis`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
      type: 'article',
      publishedTime: '2025-04-18T08:00:00.000Z',
      authors: ['Manuel Solís'],
      section: 'Inmigración',
      tags: ['RFE', 'USCIS', 'Evidencia', 'Inmigración', 'Request for Evidence'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.metaDesc,
      images: [imageUrl],
      creator: '@AbogadoMSolis',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/rfe-responder-evidencia-uscis`,
      languages: {
        'es': `${SITE_URL}/es/blog/rfe-responder-evidencia-uscis`,
        'en': `${SITE_URL}/en/blog/rfe-responder-evidencia-uscis`,
        'x-default': `${SITE_URL}/es/blog/rfe-responder-evidencia-uscis`,
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
    { name: t.title, url: `/${lang}/blog/rfe-responder-evidencia-uscis` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="rfe-responder-evidencia-uscis"
        date="2025-04-18"
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
                     alt="RFE USCIS Request for Evidence responder evidencia inmigración"
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

                  {/* Sección 1: Qué es un RFE */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Mail size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whatIsRFE.title}
                    </h2>
                    <p className="mb-6">{t.sections.whatIsRFE.text}</p>
                    <ul className="grid gap-3 mt-6 mb-8 list-none pl-0">
                      {t.sections.whatIsRFE.reasons.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-amber-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                      <h4 className="text-[#B2904D] font-bold uppercase tracking-widest mb-3 text-sm">{t.sections.whatIsRFE.vsNOID.subtitle}</h4>
                      <p className="m-0">{t.sections.whatIsRFE.vsNOID.text}</p>
                    </div>
                  </section>

                  {/* Sección 2: El primer error */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><AlertTriangle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.firstError.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.firstError.subtitle}</p>
                    <p className="mb-6">{t.sections.firstError.text}</p>
                    <div className="grid gap-3 mb-6">
                      {t.sections.firstError.examples.map((example, i) => (
                        <div key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <XCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span className="text-sm">{example}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <Lightbulb size={16} className="inline mr-2" />
                      {t.sections.firstError.keyPoint}
                    </div>
                  </section>

                  {/* Imagen interior 1 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside1}
                       alt="Cómo armar respuesta RFE USCIS paso a paso"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 3: 7 pasos */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><ListOrdered size={24} className="text-[#B2904D]" /></div>
                      {t.sections.sevenSteps.title}
                    </h2>
                    <p className="mb-8">{t.sections.sevenSteps.text}</p>
                    <div className="grid gap-4">
                      {t.sections.sevenSteps.steps.map((step, i) => (
                        <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                          <div className="flex items-start gap-4">
                            <span className="shrink-0 w-10 h-10 rounded-full bg-[#B2904D] text-[#001540] flex items-center justify-center font-bold text-lg">{step.number}</span>
                            <div>
                              <h4 className="text-white font-bold mb-2">{step.title}</h4>
                              <p className="m-0 text-sm">{step.detail}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Sección 4: Errores comunes */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><XCircle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.commonErrors.title}
                    </h2>
                    <p className="mb-6">{t.sections.commonErrors.text}</p>
                    <div className="grid gap-4">
                      {t.sections.commonErrors.list.map((item, i) => (
                        <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                          <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                            <AlertCircle size={18} /> {item.error}
                          </h4>
                          <p className="m-0 text-sm">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Sección 5: Online o correo */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Inbox size={24} className="text-[#B2904D]" /></div>
                      {t.sections.onlineOrMail.title}
                    </h2>
                    <p className="mb-6">{t.sections.onlineOrMail.text}</p>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-4">
                      <h4 className="text-[#B2904D] font-bold uppercase tracking-widest mb-3 text-sm">{t.sections.onlineOrMail.online.subtitle}</h4>
                      <p className="m-0">{t.sections.onlineOrMail.online.text}</p>
                    </div>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-4">
                      <h4 className="text-[#B2904D] font-bold uppercase tracking-widest mb-3 text-sm">{t.sections.onlineOrMail.mail.subtitle}</h4>
                      <p className="m-0">{t.sections.onlineOrMail.mail.text}</p>
                    </div>

                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.onlineOrMail.warning}
                    </div>
                  </section>

                  {/* Imagen interior 2 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside2}
                       alt="RFE estrategia legal abogado inmigración USCIS"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 6: Cuándo necesitas estrategia legal */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Gavel size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whenLegal.title}
                    </h2>
                    <p className="mb-6">{t.sections.whenLegal.text}</p>
                    <div className="grid gap-4 mb-6">
                      {t.sections.whenLegal.scenarios.map((item, i) => (
                        <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                          <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                            <ShieldCheck size={18} className="text-[#B2904D]" /> {item.scenario}
                          </h4>
                          <p className="m-0 text-sm">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <Lightbulb size={16} className="inline mr-2" />
                      {t.sections.whenLegal.note}
                    </div>
                  </section>

                  {/* Sección 7: FAQ */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><HelpCircle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.faq.title}
                    </h2>
                    <div className="grid gap-4">
                      {t.sections.faq.items.map((item, i) => (
                        <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                          <h4 className="text-white font-bold mb-3 flex items-start gap-2">
                            <span className="shrink-0 w-7 h-7 rounded-full bg-[#B2904D] text-[#001540] flex items-center justify-center font-bold text-xs">P</span>
                            {item.q}
                          </h4>
                          <p className="m-0 text-sm pl-9">{item.a}</p>
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
            articles={getRelatedArticles('rfe-responder-evidencia-uscis', (lang as 'es' | 'en') || 'es')}
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
