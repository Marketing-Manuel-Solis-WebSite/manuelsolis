import { Reveal } from './motion';
import ContactFormClient from './ContactFormClient';
import type { Language } from '../lib/translations';

/**
 * Server-first shell markup for the contact section. The section, background and
 * heading render as server HTML; the interactive lead-capture form is the client
 * island (<ContactFormClient>). Rendered either directly with a `lang` prop
 * (server, e.g. the Home) or via <ContactFormAutoLang> (client context fallback
 * for the ~65 other pages that render <ContactForm/> without a lang prop).
 */
export default function ContactFormShell({ lang }: { lang: Language }) {
  const isEs = lang === 'es';

  return (
    <section className="relative py-32 w-full bg-navy-500 overflow-hidden" id="contacto">
      <div className="absolute inset-0 z-0 pointer-events-none transform-gpu">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#002050] via-[#001540] to-[#000814]" />
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[80px]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-4 relative z-20 max-w-5xl">
        <Reveal variant="up" className="text-center mb-12" amount={0.4}>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-thin text-white mb-6 tracking-tight drop-shadow-sm">
            {isEs ? 'Solicite su' : 'Request Your'}{' '}
            <span className="font-medium text-[#B2904D]">{isEs ? 'Consulta' : 'Consultation'}</span>
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto font-light leading-relaxed opacity-90">
            {isEs
              ? 'Cuéntenos su caso y un miembro de nuestro equipo le contactará dentro de las próximas 24 horas hábiles.'
              : 'Tell us about your case and a member of our team will contact you within the next business day.'}
          </p>
        </Reveal>

        <ContactFormClient />
      </div>
    </section>
  );
}
