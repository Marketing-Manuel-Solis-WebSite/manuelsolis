import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { LANDING_PAGES, getPageData } from '../app/lib/cityServiceData';
import { getLocalFAQ, getTypicalCases } from '../app/lib/cityServiceLocalContent';
import { getLandingsEntries } from '../app/lib/sitemapData';

/**
 * Lo que separa una landing ciudad × servicio de una página puerta es el
 * contenido local: corte de inmigración con dirección, condado, fiscalía,
 * centros de detención. Eso vive en CITY_LOCAL, y `getLocalFAQ` /
 * `getTypicalCases` devuelven **vacío sin avisar** cuando la ciudad no está ahí.
 *
 * Ese es el fallo silencioso que hay que vigilar: una landing nueva compila,
 * responde 200, entra en el sitemap y se ve completa, pero sin FAQ ni casos
 * propios es la misma página con la ciudad cambiada. Fue la razón de sacar del
 * índice las cinco direcciones virtuales de accidentes, y no tiene sentido
 * reconstruir el patrón por el otro lado.
 *
 * Por eso aquí no se comprueba que las 32 de hoy estén bien —eso ya se midió—,
 * sino que **cualquiera que se añada mañana** traiga su contenido local, su
 * page.tsx y su entrada en el sitemap.
 */
describe('toda landing tiene contenido local propio', () => {
  it.each(LANDING_PAGES.map((p) => p.slug))('%s trae FAQ y casos locales', (slug) => {
    const data = getPageData(slug);
    expect(data, `getPageData('${slug}') no resuelve`).toBeTruthy();
    const { config, office, service } = data!;

    // Sin estos dos la página es la plantilla con otro nombre de ciudad.
    expect(
      getLocalFAQ(config, office, service).length,
      `${slug}: sin FAQ local. Falta '${config.officeKey}' en CITY_LOCAL (app/lib/cityServiceLocalContent.ts) ` +
        `o falta el constructor para el servicio '${config.serviceKey}'.`,
    ).toBeGreaterThan(0);

    expect(
      getTypicalCases(config, office, service).length,
      `${slug}: sin casos típicos locales. Mismo origen que la FAQ.`,
    ).toBeGreaterThan(0);
  });
});

describe('toda landing es alcanzable', () => {
  it.each(LANDING_PAGES.map((p) => p.slug))('%s tiene su page.tsx', (slug) => {
    expect(existsSync(`app/[lang]/${slug}/page.tsx`), `falta app/[lang]/${slug}/page.tsx`).toBe(true);
  });

  it('el page.tsx declara su propio slug y no el de la plantilla', () => {
    // Las landings se crean clonando una existente; olvidar el reemplazo deja
    // dos rutas sirviendo la misma ciudad, y ambas responden 200.
    const malas = LANDING_PAGES.filter((p) => {
      const f = `app/[lang]/${p.slug}/page.tsx`;
      if (!existsSync(f)) return false;
      return !readFileSync(f, 'utf8').includes(`const PAGE_SLUG = '${p.slug}'`);
    }).map((p) => p.slug);
    expect(malas, `page.tsx con PAGE_SLUG equivocado: ${malas.join(', ')}`).toEqual([]);
  });

  it('el sitemap cubre las dos versiones de idioma de cada landing', () => {
    const urls = new Set(getLandingsEntries().map((e) => e.url));
    const faltan = LANDING_PAGES.flatMap((p) =>
      ['es', 'en']
        .map((l) => `https://www.manuelsolis.com/${l}/${p.slug}`)
        .filter((u) => !urls.has(u)),
    );
    expect(faltan, `fuera del sitemap: ${faltan.join(', ')}`).toEqual([]);
  });

  it('no declara un lastmod anterior al alta de la landing', () => {
    // Una URL nueva que anuncia una fecha de hace meses le dice a Google que no
    // corre prisa rastrearla. Ver LANDING_ALTA en app/lib/sitemapData.ts.
    const NUEVAS_2026_08 = [
      'vawa-memphis',
      'vawa-denver',
      'vawa-harlingen',
      'asilo-politico-dallas',
      'asilo-politico-memphis',
      'asilo-politico-denver',
      'asilo-politico-harlingen',
      'vawa-los-angeles',
      'vawa-el-paso',
      'asilo-politico-el-paso',
    ];
    for (const slug of NUEVAS_2026_08) {
      const entrada = getLandingsEntries().find((e) => e.url.endsWith(`/es/${slug}`));
      expect(entrada?.lastModified, `${slug} sin lastmod`).toBe('2026-08-12');
    }
  });
});
