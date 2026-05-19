import { WorkingDay } from "@/features/horarios/types/horarios.types";
import { format, addDays } from "date-fns";

type Props = {
  day: WorkingDay;
  indexDia: number;
  numeroDia: string;
  nombreMes: string;
  semanaActual: Date;
  horariosBD: any[]; // 👈 AGREGAMOS ESTO

  agregarTurnoLocal: (dia: number) => void;
  eliminarTurnoLocal: (dia: number, hora: number) => void;
  cambiarHoraLocal: (dia: number, hora: number, value: string) => void;
  toggleDiaLocal: (dia: number) => void;
};

export default function HorarioCard({
  day,
  indexDia,
  numeroDia,
  nombreMes,
  semanaActual,
  horariosBD,
  agregarTurnoLocal,
  eliminarTurnoLocal,
  cambiarHoraLocal,
  toggleDiaLocal,
}: Props) {
  // 1. Calculamos la fecha de ESTE día en formato yyyy-MM-dd
  const fechaDelDia = addDays(semanaActual, indexDia);
  const fechaStr = format(fechaDelDia, "yyyy-MM-dd");

  return (
    <div
      key={day.id}
      className={`rounded-xl border p-5 transition-all flex flex-col h-full ${
        day.isActive
          ? "border-border-dark bg-surface-dark shadow-sm"
          : "border-border-dark/50 bg-luxury-black/30 opacity-75"
      }`}
    >
      {/* Header de la Tarjeta */}
      <div className="flex items-center justify-between mb-4 border-b border-border-dark/50 pb-3">
        <h4
          className={`font-bold text-lg flex items-center gap-2 ${day.isActive ? "text-primary" : "text-gray-500"}`}
        >
          {day.name}
          <span className="text-xs font-normal bg-black/20 px-2 py-0.5 rounded-full border border-white/5 uppercase tracking-wider text-text-muted">
            {numeroDia} {nombreMes}
          </span>
        </h4>

        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={day.isActive}
            onChange={() => toggleDiaLocal(indexDia)}
          />
          <div className="peer h-6 w-11 rounded-full bg-surface-input border border-border-dark after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
        </label>
      </div>

      {/* Cuerpo de la Tarjeta */}
      {day.isActive ? (
        <div className="space-y-4 flex flex-col flex-1">
          <div className="flex flex-wrap gap-3">
            {day.timeSlots.map((time, indexHora) => {
              const turnoBD = horariosBD.find((r) => {

                const fechaHoraBD = r.fecha_hora
                  .substring(0, 16)
                  .replace("T", " ");

                const horaFormateada = time.length === 4 ? `0${time}` : time;
                const fechaHoraLocal = `${fechaStr} ${horaFormateada}`;

                return fechaHoraBD === fechaHoraLocal;
              });

              const isOcupado = turnoBD?.estado === "Ocupado";

              return (
                <div
                  key={`${day.id}-${time}-${indexHora}`}
                  className={`flex items-center rounded-lg bg-surface-input border transition-colors
                    ${isOcupado ? "border-red-500/30 bg-red-500/5" : "border-border-dark focus-within:border-primary/50"}`}
                >
                  <input
                    type="time"
                    value={time}
                    disabled={isOcupado} // 👈 Deshabilitamos si está ocupado
                    onChange={(e) =>
                      cambiarHoraLocal(indexDia, indexHora, e.target.value)
                    }
                    className={`bg-transparent text-sm py-1.5 pl-3 outline-none w-[90px] 
                      ${isOcupado ? "line-through text-red-400/70 cursor-not-allowed" : "text-cream-label"}`}
                  />
                  <button
                    disabled={isOcupado} // 👈 Evita que el admin lo borre si ya tiene reserva
                    onClick={() => eliminarTurnoLocal(indexDia, indexHora)}
                    className={`px-2 py-1.5 flex items-center justify-center border-l border-border-dark transition-colors
                      ${isOcupado ? "text-gray-700 cursor-not-allowed" : "text-gray-500 hover:text-red-500 hover:bg-red-500/10"}`}
                    title={
                      isOcupado
                        ? "No se puede eliminar un turno ocupado"
                        : "Eliminar horario"
                    }
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      close
                    </span>
                  </button>
                </div>
              );
            })}
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
