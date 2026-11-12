import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, MapPin, Building2, ChevronDown } from 'lucide-react';
import { COMPANY_INFO, IMAGES } from '../data/divipecaData';

interface HeroSectionProps {
  onOpenContact: (source?: string) => void;
}

const easeApple = [0.16, 1, 0.3, 1] as const;

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  return (
    <section id="inicio" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Subheader / Trust Row (Zero-Pill discipline) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeApple }}
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
          <span className="text-[#1B5E20] font-semibold">Desde 1982 en Venezuela</span>
        </motion.div>

        {/* 2-Column Split: Headline & Value Prop on Left, High-Stature Imagery on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-12">
          
          {/* Left Column: Proposition and Actions */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeApple }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl/tight font-extrabold tracking-tight text-neutral-950 mb-5 text-balance">
              Tu logística puntual, <br className="hidden sm:inline" />
              <span className="text-[#1B5E20]">tus ventas en crecimiento.</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-8 max-w-2xl font-normal">
              Operador logístico 3PL y distribución exclusiva para consumo masivo y alimentos.
              Conectamos el eje centro-oriental y los llanos con <strong className="font-semibold text-neutral-900">+3.700 m²</strong> de
              almacenamiento en 3 sedes propias, flota dedicada de 5T a 12T y un índice de cumplimiento auditado del <strong className="font-semibold text-neutral-900">99.8% OTIF</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-9">
              <motion.button
                onClick={() => onOpenContact('Hero CTA')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15, ease: easeApple }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#1B5E20] hover:bg-[#2E7D32] rounded-lg transition-colors shadow-xs hover:shadow-md hover:shadow-emerald-950/15 cursor-pointer whitespace-nowrap group"
              >
                <span>Solicitar Alianza Logística</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>

              <motion.a
                href="#sedes"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.15, ease: easeApple }}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-neutral-700 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200/80 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Explorar Red de Sedes</span>
                <ChevronDown className="w-4 h-4 text-neutral-500" />
              </motion.a>
            </div>

            {/* Micro Trust Matrix with refined hover states */}
            <div className="pt-6 border-t border-neutral-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-2.5 p-2 rounded-lg transition-colors hover:bg-neutral-50"
              >
                <ShieldCheck className="w-4 h-4 text-[#1B5E20] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-900">40+ Años Ininterrumpidos</p>
                  <p className="text-neutral-500 leading-normal">Alianzas con Pastas Capri, Puig y Botalón.</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-2.5 p-2 rounded-lg transition-colors hover:bg-neutral-50"
              >
                <MapPin className="w-4 h-4 text-[#1B5E20] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-900">4 Estados Clave</p>
                  <p className="text-neutral-500 leading-normal">Guárico, Anzoátegui, Bolívar y Sucre.</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-2.5 p-2 rounded-lg transition-colors hover:bg-neutral-50 col-span-2 sm:col-span-1"
              >
                <Building2 className="w-4 h-4 text-[#1B5E20] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-900">3 Centros Propios</p>
                  <p className="text-neutral-500 leading-normal">Valle de la Pascua, Barcelona y Bolívar.</p>
                </div>
              </motion.div>
            </div>

          </motion.div>

          {/* Right Column: Hero High-Impact Image + Precision Telemetry Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: easeApple }}
            className="lg:col-span-5 relative"
          >
            {/* Main Visual Asset Frame with enhanced presence */}
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-xl bg-neutral-950 group">
              <img
                src={IMAGES.heroFleet}
                alt="Flota y andenes de carga de DIVIPECA en operación matutina"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] sm:h-[480px] lg:h-[530px] object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />

              {/* Cinematic Bottom Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent pointer-events-none" />

              {/* High-Impact Overlaid Operational Card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: easeApple }}
                whileHover={{ y: -3 }}
                className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/60 shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-800">
                      Operación Activa en Ruta
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-neutral-500 tabular-nums">
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
                  <span className="text-neutral-500 font-medium">Guárico · Oriente · Sur</span>
                </div>
              </motion.div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};

