import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { LOGISTICS_HUBS, FLEET_DETAILS } from '../data/divipecaData';
import { MapPin, Warehouse, Truck, CheckCircle2 } from 'lucide-react';
import {
  EASE_PREMIUM,
  DUR_MED,
  BUTTON_TRANSITION_CLASS,
  primaryButtonHover,
  primaryButtonTap,
} from '../utils/motion';
import { CoverageMap } from './CoverageMap';

interface FacilitiesSectionProps {
  onOpenContact: (source?: string) => void;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ onOpenContact }) => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedHubId, setSelectedHubId] = useState<string>(LOGISTICS_HUBS[0].id);
  const activeHub = LOGISTICS_HUBS.find((h) => h.id === selectedHubId) || LOGISTICS_HUBS[0];

  return (
    <section id="sedes" className="py-20 sm:py-24 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#1B5E20] mb-2.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E20]" />
              <Warehouse className="w-3.5 h-3.5" />
              <span>03. Red de Sedes e Infraestructura Física</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 text-balance">
              3 centros logísticos regionales. +3.700 m² bajo techo.
            </h2>
          </div>
          <div className="text-sm text-neutral-600 max-w-md font-normal leading-relaxed">
            Infraestructura 100% propia, equipada para almacenamiento masivo, picking intensivo y despacho directo desde cada sede hacia los 4 estados de cobertura.
          </div>
        </div>

        {/* Interactive Coverage Map */}
        <CoverageMap
          hubs={LOGISTICS_HUBS}
          selectedHubId={selectedHubId}
          onSelectHub={setSelectedHubId}
          onOpenContact={onOpenContact}
        />

        {/* Hub Selector Navigation (restrained 1px border hover, zero scale) */}
        <div
          id="sede-detalle"
          className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-9 scroll-mt-24"
        >
          {LOGISTICS_HUBS.map((hub) => {
            const isSelected = hub.id === activeHub.id;
            return (
              <button
                key={hub.id}
                type="button"
                onClick={() => setSelectedHubId(hub.id)}
                className={`p-4 sm:p-5 rounded-2xl border text-left ${BUTTON_TRANSITION_CLASS} relative flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-950 text-white border-neutral-950 ring-1 ring-neutral-900/40'
                    : 'bg-neutral-50/80 border-neutral-200 text-neutral-800 hover:bg-neutral-100/70 hover:border-[#1B5E20]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-wider ${
                        isSelected ? 'text-emerald-400' : 'text-[#1B5E20]'
                      }`}
                    >
                      {hub.state}
                    </span>
                    <span
                      className={`text-xs font-mono font-bold ${
                        isSelected ? 'text-white' : 'text-neutral-950'
                      }`}
                    >
                      {hub.area}
                    </span>
                  </div>
                  <div className="text-base sm:text-lg font-bold tracking-tight">
                    {hub.city}
                  </div>
                </div>
                <div
                  className={`text-xs mt-3.5 pt-2.5 border-t ${
                    isSelected
                      ? 'border-neutral-800 text-neutral-300'
                      : 'border-neutral-200/80 text-neutral-500'
                  } line-clamp-1`}
                >
                  {hub.role}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Hub Interactive Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeHub.id}
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: DUR_MED, ease: EASE_PREMIUM }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20"
          >
            {/* Real Hub Photography Frame */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="relative rounded-2xl overflow-hidden border border-neutral-200/90 bg-neutral-950 flex-1 min-h-[380px] sm:min-h-[460px] lg:min-h-[500px]">
                <img
                  src={activeHub.image}
                  alt={`Instalaciones de DIVIPECA en ${activeHub.city}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/15 to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-md rounded-xl border border-white/60 text-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                      Capacidad Activa
                    </span>
                    <span className="text-sm font-bold text-neutral-900 font-mono">
                      {activeHub.area} techados
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                      Frecuencia
                    </span>
                    <span className="text-xs font-semibold text-[#1B5E20]">
                      {activeHub.dispatchFrequency}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                      Dotación
                    </span>
                    <span className="text-xs font-semibold text-neutral-800">
                      {activeHub.fleetStationed}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Specifications & Operating Scope */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 bg-neutral-50 rounded-2xl border border-neutral-200">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#1B5E20]" />
                  <span>
                    Sede {activeHub.city} · {activeHub.state}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 mb-3">
                  {activeHub.role}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-6 font-normal">
                  {activeHub.description}
                </p>

                <div className="space-y-2.5 mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Equipamiento & Protocolos:
                  </div>
                  <div className="space-y-2.5">
                    {activeHub.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-xs text-neutral-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#1B5E20] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-neutral-200">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2.5">
                    Ciudades y municipios abastecidos:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeHub.coverage.map((city) => (
                      <span
                        key={city}
                        className="text-[11px] font-medium bg-white px-2.5 py-1 rounded-md border border-neutral-200 text-neutral-700"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-neutral-200 flex items-center justify-between">
                <span className="text-xs text-neutral-500">
                  ¿Requieres espacio en este hub?
                </span>
                <motion.button
                  type="button"
                  onClick={() => onOpenContact(`Sede ${activeHub.city}`)}
                  whileHover={primaryButtonHover}
                  whileTap={primaryButtonTap}
                  className={`text-xs font-semibold text-white bg-[#1B5E20] hover:bg-[#2E7D32] px-4 py-2.5 rounded-lg ${BUTTON_TRANSITION_CLASS} cursor-pointer`}
                >
                  Consultar Disponibilidad
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dedicated Fleet Section */}
        <div id="flota" className="pt-10 border-t border-neutral-200/80">
          <div className="max-w-2xl mb-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#1B5E20] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E20]" />
              <Truck className="w-3.5 h-3.5" />
              <span>Flota Propia de Transporte y Transferencia</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-950">
              Unidades de 5 a 12 Toneladas adaptadas a la geografía venezolana.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 font-normal leading-relaxed">
              Flota vehicular bajo estricto programa de mantenimiento preventivo y seguimiento de ruta GPS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FLEET_DETAILS.map((fleet) => (
              <div
                key={fleet.model}
                className={`p-5 sm:p-6 rounded-2xl border border-neutral-200 bg-neutral-50/70 hover:bg-neutral-50 hover:border-[#1B5E20]/40 ${BUTTON_TRANSITION_CLASS} flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                      {fleet.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#1B5E20] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {fleet.payloadCapacity}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-neutral-950 mb-2">
                    {fleet.model}
                  </h4>
                  <p className="text-xs text-neutral-600 mb-4 leading-relaxed font-normal">
                    {fleet.useCase}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-neutral-200/80">
                    {fleet.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-neutral-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-500 font-medium">
                  <span>Mantenimiento interno</span>
                  <span className="text-[#1B5E20] font-semibold">100% Operatividad</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
