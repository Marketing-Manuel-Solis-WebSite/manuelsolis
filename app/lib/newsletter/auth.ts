import { createHmac, timingSafeEqual } from 'crypto';

export const ADMIN_COOKIE_NAME = 'msl_admin';
const SESSION_PAYLOAD = 'msl-admin-session-v1';

export function verifyBlastSecret(providedToken: string | null): boolean {
  const expected = process.env.NEWSLETTER_BLAST_SECRET;
  if (!expected || !providedToken) return false;
  if (expected.length !== providedToken.length) return false;
  try {
    return timingSafeEqual(
      Buffer.from(expected, 'utf8'),
      Buffer.from(providedToken, 'utf8'),
    );
  } catch {
    return false;
  }
}

export function extractBearer(authHeader: string | null): string | null {
  if (!authHeader) return null;
  const [scheme, token] = authHeader.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) return null;
  return token.trim();
}

export function buildSessionToken(): string | null {
  const secret = process.env.NEWSLETTER_BLAST_SECRET;
  if (!secret) return null;
  return createHmac('sha256', secret).update(SESSION_PAYLOAD).digest('hex');
}

export function verifySessionToken(token: string | null | undefined): boolean {
  if (!token) return false;
  const expected = buildSessionToken();
  if (!expected || expected.length !== token.length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected, 'utf8'), Buffer.from(token, 'utf8'));
  } catch {
    return false;
  }
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
