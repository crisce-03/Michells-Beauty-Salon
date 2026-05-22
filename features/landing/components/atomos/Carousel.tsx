import { useState, useEffect } from "react";


export default function Carousel({ images, title }: { images: string[], title?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="group relative overflow-hidden rounded-xl h-[500px]">
      <div className="relative w-full h-full">
        {images.map((item, index) => (
          <img
            key={index}
            src={item}
            alt={`Slide ${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 
              ${currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          />
        ))}
      </div>
      
      {title && (
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <h4 className="text-lg font-bold text-white">{title}</h4>
        </div>
      )}
    </div>
  );
}