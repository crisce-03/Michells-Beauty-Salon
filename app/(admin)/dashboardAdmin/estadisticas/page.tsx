"use client";

import React from "react";
import Link from "next/link";

export default function EstadisticasPage() {
  // Estilo para la cuadrícula de las gráficas
  const chartGridStyle = {
    backgroundImage: `
      linear-gradient(to right, rgba(242, 185, 13, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(242, 185, 13, 0.05) 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
  };

  // Datos simulados para los servicios top
  const topServices = [
    {
      name: "Balayage Premium",
      category: "Cabello",
      revenue: "$3,600",
      appointments: 30,
      growth: "+15%",
    },
    {
      name: "Manicure Gel + Decoración",
      category: "Uñas",
      revenue: "$1,250",
      appointments: 50,
      growth: "+5%",
    },
    {
      name: "Maquillaje para Eventos",
      category: "Maquillaje",
      revenue: "$825",
      appointments: 15,
      growth: "+22%",
    },
    {
      name: "Corte Caballero",
      category: "Barba",
      revenue: "$450",
      appointments: 30,
      growth: "-2%",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Encabezado e Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <nav className="flex text-sm text-gray-500 dark:text-text-muted mb-2">
            <Link
              href="/dashboardAdmin"
              className="hover:text-primary transition-colors"
            >
              Inicio
            </Link>
            <span className="mx-2 text-primary">/</span>
            <span className="text-gray-900 font-medium dark:text-primary">
              Estadísticas
            </span>
          </nav>
          <h2 className="text-3xl font-bold tracking-tight text-cream-label">
            Análisis y Estadísticas
          </h2>
          <p className="text-text-muted mt-1">
            Métricas detalladas de crecimiento para Michell's Beauty en Santa
            Ana.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-surface-input border border-border-dark text-cream-label text-sm rounded-lg px-4 py-2 outline-none cursor-pointer focus:border-primary focus:ring-1 focus:ring-primary transition-colors">
            <option>Últimos 30 días</option>
            <option>Este mes</option>
            <option>Mes anterior</option>
            <option>Este año</option>
          </select>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-luxury-black hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-[20px]">
              download
            </span>
            Reporte PDF
          </button>
        </div>
      </div>

      {/* Tarjetas KPI (Key Performance Indicators) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border-dark bg-surface-dark p-6">
          <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">
            Ingresos Brutos
          </p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-bold text-cream-label">$8,450</h3>
            <span className="text-sm font-bold text-green-500 mb-1">
              +12.5%
            </span>
          </div>
        </div>
        <div className="rounded-xl border border-border-dark bg-surface-dark p-6">
          <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">
            Ticket Promedio
          </p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-bold text-cream-label">$65.00</h3>
            <span className="text-sm font-bold text-green-500 mb-1">+4.2%</span>
          </div>
        </div>
        <div className="rounded-xl border border-border-dark bg-surface-dark p-6">
          <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">
            Citas Completadas
          </p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-bold text-cream-label">130</h3>
            <span className="text-sm font-bold text-green-500 mb-1">+8.0%</span>
          </div>
        </div>
        <div className="rounded-xl border border-border-dark bg-surface-dark p-6">
          <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">
            Cancelaciones
          </p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-bold text-cream-label">4</h3>
            <span className="text-sm font-bold text-[#ef4444] mb-1">-2.1%</span>
          </div>
        </div>
      </div>

      {/* Sección de Gráficas Detalladas */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Gráfica: Horas Pico (Mapa de calor simulado con barras) */}
        <div className="rounded-xl border border-border-dark bg-surface-dark overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border-dark">
            <h3 className="font-bold text-cream-label">
              Horas de Mayor Demanda
            </h3>
            <p className="text-xs text-text-muted mt-1">
              Tráfico de clientes durante el día
            </p>
          </div>
          <div
            className="flex-1 p-6 relative flex items-end justify-between gap-1 h-[250px]"
            style={chartGridStyle}
          >
            {/* Barras representando las horas del día de 8am a 6pm */}
            {[20, 45, 80, 60, 40, 50, 90, 100, 70, 30].map((height, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-2 group"
              >
                <div
                  className="w-full max-w-[24px] bg-primary/20 rounded-t-sm hover:bg-primary transition-all relative flex items-end justify-center"
                  style={{ height: `${height}%` }}
                >
                  {/* Etiqueta visible en hover */}
                  <span className="absolute -top-7 text-[10px] bg-luxury-black text-primary px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {height} citas
                  </span>
                  {/* Relleno interior para dar efecto visual */}
                  <div
                    className="w-full bg-primary/40 rounded-t-sm"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-text-muted">{8 + i}h</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gráfica: Nuevos vs Recurrentes */}
        <div className="rounded-xl border border-border-dark bg-surface-dark p-6 flex flex-col">
          <div className="mb-6">
            <h3 className="font-bold text-cream-label">
              Retención de Clientes
            </h3>
            <p className="text-xs text-text-muted mt-1">
              Nuevos vs. Recurrentes este mes
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-8">
            {/* Barra Recurrentes */}
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">
                    favorite
                  </span>
                  Clientes Recurrentes
                </span>
                <span className="text-cream-label">68%</span>
              </div>
              <div className="h-4 bg-luxury-black rounded-full overflow-hidden border border-border-dark relative">
                <div
                  className="absolute top-0 left-0 h-full bg-primary rounded-full"
                  style={{ width: "68%" }}
                ></div>
              </div>
              <p className="text-xs text-text-muted mt-2 text-right">
                88 clientes
              </p>
            </div>

            {/* Barra Nuevos */}
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-[#cbbc90] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">
                    fiber_new
                  </span>
                  Clientes Nuevos
                </span>
                <span className="text-cream-label">32%</span>
              </div>
              <div className="h-4 bg-luxury-black rounded-full overflow-hidden border border-border-dark relative">
                <div
                  className="absolute top-0 left-0 h-full bg-[#cbbc90] rounded-full"
                  style={{ width: "32%" }}
                ></div>
              </div>
              <p className="text-xs text-text-muted mt-2 text-right">
                42 clientes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla: Servicios de Mayor Rendimiento */}
      <div className="rounded-xl border border-border-dark bg-surface-dark overflow-hidden">
        <div className="p-6 border-b border-border-dark flex justify-between items-center">
          <div>
            <h3 className="font-bold text-cream-label">
              Servicios Top por Ingresos
            </h3>
            <p className="text-xs text-text-muted mt-1">
              Los tratamientos más rentables del mes.
            </p>
          </div>
          <button className="text-sm font-bold text-primary hover:text-primary-light transition-colors">
            Ver catálogo
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-input text-xs uppercase text-primary border-b border-border-dark">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Servicio</th>
                <th className="px-6 py-4 font-bold tracking-wider text-center">
                  Categoría
                </th>
                <th className="px-6 py-4 font-bold tracking-wider text-center">
                  Citas Totales
                </th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">
                  Ingresos
                </th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">
                  Crecimiento
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-dark">
              {topServices.map((service, index) => (
                <tr
                  key={index}
                  className="hover:bg-surface-input/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-cream-label flex items-center gap-2">
                      {index === 0 && (
                        <span className="material-symbols-outlined text-primary text-[18px]">
                          military_tech
                        </span>
                      )}
                      {service.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 uppercase tracking-widest">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-text-muted">
                    {service.appointments}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-cream-label">
                    {service.revenue}
                  </td>
                  <td
                    className={`px-6 py-4 text-right font-bold ${service.growth.startsWith("+") ? "text-green-500" : "text-[#ef4444]"}`}
                  >
                    {service.growth}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
