import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { DivipecaLogo } from './DivipecaLogo';
import { EASE_PREMIUM, DUR_MED } from '../utils/motion';

interface SplashIntroProps {
  onComplete: () => void;
}

export const SplashIntro: React.FC<SplashIntroProps> = ({ onComplete }) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const duration = shouldReduceMotion ? 200 : 1100;
    const timer = window.setTimeout(() => {
      onComplete();
    }, duration);
    return () => window.clearTimeout(timer);
  }, [onComplete, shouldReduceMotion]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: {
          duration: shouldReduceMotion ? 0.12 : DUR_MED,
          ease: EASE_PREMIUM,
        },
      }}
      onClick={onComplete}
      role="status"
      aria-label="Cargando DIVIPECA"
      className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center px-6 select-none cursor-pointer"
    >
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DUR_MED, ease: EASE_PREMIUM }}
        className="flex flex-col items-center text-center"
      >
        <div className="mb-5 flex items-center justify-center">
          <DivipecaLogo className="h-24 sm:h-28 w-auto" />
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="font-bold text-[#1B5E20]">Desde 1990</span>
          <span className="text-neutral-300" aria-hidden="true">·</span>
          <span className="text-neutral-600 font-semibold">Operador Logístico 3PL</span>
        </div>

        <div className="mt-5 w-32 h-0.5 bg-neutral-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            style={{ transformOrigin: 'left' }}
            transition={{
              duration: shouldReduceMotion ? 0.15 : 0.9,
              ease: EASE_PREMIUM,
            }}
            className="h-full w-full bg-[#1B5E20] rounded-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
