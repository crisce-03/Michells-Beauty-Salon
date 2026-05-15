"use client";

import { Service } from "../../servicios/types/servicio.types";
import { PersonalData } from "../types/reserva.types";
import FormDatosCliente from "../components/Atomos/FormDatosCliente";
import ResumenCard from "../components/Atomos/ResumenCard";

interface Props {
  onNext: () => void;
  onBack: () => void;
  selectedServices: Service[];
  totalPrice: number;
  selectedDate: Date;
  selectedTime: string | null;
  personalData: PersonalData;
  onPersonalDataChange: (field: keyof PersonalData, value: string | boolean) => void;
}

export default function DatsStep({
  onNext, onBack,
  selectedServices, totalPrice,
  selectedDate, selectedTime,
  personalData, onPersonalDataChange,
}: Props) {
  return (
    <div className="w-full max-w-[960px] mx-auto flex flex-col gap-10 p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <FormDatosCliente
            data={personalData}
            onChange={onPersonalDataChange}
            onBack={onBack}
            onNext={onNext}
          />
        </div>
        <div className="lg:col-span-4">
          <ResumenCard
            selectedServices={selectedServices}
            totalPrice={totalPrice}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
        </div>
      </div>
    </div>
  );
}