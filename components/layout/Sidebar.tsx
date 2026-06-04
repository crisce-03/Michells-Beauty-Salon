"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from '@supabase/ssr';
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileNav } from "./MobileNav";

export const Sidebar = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>("Cargando...");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email ?? "Usuario");
      } else {
        setUserEmail(null);
      }
    };
    fetchUser();
  }, [supabase.auth]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    router.refresh();
    router.push("/login");
  };

  return (
    <>
      {/* Vista de Escritorio */}
      <DesktopSidebar 
        userEmail={userEmail} 
        handleLogout={handleLogout} 
        isLoggingOut={isLoggingOut} 
      />

      {/* Vista Móvil */}
      <MobileNav 
        handleLogout={handleLogout} 
        isLoggingOut={isLoggingOut} 
      />

      {/* Espaciadores Móviles para que el contenido de tu página no quede tapado */}
      <div className="lg:hidden h-14" /> {/* Espacio para el header superior */}
      <div className="lg:hidden h-16" /> {/* Espacio para el nav inferior */}
    </>
  );
};