import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VirtuousCircleSection } from './components/VirtuousCircleSection';
import { StatsSection } from './components/StatsSection';
import { HistorySection } from './components/HistorySection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [contactSource, setContactSource] = useState<string>('General');

  const handleOpenContact = (source?: string) => {
    setContactSource(source || 'General');
    const contactEl = document.getElementById('contacto');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col font-sans selection:bg-[#1B5E20] selection:text-white">
      {/* 1. Top Bar Navigation Contract */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Main Corporate Sections */}
      <main className="flex-1">
        {/* Section 1: Hero */}
        <HeroSection onOpenContact={handleOpenContact} />

        {/* Section 2: Propuesta de Valor (Círculo Vicioso -> Virtuoso) */}
        <VirtuousCircleSection onOpenContact={handleOpenContact} />

        {/* Section 3: Stats / KPIs */}
        <StatsSection />

        {/* Section 4: Historia & Línea de Tiempo (1982 - Hoy) */}
        <HistorySection />

        {/* Section 5: Sedes e Infraestructura + Flota Propia */}
        <FacilitiesSection onOpenContact={handleOpenContact} />

        {/* Section 6: Conversión & Contacto Directo */}
        <ContactSection selectedSource={contactSource} />
      </main>

      {/* Corporate B2B Footer */}
      <Footer />
    </div>
  );
}
