import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { MapPin, ArrowUpRight, Truck, Warehouse, CheckCircle2, Navigation } from 'lucide-react';
import { LogisticsHub } from '../types';
import {
  EASE_PREMIUM,
  DUR_MED,
  VIEWPORT_CONFIG,
  fadeUp,
  primaryButtonHover,
  primaryButtonTap,
} from '../utils/motion';
import {
  VENEZUELA_VIEWBOX,
  VENEZUELA_NEUTRAL_STATES,
  VENEZUELA_ACTIVE_STATES,
} from '../data/venezuelaMapPaths';

interface CoverageMapProps {
  hubs: LogisticsHub[];
  selectedHubId: string;
  onSelectHub: (hubId: string) => void;
  onOpenContact: (source?: string) => void;
}

interface OutboundVector {
  toX: number;
  toY: number;
}

interface HubPinMeta {
  hubId: string;
  x: number;
  y: number;
  xPercent: number;
  yPercent: number;
  shortLabel: string;
  stateLabel: string;
  pillPositionClass: string;
  outboundVectors: OutboundVector[];
}

// Exact coordinates inside the 640x543 traced Venezuela map.
// Outbound vectors radiate ONLY from each center into its own regional coverage (no inter-hub routes).
const HUB_PINS: HubPinMeta[] = [
  {
    hubId: 'valle-pascua',
    x: 314,
    y: 164,
    xPercent: (314 / 640) * 100,
    yPercent: (164 / 543) * 100,
    shortLabel: 'Valle de la Pascua',
    stateLabel: 'Estado Guárico',
    pillPositionClass: 'right-full mr-2.5 top-1/2 -translate-y-1/2',
    outboundVectors: [
      { toX: 274, toY: 168 },
      { toX: 286, toY: 204 },
      { toX: 298, toY: 136 },
    ],
  },
  {
    hubId: 'barcelona-plc',
    x: 354,
    y: 125,
    xPercent: (354 / 640) * 100,
    yPercent: (125 / 543) * 100,
    shortLabel: 'Puerto La Cruz / Barcelona',
    stateLabel: 'Anzoátegui y Sucre',
    pillPositionClass: 'bottom-full mb-2.5 right-0 translate-x-4',
    outboundVectors: [
      { toX: 406, toY: 112 },
      { toX: 372, toY: 170 },
      { toX: 354, toY: 192 },
    ],
  },
  {
    hubId: 'ciudad-bolivar',
    x: 408,
    y: 208,
    xPercent: (408 / 640) * 100,
    yPercent: (208 / 543) * 100,
    shortLabel: 'Ciudad Bolívar',
    stateLabel: 'Estado Bolívar',
    pillPositionClass: 'top-full mt-2.5 left-1/2 -translate-x-1/2',
    outboundVectors: [
      { toX: 330, toY: 256 },
      { toX: 410, toY: 278 },
      { toX: 472, toY: 236 },
    ],
  },
];

export const CoverageMap: React.FC<CoverageMapProps> = ({
  hubs,
  selectedHubId,
  onSelectHub,
  onOpenContact,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const activeHub = hubs.find((h) => h.id === selectedHubId) || hubs[0];
  const activePin = HUB_PINS.find((p) => p.hubId === selectedHubId) || HUB_PINS[0];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      variants={fadeUp}
      className="mb-12 rounded-3xl border border-neutral-200 bg-neutral-50/70 p-4 sm:p-6 lg:p-8"
    >
      {/* Map Header Copy */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-neutral-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1B5E20] mb-1">
            <Navigation className="w-3.5 h-3.5" />
            <span>Cobertura operativa</span>
          </div>
          <p className="text-sm sm:text-base font-bold text-neutral-950">
            3 centros propios · 4 estados · despacho local con flota dedicada
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#1B5E20] inline-block" />
            <span className="font-medium">Estados cubiertos (4)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-white border-2 border-[#1B5E20] inline-block" />
            <span className="font-medium">Sedes propias (3)</span>
          </div>
        </div>
      </div>

      {/* Interactive Split: Proportional Map Canvas (Left) + Synchronized Hub Ficha (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Map Canvas Container */}
        <div className="lg:col-span-7 relative rounded-2xl bg-white border border-neutral-200/90 p-4 sm:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              Venezuela · Guárico, Anzoátegui, Sucre y Bolívar
            </span>
            <span className="text-[11px] text-[#1B5E20] font-medium hidden sm:inline">
              Haz clic en un pin o estado
            </span>
          </div>

          {/* Authentic Proportioned 640x543 Venezuela SVG + Pill Pins Overlay */}
          <div className="relative w-full max-w-[560px] mx-auto aspect-[640/543]">
            <svg
              viewBox={VENEZUELA_VIEWBOX}
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-full select-none block"
              role="img"
              aria-label="Mapa interactivo de cobertura operativa DIVIPECA en Guárico, Anzoátegui, Sucre y Bolívar"
            >
              {/* All other Venezuelan states in very soft grey */}
              {VENEZUELA_NEUTRAL_STATES.map((path, index) => (
                <path
                  key={index}
                  d={path}
                  fill="#F3F4F6"
                  stroke="#D1D5DB"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              ))}

              {/* 4 Highlighted Active States in DIVIPECA Green (~0.4s color transition, no flash) */}
              {VENEZUELA_ACTIVE_STATES.map((st) => {
                const isHubSelected = st.hubId === selectedHubId;
                const isSucre = st.id === 'sucre';

                return (
                  <g
                    key={st.id}
                    onClick={() => onSelectHub(st.hubId)}
                    className="cursor-pointer"
                  >
                    <path
                      d={st.path}
                      fill={
                        isSucre
                          ? isHubSelected
                            ? '#256D29'
                            : '#43A047'
                          : isHubSelected
                          ? '#1B5E20'
                          : '#2E7D32'
                      }
                      fillOpacity={isHubSelected ? 0.94 : 0.72}
                      stroke="#FFFFFF"
                      strokeWidth="2.4"
                      strokeLinejoin="round"
                      className="transition-[fill,fill-opacity] duration-[400ms] ease-out hover:fill-[#1B5E20] hover:fill-opacity-95"
                    />
                    <text
                      x={st.labelX}
                      y={st.labelY}
                      fill="#FFFFFF"
                      fillOpacity={isHubSelected ? 0.98 : 0.9}
                      fontSize={isSucre ? '8.5' : st.id === 'anzoategui' ? '9' : '10.5'}
                      fontWeight="700"
                      textAnchor="middle"
                      className="pointer-events-none select-none tracking-tight"
                    >
                      {st.name}
                    </text>
                  </g>
                );
              })}

              {/* Discrete one-shot local outbound coverage rays on hub selection (NO infinite loops, NO inter-hub lines) */}
              <g key={`outbound-${activePin.hubId}`} className="pointer-events-none">
                {activePin.outboundVectors.map((vec, idx) => (
                  <g key={idx}>
                    <motion.line
                      x1={activePin.x}
                      y1={activePin.y}
                      x2={vec.toX}
                      y2={vec.toY}
                      stroke="#A7F3D0"
                      strokeWidth="1.5"
                      strokeDasharray="3 4"
                      initial={
                        shouldReduceMotion
                          ? { pathLength: 1, opacity: 0.75 }
                          : { pathLength: 0, opacity: 0 }
                      }
                      animate={{ pathLength: 1, opacity: 0.8 }}
                      transition={{
                        duration: DUR_MED,
                        delay: shouldReduceMotion ? 0 : idx * 0.06,
                        ease: EASE_PREMIUM,
                      }}
                    />
                    <motion.circle
                      cx={vec.toX}
                      cy={vec.toY}
                      r="2.2"
                      fill="#ECFDF5"
                      initial={shouldReduceMotion ? { opacity: 0.85 } : { opacity: 0 }}
                      animate={{ opacity: 0.85 }}
                      transition={{
                        duration: 0.25,
                        delay: shouldReduceMotion ? 0 : 0.32 + idx * 0.06,
                        ease: EASE_PREMIUM,
                      }}
                    />
                  </g>
                ))}
              </g>
            </svg>

            {/* Interactive HTML Pill Pins (pin hover scale strictly <= 1.08, no infinite halos) */}
            {HUB_PINS.map((pin) => {
              const isActive = pin.hubId === selectedHubId;
              return (
                <div
                  key={pin.hubId}
                  style={{ left: `${pin.xPercent}%`, top: `${pin.yPercent}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    type="button"
                    onClick={() => onSelectHub(pin.hubId)}
                    aria-label={`Seleccionar sede ${pin.shortLabel} en ${pin.stateLabel}`}
                    aria-pressed={isActive}
                    className="relative flex items-center justify-center group cursor-pointer focus:outline-none"
                  >
                    {/* Circular Pin Marker (max 1.08 scale on hover ONLY on the pin) */}
                    <motion.span
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.2, ease: EASE_PREMIUM }}
                      className={`relative w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full flex items-center justify-center transition-colors duration-200 ${
                        isActive
                          ? 'bg-white border-[2.5px] border-[#052E16] ring-4 ring-emerald-400/30'
                          : 'bg-emerald-50 border-2 border-[#1B5E20]'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? 'bg-[#1B5E20]' : 'bg-[#1B5E20]/80'
                        }`}
                      />
                    </motion.span>

                    {/* Static Rounded-Full Pill Label (Desktop / Tablet) */}
                    <span
                      className={`hidden sm:inline-flex items-center gap-1.5 absolute whitespace-nowrap rounded-full px-3.5 py-1 text-[11px] font-semibold tracking-tight transition-colors duration-200 ${
                        pin.pillPositionClass
                      } ${
                        isActive
                          ? 'bg-[#1B5E20] text-white border border-emerald-300/40 shadow-sm'
                          : 'bg-white/95 text-neutral-800 border border-neutral-300/80 hover:border-[#1B5E20]/60 hover:text-[#1B5E20]'
                      }`}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 shrink-0" />
                      )}
                      <span>{pin.shortLabel}</span>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Quick-tap Pill Bar */}
          <div className="mt-4 pt-3.5 border-t border-neutral-100 flex flex-wrap gap-2">
            {HUB_PINS.map((pin) => {
              const isActive = pin.hubId === selectedHubId;
              return (
                <button
                  key={pin.hubId}
                  type="button"
                  onClick={() => onSelectHub(pin.hubId)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#1B5E20] text-white border border-emerald-700'
                      : 'bg-neutral-100 text-neutral-700 border border-neutral-200/80 hover:border-[#1B5E20]/50'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{pin.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Synchronized Active Hub Ficha Card (fade + translateY 10px -> 0, durMed) */}
        <div className="lg:col-span-5 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeHub.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: DUR_MED, ease: EASE_PREMIUM }}
              className="flex-1 rounded-2xl bg-white border border-neutral-200 p-5 sm:p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#1B5E20] bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 rounded-md">
                    <MapPin className="w-3 h-3" />
                    {activeHub.state}
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-900 bg-neutral-100 px-2.5 py-1 rounded-md">
                    {activeHub.area}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-950 mb-1">
                  {activeHub.id === 'ciudad-bolivar'
                    ? `${activeHub.city}, ${activeHub.state}`
                    : activeHub.city}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#1B5E20] mb-3">
                  {activeHub.role}
                </p>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-5">
                  {activeHub.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-0.5">
                      <Warehouse className="w-3 h-3 text-[#1B5E20]" />
                      <span>Superficie</span>
                    </div>
                    <div className="text-sm font-bold text-neutral-950 font-mono">
                      {activeHub.area} techados
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-0.5">
                      <Truck className="w-3 h-3 text-[#1B5E20]" />
                      <span>Flota Asignada</span>
                    </div>
                    <div className="text-sm font-bold text-neutral-950">
                      {activeHub.fleetStationed}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-5">
                  {activeHub.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1B5E20] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
                <a
                  href="#sede-detalle"
                  className="text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition-colors duration-200"
                >
                  Ver ficha y fotos ↓
                </a>
                <motion.button
                  type="button"
                  onClick={() => onOpenContact(`Mapa - Sede ${activeHub.city}`)}
                  whileHover={primaryButtonHover}
                  whileTap={primaryButtonTap}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#1B5E20] hover:bg-[#2E7D32] px-4 py-2.5 rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  <span>Consultar Disponibilidad</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
