"use client"

import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/features/landing/components/Hero";
import MyWork from "@/features/landing/components/MyWork";
import Services from "@/features/landing/components/Services";
import BannerReserve from "@/features/landing/components/BannerReserve";
import Contacto from "@/features/landing/components/Contacto";
import AboutMe from "@/features/landing/components/AboutMe";
import Footer from "@/components/layout/Footer";
import DateStep from "@/features/reserve/components/DateStep";
import ServicesStep from "@/features/reserve/components/ServicesStep";
import DatsStep from "@/features/reserve/components/DatsStep";
import SummaryStep from "@/features/reserve/components/SummaryStep";
import ProgressBar from "@/components/ui/progresBar";
import { useState } from "react";
import { useReserva }  from "@/features/reserve/hooks/useReserva";
import { useRouter } from "next/navigation";


export default function Reserve() {
  const router = useRouter();
  const {
    services,
    setServices,
    loading,
    serviciosFiltrados,
    filtroCategoria,
    filtroEstado,
    setFiltroCategoria,
    setFiltroEstado,
    selectedServices,
    setSelectedServices,
    totalPrice,
    setTotalPrice,
    horarios,
    selectedDate,
    selectedTime,
    setSelectedDate,
    setSelectedTime,
    personalData,
    handlePersonalDataChange,
    handleSaveCita,
  } = useReserva();

  const [step, setStep] = useState(1);

  // --- 1. DEFINIMOS LAS REGLAS DE VALIDACIÓN ---
  // Paso 1: Debe haber al menos un servicio seleccionado
  const isValidStep1 = selectedServices.length > 0;
  
  // Paso 2: Debe haber una fecha y una hora seleccionadas
  const isValidStep2 = selectedDate !== null && selectedTime !== null;
  
  // Paso 3: Deben estar llenos los datos requeridos (ajusta las propiedades según tu objeto personalData)
  const isValidStep3 = personalData?.fullname?.trim() !== "" ; 

  // --- 2. FUNCIÓN CONTROLADORA DE NAVEGACIÓN ---
  const handleStepChange = (targetStep: number) => {
    // Siempre permitimos ir hacia atrás en los pasos
    if (targetStep < step) {
      setStep(targetStep);
      return;
    }

    // Si intenta ir hacia adelante, verificamos que el paso anterior sea válido
    if (targetStep === 2 && !isValidStep1) return; // Puedes agregar un toast/alerta aquí
    if (targetStep === 3 && (!isValidStep1 || !isValidStep2)) return;
    if (targetStep === 4 && (!isValidStep1 || !isValidStep2 || !isValidStep3)) return;

    // Si pasa todas las validaciones, cambiamos el paso
    setStep(targetStep);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ServicesStep 
          setTotalPrice={setTotalPrice}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
          loading={loading}
          totalPrice={totalPrice}
          filtroCategoria={filtroCategoria}
          setFiltroCategoria={setFiltroCategoria}
          services={serviciosFiltrados} 
          // Usamos nuestra nueva función en lugar de setStep directo
          onNext={() => handleStepChange(2)} 
        />;
      case 2:
        return <DateStep 
          onNext={() => handleStepChange(3)} 
          onBack={() => handleStepChange(1)} 
          horarios={horarios}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime} 
        />;
      case 3:
        return <DatsStep 
          selectedServices={selectedServices}
          totalPrice={totalPrice}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          personalData={personalData}
          onPersonalDataChange={handlePersonalDataChange}
          onNext={() => handleStepChange(4)} 
          onBack={() => handleStepChange(2)} 
        />;
      case 4:
        return <SummaryStep 
          totalPrice={totalPrice}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          selectedServices={selectedServices}
          personalData={personalData}
          onBack={() => handleStepChange(3)} 
          onSave={async () => {
            const exito = await handleSaveCita();
            if (exito) {
              router.push("/dashboardAdmin/citas");
            }
          }}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-luxury-black min-h-screen">
      <main className="flex flex-col items-center">
        {/* Pasamos handleStepChange al ProgressBar para evitar que se salten pasos dando clic arriba */}
        <ProgressBar currentStep={step} setStep={handleStepChange} />

        <div className="w-full">
          {renderStep()}
        </div>
      </main>
    </div>
  );
}