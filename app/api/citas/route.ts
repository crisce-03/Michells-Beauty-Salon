import { supabase } from "@/lib/supabaseServer";
import { error } from "console";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // 1. Extraemos el 'id' de los parámetros de la URL (?id=10)
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // 2. Definimos la base de la consulta con todas las uniones (JOINs) necesarias
    let query = supabase.from("Citas").select(`
      *,
      horario:Horarios (*),
      servicios_detalle:Detalle_Citas (
        *,
        datos_servicio:Servicios (*)
      )
    `);

    // 3. SI VIENE UN ID: Filtramos por ese registro específico y usamos .single()
    if (id) {
      const { data, error } = await query.eq("id", id).single();

      if (error) {
        return Response.json({ error: "Cita no encontrada o error en la base de datos" }, { status: 404 });
      }
      return Response.json(data);
    }

    // 4. SI NO VIENE UN ID: Traemos todas las citas ordenadas
    const { data, error } = await query.order("id", { ascending: true });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data);

  } catch (error) {
    return Response.json({ error: "Error interno del servidor" }, { status: 500 });
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
        { error: "Falta el ID de la cita" },
        { status: 400 },
      );
    }

    // Usamos id_horario para que coincida con la tabla Citas de tu base de datos
    const { id_horario, estado, observaciones } = await req.json();

    // Creamos un objeto dinámico solo con los datos que se enviaron
    const updateData: any = {};
    if (id_horario !== undefined) updateData.id_horario = id_horario;
    if (estado !== undefined) updateData.estado = estado;
    if (observaciones !== undefined) updateData.observaciones = observaciones;

    if (Object.keys(updateData).length === 0) {
      return Response.json({ error: "No hay datos para actualizar" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("Citas")
      .update(updateData) // Pasamos el objeto dinámico
      .eq("id", id)
      .select();

    if (error) {
      return Response.json(
        { error: "Error al actualizar la cita" },
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
        { error: "Falta el ID de la cita" },
        { status: 400 },
      );
    }

    
    const { error: errorDetalles } = await supabase
      .from("Detalle_Citas")
      .delete()
      .eq("id_cita", id); // Asegúrate de que esta sea la columna correcta en Detalle_Citas

    if (errorDetalles) {
       console.log("Error al limpiar los detalles:", errorDetalles);
       // Decides si retornar error o continuar de todos modos
    }


    const { data, error } = await supabase
      .from("Citas")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      return Response.json(
        { error: "Error al eliminar la cita principal" },
        { status: 500 },
      );
    }

    return Response.json({ mensaje: "Cita Eliminada Correctamente", data });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}