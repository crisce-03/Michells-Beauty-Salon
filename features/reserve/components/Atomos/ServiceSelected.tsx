import { Service } from "../../../servicios/types/servicio.types";

interface ServiceSelectedProps {
  service: Service; 
  onRemove: (id: number | string) => void; 
}

export default function ServiceSelected({ service, onRemove }: ServiceSelectedProps) {
  return (
    <div className="flex justify-between items-center group p-2 rounded-lg hover:bg-white/5 transition-colors">
      <div className="flex flex-col">
        <p className="text-white font-medium text-sm md:text-base">
          {service.nombre}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <p className="text-primary font-bold text-sm md:text-base">
          ${(Number(service.precio)).toFixed(2)}
        </p>
        
        <button 
          onClick={() => onRemove(service.id)}
          className="material-symbols-outlined text-gray-500 hover:text-red-500 transition-colors text-xl"
          title="Eliminar servicio"
        >
          delete
        </button>
      </div>
    </div>
  );
}