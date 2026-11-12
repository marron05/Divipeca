import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KEY_METRICS } from '../data/divipecaData';
import { TrendingUp, CheckCircle, Shield } from 'lucide-react';
import { fadeUp, staggerContainer, cardHover } from '../utils/motion';

export const StatsSection: React.FC = () => {
  const [selectedMetricId, setSelectedMetricId] = useState<string>(KEY_METRICS[0].id);
  const selectedMetric = KEY_METRICS.find((m) => m.id === selectedMetricId) || KEY_METRICS[0];

  return (
    <section id="indicadores" className="pt-16 pb-20 bg-neutral-950 text-white relative overflow-hidden">
      {/* Background Subtle Gradient & Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(27,94,32,0.18),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Human Editorial Framing & Scroll Animation */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-800/80"
        >
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>01. Capacidad y Desempeño Operacional</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Cifras consolidadas que respaldan cada despacho.
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md font-normal leading-relaxed">
            Medición continua bajo estándares FMCG. Indicadores auditados con trazabilidad
            por estiba, guía de despacho y punto de venta en los 4 estados.
          </p>
        </motion.div>

        {/* 5-Column High-Density KPI Grid with staggerContainer & fadeUp */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 my-8"
        >
          {KEY_METRICS.map((metric) => {
            const isSelected = selectedMetric.id === metric.id;
            return (
              <motion.button
                key={metric.id}
                variants={fadeUp}
                onClick={() => setSelectedMetricId(metric.id)}
                whileHover={cardHover}
                whileTap={{ scale: 0.98 }}
                className={`text-left p-4 sm:p-5 rounded-xl border transition-colors duration-200 relative flex flex-col justify-between cursor-pointer group ${
                  isSelected
                    ? 'bg-neutral-900/90 border-emerald-500/80 ring-1 ring-emerald-500/40 shadow-lg shadow-emerald-950/20'
                    : 'bg-neutral-900/40 border-neutral-800/90 hover:border-neutral-700 hover:bg-neutral-900/70 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
                    <span className="font-medium text-neutral-400 group-hover:text-neutral-300 transition-colors">
                      {metric.unit}
                    </span>
                    {isSelected ? (
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/50">
                        Activo
                      </span>
                    ) : (
                      <span className="text-[10px] text-neutral-600 group-hover:text-neutral-400 transition-colors">
                        Ver
                      </span>
                    )}
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono tabular-nums transition-transform duration-200 group-hover:translate-x-0.5">
                    {metric.value}
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-neutral-800/80">
                  <div className="text-xs font-semibold text-neutral-200 line-clamp-1 group-hover:text-white transition-colors">
                    {metric.label}
                  </div>
                  <div className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                    {metric.trend}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Contextual Metric Deep-Dive Panel with smooth spring transition */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="bg-neutral-900/60 border border-neutral-800/90 rounded-2xl p-5 sm:p-7 backdrop-blur-xs shadow-xl"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMetric.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-neutral-800/80 pb-4 lg:pb-0 lg:pr-6">
                <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">
                  Detalle del Indicador Seleccionado
                </div>
                <div className="text-xl font-bold text-white mb-2">
                  {selectedMetric.label} ({selectedMetric.value} {selectedMetric.unit})
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                  {selectedMetric.detail}
                </p>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800/90 hover:border-neutral-700/80 transition-colors">
                  <span className="text-[10px] uppercase font-semibold text-neutral-400 block mb-1">
                    Estándar Operativo
                  </span>
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{selectedMetric.benchmark}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-normal">
                    Supervisión rigurosa de carga en cada punto de despacho.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800/90 hover:border-neutral-700/80 transition-colors">
                  <span className="text-[10px] uppercase font-semibold text-neutral-400 block mb-1">
                    Consistencia en Ruta
                  </span>
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{selectedMetric.trend}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-normal">
                    Monitoreo en 4 estados con ventanas horarias estrictas.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-3 flex flex-col justify-center bg-neutral-950/90 p-4 rounded-xl border border-neutral-800/90">
                <div className="text-[11px] font-semibold text-neutral-200 mb-1 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  Garantía Operativa DIVIPECA
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-normal">
                  Cero tolerancia a roturas y control de mermas menor al 0.02%. Política de reposición inmediata
                  en caso de incidencia.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Gentle Architectural Transition Gradient toward the light Historia section */}
      <div className="w-full h-10 mt-14 bg-gradient-to-b from-neutral-950 to-neutral-900/40 pointer-events-none" />
    </section>
  );
};


