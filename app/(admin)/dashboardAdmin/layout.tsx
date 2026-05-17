import React from 'react';
import {Sidebar} from '@/components/layout/Sidebar'; 
import { Toaster } from "@/components/ui/sonner";

export default function DashboardAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background-light dark:bg-background-dark text-gray-900 dark:text-cream-label antialiased">
      
      {/* Sidebar fijo a la izquierda */}
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
       

        {/* Aquí se inyectan las páginas (page.tsx de tablero, citas, etc.) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          {children}
          <Toaster theme="dark" richColors />
        </div>
      </main>
    </div>
  );
}