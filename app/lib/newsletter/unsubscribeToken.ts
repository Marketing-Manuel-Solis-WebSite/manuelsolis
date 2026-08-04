import { createHmac, timingSafeEqual } from 'node:crypto';
import type { Language } from './types';

const SITE_URL = 'https://www.manuelsolis.com';

// 32 hex chars (128 bits) is unguessable and short enough that mail clients do
// not fold the List-Unsubscribe header, which would corrupt the URL.
const TOKEN_LENGTH = 32;

function getSecret(): string | null {
  return (
    process.env.NEWSLETTER_UNSUBSCRIBE_SECRET ||
    process.env.NEWSLETTER_BLAST_SECRET ||
    null
  );
}

export function normalizeUnsubscribeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isUnsubscribeSigningConfigured(): boolean {
  return getSecret() !== null;
}

export function signUnsubscribeToken(email: string): string | null {
  const secret = getSecret();
  const normalized = normalizeUnsubscribeEmail(email);
  if (!secret || !normalized) return null;
  return createHmac('sha256', secret)
    .update(normalized)
    .digest('hex')
    .slice(0, TOKEN_LENGTH);
}

export function verifyUnsubscribeToken(
  email: string,
  token: string | null | undefined,
): boolean {
  if (!token) return false;
  const expected = signUnsubscribeToken(email);
  if (!expected || expected.length !== token.length) return false;
  try {
    return timingSafeEqual(
      Buffer.from(expected, 'utf8'),
      Buffer.from(token, 'utf8'),
    );
  } catch {
    return false;
  }
}

// Confirmation page linked from the visible footer of every email.
export function buildUnsubscribePageUrl(language: Language, email: string): string {
  const url = new URL(`/${language}/newsletter/unsubscribe`, SITE_URL);
  url.searchParams.set('email', normalizeUnsubscribeEmail(email));
  const token = signUnsubscribeToken(email);
  if (token) url.searchParams.set('t', token);
  return url.toString();
}

// Target of the List-Unsubscribe header: the only URL that accepts the
// one-click POST from Gmail/Yahoo (RFC 8058). A GET on it redirects a human to
// the confirmation page above.
export function buildUnsubscribeApiUrl(language: Language, email: string): string {
  const url = new URL('/api/newsletter/unsubscribe', SITE_URL);
  url.searchParams.set('email', normalizeUnsubscribeEmail(email));
  const token = signUnsubscribeToken(email);
  if (token) url.searchParams.set('t', token);
  url.searchParams.set('lang', language);
  return url.toString();
}
