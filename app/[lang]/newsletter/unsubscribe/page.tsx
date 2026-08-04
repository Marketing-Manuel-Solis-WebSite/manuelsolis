import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ email?: string; t?: string; state?: string }>;
};

// The page reads the email and the signed token from the query string, so it
// can never be prerendered.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  return {
    title: isEs ? 'Cancelar suscripción' : 'Unsubscribe',
    description: isEs
      ? 'Cancela tu suscripción al newsletter de las Oficinas Legales de Manuel Solis.'
      : 'Unsubscribe from the Manuel Solis Law Offices newsletter.',
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false },
    },
  };
}

type UnsubscribeState = 'confirm' | 'missing' | 'invalid' | 'done' | 'error';

const copy = {
  es: {
    eyebrow: 'Newsletter',
    confirmTitle: 'Cancelar tu suscripción',
    confirmBody: (email: string) =>
      `Vas a dejar de recibir el newsletter de las Oficinas Legales de Manuel Solis en ${email}. Confirma abajo para completar la baja.`,
    noEmailBody:
      'Escribe el correo con el que te suscribiste y daremos de baja esa dirección.',
    invalidNotice: 'Ese correo no parece válido. Revísalo e inténtalo de nuevo.',
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'tu@correo.com',
    submit: 'Confirmar baja',
    keep: 'Prefiero seguir suscrito',
    doneTitle: 'Suscripción cancelada',
    doneBody:
      'Ya no recibirás más correos del newsletter. Si cambias de opinión, puedes volver a suscribirte cuando quieras.',
    errorTitle: 'No pudimos completar la baja',
    errorBody:
      'Ocurrió un problema al procesar tu solicitud. Vuelve a intentarlo en unos minutos.',
    note:
      'Esto solo afecta al newsletter. Si tienes un caso con nosotros, tu abogado seguirá en contacto contigo.',
    backToNewsletter: 'Ver el newsletter',
    backHome: 'Ir al inicio',
  },
  en: {
    eyebrow: 'Newsletter',
    confirmTitle: 'Unsubscribe',
    confirmBody: (email: string) =>
      `You are about to stop receiving the Manuel Solis Law Offices newsletter at ${email}. Confirm below to complete the request.`,
    noEmailBody:
      'Enter the email address you subscribed with and we will unsubscribe it.',
    invalidNotice: 'That email does not look valid. Please check it and try again.',
    emailLabel: 'Email address',
    emailPlaceholder: 'you@email.com',
    submit: 'Confirm unsubscribe',
    keep: 'I would rather stay subscribed',
    doneTitle: 'You have been unsubscribed',
    doneBody:
      'You will no longer receive newsletter emails. If you change your mind, you can subscribe again at any time.',
    errorTitle: 'We could not complete the request',
    errorBody:
      'Something went wrong while processing your request. Please try again in a few minutes.',
    note:
      'This only affects the newsletter. If you have a case with us, your attorney will stay in touch.',
    backToNewsletter: 'See the newsletter',
    backHome: 'Go to homepage',
  },
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function resolveState(
  raw: string | undefined,
  hasEmail: boolean,
  malformedEmail: boolean,
): UnsubscribeState {
  if (raw === 'done') return 'done';
  if (raw === 'error') return 'error';
  if (raw === 'invalid' || malformedEmail) return 'invalid';
  if (raw === 'missing') return 'missing';
  return hasEmail ? 'confirm' : 'missing';
}

export default async function NewsletterUnsubscribePage({
  params,
  searchParams,
}: Props) {
  const { lang } = await params;
  const isEs = lang === 'es';
  const t = isEs ? copy.es : copy.en;

  const query = await searchParams;
  const requestedEmail =
    typeof query.email === 'string'
      ? query.email.trim().toLowerCase().slice(0, 254)
      : '';
  // Only echo back an address that is actually an address: the value travels in
  // the URL, so anything else would be attacker-chosen copy on our page.
  const email = EMAIL_PATTERN.test(requestedEmail) ? requestedEmail : '';
  const token = typeof query.t === 'string' ? query.t.slice(0, 128) : '';
  const state = resolveState(
    query.state,
    Boolean(email),
    Boolean(requestedEmail) && !email,
  );

  const heading =
    state === 'done'
      ? t.doneTitle
      : state === 'error'
        ? t.errorTitle
        : t.confirmTitle;

  const body =
    state === 'done'
      ? t.doneBody
      : state === 'error'
        ? t.errorBody
        : email
          ? t.confirmBody(email)
          : t.noEmailBody;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#001540]">
        <section className="relative pt-[160px] pb-24 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{ backgroundImage: 'url(/noise.png)' }}
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-[#B2904D]/15 blur-[80px] rounded-full opacity-20" />

          <div className="relative z-10 max-w-xl mx-auto px-4">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-6 md:p-10">
              <p className="text-xs uppercase tracking-[2px] text-[#B2904D] font-semibold mb-4">
                {t.eyebrow}
              </p>

              <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                {heading}
              </h1>

              <p className="text-blue-200/60 leading-relaxed break-words">
                {body}
              </p>

              {state === 'invalid' && (
                <p className="mt-4 text-sm text-[#B2904D]">{t.invalidNotice}</p>
              )}

              {state === 'done' ? (
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/${lang}/newsletter`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#B2904D]/10 border border-[#B2904D]/30 text-[#B2904D] text-sm font-medium hover:bg-[#B2904D]/20 transition-all"
                  >
                    {t.backToNewsletter}
                  </Link>
                  <Link
                    href={`/${lang}`}
                    className="text-sm text-blue-200/50 hover:text-blue-200/80 transition-colors"
                  >
                    {t.backHome}
                  </Link>
                </div>
              ) : (
                <form
                  method="post"
                  action="/api/newsletter/unsubscribe"
                  className="mt-8"
                >
                  <input type="hidden" name="lang" value={isEs ? 'es' : 'en'} />
                  <input type="hidden" name="confirm" value="1" />
                  {token ? <input type="hidden" name="t" value={token} /> : null}

                  {email ? (
                    <input type="hidden" name="email" value={email} />
                  ) : (
                    <div className="mb-6">
                      <label
                        htmlFor="unsubscribe-email"
                        className="block text-sm text-blue-200/70 mb-2"
                      >
                        {t.emailLabel}
                      </label>
                      <input
                        id="unsubscribe-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder={t.emailPlaceholder}
                        className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder-blue-200/30 focus:border-[#B2904D]/50 focus:outline-none"
                      />
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#B2904D] text-white text-sm font-semibold hover:bg-[#c9a85e] transition-colors"
                    >
                      {t.submit}
                    </button>
                    <Link
                      href={`/${lang}/newsletter`}
                      className="text-sm text-blue-200/50 hover:text-blue-200/80 transition-colors"
                    >
                      {t.keep}
                    </Link>
                  </div>
                </form>
              )}

              <p className="mt-8 pt-6 border-t border-white/5 text-xs text-blue-200/40 leading-relaxed">
                {t.note}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
