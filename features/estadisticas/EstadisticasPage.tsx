"use client";

import Link from "next/link";
import EstadisticasStats from "@/features/estadisticas/components/EstadisticasStast";
import ServiciosPorIngreso from "@/features/estadisticas/components/ServiciosPorIngreso";
import { useEstadisticas } from "@/features/estadisticas/hook/useEstadisticas";




export default function EstadisticasPage() {
  const {
    ingresos,
    ticketPromedio,
    citasCompletadas,
    citasCanceladas,
    servicios,
  } = useEstadisticas();
  
  const chartGridStyle = {
    backgroundImage: `
      linear-gradient(to right, rgba(242, 185, 13, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(242, 185, 13, 0.05) 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
  };

  
  return (
    // Estilo para la cuadrícula de las gráficas

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
      <EstadisticasStats
        ingresos={ingresos}
        ticketPromedio={ticketPromedio}
        citasCompletadas={citasCompletadas}
        citasCanceladas={citasCanceladas}
      />

      {/* Tabla de Servicios Top */}
      <ServiciosPorIngreso servicios={servicios} />
    </div>
  );
}
