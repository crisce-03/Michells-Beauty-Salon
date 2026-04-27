import { Service } from "../types/servicio.types";

type Props = {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (id: number, nombre: string) => void;
  paginaActual: number;
  totalPaginas: number;
  irPaginaSiguiente: () => void;
  irPaginaAnterior: () => void;

   totalItems: number;
  itemsPorPagina: number;
};

export default function ServiciosTable({
  services,
  onEdit,
  onDelete,
  paginaActual,
  totalPaginas,
  irPaginaSiguiente,
  irPaginaAnterior,
  totalItems,
  itemsPorPagina,
}: Props) {
     const indiceInicio = (paginaActual - 1) * itemsPorPagina;
  const indiceFin = paginaActual * itemsPorPagina;
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden dark:bg-surface-dark dark:border-border-dark">
      {/* Datos de la Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-cream-label">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-surface-input dark:text-primary border-b dark:border-border-dark">
            <tr>
              <th className="px-6 py-4 font-bold tracking-wider" scope="col">
                Nombre del Servicio
              </th>
              <th className="px-6 py-4 font-bold tracking-wider" scope="col">
                Categoría
              </th>
              <th
                className="px-6 py-4 font-bold tracking-wider text-center"
                scope="col"
              >
                Precio
              </th>
              <th
                className="px-6 py-4 font-bold tracking-wider text-center"
                scope="col"
              >
                Duración
              </th>
              <th
                className="px-6 py-4 font-bold tracking-wider text-center"
                scope="col"
              >
                Estado
              </th>
              <th
                className="px-6 py-4 font-bold tracking-wider text-right"
                scope="col"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 border-t border-gray-200 dark:divide-border-dark dark:border-border-dark">
            {services.map((service) => (
              <tr
                key={service.id}
                className={`hover:bg-gray-50 dark:hover:bg-surface-input/50 transition-colors ${service.estado === "Inactivo" ? "opacity-75" : ""}`}
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900 dark:text-cream-label">
                    {service.nombre}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-text-muted italic">
                    {service.categoria}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold bg-primary/10 text-primary border border-primary/20 uppercase tracking-wide">
                    {service.categoria}
                  </span>
                </td>
                <td className="px-6 py-4 text-center font-bold text-gray-900 dark:text-primary">
                  {service.precio}
                </td>
                <td className="px-6 py-4 text-center text-gray-500 dark:text-text-muted">
                  {service.duracion}
                </td>
                <td className="px-6 py-4 text-center">
                  {service.estado === "Activo" ? (
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
                      onClick={() => onEdit(service)}
                      className="p-1.5 rounded text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        edit
                      </span>
                    </button>

                    <button
                      onClick={() => onDelete(service.id, service.nombre)}
                      className="p-1.5 rounded text-gray-400 btn-delete-hover transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 dark:border-border-dark">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-text-muted">
              Mostrando{" "}
              <span className="font-medium text-gray-900 dark:text-cream-label">
                {totalItems === 0 ? 0 : indiceInicio + 1}
              </span>{" "}
              a{" "}
              <span className="font-medium text-gray-900 dark:text-cream-label">
                {Math.min(indiceFin, totalItems)}
              </span>{" "}
              de{" "}
              <span className="font-medium text-gray-900 dark:text-cream-label">
                {totalItems}    
              </span>{" "}
              servicios
            </p>
          </div>
          <div>
            <nav
              aria-label="Pagination"
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            >
              <button
                onClick={irPaginaAnterior}
                disabled={paginaActual === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-border-dark dark:hover:bg-surface-input dark:text-primary transition-colors"
              >
                <span className="sr-only">Anterior</span>
                <span className="material-symbols-outlined text-[20px]">
                  chevron_left
                </span>
              </button>
              <button
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-primary px-4 py-2 text-sm font-bold text-luxury-black focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {paginaActual} de {totalPaginas || 1}
              </button>

              <button
                onClick={irPaginaSiguiente}
                disabled={paginaActual === totalPaginas || totalPaginas === 0}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-border-dark dark:hover:bg-surface-input dark:text-primary transition-colors"
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
    </div>
  );
}
