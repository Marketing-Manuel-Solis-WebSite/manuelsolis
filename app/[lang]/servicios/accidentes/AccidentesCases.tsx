'use client';

import { useState } from 'react';
import Link from 'next/link';
import { m, AnimatePresence } from 'framer-motion';
import { Scale, MapPin, PhoneCall, ArrowRight, Quote, CheckCircle2, HandCoins } from 'lucide-react';
import { Reveal } from '../../../components/motion';
import { allServices, ui, getText, type CaseItem } from './accidentesData';
import { accidentOffices } from './accidentesOfficesData';
import type { Language } from '../../../lib/translations';

/**
 * Mapa nombre-de-oficina → slug, para enlazar cada chip de "Oficinas
 * Disponibles" a su página de accidentes. Las claves cubren es+en porque
 * activeService.offices son strings (ALL_OFFICES) idénticos en ambos idiomas.
 */
const OFFICE_SLUG_BY_NAME: Record<string, string> = Object.fromEntries(
  accidentOffices.flatMap((o) => [
    [o.name.es, o.id],
    [o.name.en, o.id],
  ]),
);

/**
 * Client island: the interactive "Solutions in Accidents" tabs. Holds the
 * selected-tab state + AnimatePresence detail. Conditional content (quotes for
 * trailer, benefits for trabajo, solution for medica/explosion/auto) preserved
 * 1:1. Transform/opacity only.
 */
export default function AccidentesCases({ lang }: { lang: Language }) {
  const [selectedTab, setSelectedTab] = useState<string>(allServices[0].id);
  const gT = (obj: Parameters<typeof getText>[0]) => getText(obj, lang);
  const t = (k: keyof typeof ui) => ui[k][lang];
  const activeService: CaseItem = allServices.find((s) => s.id === selectedTab) || allServices[0];

  return (
    <section className="px-4 pb-32 relative z-10" id="casos">
      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal variant="up" className="mb-16 text-center" amount={0.4}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm mb-8">
            <Scale size={14} className="text-[#B2904D]" />
            <span className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">{t('specialties')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{t('casesTitle')}</h2>
          <p className="text-lg text-white/60 mb-6 max-w-3xl mx-auto">{t('casesSubtitle')}</p>
          <div className="h-1 w-20 bg-gradient-to-r from-[#B2904D] to-[#D4AF37] mx-auto rounded-full shadow-[0_0_10px_#B2904D]" />
        </Reveal>

        {/* TABS */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {allServices.map((service) => {
            const Icon = service.icon;
            const active = selectedTab === service.id;
            return (
              <m.button
                key={service.id}
                onClick={() => setSelectedTab(service.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative px-6 py-4 rounded-2xl transition-all duration-300 border backdrop-blur-md ${
                  active
                    ? 'bg-gradient-to-br from-[#B2904D] to-[#D4AF37] border-[#B2904D] shadow-[0_0_20px_rgba(178,144,77,0.3)]'
                    : 'bg-white/5 border-white/10 hover:border-[#B2904D]/50 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={24} className={`transition-all ${active ? 'text-white' : 'text-white/70 group-hover:text-[#B2904D]'}`} />
                  <span className={`font-bold text-sm md:text-base whitespace-nowrap ${active ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                    {gT(service.title)}
                  </span>
                </div>
              </m.button>
            );
          })}
        </div>

        {/* DETAIL */}
        <AnimatePresence mode="wait">
          <m.div key={selectedTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl sm:rounded-[3rem] p-5 sm:p-8 md:p-12 border border-white/10 shadow-2xl">
              <div className="flex items-start gap-6 mb-8 pb-8 border-b border-white/10">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#B2904D] to-[#D4AF37] flex items-center justify-center shadow-xl flex-shrink-0">
                  <activeService.icon size={40} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">{gT(activeService.title)}</h3>
                  <p className="text-[#B2904D] text-sm font-bold uppercase tracking-widest mb-4">{gT(activeService.subtitle)}</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20">
                    <MapPin size={14} className="text-[#B2904D]" />
                    <span className="text-xs text-white/80 font-medium">{activeService.offices.length} {t('officesCount')}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-2xl font-black text-white mb-4">{gT(activeService.content.intro)}</h4>
                  <p className="text-lg text-white/70 leading-relaxed">{gT(activeService.content.description)}</p>
                </div>

                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h5 className="font-black text-white mb-4 flex items-center gap-3 text-lg">
                    <MapPin size={20} className="text-[#B2904D]" />
                    {t('availableOffices')}
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {activeService.offices.map((office, i) => {
                      const slug = OFFICE_SLUG_BY_NAME[office];
                      if (!slug) {
                        return (
                          <div key={i} className="flex items-center gap-2 text-white/70 bg-black/20 p-3 rounded-xl border border-white/10 text-sm">
                            <div className="w-1.5 h-1.5 bg-[#B2904D] rounded-full flex-shrink-0" />
                            <span className="font-medium text-xs">{office}</span>
                          </div>
                        );
                      }
                      return (
                        <Link
                          key={i}
                          href={`/${lang}/servicios/accidentes/oficinas/${slug}`}
                          aria-label={`${gT(activeService.title)} — ${office}`}
                          className="group flex items-center justify-between gap-2 text-white/80 bg-black/20 hover:bg-[#B2904D] hover:text-[#001540] p-3 rounded-xl border border-white/10 hover:border-[#B2904D] text-sm transition-colors"
                        >
                          <span className="flex items-center gap-2 min-w-0">
                            <div className="w-1.5 h-1.5 bg-[#B2904D] group-hover:bg-[#001540] rounded-full flex-shrink-0" />
                            <span className="font-medium text-xs truncate">{office}</span>
                          </span>
                          <ArrowRight size={14} className="shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {activeService.id === 'trailer' && activeService.content.quotes && (
                  <div className="space-y-4">
                    {activeService.content.quotes.map((quote, i) => (
                      <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10 shadow-md relative">
                        <Quote size={24} className="absolute top-4 right-4 text-white/20" />
                        <p className="italic text-lg text-white mb-2">&quot;{gT(quote.text)}&quot;</p>
                        <p className="text-sm text-white/50">{gT(quote.context)}</p>
                      </div>
                    ))}
                    <div className="p-6 bg-[#B2904D]/20 border border-[#B2904D]/30 rounded-2xl text-white font-bold">
                      {gT(activeService.content.offerAlert)}
                    </div>
                  </div>
                )}

                {activeService.content.subPoints && activeService.content.subTitle && (
                  <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                    <h5 className="font-black text-white mb-6 flex items-center gap-3 text-xl">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md bg-white/10">
                        <Scale size={24} className="text-white" />
                      </div>
                      {gT(activeService.content.subTitle)}
                    </h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      {activeService.content.subPoints.map((point, i) => (
                        <div key={i} className="flex items-start gap-3 text-white/70 bg-black/20 p-4 rounded-xl border border-white/10">
                          <CheckCircle2 size={20} className="text-[#B2904D] shrink-0 mt-0.5" />
                          <span className="text-sm font-medium">{gT(point)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeService.id === 'trabajo' && activeService.content.benefits && (
                  <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                    <h5 className="font-black text-white mb-6 flex items-center gap-3 text-xl">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md bg-[#B2904D]">
                        <HandCoins size={24} className="text-white" />
                      </div>
                      {gT(activeService.content.benefitsTitle)}
                    </h5>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      {activeService.content.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-3 text-white bg-black/20 p-4 rounded-xl border border-white/10">
                          <CheckCircle2 size={20} className="text-[#B2904D] shrink-0 mt-0.5" />
                          <span className="text-sm font-medium">{gT(benefit)}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-white/60 text-sm italic">{gT(activeService.content.closing)}</p>
                  </div>
                )}

                {activeService.content.solution && (activeService.id === 'medica' || activeService.id === 'explosion' || activeService.id === 'auto') && (
                  <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                    <p className="text-white/80 leading-relaxed font-medium text-lg">{gT(activeService.content.solution)}</p>
                  </div>
                )}

                <div className="pt-8 border-t border-white/10">
                  <m.a href="#contacto" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="group w-full py-4 sm:py-5 bg-[#B2904D] text-[#001540] rounded-2xl font-black flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:bg-white transition-all text-sm sm:text-base md:text-lg">
                    <PhoneCall size={24} />
                    <span>{t('requestEvaluation')}</span>
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </m.a>
                </div>
              </div>
            </div>
          </m.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
