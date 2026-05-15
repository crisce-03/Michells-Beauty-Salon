import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;

  formData: {
    nombre: string;
    categoria: string;
    precio: string;
    duracion: string;
    estado: string;
    imagen: string | null;
  };

  isSubmitting: boolean;
  errorMsg: string;

  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;

  handleSubmit: (e: React.FormEvent) => void;

  previewImageUrl: string | null;
};

export default function CreateServicioModal({
  open,
  setOpen,
  formData,
  isSubmitting,
  errorMsg,
  handleChange,
  handleSubmit,
  previewImageUrl,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-luxury-black shadow-lg shadow-primary/20 hover:opacity-90 transition-all gap-2">
          <span className="material-symbols-outlined text-[20px]">
            add_circle
          </span>
          Nuevo Servicio
        </button>
      </DialogTrigger>

      <DialogContent className="bg-surface-dark border-border-dark text-background-light sm:max-w-[500px] p-8">
        <DialogHeader>
          <DialogTitle className="font-signature text-4xl text-primary glow-text text-center mb-4">
            Crear Servicio
          </DialogTitle>
        </DialogHeader>

        {/* Formulario de crear servicio */}
        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm  text-center">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-3 grid-rows-3 gap-4">
            <div className="relative flex flex-col col-span-1 row-span-3 items-center justify-center rounded-xl border-2 border-dashed border-border-dark bg-surface-input/30 p-8 text-center transition-all hover:bg-surface-input/60 group cursor-pointer">
              <input
                type="file"
                name="imagen"
                onChange={handleChange}
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer z-30"
              />

              {previewImageUrl ? (
                <div className="absolute inset-0 z-10">
                  <img
                    src={previewImageUrl}
                    alt="Vista previa"
                    className="w-full h-full object-contain rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm font-bold shadow-black drop-shadow-md">
                      Cambiar imagen
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 z-10">
                  <div className="size-24 rounded-full bg-luxury-black border border-primary/30 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform overflow-hidden shadow-lg shadow-primary/5">
                    <span className="material-symbols-outlined text-primary text-4xl">
                      diamond
                    </span>
                  </div>
                  <span className="text-sm font-bold text-primary group-hover:text-primary-light transition-colors">
                    Subir imagen
                  </span>
                  <p className="text-xs text-text-muted mt-2 italic">
                    SVG, PNG o JPG (Máx. 2MB)
                  </p>
                </div>
              )}
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-cream-label mb-2 uppercase tracking-tighter">
                Nombre del Servicio
              </label>
              <input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="input-dark-luxury w-full rounded-lg bg-surface-input border border-border-dark py-2.5 px-4 text-white focus:border-primary outline-none"
                placeholder="Ej. Balayage Premium"
                type="text"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-cream-label mb-2 uppercase tracking-tighter">
                Categoría
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="w-full bg-surface-input border border-border-dark rounded-lg py-2.5 px-4 text-white focus:border-primary outline-none appearance-none"
              >
                <option value="Uñas">Uñas</option>
                <option value="Pestañas">Pestañas</option>
                <option value="Acripie">Acripie</option>
                <option value="Cejas">Cejas</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-cream-label mb-2 uppercase tracking-tighter">
                Precio ($)
              </label>
              <input
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
                className="input-dark-luxury w-full rounded-lg bg-surface-input border border-border-dark py-2.5 px-4 text-white focus:border-primary outline-none"
                placeholder="0.00"
                type="number"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-cream-label mb-2 uppercase tracking-tighter">
                Duración (min)
              </label>
              <input
                name="duracion"
                value={formData.duracion}
                onChange={handleChange}
                className="input-dark-luxury w-full rounded-lg bg-surface-input border border-border-dark py-2.5 px-4 text-white focus:border-primary outline-none"
                placeholder="60"
                type="number"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-cream-label mb-2 uppercase tracking-tighter">
                Estado Inicial
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full bg-surface-input border border-border-dark rounded-lg py-2.5 px-4 text-white focus:border-primary outline-none appearance-none"
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-background-dark font-bold py-3 rounded-lg shadow-lg hover:brightness-110 transition-all uppercase text-sm tracking-widest mt-4"
          >
            {isSubmitting ? "Guardando..." : "Guardar Servicio"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
