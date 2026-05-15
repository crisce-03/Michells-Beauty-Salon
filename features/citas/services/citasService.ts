import { CitaBD } from "../../reserve/types/reserva.types";



export const createCita = async (payload: string) => {
  const res = await fetch("/api/citas", {
    method: "POST",
    body: payload,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al registrar cita");
  return data;
};
