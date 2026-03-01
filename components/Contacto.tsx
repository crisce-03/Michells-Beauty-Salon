"use client"

import Link from "next/link";

export default function Contacto(){
    return(
        <section className="py-24 px-6 border-t border-primary/10" id="contacto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-12">
        <div>
        <h2 className="text-primary uppercase tracking-widest text-sm mb-2 font-bold">Ubícanos</h2>
        <h3 className="text-4xl font-bold text-white mb-6">Visítanos en Santa Ana</h3>
        <p className="text-white/60 text-lg leading-relaxed">Nos encontramos en el corazón de Santa Ana, El Salvador. Un espacio diseñado para tu comodidad y relax.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
        <span className="material-icons text-primary">location_on</span>
        </div>
        <div>
        <h4 className="text-white font-bold mb-1">Dirección</h4>
        <p className="text-white/50 text-sm">9a av nte NO 47, frente a iglesia Santa Barbara, Santa Ana, Santa Ana</p>
        </div>
        </div>
        <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
        <span className="material-icons text-primary">phone</span>
        </div>
        <div>
        <h4 className="text-white font-bold mb-1">Teléfono</h4>
        <p className="text-white/50 text-sm">+503 6930-3080</p>
        </div>
        </div>
        <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
        <span className="material-icons text-primary">share</span>
        </div>
   <div className="text-white">
  <h4 className="font-bold mb-4 text-lg tracking-wide">
    Redes Sociales
  </h4>

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
        </div>
        </div>
        </div>
        <div className="relative h-[450px] rounded-2xl overflow-hidden grayscale contrast-125 border border-primary/20">
       <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3871.3308046897137!2d-89.55518602490523!3d13.998388886419729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDU5JzU0LjIiTiA4OcKwMzMnMDkuNCJX!5e0!3m2!1ses-419!2ssv!4v1725576428456!5m2!1ses-419!2ssv"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-xl shadow-lg"
      >     
      </iframe>
        </div>       
        </div>
        </section>
    );
}