import { GalleryHeader } from "./components/GalleryHeader";
import { GallerySection } from "./components/GallerySection";
import { CarouselGallery } from "./components/CarouselGallery";
import { galleryData } from "./data/gallery.data";
import { FloatingButton } from "./components/FloatingButton";
import { GridGallery } from "./components/GridGallery";

export default function GalleryPage() {
  return (
    <>
      <GalleryHeader />

      <section className="max-w-7xl mx-auto px-6 space-y-32 pb-40">
        <GallerySection title="Uñas Acrílicas">
          <CarouselGallery images={galleryData.unasImages} />
        </GallerySection>

        <GallerySection title="Acripie">
          <GridGallery images={galleryData.piesImages} />
        </GallerySection>

        <GallerySection title="Pestañas">
          <CarouselGallery images={galleryData.pestanasImages} />
        </GallerySection>

        <GallerySection title="Cejas Lamindas">
          <GridGallery images={galleryData.cejasImages} grids={4} />
        </GallerySection>
      </section>

      <FloatingButton />
    </>
  );
}