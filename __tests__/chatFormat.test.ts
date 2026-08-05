import { describe, it, expect } from 'vitest';
import {
  formatAssistantMessage,
  wasInterrupted,
  STREAM_ERROR_MARKER,
  type ChatBlock,
  type InlineSegment,
} from '../app/lib/chatFormat';

/** Texto plano de un bloque, para comprobar que no se pierde ni un carácter. */
function textOf(segments: InlineSegment[]): string {
  return segments.map((s) => s.text).join('');
}

function paragraphs(blocks: ChatBlock[]): string[] {
  return blocks
    .filter((b): b is Extract<ChatBlock, { kind: 'paragraph' }> => b.kind === 'paragraph')
    .map((b) => textOf(b.segments));
}

function phonesIn(blocks: ChatBlock[]): { text: string; href: string }[] {
  const found: { text: string; href: string }[] = [];
  for (const block of blocks) {
    const groups = block.kind === 'paragraph' ? [block.segments] : block.items;
    for (const segments of groups) {
      for (const seg of segments) {
        if (seg.kind === 'phone') found.push({ text: seg.text, href: seg.href });
      }
    }
  }
  return found;
}

describe('formatAssistantMessage — estructura', () => {
  it('separa párrafos en las líneas en blanco', () => {
    const blocks = formatAssistantMessage('Primer párrafo.\n\nSegundo párrafo.');
    expect(paragraphs(blocks)).toEqual(['Primer párrafo.', 'Segundo párrafo.']);
  });

  it('une con espacio los saltos de línea simples, que son corte y no separación', () => {
    const blocks = formatAssistantMessage('Una frase\ncontinuada en la línea siguiente.');
    expect(paragraphs(blocks)).toEqual(['Una frase continuada en la línea siguiente.']);
  });

  it('agrupa los guiones consecutivos en una sola lista', () => {
    const blocks = formatAssistantMessage(
      'Necesita estos documentos:\n- Pasaporte\n- Acta de nacimiento\n- Comprobante de domicilio',
    );
    const lists = blocks.filter((b) => b.kind === 'list');
    expect(lists).toHaveLength(1);
    expect(lists[0].kind === 'list' && lists[0].items.map(textOf)).toEqual([
      'Pasaporte',
      'Acta de nacimiento',
      'Comprobante de domicilio',
    ]);
  });

  it('vuelve a abrir párrafo después de una lista', () => {
    const blocks = formatAssistantMessage('Pasos:\n- Uno\n- Dos\n\nY luego llámenos.');
    expect(blocks.map((b) => b.kind)).toEqual(['paragraph', 'list', 'paragraph']);
  });

  it('devuelve lista vacía con entrada vacía o en blanco', () => {
    expect(formatAssistantMessage('')).toEqual([]);
    expect(formatAssistantMessage('   \n\n  ')).toEqual([]);
  });

  it('convierte los pares de asteriscos en negrita', () => {
    const blocks = formatAssistantMessage('El plazo **no** es fijo.');
    expect(paragraphs(blocks)).toEqual(['El plazo no es fijo.']);
    const strong = blocks.flatMap((b) =>
      b.kind === 'paragraph' ? b.segments.filter((s) => s.kind === 'strong') : [],
    );
    expect(strong.map((s) => s.text)).toEqual(['no']);
  });

  it('descarta un asterisco doble sin cerrar, como el que llega a mitad del stream', () => {
    // Mientras la respuesta se escribe, la apertura llega antes que el cierre;
    // mostrarla dejaría un `**` suelto parpadeando en pantalla.
    const blocks = formatAssistantMessage('Llame al despacho: **Teléfono gener');
    expect(paragraphs(blocks)).toEqual(['Llame al despacho: Teléfono gener']);
  });

  it('enlaza un teléfono aunque venga dentro de una negrita', () => {
    const blocks = formatAssistantMessage('**Teléfono: (713) 701-1731**');
    expect(phonesIn(blocks).map((p) => p.href)).toEqual(['tel:+17137011731']);
  });
});

describe('formatAssistantMessage — teléfonos marcables', () => {
  it('enlaza el formato con paréntesis en E.164', () => {
    const phones = phonesIn(formatAssistantMessage('Llame al (713) 701-1731 hoy.'));
    expect(phones).toEqual([{ text: '(713) 701-1731', href: 'tel:+17137011731' }]);
  });

  it('enlaza el número gratuito con prefijo 1', () => {
    const phones = phonesIn(formatAssistantMessage('Marque 1-888-676-1238.'));
    expect(phones).toEqual([{ text: '1-888-676-1238', href: 'tel:+18886761238' }]);
  });

  it('enlaza varios números en la misma línea', () => {
    const phones = phonesIn(
      formatAssistantMessage('Sede: (713) 701-1731. Detenidos: (832) 598-0914.'),
    );
    expect(phones.map((p) => p.href)).toEqual(['tel:+17137011731', 'tel:+18325980914']);
  });

  it('enlaza teléfonos dentro de una lista', () => {
    const phones = phonesIn(formatAssistantMessage('- Houston: (713) 701-1731\n- Dallas: (214) 753-8315'));
    expect(phones.map((p) => p.href)).toEqual(['tel:+17137011731', 'tel:+12147538315']);
  });

  it('no confunde fechas, códigos postales ni cifras con teléfonos', () => {
    const nada = [
      'La audiencia es el 2026-08-05 a las 9:00.',
      'El código postal es 77011-1234.',
      'Más de 50,000 casos ganados en 35 años.',
    ];
    for (const texto of nada) {
      expect(phonesIn(formatAssistantMessage(texto))).toEqual([]);
    }
  });

  it('conserva el texto íntegro alrededor del enlace', () => {
    // Si el troceado perdiera o duplicara un carácter, la respuesta saldría
    // corrupta en pantalla sin que fallara nada más.
    const original = 'Puede llamarnos al (713) 701-1731 o escribirnos por WhatsApp.';
    const blocks = formatAssistantMessage(original);
    expect(paragraphs(blocks)).toEqual([original]);
  });
});

describe('formatAssistantMessage — corte a mitad del stream', () => {
  it('detecta el marcador y no lo muestra', () => {
    const raw = `Le explico el proceso.${STREAM_ERROR_MARKER}`;
    expect(wasInterrupted(raw)).toBe(true);
    expect(paragraphs(formatAssistantMessage(raw))).toEqual(['Le explico el proceso.']);
  });

  it('no marca interrupción en una respuesta normal', () => {
    expect(wasInterrupted('Respuesta completa.')).toBe(false);
  });
});

describe('formatAssistantMessage — sin superficie de inyección', () => {
  it('trata el HTML como texto literal, sin interpretarlo', () => {
    // El modelo puede repetir lo que escriba el visitante. El formateador
    // devuelve datos y el componente los renderiza como nodos de React, así que
    // esto tiene que sobrevivir como texto y no como etiqueta.
    const hostil = '<img src=x onerror="alert(1)"> y <script>alert(2)</script>';
    const blocks = formatAssistantMessage(hostil);
    expect(paragraphs(blocks)).toEqual([hostil]);
    for (const block of blocks) {
      if (block.kind !== 'paragraph') continue;
      for (const seg of block.segments) {
        expect(seg.kind === 'text' || seg.kind === 'phone').toBe(true);
      }
    }
  });
});
