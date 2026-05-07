import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import {
  ADMIN_COOKIE_NAME,
  verifySessionToken,
} from '../../../lib/newsletter/auth';
import AdminLogin from '../newsletter/AdminLogin';
import AnalyticsDashboard from './AnalyticsDashboard';

export const metadata: Metadata = {
  title: 'Analytics — Manuel Solis Law',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function AnalyticsPage({ params, searchParams }: Props) {
  const { lang: rawLang } = await params;
  const { error } = await searchParams;
  const lang: 'es' | 'en' = rawLang === 'en' ? 'en' : 'es';

  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(ADMIN_COOKIE_NAME)?.value ?? null;
  const isAuthenticated = verifySessionToken(cookieValue);

  if (!isAuthenticated) {
    return (
      <AdminLogin
        lang={lang}
        hasError={Boolean(error)}
        errorKind={error === 'server' ? 'server' : 'invalid'}
      />
    );
  }

  return <AnalyticsDashboard lang={lang} />;
}
