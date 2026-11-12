import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { HistorySection } from './components/HistorySection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactSource, setContactSource] = useState<string>('General');

  const handleOpenContact = (source?: string) => {
    setContactSource(source || 'General');
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col font-sans selection:bg-[#1B5E20] selection:text-white">
      {/* 1. Top Bar Navigation Contract */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Main Corporate Sections */}
      <main className="flex-1">
        {/* Section 1: Hero */}
        <HeroSection onOpenContact={handleOpenContact} />

        {/* Section 2: Stats / KPIs */}
        <StatsSection />

        {/* Section 3: Historia & Línea de Tiempo (1982 - Hoy) */}
        <HistorySection />

        {/* Section 4: Sedes e Infraestructura + Flota Propia */}
        <FacilitiesSection onOpenContact={handleOpenContact} />
      </main>

      {/* Corporate B2B Footer */}
      <Footer />

      {/* Interactive B2B Capacity & Routing Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <ContactModal
            isOpen={isContactOpen}
            onClose={handleCloseContact}
            initialSource={contactSource}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
