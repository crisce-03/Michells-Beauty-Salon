
type AppointmentStatus = "Confirmado" | "Pendiente" | "Cancelado";

interface Appointment {
  id: number;
  name: string;
  service: string;
  duration: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  avatar?: string;
  initials?: string;
}

interface StatCardProps {
  icon: string;
  title: string;
  value: string | number;
  trend?: string;
  iconBgClass: string;
  iconColorClass: string;
}

interface StatusBadgeProps {
  status: AppointmentStatus;
}
export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles: Record<AppointmentStatus, string> = {
    Confirmado: "bg-primary text-luxury-black border-primary",
    Pendiente: "bg-transparent text-primary border-primary",
    Cancelado: "bg-surface-input text-text-muted border-border-dark",
  };
  
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold border ${styles[status]}`}>
      {status}
    </span>
  );
};