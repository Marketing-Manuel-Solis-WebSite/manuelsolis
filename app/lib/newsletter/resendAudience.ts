import { Resend } from 'resend';
import type { ResendContact } from './types';

export function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not configured');
  return new Resend(key);
}

export function getAudienceId(): string {
  const id = process.env.RESEND_AUDIENCE_ID;
  if (!id) throw new Error('RESEND_AUDIENCE_ID is not configured');
  return id;
}

type ResendContactRaw = {
  id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  unsubscribed?: boolean;
};

export async function fetchActiveSubscribers(): Promise<ResendContact[]> {
  const resend = getResend();
  const audienceId = getAudienceId();

  const result = await resend.contacts.list({ audienceId });
  const raw = (result.data?.data ?? []) as ResendContactRaw[];

  return raw
    .filter((c) => c.unsubscribed !== true)
    .filter((c) => isValidEmail(c.email))
    .map((c) => ({
      id: c.id,
      email: c.email,
      first_name: c.first_name ?? undefined,
      last_name: c.last_name ?? undefined,
      unsubscribed: Boolean(c.unsubscribed),
    }));
}

function isValidEmail(email: string | undefined | null): email is string {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
