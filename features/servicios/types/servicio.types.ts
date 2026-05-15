export type Service = {
  id: number;
  nombre: string;
  categoria: string;
  precio: string;
  duracion: string;
  estado: "Activo" | "Inactivo";
  imagen: File | null; 
  image_url: string | null;
};  