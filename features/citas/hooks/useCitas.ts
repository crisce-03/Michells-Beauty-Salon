"use client";

import { useEffect, useState, useMemo } from "react";

import { toast } from "sonner";
import {
  getCitas,
  createCita,
  updateCita,
  deleteCita,
} from "../services/citasService";
import { Cita } from "../types/cita.types";
import { PersonalData } from "../../reserve/types/reserva.types";
import { Service } from "../../servicios/types/servicio.types";

export function useCitas() {
  // ================= DATA =================
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);

  // ================= CREATE =================
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    personalData: {} as PersonalData,
    services: [] as Service[],
    totalPrice: 0,
    observaciones: "",
    fecha_hora: "",
  });

  // ================= EDIT =================
  const [editOpen, setEditOpen] = useState(false);
  const [isEditSubmitting, setIsEditSubmitting] = useState(false);

  const [editFormData, setEditFormData] = useState<{
    id: number;
    nombre: string;
    telefono: string;
    estado: string;
    observaciones: string;
    id_horario: number | string;
    correo: string;
    total: number;
    servicios: Service[];
  }>({
    id: 0,
    nombre: "",
    telefono: "",
    estado: "PENDIENTE",
    observaciones: "",
    id_horario: "",
    correo: "",
    total: 0,
    servicios: [] as Service[],
  });

  // ================= DELETE =================
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [deleteNombre, setDeleteNombre] = useState("");

  // ================= FILTERS =================
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  // ================= PAGINATION =================
  const [paginaActual, setPaginaActual] = useState(1);

  // ================= FETCH =================
  const fetchCitas = async () => {
    try {
      const data = await getCitas();

      const citasMapeadas: Cita[] = data.map((citaAPI: any) => {
        let fechaSeparada = "Sin fecha";
        let horaSeparada = "Sin hora";

        if (citaAPI.horario && citaAPI.horario.fecha_hora) {
          const fechaObj = new Date(citaAPI.horario.fecha_hora);

          fechaSeparada = fechaObj.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });

          horaSeparada = citaAPI.horario.fecha_hora.substring(11, 16);
        }

        const serviciosLimpios = citaAPI.servicios_detalle
          ? citaAPI.servicios_detalle
              .map((detalle: any) => {
                // Si datos_servicio existe, retornamos esos datos
                if (detalle.datos_servicio) {
                  return {
                    nombre: detalle.datos_servicio.nombre,
                  };
                }
                return null;
              })
              .filter(Boolean)
          : [];

        return {
          id: citaAPI.id,
          personalData: {
            nombre: citaAPI.nombre,
            telefono: citaAPI.telefono,
            correo: citaAPI.correo,
            observaciones: citaAPI.observaciones || "",
          },
          total: citaAPI.total,
          services: serviciosLimpios,

          fecha: fechaSeparada,
          hora: horaSeparada,

          estado: citaAPI.estado,
          id_horario: citaAPI.id_horario,
        };
      });

      setCitas(citasMapeadas);
    } catch (err: any) {
      toast.error("Error al cargar citas", {
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitas();
    setPaginaActual(1);
  }, []);

  // ================= CHANGE (EDIT) =================

  // ================= 1. HANDLE EDIT CHANGE =================

  // Añadimos HTMLTextAreaElement para que reconozca el campo de observaciones
  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const target = e.target;
    // Como ya no hay imágenes, la función queda de 1 sola línea:
    setEditFormData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  // ================= 3. HANDLE UPDATE =================

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditSubmitting(true);

    try {
      const datosParaEnviar = {
        estado: editFormData.estado,
        observaciones: editFormData.observaciones,
        id_horario: editFormData.id_horario,
        nombre: editFormData.nombre,
        telefono: editFormData.telefono,
        correo: editFormData.correo,
        total: editFormData.total,
        servicios: editFormData.servicios.map((s) => ({
          id_servicio: s.id,
          precio: s.precio,
        })),
      };

      // Llamamos a tu servicio pasándole el ID y el JSON
      const data = await updateCita(editFormData.id, datosParaEnviar);

      setEditOpen(false);
      fetchCitas(); // Recargamos la tabla
      toast.success("Cita actualizada correctamente");
    } catch (err: any) {
      toast.error("Error al actualizar la cita", {
        description: err.message,
      });
    } finally {
      setIsEditSubmitting(false);
    }
  };

  // ================= DELETE =================
  const openDeleteDialog = (id: number, nombre: string) => {
    setDeleteId(id);
    setDeleteNombre(nombre);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      const data = await deleteCita(deleteId);

      setDeleteOpen(false);
      fetchCitas();

      toast.success("Cita eliminada");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // ================= FILTERS =================
  const citasFiltrados = useMemo(
    () =>
      citas.filter((c) => {
        const est = filtroEstado === "Todos";
        return est;
      }),
    [citas, filtroEstado],
  );

  

  // ================= PAGINATION =================
  const ITEMS_POR_PAGINA = 5;
  const totalPaginas = Math.ceil(citasFiltrados.length / ITEMS_POR_PAGINA);

  const citasActuales = citasFiltrados.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA,
  );

  const irPagina = (n: number) => setPaginaActual(n);

  const irPaginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const irPaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  const cambiarEstado = async (cita: Cita, nuevoEstado: string) => {
  if (cita.estado === nuevoEstado) return;
  try {
    await updateCita(cita.id, { estado: nuevoEstado });
    fetchCitas();
    toast.success(`Cita marcada como ${nuevoEstado.toLowerCase()}`);
  } catch (err: any) {
    toast.error("Error al cambiar el estado", { description: err.message });
  }
};

  // ================= RETURN =================
  return {
    // data
    citas,
    loading,

    // create
    open,
    setOpen,
    formData,
    setFormData,
    isSubmitting,
    errorMsg,

    // edit
    editOpen,
    setEditOpen,
    editFormData,
    setEditFormData,
    isEditSubmitting,
    handleUpdate,
    handleEditChange,

    // delete
    deleteOpen,
    setDeleteOpen,
    deleteId,
    deleteNombre,
    handleDelete,
    openDeleteDialog,

    // filters
    filtroEstado,
    setFiltroEstado,
    citasFiltrados,

    // stats
    /*
    totalCitas: citas.length,
    activos: citas.filter((c) => c.estado === "Activo").length,
    inactivos: citas.filter((c) => c.estado === "Inactivo").length,
    */

    // table
    citasActuales,

    // pagination
    paginaActual,
    setPaginaActual,
    totalPaginas,
    irPagina,
    irPaginaSiguiente,
    irPaginaAnterior,
    itemsPorPagina: ITEMS_POR_PAGINA,
    cambiarEstado,
  };
}
