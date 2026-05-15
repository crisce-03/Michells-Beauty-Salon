import { Service } from "../../../servicios/types/servicio.types";

interface Props {
  service: Service;
}

export default function ResumenServiceSelected({ service }: Props) {
  return (
    <div className="flex gap-4 items-start">
      <div className="size-16 rounded-lg bg-surface-input border border-border-dark overflow-hidden flex-shrink-0">
        <img
          alt={service.nombre}
          className="object-cover w-full h-full opacity-80"
          src={service.image_url ?? ""}
        />
      </div>
      <div>
        <h4 className="text-white font-semibold">{service.nombre}</h4>
        <p className="text-text-muted text-sm mt-1">
          {service.duracion} min • {service.categoria}
        </p>
        <p className="text-primary font-bold mt-1">${service.precio}</p>
      </div>
    </div>
  );
}