import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, animate, useReducedMotion } from 'motion/react';
import {
  KEY_METRICS,
  LEAD_TIME_DATA,
  TERMINOLOGY_CLARIFIERS,
  COMPANY_INFO,
  IMAGES,
} from '../data/divipecaData';
import {
  TrendingUp,
  CheckCircle,
  Shield,
  Clock,
  ArrowRight,
  MessageCircle,
  Info,
} from 'lucide-react';
import {
  EASE_PREMIUM,
  DUR_FAST,
  DUR_MED,
  DUR_SLOW,
  BUTTON_TRANSITION_CLASS,
  useStickyInView,
  primaryButtonHover,
  primaryButtonTap,
  secondaryButtonHover,
  secondaryButtonTap,
} from '../utils/motion';

interface StatsSectionProps {
  onOpenContact: (source?: string) => void;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ onOpenContact }) => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedMetricId, setSelectedMetricId] = useState<string>('otif');
  const selectedMetric = KEY_METRICS.find((m) => m.id === selectedMetricId) || KEY_METRICS[0];

  const [hoveredLeadStep, setHoveredLeadStep] = useState<number | null>(null);
  const [pinnedLeadStep, setPinnedLeadStep] = useState<number>(0);

  const headerRef = useRef<HTMLDivElement | null>(null);
  const leadBlockRef = useRef<HTMLDivElement | null>(null);
  const kpiGridRef = useRef<HTMLDivElement | null>(null);
  const detailPanelRef = useRef<HTMLDivElement | null>(null);
  const clarifiersRef = useRef<HTMLDivElement | null>(null);

  const headerRevealed = useStickyInView(headerRef);
  const leadInView = useStickyInView(leadBlockRef);
  const kpiRevealed = useStickyInView(kpiGridRef);
  const detailRevealed = useStickyInView(detailPanelRef);
  const clarifiersRevealed = useStickyInView(clarifiersRef);

  const hasStartedLeadRef = useRef(false);
  const leadControlsRef = useRef<ReturnType<typeof animate> | null>(null);
  const [formattedLeadDisplay, setFormattedLeadDisplay] = useState<string>(
    shouldReduceMotion ? '0,70' : '1,00'
  );
  const [leadSettled, setLeadSettled] = useState<boolean>(Boolean(shouldReduceMotion));

  useEffect(() => {
    if (!leadInView || hasStartedLeadRef.current) return;
    hasStartedLeadRef.current = true;

    if (shouldReduceMotion) {
      setFormattedLeadDisplay('0,70');
      setLeadSettled(true);
      return;
    }

    leadControlsRef.current = animate(1.0, LEAD_TIME_DATA.value, {
      duration: DUR_SLOW,
      ease: EASE_PREMIUM,
      onUpdate: (latest) => {
        const clamped = Math.max(0.7, Math.min(1.0, latest));
        if (clamped <= 0.704) {
          setFormattedLeadDisplay('0,70');
        } else {
          setFormattedLeadDisplay(clamped.toFixed(2).replace('.', ','));
        }
      },
      onComplete: () => {
        setFormattedLeadDisplay('0,70');
        setLeadSettled(true);
      },
    });

    // Guarantee final exact 0,70 state even if RAF is throttled or delayed
    const safetyTimer = window.setTimeout(() => {
      setFormattedLeadDisplay('0,70');
      setLeadSettled(true);
    }, 1080);

    return () => {
      window.clearTimeout(safetyTimer);
    };
  }, [leadInView, shouldReduceMotion]);

  useEffect(() => {
    return () => {
      leadControlsRef.current?.stop();
    };
  }, []);

  const activeLeadIndex = hoveredLeadStep !== null ? hoveredLeadStep : pinnedLeadStep;
  const activeLeadStep = LEAD_TIME_DATA.steps[activeLeadIndex];

  // Scale geometry: 0.0 -> 1.25 (so 0.70 = 56%, 1.00 = 80%, >1.00 = 80%..100%)
  const scaleMax = 1.25;
  const benchmarkPercent = (1.0 / scaleMax) * 100; // 80%

  const whatsappUrl = COMPANY_INFO.whatsappUrl;

  return (
    <section
      id="trayectoria-kpis"
      className="pt-16 pb-20 bg-neutral-950 text-white relative scroll-mt-20"
    >
      {/* Background Subtle Gradient & Grid Texture clipped safely in background wrapper */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(27,94,32,0.18),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header (single clean reveal, no conflicting child variants) */}
        <motion.div
          ref={headerRef}
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={headerRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: DUR_MED, ease: EASE_PREMIUM }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-800/80"
        >
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>01. Trayectoria y KPIs · Desde 1990</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
              Cifras consolidadas que respaldan cada despacho.
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md font-normal leading-relaxed">
            Medición continua bajo estándares FMCG. Indicadores auditados con trazabilidad
            por paleta, guía de despacho y punto de venta en los 4 estados.
          </p>
        </motion.div>

        {/* FEATURED INTERACTIVE MODULE: LEAD TIME ANIMADO (1,00 -> 0,70 exact, GPU scaleX + translateX) */}
        <motion.div
          ref={leadBlockRef}
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={leadInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: DUR_MED, ease: EASE_PREMIUM }}
          className="my-8 rounded-2xl border border-neutral-800 bg-neutral-900/75 p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (A + B + D): Big 0,70 Readout + GPU Horizontal Scale Bar + Fixed Microcopy */}
            <div className="lg:col-span-6 flex flex-col justify-between">
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

                {/* A) Big Animated Number (1,00 -> 0,70 exact) */}
                <div className="flex flex-wrap items-baseline gap-4 mb-3">
                  <div className="flex items-baseline gap-2">
                    <div className="text-5xl sm:text-6xl font-black tracking-tight text-white font-mono tabular-nums leading-none">
                      {formattedLeadDisplay}
                    </div>
                    <span className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                      días
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-sm font-bold text-emerald-400">
                      {LEAD_TIME_DATA.message}
                    </div>
                    <div className="text-xs text-neutral-400">
                      {LEAD_TIME_DATA.scaleLabel} · Referencia promedio real
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                  {LEAD_TIME_DATA.definition}
                </p>

                {/* B) GPU-Composited Horizontal Scale Bar: 1,0 -> 0,70 */}
                <div className="rounded-xl bg-neutral-950/90 border border-neutral-800/90 p-4 sm:p-5 mb-4">
                  <div className="flex items-center justify-between text-[11px] font-medium mb-3">
                    <span className="text-emerald-400 font-semibold">
                      Zona &lt; 1,0 · Entregas en menos de 24 h
                    </span>
                    <span className="text-amber-300/85">
                      Zona &gt; 1,0 · Alerta (&gt; 24 h)
                    </span>
                  </div>

                  {/* Scale Track */}
                  <div className="relative pt-8 pb-8">
                    {/* Track Bar Container */}
                    <div className="relative h-4 w-full rounded-full overflow-hidden bg-neutral-800/90 border border-neutral-700/80 flex">
                      {/* Green Zone (< 1,0 = 80% of 1,25 scale) */}
                      <div
                        style={{ width: `${benchmarkPercent}%` }}
                        className="h-full bg-emerald-950/75 relative overflow-hidden"
                      >
                        {/* GPU-only scaleX fill: 1.0 (100% of green zone) -> 0.70 (70% of green zone) */}
                        <motion.div
                          initial={{ scaleX: shouldReduceMotion ? 0.7 : 1 }}
                          animate={leadInView ? { scaleX: 0.7 } : { scaleX: 1 }}
                          style={{ transformOrigin: 'left' }}
                          transition={{ duration: DUR_SLOW, ease: EASE_PREMIUM }}
                          className="h-full w-full bg-gradient-to-r from-[#1B5E20] via-emerald-600 to-emerald-400 rounded-l-full"
                        />
                      </div>

                      {/* Soft Alert Zone (> 1,0) */}
                      <div
                        style={{ width: `${100 - benchmarkPercent}%` }}
                        className="h-full bg-amber-500/20 border-l-2 border-amber-400/70"
                      />
                    </div>

                    {/* GPU-only translateX wrapper for Floating DIVIPECA Badge + Track Thumb (80% -> 56%) */}
                    <motion.div
                      initial={{ x: shouldReduceMotion ? '56%' : '80%' }}
                      animate={leadInView ? { x: '56%' } : { x: '80%' }}
                      transition={{ duration: DUR_SLOW, ease: EASE_PREMIUM }}
                      className="absolute inset-y-0 left-0 right-0 pointer-events-none z-20"
                    >
                      {/* Floating Label: soft single opacity pulse 0.7 -> 1 upon reaching 0,70 */}
                      <motion.div
                        initial={{ opacity: 0.9 }}
                        animate={
                          leadSettled && !shouldReduceMotion
                            ? { opacity: [0.7, 1] }
                            : { opacity: 1 }
                        }
                        transition={{ duration: 0.45, ease: EASE_PREMIUM }}
                        className="absolute top-0 left-0 -translate-x-1/2 flex flex-col items-center"
                      >
                        <span className="whitespace-nowrap text-[11px] font-bold text-white bg-[#1B5E20] border border-emerald-400/50 px-2.5 py-0.5 rounded-md font-mono tabular-nums">
                          {LEAD_TIME_DATA.displayValue} · {LEAD_TIME_DATA.recentLabel}
                        </span>
                        <span className="w-0.5 h-2.5 bg-emerald-400 mt-0.5" />
                      </motion.div>

                      {/* Track Thumb */}
                      <div className="absolute top-[30px] left-0 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-[3px] border-[#1B5E20]" />
                    </motion.div>

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
            </div>

            {/* Right Column (C + E): 4 Interactive Operational Steps + Crossfade Detail + Footer CTAs */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                    Ciclo operativo en 4 pasos (haz clic o pasa el cursor)
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">
                    Paso {activeLeadStep.step} de 4
                  </span>
                </div>

                {/* 4 Interactive Steps: border/background hover only, zero scale */}
                <div className="space-y-2.5 mb-4">
                  {LEAD_TIME_DATA.steps.map((item, idx) => {
                    const isActive = activeLeadIndex === idx;
                    return (
                      <button
                        key={item.step}
                        type="button"
                        onMouseEnter={() => setHoveredLeadStep(idx)}
                        onMouseLeave={() => setHoveredLeadStep(null)}
                        onFocus={() => setHoveredLeadStep(idx)}
                        onBlur={() => setHoveredLeadStep(null)}
                        onClick={() => setPinnedLeadStep(idx)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-colors duration-200 flex items-center justify-between gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${
                          isActive
                            ? 'bg-neutral-950 border-emerald-500/80 ring-1 ring-emerald-500/35'
                            : 'bg-neutral-950/55 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-950/80'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-full text-xs font-bold font-mono flex items-center justify-center shrink-0 transition-colors duration-200 ${
                              isActive
                                ? 'bg-[#1B5E20] text-white'
                                : 'bg-neutral-800 text-neutral-300'
                            }`}
                          >
                            {item.step}
                          </span>
                          <span
                            className={`text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                              isActive ? 'text-white' : 'text-neutral-300'
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>

                        <span
                          className={`text-[10px] font-mono whitespace-nowrap shrink-0 transition-colors duration-200 ${
                            isActive ? 'text-emerald-400 font-semibold' : 'text-neutral-500'
                          }`}
                        >
                          {item.segmentShare}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Synchronized Step Explanation Box (opacity crossfade ~200ms) */}
                <div className="rounded-xl bg-neutral-950/90 border border-neutral-800 p-4 mb-5 min-h-[76px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeLeadStep.step}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: EASE_PREMIUM }}
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
                  onClick={() => onOpenContact('Trayectoria y KPIs - Lead Time 0,70 días')}
                  whileHover={primaryButtonHover}
                  whileTap={primaryButtonTap}
                  className={`inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#1B5E20] hover:bg-[#2E7D32] rounded-lg ${BUTTON_TRANSITION_CLASS} cursor-pointer`}
                >
                  <span>Solicitar Evaluación Logística</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={secondaryButtonHover}
                  whileTap={secondaryButtonTap}
                  className={`inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white bg-neutral-950 border border-neutral-700 hover:border-[#1B5E20] rounded-lg ${BUTTON_TRANSITION_CLASS} cursor-pointer`}
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Hablar por WhatsApp</span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 5 Consolidated KPI Cards (direct reveal per card, zero parent stagger conflict) */}
        <div ref={kpiGridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 my-8">
          {KEY_METRICS.map((metric, idx) => {
            const isSelected = selectedMetric.id === metric.id;
            return (
              <motion.button
                key={metric.id}
                type="button"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                animate={kpiRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{
                  duration: DUR_MED,
                  delay: shouldReduceMotion ? 0 : idx * 0.05,
                  ease: EASE_PREMIUM,
                }}
                onClick={() => setSelectedMetricId(metric.id)}
                className={`text-left p-4 sm:p-5 rounded-xl border ${BUTTON_TRANSITION_CLASS} relative flex flex-col justify-between cursor-pointer group ${
                  isSelected
                    ? 'bg-neutral-900/90 border-emerald-500/80 ring-1 ring-emerald-500/40'
                    : 'bg-neutral-900/40 border-neutral-800/90 hover:border-emerald-500/45 hover:bg-neutral-900/70'
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
                        <span className="text-[10px] text-neutral-500 group-hover:text-neutral-300 transition-colors">
                          Ver
                        </span>
                      )}
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono tabular-nums">
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

        {/* Contextual Metric Deep-Dive Panel */}
        <motion.div
          ref={detailPanelRef}
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={detailRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: DUR_MED, ease: EASE_PREMIUM }}
          className="bg-neutral-900/60 border border-neutral-800/90 rounded-2xl p-5 sm:p-7 backdrop-blur-xs"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMetric.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: DUR_FAST, ease: EASE_PREMIUM }}
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
                <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800/90 hover:border-neutral-700/80 transition-colors duration-200">
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

                <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800/90 hover:border-neutral-700/80 transition-colors duration-200">
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
                  Cero tolerancia a roturas y control de mermas menor al 0.02%. Política de
                  reposición inmediata en caso de incidencia.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Clear Terminology Definitions Strip (3PL · OTIF · Lead time) */}
        <motion.div
          ref={clarifiersRef}
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={clarifiersRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: DUR_MED, ease: EASE_PREMIUM }}
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

        {/* Compact Operational Support Photos (2 real operation frames) */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative rounded-2xl overflow-hidden border border-neutral-800/90 bg-neutral-900 h-48 sm:h-56">
            <img
              src={IMAGES.forkliftOps}
              alt="Montacargas Toyota DIVIPECA movilizando estibas de alimentos en centro logístico"
              loading="lazy"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-white">Manipulación y estibado mecanizado</span>
              <span className="text-[11px] font-mono text-emerald-400">Picking & Cross-docking</span>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-neutral-800/90 bg-neutral-900 h-48 sm:h-56">
            <img
              src={IMAGES.warehouseRacks}
              alt="Pasillo de almacenamiento paletizado en racks selectivos de DIVIPECA"
              loading="lazy"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-white">Almacenamiento seco en racks selectivos</span>
              <span className="text-[11px] font-mono text-emerald-400">Normas BPM · FMCG</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gentle Architectural Transition Gradient toward the light Diagnóstico 3PL section */}
      <div className="w-full h-10 mt-14 bg-gradient-to-b from-neutral-950 to-neutral-900/40 pointer-events-none" />
    </section>
  );
};
