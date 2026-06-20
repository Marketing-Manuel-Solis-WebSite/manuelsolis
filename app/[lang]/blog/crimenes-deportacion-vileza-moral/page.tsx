import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import {
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle,
  Lightbulb, Quote, TrendingUp, Award, Heart, Star, MessageCircle,
  Send, ArrowUpRight, ShieldCheck, FileText, User, Gavel, Search, Building2,
  Users, Baby, Globe, AlertTriangle, HelpCircle, Scale, XCircle, Ban,
  Fingerprint, BookOpen, Shield, Siren
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
  article: '/blog/blog_22/B2_CR1.jpg',
  inside1: '/blog/blog_22/B2_CR2.jpg',
  inside2: '/blog/blog_22/B2_CR2.jpg',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Crímenes que Causan Deportación: Vileza Moral (CIMT) y Defensa Criminal en Inmigración',
    metaDesc: 'Guía sobre cómo los delitos afectan tu estatus migratorio. Vileza moral (CIMT), deportabilidad vs inadmisibilidad, petty offense, y por qué un récord sellado no desaparece para inmigración.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '11 min de lectura',
      tags: 'Crímenes y Deportación',
      date: '14 Abr, 2025',
      time: '11 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'Crímenes que causan deportación: vileza moral, CIMT y lo que nadie te explica',
    summary: {
      title: 'Resumen inicial',
      text: 'Un arresto puede destruir un caso migratorio en cuestión de horas. No importa si fue un malentendido, si te declaraste culpable para "salir rápido" del juzgado, o si tu abogado criminal nunca te preguntó por tu estatus migratorio. En inmigración, lo que importa no es el nombre común del delito, sino el <strong>estatuto penal</strong> bajo el cual fuiste condenado. Este artículo explica qué es la vileza moral (CIMT), cuándo un delito te hace deportable o inadmisible, y por qué un récord sellado no te salva ante USCIS.'
    },
    intro: [
      'La intersección entre la ley criminal y la ley de inmigración es una de las áreas más complejas y mal entendidas del sistema legal en Estados Unidos. Cada año, miles de personas pierden sus posibilidades de obtener residencia, ciudadanía, o cualquier beneficio migratorio porque cometieron — o se declararon culpables de — un delito sin entender las consecuencias migratorias.',
      'El problema no siempre es el delito en sí. Muchas veces es la forma en que se resolvió el caso criminal. Un abogado de defensa criminal que no entiende inmigración puede aceptar un <strong>plea deal</strong> (acuerdo de culpabilidad) que parece favorable en el juzgado penal pero que automáticamente activa la deportación.',
      'Si tienes cualquier contacto con el sistema de justicia penal y no eres ciudadano estadounidense, necesitas entender cómo funciona este sistema <strong>antes</strong> de tomar cualquier decisión en tu caso criminal.'
    ],
    sections: {
      whatIsCIMT: {
        title: 'Qué significa vileza moral en inmigración',
        text: 'CIMT son las siglas de <strong>Crime Involving Moral Turpitude</strong> — en español, delito que involucra vileza moral. No existe una lista cerrada de qué delitos califican, pero el concepto generalmente incluye conducta que es inherentemente vil, depravada o contraria a las reglas de la moralidad aceptada.',
        examples: [
          'Fraude (cheques falsos, robo de identidad, fraude al gobierno, fraude fiscal)',
          'Robo con intención de privar permanentemente al dueño de su propiedad',
          'Agresión con intención de causar daño grave',
          'Delitos sexuales',
          'Ciertos delitos de drogas dependiendo del estatuto'
        ],
        note: 'Lo que importa no es cómo llamas al delito en la calle. Lo que importa es el texto exacto del estatuto penal bajo el cual fuiste condenado. Dos personas acusadas de "robo" pueden tener consecuencias migratorias completamente diferentes dependiendo del código penal específico de su estado.',
        keyPoint: 'Un juez de inmigración aplica lo que se conoce como el "categorical approach" — analiza los elementos del estatuto, no los hechos del caso. Esto significa que aunque tu conducta real no haya sido grave, si el estatuto bajo el cual te condenaron incluye elementos de vileza moral, el sistema migratorio te tratará como si lo fuera.'
      },
      deportVsInadmiss: {
        title: 'Cuándo un delito te vuelve deportable y cuándo inadmisible',
        text: 'Estas son dos categorías distintas con consecuencias diferentes. Entender la diferencia es fundamental.',
        deportable: {
          subtitle: 'Deportabilidad (INA § 237)',
          text: 'Se aplica a personas que ya están dentro de Estados Unidos, incluyendo residentes permanentes. Te vuelves deportable si:',
          list: [
            'Cometes un CIMT dentro de los primeros 5 años después de tu admisión y la pena máxima posible es de más de 1 año.',
            'Cometes dos o más CIMTs en cualquier momento (sin importar cuándo).',
            'Cometes un "aggravated felony" (delito agravado) según la definición de inmigración.',
            'Cometes ciertos delitos de drogas (excepto posesión simple de menos de 30 gramos de marihuana en algunos contextos).',
            'Cometes delitos de violencia doméstica, stalking, o violación de orden de protección.'
          ]
        },
        inadmissible: {
          subtitle: 'Inadmisibilidad (INA § 212)',
          text: 'Se aplica cuando solicitas entrada, visa, ajuste de estatus, o cualquier beneficio migratorio. Eres inadmisible si:',
          list: [
            'Fuiste condenado o admites haber cometido un CIMT (con excepciones limitadas).',
            'Tienes cualquier condena por drogas controladas.',
            'Tienes múltiples condenas con penas agregadas de 5 años o más.',
            'Hay razón para creer que eres traficante de drogas.',
            'Cometiste fraude o tergiversación material para obtener un beneficio migratorio.'
          ]
        },
        warning: 'Una persona puede ser inadmisible sin ser deportable, y viceversa. El análisis debe hacerse caso por caso con un abogado que entienda ambas leyes.'
      },
      categories: {
        title: 'Categorías de delitos que generan problemas migratorios',
        text: 'A continuación presentamos las categorías más comunes de delitos que afectan casos migratorios. Cada una tiene sus matices.',
        items: [
          {
            name: 'Fraude',
            icon: 'fraud',
            detail: 'Incluye fraude con cheques, tarjetas de crédito, identidad, impuestos, beneficios del gobierno, y fraude migratorio. Casi siempre califica como CIMT porque involucra engaño intencional. Incluso montos pequeños pueden tener consecuencias graves.'
          },
          {
            name: 'Robo y hurto',
            icon: 'theft',
            detail: 'El robo generalmente es CIMT si el estatuto requiere intención de privar permanentemente al dueño. El hurto menor (shoplifting) puede o no ser CIMT dependiendo del estado y del estatuto exacto. La diferencia entre un misdemeanor y un felony no es lo que determina el impacto migratorio.'
          },
          {
            name: 'Violencia y asalto',
            icon: 'violence',
            detail: 'El asalto simple generalmente no es CIMT. Pero el asalto agravado, asalto con arma, o asalto con intención de causar daño serio sí lo es. La violencia doméstica tiene su propia categoría en la ley de inmigración y puede hacerte deportable independientemente del CIMT.'
          },
          {
            name: 'Delitos sexuales',
            icon: 'sexual',
            detail: 'Casi todos los delitos sexuales son CIMT. Muchos también califican como "aggravated felony" para propósitos de inmigración. Las condenas por delitos sexuales son extremadamente difíciles de superar en el contexto migratorio.'
          },
          {
            name: 'Drogas',
            icon: 'drugs',
            detail: 'Cualquier condena por drogas controladas te hace inadmisible, con la posible excepción de posesión simple de menos de 30 gramos de marihuana (primera ofensa). Para deportabilidad, las reglas son ligeramente diferentes. Cuidado con la marihuana: aunque sea legal en tu estado, sigue siendo ilegal a nivel federal y para inmigración.'
          },
          {
            name: 'DUI (Manejar bajo la influencia)',
            icon: 'dui',
            detail: 'Un DUI simple generalmente NO es CIMT. Pero un DUI con agravantes (licencia suspendida, accidente con heridos, menores en el vehículo, DUI múltiples) puede convertirse en un problema migratorio serio. Además, el DUI puede afectar determinaciones de "buen carácter moral" necesarias para ciudadanía, cancelación de deportación, y otros beneficios.'
          }
        ]
      },
      pettyOffense: {
        title: 'Excepción de petty offense y otros escenarios',
        text: 'No todo está perdido si tienes un CIMT. La ley contempla una excepción importante conocida como la excepción de "petty offense" (delito menor).',
        requirements: {
          subtitle: 'Requisitos para la excepción petty offense',
          list: [
            'Fue tu único delito que involucra vileza moral.',
            'La pena máxima posible por el delito no excede 1 año de cárcel.',
            'La sentencia impuesta no fue mayor a 6 meses de cárcel.',
            'No tienes otro CIMT (ni siquiera un intento).'
          ]
        },
        youthful: {
          subtitle: 'Excepción por delito juvenil',
          text: 'Si cometiste el CIMT cuando eras menor de 18 años y han pasado más de 5 años desde la condena o la liberación, podrías estar exento de inadmisibilidad. Pero esta excepción tiene interpretaciones diferentes según el circuito judicial.'
        },
        oneConviction: {
          subtitle: 'Una sola condena',
          text: 'Si solo tienes una condena por CIMT y fue cometida más de 5 años después de tu admisión a EE. UU., y la pena máxima posible era de 1 año o menos, podrías no ser deportable. Pero sigues siendo potencialmente inadmisible si solicitas un beneficio.'
        },
        warning: 'Estas excepciones son técnicas y requieren análisis legal detallado. No asumas que calificas sin consultar un abogado.'
      },
      whatNotToDo: {
        title: 'Qué NO debes hacer si te arrestaron',
        text: 'Las primeras decisiones después de un arresto son las más críticas para tu futuro migratorio. Estos son los errores que no puedes cometer:',
        list: [
          {
            action: 'No te declares culpable sin consultar un abogado de inmigración',
            detail: 'El plea deal que parece "bueno" en el juzgado criminal puede ser catastrófico para inmigración. Incluso un misdemeanor con probation puede hacerte deportable o inadmisible.'
          },
          {
            action: 'No asumas que tu abogado criminal entiende inmigración',
            detail: 'La Corte Suprema en Padilla v. Kentucky (2010) dictaminó que los abogados criminales tienen la obligación de asesorar a sus clientes no ciudadanos sobre consecuencias migratorias. Pero en la práctica, muchos no lo hacen.'
          },
          {
            action: 'No hables con agentes de ICE sin un abogado',
            detail: 'Después de un arresto, ICE puede emitir un detainer (retención migratoria). No firmes nada ni hagas declaraciones sin representación legal.'
          },
          {
            action: 'No ignores el caso criminal pensando que "no es grave"',
            detail: 'Una orden de arresto pendiente por no presentarte al tribunal puede complicar enormemente un caso migratorio futuro. Resuelve todo caso criminal con estrategia migratoria.'
          },
          {
            action: 'No busques solo al abogado más barato',
            detail: 'La coordinación entre un abogado criminal y un abogado de inmigración es esencial. El plea deal debe ser diseñado considerando ambas áreas del derecho simultáneamente.'
          }
        ]
      },
      expunged: {
        title: 'Récord sellado o expunged: ¿desaparece para inmigración?',
        text: 'Esta es una de las creencias más peligrosas que existe. La respuesta corta es: <strong>no, un récord sellado o expunged no desaparece para inmigración</strong>.',
        explanation: [
          'Bajo la ley federal de inmigración, una condena sigue siendo una condena aunque haya sido expunged (borrada) bajo la ley estatal. USCIS y los jueces de inmigración pueden ver y considerar estas condenas.',
          'La única excepción limitada es bajo el Federal First Offender Act (FFOA) para ciertos delitos de posesión simple de drogas. Si tu caso fue diferido bajo un equivalente estatal del FFOA, podría no contar como condena para inmigración. Pero esta excepción es muy específica.',
          'Lo mismo aplica para récords juveniles que fueron sellados. Aunque a nivel estatal ya no existen, inmigración puede acceder a ellos y usarlos en su análisis.'
        ],
        warning: 'Si alguien te dijo que tu récord "ya no existe" porque fue expunged, necesitas una segunda opinión de un abogado de inmigración. Muchas personas descubren en su entrevista de ciudadanía o ajuste que el récord sigue ahí.'
      },
      faq: {
        title: 'Preguntas Frecuentes sobre Crímenes e Inmigración',
        items: [
          {
            q: '¿Un arresto sin condena afecta mi caso migratorio?',
            a: 'Un arresto sin condena generalmente no debería hacerte deportable o inadmisible. Sin embargo, USCIS puede considerar la conducta subyacente en ciertas determinaciones, como buen carácter moral. Además, si admitiste los elementos del delito durante el arresto, eso podría contar como una "admisión" para propósitos de inadmisibilidad.'
          },
          {
            q: '¿Puedo ser deportado por un misdemeanor?',
            a: 'Sí. La distinción entre misdemeanor y felony es de la ley estatal. La ley de inmigración tiene sus propias categorías. Un misdemeanor que involucre vileza moral, drogas, violencia doméstica, o que califique como aggravated felony bajo la definición federal, puede hacerte deportable.'
          },
          {
            q: '¿Si mi cónyuge ciudadano me peticionó, estoy protegido de deportación por un delito?',
            a: 'No. Tener una petición familiar aprobada no te protege de deportación si cometes un delito que te hace deportable. De hecho, el delito puede impedir que ajustes estatus y te puede hacer inadmisible, cerrando la puerta al beneficio que tu cónyuge solicitó.'
          },
          {
            q: '¿La marihuana recreacional legal en mi estado me afecta para inmigración?',
            a: 'Sí. La marihuana sigue siendo una sustancia controlada a nivel federal. Admitir uso de marihuana, tener una tarjeta médica de marihuana, o trabajar en la industria del cannabis puede hacerte inadmisible ante USCIS, incluso si nunca fuiste arrestado.'
          },
          {
            q: '¿Necesito un abogado criminal y un abogado de inmigración al mismo tiempo?',
            a: 'Idealmente, sí. O al menos un abogado criminal que trabaje en coordinación con un abogado de inmigración. El plea deal en el caso criminal debe ser diseñado teniendo en cuenta las consecuencias migratorias. Un acuerdo que evita cárcel pero que te hace deportable no es un buen acuerdo.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusión',
        text: 'Un delito puede cerrar puertas migratorias que tomaron años en abrirse. Pero con la estrategia correcta — coordinación entre abogado criminal y de inmigración, análisis del estatuto exacto, y planificación desde el primer momento — muchos casos pueden manejarse para minimizar o eliminar las consecuencias migratorias.',
        advice: 'Si tienes un caso criminal abierto, un arresto reciente, o un récord que te preocupa, no esperes hasta tu cita con USCIS para descubrir el problema. Consulta ahora.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'INA § 212(a)(2) – Inadmisibilidad por Conducta Criminal',
          'INA § 237(a)(2) – Deportabilidad por Conducta Criminal',
          'Padilla v. Kentucky, 559 U.S. 356 (2010)',
          'USCIS Policy Manual – Volume 12, Part F: Adjudication of Criminal Convictions',
          'American Immigration Lawyers Association (AILA) – Criminal Immigration Guide'
        ]
      }
    }
  },
  en: {
    metaTitle: 'Crimes That Cause Deportation: Moral Turpitude (CIMT) and Criminal Defense in Immigration',
    metaDesc: 'Guide on how crimes affect your immigration status. Moral turpitude (CIMT), deportability vs inadmissibility, petty offense exception, and why an expunged record does not disappear for immigration.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '11 min read',
      tags: 'Crimes & Deportation',
      date: 'Apr 14, 2025',
      time: '11 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'Crimes That Cause Deportation: Moral Turpitude, CIMT, and What Nobody Explains',
    summary: {
      title: 'Initial Summary',
      text: 'An arrest can destroy an immigration case in a matter of hours. It does not matter if it was a misunderstanding, if you pleaded guilty to "get out quickly" from the courthouse, or if your criminal attorney never asked about your immigration status. In immigration, what matters is not the common name of the offense, but the <strong>criminal statute</strong> under which you were convicted. This article explains what moral turpitude (CIMT) means, when a crime makes you deportable or inadmissible, and why an expunged record does not save you before USCIS.'
    },
    intro: [
      'The intersection of criminal law and immigration law is one of the most complex and misunderstood areas of the legal system in the United States. Every year, thousands of people lose their chances of obtaining residency, citizenship, or any immigration benefit because they committed — or pleaded guilty to — an offense without understanding the immigration consequences.',
      'The problem is not always the offense itself. Often it is the way the criminal case was resolved. A criminal defense attorney who does not understand immigration can accept a <strong>plea deal</strong> that looks favorable in criminal court but automatically triggers deportation.',
      'If you have any contact with the criminal justice system and you are not a U.S. citizen, you need to understand how this system works <strong>before</strong> making any decision in your criminal case.'
    ],
    sections: {
      whatIsCIMT: {
        title: 'What Moral Turpitude Means in Immigration',
        text: 'CIMT stands for <strong>Crime Involving Moral Turpitude</strong>. There is no closed list of which crimes qualify, but the concept generally includes conduct that is inherently vile, depraved, or contrary to accepted rules of morality.',
        examples: [
          'Fraud (bad checks, identity theft, government fraud, tax fraud)',
          'Theft with intent to permanently deprive the owner of their property',
          'Assault with intent to cause serious harm',
          'Sexual offenses',
          'Certain drug offenses depending on the statute'
        ],
        note: 'What matters is not what you call the crime on the street. What matters is the exact text of the criminal statute under which you were convicted. Two people charged with "theft" can have completely different immigration consequences depending on the specific penal code of their state.',
        keyPoint: 'An immigration judge applies what is known as the "categorical approach" — analyzing the elements of the statute, not the facts of the case. This means that even if your actual conduct was not serious, if the statute under which you were convicted includes elements of moral turpitude, the immigration system will treat you as if it were.'
      },
      deportVsInadmiss: {
        title: 'When a Crime Makes You Deportable and When It Makes You Inadmissible',
        text: 'These are two distinct categories with different consequences. Understanding the difference is fundamental.',
        deportable: {
          subtitle: 'Deportability (INA § 237)',
          text: 'Applies to people who are already inside the United States, including permanent residents. You become deportable if:',
          list: [
            'You commit a CIMT within the first 5 years after admission and the maximum possible sentence is more than 1 year.',
            'You commit two or more CIMTs at any time (regardless of when).',
            'You commit an "aggravated felony" as defined by immigration law.',
            'You commit certain drug offenses (except simple possession of less than 30 grams of marijuana in some contexts).',
            'You commit domestic violence crimes, stalking, or violation of a protective order.'
          ]
        },
        inadmissible: {
          subtitle: 'Inadmissibility (INA § 212)',
          text: 'Applies when you apply for entry, visa, adjustment of status, or any immigration benefit. You are inadmissible if:',
          list: [
            'You were convicted or admit to having committed a CIMT (with limited exceptions).',
            'You have any conviction for controlled substances.',
            'You have multiple convictions with aggregate sentences of 5 years or more.',
            'There is reason to believe you are a drug trafficker.',
            'You committed fraud or material misrepresentation to obtain an immigration benefit.'
          ]
        },
        warning: 'A person can be inadmissible without being deportable, and vice versa. The analysis must be done case by case with an attorney who understands both areas of law.'
      },
      categories: {
        title: 'Categories of Crimes That Create Immigration Problems',
        text: 'Below we present the most common categories of crimes that affect immigration cases. Each one has its nuances.',
        items: [
          {
            name: 'Fraud',
            icon: 'fraud',
            detail: 'Includes check fraud, credit card fraud, identity theft, tax fraud, government benefit fraud, and immigration fraud. Almost always qualifies as CIMT because it involves intentional deception. Even small amounts can have serious consequences.'
          },
          {
            name: 'Theft and larceny',
            icon: 'theft',
            detail: 'Theft is generally CIMT if the statute requires intent to permanently deprive the owner. Petty theft (shoplifting) may or may not be CIMT depending on the state and the exact statute. The difference between a misdemeanor and a felony is not what determines the immigration impact.'
          },
          {
            name: 'Violence and assault',
            icon: 'violence',
            detail: 'Simple assault is generally not CIMT. But aggravated assault, assault with a weapon, or assault with intent to cause serious harm is. Domestic violence has its own category in immigration law and can make you deportable regardless of the CIMT analysis.'
          },
          {
            name: 'Sexual offenses',
            icon: 'sexual',
            detail: 'Nearly all sexual offenses are CIMT. Many also qualify as "aggravated felonies" for immigration purposes. Convictions for sexual offenses are extremely difficult to overcome in the immigration context.'
          },
          {
            name: 'Drugs',
            icon: 'drugs',
            detail: 'Any conviction for controlled substances makes you inadmissible, with the possible exception of simple possession of less than 30 grams of marijuana (first offense). For deportability, the rules are slightly different. Be careful with marijuana: even though it may be legal in your state, it remains illegal at the federal level and for immigration purposes.'
          },
          {
            name: 'DUI (Driving Under the Influence)',
            icon: 'dui',
            detail: 'A simple DUI is generally NOT CIMT. But a DUI with aggravating factors (suspended license, accident with injuries, minors in the vehicle, multiple DUIs) can become a serious immigration problem. Additionally, DUI can affect "good moral character" determinations needed for citizenship, cancellation of removal, and other benefits.'
          }
        ]
      },
      pettyOffense: {
        title: 'Petty Offense Exception and Other Scenarios',
        text: 'Not all is lost if you have a CIMT. The law includes an important exception known as the "petty offense" exception.',
        requirements: {
          subtitle: 'Requirements for the petty offense exception',
          list: [
            'It was your only crime involving moral turpitude.',
            'The maximum possible penalty for the offense does not exceed 1 year in jail.',
            'The sentence imposed was no more than 6 months in jail.',
            'You have no other CIMT (not even an attempt).'
          ]
        },
        youthful: {
          subtitle: 'Youthful offender exception',
          text: 'If you committed the CIMT when you were under 18 and more than 5 years have passed since the conviction or release, you may be exempt from inadmissibility. But this exception has different interpretations depending on the judicial circuit.'
        },
        oneConviction: {
          subtitle: 'Single conviction',
          text: 'If you only have one CIMT conviction and it was committed more than 5 years after your admission to the U.S., and the maximum possible penalty was 1 year or less, you may not be deportable. But you remain potentially inadmissible if you apply for a benefit.'
        },
        warning: 'These exceptions are technical and require detailed legal analysis. Do not assume you qualify without consulting an attorney.'
      },
      whatNotToDo: {
        title: 'What NOT to Do If You Were Arrested',
        text: 'The first decisions after an arrest are the most critical for your immigration future. These are the mistakes you cannot make:',
        list: [
          {
            action: 'Do not plead guilty without consulting an immigration attorney',
            detail: 'The plea deal that looks "good" in criminal court can be catastrophic for immigration. Even a misdemeanor with probation can make you deportable or inadmissible.'
          },
          {
            action: 'Do not assume your criminal attorney understands immigration',
            detail: 'The Supreme Court in Padilla v. Kentucky (2010) ruled that criminal attorneys have an obligation to advise non-citizen clients about immigration consequences. But in practice, many do not.'
          },
          {
            action: 'Do not speak with ICE agents without an attorney',
            detail: 'After an arrest, ICE may issue a detainer. Do not sign anything or make statements without legal representation.'
          },
          {
            action: 'Do not ignore the criminal case thinking it is "not serious"',
            detail: 'An outstanding arrest warrant for failure to appear can enormously complicate a future immigration case. Resolve every criminal case with immigration strategy in mind.'
          },
          {
            action: 'Do not just look for the cheapest attorney',
            detail: 'Coordination between a criminal attorney and an immigration attorney is essential. The plea deal must be designed considering both areas of law simultaneously.'
          }
        ]
      },
      expunged: {
        title: 'Sealed or Expunged Record: Does It Disappear for Immigration?',
        text: 'This is one of the most dangerous beliefs that exists. The short answer is: <strong>no, a sealed or expunged record does not disappear for immigration</strong>.',
        explanation: [
          'Under federal immigration law, a conviction remains a conviction even if it has been expunged under state law. USCIS and immigration judges can see and consider these convictions.',
          'The only limited exception is under the Federal First Offender Act (FFOA) for certain simple drug possession offenses. If your case was deferred under a state equivalent of the FFOA, it may not count as a conviction for immigration. But this exception is very specific.',
          'The same applies to juvenile records that were sealed. Although they no longer exist at the state level, immigration can access them and use them in their analysis.'
        ],
        warning: 'If someone told you your record "no longer exists" because it was expunged, you need a second opinion from an immigration attorney. Many people find out at their citizenship or adjustment interview that the record is still there.'
      },
      faq: {
        title: 'Frequently Asked Questions About Crimes and Immigration',
        items: [
          {
            q: 'Does an arrest without a conviction affect my immigration case?',
            a: 'An arrest without a conviction generally should not make you deportable or inadmissible. However, USCIS can consider the underlying conduct in certain determinations, such as good moral character. Additionally, if you admitted the elements of the crime during the arrest, that could count as an "admission" for inadmissibility purposes.'
          },
          {
            q: 'Can I be deported for a misdemeanor?',
            a: 'Yes. The distinction between misdemeanor and felony belongs to state law. Immigration law has its own categories. A misdemeanor involving moral turpitude, drugs, domestic violence, or that qualifies as an aggravated felony under the federal definition can make you deportable.'
          },
          {
            q: 'If my citizen spouse petitioned for me, am I protected from deportation for a crime?',
            a: 'No. Having an approved family petition does not protect you from deportation if you commit a deportable offense. In fact, the crime can prevent you from adjusting status and make you inadmissible, closing the door on the benefit your spouse applied for.'
          },
          {
            q: 'Does legal recreational marijuana in my state affect me for immigration?',
            a: 'Yes. Marijuana remains a controlled substance at the federal level. Admitting marijuana use, having a medical marijuana card, or working in the cannabis industry can make you inadmissible before USCIS, even if you were never arrested.'
          },
          {
            q: 'Do I need a criminal attorney and an immigration attorney at the same time?',
            a: 'Ideally, yes. Or at least a criminal attorney working in coordination with an immigration attorney. The plea deal in the criminal case must be designed with immigration consequences in mind. An agreement that avoids jail but makes you deportable is not a good deal.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusion',
        text: 'A criminal offense can close immigration doors that took years to open. But with the right strategy — coordination between criminal and immigration attorneys, analysis of the exact statute, and planning from the very first moment — many cases can be managed to minimize or eliminate immigration consequences.',
        advice: 'If you have an open criminal case, a recent arrest, or a record that concerns you, do not wait until your USCIS appointment to discover the problem. Consult now.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'INA § 212(a)(2) – Inadmissibility Based on Criminal Conduct',
          'INA § 237(a)(2) – Deportability Based on Criminal Conduct',
          'Padilla v. Kentucky, 559 U.S. 356 (2010)',
          'USCIS Policy Manual – Volume 12, Part F: Adjudication of Criminal Convictions',
          'American Immigration Lawyers Association (AILA) – Criminal Immigration Guide'
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
      url: `${SITE_URL}/${lang}/blog/crimenes-deportacion-vileza-moral`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
      type: 'article',
      publishedTime: '2025-04-14T08:00:00.000Z',
      authors: ['Manuel Solís'],
      section: 'Ley Criminal',
      tags: ['Crímenes', 'Deportación', 'Vileza Moral', 'CIMT', 'Defensa Criminal'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.metaDesc,
      images: [imageUrl],
      creator: '@AbogadoMSolis',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/crimenes-deportacion-vileza-moral`,
      languages: {
        'es': `${SITE_URL}/es/blog/crimenes-deportacion-vileza-moral`,
        'en': `${SITE_URL}/en/blog/crimenes-deportacion-vileza-moral`,
        'x-default': `${SITE_URL}/es/blog/crimenes-deportacion-vileza-moral`,
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
    { name: t.title, url: `/${lang}/blog/crimenes-deportacion-vileza-moral` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="crimenes-deportacion-vileza-moral"
        date="2025-04-14"
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
        category="Ley Criminal"
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
                     alt="Crímenes deportación vileza moral CIMT defensa criminal inmigración"
                     fill
                     sizes="(max-width: 1024px) 100vw, 760px"
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

                  {/* Sección 1: Qué es CIMT */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Scale size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whatIsCIMT.title}
                    </h2>
                    <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.sections.whatIsCIMT.text }} />
                    <ul className="grid gap-3 mt-6 mb-6 list-none pl-0">
                      {t.sections.whatIsCIMT.examples.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D] mb-4">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.whatIsCIMT.note}
                    </div>
                    <p className="text-white font-medium">{t.sections.whatIsCIMT.keyPoint}</p>
                  </section>

                  {/* Sección 2: Deportabilidad vs Inadmisibilidad */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Gavel size={24} className="text-[#B2904D]" /></div>
                      {t.sections.deportVsInadmiss.title}
                    </h2>
                    <p className="mb-8">{t.sections.deportVsInadmiss.text}</p>

                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 mb-6">
                      <h4 className="text-[#B2904D] font-bold uppercase tracking-widest mb-4 text-sm">{t.sections.deportVsInadmiss.deportable.subtitle}</h4>
                      <p className="mb-4">{t.sections.deportVsInadmiss.deportable.text}</p>
                      <ul className="grid gap-3 mt-4 list-none pl-0">
                        {t.sections.deportVsInadmiss.deportable.list.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                            <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 mb-6">
                      <h4 className="text-[#B2904D] font-bold uppercase tracking-widest mb-4 text-sm">{t.sections.deportVsInadmiss.inadmissible.subtitle}</h4>
                      <p className="mb-4">{t.sections.deportVsInadmiss.inadmissible.text}</p>
                      <ul className="grid gap-3 mt-4 list-none pl-0">
                        {t.sections.deportVsInadmiss.inadmissible.list.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                            <Ban size={24} className="text-amber-400 shrink-0 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-sm text-red-300">
                      <AlertTriangle size={16} className="inline mr-2" />
                      {t.sections.deportVsInadmiss.warning}
                    </div>
                  </section>

                  {/* Imagen interior 1 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside1}
                       alt="Categorías de delitos que afectan inmigración"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 3: Categorías de delitos */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><FileText size={24} className="text-[#B2904D]" /></div>
                      {t.sections.categories.title}
                    </h2>
                    <p className="mb-8">{t.sections.categories.text}</p>
                    <div className="grid gap-4">
                      {t.sections.categories.items.map((item, i) => (
                        <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                          <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                            <Gavel size={18} className="text-[#B2904D]" /> {item.name}
                          </h4>
                          <p className="m-0 text-sm">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Sección 4: Petty offense */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><ShieldCheck size={24} className="text-[#B2904D]" /></div>
                      {t.sections.pettyOffense.title}
                    </h2>
                    <p className="mb-6">{t.sections.pettyOffense.text}</p>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-4">
                      <h4 className="text-[#B2904D] font-bold uppercase tracking-widest mb-3 text-sm">{t.sections.pettyOffense.requirements.subtitle}</h4>
                      <ul className="grid gap-3 mt-4 list-none pl-0">
                        {t.sections.pettyOffense.requirements.list.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                            <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-4">
                      <h4 className="text-[#B2904D] font-bold uppercase tracking-widest mb-3 text-sm">{t.sections.pettyOffense.youthful.subtitle}</h4>
                      <p className="m-0">{t.sections.pettyOffense.youthful.text}</p>
                    </div>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-4">
                      <h4 className="text-[#B2904D] font-bold uppercase tracking-widest mb-3 text-sm">{t.sections.pettyOffense.oneConviction.subtitle}</h4>
                      <p className="m-0">{t.sections.pettyOffense.oneConviction.text}</p>
                    </div>

                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.pettyOffense.warning}
                    </div>
                  </section>

                  {/* Sección 5: Qué NO hacer */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><XCircle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whatNotToDo.title}
                    </h2>
                    <p className="mb-6">{t.sections.whatNotToDo.text}</p>
                    <div className="grid gap-4">
                      {t.sections.whatNotToDo.list.map((item, i) => (
                        <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                          <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                            <AlertCircle size={18} /> {item.action}
                          </h4>
                          <p className="m-0 text-sm">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Imagen interior 2 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside2}
                       alt="Récord criminal expunged sellado inmigración USCIS"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 6: Expunged */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Fingerprint size={24} className="text-[#B2904D]" /></div>
                      {t.sections.expunged.title}
                    </h2>
                    <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.sections.expunged.text }} />
                    {t.sections.expunged.explanation.map((p, i) => (
                      <p key={i} className="mb-4">{p}</p>
                    ))}
                    <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-sm text-red-300 mt-4">
                      <AlertTriangle size={16} className="inline mr-2" />
                      {t.sections.expunged.warning}
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
            articles={getRelatedArticles('crimenes-deportacion-vileza-moral', (lang as 'es' | 'en') || 'es')}
            lang={(lang as 'es' | 'en') || 'es'}
            servicePath="/servicios/ley-criminal"
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
