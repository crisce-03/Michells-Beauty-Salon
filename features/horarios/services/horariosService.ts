export const getHorarios = async () => {
  const res = await fetch("/api/horarios");

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Error al obtener horarios");
  }

  return data;
};

export const createHorarios = async ({ inicioSemana, finSemana, horarios }: { inicioSemana: string; finSemana: string; horarios: any[] }) => {
  const res = await fetch("/api/horarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inicioSemana, finSemana, horarios }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Error al guardar horarios");
  }

  return data;
};