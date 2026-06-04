"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./nav"; 

interface MobileNavProps {
  handleLogout: () => void;
  isLoggingOut: boolean;
}

export const MobileNav = ({ handleLogout, isLoggingOut }: MobileNavProps) => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between px-4 bg-white dark:bg-[#111111] border-b border-gray-200 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full overflow-hidden border border-primary/30 bg-black">
            <img src="/logo_original.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[120px]">
            Michell's Beauty
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboardAdmin/reserve" className="flex items-center justify-center p-1.5 text-primary bg-primary/10 rounded-md">
            <span className="material-symbols-outlined text-xl">calendar_add_on</span>
          </Link>
          <button onClick={handleLogout} disabled={isLoggingOut} className="flex items-center justify-center p-1.5 text-[#ef4444] hover:bg-[#ef4444]/10 rounded-md transition-colors">
            <span className="material-symbols-outlined text-xl">{isLoggingOut ? "sync" : "logout"}</span>
          </button>
        </div>
      </header>

      <nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#0E0E11] border-t border-gray-200 dark:border-white/10 flex justify-between items-center px-1"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} /* Previene que se superponga con la barra de iOS */
      >
        {navLinks.map(({ href, icon, label }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center w-full py-2 space-y-1 transition-colors ${
                active 
                  ? "text-primary dark:text-white" 
                  : "text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-gray-200"
              }`}
            >
              <span className={`material-symbols-outlined text-[22px] ${active ? 'fill-current' : ''}`}>
                {icon}
              </span>
              <span className="text-[10px] font-medium truncate w-full text-center px-1">
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};