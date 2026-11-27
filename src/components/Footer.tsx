import React from 'react';
import { ShieldCheck, MessageCircle, Mail, Instagram } from 'lucide-react';
import { COMPANY_INFO, LOGISTICS_HUBS } from '../data/divipecaData';
import { DivipecaLogo } from './DivipecaLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-green-dark text-brand-green-muted py-12 sm:py-16 border-t-2 border-brand-green text-xs relative">
      {/* Subtle tricolor divider line */}
      <div className="grid grid-cols-3 h-[3px] w-full absolute top-0 left-0 right-0" aria-hidden="true">
        <span className="bg-brand-green" />
        <span className="bg-white/85" />
        <span className="bg-brand-red" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-white/15">
          {/* Brand Col */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3.5 text-white mb-4">
              <div className="rounded-lg bg-white px-2.5 py-1.5 shadow-sm inline-flex items-center justify-center shrink-0">
                <DivipecaLogo className="h-10 w-auto" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-white">
                  {COMPANY_INFO.name} · Operador Logístico 3PL
                </span>
                <span className="text-[11px] text-brand-green-muted font-medium">
                  {COMPANY_INFO.legalName}
                </span>
              </div>
            </div>

            <p className="text-brand-green-muted/90 leading-relaxed max-w-sm mb-4 text-xs">
              {COMPANY_INFO.legalName} · RIF: {COMPANY_INFO.rif}. Trayectoria ininterrumpida desde 1990 con 3.200 m², +1.200 paletas y 99,5% OTIF.
            </p>

            <div className="text-[11px] text-brand-green-muted space-y-1.5">
              <div>Sede Matriz: {COMPANY_INFO.addressMatrix}</div>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white hover:text-brand-green-soft font-semibold underline decoration-white/30 underline-offset-4 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-brand-green-muted" />
                  <span>WhatsApp: {COMPANY_INFO.whatsappDisplay}</span>
                </a>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="inline-flex items-center gap-1.5 text-white hover:text-brand-green-soft font-semibold underline decoration-white/30 underline-offset-4 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-brand-green-muted" />
                  <span>{COMPANY_INFO.email}</span>
                </a>
                <a
                  href={COMPANY_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram oficial ${COMPANY_INFO.instagramHandle}`}
                  className="inline-flex items-center gap-1.5 text-white hover:text-brand-green-soft font-semibold underline decoration-white/30 underline-offset-4 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-brand-green-muted" />
                  <span>Instagram: {COMPANY_INFO.instagramHandle}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Hubs Directory */}
          <div className="lg:col-span-4">
            <div className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Cobertura y Sedes (3.200 m²)
            </div>
            <div className="space-y-3">
              {LOGISTICS_HUBS.map((hub) => (
                <div key={hub.id} className="text-xs">
                  <div className="font-semibold text-white flex items-center justify-between">
                    <span>
                      {hub.city} ({hub.state})
                    </span>
                    <span className="font-mono text-brand-green-muted">{hub.zoneTag}</span>
                  </div>
                  <div className="text-[11px] text-brand-green-muted/80">{hub.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal & Governance */}
          <div className="lg:col-span-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Respaldo Operativo &amp; Sanidad
            </div>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-brand-green-muted">
                <ShieldCheck className="w-3.5 h-3.5 text-white shrink-0" />
                <span>Protocolos de sanidad y normas BPM</span>
              </li>
              <li className="flex items-center gap-2 text-brand-green-muted">
                <ShieldCheck className="w-3.5 h-3.5 text-white shrink-0" />
                <span>+1.200 paletas con trazabilidad por lote</span>
              </li>
              <li className="flex items-center gap-2 text-brand-green-muted">
                <ShieldCheck className="w-3.5 h-3.5 text-white shrink-0" />
                <span>Flota propia dedicada de 5T a 12T</span>
              </li>
            </ul>

            <div className="mt-5 pt-4 border-t border-white/15 text-[11px] text-brand-green-muted/85">
              Estados: Guárico · Anzoátegui · Sucre · Bolívar
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-brand-green-muted/85">
          <div>
            © 1990 — 2026 {COMPANY_INFO.legalName}. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>RIF: {COMPANY_INFO.rif}</span>
            <span>·</span>
            <span>Operador Logístico 3PL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
