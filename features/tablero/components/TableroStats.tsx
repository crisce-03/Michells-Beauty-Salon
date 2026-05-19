type Props = {
  citasHoy: number;
  horariosDisponibles: number;
  serviciosActivos: number;
};

export default function TableroStats({ citasHoy, horariosDisponibles, serviciosActivos }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">

      {/* Citas Hoy */}
      <div className="rounded-xl border border-border-dark bg-surface-dark p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-primary/10 p-3 text-primary">
            <span className="material-symbols-outlined">event_available</span>
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted">Citas de Hoy</p>
            <p className="text-2xl font-bold text-cream-label">{citasHoy}</p>
          </div>
        </div>
      </div>

      {/* Servicios Activos */}
      <div className="rounded-xl border border-border-dark bg-surface-dark p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-primary/10 p-3 text-primary">
            <span className="material-symbols-outlined">spa</span>
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted">Servicios Activos</p>
            <p className="text-2xl font-bold text-cream-label">{serviciosActivos}</p>
          </div>
        </div>
      </div>

       {/* Horarios Disponibles Hoy */}
      <div className="rounded-xl border border-border-dark bg-surface-dark p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-primary/10 p-3 text-primary">
            <span className="material-symbols-outlined">schedule</span>
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted">Horarios Disponibles Hoy</p>
            <p className="text-2xl font-bold text-cream-label">{horariosDisponibles}</p>
          </div>
          
        </div>
      </div>

    </div>
  );
}