/**
 * Preguntas frecuentes por oficina, derivadas del registro NAP.
 *
 * Existen para resolver un problema medido, no por adorno: las 15 fichas de
 * /servicios/accidentes/oficinas/* comparten las secciones "Especialidades" y
 * "Proceso" palabra por palabra y solo se diferencian en la tarjeta de
 * contacto. Medido sobre el HTML prerenderizado (shingles de 6 palabras,
 * Jaccard, filtrando el boilerplate que aparece en más de la mitad de las
 * páginas del idioma), esas fichas salen entre 0.72 y 0.79 de similitud entre
 * sí. Eso es exactamente el patrón que Google llama "doorway pages": muchas
 * páginas casi iguales apuntadas a variantes locales de la misma búsqueda.
 *
 * La única cura real es contenido propio de cada oficina. Aquí se genera el que
 * SÍ se puede afirmar con verdad, porque sale de OFFICES_NAP: si atiende sin
 * cita o no, su horario, su zona horaria y su teléfono. Nada de esto se
 * inventa; cambiar un horario en officesPhoneMap cambia estas respuestas.
 *
 * Nota sobre el schema: FAQPage ya no genera resultados enriquecidos salvo
 * para sitios de gobierno y salud (Google lo restringió en agosto de 2023), así
 * que el valor de esto está en el texto —único por página y útil para quien
 * pregunta— y no en un adorno en la SERP.
 */

import {
  OFFICES_NAP,
  type OfficeNap,
  type OfficeNapSlug,
  type Weekday,
} from '../components/officesPhoneMap';

export type OfficeFaq = { q: string; a: string };

const DAY_NAMES: Record<'es' | 'en', Record<Weekday, string>> = {
  es: { 0: 'domingo', 1: 'lunes', 2: 'martes', 3: 'miércoles', 4: 'jueves', 5: 'viernes', 6: 'sábado' },
  en: { 0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday' },
};

/** Zonas horarias distintas de la de la sede: solo se mencionan si difieren. */
const TZ_LABEL: Record<string, { es: string; en: string } | undefined> = {
  'America/Denver': { es: 'hora de la montaña', en: 'Mountain time' },
  'America/Los_Angeles': { es: 'hora del Pacífico', en: 'Pacific time' },
};

/** Días cerrados, para poder decir explícitamente cuándo NO ir. */
function closedDays(nap: OfficeNap, lang: 'es' | 'en'): string[] {
  if (nap.hours.kind !== 'weekly') return [];
  const cerrados: string[] = [];
  for (const d of [0, 6] as Weekday[]) {
    if (!nap.hours.open[d]) cerrados.push(DAY_NAMES[lang][d]);
  }
  return cerrados;
}

function walkInFaq(nap: OfficeNap, lang: 'es' | 'en', zone: string): OfficeFaq {
  const name = nap.name[lang];
  const es = lang === 'es';
  const q = es
    ? `¿Puedo llegar sin cita a la oficina de ${zone}?`
    : `Can I walk into the ${zone} office without an appointment?`;

  if (nap.hours.kind === 'always') {
    return {
      q,
      a: es
        ? `Sí, a cualquier hora. ${name} es el centro de accidentes del despacho y abre las 24 horas, incluidos fines de semana. Si acaba de tener un accidente y está lesionado, atienda primero lo médico y llámenos al ${nap.phone} cuando pueda.`
        : `Yes, at any hour. ${name} is the firm's accident center and is open 24 hours, weekends included. If you have just been in an accident and you are injured, take care of the medical side first and call us at ${nap.phone} when you can.`,
    };
  }

  if (nap.hours.kind === 'appointment') {
    return {
      q,
      a: es
        ? `No. ${name} funciona con cita previa y no hay personal en el local, así que si se presenta sin avisar puede encontrarlo cerrado. Llame antes al ${nap.phone}: le confirman la cita en esta dirección o le indican la oficina con atención presencial más cercana.`
        : `No. ${name} works by appointment and has no staff on site, so if you drop in unannounced you may find it closed. Call ${nap.phone} first: they will confirm an appointment at this address or point you to the nearest office with walk-in service.`,
    };
  }

  const cerrados = closedDays(nap, lang);
  const cierre = cerrados.length
    ? es
      ? ` Los ${cerrados.join(' y ')} está cerrada.`
      : ` It is closed on ${cerrados.join(' and ')}.`
    : '';
  return {
    q,
    a: es
      ? `Sí, ${name} atiende sin cita dentro de su horario: ${nap.hours.label.es}.${cierre} Si va por un accidente, llamar antes al ${nap.phone} ayuda a que le reciban con el expediente ya abierto.`
      : `Yes, ${name} takes walk-ins during its opening hours: ${nap.hours.label.en}.${cierre} If your visit is about an accident, calling ${nap.phone} beforehand helps them receive you with your file already open.`,
  };
}

function hoursFaq(nap: OfficeNap, lang: 'es' | 'en'): OfficeFaq {
  const name = nap.name[lang];
  const es = lang === 'es';
  const tz = TZ_LABEL[nap.timeZone];
  const husoNota = tz
    ? es
      ? ` Ojo con el huso: ${nap.city} va en ${tz.es}, no en la hora de Houston.`
      : ` Mind the time zone: ${nap.city} runs on ${tz.en}, not Houston time.`
    : '';

  const q = es
    ? `¿Qué horario tiene la oficina de ${name}?`
    : `What are the ${name} office hours?`;

  // Repetir la etiqueta y nada más deja respuestas de veinte caracteres en las
  // oficinas cuyo horario no es una franja ("Abierto las 24 horas"). Cada tipo
  // de horario necesita su propia explicación, que además es distinta entre
  // oficinas y por tanto sirve al objetivo de diferenciarlas.
  if (nap.hours.kind === 'always') {
    return {
      q,
      a: es
        ? `${nap.hours.label.es}, todos los días. Es la única oficina del despacho que atiende de forma presencial a cualquier hora, así que es la referencia cuando el accidente acaba de pasar y no se puede esperar a mañana.`
        : `${nap.hours.label.en}, every day. It is the firm's only office with in-person service at any hour, so it is the one to use when the accident just happened and it cannot wait until morning.`,
    };
  }

  if (nap.hours.kind === 'appointment') {
    return {
      q,
      a: es
        ? `${nap.hours.label.es}. Es decir: el teléfono contesta a cualquier hora del día, pero la visita a esta dirección hay que concertarla antes porque no hay nadie en el local esperando.`
        : `${nap.hours.label.en}. In other words: the phone is answered at any hour, but a visit to this address has to be arranged in advance because nobody is waiting at the location.`,
    };
  }

  const sabado = nap.hours.open[6];
  const notaSabado = sabado
    ? es
      ? ` Sí abre los sábados, que suele ser el día que mejor le viene a quien trabaja de lunes a viernes.`
      : ` It does open on Saturdays, usually the easiest day for people who work Monday through Friday.`
    : es
      ? ` No abre fines de semana.`
      : ` It does not open on weekends.`;

  return {
    q,
    a: es ? `${nap.hours.label.es}.${notaSabado}${husoNota}` : `${nap.hours.label.en}.${notaSabado}${husoNota}`,
  };
}

function phoneFaq(nap: OfficeNap, lang: 'es' | 'en', zone: string): OfficeFaq {
  const es = lang === 'es';
  return {
    q: es
      ? `¿A qué número llamo para un accidente en ${zone}?`
      : `Which number do I call for an accident in ${zone}?`,
    a: es
      ? `El ${nap.phone} llega directamente a ${nap.name.es}, en ${nap.street}, ${nap.city}, ${nap.state} ${nap.zip}. Se atiende en español y en inglés, y la primera evaluación de un caso de accidente no tiene costo.`
      : `${nap.phone} reaches ${nap.name.en} directly, at ${nap.street}, ${nap.city}, ${nap.state} ${nap.zip}. We assist in Spanish and English, and the first evaluation of an accident case is free of charge.`,
  };
}

/**
 * Tres preguntas por oficina. El texto cambia con los datos de cada una —y en
 * el caso de las direcciones con cita previa cambia por completo—, que es
 * justamente el punto: que cada ficha deje de ser la misma página.
 *
 * `zone` es la zona fina de la ficha (`seoZone` de accidentesOfficesData: "Upper
 * Kirby, Houston", "Downtown Houston", "North Loop, Houston"…). Se pasa porque
 * cuatro de las direcciones con cita previa están todas en Houston y comparten
 * horario: sin el barrio, sus tres respuestas quedaban casi calcadas entre sí y
 * la duplicación no bajaba. El barrio es además la señal local que estas páginas
 * quieren, y sale de datos existentes.
 */
export function buildOfficeFaqs(slug: string, lang: 'es' | 'en', zone?: string): OfficeFaq[] {
  const nap = (OFFICES_NAP as Readonly<Record<string, OfficeNap>>)[slug as OfficeNapSlug];
  if (!nap) return [];
  return [
    walkInFaq(nap, lang, zone?.trim() || nap.name[lang]),
    hoursFaq(nap, lang),
    phoneFaq(nap, lang, zone?.trim() || nap.city),
  ];
}

/** FAQPage para el grafo de la página. Vacío si la oficina no está en el registro. */
export function buildOfficeFaqSchema(
  slug: string,
  lang: 'es' | 'en',
  pageUrl: string,
  zone?: string,
) {
  const faqs = buildOfficeFaqs(slug, lang, zone);
  if (faqs.length === 0) return null;
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
