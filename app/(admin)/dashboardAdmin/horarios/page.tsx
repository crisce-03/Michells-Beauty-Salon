"use client";

import React from 'react';
import Link from 'next/link';

// --- TIPOS (TypeScript) ---
interface WorkingDay {
  id: string;
  name: string;
  isActive: boolean;
  openTime: string;
  closeTime: string;
  breakStart: string;
  breakEnd: string;
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

// --- DATOS DE EJEMPLO ---
const scheduleData: WorkingDay[] = [
  { id: 'mon', name: 'Lunes', isActive: true, openTime: '08:00', closeTime: '18:00', breakStart: '12:00', breakEnd: '13:00' },
  { id: 'tue', name: 'Martes', isActive: true, openTime: '08:00', closeTime: '18:00', breakStart: '12:00', breakEnd: '13:00' },
  { id: 'wed', name: 'Miércoles', isActive: true, openTime: '08:00', closeTime: '18:00', breakStart: '12:00', breakEnd: '13:00' },
  { id: 'thu', name: 'Jueves', isActive: true, openTime: '08:00', closeTime: '18:00', breakStart: '12:00', breakEnd: '13:00' },
  { id: 'fri', name: 'Viernes', isActive: true, openTime: '08:00', closeTime: '19:00', breakStart: '12:00', breakEnd: '13:00' },
  { id: 'sat', name: 'Sábado', isActive: true, openTime: '09:00', closeTime: '17:00', breakStart: '13:00', breakEnd: '13:30' },
  { id: 'sun', name: 'Domingo', isActive: false, openTime: '00:00', closeTime: '00:00', breakStart: '00:00', breakEnd: '00:00' },
];

const staffData: StaffMember[] = [
  { id: 1, name: 'Sofia Martínez', role: 'Especialista en Balayage', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhySm1jnM4RlYfVdv2u0Q7D8-yVJHLpbQk5UcrE4UQNUbzBI1qsOpw-tkpx1LNchJiFgVS15I3xbO6twgxCJyavfU5Gzf0jU24xG6aNrNM-AU9yHGwULllxSTvXSg2UTjsZ05XJbj-bIHWkDwxPcikOetoWJyMcABs4GJauu6-iqNLmuK_v3sSmwEuB21MxCLmUQQUa0BBGVFdmMER-k6Xi_5T2-U2DzKlgECYYCg-PxfmeuBt0-edzZES3jk0NamsIBeQCDeYNEk' },
  { id: 2, name: 'Ana Rivas', role: 'Técnica de Uñas', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7k51UL5lT7d8EC493kLNqw39EqK7-iOEY9bdMArYp0UJ9wKMoUeXfOTPFNsBILlGw8W4dAj9xiv5hmjRrHWoryjZxNVldft9-dnLoDi7Zomf5l6vDVqcqa6b_VMwlDIws3dQFg9D2p5Jrv8lEET7kQQA_NKjpLozX1Ij8k0pseMvSrF2hHjKapLEsE19Z4WByPXxfgx58M6oNHdiG5B_JveXi53Ga0ID-m8QGhqnDZ8W71IzKZbraFOKjrEalFzaBVUf3vrUmptk' },
];

const holidayData: Holiday[] = [
  { id: 1, name: 'Día de los Difuntos', dateStr: '2 de Noviembre, 2026', status: 'Cerrado' },
  { id: 2, name: 'Navidad', dateStr: '25 de Diciembre, 2026', status: 'Cerrado' },
];

export default function HorariosPage() {
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

      <div className="grid grid-cols-1 gap-6">
        
        {/* Tabla de Configuración Semanal */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden dark:bg-surface-dark dark:border-border-dark">
          <div className="p-6 border-b border-gray-200 dark:border-border-dark bg-gray-50/50 dark:bg-luxury-black/40">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-primary flex items-center gap-2">
                <span className="material-symbols-outlined">event_available</span>
                Configuración Semanal de Apertura
              </h3>
              <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full border border-green-500/20">Activo</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-luxury-black text-xs uppercase tracking-wider text-gray-500 dark:text-primary border-b dark:border-border-dark">
                <tr>
                  <th className="px-6 py-4 font-bold" scope="col">Día</th>
                  <th className="px-6 py-4 font-bold" scope="col">Estado</th>
                  <th className="px-6 py-4 font-bold" scope="col">Horario de Apertura</th>
                  <th className="px-6 py-4 font-bold" scope="col">Horario de Cierre</th>
                  <th className="px-6 py-4 font-bold" scope="col">Descanso (Inicio)</th>
                  <th className="px-6 py-4 font-bold" scope="col">Descanso (Fin)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-border-dark bg-white dark:bg-surface-dark">
                {scheduleData.map((day) => (
                  <tr key={day.id} className={`hover:bg-gray-50 dark:hover:bg-surface-input/50 transition-colors ${!day.isActive ? 'opacity-60' : ''}`}>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-cream-label">{day.name}</td>
                    <td className="px-6 py-4">
                      {/* Custom Toggle Switch */}
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" className="sr-only peer" defaultChecked={day.isActive} />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-luxury-black dark:border-gray-700"></div>
                      </label>
                    </td>
                    <td className="px-6 py-4">
                      <input 
                        type="time" 
                        defaultValue={day.openTime} 
                        disabled={!day.isActive}
                        className={`w-32 rounded-lg py-1.5 px-3 text-sm outline-none border focus:ring-1 focus:ring-primary ${
                          day.isActive 
                            ? 'border-gray-200 bg-white dark:bg-surface-input dark:border-primary/40 dark:text-primary' 
                            : 'border-gray-200 bg-gray-100 dark:bg-luxury-black/50 dark:border-border-dark dark:text-text-muted'
                        }`} 
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input 
                        type="time" 
                        defaultValue={day.closeTime} 
                        disabled={!day.isActive}
                        className={`w-32 rounded-lg py-1.5 px-3 text-sm outline-none border focus:ring-1 focus:ring-primary ${
                          day.isActive 
                            ? 'border-gray-200 bg-white dark:bg-surface-input dark:border-primary/40 dark:text-primary' 
                            : 'border-gray-200 bg-gray-100 dark:bg-luxury-black/50 dark:border-border-dark dark:text-text-muted'
                        }`} 
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input 
                        type="time" 
                        defaultValue={day.breakStart} 
                        disabled={!day.isActive}
                        className={`w-32 rounded-lg py-1.5 px-3 text-sm outline-none border focus:ring-1 focus:ring-primary ${
                          day.isActive 
                            ? 'border-gray-200 bg-white dark:bg-surface-input dark:border-primary/40 dark:text-text-muted' 
                            : 'border-gray-200 bg-gray-100 dark:bg-luxury-black/50 dark:border-border-dark dark:text-text-muted'
                        }`} 
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input 
                        type="time" 
                        defaultValue={day.breakEnd} 
                        disabled={!day.isActive}
                        className={`w-32 rounded-lg py-1.5 px-3 text-sm outline-none border focus:ring-1 focus:ring-primary ${
                          day.isActive 
                            ? 'border-gray-200 bg-white dark:bg-surface-input dark:border-primary/40 dark:text-text-muted' 
                            : 'border-gray-200 bg-gray-100 dark:bg-luxury-black/50 dark:border-border-dark dark:text-text-muted'
                        }`} 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Grid: Personal y Festivos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Disponibilidad del Personal */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:bg-surface-dark dark:border-border-dark">
            <div className="flex items-center gap-4 mb-6">
              <div className="rounded-lg bg-primary/10 p-3 text-primary">
                <span className="material-symbols-outlined">person_pin_circle</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-cream-label">Disponibilidad del Personal</h4>
                <p className="text-sm text-gray-500 dark:text-text-muted">Asigne horarios específicos por empleado.</p>
              </div>
            </div>
            <div className="space-y-4">
              {staffData.map((staff) => (
                <div key={staff.id} className="flex items-center justify-between p-3 rounded-lg border border-border-dark bg-surface-input/50">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('${staff.avatar}')` }}></div>
                    <div>
                      <p className="text-sm font-semibold dark:text-primary">{staff.name}</p>
                      <p className="text-xs text-text-muted">{staff.role}</p>
                    </div>
                  </div>
                  <button className="text-primary hover:text-primary-light text-sm font-bold uppercase tracking-widest transition-colors">Editar</button>
                </div>
              ))}
            </div>
          </div>

          {/* Días Festivos / Cierres */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:bg-surface-dark dark:border-border-dark">
            <div className="flex items-center gap-4 mb-6">
              <div className="rounded-lg bg-primary/10 p-3 text-primary">
                <span className="material-symbols-outlined">event_busy</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-cream-label">Días Festivos / Cierres</h4>
                <p className="text-sm text-gray-500 dark:text-text-muted">Gestione fechas donde el salón estará cerrado.</p>
              </div>
            </div>
            <div className="space-y-3">
              {holidayData.map((holiday) => (
                <div key={holiday.id} className="flex items-center justify-between py-2 border-b border-border-dark">
                  <div>
                    <p className="text-sm font-medium dark:text-cream-label">{holiday.name}</p>
                    <p className="text-xs text-text-muted">{holiday.dateStr}</p>
                  </div>
                  <span className="text-xs font-bold text-[#ef4444]/80">{holiday.status}</span>
                </div>
              ))}
              
              <button className="w-full mt-4 flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border-dark py-3 text-sm font-bold text-primary hover:bg-surface-input transition-all">
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                Agregar Fecha de Cierre
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}