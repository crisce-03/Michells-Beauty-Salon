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

    <div className="mx-auto max-w-7xl space-y-8 py-16 md:pt-8 xl:pt-0">
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
