import Image from 'next/image';
import Link from 'next/link';
import { Scale, ArrowUpRight } from 'lucide-react';
import type { ServiceAttorney } from '../lib/serviceAttorneys';

/**
 * Bloque de abogados nombrados en una página de servicio.
 *
 * Existe por E-E-A-T: en una materia YMYL, decir QUIÉN responde por el área pesa
 * más que decir que el despacho lleva 35 años. Hasta ahora estas páginas solo
 * daban señales de marca — ningún nombre, ninguna credencial.
 *
 * Se sirve desde el servidor y sin estado: son enlaces y fotos. Va dentro del
 * `<main>` y antes del footer, como la FAQ.
 *
 * No emite `Person`: la entidad de cada abogado vive en su perfil con su `@id`
 * y duplicarla crearía dos entidades para la misma persona. Lo que publica es el
 * enlace al perfil.
 */
export default function ServiceAttorneys({
  attorneys,
  lang,
}: {
  attorneys: ServiceAttorney[];
  lang: 'es' | 'en';
}) {
  if (attorneys.length === 0) return null;
  const isEs = lang === 'es';

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="service-attorneys-heading">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#B2904D]/15 text-xs font-semibold tracking-widest text-[#B2904D] uppercase">
            {isEs ? 'Quién lleva su caso' : 'Who handles your case'}
          </span>
          <h2
            id="service-attorneys-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white"
          >
            {isEs ? 'Abogados de esta área' : 'Attorneys in this practice area'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {attorneys.map((a) => (
            <Link
              key={a.id}
              href={`/${lang}/abogados/${a.id}`}
              className="group/att flex flex-col rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-[#B2904D]/40 transition-colors overflow-hidden"
            >
              <div className="relative aspect-[4/3] w-full bg-[#001030]">
                <Image
                  src={a.image}
                  alt={a.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-white group-hover/att:text-[#B2904D] transition-colors">
                  {a.name}
                </h3>
                <p className="mt-1 flex items-start gap-2 text-sm text-[#B2904D]">
                  <Scale size={15} className="mt-0.5 flex-shrink-0" />
                  <span>{a.role}</span>
                </p>
                {a.credential && (
                  <p className="mt-2 text-xs uppercase tracking-wider text-white/45">
                    {isEs ? 'Colegiación: ' : 'Admitted: '}
                    {a.credential}
                  </p>
                )}
                <p className="mt-3 text-sm text-slate-300 italic leading-relaxed flex-1">
                  “{a.quote}”
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-white/60 group-hover/att:text-[#B2904D] transition-colors">
                  {isEs ? 'Ver perfil' : 'View profile'}
                  <ArrowUpRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
