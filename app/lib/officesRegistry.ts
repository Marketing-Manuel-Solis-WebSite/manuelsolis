import 'server-only';

/**
 * Google Place IDs por slug de oficina.
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
