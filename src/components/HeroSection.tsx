import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ShieldCheck, MapPin, Building2, ChevronDown } from 'lucide-react';
import { IMAGES } from '../data/divipecaData';
import {
  EASE_PREMIUM,
  DUR_MED,
  VIEWPORT_CONFIG,
  primaryButtonHover,
  primaryButtonTap,
  secondaryButtonHover,
  secondaryButtonTap,
} from '../utils/motion';

interface HeroSectionProps {
  onOpenContact: (source?: string) => void;
  introReady?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenContact,
  introReady = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="inicio" className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column Split: Headline & Value Prop on Left, High-Stature Imagery on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Masked 2-Line Title Reveal -> Delayed Paragraph & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* H1 Headline: 2-line masked reveal */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl/tight font-extrabold tracking-tight text-neutral-950 mb-5 text-balance">
              <span className="block overflow-hidden">
                <motion.span
                  initial={shouldReduceMotion ? { opacity: 1 } : { y: '100%', opacity: 0 }}
                  animate={
                    introReady
                      ? { y: '0%', opacity: 1 }
                      : shouldReduceMotion
                      ? { opacity: 1 }
                      : { y: '100%', opacity: 0 }
                  }
                  transition={{ duration: DUR_MED, ease: EASE_PREMIUM }}
                  className="block"
                >
                  Tu logística puntual,
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={shouldReduceMotion ? { opacity: 1 } : { y: '100%', opacity: 0 }}
                  animate={
                    introReady
                      ? { y: '0%', opacity: 1 }
                      : shouldReduceMotion
                      ? { opacity: 1 }
                      : { y: '100%', opacity: 0 }
                  }
                  transition={{
                    duration: DUR_MED,
                    delay: shouldReduceMotion ? 0 : 0.08,
                    ease: EASE_PREMIUM,
                  }}
                  className="block text-[#1B5E20]"
                >
                  tus ventas en crecimiento.
                </motion.span>
              </span>
            </h1>

            {/* Value Proposition Paragraph */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={
                introReady
                  ? { opacity: 1, y: 0 }
                  : shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 12 }
              }
              transition={{
                duration: DUR_MED,
                delay: shouldReduceMotion ? 0 : 0.16,
                ease: EASE_PREMIUM,
              }}
              className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-3 max-w-2xl font-normal"
            >
              Operador logístico 3PL y distribución exclusiva para consumo masivo y alimentos.
              Conectamos los llanos, oriente y sur con{' '}
              <strong className="font-semibold text-neutral-900">+3.700 m²</strong> de
              almacenamiento en 3 sedes propias, flota dedicada de 5T a 12T y un índice de
              cumplimiento auditado del{' '}
              <strong className="font-semibold text-neutral-900">99,8% OTIF</strong>.
            </motion.p>

            {/* Single-line Lead Time + OTIF Micro-indicator */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={
                introReady
                  ? { opacity: 1, y: 0 }
                  : shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 10 }
              }
              transition={{
                duration: DUR_MED,
                delay: shouldReduceMotion ? 0 : 0.22,
                ease: EASE_PREMIUM,
              }}
              className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-800 mb-7"
            >
              <span className="text-[#1B5E20]">Lead time &lt; 24 h</span>
              <span className="text-neutral-300" aria-hidden="true">·</span>
              <span>99,8% OTIF</span>
              <span className="text-neutral-300 hidden sm:inline" aria-hidden="true">·</span>
              <span className="text-xs font-normal text-neutral-500 hidden sm:inline">
                Desde 1990 operando almacenamiento, preparación y distribución
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={
                introReady
                  ? { opacity: 1, y: 0 }
                  : shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 12 }
              }
              transition={{
                duration: DUR_MED,
                delay: shouldReduceMotion ? 0 : 0.28,
                ease: EASE_PREMIUM,
              }}
              className="flex flex-wrap items-center gap-4 mb-9"
            >
              <motion.button
                type="button"
                onClick={() => onOpenContact('Hero CTA')}
                whileHover={primaryButtonHover}
                whileTap={primaryButtonTap}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#1B5E20] hover:bg-[#2E7D32] rounded-lg transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                <span>Solicitar Alianza Logística</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.a
                href="#sedes"
                whileHover={secondaryButtonHover}
                whileTap={secondaryButtonTap}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-neutral-700 hover:text-neutral-950 bg-neutral-100/80 border border-neutral-200 hover:border-[#1B5E20] rounded-lg transition-colors duration-200 whitespace-nowrap cursor-pointer"
              >
                <span>Explorar Red de Sedes</span>
                <ChevronDown className="w-4 h-4 text-neutral-500" />
              </motion.a>
            </motion.div>

            {/* Micro Trust Matrix */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={
                introReady
                  ? { opacity: 1, y: 0 }
                  : shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 10 }
              }
              transition={{
                duration: DUR_MED,
                delay: shouldReduceMotion ? 0 : 0.34,
                ease: EASE_PREMIUM,
              }}
              className="pt-6 border-t border-neutral-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs"
            >
              <div className="flex items-start gap-2.5 p-2 rounded-lg transition-colors duration-200 hover:bg-neutral-50">
                <ShieldCheck className="w-4 h-4 text-[#1B5E20] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-900">40+ Años Ininterrumpidos</p>
                  <p className="text-neutral-500 leading-normal">
                    Alianzas con Pastas Capri, Puig y Botalón.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-lg transition-colors duration-200 hover:bg-neutral-50">
                <MapPin className="w-4 h-4 text-[#1B5E20] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-900">4 Estados Clave</p>
                  <p className="text-neutral-500 leading-normal">
                    Guárico, Anzoátegui, Bolívar y Sucre.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-lg transition-colors duration-200 hover:bg-neutral-50 col-span-2 sm:col-span-1">
                <Building2 className="w-4 h-4 text-[#1B5E20] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-900">3 Centros Propios</p>
                  <p className="text-neutral-500 leading-normal">
                    Valle de la Pascua, Barcelona y Bolívar.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Clean single entrance opacity + y 16px */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{
              duration: DUR_MED,
              delay: shouldReduceMotion ? 0 : 0.14,
              ease: EASE_PREMIUM,
            }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-lg bg-neutral-950">
              <img
                src={IMAGES.heroFleet}
                alt="Flota y andenes de carga de DIVIPECA en operación matutina"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] sm:h-[480px] lg:h-[520px] object-cover object-center"
              />

              {/* Cinematic Bottom Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent pointer-events-none" />

              {/* Calm Overlaid Operational Summary Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/92 backdrop-blur-md border border-white/60 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex rounded-full h-2 w-2 bg-[#1B5E20]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-800">
                      Operación Activa en Ruta
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-neutral-500 tabular-nums">
                    Consolidado Mensual
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-200/80">
                  <div>
                    <span className="text-[10px] uppercase tracking-wide text-neutral-500 block">
                      Despacho
                    </span>
                    <span className="text-sm font-bold text-neutral-950 font-mono tabular-nums">
                      +400 Tn/mes
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wide text-neutral-500 block">
                      Nivel OTIF
                    </span>
                    <span className="text-sm font-bold text-[#1B5E20] font-mono tabular-nums">
                      99,8%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wide text-neutral-500 block">
                      Clientes
                    </span>
                    <span className="text-sm font-bold text-neutral-950 font-mono tabular-nums">
                      +820 POS
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-neutral-200/60 flex items-center justify-between text-[11px] text-neutral-600">
                  <span>Flota: NPR · Encava · JAC Búfalo</span>
                  <span className="text-neutral-500 font-medium">Guárico · Oriente · Sur</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
