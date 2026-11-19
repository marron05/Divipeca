import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { DivipecaLogo } from './DivipecaLogo';

interface SplashIntroProps {
  onComplete: () => void;
}

export const SplashIntro: React.FC<SplashIntroProps> = ({ onComplete }) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const duration = shouldReduceMotion ? 350 : 1200;
    const timer = window.setTimeout(() => {
      onComplete();
    }, duration);
    return () => window.clearTimeout(timer);
  }, [onComplete, shouldReduceMotion]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
      onClick={onComplete}
      role="status"
      aria-label="Cargando DIVIPECA"
      className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center px-6 select-none cursor-pointer"
    >
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.92, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center"
      >
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-white shadow-md border border-neutral-200/80 mb-5">
          <DivipecaLogo className="w-full h-full" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 leading-none">
          DIVIPECA
        </h1>

        <div className="mt-2.5 flex items-center gap-2 text-xs sm:text-sm">
          <span className="font-bold text-[#1B5E20]">Desde 1990</span>
          <span className="text-neutral-300" aria-hidden="true">·</span>
          <span className="text-neutral-500 font-medium">Operador Logístico 3PL</span>
        </div>

        <div className="mt-6 w-28 h-0.5 bg-neutral-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full bg-[#1B5E20] rounded-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
