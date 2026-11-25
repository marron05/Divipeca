import React, { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Calculator,
  MessageCircle,
  Mail,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Package,
  Gauge,
  Truck,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { COMPANY_INFO, PROYECTOR_CONFIG } from '../data/divipecaData';
import {
  EASE_PREMIUM,
  DUR_FAST,
  BUTTON_TRANSITION_CLASS,
  primaryButtonHover,
  primaryButtonTap,
  secondaryButtonHover,
  secondaryButtonTap,
} from '../utils/motion';

function getFrecuenciaRecomendada(toneladasMes: number): string {
  if (toneladasMes < 30) return 'Quincenal';
  if (toneladasMes < 80) return 'Semanal';
  if (toneladasMes < 150) return '2 veces por semana';
  return '3 veces por semana o evaluar más de una sede';
}

function formatDecimalEs(value: number, decimals: number): string {
  return value.toFixed(decimals).replace('.', ',');
}

export const ProyectorSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [toneladasInput, setToneladasInput] = useState<string>(String(PROYECTOR_CONFIG.tonDefault));
  const [selectedSedeId, setSelectedSedeId] = useState<string>(PROYECTOR_CONFIG.sedes[0].id);

  const selectedSede = useMemo(
    () =>
      PROYECTOR_CONFIG.sedes.find((s) => s.id === selectedSedeId) || PROYECTOR_CONFIG.sedes[0],
    [selectedSedeId]
  );

  // Clamp numeric tonnage safely to [tonMin, tonMax] for calculation
  const toneladasMes = useMemo(() => {
    const parsed = Number(toneladasInput);
    if (!Number.isFinite(parsed) || toneladasInput.trim() === '') {
      return PROYECTOR_CONFIG.tonMin;
    }
    return Math.min(PROYECTOR_CONFIG.tonMax, Math.max(PROYECTOR_CONFIG.tonMin, parsed));
  }, [toneladasInput]);

  const paletasEstimadas = useMemo(
    () => Math.max(0, toneladasMes * PROYECTOR_CONFIG.paletasPorTon),
    [toneladasMes]
  );

  const ocupacionPct = useMemo(
    () => (paletasEstimadas / selectedSede.paletasNominal) * 100,
    [paletasEstimadas, selectedSede.paletasNominal]
  );

  const frecuenciaRecomendada = useMemo(
    () => getFrecuenciaRecomendada(toneladasMes),
    [toneladasMes]
  );

  const ocupacionStatus = useMemo(() => {
    if (ocupacionPct > 100) {
      return {
        tone: 'critical' as const,
        label: 'Supera capacidad nominal de la sede',
        badgeClass: 'bg-red-50 text-red-800 border-red-200',
        barClass: 'bg-red-600',
        Icon: AlertOctagon,
      };
    }
    if (ocupacionPct > 85) {
      return {
        tone: 'alert' as const,
        label: 'Alta ocupación — validar disponibilidad',
        badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
        barClass: 'bg-amber-500',
        Icon: AlertTriangle,
      };
    }
    return {
      tone: 'ok' as const,
      label: 'Dentro de rango operativo estimado',
      badgeClass: 'bg-emerald-50 text-[#1B5E20] border-emerald-200',
      barClass: 'bg-[#1B5E20]',
      Icon: CheckCircle2,
    };
  }, [ocupacionPct]);

  const barScale = Math.min(1, Math.max(0, ocupacionPct / 100));

  const paletasDisplay = Number.isInteger(paletasEstimadas)
    ? String(paletasEstimadas)
    : formatDecimalEs(paletasEstimadas, 1);

  const ocupacionDisplay = `${formatDecimalEs(ocupacionPct, 1)}%`;

  const whatsappHref = useMemo(() => {
    const msg = `Hola, me interesan ${toneladasMes} ton/mes en sede ${selectedSede.label}. Quiero una evaluación de capacidad 3PL con DIVIPECA`;
    return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }, [toneladasMes, selectedSede.label]);

  const emailHref = useMemo(() => {
    const subject = `Evaluación 3PL — ${toneladasMes} ton/mes en ${selectedSede.label}`;
    const body = [
      `Hola equipo DIVIPECA,`,
      ``,
      `Solicito evaluación de capacidad logística 3PL con los siguientes datos estimados:`,
      `- Toneladas por mes: ${toneladasMes} Ton/Mes`,
      `- Sede de interés: ${selectedSede.label}`,
      `- Paletas estimadas (factor ${PROYECTOR_CONFIG.paletasPorTon}): ${paletasDisplay} paletas`,
      `- Ocupación estimada de sede: ${ocupacionDisplay}`,
      `- Frecuencia recomendada: ${frecuenciaRecomendada}`,
    ].join('\n');
    return `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [toneladasMes, selectedSede.label, paletasDisplay, ocupacionDisplay, frecuenciaRecomendada]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToneladasInput(e.target.value);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToneladasInput(e.target.value);
  };

  const handleNumberBlur = () => {
    setToneladasInput(String(toneladasMes));
  };

  const StatusIcon = ocupacionStatus.Icon;

  return (
    <section
      id="proyector"
      className="py-20 sm:py-24 bg-white border-t border-neutral-200/80 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#1B5E20] mb-2.5 flex items-center gap-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>05. Proyector Mensual · Estimación de Capacidad 3PL</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 mb-3 text-balance">
              Proyector Mensual de Capacidad
            </h2>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
              Estimación orientativa con datos de operación DIVIPECA. No sustituye una evaluación formal ni reserva cupo.
            </p>
          </div>

          <div className="text-xs text-neutral-600 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 shrink-0 font-mono tabular-nums">
            <span className="text-neutral-500">Red propia: </span>
            <strong className="text-neutral-950 font-bold">
              {PROYECTOR_CONFIG.m2TotalesRed.toLocaleString('es-VE')} m² · {PROYECTOR_CONFIG.paletasTotalesRed.toLocaleString('es-VE')} paletas
            </strong>
          </div>
        </div>

        {/* Interactive Split Calculator: Controls (Left) + Live Results (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* LEFT PANEL: Inputs */}
          <div className="lg:col-span-5 rounded-2xl border border-neutral-200 bg-neutral-50/75 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-7">
              <div>
                <h3 className="text-lg font-bold text-neutral-950 mb-1">
                  Parámetros de su operación
                </h3>
                <p className="text-xs text-neutral-500">
                  Ajuste volumen mensual y sede para estimar estiba y frecuencia de despacho.
                </p>
              </div>

              {/* Control 1: Toneladas por mes (Input + Range Slider) */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <label
                    htmlFor="proyector-toneladas-number"
                    className="text-xs font-bold uppercase tracking-wider text-neutral-800"
                  >
                    Toneladas por mes
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      id="proyector-toneladas-number"
                      type="number"
                      min={PROYECTOR_CONFIG.tonMin}
                      max={PROYECTOR_CONFIG.tonMax}
                      step={PROYECTOR_CONFIG.tonStep}
                      value={toneladasInput}
                      onChange={handleNumberChange}
                      onBlur={handleNumberBlur}
                      aria-label="Toneladas por mes"
                      className="w-24 text-right font-mono tabular-nums text-base font-extrabold text-neutral-950 bg-white border border-neutral-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/30 focus:border-[#1B5E20]"
                    />
                    <span className="text-xs font-semibold text-neutral-500">Ton/Mes</span>
                  </div>
                </div>

                <input
                  id="proyector-toneladas-slider"
                  type="range"
                  min={PROYECTOR_CONFIG.tonMin}
                  max={PROYECTOR_CONFIG.tonMax}
                  step={PROYECTOR_CONFIG.tonStep}
                  value={toneladasMes}
                  onChange={handleSliderChange}
                  aria-label="Selector deslizante de toneladas por mes"
                  className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#1B5E20]"
                />

                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mt-1.5">
                  <span>{PROYECTOR_CONFIG.tonMin} Ton</span>
                  <span>150 Ton</span>
                  <span>{PROYECTOR_CONFIG.tonMax} Ton</span>
                </div>
              </div>

              {/* Control 2: Sede de interés */}
              <div>
                <label
                  htmlFor="proyector-sede"
                  className="text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-2"
                >
                  Sede de interés
                </label>
                <select
                  id="proyector-sede"
                  value={selectedSedeId}
                  onChange={(e) => setSelectedSedeId(e.target.value)}
                  className="w-full text-sm font-semibold text-neutral-900 bg-white border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/30 focus:border-[#1B5E20] cursor-pointer"
                >
                  {PROYECTOR_CONFIG.sedes.map((sede) => (
                    <option key={sede.id} value={sede.id}>
                      {sede.label}
                    </option>
                  ))}
                </select>
                <div className="flex items-center justify-between text-xs text-neutral-500 mt-2">
                  <span>{selectedSede.nota}</span>
                  <span className="font-mono font-semibold text-neutral-700 tabular-nums">
                    Ref. {selectedSede.paletasNominal} paletas nominales
                  </span>
                </div>
              </div>
            </div>

            {/* Reference Conversion Note */}
            <div className="mt-8 pt-4 border-t border-neutral-200/90 text-xs text-neutral-600 flex items-center justify-between gap-2">
              <span>Factor estándar consumo masivo</span>
              <span className="font-mono font-bold text-neutral-900 tabular-nums">
                {formatDecimalEs(PROYECTOR_CONFIG.paletasPorTon, 2)} paletas / Ton
              </span>
            </div>
          </div>

          {/* RIGHT PANEL: Live Results + Visual Bar + CTAs */}
          <div className="lg:col-span-7 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Top Row: Primary KPIs (Paletas + % Ocupación) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-neutral-200/80">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                    <Package className="w-3.5 h-3.5 text-[#1B5E20]" />
                    <span>Paletas estimadas</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-950 font-mono tabular-nums">
                      {paletasDisplay}
                    </span>
                    <span className="text-sm font-bold text-neutral-600">paletas / mes</span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1 font-mono tabular-nums">
                    {toneladasMes} Ton × {formatDecimalEs(PROYECTOR_CONFIG.paletasPorTon, 2)} paletas/Ton
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                    <Gauge className="w-3.5 h-3.5 text-[#1B5E20]" />
                    <span>Ocupación estimada en sede</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-950 font-mono tabular-nums">
                      {ocupacionDisplay}
                    </span>
                    <span className="text-xs font-medium text-neutral-500">
                      de {selectedSede.paletasNominal} paletas
                    </span>
                  </div>
                  <div
                    className={`inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-md border text-xs font-semibold ${ocupacionStatus.badgeClass}`}
                  >
                    <StatusIcon className="w-3.5 h-3.5 shrink-0" />
                    <span>{ocupacionStatus.label}</span>
                  </div>
                </div>
              </div>

              {/* Visual Occupation Bar (0-100%, GPU scaleX) */}
              <div className="py-5 border-b border-neutral-200/80">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-neutral-700">
                    Uso proyectado de capacidad nominal en {selectedSede.label}
                  </span>
                  <span className="font-mono font-bold text-neutral-900 tabular-nums">
                    {ocupacionDisplay}
                  </span>
                </div>

                <div className="h-3.5 w-full rounded-full bg-neutral-100 border border-neutral-200 overflow-hidden">
                  <motion.div
                    initial={false}
                    animate={{ scaleX: barScale }}
                    style={{ transformOrigin: 'left' }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: DUR_FAST, ease: EASE_PREMIUM }
                    }
                    className={`h-full w-full rounded-full transition-colors duration-200 ${ocupacionStatus.barClass}`}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mt-1.5">
                  <span>0%</span>
                  <span>85% (alerta)</span>
                  <span>100% (nominal)</span>
                </div>

                {ocupacionPct > 100 && (
                  <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 flex items-start gap-2">
                    <AlertOctagon className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                    <span>
                      <strong>Supera capacidad nominal de la sede ({ocupacionDisplay}).</strong>{' '}
                      Recomendamos evaluar mayor frecuencia de rotación o distribuir inventario entre sedes de la red de 1.200 paletas.
                    </span>
                  </div>
                )}
              </div>

              {/* Operational Output Summary Rows */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-5 border-b border-neutral-200/80">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                    <Truck className="w-3.5 h-3.5 text-[#1B5E20]" />
                    <span>Frecuencia recomendada</span>
                  </div>
                  <div className="text-sm font-bold text-neutral-950 leading-snug">
                    {frecuenciaRecomendada}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1B5E20]" />
                    <span>Cumplimiento objetivo</span>
                  </div>
                  <div className="text-sm font-bold text-neutral-950 font-mono tabular-nums leading-snug">
                    {PROYECTOR_CONFIG.otifObjetivoTexto}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#1B5E20]" />
                    <span>Lead time de red</span>
                  </div>
                  <div className="text-sm font-bold text-neutral-950 font-mono tabular-nums leading-snug">
                    {PROYECTOR_CONFIG.leadTimeRefTexto}
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs + Legal Disclaimer */}
            <div className="pt-6">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <motion.a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={primaryButtonHover}
                  whileTap={primaryButtonTap}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#1B5E20] hover:bg-[#2E7D32] rounded-xl ${BUTTON_TRANSITION_CLASS} cursor-pointer`}
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>Solicitar evaluación logística con estos datos</span>
                </motion.a>

                <motion.a
                  href={emailHref}
                  whileHover={secondaryButtonHover}
                  whileTap={secondaryButtonTap}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-semibold text-neutral-800 hover:text-neutral-950 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 hover:border-[#1B5E20] rounded-xl ${BUTTON_TRANSITION_CLASS} cursor-pointer`}
                >
                  <Mail className="w-4 h-4 text-[#1B5E20] shrink-0" />
                  <span>Escribir por correo</span>
                </motion.a>
              </div>

              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Cálculo estimativo con factor estándar de estiba. La capacidad real depende del tipo de producto, rotación y ventana de despacho. Un ejecutivo DIVIPECA confirmará disponibilidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
