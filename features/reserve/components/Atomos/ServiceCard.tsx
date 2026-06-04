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

  // 💡 Centralizamos la lógica para poder usarla al hacer click en toda la tarjeta
  const handleToggle = () => {
    if (isSelected) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
      setTotalPrice(totalPrice - Number(service.precio));
    } else {
      setSelectedServices([...selectedServices, service]);
      setTotalPrice(totalPrice + Number(service.precio));
    }
  };

  return (
    <div
      onClick={handleToggle}
      className={`group relative flex flex-row lg:flex-col gap-3 lg:gap-4 rounded-xl border ${
        isSelected ? "border-primary" : "border-[#333]"
      } bg-[#1a1a1a] p-3 lg:p-4 hover:border-primary transition-all shadow-none hover:shadow-[0_0_15px_rgba(242,185,13,0.15)] overflow-hidden cursor-pointer items-center lg:items-stretch h-24 lg:h-auto`}
    >
      {/* ===== BOTÓN ESCRITORIO (Flotante) ===== */}
      <div className="hidden lg:block absolute top-4 right-4 z-10">
        <div className="rounded-full bg-black/40 backdrop-blur-md p-1.5 text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <span
            className={`material-symbols-outlined text-lg text-white p-1.5 rounded-full ${
              isSelected ? "bg-green-500" : "bg-primary"
            }`}
          >
            {isSelected ? "done" : "add"}
          </span>
        </div>
      </div>

      {/* ===== IMAGEN: Pequeña (móvil) / Grande (Desktop) ===== */}
      <div className="overflow-hidden rounded-lg size-16 lg:w-full lg:h-60 shrink-0">
        {service.image_url ? (
          <img
            src={service.image_url}
            alt={`Imagen de ${service.nombre}`}
            className="w-full h-full object-cover border border-[#333] shadow-sm transform group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-[#222] flex items-center justify-center border border-[#333] rounded-lg">
            <span className="material-symbols-outlined text-gray-500 text-2xl lg:text-4xl">
              image
            </span>
          </div>
        )}
      </div>

      {/* ===== CONTENIDO: Alineado al centro (móvil) / Apilado (Desktop) ===== */}
      <div className="flex flex-col gap-0.5 lg:gap-2 flex-1 min-w-0 justify-center">
        <div className="flex flex-col lg:flex-row justify-between lg:items-start">
          <h2 className="text-white text-sm lg:text-lg font-bold leading-tight group-hover:text-primary transition-colors truncate lg:whitespace-normal">
            {service.nombre}
          </h2>
          {/* Precio: Abajo del título en móvil, a la derecha en PC */}
          <span className="text-primary font-bold text-base lg:text-lg">
            ${service.precio}
          </span>
        </div>

        <div className="flex items-center gap-1.5 mt-0.5 lg:mt-auto lg:pt-2 text-[11px] lg:text-xs text-[#666] font-medium">
          <span className="material-symbols-outlined text-[14px] lg:text-base">
            schedule
          </span>
          {service.duracion} min
        </div>
      </div>

      {/* ===== BOTÓN MÓVIL (Fijo a la derecha) ===== */}
      <div className="lg:hidden shrink-0 flex items-center justify-center pl-2">
        <div
          className={`flex items-center justify-center size-8 rounded-full border ${
            isSelected
              ? "bg-green-500/20 border-green-500 text-green-500"
              : "bg-primary/20 border-primary text-primary"
          }`}
        >
          <span className="material-symbols-outlined text-lg">
            {isSelected ? "done" : "add"}
          </span>
        </div>
      </div>
    </div>
  );
}