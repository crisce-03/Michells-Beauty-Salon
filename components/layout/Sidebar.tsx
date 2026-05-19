"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createBrowserClient } from '@supabase/ssr'; // <-- Importamos Supabase

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter(); // <-- Para redirigir al login al salir
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Estados para manejar los datos del usuario
  const [userEmail, setUserEmail] = useState<string | null>("Cargando...");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Inicializamos Supabase
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 1. Efecto para obtener el usuario activo al cargar el componente
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email ?? "Usuario");
      }
    };
    fetchUser();
  }, [supabase.auth]);

  // 2. Función para cerrar sesión
  const handleLogout = async () => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    router.refresh(); // Refrescamos para que el middleware detecte que ya no hay sesión
    router.push("/login"); // Mandamos al login
  };

  // Cierra el menú al cambiar de ruta
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Evita scroll del body cuando el menú está abierto
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (path: string) => pathname === path;

  const baseClasses =
    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group text-sm font-medium";
  const inactiveClasses =
    "text-gray-500 dark:text-text-muted hover:bg-gray-50 dark:hover:bg-white/5";
  const activeClasses =
    "bg-primary/10 text-primary dark:bg-primary/10 dark:text-primary border border-primary/20";

  const navLinks = [
    { href: "/dashboardAdmin", icon: "grid_view", label: "Tablero" },
    { href: "/dashboardAdmin/citas", icon: "calendar_month", label: "Citas" },
    { href: "/dashboardAdmin/servicios", icon: "spa", label: "Servicios" },
    { href: "/dashboardAdmin/horarios", icon: "schedule", label: "Horarios" },
    { href: "/dashboardAdmin/estadisticas", icon: "leaderboard", label: "Estadísticas" },
  ];

  const SidebarContent = () => (
    <>
      {/* Logo */}
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

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        {navLinks.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`${baseClasses} ${isActive(href) ? activeClasses : inactiveClasses}`}
          >
            <span className="material-symbols-outlined text-2xl group-hover:text-primary transition-colors">
              {icon}
            </span>
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* Nueva Cita */}
      <Link href="/Reserve">
        <button className="flex items-center gap-3 w-full p-2 text-sm font-medium text-gray-500 dark:text-text-muted hover:text-primary dark:hover:text-primary hover:bg-primary/10 rounded-lg transition-colors group justify-center">
          <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
            calendar_add_on
          </span>
          <span>Nueva Cita</span>
        </button>
      </Link>

      {/* 🔄 Cerrar Sesión (Ahora ejecuta handleLogout) */}
      <button 
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="flex items-center gap-3 w-full p-2 text-sm font-medium text-gray-500 dark:text-text-muted hover:text-[#ef4444] dark:hover:text-[#ef4444] hover:bg-[#ef4444]/10 rounded-lg transition-colors group justify-center disabled:opacity-50"
      >
        <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
          {isLoggingOut ? "sync" : "logout"}
        </span>
        <span>{isLoggingOut ? "Saliendo..." : "Cerrar Sesión"}</span>
      </button>

      {/* 🔄 Usuario Dinámico */}
      <div className="border-t border-gray-200 dark:border-border-dark p-4">
        <div className="flex items-center gap-3 px-2">
          <div
            className="size-10 rounded-full bg-cover bg-center ring-2 ring-primary/30 flex items-center justify-center bg-surface-dark text-primary font-bold uppercase"
          >
            {/* Si no hay imagen de perfil en Supabase, mostramos la primera letra del correo */}
            {userEmail !== "Cargando..." ? userEmail?.charAt(0) : "?"}
          </div>
          <div className="flex flex-col overflow-hidden">
            <p className="text-sm font-semibold text-gray-900 dark:text-primary truncate">
              {/* Extraemos el nombre antes del @, ej: admin@correo.com -> admin */}
              {userEmail !== "Cargando..." ? userEmail?.split('@')[0] : "Cargando..."}
            </p>
            <p className="text-xs text-gray-500 dark:text-text-muted truncate">
              {userEmail}
            </p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* ===== DESKTOP SIDEBAR ===== */}
      <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white dark:bg-surface-dark dark:border-border-dark lg:flex">
        <SidebarContent />
      </aside>

      {/* ===== MOBILE TOPBAR ===== */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between px-4 bg-white dark:bg-surface-dark border-b border-gray-200 dark:border-border-dark">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full overflow-hidden border border-primary/30 bg-black">
            <img src="/logo_original.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-sm font-bold text-gray-900 dark:text-primary">
            Michell's Beauty
          </span>
        </div>

        {/* Botón hamburguesa */}
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          aria-label="Abrir menú"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
      </header>

      {/* ===== MOBILE DRAWER ===== */}
      {/* Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-50 h-full w-72 flex flex-col bg-white dark:bg-surface-dark border-r border-gray-200 dark:border-border-dark transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Botón cerrar */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          aria-label="Cerrar menú"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <SidebarContent />
      </aside>

      {/* Espaciado en mobile para que el contenido no quede bajo el topbar */}
      <div className="lg:hidden h-14" />
    </>
  );
};