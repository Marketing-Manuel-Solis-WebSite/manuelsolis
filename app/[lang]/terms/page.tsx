import { redirect } from 'next/navigation';

// /terms is a duplicate of /terminos — redirect to canonical URL
export default async function TermsRedirect({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  redirect(`/${lang}/terminos`);
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
