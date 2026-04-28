import { AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialog, AlertDialogAction } from "@/components/ui/alert-dialog";

type Props = {
  deleteOpen: boolean;
  setDeleteOpen: (value: boolean) => void;
  deleteId: number;
  deleteNombre: string;
  handleDelete: (id: number, nombre: string) => void;
};

export default function DeleteServiciosDialog({
  deleteOpen,
  setDeleteOpen,
  deleteId,
  deleteNombre,
  handleDelete,
}: Props) {
  return (
   <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-surface-dark border-border-dark text-background-light sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-500 font-bold text-xl">
              ¿Estás completamente segura?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-cream-label/80">
              Esta acción no se puede deshacer. Se eliminará permanentemente el
              servicio{" "}
              <span className="text-primary font-bold">"{deleteNombre}"</span>{" "}
              de la base de datos del salón.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            {/* Botón de Cancelar */}
            <AlertDialogCancel className="bg-surface-input border-border-dark text-cream-label hover:bg-surface-input/80 hover:text-white">
              Cancelar
            </AlertDialogCancel>

            {/* Botón de Eliminar */}
            <AlertDialogAction
              onClick={() => handleDelete(deleteId, deleteNombre)}
              className="bg-red-600 text-white hover:bg-red-700 font-bold"
            >
              Sí, eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  );
}