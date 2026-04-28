import { useEffect, useState, useCallback } from "react";
import { startOfWeek, addWeeks, format, addDays } from "date-fns";
import { toast } from "sonner";
import { WorkingDay } from "@/features/horarios/types/horarios.types";
import { SemanaDireccion } from "@/features/horarios/types/horarios.types";
import { getHorarios, createHorarios } from "../services/horariosService";

export function useHorarios() {
  // ================= STATE =================
  const [semanaActual, setSemanaActual] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  );

  const [horariosBD, setHorariosBD] = useState<any[]>([]);
  const [horarios, setHorarios] = useState<WorkingDay[]>([]);

  // ================= WEEK NAVIGATION =================
  const cambiarSemana = (dir: SemanaDireccion) => {
    setSemanaActual((prev) =>
      dir === "siguiente" ? addWeeks(prev, 1) : addWeeks(prev, -1),
    );
  };

  // ================= FETCH =================
  const fetchHorarios = useCallback(async () => {
    try {
      const data = await getHorarios();
      setHorariosBD(data);
    } catch (err: any) {
      toast.error("Error al cargar horarios", {
        description: err.message,
      });
    }
  }, []);

  // ================= SAVE =================
  const guardarCambios = async () => {
    try {
      const payload: any[] = [];

      horarios.forEach((dia, index) => {
        if (!dia.isActive) return;

        const fecha = addDays(semanaActual, index);
        const fechaStr = format(fecha, "yyyy-MM-dd");

        dia.timeSlots.forEach((hora) => {
          payload.push({
            fecha_hora: `${fechaStr} ${hora}`,
            estado: "Activo",
          });
        });
      });

      const inicioSemana = format(semanaActual, "yyyy-MM-dd");
      const finSemana = format(addDays(semanaActual, 6), "yyyy-MM-dd");

      const data = await createHorarios({
        inicioSemana,
        finSemana,
        horarios: payload,
      });

      toast.success("Horarios guardados correctamente");
      fetchHorarios();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // ================= LOCAL ACTIONS =================
  const agregarTurnoLocal = (diaIndex: number) => {
    setHorarios((prev) => {
      return prev.map((dia, i) => {
        if (i !== diaIndex) return dia;

        return {
          ...dia,
          timeSlots: [...dia.timeSlots, "08:00"],
        };
      });
    });
  };

  const eliminarTurnoLocal = (diaIndex: number, horaIndex: number) => {
    setHorarios((prev) =>
      prev.map((dia, i) =>
        i !== diaIndex
          ? dia
          : {
              ...dia,
              timeSlots: dia.timeSlots.filter((_, j) => j !== horaIndex),
            },
      ),
    );
  };

  const cambiarHoraLocal = (
    diaIndex: number,
    horaIndex: number,
    value: string,
  ) => {
    setHorarios((prev) => {
      const copy = [...prev];
      copy[diaIndex].timeSlots[horaIndex] = value;
      return copy;
    });
  };

  // ================= TRANSFORM BD → UI =================
  useEffect(() => {
    const semanaBase: WorkingDay[] = [
      { id: "mon", name: "Lunes", isActive: true, timeSlots: [] },
      { id: "tue", name: "Martes", isActive: true, timeSlots: [] },
      { id: "wed", name: "Miércoles", isActive: true, timeSlots: [] },
      { id: "thu", name: "Jueves", isActive: true, timeSlots: [] },
      { id: "fri", name: "Viernes", isActive: true, timeSlots: [] },
      { id: "sat", name: "Sábado", isActive: true, timeSlots: [] },
      { id: "sun", name: "Domingo", isActive: false, timeSlots: [] },
    ];

    const semanaLlena = semanaBase.map((dia, index) => {
      const fecha = addDays(semanaActual, index);
      const fechaStr = format(fecha, "yyyy-MM-dd");

      const turnos = horariosBD.filter((r) =>
        r.fecha_hora.startsWith(fechaStr),
      );

      const horas = turnos.map((r) => r.fecha_hora.substring(11, 16)).sort();

      return {
        ...dia,
        timeSlots: horas,
      };
    });

    setHorarios(semanaLlena);
  }, [horariosBD, semanaActual]);

  // ================= INIT =================
  useEffect(() => {
    fetchHorarios();
  }, [fetchHorarios]);

  // ================= RETURN =================
  return {
    semanaActual,
    horarios,
    cambiarSemana,
    fetchHorarios,
    guardarCambios,
    agregarTurnoLocal,
    eliminarTurnoLocal,
    cambiarHoraLocal,
  };
}
