import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Building2,
  ArrowUpRight,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/divipecaData';
import { fadeUp, staggerContainer, buttonHover, buttonTap } from '../utils/motion';

interface ContactSectionProps {
  selectedSource?: string;
}

type OperationType = '3PL' | 'Distribución';

export const ContactSection: React.FC<ContactSectionProps> = ({ selectedSource = 'General' }) => {
  const [operationType, setOperationType] = useState<OperationType>('3PL');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedSource && selectedSource !== 'General') {
      setSubmitted(false);
    }
  }, [selectedSource]);

  const directWhatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Hola DIVIPECA, nos interesa conversar sobre una operación de ${operationType}.${
      selectedSource && selectedSource !== 'General' ? ` (Consulta desde: ${selectedSource})` : ''
    }`
  )}`;

  const directMailtoUrl = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
    `Solicitud de operación ${operationType} — DIVIPECA`
  )}`;

  const filledSummaryText = [
    `Hola DIVIPECA, solicito información sobre operación ${operationType}.`,
    `• Nombre: ${name}`,
    `• Empresa: ${company}`,
    `• Teléfono / WhatsApp: ${phone}`,
    selectedSource && selectedSource !== 'General' ? `• Referencia: ${selectedSource}` : null,
    message.trim() ? `• Mensaje: ${message.trim()}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const submittedWhatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    filledSummaryText
  )}`;

  const submittedMailtoUrl = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
    `Solicitud ${operationType} — ${company || name}`
  )}&body=${encodeURIComponent(filledSummaryText)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !company.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setCompany('');
    setPhone('');
    setMessage('');
  };

  return (
    <section
      id="contacto"
      className="relative py-20 sm:py-24 bg-neutral-50 border-t border-neutral-200/80 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-2xl mb-12"
        >
          <motion.div
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-wider text-[#1B5E20] mb-2.5 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E20]" />
            <span>Contacto Comercial y Operaciones</span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 mb-3 text-balance"
          >
            Hablemos de su operación
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal"
          >
            Cuéntenos su necesidad de 3PL o distribución. Respondemos con una propuesta clara.
          </motion.p>
        </motion.div>

        {/* 2-Column Conversion Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Column: Direct Channels + Corporate Contact Info */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-5 space-y-6"
          >
            {/* Direct Fast Action Card */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-7 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                Atención directa
              </div>
              <h3 className="text-lg font-bold text-neutral-950 mb-2">
                Canales inmediatos de respuesta
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-5">
                Comuníquese directamente con nuestro equipo comercial y de operaciones para validar capacidad en almacén o frecuencias de ruta.
              </p>

              <div className="space-y-3">
                <motion.a
                  href={directWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  className="w-full inline-flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-white bg-[#1B5E20] hover:bg-[#2E7D32] rounded-xl transition-colors shadow-xs hover:shadow-md hover:shadow-emerald-950/15"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>Escribir por WhatsApp</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 shrink-0 opacity-85" />
                </motion.a>

                <motion.a
                  href={directMailtoUrl}
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  className="w-full inline-flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-neutral-800 hover:text-neutral-950 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 hover:border-neutral-300 rounded-xl transition-colors"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#1B5E20] shrink-0" />
                    <span>Enviar correo corporativo</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 shrink-0" />
                </motion.a>
              </div>
            </div>

            {/* Visible Contact Information */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 text-[#1B5E20] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Teléfono / WhatsApp
                  </div>
                  <div className="text-sm font-semibold text-neutral-900 mt-0.5">
                    {COMPANY_INFO.phone}
                  </div>
                  <div className="text-xs text-neutral-500">
                    WhatsApp Comercial: {COMPANY_INFO.whatsappDisplay}
                  </div>
                </div>
              </div>

              <div className="h-px bg-neutral-100" />

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 text-[#1B5E20] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Correo electrónico
                  </div>
                  <a
                    href={directMailtoUrl}
                    className="text-sm font-semibold text-neutral-900 hover:text-[#1B5E20] transition-colors mt-0.5 inline-block"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="h-px bg-neutral-100" />

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 text-[#1B5E20] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Cobertura regional
                  </div>
                  <div className="text-sm font-semibold text-neutral-900 mt-0.5">
                    Guárico · Anzoátegui · Bolívar · Sucre
                  </div>
                  <div className="text-xs text-neutral-500 mt-0.5">
                    Sede Matriz: Valle de la Pascua, Edo. Guárico
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Minimal B2B Form */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-7 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs"
          >
            {submitted ? (
              <div className="py-6 sm:py-8">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#1B5E20] flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-neutral-950 mb-2">
                  Solicitud lista para enviar
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-5 max-w-xl">
                  Gracias, <strong className="text-neutral-900">{name}</strong> ({company}). Registramos su solicitud de{' '}
                  <strong className="text-neutral-900">{operationType}</strong>. Si desea atención inmediata, envíe este resumen directo por WhatsApp o correo:
                </p>

                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-xs text-neutral-700 space-y-1.5 mb-6">
                  <div><strong>Nombre:</strong> {name}</div>
                  <div><strong>Empresa:</strong> {company}</div>
                  <div><strong>Teléfono / WhatsApp:</strong> {phone}</div>
                  <div><strong>Tipo de operación:</strong> {operationType}</div>
                  {message.trim() && <div><strong>Mensaje:</strong> {message.trim()}</div>}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={submittedWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#1B5E20] hover:bg-[#2E7D32] rounded-lg transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enviar ahora por WhatsApp</span>
                  </a>

                  <a
                    href={submittedMailtoUrl}
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#1B5E20]" />
                    <span>Abrir en correo</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs font-semibold text-neutral-500 hover:text-neutral-800 px-3 py-2 cursor-pointer"
                  >
                    Nueva consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-neutral-100">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-950">
                      Solicitud rápida de propuesta
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Complete los datos clave y le contactaremos con disponibilidad y esquema de ruta.
                    </p>
                  </div>
                  {selectedSource && selectedSource !== 'General' && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#1B5E20] bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-md">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Origen: {selectedSource}</span>
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="text-xs font-semibold text-neutral-700 block mb-1.5">
                      Nombre *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Ej. Carlos Mendoza"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/30 focus:border-[#1B5E20] transition-shadow"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-company" className="text-xs font-semibold text-neutral-700 block mb-1.5">
                      Empresa *
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      required
                      placeholder="Ej. Alimentos del Centro C.A."
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/30 focus:border-[#1B5E20] transition-shadow"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="text-xs font-semibold text-neutral-700 block mb-1.5">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="+58 414 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/30 focus:border-[#1B5E20] transition-shadow"
                    />
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-neutral-700 block mb-1.5">
                      Tipo de servicio
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {(['3PL', 'Distribución'] as const).map((type) => {
                        const active = operationType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setOperationType(type)}
                            className={`py-2.5 px-3 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                              active
                                ? 'bg-[#1B5E20] text-white border-[#1B5E20] shadow-2xs'
                                : 'bg-neutral-50 text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="text-xs font-semibold text-neutral-700 block mb-1.5">
                    Mensaje
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    placeholder="Indíquenos volumen estimado, estados de destino (Guárico, Anzoátegui, Bolívar, Sucre) o requerimiento de almacén..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/30 focus:border-[#1B5E20] transition-shadow resize-y"
                  />
                </div>

                <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-[11px] text-neutral-500">
                    Confidencialidad comercial garantizada · {COMPANY_INFO.rif}
                  </span>

                  <motion.button
                    type="submit"
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#1B5E20] hover:bg-[#2E7D32] rounded-lg transition-colors shadow-xs hover:shadow-md hover:shadow-emerald-950/15 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar solicitud</span>
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
