import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle,
  AlertTriangle, MessageCircle, Send, ArrowUpRight, Truck, Building2,
  Search, FileText, DollarSign, Scale
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
  article: '/blog/blog_32/JUL_B1.png',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Accidente con Tráiler de 18 Ruedas en Texas: Quién Paga',
    metaDesc: 'Choques con tráiler de 18 ruedas en Texas: quién responde, qué evidencia se pierde rápido y cómo se calcula tu compensación. Habla con un abogado en español.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '11 min de lectura',
      tags: 'Accidente de Camión',
      date: '29 Jun, 2026',
      time: '11 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'Accidente con tráiler de 18 ruedas en Texas: quién paga y cuánto vale tu caso',
    summary: {
      title: 'Resumen inicial',
      text: 'Un choque con un tráiler de 18 ruedas no es un accidente de auto común: puede haber <strong>varios responsables a la vez</strong> (el chofer, la empresa transportista, el dueño del tráiler, el taller de mantenimiento o quien cargó la mercancía), los camiones interestatales deben llevar un seguro federal mínimo de <strong>$750,000</strong>, y la evidencia más importante —la caja negra y las bitácoras del chofer— puede desaparecer en semanas si nadie exige conservarla. Tienes <strong>2 años</strong> para demandar en Texas y tu estatus migratorio no te lo impide. Aquí te explicamos quién paga, de qué depende el valor de tu caso y qué errores evitar con la aseguradora.'
    },
    intro: [
      'Un tráiler de 18 ruedas cargado pesa muchísimas veces más que un auto de pasajeros. Cuando esa diferencia de tamaño y peso se convierte en un choque en una autopista de Texas, las consecuencias casi nunca se reparten parejo: quien viaja en el vehículo pequeño es quien termina en el hospital, sin poder trabajar y con una montaña de facturas médicas que no pidió.',
      'Los números lo confirman. En 2023, Texas registró 12,542 choques de camiones comerciales, con 563 personas fallecidas —alrededor del 12% de todas las muertes viales del estado— y 8,710 lesionadas, según datos de TxDOT. Y el problema se concentra justo donde vive nuestra comunidad: el condado de Harris (Houston) encabeza los choques de vehículos comerciales del estado, seguido por Dallas, Bexar y Tarrant.',
      'La otra cara de la moneda es que un caso de camión comercial no funciona como un choque entre dos autos. Hay reglas federales de por medio, puede haber varias empresas responsables al mismo tiempo, y los camiones interestatales están obligados a llevar pólizas de seguro mucho más grandes que las de cualquier auto. Eso significa que hay más protección disponible para ti, pero también que la empresa transportista y su aseguradora van a defender el caso con muchos más recursos.',
      'Si el choque ocurrió en el área de Houston, nuestros <a href="/es/abogado-accidentes-houston" class="text-[#B2904D] underline hover:text-white">abogados de accidentes en Houston</a> pueden revisar tu caso sin costo y en tu idioma. Y si además te preocupa tu situación migratoria, ya te explicamos <a href="/es/blog/accidente-auto-indocumentado-derechos" class="text-[#B2904D] underline hover:text-white">tus derechos tras un accidente aunque no tengas papeles</a>: no tener documentos no te quita el derecho a reclamar.',
      'Cada caso es diferente. <strong>Esta información es educativa y no sustituye la consulta con un abogado.</strong>'
    ],
    sections: {
      whyDifferent: {
        title: 'Por qué un choque con tráiler no es "otro accidente de auto"',
        subtitle: 'Más daño físico, más reglas y mucho más dinero en juego',
        text: 'Tratar un choque con un camión comercial como si fuera un accidente de auto cualquiera es el primer error que cometen muchas víctimas. La física, la regulación y el seguro involucrado son de otra escala, y eso cambia por completo cómo se investiga y cuánto puede valer el caso.',
        list: [
          '<strong>Las lesiones suelen ser mucho más graves:</strong> en 2023 Texas registró 12,542 choques de camiones comerciales que dejaron 563 muertes y 8,710 lesionados, según TxDOT. Esas 563 muertes representan alrededor del 12% de todas las muertes viales del estado.',
          '<strong>El problema se concentra en las grandes ciudades:</strong> el condado de Harris, donde está Houston, encabeza los choques de vehículos comerciales de Texas, seguido por Dallas, Bexar y Tarrant. Si manejas por estas zonas, compartes la vía con miles de tráileres cada día.',
          '<strong>Aplican reglas federales, no solo estatales:</strong> los camiones interestatales están regulados por la FMCSA, que impone límites de horas de manejo, requisitos de mantenimiento e inspección, y registros obligatorios que un auto particular no tiene.',
          '<strong>Hay mucho más seguro disponible:</strong> un camión interestatal debe llevar un seguro federal mínimo de $750,000, mientras que el mínimo de un auto en Texas es 30/60/25 ($30,000 por persona lesionada, $60,000 por accidente y $25,000 por daños a la propiedad, según el Texas Transportation Code §601.072).',
          '<strong>La defensa se activa de inmediato:</strong> por lo mismo que hay tanto dinero en juego, las transportistas y sus aseguradoras suelen mover investigadores y ajustadores desde las primeras horas para construir su versión del choque.'
        ],
        note: 'Que exista más cobertura no significa que te la vayan a ofrecer. Significa que la aseguradora tiene más razones para pelear cada dólar, y que tu caso necesita la misma seriedad con la que ellos lo van a defender.'
      },
      whoIsLiable: {
        title: 'Quién paga: los posibles responsables (no solo el chofer)',
        subtitle: 'En un caso de camión puede haber varios demandados a la vez',
        text: 'En un choque entre autos normalmente hay un solo responsable: el otro conductor. En un accidente de tráiler, la ley permite reclamar contra todas las personas y empresas cuya negligencia contribuyó al choque. Identificarlas a todas es una de las tareas más importantes de la investigación.',
        list: [
          '<strong>El chofer del camión:</strong> si manejó con fatiga, distraído, a exceso de velocidad o violando los límites de horas de servicio de la FMCSA, su negligencia es la base del caso.',
          '<strong>La empresa transportista:</strong> responde por los actos de su empleado y también por fallas propias, como contratar choferes sin verificar su historial, presionar con horarios imposibles de cumplir o no supervisar las bitácoras.',
          '<strong>El dueño del tráiler:</strong> muchas veces el remolque pertenece a una empresa distinta a la que opera el camión, y esa empresa puede ser responsable si el remolque tenía fallas.',
          '<strong>El taller de mantenimiento:</strong> si unos frenos mal reparados, llantas gastadas o luces defectuosas contribuyeron al accidente, el taller que certificó el mantenimiento puede compartir la responsabilidad.',
          '<strong>La empresa que cargó la mercancía:</strong> una carga mal distribuida o mal asegurada puede volcar un tráiler, desestabilizarlo en una curva o soltarse sobre la vía.'
        ],
        note: 'Identificar a todos los responsables no es un tecnicismo legal: cada responsable adicional puede significar otra póliza de seguro disponible para cubrir tus gastos médicos, tus salarios perdidos y tu recuperación.'
      },
      evidence: {
        title: 'La evidencia clave desaparece rápido (y no está en tus manos)',
        subtitle: 'La caja negra y las bitácoras las controla la empresa del camión',
        text: 'En un choque de autos, la evidencia principal son las fotos, el reporte policial y los testigos. En un caso de camión, la evidencia más valiosa está dentro del propio camión y en los archivos de la empresa transportista, es decir, en manos de la parte contraria. Y esa evidencia no espera.',
        list: [
          '<strong>La "caja negra" (ELD):</strong> el dispositivo de registro electrónico documenta velocidad, frenados y horas de manejo en los momentos previos al impacto. Es de los datos más objetivos que existen sobre cómo ocurrió el choque.',
          '<strong>Las bitácoras de horas de servicio:</strong> la FMCSA limita cuántas horas puede manejar un chofer antes de descansar. Las bitácoras muestran si iba fatigado o si la empresa toleraba violaciones a la regla.',
          '<strong>Los registros de mantenimiento e inspección:</strong> demuestran si el camión circulaba con fallas conocidas de frenos, llantas o luces que nadie corrigió.',
          '<strong>Videos y testigos independientes:</strong> las cámaras de negocios y las dashcams suelen sobrescribirse en días, y los testigos se vuelven difíciles de localizar con el tiempo.',
          '<strong>La carta de preservación de evidencia:</strong> un abogado envía de inmediato una carta legal urgente que obliga a la empresa a conservar la caja negra, las bitácoras y los registros de mantenimiento, bajo consecuencias legales si los destruye.'
        ],
        warning: 'Cada semana que pasa sin exigir la preservación de la evidencia es una semana en la que registros que podrían probar tu caso pueden borrarse en el curso normal del negocio. Esta es la razón número uno para no esperar a "ver cómo te sientes" antes de buscar asesoría.'
      },
      whatToDo: {
        title: 'Qué hacer después del choque, paso a paso',
        subtitle: 'Los primeros días definen la fuerza de tu reclamo',
        text: 'Si acabas de pasar por un choque con un camión comercial, lo que hagas en los primeros días puede fortalecer tu caso o debilitarlo de forma permanente. Estos pasos aplican sin importar tu estatus migratorio ni el idioma que hables.',
        list: [
          '<strong>1. Llama al 911 y pide el reporte policial:</strong> el reporte documenta la escena, los vehículos y las primeras declaraciones. En choques con camiones comerciales suele incluir información sobre la empresa y el chofer.',
          '<strong>2. Busca atención médica el mismo día:</strong> la adrenalina esconde lesiones internas, de cuello y de espalda. Si esperas días para ver a un doctor, la aseguradora argumentará que no estabas tan lesionado.',
          '<strong>3. Fotografía todo lo que puedas:</strong> posiciones de los vehículos, marcas de frenado, la carga, las placas y, muy importante, el número DOT y el nombre de la empresa pintados en la cabina del camión.',
          '<strong>4. Pide los datos de los testigos:</strong> nombre y teléfono bastan. Un testigo independiente puede desmontar la versión de la empresa cuando intente culparte.',
          '<strong>5. No discutas la culpa ni des declaraciones grabadas:</strong> ni en la escena ni por teléfono con la aseguradora del camión. Limítate a los hechos con la policía.',
          '<strong>6. Habla con un abogado lo antes posible:</strong> no para demandar de inmediato, sino para enviar la carta de preservación de evidencia antes de que la caja negra y las bitácoras desaparezcan.'
        ],
        note: 'El número DOT del camión y el nombre de la transportista son datos de oro: con ellos se puede identificar a la empresa, su historial de seguridad ante la FMCSA y las pólizas de seguro que responden por el choque.'
      },
      caseValue: {
        title: 'Cuánto vale un caso de accidente de camión',
        subtitle: 'No hay cifra mágica: depende de tus daños y de las pólizas disponibles',
        text: 'Es la pregunta más frecuente y la respuesta honesta es: depende. El valor de un caso no sale de una tabla, sino de sumar tus daños reales y compararlos con la cobertura disponible. Lo que sí es cierto es que los casos de camión comercial suelen involucrar lesiones más graves y pólizas mucho más amplias que un choque de autos.',
        list: [
          '<strong>Gastos médicos pasados y futuros:</strong> ambulancia, hospital, cirugías, rehabilitación y el tratamiento que vas a necesitar más adelante. En lesiones graves, el tratamiento futuro suele ser el componente más grande.',
          '<strong>Salarios perdidos y capacidad de trabajo:</strong> los ingresos que dejaste de percibir y, si las lesiones son permanentes, lo que ya no podrás ganar en el futuro.',
          '<strong>Dolor y sufrimiento:</strong> compensación por el dolor físico, la ansiedad, el trauma de volver a manejar y la pérdida de calidad de vida.',
          '<strong>Daños a la propiedad:</strong> la reparación o el reemplazo de tu vehículo y de lo que llevabas en él.',
          '<strong>Las pólizas disponibles:</strong> el seguro federal mínimo de $750,000 de un camión interestatal —y las pólizas de los demás responsables— marcan el techo práctico de lo que se puede recuperar. Por eso importa tanto identificar a todos los responsables.'
        ],
        note: 'Desconfía de quien te "garantice" una cantidad sin conocer tu expediente médico ni las pólizas involucradas. El valor real de un caso solo puede estimarse con la evidencia y los diagnósticos en la mano, y ningún abogado serio promete resultados.'
      },
      rule51: {
        title: 'La regla del 51%: qué pasa si te echan parte de la culpa',
        subtitle: 'Texas usa negligencia comparativa modificada',
        text: 'En Texas, que tengas parte de la culpa no destruye tu caso automáticamente, pero sí lo puede reducir. La regla está en el Capítulo 33 del Código de Práctica Civil y Recursos de Texas (responsabilidad proporcional) y funciona así:',
        list: [
          '<strong>Si tu culpa es 50% o menos:</strong> puedes cobrar, pero tu compensación se reduce en proporción a tu porcentaje. Con 20% de culpa, recuperas el 80% de tus daños.',
          '<strong>Si tu culpa supera el 50%:</strong> no cobras nada. Por eso a esta regla se le conoce como la "regla del 51%".',
          '<strong>La aseguradora lo sabe y lo usa:</strong> cada punto de culpa que logra asignarte es dinero que se ahorra. Es común que intenten culparte por frenar, por cambiar de carril o por "ir distraído".',
          '<strong>La evidencia objetiva es tu mejor defensa:</strong> la caja negra, las bitácoras del chofer y los registros de mantenimiento no negocian ni cambian su versión. Por eso preservarlos a tiempo es tan importante.',
          '<strong>Tienes 2 años para demandar:</strong> el estatuto de limitaciones de Texas corre desde el día del accidente. Si el plazo vence, pierdes el derecho aunque tu caso fuera sólido.'
        ],
        note: 'No aceptes por teléfono un porcentaje de culpa que te proponga el ajustador. La asignación de responsabilidad se pelea con evidencia, no con la primera versión que le convenga a la aseguradora.'
      },
      insurerMistakes: {
        title: 'Errores con la aseguradora que pueden costarte el caso',
        subtitle: 'El ajustador del camión no trabaja para ti',
        text: 'Después de un choque con un tráiler, es muy probable que la aseguradora de la empresa te contacte rápido, amable y "para ayudarte". Su trabajo es cerrar tu reclamo por lo menos posible. Estos son los errores que más daño hacen:',
        list: [
          '<strong>Dar una declaración grabada sin abogado:</strong> los ajustadores están entrenados para obtener frases que después usan para culparte o minimizar tus lesiones.',
          '<strong>Firmar autorizaciones médicas amplias:</strong> les permiten escarbar en todo tu historial médico buscando "condiciones preexistentes" para atribuirles tus lesiones.',
          '<strong>Aceptar la primera oferta:</strong> casi siempre llega antes de que conozcas el alcance real de tus lesiones. Una vez que firmas el finiquito, no puedes reclamar más, aunque después necesites cirugía.',
          '<strong>Publicar sobre el accidente en redes sociales:</strong> una foto o un comentario fuera de contexto puede usarse para argumentar que no estás tan lesionado.',
          '<strong>Dejar pasar el tiempo:</strong> entre el plazo de 2 años para demandar y la evidencia que se borra en semanas, esperar es la estrategia que más le conviene a la empresa, no a ti.',
          '<strong>Asumir que tu estatus migratorio te descalifica:</strong> el estatus migratorio no impide demandar por un accidente de camión. No dejes que el miedo te haga regalar tu caso.'
        ],
        warning: 'Si la aseguradora del camión te llamó a los pocos días con un cheque en la mano, tómalo como una señal: cuando la evidencia apunta contra su asegurado, cerrar rápido y barato es su mejor negocio.'
      },
      faq: {
        title: 'Preguntas Frecuentes',
        items: [
          {
            q: '¿Cuánto tiempo tengo para demandar por un accidente de camión en Texas?',
            a: 'El estatuto de limitaciones de Texas te da <strong>2 años desde la fecha del accidente</strong> para presentar una demanda por lesiones personales. Pero en casos de camión no conviene apurar el plazo: la caja negra, las bitácoras y los videos pueden desaparecer en semanas, así que la investigación debe empezar mucho antes de que el límite legal se acerque.'
          },
          {
            q: '¿Puedo reclamar si no tengo papeles?',
            a: '<strong>Sí.</strong> El estatus migratorio no impide demandar por un accidente de camión en Texas. Tienes derecho a reclamar tus gastos médicos, salarios perdidos y dolor y sufrimiento igual que cualquier otra víctima. Si la aseguradora insinúa lo contrario, está intentando intimidarte.'
          },
          {
            q: '¿Qué pasa si la aseguradora dice que parte de la culpa fue mía?',
            a: 'Texas aplica la <strong>negligencia comparativa modificada (regla del 51%)</strong>: puedes recuperar compensación mientras tu culpa no supere el 50%, aunque se reduce en proporción a tu porcentaje. La aseguradora tiene incentivo para inflar tu culpa, y la mejor forma de rebatirla es con evidencia objetiva como la caja negra y las bitácoras del chofer.'
          },
          {
            q: '¿A quién se demanda si el chofer trabajaba para una empresa?',
            a: 'Posiblemente a varios a la vez: <strong>el chofer, la empresa transportista, el dueño del tráiler, el taller de mantenimiento y la empresa que cargó la mercancía</strong> pueden compartir responsabilidad según lo que muestre la investigación. Cada responsable adicional puede aportar otra póliza de seguro para cubrir tus daños.'
          },
          {
            q: '¿Por qué la aseguradora del camión me contactó tan rápido?',
            a: 'Porque las transportistas y sus aseguradoras activan equipos de respuesta desde las primeras horas para proteger sus intereses. Si te buscan pronto, suele ser para obtener <strong>una declaración grabada o una firma</strong> antes de que hables con un abogado. No estás obligado a darles ninguna de las dos.'
          },
          {
            q: '¿Cuánto dinero me pueden dar por mi caso?',
            a: 'Ningún abogado honesto puede prometerte una cantidad. El valor depende de <strong>tus lesiones, tu tratamiento presente y futuro, tus ingresos perdidos y las pólizas disponibles</strong>. Lo que sí es un hecho es que los camiones interestatales llevan un seguro federal mínimo de $750,000, mucho mayor que el de un auto, por lo que estos casos suelen tener más cobertura para responder por daños graves.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusión',
        text: 'Un accidente con un tráiler de 18 ruedas pone en tu contra a una empresa, a su aseguradora y al reloj: la evidencia que puede probar tu caso está en manos de la parte contraria y no espera. La buena noticia es que la ley te da herramientas reales: varios responsables potenciales, pólizas comerciales mucho más amplias que las de un auto, la regla del 51% que protege tu derecho a cobrar aunque te asignen parte de la culpa, y 2 años para demandar sin importar tu estatus migratorio.',
        advice: 'Busca atención médica hoy, guarda toda la evidencia que puedas y no des ninguna declaración a la aseguradora del camión sin hablar antes con un abogado. Exigir a tiempo la preservación de la caja negra y las bitácoras puede ser la diferencia entre un caso sólido y tu palabra contra la de una empresa.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'TxDOT – Estadísticas de choques de vehículos comerciales (2023)',
          'FMCSA – Requisitos federales de seguro y horas de servicio',
          'Texas Civil Practice & Remedies Code – Capítulo 33 (responsabilidad proporcional)',
          'Texas Transportation Code §601.072 – Mínimos de seguro'
        ]
      }
    }
  },
  en: {
    metaTitle: '18-Wheeler Accidents in Texas: Who Pays for Your Injuries',
    metaDesc: 'Hit by an 18-wheeler in Texas? Learn who can be held liable, what evidence disappears fast, and how compensation is calculated. Talk to a lawyer today.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '11 min read',
      tags: 'Truck Accident',
      date: 'Jun 29, 2026',
      time: '11 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: '18-Wheeler Accidents in Texas: Who Pays and What Your Case Is Worth',
    summary: {
      title: 'Initial Summary',
      text: 'A crash with an 18-wheeler is not an ordinary car accident: <strong>several parties can be liable at the same time</strong> (the driver, the trucking company, the trailer owner, the maintenance shop, or whoever loaded the cargo), interstate trucks must carry a federal minimum of <strong>$750,000</strong> in insurance, and the most important evidence — the black box and the driver\'s logbooks — can disappear within weeks if no one demands that it be preserved. You have <strong>2 years</strong> to file a lawsuit in Texas, and your immigration status does not stop you. Here we explain who pays, what determines the value of your case, and which mistakes to avoid with the insurance company.'
    },
    intro: [
      'A fully loaded 18-wheeler weighs many times more than a passenger car. When that difference in size and weight turns into a crash on a Texas highway, the consequences are almost never shared evenly: the people in the smaller vehicle are the ones who end up in the hospital, unable to work, and buried under medical bills they never asked for.',
      'The numbers back this up. In 2023, Texas recorded 12,542 commercial truck crashes, with 563 deaths — roughly 12% of all traffic deaths in the state — and 8,710 people injured, according to TxDOT data. And the problem is concentrated exactly where our community lives: Harris County (Houston) leads the state in commercial vehicle crashes, followed by Dallas, Bexar, and Tarrant counties.',
      'The flip side is that a commercial truck case does not work like a crash between two cars. Federal regulations come into play, several companies can be liable at the same time, and interstate trucks are required to carry insurance policies far larger than any car policy. That means there is more protection available for you — but it also means the trucking company and its insurer will defend the case with far greater resources.',
      'If your crash happened in the Houston area, our <a href="/en/abogado-accidentes-houston" class="text-[#B2904D] underline hover:text-white">Houston accident attorneys</a> can review your case at no cost and in your language. And if you are also worried about your immigration situation, we already explained <a href="/en/blog/accidente-auto-indocumentado-derechos" class="text-[#B2904D] underline hover:text-white">your rights after an accident even if you don\'t have papers</a>: lacking documents does not take away your right to file a claim.',
      'Every case is different. <strong>This information is educational and does not replace consultation with an attorney.</strong>'
    ],
    sections: {
      whyDifferent: {
        title: 'Why a Crash with an 18-Wheeler Is Not "Just Another Car Accident"',
        subtitle: 'More physical harm, more rules, and much more money at stake',
        text: 'Treating a commercial truck crash like any ordinary car accident is the first mistake many victims make. The physics, the regulations, and the insurance involved are on a completely different scale, and that changes how the case is investigated and what it can be worth.',
        list: [
          '<strong>Injuries tend to be far more severe:</strong> in 2023, Texas recorded 12,542 commercial truck crashes that left 563 people dead and 8,710 injured, according to TxDOT. Those 563 deaths represent roughly 12% of all traffic deaths in the state.',
          '<strong>The problem is concentrated in the big metro areas:</strong> Harris County, home to Houston, leads Texas in commercial vehicle crashes, followed by Dallas, Bexar, and Tarrant. If you drive in these areas, you share the road with thousands of 18-wheelers every day.',
          '<strong>Federal rules apply, not just state law:</strong> interstate trucks are regulated by the FMCSA, which imposes driving-hour limits, maintenance and inspection requirements, and mandatory records that no private car has.',
          '<strong>There is far more insurance available:</strong> an interstate truck must carry a federal minimum of $750,000 in insurance, while the minimum for a car in Texas is 30/60/25 ($30,000 per injured person, $60,000 per accident, and $25,000 for property damage, under Texas Transportation Code §601.072).',
          '<strong>The defense mobilizes immediately:</strong> precisely because so much money is at stake, trucking companies and their insurers often deploy investigators and adjusters within hours to build their version of the crash.'
        ],
        note: 'More coverage being available does not mean anyone will offer it to you. It means the insurer has more reasons to fight over every dollar — and that your case deserves the same seriousness they will bring to defending it.'
      },
      whoIsLiable: {
        title: 'Who Pays: The Potentially Liable Parties (Not Just the Driver)',
        subtitle: 'A truck case can have several defendants at once',
        text: 'In a crash between two cars, there is usually one responsible party: the other driver. In an 18-wheeler accident, the law allows you to bring claims against every person and company whose negligence contributed to the crash. Identifying all of them is one of the most important tasks of the investigation.',
        list: [
          '<strong>The truck driver:</strong> if he drove fatigued, distracted, over the speed limit, or in violation of FMCSA hours-of-service limits, his negligence is the foundation of the case.',
          '<strong>The trucking company:</strong> it answers for its employee\'s conduct and also for its own failures, such as hiring drivers without checking their records, imposing impossible schedules, or failing to monitor logbooks.',
          '<strong>The trailer owner:</strong> the trailer often belongs to a different company than the one operating the truck, and that company can be liable if the trailer was defective.',
          '<strong>The maintenance shop:</strong> if poorly repaired brakes, worn tires, or defective lights contributed to the accident, the shop that signed off on the maintenance can share responsibility.',
          '<strong>The company that loaded the cargo:</strong> a poorly distributed or poorly secured load can roll a trailer over, destabilize it in a curve, or spill onto the road.'
        ],
        note: 'Identifying every liable party is not a legal technicality: each additional defendant can mean another insurance policy available to cover your medical bills, your lost wages, and your recovery.'
      },
      evidence: {
        title: 'The Key Evidence Disappears Fast (and It Is Not in Your Hands)',
        subtitle: 'The black box and the logbooks are controlled by the trucking company',
        text: 'In a car crash, the main evidence is your photos, the police report, and the witnesses. In a truck case, the most valuable evidence sits inside the truck itself and in the trucking company\'s files — in other words, in the hands of the opposing party. And that evidence does not wait.',
        list: [
          '<strong>The "black box" (ELD):</strong> the electronic logging device records speed, braking, and driving hours in the moments before impact. It is some of the most objective data that exists about how the crash happened.',
          '<strong>The hours-of-service logbooks:</strong> the FMCSA limits how many hours a driver can be behind the wheel before resting. The logs show whether he was fatigued or whether the company tolerated violations.',
          '<strong>Maintenance and inspection records:</strong> they show whether the truck was on the road with known brake, tire, or light problems that no one fixed.',
          '<strong>Video and independent witnesses:</strong> business security cameras and dashcams are often overwritten within days, and witnesses become harder to locate as time passes.',
          '<strong>The evidence preservation letter:</strong> an attorney immediately sends an urgent legal letter that requires the company to preserve the black box, the logbooks, and the maintenance records, with legal consequences if they are destroyed.'
        ],
        warning: 'Every week that passes without demanding preservation is a week in which records that could prove your case may be erased in the ordinary course of business. This is the number one reason not to wait and "see how you feel" before getting legal advice.'
      },
      whatToDo: {
        title: 'What to Do After the Crash, Step by Step',
        subtitle: 'The first days define the strength of your claim',
        text: 'If you were just in a crash with a commercial truck, what you do in the first days can strengthen your case or permanently weaken it. These steps apply regardless of your immigration status or the language you speak.',
        list: [
          '<strong>1. Call 911 and request the police report:</strong> the report documents the scene, the vehicles, and the first statements. In commercial truck crashes it usually includes information about the company and the driver.',
          '<strong>2. Seek medical attention the same day:</strong> adrenaline masks internal, neck, and back injuries. If you wait days to see a doctor, the insurer will argue you were not really hurt.',
          '<strong>3. Photograph everything you can:</strong> vehicle positions, skid marks, the cargo, the license plates and — very important — the DOT number and company name painted on the truck\'s cab.',
          '<strong>4. Get witness information:</strong> a name and phone number are enough. An independent witness can dismantle the company\'s version when it tries to blame you.',
          '<strong>5. Do not argue fault or give recorded statements:</strong> not at the scene and not on the phone with the truck\'s insurer. Stick to the facts with the police.',
          '<strong>6. Talk to an attorney as soon as possible:</strong> not necessarily to sue right away, but to send the evidence preservation letter before the black box and the logbooks disappear.'
        ],
        note: 'The truck\'s DOT number and the carrier\'s name are golden details: with them, it is possible to identify the company, its FMCSA safety history, and the insurance policies that answer for the crash.'
      },
      caseValue: {
        title: 'What a Truck Accident Case Is Worth',
        subtitle: 'There is no magic number: it depends on your damages and the available policies',
        text: 'It is the most common question, and the honest answer is: it depends. The value of a case does not come from a chart — it comes from adding up your real damages and comparing them against the available coverage. What is true is that commercial truck cases usually involve more serious injuries and far larger policies than a car crash.',
        list: [
          '<strong>Past and future medical expenses:</strong> ambulance, hospital, surgeries, rehabilitation, and the treatment you will need down the road. In serious injuries, future care is often the largest component.',
          '<strong>Lost wages and earning capacity:</strong> the income you stopped earning and, if the injuries are permanent, what you will no longer be able to earn in the future.',
          '<strong>Pain and suffering:</strong> compensation for physical pain, anxiety, the trauma of driving again, and loss of quality of life.',
          '<strong>Property damage:</strong> the repair or replacement of your vehicle and whatever you were carrying in it.',
          '<strong>The available policies:</strong> the $750,000 federal minimum for an interstate truck — plus the policies of the other liable parties — sets the practical ceiling on recovery. That is why identifying every defendant matters so much.'
        ],
        note: 'Be wary of anyone who "guarantees" you an amount without knowing your medical records or the policies involved. The real value of a case can only be estimated with the evidence and diagnoses in hand, and no serious attorney promises results.'
      },
      rule51: {
        title: 'The 51% Rule: What Happens If They Blame You for Part of It',
        subtitle: 'Texas uses modified comparative negligence',
        text: 'In Texas, sharing part of the fault does not automatically destroy your case, but it can reduce it. The rule lives in Chapter 33 of the Texas Civil Practice & Remedies Code (proportionate responsibility) and works like this:',
        list: [
          '<strong>If your fault is 50% or less:</strong> you can recover, but your compensation is reduced in proportion to your percentage. At 20% fault, you recover 80% of your damages.',
          '<strong>If your fault exceeds 50%:</strong> you recover nothing. That is why this is known as the "51% rule."',
          '<strong>The insurer knows this and uses it:</strong> every percentage point of fault it pins on you is money it saves. It is common for them to blame you for braking, changing lanes, or "driving distracted."',
          '<strong>Objective evidence is your best defense:</strong> the black box, the driver\'s logbooks, and the maintenance records do not negotiate or change their story. That is why preserving them in time matters so much.',
          '<strong>You have 2 years to file suit:</strong> the Texas statute of limitations runs from the day of the accident. Once it expires, you lose the right even if your case was strong.'
        ],
        note: 'Do not accept a fault percentage proposed by an adjuster over the phone. Responsibility is fought over with evidence, not with whatever first version happens to suit the insurance company.'
      },
      insurerMistakes: {
        title: 'Mistakes with the Insurance Company That Can Cost You the Case',
        subtitle: 'The truck\'s adjuster does not work for you',
        text: 'After a crash with an 18-wheeler, the company\'s insurer will very likely contact you quickly, politely, and "to help you." Their job is to close your claim for as little as possible. These are the mistakes that do the most damage:',
        list: [
          '<strong>Giving a recorded statement without a lawyer:</strong> adjusters are trained to draw out phrases they will later use to blame you or minimize your injuries.',
          '<strong>Signing broad medical authorizations:</strong> they let the insurer dig through your entire medical history looking for "pre-existing conditions" to blame for your injuries.',
          '<strong>Accepting the first offer:</strong> it almost always arrives before you know the real extent of your injuries. Once you sign the release, you cannot claim more — even if you later need surgery.',
          '<strong>Posting about the accident on social media:</strong> one photo or out-of-context comment can be used to argue you are not really hurt.',
          '<strong>Letting time pass:</strong> between the 2-year deadline to sue and evidence that can vanish in weeks, waiting is the strategy that benefits the company — not you.',
          '<strong>Assuming your immigration status disqualifies you:</strong> immigration status does not prevent you from suing over a truck accident. Do not let fear make you give your case away.'
        ],
        warning: 'If the truck\'s insurer called you within days with a check in hand, take it as a signal: when the evidence points against their insured, closing fast and cheap is their best business move.'
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'How long do I have to sue over a truck accident in Texas?',
            a: 'The Texas statute of limitations gives you <strong>2 years from the date of the accident</strong> to file a personal injury lawsuit. But in truck cases you should not run out the clock: the black box, the logbooks, and video footage can disappear within weeks, so the investigation needs to start long before the legal deadline gets close.'
          },
          {
            q: 'Can I file a claim if I don\'t have papers?',
            a: '<strong>Yes.</strong> Immigration status does not prevent you from suing over a truck accident in Texas. You have the right to claim your medical expenses, lost wages, and pain and suffering just like any other victim. If the insurer suggests otherwise, it is trying to intimidate you.'
          },
          {
            q: 'What if the insurance company says part of the fault was mine?',
            a: 'Texas applies <strong>modified comparative negligence (the 51% rule)</strong>: you can recover compensation as long as your fault does not exceed 50%, though it is reduced in proportion to your percentage. The insurer has every incentive to inflate your share of fault, and the best way to push back is objective evidence like the black box and the driver\'s logbooks.'
          },
          {
            q: 'Who do you sue if the driver was working for a company?',
            a: 'Possibly several parties at once: <strong>the driver, the trucking company, the trailer owner, the maintenance shop, and the company that loaded the cargo</strong> can all share liability depending on what the investigation shows. Each additional defendant can bring another insurance policy to cover your damages.'
          },
          {
            q: 'Why did the truck\'s insurance company contact me so fast?',
            a: 'Because trucking companies and their insurers activate response teams within hours to protect their interests. If they reach out early, it is usually to get <strong>a recorded statement or a signature</strong> before you talk to an attorney. You are not required to give them either one.'
          },
          {
            q: 'How much money can I get for my case?',
            a: 'No honest attorney can promise you an amount. The value depends on <strong>your injuries, your current and future treatment, your lost income, and the available policies</strong>. What is a fact is that interstate trucks carry a federal minimum of $750,000 in insurance — far more than a car — so these cases usually have more coverage available to answer for serious harm.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusion',
        text: 'An 18-wheeler accident puts a company, its insurer, and the clock against you: the evidence that can prove your case is in the opposing party\'s hands, and it does not wait. The good news is that the law gives you real tools: multiple potentially liable parties, commercial policies far larger than any car policy, the 51% rule that protects your right to recover even if you are assigned part of the fault, and 2 years to sue regardless of your immigration status.',
        advice: 'Get medical care today, save every piece of evidence you can, and do not give any statement to the truck\'s insurer before speaking with an attorney. Demanding preservation of the black box and the logbooks in time can be the difference between a solid case and your word against a company\'s.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'TxDOT – Commercial Vehicle Crash Statistics (2023)',
          'FMCSA – Federal Insurance and Hours-of-Service Requirements',
          'Texas Civil Practice & Remedies Code – Chapter 33 (Proportionate Responsibility)',
          'Texas Transportation Code §601.072 – Minimum Insurance Requirements'
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
    path: `/${lang}/blog/accidente-camion-18-ruedas-texas-compensacion`,
    title: t.title,
    description: t.metaDesc,
    images: [{ url: IMAGES.article, alt: t.title }],
    type: 'article',
    publishedTime: '2026-06-29T08:00:00.000Z',
  });

  return {
    title: { absolute: t.metaTitle },
    description: t.metaDesc,
    openGraph: {
      ...social.openGraph,
      // Campos article:* que buildSocialMetadata no cubre.
      type: 'article',
      authors: ['Manuel Solís'],
      section: 'Lesiones Personales',
      tags: ['Accidente de Camión', '18 Ruedas', 'Tráiler', 'Texas', 'Lesiones Personales'],
    },
    twitter: social.twitter,
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/accidente-camion-18-ruedas-texas-compensacion`,
      languages: {
        'es': `${SITE_URL}/es/blog/accidente-camion-18-ruedas-texas-compensacion`,
        'en': `${SITE_URL}/en/blog/accidente-camion-18-ruedas-texas-compensacion`,
        'x-default': `${SITE_URL}/es/blog/accidente-camion-18-ruedas-texas-compensacion`,
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
    { name: t.title, url: `/${lang}/blog/accidente-camion-18-ruedas-texas-compensacion` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="accidente-camion-18-ruedas-texas-compensacion"
        date="2026-06-29"
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
                     alt="Accidente con tráiler de 18 ruedas en Texas"
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

                  {/* whyDifferent */}
                  <section>
                    <h2 id="por-que-son-diferentes" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Truck size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whyDifferent.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.whyDifferent.subtitle}</p>
                    <p className="mb-4">{t.sections.whyDifferent.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.whyDifferent.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.whyDifferent.note}
                    </div>
                  </section>

                  {/* whoIsLiable */}
                  <section>
                    <h2 id="quien-puede-ser-responsable" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Building2 size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whoIsLiable.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.whoIsLiable.subtitle}</p>
                    <p className="mb-4">{t.sections.whoIsLiable.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.whoIsLiable.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.whoIsLiable.note}
                    </div>
                  </section>

                  {/* evidence */}
                  <section>
                    <h2 id="la-evidencia-desaparece-rapido" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Search size={24} className="text-[#B2904D]" /></div>
                      {t.sections.evidence.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.evidence.subtitle}</p>
                    <p className="mb-4">{t.sections.evidence.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.evidence.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 p-5 bg-red-500/10 rounded-xl border border-red-500/20">
                      <p className="text-red-400 font-bold m-0 flex items-start gap-2">
                        <AlertTriangle size={20} className="shrink-0 mt-1" />
                        {t.sections.evidence.warning}
                      </p>
                    </div>
                  </section>

                  {/* whatToDo */}
                  <section>
                    <h2 id="que-hacer-tras-el-choque" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><FileText size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whatToDo.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.whatToDo.subtitle}</p>
                    <p className="mb-4">{t.sections.whatToDo.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.whatToDo.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.whatToDo.note}
                    </div>
                  </section>

                  {/* caseValue */}
                  <section>
                    <h2 id="cuanto-vale-un-caso" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><DollarSign size={24} className="text-[#B2904D]" /></div>
                      {t.sections.caseValue.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.caseValue.subtitle}</p>
                    <p className="mb-4">{t.sections.caseValue.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.caseValue.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.caseValue.note}
                    </div>
                  </section>

                  {/* rule51 */}
                  <section>
                    <h2 id="la-regla-del-51" className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Scale size={24} className="text-[#B2904D]" /></div>
                      {t.sections.rule51.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.rule51.subtitle}</p>
                    <p className="mb-4">{t.sections.rule51.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.rule51.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.rule51.note}
                    </div>
                  </section>

                  {/* insurerMistakes */}
                  <section>
                    <h2 id="errores-con-la-aseguradora" className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><AlertTriangle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.insurerMistakes.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.insurerMistakes.subtitle}</p>
                    <p className="mb-4">{t.sections.insurerMistakes.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.insurerMistakes.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 p-5 bg-red-500/10 rounded-xl border border-red-500/20">
                      <p className="text-red-400 font-bold m-0 flex items-start gap-2">
                        <AlertTriangle size={20} className="shrink-0 mt-1" />
                        {t.sections.insurerMistakes.warning}
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
            articles={getRelatedArticles('accidente-camion-18-ruedas-texas-compensacion', (lang as 'es' | 'en') || 'es')}
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
