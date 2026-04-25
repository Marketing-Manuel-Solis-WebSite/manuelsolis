import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { newsletters } from '../../../lib/newsletterData';
import {
  ADMIN_COOKIE_NAME,
  verifySessionToken,
} from '../../../lib/newsletter/auth';
import AdminClient from './AdminClient';
import AdminLogin from './AdminLogin';

export const metadata: Metadata = {
  title: 'Newsletter Blast · Admin',
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

export default async function AdminNewsletterPage({ params, searchParams }: Props) {
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

  const editions = newsletters.map((n) => ({
    slug: n.slug,
    titleEs: n.title.es,
    titleEn: n.title.en,
    date: n.date,
    descriptionEs: n.description.es,
    descriptionEn: n.description.en,
    sectionsCountEs: n.content.es.length,
    sectionsCountEn: n.content.en.length,
  }));

  return <AdminClient lang={lang} editions={editions} />;
}
