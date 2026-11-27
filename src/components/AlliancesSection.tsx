import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Award } from 'lucide-react';
import { COMMERCIAL_ALLIANCES } from '../data/divipecaData';
import { EASE_PREMIUM, DUR_MED, useStickyInView } from '../utils/motion';

export const AlliancesSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const headerRevealed = useStickyInView(headerRef);
  const gridRevealed = useStickyInView(gridRef);

  return (
    <section
      id="alianzas"
      className="py-16 sm:py-20 bg-brand-green-soft/65 border-b border-brand-green-muted/80 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={headerRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: DUR_MED, ease: EASE_PREMIUM }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10 sm:mb-12"
        >
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-brand-green mb-2.5 flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-brand-green" />
              <span>Respaldo de Fabricantes y Marcas Líderes</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-ink mb-3 text-balance">
              Alianzas Comerciales de Largo Plazo
            </h2>

            <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-normal">
              Marcas nacionales que respaldan continuidad operativa desde 1990.
            </p>
          </div>

          <div className="text-xs text-brand-green font-mono font-semibold tabular-nums self-start lg:self-auto bg-white border border-brand-green-muted px-3 py-1.5 rounded-lg">
            Trayectoria continua · Desde 1990
          </div>
        </motion.div>

        {/* 4 Commercial Alliance Cards on Light Surface */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {COMMERCIAL_ALLIANCES.map((alliance, idx) => (
            <motion.article
              key={alliance.id}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              animate={gridRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{
                duration: DUR_MED,
                delay: shouldReduceMotion ? 0 : idx * 0.07,
                ease: EASE_PREMIUM,
              }}
              className="rounded-2xl border border-brand-green-muted/90 bg-white hover:border-brand-green hover:-translate-y-0.5 transition-[border-color,transform] duration-200 p-5 sm:p-6 flex flex-col justify-between shadow-xs"
            >
              <div>
                {/* Crisp Light Logo Stage */}
                <div className="w-full h-28 rounded-xl bg-white border border-neutral-200/80 p-4 flex items-center justify-center mb-5">
                  <img
                    src={alliance.logo}
                    alt={`Logotipo de ${alliance.name}`}
                    loading="lazy"
                    className="max-h-20 max-w-full w-auto object-contain"
                  />
                </div>

                {/* Status / Trajectory Metadata */}
                <div className="flex items-center justify-between gap-2 text-[11px] mb-2">
                  <span className="font-semibold text-brand-green">
                    {alliance.status}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-brand-red bg-brand-red-soft border border-brand-red-muted px-2 py-0.5 rounded shrink-0">
                    {alliance.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-ink leading-snug mb-2">
                  {alliance.name}
                </h3>

                <p className="text-xs text-ink-muted leading-relaxed">
                  {alliance.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
