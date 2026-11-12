import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { DivipecaLogo } from './DivipecaLogo';

interface NavbarProps {
  onOpenContact: (source?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Brand wordmark with official emblem */}
          <a
            href="#inicio"
            className="flex items-center gap-3 text-neutral-900 group whitespace-nowrap shrink-0"
          >
            <div className="w-11 h-11 rounded-full p-0.5 bg-white shadow-sm border border-neutral-200 flex items-center justify-center group-hover:scale-105 transition-transform">
              <DivipecaLogo className="w-full h-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-neutral-950 font-serif-none">
                DIVIPECA
              </span>
              <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-medium">
                Operador Logístico 3PL
              </span>
            </div>
          </a>

          {/* Zone 2: Single-line navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
            <a
              href="#inicio"
              className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0"
            >
              Inicio
            </a>
            <a
              href="#indicadores"
              className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0"
            >
              Indicadores
            </a>
            <a
              href="#historia"
              className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0"
            >
              Historia 1982-2026
            </a>
            <a
              href="#sedes"
              className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0"
            >
              Sedes e Infraestructura
            </a>
            <a
              href="#flota"
              className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0"
            >
              Flota
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenContact('Navbar')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#1B5E20] hover:bg-[#2E7D32] rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0"
            >
              <span>Solicitar Capacidad 3PL</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
