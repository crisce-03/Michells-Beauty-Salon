"use client";

import HorariosGrid from "./components/HorariosGrid";
import HorariosHeader from "./components/HorariosHeader";
import WeekSelector from "./components/WeekSelector";

import { useHorarios } from "./hooks/useHorarios";
import { format } from "date-fns";

export default function HorariosPage() {

    const{
        semanaActual,
    horarios,
    cambiarSemana,
    guardarCambios,
    agregarTurnoLocal,
    eliminarTurnoLocal,
    cambiarHoraLocal,
    } = useHorarios();

  return (
    
    <div className="mx-auto max-w-7xl space-y-8">
        <HorariosHeader guardarCambios={guardarCambios} />
           <WeekSelector     
           cambiarSemana={cambiarSemana}
           semanaActual={semanaActual}
           />
        <HorariosGrid
        semanaActual={semanaActual}
        horarios={horarios}
        agregarTurnoLocal={agregarTurnoLocal}
        eliminarTurnoLocal={eliminarTurnoLocal}
        cambiarHoraLocal={cambiarHoraLocal}
        />
        </div>
  );
}