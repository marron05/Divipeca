import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Building, Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/divipecaData';
import { PremiumSelect } from './PremiumSelect';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSource?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialSource = 'General'
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    serviceType: '3PL Integral (Almacén + Distribución)',
    monthlyVolume: '50 - 150 Ton/Mes',
    targetStates: ['Guárico', 'Anzoátegui'],
    notes: ''
  });

  const availableStates = ['Guárico', 'Anzoátegui', 'Bolívar', 'Sucre'];

  const toggleState = (st: string) => {
    setFormData((prev) => ({
      ...prev,
      targetStates: prev.targetStates.includes(st)
        ? prev.targetStates.filter((s) => s !== st)
        : [...prev.targetStates, st]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.email || !formData.phone) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-brand-green-dark/70 backdrop-blur-sm"
      />

      {/* Modal Surface */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-white rounded-2xl shadow-2xl border border-brand-green-muted/80 w-full max-w-xl max-h-[90vh] overflow-y-auto z-10 p-6 sm:p-8"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-alt transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-brand-green-soft text-brand-green flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-ink mb-2">
              Solicitud de Capacidad Registrada
            </h3>
            <p className="text-sm text-ink-muted mb-6 max-w-md mx-auto leading-relaxed">
              Gracias, <strong>{formData.contactName || formData.companyName}</strong>. La Gerencia de Operaciones de DIVIPECA analizará las rutas solicitadas ({formData.targetStates.join(', ')}) y te contactará en menos de 24 horas hábiles.
            </p>

            <div className="bg-surface-warm p-4 rounded-lg border border-brand-green-muted/70 text-left text-xs text-ink-muted mb-6 space-y-1">
              <div><strong className="text-ink">Empresa:</strong> {formData.companyName}</div>
              <div><strong className="text-ink">Servicio:</strong> {formData.serviceType} ({formData.monthlyVolume})</div>
              <div><strong className="text-ink">Contacto:</strong> {formData.phone} · {formData.email}</div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-brand-green hover:bg-brand-green-hover rounded-lg transition-colors cursor-pointer"
            >
              Entendido
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-green block mb-1">
                Atención Corporativa & Alianzas 3PL
              </span>
              <h3 className="text-2xl font-bold text-ink">
                Solicitar Alianza o Cotización de Ruta
              </h3>
              <p className="text-xs text-ink-muted mt-1">
                Origen de solicitud: {initialSource}. Evaluamos capacidad de almacenamiento y fletes dedicados en los 4 estados.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-ink block mb-1">
                    Empresa / Razón Social *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Alimentos del Centro C.A."
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-green/35 focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink block mb-1">
                    Nombre del Contacto *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Carlos Mendoza (Gerente de Logística)"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-green/35 focus:border-brand-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-ink block mb-1">
                    Correo Electrónico Corporativo *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="logistica@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-green/35 focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink block mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+58 416-5480517"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-green/35 focus:border-brand-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-ink block mb-1">
                    Tipo de Operación
                  </label>
                  <PremiumSelect
                    size="sm"
                    value={formData.serviceType}
                    onChange={(val) => setFormData({ ...formData, serviceType: val })}
                    ariaLabel="Tipo de Operación"
                    options={[
                      '3PL Integral (Almacén + Distribución)',
                      'Distribución Exclusiva / Comercialización',
                      'Almacenamiento Seco Dedicado',
                      'Fletes Troncales & Cross-docking',
                    ]}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink block mb-1">
                    Volumen Mensual Estimado
                  </label>
                  <PremiumSelect
                    size="sm"
                    value={formData.monthlyVolume}
                    onChange={(val) => setFormData({ ...formData, monthlyVolume: val })}
                    ariaLabel="Volumen Mensual Estimado"
                    options={[
                      { value: '< 50 Ton/Mes', label: 'Menos de 50 Ton/Mes' },
                      { value: '50 - 150 Ton/Mes', label: '50 a 150 Ton/Mes' },
                      { value: '150 - 550 Ton/Mes', label: '150 a 550 Ton/Mes' },
                      { value: '+550 Ton/Mes', label: '+550 Ton/Mes (Escala Regional)' },
                    ]}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink block mb-1.5">
                  Estados Requeridos (Selecciona los que apliquen)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {availableStates.map((st) => {
                    const isSelected = formData.targetStates.includes(st);
                    return (
                      <button
                        type="button"
                        key={st}
                        onClick={() => toggleState(st)}
                        className={`text-xs py-1.5 px-3 rounded-lg border font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-brand-green text-white border-brand-green'
                            : 'bg-surface-warm text-ink-muted border-brand-green-muted/70 hover:bg-surface-alt hover:text-brand-green'
                        }`}
                      >
                        {st}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink block mb-1">
                  Requerimientos Específicos o Frecuencia Deseada
                </label>
                <textarea
                  rows={3}
                  placeholder="Indica tipo de producto, si requiere estibado especial o rutas preferenciales..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-green/35 focus:border-brand-green"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 text-xs font-semibold text-white bg-brand-green hover:bg-brand-green-hover rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Requerimiento Operativo</span>
                </button>
                <p className="text-[10px] text-center text-ink-muted mt-2">
                  Garantía de confidencialidad comercial · RIF {COMPANY_INFO.rif}
                </p>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
