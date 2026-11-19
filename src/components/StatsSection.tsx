import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'motion/react';
import { KEY_METRICS, LEAD_TIME_DATA, TERMINOLOGY_CLARIFIERS, COMPANY_INFO } from '../data/divipecaData';
import { TrendingUp, CheckCircle, Shield, Clock, ArrowRight, MessageCircle, Info } from 'lucide-react';
import { fadeUp, staggerContainer, cardHover, buttonHover, buttonTap } from '../utils/motion';

interface StatsSectionProps {
  onOpenContact: (source?: string) => void;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ onOpenContact }) => {
  const [selectedMetricId, setSelectedMetricId] = useState<string>('otif');
  const selectedMetric = KEY_METRICS.find((m) => m.id === selectedMetricId) || KEY_METRICS[0];

  const [hoveredLeadStep, setHoveredLeadStep] = useState<number | null>(null);
  const [pinnedLeadStep, setPinnedLeadStep] = useState<number>(0);

  const leadBlockRef = useRef<HTMLDivElement | null>(null);
  const leadInView = useInView(leadBlockRef, { once: true, amount: 0.25 });
  const [animatedLeadVal, setAnimatedLeadVal] = useState<number>(1.0);

  useEffect(() => {
    if (!leadInView) return;
    const controls = animate(1.0, LEAD_TIME_DATA.value, {
      duration: 1.0,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setAnimatedLeadVal(latest),
    });
    return () => controls.stop();
  }, [leadInView]);

  const activeLeadIndex = hoveredLeadStep !== null ? hoveredLeadStep : pinnedLeadStep;
  const activeLeadStep = LEAD_TIME_DATA.steps[activeLeadIndex];

  // Scale geometry: 0.0 -> 1.25 (so 0.70 = 56%, 1.00 = 80%, >1.00 = 80%..100%)
  const scaleMax = 1.25;
  const benchmarkPercent = (1.0 / scaleMax) * 100; // 80%
  const targetPercent = (LEAD_TIME_DATA.value / scaleMax) * 100; // 56%

  const formattedLeadDisplay = animatedLeadVal.toFixed(2).replace('.', ',');

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hola DIVIPECA, me interesa conocer cómo operan con Lead time 0,70 (<24h) y 99,8% OTIF.'
  )}`;

  return (
    <section id="indicadores" className="pt-16 pb-20 bg-neutral-950 text-white relative">
      {/* Background Subtle Gradient & Grid Texture clipped safely in background wrapper */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(27,94,32,0.18),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-800/80"
        >
          <div>
            <motion.div
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>01. Capacidad, Lead Time y Desempeño Operacional</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance"
            >
              Cifras consolidadas que respaldan cada despacho.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="text-sm text-neutral-400 max-w-md font-normal leading-relaxed"
          >
            Medición continua bajo estándares FMCG. Indicadores auditados con trazabilidad
            por estiba, guía de despacho y punto de venta en los 4 estados.
          </motion.p>
        </motion.div>

        {/* FEATURED INTERACTIVE MODULE: LEAD TIME ANIMADO (1,0 -> 0,70) */}
        <motion.div
          ref={leadBlockRef}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="my-8 rounded-2xl border border-neutral-800 bg-neutral-900/75 p-6 sm:p-8 shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left/Top Column (A + B + D): Big 0,70 Hero Readout + Animated Scale Bar + Fixed Microcopy */}
            <motion.div variants={fadeUp} className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{LEAD_TIME_DATA.label}</span>
                  </div>
                  <span className="text-xs font-mono text-neutral-300 bg-neutral-950/90 border border-neutral-800 px-2.5 py-1 rounded-md">
                    {LEAD_TIME_DATA.scaleLabel}
                  </span>
                </div>

                {/* A) Big Animated Number + Scale & Definition */}
                <div className="flex flex-wrap items-baseline gap-4 mb-3">
                  <div className="text-5xl sm:text-6xl font-black tracking-tight text-white font-mono tabular-nums leading-none">
                    {formattedLeadDisplay}
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-sm font-bold text-emerald-400">
                      {LEAD_TIME_DATA.message}
                    </div>
                    <div className="text-xs text-neutral-400">
                      {LEAD_TIME_DATA.scaleLabel} · Referencia promedio reciente
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                  {LEAD_TIME_DATA.definition}
                </p>

                {/* B) Animated Horizontal Scale Bar: 1,0 -> 0,70 */}
                <div className="rounded-xl bg-neutral-950/90 border border-neutral-800/90 p-4 sm:p-5 mb-4">
                  {/* Top labels above scale */}
                  <div className="flex items-center justify-between text-[11px] font-medium mb-3">
                    <span className="text-emerald-400 font-semibold">
                      Zona &lt; 1,0 · Entregas en menos de 24 h
                    </span>
                    <span className="text-amber-300/85">
                      Zona &gt; 1,0 · Alerta (&gt; 24 h)
                    </span>
                  </div>

                  {/* Scale Track */}
                  <div className="relative pt-7 pb-8">
                    {/* Floating DIVIPECA 0,70 Marker (animates from 80% -> 56%) */}
                    <motion.div
                      initial={{ left: `${benchmarkPercent}%`, opacity: 0.6 }}
                      animate={
                        leadInView
                          ? { left: `${targetPercent}%`, opacity: 1 }
                          : { left: `${benchmarkPercent}%`, opacity: 0.6 }
                      }
                      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-0 -translate-x-1/2 flex flex-col items-center z-20"
                    >
                      <span className="whitespace-nowrap text-[11px] font-bold text-white bg-[#1B5E20] border border-emerald-400/50 px-2.5 py-0.5 rounded-md shadow-sm font-mono tabular-nums">
                        {LEAD_TIME_DATA.displayValue} · {LEAD_TIME_DATA.recentLabel}
                      </span>
                      <span className="w-0.5 h-2.5 bg-emerald-400 mt-0.5" />
                    </motion.div>

                    {/* Track Bar Container */}
                    <div className="relative h-4 w-full rounded-full overflow-hidden bg-neutral-800/90 border border-neutral-700/80 flex">
                      {/* Green Zone (< 1,0) */}
                      <div
                        style={{ width: `${benchmarkPercent}%` }}
                        className="h-full bg-emerald-950/75 relative overflow-hidden"
                      >
                        {/* Animated Fill inside Green Zone: 1,0 (100% of green zone) -> 0,70 (70% of green zone) */}
                        <motion.div
                          initial={{ width: '100%' }}
                          animate={leadInView ? { width: '70%' } : { width: '100%' }}
                          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full bg-gradient-to-r from-[#1B5E20] via-emerald-600 to-emerald-400 rounded-l-full"
                        />
                      </div>

                      {/* Soft Alert Zone (> 1,0) */}
                      <div
                        style={{ width: `${100 - benchmarkPercent}%` }}
                        className="h-full bg-amber-500/20 border-l-2 border-amber-400/70"
                      />
                    </div>

                    {/* Active Indicator Dot on Track */}
                    <motion.div
                      initial={{ left: `${benchmarkPercent}%` }}
                      animate={
                        leadInView
                          ? { left: `${targetPercent}%` }
                          : { left: `${benchmarkPercent}%` }
                      }
                      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-[26px] -translate-x-1/2 w-5 h-5 rounded-full bg-white border-[3px] border-[#1B5E20] shadow-md z-20 pointer-events-none"
                    />

                    {/* Fixed 1,0 Benchmark Marker below track */}
                    <div
                      style={{ left: `${benchmarkPercent}%` }}
                      className="absolute bottom-0 -translate-x-1/2 flex flex-col items-center"
                    >
                      <span className="w-0.5 h-2.5 bg-amber-400/80 mb-0.5" />
                      <span className="whitespace-nowrap text-[11px] font-mono font-semibold text-amber-300">
                        1,0 · {LEAD_TIME_DATA.benchmarkLabel}
                      </span>
                    </div>

                    {/* 0,0 Origin Marker */}
                    <div className="absolute bottom-0 left-0 text-[10px] font-mono text-neutral-500">
                      0,0
                    </div>
                  </div>
                </div>

                {/* D) Fixed Microcopy */}
                <p className="text-xs text-neutral-300 leading-relaxed flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{LEAD_TIME_DATA.microcopy}</span>
                </p>
              </div>
            </motion.div>

            {/* Right Column (C + E): 4 Interactive Operational Steps + Dynamic Step Detail + Footer CTAs */}
            <motion.div variants={fadeUp} className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                    Ciclo operativo en 4 pasos (haz clic o pasa el cursor)
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">
                    Paso {activeLeadStep.step} de 4
                  </span>
                </div>

                {/* 4 Interactive Steps */}
                <div className="space-y-2.5 mb-4">
                  {LEAD_TIME_DATA.steps.map((item, idx) => {
                    const isActive = activeLeadIndex === idx;
                    return (
                      <motion.button
                        key={item.step}
                        type="button"
                        onMouseEnter={() => setHoveredLeadStep(idx)}
                        onMouseLeave={() => setHoveredLeadStep(null)}
                        onFocus={() => setHoveredLeadStep(idx)}
                        onBlur={() => setHoveredLeadStep(null)}
                        onClick={() => setPinnedLeadStep(idx)}
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                          isActive
                            ? 'bg-neutral-950 border-emerald-500/80 ring-1 ring-emerald-500/35 shadow-md'
                            : 'bg-neutral-950/55 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-full text-xs font-bold font-mono flex items-center justify-center shrink-0 transition-colors ${
                              isActive
                                ? 'bg-[#1B5E20] text-white'
                                : 'bg-neutral-800 text-neutral-300'
                            }`}
                          >
                            {item.step}
                          </span>
                          <span
                            className={`text-xs sm:text-sm font-semibold transition-colors ${
                              isActive ? 'text-white' : 'text-neutral-300'
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>

                        <span
                          className={`text-[10px] font-mono whitespace-nowrap shrink-0 ${
                            isActive ? 'text-emerald-400 font-semibold' : 'text-neutral-500'
                          }`}
                        >
                          {item.segmentShare}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Synchronized Step Explanation Box */}
                <div className="rounded-xl bg-neutral-950/90 border border-neutral-800 p-4 mb-5 min-h-[76px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeLeadStep.step}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="text-xs font-bold text-emerald-400 mb-1">
                        {activeLeadStep.step}. {activeLeadStep.title}
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {activeLeadStep.detail}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* E) CTAs al pie del bloque Lead Time */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-neutral-800/80">
                <motion.button
                  type="button"
                  onClick={() => onOpenContact('Indicadores - Lead Time 0,70')}
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#1B5E20] hover:bg-[#2E7D32] rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  <span>Solicitar alianza logística</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  className="inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white bg-neutral-950 border border-neutral-700 hover:border-neutral-500 rounded-lg transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Hablar por WhatsApp</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Animated Motion Container for 5 Consolidated KPI Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* 5-Column High-Density KPI Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 my-8">
            {KEY_METRICS.map((metric) => {
              const isSelected = selectedMetric.id === metric.id;
              return (
                <motion.button
                  key={metric.id}
                  variants={fadeUp}
                  onClick={() => setSelectedMetricId(metric.id)}
                  whileHover={cardHover}
                  whileTap={{ scale: 0.98 }}
                  className={`text-left p-4 sm:p-5 rounded-xl border transition-colors duration-200 relative flex flex-col justify-between cursor-pointer group ${
                    isSelected
                      ? 'bg-neutral-900/90 border-emerald-500/80 ring-1 ring-emerald-500/40 shadow-lg shadow-emerald-950/20'
                      : 'bg-neutral-900/40 border-neutral-800/90 hover:border-neutral-700 hover:bg-neutral-900/70 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
                      <span className="font-medium text-neutral-400 group-hover:text-neutral-300 transition-colors">
                        {metric.unit}
                      </span>
                      {isSelected ? (
                        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/50">
                          Activo
                        </span>
                      ) : (
                        <span className="text-[10px] text-neutral-600 group-hover:text-neutral-400 transition-colors">
                          Ver
                        </span>
                      )}
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono tabular-nums transition-transform duration-200 group-hover:translate-x-0.5">
                      {metric.value}
                    </div>
                    {metric.subtitle && (
                      <div className="text-[11px] font-medium text-emerald-400 mt-1 leading-snug">
                        {metric.subtitle}
                      </div>
                    )}
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-neutral-800/80">
                    <div className="text-xs font-semibold text-neutral-200 line-clamp-1 group-hover:text-white transition-colors">
                      {metric.label}
                    </div>
                    <div className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                      {metric.trend}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Contextual Metric Deep-Dive Panel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="bg-neutral-900/60 border border-neutral-800/90 rounded-2xl p-5 sm:p-7 backdrop-blur-xs shadow-xl"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMetric.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-neutral-800/80 pb-4 lg:pb-0 lg:pr-6">
                <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">
                  Detalle del Indicador Seleccionado
                </div>
                <div className="text-xl font-bold text-white mb-1">
                  {selectedMetric.label} ({selectedMetric.value} {selectedMetric.unit})
                </div>
                {selectedMetric.subtitle && (
                  <div className="text-xs font-semibold text-emerald-300 mb-2">
                    {selectedMetric.subtitle}
                  </div>
                )}
                <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                  {selectedMetric.detail}
                </p>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800/90 hover:border-neutral-700/80 transition-colors">
                  <span className="text-[10px] uppercase font-semibold text-neutral-400 block mb-1">
                    Estándar Operativo
                  </span>
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{selectedMetric.benchmark}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-normal">
                    Supervisión rigurosa de carga en cada punto de despacho.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800/90 hover:border-neutral-700/80 transition-colors">
                  <span className="text-[10px] uppercase font-semibold text-neutral-400 block mb-1">
                    Consistencia en Ruta
                  </span>
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{selectedMetric.trend}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-normal">
                    Monitoreo en 4 estados con ventanas horarias estrictas.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-3 flex flex-col justify-center bg-neutral-950/90 p-4 rounded-xl border border-neutral-800/90">
                <div className="text-[11px] font-semibold text-neutral-200 mb-1 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  Garantía Operativa DIVIPECA
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-normal">
                  Cero tolerancia a roturas y control de mermas menor al 0.02%. Política de reposición inmediata
                  en caso de incidencia.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Clear Terminology Definitions Strip (3PL · OTIF · Lead time) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3.5"
        >
          {TERMINOLOGY_CLARIFIERS.map((item) => (
            <div
              key={item.term}
              title={`${item.term}: ${item.summary}`}
              className="rounded-xl border border-neutral-800/90 bg-neutral-900/40 px-4 py-3 flex items-start gap-2.5"
            >
              <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <span className="font-bold text-white">{item.term}: </span>
                <span className="text-neutral-300">{item.summary}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gentle Architectural Transition Gradient toward the light Historia section */}
      <div className="w-full h-10 mt-14 bg-gradient-to-b from-neutral-950 to-neutral-900/40 pointer-events-none" />
    </section>
  );
};
