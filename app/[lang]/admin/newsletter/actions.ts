'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { rateLimit } from '../../../lib/rateLimit';
import {
  ADMIN_COOKIE_NAME,
  buildSessionToken,
  SESSION_TTL_MS,
  verifyBlastSecret,
} from '../../../lib/newsletter/auth';

const COOKIE_MAX_AGE_SECONDS = Math.floor(SESSION_TTL_MS / 1000);
const LOGIN_ATTEMPTS_PER_WINDOW = 5;
const LOGIN_WINDOW_MS = 300000;

function safeNext(raw: string, lang: 'es' | 'en'): string {
  const fallback = `/${lang}/admin`;
  if (!raw) return fallback;
  if (!raw.startsWith('/')) return fallback;
  if (raw.startsWith('//')) return fallback;
  if (!raw.startsWith(`/${lang}/admin`)) return fallback;
  return raw;
}

async function requestIp(): Promise<string> {
  const headerList = await headers();
  return (
    headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headerList.get('x-real-ip') ||
    'anonymous'
  );
}

function logLoginEvent(event: string, ip: string, next: string) {
  console.warn(
    JSON.stringify({
      event,
      endpoint: next,
      timestamp: new Date().toISOString(),
      ip,
    }),
  );
}

export async function loginAction(formData: FormData) {
  const password = String(formData.get('password') || '');
  const langRaw = String(formData.get('lang') || 'es');
  const lang: 'es' | 'en' = langRaw === 'en' ? 'en' : 'es';
  const nextRaw = String(formData.get('next') || '');
  const next = safeNext(nextRaw, lang);

  const ip = await requestIp();
  const { success: withinLimit } = rateLimit(
    `admin-login:${ip}`,
    LOGIN_ATTEMPTS_PER_WINDOW,
    LOGIN_WINDOW_MS,
  );
  if (!withinLimit) {
    logLoginEvent('admin_login_rate_limited', ip, next);
    redirect(`${next}?error=ratelimited`);
  }

  if (!verifyBlastSecret(password)) {
    logLoginEvent('admin_login_failed', ip, next);
    redirect(`${next}?error=invalid`);
  }

  const token = buildSessionToken();
  if (!token) {
    logLoginEvent('admin_login_misconfigured', ip, next);
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
