import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { TIMELINE_MILESTONES, CLIENT_PARTNERS } from '../data/divipecaData';
import { History, Handshake, Camera } from 'lucide-react';
import {
  EASE_PREMIUM,
  DUR_FAST,
  DUR_MED,
  VIEWPORT_CONFIG,
  fadeUp,
  secondaryButtonHover,
  secondaryButtonTap,
} from '../utils/motion';

export const HistorySection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState<number>(0);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});
  const activeMilestone = TIMELINE_MILESTONES[activeMilestoneIndex];

  return (
    <section
      id="historia"
      className="relative pt-20 pb-20 sm:pt-24 sm:pb-24 bg-neutral-50 border-b border-neutral-200/80"
    >
      {/* Soft Top Ambient Gradient for smooth transition from dark Indicadores block */}
      <div className="absolute top-0 left-0 right-0 h-10 overflow-hidden pointer-events-none">
        <div className="w-full h-full bg-gradient-to-b from-neutral-900/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Clean Section Header (simple fade + y, no excessive multi-element stagger) */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: DUR_MED, ease: EASE_PREMIUM }}
          className="max-w-3xl mb-12 sm:mb-14"
        >
          <div className="text-xs font-semibold uppercase tracking-wider text-[#1B5E20] mb-2.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E20]" />
            <History className="w-3.5 h-3.5" />
            <span>02. Trayectoria y Continuidad · Desde 1990</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 mb-4 text-balance">
            De una sola camioneta en 1982 a nuestra consolidación institucional desde 1990.
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed font-normal">
            Una historia forjada en carretera. El relevo generacional de Vito y Giuseppe Binaggia (“Vito y Peppe”) transformó el esfuerzo original de su padre en una empresa formal desde 1990 (RIF J-060038278), respaldada por alianzas de largo plazo en el oriente, los llanos y el Estado Bolívar.
          </p>
        </motion.div>

        {/* Narrative & Stage-Synchronized Visual Split */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          variants={fadeUp}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-stretch"
        >
          {/* Dynamic Per-Stage Photography Card with 0.45s Smooth Crossfade */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200/90 bg-neutral-950 flex-1 min-h-[340px] sm:min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMilestone.year}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE_PREMIUM }}
                  className="absolute inset-0 w-full h-full"
                >
                  {imageErrorMap[activeMilestone.year] ? (
                    <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-emerald-950/60 flex flex-col items-center justify-center p-6 text-center text-neutral-300">
                      <Camera className="w-8 h-8 text-emerald-400 mb-3" />
                      <div className="text-sm font-bold text-white mb-1">
                        {activeMilestone.imageLabel}
                      </div>
                      <p className="text-xs text-neutral-400 max-w-xs">
                        {activeMilestone.imageCaption}
                      </p>
                    </div>
                  ) : (
                    <img
                      src={activeMilestone.image}
                      alt={`${activeMilestone.title} — ${activeMilestone.imageLabel}`}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setImageErrorMap((prev) => ({ ...prev, [activeMilestone.year]: true }))
                      }
                      className="w-full h-full object-cover object-center"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={`caption-${activeMilestone.year}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: DUR_FAST, ease: EASE_PREMIUM }}
                  className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-md rounded-xl border border-white/60 text-xs text-neutral-800 z-10"
                >
                  <div className="font-semibold text-neutral-950 mb-0.5 flex items-center justify-between gap-2">
                    <span>{activeMilestone.imageLabel}</span>
                    <span className="text-[10px] uppercase font-mono text-[#1B5E20] font-bold tracking-wider shrink-0">
                      {activeMilestone.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-600 leading-normal">
                    {activeMilestone.imageCaption}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Active Milestone Narrative Card with calm fade */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 bg-white rounded-2xl border border-neutral-200">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMilestone.year}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DUR_FAST, ease: EASE_PREMIUM }}
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

                  <span className="text-xs text-neutral-400 font-mono tabular-nums">
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

                <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-100/90 mb-6">
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

            {/* Stepper Controls */}
            <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between">
              <motion.button
                type="button"
                disabled={activeMilestoneIndex === 0}
                onClick={() => setActiveMilestoneIndex((prev) => Math.max(0, prev - 1))}
                whileHover={activeMilestoneIndex > 0 ? secondaryButtonHover : undefined}
                whileTap={activeMilestoneIndex > 0 ? secondaryButtonTap : undefined}
                className="text-xs font-semibold px-3.5 py-1.5 rounded-lg border border-neutral-200 hover:border-[#1B5E20] text-neutral-700 hover:text-neutral-950 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
              >
                ← Anterior
              </motion.button>

              <div className="flex items-center gap-1.5">
                {TIMELINE_MILESTONES.map((m, idx) => (
                  <button
                    key={m.year}
                    type="button"
                    onClick={() => setActiveMilestoneIndex(idx)}
                    className={`h-1.5 rounded-full transition-colors duration-200 cursor-pointer ${
                      activeMilestoneIndex === idx
                        ? 'w-5 bg-[#1B5E20]'
                        : 'w-2 bg-neutral-200 hover:bg-neutral-300'
                    }`}
                    aria-label={`Ver hito ${idx + 1}`}
                  />
                ))}
              </div>

              <motion.button
                type="button"
                disabled={activeMilestoneIndex === TIMELINE_MILESTONES.length - 1}
                onClick={() =>
                  setActiveMilestoneIndex((prev) =>
                    Math.min(TIMELINE_MILESTONES.length - 1, prev + 1)
                  )
                }
                whileHover={
                  activeMilestoneIndex < TIMELINE_MILESTONES.length - 1
                    ? secondaryButtonHover
                    : undefined
                }
                whileTap={
                  activeMilestoneIndex < TIMELINE_MILESTONES.length - 1
                    ? secondaryButtonTap
                    : undefined
                }
                className="text-xs font-semibold px-3.5 py-1.5 rounded-lg border border-neutral-200 hover:border-[#1B5E20] text-neutral-700 hover:text-neutral-950 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
              >
                Siguiente →
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Linear-style Scrubber Timeline Tabs with Animated Bottom Underline (no jumping pills) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 border-b border-neutral-200/80 pb-2">
          {TIMELINE_MILESTONES.map((m, idx) => {
            const isCurrent = idx === activeMilestoneIndex;
            return (
              <button
                key={m.year}
                type="button"
                onClick={() => setActiveMilestoneIndex(idx)}
                className={`relative p-3 rounded-xl border text-left transition-colors duration-200 cursor-pointer ${
                  isCurrent
                    ? 'bg-white border-neutral-300 text-neutral-950'
                    : 'bg-white/60 border-neutral-200/80 text-neutral-600 hover:bg-white hover:border-neutral-300'
                }`}
              >
                <div
                  className={`text-xs font-bold font-mono mb-0.5 transition-colors duration-200 ${
                    isCurrent ? 'text-[#1B5E20]' : 'text-neutral-500'
                  }`}
                >
                  {m.year}
                </div>
                <div className="text-[11px] font-semibold text-neutral-900 line-clamp-1">
                  {m.title}
                </div>
                <div className="text-[10px] text-neutral-500 line-clamp-1 mt-0.5">
                  {m.category}
                </div>
                {isCurrent && (
                  <motion.span
                    layoutId="historyActiveUnderline"
                    transition={{ duration: DUR_FAST, ease: EASE_PREMIUM }}
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#1B5E20] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Existing Strategic Partnerships Strip (Preserved as requested, no new logo carousel) */}
        <div className="mt-10 p-5 sm:p-6 bg-white rounded-2xl border border-neutral-200">
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-1.5">
            <Handshake className="w-3.5 h-3.5 text-[#1B5E20]" />
            <span>Alianzas Comerciales e Históricas</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CLIENT_PARTNERS.map((client) => (
              <div
                key={client.name}
                className="p-3.5 bg-neutral-50/80 rounded-xl border border-neutral-200/70 hover:border-neutral-300 transition-colors duration-200"
              >
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
