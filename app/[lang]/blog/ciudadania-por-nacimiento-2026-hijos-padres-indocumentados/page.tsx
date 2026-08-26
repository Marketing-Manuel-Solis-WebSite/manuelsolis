import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle,
  AlertTriangle, MessageCircle, Send, ArrowUpRight, ShieldCheck,
  FileText, Users, Baby, Gavel, BookOpen
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
  article: '/blog/blog_36/JUL_B5.png',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Ciudadanía por Nacimiento 2026: la Corte Suprema Decide',
    metaDesc: 'La Corte Suprema reafirmó la ciudadanía por nacimiento de todo bebé nacido en EE.UU. Conoce qué significa el fallo de 2026 para tu familia y tus opciones.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '10 min de lectura',
      tags: 'Ciudadanía & Corte Suprema',
      date: '3 Jul, 2026',
      time: '10 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'La Corte Suprema confirma la ciudadanía por nacimiento: qué significa para tu familia',
    summary: {
      title: 'Resumen inicial',
      text: 'El 30 de junio de 2026, la Corte Suprema de Estados Unidos anuló la orden ejecutiva que pretendía negar documentos de ciudadanía a bebés nacidos de padres indocumentados. El fallo reafirma que la <strong>Enmienda 14 garantiza la ciudadanía por nacimiento</strong>: todos los niños nacidos en territorio estadounidense son ciudadanos, sin importar el estatus migratorio de sus padres. Aquí te explicamos qué decidió la Corte, a quién protege, qué pasa con los bebés nacidos durante el litigio, qué documentos debes tramitar y qué puertas puede abrir para tu familia.'
    },
    intro: [
      'El 30 de junio de 2026, la Corte Suprema puso fin a casi año y medio de incertidumbre para millones de familias inmigrantes: anuló la orden ejecutiva del 20 de enero de 2025 que ordenaba negar documentos de ciudadanía a bebés nacidos en Estados Unidos de padres indocumentados.',
      'La decisión reafirma un principio con raíces en la Enmienda 14 de la Constitución, ratificada en 1868: toda persona nacida en Estados Unidos y sujeta a su jurisdicción es ciudadana. Ninguna orden ejecutiva puede reescribir esa garantía constitucional, y la Corte acaba de confirmarlo.',
      'En este artículo te explicamos con palabras sencillas qué decidió exactamente la Corte, qué pretendía la orden ejecutiva, a quién protege el fallo, qué pasa con los bebés que nacieron mientras el caso estaba en los tribunales, qué documentos conviene tramitar para tu hijo, y cómo un hijo ciudadano puede abrir caminos para los padres con el tiempo.',
      'Si en tu hogar conviven distintos estatus migratorios —por ejemplo, hijos ciudadanos y padres sin papeles— te conviene conocer las opciones para <a href="/es/blog/familias-estatus-mixto-opciones" class="text-[#B2904D] underline hover:text-white">familias de estatus mixto</a>. Y si vives en Texas, nuestros <a href="/es/abogado-inmigracion-houston" class="text-[#B2904D] underline hover:text-white">abogados de inmigración en Houston</a> pueden orientarte en español sobre lo que este fallo significa para tu caso.',
      'Cada caso es diferente. <strong>Esta información es educativa y no sustituye la consulta con un abogado.</strong>'
    ],
    sections: {
      courtRuling: {
        title: 'Qué decidió exactamente la Corte Suprema',
        subtitle: 'El fallo del 30 de junio de 2026, explicado sin tecnicismos',
        text: 'El 30 de junio de 2026, la Corte Suprema resolvió el caso Trump v. Barbara y declaró inválida la orden ejecutiva del 20 de enero de 2025 que negaba documentos de ciudadanía a bebés nacidos en Estados Unidos de padres indocumentados. El fallo reafirma que la Cláusula de Ciudadanía de la Enmienda 14 significa lo que ha significado por generaciones: nacer en territorio estadounidense te hace ciudadano.',
        list: [
          '<strong>Anuló la orden ejecutiva de 2025:</strong> el gobierno ya no puede negar documentos de ciudadanía a un bebé por el estatus migratorio de sus padres.',
          '<strong>Reafirmó la Enmienda 14:</strong> la Cláusula de Ciudadanía garantiza la ciudadanía por nacimiento a quienes nacen en Estados Unidos y están sujetos a su jurisdicción.',
          '<strong>La votación fue 5-4</strong> sobre la inconstitucionalidad de la orden; el juez Kavanaugh concurrió con el resultado, pero por un fundamento estatutario (basado en la ley, no solo en la Constitución).',
          '<strong>El caso se llama Trump v. Barbara</strong> y fue litigado por la ACLU y el NAACP Legal Defense Fund en nombre de las familias afectadas.',
          '<strong>El efecto es inmediato y práctico:</strong> el registro de nacimiento, el pasaporte y los demás documentos del bebé proceden con normalidad.'
        ],
        note: 'Un fallo de la Corte Suprema sobre la Constitución es la palabra final del sistema judicial. Ninguna agencia ni orden ejecutiva puede ignorarlo: para cambiar la ciudadanía por nacimiento habría que reformar la propia Constitución, un proceso extraordinariamente exigente.'
      },
      executiveOrder: {
        title: 'Qué era la orden ejecutiva y por qué generó tanto miedo',
        subtitle: 'Del 20 de enero de 2025 al fallo que la anuló',
        text: 'La orden ejecutiva firmada el 20 de enero de 2025 instruía a las agencias federales a negar los documentos que reconocen la ciudadanía a bebés nacidos en Estados Unidos cuando sus padres no tenían estatus migratorio legal. Fue impugnada en los tribunales casi de inmediato, y durante el litigio muchas familias vivieron con la angustia de no saber si su hijo recién nacido sería tratado como ciudadano.',
        list: [
          '<strong>Qué pretendía:</strong> negar documentos de ciudadanía a bebés nacidos en Estados Unidos de padres indocumentados, rompiendo con la práctica de generaciones.',
          '<strong>Qué NO logró:</strong> una orden ejecutiva no puede reescribir la Constitución; la ciudadanía por nacimiento está en la Enmienda 14, no en un memorando presidencial.',
          '<strong>Quién la enfrentó:</strong> organizaciones como la ACLU y el NAACP Legal Defense Fund la desafiaron en corte, en el litigio que llegó a la Corte Suprema como Trump v. Barbara.',
          '<strong>Cuánto duró la incertidumbre:</strong> casi año y medio, desde enero de 2025 hasta el fallo del 30 de junio de 2026.',
          '<strong>Cómo terminó:</strong> la Corte Suprema la declaró inválida y reafirmó la regla constitucional de la ciudadanía por nacimiento.'
        ],
        note: 'Si durante ese periodo evitaste algún trámite de tu bebé por miedo, no es tarde: los documentos pueden solicitarse ahora con normalidad, como explicamos más abajo.'
      },
      whoIsProtected: {
        title: 'A quién protege el fallo',
        subtitle: 'Todos los niños nacidos en Estados Unidos siguen siendo ciudadanos',
        text: 'El efecto práctico del fallo es amplio y simple: todos los niños nacidos en territorio estadounidense siguen siendo ciudadanos, sin importar el estatus migratorio de sus padres. Esto incluye precisamente a las familias que más dudas y más miedo tuvieron durante el litigio.',
        list: [
          '<strong>Hijos de padres indocumentados:</strong> son ciudadanos desde el momento en que nacen, con todos los derechos que eso implica.',
          '<strong>Hijos de padres con estatus temporal o en trámite:</strong> visas, TPS, asilo pendiente u otros procesos; el estatus del padre o la madre no cambia la ciudadanía del bebé.',
          '<strong>Familias de estatus mixto:</strong> el fallo da certeza a los hogares donde conviven ciudadanos, residentes y personas sin estatus bajo el mismo techo.',
          '<strong>Bebés nacidos durante el litigio:</strong> no pierden absolutamente nada; su ciudadanía nunca dejó de existir.',
          '<strong>Bebés que nazcan en el futuro:</strong> la regla constitucional sigue siendo la misma que ha regido por generaciones.'
        ],
        note: 'La ciudadanía por nacimiento no requiere solicitud ni aprobación de nadie: existe desde el nacimiento por mandato constitucional. Los documentos solo la comprueban, no la crean.'
      },
      litigationBabies: {
        title: 'Qué pasa con los bebés nacidos durante el litigio',
        subtitle: 'No hay nada que "recuperar": su ciudadanía nunca se perdió',
        text: 'Una de las preguntas que más recibimos es qué pasa con los niños que nacieron entre el 20 de enero de 2025 y el 30 de junio de 2026, mientras el caso estaba en los tribunales. La respuesta que deja el fallo es clara: los nacidos durante el litigio no pierden nada. Su ciudadanía existió siempre, aunque la orden intentara desconocerla.',
        list: [
          '<strong>Su ciudadanía es de nacimiento:</strong> la Constitución se la otorgó desde el primer día; la orden ejecutiva nunca pudo quitársela legalmente.',
          '<strong>Los documentos reconocen la ciudadanía, no la crean:</strong> si un trámite se retrasó o se complicó durante el litigio, eso no afectó el estatus de tu hijo.',
          '<strong>Si te negaron o pospusieron un documento,</strong> puedes volver a solicitarlo ahora y el trámite debe proceder con normalidad.',
          '<strong>No necesitas ningún trámite especial de "reactivación":</strong> no existe tal cosa; desconfía de quien te lo ofrezca a cambio de dinero.',
          '<strong>Guarda toda la evidencia del nacimiento:</strong> acta, registros del hospital y cualquier correspondencia oficial; son la base documental de la ciudadanía de tu hijo.'
        ],
        note: 'Si tu familia recibió una negativa por escrito durante el litigio y el trámite sigue trabado, un abogado puede ayudarte a destrabarlo. Pero el derecho de fondo de tu hijo no está en duda.'
      },
      documents: {
        title: 'Acta de nacimiento y pasaporte: los documentos de tu bebé',
        subtitle: 'Los trámites proceden con normalidad, sin importar tu estatus',
        text: 'Tras el fallo, el registro de nacimiento y el pasaporte del bebé proceden con total normalidad. Estos dos documentos son la columna vertebral de la prueba de ciudadanía de tu hijo, y conviene tenerlos en orden desde temprano, no cuando surja una urgencia.',
        list: [
          '<strong>Acta de nacimiento:</strong> el hospital inicia el registro y la oficina de registros vitales del estado emite el acta; es la prueba principal de que tu hijo nació en Estados Unidos.',
          '<strong>Pasaporte estadounidense:</strong> puedes solicitarlo para tu bebé presentando el acta de nacimiento; es una prueba fuerte y portátil de su ciudadanía.',
          '<strong>Tu estatus migratorio no es un obstáculo:</strong> el trámite es del niño, y el estatus de los padres no determina el resultado.',
          '<strong>Guarda copias certificadas</strong> en un lugar seguro y considera dejar copias adicionales con una persona de confianza.',
          '<strong>Verifica que los datos estén correctos:</strong> nombres, fechas y lugares; corregir un error temprano es mucho más simple que hacerlo años después.'
        ],
        note: 'No existe ningún trámite de pago para "asegurar" o "activar" la ciudadanía de tu bebé. El acta y el pasaporte son los documentos que la comprueban; cualquier otra cosa que te vendan es innecesaria o directamente un fraude.'
      },
      parentsBenefit: {
        title: 'Cómo puede beneficiar a los padres en el futuro',
        subtitle: 'Un hijo ciudadano abre puertas, aunque no de inmediato',
        text: 'Tener un hijo ciudadano no te da estatus automático como padre o madre, pero sí puede abrir caminos con el tiempo. El más conocido es la petición familiar cuando el hijo cumple 21 años, y según tu historial migratorio pueden existir otras vías que conviene evaluar con anticipación.',
        list: [
          '<strong>Petición familiar a los 21 años:</strong> un hijo ciudadano puede pedir la residencia de sus padres al cumplir 21 años.',
          '<strong>No es automático:</strong> es un proceso con requisitos, y el camino correcto depende de cómo entró cada padre a Estados Unidos y de su historial.',
          '<strong>Si entraste sin inspección,</strong> el proceso puede requerir el perdón provisional I-601A y completar una parte del trámite fuera del país; hacerlo bien exige planificación seria.',
          '<strong>Familias de estatus mixto:</strong> mientras llega ese momento pueden existir otras opciones según el caso concreto; por eso vale la pena una evaluación individual.',
          '<strong>Lo que ayuda desde hoy:</strong> mantener un historial limpio, guardar evidencia de tu presencia en el país y tener los documentos de toda la familia en orden.'
        ],
        note: 'Ninguna de estas vías es garantizada ni instantánea. El valor real de una evaluación legal está en saber, con años de anticipación, qué camino te conviene preparar y qué errores debes evitar en el camino.'
      },
      fraudAlerts: {
        title: 'Señales de alerta: fraudes y desinformación después del fallo',
        subtitle: 'Las noticias grandes también atraen a los estafadores',
        text: 'Cada vez que hay una noticia migratoria importante, aparecen personas que cobran por trámites inexistentes o que venden pánico. Además, organizaciones de derechos de los inmigrantes advierten que hay que mantenerse vigilantes ante posibles nuevos intentos legislativos de limitar la ciudadanía por nacimiento. Estas señales te ayudan a proteger tu dinero y tu caso.',
        list: [
          '<strong>Nadie puede cobrarte por "activar" la ciudadanía de tu bebé:</strong> es automática por nacimiento; ese trámite simplemente no existe.',
          '<strong>Un "notario" no es abogado en Estados Unidos:</strong> desconfía de quien no pueda demostrar que tiene licencia para ejercer la abogacía.',
          '<strong>Cuidado con promesas de "papeles rápidos" para los padres:</strong> el fallo no crea ningún estatus nuevo ni amnistía para los adultos.',
          '<strong>No pagues por información que es gratuita:</strong> los formularios y avisos oficiales de USCIS y del Departamento de Estado son públicos.',
          '<strong>Desconfía de la urgencia fabricada:</strong> si alguien te presiona con frases como "es tu última oportunidad", casi siempre es una estafa.'
        ],
        warning: 'Si alguien te pide dinero para "garantizar" la ciudadanía de tu hijo o tu residencia gracias a este fallo, aléjate y consulta con un abogado licenciado antes de firmar o pagar cualquier cosa.'
      },
      faq: {
        title: 'Preguntas Frecuentes',
        items: [
          {
            q: '¿Mi bebé nacido en Estados Unidos es ciudadano aunque yo no tenga papeles?',
            a: '<strong>Sí.</strong> El 30 de junio de 2026, la Corte Suprema reafirmó que la Enmienda 14 garantiza la ciudadanía por nacimiento. Todos los niños nacidos en territorio estadounidense son ciudadanos, sin importar el estatus migratorio de sus padres.'
          },
          {
            q: 'Mi hijo nació mientras la orden ejecutiva estaba en litigio. ¿Perdió algo?',
            a: '<strong>No.</strong> Los bebés nacidos durante el litigio no pierden nada: su ciudadanía existe desde el nacimiento por mandato constitucional. Si algún documento se retrasó o fue negado en ese periodo, puedes solicitarlo ahora con normalidad.'
          },
          {
            q: '¿Registrar el nacimiento o pedir el pasaporte de mi bebé me pone en riesgo como padre indocumentado?',
            a: 'El registro de nacimiento y el pasaporte <strong>son trámites del niño y proceden con normalidad</strong>; son procesos rutinarios que miles de familias realizan cada día. Si tienes antecedentes penales u órdenes previas de deportación, consulta primero con un abogado para revisar tu situación particular.'
          },
          {
            q: '¿Este fallo me da estatus legal a mí como padre o madre?',
            a: '<strong>No de forma directa.</strong> El fallo protege la ciudadanía del bebé, no cambia el estatus de los adultos. Sin embargo, un hijo ciudadano puede pedir a sus padres al cumplir 21 años, y según el caso pueden existir otras vías; por ejemplo, quien entró sin inspección podría necesitar el perdón provisional I-601A dentro de ese proceso.'
          },
          {
            q: '¿Pueden quitar la ciudadanía por nacimiento con una nueva orden o una ley?',
            a: 'Una orden ejecutiva <strong>no puede</strong>: la Corte acaba de confirmarlo. Cambiar la regla exigiría reformar la propia Constitución, un proceso extraordinariamente difícil. Aun así, organizaciones de derechos de los inmigrantes recomiendan mantenerse atentos a nuevos intentos legislativos y verificar siempre la información con fuentes confiables.'
          },
          {
            q: '¿Qué documentos prueban la ciudadanía de mi hijo?',
            a: 'Los dos principales son el <strong>acta de nacimiento</strong> emitida por el estado y el <strong>pasaporte estadounidense</strong>. Guarda copias certificadas en un lugar seguro y corrige a tiempo cualquier error en nombres, fechas o lugares.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusión',
        text: 'El fallo del 30 de junio de 2026 cierra un capítulo de miedo e incertidumbre: la Corte Suprema reafirmó que la ciudadanía por nacimiento está protegida por la Enmienda 14 y anuló la orden que pretendía negársela a los bebés de padres indocumentados. Tu hijo nacido en Estados Unidos es ciudadano, sus documentos proceden con normalidad, y esa ciudadanía puede abrir caminos para toda la familia con el tiempo.',
        advice: 'Registra el nacimiento de tu bebé, solicita su pasaporte, guarda copias certificadas y desconfía de quien cobre por "asegurar" lo que la Constitución ya garantiza. Si en tu hogar conviven distintos estatus migratorios, una evaluación legal a tiempo puede marcar la diferencia en el futuro de todos.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'SCOTUSblog – Cobertura del fallo (30 de junio de 2026)',
          'American Immigration Council – Birthright Citizenship',
          'ACLU / NAACP LDF – Trump v. Barbara',
          'USCIS – Ciudadanía por nacimiento y documentos',
          'Constitución de EE.UU. – Enmienda 14, Cláusula de Ciudadanía'
        ]
      }
    }
  },
  en: {
    metaTitle: 'Birthright Citizenship Upheld: The 2026 Supreme Court Ruling',
    metaDesc: 'The Supreme Court reaffirmed birthright citizenship for every baby born in the U.S. Learn what the 2026 ruling means for your family and your options.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '10 min read',
      tags: 'Citizenship & Supreme Court',
      date: 'Jul 3, 2026',
      time: '10 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'The Supreme Court Upholds Birthright Citizenship: What It Means for Your Family',
    summary: {
      title: 'Initial Summary',
      text: 'On June 30, 2026, the U.S. Supreme Court struck down the executive order that sought to deny citizenship documents to babies born to undocumented parents. The ruling reaffirms that the <strong>14th Amendment guarantees birthright citizenship</strong>: every child born on U.S. soil is a citizen, no matter their parents\' immigration status. Here is what the Court decided, who the ruling protects, what happens to babies born during the litigation, which documents to get for your child, and what doors it may open for your family.'
    },
    intro: [
      'On June 30, 2026, the Supreme Court ended nearly a year and a half of uncertainty for millions of immigrant families: it struck down the January 20, 2025 executive order that directed federal agencies to deny citizenship documents to U.S.-born babies of undocumented parents.',
      'The decision reaffirms a principle rooted in the 14th Amendment to the Constitution, ratified in 1868: every person born in the United States and subject to its jurisdiction is a citizen. No executive order can rewrite that constitutional guarantee, and the Court has just confirmed it.',
      'In this article we explain in plain language what exactly the Court decided, what the executive order attempted to do, who the ruling protects, what happens to babies born while the case was in the courts, which documents you should obtain for your child, and how a citizen child can open doors for the parents over time.',
      'If your household combines different immigration statuses — for example, citizen children and parents without papers — it is worth understanding the options for <a href="/en/blog/familias-estatus-mixto-opciones" class="text-[#B2904D] underline hover:text-white">mixed-status families</a>. And if you live in Texas, our <a href="/en/abogado-inmigracion-houston" class="text-[#B2904D] underline hover:text-white">immigration attorneys in Houston</a> can review what this ruling means for your case, in Spanish or English.',
      'Every case is different. <strong>This information is educational and does not replace consultation with an attorney.</strong>'
    ],
    sections: {
      courtRuling: {
        title: 'What Exactly the Supreme Court Decided',
        subtitle: 'The June 30, 2026 ruling, explained without legal jargon',
        text: 'On June 30, 2026, the Supreme Court decided Trump v. Barbara and struck down the January 20, 2025 executive order that denied citizenship documents to U.S.-born babies of undocumented parents. The ruling reaffirms that the Citizenship Clause of the 14th Amendment means what it has meant for generations: being born on U.S. soil makes you a citizen.',
        list: [
          '<strong>It struck down the 2025 executive order:</strong> the government can no longer deny a baby citizenship documents because of the parents\' immigration status.',
          '<strong>It reaffirmed the 14th Amendment:</strong> the Citizenship Clause guarantees birthright citizenship to those born in the United States and subject to its jurisdiction.',
          '<strong>The vote was 5-4</strong> on the order\'s unconstitutionality; Justice Kavanaugh concurred in the result, but on statutory grounds (based on the law, not only the Constitution).',
          '<strong>The case is called Trump v. Barbara</strong> and was litigated by the ACLU and the NAACP Legal Defense Fund on behalf of the affected families.',
          '<strong>The effect is immediate and practical:</strong> birth registration, passports, and the baby\'s other documents proceed normally.'
        ],
        note: 'A Supreme Court ruling on the Constitution is the final word of the judicial system. No agency or executive order can ignore it: changing birthright citizenship would require amending the Constitution itself, an extraordinarily demanding process.'
      },
      executiveOrder: {
        title: 'What the Executive Order Was and Why It Caused So Much Fear',
        subtitle: 'From January 20, 2025 to the ruling that struck it down',
        text: 'The executive order signed on January 20, 2025 instructed federal agencies to deny the documents that recognize citizenship to babies born in the United States when their parents lacked legal immigration status. It was challenged in court almost immediately, and while the case was litigated, many families lived with the anguish of not knowing whether their newborn would be treated as a citizen.',
        list: [
          '<strong>What it attempted:</strong> to deny citizenship documents to U.S.-born babies of undocumented parents, breaking with generations of settled practice.',
          '<strong>What it could NOT do:</strong> an executive order cannot rewrite the Constitution; birthright citizenship lives in the 14th Amendment, not in a presidential memo.',
          '<strong>Who fought it:</strong> organizations including the ACLU and the NAACP Legal Defense Fund challenged it in court, in the litigation that reached the Supreme Court as Trump v. Barbara.',
          '<strong>How long the uncertainty lasted:</strong> nearly a year and a half, from January 2025 until the ruling of June 30, 2026.',
          '<strong>How it ended:</strong> the Supreme Court declared it invalid and reaffirmed the constitutional rule of birthright citizenship.'
        ],
        note: 'If you postponed any of your baby\'s paperwork out of fear during that period, it is not too late: those documents can be requested now and processed normally, as we explain below.'
      },
      whoIsProtected: {
        title: 'Who the Ruling Protects',
        subtitle: 'Every child born in the United States remains a citizen',
        text: 'The practical effect of the ruling is broad and simple: all children born on U.S. soil remain citizens, regardless of their parents\' immigration status. That includes precisely the families who had the most doubts and the most fear while the case was in court.',
        list: [
          '<strong>Children of undocumented parents:</strong> they are citizens from the moment they are born, with all the rights that citizenship carries.',
          '<strong>Children of parents with temporary or pending status:</strong> visas, TPS, pending asylum, or other processes; a parent\'s status does not change the baby\'s citizenship.',
          '<strong>Mixed-status families:</strong> the ruling gives certainty to households where citizens, residents, and people without status live under the same roof.',
          '<strong>Babies born during the litigation:</strong> they lose absolutely nothing; their citizenship never ceased to exist.',
          '<strong>Babies born in the future:</strong> the constitutional rule remains the same one that has governed for generations.'
        ],
        note: 'Birthright citizenship does not require an application or anyone\'s approval: it exists from birth by constitutional mandate. Documents only prove it; they do not create it.'
      },
      litigationBabies: {
        title: 'What Happens to Babies Born During the Litigation',
        subtitle: 'There is nothing to "recover": their citizenship was never lost',
        text: 'One of the questions we hear most often is what happens to children born between January 20, 2025 and June 30, 2026, while the case was in the courts. The answer the ruling leaves is clear: children born during the litigation lose nothing. Their citizenship always existed, even while the order tried to deny it.',
        list: [
          '<strong>Their citizenship is by birth:</strong> the Constitution granted it from day one; the executive order could never lawfully take it away.',
          '<strong>Documents recognize citizenship, they do not create it:</strong> if a filing was delayed or complicated during the litigation, that did not affect your child\'s status.',
          '<strong>If a document was denied or put on hold,</strong> you can request it again now and the process should move forward normally.',
          '<strong>You do not need any special "reactivation" filing:</strong> no such procedure exists; be wary of anyone offering it for money.',
          '<strong>Keep all the evidence of the birth:</strong> the birth certificate, hospital records, and any official correspondence; they are the documentary foundation of your child\'s citizenship.'
        ],
        note: 'If your family received a written denial during the litigation and the paperwork is still stuck, an attorney can help you unblock it. But your child\'s underlying right is not in question.'
      },
      documents: {
        title: 'Birth Certificate and Passport: Your Baby\'s Documents',
        subtitle: 'These processes move forward normally, whatever your status',
        text: 'After the ruling, birth registration and the baby\'s passport proceed completely normally. These two documents are the backbone of your child\'s proof of citizenship, and it pays to have them in order early — not when an emergency arises.',
        list: [
          '<strong>Birth certificate:</strong> the hospital starts the registration and the state\'s vital records office issues the certificate; it is the primary proof that your child was born in the United States.',
          '<strong>U.S. passport:</strong> you can apply for your baby\'s passport with the birth certificate; it is strong, portable proof of citizenship.',
          '<strong>Your immigration status is not an obstacle:</strong> the application belongs to the child, and the parents\' status does not determine the outcome.',
          '<strong>Keep certified copies</strong> in a safe place and consider leaving additional copies with someone you trust.',
          '<strong>Check that every detail is correct:</strong> names, dates, and places; fixing an error early is far simpler than fixing it years later.'
        ],
        note: 'There is no paid procedure to "secure" or "activate" your baby\'s citizenship. The birth certificate and the passport are the documents that prove it; anything else being sold to you is unnecessary or outright fraud.'
      },
      parentsBenefit: {
        title: 'How It Can Benefit the Parents in the Future',
        subtitle: 'A citizen child opens doors, though not immediately',
        text: 'Having a citizen child does not give you automatic status as a parent, but it can open paths over time. The best known is the family petition once the child turns 21, and depending on your immigration history there may be other routes worth evaluating well in advance.',
        list: [
          '<strong>Family petition at age 21:</strong> a citizen child can petition for their parents\' residency upon turning 21.',
          '<strong>It is not automatic:</strong> it is a process with requirements, and the right path depends on how each parent entered the United States and on their record.',
          '<strong>If you entered without inspection,</strong> the process may require the I-601A provisional waiver and completing part of the process outside the country; doing it right takes serious planning.',
          '<strong>Mixed-status families:</strong> other options may exist in the meantime depending on the specific case; that is why an individual evaluation is worthwhile.',
          '<strong>What helps starting today:</strong> keeping a clean record, saving evidence of your presence in the country, and keeping the whole family\'s documents in order.'
        ],
        note: 'None of these paths is guaranteed or instant. The real value of a legal evaluation is knowing, years in advance, which route you should prepare for and which mistakes to avoid along the way.'
      },
      fraudAlerts: {
        title: 'Red Flags: Fraud and Misinformation After the Ruling',
        subtitle: 'Big news also attracts scammers',
        text: 'Every time there is major immigration news, people appear who charge for procedures that do not exist or who sell panic. In addition, immigrant rights organizations warn that families should stay vigilant against possible new legislative attempts to limit birthright citizenship. These warning signs help you protect your money and your case.',
        list: [
          '<strong>No one can charge you to "activate" your baby\'s citizenship:</strong> it is automatic at birth; that procedure simply does not exist.',
          '<strong>A "notario" is not a lawyer in the United States:</strong> be wary of anyone who cannot prove they are licensed to practice law.',
          '<strong>Beware of promises of "fast papers" for the parents:</strong> the ruling does not create any new status or amnesty for adults.',
          '<strong>Do not pay for information that is free:</strong> official USCIS and State Department forms and notices are public.',
          '<strong>Distrust manufactured urgency:</strong> if someone pressures you with lines like "this is your last chance," it is almost always a scam.'
        ],
        warning: 'If anyone asks you for money to "guarantee" your child\'s citizenship or your own residency because of this ruling, walk away and consult a licensed attorney before signing or paying anything.'
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'Is my U.S.-born baby a citizen even though I have no papers?',
            a: '<strong>Yes.</strong> On June 30, 2026, the Supreme Court reaffirmed that the 14th Amendment guarantees birthright citizenship. Every child born on U.S. soil is a citizen, regardless of the parents\' immigration status.'
          },
          {
            q: 'My child was born while the executive order was being litigated. Did they lose anything?',
            a: '<strong>No.</strong> Babies born during the litigation lose nothing: their citizenship exists from birth by constitutional mandate. If any document was delayed or denied during that period, you can request it now and it should be processed normally.'
          },
          {
            q: 'Does registering the birth or applying for my baby\'s passport put me at risk as an undocumented parent?',
            a: 'Birth registration and the passport <strong>are the child\'s processes and they proceed normally</strong>; they are routine procedures that thousands of families complete every day. If you have a criminal record or prior deportation orders, consult an attorney first to review your particular situation.'
          },
          {
            q: 'Does this ruling give me legal status as a parent?',
            a: '<strong>Not directly.</strong> The ruling protects the baby\'s citizenship; it does not change the adults\' status. However, a citizen child can petition for their parents at age 21, and depending on the case other routes may exist; for example, someone who entered without inspection may need the I-601A provisional waiver as part of that process.'
          },
          {
            q: 'Can birthright citizenship be taken away with a new order or a new law?',
            a: 'An executive order <strong>cannot</strong> — the Court has just confirmed it. Changing the rule would require amending the Constitution itself, an extraordinarily difficult process. Even so, immigrant rights organizations recommend staying alert to new legislative attempts and always verifying information with trustworthy sources.'
          },
          {
            q: 'Which documents prove my child\'s citizenship?',
            a: 'The two main ones are the <strong>birth certificate</strong> issued by the state and the <strong>U.S. passport</strong>. Keep certified copies in a safe place and correct any error in names, dates, or places as soon as possible.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusion',
        text: 'The June 30, 2026 ruling closes a chapter of fear and uncertainty: the Supreme Court reaffirmed that birthright citizenship is protected by the 14th Amendment and struck down the order that sought to deny it to babies of undocumented parents. Your U.S.-born child is a citizen, their documents proceed normally, and that citizenship can open paths for the whole family over time.',
        advice: 'Register your baby\'s birth, apply for their passport, keep certified copies, and be wary of anyone who charges to "secure" what the Constitution already guarantees. If your household combines different immigration statuses, a timely legal evaluation can make a difference in everyone\'s future.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'SCOTUSblog – Coverage of the ruling (June 30, 2026)',
          'American Immigration Council – Birthright Citizenship',
          'ACLU / NAACP LDF – Trump v. Barbara',
          'USCIS – Birthright citizenship and documents',
          'U.S. Constitution – 14th Amendment, Citizenship Clause'
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
    path: `/${lang}/blog/ciudadania-por-nacimiento-2026-hijos-padres-indocumentados`,
    title: t.title,
    description: t.metaDesc,
    images: [{ url: IMAGES.article, alt: t.title }],
    type: 'article',
    publishedTime: '2026-07-03T08:00:00.000Z',
  });

  return {
    title: { absolute: t.metaTitle },
    description: t.metaDesc,
    openGraph: {
      ...social.openGraph,
      // Campos article:* que buildSocialMetadata no cubre.
      type: 'article',
      authors: ['Manuel Solís'],
      section: 'Procesos Migratorios',
      tags: ['Ciudadanía por Nacimiento', 'Corte Suprema', 'Enmienda 14', 'Hijos Ciudadanos', 'Inmigración 2026'],
    },
    twitter: social.twitter,
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/ciudadania-por-nacimiento-2026-hijos-padres-indocumentados`,
      languages: {
        'es': `${SITE_URL}/es/blog/ciudadania-por-nacimiento-2026-hijos-padres-indocumentados`,
        'en': `${SITE_URL}/en/blog/ciudadania-por-nacimiento-2026-hijos-padres-indocumentados`,
        'x-default': `${SITE_URL}/es/blog/ciudadania-por-nacimiento-2026-hijos-padres-indocumentados`,
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
    { name: t.title, url: `/${lang}/blog/ciudadania-por-nacimiento-2026-hijos-padres-indocumentados` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="ciudadania-por-nacimiento-2026-hijos-padres-indocumentados"
        date="2026-07-03"
        image={IMAGES.article}
        lang={lang as string}
        readTime="10"
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
        category="Procesos Migratorios"
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
                     alt="Corte Suprema confirma la ciudadanía por nacimiento en Estados Unidos"
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

                  {/* courtRuling */}
                  <section>
                    <h2 id="que-decidio-la-corte" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Gavel size={24} className="text-[#B2904D]" /></div>
                      {t.sections.courtRuling.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.courtRuling.subtitle}</p>
                    <p className="mb-4">{t.sections.courtRuling.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.courtRuling.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.courtRuling.note}
                    </div>
                  </section>

                  {/* executiveOrder */}
                  <section>
                    <h2 id="que-era-la-orden-ejecutiva" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><FileText size={24} className="text-[#B2904D]" /></div>
                      {t.sections.executiveOrder.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.executiveOrder.subtitle}</p>
                    <p className="mb-4">{t.sections.executiveOrder.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.executiveOrder.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.executiveOrder.note}
                    </div>
                  </section>

                  {/* whoIsProtected */}
                  <section>
                    <h2 id="a-quien-protege" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><ShieldCheck size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whoIsProtected.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.whoIsProtected.subtitle}</p>
                    <p className="mb-4">{t.sections.whoIsProtected.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.whoIsProtected.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.whoIsProtected.note}
                    </div>
                  </section>

                  {/* litigationBabies */}
                  <section>
                    <h2 id="que-pasa-con-los-bebes-del-litigio" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Baby size={24} className="text-[#B2904D]" /></div>
                      {t.sections.litigationBabies.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.litigationBabies.subtitle}</p>
                    <p className="mb-4">{t.sections.litigationBabies.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.litigationBabies.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.litigationBabies.note}
                    </div>
                  </section>

                  {/* documents */}
                  <section>
                    <h2 id="documentos-acta-pasaporte" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><BookOpen size={24} className="text-[#B2904D]" /></div>
                      {t.sections.documents.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.documents.subtitle}</p>
                    <p className="mb-4">{t.sections.documents.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.documents.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.documents.note}
                    </div>
                  </section>

                  {/* parentsBenefit */}
                  <section>
                    <h2 id="como-beneficia-a-los-padres" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Users size={24} className="text-[#B2904D]" /></div>
                      {t.sections.parentsBenefit.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.parentsBenefit.subtitle}</p>
                    <p className="mb-4">{t.sections.parentsBenefit.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.parentsBenefit.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.parentsBenefit.note}
                    </div>
                  </section>

                  {/* fraudAlerts */}
                  <section>
                    <h2 id="senales-de-alerta-fraudes" className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><AlertTriangle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.fraudAlerts.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.fraudAlerts.subtitle}</p>
                    <p className="mb-4">{t.sections.fraudAlerts.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.fraudAlerts.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 p-5 bg-red-500/10 rounded-xl border border-red-500/20">
                      <p className="text-red-400 font-bold m-0 flex items-start gap-2">
                        <AlertTriangle size={20} className="shrink-0 mt-1" />
                        {t.sections.fraudAlerts.warning}
                      </p>
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
                      <h2 id="conclusion" className="text-2xl font-bold font-serif mb-4 flex items-center gap-2">
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
            articles={getRelatedArticles('ciudadania-por-nacimiento-2026-hijos-padres-indocumentados', (lang as 'es' | 'en') || 'es')}
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
