"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="bg-luxury-black border-t border-primary/20 py-16"
      style={{ backgroundColor: "#000000", borderColor: "#333333" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          
          {/* Logo + Descripción */}
          <div className="text-center md:text-left">
            <div className="img_conteiner w-75">
              <img className="logo" src="logo_original.jpg" alt="Michell's Beauty Logo" />
              <span className="font-signature text-3xl text-primary glow-text mt-7 block">
                Michell's Beauty
              </span>
            </div>
          </div>

          {/* Botón + Redes */}
          <div className="flex flex-col items-center gap-6 lg:pr-12">
            <a href="https://wa.me/50369303080" target="_blank" rel="noopener noreferrer">
              <button
                className="button-shadow bg-black border border-primary text-primary font-bold px-8 py-4 rounded-lg transition-all shadow-glow hover:bg-[#d6a644] hover:text-black"
              >
                RESERVAR CITA
              </button>
            </a>
            <div className="flex items-center gap-6">
              <a
                href="https://www.instagram.com/beautysbymichelle/"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform duration-300 hover:scale-110"
                aria-label="Instagram Michells Beauty Salon"
              >
                <img
                  className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity"
                  src="igLogo.png"
                  alt="Instagram"
                />
              </a>

              <a
                href="https://wa.me/50369303080"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform duration-300 hover:scale-110"
                aria-label="WhatsApp Michells Beauty Salon"
              >
                <img
                  className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity"
                  src="waLogo.png"
                  alt="WhatsApp"
                />
              </a>

          
            </div>
          </div>

          <div className="text-center md:text-right">
            <h5
              className="font-bold mb-4 uppercase text-xs tracking-widest text-2xl"
              style={{ color: "#d6a644" }}
            >
              Explora
            </h5>
            <nav className="flex flex-col space-y-3 text-sm">
              <Link 
                href="#inicio"  
                className="opacity-80 hover:opacity-100 transition-all duration-300 hover:text-[#d6a644]" 
                style={{ color: "#FAF3E0" }}
              >
                Inicio
              </Link>
              <Link 
                href="#servicios" 
                className="opacity-80 hover:opacity-100 transition-all duration-300 hover:text-[#d6a644]" 
                style={{ color: "#FAF3E0" }}
              >
                Nuestros Servicios
              </Link>
              <Link 
                href="#sobre-mi" 
                className="opacity-80 hover:opacity-100 transition-all duration-300 hover:text-[#d6a644]" 
                style={{ color: "#FAF3E0" }}
              >
                Sobre Mi
              </Link>
              <Link 
                href="/gallery"
                className="opacity-80 hover:opacity-100 transition-all duration-300 hover:text-[#d6a644]" 
                style={{ color: "#FAF3E0" }}
              >
                Galería
              </Link>
            </nav>
          </div>
        </div>

        {/* Parte inferior */}
        <div
          className="mt-16 pt-8 border-t text-center text-xs tracking-widest uppercase flex flex-col items-center gap-3"
          style={{ borderColor: "#333333", color: "#FAF3E0" }}
        >
          <p>
            © 2026 Michell's Beauty. Santa Ana, El Salvador. Todos los derechos reservados.
          </p>
          
          <a 
            href="https://github.com/crisce-03" target="_blank" rel="noopener noreferrer"
            className="normal-case tracking-normal text-[10px] opacity-40 hover:opacity-100 transition-opacity duration-300 hover:text-[#d6a644]"
          >
            Diseñado y desarrollado por Cristopher Cerritos
          </a>
        </div>
      </div>
    </footer>
  );
}