"use client"


import Link from "next/link";

export default function BannerReserve() {

    return(

        <section className="py-20 px-6" id="reservar">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-primary to-[#d4b411] p-12 text-center text-luxury-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <h3 className="text-4xl font-bold mb-6">¿Lista para brillar?</h3>
        <p className="text-lg mb-10 max-w-xl mx-auto font-medium opacity-90">Reserva tu cita hoy mismo y déjate consentir por profesionales. Tu belleza es nuestra pasión.</p>
        <a className="inline-flex items-center bg-luxury-black text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform" href="https://wa.me/#">
        <span className="material-icons mr-2">calendar_today</span>
                        Agendar por WhatsApp
                    </a>
        <a className="inline-flex items-center bg-luxury-black text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform ml-5" href="/Reserve">
        <span className="material-icons mr-2">calendar_today</span>
                        Agendar en la Web
                    </a>
        </div>
        </section>
    );
}