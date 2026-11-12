import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO, LOGISTICS_HUBS } from '../data/divipecaData';
import { DivipecaLogo } from './DivipecaLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 py-12 sm:py-16 border-t border-neutral-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-neutral-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 text-white mb-3">
              <div className="w-10 h-10 rounded-full p-0.5 bg-white shadow-sm flex items-center justify-center shrink-0">
                <DivipecaLogo className="w-full h-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white">
                  {COMPANY_INFO.name}
                </span>
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-medium">
                  {COMPANY_INFO.legalName}
                </span>
              </div>
            </div>

            <p className="text-neutral-400 leading-relaxed max-w-sm mb-4 text-xs">
              {COMPANY_INFO.legalName} · RIF: {COMPANY_INFO.rif}. Operador logístico 3PL integral y distribución exclusiva con más de 40 años conectando el oriente y centro-sur del país.
            </p>

            <div className="text-[11px] text-neutral-500 space-y-1">
              <div>Sede Matriz: {COMPANY_INFO.addressMatrix}</div>
              <div>Teléfono: {COMPANY_INFO.phone} · {COMPANY_INFO.email}</div>
            </div>
          </div>

          {/* Hubs Directory */}
          <div className="lg:col-span-4">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-200 mb-3">
              Red de Infraestructura
            </div>
            <div className="space-y-3">
              {LOGISTICS_HUBS.map((hub) => (
                <div key={hub.id} className="text-xs">
                  <div className="font-semibold text-neutral-300 flex items-center justify-between">
                    <span>{hub.city} ({hub.state})</span>
                    <span className="font-mono text-emerald-400">{hub.area}</span>
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    {hub.role}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal & Governance */}
          <div className="lg:col-span-3">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-200 mb-3">
              Gobernanza & Cumplimiento
            </div>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Normas de Buenas Prácticas de Manufactura (BPM)</span>
              </li>
              <li className="flex items-center gap-2 text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Control de Trazabilidad e Inocuidad FMCG</span>
              </li>
              <li className="flex items-center gap-2 text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Pólizas de Carga y Custodia Continua</span>
              </li>
            </ul>

            <div className="mt-5 pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-500">
              Cobertura regional: Anzoátegui · Bolívar · Guárico · Sucre
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © 1982 — 2026 {COMPANY_INFO.legalName}. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>RIF: {COMPANY_INFO.rif}</span>
            <span>·</span>
            <span>Diseño Corporate Premium 2026</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
