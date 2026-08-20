import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle,
  Lightbulb, MessageCircle, Send, ArrowUpRight, ShieldCheck, FileText,
  User, AlertTriangle, Users, Heart, Shield, Baby, Scale, BookOpen,
  Phone, Home, HelpCircle, FolderOpen, UserCheck
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
  article: '/blog/blog_29/B9_CR1.jpg',
  inside1: '/blog/blog_29/B9_CR2.jpg',
  inside2: '/blog/blog_29/B9_CR2.jpg',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Familias de estatus mixto: opciones migratorias y preparación',
    metaDesc: 'Guía para familias de estatus mixto en EE.UU. Conoce las opciones de petición familiar, VAWA, Visa U y cómo prepararte ante una emergencia migratoria.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '11 min de lectura',
      tags: 'Familia e Inmigración',
      date: '12 May, 2026',
      time: '11 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'Familias de estatus mixto: opciones migratorias y cómo prepararse',
    summary: {
      title: 'Resumen inicial',
      text: 'Una familia de estatus mixto es aquella donde conviven personas con diferentes situaciones migratorias: ciudadanos, residentes permanentes e indocumentados bajo el mismo techo. En este artículo explicamos <strong>qué opciones migratorias existen</strong> según quién tiene papeles, qué mitos hay que desmentir, cómo prepararse ante una detención y qué protecciones como <strong>VAWA y Visa U</strong> pueden aplicar independientemente del estatus.'
    },
    intro: [
      'En Estados Unidos hay millones de familias donde no todos los miembros comparten el mismo estatus migratorio. Un padre puede ser indocumentado mientras sus hijos nacieron aquí y son ciudadanos. Una esposa puede tener residencia mientras su esposo no tiene ningún estatus. Estas son las llamadas <strong>familias de estatus mixto</strong>, y enfrentan desafíos legales, emocionales y prácticos que otras familias no conocen.',
      'La realidad jurídica de estas familias es compleja. Las opciones de regularización dependen de quién tiene estatus, la relación familiar entre los miembros, cuándo y cómo entró cada persona al país, y si existen antecedentes migratorios o penales que compliquen la situación.',
      'Este artículo no pretende dar soluciones universales, porque no existen. Cada caso es distinto. Pero sí ofrece una guía clara sobre las opciones más comunes, los mitos que circulan en la comunidad, y los pasos concretos que una familia puede tomar para protegerse ante una emergencia migratoria.',
      'La preparación no reemplaza la asesoría legal, pero puede marcar la diferencia entre una familia que queda paralizada ante una crisis y una que tiene un plan de acción listo.'
    ],
    sections: {
      whatIs: {
        title: 'Qué es una familia de estatus mixto y por qué importa',
        text: 'Una familia de estatus mixto es cualquier núcleo familiar donde los miembros tienen diferentes situaciones migratorias. Esto puede incluir ciudadanos estadounidenses, residentes permanentes legales (green card), personas con estatus temporal (TPS, DACA, visa de trabajo), personas con casos pendientes ante inmigración, y personas sin ningún estatus migratorio.',
        list: [
          'Un padre indocumentado con hijos nacidos en Estados Unidos (ciudadanos por nacimiento).',
          'Una esposa con residencia permanente casada con un esposo sin papeles.',
          'Un ciudadano naturalizado con padres que entraron sin inspección y no tienen estatus.',
          'Jóvenes con DACA cuyos padres son indocumentados.',
          'Familias donde uno de los padres tiene TPS y el otro no califica para ningún programa.'
        ],
        note: 'Según el Migration Policy Institute, se estima que más de 22 millones de personas en Estados Unidos viven en hogares de estatus mixto. Es una realidad mucho más común de lo que se cree.'
      },
      options: {
        title: 'Opciones migratorias según quién tiene papeles',
        subtitle: 'Lo que puede hacer un ciudadano vs. un residente permanente',
        text: 'Las opciones de petición familiar dependen directamente de quién tiene estatus legal en la familia. Un ciudadano estadounidense tiene más opciones y prioridades más rápidas que un residente permanente. Entender esta diferencia es fundamental para no crear falsas expectativas.',
        list: [
          'Ciudadano peticionando al cónyuge: familiar inmediato, sin límite de visas, proceso relativamente rápido si el cónyuge entró legalmente.',
          'Ciudadano peticionando a hijos solteros menores de 21: familiar inmediato, sin espera de visa.',
          'Ciudadano peticionando a padres (si el ciudadano tiene 21 años o más): familiar inmediato.',
          'Ciudadano peticionando a hijos casados o mayores de 21: categoría de preferencia con espera de años.',
          'Ciudadano peticionando a hermanos: categoría con espera de hasta 20 años o más.',
          'Residente permanente peticionando al cónyuge: categoría 2A, con espera que varía según el país de origen.',
          'Residente permanente peticionando a hijos solteros menores de 21: categoría 2A.',
          'Residente permanente peticionando a hijos solteros mayores de 21: categoría 2B, con espera significativa.',
          'Un residente permanente NO puede peticionar a sus padres ni a sus hermanos. Solo los ciudadanos pueden hacerlo.'
        ],
        note: 'Tener una petición aprobada no significa que la persona pueda ajustar estatus automáticamente. Si entró sin inspección, puede necesitar un perdón (waiver) o procesamiento consular, lo cual tiene sus propios riesgos.'
      },
      myths: {
        title: 'Lo que mucha gente cree y no es cierto',
        subtitle: 'Mitos peligrosos que pueden afectar tu caso',
        text: 'En la comunidad inmigrante circulan muchas creencias sobre cómo funciona el sistema migratorio. Algunas tienen algo de verdad, pero otras son completamente falsas y pueden llevar a decisiones que perjudican el caso. Es importante separar los hechos de la ficción.',
        list: [
          'MITO: "Mi hijo ciudadano puede arreglarme los papeles cuando cumpla 18." REALIDAD: Un ciudadano debe tener al menos 21 años para peticionar a un padre. Y tener la petición no significa que se pueda ajustar de inmediato si hay barras o entrada sin inspección.',
          'MITO: "Si me caso con un ciudadano ya tengo la residencia." REALIDAD: El matrimonio crea la base para una petición, pero no otorga estatus automático. Si entraste sin inspección, no puedes ajustar dentro de Estados Unidos en la mayoría de los casos sin un waiver o beneficio especial.',
          'MITO: "Si tengo hijos ciudadanos no me pueden deportar." REALIDAD: Tener hijos ciudadanos no impide una orden de deportación. Puede ser un factor que un juez considere en cancelación de remoción, pero no es una protección automática.',
          'MITO: "Los niños ciudadanos reciben beneficios públicos y eso afecta mi caso." REALIDAD: Los beneficios que reciben los hijos ciudadanos por su propio derecho generalmente no afectan el caso migratorio del padre. Sin embargo, las reglas de carga pública han cambiado varias veces y conviene verificar la normativa vigente.',
          'MITO: "Si mi cónyuge me maltrata y me separo, pierdo todo derecho migratorio." REALIDAD: Si eres víctima de abuso por parte de un cónyuge ciudadano o residente, puedes calificar para VAWA, que te permite peticionar sin depender de tu agresor.'
        ],
        warning: 'Tomar decisiones migratorias basadas en mitos puede generar consecuencias graves, incluyendo barras de inadmisibilidad, órdenes de deportación y pérdida de opciones futuras. Consulta siempre con un abogado de inmigración.'
      },
      emergency: {
        title: 'Preparación ante detención o emergencia familiar',
        subtitle: 'Qué hacer antes de que ocurra una crisis',
        text: 'Ninguna familia quiere pensar en la posibilidad de una detención o una operación de ICE que afecte a uno de sus miembros. Pero la preparación previa es fundamental para proteger a los hijos, mantener la comunicación y tener acceso a representación legal. Prepararse no es admitir culpa; es actuar con responsabilidad.',
        list: [
          'Memoriza o guarda en un lugar accesible el número de teléfono de un abogado de inmigración.',
          'Identifica a una persona de confianza que pueda recoger a tus hijos de la escuela si tú no puedes.',
          'Prepara una carpeta de emergencia con copias de: actas de nacimiento de los hijos, pasaportes, tarjetas de seguro social, registros médicos, información escolar y contactos importantes.',
          'Incluye una carta firmada autorizando a la persona de confianza a tomar decisiones médicas y educativas temporales por tus hijos.',
          'Ten clara la política de tu distrito escolar sobre quién puede recoger a los niños y actualiza la lista de personas autorizadas.',
          'Conoce tus derechos: no abras la puerta sin una orden judicial firmada por un juez. ICE con una orden administrativa (I-200) no tiene autoridad para entrar a tu hogar sin tu consentimiento.',
          'Si eres detenido, no firmes nada sin hablar con un abogado. Tienes derecho a guardar silencio y a representación legal.'
        ],
        note: 'La ICE Parental Interest Directive (actualizada en 2025) establece que los agentes deben considerar los intereses parentales durante una detención, incluyendo permitir comunicación con los hijos y facilitar arreglos de custodia temporal. Aunque la aplicación varía, conocer esta directiva puede ser útil.'
      },
      legalDocs: {
        title: 'Poder notarial, autorizaciones y documentos esenciales',
        subtitle: 'Lo que necesitas tener listo por si acaso',
        text: 'Uno de los pasos más importantes para una familia de estatus mixto es tener los documentos legales en orden. No se trata solo de papeles migratorios, sino de documentos que protejan a tus hijos y a tu familia en caso de que no estés disponible temporalmente.',
        list: [
          'Poder notarial (Power of Attorney): un documento legal que autoriza a otra persona a tomar decisiones por ti o por tus hijos menores. Puede ser temporal o duradero.',
          'Autorización de cuidado temporal: un documento que designa a una persona para cuidar de tus hijos si tú no estás disponible. Los requisitos varían según el estado.',
          'Testamento básico: designa quién quieres que tenga la custodia de tus hijos menores si algo te ocurre. Sin un testamento, un juez decidirá.',
          'Documentos de identidad de toda la familia: copias de pasaportes, actas de nacimiento, tarjetas de seguro social y cualquier documento migratorio vigente.',
          'Información financiera esencial: números de cuentas bancarias, información de seguros, contacto del empleador, documentos de propiedad o arrendamiento.',
          'Lista de contactos de emergencia: abogado de inmigración, familiar de confianza en EE.UU. y en el país de origen, consulado, organización comunitaria local.'
        ],
        note: 'Los requisitos para poderes notariales y autorizaciones de custodia temporal varían por estado. Lo que funciona en California puede no funcionar en Texas. Consulta con un abogado local o una organización de asistencia legal.'
      },
      otherOptions: {
        title: 'VAWA, Visa U y otras protecciones independientes',
        subtitle: 'Opciones que no dependen de tu familiar',
        text: 'Existen opciones migratorias que no requieren que un familiar te peticione. Estas protecciones están diseñadas para personas en situaciones específicas de vulnerabilidad, y permiten obtener estatus migratorio de forma independiente. Si tu situación familiar incluye abuso, crimen o servicio militar, estas opciones deben evaluarse.',
        list: [
          'VAWA (Violence Against Women Act): permite que víctimas de abuso por parte de un cónyuge, padre o hijo ciudadano o residente permanente presenten su propia petición sin conocimiento ni cooperación del agresor. A pesar del nombre, aplica a hombres y mujeres.',
          'Visa U: para víctimas de ciertos crímenes graves (violencia doméstica, agresión sexual, tráfico de personas, entre otros) que cooperaron o están dispuestas a cooperar con las autoridades. Otorga estatus temporal y un camino hacia la residencia.',
          'Visa T: para víctimas de trata de personas que están en Estados Unidos como resultado del tráfico y cooperan con la investigación.',
          'Parole in Place (PIP) militar: para familiares de miembros activos o veteranos de las fuerzas armadas de EE.UU. Permite a ciertos familiares indocumentados obtener parole sin salir del país, lo que puede abrir la puerta a un ajuste de estatus.',
          'Cancelación de remoción para no residentes (Ley de los 10 años): si estás en proceso de deportación, has vivido en EE.UU. por al menos 10 años, tienes buen carácter moral y puedes demostrar que tu deportación causaría sufrimiento excepcional a un familiar ciudadano o residente permanente.',
          'SIJS (Special Immigrant Juvenile Status): para menores que han sido abusados, abandonados o negligidos por uno o ambos padres y que reciben una orden de un tribunal estatal.'
        ],
        note: 'Cada una de estas opciones tiene requisitos estrictos y plazos específicos. No asumas que calificas sin hablar con un abogado. Un error en la evaluación inicial puede cerrar la puerta a un beneficio para el que sí calificabas.'
      },
      faq: {
        title: 'Preguntas Frecuentes',
        items: [
          {
            q: '¿Un hijo ciudadano menor de edad puede evitar que deporten a su padre?',
            a: 'No automáticamente. Un hijo menor ciudadano no puede presentar una petición migratoria por su padre. La petición familiar requiere que el peticionario ciudadano tenga al menos 21 años. Sin embargo, la presencia de hijos ciudadanos menores puede ser un factor que un juez considere en una solicitud de cancelación de remoción, si se demuestra que la deportación les causaría un sufrimiento excepcional y poco habitual.'
          },
          {
            q: '¿Qué pasa si un padre es detenido por ICE y tiene hijos menores en la escuela?',
            a: 'Si un padre es detenido, los hijos no pierden su derecho a asistir a la escuela. Las escuelas públicas no pueden negar inscripción basándose en el estatus migratorio de los padres (Plyler v. Doe, 1982). Sin embargo, alguien debe poder recoger a los niños y cuidarlos. Por eso es esencial tener una persona autorizada previamente identificada y documentada.'
          },
          {
            q: '¿Un residente permanente puede peticionar a sus padres?',
            a: 'No. Solo los ciudadanos estadounidenses mayores de 21 años pueden peticionar a sus padres. Si eres residente permanente y quieres peticionar a tus padres, primero debes naturalizar (hacerte ciudadano) y luego presentar la petición I-130. Mientras seas solo residente, no hay categoría de visa familiar disponible para padres.'
          },
          {
            q: '¿Puedo aplicar a VAWA si soy hombre?',
            a: 'Sí. A pesar de que la ley se llama Violence Against Women Act, VAWA protege a cualquier persona que sea víctima de abuso por parte de un cónyuge, padre o hijo ciudadano o residente permanente, sin importar su género. Hombres, mujeres y personas no binarias pueden presentar una auto-petición bajo VAWA.'
          },
          {
            q: '¿Si recibo beneficios públicos afecta mi caso de inmigración?',
            a: 'Depende del tipo de beneficio y del tipo de solicitud migratoria. Los beneficios recibidos por hijos ciudadanos a título propio generalmente no se atribuyen al padre inmigrante. Sin embargo, ciertos beneficios públicos usados por el solicitante directamente podrían ser considerados bajo la regla de carga pública en solicitudes de green card. Las reglas han cambiado varias veces en años recientes. Consulta con un abogado para verificar la política vigente antes de tomar decisiones.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusión',
        text: 'Vivir en una familia de estatus mixto significa enfrentar una realidad legal compleja que afecta cada aspecto de la vida diaria. Desde las decisiones financieras hasta los planes escolares de los hijos, el estatus migratorio de un miembro de la familia tiene impacto en todos los demás. Pero la complejidad no significa que no haya opciones.',
        advice: 'Si tu familia enfrenta esta situación, el paso más importante es evaluar tus opciones con un abogado de inmigración que entienda los detalles de tu caso. No tomes decisiones basadas en lo que le funcionó a otra persona. Cada familia es diferente, y la estrategia correcta depende de las circunstancias específicas de cada caso.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'USCIS – Family of U.S. Citizens',
          'USCIS – Green Card Eligibility Categories',
          'USCIS – Bringing Parents to Live in the United States as Permanent Residents',
          'USCIS – VAWA Self-Petition (Form I-360)',
          'ICE – Parental Interest Directive (2025 Update)'
        ]
      }
    }
  },
  en: {
    metaTitle: 'Mixed-Status Families: Immigration Options and Preparation',
    metaDesc: 'Guide for mixed-status families in the U.S. Learn about family petition options, VAWA, U Visa, and how to prepare for an immigration emergency.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '11 min read',
      tags: 'Family & Immigration',
      date: 'May 12, 2026',
      time: '11 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'Mixed-Status Families: Immigration Options and How to Prepare',
    summary: {
      title: 'Initial Summary',
      text: 'A mixed-status family is one where members with different immigration statuses live together: citizens, permanent residents, and undocumented individuals under the same roof. In this article we explain <strong>what immigration options exist</strong> based on who has legal status, what myths need to be debunked, how to prepare for a detention, and what protections like <strong>VAWA and U Visa</strong> may apply regardless of status.'
    },
    intro: [
      'In the United States, there are millions of families where not all members share the same immigration status. A father may be undocumented while his children were born here and are citizens. A wife may have permanent residency while her husband has no status at all. These are known as <strong>mixed-status families</strong>, and they face legal, emotional, and practical challenges that other families do not experience.',
      'The legal reality for these families is complex. Regularization options depend on who has status, the family relationship between members, when and how each person entered the country, and whether there are immigration or criminal records that complicate the situation.',
      'This article does not aim to provide universal solutions, because they do not exist. Every case is different. But it does offer a clear guide on the most common options, the myths circulating in the community, and the concrete steps a family can take to protect itself during an immigration emergency.',
      'Preparation does not replace legal counsel, but it can make the difference between a family that is paralyzed during a crisis and one that has an action plan ready.'
    ],
    sections: {
      whatIs: {
        title: 'What Is a Mixed-Status Family and Why It Matters',
        text: 'A mixed-status family is any household where members have different immigration situations. This can include U.S. citizens, lawful permanent residents (green card holders), people with temporary status (TPS, DACA, work visa), people with pending immigration cases, and people with no immigration status at all.',
        list: [
          'An undocumented parent with children born in the United States (citizens by birth).',
          'A wife with permanent residency married to a husband without papers.',
          'A naturalized citizen with parents who entered without inspection and have no status.',
          'Young adults with DACA whose parents are undocumented.',
          'Families where one parent has TPS and the other does not qualify for any program.'
        ],
        note: 'According to the Migration Policy Institute, it is estimated that more than 22 million people in the United States live in mixed-status households. It is a much more common reality than many believe.'
      },
      options: {
        title: 'Immigration Options Based on Who Has Papers',
        subtitle: 'What a citizen can do vs. a permanent resident',
        text: 'Family petition options depend directly on who has legal status in the family. A U.S. citizen has more options and faster priority dates than a permanent resident. Understanding this difference is essential to avoid creating false expectations.',
        list: [
          'Citizen petitioning a spouse: immediate relative, no visa limit, relatively quick process if the spouse entered legally.',
          'Citizen petitioning unmarried children under 21: immediate relative, no visa wait.',
          'Citizen petitioning parents (if the citizen is 21 or older): immediate relative.',
          'Citizen petitioning married or children over 21: preference category with years-long wait.',
          'Citizen petitioning siblings: category with wait times of up to 20 years or more.',
          'Permanent resident petitioning a spouse: category 2A, with wait times varying by country of origin.',
          'Permanent resident petitioning unmarried children under 21: category 2A.',
          'Permanent resident petitioning unmarried children over 21: category 2B, with significant wait.',
          'A permanent resident CANNOT petition for their parents or siblings. Only citizens can do so.'
        ],
        note: 'Having an approved petition does not mean the person can automatically adjust status. If they entered without inspection, they may need a waiver or consular processing, which carries its own risks.'
      },
      myths: {
        title: 'What Many People Believe That Is Not True',
        subtitle: 'Dangerous myths that can affect your case',
        text: 'In the immigrant community, many beliefs circulate about how the immigration system works. Some have a kernel of truth, but others are completely false and can lead to decisions that harm the case. It is important to separate facts from fiction.',
        list: [
          'MYTH: "My citizen child can fix my papers when they turn 18." REALITY: A citizen must be at least 21 years old to petition a parent. And having the petition does not mean you can adjust immediately if there are bars or entry without inspection.',
          'MYTH: "If I marry a citizen I already have residency." REALITY: Marriage creates the basis for a petition, but it does not grant automatic status. If you entered without inspection, you cannot adjust within the United States in most cases without a waiver or special benefit.',
          'MYTH: "If I have citizen children they cannot deport me." REALITY: Having citizen children does not prevent a deportation order. It may be a factor a judge considers in cancellation of removal, but it is not automatic protection.',
          'MYTH: "Citizen children receive public benefits and that affects my case." REALITY: Benefits received by citizen children in their own right generally do not affect the parent\'s immigration case. However, public charge rules have changed several times and it is advisable to verify current regulations.',
          'MYTH: "If my spouse abuses me and I leave, I lose all immigration rights." REALITY: If you are a victim of abuse by a citizen or resident spouse, you may qualify for VAWA, which allows you to petition without depending on your abuser.'
        ],
        warning: 'Making immigration decisions based on myths can generate serious consequences, including inadmissibility bars, deportation orders, and loss of future options. Always consult with an immigration attorney.'
      },
      emergency: {
        title: 'Preparation for Detention or Family Emergency',
        subtitle: 'What to do before a crisis occurs',
        text: 'No family wants to think about the possibility of a detention or an ICE operation affecting one of its members. But prior preparation is essential to protect children, maintain communication, and access legal representation. Preparing is not admitting guilt; it is acting responsibly.',
        list: [
          'Memorize or keep in an accessible place the phone number of an immigration attorney.',
          'Identify a trusted person who can pick up your children from school if you cannot.',
          'Prepare an emergency folder with copies of: children\'s birth certificates, passports, Social Security cards, medical records, school information, and important contacts.',
          'Include a signed letter authorizing the trusted person to make temporary medical and educational decisions for your children.',
          'Know your school district\'s policy on who can pick up children and update the list of authorized persons.',
          'Know your rights: do not open the door without a judicial warrant signed by a judge. ICE with an administrative order (I-200) does not have authority to enter your home without your consent.',
          'If you are detained, do not sign anything without speaking to an attorney. You have the right to remain silent and to legal representation.'
        ],
        note: 'The ICE Parental Interest Directive (updated in 2025) establishes that agents must consider parental interests during detention, including allowing communication with children and facilitating temporary custody arrangements. Although enforcement varies, knowing this directive can be useful.'
      },
      legalDocs: {
        title: 'Power of Attorney, Authorizations, and Essential Documents',
        subtitle: 'What you need to have ready just in case',
        text: 'One of the most important steps for a mixed-status family is having legal documents in order. This is not only about immigration papers but about documents that protect your children and family in case you are temporarily unavailable.',
        list: [
          'Power of Attorney: a legal document authorizing another person to make decisions on your behalf or for your minor children. It can be temporary or durable.',
          'Temporary care authorization: a document designating a person to care for your children if you are unavailable. Requirements vary by state.',
          'Basic will: designates who you want to have custody of your minor children if something happens to you. Without a will, a judge will decide.',
          'Identity documents for the entire family: copies of passports, birth certificates, Social Security cards, and any current immigration documents.',
          'Essential financial information: bank account numbers, insurance information, employer contact, property or lease documents.',
          'Emergency contact list: immigration attorney, trusted family member in the U.S. and in the country of origin, consulate, local community organization.'
        ],
        note: 'Requirements for powers of attorney and temporary custody authorizations vary by state. What works in California may not work in Texas. Consult with a local attorney or legal assistance organization.'
      },
      otherOptions: {
        title: 'VAWA, U Visa, and Other Independent Protections',
        subtitle: 'Options that do not depend on your family member',
        text: 'There are immigration options that do not require a family member to petition for you. These protections are designed for people in specific situations of vulnerability and allow obtaining immigration status independently. If your family situation includes abuse, crime, or military service, these options should be evaluated.',
        list: [
          'VAWA (Violence Against Women Act): allows victims of abuse by a citizen or permanent resident spouse, parent, or child to file their own petition without the knowledge or cooperation of the abuser. Despite the name, it applies to men and women.',
          'U Visa: for victims of certain serious crimes (domestic violence, sexual assault, human trafficking, among others) who cooperated or are willing to cooperate with authorities. It grants temporary status and a path to residency.',
          'T Visa: for victims of human trafficking who are in the United States as a result of trafficking and cooperate with the investigation.',
          'Military Parole in Place (PIP): for family members of active service members or veterans of the U.S. armed forces. It allows certain undocumented family members to obtain parole without leaving the country, which can open the door to adjustment of status.',
          'Cancellation of Removal for non-residents (10-Year Law): if you are in deportation proceedings, have lived in the U.S. for at least 10 years, have good moral character, and can demonstrate that your deportation would cause exceptional and extremely unusual hardship to a citizen or permanent resident family member.',
          'SIJS (Special Immigrant Juvenile Status): for minors who have been abused, abandoned, or neglected by one or both parents and who receive an order from a state court.'
        ],
        note: 'Each of these options has strict requirements and specific deadlines. Do not assume you qualify without speaking to an attorney. An error in the initial evaluation can close the door to a benefit you did qualify for.'
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'Can a minor citizen child prevent their parent from being deported?',
            a: 'Not automatically. A minor citizen child cannot file an immigration petition for their parent. The family petition requires the citizen petitioner to be at least 21 years old. However, the presence of minor citizen children can be a factor a judge considers in a cancellation of removal application, if it is demonstrated that deportation would cause them exceptional and extremely unusual hardship.'
          },
          {
            q: 'What happens if a parent is detained by ICE and has minor children at school?',
            a: 'If a parent is detained, the children do not lose their right to attend school. Public schools cannot deny enrollment based on the parents\' immigration status (Plyler v. Doe, 1982). However, someone must be able to pick up and care for the children. That is why it is essential to have a previously identified and documented authorized person.'
          },
          {
            q: 'Can a permanent resident petition for their parents?',
            a: 'No. Only U.S. citizens who are 21 years or older can petition for their parents. If you are a permanent resident and want to petition for your parents, you must first naturalize (become a citizen) and then file the I-130 petition. While you are only a resident, there is no family visa category available for parents.'
          },
          {
            q: 'Can I apply for VAWA if I am a man?',
            a: 'Yes. Although the law is called the Violence Against Women Act, VAWA protects any person who is a victim of abuse by a citizen or permanent resident spouse, parent, or child, regardless of gender. Men, women, and non-binary individuals can file a self-petition under VAWA.'
          },
          {
            q: 'If I receive public benefits, does it affect my immigration case?',
            a: 'It depends on the type of benefit and the type of immigration application. Benefits received by citizen children in their own right are generally not attributed to the immigrant parent. However, certain public benefits used by the applicant directly could be considered under the public charge rule in green card applications. The rules have changed several times in recent years. Consult with an attorney to verify the current policy before making decisions.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusion',
        text: 'Living in a mixed-status family means facing a complex legal reality that affects every aspect of daily life. From financial decisions to children\'s school plans, the immigration status of one family member impacts everyone else. But complexity does not mean there are no options.',
        advice: 'If your family faces this situation, the most important step is to evaluate your options with an immigration attorney who understands the details of your case. Do not make decisions based on what worked for someone else. Every family is different, and the right strategy depends on the specific circumstances of each case.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'USCIS – Family of U.S. Citizens',
          'USCIS – Green Card Eligibility Categories',
          'USCIS – Bringing Parents to Live in the United States as Permanent Residents',
          'USCIS – VAWA Self-Petition (Form I-360)',
          'ICE – Parental Interest Directive (2025 Update)'
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
    path: `/${lang}/blog/familias-estatus-mixto-opciones`,
    title: t.title,
    description: t.metaDesc,
    images: [{ url: IMAGES.article, alt: t.title }],
    type: 'article',
    publishedTime: '2026-05-12T08:00:00.000Z',
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
      tags: ['Estatus Mixto', 'Familia', 'Hijos Ciudadanos', 'Inmigración', 'VAWA'],
    },
    twitter: social.twitter,
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/familias-estatus-mixto-opciones`,
      languages: {
        'es': `${SITE_URL}/es/blog/familias-estatus-mixto-opciones`,
        'en': `${SITE_URL}/en/blog/familias-estatus-mixto-opciones`,
        'x-default': `${SITE_URL}/es/blog/familias-estatus-mixto-opciones`,
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
    { name: t.title, url: `/${lang}/blog/familias-estatus-mixto-opciones` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="familias-estatus-mixto-opciones"
        date="2026-05-12"
        image={IMAGES.article}
        lang={lang as string}
        readTime="11"
      
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
                     alt="Familias de estatus mixto opciones migratorias"
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

                  {/* Sección 1: Qué es */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Users size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whatIs.title}
                    </h2>
                    <p className="mb-4">{t.sections.whatIs.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.whatIs.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.whatIs.note}
                    </div>
                  </section>

                  {/* Sección 2: Opciones */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><FileText size={24} className="text-[#B2904D]" /></div>
                      {t.sections.options.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.options.subtitle}</p>
                    <p className="mb-4">{t.sections.options.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.options.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.options.note}
                    </div>
                  </section>

                  {/* Imagen interior 1 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside1}
                       alt="Opciones migratorias familias estatus mixto"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 3: Mitos */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><AlertTriangle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.myths.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.myths.subtitle}</p>
                    <p className="mb-4">{t.sections.myths.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.myths.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-red-500/10">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-sm text-red-400">
                      <AlertTriangle size={16} className="inline mr-2" />
                      {t.sections.myths.warning}
                    </div>
                  </section>

                  {/* Sección 4: Emergencia */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Shield size={24} className="text-[#B2904D]" /></div>
                      {t.sections.emergency.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.emergency.subtitle}</p>
                    <p className="mb-4">{t.sections.emergency.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.emergency.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.emergency.note}
                    </div>
                  </section>

                  {/* Sección 5: Documentos legales */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><FolderOpen size={24} className="text-[#B2904D]" /></div>
                      {t.sections.legalDocs.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.legalDocs.subtitle}</p>
                    <p className="mb-4">{t.sections.legalDocs.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.legalDocs.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.legalDocs.note}
                    </div>
                  </section>

                  {/* Imagen interior 2 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside2}
                       alt="Protecciones VAWA Visa U familias mixtas"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* Sección 6: Otras opciones */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><ShieldCheck size={24} className="text-[#B2904D]" /></div>
                      {t.sections.otherOptions.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.otherOptions.subtitle}</p>
                    <p className="mb-4">{t.sections.otherOptions.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.otherOptions.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.otherOptions.note}
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
            articles={getRelatedArticles('familias-estatus-mixto-opciones', (lang as 'es' | 'en') || 'es')}
            lang={(lang as 'es' | 'en') || 'es'}
            servicePath="/servicios/familia"
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
