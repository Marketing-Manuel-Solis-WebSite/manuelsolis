import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import {
  NEWSLETTER_EPOCH,
  firmToday,
  isPublished,
  newsletterDateOf,
  newsletterDue,
  upcoming,
} from '../app/lib/blogSchedule';
import { ALL_BLOG_POSTS, BLOG_DATA } from '../app/[lang]/blog/page';

/**
 * El calendario de publicación decide dos cosas irreversibles: qué URLs
 * existen y a quién se le manda un correo. Un fallo en la primera se arregla
 * con un despliegue; uno en la segunda, no — el correo ya salió.
 *
 * Por eso el test que de verdad importa aquí es el de la época: sin ella, los
 * 35 artículos anteriores a agosto de 2026 (que nunca tuvieron boletín)
 * quedarían "pendientes" al encender el cron y la lista recibiría un artículo
 * viejo cada día hasta agotar el archivo.
 */

const FUTURO_LEJANO = '2999-01-01';
const BLOG_DIR = path.join(process.cwd(), 'app', '[lang]', 'blog');

describe('isPublished', () => {
  it('publica lo de ayer y lo de hoy, esconde lo de mañana', () => {
    const hoy = '2026-08-06';
    expect(isPublished({ slug: 'a', date: '2026-08-05' }, hoy)).toBe(true);
    expect(isPublished({ slug: 'b', date: hoy }, hoy)).toBe(true);
    expect(isPublished({ slug: 'c', date: '2026-08-07' }, hoy)).toBe(false);
  });

  it('compara por fecha aunque compare texto (cambio de año y de mes)', () => {
    expect(isPublished({ slug: 'a', date: '2026-09-30' }, '2026-10-01')).toBe(true);
    expect(isPublished({ slug: 'b', date: '2027-01-01' }, '2026-12-31')).toBe(false);
  });
});

describe('firmToday', () => {
  it('usa la hora de Houston, no UTC', () => {
    // 03:00 UTC del día 7 son las 22:00 del día 6 en Houston. Con UTC, un post
    // fechado el 7 saldría la tarde anterior.
    expect(firmToday(new Date('2026-08-07T03:00:00Z'))).toBe('2026-08-06');
    expect(firmToday(new Date('2026-08-07T13:00:00Z'))).toBe('2026-08-07');
  });

  it('devuelve siempre YYYY-MM-DD, que es lo que comparan las demás funciones', () => {
    expect(firmToday(new Date('2026-01-05T18:00:00Z'))).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('newsletterDue', () => {
  const posts = [
    { slug: 'viejo', date: '2026-01-01' },
    { slug: 'epoca-justa', date: '2026-08-01', newsletterAt: NEWSLETTER_EPOCH },
    { slug: 'programado', date: '2999-01-01', newsletterAt: '2026-08-08' },
    { slug: 'toca-hoy', date: '2026-08-02', newsletterAt: '2026-08-10' },
    { slug: 'toca-antes', date: '2026-08-02', newsletterAt: '2026-08-09' },
  ];

  it('ignora lo anterior a la época aunque lleve años publicado', () => {
    const slugs = newsletterDue(posts, '2026-08-10').map((p) => p.slug);
    expect(slugs).not.toContain('viejo');
  });

  it('incluye lo que cae justo en la época', () => {
    expect(newsletterDue(posts, NEWSLETTER_EPOCH).map((p) => p.slug)).toEqual(['epoca-justa']);
  });

  it('nunca anuncia un artículo que todavía no existe', () => {
    // 'programado' tiene fecha de correo vencida pero no ha salido: mandarlo
    // llevaría a toda la lista a un 404.
    expect(newsletterDue(posts, '2026-08-10').map((p) => p.slug)).not.toContain('programado');
  });

  it('devuelve primero el más atrasado', () => {
    expect(newsletterDue(posts, '2026-08-10').map((p) => p.slug)).toEqual([
      'epoca-justa',
      'toca-antes',
      'toca-hoy',
    ]);
  });

  it('sin newsletterAt, la fecha del correo es la de publicación', () => {
    expect(newsletterDateOf({ slug: 'x', date: '2026-08-09' })).toBe('2026-08-09');
    expect(newsletterDateOf({ slug: 'x', date: '2026-08-09', newsletterAt: '2026-09-01' })).toBe('2026-09-01');
  });
});

describe('datos reales del blog', () => {
  it('el archivo anterior a agosto de 2026 nunca entra en la cola de correo', () => {
    // Con el reloj en el año 2999 todo está vencido: lo único que puede frenar
    // a los 35 artículos viejos es la época.
    const cola = newsletterDue(ALL_BLOG_POSTS, FUTURO_LEJANO);
    expect(cola).toHaveLength(20);
    for (const post of cola) {
      expect(newsletterDateOf(post) >= NEWSLETTER_EPOCH).toBe(true);
    }
  });

  it('reparte los avisos de uno en uno, cada 3 días', () => {
    const fechas = newsletterDue(ALL_BLOG_POSTS, FUTURO_LEJANO).map(newsletterDateOf);
    expect(new Set(fechas).size).toBe(fechas.length); // ni un solo día con dos correos
    for (let i = 1; i < fechas.length; i++) {
      const dias = (Date.parse(fechas[i]) - Date.parse(fechas[i - 1])) / 86400000;
      expect(dias).toBe(3);
    }
  });

  it('BLOG_DATA.posts solo expone lo publicado', () => {
    const hoy = firmToday();
    for (const post of BLOG_DATA.posts) {
      expect(isPublished(post, hoy)).toBe(true);
    }
    expect(BLOG_DATA.posts.length + upcoming(ALL_BLOG_POSTS, hoy).length).toBe(ALL_BLOG_POSTS.length);
  });

  it('no hay slugs repetidos: el registro de envíos usa el slug como clave', () => {
    const slugs = ALL_BLOG_POSTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('la fecha del índice y la del artículo son la misma', () => {
    // La fecha vive en dos sitios: `date` en BLOG_DATA (decide si el post sale
    // en el índice, el sitemap y el RSS) e `ISO_DATE` en su page.tsx (decide si
    // la URL responde 200 o 404). Programar un post cambiando solo una deja el
    // peor resultado posible: enlazado desde la portada del blog y en 404 al
    // pulsarlo, o accesible cuando debía estar oculto.
    const dirs = readdirSync(BLOG_DIR, { withFileTypes: true }).filter((d) => d.isDirectory());
    let comprobados = 0;

    for (const dir of dirs) {
      const file = path.join(BLOG_DIR, dir.name, 'page.tsx');
      if (!existsSync(file)) continue;
      const isoDate = readFileSync(file, 'utf8').match(/const ISO_DATE = '(\d{4}-\d{2}-\d{2})'/)?.[1];
      if (!isoDate) continue; // los 35 posts antiguos llevan el JSX a mano

      const entrada = ALL_BLOG_POSTS.find((p) => p.slug === dir.name);
      expect(entrada, `${dir.name} no está en BLOG_DATA`).toBeDefined();
      expect(isoDate, `${dir.name}: ISO_DATE y BLOG_DATA.date no coinciden`).toBe(entrada!.date);
      comprobados++;
    }

    expect(comprobados).toBe(20);
  });
});
