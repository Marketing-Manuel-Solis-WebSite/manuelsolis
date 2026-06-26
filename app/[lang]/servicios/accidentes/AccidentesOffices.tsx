import Link from 'next/link';
import { MapPin, Clock, Phone, Sparkles, ArrowRight } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '../../../components/motion';
import TrackedPhoneLink from '../../../components/TrackedPhoneLink';
import type { Language } from '../../../lib/translations';
import {
  accidentOffices,
  officesUi,
  OFFICE_NAME,
  type BiText,
} from './accidentesOfficesData';

/**
 * Sección de direcciones de las oficinas de accidentes — al final de
 * /servicios/accidentes, antes del footer. Server-first: reutiliza el patrón
 * visual de la tarjeta "Dirección" de OfficePageView (badge dorado + MapPin +
 * "Ver en mapa" + TrackedPhoneLink + horario) pero a escala COMPACTA y en grid
 * responsive para que entren varias oficinas. Movimiento vía islas
 * Reveal/Stagger; la conversión phone_click se preserva con TrackedPhoneLink.
 * Datos desde accidentesOfficesData.ts (no hardcode en el JSX).
 */
export default function AccidentesOffices({ lang }: { lang: Language }) {
  const t = (o: BiText) => o[lang] || o.es;

  return (
    <section
      className="relative py-20 md:py-28 z-10 bg-transparent"
      aria-labelledby="accidentes-oficinas-title"
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Encabezado compacto (escala reducida vs. el hero) */}
        <Reveal variant="up" amount={0.3} className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B2904D]/10 border border-[#B2904D]/30 mb-5">
            <Sparkles size={14} className="text-[#B2904D]" />
            <span className="text-[#B2904D] text-xs font-bold tracking-[0.2em] uppercase">
              {t(officesUi.badge)}
            </span>
          </div>
          <h2
            id="accidentes-oficinas-title"
            className="text-2xl sm:text-3xl md:text-4xl font-thin text-white mb-4"
          >
            {t(officesUi.title)}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#B2904D] to-transparent mx-auto rounded-full mb-5" />
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base font-light">
            {t(officesUi.subtitle)}
          </p>
        </Reveal>

        {/* Grid responsive de oficinas */}
        <Stagger
          gap={0.06}
          amount={0.1}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {accidentOffices.map((office) => {
            const mapHref =
              office.mapLink && !office.mapLink.includes('your_map_link_here')
                ? office.mapLink
                : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`;

            return (
              <StaggerItem
                key={office.id}
                as="div"
                variant="up"
                className="card-3d group flex flex-col bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-[#B2904D]/40 transition-colors duration-300 overflow-hidden"
              >
                <div className="h-1 w-full bg-gradient-to-r from-[#B2904D]/70 via-[#D4AF37]/70 to-transparent" />
                <div className="flex flex-col flex-1 p-5 md:p-6">
                  {/* Zona */}
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={16} className="text-[#B2904D] shrink-0" />
                    <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/50">
                      {office.area}
                    </span>
                  </div>

                  {/* Nombre comercial + nota */}
                  <h3 className="text-base md:text-lg font-semibold text-white leading-snug">
                    {t(office.name)}
                  </h3>
                  <p className="text-xs text-white/40 mb-1">{OFFICE_NAME}</p>
                  {office.note && (
                    <p className="text-xs text-[#B2904D] font-medium mb-2">
                      {t(office.note)}
                    </p>
                  )}

                  {/* Dirección + mapa */}
                  <address className="not-italic text-white/70 text-sm leading-snug mb-3 mt-2">
                    {office.address}
                  </address>
                  <a
                    href={mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t(officesUi.viewMap)}: ${office.address}`}
                    className="inline-flex items-center gap-1.5 text-[#B2904D] text-sm font-bold hover:text-white transition-colors"
                  >
                    {t(officesUi.viewMap)} →
                  </a>

                  <div className="h-px bg-white/10 my-4" />

                  {/* Teléfono + horario */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <Phone size={15} className="text-[#B2904D] shrink-0" />
                      <span className="sr-only">{t(officesUi.phone)}:</span>
                      <TrackedPhoneLink
                        phone={office.phone}
                        className="text-white text-sm font-medium hover:text-[#B2904D] transition-colors"
                      />
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Clock size={15} className="text-[#B2904D] shrink-0 mt-0.5" />
                      <span className="sr-only">{t(officesUi.hours)}:</span>
                      <span className="text-white/70 text-sm">{t(office.hours)}</span>
                    </div>
                  </div>

                  {/* CTA → página de accidentes de esta oficina */}
                  <div className="mt-auto pt-5">
                    <Link
                      href={`/${lang}/servicios/accidentes/oficinas/${office.id}`}
                      aria-label={`${t(officesUi.viewOffice)}: ${t(office.name)}`}
                      className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-[#B2904D] hover:bg-white text-[#001540] text-sm font-bold transition-colors"
                    >
                      {t(officesUi.viewOffice)}
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
