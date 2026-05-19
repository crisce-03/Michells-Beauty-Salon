"use client";

import { useEffect, useState, useMemo } from "react";
import { getCitas } from "@/features/citas/services/citasService";
import { Cita } from "@/features/citas/types/cita.types";
import { Service } from "@/features/servicios/types/servicio.types";
import { getHorarios } from "@/features/horarios/services/horariosService";
import { getServicios } from "@/features/servicios/services/serviciosService";

export function useTablero() {
  const [citasHoy, setCitasHoy] = useState<Cita[]>([]);
  const [horarios, setHorarios] = useState<any[]>([]);
  const [servicios, setServicios] = useState<Service[]>([]);

  useEffect(() => {
   getCitas().then((res) => {
  const mapeadas = res.map((citaAPI: any) => ({
    id: citaAPI.id,
    personalData: {
      nombre: citaAPI.nombre,
      telefono: citaAPI.telefono,
      correo: citaAPI.correo,
      observaciones: citaAPI.observaciones || "",
    },
    services: citaAPI.servicios_detalle
      ?.map((d: any) => d.datos_servicio ? { nombre: d.datos_servicio.nombre } : null)
      .filter(Boolean) ?? [],
    hora: citaAPI.horario?.fecha_hora?.substring(11, 16) ?? "Sin hora",
    fecha: citaAPI.horario?.fecha_hora
      ? new Date(citaAPI.horario.fecha_hora).toLocaleDateString("es-ES", {
          day: "2-digit", month: "2-digit", year: "numeric",
        })
      : "Sin fecha",
    estado: citaAPI.estado,
    id_horario: citaAPI.id_horario,
  }));
  setCitasHoy(mapeadas);
});

    getHorarios().then((res) => {
      setHorarios(res);
    });

    getServicios().then((res) => {
      setServicios(res);
    });
  }, []);

  const citasHoyFiltradas = useMemo(() => {
  const hoy = new Date().toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }); // 👈 mismo formato que usas en el mapeo: "17/05/2026"

  return citasHoy.filter((cita) => cita.fecha === hoy);
}, [citasHoy]);

  const horariosDisponibles = useMemo(() => {
    const hoy = new Date().toISOString().split("T")[0]; // "2026-05-17"

    return horarios.filter(
      (h) =>
        h.fecha_hora.startsWith(hoy) && // 👈 es de hoy
        h.estado === "Activo", // 👈 está activo (no Marcador, no ocupado)
    ).length;
  }, [horarios]);

  const serviciosActivos = useMemo(() => {
    return servicios.filter((servicio) => servicio.estado === "Activo").length;
  }, [servicios]);

  return {
    citasHoyFiltradas,
    horariosDisponibles,
    serviciosActivos,
  };
}
