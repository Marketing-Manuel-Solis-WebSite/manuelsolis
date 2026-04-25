import type { Metadata } from 'next';
import { newsletters } from '../../../lib/newsletterData';
import AdminClient from './AdminClient';

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
};

export default async function AdminNewsletterPage({ params }: Props) {
  await params;

  const editions = newsletters.map((n) => ({
    slug: n.slug,
    titleEs: n.title.es,
    titleEn: n.title.en,
    date: n.date,
  }));

  return <AdminClient editions={editions} />;
}
