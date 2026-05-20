import { Service } from "../../../servicios/types/servicio.types";

export default function ServiceCard({
  service,
  setSelectedServices,
  selectedServices,
  totalPrice,
  setTotalPrice,
}: {
  service: Service;
  setSelectedServices: (services: Service[]) => void;
  selectedServices: Service[];
  totalPrice: number;
  setTotalPrice: (price: number) => void;
}) {
  const isSelected = selectedServices.some((s) => s.id === service.id);
  return (
    <div className="group relative flex flex-col gap-4 rounded-xl border border-[#333] bg-[#1a1a1a] p-4 hover:border-primary transition-all shadow-none hover:shadow-[0_0_15px_rgba(242,185,13,0.15)] overflow-hidden cursor-pointer">
      <div className="absolute top-4 right-4 z-10">
        {!isSelected && (
          <div className="rounded-full bg-black/40 backdrop-blur-md p-1.5 text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            <span
              onClick={() => {
                setSelectedServices([...selectedServices, service]);
                setTotalPrice(totalPrice + Number(service.precio));
              }}
              className="material-symbols-outlined text-lg bg-primary text-white p-1.5 rounded-full"
            >
              add
            </span>
          </div>
        )}
        {isSelected && (
          <div className="rounded-full bg-black/40 backdrop-blur-md p-1.5 text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            <span
              onClick={() => {
                setSelectedServices(
                  selectedServices.filter((s) => s.id !== service.id),
                );
                setTotalPrice(totalPrice - Number(service.precio));
              }}
              className="material-symbols-outlined text-lg bg-green-500 text-white p-1.5 rounded-full"
            >
              done
            </span>
          </div>
        )}
      </div>
      <div className="overflow-hidden rounded-lg w-full h-60 shrink-0">
        {service.image_url ? (
          <img
            src={service.image_url}
            alt={`Imagen de ${service.nombre}`}
            className="w-full h-full object-cover border border-border-dark shadow-sm transform group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center border border-border-dark rounded-lg">
            <span className="material-symbols-outlined text-gray-400 text-3xl">
              image
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex justify-between items-start">
          <h2 className="text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">
            {service.nombre}
          </h2>
          <span className="text-primary font-bold text-lg">
            ${service.precio}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-auto pt-2 text-xs text-[#666] font-medium">
          <span className="material-symbols-outlined text-base">schedule</span>
          {service.duracion} min
        </div>
      </div>
    </div>
  );
}
