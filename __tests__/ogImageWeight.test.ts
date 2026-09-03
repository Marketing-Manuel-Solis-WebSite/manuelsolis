import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';

/**
 * Peso de las imágenes que se declaran como `og:image`.
 *
 * Importa por un detalle que se olvida siempre: **`og:image` apunta al archivo
 * CRUDO de public/, no al que optimiza next/image.** Es decir, es exactamente el
 * byte que descarga WhatsApp o Facebook cada vez que alguien comparte el enlace
 * — el canal por el que de verdad circulan estas páginas entre esta clientela.
 *
 * Este test nace de un error propio: se puso `/MSTeam.png` (1,6 MB) como imagen
 * social de /abogados el mismo día en que se descartó una miniatura de 1,6 MB
 * para /testimonios por ese motivo. El criterio estaba claro y aun así se
 * incumplió, así que ahora lo vigila una prueba en vez de la memoria.
 */

const LIMITE_KB = 500;

/** Recorre app/ buscando las rutas de imagen declaradas en metadatos sociales. */
function declaredOgImages(): { file: string; url: string }[] {
  const out: { file: string; url: string }[] = [];

  const walk = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const f = path.join(dir, e.name);
      if (e.isDirectory()) walk(f);
      else if (/\.(ts|tsx)$/.test(e.name)) {
        const src = readFileSync(f, 'utf8');
        if (!src.includes('buildSocialMetadata') && !src.includes('DEFAULT_IMAGE')) continue;
        // `url: '/algo.jpg'` dentro de un bloque images.
        for (const m of src.matchAll(/url:\s*['"`](\/[^'"`]+\.(?:jpg|jpeg|png|webp))['"`]/gi)) {
          out.push({ file: path.relative(process.cwd(), f), url: m[1] });
        }
      }
    }
  };
  walk(path.join(process.cwd(), 'app'));
  return out;
}

/**
 * Toda imagen de `public/` que pueda acabar en una `og:image`.
 *
 * El escaneo de literales no basta: la ficha de un abogado o colaborador pasa
 * `attorney.image` / `collaborator.image` como imagen social, así que la ruta
 * vive en un archivo de datos y no junto a `buildSocialMetadata`. Así se colaba
 * un PNG de 1,3 MB (`/openers/Jennifer.png`) que la auditoría del HTML sí vio y
 * este test no.
 *
 * Se cubren por tanto los perfiles: sus fotos son og:image por definición.
 */
function profileImages(): { file: string; url: string }[] {
  const out: { file: string; url: string }[] = [];

  /**
   * officePhotos alimenta las og:image de las 20 fichas y de las 25 landings a
   * traves de un mapa, asi que sus rutas tampoco son literales junto a
   * buildSocialMetadata: por ahi se colaban las fotos de oficina pesadas.
   */
  const mapa = path.join(process.cwd(), 'app/lib/officePhotos.ts');
  if (existsSync(mapa)) {
    const src = readFileSync(mapa, 'utf8');
    for (const m of src.matchAll(/:\s*['"`](\/(?:offices|og)\/[^'"`]+\.(?:jpg|jpeg|png|webp))['"`]/gi)) {
      out.push({ file: 'app/lib/officePhotos.ts', url: m[1] });
    }
  }

  /**
   * Los perfiles se leen POR BLOQUE, no con un patron plano sobre el fichero.
   *
   * Es la correccion de la ceguera que dejo pasar 158,7 MB. La og:image de una
   * ficha es `socialImage ?? image` —lo que hace app/[lang]/abogados/[slug]—,
   * asi que la pregunta no es "hay alguna ruta de imagen" sino "cual de las dos
   * gana en ESTE perfil". Un patron plano no puede responder eso: marcaba la
   * `image` remota de un abogado que ya tiene su `socialImage` local, y a la vez
   * se saltaba al que no la tiene.
   *
   * Una `image` remota es legitima: es el retrato de alta resolucion y la pagina
   * lo sirve por next/image. Lo que no puede pasar a og:image es una remota SIN
   * `socialImage` que la sustituya, porque og:image se sirve cruda.
   */
  for (const rutaRel of ['app/lib/attorneyData.ts', 'app/lib/collaboratorData.ts']) {
    const abs = path.join(process.cwd(), rutaRel);
    if (!existsSync(abs)) continue;
    const src = readFileSync(abs, 'utf8');
    for (const bloque of src.split(/\n  \{\n/).slice(1)) {
      const cuerpo = bloque.split(/\n  \},/)[0];
      if (!/\bid:\s*['"`]/.test(cuerpo)) continue;
      const social = cuerpo.match(/\bsocialImage:\s*['"`]([^'"`]+)['"`]/);
      const imagen = cuerpo.match(/\bimage:\s*['"`]([^'"`]+)['"`]/);
      const efectiva = social?.[1] ?? imagen?.[1];
      if (efectiva) out.push({ file: rutaRel, url: efectiva });
    }
  }

  return out;
}

describe('peso de las og:image', () => {
  it(`ninguna imagen social declarada pasa de ${LIMITE_KB} KB`, () => {
    const declaradas = [...declaredOgImages(), ...profileImages()];
    expect(declaradas.length, 'no se encontró ninguna og:image declarada').toBeGreaterThan(5);

    const pesadas: string[] = [];
    const remotas: string[] = [];
    for (const { file, url } of declaradas) {
      // decodeURIComponent: en la URL un espacio va como %20 ('/Roberto%20Garcia.png'),
      // y en disco el archivo lleva el espacio literal. Sin decodificar, una ruta
      // correcta se reporta como inexistente.
      /**
       * Una og:image REMOTA no se puede pesar en disco, y saltársela con un
       * `continue` es justo cómo esta guarda dejó pasar 18 fotos de 8-11 MB.
       * Se marcan como no verificables y la aserción de abajo las trata como
       * fallo: si va a og:image, o vive en public/ y se puede medir, o no va.
       */
      if (/^https?:\/\//i.test(url)) {
        remotas.push(`${file}: ${url} — og:image remota, no se puede medir el peso`);
        continue;
      }
      const abs = path.join(process.cwd(), 'public', decodeURIComponent(url));
      if (!existsSync(abs)) continue; // la ausencia la caza contentHygiene
      const kb = Math.round(statSync(abs).size / 1024);
      if (kb > LIMITE_KB) pesadas.push(`${url} (${kb} KB) declarada en ${file}`);
    }

    expect(
      pesadas,
      `og:image demasiado pesadas — WhatsApp descarga el archivo crudo:\n  ${pesadas.join('\n  ')}`,
    ).toEqual([]);

    expect(
      remotas,
      `og:image alojadas fuera de public/, imposibles de pesar aquí. Genera una versión\n` +
        `social en public/og/ y apúntala con socialImage — así fue como 18 fotos de\n` +
        `8-11 MB pasaron esta guarda en verde:\n  ${remotas.join('\n  ')}`,
    ).toEqual([]);
  });

  it('las imágenes sociales declaradas existen en public/', () => {
    const faltan = [...declaredOgImages(), ...profileImages()]
      // Las remotas las cubre la aserción de peso del test anterior; aquí solo
      // se comprueba que lo declarado como local exista de verdad.
      .filter(({ url }) => !/^https?:\/\//i.test(url))
      .filter(({ url }) => !existsSync(path.join(process.cwd(), 'public', decodeURIComponent(url))));
    expect(
      faltan.map((f) => `${f.url} (en ${f.file})`),
      'og:image declarada que no existe: el enlace compartido saldría sin imagen',
    ).toEqual([]);
  });
});
