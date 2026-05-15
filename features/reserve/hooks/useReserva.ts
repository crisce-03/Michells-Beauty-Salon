"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { startOfWeek, format, addDays, startOfToday } from "date-fns";
import { toast } from "sonner";
import { getServicios } from "../../../features/servicios/services/serviciosService";
import { getHorarios } from "../../horarios/services/horariosService";
import { Service } from "../../servicios/types/servicio.types";
import { WorkingDay } from "../../horarios/types/horarios.types";
import { PersonalData} from "../types/reserva.types";
import { Cita } from "../../citas/types/cita.types";
import { CitaBD } from "../types/reserva.types";
import { createCita } from "../../citas/services/citasService";

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
    fullname: "",
    email: "",
    phone: "",
    requests: ""
  });

  const [cita, setCita] = useState<Cita>({
    id: 0,
    personalData: {
      fullname: "",
      email: "",
      phone: "",
      requests: ""
    },
    services: [],
    totalPrice: 0,
    fecha_hora: ""
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
      { id: "mon", name: "Lunes",     isActive: true,  timeSlots: [] },
      { id: "tue", name: "Martes",    isActive: true,  timeSlots: [] },
      { id: "wed", name: "Miércoles", isActive: true,  timeSlots: [] },
      { id: "thu", name: "Jueves",    isActive: true,  timeSlots: [] },
      { id: "fri", name: "Viernes",   isActive: true,  timeSlots: [] },
      { id: "sat", name: "Sábado",    isActive: true,  timeSlots: [] },
      { id: "sun", name: "Domingo",   isActive: false, timeSlots: [] },
    ];

    const semanaLlena = semanaBase.map((dia, index) => {
      const fecha    = addDays(semanaActual, index);
      const fechaStr = format(fecha, "yyyy-MM-dd");
      const turnos   = horariosBD.filter((r) => r.fecha_hora.startsWith(fechaStr));
      const horas    = turnos.map((r) => r.fecha_hora.substring(11, 16)).sort();
      return { ...dia, timeSlots: horas };
    });

    setHorarios(semanaLlena);
  }, [horariosBD, semanaActual]);

  // ================= FILTROS SERVICIOS =================
  const serviciosFiltrados = useMemo(
    () =>
      services.filter((s) => {
        const cat = filtroCategoria === "Todas" || s.categoria === filtroCategoria;
        const est = filtroEstado   === "Todos"  || s.estado    === filtroEstado;
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

  const handleSaveCita = async () => {
    try {
      // 1. Encontrar el ID real del horario en tu base de datos (horariosBD)
      const fechaStr = format(selectedDate, "yyyy-MM-dd");
      
      // Buscamos el registro exacto que coincida con la fecha y la hora
      const turnoEncontrado = horariosBD.find((turno) => 
        turno.fecha_hora.startsWith(fechaStr) && 
        turno.fecha_hora.includes(selectedTime || "")
      );

      if (!turnoEncontrado) {
        toast.error("Horario no válido", { 
          description: "No pudimos encontrar el identificador de esta hora." 
        });
        return false; // Retornamos false para saber que falló
      }

      // 2. Construir el JSON exacto que espera tu API
      const payload = {
        nombre: personalData.fullname,
        telefono: personalData.phone,
        correo: personalData.email,
        id_horario: turnoEncontrado.id, // El ID numérico que viene de Supabase
        total: totalPrice,
        observaciones: personalData.requests,
        // Mapeamos los servicios para enviar solo ID y Precio
        servicios: selectedServices.map((servicio) => ({
          id_servicio: servicio.id,
          precio: servicio.precio
        }))
      };

      // 3. Hacer la petición a tu API Route (Ajusta la URL si es necesario)
      const data = await createCita(JSON.stringify(payload));
      setCitaBD([...citaBD, data]);

      console.log("Data recibida:", data); // ← ¿Qué llega aquí?
console.log("Llegó al toast?"); // ← ¿Aparece este log?

      toast.success("¡Cita guardada con éxito!");
      
      return true; // Retornamos true para indicar éxito

    } catch (error: any) {
      console.error(error);
      toast.error("Error al guardar", { description: error.message });
      return false;
    }
  };

  // ================= RETURN =================
  return {
    // Servicios
    services,
    setServices,
    loading,
    selectedServices,
    setSelectedServices,
    totalPrice,
    setTotalPrice,
    // Filtros
    filtroCategoria,
    filtroEstado,
    setFiltroCategoria,
    setFiltroEstado,
    serviciosFiltrados,
    // Horarios
    horarios,
    semanaActual,
    setSemanaActual,
    // Fecha y hora
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    // Datos personales
    personalData,
    handlePersonalDataChange,
    handleSaveCita,
  };
}