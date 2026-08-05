/**
 * Convierte la respuesta del asistente en bloques listos para renderizar.
 *
 * Antes el widget metía el texto crudo en un `<div>`, así que todo llegaba como
 * un solo párrafo corrido: por eso el prompt del servidor le prohibía al modelo
 * usar listas y negritas, y por eso el endpoint remataba con cuatro
 * `String.replace` que borraban guiones y asteriscos y volvían a pegar los
 * saltos de línea. Era un apaño de formato disfrazado de regla de estilo.
 * Renderizando la estructura de verdad, el modelo puede enumerar pasos o
 * documentos —que es como se lee mejor una respuesta legal— y el postproceso
 * desaparece.
 *
 * Devuelve datos, no HTML: el componente construye elementos de React con ellos.
 * Un `dangerouslySetInnerHTML` aquí sería una inyección esperando a que el
 * modelo repita cualquier cosa que le escriba el visitante.
 */

export type InlineSegment =
  | { kind: 'text'; text: string }
  | { kind: 'strong'; text: string }
  | { kind: 'phone'; text: string; href: string };

export type ChatBlock =
  | { kind: 'paragraph'; segments: InlineSegment[] }
  | { kind: 'list'; items: InlineSegment[][] };

/**
 * Marcador que el endpoint inyecta cuando el stream se corta a mitad. Va fuera
 * de banda porque, una vez enviadas las cabeceras con 200, no queda forma de
 * comunicar el fallo por HTTP. Debe coincidir con STREAM_ERROR_MARKER en
 * app/api/chat/route.ts.
 */
export const STREAM_ERROR_MARKER = '\u0000';

/**
 * Teléfonos de EE. UU. en los formatos que el asistente escribe de verdad:
 * "(713) 701-1731", "713-701-1731", "1-888-676-1238", "1 888 676 1238".
 *
 * Exige la forma 3-3-4 con separadores o paréntesis, así que no captura fechas
 * ("2026-08-05" tiene ocho dígitos), códigos postales ni A-numbers. Un
 * A-number sí llegaría a nueve dígitos, uno menos de los diez que pide esto.
 */
const PHONE_RE = /(?:\+?1[\s.\-‑]?)?(?:\(\d{3}\)|\d{3})[\s.\-‑]?\d{3}[\s.\-‑]?\d{4}/g;

/** `tel:` en E.164; sin eso, iOS a veces marca mal los números con paréntesis. */
function telHref(display: string): string | null {
  const digits = display.replace(/\D/g, '');
  if (digits.length === 10) return `tel:+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `tel:+${digits}`;
  return null;
}

/** Parte un fragmento en texto y teléfonos enlazables. */
function splitPhones(text: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  let cursor = 0;

  // `matchAll` sobre una regex global: no se comparte lastIndex entre llamadas.
  for (const match of text.matchAll(PHONE_RE)) {
    const start = match.index ?? 0;
    const raw = match[0];
    const href = telHref(raw);
    if (!href) continue;
    if (start > cursor) {
      segments.push({ kind: 'text', text: text.slice(cursor, start) });
    }
    segments.push({ kind: 'phone', text: raw, href });
    cursor = start + raw.length;
  }

  if (cursor < text.length) {
    segments.push({ kind: 'text', text: text.slice(cursor) });
  }
  return segments;
}

const BOLD_RE = /\*\*([\s\S]+?)\*\*/g;

/**
 * Separa los tramos en negrita de los normales.
 *
 * El prompt no le pide negritas al modelo, pero las usa de forma constante para
 * los encabezados de "Teléfono general:" y similares, y en un widget estrecho
 * ayudan a leer. Un `**` sin pareja —lo normal a mitad del streaming, cuando
 * solo ha llegado la apertura— se descarta en lugar de mostrarse: así el texto
 * se ve igual de limpio en cualquier punto del stream.
 */
function splitBold(line: string): { text: string; strong: boolean }[] {
  const parts: { text: string; strong: boolean }[] = [];
  let cursor = 0;

  for (const match of line.matchAll(BOLD_RE)) {
    const start = match.index ?? 0;
    if (start > cursor) parts.push({ text: line.slice(cursor, start), strong: false });
    parts.push({ text: match[1], strong: true });
    cursor = start + match[0].length;
  }
  if (cursor < line.length) parts.push({ text: line.slice(cursor), strong: false });

  return parts
    .map((part) => ({
      strong: part.strong,
      text: part.strong ? part.text : part.text.split('**').join(''),
    }))
    .filter((part) => part.text.length > 0);
}

/** Parte una línea en negritas, teléfonos marcables y texto llano. */
function splitInline(line: string): InlineSegment[] {
  const segments: InlineSegment[] = [];

  for (const part of splitBold(line)) {
    for (const seg of splitPhones(part.text)) {
      // Un teléfono se enlaza aunque venga dentro de una negrita: poder marcarlo
      // vale más que el grosor de la letra.
      if (seg.kind === 'phone' || !part.strong) segments.push(seg);
      else segments.push({ kind: 'strong', text: seg.text });
    }
  }

  return segments.length > 0 ? segments : [{ kind: 'text', text: line }];
}

const BULLET_RE = /^\s*[-–—*•]\s+/;

/** Quita el marcador de error y normaliza los saltos de línea. */
function normalize(raw: string): string {
  return raw
    .split(STREAM_ERROR_MARKER)
    .join('')
    .replace(/\r\n?/g, '\n')
    .trim();
}

export function formatAssistantMessage(raw: string): ChatBlock[] {
  const text = normalize(raw);
  if (!text) return [];

  const blocks: ChatBlock[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    // Un salto simple dentro de un párrafo es un corte de línea del modelo, no
    // una separación: se une con espacio para que no queden líneas huérfanas.
    blocks.push({ kind: 'paragraph', segments: splitInline(paragraph.join(' ')) });
    paragraph = [];
  };

  const flushList = () => {
    if (list.length === 0) return;
    blocks.push({ kind: 'list', items: list.map(splitInline) });
    list = [];
  };

  for (const line of text.split('\n')) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (BULLET_RE.test(trimmed)) {
      flushParagraph();
      list.push(trimmed.replace(BULLET_RE, '').trim());
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  return blocks;
}

/** True si el endpoint avisó de que la respuesta se cortó a mitad del stream. */
export function wasInterrupted(raw: string): boolean {
  return raw.includes(STREAM_ERROR_MARKER);
}
