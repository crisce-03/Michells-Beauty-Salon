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
            <img className="logo" src="logo_original.jpg" />
    
           <span className="font-signature text-3xl text-primary glow-text mt-7">Michell's Beauty</span>
            
        </div>
          </div>

          {/* Botón + Redes */}
          <div className="flex flex-col items-center gap-6">
            <button
              className=" button-shadow bg-black border border-primary text-primary font-bold px-8 py-4 rounded-lg transition-all shadow-glow hover:bg-[#d6a644] hover:text-black">
              RESERVAR CITA
            </button>

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

     <a
      href="https://wa.me/50369303080"
      target="_blank"
      rel="noopener noreferrer"
      className="group transition-transform duration-300 hover:scale-110"
      aria-label="Tiktok Michells Beauty Salon"
    >
      <img
        className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity"
        src="tiktokLogo.png"
        alt="TiktoK"
      />
    </a>

  </div>
          </div>

          {/* Horarios */}
          <div className="text-center md:text-right">
            <h5
              className="font-bold mb-4 uppercase text-xs tracking-widest text-2xl"
              style={{ color: "#d6a644" }}
            >
              Horarios
            </h5>
            <ul className="space-y-2 text-sm">
              <li style={{ color: "#FAF3E0" }}>Lun - Vie: 9:00 AM - 7:00 PM</li>
              <li style={{ color: "#FAF3E0" }}>Sábados: 8:00 AM - 5:00 PM</li>
              <li style={{ color: "#FAF3E0" }}>Domingos: Previa Cita</li>
            </ul>
          </div>
        </div>

        {/* Parte inferior */}
        <div
          className="mt-16 pt-8 border-t text-center text-xs tracking-widest uppercase"
          style={{ borderColor: "#333333", color: "#FAF3E0" }}
        >
          © 2026 Michell's Beauty. Santa Ana, El Salvador. Todos los derechos reservados.
          <br className="md:hidden" />
          <span style={{ color: "#d6a644" }}> CRG Solutions</span>
        </div>
      </div>
    </footer>
  );
}