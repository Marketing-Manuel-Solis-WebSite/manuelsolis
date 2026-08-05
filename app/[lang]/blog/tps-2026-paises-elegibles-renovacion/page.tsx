import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle,
  Lightbulb, Quote, TrendingUp, Award, Heart, Star, MessageCircle,
  Send, ArrowUpRight, ShieldCheck, FileText, User, Gavel, Search, Building2,
  Users, Baby, Globe, AlertTriangle, HelpCircle, MapPin, RefreshCw, Briefcase,
  XCircle, Scale, List
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
  article: '/blog/blog_21/B1_CR1.jpg',
  inside1: '/blog/blog_21/B1_CR2.jpg',
  inside2: '/blog/blog_21/B1_CR2.jpg',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'TPS 2026: Países Elegibles, Renovación y Si se Cancela',
    metaDesc: 'Guía TPS 2026: qué países siguen con TPS, cuáles fueron terminados, cómo renovar tu permiso de trabajo y qué hacer si perdiste el estatus. Abogado Manuel Solís.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '12 min de lectura',
      tags: 'TPS 2026',
      date: '10 Abr, 2026',
      time: '12 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'TPS 2026: ¿Tu país sigue protegido o fue terminado? Guía país por país',
    summary: {
      title: 'Resumen inicial',
      text: 'El Estatus de Protección Temporal (<strong>TPS</strong>) ha sido un salvavidas para cientos de miles de personas en Estados Unidos. Pero en 2026, el panorama está cambiando rápidamente: algunos países mantienen su designación, otros fueron terminados y algunos están atrapados en litigio federal. En este artículo explicamos <strong>país por país</strong> cuál es el estatus actual, qué hacer con tu permiso de trabajo, cómo renovar, y qué opciones existen si ya perdiste la protección.'
    },
    intro: [
      'El TPS fue creado para proteger a personas que no pueden regresar a sus países de origen debido a conflictos armados, desastres naturales u otras condiciones extraordinarias. Pero a diferencia de la residencia permanente, el TPS es <strong>temporal</strong> y depende de que el gobierno federal renueve la designación de cada país.',
      'En los últimos años, varias designaciones han sido terminadas, extendidas por orden judicial, o redesignadas bajo nuevos criterios. Esto ha generado una confusión masiva entre beneficiarios que no saben si su protección sigue vigente o si están acumulando presencia sin estatus legal.',
      'Lo más peligroso no es perder el TPS — es <strong>no darse cuenta de que ya lo perdiste</strong> y seguir usando un permiso de trabajo vencido o asumiendo que estás protegido cuando ya no lo estás.'
    ],
    sections: {
      countryStatus: {
        title: 'Qué países siguen con TPS y cuáles fueron terminados o están en litigio',
        text: 'A continuación presentamos el estatus actualizado de los países más relevantes para la comunidad hispana y otros beneficiarios de TPS. Cada caso tiene fechas y condiciones distintas.',
        countries: [
          {
            name: 'El Salvador',
            status: 'Extendido',
            statusColor: 'text-green-400',
            detail: 'La designación de El Salvador ha sido extendida hasta el <strong>9 de septiembre de 2026</strong>. Los beneficiarios deben haber reinscrito dentro del período establecido por USCIS. Si no reinscribiste a tiempo, podrías haber perdido la cobertura aunque tu país siga designado.'
          },
          {
            name: 'Venezuela (Designación 2021)',
            status: 'Terminado',
            statusColor: 'text-red-400',
            detail: 'La designación original de Venezuela de 2021 fue terminada efectivamente el <strong>7 de noviembre de 2025</strong>. Las personas cubiertas bajo esta designación que no tienen otra base legal pueden haber perdido su estatus de TPS.'
          },
          {
            name: 'Venezuela (Redesignación 2023)',
            status: 'En litigio',
            statusColor: 'text-amber-400',
            detail: 'La redesignación de 2023 está actualmente protegida por <strong>orden judicial</strong> y permanece válida hasta el <strong>2 de octubre de 2026</strong>. Esto significa que si calificas bajo esta redesignación, tu TPS sigue vigente mientras la orden judicial esté activa. Sin embargo, esto puede cambiar si el tribunal modifica su decisión.'
          },
          {
            name: 'Honduras',
            status: 'Terminado',
            statusColor: 'text-red-400',
            detail: 'La designación de Honduras fue terminada efectivamente el <strong>8 de septiembre de 2025</strong>. Los antiguos beneficiarios de TPS de Honduras que no tienen otro estatus migratorio válido necesitan explorar opciones alternativas urgentemente.'
          },
          {
            name: 'Ucrania',
            status: 'Extendido',
            statusColor: 'text-green-400',
            detail: 'Debido al conflicto armado en curso, la designación de Ucrania ha sido extendida hasta el <strong>19 de octubre de 2026</strong>. Los beneficiarios deben reinscribir dentro del plazo publicado en el Federal Register.'
          },
          {
            name: 'Haití',
            status: 'Bajo revisión',
            statusColor: 'text-amber-400',
            detail: 'La situación de Haití continúa siendo monitoreada. Dada la inestabilidad en el país, la designación ha tenido múltiples extensiones. Los beneficiarios deben verificar las fechas más recientes directamente en USCIS.gov, ya que los plazos pueden cambiar con poca antelación.'
          }
        ]
      },
      howToCheck: {
        title: 'Cómo revisar si tu TPS sigue vigente en 2026',
        text: 'No asumas que tu TPS sigue activo solo porque lo tenías antes. El estatus depende de varios factores que debes verificar personalmente.',
        steps: [
          'Revisa tu notificación de aprobación más reciente (I-797). Verifica la fecha de vencimiento exacta.',
          'Consulta el Federal Register o USCIS.gov para confirmar si tu país sigue designado y si hubo reinscripción.',
          'Verifica que hayas reinscrito dentro del plazo. Si no lo hiciste durante el período de registro, podrías haber perdido la cobertura.',
          'Revisa si tu EAD (permiso de trabajo) fue auto-extendido. No todos los EADs tienen extensión automática — solo aquellos cubiertos por un aviso del Federal Register.',
          'Si tienes dudas, consulta con un abogado de inmigración antes de asumir que estás cubierto. Un error aquí puede costarte el empleo o exponerte a deportación.'
        ],
        warning: 'Muchas personas descubren que ya no tienen TPS cuando intentan renovar su licencia de conducir o cuando su empleador verifica el I-9. Para ese momento, ya puede ser tarde.'
      },
      renewal: {
        title: 'Cómo renovar TPS y cuándo ya no se trata de renovar',
        text: 'La reinscripción de TPS no es automática. Cada vez que el gobierno anuncia una extensión o redesignación, publica un período de registro durante el cual debes enviar el formulario I-821 junto con las tarifas correspondientes.',
        points: [
          {
            subtitle: 'Reinscripción a tiempo',
            text: 'Si tu país sigue designado y tú enviaste tu reinscripción dentro del período publicado, tu TPS se extiende automáticamente mientras USCIS procesa tu solicitud. Recibirás un nuevo I-797 con las nuevas fechas.'
          },
          {
            subtitle: 'Reinscripción tardía (late filing)',
            text: 'USCIS puede aceptar reinscripciones tardías si demuestras buena causa para no haber registrado a tiempo. Pero esto no está garantizado. Situaciones como enfermedad grave, desastres naturales, o malos consejos de un notario podrían ser consideradas.'
          },
          {
            subtitle: 'Cuando ya no hay reinscripción',
            text: 'Si tu país fue terminado del programa TPS, ya no hay reinscripción posible. Lo que necesitas es explorar otras formas de alivio migratorio: asilo, petición familiar, Visa U, VAWA, cancelación de deportación, u otros beneficios para los que puedas calificar.'
          }
        ]
      },
      workPermit: {
        title: 'Qué pasa con tu permiso de trabajo (EAD)',
        text: 'El permiso de trabajo (Employment Authorization Document o EAD) es uno de los beneficios más importantes del TPS. Pero su validez está directamente ligada al estatus de la designación de tu país.',
        autoExtension: {
          subtitle: 'Extensiones automáticas del EAD',
          text: 'Cuando USCIS publica un aviso de extensión en el Federal Register, los EADs de beneficiarios elegibles se extienden automáticamente por un período determinado (generalmente 180 días, pero puede variar). Durante este tiempo, tu tarjeta física puede estar vencida, pero sigue siendo válida si presentas junto con ella el aviso del Federal Register.',
          list: [
            'Imprime y lleva contigo el aviso del Federal Register que aplica a tu país.',
            'Muestra tu EAD vencido junto con el aviso a tu empleador.',
            'El empleador está obligado a aceptar esta combinación como prueba de autorización de empleo.',
            'Si tu empleador se niega, esto podría constituir discriminación. Consulta con un abogado.'
          ]
        },
        noExtension: {
          subtitle: 'Cuando no hay extensión automática',
          text: 'Si tu país fue terminado del programa y no hay orden judicial que extienda la cobertura, tu EAD vence en la fecha indicada en la tarjeta. Después de esa fecha, trabajar con ese EAD es ilegal y puede generar consecuencias tanto para ti como para tu empleador.'
        }
      },
      lostTPS: {
        title: 'Qué hacer si perdiste TPS o tu país fue terminado',
        text: 'Perder el TPS no significa que no tengas opciones. Pero sí significa que necesitas actuar rápido y con estrategia. Quedarte sin hacer nada es la peor decisión.',
        options: [
          {
            name: 'Asilo',
            text: 'Si tienes miedo de regresar a tu país por persecución basada en raza, religión, nacionalidad, opinión política, o pertenencia a un grupo social particular, podrías solicitar asilo. Pero cuidado: hay plazos y requisitos estrictos.'
          },
          {
            name: 'Petición familiar',
            text: 'Si tienes un familiar ciudadano o residente que pueda peticionarte, esta podría ser una vía hacia la residencia permanente. Dependiendo de tu entrada al país, podrías necesitar un perdón (waiver) como el I-601A.'
          },
          {
            name: 'VAWA',
            text: 'Si has sufrido abuso por parte de un cónyuge, padre, o hijo ciudadano o residente, VAWA te permite solicitar estatus sin depender de tu agresor. Esta es una opción que muchas personas no conocen.'
          },
          {
            name: 'Visa U',
            text: 'Si fuiste víctima de un crimen grave en Estados Unidos y cooperaste con las autoridades, podrías calificar para la Visa U, que ofrece permiso de trabajo y eventualmente residencia.'
          },
          {
            name: 'Planificación preventiva',
            text: 'Incluso si hoy no calificas para otro beneficio, un abogado puede ayudarte a proteger tu récord, organizar tu documentación, y estar listo para cualquier cambio legislativo o ejecutivo en el futuro.'
          }
        ]
      },
      errors: {
        title: 'Errores que dañan el caso',
        text: 'Hemos visto cientos de casos de TPS afectados por errores evitables. Estos son los más comunes:',
        list: [
          {
            error: 'Usar notarios o consultores de inmigración',
            detail: 'Los notarios en Estados Unidos NO son abogados. Muchas personas pagan a "notarios" que llenan formularios incorrectamente, pierden plazos, o dan información falsa. Esto puede destruir un caso de TPS y cerrar otras opciones.'
          },
          {
            error: 'No reinscribir a tiempo',
            detail: 'El período de reinscripción suele ser de 60 días. Si lo dejas pasar, puedes perder tu estatus aunque tu país siga designado. No esperes al último día.'
          },
          {
            error: 'Asumir que TPS = green card',
            detail: 'El TPS es temporal. No conduce automáticamente a la residencia permanente. Muchas personas llevan 20 años con TPS sin entender que necesitan una estrategia separada para obtener residencia.'
          },
          {
            error: 'Confundir fechas de designación y redesignación',
            detail: 'En el caso de Venezuela, hay dos designaciones distintas con fechas y requisitos diferentes. Asumir que estás cubierto bajo la equivocada puede dejarte sin protección.'
          },
          {
            error: 'No guardar copias de toda la documentación',
            detail: 'Cada I-797, cada recibo, cada formulario enviado es evidencia de tu historial. Si USCIS pierde algo (y sí pasa), tus copias son tu único respaldo.'
          }
        ]
      },
      faq: {
        title: 'Preguntas Frecuentes sobre TPS en 2026',
        items: [
          {
            q: '¿Si mi país fue terminado del TPS, me van a deportar automáticamente?',
            a: 'No automáticamente. Perder el TPS no genera una orden de deportación por sí solo. Pero sí te deja sin estatus legal, lo cual te hace vulnerable. Es fundamental que busques otras opciones migratorias antes de que tu estatus termine completamente.'
          },
          {
            q: '¿Puedo seguir trabajando con mi EAD si mi TPS fue terminado?',
            a: 'Solo hasta la fecha de vencimiento de tu EAD o de la extensión automática publicada en el Federal Register. Después de esa fecha, tu permiso de trabajo ya no es válido y usarlo puede generar problemas legales tanto para ti como para tu empleador.'
          },
          {
            q: '¿El TPS me protege si tengo un récord criminal?',
            a: 'No necesariamente. Ciertos delitos pueden hacer que pierdas la elegibilidad para TPS. Si tienes cualquier arresto, condena, o caso penal pendiente, necesitas que un abogado revise cómo afecta tu estatus antes de reinscribir.'
          },
          {
            q: '¿Puedo pedir residencia si tengo TPS?',
            a: 'El TPS por sí solo no te da residencia. Sin embargo, si entraste legalmente a EE. UU. (con visa o inspección) y tienes una petición familiar aprobada, podrías ajustar tu estatus. Si entraste sin inspección, necesitarías un perdón o explorar otras vías.'
          },
          {
            q: '¿Qué pasa con mis hijos que nacieron aquí si yo pierdo el TPS?',
            a: 'Tus hijos nacidos en EE. UU. son ciudadanos americanos. Ellos no pierden su ciudadanía. Sin embargo, si tú pierdes estatus, tu situación podría complicarse. Cuando tus hijos cumplan 21 años, podrían peticionarte como familiar inmediato de ciudadano.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusión',
        text: 'El TPS en 2026 no es lo que era hace 5 años. Los cambios son constantes, las terminaciones son reales, y la confusión entre beneficiarios está en su punto más alto. Si dependes de TPS para vivir y trabajar en Estados Unidos, no puedes darte el lujo de asumir que todo sigue igual.',
        advice: 'Revisa tu caso hoy. Confirma tus fechas, verifica tu reinscripción, y habla con un abogado que entienda los matices del TPS en este momento político.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'USCIS – Temporary Protected Status (TPS) Designated Countries',
          'USCIS – TPS El Salvador Extension Notice',
          'Federal Register – TPS Venezuela Redesignation 2023',
          'USCIS – Employment Authorization for TPS Beneficiaries',
          'American Immigration Lawyers Association (AILA) – TPS Litigation Updates'
        ]
      }
    }
  },
  en: {
    metaTitle: 'TPS 2026: Eligible Countries, Renewal & If It Ends',
    metaDesc: 'TPS 2026 guide: which countries still have TPS, which were terminated, how to renew your work permit, and what to do if you lost status. Attorney Manuel Solís.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '12 min read',
      tags: 'TPS 2026',
      date: 'Apr 10, 2026',
      time: '12 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'TPS 2026: Is Your Country Still Protected or Was It Terminated? A Country-by-Country Guide',
    summary: {
      title: 'Initial Summary',
      text: 'Temporary Protected Status (<strong>TPS</strong>) has been a lifeline for hundreds of thousands of people in the United States. But in 2026, the landscape is changing rapidly: some countries maintain their designation, others were terminated, and some are caught in federal litigation. In this article, we explain <strong>country by country</strong> the current status, what to do with your work permit, how to renew, and what options exist if you have already lost protection.'
    },
    intro: [
      'TPS was created to protect individuals who cannot return to their home countries due to armed conflict, natural disasters, or other extraordinary conditions. But unlike permanent residency, TPS is <strong>temporary</strong> and depends on the federal government renewing each country\'s designation.',
      'In recent years, several designations have been terminated, extended by court order, or redesignated under new criteria. This has generated massive confusion among beneficiaries who don\'t know if their protection is still valid or if they are accumulating unlawful presence.',
      'The most dangerous thing is not losing TPS — it\'s <strong>not realizing you already lost it</strong> and continuing to use an expired work permit or assuming you are protected when you are not.'
    ],
    sections: {
      countryStatus: {
        title: 'Which Countries Still Have TPS and Which Were Terminated or Are in Litigation',
        text: 'Below we present the updated status of the most relevant countries for the Hispanic community and other TPS beneficiaries. Each case has different dates and conditions.',
        countries: [
          {
            name: 'El Salvador',
            status: 'Extended',
            statusColor: 'text-green-400',
            detail: 'El Salvador\'s designation has been extended until <strong>September 9, 2026</strong>. Beneficiaries must have re-registered within the period established by USCIS. If you did not re-register on time, you may have lost coverage even though your country is still designated.'
          },
          {
            name: 'Venezuela (2021 Designation)',
            status: 'Terminated',
            statusColor: 'text-red-400',
            detail: 'Venezuela\'s original 2021 designation was effectively terminated on <strong>November 7, 2025</strong>. Individuals covered under this designation who have no other legal basis may have lost their TPS status.'
          },
          {
            name: 'Venezuela (2023 Redesignation)',
            status: 'In litigation',
            statusColor: 'text-amber-400',
            detail: 'The 2023 redesignation is currently protected by a <strong>court order</strong> and remains valid until <strong>October 2, 2026</strong>. This means that if you qualify under this redesignation, your TPS remains active as long as the court order is in effect. However, this could change if the court modifies its decision.'
          },
          {
            name: 'Honduras',
            status: 'Terminated',
            statusColor: 'text-red-400',
            detail: 'Honduras\' designation was effectively terminated on <strong>September 8, 2025</strong>. Former TPS beneficiaries from Honduras who do not have another valid immigration status need to urgently explore alternative options.'
          },
          {
            name: 'Ukraine',
            status: 'Extended',
            statusColor: 'text-green-400',
            detail: 'Due to the ongoing armed conflict, Ukraine\'s designation has been extended until <strong>October 19, 2026</strong>. Beneficiaries must re-register within the deadline published in the Federal Register.'
          },
          {
            name: 'Haiti',
            status: 'Under review',
            statusColor: 'text-amber-400',
            detail: 'Haiti\'s situation continues to be monitored. Given the instability in the country, the designation has had multiple extensions. Beneficiaries should verify the most recent dates directly on USCIS.gov, as deadlines can change with little notice.'
          }
        ]
      },
      howToCheck: {
        title: 'How to Check If Your TPS Is Still Valid in 2026',
        text: 'Do not assume your TPS is still active just because you had it before. Status depends on several factors you must verify personally.',
        steps: [
          'Review your most recent approval notice (I-797). Verify the exact expiration date.',
          'Check the Federal Register or USCIS.gov to confirm whether your country is still designated and if there was a re-registration period.',
          'Verify that you re-registered within the deadline. If you did not during the registration period, you may have lost coverage.',
          'Check if your EAD (work permit) was auto-extended. Not all EADs have automatic extension — only those covered by a Federal Register notice.',
          'If you have doubts, consult with an immigration attorney before assuming you are covered. A mistake here can cost you your job or expose you to deportation.'
        ],
        warning: 'Many people discover they no longer have TPS when trying to renew their driver\'s license or when their employer verifies the I-9. By that point, it may be too late.'
      },
      renewal: {
        title: 'How to Renew TPS and When It\'s No Longer About Renewal',
        text: 'TPS re-registration is not automatic. Every time the government announces an extension or redesignation, it publishes a registration period during which you must submit Form I-821 along with the corresponding fees.',
        points: [
          {
            subtitle: 'Timely re-registration',
            text: 'If your country is still designated and you submitted your re-registration within the published period, your TPS extends automatically while USCIS processes your application. You will receive a new I-797 with the updated dates.'
          },
          {
            subtitle: 'Late filing',
            text: 'USCIS may accept late re-registrations if you demonstrate good cause for not registering on time. But this is not guaranteed. Situations like serious illness, natural disasters, or bad advice from a notario could be considered.'
          },
          {
            subtitle: 'When there is no more re-registration',
            text: 'If your country was terminated from the TPS program, there is no more re-registration. What you need is to explore other forms of immigration relief: asylum, family petition, U Visa, VAWA, cancellation of removal, or other benefits you may qualify for.'
          }
        ]
      },
      workPermit: {
        title: 'What Happens to Your Work Permit (EAD)',
        text: 'The Employment Authorization Document (EAD) is one of the most important benefits of TPS. But its validity is directly tied to the status of your country\'s designation.',
        autoExtension: {
          subtitle: 'Automatic EAD Extensions',
          text: 'When USCIS publishes an extension notice in the Federal Register, eligible beneficiaries\' EADs are automatically extended for a set period (generally 180 days, but it can vary). During this time, your physical card may be expired, but it remains valid if you present it along with the Federal Register notice.',
          list: [
            'Print and carry the Federal Register notice that applies to your country.',
            'Show your expired EAD along with the notice to your employer.',
            'The employer is required to accept this combination as proof of employment authorization.',
            'If your employer refuses, this could constitute discrimination. Consult with an attorney.'
          ]
        },
        noExtension: {
          subtitle: 'When there is no automatic extension',
          text: 'If your country was terminated from the program and there is no court order extending coverage, your EAD expires on the date shown on the card. After that date, working with that EAD is illegal and can generate consequences for both you and your employer.'
        }
      },
      lostTPS: {
        title: 'What to Do If You Lost TPS or Your Country Was Terminated',
        text: 'Losing TPS does not mean you have no options. But it does mean you need to act quickly and strategically. Doing nothing is the worst decision.',
        options: [
          {
            name: 'Asylum',
            text: 'If you fear returning to your country due to persecution based on race, religion, nationality, political opinion, or membership in a particular social group, you could apply for asylum. But be careful: there are strict deadlines and requirements.'
          },
          {
            name: 'Family petition',
            text: 'If you have a U.S. citizen or resident family member who can petition for you, this could be a path to permanent residency. Depending on your entry to the country, you may need a waiver such as the I-601A.'
          },
          {
            name: 'VAWA',
            text: 'If you have suffered abuse at the hands of a citizen or resident spouse, parent, or child, VAWA allows you to apply for status without depending on your abuser. This is an option many people do not know about.'
          },
          {
            name: 'U Visa',
            text: 'If you were the victim of a serious crime in the United States and cooperated with law enforcement, you could qualify for the U Visa, which offers a work permit and eventually permanent residency.'
          },
          {
            name: 'Preventive planning',
            text: 'Even if you don\'t qualify for another benefit today, an attorney can help you protect your record, organize your documentation, and be ready for any legislative or executive change in the future.'
          }
        ]
      },
      errors: {
        title: 'Mistakes That Damage Your Case',
        text: 'We have seen hundreds of TPS cases affected by avoidable mistakes. These are the most common:',
        list: [
          {
            error: 'Using notarios or immigration consultants',
            detail: 'Notarios in the United States are NOT attorneys. Many people pay "notarios" who fill out forms incorrectly, miss deadlines, or provide false information. This can destroy a TPS case and close off other options.'
          },
          {
            error: 'Not re-registering on time',
            detail: 'The re-registration period is usually 60 days. If you let it pass, you can lose your status even though your country is still designated. Do not wait until the last day.'
          },
          {
            error: 'Assuming TPS = green card',
            detail: 'TPS is temporary. It does not automatically lead to permanent residency. Many people have been on TPS for 20 years without understanding they need a separate strategy to obtain residency.'
          },
          {
            error: 'Confusing designation and redesignation dates',
            detail: 'In Venezuela\'s case, there are two distinct designations with different dates and requirements. Assuming you are covered under the wrong one can leave you without protection.'
          },
          {
            error: 'Not keeping copies of all documentation',
            detail: 'Every I-797, every receipt, every form submitted is evidence of your history. If USCIS loses something (and it does happen), your copies are your only backup.'
          }
        ]
      },
      faq: {
        title: 'Frequently Asked Questions About TPS in 2026',
        items: [
          {
            q: 'If my country was terminated from TPS, will I be deported automatically?',
            a: 'Not automatically. Losing TPS does not generate a deportation order by itself. But it does leave you without legal status, making you vulnerable. It is essential that you seek other immigration options before your status fully expires.'
          },
          {
            q: 'Can I continue working with my EAD if my TPS was terminated?',
            a: 'Only until the expiration date of your EAD or the automatic extension published in the Federal Register. After that date, your work permit is no longer valid, and using it can create legal problems for both you and your employer.'
          },
          {
            q: 'Does TPS protect me if I have a criminal record?',
            a: 'Not necessarily. Certain offenses can make you ineligible for TPS. If you have any arrest, conviction, or pending criminal case, you need an attorney to review how it affects your status before re-registering.'
          },
          {
            q: 'Can I apply for permanent residency if I have TPS?',
            a: 'TPS alone does not give you residency. However, if you entered the U.S. legally (with a visa or inspection) and have an approved family petition, you could adjust your status. If you entered without inspection, you would need a waiver or need to explore other paths.'
          },
          {
            q: 'What happens to my U.S.-born children if I lose TPS?',
            a: 'Your children born in the U.S. are American citizens. They do not lose their citizenship. However, if you lose status, your situation could become complicated. When your children turn 21, they could petition for you as an immediate relative of a citizen.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusion',
        text: 'TPS in 2026 is not what it was 5 years ago. Changes are constant, terminations are real, and confusion among beneficiaries is at an all-time high. If you depend on TPS to live and work in the United States, you cannot afford to assume everything is the same.',
        advice: 'Review your case today. Confirm your dates, verify your re-registration, and speak with an attorney who understands the nuances of TPS in this political moment.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'USCIS – Temporary Protected Status (TPS) Designated Countries',
          'USCIS – TPS El Salvador Extension Notice',
          'Federal Register – TPS Venezuela Redesignation 2023',
          'USCIS – Employment Authorization for TPS Beneficiaries',
          'American Immigration Lawyers Association (AILA) – TPS Litigation Updates'
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
    path: `/${lang}/blog/tps-2026-paises-elegibles-renovacion`,
    title: t.title,
    description: t.metaDesc,
    images: [{ url: IMAGES.article, alt: t.title }],
    type: 'article',
    publishedTime: '2026-04-10T08:00:00.000Z',
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
      tags: ['TPS', 'Estatus de Protección Temporal', 'Venezuela', 'El Salvador', 'Honduras'],
    },
    twitter: social.twitter,
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/tps-2026-paises-elegibles-renovacion`,
      languages: {
        'es': `${SITE_URL}/es/blog/tps-2026-paises-elegibles-renovacion`,
        'en': `${SITE_URL}/en/blog/tps-2026-paises-elegibles-renovacion`,
        'x-default': `${SITE_URL}/es/blog/tps-2026-paises-elegibles-renovacion`,
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
    { name: t.title, url: `/${lang}/blog/tps-2026-paises-elegibles-renovacion` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="tps-2026-paises-elegibles-renovacion"
        date="2026-04-10"
        image={IMAGES.article}
        lang={lang as string}
        readTime="12"
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
                     alt="TPS 2026 países elegibles renovación estatus protección temporal"
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

                  {/* Sección 1: Estatus por país */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Globe size={24} className="text-[#B2904D]" /></div>
                      {t.sections.countryStatus.title}
                    </h2>
                    <p className="mb-8">{t.sections.countryStatus.text}</p>
                    <div className="grid gap-4">
                      {t.sections.countryStatus.countries.map((country, i) => (
                        <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-white font-bold text-lg flex items-center gap-2">
                              <MapPin size={18} className="text-[#B2904D]" /> {country.name}
                            </h4>
                            <span className={`text-xs font-bold uppercase tracking-widest ${country.statusColor}`}>
                              {country.status}
                            </span>
                          </div>
                          <p className="text-sm m-0" dangerouslySetInnerHTML={{ __html: country.detail }} />
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Sección 2: Cómo revisar */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Search size={24} className="text-[#B2904D]" /></div>
                      {t.sections.howToCheck.title}
                    </h2>
                    <p className="mb-6">{t.sections.howToCheck.text}</p>
                    <ul className="grid gap-4 mt-6 list-none pl-0">
                      {t.sections.howToCheck.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <span className="shrink-0 w-8 h-8 rounded-full bg-[#B2904D] text-[#001540] flex items-center justify-center font-bold text-sm">{i + 1}</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-sm text-red-300 mt-6">
                      <AlertTriangle size={16} className="inline mr-2" />
                      {t.sections.howToCheck.warning}
                    </div>
                  </section>

                  {/* Imagen interior 1 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside1}
                       alt="TPS renovación reinscripción permiso de trabajo"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 3: Renovar TPS */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><RefreshCw size={24} className="text-[#B2904D]" /></div>
                      {t.sections.renewal.title}
                    </h2>
                    <p className="mb-8">{t.sections.renewal.text}</p>
                    {t.sections.renewal.points.map((point, i) => (
                      <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-4">
                        <h4 className="text-[#B2904D] font-bold uppercase tracking-widest mb-3 text-sm">{point.subtitle}</h4>
                        <p className="m-0">{point.text}</p>
                      </div>
                    ))}
                  </section>

                  {/* Sección 4: Permiso de trabajo */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Briefcase size={24} className="text-[#B2904D]" /></div>
                      {t.sections.workPermit.title}
                    </h2>
                    <p className="mb-6">{t.sections.workPermit.text}</p>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-4">
                      <h4 className="text-[#B2904D] font-bold uppercase tracking-widest mb-3 text-sm">{t.sections.workPermit.autoExtension.subtitle}</h4>
                      <p className="mb-4">{t.sections.workPermit.autoExtension.text}</p>
                      <ul className="grid gap-3 mt-4 list-none pl-0">
                        {t.sections.workPermit.autoExtension.list.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                            <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                      <h4 className="text-[#B2904D] font-bold uppercase tracking-widest mb-3 text-sm">{t.sections.workPermit.noExtension.subtitle}</h4>
                      <p className="m-0">{t.sections.workPermit.noExtension.text}</p>
                    </div>
                  </section>

                  {/* Imagen interior 2 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside2}
                       alt="TPS terminado opciones migratorias alternativas"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 5: Qué hacer si perdiste TPS */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><ShieldCheck size={24} className="text-[#B2904D]" /></div>
                      {t.sections.lostTPS.title}
                    </h2>
                    <p className="mb-8">{t.sections.lostTPS.text}</p>
                    <div className="grid gap-4">
                      {t.sections.lostTPS.options.map((option, i) => (
                        <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                          <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-[#B2904D]" /> {option.name}
                          </h4>
                          <p className="m-0 text-sm">{option.text}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Sección 6: Errores */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><XCircle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.errors.title}
                    </h2>
                    <p className="mb-6">{t.sections.errors.text}</p>
                    <div className="grid gap-4">
                      {t.sections.errors.list.map((item, i) => (
                        <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                          <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                            <AlertCircle size={18} /> {item.error}
                          </h4>
                          <p className="m-0 text-sm">{item.detail}</p>
                        </div>
                      ))}
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
            articles={getRelatedArticles('tps-2026-paises-elegibles-renovacion', (lang as 'es' | 'en') || 'es')}
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
