"use client"

import Link from "next/link";

export default function MyWork(){
    return(
        <section className="py-24 px-6 bg-luxury-black" id="trabajo">
        <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
        <div>
        <h2 className="text-primary uppercase tracking-widest text-sm mb-2">Galería</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white">Mi Trabajo</h3>
        </div>

        <Link href="/MyGalery">
            <button
              className=" button-shadow bg-black border border-primary text-primary font-bold px-8 py-4 rounded-lg transition-all shadow-glow hover:bg-[#d6a644] hover:text-black">
              ➡ Ver toda la galería
            </button>
        </Link>
       
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group relative overflow-hidden rounded-xl h-[500px]">
        <div className="imgBox">
                <img alt="Professional makeup" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 carousel-image" data-alt="Professional makeup artistry close up" src="pestañas1.jpg"/>
                <img alt="Professional makeup" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 carousel-image" data-alt="Professional makeup artistry close up" src="pestañas2.jpg"/>
                <img alt="Professional makeup" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 carousel-image" data-alt="Professional makeup artistry close up" src="pestañas3.jpg"/>
            </div>
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity">
        <div>
        <h4 className="text-xl font-bold text-white">Pestañas Pelo a Pelo</h4>
        </div>
        </div>
        </div>
        <div className="group relative overflow-hidden rounded-xl h-[500px]">
            <div className="imgBox">
                <img alt="Professional makeup" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 carousel-image" data-alt="Professional makeup artistry close up" src="unas1.jpg"/>
                <img alt="Professional makeup" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 carousel-image" data-alt="Professional makeup artistry close up" src="unas2.jpg"/>
                <img alt="Professional makeup" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 carousel-image" data-alt="Professional makeup artistry close up" src="unas3.jpg"/>
            </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <h4 className="text-lg font-bold text-white">Uñas Acrilicas</h4>
        </div>
        </div>
        <div className="group relative overflow-hidden rounded-xl h-[500px]">
        <div className="imgBox">
            <img alt="Nail art design" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 carousel-image" data-alt="Elegant gel nail art design" src="pies1.jpg"/>
            <img alt="Nail art design" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 carousel-image" data-alt="Elegant gel nail art design" src="pies2.jpg"/>
            <img alt="Nail art design" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 carousel-image" data-alt="Elegant gel nail art design" src="pies3.jpg"/>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <h4 className="text-lg font-bold text-white">Acripie</h4>
        </div>
        </div>
        <div className="group relative overflow-hidden rounded-xl h-[500px]">
        <div className="imgBox">
            <img alt="Nail art design" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 carousel-image" data-alt="Elegant gel nail art design" src="cejas1.jpg"/>
            <img alt="Nail art design" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 carousel-image" data-alt="Elegant gel nail art design" src="cejas2.jpg"/>
            <img alt="Nail art design" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 carousel-image" data-alt="Elegant gel nail art design" src="cejas3.jpg"/>
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