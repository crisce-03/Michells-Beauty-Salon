interface ProgressBarProps {
  currentStep: number;
  setStep: (step: number) => void;
}

export default function ProgressBar({ currentStep, setStep }: ProgressBarProps) {
  const steps = [
    { id: 1, label: "Servicios" },
    { id: 2, label: "Fecha y Hora" },
    { id: 3, label: "Información" },
    { id: 4, label: "Pago" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-4 text-sm md:text-base border-b border-[#222]">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          {/* Usamos un botón para que sea interactivo */}
          <button
            onClick={() => setStep(step.id)}
            className={`flex items-center gap-2 leading-normal transition-colors ${
              currentStep === step.id 
                ? "text-primary font-bold" 
                : "text-[#666] hover:text-white font-medium"
            }`}
          >
            {/* Círculo con el número */}
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-full border text-xs transition-colors ${
                currentStep === step.id
                  ? "bg-primary text-black font-bold border-primary"
                  : "border-[#666] text-[#666]"
              }`}
            >
              {step.id}
            </div>
            {step.label}
          </button>

          {/* Renderizar el separador solo si no es el último paso */}
          {index < steps.length - 1 && (
            <span className="material-symbols-outlined text-[#333] text-sm mx-4">
              chevron_right
            </span>
          )}
        </div>
      ))}
    </div>
  );
}