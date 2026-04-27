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

    const { error: deleteError } = await supabase
      .from("Horarios")
      .delete()
      .gte("fecha_hora", inicioSemana)
      .lte("fecha_hora", finSemana);

    if (deleteError) {
      return Response.json(
        { error: "Error al limpiar horarios" },
        { status: 500 },
      );
    }

    const { data, error } = await supabase.from("Horarios").insert(horarios);

    if (error) {
      return Response.json(
        { error: "Error al insertar horarios" },
        { status: 500 },
      );
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
