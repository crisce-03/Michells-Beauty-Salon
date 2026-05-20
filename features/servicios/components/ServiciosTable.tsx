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

function Paginacion({
  paginaActual,
  totalPaginas,
  irPaginaAnterior,
  irPaginaSiguiente,
}: {
  paginaActual: number;
  totalPaginas: number;
  irPaginaAnterior: () => void;
  irPaginaSiguiente: () => void;
}) {
  return (
    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
      <button
        onClick={irPaginaAnterior}
        disabled={paginaActual === 1}
        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-40 dark:ring-border-dark dark:hover:bg-surface-input dark:text-primary transition-colors"
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
        disabled={paginaActual === totalPaginas || totalPaginas === 0}
        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-40 dark:ring-border-dark dark:hover:bg-surface-input dark:text-primary transition-colors"
      >
        <span className="sr-only">Siguiente</span>
        <span className="material-symbols-outlined text-[20px]">
          chevron_right
        </span>
      </button>
    </nav>
  );
}

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
      {/* ── TABLA — solo visible en sm+ ── */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-cream-label">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-surface-input dark:text-primary border-b dark:border-border-dark">
            <tr>
              <th className="px-6 py-4 font-bold tracking-wider">
                Nombre del Servicio
              </th>
              <th className="px-6 py-4 font-bold tracking-wider">Categoría</th>
              <th className="px-6 py-4 font-bold tracking-wider text-center">
                Precio
              </th>
              <th className="px-6 py-4 font-bold tracking-wider text-center">
                Duración
              </th>
              <th className="px-6 py-4 font-bold tracking-wider text-center">
                Estado
              </th>
              <th className="px-6 py-4 font-bold tracking-wider text-right">
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
                <td className="px-6 py-4 flex items-center gap-4">
                  {service.image_url ? (
                    <img
                      src={service.image_url}
                      alt={service.nombre}
                      className="w-12 h-12 rounded-xl object-cover border border-border-dark shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-surface-input flex items-center justify-center border border-border-dark">
                      <span className="material-symbols-outlined text-gray-500 text-xl">
                        image
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-gray-900 dark:text-cream-label">
                      {service.nombre}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-text-muted italic">
                      {service.categoria}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold bg-primary/10 text-primary border border-primary/20 uppercase tracking-wide">
                    {service.categoria}
                  </span>
                </td>
                <td className="px-6 py-4 text-center font-bold text-gray-900 dark:text-primary">
                  ${service.precio}
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

      {/* ── CARDS — solo visible en móvil ── */}
      <div className="sm:hidden divide-y divide-gray-200 dark:divide-border-dark">
        {services.map((service) => (
          <div
            key={service.id}
            className={`p-4 flex gap-3 ${service.estado === "Inactivo" ? "opacity-75" : ""}`}
          >
            {/* Imagen */}
            {service.image_url ? (
              <img
                src={service.image_url}
                alt={service.nombre}
                className="w-16 h-16 rounded-xl object-cover border border-border-dark shadow-sm flex-shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-surface-input flex items-center justify-center border border-border-dark flex-shrink-0">
                <span className="material-symbols-outlined text-gray-500 text-2xl">
                  image
                </span>
              </div>
            )}

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-cream-label text-sm truncate">
                    {service.nombre}
                  </p>
                  <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20 uppercase tracking-wide mt-0.5">
                    {service.categoria}
                  </span>
                </div>
                {/* Botones de acción — grandes y fáciles de tocar */}
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => onEdit(service)}
                    className="p-2.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 active:bg-primary/20 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[22px]">
                      edit
                    </span>
                  </button>
                  <button
                    onClick={() => onDelete(service.id, service.nombre)}
                    className="p-2.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 active:bg-red-500/20 transition-colors btn-delete-hover"
                  >
                    <span className="material-symbols-outlined text-[22px]">
                      delete
                    </span>
                  </button>
                </div>
              </div>

              {/* Precio, duración y estado en fila */}
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="text-sm font-bold text-primary">
                  ${service.precio}
                </span>
                {service.estado === "Activo" ? (
                  <span className="inline-flex items-center rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary border border-primary/30">
                    Activo
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-surface-input px-2 py-0.5 text-[10px] font-medium text-text-muted border border-border-dark">
                    Inactivo
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── PAGINACIÓN — visible siempre ── */}
      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 dark:border-border-dark">
        {/* Texto solo en sm+ */}
        <p className="hidden sm:block text-sm text-gray-500 dark:text-text-muted">
          Mostrando{" "}
          <span className="font-medium text-gray-900 dark:text-cream-label">
            {totalItems === 0 ? 0 : indiceInicio + 1}
          </span>
          {" a "}
          <span className="font-medium text-gray-900 dark:text-cream-label">
            {Math.min(indiceFin, totalItems)}
          </span>
          {" de "}
          <span className="font-medium text-gray-900 dark:text-cream-label">
            {totalItems}
          </span>
          {" servicios"}
        </p>
        {/* Botones siempre visibles */}
        <Paginacion
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          irPaginaAnterior={irPaginaAnterior}
          irPaginaSiguiente={irPaginaSiguiente}
        />
      </div>
    </div>
  );
}
