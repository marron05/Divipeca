import React, { useState } from 'react';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { SplashIntro } from './components/SplashIntro';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { VirtuousCircleSection } from './components/VirtuousCircleSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { ProyectorSection } from './components/ProyectorSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [contactSource, setContactSource] = useState<string>('General');

  const handleOpenContact = (source?: string) => {
    setContactSource(source || 'General');
    const contactEl = document.getElementById('contacto');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col font-sans selection:bg-[#1B5E20] selection:text-white">
        {/* Clean non-blocking brand intro */}
        <AnimatePresence>
          {showSplash && <SplashIntro onComplete={() => setShowSplash(false)} />}
        </AnimatePresence>

        {/* Top Bar Navigation */}
        <Navbar onOpenContact={handleOpenContact} />

        {/* Main Executive Sections */}
        <main className="flex-1">
          {/* Hero */}
          <HeroSection onOpenContact={handleOpenContact} introReady={!showSplash} />

          {/* 01. Trayectoria y KPIs */}
          <StatsSection onOpenContact={handleOpenContact} />

          {/* 02. Diagnóstico 3PL */}
          <VirtuousCircleSection onOpenContact={handleOpenContact} />

          {/* 03. Cobertura y Sedes + 04. Respaldo Operativo */}
          <FacilitiesSection onOpenContact={handleOpenContact} />

          {/* 05. Proyector Mensual de Capacidad */}
          <ProyectorSection />

          {/* 06. Contacto Ejecutivo */}
          <ContactSection selectedSource={contactSource} />
        </main>

        {/* Corporate B2B Footer */}
        <Footer />
      </div>
    </MotionConfig>
  );
}
