import React, { useState, useRef, useEffect, useId } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronDown, Check } from 'lucide-react';
import { EASE_PREMIUM, DUR_FAST } from '../utils/motion';

export interface SelectOption {
  value: string;
  label: string;
}

interface PremiumSelectProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<string | SelectOption>;
  placeholder?: string;
  ariaLabel?: string;
  size?: 'sm' | 'md';
}

export const PremiumSelect: React.FC<PremiumSelectProps> = ({
  id,
  value,
  onChange,
  options,
  placeholder = 'Seleccionar...',
  ariaLabel,
  size = 'md',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const generatedId = useId();
  const listboxId = `${id || generatedId}-listbox`;
  const shouldReduceMotion = useReducedMotion();

  const normalizedOptions: SelectOption[] = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const toggleOpen = () => {
    if (!isOpen) {
      const currentIdx = normalizedOptions.findIndex((opt) => opt.value === value);
      setHighlightedIndex(currentIdx >= 0 ? currentIdx : 0);
    }
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (optValue: string) => {
    onChange(optValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        const currentIdx = normalizedOptions.findIndex((opt) => opt.value === value);
        setHighlightedIndex(currentIdx >= 0 ? currentIdx : 0);
        setIsOpen(true);
      } else {
        setHighlightedIndex((prev) =>
          prev < normalizedOptions.length - 1 ? prev + 1 : 0
        );
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        const currentIdx = normalizedOptions.findIndex((opt) => opt.value === value);
        setHighlightedIndex(currentIdx >= 0 ? currentIdx : normalizedOptions.length - 1);
        setIsOpen(true);
      } else {
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : normalizedOptions.length - 1
        );
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (isOpen && highlightedIndex >= 0 && normalizedOptions[highlightedIndex]) {
        e.preventDefault();
        handleSelect(normalizedOptions[highlightedIndex].value);
      }
    } else if (e.key === 'Home' && isOpen) {
      e.preventDefault();
      setHighlightedIndex(0);
    } else if (e.key === 'End' && isOpen) {
      e.preventDefault();
      setHighlightedIndex(normalizedOptions.length - 1);
    }
  };

  const triggerSizing =
    size === 'sm'
      ? 'text-xs px-3 py-2 rounded-lg'
      : 'text-sm px-3.5 py-2.5 rounded-lg';

  const optionSizing =
    size === 'sm' ? 'text-xs px-3 py-2' : 'text-sm px-3.5 py-2.5';

  return (
    <div ref={containerRef} className="relative">
      <button
        id={id}
        type="button"
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={ariaLabel}
        className={`w-full flex items-center justify-between gap-2 text-left bg-white transition-[border-color,box-shadow,background-color] duration-200 cursor-pointer focus:outline-none ${triggerSizing} ${
          isOpen
            ? 'border border-brand-green ring-2 ring-brand-green/25 text-ink'
            : 'border border-neutral-300 hover:border-brand-green/70 text-ink focus:ring-2 focus:ring-brand-green/25 focus:border-brand-green'
        }`}
      >
        <span className="truncate font-medium">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-brand-green' : 'text-ink-muted'
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -4, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.99 }}
            transition={{ duration: DUR_FAST, ease: EASE_PREMIUM }}
            className="absolute left-0 right-0 mt-1.5 z-40 rounded-xl bg-white border border-brand-green-muted shadow-lg shadow-brand-green-dark/10 overflow-hidden"
          >
            {/* Subtle top tricolor hairline */}
            <div className="grid grid-cols-3 h-[2px] w-full" aria-hidden="true">
              <span className="bg-brand-green" />
              <span className="bg-white" />
              <span className="bg-brand-red" />
            </div>

            <ul
              id={listboxId}
              role="listbox"
              className="py-1.5 max-h-64 overflow-y-auto"
            >
              {normalizedOptions.map((opt, idx) => {
                const isSelected = opt.value === value;
                const isHighlighted = idx === highlightedIndex;
                return (
                  <li key={opt.value} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onMouseEnter={() => setHighlightedIndex(idx)}
                      onClick={() => handleSelect(opt.value)}
                      className={`w-full flex items-center justify-between gap-2.5 text-left transition-colors duration-150 cursor-pointer ${optionSizing} ${
                        isSelected
                          ? 'bg-brand-green-soft text-brand-green font-semibold'
                          : isHighlighted
                            ? 'bg-surface-alt text-ink'
                            : 'text-ink hover:bg-surface-alt'
                      }`}
                    >
                      <span className="leading-snug">{opt.label}</span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-brand-green shrink-0" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
