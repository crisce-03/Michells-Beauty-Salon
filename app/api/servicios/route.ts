import {supabase}  from "@/lib/supabaseServer";
import { error } from "console";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest) {

    try{
        const {nombre,categoria,precio,estado,duracion}=await req.json();

        if(!nombre || !categoria || !precio || !estado){
            return Response.json({error: "Datos Nesecerios"}, {status:400});
        }

        const duracionFinal = duracion === "" ? null : duracion;

        const {data,error} =await supabase.from("Servicios").insert({
            nombre,
            categoria,
            precio,
            estado,
            duracion: duracionFinal
        }).select();

        if(error){
            return Response.json({error: error.message}, {status:500});
        }

        return Response.json(data);
    }catch(error){
        console.log(error);
        return Response.json({error: "Server Error"} ,{status:500});
    }
    
}