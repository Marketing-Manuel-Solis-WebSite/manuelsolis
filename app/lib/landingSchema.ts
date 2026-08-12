import 'server-only';
import { getPlaceData, type GooglePlaceData } from './googleReviews';
import { getOfficePlaceId } from './officesRegistry';
import { getPageData, SITE_URL } from './cityServiceData';
import { toSchemaPhone } from './officeSchema';

/**
 * Centralized builder for the per-landing LegalService schema.org payload,
 * usado por las 35 landings ciudad×servicio (`/[lang]/<slug>`).
 *
 * Reglas de esta entidad (la landing describe la MISMA oficina física que
 * /oficinas/<slug>, así que no puede contradecirla):
 *   - NAP: dirección y teléfono de `cityServiceData`, teléfono normalizado a
 *     E.164 con el mismo helper que usa officeSchema.
 *   - `geo`: solo el pin de la ficha GBP que devuelve Google Places para la
 *     oficina de esa ciudad. Si no hay placeId o la API falla, se OMITE — antes
 *     se emitían coordenadas propias que diferían kilómetros del pin publicado
 *     por la página de oficina.
 *   - `openingHoursSpecification`: solo si la llamada pasa horarios reales de
 *     esa oficina. El horario genérico que había aquí contradecía el de la
 *     ficha de oficina; mientras no exista una fuente única de NAP con horario
 *     por sucursal, la propiedad se omite en lugar de inventarse.
 *   - Sin `aggregateRating` ni `review`: las reseñas son de Google (terceros) y
 *     el rating ya lo emite el nodo #organization del layout en esta misma URL;
 *     duplicarlo por página lo convierte en dos entidades con el mismo rating.
 *
 * Mirrors the design of app/lib/officeSchema.ts:buildOfficeSchema.
 */

const ORG_ID = `${SITE_URL}/#organization`;
const ORG_NAME = 'Manuel Solis Law Firm';

export type LandingOpeningHours = {
  dayOfWeek: string | string[];
  opens: string;
  closes: string;
};

export type BuildLandingSchemaInput = {
  pageSlug: string;
  lang: 'es' | 'en';
  /**
   * Slug de la oficina física que atiende esta landing. Debe coincidir con una
   * clave de app/lib/officesRegistry.ts → OFFICES_PLACE_IDS: de su ficha de
   * Google se toma el pin (`geo`) para que la landing y /oficinas/<slug>
   * publiquen las mismas coordenadas.
   *
   * Si se omite (o la oficina no está en el registro / la API falla) el schema
   * se renderiza sin `geo`. Nunca se cae a datos hardcodeados.
   *
   * El nombre conserva el sufijo `ForReviews` porque las landings lo pasan
   * con esa clave; ya no alimenta reseñas ni rating.
   */
  officeSlugForReviews?: string;
  /**
   * Horario REAL de la oficina de esa ciudad. Sin este dato la propiedad se
   * omite: no hay valor por defecto, porque cualquier horario genérico
   * contradice el que publica /oficinas/<slug> para la misma dirección.
   */
  openingHours?: LandingOpeningHours[];
};

export async function buildLandingSchema(
  input: BuildLandingSchemaInput,
): Promise<Record<string, unknown>> {
  const data = getPageData(input.pageSlug);
  if (!data) {
    throw new Error(`buildLandingSchema: unknown pageSlug "${input.pageSlug}"`);
  }
  const { config, office, service } = data;

  const placeId = input.officeSlugForReviews
    ? getOfficePlaceId(input.officeSlugForReviews)
    : null;
  const placeData: GooglePlaceData | null = placeId
    ? await getPlaceData(placeId)
    : null;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    // @id estable y neutro de idioma para consolidar señales entre es/en.
    '@id': `${SITE_URL}/${input.pageSlug}#legalservice`,
    name: `Manuel Solis - ${service.title[input.lang]}`,
    description: config.metaDescription[input.lang],
    url: `${SITE_URL}/${input.lang}/${input.pageSlug}`,
    telephone: toSchemaPhone(office.phone),
    address: {
      '@type': 'PostalAddress',
      streetAddress: office.address.split(',')[0],
      // locality = ciudad postal real (Cicero/Pico Rivera/Arvada); city se
      // conserva para el copy y areaServed (mercado objetivo).
      addressLocality: office.locality ?? office.city,
      addressRegion: office.stateCode,
      postalCode: office.zip,
      addressCountry: 'US',
    },
    areaServed: { '@type': 'City', name: office.city },
    priceRange: '$$',
    parentOrganization: {
      '@type': 'LawFirm',
      '@id': ORG_ID,
      name: ORG_NAME,
    },
  };

  if (placeData?.location) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: placeData.location.lat,
      longitude: placeData.location.lng,
    };
  }

  if (input.openingHours?.length) {
    schema.openingHoursSpecification = input.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    }));
  }

  return schema;
}

/**
 * Map landing-page slug → office slug cuya ficha de Google aporta el pin
 * (`geo`) del schema. Verified against OFFICES_PLACE_IDS in
 * app/lib/officesRegistry.ts. Si una oficina no tiene placeId el schema se
 * emite sin `geo` (ver buildLandingSchema): nunca se cae a coordenadas
 * inventadas.
 *
 * Houston has multiple offices; the accidentes landing points at
 * `houston-accidentes` (the dedicated accident-injury location) while
 * the other Houston landings point at `houston-principal` (Navigation
 * Blvd, the main immigration office).
 */
export const LANDING_TO_OFFICE_FOR_REVIEWS: Readonly<Record<string, string>> = {
  // Immigration
  'abogado-inmigracion-houston':     'houston-principal',
  'abogado-inmigracion-dallas':      'dallas',
  'abogado-inmigracion-chicago':     'chicago',
  'abogado-inmigracion-los-angeles': 'losangeles',
  'abogado-inmigracion-el-paso':     'el-paso',
  'abogado-inmigracion-memphis':     'memphis',
  'abogado-inmigracion-denver':      'arvada',
  'abogado-inmigracion-harlingen':   'harlingen',
  // Accidents
  'abogado-accidentes-houston':      'houston-accidentes',
  'abogado-accidentes-dallas':       'dallas',
  // Deportation defense
  'defensa-deportacion-houston':     'houston-principal',
  'defensa-deportacion-dallas':      'dallas',
  'defensa-deportacion-chicago':     'chicago',
  'defensa-deportacion-los-angeles': 'losangeles',
  'defensa-deportacion-el-paso':     'el-paso',
  // U Visa
  'visa-u-houston':                  'houston-principal',
  'visa-u-chicago':                  'chicago',
  'visa-u-los-angeles':              'losangeles',
  'visa-u-dallas':                   'dallas',
  // Asylum
  'asilo-politico-houston':          'houston-principal',
  'asilo-politico-chicago':          'chicago',
  'asilo-politico-los-angeles':      'losangeles',
  // VAWA
  'vawa-houston':                    'houston-principal',
  'vawa-chicago':                    'chicago',
  'vawa-dallas':                     'dallas',
  // Ampliación de la matriz ciudad × servicio (2026-08-12). Solo ciudades con
  // bloque propio en CITY_LOCAL: de ahí salen la FAQ y los casos típicos, que es
  // lo que diferencia una landing de un duplicado.
  'vawa-memphis':                    'memphis',
  'vawa-denver':                     'arvada',
  'vawa-harlingen':                  'harlingen',
  'asilo-politico-dallas':           'dallas',
  'asilo-politico-memphis':          'memphis',
  'asilo-politico-denver':           'arvada',
  'asilo-politico-harlingen':        'harlingen',
  'vawa-los-angeles':                'losangeles',
  'vawa-el-paso':                    'el-paso',
  'asilo-politico-el-paso':          'el-paso',
} as const;
