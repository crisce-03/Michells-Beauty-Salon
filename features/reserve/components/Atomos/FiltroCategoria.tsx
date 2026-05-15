import React from "react";

interface Category {
  id: string;
  label: string;
  icon: string | null;
}

interface CategoryFiltersProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

const categories: Category[] = [
  { id: "Todas", label: "Todos", icon: null },
  { id: "Uñas", label: "Uñas", icon: "spa" },
  { id: "Pestañas", label: "Pestañas", icon: "visibility" },
  { id: "Acripie", label: "Acripie", icon: "brush" },
  { id: "Cejas", label: "Cejas", icon: "face" },
];

export default function FiltroCategoria({ activeCategory, onCategoryChange }: CategoryFiltersProps) {
  return (
    <div className="flex gap-3 px-4 pb-8 flex-wrap overflow-x-auto no-scrollbar">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg transition-all px-6 group
              ${isActive 
                ? "bg-primary text-black shadow-lg shadow-primary/20" 
                : "bg-[#1a1a1a] text-[#ccc] border border-[#333] hover:bg-[#252525] hover:border-primary/50"
              }`}
          >
            {cat.icon && (
              <span className={`material-symbols-outlined text-lg transition-colors
                ${isActive ? "text-black" : "text-[#cbbc90] group-hover:text-primary"}`}>
                {cat.icon}
              </span>
            )}
            <p className={`text-sm leading-normal ${isActive ? "font-bold" : "font-medium"}`}>
              {cat.label}
            </p>
          </button>
        );
      })}
    </div>
  );
}