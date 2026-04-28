"use client"

import Image from "next/image";
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ProgressBar from "../../components/ui/progresBar";

interface ServicesStepProps {
  onNext: () => void;
}

export default function ServicesStep({ onNext }: ServicesStepProps) {
  return (

    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto gap-8 px-4 py-8">
      {/* COLUMNA IZQUIERDA: Servicios e Interfaz */}
      <div className="flex-1 layout-content-container flex flex-col">
        {/* Progress Stepper */}
        <h1 className="text-white tracking-light text-3xl md:text-[32px] font-bold leading-tight px-4 text-left pb-6 pt-2">
          Selecciona tus servicios
        </h1>

        {/* Filters */}
        <div className="flex gap-3 px-4 pb-8 flex-wrap overflow-x-auto no-scrollbar">
          <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary text-black px-6 transition-all hover:bg-primary/90 shadow-lg shadow-primary/20">
            <p className="text-sm font-bold leading-normal">Todos</p>
          </button>
          <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] hover:border-primary/50 px-6 transition-all group">
            <span className="material-symbols-outlined text-lg text-[#cbbc90] group-hover:text-primary">spa</span>
            <p className="text-[#ccc] group-hover:text-white text-sm font-medium leading-normal">Uñas</p>
          </button>
          <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] hover:border-primary/50 px-6 transition-all group">
            <span className="material-symbols-outlined text-lg text-[#cbbc90] group-hover:text-primary">visibility</span>
            <p className="text-[#ccc] group-hover:text-white text-sm font-medium leading-normal">Pestañas</p>
          </button>
          <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] hover:border-primary/50 px-6 transition-all group">
            <span className="material-symbols-outlined text-lg text-[#cbbc90] group-hover:text-primary">brush</span>
            <p className="text-[#ccc] group-hover:text-white text-sm font-medium leading-normal">Maquillaje</p>
          </button>
          <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] hover:border-primary/50 px-6 transition-all group">
            <span className="material-symbols-outlined text-lg text-[#cbbc90] group-hover:text-primary">face</span>
            <p className="text-[#ccc] group-hover:text-white text-sm font-medium leading-normal">Faciales</p>
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4 pb-12">
          {/* Manicura Gel */}
          <div className="group relative flex flex-col gap-4 rounded-xl border border-[#333] bg-[#1a1a1a] p-4 hover:border-primary transition-all shadow-none hover:shadow-[0_0_15px_rgba(242,185,13,0.15)] overflow-hidden cursor-pointer">
            <div className="absolute top-4 right-4 z-10">
              <div className="rounded-full bg-black/40 backdrop-blur-md p-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-lg">add</span>
              </div>
            </div>
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-lg w-full h-40 shrink-0 transform group-hover:scale-105 transition-transform duration-500" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAXxrvKDwaBU8_18M0pvKYjiLYsATAR0NfExvw58iox9fhwiedJkgJ3lul9Bt3r1_DwXawsBWR2fsoX6wSbSBTe_OKXaYFO4zOfvtwU4jLoZwuehYWNO3KJd2VdGfBV84kVnXrafiV_xR2cd7F2b7T47dsgjETi7E2RcgfANo3rLznzAA4MHQ6_2vPeeG1Y4tODNe9z5nnu0CrssCSWjofCuPC84oG25TTSd1IdzUQY6KfRB77ZpKnEI9QREwVn1FR0n16ppNL4lcU")' }}
            ></div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex justify-between items-start">
                <h2 className="text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">Manicura Gel</h2>
                <span className="text-primary font-bold text-lg">$25.00</span>
              </div>
              <p className="text-[#999] text-sm leading-normal line-clamp-2">Aplicación de esmalte en gel de larga duración con preparación completa de la uña.</p>
              <div className="flex items-center gap-2 mt-auto pt-2 text-xs text-[#666] font-medium">
                <span className="material-symbols-outlined text-base">schedule</span>
                45 min
              </div>
            </div>
          </div>

          {/* Pedicura Spa */}
          <div className="group relative flex flex-col gap-4 rounded-xl border border-[#333] bg-[#1a1a1a] p-4 hover:border-primary transition-all shadow-none hover:shadow-[0_0_15px_rgba(242,185,13,0.15)] overflow-hidden cursor-pointer">
            <div className="absolute top-4 right-4 z-10">
              <div className="rounded-full bg-black/40 backdrop-blur-md p-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-lg">add</span>
              </div>
            </div>
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-lg w-full h-40 shrink-0 transform group-hover:scale-105 transition-transform duration-500" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCjnVsMr_LuGTas6iKjt5NPW3La0f15TqgvePKAYu9uqXKKyWtSz0M7lZnUwR-02G-hiSH6vimiRegL2hN8Nn2gCSt4h5xYOYx93PsxkrXROj5TlIL9SByH2cMfNUZWloAsRVKDXXSHzOpzJMkeExfgCkGgcLFAesqePDdNDRYsyeqFoeQPgvD3AjZBKQ17FajZc_2rwtIyaW4CyNunOooD19cJZwiZAyD063noD3nH3D-U55u-0OY5REKciJ3b-LtA8jSZpDEexyA")' }}
            ></div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex justify-between items-start">
                <h2 className="text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">Pedicura Spa</h2>
                <span className="text-primary font-bold text-lg">$35.00</span>
              </div>
              <p className="text-[#999] text-sm leading-normal line-clamp-2">Tratamiento completo de pies con exfoliación, masaje y esmaltado.</p>
              <div className="flex items-center gap-2 mt-auto pt-2 text-xs text-[#666] font-medium">
                <span className="material-symbols-outlined text-base">schedule</span>
                60 min
              </div>
            </div>
          </div>

          {/* Extensiones Pestañas (Selected) */}
          <div className="group relative flex flex-col gap-4 rounded-xl border-2 border-primary bg-[#1a1a1a] p-4 shadow-[0_0_20px_rgba(242,185,13,0.2)] overflow-hidden cursor-pointer">
            <div className="absolute top-3 right-3 z-20 bg-primary text-black rounded-full p-1 shadow-md">
              <span className="material-symbols-outlined text-xl">check</span>
            </div>
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-lg w-full h-40 shrink-0 transform group-hover:scale-105 transition-transform duration-500" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC_O8AtoNH5-yQmoGsz_bW4cQBXaZQLsC-9N7RqRsUDIW1AmMZRPKWua7-TRN5k6KZpNQt07mOfarDgoV-d9-TGwgkt0D7XIj53jbgbND_EUJHW36lYJzkV8QO15Vu9ygtOpt3sPC0n290GoPL9b3K8JTFmOZwy_egh25UnBYOShEP_YZlClZITaaDM-zaQYuWv-vkJB2iFn_j8jks0aZCqxhlqXxPaBluu7_YNFNOHwVHb-V9GcyhM8zd_lwqw_TNIk9dmfpvv9_4")' }}
            ></div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex justify-between items-start">
                <h2 className="text-primary text-lg font-bold leading-tight">Extensiones Pestañas</h2>
                <span className="text-primary font-bold text-lg">$50.00</span>
              </div>
              <p className="text-[#cbbc90] text-sm leading-normal line-clamp-2">Volumen ruso o clásico para una mirada impactante y natural.</p>
              <div className="flex items-center gap-2 mt-auto pt-2 text-xs text-[#888] font-medium">
                <span className="material-symbols-outlined text-base">schedule</span>
                90 min
              </div>
            </div>
          </div>

          {/* Maquillaje Noche */}
          <div className="group relative flex flex-col gap-4 rounded-xl border border-[#333] bg-[#1a1a1a] p-4 hover:border-primary transition-all shadow-none hover:shadow-[0_0_15px_rgba(242,185,13,0.15)] overflow-hidden cursor-pointer">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-lg w-full h-40 shrink-0 transform group-hover:scale-105 transition-transform duration-500" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDx1FFHomj7b-GQ5dWUU2qY8t8TP_XOChVasweVjqeaVSjbIMGsoCzWS4OZeLRt0uE7sF3TbFhDFS-yTY-o5oAv-6-7EnthzCE9mU6kY0c5P9eztaPt95ZtrqjpGnSlYOvPvj19yQOIlIzNJIh5nYBrUpbeg3Bim6GndkvypZlLu49JWqwEVP69YGSleaWs6GGAh_36NBsPnw68RPO04Dt8lZFVQC02dQdmp7Bz-Vty2h9Kh9Mnk8N-6TnkdggtWItNJXAQmJjAp2o")' }}
            ></div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex justify-between items-start">
                <h2 className="text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">Maquillaje Noche</h2>
                <span className="text-primary font-bold text-lg">$45.00</span>
              </div>
              <p className="text-[#999] text-sm leading-normal line-clamp-2">Look glamoroso para eventos especiales con productos de alta gama.</p>
              <div className="flex items-center gap-2 mt-auto pt-2 text-xs text-[#666] font-medium">
                <span className="material-symbols-outlined text-base">schedule</span>
                60 min
              </div>
            </div>
          </div>

          {/* Limpieza Facial */}
          <div className="group relative flex flex-col gap-4 rounded-xl border border-[#333] bg-[#1a1a1a] p-4 hover:border-primary transition-all shadow-none hover:shadow-[0_0_15px_rgba(242,185,13,0.15)] overflow-hidden cursor-pointer">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-lg w-full h-40 shrink-0 transform group-hover:scale-105 transition-transform duration-500" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAo4vLCbOTUp7Jl3b_fRfDzZs4TobO86-5tFs3tGybb00ykzu7kvRhiQ5D69kIkSFqA9BSNH_QQZyQUH66SBIrHdaFaSsNDYCrR43PHQGhOLbk3AARzhXXeI4Sd3fv9lEFB7O11NhkbBTOrEwIsxBUvgmlLeuH6Ud-gZl3TNC5zmK1bPjrN2-8ifRKXCoXuvp5F9YfR8TvLo43IgNZ4As1_CbwVUW8cyiAGopoVCnnjd-SlzKVhaxnL0TeobeMoH62loZ74U42vV5I")' }}
            ></div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex justify-between items-start">
                <h2 className="text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">Limpieza Facial</h2>
                <span className="text-primary font-bold text-lg">$40.00</span>
              </div>
              <p className="text-[#999] text-sm leading-normal line-clamp-2">Limpieza profunda, extracción de impurezas e hidratación intensa.</p>
              <div className="flex items-center gap-2 mt-auto pt-2 text-xs text-[#666] font-medium">
                <span className="material-symbols-outlined text-base">schedule</span>
                50 min
              </div>
            </div>
          </div>

          {/* Depilación Cejas */}
          <div className="group relative flex flex-col gap-4 rounded-xl border border-[#333] bg-[#1a1a1a] p-4 hover:border-primary transition-all shadow-none hover:shadow-[0_0_15px_rgba(242,185,13,0.15)] overflow-hidden cursor-pointer">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-lg w-full h-40 shrink-0 transform group-hover:scale-105 transition-transform duration-500" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAQbPvVL67Y8gQqlfZBfgKi6uICnLzhekCE-ypV47ipQV1WcVPuom89pqFLayfxAxojM8cXL4muk6eBAPSJLFGK7yEpiE4PHOscSyrO5iKn1CD0tV28PPy9OH6VR6SrAqIrHoP941wZb2qfjjCoFoJKbYI62nVHEEPxzUO7xnZ5MjDBrik1ihIV4TD-7B91ib0V_7Rp0ornSbiI0ltlZOHRUTOvVeVVXKH0SJMwF620JA6xKKV2_bhfRpaYi7SMhBvrYcNqWX7JZG0")' }}
            ></div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex justify-between items-start">
                <h2 className="text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">Depilación Cejas</h2>
                <span className="text-primary font-bold text-lg">$15.00</span>
              </div>
              <p className="text-[#999] text-sm leading-normal line-clamp-2">Diseño y perfilado de cejas según la forma de tu rostro.</p>
              <div className="flex items-center gap-2 mt-auto pt-2 text-xs text-[#666] font-medium">
                <span className="material-symbols-outlined text-base">schedule</span>
                20 min
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COLUMNA DERECHA: Sidebar Card (Resumen) */}
      <aside className="w-full lg:w-[380px]">
        <div className="sticky top-24 bg-[#1a1a1a] border border-[#333] rounded-2xl overflow-hidden shadow-2xl">
          {/* Header de la Card */}
          <div className="bg-[#222] p-5 border-b border-[#333]">
            <h3 className="text-white font-bold text-xl flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">shopping_bag</span>
              Resumen de Reserva
            </h3>
          </div>

          {/* Cuerpo de la Card */}
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[#666]">Servicios Seleccionados</p>
              
              {/* Item de Servicio */}
              <div className="flex justify-between items-start group">
                <div>
                  <p className="text-white font-medium">Extensiones Pestañas</p>
                  <p className="text-xs text-[#666]">90 min • Profesional Senior</p>
                </div>
                <p className="text-primary font-bold">$50.00</p>
              </div>
            </div>

            <hr className="border-[#333]" />

            {/* Totales */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#999]">Subtotal</span>
                <span className="text-white font-medium">$50.00</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg text-white font-bold">Total</span>
                <span className="text-3xl text-primary font-bold text-glow">$50.00</span>
              </div>
            </div>

            {/* Botón de Acción */}
            <button onClick={onNext} className="w-full flex items-center justify-center gap-2 rounded-xl h-14 bg-primary hover:bg-primary/90 transition-all text-black font-bold text-lg shadow-[0_0_20px_rgba(242,185,13,0.3)]">
              Continuar
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            
            <p className="text-[11px] text-center text-[#555] leading-relaxed">
              Al continuar, podrás elegir la fecha y hora disponible para tu cita en **Michell's Beauty**.
            </p>
          </div>
        </div>
      </aside>
    </div>
        

      
  );
}