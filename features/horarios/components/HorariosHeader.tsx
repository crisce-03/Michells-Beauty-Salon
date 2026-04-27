import Link from "next/link";

type Props = {
  guardarCambios: () => void;
  onVerHistorial?: () => void;
  loading?: boolean;
}


export default function HorariosHeader({guardarCambios, onVerHistorial, loading}: Props) {
  return (
    <div className="space-y-4">
            <nav className="flex text-sm text-gray-500 dark:text-text-muted">
              <Link
                href="/dashboardAdmin"
                className="hover:text-primary transition-colors"
              >
                Configuración
              </Link>
              <span className="mx-2 text-primary">/</span>
              <span className="text-gray-900 font-medium dark:text-primary">
                Gestión de Horarios
              </span>
            </nav>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-cream-label">
                  Horarios Disponibles
                </h2>
                <p className="text-gray-500 dark:text-text-muted mt-1">
                  Defina los turnos de apertura, cierre y descansos semanales.
                </p>
              </div>
              <div className="flex gap-3">
                <button 
                onClick={onVerHistorial}
                className="inline-flex items-center justify-center rounded-lg border border-primary px-5 py-2.5 text-sm font-bold text-primary hover:bg-primary/10 transition-all gap-2">
                  <span className="material-symbols-outlined text-[20px]">
                    history
                  </span>
                  Ver Historial
                </button>
                <button 
                onClick={guardarCambios}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-luxury-black shadow-lg shadow-primary/20 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all gap-2">
                  <span className="material-symbols-outlined text-[20px]">
                    save
                  </span>
                  Guardar Cambios
                </button>
              </div>
            </div>
        
        </div>
  );
}