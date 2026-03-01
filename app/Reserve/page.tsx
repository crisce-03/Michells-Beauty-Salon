"use client"

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MyWork from "@/components/MyWork";
import Services from "@/components/Services";
import BannerReserve from "@/components/BannerReserve";
import Contacto from "@/components/Contacto";
import AboutMe from "@/components/AboutMe";
import Footer from "@/components/Footer";
import DateStep from "@/components/ui/ReserveComponents/DateStep";
import ServicesStep from "@/components/ui/ReserveComponents/ServicesStep";
import DatsStep from "@/components/ui/ReserveComponents/DatsStep";
import PayStep from "@/components/ui/ReserveComponents/PayStep";
import ProgressBar from "@/components/ui/progresBar";
import { useState } from "react";

export default function Reserve() {

  const [step, setStep] = useState(1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ServicesStep onNext={() => setStep(2)} />;
      case 2:
        return <DateStep onNext={() => setStep(3)} onBack={() => setStep(1)} />;
      case 3:
        return <DatsStep onNext={() => setStep(4)} onBack={() => setStep(2)} />;
      case 4:
        return <PayStep onBack={() => setStep(3)}/>;
      default:
        return <ServicesStep onNext={() => setStep(2)} />;
    }
  };

  return (
    <div className="bg-luxury-black min-h-screen">
      {/* El Navbar suele ir fuera del <main> para que sea fijo */}
      <Navbar />
      <main className="flex flex-col items-center">
       <ProgressBar currentStep={step} setStep={setStep} />

        <div className="w-full">
          {/* Aquí se inyecta el componente según el paso */}
          {renderStep()}
        </div>
      </main>
      <Footer />
    </div>
  );
}
