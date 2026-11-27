import React, { useState } from 'react';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { SplashIntro } from './components/SplashIntro';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { VirtuousCircleSection } from './components/VirtuousCircleSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { AlliancesSection } from './components/AlliancesSection';
import { ProyectorSection } from './components/ProyectorSection';
import { VideoSection } from './components/VideoSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectedLeadData } from './types';

export default function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [contactSource, setContactSource] = useState<string>('General');
  const [projectedLead, setProjectedLead] = useState<ProjectedLeadData | null>(null);

  const handleOpenContact = (source?: string) => {
    setContactSource(source || 'General');
    const contactEl = document.getElementById('contacto');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleTransferProjection = (data: ProjectedLeadData) => {
    setProjectedLead(data);
    setContactSource(`Proyector Mensual · ${data.toneladasMes} Ton/Mes (${data.sedeLabel})`);
    const contactEl = document.getElementById('contacto');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-surface-warm text-ink flex flex-col font-sans selection:bg-brand-green selection:text-white">
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

          {/* 02. Diagnóstico 3PL — Cuellos de Botella vs. Solución DIVIPECA */}
          <VirtuousCircleSection onOpenContact={handleOpenContact} />

          {/* 03. Cobertura y Sedes + 04. Respaldo Operativo (Flota + 4 Pilares) */}
          <FacilitiesSection onOpenContact={handleOpenContact} />

          {/* Alianzas Comerciales de Largo Plazo */}
          <AlliancesSection />

          {/* 05. Proyector Mensual de Capacidad */}
          <ProyectorSection onTransferToContact={handleTransferProjection} />

          {/* Video institucional */}
          <VideoSection />

          {/* 06. Contacto Ejecutivo */}
          <ContactSection
            selectedSource={contactSource}
            projectedLead={projectedLead}
          />
        </main>

        {/* Corporate B2B Footer */}
        <Footer />
      </div>
    </MotionConfig>
  );
}
