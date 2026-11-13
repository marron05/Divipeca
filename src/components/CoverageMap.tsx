import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ArrowUpRight, Truck, Warehouse, CheckCircle2, Navigation } from 'lucide-react';
import { LogisticsHub } from '../types';
import { fadeUp, scaleIn, buttonHover, buttonTap } from '../utils/motion';
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

interface HubPinMeta {
  hubId: string;
  xPercent: number;
  yPercent: number;
  shortLabel: string;
  stateLabel: string;
  pillPositionClass: string;
}

// Exact coordinates inside the 640x543 traced Venezuela map
const HUB_PINS: HubPinMeta[] = [
  {
    hubId: 'valle-pascua',
    xPercent: (314 / 640) * 100,
    yPercent: (164 / 543) * 100,
    shortLabel: 'Valle de la Pascua',
    stateLabel: 'Guárico',
    pillPositionClass: 'right-full mr-2.5 top-1/2 -translate-y-1/2',
  },
  {
    hubId: 'barcelona-plc',
    xPercent: (368 / 640) * 100,
    yPercent: (121 / 543) * 100,
    shortLabel: 'Puerto La Cruz / Barcelona',
    stateLabel: 'Anzoátegui · Sucre',
    pillPositionClass: 'bottom-full mb-2.5 left-1/2 -translate-x-1/2',
  },
  {
    hubId: 'ciudad-bolivar',
    xPercent: (408 / 640) * 100,
    yPercent: (208 / 543) * 100,
    shortLabel: 'Ciudad Bolívar',
    stateLabel: 'Bolívar',
    pillPositionClass: 'top-full mt-2.5 left-1/2 -translate-x-1/2',
  },
];

export const CoverageMap: React.FC<CoverageMapProps> = ({
  hubs,
  selectedHubId,
  onSelectHub,
  onOpenContact,
}) => {
  const activeHub = hubs.find((h) => h.id === selectedHubId) || hubs[0];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      className="mb-12 rounded-3xl border border-neutral-200 bg-neutral-50/70 p-4 sm:p-6 lg:p-8 shadow-xs"
    >
      {/* Map Header Copy */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-neutral-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1B5E20] mb-1">
            <Navigation className="w-3.5 h-3.5" />
            <span>Cobertura operativa</span>
          </div>
          <p className="text-sm sm:text-base font-bold text-neutral-950">
            3 centros propios · 4 estados · flota dedicada
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#1B5E20] inline-block" />
            <span className="font-medium">Estados cubiertos (4)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-white border-2 border-[#1B5E20] inline-block shadow-2xs" />
            <span className="font-medium">Sedes propias (3)</span>
          </div>
        </div>
      </div>

      {/* Interactive Split: Proportional Map Canvas (Left) + Synchronized Hub Ficha (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Map Canvas Container */}
        <motion.div
          variants={scaleIn}
          className="lg:col-span-7 relative rounded-2xl bg-white border border-neutral-200/90 p-4 sm:p-6 flex flex-col justify-between shadow-2xs"
        >
          {/* Top geographical context label */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              Venezuela · Eje Llanos, Oriente y Guayana
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

              {/* 4 Highlighted Active States in DIVIPECA Green */}
              {VENEZUELA_ACTIVE_STATES.map((st) => {
                const isHubSelected = st.hubId === selectedHubId;
                const labelX = st.id === 'anzoategui' ? 364 : st.labelX;
                const labelY = st.id === 'anzoategui' ? 185 : st.labelY;

                return (
                  <g
                    key={st.id}
                    onClick={() => onSelectHub(st.hubId)}
                    className="cursor-pointer"
                  >
                    <path
                      d={st.path}
                      fill={isHubSelected ? '#1B5E20' : '#2E7D32'}
                      fillOpacity={isHubSelected ? 0.94 : 0.7}
                      stroke="#FFFFFF"
                      strokeWidth={isHubSelected ? '2.2' : '1.6'}
                      strokeLinejoin="round"
                      className="transition-all duration-300 hover:fill-[#1B5E20] hover:fill-opacity-95"
                    />
                    <text
                      x={labelX}
                      y={labelY}
                      fill="#FFFFFF"
                      fillOpacity={isHubSelected ? 0.96 : 0.88}
                      fontSize={st.id === 'sucre' ? '8.5' : '11'}
                      fontWeight="700"
                      textAnchor="middle"
                      className="pointer-events-none select-none tracking-wide"
                    >
                      {st.name}
                    </text>
                  </g>
                );
              })}

              {/* Gentle Trunk Logistics Arcs connecting the 3 Hubs */}
              <path
                d="M 314,164 Q 336,136 368,121"
                fill="none"
                stroke="#A7F3D0"
                strokeWidth="1.75"
                strokeDasharray="4 4"
                strokeOpacity="0.9"
                className="pointer-events-none"
              />
              <path
                d="M 368,121 Q 396,162 408,208"
                fill="none"
                stroke="#A7F3D0"
                strokeWidth="1.75"
                strokeDasharray="4 4"
                strokeOpacity="0.9"
                className="pointer-events-none"
              />
            </svg>

            {/* Interactive HTML Pill Pins positioned accurately over the SVG coordinates */}
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
                    {/* Soft green glow ring on active pin */}
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={{ opacity: [0.55, 0.2, 0.55], scale: [1, 1.55, 1] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute w-7 h-7 rounded-full bg-emerald-400/55 blur-[1px] pointer-events-none"
                      />
                    )}

                    {/* Pin Marker Circle */}
                    <span
                      className={`relative w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
                        isActive
                          ? 'bg-white border-[2.5px] border-[#052E16] scale-110 ring-4 ring-emerald-400/35'
                          : 'bg-emerald-50 border-2 border-[#1B5E20] group-hover:scale-110'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? 'bg-[#1B5E20]' : 'bg-[#1B5E20]/80'
                        }`}
                      />
                    </span>

                    {/* Elegant Rounded-Full Pill Label (Desktop / Tablet) */}
                    <motion.span
                      key={`${pin.hubId}-${isActive ? 'active' : 'idle'}`}
                      initial={{ opacity: 0.85, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className={`hidden sm:inline-flex items-center gap-1.5 absolute whitespace-nowrap rounded-full px-3.5 py-1 text-[11px] font-semibold tracking-tight transition-all duration-200 ${
                        pin.pillPositionClass
                      } ${
                        isActive
                          ? 'bg-[#1B5E20] text-white border border-emerald-300/40 shadow-md shadow-emerald-950/20'
                          : 'bg-white/95 text-neutral-800 border border-neutral-300/80 shadow-xs hover:border-[#1B5E20]/50 hover:text-[#1B5E20]'
                      }`}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 shrink-0" />
                      )}
                      <span>{pin.shortLabel}</span>
                    </motion.span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Quick-tap Pill Bar (Always clear on Mobile & quick access on Desktop) */}
          <div className="mt-4 pt-3.5 border-t border-neutral-100 flex flex-wrap gap-2">
            {HUB_PINS.map((pin) => {
              const isActive = pin.hubId === selectedHubId;
              return (
                <motion.button
                  key={pin.hubId}
                  type="button"
                  onClick={() => onSelectHub(pin.hubId)}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#1B5E20] text-white shadow-sm shadow-emerald-950/15 border border-emerald-700'
                      : 'bg-neutral-100 text-neutral-700 border border-neutral-200/80 hover:bg-neutral-200/70'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{pin.shortLabel}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Synchronized Active Hub Ficha Card */}
        <div className="lg:col-span-5 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeHub.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 rounded-2xl bg-white border border-neutral-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between"
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
                  {activeHub.city}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#1B5E20] mb-3">
                  {activeHub.role}
                </p>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-5">
                  {activeHub.description}
                </p>

                {/* Quick Capacity Metrics */}
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

                {/* Top Highlights */}
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
                  className="text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition-colors"
                >
                  Ver ficha y fotos ↓
                </a>
                <motion.button
                  onClick={() => onOpenContact(`Mapa - Sede ${activeHub.city}`)}
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#1B5E20] hover:bg-[#2E7D32] px-4 py-2.5 rounded-lg transition-colors cursor-pointer shadow-xs"
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
