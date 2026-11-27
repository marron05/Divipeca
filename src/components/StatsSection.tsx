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

  const scaleMax = 1.25;
  const benchmarkPercent = (1.0 / scaleMax) * 100;

  const whatsappUrl = COMPANY_INFO.whatsappUrl;

  return (
    <section
      id="trayectoria-kpis"
      className="pt-16 pb-16 sm:pb-20 bg-surface-alt text-ink border-t border-brand-green-muted/60 relative scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={headerRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: DUR_MED, ease: EASE_PREMIUM }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-brand-green-muted/80"
        >
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-brand-green mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
              <span>01. Trayectoria y KPIs · Desde 1990</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink text-balance">
              Cifras consolidadas que respaldan cada despacho.
            </h2>
          </div>
          <p className="text-sm text-ink-muted max-w-md font-normal leading-relaxed">
            Medición continua bajo estándares FMCG. Indicadores auditados con trazabilidad
            por paleta, guía de despacho y punto de venta en los 4 estados.
          </p>
        </motion.div>

        {/* FEATURED INTERACTIVE MODULE: LEAD TIME ANIMADO */}
        <motion.div
          ref={leadBlockRef}
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={leadInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: DUR_MED, ease: EASE_PREMIUM }}
          className="my-8 rounded-2xl border border-brand-green-muted/90 bg-white shadow-sm p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Big 0,70 Readout + GPU Horizontal Scale Bar */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-green">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{LEAD_TIME_DATA.label}</span>
                  </div>
                  <span className="text-xs font-mono text-brand-green bg-brand-green-soft border border-brand-green-muted px-2.5 py-1 rounded-md">
                    {LEAD_TIME_DATA.scaleLabel}
                  </span>
                </div>

                {/* Big Animated Number (1,00 -> 0,70 exact) */}
                <div className="flex flex-wrap items-baseline gap-4 mb-3">
                  <div className="flex items-baseline gap-2">
                    <div className="text-5xl sm:text-6xl font-black tracking-tight text-brand-green font-mono tabular-nums leading-none">
                      {formattedLeadDisplay}
                    </div>
                    <span className="text-base sm:text-lg font-bold text-brand-green font-mono">
                      días
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-sm font-bold text-ink">
                      {LEAD_TIME_DATA.message}
                    </div>
                    <div className="text-xs text-ink-muted">
                      {LEAD_TIME_DATA.scaleLabel} · Referencia promedio real
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-6">
                  {LEAD_TIME_DATA.definition}
                </p>

                {/* GPU-Composited Horizontal Scale Bar */}
                <div className="rounded-xl bg-surface-alt border border-brand-green-muted/80 p-4 sm:p-5 mb-4">
                  <div className="flex items-center justify-between text-[11px] font-medium mb-3">
                    <span className="text-brand-green font-semibold">
                      Zona &lt; 1,0 · Entregas en menos de 24 h
                    </span>
                    <span className="text-brand-red font-semibold">
                      Zona &gt; 1,0 · Alerta (&gt; 24 h)
                    </span>
                  </div>

                  {/* Scale Track */}
                  <div className="relative pt-8 pb-8">
                    <div className="relative h-4 w-full rounded-full overflow-hidden bg-white border border-brand-green-muted flex">
                      <div
                        style={{ width: `${benchmarkPercent}%` }}
                        className="h-full bg-brand-green-soft relative overflow-hidden"
                      >
                        <motion.div
                          initial={{ scaleX: shouldReduceMotion ? 0.7 : 1 }}
                          animate={leadInView ? { scaleX: 0.7 } : { scaleX: 1 }}
                          style={{ transformOrigin: 'left' }}
                          transition={{ duration: DUR_SLOW, ease: EASE_PREMIUM }}
                          className="h-full w-full bg-gradient-to-r from-brand-green-dark via-brand-green to-brand-green-hover rounded-l-full"
                        />
                      </div>

                      <div
                        style={{ width: `${100 - benchmarkPercent}%` }}
                        className="h-full bg-brand-red-soft border-l-2 border-brand-red/70"
                      />
                    </div>

                    {/* Floating DIVIPECA Badge + Track Thumb */}
                    <motion.div
                      initial={{ x: shouldReduceMotion ? '56%' : '80%' }}
                      animate={leadInView ? { x: '56%' } : { x: '80%' }}
                      transition={{ duration: DUR_SLOW, ease: EASE_PREMIUM }}
                      className="absolute inset-y-0 left-0 right-0 pointer-events-none z-20"
                    >
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
                        <span className="whitespace-nowrap text-[11px] font-bold text-white bg-brand-green border border-brand-green-dark/20 px-2.5 py-0.5 rounded-md font-mono tabular-nums shadow-xs">
                          {LEAD_TIME_DATA.displayWithUnit} · {LEAD_TIME_DATA.label}
                        </span>
                        <span className="w-0.5 h-2.5 bg-brand-green mt-0.5" />
                      </motion.div>

                      <div className="absolute top-[30px] left-0 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-[3px] border-brand-green shadow-xs" />
                    </motion.div>

                    {/* Fixed 1,0 Benchmark Marker */}
                    <div
                      style={{ left: `${benchmarkPercent}%` }}
                      className="absolute bottom-0 -translate-x-1/2 flex flex-col items-center"
                    >
                      <span className="w-0.5 h-2.5 bg-brand-red/80 mb-0.5" />
                      <span className="whitespace-nowrap text-[11px] font-mono font-semibold text-brand-red">
                        {LEAD_TIME_DATA.benchmarkLabel}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 text-[10px] font-mono text-ink-muted">
                      0,0
                    </div>
                  </div>
                </div>

                <p className="text-xs text-ink-muted leading-relaxed flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                  <span>{LEAD_TIME_DATA.microcopy}</span>
                </p>
              </div>
            </div>

            {/* Right Column: 4 Interactive Operational Steps + Crossfade Detail */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                    Ciclo operativo en 4 pasos (haz clic o pasa el cursor)
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-brand-green">
                    Paso {activeLeadStep.step} de 4
                  </span>
                </div>

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
                        className={`w-full text-left p-3.5 rounded-xl border transition-colors duration-200 flex items-center justify-between gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50 ${
                          isActive
                            ? 'bg-brand-green-soft/75 border-brand-green ring-1 ring-brand-green/25'
                            : 'bg-surface-warm border-neutral-200/90 hover:border-brand-green/50 hover:bg-brand-green-soft/35'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-full text-xs font-bold font-mono flex items-center justify-center shrink-0 transition-colors duration-200 ${
                              isActive
                                ? 'bg-brand-green text-white'
                                : 'bg-brand-green-soft text-brand-green border border-brand-green-muted'
                            }`}
                          >
                            {item.step}
                          </span>
                          <span
                            className={`text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                              isActive ? 'text-ink' : 'text-ink-muted'
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>

                        <span
                          className={`text-[10px] font-mono whitespace-nowrap shrink-0 transition-colors duration-200 ${
                            isActive ? 'text-brand-green font-semibold' : 'text-ink-muted'
                          }`}
                        >
                          {item.segmentShare}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="rounded-xl bg-brand-green-dark text-white border border-brand-green p-4 mb-5 min-h-[76px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeLeadStep.step}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: EASE_PREMIUM }}
                    >
                      <div className="text-xs font-bold text-brand-green-muted mb-1">
                        {activeLeadStep.step}. {activeLeadStep.title}
                      </div>
                      <p className="text-xs text-white/90 leading-relaxed">
                        {activeLeadStep.detail}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-brand-green-muted/70">
                <motion.button
                  type="button"
                  onClick={() => onOpenContact('Trayectoria y KPIs - Lead Time 0,70 días')}
                  whileHover={primaryButtonHover}
                  whileTap={primaryButtonTap}
                  className={`inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-brand-green hover:bg-brand-green-hover rounded-lg ${BUTTON_TRANSITION_CLASS} cursor-pointer`}
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
                  className={`inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-ink hover:text-brand-green bg-surface-warm border border-brand-green-muted hover:border-brand-green rounded-lg ${BUTTON_TRANSITION_CLASS} cursor-pointer`}
                >
                  <MessageCircle className="w-4 h-4 text-brand-green" />
                  <span>Hablar por WhatsApp</span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 5 Consolidated KPI Cards */}
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
                    ? 'bg-brand-green-dark text-white border-brand-green shadow-sm'
                    : 'bg-white border-brand-green-muted/80 hover:border-brand-green hover:bg-brand-green-soft/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span
                      className={`font-medium transition-colors ${
                        isSelected ? 'text-brand-green-muted' : 'text-ink-muted group-hover:text-ink'
                      }`}
                    >
                      {metric.unit}
                    </span>
                    {isSelected ? (
                      <span className="text-[10px] font-semibold text-brand-green-dark bg-brand-green-soft px-1.5 py-0.5 rounded border border-brand-green-muted">
                        Activo
                      </span>
                    ) : (
                      <span className="text-[10px] text-ink-muted group-hover:text-brand-green transition-colors">
                        Ver
                      </span>
                    )}
                  </div>
                  <div
                    className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-mono tabular-nums ${
                      isSelected ? 'text-white' : 'text-brand-green'
                    }`}
                  >
                    {metric.value}
                  </div>
                  {metric.subtitle && (
                    <div
                      className={`text-[11px] font-medium mt-1 leading-snug ${
                        isSelected ? 'text-brand-green-muted' : 'text-brand-green'
                      }`}
                    >
                      {metric.subtitle}
                    </div>
                  )}
                </div>

                <div
                  className={`mt-3.5 pt-3 border-t ${
                    isSelected ? 'border-white/15' : 'border-brand-green-muted/60'
                  }`}
                >
                  <div
                    className={`text-xs font-semibold line-clamp-1 transition-colors ${
                      isSelected ? 'text-white' : 'text-ink'
                    }`}
                  >
                    {metric.label}
                  </div>
                  <div
                    className={`text-[11px] line-clamp-1 mt-0.5 ${
                      isSelected ? 'text-brand-green-muted/90' : 'text-ink-muted'
                    }`}
                  >
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
          className="bg-white border border-brand-green-muted/90 rounded-2xl p-5 sm:p-7 shadow-xs"
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
              <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-brand-green-muted/70 pb-4 lg:pb-0 lg:pr-6">
                <div className="text-xs text-brand-green font-semibold uppercase tracking-wider mb-1">
                  Detalle del Indicador Seleccionado
                </div>
                <div className="text-xl font-bold text-ink mb-1">
                  {selectedMetric.label} ({selectedMetric.value} {selectedMetric.unit})
                </div>
                {selectedMetric.subtitle && (
                  <div className="text-xs font-semibold text-brand-green mb-2">
                    {selectedMetric.subtitle}
                  </div>
                )}
                <p className="text-xs text-ink-muted leading-relaxed font-normal">
                  {selectedMetric.detail}
                </p>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-surface-alt border border-brand-green-muted/80 hover:border-brand-green/50 transition-colors duration-200">
                  <span className="text-[10px] uppercase font-semibold text-ink-muted block mb-1">
                    Estándar Operativo
                  </span>
                  <div className="text-xs font-semibold text-ink flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-green shrink-0" />
                    <span>{selectedMetric.benchmark}</span>
                  </div>
                  <p className="text-[11px] text-ink-muted mt-1 leading-normal">
                    Supervisión rigurosa de carga en cada punto de despacho.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-alt border border-brand-green-muted/80 hover:border-brand-green/50 transition-colors duration-200">
                  <span className="text-[10px] uppercase font-semibold text-ink-muted block mb-1">
                    Consistencia en Ruta
                  </span>
                  <div className="text-xs font-semibold text-ink flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-brand-green shrink-0" />
                    <span>{selectedMetric.trend}</span>
                  </div>
                  <p className="text-[11px] text-ink-muted mt-1 leading-normal">
                    Monitoreo en 4 estados con ventanas horarias estrictas.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-3 flex flex-col justify-center bg-brand-green-dark text-white p-4 rounded-xl border border-brand-green">
                <div className="text-[11px] font-semibold text-brand-green-muted mb-1 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-white" />
                  Respaldo Operativo DIVIPECA
                </div>
                <p className="text-[11px] text-white/90 leading-relaxed font-normal">
                  Despacho auditado desde 3 centros propios (3.200 m² y +1.200 paletas) con
                  protocolos de sanidad y trazabilidad por lote.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Clear Terminology Definitions Strip */}
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
              className="rounded-xl border border-brand-green-muted/80 bg-white px-4 py-3 flex items-start gap-2.5"
            >
              <Info className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <span className="font-bold text-ink">{item.term}: </span>
                <span className="text-ink-muted">{item.summary}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Compact Operational Support Photos (local scrim ONLY over media) */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative rounded-2xl overflow-hidden border border-brand-green-muted/80 bg-black h-48 sm:h-56 shadow-xs">
            <img
              src={IMAGES.forkliftOps}
              alt="Montacargas Toyota DIVIPECA movilizando estibas de alimentos en centro logístico"
              loading="lazy"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-white">Manipulación y estibado mecanizado</span>
              <span className="text-[11px] font-mono text-brand-green-muted">Picking & Cross-docking</span>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-brand-green-muted/80 bg-black h-48 sm:h-56 shadow-xs">
            <img
              src={IMAGES.warehouseRacks}
              alt="Pasillo de almacenamiento paletizado en racks selectivos de DIVIPECA"
              loading="lazy"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-white">Almacenamiento seco en racks selectivos</span>
              <span className="text-[11px] font-mono text-brand-green-muted">Normas BPM · FMCG</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
