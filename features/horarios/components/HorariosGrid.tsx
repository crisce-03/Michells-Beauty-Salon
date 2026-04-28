import { es } from "date-fns/locale";
import { format, addDays } from "date-fns";
import { WorkingDay } from "@/features/horarios/types/horarios.types";
import HorarioCard from "./HorarioCard";

type Props = {
  horarios: WorkingDay[];
  semanaActual: Date;

 agregarTurnoLocal: (dia: number) => void;
  eliminarTurnoLocal: (dia: number, hora: number) => void;
  cambiarHoraLocal: (dia: number, hora: number, value: string) => void;
};

export default function HorariosGrid({horarios, semanaActual, agregarTurnoLocal, eliminarTurnoLocal, cambiarHoraLocal}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {horarios.map((day, indexDia) => {
        // Lógica para sacar la fecha de CADA tarjeta sumando días a la semana actual
        const fechaDelDia = addDays(semanaActual, indexDia);
        const numeroDia = format(fechaDelDia, "d");
        const nombreMes = format(fechaDelDia, "MMM", { locale: es });

        return (
          <HorarioCard key={indexDia} day={day} indexDia={indexDia} numeroDia={numeroDia} nombreMes={nombreMes} semanaActual={semanaActual} agregarTurnoLocal={agregarTurnoLocal} eliminarTurnoLocal={eliminarTurnoLocal} cambiarHoraLocal={cambiarHoraLocal} />
        );  
      })}
    </div>
  );
}
