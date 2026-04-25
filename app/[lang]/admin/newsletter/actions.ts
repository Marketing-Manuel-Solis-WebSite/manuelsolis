'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  ADMIN_COOKIE_NAME,
  buildSessionToken,
  verifyBlastSecret,
} from '../../../lib/newsletter/auth';

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 4;

export async function loginAction(formData: FormData) {
  const password = String(formData.get('password') || '');
  const lang = String(formData.get('lang') || 'es');

  if (!verifyBlastSecret(password)) {
    redirect(`/${lang === 'en' ? 'en' : 'es'}/admin/newsletter?error=invalid`);
  }

  const token = buildSessionToken();
  if (!token) {
    redirect(`/${lang === 'en' ? 'en' : 'es'}/admin/newsletter?error=server`);
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

  redirect(`/${lang === 'en' ? 'en' : 'es'}/admin/newsletter`);
}

export async function logoutAction(formData: FormData) {
  const lang = String(formData.get('lang') || 'es');
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  redirect(`/${lang === 'en' ? 'en' : 'es'}/admin/newsletter`);
}
