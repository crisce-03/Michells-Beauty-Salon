"use client"

import Link from "next/link"

export default function Login() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background-dark px-4 font-display">
      
      <div className="w-full max-w-md">
        
        {/* Usamos tu clase .img_conteiner para centrar y dar espacio */}
        <div className="img_conteiner">
          {/* Aplicamos la clase .logo que tiene la animación glow */}
          <img 
            className="logo" 
            src="/logo_original.jpg" 
            alt="Logo Michell's Beauty" 
          />
          
          {/* Aplicamos .title-logo y envolvemos el texto en un span para la animación iluminate */}
          <h1 className="font-signature text-2xl text-primary glow-text tracking-wider mt-5">
            Michell's Beauty
          </h1>
          
          <p className="mt-4 text-text-muted text-sm uppercase tracking-widest text-center">
            Panel Administrativo
          </p>
        </div>

        {/* Tarjeta del Formulario */}
        <div className="bg-surface-dark border border-border-dark p-8 rounded-xl shadow-2xl mt-8">
          <form className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-cream-label mb-2 uppercase" htmlFor="email">
                Correo electrónico
              </label>
              <input 
                className="w-full bg-surface-input border border-border-dark rounded-lg py-3 px-4 text-background-light focus:outline-none focus:border-primary transition-colors sm:text-sm" 
                id="email" 
                type="email"
                placeholder="admin@michellsbeauty.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-cream-label mb-2 uppercase" htmlFor="password">
                Contraseña
              </label>
              <input 
                className="w-full bg-surface-input border border-border-dark rounded-lg py-3 px-4 text-background-light focus:outline-none focus:border-primary transition-colors sm:text-sm" 
                id="password" 
                type="password"
                placeholder="••••••••"
              />
            </div>

            <Link href="/dashboardAdmin">
                <button 
              className="w-full bg-primary text-background-dark font-bold py-3 px-4 rounded-lg shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200 uppercase text-sm tracking-widest"
              type="submit"
            >
              Iniciar Sesión
            </button>
            </Link>
            
          </form>

          <div className="mt-8 pt-6 border-t border-border-dark text-center">
            <p className="text-xs text-text-muted">
              ¿Olvidaste tus credenciales? <br />
              <span className="text-primary hover:underline cursor-pointer mt-1 inline-block">
                Contactar a Soporte Técnico
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}