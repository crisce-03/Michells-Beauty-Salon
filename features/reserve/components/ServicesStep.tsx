"use client";

import Image from "next/image";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProgressBar from "../../../components/ui/progresBar";
import ServiceCard from "./Atomos/ServiceCard";
import ServiceSelected from "./Atomos/ServiceSelected";
import FiltroCategoria from "./Atomos/FiltroCategoria";
import { Service } from "../../servicios/types/servicio.types";
interface ServicesStepProps {
  services: Service[];
  filtroCategoria: string;
  selectedServices: Service[];
  setSelectedServices: (services: Service[]) => void;
  totalPrice: number;
  setTotalPrice: (price: number) => void;
  setFiltroCategoria: (categoria: string) => void;
  loading: boolean;
  onNext: () => void;
}

export default function ServicesStep({
  services,
  filtroCategoria,
  selectedServices,
  setSelectedServices,
  totalPrice,
  setTotalPrice,
  setFiltroCategoria,
  loading,
  onNext,
}: ServicesStepProps) {
  if (loading) return <p className="text-white flex items-center  justify-center tracking-light text-2xl font-bold leading-tight px-4 text-left pb-6 pt-24">Cargando servicios...</p>;
  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto gap-8 px-4 py-8">
      {/* COLUMNA IZQUIERDA: Servicios e Interfaz */}
      <div className="flex-1 layout-content-container flex flex-col">
        {/* Progress Stepper */}
        <h1 className="text-white tracking-light text-3xl md:text-[32px] font-bold leading-tight px-4 text-left pb-6 pt-2">
          Selecciona tus servicios
        </h1>

        <FiltroCategoria 
          activeCategory={filtroCategoria} 
          onCategoryChange={setFiltroCategoria} 
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4 pb-12">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              setSelectedServices={setSelectedServices}
              selectedServices={selectedServices}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
            />
          ))}
        </div>
      </div>

      {/* COLUMNA DERECHA: Sidebar Card (Resumen) */}
      <aside className="w-full lg:w-[380px]">
        <div className="sticky top-24 bg-[#1a1a1a] border border-[#333] rounded-2xl overflow-hidden shadow-2xl">
          {/* Header de la Card */}
          <div className="bg-[#222] p-5 border-b border-[#333]">
            <h3 className="text-white font-bold text-xl flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                shopping_bag
              </span>
              Resumen de Reserva
            </h3>
          </div>

          {/* Cuerpo de la Card */}
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[#666]">
                Servicios Seleccionados
              </p>

              {/* Item de Servicio */}
              {selectedServices.map((service) => (
                <ServiceSelected
                  key={service.id}
                  service={service}
                  onRemove={(id) => {
                    setSelectedServices(
                      selectedServices.filter((s) => s.id !== id),
                    );
                    setTotalPrice(totalPrice - Number(service.precio));
                  }}
                />
              ))}
            </div>

            <hr className="border-[#333]" />

            {/* Totales */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#999]">Subtotal</span>
                <span className="text-white font-medium">${totalPrice}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg text-white font-bold">Total</span>
                <span className="text-3xl text-primary font-bold text-glow">
                  ${totalPrice}
                </span>
              </div>
            </div>

            {/* Botón de Acción */}
            <button
              onClick={onNext}
              disabled={!selectedServices.length || selectedServices.length < 1}
              className="w-full flex items-center justify-center gap-2 rounded-xl h-14 bg-primary hover:bg-primary/90 transition-all text-black font-bold text-lg shadow-[0_0_20px_rgba(242,185,13,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>

            <p className="text-[11px] text-center text-[#555] leading-relaxed">
              Al continuar, podrás elegir la fecha y hora disponible para tu
              cita en **Michell's Beauty**.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
