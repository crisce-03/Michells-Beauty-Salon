"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { startOfWeek, addWeeks, format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';

// --- TIPOS (TypeScript) ---
interface WorkingDay {
  id: string;
  name: string;
  isActive: boolean;
  timeSlots: string[]; 
}

interface StaffMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

interface Holiday {
  id: number;
  name: string;
  dateStr: string;
  status: string;
}

// --- DATOS DE EJEMPLO (Mock UI) ---
const scheduleData: WorkingDay[] = [
  { id: 'mon', name: 'Lunes', isActive: true, timeSlots: ['08:00', '10:00', '14:00'] },
  { id: 'tue', name: 'Martes', isActive: true, timeSlots: ['09:00', '11:30', '15:00', '17:00'] },
  { id: 'wed', name: 'Miércoles', isActive: true, timeSlots: ['08:00', '12:00'] },
  { id: 'thu', name: 'Jueves', isActive: true, timeSlots: ['10:00', '14:00', '16:00', '18:00'] },
  { id: 'fri', name: 'Viernes', isActive: true, timeSlots: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'] }, 
  { id: 'sat', name: 'Sábado', isActive: true, timeSlots: ['09:00', '13:00'] },
  { id: 'sun', name: 'Domingo', isActive: false, timeSlots: [] }, 
];

const staffData: StaffMember[] = [
  { id: 1, name: 'Sofia Martínez', role: 'Especialista en Balayage', avatar: 'https://i.pravatar.cc/150?img=47' },
  { id: 2, name: 'Ana Rivas', role: 'Técnica de Uñas', avatar: 'https://i.pravatar.cc/150?img=32' },
];

const holidayData: Holiday[] = [
  { id: 1, name: 'Día de los Difuntos', dateStr: '2 de Noviembre, 2026', status: 'Cerrado' },
  { id: 2, name: 'Navidad', dateStr: '25 de Diciembre, 2026', status: 'Cerrado' },
];

export default function HorariosPage() {
  // --- ESTADO PARA CONTROLAR LA SEMANA ---
  // Iniciamos siempre en el Lunes de la semana actual
  const [semanaActual, setSemanaActual] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  // Función para navegar entre semanas
  const cambiarSemana = (direccion: 'siguiente' | 'anterior') => {
    if (direccion === 'siguiente') {
      setSemanaActual(prev => addWeeks(prev, 1));
    } else {
      setSemanaActual(prev => addWeeks(prev, -1));
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      
      {/* Encabezado e Info */}
      <div className="space-y-4">
        <nav className="flex text-sm text-gray-500 dark:text-text-muted">
          <Link href="/dashboardAdmin" className="hover:text-primary transition-colors">Configuración</Link>
          <span className="mx-2 text-primary">/</span>
          <span className="text-gray-900 font-medium dark:text-primary">Gestión de Horarios</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-cream-label">Horarios Disponibles</h2>
            <p className="text-gray-500 dark:text-text-muted mt-1">Defina los turnos de apertura, cierre y descansos semanales.</p>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center justify-center rounded-lg border border-primary px-5 py-2.5 text-sm font-bold text-primary hover:bg-primary/10 transition-all gap-2">
              <span className="material-symbols-outlined text-[20px]">history</span>
              Ver Historial
            </button>
            <button className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-luxury-black shadow-lg shadow-primary/20 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all gap-2">
              <span className="material-symbols-outlined text-[20px]">save</span>
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>

      {/* SECCIÓN NUEVA: Cuadrícula de Tarjetas de Días */}
      <div className="space-y-4">
        
        {/* Cabecera con Filtro de Semanas */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-dark pb-4 gap-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-cream-label flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">calendar_month</span>
            Bloques de Horarios por Día
          </h3>
          
          {/* SELECTOR DE SEMANAS */}
          <div className="flex items-center gap-4 bg-surface-input p-1.5 rounded-lg border border-border-dark w-fit">
            <button 
              onClick={() => cambiarSemana('anterior')}
              className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-primary"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            
            <div className="font-bold text-cream-label min-w-[160px] text-center text-sm capitalize">
              Semana del {format(semanaActual, "d MMM, yyyy", { locale: es })}
            </div>

            <button 
              onClick={() => cambiarSemana('siguiente')}
              className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-primary"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Grid Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scheduleData.map((day, index) => {
            // Lógica para sacar la fecha de CADA tarjeta sumando días a la semana actual
            const fechaDelDia = addDays(semanaActual, index);
            const numeroDia = format(fechaDelDia, "d"); 
            const nombreMes = format(fechaDelDia, "MMM", { locale: es }); 

            return (
              <div 
                key={day.id} 
                className={`rounded-xl border p-5 transition-all flex flex-col h-full ${
                  day.isActive 
                    ? 'border-border-dark bg-surface-dark shadow-sm' 
                    : 'border-border-dark/50 bg-luxury-black/30 opacity-75'
                }`}
              >
                {/* Header de la Tarjeta (Día + Fecha + Switch) */}
                <div className="flex items-center justify-between mb-4 border-b border-border-dark/50 pb-3">
                  <h4 className={`font-bold text-lg flex items-center gap-2 ${day.isActive ? 'text-primary' : 'text-gray-500'}`}>
                    {day.name}
                    {/* Badge con la fecha exacta (Ej: 12 oct) */}
                    <span className="text-xs font-normal bg-black/20 px-2 py-0.5 rounded-full border border-white/5 uppercase tracking-wider text-text-muted">
                      {numeroDia} {nombreMes}
                    </span>
                  </h4>
                  
                  {/* Custom Toggle Switch */}
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="sr-only peer" defaultChecked={day.isActive} />
                    <div className="peer h-6 w-11 rounded-full bg-surface-input border border-border-dark after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>

                {/* Cuerpo de la Tarjeta */}
                {day.isActive ? (
                  <div className="space-y-4 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-3">
                      
                      {day.timeSlots.map((time, index) => (
                        <div key={index} className="flex items-center rounded-lg bg-surface-input border border-border-dark focus-within:border-primary/50 overflow-hidden transition-colors">
                          <input 
                            type="time" 
                            defaultValue={time}
                            className="bg-transparent text-cream-label text-sm py-1.5 pl-3 outline-none w-[90px]"
                          />
                          <button 
                            className="px-2 py-1.5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-colors flex items-center justify-center border-l border-border-dark"
                            title="Eliminar horario"
                          >
                            <span className="material-symbols-outlined text-[16px]">close</span>
                          </button>
                        </div>
                      ))}

                    </div>

                    <button className="w-full mt-auto py-2 flex items-center justify-center gap-2 rounded-lg border border-dashed border-primary/40 text-sm font-semibold text-primary hover:bg-primary/10 transition-all">
                      <span className="material-symbols-outlined text-[18px]">add</span>
                      Agregar turno
                    </button>
                  </div>
                ) : (
                  <div className="py-8 flex flex-col items-center justify-center text-center flex-1">
                    <span className="material-symbols-outlined text-4xl text-gray-600 mb-2">hotel</span>
                    <p className="text-sm font-medium text-gray-500">Cerrado por descanso</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}