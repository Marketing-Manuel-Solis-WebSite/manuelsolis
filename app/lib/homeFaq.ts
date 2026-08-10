import {
  OFFICES_NAP,
  OFFICE_NAP_SLUGS,
  DEFAULT_PHONE,
  WHATSAPP_DISPLAY,
} from '../components/officesPhoneMap';
import type { FaqPair } from './faqSchema';

/**
 * Preguntas frecuentes de la portada.
 *
 * Son **operativas, no jurídicas**, y eso es a propósito: qué casos se llevan,
 * en qué idioma se atiende, dónde hay oficina, cómo se cobra y cómo empezar.
 * Ninguna interpreta la ley ni promete un resultado, así que ninguna necesita
 * revisión de abogado para publicarse — a diferencia de lo que haría falta para
 * poner una FAQ jurídica en las páginas de servicio que hoy no la tienen.
 *
 * Los datos que pueden cambiar (número de oficinas, estados, teléfonos) se
 * derivan de OFFICES_NAP en vez de escribirse, por lo mismo que el resto del NAP
 * del sitio: la auditoría de agosto de 2026 encontró la misma dirección escrita
 * distinta en seis sitios, y una FAQ a mano sería el séptimo.
 *
 * ⚠️ La respuesta sobre costos dice lo que el sitio dice de verdad: la
 * evaluación sin costo y el cobro por contingencia son de **accidentes**. En
 * inmigración se cotiza por servicio. Escribir "consulta gratis" sin más sería
 * cómodo y falso, y ya provocó una respuesta equivocada del chat del sitio.
 */
export function buildHomeFaqs(lang: 'es' | 'en'): FaqPair[] {
  const es = lang === 'es';

  const totalOficinas = OFFICE_NAP_SLUGS.length;
  const estados = [...new Set(OFFICE_NAP_SLUGS.map((s) => OFFICES_NAP[s].state))];
  const ciudades = [...new Set(OFFICE_NAP_SLUGS.map((s) => OFFICES_NAP[s].city))];

  return [
    {
      q: es
        ? '¿Qué tipo de casos lleva el despacho?'
        : 'What kinds of cases does the firm handle?',
      a: es
        ? 'Inmigración —residencia, ciudadanía, asilo, VAWA, Visa U, visas de inversionista y peticiones familiares— y defensa contra la deportación. También accidentes y lesiones personales, reclamos de seguros y defensa criminal, que es importante porque un cargo criminal puede afectar directamente un caso migratorio.'
        : 'Immigration — residency, citizenship, asylum, VAWA, U visas, investor visas and family petitions — and deportation defense. Also accidents and personal injury, insurance claims and criminal defense, which matters because a criminal charge can directly affect an immigration case.',
    },
    {
      q: es
        ? '¿Atienden en español?'
        : 'Do you provide services in Spanish?',
      a: es
        ? `Sí, en las ${totalOficinas} oficinas. El despacho trabaja en español e inglés, y en la oficina de Bellaire también en chino. No hace falta traer intérprete ni pedir cita especial para ser atendido en español.`
        : `Yes, at all ${totalOficinas} offices. The firm works in Spanish and English, and the Bellaire office also in Chinese. You do not need to bring an interpreter or ask for a special appointment to be helped in Spanish.`,
    },
    {
      q: es
        ? '¿Dónde están las oficinas?'
        : 'Where are your offices?',
      a: es
        ? `Hay ${totalOficinas} oficinas en ${estados.length} estados: ${ciudades.join(', ')}. Varias de ellas están en el área de Houston, así que conviene mirar la lista de oficinas para elegir la que quede más cerca; algunas direcciones se atienden solo con cita previa y eso se indica en cada ficha.`
        : `There are ${totalOficinas} offices across ${estados.length} states: ${ciudades.join(', ')}. Several are in the Houston area, so it is worth checking the office list to pick the closest one; some addresses are by appointment only, and each office page says so.`,
    },
    {
      q: es
        ? '¿Cuánto cuesta consultar mi caso?'
        : 'How much does it cost to discuss my case?',
      a: es
        ? 'Depende del tipo de caso. En accidentes la evaluación no tiene costo y los honorarios son por contingencia: si no se recupera nada, no se cobran honorarios. Los casos de inmigración se cotizan según el trámite, y en la primera llamada se explica qué incluye antes de que usted decida.'
        : 'It depends on the type of case. For accidents the evaluation is free and fees are on contingency: if nothing is recovered, no attorney fees are charged. Immigration matters are quoted by the specific filing, and the first call explains what is included before you decide.',
    },
    {
      q: es
        ? '¿Pueden ayudarme si no tengo documentos?'
        : 'Can you help me if I do not have documents?',
      a: es
        ? 'Sí. Buena parte del trabajo del despacho es precisamente con personas sin estatus o con estatus vencido. Además, no tener documentos no le quita el derecho a reclamar por un accidente ni a que le paguen su trabajo: son cosas distintas, aunque a menudo se crea lo contrario.'
        : 'Yes. Much of the firm’s work is with people who have no status or whose status has expired. Also, not having documents does not take away your right to claim after an accident or to be paid for your work: those are separate matters, though many people believe otherwise.',
    },
    {
      q: es
        ? '¿Cómo sé que estoy hablando con el despacho y no con alguien que se hace pasar por él?'
        : 'How do I know I am dealing with the firm and not someone impersonating it?',
      a: es
        ? `Circulan personas y páginas que usan el nombre del despacho sin autorización. Las vías oficiales son este sitio, manuelsolis.com, el teléfono ${DEFAULT_PHONE} y el WhatsApp ${WHATSAPP_DISPLAY}. Ante cualquier duda, llame al número oficial antes de entregar dinero o documentos a nadie.`
        : `There are people and pages using the firm’s name without authorization. The official channels are this site, manuelsolis.com, the phone number ${DEFAULT_PHONE} and WhatsApp ${WHATSAPP_DISPLAY}. When in doubt, call the official number before handing money or documents to anyone.`,
    },
    {
      q: es
        ? '¿Cómo empiezo?'
        : 'How do I get started?',
      a: es
        ? `Llamando al ${DEFAULT_PHONE}, escribiendo por WhatsApp al ${WHATSAPP_DISPLAY} o dejando sus datos en el formulario de esta página. Ayuda mucho tener a mano cualquier documento que ya tenga del caso —notificaciones de corte, recibos de trámites anteriores, el reporte del accidente— aunque no es requisito para la primera conversación.`
        : `Call ${DEFAULT_PHONE}, message WhatsApp at ${WHATSAPP_DISPLAY}, or leave your details in the form on this page. It helps to have any paperwork you already have on hand — court notices, receipts from earlier filings, the accident report — though none of it is required for the first conversation.`,
    },
  ];
}
