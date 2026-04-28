"use client"

import ProgressBar from "../../components/ui/progresBar";

interface ServicesStepProps {
  onNext: () => void;
  onBack: ()=> void;
}

export default function DateStep({ onNext,onBack }: ServicesStepProps) {
  return (
<div className="w-full max-w-[960px]  mx-auto flex flex-col gap-10 p-8">
<div className="flex flex-col gap-6">
<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
<div className="space-y-2">
<p className="text-text-muted text-lg max-w-lg">Por favor completa tus datos personales para confirmar tu cita.</p>
</div>

<div className="h-full bg-primary w-full rounded-full"></div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
<div className="lg:col-span-8 bg-surface-dark border border-border-dark rounded-2xl p-6 md:p-10 shadow-xl">
<h2 className="text-2xl font-serif text-white mb-8 border-b border-border-dark pb-4">Información Personal</h2>
<form action="#" className="space-y-8" method="POST" onSubmit={(e) => e.preventDefault()}>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="col-span-1 md:col-span-2 space-y-2">
<label className="block text-sm font-medium text-cream-label" htmlFor="fullname">Nombre Completo</label>
<div className="relative">
<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
<span className="material-symbols-outlined text-text-muted/50">person</span>
</div>
<input className="block w-full pl-11 pr-4 py-3.5 bg-surface-input border border-border-dark rounded-xl text-white placeholder-text-muted/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors sm:text-sm" id="fullname" name="fullname" placeholder="Ej. María González" type="text"/>
</div>
</div>
<div className="space-y-2">
<label className="block text-sm font-medium text-cream-label"htmlFor="email">Correo Electrónico</label>
<div className="relative">
<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
<span className="material-symbols-outlined text-text-muted/50">mail</span>
</div>
<input className="block w-full pl-11 pr-4 py-3.5 bg-surface-input border border-border-dark rounded-xl text-white placeholder-text-muted/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors sm:text-sm" id="email" name="email" placeholder="correo@ejemplo.com" type="email"/>
</div>
</div>
<div className="space-y-2">
<label className="block text-sm font-medium text-cream-label" htmlFor="phone">Teléfono</label>
<div className="relative flex rounded-xl bg-surface-input border border-border-dark focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-colors">
<div className="flex items-center pl-4 pr-3 border-r border-border-dark/50">
<span className="text-text-muted text-sm font-medium">+503</span>
</div>
<input className="block w-full pl-4 pr-4 py-3.5 bg-transparent border-0 text-white placeholder-text-muted/50 focus:ring-0 sm:text-sm" id="phone" name="phone" placeholder="0000-0000" type="tel"/>
<div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
<span className="material-symbols-outlined text-text-muted/50">phone_iphone</span>
</div>
</div>
</div>
<div className="col-span-1 md:col-span-2 space-y-2">
<label className="block text-sm font-medium text-cream-label" htmlFor="requests">
                                    Peticiones Especiales <span className="text-xs font-normal opacity-60">(Opcional)</span>
</label>
<div className="relative">
<textarea className="block w-full px-4 py-3.5 bg-surface-input border border-border-dark rounded-xl text-white placeholder-text-muted/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors sm:text-sm resize-none" id="requests" name="requests" placeholder="¿Tienes alguna alergia o preferencia que debamos saber?" rows={4}></textarea>
</div>
</div>
</div>
<div className="flex items-start">
<div className="flex items-center h-5">
<input className="h-5 w-5 rounded border-border-dark bg-surface-input text-primary focus:ring-primary/20 focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer" id="terms" name="terms" type="checkbox"/>
</div>
<div className="ml-3 text-sm">
<label className="font-medium text-cream-label" htmlFor="terms">Acepto la <a className="text-primary hover:underline" href="#">política de cancelación</a> y las normas del establecimiento.</label>
</div>
</div>
<div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
<button onClick={onBack} className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-primary text-primary hover:bg-primary hover:text-background-dark transition-all duration-300 font-bold tracking-wide" type="button">
                                Anterior
                            </button>
<button onClick={onNext} className="w-full sm:flex-1 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-background-dark font-bold text-base transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2" type="submit">
<span>Continuar</span>
<span className="material-symbols-outlined text-lg">arrow_forward</span>
</button>
</div>
</form>
</div>
<div className="lg:col-span-4 space-y-6">
<div className="bg-surface-dark border border-border-dark rounded-2xl p-6 shadow-lg sticky top-24">
<h3 className="text-xl font-serif text-white mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">receipt_long</span>
                            Resumen de Cita
                        </h3>
<div className="space-y-6">
<div className="flex gap-4 items-start">
<div className="size-16 rounded-lg bg-surface-input border border-border-dark overflow-hidden flex-shrink-0 relative">
<img alt="Tratamiento Facial" className="object-cover w-full h-full opacity-80" data-alt="Close up of beauty treatment"style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAXxrvKDwaBU8_18M0pvKYjiLYsATAR0NfExvw58iox9fhwiedJkgJ3lul9Bt3r1_DwXawsBWR2fsoX6wSbSBTe_OKXaYFO4zOfvtwU4jLoZwuehYWNO3KJd2VdGfBV84kVnXrafiV_xR2cd7F2b7T47dsgjETi7E2RcgfANo3rLznzAA4MHQ6_2vPeeG1Y4tODNe9z5nnu0CrssCSWjofCuPC84oG25TTSd1IdzUQY6KfRB77ZpKnEI9QREwVn1FR0n16ppNL4lcU")' }}/>
</div>
<div>
<h4 className="text-white font-semibold">Facial Gold Premium</h4>
<p className="text-text-muted text-sm mt-1">60 min • Spa Facial</p>
<p className="text-primary font-bold mt-1">$85.00</p>
</div>
</div>
<hr className="border-border-dark/50"/>
<div className="space-y-4">
<div className="flex items-center gap-3 text-sm">
<div className="p-2 bg-primary/10 rounded-lg text-primary">
<span className="material-symbols-outlined text-xl">calendar_month</span>
</div>
<div className="flex flex-col">
<span className="text-text-muted text-xs">Fecha</span>
<span className="text-white font-medium">Viernes, 24 Oct 2023</span>
</div>
</div>
<div className="flex items-center gap-3 text-sm">
<div className="p-2 bg-primary/10 rounded-lg text-primary">
<span className="material-symbols-outlined text-xl">schedule</span>
</div>
<div className="flex flex-col">
<span className="text-text-muted text-xs">Hora</span>
<span className="text-white font-medium">10:00 AM - 11:00 AM</span>
</div>
</div>
</div>
<hr className="border-border-dark/50"/>
<div className="flex justify-between items-center pt-2">
<span className="text-white text-lg font-bold">Total a Pagar</span>
<span className="text-2xl font-serif text-primary font-bold">$85.00</span>
</div>
<div className="bg-primary/5 rounded-lg p-3 border border-primary/20 flex gap-2 mt-4">
<span className="material-symbols-outlined text-primary text-sm mt-0.5">info</span>
<p className="text-text-muted text-xs leading-relaxed">
                                    En el siguiente paso se seleccionara si pagar en el local por anticipado en linea
                                </p>
</div>
</div>
</div>
</div>
</div>
</div>
  );
}