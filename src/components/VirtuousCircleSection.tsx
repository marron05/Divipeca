import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, MessageCircle, X, Check } from 'lucide-react';
import { BOTTLENECK_PAIRS, COMPANY_INFO } from '../data/divipecaData';
import {
  EASE_PREMIUM,
  DUR_MED,
  BUTTON_TRANSITION_CLASS,
  useStickyInView,
  primaryButtonHover,
  primaryButtonTap,
  secondaryButtonHover,
  secondaryButtonTap,
} from '../utils/motion';

interface VirtuousCircleSectionProps {
  onOpenContact: (source?: string) => void;
}

export const VirtuousCircleSection: React.FC<VirtuousCircleSectionProps> = ({
  onOpenContact,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  const headerRevealed = useStickyInView(headerRef);
  const listRevealed = useStickyInView(listRef);
  const ctaRevealed = useStickyInView(ctaRef);

  return (
    <section
      id="diagnostico-3pl"
      className="relative py-16 sm:py-20 bg-surface border-y border-brand-green-muted/60 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <motion.div
          ref={headerRef}
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={headerRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: DUR_MED, ease: EASE_PREMIUM }}
          className="max-w-3xl mb-10 sm:mb-12"
        >
          <div className="text-xs font-semibold uppercase tracking-wider text-brand-green mb-2.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
            <span>IMPACTO DIRECTO EN VENTAS Y RENTABILIDAD</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-ink mb-3 text-balance">
            Cuellos de Botella vs. Solución DIVIPECA
          </h2>

          <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-normal">
            Fricciones en almacenamiento y transporte generan quiebres, rechazos y ventas perdidas. Así convierte DIVIPECA cada cuello operativo en ventaja comercial en los 4 estados.
          </p>
        </motion.div>

        {/* Column Headers (Desktop) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-5 mb-3 px-1 text-[11px] font-bold uppercase tracking-wider">
          <div className="lg:col-span-6 text-brand-red flex items-center gap-1.5">
            <X className="w-3.5 h-3.5" />
            <span>Cuello de botella operativo</span>
          </div>
          <div className="lg:col-span-6 text-brand-green flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" />
            <span>Impacto DIVIPECA</span>
          </div>
        </div>

        {/* 4 Pairs: Problem (Left: brand-red-soft) vs DIVIPECA Solution (Right: brand-green-soft) */}
        <div ref={listRef} className="space-y-4 sm:space-y-5">
          {BOTTLENECK_PAIRS.map((pair, idx) => (
            <motion.div
              key={pair.id}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              animate={listRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{
                duration: DUR_MED,
                delay: shouldReduceMotion ? 0 : idx * 0.08,
                ease: EASE_PREMIUM,
              }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 lg:gap-5 items-stretch"
            >
              {/* Left Card: Bottleneck */}
              <div className="lg:col-span-6 rounded-2xl border border-brand-red-muted bg-brand-red-soft/85 hover:bg-brand-red-soft hover:border-brand-red/50 transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 p-5 sm:p-6 flex items-start gap-3.5 shadow-xs">
                <span className="w-7 h-7 rounded-lg bg-white border border-brand-red-muted text-brand-red flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-brand-red mb-1">
                    × Cuello 0{pair.step}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-ink leading-snug mb-1.5">
                    {pair.bottleneckTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {pair.bottleneckDetail}
                  </p>
                </div>
              </div>

              {/* Right Card: DIVIPECA Impact */}
              <div className="lg:col-span-6 rounded-2xl border border-brand-green-muted bg-brand-green-soft/85 hover:bg-brand-green-soft hover:border-brand-green/60 transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 p-5 sm:p-6 flex items-start gap-3.5 shadow-xs">
                <span className="w-7 h-7 rounded-lg bg-brand-green text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-brand-green mb-1">
                    ✓ Impacto DIVIPECA
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-ink leading-snug mb-1.5">
                    {pair.solutionTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {pair.solutionDetail}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Bottom CTAs */}
        <motion.div
          ref={ctaRef}
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={ctaRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: DUR_MED, ease: EASE_PREMIUM }}
          className="mt-9 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5"
        >
          <motion.button
            type="button"
            onClick={() => onOpenContact('Diagnóstico 3PL - Cuellos de Botella vs Solución')}
            whileHover={primaryButtonHover}
            whileTap={primaryButtonTap}
            className={`inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-brand-green hover:bg-brand-green-hover rounded-lg ${BUTTON_TRANSITION_CLASS} cursor-pointer shadow-sm`}
          >
            <span>Solicitar Evaluación Logística</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={secondaryButtonHover}
            whileTap={secondaryButtonTap}
            className={`inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-ink hover:text-brand-green bg-surface-warm border border-brand-green-muted hover:border-brand-green rounded-lg ${BUTTON_TRANSITION_CLASS} cursor-pointer`}
          >
            <MessageCircle className="w-4 h-4 text-brand-green" />
            <span>Hablar por WhatsApp</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
