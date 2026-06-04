"use client"

import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/features/landing/components/Hero";
import MyWork from "@/features/landing/components/MyWork";
import Services from "@/features/landing/components/Services";
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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";


export default function Reserve() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("editId");
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
    cargarCitaParaEditar,
    horariosBD,
  } = useReserva();

  const [step, setStep] = useState(1);

  useEffect(() => {
    if (editId) {
      // Si hay un ID, llamamos a una función de tu hook para que busque 
      // esa cita en la base de datos y llene los estados (servicios, fecha, etc.)
      cargarCitaParaEditar(editId);
    }
  }, [editId]);

  // --- 1. DEFINIMOS LAS REGLAS DE VALIDACIÓN ---
  // Paso 1: Debe haber al menos un servicio seleccionado
  const isValidStep1 = selectedServices.length > 0;
  
  // Paso 2: Debe haber una fecha y una hora seleccionadas
  const isValidStep2 = selectedDate !== null && selectedTime !== null;
  
  // Paso 3: Deben estar llenos los datos requeridos (ajusta las propiedades según tu objeto personalData)
  const isValidStep3 = personalData?.nombre?.trim() !== "" ; 

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
          horariosBD={horariosBD}
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
            const exito = await handleSaveCita(editId);
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
    <div className="bmx-auto max-w-7xl space-y-8 py-16 md:pt-8 xl:pt-0">
      {/* Encabezado e Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <nav className="flex text-sm text-gray-500 dark:text-text-muted mb-2">
            <Link
              href="/dashboardAdmin"
              className="hover:text-primary transition-colors"
            >
              Inicio
            </Link>
            <span className="mx-2 text-primary">/</span>
            <span className="text-gray-900 font-medium dark:text-primary">
              Reserva
            </span>
          </nav>
          <h2 className="text-3xl font-bold tracking-tight text-cream-label">
            Reserva
          </h2>
          <p className="text-text-muted mt-1">
            Reserva de citas para Michell's Beauty en Santa
            Ana.
          </p>
        </div>
      </div>
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