import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle,
  AlertTriangle, MessageCircle, Send, ArrowUpRight, Scale, Home as HomeIcon,
  Building2, MapPin, Users, Phone
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
  article: '/blog/blog_35/JUL_B4.png',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Redadas de ICE 2026: Tus Derechos y Plan de Emergencia',
    metaDesc: 'ICE necesita una orden judicial para entrar a tu casa. Conoce tus derechos en una redada, qué no firmar nunca y cómo preparar tu plan de emergencia familiar.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '12 min de lectura',
      tags: 'Defensa contra Deportación',
      date: '2 Jul, 2026',
      time: '12 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'Redadas de ICE en 2026: tus derechos en casa, en el trabajo y en la calle',
    summary: {
      title: 'Resumen inicial',
      text: 'Los agentes de ICE <strong>no pueden entrar a tu casa sin una orden judicial firmada por un juez</strong> o sin tu consentimiento; las órdenes administrativas I-200 e I-205 no son suficientes. Tienes derecho a guardar silencio, a no firmar nada sin un abogado y a preguntar si estás libre de irte. Con los arrestos interiores de ICE en aumento durante 2025 y 2026, la mejor protección para tu familia es doble: conocer tus derechos y tener listo un plan de emergencia. Esta guía te explica ambas cosas, paso a paso.'
    },
    intro: [
      'Las redadas y los arrestos de ICE dentro del país dejaron de ser una noticia lejana. Según un reporte de La Opinión de mayo de 2026, los arrestos interiores de ICE crecieron con fuerza durante 2025 y 2026 en estados como Texas, California e Illinois. Para millones de familias inmigrantes, la pregunta ya no es si conviene prepararse, sino cómo prepararse bien.',
      'Lo primero que debes saber es esto: la Constitución de Estados Unidos protege a <strong>toda persona</strong> dentro del país, tenga o no tenga documentos. El derecho a guardar silencio, el derecho a no abrir la puerta sin una orden judicial y el derecho a hablar con un abogado no dependen de tu estatus migratorio.',
      'En esta guía te explicamos qué puede y qué no puede hacer ICE en tu casa, en tu trabajo y en la calle, qué no debes firmar jamás, y cómo armar un plan de emergencia familiar realista. Y si un agente ya se llevó a alguien de tu familia, te mostramos <a href="/es/blog/como-encontrar-detenido-ice-localizador-pasos" class="text-[#B2904D] underline hover:text-white">cómo localizar a un familiar detenido por ICE</a> y por qué conviene hablar cuanto antes con <a href="/es/servicios/defensa-deportacion" class="text-[#B2904D] underline hover:text-white">abogados de defensa contra deportación</a>.',
      'Prepararse no es un acto de miedo: es un acto de protección. Una familia que sabe qué decir, qué callar y a quién llamar reacciona con calma en los peores minutos. Y esa calma —no el pánico— es lo que le da a un abogado un caso más fuerte que defender.',
      'Cada caso es diferente. <strong>Esta información es educativa y no sustituye la consulta con un abogado.</strong>'
    ],
    sections: {
      warrant: {
        title: 'Orden judicial vs. orden administrativa: la diferencia que protege tu puerta',
        subtitle: 'No todos los papeles que trae ICE valen lo mismo',
        text: 'La confusión más peligrosa en una redada es creer que cualquier papel que muestre un agente lo autoriza a entrar. No es así. Según la guía vigente de la ACLU de Texas, ICE necesita una <strong>orden judicial firmada por un juez</strong> para entrar a una casa sin el consentimiento de sus ocupantes. Las órdenes administrativas que ICE usa a diario no cumplen ese requisito.',
        list: [
          '<strong>Orden judicial (judicial warrant):</strong> la firma un juez, normalmente menciona una corte (por ejemplo, "U.S. District Court") e indica la dirección que autoriza registrar. Solo este tipo de orden permite a ICE entrar sin tu permiso.',
          '<strong>Orden administrativa (formularios I-200 o I-205):</strong> la firma un funcionario de inmigración, no un juez. Autoriza un arresto migratorio, pero <strong>no autoriza entrar a tu casa</strong> sin consentimiento.',
          '<strong>Pide verla sin abrir:</strong> tienes derecho a pedir que pasen la orden por debajo de la puerta o que la muestren por una ventana antes de decidir cualquier cosa.',
          '<strong>Revisa los datos:</strong> verifica que tenga la firma de un juez, la dirección correcta y el nombre correcto. Una orden con datos equivocados no te obliga a abrir.',
          '<strong>No abrir la puerta no es un delito:</strong> mantener la puerta cerrada mientras verificas la orden es un ejercicio de tus derechos, no una obstrucción.'
        ],
        note: 'Si los agentes solo muestran un formulario I-200 o I-205, puedes decir con calma y en voz alta: "No doy mi consentimiento para que entren". Repítelo aunque insistan.'
      },
      home: {
        title: 'Tus derechos si ICE toca la puerta de tu casa',
        subtitle: 'La puerta cerrada es tu mejor herramienta legal',
        text: 'La casa es el lugar con mayor protección constitucional en Estados Unidos. Abrir la puerta puede interpretarse como <strong>consentimiento</strong> para entrar, y por eso la recomendación central de las organizaciones de derechos civiles es siempre la misma: no abras y comunícate a través de la puerta.',
        list: [
          '<strong>No abras la puerta.</strong> Habla a través de ella o por una ventana. Nadie está obligado a abrir por el simple hecho de que un agente toque.',
          '<strong>Pregunta quiénes son y qué quieren.</strong> Pide nombres, agencia y el motivo de la visita antes de responder cualquier otra cosa.',
          '<strong>Exige la orden judicial.</strong> Pide que la pasen por debajo de la puerta o la muestren por la ventana. Sin orden judicial y sin tu consentimiento, no pueden entrar legalmente.',
          '<strong>Guarda silencio.</strong> Tienes derecho a no responder preguntas sobre dónde naciste, cómo entraste al país o cuál es tu estatus. Puedes decir: "Voy a guardar silencio y quiero hablar con un abogado".',
          '<strong>No firmes nada</strong> que te pasen por la puerta o durante la visita sin que un abogado lo revise primero.',
          '<strong>Si entran de todos modos, no resistas físicamente.</strong> Di con claridad que no das tu consentimiento y memoriza los detalles: la resistencia física crea cargos criminales; la entrada ilegal la pelea después tu abogado.'
        ],
        note: 'Estos derechos protegen a todas las personas dentro de la casa, incluidos los niños. Practiquen en familia la frase clave: "No doy mi consentimiento; quiero hablar con un abogado".'
      },
      work: {
        title: 'Tus derechos durante una redada en el trabajo',
        subtitle: 'Las áreas privadas del negocio también exigen orden judicial',
        text: 'Las redadas laborales generan pánico porque ocurren en espacios que no controlas. Aun así, tienes derechos, y tu empleador también. De acuerdo con el Immigrant Defense Project, el empleador puede exigir una <strong>orden judicial</strong> antes de permitir que ICE acceda a las áreas no públicas del negocio, como bodegas, cocinas, oficinas o vestidores.',
        list: [
          '<strong>Mantén la calma y no corras.</strong> Correr puede usarse como justificación para detenerte, provoca situaciones peligrosas y puede traer cargos adicionales.',
          '<strong>Tienes derecho a guardar silencio.</strong> No estás obligado a decir dónde naciste ni cuál es tu estatus. Basta con decir: "Voy a guardar silencio".',
          '<strong>No presentes documentos falsos.</strong> Entregar un documento falso crea un problema migratorio permanente; guardar silencio, no.',
          '<strong>Las áreas no públicas requieren orden judicial.</strong> ICE puede entrar a la zona abierta al público (como el área de clientes), pero para el resto del negocio el empleador puede exigir una orden firmada por un juez.',
          '<strong>Pide hablar con un abogado</strong> antes de contestar preguntas o firmar cualquier documento.',
          '<strong>Memoriza un teléfono de emergencia.</strong> Si te detienen, es posible que no tengas acceso a tu celular: el número de tu familia y el de tu abogado deben estar en tu memoria.'
        ],
        note: 'Si eres empleador, puedes decirles a los agentes que las áreas no públicas de tu negocio requieren una orden judicial y pedir que esperen mientras contactas a tu abogado.'
      },
      street: {
        title: 'Tus derechos si te paran en la calle',
        subtitle: '"¿Estoy libre de irme?": la pregunta que define el encuentro',
        text: 'En la vía pública las reglas cambian: no hay puerta que te proteja, pero tus derechos constitucionales viajan contigo. La clave es saber si el encuentro es voluntario o si estás detenido, y esa respuesta se consigue con una sola pregunta.',
        list: [
          '<strong>Pregunta: "¿Estoy libre de irme?"</strong> Si la respuesta es sí, aléjate caminando con calma. Si la respuesta es no, estás detenido y se activan de inmediato tus derechos a guardar silencio y pedir un abogado.',
          '<strong>No corras.</strong> Correr puede interpretarse como sospecha, provoca persecuciones peligrosas y puede generar cargos adicionales.',
          '<strong>Guarda silencio sobre tu origen.</strong> No estás obligado a decir dónde naciste ni cómo entraste al país.',
          '<strong>No entregues documentos extranjeros</strong> (pasaporte, matrícula consular u otros que revelen tu nacionalidad) si no estás obligado a hacerlo.',
          '<strong>Nunca cargues ni muestres documentos falsos.</strong> Es mejor no presentar nada que presentar algo falso.',
          '<strong>Si te arrestan, di que quieres un abogado</strong> y no firmes nada hasta hablar con él.'
        ],
        note: 'Las reglas sobre identificarte ante la policía local varían según el estado, pero el derecho a guardar silencio sobre tu estatus migratorio te acompaña en todo el país.'
      },
      dontSign: {
        title: 'Qué no hacer y qué no firmar jamás',
        subtitle: 'Una firma apresurada puede costar más que la redada',
        text: 'En medio del miedo, muchas personas cometen errores que las persiguen durante años. Los agentes pueden presionarte para que firmes documentos "para acelerar el proceso". Detente: algunos de esos papeles renuncian a tus defensas legales sin que lo sepas.',
        list: [
          '<strong>No firmes nada sin abogado.</strong> Podrías estar firmando una salida voluntaria o renunciando a tu derecho a presentar tu caso ante un juez de inmigración.',
          '<strong>No presentes documentos falsos.</strong> Un documento falso crea un problema migratorio permanente que ninguna disculpa posterior borra.',
          '<strong>No mientas a los agentes.</strong> Guardar silencio es legal; mentir no lo es, y destruye tu credibilidad en cualquier trámite futuro.',
          '<strong>No resistas físicamente ni huyas.</strong> La resistencia convierte un problema migratorio en un problema criminal.',
          '<strong>No des información sobre otras personas.</strong> No estás obligado a decir quién más vive en la casa ni dónde trabajan tus familiares.',
          '<strong>No confíes en promesas verbales.</strong> Si un agente te dice que firmar "te conviene", recuerda que su función no es asesorarte legalmente.'
        ],
        warning: 'El peor error no es la redada: son las decisiones tomadas con pánico. Antes de firmar cualquier papel, repite esta frase: "Quiero hablar con un abogado primero". Nadie puede castigarte legalmente por pedirlo.'
      },
      familyPlan: {
        title: 'Tu plan de emergencia familiar, paso a paso',
        subtitle: 'Prepararse no es rendirse: es proteger a los tuyos',
        text: 'Organizaciones como el National Immigration Law Center recomiendan que toda familia inmigrante tenga un plan de preparación, igual que se prepara para un huracán. El objetivo es simple: que si un adulto es detenido, la familia sepa <strong>exactamente qué hacer</strong> en las horas siguientes.',
        list: [
          '<strong>Memoricen los teléfonos clave.</strong> Cada miembro de la familia, incluidos los hijos mayores, debe saber de memoria al menos dos números de contacto.',
          '<strong>Prepara una carta poder</strong> para el cuidado de tus hijos menores, de modo que una persona de confianza pueda tomar decisiones médicas y escolares si tú no estás.',
          '<strong>Guarda el número A de cada familiar.</strong> Ese número de registro de extranjero permite localizar a una persona detenida y dar seguimiento a su caso.',
          '<strong>Ten listo el contacto de un abogado</strong> de inmigración y compártelo con tu familia y con una persona de confianza.',
          '<strong>Arma una carpeta de documentos importantes</strong> (identificaciones, actas de nacimiento, comprobantes del tiempo en el país, historiales médicos) y asegúrate de que una persona de confianza sepa dónde está y pueda acceder a ella.',
          '<strong>Definan un punto de contacto.</strong> Acuerden quién avisa a quién y quién recoge a los niños de la escuela si un adulto no llega.'
        ],
        note: 'Revisa el plan una o dos veces al año y explícalo a tus hijos según su edad, con calma. Un plan conocido reduce el pánico; un plan guardado en un cajón no protege a nadie.'
      },
      detained: {
        title: 'Si ya detuvieron a un familiar: primeros pasos',
        subtitle: 'Las primeras horas importan',
        text: 'Cuando ICE detiene a alguien, la familia suele perder horas valiosas por no saber por dónde empezar. Estos pasos ordenan la respuesta: <strong>localizar, no firmar y conseguir representación legal</strong> lo antes posible.',
        list: [
          '<strong>Localiza a tu familiar con su número A.</strong> El localizador de detenidos en línea de ICE permite buscarlo con ese número o con sus datos biográficos exactos.',
          '<strong>Hazle llegar el mensaje clave:</strong> que no firme ningún documento sin que un abogado lo revise, especialmente si le ofrecen una "salida voluntaria".',
          '<strong>Contacta a un abogado de inmigración de inmediato.</strong> En el sistema migratorio no hay abogado de oficio pagado por el gobierno: la familia debe conseguir la representación.',
          '<strong>Reúne evidencia de arraigo:</strong> años en el país, hijos ciudadanos o residentes, trabajo estable, impuestos, lazos comunitarios. Estos documentos pueden ser importantes si procede una audiencia de fianza.',
          '<strong>Anota todos los detalles del arresto:</strong> fecha, hora, lugar, número de agentes y lo que dijeron. Esos datos pueden ser relevantes para la defensa.',
          '<strong>Considera avisar al consulado</strong> de su país: los consulados pueden orientar a la familia y visitar a personas detenidas.'
        ],
        note: 'En muchos casos, la persona detenida puede pedir una audiencia de fianza ante un juez de inmigración. Un abogado puede evaluar si califica y preparar la solicitud con la evidencia de arraigo correcta.'
      },
      faq: {
        title: 'Preguntas Frecuentes',
        items: [
          {
            q: '¿ICE puede entrar a mi casa con una orden I-200 o I-205?',
            a: '<strong>No sin tu consentimiento.</strong> Los formularios I-200 e I-205 son órdenes administrativas firmadas por funcionarios de inmigración, no por jueces. Autorizan un arresto migratorio, pero no autorizan la entrada a una vivienda. Para entrar sin permiso, ICE necesita una orden judicial firmada por un juez. Si solo muestran una orden administrativa, puedes mantener la puerta cerrada y decir que no das tu consentimiento.'
          },
          {
            q: '¿Qué hago si los agentes dicen ser "policía" y no mencionan a ICE?',
            a: 'Pide que se identifiquen con nombre y agencia, y que muestren la orden por debajo de la puerta o por una ventana <strong>antes de abrir</strong>. Los agentes de ICE a veces se presentan solo como "policía". Mantener la puerta cerrada mientras verificas quiénes son y qué papel traen no es un delito.'
          },
          {
            q: '¿Tengo que decirle a ICE dónde nací o cómo entré al país?',
            a: '<strong>No.</strong> El derecho a guardar silencio protege a toda persona en Estados Unidos, con o sin documentos. Puedes decir: "Voy a guardar silencio y quiero hablar con un abogado". Lo que nunca debes hacer es mentir ni presentar documentos falsos: eso crea problemas legales permanentes que el silencio no crea.'
          },
          {
            q: '¿Qué es el número A y dónde lo encuentro?',
            a: 'Es el <strong>número de registro de extranjero</strong> (Alien Registration Number): la letra "A" seguida de ocho o nueve dígitos. Aparece en documentos migratorios como permisos de trabajo, tarjetas de residencia y notificaciones de la corte de inmigración. Guardar el número A de cada familiar es una pieza central del plan de emergencia, porque permite localizar a una persona detenida y dar seguimiento a su caso.'
          },
          {
            q: '¿Me conviene firmar una salida voluntaria si me detienen?',
            a: '<strong>No la firmes sin hablar con un abogado.</strong> La salida voluntaria puede parecer la opción rápida, pero en muchos casos implica renunciar a defensas que podrías tener, como el asilo, la cancelación de deportación u otras formas de alivio. Un abogado puede decirte en poco tiempo si tienes opciones mejores. Una vez firmada, revertirla es muy difícil.'
          },
          {
            q: '¿Puedo grabar una redada de ICE con mi teléfono?',
            a: 'Como regla general, <strong>puedes grabar a agentes públicos desde un lugar donde tengas derecho a estar</strong>, siempre que no interfieras físicamente con el operativo. Grabar con calma la hora, el lugar y lo que dicen los agentes puede aportar evidencia útil para la defensa. Si un agente te ordena retroceder, retrocede y sigue grabando a distancia: no forcejees por el teléfono.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusión',
        text: 'Una redada de ICE es uno de los momentos más difíciles que puede vivir una familia inmigrante, pero no es un momento sin reglas. ICE necesita una orden judicial para entrar a tu casa, tu silencio está protegido por la Constitución y ningún agente puede obligarte a firmar. Las familias que conocen estos derechos y tienen un plan de emergencia listo reaccionan mejor, protegen a sus hijos y le dan a su abogado un caso más fuerte que defender.',
        advice: 'No esperes a que toquen la puerta. Arma tu plan de emergencia esta semana: memoriza teléfonos, prepara la carta poder, reúne el número A de cada familiar y ten a la mano el contacto de un abogado de inmigración. Si ICE ya detuvo a alguien de tu familia, busca asesoría legal hoy mismo.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'ACLU de Texas – Conozca sus derechos ante ICE (2026)',
          'Immigrant Defense Project – ICE en el lugar de trabajo',
          'National Immigration Law Center – Preparación familiar',
          'La Opinión – Aumento de arrestos interiores de ICE (11 de mayo de 2026)'
        ]
      }
    }
  },
  en: {
    metaTitle: 'ICE Raids 2026: Your Rights and Family Emergency Plan',
    metaDesc: 'ICE needs a judicial warrant to enter your home. Learn your rights during a raid, what never to sign, and how to build your family emergency plan today.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '12 min read',
      tags: 'Deportation Defense',
      date: 'Jul 2, 2026',
      time: '12 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'ICE Raids in 2026: Your Rights at Home, at Work and on the Street',
    summary: {
      title: 'Initial Summary',
      text: 'ICE agents <strong>cannot enter your home without a judicial warrant signed by a judge</strong> or without your consent; the administrative I-200 and I-205 forms are not enough. You have the right to remain silent, to refuse to sign anything without a lawyer, and to ask whether you are free to leave. With ICE interior arrests rising sharply through 2025 and 2026, the best protection for your family is twofold: knowing your rights and having an emergency plan ready. This guide walks you through both, step by step.'
    },
    intro: [
      'ICE raids and interior arrests are no longer distant news. According to a May 2026 report by La Opinión, ICE interior arrests grew sharply during 2025 and 2026 in states such as Texas, California and Illinois. For millions of immigrant families, the question is no longer whether to prepare, but how to prepare well.',
      'Here is the first thing you need to know: the United States Constitution protects <strong>every person</strong> inside the country, with or without documents. The right to remain silent, the right to keep your door closed without a judicial warrant, and the right to speak with a lawyer do not depend on your immigration status.',
      'In this guide we explain what ICE can and cannot do at your home, at your workplace and on the street, what you should never sign, and how to build a realistic family emergency plan. And if an agent has already taken someone in your family, we show you <a href="/en/blog/como-encontrar-detenido-ice-localizador-pasos" class="text-[#B2904D] underline hover:text-white">how to locate a family member detained by ICE</a> and why it pays to speak early with <a href="/en/servicios/defensa-deportacion" class="text-[#B2904D] underline hover:text-white">deportation defense attorneys</a>.',
      'Preparing is not an act of fear: it is an act of protection. A family that knows what to say, what to keep quiet and who to call reacts calmly in the worst minutes. And that calm — not panic — is what gives a lawyer a stronger case to defend.',
      'Every case is different. <strong>This information is educational and does not replace consultation with an attorney.</strong>'
    ],
    sections: {
      warrant: {
        title: 'Judicial Warrant vs. Administrative Warrant: The Difference That Protects Your Door',
        subtitle: 'Not every piece of paper ICE carries has the same power',
        text: 'The most dangerous confusion during a raid is believing that any paper an agent shows authorizes them to come in. It does not. According to the current guidance from the ACLU of Texas, ICE needs a <strong>judicial warrant signed by a judge</strong> to enter a home without the occupants\' consent. The administrative warrants ICE uses every day do not meet that requirement.',
        list: [
          '<strong>Judicial warrant:</strong> it is signed by a judge, usually names a court (for example, "U.S. District Court") and states the address it authorizes to be searched. Only this type of warrant allows ICE to enter without your permission.',
          '<strong>Administrative warrant (forms I-200 or I-205):</strong> it is signed by an immigration officer, not a judge. It authorizes an immigration arrest, but it <strong>does not authorize entry into your home</strong> without consent.',
          '<strong>Ask to see it without opening:</strong> you have the right to ask the agents to slide the warrant under the door or show it through a window before you decide anything.',
          '<strong>Check the details:</strong> confirm it has a judge\'s signature, the correct address and the correct name. A warrant with wrong information does not force you to open.',
          '<strong>Keeping the door closed is not a crime:</strong> keeping it shut while you verify the warrant is an exercise of your rights, not obstruction.'
        ],
        note: 'If the agents only show an I-200 or I-205 form, you can say calmly and out loud: "I do not consent to your entry." Repeat it even if they insist.'
      },
      home: {
        title: 'Your Rights if ICE Knocks on Your Door',
        subtitle: 'A closed door is your strongest legal tool',
        text: 'The home enjoys the strongest constitutional protection in the United States. Opening the door can be interpreted as <strong>consent</strong> to enter, which is why the central recommendation from civil rights organizations is always the same: do not open, and communicate through the door.',
        list: [
          '<strong>Do not open the door.</strong> Speak through it or through a window. No one is required to open simply because an agent knocks.',
          '<strong>Ask who they are and what they want.</strong> Ask for names, agency and the reason for the visit before answering anything else.',
          '<strong>Demand the judicial warrant.</strong> Ask them to slide it under the door or show it through the window. Without a judicial warrant and without your consent, they cannot legally enter.',
          '<strong>Remain silent.</strong> You have the right not to answer questions about where you were born, how you entered the country or what your status is. You can say: "I am going to remain silent and I want to speak with a lawyer."',
          '<strong>Do not sign anything</strong> passed under the door or during the visit without a lawyer reviewing it first.',
          '<strong>If they enter anyway, do not physically resist.</strong> State clearly that you do not consent and memorize the details: physical resistance creates criminal charges, while an illegal entry is something your lawyer can fight later.'
        ],
        note: 'These rights protect everyone inside the home, including children. Practice the key phrase as a family: "I do not consent; I want to speak with a lawyer."'
      },
      work: {
        title: 'Your Rights During a Workplace Raid',
        subtitle: 'Private areas of a business also require a judicial warrant',
        text: 'Workplace raids cause panic because they happen in spaces you do not control. Even so, you have rights — and so does your employer. According to the Immigrant Defense Project, an employer can require a <strong>judicial warrant</strong> before allowing ICE into the non-public areas of the business, such as warehouses, kitchens, offices or locker rooms.',
        list: [
          '<strong>Stay calm and do not run.</strong> Running can be used as a justification to detain you, creates dangerous situations and can bring additional charges.',
          '<strong>You have the right to remain silent.</strong> You are not required to say where you were born or what your status is. It is enough to say: "I am going to remain silent."',
          '<strong>Do not present false documents.</strong> Handing over a false document creates a permanent immigration problem; remaining silent does not.',
          '<strong>Non-public areas require a judicial warrant.</strong> ICE may enter the areas open to the public (such as a customer area), but for the rest of the business the employer can demand a warrant signed by a judge.',
          '<strong>Ask to speak with a lawyer</strong> before answering questions or signing any document.',
          '<strong>Memorize an emergency phone number.</strong> If you are detained you may not have access to your cell phone: your family\'s number and your lawyer\'s number should live in your memory.'
        ],
        note: 'If you are an employer, you can tell the agents that the non-public areas of your business require a judicial warrant and ask them to wait while you contact your attorney.'
      },
      street: {
        title: 'Your Rights if You Are Stopped on the Street',
        subtitle: '"Am I free to go?" — the question that defines the encounter',
        text: 'On the street the rules change: there is no door to protect you, but your constitutional rights travel with you. The key is knowing whether the encounter is voluntary or whether you are being detained — and you get that answer with a single question.',
        list: [
          '<strong>Ask: "Am I free to go?"</strong> If the answer is yes, walk away calmly. If the answer is no, you are being detained and your rights to remain silent and ask for a lawyer kick in immediately.',
          '<strong>Do not run.</strong> Running can be read as suspicious, triggers dangerous pursuits and can generate additional charges.',
          '<strong>Stay silent about your origin.</strong> You are not required to say where you were born or how you entered the country.',
          '<strong>Do not hand over foreign documents</strong> (a passport, consular ID or anything else that reveals your nationality) if you are not required to do so.',
          '<strong>Never carry or show false documents.</strong> It is better to present nothing than to present something false.',
          '<strong>If you are arrested, say you want a lawyer</strong> and do not sign anything until you speak with one.'
        ],
        note: 'The rules on identifying yourself to local police vary by state, but the right to remain silent about your immigration status follows you everywhere in the country.'
      },
      dontSign: {
        title: 'What Never to Do — and Never to Sign',
        subtitle: 'A rushed signature can cost more than the raid itself',
        text: 'In the middle of fear, many people make mistakes that follow them for years. Agents may pressure you to sign documents "to speed up the process." Stop: some of those papers waive your legal defenses without you realizing it.',
        list: [
          '<strong>Do not sign anything without a lawyer.</strong> You could be signing a voluntary departure or giving up your right to present your case to an immigration judge.',
          '<strong>Do not present false documents.</strong> A false document creates a permanent immigration problem that no later apology erases.',
          '<strong>Do not lie to the agents.</strong> Remaining silent is legal; lying is not, and it destroys your credibility in any future application.',
          '<strong>Do not physically resist or flee.</strong> Resistance turns an immigration problem into a criminal one.',
          '<strong>Do not give information about other people.</strong> You are not required to say who else lives in the house or where your relatives work.',
          '<strong>Do not trust verbal promises.</strong> If an agent tells you that signing "is in your best interest," remember that their job is not to give you legal advice.'
        ],
        warning: 'The worst mistake is not the raid: it is the decisions made in panic. Before signing any paper, repeat this phrase: "I want to speak with a lawyer first." No one can legally punish you for asking.'
      },
      familyPlan: {
        title: 'Your Family Emergency Plan, Step by Step',
        subtitle: 'Preparing is not surrendering — it is protecting your own',
        text: 'Organizations such as the National Immigration Law Center recommend that every immigrant family have a preparedness plan, just as they would for a hurricane. The goal is simple: if an adult is detained, the family knows <strong>exactly what to do</strong> in the hours that follow.',
        list: [
          '<strong>Memorize the key phone numbers.</strong> Every family member, including older children, should know at least two contact numbers by heart.',
          '<strong>Prepare a power of attorney</strong> for the care of your minor children, so a trusted person can make medical and school decisions if you are not there.',
          '<strong>Keep each family member\'s A-number.</strong> That alien registration number makes it possible to locate a detained person and follow their case.',
          '<strong>Have an immigration lawyer\'s contact ready</strong> and share it with your family and with a trusted person.',
          '<strong>Put together a folder of important documents</strong> (IDs, birth certificates, proof of time in the country, medical records) and make sure a trusted person knows where it is and can access it.',
          '<strong>Agree on a point of contact.</strong> Decide who notifies whom and who picks up the children from school if an adult does not come home.'
        ],
        note: 'Review the plan once or twice a year and explain it to your children in an age-appropriate, calm way. A plan everyone knows reduces panic; a plan stored in a drawer protects no one.'
      },
      detained: {
        title: 'If a Family Member Has Already Been Detained: First Steps',
        subtitle: 'The first hours matter',
        text: 'When ICE detains someone, families often lose valuable hours because they do not know where to start. These steps organize the response: <strong>locate, do not sign, and get legal representation</strong> as soon as possible.',
        list: [
          '<strong>Locate your family member with their A-number.</strong> ICE\'s online detainee locator lets you search with that number or with their exact biographical information.',
          '<strong>Get the key message to them:</strong> do not sign any document without a lawyer reviewing it, especially if they are offered a "voluntary departure."',
          '<strong>Contact an immigration lawyer immediately.</strong> In the immigration system there is no government-paid public defender: the family must secure representation.',
          '<strong>Gather evidence of ties to the community:</strong> years in the country, citizen or resident children, steady work, taxes, community involvement. These documents can be important if a bond hearing is available.',
          '<strong>Write down every detail of the arrest:</strong> date, time, place, number of agents and what they said. Those facts can matter for the defense.',
          '<strong>Consider notifying the consulate</strong> of their country: consulates can guide the family and visit detained individuals.'
        ],
        note: 'In many cases, a detained person can request a bond hearing before an immigration judge. A lawyer can evaluate eligibility and prepare the request with the right evidence of community ties.'
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'Can ICE enter my home with an I-200 or I-205 warrant?',
            a: '<strong>Not without your consent.</strong> Forms I-200 and I-205 are administrative warrants signed by immigration officers, not judges. They authorize an immigration arrest, but they do not authorize entry into a home. To enter without permission, ICE needs a judicial warrant signed by a judge. If they only show an administrative warrant, you can keep the door closed and state that you do not consent.'
          },
          {
            q: 'What if the agents say they are "police" and never mention ICE?',
            a: 'Ask them to identify themselves by name and agency, and to show the warrant under the door or through a window <strong>before opening</strong>. ICE agents sometimes introduce themselves only as "police." Keeping the door closed while you verify who they are and what paper they carry is not a crime.'
          },
          {
            q: 'Do I have to tell ICE where I was born or how I entered the country?',
            a: '<strong>No.</strong> The right to remain silent protects every person in the United States, with or without documents. You can say: "I am going to remain silent and I want to speak with a lawyer." What you must never do is lie or present false documents: that creates permanent legal problems that silence does not.'
          },
          {
            q: 'What is the A-number and where do I find it?',
            a: 'It is the <strong>Alien Registration Number</strong>: the letter "A" followed by eight or nine digits. It appears on immigration documents such as work permits, green cards and immigration court notices. Keeping each family member\'s A-number is a central piece of the emergency plan, because it makes it possible to locate a detained person and follow their case.'
          },
          {
            q: 'Should I sign a voluntary departure if I am detained?',
            a: '<strong>Do not sign it without speaking with a lawyer.</strong> Voluntary departure may look like the fast option, but in many cases it means giving up defenses you might have, such as asylum, cancellation of removal or other forms of relief. A lawyer can tell you quickly whether you have better options. Once signed, it is very hard to undo.'
          },
          {
            q: 'Can I record an ICE raid with my phone?',
            a: 'As a general rule, <strong>you may record public officers from a place where you have a right to be</strong>, as long as you do not physically interfere with the operation. Calmly recording the time, the place and what the agents say can provide useful evidence for the defense. If an agent orders you to step back, step back and keep recording from a distance: do not struggle over the phone.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusion',
        text: 'An ICE raid is one of the hardest moments an immigrant family can face, but it is not a moment without rules. ICE needs a judicial warrant to enter your home, your silence is protected by the Constitution, and no agent can force you to sign. Families who know these rights and have an emergency plan ready react better, protect their children and give their lawyer a stronger case to defend.',
        advice: 'Do not wait for a knock on the door. Build your emergency plan this week: memorize phone numbers, prepare the power of attorney, gather each family member\'s A-number and keep an immigration lawyer\'s contact at hand. If ICE has already detained someone in your family, seek legal advice today.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'ACLU of Texas – Know Your Rights with ICE (2026)',
          'Immigrant Defense Project – ICE at the Workplace',
          'National Immigration Law Center – Family Preparedness',
          'La Opinión – Increase in ICE Interior Arrests (May 11, 2026)'
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
    path: `/${lang}/blog/redadas-ice-2026-derechos-plan-emergencia-familiar`,
    title: t.title,
    description: t.metaDesc,
    images: [{ url: IMAGES.article, alt: t.title }],
    type: 'article',
    publishedTime: '2026-07-02T08:00:00.000Z',
  });

  return {
    title: { absolute: t.metaTitle },
    description: t.metaDesc,
    openGraph: {
      ...social.openGraph,
      // Campos article:* que buildSocialMetadata no cubre.
      type: 'article',
      authors: ['Manuel Solís'],
      section: 'Defensa contra Deportación',
      tags: ['Redadas ICE', 'Conoce tus Derechos', 'Plan de Emergencia', 'Deportación', 'Inmigración 2026'],
    },
    twitter: social.twitter,
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/redadas-ice-2026-derechos-plan-emergencia-familiar`,
      languages: {
        'es': `${SITE_URL}/es/blog/redadas-ice-2026-derechos-plan-emergencia-familiar`,
        'en': `${SITE_URL}/en/blog/redadas-ice-2026-derechos-plan-emergencia-familiar`,
        'x-default': `${SITE_URL}/es/blog/redadas-ice-2026-derechos-plan-emergencia-familiar`,
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
    { name: t.title, url: `/${lang}/blog/redadas-ice-2026-derechos-plan-emergencia-familiar` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="redadas-ice-2026-derechos-plan-emergencia-familiar"
        date="2026-07-02"
        image={IMAGES.article}
        lang={lang as string}
        readTime="12"
        faqs={t.sections.faq.items.map((item) => ({
          question: item.q,
          answer: item.a.replace(/<[^>]+>/g, ''),
        }))}
      />
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <BlogTracker
        title={t.title}
        author="Manuel Solís"
        category="Defensa contra Deportación"
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
                     alt="Redadas de ICE 2026 derechos y plan de emergencia familiar"
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
                      <p key={idx} dangerouslySetInnerHTML={{ __html: addInlineLinks(paragraph, lang as 'es' | 'en', enlacesInline) }} className="mb-6" />
                    ))}
                  </section>

                  {/* warrant */}
                  <section>
                    <h2 id="orden-judicial-vs-administrativa" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Scale size={24} className="text-[#B2904D]" /></div>
                      {t.sections.warrant.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.warrant.subtitle}</p>
                    <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.sections.warrant.text }} />
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.warrant.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.warrant.note}
                    </div>
                  </section>

                  {/* home */}
                  <section>
                    <h2 id="tus-derechos-en-casa" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><HomeIcon size={24} className="text-[#B2904D]" /></div>
                      {t.sections.home.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.home.subtitle}</p>
                    <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.sections.home.text }} />
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.home.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.home.note}
                    </div>
                  </section>

                  {/* work */}
                  <section>
                    <h2 id="tus-derechos-en-el-trabajo" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Building2 size={24} className="text-[#B2904D]" /></div>
                      {t.sections.work.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.work.subtitle}</p>
                    <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.sections.work.text }} />
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.work.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.work.note}
                    </div>
                  </section>

                  {/* street */}
                  <section>
                    <h2 id="tus-derechos-en-la-calle" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><MapPin size={24} className="text-[#B2904D]" /></div>
                      {t.sections.street.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.street.subtitle}</p>
                    <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.sections.street.text }} />
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.street.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.street.note}
                    </div>
                  </section>

                  {/* dontSign */}
                  <section>
                    <h2 id="que-no-hacer-ni-firmar" className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><AlertTriangle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.dontSign.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.dontSign.subtitle}</p>
                    <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.sections.dontSign.text }} />
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.dontSign.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 p-5 bg-red-500/10 rounded-xl border border-red-500/20">
                      <p className="text-red-400 font-bold m-0 flex items-start gap-2">
                        <AlertTriangle size={20} className="shrink-0 mt-1" />
                        {t.sections.dontSign.warning}
                      </p>
                    </div>
                  </section>

                  {/* familyPlan */}
                  <section>
                    <h2 id="plan-de-emergencia-familiar" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Users size={24} className="text-[#B2904D]" /></div>
                      {t.sections.familyPlan.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.familyPlan.subtitle}</p>
                    <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.sections.familyPlan.text }} />
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.familyPlan.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.familyPlan.note}
                    </div>
                  </section>

                  {/* detained */}
                  <section>
                    <h2 id="si-ya-detuvieron-a-alguien" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Phone size={24} className="text-[#B2904D]" /></div>
                      {t.sections.detained.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.detained.subtitle}</p>
                    <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.sections.detained.text }} />
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.detained.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.detained.note}
                    </div>
                  </section>

                  {/* FAQ */}
                  <section>
                    <h2 id="preguntas-frecuentes" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
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
            articles={getRelatedArticles('redadas-ice-2026-derechos-plan-emergencia-familiar', (lang as 'es' | 'en') || 'es')}
            lang={(lang as 'es' | 'en') || 'es'}
            servicePath="/servicios/defensa-deportacion"
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
