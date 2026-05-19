import { supabase } from "@/lib/supabaseServer";
import { error } from "console";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("Horarios")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      return Response.json(
        { error: "Error al obtener los horarios" },
        { status: 500 },
      );
    }

    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { inicioSemana, finSemana, horarios } = body;

    // Normaliza a "YYYY-MM-DD HH:mm:ss" (sin T) para comparar siempre igual
    const normalizar = (fh: string) => fh.replace("T", " ");

    // 1. Traer los horarios de esta semana que existen en BD
    const { data: horariosExistentes, error: fetchError } = await supabase
      .from("Horarios")
      .select("id, fecha_hora")
      .gte("fecha_hora", `${inicioSemana} 00:00:00`)
      .lte("fecha_hora", `${finSemana} 23:59:59`);

    if (fetchError) {
      console.log("Fetch error:", fetchError);
      return Response.json({ error: "Error al leer horarios" }, { status: 500 });
    }

    const idsExistentes = horariosExistentes?.map((h) => h.id) ?? [];

    // 2. De esos, cuáles tienen citas
    let idsOcupados: number[] = [];
    let fechasOcupadas = new Set<string>();

    if (idsExistentes.length > 0) {
      const { data: citas } = await supabase
        .from("Citas")
        .select("id_horario")
        .in("id_horario", idsExistentes);

      idsOcupados = citas?.map((c) => c.id_horario) ?? [];

      // ✅ Normalizamos la T → espacio para que coincida con el payload
      fechasOcupadas = new Set(
        horariosExistentes
          ?.filter((h) => idsOcupados.includes(h.id))
          .map((h) => normalizar(h.fecha_hora)) ?? []
      );
    }

    // 3. Borrar todos los de la semana EXCEPTO los ocupados
    let deleteQuery = supabase
      .from("Horarios")
      .delete()
      .gte("fecha_hora", `${inicioSemana} 00:00:00`)
      .lte("fecha_hora", `${finSemana} 23:59:59`);

    if (idsOcupados.length > 0) {
      deleteQuery = deleteQuery.not("id", "in", `(${idsOcupados.join(",")})`);
    }

    const { error: deleteError } = await deleteQuery;

    if (deleteError) {
      console.log("Delete error:", deleteError);
      return Response.json({ error: "Error al limpiar horarios" }, { status: 500 });
    }

    if (horarios.length === 0) {
      return Response.json({ message: "Sin horarios que insertar" });
    }

    // 4. Insertar solo los que NO chocan con ocupados
    const horariosAInsertar = horarios.filter(
      (h: { fecha_hora: string }) => !fechasOcupadas.has(normalizar(h.fecha_hora))
    );

    if (horariosAInsertar.length === 0) {
      return Response.json({ message: "Nada nuevo que insertar" });
    }

    const { data, error: insertError } = await supabase
      .from("Horarios")
      .insert(horariosAInsertar);

    if (insertError) {
      console.log("Insert error:", insertError);
      return Response.json({ error: "Error al insertar horarios" }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json(
        { error: "Falta el ID del servicio" },
        { status: 400 },
      );
    }

    const { fecha_hora, estado } = await req.json();

    if (!fecha_hora || !estado) {
      return Response.json({ error: "Datos Necesarios" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("Horarios")
      .update({
        fecha_hora,
        estado,
      })
      .eq("id", id)
      .select();

    if (error) {
      return Response.json(
        { error: "Error al actualizar el horario" },
        { status: 500 },
      );
    }

    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json(
        { error: "Falta el ID del servicio" },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("Horarios")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      return Response.json(
        { error: "Error al eliminar el horario" },
        { status: 500 },
      );
    }

    return Response.json({ mensaje: "Horario Eliminado Correctamente", data });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}
