import type { Variants } from 'motion/react';

// Unified DIVIPECA Motion Tokens (Linear / Stripe / Apple B2B)
export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;
export const DUR_FAST = 0.22;
export const DUR_MED = 0.55;
export const DUR_SLOW = 1.0;

export const VIEWPORT_CONFIG = {
  once: true,
  margin: '-10% 0px',
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR_MED, ease: EASE_PREMIUM },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR_MED, ease: EASE_PREMIUM },
  },
};

export const primaryButtonHover = {
  y: -2,
  transition: { duration: DUR_FAST, ease: EASE_PREMIUM },
};

export const primaryButtonTap = {
  y: 0,
  opacity: 0.92,
  transition: { duration: 0.12, ease: EASE_PREMIUM },
};

export const secondaryButtonHover = {
  y: -1,
  transition: { duration: DUR_FAST, ease: EASE_PREMIUM },
};

export const secondaryButtonTap = {
  y: 0,
  opacity: 0.92,
  transition: { duration: 0.12, ease: EASE_PREMIUM },
};

// Restraint-aligned aliases
export const cardHover = {
  y: -1,
  transition: { duration: DUR_FAST, ease: EASE_PREMIUM },
};

export const buttonHover = primaryButtonHover;
export const buttonTap = primaryButtonTap;
