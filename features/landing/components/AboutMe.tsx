"use client";

import Link from "next/link";

export default function SobreMi() {
  return (
    <section className="bg-black text-white py-20 px-6" id="sobre-mi">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Imagen */}
        <div className="relative">
          <img
            src="Michells.jpg"
            alt="Fundadora Michells Beauty Salon"
            className="rounded-2xl shadow-2xl object-cover w-full h-[650px]"
          />
        </div>

        {/* Contenido */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Bienvenida Beautys By Michelle ! ✨ </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">Soy especialista en belleza con
            6 años de experiencia, ofreciendo servicios personalizados para
            resaltar la belleza y estilo único de cada clienta. 💖</p>

            <p className="text-gray-300 mb-6 leading-relaxed"> Cada servicio
            es realizado con dedicación, detalle y productos de calidad,
            adaptándome a tus gustos y necesidades para que te sientas hermosa,
            segura y cómoda en todo momento. ✨</p>

             <p className="text-gray-300 mb-6 leading-relaxed"> Mi prioridad es brindarte una
            experiencia agradable y resultados que hagan resaltar tu belleza
            natural. 💕 </p>

          <p className="text-gray-300 mb-6 leading-relaxed">
            🌸 Atención personalizada <br></br>
            🌸 Diseños únicos y modernos<br></br>
            🌸 Ambiente cómodo y profesional<br></br>
          </p>

          <p className="text-gray-300 mb-6 leading-relaxed"> ¡Será un placer atenderte y
            ayudarte a lucir espectacular en cualquier ocasión! ✨</p>

          <a
            href="https://wa.me/50369303080"
            className="inline-block bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full transition hover:bg-yellow-400"
          >
            Agenda tu cita
          </a>
        </div>
      </div>
    </section>
  );
}
