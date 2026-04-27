import {WorkingDay }  from "@/features/horarios/types/horarios.types";
import { format, addDays, isSameDay } from "date-fns";

type Props = {
  day: WorkingDay;
  indexDia: number;
  numeroDia: string;
  nombreMes: string;
  semanaActual: Date;

  agregarTurnoLocal: (dia: number) => void;
  eliminarTurnoLocal: (dia: number, hora: number) => void;
  cambiarHoraLocal: (dia: number, hora: number, value: string) => void;
};

export default function HorarioCard({ day, indexDia, numeroDia, nombreMes, semanaActual, agregarTurnoLocal, eliminarTurnoLocal, cambiarHoraLocal }: Props) {
  return (
    <div
      key={day.id}
      className={`rounded-xl border p-5 transition-all flex flex-col h-full ${
        day.isActive
          ? "border-border-dark bg-surface-dark shadow-sm"
          : "border-border-dark/50 bg-luxury-black/30 opacity-75"
      }`}
    >
      {/* Header de la Tarjeta (Día + Fecha + Switch) */}
      <div className="flex items-center justify-between mb-4 border-b border-border-dark/50 pb-3">
        <h4
          className={`font-bold text-lg flex items-center gap-2 ${day.isActive ? "text-primary" : "text-gray-500"}`}
        >
          {day.name}
          {/* Badge con la fecha exacta (Ej: 12 oct) */}
          <span className="text-xs font-normal bg-black/20 px-2 py-0.5 rounded-full border border-white/5 uppercase tracking-wider text-text-muted">
            {numeroDia} {nombreMes}
          </span>
        </h4>

        {/* Custom Toggle Switch */}
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            className="sr-only peer"
            defaultChecked={day.isActive}
          />
          <div className="peer h-6 w-11 rounded-full bg-surface-input border border-border-dark after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
        </label>
      </div>

      {/* Cuerpo de la Tarjeta */}
      {day.isActive ? (
        <div className="space-y-4 flex flex-col flex-1">
          <div className="flex flex-wrap gap-3">
            {day.timeSlots.map((time, indexHora) => (
              <div
                key={`${day.id}-${time}-${indexHora}`}
                className="flex items-center rounded-lg bg-surface-input border border-border-dark focus-within:border-primary/50  transition-colors"
              >
                <input
                  type="time"
                  value={time}
                  onChange={(e) =>
                    cambiarHoraLocal(indexDia, indexHora, e.target.value)
                  }
                  className="bg-transparent text-cream-label text-sm py-1.5 pl-3 outline-none w-[90px]"
                />
                <button
                  onClick={() => eliminarTurnoLocal(indexDia, indexHora)}
                  className="px-2 py-1.5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-colors flex items-center justify-center border-l border-border-dark"
                  title="Eliminar horario"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    close
                  </span>
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => agregarTurnoLocal(indexDia)}
            className="w-full mt-auto py-2 flex items-center justify-center gap-2 rounded-lg border border-dashed border-primary/40 text-sm font-semibold text-primary hover:bg-primary/10 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Agregar turno
          </button>
        </div>
      ) : (
        <div className="py-8 flex flex-col items-center justify-center text-center flex-1">
          <span className="material-symbols-outlined text-4xl text-gray-600 mb-2">
            hotel
          </span>
          <p className="text-sm font-medium text-gray-500">
            Cerrado por descanso
          </p>
        </div>
      )}
    </div>
  );
}
