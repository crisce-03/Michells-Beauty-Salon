import { PersonalData } from "../../types/reserva.types"; 

interface Props {
  data: PersonalData;
  onChange: (field: keyof PersonalData, value: string | boolean) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function FormDatosCliente({ data, onChange, onBack, onNext }: Props) {
  return (
    <div className="bg-surface-dark border border-border-dark rounded-2xl p-6 md:p-10 shadow-xl">
      <h2 className="text-2xl font-serif text-white mb-8 border-b border-border-dark pb-4">
        Información Personal
      </h2>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre */}
          <div className="col-span-1 md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-cream-label" htmlFor="fullname">
              Nombre Completo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-text-muted/50">person</span>
              </div>
              <input
                id="fullname"
                type="text"
                value={data.nombre}
                onChange={(e) => onChange("nombre", e.target.value)}
                placeholder="Ej. María González"
                className="block w-full pl-11 pr-4 py-3.5 bg-surface-input border border-border-dark rounded-xl text-white placeholder-text-muted/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors sm:text-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-cream-label" htmlFor="email">
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-text-muted/50">mail</span>
              </div>
              <input
                id="email"
                type="email"
                value={data.correo}
                onChange={(e) => onChange("correo", e.target.value)}
                placeholder="correo@ejemplo.com"
                className="block w-full pl-11 pr-4 py-3.5 bg-surface-input border border-border-dark rounded-xl text-white placeholder-text-muted/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors sm:text-sm"
              />
            </div>
          </div>

          {/* Teléfono */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-cream-label" htmlFor="phone">
              Teléfono
            </label>
            <div className="relative flex rounded-xl bg-surface-input border border-border-dark focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-colors">
              <div className="flex items-center pl-4 pr-3 border-r border-border-dark/50">
                <span className="text-text-muted text-sm font-medium">+503</span>
              </div>
              <input
                id="phone"
                type="tel"
                value={data.telefono}
                onChange={(e) => onChange("telefono", e.target.value)}
                placeholder="0000-0000"
                className="block w-full pl-4 pr-4 py-3.5 bg-transparent border-0 text-white placeholder-text-muted/50 focus:ring-0 sm:text-sm focus:outline-none"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-text-muted/50">phone_iphone</span>
              </div>
            </div>
          </div>

          {/* Peticiones */}
          <div className="col-span-1 md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-cream-label" htmlFor="requests">
              Peticiones Especiales{" "}
              <span className="text-xs font-normal opacity-60">(Opcional)</span>
            </label>
            <textarea
              id="requests"
              value={data.observaciones}
              onChange={(e) => onChange("observaciones", e.target.value)}
              placeholder="¿Tienes alguna alergia o preferencia que debamos saber?"
              rows={4}
              className="block w-full px-4 py-3.5 bg-surface-input border border-border-dark rounded-xl text-white placeholder-text-muted/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors sm:text-sm resize-none"
            />
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <button
            onClick={onBack}
            type="button"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-primary text-primary hover:bg-primary hover:text-background-dark transition-all duration-300 font-bold tracking-wide"
          >
            Anterior
          </button>
          <button
            onClick={onNext}
            disabled={ !data.nombre }
            className="w-full sm:flex-1 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-background-dark font-bold text-base transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Continuar</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}