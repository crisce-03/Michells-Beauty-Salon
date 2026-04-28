"use client"

import Link from  "next/link";

export default function SobreMi() {
  return (

    
    <section className="bg-black text-white py-20 px-6">
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
          <h2 className="text-4xl font-bold mb-6">
            Sobre Mí
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Hola, soy Michell, fundadora de Michells Beauty Salon.
            Me especializo en pestañas pelo a pelo, uñas acrílicas,
            acripie y cejas laminadas, ofreciendo un servicio
            personalizado y detallista para cada cliente.
          </p>

          <p className="text-gray-400 mb-8 leading-relaxed">
            Mi compromiso es resaltar tu belleza natural con técnicas
            profesionales, productos de alta calidad y un ambiente
            cómodo y seguro donde puedas sentirte especial.
          </p>

          <a
            href="#contacto"
            className="inline-block bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full transition hover:bg-yellow-400"
          >
            Agenda tu cita
          </a>
        </div>

      </div>
    </section>
  );
}