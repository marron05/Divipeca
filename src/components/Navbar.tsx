import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Menu, X, MessageCircle } from 'lucide-react';
import { DivipecaLogo } from './DivipecaLogo';
import { COMPANY_INFO } from '../data/divipecaData';
import {
  EASE_PREMIUM,
  DUR_FAST,
  BUTTON_TRANSITION_CLASS,
  primaryButtonHover,
  primaryButtonTap,
} from '../utils/motion';

interface NavbarProps {
  onOpenContact: (source?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Trayectoria y KPIs', href: '#trayectoria-kpis' },
    { label: 'Diagnóstico 3PL', href: '#diagnostico-3pl' },
    { label: 'Cobertura y Sedes', href: '#cobertura-sedes' },
    { label: 'Respaldo Operativo', href: '#respaldo-operativo' },
    { label: 'Proyector Mensual', href: '#proyector' },
    { label: 'Contacto Ejecutivo', href: '#contacto', source: 'Menú Contacto Ejecutivo' },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    source?: string
  ) => {
    setMobileMenuOpen(false);
    if (href === '#contacto') {
      e.preventDefault();
      onOpenContact(source || 'Menú');
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-200 ease-out ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-brand-green-muted/70 shadow-xs'
          : 'bg-white border-b border-neutral-200/90'
      }`}
    >
      {/* Subtle 3px Italian tricolor top accent */}
      <div className="grid grid-cols-3 h-[3px] w-full" aria-hidden="true">
        <span className="bg-brand-green" />
        <span className="bg-white" />
        <span className="bg-brand-red" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-20">
          {/* Zone 1: Official uncropped DIVIPECA plaque + subtle text mark */}
          <a
            href="#inicio"
            className="flex items-center gap-3 text-ink whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40 rounded-lg"
          >
            <DivipecaLogo className="h-[58px] xl:h-[69px] w-auto" />
            <div className="hidden 2xl:flex flex-col border-l border-brand-green-muted pl-3">
              <span className="text-xs font-extrabold tracking-tight text-ink leading-none">
                DIVIPECA
              </span>
              <span className="text-[10px] font-medium text-ink-muted tracking-wide uppercase mt-1">
                Operador Logístico 3PL
              </span>
            </div>
          </a>

          {/* Zone 2: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 2xl:gap-6 text-[12px] xl:text-[13px] font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.source)}
                className="relative py-1 text-ink/80 hover:text-ink transition-[color,opacity] duration-200 whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40 rounded-sm"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-green origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out rounded-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Executive CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2 shrink-0">
            <motion.button
              type="button"
              onClick={() => onOpenContact('Header - Evaluación Logística')}
              whileHover={primaryButtonHover}
              whileTap={primaryButtonTap}
              className={`inline-flex items-center gap-1.5 px-3 py-2 xl:px-4 xl:py-2.5 text-[11px] xl:text-xs font-semibold text-white bg-brand-green hover:bg-brand-green-hover rounded-lg ${BUTTON_TRANSITION_CLASS} whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50`}
            >
              <span className="hidden sm:inline">Solicitar Evaluación Logística</span>
              <span className="sm:hidden">Evaluación 3PL</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </motion.button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-brand-green-muted text-ink hover:bg-surface-alt transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: DUR_FAST, ease: EASE_PREMIUM }}
            className="lg:hidden border-t border-brand-green-muted/70 bg-white px-4 py-4 shadow-lg"
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-brand-green mb-2 px-2">
              DIVIPECA · Operador Logístico 3PL
            </div>
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.source)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-ink hover:bg-surface-alt hover:text-brand-green transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 pt-3 border-t border-brand-green-muted/40 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact('Menú Mobile - Evaluación Logística');
                }}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-brand-green hover:bg-brand-green-hover rounded-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Solicitar Evaluación Logística</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 text-xs font-semibold text-ink bg-surface-warm border border-brand-green-muted/80 rounded-lg flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-brand-green" />
                <span>WhatsApp {COMPANY_INFO.whatsappDisplay}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
