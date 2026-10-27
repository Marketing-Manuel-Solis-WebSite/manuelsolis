import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';

/**
 * Navegar a una página nueva tiene que dejarla ARRIBA.
 *
 * globals.css pone `scroll-behavior: smooth` en <html>. Desde Next 16 el router
 * solo lo neutraliza durante una navegación si <html> lleva
 * `data-scroll-behavior="smooth"`. Sin el atributo, el `scrollTop = 0` del
 * router se anima y el `main.focus()` que hace a continuación (todas las
 * páginas tienen <main tabIndex={-1}>) lo cancela con su propio scroll: al
 * llegar desde el fondo de otra página —menú, footer— la nueva se quedaba a
 * media altura o en el footer. Se vio en las fichas de oficina (oct-2026).
 */
const read = (p: string) => readFileSync(path.join(process.cwd(), p), 'utf8');

/**
 * Hay más de un archivo que pinta <html>: un root layout por locale
 * (app/[lang]/layout.tsx), el de "/" (app/(root)/layout.tsx) y la 404 global
 * (app/global-not-found.tsx). Los tres se listan a mano para que borrar o
 * renombrar uno haga fallar el test en vez de dejarlo sin cubrir.
 */
const HTML_FILES = [
  'app/[lang]/layout.tsx',
  'app/(root)/layout.tsx',
  'app/global-not-found.tsx',
];

describe('scroll al navegar', () => {
  it.each(HTML_FILES)(
    'si <html> usa scroll suave, %s lleva data-scroll-behavior="smooth"',
    (file) => {
      const css = read('app/globals.css');
      const smooth = /html\s*\{[^}]*scroll-behavior:\s*smooth/.test(css);
      if (!smooth) return;
      // El JSX real, no las menciones a `<html lang>` de los comentarios.
      const htmlTag = read(file).match(/^\s*<html\s[^>]*=[^>]*>/m)?.[0] ?? '';
      expect(htmlTag).toContain('data-scroll-behavior="smooth"');
    },
  );
});
