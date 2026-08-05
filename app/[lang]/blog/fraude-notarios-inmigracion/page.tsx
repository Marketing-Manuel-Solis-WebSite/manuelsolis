import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle,
  Lightbulb, MessageCircle, Send, ArrowUpRight, ShieldCheck, FileText,
  User, AlertTriangle, Users, Scale, BookOpen, Search, Shield,
  Ban, Eye, Flag, Phone, HelpCircle, UserX, BadgeCheck
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
  article: '/blog/blog_30/B10_CR1.jpg',
  inside1: '/blog/blog_30/B10_CR2.jpg',
  inside2: '/blog/blog_30/B10_CR2.jpg',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Fraude de notarios en inmigración: cómo protegerte',
    metaDesc: 'Aprende a identificar fraude de notarios en casos migratorios. Conoce las 10 señales de alerta, cómo verificar licencias y qué hacer si ya fuiste víctima.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '9 min de lectura',
      tags: 'Fraude Migratorio',
      date: '16 May, 2026',
      time: '9 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'Fraude de notarios en inmigración: cómo identificarlo y protegerte',
    summary: {
      title: 'Resumen inicial',
      text: 'En muchos países de América Latina, un notario es un profesional con formación jurídica que puede dar consejo legal. En Estados Unidos, un notary public es simplemente alguien autorizado para certificar firmas. Esta confusión alimenta una de las <strong>estafas más comunes</strong> contra inmigrantes. En este artículo explicamos quién puede representarte legalmente, cuáles son las <strong>10 señales de fraude</strong>, cómo verificar licencias y qué hacer si ya fuiste víctima.'
    },
    intro: [
      'Cada año, miles de inmigrantes en Estados Unidos son estafados por personas que se hacen pasar por abogados o que ofrecen servicios legales de inmigración sin estar autorizados. Muchas de estas personas se presentan como "notarios", "consultores de inmigración" o "paralegals independientes", aprovechando la confianza que la palabra <strong>notario</strong> tiene en la cultura latina.',
      'El problema no es solo económico. Un caso mal presentado ante USCIS puede generar una denegación, activar un proceso de deportación, crear una barra de inadmisibilidad por fraude, o eliminar opciones legales que la persona tenía antes de que el notario interviniera. Las consecuencias de confiar en la persona equivocada pueden ser devastadoras e irreversibles.',
      'Este artículo tiene un propósito claro: ayudarte a identificar el fraude antes de que ocurra, saber qué hacer si ya caíste en una estafa, y entender quién sí tiene autorización legal para representarte en un caso de inmigración en Estados Unidos.',
      'La información aquí presentada no reemplaza la asesoría legal, pero es un primer paso para protegerte y proteger a tu familia de prácticas ilegales que continúan afectando a nuestra comunidad.'
    ],
    sections: {
      notNotario: {
        title: 'Por qué notario no significa abogado en Estados Unidos',
        text: 'En países como México, Colombia, Argentina y muchos otros de América Latina, un notario público es un profesional del derecho con formación universitaria, autorizado para dar fe de actos jurídicos, redactar contratos y en algunos casos ofrecer asesoría legal. En la cultura latina, la palabra "notario" tiene un peso profesional y una connotación de confianza que es completamente legítima en ese contexto.',
        list: [
          'En Estados Unidos, un "notary public" es simplemente una persona autorizada por el estado para certificar firmas, administrar juramentos y autenticar documentos. No necesita formación jurídica.',
          'Convertirse en notary public en muchos estados requiere solo completar un curso corto, pagar una tarifa y pasar una verificación básica de antecedentes.',
          'Un notary public en EE.UU. NO tiene autorización para dar consejo legal, preparar formularios de inmigración, representar a nadie ante USCIS ni ante un tribunal de inmigración.',
          'Algunos estados como California, Texas, Florida e Illinois tienen leyes específicas que prohíben a los notarios ofrecer servicios legales de inmigración, precisamente porque el fraude es tan común.',
          'El uso de la palabra "notario" en publicidad dirigida a la comunidad latina puede ser intencional para crear confusión y atraer clientes que creen estar contratando a un profesional del derecho.'
        ],
        note: 'La confusión lingüística entre "notario" en América Latina y "notary public" en EE.UU. es la base de una de las estafas más extendidas contra la comunidad inmigrante. No asumas que alguien que se presenta como "notario" tiene formación legal.'
      },
      whoCanRepresent: {
        title: 'Quién sí puede representarte legalmente en inmigración',
        subtitle: 'Solo dos categorías de personas están autorizadas',
        text: 'La ley federal de Estados Unidos es muy clara sobre quién puede dar consejo legal en materia de inmigración y representar a una persona ante USCIS o ante un tribunal de inmigración. Solo existen dos categorías de representantes autorizados, y cualquier persona fuera de estas categorías que ofrezca servicios legales de inmigración está cometiendo una práctica no autorizada del derecho.',
        list: [
          'Abogados con licencia activa (attorneys in good standing): deben estar admitidos en el colegio de abogados (bar association) de al menos un estado de EE.UU. y no tener suspensiones ni revocaciones. Puedes verificar su licencia en el sitio web del colegio de abogados de su estado.',
          'Representantes acreditados por el Departamento de Justicia (DOJ): son personas que trabajan en organizaciones reconocidas por la Junta de Apelaciones de Inmigración (BIA). Estas organizaciones son generalmente sin fines de lucro y deben cumplir requisitos específicos de supervisión y capacitación.',
          'Un "paralegal" o asistente legal puede ayudar bajo la supervisión directa de un abogado, pero no puede ofrecer consejo legal ni firmar documentos como representante.',
          'Un "consultor de inmigración", "asesor migratorio", "facilitador" o cualquier otro título similar NO es una categoría reconocida por la ley federal para dar consejo legal de inmigración.',
          'Los llamados "notarios" que ofrecen preparar formularios de inmigración están practicando el derecho sin licencia, lo cual es un delito en la mayoría de los estados.'
        ],
        note: 'Si alguien te ofrece servicios legales de inmigración y no es abogado con licencia activa ni representante acreditado por el DOJ, no está autorizado para hacerlo. No importa qué tan buenas sean sus referencias ni cuántos años lleve "ayudando" a la comunidad.'
      },
      redFlags: {
        title: '10 señales de fraude o práctica no autorizada',
        subtitle: 'Si ves alguna de estas señales, detente inmediatamente',
        text: 'El fraude de notarios y consultores no autorizados sigue un patrón reconocible. Conocer estas señales puede ayudarte a identificar una estafa antes de que sea demasiado tarde. No todas las señales indican fraude por sí solas, pero la combinación de varias debe generar una alarma inmediata.',
        list: [
          '1. Te garantiza un resultado: ningún abogado ético garantiza resultados porque las decisiones las toma USCIS o el juez. Si alguien te dice "te aseguro la residencia" o "esto es 100% seguro", es una señal clara de fraude.',
          '2. Pide pagos en efectivo sin recibos: un profesional legítimo siempre emite recibos y documenta los pagos. Si te piden efectivo y no te dan comprobante, tu dinero desaparecerá sin rastro.',
          '3. Te pide firmar documentos en blanco: nunca, bajo ninguna circunstancia, firmes un formulario que no hayas leído y verificado. Firmar en blanco le da a esa persona el poder de poner cualquier información en tu nombre.',
          '4. No te entrega copia de tu expediente: tienes derecho a recibir copia de todo lo que se presenta en tu nombre. Si se niegan a darte copias, es porque no quieren que sepas qué presentaron.',
          '5. Te promete cosas imposibles: "puedo borrar tu deportación", "puedo hacer que USCIS pierda tu caso anterior", "tengo un contacto en inmigración". Ninguna de estas cosas es posible de manera legítima.',
          '6. Te presiona para mentir en tu solicitud: un abogado ético nunca te pedirá que inventes información. Si alguien te sugiere mentir sobre fechas, antecedentes o relaciones, está poniendo tu caso y tu futuro en riesgo.',
          '7. No tiene contrato de servicios (retainer agreement): todo abogado legítimo debe darte un contrato escrito que detalle los servicios, los costos y las obligaciones de ambas partes. Sin contrato, no hay protección.',
          '8. Se presenta como "consultor" o "asesor migratorio": estos títulos no tienen reconocimiento legal federal para ofrecer servicios de inmigración. Es una forma de evitar regulación.',
          '9. Te apresura a tomar decisiones sin explicarte: un abogado responsable te explica tus opciones, los riesgos y te da tiempo para decidir. Si alguien te presiona para firmar o pagar inmediatamente, desconfía.',
          '10. No tiene número de colegiatura (bar number): todo abogado con licencia tiene un número de colegiatura que puedes verificar en línea. Si no te puede dar ese número o se niega a hacerlo, no es abogado.'
        ],
        note: 'Una sola de estas señales ya es motivo suficiente para buscar una segunda opinión. La combinación de varias es evidencia clara de una práctica no autorizada o fraudulenta.'
      },
      howToVerify: {
        title: 'Cómo verificar licencia o acreditación',
        subtitle: 'Pasos concretos antes de contratar a alguien',
        text: 'Verificar si alguien está autorizado para representarte en un caso de inmigración es más sencillo de lo que piensas. Existen herramientas públicas y gratuitas que te permiten confirmar la identidad y credenciales de cualquier abogado o representante acreditado antes de entregar tu dinero o tu información personal.',
        list: [
          'Paso 1: Pide el nombre completo, el número de licencia (bar number) y el estado donde está admitido el abogado.',
          'Paso 2: Visita el sitio web del colegio de abogados (state bar) del estado correspondiente y busca el nombre o número de licencia. Verifica que la licencia esté activa (active) y sin sanciones disciplinarias.',
          'Paso 3: Si la persona dice ser representante acreditado por el DOJ, verifica en el sitio del EOIR (Executive Office for Immigration Review) la lista de organizaciones reconocidas y representantes acreditados.',
          'Paso 4: Desconfía si la persona no puede proporcionarte esta información o se pone evasiva cuando la solicitas.',
          'Paso 5: Contacta al colegio de abogados de tu estado para confirmar la información o para reportar a alguien que sospechas está practicando sin licencia.',
          'Paso 6: Organizaciones como la American Immigration Lawyers Association (AILA) tienen directorios de abogados miembros que puedes consultar.'
        ],
        note: 'La verificación toma minutos y puede ahorrarte miles de dólares y años de sufrimiento. Nunca entregues dinero ni documentos a alguien cuya licencia no hayas verificado personalmente.'
      },
      alreadyScammed: {
        title: 'Qué hacer si tu caso ya fue mal presentado',
        subtitle: 'Pasos de recuperación si ya fuiste víctima',
        text: 'Si ya contrataste a un notario o consultor no autorizado y sospechas que tu caso fue mal presentado ante USCIS o el consulado, es importante actuar rápidamente. El daño puede ser limitado si se toman las medidas correctas a tiempo. No pierdas tiempo en culparte; enfócate en proteger tu caso y tus opciones.',
        list: [
          'Obtén una copia completa de tu expediente: solicita a USCIS una copia de todo lo que fue presentado en tu nombre mediante un pedido FOIA (Freedom of Information Act). Esto te permitirá ver exactamente qué información se envió.',
          'Documenta todo lo que pagaste: reúne recibos, comprobantes de transferencia, mensajes de texto, correos electrónicos y cualquier comunicación con la persona que te atendió. Esta evidencia será útil para un reporte formal.',
          'Consulta con un abogado de inmigración lo antes posible: un abogado puede evaluar qué se presentó, identificar errores o información falsa, y determinar si es posible corregir la solicitud antes de que cause más daño.',
          'Evalúa si hay plazos corriendo: si tu caso fue denegado por información incorrecta, puede haber plazos para apelar o para presentar una moción de reapertura. No dejes pasar estos plazos.',
          'Presenta una corrección si es necesario: dependiendo del tipo de error, puede ser posible retirar una solicitud, presentar una enmienda o iniciar un caso nuevo con información correcta.',
          'No asumas que tu caso está perdido: muchos casos mal presentados pueden corregirse. Un abogado puede evaluar si existe una estrategia de recuperación viable.'
        ],
        note: 'Haber sido víctima de fraude notarial generalmente no se cuenta en tu contra ante USCIS si puedes demostrar que no participaste intencionalmente en la información falsa. La clave es actuar rápido y con representación legal legítima.'
      },
      whereToReport: {
        title: 'Dónde reportar fraude',
        subtitle: 'Agencias y recursos disponibles',
        text: 'Reportar a la persona que te estafó es importante no solo para tu caso sino para proteger a otras personas en la comunidad que podrían caer en la misma trampa. Existen varias agencias y recursos donde puedes presentar una queja formal contra un notario fraudulento o un consultor no autorizado.',
        list: [
          'Colegio de abogados de tu estado (State Bar): si la persona se hacía pasar por abogado, reporta al colegio de abogados. Ellos investigan las denuncias de práctica no autorizada del derecho.',
          'Oficina del Fiscal General del estado (Attorney General): la oficina del AG de tu estado investiga fraude al consumidor, incluyendo estafas de inmigración.',
          'Federal Trade Commission (FTC): puedes presentar una queja en reportfraud.ftc.gov para documentar la estafa a nivel federal.',
          'USCIS: reporta directamente al servicio de inmigración a través de su línea de quejas o su portal en línea. USCIS tiene un interés directo en combatir el fraude.',
          'Organizaciones locales de asistencia legal: muchas organizaciones sin fines de lucro ayudan a víctimas de fraude migratorio y pueden orientarte sobre los recursos disponibles en tu área.',
          'Policía local: si hubo robo de dinero o identidad, puedes presentar un reporte policial. Esto crea un registro oficial de la estafa.'
        ],
        note: 'Reportar no pone en riesgo tu estatus migratorio. Las agencias que reciben estos reportes están enfocadas en perseguir al estafador, no a la víctima. No tengas miedo de denunciar.'
      },
      faq: {
        title: 'Preguntas Frecuentes',
        items: [
          {
            q: '¿Es legal que un notario me ayude a llenar formularios de inmigración?',
            a: 'En la mayoría de los estados, no. Un notary public en Estados Unidos no tiene autorización para ofrecer consejo legal ni para preparar formularios de inmigración. Algunos estados permiten que los "immigration consultants" llenen formularios bajo regulaciones muy estrictas, pero no pueden aconsejar sobre qué formulario presentar ni sobre estrategia migratoria. En la práctica, la línea entre llenar un formulario y dar consejo legal es muy delgada, y muchos notarios la cruzan.'
          },
          {
            q: '¿Qué hago si el notario se niega a devolverme mis documentos originales?',
            a: 'Tus documentos originales te pertenecen. Si un notario o consultor se niega a devolvértelos, puedes solicitar asistencia de la policía local para recuperarlos. También puedes reportar la situación al colegio de abogados de tu estado y a la oficina del fiscal general. Mientras tanto, solicita copias de tus documentos a las agencias emisoras originales.'
          },
          {
            q: '¿Si reporto al notario, eso afecta mi caso de inmigración?',
            a: 'No. Reportar a alguien que practicó el derecho sin licencia no pone en riesgo tu caso de inmigración. De hecho, documentar que fuiste víctima de fraude puede ayudar a tu caso si necesitas demostrar que la información falsa en tu solicitud no fue tu culpa. USCIS y los jueces de inmigración entienden que el fraude de notarios es un problema generalizado.'
          },
          {
            q: '¿Cómo sé si un abogado de inmigración es real?',
            a: 'Verifica su licencia en el sitio web del colegio de abogados (state bar) de su estado. Todo abogado con licencia activa aparece en ese registro público con su nombre, número de licencia y estatus. Si el abogado dice estar en otro estado, verifica en el bar de ese estado. Si no aparece o su licencia está suspendida o revocada, no es un representante legítimo.'
          },
          {
            q: '¿Puede un paralegal ayudarme con mi caso de inmigración?',
            a: 'Un paralegal puede trabajar en tu caso, pero solo bajo la supervisión directa de un abogado con licencia. El paralegal no puede darte consejo legal independiente, no puede firmar documentos como tu representante y no puede aparecer como tu abogado ante USCIS o en un tribunal. Si un paralegal te ofrece manejar tu caso sin la supervisión de un abogado, está actuando ilegalmente.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusión',
        text: 'El fraude de notarios sigue siendo una de las amenazas más graves contra la comunidad inmigrante en Estados Unidos. La confusión sobre el significado de "notario" en diferentes culturas es explotada sistemáticamente por personas que buscan aprovecharse de quienes más necesitan ayuda legal legítima. Las consecuencias van mucho más allá de perder dinero: un caso mal presentado puede destruir opciones migratorias que habrían sido viables con la representación correcta.',
        advice: 'Si estás buscando ayuda con un caso de inmigración, verifica siempre las credenciales antes de contratar a alguien. Y si ya fuiste víctima de fraude, no te quedes en silencio. Busca un abogado legítimo que pueda evaluar tu caso, corregir lo que sea posible y ayudarte a proteger tus derechos.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'USCIS – Common Scams',
          'USCIS – Avoid Scams',
          'USCIS – Find Legal Services',
          'DOJ EOIR – Recognition & Accreditation Program FAQ'
        ]
      }
    }
  },
  en: {
    metaTitle: 'Notary Fraud in Immigration: How to Protect Yourself',
    metaDesc: 'Learn to identify notary fraud in immigration cases. Know the 10 red flags, how to verify licenses, and what to do if you are already a victim.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '9 min read',
      tags: 'Immigration Fraud',
      date: 'May 16, 2026',
      time: '9 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'Notary Fraud in Immigration: How to Identify and Protect Yourself',
    summary: {
      title: 'Initial Summary',
      text: 'In many Latin American countries, a notario is a legally trained professional who can provide legal advice. In the United States, a notary public is simply someone authorized to certify signatures. This confusion fuels one of the <strong>most common scams</strong> against immigrants. In this article we explain who can legally represent you, what the <strong>10 signs of fraud</strong> are, how to verify licenses, and what to do if you are already a victim.'
    },
    intro: [
      'Every year, thousands of immigrants in the United States are scammed by people who pose as attorneys or who offer immigration legal services without authorization. Many of these individuals present themselves as "notarios," "immigration consultants," or "independent paralegals," taking advantage of the trust that the word <strong>notario</strong> carries in Latin American culture.',
      'The problem goes beyond money. A case improperly filed with USCIS can result in a denial, trigger deportation proceedings, create an inadmissibility bar for fraud, or eliminate legal options that the person had before the notario intervened. The consequences of trusting the wrong person can be devastating and irreversible.',
      'This article has a clear purpose: to help you identify fraud before it happens, know what to do if you have already fallen into a scam, and understand who actually has legal authorization to represent you in an immigration case in the United States.',
      'The information presented here does not replace legal counsel, but it is a first step toward protecting yourself and your family from illegal practices that continue to affect our community.'
    ],
    sections: {
      notNotario: {
        title: 'Why Notario Does Not Mean Attorney in the United States',
        text: 'In countries like Mexico, Colombia, Argentina, and many others in Latin America, a notario público is a legal professional with university training, authorized to attest to legal acts, draft contracts, and in some cases provide legal advice. In Latin culture, the word "notario" carries professional weight and a connotation of trust that is completely legitimate in that context.',
        list: [
          'In the United States, a "notary public" is simply a person authorized by the state to certify signatures, administer oaths, and authenticate documents. No legal training is required.',
          'Becoming a notary public in many states requires only completing a short course, paying a fee, and passing a basic background check.',
          'A notary public in the U.S. is NOT authorized to give legal advice, prepare immigration forms, or represent anyone before USCIS or an immigration court.',
          'Some states like California, Texas, Florida, and Illinois have specific laws prohibiting notaries from offering immigration legal services, precisely because fraud is so common.',
          'The use of the word "notario" in advertising directed at the Latino community can be intentional to create confusion and attract clients who believe they are hiring a legal professional.'
        ],
        note: 'The linguistic confusion between "notario" in Latin America and "notary public" in the U.S. is the foundation of one of the most widespread scams against the immigrant community. Do not assume that someone who presents themselves as a "notario" has legal training.'
      },
      whoCanRepresent: {
        title: 'Who Can Legally Represent You in Immigration',
        subtitle: 'Only two categories of people are authorized',
        text: 'U.S. federal law is very clear about who can provide legal advice in immigration matters and represent a person before USCIS or an immigration court. Only two categories of authorized representatives exist, and anyone outside these categories who offers immigration legal services is engaging in unauthorized practice of law.',
        list: [
          'Licensed attorneys in good standing: they must be admitted to the bar association of at least one U.S. state and have no suspensions or revocations. You can verify their license on their state bar association\'s website.',
          'Representatives accredited by the Department of Justice (DOJ): these are individuals who work at organizations recognized by the Board of Immigration Appeals (BIA). These organizations are generally nonprofit and must meet specific supervision and training requirements.',
          'A "paralegal" or legal assistant can help under the direct supervision of an attorney but cannot offer legal advice or sign documents as a representative.',
          'An "immigration consultant," "immigration advisor," "facilitator," or any similar title is NOT a federally recognized category for providing immigration legal services.',
          'So-called "notarios" who offer to prepare immigration forms are practicing law without a license, which is a crime in most states.'
        ],
        note: 'If someone offers you immigration legal services and is not a licensed attorney or a DOJ-accredited representative, they are not authorized to do so. It does not matter how good their references are or how many years they have been "helping" the community.'
      },
      redFlags: {
        title: '10 Signs of Fraud or Unauthorized Practice',
        subtitle: 'If you see any of these signs, stop immediately',
        text: 'Fraud by notarios and unauthorized consultants follows a recognizable pattern. Knowing these signs can help you identify a scam before it is too late. Not all signs indicate fraud on their own, but a combination of several should trigger an immediate alarm.',
        list: [
          '1. They guarantee a result: no ethical attorney guarantees outcomes because decisions are made by USCIS or the judge. If someone tells you "I guarantee you residency" or "this is 100% certain," it is a clear sign of fraud.',
          '2. They ask for cash payments without receipts: a legitimate professional always issues receipts and documents payments. If they ask for cash without providing proof, your money will disappear without a trace.',
          '3. They ask you to sign blank documents: never, under any circumstances, sign a form you have not read and verified. Signing blank documents gives that person the power to put any information under your name.',
          '4. They do not give you a copy of your file: you have the right to receive copies of everything filed on your behalf. If they refuse to give you copies, it is because they do not want you to know what was submitted.',
          '5. They promise impossible things: "I can erase your deportation," "I can make USCIS lose your previous case," "I have a contact in immigration." None of these things is legitimately possible.',
          '6. They pressure you to lie on your application: an ethical attorney will never ask you to fabricate information. If someone suggests you lie about dates, records, or relationships, they are putting your case and your future at risk.',
          '7. They have no retainer agreement: every legitimate attorney must give you a written contract detailing the services, costs, and obligations of both parties. Without a contract, there is no protection.',
          '8. They present themselves as "consultant" or "immigration advisor": these titles have no federal legal recognition for providing immigration services. It is a way to avoid regulation.',
          '9. They rush you to make decisions without explaining: a responsible attorney explains your options, the risks, and gives you time to decide. If someone pressures you to sign or pay immediately, be suspicious.',
          '10. They have no bar number: every licensed attorney has a bar number you can verify online. If they cannot give you that number or refuse to do so, they are not an attorney.'
        ],
        note: 'A single one of these signs is sufficient reason to seek a second opinion. A combination of several is clear evidence of unauthorized or fraudulent practice.'
      },
      howToVerify: {
        title: 'How to Verify License or Accreditation',
        subtitle: 'Concrete steps before hiring someone',
        text: 'Verifying whether someone is authorized to represent you in an immigration case is simpler than you think. There are free public tools that allow you to confirm the identity and credentials of any attorney or accredited representative before handing over your money or personal information.',
        list: [
          'Step 1: Ask for the full name, license number (bar number), and the state where the attorney is admitted.',
          'Step 2: Visit the website of the state bar association for the corresponding state and search by name or license number. Verify that the license is active and without disciplinary sanctions.',
          'Step 3: If the person claims to be a DOJ-accredited representative, verify on the EOIR (Executive Office for Immigration Review) website the list of recognized organizations and accredited representatives.',
          'Step 4: Be suspicious if the person cannot provide this information or becomes evasive when you request it.',
          'Step 5: Contact your state\'s bar association to confirm the information or to report someone you suspect is practicing without a license.',
          'Step 6: Organizations like the American Immigration Lawyers Association (AILA) have directories of member attorneys you can consult.'
        ],
        note: 'Verification takes minutes and can save you thousands of dollars and years of suffering. Never hand over money or documents to someone whose license you have not personally verified.'
      },
      alreadyScammed: {
        title: 'What to Do If Your Case Was Already Improperly Filed',
        subtitle: 'Recovery steps if you are already a victim',
        text: 'If you already hired a notario or unauthorized consultant and suspect your case was improperly filed with USCIS or the consulate, it is important to act quickly. The damage can be limited if the correct measures are taken in time. Do not waste time blaming yourself; focus on protecting your case and your options.',
        list: [
          'Obtain a complete copy of your file: request from USCIS a copy of everything that was filed on your behalf through a FOIA (Freedom of Information Act) request. This will allow you to see exactly what information was sent.',
          'Document everything you paid: gather receipts, transfer confirmations, text messages, emails, and any communication with the person who assisted you. This evidence will be useful for a formal report.',
          'Consult with an immigration attorney as soon as possible: an attorney can evaluate what was filed, identify errors or false information, and determine whether it is possible to correct the application before it causes more damage.',
          'Evaluate whether deadlines are running: if your case was denied because of incorrect information, there may be deadlines to appeal or file a motion to reopen. Do not let these deadlines pass.',
          'File a correction if necessary: depending on the type of error, it may be possible to withdraw an application, file an amendment, or start a new case with correct information.',
          'Do not assume your case is lost: many improperly filed cases can be corrected. An attorney can evaluate whether a viable recovery strategy exists.'
        ],
        note: 'Having been a victim of notary fraud generally does not count against you before USCIS if you can demonstrate that you did not intentionally participate in the false information. The key is to act quickly and with legitimate legal representation.'
      },
      whereToReport: {
        title: 'Where to Report Fraud',
        subtitle: 'Agencies and available resources',
        text: 'Reporting the person who scammed you is important not only for your case but to protect others in the community who could fall into the same trap. There are several agencies and resources where you can file a formal complaint against a fraudulent notario or unauthorized consultant.',
        list: [
          'Your state\'s bar association (State Bar): if the person was posing as an attorney, report to the bar association. They investigate complaints of unauthorized practice of law.',
          'State Attorney General\'s office: the AG\'s office in your state investigates consumer fraud, including immigration scams.',
          'Federal Trade Commission (FTC): you can file a complaint at reportfraud.ftc.gov to document the scam at the federal level.',
          'USCIS: report directly to immigration services through their complaint line or online portal. USCIS has a direct interest in combating fraud.',
          'Local legal assistance organizations: many nonprofit organizations help victims of immigration fraud and can guide you to available resources in your area.',
          'Local police: if there was theft of money or identity, you can file a police report. This creates an official record of the scam.'
        ],
        note: 'Reporting does not put your immigration status at risk. The agencies that receive these reports are focused on pursuing the scammer, not the victim. Do not be afraid to report.'
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'Is it legal for a notario to help me fill out immigration forms?',
            a: 'In most states, no. A notary public in the United States is not authorized to provide legal advice or prepare immigration forms. Some states allow "immigration consultants" to fill out forms under very strict regulations, but they cannot advise on which form to file or on immigration strategy. In practice, the line between filling out a form and giving legal advice is very thin, and many notarios cross it.'
          },
          {
            q: 'What do I do if the notario refuses to return my original documents?',
            a: 'Your original documents belong to you. If a notario or consultant refuses to return them, you can request assistance from local police to recover them. You can also report the situation to your state\'s bar association and the attorney general\'s office. In the meantime, request copies of your documents from the original issuing agencies.'
          },
          {
            q: 'If I report the notario, does that affect my immigration case?',
            a: 'No. Reporting someone who practiced law without a license does not put your immigration case at risk. In fact, documenting that you were a victim of fraud can help your case if you need to demonstrate that the false information in your application was not your fault. USCIS and immigration judges understand that notary fraud is a widespread problem.'
          },
          {
            q: 'How do I know if an immigration attorney is real?',
            a: 'Verify their license on the website of their state\'s bar association. Every attorney with an active license appears in that public registry with their name, license number, and status. If the attorney says they are in another state, verify with that state\'s bar. If they do not appear or their license is suspended or revoked, they are not a legitimate representative.'
          },
          {
            q: 'Can a paralegal help me with my immigration case?',
            a: 'A paralegal can work on your case, but only under the direct supervision of a licensed attorney. The paralegal cannot give you independent legal advice, cannot sign documents as your representative, and cannot appear as your attorney before USCIS or in court. If a paralegal offers to handle your case without attorney supervision, they are acting illegally.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusion',
        text: 'Notary fraud continues to be one of the most serious threats against the immigrant community in the United States. The confusion over the meaning of "notario" across cultures is systematically exploited by people who seek to take advantage of those who most need legitimate legal help. The consequences go far beyond losing money: an improperly filed case can destroy immigration options that would have been viable with proper representation.',
        advice: 'If you are looking for help with an immigration case, always verify credentials before hiring someone. And if you have already been a victim of fraud, do not remain silent. Find a legitimate attorney who can evaluate your case, correct what is possible, and help protect your rights.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'USCIS – Common Scams',
          'USCIS – Avoid Scams',
          'USCIS – Find Legal Services',
          'DOJ EOIR – Recognition & Accreditation Program FAQ'
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
    path: `/${lang}/blog/fraude-notarios-inmigracion`,
    title: t.title,
    description: t.metaDesc,
    images: [{ url: IMAGES.article, alt: t.title }],
    type: 'article',
    publishedTime: '2026-05-16T08:00:00.000Z',
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
      tags: ['Fraude', 'Notarios', 'Estafas', 'Inmigración', 'Protección'],
    },
    twitter: social.twitter,
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/fraude-notarios-inmigracion`,
      languages: {
        'es': `${SITE_URL}/es/blog/fraude-notarios-inmigracion`,
        'en': `${SITE_URL}/en/blog/fraude-notarios-inmigracion`,
        'x-default': `${SITE_URL}/es/blog/fraude-notarios-inmigracion`,
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
    { name: t.title, url: `/${lang}/blog/fraude-notarios-inmigracion` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="fraude-notarios-inmigracion"
        date="2026-05-16"
        image={IMAGES.article}
        lang={lang as string}
        readTime="9"
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
                     alt="Fraude de notarios en inmigración protección"
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

                  {/* Sección 1: Notario no es abogado */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Scale size={24} className="text-[#B2904D]" /></div>
                      {t.sections.notNotario.title}
                    </h2>
                    <p className="mb-4">{t.sections.notNotario.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.notNotario.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-red-500/10">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.notNotario.note}
                    </div>
                  </section>

                  {/* Sección 2: Quién puede representarte */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><BadgeCheck size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whoCanRepresent.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.whoCanRepresent.subtitle}</p>
                    <p className="mb-4">{t.sections.whoCanRepresent.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.whoCanRepresent.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.whoCanRepresent.note}
                    </div>
                  </section>

                  {/* Imagen interior 1 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside1}
                       alt="Señales de fraude notarios inmigración"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 3: 10 señales de fraude */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Eye size={24} className="text-[#B2904D]" /></div>
                      {t.sections.redFlags.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.redFlags.subtitle}</p>
                    <p className="mb-4">{t.sections.redFlags.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.redFlags.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-red-500/10">
                          <AlertTriangle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.redFlags.note}
                    </div>
                  </section>

                  {/* Sección 4: Cómo verificar */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Search size={24} className="text-[#B2904D]" /></div>
                      {t.sections.howToVerify.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.howToVerify.subtitle}</p>
                    <p className="mb-4">{t.sections.howToVerify.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.howToVerify.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#B2904D]/20 text-[#B2904D] font-bold text-sm shrink-0">{i + 1}</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.howToVerify.note}
                    </div>
                  </section>

                  {/* Imagen interior 2 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside2}
                       alt="Verificar abogado inmigración licencia"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 5: Qué hacer si ya fuiste estafado */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Shield size={24} className="text-[#B2904D]" /></div>
                      {t.sections.alreadyScammed.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.alreadyScammed.subtitle}</p>
                    <p className="mb-4">{t.sections.alreadyScammed.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.alreadyScammed.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.alreadyScammed.note}
                    </div>
                  </section>

                  {/* Sección 6: Dónde reportar */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Flag size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whereToReport.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.whereToReport.subtitle}</p>
                    <p className="mb-4">{t.sections.whereToReport.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.whereToReport.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.whereToReport.note}
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
            articles={getRelatedArticles('fraude-notarios-inmigracion', (lang as 'es' | 'en') || 'es')}
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
