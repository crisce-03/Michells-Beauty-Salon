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
    categoria: "Uñas",
    precio: "",
    duracion: "",
    estado: "Activo",
    imagen: null,   
  });

  const[previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  // ================= EDIT =================
  const [editOpen, setEditOpen] = useState(false);
  const [isEditSubmitting, setIsEditSubmitting] = useState(false);

  const [editFormData, setEditFormData] = useState<Service>({
    id: 0,
    nombre: "",
    categoria: "Uñas",
    precio: "",
    duracion: "",
    estado: "Activo",
    imagen: null,   
    image_url: "",
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
      const datosParaEnviar = new FormData();

      // 2. Agregamos todos los campos de texto
      datosParaEnviar.append("nombre", formData.nombre);
      datosParaEnviar.append("categoria", formData.categoria);
      datosParaEnviar.append("precio", formData.precio);
      datosParaEnviar.append("duracion", formData.duracion);
      datosParaEnviar.append("estado", formData.estado);

      // 3. Agregamos la imagen (solo si el usuario seleccionó una)
      if (formData.imagen) {
        datosParaEnviar.append("imagen", formData.imagen);
      }
      const data = await createServicio(datosParaEnviar);

      setOpen(false);
      setFormData({
        nombre: "",
        categoria: "Uñas",
        precio: "",
        duracion: "",
        estado: "Activo",
        imagen: null,
      });
      setPreviewImageUrl("");

      fetchServices();

      toast.success("Servicio creado");
      setPreviewImageUrl("");
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
    const target = e.target;

    if (target.type === "file") {
      const fileInput = target as HTMLInputElement;
      const file = fileInput.files?.[0];
      setFormData((prev) => ({ ...prev, [target.name]: file }));

      if (file) {
        setPreviewImageUrl(URL.createObjectURL(file));
      } else {
        setPreviewImageUrl("");
      }
    } else {
      setFormData((prev) => ({ ...prev, [target.name]: target.value }));
    }
  };

  // ================= CHANGE (EDIT) =================
  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const target = e.target;
    if (target.type === "file") {
      const fileInput = target as HTMLInputElement;
      const file = fileInput.files?.[0];
      setEditFormData((prev) => ({ ...prev, [target.name]: file }));

      if (file) {
        setPreviewImageUrl(URL.createObjectURL(file));
      } else {
        setPreviewImageUrl("");
      }
    } else {
      setEditFormData((prev) => ({ ...prev, [target.name]: target.value }));
    }
  };

  // ================= EDIT =================
  const openEditDialog = (service: Service) => {
    setEditFormData(service);
    setEditOpen(true);
    setPreviewImageUrl(service.image_url);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditSubmitting(true);

    try {
      const datosParaEnviar = new FormData();

      datosParaEnviar.append("id", editFormData.id.toString());
      datosParaEnviar.append("nombre", editFormData.nombre);
      datosParaEnviar.append("categoria", editFormData.categoria);
      datosParaEnviar.append("precio", editFormData.precio);
      datosParaEnviar.append("duracion", editFormData.duracion);
      datosParaEnviar.append("estado", editFormData.estado);

      // 3. Agregamos la imagen (solo si el usuario seleccionó una)
      if (editFormData.imagen) {
        datosParaEnviar.append("imagen", editFormData.imagen);
      }
      const data = await updateServicio(editFormData.id, datosParaEnviar);
      setEditOpen(false);
      fetchServices();
      toast.success("Servicio actualizado");
      setPreviewImageUrl("");
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
    previewImageUrl,

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
