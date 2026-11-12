import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, MapPin, Building2, ChevronDown, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO, IMAGES } from '../data/divipecaData';

interface HeroSectionProps {
  onOpenContact: (source?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  return (
    <section id="inicio" className="relative pt-8 pb-16 lg:pt-14 lg:pb-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Subheader / Trust Row (Zero-Pill discipline) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-neutral-500 mb-6"
        >
          <span className="font-semibold text-neutral-900 tracking-wide uppercase">
            {COMPANY_INFO.legalName}
          </span>
          <span aria-hidden="true" className="text-neutral-300">·</span>
          <span>RIF: {COMPANY_INFO.rif}</span>
          <span aria-hidden="true" className="text-neutral-300">·</span>
          <span>Operador Logístico 3PL & Distribución Exclusiva</span>
          <span aria-hidden="true" className="text-neutral-300">·</span>
          <span className="text-[#1B5E20] font-semibold">Fundada en 1982</span>
        </motion.div>

        {/* 2-Column Split: Headline & Value Prop on Left, High-Density Spec & Imagery Anchor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-12">
          
          {/* Left Column: Proposition and Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 leading-[1.12] mb-5 text-balance">
              Tu logística puntual, <br className="hidden sm:inline" />
              <span className="text-[#1B5E20]">tus ventas en crecimiento.</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-8 max-w-2xl">
              Operador logístico 3PL y distribución exclusiva para consumo masivo y alimentos.
              Conectamos el eje centro-oriental y los llanos con <strong className="font-semibold text-neutral-900">+3.700 m²</strong> de
              almacenamiento en 3 sedes propias, flota dedicada de 5T a 12T y un índice de cumplimiento auditado del <strong className="font-semibold text-neutral-900">99.8% OTIF</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={() => onOpenContact('Hero CTA')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#1B5E20] hover:bg-[#2E7D32] rounded-lg transition-all shadow-sm hover:shadow active:scale-[0.99] whitespace-nowrap"
              >
                <span>Solicitar Alianza Logística</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#sedes"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-neutral-700 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200/80 rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Explorar Red de Sedes</span>
                <ChevronDown className="w-4 h-4" />
              </a>
            </div>

            {/* Micro Trust Matrix */}
            <div className="pt-6 border-t border-neutral-200 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1B5E20] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-900">40+ Años Ininterrumpidos</p>
                  <p className="text-neutral-500">Alianzas con marcas líderes como Pastas Capri y Galletas Puig.</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#1B5E20] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-900">4 Estados Clave</p>
                  <p className="text-neutral-500">Anzoátegui, Bolívar, Guárico y Sucre con flota propia.</p>
                </div>
              </div>

              <div className="flex items-start gap-2 col-span-2 sm:col-span-1">
                <Building2 className="w-4 h-4 text-[#1B5E20] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-900">3 Centros de Despacho</p>
                  <p className="text-neutral-500">Valle de la Pascua, Barcelona y Ciudad Bolívar.</p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Hero High-Impact Image + Precision Telemetry Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            {/* Main Visual Asset Frame */}
            <div className="relative rounded-xl overflow-hidden border border-neutral-200/90 shadow-lg bg-neutral-900 group">
              <img
                src={IMAGES.heroFleet}
                alt="Flota y andenes de carga de DIVIPECA en operación matutina"
                referrerPolicy="no-referrer"
                className="w-full h-[360px] sm:h-[420px] lg:h-[460px] object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
              />

              {/* Cinematic Bottom Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/25 to-transparent pointer-events-none" />

              {/* High-Impact Overlaid Operational Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-white/95 backdrop-blur-md border border-white/60 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-800">
                      Operación Activa en Ruta
                    </span>
                  </div>
                  <span className="text-xs font-mono font-medium text-neutral-500 tabular-nums">
                    Consolidado Mensual
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-200/80">
                  <div>
                    <span className="text-[10px] uppercase tracking-wide text-neutral-500 block">Despacho</span>
                    <span className="text-sm font-bold text-neutral-950 font-mono tabular-nums">+400 Tn/mes</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wide text-neutral-500 block">Nivel OTIF</span>
                    <span className="text-sm font-bold text-[#1B5E20] font-mono tabular-nums">99.8%</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wide text-neutral-500 block">Clientes</span>
                    <span className="text-sm font-bold text-neutral-950 font-mono tabular-nums">+820 POS</span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-neutral-200/60 flex items-center justify-between text-[11px] text-neutral-600">
                  <span>Flota: NPR · Encava · JAC Búfalo</span>
                  <span className="text-neutral-400">Guárico · Oriente · Sur</span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};
