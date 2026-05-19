import { ServicioPorIngreso } from "@/features/estadisticas/types/servicioPorIngreso";

// 1. Correctly define the props interface
interface ServiciosPorIngresoProps {
  servicios: ServicioPorIngreso[];
}

export default function ServiciosPorIngreso({ servicios }: ServiciosPorIngresoProps) {
  return (
    <div className="w-full bg-surface rounded-xl border border-border-dark overflow-hidden">
      
      {/* Header Section */}
      <div className="p-6 border-b border-border-dark flex justify-between items-center">
        <div>
          <h3 className="font-bold text-cream-label">
            Servicios Top por Ingresos
          </h3>
          <p className="text-xs text-text-muted mt-1">
            Los tratamientos más rentables del mes.
          </p>
        </div>
        <button className="text-sm font-bold text-primary hover:text-primary-light transition-colors">
          Ver catálogo
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-input text-xs uppercase text-primary border-b border-border-dark">
            <tr>
              <th className="px-6 py-4 font-bold tracking-wider">Servicio</th>
              <th className="px-6 py-4 font-bold tracking-wider text-center">
                Categoría
              </th>
              <th className="px-6 py-4 font-bold tracking-wider text-center">
                Citas Totales
              </th>
              <th className="px-6 py-4 font-bold tracking-wider text-right">
                Ingresos
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-dark">
            {servicios.map((service, index) => (
              <tr
                key={index}
                className="hover:bg-surface-input/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="font-bold text-cream-label flex items-center gap-2">
                    {service.nombre}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 uppercase tracking-widest">
                    {service.categoria}
                  </span>
                </td>
                <td className="px-6 py-4 text-center font-medium text-text-muted">
                  {service.citas}
                </td>
                <td className="px-6 py-4 text-right font-bold text-cream-label">
                  {service.ingresos}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}