import {supabase}  from "@/lib/supabaseServer";
import { error } from "console";
import { NextRequest } from "next/server";

export async function GET() {
    
    try{
        const {data,error} = await supabase
        .from("Servicios")
        .select("*")
        .order("id",{ascending: true});

        if(error){
            return Response.json({error: "Error al obtener los servicios"}, {status:500});  
        }

        return Response.json(data);
    }catch(error){
        console.log(error);
        return Response.json({error: "Server Error"},{status:500});
    }
}

export async function POST(req:NextRequest) {

    try{
        const {nombre,categoria,precio,estado,duracion}=await req.json();

        if(!nombre || !categoria || !precio || !estado){
            return Response.json({error: "Datos Necesarios"}, {status:400});
        }

        const duracionFinal = duracion === "" ? null : duracion;

        const {data,error} =await supabase
        .from("Servicios")
        .insert({
            nombre,
            categoria,
            precio,
            estado,
            duracion: duracionFinal
        }).select();

        if(error){
            return Response.json({error: "Error al insertar el servicio"}, {status:500});
        }

        
        return Response.json(data);
    }catch(error){
        console.log(error);
        return Response.json({error: "Server Error"} ,{status:500});
    }
    
}

export async function PUT(req:NextRequest){

    try{
            const {searchParams} = new URL(req.url);
        const id= searchParams.get("id");

        if(!id){
            return Response.json({error: "Falta el ID del servicio"},{status:400});
        }

        const {nombre,categoria,precio,estado,duracion}=await req.json();

        if(!nombre || !categoria || !precio || !estado){
            return Response.json({error: "Datos Necesarios"}, {status:400});
        }

        const duracionFinal = duracion === "" ? null : duracion;

        const {data,error} =await supabase
        .from("Servicios")
        .update({
            nombre,
            categoria,
            precio,
            estado,
            duracion: duracionFinal
        })
        .eq("id",id)
        .select();

        if(error){
            return Response.json({error: "Error al actualizar el servicio"}, {status:500});
        }

        return Response.json(data);

    }catch(error){
        console.log(error);
        return Response.json({error: "Server Error"} ,{status:500});
    }
    
}

export async function DELETE(req:NextRequest) {
    
    try{
        const {searchParams} = new URL(req.url);
        const id= searchParams.get("id");

        if(!id){
            return Response.json({error: "Falta el ID del servicio"},{status:400});
        }

        const {data,error} = await supabase
        .from("Servicios")
        .delete()
        .eq("id",id)
        .select();

        if(error){
            return Response.json({error: "Error al eliminar el servicio"},{status:500});
        }

        return Response.json({mensaje: "Servicio eliminado correctamente" ,data});
    }catch(error){
        console.log(error);
        return Response.json({error: "Server Error"},{status:400});
    }
    
}