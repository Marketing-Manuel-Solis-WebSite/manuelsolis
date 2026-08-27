import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { SECURITY_HEADERS } from '../app/lib/securityHeaders';

/**
 * Guardas de la integración de CallRail (DNI de sesión / number pool).
 *
 * Nacen de la auditoría del 2026-08-26 (`docs/CALLRAIL-ATRIBUCION.md`), y todas
 * vigilan el MISMO modo de fallo: la medición de llamadas se rompe sin error.
 * No hay excepción en consola, no hay 500, no hay test rojo — simplemente las
 * llamadas dejan de atribuirse y nadie se entera hasta que alguien compara
 * cifras semanas después. Cada `it` de aquí es un fallo que ya se identificó
 * leyendo el bundle de swap.js y que un refactor razonable puede reintroducir.
 */

const root = path.join(__dirname, '..');
const read = (rel: string) => readFileSync(path.join(root, rel), 'utf-8');

function directive(name: string): string {
  const csp = SECURITY_HEADERS.find((h) => h.key === 'Content-Security-Policy');
  if (!csp) throw new Error('No hay Content-Security-Policy en SECURITY_HEADERS');
  const found = csp.value.split(';').map((d) => d.trim()).find((d) => d.startsWith(`${name} `));
  if (!found) throw new Error(`La CSP no declara la directiva ${name}`);
  return found;
}

describe('CSP', () => {
  // swap.js se descarga de cdn.callrail.com, pero encadena js.callrail.com
  // (swap_session.js, icap.js, poll.js) y app.callrail.com (form_capture.js).
  // Listar solo el host del snippet deja el script cargando y el pool muerto.
  it('permite los scripts de CallRail', () => {
    expect(directive('script-src')).toContain('callrail.com');
  });

  // La asignación del número de pool se negocia por XHR contra
  // js.callrail.com. Sin connect-src el swap NUNCA ocurre, aunque el script
  // se haya descargado sin queja: es el modo de fallo más caro de los dos.
  it('permite el XHR de asignación de número', () => {
    expect(directive('connect-src')).toContain('callrail.com');
  });
});

describe('carga del script', () => {
  const src = read('app/components/PageViewTracker.tsx');

  it('usa afterInteractive, no lazyOnload', () => {
    const block = src.slice(src.indexOf('id="callrail-swap"'));
    expect(block.slice(0, 400)).toContain('afterInteractive');
  });

  // Un píxel puede llegar tarde porque solo observa. swap.js REESCRIBE el
  // número que el visitante marca, y la MobileStickyBar es tappable mucho
  // antes del window.load: cada llamada de esa ventana entra sin atribuir.
  it('no cae en lazyOnload al copiar el patrón de los píxeles', () => {
    const idx = src.indexOf('id="callrail-swap"');
    expect(idx).toBeGreaterThan(-1);
    const block = src.slice(idx, idx + 400);
    expect(block).not.toContain('lazyOnload');
  });

  // La var es NEXT_PUBLIC_ y se interpola en el src de un <script>: sin la
  // comprobación de origen, un valor mal puesto en el panel de Vercel es una
  // inyección de script de tercero con la CSP ya abierta a *.callrail.com.
  it('valida el origen antes de interpolar la env var', () => {
    expect(src).toContain("startsWith('https://cdn.callrail.com/')");
  });
});

describe('swap frente a los re-renders de React', () => {
  // El observer de CallRail es {childList, subtree} SIN characterData y su
  // callback solo mira addedNodes. React muta nodeValue/atributos en sitio,
  // así que reescribe el número swapeado sin que CallRail lo vea. Cambiar la
  // key fuerza remount → el nodo entra como addedNode → se vuelve a swapear.
  const casos: { archivo: string; key: string }[] = [
    { archivo: 'app/components/Header.tsx', key: 'key={phoneNumber}' },
    { archivo: 'app/components/MobileStickyBar.tsx', key: 'key={phoneLink}' },
  ];

  for (const { archivo, key } of casos) {
    it(`${archivo} remonta el enlace de teléfono al cambiar de ruta`, () => {
      const src = read(archivo);
      // La key tiene que estar en el <a> QUE LLEVA EL href, no suelta en otro
      // elemento: si se separan, el atributo revertido no se recupera. Se
      // busca la etiqueta de apertura completa, no la cadena a secas — la
      // primera versión de este test matcheaba la mención de `key` dentro del
      // comentario que explica el arreglo y pasaba con el arreglo quitado.
      const aperturas = src.match(/<a\b[^>]*>/g) ?? [];
      const conKeyYHref = aperturas.filter(
        (a) => a.includes(key) && a.includes('href={phoneLink}'),
      );
      expect(conKeyYHref, `ningún <a> lleva a la vez ${key} y href={phoneLink}`).toHaveLength(1);
    });
  }
});

describe('números que no deben rotar', () => {
  // Teléfonos DE REGISTRO de documentos legales. Un número de pool en la
  // cláusula de contacto de los Términos o de la Política es incorrecto, y
  // además quema una asignación en páginas sin tráfico de campaña.
  const legales = [
    'app/components/TermsOfService.tsx',
    'app/[lang]/privacidad/PrivacidadClient.tsx',
  ];

  // sms-terminos pinta el telefono como TEXTO PLANO, sin <a href="tel:">, asi
  // que la comprobacion de enlaces de abajo no lo veria. CallRail sustituye
  // nodos de texto igual que atributos, y a esta pagina la auditan las
  // operadoras: se comprueba aparte para que no se cuele por la forma.
  it('sms-terminos protege su numero aunque lo pinte como texto plano', () => {
    const src = read('app/[lang]/sms-terminos/SmsTerminosClient.tsx');
    const bloques = src.match(/<div[^>]*>\s*<Phone[\s\S]{0,120}?phone'\)\}/g) ?? [];
    expect(bloques.length).toBeGreaterThan(0);
    for (const b of bloques) expect(b).toContain('data-calltrk-noswap');
  });

  for (const archivo of legales) {
    it(`${archivo} marca sus teléfonos con data-calltrk-noswap`, () => {
      const src = read(archivo);
      const telLinks = src.match(/<a\b[\s\S]{0,400}?tel:\+1/g) ?? [];
      expect(telLinks.length).toBeGreaterThan(0);
      for (const link of telLinks) {
        expect(link).toContain('data-calltrk-noswap');
      }
    });
  }
});

describe('divulgación', () => {
  // La Sección 5 de la política enumera CADA tercero por su nombre y sus
  // cookies. CallRail no es un píxel más: sustituye el número que se marca y
  // puede grabar la llamada, así que omitirlo deja el documento desactualizado
  // en el punto más sensible.
  it('la política de privacidad declara CallRail y sus cookies', () => {
    const src = read('app/[lang]/privacidad/PrivacidadClient.tsx');
    expect(src).toContain('CallRail');
    expect(src).toContain('calltrk_');
  });
});

describe('taxonomía UTM', () => {
  // El vocabulario cerrado de docs/UTM_TAXONOMY.md contra el registry real.
  // Si /go/<slug> emite un utm_source o utm_medium fuera de la taxonomía, la
  // data de campaña se fragmenta en cubos sueltos, que es exactamente lo que
  // hace imposible separar canales después.
  const doc = read('docs/UTM_TAXONOMY.md');

  /** Extrae los valores en `backticks` de la primera columna de una tabla. */
  function vocabulario(encabezado: string): Set<string> {
    const desde = doc.indexOf(encabezado);
    expect(desde, `no se encontró la sección ${encabezado} en la taxonomía`).toBeGreaterThan(-1);
    const bloque = doc.slice(desde, doc.indexOf('###', desde + encabezado.length));
    const valores = new Set<string>();
    for (const linea of bloque.split('\n')) {
      const m = /^\|\s*`([a-z0-9-]+(?:<[a-z-]+>)?)`\s*\|/.exec(linea.trim());
      if (m) valores.add(m[1]);
    }
    expect(valores.size).toBeGreaterThan(3);
    return valores;
  }

  it('los short-links usan solo fuentes y medios de la taxonomía', async () => {
    const { SHORT_LINKS } = await import('../app/lib/shortLinks');
    const fuentes = vocabulario('### `utm_source`');
    const medios = vocabulario('### `utm_medium`');

    // `partner-<nombre>` es un patrón, no un literal: se acepta el prefijo.
    const fuenteValida = (v: string) =>
      fuentes.has(v) || [...fuentes].some((f) => f.includes('<') && v.startsWith(f.split('<')[0]));

    for (const link of SHORT_LINKS) {
      expect(fuenteValida(link.utm.source), `utm_source fuera de taxonomía en /go/${link.slug}: ${link.utm.source}`).toBe(true);
      expect(medios.has(link.utm.medium), `utm_medium fuera de taxonomía en /go/${link.slug}: ${link.utm.medium}`).toBe(true);
    }
  });

  it('los short-links respetan la regla cero (minúsculas, kebab-case, sin acentos)', async () => {
    const { SHORT_LINKS } = await import('../app/lib/shortLinks');
    const kebab = /^[a-z0-9]+(-[a-z0-9]+)*$/;
    for (const link of SHORT_LINKS) {
      for (const [campo, valor] of Object.entries(link.utm)) {
        if (!valor) continue;
        expect(kebab.test(valor), `${campo}="${valor}" en /go/${link.slug} rompe la regla cero`).toBe(true);
      }
      expect(kebab.test(link.slug), `el slug "${link.slug}" rompe la regla cero`).toBe(true);
    }
  });

  // La taxonomía afirmaba que un gclid solo se sintetizaba como google/cpc.
  // El código dejó de hacerlo el 2026-07-24 y el documento se quedó mintiendo
  // justo en la línea que leen los que lanzan campañas: si creen que el
  // auto-tagging basta, su tráfico pagado se reporta como tráfico del sitio.
  it('la taxonomía no promete que el auto-tagging baste', () => {
    expect(doc).toContain('Regla de paid');
    expect(doc).not.toMatch(/se sintetiza `google \/ cpc`/);
  });
});
