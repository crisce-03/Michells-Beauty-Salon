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

export default function Main() {
  // Lista de tus imágenes para no repetir código
  const unasImages = ["/uñas1.jpg", "/uñas2.jpg", "/uñas3.jpg", "/uñas1.jpg"];
  const pestanasImages = ["/pestañas1.jpg", "/pestañas2.jpg", "/pestañas3.jpg", "/pestañas1.jpg"];

  return (
    <>
      <header className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Mi <span className="text-primary italic">Portafolio</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
            Descubre la excelencia en cada detalle. Desde manicuras impecables hasta miradas cautivadoras.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 space-y-32 pb-40">
        
        {/* SECCIÓN UÑAS CON SHADCN CAROUSEL */}
        <section className="space-y-8" id="nails">
          <h2 className="text-3xl font-bold text-primary px-6">Uñas Acrílicas</h2>
          
          <div className="px-12"> {/* Padding lateral para que las flechas no queden fuera */}
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {unasImages.map((src, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="overflow-hidden   border-none shadow-xl">
                        <CardContent className="flex aspect-[4/5] items-center justify-center p-0">
                          <img 
                            src={src} 
                            alt={`Trabajo de uñas ${index + 1}`}
                            className="w-full h-full  rounded sobject-cover transition-transform hover:scale-105 duration-500"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-6 md:-left-12 bg-primary text-white" />
              <CarouselNext className="-right-6 md:-right-12 bg-primary text-white" />
            </Carousel>
          </div>
        </section>

        {/* SECCIÓN ACRIPIE (Mantenemos tu grid actual) */}
        <section className="space-y-8" id="lashes">
          <div className="flex items-end justify-between border-b border-primary/20 pb-4">
            <h2 className="text-3xl font-bold text-primary">Acripie</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-cream-card rounded-xl overflow-hidden shadow-2xl group h-80">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="/pies1.jpg" alt="Acripie 1"/>
            </div>
            <div className="bg-cream-card rounded-xl overflow-hidden shadow-2xl group h-80">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="/pies2.jpg" alt="Acripie 2"/>
            </div>
            <div className="bg-cream-card rounded-xl overflow-hidden shadow-2xl group h-80">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="/pies3.jpg" alt="Acripie 3"/>
            </div>
          </div>
        </section>

        {/* SECCIÓN UÑAS CON SHADCN CAROUSEL */}
        <section className="space-y-8" id="nails">
          <h2 className="text-3xl font-bold text-primary px-6">Pestañas Pelo a Pelo</h2>
          
          <div className="px-12"> {/* Padding lateral para que las flechas no queden fuera */}
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {pestanasImages.map((src, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="overflow-hidden   border-none shadow-xl">
                        <CardContent className="flex aspect-[4/5] items-center justify-center p-0">
                          <img 
                            src={src} 
                            alt={`Trabajo de uñas ${index + 1}`}
                            className="w-full h-full  rounded sobject-cover transition-transform hover:scale-105 duration-500"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-6 md:-left-12 bg-primary text-white" />
              <CarouselNext className="-right-6 md:-right-12 bg-primary text-white" />
            </Carousel>
          </div>
        </section>




        {/* SECCIÓN CEJAS */}
        <section className="space-y-8" id="brows">
          <div className="flex items-end justify-between border-b border-primary/20 pb-4">
            <h2 className="text-3xl font-bold text-primary">Cejas Laminadas</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["/cejas1.jpg", "/cejas2.jpg", "/cejas3.jpg", "/cejas3.jpg"].map((src, i) => (
              <div key={i} className="bg-cream-card rounded-xl p-4 shadow-xl transition-transform hover:scale-105">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img className="w-full h-full object-cover" src={src} alt={`Cejas ${i+1}`}/>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* BOTÓN FLOTANTE */}
      <div className="fixed bottom-10 right-10 z-50">
        <button className="bg-primary text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group flex items-center gap-3">
          <span className="material-icons font-bold">calendar_month</span>
          <span className="font-bold pr-2 hidden group-hover:inline transition-all whitespace-nowrap">Reserva tu cita</span>
        </button>
      </div>
    </>
  );
}