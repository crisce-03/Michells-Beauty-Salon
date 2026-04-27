import Hero from "@/features/landing/components/Hero";
import MyWork from "@/features/landing/components/MyWork";
import Services from "@/features/landing/components/Services";
import BannerReserve from "@/features/landing/components/BannerReserve";
import Contacto from "@/features/landing/components/Contacto";
import AboutMe from "@/features/landing/components/AboutMe";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <MyWork />
      <AboutMe />
      <BannerReserve />
      <Contacto />
    </>
  );
}
