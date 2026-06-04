
import { Suspense } from "react";
import ReservePage from "@/features/reserve/ReservePage";

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ReservePage />
    </Suspense>
  );
}
