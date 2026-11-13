import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'motion/react';
import {
  ArrowRight,
  ArrowDown,
  MessageCircle,
  Check,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/divipecaData';
import { fadeUp, staggerContainer, buttonHover, buttonTap } from '../utils/motion';

interface VirtuousCircleSectionProps {
  onOpenContact: (source?: string) => void;
}

interface CirclePair {
  step: number;
  before: string;
  after: string;
  badge?: string;
  insightTitle: string;
  insightBody: string;
}

const CIRCLE_PAIRS: CirclePair[] = [
  {
    step: 1,
    before: 'Retrasos y faltantes',
    after: 'Entrega a tiempo',
    insightTitle: 'Puntualidad 99.8% OTIF',
    insightBody:
      'Flota propia de 5T a 12T y rutas fijas desde 3 sedes aseguran mercancía completa en cada despacho.',
  },
  {
    step: 2,
    before: 'Reclamos y cancelaciones',
    after: 'Mayor recompra',
    badge: '+53%',
    insightTitle: 'Confianza en el anaquel',
    insightBody:
      'Sin quiebres de stock ni errores de entrega, el comercio repite pedidos cada semana y aumenta su volumen.',
  },
  {
    step: 3,
    before: 'Cliente se detiene',
    after: 'Equipo motivado',
    insightTitle: 'Fuerza comercial enfocada',
    insightBody:
      'Al eliminar urgencias y reclamos diarios, vendedores y clientes concentran su energía en vender más.',
  },
  {
    step: 4,
    before: 'Caída de ventas',
    after: 'Crecimiento sostenible',
    insightTitle: 'Expansión en 4 estados',
    insightBody:
      'Más de 820 puntos de venta abastecidos de forma continua convierten la logística en motor comercial.',
  },
];

const CountUpFiftyThree: React.FC<{ triggerPop: boolean }> = ({ triggerPop }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, 53, {
      duration: 1.35,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setCount(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView]);

  return (
    <motion.span
      ref={ref}
      animate={triggerPop ? { scale: [1, 1.14, 1] } : { scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="text-[11px] font-mono font-bold text-[#1B5E20] bg-white px-2.5 py-0.5 rounded-full border border-emerald-300 shadow-2xs shrink-0 tabular-nums"
    >
      +{count}%
    </motion.span>
  );
};

export const VirtuousCircleSection: React.FC<VirtuousCircleSectionProps> = ({
  onOpenContact,
}) => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const isGridInView = useInView(gridRef, { once: false, amount: 0.25 });

  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [pinnedStep, setPinnedStep] = useState<number | null>(null);
  const [autoStep, setAutoStep] = useState<number>(0);
  const [isActivated, setIsActivated] = useState<boolean>(false);

  // Subtle automatic cascade through steps 0..3 when visible and user is not hovering/pinning
  useEffect(() => {
    if (!isGridInView || hoveredStep !== null || pinnedStep !== null) return;
    const interval = window.setInterval(() => {
      setAutoStep((prev) => (prev + 1) % CIRCLE_PAIRS.length);
    }, 2800);
    return () => window.clearInterval(interval);
  }, [isGridInView, hoveredStep, pinnedStep]);

  const activeIndex =
    hoveredStep !== null ? hoveredStep : pinnedStep !== null ? pinnedStep : autoStep;
  const activePair = CIRCLE_PAIRS[activeIndex];
  const isUserFocusing = hoveredStep !== null || pinnedStep !== null;

  const handleStepClick = (idx: number) => {
    setPinnedStep((prev) => (prev === idx ? null : idx));
  };

  const handleToggleModel = () => {
    setIsActivated((prev) => {
      const next = !prev;
      if (next) {
        setPinnedStep(1); // Highlight the +53% recompra impact briefly or let user explore
      } else {
        setPinnedStep(null);
      }
      return next;
    });
  };

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hola DIVIPECA, me interesa conocer más sobre sus servicios 3PL y distribución.'
  )}`;

  return (
    <section
      id="propuesta-valor"
      className="relative py-16 sm:py-20 bg-neutral-50 border-y border-neutral-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10 sm:mb-12"
        >
          <div className="max-w-3xl">
            <motion.div
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-wider text-[#1B5E20] mb-2 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E20]" />
              <span>De la logística que frena a la logística que vende</span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 mb-3 text-balance"
            >
              Qué cambia con DIVIPECA
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal"
            >
              Menos faltantes y reclamos. Más entregas a tiempo y recompra.
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            className="text-xs text-neutral-500 flex items-center gap-2 bg-white border border-neutral-200 px-3.5 py-2 rounded-lg shadow-2xs self-start lg:self-auto"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#1B5E20] shrink-0" />
            <span>Toca o pasa el cursor por cada paso para comparar el impacto</span>
          </motion.div>
        </motion.div>

        {/* Interactive 3-Column Comparison Grid */}
        <motion.div
          ref={gridRef}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-11 gap-5 lg:gap-4 items-stretch"
        >
          {/* LEFT COLUMN: ANTES (Círculo Vicioso) */}
          <motion.div
            variants={fadeUp}
            animate={{
              opacity: isActivated ? 0.55 : 1,
              scale: isActivated ? 0.985 : 1,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 rounded-2xl border border-red-200/80 bg-white p-6 sm:p-7 shadow-2xs flex flex-col justify-between transition-shadow"
          >
            <div>
              <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-red-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200/70 px-2.5 py-1 rounded-md">
                  Antes
                </span>
                <span className="text-xs font-medium text-neutral-400">
                  {isActivated ? 'Superado con 3PL' : 'Operación fragmentada'}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-5">
                Antes: círculo vicioso
              </h3>

              {/* Steps + 4 -> 1 Visual Cycle Return Rail */}
              <div className="flex items-stretch gap-2.5">
                <div className="flex-1 space-y-1.5">
                  {CIRCLE_PAIRS.map((pair, idx) => {
                    const isActive = activeIndex === idx;
                    const isDimmed = isUserFocusing && !isActive;

                    return (
                      <React.Fragment key={pair.before}>
                        <motion.button
                          type="button"
                          onMouseEnter={() => setHoveredStep(idx)}
                          onMouseLeave={() => setHoveredStep(null)}
                          onFocus={() => setHoveredStep(idx)}
                          onBlur={() => setHoveredStep(null)}
                          onClick={() => handleStepClick(idx)}
                          animate={{
                            x: isActive && !isActivated ? 3 : 0,
                            opacity: isDimmed ? 0.58 : 1,
                          }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                          className={`w-full text-left flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                            isActive && !isActivated
                              ? 'bg-red-50/90 border-red-300 shadow-xs ring-1 ring-red-200/80'
                              : 'bg-red-50/40 border-red-100/80 hover:border-red-200'
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-full text-xs font-bold font-mono flex items-center justify-center shrink-0 transition-colors ${
                              isActive && !isActivated
                                ? 'bg-red-600 text-white'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {pair.step}
                          </span>
                          <span
                            className={`text-sm font-medium transition-colors ${
                              isActivated
                                ? 'line-through text-neutral-400'
                                : isActive
                                ? 'text-neutral-950 font-semibold'
                                : 'text-neutral-800'
                            }`}
                          >
                            {pair.before}
                          </span>
                        </motion.button>

                        {idx < CIRCLE_PAIRS.length - 1 && (
                          <div className="flex justify-start pl-5 py-0.5 text-red-300">
                            <ArrowDown className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Return Loop 4 -> 1 (Vicious Cycle) */}
                <div
                  className="w-6 shrink-0 relative flex flex-col items-center justify-between py-4 select-none"
                  aria-hidden="true"
                >
                  {/* Top arrowhead returning into step 1 */}
                  <div className="w-4 h-4 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-500 z-10">
                    <RotateCcw className="w-2.5 h-2.5" />
                  </div>
                  {/* Vertical curved SVG loop */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 24 100"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 2 90 C 20 90, 20 10, 2 10"
                      fill="none"
                      stroke="#FECACA"
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                    />
                    <motion.path
                      d="M 2 90 C 20 90, 20 10, 2 10"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="1.5"
                      strokeDasharray="4 6"
                      vectorEffect="non-scaling-stroke"
                      animate={{ strokeDashoffset: [0, -20] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                      opacity={isActivated ? 0.25 : 0.7}
                    />
                  </svg>
                  <span className="text-[9px] font-mono font-bold text-red-400 bg-white px-0.5 z-10">
                    4→1
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-red-100/80 flex items-center justify-between text-[11px] text-neutral-500">
              <span>Ciclo de retroalimentación negativa</span>
              <span className="font-mono font-semibold text-red-600/80">Fricción comercial</span>
            </div>
          </motion.div>

          {/* CENTER BRIDGE: Punto de inflexión + Switch + Insight dinámico */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-3 flex flex-col justify-between text-center px-5 py-6 sm:p-6 rounded-2xl bg-neutral-950 text-white shadow-md border border-neutral-800 relative"
          >
            {/* Top: Transformation Title & Interactive Switch */}
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isActivated ? 'bg-emerald-400 animate-ping' : 'bg-emerald-400'
                  }`}
                />
                <span>Punto de inflexión</span>
              </div>

              <p className="text-xs font-medium text-neutral-300 leading-relaxed mb-2 max-w-[26ch] mx-auto">
                Transformación logística con nuestros servicios
              </p>

              <p className="text-sm sm:text-base font-bold text-white leading-snug max-w-[24ch] mx-auto mb-5">
                “{COMPANY_INFO.mainClaim}”
              </p>

              {/* Interactive Activation Button / Switch */}
              <motion.button
                type="button"
                onClick={handleToggleModel}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                  isActivated
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 shadow-inner'
                    : 'bg-[#1B5E20] hover:bg-[#2E7D32] text-white border-emerald-500/40 shadow-sm shadow-emerald-950/40'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isActivated ? 'bg-emerald-400' : 'bg-white'
                  }`}
                />
                <span>
                  {isActivated ? 'Modelo DIVIPECA activo' : 'Activar modelo DIVIPECA'}
                </span>
                <ArrowRight
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    isActivated ? 'translate-x-0.5 text-emerald-300' : ''
                  }`}
                />
              </motion.button>
            </div>

            {/* Middle: Dynamic Paired Micro-Insight (1<->1, 2<->2, 3<->3, 4<->4) */}
            <div className="my-5 rounded-xl bg-neutral-900/90 border border-neutral-800 p-4 text-left">
              {/* Step selector pills */}
              <div className="flex items-center justify-between gap-1 mb-3 pb-2.5 border-b border-neutral-800">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                  Paso {activePair.step} de 4
                </span>
                <div className="flex items-center gap-1">
                  {CIRCLE_PAIRS.map((pair, idx) => {
                    const selected = activeIndex === idx;
                    return (
                      <button
                        key={pair.step}
                        type="button"
                        onClick={() => handleStepClick(idx)}
                        onMouseEnter={() => setHoveredStep(idx)}
                        onMouseLeave={() => setHoveredStep(null)}
                        aria-label={`Ver paso ${pair.step}`}
                        className={`relative px-2 py-0.5 rounded-md text-[10px] font-mono font-bold transition-colors cursor-pointer ${
                          selected ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        {selected && (
                          <motion.span
                            layoutId="activeInsightPill"
                            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                            className="absolute inset-0 rounded-md bg-[#1B5E20]"
                          />
                        )}
                        <span className="relative z-10">0{pair.step}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activePair.step}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] mb-2">
                    <span className="text-red-300/90 line-through decoration-red-400/70">
                      {activePair.before}
                    </span>
                    <ArrowRight className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="font-semibold text-emerald-300">
                      {activePair.after}
                      {activePair.badge ? ` (${activePair.badge})` : ''}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-white mb-1">
                    {activePair.insightTitle}
                  </div>
                  <p className="text-[11px] text-neutral-300 leading-relaxed">
                    {activePair.insightBody}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Bridge Arrow */}
            <div className="flex flex-col items-center">
              <motion.div
                animate={
                  isActivated
                    ? { x: [0, 5, 0], scale: [1, 1.08, 1] }
                    : { x: [0, 3, 0] }
                }
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#1B5E20] text-white shadow-xs ring-4 ring-emerald-500/15"
              >
                <ArrowRight className="w-4 h-4 hidden lg:block" />
                <ArrowDown className="w-4 h-4 lg:hidden" />
              </motion.div>
              <span className="text-[10px] text-neutral-400 mt-2">
                {isActivated ? 'Clic nuevamente para comparar' : 'Impacto directo en ventas'}
              </span>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: DESPUÉS (Círculo Virtuoso) */}
          <motion.div
            variants={fadeUp}
            animate={{
              scale: isActivated ? 1.015 : 1,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`lg:col-span-4 rounded-2xl border-2 bg-white p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
              isActivated
                ? 'border-[#1B5E20] shadow-lg shadow-emerald-950/10 ring-4 ring-emerald-500/10'
                : 'border-[#1B5E20]/30 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-emerald-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B5E20] bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-md">
                  Después
                </span>
                <span className="text-xs font-medium text-[#1B5E20]">
                  Modelo DIVIPECA 3PL
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-5">
                Después: círculo virtuoso
              </h3>

              {/* Steps + 4 -> 1 Visual Cycle Return Rail */}
              <div className="flex items-stretch gap-2.5">
                <div className="flex-1 space-y-1.5">
                  {CIRCLE_PAIRS.map((pair, idx) => {
                    const isActive = activeIndex === idx;
                    const isDimmed = isUserFocusing && !isActive && !isActivated;

                    return (
                      <React.Fragment key={pair.after}>
                        <motion.button
                          type="button"
                          onMouseEnter={() => setHoveredStep(idx)}
                          onMouseLeave={() => setHoveredStep(null)}
                          onFocus={() => setHoveredStep(idx)}
                          onBlur={() => setHoveredStep(null)}
                          onClick={() => handleStepClick(idx)}
                          animate={{
                            x: isActive || isActivated ? 3 : 0,
                            opacity: isDimmed ? 0.62 : 1,
                          }}
                          transition={{
                            duration: 0.25,
                            delay: isActivated ? idx * 0.07 : 0,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className={`w-full text-left flex items-center justify-between gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                            isActivated || isActive
                              ? 'bg-emerald-50/90 border-[#1B5E20]/45 shadow-xs ring-1 ring-emerald-500/20'
                              : 'bg-emerald-50/50 border-emerald-200/70 hover:border-emerald-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-6 h-6 rounded-full text-xs font-bold font-mono flex items-center justify-center shrink-0 transition-colors ${
                                isActivated || isActive
                                  ? 'bg-[#1B5E20] text-white shadow-2xs'
                                  : 'bg-[#1B5E20]/90 text-white'
                              }`}
                            >
                              {isActivated ? (
                                <Check className="w-3.5 h-3.5" />
                              ) : (
                                pair.step
                              )}
                            </span>
                            <span className="text-sm font-semibold text-neutral-900">
                              {pair.after}
                            </span>
                          </div>

                          {pair.badge && <CountUpFiftyThree triggerPop={isActivated} />}
                        </motion.button>

                        {idx < CIRCLE_PAIRS.length - 1 && (
                          <div className="flex justify-start pl-5 py-0.5 text-[#1B5E20]/55">
                            <ArrowDown className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Return Loop 4 -> 1 (Virtuous Cycle) */}
                <div
                  className="w-6 shrink-0 relative flex flex-col items-center justify-between py-4 select-none"
                  aria-hidden="true"
                >
                  <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-[#1B5E20] z-10">
                    <RotateCcw className="w-2.5 h-2.5" />
                  </div>
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 24 100"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 2 90 C 20 90, 20 10, 2 10"
                      fill="none"
                      stroke="#A7F3D0"
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                    />
                    <motion.path
                      d="M 2 90 C 20 90, 20 10, 2 10"
                      fill="none"
                      stroke="#1B5E20"
                      strokeWidth="2"
                      strokeDasharray="5 5"
                      vectorEffect="non-scaling-stroke"
                      animate={{ strokeDashoffset: [0, -20] }}
                      transition={{
                        duration: isActivated ? 1.2 : 1.8,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      opacity={isActivated ? 1 : 0.75}
                    />
                  </svg>
                  <span className="text-[9px] font-mono font-bold text-[#1B5E20] bg-white px-0.5 z-10">
                    4→1
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-emerald-100 flex items-center justify-between text-[11px]">
              <span className="text-neutral-500">Ciclo continuo de recompra</span>
              <span className="font-mono font-bold text-[#1B5E20]">
                {isActivated ? '99.8% OTIF Activo' : 'Crecimiento 3PL'}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Section Bottom CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5"
        >
          <motion.button
            type="button"
            onClick={() => onOpenContact('Círculo Virtuoso')}
            whileHover={buttonHover}
            whileTap={buttonTap}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#1B5E20] hover:bg-[#2E7D32] rounded-lg transition-colors shadow-xs hover:shadow-md hover:shadow-emerald-950/15 cursor-pointer"
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
            className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-neutral-800 hover:text-neutral-950 bg-white border border-neutral-300 hover:border-neutral-400 rounded-lg transition-colors shadow-2xs cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#1B5E20]" />
            <span>Hablar por WhatsApp</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
