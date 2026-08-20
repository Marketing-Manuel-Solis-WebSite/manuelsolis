import 'server-only';
import { getPlaceData, type GooglePlaceData } from './googleReviews';
import { getOfficePlaceId } from './officesRegistry';
import { getPageData, SITE_URL } from './cityServiceData';
import { toSchemaPhone } from './officeSchema';
import { ORG_REF } from './schemaOrg';

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
 *     describen a la propia firma, así que marcarlas aquí junta reagregación de
 *     un tercero y reseña auto-referida. Desde 2026-08 NINGUNA página del sitio
 *     las marca —/testimonios era la última y se retiró—, y
 *     __tests__/schemaRatingPolicy.test.ts falla si vuelven.
 *
 * Mirrors the design of app/lib/officeSchema.ts:buildOfficeSchema.
 */

// ORG_ID / ORG_NAME locales eliminados: la referencia a la firma es ORG_REF y
// vive en app/lib/schemaOrg.ts, para que los cinco sitios que la emitían no
// puedan volver a divergir.

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
    /**
     * @id estable y neutro de idioma: /es y /en describen el MISMO servicio en
     * la misma ciudad, no dos negocios.
     *
     * `url` tiene que ser igualmente neutra, y antes no lo era. Con un `@id`
     * compartido y una `url` localizada, las dos versiones de la página
     * emitían el mismo nodo con valores distintos de `url` — la auditoría de
     * schema de 2026-08 lo listó en 110 URLs. Se resuelve apuntando siempre al
     * locale canónico del sitio, que es el mismo que declara el `x-default` de
     * hreflang (`/es`). El `<link rel="canonical">` de cada documento sigue
     * siendo el suyo: esta propiedad describe el servicio, no el documento.
     */
    '@id': `${SITE_URL}/${input.pageSlug}#legalservice`,
    name: `Manuel Solis - ${service.title[input.lang]}`,
    description: config.metaDescription[input.lang],
    url: `${SITE_URL}/es/${input.pageSlug}`,
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
    // Referencia por @id pelado — ver app/lib/schemaOrg.ts.
    parentOrganization: ORG_REF,
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
