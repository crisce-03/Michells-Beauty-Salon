"use client";

import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import {
  getServicios,
  createServicio,
  updateServicio,
  deleteServicio,
} from "../services/serviciosService";
import { Service } from "../types/servicio.types";

export function useServicios() {
  // ================= DATA =================
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // ================= CREATE =================
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "Cabello",
    precio: "",
    duracion: "",
    estado: "Activo",
  });

  // ================= EDIT =================
  const [editOpen, setEditOpen] = useState(false);
  const [isEditSubmitting, setIsEditSubmitting] = useState(false);

  const [editFormData, setEditFormData] = useState<Service>({
    id: 0,
    nombre: "",
    categoria: "Cabello",
    precio: "",
    duracion: "",
    estado: "Activo",
  });

  // ================= DELETE =================
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [deleteNombre, setDeleteNombre] = useState("");

  // ================= FILTERS =================
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  // ================= PAGINATION =================
  const [paginaActual, setPaginaActual] = useState(1);

  // ================= FETCH =================
  const fetchServices = async () => {
    try {
      const data = await getServicios();
      setServices(data);
    } catch (err: any) {
      toast.error("Error al cargar servicios", {
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
    setPaginaActual(1);
  }, []);

  // ================= CREATE =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const data = await createServicio(formData);

      setOpen(false);
      setFormData({
        nombre: "",
        categoria: "Cabello",
        precio: "",
        duracion: "",
        estado: "Activo",
      });

      fetchServices();

      toast.success("Servicio creado");
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================= CHANGE (CREATE) =================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ================= CHANGE (EDIT) =================
  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ================= EDIT =================
  const openEditDialog = (service: Service) => {
    setEditFormData(service);
    setEditOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditSubmitting(true);

    try {
      const data = await updateServicio(editFormData.id, editFormData);
      setEditOpen(false);
      fetchServices();
      toast.success("Servicio actualizado");
    } catch (err: any) {
      toast.error(err.message);
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
      const data = await deleteServicio(deleteId);

      setDeleteOpen(false);
      fetchServices();

      toast.success("Servicio eliminado");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // ================= FILTERS =================
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

  // ================= PAGINATION =================
  const ITEMS_POR_PAGINA = 5;
  const totalPaginas = Math.ceil(serviciosFiltrados.length / ITEMS_POR_PAGINA);

  const serviciosActuales = serviciosFiltrados.slice(
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

  // ================= RETURN =================
  return {
    // data
    services,
    loading,

    // create
    open,
    setOpen,
    formData,
    setFormData,
    handleChange,
    isSubmitting,
    errorMsg,
    handleSubmit,

    // edit
    editOpen,
    setEditOpen,
    editFormData,
    setEditFormData,
    handleEditChange,
    isEditSubmitting,
    handleUpdate,
    openEditDialog,

    // delete
    deleteOpen,
    setDeleteOpen,
    deleteId,
    deleteNombre,
    openDeleteDialog,
    handleDelete,

    // filters
    filtroCategoria,
    setFiltroCategoria,
    filtroEstado,
    setFiltroEstado,
    serviciosFiltrados,

    // stats
    totalServicios: services.length,
    activos: services.filter((s) => s.estado === "Activo").length,
    inactivos: services.filter((s) => s.estado === "Inactivo").length,

    // table
    serviciosActuales,

    // pagination
    paginaActual,
    setPaginaActual,
    totalPaginas,
    irPagina,
    irPaginaSiguiente,
    irPaginaAnterior,
    itemsPorPagina: ITEMS_POR_PAGINA,
  };
}
