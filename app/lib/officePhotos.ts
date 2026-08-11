import { OFFICES_NAP, type OfficeNapSlug } from '../components/officesPhoneMap';
import { LANDING_TO_OFFICE_FOR_REVIEWS } from './landingSchema';

/**
 * Foto real de cada sede, para usarla como imagen social.
 *
 * Existe porque 116 páginas compartían la misma `og:image` genérica: al
 * compartir el enlace de "Abogado de inmigración en Houston" por WhatsApp
 * —que es como circula de verdad entre esta clientela— salía la tarjeta del
 * despacho, indistinguible de las otras 115. La foto de la oficina de esa
 * ciudad dice algo que la genérica no: que hay una sede física ahí.
 *
 * Las rutas son las que ya usan las páginas de oficina, no unas nuevas: si
 * alguien cambia la foto de una sede, la tarjeta social cambia con ella.
 *
 * Nota sobre Houston: tres sedes (principal, accidentes y Bellaire) comparten
 * la misma foto del edificio en el propio sitio. Aquí se replica ese hecho en
 * lugar de inventar tres imágenes distintas.
 */
export const OFFICE_PHOTO_BY_SLUG: Readonly<Record<OfficeNapSlug, string>> = {
  'houston-principal': '/offices/Houston.png',
  'houston-accidentes': '/offices/Houston.png',
  'houston-bellaire': '/offices/Houston.png',
  kirby: '/offices/ofhouston.png',
  'main-st': '/offices/main.png',
  'north-loop': '/offices/ofLoop.png',
  northchase: '/offices/ofNorth.png',
  'league-city': '/offices/League.png',
  dallas: '/offices/Dallas.png',
  'el-paso': '/offices/el-paso.png',
  harlingen: '/offices/Harlingen.png',
  losangeles: '/offices/los-angeles.png',
  chicago: '/offices/Chicago.png',
  // Área de Chicago: la portada de cada una es la ENTRADA de su edificio, con
  // el número de la calle a la vista (10, 125 South Wacker, 1333, 1560). Se
  // eligió así porque estas cinco son direcciones dentro de centros de
  // negocios: lo que le sirve a quien va a una cita es reconocer el portal
  // desde la calle, no ver un interior que podría ser cualquiera.
  'chicago-martingale': '/offices/chicago-martingale.jpg',
  'chicago-prospect': '/offices/chicago-prospect.jpg',
  'chicago-wacker': '/offices/chicago-wacker.jpg',
  'chicago-burr-ridge': '/offices/chicago-burr-ridge.jpg',
  'chicago-wall': '/offices/chicago-wall.jpg',
  arvada: '/offices/Denver.png',
  memphis: '/offices/ofAirways.png',
};

/**
 * Imagen social de una landing de ciudad + servicio.
 *
 * Reutiliza el mapa landing→oficina que ya existe para las reseñas, así una
 * landing nueva hereda su foto sin tocar nada más. Devuelve null si la landing
 * no tiene sede asociada: antes que poner la foto de otra ciudad, se queda con
 * la imagen genérica.
 */
export function landingOgImage(
  landingSlug: string,
  lang: 'es' | 'en',
): { url: string; alt: string } | null {
  const officeSlug = LANDING_TO_OFFICE_FOR_REVIEWS[landingSlug] as OfficeNapSlug | undefined;
  if (!officeSlug) return null;
  const url = OFFICE_PHOTO_BY_SLUG[officeSlug];
  if (!url) return null;

  const nap = OFFICES_NAP[officeSlug];
  return {
    url,
    alt:
      lang === 'es'
        ? `Oficina de Manuel Solís en ${nap.city}, ${nap.state}`
        : `Manuel Solis office in ${nap.city}, ${nap.state}`,
  };
}

/** Foto de una sede por su slug, para las páginas de /oficinas. */
export function officeOgImage(
  officeSlug: string,
  lang: 'es' | 'en',
): { url: string; alt: string } | null {
  const url = OFFICE_PHOTO_BY_SLUG[officeSlug as OfficeNapSlug];
  if (!url) return null;
  const nap = OFFICES_NAP[officeSlug as OfficeNapSlug];
  return {
    url,
    alt:
      lang === 'es'
        ? `Oficina de Manuel Solís en ${nap.city}, ${nap.state}`
        : `Manuel Solis office in ${nap.city}, ${nap.state}`,
  };
}
