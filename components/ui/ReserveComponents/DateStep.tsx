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

import ProgressBar from "../progresBar";

interface ServicesStepProps {
  onNext: () => void;
  onBack: ()=> void;
}

export default function DateStep({ onNext,onBack }: ServicesStepProps) {
  return (
      
<div className="w-full max-w-[1024px] mx-auto  flex flex-col   justify-center items-center gap-10 p-8">

<div className="flex flex-col w-full lg:flex-row gap-8">
<div className="flex-1 flex flex-col gap-6">
<div className="bg-surface-dark border border-white/10 rounded-xl p-8 shadow-2xl shadow-black/50">
<div className="flex items-center justify-between mb-8">
<h3 className="text-white text-lg font-bold tracking-wide">Octubre 2023</h3>
<div className="flex items-center gap-2">
<button className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white">
<span className="material-symbols-outlined text-xl">chevron_left</span>
</button>
<button className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white">
<span className="material-symbols-outlined text-xl">chevron_right</span>
</button>
</div>
</div>
<div className="grid grid-cols-7 mb-4">
<span className="text-gray-500 text-[10px] font-bold text-center uppercase tracking-widest py-2">Dom</span>
<span className="text-gray-500 text-[10px] font-bold text-center uppercase tracking-widest py-2">Lun</span>
<span className="text-gray-500 text-[10px] font-bold text-center uppercase tracking-widest py-2">Mar</span>
<span className="text-gray-500 text-[10px] font-bold text-center uppercase tracking-widest py-2">Mié</span>
<span className="text-gray-500 text-[10px] font-bold text-center uppercase tracking-widest py-2">Jue</span>
<span className="text-gray-500 text-[10px] font-bold text-center uppercase tracking-widest py-2">Vie</span>
<span className="text-gray-500 text-[10px] font-bold text-center uppercase tracking-widest py-2">Sáb</span>
</div>
<div className="grid grid-cols-7 gap-y-3 gap-x-2">
<div className="aspect-square"></div>
<div className="aspect-square"></div>
<div className="aspect-square"></div>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-700 cursor-not-allowed">1</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-700 cursor-not-allowed">2</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">3</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">4</button>
<button className="aspect-square flex flex-col items-center justify-center rounded-full text-sm bg-primary text-black font-bold shadow-[0_0_15px_rgba(242,185,13,0.3)] relative transform scale-105">
                                5
                            </button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">6</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">7</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">8</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">9</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">10</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">11</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">12</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">13</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">14</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">15</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">16</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">17</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">18</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">19</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">20</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">21</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">22</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">23</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">24</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">25</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">26</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">27</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">28</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">29</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-colors">30</button>
<button className="aspect-square flex items-center justify-center rounded-full text-sm text-gray-700 opacity-50">1</button>
</div>
</div>
</div>
<div className="flex-1 flex flex-col gap-6">
<div className="bg-surface-dark border border-white/10 rounded-xl p-8 shadow-2xl shadow-black/50 h-full flex flex-col">
<div className="flex justify-between items-center mb-8 border-b border-white/5 ">
<div>
<h3 className="text-white text-lg font-bold">Jueves, 5 Octubre</h3>
</div>
<div className="flex gap-4 text-[10px] uppercase tracking-wider font-bold">
<div className="flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_5px_rgba(242,185,13,0.8)]"></div>
<span className="text-gray-400">Seleccionado</span>
</div>
<div className="flex items-center gap-2">
<div className="w-2 h-2 rounded-full border border-gray-600"></div>
<span className="text-gray-400">Disponible</span>
</div>
</div>
</div>
<div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
<div className="col-span-full mb-3 mt-1 flex items-center gap-3">
<span className="h-px flex-1 bg-white/10"></span>
<span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Mañana</span>
<span className="h-px flex-1 bg-white/10"></span>
</div>
<button className="group relative flex items-center justify-center py-3 px-2 rounded border border-white/10 hover:border-primary/50 bg-black hover:bg-primary/5 transition-all">
<span className="text-gray-300 text-sm font-medium group-hover:text-primary transition-colors">09:00 AM</span>
</button>
<button className="group relative flex items-center justify-center py-3 px-2 rounded border border-white/10 hover:border-primary/50 bg-black hover:bg-primary/5 transition-all">
<span className="text-gray-300 text-sm font-medium group-hover:text-primary transition-colors">09:30 AM</span>
</button>
<button className="relative disabled flex items-center justify-center py-3 px-2 rounded border border-transparent bg-white/5 text-gray-700 cursor-not-allowed" >
<span className="text-sm font-medium line-through decoration-gray-700">10:00 AM</span>
</button>
<button className="group relative flex items-center justify-center py-3 px-2 rounded border border-white/10 hover:border-primary/50 bg-black hover:bg-primary/5 transition-all">
<span className="text-gray-300 text-sm font-medium group-hover:text-primary transition-colors">10:30 AM</span>
</button>
<button className="group relative flex items-center justify-center py-3 px-2 rounded border border-white/10 hover:border-primary/50 bg-black hover:bg-primary/5 transition-all">
<span className="text-gray-300 text-sm font-medium group-hover:text-primary transition-colors">11:00 AM</span>
</button>
<button className="relative disabled flex items-center justify-center py-3 px-2 rounded border border-transparent bg-white/5 text-gray-700 cursor-not-allowed" >
<span className="text-sm font-medium line-through decoration-gray-700">11:30 AM</span>
</button>
<div className="col-span-full mb-3 mt-6 flex items-center gap-3">
<span className="h-px flex-1 bg-white/10"></span>
<span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Tarde</span>
<span className="h-px flex-1 bg-white/10"></span>
</div>
<button className="group relative flex items-center justify-center py-3 px-2 rounded border border-white/10 hover:border-primary/50 bg-black hover:bg-primary/5 transition-all">
<span className="text-gray-300 text-sm font-medium group-hover:text-primary transition-colors">12:00 PM</span>
</button>
<button className="relative flex disabled items-center justify-center py-3 px-2 rounded border border-transparent bg-white/5 text-gray-700 cursor-not-allowed" >
<span className="text-sm font-medium line-through decoration-gray-700">12:30 PM</span>
</button>
<button className="relative flex items-center justify-center py-3 px-2 rounded border border-primary bg-primary/10 shadow-[inset_0_0_10px_rgba(242,185,13,0.1)]">
<span className="text-primary text-sm font-bold">01:00 PM</span>
<div className="absolute -top-1.5 -right-1.5 size-4 bg-primary rounded-full flex items-center justify-center shadow-lg">
<span className="material-symbols-outlined text-[10px] text-black font-bold">check</span>
</div>
</button>
<button className="group relative flex items-center justify-center py-3 px-2 rounded border border-white/10 hover:border-primary/50 bg-black hover:bg-primary/5 transition-all">
<span className="text-gray-300 text-sm font-medium group-hover:text-primary transition-colors">01:30 PM</span>
</button>
<button className="group relative flex items-center justify-center py-3 px-2 rounded border border-white/10 hover:border-primary/50 bg-black hover:bg-primary/5 transition-all">
<span className="text-gray-300 text-sm font-medium group-hover:text-primary transition-colors">02:00 PM</span>
</button>
<button className="relative flex disabled items-center justify-center py-3 px-2 rounded border border-transparent bg-white/5 text-gray-700 cursor-not-allowed" >
<span className="text-sm font-medium line-through decoration-gray-700">02:30 PM</span>
</button>
<button className="group relative flex items-center justify-center py-3 px-2 rounded border border-white/10 hover:border-primary/50 bg-black hover:bg-primary/5 transition-all">
<span className="text-gray-300 text-sm font-medium group-hover:text-primary transition-colors">03:00 PM</span>
</button>
<button className="group relative flex items-center justify-center py-3 px-2 rounded border border-white/10 hover:border-primary/50 bg-black hover:bg-primary/5 transition-all">
<span className="text-gray-300 text-sm font-medium group-hover:text-primary transition-colors">03:30 PM</span>
</button>
<button className="group relative flex items-center justify-center py-3 px-2 rounded border border-white/10 hover:border-primary/50 bg-black hover:bg-primary/5 transition-all">
<span className="text-gray-300 text-sm font-medium group-hover:text-primary transition-colors">04:00 PM</span>
</button>
</div>
</div>
<div className="mt-8 pt-6 border-t border-white/10">
<div className="flex justify-between items-center">
  <div className="flex flex-col sm:flex-row items-center mx-auto gap-4 pt-4">
<button onClick={onBack} className="w-full sm:w-auto px-8 py-3.5 m-2 rounded-xl border border-primary text-primary hover:bg-primary hover:text-background-dark transition-all duration-300 font-bold tracking-wide" type="button">
                                Anterior
                            </button>
<button onClick={onNext} className="flex items-center gap-2 bg-primary hover:bg-[#d9a50b] text-black font-bold py-3 px-8 m-2 rounded-full transition-all shadow-[0_0_20px_rgba(242,185,13,0.3)] hover:shadow-[0_0_30px_rgba(242,185,13,0.5)] transform hover:-translate-y-0.5">
<span>Continuar</span>
<span className="material-symbols-outlined text-lg">arrow_forward</span>
</button>
</div>
</div>
</div>
</div>
</div>
</div>
</div>

      
  );
}