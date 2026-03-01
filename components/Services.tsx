"use client"

import Link from "next/link";

export default function Services(){

    return(
        <section className="py-24 px-6 bg-background-dark/30" id="servicios">
        <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
        <h2 className="text-primary uppercase tracking-widest text-sm mb-2 font-bold">Nuestra Especialidad</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white">Servicios Exclusivos</h3>
        </div>
        <div className="grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Servicio 1 */}
        <div className="bg-[#fdfcf5] p-10 rounded-xl space-y-6 transform hover:-translate-y-2 transition-all duration-300">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
        <span className="material-icons text-primary text-3xl p-2"><img src="cejasIcon.png" alt="cejasIcono" /></span>
        </div>
        <h4 className="text-2xl font-bold text-luxury-black">Pestañas Pelo a Pelo</h4>
        <p className="text-luxury-black/70 leading-relaxed">Extensiones que realzan tu mirada con un acabado natural, elegante y duradero.</p>
        <ul className="space-y-2 text-sm text-luxury-black/80 font-medium">
        <li className="flex items-center"><span className="material-icons text-primary text-xs mr-2">stars</span> Efecto Natural</li>
        <li className="flex items-center"><span className="material-icons text-primary text-xs mr-2">stars</span> Volumen Personalizado</li>
        <li className="flex items-center"><span className="material-icons text-primary text-xs mr-2">stars</span> Retoque Profesional</li>
        </ul>
        </div>
        {/* Servicio 2 */}
        <div className="bg-[#fdfcf5] p-10 rounded-xl space-y-6 transform hover:-translate-y-2 transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
        <span className="material-icons text-primary text-3xl p-3"><img src="uñasIcon.png" alt="uñasIcono" /></span>
        </div>
        <h4 className="text-2xl font-bold text-luxury-black">Uñas Acrílicas</h4>
        <p className="text-luxury-black/70 leading-relaxed">Expertos en colorimetría, cortes de tendencia y tratamientos de nutrición capilar avanzada.</p>
        <ul className="space-y-2 text-sm text-luxury-black/80 font-medium">
        <li className="flex items-center"><span className="material-icons text-primary text-xs mr-2">stars</span>Diseño Personalizado</li>
        <li className="flex items-center"><span className="material-icons text-primary text-xs mr-2">stars</span> Gel y Encapsulado</li>
        <li className="flex items-center"><span className="material-icons text-primary text-xs mr-2">stars</span> Alta Durabilidad</li>
        </ul>
        </div>
        {/* Servicio 3 */}
        <div className="bg-[#fdfcf5] p-10 rounded-xl space-y-6 transform hover:-translate-y-2 transition-all duration-300">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
        <span className="material-icons text-primary text-3xl p-2"><img src="piesIcon.png" alt="piesIcono" /></span>
        </div>
        <h4 className="text-2xl font-bold text-luxury-black">Acripie</h4>
        <p className="text-luxury-black/70 leading-relaxed">Belleza y elegancia para tus pies con acabados impecables y resistentes.</p>
        <ul className="space-y-2 text-sm text-luxury-black/80 font-medium">
        <li className="flex items-center"><span className="material-icons text-primary text-xs mr-2">stars</span> Aplicación Acrílica</li>
        <li className="flex items-center"><span className="material-icons text-primary text-xs mr-2">stars</span> Diseño Decorativo</li>
        <li className="flex items-center"><span className="material-icons text-primary text-xs mr-2">stars</span> Acabado Profesional</li>
        </ul>
        </div>
        
        {/* Servicio 4 */}
        <div className="bg-[#fdfcf5] p-10 rounded-xl space-y-6 transform hover:-translate-y-2 transition-all duration-300">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
        <span className="material-icons text-primary text-2xl p-2"><img src="pestañasIcon.png" alt="pestañasIcono" /></span>
        </div>
        <h4 className="text-2xl font-bold text-luxury-black">Cejas Laminadas</h4>
        <p className="text-luxury-black/70 leading-relaxed">Cejas definidas, alineadas y con efecto lifting para una mirada más expresiva.</p>
        <ul className="space-y-2 text-sm text-luxury-black/80 font-medium">
        <li className="flex items-center"><span className="material-icons text-primary text-xs mr-2">stars</span> Efecto Peinado Natural</li>
        <li className="flex items-center"><span className="material-icons text-primary text-xs mr-2">stars</span> Mayor Definición</li>
        <li className="flex items-center"><span className="material-icons text-primary text-xs mr-2">stars</span> Duración Prolongada</li>
        </ul>
        </div>
        </div>
        </div>
        </section>
    );
}