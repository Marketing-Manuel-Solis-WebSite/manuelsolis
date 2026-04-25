'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  ADMIN_COOKIE_NAME,
  buildSessionToken,
  verifyBlastSecret,
} from '../../../lib/newsletter/auth';

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 4;

function safeNext(raw: string, lang: 'es' | 'en'): string {
  const fallback = `/${lang}/admin`;
  if (!raw) return fallback;
  if (!raw.startsWith('/')) return fallback;
  if (raw.startsWith('//')) return fallback;
  if (!raw.startsWith(`/${lang}/admin`)) return fallback;
  return raw;
}

export async function loginAction(formData: FormData) {
  const password = String(formData.get('password') || '');
  const langRaw = String(formData.get('lang') || 'es');
  const lang: 'es' | 'en' = langRaw === 'en' ? 'en' : 'es';
  const nextRaw = String(formData.get('next') || '');
  const next = safeNext(nextRaw, lang);

  if (!verifyBlastSecret(password)) {
    redirect(`${next}?error=invalid`);
  }

  const token = buildSessionToken();
  if (!token) {
    redirect(`${next}?error=server`);
  }

  const cookieStore = await cookies();
  cookieStore.set({
    name: ADMIN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE_SECONDS,
  });

  redirect(next);
}

export async function logoutAction(formData: FormData) {
  const langRaw = String(formData.get('lang') || 'es');
  const lang: 'es' | 'en' = langRaw === 'en' ? 'en' : 'es';
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  redirect(`/${lang}/admin`);
}
