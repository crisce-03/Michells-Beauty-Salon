"use client";

import React from 'react';
import Link from 'next/link';

export default function DashboardAdminPage() {
  // Estilo en línea para la cuadrícula de fondo de la gráfica
  const chartGridStyle = {
    backgroundImage: `
      linear-gradient(to right, rgba(242, 185, 13, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(242, 185, 13, 0.05) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      
      {/* Encabezado e Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-cream-label">Tablero Principal</h2>
          <p className="text-text-muted mt-1">Vista general del rendimiento de Michell's Beauty.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-border-dark bg-luxury-black px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-colors">
            <span className="material-symbols-outlined text-[20px]">file_download</span>
            Exportar Informe
          </button>
        </div>
      </div>

      {/* Tarjetas de Estadísticas Top */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {/* Tarjeta 1 */}
        <div className="rounded-xl border border-border-dark bg-surface-dark p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <span className="material-symbols-outlined">event_available</span>
            </div>
            <div>
              <p className="text-sm font-medium text-text-muted">Citas de Hoy</p>
              <p className="text-2xl font-bold text-cream-label">24</p>
            </div>
            <div className="ml-auto flex items-baseline text-sm font-semibold text-green-400">
              <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
              +12%
            </div>
          </div>
        </div>

        {/* Tarjeta 2 */}
        <div className="rounded-xl border border-border-dark bg-surface-dark p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <span className="material-symbols-outlined">person_add</span>
            </div>
            <div>
              <p className="text-sm font-medium text-text-muted">Clientes Nuevos</p>
              <p className="text-2xl font-bold text-cream-label">156</p>
            </div>
            <div className="ml-auto flex items-baseline text-sm font-semibold text-green-400">
              <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
              +8%
            </div>
          </div>
        </div>

        {/* Tarjeta 3 */}
        <div className="rounded-xl border border-border-dark bg-surface-dark p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <span className="material-symbols-outlined">loyalty</span>
            </div>
            <div>
              <p className="text-sm font-medium text-text-muted">Tasa de Retención</p>
              <p className="text-2xl font-bold text-cream-label">82%</p>
            </div>
            <div className="ml-auto flex items-baseline text-sm font-semibold text-primary">
              <span className="material-symbols-outlined text-sm mr-1">star</span>
              Alta
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Gráficas */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Gráfica de Barras (Ingresos) */}
        <div className="lg:col-span-2 rounded-xl border border-border-dark bg-surface-dark overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border-dark flex justify-between items-center">
            <h3 className="font-bold text-cream-label">Ingresos Mensuales</h3>
            <select className="bg-surface-input border border-border-dark text-primary text-xs rounded-lg px-2 py-1 outline-none cursor-pointer">
              <option>2023</option>
              <option>2024</option>
            </select>
          </div>
          <div className="flex-1 p-6 relative flex items-end justify-between gap-2 h-[300px]" style={chartGridStyle}>
            <div className="flex flex-1 items-end justify-between h-full pt-10 px-4 group">
              <div className="w-1.5 bg-primary/40 rounded-t-full h-[40%] hover:bg-primary transition-all relative">
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] text-primary opacity-0 group-hover:opacity-100">$2.4k</span>
              </div>
              <div className="w-1.5 bg-primary/40 rounded-t-full h-[55%] hover:bg-primary transition-all relative">
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] text-primary opacity-0 group-hover:opacity-100">$3.1k</span>
              </div>
              <div className="w-1.5 bg-primary/40 rounded-t-full h-[45%] hover:bg-primary transition-all relative">
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] text-primary opacity-0 group-hover:opacity-100">$2.8k</span>
              </div>
              <div className="w-1.5 bg-primary/40 rounded-t-full h-[70%] hover:bg-primary transition-all relative">
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] text-primary opacity-0 group-hover:opacity-100">$4.2k</span>
              </div>
              <div className="w-1.5 bg-primary/40 rounded-t-full h-[60%] hover:bg-primary transition-all relative">
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] text-primary opacity-0 group-hover:opacity-100">$3.8k</span>
              </div>
              <div className="w-1.5 bg-primary/40 rounded-t-full h-[85%] hover:bg-primary transition-all relative">
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] text-primary opacity-0 group-hover:opacity-100">$5.1k</span>
              </div>
              <div className="w-1.5 bg-primary h-[95%] rounded-t-full relative">
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] text-primary">$5.8k</span>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-luxury-black/40 flex justify-between text-[10px] text-text-muted uppercase tracking-widest font-bold">
            <span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span><span>May</span><span>Jun</span><span>Jul</span>
          </div>
        </div>

        {/* Gráfica de Dona (Servicios) - CORREGIDA */}
        <div className="rounded-xl border border-border-dark bg-surface-dark p-6 flex flex-col">
          <div className="mb-6">
            <h3 className="font-bold text-cream-label">Distribución de Servicios</h3>
            <p className="text-xs text-text-muted">Servicios más solicitados este mes</p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-8">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="none" r="40" stroke="rgba(242, 185, 13, 0.1)" strokeWidth="12" />
                <circle cx="50" cy="50" fill="none" r="40" stroke="#f2b90d" strokeDasharray="125.6 125.6" strokeDashoffset="0" strokeWidth="12" />
                <circle cx="50" cy="50" fill="none" r="40" stroke="#cbbc90" strokeDasharray="62.8 188.4" strokeDashoffset="-125.6" strokeWidth="12" />
                <circle cx="50" cy="50" fill="none" r="40" stroke="#8A6D19" strokeDasharray="62.8 188.4" strokeDashoffset="-188.4" strokeWidth="12" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-cream-label">420</span>
                <span className="text-[10px] text-text-muted uppercase tracking-tighter">Total</span>
              </div>
            </div>
            
            <div className="w-full space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-xs text-cream-label">Cabello</span>
                </div>
                <span className="text-xs font-bold text-primary">50%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#cbbc90]"></div>
                  <span className="text-xs text-cream-label">Uñas</span>
                </div>
                <span className="text-xs font-bold text-primary">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#8A6D19]"></div>
                  <span className="text-xs text-cream-label">Maquillaje</span>
                </div>
                <span className="text-xs font-bold text-primary">25%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Citas (Rendimiento por Estilista eliminado) */}
      <div className="grid grid-cols-1 gap-6">
        
        {/* Próximas Citas */}
        <div className="rounded-xl border border-border-dark bg-surface-dark p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-cream-label">Próximas Citas Destacadas</h3>
            <Link href="/dashboardAdmin/citas" className="text-xs text-primary hover:underline">Ver todas</Link>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg bg-surface-input border border-border-dark">
              <div className="w-10 h-10 rounded-full bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAhySm1jnM4RlYfVdv2u0Q7D8-yVJHLpbQk5UcrE4UQNUbzBI1qsOpw-tkpx1LNchJiFgVS15I3xbO6twgxCJyavfU5Gzf0jU24xG6aNrNM-AU9yHGwULllxSTvXSg2UTjsZ05XJbj-bIHWkDwxPcikOetoWJyMcABs4GJauu6-iqNLmuK_v3sSmwEuB21MxCLmUQQUa0BBGVFdmMER-k6Xi_5T2-U2DzKlgECYYCg-PxfmeuBt0-edzZES3jk0NamsIBeQCDeYNEk')" }}></div>
              <div className="flex-1">
                <p className="text-sm font-bold text-cream-label">Maria Lopez</p>
                <p className="text-xs text-text-muted">Balayage • 10:00 AM</p>
              </div>
              <span className="px-2 py-1 bg-primary text-luxury-black text-[10px] font-bold rounded">HOY</span>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-surface-input border border-border-dark">
              <div className="w-10 h-10 rounded-full bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB7k51UL5lT7d8EC493kLNqw39EqK7-iOEY9bdMArYp0UJ9wKMoUeXfOTPFNsBILlGw8W4dAj9xiv5hmjRrHWoryjZxNVldft9-dnLoDi7Zomf5l6vDVqcqa6b_VMwlDIws3dQFg9D2p5Jrv8lEET7kQQA_NKjpLozX1Ij8k0pseMvSrF2hHjKapLEsE19Z4WByPXxfgx58M6oNHdiG5B_JveXi53Ga0ID-m8QGhqnDZ8W71IzKZbraFOKjrEalFzaBVUf3vrUmptk')" }}></div>
              <div className="flex-1">
                <p className="text-sm font-bold text-cream-label">Elena Rodriguez</p>
                <p className="text-xs text-text-muted">Manicure Gel • 02:30 PM</p>
              </div>
              <span className="px-2 py-1 bg-transparent text-primary border border-primary text-[10px] font-bold rounded">PENDIENTE</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}