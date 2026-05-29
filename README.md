Michell's Beauty Salon - Sistema Gestor de Citas

<div align="center">
  <img src="./public/favicon-copia.png" alt="Logo Michell's Beauty Salon" width="250"/>
  <br><br>
  <a href="https://michells-beauty-salon.vercel.app/" target="_blank" style="margin-bottom: 20px;"><b>🌐 Visitar la página web</b></a>
</div>


![Estado del Proyecto](https://img.shields.io/badge/Estado-Producción_Fase_1-success)
![Next.js](https://img.shields.io/badge/Next.js-14+-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database_&_Auth-green?logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-UI-38B2AC?logo=tailwind-css)

## 📌 Descripción del Proyecto

Sistema integral de gestión de citas y administración desarrollado a la medida para **Michell's Beauty Salon**. Esta aplicación web de arquitectura Full-Stack nace con el objetivo de digitalizar y automatizar el agendamiento tradicional (previamente manejado de forma manual vía WhatsApp), eliminando la superposición de horarios, optimizando el tiempo administrativo y mejorando la experiencia de reserva para los clientes.

## ✨ Características Principales

*   **📅 Motor de Agendamiento Inteligente:** Validación en tiempo real de la disponibilidad de bloques de tiempo para evitar cruces de horarios.
*   **🛠️ Gestión de Catálogo Dinámico:** Panel administrativo (Dashboard) para crear, editar, categorizar y deshabilitar servicios estéticos.
*   **👥 Control de Cartera de Clientes:** Registro centralizado del historial de usuarios y su información de contacto.
*   **💳 Seguimiento Transaccional:** Control del estado operativo de la cita (Pendiente, Confirmada, Cancelada).
*   **🔒 Autenticación Segura:** Control de acceso, protección de rutas y gestión de sesiones nativa mediante **Supabase Auth** para resguardar la información administrativa.
*   **📱 Diseño 100% Responsivo:** Interfaz optimizada tanto para equipos de escritorio (administración) como para dispositivos móviles.
*   **📲 Progressive Web App (PWA):** Instalable directamente en dispositivos móviles y de escritorio para ofrecer una experiencia de aplicación nativa, mejorando el acceso y los tiempos de carga.

## 🚀 Tecnologías Utilizadas

El proyecto fue construido priorizando el rendimiento, la escalabilidad y una experiencia de usuario fluida, prescindiendo de ORMs complejos en favor de consultas directas para maximizar la velocidad.

**Frontend:**
*   **Framework:** [Next.js](https://nextjs.org/) (React)
*   **Lenguaje:** TypeScript
*   **Estilos:** Tailwind CSS
*   **Componentes UI:** [Shadcn UI](https://ui.shadcn.com/)

**Backend & Base de Datos:**
*   **API RESTful Personalizada:** Desarrollo de una capa lógica de backend utilizando el sistema de rutas API de Next.js (`/api`). Esto permite aislar la lógica de negocio, sanitizar datos y gestionar la comunicación segura con la base de datos, separando el Frontend del Backend de manera efectiva.
*   **BaaS / Database:** [Supabase](https://supabase.com/) (PostgreSQL)
*   **Autenticación:** Supabase Auth (Row Level Security implementado)

## 🗄️ Arquitectura de Base de Datos

El sistema cuenta con un modelo relacional normalizado compuesto por 5 entidades principales:
1.  `Clientes`: Gestión de identidad y contacto.
2.  `Servicios`: Catálogo paramétrico de oferta estética.
3.  `Horarios`: Control de bloques temporales y disponibilidad.
4.  `Citas`: Tabla transaccional central de reservas.
5.  `Detalle_Cita`: Entidad puente para facturación de múltiples servicios por visita.
