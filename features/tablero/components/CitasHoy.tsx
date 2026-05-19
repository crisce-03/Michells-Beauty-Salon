import Link from "next/link";
import { Cita } from "@/features/citas/types/cita.types";

const BADGE: Record<string, string> = {
  CONFIRMADA: "bg-primary/20 text-primary border-primary/30",
  PENDIENTE:  "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
  COMPLETADA: "bg-green-500/20 text-green-500 border-green-500/30",
  CANCELADA:  "bg-red-500/20 text-red-500 border-red-500/30",
};

const LABEL: Record<string, string> = {
  CONFIRMADA: "Confirmada",
  PENDIENTE:  "Pendiente",
  COMPLETADA: "Completada",
  CANCELADA:  "Cancelada",
};

export default function CitasHoy({ cita }: { cita: Cita }) {
  return (
    <div className="flex items-center gap-4 px-6 py-4 hover:bg-surface-input/50 transition-colors">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-cream-label truncate">
          {cita.personalData.nombre}
        </p>
        <p className="text-xs text-text-muted">
          {cita.services.map((s) => s.nombre).join(", ")}
        </p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs font-bold text-cream-label">{cita.hora}</p>
        <span className={`inline-flex mt-1 items-center rounded-full px-2 py-0.5 text-[10px] font-bold border ${BADGE[cita.estado] ?? ""}`}>
          {LABEL[cita.estado] ?? cita.estado}
        </span>
      </div>
    </div>
  );
}