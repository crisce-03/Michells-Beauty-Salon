import {StatCard} from "@/components/ui/StatCard";

export default function ServiciosStats({totalServicios, activos, inactivos}: {totalServicios: number, activos: number, inactivos: number}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
              icon="content_cut"
              title="Total Servicios"
              value={totalServicios}
              iconBgClass="bg-yellow-50"
              iconColorClass="text-yellow-600"
            />
            <StatCard
              icon="category"
              title="Activos"
              value={activos}
              iconBgClass="bg-amber-50"
              iconColorClass="text-amber-600"
            />
            <StatCard
              icon="category"
              title="Inactivos"
              value={inactivos}
              iconBgClass="bg-green-50"
              iconColorClass="text-green-600"
            />
          </div>
  );
}