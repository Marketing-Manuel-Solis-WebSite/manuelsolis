import { describe, it, expect } from 'vitest';
import { addInlineLinks, createInlineLinkState } from '../app/lib/blogInlineLinks';

/**
 * El enlazador contextual toca el HTML de artículos publicados, así que lo que
 * hay que vigilar no es que enlace: es que **no corrompa el marcado** y que no
 * se convierta en una granja de enlaces.
 *
 * Los dos fallos que puede tener son silenciosos: sustituir dentro de un
 * atributo (rompe la etiqueta y nadie lo ve hasta que la página se rompe) y
 * enlazar el mismo destino en cada párrafo (lee como relleno para buscadores).
 */
const st = () => createInlineLinkState();

describe('enlaza donde debe', () => {
  it('enlaza un término de área de práctica', () => {
    const out = addInlineLinks('Puede pedir la Visa U si cooperó.', 'es', st());
    expect(out).toContain('href="/es/servicios/visa-u"');
    expect(out).toContain('>Visa U</a>');
  });

  it('respeta el idioma en la ruta', () => {
    const out = addInlineLinks('You may apply for a Visa U.', 'en', st());
    expect(out).toContain('href="/en/servicios/visa-u"');
  });

  it('conserva el texto visible intacto', () => {
    const src = 'La solicitud de asilo tiene plazo.';
    const out = addInlineLinks(src, 'es', st());
    expect(out.replace(/<[^>]+>/g, '')).toBe(src);
  });
});

describe('no corrompe el marcado', () => {
  it('no sustituye dentro de un atributo', () => {
    // "Visa U" dentro de un title=""; si se sustituyera ahí, la etiqueta muere.
    const src = '<span title="Visa U y VAWA">Texto sin términos.</span>';
    const out = addInlineLinks(src, 'es', st());
    expect(out).toBe(src);
  });

  it('no enlaza dentro de un <a> que ya existe', () => {
    const src = '<a href="/es/otra">Visa U</a> y más texto.';
    const out = addInlineLinks(src, 'es', st());
    expect((out.match(/<a /g) || []).length).toBe(1);
  });

  it('no anida enlaces cuando el término aparece dentro y fuera de un <a>', () => {
    const src = '<a href="/x">Visa U</a> — hable de VAWA con nosotros.';
    const out = addInlineLinks(src, 'es', st());
    // El de dentro se respeta; VAWA sí se enlaza, y ninguno queda anidado.
    expect(out).toContain('href="/es/servicios/vawa"');
    expect(out).not.toMatch(/<a[^>]*>[^<]*<a /);
  });

  it('deja intacto el HTML sin términos', () => {
    const src = '<strong>Nada</strong> que enlazar aquí, ni una palabra.';
    expect(addInlineLinks(src, 'es', st())).toBe(src);
  });

  it('sobrevive a una etiqueta sin cerrar sin romper la salida', () => {
    const src = 'Texto con Visa U y una etiqueta <span mal formada';
    const out = addInlineLinks(src, 'es', st());
    expect(out).toContain('Visa U');
    expect(out).toContain('<span mal formada');
  });
});

describe('no es una granja de enlaces', () => {
  it('enlaza cada destino UNA sola vez por artículo', () => {
    const s = st();
    const a = addInlineLinks('Hable de la Visa U hoy.', 'es', s);
    const b = addInlineLinks('Otra vez la Visa U aquí.', 'es', s);
    expect(a).toContain('servicios/visa-u');
    expect(b).not.toContain('servicios/visa-u');
  });

  it('solo la primera aparición dentro del mismo párrafo', () => {
    const out = addInlineLinks('VAWA y otra vez VAWA en la misma frase.', 'es', st());
    expect((out.match(/<a /g) || []).length).toBe(1);
  });

  it('corta en 3 enlaces por artículo', () => {
    const s = st();
    const parrafos = [
      'Sobre la Visa U.',
      'Sobre VAWA.',
      'Sobre la solicitud de asilo.',
      'Sobre la petición familiar.',
      'Sobre lesiones personales.',
    ];
    const total = parrafos
      .map((p) => addInlineLinks(p, 'es', s))
      .join('')
      .match(/<a /g);
    expect((total || []).length).toBe(3);
  });
});
