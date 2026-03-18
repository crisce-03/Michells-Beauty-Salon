import React from 'react';
import {Sidebar} from '@/components/layout/Sidebar'; 
import { Toaster } from "@/components/ui/sonner";

export default function DashboardAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background-light dark:bg-background-dark text-gray-900 dark:text-cream-label antialiased">
      
      {/* Sidebar fijo a la izquierda */}
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Móvil (Solo visible en pantallas pequeñas) */}
        <header className="lg:hidden flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:bg-surface-dark dark:border-border-dark">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">diamond</span>
            <span className="font-bold text-lg dark:text-primary">Michell's Beauty</span>
          </div>
          <button className="text-gray-500 dark:text-text-muted hover:text-primary transition-colors">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        {/* Aquí se inyectan las páginas (page.tsx de tablero, citas, etc.) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          {children}
          <Toaster theme="dark" richColors />
        </div>
      </main>
    </div>
  );
}