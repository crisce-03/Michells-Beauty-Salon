"use client";

import HorariosGrid from "./components/HorariosGrid";
import HorariosHeader from "./components/HorariosHeader";
import WeekSelector from "./components/WeekSelector";
import { useHorarios } from "./hooks/useHorarios";
import { format, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { useRef } from "react";
import html2canvas from "html2canvas";

export default function HorariosPage() {
  const {
    semanaActual,
    horarios,
    horariosBD,
    cambiarSemana,
    guardarCambios,
    agregarTurnoLocal,
    eliminarTurnoLocal,
    cambiarHoraLocal,
    toggleDiaLocal,
  } = useHorarios();

  const exportRef = useRef<HTMLDivElement>(null);

  const descargarImagen = async () => {
    if (!exportRef.current) return;
    const canvas = await html2canvas(exportRef.current, {
      backgroundColor: "#0a0a0a",
      scale: 2,
    });
    const link = document.createElement("a");
    link.download = `horarios-semana-${format(semanaActual, "yyyy-MM-dd")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 pt-16 md:pt-8 xl:pt-0">
      <HorariosHeader
        guardarCambios={guardarCambios}
        descargarImagen={descargarImagen}
      />

      <WeekSelector cambiarSemana={cambiarSemana} semanaActual={semanaActual} />

      <HorariosGrid
        semanaActual={semanaActual}
        horarios={horarios}
        horariosBD={horariosBD}
        agregarTurnoLocal={agregarTurnoLocal}
        eliminarTurnoLocal={eliminarTurnoLocal}
        cambiarHoraLocal={cambiarHoraLocal}
        toggleDiaLocal={toggleDiaLocal}
      />
      {/* Tabla oculta para exportar */}
      <div className="fixed -left-[9999px] top-0" aria-hidden>
        <div
          ref={exportRef}
          style={{
            width: "480px",
            backgroundColor: "#0a0a0a",
            fontFamily: "sans-serif",
            padding: "32px 28px 40px",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <img
              src="/logo_original.jpg"
              alt="Logo"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "contain",
                borderRadius: "50%",
              }}
              crossOrigin="anonymous"
            />
          </div>

          {/* Título */}
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <p
              style={{
                fontSize: "28px",
                fontWeight: "900",
                color: "#f2b90d",
                margin: 0,
                letterSpacing: "4px",
                textTransform: "uppercase",
              }}
            >
              CITAS
            </p>
            <p
              style={{
                fontSize: "22px",
                fontWeight: "300",
                color: "#cbbc90",
                margin: "2px 0 0",
                fontStyle: "italic",
                letterSpacing: "2px",
              }}
            >
              disponibles
            </p>
            <p
              style={{
                fontSize: "11px",
                color: "#6b7280",
                marginTop: "8px",
                letterSpacing: "1px",
              }}
            >
              Semana del {format(semanaActual, "d 'de' MMMM", { locale: es })}{" "}
              al{" "}
              {format(addDays(semanaActual, 6), "d 'de' MMMM yyyy", {
                locale: es,
              })}
            </p>
          </div>

          {/* Días */}
          {horarios.map((dia, index) => {
            const fecha = addDays(semanaActual, index);
            const fechaStr = format(fecha, "yyyy-MM-dd");

            // 1. Filtramos quitando el marcador e incluimos Activos y Ocupados, luego ordenamos
            const turnosDia = (horariosBD ?? [])
              .filter(
                (r) =>
                  r.fecha_hora.startsWith(fechaStr) && r.estado !== "Marcador",
              )
              .sort((a, b) => a.fecha_hora.localeCompare(b.fecha_hora));

            if (!dia.isActive || turnosDia.length === 0) return null;

            return (
              <div key={dia.id} style={{ marginBottom: "24px" }}>
                {/* Nombre del día */}
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#f2b90d",
                    margin: "0 0 12px 0",
                    letterSpacing: "1px",
                  }}
                >
                  {dia.name} {format(fecha, "d", { locale: es })}
                </p>

                {/* Pills de horarios en 2 columnas */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                  }}
                >
                  {turnosDia.map((turno) => {
                    const hora = turno.fecha_hora.substring(11, 16);
                    const h = parseInt(hora.split(":")[0]);
                    const periodo = h < 12 ? "a.m." : "p.m.";
                    const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
                    const min = hora.split(":")[1];
                    const horaFormato = `${h12}:${min} ${periodo}`;

                    // 2. Evaluamos si está ocupado
                    const isOcupado = turno.estado === "Ocupado";

                    return (
                      <div
                        key={turno.id}
                        style={{
                          borderRadius: "50px",
                          padding: "12px 16px 20px",
                          textAlign: "center",
                          fontSize: "18px",
                          fontWeight: "800",
                          color: isOcupado ? "#ef4444" : "#f2b90d",
                          opacity: isOcupado ? 0.7 : 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span style={{ position: "relative", display: "inline-block" }}>
                          {horaFormato}
                          
                          {/* Dibujamos la línea roja manualmente en el exacto centro vertical */}
                          {isOcupado && (
                            <span
                              style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: "50%",
                                height: "2px", 
                                backgroundColor: "#ef4444",
                                marginTop: "5px", 
                              }}
                            />
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Footer */}
          <div
            style={{
              textAlign: "center",
              marginTop: "28px",
              borderTop: "1px solid rgba(242,185,13,0.2)",
              paddingTop: "16px",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                color: "#cbbc90",
                letterSpacing: "2px",
                margin: 0,
              }}
            >
              MICHELLS BEAUTY STUDIO 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
