"use client";

import { useEffect, useState, useMemo } from "react";
import { Cita } from "@/features/citas/types/cita.types";
import { Service } from "@/features/servicios/types/servicio.types";

import { getCitas } from "@/features/citas/services/citasService";
import { getServicios } from "@/features/servicios/services/serviciosService";
import { ServicioPorIngreso } from "@/features/estadisticas/types/servicioPorIngreso";

export function useEstadisticas() {

  const [citas, setCitas] = useState<Cita[]>([]);
  const [serviciosCrudos, setServiciosCrudos] = useState<Service[]>([]);


  useEffect(() => {
    async function fetchData() {
      const [citasRes, serviciosRes] = await Promise.all([
        getCitas(),
        getServicios()
      ]);
      setCitas(citasRes);
      setServiciosCrudos(serviciosRes);
    }
    
    fetchData();
  }, []);

const estadisticas = useMemo(() => {
    let ingresosTotales = 0;
    let completadas = 0;
    let canceladas = 0;

    const statsPorServicio: Record<number, { citas: number; ganancia: number }> = {};
    
    serviciosCrudos.forEach(servicio => {
      statsPorServicio[servicio.id] = { citas: 0, ganancia: 0 };
    });

    citas.forEach(cita => {
      const estadoCita = cita.estado?.toUpperCase();

      if (estadoCita === "CANCELADA") {
        // Si está cancelada, solo aumenta el contador de canceladas
        canceladas++;
      } else if (estadoCita === "COMPLETADA") {
        completadas++;
        
        const precioTotalCita = Number(cita.total) || 0;
        ingresosTotales += precioTotalCita;

        cita.services?.forEach((servicio: any) => {
          console.log(servicio);
          const idServicio = servicio.id_servicio; 
          
          const precioServicio = Number(servicio.precio) || 0;
          
          if (statsPorServicio[idServicio]) {
            statsPorServicio[idServicio].citas += 1;
            statsPorServicio[idServicio].ganancia += precioServicio;
          } else {
            statsPorServicio[idServicio] = { 
                citas: 1, 
                ganancia: precioServicio 
            };
          }
        });
      }
    });

    console.log(statsPorServicio);

    const ticketPromedioCalc = completadas > 0 ? (ingresosTotales / completadas) : 0;

    

    const serviciosOrdenados = [...serviciosCrudos].sort((a, b) => {
      const ingresoA = statsPorServicio[a.id]?.ganancia || 0;
      const ingresoB = statsPorServicio[b.id]?.ganancia || 0;
      return ingresoB - ingresoA; 
    });

    const serviciosTransformados = serviciosOrdenados.map(servicio => {
      const stats = statsPorServicio[servicio.id];
      
      return {
        id: servicio.id,
        nombre: servicio.nombre,
        categoria: servicio.categoria,
        citas: stats.citas, 
        ingresos: `$${stats.ganancia.toFixed(2)}`,
      } as unknown as ServicioPorIngreso; 

       
    });
    console.log(serviciosTransformados);

    return {
      ingresos: ingresosTotales,
      ticketPromedio: ticketPromedioCalc,
      citasCompletadas: completadas,
      citasCanceladas: canceladas,
      servicios: serviciosTransformados
    };

  }, [citas, serviciosCrudos]);

 
  // Retornamos el objeto con todas las estadísticas ya calculadas
  return estadisticas;
}