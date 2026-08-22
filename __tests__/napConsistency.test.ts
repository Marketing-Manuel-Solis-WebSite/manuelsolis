import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  OFFICES_NAP,
  OFFICE_NAP_SLUGS,
  APPOINTMENT_OFFICE_SLUGS,
  SATELLITE_OFFICE_SLUGS,
  PHYSICAL_OFFICE_COUNT,
  isWalkInOffice,
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

    // 2. accidentesOfficesData (/servicios/accidentes y sus páginas por oficina).
    //
    // No todas las oficinas tienen ficha de accidentes, y es deliberado: ese
    // grupo era un cúmulo de casi-duplicados del que hubo que retirar del índice
    // las cinco direcciones virtuales de Houston. Las cinco nuevas de Chicago no
    // entran para no volver a crearlo. Cuáles quedan fuera se fija más abajo, en
    // su propio test, para que nadie retire una por descuido.
    const accident = accidentOffices.find((office) => office.id === slug);
    if (!accident) {
      if (!SIN_FICHA_DE_ACCIDENTES.has(slug)) {
        found.push({
          slug,
          field: 'address',
          source: 'accidentesOfficesData',
          canonical: address,
          found: '(oficina ausente)',
        });
      }
    } else {
      compare(slug, 'accidentesOfficesData', 'phone', nap.phone, accident.phone, found);
      compare(slug, 'accidentesOfficesData', 'address', address, accident.address, found);
      compare(slug, 'accidentesOfficesData', 'hours.es', nap.hours.label.es, accident.hours.es, found);
      compare(slug, 'accidentesOfficesData', 'hours.en', nap.hours.label.en, accident.hours.en, found);
      compare(slug, 'accidentesOfficesData', 'mapLink', nap.mapLink, accident.mapLink, found);
    }

    // Las oficinas nuevas no COPIAN el NAP: lo leen con getOfficeNap(SLUG), así
    // que no hay literales que puedan divergir y no hay nada que comparar.
    //
    // Este test nació porque las páginas antiguas repiten dirección, teléfono,
    // horario y mapa en tres archivos cada una, y esas copias se
    // desincronizaban. Una página derivada no puede desincronizarse: exigirle un
    // OFFICE_INFO literal sería premiar el patrón que causó el problema.
    if (derivaDelNap(slug)) continue;

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

/**
 * Oficinas que a propósito NO tienen página de accidentes por sede.
 *
 * Las cinco direcciones nuevas del área de Chicago. El grupo de fichas de
 * accidentes era el cúmulo de casi-duplicados más persistente del sitio —
 * midió hasta 0,79 de similitud entre sí— y de él ya se retiraron del índice
 * las cinco virtuales de Houston. Añadir cinco más lo reconstruiría.
 */
const SIN_FICHA_DE_ACCIDENTES = new Set<string>([
  'chicago-martingale',
  'chicago-prospect',
  'chicago-wacker',
  'chicago-burr-ridge',
  'chicago-wall',
]);

/**
 * true si la página de esa oficina lee el NAP en vez de copiarlo.
 *
 * Se comprueba en los DOS archivos: si uno derivara y el otro copiara, la copia
 * seguiría pudiendo divergir y hay que seguir vigilándola.
 */
function derivaDelNap(slug: string): boolean {
  const dir = path.join(OFFICES_DIR, slug);
  const page = readFileSync(path.join(dir, 'page.tsx'), 'utf8');
  const client = readFileSync(path.join(dir, 'OfficeClient.tsx'), 'utf8');
  return page.includes('getOfficeNap(SLUG)') && client.includes('getOfficeNap(SLUG)');
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
  it('toda ficha de Google apunta a una oficina que existe en el NAP', () => {
    // La comprobación va en ESTA dirección y no al revés.
    //
    // Antes exigía igualdad entre los dos conjuntos, lo que imponía una regla
    // implícita y equivocada: que una oficina no podía existir sin ficha de
    // Google. Al dar de alta las cinco direcciones del área de Chicago —sin GBP
    // todavía— no habrían podido declararse sin inventarles un placeId.
    //
    // Lo que sí es un error es lo contrario: un placeId apuntando a un slug que
    // no existe en el NAP significa que alguien renombró o retiró una oficina y
    // dejó la ficha huérfana, y eso sí se caza aquí.
    for (const slug of Object.keys(OFFICES_PLACE_IDS)) {
      expect(
        (OFFICE_NAP_SLUGS as readonly string[]).includes(slug),
        `${slug} tiene ficha de Google pero no existe en OFFICES_NAP`,
      ).toBe(true);
    }
  });

  it('las oficinas sin ficha de Google son solo las altas recientes', () => {
    // No es un requisito técnico: es un recordatorio. Cuando marketing cree la
    // ficha de una de estas, este test falla y obliga a quitarla de la lista, que
    // es la forma de no olvidarse de que quedaron pendientes.
    const sinFicha = OFFICE_NAP_SLUGS.filter((slug) => !(slug in OFFICES_PLACE_IDS)).sort();
    expect(sinFicha).toEqual([
      'chicago-burr-ridge',
      'chicago-martingale',
      'chicago-prospect',
      'chicago-wacker',
      'chicago-wall',
    ]);
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

  it('ningún conteo de oficinas está escrito a mano en el copy', () => {
    /**
     * El rollout a 20 sedes dejó tres cifras contradictorias en el sitio a la
     * vez: la meta de /servicios/inmigracion decía 10, sus tarjetas decían 15
     * (por `.length` de una lista local) y el menú listaba 20. Ninguna prueba
     * fallaba, porque cada número era correcto en su propio archivo.
     *
     * Esta guarda prohíbe la causa, no los síntomas: un número de oficinas
     * literal en el copy. Todos deben derivarse de OFFICE_NAP_SLUGS o de
     * PHYSICAL_OFFICE_COUNT.
     */
    const dirs = [
      path.join(process.cwd(), 'app', 'components'),
      path.join(process.cwd(), 'app', '[lang]'),
      path.join(process.cwd(), 'app', 'llms.txt'),
    ];

    const archivos: string[] = [];
    const recorrer = (dir: string) => {
      for (const e of readdirSync(dir, { withFileTypes: true })) {
        const f = path.join(dir, e.name);
        if (e.isDirectory()) recorrer(f);
        else if (/\.(ts|tsx)$/.test(e.name)) archivos.push(f);
      }
    };
    for (const d of dirs) recorrer(d);

    // Cifra pegada a la palabra "oficina(s)"/"office(s)" en texto, no en clases
    // de CSS ni en comentarios.
    const PROHIBIDO = /['"`][^'"`]*\b(1[0-9]|2[0-9])\s+(oficinas?|offices?)\b/i;
    const culpables: string[] = [];

    for (const f of archivos) {
      // Los comentarios de bloque se quitan del archivo COMPLETO, no línea a
      // línea: un JSDoc que explique "antes decía 15 oficinas" es documentación,
      // no copy, y línea a línea se contaba como infracción. Se reemplazan por
      // saltos de línea para que los números de línea sigan cuadrando.
      const src = readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, (m) =>
        m.replace(/[^\n]/g, ' '),
      );
      src.split('\n').forEach((linea, i) => {
        const limpia = linea.replace(/\/\/.*$/, '');
        if (PROHIBIDO.test(limpia)) {
          culpables.push(`${path.relative(process.cwd(), f)}:${i + 1}`);
        }
      });
    }

    expect(
      culpables,
      `conteo de oficinas escrito a mano (derivarlo del NAP): ${culpables.join(', ')}`,
    ).toEqual([]);
  });

  it('el explorador de la portada lista TODAS las oficinas', () => {
    // OfficesExplorer lleva su lista a mano (necesita foto, título y servicios
    // por oficina, que no están en el NAP). Por eso las cinco altas de Chicago
    // aparecieron en el registro, el sitemap, el índice y el menú, y NO en el
    // explorador de la portada — que es el sitio más visible de todos, y donde
    // el despacho notó que faltaban.
    //
    // Nada fallaba: ni el build, ni tsc, ni seo:check. Solo se veía abriendo la
    // portada. Esta guarda existe para que la próxima vez falle un test.
    const src = readFileSync(
      path.join(process.cwd(), 'app', 'components', 'OfficesExplorer.tsx'),
      'utf8',
    );
    const faltan = OFFICE_NAP_SLUGS.filter((slug) => !src.includes(`slug: '${slug}'`));
    expect(faltan, `sin entrada en OfficesExplorer: ${faltan.join(', ')}`).toEqual([]);
  });

  it('solo las altas de Chicago quedan sin página de accidentes', () => {
    // Fija el conjunto: si alguien retira la ficha de accidentes de una oficina
    // existente, o crea una para las nuevas, este test lo dice.
    const sinFicha = OFFICE_NAP_SLUGS.filter(
      (slug) => !accidentOffices.some((office) => office.id === slug),
    ).sort();
    expect(sinFicha).toEqual([...SIN_FICHA_DE_ACCIDENTES].sort());
  });

  /**
   * Antes este test decía que las de solo cita eran EXACTAMENTE las direcciones
   * virtuales. Dejó de ser cierto el 2026-08-22, cuando el despacho reclasificó
   * cinco sedes de Houston como satélite: cuatro de ellas son direcciones
   * virtuales (Regus) pero ya no publican "con cita", sino horario real.
   *
   * Las dos listas dejan de ser la misma cosa a propósito:
   *   · VIRTUAL_OFFICE_SLUGS = qué EDIFICIO es (centro de negocios Regus/IWG).
   *     Es un hecho de la dirección y no cambia porque cambie la operación.
   *   · el `hours.kind` = cómo SE ATIENDE. Es lo que se le promete al visitante.
   *
   * Confundirlas fue lo que permitió que una sede sin atención presencial
   * publicara horario de oficina atendida, así que el test ahora fija las tres
   * categorías por separado.
   */
  it('las tres categorías de atención son exactamente las esperadas', () => {
    const porTipo = (kind: string) =>
      OFFICE_NAP_SLUGS.filter((slug) => OFFICES_NAP[slug].hours.kind === kind).sort();

    /**
     * Satélite: horario real, sin atención presencial (decisión 2026-08-22).
     *
     * `houston-accidentes` NO está y no debe estar. Entró por error en la
     * primera pasada al leer "todas las de Houston menos Principal y Bellaire";
     * es un local propio de la familia con atención presencial 24/7 y el
     * despacho lo corrigió el mismo día. `league-city` sí está, aunque no sea
     * Houston: es la misma operación que Kirby o Main St.
     */
    expect(porTipo('satellite')).toEqual(
      ['kirby', 'league-city', 'main-st', 'north-loop', 'northchase'].sort(),
    );

    // Solo cita: las cinco del área de Chicago, que no se reclasificaron.
    expect(porTipo('appointment')).toEqual(
      [
        'chicago-martingale',
        'chicago-prospect',
        'chicago-wacker',
        'chicago-burr-ridge',
        'chicago-wall',
      ].sort(),
    );

    // Toda sede sin atención presencial tiene que ser satélite o de solo cita:
    // nadie puede quedarse en tierra de nadie.
    const sinPresencial = [...porTipo('satellite'), ...porTipo('appointment')].sort();
    const walkIn = OFFICE_NAP_SLUGS.filter((slug) => isWalkInOffice(slug)).sort();
    expect([...sinPresencial, ...walkIn].sort()).toEqual([...OFFICE_NAP_SLUGS].sort());

    // Y ninguna satélite ni de solo cita puede contar como oficina física.
    expect(PHYSICAL_OFFICE_COUNT).toBe(walkIn.length);
  });

  it('ninguna satélite anuncia 24 horas', () => {
    const anuncia24h = (slug: OfficeNapSlug) => {
      const { es, en } = OFFICES_NAP[slug].hours.label;
      return /24\s*(horas|hours|-hour)/i.test(es) || /24\s*(horas|hours|-hour)/i.test(en);
    };

    // Las satélite publicaban "atención telefónica 24 horas" como si fuera su
    // horario. El despacho lo retiró el 2026-08-22 y puso el horario real.
    for (const slug of SATELLITE_OFFICE_SLUGS) {
      expect(anuncia24h(slug), slug).toBe(false);
    }

    // Las otras dos formas de 24 h que quedan en el sitio SÍ son ciertas y se
    // fijan aquí para que nadie las borre por barrido: la línea telefónica de
    // las direcciones de solo cita, y el centro de accidentes de Houston, que
    // es local propio y abre de verdad las 24 horas.
    for (const slug of APPOINTMENT_OFFICE_SLUGS) {
      expect(anuncia24h(slug), slug).toBe(true);
    }
    expect(anuncia24h('houston-accidentes')).toBe(true);
    expect(OFFICES_NAP['houston-accidentes'].hours.kind).toBe('always');
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

  it('no inventa estado para las que no atienden sin cita', () => {
    for (const slug of APPOINTMENT_OFFICE_SLUGS) {
      expect(getOfficeOpenState(slug, SUNDAY_MORNING), slug).toBe('appointment');
    }

    /**
     * Las satélite NUNCA devuelven abierto/cerrado, ni siquiera en pleno
     * horario. Tienen franjas reales, así que la tentación de evaluarlas como
     * una oficina normal es justo el error a evitar: un "ABIERTO" en una sede
     * sin atención presencial manda a alguien hasta la puerta para nada.
     */
    for (const slug of SATELLITE_OFFICE_SLUGS) {
      expect(getOfficeOpenState(slug, SUNDAY_MORNING), slug).toBe('satellite');
      expect(getOfficeOpenState(slug, WEEKDAY_MORNING), slug).toBe('satellite');
      expect(getOfficeOpenState(slug, SATURDAY_MORNING), slug).toBe('satellite');
    }

    // Houston Accidentes sigue siendo el centro 24 h: es local propio con
    // atención presencial y NO se reclasificó.
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
