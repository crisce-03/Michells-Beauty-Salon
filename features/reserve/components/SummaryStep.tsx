"use client"

import ResumenServiceSelected from "../components/Atomos/ResumenServiceSelected";
import { Service } from "../../servicios/types/servicio.types";
import { PersonalData } from "../types/reserva.types";



interface SummaryStepProps {
  onBack: () => void;
  onSave?: () => void; 
  selectedServices: Service[];
  totalPrice: number;
  selectedDate: Date;
  selectedTime: string | null;
  personalData: PersonalData;
}

export default function SummaryStep({ onBack, onSave, selectedServices, totalPrice, selectedDate, selectedTime, personalData }: SummaryStepProps) { 
  return (
    <div className="w-full max-w-[800px] mx-auto p-4 md:p-8">
      
      <div className="bg-white dark:bg-[#2c2616] border border-gray-200 dark:border-[#38311b] rounded-2xl overflow-hidden shadow-2xl">
        
        {/* CABECERA VISUAL */}
        <div className="h-28 w-full relative bg-gray-50 dark:bg-surface-dark flex items-center justify-center border-b border-gray-200 dark:border-[#38311b]">
          <div className="absolute bottom-4 left-6">
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Confirmación de Cita
            </h3>
            <p className="text-sm text-slate-500 dark:text-gray-400 font-medium">
              Verifica los detalles antes de registrar en el sistema
            </p>
          </div>
        </div>
        
        {/* DETALLES DE LA CITA */}
        <div className="p-6 md:p-8 space-y-6 bg-white dark:bg-surface-dark">
          
          {/* CONTENEDOR EN DOS COLUMNAS (GRID) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* COLUMNA IZQUIERDA: Servicios (Ocupa toda la altura de la columna) */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 bg-surface-dark  border-gray-100 dark:border-white/5 h-full">
              <div className="p-3 bg-white dark:bg-[#2c2616] rounded-lg text-primary shadow-sm shrink-0">
                <span className="material-symbols-outlined">content_cut</span>
              </div>
              <div className="w-full">
                <p className="text-[10px] text-slate-500 dark:text-[#cbbc90] uppercase tracking-widest font-bold mb-3">
                  Servicios a Agendar
                </p>
                <div className="space-y-3">
                  {selectedServices.map((s) => (
                    <ResumenServiceSelected key={s.id} service={s} />
                  ))}
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: Fecha/Hora y Datos del Cliente */}
            <div className="flex flex-col gap-4">
              
              {/* Bloque Fecha y Hora */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 bg-surface-dark  border-gray-100 dark:border-white/5">
                <div className="p-3 bg-white dark:bg-[#2c2616] rounded-lg text-primary shadow-sm shrink-0">
                  <span className="material-symbols-outlined">event</span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-[#cbbc90] uppercase tracking-widest font-bold mb-1">
                    Fecha y Hora
                  </p>
                  <p className="font-bold text-slate-900 dark:text-white text-lg">
                    {selectedDate.toLocaleDateString()} {selectedTime}
                  </p>
                </div>
              </div>

              {/* Bloque Datos Cliente */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 bg-surface-dark  border-gray-100 dark:border-white/5">
                <div className="p-3 bg-white dark:bg-[#2c2616] rounded-lg text-primary shadow-sm shrink-0">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-[#cbbc90] uppercase tracking-widest font-bold mb-1">
                    Datos del Cliente
                  </p>
                  <p className="font-bold text-slate-900 dark:text-white text-lg">
                    {personalData.nombre}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-gray-400 mt-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">call</span>
                    {personalData.telefono}
                  </p>
                </div>
              </div>

            </div>
          </div>
          
          <hr className="border-gray-200 dark:border-[#38311b]"/>
          
          {/* Bloque Costo */}
          <div className="flex justify-between items-center bg-primary/5 p-4 rounded-xl border border-primary/10">
            <span className="font-bold text-slate-700 dark:text-gray-300">Costo Estimado</span>
            <span className="font-black text-2xl text-primary">${totalPrice.toFixed(2)}</span>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
            <button 
              onClick={onBack} 
              className="w-full sm:w-auto min-w-[140px] p-3 rounded-xl border border-gray-300 dark:border-[#38311b] text-slate-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#38311b]/50 font-bold transition-all duration-300 flex items-center justify-center gap-2" 
              type="button"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Volver
            </button>
            
            <button 
              onClick={onSave} 
              className="w-full sm:w-auto min-w-[200px] p-3 rounded-xl bg-primary text-background-dark font-black shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">save</span>
              <span>Guardar Cita</span>
            </button>
          </div>
          
        </div>
      </div>
      
    </div>
  );
}