import { Cita } from "@/features/citas/types/cita.types";

const CIRCUMFERENCE = 2 * Math.PI * 40; // 251.2

export default function EstadoCitas({ citas }: { citas: Cita[] }) {
  const total = citas.length;

  // Conteo por estado
  const confirmadas = citas.filter((c) => c.estado === "CONFIRMADA").length;
  const pendientes  = citas.filter((c) => c.estado === "PENDIENTE").length;
  const completadas = citas.filter((c) => c.estado === "COMPLETADA").length;
  const canceladas  = citas.filter((c) => c.estado === "CANCELADA").length;

  // Porcentajes
  const pct = (n: number) => (total === 0 ? 0 : (n / total) * 100);

  // Arcos SVG — cada segmento tiene dasharray y dashoffset calculados
  const segmentos = [
    { label: "Confirmadas", count: confirmadas, color: "#f2b90d",  tailwind: "bg-primary"      },
    { label: "Pendientes",  count: pendientes,  color: "#eab308",  tailwind: "bg-yellow-500"   },
    { label: "Completadas", count: completadas, color: "#22c55e",  tailwind: "bg-green-500"    },
    { label: "Canceladas",  count: canceladas,  color: "#ef4444",  tailwind: "bg-red-500"      },
  ];

  // Calculamos offset acumulado para cada segmento
  let acumulado = 0;
  const segmentosConOffset = segmentos.map((seg) => {
    const dasharray = (seg.count / (total || 1)) * CIRCUMFERENCE;
    const dashoffset = -acumulado;
    acumulado += dasharray;
    return { ...seg, dasharray, dashoffset };
  });

  return (
    <div className="rounded-xl border border-border-dark bg-surface-dark p-6 flex flex-col">
      <div className="mb-6">
        <h3 className="font-bold text-cream-label">Estado de Citas</h3>
        <p className="text-xs text-text-muted">Distribución este mes</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        {/* Dona */}
        <div className="relative w-44 h-44">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Fondo */}
            <circle
              cx="50" cy="50" fill="none" r="40"
              stroke="rgba(242,185,13,0.1)" strokeWidth="12"
            />
            {total === 0 ? (
              // Si no hay citas, mostramos el círculo vacío
              <circle
                cx="50" cy="50" fill="none" r="40"
                stroke="rgba(242,185,13,0.1)" strokeWidth="12"
              />
            ) : (
              segmentosConOffset.map((seg) => (
                <circle
                  key={seg.label}
                  cx="50" cy="50" fill="none" r="40"
                  stroke={seg.color}
                  strokeWidth="12"
                  strokeDasharray={`${seg.dasharray} ${CIRCUMFERENCE - seg.dasharray}`}
                  strokeDashoffset={seg.dashoffset}
                />
              ))
            )}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-cream-label">{total}</span>
            <span className="text-[10px] text-text-muted uppercase tracking-tighter">Total</span>
          </div>
        </div>

        {/* Leyenda */}
        <div className="w-full space-y-2.5">
          {segmentos.map(({ label, count, tailwind }) => (
            <div key={label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${tailwind}`} />
                <span className="text-xs text-cream-label">{label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-muted">{count}</span>
                <span className="text-xs font-bold text-primary w-8 text-right">
                  {total === 0 ? "0%" : `${Math.round(pct(count))}%`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}