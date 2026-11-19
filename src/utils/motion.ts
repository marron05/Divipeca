import { useEffect, useState, type RefObject } from 'react';
import { useInView, useReducedMotion, type Variants } from 'motion/react';

// Unified DIVIPECA Motion Tokens (Linear / Stripe / Apple B2B)
export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;
export const DUR_FAST = 0.22;
export const DUR_MED = 0.55;
export const DUR_SLOW = 1.0;

export const VIEWPORT_CONFIG = {
  once: true,
  margin: '-5% 0px',
} as const;

// Shared Tailwind transition utility for buttons so CSS transitions also use [0.22, 1, 0.36, 1] / 0.22s
export const BUTTON_TRANSITION_CLASS =
  'transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]';

/**
 * Sticky scroll-reveal hook: triggers once via IntersectionObserver (-5% margin)
 * AND includes a passive scroll/hash fallback so fast scrolls, anchor jumps,
 * or tall mobile blocks never remain stuck at opacity: 0.
 */
export function useStickyInView<T extends Element>(ref: RefObject<T | null>): boolean {
  const shouldReduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '0px 0px -5% 0px' });
  const [revealed, setRevealed] = useState<boolean>(Boolean(shouldReduceMotion));

  useEffect(() => {
    if (shouldReduceMotion || inView) {
      setRevealed(true);
      return;
    }

    const checkPosition = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.98) {
        setRevealed(true);
      }
    };

    checkPosition();
    window.addEventListener('scroll', checkPosition, { passive: true });
    window.addEventListener('resize', checkPosition, { passive: true });
    window.addEventListener('hashchange', checkPosition, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkPosition);
      window.removeEventListener('resize', checkPosition);
      window.removeEventListener('hashchange', checkPosition);
    };
  }, [ref, inView, shouldReduceMotion]);

  return revealed;
}

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
  transition: { duration: 0.12, ease: EASE_PREMIUM },
};

export const secondaryButtonHover = {
  y: -2,
  transition: { duration: DUR_FAST, ease: EASE_PREMIUM },
};

export const secondaryButtonTap = {
  y: 0,
  transition: { duration: 0.12, ease: EASE_PREMIUM },
};

// Restraint-aligned aliases
export const cardHover = {
  y: -1,
  transition: { duration: DUR_FAST, ease: EASE_PREMIUM },
};

export const buttonHover = primaryButtonHover;
export const buttonTap = primaryButtonTap;
