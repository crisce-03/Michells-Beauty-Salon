type Props = {
  filtroCategoria: string;
  setFiltroCategoria: (value: string) => void;

  filtroEstado: string;
  setFiltroEstado: (value: string) => void;
   setPaginaActual: (value: number) => void;
}

export default function ServiciosFilters({ filtroCategoria, setFiltroCategoria, filtroEstado, setFiltroEstado, setPaginaActual }: Props) {
  return (
         <div className="flex flex-col gap-4 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-border-dark">
          <div className="relative max-w-sm flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-text-muted text-[20px]">
              search
            </span>
            <input
              className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-surface-input dark:border-border-dark dark:text-cream-label dark:placeholder-text-muted/70"
              placeholder="Buscar servicio por nombre..."
              type="text"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select
                value={filtroCategoria}
                onChange={(e) => {
                  setFiltroCategoria(e.target.value);
                  setPaginaActual(1);
                }}
                className="appearance-none cursor-pointer rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm font-medium text-gray-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-surface-input dark:border-border-dark dark:text-cream-label"
              >
                <option value="Todas">Categoría: Todas</option>
                <option value="Cabello">Cabello</option>
                <option value="Uñas">Uñas</option>
                <option value="Maquillaje">Maquillaje</option>
                <option value="Piel">Piel</option>
                <option value="Barba">Barba</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 dark:text-primary text-[20px]">
                expand_more
              </span>
            </div>
            <div className="relative">
              <select
                value={filtroEstado}
                onChange={(e) => {
                  setFiltroEstado(e.target.value);
                  setPaginaActual(1);
                }}
                className="appearance-none cursor-pointer rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm font-medium text-gray-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-surface-input dark:border-border-dark dark:text-cream-label"
              >
                <option value="Todos">Estado: Todos</option>
                <option value="Activo">Estado: Activos</option>
                <option value="Inactivo">Inactivos</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 dark:text-primary text-[20px]">
                expand_more
              </span>
            </div>
          </div>
        </div>
  );
}