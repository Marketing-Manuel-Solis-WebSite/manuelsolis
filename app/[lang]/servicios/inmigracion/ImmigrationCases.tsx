'use client';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Scale, MapPin, PhoneCall, ArrowRight } from 'lucide-react';
import { Reveal } from '../../../components/motion';
import { mainCases, ui, getText, type CaseItem } from './immigrationData';
import type { Language } from '../../../lib/translations';

/**
 * Client island: the interactive "Legal Solutions" tabs. Holds the selected-tab
 * state and the AnimatePresence detail panel. Server-rendered text passes
 * through the shared data module. Transform/opacity only.
 */
export default function ImmigrationCases({ lang }: { lang: Language }) {
  const [selectedTab, setSelectedTab] = useState<string>(mainCases[0].id);
  const gT = (obj: Parameters<typeof getText>[0]) => getText(obj, lang);
  const t = (k: keyof typeof ui) => ui[k][lang];
  const activeService: CaseItem = mainCases.find((s) => s.id === selectedTab) || mainCases[0];

  return (
    <section className="px-4 pb-32 relative z-10" id="casos">
      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal variant="up" className="mb-16 text-center" amount={0.4}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm mb-8">
            <Scale size={14} className="text-[#B2904D]" />
            <span className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">{t('specialties')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{t('casesTitle')}</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#B2904D] to-[#D4AF37] mx-auto rounded-full shadow-[0_0_10px_#B2904D]" />
        </Reveal>

        {/* TABS */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {mainCases.map((service) => {
            const Icon = service.icon;
            const active = selectedTab === service.id;
            return (
              <m.button
                key={service.id}
                onClick={() => setSelectedTab(service.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative px-5 py-3 rounded-2xl transition-all duration-300 border backdrop-blur-md ${
                  active
                    ? 'bg-gradient-to-br from-[#B2904D] to-[#D4AF37] border-[#B2904D] shadow-[0_0_20px_rgba(178,144,77,0.3)]'
                    : 'bg-white/5 border-white/10 hover:border-[#B2904D]/50 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon size={20} className={`transition-all ${active ? 'text-white' : 'text-white/70 group-hover:text-[#B2904D]'}`} />
                  <span className={`font-bold text-xs md:text-sm whitespace-nowrap ${active ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                    {gT(service.title)}
                  </span>
                </div>
              </m.button>
            );
          })}
        </div>

        {/* DETAIL */}
        <AnimatePresence mode="wait">
          <m.div
            key={selectedTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
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
                    {activeService.offices.map((office, i) => (
                      <div key={i} className="flex items-center gap-2 text-white/70 bg-black/20 p-3 rounded-xl border border-white/10 text-sm">
                        <div className="w-1.5 h-1.5 bg-[#B2904D] rounded-full flex-shrink-0" />
                        <span className="font-medium text-xs">{office}</span>
                      </div>
                    ))}
                  </div>
                </div>

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
                          <div className="w-2 h-2 rounded-full mt-2 shrink-0 bg-[#B2904D]"></div>
                          <span className="text-sm font-medium">{gT(point)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeService.content.solution && (
                  <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                    <p className="text-white/80 leading-relaxed font-medium text-lg">{gT(activeService.content.solution)}</p>
                  </div>
                )}

                <div className="pt-8 border-t border-white/10">
                  <m.a
                    href="#contacto"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group w-full py-4 sm:py-5 bg-[#B2904D] text-[#001540] rounded-2xl font-black flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:bg-white transition-all text-sm sm:text-base md:text-lg"
                  >
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
