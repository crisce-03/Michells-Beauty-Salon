"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { startOfWeek, format, addDays, startOfToday } from "date-fns";
import { toast } from "sonner";
import { getServicios } from "../../../features/servicios/services/serviciosService";
import { getHorarios } from "../../horarios/services/horariosService";
import { Service } from "../../servicios/types/servicio.types";
import { WorkingDay } from "../../horarios/types/horarios.types";
import { PersonalData } from "../types/reserva.types";
import { Cita } from "../../citas/types/cita.types";
import { CitaBD } from "../types/reserva.types";
import {
  createCita,
  updateCita,
  deleteCita,
} from "../../citas/services/citasService";

export function useReserva() {
  // ================= SERVICIOS =================
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // ================= FILTROS =================
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [filtroEstado, setFiltroEstado] = useState("Activo");

  // ================= HORARIOS =================
  const [horariosBD, setHorariosBD] = useState<any[]>([]);
  const [horarios, setHorarios] = useState<WorkingDay[]>([]);
  const [semanaActual, setSemanaActual] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  );

  // ================= FECHA Y HORA SELECCIONADA =================
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // ================= DATOS PERSONALES =================
  const [personalData, setPersonalData] = useState<PersonalData>({
    nombre: "",
    correo: "",
    telefono: "",
    observaciones: "",
  });

  const [citaBD, setCitaBD] = useState<CitaBD[]>([]);

  // ================= FETCH SERVICIOS =================
  const fetchServices = useCallback(async () => {
    try {
      const data = await getServicios();
      setServices(data);
    } catch (err: any) {
      toast.error("Error al cargar servicios", { description: err.message });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // ================= FETCH HORARIOS =================
  const fetchHorarios = useCallback(async () => {
    try {
      const data = await getHorarios();
      setHorariosBD(data);
    } catch (err: any) {
      toast.error("Error al cargar horarios", { description: err.message });
    }
  }, []);

  useEffect(() => {
    fetchHorarios();
  }, [fetchHorarios]);

  // ================= TRANSFORMAR HORARIOS POR SEMANA =================
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
      return { ...dia, timeSlots: horas };
    });

    setHorarios(semanaLlena);
  }, [horariosBD, semanaActual]);

  // ================= FILTROS SERVICIOS =================
  const serviciosFiltrados = useMemo(
    () =>
      services.filter((s) => {
        const cat =
          filtroCategoria === "Todas" || s.categoria === filtroCategoria;
        const est = filtroEstado === "Todos" || s.estado === filtroEstado;
        return cat && est;
      }),
    [filtroCategoria, filtroEstado, services],
  );

  // ================= HANDLERS =================
  const handlePersonalDataChange = (
    field: keyof PersonalData,
    value: string | boolean,
  ) => {
    setPersonalData((prev) => ({ ...prev, [field]: value }));
  };

  // 👇 NUEVA FUNCIÓN: Asegura la sincronización mutua de la hora en tus componentes
  const seleccionarHoraYHorario = (hora: string | null) => {
    setSelectedTime(hora);
  };

  const handleSaveCita = async (editId?: string | null) => {
    try {
      const fechaStr = format(selectedDate, "yyyy-MM-dd");

      const turnoEncontrado = horariosBD.find(
        (turno) =>
          turno.fecha_hora.startsWith(fechaStr) &&
          turno.fecha_hora.includes(selectedTime || ""),
      );

      if (!turnoEncontrado) {
        toast.error("Horario no válido", {
          description: "No pudimos encontrar el identificador de esta hora.",
        });
        return false;
      }

      const payload = {
        nombre: personalData.nombre,
        telefono: personalData.telefono,
        correo: personalData.correo,
        observaciones: personalData.observaciones, // Añadido para guardar en la BD
        id_horario: turnoEncontrado.id, 
        total: totalPrice,
        servicios: selectedServices.map((servicio) => ({
          id_servicio: servicio.id,
          precio: servicio.precio,
        })),
      };

      if (editId) {
        await updateCita(Number(editId), payload);
        toast.success("Cita actualizada correctamente");
      } else {
        await createCita(JSON.stringify(payload));
        toast.success("Cita creada correctamente");
      }

      return true; 
    } catch (error: any) {
      console.error(error);
      toast.error("Error al guardar", { description: error.message });
      return false;
    }
  };

  const cargarCitaParaEditar = async (id: string) => {
    try {
      const res = await fetch(`/api/citas?id=${id}`);
      const cita = await res.json();

      if (!res.ok) throw new Error(cita.error || "No se pudo cargar la cita");

      const serviciosAPI =
        cita.servicios_detalle?.map((s: any) => ({
          id: s.id_servicio,
          nombre: s.datos_servicio?.nombre || "Servicio",
          precio: s.datos_servicio?.precio || 0,
          categoria: s.datos_servicio?.categoria || "",
          image_url: s.datos_servicio?.image_url || "",
        })) || [];

      setSelectedServices(serviciosAPI);
      setTotalPrice(cita.total || 0);

      setPersonalData({
        nombre: cita.nombre || "",
        telefono: cita.telefono || "",
        correo: cita.correo || "",
        observaciones: cita.observaciones || "",
      });

      if (cita.horario && cita.horario.fecha_hora) {
        const stringFechaHora = cita.horario.fecha_hora; 

        const fechaLimpia = stringFechaHora.substring(0, 10);
        const fechaLocal = fechaLimpia.replace(/-/g, "\/");

        setSelectedDate(new Date(fechaLocal)); 
        setSelectedTime(stringFechaHora.substring(11, 16)); 
      } else {
        setSelectedDate(new Date());
        setSelectedTime(""); 
      }
    } catch (error) {
      console.error("Error al cargar la cita para edición:", error);
    }
  };

  // ================= RETURN =================
  return {
    services,
    setServices,
    loading,
    selectedServices,
    setSelectedServices,
    totalPrice,
    setTotalPrice,
    filtroCategoria,
    filtroEstado,
    setFiltroCategoria,
    setFiltroEstado,
    serviciosFiltrados,
    horarios,
    semanaActual,
    setSemanaActual,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime: seleccionarHoraYHorario, // 👈 Interceptamos para usar la lógica segura
    personalData,
    handlePersonalDataChange,
    handleSaveCita,
    cargarCitaParaEditar,
  };
}