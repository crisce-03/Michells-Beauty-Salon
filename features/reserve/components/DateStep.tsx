"use client";

import * as React from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  eachDayOfInterval,
  isBefore,
  startOfToday,
} from "date-fns";
import { es } from "date-fns/locale";

interface DateStepProps {
  onNext: () => void;
  onBack: () => void;

  // 1. CAMBIO: Recibir horariosBD en lugar de horarios
  horariosBD: any[]; 
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
}

export default function DateStep({
  onNext,
  onBack,
  horariosBD, // <-- 2. Usar horariosBD
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}: DateStepProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  // Lógica de generación de calendario
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const fechaStr = format(selectedDate, "yyyy-MM-dd");

  // 1. Obtenemos TODOS los turnos del día (ignorando solo el Marcador)
  // y los ordenamos cronológicamente.
  const turnosDelDia = horariosBD
    .filter((r) => r.fecha_hora.startsWith(fechaStr) && r.estado !== "Marcador")
    .sort((a, b) => a.fecha_hora.localeCompare(b.fecha_hora));

  // 2. Mapeamos evaluando el estado real (Activo vs Ocupado)
  const TIME_SLOTS = [...new Map(
    turnosDelDia.map((turno) => {
      const time = turno.fecha_hora.substring(11, 16);
      const hour = parseInt(time.split(":")[0]);
      
      return [time, {
        time,
        // 👇 AQUÍ ESTÁ LA MAGIA: Solo es 'available' si el estado es exactamente "Activo"
        available: turno.estado === "Activo", 
        period: hour < 12 ? "Mañana" : "Tarde",
      }];
    })
  ).values()];
  // =================================================
  // =================================================

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="w-full max-w-[1024px] mx-auto flex flex-col justify-center items-center gap-10 p-4 md:p-8">
      <div className="flex flex-col w-full lg:flex-row gap-8">
        {/* SECCIÓN CALENDARIO */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-white text-lg font-bold tracking-wide capitalize">
                {format(currentMonth, "MMMM yyyy", { locale: es })}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevMonth}
                  className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    chevron_left
                  </span>
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 mb-4">
              {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                <span
                  key={day}
                  className="text-gray-500 text-[10px] font-bold text-center uppercase tracking-widest py-2"
                >
                  {day}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-3 gap-x-2">
              {calendarDays.map((day, index) => {
                const isSelected = isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, monthStart);
                const isPast = isBefore(day, startOfToday());

                return (
                  <button
                    key={index}
                    disabled={isPast || !isCurrentMonth}
                    onClick={() => setSelectedDate(day)}
                    className={`aspect-square flex items-center justify-center rounded-full text-sm transition-all
                      ${!isCurrentMonth ? "text-gray-800 cursor-default" : ""}
                      ${isPast && isCurrentMonth ? "text-gray-700 cursor-not-allowed" : "text-gray-300 hover:bg-white/5 hover:text-primary"}
                      ${isSelected ? " text-black font-bold shadow-[0_0_15px_rgba(262,195,23,0.5)] scale-105 " : ""}
                    `}
                  >
                    {format(day, "d")}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECCIÓN HORARIOS */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 shadow-2xl h-full flex flex-col">
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
              <h3 className="text-white text-lg font-bold capitalize">
                {format(selectedDate, "eeee, d 'de' MMMM", { locale: es })}
              </h3>
              <div className="hidden sm:flex gap-4 text-[10px] uppercase tracking-wider font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-gray-400">Seleccionado</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar max-h-[400px]">
              {/* Mañana */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="col-span-full mb-3 mt-1 flex items-center gap-3">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Mañana
                  </span>
                  <span className="h-px flex-1 bg-white/10"></span>
                </div>
                {TIME_SLOTS.filter((s) => s.period === "Mañana").map(
                  (
                    { time, available },
                    index, 
                  ) => (
                    <button
                      key={`manana-${time}-${index}`} 
                      disabled={!available}
                      onClick={() => setSelectedTime(time)}
                      className={`relative flex items-center justify-center py-3 px-2 rounded border transition-all
        ${
          !available
            ? "bg-white/5 border-transparent text-gray-700 cursor-not-allowed"
            : selectedTime === time
              ? "border-primary bg-primary/10 text-primary font-bold"
              : "border-white/10 bg-black text-gray-300 hover:border-primary/50 hover:bg-primary/5"
        }`}
                    >
                      <span
                        className={
                          !available ? "line-through decoration-gray-700" : ""
                        }
                      >
                        {time}
                      </span>
                      {selectedTime === time && (
                        <div className="absolute -top-1.5 -right-1.5 size-4 bg-primary rounded-full flex items-center justify-center shadow-lg">
                          <span className="material-symbols-outlined text-[10px] text-black font-bold">
                            check
                          </span>
                        </div>
                      )}
                    </button>
                  ),
                )}

                {/* Tarde */}
                <div className="col-span-full mb-3 mt-6 flex items-center gap-3">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Tarde
                  </span>
                  <span className="h-px flex-1 bg-white/10"></span>
                </div>
                {TIME_SLOTS.filter((s) => s.period === "Tarde").map(
                  (
                    { time, available },
                    index, 
                  ) => (
                    <button
                      key={`tarde-${time}-${index}`} 
                      disabled={!available}
                      onClick={() => setSelectedTime(time)}
                      className={`relative flex items-center justify-center py-3 px-2 rounded border transition-all
        ${
          !available
            ? "bg-white/5 border-transparent text-gray-700 cursor-not-allowed"
            : selectedTime === time
              ? "border-primary bg-primary/10 text-primary font-bold"
              : "border-white/10 bg-black text-gray-300 hover:border-primary/50 hover:bg-primary/5"
        }`}
                    >
                      <span
                        className={
                          !available ? "line-through decoration-gray-700" : ""
                        }
                      >
                        {time}
                      </span>
                      {selectedTime === time && (
                        <div className="absolute -top-1.5 -right-1.5 size-4 bg-primary rounded-full flex items-center justify-center shadow-lg">
                          <span className="material-symbols-outlined text-[10px] text-black font-bold">
                            check
                          </span>
                        </div>
                      )}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* BOTONES DE ACCIÓN */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onBack}
                className="w-full sm:w-auto px-8 py-3 rounded-xl border border-primary text-primary hover:bg-primary hover:text-black transition-all font-bold"
              >
                Anterior
              </button>
              <button
                onClick={onNext}
                disabled={!selectedTime}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-8 rounded-full font-bold transition-all
                  ${!selectedTime ? "bg-gray-800 text-gray-500 cursor-not-allowed" : "bg-primary text-black shadow-lg hover:scale-105 active:scale-95"}
                `}
              >
                <span>Continuar</span>
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}