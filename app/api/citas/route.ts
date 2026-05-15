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

    const { 
      nombre, 
      telefono, 
      correo, 
      id_horario, 
      total, 
      observaciones, 
      servicios 
    } = body;

    // Llamamos a la función de la base de datos pasando los parámetros exactos
    const { data: id_cita_creada, error } = await supabase.rpc('crear_cita_con_detalles', {
      p_nombre: nombre,
      p_telefono: telefono,
      p_correo: correo,
      p_id_horario: id_horario,
      p_total: total,
      p_observaciones: observaciones,
      p_servicios: servicios // El arreglo viaja directamente como JSON
    });

    if (error) {
      console.error("Error al ejecutar RPC en Supabase:", error);
      return Response.json(
        { error: "Error al registrar la cita y los servicios" },
        { status: 500 }
      );
    }

    // Si todo va bien, data contiene el ID de la cita que retornó la función SQL
    return Response.json({
      success: true,
      message: "Cita y detalles creados con éxito de forma transaccional",
      cita_id: id_cita_creada
    });

  } catch (error) {
    console.error("Server Error:", error);
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
