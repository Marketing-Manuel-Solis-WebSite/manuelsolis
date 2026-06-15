import type { Language } from '../lib/translations';

/**
 * Anti-fraud notice shown on the homepage. Warns visitors that the ONLY
 * official site is manuelsolis.com and that impersonation sites exist.
 *
 * Server component on purpose: no client JS, no hydration boundary, so it
 * cannot break interactivity and renders instantly with the static HTML.
 * Placed after the Hero (the Header is `fixed top-0`, so an in-flow banner
 * at the very top would sit behind it).
 */
export default function FraudWarningBanner({ lang }: { lang: Language }) {
  const isEs = lang === 'es';

  return (
    <section
      aria-label={isEs ? 'Aviso de seguridad' : 'Security notice'}
      className="relative z-30 w-full border-y-2 border-amber-500/60 bg-amber-50"
    >
      <div className="container mx-auto flex items-start gap-3 px-4 py-3.5 lg:px-12">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600"
        >
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>

        <p className="text-[13px] leading-snug text-amber-950 sm:text-sm">
          <strong className="font-bold">
            {isEs ? 'Aviso de seguridad: ' : 'Security notice: '}
          </strong>
          {isEs ? (
            <>
              Nuestro único sitio web oficial es{' '}
              <strong className="font-bold">manuelsolis.com</strong>. No tenemos
              ninguna otra página. Existen sitios que se hacen pasar por nosotros
              para cometer fraude: no comparta su información personal ni realice
              pagos en páginas distintas a{' '}
              <strong className="font-bold">manuelsolis.com</strong>.
            </>
          ) : (
            <>
              Our only official website is{' '}
              <strong className="font-bold">manuelsolis.com</strong>. We have no
              other pages. Some sites impersonate us to commit fraud: do not
              share your personal information or make payments on pages other
              than <strong className="font-bold">manuelsolis.com</strong>.
            </>
          )}
        </p>
      </div>
    </section>
  );
}
