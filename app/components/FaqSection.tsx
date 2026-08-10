import { HelpCircle } from 'lucide-react';
import type { FaqPair } from '../lib/faqSchema';

/**
 * Sección de preguntas frecuentes, servida desde el servidor.
 *
 * Usa `<details>` nativo a propósito y no un acordeón con estado: las
 * respuestas quedan en el HTML desde el primer byte. Eso importa por dos
 * motivos a la vez — un acordeón en JavaScript esconde el texto de quien no
 * ejecuta scripts (varios extractores de IA entre ellos), y Google no acepta
 * marcar como FAQPage un contenido que el visitante no puede leer.
 *
 * Cero JavaScript, así que puede ir en la portada sin tocar el LCP.
 *
 * El diseño replica el de las landings de ciudad (ver CityServiceLanding) para
 * que la FAQ se vea igual en todo el sitio.
 */
export default function FaqSection({
  faqs,
  title,
  lang,
}: {
  faqs: FaqPair[];
  title: string;
  lang: 'es' | 'en';
}) {
  if (faqs.length === 0) return null;
  const isEs = lang === 'es';

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#B2904D]/15 text-xs font-semibold tracking-widest text-[#B2904D] uppercase">
            {isEs ? 'Preguntas frecuentes' : 'Frequently Asked Questions'}
          </span>
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white"
          >
            {title}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((item, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-colors"
            >
              <summary className="flex items-start gap-3 p-5 cursor-pointer list-none">
                <HelpCircle className="h-5 w-5 text-[#B2904D] mt-0.5 flex-shrink-0" />
                <span className="text-white font-semibold text-base sm:text-lg flex-1">
                  {item.q}
                </span>
                <span className="text-[#B2904D] text-2xl leading-none flex-shrink-0 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 sm:pl-13 text-slate-300 leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-400/80 leading-relaxed">
          {isEs
            ? 'Esta información es orientación general y no sustituye la asesoría legal sobre un caso concreto. Cada caso depende de sus propios hechos y fechas.'
            : 'This information is general guidance and does not replace legal advice about a specific case. Every case depends on its own facts and dates.'}
        </p>
      </div>
    </section>
  );
}
