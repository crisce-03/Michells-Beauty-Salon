"use client";

import { useState, useEffect } from "react";
import { getHorarios } from "../../horarios/services/horariosService";

// ── Tipos ──────────────────────────────────────────────────────────────────
interface HorarioAPI {
  id: number;
  fecha_hora: string;
  estado: string;
}

interface DiaDisponible {
  clave: string;
  date: Date;
  dia: string;
  numero: string;
  mes: string;
  horas: string[];
}

// ── Helpers ────────────────────────────────────────────────────────────────
const DIAS_SEMANA = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MESES = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

function formatearHora(fecha_hora: string): string {
  const date = new Date(fecha_hora);
  let horas = date.getHours();
  const minutos = date.getMinutes().toString().padStart(2, "0");
  const ampm = horas >= 12 ? "PM" : "AM";
  horas = horas % 12 || 12;
  return `${horas.toString().padStart(2, "0")}:${minutos} ${ampm}`;
}

function claveDelDia(fecha_hora: string): string {
  return new Date(fecha_hora).toISOString().split("T")[0];
}

function getRangoSemanaActual(): [Date, Date] {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const diasHastaDomingo = hoy.getDay() === 0 ? 0 : 7 - hoy.getDay();
  const domingo = new Date(hoy);
  domingo.setDate(hoy.getDate() + diasHastaDomingo);
  domingo.setHours(23, 59, 59, 999);
  return [hoy, domingo];
}

/** Construye el link de WhatsApp con mensaje pre-armado */
function buildWhatsAppLink(dia: string, numero: string, mes: string, hora: string): string {
  const mensaje = `Hola, quiero agendar una cita para el ${dia} ${numero} de ${mes} a las ${hora}. ¿Está disponible?`;
  return `https://wa.me/50369303080?text=${encodeURIComponent(mensaje)}`;
}

// ── Componente ─────────────────────────────────────────────────────────────
export default function HorariosDisponibles() {
  const [diasDisponibles, setDiasDisponibles] = useState<DiaDisponible[]>([]);
  const [diaActivo, setDiaActivo] = useState(0);
  const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setCargando(true);
        const data: HorarioAPI[] = await getHorarios();
        const [hoy, domingo] = getRangoSemanaActual();

        const activos = data.filter((h) => {
          if (h.estado !== "Activo") return false;
          const fecha = new Date(h.fecha_hora);
          return fecha >= hoy && fecha <= domingo;
        });

        const mapaDias: Record<string, DiaDisponible> = {};
        for (const h of activos) {
          const clave = claveDelDia(h.fecha_hora);
          if (!mapaDias[clave]) {
            const date = new Date(h.fecha_hora);
            mapaDias[clave] = {
              clave,
              date,
              dia: DIAS_SEMANA[date.getDay()],
              numero: date.getDate().toString(),
              mes: MESES[date.getMonth()],
              horas: [],
            };
          }
          mapaDias[clave].horas.push(formatearHora(h.fecha_hora));
        }

        const diasOrdenados = Object.values(mapaDias).sort(
          (a, b) => a.date.getTime() - b.date.getTime()
        );

        setDiasDisponibles(diasOrdenados);
        setDiaActivo(0);
        setHoraSeleccionada(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("No se pudieron cargar los horarios.");
        }
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, []);

  // Al cambiar de día, limpiar hora seleccionada
  const handleCambiarDia = (index: number) => {
    setDiaActivo(index);
    setHoraSeleccionada(null);
  };

  const horasDelDiaActivo = diasDisponibles[diaActivo]?.horas ?? [];
  const diaActivoInfo = diasDisponibles[diaActivo];

  const whatsappLink =
    diaActivoInfo && horaSeleccionada
      ? buildWhatsAppLink(
          diaActivoInfo.dia,
          diaActivoInfo.numero,
          diaActivoInfo.mes,
          horaSeleccionada
        )
      : "https://wa.me/50369303080";

  return (
    <section className="py-20 bg-surface" id="horarios">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-cream-label mb-4">
          Encuentra tu espacio ideal
        </h2>
        <p className="text-text-muted mb-10 max-w-2xl mx-auto">
          Revisa nuestra disponibilidad en tiempo real y asegura tu próxima
          visita. Selecciona un día y hora para agendar.
        </p>

        <div className="bg-surface-input border border-border-dark rounded-2xl p-6 md:p-8 shadow-lg">

          {/* Cargando */}
          {cargando && (
            <div className="py-12 text-text-muted animate-pulse">
              Cargando horarios disponibles…
            </div>
          )}

          {/* Error */}
          {!cargando && error && (
            <div className="py-12 text-red-400">{error}</div>
          )}

          {/* Sin disponibilidad */}
          {!cargando && !error && diasDisponibles.length === 0 && (
            <div className="py-12 text-text-muted">
              No hay horarios disponibles para esta semana.
            </div>
          )}

          {/* Datos listos */}
          {!cargando && !error && diasDisponibles.length > 0 && (
            <>
              {/* Selector de días */}
              <div className="flex overflow-x-auto pb-4 gap-3 md:justify-center no-scrollbar">
                {diasDisponibles.map((fecha, index) => (
                  <button
                    key={fecha.clave}
                    onClick={() => handleCambiarDia(index)}
                    className={`flex flex-col items-center justify-center min-w-[70px] h-20 rounded-xl border transition-all duration-300 ${
                      diaActivo === index
                        ? "bg-primary text-white border-primary shadow-md transform scale-105"
                        : "bg-surface border-border-dark text-text-muted hover:border-primary/50"
                    }`}
                  >
                    <span className="text-xs uppercase font-semibold tracking-wider">
                      {fecha.dia}
                    </span>
                    <span className="text-2xl font-bold mt-1">{fecha.numero}</span>
                    <span className="text-[10px] opacity-70">{fecha.mes}</span>
                  </button>
                ))}
              </div>

              <div className="w-full h-[1px] bg-border-dark my-6" />

              {/* Selector de horas */}
              <div>
                <h4 className="text-left font-semibold text-cream-label mb-4">
                  Horarios para el {diaActivoInfo.dia} {diaActivoInfo.numero} de{" "}
                  {diaActivoInfo.mes}:
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {horasDelDiaActivo.length > 0 ? (
                    horasDelDiaActivo.map((hora, index) => {
                      const seleccionada = horaSeleccionada === hora;
                      return (
                        <button
                          key={index}
                          onClick={() =>
                            setHoraSeleccionada(seleccionada ? null : hora)
                          }
                          className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                            seleccionada
                              ? "bg-primary border-primary text-white shadow-md scale-105"
                              : "border-border-dark text-cream-label hover:border-primary hover:text-primary hover:bg-primary/5"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            schedule
                          </span>
                          {hora}
                        </button>
                      );
                    })
                  ) : (
                    <div className="col-span-full py-8 text-text-muted">
                      Lo sentimos, no hay espacios disponibles para este día.
                    </div>
                  )}
                </div>
              </div>

              {/* Confirmación de selección */}
              {horaSeleccionada && diaActivoInfo && (
                <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/30 text-sm text-cream-label">
                  <span className="material-symbols-outlined text-[16px] align-middle mr-1 text-primary">
                    check_circle
                  </span>
                  Seleccionaste el{" "}
                  <span className="font-semibold text-primary">
                    {diaActivoInfo.dia} {diaActivoInfo.numero} de {diaActivoInfo.mes}
                  </span>{" "}
                  a las{" "}
                  <span className="font-semibold text-primary">{horaSeleccionada}</span>
                </div>
              )}
            </>
          )}

          {/* CTA — siempre activo, el mensaje cambia si hay hora seleccionada */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-primary text-white px-10 py-4 mt-8 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-primary/20"
          >
            <span className="material-icons mr-2">calendar_today</span>
            {horaSeleccionada ? "Confirmar por WhatsApp" : "Agendar por WhatsApp"}
          </a>
        </div>
      </div>
    </section>
  );
}