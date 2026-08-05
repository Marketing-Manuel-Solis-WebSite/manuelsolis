import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle,
  Lightbulb, Quote, TrendingUp, Award, Heart, Star, MessageCircle,
  Send, ArrowUpRight, ShieldCheck, FileText, User, Gavel, Search, Building2,
  Users, Baby, Globe, AlertTriangle, Car, Phone, Camera, Ban, Activity,
  DollarSign, MapPin, Scale
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
  article: '/blog/blog_25/B5_CR1.jpg',
  inside1: '/blog/blog_25/B5_CR2.jpg',
  inside2: '/blog/blog_25/B5_CR2.jpg',
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Accidente de Auto Siendo Indocumentado: Tus Derechos en Texas',
    metaDesc: '¿Tuviste un accidente de auto y no tienes papeles? Conoce tus derechos, qué hacer el primer día, EMTALA, y cuándo el choque puede afectar tu caso migratorio.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '10 min de lectura',
      tags: 'Accidente Auto & Derechos',
      date: '26 Abr, 2026',
      time: '10 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'Accidente de Auto Siendo Indocumentado: Tus Derechos, Qué Hacer y Cuándo Puede Afectar Tu Estatus',
    summary: {
      title: 'Resumen inicial',
      text: 'Si tuviste un accidente de auto y no tienes estatus migratorio legal, <strong>tienes derechos</strong>. La ley federal obliga a los hospitales a atenderte en emergencias sin importar tu estatus o tu capacidad de pago. Puedes reclamar compensación por tus lesiones, daños al vehículo y salarios perdidos. Pero hay pasos críticos que debes seguir desde el primer día, y errores que pueden destruir tu caso legal e incluso afectar tu situación migratoria.'
    },
    intro: [
      'Cada año, miles de personas indocumentadas en Texas y otros estados sufren accidentes automovilísticos. El miedo al estatus migratorio hace que muchas no busquen atención médica, no reporten el accidente, o acepten acuerdos injustos con las aseguradoras.',
      'La realidad legal es clara: <strong>tu estatus migratorio no elimina tus derechos</strong> como víctima de un accidente. Las leyes de lesiones personales protegen a toda persona presente en el territorio, independientemente de si tiene visa, green card, o ningún documento.',
      'Este artículo explica paso a paso qué hacer después de un accidente, qué protecciones legales existen, qué errores evitar, y cuándo un accidente de auto podría tener implicaciones migratorias reales. La información se enfoca en Texas, pero los principios generales aplican en la mayoría de los estados.',
      'Si tu choque fue en Texas, nuestro equipo de <a href="/es/abogado-accidentes-houston" class="text-[#B2904D] underline hover:text-white">abogados de accidentes en Houston</a> y <a href="/es/abogado-accidentes-dallas" class="text-[#B2904D] underline hover:text-white">Dallas</a> puede evaluar tu caso sin costo y en español.',
      'Cada caso es diferente. <strong>Esta información es educativa y no sustituye la consulta con un abogado.</strong>'
    ],
    sections: {
      youHaveRights: {
        title: 'Sí, tienes derechos después de un choque aunque no tengas estatus',
        subtitle: 'La ley protege a las víctimas, no pregunta por papeles',
        text: 'En Estados Unidos, los derechos de una víctima de accidente automovilístico no dependen de su estatus migratorio. Esto está respaldado por múltiples precedentes legales y leyes federales y estatales. Si otra persona causó el accidente, esa persona (o su aseguradora) es responsable de tus daños, sin importar quién eres.',
        list: [
          'Tienes derecho a recibir <strong>atención médica de emergencia</strong> en cualquier sala de emergencias, sin importar tu estatus o capacidad de pago (protegido por la ley federal EMTALA).',
          'Tienes derecho a <strong>presentar un reclamo de seguro</strong> contra el conductor culpable o su aseguradora, igual que cualquier otra persona.',
          'Tienes derecho a <strong>compensación por lesiones personales</strong>, incluyendo gastos médicos, dolor y sufrimiento, salarios perdidos y daños a la propiedad.',
          'Tu estatus migratorio <strong>generalmente no es admisible como evidencia</strong> en un caso de lesiones personales en la mayoría de los estados, incluyendo Texas.'
        ],
        note: 'El hecho de que seas indocumentado no le da derecho a la otra parte ni a su aseguradora a negarte una compensación justa. Si alguien te dice lo contrario, está equivocado o está tratando de aprovecharse.'
      },
      firstDay: {
        title: 'Qué hacer el mismo día del accidente',
        subtitle: 'Los primeros pasos son los más importantes',
        text: 'Lo que hagas en las primeras horas después del accidente puede determinar el éxito o fracaso de tu reclamo legal. Sigue estos pasos en orden, sin importar tu estatus migratorio. Tu seguridad y tus derechos van primero.',
        list: [
          '<strong>1. Llama al 911:</strong> Reporta el accidente y solicita asistencia médica si hay lesiones. El reporte policial es evidencia clave para tu caso. La policía no está ahí para verificar tu estatus migratorio; su función es documentar el accidente.',
          '<strong>2. Busca atención médica inmediata:</strong> Si tienes dolor, mareos, dificultad para respirar o cualquier síntoma, ve al hospital o acepta la ambulancia. Muchas lesiones graves (como lesiones internas o cervicales) no muestran síntomas inmediatos. Si no buscas atención médica el mismo día, la aseguradora lo usará en tu contra.',
          '<strong>3. Documenta todo con fotos:</strong> Toma fotografías de los vehículos dañados, la escena del accidente, las señales de tráfico, tus lesiones visibles, y las placas del otro vehículo. Estas fotos son evidencia que puede valer miles de dólares en tu reclamo.',
          '<strong>4. Intercambia información con el otro conductor:</strong> Obtén el nombre, número de teléfono, número de licencia, nombre de la aseguradora y número de póliza del otro conductor. No discutas de quién fue la culpa en ese momento.',
          '<strong>5. Identifica testigos:</strong> Si alguien vio el accidente, pide su nombre y número de teléfono. Los testigos pueden ser decisivos si la aseguradora disputa la culpa.',
          '<strong>6. No firmes nada de la aseguradora del otro conductor:</strong> La compañía de seguros de la otra persona puede contactarte rápidamente ofreciendo un acuerdo. No firmes nada ni des declaraciones grabadas sin hablar primero con un abogado.'
        ],
        note: 'Si la policía llega a la escena, responde sus preguntas sobre el accidente. En Texas, la policía local generalmente no pregunta por estatus migratorio en la escena de un accidente de tráfico.'
      },
      whatNotToDo: {
        title: 'Qué NO hacer después del accidente',
        subtitle: 'Errores que pueden destruir tu caso',
        text: 'Tan importante como saber qué hacer es saber qué NO hacer. Estos errores son los que más frecuentemente vemos en personas que pierden su derecho a una compensación justa o que reciben mucho menos de lo que merecen.',
        list: [
          '<strong>No huyas de la escena:</strong> Irse del lugar del accidente es un delito (hit-and-run) que puede tener consecuencias criminales serias y que además destruiría cualquier reclamo de seguro. Si la policía llega y no estás, pierdes toda credibilidad.',
          '<strong>No rechaces la atención médica:</strong> Si no vas al doctor, la aseguradora argumentará que no estabas realmente lesionado. Cada día que pases sin tratamiento es un día que la otra parte usará para minimizar tu caso.',
          '<strong>No des declaraciones grabadas a la aseguradora contraria:</strong> Los ajustadores de seguros están entrenados para obtener admisiones que reduzcan el valor de tu reclamo. Cualquier cosa que digas puede ser usada en tu contra.',
          '<strong>No publiques sobre el accidente en redes sociales:</strong> Las aseguradoras revisan Facebook, Instagram y otras redes buscando evidencia de que tus lesiones no son tan graves como dices. Una foto sonriendo puede costar miles de dólares en tu caso.',
          '<strong>No aceptes el primer cheque que te ofrezcan:</strong> La primera oferta de la aseguradora casi siempre es mucho menor de lo que tu caso vale. Una vez que firmas, pierdes el derecho a reclamar más, incluso si después descubres lesiones adicionales.',
          '<strong>No mientas sobre nada:</strong> No inventes lesiones, no exageres síntomas, no digas que estabas solo si había alguien más en el carro. Las mentiras se descubren y destruyen todo el caso.'
        ],
        warning: 'El peor error de todos es no hacer nada por miedo a tu estatus migratorio. El silencio no te protege; te deja sin compensación y con deudas médicas.'
      },
      emergency: {
        title: 'Atención médica y ER: lo que protege la ley federal (EMTALA)',
        subtitle: 'Los hospitales deben atenderte en emergencia sin preguntar por papeles',
        text: 'La ley federal conocida como EMTALA (Emergency Medical Treatment and Labor Act) es una de las protecciones más importantes para cualquier persona en Estados Unidos, independientemente de su estatus migratorio. Esta ley fue promulgada en 1986 y se aplica a todo hospital que reciba fondos de Medicare, lo cual incluye prácticamente todos los hospitales de emergencia en el país.',
        list: [
          '<strong>Obligación de evaluar:</strong> Cualquier persona que llegue a una sala de emergencias tiene derecho a una evaluación médica para determinar si tiene una condición de emergencia, sin importar su capacidad de pago o estatus migratorio.',
          '<strong>Obligación de estabilizar:</strong> Si el hospital determina que tienes una emergencia médica, debe proporcionarte tratamiento para estabilizar tu condición antes de darte de alta o transferirte.',
          '<strong>Prohibición de preguntar por estatus:</strong> Los hospitales no pueden negar atención de emergencia basándose en estatus migratorio. Aunque pueden preguntar información de seguro o pago, no pueden condicionar la atención a que tengas documentos.',
          '<strong>Transferencias:</strong> Si el hospital no puede tratar tu condición, debe transferirte a otro centro que sí pueda, asegurándose de que el traslado sea médicamente seguro.'
        ],
        note: 'EMTALA cubre la atención de emergencia y estabilización. No cubre tratamiento continuo, especialistas o rehabilitación a largo plazo. Para esos servicios, otras opciones como clínicas comunitarias, programas de caridad hospitalaria, o la compensación del reclamo de seguro pueden ayudar.'
      },
      insurance: {
        title: 'Cómo funciona el reclamo con seguros y por qué cambia por estado',
        subtitle: 'El proceso varía dependiendo de dónde ocurra el accidente',
        text: 'El sistema de seguros de auto en Estados Unidos no es uniforme. Cada estado tiene sus propias reglas sobre quién paga, cuánto puede reclamarse, y cómo se manejan los casos. En Texas, el sistema es de "culpa" (at-fault), lo que significa que la persona responsable del accidente (o su aseguradora) debe pagar los daños.',
        list: [
          '<strong>Gastos médicos:</strong> Incluyen ambulancia, sala de emergencias, hospitalización, cirugías, rehabilitación, medicamentos y tratamiento futuro necesario. Estos suelen ser el componente más grande del reclamo.',
          '<strong>Salarios perdidos:</strong> Si no pudiste trabajar debido a las lesiones, puedes reclamar los ingresos que dejaste de percibir. Esto aplica <strong>incluso si te pagaban en efectivo</strong>, aunque la documentación de ingresos puede requerir declaraciones juradas u otra evidencia.',
          '<strong>Dolor y sufrimiento:</strong> Es una compensación por el dolor físico, estrés emocional, ansiedad, pérdida de calidad de vida y otras consecuencias no económicas de las lesiones.',
          '<strong>Daños a la propiedad:</strong> Cubre la reparación o reemplazo de tu vehículo y cualquier propiedad personal dañada en el accidente.'
        ],
        note: 'En Texas no hay límite específico para daños en casos de accidentes de auto (a diferencia de demandas contra el gobierno o casos de mala práctica médica). Sin embargo, los límites de la póliza de seguro del conductor culpable pueden limitar la recuperación si no tiene suficiente cobertura. Un abogado puede evaluar si existen otras fuentes de recuperación.'
      },
      immigration: {
        title: 'Cuándo el accidente puede afectar tu situación migratoria',
        subtitle: 'En la mayoría de los casos, un accidente simple no afecta inmigración',
        text: 'Esta es la pregunta que más preocupa a la comunidad: ¿puede un accidente de auto afectar mi caso de inmigración? La respuesta corta es que <strong>un accidente de auto normal, por sí solo, generalmente no tiene consecuencias migratorias</strong>. Sin embargo, hay situaciones específicas donde sí podría complicar las cosas.',
        list: [
          '<strong>DUI / Conducir bajo influencia:</strong> Si el accidente involucró alcohol o drogas, un cargo de DUI puede tener consecuencias migratorias graves, incluyendo la negación de buen carácter moral para naturalización, problemas con solicitudes de ajuste de estatus, e incluso ser considerado un factor negativo en casos de deportación.',
          '<strong>Hit-and-run (huir de la escena):</strong> Dejar la escena de un accidente es un delito que puede clasificarse como felonía si hay lesiones graves. Un cargo criminal de este tipo puede crear problemas serios en cualquier trámite migratorio.',
          '<strong>Uso de identidad falsa:</strong> Si al momento del accidente usaste una licencia falsa o un nombre falso, esto constituye fraude y puede ser una barra permanente para muchos beneficios migratorios bajo INA §212(a)(6)(C).',
          '<strong>Conducir sin licencia:</strong> En Texas, conducir sin licencia es una infracción menor. Por sí sola, generalmente no afecta casos migratorios. Sin embargo, si se combina con otros factores (como no tener seguro o no comparecer en corte), puede complicar el historial.'
        ],
        note: 'Si tuviste un accidente de auto simple sin DUI, sin huir, sin identidad falsa, y sin cargos criminales, el accidente en sí no debería afectar tu situación migratoria. Lo que sí puede crear problemas son las decisiones que tomes después del accidente.'
      },
      faq: {
        title: 'Preguntas Frecuentes',
        items: [
          {
            q: '¿La policía puede reportarme a ICE si llamo al 911 por un accidente?',
            a: 'En la gran mayoría de los casos, <strong>no</strong>. La policía local que responde a accidentes de tráfico generalmente no verifica estatus migratorio en la escena. En muchas ciudades de Texas existen políticas que separan la función policial de la aplicación de leyes de inmigración. Sin embargo, si tienes una orden de arresto federal pendiente o si ocurre otro delito en la escena, la situación podría ser diferente.'
          },
          {
            q: '¿Puedo demandar si el accidente fue parcialmente mi culpa?',
            a: 'En Texas, se aplica la regla de <strong>negligencia comparativa modificada</strong>. Esto significa que puedes recuperar compensación siempre y cuando tu culpa no exceda el 50%. Si eres 30% culpable y el otro conductor 70%, puedes recuperar el 70% de tus daños totales. Tu estatus migratorio no cambia esta regla.'
          },
          {
            q: '¿Puedo reclamar salarios perdidos si me pagaban en efectivo?',
            a: '<strong>Sí.</strong> Los salarios perdidos pueden documentarse con declaraciones juradas, testimonios de empleadores, registros bancarios, o cualquier otra evidencia que demuestre tus ingresos regulares. El hecho de que te pagaran en efectivo no elimina tu derecho a reclamar esos ingresos perdidos. Sin embargo, la documentación es más difícil y un abogado puede ayudar a presentar la evidencia correctamente.'
          },
          {
            q: '¿Cuánto tiempo tengo para presentar un reclamo en Texas?',
            a: 'En Texas, el <strong>estatuto de limitaciones</strong> para lesiones personales por accidente de auto es generalmente de <strong>2 años</strong> desde la fecha del accidente. Si no presentas tu reclamo o demanda dentro de ese plazo, pierdes tu derecho permanentemente. Es importante actuar rápido porque la evidencia se deteriora, los testigos olvidan detalles, y las aseguradoras se vuelven más difíciles con el tiempo.'
          },
          {
            q: '¿La aseguradora puede preguntarme por mi estatus migratorio?',
            a: 'La aseguradora puede intentar preguntarte cualquier cosa, pero <strong>tu estatus migratorio no es relevante</strong> para un reclamo de lesiones personales en Texas. No estás obligado a responder preguntas sobre tu estatus. Si la aseguradora insiste en preguntar sobre inmigración, es una señal de que están tratando de intimidarte. Un abogado puede manejar toda la comunicación con la aseguradora para protegerte.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusión',
        text: 'Si tuviste un accidente de auto y no tienes estatus migratorio, lo más importante es que sepas que tienes derechos y que esos derechos están protegidos por la ley. No dejes que el miedo te impida buscar atención médica, documentar el accidente, o reclamar la compensación que mereces. La ley EMTALA te protege en emergencias, las leyes de lesiones personales te permiten demandar compensación, y tu estatus migratorio no debería ser un obstáculo.',
        advice: 'Si estás lidiando con las consecuencias de un accidente de auto, consulta con un abogado que entienda tanto lesiones personales como inmigración. No firmes nada, no aceptes la primera oferta, y no dejes pasar el tiempo. Cada día cuenta para proteger tu caso y tu futuro.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'CMS – Emergency Medical Treatment and Labor Act (EMTALA)',
          'Texas Department of Insurance – Auto Insurance Claims Guide',
          'Texas Civil Practice & Remedies Code – Chapter 33: Proportionate Responsibility',
          'American Immigration Lawyers Association – Criminal Convictions and Immigration Consequences',
          'Texas Department of Transportation – Crash Reporting Requirements'
        ]
      }
    }
  },
  en: {
    metaTitle: 'Car Accident While Undocumented: Your Rights in Texas',
    metaDesc: 'Were you in a car accident without papers? Know your rights, what to do on day one, EMTALA protections, and when a crash could affect your immigration case.',
    ui: {
      back: 'Back to blog',
      share: 'Share article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '10 min read',
      tags: 'Car Accident & Rights',
      date: 'Apr 26, 2026',
      time: '10 min',
      authorRole: 'Founder & Lead Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'Car Accident While Undocumented: Your Rights, What to Do, and When It Could Affect Your Status',
    summary: {
      title: 'Initial Summary',
      text: 'If you were in a car accident and do not have legal immigration status, <strong>you have rights</strong>. Federal law requires hospitals to treat you in emergencies regardless of your status or ability to pay. You can claim compensation for your injuries, vehicle damage, and lost wages. But there are critical steps you must follow from day one, and mistakes that can destroy your legal case and even affect your immigration situation.'
    },
    intro: [
      'Every year, thousands of undocumented people in Texas and other states are involved in car accidents. Fear of immigration status causes many to avoid seeking medical attention, fail to report the accident, or accept unfair settlements from insurance companies.',
      'The legal reality is clear: <strong>your immigration status does not eliminate your rights</strong> as an accident victim. Personal injury laws protect every person present in the territory, regardless of whether they have a visa, green card, or no documents at all.',
      'This article explains step by step what to do after an accident, what legal protections exist, what mistakes to avoid, and when a car accident could have real immigration implications. The information focuses on Texas, but the general principles apply in most states.',
      'If your crash happened in Texas, our team of <a href="/en/abogado-accidentes-houston" class="text-[#B2904D] underline hover:text-white">Houston accident lawyers</a> and <a href="/en/abogado-accidentes-dallas" class="text-[#B2904D] underline hover:text-white">Dallas accident lawyers</a> can evaluate your case free of charge, in Spanish or English.',
      'Every case is different. <strong>This information is educational and does not replace consultation with an attorney.</strong>'
    ],
    sections: {
      youHaveRights: {
        title: 'Yes, You Have Rights After a Crash Even Without Status',
        subtitle: 'The law protects victims, it does not ask for papers',
        text: 'In the United States, the rights of a car accident victim do not depend on their immigration status. This is supported by multiple legal precedents and federal and state laws. If another person caused the accident, that person (or their insurer) is responsible for your damages, regardless of who you are.',
        list: [
          'You have the right to receive <strong>emergency medical care</strong> at any emergency room, regardless of your status or ability to pay (protected by the federal EMTALA law).',
          'You have the right to <strong>file an insurance claim</strong> against the at-fault driver or their insurer, just like anyone else.',
          'You have the right to <strong>personal injury compensation</strong>, including medical expenses, pain and suffering, lost wages, and property damage.',
          'Your immigration status is <strong>generally not admissible as evidence</strong> in a personal injury case in most states, including Texas.'
        ],
        note: 'The fact that you are undocumented does not give the other party or their insurance company the right to deny you fair compensation. If someone tells you otherwise, they are wrong or trying to take advantage of you.'
      },
      firstDay: {
        title: 'What to Do on the Day of the Accident',
        subtitle: 'The first steps are the most important',
        text: 'What you do in the first hours after the accident can determine the success or failure of your legal claim. Follow these steps in order, regardless of your immigration status. Your safety and your rights come first.',
        list: [
          '<strong>1. Call 911:</strong> Report the accident and request medical assistance if there are injuries. The police report is key evidence for your case. The police are not there to verify your immigration status; their function is to document the accident.',
          '<strong>2. Seek immediate medical attention:</strong> If you have pain, dizziness, difficulty breathing, or any symptoms, go to the hospital or accept the ambulance. Many serious injuries (such as internal or cervical injuries) do not show immediate symptoms. If you do not seek medical attention the same day, the insurance company will use it against you.',
          '<strong>3. Document everything with photos:</strong> Take photographs of the damaged vehicles, the accident scene, traffic signs, your visible injuries, and the other vehicle\'s license plates. These photos are evidence that can be worth thousands of dollars in your claim.',
          '<strong>4. Exchange information with the other driver:</strong> Get the other driver\'s name, phone number, license number, insurance company name, and policy number. Do not argue about who was at fault at that moment.',
          '<strong>5. Identify witnesses:</strong> If someone saw the accident, ask for their name and phone number. Witnesses can be decisive if the insurance company disputes fault.',
          '<strong>6. Do not sign anything from the other driver\'s insurance:</strong> The other person\'s insurance company may contact you quickly offering a settlement. Do not sign anything or give recorded statements without talking to an attorney first.'
        ],
        note: 'If the police arrive at the scene, answer their questions about the accident. In Texas, local police generally do not ask about immigration status at the scene of a traffic accident.'
      },
      whatNotToDo: {
        title: 'What NOT to Do After the Accident',
        subtitle: 'Mistakes that can destroy your case',
        text: 'Just as important as knowing what to do is knowing what NOT to do. These mistakes are the ones we most frequently see in people who lose their right to fair compensation or receive much less than they deserve.',
        list: [
          '<strong>Do not flee the scene:</strong> Leaving the accident scene is a crime (hit-and-run) that can have serious criminal consequences and would also destroy any insurance claim. If the police arrive and you are not there, you lose all credibility.',
          '<strong>Do not refuse medical attention:</strong> If you do not go to the doctor, the insurance company will argue that you were not really injured. Every day you go without treatment is a day the other party will use to minimize your case.',
          '<strong>Do not give recorded statements to the opposing insurer:</strong> Insurance adjusters are trained to obtain admissions that reduce the value of your claim. Anything you say can be used against you.',
          '<strong>Do not post about the accident on social media:</strong> Insurance companies check Facebook, Instagram, and other networks looking for evidence that your injuries are not as serious as you claim. A photo of you smiling can cost thousands of dollars in your case.',
          '<strong>Do not accept the first check they offer you:</strong> The insurance company\'s first offer is almost always much less than what your case is worth. Once you sign, you lose the right to claim more, even if you later discover additional injuries.',
          '<strong>Do not lie about anything:</strong> Do not invent injuries, do not exaggerate symptoms, do not say you were alone if there was someone else in the car. Lies are discovered and destroy the entire case.'
        ],
        warning: 'The worst mistake of all is doing nothing out of fear of your immigration status. Silence does not protect you; it leaves you without compensation and with medical debts.'
      },
      emergency: {
        title: 'Medical Care and the ER: What Federal Law (EMTALA) Protects',
        subtitle: 'Hospitals must treat you in emergencies without asking for papers',
        text: 'The federal law known as EMTALA (Emergency Medical Treatment and Labor Act) is one of the most important protections for any person in the United States, regardless of immigration status. This law was enacted in 1986 and applies to every hospital that receives Medicare funds, which includes virtually all emergency hospitals in the country.',
        list: [
          '<strong>Obligation to evaluate:</strong> Any person who arrives at an emergency room has the right to a medical screening to determine if they have an emergency condition, regardless of their ability to pay or immigration status.',
          '<strong>Obligation to stabilize:</strong> If the hospital determines you have a medical emergency, it must provide treatment to stabilize your condition before discharging or transferring you.',
          '<strong>Prohibition on asking about status:</strong> Hospitals cannot deny emergency care based on immigration status. Although they may ask for insurance or payment information, they cannot condition care on having documents.',
          '<strong>Transfers:</strong> If the hospital cannot treat your condition, it must transfer you to another facility that can, ensuring the transfer is medically safe.'
        ],
        note: 'EMTALA covers emergency care and stabilization. It does not cover ongoing treatment, specialists, or long-term rehabilitation. For those services, other options such as community clinics, hospital charity programs, or insurance claim compensation can help.'
      },
      insurance: {
        title: 'How Insurance Claims Work and Why It Changes by State',
        subtitle: 'The process varies depending on where the accident happens',
        text: 'The auto insurance system in the United States is not uniform. Each state has its own rules about who pays, how much can be claimed, and how cases are handled. In Texas, the system is "at-fault," meaning the person responsible for the accident (or their insurer) must pay for the damages.',
        list: [
          '<strong>Medical expenses:</strong> These include ambulance, emergency room, hospitalization, surgeries, rehabilitation, medications, and necessary future treatment. These are usually the largest component of the claim.',
          '<strong>Lost wages:</strong> If you could not work due to your injuries, you can claim the income you stopped earning. This applies <strong>even if you were paid in cash</strong>, although income documentation may require sworn statements or other evidence.',
          '<strong>Pain and suffering:</strong> This is compensation for physical pain, emotional stress, anxiety, loss of quality of life, and other non-economic consequences of the injuries.',
          '<strong>Property damage:</strong> This covers the repair or replacement of your vehicle and any personal property damaged in the accident.'
        ],
        note: 'In Texas there is no specific cap on damages in car accident cases (unlike lawsuits against the government or medical malpractice cases). However, the at-fault driver\'s insurance policy limits may limit recovery if they do not have enough coverage. An attorney can evaluate whether other sources of recovery exist.'
      },
      immigration: {
        title: 'When the Accident Can Affect Your Immigration Situation',
        subtitle: 'In most cases, a simple accident does not affect immigration',
        text: 'This is the question that most concerns the community: can a car accident affect my immigration case? The short answer is that <strong>a normal car accident, by itself, generally does not have immigration consequences</strong>. However, there are specific situations where it could complicate things.',
        list: [
          '<strong>DUI / Driving under the influence:</strong> If the accident involved alcohol or drugs, a DUI charge can have serious immigration consequences, including denial of good moral character for naturalization, problems with adjustment of status applications, and even being considered a negative factor in deportation cases.',
          '<strong>Hit-and-run (fleeing the scene):</strong> Leaving the scene of an accident is a crime that can be classified as a felony if there are serious injuries. A criminal charge of this type can create serious problems in any immigration process.',
          '<strong>Use of false identity:</strong> If at the time of the accident you used a fake license or a false name, this constitutes fraud and can be a permanent bar to many immigration benefits under INA §212(a)(6)(C).',
          '<strong>Driving without a license:</strong> In Texas, driving without a license is a minor offense. By itself, it generally does not affect immigration cases. However, if combined with other factors (such as not having insurance or failing to appear in court), it can complicate the record.'
        ],
        note: 'If you had a simple car accident without DUI, without fleeing, without false identity, and without criminal charges, the accident itself should not affect your immigration situation. What can create problems are the decisions you make after the accident.'
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'Can the police report me to ICE if I call 911 for an accident?',
            a: 'In the vast majority of cases, <strong>no</strong>. Local police responding to traffic accidents generally do not verify immigration status at the scene. In many Texas cities, there are policies that separate policing functions from immigration law enforcement. However, if you have a pending federal arrest warrant or another crime occurs at the scene, the situation could be different.'
          },
          {
            q: 'Can I sue if the accident was partially my fault?',
            a: 'In Texas, the <strong>modified comparative negligence</strong> rule applies. This means you can recover compensation as long as your fault does not exceed 50%. If you are 30% at fault and the other driver 70%, you can recover 70% of your total damages. Your immigration status does not change this rule.'
          },
          {
            q: 'Can I claim lost wages if I was paid in cash?',
            a: '<strong>Yes.</strong> Lost wages can be documented with sworn statements, employer testimony, bank records, or any other evidence demonstrating your regular income. The fact that you were paid in cash does not eliminate your right to claim those lost earnings. However, documentation is more difficult and an attorney can help present the evidence correctly.'
          },
          {
            q: 'How long do I have to file a claim in Texas?',
            a: 'In Texas, the <strong>statute of limitations</strong> for personal injury from a car accident is generally <strong>2 years</strong> from the date of the accident. If you do not file your claim or lawsuit within that period, you permanently lose your right. It is important to act quickly because evidence deteriorates, witnesses forget details, and insurance companies become more difficult over time.'
          },
          {
            q: 'Can the insurance company ask me about my immigration status?',
            a: 'The insurance company may try to ask you anything, but <strong>your immigration status is not relevant</strong> to a personal injury claim in Texas. You are not obligated to answer questions about your status. If the insurer insists on asking about immigration, it is a sign they are trying to intimidate you. An attorney can handle all communication with the insurance company to protect you.'
          }
        ]
      },
      conclusion: {
        title: 'Conclusion',
        text: 'If you were in a car accident and do not have immigration status, the most important thing is that you know you have rights and those rights are protected by law. Do not let fear prevent you from seeking medical attention, documenting the accident, or claiming the compensation you deserve. EMTALA protects you in emergencies, personal injury laws allow you to claim compensation, and your immigration status should not be an obstacle.',
        advice: 'If you are dealing with the aftermath of a car accident, consult with an attorney who understands both personal injury and immigration. Do not sign anything, do not accept the first offer, and do not let time pass. Every day counts to protect your case and your future.'
      },
      sources: {
        title: 'Sources Cited',
        list: [
          'CMS – Emergency Medical Treatment and Labor Act (EMTALA)',
          'Texas Department of Insurance – Auto Insurance Claims Guide',
          'Texas Civil Practice & Remedies Code – Chapter 33: Proportionate Responsibility',
          'American Immigration Lawyers Association – Criminal Convictions and Immigration Consequences',
          'Texas Department of Transportation – Crash Reporting Requirements'
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
    path: `/${lang}/blog/accidente-auto-indocumentado-derechos`,
    title: t.title,
    description: t.metaDesc,
    images: [{ url: IMAGES.article, alt: t.title }],
    type: 'article',
    publishedTime: '2026-04-26T08:00:00.000Z',
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
      tags: ['Accidente Auto', 'Indocumentado', 'Derechos', 'Lesiones Personales', 'EMTALA'],
    },
    twitter: social.twitter,
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/accidente-auto-indocumentado-derechos`,
      languages: {
        'es': `${SITE_URL}/es/blog/accidente-auto-indocumentado-derechos`,
        'en': `${SITE_URL}/en/blog/accidente-auto-indocumentado-derechos`,
        'x-default': `${SITE_URL}/es/blog/accidente-auto-indocumentado-derechos`,
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
    { name: t.title, url: `/${lang}/blog/accidente-auto-indocumentado-derechos` },
  ]);

  return (
    <>
      <BlogSchema
        title={blogContent[lang as 'es' | 'en']?.metaTitle || blogContent.es.metaTitle}
        description={blogContent[lang as 'es' | 'en']?.metaDesc || blogContent.es.metaDesc}
        slug="accidente-auto-indocumentado-derechos"
        date="2026-04-26"
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
        category="Lesiones Personales"
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
                     alt="Accidente de auto siendo indocumentado derechos"
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

                  {/* youHaveRights */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><ShieldCheck size={24} className="text-[#B2904D]" /></div>
                      {t.sections.youHaveRights.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.youHaveRights.subtitle}</p>
                    <p className="mb-4">{t.sections.youHaveRights.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.youHaveRights.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.youHaveRights.note}
                    </div>
                  </section>

                  {/* firstDay */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><FileText size={24} className="text-[#B2904D]" /></div>
                      {t.sections.firstDay.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.firstDay.subtitle}</p>
                    <p className="mb-4">{t.sections.firstDay.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.firstDay.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.firstDay.note}
                    </div>
                  </section>

                  {/* Imagen interior 1 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside1}
                       alt="Qué no hacer después de un accidente auto"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* whatNotToDo */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mb-2 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><AlertTriangle size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whatNotToDo.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.whatNotToDo.subtitle}</p>
                    <p className="mb-4">{t.sections.whatNotToDo.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.whatNotToDo.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 p-5 bg-red-500/10 rounded-xl border border-red-500/20">
                      <p className="text-red-400 font-bold m-0 flex items-start gap-2">
                        <AlertTriangle size={20} className="shrink-0 mt-1" />
                        {t.sections.whatNotToDo.warning}
                      </p>
                    </div>
                  </section>

                  {/* emergency */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Activity size={24} className="text-[#B2904D]" /></div>
                      {t.sections.emergency.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.emergency.subtitle}</p>
                    <p className="mb-4">{t.sections.emergency.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.emergency.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.emergency.note}
                    </div>
                  </section>

                  {/* Imagen interior 2 */}
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                     <Image
                       src={IMAGES.inside2}
                       alt="Reclamo de seguro accidente auto Texas"
                       fill
                       className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-20" />
                  </div>

                  {/* insurance */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><DollarSign size={24} className="text-[#B2904D]" /></div>
                      {t.sections.insurance.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.insurance.subtitle}</p>
                    <p className="mb-4">{t.sections.insurance.text}</p>
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.insurance.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.insurance.note}
                    </div>
                  </section>

                  {/* immigration */}
                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Globe size={24} className="text-[#B2904D]" /></div>
                      {t.sections.immigration.title}
                    </h2>
                    <p className="text-[#B2904D] font-medium mb-6 text-sm uppercase tracking-wider">{t.sections.immigration.subtitle}</p>
                    <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.sections.immigration.text }} />
                    <ul className="grid gap-3 mt-4 mb-6 list-none pl-0">
                      {t.sections.immigration.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <AlertCircle size={24} className="text-red-400 shrink-0 mt-1" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                      <AlertCircle size={16} className="inline mr-2" />
                      {t.sections.immigration.note}
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
            articles={getRelatedArticles('accidente-auto-indocumentado-derechos', (lang as 'es' | 'en') || 'es')}
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
