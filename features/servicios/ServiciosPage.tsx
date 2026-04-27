"use client";

import ServiciosTable from "./components/ServiciosTable";
import ServiciosStats from "./components/ServiciosStats";
import ServiciosFilters from "./components/ServiciosFilters";
import CreateServicioModal from "./components/CreateServicioModal";
import EditServicioModal from "./components/EditServicioModal";
import DeleteServicioDialog from "./components/DeleteServicioDialog";
import HeaderServicios from "./components/HeaderServicios";

import { useServicios } from "./hooks/useServicios";

export default function ServiciosPage() {
  const {
    services,
    loading,

    // filtros
    filtroCategoria,
    setFiltroCategoria,
    filtroEstado,
    setFiltroEstado,
    serviciosFiltrados,

    serviciosActuales,

    // paginación
    paginaActual,
    setPaginaActual,
    totalPaginas,
    irPaginaSiguiente,
    irPaginaAnterior,
    itemsPorPagina,

    // stats
    totalServicios,
    activos,
    inactivos,

    // crear
    open,
    setOpen,
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    errorMsg,

    // editar
    editOpen,
    setEditOpen,
    editFormData,
    handleEditChange,
    handleUpdate,
    isEditSubmitting,
    openEditDialog,

    // delete
    deleteOpen,
    setDeleteOpen,
    deleteId,
    deleteNombre,
    openDeleteDialog,
    handleDelete,
  } = useServicios();

  return (
    <div className="space-y-8">
      <HeaderServicios>
        <CreateServicioModal
          open={open}
          setOpen={setOpen}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          errorMsg={errorMsg}
        />
      </HeaderServicios>

      <ServiciosStats
        totalServicios={totalServicios}
        activos={activos}
        inactivos={inactivos}
      />

      <ServiciosFilters
        filtroCategoria={filtroCategoria}
        setFiltroCategoria={setFiltroCategoria}
        filtroEstado={filtroEstado}
        setFiltroEstado={setFiltroEstado}
        setPaginaActual={setPaginaActual}
      />

      <ServiciosTable
        services={serviciosActuales}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        irPaginaSiguiente={irPaginaSiguiente}
        irPaginaAnterior={irPaginaAnterior}
        totalItems={serviciosFiltrados.length}
        itemsPorPagina={itemsPorPagina}
      />

      <EditServicioModal
        open={editOpen}
        setOpen={setEditOpen}   
        editFormData={editFormData}
        handleEditChange={handleEditChange}
        handleUpdate={handleUpdate}
        isEditSubmitting={isEditSubmitting}
      />

      <DeleteServicioDialog
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        deleteId={deleteId}
        deleteNombre={deleteNombre}
        handleDelete={handleDelete}
      />
    </div>
  );
}
