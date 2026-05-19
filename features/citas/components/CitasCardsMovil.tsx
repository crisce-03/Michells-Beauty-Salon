"use client";

import { Cita } from "../types/cita.types";
import { useRouter } from "next/navigation";

const ESTADOS = [
  { valor: "CONFIRMADA", label: "Confirmada", icon: "event_available", color: "text-primary bg-primary/20 border-primary/30" },
  { valor: "PENDIENTE",  label: "Pendiente",  icon: "schedule",        color: "text-yellow-500 bg-yellow-500/20 border-yellow-500/30" },
  { valor: "COMPLETADA", label: "Completada", icon: "check_circle",    color: "text-green-500 bg-green-500/20 border-green-500/30" },
  { valor: "CANCELADA",  label: "Cancelada",  icon: "cancel",          color: "text-red-500 bg-red-500/20 border-red-500/30" },
];

type Props = {
  cita: Cita; // 👈 una sola cita
  openDeleteDialog: (id: number, nombre: string) => void;
  abrirDropdown: (e: React.MouseEvent, citaId: number) => void;
};

export default function CitaCardMovil({ cita, openDeleteDialog, abrirDropdown }: Props) {
  const router = useRouter();
  const estado = ESTADOS.find((e) => e.valor === cita.estado) ?? ESTADOS[1]; // 👈 directo, sin función

  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium text-gray-900 dark:text-cream-label">
            {cita.personalData.nombre}
          </p>
          <p className="text-xs text-gray-500 dark:text-text-muted mt-0.5">
            {cita.fecha} · {cita.hora}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => router.push(`/reserve?editId=${cita.id}`)}
            className="p-1.5 rounded text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
          <button
            onClick={() => openDeleteDialog(cita.id, cita.personalData.nombre)}
            className="p-1.5 rounded text-gray-400 btn-delete-hover transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">delete</span>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {cita.services.map((servicio, index) => (
          <span
            key={`${servicio.id || "srv"}-${index}`}
            className="inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300"
          >
            {servicio.nombre}
          </span>
        ))}
      </div>

      <button
        onClick={(e) => abrirDropdown(e, cita.id)}
        className={`self-start inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold border transition-opacity hover:opacity-80 ${estado.color}`}
      >
        <span className="material-symbols-outlined text-[13px]">{estado.icon}</span>
        {estado.label}
        <span className="material-symbols-outlined text-[13px]">expand_more</span>
      </button>
    </div>
  );
}