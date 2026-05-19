import Hero from "@/features/landing/components/Hero";
import MyWork from "@/features/landing/components/MyWork";
import Services from "@/features/landing/components/Services";
import Contacto from "@/features/landing/components/Contacto";
import AboutMe from "@/features/landing/components/AboutMe";
import HorariosDisponibles from "@/features/landing/components/HorariosDisponibles";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <MyWork />
      <AboutMe />
      <HorariosDisponibles />
      <Contacto />
    </>
  );
}
