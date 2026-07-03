import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle,
  AlertTriangle, MessageCircle, Send, ArrowUpRight, ShieldCheck,
  FileText, Gavel, Activity, Ban, DollarSign
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
  article: '/blog/blog_33/JUL_B2.png',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Accidente de Trabajo sin Papeles en Texas: Tus Derechos',
    metaDesc: '¿Te lesionaste trabajando y no tienes papeles? En Texas sí tienes derecho a compensación laboral o a demandar al patrón sin seguro. Conoce tus opciones hoy.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '11 min de lectura',
      tags: 'Accidente de Trabajo & Derechos',
      date: '30 Jun, 2026',
      time: '11 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'Accidente de trabajo siendo indocumentado en Texas: tus derechos reales',
    summary: {
      title: 'Resumen inicial',
      text: 'Si te lesionaste en el trabajo y no tienes papeles, <strong>en Texas sí tienes derechos</strong>. La ley de compensación laboral cubre a ciudadanos y no ciudadanos por igual, y no necesitas número de seguro social para presentar un reclamo. Si tu patrón no tiene seguro de compensación laboral (algo legal en Texas), puedes demandarlo directamente por negligencia y reclamar daños completos. Además, es ilegal que te amenace con reportarte a inmigración por reclamar. Eso sí: los plazos son cortos — tienes 30 días para reportar la lesión y 1 año para presentar el reclamo formal.'
    },
    intro: [
      'Cada día, miles de trabajadores indocumentados en Texas levantan casas, techan edificios bajo el sol, limpian oficinas de madrugada y sostienen cocinas de restaurantes. Son trabajos duros y muchas veces peligrosos. Cuando ocurre una lesión — una caída de andamio, una máquina que atrapa una mano, una espalda destrozada por cargar peso — el primer pensamiento de muchos no es su salud, sino el miedo: "si reclamo, me deportan".',
      'La realidad legal es muy distinta a ese miedo. En Texas, la ley de compensación para trabajadores <strong>cubre a ciudadanos y a no ciudadanos por igual</strong>, según el propio Departamento de Seguros de Texas. No se te exige un número de seguro social para presentar un reclamo, y las agencias de compensación laboral no comparten tu estatus migratorio como parte del proceso. Tu estatus no borra tu derecho a ser compensado por una lesión de trabajo.',
      'Texas tiene además una particularidad que puede jugar a tu favor: es el único estado del país donde el seguro de compensación laboral es opcional para los empleadores privados. Si tu patrón decidió no tener seguro, no te quedaste sin opciones — al contrario, puedes demandarlo directamente por negligencia y reclamar daños completos, incluyendo dolor y sufrimiento. En este artículo te explicamos ambos caminos, los plazos que no puedes dejar pasar y los errores que arruinan casos todos los días.',
      'Si tu lesión ocurrió en el área de Houston, nuestro equipo de <a href="/es/abogado-accidentes-houston" class="text-[#B2904D] underline hover:text-white">abogados de accidentes en Houston</a> puede evaluar tu caso sin costo y en español. Y si lo que sufriste fue un choque en la carretera, también tenemos una guía completa sobre qué hacer tras un <a href="/es/blog/accidente-auto-indocumentado-derechos" class="text-[#B2904D] underline hover:text-white">accidente de auto siendo indocumentado</a>.',
      'Cada caso es diferente. <strong>Esta información es educativa y no sustituye la consulta con un abogado.</strong>'
    ],
    sections: {
      rights: {
        title: 'Sí, tienes derechos aunque no tengas papeles',
        subtitle: 'La ley de Texas protege a ciudadanos y no ciudadanos por igual',
        text: 'Empecemos por lo más importante: en Texas, tus derechos como trabajador lesionado no dependen de tu estatus migratorio. La División de Compensación para Trabajadores del Departamento de Seguros de Texas lo dice con claridad: la ley cubre a ciudadanos y no ciudadanos por igual. Y a nivel federal, OSHA reconoce el derecho de todo trabajador a un lugar de trabajo seguro, sin importar su estatus.',
        list: [
          'Tienes derecho a <strong>compensación laboral</strong> si tu patrón tiene seguro: atención médica y beneficios de ingreso mientras te recuperas, igual que cualquier otro trabajador.',
          '<strong>No necesitas número de seguro social</strong> para presentar un reclamo de compensación laboral en Texas.',
          'Tienes derecho a <strong>atención médica</strong> por tu lesión de trabajo; no dependes de la buena voluntad del patrón.',
          'Tienes derecho a un <strong>lugar de trabajo seguro</strong> bajo las normas de OSHA, sin importar tu estatus migratorio.',
          'Las agencias de compensación laboral <strong>no comparten tu estatus migratorio</strong> como parte del reclamo; el proceso trata sobre tu lesión, no sobre tus papeles.'
        ],
        note: 'El arma principal de un mal patrón es tu miedo. Cuando entiendes que la ley te cubre igual que a cualquier trabajador, ese miedo pierde su poder — y tu caso gana fuerza.'
      },
      workersComp: {
        title: 'Qué es la compensación laboral y qué cubre',
        subtitle: 'Un sistema de beneficios sin necesidad de probar culpa',
        text: 'La compensación laboral (workers\' compensation) es un seguro que muchos patrones contratan para cubrir a sus empleados lesionados en el trabajo. Es un sistema "sin culpa": no necesitas demostrar que el patrón hizo algo mal para recibir beneficios. Basta con que la lesión haya ocurrido en el curso del trabajo. En Texas, el sistema lo supervisa la División de Compensación para Trabajadores (DWC) del Departamento de Seguros.',
        list: [
          '<strong>Beneficios médicos:</strong> cubren el tratamiento razonable y necesario relacionado con tu lesión de trabajo — consultas, estudios, cirugías, terapia y medicamentos.',
          '<strong>Beneficios de ingreso:</strong> reemplazan una parte de tu salario mientras no puedes trabajar por la lesión.',
          '<strong>Beneficios por secuelas permanentes:</strong> si la lesión te deja limitaciones de por vida, existen beneficios adicionales según el daño.',
          '<strong>Beneficios de muerte y entierro:</strong> en accidentes fatales, la familia del trabajador puede recibir beneficios — también sin importar el estatus migratorio del trabajador.',
          '<strong>Sin pelear la culpa:</strong> no importa si el accidente fue en parte un descuido tuyo; el sistema de compensación laboral no funciona a base de culpas.'
        ],
        note: 'La otra cara de la moneda: si tu patrón sí tiene seguro de compensación laboral, en general no puedes demandarlo aparte por dolor y sufrimiento. Por eso, la primera pregunta de cualquier caso es si el patrón tenía seguro o no.'
      },
      nonSubscriber: {
        title: 'Patrones sin seguro: la regla del "no suscriptor" en Texas',
        subtitle: 'Texas es el único estado donde el seguro es opcional — y eso puede favorecerte',
        text: 'Aquí viene lo que casi nadie le explica al trabajador: Texas es el único estado del país donde la compensación laboral es opcional para los empleadores privados. El Capítulo 406 del Código Laboral de Texas permite que un patrón decida no comprar seguro. A esos patrones se les llama "no suscriptores" (non-subscribers). Si tu patrón es uno de ellos y te lesionaste por sus malas condiciones de trabajo, la ley te abre una puerta más grande: la demanda directa por negligencia.',
        list: [
          'Puedes <strong>demandar directamente al patrón</strong> por negligencia: falta de entrenamiento, equipo defectuoso, falta de personal, condiciones peligrosas.',
          'Puedes reclamar <strong>daños completos</strong>: gastos médicos, salarios perdidos y también dolor y sufrimiento — algo que la compensación laboral no paga.',
          'El patrón no suscriptor <strong>pierde defensas comunes</strong>: la ley le quita herramientas que normalmente usaría para reducir o negar tu pago.',
          'En particular, <strong>no puede alegar que la culpa fue tuya</strong> (culpa comparativa del trabajador) para escapar de su responsabilidad.',
          'Esta regla aplica <strong>sin importar tu estatus migratorio</strong>: la demanda por negligencia es un derecho de cualquier trabajador lesionado en Texas.'
        ],
        note: 'Un abogado puede verificar rápidamente si tu patrón tenía seguro de compensación laboral el día del accidente. Esa sola respuesta define la estrategia completa de tu caso: reclamo administrativo ante la DWC o demanda directa por negligencia.'
      },
      dayOfInjury: {
        title: 'Qué hacer el día de la lesión, paso a paso',
        subtitle: 'Los plazos corren desde el primer día',
        text: 'Lo que hagas en las primeras horas y días después de lesionarte puede decidir tu caso. En Texas los plazos son cortos y estrictos: debes reportar la lesión a tu empleador dentro de 30 días, y presentar el reclamo formal ante la División de Compensación para Trabajadores (DWC) dentro de 1 año. Sigue estos pasos en orden.',
        list: [
          '<strong>1. Reporta la lesión a tu supervisor o patrón de inmediato:</strong> la ley te da hasta 30 días, pero no los uses. Hazlo el mismo día si puedes, y de preferencia por escrito (un mensaje de texto cuenta como evidencia).',
          '<strong>2. Busca atención médica ese mismo día:</strong> dile al médico claramente que te lesionaste en el trabajo, para que quede en el expediente. Muchas lesiones de espalda, cabeza y articulaciones empeoran con los días.',
          '<strong>3. Documenta la escena:</strong> fotos del lugar, del equipo o herramienta involucrada, de la condición peligrosa (piso mojado, andamio suelto, falta de protección) y de tus lesiones visibles.',
          '<strong>4. Identifica testigos:</strong> nombres y teléfonos de los compañeros que vieron el accidente o que conocen las condiciones del lugar. Los testigos desaparecen con el tiempo.',
          '<strong>5. Guarda todo:</strong> talones de pago, registros de horas, mensajes con el patrón, recibos médicos. Si te pagan en efectivo, empieza a anotar cuánto y cuándo te pagaban.',
          '<strong>6. Presenta tu reclamo formal ante la DWC dentro de 1 año:</strong> reportar al patrón no es lo mismo que presentar el reclamo. Un abogado puede encargarse de este trámite para que ningún plazo se te pase.'
        ],
        note: 'Reportar tarde es una de las razones más comunes por las que se niegan beneficios. Existen excepciones limitadas a los plazos, pero no cuentes con ellas: reporta ya.'
      },
      retaliation: {
        title: 'Represalias y amenazas con inmigración: qué dice la ley',
        subtitle: 'Amenazarte con ICE por reclamar es ilegal',
        text: 'La amenaza clásica del mal patrón es: "si reclamas, llamo a inmigración". Debes saber que esa amenaza no solo es una táctica de intimidación — es ilegal. Según TexasLawHelp.org, es ilegal que el empleador amenace con reportarte a inmigración por reclamar una lesión de trabajo o por buscar atención médica, y esa represalia es sancionable. Estas son las formas de represalia más comunes que vemos.',
        list: [
          '<strong>Amenazar con reportarte a inmigración</strong> por reclamar tu lesión o ir al médico: es ilegal y sancionable. La amenaza en sí puede convertirse en evidencia a tu favor.',
          '<strong>Despedirte o castigarte por presentar un reclamo de buena fe:</strong> la ley de Texas prohíbe las represalias contra el trabajador que reclama compensación laboral honestamente.',
          '<strong>Presionarte para que digas que la lesión ocurrió fuera del trabajo</strong> o que "ya estabas lastimado de antes".',
          '<strong>Ofrecerte pagos en efectivo "por fuera"</strong> a cambio de que no reportes la lesión ni vayas al médico.',
          '<strong>Esconderte información:</strong> negarse a decirte si hay seguro, no darte los formularios, o "perder" tu reporte de lesión.'
        ],
        warning: 'Si tu patrón te amenaza con inmigración, no te calles: guarda los mensajes, anota fecha y testigos de la amenaza, y llévasela a un abogado. Esa amenaza no debilita tu caso — lo fortalece.'
      },
      recovery: {
        title: 'Qué puedes recuperar: dinero y beneficios',
        subtitle: 'Depende de si el patrón tenía seguro o no',
        text: 'Lo que puedes recuperar depende del camino de tu caso. Si el patrón tiene seguro, recibes los beneficios del sistema de compensación laboral. Si es un no suscriptor y hubo negligencia, la demanda directa te permite reclamar daños completos. Y en algunos casos existe una tercera vía: la demanda contra terceros responsables.',
        list: [
          '<strong>Con seguro — beneficios médicos:</strong> el tratamiento razonable y necesario de tu lesión, sin que tengas que pagarlo de tu bolsillo.',
          '<strong>Con seguro — beneficios de ingreso:</strong> una parte de tu salario mientras estás incapacitado para trabajar.',
          '<strong>Sin seguro (demanda) — daños completos:</strong> gastos médicos pasados y futuros, salarios perdidos, pérdida de capacidad para ganar dinero, y dolor y sufrimiento.',
          '<strong>Salarios en efectivo:</strong> que te pagaran en efectivo no elimina tu derecho a reclamar salarios perdidos; se documentan con declaraciones juradas, testimonios y otros registros.',
          '<strong>Demanda contra terceros:</strong> si un tercero causó tu lesión (el fabricante de una máquina defectuosa, otro contratista en la obra), puedes tener un reclamo adicional independiente del seguro de tu patrón.'
        ],
        note: 'No aceptes la primera cifra que te ofrezcan ni firmes documentos que no entiendas. Una lesión seria tiene costos futuros — cirugías, terapia, trabajo perdido — que una oferta rápida casi nunca cubre.'
      },
      mistakes: {
        title: 'Errores que destruyen tu caso',
        subtitle: 'El silencio y el miedo son tus peores enemigos',
        text: 'Después de años representando a trabajadores lesionados, vemos los mismos errores repetirse. Casi todos nacen del miedo o de la desinformación, y casi todos se pueden evitar. Estos son los que más casos arruinan.',
        list: [
          '<strong>No reportar la lesión por miedo:</strong> si dejas pasar los 30 días sin avisar a tu patrón, puedes perder tus beneficios aunque la lesión sea real y grave.',
          '<strong>Seguir trabajando lesionado sin decir nada:</strong> además de empeorar tu salud, le da al patrón y a la aseguradora el argumento de que "no estabas tan mal".',
          '<strong>Aceptar arreglos en efectivo del patrón:</strong> unos cuantos cientos de dólares hoy pueden costarte decenas de miles en tratamiento y salarios mañana, y complican el reclamo formal.',
          '<strong>Dar declaraciones grabadas a la aseguradora sin abogado:</strong> los ajustadores hacen preguntas diseñadas para reducir el valor de tu reclamo.',
          '<strong>Mentir o exagerar:</strong> no inventes cómo pasó la lesión ni escondas lesiones previas. Las mentiras se descubren y contaminan todo el caso, incluso lo que era legítimo.',
          '<strong>Dejar pasar los plazos:</strong> 30 días para reportar al patrón, 1 año para el reclamo formal ante la DWC. El tiempo corre aunque tengas miedo.'
        ],
        warning: 'El peor error de todos es no hacer nada. El silencio no te protege de inmigración — solo te deja con la lesión, las deudas médicas y sin compensación.'
      },
      faq: {
        title: 'Preguntas Frecuentes',
        items: [
          {
            q: '¿Necesito número de seguro social para reclamar compensación laboral en Texas?',
            a: '<strong>No.</strong> En Texas no se requiere número de seguro social para presentar un reclamo de compensación laboral. La ley cubre a ciudadanos y no ciudadanos por igual, y el proceso se centra en tu lesión de trabajo, no en tus documentos.'
          },
          {
            q: '¿Mi patrón puede reportarme a inmigración por reclamar mi lesión?',
            a: 'Amenazarte con reportarte a inmigración por reclamar una lesión o buscar atención médica es <strong>ilegal y sancionable</strong>. Además, las agencias de compensación laboral no comparten tu estatus migratorio como parte del reclamo. Si tu patrón te amenaza, documenta la amenaza: puede convertirse en evidencia a tu favor.'
          },
          {
            q: '¿Qué pasa si mi patrón no tiene seguro de compensación laboral?',
            a: 'En Texas eso es legal — es el único estado donde el seguro es opcional para empleadores privados — pero le sale caro al patrón: como "no suscriptor", puedes <strong>demandarlo directamente por negligencia</strong>, reclamar daños completos (gastos médicos, salarios perdidos, dolor y sufrimiento) y él pierde defensas comunes, como alegar que la culpa fue tuya.'
          },
          {
            q: '¿Cuánto tiempo tengo para reclamar una lesión de trabajo en Texas?',
            a: 'Dos plazos clave: debes <strong>reportar la lesión a tu empleador dentro de 30 días</strong> y <strong>presentar el reclamo formal ante la DWC dentro de 1 año</strong>. Reportar al patrón no sustituye el reclamo formal — son dos pasos distintos y ambos importan.'
          },
          {
            q: '¿Puedo recuperar salarios perdidos si me pagaban en efectivo?',
            a: '<strong>Sí.</strong> Que te pagaran en efectivo no elimina tu derecho a reclamar los ingresos que perdiste por la lesión. Se documentan con declaraciones juradas, testimonios de compañeros o del propio patrón, anotaciones y otros registros. Un abogado sabe cómo presentar esa evidencia correctamente.'
          },
          {
            q: '¿Me pueden despedir por presentar un reclamo de compensación laboral?',
            a: 'La ley de Texas <strong>prohíbe las represalias</strong> contra el trabajador que presenta un reclamo de compensación laboral de buena fe. Si te despiden o castigan por reclamar, eso puede dar lugar a un reclamo adicional contra el patrón. Guarda toda la evidencia del despido y consulta con un abogado de inmediato.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusión',
        text: 'Si te lesionaste trabajando en Texas y no tienes papeles, la ley está mucho más de tu lado de lo que el miedo te dice. La compensación laboral cubre a ciudadanos y no ciudadanos por igual, no necesitas seguro social para reclamar, y si tu patrón no tiene seguro, puedes demandarlo directamente por negligencia con daños completos. Amenazarte con inmigración por reclamar es ilegal. Lo único que juega en tu contra es el tiempo: 30 días para reportar y 1 año para el reclamo formal.',
        advice: 'Reporta tu lesión por escrito hoy mismo, ve al médico, guarda toda la evidencia y no firmes nada sin que un abogado lo revise. Averiguar si tu patrón tenía seguro toma minutos y define todo tu caso.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'Texas Department of Insurance – División de Compensación para Trabajadores (guía para empleados en español)',
          'TexasLawHelp.org – Derechos del trabajador lesionado',
          'Texas Labor Code – Capítulo 406 (cobertura opcional del empleador)',
          'OSHA – Derecho a un lugar de trabajo seguro (sin importar estatus)'
        ]
      }
    }
  },
  en: {
    metaTitle: 'Work Injury While Undocumented in Texas: Your Rights',
    metaDesc: 'Injured on the job without papers? In Texas you can still claim workers\' comp or sue an uninsured employer for full damages. Learn your rights and next steps.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '11 min read',
      tags: 'Work Injury & Rights',
      date: 'Jun 30, 2026',
      time: '11 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'Work Injury While Undocumented in Texas: Your Real Rights',
    summary: {
      title: 'Initial Summary',
      text: 'If you were injured on the job and do not have papers, <strong>you do have rights in Texas</strong>. Workers\' compensation law covers citizens and non-citizens equally, and you do not need a Social Security number to file a claim. If your employer does not carry workers\' comp insurance (which is legal in Texas), you can sue them directly for negligence and seek full damages. It is also illegal for an employer to threaten to report you to immigration for filing a claim. One warning: the deadlines are short — you have 30 days to report the injury and 1 year to file the formal claim.'
    },
    intro: [
      'Every day, thousands of undocumented workers in Texas frame houses, roof buildings under the sun, clean offices before dawn, and keep restaurant kitchens running. The work is hard and often dangerous. When an injury happens — a fall from a scaffold, a machine that catches a hand, a back destroyed by heavy lifting — the first thought for many is not their health, but fear: "if I file a claim, they will deport me."',
      'The legal reality is very different from that fear. In Texas, workers\' compensation law <strong>covers citizens and non-citizens equally</strong>, according to the Texas Department of Insurance itself. You are not required to have a Social Security number to file a claim, and workers\' compensation agencies do not share your immigration status as part of the process. Your status does not erase your right to be compensated for a work injury.',
      'Texas also has a quirk that can work in your favor: it is the only state in the country where workers\' compensation insurance is optional for private employers. If your employer chose not to carry insurance, you are not out of options — quite the opposite. You can sue them directly for negligence and seek full damages, including pain and suffering. In this article we explain both paths, the deadlines you cannot miss, and the mistakes that ruin cases every day.',
      'If your injury happened in the Houston area, our team of <a href="/en/abogado-accidentes-houston" class="text-[#B2904D] underline hover:text-white">Houston accident lawyers</a> can evaluate your case at no cost, in Spanish or English. And if what you suffered was a crash on the road, we also have a complete guide on what to do after a <a href="/en/blog/accidente-auto-indocumentado-derechos" class="text-[#B2904D] underline hover:text-white">car accident while undocumented</a>.',
      'Every case is different. <strong>This information is educational and does not replace consultation with an attorney.</strong>'
    ],
    sections: {
      rights: {
        title: 'Yes, You Have Rights Even Without Papers',
        subtitle: 'Texas law protects citizens and non-citizens equally',
        text: 'Let\'s start with the most important point: in Texas, your rights as an injured worker do not depend on your immigration status. The Division of Workers\' Compensation at the Texas Department of Insurance says it plainly: the law covers citizens and non-citizens alike. And at the federal level, OSHA recognizes every worker\'s right to a safe workplace, regardless of status.',
        list: [
          'You have the right to <strong>workers\' compensation</strong> if your employer carries insurance: medical care and income benefits while you recover, just like any other worker.',
          'You <strong>do not need a Social Security number</strong> to file a workers\' compensation claim in Texas.',
          'You have the right to <strong>medical care</strong> for your work injury; you do not depend on your employer\'s goodwill.',
          'You have the right to a <strong>safe workplace</strong> under OSHA standards, regardless of your immigration status.',
          'Workers\' compensation agencies <strong>do not share your immigration status</strong> as part of the claim; the process is about your injury, not your papers.'
        ],
        note: 'A bad employer\'s main weapon is your fear. Once you understand that the law covers you like any other worker, that fear loses its power — and your case gains strength.'
      },
      workersComp: {
        title: 'What Workers\' Compensation Is and What It Covers',
        subtitle: 'A benefits system with no need to prove fault',
        text: 'Workers\' compensation is insurance that many employers purchase to cover employees injured on the job. It is a "no-fault" system: you do not need to prove your employer did anything wrong to receive benefits. It is enough that the injury happened in the course of your work. In Texas, the system is overseen by the Division of Workers\' Compensation (DWC) at the Department of Insurance.',
        list: [
          '<strong>Medical benefits:</strong> cover reasonable and necessary treatment related to your work injury — appointments, imaging, surgeries, therapy, and medication.',
          '<strong>Income benefits:</strong> replace part of your wages while you are unable to work because of the injury.',
          '<strong>Benefits for permanent impairment:</strong> if the injury leaves you with lifelong limitations, additional benefits exist depending on the damage.',
          '<strong>Death and burial benefits:</strong> in fatal accidents, the worker\'s family may receive benefits — also regardless of the worker\'s immigration status.',
          '<strong>No fault fight:</strong> it does not matter if the accident was partly your own slip-up; the workers\' comp system does not run on blame.'
        ],
        note: 'The flip side: if your employer does carry workers\' comp insurance, you generally cannot also sue them separately for pain and suffering. That is why the first question in any case is whether the employer had insurance or not.'
      },
      nonSubscriber: {
        title: 'Uninsured Employers: The "Non-Subscriber" Rule in Texas',
        subtitle: 'Texas is the only state where coverage is optional — and that can favor you',
        text: 'Here is what almost nobody explains to workers: Texas is the only state in the country where workers\' compensation is optional for private employers. Chapter 406 of the Texas Labor Code allows an employer to decide not to buy insurance. Those employers are called "non-subscribers." If your employer is one of them and you were injured because of unsafe working conditions, the law opens a bigger door for you: a direct negligence lawsuit.',
        list: [
          'You can <strong>sue the employer directly</strong> for negligence: lack of training, defective equipment, understaffing, dangerous conditions.',
          'You can seek <strong>full damages</strong>: medical expenses, lost wages, and also pain and suffering — something workers\' comp does not pay.',
          'A non-subscriber employer <strong>loses common defenses</strong>: the law takes away tools they would normally use to reduce or deny your recovery.',
          'In particular, they <strong>cannot argue the fault was yours</strong> (the worker\'s comparative fault) to escape responsibility.',
          'This rule applies <strong>regardless of your immigration status</strong>: a negligence lawsuit is a right of any injured worker in Texas.'
        ],
        note: 'An attorney can quickly verify whether your employer carried workers\' compensation insurance on the day of the accident. That single answer defines the entire strategy of your case: an administrative claim before the DWC or a direct negligence lawsuit.'
      },
      dayOfInjury: {
        title: 'What to Do on the Day of the Injury, Step by Step',
        subtitle: 'The deadlines start running on day one',
        text: 'What you do in the first hours and days after getting hurt can decide your case. In Texas the deadlines are short and strict: you must report the injury to your employer within 30 days, and file the formal claim with the Division of Workers\' Compensation (DWC) within 1 year. Follow these steps in order.',
        list: [
          '<strong>1. Report the injury to your supervisor or employer immediately:</strong> the law gives you up to 30 days, but do not use them. Report the same day if you can, preferably in writing (a text message counts as evidence).',
          '<strong>2. Get medical attention that same day:</strong> tell the doctor clearly that you were injured at work, so it goes in the record. Many back, head, and joint injuries get worse over the following days.',
          '<strong>3. Document the scene:</strong> photos of the location, the equipment or tool involved, the dangerous condition (wet floor, loose scaffold, missing guards), and your visible injuries.',
          '<strong>4. Identify witnesses:</strong> names and phone numbers of coworkers who saw the accident or know the conditions at the site. Witnesses disappear over time.',
          '<strong>5. Keep everything:</strong> pay stubs, hour logs, messages with your employer, medical receipts. If you are paid in cash, start writing down how much and when you were paid.',
          '<strong>6. File your formal claim with the DWC within 1 year:</strong> reporting to your employer is not the same as filing the claim. An attorney can handle this filing so no deadline slips by.'
        ],
        note: 'Late reporting is one of the most common reasons benefits get denied. Limited exceptions to the deadlines exist, but do not count on them: report now.'
      },
      retaliation: {
        title: 'Retaliation and Immigration Threats: What the Law Says',
        subtitle: 'Threatening you with ICE for filing a claim is illegal',
        text: 'The classic threat from a bad employer is: "if you file a claim, I\'ll call immigration." You should know that this threat is not just an intimidation tactic — it is illegal. According to TexasLawHelp.org, it is illegal for an employer to threaten to report you to immigration for claiming a work injury or seeking medical care, and that retaliation is punishable. These are the most common forms of retaliation we see.',
        list: [
          '<strong>Threatening to report you to immigration</strong> for claiming your injury or seeing a doctor: it is illegal and punishable. The threat itself can become evidence in your favor.',
          '<strong>Firing or punishing you for filing a good-faith claim:</strong> Texas law prohibits retaliation against a worker who honestly claims workers\' compensation.',
          '<strong>Pressuring you to say the injury happened outside of work</strong> or that you were "already hurt before."',
          '<strong>Offering you cash payments "off the books"</strong> in exchange for not reporting the injury or seeing a doctor.',
          '<strong>Hiding information from you:</strong> refusing to say whether there is insurance, withholding forms, or "losing" your injury report.'
        ],
        warning: 'If your employer threatens you with immigration, do not stay silent: save the messages, write down the date and witnesses of the threat, and take it to an attorney. That threat does not weaken your case — it strengthens it.'
      },
      recovery: {
        title: 'What You Can Recover: Money and Benefits',
        subtitle: 'It depends on whether the employer had insurance or not',
        text: 'What you can recover depends on the path your case takes. If the employer has insurance, you receive workers\' compensation benefits. If they are a non-subscriber and there was negligence, a direct lawsuit lets you seek full damages. And in some cases there is a third path: a claim against responsible third parties.',
        list: [
          '<strong>With insurance — medical benefits:</strong> reasonable and necessary treatment for your injury, without paying out of your own pocket.',
          '<strong>With insurance — income benefits:</strong> part of your wages while you are unable to work.',
          '<strong>Without insurance (lawsuit) — full damages:</strong> past and future medical expenses, lost wages, lost earning capacity, and pain and suffering.',
          '<strong>Cash wages:</strong> being paid in cash does not eliminate your right to claim lost income; it is documented with sworn statements, testimony, and other records.',
          '<strong>Third-party claims:</strong> if a third party caused your injury (the manufacturer of a defective machine, another contractor on the site), you may have an additional claim independent of your employer\'s insurance.'
        ],
        note: 'Do not accept the first number they offer or sign documents you do not understand. A serious injury has future costs — surgeries, therapy, missed work — that a quick offer almost never covers.'
      },
      mistakes: {
        title: 'Mistakes That Destroy Your Case',
        subtitle: 'Silence and fear are your worst enemies',
        text: 'After years of representing injured workers, we see the same mistakes repeat themselves. Almost all of them are born of fear or misinformation, and almost all of them are avoidable. These are the ones that ruin the most cases.',
        list: [
          '<strong>Not reporting the injury out of fear:</strong> if you let the 30 days pass without notifying your employer, you can lose your benefits even if the injury is real and serious.',
          '<strong>Working through the injury in silence:</strong> besides worsening your health, it hands the employer and the insurer the argument that you "weren\'t that hurt."',
          '<strong>Accepting cash arrangements from the employer:</strong> a few hundred dollars today can cost you tens of thousands in treatment and wages tomorrow, and it complicates the formal claim.',
          '<strong>Giving recorded statements to the insurer without an attorney:</strong> adjusters ask questions designed to reduce the value of your claim.',
          '<strong>Lying or exaggerating:</strong> do not invent how the injury happened or hide prior injuries. Lies get discovered and poison the whole case, even the legitimate parts.',
          '<strong>Letting the deadlines pass:</strong> 30 days to report to your employer, 1 year for the formal claim with the DWC. The clock keeps running even when you are afraid.'
        ],
        warning: 'The worst mistake of all is doing nothing. Silence does not protect you from immigration — it just leaves you with the injury, the medical debt, and no compensation.'
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'Do I need a Social Security number to claim workers\' compensation in Texas?',
            a: '<strong>No.</strong> Texas does not require a Social Security number to file a workers\' compensation claim. The law covers citizens and non-citizens equally, and the process focuses on your work injury, not your documents.'
          },
          {
            q: 'Can my employer report me to immigration for claiming my injury?',
            a: 'Threatening to report you to immigration for claiming an injury or seeking medical care is <strong>illegal and punishable</strong>. In addition, workers\' compensation agencies do not share your immigration status as part of the claim. If your employer threatens you, document the threat: it can become evidence in your favor.'
          },
          {
            q: 'What happens if my employer does not carry workers\' compensation insurance?',
            a: 'In Texas that is legal — it is the only state where coverage is optional for private employers — but it costs the employer dearly: as a "non-subscriber," you can <strong>sue them directly for negligence</strong>, seek full damages (medical expenses, lost wages, pain and suffering), and they lose common defenses, such as arguing the fault was yours.'
          },
          {
            q: 'How long do I have to claim a work injury in Texas?',
            a: 'Two key deadlines: you must <strong>report the injury to your employer within 30 days</strong> and <strong>file the formal claim with the DWC within 1 year</strong>. Reporting to your employer does not replace the formal claim — they are two separate steps and both matter.'
          },
          {
            q: 'Can I recover lost wages if I was paid in cash?',
            a: '<strong>Yes.</strong> Being paid in cash does not eliminate your right to claim the income you lost because of the injury. It can be documented with sworn statements, testimony from coworkers or the employer, personal records, and other evidence. An attorney knows how to present that evidence correctly.'
          },
          {
            q: 'Can I be fired for filing a workers\' compensation claim?',
            a: 'Texas law <strong>prohibits retaliation</strong> against a worker who files a workers\' compensation claim in good faith. If you are fired or punished for claiming, that can give rise to an additional claim against the employer. Keep all evidence of the firing and consult an attorney right away.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusion',
        text: 'If you were injured working in Texas and do not have papers, the law is far more on your side than fear tells you. Workers\' compensation covers citizens and non-citizens equally, you do not need a Social Security number to claim, and if your employer carries no insurance, you can sue them directly for negligence and seek full damages. Threatening you with immigration for claiming is illegal. The only thing working against you is time: 30 days to report and 1 year for the formal claim.',
        advice: 'Report your injury in writing today, see a doctor, keep all the evidence, and do not sign anything without an attorney reviewing it. Finding out whether your employer had insurance takes minutes and defines your entire case.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'Texas Department of Insurance – Division of Workers\' Compensation (employee guide, available in Spanish)',
          'TexasLawHelp.org – Injured Worker Rights',
          'Texas Labor Code – Chapter 406 (optional employer coverage)',
          'OSHA – Right to a Safe Workplace (regardless of status)'
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
      url: `${SITE_URL}/${lang}/blog/accidente-trabajo-indocumentado-texas-compensacion`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
      type: 'article',
      publishedTime: '2026-06-30T08:00:00.000Z',
      authors: ['Manuel Solís'],
      section: 'Lesiones Personales',
      tags: ['Accidente de Trabajo', 'Indocumentado', 'Compensación Laboral', 'Texas', 'Lesiones Personales'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.metaDesc,
      images: [imageUrl],
      creator: '@AbogadoMSolis',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/accidente-trabajo-indocumentado-texas-compensacion`,
      languages: {
        'es': `${SITE_URL}/es/blog/accidente-trabajo-indocumentado-texas-compensacion`,
        'en': `${SITE_URL}/en/blog/accidente-trabajo-indocumentado-texas-compensacion`,
        'x-default': `${SITE_URL}/es/blog/accidente-trabajo-indocumentado-texas-compensacion`,
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
    { name: t.title, url: `/${lang}/blog/accidente-trabajo-indocumentado-texas-compensacion` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="accidente-trabajo-indocumentado-texas-compensacion"
        date="2026-06-30"
        image={IMAGES.article}
        lang={lang as string}
        readTime="11"
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
        category="Accidentes"
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
                     alt="Accidente de trabajo siendo indocumentado en Texas compensación"
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

                  {/* rights */}
                  <section>
                    <h2 id="tienes-derechos-sin-importar-estatus" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><ShieldCheck size={24} className="text-[#B2904D]" /></div>
                      {t.sections.rights.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.rights.subtitle}</p>
                    <p className="mb-4">{t.sections.rights.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.rights.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.rights.note}
                    </div>
                  </section>

                  {/* workersComp */}
                  <section>
                    <h2 id="que-es-la-compensacion-laboral" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><FileText size={24} className="text-[#B2904D]" /></div>
                      {t.sections.workersComp.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.workersComp.subtitle}</p>
                    <p className="mb-4">{t.sections.workersComp.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.workersComp.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.workersComp.note}
                    </div>
                  </section>

                  {/* nonSubscriber */}
                  <section>
                    <h2 id="patrones-sin-seguro-no-suscriptores" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Gavel size={24} className="text-[#B2904D]" /></div>
                      {t.sections.nonSubscriber.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.nonSubscriber.subtitle}</p>
                    <p className="mb-4">{t.sections.nonSubscriber.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.nonSubscriber.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.nonSubscriber.note}
                    </div>
                  </section>

                  {/* dayOfInjury */}
                  <section>
                    <h2 id="que-hacer-el-dia-de-la-lesion" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Activity size={24} className="text-[#B2904D]" /></div>
                      {t.sections.dayOfInjury.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.dayOfInjury.subtitle}</p>
                    <p className="mb-4">{t.sections.dayOfInjury.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.dayOfInjury.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.dayOfInjury.note}
                    </div>
                  </section>

                  {/* retaliation */}
                  <section>
                    <h2 id="represalias-y-amenazas" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Ban size={24} className="text-[#B2904D]" /></div>
                      {t.sections.retaliation.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.retaliation.subtitle}</p>
                    <p className="mb-4">{t.sections.retaliation.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.retaliation.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 p-5 bg-red-500/10 rounded-xl border border-red-500/20">
                      <p className="text-red-400 font-bold m-0 flex items-start gap-2">
                        <AlertTriangle size={20} className="shrink-0 mt-1" />
                        {t.sections.retaliation.warning}
                      </p>
                    </div>
                  </section>

                  {/* recovery */}
                  <section>
                    <h2 id="que-puedes-recuperar" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><DollarSign size={24} className="text-[#B2904D]" /></div>
                      {t.sections.recovery.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.recovery.subtitle}</p>
                    <p className="mb-4">{t.sections.recovery.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.recovery.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.recovery.note}
                    </div>
                  </section>

                  {/* mistakes */}
                  <section>
                    <h2 id="errores-que-destruyen-tu-caso" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
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
            articles={getRelatedArticles('accidente-trabajo-indocumentado-texas-compensacion', (lang as 'es' | 'en') || 'es')}
            lang={(lang as 'es' | 'en') || 'es'}
            servicePath="/servicios/accidentes"
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
