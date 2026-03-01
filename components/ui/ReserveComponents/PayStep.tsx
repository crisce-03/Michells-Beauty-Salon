"use client"

interface ServicesStepProps {
  onBack: ()=> void;
}

export default function DateStep({ onBack }: ServicesStepProps) {
  return (

<div className="w-full max-w-[960px]  mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">


<div className="lg:col-span-2 space-y-8">
       
<section>
     
<h3 className="text-xl font-bold mb-5 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">payments</span>
                        Método de Pago
                    </h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    
<label className="relative group cursor-pointer">
<input  className="peer sr-only" name="payment_method" type="radio"/>
<div className="h-full p-6 rounded-xl border-2 border-transparent bg-white dark:bg-[#2c2616] peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-gray-50 dark:hover:bg-[#362f1d] transition-all duration-300 shadow-sm">
<div className="flex justify-between items-start mb-4">
<div className="p-3 rounded-full bg-primary/10 text-primary">
<span className="material-symbols-outlined">storefront</span>
</div>
<div className="size-6 rounded-full border border-slate-300 dark:border-slate-600 peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center">
<div className="size-2.5 rounded-full bg-background-dark opacity-0 peer-checked:opacity-100"></div>
</div>
</div>
<h4 className="text-lg font-bold mb-2">Pagar en el Salón</h4>
<p className="text-sm text-slate-500 dark:text-gray-400 mb-4">Paga el día de tu cita. Aceptamos efectivo, tarjetas de crédito y débito.</p>
<div className="flex gap-2 opacity-60">
<span className="material-symbols-outlined text-2xl">payments</span>
<span className="material-symbols-outlined text-2xl">credit_card</span>
</div>
</div>
</label>
<label className="relative group cursor-pointer">
<input className="peer sr-only" name="payment_method" type="radio"/>
<div className="h-full p-6 rounded-xl border-2 border-transparent bg-white dark:bg-[#2c2616] peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-gray-50 dark:hover:bg-[#362f1d] transition-all duration-300 shadow-sm">
<div className="flex justify-between items-start mb-4">
<div className="p-3 rounded-full bg-primary/10 text-primary">
<span className="material-symbols-outlined">credit_score</span>
</div>
<div className="size-6 rounded-full border border-slate-300 dark:border-slate-600 peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center">
<div className="size-2.5 rounded-full bg-background-dark opacity-0 peer-checked:opacity-100"></div>
</div>
</div>
<h4 className="text-lg font-bold mb-2">Pagar Ahora</h4>
<p className="text-sm text-slate-500 dark:text-gray-400 mb-4">Asegura tu cita pagando ahora de forma segura a través de Stripe.</p>
<div className="flex items-center gap-3 opacity-60">
<span className="font-bold text-lg italic tracking-tighter">stripe</span>
<div className="text-xs border px-1 rounded">SECURE</div>
</div>
</div>
</label>
</div>
</section>
<section className="p-5 rounded-xl bg-orange-500/10 border border-orange-500/20">
<div className="flex gap-4">
<span className="material-symbols-outlined text-orange-400 shrink-0">info</span>
<div>
<h4 className="font-bold text-orange-400 mb-1">Política de Cancelación</h4>
<p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
                                Puedes cancelar o reprogramar tu cita sin costo hasta 24 horas antes. Las cancelaciones tardías incurrirán en un cargo del 50%.
                            </p>
</div>
</div>
</section>
</div>
<div className="lg:col-span-1">
<div className="sticky top-28 rounded-2xl bg-white dark:bg-[#2c2616] border border-gray-200 dark:border-[#38311b] overflow-hidden shadow-xl">
<div className="h-32 w-full relative">
<img alt="Interior moderno y lujoso de peluquería con iluminación cálida" className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYvXPpupvjdJIwUIvnWgfqHbVhuml3lcSFB5CJkTGQ0APEJGo2AKAm5ESD472MqgYJFzgi-lw8vFZHJ6h5qWaMZmnP2dIhR7rRSlch8h4Prtw79qcSvVDQmHnwrM2uSD0ExPapkweehKalcjKL_taLbb06dZ-ncWEyUEPP-Eq13fbgzMwwgg5HiATE78FKT9CH-X7qFKgkNu0WWr6DfkP8PrzcQxmDBiAmmmTLU4vTUp0Yvy3HTeBejnnXHD7mJ6FAoI8GxV5xDTQ"/>
<div className="absolute inset-0 bg-gradient-to-t from-[#2c2616] to-transparent"></div>
<div className="absolute bottom-3 left-4">
<p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Tu Reserva</p>
</div>
</div>
<div className="p-6 space-y-6">
<div className="space-y-4">
<div className="flex items-start gap-3">
<div className="p-2 bg-background-light dark:bg-background-dark rounded-lg text-primary shrink-0">
<span className="material-symbols-outlined text-sm">content_cut</span>
</div>
<div>
<p className="text-xs text-slate-500 dark:text-[#cbbc90] uppercase tracking-wide">Servicio</p>
<p className="font-bold text-slate-900 dark:text-white">Corte y Color Premium</p>
<p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">Duración: 2h 30min</p>
</div>
</div>
<div className="flex items-start gap-3">
<div className="p-2 bg-background-light dark:bg-background-dark rounded-lg text-primary shrink-0">
<span className="material-symbols-outlined text-sm">event</span>
</div>
<div>
<p className="text-xs text-slate-500 dark:text-[#cbbc90] uppercase tracking-wide">Fecha y Hora</p>
<p className="font-bold text-slate-900 dark:text-white">24 Oct, 2023</p>
<p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">10:00 AM</p>
</div>
</div>
</div>
<hr className="border-gray-200 dark:border-[#38311b]"/>
<div className="space-y-2">
<div className="flex justify-between text-sm text-slate-500 dark:text-gray-400">
<span>Subtotal</span>
<span>$110.00</span>
</div>
<div className="flex justify-between text-sm text-slate-500 dark:text-gray-400">
<span>Impuestos</span>
<span>$10.00</span>
</div>
<div className="flex justify-between items-end pt-2">
<span className="font-bold text-lg text-slate-900 dark:text-white">Total</span>
<span className="font-black text-2xl text-primary">$120.00</span>
</div>
</div>
<button onClick={onBack} className="premium-shine w-full p-2 rounded-xl border border-primary text-primary hover:bg-primary hover:text-background-dark text-background-dark font-black text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group" type="button">
                                Anterior
                            </button>
<button className="premium-shine w-full p-2 rounded-xl bg-primary text-background-dark font-black text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group">
<span>Confirmar Reserva</span>
<span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">check_circle</span>
</button>
<p className="text-center text-xs text-slate-500 dark:text-gray-500">
                            Al confirmar, aceptas nuestros <a className="underline hover:text-primary" href="#">Términos y Condiciones</a>.
                        </p>
</div>
</div>
</div>
</div>
  );
}