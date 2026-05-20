"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { startOfWeek, addWeeks, format, addDays } from "date-fns";
import { toast } from "sonner";
import {
  WorkingDay,
  SemanaDireccion,
} from "@/features/horarios/types/horarios.types";
import { getHorarios, createHorarios } from "../services/horariosService";

export function useHorarios() {
  const [semanaActual, setSemanaActual] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  );
  const [horariosBD, setHorariosBD] = useState<any[]>([]);
  const [horarios, setHorarios] = useState<WorkingDay[]>([]);
  
  // SOLUCIÓN: Usar useRef en lugar de useState para rastrear la semana anterior
  const semanaAnteriorRef = useRef<Date | null>(null);

  // ================= WEEK NAVIGATION =================
  const cambiarSemana = (dir: SemanaDireccion) => {
    setSemanaActual((prev) => {
      const nueva = dir === "siguiente" ? addWeeks(prev, 1) : addWeeks(prev, -1);
      return nueva;
    });
    fetchHorarios(); 
  };

  // ================= FETCH =================
  const fetchHorarios = useCallback(async () => {
    try {
      const data = await getHorarios();
      setHorariosBD(data);
    } catch (err: any) {
      toast.error("Error al cargar horarios", { description: err.message });
    }
  }, []);

  // ================= INIT =================
  useEffect(() => {
    fetchHorarios();
  }, [fetchHorarios]);

  // ================= TRANSFORM BD → UI =================
  useEffect(() => {
    const semanaBase: WorkingDay[] = [
      { id: "mon", name: "Lunes",     isActive: false, timeSlots: [] },
      { id: "tue", name: "Martes",    isActive: false, timeSlots: [] },
      { id: "wed", name: "Miércoles", isActive: false, timeSlots: [] },
      { id: "thu", name: "Jueves",    isActive: false, timeSlots: [] },
      { id: "fri", name: "Viernes",   isActive: false, timeSlots: [] },
      { id: "sat", name: "Sábado",    isActive: false, timeSlots: [] },
      { id: "sun", name: "Domingo",   isActive: false, timeSlots: [] },
    ];

    // Evaluamos el cambio de forma síncrona
    const semanaCambio = semanaAnteriorRef.current?.getTime() !== semanaActual.getTime();
    if (semanaCambio) {
      semanaAnteriorRef.current = semanaActual; // Actualizamos la ref instantáneamente
    }

    setHorarios((prevHorarios) =>
      semanaBase.map((dia, index) => {
        const fecha = addDays(semanaActual, index);
        const fechaStr = format(fecha, "yyyy-MM-dd");
        const turnos = horariosBD.filter((r) => r.fecha_hora.startsWith(fechaStr));

        const tieneMarcador = turnos.some((r) => r.estado === "Marcador");
        const horas = turnos
          .filter((r) => r.estado !== "Marcador")
          .map((r) => r.fecha_hora.substring(11, 16))
          .sort();

        // Ahora semanaCambio es 100% confiable
        const prevDia = semanaCambio ? null : prevHorarios.find((p) => p.id === dia.id);

        const isActive =
          turnos.length > 0
            ? tieneMarcador || horas.length > 0
            : prevDia
              ? prevDia.isActive
              : dia.isActive;

        return {
          ...dia,
          isActive,
          timeSlots: horas.length > 0 ? horas : (prevDia?.timeSlots ?? []),
        };
      })
    );
  }, [horariosBD, semanaActual]);

  // ================= SAVE =================
  const guardarCambios = async () => {
    try {
      const payload: any[] = [];

      horarios.forEach((dia, index) => {
        const fecha = addDays(semanaActual, index);
        const fechaStr = format(fecha, "yyyy-MM-dd");

        if (!dia.isActive) return;

        if (dia.timeSlots.length === 0) {
          payload.push({
            fecha_hora: `${fechaStr} 00:00:00`,
            estado: "Marcador",
          });
          return;
        }

        dia.timeSlots.forEach((hora) => {
          payload.push({
            fecha_hora: `${fechaStr} ${hora}:00`,
            estado: "Activo",
          });
        });
      });

      const inicioSemana = format(semanaActual, "yyyy-MM-dd");
      const finSemana = format(addDays(semanaActual, 6), "yyyy-MM-dd");
      await createHorarios({ inicioSemana, finSemana, horarios: payload });
      toast.success("Horarios guardados correctamente");
      fetchHorarios();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // ================= LOCAL ACTIONS =================
 const agregarTurnoLocal = (diaIndex: number) => {
  setHorarios((prev) =>
    prev.map((dia, i) => {
      if (i !== diaIndex) return dia;

      // Encontrar la primera hora libre que no esté ya en timeSlots
      const horasExistentes = new Set(dia.timeSlots);
      let horaLibre = "08:00";

      for (let h = 8; h <= 22; h++) {
        const candidato = `${String(h).padStart(2, "0")}:00`;
        if (!horasExistentes.has(candidato)) {
          horaLibre = candidato;
          break;
        }
        // También intentar medias horas
        const candidatoMedia = `${String(h).padStart(2, "0")}:30`;
        if (!horasExistentes.has(candidatoMedia)) {
          horaLibre = candidatoMedia;
          break;
        }
      }

      return { ...dia, timeSlots: [...dia.timeSlots, horaLibre] };
    }),
  );
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
      const copy = prev.map((dia) => ({
        ...dia,
        timeSlots: [...dia.timeSlots],
      }));
      copy[diaIndex].timeSlots[horaIndex] = value;
      return copy;
    });
  };

  const toggleDiaLocal = (diaIndex: number) => {
    setHorarios((prev) =>
      prev.map((dia, i) =>
        i !== diaIndex ? dia : { ...dia, isActive: !dia.isActive },
      ),
    );
  };

  // ================= RETURN =================
  return {
    semanaActual,
    horarios,
    horariosBD,
    cambiarSemana,
    fetchHorarios,
    guardarCambios,
    agregarTurnoLocal,
    eliminarTurnoLocal,
    cambiarHoraLocal,
    toggleDiaLocal,
  };
}