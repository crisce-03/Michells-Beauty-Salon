import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MyWork from "@/components/MyWork";
import Services from "@/components/Services";
import BannerReserve from "@/components/BannerReserve";
import Contacto from "@/components/Contacto";
import AboutMe from "@/components/AboutMe";
import Footer from "@/components/Footer";
import Main from "@/components/ui/MyGaleryComponents/Main";

export default function MyGalery() {
  return (
    <div className="bg-luxury-black min-h-screen">
      {/* El Navbar suele ir fuera del <main> para que sea fijo */}
      <Navbar />
      <main >
        <Main />
      </main>
      <Footer />
    </div>
  );
}
