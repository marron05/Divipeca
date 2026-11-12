import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TIMELINE_MILESTONES, IMAGES, CLIENT_PARTNERS } from '../data/divipecaData';
import { Calendar, ChevronRight, Award, History, Building2, Truck, Handshake } from 'lucide-react';

export const HistorySection: React.FC = () => {
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState<number>(0);
  const activeMilestone = TIMELINE_MILESTONES[activeMilestoneIndex];

  return (
    <section id="historia" className="py-16 sm:py-20 bg-neutral-50 border-b border-neutral-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#1B5E20] mb-2 flex items-center gap-1.5">
            <History className="w-3.5 h-3.5" />
            <span>02. Trayectoria y Resiliencia Empresarial</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 mb-4 text-balance">
            De una sola camioneta en 1982 al operador 3PL líder en el oriente y los llanos.
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed">
            Una historia forjada en carretera. El relevo generacional de Vito y Giuseppe Binaggia (“Vito y Peppe”) transformó el esfuerzo de su padre en un sistema logístico formal (RIF J-060038278), caracterizado por alianzas de más de 40 años con las principales marcas de alimentos de Venezuela.
          </p>
        </div>

        {/* Narrative & Archival Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-stretch">
          
          {/* Heritage Archival Image Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-xl overflow-hidden border border-neutral-200 bg-neutral-900 shadow-sm flex-1 min-h-[300px]">
              <img
                src={IMAGES.heritage1982}
                alt="Orígenes de DIVIPECA en 1982, ruta Caracas a Valle de la Pascua"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-white/95 backdrop-blur-sm rounded-lg border border-neutral-200/80 text-xs text-neutral-800">
                <div className="font-semibold text-neutral-950 mb-0.5 flex items-center justify-between">
                  <span>Valle de la Pascua, 1982</span>
                  <span className="text-[10px] uppercase font-mono text-neutral-500">Archivo Histórico</span>
                </div>
                <p className="text-[11px] text-neutral-600">
                  La ruta original transportaba mortadela Giacomello y Pastas Capri. Cuatro décadas después, la palabra y el compromiso siguen intactos.
                </p>
              </div>
            </div>
          </div>

          {/* Active Milestone Highlight Card */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 bg-white rounded-xl border border-neutral-200 shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMilestone.year}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="flex-1"
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-[#1B5E20]">
                      {activeMilestone.year}
                    </span>
                    <span className="text-neutral-300">/</span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      {activeMilestone.category}
                    </span>
                  </div>

                  <span className="text-xs text-neutral-400 font-mono">
                    Hito {activeMilestoneIndex + 1} de {TIMELINE_MILESTONES.length}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 mb-1.5">
                  {activeMilestone.title}
                </h3>
                <div className="text-xs font-semibold text-neutral-500 mb-4">
                  {activeMilestone.subtitle}
                </div>

                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-6">
                  {activeMilestone.description}
                </p>

                <div className="p-4 bg-emerald-50/60 rounded-lg border border-emerald-100 mb-6">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#1B5E20] mb-1">
                    Logro Institucional
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-emerald-950">
                    {activeMilestone.achievement}
                  </p>
                </div>

                {activeMilestone.partners && (
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold text-neutral-600">Alianzas involucradas:</span>
                    {activeMilestone.partners.map((partner) => (
                      <span
                        key={partner}
                        className="px-2 py-0.5 bg-neutral-100 text-neutral-800 rounded font-medium text-[11px]"
                      >
                        {partner}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Stepper Controls */}
            <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between">
              <button
                disabled={activeMilestoneIndex === 0}
                onClick={() => setActiveMilestoneIndex((prev) => Math.max(0, prev - 1))}
                className="text-xs font-semibold px-3 py-1.5 rounded border border-neutral-200 text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ← Anterior
              </button>

              <div className="flex items-center gap-1.5">
                {TIMELINE_MILESTONES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveMilestoneIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      activeMilestoneIndex === idx
                        ? 'w-6 bg-[#1B5E20]'
                        : 'w-2 bg-neutral-200 hover:bg-neutral-300'
                    }`}
                    aria-label={`Ver hito ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                disabled={activeMilestoneIndex === TIMELINE_MILESTONES.length - 1}
                onClick={() => setActiveMilestoneIndex((prev) => Math.min(TIMELINE_MILESTONES.length - 1, prev + 1))}
                className="text-xs font-semibold px-3 py-1.5 rounded border border-neutral-200 text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Siguiente →
              </button>
            </div>
          </div>

        </div>

        {/* Compact Scrubber Timeline Grid (All Milestones Quick Access) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {TIMELINE_MILESTONES.map((m, idx) => {
            const isCurrent = idx === activeMilestoneIndex;
            return (
              <button
                key={m.year}
                onClick={() => setActiveMilestoneIndex(idx)}
                className={`p-3 rounded-lg border text-left transition-all relative ${
                  isCurrent
                    ? 'bg-white border-[#1B5E20] ring-1 ring-[#1B5E20] shadow-sm'
                    : 'bg-white/60 border-neutral-200 hover:bg-white hover:border-neutral-300'
                }`}
              >
                <div className="text-xs font-bold font-mono text-[#1B5E20] mb-0.5">
                  {m.year}
                </div>
                <div className="text-[11px] font-semibold text-neutral-900 line-clamp-1">
                  {m.title}
                </div>
                <div className="text-[10px] text-neutral-500 line-clamp-1 mt-0.5">
                  {m.category}
                </div>
              </button>
            );
          })}
        </div>

        {/* Strategic Partnerships Strip */}
        <div className="mt-10 p-5 bg-white rounded-xl border border-neutral-200 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-1.5">
            <Handshake className="w-3.5 h-3.5 text-[#1B5E20]" />
            <span>Alianzas Comerciales e Históricas</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CLIENT_PARTNERS.map((client) => (
              <div key={client.name} className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                <div className="text-xs font-bold text-neutral-950 mb-1">
                  {client.name}
                </div>
                <p className="text-[11px] text-neutral-600 leading-normal">
                  {client.relationship}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
