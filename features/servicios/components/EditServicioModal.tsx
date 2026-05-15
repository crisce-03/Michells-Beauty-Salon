import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;

  previewImageUrl: string | null;

  editFormData: {
    id: number;
    nombre: string;
    categoria: string;
    precio: string;
    duracion: string;
    estado: "Activo" | "Inactivo";
  };

  isEditSubmitting: boolean;

  handleEditChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;

  handleUpdate: (e: React.FormEvent) => void;
};

export default function EditServicioModal({
  open,
  setOpen,
  editFormData,
  isEditSubmitting,
  previewImageUrl,
  handleEditChange,
  handleUpdate,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-surface-dark border-border-dark text-background-light sm:max-w-[500px] p-8">
        <DialogHeader>
          <DialogTitle className="font-signature text-4xl text-primary glow-text text-center mb-4">
            Editar Servicio
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-5 mt-2">
          <div className="grid grid-cols-3 grid-rows-3 gap-4">
            <div className="relative flex flex-col col-span-1 row-span-3 items-center justify-center rounded-xl border-2 border-dashed border-border-dark bg-surface-input/30 p-8 text-center transition-all hover:bg-surface-input/60 group cursor-pointer">
              <input
                type="file"
                name="imagen"
                onChange={handleEditChange}
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
                Nombre
              </label>
              <input
                name="nombre"
                value={editFormData.nombre}
                onChange={handleEditChange}
                required
                className="input-dark-luxury w-full rounded-lg bg-surface-input border border-border-dark py-2.5 px-4 text-white focus:border-primary outline-none"
                type="text"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-cream-label mb-2 uppercase tracking-tighter">
                Categoría
              </label>
              <select
                name="categoria"
                value={editFormData.categoria}
                onChange={handleEditChange}
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
                value={editFormData.precio}
                onChange={handleEditChange}
                required
                className="input-dark-luxury w-full rounded-lg bg-surface-input border border-border-dark py-2.5 px-4 text-white focus:border-primary outline-none"
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
                value={editFormData.duracion || ""}
                onChange={handleEditChange}
                className="input-dark-luxury w-full rounded-lg bg-surface-input border border-border-dark py-2.5 px-4 text-white focus:border-primary outline-none"
                type="number"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-cream-label mb-2 uppercase tracking-tighter">
                Estado
              </label>
              <select
                name="estado"
                value={editFormData.estado}
                onChange={handleEditChange}
                className="w-full bg-surface-input border border-border-dark rounded-lg py-2.5 px-4 text-white focus:border-primary outline-none appearance-none"
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={isEditSubmitting}
            className="w-full bg-primary text-background-dark font-bold py-3 rounded-lg shadow-lg hover:brightness-110 transition-all uppercase text-sm tracking-widest mt-4"
          >
            {isEditSubmitting ? "Actualizando..." : "Actualizar Servicio"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
