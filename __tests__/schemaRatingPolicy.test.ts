import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Guardia de política: el sitio NO marca valoraciones en su propio schema.
 *
 * Contexto (auditoría de schema 2026-08, Irina Shvaya). El rating que muestra
 * el sitio sale de Google Places, o sea de un tercero, y describe a la propia
 * firma. Convertirlo en `aggregateRating` sobre `Organization`, `LegalService`
 * o `LocalBusiness` junta las dos cosas que las guías de review snippets
 * prohíben —reagregar valoraciones de otra plataforma y marcar reseñas
 * auto-referidas— y es el disparador más común de acción manual por structured
 * data en el sector legal.
 *
 * POR QUÉ ES UN TEST Y NO UN COMENTARIO. Cuando se escribió esto, la key de
 * Google Places devolvía 403, así que `getPlaceData()` daba `null` y el markup
 * no se emitía aunque el código estuviera. Es decir: el sitio se veía limpio
 * por una avería, no por una decisión. En cuanto la key se restablezca —hace
 * falta para el monitor de fichas GBP— cualquier código que vuelva a colgar un
 * rating del `@id` de la firma lo empieza a publicar solo, en silencio y sin
 * que nadie lo note. Este test es lo que hace ruido antes de que eso pase.
 *
 * QUÉ SÍ ESTÁ PERMITIDO. Leer Places y MOSTRAR el número con atribución clara
 * ("reseñas en Google") es legítimo y sigue vivo: el título y la meta
 * description de /testimonios y el chip de las landings de ciudad lo usan. Lo
 * que este test prohíbe es traducirlo a propiedades de schema.
 *
 * SI ESTE TEST FALLA: no lo silencies añadiendo el archivo a EXCEPCIONES.
 * Alguien volvió a introducir marcado de rating; quítalo. La única salida
 * legítima sería que las reseñas pasaran a ser de primera parte, recogidas por
 * la propia firma con consentimiento y timestamp documentados — y esa decisión
 * no se toma en un test.
 */

const APP_DIR = path.join(process.cwd(), 'app');

/**
 * Propiedades de schema.org que materializan una valoración. Se listan como
 * regex con frontera por la izquierda porque `ratingCount` es sufijo de
 * `userRatingCount`, que es un campo LEGÍTIMO de la respuesta de Places y no
 * marcado — banearlo a ciegas rompería el fetcher.
 */
const PROPIEDADES_PROHIBIDAS: { nombre: string; patron: RegExp }[] = [
  { nombre: 'aggregateRating', patron: /(?<![A-Za-z])aggregateRating(?![A-Za-z])/ },
  { nombre: 'ratingValue', patron: /(?<![A-Za-z])ratingValue(?![A-Za-z])/ },
  { nombre: 'bestRating', patron: /(?<![A-Za-z])bestRating(?![A-Za-z])/ },
  { nombre: 'worstRating', patron: /(?<![A-Za-z])worstRating(?![A-Za-z])/ },
  { nombre: 'ratingCount', patron: /(?<![A-Za-z])ratingCount(?![A-Za-z])/ },
  { nombre: 'reviewCount', patron: /(?<![A-Za-z])reviewCount(?![A-Za-z])/ },
  { nombre: '@type AggregateRating', patron: /['"]AggregateRating['"]/ },
  { nombre: '@type Review', patron: /['"]Review['"]\s*[,}\]]/ },
];

/**
 * Quita comentarios para que la DOCUMENTACIÓN de esta política no se detecte a
 * sí misma: los archivos que la explican nombran `aggregateRating` a propósito.
 *
 * El guard `[^:]` antes de `//` protege las URLs (`https://…`), que aparecen
 * por todos lados en los @id de schema y no son comentarios.
 */
function sinComentarios(fuente: string): string {
  return fuente
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/.*$/gm, '$1');
}

function archivosFuente(dir: string): string[] {
  const salida: string[] = [];
  for (const entrada of readdirSync(dir, { withFileTypes: true })) {
    const completo = path.join(dir, entrada.name);
    if (entrada.isDirectory()) {
      if (entrada.name === 'node_modules' || entrada.name.startsWith('.')) continue;
      salida.push(...archivosFuente(completo));
    } else if (/\.tsx?$/.test(entrada.name)) {
      salida.push(completo);
    }
  }
  return salida;
}

interface Violacion {
  archivo: string;
  linea: number;
  propiedad: string;
  texto: string;
}

function buscarViolaciones(): Violacion[] {
  const violaciones: Violacion[] = [];

  for (const archivo of archivosFuente(APP_DIR)) {
    const lineas = sinComentarios(readFileSync(archivo, 'utf8')).split(/\r?\n/);

    lineas.forEach((linea, i) => {
      for (const { nombre, patron } of PROPIEDADES_PROHIBIDAS) {
        if (patron.test(linea)) {
          violaciones.push({
            archivo: path.relative(process.cwd(), archivo).replace(/\\/g, '/'),
            linea: i + 1,
            propiedad: nombre,
            texto: linea.trim().slice(0, 120),
          });
        }
      }
    });
  }

  return violaciones;
}

describe('política de rating en schema', () => {
  it('ningún archivo de app/ emite propiedades de valoración en JSON-LD', () => {
    const violaciones = buscarViolaciones();

    const informe = violaciones
      .map((v) => `  ${v.archivo}:${v.linea} → ${v.propiedad}\n      ${v.texto}`)
      .join('\n');

    expect(
      violaciones,
      violaciones.length
        ? `Se reintrodujo marcado de valoraciones en el schema del sitio:\n${informe}\n\n` +
          'Las reseñas son de Google (terceros) y describen a la propia firma: marcarlas ' +
          'sobre Organization/LegalService/LocalBusiness va contra las guías de review ' +
          'snippets. Mostrar el número con atribución sí está permitido; marcarlo no. ' +
          'Ver la cabecera de este test antes de tocar nada.'
        : undefined,
    ).toEqual([]);
  });

  it('/testimonios sigue leyendo Places para MOSTRAR el rating, sin marcarlo', () => {
    const pagina = readFileSync(
      path.join(APP_DIR, '[lang]', 'testimonios', 'page.tsx'),
      'utf8',
    );
    const codigo = sinComentarios(pagina);

    // La lectura viva sigue ahí: si alguien la borra, el título pierde la
    // estrella y la meta description su cifra, que es una regresión distinta.
    expect(codigo).toContain('getPlaceData');
    expect(codigo).toContain('getLiveRating');

    // Pero no vuelve a existir un nodo de schema con el rating colgado.
    expect(codigo).not.toMatch(/(?<![A-Za-z])aggregateRating(?![A-Za-z])/);
    expect(codigo).not.toContain('review-schema');
  });
});
