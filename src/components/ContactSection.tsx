import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  Send,
  CheckCircle2,
  Building2,
  ClipboardCheck,
  Instagram,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/divipecaData';
import { ProjectedLeadData } from '../types';
import { PremiumSelect } from './PremiumSelect';
import {
  BUTTON_TRANSITION_CLASS,
  primaryButtonHover,
  primaryButtonTap,
  secondaryButtonHover,
  secondaryButtonTap,
} from '../utils/motion';

interface ContactSectionProps {
  selectedSource?: string;
  projectedLead?: ProjectedLeadData | null;
}

const MODALIDADES = [
  'Cotización de operación 3PL',
  'Distribución exclusiva / regional',
  'Almacenamiento seco en paletas',
  'Visita técnica y auditoría de sede',
];

const SEDE_O_ESTADO_OPTIONS = [
  'Consolidado (3 Sedes · 4 estados)',
  'Barcelona (1.200 m² · Anzoátegui y Sucre)',
  'Ciudad Bolívar (1.100 m² · Bolívar)',
  'Valle de la Pascua (900 m² · Guárico)',
  'Estado Guárico',
  'Estado Anzoátegui',
  'Estado Sucre',
  'Estado Bolívar',
];

function mapSedeIdToOption(sedeId: string): string {
  if (sedeId === 'barcelona-plc') return 'Barcelona (1.200 m² · Anzoátegui y Sucre)';
  if (sedeId === 'ciudad-bolivar') return 'Ciudad Bolívar (1.100 m² · Bolívar)';
  if (sedeId === 'valle-pascua') return 'Valle de la Pascua (900 m² · Guárico)';
  return 'Consolidado (3 Sedes · 4 estados)';
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  selectedSource = 'General',
  projectedLead = null,
}) => {
  const [modalidad, setModalidad] = useState<string>(MODALIDADES[0]);
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [sedeInteres, setSedeInteres] = useState<string>(SEDE_O_ESTADO_OPTIONS[0]);
  const [volumenPaletas, setVolumenPaletas] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Sync incoming projection from Proyector Mensual
  useEffect(() => {
    if (!projectedLead) return;
    setSubmitted(false);
    setModalidad('Cotización de operación 3PL');
    setSedeInteres(mapSedeIdToOption(projectedLead.sedeId));
    setVolumenPaletas(
      `${projectedLead.toneladasMes} Ton/Mes · ${projectedLead.paletasDisplay} paletas est. (${projectedLead.ocupacionDisplay})`
    );
    setMessage(
      `Proyección desde Proyector Mensual: ${projectedLead.toneladasMes} Ton/Mes (${projectedLead.paletasDisplay} paletas estimadas) en ${projectedLead.sedeLabel}. Frecuencia sugerida: ${projectedLead.frecuenciaRecomendada}.`
    );
  }, [projectedLead]);

  useEffect(() => {
    if (selectedSource && selectedSource !== 'General') {
      setSubmitted(false);
    }
  }, [selectedSource]);

  const directWhatsappUrl = COMPANY_INFO.whatsappUrl;

  const directMailtoUrl = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
    `${modalidad} — DIVIPECA`
  )}`;

  const filledSummaryText = [
    `Hola DIVIPECA, envío solicitud ejecutiva:`,
    `• Modalidad: ${modalidad}`,
    `• Empresa: ${company}`,
    `• Nombre y cargo: ${name}`,
    `• Teléfono / WhatsApp: ${phone}`,
    `• Correo corporativo: ${email}`,
    `• Sede o estado de interés: ${sedeInteres}`,
    volumenPaletas.trim() ? `• Volumen / paletas estimadas: ${volumenPaletas.trim()}` : null,
    selectedSource && selectedSource !== 'General' ? `• Origen: ${selectedSource}` : null,
    message.trim() ? `• Requerimientos / fecha: ${message.trim()}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const submittedWhatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    filledSummaryText
  )}`;

  const submittedMailtoUrl = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
    `${modalidad} — ${company || name}`
  )}&body=${encodeURIComponent(filledSummaryText)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !name.trim() || !phone.trim() || !email.trim() || !sedeInteres.trim()) {
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setModalidad(MODALIDADES[0]);
    setCompany('');
    setName('');
    setPhone('');
    setEmail('');
    setSedeInteres(SEDE_O_ESTADO_OPTIONS[0]);
    setVolumenPaletas('');
    setMessage('');
  };

  return (
    <section
      id="contacto"
      className="relative py-20 sm:py-24 bg-surface-alt border-t border-brand-green-muted/70 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand-green mb-2.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
            <span>06. Contacto Ejecutivo · Capacidad 3PL</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-ink mb-3 text-balance">
            Contacto Ejecutivo
          </h2>

          <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-normal">
            Cuéntenos su requerimiento de almacenamiento en paletas, operación 3PL o distribución regional en Guárico, Anzoátegui, Sucre y Bolívar.
          </p>
        </div>

        {/* 2-Column Executive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT COLUMN: Brand Dark Green Corporate Panel */}
          <div className="lg:col-span-5 rounded-2xl bg-brand-green-dark text-white border border-brand-green p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              {/* Corporate Header */}
              <div className="pb-5 mb-6 border-b border-white/15">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-green-muted mb-1.5 flex items-center gap-2">
                  <span className="inline-flex h-2 w-3.5 rounded-xs overflow-hidden shrink-0" aria-hidden="true">
                    <span className="w-1/3 h-full bg-brand-green-hover" />
                    <span className="w-1/3 h-full bg-white" />
                    <span className="w-1/3 h-full bg-brand-red" />
                  </span>
                  <span>DIVIPECA · Desde 1990</span>
                </div>
                <h3 className="text-xl font-extrabold tracking-tight text-white mb-2">
                  {COMPANY_INFO.legalName}
                </h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-brand-green-soft">
                  <span>RIF: {COMPANY_INFO.rif}</span>
                  <span aria-hidden="true" className="text-white/30">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-brand-green-muted" />
                    {COMPANY_INFO.website}
                  </span>
                </div>
              </div>

              {/* Operational Details */}
              <div className="space-y-4 mb-7">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 text-brand-green-muted flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-brand-green-muted">
                      Horario operativo
                    </div>
                    <div className="text-sm font-semibold text-white mt-0.5">
                      {COMPANY_INFO.operatingHours}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 text-brand-green-muted flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-brand-green-muted">
                      Cobertura regional
                    </div>
                    <div className="text-sm font-semibold text-white mt-0.5">
                      {COMPANY_INFO.coverageStatesText}
                    </div>
                    <div className="text-xs text-brand-green-muted/90 mt-0.5">
                      3 centros propios · 3.200 m² · +1.200 paletas
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 text-brand-green-muted flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-brand-green-muted">
                      WhatsApp comercial
                    </div>
                    <a
                      href={directWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold font-mono text-white hover:text-brand-green-soft underline decoration-white/35 underline-offset-4 transition-colors mt-0.5 inline-block"
                    >
                      {COMPANY_INFO.whatsappDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 text-brand-green-muted flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-brand-green-muted">
                      Correo corporativo
                    </div>
                    <a
                      href={directMailtoUrl}
                      className="text-sm font-semibold text-white hover:text-brand-green-soft underline decoration-white/35 underline-offset-4 transition-colors mt-0.5 inline-block"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 text-brand-green-muted flex items-center justify-center shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-brand-green-muted">
                      Instagram oficial
                    </div>
                    <a
                      href={COMPANY_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-white hover:text-brand-green-soft underline decoration-white/35 underline-offset-4 transition-colors mt-0.5 inline-block"
                    >
                      {COMPANY_INFO.instagramHandle}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Visits & Audits Block + Direct Buttons */}
            <div className="space-y-4">
              <div className="rounded-xl bg-black/20 border border-white/15 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-green-soft mb-1.5">
                  <ClipboardCheck className="w-4 h-4 shrink-0 text-brand-green-muted" />
                  <span>Visitas técnicas y auditorías</span>
                </div>
                <p className="text-xs text-brand-green-muted/95 leading-relaxed">
                  Recibimos gerentes de logística, calidad y compras en nuestras sedes propias de{' '}
                  <strong className="text-white">Barcelona (1.200 m²)</strong>,{' '}
                  <strong className="text-white">Ciudad Bolívar (1.100 m²)</strong> y{' '}
                  <strong className="text-white">Valle de la Pascua (900 m²)</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <motion.a
                  href={directWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={primaryButtonHover}
                  whileTap={primaryButtonTap}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-white bg-brand-green hover:bg-brand-green-hover border border-white/15 rounded-xl ${BUTTON_TRANSITION_CLASS} cursor-pointer`}
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>WhatsApp directo</span>
                </motion.a>

                <motion.a
                  href={directMailtoUrl}
                  whileHover={secondaryButtonHover}
                  whileTap={secondaryButtonTap}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-white hover:text-brand-green-soft bg-white/10 hover:bg-white/15 border border-white/20 hover:border-brand-green-muted rounded-xl ${BUTTON_TRANSITION_CLASS} cursor-pointer`}
                >
                  <Mail className="w-4 h-4 text-brand-green-muted shrink-0" />
                  <span>Enviar correo</span>
                </motion.a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Executive B2B Form */}
          <div className="lg:col-span-7 rounded-2xl border border-brand-green-muted/90 bg-white p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="py-6 sm:py-8">
                <div className="w-12 h-12 rounded-full bg-brand-green-soft text-brand-green flex items-center justify-center mb-4 border border-brand-green-muted">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-ink mb-2">
                  Solicitud ejecutiva lista para enviar
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed mb-5 max-w-xl">
                  Gracias, <strong className="text-ink">{name}</strong> ({company}). Su solicitud de{' '}
                  <strong className="text-ink">{modalidad}</strong> para{' '}
                  <strong className="text-ink">{sedeInteres}</strong> está preparada para atención directa por WhatsApp o correo:
                </p>

                <div className="bg-surface-alt border border-brand-green-muted rounded-xl p-4 text-xs text-ink space-y-1.5 mb-6">
                  <div><strong>Modalidad:</strong> {modalidad}</div>
                  <div><strong>Empresa:</strong> {company}</div>
                  <div><strong>Nombre y cargo:</strong> {name}</div>
                  <div><strong>Teléfono / WhatsApp:</strong> {phone}</div>
                  <div><strong>Correo corporativo:</strong> {email}</div>
                  <div><strong>Sede o estado de interés:</strong> {sedeInteres}</div>
                  {volumenPaletas.trim() && (
                    <div><strong>Volumen / paletas estimadas:</strong> {volumenPaletas.trim()}</div>
                  )}
                  {message.trim() && <div><strong>Requerimientos / fecha:</strong> {message.trim()}</div>}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <motion.a
                    href={submittedWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={primaryButtonHover}
                    whileTap={primaryButtonTap}
                    className={`inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-brand-green hover:bg-brand-green-hover rounded-lg ${BUTTON_TRANSITION_CLASS} cursor-pointer`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enviar ahora por WhatsApp</span>
                  </motion.a>

                  <motion.a
                    href={submittedMailtoUrl}
                    whileHover={secondaryButtonHover}
                    whileTap={secondaryButtonTap}
                    className={`inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-ink hover:text-brand-green bg-surface-warm hover:bg-brand-green-soft/40 border border-brand-green-muted hover:border-brand-green rounded-lg ${BUTTON_TRANSITION_CLASS} cursor-pointer`}
                  >
                    <Mail className="w-4 h-4 text-brand-green" />
                    <span>Abrir en correo</span>
                  </motion.a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs font-semibold text-ink-muted hover:text-ink px-3 py-2 cursor-pointer"
                  >
                    Nueva consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-brand-green-muted/60">
                  <div>
                    <h3 className="text-lg font-bold text-ink">
                      Formulario de evaluación logística 3PL
                    </h3>
                    <p className="text-xs text-ink-muted mt-0.5">
                      Complete los campos para validar disponibilidad de paletas, frecuencias o visitas técnicas.
                    </p>
                  </div>
                  {selectedSource && selectedSource !== 'General' && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-green bg-brand-green-soft border border-brand-green-muted px-2.5 py-1 rounded-md">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Origen: {selectedSource}</span>
                    </span>
                  )}
                </div>

                {/* Modalidad + Sede o estado de interés */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-modalidad" className="text-xs font-semibold text-ink block mb-1.5">
                      Modalidad de solicitud *
                    </label>
                    <PremiumSelect
                      id="contact-modalidad"
                      value={modalidad}
                      onChange={setModalidad}
                      options={MODALIDADES}
                      ariaLabel="Modalidad de solicitud"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-sede" className="text-xs font-semibold text-ink block mb-1.5">
                      Sede o estado de interés *
                    </label>
                    <PremiumSelect
                      id="contact-sede"
                      value={sedeInteres}
                      onChange={setSedeInteres}
                      options={SEDE_O_ESTADO_OPTIONS}
                      ariaLabel="Sede o estado de interés"
                    />
                  </div>
                </div>

                {/* Empresa + Nombre y cargo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-company" className="text-xs font-semibold text-ink block mb-1.5">
                      Empresa *
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      required
                      placeholder="Ej. Alimentos del Centro C.A."
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white text-ink placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-[box-shadow,border-color] duration-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-name" className="text-xs font-semibold text-ink block mb-1.5">
                      Nombre y cargo *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Ej. Carlos Mendoza — Gerente de Logística"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white text-ink placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-[box-shadow,border-color] duration-200"
                    />
                  </div>
                </div>

                {/* Teléfono + Correo corporativo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="text-xs font-semibold text-ink block mb-1.5">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="+58 416-5480517"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white text-ink placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-[box-shadow,border-color] duration-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="text-xs font-semibold text-ink block mb-1.5">
                      Correo corporativo *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="gerencia@empresa.com.ve"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white text-ink placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-[box-shadow,border-color] duration-200"
                    />
                  </div>
                </div>

                {/* Volumen / paletas estimadas */}
                <div>
                  <label htmlFor="contact-volume" className="text-xs font-semibold text-ink block mb-1.5">
                    Volumen / paletas estimadas
                  </label>
                  <input
                    id="contact-volume"
                    type="text"
                    placeholder="Ej. 120 Ton/Mes · 180 paletas estimadas"
                    value={volumenPaletas}
                    onChange={(e) => setVolumenPaletas(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white text-ink placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-[box-shadow,border-color] duration-200"
                  />
                </div>

                {/* Requerimientos operativos o fecha sugerida */}
                <div>
                  <label htmlFor="contact-message" className="text-xs font-semibold text-ink block mb-1.5">
                    Requerimientos operativos o fecha sugerida
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    placeholder="Indíquenos tipo de producto, frecuencia deseada, normas sanitarias o fecha sugerida para reunión/visita técnica..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white text-ink placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-[box-shadow,border-color] duration-200 resize-y"
                  />
                </div>

                <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-[11px] text-ink-muted">
                    Confidencialidad comercial garantizada · RIF {COMPANY_INFO.rif}
                  </span>

                  <motion.button
                    type="submit"
                    whileHover={primaryButtonHover}
                    whileTap={primaryButtonTap}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-brand-green hover:bg-brand-green-hover rounded-lg ${BUTTON_TRANSITION_CLASS} cursor-pointer shadow-xs`}
                  >
                    <Send className="w-4 h-4" />
                    <span>Solicitar Evaluación Logística</span>
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
