// Ubicación: src/features/auth/components/LoginForm.tsx (o similar)
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from '@supabase/ssr';

export default function LoginForm() {
  const router = useRouter();
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError(null);
    setIsLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (data.session) {
        router.refresh(); 
        router.push("/dashboardAdmin");
      }
    } catch (err: any) {
      setError(err.message === "Invalid login credentials" 
        ? "Correo o contraseña incorrectos." 
        : "Ocurrió un error al iniciar sesión. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background-dark px-4 font-display">
      <div className="w-full max-w-md">
        
        {/* Encabezado y Logo */}
        <div className="img_conteiner">
          <img className="logo" src="/logo_original.jpg" alt="Logo Michell's Beauty" />
          <h1 className="font-signature text-2xl text-primary text-center glow-text tracking-wider mt-5">
            Michell's Beauty
          </h1>
          <p className="mt-4 text-text-muted text-sm uppercase tracking-widest text-center">
            Panel Administrativo
          </p>
        </div>

        {/* Tarjeta del Formulario */}
        <div className="bg-surface-dark border border-border-dark p-8 rounded-xl shadow-2xl mt-8">
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center font-medium animate-pulse">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-medium text-cream-label mb-2 uppercase tracking-wider" htmlFor="email">
                Correo electrónico
              </label>
              <input 
                className="w-full bg-surface-input border border-border-dark rounded-lg py-3 px-4 text-background-light focus:outline-none focus:border-primary transition-colors sm:text-sm" 
                id="email" type="email" placeholder="admin@michellsbeauty.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                required disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-cream-label mb-2 uppercase tracking-wider" htmlFor="password">
                Contraseña
              </label>
              <input 
                className="w-full bg-surface-input border border-border-dark rounded-lg py-3 px-4 text-background-light focus:outline-none focus:border-primary transition-colors sm:text-sm" 
                id="password" type="password" placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)}
                required disabled={isLoading}
              />
            </div>

            <button 
              className="w-full bg-primary text-background-dark font-bold py-3 px-4 rounded-lg shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200 uppercase text-sm tracking-widest disabled:opacity-50 flex justify-center items-center gap-2"
              type="submit" disabled={isLoading}
            >
              {isLoading ? (
                <><span className="material-symbols-outlined animate-spin text-[18px]">sync</span>Autenticando...</>
              ) : "Iniciar Sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}