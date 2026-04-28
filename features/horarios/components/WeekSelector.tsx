import { format, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { SemanaDireccion } from "@/features/horarios/types/horarios.types";

type Props = {
  cambiarSemana: (direccion: SemanaDireccion) => void;
  semanaActual: Date;
};

export default function WeekSelector({ cambiarSemana, semanaActual }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-dark pb-4 gap-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-cream-label flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">
          calendar_month
        </span>
        Bloques de Horarios por Día
      </h3>
      <div className="flex items-center gap-4 bg-surface-input p-1.5 rounded-lg border border-border-dark w-fit">
        <button
          onClick={() => cambiarSemana("anterior")}
          className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-primary"
        >
          <span className="material-symbols-outlined text-[20px]">
            chevron_left
          </span>
        </button>

        <div className="font-bold text-cream-label min-w-[160px] text-center text-sm capitalize">
          Semana del {format(semanaActual, "d MMM, yyyy", { locale: es })}
        </div>

        <button
          onClick={() => cambiarSemana("siguiente")}
          className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-primary"
        >
          <span className="material-symbols-outlined text-[20px]">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
}
