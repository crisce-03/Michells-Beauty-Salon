import { Service } from "../../servicios/types/servicio.types";
import { PersonalData } from "../../reserve/types/reserva.types";


export interface Cita{
  personalData: PersonalData;
  services: Service[];
  totalPrice: number;
  fecha_hora: string;
}