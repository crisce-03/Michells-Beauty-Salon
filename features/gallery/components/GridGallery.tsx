export function GridGallery({ images,grids = 3 }: { images: string[]; grids?: number }) {

    const gridMap: Record<number, string> = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    };
  return (
    <div className={`grid grid-cols-1 ${gridMap[grids]} gap-8`}>    
      {images.map((src, index) => (
        <div key={index} className="bg-cream-card rounded-xl overflow-hidden shadow-2xl group h-80">
          <img src={src} alt={`Gallery ${index}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
      ))}
    </div>
  );
}