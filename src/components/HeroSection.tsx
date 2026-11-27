import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ShieldCheck, MapPin, Building2, Calculator, Play } from 'lucide-react';
import { COMPANY_INFO } from '../data/divipecaData';
import {
  EASE_PREMIUM,
  DUR_MED,
  BUTTON_TRANSITION_CLASS,
  primaryButtonHover,
  primaryButtonTap,
  secondaryButtonHover,
  secondaryButtonTap,
} from '../utils/motion';

const YOUTUBE_VIDEO_ID = 'qkCkLu42cvA';
const YOUTUBE_EMBED_SRC = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?controls=1&rel=0&playsinline=1`;

interface HeroSectionProps {
  onOpenContact: (source?: string) => void;
  introReady?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenContact,
  introReady = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const scrollToId = (id: string) => (e: React.MouseEvent) => {
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="inicio" className="relative pt-4 pb-12 lg:pt-6 lg:pb-16 bg-surface-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={
                introReady
                  ? { opacity: 1, y: 0 }
                  : shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 8 }
              }
              transition={{ duration: DUR_MED, ease: EASE_PREMIUM }}
              className="inline-flex items-center gap-2.5 self-start px-3 py-1.5 rounded-lg bg-brand-green-soft/85 border border-brand-green-muted text-brand-green text-xs font-bold tracking-tight mb-4"
            >
              <span className="inline-flex h-2.5 w-4 rounded-xs overflow-hidden border border-black/10 shrink-0" aria-hidden="true">
                <span className="w-1/3 h-full bg-brand-green" />
                <span className="w-1/3 h-full bg-white" />
                <span className="w-1/3 h-full bg-brand-red" />
              </span>
              <span>{COMPANY_INFO.experienceBadge}</span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px]/tight font-extrabold tracking-tight text-ink mb-5 text-balance">
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
                  Eliminamos cuellos de botella logísticos
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
                  className="block text-brand-green"
                >
                  para proteger sus ventas y participación de mercado.
                </motion.span>
              </span>
            </h1>

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
                delay: shouldReduceMotion ? 0 : 0.14,
                ease: EASE_PREMIUM,
              }}
              className="text-base sm:text-[17px] text-ink-muted leading-relaxed mb-6 font-normal"
            >
              Operación continua desde 1990 respaldando fabricantes, importadores y marcas líderes
              en <strong className="font-semibold text-ink">Guárico, Anzoátegui, Sucre y Bolívar</strong> con{' '}
              <strong className="font-semibold text-ink">3.200 m²</strong> en 3 centros
              propios, <strong className="font-semibold text-ink">+1.200 posiciones de paleta</strong>,
              flota propia y estrictos protocolos de sanidad.
            </motion.p>

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
                delay: shouldReduceMotion ? 0 : 0.22,
                ease: EASE_PREMIUM,
              }}
              className="flex flex-wrap items-center gap-3.5 mb-8"
            >
              <motion.button
                type="button"
                onClick={() => onOpenContact('Hero - Solicitar Evaluación Logística')}
                whileHover={primaryButtonHover}
                whileTap={primaryButtonTap}
                className={`inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-brand-green hover:bg-brand-green-hover rounded-lg ${BUTTON_TRANSITION_CLASS} cursor-pointer whitespace-nowrap shadow-sm`}
              >
                <span>Solicitar Evaluación Logística</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.a
                href="#proyector"
                onClick={scrollToId('proyector')}
                whileHover={secondaryButtonHover}
                whileTap={secondaryButtonTap}
                className={`inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-ink hover:text-brand-green bg-white border border-brand-green-muted hover:border-brand-green rounded-lg ${BUTTON_TRANSITION_CLASS} whitespace-nowrap cursor-pointer`}
              >
                <Calculator className="w-4 h-4 text-brand-green" />
                <span>Abrir Proyector Mensual</span>
              </motion.a>

              <motion.a
                href="#video"
                onClick={scrollToId('video')}
                whileHover={secondaryButtonHover}
                whileTap={secondaryButtonTap}
                className={`inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-ink hover:text-brand-green bg-white border border-neutral-200 hover:border-brand-green rounded-lg ${BUTTON_TRANSITION_CLASS} whitespace-nowrap cursor-pointer`}
              >
                <Play className="w-4 h-4 text-brand-red" />
                <span>Ver video completo</span>
              </motion.a>
            </motion.div>

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
                delay: shouldReduceMotion ? 0 : 0.28,
                ease: EASE_PREMIUM,
              }}
              className="pt-5 border-t border-brand-green-muted/70 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs"
            >
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ink">Protocolos de Sanidad</p>
                  <p className="text-ink-muted leading-normal">
                    Estándares BPM e inocuidad en alimento seco.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ink">4 Estados Clave</p>
                  <p className="text-ink-muted leading-normal">
                    Guárico, Anzoátegui, Sucre y Bolívar.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 col-span-2 sm:col-span-1">
                <Building2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ink">3 Centros Propios</p>
                  <p className="text-ink-muted leading-normal">
                    3.200 m² y +1.200 paletas operativas.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={
              introReady
                ? { opacity: 1, y: 0 }
                : shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 16 }
            }
            transition={{
              duration: DUR_MED,
              delay: shouldReduceMotion ? 0 : 0.14,
              ease: EASE_PREMIUM,
            }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-brand-green-muted/80 shadow-md bg-black">
              <div className="w-full h-[460px] sm:h-[520px] lg:h-[560px] bg-black">
                <iframe
                  src={YOUTUBE_EMBED_SRC}
                  title="Video institucional DIVIPECA"
                  className="w-full h-full border-0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              {/* Local dark scrim ONLY over media for card legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-4 sm:left-4 sm:right-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/75 shadow-md overflow-hidden z-10">
                <div className="px-4 py-3">
                  <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-neutral-200/80">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex rounded-full h-2 w-2 bg-brand-red" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-ink">
                        Indicadores Reales Consolidados
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-brand-green bg-brand-green-soft border border-brand-green-muted px-2 py-0.5 rounded">
                      Desde 1990
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-x-3 gap-y-2.5">
                    <div>
                      <span className="text-[10px] uppercase tracking-wide text-ink-muted block">
                        Lead time prom.
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-brand-green font-mono tabular-nums">
                        0,70 días
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wide text-ink-muted block">
                        Nivel OTIF
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-brand-green font-mono tabular-nums">
                        99,5%
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wide text-ink-muted block">
                        Clientes
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-ink font-mono tabular-nums">
                        +850
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wide text-ink-muted block">
                        Volumen
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-ink font-mono tabular-nums">
                        +550 Ton/Mes
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wide text-ink-muted block">
                        Infraestructura
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold text-ink font-mono tabular-nums">
                        3.200 m² · 3 centros
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wide text-ink-muted block">
                        Estiba
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold text-ink font-mono tabular-nums">
                        +1.200 paletas
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-brand-green-dark text-white px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-[11px] border-t border-brand-green/40">
                  <span className="text-brand-green-muted font-semibold uppercase tracking-wider text-[10px]">
                    Corredor Operativo
                  </span>
                  <span className="font-semibold tracking-tight text-white">
                    Guárico · Anzoátegui · Sucre · Bolívar
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
