import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LOGISTICS_HUBS, FLEET_DETAILS } from '../data/divipecaData';
import { Building2, MapPin, Warehouse, Truck, CheckCircle2, Shield, Layers, Navigation } from 'lucide-react';

interface FacilitiesSectionProps {
  onOpenContact: (source?: string) => void;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ onOpenContact }) => {
  const [selectedHubId, setSelectedHubId] = useState<string>(LOGISTICS_HUBS[0].id);
  const activeHub = LOGISTICS_HUBS.find((h) => h.id === selectedHubId) || LOGISTICS_HUBS[0];

  return (
    <section id="sedes" className="py-16 sm:py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#1B5E20] mb-2 flex items-center gap-1.5">
              <Warehouse className="w-3.5 h-3.5" />
              <span>03. Red de Sedes e Infraestructura Física</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 text-balance">
              3 centros logísticos interconectados. +3.700 m² bajo techo.
            </h2>
          </div>
          <div className="text-sm text-neutral-600 max-w-md">
            Infraestructura 100% propia, equipada para almacenamiento masivo, picking intensivo y cross-docking con conexión directa a los 4 estados de cobertura.
          </div>
        </div>

        {/* Hub Selector Navigation (Segmented Bar) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {LOGISTICS_HUBS.map((hub) => {
            const isSelected = hub.id === activeHub.id;
            return (
              <button
                key={hub.id}
                onClick={() => setSelectedHubId(hub.id)}
                className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                    : 'bg-neutral-50 border-neutral-200 text-neutral-800 hover:bg-neutral-100/80 hover:border-neutral-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[11px] font-semibold uppercase tracking-wide ${isSelected ? 'text-emerald-400' : 'text-[#1B5E20]'}`}>
                      {hub.state}
                    </span>
                    <span className={`text-xs font-mono font-bold ${isSelected ? 'text-white' : 'text-neutral-950'}`}>
                      {hub.area}
                    </span>
                  </div>
                  <div className="text-base font-bold tracking-tight">
                    {hub.city}
                  </div>
                </div>
                <div className={`text-xs mt-3 pt-2 border-t ${isSelected ? 'border-neutral-800 text-neutral-300' : 'border-neutral-200 text-neutral-500'} line-clamp-1`}>
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16"
          >
            {/* Real Hub Photography Frame */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="relative rounded-xl overflow-hidden border border-neutral-200 bg-neutral-950 flex-1 min-h-[340px] sm:min-h-[420px] group">
                <img
                  src={activeHub.image}
                  alt={`Instalaciones de DIVIPECA en ${activeHub.city}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Hub Telemetry */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-white/95 backdrop-blur-md rounded-lg border border-white/60 text-xs flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Capacidad Activa</span>
                    <span className="text-sm font-bold text-neutral-900 font-mono">{activeHub.area} techados</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Frecuencia</span>
                    <span className="text-xs font-semibold text-[#1B5E20]">{activeHub.dispatchFrequency}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Dotación</span>
                    <span className="text-xs font-semibold text-neutral-800">{activeHub.fleetStationed}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Specifications & Operating Scope */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 bg-neutral-50 rounded-xl border border-neutral-200">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#1B5E20]" />
                  <span>Sede {activeHub.city} · {activeHub.state}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 mb-3">
                  {activeHub.role}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                  {activeHub.description}
                </p>

                {/* Features Checklist */}
                <div className="space-y-2.5 mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Equipamiento & Protocolos:
                  </div>
                  {activeHub.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                      <CheckCircle2 className="w-4 h-4 text-[#1B5E20] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Coverage Footprint */}
                <div className="pt-4 border-t border-neutral-200">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    Ciudades y municipios abastecidos:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeHub.coverage.map((city) => (
                      <span
                        key={city}
                        className="text-[11px] font-medium bg-white px-2 py-0.5 rounded border border-neutral-200 text-neutral-700"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between">
                <span className="text-xs text-neutral-500">
                  ¿Requieres espacio en este hub?
                </span>
                <button
                  onClick={() => onOpenContact(`Sede ${activeHub.city}`)}
                  className="text-xs font-semibold text-white bg-[#1B5E20] hover:bg-[#2E7D32] px-3.5 py-2 rounded-lg transition-colors"
                >
                  Consultar Disponibilidad
                </button>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Dedicated Fleet Section */}
        <div id="flota" className="pt-8 border-t border-neutral-200">
          <div className="max-w-2xl mb-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#1B5E20] mb-1.5 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5" />
              <span>Flota Propia de Transporte y Transferencia</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-950">
              Unidades de 5 a 12 Toneladas adaptadas a la geografía venezolana.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Flota vehicular bajo estricto programa de mantenimiento preventivo y seguimiento de ruta GPS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FLEET_DETAILS.map((fleet) => (
              <div
                key={fleet.model}
                className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/60 hover:bg-neutral-50 hover:border-neutral-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
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
                  <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                    {fleet.useCase}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-neutral-200/80">
                    {fleet.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-neutral-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-500 font-medium">
                  <span>Mantenimiento interno</span>
                  <span className="text-[#1B5E20]">100% Operatividad</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
