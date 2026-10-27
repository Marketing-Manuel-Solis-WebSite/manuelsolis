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

describe('scroll al navegar', () => {
  it('si <html> usa scroll suave, el root layout lleva data-scroll-behavior="smooth"', () => {
    const css = read('app/globals.css');
    const smooth = /html\s*\{[^}]*scroll-behavior:\s*smooth/.test(css);
    if (!smooth) return;
    // El JSX real, no las menciones a `<html lang>` de los comentarios.
    const htmlTag = read('app/layout.tsx').match(/^\s*<html\s[^>]*=[^>]*>/m)?.[0] ?? '';
    expect(htmlTag).toContain('data-scroll-behavior="smooth"');
  });
});
