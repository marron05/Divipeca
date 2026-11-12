import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TIMELINE_MILESTONES, IMAGES, CLIENT_PARTNERS } from '../data/divipecaData';
import { History, Handshake } from 'lucide-react';

const easeApple = [0.16, 1, 0.3, 1] as const;

export const HistorySection: React.FC = () => {
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState<number>(0);
  const activeMilestone = TIMELINE_MILESTONES[activeMilestoneIndex];

  return (
    <section id="historia" className="relative pt-20 pb-20 sm:pt-24 sm:pb-24 bg-neutral-50 border-b border-neutral-200/80 overflow-hidden">
      {/* Soft Top Ambient Gradient for smooth transition from dark Indicadores block */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-neutral-900/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: easeApple }}
          className="max-w-3xl mb-12 sm:mb-14"
        >
          <div className="text-xs font-semibold uppercase tracking-wider text-[#1B5E20] mb-2.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E20]" />
            <History className="w-3.5 h-3.5" />
            <span>02. Trayectoria y Resiliencia Empresarial</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 mb-4 text-balance">
            De una sola camioneta en 1982 al operador 3PL líder en el oriente y los llanos.
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed font-normal">
            Una historia forjada en carretera. El relevo generacional de Vito y Giuseppe Binaggia (“Vito y Peppe”) transformó el esfuerzo de su padre en un sistema logístico formal (RIF J-060038278), caracterizado por alianzas de más de 40 años con las principales marcas de alimentos de Venezuela.
          </p>
        </motion.div>

        {/* Narrative & Archival Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-stretch">
          
          {/* Heritage Archival Image Card with Subtle Zoom & Scrim */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: easeApple }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200/90 bg-neutral-950 shadow-md flex-1 min-h-[320px] sm:min-h-[380px] group">
              <img
                src={IMAGES.heritage1982}
                alt="Orígenes de DIVIPECA en 1982, ruta Caracas a Valle de la Pascua"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-md rounded-xl border border-white/60 text-xs text-neutral-800 shadow-sm transition-transform duration-300 group-hover:translate-y-[-2px]">
                <div className="font-semibold text-neutral-950 mb-0.5 flex items-center justify-between">
                  <span>Valle de la Pascua, 1982</span>
                  <span className="text-[10px] uppercase font-mono text-neutral-500 font-semibold tracking-wider">Archivo Histórico</span>
                </div>
                <p className="text-[11px] text-neutral-600 leading-normal">
                  La ruta original transportaba mortadela Giacomello y Pastas Capri. Cuatro décadas después, la palabra empeñada y el compromiso siguen intactos.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Active Milestone Highlight Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeApple }}
            className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 bg-white rounded-2xl border border-neutral-200 shadow-sm"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMilestone.year}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25, ease: easeApple }}
                className="flex-1"
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2.5">
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

                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-6 font-normal">
                  {activeMilestone.description}
                </p>

                <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-100/90 mb-6 transition-all">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#1B5E20] mb-1">
                    Logro Institucional
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-emerald-950 leading-relaxed">
                    {activeMilestone.achievement}
                  </p>
                </div>

                {activeMilestone.partners && (
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold text-neutral-600">Alianzas involucradas:</span>
                    {activeMilestone.partners.map((partner) => (
                      <span
                        key={partner}
                        className="px-2.5 py-1 bg-neutral-100 text-neutral-800 rounded-md font-medium text-[11px] border border-neutral-200/60"
                      >
                        {partner}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Stepper Controls with Micro-interactions */}
            <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between">
              <motion.button
                disabled={activeMilestoneIndex === 0}
                onClick={() => setActiveMilestoneIndex((prev) => Math.max(0, prev - 1))}
                whileHover={activeMilestoneIndex > 0 ? { scale: 1.03 } : {}}
                whileTap={activeMilestoneIndex > 0 ? { scale: 0.97 } : {}}
                className="text-xs font-semibold px-3.5 py-1.5 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                ← Anterior
              </motion.button>

              <div className="flex items-center gap-1.5">
                {TIMELINE_MILESTONES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveMilestoneIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeMilestoneIndex === idx
                        ? 'w-6 bg-[#1B5E20]'
                        : 'w-2 bg-neutral-200 hover:bg-neutral-300'
                    }`}
                    aria-label={`Ver hito ${idx + 1}`}
                  />
                ))}
              </div>

              <motion.button
                disabled={activeMilestoneIndex === TIMELINE_MILESTONES.length - 1}
                onClick={() => setActiveMilestoneIndex((prev) => Math.min(TIMELINE_MILESTONES.length - 1, prev + 1))}
                whileHover={activeMilestoneIndex < TIMELINE_MILESTONES.length - 1 ? { scale: 1.03 } : {}}
                whileTap={activeMilestoneIndex < TIMELINE_MILESTONES.length - 1 ? { scale: 0.97 } : {}}
                className="text-xs font-semibold px-3.5 py-1.5 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                Siguiente →
              </motion.button>
            </div>
          </motion.div>

        </div>

        {/* Compact Scrubber Timeline Grid (All Milestones Quick Access with hover states) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {TIMELINE_MILESTONES.map((m, idx) => {
            const isCurrent = idx === activeMilestoneIndex;
            return (
              <motion.button
                key={m.year}
                onClick={() => setActiveMilestoneIndex(idx)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`p-3 rounded-xl border text-left transition-all duration-200 relative cursor-pointer ${
                  isCurrent
                    ? 'bg-white border-[#1B5E20] ring-1 ring-[#1B5E20] shadow-sm'
                    : 'bg-white/70 border-neutral-200 hover:bg-white hover:border-neutral-300 hover:shadow-xs'
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
              </motion.button>
            );
          })}
        </div>

        {/* Strategic Partnerships Strip with hover lift */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.6, ease: easeApple }}
          className="mt-10 p-5 sm:p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm"
        >
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-1.5">
            <Handshake className="w-3.5 h-3.5 text-[#1B5E20]" />
            <span>Alianzas Comerciales e Históricas</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CLIENT_PARTNERS.map((client) => (
              <motion.div
                key={client.name}
                whileHover={{ y: -2, backgroundColor: '#fcfcfc' }}
                transition={{ duration: 0.2 }}
                className="p-3.5 bg-neutral-50/80 rounded-xl border border-neutral-200/70 hover:border-neutral-300 transition-colors"
              >
                <div className="text-xs font-bold text-neutral-950 mb-1">
                  {client.name}
                </div>
                <p className="text-[11px] text-neutral-600 leading-normal">
                  {client.relationship}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

