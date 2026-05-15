import { Service } from "../../servicios/types/servicio.types";

export interface CitaBD{
  personalData: PersonalData;
  services: Service[];
  totalPrice: number;
  id_horario: number;
}

export interface PersonalData {
  fullname: string;
  email: string;
  phone: string;
  requests: string;
}

