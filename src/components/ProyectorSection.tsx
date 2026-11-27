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
  ArrowRight,
} from 'lucide-react';
import { COMPANY_INFO, PROYECTOR_CONFIG } from '../data/divipecaData';
import { ProjectedLeadData } from '../types';
import {
  EASE_PREMIUM,
  DUR_FAST,
  BUTTON_TRANSITION_CLASS,
  primaryButtonHover,
  primaryButtonTap,
  secondaryButtonHover,
  secondaryButtonTap,
} from '../utils/motion';

interface ProyectorSectionProps {
  onTransferToContact: (data: ProjectedLeadData) => void;
}

function getFrecuenciaRecomendada(toneladasMes: number): string {
  if (toneladasMes < 45) return 'Quincenal';
  if (toneladasMes < 120) return 'Semanal';
  if (toneladasMes < 250) return '2 veces por semana';
  return '3 veces por semana o esquema multi-sede';
}

function formatDecimalEs(value: number, decimals: number): string {
  return value.toFixed(decimals).replace('.', ',');
}

export const ProyectorSection: React.FC<ProyectorSectionProps> = ({
  onTransferToContact,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [toneladasInput, setToneladasInput] = useState<string>(String(PROYECTOR_CONFIG.tonDefault));
  const [selectedSedeId, setSelectedSedeId] = useState<string>(PROYECTOR_CONFIG.sedes[0].id);

  const selectedSede = useMemo(
    () =>
      PROYECTOR_CONFIG.sedes.find((s) => s.id === selectedSedeId) || PROYECTOR_CONFIG.sedes[0],
    [selectedSedeId]
  );

  // Clamp numeric tonnage safely to [tonMin, tonMax] (20 - 550 Ton/Mes)
  const toneladasMes = useMemo(() => {
    const parsed = Number(toneladasInput);
    if (!Number.isFinite(parsed) || toneladasInput.trim() === '') {
      return PROYECTOR_CONFIG.tonMin;
    }
    return Math.min(PROYECTOR_CONFIG.tonMax, Math.max(PROYECTOR_CONFIG.tonMin, parsed));
  }, [toneladasInput]);

  // Official ratio: 1.5 paletas por tonelada
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
        label:
          selectedSede.id === 'consolidado'
            ? 'Supera capacidad nominal consolidada'
            : 'Supera capacidad nominal de la sede',
        badgeClass: 'bg-brand-red-soft text-brand-red border-brand-red-muted',
        barClass: 'bg-brand-red',
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
      badgeClass: 'bg-brand-green-soft text-brand-green border-brand-green-muted',
      barClass: 'bg-brand-green',
      Icon: CheckCircle2,
    };
  }, [ocupacionPct, selectedSede.id]);

  const barScale = Math.min(1, Math.max(0, ocupacionPct / 100));

  const paletasDisplay = Number.isInteger(paletasEstimadas)
    ? String(paletasEstimadas)
    : formatDecimalEs(paletasEstimadas, 1);

  const ocupacionDisplay = `${formatDecimalEs(ocupacionPct, 1)}%`;

  const whatsappHref = useMemo(() => {
    const msg = `Hola DIVIPECA, proyecté ${toneladasMes} Ton/Mes (${paletasDisplay} paletas est., ${ocupacionDisplay} ocupación) en ${selectedSede.label}. Solicito evaluación de capacidad 3PL.`;
    return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }, [toneladasMes, paletasDisplay, ocupacionDisplay, selectedSede.label]);

  const emailHref = useMemo(() => {
    const subject = `Evaluación 3PL — ${toneladasMes} Ton/Mes en ${selectedSede.label}`;
    const body = [
      `Hola equipo DIVIPECA,`,
      ``,
      `Solicito evaluación de capacidad logística 3PL con los siguientes datos estimados:`,
      `- Toneladas por mes: ${toneladasMes} Ton/Mes`,
      `- Sede / alcance seleccionado: ${selectedSede.label}`,
      `- Paletas estimadas (factor ${formatDecimalEs(PROYECTOR_CONFIG.paletasPorTon, 1)} paletas/Ton): ${paletasDisplay} paletas`,
      `- Ocupación estimada: ${ocupacionDisplay}`,
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

  const handleTransferClick = () => {
    onTransferToContact({
      sedeId: selectedSede.id,
      sedeLabel: selectedSede.label,
      toneladasMes,
      paletasDisplay,
      ocupacionDisplay,
      frecuenciaRecomendada,
      timestamp: Date.now(),
    });
  };

  const StatusIcon = ocupacionStatus.Icon;

  return (
    <section
      id="proyector"
      className="py-20 sm:py-24 bg-surface-warm border-t border-brand-green-muted/60 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-brand-green mb-2.5 flex items-center gap-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>05. Proyector Mensual · Estimación de Capacidad 3PL</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-ink mb-3 text-balance">
              Proyector Mensual de Capacidad
            </h2>

            <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-normal">
              Estimación orientativa con parámetros reales DIVIPECA (1,5 paletas por Ton/Mes). No sustituye una evaluación técnica formal ni reserva cupo.
            </p>
          </div>

          <div className="text-xs text-ink-muted bg-white border border-brand-green-muted rounded-xl px-4 py-3 shrink-0 font-mono tabular-nums shadow-xs">
            <span className="text-ink-muted">Red propia: </span>
            <strong className="text-brand-green font-bold">
              3.200 m² · +1.200 paletas
            </strong>
          </div>
        </div>

        {/* Interactive Split Calculator: Controls (Dark Brand Green Left) + Live Results (White Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* LEFT PANEL: Brand Green Dark Corporate Inputs */}
          <div className="lg:col-span-5 rounded-2xl border border-brand-green bg-brand-green-dark text-white p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-7">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Parámetros de su operación
                </h3>
                <p className="text-xs text-brand-green-muted">
                  Seleccione sede o red consolidada y ajuste su volumen mensual en Ton/Mes.
                </p>
              </div>

              {/* Control 1: Tabs / Chips for Consolidado + 3 Sedes */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-green-muted block mb-2.5">
                  Alcance o sede de interés
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PROYECTOR_CONFIG.sedes.map((sede) => {
                    const isActive = sede.id === selectedSede.id;
                    return (
                      <button
                        key={sede.id}
                        type="button"
                        onClick={() => setSelectedSedeId(sede.id)}
                        className={`text-left px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-white text-brand-green-dark border-white shadow-xs'
                            : 'bg-white/10 text-white border-white/15 hover:border-brand-green-muted hover:bg-white/15'
                        }`}
                      >
                        <div className="truncate">{sede.tabLabel}</div>
                        <div
                          className={`text-[10px] font-mono tabular-nums mt-0.5 ${
                            isActive ? 'text-brand-green' : 'text-brand-green-muted'
                          }`}
                        >
                          {sede.paletasNominal.toLocaleString('es-VE')} paletas nominales
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="text-xs text-brand-green-muted mt-2.5">
                  {selectedSede.nota}
                </div>
              </div>

              {/* Control 2: Toneladas por mes */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <label
                    htmlFor="proyector-toneladas-number"
                    className="text-xs font-bold uppercase tracking-wider text-brand-green-muted"
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
                      className="w-24 text-right font-mono tabular-nums text-base font-extrabold text-brand-green-dark bg-white border border-brand-green-muted rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-green-muted"
                    />
                    <span className="text-xs font-semibold text-brand-green-muted">Ton/Mes</span>
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
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-green-soft"
                />

                <div className="flex items-center justify-between text-[11px] font-mono text-brand-green-muted mt-1.5">
                  <span>{PROYECTOR_CONFIG.tonMin} Ton/Mes</span>
                  <span>285 Ton/Mes</span>
                  <span>{PROYECTOR_CONFIG.tonMax} Ton/Mes</span>
                </div>
              </div>
            </div>

            {/* Official Conversion Factor */}
            <div className="mt-8 pt-4 border-t border-white/15 text-xs text-brand-green-muted flex items-center justify-between gap-2">
              <span>Factor estándar consumo masivo</span>
              <span className="font-mono font-bold text-white tabular-nums">
                {formatDecimalEs(PROYECTOR_CONFIG.paletasPorTon, 1)} paletas / Ton
              </span>
            </div>
          </div>

          {/* RIGHT PANEL: Live Results + Visual Bar + Transfer CTA */}
          <div className="lg:col-span-7 rounded-2xl border border-brand-green-muted/90 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              {/* Top Row: Primary KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-brand-green-muted/70">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                    <Package className="w-3.5 h-3.5 text-brand-green" />
                    <span>Paletas estimadas</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black tracking-tight text-brand-green font-mono tabular-nums">
                      {paletasDisplay}
                    </span>
                    <span className="text-sm font-bold text-ink-muted">paletas / mes</span>
                  </div>
                  <p className="text-xs text-ink-muted mt-1 font-mono tabular-nums">
                    {toneladasMes} Ton/Mes × {formatDecimalEs(PROYECTOR_CONFIG.paletasPorTon, 1)} paletas/Ton
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                    <Gauge className="w-3.5 h-3.5 text-brand-green" />
                    <span>
                      {selectedSede.id === 'consolidado'
                        ? 'Ocupación consolidada'
                        : 'Ocupación estimada en sede'}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black tracking-tight text-brand-green font-mono tabular-nums">
                      {ocupacionDisplay}
                    </span>
                    <span className="text-xs font-medium text-ink-muted font-mono tabular-nums">
                      de {selectedSede.paletasNominal.toLocaleString('es-VE')} paletas
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

              {/* Visual Occupation Bar */}
              <div className="py-5 border-b border-brand-green-muted/70">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-ink">
                    Uso proyectado en {selectedSede.label}
                  </span>
                  <span className="font-mono font-bold text-brand-green tabular-nums">
                    {ocupacionDisplay}
                  </span>
                </div>

                <div className="h-3.5 w-full rounded-full bg-surface-alt border border-brand-green-muted overflow-hidden">
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

                <div className="flex items-center justify-between text-[11px] font-mono text-ink-muted mt-1.5">
                  <span>0%</span>
                  <span>85% (alerta)</span>
                  <span>100% (nominal)</span>
                </div>

                {ocupacionPct > 100 && (
                  <div className="mt-3 p-3 rounded-xl bg-brand-red-soft border border-brand-red-muted text-xs text-brand-red flex items-start gap-2">
                    <AlertOctagon className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                    <span>
                      <strong>Supera capacidad nominal ({ocupacionDisplay}).</strong>{' '}
                      {selectedSede.id === 'consolidado'
                        ? 'Recomendamos coordinar reposición semanal o fraccionada en nuestras 3 sedes (1.200 paletas).'
                        : 'Recomendamos seleccionar Consolidado (3 Sedes) o incrementar la frecuencia de reposición semanal.'}
                    </span>
                  </div>
                )}
              </div>

              {/* Operational Output Summary Rows */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-5 border-b border-brand-green-muted/70">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-1">
                    <Truck className="w-3.5 h-3.5 text-brand-green" />
                    <span>Frecuencia recomendada</span>
                  </div>
                  <div className="text-sm font-bold text-ink leading-snug">
                    {frecuenciaRecomendada}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
                    <span>Cumplimiento objetivo</span>
                  </div>
                  <div className="text-sm font-bold text-brand-green font-mono tabular-nums leading-snug">
                    {PROYECTOR_CONFIG.otifObjetivoTexto}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-1">
                    <Clock className="w-3.5 h-3.5 text-brand-green" />
                    <span>Lead time promedio</span>
                  </div>
                  <div className="text-sm font-bold text-brand-green font-mono tabular-nums leading-snug">
                    {PROYECTOR_CONFIG.leadTimeRefTexto}
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs + Legal Disclaimer */}
            <div className="pt-6">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <motion.button
                  type="button"
                  onClick={handleTransferClick}
                  whileHover={primaryButtonHover}
                  whileTap={primaryButtonTap}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-white bg-brand-green hover:bg-brand-green-hover rounded-xl ${BUTTON_TRANSITION_CLASS} cursor-pointer shadow-xs`}
                >
                  <span>Trasladar proyección al formulario ejecutivo</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </motion.button>

                <motion.a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={secondaryButtonHover}
                  whileTap={secondaryButtonTap}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-semibold text-ink hover:text-brand-green bg-surface-warm hover:bg-brand-green-soft/40 border border-brand-green-muted hover:border-brand-green rounded-xl ${BUTTON_TRANSITION_CLASS} cursor-pointer`}
                >
                  <MessageCircle className="w-4 h-4 text-brand-green shrink-0" />
                  <span>WhatsApp con estos datos</span>
                </motion.a>

                <motion.a
                  href={emailHref}
                  whileHover={secondaryButtonHover}
                  whileTap={secondaryButtonTap}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-semibold text-ink hover:text-brand-green bg-surface-warm hover:bg-brand-green-soft/40 border border-brand-green-muted hover:border-brand-green rounded-xl ${BUTTON_TRANSITION_CLASS} cursor-pointer`}
                >
                  <Mail className="w-4 h-4 text-brand-green shrink-0" />
                  <span>Correo</span>
                </motion.a>
              </div>

              <p className="text-[11px] text-ink-muted leading-relaxed">
                Cálculo estimativo con factor 1,5 paletas por tonelada. La capacidad real depende del tipo de producto, rotación y ventana de despacho. Un ejecutivo DIVIPECA confirmará disponibilidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
