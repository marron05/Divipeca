import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  LOGISTICS_HUBS,
  FLEET_DETAILS,
  OPERATIONAL_PILLARS,
  IMAGES,
  COMPANY_INFO,
} from '../data/divipecaData';
import {
  MapPin,
  Warehouse,
  Truck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  PackageCheck,
  Camera,
} from 'lucide-react';
import {
  EASE_PREMIUM,
  DUR_MED,
  BUTTON_TRANSITION_CLASS,
  useStickyInView,
  primaryButtonHover,
  primaryButtonTap,
  secondaryButtonHover,
  secondaryButtonTap,
} from '../utils/motion';
import { CoverageMap } from './CoverageMap';

interface FacilitiesSectionProps {
  onOpenContact: (source?: string) => void;
}

const PILLAR_ICONS = [Truck, ShieldCheck, PackageCheck, Camera];

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ onOpenContact }) => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedHubId, setSelectedHubId] = useState<string>(LOGISTICS_HUBS[0].id);
  const activeHub = LOGISTICS_HUBS.find((h) => h.id === selectedHubId) || LOGISTICS_HUBS[0];

  const pillarsRef = useRef<HTMLDivElement | null>(null);
  const pillarsRevealed = useStickyInView(pillarsRef);

  return (
    <section
      id="cobertura-sedes"
      className="bg-surface-alt border-b border-brand-green-muted/70 scroll-mt-20"
    >
      {/* Top Sub-Section: Cobertura y Sedes (--surface-alt) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-brand-green mb-2.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
              <Warehouse className="w-3.5 h-3.5" />
              <span>03. Cobertura y Sedes · Infraestructura Propia</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-ink text-balance">
              3 centros logísticos propios. 3.200 m² y +1.200 paletas.
            </h2>
          </div>
          <div className="text-sm text-ink-muted max-w-md font-normal leading-relaxed">
            Infraestructura 100% propia equipada para almacenamiento masivo, estiba en paletas y despacho directo desde cada centro hacia Guárico, Anzoátegui, Sucre y Bolívar.
          </div>
        </div>

        {/* Interactive Coverage Map */}
        <CoverageMap
          hubs={LOGISTICS_HUBS}
          selectedHubId={selectedHubId}
          onSelectHub={setSelectedHubId}
          onOpenContact={onOpenContact}
        />

        {/* 3 Integrated Sede Selector Cards */}
        <div
          id="sede-detalle"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-10 scroll-mt-24"
        >
          {LOGISTICS_HUBS.map((hub) => {
            const isSelected = hub.id === activeHub.id;
            return (
              <button
                key={hub.id}
                type="button"
                onClick={() => setSelectedHubId(hub.id)}
                className={`p-5 sm:p-6 rounded-2xl border text-left ${BUTTON_TRANSITION_CLASS} relative flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-brand-green-dark text-white border-brand-green shadow-md'
                    : 'bg-white border-brand-green-muted/85 text-ink hover:border-brand-green hover:bg-brand-green-soft/30 shadow-xs'
                }`}
              >
                <div>
                  {/* Top metadata row: State · Security */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider ${
                        isSelected ? 'text-brand-green-muted' : 'text-brand-green'
                      }`}
                    >
                      {hub.state}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold px-2 py-0.5 rounded border ${
                        isSelected
                          ? 'bg-white/10 border-white/20 text-white'
                          : 'bg-brand-green-soft border-brand-green-muted text-brand-green'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-red" aria-hidden="true" />
                      {hub.securityTag}
                    </span>
                  </div>

                  {/* Sede Name + Role */}
                  <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
                    {hub.city}
                  </h3>
                  <p
                    className={`text-xs font-medium mt-0.5 mb-4 ${
                      isSelected ? 'text-brand-green-muted' : 'text-ink-muted'
                    }`}
                  >
                    {hub.role}
                  </p>

                  {/* Large m² + Estibaje readout */}
                  <div
                    className={`grid grid-cols-2 gap-3 pb-4 mb-4 border-b ${
                      isSelected ? 'border-white/15' : 'border-brand-green-muted/70'
                    }`}
                  >
                    <div>
                      <span
                        className={`text-[10px] uppercase tracking-wider block mb-0.5 ${
                          isSelected ? 'text-brand-green-muted/90' : 'text-ink-muted'
                        }`}
                      >
                        Superficie
                      </span>
                      <span className="text-2xl sm:text-3xl font-black font-mono tabular-nums tracking-tight">
                        {hub.areaM2Label}
                      </span>
                    </div>
                    <div>
                      <span
                        className={`text-[10px] uppercase tracking-wider block mb-0.5 ${
                          isSelected ? 'text-brand-green-muted/90' : 'text-ink-muted'
                        }`}
                      >
                        Estibaje nominal
                      </span>
                      <span
                        className={`text-base sm:text-lg font-extrabold font-mono tabular-nums block mt-1 ${
                          isSelected ? 'text-brand-green-soft' : 'text-brand-green'
                        }`}
                      >
                        {hub.palletsLabel}
                      </span>
                    </div>
                  </div>

                  {/* 3 Bullets of coverage / sanidad / network role */}
                  <ul className="space-y-2 mb-5">
                    {hub.cardBullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-2 text-xs leading-relaxed ${
                          isSelected ? 'text-white/90' : 'text-ink-muted'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isSelected ? 'text-brand-green-muted' : 'text-brand-green'
                          }`}
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Proportional Share Bar */}
                <div
                  className={`pt-3.5 border-t ${
                    isSelected ? 'border-white/15' : 'border-brand-green-muted/70'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className={isSelected ? 'text-brand-green-muted' : 'text-ink-muted'}>
                      Proporción capacidad total
                    </span>
                    <span
                      className={`font-mono font-bold tabular-nums ${
                        isSelected ? 'text-white' : 'text-brand-green'
                      }`}
                    >
                      {hub.capacityShareLabel}
                    </span>
                  </div>
                  <div
                    className={`h-1.5 w-full rounded-full overflow-hidden ${
                      isSelected ? 'bg-white/15' : 'bg-brand-green-soft'
                    }`}
                  >
                    <div
                      style={{ width: `${hub.capacityShare}%` }}
                      className={`h-full rounded-full ${
                        isSelected ? 'bg-brand-green-muted' : 'bg-brand-green'
                      }`}
                    />
                  </div>
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
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Real Hub Photography Frame (local dark scrim ONLY over media) */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="relative rounded-2xl overflow-hidden border border-brand-green-muted/80 bg-black flex-1 min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] shadow-sm">
                <img
                  src={activeHub.image}
                  alt={`Instalaciones de DIVIPECA en ${activeHub.city}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-md rounded-xl border border-white/70 text-xs grid grid-cols-1 sm:grid-cols-3 gap-3 shadow-sm">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-ink-muted block tracking-wider">
                      Capacidad de Sede ({activeHub.capacityShareLabel})
                    </span>
                    <span className="text-sm font-bold text-brand-green font-mono tabular-nums">
                      {activeHub.areaM2Label} · {activeHub.palletsLabel}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-ink-muted block tracking-wider">
                      Frecuencia
                    </span>
                    <span className="text-xs font-semibold text-brand-green">
                      {activeHub.dispatchFrequency}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-ink-muted block tracking-wider">
                      Dotación
                    </span>
                    <span className="text-xs font-semibold text-ink">
                      {activeHub.fleetStationed}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Specifications & Operating Scope */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 bg-white rounded-2xl border border-brand-green-muted/85 shadow-xs">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-ink-muted uppercase tracking-wider mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-green" />
                  <span>
                    Sede {activeHub.city} · {activeHub.state}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-ink mb-3">
                  {activeHub.role}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed mb-6 font-normal">
                  {activeHub.description}
                </p>

                <div className="space-y-2.5 mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-ink">
                    Equipamiento &amp; Protocolos:
                  </div>
                  <div className="space-y-2.5">
                    {activeHub.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-xs text-ink-muted"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-brand-green-muted/70">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-2.5">
                    Ciudades y municipios abastecidos:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeHub.coverage.map((city) => (
                      <span
                        key={city}
                        className="text-[11px] font-medium bg-surface-alt px-2.5 py-1 rounded-md border border-brand-green-muted/80 text-ink"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-brand-green-muted/70 flex items-center justify-between">
                <span className="text-xs text-ink-muted">
                  ¿Requieres espacio en este hub?
                </span>
                <motion.button
                  type="button"
                  onClick={() => onOpenContact(`Sede ${activeHub.city} (${activeHub.areaM2Label})`)}
                  whileHover={primaryButtonHover}
                  whileTap={primaryButtonTap}
                  className={`text-xs font-semibold text-white bg-brand-green hover:bg-brand-green-hover px-4 py-2.5 rounded-lg ${BUTTON_TRANSITION_CLASS} cursor-pointer`}
                >
                  Consultar Disponibilidad
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Sub-Section: Respaldo Operativo (Flota + 4 Pilares) on clean --surface */}
      <div
        id="respaldo-operativo"
        className="bg-surface border-t border-brand-green-muted/70 py-16 sm:py-20 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-brand-green mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                <Truck className="w-3.5 h-3.5" />
                <span>04. Respaldo Operativo · Flota Propia y Sanidad</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-ink">
                Flota propia de 5 a 12 Toneladas para consumo masivo y alimentos.
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted mt-1.5 font-normal leading-relaxed">
                Unidades NPR, Encava ET-5 y JAC Búfalo con monitoreo en ruta, operación continua desde 1990 y protocolos de sanidad vigentes en Guárico, Anzoátegui, Sucre y Bolívar.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <motion.button
                type="button"
                onClick={() => onOpenContact('Respaldo Operativo - Flota Propia')}
                whileHover={primaryButtonHover}
                whileTap={primaryButtonTap}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-brand-green hover:bg-brand-green-hover rounded-lg ${BUTTON_TRANSITION_CLASS} cursor-pointer`}
              >
                <span>Solicitar Evaluación Logística</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
              <motion.a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={secondaryButtonHover}
                whileTap={secondaryButtonTap}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-ink hover:text-brand-green bg-surface-warm border border-brand-green-muted hover:border-brand-green rounded-lg ${BUTTON_TRANSITION_CLASS} cursor-pointer`}
              >
                <MessageCircle className="w-3.5 h-3.5 text-brand-green" />
                <span>WhatsApp</span>
              </motion.a>
            </div>
          </div>

          {/* Real Fleet Photography (local dark scrim ONLY over media) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-7">
            <div className="md:col-span-7 relative rounded-2xl overflow-hidden border border-brand-green-muted/80 bg-black h-60 sm:h-72 shadow-xs">
              <img
                src={IMAGES.fleetLineup}
                alt="Línea de camiones propios DIVIPECA — Unidades Encava y JAC Búfalo"
                loading="lazy"
                className="w-full h-full object-cover object-[center_40%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between gap-2 text-xs text-white">
                <span className="font-semibold">Flota propia rotulada DIVIPECA</span>
                <span className="text-[11px] font-mono text-brand-green-muted">Encava · JAC Búfalo</span>
              </div>
            </div>

            <div className="md:col-span-5 relative rounded-2xl overflow-hidden border border-brand-green-muted/80 bg-black h-60 sm:h-72 shadow-xs">
              <img
                src={IMAGES.truckCloseup}
                alt="Unidad pesada JAC Búfalo de DIVIPECA con emblema institucional en puerta"
                loading="lazy"
                className="w-full h-full object-cover object-[center_40%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between gap-2 text-xs text-white">
                <span className="font-semibold">JAC Búfalo 10–12T</span>
                <span className="text-[11px] font-mono text-brand-green-muted">Cummins · Ruta Regional</span>
              </div>
            </div>
          </div>

          {/* Fleet Vehicle Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {FLEET_DETAILS.map((fleet) => (
              <div
                key={fleet.model}
                className={`p-5 sm:p-6 rounded-2xl border border-brand-green-muted/80 bg-surface-warm hover:bg-brand-green-soft/30 hover:border-brand-green/60 ${BUTTON_TRANSITION_CLASS} flex flex-col justify-between shadow-xs`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                      {fleet.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-brand-green bg-brand-green-soft px-2 py-0.5 rounded border border-brand-green-muted">
                      {fleet.payloadCapacity}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-ink mb-2">
                    {fleet.model}
                  </h4>
                  <p className="text-xs text-ink-muted mb-4 leading-relaxed font-normal">
                    {fleet.useCase}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-brand-green-muted/60">
                    {fleet.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-ink-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-green shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-brand-green-muted/60 flex items-center justify-between text-[11px] text-ink-muted font-medium">
                  <span>Mantenimiento interno</span>
                  <span className="text-brand-green font-semibold">100% Operatividad</span>
                </div>
              </div>
            ))}
          </div>

          {/* 4 Operational Pillars Grid */}
          <div ref={pillarsRef} className="pt-8 border-t border-brand-green-muted/70">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-brand-green mb-1">
                  Pilares de Control Operativo
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-ink">
                  Garantía integral en ruta, almacenamiento y seguridad 24/7
                </h4>
              </div>
              <span className="text-xs font-mono text-ink-muted">
                3.200 m² · 3 centros propios
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {OPERATIONAL_PILLARS.map((pillar, idx) => {
                const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
                return (
                  <motion.div
                    key={pillar.id}
                    initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    animate={pillarsRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{
                      duration: DUR_MED,
                      delay: shouldReduceMotion ? 0 : idx * 0.07,
                      ease: EASE_PREMIUM,
                    }}
                    className="rounded-2xl border border-brand-green-muted/80 bg-surface-warm hover:bg-brand-green-soft/40 hover:border-brand-green hover:-translate-y-0.5 transition-[background-color,border-color,transform] duration-200 p-5 sm:p-6 flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-green-soft border border-brand-green-muted text-brand-green flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-mono font-semibold text-brand-green">
                          {pillar.tag}
                        </span>
                      </div>
                      <h5 className="text-sm sm:text-base font-bold text-ink mb-2 leading-snug">
                        {pillar.title}
                      </h5>
                      <p className="text-xs text-ink-muted leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
