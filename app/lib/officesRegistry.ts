import 'server-only';

/**
 * Google Place IDs por slug de oficina.
 *
 * Este módulo es `server-only`, así que las islas cliente no pueden importarlo:
 * el NAP compartido (dirección, teléfono, horario estructurado, zona horaria y
 * enlace de mapa) vive en app/components/officesPhoneMap.ts → OFFICES_NAP, con
 * los mismos slugs que este registro.
 *
 * Source of truth para el sync con Google Places API (Fase 4 parcial).
 * Si una oficina no tiene placeId válido, simplemente omitir la entry —
 * el schema de esa oficina renderizará sin aggregateRating/review
 * (graceful fallback) sin romper el build.
 *
 * Los slugs deben coincidir EXACTAMENTE con los nombres de carpeta en
 * app/[lang]/oficinas/. Verificar con un ls antes de modificar.
 *
 * See DISCOVERY_v3.md §10.5 + Fase 4 parcial prompt.
 */
export const OFFICES_PLACE_IDS: Readonly<Record<string, string>> = {
  'houston-principal':  'ChIJaQljAiS8QIYR47Wqon6VsLo',
  'houston-bellaire':   'ChIJM8zmi1nCQIYRbCqQqM1ZVpw',
  'houston-accidentes': 'ChIJcWaLtle9QIYRevi9QwqESqg',
  'kirby':              'ChIJ6Tfpy6rBQIYRR14_1WwRNYs',
  'league-city':        'ChIJzbHqcnudQIYRCVyPjnmy0d4',
  'main-st':            'ChIJXx2j59O_QIYR019C2kVlIGg',
  'north-loop':         'ChIJ-_DxzPDHQIYRgXaZ4k13ZQ0',
  'northchase':         'ChIJ-_hX9rnJQIYR8mnRCeMOMBs',
  'dallas':             'ChIJS8sz5Y6ZToYRpCt7AviSKSs',
  'el-paso':            'ChIJo_QmqMRa54YRGvMqpNYfD1c',
  'harlingen':          'ChIJPR1wKR-Cb4YRcpf4p0CiN6c',
  'chicago':            'ChIJJ0d2AYczDogRrg7jc-23fOw',
  'losangeles':         'ChIJIb3goj7JwoARtuYr_Fb8ThU',
  'arvada':             'ChIJU6L4zqN4bIcREfiN8ltyi1M',
  'memphis':            'ChIJK_RRhsGHf4gRkT3D4gvjV9c',
} as const;

/**
 * Place ID que alimenta el aggregateRating del schema de Organization
 * a nivel firma (renderizado en app/[lang]/layout.tsx). Apunta a la
 * oficina histórica principal — Houston Principal.
 */
export const MAIN_FIRM_PLACE_ID = OFFICES_PLACE_IDS['houston-principal'];

export type OfficeSlug = keyof typeof OFFICES_PLACE_IDS;

/**
 * Lookup helper. Returns null when the slug is not in the registry,
 * letting callers render a schema without Google-derived fields
 * instead of throwing.
 */
export function getOfficePlaceId(slug: string): string | null {
  return OFFICES_PLACE_IDS[slug as OfficeSlug] ?? null;
}

/**
 * Oficinas que son DIRECCIONES VIRTUALES (centros de negocios Regus / IWG —
 * marcas Regus, HQ, Spaces; WeWork en el caso de Main St), no locales propios
 * del despacho. Verificado por investigación OSINT: Regus/Davinci listan estas
 * direcciones + suite como "virtual office" con manejo de correo y
 * contestación de llamadas, y cada edificio aloja decenas de empresas:
 *   - north-loop   → Regus "Brookhollow Central III", 2950 N Loop W, Ste 500
 *   - northchase   → Regus / HQ (IWG), 16510 Northchase Dr
 *   - main-st      → The Great Jones Building (WeWork/Spaces/Regus), 708 Main St
 *   - kirby        → Regus "River Oaks Tower", 3730 Kirby Dr, Ste 1200
 *   - league-city  → Regus, 2600 South Shore Blvd, Ste 300
 *
 * NOTA "con cita": el despacho SÍ atiende clientes en estas direcciones, pero
 * solo con cita previa (usa las salas/day-offices del centro de negocios); no
 * hay personal del despacho en sitio ni atención 24/7 — el "Abierto 24 horas"
 * publicado corresponde al enrutamiento del call-center central.
 *
 * El resto de oficinas son locales FÍSICOS con personal, incluidas las dos de
 * Navigation Blvd: houston-principal (6657, edificio propiedad de M. Solis) y
 * houston-accidentes (6705, edificio propio contiguo de la familia Solis).
 *
 * Úsalo para decidir el schema.org de cada página: una dirección virtual no
 * debería emitir openingHoursSpecification 24h ni aggregateRating/review como
 * si fuera una sede atendida (riesgo de Google Business Profile / NAP).
 */
export const VIRTUAL_OFFICE_SLUGS = [
  'north-loop',
  'northchase',
  'main-st',
  'kirby',
  'league-city',
] as const satisfies readonly OfficeSlug[];

/** true si el slug corresponde a una dirección de oficina virtual. */
export function isVirtualOffice(slug: string): boolean {
  return (VIRTUAL_OFFICE_SLUGS as readonly string[]).includes(slug);
}
