export function GallerySection({ title, children }: any) {
  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-bold text-primary">{title}</h2>
      {children}
    </section>
  );
}