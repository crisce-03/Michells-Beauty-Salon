"use client";

import Link from 'next/link';

export default function Navbar() {
  return (
        <nav className="sticky top-0 w-full z-50 nav-blur border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
           <a className="hover:text-primary transition-colors" href="/"><span className="font-signature text-3xl text-primary glow-text">Michell's Beauty</span></a>  
        </div>
        <div className="hidden md:flex items-center space-x-10 text-sm font-medium tracking-widest uppercase text-white/80">
        <a className="hover:text-primary transition-colors" href="/">Inicio</a>
        <a className="hover:text-primary transition-colors" href="/MyGalery">Galeria</a>
        <a className="bg-primary text-black  px-6 py-2 rounded-full font-bold hover:shadow-[0_0_15px_rgba(236,200,19,0.5)] transition-all" href="#reservar">RESERVAR</a>
        </div>
        <div className="md:hidden">
        <span className="material-icons text-primary">menu</span>
        </div>
        </div>
        </nav>
  );
}