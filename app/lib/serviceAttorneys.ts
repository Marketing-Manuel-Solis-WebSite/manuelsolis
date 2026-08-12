import { attorneys, getText, type Attorney } from './attorneyData';

/**
 * Abogados que se muestran en cada página de servicio.
 *
 * El emparejamiento es ESTRICTO: solo entra un abogado cuyo propio
 * `practice.topics` declare el área. attorneyData ya lo advierte —«en YMYL legal
 * es incorrecto atribuir a un litigante civil un área que no ejerce»— y ese
 * criterio manda aquí también: la señal de E-E-A-T solo vale si es cierta.
 *
 * Consecuencia buscada: **cuatro servicios se quedan sin bloque.** Ningún
 * abogado declara asilo, VAWA, Visa U ni visas de inversionista como su área, y
 * poner ahí al primer abogado de inmigración que aparezca sería exactamente la
 * atribución falsa que se quiere evitar. Un hueco es más honesto que un nombre
 * mal puesto, y cuando alguien declare esas áreas el bloque aparece solo.
 *
 * No se emite un `Person` nuevo en la página de servicio: la entidad de cada
 * abogado vive en su perfil con su propio `@id`, y duplicarla aquí crearía dos
 * entidades compitiendo por la misma persona. Lo que se publica es el enlace al
 * perfil, que es la relación que Google sigue.
 */

/** Servicio → temas que un abogado debe declarar para aparecer en él. */
const SERVICE_TOPICS: Readonly<Record<string, readonly string[]>> = {
  inmigracion: ['Immigration Law'],
  'defensa-deportacion': ['Deportation Defense'],
  familia: ['Family-Based Immigration'],
  accidentes: ['Personal Injury Law', 'Catastrophic Injury Law', 'Maritime Law'],
  seguros: ['Insurance Litigation'],
  'ley-criminal': ['Criminal Defense'],
  // asilo, vawa, visa-u y visa-e2 no figuran a propósito: ver el docblock.
};

/** Cuántos caben en el bloque sin convertirlo en un segundo directorio. */
const MAX_POR_SERVICIO = 3;

export type ServiceAttorney = {
  id: string;
  name: string;
  image: string;
  /** Área que la propia bio declara; si no hay, el cargo genérico. */
  role: string;
  /** Primera credencial declarada (colegiación o título). */
  credential: string | null;
  quote: string;
};

export function getServiceAttorneys(
  service: string,
  lang: 'es' | 'en',
): ServiceAttorney[] {
  const topics = SERVICE_TOPICS[service];
  if (!topics) return [];

  const coincide = (a: Attorney) =>
    a.practice?.topics.some((t) => topics.includes(t)) ?? false;

  return attorneys
    .filter(coincide)
    .slice(0, MAX_POR_SERVICIO)
    .map((a) => ({
      id: a.id,
      name: a.name,
      image: a.image,
      // La etiqueta del área declarada dice más que "Abogado", y es la que su
      // propio perfil usa como título.
      role: a.practice ? a.practice.label[lang] : a.role[lang],
      credential: a.admissions.length ? getText(a.admissions[0], lang) : null,
      quote: a.quote[lang],
    }));
}

/** true si este servicio muestra bloque de abogados. Para no renderizar el título vacío. */
export function hasServiceAttorneys(service: string): boolean {
  return getServiceAttorneys(service, 'es').length > 0;
}
