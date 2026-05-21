'use client';

import { useState } from 'react';
import type { ElementType } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ArrowRight, Shield, FileCheck, Gavel, Users, Clock, Target, BookOpen } from 'lucide-react';
import type { ResolvedTab, TabIconKey } from './visaUData';

const ICONS: Record<TabIconKey, ElementType> = { shield: Shield, fileCheck: FileCheck, gavel: Gavel, users: Users, clock: Clock };

/** Client island: interactive Visa U info tabs (pre-resolved data). */
export default function VisaUCases({ tabs, requestEvaluation }: { tabs: ResolvedTab[]; requestEvaluation: string }) {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0].id);
  const active = tabs.find((s) => s.id === selectedTab) || tabs[0];
  const ActiveIcon = ICONS[active.iconKey];

  return (
    <section className="px-4 py-24 relative z-10 bg-[#001026]" id="detalles">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-16">
          {tabs.map((tab) => {
            const Icon = ICONS[tab.iconKey];
            const on = selectedTab === tab.id;
            return (
              <m.button key={tab.id} onClick={() => setSelectedTab(tab.id)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className={`group relative px-6 py-4 rounded-2xl transition-all duration-300 border ${on ? 'bg-[#B2904D] border-[#B2904D] shadow-[0_0_20px_rgba(178,144,77,0.4)]' : 'bg-white/5 border-white/10 hover:border-[#B2904D]/50 hover:bg-white/10'}`}>
                <div className="flex items-center gap-3">
                  <Icon size={20} className={`transition-all ${on ? 'text-[#001540]' : 'text-white/70 group-hover:text-[#B2904D]'}`} />
                  <span className={`font-bold text-sm tracking-wide ${on ? 'text-[#001540]' : 'text-white/90 group-hover:text-white'}`}>{tab.title}</span>
                </div>
              </m.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <m.div key={selectedTab} initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.98 }} transition={{ duration: 0.4, ease: 'easeOut' }} className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#B2904D]/10 rounded-full blur-[80px] pointer-events-none"></div>

              <div className="flex flex-col md:flex-row items-start gap-8 mb-10 pb-10 border-b border-white/10">
                <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-[#B2904D] to-[#D4AF37] flex items-center justify-center shadow-lg shadow-[#B2904D]/20 flex-shrink-0">
                  <ActiveIcon size={44} className="text-[#001540]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight tracking-tight">{active.title}</h3>
                  <p className="text-[#B2904D] text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-4">{active.subtitle}</p>
                </div>
              </div>

              <div className="space-y-10">
                <div>
                  <h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <Target className="text-[#B2904D]" size={24} />
                    {active.content.intro}
                  </h4>
                  <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed font-light">{active.content.description}</p>
                </div>

                {active.content.subPoints && active.content.subTitle && (
                  <div className="bg-[#001026]/40 p-8 rounded-3xl border border-white/5">
                    <h5 className="font-bold text-white mb-6 flex items-center gap-3 text-lg uppercase tracking-wider">{active.content.subTitle}</h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      {active.content.subPoints.map((point, i) => (
                        <div key={i} className="flex items-start gap-4 text-white/80 bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-[#B2904D]/30 hover:bg-white/10 transition-colors group">
                          <div className="w-2 h-2 rounded-full mt-2.5 shrink-0 bg-[#B2904D] group-hover:shadow-[0_0_8px_#B2904D] transition-shadow"></div>
                          <span className="text-base font-medium leading-snug">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {active.content.solution && (
                  <div className="bg-gradient-to-r from-[#B2904D]/20 to-transparent p-6 rounded-2xl border-l-4 border-[#B2904D]">
                    <p className="text-white leading-relaxed font-medium text-lg flex gap-4 items-start">
                      <BookOpen className="text-[#B2904D] shrink-0 mt-1" size={24} />
                      {active.content.solution}
                    </p>
                  </div>
                )}

                <div className="pt-6 flex justify-end">
                  <m.a href="#contacto" whileHover={{ x: 5 }} className="inline-flex items-center gap-2 text-[#B2904D] font-bold uppercase tracking-widest text-sm hover:text-white transition-colors">
                    {requestEvaluation}
                    <ArrowRight size={18} />
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
