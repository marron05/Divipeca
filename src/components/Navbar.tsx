import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { DivipecaLogo } from './DivipecaLogo';
import {
  BUTTON_TRANSITION_CLASS,
  primaryButtonHover,
  primaryButtonTap,
} from '../utils/motion';

interface NavbarProps {
  onOpenContact: (source?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Indicadores', href: '#indicadores' },
    { label: 'Historia', href: '#historia' },
    { label: 'Sedes e Infraestructura', href: '#sedes' },
    { label: 'Flota', href: '#flota' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-200 ease-out ${
        scrolled
          ? 'bg-white/88 backdrop-blur-md border-b border-neutral-200/80'
          : 'bg-white/98 backdrop-blur-xs border-b border-neutral-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-8 h-20 sm:h-24">
          {/* Zone 1: Calm static brand lockup in authoritative black */}
          <a
            href="#inicio"
            className="flex items-center gap-3 sm:gap-4 text-neutral-950 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E20]/40 rounded-lg"
          >
            <div className="w-15 h-15 sm:w-20 sm:h-20 rounded-full p-0.5 bg-white shadow-2xs border border-neutral-200/80 flex items-center justify-center shrink-0">
              <DivipecaLogo className="w-full h-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-[32px] font-black tracking-tight leading-none text-neutral-950">
                DIVIPECA
              </span>
              <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5">
                <span className="text-[11px] sm:text-xs font-bold tracking-tight text-[#1B5E20]">
                  Desde 1990
                </span>
                <span className="text-neutral-300 text-xs" aria-hidden="true">·</span>
                <span className="text-[10px] tracking-[0.11em] text-neutral-400 uppercase font-medium">
                  Operador Logístico 3PL
                </span>
              </div>
            </div>
          </a>

          {/* Zone 2: Single-line navigation links with calm opacity & subtle underline (no scale) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-1 text-neutral-900/70 hover:text-neutral-950 transition-[color,opacity] duration-200 whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E20]/40 rounded-sm"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#1B5E20] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out rounded-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action with global y:-2 hover & y:0 tap */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <motion.button
              type="button"
              onClick={() => onOpenContact('Navbar')}
              whileHover={primaryButtonHover}
              whileTap={primaryButtonTap}
              className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 text-[11px] sm:text-xs font-semibold text-white bg-[#1B5E20] hover:bg-[#2E7D32] rounded-lg ${BUTTON_TRANSITION_CLASS} whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E20]/50`}
            >
              <span className="hidden sm:inline">Solicitar Capacidad 3PL</span>
              <span className="sm:hidden">Solicitar 3PL</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
};
