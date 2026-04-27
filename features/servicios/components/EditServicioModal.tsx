import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;

  handleUpdate: (e: React.FormEvent) => void;
};

export default function EditServicioModal({
  open,
  setOpen,
  editFormData,
  isEditSubmitting,
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
            <div className="grid grid-cols-2 gap-4">
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
                  <option value="Cabello">Cabello</option>
                  <option value="Uñas">Uñas</option>
                  <option value="Maquillaje">Maquillaje</option>
                  <option value="Piel">Piel</option>
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
    )
}