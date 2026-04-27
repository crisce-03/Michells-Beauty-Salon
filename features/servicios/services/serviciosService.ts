// services/serviciosService.ts

export const getServicios = async () => {
  const res = await fetch("/api/servicios");
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al obtener servicios");
  return data;
};

export const createServicio = async (formData: any) => {
  const res = await fetch("/api/servicios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al crear servicio");
  return data;
};

export const updateServicio = async (id: number, dataUpdate: any) => {
  const res = await fetch(`/api/servicios?id=${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataUpdate),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al actualizar servicio");
  return data;
};

export const deleteServicio = async (id: number) => {
  const res = await fetch(`/api/servicios?id=${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al eliminar servicio");
  return data;
};