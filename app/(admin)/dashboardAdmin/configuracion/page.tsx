"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ConfiguracionPage() {
  // Estado simple para simular el cambio de pestañas (Tabs)
  const [activeTab, setActiveTab] = useState('perfil');

  // Clases compartidas para los inputs
  const inputClasses = "w-full rounded-lg border border-border-dark bg-surface-input px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary text-cream-label transition-colors";
  const labelClasses = "text-xs font-bold text-primary uppercase tracking-wider mb-1.5 block";

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      
      {/* Encabezado e Info */}
      <div className="space-y-4">
        <nav className="flex text-sm text-gray-500 dark:text-text-muted">
          <Link href="/dashboardAdmin" className="hover:text-primary transition-colors">Inicio</Link>
          <span className="mx-2 text-primary">/</span>
          <span className="text-gray-900 font-medium dark:text-primary">Configuración</span>
        </nav>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-cream-label">Configuración del Sistema</h2>
          <p className="text-text-muted mt-1">Personaliza la experiencia de Michell's Beauty.</p>
        </div>
      </div>

      {/* Tabs / Pestañas de Navegación */}
      <div className="border-b border-border-dark">
        <nav aria-label="Tabs" className="-mb-px flex space-x-8 overflow-x-auto pb-1 custom-scrollbar">
          <button 
            onClick={() => setActiveTab('perfil')}
            className={`whitespace-nowrap py-4 px-1 text-sm font-bold transition-all flex items-center gap-2 border-b-2 ${activeTab === 'perfil' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-primary hover:border-primary/50'}`}
          >
            <span className="material-symbols-outlined text-[20px]">storefront</span>
            Perfil del Salón
          </button>
          <button 
            onClick={() => setActiveTab('notificaciones')}
            className={`whitespace-nowrap py-4 px-1 text-sm font-bold transition-all flex items-center gap-2 border-b-2 ${activeTab === 'notificaciones' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-primary hover:border-primary/50'}`}
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            Notificaciones
          </button>
          <button 
            onClick={() => setActiveTab('pagos')}
            className={`whitespace-nowrap py-4 px-1 text-sm font-bold transition-all flex items-center gap-2 border-b-2 ${activeTab === 'pagos' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-primary hover:border-primary/50'}`}
          >
            <span className="material-symbols-outlined text-[20px]">payments</span>
            Pagos (Stripe)
          </button>
          <button 
            onClick={() => setActiveTab('seguridad')}
            className={`whitespace-nowrap py-4 px-1 text-sm font-bold transition-all flex items-center gap-2 border-b-2 ${activeTab === 'seguridad' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-primary hover:border-primary/50'}`}
          >
            <span className="material-symbols-outlined text-[20px]">security</span>
            Seguridad
          </button>
        </nav>
      </div>

      {/* Contenido Principal (Perfil del Salón) */}
      {activeTab === 'perfil' && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Columna Izquierda: Identidad Visual */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-primary">Identidad Visual</h3>
              <p className="mt-1 text-sm text-text-muted">Actualiza el logo y la marca de tu salón en Santa Ana.</p>
            </div>
            
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border-dark bg-surface-input/30 p-8 text-center transition-all hover:bg-surface-input/60 group cursor-pointer">
              <div className="size-24 rounded-full bg-luxury-black border border-primary/30 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform overflow-hidden shadow-lg shadow-primary/5">
                <span className="material-symbols-outlined text-primary text-4xl">diamond</span>
              </div>
              <span className="text-sm font-bold text-primary group-hover:text-primary-light transition-colors">Subir nuevo logo</span>
              <p className="text-xs text-text-muted mt-2 italic">SVG, PNG o JPG (Máx. 2MB)</p>
            </div>
          </div>

          {/* Columna Derecha: Formularios */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border-dark bg-surface-dark p-6 shadow-sm space-y-8">
              
              {/* Sección: Información General */}
              <section className="space-y-6">
                <h4 className="text-xs font-bold text-cream-label uppercase tracking-widest border-b border-border-dark pb-2">Información General</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClasses}>Nombre del Salón</label>
                    <input className={inputClasses} type="text" defaultValue="Michell's Beauty" />
                  </div>
                  <div>
                    <label className={labelClasses}>Teléfono de Contacto</label>
                    <input className={inputClasses} type="text" defaultValue="+503 2440-XXXX" />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClasses}>Dirección en Santa Ana</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary/60 text-lg">location_on</span>
                      <input className={`${inputClasses} pl-10`} type="text" defaultValue="Av. Independencia Sur, No. 12, Santa Ana, El Salvador" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Sección: Redes Sociales */}
              <section className="space-y-6">
                <h4 className="text-xs font-bold text-cream-label uppercase tracking-widest border-b border-border-dark pb-2">Redes Sociales</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClasses}>Instagram</label>
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-3 py-2.5 rounded-l-lg border border-r-0 border-border-dark bg-luxury-black text-primary font-bold text-sm">@</span>
                      <input className={`${inputClasses} rounded-l-none`} type="text" defaultValue="michellsbeauty_sa" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClasses}>Facebook</label>
                    <input className={inputClasses} type="text" defaultValue="facebook.com/michellsbeautysv" />
                  </div>
                </div>
              </section>

              {/* Botones de Acción */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t border-border-dark">
                <button className="px-6 py-2.5 text-sm font-bold text-text-muted hover:text-cream-label transition-colors uppercase tracking-widest">
                  Descartar
                </button>
                <button className="rounded-lg bg-primary px-8 py-2.5 text-sm font-bold text-luxury-black shadow-lg shadow-primary/20 hover:opacity-90 transition-all uppercase tracking-widest">
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid Inferior: Tarjetas de Estado (Siempre visibles) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pt-4">
        
        {/* Tarjeta Pagos */}
        <div className="rounded-xl border border-border-dark bg-surface-dark p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <div>
              <p className="text-xs font-bold text-text-muted uppercase tracking-tight">Estado de Pagos</p>
              <p className="text-sm font-bold text-green-500 flex items-center gap-1.5 mt-0.5">
                <span className="size-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                Conectado a Stripe
              </p>
            </div>
          </div>
        </div>

        {/* Tarjeta Notificaciones */}
        <div className="rounded-xl border border-border-dark bg-surface-dark p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <span className="material-symbols-outlined">alternate_email</span>
            </div>
            <div>
              <p className="text-xs font-bold text-text-muted uppercase tracking-tight">Notificaciones</p>
              <p className="text-sm font-bold text-cream-label mt-0.5">Email & SMS Activos</p>
            </div>
          </div>
        </div>

        {/* Tarjeta Seguridad */}
        <div className="rounded-xl border border-border-dark bg-surface-dark p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <span className="material-symbols-outlined">verified_user</span>
            </div>
            <div>
              <p className="text-xs font-bold text-text-muted uppercase tracking-tight">Seguridad</p>
              <p className="text-sm font-bold text-cream-label mt-0.5">2FA Activado</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}