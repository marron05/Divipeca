import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { DivipecaLogo } from './DivipecaLogo';

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
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-neutral-200/80 shadow-xs'
          : 'bg-white/95 backdrop-blur-xs border-b border-neutral-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Brand wordmark with official emblem */}
          <motion.a
            href="#inicio"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="flex items-center gap-3 text-neutral-900 group whitespace-nowrap shrink-0"
          >
            <div className="w-11 h-11 rounded-full p-0.5 bg-white shadow-xs border border-neutral-200/80 flex items-center justify-center group-hover:scale-105 group-hover:shadow-sm transition-all duration-300 ease-out">
              <DivipecaLogo className="w-full h-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-neutral-950 transition-colors group-hover:text-[#1B5E20]">
                DIVIPECA
              </span>
              <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-medium">
                Operador Logístico 3PL
              </span>
            </div>
          </motion.a>

          {/* Zone 2: Single-line navigation links with animated underline */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-1 text-neutral-600 hover:text-neutral-950 transition-colors duration-200 whitespace-nowrap shrink-0 group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1B5E20] group-hover:w-full transition-all duration-300 ease-out rounded-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <motion.button
              onClick={() => onOpenContact('Navbar')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#1B5E20] hover:bg-[#2E7D32] rounded-lg transition-colors shadow-xs hover:shadow-md hover:shadow-emerald-950/10 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Solicitar Capacidad 3PL</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
};

