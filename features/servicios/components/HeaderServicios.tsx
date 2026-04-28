import Link from "next/link";



export default function HeaderServices({ children }: any) {
  return (
    <div className="space-y-4">
        <nav className="flex text-sm text-gray-500 dark:text-text-muted">
          <Link href="/dashboardAdmin" className="hover:text-primary transition-colors">Inicio</Link>
          <span className="mx-2 text-primary">/</span>
          <span className="text-gray-900 font-medium dark:text-primary">Catálogo de Servicios</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-cream-label">Catálogo de Servicios</h2>
            <p className="text-gray-500 dark:text-text-muted mt-1">Gestione el menú de tratamientos y servicios de belleza.</p>
          </div>
          {children}
        </div>
      </div>
  );
}