/**
 * Validación de los campos libres de /api/newsletter/subscribe.
 *
 * firstName llega del formulario público y acaba en el contacto de Resend y en
 * el saludo del correo de bienvenida, así que se limpia antes de usarlo:
 * etiquetas y corchetes angulares fuera, caracteres de control fuera, espacios
 * colapsados y tope de FIRST_NAME_MAX. Un nombre largo se recorta en vez de
 * rechazarse: no vale la pena perder una alta por eso.
 */

export type SubscribeLanguage = 'es' | 'en';

export const FIRST_NAME_MAX = 60;

const DEFAULT_LANGUAGE: SubscribeLanguage = 'es';

// C0, DEL, C1 (Cc) y los separadores de línea/párrafo Unicode (Zl, Zp).
const CONTROL_CHARS = /[\p{Cc}\p{Zl}\p{Zp}]/gu;

/**
 * Devuelve el nombre limpio ('' si falta o queda vacío), o null si el valor no
 * es un string y la petición debe rechazarse.
 */
export function sanitizeFirstName(value: unknown): string | null {
  if (value === undefined || value === null) return '';
  if (typeof value !== 'string') return null;

  const cleaned = value
    .replace(/<[^>]*>/g, ' ')
    .replace(/[<>]/g, '')
    .replace(CONTROL_CHARS, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Por puntos de código, para no partir un emoji o una letra compuesta.
  return Array.from(cleaned).slice(0, FIRST_NAME_MAX).join('').trim();
}

/**
 * 'es' | 'en' tal cual; ausente → 'es' (el default de siempre); cualquier otro
 * valor → null para rechazar la petición.
 */
export function parseLanguage(value: unknown): SubscribeLanguage | null {
  if (value === undefined || value === null) return DEFAULT_LANGUAGE;
  return value === 'es' || value === 'en' ? value : null;
}
