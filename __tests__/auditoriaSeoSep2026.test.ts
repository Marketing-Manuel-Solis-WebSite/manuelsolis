import { describe, it, expect } from 'vitest';
import { addInlineLinks, createInlineLinkState } from '../app/lib/blogInlineLinks';
import { CITY_FOOTER_LINKS } from '../app/components/cityFooterLinks';
import { LANDING_PAGES } from '../app/lib/cityServiceData';
import { VIRTUAL_OFFICE_SLUGS } from '../app/lib/officesRegistry';
import { OFFICE_NAP_SLUGS, getOfficeNap } from '../app/components/officesPhoneMap';
import { BLOG_CATEGORIES, getArticleSection, getBlogCategory } from '../app/lib/blogCategories';
import { BLOG_DATA } from '../app/[lang]/blog/page';

/**
 * Guardas de los arreglos de la contraverificación de eSEOspace (2026-09-02).
 *
 * Cada bloque cita el defecto que evita que vuelva. Son pruebas de regresión,
 * no de comportamiento general: si una falla, algo revirtió un arreglo medido.
 */

const link = (html: string, lang: 'es' | 'en' = 'en') =>
  addInlineLinks(html, lang, createInlineLinkState());

describe('inyector de enlaces — apóstrofo tipográfico (paso 01, causa 1)', () => {
  it('enlaza "workers’ compensation" con apóstrofo curvo (U+2019)', () => {
    const out = link('<p>You may be covered by workers’ compensation in Texas.</p>');
    expect(out).toContain('href="/en/servicios/accidentes"');
  });

  it('sigue enlazando con apóstrofo recto', () => {
    const out = link("<p>You may be covered by workers' compensation in Texas.</p>");
    expect(out).toContain('href="/en/servicios/accidentes"');
  });

  it('el texto visible conserva el apóstrofo original, no lo normaliza', () => {
    const out = link('<p>Covered by workers’ compensation here.</p>');
    expect(out).toContain('workers’ compensation');
    expect(out).not.toContain("workers' compensation");
  });

  it('el plegado no cambia la longitud: el HTML no se corrompe', () => {
    // Un desajuste de índices partiría la etiqueta o duplicaría texto.
    const out = link('<p>The “process” — workers’ compensation — applies.</p>');
    expect(out.startsWith('<p>')).toBe(true);
    expect(out.endsWith('</p>')).toBe(true);
    expect(out.replace(/<a [^>]*>|<\/a>/g, '')).toBe(
      '<p>The “process” — workers’ compensation — applies.</p>',
    );
  });
});

describe('inyector de enlaces — flexiones (paso 01, causa 3)', () => {
  it('enlaza "immigration processes" en plural', () => {
    expect(link('<p>Immigration processes are slow.</p>')).toContain(
      'href="/en/servicios/inmigracion"',
    );
  });

  it('sigue enlazando el singular', () => {
    expect(link('<p>The immigration process is slow.</p>')).toContain(
      'href="/en/servicios/inmigracion"',
    );
  });

  it('enlaza "trámites de inmigración" en plural', () => {
    expect(link('<p>Los trámites de inmigración tardan.</p>', 'es')).toContain(
      'href="/es/servicios/inmigracion"',
    );
  });
});

describe('inyector de enlaces — destino de "family petition" (paso 02)', () => {
  it('manda a inmigración, no a derecho de familia', () => {
    const out = link('<p>You can start a family petition for your mother.</p>');
    expect(out).toContain('href="/en/servicios/inmigracion"');
    expect(out).not.toContain('/servicios/familia');
  });

  it('lo mismo en español con "petición familiar"', () => {
    const out = link('<p>Puede iniciar una petición familiar para su madre.</p>', 'es');
    expect(out).toContain('href="/es/servicios/inmigracion"');
    expect(out).not.toContain('/servicios/familia');
  });
});

describe('inyector de enlaces — reglas que no deben aflojarse', () => {
  it('no enlaza dentro de un <a> existente', () => {
    const out = link('<p><a href="/en/x">the immigration process</a> here</p>');
    expect((out.match(/<a /g) ?? []).length).toBe(1);
  });

  it('nunca supera 3 enlaces por artículo', () => {
    const state = createInlineLinkState();
    const html =
      '<p>asylum, deportation, workers’ compensation, citizenship, U visa, VAWA, immigration process</p>';
    const out = addInlineLinks(html, 'en', state);
    expect((out.match(/<a /g) ?? []).length).toBeLessThanOrEqual(3);
  });

  it('un mismo destino no se enlaza dos veces', () => {
    const state = createInlineLinkState();
    const a = addInlineLinks('<p>the immigration process</p>', 'en', state);
    const b = addInlineLinks('<p>another immigration process mention</p>', 'en', state);
    expect((a + b).match(/servicios\/inmigracion/g)?.length).toBe(1);
  });
});

describe('bloque de ciudades del pie (paso 05)', () => {
  it('lista las 35 landings, ni una menos', () => {
    expect(CITY_FOOTER_LINKS).toHaveLength(35);
  });

  it('coincide exactamente con LANDING_PAGES — no puede desincronizarse', () => {
    const enPie = [...CITY_FOOTER_LINKS.map((l) => l.slug)].sort();
    const reales = [...LANDING_PAGES.map((p) => p.slug)].sort();
    expect(enPie).toEqual(reales);
  });

  it('las diez que faltaban están presentes', () => {
    const slugs = new Set(CITY_FOOTER_LINKS.map((l) => l.slug));
    for (const s of [
      'asilo-politico-dallas',
      'asilo-politico-denver',
      'asilo-politico-el-paso',
      'asilo-politico-harlingen',
      'asilo-politico-memphis',
      'vawa-denver',
      'vawa-el-paso',
      'vawa-harlingen',
      'vawa-los-angeles',
      'vawa-memphis',
    ]) {
      expect(slugs.has(s), `falta ${s} en el pie`).toBe(true);
    }
  });

  it('ninguna entrada se repite y todas tienen etiqueta en los dos idiomas', () => {
    const slugs = CITY_FOOTER_LINKS.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const l of CITY_FOOTER_LINKS) {
      expect(l.es.trim().length, l.slug).toBeGreaterThan(0);
      expect(l.en.trim().length, l.slug).toBeGreaterThan(0);
    }
  });
});

describe('tipado de sedes sin atención presencial (defecto 1, crítico)', () => {
  it('las diez direcciones virtuales incluyen las cinco del área de Chicago', () => {
    const v = new Set<string>(VIRTUAL_OFFICE_SLUGS);
    for (const s of [
      'chicago-burr-ridge',
      'chicago-martingale',
      'chicago-prospect',
      'chicago-wacker',
      'chicago-wall',
    ]) {
      expect(v.has(s), `${s} debe estar en VIRTUAL_OFFICE_SLUGS`).toBe(true);
    }
    expect(VIRTUAL_OFFICE_SLUGS).toHaveLength(10);
  });

  it('ninguna oficina virtual publica horario estructurado', () => {
    // Es la propiedad que le dice a Google "hay personal aquí en estas franjas".
    for (const slug of VIRTUAL_OFFICE_SLUGS) {
      const nap = getOfficeNap(slug);
      expect(nap, slug).toBeTruthy();
      expect(['satellite', 'appointment'], `${slug} tiene horario de sede atendida`).toContain(
        nap!.hours.kind,
      );
    }
  });

  it('las diez sedes atendidas NO están marcadas como virtuales', () => {
    const virtuales = new Set<string>(VIRTUAL_OFFICE_SLUGS);
    const atendidas = OFFICE_NAP_SLUGS.filter((s) => !virtuales.has(s));
    expect(atendidas).toHaveLength(10);
    for (const s of atendidas) {
      expect(getOfficeNap(s)!.hours.kind, `${s} debería tener horario semanal`).not.toBe(
        'appointment',
      );
    }
  });
});

describe('taxonomía del blog en los datos estructurados (paso 06)', () => {
  it('los 55 artículos resuelven a una categoría y solo una', () => {
    const sinCategoria = BLOG_DATA.posts.filter((p) => !getBlogCategory(p.slug));
    expect(sinCategoria.map((p) => p.slug)).toEqual([]);
  });

  it('cada categoryId de BLOG_DATA está declarado en alguna categoría', () => {
    const declarados = new Set(BLOG_CATEGORIES.flatMap((c) => c.postIds));
    const usados = new Set(BLOG_DATA.posts.map((p) => p.categoryId));
    for (const id of usados) {
      expect(declarados.has(id), `categoryId "${id}" no cae en ninguna página`).toBe(true);
    }
  });

  it('articleSection sale traducido según el idioma de la página', () => {
    const post = BLOG_DATA.posts[0];
    const es = getArticleSection(post.slug, 'es');
    const en = getArticleSection(post.slug, 'en');
    expect(es).toBeTruthy();
    expect(en).toBeTruthy();
    expect(es).not.toBe(en);
  });

  it('un slug desconocido devuelve null, no una cadena vacía', () => {
    expect(getArticleSection('no-existe-este-post', 'es')).toBeNull();
  });
});
