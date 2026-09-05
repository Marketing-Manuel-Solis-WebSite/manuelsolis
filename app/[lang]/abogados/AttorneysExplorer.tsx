'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import {
  Scale, ShieldCheck, Gavel, GraduationCap,
  ArrowRight, X as CloseIcon, Mail, Award, ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal, Stagger, StaggerItem } from '../../components/motion';
import { useDialog } from '../../components/useDialog';

/**
 * Attorneys directory grid + detail modal — the only interactive part of the
 * /abogados page (server shell lives in AbogadosClient). Receives attorney data
 * already resolved to the active locale (enfoque b): the inactive locale never
 * reaches the bundle. Cards use `.card-3d`; the modal is AnimatePresence. Card
 * markup is server-rendered in the initial HTML (Next SSRs client components),
 * so the names/roles/links are in the DOM for crawlers.
 */
export interface ResolvedAttorney {
  id: string;
  name: string;
  image: string;
  role: string;
  quote: string;
  bio: string[];
  education: string[];
  admissions: string[];
}

export interface ExplorerGroup {
  label: string;
  attorneys: ResolvedAttorney[];
}

export interface ExplorerTexts {
  viewProfile: string;
  modalBadge: string;
  education: string;
  admissions: string;
  achievements: string;
  button: string;
  viewFullProfile: string;
  defaultBio: string;
  educationFallback: string;
  admissionsFallback: string;
  close: string;
}

export default function AttorneysExplorer({
  groups,
  texts,
  lang,
}: {
  groups: ExplorerGroup[];
  texts: ExplorerTexts;
  lang: 'es' | 'en';
}) {
  const [selectedAttorney, setSelectedAttorney] = useState<ResolvedAttorney | null>(null);
  const dialogRef = useDialog(selectedAttorney !== null, () => setSelectedAttorney(null));

  return (
    <>
      {/* GRID DE ABOGADOS AGRUPADOS POR UBICACIÓN */}
      <section className="px-4 pb-32 relative z-10">
        <div className="max-w-7xl mx-auto space-y-16">
          {groups.map((group) => {
            if (group.attorneys.length === 0) return null;
            return (
              <div key={group.label}>
                {/* Location Header */}
                <Reveal variant="up" className="flex items-center gap-3 mb-8" amount={0.4}>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#B2904D]/40 to-transparent" />
                  <h2 className="text-lg sm:text-xl font-semibold text-[#B2904D] uppercase tracking-widest whitespace-nowrap">
                    {group.label}
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-l from-[#B2904D]/40 to-transparent" />
                </Reveal>
                <Stagger gap={0.06} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8" amount={0.1}>
                  {group.attorneys.map((attorney) => (
                    <StaggerItem key={attorney.id} as="div">
                      <Link
                        href={`/${lang}/abogados/${attorney.id}`}
                        prefetch={false}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedAttorney(attorney);
                        }}
                        className="card-3d group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-[#001540]/60 hover:border-[#B2904D]/70 hover:shadow-[0_0_30px_rgba(178,144,77,0.25)] focus-visible:ring-2 focus-visible:ring-[#B2904D] focus-visible:outline-none transition-all duration-500 block"
                        aria-label={`${attorney.name} — ${texts.viewProfile}`}
                      >
                        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                          <Image
                            src={attorney.image}
                            alt={attorney.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            className={attorney.id === 'lupita-valenzuela-martinez'
                              ? "object-cover object-[center_20%]"
                              : "object-cover object-top"}
                            loading="lazy"
                          />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-[#001540]/90 via-[#001540]/50 to-transparent opacity-95 group-hover:opacity-90 transition-opacity duration-500" />

                        <div className="absolute bottom-0 left-0 w-full p-6 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                          <div className="w-12 h-1 bg-[#B2904D] mb-3 rounded-full group-hover:w-24 transition-all duration-500 shadow-[0_0_15px_#B2904D]"></div>

                          <h3 className="text-2xl font-bold text-white leading-none mb-2 drop-shadow-lg">
                            {attorney.name}
                          </h3>

                          <p className="text-[#B2904D] text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
                            <ShieldCheck size={14} /> {attorney.role}
                          </p>
                        </div>
                      </Link>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            );
          })}
        </div>
      </section>

      {/* MODAL DE DETALLE OPTIMIZADO */}
      <AnimatePresence>
        {selectedAttorney && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4 bg-black/85 overflow-hidden"
            onClick={() => setSelectedAttorney(null)}
          >
            <m.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={`${texts.modalBadge}: ${selectedAttorney.name}`}
              tabIndex={-1}
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#001f4a] w-full md:max-w-6xl h-full md:h-auto md:max-h-[90vh] md:rounded-3xl border border-white/10 shadow-2xl flex flex-col lg:flex-row relative overflow-hidden"
            >
              <button
                onClick={() => setSelectedAttorney(null)}
                className="absolute top-4 right-4 z-50 bg-black/40 hover:bg-[#B2904D] text-white p-2 rounded-full transition-all border border-white/10 group"
                aria-label={texts.close}
              >
                <CloseIcon size={24} className="group-hover:rotate-90 transition-transform" />
              </button>

              {/* Imagen del Abogado */}
              <div className="w-full lg:w-5/12 bg-black relative h-[35vh] lg:h-auto">
                <Image
                  src={selectedAttorney.image}
                  alt={selectedAttorney.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className={selectedAttorney.id === 'lupita-valenzuela-martinez'
                    ? "object-cover object-[center_20%]"
                    : "object-cover object-top"}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-80"></div>

                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#001f4a] to-transparent lg:hidden">
                  <h2 className="text-3xl font-bold text-white">{selectedAttorney.name}</h2>
                  <p className="text-[#B2904D] text-sm">{selectedAttorney.role}</p>
                </div>
              </div>

              {/* Contenido de Información */}
              <div className="w-full lg:w-7/12 p-6 lg:p-10 overflow-y-auto bg-gradient-to-br from-[#001f4a] to-[#001a33] relative">

                <div className="hidden lg:block mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="px-3 py-1 rounded bg-[#B2904D]/20 text-[#B2904D] text-xs font-bold uppercase tracking-wider border border-[#B2904D]/30">
                      {texts.modalBadge}
                    </div>
                  </div>
                  <h2 className="text-5xl font-bold text-white mb-1">
                    {selectedAttorney.name}
                  </h2>
                  <p className="text-gray-400 text-xl font-light flex items-center gap-2">
                    <Gavel size={18} className="text-[#B2904D]" /> {selectedAttorney.role}
                  </p>
                </div>

                {selectedAttorney.quote && (
                  <div className="mb-8 relative">
                    <div className="absolute -left-2 -top-2 text-[#B2904D]/20">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" /></svg>
                    </div>
                    <p className="text-[#B2904D] text-lg italic font-medium pl-8 relative z-10 border-l-2 border-[#B2904D]/50">
                      &quot;{selectedAttorney.quote}&quot;
                    </p>
                  </div>
                )}

                <div className="space-y-4 text-gray-300 leading-relaxed font-light mb-8 text-sm md:text-base text-justify">
                  {selectedAttorney.bio.length > 0 ? (
                    selectedAttorney.bio.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))
                  ) : (
                    <p>{selectedAttorney.name} {texts.defaultBio}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-4 bg-black/20 rounded-2xl border border-white/5">
                  <div>
                    <h4 className="text-white font-bold flex items-center gap-2 mb-3 text-sm uppercase tracking-wider">
                      <GraduationCap size={18} className="text-[#B2904D]" /> {texts.education}
                    </h4>
                    {selectedAttorney.education.length > 0 ? (
                      <ul className="text-xs md:text-sm text-gray-400 space-y-2">
                        {selectedAttorney.education.map((edu, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#B2904D] mt-1.5"></div>
                            {edu}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-gray-500 italic">{texts.educationFallback}</p>
                    )}
                  </div>

                  <div>
                    <h4 className="text-white font-bold flex items-center gap-2 mb-3 text-sm uppercase tracking-wider">
                      {selectedAttorney.admissions.length > 0 ? <><Scale size={18} className="text-[#B2904D]" /> {texts.admissions}</> : <><Award size={18} className="text-[#B2904D]" /> {texts.achievements}</>}
                    </h4>
                    {selectedAttorney.admissions.length > 0 ? (
                      <ul className="text-xs md:text-sm text-gray-400 space-y-2">
                        {selectedAttorney.admissions.map((adm, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#B2904D] mt-1.5"></div>
                            {adm}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-gray-500 italic">{texts.admissionsFallback}</p>
                    )}
                  </div>
                </div>

                <div className="mt-auto space-y-3">
                  <Link href={`/${lang}#contacto`} onClick={() => setSelectedAttorney(null)} className="w-full bg-gradient-to-r from-[#B2904D] to-[#9f7d3d] hover:from-white hover:to-white hover:text-[#002342] text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-black/40 group">
                    <Mail size={20} />
                    {texts.button}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
