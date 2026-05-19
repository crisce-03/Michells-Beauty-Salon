import { Service } from "../../servicios/types/servicio.types";
import { PersonalData } from "../../reserve/types/reserva.types";


export interface Cita{
  id: number;
  personalData: PersonalData;
  services: Service[];
  total: number;
  fecha: string;
  hora: string;
  observaciones: string;
  estado: string;
  id_horario: number;

  horario?: {
    id: number;
    estado: string;
    fecha_hora: string; // Aquí es donde viene el texto "2026-05-16T10:00:00..."
  };
}