import { Service } from "../../servicios/types/servicio.types";

export interface CitaBD{
  personalData: PersonalData;
  services: Service[];
  totalPrice: number;
  id_horario: number;
}

export interface PersonalData {
  nombre: string;
  telefono: string;
  correo: string;
  observaciones: string;
}

