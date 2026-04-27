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
import DateStep from "@/features/reserve/DateStep";
import ServicesStep from "@/features/reserve/ServicesStep";
import DatsStep from "@/features/reserve/DatsStep";
import PayStep from "@/features/reserve/PayStep";
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
      <main className="flex flex-col items-center">
       <ProgressBar currentStep={step} setStep={setStep} />

        <div className="w-full">
          {/* Aquí se inyecta el componente según el paso */}
          {renderStep()}
        </div>
      </main>
    </div>
  );
}
