import 'server-only';
import { getPlaceData, type GooglePlaceData } from './googleReviews';
import { getOfficePlaceId, isVirtualOffice } from './officesRegistry';

/**
 * Centralized builder for the per-office LegalService + Attorney
 * schema.org payload. Each office page.tsx used to inline its own
 * getLocalBusinessSchema() with ~50 lines of near-identical boiler-
 * plate; this helper consolidates the boilerplate so future schema
 * changes (e.g. adding `priceRange` variants, fixing a property
 * name) are one-file edits instead of fifteen.
 *
 * Google Places (cuando el slug está en OFFICES_PLACE_IDS y la API
 * responde) aporta dos datos verificables: el enlace al mapa (`hasMap`)
 * y el pin de la ficha GBP (`geo`). Ese pin es la MISMA fuente que
 * consume app/lib/landingSchema.ts, así una oficina no publica dos
 * coordenadas distintas según la plantilla. Sin API key se cae a las
 * coordenadas declaradas en la página.
 *
 * NO se emite `aggregateRating` ni `review`: las reseñas son contenido
 * de terceros (Google) y el rating no se renderiza en la página de
 * oficina, así que marcarlo sería self-serving markup. Si algún día se
 * muestra el rating en OfficeClient, puede volver con el valor vivo de
 * Places — nunca hardcodeado (riesgo legal: DISCOVERY_v3.md §1.1 #5).
 */

const SITE_URL = 'https://www.manuelsolis.com';
const ORG_NAME = 'Manuel Solis Law Firm';
const ORG_LOGO = `${SITE_URL}/logo-manuel-solis.png`;
const SAME_AS_BASE = [
  'https://www.facebook.com/AbogadoManuelSolisOficial/',
  'https://twitter.com/AbogadoMSolis',
];

export type OfficeOpeningHours = {
  dayOfWeek: string | string[];
  opens: string;
  closes: string;
};

/**
 * Normaliza a E.164 (`+1XXXXXXXXXX`) el teléfono que va al marcado. Las
 * fuentes mezclan formatos ("+1-713-701-1731" en las páginas de oficina,
 * "(713) 701-1731" en cityServiceData) y el mismo número tiene que
 * emitirse igual en las dos plantillas para que Google lo lea como un
 * único NAP. Si no reconoce el patrón US, devuelve el valor original.
 */
export function toSchemaPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return phone;
}

export type OfficeInfo = {
  /** Nombre por sucursal (ej. "Manuel Solis Law Firm - Harlingen"); mejora el match con la ficha GBP. */
  name?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  latitude: string;
  longitude: string;
  mapUrl?: string;
};

export type BuildOfficeSchemaInput = {
  slug: string;
  officeInfo: OfficeInfo;
  description: { es: string; en: string };
  openingHours?: OfficeOpeningHours[];
  /** Sobrescribe la base ['Spanish','English'] cuando una sede suma idiomas. */
  knowsLanguage?: string[];
};

export async function buildOfficeSchema(
  input: BuildOfficeSchemaInput,
  lang: 'es' | 'en',
): Promise<Record<string, unknown>> {
  const placeId = getOfficePlaceId(input.slug);
  const placeData: GooglePlaceData | null = placeId
    ? await getPlaceData(placeId)
    : null;

  const url = `${SITE_URL}/${lang}/oficinas/${input.slug}`;
  const virtual = isVirtualOffice(input.slug);

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'Attorney'],
    // @id neutro de idioma: es/en describen la MISMA oficina física.
    '@id': `${SITE_URL}/oficinas/${input.slug}#localbusiness`,
    name: input.officeInfo.name ?? ORG_NAME,
    description: lang === 'es' ? input.description.es : input.description.en,
    image: ORG_LOGO,
    url,
    telephone: toSchemaPhone(input.officeInfo.phone),
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: input.officeInfo.address,
      addressLocality: input.officeInfo.city,
      addressRegion: input.officeInfo.state,
      postalCode: input.officeInfo.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: placeData?.location?.lat ?? input.officeInfo.latitude,
      longitude: placeData?.location?.lng ?? input.officeInfo.longitude,
    },
    areaServed: { '@type': 'City', name: input.officeInfo.city },
    sameAs: SAME_AS_BASE,
    /**
     * Relación con el despacho.
     *
     * Sin esto cada oficina era una entidad suelta con dirección: quien lee el
     * schema veía quince negocios que se llaman parecido, no quince sedes de
     * uno. Es lo que permite atribuir a esta dirección los 35 años y los casos
     * ganados que declara #organization, en vez de dejarla sin historial.
     *
     * Se usa `parentOrganization` y no `branchOf` porque es la propiedad viva y
     * la que más consumidores entienden; las dos serían redundantes.
     */
    parentOrganization: {
      '@type': ['LegalService', 'LawFirm'],
      '@id': `${SITE_URL}/#organization`,
      name: ORG_NAME,
    },
    /**
     * Bilingüe en las quince sedes: es un hecho del despacho, no una promesa
     * por oficina, y es literalmente lo que se pregunta ("abogado de
     * inmigración que hable español"). Bellaire lo sobrescribe para añadir
     * chino — ver su page.tsx.
     */
    knowsLanguage: ['Spanish', 'English'],
  };

  const mapLink = input.officeInfo.mapUrl ?? placeData?.url;
  if (mapLink) schema.hasMap = mapLink;

  // Política de oficinas virtuales (ver officesRegistry.ts): una dirección
  // Regus/IWG solo se atiende con cita, así que no publica horario como si
  // fuera sede con personal en sitio.
  if (input.openingHours?.length && !virtual) {
    schema.openingHoursSpecification = input.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    }));
  }

  // Sustituye la base bilingüe de arriba. Solo lo usa Bellaire, que añade
  // chino; el resto se queda con Spanish/English.
  if (input.knowsLanguage?.length) {
    schema.knowsLanguage = input.knowsLanguage;
  }

  return schema;
}
