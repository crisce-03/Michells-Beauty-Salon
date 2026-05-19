"use client";

import Link from "next/link";

import TableroStats from "./components/TableroStats";
import EstadoCitas from "./components/EstadoCitas";
import CitasHoy from "./components/CitasHoy";
import { Cita } from "@/features/citas/types/cita.types";

import { useTablero } from "@/features/tablero/hook/useTablero";

export default function TableroPage() {
  const { citasHoyFiltradas, horariosDisponibles, serviciosActivos } =
    useTablero();
  const chartGridStyle = {
    backgroundImage: `
      linear-gradient(to right, rgba(242, 185, 13, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(242, 185, 13, 0.05) 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
  };
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Encabezado e Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-cream-label">
            Tablero Principal
          </h2>
          <p className="text-text-muted mt-1">
            Vista general del rendimiento de Michell's Beauty.
          </p>
        </div>
      </div>

      {/* Tarjetas de Estadísticas Top */}
      <TableroStats
        citasHoy={citasHoyFiltradas.length}
        horariosDisponibles={horariosDisponibles}
        serviciosActivos={serviciosActivos}
      />

      {/* Sección de Gráficas */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Citas de Hoy */}
        {citasHoyFiltradas.length === 0 ? (
  <div className="lg:col-span-2 rounded-xl border border-border-dark bg-surface-dark p-6 flex flex-col items-center justify-center gap-3 text-center h-48">
    <span className="material-symbols-outlined text-[40px] text-text-muted">event_busy</span>
    <p className="text-sm font-medium text-text-muted">No hay citas para hoy</p>
  </div>
) : (
  <div className="lg:col-span-2 rounded-xl border border-border-dark bg-surface-dark overflow-hidden flex flex-col">
    <div className="p-6 border-b border-border-dark flex justify-between items-center">
      <div>
        <h3 className="font-bold text-cream-label">Citas de Hoy</h3>
        <p className="text-xs text-text-muted mt-0.5">
          {citasHoyFiltradas.length} citas programadas
        </p>
      </div>
      <Link href="/dashboardAdmin/citas" className="text-xs text-primary hover:underline">
        Ver todas
      </Link>
    </div>
    <div className="divide-y divide-border-dark overflow-y-auto max-h-[340px]">
      {citasHoyFiltradas.map((cita) => (
        <CitasHoy key={cita.id} cita={cita} />
      ))}
    </div>
  </div>
)}

        <EstadoCitas citas={citasHoyFiltradas} />
      </div>
    </div>
  );
}
