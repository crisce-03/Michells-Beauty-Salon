"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./nav";

interface DesktopSidebarProps {
  userEmail: string | null;
  handleLogout: () => void;
  isLoggingOut: boolean;
}

export const DesktopSidebar = ({ userEmail, handleLogout, isLoggingOut }: DesktopSidebarProps) => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const baseClasses = "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group text-sm font-medium";
  const inactiveClasses = "text-gray-500 dark:text-text-muted hover:bg-gray-50 dark:hover:bg-white/5";
  const activeClasses = "bg-primary/10 text-primary dark:bg-primary/10 dark:text-primary border border-primary/20";

  return (
    <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white dark:bg-surface-dark dark:border-border-dark lg:flex h-screen sticky top-0">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-6 border-b border-gray-200 dark:border-border-dark">
        <div className="size-10 shrink-0 rounded-full overflow-hidden border border-primary/30 flex items-center justify-center bg-black">
          <img src="/logo_original.jpg" alt="Logo Michell's Beauty" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-primary truncate">
          Michell's Beauty
        </h1>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        {navLinks.map(({ href, icon, label }) => (
          <Link key={href} href={href} className={`${baseClasses} ${isActive(href) ? activeClasses : inactiveClasses}`}>
            <span className="material-symbols-outlined text-2xl group-hover:text-primary transition-colors">
              {icon}
            </span>
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* Nueva Cita */}
      <div className="px-4 pb-2">
        <Link href="/Reserve">
          <button className="flex items-center gap-3 w-full p-2 text-sm font-medium text-gray-500 dark:text-text-muted hover:text-primary dark:hover:text-primary hover:bg-primary/10 rounded-lg transition-colors group justify-center">
            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
              calendar_add_on
            </span>
            <span>Nueva Cita</span>
          </button>
        </Link>
      </div>

      {/* Cerrar Sesión */}
      <div className="px-4 pb-4">
        <button onClick={handleLogout} disabled={isLoggingOut} className="flex items-center gap-3 w-full p-2 text-sm font-medium text-gray-500 dark:text-text-muted hover:text-[#ef4444] dark:hover:text-[#ef4444] hover:bg-[#ef4444]/10 rounded-lg transition-colors group justify-center disabled:opacity-50">
          <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
            {isLoggingOut ? "sync" : "logout"}
          </span>
          <span>{isLoggingOut ? "Saliendo..." : "Cerrar Sesión"}</span>
        </button>
      </div>

      {/* Usuario Dinámico */}
      <div className="border-t border-gray-200 dark:border-border-dark p-4">
        <div className="flex items-center gap-3 px-2">
          <div className="size-10 rounded-full bg-cover bg-center ring-2 ring-primary/30 flex items-center justify-center bg-surface-dark text-primary font-bold uppercase">
            {userEmail && userEmail !== "Cargando..." ? userEmail.charAt(0) : "?"}
          </div>
          <div className="flex flex-col overflow-hidden">
            <p className="text-sm font-semibold text-gray-900 dark:text-primary truncate">
              {userEmail !== "Cargando..." ? userEmail?.split('@')[0] : "Cargando..."}
            </p>
            <p className="text-xs text-gray-500 dark:text-text-muted truncate">
              {userEmail}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};