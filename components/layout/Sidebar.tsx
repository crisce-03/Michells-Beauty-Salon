"use client"; // Necesario porque usamos usePathname

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Sidebar = () => {
  const pathname = usePathname();

  // Función para saber si el link está activo
  const isActive = (path: string) => pathname === path;

  // Clases base y estados para que el código sea más limpio
  const baseClasses = "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group text-sm font-medium";
  const inactiveClasses = "text-gray-500 dark:text-text-muted hover:bg-gray-50 dark:hover:bg-white/5";
  const activeClasses = "bg-primary/10 text-primary dark:bg-primary/10 dark:text-primary border border-primary/20";

  return (
    <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white dark:bg-surface-dark dark:border-border-dark lg:flex">
      <div className="flex h-16 items-center gap-3 px-6 border-b border-gray-200 dark:border-border-dark">
  <div className="size-10 shrink-0 rounded-full overflow-hidden border border-primary/30 flex items-center justify-center bg-black">
    <img 
      src="/logo_original.jpg" 
      alt="Logo Michell's Beauty" 
      className="w-full h-full object-cover"
    />
  </div>
  <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-primary truncate">
    Michell's Beauty
  </h1>
</div>
      
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        <Link 
          href="/dashboardAdmin" 
          className={`${baseClasses} ${isActive('/dashboardAdmin') ? activeClasses : inactiveClasses}`}
        >
          <span className="material-symbols-outlined text-2xl group-hover:text-primary transition-colors">grid_view</span>
          <span>Tablero</span>
        </Link>
        
        <Link 
          href="/dashboardAdmin/citas" 
          className={`${baseClasses} ${isActive('/dashboardAdmin/citas') ? activeClasses : inactiveClasses}`}
        >
          <span className="material-symbols-outlined text-2xl font-variation-fill group-hover:text-primary transition-colors">calendar_month</span>
          <span>Citas</span>
        </Link>
        
        <Link 
          href="/dashboardAdmin/servicios" 
          className={`${baseClasses} ${isActive('/dashboardAdmin/servicios') ? activeClasses : inactiveClasses}`}
        >
          <span className="material-symbols-outlined text-2xl group-hover:text-primary transition-colors">spa</span>
          <span>Servicios</span>
        </Link>
        
        <Link 
          href="/dashboardAdmin/horarios" 
          className={`${baseClasses} ${isActive('/dashboardAdmin/horarios') ? activeClasses : inactiveClasses}`}
        >
          <span className="material-symbols-outlined text-2xl group-hover:text-primary transition-colors">schedule</span>
          <span>Horarios</span>
        </Link>

         <Link 
          href="/dashboardAdmin/estadisticas" 
          className={`${baseClasses} ${isActive('/dashboardAdmin/estadisticas') ? activeClasses : inactiveClasses}`}
        >
          <span className="material-symbols-outlined text-2xl group-hover:text-primary transition-colors">leaderboard</span>
          <span>Estadisticas</span>
        </Link>
        
        <Link 
          href="/dashboardAdmin/configuracion" 
          className={`${baseClasses} ${isActive('/dashboardAdmin/configuracion') ? activeClasses : inactiveClasses}`}
        >
          <span className="material-symbols-outlined text-2xl group-hover:text-primary transition-colors">settings</span>
          <span>Configuración</span>
        </Link>
      </nav>

      <button 
            // Aquí luego pondrás tu lógica (ej. onClick={() => signOut()})
            className="flex items-center gap-3 w-full p-2 text-sm font-medium text-gray-500 dark:text-text-muted hover:text-[#ef4444] dark:hover:text-[#ef4444] hover:bg-[#ef4444]/10 rounded-lg transition-colors group justify-center"
          >
            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">logout</span>
            <span>Cerrar Sesión</span>
          </button>
          
      <div className="border-t border-gray-200 dark:border-border-dark p-4">
        <div className="flex items-center gap-3 px-2">
          <div className="size-10 rounded-full bg-cover bg-center ring-2 ring-primary/30" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDQ1WbidZrntKtkeAySMeqsjT7o2QaMoFLaCFkDu6rk5SpkvCG1mU_AcWol542shNa90Z5UnLtbtVZBHAIrmMMGF-xypBNKZqo-oFEKJmPG436WZQJh9xX2Q5vbJ9ay6TLZoK3TMuNRMV0RxqPEdA0isYKzJm7cD7XGI4rQ-uSXk3nmSdBZ7yCitb8W_OLWJ-omFcToTrHyRCYczFOOVek3VD_xsj83ADXW9IUDtmWdZpcu6-uEz0ZbawZbyfNFM54aswUlFSXNCnA')" }}></div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-gray-900 dark:text-primary">Michell Admin</p>
            <p className="text-xs text-gray-500 dark:text-text-muted">Propietaria</p>
          </div>

          
        </div>


        
      </div>
    </aside>
  );
};