import { createHash, createHmac, timingSafeEqual } from 'crypto';

export const ADMIN_COOKIE_NAME = 'msl_admin';

/** Vida útil de la sesión de admin, aplicada en el servidor y en la cookie. */
export const SESSION_TTL_MS = 1000 * 60 * 60 * 4;

/** Subir la versión invalida de golpe todas las sesiones ya emitidas. */
const SESSION_VERSION = 'msl-admin-session-v2';

/**
 * timingSafeEqual exige buffers de la misma longitud, y comparar longitudes
 * antes filtraría el tamaño del secreto. Los digests siempre miden 32 bytes,
 * así que la comparación es de tiempo constante para cualquier entrada.
 */
function digestEquals(a: string, b: string): boolean {
  return timingSafeEqual(
    createHash('sha256').update(a, 'utf8').digest(),
    createHash('sha256').update(b, 'utf8').digest(),
  );
}

export function verifyBlastSecret(providedToken: string | null): boolean {
  const expected = process.env.NEWSLETTER_BLAST_SECRET;
  if (!expected || !providedToken) return false;
  return digestEquals(expected, providedToken);
}

export function extractBearer(authHeader: string | null): string | null {
  if (!authHeader) return null;
  const [scheme, token] = authHeader.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) return null;
  return token.trim();
}

/**
 * Auth de automatización para los endpoints admin de lectura.
 * La key solo se acepta por cabecera: en query string quedaría registrada
 * en los logs de Vercel, el historial del navegador y proxies intermedios.
 */
export function verifyConversionsApiKey(
  authHeader: string | null,
  apiKeyHeader: string | null,
): boolean {
  const expected = process.env.CONVERSIONS_API_KEY;
  if (!expected) return false;
  const provided = extractBearer(authHeader) ?? (apiKeyHeader?.trim() || null);
  if (!provided) return false;
  return digestEquals(expected, provided);
}

function signSession(expiresAt: number, secret: string): string {
  return createHmac('sha256', secret)
    .update(`${SESSION_VERSION}:${expiresAt}`)
    .digest('hex');
}

export function buildSessionToken(): string | null {
  const secret = process.env.NEWSLETTER_BLAST_SECRET;
  if (!secret) return null;
  const expiresAt = Date.now() + SESSION_TTL_MS;
  return `${expiresAt}.${signSession(expiresAt, secret)}`;
}

export function verifySessionToken(token: string | null | undefined): boolean {
  if (!token) return false;
  const secret = process.env.NEWSLETTER_BLAST_SECRET;
  if (!secret) return false;

  const separator = token.indexOf('.');
  if (separator < 1) return false;
  const expiresRaw = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  // Hasta 15 dígitos: sigue dentro del rango de entero seguro de JS.
  if (!/^\d{1,15}$/.test(expiresRaw) || !signature) return false;

  const expiresAt = Number(expiresRaw);
  if (expiresAt <= Date.now()) return false;

  return digestEquals(signSession(expiresAt, secret), signature);
}

export function isSameOriginRequest(originHeader: string | null, host: string | null): boolean {
  if (!originHeader || !host) return true;
  try {
    const origin = new URL(originHeader);
    return origin.host === host;
  } catch {
    return false;
  }
}
