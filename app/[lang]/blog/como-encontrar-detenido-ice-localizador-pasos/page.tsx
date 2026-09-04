import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle,
  AlertTriangle, MessageCircle, Send, ArrowUpRight, FileText, Search,
  Phone, Ban, Users, Scale
} from 'lucide-react';

// IMPORTACIONES
import { generateBreadcrumbSchema } from '../../../lib/breadcrumbSchema';
import { addInlineLinks, createInlineLinkState } from '../../../lib/blogInlineLinks';
import { buildSocialMetadata } from '../../../lib/seoMetadata';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BlogBackground from '../../../components/blogs/BlogBackground';
import InlineLinkedText from '../../../components/blogs/InlineLinkedText';
import ShareButtons from '../../../components/blogs/ShareButtons';
import ContactForm from '../../../components/ContactForm';
import BlogTracker from '../../../components/blogs/BlogTracker';
import ReadingProgress from '../../../components/blogs/ReadingProgress';
import RelatedContent from '../../../components/blogs/RelatedContent';
import { getRelatedArticles } from '../../../lib/blogRelations';
import BlogSchema from '../../../components/blogs/BlogSchema';


const SITE_URL = 'https://www.manuelsolis.com';

const IMAGES = {
  article: '/blog/blog_34/JUL_B3.png',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Cómo Encontrar a un Detenido por ICE: Guía Paso a Paso',
    metaDesc: 'Aprende a localizar a tu familiar detenido por ICE: cómo usar el localizador oficial, qué es el número A y qué hacer en las primeras 48 horas. Guía en español.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '10 min de lectura',
      tags: 'Defensa contra Deportación',
      date: '1 Jul, 2026',
      time: '10 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'Cómo encontrar a un familiar detenido por ICE: localizador, número A y primeros pasos',
    summary: {
      title: 'Resumen inicial',
      text: 'Si ICE detuvo a un ser querido, hay pasos concretos que puedes tomar hoy mismo: buscarlo en el <strong>localizador oficial de detenidos</strong> (locator.ice.gov) con su <strong>número A</strong> o con sus datos biográficos, anotar el nombre del centro de detención en la primera llamada, y asegurarte de que <strong>no firme ningún documento</strong> sin hablar antes con un abogado. Esta guía explica cada paso, qué hacer si no aparece en el sistema y cómo ayudar desde afuera.'
    },
    intro: [
      'Pocas cosas producen tanta angustia como que un ser querido no llegue a casa y después enterarte de que fue detenido por ICE (el Servicio de Inmigración y Control de Aduanas). Las primeras horas se sienten como un vacío: no sabes dónde está, no puedes comunicarte con él y nadie parece tener respuestas claras.',
      'La buena noticia es que sí existe un camino ordenado para encontrarlo. El gobierno mantiene un sistema público llamado Localizador de Detenidos en Línea, y con un dato clave —el número A— o con los datos biográficos correctos, la mayoría de las familias logra ubicar a su ser querido en cuestión de uno o dos días.',
      'En esta guía te explicamos paso a paso cómo usar el localizador, qué hacer si tu familiar no aparece en el sistema, qué anotar en la primera llamada desde el centro de detención, qué documentos no debe firmar jamás sin asesoría, y cómo puedes ayudar desde afuera para preparar una posible audiencia de fianza.',
      'En el Bufete de Manuel Solís, <a href="/es/clientes-detenidos" class="text-[#B2904D] underline hover:text-white">nuestro equipo para clientes detenidos</a> trabaja con estas situaciones todos los días. Y si quieres que tu familia esté preparada antes de una emergencia, también te recomendamos conocer <a href="/es/blog/redadas-ice-2026-derechos-plan-emergencia-familiar" class="text-[#B2904D] underline hover:text-white">tus derechos durante una redada de ICE</a>.',
      'Cada caso es diferente. <strong>Esta información es educativa y no sustituye la consulta con un abogado.</strong>'
    ],
    sections: {
      aNumber: {
        title: 'Qué es el número A y dónde encontrarlo',
        subtitle: 'El dato más importante para localizar a tu familiar',
        text: 'El número A (Alien Registration Number, o número de registro de extranjero) es el identificador que el gobierno de Estados Unidos asigna a una persona dentro del sistema de inmigración. Es la llave que abre casi todas las puertas: con él puedes buscar a tu familiar en el localizador de ICE, verificar si ya tiene un caso ante la corte de inmigración y ayudar a que un abogado actúe rápido.',
        list: [
          '<strong>Es un número de 9 dígitos</strong> que va precedido por la letra "A" y aparece en la mayoría de los documentos que emiten las autoridades de inmigración.',
          '<strong>Búscalo en la Notificación de Comparecencia (formulario I-862):</strong> es el documento que ordena a la persona presentarse ante la corte de inmigración, y el número A aparece impreso en la parte superior.',
          '<strong>Revisa documentos migratorios anteriores:</strong> permisos de trabajo, solicitudes pasadas y cartas de inmigración de trámites previos suelen incluirlo.',
          '<strong>Pídelo en la primera llamada:</strong> si tu familiar ya está detenido, le asignan o le confirman su número A al procesarlo; anótalo apenas te lo diga.',
          '<strong>Guárdalo en un lugar seguro</strong> y compártelo con una persona de confianza: toda la familia debería poder encontrarlo en segundos.'
        ],
        note: 'Si tu familiar nunca tuvo contacto con inmigración, es posible que no tenga número A hasta que ICE lo procese. Aun así puedes buscarlo en el localizador por nombre exacto, país de nacimiento y fecha de nacimiento.'
      },
      locator: {
        title: 'Cómo usar el localizador de detenidos de ICE paso a paso',
        subtitle: 'locator.ice.gov: la herramienta oficial y gratuita',
        text: 'ICE mantiene un sistema público en línea llamado Localizador de Detenidos (Online Detainee Locator System), disponible en locator.ice.gov/odls. Es gratuito, funciona desde cualquier celular y no necesitas crear una cuenta. Hay dos maneras de buscar:',
        list: [
          '<strong>Opción 1 — Por número A:</strong> escribe el número A de 9 dígitos y selecciona el país de nacimiento de la persona. Es la búsqueda más confiable.',
          '<strong>Opción 2 — Por datos biográficos:</strong> si no tienes el número A, busca por nombre y apellido exactos, país de nacimiento y fecha de nacimiento.',
          '<strong>El nombre debe coincidir exactamente</strong> con el que ICE registró: una letra distinta o un apellido de más puede dar cero resultados.',
          '<strong>Qué verás si lo encuentras:</strong> el nombre del centro de detención donde está la persona y la información para contactar esa instalación.',
          '<strong>También puedes llamar por teléfono:</strong> la línea de información de detención de ICE es el <strong>1-888-351-4024</strong>.',
          '<strong>Nunca pagues por esta información:</strong> el localizador es público y gratuito; desconfía de cualquiera que cobre por "encontrar" a un detenido.'
        ],
        note: 'Guarda una captura de pantalla del resultado con la fecha. Los traslados entre centros de detención ocurren, y conviene tener un registro de dónde estaba la persona y cuándo.'
      },
      notFound: {
        title: 'Qué hacer si tu familiar no aparece en el sistema',
        subtitle: 'No aparecer todavía no significa que no esté detenido',
        text: 'Es el momento más angustiante: haces la búsqueda y el sistema dice que no hay resultados. Antes de asumir lo peor, toma en cuenta que el localizador no se actualiza al instante y que los errores de captura de datos son muy comunes.',
        list: [
          '<strong>Espera de 24 a 48 horas:</strong> una persona recién arrestada puede tardar uno o dos días en aparecer en el sistema mientras ICE la procesa.',
          '<strong>Prueba variantes del nombre:</strong> con y sin segundo apellido, con y sin acentos, y con los apellidos en distinto orden. El sistema exige coincidencia exacta.',
          '<strong>Verifica la fecha de nacimiento y el país:</strong> un solo dato equivocado hace que la búsqueda falle aunque la persona sí esté detenida.',
          '<strong>Si es menor de edad, no aparecerá:</strong> el localizador de ICE no incluye a menores. En ese caso, busca ayuda legal de inmediato.',
          '<strong>Llama a la línea de ICE (1-888-351-4024)</strong> con el nombre completo, el país de nacimiento y la fecha de nacimiento a la mano.',
          '<strong>Consulta el sistema de la corte de inmigración:</strong> con el número A puedes llamar a la línea automatizada de EOIR al <strong>1-800-898-7180</strong> para saber si ya existe un caso ante el juez.'
        ],
        warning: 'Cuidado con el fraude: en momentos de crisis aparecen "notarios" y gestores que cobran por información que es pública y gratuita. Verifica siempre con las fuentes oficiales antes de pagarle a nadie.'
      },
      firstCall: {
        title: 'La primera llamada: qué preguntar y qué anotar',
        subtitle: 'Dos datos valen oro: el número A y el nombre del centro',
        text: 'Cuando tu familiar logre llamar por primera vez desde el centro de detención, la llamada puede ser corta, cara y con mala señal. Ten papel y pluma junto al teléfono y sigue este orden de prioridades:',
        list: [
          '<strong>1. Anota su número A:</strong> es lo primero que debes pedirle, antes que cualquier otra cosa. Sin ese número, todo lo demás se vuelve más lento.',
          '<strong>2. Anota el nombre exacto del centro de detención</strong> y la ciudad y el estado donde se encuentra. Con estos dos datos, un abogado puede empezar a trabajar el mismo día.',
          '<strong>3. Pregunta por su salud:</strong> si necesita medicamentos o tiene una condición médica, debe reportarla al personal del centro cuanto antes.',
          '<strong>4. Recuérdale que no firme nada</strong> sin hablar primero con un abogado, sin importar cuánta presión sienta.',
          '<strong>5. Recuérdale sus derechos:</strong> puede guardar silencio sobre su situación migratoria y pedir hablar con un abogado.',
          '<strong>6. Acuerden un horario de llamadas:</strong> saber cuándo volverá a llamar reduce la angustia y evita perder comunicaciones importantes.'
        ],
        note: 'Las llamadas desde los centros de detención normalmente son grabadas o monitoreadas (salvo las llamadas legales con su abogado). Eviten discutir por teléfono los detalles del caso migratorio: esos temas se tratan con el abogado.'
      },
      doNotSign: {
        title: 'Qué no debe firmar tu familiar (y por qué importa tanto)',
        subtitle: 'Una firma apresurada puede cerrar defensas para siempre',
        text: 'Dentro del centro de detención puede haber presión para firmar documentos "para salir más rápido". Firmar sin asesoría legal es una de las decisiones más costosas que existen en un caso de inmigración, porque puede eliminar defensas que un abogado habría podido presentar ante un juez.',
        list: [
          '<strong>La salida voluntaria:</strong> firmarla puede significar renunciar a ver a un juez de inmigración y salir del país sin que nadie evalúe si existían defensas disponibles.',
          '<strong>Cualquier documento que no entienda:</strong> si está en inglés o usa lenguaje legal confuso, la respuesta correcta es pedir tiempo y asesoría, no firmar.',
          '<strong>Puede perder la cancelación de deportación:</strong> la llamada "ley de los 10 años" permite a ciertas personas con años de presencia y familiares que dependen de ellas pelear su caso ante un juez, pero solo si el caso llega al juez.',
          '<strong>Puede perder el asilo:</strong> si tu familiar tiene miedo de regresar a su país, firmar su salida puede impedir que ese miedo sea evaluado por las autoridades.',
          '<strong>Puede afectar una visa U u otro trámite en curso:</strong> una solicitud pendiente puede quedar en el aire si la persona es removida antes de que se resuelva.'
        ],
        warning: 'Nadie puede obligarlo a firmar. La frase que debe memorizar es simple: "No voy a firmar nada hasta hablar con mi abogado."'
      },
      helpOutside: {
        title: 'Cómo ayudar desde afuera: pruebas, fianza y apoyo práctico',
        subtitle: 'La familia puede preparar el terreno para la audiencia de fianza',
        text: 'Mientras tu familiar está detenido, el trabajo de la familia afuera puede cambiar el rumbo del caso. El objetivo más frecuente es una audiencia de fianza: convencer al juez de que la persona tiene raíces profundas en el país y de que se presentará a sus audiencias si la dejan salir.',
        list: [
          '<strong>Reúne pruebas de arraigo:</strong> declaraciones de impuestos, actas de nacimiento de hijos ciudadanos, comprobantes de los años de presencia en el país y cartas de apoyo de la iglesia, la comunidad o el empleador.',
          '<strong>Trabaja con copias, no con originales:</strong> nunca envíes documentos originales al centro de detención; pueden extraviarse en un traslado.',
          '<strong>Pon dinero en la cuenta telefónica del centro:</strong> la comunicación constante es vital para el caso y para el ánimo de tu familiar.',
          '<strong>Infórmate sobre las reglas de visita:</strong> cada centro tiene sus propios horarios y requisitos; el resultado del localizador incluye los datos de contacto de la instalación.',
          '<strong>Organiza a la familia:</strong> decidan quién cuida a los hijos, quién maneja los gastos y quién será el contacto principal con el abogado.',
          '<strong>Junta fondos con anticipación:</strong> si el juez otorga una fianza, tener el dinero listo acelera la salida.'
        ],
        note: 'Las pruebas de arraigo no son un trámite menor: son el corazón de la audiencia de fianza. Ayudan a demostrar que tu familiar no representa un peligro para la comunidad ni un riesgo de fuga, que son los factores que el juez evalúa.'
      },
      whenLawyer: {
        title: 'Cuándo llamar a un abogado de inmigración',
        subtitle: 'En inmigración no hay defensor público: la familia consigue al abogado',
        text: 'A diferencia de un caso criminal, en la corte de inmigración el gobierno no está obligado a proporcionar un abogado gratuito. Conseguir representación depende de la familia, y el tiempo importa: las decisiones más dañinas suelen tomarse en los primeros días de detención.',
        list: [
          '<strong>De inmediato si ya está detenido:</strong> un abogado puede localizarlo, comunicarse con él por la vía legal y evaluar opciones antes de que firme algo.',
          '<strong>Antes de firmar cualquier documento:</strong> lo que parece "un papel para salir rápido" puede eliminar defensas completas.',
          '<strong>Para la audiencia de fianza:</strong> el abogado presenta las pruebas de arraigo de forma organizada y argumenta por la libertad de tu familiar.',
          '<strong>Si tiene miedo de regresar a su país:</strong> ese miedo debe expresarse y documentarse correctamente, y el abogado sabe cómo y cuándo plantearlo.',
          '<strong>Si hay trámites pendientes:</strong> una visa U, un ajuste de estatus o cualquier solicitud en curso puede cambiar la estrategia del caso.',
          '<strong>Verifica credenciales:</strong> solo abogados con licencia o representantes acreditados por el Departamento de Justicia pueden representar a una persona ante la corte de inmigración. Los "notarios" no pueden.'
        ],
        note: 'Cuando llames a un abogado, ten a la mano el número A, el nombre del centro de detención, el país de nacimiento y un resumen del historial migratorio. Con esos datos, la primera consulta rinde el doble.'
      },
      faq: {
        title: 'Preguntas Frecuentes',
        items: [
          {
            q: '¿Qué hago si no tengo el número A de mi familiar?',
            a: 'Puedes buscarlo en el localizador de ICE con sus <strong>datos biográficos</strong>: nombre y apellido exactos, país de nacimiento y fecha de nacimiento. Mientras tanto, revisa documentos migratorios anteriores (como la Notificación de Comparecencia I-862 o un permiso de trabajo), donde suele aparecer. Y cuando tu familiar llame, pídele el número A antes que cualquier otra cosa.'
          },
          {
            q: '¿Cuánto tarda una persona en aparecer en el localizador de ICE?',
            a: 'En general, <strong>de 24 a 48 horas</strong> después del arresto, mientras ICE la procesa. Si no aparece, prueba variantes del nombre (con y sin segundo apellido, con y sin acentos) y verifica que la fecha de nacimiento y el país sean correctos antes de concluir que no está detenida.'
          },
          {
            q: '¿El localizador de ICE muestra a menores de edad?',
            a: '<strong>No.</strong> El localizador no incluye a menores de edad. Si buscas a un menor, lo más recomendable es contactar a un abogado de inmigración de inmediato y, si aplica, al consulado de tu país, para que te orienten sobre los canales correctos según el caso.'
          },
          {
            q: '¿Me arriesgo al buscar a alguien en el localizador si yo tampoco tengo papeles?',
            a: 'El localizador es una <strong>página pública</strong> que no pide tu nombre, tu estatus ni la creación de una cuenta para hacer una búsqueda. Aun así, si tu propia situación es delicada, puedes pedir que otra persona de confianza haga las gestiones que requieran presentarse en persona en alguna oficina o centro.'
          },
          {
            q: '¿Qué pasa si mi familiar ya firmó la salida voluntaria?',
            a: 'Habla con un abogado <strong>de inmediato</strong>. Según el momento del proceso, puede haber opciones para revisar la situación, pero el margen suele ser corto. Por eso la regla de oro es no firmar nada sin asesoría: corregir una firma siempre es más difícil que evitarla.'
          },
          {
            q: '¿Puedo visitar a mi familiar en el centro de detención?',
            a: 'Generalmente sí, pero <strong>cada centro tiene sus propias reglas</strong> de horarios, registro y requisitos de identificación. El resultado del localizador incluye la información de contacto de la instalación: llama antes de viajar para confirmar los requisitos, y no lleves documentos originales que no te pidan expresamente.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusión',
        text: 'Encontrar a un familiar detenido por ICE es una carrera contra el tiempo, pero el camino es claro: consigue el número A, usa el localizador oficial en locator.ice.gov, anota el nombre del centro de detención en la primera llamada y asegúrate de que tu familiar no firme nada sin asesoría legal. Cada uno de esos pasos protege opciones que después pueden marcar la diferencia entre quedarse y ser deportado.',
        advice: 'Si tu familiar está detenido, no esperes a "ver qué pasa". Reúne las pruebas de arraigo, anota el número A y el centro de detención, y habla con un abogado de inmigración lo antes posible: los primeros días son los que más opciones ofrecen.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'ICE – Online Detainee Locator System (locator.ice.gov)',
          'USA.gov – Encontrar a una persona detenida por ICE',
          'National Immigration Law Center – Cómo encontrar a un ser querido detenido (2025)',
          'DOJ EOIR – Sistema automatizado de información de casos (1-800-898-7180)'
        ]
      }
    }
  },
  en: {
    metaTitle: 'How to Find Someone Detained by ICE: Step-by-Step Guide',
    metaDesc: 'Learn how to locate a loved one detained by ICE: how to use the official detainee locator, what the A-number is, and what to do in the first 48 hours.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '10 min read',
      tags: 'Deportation Defense',
      date: 'Jul 1, 2026',
      time: '10 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'How to Find a Family Member Detained by ICE: Locator, A-Number and First Steps',
    summary: {
      title: 'Initial Summary',
      text: 'If ICE has detained a loved one, there are concrete steps you can take today: search for them in the <strong>official detainee locator</strong> (locator.ice.gov) using their <strong>A-number</strong> or their biographical information, write down the name of the detention center during the first phone call, and make sure they <strong>do not sign any document</strong> without first speaking to an attorney. This guide explains each step, what to do if they do not appear in the system, and how to help from the outside.'
    },
    intro: [
      'Few things cause as much anguish as a loved one not coming home, and then learning they were detained by ICE (Immigration and Customs Enforcement). The first hours feel like a void: you do not know where they are, you cannot reach them, and no one seems to have clear answers.',
      'The good news is that there is an orderly path to finding them. The government maintains a public system called the Online Detainee Locator, and with one key piece of information — the A-number — or with the correct biographical details, most families manage to locate their loved one within a day or two.',
      'In this guide we explain, step by step, how to use the locator, what to do if your family member does not appear in the system, what to write down during the first call from the detention center, which documents they should never sign without legal advice, and how you can help from the outside to prepare for a possible bond hearing.',
      'At the Law Offices of Manuel Solis, <a href="/en/clientes-detenidos" class="text-[#B2904D] underline hover:text-white">our team for detained clients</a> works with these situations every day. And if you want your family to be prepared before an emergency, we also recommend learning about <a href="/en/blog/redadas-ice-2026-derechos-plan-emergencia-familiar" class="text-[#B2904D] underline hover:text-white">your rights during an ICE raid</a>.',
      'Every case is different. <strong>This information is educational and does not replace consultation with an attorney.</strong>'
    ],
    sections: {
      aNumber: {
        title: 'What the A-Number Is and Where to Find It',
        subtitle: 'The single most important piece of information',
        text: 'The A-number (Alien Registration Number) is the identifier the U.S. government assigns to a person within the immigration system. It is the key that opens almost every door: with it you can search for your family member in the ICE locator, check whether they already have a case before the immigration court, and help an attorney act fast.',
        list: [
          '<strong>It is a 9-digit number</strong> preceded by the letter "A" that appears on most documents issued by the immigration authorities.',
          '<strong>Look for it on the Notice to Appear (Form I-862):</strong> the document ordering the person to appear before the immigration court; the A-number is printed at the top.',
          '<strong>Check older immigration paperwork:</strong> work permits, past applications, and immigration letters from previous processes usually include it.',
          '<strong>Ask for it during the first call:</strong> if your family member is already detained, their A-number is assigned or confirmed when they are processed; write it down the moment they read it to you.',
          '<strong>Keep it somewhere safe</strong> and share it with someone you trust: the whole family should be able to find it in seconds.'
        ],
        note: 'If your family member never had contact with immigration authorities, they may not have an A-number until ICE processes them. You can still search the locator by exact name, country of birth, and date of birth.'
      },
      locator: {
        title: 'How to Use the ICE Detainee Locator, Step by Step',
        subtitle: 'locator.ice.gov: the official, free tool',
        text: 'ICE maintains a public online tool called the Online Detainee Locator System, available at locator.ice.gov/odls. It is free, works from any phone, and does not require an account. There are two ways to search:',
        list: [
          '<strong>Option 1 — By A-number:</strong> enter the 9-digit A-number and select the person\'s country of birth. This is the most reliable search.',
          '<strong>Option 2 — By biographical information:</strong> if you do not have the A-number, search by exact first and last name, country of birth, and date of birth.',
          '<strong>The name must match exactly</strong> what ICE recorded: a single different letter or an extra last name can return zero results.',
          '<strong>What you will see if you find them:</strong> the name of the detention center where the person is being held and the contact information for that facility.',
          '<strong>You can also call:</strong> the ICE detention reporting and information line is <strong>1-888-351-4024</strong>.',
          '<strong>Never pay for this information:</strong> the locator is public and free; be wary of anyone charging money to "find" a detainee.'
        ],
        note: 'Save a screenshot of the result along with the date. Transfers between detention centers do happen, and it helps to have a record of where the person was and when.'
      },
      notFound: {
        title: 'What to Do If Your Family Member Does Not Appear in the System',
        subtitle: 'Not showing up yet does not mean they are not detained',
        text: 'It is the most distressing moment: you run the search and the system says there are no results. Before assuming the worst, keep in mind that the locator does not update instantly and that data-entry errors are very common.',
        list: [
          '<strong>Wait 24 to 48 hours:</strong> a recently arrested person can take a day or two to appear in the system while ICE processes them.',
          '<strong>Try name variations:</strong> with and without a second last name, with and without accents, and with the last names in a different order. The system requires an exact match.',
          '<strong>Double-check the date of birth and the country:</strong> a single incorrect detail makes the search fail even if the person is in fact detained.',
          '<strong>Minors will not appear:</strong> the ICE locator does not include minors. In that case, seek legal help immediately.',
          '<strong>Call the ICE line (1-888-351-4024)</strong> with the full name, country of birth, and date of birth at hand.',
          '<strong>Check the immigration court system:</strong> with the A-number you can call the EOIR automated line at <strong>1-800-898-7180</strong> to find out whether a case already exists before a judge.'
        ],
        warning: 'Watch out for fraud: in moments of crisis, "notarios" and fixers appear who charge for information that is public and free. Always verify with official sources before paying anyone.'
      },
      firstCall: {
        title: 'The First Call: What to Ask and What to Write Down',
        subtitle: 'Two pieces of information are worth gold: the A-number and the facility name',
        text: 'When your family member manages to call for the first time from the detention center, the call may be short, expensive, and have poor reception. Keep paper and a pen next to the phone and follow this order of priorities:',
        list: [
          '<strong>1. Write down their A-number:</strong> it is the first thing you should ask for, before anything else. Without that number, everything else becomes slower.',
          '<strong>2. Write down the exact name of the detention center</strong> and the city and state where it is located. With these two pieces of information, an attorney can start working the same day.',
          '<strong>3. Ask about their health:</strong> if they need medication or have a medical condition, they should report it to the facility staff as soon as possible.',
          '<strong>4. Remind them not to sign anything</strong> without first speaking to an attorney, no matter how much pressure they feel.',
          '<strong>5. Remind them of their rights:</strong> they can remain silent about their immigration situation and ask to speak with an attorney.',
          '<strong>6. Agree on a call schedule:</strong> knowing when they will call again reduces anxiety and prevents missing important communications.'
        ],
        note: 'Calls from detention centers are normally recorded or monitored (except legal calls with their attorney). Avoid discussing the details of the immigration case over the phone: those matters are for the attorney.'
      },
      doNotSign: {
        title: 'What Your Family Member Should Not Sign (and Why It Matters So Much)',
        subtitle: 'A rushed signature can close off defenses forever',
        text: 'Inside the detention center there can be pressure to sign documents "to get out faster." Signing without legal advice is one of the most costly decisions in an immigration case, because it can eliminate defenses an attorney could have presented before a judge.',
        list: [
          '<strong>Voluntary departure:</strong> signing it can mean giving up the chance to see an immigration judge and leaving the country without anyone evaluating whether defenses were available.',
          '<strong>Any document they do not understand:</strong> if it is in English or uses confusing legal language, the correct response is to ask for time and advice, not to sign.',
          '<strong>They could lose cancellation of removal:</strong> the so-called "10-year law" allows certain people with years of presence and family members who depend on them to fight their case before a judge — but only if the case reaches the judge.',
          '<strong>They could lose asylum:</strong> if your family member is afraid to return to their country, signing their departure can prevent that fear from ever being evaluated.',
          '<strong>It can affect a U visa or another pending process:</strong> a pending application can be left in limbo if the person is removed before it is resolved.'
        ],
        warning: 'No one can force them to sign. The phrase they should memorize is simple: "I will not sign anything until I speak with my attorney."'
      },
      helpOutside: {
        title: 'How to Help from the Outside: Evidence, Bond, and Practical Support',
        subtitle: 'The family can lay the groundwork for the bond hearing',
        text: 'While your family member is detained, the work the family does on the outside can change the course of the case. The most common goal is a bond hearing: convincing the judge that the person has deep roots in the country and will show up to their hearings if released.',
        list: [
          '<strong>Gather proof of community ties:</strong> tax returns, birth certificates of U.S. citizen children, proof of years of presence in the country, and support letters from church, community, or an employer.',
          '<strong>Work with copies, not originals:</strong> never send original documents to the detention center; they can get lost during a transfer.',
          '<strong>Put money on the facility\'s phone account:</strong> constant communication is vital for the case and for your family member\'s morale.',
          '<strong>Learn the visitation rules:</strong> each facility has its own schedules and requirements; the locator result includes the facility\'s contact information.',
          '<strong>Organize the family:</strong> decide who takes care of the children, who manages expenses, and who will be the main point of contact with the attorney.',
          '<strong>Save funds in advance:</strong> if the judge grants bond, having the money ready speeds up the release.'
        ],
        note: 'Proof of ties is not a minor formality: it is the heart of the bond hearing. It helps show that your family member is neither a danger to the community nor a flight risk, which are the factors the judge weighs.'
      },
      whenLawyer: {
        title: 'When to Call an Immigration Attorney',
        subtitle: 'There is no public defender in immigration court: the family finds the lawyer',
        text: 'Unlike a criminal case, in immigration court the government is not required to provide a free attorney. Securing representation is up to the family, and time matters: the most damaging decisions tend to happen in the first days of detention.',
        list: [
          '<strong>Immediately if they are already detained:</strong> an attorney can locate them, communicate with them through legal channels, and evaluate options before they sign anything.',
          '<strong>Before signing any document:</strong> what looks like "a paper to get out fast" can wipe out entire defenses.',
          '<strong>For the bond hearing:</strong> the attorney presents the proof of ties in an organized way and argues for your family member\'s release.',
          '<strong>If they are afraid to return to their country:</strong> that fear must be expressed and documented correctly, and the attorney knows how and when to raise it.',
          '<strong>If there are pending applications:</strong> a U visa, an adjustment of status, or any application in progress can change the strategy of the case.',
          '<strong>Verify credentials:</strong> only licensed attorneys or representatives accredited by the Department of Justice can represent a person before the immigration court. "Notarios" cannot.'
        ],
        note: 'When you call an attorney, have the A-number, the name of the detention center, the country of birth, and a summary of the immigration history at hand. With that information, the first consultation is twice as productive.'
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'What do I do if I do not have my family member\'s A-number?',
            a: 'You can search the ICE locator using their <strong>biographical information</strong>: exact first and last name, country of birth, and date of birth. In the meantime, check older immigration paperwork (such as the Notice to Appear I-862 or a work permit), where it usually appears. And when your family member calls, ask for the A-number before anything else.'
          },
          {
            q: 'How long does it take for a person to appear in the ICE locator?',
            a: 'Generally <strong>24 to 48 hours</strong> after the arrest, while ICE processes them. If they do not appear, try name variations (with and without a second last name, with and without accents) and verify that the date of birth and country are correct before concluding they are not detained.'
          },
          {
            q: 'Does the ICE locator show minors?',
            a: '<strong>No.</strong> The locator does not include minors. If you are looking for a minor, the best course is to contact an immigration attorney immediately and, if applicable, your country\'s consulate, so they can guide you through the correct channels for that situation.'
          },
          {
            q: 'Am I at risk if I search for someone in the locator and I am undocumented too?',
            a: 'The locator is a <strong>public webpage</strong> that does not ask for your name, your status, or an account to run a search. Even so, if your own situation is delicate, you can ask another trusted person to handle any steps that require showing up in person at an office or facility.'
          },
          {
            q: 'What happens if my family member already signed voluntary departure?',
            a: 'Speak with an attorney <strong>immediately</strong>. Depending on the stage of the process, there may be options to review the situation, but the window tends to be short. That is why the golden rule is not to sign anything without advice: undoing a signature is always harder than avoiding it.'
          },
          {
            q: 'Can I visit my family member at the detention center?',
            a: 'Generally yes, but <strong>each facility has its own rules</strong> for schedules, registration, and identification requirements. The locator result includes the facility\'s contact information: call before traveling to confirm the requirements, and do not bring original documents unless they are expressly requested.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusion',
        text: 'Finding a family member detained by ICE is a race against time, but the path is clear: get the A-number, use the official locator at locator.ice.gov, write down the name of the detention center during the first call, and make sure your family member does not sign anything without legal advice. Each of those steps protects options that can later make the difference between staying and being deported.',
        advice: 'If your family member is detained, do not wait to "see what happens." Gather the proof of community ties, write down the A-number and the detention center, and speak with an immigration attorney as soon as possible: the first days are the ones that offer the most options.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'ICE – Online Detainee Locator System (locator.ice.gov)',
          'USA.gov – Find someone detained by ICE',
          'National Immigration Law Center – How to Find a Loved One in Detention (2025)',
          'DOJ EOIR – Automated Case Information System (1-800-898-7180)'
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
    path: `/${lang}/blog/como-encontrar-detenido-ice-localizador-pasos`,
    title: t.title,
    description: t.metaDesc,
    images: [{ url: IMAGES.article, alt: t.title }],
    type: 'article',
    publishedTime: '2026-07-01T08:00:00.000Z',
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
      tags: ['Detenidos ICE', 'Localizador de Detenidos', 'Número A', 'Fianza de Inmigración', 'Deportación'],
    },
    twitter: social.twitter,
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/como-encontrar-detenido-ice-localizador-pasos`,
      languages: {
        'es': `${SITE_URL}/es/blog/como-encontrar-detenido-ice-localizador-pasos`,
        'en': `${SITE_URL}/en/blog/como-encontrar-detenido-ice-localizador-pasos`,
        'x-default': `${SITE_URL}/es/blog/como-encontrar-detenido-ice-localizador-pasos`,
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
    { name: t.title, url: `/${lang}/blog/como-encontrar-detenido-ice-localizador-pasos` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="como-encontrar-detenido-ice-localizador-pasos"
        date="2026-07-01"
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
                     alt="Cómo encontrar a un familiar detenido por ICE con el localizador de detenidos"
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

                  {/* aNumber */}
                  <section>
                    <h2 id="que-es-el-numero-a" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><FileText size={24} className="text-[#B2904D]" /></div>
                      {t.sections.aNumber.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.aNumber.subtitle}</p>
                    <p className="mb-4"><InlineLinkedText text={t.sections.aNumber.text} lang={lang as 'es' | 'en'} state={enlacesInline} /></p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.aNumber.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.aNumber.note}
                    </div>
                  </section>

                  {/* locator */}
                  <section>
                    <h2 id="como-usar-el-localizador" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Search size={24} className="text-[#B2904D]" /></div>
                      {t.sections.locator.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.locator.subtitle}</p>
                    <p className="mb-4"><InlineLinkedText text={t.sections.locator.text} lang={lang as 'es' | 'en'} state={enlacesInline} /></p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.locator.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.locator.note}
                    </div>
                  </section>

                  {/* notFound */}
                  <section>
                    <h2 id="si-no-aparece-en-el-sistema" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><AlertTriangle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.notFound.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.notFound.subtitle}</p>
                    <p className="mb-4"><InlineLinkedText text={t.sections.notFound.text} lang={lang as 'es' | 'en'} state={enlacesInline} /></p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.notFound.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 p-5 bg-red-500/10 rounded-xl border border-red-500/20">
                      <p className="text-red-400 font-bold m-0 flex items-start gap-2">
                        <AlertTriangle size={20} className="shrink-0 mt-1" />
                        {t.sections.notFound.warning}
                      </p>
                    </div>
                  </section>

                  {/* firstCall */}
                  <section>
                    <h2 id="la-primera-llamada" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Phone size={24} className="text-[#B2904D]" /></div>
                      {t.sections.firstCall.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.firstCall.subtitle}</p>
                    <p className="mb-4"><InlineLinkedText text={t.sections.firstCall.text} lang={lang as 'es' | 'en'} state={enlacesInline} /></p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.firstCall.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.firstCall.note}
                    </div>
                  </section>

                  {/* doNotSign */}
                  <section>
                    <h2 id="que-no-firmar" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Ban size={24} className="text-[#B2904D]" /></div>
                      {t.sections.doNotSign.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.doNotSign.subtitle}</p>
                    <p className="mb-4"><InlineLinkedText text={t.sections.doNotSign.text} lang={lang as 'es' | 'en'} state={enlacesInline} /></p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.doNotSign.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 p-5 bg-red-500/10 rounded-xl border border-red-500/20">
                      <p className="text-red-400 font-bold m-0 flex items-start gap-2">
                        <AlertTriangle size={20} className="shrink-0 mt-1" />
                        {t.sections.doNotSign.warning}
                      </p>
                    </div>
                  </section>

                  {/* helpOutside */}
                  <section>
                    <h2 id="como-ayudar-desde-afuera" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Users size={24} className="text-[#B2904D]" /></div>
                      {t.sections.helpOutside.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.helpOutside.subtitle}</p>
                    <p className="mb-4"><InlineLinkedText text={t.sections.helpOutside.text} lang={lang as 'es' | 'en'} state={enlacesInline} /></p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.helpOutside.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.helpOutside.note}
                    </div>
                  </section>

                  {/* whenLawyer */}
                  <section>
                    <h2 id="cuando-llamar-a-un-abogado" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Scale size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whenLawyer.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.whenLawyer.subtitle}</p>
                    <p className="mb-4"><InlineLinkedText text={t.sections.whenLawyer.text} lang={lang as 'es' | 'en'} state={enlacesInline} /></p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.whenLawyer.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.whenLawyer.note}
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
            articles={getRelatedArticles('como-encontrar-detenido-ice-localizador-pasos', (lang as 'es' | 'en') || 'es')}
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
