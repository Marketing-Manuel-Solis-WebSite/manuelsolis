import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle,
  Lightbulb, Quote, TrendingUp, Award, Heart, Star, MessageCircle,
  Send, ArrowUpRight, ShieldCheck, FileText, User, Gavel, Search, Building2,
  Users, Baby, Globe, AlertTriangle, Timer, Ban, RotateCcw, Scale, MapPin
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
  article: '/blog/blog_24/B4_CR1.jpg',
  inside1: '/blog/blog_24/B4_CR2.jpg',
  inside2: '/blog/blog_24/B4_CR2.jpg',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Barras de 3 y 10 Años: Presencia Ilegal y Cómo Evitarlas',
    metaDesc: '¿Saliste de EE. UU. después de estar sin papeles? Conoce las barras de 3 años, 10 años y permanente, el perdón I-601A y cómo protegerte.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '11 min de lectura',
      tags: 'Barras de Presencia Ilegal',
      date: '22 Abr, 2026',
      time: '11 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'Barras de 3 y 10 Años por Presencia Ilegal: Qué Son, Cómo Te Afectan y Qué Opciones Existen',
    summary: {
      title: 'Resumen inicial',
      text: 'Si viviste en Estados Unidos sin estatus legal y saliste del país, podrías estar sujeto a una <strong>barra de 3 años, 10 años o incluso permanente</strong> que te impide regresar legalmente. Estas penalidades se activan al momento de la salida, no antes. Entender cuándo aplican, cuándo existe un perdón disponible y cuándo conviene esperar puede ser la diferencia entre avanzar con tu caso o quedarte atrapado fuera del país durante años.'
    },
    intro: [
      'Una de las situaciones más difíciles en inmigración es descubrir que, al salir de Estados Unidos, se activó un <strong>castigo que impide regresar legalmente por años</strong>. Muchas familias no lo saben hasta que ya es demasiado tarde.',
      'Las llamadas "barras" por presencia ilegal son penalidades que la ley impone cuando una persona acumula tiempo sin estatus en EE. UU. y luego se va o es removida del país. Estas barras <strong>no se activan mientras estás dentro del país</strong>; se activan cuando sales.',
      'Este artículo explica en detalle qué es cada barra, cómo funcionan los perdones como el <strong>I-601A</strong>, cuándo se necesita un <strong>I-212</strong>, y por qué salir del país sin un análisis legal previo puede ser uno de los errores más graves que puede cometer una persona indocumentada.',
      'Cada caso es diferente y la información aquí presentada tiene fines educativos. <strong>No sustituye la consulta con un abogado de inmigración.</strong>'
    ],
    sections: {
      whatAreBars: {
        title: '¿Qué son las barras de 3, 10 años y permanente?',
        subtitle: 'Tabla simple: tres penalidades por presencia ilegal',
        text: 'La ley de inmigración de Estados Unidos (INA §212(a)(9)(B) y §212(a)(9)(C)) establece tres niveles de penalidad dependiendo de cuánto tiempo permaneciste sin estatus legal y cómo saliste del país. Estas barras no son sentencias de un juez, sino consecuencias automáticas que se activan al momento de la partida.',
        cards: [
          {
            title: 'Barra de 3 años',
            text: 'Se aplica si acumulaste entre <strong>180 días y 1 año de presencia ilegal</strong> y luego saliste voluntariamente de EE. UU. Durante 3 años a partir de tu salida, no puedes ser admitido legalmente al país. Esto afecta solicitudes de visa, peticiones familiares con proceso consular y cualquier intento de ingreso legal.'
          },
          {
            title: 'Barra de 10 años',
            text: 'Se activa cuando acumulaste <strong>más de 1 año de presencia ilegal</strong> y luego saliste o fuiste removido. Durante 10 años completos no puedes ser admitido a EE. UU. ni recibir una visa, salvo que obtengas un perdón aprobado antes de tu cita consular.'
          },
          {
            title: 'Barra permanente',
            text: 'Esta es la más severa. Se aplica si acumulaste <strong>más de 1 año de presencia ilegal en total</strong>, saliste del país, y luego <strong>intentaste reingresar ilegalmente o reingresaste sin inspección</strong>. En este caso, la barra no tiene fecha de vencimiento. Solo después de 10 años fuera del país podrías solicitar un permiso especial (I-212) para intentar regresar, y aun así no está garantizado.'
          }
        ],
        note: 'La presencia ilegal comienza a contarse desde los 18 años de edad. El tiempo acumulado antes de cumplir 18 generalmente no cuenta para estas barras.'
      },
      examples: {
        title: 'Ejemplos reales por línea de tiempo',
        subtitle: 'Escenarios comunes que vemos en la oficina',
        text: 'Para entender mejor cómo funcionan estas barras, veamos tres escenarios que reflejan situaciones comunes. Estos ejemplos son simplificados y cada caso real tiene detalles que pueden cambiar el resultado.',
        list: [
          '<strong>Escenario A:</strong> María entró sin visa a los 20 años. Vivió 8 meses sin estatus. Salió voluntariamente para tramitar una visa por su esposo ciudadano. Al salir, se activó la <strong>barra de 3 años</strong>. No puede regresar legalmente hasta que pasen esos 3 años, a menos que obtenga un perdón I-601A aprobado.',
          '<strong>Escenario B:</strong> Carlos entró a los 22 años sin inspección. Vivió 5 años en EE. UU. sin estatus. Su hermana ciudadana lo peticionó y le dijeron que fuera a Ciudad Juárez para la cita consular. Al salir, se activó la <strong>barra de 10 años</strong>. Sin un perdón I-601A pre-aprobado, Carlos no podrá regresar durante una década.',
          '<strong>Escenario C:</strong> Pedro fue deportado después de vivir 3 años sin estatus. Un año después, cruzó la frontera ilegalmente de nuevo. Esto activó la <strong>barra permanente</strong>. Pedro necesitaría esperar al menos 10 años fuera de EE. UU. y luego solicitar un I-212, con posibilidades muy limitadas de éxito.'
        ],
        note: 'Estos escenarios son ilustrativos. La evaluación real requiere revisión de antecedentes, fechas exactas de entrada y salida, y posibles excepciones legales.'
      },
      waiver601A: {
        title: '¿Cuándo sirve un perdón provisional I-601A?',
        subtitle: 'El perdón más usado para barras de presencia ilegal',
        text: 'El formulario I-601A es un perdón provisional (provisional unlawful presence waiver) que permite a ciertas personas solicitar una exención de la barra de 3 o 10 años <strong>antes de salir de EE. UU.</strong> para su cita consular. Esto significa que puedes pedir el perdón mientras todavía estás en el país, y si se aprueba, viajar a tu cita sabiendo que la barra ya fue perdonada.',
        list: [
          'Solo aplica para la barra de presencia ilegal (3 o 10 años), no para otras inadmisibilidades.',
          'Requiere demostrar que un familiar calificado (cónyuge o padre ciudadano o residente permanente) sufriría un <strong>daño extremo</strong> si no se aprueba el perdón.',
          'Debe existir una petición familiar aprobada (como I-130) con cita consular programada o programable.',
          'No se puede usar si tienes una orden de deportación activa o ciertos antecedentes penales graves.'
        ],
        note: 'El I-601A se presenta ante USCIS mientras estás en EE. UU. Si se aprueba, viajas al consulado con mayor seguridad. Si se niega, puedes apelar o replantear el caso sin haber salido del país.'
      },
      i212: {
        title: '¿Cuándo necesitas además un I-212?',
        subtitle: 'Permiso especial para reingresar después de una deportación',
        text: 'El formulario I-212 (Application for Permission to Reapply for Admission) es necesario cuando una persona fue <strong>deportada, removida, o salió bajo una orden de remoción</strong> y quiere volver a ser admitida en EE. UU. Este permiso es distinto al I-601A y a veces se necesitan ambos.',
        list: [
          'Es obligatorio si fuiste formalmente deportado o removido, independientemente de cuántos años hayan pasado.',
          'También puede ser necesario si saliste voluntariamente bajo una orden de salida voluntaria y no cumpliste el plazo.',
          'Para la barra permanente, debes esperar <strong>10 años fuera de EE. UU.</strong> antes de poder siquiera presentar el I-212.',
          'La aprobación del I-212 es discrecional: USCIS evalúa la gravedad de la violación, tus lazos familiares, historial criminal y otros factores.'
        ],
        note: 'Un I-212 aprobado no garantiza la visa ni la admisión. Solo te autoriza a solicitar de nuevo. Muchas personas necesitan el I-212 más el I-601A para cubrir tanto la deportación previa como la presencia ilegal.'
      },
      mistakes: {
        title: 'Errores graves: salir sin análisis previo',
        subtitle: 'Lo que más vemos en consultas con familias afectadas',
        text: 'El error más común y más devastador que vemos en nuestra práctica es cuando una persona sale de EE. UU. sin haber consultado con un abogado de inmigración. Muchas veces lo hacen porque alguien les dijo que "ya pueden arreglar" o porque un familiar los peticionó y les llegó una cita consular. Pero salir sin análisis previo puede activar una barra que no tenían antes de salir.',
        list: [
          '<strong>Salir para la cita consular sin I-601A aprobado:</strong> si tienes más de 180 días de presencia ilegal, al salir se activa la barra automáticamente. Sin el perdón pre-aprobado, el consulado te negará la visa y quedarás atrapado fuera.',
          '<strong>Confundir salida voluntaria con remoción:</strong> una salida voluntaria concedida por un juez no es lo mismo que una deportación formal. Sin embargo, si no cumples el plazo de salida voluntaria, se convierte en orden de remoción con consecuencias adicionales.',
          '<strong>Reingreso ilegal después de haber sido deportado:</strong> esto puede activar la barra permanente y además constituye un delito federal bajo INA §276, con posibles cargos criminales.',
          '<strong>No verificar si tienes una orden de deportación previa:</strong> muchas personas no saben que tienen una orden de remoción in absentia (porque no asistieron a corte). Salir del país con esa orden activa complica todo exponencialmente.'
        ],
        warning: 'Nunca salgas de EE. UU. para una cita consular o por cualquier otra razón migratoria sin antes recibir un análisis legal completo de tu historial. Un error aquí puede costarte 10 años o más fuera del país.'
      },
      evaluate: {
        title: '¿Cómo evaluar si conviene ir al consulado, esperar o buscar otra vía?',
        subtitle: 'No existe una respuesta universal',
        text: 'La decisión de salir de EE. UU. para un trámite consular versus quedarse y buscar otras opciones es una de las más importantes en un caso migratorio. No existe una respuesta correcta para todos. Depende de factores muy específicos de cada persona.',
        list: [
          '<strong>Si tienes un I-601A aprobado y una petición familiar con cita consular:</strong> generalmente es seguro viajar. El perdón ya cubre la barra de presencia ilegal.',
          '<strong>Si tu familiar te peticionó pero no tienes perdón aprobado:</strong> no salgas. Primero solicita el I-601A y espera la aprobación. Salir antes podría activar la barra sin remedio inmediato.',
          '<strong>Si tienes una orden de deportación previa:</strong> necesitas evaluar si un I-212 es viable antes de cualquier movimiento. Además, podrías necesitar reabrir tu caso de corte.',
          '<strong>Si calificas para otro beneficio dentro de EE. UU.:</strong> en algunos casos, opciones como ajuste de estatus bajo INA §245(i), VAWA, Visa U, Visa T o asilo pueden resolverse sin salir del país y sin activar barras.'
        ],
        note: 'Un abogado de inmigración puede hacer un análisis de riesgo personalizado revisando tus fechas de entrada, salida, órdenes previas, antecedentes y opciones disponibles. No confíes en consejos generales de redes sociales.'
      },
      faq: {
        title: 'Preguntas Frecuentes',
        items: [
          {
            q: '¿La barra de 3 o 10 años se activa si nunca salgo de EE. UU.?',
            a: '<strong>No.</strong> Las barras de presencia ilegal solo se activan al momento de salir del país. Mientras permanezcas dentro de EE. UU., la barra no se "prende". Sin embargo, esto no significa que tu presencia ilegal no tenga otras consecuencias, como la imposibilidad de ajustar estatus en ciertos casos.'
          },
          {
            q: '¿El I-601A sirve para la barra permanente?',
            a: '<strong>No.</strong> El perdón provisional I-601A solo cubre la barra de presencia ilegal de 3 o 10 años. Si tienes la barra permanente (por reingreso ilegal después de presencia ilegal de más de 1 año), necesitas un I-212 y posiblemente un I-601 completo, no el provisional. Los requisitos son más estrictos y el proceso es diferente.'
          },
          {
            q: '¿Cuánto tiempo tarda el I-601A en ser aprobado?',
            a: 'Los tiempos de procesamiento varían, pero generalmente el I-601A puede tardar entre <strong>6 meses y más de 2 años</strong> dependiendo de la carga de trabajo de USCIS y la complejidad del caso. Es importante no hacer planes de viaje hasta tener la aprobación en mano.'
          },
          {
            q: '¿Puedo pedir el I-601A si entré con visa pero me quedé más tiempo?',
            a: '<strong>Sí.</strong> El I-601A aplica tanto para personas que entraron sin inspección como para quienes entraron legalmente con visa y se quedaron más allá del tiempo autorizado (overstay). Lo que importa es la acumulación de presencia ilegal, no el método de entrada. Sin embargo, si entraste sin inspección, podrías tener problemas adicionales para ajustar estatus que el I-601A no resuelve.'
          },
          {
            q: '¿Qué pasa si me deportaron hace más de 10 años, puedo regresar?',
            a: 'Depende del tipo de orden. Si fue una remoción formal y han pasado más de 10 años, <strong>podrías solicitar un I-212</strong> para pedir permiso de readmisión. Pero la aprobación es discrecional y depende de muchos factores. Si además tienes barra permanente por reingreso ilegal, el camino es significativamente más difícil. Es indispensable la evaluación de un abogado.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusión',
        text: 'Las barras de 3 años, 10 años y permanente son consecuencias reales que afectan a miles de familias cada año. No son mitos ni amenazas vacías: se activan automáticamente cuando una persona con presencia ilegal sale de EE. UU. sin la protección legal adecuada. La buena noticia es que existen herramientas legales como el I-601A y el I-212 que pueden ayudar en muchos casos.',
        advice: 'Si tú o un familiar están considerando salir del país para una cita consular, o si ya tienen una orden de deportación previa, es absolutamente indispensable consultar con un abogado de inmigración antes de dar cualquier paso. Una decisión equivocada puede costarte una década o más lejos de tu familia.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'USCIS – Unlawful Presence and Bars to Admissibility (INA §212(a)(9)(B))',
          'USCIS – Provisional Unlawful Presence Waivers (I-601A)',
          'USCIS – Application for Permission to Reapply for Admission (I-212)',
          'American Immigration Lawyers Association – Unlawful Presence Bars Overview',
          'INA §212(a)(9)(C) – Permanent Bar for Illegal Reentry'
        ]
      }
    }
  },
  en: {
    metaTitle: '3 and 10 Year Bars: Unlawful Presence and How to Avoid Them',
    metaDesc: 'Did you leave the U.S. after being undocumented? Learn about the 3-year, 10-year, and permanent bars, the I-601A waiver, and how to protect yourself.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '11 min read',
      tags: 'Unlawful Presence Bars',
      date: 'Apr 22, 2026',
      time: '11 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: '3 and 10 Year Bars for Unlawful Presence: What They Are, How They Affect You, and What Options Exist',
    summary: {
      title: 'Initial Summary',
      text: 'If you lived in the United States without legal status and left the country, you could be subject to a <strong>3-year, 10-year, or even permanent bar</strong> that prevents you from returning legally. These penalties are triggered at the moment of departure, not before. Understanding when they apply, when a waiver is available, and when it is better to wait can make the difference between moving forward with your case or being trapped outside the country for years.'
    },
    intro: [
      'One of the most difficult situations in immigration is discovering that, upon leaving the United States, a <strong>penalty was triggered that prevents you from legally returning for years</strong>. Many families do not find out until it is too late.',
      'The so-called "bars" for unlawful presence are penalties that the law imposes when a person accumulates time without status in the U.S. and then leaves or is removed from the country. These bars <strong>are not triggered while you are inside the country</strong>; they are triggered when you leave.',
      'This article explains in detail what each bar is, how waivers like the <strong>I-601A</strong> work, when an <strong>I-212</strong> is needed, and why leaving the country without prior legal analysis can be one of the most serious mistakes an undocumented person can make.',
      'Every case is different and the information presented here is for educational purposes. <strong>It does not replace consultation with an immigration attorney.</strong>'
    ],
    sections: {
      whatAreBars: {
        title: 'What Are the 3-Year, 10-Year, and Permanent Bars?',
        subtitle: 'Simple breakdown: three penalties for unlawful presence',
        text: 'United States immigration law (INA §212(a)(9)(B) and §212(a)(9)(C)) establishes three levels of penalty depending on how long you remained without legal status and how you left the country. These bars are not sentences from a judge but automatic consequences triggered at the moment of departure.',
        cards: [
          {
            title: '3-Year Bar',
            text: 'This applies if you accumulated between <strong>180 days and 1 year of unlawful presence</strong> and then voluntarily left the U.S. For 3 years from your departure date, you cannot be legally admitted to the country. This affects visa applications, family petitions with consular processing, and any attempt at legal entry.'
          },
          {
            title: '10-Year Bar',
            text: 'This is triggered when you accumulated <strong>more than 1 year of unlawful presence</strong> and then left or were removed. For 10 full years you cannot be admitted to the U.S. or receive a visa, unless you obtain an approved waiver before your consular appointment.'
          },
          {
            title: 'Permanent Bar',
            text: 'This is the most severe. It applies if you accumulated <strong>more than 1 year of total unlawful presence</strong>, left the country, and then <strong>attempted to reenter illegally or reentered without inspection</strong>. In this case, the bar has no expiration date. Only after 10 years outside the country could you apply for a special permit (I-212) to attempt to return, and even then approval is not guaranteed.'
          }
        ],
        note: 'Unlawful presence begins counting from age 18. Time accumulated before turning 18 generally does not count toward these bars.'
      },
      examples: {
        title: 'Real Examples by Timeline',
        subtitle: 'Common scenarios we see in our office',
        text: 'To better understand how these bars work, let us look at three scenarios that reflect common situations. These examples are simplified and every real case has details that can change the outcome.',
        list: [
          '<strong>Scenario A:</strong> Maria entered without a visa at age 20. She lived 8 months without status. She left voluntarily to process a visa through her U.S. citizen husband. Upon leaving, the <strong>3-year bar</strong> was triggered. She cannot legally return until those 3 years pass, unless she obtains an approved I-601A waiver.',
          '<strong>Scenario B:</strong> Carlos entered at age 22 without inspection. He lived 5 years in the U.S. without status. His U.S. citizen sister petitioned him and he was told to go to Ciudad Juarez for the consular appointment. Upon leaving, the <strong>10-year bar</strong> was triggered. Without a pre-approved I-601A waiver, Carlos cannot return for a decade.',
          '<strong>Scenario C:</strong> Pedro was deported after living 3 years without status. One year later, he crossed the border illegally again. This triggered the <strong>permanent bar</strong>. Pedro would need to wait at least 10 years outside the U.S. and then apply for an I-212, with very limited chances of success.'
        ],
        note: 'These scenarios are illustrative. Actual evaluation requires review of records, exact entry and exit dates, and possible legal exceptions.'
      },
      waiver601A: {
        title: 'When Does an I-601A Provisional Waiver Help?',
        subtitle: 'The most commonly used waiver for unlawful presence bars',
        text: 'Form I-601A is a provisional waiver (provisional unlawful presence waiver) that allows certain individuals to request an exemption from the 3 or 10 year bar <strong>before leaving the U.S.</strong> for their consular appointment. This means you can request the waiver while still in the country, and if approved, travel to your appointment knowing the bar has already been forgiven.',
        list: [
          'It only applies to the unlawful presence bar (3 or 10 years), not to other grounds of inadmissibility.',
          'It requires demonstrating that a qualifying relative (U.S. citizen or permanent resident spouse or parent) would suffer <strong>extreme hardship</strong> if the waiver is not approved.',
          'There must be an approved family petition (such as I-130) with a consular appointment scheduled or schedulable.',
          'It cannot be used if you have an active deportation order or certain serious criminal records.'
        ],
        note: 'The I-601A is filed with USCIS while you are in the U.S. If approved, you travel to the consulate with greater security. If denied, you can appeal or restrategize without having left the country.'
      },
      i212: {
        title: 'When Do You Also Need an I-212?',
        subtitle: 'Special permission to reenter after deportation',
        text: 'Form I-212 (Application for Permission to Reapply for Admission) is necessary when a person was <strong>deported, removed, or left under a removal order</strong> and wants to be readmitted to the U.S. This permission is different from the I-601A and sometimes both are needed.',
        list: [
          'It is mandatory if you were formally deported or removed, regardless of how many years have passed.',
          'It may also be necessary if you left voluntarily under a voluntary departure order and did not meet the deadline.',
          'For the permanent bar, you must wait <strong>10 years outside the U.S.</strong> before you can even file the I-212.',
          'I-212 approval is discretionary: USCIS evaluates the severity of the violation, your family ties, criminal history, and other factors.'
        ],
        note: 'An approved I-212 does not guarantee the visa or admission. It only authorizes you to apply again. Many people need the I-212 plus the I-601A to cover both the prior deportation and the unlawful presence.'
      },
      mistakes: {
        title: 'Serious Mistakes: Leaving Without Prior Analysis',
        subtitle: 'What we see most in consultations with affected families',
        text: 'The most common and most devastating mistake we see in our practice is when a person leaves the U.S. without having consulted with an immigration attorney. Many times they do it because someone told them they "can now fix their papers" or because a family member petitioned them and a consular appointment arrived. But leaving without prior analysis can trigger a bar they did not have before leaving.',
        list: [
          '<strong>Leaving for the consular appointment without an approved I-601A:</strong> if you have more than 180 days of unlawful presence, the bar is automatically triggered upon departure. Without the pre-approved waiver, the consulate will deny your visa and you will be stuck outside.',
          '<strong>Confusing voluntary departure with removal:</strong> a voluntary departure granted by a judge is not the same as a formal deportation. However, if you do not meet the voluntary departure deadline, it converts into a removal order with additional consequences.',
          '<strong>Illegal reentry after deportation:</strong> this can trigger the permanent bar and also constitutes a federal crime under INA §276, with possible criminal charges.',
          '<strong>Not checking whether you have a prior deportation order:</strong> many people do not know they have an in absentia removal order (because they did not attend court). Leaving the country with that active order complicates everything exponentially.'
        ],
        warning: 'Never leave the U.S. for a consular appointment or for any other immigration reason without first receiving a complete legal analysis of your history. A mistake here can cost you 10 years or more away from your family.'
      },
      evaluate: {
        title: 'How to Evaluate Whether to Go to the Consulate, Wait, or Seek Another Path',
        subtitle: 'There is no universal answer',
        text: 'The decision to leave the U.S. for a consular process versus staying and seeking other options is one of the most important decisions in an immigration case. There is no single right answer for everyone. It depends on very specific factors for each person.',
        list: [
          '<strong>If you have an approved I-601A and a family petition with a consular appointment:</strong> it is generally safe to travel. The waiver already covers the unlawful presence bar.',
          '<strong>If your relative petitioned you but you do not have an approved waiver:</strong> do not leave. First apply for the I-601A and wait for approval. Leaving before could trigger the bar with no immediate remedy.',
          '<strong>If you have a prior deportation order:</strong> you need to evaluate whether an I-212 is viable before any move. Additionally, you may need to reopen your court case.',
          '<strong>If you qualify for another benefit inside the U.S.:</strong> in some cases, options such as adjustment of status under INA §245(i), VAWA, U Visa, T Visa, or asylum can be resolved without leaving the country and without triggering bars.'
        ],
        note: 'An immigration attorney can provide a personalized risk analysis reviewing your entry dates, departure dates, prior orders, records, and available options. Do not rely on general social media advice.'
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'Is the 3 or 10 year bar triggered if I never leave the U.S.?',
            a: '<strong>No.</strong> The unlawful presence bars are only triggered at the moment you leave the country. As long as you remain inside the U.S., the bar is not activated. However, this does not mean your unlawful presence has no other consequences, such as the inability to adjust status in certain cases.'
          },
          {
            q: 'Does the I-601A work for the permanent bar?',
            a: '<strong>No.</strong> The provisional waiver I-601A only covers the 3 or 10 year unlawful presence bar. If you have the permanent bar (due to illegal reentry after more than 1 year of unlawful presence), you need an I-212 and possibly a full I-601, not the provisional one. The requirements are stricter and the process is different.'
          },
          {
            q: 'How long does the I-601A take to be approved?',
            a: 'Processing times vary, but generally the I-601A can take between <strong>6 months and more than 2 years</strong> depending on the USCIS workload and the complexity of the case. It is important not to make travel plans until you have the approval in hand.'
          },
          {
            q: 'Can I apply for the I-601A if I entered with a visa but overstayed?',
            a: '<strong>Yes.</strong> The I-601A applies to both people who entered without inspection and those who entered legally with a visa and stayed beyond the authorized period (overstay). What matters is the accumulation of unlawful presence, not the method of entry. However, if you entered without inspection, you may have additional problems adjusting status that the I-601A does not solve.'
          },
          {
            q: 'What if I was deported more than 10 years ago, can I return?',
            a: 'It depends on the type of order. If it was a formal removal and more than 10 years have passed, <strong>you could apply for an I-212</strong> to request permission for readmission. But approval is discretionary and depends on many factors. If you also have a permanent bar due to illegal reentry, the path is significantly more difficult. An attorney evaluation is indispensable.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusion',
        text: 'The 3-year, 10-year, and permanent bars are real consequences that affect thousands of families every year. They are not myths or empty threats: they are automatically triggered when a person with unlawful presence leaves the U.S. without proper legal protection. The good news is that legal tools like the I-601A and I-212 can help in many cases.',
        advice: 'If you or a family member are considering leaving the country for a consular appointment, or if you already have a prior deportation order, it is absolutely essential to consult with an immigration attorney before taking any step. A wrong decision can cost you a decade or more away from your family.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'USCIS – Unlawful Presence and Bars to Admissibility (INA §212(a)(9)(B))',
          'USCIS – Provisional Unlawful Presence Waivers (I-601A)',
          'USCIS – Application for Permission to Reapply for Admission (I-212)',
          'American Immigration Lawyers Association – Unlawful Presence Bars Overview',
          'INA §212(a)(9)(C) – Permanent Bar for Illegal Reentry'
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
    path: `/${lang}/blog/barras-3-10-anos-presencia-ilegal`,
    title: t.title,
    description: t.metaDesc,
    images: [{ url: IMAGES.article, alt: t.title }],
    type: 'article',
    publishedTime: '2026-04-22T08:00:00.000Z',
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
      tags: ['Barras', 'Presencia Ilegal', 'I-601A', 'Deportación', 'Castigo 10 Años'],
    },
    twitter: social.twitter,
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/barras-3-10-anos-presencia-ilegal`,
      languages: {
        'es': `${SITE_URL}/es/blog/barras-3-10-anos-presencia-ilegal`,
        'en': `${SITE_URL}/en/blog/barras-3-10-anos-presencia-ilegal`,
        'x-default': `${SITE_URL}/es/blog/barras-3-10-anos-presencia-ilegal`,
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
    { name: t.title, url: `/${lang}/blog/barras-3-10-anos-presencia-ilegal` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="barras-3-10-anos-presencia-ilegal"
        date="2026-04-22"
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
                     alt="Barras de 3 y 10 años por presencia ilegal"
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

                  {/* whatAreBars */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Timer size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whatAreBars.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.whatAreBars.subtitle}</p>
                    <p className="mb-4">{t.sections.whatAreBars.text}</p>

                    <div className="grid gap-6 mt-6 mb-6">
                      {t.sections.whatAreBars.cards.map((card, i) => (
                        <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10">
                          <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                            <Ban size={20} className="text-[#B2904D]" /> {card.title}
                          </h3>
                          <p className="text-blue-50/80 m-0" dangerouslySetInnerHTML={{ __html: card.text }} />
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.whatAreBars.note}
                    </div>
                  </section>

                  {/* examples */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><FileText size={24} className="text-[#B2904D]" /></div>
                      {t.sections.examples.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.examples.subtitle}</p>
                    <p className="mb-4">{t.sections.examples.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.examples.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <Lightbulb size={24} className="text-[#B2904D] shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.examples.note}
                    </div>
                  </section>

                  {/* Imagen interior 1 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside1}
                       alt="Perdón I-601A presencia ilegal"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* waiver601A */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><ShieldCheck size={24} className="text-[#B2904D]" /></div>
                      {t.sections.waiver601A.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.waiver601A.subtitle}</p>
                    <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.sections.waiver601A.text }} />
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.waiver601A.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.waiver601A.note}
                    </div>
                  </section>

                  {/* i212 */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><RotateCcw size={24} className="text-[#B2904D]" /></div>
                      {t.sections.i212.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.i212.subtitle}</p>
                    <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.sections.i212.text }} />
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.i212.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.i212.note}
                    </div>
                  </section>

                  {/* Imagen interior 2 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside2}
                       alt="Errores comunes barras presencia ilegal"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* mistakes */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><AlertTriangle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.mistakes.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.mistakes.subtitle}</p>
                    <p className="mb-4">{t.sections.mistakes.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.mistakes.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 p-5 bg-red-500/10 rounded-xl border border-red-500/20">
                      <p className="text-red-400 font-bold m-0 flex items-start gap-2">
                        <AlertTriangle size={20} className="shrink-0 mt-1" />
                        {t.sections.mistakes.warning}
                      </p>
                    </div>
                  </section>

                  {/* evaluate */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Scale size={24} className="text-[#B2904D]" /></div>
                      {t.sections.evaluate.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.evaluate.subtitle}</p>
                    <p className="mb-4">{t.sections.evaluate.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.evaluate.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.evaluate.note}
                    </div>
                  </section>

                  {/* FAQ */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><MessageCircle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.faq.title}
                    </h2>
                    <div className="space-y-6">
                      {t.sections.faq.items.map((item, i) => (
                        <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10">
                          <h3 className="text-white font-bold text-lg mb-3 flex items-start gap-3">
                            <span className="text-[#B2904D] font-bold shrink-0">P:</span> {item.q}
                          </h3>
                          <p className="text-blue-50/80 m-0" dangerouslySetInnerHTML={{ __html: item.a }} />
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
            articles={getRelatedArticles('barras-3-10-anos-presencia-ilegal', (lang as 'es' | 'en') || 'es')}
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
