
type Props={
    ingresos:number;
    ticketPromedio:number;
    citasCompletadas:number;
    citasCanceladas:number;
}

export default function EstadisticasStats({ingresos,ticketPromedio,citasCompletadas,citasCanceladas}:Props) {
    console.log(ingresos,ticketPromedio,citasCompletadas,citasCanceladas);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl border border-border-dark bg-surface-dark p-6">
        <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">
          Ingresos Brutos
        </p>
        <div className="flex items-end gap-3">
          <h3 className="text-3xl font-bold text-cream-label">${ingresos.toFixed(2)}</h3>
        </div>
      </div>
      <div className="rounded-xl border border-border-dark bg-surface-dark p-6">
        <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">
          Ticket Promedio
        </p>
        <div className="flex items-end gap-3">
          <h3 className="text-3xl font-bold text-cream-label">${ticketPromedio.toFixed(2)}</h3>
        </div>
      </div>
      <div className="rounded-xl border border-border-dark bg-surface-dark p-6">
        <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">
          Citas Completadas
        </p>
        <div className="flex items-end gap-3">
          <h3 className="text-3xl font-bold text-cream-label">{citasCompletadas}</h3>
        </div>
      </div>
      <div className="rounded-xl border border-border-dark bg-surface-dark p-6">
        <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">
          Cancelaciones
        </p>
        <div className="flex items-end gap-3">
          <h3 className="text-3xl font-bold text-cream-label">{citasCanceladas}</h3>
        </div>
      </div>
    </div>
  );
}
