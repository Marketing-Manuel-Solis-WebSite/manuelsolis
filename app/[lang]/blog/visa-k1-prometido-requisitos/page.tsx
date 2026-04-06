import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import {
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle,
  Lightbulb, MessageCircle, Send, ArrowUpRight, ShieldCheck, FileText,
  User, Heart, Users, Scale, ClipboardList, AlertTriangle,
  HelpCircle, Plane, Globe, ArrowRightLeft, Timer, MapPin
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
    metaTitle: 'Visa K-1 de Prometido: Requisitos y Proceso 2025',
    metaDesc: 'Guia completa de la Visa K-1 para prometidos. Requisitos, proceso I-129F, documentos para entrevista consular, comparación con CR-1/IR-1 y errores comunes.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '11 min de lectura',
      tags: 'Procesos Migratorios',
      date: '04 May, 2025',
      time: '11 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'Visa K-1 de prometido: requisitos reales, proceso y errores que hunden el caso',
    summary: {
      title: 'Resumen inicial',
      text: 'La Visa K-1 permite que el prometido(a) extranjero(a) de un ciudadano estadounidense ingrese a Estados Unidos para casarse dentro de 90 días. Solo ciudadanos pueden peticionarla. En esta guía cubrimos los <strong>requisitos reales</strong>, el proceso paso a paso desde el I-129F hasta el ajuste de estatus, los <strong>documentos clave para la entrevista consular</strong>, la comparación entre K-1 y casarse en el extranjero (CR-1/IR-1), y los errores que más retrasan o arruinan estos casos.'
    },
    intro: [
      'La Visa K-1, conocida como visa de prometido (fiancé visa), es una de las vías más utilizadas para que parejas internacionales puedan reunirse legalmente en Estados Unidos. Sin embargo, es también una de las más incomprendidas. Muchas personas asumen que basta con estar enamorados y presentar fotos juntos, cuando en realidad el proceso exige documentación específica, prueba de una relación genuina, y el cumplimiento de requisitos legales estrictos.',
      'A diferencia de otras visas familiares, la K-1 solo puede ser peticionada por ciudadanos estadounidenses, no por residentes permanentes. Además, la pareja debe haberse conocido en persona al menos una vez en los dos años anteriores a la presentación de la petición. Hay excepciones limitadas a este requisito, pero son muy difíciles de obtener.',
      'Este artículo cubre todo lo que necesitas saber antes de iniciar el proceso: desde quién califica, qué formularios presentar, qué esperar en la entrevista consular, cuándo conviene la K-1 frente a casarse en el extranjero, y los errores más comunes que causan retrasos o denegaciones.',
      'Es importante entender que la K-1 no otorga residencia permanente. Es una visa de no inmigrante que permite la entrada temporal a EE.UU. con el propósito exclusivo de casarse. Después de la boda, la pareja debe solicitar el ajuste de estatus (I-485) para obtener la residencia condicional.'
    ],
    sections: {
      requirements: {
        title: 'Requisitos reales para la Visa K-1',
        subtitle: 'Quién puede peticionarla y qué condiciones deben cumplirse',
        text: 'La Visa K-1 tiene requisitos específicos que deben cumplirse antes de presentar la petición I-129F. No cumplir con alguno de estos requisitos puede resultar en la denegación del caso sin posibilidad de apelación en algunos escenarios. Es fundamental verificar cada uno antes de iniciar el proceso.',
        list: [
          'El peticionario debe ser ciudadano estadounidense. Los residentes permanentes (green card holders) NO pueden peticionar una K-1. Si eres residente, la alternativa es casarte primero y presentar un I-130.',
          'Ambos deben estar legalmente libres para casarse: solteros, divorciados o viudos. Si alguno tiene un matrimonio anterior, debe demostrar que fue legalmente disuelto con sentencia de divorcio o certificado de defunción.',
          'La pareja debe haberse conocido en persona al menos una vez dentro de los dos años anteriores a la presentación del I-129F. Excepciones extremadamente limitadas aplican solo por razones culturales o religiosas estrictas, o por dificultad extrema.',
          'Debe existir intención genuina de casarse dentro de los 90 días posteriores a la entrada del beneficiario a EE.UU.',
          'El peticionario debe demostrar que puede mantener económicamente al beneficiario (I-134 en la etapa consular, I-864 después del matrimonio).',
          'El beneficiario debe ser admisible a Estados Unidos. Antecedentes penales, deportaciones previas o violaciones de inmigración anteriores pueden generar inadmisibilidad y requerir perdones.',
          'Si el peticionario tiene historial de violencia doméstica o condenas sexuales (Adam Walsh Act), se aplican requisitos adicionales de evaluación.'
        ],
        note: 'El requisito de haberse conocido en persona es uno de los más estrictos. Las excepciones son rarísimas y requieren evidencia muy sólida de por qué el encuentro físico fue imposible.'
      },
      process: {
        title: 'Proceso paso a paso',
        subtitle: 'Desde el I-129F hasta la residencia permanente',
        text: 'El proceso de la Visa K-1 involucra múltiples etapas y agencias gubernamentales. Desde la presentación inicial ante USCIS hasta el ajuste de estatus después del matrimonio, todo el proceso puede tomar entre 10 y 18 meses dependiendo de los tiempos de procesamiento y la carga del consulado correspondiente. Aquí desglosamos cada paso.',
        list: [
          'Paso 1 — Presentar el Formulario I-129F (Petition for Alien Fiancé) ante USCIS. El peticionario ciudadano presenta la petición con evidencia de la relación, prueba de haberse conocido en persona, pasaporte, y declaración de intención de matrimonio. Tiempo de procesamiento: 6-10 meses.',
          'Paso 2 — USCIS aprueba el I-129F y transfiere el caso al National Visa Center (NVC). El NVC asigna un número de caso y envía la documentación al consulado o embajada correspondiente en el país del beneficiario.',
          'Paso 3 — El consulado programa la entrevista. El beneficiario debe completar el DS-160 (solicitud de visa en línea), reunir todos los documentos civiles y médicos, y presentarse a la entrevista consular.',
          'Paso 4 — Entrevista consular. El oficial evalúa la relación, revisa la documentación, verifica la admisibilidad del beneficiario y, si todo es satisfactorio, aprueba la visa K-1. La visa es válida por 6 meses para una sola entrada.',
          'Paso 5 — Entrada a EE.UU. El beneficiario ingresa con la visa K-1. A partir de la fecha de entrada, la pareja tiene exactamente 90 días para casarse legalmente.',
          'Paso 6 — Matrimonio dentro de los 90 días. La boda debe celebrarse antes de que expire el plazo. No hay extensiones posibles.',
          'Paso 7 — Ajuste de estatus (I-485). Después del matrimonio, el beneficiario presenta el I-485 junto con el I-864 (Affidavit of Support al 125%), I-765 (permiso de trabajo), e I-131 (advance parole). Esto conduce a la residencia condicional por 2 años.',
          'Paso 8 — Eliminación de condiciones (I-751). Dentro de los 90 días antes de que expire la residencia condicional, la pareja debe presentar el I-751 para convertir la residencia condicional en permanente.'
        ],
        note: 'Si la pareja no se casa dentro de los 90 días, el beneficiario pierde su estatus legal y debe salir de EE.UU. No hay extensiones ni excepciones a este plazo.'
      },
      documents: {
        title: 'Documentos clave para la entrevista consular',
        subtitle: 'Lo que el consulado exige y evalúa',
        text: 'La entrevista consular es el momento decisivo de la Visa K-1. El oficial evaluará la autenticidad de la relación, la admisibilidad del beneficiario y la capacidad financiera del peticionario. Presentar documentación incompleta o desorganizada puede resultar en una solicitud de evidencia adicional (221g) o en la denegación de la visa. Estos son los documentos principales que se requieren.',
        list: [
          'Formulario DS-160 completado y confirmación de pago de la tarifa de visa.',
          'Pasaporte vigente con validez mínima de 6 meses después de la fecha prevista de entrada a EE.UU.',
          'Acta de nacimiento del beneficiario, apostillada o legalizada según corresponda.',
          'Certificado de soltería o sentencia de divorcio (si aplica) del beneficiario y del peticionario.',
          'Certificado de antecedentes penales del país del beneficiario y de cualquier país donde haya vivido más de 6 meses después de los 16 años.',
          'Examen médico realizado por un médico aprobado por la embajada, incluyendo vacunas requeridas.',
          'Formulario I-134 (Declaration of Financial Support) del peticionario con tax returns, carta de empleo y estados de cuenta bancarios.',
          'Evidencia de la relación: fotografías juntos con fechas y lugares, registros de comunicación (llamadas, mensajes, chats), boletos de avión y sellos de pasaporte de visitas, cartas o declaraciones de familiares y amigos.',
          'Evidencia de haberse conocido en persona: fotos del encuentro, sellos de pasaporte, reservaciones de hotel o vuelos.',
          'Si aplica: evidencia de waiver para inadmisibilidad (I-601 o similar).'
        ],
        note: 'Lleva copias y originales de todo. El oficial puede solicitar ver originales de cualquier documento. Organiza todo de manera cronológica y por categoría.'
      },
      k1VsMarriage: {
        title: 'K-1 vs casarse afuera: cuándo conviene cada ruta',
        subtitle: 'Comparación práctica entre la Visa K-1 y la Visa CR-1/IR-1',
        text: 'Una de las decisiones más importantes que enfrentan las parejas internacionales es si tramitar la Visa K-1 o casarse primero en el extranjero y luego presentar la petición I-130 para una visa de inmigrante (CR-1 si llevan menos de 2 años de casados, IR-1 si llevan más de 2 años). Cada ruta tiene ventajas y desventajas significativas que dependen de la situación particular de cada pareja.',
        cards: {
          k1time: { title: 'Tiempo de procesamiento K-1', desc: 'Generalmente 10-18 meses en total (I-129F + consular). Pero después de la entrada, aún falta ajustar estatus (6-12 meses más para la green card).' },
          cr1time: { title: 'Tiempo de procesamiento CR-1/IR-1', desc: 'Generalmente 12-24 meses en total. Pero al llegar a EE.UU., el beneficiario ya es residente permanente desde el primer día.' },
          k1work: { title: 'Permiso de trabajo con K-1', desc: 'El beneficiario NO puede trabajar al entrar con K-1 hasta que presente el I-485 y reciba el EAD (permiso de trabajo), lo cual puede tomar 3-6 meses adicionales.' },
          cr1work: { title: 'Permiso de trabajo con CR-1/IR-1', desc: 'El beneficiario llega como residente permanente y puede trabajar inmediatamente. La green card llega por correo semanas después de la entrada.' },
          k1cost: { title: 'Costos K-1', desc: 'I-129F ($580) + DS-160 ($265) + examen médico + I-485 ($1,440) + I-864. Costo total estimado: $2,500-$4,000 en tarifas gubernamentales.' },
          cr1cost: { title: 'Costos CR-1/IR-1', desc: 'I-130 ($625) + DS-260 ($325) + examen médico + I-864. Costo total estimado: $1,200-$2,500 en tarifas gubernamentales. Generalmente más económico.' },
          k1advantage: { title: 'Ventaja principal K-1', desc: 'La pareja se reúne más rápido en EE.UU. y puede celebrar la boda en Estados Unidos con familiares y amigos del peticionario.' },
          cr1advantage: { title: 'Ventaja principal CR-1/IR-1', desc: 'El beneficiario llega con residencia permanente inmediata, puede trabajar desde el día uno, y el proceso total de documentación es más simple.' }
        },
        note: 'Si la prioridad es reunirse rápido, la K-1 puede ser mejor. Si la prioridad es estabilidad inmediata y menor costo, casarse afuera y tramitar la CR-1/IR-1 suele ser más conveniente. Consulta con un abogado para evaluar tu situación específica.'
      },
      errors: {
        title: 'Errores que retrasan o hunden el caso',
        subtitle: 'Problemas frecuentes que observamos en la práctica',
        text: 'La Visa K-1 es un proceso riguroso donde errores aparentemente menores pueden causar retrasos de meses o la denegación definitiva del caso. Basándose en nuestra experiencia representando parejas en este proceso, estos son los errores más comunes y peligrosos.',
        list: [
          'No tener prueba de haberse conocido en persona: Este es uno de los motivos de denegación más frecuentes. Si no tienes sellos de pasaporte, fotos del encuentro, boletos de avión o reservaciones de hotel, tu caso será muy difícil de aprobar.',
          'Presentar evidencia insuficiente de la relación: Un puñado de fotos y capturas de chat no es suficiente. USCIS y el consulado buscan evidencia de una relación continua y genuina: comunicaciones regulares, visitas documentadas, planes a futuro, y conocimiento mutuo de las familias.',
          'No resolver inadmisibilidades antes de la entrevista: Si el beneficiario tiene deportaciones previas, overstays, antecedentes penales o fraude migratorio, estos problemas deben identificarse y resolverse (con perdones cuando sea posible) ANTES de la entrevista consular.',
          'Inconsistencias entre formularios: Si la información en el I-129F no coincide con el DS-160 o con lo que declaran en la entrevista, se generará sospecha de fraude.',
          'No prepararse para la entrevista consular: Muchos beneficiarios llegan a la entrevista sin poder explicar cómo conocieron a su pareja, detalles de la relación, o planes después de llegar a EE.UU.',
          'Errores en el I-134: Presentar ingresos insuficientes, no incluir tax returns, o no demostrar que el peticionario puede mantener al beneficiario financieramente.',
          'No casarse dentro de los 90 días: Si la pareja no se casa antes de que expire el plazo, el beneficiario queda fuera de estatus y debe salir del país.',
          'Presentar el I-129F como residente permanente: Solo ciudadanos estadounidenses pueden peticionar la K-1. Si eres residente, tu petición será rechazada automáticamente.'
        ],
        note: 'La mayoría de estos errores son evitables con preparación adecuada y asesoría legal. Consultar con un abogado de inmigración antes de presentar el I-129F puede ahorrarte años de retrasos.'
      },
      expiredApproval: {
        title: '¿Qué pasa si se venció la aprobación o la cita tardó demasiado?',
        subtitle: 'Situaciones de retraso y expiración en el proceso K-1',
        text: 'Los tiempos de procesamiento de la Visa K-1 pueden ser impredecibles. Retrasos en USCIS, en el NVC, o en la programación de citas consulares pueden hacer que la aprobación del I-129F expire antes de que se complete el proceso. Aquí explicamos qué hacer en estas situaciones.',
        list: [
          'Validez del I-129F aprobado: La aprobación es válida por 4 meses para que el consulado emita la visa. Sin embargo, el consulado puede extender esta validez si el retraso no es culpa del beneficiario.',
          'Si la visa K-1 ya fue emitida: Es válida por 6 meses para una sola entrada. Si el beneficiario no ingresa a EE.UU. dentro de ese período, la visa expira y debe reiniciarse el proceso consular.',
          'Retrasos consulares: Si el consulado retrasa la cita significativamente, se puede solicitar la revalidación de la petición. El abogado puede contactar al consulado o al NVC para agilizar.',
          'Si la relación cambia durante la espera: Si la pareja termina la relación durante el proceso, el peticionario debe notificar a USCIS y retirar la petición. Continuar con una petición para una relación que ya no existe constituye fraude.',
          'Cambio de circunstancias: Si el beneficiario se muda a otro país durante la espera, el caso puede transferirse a otro consulado, pero esto causa retrasos adicionales.',
          'Si el peticionario pierde la ciudadanía o muere: El caso se cancela automáticamente. No hay transferencia posible a otro peticionario.'
        ],
        note: 'Los retrasos son frustrantes pero no son inusuales. Mantén comunicación constante con tu abogado y con el NVC para monitorear el estatus del caso.'
      },
      faq: {
        title: 'Preguntas Frecuentes',
        items: [
          {
            q: '¿Mi prometido(a) puede trabajar en EE.UU. al entrar con la K-1?',
            a: 'No inmediatamente. La Visa K-1 no autoriza trabajo. Después de la boda, al presentar el I-485 (ajuste de estatus), el beneficiario puede solicitar simultáneamente el I-765 (permiso de trabajo o EAD). El EAD generalmente tarda entre 3 y 6 meses en ser aprobado. Hasta entonces, el beneficiario no puede trabajar legalmente.'
          },
          {
            q: '¿Puede un residente permanente (green card) peticionar una K-1?',
            a: 'No. La Visa K-1 está disponible exclusivamente para ciudadanos estadounidenses. Si eres residente permanente, tu única opción es casarte primero con tu pareja (en el extranjero o donde sea legalmente posible) y luego presentar la petición I-130 para una visa de inmigrante. Este proceso es generalmente más largo, especialmente para la categoría F2A.'
          },
          {
            q: '¿Qué pasa si no nos casamos dentro de los 90 días?',
            a: 'Si la pareja no se casa dentro de los 90 días posteriores a la entrada del beneficiario, este pierde su estatus legal y debe salir de Estados Unidos. No existen extensiones para este plazo. Permanecer después de los 90 días sin haberse casado constituye una violación de estatus que puede generar inadmisibilidad futura y barras de 3 o 10 años para reingresar.'
          },
          {
            q: '¿Puedo incluir a mis hijos en la petición K-1?',
            a: 'Sí. Los hijos solteros menores de 21 años del beneficiario K-1 pueden ser incluidos como derivados (visa K-2). Deben ser listados en el I-129F y presentar su propia documentación consular. Los hijos K-2 también deben completar su propio ajuste de estatus después de la boda del padre/madre beneficiario.'
          },
          {
            q: '¿Cuál es la diferencia de ingreso entre el I-134 y el I-864 en el proceso K-1?',
            a: 'En la etapa consular (antes de la entrada), se usa el I-134 con un estándar generalmente de 100% del nivel de pobreza. Este formulario es una declaración de intención, no un contrato ejecutable. Después del matrimonio, al presentar el ajuste de estatus, se requiere el I-864 con un estándar de 125% del nivel de pobreza. Este sí es un contrato legalmente vinculante que dura hasta que el beneficiario se naturalice o acumule 40 trimestres de trabajo.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusión',
        text: 'La Visa K-1 es una herramienta poderosa para reunir a parejas internacionales en Estados Unidos, pero requiere planificación cuidadosa, documentación completa y comprensión clara de cada etapa del proceso. Desde el requisito de haberse conocido en persona hasta el plazo estricto de 90 días para casarse, cada detalle importa.',
        advice: 'Si estás considerando la Visa K-1 o ya estás en alguna etapa del proceso, consultar con un abogado de inmigración puede ayudarte a evaluar si esta es la mejor ruta para tu situación, evitar errores costosos y prepararte adecuadamente para la entrevista consular.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'USCIS – Form I-129F: Petition for Alien Fiancé(e)',
          'USCIS – Fiancé(e) Visas Overview',
          'U.S. Department of State – Visa K-1 Fiancé(e)',
          'U.S. Department of State – Spouse & Fiancé(e) Visa Overview'
        ]
      }
    }
  },
  en: {
    metaTitle: 'K-1 Fiancé Visa: Requirements & Process Guide 2025',
    metaDesc: 'Complete K-1 fiancé visa guide. Requirements, I-129F process, consular interview documents, K-1 vs CR-1/IR-1 comparison, and common mistakes to avoid.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '11 min read',
      tags: 'Immigration Process',
      date: 'May 04, 2025',
      time: '11 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'K-1 Fiancé Visa: Real Requirements, Process, and Mistakes That Sink Your Case',
    summary: {
      title: 'Initial Summary',
      text: 'The K-1 Visa allows the foreign fiancé(e) of a U.S. citizen to enter the United States to marry within 90 days. Only citizens can petition for it. In this guide we cover the <strong>real requirements</strong>, the step-by-step process from the I-129F to adjustment of status, <strong>key documents for the consular interview</strong>, the comparison between K-1 and marrying abroad (CR-1/IR-1), and the mistakes that most commonly delay or ruin these cases.'
    },
    intro: [
      'The K-1 Visa, known as the fiancé visa, is one of the most commonly used pathways for international couples to legally reunite in the United States. However, it is also one of the most misunderstood. Many people assume it is enough to be in love and submit photos together, when in reality the process demands specific documentation, proof of a genuine relationship, and compliance with strict legal requirements.',
      'Unlike other family-based visas, the K-1 can only be petitioned by U.S. citizens, not by permanent residents. Additionally, the couple must have met in person at least once within the two years prior to filing the petition. There are limited exceptions to this requirement, but they are very difficult to obtain.',
      'This article covers everything you need to know before starting the process: from who qualifies, what forms to file, what to expect at the consular interview, when the K-1 is preferable to marrying abroad, and the most common mistakes that cause delays or denials.',
      'It is important to understand that the K-1 does not grant permanent residency. It is a nonimmigrant visa that allows temporary entry to the U.S. for the exclusive purpose of getting married. After the wedding, the couple must apply for adjustment of status (I-485) to obtain conditional residency.'
    ],
    sections: {
      requirements: {
        title: 'Real Requirements for the K-1 Visa',
        subtitle: 'Who can petition and what conditions must be met',
        text: 'The K-1 Visa has specific requirements that must be met before filing the I-129F petition. Failure to meet any of these requirements can result in denial of the case, in some scenarios without the possibility of appeal. It is essential to verify each one before starting the process.',
        list: [
          'The petitioner must be a U.S. citizen. Permanent residents (green card holders) CANNOT petition for a K-1. If you are a resident, the alternative is to marry first and file an I-130.',
          'Both parties must be legally free to marry: single, divorced, or widowed. If either has a prior marriage, they must demonstrate it was legally dissolved with a divorce decree or death certificate.',
          'The couple must have met in person at least once within the two years prior to filing the I-129F. Extremely limited exceptions apply only for strict cultural or religious reasons, or extreme hardship.',
          'There must be a genuine intention to marry within 90 days of the beneficiary\'s entry to the U.S.',
          'The petitioner must demonstrate the ability to financially support the beneficiary (I-134 at the consular stage, I-864 after marriage).',
          'The beneficiary must be admissible to the United States. Criminal records, prior deportations, or previous immigration violations may create inadmissibility and require waivers.',
          'If the petitioner has a history of domestic violence or sexual offense convictions (Adam Walsh Act), additional evaluation requirements apply.'
        ],
        note: 'The in-person meeting requirement is one of the strictest. Exceptions are extremely rare and require very strong evidence of why a physical meeting was impossible.'
      },
      process: {
        title: 'Step-by-Step Process',
        subtitle: 'From I-129F to permanent residency',
        text: 'The K-1 Visa process involves multiple stages and government agencies. From the initial filing with USCIS to the adjustment of status after marriage, the entire process can take between 10 and 18 months depending on processing times and the workload of the corresponding consulate. Here we break down each step.',
        list: [
          'Step 1 — File Form I-129F (Petition for Alien Fiancé) with USCIS. The U.S. citizen petitioner files the petition with relationship evidence, proof of having met in person, passport, and statement of intent to marry. Processing time: 6-10 months.',
          'Step 2 — USCIS approves the I-129F and transfers the case to the National Visa Center (NVC). The NVC assigns a case number and forwards documentation to the corresponding consulate or embassy in the beneficiary\'s country.',
          'Step 3 — The consulate schedules the interview. The beneficiary must complete the DS-160 (online visa application), gather all civil and medical documents, and appear for the consular interview.',
          'Step 4 — Consular interview. The officer evaluates the relationship, reviews documentation, verifies the beneficiary\'s admissibility, and if everything is satisfactory, approves the K-1 visa. The visa is valid for 6 months for a single entry.',
          'Step 5 — Entry to the U.S. The beneficiary enters with the K-1 visa. From the date of entry, the couple has exactly 90 days to legally marry.',
          'Step 6 — Marriage within 90 days. The wedding must take place before the deadline expires. No extensions are possible.',
          'Step 7 — Adjustment of status (I-485). After the marriage, the beneficiary files the I-485 along with the I-864 (Affidavit of Support at 125%), I-765 (work permit), and I-131 (advance parole). This leads to conditional residency for 2 years.',
          'Step 8 — Removal of conditions (I-751). Within 90 days before the conditional residency expires, the couple must file the I-751 to convert conditional residency to permanent.'
        ],
        note: 'If the couple does not marry within 90 days, the beneficiary loses legal status and must leave the U.S. There are no extensions or exceptions to this deadline.'
      },
      documents: {
        title: 'Key Documents for the Consular Interview',
        subtitle: 'What the consulate requires and evaluates',
        text: 'The consular interview is the decisive moment of the K-1 Visa. The officer will evaluate the authenticity of the relationship, the beneficiary\'s admissibility, and the petitioner\'s financial capacity. Presenting incomplete or disorganized documentation can result in an additional evidence request (221g) or visa denial. These are the main documents required.',
        list: [
          'Completed DS-160 form and confirmation of visa fee payment.',
          'Valid passport with minimum validity of 6 months beyond the planned U.S. entry date.',
          'Beneficiary\'s birth certificate, apostilled or legalized as applicable.',
          'Certificate of single status or divorce decree (if applicable) for both the beneficiary and petitioner.',
          'Police clearance certificate from the beneficiary\'s country and any country where they lived for more than 6 months after age 16.',
          'Medical examination performed by an embassy-approved physician, including required vaccinations.',
          'Form I-134 (Declaration of Financial Support) from the petitioner with tax returns, employment letter, and bank statements.',
          'Relationship evidence: photographs together with dates and locations, communication records (calls, messages, chats), flight tickets and passport stamps from visits, letters or statements from family and friends.',
          'Evidence of having met in person: photos from the meeting, passport stamps, hotel or flight reservations.',
          'If applicable: waiver evidence for inadmissibility (I-601 or similar).'
        ],
        note: 'Bring copies and originals of everything. The officer may ask to see originals of any document. Organize everything chronologically and by category.'
      },
      k1VsMarriage: {
        title: 'K-1 vs Marrying Abroad: When Each Route Makes Sense',
        subtitle: 'Practical comparison between the K-1 Visa and the CR-1/IR-1 Visa',
        text: 'One of the most important decisions international couples face is whether to pursue the K-1 Visa or marry first abroad and then file the I-130 petition for an immigrant visa (CR-1 if married less than 2 years, IR-1 if married more than 2 years). Each route has significant advantages and disadvantages that depend on each couple\'s particular situation.',
        cards: {
          k1time: { title: 'K-1 Processing Time', desc: 'Generally 10-18 months total (I-129F + consular). But after entry, adjustment of status still takes 6-12 more months for the green card.' },
          cr1time: { title: 'CR-1/IR-1 Processing Time', desc: 'Generally 12-24 months total. But upon arrival in the U.S., the beneficiary is a permanent resident from day one.' },
          k1work: { title: 'Work Authorization with K-1', desc: 'The beneficiary CANNOT work upon K-1 entry until they file the I-485 and receive the EAD (work permit), which can take an additional 3-6 months.' },
          cr1work: { title: 'Work Authorization with CR-1/IR-1', desc: 'The beneficiary arrives as a permanent resident and can work immediately. The green card arrives by mail weeks after entry.' },
          k1cost: { title: 'K-1 Costs', desc: 'I-129F ($580) + DS-160 ($265) + medical exam + I-485 ($1,440) + I-864. Total estimated cost: $2,500-$4,000 in government fees.' },
          cr1cost: { title: 'CR-1/IR-1 Costs', desc: 'I-130 ($625) + DS-260 ($325) + medical exam + I-864. Total estimated cost: $1,200-$2,500 in government fees. Generally more economical.' },
          k1advantage: { title: 'Main K-1 Advantage', desc: 'The couple reunites faster in the U.S. and can celebrate the wedding in the United States with the petitioner\'s family and friends.' },
          cr1advantage: { title: 'Main CR-1/IR-1 Advantage', desc: 'The beneficiary arrives with immediate permanent residency, can work from day one, and the overall documentation process is simpler.' }
        },
        note: 'If the priority is reuniting quickly, the K-1 may be better. If the priority is immediate stability and lower cost, marrying abroad and processing the CR-1/IR-1 is usually more convenient. Consult with an attorney to evaluate your specific situation.'
      },
      errors: {
        title: 'Mistakes That Delay or Sink Your Case',
        subtitle: 'Frequent problems we observe in practice',
        text: 'The K-1 Visa is a rigorous process where seemingly minor errors can cause months-long delays or definitive case denial. Based on our experience representing couples in this process, these are the most common and dangerous mistakes.',
        list: [
          'No proof of having met in person: This is one of the most frequent reasons for denial. If you don\'t have passport stamps, photos from the meeting, flight tickets, or hotel reservations, your case will be very difficult to approve.',
          'Insufficient relationship evidence: A handful of photos and chat screenshots is not enough. USCIS and the consulate look for evidence of a continuous and genuine relationship: regular communications, documented visits, future plans, and mutual knowledge of each other\'s families.',
          'Not resolving inadmissibilities before the interview: If the beneficiary has prior deportations, overstays, criminal records, or immigration fraud, these issues must be identified and resolved (with waivers when possible) BEFORE the consular interview.',
          'Inconsistencies between forms: If information on the I-129F does not match the DS-160 or what is stated in the interview, fraud suspicion will be triggered.',
          'Not preparing for the consular interview: Many beneficiaries arrive at the interview unable to explain how they met their partner, details of the relationship, or plans after arriving in the U.S.',
          'Errors on the I-134: Presenting insufficient income, not including tax returns, or failing to demonstrate that the petitioner can financially support the beneficiary.',
          'Not marrying within 90 days: If the couple does not marry before the deadline expires, the beneficiary falls out of status and must leave the country.',
          'Filing the I-129F as a permanent resident: Only U.S. citizens can petition for the K-1. If you are a resident, your petition will be automatically rejected.'
        ],
        note: 'Most of these mistakes are avoidable with adequate preparation and legal advice. Consulting with an immigration attorney before filing the I-129F can save you years of delays.'
      },
      expiredApproval: {
        title: 'What Happens If the Approval Expires or the Appointment Takes Too Long?',
        subtitle: 'Delay and expiration situations in the K-1 process',
        text: 'K-1 Visa processing times can be unpredictable. Delays at USCIS, the NVC, or in scheduling consular appointments can cause the I-129F approval to expire before the process is completed. Here we explain what to do in these situations.',
        list: [
          'Validity of the approved I-129F: The approval is valid for 4 months for the consulate to issue the visa. However, the consulate may extend this validity if the delay is not the beneficiary\'s fault.',
          'If the K-1 visa has already been issued: It is valid for 6 months for a single entry. If the beneficiary does not enter the U.S. within that period, the visa expires and the consular process must be restarted.',
          'Consular delays: If the consulate significantly delays the appointment, revalidation of the petition can be requested. The attorney can contact the consulate or NVC to expedite.',
          'If the relationship changes during the wait: If the couple ends the relationship during the process, the petitioner must notify USCIS and withdraw the petition. Continuing with a petition for a relationship that no longer exists constitutes fraud.',
          'Change of circumstances: If the beneficiary moves to another country during the wait, the case may be transferred to another consulate, but this causes additional delays.',
          'If the petitioner loses citizenship or dies: The case is automatically cancelled. No transfer to another petitioner is possible.'
        ],
        note: 'Delays are frustrating but not unusual. Maintain constant communication with your attorney and the NVC to monitor case status.'
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'Can my fiancé(e) work in the U.S. upon entering with the K-1?',
            a: 'Not immediately. The K-1 Visa does not authorize employment. After the wedding, when filing the I-485 (adjustment of status), the beneficiary can simultaneously apply for the I-765 (work permit or EAD). The EAD generally takes 3 to 6 months to be approved. Until then, the beneficiary cannot legally work.'
          },
          {
            q: 'Can a permanent resident (green card holder) petition for a K-1?',
            a: 'No. The K-1 Visa is exclusively available to U.S. citizens. If you are a permanent resident, your only option is to marry your partner first (abroad or wherever legally possible) and then file the I-130 petition for an immigrant visa. This process is generally longer, especially for the F2A category.'
          },
          {
            q: 'What happens if we don\'t marry within 90 days?',
            a: 'If the couple does not marry within 90 days of the beneficiary\'s entry, they lose their legal status and must leave the United States. There are no extensions for this deadline. Remaining after 90 days without marrying constitutes a status violation that can create future inadmissibility and 3- or 10-year bars for reentry.'
          },
          {
            q: 'Can I include my children in the K-1 petition?',
            a: 'Yes. Unmarried children under 21 years of age of the K-1 beneficiary can be included as derivatives (K-2 visa). They must be listed on the I-129F and present their own consular documentation. K-2 children must also complete their own adjustment of status after the parent beneficiary\'s wedding.'
          },
          {
            q: 'What is the income difference between the I-134 and I-864 in the K-1 process?',
            a: 'At the consular stage (before entry), the I-134 is used with a standard generally of 100% of the poverty level. This form is a declaration of intent, not an enforceable contract. After marriage, when filing for adjustment of status, the I-864 is required with a standard of 125% of the poverty level. This one IS a legally binding contract that lasts until the beneficiary naturalizes or accumulates 40 qualifying work quarters.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusion',
        text: 'The K-1 Visa is a powerful tool for reuniting international couples in the United States, but it requires careful planning, complete documentation, and a clear understanding of each stage of the process. From the requirement of having met in person to the strict 90-day marriage deadline, every detail matters.',
        advice: 'If you are considering the K-1 Visa or are already at some stage of the process, consulting with an immigration attorney can help you evaluate whether this is the best route for your situation, avoid costly mistakes, and properly prepare for the consular interview.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'USCIS – Form I-129F: Petition for Alien Fiancé(e)',
          'USCIS – Fiancé(e) Visas Overview',
          'U.S. Department of State – Visa K-1 Fiancé(e)',
          'U.S. Department of State – Spouse & Fiancé(e) Visa Overview'
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
      url: `${SITE_URL}/${lang}/blog/visa-k1-prometido-requisitos`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
      type: 'article',
      publishedTime: '2025-05-04T08:00:00.000Z',
      authors: ['Manuel Solís'],
      section: 'Inmigración',
      tags: ['Visa K-1', 'Prometido', 'Fiancé Visa', 'I-129F', 'Inmigración'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.metaDesc,
      images: [imageUrl],
      creator: '@AbogadoMSolis',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/visa-k1-prometido-requisitos`,
      languages: {
        'es': `${SITE_URL}/es/blog/visa-k1-prometido-requisitos`,
        'en': `${SITE_URL}/en/blog/visa-k1-prometido-requisitos`,
        'x-default': `${SITE_URL}/es/blog/visa-k1-prometido-requisitos`,
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
    { name: t.title, url: `/${lang}/blog/visa-k1-prometido-requisitos` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="visa-k1-prometido-requisitos"
        date="2025-05-04"
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
                     alt="Visa K-1 de prometido requisitos y proceso"
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

                  {/* Sección 1: Requisitos */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><ClipboardList size={24} className="text-[#B2904D]" /></div>
                      {t.sections.requirements.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.requirements.subtitle}</p>
                    <p className="mb-4">{t.sections.requirements.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.requirements.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.requirements.note}
                    </div>
                  </section>

                  {/* Sección 2: Proceso paso a paso */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><ArrowRightLeft size={24} className="text-[#B2904D]" /></div>
                      {t.sections.process.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.process.subtitle}</p>
                    <p className="mb-4">{t.sections.process.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.process.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#B2904D]/20 text-[#B2904D] font-bold text-sm shrink-0">{i + 1}</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.process.note}
                    </div>
                  </section>

                  {/* Imagen interior 1 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside1}
                       alt="Documentos entrevista consular Visa K-1"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 3: Documentos */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><FileText size={24} className="text-[#B2904D]" /></div>
                      {t.sections.documents.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.documents.subtitle}</p>
                    <p className="mb-4">{t.sections.documents.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.documents.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.documents.note}
                    </div>
                  </section>

                  {/* Sección 4: K-1 vs Casarse */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Scale size={24} className="text-[#B2904D]" /></div>
                      {t.sections.k1VsMarriage.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.k1VsMarriage.subtitle}</p>
                    <p className="mb-4">{t.sections.k1VsMarriage.text}</p>
                    <div className="grid md:grid-cols-2 gap-4 my-8">
                      {Object.entries(t.sections.k1VsMarriage.cards).map(([key, card]) => (
                        <div key={key} className="p-5 bg-[#000a20] rounded-xl border border-white/10">
                          <span className="font-bold text-white block mb-2">{card.title}</span>
                          <span className="text-sm text-blue-50/70">{card.desc}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.k1VsMarriage.note}
                    </div>
                  </section>

                  {/* Sección 5: Errores */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><AlertTriangle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.errors.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.errors.subtitle}</p>
                    <p className="mb-4">{t.sections.errors.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.errors.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-red-500/10">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.errors.note}
                    </div>
                  </section>

                  {/* Imagen interior 2 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside2}
                       alt="K-1 vs CR-1 comparación visa prometido"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 6: Expiración */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Timer size={24} className="text-[#B2904D]" /></div>
                      {t.sections.expiredApproval.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.expiredApproval.subtitle}</p>
                    <p className="mb-4">{t.sections.expiredApproval.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.expiredApproval.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.expiredApproval.note}
                    </div>
                  </section>

                  {/* FAQ */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-8 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><HelpCircle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.faq.title}
                    </h2>
                    <div className="grid gap-6">
                      {t.sections.faq.items.map((item, i) => (
                        <div key={i} className="p-6 bg-[#000a20] rounded-2xl border border-white/10">
                          <p className="font-bold text-white mb-3 text-lg">P: {item.q}</p>
                          <p className="text-blue-50/70">{item.a}</p>
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
            articles={getRelatedArticles('visa-k1-prometido-requisitos', (lang as 'es' | 'en') || 'es')}
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
