"use client";

import { Cita } from "../types/cita.types";
import { useRouter } from "next/navigation";
import CitasCardsMovil from "./CitasCardsMovil";
import { useState } from "react";

type Props = {
  citas: Cita[];
  paginaActual: number;
  totalPaginas: number;
  irPaginaSiguiente: () => void;
  irPaginaAnterior: () => void;
  totalItems: number;
  itemsPorPagina: number;
  onDelete: (cita: Cita) => void;
  openDeleteDialog: (id: number, nombre: string) => void;
  onCambiarEstado: (cita: Cita, nuevoEstado: string) => void;
  filtroEstado: string;
  setFiltroEstado: (nuevoFiltroEstado: string) => void;
  filtroBusqueda: string;
  setFiltroBusqueda: (nuevoFiltroBusqueda: string) => void;
};

const ESTADOS = [
  {
    valor: "CONFIRMADA",
    label: "Confirmada",
    icon: "event_available",
    color: "text-primary bg-primary/20 border-primary/30",
  },
  {
    valor: "PENDIENTE",
    label: "Pendiente",
    icon: "schedule",
    color: "text-yellow-500 bg-yellow-500/20 border-yellow-500/30",
  },
  {
    valor: "COMPLETADA",
    label: "Completada",
    icon: "check_circle",
    color: "text-green-500 bg-green-500/20 border-green-500/30",
  },
  {
    valor: "CANCELADA",
    label: "Cancelada",
    icon: "cancel",
    color: "text-red-500 bg-red-500/20 border-red-500/30",
  },
];

export default function CitasTable({
  citas,
  paginaActual,
  totalPaginas,
  irPaginaSiguiente,
  irPaginaAnterior,
  totalItems,
  itemsPorPagina,
  onDelete,
  openDeleteDialog,
  onCambiarEstado,
  filtroEstado,
  setFiltroEstado,
  filtroBusqueda,
  setFiltroBusqueda,
}: Props) {
  const router = useRouter();
  const [dropdownAbierto, setDropdownAbierto] = useState<number | null>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });

  const indiceInicio = (paginaActual - 1) * itemsPorPagina;
  const indiceFin = paginaActual * itemsPorPagina;

  const abrirDropdown = (e: React.MouseEvent, citaId: number) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + window.scrollY + 4,
      right: window.innerWidth - rect.right,
    });
    setDropdownAbierto(dropdownAbierto === citaId ? null : citaId);
  };

  const estadoActual = (estado: string) =>
    ESTADOS.find((e) => e.valor === estado) ?? ESTADOS[1];

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:bg-surface-dark dark:border-border-dark">
        {/* Filtros */}
        <div className="flex flex-col gap-4 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-border-dark">
          <div className="relative max-w-sm flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-text-muted text-[20px]">
              search
            </span>
            <input
              value={filtroBusqueda}
              onChange={(e) => setFiltroBusqueda(e.target.value)}
              className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-surface-input dark:border-border-dark dark:text-cream-label dark:placeholder-text-muted/70"
              placeholder="Buscar cliente..."
              type="text"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select 
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="appearance-none cursor-pointer rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm font-medium text-gray-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-surface-input dark:border-border-dark dark:text-cream-label">
                <option value="Todos">Estado: Todos</option>
                <option value="CONFIRMADA">Confirmada</option>
                <option value="PENDIENTE">Pendiente</option>
                <option value="COMPLETADA">Completada</option>
                <option value="CANCELADA">Cancelada</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 dark:text-primary text-[20px]">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="hidden sm:flex overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-cream-label">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-surface-input dark:text-primary border-b dark:border-border-dark">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Cliente</th>
                <th className="px-6 py-4 font-bold tracking-wider">Servicio</th>
                <th className="px-6 py-4 font-bold tracking-wider">Fecha</th>
                <th className="px-6 py-4 font-bold tracking-wider">Hora</th>
                <th className="px-6 py-4 font-bold tracking-wider">Estado</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 border-t border-gray-200 dark:divide-border-dark dark:border-border-dark">
              {citas.map((cita) => {
                const estado = estadoActual(cita.estado);
                return (
                  <tr
                    key={cita.id}
                    className="hover:bg-gray-50 dark:hover:bg-surface-input/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-cream-label">
                      {cita.personalData.nombre}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {cita.services.map((servicio, index) => (
                          <span
                            key={`${servicio.id || "srv"}-${index}`}
                            className="inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300"
                          >
                            {servicio.nombre}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-900 dark:text-cream-label font-medium">
                      {cita.fecha}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-cream-label">
                      {cita.hora}
                    </td>

                    {/* Estado como badge clickeable */}
                    <td className="px-6 py-4">
                      <button
                        onClick={(e) => abrirDropdown(e, cita.id)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold border transition-opacity hover:opacity-80 ${estado.color}`}
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          {estado.icon}
                        </span>
                        {estado.label}
                        <span className="material-symbols-outlined text-[13px]">
                          expand_more
                        </span>
                      </button>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            router.push(`/reserve?editId=${cita.id}`)
                          }
                          className="p-1.5 rounded text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            edit
                          </span>
                        </button>
                        <button
                          onClick={() =>
                            openDeleteDialog(cita.id, cita.personalData.nombre)
                          }
                          className="p-1.5 rounded text-gray-400 btn-delete-hover transition-colors"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Tabla Movil*/}
        <div className="sm:hidden divide-y divide-gray-200 dark:divide-border-dark">
          {citas.map((cita) => {
            return (
              <CitasCardsMovil
                key={cita.id}
                cita={cita}
                openDeleteDialog={openDeleteDialog}
                abrirDropdown={abrirDropdown}
              />
            );
          })}
        </div>

        {/* Paginación */}
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 dark:border-border-dark">
          <div className="flex sm:flex-1 sm:items-center sm:justify-between">
            <div className="hidden sm:flex">
              <p className=" text-sm text-gray-500 dark:text-text-muted">
                Mostrando{" "}
                <span className="font-medium text-gray-900 dark:text-cream-label">
                  {indiceInicio + 1}
                </span>{" "}
                a{" "}
                <span className="font-medium text-gray-900 dark:text-cream-label">
                  {indiceFin < totalItems ? indiceFin : totalItems}
                </span>{" "}
                de{" "}
                <span className="font-medium text-gray-900 dark:text-cream-label">
                  {totalItems}
                </span>{" "}
                resultados
              </p>
            </div>

            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
              <button
                onClick={irPaginaAnterior}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:ring-border-dark dark:hover:bg-surface-input dark:text-primary transition-colors"
              >
                <span className="sr-only">Anterior</span>
                <span className="material-symbols-outlined text-[20px]">
                  chevron_left
                </span>
              </button>
              <button className="relative z-10 inline-flex items-center bg-primary px-4 py-2 text-sm font-bold text-luxury-black">
                {paginaActual} de {totalPaginas || 1}
              </button>
              <button
                onClick={irPaginaSiguiente}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:ring-border-dark dark:hover:bg-surface-input dark:text-primary transition-colors"
              >
                <span className="sr-only">Siguiente</span>
                <span className="material-symbols-outlined text-[20px]">
                  chevron_right
                </span>
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Dropdown con position fixed — escapa de cualquier overflow */}
      {dropdownAbierto !== null && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setDropdownAbierto(null)}
          />
          <div
            className="fixed z-50 flex flex-col bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-lg shadow-lg overflow-hidden w-40"
            style={{ top: dropdownPos.top, right: dropdownPos.right }}
          >
            {ESTADOS.map(({ valor, label, icon, color }) => {
              const citaActual = citas.find((c) => c.id === dropdownAbierto);
              const esActual = citaActual?.estado === valor;
              return (
                <button
                  key={valor}
                  onClick={() => {
                    if (citaActual) onCambiarEstado(citaActual, valor);
                    setDropdownAbierto(null);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 text-xs text-left font-medium transition-colors
                    ${esActual ? "bg-gray-50 dark:bg-surface-input" : "hover:bg-gray-50 dark:hover:bg-surface-input"}
                  `}
                >
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 border text-xs font-bold ${color}`}
                  >
                    <span className="material-symbols-outlined text-[12px]">
                      {icon}
                    </span>
                    {label}
                  </span>
                  {esActual && (
                    <span className="material-symbols-outlined text-[16px] text-primary ml-auto">
                      check
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
