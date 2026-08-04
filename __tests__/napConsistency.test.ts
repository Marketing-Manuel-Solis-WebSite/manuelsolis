import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  OFFICES_NAP,
  OFFICE_NAP_SLUGS,
  officesPhoneMap,
  formatOfficeAddress,
  getOfficeOpenState,
  type OfficeNapSlug,
} from '../app/components/officesPhoneMap';
import { OFFICES_PLACE_IDS, VIRTUAL_OFFICE_SLUGS } from '../app/lib/officesRegistry';
import { accidentOffices } from '../app/[lang]/servicios/accidentes/accidentesOfficesData';

/**
 * Guardia de consistencia NAP (auditoría 2026-08-04, OFI-2).
 *
 * El nombre/dirección/teléfono/horario/mapa de cada oficina está replicado en
 * varias fuentes que ya divergieron entre sí. app/components/officesPhoneMap.ts
 * (OFFICES_NAP) es la fuente canónica: este test compara contra ella todas las
 * demás fuentes y falla listando cualquier divergencia nueva.
 *
 * Las fuentes que no se pueden importar (son componentes o páginas con imports
 * de Next) se leen como texto y se extraen sus literales; si un refactor cambia
 * la forma de esos objetos, la extracción falla en vez de pasar en silencio.
 */

const OFFICES_DIR = path.join(process.cwd(), 'app', '[lang]', 'oficinas');

type NapField = 'phone' | 'address' | 'hours.es' | 'hours.en' | 'mapLink';

interface Divergence {
  slug: string;
  field: NapField;
  source: string;
  canonical: string;
  found: string;
}

/**
 * Divergencias reales que este cambio NO puede resolver: viven en archivos
 * fuera de su alcance o requieren un dato de negocio que nadie ha confirmado.
 * Cada entrada dice qué falta. Al resolver una, bórrala de esta lista.
 */
const KNOWN_DIVERGENCES: ReadonlyArray<{
  slug: string;
  field: NapField;
  source: string;
  pending: string;
}> = [
  // Vacío a propósito: no hay divergencias toleradas. Una entrada aquí solo se
  // justifica mientras falte un dato de negocio para resolverla, y debe
  // desaparecer en cuanto ese dato llegue — si no, el test deja de proteger.
];

// --- NORMALIZADORES -------------------------------------------------------
// Comparan el dato, no su tipografía: "Texas"/"TX", "Suite"/"STE",
// "9:00 AM"/"9am" y el sufijo ", United States" son la misma información.

function deaccent(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function normPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  return digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
}

function normAddress(value: string): string {
  return deaccent(value)
    .toLowerCase()
    .replace(/,?\s*united states\.?\s*$/, '')
    .replace(/\btexas\b/g, 'tx')
    .replace(/\bsuite\b/g, 'ste')
    .replace(/\bbuilding\b/g, 'bldg')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function normHours(value: string): string {
  return deaccent(value)
    .toLowerCase()
    .replace(/\blas\b/g, ' ')
    .replace(/(\d{1,2}):00\b/g, '$1')
    .replace(/[^a-z0-9|]+/g, ' ')
    .replace(/\s+(am|pm)\b/g, '$1')
    .replace(/\s*\|\s*/g, '|')
    .replace(/\s+/g, ' ')
    .trim();
}

function normMapLink(value: string): string {
  return value.trim().replace(/\/+$/, '');
}

const NORMALIZERS: Record<NapField, (value: string) => string> = {
  phone: normPhone,
  address: normAddress,
  'hours.es': normHours,
  'hours.en': normHours,
  mapLink: normMapLink,
};

// --- EXTRACCIÓN DE LAS FUENTES NO IMPORTABLES -----------------------------

function readOfficeFile(slug: string, file: 'OfficeClient.tsx' | 'page.tsx'): string {
  return readFileSync(path.join(OFFICES_DIR, slug, file), 'utf8');
}

/** Recorta el literal que empieza en `declaration` hasta su cierre en columna 0. */
function objectLiteral(source: string, declaration: string, closing = '\n};'): string | null {
  const start = source.indexOf(declaration);
  if (start === -1) return null;
  const end = source.indexOf(closing, start);
  if (end === -1) return null;
  return source.slice(start, end);
}

function firstCapture(block: string, pattern: RegExp): string | null {
  return pattern.exec(block)?.[1] ?? null;
}

interface ExtractedNap {
  phone: string | null;
  address: string | null;
  mapLink: string | null;
  hoursEs?: string | null;
  hoursEn?: string | null;
}

/** officeData de app/[lang]/oficinas/<slug>/OfficeClient.tsx (lo que ve el usuario). */
function extractOfficeClient(slug: string): ExtractedNap | null {
  const block = objectLiteral(readOfficeFile(slug, 'OfficeClient.tsx'), 'const officeData');
  if (!block) return null;
  const hours = /\n\s*hours:\s*\{\s*es:\s*'([^']*)',\s*en:\s*'([^']*)'\s*\}/.exec(block);
  return {
    phone: firstCapture(block, /\n\s*phone:\s*'([^']*)'/),
    address: firstCapture(block, /\n\s*address:\s*'([^']*)'/),
    mapLink: firstCapture(block, /\n\s*mapLink:\s*'([^']*)'/),
    hoursEs: hours?.[1] ?? null,
    hoursEn: hours?.[2] ?? null,
  };
}

/** OFFICE_INFO de app/[lang]/oficinas/<slug>/page.tsx (lo que ve Google). */
function extractOfficeSchema(slug: string): ExtractedNap | null {
  const block = objectLiteral(readOfficeFile(slug, 'page.tsx'), 'const OFFICE_INFO');
  if (!block) return null;
  const street = firstCapture(block, /\n\s*address:\s*"([^"]*)"/);
  const city = firstCapture(block, /\n\s*city:\s*"([^"]*)"/);
  const state = firstCapture(block, /\n\s*state:\s*"([^"]*)"/);
  const zip = firstCapture(block, /\n\s*zip:\s*"([^"]*)"/);
  return {
    phone: firstCapture(block, /\n\s*phone:\s*"([^"]*)"/),
    address: street && city && state && zip ? `${street}, ${city}, ${state} ${zip}` : null,
    mapLink: firstCapture(block, /\n\s*mapUrl:\s*"([^"]*)"/),
  };
}

// --- RECOLECCIÓN DE DIVERGENCIAS ------------------------------------------

function compare(
  slug: string,
  source: string,
  field: NapField,
  canonical: string,
  found: string | null | undefined,
  into: Divergence[],
): void {
  if (found === null || found === undefined) {
    into.push({ slug, field, source, canonical, found: '(no encontrado)' });
    return;
  }
  const normalize = NORMALIZERS[field];
  if (normalize(canonical) !== normalize(found)) {
    into.push({ slug, field, source, canonical, found });
  }
}

function collectDivergences(): Divergence[] {
  const found: Divergence[] = [];

  for (const slug of OFFICE_NAP_SLUGS) {
    const nap = OFFICES_NAP[slug];
    const address = formatOfficeAddress(nap);

    // 1. officesPhoneMap (Header, MobileStickyBar, landings ciudad-servicio).
    compare(slug, 'officesPhoneMap', 'phone', nap.phone, officesPhoneMap[slug], found);

    // 2. accidentesOfficesData (/servicios/accidentes y sus 15 páginas por oficina).
    const accident = accidentOffices.find((office) => office.id === slug);
    if (!accident) {
      found.push({
        slug,
        field: 'address',
        source: 'accidentesOfficesData',
        canonical: address,
        found: '(oficina ausente)',
      });
    } else {
      compare(slug, 'accidentesOfficesData', 'phone', nap.phone, accident.phone, found);
      compare(slug, 'accidentesOfficesData', 'address', address, accident.address, found);
      compare(slug, 'accidentesOfficesData', 'hours.es', nap.hours.label.es, accident.hours.es, found);
      compare(slug, 'accidentesOfficesData', 'hours.en', nap.hours.label.en, accident.hours.en, found);
      compare(slug, 'accidentesOfficesData', 'mapLink', nap.mapLink, accident.mapLink, found);
    }

    // 3. OfficeClient.tsx (ficha visible de /oficinas/[slug]).
    const client = extractOfficeClient(slug);
    expect(client, `no se pudo leer officeData de ${slug}/OfficeClient.tsx`).not.toBeNull();
    if (client) {
      compare(slug, 'OfficeClient', 'phone', nap.phone, client.phone, found);
      compare(slug, 'OfficeClient', 'address', address, client.address, found);
      compare(slug, 'OfficeClient', 'hours.es', nap.hours.label.es, client.hoursEs, found);
      compare(slug, 'OfficeClient', 'hours.en', nap.hours.label.en, client.hoursEn, found);
      compare(slug, 'OfficeClient', 'mapLink', nap.mapLink, client.mapLink, found);
    }

    // 4. OFFICE_INFO de page.tsx (schema LocalBusiness; sin horario en texto).
    const schema = extractOfficeSchema(slug);
    expect(schema, `no se pudo leer OFFICE_INFO de ${slug}/page.tsx`).not.toBeNull();
    if (schema) {
      compare(slug, 'officeSchema', 'phone', nap.phone, schema.phone, found);
      compare(slug, 'officeSchema', 'address', address, schema.address, found);
      compare(slug, 'officeSchema', 'mapLink', nap.mapLink, schema.mapLink, found);
    }
  }

  return found;
}

function isKnown(divergence: Divergence): boolean {
  return KNOWN_DIVERGENCES.some(
    (known) =>
      known.slug === divergence.slug &&
      known.field === divergence.field &&
      known.source === divergence.source,
  );
}

function describeDivergence(divergence: Divergence): string {
  return `${divergence.slug} · ${divergence.field} · ${divergence.source}: esperado ${JSON.stringify(
    divergence.canonical,
  )}, encontrado ${JSON.stringify(divergence.found)}`;
}

describe('NAP de oficinas — fuente única', () => {
  it('cubre exactamente los slugs registrados en officesRegistry', () => {
    expect([...OFFICE_NAP_SLUGS].sort()).toEqual(Object.keys(OFFICES_PLACE_IDS).sort());
  });

  it('officesPhoneMap se deriva del registro NAP', () => {
    expect(Object.keys(officesPhoneMap).sort()).toEqual([...OFFICE_NAP_SLUGS].sort());
    for (const slug of OFFICE_NAP_SLUGS) {
      expect(officesPhoneMap[slug]).toBe(OFFICES_NAP[slug].phone);
    }
  });

  it('los teléfonos usan el formato (XXX) XXX-XXXX', () => {
    for (const slug of OFFICE_NAP_SLUGS) {
      expect(OFFICES_NAP[slug].phone, slug).toMatch(/^\(\d{3}\) \d{3}-\d{4}$/);
    }
  });

  it('el índice /oficinas agrupa cada oficina una sola vez', () => {
    const block = objectLiteral(
      readFileSync(path.join(OFFICES_DIR, 'page.tsx'), 'utf8'),
      'const OFFICE_GROUPS',
      '\n];',
    );
    expect(block, 'no se pudo leer OFFICE_GROUPS del índice /oficinas').not.toBeNull();
    for (const slug of OFFICE_NAP_SLUGS) {
      const occurrences = (block ?? '').split(`'${slug}'`).length - 1;
      expect(occurrences, `${slug} aparece ${occurrences} veces en OFFICE_GROUPS`).toBe(1);
    }
  });

  it('las oficinas de solo cita son exactamente las direcciones virtuales', () => {
    const appointmentOnly = OFFICE_NAP_SLUGS.filter(
      (slug) => OFFICES_NAP[slug].hours.kind === 'appointment',
    );
    expect(appointmentOnly.sort()).toEqual([...VIRTUAL_OFFICE_SLUGS].sort());
  });

  it('no hay divergencias de NAP entre las fuentes salvo las documentadas', () => {
    const divergences = collectDivergences();
    const unexpected = divergences.filter((d) => !isKnown(d)).map(describeDivergence);

    const resolved = KNOWN_DIVERGENCES.filter(
      (known) =>
        !divergences.some(
          (d) => d.slug === known.slug && d.field === known.field && d.source === known.source,
        ),
    );
    if (resolved.length > 0) {
      console.warn(
        'KNOWN_DIVERGENCES contiene entradas ya resueltas; bórralas de napConsistency.test.ts:\n' +
          resolved.map((r) => `  - ${r.slug} · ${r.field} · ${r.source}`).join('\n'),
      );
    }

    expect(unexpected).toEqual([]);
  });
});

describe('Estado operativo por oficina (OFI-5)', () => {
  // Miércoles 15:00 UTC = 10:00 Central, 09:00 Montaña, 08:00 Pacífico.
  const WEEKDAY_MORNING = new Date('2026-08-05T15:00:00Z');
  // Sábado y domingo a la misma hora Central.
  const SATURDAY_MORNING = new Date('2026-08-08T15:00:00Z');
  const SUNDAY_MORNING = new Date('2026-08-09T15:00:00Z');

  it('cada oficina declara una zona horaria IANA válida', () => {
    for (const slug of OFFICE_NAP_SLUGS) {
      const { timeZone } = OFFICES_NAP[slug];
      expect(() => new Intl.DateTimeFormat('en-US', { timeZone }), slug).not.toThrow();
      expect(timeZone, slug).toMatch(/^America\//);
    }
  });

  it('el estado se resuelve en la zona horaria de la oficina, no del visitante', () => {
    // Mismo instante: Houston y El Paso ya abrieron, Los Ángeles todavía no.
    expect(getOfficeOpenState('houston-principal', WEEKDAY_MORNING)).toBe('open');
    expect(getOfficeOpenState('el-paso', WEEKDAY_MORNING)).toBe('open');
    expect(getOfficeOpenState('arvada', WEEKDAY_MORNING)).toBe('open');
    expect(getOfficeOpenState('losangeles', WEEKDAY_MORNING)).toBe('closed');
  });

  it('respeta los días sin horario de cada oficina', () => {
    expect(getOfficeOpenState('houston-principal', SATURDAY_MORNING)).toBe('open');
    expect(getOfficeOpenState('harlingen', SATURDAY_MORNING)).toBe('closed');
    expect(getOfficeOpenState('houston-principal', SUNDAY_MORNING)).toBe('closed');
  });

  it('no inventa estado para las direcciones virtuales ni para el centro 24 h', () => {
    for (const slug of VIRTUAL_OFFICE_SLUGS) {
      expect(getOfficeOpenState(slug, SUNDAY_MORNING), slug).toBe('appointment');
    }
    expect(getOfficeOpenState('houston-accidentes', SUNDAY_MORNING)).toBe('always-open');
  });

  it('devuelve null para un slug desconocido', () => {
    expect(getOfficeOpenState('oficina-que-no-existe', WEEKDAY_MORNING)).toBeNull();
  });
});

describe('Enlaces de mapa', () => {
  it('todas las oficinas apuntan a una URL de Google y sin duplicar el pin de otra', () => {
    const seen = new Map<string, OfficeNapSlug>();
    for (const slug of OFFICE_NAP_SLUGS) {
      const { mapLink } = OFFICES_NAP[slug];
      expect(mapLink, slug).toMatch(/^https:\/\/(share\.google|www\.google\.com)\//);
      const previous = seen.get(mapLink);
      expect(previous, `${slug} comparte el enlace de mapa con ${previous}`).toBeUndefined();
      seen.set(mapLink, slug);
    }
  });
});
