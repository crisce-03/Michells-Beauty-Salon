"use client";

import React from 'react';
import Link from 'next/link';
import { StatusBadge } from '@/components/ui/StatusBadge'; // Ajusta la ruta si es necesario

// --- TIPOS (Puedes sacarlos a un archivo types.ts luego) ---
type AppointmentStatus = "Confirmado" | "Pendiente" | "Cancelado";

interface Appointment {
  id: number;
  name: string;
  service: string;
  duration: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  avatar?: string;
  initials?: string;
}

import CitasTable from "@/features/citas/components/CitasTable";
import { useCitas } from "@/features/citas/hooks/useCitas";

// --- DATOS DE EJEMPLO ---

export default function CitasPage() {
  const { 
    citas,
    loading,

    open,
    setOpen,
    formData,
    setFormData,
    isSubmitting,
    errorMsg,

    editOpen,
    setEditOpen,
    editFormData,
    setEditFormData,
    isEditSubmitting,
    openEditDialog,
    handleUpdate,
    handleEditChange,


    deleteOpen,
    setDeleteOpen,
    deleteId,

    filtroEstado,
    setFiltroEstado,
    citasFiltrados,
    /*
    totalCitas: citas.length,
    activos: citas.filter((c) => c.estado === "Activo").length,
    inactivos: citas.filter((c) => c.estado === "Inactivo").length,
    */
    citasActuales,

    paginaActual,
    setPaginaActual,
    totalPaginas,
    irPagina,
    irPaginaSiguiente,
    irPaginaAnterior,
    itemsPorPagina: ITEMS_POR_PAGINA, } = useCitas();
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      
      {/* Encabezado */}
      <div className="space-y-4">
        <nav className="flex text-sm text-gray-500 dark:text-text-muted">
          <Link href="/dashboardAdmin" className="hover:text-primary transition-colors">Inicio</Link>
          <span className="mx-2 text-primary">/</span>
          <span className="text-gray-900 font-medium dark:text-primary">Gestión de Citas</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-cream-label">Citas Programadas</h2>
            <p className="text-gray-500 dark:text-text-muted mt-1">Administra las reservas y horarios de tus clientes.</p>
          </div>
          <button 
          onClick={() => {
            window.location.href = "/reserve";
          }}
          className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-luxury-black shadow-lg shadow-primary/20 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all gap-2">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Nueva Cita
          </button>
        </div>
      </div>

      {/* Contenedor de la Tabla */}
      <CitasTable 
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        irPaginaSiguiente={irPaginaSiguiente}
        irPaginaAnterior={irPaginaAnterior}
        totalItems={citasFiltrados.length}
        itemsPorPagina={ITEMS_POR_PAGINA}
        onEdit={openEditDialog}
        citas={citasActuales} 
      />
      
    </div>
  );
}