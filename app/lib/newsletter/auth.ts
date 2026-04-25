import { timingSafeEqual } from 'crypto';

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
