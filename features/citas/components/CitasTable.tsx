import { Cita } from "../types/cita.types";
import { useRouter } from "next/navigation";

type Props = {
  citas: Cita[];
  paginaActual: number;
  totalPaginas: number;
  irPaginaSiguiente: () => void;
  irPaginaAnterior: () => void;

  totalItems: number;
  itemsPorPagina: number;
  onEdit: (cita: Cita) => void;
};

export default function CitasTable({
  citas,
  paginaActual,
  totalPaginas,
  irPaginaSiguiente,
  irPaginaAnterior,
  totalItems,
  itemsPorPagina,
  onEdit,
}: Props) {
  const router = useRouter();
  console.log(citas);

  const indiceInicio = (paginaActual - 1) * itemsPorPagina;
  const indiceFin = paginaActual * itemsPorPagina;
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden dark:bg-surface-dark dark:border-border-dark">
      {/* Filtros */}
      <div className="flex flex-col gap-4 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-border-dark">
        <div className="relative max-w-sm flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-text-muted text-[20px]">
            search
          </span>
          <input
            className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-surface-input dark:border-border-dark dark:text-cream-label dark:placeholder-text-muted/70"
            placeholder="Buscar cliente..."
            type="text"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-surface-input dark:border-border-dark dark:text-primary dark:hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined text-[20px]">
                filter_list
              </span>{" "}
              Filtrar
            </button>
          </div>
          <div className="relative">
            <select className="appearance-none cursor-pointer rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm font-medium text-gray-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-surface-input dark:border-border-dark dark:text-cream-label">
              <option>Estado: Todos</option>
              <option>Confirmado</option>
              <option>Pendiente</option>
              <option>Cancelado</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 dark:text-primary text-[20px]">
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* Datos de la Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-cream-label">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-surface-input dark:text-primary border-b dark:border-border-dark">
            <tr>
              <th className="px-6 py-4 font-bold tracking-wider" scope="col">
                Cliente
              </th>
              <th className="px-6 py-4 font-bold tracking-wider" scope="col">
                Servicio
              </th>
              <th className="px-6 py-4 font-bold tracking-wider" scope="col">
                Fecha
              </th>
              <th className="px-6 py-4 font-bold tracking-wider" scope="col">
                Hora
              </th>
              <th className="px-6 py-4 font-bold tracking-wider" scope="col">
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
            {citas.map((cita) => (
              <tr
                key={cita.id}
                className="hover:bg-gray-50 dark:hover:bg-surface-input/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="font-medium text-gray-900 dark:text-cream-label">
                      {cita.personalData.nombre}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {/* 👇 Agregamos ", index" aquí en el map */}
                    {cita.services.map((servicio, index) => (
                      <span
                        // 👇 Combinamos el ID (o un respaldo) con el index de la posición
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

                <td className="px-6 py-4 text-center">
                  {cita.estado === "CONFIRMADA" ? (
                    <span className="inline-flex items-center rounded-full bg-primary/20 px-2 py-0.5 text-xs font-bold text-primary border border-primary/30">
                      Confirmada
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
                      onClick={() => router.push(`/reserve?editId=${cita.id}`)}
                      className="p-1.5 rounded text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        edit
                      </span>
                    </button>
                    <button className="p-1.5 rounded text-gray-400  btn-delete-hover transition-colors">
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

      {/* Paginación */}
      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 dark:border-border-dark">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-text-muted">
              Mostrando{" "}
              <span className="font-medium text-gray-900 dark:text-cream-label">
                {indiceInicio + 1}
              </span>{" "}
              a{" "}
              <span className="font-medium text-gray-900 dark:text-cream-label">
                {indiceFin}
              </span>{" "}
              de{" "}
              <span className="font-medium text-gray-900 dark:text-cream-label">
                {totalItems}
              </span>{" "}
              resultados
            </p>
          </div>
          <div>
            <nav
              aria-label="Pagination"
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            >
              <button
                onClick={irPaginaAnterior}
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
