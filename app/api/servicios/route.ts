import { supabase } from "@/lib/supabaseServer";
import { error } from "console";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("Servicios")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      return Response.json(
        { error: "Error al obtener los servicios" },
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
    const formData = await req.formData();

    const nombre = formData.get("nombre") as string;
    const categoria = formData.get("categoria") as string;
    const precio = formData.get("precio") as string;
    const estado = formData.get("estado") as string;
    const duracion = formData.get("duracion") as string;
    const image = formData.get("imagen") as File | null;

    if (!nombre || !categoria || !precio || !estado) {
      return Response.json({ error: "Datos Necesarios" }, { status: 400 });
    }

    let imageUrl = "";
    if (image && image.size > 0) {
      const fileBuffer = await image.arrayBuffer();

      const cleanFileName = image.name.replace(/[^a-zA-Z0-9.]/g, "_");
      const fileName = `${Date.now()}-${cleanFileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("Servicios")
        .upload(fileName, fileBuffer, {
          contentType: image.type,
          upsert: false,
        });

      if (uploadError) {
        return Response.json(
          { error: "Error al subir la imagen" },
          { status: 500 },
        );
      }

      const { data: publicUrlData } = supabase.storage
        .from("Servicios")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    const duracionFinal = duracion === "" ? null : duracion;

    const { data, error } = await supabase
      .from("Servicios")
      .insert({
        nombre,
        categoria,
        precio,
        estado,
        duracion: duracionFinal,
        image_url: imageUrl,
      })
      .select();

    if (error) {
      return Response.json(
        { error: "Error al insertar el servicio" },
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

    const formData = await req.formData();

    const nombre = formData.get("nombre") as string;
    const categoria = formData.get("categoria") as string;
    const precio = formData.get("precio") as string;
    const estado = formData.get("estado") as string;
    const duracion = formData.get("duracion") as string;
    const image = formData.get("imagen") as File | null;

    if (!nombre || !categoria || !precio || !estado) {
      return Response.json({ error: "Datos Necesarios" }, { status: 400 });
    }
    const duracionFinal = duracion === "" ? null : duracion;
    const updateData: any = {
      nombre,
      categoria,
      precio,
      estado,
      duracion: duracionFinal,
    };

    if (image && image.size > 0) {
      const fileBuffer = await image.arrayBuffer();
      const fileName = `${Date.now()}-${image.name}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("Servicios")
        .upload(fileName, fileBuffer, {
          contentType: image.type,
          upsert: false,
        });

      if (uploadError) {
        return Response.json(
          { error: "Error al subir la imagen" },
          { status: 500 },
        );
      }

      const { data: publicUrlData } = supabase.storage
        .from("Servicios")
        .getPublicUrl(fileName);

      // Agregamos la nueva URL al objeto de actualización
      updateData.image_url = publicUrlData.publicUrl;
    }

    const { data, error } = await supabase
      .from("Servicios")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) {
      return Response.json(
        { error: "Error al actualizar el servicio" },
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
      .from("Servicios")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      return Response.json(
        { error: "Error al eliminar el servicio" },
        { status: 500 },
      );
    }

    return Response.json({ mensaje: "Servicio eliminado correctamente", data });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Server Error" }, { status: 400 });
  }
}
