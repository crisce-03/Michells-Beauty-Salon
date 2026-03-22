"use client";
import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import { StatCard } from '@/components/ui/StatCard'; // Asumiendo que guardaste el StatCard aquí
import {toast} from "sonner";

// --- TIPOS (TypeScript) ---
type ServiceStatus = "Activo" | "Inactivo";

interface Service {
  id: number;
  nombre: string;
  categoria: string;
  precio: string;
  duracion: string;
  estado: ServiceStatus;
}

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Type } from 'lucide-react';

export default function ServiciosPage() {

  //Estados del Formulario

  //Estados del Formulario para Crear
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData,setFormData]=useState({
    nombre: "",
    categoria: "Cabello",
    precio: "",
    duracion: "",
    estado: "Activo" 
  });

  //Estados del Formulario para Editar
  const[editOpen,setEditOpen]=useState(false);
   const [isEditSubmitting, setIsEditSubmitting] = useState(false);
  const [editFormData,setEditFormData]=useState<Service>({
    id: 0,
    nombre: "",
    categoria: "Cabello",
    precio: "",
    duracion: "",
    estado: "Activo" 
  });

  //Estados para Eliminar
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number>(0);
  const [deleteNombre, setDeleteNombre] = useState("");

  //Estados de la Tabla
  const [services,setServices]=useState<Service[]>([]);
  const [loading,setLoading]=useState(true);

  //Cargar los servicios al montar el componente
  useEffect(()=>{
    fetchServices();
  },[]);

    const fetchServices=async()=>{
      try{
        const response=await fetch('/api/servicios');
        const data=await response.json();

        if(!response.ok){
          throw new Error(data.error || "Ocurrió un error inesperado");
        }

        setServices(data);
        setLoading(false);
      }catch(error: any){
        toast.error("Error al cargar los servicios", {
          description: error.message,
        });
      }
   }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const openEditDialog=(service:Service)=>{
    setEditFormData(service);
    setEditOpen(true);
  }

  const handleUpdate = async(e: React.FormEvent)=>{
    e.preventDefault();
    setIsEditSubmitting(true);
    if (!editFormData.id) return;
    try{
      const response= await fetch(`/api/servicios?id=${editFormData.id}`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(editFormData)
      });

      const data=await response.json();

      if(!response.ok){
        throw new Error(data.error || "Ocurrió un error inesperado");
      }

      setEditOpen(false);
      //Actualizar la tabla
      fetchServices();
      

      toast.success("¡Servicio Actualizado!",{
        description: `El servicio ${editFormData.nombre} se actualizó correctamente.`,
          })
    }catch(error: any){
      toast.error("Error al actualizar", {
        description: error.message,
      });
    }finally{
      setIsEditSubmitting(false);
    }
  }

  const handleDelete = async(id:number, nombre:string)=>{

    try{
      //Enviar una solicitud DELETE al servidor
      const response= await fetch(`/api/servicios?id=${id}`,{
          method: 'DELETE'
      });


      const data=await response.json();

      if(!response.ok){
        throw new Error(data.error || "Ocurrió un error inesperado");
      }

      //Actualizar la tabla
      fetchServices();
      

      toast.success("¡Servicio Eliminado!",{
            description: `El servicio ${nombre} se eliminó correctamente.`,
          })

        
    }catch(error: any){
      toast.error("Error al eliminar", {
        description: error.message,
      });
    }
  }

   const openDeleteDialog=(id:number,nombre:string)=>{
    setDeleteNombre(nombre);
    setDeleteId(id);
    setDeleteOpen(true);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try{
      const response = await fetch('/api/servicios' ,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      });

      const data= await response.json();

      if(!response.ok){
        throw new Error(data.error || "Ocurrió un error inesperado");
      }



        setOpen(false);
        setFormData({nombre: "", categoria: "Cabello", precio: "", duracion: "", estado: "Activo" });
        
        //Actualizar la tabla
        fetchServices();

          toast.success("¡Servicio Creado!",{
            description: `El servicio ${formData.nombre} se guardó correctamente.`,
          })

      

    }catch(error: any){
      setErrorMsg(error.message);
    }finally{
      setIsSubmitting(false);
    }
  }

  //Valores Calculados para Estadisticas

  const totalServicios = services.length;
  const activos = services.filter(service => service.estado === "Activo").length;
  const inactivos = services.filter(service => service.estado === "Inactivo").length;

  //Filtros de  Tabla

  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  const serviciosFiltrados = services.filter(service => {
    const categoriaCoincide = filtroCategoria === "Todas" || service.categoria === filtroCategoria;
    const estadoCoincide = filtroEstado === "Todos" || service.estado === filtroEstado;
    return categoriaCoincide && estadoCoincide;
  });

  //Paginacion

  const itemsPorPagina = 5;
  const totalPaginas = Math.ceil(serviciosFiltrados.length / itemsPorPagina);
  const [paginaActual, setPaginaActual] = useState(1);

  
  const indiceFin = paginaActual * itemsPorPagina;
  const indiceInicio = indiceFin - itemsPorPagina;  

  const serviciosActuales = serviciosFiltrados.slice(
    (paginaActual - 1) * itemsPorPagina,
    paginaActual * itemsPorPagina
  );

  const irPagina = (numPagina: number) => {
    setPaginaActual(numPagina);
  };

  const irPaginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      irPagina(paginaActual + 1);
    }
  };

  const irPaginaAnterior = () => {
    if (paginaActual > 1) {
      irPagina(paginaActual - 1);
    }
  };



  return (
    <div className="mx-auto max-w-7xl space-y-8">
      
      {/* Encabezado e Info */}
      <div className="space-y-4">
        <nav className="flex text-sm text-gray-500 dark:text-text-muted">
          <Link href="/dashboardAdmin" className="hover:text-primary transition-colors">Inicio</Link>
          <span className="mx-2 text-primary">/</span>
          <span className="text-gray-900 font-medium dark:text-primary">Catálogo de Servicios</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-cream-label">Catálogo de Servicios</h2>
            <p className="text-gray-500 dark:text-text-muted mt-1">Gestione el menú de tratamientos y servicios de belleza.</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-luxury-black shadow-lg shadow-primary/20 hover:opacity-90 transition-all gap-2">
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                Nuevo Servicio
              </button>
            </DialogTrigger>
            
            <DialogContent className="bg-surface-dark border-border-dark text-background-light sm:max-w-[500px] p-8">
              <DialogHeader>
                <DialogTitle className="font-signature text-4xl text-primary glow-text text-center mb-4">
                  Crear Servicio
                </DialogTitle>
              </DialogHeader>

              {/* Formulario con tus estilos Luxury */}
              <form onSubmit={handleSubmit} className="space-y-5 mt-2">

                {errorMsg && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm  text-center">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-cream-label mb-2 uppercase tracking-tighter">Nombre del Servicio</label>
                    <input 
                    name='nombre'
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="input-dark-luxury w-full rounded-lg bg-surface-input border border-border-dark py-2.5 px-4 text-white focus:border-primary outline-none" 
                    placeholder="Ej. Balayage Premium" 
                    type="text" />
                  </div>
                  
                  <div>
                <label className="block text-xs font-medium text-cream-label mb-2 uppercase tracking-tighter">Categoría</label>
                <select 
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className="w-full bg-surface-input border border-border-dark rounded-lg py-2.5 px-4 text-white focus:border-primary outline-none appearance-none"
                >
                  <option value="Cabello">Cabello</option>
                  <option value="Uñas">Uñas</option>
                  <option value="Maquillaje">Maquillaje</option>
                  <option value="Piel">Piel</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-cream-label mb-2 uppercase tracking-tighter">Precio ($)</label>
                <input 
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  required
                  className="input-dark-luxury w-full rounded-lg bg-surface-input border border-border-dark py-2.5 px-4 text-white focus:border-primary outline-none" 
                  placeholder="0.00" 
                  type="number" 
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-cream-label mb-2 uppercase tracking-tighter">Duración (min)</label>
                <input 
                  name="duracion"
                  value={formData.duracion}
                  onChange={handleChange}
                  className="input-dark-luxury w-full rounded-lg bg-surface-input border border-border-dark py-2.5 px-4 text-white focus:border-primary outline-none" 
                  placeholder="60" 
                  type="number" 
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-cream-label mb-2 uppercase tracking-tighter">Estado Inicial</label>
                <select 
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full bg-surface-input border border-border-dark rounded-lg py-2.5 px-4 text-white focus:border-primary outline-none appearance-none"
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
            </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary text-background-dark font-bold py-3 rounded-lg shadow-lg hover:brightness-110 transition-all uppercase text-sm tracking-widest mt-4"
                >
                  {isSubmitting ? "Guardando..." : "Guardar Servicio"}
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon="content_cut" title="Total Servicios" value={totalServicios} iconBgClass="bg-yellow-50" iconColorClass="text-yellow-600" />
        <StatCard icon="category" title="Activos" value={activos} iconBgClass="bg-amber-50" iconColorClass="text-amber-600" />
        <StatCard icon="category" title="Inactivos" value={inactivos} iconBgClass="bg-green-50" iconColorClass="text-green-600" />
      </div>

      {/* Contenedor de la Tabla */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden dark:bg-surface-dark dark:border-border-dark">
        
        {/* Filtros */}
        <div className="flex flex-col gap-4 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-border-dark">
          <div className="relative max-w-sm flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-text-muted text-[20px]">search</span>
            <input className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-surface-input dark:border-border-dark dark:text-cream-label dark:placeholder-text-muted/70" placeholder="Buscar servicio por nombre..." type="text" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select 
              value={filtroCategoria}
              onChange={(e) => {setFiltroCategoria(e.target.value); setPaginaActual(1)}}
              className="appearance-none cursor-pointer rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm font-medium text-gray-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-surface-input dark:border-border-dark dark:text-cream-label">
                <option value="Todas">Categoría: Todas</option>
                <option value="Cabello">Cabello</option>
                <option value="Uñas">Uñas</option>
                <option value="Maquillaje">Maquillaje</option>
                <option value="Piel">Piel</option>
                <option value="Barba">Barba</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 dark:text-primary text-[20px]">expand_more</span>
            </div>
            <div className="relative">
              <select 
              value={filtroEstado}
              onChange={(e) => {setFiltroEstado(e.target.value); setPaginaActual(1)}}
              className="appearance-none cursor-pointer rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm font-medium text-gray-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-surface-input dark:border-border-dark dark:text-cream-label">
                <option value="Todos">Estado: Todos</option>
                <option value="Activo">Estado: Activos</option>
                <option value="Inactivo">Inactivos</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 dark:text-primary text-[20px]">expand_more</span>
            </div>
          </div>
        </div>

        {/* Datos de la Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-cream-label">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-surface-input dark:text-primary border-b dark:border-border-dark">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider" scope="col">Nombre del Servicio</th>
                <th className="px-6 py-4 font-bold tracking-wider" scope="col">Categoría</th>
                <th className="px-6 py-4 font-bold tracking-wider text-center" scope="col">Precio</th>
                <th className="px-6 py-4 font-bold tracking-wider text-center" scope="col">Duración</th>
                <th className="px-6 py-4 font-bold tracking-wider text-center" scope="col">Estado</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right" scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 border-t border-gray-200 dark:divide-border-dark dark:border-border-dark">
              {serviciosActuales.map((service) => (
                <tr key={service.id} className={`hover:bg-gray-50 dark:hover:bg-surface-input/50 transition-colors ${service.estado === 'Inactivo' ? 'opacity-75' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-cream-label">{service.nombre}</div>
                    <div className="text-xs text-gray-500 dark:text-text-muted italic">{service.categoria}</div>  
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold bg-primary/10 text-primary border border-primary/20 uppercase tracking-wide">
                      {service.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-gray-900 dark:text-primary">{service.precio}</td>
                  <td className="px-6 py-4 text-center text-gray-500 dark:text-text-muted">{service.duracion}</td>
                  <td className="px-6 py-4 text-center">
                    {service.estado === 'Activo' ? (
                      <span className="inline-flex items-center rounded-full bg-primary/20 px-2 py-0.5 text-xs font-bold text-primary border border-primary/30">
                        Activo
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-surface-input px-2.5 py-1 text-xs font-medium text-text-muted border border-border-dark">
                        Inactivo
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">

                       <button 
                      onClick={()=>openEditDialog(service)}
                      className="p-1.5 rounded text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      
                      <button 
                      onClick={()=>openDeleteDialog(service.id,service.nombre)}
                      className="p-1.5 rounded text-gray-400 btn-delete-hover transition-colors">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 dark:border-border-dark">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-text-muted">
                Mostrando <span className="font-medium text-gray-900 dark:text-cream-label">{serviciosFiltrados.length === 0?0 : indiceInicio+1}</span> a <span className="font-medium text-gray-900 dark:text-cream-label">{Math.min(indiceFin,serviciosFiltrados.length)}</span> de <span className="font-medium text-gray-900 dark:text-cream-label">{serviciosFiltrados.length}</span> servicios
              </p>
            </div>
            <div>
              <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                <button 
                onClick={irPaginaAnterior}
                disabled={paginaActual === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-border-dark dark:hover:bg-surface-input dark:text-primary transition-colors">
                  <span className="sr-only">Anterior</span>
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <button 
                
                aria-current="page" className="relative z-10 inline-flex items-center bg-primary px-4 py-2 text-sm font-bold text-luxury-black focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  {paginaActual} de {totalPaginas || 1}
                </button>


                <button 
                onClick={irPaginaSiguiente}
                disabled={paginaActual === totalPaginas || totalPaginas === 0}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-border-dark dark:hover:bg-surface-input dark:text-primary transition-colors">
                  <span className="sr-only">Siguiente</span>
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </nav>
            </div>
          </div>
        </div>

      </div>

      {/* Dialogo para Editar Servicio */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-surface-dark border-border-dark text-background-light sm:max-w-[500px] p-8">
          <DialogHeader>
            <DialogTitle className="font-signature text-4xl text-primary glow-text text-center mb-4">
              Editar Servicio
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-5 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-cream-label mb-2 uppercase tracking-tighter">Nombre</label>
                <input 
                name="nombre" 
                value={editFormData.nombre} 
                onChange={handleEditChange} 
                required 
                className="input-dark-luxury w-full rounded-lg bg-surface-input border border-border-dark py-2.5 px-4 text-white focus:border-primary outline-none" 
                type="text" />
              </div>
              <div>
                <label className="block text-xs font-medium text-cream-label mb-2 uppercase tracking-tighter">Categoría</label>
                <select 
                name="categoria" 
                value={editFormData.categoria} 
                onChange={handleEditChange} 
                className="w-full bg-surface-input border border-border-dark rounded-lg py-2.5 px-4 text-white focus:border-primary outline-none appearance-none">
                  <option value="Cabello">Cabello</option><option value="Uñas">Uñas</option><option value="Maquillaje">Maquillaje</option><option value="Piel">Piel</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-cream-label mb-2 uppercase tracking-tighter">Precio ($)</label>
                <input 
                name="precio" 
                value={editFormData.precio} 
                onChange={handleEditChange} 
                required 
                className="input-dark-luxury w-full rounded-lg bg-surface-input border border-border-dark py-2.5 px-4 text-white focus:border-primary outline-none" 
                type="number" step="0.01" />
              </div>
              <div>
                <label className="block text-xs font-medium text-cream-label mb-2 uppercase tracking-tighter">Duración (min)</label>
                <input 
                name="duracion" 
                value={editFormData.duracion || ""} 
                onChange={handleEditChange} 
                className="input-dark-luxury w-full rounded-lg bg-surface-input border border-border-dark py-2.5 px-4 text-white focus:border-primary outline-none" 
                type="number" />
              </div>
              <div>
                <label className="block text-xs font-medium text-cream-label mb-2 uppercase tracking-tighter">Estado</label>
                <select 
                name="estado" 
                value={editFormData.estado} 
                onChange={handleEditChange} 
                className="w-full bg-surface-input border border-border-dark rounded-lg py-2.5 px-4 text-white focus:border-primary outline-none appearance-none">
                  <option value="Activo">Activo</option><option value="Inactivo">Inactivo</option>
                </select>
              </div>
            </div>
            <button 
                  type="submit" 
                  disabled={isEditSubmitting}
                  className="w-full bg-primary text-background-dark font-bold py-3 rounded-lg shadow-lg hover:brightness-110 transition-all uppercase text-sm tracking-widest mt-4"
                >
                  {isEditSubmitting ? "Actualizando..." : "Actualizar Servicio"}
                </button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialogo para Eliminar Servicio */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-surface-dark border-border-dark text-background-light sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-500 font-bold text-xl">
              ¿Estás completamente segura?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-cream-label/80">
              Esta acción no se puede deshacer. Se eliminará permanentemente el servicio <span className="text-primary font-bold">"{deleteNombre}"</span> de la base de datos del salón.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            {/* Botón de Cancelar */}
            <AlertDialogCancel className="bg-surface-input border-border-dark text-cream-label hover:bg-surface-input/80 hover:text-white">
              Cancelar
            </AlertDialogCancel>
            
            {/* Botón de Eliminar */}
            <AlertDialogAction 
              onClick={()=>handleDelete(deleteId,deleteNombre)} 
              className="bg-red-600 text-white hover:bg-red-700 font-bold"
            >
              Sí, eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      
    </div>
  );
}