import { Calendar } from "lucide-react";

export function FloatingButton() {
  return (
     <div className="fixed bottom-10 right-10 z-50">
        <button className="bg-primary text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group flex items-center gap-3">
          <Calendar className="text-2xl font-bold" />
          <span className="font-bold pr-2 hidden group-hover:inline transition-all whitespace-nowrap">Reserva tu cita</span>
        </button>
      </div>
  );
}