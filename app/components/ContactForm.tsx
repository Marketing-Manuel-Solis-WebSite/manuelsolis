import ContactFormShell from './ContactFormShell';
import ContactFormAutoLang from './ContactFormAutoLang';
import type { Language } from '../lib/translations';

/**
 * ContactForm — server-first (Fase 2.2c). Backward-compatible entry: this
 * section is shared across ~65 pages site-wide.
 *  - With a `lang` prop (the Home, server): renders the shell fully server-side.
 *  - Without `lang` (other pages, mostly client components relying on context):
 *    falls back to <ContactFormAutoLang> which resolves the language from
 *    context — unchanged client behavior, no regression. Those pages move to the
 *    explicit-lang path during the site rollout.
 *
 * The interactive form (submit, validation, useSearchParams, Vercel BotID) lives
 * untouched in the <ContactFormClient> island.
 */
export default function ContactForm({ lang }: { lang?: Language }) {
  if (lang) return <ContactFormShell lang={lang} />;
  return <ContactFormAutoLang />;
}
