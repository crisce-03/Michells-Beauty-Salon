import { CitaBD } from "../../reserve/types/reserva.types";

export const getCitas = async () => {
  const res = await fetch("/api/citas");
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al obtener citas");
  return data;
};

export const createCita = async (payload: string) => {
  const res = await fetch("/api/citas", {
    method: "POST",
    body: payload,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al registrar cita");
  return data;
};


export const updateCita = async (id: number, payload: object) => {
  // Pasamos el ID por la URL, tal como lo espera tu backend
  const res = await fetch(`/api/citas?id=${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    // Convertimos el objeto de JavaScript a un string JSON
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al actualizar la cita");
  return data;
};

export const deleteCita = async (id: number) => {
  // Solo necesitamos pasar el ID por la URL, no lleva body
  const res = await fetch(`/api/citas?id=${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al eliminar la cita");
  return data;
};