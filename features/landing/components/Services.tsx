"use client";

import Link from "next/link";

export default function Services() {
  return (
    <section className="py-24 px-6 bg-background-dark/30" id="servicios">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-primary uppercase tracking-widest text-sm mb-2 font-bold">
            Nuestra Especialidad
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white">
            Servicios Exclusivos
          </h3>
        </div>
        <div className="grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Servicio 1 */}
          <div className="bg-[#fdfcf5] p-10 rounded-xl space-y-6 transform hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="material-icons text-primary text-3xl p-2">
                <img src="cejasIcon.png" alt="cejasIcono" />
              </span>
            </div>
            <h4 className="text-2xl font-bold text-luxury-black">
              Pestañas Pelo a Pelo
            </h4>
            <p className="text-luxury-black/70 text-sm leading-relaxed">
              Técnica personalizada que consiste en colocar una extensión sobre
              cada pestaña natural, logrando un efecto elegante, natural y más
              definido.
            </p>
            <p className="text-luxury-black/70 text-sm leading-relaxed">
              Este servicio ayuda a resaltar tu mirada, aportando longitud,
              volumen y curvatura sin necesidad de usar máscara diariamente.
              Cada aplicación se adapta a la forma de tus ojos y al estilo que
              deseas lucir. ✨
            </p>
          </div>
          {/* Servicio 2 */}
          <div className="bg-[#fdfcf5] p-10 rounded-xl space-y-6 transform hover:-translate-y-2 transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="material-icons text-primary text-3xl p-3">
                <img src="unasIcon.png" alt="unasIcono" />
              </span>
            </div>
            <h4 className="text-2xl font-bold text-luxury-black">
              Uñas Acrílicas
            </h4>
            <p className="text-luxury-black/70 leading-relaxed">
              Este servicio es ideal para quienes desean uñas más largas,
              fuertes y con diseños personalizados que se adapten a su estilo y
              personalidad. ✨
            </p>
            <ul className="space-y-2 text-sm text-luxury-black/80 font-medium">
              <li className="flex items-center">
                <span className="material-icons text-primary text-xs mr-2">
                  stars
                </span>
                Mayor duración y resistencia
              </li>
              <li className="flex items-center">
                <span className="material-icons text-primary text-xs mr-2">
                  stars
                </span>{" "}
                Diseños personalizados y modernos
              </li>
              <li className="flex items-center">
                <span className="material-icons text-primary text-xs mr-2">
                  stars
                </span>{" "}
                Acabados elegantes y creativos
              </li>
              <li className="flex items-center">
                <span className="material-icons text-primary text-xs mr-2">
                  stars
                </span>{" "}
                Ideal para cualquier ocasión
              </li>
            </ul>
          </div>
          {/* Servicio 3 */}
          <div className="bg-[#fdfcf5] p-10 rounded-xl space-y-6 transform hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="material-icons text-primary text-3xl p-2">
                <img src="piesIcon.png" alt="piesIcono" />
              </span>
            </div>
            <h4 className="text-2xl font-bold text-luxury-black">Acripie y Pedicure</h4>
            <p className="text-luxury-black/70 leading-relaxed">
             Servicio ideal para lucir pies hermosos, cuidados y elegantes. El acrípie ayuda a dar una mejor apariencia y resistencia a las uñas, mientras la pedicura spa brinda limpieza, hidratación y relajación.
            </p>
            <ul className="space-y-2 text-sm text-luxury-black/80 font-medium">
              <li className="flex items-center">
                <span className="material-icons text-primary text-xs mr-2">
                  stars
                </span>{" "}
                Aplicación Acrílica
              </li>
              <li className="flex items-center">
                <span className="material-icons text-primary text-xs mr-2">
                  stars
                </span>{" "}
                Diseño Decorativo
              </li>
              <li className="flex items-center">
                <span className="material-icons text-primary text-xs mr-2">
                  stars
                </span>{" "}
                Acabado Profesional
              </li>
            </ul>
          </div>

          {/* Servicio 4 */}
          <div className="bg-[#fdfcf5] p-10 rounded-xl space-y-6 transform hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="material-icons text-primary text-2xl p-2">
                <img src="pestañasIcon.png" alt="pestañasIcono" />
              </span>
            </div>
            <h4 className="text-2xl font-bold text-luxury-black">
              Cejas Laminadas y con henna
            </h4>
            <p className="text-luxury-black/70 leading-relaxed">
             Servicio diseñado para definir, peinar y dar una apariencia más poblada y perfecta a tus cejas. El laminado acomoda el vello y la henna aporta color y definición para un acabado natural y elegante.
            </p>
            <ul className="space-y-2 text-sm text-luxury-black/80 font-medium">
              <li className="flex items-center">
                <span className="material-icons text-primary text-xs mr-2">
                  stars
                </span>{" "}
                Efecto Peinado Natural
              </li>
              <li className="flex items-center">
                <span className="material-icons text-primary text-xs mr-2">
                  stars
                </span>{" "}
                Mayor Definición
              </li>
              <li className="flex items-center">
                <span className="material-icons text-primary text-xs mr-2">
                  stars
                </span>{" "}
                Duración Prolongada
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
