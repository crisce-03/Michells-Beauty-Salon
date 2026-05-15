import { Service } from "../../../servicios/types/servicio.types";
import ResumenServiceSelected from "./ResumenServiceSelected";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Props {
  selectedServices: Service[];
  totalPrice: number;
  selectedDate: Date;
  selectedTime: string | null;
}

export default function ResumenCard({
  selectedServices,
  totalPrice,
  selectedDate,
  selectedTime,
}: Props) {
  return (
    <div className="bg-surface-dark border border-border-dark rounded-2xl p-6 shadow-lg sticky top-24">
      <h3 className="text-xl font-serif text-white mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">receipt_long</span>
        Resumen de Cita
      </h3>

      <div className="space-y-6">
        {/* Servicios */}
        <div className="space-y-4">
          {selectedServices.map((s) => (
            <ResumenServiceSelected key={s.id} service={s} />
          ))}
        </div>

        <hr className="border-border-dark/50" />

        {/* Fecha y hora */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <span className="material-symbols-outlined text-xl">calendar_month</span>
            </div>
            <div className="flex flex-col">
              <span className="text-text-muted text-xs">Fecha</span>
              <span className="text-white font-medium">
                {format(selectedDate, "EEEE, d MMM yyyy", { locale: es })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <span className="material-symbols-outlined text-xl">schedule</span>
            </div>
            <div className="flex flex-col">
              <span className="text-text-muted text-xs">Hora</span>
              <span className="text-white font-medium">
                {selectedTime ? selectedTime : "No seleccionada"}
              </span>
            </div>
          </div>
        </div>

        <hr className="border-border-dark/50" />

        {/* Total */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-white text-lg font-bold">Total a Pagar</span>
          <span className="text-2xl font-serif text-primary font-bold">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}