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

export const StatCard = ({ icon, title, value, trend, iconBgClass, iconColorClass }: StatCardProps) => (
  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:bg-surface-dark dark:border-border-dark">
    <div className="flex items-center gap-4">
      <div className={`rounded-lg p-3 dark:bg-primary/10 dark:text-primary ${iconBgClass} ${iconColorClass}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-text-muted">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-cream-label">{value}</p>
      </div>
      {trend && (
        <div className="ml-auto flex items-baseline text-sm font-semibold text-green-600 dark:text-green-400">
          <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
          {trend}
        </div>
      )}
    </div>
  </div>
);