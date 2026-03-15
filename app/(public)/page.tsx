import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MyWork from "@/components/MyWork";
import Services from "@/components/Services";
import BannerReserve from "@/components/BannerReserve";
import Contacto from "@/components/Contacto";
import AboutMe from "@/components/AboutMe";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-luxury-black min-h-screen">
      {/* El Navbar suele ir fuera del <main> para que sea fijo */}
      <Navbar />
      <main >
        <Hero />
        <Services />
        <MyWork />
        <AboutMe />
        <BannerReserve />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}
