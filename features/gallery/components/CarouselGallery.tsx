import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselGallery({ images }: { images: string[] }) {
  return (
    <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {images.map((src, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="overflow-hidden   border-none shadow-xl">
                        <CardContent className="flex aspect-[4/5] items-center justify-center p-0">
                          <img 
                            src={src} 
                            alt={`Trabajo de uñas ${index + 1}`}
                            className="w-full h-full  rounded sobject-cover transition-transform hover:scale-105 duration-500"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-6 md:-left-12 bg-primary text-white" />
              <CarouselNext className="-right-6 md:-right-12 bg-primary text-white" />
            </Carousel>
  );
}