"use client";

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-80px)]  hero-video-container  flex items-center justify-center" id="inicio">
    <div className="absolute inset-0 z-0">
    <img alt="Luxurious salon interior" className="w-full h-full object-cover brightness-[0.4]" data-alt="Luxurious golden themed hair salon interior" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjaEOCl__znmvXGIeJDZOAuWBERjaUPBnHyA8AiJhjgoSZOKYwhyCRXRCKbq012hejq709h3VmdPIevbfmea9NkdXV8GLi8NWA_DB4_OxlXtcsXqwDnD7Ku6jLlHHhFyY5hBb9Hha8KYQ4k8DuWWagfCn9ktJwHQ5V2KVOSrvk0DV7aEFJarw2qZG8Rey5FuTZSKh7HElDavGdOnnD9hkMbSOCmvqJ0HYnoVaa6vnYzkMqGwYgqubRI4oweVmAzFKpF9gpoeCHHBY"/>
    </div>
    <div className="absolute inset-0 hero-overlay z-10"></div>
    <div className="relative z-20 text-center space-y-6 px-4">
       <div className="img_conteiner">
            <img className="logo" src="logo_original.jpg" />
    
           <h1 className="title-logo flex flex-wrap justify-center">
            {/* Palabra 1 */}
            <div className="inline-block whitespace-nowrap text-black">
              <span>M</span><span>i</span><span>c</span><span>h</span><span>e</span><span>l</span><span>l</span><span>'</span><span>s</span>
            </div>
            <span className="inline-block">&nbsp;</span>
            
            <div className="inline-block whitespace-nowrap text-black">
              <span>B</span><span>e</span><span>a</span><span>u</span><span>t</span><span>y</span>
            </div>
          </h1>
            
        </div>
    <p className="text-xl md:text-2xl text-white/60 tracking-[0.3em] uppercase font-light">El arte de resaltar tu belleza</p>
    <div className="pt-8">
    <a className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-primary/30 text-primary animate-bounce" href="#trabajo">
    <span className="material-icons">expand_more</span>
    </a>
    </div>
    </div>
    </section>
  );
}