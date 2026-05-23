"use client"

import { useState, useEffect } from "react";
import Carousel from "@/features/landing/components/atomos/Carousel";

import Link from "next/link";

const unas = [
    "unas4.jpeg",
    "unas5.jpeg",
    "unas6.jpeg",
    "unas7.jpeg",
    "unas8.jpeg",
    "unas9.jpeg",
    "unas10.jpeg",
    "unas11.jpeg",
    "unas12.jpeg",
    "unas13.jpeg",
]

const pies =[
    "pies1.jpeg",
    "pies2.jpeg",
    "pies3.jpeg",
    "pies4.jpeg",
    "pies5.jpeg",

]

const pestanas =[
    "pestanas1.jpeg",
    "pestanas2.jpeg",
    "pestanas3.jpeg",
    "pestanas4.jpeg",
    "pestanas5.jpeg",
    "pestanas6.jpeg",
    "pestanas7.jpeg",
    "pestanas8.jpg",
    "pestanas9.jpg",

]
const cejas =[
    "cejas1.jpeg",
    "cejas2.jpg",
    "cejas3.jpeg",
    "cejas4.jpeg",
    "cejas5.jpeg",
    "cejas6.jpeg",
]




export default function MyWork(){
    return(
        <section className="py-24 px-6 bg-luxury-black" id="trabajo">
        <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
        <div>
        <h2 className="text-primary uppercase tracking-widest text-sm mb-2">Galería</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white">Mi Trabajo</h3>
        </div>

        <Link href="/gallery">
            <button
              className=" button-shadow bg-black border border-primary text-primary font-bold px-8 py-4 rounded-lg transition-all shadow-glow hover:bg-[#d6a644] hover:text-black">
              ➡ Ver toda la galería
            </button>
        </Link>
       
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group relative overflow-hidden rounded-xl h-[500px]">
        <div className="imgBox">
                <Carousel images={pestanas} title="Pestañas Pelo a Pelo" />
            </div>
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity">
        <div>
        <h4 className="text-xl font-bold text-white">Pestañas Pelo a Pelo</h4>
        </div>
        </div>
        </div>
        <div className="group relative overflow-hidden rounded-xl h-[500px]">
            <div className="imgBox">
                <Carousel images={unas} title="Uñas Acrilicas" />
            </div>
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <h4 className="text-lg font-bold text-white">Uñas Acrilicas</h4>
        </div>
        </div>
        <div className="group relative overflow-hidden rounded-xl h-[500px]">
        <div className="imgBox">
            <Carousel images={pies} title="Acripie" />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <h4 className="text-lg font-bold text-white">Acripie</h4>
        </div>
        </div>
        <div className="group relative overflow-hidden rounded-xl h-[500px]">
        <div className="imgBox">
            <Carousel images={cejas} title="Cejas Laminadas" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity">
        <div>
        <h4 className="text-xl font-bold text-white">Cejas Laminadas</h4>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
    );
}