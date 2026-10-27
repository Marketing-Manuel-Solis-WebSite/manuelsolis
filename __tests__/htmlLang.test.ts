import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';

/**
 * <html lang> tiene que salir del SERVIDOR con el locale de la ruta.
 *
 * Hasta oct-2026 había un app/layout.tsx por encima de [lang] que no recibía
 * params: las rutas /en/* se servían con lang="es" y solo un script de cliente
 * lo corregía (WCAG 3.1.1; lo que leen crawlers y lectores de pantalla antes
 * del JS). La solución es que app/[lang]/layout.tsx sea el root layout y pinte
 * <html lang={locale}> desde params, sin headers() para no perder el prerender.
 *
 * Esto vigila la estructura en el código; scripts/seo-check.mjs comprueba
 * después del build que cada HTML prerenderizado de /es y /en lleva su lang.
 */
const ROOT = process.cwd();
const read = (p: string) => readFileSync(path.join(ROOT, p), 'utf8');
const LANG_LAYOUT = 'app/[lang]/layout.tsx';

// Quita comentarios para no confundir el JSX real con las menciones en prosa.
// Primero los de línea: un "/en/*" dentro de uno abriría un falso bloque.
const code = (src: string) => src.replace(/^\s*\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');

describe('<html lang> por locale desde el servidor', () => {
  it('no existe app/layout.tsx (si existiera, [lang]/layout dejaría de ser root layout)', () => {
    expect(existsSync(path.join(ROOT, 'app/layout.tsx'))).toBe(false);
  });

  it('app/[lang]/layout.tsx pinta <html lang> con el locale de params', () => {
    const src = code(read(LANG_LAYOUT));
    expect(src).toMatch(/const \{ lang \} = await params;/);
    expect(src).toMatch(/const currentLang = \(lang === 'es' \|\| lang === 'en'\)/);
    expect(src).toMatch(/<html\s+lang=\{currentLang\}/);
    expect(src).toMatch(/<body[\s>]/);
  });

  it('el root layout del locale no lee headers()/cookies() (volvería dinámico todo el sitio)', () => {
    const src = code(read(LANG_LAYOUT));
    expect(src).not.toMatch(/from ['"]next\/headers['"]/);
    expect(src).not.toMatch(/\b(headers|cookies)\(\)/);
  });

  it('los locales se resuelven en build: generateStaticParams es/en y dynamicParams = false', () => {
    const src = code(read(LANG_LAYOUT));
    expect(src).toMatch(/export const dynamicParams = false;/);
    expect(src).toMatch(/export function generateStaticParams\(\)/);
    expect(src).toMatch(/\{ lang: 'en' \}/);
    expect(src).toMatch(/\{ lang: 'es' \}/);
  });

  it('la 404 global tiene su propio <html> con CSS y el flag globalNotFound está activo', () => {
    const src = code(read('app/global-not-found.tsx'));
    expect(src).toMatch(/import '\.\/globals\.css';/);
    expect(src).toMatch(/<html\s+lang="es"/);
    expect(code(read('next.config.ts'))).toMatch(/globalNotFound:\s*true/);
  });

  it('los notFound() dentro de [lang] tienen boundary propio', () => {
    expect(existsSync(path.join(ROOT, 'app/[lang]/not-found.tsx'))).toBe(true);
    expect(existsSync(path.join(ROOT, 'app/not-found.tsx'))).toBe(false);
  });

  it('toda página fuera de [lang] cuelga de un root layout propio', () => {
    const orphans: string[] = [];
    (function walk(dir: string) {
      for (const entry of readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
        const rel = path.posix.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (rel === 'app/[lang]' || ['api', 'components', 'lib', 'context'].includes(entry.name)) continue;
          walk(rel);
        } else if (/^page\.(tsx|ts|jsx|js)$/.test(entry.name)) {
          // Busca un layout.tsx entre la carpeta de la página y app/ (exclusive).
          let d = dir;
          let found = false;
          while (d !== 'app') {
            if (existsSync(path.join(ROOT, d, 'layout.tsx'))) { found = true; break; }
            d = path.posix.dirname(d);
          }
          if (!found) orphans.push(rel);
        }
      }
    })('app');
    expect(orphans).toEqual([]);
  });
});
